import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, GripVertical, ArrowLeft, Search, Clock, Filter } from "lucide-react";
import TagsInput from "@/components/admin/TagsInput";

const ITEM_TYPES = [
  { value: "meditation", label: "Meditatie" },
  { value: "exercise", label: "Oefening" },
  { value: "topic", label: "Onderwerp" },
  { value: "informal_practice", label: "Informele praktijk" },
  { value: "reflection", label: "Reflectie" },
  { value: "homework", label: "Huiswerk" },
  { value: "break", label: "Pauze" },
  { value: "closing", label: "Afsluiting" },
];

const TYPE_COLORS: Record<string, string> = {
  meditation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  exercise: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  topic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  informal_practice: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  reflection: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  homework: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  break: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  closing: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
};

interface MscItem {
  id: string;
  session_id: string;
  title: string;
  type: string;
  duration_minutes: number;
  instructions_markdown: string;
  notes_for_therapist: string;
  tags: string[];
  is_optional: boolean;
  sort_order: number;
}

const emptyItem = {
  title: "",
  type: "exercise",
  duration_minutes: 5,
  instructions_markdown: "",
  notes_for_therapist: "",
  tags: [] as string[],
  is_optional: false,
};

export default function MscMaterialsLibrary() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [items, setItems] = useState<MscItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MscItem | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  useEffect(() => {
    // Wait for auth session to be restored before querying RLS-protected tables
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        loadSession();
      } else {
        setLoading(false);
      }
    });
  }, []);

  const loadSession = async () => {
    setLoading(true);
    const { data: session } = await supabase
      .from("msc_sessions")
      .select("id")
      .eq("week_number", 1)
      .single();

    if (session) {
      setSessionId(session.id);
      await loadItems(session.id);
    }
    setLoading(false);
  };

  const loadItems = async (sid: string) => {
    const { data } = await supabase
      .from("msc_items")
      .select("*")
      .eq("session_id", sid)
      .order("sort_order", { ascending: true });
    setItems((data as MscItem[]) || []);
  };

  const openCreate = () => {
    setEditingItem(null);
    setForm(emptyItem);
    setDialogOpen(true);
  };

  const openEdit = (item: MscItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      type: item.type,
      duration_minutes: item.duration_minutes,
      instructions_markdown: item.instructions_markdown || "",
      notes_for_therapist: item.notes_for_therapist || "",
      tags: item.tags || [],
      is_optional: item.is_optional,
    });
    setDialogOpen(true);
  };

  const saveItem = async () => {
    if (!sessionId || !form.title.trim()) return;

    if (editingItem) {
      const { error } = await supabase
        .from("msc_items")
        .update({
          title: form.title,
          type: form.type,
          duration_minutes: form.duration_minutes,
          instructions_markdown: form.instructions_markdown,
          notes_for_therapist: form.notes_for_therapist,
          tags: form.tags,
          is_optional: form.is_optional,
        })
        .eq("id", editingItem.id);
      if (error) {
        toast({ title: "Fout", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Item bijgewerkt" });
    } else {
      const maxSort = items.length > 0 ? Math.max(...items.map((i) => i.sort_order)) + 1 : 0;
      const { error } = await supabase.from("msc_items").insert({
        session_id: sessionId,
        title: form.title,
        type: form.type,
        duration_minutes: form.duration_minutes,
        instructions_markdown: form.instructions_markdown,
        notes_for_therapist: form.notes_for_therapist,
        tags: form.tags,
        is_optional: form.is_optional,
        sort_order: maxSort,
      });
      if (error) {
        toast({ title: "Fout", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Item toegevoegd" });
    }

    setDialogOpen(false);
    await loadItems(sessionId);
  };

  const deleteItem = async (id: string) => {
    if (!sessionId) return;
    const { error } = await supabase.from("msc_items").delete().eq("id", id);
    if (error) {
      toast({ title: "Fout", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Item verwijderd" });
    await loadItems(sessionId);
  };

  const handleDragStart = (idx: number) => setDragIdx(idx);

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const reordered = [...filteredItems];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(idx, 0, moved);
    // Update sort_order in DB
    const updates = reordered.map((item, i) => ({ id: item.id, sort_order: i }));
    setDragIdx(idx);
    // Optimistic update
    setItems((prev) => {
      const map = new Map(updates.map((u) => [u.id, u.sort_order]));
      return prev.map((it) => (map.has(it.id) ? { ...it, sort_order: map.get(it.id)! } : it)).sort((a, b) => a.sort_order - b.sort_order);
    });
  };

  const handleDragEnd = async () => {
    setDragIdx(null);
    if (!sessionId) return;
    // Persist all sort orders
    for (const item of items) {
      await supabase.from("msc_items").update({ sort_order: item.sort_order }).eq("id", item.id);
    }
  };

  const filteredItems = items
    .filter((i) => (filterType === "all" ? true : i.type === filterType))
    .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));

  const totalDuration = items.reduce((sum, i) => sum + i.duration_minutes, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <SEO title="MSC Materials Library | Admin" description="Beheer MSC sessie materialen" />
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-light text-foreground">MSC Session 1 – Discovering Mindfulness and Self-Compassion</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {items.length} items · {totalDuration} minuten totaal
              </p>
            </div>
            <Button onClick={() => navigate("/admin/msc-builder")} variant="outline" className="gap-2">
              Session Builder
            </Button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Zoek op titel of tag..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle types</SelectItem>
                {ITEM_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="h-4 w-4" /> Nieuw item
            </Button>
          </div>

          {/* Items list */}
          <div className="space-y-2">
            {filteredItems.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  {items.length === 0 ? "Nog geen items. Voeg je eerste oefening of onderwerp toe." : "Geen items gevonden."}
                </CardContent>
              </Card>
            )}
            {filteredItems.map((item, idx) => (
              <Card
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                className={`transition-all cursor-grab active:cursor-grabbing ${dragIdx === idx ? "opacity-50 scale-[0.98]" : ""}`}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-foreground">{item.title}</span>
                      <Badge variant="secondary" className={TYPE_COLORS[item.type] || ""}>
                        {ITEM_TYPES.find((t) => t.value === item.type)?.label || item.type}
                      </Badge>
                      {item.is_optional && <Badge variant="outline">Optioneel</Badge>}
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    {item.instructions_markdown && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{item.instructions_markdown}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                    <Clock className="h-3.5 w-3.5" />
                    {item.duration_minutes} min
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Item bewerken" : "Nieuw item"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Titel *</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Bijv. Liefdevolle vriendelijkheid meditatie" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ITEM_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duur (minuten)</Label>
                <Input type="number" min={1} value={form.duration_minutes} onChange={(e) => setForm((f) => ({ ...f, duration_minutes: parseInt(e.target.value) || 1 }))} />
              </div>
            </div>
            <div>
              <Label>Instructies (markdown)</Label>
              <Textarea rows={6} value={form.instructions_markdown} onChange={(e) => setForm((f) => ({ ...f, instructions_markdown: e.target.value }))} placeholder="Gedetailleerde instructies voor deze oefening..." />
            </div>
            <div>
              <Label>Notities voor therapeut</Label>
              <Textarea rows={3} value={form.notes_for_therapist} onChange={(e) => setForm((f) => ({ ...f, notes_for_therapist: e.target.value }))} placeholder="Interne notities, niet zichtbaar voor deelnemers..." />
            </div>
            <div>
              <Label>Tags</Label>
              <TagsInput tags={form.tags} onTagsChange={(tags) => setForm((f) => ({ ...f, tags }))} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={form.is_optional} onCheckedChange={(c) => setForm((f) => ({ ...f, is_optional: !!c }))} id="optional" />
              <Label htmlFor="optional">Optioneel item</Label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuleren</Button>
              <Button onClick={saveItem} disabled={!form.title.trim()}>
                {editingItem ? "Opslaan" : "Toevoegen"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
