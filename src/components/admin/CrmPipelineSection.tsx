// src/components/admin/CrmPipelineSection.tsx
// Leads & pipeline view with visual stage progress, table, detail sheet, and convert-to-client flow
import { useState, useEffect } from "react";
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
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Plus, Loader2, Mail, Phone, Search, Calendar, Eye,
  MessageSquare, UserCheck, ArrowRight, ChevronRight,
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

// ─── Pipeline stages (leads only) ────────────────────────────────────────────

const STAGES = [
  { key: "new",             label: "Nieuw",          tagClass: "bg-stone-100 text-stone-700 border-stone-200", dotClass: "bg-stone-400" },
  { key: "contact_attempt", label: "Gecontacteerd",  tagClass: "bg-sky-50 text-sky-700 border-sky-200",        dotClass: "bg-sky-400" },
  { key: "in_conversation", label: "Geïnteresseerd", tagClass: "bg-amber-50 text-amber-700 border-amber-200",  dotClass: "bg-amber-400" },
  { key: "intake_scheduled",label: "Kennismaking",   tagClass: "bg-violet-50 text-violet-700 border-violet-200", dotClass: "bg-violet-400" },
  { key: "registered",      label: "Aangemeld",      tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200", dotClass: "bg-emerald-400" },
  { key: "not_interested",  label: "Afgewezen",      tagClass: "bg-muted text-muted-foreground border-border",  dotClass: "bg-muted-foreground" },
];

const LEAD_STAGES = STAGES.filter(s => s.key !== "not_interested");
const STAGE_ORDER = LEAD_STAGES.map(s => s.key);

function getStageInfo(key: string) {
  return STAGES.find(s => s.key === key) || STAGES[0];
}

// ─── Status Tag ───────────────────────────────────────────────────────────────

function StatusTag({ status }: { status: string }) {
  const stage = getStageInfo(status);
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border",
      stage.tagClass
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full", stage.dotClass)} />
      {stage.label}
    </span>
  );
}

// ─── Lead Detail Sheet ────────────────────────────────────────────────────────

