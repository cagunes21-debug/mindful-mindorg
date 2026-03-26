import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { ChevronRight, Lock, Unlock, Search, User, Settings, Video, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Enrollment {
  id: string;
  course_type: string;
  start_date: string;
  status: string | null;
  unlocked_weeks: number[];
  visible_sections: string[];
  trainer_name: string | null;
  client_id: string | null;
  sessions_total: number | null;
  sessions_used: number;
}

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface WelcomeContent {
  id: string;
  training_type: string;
  welcome_title: string;
  welcome_message: string;
  intro_video_url: string | null;
}

const COURSE_LABELS: Record<string, string> = {
  msc_8week: "8-weekse MSC Training",
  individueel_6: "Individueel (6 sessies)",
  losse_sessie: "Losse Sessie",
};

const MAX_WEEKS: Record<string, number> = {
  msc_8week: 8,
  individueel_6: 6,
  losse_sessie: 1,
};

const TRAINING_TYPE_MAP: Record<string, string> = {
  msc_8week: "msc_8_week",
  individueel_6: "individual_6_sessions",
  losse_sessie: "individual_6_sessions",
};

export default function EnrollmentContentManager() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [clients, setClients] = useState<Record<string, Client>>({});
  const [welcomeContent, setWelcomeContent] = useState<WelcomeContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState<string | null>(null);

  const [welcomeDialog, setWelcomeDialog] = useState(false);
  const [editingWelcome, setEditingWelcome] = useState<WelcomeContent | null>(null);
  const [welcomeForm, setWelcomeForm] = useState({ welcome_title: "", welcome_message: "", intro_video_url: "" });
  const [savingWelcome, setSavingWelcome] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const [enrRes, clientRes, welcomeRes] = await Promise.all([
      supabase.from("enrollments").select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, client_id, sessions_total, sessions_used").order("start_date", { ascending: false }),
      supabase.from("clients").select("id, first_name, last_name, email"),
      supabase.from("training_welcome_content").select("*"),
    ]);
    setEnrollments((enrRes.data || []) as Enrollment[]);
    const cMap: Record<string, Client> = {};
    (clientRes.data || []).forEach((c: any) => { cMap[c.id] = c as Client; });
    setClients(cMap);
    setWelcomeContent((welcomeRes.data || []) as WelcomeContent[]);
    setLoading(false);
  };

  const toggleWeek = async (enrollment: Enrollment, week: number) => {
    const current = enrollment.unlocked_weeks || [];
    const next = current.includes(week) ? current.filter(w => w !== week) : [...current, week].sort((a, b) => a - b);
    setSaving(enrollment.id);
    const { error } = await supabase.from("enrollments").update({ unlocked_weeks: next }).eq("id", enrollment.id);
    if (error) { toast.error("Fout: " + error.message); } else {
      setEnrollments(prev => prev.map(e => e.id === enrollment.id ? { ...e, unlocked_weeks: next } : e));
      toast.success("Weken bijgewerkt");
    }
    setSaving(null);
  };

  const unlockUpTo = async (enrollment: Enrollment, upTo: number) => {
    const next = Array.from({ length: upTo }, (_, i) => i + 1);
    setSaving(enrollment.id);
    const { error } = await supabase.from("enrollments").update({ unlocked_weeks: next }).eq("id", enrollment.id);
    if (error) { toast.error("Fout: " + error.message); } else {
      setEnrollments(prev => prev.map(e => e.id === enrollment.id ? { ...e, unlocked_weeks: next } : e));
      toast.success(`Week 1-${upTo} ontgrendeld`);
    }
    setSaving(null);
  };

  const openWelcomeEdit = (trainingType: string) => {
    const existing = welcomeContent.find(w => w.training_type === trainingType);
    if (existing) {
      setEditingWelcome(existing);
      setWelcomeForm({ welcome_title: existing.welcome_title, welcome_message: existing.welcome_message, intro_video_url: existing.intro_video_url || "" });
    } else {
      setEditingWelcome(null);
      setWelcomeForm({ welcome_title: "", welcome_message: "", intro_video_url: "" });
    }
    setWelcomeDialog(true);
  };

  const saveWelcome = async (trainingType: string) => {
    setSavingWelcome(true);
    const payload = { training_type: trainingType, welcome_title: welcomeForm.welcome_title, welcome_message: welcomeForm.welcome_message, intro_video_url: welcomeForm.intro_video_url || null };
    let error;
    if (editingWelcome) {
      ({ error } = await supabase.from("training_welcome_content").update(payload).eq("id", editingWelcome.id));
    } else {
      ({ error } = await supabase.from("training_welcome_content").insert(payload));
    }
    if (error) { toast.error("Fout: " + error.message); } else {
      toast.success("Welkomstbericht opgeslagen");
      setWelcomeDialog(false);
      loadData();
    }
    setSavingWelcome(false);
  };

  const toggle = (id: string) => setOpenIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = enrollments.filter(e => {
    if (!search) return true;
    const c = e.client_id ? clients[e.client_id] : null;
    const q = search.toLowerCase();
    return (c && (`${c.first_name} ${c.last_name}`.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))) || (COURSE_LABELS[e.course_type] || e.course_type).toLowerCase().includes(q);
  });

  // Group by training type for welcome content
  const trainingTypes = [...new Set(enrollments.map(e => e.course_type))];

  if (loading) return <div className="flex items-center justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-8">
      {/* Welcome Content Section */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Welkomstberichten per trainingtype</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(COURSE_LABELS).map(([type, label]) => {
            const wc = welcomeContent.find(w => w.training_type === TRAINING_TYPE_MAP[type]);
            return (
              <Card key={type} className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => openWelcomeEdit(TRAINING_TYPE_MAP[type])}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{label}</p>
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {wc ? (
                    <div className="space-y-1">
                      <p className="text-xs text-foreground font-medium truncate">{wc.welcome_title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{wc.welcome_message}</p>
                      {wc.intro_video_url && <Badge variant="outline" className="text-[10px] gap-1"><Video className="h-3 w-3" /> Video</Badge>}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Geen welkomstbericht ingesteld</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Enrollments Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Content-toegang per deelnemer</h3>
          <Badge variant="secondary">{enrollments.length} inschrijvingen</Badge>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Zoek op naam of e-mail..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>

        <div className="space-y-2">
          {filtered.map(enrollment => {
            const client = enrollment.client_id ? clients[enrollment.client_id] : null;
            const maxW = MAX_WEEKS[enrollment.course_type] || 8;
            const isOpen = openIds.has(enrollment.id);
            const unlockedCount = (enrollment.unlocked_weeks || []).length;
            return (
              <Collapsible key={enrollment.id} open={isOpen} onOpenChange={() => toggle(enrollment.id)}>
                <CollapsibleTrigger className="w-full">
                  <Card className={cn("transition-all hover:bg-muted/50", isOpen && "ring-1 ring-primary/20 bg-primary/5")}>
                    <CardContent className="p-3 flex items-center gap-3">
                      <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0", isOpen && "rotate-90")} />
                      <User className="h-4 w-4 text-primary shrink-0" />
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-medium truncate">{client ? `${client.first_name} ${client.last_name}` : "Onbekend"}</p>
                        <p className="text-xs text-muted-foreground truncate">{client?.email}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] shrink-0">{COURSE_LABELS[enrollment.course_type] || enrollment.course_type}</Badge>
                      <Badge variant={enrollment.status === "active" ? "default" : "secondary"} className="text-[10px] shrink-0">{enrollment.status}</Badge>
                      <span className="text-xs text-muted-foreground shrink-0">{unlockedCount}/{maxW}</span>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-8 mt-2 mb-3 space-y-3">
                    {/* Week toggles */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Ontgrendelde weken/sessies</p>
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: maxW }, (_, i) => i + 1).map(week => {
                          const isUnlocked = (enrollment.unlocked_weeks || []).includes(week);
                          return (
                            <button
                              key={week}
                              onClick={() => toggleWeek(enrollment, week)}
                              disabled={saving === enrollment.id}
                              className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                                isUnlocked
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                              )}
                            >
                              {isUnlocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                              {enrollment.course_type === "msc_8week" ? `Week ${week}` : `Sessie ${week}`}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-2 mt-2">
                        {[1, 3, maxW].filter((v, i, a) => a.indexOf(v) === i).map(n => (
                          <Button key={n} variant="ghost" size="sm" className="h-7 text-xs" onClick={() => unlockUpTo(enrollment, n)} disabled={saving === enrollment.id}>
                            Unlock t/m {n}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
          {filtered.length === 0 && (
            <Card><CardContent className="py-8 text-center text-muted-foreground text-sm">Geen inschrijvingen gevonden.</CardContent></Card>
          )}
        </div>
      </div>

      {/* Welcome Edit Dialog */}
      {welcomeDialog && (
        <Dialog open onOpenChange={() => setWelcomeDialog(false)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Welkomstbericht bewerken</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Titel</Label>
                <Input value={welcomeForm.welcome_title} onChange={e => setWelcomeForm(f => ({ ...f, welcome_title: e.target.value }))} placeholder="Welkom bij je traject!" />
              </div>
              <div>
                <Label>Bericht</Label>
                <Textarea rows={4} value={welcomeForm.welcome_message} onChange={e => setWelcomeForm(f => ({ ...f, welcome_message: e.target.value }))} placeholder="Schrijf een welkomstbericht voor de deelnemer..." />
              </div>
              <div>
                <Label>Intro video URL (optioneel)</Label>
                <Input value={welcomeForm.intro_video_url} onChange={e => setWelcomeForm(f => ({ ...f, intro_video_url: e.target.value }))} placeholder="https://youtube.com/..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setWelcomeDialog(false)}>Annuleren</Button>
              <Button onClick={() => saveWelcome(editingWelcome?.training_type || Object.values(TRAINING_TYPE_MAP)[0])} disabled={savingWelcome}>
                {savingWelcome && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Opslaan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
