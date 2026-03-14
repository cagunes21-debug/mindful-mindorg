// src/components/admin/AgendaSection.tsx
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Calendar, Clock, Users, Euro, Globe, Plus, Loader2,
  Edit2, Eye, EyeOff, AlertCircle, CheckCircle2, Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrainingDate {
  id: string;
  name: string;
  short_name: string | null;
  type: string;
  language: string;
  day_label: string | null;
  start_date: string;
  time_start: string | null;
  time_end: string | null;
  follow_up_dates: string | null;
  location: string | null;
  price: number;
  early_bird_price: number | null;
  early_bird_deadline: string | null;
  max_spots: number;
  is_full: boolean;
  is_featured: boolean;
  is_visible: boolean;
  notes: string | null;
}

interface TrainingWithCount extends TrainingDate {
  registrations_count: number;
  paid_count: number;
  awaiting_payment_count: number;
  spots_remaining: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  msc_8week:    "8-weekse MSC",
  workshop:     "Workshop",
  retreat:      "Retreat",
  individueel:  "Individueel",
};

const TYPE_COLORS: Record<string, string> = {
  msc_8week:   "bg-terracotta-100 text-terracotta-700",
  workshop:    "bg-sage-100 text-sage-700",
  retreat:     "bg-purple-100 text-purple-700",
  individueel: "bg-blue-100 text-blue-700",
};

const LANG_FLAG: Record<string, string> = {
  nl: "🇳🇱",
  en: "🇬🇧",
};

function occupancyColor(pct: number): string {
  if (pct >= 100) return "bg-red-500";
  if (pct >= 80)  return "bg-amber-500";
  if (pct >= 50)  return "bg-terracotta-500";
  return "bg-green-500";
}

function statusBadge(t: TrainingWithCount) {
  if (t.is_full || t.spots_remaining <= 0) {
    return <Badge className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0">Vol</Badge>;
  }
  if (t.early_bird_price && t.early_bird_deadline && new Date(t.early_bird_deadline) > new Date()) {
    return <Badge className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0 gap-1"><Sparkles className="h-2.5 w-2.5" />Early bird</Badge>;
  }
  if (t.spots_remaining === 1) {
    return <Badge className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0">Laatste plek!</Badge>;
  }
  return <Badge className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0">Open</Badge>;
}

// ─── Training card ────────────────────────────────────────────────────────────

