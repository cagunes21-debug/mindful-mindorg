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
import { Loader2, Search, Phone, Mail, MessageCircle, ChevronRight, UserPlus, Clock } from "lucide-react";
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
  { id: "new",                label: "Nieuw",        color: "bg-blue-500" },
  { id: "contacted",          label: "Gecontacteerd", color: "bg-amber-500" },
  { id: "in_conversation",    label: "In gesprek",    color: "bg-purple-500" },
  { id: "converted_to_client",label: "Klant ✓",       color: "bg-green-500" },
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

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Zoek lead..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Pipeline columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colLeads = filtered.filter(l => l.status === col.id);
          return (
            <div key={col.id} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <div className={cn("h-2 w-2 rounded-full", col.color)} />
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{col.label}</span>
                <Badge variant="secondary" className="text-[10px] ml-auto">{colLeads.length}</Badge>
              </div>
              <div className="space-y-2 min-h-[120px]">
                {colLeads.map(lead => (
                  <Card
                    key={lead.id}
                    className="cursor-pointer hover:shadow-md transition-all border-border/60"
                    onClick={() => openLead(lead)}
                  >
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">{lead.first_name} {lead.last_name}</p>
                          <p className="text-xs text-muted-foreground">{lead.email}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      </div>
                      {lead.interest && (
                        <Badge variant="outline" className="text-[10px]">{lead.interest}</Badge>
                      )}
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: nl })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {colLeads.length === 0 && (
                  <div className="text-center py-8 text-xs text-muted-foreground/50">Geen leads</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead detail dialog */}
      {selected && (
        <Dialog open onOpenChange={() => setSelected(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selected.first_name} {selected.last_name}</DialogTitle>
              <DialogDescription>
                Ontvangen {format(new Date(selected.created_at), "d MMMM yyyy", { locale: nl })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Contact info */}
              <div className="flex flex-wrap gap-2">
                <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-1.5 text-xs bg-muted px-2.5 py-1.5 rounded-lg hover:bg-muted/80">
                  <Mail className="h-3 w-3" /> {selected.email}
                </a>
                {selected.phone_number && (
                  <a href={`tel:${selected.phone_number}`} className="inline-flex items-center gap-1.5 text-xs bg-muted px-2.5 py-1.5 rounded-lg hover:bg-muted/80">
                    <Phone className="h-3 w-3" /> {selected.phone_number}
                  </a>
                )}
              </div>

              {/* Message */}
              {selected.message && (
                <div>
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Bericht</Label>
                  <p className="text-sm mt-1 bg-muted/50 rounded-lg p-3">{selected.message}</p>
                </div>
              )}

              {/* Interest */}
              {selected.interest && (
                <div>
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Interesse</Label>
                  <p className="text-sm mt-1">{selected.interest}</p>
                </div>
              )}

              {/* Status */}
              <div>
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Status</Label>
                <Select value={selected.status} onValueChange={v => updateStatus(selected.id, v)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {COLUMNS.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Notities</Label>
                <Textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Notities over deze lead..."
                  className="mt-1 min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelected(null)}>Sluiten</Button>
              <Button onClick={saveNotes} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Opslaan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
