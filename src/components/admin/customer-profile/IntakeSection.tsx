import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Target, Heart, CheckCircle2, Save, Loader2, Link2, Copy, ExternalLink,
  Stethoscope, Clock, Phone, FileText, Sparkles, ClipboardList, BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import type { Enrollment } from "./types";

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

interface IntakeSectionProps {
  enrollment: Enrollment;
  onUpdate: (updated: Enrollment) => void;
}

export default function IntakeSection({ enrollment, onUpdate }: IntakeSectionProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ reason: "", theme: "", goal: "" });
  const [saving, setSaving] = useState(false);
  const [submission, setSubmission] = useState<IntakeSubmission | null>(null);
  const [scsSubmissions, setScsSubmissions] = useState<ScsSubmission[]>([]);
  const [loadingSub, setLoadingSub] = useState(true);

  useEffect(() => {
    fetchSubmission();
  }, [enrollment.id]);

  const fetchSubmission = async () => {
    setLoadingSub(true);
    const [intakeRes, scsRes] = await Promise.all([
      supabase
        .from("intake_submissions")
        .select("*")
        .eq("enrollment_id", enrollment.id)
        .order("submitted_at", { ascending: false })
        .limit(1),
      supabase
        .from("scs_submissions" as any)
        .select("*")
        .eq("enrollment_id", enrollment.id)
        .order("submitted_at", { ascending: false }),
    ]);
    setSubmission(intakeRes.data && intakeRes.data.length > 0 ? intakeRes.data[0] as IntakeSubmission : null);
    setScsSubmissions((scsRes.data || []) as unknown as ScsSubmission[]);
    setLoadingSub(false);
  };

  const startEdit = () => {
    setEditing(true);
    setForm({
      reason: enrollment.intake_reason || "",
      theme: enrollment.intake_theme || "",
      goal: enrollment.intake_goal || "",
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("enrollments")
        .update({ intake_reason: form.reason || null, intake_theme: form.theme || null, intake_goal: form.goal || null })
        .eq("id", enrollment.id);
      if (error) throw error;
      onUpdate({ ...enrollment, intake_reason: form.reason || null, intake_theme: form.theme || null, intake_goal: form.goal || null });
      setEditing(false);
      toast.success("Intake opgeslagen");
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSaving(false);
  };

  const copyIntakeLink = () => {
    const url = `${window.location.origin}/intake/${enrollment.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Intake-link gekopieerd!");
  };

  const copyScsLink = () => {
    const url = `${window.location.origin}/vragenlijst/${enrollment.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Vragenlijst-link gekopieerd!");
  };

  const hasIntake = enrollment.intake_reason || enrollment.intake_theme || enrollment.intake_goal;

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

  return (
    <div className="space-y-3">
      {/* Trainer intake notes */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <Target className="h-3 w-3" /> Intake & Intentie (trainer)
          </p>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-6 text-xs gap-1" onClick={copyIntakeLink} title="Kopieer intake formulier link">
              <Link2 className="h-3 w-3" /> Intake-link
            </Button>
            {!editing && (
              <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={startEdit}>
                Bewerken
              </Button>
            )}
          </div>
        </div>
        {editing ? (
          <div className="space-y-2 bg-muted/30 rounded-lg p-3">
            <div>
              <Label className="text-xs">Waarom gestart?</Label>
              <Input className="h-8 text-xs" value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} placeholder="Reden van aanmelding" />
            </div>
            <div>
              <Label className="text-xs">Belangrijk thema</Label>
              <Input className="h-8 text-xs" value={form.theme} onChange={e => setForm(f => ({ ...f, theme: e.target.value }))} placeholder="Centraal thema" />
            </div>
            <div>
              <Label className="text-xs">Doel van het traject</Label>
              <Input className="h-8 text-xs" value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} placeholder="Wat wil de deelnemer bereiken?" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="gap-1.5 text-xs h-7" onClick={save} disabled={saving}>
                {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />} Opslaan
              </Button>
              <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => setEditing(false)}>Annuleren</Button>
            </div>
          </div>
        ) : hasIntake ? (
          <div className="space-y-1 text-sm bg-muted/20 rounded-lg p-3">
            {enrollment.intake_reason && <div className="flex gap-2"><Heart className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /><span>{enrollment.intake_reason}</span></div>}
            {enrollment.intake_theme && <div className="flex gap-2"><Target className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /><span>{enrollment.intake_theme}</span></div>}
            {enrollment.intake_goal && <div className="flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /><span>{enrollment.intake_goal}</span></div>}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">Nog geen intake ingevuld door trainer</p>
        )}
      </div>

      {/* Client-submitted intake */}
      {loadingSub ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" /> Intake formulier laden...
        </div>
      ) : submission ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
              <FileText className="h-3 w-3" /> Intake formulier (deelnemer)
            </p>
            <Badge className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0">
              Ingevuld {new Date(submission.submitted_at).toLocaleDateString("nl-NL")}
            </Badge>
          </div>
          <div className="bg-muted/20 rounded-lg p-3 space-y-2">
            <InfoRow icon={Heart} label="Reden van aanmelding" value={submission.reason} />
            <InfoRow icon={Target} label="Belangrijk thema" value={submission.main_theme} />
            <InfoRow icon={CheckCircle2} label="Doel" value={submission.goal} />
            <InfoRow icon={Sparkles} label="Verwachtingen" value={submission.expectations} />
            <InfoRow icon={Stethoscope} label="Ervaring mindfulness" value={submission.mindfulness_experience} />
            <InfoRow icon={Stethoscope} label="Gezondheidssituatie" value={submission.health_situation} />
            <InfoRow icon={Clock} label="Beschikbaarheid" value={submission.availability} />
            <InfoRow icon={Phone} label="Noodcontact" value={submission.emergency_contact} />
            <InfoRow icon={FileText} label="Overig" value={submission.additional_notes} />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/20 rounded-lg p-3">
          <FileText className="h-3.5 w-3.5" />
          <span className="flex-1">Deelnemer heeft het intake formulier nog niet ingevuld.</span>
          <Button size="sm" variant="outline" className="h-6 text-xs gap-1" onClick={copyIntakeLink}>
            <Copy className="h-3 w-3" /> Link kopiëren
          </Button>
        </div>
      )}

      {/* SCS Questionnaire section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <ClipboardList className="h-3 w-3" /> Zelfcompassie Vragenlijst (0-meting)
          </p>
          <Button size="sm" variant="ghost" className="h-6 text-xs gap-1" onClick={copyScsLink}>
            <Link2 className="h-3 w-3" /> Vragenlijst-link
          </Button>
        </div>

        {loadingSub ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" /> Laden...
          </div>
        ) : scsSubmissions.length > 0 ? (
          <div className="space-y-2">
            {scsSubmissions.map((scs) => (
              <div key={scs.id} className="bg-muted/20 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {scs.measurement_type === "pre" ? "0-meting" : scs.measurement_type === "post" ? "Nameting" : scs.measurement_type}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(scs.submitted_at).toLocaleDateString("nl-NL")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-light text-primary">{scs.overall_score?.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground">Totaal</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[
                      { label: "Zelfvriendelijkheid", value: scs.self_kindness, positive: true },
                      { label: "Gedeelde menselijkheid", value: scs.common_humanity, positive: true },
                      { label: "Mindfulness", value: scs.mindfulness, positive: true },
                      { label: "Zelfoordeel", value: scs.self_judgment, positive: false },
                      { label: "Isolatie", value: scs.isolation, positive: false },
                      { label: "Over-identificatie", value: scs.over_identification, positive: false },
                    ].map(({ label, value, positive }) => (
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
        ) : (
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/20 rounded-lg p-3">
            <BarChart3 className="h-3.5 w-3.5" />
            <span className="flex-1">Deelnemer heeft de vragenlijst nog niet ingevuld.</span>
            <Button size="sm" variant="outline" className="h-6 text-xs gap-1" onClick={copyScsLink}>
              <Copy className="h-3 w-3" /> Link kopiëren
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
