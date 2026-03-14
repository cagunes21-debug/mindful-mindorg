// src/components/admin/CrmPipelineSection.tsx
// Table-based leads view with status tags, detail panel, and warm earthy design
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
  ChevronRight, MessageSquare, UserCheck, ArrowRight,
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

// ─── Pipeline stages ─────────────────────────────────────────────────────────

const STAGES = [
  { key: "new",                label: "Nieuw",           color: "bg-stone-100 text-stone-700 border-stone-200" },
  { key: "contact_attempt",    label: "Gecontacteerd",   color: "bg-sky-50 text-sky-700 border-sky-200" },
  { key: "in_conversation",    label: "Geïnteresseerd",  color: "bg-amber-50 text-amber-700 border-amber-200" },
  { key: "intake_scheduled",   label: "Kennismaking",    color: "bg-amber-50 text-amber-700 border-amber-200" },
  { key: "registered",         label: "Aangemeld",       color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { key: "converted_to_client",label: "Klant",           color: "bg-green-100 text-green-800 border-green-300" },
  { key: "not_interested",     label: "Niet geïnteresseerd", color: "bg-muted text-muted-foreground border-border" },
];

const STAGE_ORDER = ["new", "contact_attempt", "in_conversation", "intake_scheduled", "registered", "converted_to_client"];

function getStageInfo(key: string) {
  return STAGES.find(s => s.key === key) || STAGES[0];
}

// ─── Status Tag ───────────────────────────────────────────────────────────────

function StatusTag({ status }: { status: string }) {
  const stage = getStageInfo(status);
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border", stage.color)}>
      {stage.label}
    </span>
  );
}

// ─── Lead Detail Sheet ────────────────────────────────────────────────────────

function LeadDetailSheet({
  lead,
  open,
  onClose,
  onUpdate,
}: {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<Lead>) => void;
}) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [status, setStatus] = useState(lead.status);
  const [saving, setSaving] = useState(false);

  // Reset when lead changes
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
    } else {
      toast.error("Fout bij opslaan");
    }
    setSaving(false);
  };

  const moveToNextStage = async () => {
    const currentIdx = STAGE_ORDER.indexOf(status);
    if (currentIdx < 0 || currentIdx >= STAGE_ORDER.length - 1) return;
    const nextStatus = STAGE_ORDER[currentIdx + 1];

    const { error } = await supabase
      .from("leads")
      .update({ status: nextStatus, updated_at: new Date().toISOString() })
      .eq("id", lead.id);

    if (!error) {
      setStatus(nextStatus);
      onUpdate(lead.id, { status: nextStatus });
      toast.success(`${lead.first_name} → ${getStageInfo(nextStatus).label}`);
    }
  };

  const currentIdx = STAGE_ORDER.indexOf(status);
  const canAdvance = currentIdx >= 0 && currentIdx < STAGE_ORDER.length - 1;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-lg">{lead.first_name} {lead.last_name}</SheetTitle>
        </SheetHeader>

        <div className="space-y-5">
          {/* Contact info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${lead.email}`} className="text-foreground hover:underline">{lead.email}</a>
            </div>
            {lead.phone_number && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${lead.phone_number}`} className="text-foreground hover:underline">{lead.phone_number}</a>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {format(new Date(lead.submission_date), "d MMMM yyyy", { locale: nl })}
            </div>
          </div>

          {/* Interest */}
          {lead.interest && (
            <div>
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Interesse</Label>
              <p className="text-sm mt-1">{lead.interest}</p>
            </div>
          )}

          {/* Message */}
          {lead.message && (
            <div>
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Bericht</Label>
              <div className="mt-1 bg-muted/30 rounded-lg p-3">
                <p className="text-sm leading-relaxed">{lead.message}</p>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {STAGES.map(s => (
                  <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Stage progression */}
            {canAdvance && (
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 mt-2"
                onClick={moveToNextStage}
              >
                <ArrowRight className="h-3.5 w-3.5" />
                Verplaats naar: {getStageInfo(STAGE_ORDER[currentIdx + 1]).label}
              </Button>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Notities</Label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Notities over deze lead..."
              className="min-h-[100px] text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSave}
              disabled={saving}
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Opslaan
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
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
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone_number: form.phone_number.trim() || null,
        interest: form.interest || null,
        message: form.message.trim() || null,
        status: "new",
        submission_date: new Date().toISOString(),
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
        <DialogHeader>
          <DialogTitle>Nieuwe lead</DialogTitle>
          <DialogDescription>Voeg handmatig een lead toe aan de pipeline.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Voornaam *</Label><Input value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))} /></div>
            <div><Label>Achternaam</Label><Input value={form.last_name} onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))} /></div>
          </div>
          <div><Label>E-mail *</Label><Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@voorbeeld.nl" /></div>
          <div><Label>Telefoon</Label><Input value={form.phone_number} onChange={e => setForm(p => ({ ...p, phone_number: e.target.value }))} placeholder="+31 6 ..." /></div>
          <div>
            <Label>Interesse</Label>
            <Select value={form.interest} onValueChange={v => setForm(p => ({ ...p, interest: v }))}>
              <SelectTrigger><SelectValue placeholder="Selecteer..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Groepstraining">Groepstraining</SelectItem>
                <SelectItem value="Individueel traject">Individueel traject</SelectItem>
                <SelectItem value="Beide">Beide</SelectItem>
                <SelectItem value="Coaching">Coaching</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>Bericht</Label><Textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="min-h-[60px] resize-none" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuleren</Button>
          <Button onClick={handleCreate} disabled={submitting} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />} <Plus className="h-4 w-4" /> Toevoegen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CrmPipelineSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
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

  const updateLead = (id: string, patch: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
    if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, ...patch } : null);
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

  // Stage counts for filter pills
  const stageCounts = STAGES.reduce((acc, s) => {
    acc[s.key] = leads.filter(l => l.status === s.key).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      {/* Stage filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            !statusFilter
              ? "bg-foreground text-background border-foreground"
              : "bg-card text-muted-foreground border-border hover:border-foreground/30"
          )}
        >
          Alle ({leads.length})
        </button>
        {STAGES.filter(s => s.key !== "not_interested").map(stage => (
          <button
            key={stage.key}
            onClick={() => setStatusFilter(statusFilter === stage.key ? null : stage.key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              statusFilter === stage.key
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground/30"
            )}
          >
            {stage.label} ({stageCounts[stage.key] || 0})
          </button>
        ))}
      </div>

      {/* Toolbar */}
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
        <span className="text-xs text-muted-foreground">{filteredLeads.length} resultaten</span>
        <Button
          size="sm"
          className="ml-auto gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowNewLead(true)}
        >
          <Plus className="h-4 w-4" /> Nieuwe lead
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">
            {search || statusFilter ? "Geen leads gevonden met deze filters" : "Nog geen leads"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Naam</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Interesse</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead className="w-[60px]">Actie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map(lead => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <TableCell>
                    <span className="font-medium text-foreground">
                      {lead.first_name} {lead.last_name}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {lead.email}
                  </TableCell>
                  <TableCell>
                    {lead.interest ? (
                      <span className="text-sm text-muted-foreground">{lead.interest}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground/40">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusTag status={lead.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(lead.submission_date), "d MMM yyyy", { locale: nl })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={e => { e.stopPropagation(); setSelectedLead(lead); }}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
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
        />
      )}

      {/* New Lead Modal */}
      {showNewLead && (
        <NewLeadModal
          onClose={() => setShowNewLead(false)}
          onCreated={lead => { setLeads(prev => [lead, ...prev]); setShowNewLead(false); }}
        />
      )}
    </div>
  );
}
