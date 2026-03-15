import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Plus, Pencil, Trash2, Search, Clock, Filter,
  ChevronRight, BookOpen, Library, Layers, Users, User
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Constants ─────────────────────────────────────────────────────────────

const MSC_ITEM_TYPES: Record<string, string> = {
  topic: "Onderwerp", exercise: "Oefening", meditation: "Meditatie",
  informal_practice: "Informele praktijk", reflection: "Reflectie",
  homework: "Huiswerk", break: "Pauze", closing: "Afsluiting",
};

const MSC_TYPE_COLORS: Record<string, string> = {
  topic: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  exercise: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  meditation: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  informal_practice: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  reflection: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  homework: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  break: "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300",
  closing: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
};

const AVAILABLE_FOR_OPTIONS = [
  { value: "both", label: "Beide", icon: Users, color: "bg-primary/10 text-primary" },
  { value: "group", label: "Groep", icon: Users, color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" },
  { value: "individual", label: "Individueel", icon: User, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
];

// ── Types ─────────────────────────────────────────────────────────────────

interface MscSession {
  id: string;
  week_number: number;
  title: string;
  description: string | null;
  default_duration_minutes: number;
}

interface MscItem {
  id: string;
  session_id: string;
  title: string;
  type: string;
  duration_minutes: number;
  is_optional: boolean;
  is_system: boolean;
  sort_order: number;
  instructions_markdown: string | null;
  notes_for_therapist: string | null;
  tags: string[] | null;
  available_for: string;
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function AdminCMS() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Data
  const [sessions, setSessions] = useState<MscSession[]>([]);
  const [items, setItems] = useState<MscItem[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [openSessions, setOpenSessions] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MscItem | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterAvailable, setFilterAvailable] = useState("all");

  // Form
  const [form, setForm] = useState({
    title: "", type: "exercise", duration_minutes: 5,
    instructions_markdown: "", notes_for_therapist: "",
    is_optional: false, is_system: true, available_for: "both",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) loadData();
      else setLoading(false);
    });
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [sessRes, itemsRes] = await Promise.all([
      supabase.from("msc_sessions").select("*").order("week_number", { ascending: true }),
      supabase.from("msc_items").select("*").order("sort_order", { ascending: true }),
    ]);
    const loadedSessions = (sessRes.data as MscSession[]) || [];
    const loadedItems = (itemsRes.data as MscItem[]) || [];
    setSessions(loadedSessions);
    setItems(loadedItems);
    if (loadedSessions.length > 0) {
      setOpenSessions(new Set(loadedSessions.map(s => s.id)));
    }
    setLoading(false);
  };

  const toggleSession = (id: string) =>
    setOpenSessions(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  const getSessionItems = (sessionId: string) =>
    items.filter(i => i.session_id === sessionId).sort((a, b) => a.sort_order - b.sort_order);

  // ── CRUD ────────────────────────────────────────────────────────────

  const openCreate = (sessionId: string) => {
    setEditingItem(null);
    setSelectedSessionId(sessionId);
    setForm({ title: "", type: "exercise", duration_minutes: 5, instructions_markdown: "", notes_for_therapist: "", is_optional: false, is_system: true, available_for: "both" });
    setDialogOpen(true);
  };

  const openEdit = (item: MscItem) => {
    setEditingItem(item);
    setSelectedSessionId(item.session_id);
    setForm({
      title: item.title, type: item.type, duration_minutes: item.duration_minutes,
      instructions_markdown: item.instructions_markdown || "", notes_for_therapist: item.notes_for_therapist || "",
      is_optional: item.is_optional, is_system: item.is_system, available_for: item.available_for || "both",
    });
    setDialogOpen(true);
  };

  const saveItem = async () => {
    if (!form.title.trim() || !selectedSessionId) return;
    if (editingItem) {
      const { error } = await supabase.from("msc_items").update({
        title: form.title, type: form.type, duration_minutes: form.duration_minutes,
        instructions_markdown: form.instructions_markdown || null,
        notes_for_therapist: form.notes_for_therapist || null,
        is_optional: form.is_optional, is_system: form.is_system,
        available_for: form.available_for,
      }).eq("id", editingItem.id);
      if (error) { toast({ title: "Fout", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Item bijgewerkt" });
    } else {
      const sessionItems = getSessionItems(selectedSessionId);
      const maxSort = sessionItems.length > 0 ? Math.max(...sessionItems.map(i => i.sort_order)) + 1 : 0;
      const { error } = await supabase.from("msc_items").insert({
        session_id: selectedSessionId, title: form.title, type: form.type,
        duration_minutes: form.duration_minutes,
        instructions_markdown: form.instructions_markdown || null,
        notes_for_therapist: form.notes_for_therapist || null,
        is_optional: form.is_optional, is_system: form.is_system,
        available_for: form.available_for, sort_order: maxSort,
      });
      if (error) { toast({ title: "Fout", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Item toegevoegd" });
    }
    setDialogOpen(false);
    await loadData();
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase.from("msc_items").delete().eq("id", id);
    if (error) { toast({ title: "Fout", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Item verwijderd" });
    await loadData();
  };

  // ── Filtering ───────────────────────────────────────────────────────

  const filteredItems = items
    .filter(i => filterType === "all" || i.type === filterType)
    .filter(i => filterAvailable === "all" || i.available_for === filterAvailable || i.available_for === "both")
    .filter(i => i.title.toLowerCase().includes(search.toLowerCase()));

  const filteredItemsBySession = (sessionId: string) =>
    filteredItems.filter(i => i.session_id === sessionId).sort((a, b) => a.sort_order - b.sort_order);

  // ── Stats ───────────────────────────────────────────────────────────

  const totalItems = items.length;
  const groupItems = items.filter(i => i.available_for === "group" || i.available_for === "both").length;
  const individualItems = items.filter(i => i.available_for === "individual" || i.available_for === "both").length;
  const totalDuration = items.reduce((sum, i) => sum + i.duration_minutes, 0);

  // ── Render ──────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const availableForBadge = (value: string) => {
    const opt = AVAILABLE_FOR_OPTIONS.find(o => o.value === value);
    if (!opt) return null;
    return <Badge variant="secondary" className={cn("text-[10px]", opt.color)}>{opt.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <SEO title="Content Library | Admin" description="Centrale contentbibliotheek" />
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-light text-foreground">Content Library</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Centrale bibliotheek — voeg content één keer toe, gebruik het overal
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/msc-builder")} className="gap-2">
              <Layers className="h-4 w-4" /> Session Planner
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card><CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Totaal</p>
              <p className="text-2xl font-semibold text-foreground mt-1">{totalItems}</p>
              <p className="text-xs text-muted-foreground">{totalDuration} min</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Sessies</p>
              <p className="text-2xl font-semibold text-foreground mt-1">{sessions.length}</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Users className="h-3 w-3" /> Groep</p>
              <p className="text-2xl font-semibold text-foreground mt-1">{groupItems}</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1"><User className="h-3 w-3" /> Individueel</p>
              <p className="text-2xl font-semibold text-foreground mt-1">{individualItems}</p>
            </CardContent></Card>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Zoek op titel..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px]"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle types</SelectItem>
                {Object.entries(MSC_ITEM_TYPES).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterAvailable} onValueChange={setFilterAvailable}>
              <SelectTrigger className="w-[160px]"><Users className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle programma's</SelectItem>
                {AVAILABLE_FOR_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Sessions with items */}
          <div className="space-y-2">
            {sessions.map(session => {
              const sessionItems = filteredItemsBySession(session.id);
              const allSessionItems = getSessionItems(session.id);
              const isOpen = openSessions.has(session.id);
              const sessionDuration = allSessionItems.reduce((sum, i) => sum + i.duration_minutes, 0);

              return (
                <Collapsible key={session.id} open={isOpen} onOpenChange={() => toggleSession(session.id)}>
                  <CollapsibleTrigger className="w-full">
                    <Card className={cn("transition-all hover:bg-muted/50", isOpen && "ring-1 ring-primary/20 bg-primary/5")}>
                      <CardContent className="p-3 flex items-center gap-3">
                        <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0", isOpen && "rotate-90")} />
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Week {session.week_number}</span>
                            <span className="text-xs text-muted-foreground truncate">{session.title}</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                          <Clock className="h-3 w-3" /> {sessionDuration} min
                        </span>
                        <Badge variant="secondary" className="text-xs">{allSessionItems.length} items</Badge>
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="ml-4 mt-1 space-y-1 mb-2">
                      {sessionItems.map(item => (
                        <Card key={item.id} className="transition-all">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={cn("text-sm", item.is_optional && "text-muted-foreground")}>{item.title}</span>
                                <Badge variant="secondary" className={cn("text-[10px]", MSC_TYPE_COLORS[item.type])}>
                                  {MSC_ITEM_TYPES[item.type] || item.type}
                                </Badge>
                                {availableForBadge(item.available_for)}
                                {item.is_optional && <Badge variant="outline" className="text-[10px]">Optioneel</Badge>}
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground flex items-center gap-0.5 shrink-0">
                              <Clock className="h-3 w-3" /> {item.duration_minutes} min
                            </span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => { e.stopPropagation(); openEdit(item); }}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => { e.stopPropagation(); deleteItem(item.id); }}>
                              <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}

                      <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-foreground gap-2 mt-1" onClick={() => openCreate(session.id)}>
                        <Plus className="h-3.5 w-3.5" /> Item toevoegen aan Week {session.week_number}
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

            {sessions.length === 0 && (
              <Card><CardContent className="py-12 text-center text-muted-foreground">Nog geen sessies gevonden.</CardContent></Card>
            )}
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
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Bijv. Affectionate Breathing" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(MSC_ITEM_TYPES).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duur (min)</Label>
                <Input type="number" min={1} value={form.duration_minutes} onChange={e => setForm(f => ({ ...f, duration_minutes: parseInt(e.target.value) || 1 }))} />
              </div>
              <div>
                <Label>Beschikbaar voor</Label>
                <Select value={form.available_for} onValueChange={v => setForm(f => ({ ...f, available_for: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_FOR_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Instructies (markdown)</Label>
              <Textarea rows={4} value={form.instructions_markdown} onChange={e => setForm(f => ({ ...f, instructions_markdown: e.target.value }))} placeholder="Gedetailleerde instructies..." />
            </div>
            <div>
              <Label>Notities voor therapeut</Label>
              <Textarea rows={2} value={form.notes_for_therapist} onChange={e => setForm(f => ({ ...f, notes_for_therapist: e.target.value }))} placeholder="Interne notities..." />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.is_optional} onCheckedChange={c => setForm(f => ({ ...f, is_optional: c }))} id="optional" />
                <Label htmlFor="optional">Optioneel</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_system} onCheckedChange={c => setForm(f => ({ ...f, is_system: c }))} id="system" />
                <Label htmlFor="system">Standaard curriculum</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuleren</Button>
              <Button onClick={saveItem} disabled={!form.title.trim()}>{editingItem ? "Opslaan" : "Toevoegen"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
