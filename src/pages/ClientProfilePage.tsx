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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ArrowLeft, Loader2, Plus, Mail, Phone, Calendar, Euro, ChevronDown,
  Sparkles, Save, CheckCircle2, AlertCircle, Clock, Target, Heart, Brain,
  FileText, RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import type { CustomerData, Registration, Enrollment, TrainerNote, SessionAppointment } from "@/components/admin/customer-profile/types";

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

  const hasContent = Object.values(formData).some(v => v.trim());

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
          <Button
            size="sm"
            variant="ghost"
            onClick={generateSummary}
            disabled={loading}
            className="gap-1.5 text-xs h-7"
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : hasGenerated ? <RefreshCw className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
            {loading ? "Genereren..." : hasGenerated ? "Vernieuwen" : "Genereer"}
          </Button>
        </div>
        {summary ? (
          <div className="prose prose-sm max-w-none text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {summary}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            Klik op "Genereer" voor een AI-samenvatting op basis van alle beschikbare cliëntgegevens.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Quick Stats ──────────────────────────────────────────────────────────────

function QuickStats({ customer, enrollments, sessionAppointments }: {
  customer: CustomerData;
  enrollments: Enrollment[];
  sessionAppointments: SessionAppointment[];
}) {
  const activeEnrollment = enrollments.find(e => e.status === "active");
  const nextSession = sessionAppointments.find(a => a.status === "gepland" && a.session_date);
  const completedSessions = sessionAppointments.filter(a => a.status === "afgerond").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card className="border-border/60">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Aanmeldingen</span>
          </div>
          <p className="text-lg font-bold">{customer.total_registrations}</p>
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Euro className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Omzet</span>
          </div>
          <p className="text-lg font-bold">€{customer.total_spent?.toLocaleString("nl-NL") || 0}</p>
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Sessies</span>
          </div>
          {activeEnrollment?.sessions_total ? (
            <div>
              <p className="text-lg font-bold">{activeEnrollment.sessions_used}/{activeEnrollment.sessions_total}</p>
              <Progress value={(activeEnrollment.sessions_used / activeEnrollment.sessions_total) * 100} className="h-1 mt-1" />
            </div>
          ) : (
            <p className="text-lg font-bold">{completedSessions}</p>
          )}
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Volgende sessie</span>
          </div>
          {nextSession?.session_date ? (
            <p className="text-sm font-semibold">
              {format(new Date(nextSession.session_date), "d MMM", { locale: nl })}
              {nextSession.session_time && <span className="text-muted-foreground ml-1">{nextSession.session_time.slice(0, 5)}</span>}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">—</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Sessions Timeline ────────────────────────────────────────────────────────

function SessionsTimeline({ sessionAppointments, enrollments }: {
  sessionAppointments: SessionAppointment[];
  enrollments: Enrollment[];
}) {
  if (sessionAppointments.length === 0) {
    return <p className="text-sm text-muted-foreground py-4">Nog geen sessies ingepland.</p>;
  }

  return (
    <div className="space-y-2">
      {sessionAppointments.map(appt => (
        <div key={appt.id} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
          <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${
            appt.status === "afgerond" ? "bg-green-500" : appt.status === "geannuleerd" ? "bg-red-400" : "bg-amber-400"
          }`} />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium">Sessie {appt.week_number}</span>
            {appt.notes && <span className="text-xs text-muted-foreground ml-2">— {appt.notes}</span>}
          </div>
          <div className="text-xs text-muted-foreground shrink-0">
            {appt.session_date ? format(new Date(appt.session_date), "d MMM yyyy", { locale: nl }) : "Niet gepland"}
            {appt.session_time && <span className="ml-1">{appt.session_time.slice(0, 5)}</span>}
          </div>
          <Badge variant="outline" className="text-[10px] shrink-0">
            {appt.status === "afgerond" ? "✓ Afgerond" : appt.status === "geannuleerd" ? "Geannuleerd" : "Gepland"}
          </Badge>
        </div>
      ))}
    </div>
  );
}

// ─── Trainer Notes ────────────────────────────────────────────────────────────

const NOTE_TYPES: Record<string, { label: string; color: string }> = {
  general: { label: "Algemeen", color: "bg-muted" },
  intake: { label: "Intake-notitie", color: "bg-blue-50 dark:bg-blue-950/30" },
  attention: { label: "Aandachtspunt", color: "bg-amber-50 dark:bg-amber-950/30" },
  reflection: { label: "Reflectie na sessie", color: "bg-violet-50 dark:bg-violet-950/30" },
  evaluation: { label: "Eindevaluatie", color: "bg-green-50 dark:bg-green-950/30" },
};

function TrainerNotesSection({ enrollments, notes, onNotesChange }: {
  enrollments: Enrollment[];
  notes: TrainerNote[];
  onNotesChange: (notes: TrainerNote[]) => void;
}) {
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState("general");
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!newNote.trim() || enrollments.length === 0) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.from("trainer_notes").insert({
        enrollment_id: enrollments[0].id,
        note_type: noteType,
        content: newNote.trim(),
      }).select("id, enrollment_id, note_type, content").single();
      if (error) throw error;
      onNotesChange([data as TrainerNote, ...notes]);
      setNewNote("");
      toast.success("Notitie opgeslagen");
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSaving(false);
  };

  // Group notes by type
  const grouped = notes.reduce((acc, n) => {
    if (!acc[n.note_type]) acc[n.note_type] = [];
    acc[n.note_type].push(n);
    return acc;
  }, {} as Record<string, TrainerNote[]>);

  return (
    <div className="space-y-4">
      {/* Add note */}
      {enrollments.length > 0 && (
        <Card className="border-border/60">
          <CardContent className="p-3 space-y-2">
            <div className="flex gap-2">
              <Select value={noteType} onValueChange={setNoteType}>
                <SelectTrigger className="w-44 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
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
            return (
              <Card key={note.id} className={`border-border/60 ${type.color}`}>
                <CardContent className="p-3">
                  <Badge variant="outline" className="text-[10px] mb-2">{type.label}</Badge>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
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
          <Badge variant="outline" className="text-[10px]">
            {statusLabel[reg.status] || reg.status}
          </Badge>
          <Badge
            className={`text-[10px] ${
              reg.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
            }`}
          >
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
  title: string;
  icon: React.ComponentType<any>;
  defaultOpen?: boolean;
  children: React.ReactNode;
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
          supabase.from("trainer_notes").select("id, enrollment_id, note_type, content").in("enrollment_id", enrIds),
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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Klant niet gevonden</p>
        <Button variant="outline" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Terug
        </Button>
      </div>
    );
  }

  const activeEnrollment = enrollments.find(e => e.status === "active");

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
              {activeEnrollment && (
                <Badge variant="secondary" className="text-[10px]">
                  {activeEnrollment.course_type === "individueel_6" ? "Individueel traject" :
                   activeEnrollment.course_type === "losse_sessie" ? "Losse sessie" : "Groepstraining"}
                </Badge>
              )}
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

        {/* ── Sections ── */}
        <div className="divide-y divide-border/60">
          {enrollments.length > 0 && (
            <Section title="Intake" icon={Heart} defaultOpen>
              <IntakeSection enrollmentId={enrollments[0].id} />
            </Section>
          )}

          <Section title="Sessies" icon={Calendar} defaultOpen>
            <SessionsTimeline sessionAppointments={sessionAppointments} enrollments={enrollments} />
          </Section>

          <Section title="Notities" icon={FileText}>
            <TrainerNotesSection enrollments={enrollments} notes={structuredNotes} onNotesChange={setStructuredNotes} />
          </Section>

          <Section title="Aanmeldingen & Betalingen" icon={Euro}>
            <RegistrationsList registrations={registrations} />
          </Section>
        </div>
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
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowExtraTraining(false)}>Annuleren</Button>
              <Button onClick={submitExtraTraining} disabled={submittingExtra}>
                {submittingExtra && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Inschrijven
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
