import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, BarChart3, TrendingUp, TrendingDown, Users, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScsRow {
  id: string;
  enrollment_id: string;
  overall_score: number | null;
  self_kindness: number | null;
  self_judgment: number | null;
  common_humanity: number | null;
  isolation: number | null;
  mindfulness: number | null;
  over_identification: number | null;
  measurement_type: string;
  submitted_at: string;
  participant_name: string | null;
  participant_email: string | null;
  course_type: string;
  trainer_name: string | null;
}

const SUBSCALE_LABELS: Record<string, string> = {
  self_kindness: "Zelfvriendelijkheid",
  self_judgment: "Zelfoordeel",
  common_humanity: "Gedeelde menselijkheid",
  isolation: "Isolatie",
  mindfulness: "Mindfulness",
  over_identification: "Over-identificatie",
};

const POSITIVE_SUBSCALES = ["self_kindness", "common_humanity", "mindfulness"];
const NEGATIVE_SUBSCALES = ["self_judgment", "isolation", "over_identification"];

type SortField = "name" | "score" | "date";

export default function AdminScsOverview() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<ScsRow[]>([]);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // Fetch SCS submissions with enrollment + registration info
    const { data: scsData } = await supabase
      .from("scs_submissions" as any)
      .select("*")
      .order("submitted_at", { ascending: false });

    if (!scsData || scsData.length === 0) {
      setRows([]);
      setLoading(false);
      return;
    }

    // Get enrollment IDs
    const enrollmentIds = [...new Set((scsData as any[]).map((s: any) => s.enrollment_id))];

    // Fetch enrollments with registration info
    const { data: enrollments } = await supabase
      .from("enrollments")
      .select("id, registration_id, course_type, trainer_name")
      .in("id", enrollmentIds);

    const registrationIds = (enrollments || [])
      .map(e => e.registration_id)
      .filter(Boolean) as string[];

    const { data: registrations } = registrationIds.length > 0
      ? await supabase.from("registrations").select("id, name, email").in("id", registrationIds)
      : { data: [] };

    const enrollmentMap = new Map(
      (enrollments || []).map(e => [e.id, e])
    );
    const registrationMap = new Map(
      (registrations || []).map(r => [r.id, r])
    );

    const mapped: ScsRow[] = (scsData as any[]).map((s: any) => {
      const enrollment = enrollmentMap.get(s.enrollment_id);
      const registration = enrollment?.registration_id
        ? registrationMap.get(enrollment.registration_id)
        : null;
      return {
        id: s.id,
        enrollment_id: s.enrollment_id,
        overall_score: s.overall_score,
        self_kindness: s.self_kindness,
        self_judgment: s.self_judgment,
        common_humanity: s.common_humanity,
        isolation: s.isolation,
        mindfulness: s.mindfulness,
        over_identification: s.over_identification,
        measurement_type: s.measurement_type,
        submitted_at: s.submitted_at,
        participant_name: registration?.name || null,
        participant_email: registration?.email || null,
        course_type: enrollment?.course_type || "",
        trainer_name: enrollment?.trainer_name || null,
      };
    });

    setRows(mapped);
    setLoading(false);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const sortedRows = [...rows].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortField === "name") return dir * (a.participant_name || "").localeCompare(b.participant_name || "");
    if (sortField === "score") return dir * ((a.overall_score || 0) - (b.overall_score || 0));
    return dir * (new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime());
  });

  // Compute averages
  const validScores = rows.filter(r => r.overall_score != null);
  const avgOverall = validScores.length > 0
    ? validScores.reduce((sum, r) => sum + (r.overall_score || 0), 0) / validScores.length
    : 0;

  const avgSubscale = (key: keyof ScsRow) => {
    const vals = rows.filter(r => (r[key] as number | null) != null);
    return vals.length > 0 ? vals.reduce((sum, r) => sum + ((r[key] as number) || 0), 0) / vals.length : 0;
  };

  // Group by enrollment to find pre/post pairs for trends
  const byEnrollment = new Map<string, ScsRow[]>();
  rows.forEach(r => {
    const arr = byEnrollment.get(r.enrollment_id) || [];
    arr.push(r);
    byEnrollment.set(r.enrollment_id, arr);
  });

  const trends = Array.from(byEnrollment.entries())
    .filter(([, items]) => items.some(i => i.measurement_type === "pre") && items.some(i => i.measurement_type === "post"))
    .map(([eid, items]) => {
      const pre = items.find(i => i.measurement_type === "pre")!;
      const post = items.find(i => i.measurement_type === "post")!;
      return {
        enrollment_id: eid,
        name: pre.participant_name,
        preScore: pre.overall_score || 0,
        postScore: post.overall_score || 0,
        change: (post.overall_score || 0) - (pre.overall_score || 0),
      };
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Er zijn nog geen SCS vragenlijsten ingevuld.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Users className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-2xl font-light text-primary">{validScores.length}</p>
            <p className="text-xs text-muted-foreground">Ingevuld</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <BarChart3 className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-2xl font-light text-primary">{avgOverall.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Gem. score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <TrendingUp className="h-4 w-4 text-green-600 mx-auto mb-1" />
            <p className="text-2xl font-light text-green-700">
              {trends.length > 0 ? `${trends.filter(t => t.change > 0).length}/${trends.length}` : "—"}
            </p>
            <p className="text-xs text-muted-foreground">Verbeterd (pre→post)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <TrendingDown className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-2xl font-light text-foreground">
              {rows.filter(r => r.measurement_type === "pre").length} / {rows.filter(r => r.measurement_type === "post").length}
            </p>
            <p className="text-xs text-muted-foreground">0-meting / nameting</p>
          </CardContent>
        </Card>
      </div>

      {/* Average subscales */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Gemiddelde subschalen (alle deelnemers)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <p className="text-xs font-medium text-green-700 mb-2">Positieve zelfrespons</p>
              {POSITIVE_SUBSCALES.map(s => (
                <div key={s} className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-muted-foreground w-32 truncate">{SUBSCALE_LABELS[s]}</span>
                  <Progress value={(avgSubscale(s as keyof ScsRow) / 5) * 100} className="h-2 flex-1" />
                  <span className="text-xs font-medium w-8 text-right">{avgSubscale(s as keyof ScsRow).toFixed(1)}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium text-orange-700 mb-2">Negatieve zelfrespons</p>
              {NEGATIVE_SUBSCALES.map(s => (
                <div key={s} className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-muted-foreground w-32 truncate">{SUBSCALE_LABELS[s]}</span>
                  <Progress value={(avgSubscale(s as keyof ScsRow) / 5) * 100} className="h-2 flex-1" />
                  <span className="text-xs font-medium w-8 text-right">{avgSubscale(s as keyof ScsRow).toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pre/Post trends */}
      {trends.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Voortgang (pre → post)</CardTitle>
            <CardDescription className="text-xs">Deelnemers met zowel 0-meting als nameting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trends.map(t => (
                <div key={t.enrollment_id} className="flex items-center gap-3 text-sm">
                  <span className="w-32 truncate font-medium">{t.name || "Onbekend"}</span>
                  <span className="text-muted-foreground w-10 text-right">{t.preScore.toFixed(1)}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="w-10">{t.postScore.toFixed(1)}</span>
                  <Badge className={`text-[10px] ${t.change > 0 ? "bg-green-100 text-green-800" : t.change < 0 ? "bg-red-100 text-red-800" : "bg-muted text-muted-foreground"}`}>
                    {t.change > 0 ? "+" : ""}{t.change.toFixed(2)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All submissions table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Alle inzendingen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="pb-2 pr-3">
                    <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 -ml-2" onClick={() => toggleSort("name")}>
                      Deelnemer <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </th>
                  <th className="pb-2 pr-3">Type</th>
                  <th className="pb-2 pr-3">
                    <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 -ml-2" onClick={() => toggleSort("score")}>
                      Score <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </th>
                  <th className="pb-2 pr-3 hidden md:table-cell">ZV</th>
                  <th className="pb-2 pr-3 hidden md:table-cell">GM</th>
                  <th className="pb-2 pr-3 hidden md:table-cell">MF</th>
                  <th className="pb-2 pr-3 hidden md:table-cell">ZO</th>
                  <th className="pb-2 pr-3 hidden md:table-cell">IS</th>
                  <th className="pb-2 pr-3 hidden md:table-cell">OI</th>
                  <th className="pb-2">
                    <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 -ml-2" onClick={() => toggleSort("date")}>
                      Datum <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedRows.map(row => (
                  <tr key={row.id} className="border-b last:border-b-0 hover:bg-muted/30">
                    <td className="py-2 pr-3 font-medium">{row.participant_name || "Onbekend"}</td>
                    <td className="py-2 pr-3">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {row.measurement_type === "pre" ? "0-meting" : row.measurement_type === "post" ? "Nameting" : row.measurement_type}
                      </Badge>
                    </td>
                    <td className="py-2 pr-3 font-medium text-primary">{row.overall_score?.toFixed(2)}</td>
                    <td className="py-2 pr-3 hidden md:table-cell text-muted-foreground">{row.self_kindness?.toFixed(1)}</td>
                    <td className="py-2 pr-3 hidden md:table-cell text-muted-foreground">{row.common_humanity?.toFixed(1)}</td>
                    <td className="py-2 pr-3 hidden md:table-cell text-muted-foreground">{row.mindfulness?.toFixed(1)}</td>
                    <td className="py-2 pr-3 hidden md:table-cell text-muted-foreground">{row.self_judgment?.toFixed(1)}</td>
                    <td className="py-2 pr-3 hidden md:table-cell text-muted-foreground">{row.isolation?.toFixed(1)}</td>
                    <td className="py-2 pr-3 hidden md:table-cell text-muted-foreground">{row.over_identification?.toFixed(1)}</td>
                    <td className="py-2 text-muted-foreground text-xs">
                      {new Date(row.submitted_at).toLocaleDateString("nl-NL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
