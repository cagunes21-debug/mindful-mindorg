import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BookOpen, Plus, Trash2, Pencil, Save, Loader2, ChevronDown,
  FileText, Video, Headphones, Link2, ClipboardList, Eye, EyeOff,
  MessageSquare, GripVertical, Upload,
} from "lucide-react";
import { toast } from "sonner";

// Types
type TrainingType = "msc_8_week" | "individual_6_sessions";

interface ContentItem {
  id: string;
  training_type: TrainingType;
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

interface WelcomeContent {
  id?: string;
  training_type: TrainingType;
  welcome_title: string;
  welcome_message: string;
  intro_video_url: string | null;
}

const TRAINING_OPTIONS: { value: TrainingType; label: string; units: number; unitLabel: string }[] = [
  { value: "msc_8_week", label: "8 Week Mindful Self-Compassion Training", units: 8, unitLabel: "Week" },
  { value: "individual_6_sessions", label: "Individual Program – 6 Sessions", units: 6, unitLabel: "Sessie" },
];

const CONTENT_TYPES = [
  { value: "text", label: "Tekst", icon: FileText },
  { value: "video", label: "Video", icon: Video },
  { value: "audio", label: "Audio", icon: Headphones },
  { value: "pdf", label: "PDF", icon: FileText },
  { value: "link", label: "Link", icon: Link2 },
  { value: "assignment", label: "Opdracht", icon: ClipboardList },
];

const getContentIcon = (type: string) => {
  const found = CONTENT_TYPES.find(c => c.value === type);
  return found ? found.icon : FileText;
};

const CourseMaterial = () => {
  const [selectedTraining, setSelectedTraining] = useState<TrainingType>("msc_8_week");
  const [selectedUnit, setSelectedUnit] = useState<number | "all">("all");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [welcomeContent, setWelcomeContent] = useState<WelcomeContent | null>(null);
  const [savingWelcome, setSavingWelcome] = useState(false);
  const [showWelcomeEditor, setShowWelcomeEditor] = useState(false);

  // Item editor state
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState({
    title: "", description: "", content_type: "text", text_content: "",
    file_url: "", unit_number: 1, order_index: 0, is_visible: true, release_date: "",
  });
  const [savingItem, setSavingItem] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const trainingConfig = TRAINING_OPTIONS.find(t => t.value === selectedTraining)!;

  useEffect(() => {
    loadData();
  }, [selectedTraining]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [itemsRes, welcomeRes] = await Promise.all([
        supabase.from("training_content_items")
          .select("*")
          .eq("training_type", selectedTraining)
          .order("unit_number")
          .order("order_index"),
        supabase.from("training_welcome_content")
          .select("*")
          .eq("training_type", selectedTraining)
          .maybeSingle(),
      ]);
      if (itemsRes.error) console.error("Error loading content items:", itemsRes.error);
      if (welcomeRes.error) console.error("Error loading welcome content:", welcomeRes.error);
      setItems((itemsRes.data || []) as ContentItem[]);
      setWelcomeContent(welcomeRes.data as WelcomeContent | null);
    } catch (err) {
      console.error("Failed to load course data:", err);
      toast.error("Kon cursusmateriaal niet laden");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedUnit === "all"
    ? items
    : items.filter(i => i.unit_number === selectedUnit);

  // Group by unit
  const groupedItems = filteredItems.reduce<Record<number, ContentItem[]>>((acc, item) => {
    if (!acc[item.unit_number]) acc[item.unit_number] = [];
    acc[item.unit_number].push(item);
    return acc;
  }, {});

  const openNewItem = () => {
    setEditingItem(null);
    setFormData({
      title: "", description: "", content_type: "text", text_content: "",
      file_url: "", unit_number: selectedUnit === "all" ? 1 : selectedUnit,
      order_index: items.length, is_visible: true, release_date: "",
    });
    setShowEditor(true);
  };

  const openEditItem = (item: ContentItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      content_type: item.content_type,
      text_content: item.text_content || "",
      file_url: item.file_url || "",
      unit_number: item.unit_number,
      order_index: item.order_index,
      is_visible: item.is_visible,
      release_date: item.release_date ? item.release_date.split("T")[0] : "",
    });
    setShowEditor(true);
  };

