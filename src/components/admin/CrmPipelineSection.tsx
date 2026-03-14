// src/components/admin/CrmPipelineSection.tsx
// Simple CRM pipeline with drag-and-drop, mock data, ready for Supabase later
import { useState, useRef, DragEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Plus, Mail, Phone, Search, GripVertical, StickyNote, Calendar, X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Types (ready for DB migration) ──────────────────────────────────────────

type Stage = "lead" | "contacted" | "enrolled" | "in_training" | "completed";

interface Participant {
  id: number;
  name: string;
  email: string;
  phone: string;
  stage: Stage;
  cohort: string;
  enrolledDate: string | null;
  nextSession: string | null;
  notes: string;
}

// ─── Pipeline stages ─────────────────────────────────────────────────────────

const STAGES: { key: Stage; label: string; subtitle: string; emoji: string; color: string }[] = [
  { key: "lead",        label: "Nieuw",           subtitle: "Nog geen contact gelegd",       emoji: "🔵", color: "#3B82F6" },
  { key: "contacted",   label: "Contact gelegd",  subtitle: "Bericht of mail gestuurd",      emoji: "🟡", color: "#F59E0B" },
  { key: "enrolled",    label: "Aangemeld",       subtitle: "Ingeschreven voor programma",   emoji: "🟣", color: "#8B5CF6" },
  { key: "in_training", label: "In training",     subtitle: "Programma is gestart",          emoji: "🟢", color: "#10B981" },
  { key: "completed",   label: "Afgerond",        subtitle: "Programma voltooid",            emoji: "✅", color: "#059669" },
];

const NEXT_STAGE: Record<Stage, Stage | null> = {
  lead: "contacted",
  contacted: "enrolled",
  enrolled: "in_training",
  in_training: "completed",
  completed: null,
};

const ACTION_LABELS: Record<string, string> = {
  lead: "Contact leggen",
  contacted: "Aanmelden",
  enrolled: "Start training",
  in_training: "Afronden",
};

// ─── Mock data ───────────────────────────────────────────────────────────────

const MOCK_PARTICIPANTS: Participant[] = [
  { id: 1,  name: "Sanne de Vries",      email: "sanne@email.nl",     phone: "+31 6 12345678", stage: "lead",        cohort: "",              enrolledDate: null,         nextSession: null,         notes: "Via website formulier binnengekomen" },
  { id: 2,  name: "Pieter Bakker",        email: "pieter.b@gmail.com", phone: "+31 6 23456789", stage: "lead",        cohort: "",              enrolledDate: null,         nextSession: null,         notes: "" },
  { id: 3,  name: "Marieke Jansen",       email: "marieke.j@live.nl",  phone: "+31 6 34567890", stage: "lead",        cohort: "",              enrolledDate: null,         nextSession: null,         notes: "Interesse in individueel traject" },
  { id: 4,  name: "Bas van Dijk",         email: "bas.vd@outlook.com", phone: "+31 6 45678901", stage: "contacted",   cohort: "",              enrolledDate: null,         nextSession: null,         notes: "Eerste mail gestuurd op 10 maart" },
  { id: 5,  name: "Floor Willems",        email: "floor.w@gmail.com",  phone: "+31 6 56789012", stage: "contacted",   cohort: "",              enrolledDate: null,         nextSession: null,         notes: "Terugbelverzoek voor volgende week" },
  { id: 6,  name: "Joost van den Berg",   email: "joost@email.nl",     phone: "+31 6 67890123", stage: "contacted",   cohort: "",              enrolledDate: null,         nextSession: null,         notes: "" },
  { id: 7,  name: "Lotte Mulder",         email: "lotte.m@hotmail.com",phone: "+31 6 78901234", stage: "enrolled",    cohort: "Voorjaar 2026", enrolledDate: "2026-03-01", nextSession: "2026-03-20", notes: "Kennismaking gehad, enthousiast" },
  { id: 8,  name: "Thijs Vermeer",        email: "thijs.v@gmail.com",  phone: "+31 6 89012345", stage: "enrolled",    cohort: "Voorjaar 2026", enrolledDate: "2026-03-05", nextSession: "2026-03-20", notes: "Betaling ontvangen" },
  { id: 9,  name: "Anouk Bos",            email: "anouk.bos@email.nl", phone: "+31 6 90123456", stage: "in_training", cohort: "Voorjaar 2026", enrolledDate: "2026-02-10", nextSession: "2026-03-18", notes: "Week 4 van 8, gaat goed" },
  { id: 10, name: "Wouter Hendriks",      email: "wouter.h@live.nl",   phone: "+31 6 01234567", stage: "in_training", cohort: "Voorjaar 2026", enrolledDate: "2026-02-10", nextSession: "2026-03-18", notes: "Heeft extra aandacht nodig bij meditaties" },
  { id: 11, name: "Eva Meijer",           email: "eva.m@gmail.com",    phone: "+31 6 11223344", stage: "in_training", cohort: "Winter 2025",   enrolledDate: "2025-11-15", nextSession: "2026-03-22", notes: "Individueel traject, sessie 5 van 6" },
  { id: 12, name: "Stefan Kok",           email: "stefan.k@outlook.com",phone:"+31 6 22334455", stage: "completed",   cohort: "Najaar 2025",   enrolledDate: "2025-09-01", nextSession: null,         notes: "8-weekse training succesvol afgerond" },
  { id: 13, name: "Iris de Groot",        email: "iris.dg@email.nl",   phone: "+31 6 33445566", stage: "completed",   cohort: "Najaar 2025",   enrolledDate: "2025-09-01", nextSession: null,         notes: "Overweegt vervolgtraject" },
  { id: 14, name: "Daan Visser",          email: "daan.v@gmail.com",   phone: "+31 6 44556677", stage: "lead",        cohort: "",              enrolledDate: null,         nextSession: null,         notes: "Doorverwijzing van huisarts" },
];

// ─── Participant Card ─────────────────────────────────────────────────────────

function ParticipantCard({
  participant, stageColor, onMoveNext, onOpenDetail, onDragStart,
}: {
  participant: Participant;
  stageColor: string;
  onMoveNext: (p: Participant) => void;
  onOpenDetail: (p: Participant) => void;
  onDragStart: (e: DragEvent, p: Participant) => void;
}) {
  const nextStage = NEXT_STAGE[participant.stage];
  const actionLabel = ACTION_LABELS[participant.stage];

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, participant)}
      className="bg-card border border-border/50 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-border/80 transition-all group select-none"
      onClick={() => onOpenDetail(participant)}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground/30 mt-0.5 flex-shrink-0 group-hover:text-muted-foreground/60 transition-colors" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate leading-tight">
            {participant.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
            <Mail className="h-3 w-3 flex-shrink-0" />
            <span className="text-[11px] truncate">{participant.email}</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            {participant.cohort && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">{participant.cohort}</Badge>
            )}
            {participant.notes && <StickyNote className="h-2.5 w-2.5 text-amber-400" />}
            {participant.nextSession && (
              <span className="text-[10px] text-muted-foreground/60 flex items-center gap-0.5">
                <Calendar className="h-2.5 w-2.5" />
                {new Date(participant.nextSession).toLocaleDateString("nl-NL", { day: "numeric", month: "short" })}
              </span>
            )}
          </div>
        </div>
      </div>

      {nextStage && actionLabel && (
        <div className="mt-2 pt-2 border-t border-border/30" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onMoveNext(participant)}
            className="w-full py-1.5 rounded text-[11px] font-medium cursor-pointer transition-all text-white hover:opacity-90"
            style={{ backgroundColor: stageColor }}
          >
            {actionLabel} →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({
  participant, onClose, onUpdate,
}: {
  participant: Participant;
  onClose: () => void;
  onUpdate: (id: number, patch: Partial<Participant>) => void;
}) {
  const [notes, setNotes] = useState(participant.notes);
  const [stage, setStage] = useState<Stage>(participant.stage);
  const stageInfo = STAGES.find(s => s.key === participant.stage)!;

  const handleSave = () => {
    onUpdate(participant.id, { notes, stage });
    toast.success("Opgeslagen");
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stageInfo.color }} />
            {participant.name}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{participant.email}</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{participant.phone}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {participant.cohort && (
            <div className="flex items-center gap-2">
              <Badge variant="outline">{participant.cohort}</Badge>
              {participant.enrolledDate && (
                <span className="text-xs text-muted-foreground">
                  Ingeschreven: {new Date(participant.enrolledDate).toLocaleDateString("nl-NL")}
                </span>
              )}
            </div>
          )}
          {participant.nextSession && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Volgende sessie: {new Date(participant.nextSession).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}
            </div>
          )}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Fase</Label>
            <Select value={stage} onValueChange={v => setStage(v as Stage)}>
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
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Notities over deze deelnemer..."
              className="min-h-[100px] text-sm resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuleren</Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">Opslaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── New Participant Modal ────────────────────────────────────────────────────

