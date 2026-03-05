import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Mail, Phone, Calendar, Euro, ShoppingBag, Clock, AlertCircle, CheckCircle2,
  Copy, FileText, BarChart3, ClipboardList, Brain, MessageSquare, Heart, Target,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import type { CustomerData, SessionAppointment, Enrollment, Registration, TrainerNote } from "./types";

interface OverviewTabProps {
  customer: CustomerData;
  enrollments: Enrollment[];
  registrations: Registration[];
  sessionAppointments: SessionAppointment[];
  structuredNotes: TrainerNote[];
  onTrainingClick: (training: string) => void;
  onTabChange: (tab: string) => void;
}

interface IntakeSummary {
  enrollment_id: string;
  submitted_at: string;
  reason: string | null;
}

interface ScsSummary {
  enrollment_id: string;
  overall_score: number | null;
  measurement_type: string;
  submitted_at: string;
}

interface TherapyCount {
  enrollment_id: string;
  count: number;
}

export default function OverviewTab({
  customer, enrollments, registrations, sessionAppointments, structuredNotes, onTrainingClick, onTabChange,
}: OverviewTabProps) {
  const [intakeSummaries, setIntakeSummaries] = useState<IntakeSummary[]>([]);
  const [scsSummaries, setScsSummaries] = useState<ScsSummary[]>([]);
  const [therapyCounts, setTherapyCounts] = useState<TherapyCount[]>([]);
  const [loadingExtra, setLoadingExtra] = useState(true);

  useEffect(() => {
    if (enrollments.length === 0) { setLoadingExtra(false); return; }
    const enrIds = enrollments.map(e => e.id);
    Promise.all([
      supabase.from("intake_submissions").select("enrollment_id, submitted_at, reason").in("enrollment_id", enrIds),
      supabase.from("scs_submissions").select("enrollment_id, overall_score, measurement_type, submitted_at").in("enrollment_id", enrIds).order("submitted_at", { ascending: false }),
      supabase.from("therapy_sessions").select("enrollment_id").in("enrollment_id", enrIds),
    ]).then(([intakeRes, scsRes, therapyRes]) => {
      setIntakeSummaries((intakeRes.data || []) as IntakeSummary[]);
      setScsSummaries((scsRes.data || []) as ScsSummary[]);
      // Count therapy sessions per enrollment
      const counts: Record<string, number> = {};
      (therapyRes.data || []).forEach((t: any) => { counts[t.enrollment_id] = (counts[t.enrollment_id] || 0) + 1; });
      setTherapyCounts(Object.entries(counts).map(([enrollment_id, count]) => ({ enrollment_id, count })));
      setLoadingExtra(false);
    });
  }, [enrollments]);

  const individualEnrollments = enrollments.filter(
    e => e.course_type === "individueel_6" || e.course_type === "losse_sessie"
  );
  const hasIndividual = individualEnrollments.length > 0;

  const totalSessions = individualEnrollments.reduce(
    (sum, e) => sum + (e.sessions_total || (e.course_type === "individueel_6" ? 6 : 1)), 0
  );
  const completed = sessionAppointments.filter(
    a => a.status === "afgerond" && individualEnrollments.some(e => e.id === a.enrollment_id)
  ).length;
  const percentage = totalSessions > 0 ? (completed / totalSessions) * 100 : 0;

  const today = new Date().toISOString().split("T")[0];
  const nextSession = sessionAppointments
    .filter(a => a.status === "gepland" && a.session_date && a.session_date >= today)
    .sort((a, b) => (a.session_date || "").localeCompare(b.session_date || ""))[0] || null;

  const intakeCount = intakeSummaries.length;
  const scsCount = scsSummaries.length;
  const therapyCount = therapyCounts.reduce((s, t) => s + t.count, 0);
  const trainerNoteCount = structuredNotes.filter(n => n.content.trim()).length;

  return (
    <div className="space-y-4">
      {/* Header info */}
      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          <a href={`mailto:${customer.email}`} className="hover:underline">{customer.email}</a>
        </span>
        {customer.phone && (
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <a href={`tel:${customer.phone}`} className="hover:underline">{customer.phone}</a>
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Aanmeldingen</p>
            <p className="text-lg font-semibold leading-tight">{customer.total_registrations}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Euro className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Totaal betaald</p>
            <p className="text-lg font-semibold leading-tight">€{customer.total_spent?.toLocaleString('nl-NL') || 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Klant sinds</p>
            <p className="text-lg font-semibold leading-tight">
              {format(new Date(customer.first_registration), "MMM yyyy", { locale: nl })}
            </p>
          </div>
        </div>
      </div>

      {/* Training badges */}
      {customer.trainings && customer.trainings.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-1.5">Actieve trainingen</p>
          <div className="flex flex-wrap gap-1.5">
            {customer.trainings.map((training, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => onTrainingClick(training)}
              >
                {training}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Session progress for individual */}
      {hasIndividual && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Sessie voortgang
              </span>
              <span>{completed} van {totalSessions} sessies afgerond</span>
            </div>
            <Progress value={percentage} className="h-2" />
            <div className="text-sm">
              {nextSession?.session_date ? (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>
                    Volgende sessie:{" "}
                    <strong>
                      {new Date(nextSession.session_date).toLocaleDateString("nl-NL", {
                        weekday: "short", day: "numeric", month: "short",
                      })}
                    </strong>
                    {nextSession.session_time && ` om ${nextSession.session_time.slice(0, 5)}`}
                  </span>
                </div>
              ) : (
                <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <AlertCircle className="h-3.5 w-3.5" /> Geen sessie gepland
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data completeness overview */}
      {!loadingExtra && enrollments.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-2">Dossier overzicht</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onTabChange("questionnaires")}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/60 transition-colors text-left"
            >
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">Intake formulieren</p>
                <p className="text-[10px] text-muted-foreground">
                  {intakeCount > 0 ? `${intakeCount} ingevuld` : "Niet ingevuld"}
                </p>
              </div>
              {intakeCount > 0 ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              )}
            </button>

            <button
              onClick={() => onTabChange("questionnaires")}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/60 transition-colors text-left"
            >
              <BarChart3 className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">SCS Vragenlijst</p>
                <p className="text-[10px] text-muted-foreground">
                  {scsCount > 0
                    ? `${scsCount} ingevuld (score: ${scsSummaries[0]?.overall_score?.toFixed(1) || "—"})`
                    : "Niet ingevuld"
                  }
                </p>
              </div>
              {scsCount > 0 ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              )}
            </button>

            <button
              onClick={() => onTabChange("notes")}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/60 transition-colors text-left"
            >
              <Brain className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">AI Sessienotities</p>
                <p className="text-[10px] text-muted-foreground">
                  {therapyCount > 0 ? `${therapyCount} sessie${therapyCount !== 1 ? "s" : ""}` : "Geen notities"}
                </p>
              </div>
              {therapyCount > 0 ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              )}
            </button>

            <button
              onClick={() => onTabChange("notes")}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/60 transition-colors text-left"
            >
              <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">Trainernotities</p>
                <p className="text-[10px] text-muted-foreground">
                  {trainerNoteCount > 0 ? `${trainerNoteCount} notitie${trainerNoteCount !== 1 ? "s" : ""}` : "Geen notities"}
                </p>
              </div>
              {trainerNoteCount > 0 ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Intake summary */}
      {!loadingExtra && enrollments.some(e => e.intake_reason || e.intake_theme || e.intake_goal) && (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-1.5 flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5" /> Intake & Intentie
          </p>
          {enrollments.filter(e => e.intake_reason || e.intake_theme || e.intake_goal).map(e => (
            <div key={e.id} className="bg-muted/20 rounded-lg p-3 space-y-1 text-sm">
              {e.intake_reason && <div className="flex gap-2"><Heart className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /><span>{e.intake_reason}</span></div>}
              {e.intake_theme && <div className="flex gap-2"><Target className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /><span>{e.intake_theme}</span></div>}
              {e.intake_goal && <div className="flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /><span>{e.intake_goal}</span></div>}
            </div>
          ))}
        </div>
      )}

      {/* Quick questionnaire links */}
      {enrollments.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-1.5 flex items-center gap-1.5">
            <ClipboardList className="h-3.5 w-3.5" /> Snelle links
          </p>
          <div className="space-y-1.5">
            {enrollments.map(enrollment => {
              const intakeUrl = `${window.location.origin}/intake/${enrollment.id}`;
              const preUrl = `${window.location.origin}/vragenlijst/${enrollment.id}`;
              const postUrl = `${window.location.origin}/vragenlijst/${enrollment.id}?type=post`;
              const copyLink = (url: string, label: string) => {
                navigator.clipboard.writeText(url);
                toast.success(`${label} gekopieerd!`);
              };
              return (
                <div key={enrollment.id} className="flex flex-wrap items-center gap-1.5">
                  <Button size="sm" variant="ghost" className="h-6 text-xs gap-1" onClick={() => copyLink(intakeUrl, "Intake-link")}>
                    <FileText className="h-3 w-3" /> Intake
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 text-xs gap-1" onClick={() => copyLink(preUrl, "0-meting link")}>
                    <BarChart3 className="h-3 w-3" /> 0-meting
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 text-xs gap-1" onClick={() => copyLink(postUrl, "Nameting link")}>
                    <BarChart3 className="h-3 w-3" /> Nameting
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}