  const saveItem = async () => {
    if (!formData.title.trim()) { toast.error("Titel is verplicht"); return; }
    setSavingItem(true);
    try {
      const payload = {
        training_type: selectedTraining,
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        content_type: formData.content_type,
        text_content: formData.text_content.trim() || null,
        file_url: formData.file_url.trim() || null,
        unit_number: formData.unit_number,
        order_index: formData.order_index,
        is_visible: formData.is_visible,
        release_date: formData.release_date ? new Date(formData.release_date).toISOString() : null,
      };

      if (editingItem) {
        const { error } = await supabase.from("training_content_items").update(payload).eq("id", editingItem.id);
        if (error) throw error;
        toast.success("Item bijgewerkt");
      } else {
        const { error } = await supabase.from("training_content_items").insert(payload);
        if (error) throw error;
        toast.success("Item aangemaakt");
      }
      setShowEditor(false);
      loadData();
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSavingItem(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Weet je zeker dat je dit item wilt verwijderen?")) return;
    const { error } = await supabase.from("training_content_items").delete().eq("id", id);
    if (!error) {
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success("Item verwijderd");
    } else toast.error("Kon niet verwijderen");
  };

  const toggleVisibility = async (item: ContentItem) => {
    const { error } = await supabase.from("training_content_items")
      .update({ is_visible: !item.is_visible }).eq("id", item.id);
    if (!error) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_visible: !i.is_visible } : i));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) { toast.error("Bestand is te groot (max 50MB)"); return; }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${selectedTraining}/${formData.unit_number}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("training-content")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage
        .from("training-content")
        .getPublicUrl(path);
      // Since bucket is private, we store the path and use signed URLs on participant side
      setFormData(p => ({ ...p, file_url: path }));
      toast.success(`Bestand "${file.name}" geüpload`);
    } catch (err: any) {
      toast.error("Upload mislukt: " + err.message);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Welcome content
  const saveWelcomeContent = async () => {
    if (!welcomeContent) return;
    setSavingWelcome(true);
    try {
      const payload = {
        training_type: selectedTraining,
        welcome_title: welcomeContent.welcome_title,
        welcome_message: welcomeContent.welcome_message,
        intro_video_url: welcomeContent.intro_video_url || null,
      };
      if (welcomeContent.id) {
        const { error } = await supabase.from("training_welcome_content").update(payload).eq("id", welcomeContent.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("training_welcome_content").insert(payload).select().single();
        if (error) throw error;
        setWelcomeContent({ ...welcomeContent, id: (data as any).id });
      }
      toast.success("Welkomstbericht opgeslagen");
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSavingWelcome(false);
  };

  const initWelcomeContent = () => {
    if (!welcomeContent) {
      setWelcomeContent({
        training_type: selectedTraining,
        welcome_title: "",
        welcome_message: "",
        intro_video_url: null,
      });
    }
    setShowWelcomeEditor(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Cursusmateriaal | Mindful Mind" description="Beheer cursusmateriaal per training" />
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-light text-foreground">Cursusmateriaal</h1>
              <p className="text-muted-foreground mt-1">Beheer content per training en eenheid</p>
            </div>
            <Button onClick={openNewItem} className="gap-2">
              <Plus className="h-4 w-4" /> Nieuw item
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1">
              <Label className="text-xs mb-1 block">Training</Label>
              <Select value={selectedTraining} onValueChange={(v) => { setSelectedTraining(v as TrainingType); setSelectedUnit("all"); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TRAINING_OPTIONS.map(t => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-48">
              <Label className="text-xs mb-1 block">{trainingConfig.unitLabel}</Label>
              <Select value={String(selectedUnit)} onValueChange={(v) => setSelectedUnit(v === "all" ? "all" : Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle {trainingConfig.unitLabel.toLowerCase()}s</SelectItem>
                  {Array.from({ length: trainingConfig.units }, (_, i) => i + 1).map(n => (
                    <SelectItem key={n} value={String(n)}>{trainingConfig.unitLabel} {n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Welcome Content Section */}
          <Card className="mb-6 border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" /> Welkomstbericht
                </CardTitle>
                <Button size="sm" variant="outline" onClick={initWelcomeContent} className="gap-1.5 h-7 text-xs">
                  <Pencil className="h-3 w-3" /> Bewerken
                </Button>
              </div>
            </CardHeader>
            {welcomeContent && (welcomeContent.welcome_title || welcomeContent.welcome_message) && (
              <CardContent className="pt-0">
                <div className="bg-muted/50 rounded-lg p-3 text-sm">
                  {welcomeContent.welcome_title && <p className="font-medium mb-1">{welcomeContent.welcome_title}</p>}
                  {welcomeContent.welcome_message && <p className="text-muted-foreground line-clamp-3">{welcomeContent.welcome_message}</p>}
                  {welcomeContent.intro_video_url && (
                    <p className="text-xs text-primary mt-1">🎥 Introductievideo ingesteld</p>
                  )}
                </div>
              </CardContent>
            )}
            {(!welcomeContent || (!welcomeContent.welcome_title && !welcomeContent.welcome_message)) && (
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">Nog geen welkomstbericht ingesteld.</p>
              </CardContent>
            )}
          </Card>

          {/* Content Items List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-3">
              {Array.from({ length: trainingConfig.units }, (_, i) => i + 1)
                .filter(unitNum => selectedUnit === "all" || selectedUnit === unitNum)
                .map(unitNum => {
                  const unitItems = (groupedItems[unitNum] || []).sort((a, b) => a.order_index - b.order_index);
                  const hiddenCount = unitItems.filter(i => !i.is_visible).length;
                  return (
                    <Collapsible key={unitNum} defaultOpen={unitItems.length > 0}>
                      
                      <Card>
                        <CollapsibleTrigger className="w-full text-left group">
                          <CardContent className="p-3 flex items-center gap-2">
                            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=closed]:-rotate-90" />
                            <Badge variant="outline" className="font-mono">
                              {trainingConfig.unitLabel} {unitNum}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex-1">
                              {unitItems.length === 0
                                ? "Nog geen items"
                                : `${unitItems.length} item${unitItems.length !== 1 ? "s" : ""}`}
                            </span>
                            {hiddenCount > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {hiddenCount} verborgen
                              </span>
                            )}
                          </CardContent>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="px-3 pb-3 space-y-1.5">
                            {unitItems.length === 0 ? (
                              <div className="text-center py-4">
                                <p className="text-sm text-muted-foreground mb-2">Nog geen content voor deze {trainingConfig.unitLabel.toLowerCase()}</p>
                                <Button size="sm" variant="outline" className="gap-1.5" onClick={() => {
                                  setEditingItem(null);
                                  setFormData({
                                    title: "", description: "", content_type: "text", text_content: "",
                                    file_url: "", unit_number: unitNum,
                                    order_index: 0, is_visible: true, release_date: "",
                                  });
                                  setShowEditor(true);
                                }}>
                                  <Plus className="h-3.5 w-3.5" /> Item toevoegen
                                </Button>
                              </div>
                            ) : (
                              <>
                                {unitItems.map(item => {
                                  const Icon = getContentIcon(item.content_type);
                                  return (
                                    <div
                                      key={item.id}
                                      className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-colors ${
                                        item.is_visible ? "bg-background" : "bg-muted/30 opacity-60"
                                      }`}
                                    >
                                      <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                      <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                                      <span className="flex-1 font-medium truncate">{item.title}</span>
                                      <Badge variant="secondary" className="text-[10px] shrink-0">
                                        {CONTENT_TYPES.find(c => c.value === item.content_type)?.label || item.content_type}
                                      </Badge>
                                      {item.release_date && new Date(item.release_date) > new Date() && (
                                        <Badge variant="outline" className="text-[10px] shrink-0">⏰ Gepland</Badge>
                                      )}
                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0"
                                        onClick={() => toggleVisibility(item)}
                                        title={item.is_visible ? "Verbergen" : "Zichtbaar maken"}>
                                        {item.is_visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                                      </Button>
                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0"
                                        onClick={() => openEditItem(item)}>
                                        <Pencil className="h-3 w-3" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive"
                                        onClick={() => deleteItem(item.id)}>
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  );
                                })}
                                <Button size="sm" variant="ghost" className="w-full gap-1.5 text-xs text-muted-foreground mt-1" onClick={() => {
                                  setEditingItem(null);
                                  setFormData({
                                    title: "", description: "", content_type: "text", text_content: "",
                                    file_url: "", unit_number: unitNum,
                                    order_index: unitItems.length, is_visible: true, release_date: "",
                                  });
                                  setShowEditor(true);
                                }}>
                                  <Plus className="h-3 w-3" /> Item toevoegen
                                </Button>
                              </>
                            )}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  );
                })}
            </div>
          )}
        </div>
      </main>


      {/* Item Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Item bewerken" : "Nieuw content item"}</DialogTitle>
            <DialogDescription>
              {trainingConfig.label}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">{trainingConfig.unitLabel}</Label>
                <Select value={String(formData.unit_number)} onValueChange={v => setFormData(p => ({ ...p, unit_number: Number(v) }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: trainingConfig.units }, (_, i) => i + 1).map(n => (
                      <SelectItem key={n} value={String(n)}>{trainingConfig.unitLabel} {n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Type</Label>
                <Select value={formData.content_type} onValueChange={v => setFormData(p => ({ ...p, content_type: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map(ct => (
                      <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-xs">Titel *</Label>
              <Input value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} className="mt-1" />
            </div>

            <div>
              <Label className="text-xs">Beschrijving</Label>
              <Textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} className="mt-1 min-h-[60px]" />
            </div>

            {(formData.content_type === "text" || formData.content_type === "assignment") && (
              <div>
                <Label className="text-xs">Tekstinhoud</Label>
                <Textarea value={formData.text_content} onChange={e => setFormData(p => ({ ...p, text_content: e.target.value }))} className="mt-1 min-h-[100px]" />
              </div>
            )}

            {["video", "audio", "pdf", "link"].includes(formData.content_type) && (
              <div className="space-y-2">
                <Label className="text-xs">Bestand uploaden of externe URL</Label>
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={
                      formData.content_type === "pdf" ? ".pdf" :
                      formData.content_type === "audio" ? "audio/*" :
                      formData.content_type === "video" ? "video/*" :
                      "*"
                    }
                    onChange={handleFileUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 shrink-0"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                    {uploading ? "Uploaden..." : "Upload"}
                  </Button>
                  <Input
                    value={formData.file_url}
                    onChange={e => setFormData(p => ({ ...p, file_url: e.target.value }))}
                    placeholder="Of plak een externe URL..."
                    className="flex-1"
                  />
                </div>
                {formData.file_url && !formData.file_url.startsWith("http") && (
                  <p className="text-xs text-muted-foreground">📁 Geüpload bestand: {formData.file_url.split("/").pop()}</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Volgorde</Label>
                <Input type="number" value={formData.order_index} onChange={e => setFormData(p => ({ ...p, order_index: Number(e.target.value) }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Publicatiedatum (optioneel)</Label>
                <Input type="date" value={formData.release_date} onChange={e => setFormData(p => ({ ...p, release_date: e.target.value }))} className="mt-1" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={formData.is_visible} onCheckedChange={v => setFormData(p => ({ ...p, is_visible: v }))} />
              <Label className="text-xs">Zichtbaar voor deelnemers</Label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowEditor(false)}>Annuleren</Button>
              <Button onClick={saveItem} disabled={savingItem} className="gap-2">
                {savingItem ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Opslaan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Welcome Editor Dialog */}
      <Dialog open={showWelcomeEditor} onOpenChange={setShowWelcomeEditor}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Welkomstbericht bewerken</DialogTitle>
            <DialogDescription>{trainingConfig.label}</DialogDescription>
          </DialogHeader>
          {welcomeContent && (
            <div className="space-y-4">
              <div>
                <Label className="text-xs">Welkomsttitel</Label>
                <Input
                  value={welcomeContent.welcome_title}
                  onChange={e => setWelcomeContent(prev => prev ? { ...prev, welcome_title: e.target.value } : prev)}
                  className="mt-1"
                  placeholder="Welkom bij je training!"
                />
              </div>
              <div>
                <Label className="text-xs">Welkomstbericht</Label>
                <Textarea
                  value={welcomeContent.welcome_message}
                  onChange={e => setWelcomeContent(prev => prev ? { ...prev, welcome_message: e.target.value } : prev)}
                  className="mt-1 min-h-[120px]"
                  placeholder="Schrijf hier een welkomstbericht voor deelnemers..."
                />
              </div>
              <div>
                <Label className="text-xs">Introductievideo URL (optioneel)</Label>
                <Input
                  value={welcomeContent.intro_video_url || ""}
                  onChange={e => setWelcomeContent(prev => prev ? { ...prev, intro_video_url: e.target.value || null } : prev)}
                  className="mt-1"
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowWelcomeEditor(false)}>Annuleren</Button>
                <Button onClick={saveWelcomeContent} disabled={savingWelcome} className="gap-2">
                  {savingWelcome ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Opslaan
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CourseMaterial;
