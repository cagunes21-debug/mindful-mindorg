import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft, Loader2, Plus, Mail, Phone, Calendar, Euro, ChevronDown,
  Sparkles, Save, CheckCircle2, AlertCircle, Clock, Target, Heart, Brain,
  FileText, RefreshCw, Trash2, Pencil, X, BarChart3,
  Users, User, Globe, Shield, AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import type { CustomerData, Registration, Enrollment, TrainerNote, SessionAppointment } from "@/components/admin/customer-profile/types";
import TherapySessionSection from "@/components/admin/customer-profile/TherapySessionSection";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClientRecord {
  id: string;
  source: string | null;
  phone: string | null;
}

// ─── Status helpers ───────────────────────────────────────────────────────────

function getStatusBadge(enrollments: Enrollment[]): { label: string; className: string } {
  if (enrollments.length === 0) return { label: "Nieuw", className: "bg-secondary text-secondary-foreground" };
  const active = enrollments.find(e => e.status === "active");
  if (!active) {
    if (enrollments.every(e => e.status === "completed")) return { label: "Afgerond", className: "bg-sage-100 text-sage-800" };
    if (enrollments.some(e => e.status === "cancelled")) return { label: "Geannuleerd", className: "bg-destructive/10 text-destructive" };
    return { label: "Inactief", className: "bg-secondary text-secondary-foreground" };
  }
  const used = active.sessions_used || 0;
  if (used === 0) return { label: "Intake", className: "bg-terracotta-100 text-terracotta-700" };
  return { label: "In training", className: "bg-sage-100 text-sage-700" };
}