function NewParticipantModal({ onClose, onCreated }: { onClose: () => void; onCreated: (p: Participant) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  const handleCreate = () => {
    if (!form.name.trim() || !form.email.trim()) { toast.error("Vul naam en e-mail in"); return; }
    const newP: Participant = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || "",
      stage: "lead",
      cohort: "",
      enrolledDate: null,
      nextSession: null,
      notes: form.notes.trim(),
    };
    onCreated(newP);
    toast.success("Deelnemer toegevoegd!");
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nieuwe deelnemer</DialogTitle>
          <DialogDescription>Voeg een nieuwe lead toe aan de pipeline.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div><Label>Naam *</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Volledige naam" /></div>
          <div><Label>E-mail *</Label><Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@voorbeeld.nl" /></div>
          <div><Label>Telefoon</Label><Input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+31 6 12345678" /></div>
          <div><Label>Notities</Label><Textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="min-h-[60px] resize-none" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuleren</Button>
          <Button onClick={handleCreate} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Toevoegen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Summary Cards ────────────────────────────────────────────────────────────

function SummaryCards({ participants }: { participants: Participant[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {STAGES.map(stage => {
        const count = participants.filter(p => p.stage === stage.key).length;
        return (
          <div key={stage.key} className="rounded-lg border bg-card p-3 flex items-center gap-3">
            <span className="text-lg">{stage.emoji}</span>
            <div>
              <p className="text-xl font-bold" style={{ color: stage.color }}>{count}</p>
              <p className="text-[11px] text-muted-foreground">{stage.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Pipeline Component ──────────────────────────────────────────────────

export default function CrmPipelineSection() {
  const [participants, setParticipants] = useState<Participant[]>(MOCK_PARTICIPANTS);
  const [search, setSearch] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null);
  const draggedRef = useRef<Participant | null>(null);

  // ── Drag & Drop ──
  const handleDragStart = (e: DragEvent, p: Participant) => {
    draggedRef.current = p;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(p.id));
    if (e.currentTarget instanceof HTMLElement) e.currentTarget.style.opacity = "0.4";
  };

  const handleDragEnd = (e: DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) e.currentTarget.style.opacity = "1";
    setDragOverStage(null);
    draggedRef.current = null;
  };

  const handleDragOver = (e: DragEvent, stageKey: Stage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStage(stageKey);
  };

  const handleDrop = (e: DragEvent, targetStage: Stage) => {
    e.preventDefault();
    setDragOverStage(null);
    const p = draggedRef.current;
    if (!p || p.stage === targetStage) return;
    setParticipants(prev => prev.map(x => x.id === p.id ? { ...x, stage: targetStage } : x));
    const targetLabel = STAGES.find(s => s.key === targetStage)?.label;
    toast.success(`${p.name} → ${targetLabel}`);
  };

  const moveToNext = (p: Participant) => {
    const next = NEXT_STAGE[p.stage];
    if (!next) return;
    setParticipants(prev => prev.map(x => x.id === p.id ? { ...x, stage: next } : x));
    toast.success(`${p.name} → ${STAGES.find(s => s.key === next)?.label}`);
  };

  const updateParticipant = (id: number, patch: Partial<Participant>) => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
  };

  const filteredByStage = (stageKey: Stage) =>
    participants.filter(p => {
      if (p.stage !== stageKey) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.cohort.toLowerCase().includes(q);
    });

  return (
    <div className="space-y-5">
      {/* Summary */}
      <SummaryCards participants={participants} />

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Zoek op naam, e-mail of cohort..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-9" />
        </div>
        <span className="text-xs text-muted-foreground">{participants.length} deelnemers</span>
        <Button size="sm" className="ml-auto gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" /> Nieuwe lead
        </Button>
      </div>

      {/* Pipeline Board */}
      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <div className="flex gap-3 min-w-[820px]">
          {STAGES.map(stage => {
            const stageParticipants = filteredByStage(stage.key);
            const isDragOver = dragOverStage === stage.key;

            return (
              <div
                key={stage.key}
                className={cn(
                  "flex-1 min-w-[155px] rounded-xl flex flex-col transition-all",
                  isDragOver ? "ring-2 ring-offset-1" : ""
                )}
                style={{
                  backgroundColor: stage.color + "0A",
                  ...(isDragOver ? { ringColor: stage.color } as any : {}),
                }}
                onDragOver={e => handleDragOver(e, stage.key)}
                onDragLeave={() => setDragOverStage(null)}
                onDrop={e => handleDrop(e, stage.key)}
              >
                {/* Color bar */}
                <div className="h-1.5 rounded-t-xl" style={{ backgroundColor: stage.color }} />

                {/* Header */}
                <div className="px-3 pt-2.5 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{stage.emoji}</span>
                      <span className="text-[13px] font-semibold text-foreground">{stage.label}</span>
                    </div>
                    <span
                      className="min-w-[22px] h-[22px] rounded-full text-[11px] font-bold flex items-center justify-center text-white"
                      style={{ backgroundColor: stage.color }}
                    >
                      {stageParticipants.length}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{stage.subtitle}</p>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2 px-2 pb-2 flex-1 min-h-[100px] max-h-[calc(100vh-380px)] overflow-y-auto">
                  {stageParticipants.length === 0 ? (
                    <div
                      className={cn(
                        "border border-dashed rounded-lg py-10 text-center text-[11px] text-muted-foreground/40 flex-1 flex items-center justify-center transition-colors",
                        isDragOver && "border-solid bg-background/60"
                      )}
                      style={{ borderColor: stage.color + "30" }}
                    >
                      {isDragOver ? "Loslaten" : "Sleep hierheen"}
                    </div>
                  ) : (
                    stageParticipants.map(p => (
                      <div key={p.id} onDragEnd={handleDragEnd}>
                        <ParticipantCard
                          participant={p}
                          stageColor={stage.color}
                          onMoveNext={moveToNext}
                          onOpenDetail={setSelectedParticipant}
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

      {/* Modals */}
      {selectedParticipant && (
        <DetailModal
          participant={selectedParticipant}
          onClose={() => setSelectedParticipant(null)}
          onUpdate={updateParticipant}
        />
      )}
      {showNew && (
        <NewParticipantModal
          onClose={() => setShowNew(false)}
          onCreated={p => { setParticipants(prev => [p, ...prev]); setShowNew(false); }}
        />
      )}
    </div>
  );
}
