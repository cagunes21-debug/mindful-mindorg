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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Loader2, Plus, Mail, Phone, Calendar, Euro, ChevronDown,
  Sparkles, Save, CheckCircle2, AlertCircle, Clock, Target, Heart, Brain,
  FileText, RefreshCw, Trash2, Pencil, X, Download, BarChart3,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import type { CustomerData, Registration, Enrollment, TrainerNote, SessionAppointment } from "@/components/admin/customer-profile/types";
import TherapySessionSection from "@/components/admin/customer-profile/TherapySessionSection";

// ─── Intake Form ──────────────────────────────────────────────────────────────

const INTAKE_QUESTIONS = [
  { key: "reason", label: "Wat brengt je hier?", icon: Heart },
  { key: "duration_of_issue", label: "Hoe lang speelt dit al?", icon: Clock },
  { key: "daily_impact", label: "Hoe beïnvloedt dit je dagelijks leven?", icon: AlertCircle },
  { key: "goal", label: "Wat hoop je te veranderen?", icon: Target },
  { key: "previous_therapy", label: "Heb je eerder therapie of coaching gehad?", icon: Brain },
] as const;

function IntakeSection({ enrollmentId }: { enrollmentId: string }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [existingId, setExistingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("intake_submissions")
        .select("id, reason, goal, duration_of_issue, daily_impact, previous_therapy")
        .eq("enrollment_id", enrollmentId)
        .limit(1)
        .maybeSingle();
      if (data) {
        setExistingId(data.id);
        setFormData({
          reason: data.reason || "",
          duration_of_issue: (data as any).duration_of_issue || "",
          daily_impact: (data as any).daily_impact || "",
          goal: data.goal || "",
          previous_therapy: (data as any).previous_therapy || "",
        });
      }
      setLoading(false);
    })();
  }, [enrollmentId]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload = {
        enrollment_id: enrollmentId,
        reason: formData.reason?.trim() || null,
        goal: formData.goal?.trim() || null,
        duration_of_issue: formData.duration_of_issue?.trim() || null,
        daily_impact: formData.daily_impact?.trim() || null,
        previous_therapy: formData.previous_therapy?.trim() || null,
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
    <div className="space-y-3">
      {INTAKE_QUESTIONS.map(q => (
        <div key={q.key} className="flex gap-3 items-start">
          <q.icon className="h-4 w-4 mt-2.5 text-muted-foreground shrink-0" />
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">{q.label}</label>
            <Textarea
              value={formData[q.key] || ""}
              onChange={e => setFormData(prev => ({ ...prev, [q.key]: e.target.value }))}
              placeholder="..."
              className="min-h-[48px] resize-none text-sm"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-end pt-1">
        <Button size="sm" variant="outline" onClick={handleSave} disabled={saving} className="gap-1.5">
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> : <Save className="h-3.5 w-3.5" />}
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
    <Card className="border-border/60 bg-gradient-to-br from-card to-muted/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-semibold">AI Samenvatting</span>
          </div>
          <Button size="sm" variant="ghost" onClick={generateSummary} disabled={loading} className="gap-1.5 text-xs h-7">
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : hasGenerated ? <RefreshCw className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
            {loading ? "Genereren..." : hasGenerated ? "Vernieuwen" : "Genereer"}
          </Button>
        </div>
        {summary ? (
          <div className="prose prose-sm max-w-none text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{summary}</div>
        ) : (
          <p className="text-xs text-muted-foreground italic">Klik op "Genereer" voor een AI-samenvatting.</p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Quick Stats ──────────────────────────────────────────────────────────────

function QuickStats({ customer, enrollments, sessionAppointments }: {
  customer: CustomerData; enrollments: Enrollment[]; sessionAppointments: SessionAppointment[];
}) {
  const activeEnrollment = enrollments.find(e => e.status === "active");
  const nextSession = sessionAppointments.find(a => a.status === "gepland" && a.session_date);
  const completedSessions = sessionAppointments.filter(a => a.status === "afgerond").length;

  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="border-border/60"><CardContent className="p-3">
        <div className="flex items-center gap-2 mb-1"><CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-[10px] text-muted-foreground uppercase tracking-wide">Sessies</span></div>
        {activeEnrollment?.sessions_total ? (
          <div>
            <p className="text-lg font-bold">{activeEnrollment.sessions_used}/{activeEnrollment.sessions_total}</p>
            <Progress value={(activeEnrollment.sessions_used / activeEnrollment.sessions_total) * 100} className="h-1 mt-1" />
          </div>
        ) : <p className="text-lg font-bold">{completedSessions}</p>}
      </CardContent></Card>
      <Card className="border-border/60"><CardContent className="p-3">
        <div className="flex items-center gap-2 mb-1"><Clock className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-[10px] text-muted-foreground uppercase tracking-wide">Volgende sessie</span></div>
        {nextSession?.session_date ? (
          <p className="text-sm font-semibold">
            {format(new Date(nextSession.session_date), "d MMM", { locale: nl })}
            {nextSession.session_time && <span className="text-muted-foreground ml-1">{nextSession.session_time.slice(0, 5)}</span>}
          </p>
        ) : <p className="text-sm text-muted-foreground">—</p>}
      </CardContent></Card>
    </div>
  );
}

// ─── Session Templates ────────────────────────────────────────────────────────

const INTAKE_TEMPLATE_FIELDS = [
  { key: "aanmeldreden", label: "Aanmeldreden", placeholder: "Waarom meldt de cliënt zich aan?" },
  { key: "achtergrond", label: "Achtergrond & context", placeholder: "Relevante voorgeschiedenis, levenssituatie..." },
  { key: "klachten", label: "Klachten & impact", placeholder: "Wat ervaart de cliënt? Hoe beïnvloedt het dagelijks leven?" },
  { key: "doelen", label: "Doelen & verwachtingen", placeholder: "Wat hoopt de cliënt te bereiken?" },
  { key: "observaties", label: "Observaties therapeut", placeholder: "Eerste indruk, houding, non-verbale signalen..." },
  { key: "plan", label: "Voorlopig plan", placeholder: "Werkwijze, focus eerste sessies, afspraken..." },
] as const;

const SESSION_TEMPLATE_FIELDS = [
  { key: "thema", label: "Thema van de sessie", placeholder: "Waar ging de sessie over?" },
  { key: "besproken", label: "Wat is besproken", placeholder: "Samenvatting van de inhoud..." },
  { key: "oefeningen", label: "Oefeningen & interventies", placeholder: "Welke oefeningen of technieken zijn gebruikt?" },
  { key: "observaties", label: "Observaties", placeholder: "Wat viel op? Emoties, patronen, doorbraken..." },
  { key: "huiswerk", label: "Huiswerk & afspraken", placeholder: "Wat neemt de cliënt mee? Oefeningen voor thuis..." },
] as const;

// ─── Sessions Section (with scheduling, status, notes, templates) ────────────

function SessionsSection({ sessionAppointments, enrollments, onUpdate }: {
  sessionAppointments: SessionAppointment[];
  enrollments: Enrollment[];
  onUpdate: () => void;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [addDate, setAddDate] = useState("");
  const [addTime, setAddTime] = useState("");
  const [addNotes, setAddNotes] = useState("");
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

  const indivEnrollments = enrollments.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie");
  const activeEnrollment = indivEnrollments.find(e => e.status === "active") || indivEnrollments[0];

  const sessionsTotal = activeEnrollment?.sessions_total || 6;
  const sessionsUsed = activeEnrollment?.sessions_used || 0;
  const currentStep = sessionsUsed + 1; // next session to do

  const handleAdd = async () => {
    if (!activeEnrollment || !addDate) { toast.error("Selecteer een datum"); return; }
    setSaving(true);
    try {
      const nextWeek = sessionAppointments.filter(a => a.enrollment_id === activeEnrollment.id).length + 1;
      const { error } = await supabase.from("session_appointments").insert({
        enrollment_id: activeEnrollment.id,
        week_number: nextWeek,
        session_date: addDate,
        session_time: addTime || null,
        notes: addNotes.trim() || null,
        status: "gepland",
      });
      if (error) throw error;
      toast.success("Sessie ingepland");
      setShowAdd(false);
      setAddDate("");
      setAddTime("");
      setAddNotes("");
      onUpdate();
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
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
        status: editStatus,
        notes: editNotes.trim() || null,
        session_date: editDate || null,
        session_time: editTime || null,
      }).eq("id", editingId);
      if (error) throw error;

      if (editStatus === "afgerond") {
        const appt = sessionAppointments.find(a => a.id === editingId);
        if (appt) {
          const enrollment = enrollments.find(e => e.id === appt.enrollment_id);
          if (enrollment) {
            const completedCount = sessionAppointments.filter(
              a => a.enrollment_id === enrollment.id && a.status === "afgerond"
            ).length + 1;
            await supabase.from("enrollments").update({ sessions_used: completedCount }).eq("id", enrollment.id);
          }
        }
      }

      toast.success("Sessie bijgewerkt");
      setEditingId(null);
      onUpdate();
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
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
      const notesJson = JSON.stringify(notes);
      const { error } = await supabase.from("session_appointments").update({
        notes: notesJson,
      }).eq("id", apptId);
      if (error) throw error;
      toast.success("Sessienotities opgeslagen");
      onUpdate();
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSavingNotes(null);
  };

  const loadSessionNotes = (appt: SessionAppointment): Record<string, string> => {
    if (sessionNotes[appt.id]) return sessionNotes[appt.id];
    // Try to parse existing notes as JSON, fallback to empty
    if (appt.notes) {
      try {
        const parsed = JSON.parse(appt.notes);
        if (typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
      } catch { /* plain text note, ignore */ }
    }
    return {};
  };

  const updateNoteField = (apptId: string, key: string, value: string) => {
    setSessionNotes(prev => ({
      ...prev,
      [apptId]: { ...(prev[apptId] || {}), [key]: value },
    }));
  };

  // Sort appointments by week_number
  const sortedAppts = [...sessionAppointments].sort((a, b) => a.week_number - b.week_number);

  return (
    <div className="space-y-5">
      {/* ── Progress Stepper ── */}
      {activeEnrollment && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Traject voortgang</p>
            <span className="text-xs text-muted-foreground">{sessionsUsed} van {sessionsTotal} afgerond</span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: sessionsTotal }, (_, i) => {
              const stepNum = i + 1;
              const appt = sortedAppts.find(a => a.week_number === stepNum);
              const isCompleted = appt?.status === "afgerond";
              const isCurrent = stepNum === currentStep;
              const isCancelled = appt?.status === "geannuleerd";

              return (
                <div key={stepNum} className="flex items-center flex-1">
                  <button
                    onClick={() => appt && setExpandedSession(expandedSession === appt.id ? null : appt.id)}
                    className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold transition-all shrink-0 ${
                      isCompleted
                        ? "bg-green-500 text-white shadow-sm"
                        : isCancelled
                        ? "bg-red-200 text-red-700"
                        : isCurrent
                        ? "bg-primary text-primary-foreground ring-2 ring-primary/30 shadow-md"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNum}
                  </button>
                  {i < sessionsTotal - 1 && (
                    <div className={`h-0.5 flex-1 mx-1 rounded ${isCompleted ? "bg-green-400" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between px-1">
            <span className="text-[10px] text-muted-foreground">Intake</span>
            <span className="text-[10px] text-muted-foreground">Sessie 6</span>
          </div>
        </div>
      )}

      {/* ── Add button ── */}
      {activeEnrollment && (
        <div className="flex justify-end">
          <Button size="sm" variant="outline" onClick={() => setShowAdd(!showAdd)} className="gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" /> Sessie inplannen
          </Button>
        </div>
      )}

      {/* ── Add form ── */}
      {showAdd && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-3 space-y-3">
            <p className="text-sm font-medium">Nieuwe sessie inplannen</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Datum *</Label>
                <Input type="date" value={addDate} onChange={e => setAddDate(e.target.value)} className="h-8 text-xs mt-1" />
              </div>
              <div>
                <Label className="text-xs">Tijd</Label>
                <Input type="time" value={addTime} onChange={e => setAddTime(e.target.value)} className="h-8 text-xs mt-1" />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)} className="text-xs h-7">Annuleren</Button>
              <Button size="sm" onClick={handleAdd} disabled={saving} className="gap-1.5 text-xs h-7">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                Inplannen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Sessions list with templates ── */}
      {sortedAppts.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">Nog geen sessies ingepland.</p>
      ) : (
        <div className="space-y-2">
          {sortedAppts.map(appt => {
            const isEditing = editingId === appt.id;
            const isExpanded = expandedSession === appt.id;
            const isIntake = appt.week_number === 1;
            const templateFields = isIntake ? INTAKE_TEMPLATE_FIELDS : SESSION_TEMPLATE_FIELDS;
            const currentNotes = sessionNotes[appt.id] || loadSessionNotes(appt);
            const hasNotesContent = Object.values(currentNotes).some(v => v?.trim());

            return (
              <Card key={appt.id} className={`border-border/60 transition-all ${isExpanded ? "ring-1 ring-primary/20" : ""}`}>
                <CardContent className="p-3">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label className="text-[10px]">Datum</Label>
                          <Input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} className="h-7 text-xs mt-0.5" />
                        </div>
                        <div>
                          <Label className="text-[10px]">Tijd</Label>
                          <Input type="time" value={editTime} onChange={e => setEditTime(e.target.value)} className="h-7 text-xs mt-0.5" />
                        </div>
                        <div>
                          <Label className="text-[10px]">Status</Label>
                          <Select value={editStatus} onValueChange={setEditStatus}>
                            <SelectTrigger className="h-7 text-xs mt-0.5"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gepland" className="text-xs">Gepland</SelectItem>
                              <SelectItem value="afgerond" className="text-xs">Afgerond</SelectItem>
                              <SelectItem value="geannuleerd" className="text-xs">Geannuleerd</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-1.5 justify-end">
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="text-xs h-6 gap-1"><X className="h-3 w-3" /> Annuleren</Button>
                        <Button size="sm" onClick={saveEdit} disabled={updatingId === appt.id} className="text-xs h-6 gap-1">
                          {updatingId === appt.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />} Opslaan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="flex items-start gap-3 cursor-pointer"
                        onClick={() => setExpandedSession(isExpanded ? null : appt.id)}
                      >
                        <div className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1.5 ${
                          appt.status === "afgerond" ? "bg-green-500" : appt.status === "geannuleerd" ? "bg-red-400" : "bg-amber-400"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {isIntake ? "Sessie 1 — Intake" : `Sessie ${appt.week_number}`}
                            </span>
                            <Badge variant="outline" className="text-[10px]">
                              {appt.status === "afgerond" ? "✓ Afgerond" : appt.status === "geannuleerd" ? "Geannuleerd" : "Gepland"}
                            </Badge>
                            {hasNotesContent && <Badge variant="secondary" className="text-[10px]"><FileText className="h-2.5 w-2.5 mr-0.5" />Notities</Badge>}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {appt.session_date ? format(new Date(appt.session_date), "d MMM yyyy", { locale: nl }) : "Niet gepland"}
                            {appt.session_time && <span className="ml-1">{appt.session_time.slice(0, 5)}</span>}
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                          <Button size="sm" variant="ghost" onClick={() => startEdit(appt)} className="h-6 w-6 p-0">
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => deleteAppt(appt.id)} className="h-6 w-6 p-0 text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 mt-0.5 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>

                      {/* ── Expanded template ── */}
                      {isExpanded && (
                        <div className="mt-4 pt-3 border-t border-border/60 space-y-3">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            {isIntake ? "Intake template" : `Sessie ${appt.week_number} notities`}
                          </p>
                          {templateFields.map(field => (
                            <div key={field.key}>
                              <Label className="text-xs font-medium">{field.label}</Label>
                              <Textarea
                                placeholder={field.placeholder}
                                value={currentNotes[field.key] || ""}
                                onChange={e => updateNoteField(appt.id, field.key, e.target.value)}
                                className="min-h-[48px] resize-none text-sm mt-1"
                              />
                            </div>
                          ))}
                          <div className="flex justify-end pt-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => saveSessionNotes(appt.id, sessionNotes[appt.id] || currentNotes)}
                              disabled={savingNotes === appt.id}
                              className="gap-1.5 text-xs"
                            >
                              {savingNotes === appt.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                              Opslaan
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
}

// ─── Trainer Notes (with edit, delete, timestamps) ────────────────────────────

const NOTE_TYPES: Record<string, { label: string; color: string }> = {
  general: { label: "Algemeen", color: "bg-muted" },
  intake: { label: "Intake-notitie", color: "bg-blue-50 dark:bg-blue-950/30" },
  attention: { label: "Aandachtspunt", color: "bg-amber-50 dark:bg-amber-950/30" },
  reflection: { label: "Reflectie na sessie", color: "bg-violet-50 dark:bg-violet-950/30" },
  evaluation: { label: "Eindevaluatie", color: "bg-green-50 dark:bg-green-950/30" },
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
        enrollment_id: enrollments[0].id,
        note_type: noteType,
        content: newNote.trim(),
      }).select("id, enrollment_id, note_type, content, created_at").single();
      if (error) throw error;
      onNotesChange([data as any, ...notes]);
      setNewNote("");
      toast.success("Notitie opgeslagen");
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Notitie verwijderen?")) return;
    const { error } = await supabase.from("trainer_notes").delete().eq("id", id);
    if (!error) {
      onNotesChange(notes.filter(n => n.id !== id));
      toast.success("Notitie verwijderd");
    } else toast.error("Kon niet verwijderen");
  };

  const startEdit = (note: TrainerNote) => {
    setEditingId(note.id);
    setEditContent(note.content);
    setEditType(note.note_type);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      const { error } = await supabase.from("trainer_notes").update({
        content: editContent.trim(),
        note_type: editType,
      }).eq("id", editingId);
      if (error) throw error;
      onNotesChange(notes.map(n => n.id === editingId ? { ...n, content: editContent.trim(), note_type: editType } : n));
      setEditingId(null);
      toast.success("Notitie bijgewerkt");
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Add note */}
      {enrollments.length > 0 && (
        <Card className="border-border/60">
          <CardContent className="p-3 space-y-2">
            <div className="flex gap-2">
              <Select value={noteType} onValueChange={setNoteType}>
                <SelectTrigger className="w-44 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(NOTE_TYPES).map(([k, v]) => (
                    <SelectItem key={k} value={k} className="text-xs">{v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleAdd} disabled={saving || !newNote.trim()} className="shrink-0 gap-1.5 h-8">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                Toevoegen
              </Button>
            </div>
            <Textarea
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Schrijf een notitie..."
              className="min-h-[60px] resize-none text-sm"
            />
          </CardContent>
        </Card>
      )}

      {/* Notes grid */}
      {notes.length === 0 ? (
        <p className="text-sm text-muted-foreground py-2">Nog geen notities.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {notes.map(note => {
            const type = NOTE_TYPES[note.note_type] || { label: note.note_type, color: "bg-muted" };
            const isEditing = editingId === note.id;
            const createdAt = (note as any).created_at;

            return (
              <Card key={note.id} className={`border-border/60 ${isEditing ? "" : type.color}`}>
                <CardContent className="p-3">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Select value={editType} onValueChange={setEditType}>
                        <SelectTrigger className="h-7 text-xs w-36"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(NOTE_TYPES).map(([k, v]) => (
                            <SelectItem key={k} value={k} className="text-xs">{v.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className="min-h-[60px] resize-none text-sm"
                      />
                      <div className="flex gap-1.5 justify-end">
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="text-xs h-6 gap-1"><X className="h-3 w-3" /> Annuleren</Button>
                        <Button size="sm" onClick={saveEdit} className="text-xs h-6 gap-1"><Save className="h-3 w-3" /> Opslaan</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px]">{type.label}</Badge>
                        <div className="flex gap-0.5 shrink-0">
                          <Button size="sm" variant="ghost" onClick={() => startEdit(note)} className="h-5 w-5 p-0">
                            <Pencil className="h-2.5 w-2.5" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(note.id)} className="h-5 w-5 p-0 text-destructive">
                            <Trash2 className="h-2.5 w-2.5" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                      {createdAt && (
                        <p className="text-[10px] text-muted-foreground mt-2">
                          {format(new Date(createdAt), "d MMM yyyy 'om' HH:mm", { locale: nl })}
                        </p>
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
}

// ─── Registrations List ───────────────────────────────────────────────────────

function RegistrationsList({ registrations }: { registrations: Registration[] }) {
  if (registrations.length === 0) return <p className="text-sm text-muted-foreground py-2">Geen aanmeldingen.</p>;
  const statusLabel: Record<string, string> = { pending: "In afwachting", confirmed: "Bevestigd", cancelled: "Geannuleerd" };
  const payLabel: Record<string, string> = { pending: "Openstaand", paid: "Betaald", awaiting_payment: "Wacht op betaling" };

  return (
    <div className="space-y-2">
      {registrations.map(reg => (
        <div key={reg.id} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{reg.training_name}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(reg.created_at), "d MMM yyyy", { locale: nl })}
              {reg.training_date && ` · ${reg.training_date}`}
            </p>
          </div>
          <Badge variant="outline" className="text-[10px]">{statusLabel[reg.status] || reg.status}</Badge>
          <Badge className={`text-[10px] ${reg.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
            {payLabel[reg.payment_status || "pending"] || reg.payment_status}
          </Badge>
          {reg.price && <span className="text-xs font-medium">€{reg.price}</span>}
        </div>
      ))}
    </div>
  );
}

// ─── Collapsible Section ──────────────────────────────────────────────────────

function Section({ title, icon: Icon, defaultOpen = false, children }: {
  title: string; icon: React.ComponentType<any>; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex items-center gap-2 w-full py-2.5 text-left group">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold flex-1">{title}</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pb-4 pt-1">{children}</div>
      </CollapsibleContent>
    </Collapsible>
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
    <div className="space-y-3">
      {/* Links */}
      <div className="flex flex-wrap gap-1.5">
        {enrollmentIds.map((id, i) => {
          const preUrl = `${window.location.origin}/vragenlijst/${id}`;
          const postUrl = `${window.location.origin}/vragenlijst/${id}?type=post`;
          return (
            <div key={id} className="flex gap-1.5">
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyLink(preUrl, "0-meting link")}>
                <BarChart3 className="h-3 w-3" /> 0-meting link
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyLink(postUrl, "Nameting link")}>
                <BarChart3 className="h-3 w-3" /> Nameting link
              </Button>
            </div>
          );
        })}
      </div>

      {submissions.length === 0 && <p className="text-sm text-muted-foreground py-2">Nog geen vragenlijsten ingevuld.</p>}

      {submissions.length > 0 && <>
      {/* Comparison view if both exist */}
      {pre && post ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-center">
            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground mb-1">0-meting</p>
              <p className="text-2xl font-light text-primary">{pre.overall_score?.toFixed(2)}</p>
              <p className="text-[10px] text-muted-foreground">{format(new Date(pre.submitted_at), "d MMM yyyy", { locale: nl })}</p>
            </div>
            <div className="text-muted-foreground text-xs">→</div>
            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground mb-1">Nameting</p>
              <p className="text-2xl font-light text-primary">{post.overall_score?.toFixed(2)}</p>
              <p className="text-[10px] text-muted-foreground">{format(new Date(post.submitted_at), "d MMM yyyy", { locale: nl })}</p>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground mb-1">Verschil</p>
              {(() => {
                const diff = (post.overall_score || 0) - (pre.overall_score || 0);
                return (
                  <p className={`text-2xl font-light ${diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-muted-foreground"}`}>
                    {diff > 0 ? "+" : ""}{diff.toFixed(2)}
                  </p>
                );
              })()}
            </div>
          </div>
          <div className="space-y-1.5">
            {subscales.map(({ key, label, positive }) => {
              const preVal = (pre as any)[key] as number | null;
              const postVal = (post as any)[key] as number | null;
              const diff = (postVal || 0) - (preVal || 0);
              const improved = positive ? diff > 0 : diff < 0;
              return (
                <div key={key} className="flex items-center gap-1.5 text-[10px]">
                  <span className="w-32 text-muted-foreground truncate">{label}</span>
                  <Progress value={((preVal || 0) / 5) * 100} className="h-1.5 flex-1" />
                  <span className="w-8 text-right">{preVal?.toFixed(1)}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className={`w-8 text-right font-medium ${improved ? "text-green-600" : ""}`}>{postVal?.toFixed(1)}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Single measurement */
        submissions.map(s => (
          <div key={s.id} className="bg-muted/20 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                {s.measurement_type === "pre" ? "0-meting" : s.measurement_type === "post" ? "Nameting" : s.measurement_type}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{format(new Date(s.submitted_at), "d MMM yyyy", { locale: nl })}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-2xl font-light text-primary">{s.overall_score?.toFixed(2)}</p>
                <p className="text-[10px] text-muted-foreground">Totaal</p>
              </div>
              <div className="flex-1 space-y-1">
                {subscales.map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-1.5 text-[10px]">
                    <span className="w-32 text-muted-foreground truncate">{label}</span>
                    <Progress value={(((s as any)[key] || 0) / 5) * 100} className="h-1.5 flex-1" />
                    <span className="w-6 text-right font-medium">{((s as any)[key] as number)?.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
  const [clientId, setClientId] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [sessionAppointments, setSessionAppointments] = useState<SessionAppointment[]>([]);
  const [structuredNotes, setStructuredNotes] = useState<TrainerNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showExtraTraining, setShowExtraTraining] = useState(false);
  const [extraTrainingName, setExtraTrainingName] = useState("8-weekse Mindful Zelfcompassie Training");
  const [extraRemarks, setExtraRemarks] = useState("");
  const [submittingExtra, setSubmittingExtra] = useState(false);

  useEffect(() => { if (email) fetchData(); }, [email]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [customerRes, regRes, clientRes] = await Promise.all([
        supabase.from("customers").select("*").eq("email", email).limit(1).maybeSingle(),
        supabase.from("registrations").select("id, training_name, training_date, status, payment_status, price, created_at, admin_notes").eq("email", email).order("created_at", { ascending: false }),
        supabase.from("clients").select("id").eq("email", email).limit(1),
      ]);

      if (customerRes.error || !customerRes.data) { setIsLoading(false); return; }
      setCustomer(customerRes.data);
      setRegistrations((regRes.data || []) as Registration[]);

      const cId = clientRes.data?.[0]?.id || null;
      setClientId(cId);

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
        const indivIds = allEnrollments.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie").map(e => e.id);
        const [notesRes, apptsRes] = await Promise.all([
          supabase.from("trainer_notes").select("id, enrollment_id, note_type, content, created_at").in("enrollment_id", enrIds).order("created_at", { ascending: false }),
          indivIds.length > 0
            ? supabase.from("session_appointments").select("*").in("enrollment_id", indivIds).order("week_number")
            : Promise.resolve({ data: [] }),
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

  const activeEnrollment = enrollments.find(e => e.status === "active");
  const hasIndividual = enrollments.some(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-5 space-y-5">
        {/* ── Header ── */}
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")} className="mt-0.5 shrink-0 h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold leading-tight">{customer.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" />{customer.email}</span>
              {customer.phone && <span className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" />{customer.phone}</span>}
            </div>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5 shrink-0" onClick={() => setShowExtraTraining(true)}>
            <Plus className="h-3.5 w-3.5" /> Training
          </Button>
        </div>

        {/* ── Quick Stats ── */}
        <QuickStats customer={customer} enrollments={enrollments} sessionAppointments={sessionAppointments} />

        {/* ── AI Summary ── */}
        <AiSummaryCard email={customer.email} />

        {/* ── Tabs for main sections ── */}
        <Tabs defaultValue="dossier" className="w-full">
          <TabsList className="h-9 w-full justify-start">
            <TabsTrigger value="dossier" className="gap-1.5 text-xs"><FileText className="h-3.5 w-3.5" /> Dossier</TabsTrigger>
            <TabsTrigger value="sessies" className="gap-1.5 text-xs">
              <Calendar className="h-3.5 w-3.5" /> Sessies
              {sessionAppointments.length > 0 && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 ml-0.5">{sessionAppointments.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="notities" className="gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5" /> Notities
              {structuredNotes.length > 0 && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 ml-0.5">{structuredNotes.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="financieel" className="gap-1.5 text-xs"><Euro className="h-3.5 w-3.5" /> Financieel</TabsTrigger>
          </TabsList>

          {/* ── DOSSIER TAB ── */}
          <TabsContent value="dossier" className="mt-4 space-y-1">
            <div className="divide-y divide-border/60">
              {enrollments.length > 0 && (
                <Section title="Intake" icon={Heart} defaultOpen>
                  <IntakeSection enrollmentId={enrollments[0].id} />
                </Section>
              )}

              {/* Therapy sessions (AI session notes) */}
              {hasIndividual && enrollments.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie").map(enr => (
                <Section key={enr.id} title="Sessieverslagen (AI)" icon={Brain} defaultOpen>
                  <TherapySessionSection enrollmentId={enr.id} clientName={customer.name || undefined} />
                </Section>
              ))}

              {/* SCS Questionnaire results */}
              {enrollments.length > 0 && (
                <Section title="Zelfcompassie Vragenlijst (SCS)" icon={BarChart3}>
                  <ScsResultsSection enrollmentIds={enrollments.map(e => e.id)} />
                </Section>
              )}
            </div>
          </TabsContent>

          {/* ── SESSIES TAB ── */}
          <TabsContent value="sessies" className="mt-4">
            <SessionsSection
              sessionAppointments={sessionAppointments}
              enrollments={enrollments}
              onUpdate={fetchData}
            />
          </TabsContent>

          {/* ── NOTITIES TAB ── */}
          <TabsContent value="notities" className="mt-4">
            <TrainerNotesSection enrollments={enrollments} notes={structuredNotes} onNotesChange={setStructuredNotes} />
          </TabsContent>

          {/* ── FINANCIEEL TAB ── */}
          <TabsContent value="financieel" className="mt-4">
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
              <div className="rounded-md bg-muted p-3 text-sm">
                <p><strong>{customer.name}</strong></p>
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
