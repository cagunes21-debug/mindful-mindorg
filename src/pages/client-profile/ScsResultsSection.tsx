import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";

interface ScsRow {
  id: string;
  overall_score: number | null;
  self_kindness: number | null;
  self_judgment: number | null;
  common_humanity: number | null;
  isolation: number | null;
  mindfulness: number | null;
  over_identification: number | null;
  measurement_type: string;
  submitted_at: string;
}

const SUBSCALES = [
  { key: "self_kindness", label: "Zelfvriendelijkheid", positive: true },
  { key: "common_humanity", label: "Gedeelde menselijkheid", positive: true },
  { key: "mindfulness", label: "Mindfulness", positive: true },
  { key: "self_judgment", label: "Zelfoordeel", positive: false },
  { key: "isolation", label: "Isolatie", positive: false },
  { key: "over_identification", label: "Over-identificatie", positive: false },
] as const;

export default function ScsResultsSection({ enrollmentIds }: { enrollmentIds: string[] }) {
  const [submissions, setSubmissions] = useState<ScsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enrollmentIds.length === 0) { setLoading(false); return; }
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("scs_submissions")
        .select("id, overall_score, self_kindness, self_judgment, common_humanity, isolation, mindfulness, over_identification, measurement_type, submitted_at")
        .in("enrollment_id", enrollmentIds)
        .order("submitted_at", { ascending: true });
      setSubmissions((data || []) as ScsRow[]);
      setLoading(false);
    })();
  }, [enrollmentIds.join(",")]);

  const copyLink = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    toast.success(`${label} gekopieerd!`);
  };

  if (loading) return <div className="flex justify-center py-3"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /></div>;

  const pre = submissions.find(s => s.measurement_type === "pre");
  const post = submissions.find(s => s.measurement_type === "post");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {enrollmentIds.map(id => (
          <div key={id} className="flex gap-1.5">
            <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1 rounded-lg" onClick={() => copyLink(`${window.location.origin}/vragenlijst/${id}`, "0-meting link")}>
              <BarChart3 className="h-3 w-3" /> 0-meting
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1 rounded-lg" onClick={() => copyLink(`${window.location.origin}/vragenlijst/${id}?type=post`, "Nameting link")}>
              <BarChart3 className="h-3 w-3" /> Nameting
            </Button>
          </div>
        ))}
      </div>

      {submissions.length === 0 && <p className="text-xs text-muted-foreground">Nog geen vragenlijsten ingevuld.</p>}

      {pre && post ? (
        <Card className="border-border/40">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-secondary/60 p-2.5">
                <p className="text-[10px] text-muted-foreground mb-0.5">0-meting</p>
                <p className="text-xl font-light text-primary">{pre.overall_score?.toFixed(2)}</p>
                <p className="text-[10px] text-muted-foreground">{format(new Date(pre.submitted_at), "d MMM yyyy", { locale: nl })}</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2.5">
                <p className="text-[10px] text-muted-foreground mb-0.5">Nameting</p>
                <p className="text-xl font-light text-primary">{post.overall_score?.toFixed(2)}</p>
                <p className="text-[10px] text-muted-foreground">{format(new Date(post.submitted_at), "d MMM yyyy", { locale: nl })}</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2.5">
                <p className="text-[10px] text-muted-foreground mb-0.5">Verschil</p>
                {(() => {
                  const diff = (post.overall_score || 0) - (pre.overall_score || 0);
                  return <p className={`text-xl font-light ${diff > 0 ? "text-sage-600" : diff < 0 ? "text-destructive" : "text-muted-foreground"}`}>{diff > 0 ? "+" : ""}{diff.toFixed(2)}</p>;
                })()}
              </div>
            </div>
            <div className="space-y-1.5">
              {SUBSCALES.map(({ key, label, positive }) => {
                const preVal = (pre as any)[key] as number | null;
                const postVal = (post as any)[key] as number | null;
                const diff = (postVal || 0) - (preVal || 0);
                const improved = positive ? diff > 0 : diff < 0;
                return (
                  <div key={key} className="flex items-center gap-2 text-[10px]">
                    <span className="w-32 text-muted-foreground">{label}</span>
                    <Progress value={((preVal || 0) / 5) * 100} className="h-1 flex-1" />
                    <span className="w-7 text-right">{preVal?.toFixed(1)}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className={`w-7 text-right font-medium ${improved ? "text-sage-600" : ""}`}>{postVal?.toFixed(1)}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        submissions.map(s => (
          <Card key={s.id} className="border-border/40">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-[10px]">{s.measurement_type === "pre" ? "0-meting" : "Nameting"}</Badge>
                <span className="text-[10px] text-muted-foreground">{format(new Date(s.submitted_at), "d MMM yyyy", { locale: nl })}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center pr-3 border-r border-border/40">
                  <p className="text-xl font-light text-primary">{s.overall_score?.toFixed(2)}</p>
                  <p className="text-[10px] text-muted-foreground">Totaal</p>
                </div>
                <div className="flex-1 space-y-1">
                  {SUBSCALES.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2 text-[10px]">
                      <span className="w-32 text-muted-foreground">{label}</span>
                      <Progress value={(((s as any)[key] || 0) / 5) * 100} className="h-1 flex-1" />
                      <span className="w-6 text-right font-medium">{((s as any)[key] as number)?.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