function LeadDetailSheet({
  lead, open, onClose, onUpdate, onConvert,
}: {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<Lead>) => void;
  onConvert: (lead: Lead) => void;
}) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [status, setStatus] = useState(lead.status);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNotes(lead.notes || "");
    setStatus(lead.status);
  }, [lead.id, lead.notes, lead.status]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("leads")
      .update({ notes, status, updated_at: new Date().toISOString() })
      .eq("id", lead.id);
    if (!error) {
      onUpdate(lead.id, { notes, status });
      toast.success("Opgeslagen");
    } else toast.error("Fout bij opslaan");
    setSaving(false);
  };

  const moveToNextStage = async () => {
    const idx = STAGE_ORDER.indexOf(status);
    if (idx < 0 || idx >= STAGE_ORDER.length - 1) return;
    const next = STAGE_ORDER[idx + 1];
    const { error } = await supabase
      .from("leads")
      .update({ status: next, updated_at: new Date().toISOString() })
      .eq("id", lead.id);
    if (!error) {
      setStatus(next);
      onUpdate(lead.id, { status: next });
      toast.success(`${lead.first_name} → ${getStageInfo(next).label}`);
    }
  };

  const currentIdx = STAGE_ORDER.indexOf(status);
  const canAdvance = currentIdx >= 0 && currentIdx < STAGE_ORDER.length - 1;

  // Visual stage stepper
  const StagesStepper = () => (
    <div className="flex items-center gap-0.5 py-2">
      {LEAD_STAGES.map((stage, i) => {
        const isCurrent = stage.key === status;
        const isPast = STAGE_ORDER.indexOf(stage.key) < currentIdx;
        return (
          <div key={stage.key} className="flex items-center flex-1">
            <div className={cn(
              "w-full h-1.5 rounded-full transition-colors",
              isPast ? stage.dotClass : isCurrent ? stage.dotClass + " opacity-60" : "bg-border"
            )} />
          </div>
        );
      })}
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-lg">{lead.first_name} {lead.last_name}</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 pt-2">
          {/* Stage stepper */}
          <div>
            <StagesStepper />
            <div className="flex items-center justify-between mt-1">
              <StatusTag status={status} />
              {canAdvance && (
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={moveToNextStage}>
                  {getStageInfo(STAGE_ORDER[currentIdx + 1]).label} <ChevronRight className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="rounded-lg bg-accent/30 p-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <a href={`mailto:${lead.email}`} className="text-foreground hover:underline text-sm">{lead.email}</a>
            </div>
            {lead.phone_number && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <a href={`tel:${lead.phone_number}`} className="text-foreground hover:underline text-sm">{lead.phone_number}</a>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Aangemeld op {format(new Date(lead.submission_date), "d MMMM yyyy", { locale: nl })}
            </div>
          </div>

          {/* Interest & message */}
          {lead.interest && (
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Interesse</Label>
              <Badge variant="outline" className="mt-1 text-xs">{lead.interest}</Badge>
            </div>
          )}
          {lead.message && (
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Bericht</Label>
              <div className="mt-1 bg-muted/20 rounded-lg p-3 border border-border/40">
                <p className="text-sm leading-relaxed">{lead.message}</p>
              </div>
            </div>
          )}

          {/* Status selector */}
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Status wijzigen</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {STAGES.map(s => (
                  <SelectItem key={s.key} value={s.key}>
                    <span className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full", s.dotClass)} />
                      {s.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Notities</Label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Notities over deze lead..."
              className="min-h-[80px] text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
            <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />}
              Opslaan
            </Button>
            {status !== "converted_to_client" && status !== "not_interested" && (
              <Button
                variant="outline"
                className="gap-1.5"
                onClick={() => { onClose(); onConvert(lead); }}
              >
                <UserCheck className="h-3.5 w-3.5" /> Omzetten naar klant
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Convert Lead Modal ───────────────────────────────────────────────────────

function ConvertLeadModal({ lead, onClose, onConverted }: {
  lead: Lead;
  onClose: () => void;
  onConverted: (id: string) => void;
}) {
  const [form, setForm] = useState({
    first_name: lead.first_name, last_name: lead.last_name, email: lead.email,
    course_type: "individueel_6", start_date: "", notes: "", send_invite: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [duplicate, setDuplicate] = useState<any>(null);

  const courseLabels: Record<string, string> = {
    msc_8week: "8-weekse Groepstraining",
    individueel_6: "Individueel Traject (6 sessies)",
    losse_sessie: "Losse Sessie / Coaching",
  };

  const handleConvert = async () => {
    if (!form.start_date) { toast.error("Vul een startdatum in"); return; }
    setSubmitting(true);
    try {
      const email = form.email.trim().toLowerCase();
      const { data: existing } = await supabase.from("clients").select("*").eq("email", email).limit(1);
      let clientId: string, clientUserId: string | null = null;

      if (existing && existing.length > 0) {
        if (!duplicate) { setDuplicate(existing[0]); setSubmitting(false); return; }
        clientId = existing[0].id; clientUserId = existing[0].user_id || null;
      } else {
        const { data: nc, error: ce } = await supabase.from("clients").insert({
          first_name: form.first_name.trim(), last_name: form.last_name.trim(), email,
          phone: lead.phone_number || null, notes: form.notes.trim() || null,
        }).select("id, user_id").single();
        if (ce) throw ce;
        clientId = nc.id; clientUserId = nc.user_id;
      }

      const { error: ee } = await supabase.from("enrollments").insert({
        client_id: clientId, user_id: clientUserId || null, course_type: form.course_type,
        start_date: form.start_date, status: clientUserId ? "active" : "invited", unlocked_weeks: [1],
      }).select("id").single();
      if (ee) throw ee;

      await supabase.from("leads").update({ status: "converted_to_client", updated_at: new Date().toISOString() }).eq("id", lead.id);
      toast.success("Lead omgezet naar klant!");
      onConverted(lead.id);
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSubmitting(false);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-[hsl(var(--terracotta-600))]" /> Omzetten naar klant</DialogTitle>
          <DialogDescription>Klantprofiel en inschrijving aanmaken voor {lead.first_name}.</DialogDescription>
        </DialogHeader>
        {duplicate ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
              <p className="text-sm font-medium text-amber-800">Klant met dit e-mailadres bestaat al.</p>
              <p className="text-sm text-amber-700 mt-1">{duplicate.first_name} {duplicate.last_name} — {duplicate.email}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setDuplicate(null)}>Terug</Button>
              <Button size="sm" onClick={handleConvert} disabled={submitting} className="gap-1.5 bg-[hsl(var(--terracotta-600))] hover:bg-[hsl(var(--terracotta-700))] text-white">
                {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Training toevoegen
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Voornaam *</Label><Input className="h-9" value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))} /></div>
              <div><Label className="text-xs">Achternaam</Label><Input className="h-9" value={form.last_name} onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))} /></div>
            </div>
            <div><Label className="text-xs">E-mail *</Label><Input className="h-9" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
            <div>
              <Label className="text-xs">Training *</Label>
              <Select value={form.course_type} onValueChange={v => setForm(p => ({ ...p, course_type: v }))}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(courseLabels).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Startdatum *</Label><Input className="h-9" type="date" value={form.start_date} onChange={e => setForm(p => ({ ...p, start_date: e.target.value }))} /></div>
            <div><Label className="text-xs">Notities</Label><Textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="min-h-[50px] resize-none" /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="send-inv" checked={form.send_invite} onChange={e => setForm(p => ({ ...p, send_invite: e.target.checked }))} className="rounded" />
              <Label htmlFor="send-inv" className="text-xs font-normal cursor-pointer">Uitnodigingsmail versturen</Label>
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" onClick={onClose}>Annuleren</Button>
              <Button size="sm" onClick={handleConvert} disabled={submitting} className="gap-1.5 bg-[hsl(var(--terracotta-600))] hover:bg-[hsl(var(--terracotta-700))] text-white">
                {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />} <UserCheck className="h-3.5 w-3.5" /> Omzetten
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
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone_number: "", interest: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!form.first_name.trim() || !form.email.trim()) { toast.error("Vul naam en e-mail in"); return; }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.from("leads").insert({
        first_name: form.first_name.trim(), last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(), phone_number: form.phone_number.trim() || null,
        interest: form.interest || null, message: form.message.trim() || null,
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
        <DialogHeader><DialogTitle>Nieuwe lead</DialogTitle><DialogDescription>Voeg een lead toe aan de pipeline.</DialogDescription></DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-xs">Voornaam *</Label><Input className="h-9" value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))} /></div>
            <div><Label className="text-xs">Achternaam</Label><Input className="h-9" value={form.last_name} onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))} /></div>
          </div>
          <div><Label className="text-xs">E-mail *</Label><Input className="h-9" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@voorbeeld.nl" /></div>
          <div><Label className="text-xs">Telefoon</Label><Input className="h-9" value={form.phone_number} onChange={e => setForm(p => ({ ...p, phone_number: e.target.value }))} placeholder="+31 6 ..." /></div>
          <div>
            <Label className="text-xs">Interesse</Label>
            <Select value={form.interest} onValueChange={v => setForm(p => ({ ...p, interest: v }))}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Selecteer..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Groepstraining">Groepstraining</SelectItem>
                <SelectItem value="Individueel traject">Individueel traject</SelectItem>
                <SelectItem value="Beide">Beide</SelectItem>
                <SelectItem value="Coaching">Coaching</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label className="text-xs">Bericht</Label><Textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="min-h-[50px] resize-none" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Annuleren</Button>
          <Button size="sm" onClick={handleCreate} disabled={submitting} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
            {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />} <Plus className="h-3.5 w-3.5" /> Toevoegen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CrmPipelineSection({ onLeadsChange }: { onLeadsChange?: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [showNewLead, setShowNewLead] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

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

  const notifyParent = () => { onLeadsChange?.(); };

  const updateLead = (id: string, patch: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
    if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, ...patch } : null);
    notifyParent();
  };

  const handleConverted = (leadId: string) => {
    updateLead(leadId, { status: "converted_to_client" });
    setConvertingLead(null);
  };

  const filteredLeads = leads.filter(l => {
    if (statusFilter && l.status !== statusFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      l.first_name?.toLowerCase().includes(q) ||
      l.last_name?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.interest?.toLowerCase().includes(q)
    );
  });

  const stageCounts = leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      {/* Toolbar with process dropdown filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op naam, e-mail of interesse..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
        <Select value={statusFilter || "all"} onValueChange={v => setStatusFilter(v === "all" ? null : v)}>
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Alle fases" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle fases ({leads.length})</SelectItem>
            {STAGES.map(s => {
              const count = stageCounts[s.key] || 0;
              return (
                <SelectItem key={s.key} value={s.key}>
                  <span className="flex items-center gap-2">
                    <span className={cn("w-2 h-2 rounded-full", s.dotClass)} />
                    {s.label} ({count})
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">{filteredLeads.length} resultaten</span>
        <Button
          size="sm"
          className="ml-auto gap-1.5 bg-[hsl(var(--terracotta-600))] hover:bg-[hsl(var(--terracotta-700))] text-white"
          onClick={() => setShowNewLead(true)}
        >
          <Plus className="h-3.5 w-3.5" /> Nieuwe lead
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-14">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-14">
          <MessageSquare className="h-8 w-8 text-muted-foreground/25 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            {search || statusFilter ? "Geen leads gevonden" : "Nog geen leads"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border/60 bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs">Naam</TableHead>
                <TableHead className="text-xs">E-mail</TableHead>
                <TableHead className="text-xs">Interesse</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Datum</TableHead>
                <TableHead className="text-xs w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map(lead => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer hover:bg-accent/30"
                  onClick={() => setSelectedLead(lead)}
                >
                  <TableCell className="py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{lead.first_name} {lead.last_name}</span>
                      {lead.notes && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" title="Heeft notities" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5 text-xs text-muted-foreground">{lead.email}</TableCell>
                  <TableCell className="py-2.5">
                    {lead.interest ? (
                      <span className="text-xs text-muted-foreground">{lead.interest}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground/30">—</span>
                    )}
                  </TableCell>
                  <TableCell className="py-2.5"><StatusTag status={lead.status} /></TableCell>
                  <TableCell className="py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(lead.submission_date), "d MMM yyyy", { locale: nl })}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={e => { e.stopPropagation(); setSelectedLead(lead); }}
                    >
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detail Sheet */}
      {selectedLead && (
        <LeadDetailSheet
          lead={selectedLead}
          open={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={updateLead}
          onConvert={lead => { setSelectedLead(null); setConvertingLead(lead); }}
        />
      )}

      {/* Convert Modal */}
      {convertingLead && (
        <ConvertLeadModal
          lead={convertingLead}
          onClose={() => setConvertingLead(null)}
          onConverted={handleConverted}
        />
      )}

      {/* New Lead Modal */}
      {showNewLead && (
        <NewLeadModal
          onClose={() => setShowNewLead(false)}
          onCreated={lead => { setLeads(prev => [lead, ...prev]); setShowNewLead(false); notifyParent(); }}
        />
      )}
    </div>
  );
}