function TrainingCard({
  training,
  onEdit,
  onToggleVisible,
  onToggleFull,
}: {
  training: TrainingWithCount;
  onEdit: (t: TrainingWithCount) => void;
  onToggleVisible: (t: TrainingWithCount) => void;
  onToggleFull: (t: TrainingWithCount) => void;
}) {
  const pct = Math.min(Math.round((training.registrations_count / training.max_spots) * 100), 100);
  const isPast = new Date(training.start_date) < new Date();
  const currentPrice = training.early_bird_price &&
    training.early_bird_deadline &&
    new Date(training.early_bird_deadline) > new Date()
      ? training.early_bird_price
      : training.price;

  return (
    <Card className={cn(
      "border-warm-200 transition-all",
      !training.is_visible && "opacity-50",
      isPast && "opacity-60"
    )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge className={cn("text-[10px] px-1.5 py-0", TYPE_COLORS[training.type] || "bg-muted")}>
                {TYPE_LABELS[training.type] || training.type}
              </Badge>
              <span className="text-xs">{LANG_FLAG[training.language]}</span>
              {statusBadge(training)}
              {!training.is_visible && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                  Verborgen
                </Badge>
              )}
              {isPast && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                  Verleden
                </Badge>
              )}
            </div>
            <p className="font-medium text-sm text-foreground leading-tight">
              {training.day_label || training.name}
            </p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(parseISO(training.start_date), "d MMMM yyyy", { locale: nl })}
              </span>
              {training.time_start && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {training.time_start}{training.time_end ? `–${training.time_end}` : ""}
                </span>
              )}
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {training.location || "Online"}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-terracotta-600">€{currentPrice}</p>
            {training.early_bird_price && training.early_bird_price !== training.price && (
              <p className="text-xs text-muted-foreground line-through">€{training.price}</p>
            )}
          </div>
        </div>

        {/* Occupancy bar */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              {training.registrations_count} / {training.max_spots} aangemeld
            </span>
            <span className={cn(
              "font-medium",
              pct >= 80 ? "text-amber-600" : "text-muted-foreground"
            )}>
              {training.spots_remaining > 0
                ? `${training.spots_remaining} ${training.spots_remaining === 1 ? "plek" : "plekken"} vrij`
                : "Vol"
              }
            </span>
          </div>
          <div className="h-2 bg-warm-100 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", occupancyColor(pct))}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-600" />
              {training.paid_count} betaald
            </span>
            {training.awaiting_payment_count > 0 && (
              <span className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3 text-amber-500" />
                {training.awaiting_payment_count} wacht op betaling
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-warm-100">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs flex-1"
            onClick={() => onEdit(training)}
          >
            <Edit2 className="h-3 w-3" /> Bewerken
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "gap-1.5 text-xs",
              training.is_full ? "text-green-600 hover:text-green-700" : "text-red-600 hover:text-red-700"
            )}
            onClick={() => onToggleFull(training)}
          >
            {training.is_full ? "Heropenen" : "Vol zetten"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1 text-xs text-muted-foreground"
            onClick={() => onToggleVisible(training)}
          >
            {training.is_visible
              ? <Eye className="h-3.5 w-3.5" />
              : <EyeOff className="h-3.5 w-3.5" />
            }
          </Button>
        </div>

        {/* Notes */}
        {training.notes && (
          <p className="text-xs text-muted-foreground mt-2 italic">{training.notes}</p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Edit / Create modal ──────────────────────────────────────────────────────

const EMPTY_FORM = {
  name: "", short_name: "", type: "msc_8week", language: "nl",
  day_label: "", start_date: "", time_start: "19:00", time_end: "21:00",
  follow_up_dates: "", location: "Online", price: 550,
  early_bird_price: "", early_bird_deadline: "",
  max_spots: 10, is_full: false, is_featured: false, is_visible: true, notes: "",
};

function EditModal({
  training,
  onClose,
  onSaved,
}: {
  training: TrainingWithCount | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isNew = !training;
  const [form, setForm] = useState<typeof EMPTY_FORM>(() => {
    if (!training) return EMPTY_FORM;
    return {
      name:                training.name,
      short_name:          training.short_name || "",
      type:                training.type,
      language:            training.language,
      day_label:           training.day_label || "",
      start_date:          training.start_date,
      time_start:          training.time_start || "19:00",
      time_end:            training.time_end || "21:00",
      follow_up_dates:     training.follow_up_dates || "",
      location:            training.location || "Online",
      price:               training.price,
      early_bird_price:    training.early_bird_price?.toString() || "",
      early_bird_deadline: training.early_bird_deadline || "",
      max_spots:           training.max_spots,
      is_full:             training.is_full,
      is_featured:         training.is_featured,
      is_visible:          training.is_visible,
      notes:               training.notes || "",
    };
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.start_date) {
      toast.error("Vul naam en startdatum in"); return;
    }
    setSaving(true);
    try {
      const payload = {
        name:                form.name.trim(),
        short_name:          form.short_name.trim() || null,
        type:                form.type,
        language:            form.language,
        day_label:           form.day_label.trim() || null,
        start_date:          form.start_date,
        time_start:          form.time_start || null,
        time_end:            form.time_end || null,
        follow_up_dates:     form.follow_up_dates.trim() || null,
        location:            form.location.trim() || "Online",
        price:               Number(form.price),
        early_bird_price:    form.early_bird_price ? Number(form.early_bird_price) : null,
        early_bird_deadline: form.early_bird_deadline || null,
        max_spots:           Number(form.max_spots),
        is_full:             form.is_full,
        is_featured:         form.is_featured,
        is_visible:          form.is_visible,
        notes:               form.notes.trim() || null,
        updated_at:          new Date().toISOString(),
      };

      if (isNew) {
        const { error } = await supabase.from("training_dates").insert(payload);
        if (error) throw error;
        toast.success("Training datum aangemaakt!");
      } else {
        const { error } = await supabase.from("training_dates").update(payload).eq("id", training!.id);
        if (error) throw error;
        toast.success("Opgeslagen!");
      }
      onSaved();
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSaving(false);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "Nieuwe training datum" : "Bewerken"}</DialogTitle>
          <DialogDescription>
            {isNew ? "Voeg een nieuwe datum toe aan de agenda." : `${training!.name} — ${format(parseISO(training!.start_date), "d MMM yyyy", { locale: nl })}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Type *</Label>
              <Select value={form.type} onValueChange={v => set("type", v)}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="msc_8week">8-weekse MSC</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="retreat">Retreat</SelectItem>
                  <SelectItem value="individueel">Individueel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Taal *</Label>
              <Select value={form.language} onValueChange={v => set("language", v)}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nl">🇳🇱 Nederlands</SelectItem>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Naam *</Label>
            <Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="8-weekse MSC Training (Nederlands)" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Dag label</Label>
              <Input value={form.day_label} onChange={e => set("day_label", e.target.value)} placeholder="Dinsdag (avond)" />
            </div>
            <div>
              <Label>Startdatum *</Label>
              <Input type="date" value={form.start_date} onChange={e => set("start_date", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Begintijd</Label>
              <Input value={form.time_start} onChange={e => set("time_start", e.target.value)} placeholder="19:00" />
            </div>
            <div>
              <Label>Eindtijd</Label>
              <Input value={form.time_end} onChange={e => set("time_end", e.target.value)} placeholder="21:00" />
            </div>
          </div>

          <div>
            <Label>Vervolgdata</Label>
            <Input value={form.follow_up_dates} onChange={e => set("follow_up_dates", e.target.value)} placeholder="14, 21 apr · 12, 19 mei" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Locatie</Label>
              <Input value={form.location} onChange={e => set("location", e.target.value)} placeholder="Online" />
            </div>
            <div>
              <Label>Max plekken</Label>
              <Input type="number" value={form.max_spots} onChange={e => set("max_spots", e.target.value)} min={1} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Prijs (€) *</Label>
              <Input type="number" value={form.price} onChange={e => set("price", e.target.value)} min={0} />
            </div>
            <div>
              <Label>Early bird (€)</Label>
              <Input type="number" value={form.early_bird_price} onChange={e => set("early_bird_price", e.target.value)} placeholder="495" min={0} />
            </div>
            <div>
              <Label>Early bird t/m</Label>
              <Input type="date" value={form.early_bird_deadline} onChange={e => set("early_bird_deadline", e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Notities (intern)</Label>
            <Input value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Bijv. laatste plek beschikbaar" />
          </div>

          <div className="flex items-center gap-6 pt-1">
            <div className="flex items-center gap-2">
              <Switch checked={form.is_visible} onCheckedChange={v => set("is_visible", v)} id="vis" />
              <Label htmlFor="vis" className="text-sm font-normal cursor-pointer">Zichtbaar op website</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_featured} onCheckedChange={v => set("is_featured", v)} id="feat" />
              <Label htmlFor="feat" className="text-sm font-normal cursor-pointer">Featured</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_full} onCheckedChange={v => set("is_full", v)} id="full" />
              <Label htmlFor="full" className="text-sm font-normal cursor-pointer">Vol</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuleren</Button>
          <Button onClick={handleSave} disabled={saving} className="gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {isNew ? "Aanmaken" : "Opslaan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AgendaSection() {
  const [trainings, setTrainings] = useState<TrainingWithCount[]>([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState<"upcoming" | "past" | "all">("upcoming");
  const [typeFilter, setTypeFilter] = useState<"all" | "msc_8week" | "individueel" | "workshop" | "retreat">("all");
  const [editing, setEditing]     = useState<TrainingWithCount | null | "new">(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    // Try the view first, fall back to plain table
    const { data: viewData, error: viewError } = await supabase
      .from("training_dates_with_counts")
      .select("*")
      .order("start_date", { ascending: true });

    if (!viewError && viewData) {
      setTrainings(viewData as TrainingWithCount[]);
    } else {
      // Fallback: plain table + manual count from registrations
      const { data: tdData } = await supabase
        .from("training_dates")
        .select("*")
        .order("start_date", { ascending: true });

      const { data: regData } = await supabase
        .from("registrations")
        .select("training_name, training_date, status, payment_status");

      const enriched = (tdData || []).map((t: any) => {
        const regs = (regData || []).filter((r: any) =>
          r.training_name?.toLowerCase().includes(t.name.split("(")[0].trim().toLowerCase()) &&
          r.status !== "cancelled"
        );
        const paid = regs.filter((r: any) => r.payment_status === "paid").length;
        const awaiting = regs.filter((r: any) => r.payment_status === "awaiting_payment").length;
        return {
          ...t,
          registrations_count: regs.length,
          paid_count: paid,
          awaiting_payment_count: awaiting,
          spots_remaining: t.max_spots - regs.length,
        };
      });
      setTrainings(enriched as TrainingWithCount[]);
    }
    setLoading(false);
  };

  const toggleVisible = async (t: TrainingWithCount) => {
    await supabase.from("training_dates").update({ is_visible: !t.is_visible }).eq("id", t.id);
    setTrainings(prev => prev.map(x => x.id === t.id ? { ...x, is_visible: !x.is_visible } : x));
    toast.success(t.is_visible ? "Verborgen op website" : "Zichtbaar op website");
  };

  const toggleFull = async (t: TrainingWithCount) => {
    await supabase.from("training_dates").update({ is_full: !t.is_full }).eq("id", t.id);
    setTrainings(prev => prev.map(x => x.id === t.id ? { ...x, is_full: !x.is_full } : x));
    toast.success(t.is_full ? "Training heropend" : "Training als vol gemarkeerd");
  };

  const now = new Date();
  const filtered = trainings.filter(t => {
    const d = new Date(t.start_date);
    if (filter === "upcoming" && d < now) return false;
    if (filter === "past" && d >= now) return false;
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    return true;
  });

  // Stats
  const upcoming   = trainings.filter(t => new Date(t.start_date) >= now);
  const totalSpots = upcoming.reduce((s, t) => s + t.registrations_count, 0);
  const totalPaid  = upcoming.reduce((s, t) => s + t.paid_count, 0);
  const totalAwaiting = upcoming.reduce((s, t) => s + t.awaiting_payment_count, 0);

  return (
    <div className="space-y-6">

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <p className="text-2xl font-semibold">{upcoming.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Komende trainingen</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <p className="text-2xl font-semibold">{totalSpots}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Totaal aangemeld</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-green-700">{totalPaid}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Betaald</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-amber-600">{totalAwaiting}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Wacht op betaling</p>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {(["upcoming", "all", "past"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                filter === f
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "upcoming" ? "Komend" : f === "past" ? "Verleden" : "Alles"}
            </button>
          ))}
        </div>

        <Button
          size="sm"
          className="ml-auto gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white"
          onClick={() => setEditing("new")}
        >
          <Plus className="h-4 w-4" /> Datum toevoegen
        </Button>
      </div>

      {/* Training cards */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-terracotta-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-sm text-muted-foreground">
          {filter === "upcoming" ? "Geen komende trainingen" : "Geen trainingen gevonden"}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map(t => (
            <TrainingCard
              key={t.id}
              training={t}
              onEdit={setEditing}
              onToggleVisible={toggleVisible}
              onToggleFull={toggleFull}
            />
          ))}
        </div>
      )}

      {/* Edit / create modal */}
      {editing !== null && (
        <EditModal
          training={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
    </div>
  );
}
