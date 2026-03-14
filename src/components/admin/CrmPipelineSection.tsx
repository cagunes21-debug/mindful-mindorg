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
  Calendar, Clock, UserCheck, ArrowRight, X, StickyNote,
  Search,
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

// ─── Pipeline config ──────────────────────────────────────────────────────────

const STAGES = [
  {
    key: "new",
    label: "Nieuwe lead",
    color: { bg: "bg-muted/50", text: "text-muted-foreground", border: "border-border", dot: "bg-muted-foreground", dotHex: "#888780" },
    actionLabel: "Contact opnemen →",
    nextStage: "contacted",
  },
  {
    key: "contacted",
    label: "Contact opgenomen",
    color: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200", dot: "bg-amber-500", dotHex: "#EF9F27" },
    actionLabel: "Kennismaking plannen →",
    nextStage: "intake_scheduled",
  },
  {
    key: "intake_scheduled",
    label: "Kennismaking gepland",
    color: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200", dot: "bg-purple-500", dotHex: "#7F77DD" },
    actionLabel: "Aanmelding maken →",
    nextStage: "aanmelding",
  },
  {
    key: "aanmelding",
    label: "Aanmelding",
    color: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200", dot: "bg-blue-500", dotHex: "#378ADD" },
    actionLabel: "Omzetten naar klant →",
    nextStage: "converted_to_client",
  },
  {
    key: "converted_to_client",
    label: "Deelnemer / cliënt",
    color: { bg: "bg-green-50", text: "text-green-800", border: "border-green-200", dot: "bg-green-500", dotHex: "#639922" },
    actionLabel: "Klantprofiel →",
    nextStage: null,
  },
  {
    key: "not_interested",
    label: "Niet geïnteresseerd",
    color: { bg: "bg-muted/30", text: "text-muted-foreground", border: "border-border", dot: "bg-muted-foreground/50", dotHex: "#B4B2A9" },
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
  const dateLabel = daysSince === 0 ? "Vandaag" : daysSince === 1 ? "Gisteren" : `${daysSince} dagen`;

  return (
    <div
      className="bg-card border border-border/60 rounded-lg p-3 cursor-pointer hover:border-border hover:shadow-sm transition-all"
      onClick={() => onOpenDetail(lead)}
    >
      <p className="text-[13px] font-medium text-foreground mb-0.5">
        {lead.first_name} {lead.last_name}
      </p>
      {lead.interest && (
        <p className="text-[11px] text-muted-foreground mb-1.5">
          {lead.interest}
        </p>
      )}
      <div className="flex items-center justify-between mb-0">
        <span className="text-[10px] text-muted-foreground/70">{dateLabel}</span>
        {lead.notes && (
          <span title={lead.notes}>
            <StickyNote className="h-[11px] w-[11px] text-muted-foreground/50" />
          </span>
        )}
      </div>

      {/* Action button */}
      {stage.actionLabel && stage.nextStage && (
        <div
          className="mt-2 pt-2 border-t border-border/50 flex gap-1.5"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => onOpenDetail(lead)}
            className="flex-1 py-1 border border-border/60 rounded-md text-[10px] bg-transparent cursor-pointer text-muted-foreground hover:bg-muted/30 transition-colors"
          >
            Notitie
          </button>
          <button
            onClick={() => onMoveNext(lead)}
            className={cn(
              "flex-[2] py-1 px-2 rounded-md text-[10px] font-medium cursor-pointer transition-colors border",
              stage.color.bg, stage.color.text, stage.color.border,
              "hover:opacity-80"
            )}
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
                  <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
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

      // Create enrollment
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

      // Update lead status
      await supabase
        .from("leads")
        .update({ status: "converted_to_client", updated_at: new Date().toISOString() })
        .eq("id", lead.id);

      // Send invite
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
        <Button
          size="sm"
          className="ml-auto gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white"
          onClick={() => setShowNewLead(true)}
        >
          <Plus className="h-4 w-4" /> Nieuwe lead
        </Button>
      </div>

      {/* Stage summary cards */}
      <div className="grid grid-cols-5 gap-2">
        {ACTIVE_STAGES.map(stage => {
          const count = filteredLeads(stage.key).length;
          return (
            <Card
              key={stage.key}
              className={cn("border-border/60 overflow-hidden")}
              style={{ borderTopWidth: 2, borderTopColor: stage.color.dotHex }}
            >
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold text-foreground leading-tight">{count}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{stage.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pipeline board — horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2">
        <div className="grid grid-cols-5 gap-3 min-w-[800px]">
          {ACTIVE_STAGES.map(stage => {
            const stageLeads = filteredLeads(stage.key);
            return (
              <div
                key={stage.key}
                className="bg-muted/30 rounded-xl p-2.5 min-h-[120px]"
              >
                {/* Column header */}
                <div className="flex items-center justify-between mb-2.5 px-0.5">
                  <span className="text-[11px] font-medium text-foreground">
                    {stage.label}
                  </span>
                  <span className={cn(
                    "min-w-[18px] h-[18px] px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center",
                    stage.color.bg, stage.color.text
                  )}>
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2">
                  {stageLeads.length === 0 ? (
                    <div className="border border-dashed border-border/60 rounded-lg py-4 px-2 text-center text-[11px] text-muted-foreground/50">
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

                {/* Add button */}
                <button
                  onClick={() => setShowNewLead(true)}
                  className="flex items-center justify-center gap-1 py-1.5 mt-2 w-full border border-dashed border-border/60 rounded-lg text-[11px] text-muted-foreground/50 bg-transparent cursor-pointer hover:border-border hover:text-muted-foreground transition-colors"
                >
                  <Plus className="h-3 w-3" /> Toevoegen
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Not interested — collapsed row */}
      {leads.filter(l => l.status === "not_interested").length > 0 && (
        <details className="group">
          <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none flex items-center gap-2 py-1">
            <ChevronRight className="h-3 w-3 group-open:rotate-90 transition-transform" />
            {leads.filter(l => l.status === "not_interested").length} niet geïnteresseerde leads
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
