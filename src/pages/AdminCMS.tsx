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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Plus, Pencil, Trash2, Search, Clock, Filter,
  ChevronRight, FileText, Video, Image, Music, BookOpen,
  Eye, EyeOff, GripVertical, Upload
} from "lucide-react";
import { cn } from "@/lib/utils";

const CONTENT_TYPES = [
  { value: "text", label: "Tekst", icon: FileText },
  { value: "video", label: "Video", icon: Video },
  { value: "audio", label: "Audio", icon: Music },
  { value: "pdf", label: "PDF", icon: FileText },
  { value: "assignment", label: "Opdracht", icon: BookOpen },
  { value: "image", label: "Afbeelding", icon: Image },
];

const TRAINING_TYPES = [
  { value: "msc_8week", label: "8-Weekse Groepstraining" },
  { value: "individueel_6", label: "Individueel Traject (6 sessies)" },
];

const TYPE_ICON_MAP: Record<string, typeof FileText> = {
  text: FileText,
  video: Video,
  audio: Music,
  pdf: FileText,
  assignment: BookOpen,
  image: Image,
};

const TYPE_COLOR_MAP: Record<string, string> = {
  text: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  video: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  audio: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  pdf: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  assignment: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  image: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
};

interface ContentItem {
  id: string;
  training_type: string;
  unit_number: number;
  order_index: number;
  title: string;
  description: string | null;
  content_type: string;
  text_content: string | null;
  file_url: string | null;
  is_visible: boolean;
  is_system: boolean;
  release_date: string | null;
  created_at: string;
}

const emptyForm = {
  title: "",
  description: "",
  content_type: "text",
  text_content: "",
  file_url: "",
  unit_number: 1,
  is_visible: true,
  is_system: false,
};