function getTrainingType(enrollments: Enrollment[]): string {
  const hasGroup = enrollments.some(e => e.course_type === "msc_8week");
  const hasIndiv = enrollments.some(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie");
  if (hasGroup && hasIndiv) return "Groep & Individueel";
  if (hasGroup) return "Groepstraining";
  if (hasIndiv) return "Individueel";
  return "";
}

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

// ─── Phase Stepper ────────────────────────────────────────────────────────────

const PHASES = [
  { key: "intake", label: "Intake", icon: Heart },
  { key: "in_training", label: "Training", icon: Brain },
  { key: "afronding", label: "Afronding", icon: Target },
  { key: "nazorg", label: "Nazorg", icon: CheckCircle2 },
] as const;

function getClientPhase(enrollments: Enrollment[], sessionAppointments: SessionAppointment[]): string {
  if (enrollments.length === 0) return "intake";
  const active = enrollments.find(e => e.status === "active");
  const completed = enrollments.every(e => e.status === "completed");
  if (completed) return "nazorg";
  if (!active) return "intake";
  const total = active.sessions_total || 6;
  const used = active.sessions_used || 0;
  if (used === 0) return "intake";
  if (used >= total) return "afronding";
  return "in_training";
}

function PhaseStepperBar({ enrollments, sessionAppointments }: { enrollments: Enrollment[]; sessionAppointments: SessionAppointment[] }) {
  const currentPhase = getClientPhase(enrollments, sessionAppointments);
  const phaseIdx = PHASES.findIndex(p => p.key === currentPhase);

  return (
    <div className="flex items-center gap-1">
      {PHASES.map((phase, i) => {
        const isActive = i === phaseIdx;
        const isPast = i < phaseIdx;
        const Icon = phase.icon;

        return (
          <div key={phase.key} className="flex items-center flex-1">
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all w-full justify-center ${
              isActive
                ? "bg-primary/10 text-primary border border-primary/20"
                : isPast
                ? "bg-sage-100 text-sage-700"
                : "bg-secondary/60 text-muted-foreground"
            }`}>
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{phase.label}</span>
            </div>
            {i < PHASES.length - 1 && (
              <div className={`h-0.5 w-3 mx-0.5 rounded shrink-0 ${isPast ? "bg-sage-400" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Intake Form ──────────────────────────────────────────────────────────────

const INTAKE_QUESTIONS = [
  { key: "reason", label: "Wat brengt je hier?", icon: Heart },
  { key: "duration_of_issue", label: "Hoe lang speelt dit al?", icon: Clock },
  { key: "daily_impact", label: "Impact op dagelijks leven", icon: AlertCircle },
  { key: "goal", label: "Wat wil je bereiken?", icon: Target },
  { key: "previous_therapy", label: "Eerdere therapie/coaching", icon: Brain },
] as const;

function IntakeSection({ enrollmentId }: { enrollmentId: string }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [existingId, setExistingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [suitability, setSuitability] = useState("");
  const [contraindications, setContraindications] = useState("");
  const [intakeDate, setIntakeDate] = useState("");
  const [intakeDuration, setIntakeDuration] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("intake_submissions")
        .select("id, reason, goal, duration_of_issue, daily_impact, previous_therapy, suitability_assessment, contraindications, intake_date, intake_duration_minutes")
        .eq("enrollment_id", enrollmentId)
        .limit(1)
        .maybeSingle();
      if (data) {
        setExistingId(data.id);
        setFormData({
          reason: (data as any).reason || "",
          duration_of_issue: (data as any).duration_of_issue || "",
          daily_impact: (data as any).daily_impact || "",
          goal: (data as any).goal || "",
          previous_therapy: (data as any).previous_therapy || "",
        });
        setSuitability((data as any).suitability_assessment || "");
        setContraindications((data as any).contraindications || "");
        setIntakeDate((data as any).intake_date || "");
        setIntakeDuration((data as any).intake_duration_minutes?.toString() || "");
      }
      setLoading(false);
    })();
  }, [enrollmentId]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload: any = {
        enrollment_id: enrollmentId,
        reason: formData.reason?.trim() || null,
        goal: formData.goal?.trim() || null,
        duration_of_issue: formData.duration_of_issue?.trim() || null,
        daily_impact: formData.daily_impact?.trim() || null,
        previous_therapy: formData.previous_therapy?.trim() || null,
        suitability_assessment: suitability || null,
        contraindications: contraindications.trim() || null,
        intake_date: intakeDate || null,
        intake_duration_minutes: intakeDuration ? parseInt(intakeDuration) : null,
      };
      if (existingId) {
        const { error } = await supabase.from("intake_submissions").update(payload).eq("id", existingId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("intake_submissions").insert(payload).select("id").single();
        if (error) throw error;
        setExistingId(data.id);
      }
      setSaved(true);
      toast.success("Intake opgeslagen");
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-5">
      {/* Kennismakingsgesprek */}
      <div className="rounded-xl bg-secondary/50 p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> Kennismakingsgesprek
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Datum</Label>
            <Input type="date" value={intakeDate} onChange={e => setIntakeDate(e.target.value)} className="h-9 text-sm mt-1" />
          </div>
          <div>
            <Label className="text-xs">Duur (minuten)</Label>
            <Input type="number" value={intakeDuration} onChange={e => setIntakeDuration(e.target.value)} placeholder="45" className="h-9 text-sm mt-1" />
          </div>
        </div>
      </div>

      {/* Intake questions */}
      <div className="space-y-4">
        {INTAKE_QUESTIONS.map(q => (
          <div key={q.key}>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <q.icon className="h-3.5 w-3.5" /> {q.label}
            </label>
            <Textarea
              value={formData[q.key] || ""}
              onChange={e => setFormData(prev => ({ ...prev, [q.key]: e.target.value }))}
              placeholder="..."
              className="min-h-[56px] resize-none text-sm"
            />
          </div>
        ))}
      </div>

      {/* Klinisch oordeel */}
      <div className="rounded-xl bg-secondary/50 p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" /> Klinisch oordeel
        </p>
        <div>
          <Label className="text-xs">Geschiktheidsoordeel</Label>
          <Select value={suitability} onValueChange={setSuitability}>
            <SelectTrigger className="h-9 text-sm mt-1"><SelectValue placeholder="Selecteer..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="geschikt">✓ Geschikt</SelectItem>
              <SelectItem value="niet_geschikt">✗ Niet geschikt</SelectItem>
              <SelectItem value="doorverwijzen">→ Doorverwijzen</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Contra-indicaties</Label>
          <Textarea
            value={contraindications}
            onChange={e => setContraindications(e.target.value)}
            placeholder="Eventuele contra-indicaties..."
            className="min-h-[56px] resize-none text-sm mt-1"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
          {saved ? "Opgeslagen" : "Opslaan"}
        </Button>
      </div>
    </div>
  );
}

// ─── AI Summary ───────────────────────────────────────────────────────────────

function AiSummaryCard({ email }: { email: string }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("client-summary", {
        body: { client_email: email },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setSummary(data.summary);
      setHasGenerated(true);
    } catch (err: any) {
      toast.error(err.message || "Samenvatting kon niet worden gegenereerd");
    }
    setLoading(false);
  };

  return (
    <Card className="border-border/40 bg-gradient-to-br from-card to-secondary/30 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold">AI Samenvatting</span>
          </div>
          <Button size="sm" variant="outline" onClick={generateSummary} disabled={loading} className="gap-1.5 text-xs h-8 rounded-lg">
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : hasGenerated ? <RefreshCw className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
            {loading ? "Genereren..." : hasGenerated ? "Vernieuwen" : "Genereer"}
          </Button>
        </div>
        {summary ? (
          <div className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{summary}</div>
        ) : (
          <p className="text-sm text-muted-foreground">Klik op "Genereer" voor een AI-samenvatting van dit dossier.</p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Session Templates ────────────────────────────────────────────────────────

const INTAKE_TEMPLATE_FIELDS = [
  { key: "aanmeldreden", label: "Aanmeldreden", placeholder: "Waarom meldt de cliënt zich aan?" },
  { key: "achtergrond", label: "Achtergrond & context", placeholder: "Relevante voorgeschiedenis..." },
  { key: "klachten", label: "Klachten & impact", placeholder: "Wat ervaart de cliënt?" },
  { key: "doelen", label: "Doelen & verwachtingen", placeholder: "Wat hoopt de cliënt te bereiken?" },
  { key: "observaties", label: "Observaties therapeut", placeholder: "Eerste indruk, signalen..." },
  { key: "plan", label: "Voorlopig plan", placeholder: "Werkwijze, focus eerste sessies..." },
] as const;

const SESSION_TEMPLATE_FIELDS = [
  { key: "thema", label: "Thema van de sessie", placeholder: "Waar ging de sessie over?" },
  { key: "besproken", label: "Wat is besproken", placeholder: "Samenvatting van de inhoud..." },
  { key: "oefeningen", label: "Oefeningen & interventies", placeholder: "Welke technieken zijn gebruikt?" },
  { key: "observaties", label: "Observaties", placeholder: "Wat viel op?" },
  { key: "huiswerk", label: "Huiswerk & afspraken", placeholder: "Wat neemt de cliënt mee?" },
] as const;

// ─── Sessions Section ─────────────────────────────────────────────────────────

function SessionsSection({ sessionAppointments, enrollments, onUpdate }: {
  sessionAppointments: SessionAppointment[];
  enrollments: Enrollment[];
  onUpdate: () => void;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [addDate, setAddDate] = useState("");
  const [addTime, setAddTime] = useState("");
  const [addEnrollmentId, setAddEnrollmentId] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [sessionNotes, setSessionNotes] = useState<Record<string, Record<string, string>>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);

  const groupEnrollments = enrollments.filter(e => e.course_type === "msc_8week");
  const indivEnrollments = enrollments.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie");
  const allRelevant = [...indivEnrollments, ...groupEnrollments];

  useEffect(() => {
    if (!addEnrollmentId && allRelevant.length > 0) setAddEnrollmentId(allRelevant[0].id);
  }, [allRelevant.length]);

  const handleAdd = async () => {
    const targetEnrollment = allRelevant.find(e => e.id === addEnrollmentId) || allRelevant[0];
    if (!targetEnrollment || !addDate) { toast.error("Selecteer een datum"); return; }
    setSaving(true);
    try {
      const nextWeek = sessionAppointments.filter(a => a.enrollment_id === targetEnrollment.id).length + 1;
      const { error } = await supabase.from("session_appointments").insert({
        enrollment_id: targetEnrollment.id,
        week_number: nextWeek,
        session_date: addDate,
        session_time: addTime || null,
        status: "gepland",
      });
      if (error) throw error;
      toast.success("Sessie ingepland");
      setShowAdd(false); setAddDate(""); setAddTime("");
      onUpdate();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSaving(false);
  };

  const startEdit = (appt: SessionAppointment) => {
    setEditingId(appt.id);
    setEditStatus(appt.status);
    setEditNotes(appt.notes || "");
    setEditDate(appt.session_date || "");
    setEditTime(appt.session_time || "");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setUpdatingId(editingId);
    try {
      const { error } = await supabase.from("session_appointments").update({
        status: editStatus, notes: editNotes.trim() || null,
        session_date: editDate || null, session_time: editTime || null,
      }).eq("id", editingId);
      if (error) throw error;
      if (editStatus === "afgerond") {
        const appt = sessionAppointments.find(a => a.id === editingId);
        if (appt) {
          const enrollment = enrollments.find(e => e.id === appt.enrollment_id);
          if (enrollment) {
            const completedCount = sessionAppointments.filter(a => a.enrollment_id === enrollment.id && a.status === "afgerond").length + 1;
            await supabase.from("enrollments").update({ sessions_used: completedCount }).eq("id", enrollment.id);
          }
        }
      }
      toast.success("Sessie bijgewerkt"); setEditingId(null); onUpdate();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setUpdatingId(null);
  };

  const deleteAppt = async (id: string) => {
    if (!confirm("Sessie verwijderen?")) return;
    const { error } = await supabase.from("session_appointments").delete().eq("id", id);
    if (!error) { toast.success("Sessie verwijderd"); onUpdate(); }
    else toast.error("Kon niet verwijderen");
  };

  const saveSessionNotes = async (apptId: string, notes: Record<string, string>) => {
    setSavingNotes(apptId);
    try {
      const { error } = await supabase.from("session_appointments").update({ notes: JSON.stringify(notes) }).eq("id", apptId);
      if (error) throw error;
      toast.success("Notities opgeslagen"); onUpdate();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSavingNotes(null);
  };

  const loadSessionNotes = (appt: SessionAppointment): Record<string, string> => {
    if (sessionNotes[appt.id]) return sessionNotes[appt.id];
    if (appt.notes) {
      try {
        const parsed = JSON.parse(appt.notes);
        if (typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
      } catch { /* plain text */ }
    }
    return {};
  };

  const updateNoteField = (apptId: string, key: string, value: string) => {
    setSessionNotes(prev => ({ ...prev, [apptId]: { ...(prev[apptId] || {}), [key]: value } }));
  };

  const getEnrollmentLabel = (enrollmentId: string) => {
    const e = enrollments.find(en => en.id === enrollmentId);
    if (!e) return "";
    if (e.course_type === "msc_8week") return "Groep";
    if (e.course_type === "individueel_6") return "Individueel";
    return "Losse sessie";
  };

  const renderEnrollmentBlock = (enrollment: Enrollment, appts: SessionAppointment[]) => {
    const isGroup = enrollment.course_type === "msc_8week";
    const sortedAppts = [...appts].sort((a, b) => a.week_number - b.week_number);
    const sessionsTotal = enrollment.sessions_total || (isGroup ? 8 : 6);
    const sessionsUsed = enrollment.sessions_used || 0;

    return (
      <div key={enrollment.id} className="space-y-3">
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isGroup ? "bg-sage-100 text-sage-700" : "bg-terracotta-100 text-terracotta-700"}`}>
            {isGroup ? <Users className="h-4 w-4" /> : <User className="h-4 w-4" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{getEnrollmentLabel(enrollment.id)}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground">{sessionsUsed} van {sessionsTotal} sessies</span>
              <Progress value={(sessionsUsed / sessionsTotal) * 100} className="h-1.5 flex-1 max-w-28" />
            </div>
          </div>
        </div>

        {sortedAppts.length === 0 ? (
          <p className="text-sm text-muted-foreground py-3 pl-11">Nog geen sessies ingepland.</p>
        ) : (
          <div className="space-y-2 pl-11">
            {sortedAppts.map(appt => {
              const isEditing = editingId === appt.id;
              const isExpanded = expandedSession === appt.id;
              const isIntake = appt.week_number === 1 && !isGroup;
              const templateFields = isIntake ? INTAKE_TEMPLATE_FIELDS : SESSION_TEMPLATE_FIELDS;
              const currentNotes = sessionNotes[appt.id] || loadSessionNotes(appt);
              const hasNotesContent = Object.values(currentNotes).some(v => v?.trim());

              return (
                <Card key={appt.id} className={`border-border/40 transition-all ${isExpanded ? "ring-1 ring-primary/20 shadow-sm" : "hover:shadow-sm"}`}>
                  <CardContent className="p-3">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div><Label className="text-xs">Datum</Label><Input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} className="h-8 text-xs mt-0.5" /></div>
                          <div><Label className="text-xs">Tijd</Label><Input type="time" value={editTime} onChange={e => setEditTime(e.target.value)} className="h-8 text-xs mt-0.5" /></div>
                          <div><Label className="text-xs">Status</Label>
                            <Select value={editStatus} onValueChange={setEditStatus}>
                              <SelectTrigger className="h-8 text-xs mt-0.5"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gepland">Gepland</SelectItem>
                                <SelectItem value="afgerond">Afgerond</SelectItem>
                                <SelectItem value="geannuleerd">Geannuleerd</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex gap-1.5 justify-end">
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="text-xs h-7"><X className="h-3 w-3 mr-1" /> Annuleren</Button>
                          <Button size="sm" onClick={saveEdit} disabled={updatingId === appt.id} className="text-xs h-7">
                            {updatingId === appt.id ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Save className="h-3 w-3 mr-1" />} Opslaan
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setExpandedSession(isExpanded ? null : appt.id)}>
                          <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                            appt.status === "afgerond" ? "bg-sage-500" : appt.status === "geannuleerd" ? "bg-destructive/60" : "bg-terracotta-400"
                          }`} />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium">
                              {isIntake ? "Sessie 1 — Intake" : `Sessie ${appt.week_number}`}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {appt.session_date ? format(new Date(appt.session_date), "d MMM yyyy", { locale: nl }) : "Niet gepland"}
                              {appt.session_time && ` · ${appt.session_time.slice(0, 5)}`}
                            </span>
                            {hasNotesContent && <FileText className="h-3 w-3 text-muted-foreground inline ml-2" />}
                          </div>
                          <div className="flex gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                            <Button size="sm" variant="ghost" onClick={() => startEdit(appt)} className="h-7 w-7 p-0"><Pencil className="h-3 w-3" /></Button>
                            <Button size="sm" variant="ghost" onClick={() => deleteAppt(appt.id)} className="h-7 w-7 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
                          </div>
                          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                        {isExpanded && (
                          <div className="mt-4 pt-3 border-t border-border/40 space-y-3">
                            {templateFields.map(field => (
                              <div key={field.key}>
                                <Label className="text-xs font-medium">{field.label}</Label>
                                <Textarea placeholder={field.placeholder} value={currentNotes[field.key] || ""} onChange={e => updateNoteField(appt.id, field.key, e.target.value)} className="min-h-[56px] resize-none text-sm mt-1" />
                              </div>
                            ))}
                            <div className="flex justify-end">
                              <Button size="sm" variant="outline" onClick={() => saveSessionNotes(appt.id, sessionNotes[appt.id] || currentNotes)} disabled={savingNotes === appt.id} className="gap-1.5 text-xs">
                                {savingNotes === appt.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Opslaan
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const enrollmentGroups = allRelevant.map(enrollment => ({
    enrollment,
    appointments: sessionAppointments.filter(a => a.enrollment_id === enrollment.id),
  }));

  return (
    <div className="space-y-6">
      {allRelevant.length > 0 && (
        <div className="flex justify-end">
          <Button size="sm" variant="outline" onClick={() => setShowAdd(!showAdd)} className="gap-1.5 text-xs rounded-lg">
            <Plus className="h-3.5 w-3.5" /> Sessie inplannen
          </Button>
        </div>
      )}

      {showAdd && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-sm font-semibold">Nieuwe sessie inplannen</p>
            {allRelevant.length > 1 && (
              <div>
                <Label className="text-xs">Traject</Label>
                <Select value={addEnrollmentId} onValueChange={setAddEnrollmentId}>
                  <SelectTrigger className="h-9 text-sm mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {allRelevant.map(e => (
                      <SelectItem key={e.id} value={e.id}>{getEnrollmentLabel(e.id)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Datum *</Label><Input type="date" value={addDate} onChange={e => setAddDate(e.target.value)} className="h-9 text-sm mt-1" /></div>
              <div><Label className="text-xs">Tijd</Label><Input type="time" value={addTime} onChange={e => setAddTime(e.target.value)} className="h-9 text-sm mt-1" /></div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Annuleren</Button>
              <Button size="sm" onClick={handleAdd} disabled={saving} className="gap-1.5">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />} Inplannen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {enrollmentGroups.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">Geen trajecten gevonden.</p>
      ) : (
        enrollmentGroups.map(({ enrollment, appointments }) =>
          renderEnrollmentBlock(enrollment, appointments)
        )
      )}
    </div>
  );
}

// ─── Trainer Notes ────────────────────────────────────────────────────────────

const NOTE_TYPES: Record<string, { label: string; color: string }> = {
  general: { label: "Algemeen", color: "bg-secondary" },
  intake: { label: "Intake-notitie", color: "bg-terracotta-50" },
  attention: { label: "Aandachtspunt", color: "bg-amber-50 dark:bg-amber-950/30" },
  reflection: { label: "Reflectie na sessie", color: "bg-sage-50" },
  evaluation: { label: "Eindevaluatie", color: "bg-sage-100" },
};

function TrainerNotesSection({ enrollments, notes, onNotesChange }: {
  enrollments: Enrollment[]; notes: TrainerNote[]; onNotesChange: (notes: TrainerNote[]) => void;
}) {
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState("general");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editType, setEditType] = useState("general");

  const handleAdd = async () => {
    if (!newNote.trim() || enrollments.length === 0) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.from("trainer_notes").insert({
        enrollment_id: enrollments[0].id, note_type: noteType, content: newNote.trim(),
      }).select("id, enrollment_id, note_type, content, created_at").single();
      if (error) throw error;
      onNotesChange([data as any, ...notes]);
      setNewNote(""); toast.success("Notitie opgeslagen");
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Notitie verwijderen?")) return;
    const { error } = await supabase.from("trainer_notes").delete().eq("id", id);
    if (!error) { onNotesChange(notes.filter(n => n.id !== id)); toast.success("Notitie verwijderd"); }
    else toast.error("Kon niet verwijderen");
  };

  const startEdit = (note: TrainerNote) => { setEditingId(note.id); setEditContent(note.content); setEditType(note.note_type); };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      const { error } = await supabase.from("trainer_notes").update({ content: editContent.trim(), note_type: editType }).eq("id", editingId);
      if (error) throw error;
      onNotesChange(notes.map(n => n.id === editingId ? { ...n, content: editContent.trim(), note_type: editType } : n));
      setEditingId(null); toast.success("Notitie bijgewerkt");
    } catch (err: any) { toast.error("Fout: " + err.message); }
  };

  return (
    <div className="space-y-4">
      {enrollments.length > 0 && (
        <Card className="border-border/40">
          <CardContent className="p-4 space-y-3">
            <div className="flex gap-2">
              <Select value={noteType} onValueChange={setNoteType}>
                <SelectTrigger className="w-44 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(NOTE_TYPES).map(([k, v]) => (<SelectItem key={k} value={k}>{v.label}</SelectItem>))}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleAdd} disabled={saving || !newNote.trim()} className="shrink-0 gap-1.5 h-9">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />} Toevoegen
              </Button>
            </div>
            <Textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Schrijf een notitie..." className="min-h-[72px] text-sm" />
          </CardContent>
        </Card>
      )}

      {notes.length === 0 && <p className="text-sm text-muted-foreground py-4">Nog geen notities.</p>}

      <div className="space-y-2">
        {notes.map(note => {
          const noteInfo = NOTE_TYPES[note.note_type] || { label: note.note_type, color: "bg-secondary" };
          const isEditing = editingId === note.id;
          const createdAt = (note as any).created_at;

          return (
            <Card key={note.id} className={`border-border/40 ${noteInfo.color}`}>
              <CardContent className="p-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <Select value={editType} onValueChange={setEditType}>
                      <SelectTrigger className="w-44 h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(NOTE_TYPES).map(([k, v]) => (<SelectItem key={k} value={k}>{v.label}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <Textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="min-h-[72px] text-sm" />
                    <div className="flex gap-1.5 justify-end">
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Annuleren</Button>
                      <Button size="sm" onClick={saveEdit} className="gap-1.5"><Save className="h-3.5 w-3.5" /> Opslaan</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <Badge variant="outline" className="text-xs">{noteInfo.label}</Badge>
                      <div className="flex items-center gap-1 shrink-0">
                        {createdAt && <span className="text-xs text-muted-foreground">{format(new Date(createdAt), "d MMM yyyy", { locale: nl })}</span>}
                        <Button size="sm" variant="ghost" onClick={() => startEdit(note)} className="h-7 w-7 p-0"><Pencil className="h-3 w-3" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(note.id)} className="h-7 w-7 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Registrations List ───────────────────────────────────────────────────────

function RegistrationsList({ registrations }: { registrations: Registration[] }) {
  if (registrations.length === 0) return <p className="text-sm text-muted-foreground py-4">Geen aanmeldingen gevonden.</p>;
  const statusLabel: Record<string, string> = { pending: "In afwachting", confirmed: "Bevestigd", cancelled: "Geannuleerd" };
  const payLabel: Record<string, string> = { pending: "Openstaand", paid: "Betaald", awaiting_payment: "Wacht op betaling" };
  return (
    <div className="space-y-2">
      {registrations.map(reg => (
        <Card key={reg.id} className="border-border/40">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Euro className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{reg.training_name}</p>
              <p className="text-xs text-muted-foreground">{format(new Date(reg.created_at), "d MMM yyyy", { locale: nl })}{reg.training_date && ` · ${reg.training_date}`}</p>
            </div>
            <Badge variant="outline" className="text-xs shrink-0">{statusLabel[reg.status] || reg.status}</Badge>
            <Badge className={`text-xs shrink-0 ${reg.payment_status === "paid" ? "bg-sage-100 text-sage-700" : "bg-terracotta-100 text-terracotta-700"}`}>
              {payLabel[reg.payment_status || "pending"] || reg.payment_status}
            </Badge>
            {reg.price && <span className="text-sm font-semibold shrink-0">€{reg.price}</span>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── SCS Results Section ──────────────────────────────────────────────────────

interface ScsSubmissionRow {
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
  enrollment_id: string;
}

function ScsResultsSection({ enrollmentIds }: { enrollmentIds: string[] }) {
  const [submissions, setSubmissions] = useState<ScsSubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enrollmentIds.length === 0) { setLoading(false); return; }
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("scs_submissions")
        .select("id, overall_score, self_kindness, self_judgment, common_humanity, isolation, mindfulness, over_identification, measurement_type, submitted_at, enrollment_id")
        .in("enrollment_id", enrollmentIds)
        .order("submitted_at", { ascending: true });
      setSubmissions((data || []) as ScsSubmissionRow[]);
      setLoading(false);
    })();
  }, [enrollmentIds.join(",")]);

  const copyLink = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    toast.success(`${label} gekopieerd!`);
  };

  if (loading) return <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;

  const subscales = [
    { key: "self_kindness", label: "Zelfvriendelijkheid", positive: true },
    { key: "common_humanity", label: "Gedeelde menselijkheid", positive: true },
    { key: "mindfulness", label: "Mindfulness", positive: true },
    { key: "self_judgment", label: "Zelfoordeel", positive: false },
    { key: "isolation", label: "Isolatie", positive: false },
    { key: "over_identification", label: "Over-identificatie", positive: false },
  ] as const;

  const pre = submissions.find(s => s.measurement_type === "pre");
  const post = submissions.find(s => s.measurement_type === "post");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {enrollmentIds.map((id) => (
          <div key={id} className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 rounded-lg" onClick={() => copyLink(`${window.location.origin}/vragenlijst/${id}`, "0-meting link")}>
              <BarChart3 className="h-3.5 w-3.5" /> 0-meting link
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 rounded-lg" onClick={() => copyLink(`${window.location.origin}/vragenlijst/${id}?type=post`, "Nameting link")}>
              <BarChart3 className="h-3.5 w-3.5" /> Nameting link
            </Button>
          </div>
        ))}
      </div>
      {submissions.length === 0 && <p className="text-sm text-muted-foreground py-3">Nog geen vragenlijsten ingevuld.</p>}
      {submissions.length > 0 && <>
        {pre && post ? (
          <Card className="border-border/40">
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-xs text-muted-foreground mb-1">0-meting</p>
                  <p className="text-2xl font-light text-primary">{pre.overall_score?.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{format(new Date(pre.submitted_at), "d MMM yyyy", { locale: nl })}</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-xs text-muted-foreground mb-1">Nameting</p>
                  <p className="text-2xl font-light text-primary">{post.overall_score?.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{format(new Date(post.submitted_at), "d MMM yyyy", { locale: nl })}</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-xs text-muted-foreground mb-1">Verschil</p>
                  {(() => {
                    const diff = (post.overall_score || 0) - (pre.overall_score || 0);
                    return <p className={`text-2xl font-light ${diff > 0 ? "text-sage-600" : diff < 0 ? "text-destructive" : "text-muted-foreground"}`}>{diff > 0 ? "+" : ""}{diff.toFixed(2)}</p>;
                  })()}
                </div>
              </div>
              <div className="space-y-2">
                {subscales.map(({ key, label, positive }) => {
                  const preVal = (pre as any)[key] as number | null;
                  const postVal = (post as any)[key] as number | null;
                  const diff = (postVal || 0) - (preVal || 0);
                  const improved = positive ? diff > 0 : diff < 0;
                  return (
                    <div key={key} className="flex items-center gap-2 text-xs">
                      <span className="w-36 text-muted-foreground">{label}</span>
                      <Progress value={((preVal || 0) / 5) * 100} className="h-1.5 flex-1" />
                      <span className="w-8 text-right">{preVal?.toFixed(1)}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className={`w-8 text-right font-medium ${improved ? "text-sage-600" : ""}`}>{postVal?.toFixed(1)}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          submissions.map(s => (
            <Card key={s.id} className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">{s.measurement_type === "pre" ? "0-meting" : s.measurement_type === "post" ? "Nameting" : s.measurement_type}</Badge>
                  <span className="text-xs text-muted-foreground">{format(new Date(s.submitted_at), "d MMM yyyy", { locale: nl })}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center pr-4 border-r border-border/40">
                    <p className="text-2xl font-light text-primary">{s.overall_score?.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Totaal</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {subscales.map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-2 text-xs">
                        <span className="w-36 text-muted-foreground">{label}</span>
                        <Progress value={(((s as any)[key] || 0) / 5) * 100} className="h-1.5 flex-1" />
                        <span className="w-7 text-right font-medium">{((s as any)[key] as number)?.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ClientProfilePage() {
  const { email: rawEmail } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const email = decodeURIComponent(rawEmail || "");

  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [clientRecord, setClientRecord] = useState<ClientRecord | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [sessionAppointments, setSessionAppointments] = useState<SessionAppointment[]>([]);
  const [structuredNotes, setStructuredNotes] = useState<TrainerNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showExtraTraining, setShowExtraTraining] = useState(false);
  const [extraTrainingName, setExtraTrainingName] = useState("8-weekse Mindful Zelfcompassie Training");
  const [extraRemarks, setExtraRemarks] = useState("");
  const [submittingExtra, setSubmittingExtra] = useState(false);

  const [editingSource, setEditingSource] = useState(false);
  const [sourceValue, setSourceValue] = useState("");

  useEffect(() => { if (email) fetchData(); }, [email]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [customerRes, regRes, clientRes] = await Promise.all([
        supabase.from("customers").select("*").eq("email", email).limit(1).maybeSingle(),
        supabase.from("registrations").select("id, training_name, training_date, status, payment_status, price, created_at, admin_notes").eq("email", email).order("created_at", { ascending: false }),
        supabase.from("clients").select("id, source, phone").eq("email", email).limit(1),
      ]);

      if (customerRes.error || !customerRes.data) { setIsLoading(false); return; }
      setCustomer(customerRes.data);
      setRegistrations((regRes.data || []) as Registration[]);

      const cRecord = clientRes.data?.[0] ? (clientRes.data[0] as any as ClientRecord) : null;
      setClientRecord(cRecord);
      if (cRecord) setSourceValue(cRecord.source || "");
      const cId = cRecord?.id || null;

      const regIds = (regRes.data || []).map((r: any) => r.id);
      let allEnrollments: Enrollment[] = [];
      if (regIds.length > 0 || cId) {
        const queries = [];
        if (regIds.length > 0) queries.push(supabase.from("enrollments").select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id, intake_reason, intake_theme, intake_goal, client_id, sessions_total, sessions_used, sessions_remaining").in("registration_id", regIds));
        if (cId) queries.push(supabase.from("enrollments").select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id, intake_reason, intake_theme, intake_goal, client_id, sessions_total, sessions_used, sessions_remaining").eq("client_id", cId));
        const results = await Promise.all(queries);
        const merged = new Map<string, Enrollment>();
        results.forEach(r => (r.data || []).forEach((e: any) => merged.set(e.id, e as Enrollment)));
        allEnrollments = Array.from(merged.values()).sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
      }
      setEnrollments(allEnrollments);

      const enrIds = allEnrollments.map(e => e.id);
      if (enrIds.length > 0) {
        const [notesRes, apptsRes] = await Promise.all([
          supabase.from("trainer_notes").select("id, enrollment_id, note_type, content, created_at").in("enrollment_id", enrIds).order("created_at", { ascending: false }),
          supabase.from("session_appointments").select("*").in("enrollment_id", enrIds).order("week_number"),
        ]);
        setStructuredNotes((notesRes.data || []) as TrainerNote[]);
        setSessionAppointments((apptsRes.data || []) as SessionAppointment[]);
      }
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSource = async () => {
    if (!clientRecord) return;
    try {
      const { error } = await supabase.from("clients").update({ source: sourceValue.trim() || null } as any).eq("id", clientRecord.id);
      if (error) throw error;
      setClientRecord({ ...clientRecord, source: sourceValue.trim() || null });
      setEditingSource(false);
      toast.success("Bron opgeslagen");
    } catch (err: any) { toast.error("Fout: " + err.message); }
  };

  const submitExtraTraining = async () => {
    if (!customer || !extraTrainingName.trim()) { toast.error("Selecteer een training"); return; }
    setSubmittingExtra(true);
    try {
      const { error } = await supabase.from("registrations").insert({
        name: customer.name, email: customer.email, phone: customer.phone || null,
        training_name: extraTrainingName.trim(), remarks: extraRemarks.trim() || null,
        status: "pending", payment_status: "pending",
      });
      if (error) throw error;
      toast.success("Extra training aangemeld!");
      setShowExtraTraining(false);
      setExtraTrainingName("8-weekse Mindful Zelfcompassie Training");
      setExtraRemarks("");
      fetchData();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSubmittingExtra(false);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Klant niet gevonden</p>
        <Button variant="outline" onClick={() => navigate("/admin")}><ArrowLeft className="h-4 w-4 mr-2" /> Terug</Button>
      </div>
    );
  }

  const statusBadge = getStatusBadge(enrollments);
  const trainingType = getTrainingType(enrollments);
  const hasIndividual = enrollments.some(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie");

  // Quick stats
  const activeEnrollment = enrollments.find(e => e.status === "active");
  const completedSessions = sessionAppointments.filter(a => a.status === "afgerond").length;
  const nextSession = sessionAppointments.find(a => a.status === "gepland" && a.session_date);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* ── Header ── */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")} className="shrink-0 h-9 w-9 rounded-xl">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              {getInitials(customer.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold leading-tight">{customer.name}</h1>
              <Badge className={`text-xs rounded-lg ${statusBadge.className}`}>{statusBadge.label}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{customer.email}</span>
              {(customer.phone || clientRecord?.phone) && (
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{customer.phone || clientRecord?.phone}</span>
              )}
              {trainingType && <span className="flex items-center gap-1">{trainingType}</span>}
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {editingSource ? (
                  <span className="flex items-center gap-1">
                    <Select value={sourceValue} onValueChange={setSourceValue}>
                      <SelectTrigger className="h-6 text-xs w-28"><SelectValue placeholder="Bron..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="verwijzing">Verwijzing</SelectItem>
                        <SelectItem value="huisarts">Huisarts</SelectItem>
                        <SelectItem value="social_media">Social media</SelectItem>
                        <SelectItem value="mond_tot_mond">Mond-tot-mond</SelectItem>
                        <SelectItem value="overig">Overig</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={saveSource}><Save className="h-3 w-3" /></Button>
                    <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={() => setEditingSource(false)}><X className="h-3 w-3" /></Button>
                  </span>
                ) : (
                  <button className="hover:underline" onClick={() => setEditingSource(true)}>
                    {clientRecord?.source || "Bron toevoegen"}
                  </button>
                )}
              </span>
            </div>
          </div>

          <Button size="sm" variant="outline" className="gap-1.5 shrink-0 rounded-lg" onClick={() => setShowExtraTraining(true)}>
            <Plus className="h-3.5 w-3.5" /> Training
          </Button>
        </div>

        {/* ── Phase Stepper ── */}
        <PhaseStepperBar enrollments={enrollments} sessionAppointments={sessionAppointments} />

        {/* ── Quick Stats ── */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-border/40">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground mx-auto mb-1.5" />
              <p className="text-xl font-bold text-foreground">
                {activeEnrollment ? `${activeEnrollment.sessions_used}/${activeEnrollment.sessions_total || 6}` : completedSessions}
              </p>
              <p className="text-xs text-muted-foreground">Sessies</p>
              {activeEnrollment?.sessions_total && (
                <Progress value={(activeEnrollment.sessions_used / activeEnrollment.sessions_total) * 100} className="h-1 mt-2" />
              )}
            </CardContent>
          </Card>
          <Card className="border-border/40">
            <CardContent className="p-4 text-center">
              <Clock className="h-4 w-4 text-muted-foreground mx-auto mb-1.5" />
              {nextSession?.session_date ? (
                <>
                  <p className="text-sm font-semibold">{format(new Date(nextSession.session_date), "d MMM", { locale: nl })}</p>
                  {nextSession.session_time && <p className="text-xs text-muted-foreground">{nextSession.session_time.slice(0, 5)}</p>}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">—</p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">Volgende sessie</p>
            </CardContent>
          </Card>
          <Card className="border-border/40">
            <CardContent className="p-4 text-center">
              <FileText className="h-4 w-4 text-muted-foreground mx-auto mb-1.5" />
              <p className="text-xl font-bold text-foreground">{structuredNotes.length}</p>
              <p className="text-xs text-muted-foreground">Notities</p>
            </CardContent>
          </Card>
        </div>

        {/* ── AI Summary ── */}
        <AiSummaryCard email={customer.email} />

        {/* ── Tabs (4 tabs, no timeline) ── */}
        <Tabs defaultValue="dossier" className="w-full">
          <TabsList className="h-10 w-full justify-start rounded-xl bg-secondary/60 p-1">
            <TabsTrigger value="dossier" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"><FileText className="h-3.5 w-3.5" /> Dossier</TabsTrigger>
            <TabsTrigger value="sessies" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Calendar className="h-3.5 w-3.5" /> Sessies
              {sessionAppointments.length > 0 && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 ml-0.5">{sessionAppointments.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="notities" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <FileText className="h-3.5 w-3.5" /> Notities
              {structuredNotes.length > 0 && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 ml-0.5">{structuredNotes.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="financieel" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"><Euro className="h-3.5 w-3.5" /> Financieel</TabsTrigger>
          </TabsList>

          <TabsContent value="dossier" className="mt-5 space-y-6">
            {enrollments.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <Heart className="h-4 w-4 text-primary" /> Intake
                </h3>
                <IntakeSection enrollmentId={enrollments[0].id} />
              </div>
            )}

            {hasIndividual && enrollments.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie").map(enr => (
              <div key={enr.id}>
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-primary" /> Sessieverslagen (AI)
                </h3>
                <TherapySessionSection enrollmentId={enr.id} clientName={customer.name || undefined} />
              </div>
            ))}

            {enrollments.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-primary" /> Zelfcompassie Vragenlijst (SCS)
                </h3>
                <ScsResultsSection enrollmentIds={enrollments.map(e => e.id)} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="sessies" className="mt-5">
            <SessionsSection sessionAppointments={sessionAppointments} enrollments={enrollments} onUpdate={fetchData} />
          </TabsContent>

          <TabsContent value="notities" className="mt-5">
            <TrainerNotesSection enrollments={enrollments} notes={structuredNotes} onNotesChange={setStructuredNotes} />
          </TabsContent>

          <TabsContent value="financieel" className="mt-5">
            <RegistrationsList registrations={registrations} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Extra Training Dialog */}
      {showExtraTraining && customer && (
        <Dialog open onOpenChange={() => setShowExtraTraining(false)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Extra training inschrijven</DialogTitle>
              <DialogDescription>Schrijf {customer.name} in voor een nieuwe training.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-xl bg-secondary p-3 text-sm">
                <p className="font-medium">{customer.name}</p>
                <p className="text-muted-foreground">{customer.email}</p>
              </div>
              <div>
                <Label>Training *</Label>
                <Select value={extraTrainingName} onValueChange={setExtraTrainingName}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8-weekse Mindful Zelfcompassie Training">8-weekse Mindful Zelfcompassie Training</SelectItem>
                    <SelectItem value="Individueel Traject (6 sessies)">Individueel Traject (6 sessies)</SelectItem>
                    <SelectItem value="Losse Sessie / Coaching">Losse Sessie / Coaching</SelectItem>
                    <SelectItem value="Beweging & Mildheid Retreat">Beweging & Mildheid Retreat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Opmerkingen</Label>
                <Input value={extraRemarks} onChange={e => setExtraRemarks(e.target.value)} placeholder="Eventuele opmerkingen" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowExtraTraining(false)}>Annuleren</Button>
              <Button onClick={submitExtraTraining} disabled={submittingExtra}>
                {submittingExtra && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Inschrijven
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
