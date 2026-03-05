import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, GripVertical, FileText, Copy, Printer, Download, Save } from "lucide-react";
import jsPDF from "jspdf";

const ITEM_TYPES = [
  { value: "meditation", label: "Meditatie" },
  { value: "exercise", label: "Oefening" },
  { value: "topic", label: "Onderwerp" },
  { value: "informal_practice", label: "Informele praktijk" },
  { value: "reflection", label: "Reflectie" },
  { value: "homework", label: "Huiswerk" },
];

const TYPE_COLORS: Record<string, string> = {
  meditation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  exercise: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  topic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  informal_practice: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  reflection: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  homework: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
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

export default function MscSessionBuilder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionTitle, setSessionTitle] = useState("");
  const [allItems, setAllItems] = useState<MscItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [durationOverrides, setDurationOverrides] = useState<Record<string, number>>({});
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split("T")[0]);
  const [targetDuration, setTargetDuration] = useState(60);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  useEffect(() => {
    // Wait for auth session to be restored before querying RLS-protected tables
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        loadData();
      } else {
        setLoading(false);
      }
    });
  }, []);

  const loadData = async () => {
    setLoading(true);
    const { data: session } = await supabase
      .from("msc_sessions")
      .select("*")
      .eq("week_number", 1)
      .single();

    if (session) {
      setSessionId(session.id);
      setSessionTitle(session.title);
      const { data: items } = await supabase
        .from("msc_items")
        .select("*")
        .eq("session_id", session.id)
        .order("sort_order");
      setAllItems((items as MscItem[]) || []);
    }
    setLoading(false);
  };

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setSelectedOrder((o) => o.filter((i) => i !== id));
      } else {
        next.add(id);
        setSelectedOrder((o) => [...o, id]);
      }
      return next;
    });
    setGeneratedPlan(null);
  };

  const getItemDuration = (item: MscItem) => durationOverrides[item.id] ?? item.duration_minutes;

  const selectedItems = useMemo(
    () => selectedOrder.map((id) => allItems.find((i) => i.id === id)).filter(Boolean) as MscItem[],
    [selectedOrder, allItems]
  );

  const totalMinutes = selectedItems.reduce((sum, i) => sum + getItemDuration(i), 0);
  const remaining = targetDuration - totalMinutes;

  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    setSelectedOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setDragIdx(idx);
  };
  const handleDragEnd = () => setDragIdx(null);

  const generatePlan = () => {
    const homeworkItems = selectedItems.filter((i) => i.type === "homework");
    const mainItems = selectedItems.filter((i) => i.type !== "homework");

    let md = `# ${sessionTitle}\n\n`;
    md += `**Cliënt:** ${clientName || "–"}\n`;
    md += `**Datum:** ${sessionDate}\n`;
    md += `**Totale duur:** ${totalMinutes} minuten\n\n---\n\n`;

    mainItems.forEach((item, idx) => {
      const dur = getItemDuration(item);
      const typeLabel = ITEM_TYPES.find((t) => t.value === item.type)?.label || item.type;
      md += `### ${idx + 1}. ${item.title} – ${dur} min\n`;
      md += `*${typeLabel}*\n\n`;
      if (item.instructions_markdown) {
        md += `${item.instructions_markdown}\n\n`;
      }
    });

    if (homeworkItems.length > 0) {
      md += `---\n\n## 🏠 Huiswerk\n\n`;
      homeworkItems.forEach((item) => {
        md += `### ${item.title}\n`;
        if (item.instructions_markdown) {
          md += `${item.instructions_markdown}\n\n`;
        }
      });
    }

    setGeneratedPlan(md);
  };

  const copyToClipboard = async () => {
    if (!generatedPlan) return;
    await navigator.clipboard.writeText(generatedPlan);
    toast({ title: "Gekopieerd naar klembord" });
  };

  const printPlan = () => {
    if (!generatedPlan) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<html><head><title>Sessieplan</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;line-height:1.6;color:#333}h1{font-size:1.5em}h2{font-size:1.2em;margin-top:2em}h3{font-size:1em;margin-top:1.5em}hr{border:none;border-top:1px solid #ddd;margin:1.5em 0}</style></head><body>`);
    // Simple markdown to HTML
    const html = generatedPlan
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^---$/gm, "<hr>")
      .replace(/\n\n/g, "<br><br>");
    w.document.write(html);
    w.document.write("</body></html>");
    w.document.close();
    w.print();
  };

  const exportPdf = () => {
    if (!generatedPlan) return;
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(generatedPlan.replace(/[#*]/g, ""), 170);
    doc.setFontSize(10);
    let y = 20;
    for (const line of lines) {
      if (y > 275) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 20, y);
      y += 6;
    }
    doc.save(`sessieplan-${sessionDate}.pdf`);
  };

  const saveSession = async () => {
    if (!sessionId) return;
    setSaving(true);
    const { error } = await supabase.from("client_sessions").insert({
      client_id: clientName || "onbekend",
      date: sessionDate,
      msc_session_id: sessionId,
      target_duration_minutes: targetDuration,
      selected_item_ids: selectedOrder,
      duration_overrides: durationOverrides,
      generated_plan_markdown: generatedPlan || "",
    });
    setSaving(false);
    if (error) {
      toast({ title: "Fout bij opslaan", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sessie opgeslagen!" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <SEO title="MSC Session Builder | Admin" description="Stel een MSC sessie samen" />
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/msc-materials")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-light text-foreground">Session Builder – {sessionTitle}</h1>
            </div>
          </div>

          {/* Session info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <Label>Cliënt</Label>
              <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Naam cliënt" />
            </div>
            <div>
              <Label>Datum</Label>
              <Input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} />
            </div>
            <div>
              <Label>Doelduur (minuten)</Label>
              <Input type="number" value={targetDuration} onChange={(e) => setTargetDuration(parseInt(e.target.value) || 60)} />
            </div>
          </div>

          {/* Duration status bar */}
          <Card className="mb-6">
            <CardContent className="py-3 px-4 flex items-center gap-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${totalMinutes > targetDuration ? "bg-destructive" : totalMinutes === targetDuration ? "bg-green-500" : "bg-primary"}`}
                    style={{ width: `${Math.min((totalMinutes / targetDuration) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {totalMinutes} / {targetDuration} min
              </span>
              {remaining > 0 && <span className="text-xs text-muted-foreground">({remaining} min over)</span>}
              {remaining < 0 && (
                <span className="text-xs text-destructive flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> {Math.abs(remaining)} min over!
                </span>
              )}
              {remaining === 0 && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Perfect!
                </span>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: All items checklist */}
            <div>
              <h2 className="text-lg font-medium text-foreground mb-3">Beschikbare items</h2>
              <div className="space-y-1.5">
                {allItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`cursor-pointer transition-all ${selectedIds.has(item.id) ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"}`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <Checkbox checked={selectedIds.has(item.id)} onCheckedChange={() => toggleItem(item.id)} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${selectedIds.has(item.id) ? "font-medium" : ""}`}>{item.title}</span>
                          <Badge variant="secondary" className={`text-xs ${TYPE_COLORS[item.type] || ""}`}>
                            {ITEM_TYPES.find((t) => t.value === item.type)?.label || item.type}
                          </Badge>
                          {item.is_optional && <Badge variant="outline" className="text-xs">Opt</Badge>}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{item.duration_minutes} min</span>
                    </CardContent>
                  </Card>
                ))}
                {allItems.length === 0 && (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    Geen items gevonden.{" "}
                    <button onClick={() => navigate("/admin/msc-materials")} className="text-primary underline">
                      Voeg items toe
                    </button>
                  </p>
                )}
              </div>
            </div>

            {/* Right: Selected items / session plan */}
            <div>
              <h2 className="text-lg font-medium text-foreground mb-3">Sessieplan ({selectedItems.length} items)</h2>
              {selectedItems.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    Selecteer items aan de linkerkant om je sessie samen te stellen.
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-1.5">
                  {selectedItems.map((item, idx) => (
                    <Card
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                      className={`cursor-grab active:cursor-grabbing ${dragIdx === idx ? "opacity-50" : ""}`}
                    >
                      <CardContent className="p-3 flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-xs font-mono text-muted-foreground w-5">{idx + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium">{item.title}</span>
                        </div>
                        <Input
                          type="number"
                          min={1}
                          className="w-16 h-7 text-xs text-center"
                          value={getItemDuration(item)}
                          onChange={(e) => {
                            const v = parseInt(e.target.value) || 1;
                            setDurationOverrides((prev) => ({ ...prev, [item.id]: v }));
                            setGeneratedPlan(null);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="text-xs text-muted-foreground">min</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Generate button */}
              {selectedItems.length > 0 && (
                <div className="mt-4 space-y-4">
                  {!generatedPlan ? (
                    <Button onClick={generatePlan} className="w-full gap-2">
                      <FileText className="h-4 w-4" /> Genereer Sessieplan
                    </Button>
                  ) : (
                    <>
                      {/* Rendered plan */}
                      <Card>
                        <CardContent className="p-6 prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap text-sm font-sans bg-muted/50 p-4 rounded-lg">{generatedPlan}</pre>
                        </CardContent>
                      </Card>
                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={saveSession} disabled={saving} className="gap-2">
                          <Save className="h-4 w-4" /> {saving ? "Opslaan..." : "Opslaan"}
                        </Button>
                        <Button variant="outline" onClick={copyToClipboard} className="gap-2">
                          <Copy className="h-4 w-4" /> Kopiëren
                        </Button>
                        <Button variant="outline" onClick={printPlan} className="gap-2">
                          <Printer className="h-4 w-4" /> Printen
                        </Button>
                        <Button variant="outline" onClick={exportPdf} className="gap-2">
                          <Download className="h-4 w-4" /> PDF
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