export default function AdminCMS() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTraining, setActiveTraining] = useState("msc_8week");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [openUnits, setOpenUnits] = useState<Set<number>>(new Set());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) loadItems();
      else setLoading(false);
    });
  }, [activeTraining]);

  const loadItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("training_content_items")
      .select("*")
      .eq("training_type", activeTraining)
      .order("unit_number", { ascending: true })
      .order("order_index", { ascending: true });
    if (error) {
      toast({ title: "Fout bij laden", description: error.message, variant: "destructive" });
    }
    setItems((data as ContentItem[]) || []);
    // Auto-open units that have content
    if (data && data.length > 0) {
      const units = new Set(data.map((i: ContentItem) => i.unit_number));
      setOpenUnits(units);
    }
    setLoading(false);
  };

  const maxUnit = activeTraining === "msc_8week" ? 8 : 6;

  const toggleUnit = (n: number) => {
    setOpenUnits(prev => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  const openCreate = (unitNumber?: number) => {
    setEditingItem(null);
    setForm({ ...emptyForm, unit_number: unitNumber || 1 });
    setDialogOpen(true);
  };

  const openEdit = (item: ContentItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description || "",
      content_type: item.content_type,
      text_content: item.text_content || "",
      file_url: item.file_url || "",
      unit_number: item.unit_number,
      is_visible: item.is_visible,
      is_system: item.is_system,
    });
    setDialogOpen(true);
  };

  const saveItem = async () => {
    if (!form.title.trim()) return;

    if (editingItem) {
      const { error } = await supabase
        .from("training_content_items")
        .update({
          title: form.title,
          description: form.description || null,
          content_type: form.content_type,
          text_content: form.text_content || null,
          file_url: form.file_url || null,
          unit_number: form.unit_number,
          is_visible: form.is_visible,
          is_system: form.is_system,
        })
        .eq("id", editingItem.id);
      if (error) {
        toast({ title: "Fout", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Item bijgewerkt" });
    } else {
      const unitItems = items.filter(i => i.unit_number === form.unit_number);
      const maxOrder = unitItems.length > 0 ? Math.max(...unitItems.map(i => i.order_index)) + 1 : 0;
      const { error } = await supabase.from("training_content_items").insert({
        training_type: activeTraining,
        title: form.title,
        description: form.description || null,
        content_type: form.content_type,
        text_content: form.text_content || null,
        file_url: form.file_url || null,
        unit_number: form.unit_number,
        order_index: maxOrder,
        is_visible: form.is_visible,
        is_system: form.is_system,
      });
      if (error) {
        toast({ title: "Fout", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Item toegevoegd" });
    }
    setDialogOpen(false);
    await loadItems();
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase.from("training_content_items").delete().eq("id", id);
    if (error) {
      toast({ title: "Fout", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Item verwijderd" });
    await loadItems();
  };

  const toggleVisibility = async (item: ContentItem) => {
    const { error } = await supabase
      .from("training_content_items")
      .update({ is_visible: !item.is_visible })
      .eq("id", item.id);
    if (!error) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_visible: !i.is_visible } : i));
    }
  };

  const filteredItems = items
    .filter(i => filterType === "all" || i.content_type === filterType)
    .filter(i => i.title.toLowerCase().includes(search.toLowerCase()));

  // Group by unit
  const itemsByUnit = new Map<number, ContentItem[]>();
  filteredItems.forEach(item => {
    const list = itemsByUnit.get(item.unit_number) || [];
    list.push(item);
    itemsByUnit.set(item.unit_number, list);
  });

  const unitLabel = activeTraining === "msc_8week" ? "Week" : "Sessie";
  const totalItems = items.length;
  const visibleItems = items.filter(i => i.is_visible).length;
  const systemItems = items.filter(i => i.is_system).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <SEO title="Content Library | Admin" description="Beheer cursuscontent" />
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
                Beheer cursusmateriaal voor alle programma's
              </p>
            </div>
          </div>

          {/* Training type tabs */}
          <Tabs value={activeTraining} onValueChange={setActiveTraining} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              {TRAINING_TYPES.map(t => (
                <TabsTrigger key={t.value} value={t.value} className="text-sm">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Totaal</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{totalItems}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Zichtbaar</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{visibleItems}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Standaard</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{systemItems}</p>
              </CardContent>
            </Card>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op titel..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle types</SelectItem>
                {CONTENT_TYPES.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => openCreate()} className="gap-2">
              <Plus className="h-4 w-4" /> Nieuw item
            </Button>
          </div>

          {/* Content grouped by unit */}
          <div className="space-y-2">
            {Array.from({ length: maxUnit }, (_, i) => i + 1).map(unitNum => {
              const unitItems = itemsByUnit.get(unitNum) || [];
              const isOpen = openUnits.has(unitNum);
              const hasContent = unitItems.length > 0;

              return (
                <Collapsible key={unitNum} open={isOpen} onOpenChange={() => toggleUnit(unitNum)}>
                  <CollapsibleTrigger className="w-full">
                    <Card className={cn(
                      "transition-all hover:bg-muted/50",
                      isOpen && "ring-1 ring-primary/20 bg-primary/5"
                    )}>
                      <CardContent className="p-3 flex items-center gap-3">
                        <ChevronRight className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform shrink-0",
                          isOpen && "rotate-90"
                        )} />
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{unitLabel} {unitNum}</span>
                            {!hasContent && (
                              <span className="text-xs text-muted-foreground">– Nog geen content</span>
                            )}
                          </div>
                        </div>
                        {hasContent && (
                          <Badge variant="secondary" className="text-xs">
                            {unitItems.length} item{unitItems.length !== 1 ? "s" : ""}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="ml-4 mt-1 space-y-1 mb-2">
                      {unitItems.map(item => {
                        const IconComp = TYPE_ICON_MAP[item.content_type] || FileText;
                        return (
                          <Card key={item.id} className={cn(
                            "transition-all",
                            !item.is_visible && "opacity-60"
                          )}>
                            <CardContent className="p-3 flex items-center gap-3">
                              <div className={cn(
                                "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                                TYPE_COLOR_MAP[item.content_type] || "bg-muted"
                              )}>
                                <IconComp className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-medium truncate">{item.title}</span>
                                  <Badge variant="secondary" className={cn(
                                    "text-[10px]",
                                    TYPE_COLOR_MAP[item.content_type]
                                  )}>
                                    {CONTENT_TYPES.find(t => t.value === item.content_type)?.label || item.content_type}
                                  </Badge>
                                  {item.is_system && (
                                    <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                                      Standaard
                                    </Badge>
                                  )}
                                </div>
                                {item.description && (
                                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.description}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={(e) => { e.stopPropagation(); toggleVisibility(item); }}
                                  title={item.is_visible ? "Verbergen" : "Tonen"}
                                >
                                  {item.is_visible ? <Eye className="h-3.5 w-3.5 text-green-600" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={(e) => { e.stopPropagation(); openEdit(item); }}
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                                >
                                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}

                      {/* Add button per unit */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-muted-foreground hover:text-foreground gap-2 mt-1"
                        onClick={() => openCreate(unitNum)}
                      >
                        <Plus className="h-3.5 w-3.5" /> Item toevoegen aan {unitLabel} {unitNum}
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Item bewerken" : "Nieuw item toevoegen"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Titel *</Label>
              <Input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Bijv. Introductie meditatie"
              />
            </div>
            <div>
              <Label>Beschrijving</Label>
              <Textarea
                rows={2}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Korte beschrijving..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select value={form.content_type} onValueChange={v => setForm(f => ({ ...f, content_type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map(t => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{unitLabel}</Label>
                <Select value={String(form.unit_number)} onValueChange={v => setForm(f => ({ ...f, unit_number: parseInt(v) }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: maxUnit }, (_, i) => i + 1).map(n => (
                      <SelectItem key={n} value={String(n)}>{unitLabel} {n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(form.content_type === "text" || form.content_type === "assignment") && (
              <div>
                <Label>Inhoud</Label>
                <Textarea
                  rows={6}
                  value={form.text_content}
                  onChange={e => setForm(f => ({ ...f, text_content: e.target.value }))}
                  placeholder="Tekst of instructies..."
                />
              </div>
            )}

            {["video", "audio", "pdf", "image"].includes(form.content_type) && (
              <div>
                <Label>Bestand URL</Label>
                <Input
                  value={form.file_url}
                  onChange={e => setForm(f => ({ ...f, file_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            )}

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.is_visible}
                  onCheckedChange={c => setForm(f => ({ ...f, is_visible: c }))}
                  id="visible"
                />
                <Label htmlFor="visible">Zichtbaar voor deelnemers</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.is_system}
                  onCheckedChange={c => setForm(f => ({ ...f, is_system: c }))}
                  id="system"
                />
                <Label htmlFor="system">Standaard content</Label>
              </div>
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
