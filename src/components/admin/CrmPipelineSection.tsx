// src/components/admin/CrmPipelineSection.tsx
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight, Plus, Loader2, Mail, Phone, MessageSquare,
  Calendar, UserCheck, ArrowRight, StickyNote,
  Search, PhoneCall, MessagesSquare, CalendarCheck, ClipboardCheck, PartyPopper,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  message: string | null;
  interest: string | null;
  status: string;
  submission_date: string;
  notes: string | null;
  updated_at?: string;
}

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

// ─── Pipeline config — 6 active stages + archive ──────────────────────────────

const STAGES = [
  {
    key: "new",
    label: "Nieuw",
    icon: Plus,
    color: "#64748B",       // slate
    bgClass: "bg-slate-50",
    textClass: "text-slate-700",
    borderClass: "border-slate-200",
    actionLabel: "Contact opnemen →",
    nextStage: "contact_attempt",
  },
  {
    key: "contact_attempt",
    label: "Contactpoging",
    icon: PhoneCall,
    color: "#F59E0B",       // amber
    bgClass: "bg-amber-50",
    textClass: "text-amber-700",
    borderClass: "border-amber-200",
    actionLabel: "In gesprek →",
    nextStage: "in_conversation",
  },
  {
    key: "in_conversation",
    label: "In gesprek",
    icon: MessagesSquare,
    color: "#8B5CF6",       // violet
    bgClass: "bg-violet-50",
    textClass: "text-violet-700",
    borderClass: "border-violet-200",
    actionLabel: "Kennismaking plannen →",
    nextStage: "intake_scheduled",
  },
  {
    key: "intake_scheduled",
    label: "Kennismaking",
    icon: CalendarCheck,
    color: "#3B82F6",       // blue
    bgClass: "bg-blue-50",
    textClass: "text-blue-700",
    borderClass: "border-blue-200",
    actionLabel: "Aanmelden →",
    nextStage: "registered",
  },
  {
    key: "registered",
    label: "Aangemeld",
    icon: ClipboardCheck,
    color: "#10B981",       // emerald
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-700",
    borderClass: "border-emerald-200",
    actionLabel: "Omzetten naar klant →",
    nextStage: "converted_to_client",
  },
  {
    key: "converted_to_client",
    label: "Deelnemer",
    icon: PartyPopper,
    color: "#059669",       // green-dark
    bgClass: "bg-green-50",
    textClass: "text-green-700",
    borderClass: "border-green-200",
    actionLabel: null,
    nextStage: null,
  },
  {
    key: "not_interested",
    label: "Niet geïnteresseerd",
    icon: null,
    color: "#94A3B8",
    bgClass: "bg-muted/30",
    textClass: "text-muted-foreground",
    borderClass: "border-border",
    actionLabel: null,
    nextStage: null,
  },
];

const ACTIVE_STAGES = STAGES.filter(s => s.key !== "not_interested");

// ─── Lead card ────────────────────────────────────────────────────────────────

