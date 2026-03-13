import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";
import SessionLibrary from "@/components/session-builder/SessionLibrary";
import SessionPlan from "@/components/session-builder/SessionPlan";
import { MscSession, MscItem, ITEM_TYPES } from "@/components/session-builder/types";

export default function MscSessionBuilder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<MscSession[]>([]);
  const [allItems, setAllItems] = useState<MscItem[]>([]);
  const [planOrder, setPlanOrder] = useState<string[]>([]);
  const [durationOverrides, setDurationOverrides] = useState<Record<string, number>>({});
  const [clientName, setClientName] = useState("");
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split("T")[0]);
  const [targetDuration, setTargetDuration] = useState(60);
  const [sessionNotes, setSessionNotes] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) loadData();
      else setLoading(false);
    });
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [sessionsRes, itemsRes] = await Promise.all([
      supabase.from("msc_sessions").select("*").order("week_number"),
      supabase.from("msc_items").select("*").order("sort_order"),
    ]);
    setSessions((sessionsRes.data as MscSession[]) || []);
    setAllItems((itemsRes.data as MscItem[]) || []);
    setLoading(false);
  };

  const selectedIds = new Set(planOrder);

  const addItem = useCallback((item: MscItem) => {
    setPlanOrder((prev) => [...prev, item.id]);
    setGeneratedPlan(null);
  }, []);

  const removeItem = useCallback((id: string) => {
    setPlanOrder((prev) => prev.filter((i) => i !== id));
    setGeneratedPlan(null);
  }, []);

  const handleDurationChange = useCallback((id: string, duration: number) => {
    setDurationOverrides((prev) => ({ ...prev, [id]: duration }));
    setGeneratedPlan(null);
  }, []);

  const getItemDuration = (item: MscItem) => durationOverrides[item.id] ?? item.duration_minutes;

  const generatePlan = () => {
    const items = planOrder.map((id) => allItems.find((i) => i.id === id)).filter(Boolean) as MscItem[];
    const homeworkItems = items.filter((i) => i.type === "homework");
    const mainItems = items.filter((i) => i.type !== "homework");
    const totalMinutes = items.reduce((sum, i) => sum + getItemDuration(i), 0);

    let md = `# Individuele Sessie\n\n`;
    md += `**Cliënt:** ${clientName || "–"}\n`;
    md += `**Datum:** ${sessionDate}\n`;
    md += `**Totale duur:** ${totalMinutes} minuten\n\n---\n\n`;

    mainItems.forEach((item, idx) => {
      const dur = getItemDuration(item);
      const typeLabel = ITEM_TYPES[item.type] || item.type;
      md += `### ${idx + 1}. ${item.title} – ${dur} min\n`;
      md += `*${typeLabel}*\n\n`;
      if (item.instructions_markdown) md += `${item.instructions_markdown}\n\n`;
    });

    if (homeworkItems.length > 0) {
      md += `---\n\n## 🏠 Huiswerk\n\n`;
      homeworkItems.forEach((item) => {
        md += `### ${item.title}\n`;
        if (item.instructions_markdown) md += `${item.instructions_markdown}\n\n`;
      });
    }

    if (sessionNotes.trim()) {
      md += `---\n\n## 📝 Sessienotities\n\n${sessionNotes}\n`;
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
      if (y > 275) { doc.addPage(); y = 20; }
      doc.text(line, 20, y);
      y += 6;
    }
    doc.save(`sessieplan-${sessionDate}.pdf`);
  };

  const saveSession = async () => {
    if (sessions.length === 0) return;
    setSaving(true);
    const { error } = await supabase.from("client_sessions").insert({
      client_id: clientName || "onbekend",
      date: sessionDate,
      msc_session_id: sessions[0].id, // reference first session as base
      target_duration_minutes: targetDuration,
      selected_item_ids: planOrder,
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
      <SEO title="Session Builder | Admin" description="Stel een individuele sessie samen" />
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-light text-foreground">Individual Session Builder</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SessionLibrary
              sessions={sessions}
              items={allItems}
              selectedIds={selectedIds}
              onAddItem={addItem}
            />
            <SessionPlan
              planOrder={planOrder}
              allItems={allItems}
              durationOverrides={durationOverrides}
              targetDuration={targetDuration}
              clientName={clientName}
              sessionDate={sessionDate}
              sessionNotes={sessionNotes}
              generatedPlan={generatedPlan}
              saving={saving}
              onRemoveItem={removeItem}
              onReorder={(order) => { setPlanOrder(order); setGeneratedPlan(null); }}
              onDurationChange={handleDurationChange}
              onClientNameChange={setClientName}
              onSessionDateChange={setSessionDate}
              onTargetDurationChange={setTargetDuration}
              onSessionNotesChange={(n) => { setSessionNotes(n); setGeneratedPlan(null); }}
              onGenerate={generatePlan}
              onSave={saveSession}
              onCopy={copyToClipboard}
              onPrint={printPlan}
              onExportPdf={exportPdf}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
