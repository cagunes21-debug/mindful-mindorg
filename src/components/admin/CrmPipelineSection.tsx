// src/components/admin/CrmPipelineSection.tsx
// Clean horizontal Kanban pipeline with native drag-and-drop
import { useState, useEffect, useRef, DragEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight, Plus, Loader2, Mail, Phone, MessageSquare,
  Calendar, UserCheck, ArrowRight, StickyNote, Search,
  GripVertical,
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

// ─── Pipeline stages ─────────────────────────────────────────────────────────

const STAGES = [
  { key: "new",                 label: "Nieuw",           subtitle: "Nog geen contact",        color: "#64748B", emoji: "🔵" },
  { key: "contact_attempt",     label: "Contact gelegd",  subtitle: "Bericht of mail gestuurd", color: "#F59E0B", emoji: "🟡" },
  { key: "in_conversation",     label: "Gesprek gepland", subtitle: "Kennismaking ingepland",   color: "#8B5CF6", emoji: "🟣" },
  { key: "intake_scheduled",    label: "Kennismaking",    subtitle: "Gesprek heeft plaatsgevonden", color: "#3B82F6", emoji: "🔷" },
  { key: "registered",          label: "Aangemeld",       subtitle: "Ingeschreven voor programma",  color: "#10B981", emoji: "🟢" },
  { key: "converted_to_client", label: "Deelnemer",       subtitle: "Programma gestart",        color: "#059669", emoji: "🎉" },
  { key: "not_interested",      label: "Niet geïnteresseerd", subtitle: "",                     color: "#94A3B8", emoji: "" },
];

const ACTIVE_STAGES = STAGES.filter(s => s.key !== "not_interested");

// Next stage mapping for action buttons
const NEXT_STAGE: Record<string, string | null> = {
  new: "contact_attempt",
  contact_attempt: "in_conversation",
  in_conversation: "intake_scheduled",
  intake_scheduled: "registered",
  registered: "converted_to_client",
  converted_to_client: null,
};

const ACTION_LABELS: Record<string, string> = {
  new: "Contact leggen",
  contact_attempt: "Gesprek plannen",
  in_conversation: "Kennismaking",
  intake_scheduled: "Aanmelden",
  registered: "Omzetten",
};

// ─── Draggable Lead Card ──────────────────────────────────────────────────────

function LeadCard({
  lead,
  stageColor,
  onMoveNext,
  onOpenDetail,
  onDragStart,
}: {
  lead: Lead;
  stageColor: string;
  onMoveNext: (lead: Lead) => void;
  onOpenDetail: (lead: Lead) => void;
  onDragStart: (e: DragEvent, lead: Lead) => void;
}) {
  const daysSince = Math.floor(
    (Date.now() - new Date(lead.submission_date).getTime()) / 86400000
  );
  const dateLabel = daysSince === 0 ? "Vandaag" : daysSince === 1 ? "Gisteren" : `${daysSince}d`;
  const nextStage = NEXT_STAGE[lead.status];
  const actionLabel = ACTION_LABELS[lead.status];

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, lead)}
      className="bg-card border border-border/50 rounded-lg p-2.5 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-border/80 transition-all group select-none"
      onClick={() => onOpenDetail(lead)}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground/30 mt-0.5 flex-shrink-0 group-hover:text-muted-foreground/60 transition-colors" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate leading-tight">
            {lead.first_name} {lead.last_name}
          </p>
          {lead.interest && (
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">{lead.interest}</p>
          )}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] text-muted-foreground/50">{dateLabel}</span>
            {lead.notes && <StickyNote className="h-2.5 w-2.5 text-amber-400" />}
            {lead.phone_number && <Phone className="h-2.5 w-2.5 text-muted-foreground/30" />}
          </div>
        </div>
      </div>

      {nextStage && actionLabel && (
        <div className="mt-2 pt-1.5 border-t border-border/30" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onMoveNext(lead)}
            className="w-full py-1 rounded text-[10px] font-medium cursor-pointer transition-all text-white hover:opacity-90"
            style={{ backgroundColor: stageColor }}
          >
            {actionLabel} →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Lead Detail Modal ────────────────────────────────────────────────────────

function LeadDetailModal({
  lead, onClose, onUpdate, onConvert,
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
    if (!error) { onUpdate(lead.id, { notes }); toast.success("Opgeslagen"); }
    else toast.error("Fout bij opslaan");
    setSaving(false);
  };

  const updateStatus = async (status: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", lead.id);
    if (!error) { onUpdate(lead.id, { status }); toast.success("Status bijgewerkt"); }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
            {lead.first_name} {lead.last_name}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
            {lead.phone_number && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone_number}</span>}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {lead.interest && <Badge variant="outline" className="text-xs">{lead.interest}</Badge>}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(lead.submission_date), "d MMMM yyyy 'om' HH:mm", { locale: nl })}
            </span>
          </div>
          {lead.message && (
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1.5">
                <MessageSquare className="h-3 w-3" /> Bericht
              </p>
              <p className="text-sm leading-relaxed">{lead.message}</p>
            </div>
          )}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Fase</Label>
            <Select value={lead.status} onValueChange={updateStatus}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {STAGES.map(s => (
                  <SelectItem key={s.key} value={s.key}>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      {s.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Notities</Label>
            <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notities..." className="min-h-[80px] text-sm resize-none" />
            <Button size="sm" variant="outline" className="w-full" onClick={saveNotes} disabled={saving}>
              {saving && <Loader2 className="h-3 w-3 animate-spin mr-2" />} Opslaan
            </Button>
          </div>
          {lead.status !== "converted_to_client" && lead.status !== "not_interested" && (
            <div className="pt-2 border-t">
              <Button className="w-full gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white" onClick={() => { onClose(); onConvert(lead); }}>
                <UserCheck className="h-4 w-4" /> Omzetten naar klant
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Convert Lead Modal ───────────────────────────────────────────────────────

function ConvertLeadModal({ lead, onClose, onConverted }: { lead: Lead; onClose: () => void; onConverted: (id: string) => void }) {
  const [form, setForm] = useState({
    first_name: lead.first_name, last_name: lead.last_name, email: lead.email,
    training: "Individueel Traject (6 sessies)", course_type: "individueel_6",
    start_date: "", notes: "", send_invite: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [duplicate, setDuplicate] = useState<Client | null>(null);

  const handleConvert = async () => {
    if (!form.start_date) { toast.error("Vul een startdatum in"); return; }
    setSubmitting(true);
    try {
      const email = form.email.trim().toLowerCase();
      const { data: existing } = await supabase.from("clients").select("*").eq("email", email).limit(1);
      let clientId: string, clientUserId: string | null = null;

      if (existing && existing.length > 0) {
        if (!duplicate) { setDuplicate(existing[0] as Client); setSubmitting(false); return; }
        clientId = existing[0].id; clientUserId = existing[0].user_id || null;
      } else {
        const { data: nc, error: ce } = await supabase.from("clients").insert({
          first_name: form.first_name.trim(), last_name: form.last_name.trim(), email,
          phone: lead.phone_number || null, notes: form.notes.trim() || null,
        }).select("id, user_id").single();
        if (ce) throw ce;
        clientId = nc.id; clientUserId = nc.user_id;
      }

      const { data: enr, error: ee } = await supabase.from("enrollments").insert({
        client_id: clientId, user_id: clientUserId || null, course_type: form.course_type,
        start_date: form.start_date, status: clientUserId ? "active" : "invited", unlocked_weeks: [1],
      }).select("id").single();
      if (ee) throw ee;

      await supabase.from("leads").update({ status: "converted_to_client", updated_at: new Date().toISOString() }).eq("id", lead.id);

      if (form.send_invite && !clientUserId) {
        const labels: Record<string, string> = { msc_8week: "8-weekse Mindful Zelfcompassie Training", individueel_6: "Individueel Traject (6 sessies)", losse_sessie: "Losse Sessie" };
        try { await supabase.functions.invoke("send-invitation-email", { body: { client_id: clientId, enrollment_id: enr.id, program_name: labels[form.course_type], email, first_name: form.first_name.trim() } }); } catch (e) { console.error("Invite email failed:", e); }
      }
      toast.success("Lead omgezet naar klant!");
      onConverted(lead.id);
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSubmitting(false);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-terracotta-600" /> Omzetten naar klant</DialogTitle>
          <DialogDescription>Klantprofiel en inschrijving aanmaken voor {lead.first_name}.</DialogDescription>
        </DialogHeader>
        {duplicate ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm font-medium text-amber-800">Er bestaat al een klant met dit e-mailadres.</p>
              <p className="text-sm text-amber-700 mt-1">{duplicate.first_name} {duplicate.last_name} — {duplicate.email}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDuplicate(null)}>Terug</Button>
              <Button onClick={handleConvert} disabled={submitting} className="gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />} <ArrowRight className="h-4 w-4" /> Training toevoegen
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Voornaam *</Label><Input value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))} /></div>
              <div><Label>Achternaam</Label><Input value={form.last_name} onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))} /></div>
            </div>
            <div><Label>E-mail *</Label><Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
            <div>
              <Label>Training *</Label>
              <Select value={form.training} onValueChange={v => { let ct = "msc_8week"; if (v.includes("Individueel")) ct = "individueel_6"; else if (v.includes("Losse")) ct = "losse_sessie"; setForm(p => ({ ...p, training: v, course_type: ct })); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individueel Traject (6 sessies)">Individueel Traject (6 sessies)</SelectItem>
                  <SelectItem value="8-weekse Mindful Zelfcompassie Training">8-weekse Groepstraining</SelectItem>
                  <SelectItem value="Losse Sessie / Coaching">Losse Sessie / Coaching</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Startdatum *</Label><Input type="date" value={form.start_date} onChange={e => setForm(p => ({ ...p, start_date: e.target.value }))} /></div>
            <div><Label>Notities</Label><Textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="min-h-[60px] resize-none" /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="send-inv" checked={form.send_invite} onChange={e => setForm(p => ({ ...p, send_invite: e.target.checked }))} className="rounded" />
              <Label htmlFor="send-inv" className="text-sm font-normal cursor-pointer">Uitnodigingsmail versturen</Label>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Annuleren</Button>
              <Button onClick={handleConvert} disabled={submitting} className="gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />} <UserCheck className="h-4 w-4" /> Omzetten
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── New Lead Modal ───────────────────────────────────────────────────────────

function NewLeadModal({ onClose, onCreated }: { onClose: () => void; onCreated: (lead: Lead) => void }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone_number: "", interest: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!form.first_name.trim() || !form.email.trim()) { toast.error("Vul naam en e-mail in"); return; }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.from("leads").insert({
        first_name: form.first_name.trim(), last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(), phone_number: form.phone_number.trim() || null,
        interest: form.interest.trim() || null, message: form.message.trim() || null,
        status: "new", submission_date: new Date().toISOString(),
      }).select().single();
      if (error) throw error;
      toast.success("Lead aangemaakt!");
      onCreated(data as Lead);
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSubmitting(false);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Nieuwe lead</DialogTitle><DialogDescription>Voeg handmatig een lead toe.</DialogDescription></DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Voornaam *</Label><Input value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))} /></div>
            <div><Label>Achternaam</Label><Input value={form.last_name} onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))} /></div>
          </div>
          <div><Label>E-mail *</Label><Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
          <div><Label>Telefoon</Label><Input value={form.phone_number} onChange={e => setForm(p => ({ ...p, phone_number: e.target.value }))} placeholder="06-..." /></div>
          <div>
            <Label>Interesse</Label>
            <Select value={form.interest} onValueChange={v => setForm(p => ({ ...p, interest: v }))}>
              <SelectTrigger><SelectValue placeholder="Selecteer..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Individueel traject">Individueel traject</SelectItem>
                <SelectItem value="8-weekse groepstraining">8-weekse groepstraining</SelectItem>
                <SelectItem value="Losse sessie">Losse sessie</SelectItem>
                <SelectItem value="Coaching">Coaching</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>Bericht</Label><Textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="min-h-[60px] resize-none" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuleren</Button>
          <Button onClick={handleCreate} disabled={submitting} className="gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />} <Plus className="h-4 w-4" /> Toevoegen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Pipeline Component ──────────────────────────────────────────────────

export default function CrmPipelineSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [showNewLead, setShowNewLead] = useState(false);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  const draggedLeadRef = useRef<Lead | null>(null);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("leads").select("*").order("submission_date", { ascending: false });
    if (!error) setLeads((data || []) as Lead[]);
    setLoading(false);
  };

  // ── Drag & Drop ──
  const handleDragStart = (e: DragEvent, lead: Lead) => {
    draggedLeadRef.current = lead;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", lead.id);
    // Make drag image slightly transparent
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "0.5";
    }
  };

  const handleDragEnd = (e: DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }
    setDragOverStage(null);
    draggedLeadRef.current = null;
  };

  const handleDragOver = (e: DragEvent, stageKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStage(stageKey);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = async (e: DragEvent, targetStageKey: string) => {
    e.preventDefault();
    setDragOverStage(null);
    const lead = draggedLeadRef.current;
    if (!lead || lead.status === targetStageKey) return;

    // If dropping to converted_to_client, open convert modal
    if (targetStageKey === "converted_to_client") {
      setConvertingLead(lead);
      return;
    }

    // Optimistic update
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: targetStageKey } : l));

    const { error } = await supabase
      .from("leads")
      .update({ status: targetStageKey, updated_at: new Date().toISOString() })
      .eq("id", lead.id);

    if (error) {
      // Rollback
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: lead.status } : l));
      toast.error("Kon status niet bijwerken");
    } else {
      const targetLabel = STAGES.find(s => s.key === targetStageKey)?.label;
      toast.success(`${lead.first_name} → ${targetLabel}`);
    }
  };

  // ── Button-based move ──
  const moveToNext = async (lead: Lead) => {
    const next = NEXT_STAGE[lead.status];
    if (!next) return;
    if (next === "converted_to_client") { setConvertingLead(lead); return; }

    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: next } : l));
    const { error } = await supabase.from("leads").update({ status: next, updated_at: new Date().toISOString() }).eq("id", lead.id);
    if (error) {
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: lead.status } : l));
    } else {
      toast.success(`${lead.first_name} → ${STAGES.find(s => s.key === next)?.label}`);
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

  const filteredLeads = (stageKey: string) =>
    leads.filter(l => {
      if (l.status !== stageKey) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return l.first_name?.toLowerCase().includes(q) || l.last_name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.interest?.toLowerCase().includes(q);
    });

  if (loading) {
    return <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-terracotta-400" /></div>;
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Zoek lead..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-9" />
        </div>
        <Button size="sm" className="ml-auto gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white" onClick={() => setShowNewLead(true)}>
          <Plus className="h-4 w-4" /> Nieuwe lead
        </Button>
      </div>

      {/* Pipeline Board — horizontal columns */}
      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <div className="flex gap-2.5 min-w-[900px]">
          {ACTIVE_STAGES.map(stage => {
            const stageLeads = filteredLeads(stage.key);
            const isDragOver = dragOverStage === stage.key;

            return (
              <div
                key={stage.key}
                className={cn(
                  "flex-1 min-w-[145px] rounded-xl flex flex-col transition-all",
                  isDragOver ? "ring-2 ring-offset-1" : ""
                )}
                style={{
                  backgroundColor: stage.color + "08",
                  ...(isDragOver ? { ringColor: stage.color } as any : {}),
                }}
                onDragOver={e => handleDragOver(e, stage.key)}
                onDragLeave={handleDragLeave}
                onDrop={e => handleDrop(e, stage.key)}
              >
                {/* Colored top bar */}
                <div className="h-1.5 rounded-t-xl" style={{ backgroundColor: stage.color }} />

                {/* Header */}
                <div className="px-2.5 pt-2 pb-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-sm">{stage.emoji}</span>
                      <span className="text-[12px] font-semibold text-foreground truncate">{stage.label}</span>
                    </div>
                    <span
                      className="min-w-[20px] h-[20px] rounded-full text-[10px] font-bold flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: stage.color }}
                    >
                      {stageLeads.length}
                    </span>
                  </div>
                  <p className="text-[9px] text-muted-foreground/50 mt-0.5 truncate">{stage.subtitle}</p>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-1.5 px-1.5 pb-2 flex-1 min-h-[80px] max-h-[calc(100vh-340px)] overflow-y-auto">
                  {stageLeads.length === 0 ? (
                    <div
                      className={cn(
                        "border border-dashed rounded-lg py-8 text-center text-[11px] text-muted-foreground/30 flex-1 flex items-center justify-center transition-colors",
                        isDragOver && "border-solid bg-white/50"
                      )}
                      style={{ borderColor: stage.color + "25" }}
                    >
                      {isDragOver ? "Loslaten" : "Sleep hierheen"}
                    </div>
                  ) : (
                    stageLeads.map(lead => (
                      <div key={lead.id} onDragEnd={handleDragEnd}>
                        <LeadCard
                          lead={lead}
                          stageColor={stage.color}
                          onMoveNext={moveToNext}
                          onOpenDetail={setSelectedLead}
                          onDragStart={handleDragStart}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Archive: not interested */}
      {leads.filter(l => l.status === "not_interested").length > 0 && (
        <details className="group">
          <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground list-none flex items-center gap-1.5 py-1">
            <ChevronRight className="h-3 w-3 group-open:rotate-90 transition-transform" />
            {leads.filter(l => l.status === "not_interested").length} niet geïnteresseerd (archief)
          </summary>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            {leads.filter(l => l.status === "not_interested").map(lead => (
              <div key={lead.id} onClick={() => setSelectedLead(lead)} className="bg-muted/30 border border-border rounded-lg p-2.5 cursor-pointer hover:bg-muted/50 opacity-50">
                <p className="text-xs font-medium">{lead.first_name} {lead.last_name}</p>
                <p className="text-[10px] text-muted-foreground">{lead.interest || lead.email}</p>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Modals */}
      {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} onUpdate={updateLead} onConvert={lead => { setSelectedLead(null); setConvertingLead(lead); }} />}
      {convertingLead && <ConvertLeadModal lead={convertingLead} onClose={() => setConvertingLead(null)} onConverted={handleConverted} />}
      {showNewLead && <NewLeadModal onClose={() => setShowNewLead(false)} onCreated={lead => { setLeads(prev => [lead, ...prev]); setShowNewLead(false); }} />}
    </div>
  );
}