function LeadCard({
  lead,
  stage,
  onMoveNext,
  onOpenDetail,
}: {
  lead: Lead;
  stage: typeof STAGES[0];
  onMoveNext: (lead: Lead) => void;
  onOpenDetail: (lead: Lead) => void;
}) {
  const daysSince = Math.floor(
    (Date.now() - new Date(lead.submission_date).getTime()) / 86400000
  );
  const dateLabel = daysSince === 0 ? "Vandaag" : daysSince === 1 ? "Gisteren" : `${daysSince}d geleden`;

  return (
    <div
      className="bg-card border border-border/60 rounded-lg p-3 cursor-pointer hover:shadow-md hover:border-border transition-all group"
      onClick={() => onOpenDetail(lead)}
    >
      {/* Colored left accent */}
      <div className="flex gap-2.5">
        <div
          className="w-1 rounded-full flex-shrink-0 self-stretch"
          style={{ backgroundColor: stage.color }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-foreground truncate">
            {lead.first_name} {lead.last_name}
          </p>
          {lead.interest && (
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              {lead.interest}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] text-muted-foreground/60">{dateLabel}</span>
            {lead.notes && (
              <StickyNote className="h-[10px] w-[10px] text-amber-400" />
            )}
            {lead.phone_number && (
              <Phone className="h-[10px] w-[10px] text-muted-foreground/40" />
            )}
          </div>
        </div>
      </div>

      {/* Action area */}
      {stage.actionLabel && stage.nextStage && (
        <div
          className="mt-2.5 pt-2 border-t border-border/40 flex gap-1.5"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => onOpenDetail(lead)}
            className="flex-1 py-1.5 border border-border/60 rounded-md text-[10px] bg-transparent cursor-pointer text-muted-foreground hover:bg-muted/40 transition-colors"
          >
            📝 Notitie
          </button>
          <button
            onClick={() => onMoveNext(lead)}
            className="flex-[2] py-1.5 px-2 rounded-md text-[10px] font-semibold cursor-pointer transition-all text-white hover:opacity-90"
            style={{ backgroundColor: stage.color }}
          >
            {stage.actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Lead detail modal ────────────────────────────────────────────────────────

function LeadDetailModal({
  lead,
  onClose,
  onUpdate,
  onConvert,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<Lead>) => void;
  onConvert: (lead: Lead) => void;
}) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [saving, setSaving] = useState(false);
  const stage = STAGES.find(s => s.key === lead.status) || STAGES[0];

  const saveNotes = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("leads")
      .update({ notes, updated_at: new Date().toISOString() })
      .eq("id", lead.id);
    if (!error) {
      onUpdate(lead.id, { notes });
      toast.success("Notities opgeslagen");
    } else {
      toast.error("Fout bij opslaan");
    }
    setSaving(false);
  };

  const updateStatus = async (status: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", lead.id);
    if (!error) {
      onUpdate(lead.id, { status });
      toast.success("Status bijgewerkt");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
            {lead.first_name} {lead.last_name}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> {lead.email}
            </span>
            {lead.phone_number && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" /> {lead.phone_number}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Interest + date */}
          <div className="flex items-center gap-2 flex-wrap">
            {lead.interest && (
              <Badge variant="outline" className="text-xs">{lead.interest}</Badge>
            )}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(lead.submission_date), "d MMMM yyyy 'om' HH:mm", { locale: nl })}
            </span>
          </div>

          {/* Message */}
          {lead.message && (
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1.5">
                <MessageSquare className="h-3 w-3" /> Bericht
              </p>
              <p className="text-sm leading-relaxed">{lead.message}</p>
            </div>
          )}

          {/* Status */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Fase in pipeline
            </Label>
            <Select value={lead.status} onValueChange={updateStatus}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STAGES.map(s => (
                  <SelectItem key={s.key} value={s.key}>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: s.color }} />
                      {s.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
              <StickyNote className="h-3 w-3" /> Interne notities
            </Label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Voeg notities toe over dit contact..."
              className="min-h-[80px] text-sm resize-none"
            />
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={saveNotes}
              disabled={saving}
            >
              {saving && <Loader2 className="h-3 w-3 animate-spin mr-2" />}
              Notities opslaan
            </Button>
          </div>

          {/* Convert to client */}
          {lead.status !== "converted_to_client" && lead.status !== "not_interested" && (
            <div className="pt-2 border-t">
              <Button
                className="w-full gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white"
                onClick={() => { onClose(); onConvert(lead); }}
              >
                <UserCheck className="h-4 w-4" /> Omzetten naar klant
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Convert lead modal ───────────────────────────────────────────────────────

function ConvertLeadModal({
  lead,
  onClose,
  onConverted,
}: {
  lead: Lead;
  onClose: () => void;
  onConverted: (leadId: string) => void;
}) {
  const [form, setForm] = useState({
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    training: "Individueel Traject (6 sessies)",
    course_type: "individueel_6",
    start_date: "",
    notes: "",
    send_invite: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [duplicate, setDuplicate] = useState<Client | null>(null);

  const handleConvert = async () => {
    if (!form.start_date) { toast.error("Vul een startdatum in"); return; }
    setSubmitting(true);
    try {
      const email = form.email.trim().toLowerCase();
      const { data: existing } = await supabase
        .from("clients").select("*").eq("email", email).limit(1);

      let clientId: string;
      let clientUserId: string | null = null;

      if (existing && existing.length > 0) {
        if (!duplicate) {
          setDuplicate(existing[0] as Client);
          setSubmitting(false);
          return;
        }
        clientId = existing[0].id;
        clientUserId = existing[0].user_id || null;
      } else {
        const { data: newClient, error: clientErr } = await supabase
          .from("clients")
          .insert({
            first_name: form.first_name.trim(),
            last_name: form.last_name.trim(),
            email,
            phone: lead.phone_number || null,
            notes: form.notes.trim() || null,
          })
          .select("id, user_id")
          .single();
        if (clientErr) throw clientErr;
        clientId = newClient.id;
        clientUserId = newClient.user_id;
      }

      const { data: enrData, error: enrErr } = await supabase
        .from("enrollments")
        .insert({
          client_id: clientId,
          user_id: clientUserId || null,
          course_type: form.course_type,
          start_date: form.start_date,
          status: clientUserId ? "active" : "invited",
          unlocked_weeks: [1],
        })
        .select("id")
        .single();
      if (enrErr) throw enrErr;

      await supabase
        .from("leads")
        .update({ status: "converted_to_client", updated_at: new Date().toISOString() })
        .eq("id", lead.id);

      if (form.send_invite && !clientUserId) {
        const labels: Record<string, string> = {
          msc_8week: "8-weekse Mindful Zelfcompassie Training",
          individueel_6: "Individueel Traject (6 sessies)",
          losse_sessie: "Losse Sessie",
        };
        try {
          await supabase.functions.invoke("send-invitation-email", {
            body: {
              client_id: clientId,
              enrollment_id: enrData.id,
              program_name: labels[form.course_type],
              email,
              first_name: form.first_name.trim(),
            },
          });
        } catch (e) { console.error("Invite email failed:", e); }
      }

      toast.success("Lead succesvol omgezet naar klant!");
      onConverted(lead.id);
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSubmitting(false);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-terracotta-600" />
            Lead omzetten naar klant
          </DialogTitle>
          <DialogDescription>
            Maak een klantprofiel en inschrijving aan voor {lead.first_name}.
          </DialogDescription>
        </DialogHeader>

        {duplicate ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm font-medium text-amber-800">
                Er bestaat al een klant met dit e-mailadres.
              </p>
              <p className="text-sm text-amber-700 mt-1">
                {duplicate.first_name} {duplicate.last_name} — {duplicate.email}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Wil je een training toevoegen aan deze bestaande klant?
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDuplicate(null)}>Terug</Button>
              <Button
                onClick={handleConvert}
                disabled={submitting}
                className="gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                <ArrowRight className="h-4 w-4" /> Training toevoegen
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Voornaam *</Label>
                <Input value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))} />
              </div>
              <div>
                <Label>Achternaam</Label>
                <Input value={form.last_name} onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label>E-mail *</Label>
              <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div>
              <Label>Training *</Label>
              <Select
                value={form.training}
                onValueChange={v => {
                  let ct = "msc_8week";
                  if (v.includes("Individueel")) ct = "individueel_6";
                  else if (v.includes("Losse")) ct = "losse_sessie";
                  setForm(p => ({ ...p, training: v, course_type: ct }));
                }}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individueel Traject (6 sessies)">Individueel Traject (6 sessies)</SelectItem>
                  <SelectItem value="8-weekse Mindful Zelfcompassie Training">8-weekse Groepstraining</SelectItem>
                  <SelectItem value="Losse Sessie / Coaching">Losse Sessie / Coaching</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Startdatum *</Label>
              <Input
                type="date"
                value={form.start_date}
                onChange={e => setForm(p => ({ ...p, start_date: e.target.value }))}
              />
            </div>
            <div>
              <Label>Notities (optioneel)</Label>
              <Textarea
                value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="Eventuele opmerkingen..."
                className="min-h-[60px] resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="send-inv"
                checked={form.send_invite}
                onChange={e => setForm(p => ({ ...p, send_invite: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="send-inv" className="text-sm font-normal cursor-pointer">
                Uitnodigingsmail versturen
              </Label>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Annuleren</Button>
              <Button
                onClick={handleConvert}
                disabled={submitting}
                className="gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                <UserCheck className="h-4 w-4" /> Omzetten
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── New lead modal ───────────────────────────────────────────────────────────

function NewLeadModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (lead: Lead) => void;
}) {
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "",
    phone_number: "", interest: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!form.first_name.trim() || !form.email.trim()) {
      toast.error("Vul naam en e-mail in"); return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim().toLowerCase(),
          phone_number: form.phone_number.trim() || null,
          interest: form.interest.trim() || null,
          message: form.message.trim() || null,
          status: "new",
          submission_date: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      toast.success("Lead aangemaakt!");
      onCreated(data as Lead);
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSubmitting(false);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nieuwe lead toevoegen</DialogTitle>
          <DialogDescription>
            Voeg handmatig een lead toe aan de pipeline.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Voornaam *</Label>
              <Input value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))} />
            </div>
            <div>
              <Label>Achternaam</Label>
              <Input value={form.last_name} onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))} />
            </div>
          </div>
          <div>
            <Label>E-mail *</Label>
            <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <Label>Telefoon</Label>
            <Input value={form.phone_number} onChange={e => setForm(p => ({ ...p, phone_number: e.target.value }))} placeholder="06-..." />
          </div>
          <div>
            <Label>Interesse</Label>
            <Select value={form.interest} onValueChange={v => setForm(p => ({ ...p, interest: v }))}>
              <SelectTrigger><SelectValue placeholder="Selecteer..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Individueel traject">Individueel traject</SelectItem>
                <SelectItem value="8-weekse groepstraining">8-weekse groepstraining</SelectItem>
                <SelectItem value="Losse sessie">Losse sessie</SelectItem>
                <SelectItem value="Coaching">Coaching</SelectItem>
                <SelectItem value="Onbekend">Onbekend</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Bericht / notitie</Label>
            <Textarea
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              placeholder="Eventuele notities over deze lead..."
              className="min-h-[60px] resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuleren</Button>
          <Button
            onClick={handleCreate}
            disabled={submitting}
            className="gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            <Plus className="h-4 w-4" /> Lead toevoegen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CrmPipelineSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [showNewLead, setShowNewLead] = useState(false);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("submission_date", { ascending: false });
    if (!error) setLeads((data || []) as Lead[]);
    setLoading(false);
  };

  const moveToNext = async (lead: Lead) => {
    const stage = STAGES.find(s => s.key === lead.status);
    if (!stage?.nextStage) return;

    if (stage.nextStage === "converted_to_client") {
      setConvertingLead(lead);
      return;
    }

    const { error } = await supabase
      .from("leads")
      .update({ status: stage.nextStage, updated_at: new Date().toISOString() })
      .eq("id", lead.id);

    if (!error) {
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: stage.nextStage! } : l));
      toast.success(`${lead.first_name} verplaatst naar "${STAGES.find(s => s.key === stage.nextStage)?.label}"`);
    }
  };

  const updateLead = (id: string, patch: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
    if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, ...patch } : null);
  };

  const handleConverted = (leadId: string) => {
    updateLead(leadId, { status: "converted_to_client" });
    setConvertingLead(null);
  };

  const handleNewLead = (lead: Lead) => {
    setLeads(prev => [lead, ...prev]);
    setShowNewLead(false);
  };

  const filteredLeads = (stageKey: string) =>
    leads.filter(l => {
      if (l.status !== stageKey) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        l.first_name?.toLowerCase().includes(q) ||
        l.last_name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.interest?.toLowerCase().includes(q)
      );
    });

  const totalActive = leads.filter(l => l.status !== "not_interested").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta-400" />
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek lead..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <span className="text-xs text-muted-foreground">{totalActive} actieve leads</span>
        <Button
          size="sm"
          className="ml-auto gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white"
          onClick={() => setShowNewLead(true)}
        >
          <Plus className="h-4 w-4" /> Nieuwe lead
        </Button>
      </div>

      {/* Stage summary row — colored pill badges */}
      <div className="flex gap-2 flex-wrap">
        {ACTIVE_STAGES.map(stage => {
          const count = filteredLeads(stage.key).length;
          const Icon = stage.icon;
          return (
            <div
              key={stage.key}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
              style={{
                borderColor: stage.color + "40",
                backgroundColor: stage.color + "10",
                color: stage.color,
              }}
            >
              {Icon && <Icon className="h-3 w-3" />}
              <span>{stage.label}</span>
              <span className="ml-0.5 font-bold">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Pipeline board — 6 columns, horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2">
        <div className="grid grid-cols-6 gap-2.5 min-w-[960px]">
          {ACTIVE_STAGES.map(stage => {
            const stageLeads = filteredLeads(stage.key);
            const Icon = stage.icon;
            return (
              <div
                key={stage.key}
                className="rounded-xl min-h-[140px] flex flex-col"
                style={{ backgroundColor: stage.color + "08" }}
              >
                {/* Column header with colored top bar */}
                <div
                  className="h-1 rounded-t-xl"
                  style={{ backgroundColor: stage.color }}
                />
                <div className="flex items-center gap-1.5 px-2.5 pt-2.5 pb-2">
                  {Icon && (
                    <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: stage.color }} />
                  )}
                  <span className="text-[11px] font-semibold text-foreground truncate">
                    {stage.label}
                  </span>
                  <span
                    className="ml-auto min-w-[20px] h-[20px] px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                    style={{ backgroundColor: stage.color }}
                  >
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2 px-2 pb-2 flex-1">
                  {stageLeads.length === 0 ? (
                    <div className="border border-dashed rounded-lg py-6 px-2 text-center text-[11px] text-muted-foreground/40 flex-1 flex items-center justify-center" style={{ borderColor: stage.color + "30" }}>
                      Geen leads
                    </div>
                  ) : (
                    stageLeads.map(lead => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        stage={stage}
                        onMoveNext={moveToNext}
                        onOpenDetail={setSelectedLead}
                      />
                    ))
                  )}
                </div>

                {/* Add button at bottom */}
                {stage.key !== "converted_to_client" && (
                  <button
                    onClick={() => setShowNewLead(true)}
                    className="flex items-center justify-center gap-1 py-2 mx-2 mb-2 border border-dashed rounded-lg text-[11px] text-muted-foreground/40 bg-transparent cursor-pointer hover:text-muted-foreground transition-colors"
                    style={{ borderColor: stage.color + "30" }}
                  >
                    <Plus className="h-3 w-3" /> Toevoegen
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Not interested — collapsed archive */}
      {leads.filter(l => l.status === "not_interested").length > 0 && (
        <details className="group">
          <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none flex items-center gap-2 py-1">
            <ChevronRight className="h-3 w-3 group-open:rotate-90 transition-transform" />
            {leads.filter(l => l.status === "not_interested").length} niet geïnteresseerde leads (archief)
          </summary>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
            {leads.filter(l => l.status === "not_interested").map(lead => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="bg-muted/30 border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors opacity-60"
              >
                <p className="text-xs font-medium">{lead.first_name} {lead.last_name}</p>
                <p className="text-xs text-muted-foreground">{lead.interest || lead.email}</p>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Modals */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={updateLead}
          onConvert={lead => { setSelectedLead(null); setConvertingLead(lead); }}
        />
      )}

      {convertingLead && (
        <ConvertLeadModal
          lead={convertingLead}
          onClose={() => setConvertingLead(null)}
          onConverted={handleConverted}
        />
      )}

      {showNewLead && (
        <NewLeadModal
          onClose={() => setShowNewLead(false)}
          onCreated={handleNewLead}
        />
      )}
    </div>
  );
}
