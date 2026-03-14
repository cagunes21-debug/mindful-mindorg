import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2, Search, Phone, Mail, Clock, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  message: string | null;
  interest: string | null;
  status: string;
  notes: string | null;
  submission_date: string;
  created_at: string;
}

const COLUMNS = [
  { id: "new",                 label: "Nieuw",         emoji: "✨", bg: "bg-blue-50",    border: "border-blue-200",   dot: "bg-blue-500",   text: "text-blue-700" },
  { id: "contacted",           label: "Gecontacteerd", emoji: "📞", bg: "bg-amber-50",   border: "border-amber-200",  dot: "bg-amber-500",  text: "text-amber-700" },
  { id: "in_conversation",     label: "In gesprek",    emoji: "💬", bg: "bg-purple-50",  border: "border-purple-200", dot: "bg-purple-500", text: "text-purple-700" },
  { id: "converted_to_client", label: "Klant",         emoji: "✅", bg: "bg-emerald-50", border: "border-emerald-200",dot: "bg-emerald-500",text: "text-emerald-700" },
];

export default function CrmPipelineSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data || []) as Lead[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (!error) {
      setLeads(p => p.map(l => l.id === id ? { ...l, status } : l));
      setSelected(p => p && p.id === id ? { ...p, status } : p);
      toast.success("Status bijgewerkt");
    }
    setSaving(false);
  };

  const moveToNext = async (lead: Lead) => {
    const currentIdx = COLUMNS.findIndex(c => c.id === lead.status);
    if (currentIdx < COLUMNS.length - 1) {
      await updateStatus(lead.id, COLUMNS[currentIdx + 1].id);
    }
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase.from("leads").update({ notes: noteText }).eq("id", selected.id);
    if (!error) {
      setLeads(p => p.map(l => l.id === selected.id ? { ...l, notes: noteText } : l));
      setSelected(p => p ? { ...p, notes: noteText } : null);
      toast.success("Notities opgeslagen");
    }
    setSaving(false);
  };

  const openLead = (lead: Lead) => {
    setSelected(lead);
    setNoteText(lead.notes || "");
  };

  const q = search.toLowerCase();
  const filtered = leads.filter(l =>
    !q || l.first_name.toLowerCase().includes(q) || l.last_name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
  );

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  // Summary stats
  const totalLeads = leads.length;
  const newCount = leads.filter(l => l.status === "new").length;

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op naam of e-mail..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{totalLeads} leads totaal</span>
          {newCount > 0 && (
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 text-[10px]">
              {newCount} nieuw
            </Badge>
          )}
        </div>
      </div>

      {/* Pipeline columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colLeads = filtered.filter(l => l.status === col.id);
          return (
            <div key={col.id} className="space-y-2.5">
              {/* Column header */}
              <div className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl border",
                col.bg, col.border
              )}>
                <span className="text-sm">{col.emoji}</span>
                <span className={cn("text-xs font-semibold", col.text)}>{col.label}</span>
                <span className={cn(
                  "ml-auto text-[10px] font-bold h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center",
                  colLeads.length > 0 ? `${col.bg} ${col.text}` : "bg-muted/50 text-muted-foreground"
                )}>
                  {colLeads.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2 min-h-[100px]">
                {colLeads.map(lead => {
                  const currentIdx = COLUMNS.findIndex(c => c.id === lead.status);
                  const nextCol = currentIdx < COLUMNS.length - 1 ? COLUMNS[currentIdx + 1] : null;

                  return (
                    <Card
                      key={lead.id}
                      className="cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-border/50 group"
                      onClick={() => openLead(lead)}
                    >
                      <CardContent className="p-3.5 space-y-2.5">
                        {/* Name + initials */}
                        <div className="flex items-start gap-2.5">
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                            col.bg, col.text
                          )}>
                            {lead.first_name[0]}{lead.last_name?.[0] || ""}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {lead.first_name} {lead.last_name}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">{lead.email}</p>
                          </div>
                        </div>

                        {/* Interest tag */}
                        {lead.interest && (
                          <Badge variant="outline" className="text-[10px] font-normal border-border/60">
                            {lead.interest}
                          </Badge>
                        )}

                        {/* Footer: time + quick action */}
                        <div className="flex items-center justify-between pt-0.5">
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: nl })}
                          </div>
                          {nextCol && (
                            <button
                              onClick={(e) => { e.stopPropagation(); moveToNext(lead); }}
                              className={cn(
                                "opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium flex items-center gap-0.5 px-1.5 py-0.5 rounded-md",
                                nextCol.bg, nextCol.text
                              )}
                              title={`Verplaats naar ${nextCol.label}`}
                            >
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                        </div>

                        {/* Notes indicator */}
                        {lead.notes && (
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                            <MessageCircle className="h-3 w-3" />
                            <span className="truncate">{lead.notes.slice(0, 40)}{lead.notes.length > 40 ? "…" : ""}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}

                {colLeads.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground/30">
                    <div className="text-2xl mb-1">{col.emoji}</div>
                    <span className="text-[11px]">Geen leads</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead detail dialog */}
      {selected && (() => {
        const col = COLUMNS.find(c => c.id === selected.status) || COLUMNS[0];
        const currentIdx = COLUMNS.findIndex(c => c.id === selected.status);
        const nextCol = currentIdx < COLUMNS.length - 1 ? COLUMNS[currentIdx + 1] : null;

        return (
          <Dialog open onOpenChange={() => setSelected(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold", col.bg, col.text)}>
                    {selected.first_name[0]}{selected.last_name?.[0] || ""}
                  </div>
                  <div>
                    <DialogTitle className="text-lg">{selected.first_name} {selected.last_name}</DialogTitle>
                    <DialogDescription>
                      Ontvangen {format(new Date(selected.created_at), "d MMMM yyyy", { locale: nl })}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                {/* Contact chips */}
                <div className="flex flex-wrap gap-2">
                  <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-1.5 text-xs bg-muted/70 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" /> {selected.email}
                  </a>
                  {selected.phone_number && (
                    <a href={`tel:${selected.phone_number}`} className="inline-flex items-center gap-1.5 text-xs bg-muted/70 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" /> {selected.phone_number}
                    </a>
                  )}
                </div>

                {/* Message */}
                {selected.message && (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Bericht</Label>
                    <div className="text-sm bg-muted/30 rounded-xl p-3.5 border border-border/50 leading-relaxed">
                      {selected.message}
                    </div>
                  </div>
                )}

                {/* Interest */}
                {selected.interest && (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Interesse</Label>
                    <Badge variant="outline" className="text-xs">{selected.interest}</Badge>
                  </div>
                )}

                {/* Status with visual pipeline */}
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Status</Label>
                  <div className="flex items-center gap-1 mb-2">
                    {COLUMNS.map((c, i) => (
                      <button
                        key={c.id}
                        onClick={() => updateStatus(selected.id, c.id)}
                        className={cn(
                          "flex-1 py-1.5 px-2 rounded-lg text-[10px] font-medium transition-all text-center border",
                          selected.status === c.id
                            ? `${c.bg} ${c.text} ${c.border} shadow-sm`
                            : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/60"
                        )}
                      >
                        {c.emoji} {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Notities</Label>
                  <Textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="Notities over deze lead..."
                    className="min-h-[80px] bg-card"
                  />
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                {nextCol && (
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn("gap-1.5 mr-auto", nextCol.text)}
                    onClick={() => moveToNext(selected)}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    Verplaats naar {nextCol.label}
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelected(null)}>Sluiten</Button>
                <Button onClick={saveNotes} disabled={saving} className="bg-primary hover:bg-primary/90">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Opslaan"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      })()}
    </div>
  );
}
