import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Copy, ClipboardList, BarChart3, FileText, Loader2, CheckCircle2, Heart, Target, Sparkles, Stethoscope, Clock, Phone } from "lucide-react";
import { toast } from "sonner";
import type { Enrollment } from "./types";
import { COURSE_TYPES } from "./types";

interface IntakeSubmission {
  id: string;
  reason: string | null;
  main_theme: string | null;
  goal: string | null;
  expectations: string | null;
  mindfulness_experience: string | null;
  health_situation: string | null;
  availability: string | null;
  emergency_contact: string | null;
  additional_notes: string | null;
  submitted_at: string;
}

interface ScsSubmission {
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

interface QuestionnairesTabProps {
  enrollments: Enrollment[];
}

const InfoRow = ({ icon: Icon, label, value }: { icon: typeof Heart; label: string; value: string | null }) => {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm">
      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
      <div>
        <span className="text-xs text-muted-foreground">{label}</span>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default function QuestionnairesTab({ enrollments }: QuestionnairesTabProps) {
  const [intakes, setIntakes] = useState<Record<string, IntakeSubmission | null>>({});
  const [scsData, setScsData] = useState<Record<string, ScsSubmission[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [enrollments]);

  const fetchData = async () => {
    if (enrollments.length === 0) { setLoading(false); return; }
    setLoading(true);
    const enrIds = enrollments.map(e => e.id);
    const [intakeRes, scsRes] = await Promise.all([
      supabase.from("intake_submissions").select("*").in("enrollment_id", enrIds),
      supabase.from("scs_submissions").select("*").in("enrollment_id", enrIds).order("submitted_at", { ascending: false }),
    ]);

    const intakeMap: Record<string, IntakeSubmission | null> = {};
    (intakeRes.data || []).forEach((i: any) => {
      if (!intakeMap[i.enrollment_id]) intakeMap[i.enrollment_id] = i as IntakeSubmission;
    });
    setIntakes(intakeMap);

    const scsMap: Record<string, ScsSubmission[]> = {};
    (scsRes.data || []).forEach((s: any) => {
      if (!scsMap[s.enrollment_id]) scsMap[s.enrollment_id] = [];
      scsMap[s.enrollment_id].push(s as ScsSubmission);
    });
    setScsData(scsMap);
    setLoading(false);
  };

  const copyLink = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    toast.success(`${label} gekopieerd!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        Geen inschrijvingen gevonden. Maak eerst een inschrijving aan.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {enrollments.map(enrollment => {
        const intakeUrl = `${window.location.origin}/intake/${enrollment.id}`;
        const preUrl = `${window.location.origin}/vragenlijst/${enrollment.id}`;
        const postUrl = `${window.location.origin}/vragenlijst/${enrollment.id}?type=post`;
        const intake = intakes[enrollment.id] || null;
        const scs = scsData[enrollment.id] || [];

        return (
          <Card key={enrollment.id}>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm flex-1">
                  {COURSE_TYPES[enrollment.course_type] || enrollment.course_type}
                </span>
                <Badge variant="outline" className="text-[10px]">
                  Start: {new Date(enrollment.start_date).toLocaleDateString("nl-NL")}
                </Badge>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-1.5">
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyLink(intakeUrl, "Intake-link")}>
                  <FileText className="h-3 w-3" /> Intake-link
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyLink(preUrl, "0-meting link")}>
                  <BarChart3 className="h-3 w-3" /> 0-meting link
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyLink(postUrl, "Nameting link")}>
                  <BarChart3 className="h-3 w-3" /> Nameting link
                </Button>
              </div>

              {/* Intake data */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">Intake formulier</p>
                  {intake ? (
                    <Badge className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0">
                      Ingevuld {new Date(intake.submitted_at).toLocaleDateString("nl-NL")}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Niet ingevuld</Badge>
                  )}
                </div>
                {intake && (
                  <div className="bg-muted/20 rounded-lg p-3 space-y-2">
                    <InfoRow icon={Heart} label="Reden van aanmelding" value={intake.reason} />
                    <InfoRow icon={Target} label="Belangrijk thema" value={intake.main_theme} />
                    <InfoRow icon={CheckCircle2} label="Doel" value={intake.goal} />
                    <InfoRow icon={Sparkles} label="Verwachtingen" value={intake.expectations} />
                    <InfoRow icon={Stethoscope} label="Ervaring mindfulness" value={intake.mindfulness_experience} />
                    <InfoRow icon={Stethoscope} label="Gezondheidssituatie" value={intake.health_situation} />
                    <InfoRow icon={Clock} label="Beschikbaarheid" value={intake.availability} />
                    <InfoRow icon={Phone} label="Noodcontact" value={intake.emergency_contact} />
                    <InfoRow icon={FileText} label="Overig" value={intake.additional_notes} />
                  </div>
                )}
              </div>

              {/* SCS data */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">Zelfcompassie Vragenlijst (SCS)</p>
                  {scs.length > 0 ? (
                    <Badge className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0">
                      {scs.length} ingevuld
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Niet ingevuld</Badge>
                  )}
                </div>
                {scs.length > 0 && (
                  <div className="space-y-2">
                    {scs.map((s) => (
                      <div key={s.id} className="bg-muted/20 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {s.measurement_type === "pre" ? "0-meting" : s.measurement_type === "post" ? "Nameting" : s.measurement_type}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(s.submitted_at).toLocaleDateString("nl-NL")}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-2xl font-light text-primary">{s.overall_score?.toFixed(2)}</p>
                            <p className="text-[10px] text-muted-foreground">Totaal</p>
                          </div>
                          <div className="flex-1 space-y-1">
                            {[
                              { label: "Zelfvriendelijkheid", value: s.self_kindness, positive: true },
                              { label: "Gedeelde menselijkheid", value: s.common_humanity, positive: true },
                              { label: "Mindfulness", value: s.mindfulness, positive: true },
                              { label: "Zelfoordeel", value: s.self_judgment, positive: false },
                              { label: "Isolatie", value: s.isolation, positive: false },
                              { label: "Over-identificatie", value: s.over_identification, positive: false },
                            ].map(({ label, value }) => (
                              <div key={label} className="flex items-center gap-1.5 text-[10px]">
                                <span className="w-28 text-muted-foreground truncate">{label}</span>
                                <Progress value={((value || 0) / 5) * 100} className="h-1.5 flex-1" />
                                <span className="w-6 text-right font-medium">{value?.toFixed(1)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}