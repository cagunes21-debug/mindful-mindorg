// src/pages/AdminDashboard.tsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Home, Users, ChevronRight, BookOpen, LogOut, Menu, X,
  ChevronLeft, Lock, Unlock, Loader2, Search, Plus, Send,
  ExternalLink, Calendar, TrendingUp, GitBranch,
} from "lucide-react";
import SEO from "@/components/SEO";
import AdminCustomersSection from "@/components/admin/AdminCustomersSection";
import UpcomingSessionsWidget from "@/components/admin/UpcomingSessionsWidget";
import CrmPipelineSection from "@/components/admin/CrmPipelineSection";
import AgendaSection from "@/components/admin/AgendaSection";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Enrollment {
  id: string;
  client_id: string | null;
  user_id: string | null;
  course_type: string;
  start_date: string;
  status: string;
  unlocked_weeks: number[];
  trainer_name: string | null;
  client_name?: string;
  client_email?: string;
}

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface TrainingGroup {
  course_type: string;
  start_date: string;
  trainer_name: string | null;
  enrollments: Enrollment[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COURSE_LABELS: Record<string, string> = {
  msc_8week:    "8-weekse Groepstraining",
  individueel_6:"Individueel (6 sessies)",
  losse_sessie: "Losse Sessie",
};

const MAX_WEEKS: Record<string, number> = {
  msc_8week: 8, individueel_6: 6, losse_sessie: 1,
};

const STATUS_COLORS: Record<string, string> = {
  active:    "bg-green-100 text-green-800",
  invited:   "bg-blue-100 text-blue-800",
  completed: "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800",
  paused:    "bg-yellow-100 text-yellow-800",
};

const STATUS_LABELS: Record<string, string> = {
  active:    "Actief",
  invited:   "Uitgenodigd",
  completed: "Afgerond",
  cancelled: "Geannuleerd",
  paused:    "Gepauzeerd",
};

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV = [
  {
    group: "Overzicht",
    items: [
      { id: "overview", label: "Dashboard", icon: Home },
    ],
  },
  {
    group: "People",
    items: [
      { id: "pipeline", label: "Pipeline",  icon: GitBranch },
      { id: "clients",  label: "Klanten",   icon: Users },
    ],
  },
  {
    group: "Trainingen",
    items: [
      { id: "trainingen",  label: "Lopende trainingen", icon: BookOpen },
      { id: "deelnemers",  label: "Deelnemers",         icon: TrendingUp },
      { id: "agenda",      label: "Agenda",              icon: Calendar },
    ],
  },
];

const SECTION_TITLES: Record<string, string> = {
  overview:   "Dashboard",
  pipeline:   "Pipeline",
  clients:    "Klanten",
  trainingen: "Lopende trainingen",
  deelnemers: "Deelnemers",
  agenda:     "Agenda",
};

// ─── Quick stats ──────────────────────────────────────────────────────────────

function useQuickStats() {
  const [stats, setStats] = useState({ clients: 0, leads: 0, enrollments: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [c, l, e, o] = await Promise.all([
          supabase.from("clients").select("id", { count: "exact", head: true }),
          supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("enrollments").select("id", { count: "exact", head: true }).eq("status", "active"),
          supabase.from("orders").select("total").eq("status", "paid"),
        ]);
        setStats({
          clients:     c.count || 0,
          leads:       l.count || 0,
          enrollments: e.count || 0,
          revenue:     (o.data || []).reduce((s: number, x: any) => s + (x.total || 0), 0),
        });
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  return { stats, loading };
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, accent, badge, onClick }: {
  icon: React.ElementType; label: string; value: string | number;
  accent: string; badge?: number; onClick?: () => void;
}) {
  return (
    <Card
      className={cn("border-l-4 cursor-pointer hover:shadow-md transition-all duration-200 group", accent)}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-2xl font-bold text-foreground leading-tight">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
        {badge ? (
          <span className="h-5 min-w-5 px-1.5 rounded-full bg-terracotta-500 text-white text-[10px] font-bold flex items-center justify-center">
            {badge}
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}

// ─── Lopende Trainingen section ───────────────────────────────────────────────

function LopendeTrainingenSection({ onViewDeelnemer }: { onViewDeelnemer: (id: string) => void }) {
  const [groups, setGroups] = useState<TrainingGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const [enrRes, cliRes] = await Promise.all([
      supabase.from("enrollments")
        .select("*")
        .in("status", ["active", "invited"])
        .order("start_date", { ascending: false }),
      supabase.from("clients").select("id, first_name, last_name, email"),
    ]);
    const clients = (cliRes.data || []) as Client[];
    const enrollments = (enrRes.data || []).map((e: any) => {
      const c = clients.find(x => x.id === e.client_id);
      return { ...e, client_name: c ? `${c.first_name} ${c.last_name}`.trim() : "—", client_email: c?.email || "" };
    }) as Enrollment[];

    // Group by course_type + start_date + trainer
    const map = new Map<string, TrainingGroup>();
    enrollments.forEach(e => {
      const key = `${e.course_type}__${e.start_date}__${e.trainer_name || ""}`;
      if (!map.has(key)) {
        map.set(key, { course_type: e.course_type, start_date: e.start_date, trainer_name: e.trainer_name, enrollments: [] });
      }
      map.get(key)!.enrollments.push(e);
    });
    setGroups(Array.from(map.values()).sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()));
    setLoading(false);
  };

  if (loading) return (
    <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-terracotta-400" /></div>
  );

  if (groups.length === 0) return (
    <div className="text-center py-16 text-sm text-muted-foreground">Geen lopende trainingen</div>
  );

  return (
    <div className="space-y-3">
      {groups.map((group, idx) => {
        const key = `${group.course_type}__${group.start_date}`;
        const isOpen = expanded === key;
        const max = MAX_WEEKS[group.course_type] || 8;
        const avgUnlocked = Math.round(
          group.enrollments.reduce((s, e) => s + (e.unlocked_weeks || []).length, 0) / group.enrollments.length
        );

        return (
          <Card key={idx} className="border-warm-200 overflow-hidden">
            <button
              className="w-full text-left"
              onClick={() => setExpanded(isOpen ? null : key)}
            >
              <CardContent className="p-5 flex items-center gap-4">
                {/* Course type indicator */}
                <div className="h-11 w-11 rounded-xl bg-terracotta-50 border border-terracotta-100 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-terracotta-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">
                    {COURSE_LABELS[group.course_type] || group.course_type}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Start: {format(new Date(group.start_date), "d MMM yyyy", { locale: nl })}
                    </span>
                    {group.trainer_name && (
                      <span className="text-xs text-muted-foreground">
                        Trainer: {group.trainer_name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Week progress */}
                <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                  <div className="flex gap-0.5">
                    {Array.from({ length: max }, (_, i) => i + 1).map(w => (
                      <div
                        key={w}
                        className={cn("h-2 w-2 rounded-sm", w <= avgUnlocked ? "bg-terracotta-500" : "bg-warm-200")}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">gem. week {avgUnlocked}/{max}</span>
                </div>

                {/* Participants count */}
                <div className="text-right shrink-0">
                  <p className="text-xl font-bold text-foreground">{group.enrollments.length}</p>
                  <p className="text-xs text-muted-foreground">
                    {group.enrollments.length === 1 ? "deelnemer" : "deelnemers"}
                  </p>
                </div>

                <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0", isOpen && "rotate-90")} />
              </CardContent>
            </button>

            {/* Expanded deelnemers */}
            {isOpen && (
              <div className="border-t border-warm-100">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Deelnemer</TableHead>
                      <TableHead className="text-xs">Weken</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs text-right">Profiel</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.enrollments.map(e => {
                      const unlocked = (e.unlocked_weeks || []).length;
                      return (
                        <TableRow key={e.id}>
                          <TableCell className="py-2">
                            <p className="text-sm font-medium">{e.client_name}</p>
                            <p className="text-xs text-muted-foreground">{e.client_email}</p>
                          </TableCell>
                          <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-0.5">
                                {Array.from({ length: max }, (_, i) => i + 1).map(w => (
                                  <div key={w} className={cn("h-2 w-2 rounded-sm", (e.unlocked_weeks || []).includes(w) ? "bg-terracotta-500" : "bg-warm-200")} />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{unlocked}/{max}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-2">
                            <Badge className={cn("text-[10px] px-1.5 py-0", STATUS_COLORS[e.status] || "bg-muted")}>
                              {STATUS_LABELS[e.status] || e.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-2 text-right">
                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => onViewDeelnemer(e.id)}>
                              <ExternalLink className="h-3 w-3" /> Beheer
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// ─── Deelnemers section ───────────────────────────────────────────────────────

function DeelnemersSection() {
  const [enrollments, setEnrollments]     = useState<Enrollment[]>([]);
  const [clients, setClients]             = useState<Client[]>([]);
  const [loading, setLoading]             = useState(true);
  const [search, setSearch]               = useState("");
  const [filterStatus, setFilterStatus]   = useState("all");
  const [selected, setSelected]           = useState<Enrollment | null>(null);
  const [showNew, setShowNew]             = useState(false);
  const [updatingWeeks, setUpdatingWeeks] = useState(false);
  const [form, setForm] = useState({ client_id: "", course_type: "individueel_6", start_date: "", trainer_name: "", send_invite: true });
  const [submitting, setSubmitting]       = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const [enrRes, cliRes] = await Promise.all([
      supabase.from("enrollments").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, first_name, last_name, email").order("first_name"),
    ]);
    const clis = (cliRes.data || []) as Client[];
    setClients(clis);
    setEnrollments((enrRes.data || []).map((e: any) => {
      const c = clis.find(x => x.id === e.client_id);
      return { ...e, client_name: c ? `${c.first_name} ${c.last_name}`.trim() : "—", client_email: c?.email || "" };
    }) as Enrollment[]);
    setLoading(false);
  };

  const toggleWeek = async (enr: Enrollment, w: number) => {
    const cur = enr.unlocked_weeks || [];
    const upd = cur.includes(w) ? cur.filter(x => x !== w) : [...cur, w].sort((a, b) => a - b);
    setUpdatingWeeks(true);
    const { error } = await supabase.from("enrollments").update({ unlocked_weeks: upd }).eq("id", enr.id);
    if (!error) {
      const patch = (e: Enrollment) => e.id === enr.id ? { ...e, unlocked_weeks: upd } : e;
      setEnrollments(p => p.map(patch));
      setSelected(p => p ? patch(p) : null);
      toast.success(`Week ${w} ${upd.includes(w) ? "vrijgegeven" : "vergrendeld"}`);
    }
    setUpdatingWeeks(false);
  };

  const bulkUnlock = async (enr: Enrollment, all: boolean) => {
    const weeks = all ? Array.from({ length: MAX_WEEKS[enr.course_type] || 8 }, (_, i) => i + 1) : [1];
    await supabase.from("enrollments").update({ unlocked_weeks: weeks }).eq("id", enr.id);
    const patch = (e: Enrollment) => e.id === enr.id ? { ...e, unlocked_weeks: weeks } : e;
    setEnrollments(p => p.map(patch));
    setSelected(p => p ? patch(p) : null);
    toast.success(all ? "Alle weken vrijgegeven" : "Vergrendeld tot week 1");
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("enrollments").update({ status }).eq("id", id);
    const patch = (e: Enrollment) => e.id === id ? { ...e, status } : e;
    setEnrollments(p => p.map(patch));
    setSelected(p => p ? patch(p) : null);
    toast.success("Status bijgewerkt");
  };

  const handleCreate = async () => {
    if (!form.client_id || !form.start_date) { toast.error("Selecteer een klant en startdatum"); return; }
    setSubmitting(true);
    try {
      const client = clients.find(c => c.id === form.client_id);
      const { data, error } = await supabase.from("enrollments").insert({
        client_id: form.client_id, user_id: null, course_type: form.course_type,
        start_date: form.start_date, trainer_name: form.trainer_name.trim() || null,
        status: "invited", unlocked_weeks: [1],
      }).select("id").single();
      if (error) throw error;
      if (form.send_invite && client) {
        try {
          await supabase.functions.invoke("send-invitation-email", {
            body: { client_id: form.client_id, enrollment_id: data.id, program_name: COURSE_LABELS[form.course_type], email: client.email, first_name: client.first_name },
          });
        } catch (e) { console.error(e); }
      }
      toast.success("Inschrijving aangemaakt!");
      setShowNew(false);
      setForm({ client_id: "", course_type: "individueel_6", start_date: "", trainer_name: "", send_invite: true });
      load();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSubmitting(false);
  };

  const filtered = enrollments.filter(e => {
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    const q = search.toLowerCase();
    return matchStatus && (!q || e.client_name?.toLowerCase().includes(q) || e.client_email?.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["active", "invited", "completed", "all"] as const).map(s => (
          <Card key={s} className="border-warm-200">
            <CardContent className="p-4">
              <p className="text-2xl font-semibold">
                {s === "all" ? enrollments.length : enrollments.filter(e => e.status === s).length}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {s === "all" ? "Totaal" : STATUS_LABELS[s]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Zoek deelnemer..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle statussen</SelectItem>
            <SelectItem value="active">Actief</SelectItem>
            <SelectItem value="invited">Uitgenodigd</SelectItem>
            <SelectItem value="completed">Afgerond</SelectItem>
            <SelectItem value="paused">Gepauzeerd</SelectItem>
            <SelectItem value="cancelled">Geannuleerd</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" className="ml-auto gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white" onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" /> Nieuwe inschrijving
        </Button>
      </div>

      {/* Table */}
      <Card className="border-warm-200">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-terracotta-400" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-sm text-muted-foreground">Geen deelnemers gevonden</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deelnemer</TableHead>
                  <TableHead>Training</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>Weken</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Beheer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(e => {
                  const max = MAX_WEEKS[e.course_type] || 8;
                  const unlocked = (e.unlocked_weeks || []).length;
                  return (
                    <TableRow key={e.id} className="cursor-pointer hover:bg-muted/30" onClick={() => setSelected(e)}>
                      <TableCell>
                        <p className="font-medium text-sm">{e.client_name}</p>
                        <p className="text-xs text-muted-foreground">{e.client_email}</p>
                      </TableCell>
                      <TableCell className="text-sm">{COURSE_LABELS[e.course_type] || e.course_type}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(e.start_date), "d MMM yyyy", { locale: nl })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {Array.from({ length: max }, (_, i) => i + 1).map(w => (
                              <div key={w} className={cn("h-2 w-2 rounded-sm", (e.unlocked_weeks || []).includes(w) ? "bg-terracotta-500" : "bg-warm-200")} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{unlocked}/{max}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-[10px] px-1.5 py-0", STATUS_COLORS[e.status] || "bg-muted")}>
                          {STATUS_LABELS[e.status] || e.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-xs" onClick={ev => { ev.stopPropagation(); setSelected(e); }}>
                          Beheer
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail dialog */}
      {selected && (
        <Dialog open onOpenChange={() => setSelected(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selected.client_name}</DialogTitle>
              <DialogDescription>
                {COURSE_LABELS[selected.course_type]} · Start: {format(new Date(selected.start_date), "d MMMM yyyy", { locale: nl })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Status</Label>
                <Select value={selected.status} onValueChange={v => updateStatus(selected.id, v)}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Modules vrijgeven ({(selected.unlocked_weeks || []).length}/{MAX_WEEKS[selected.course_type] || 8})
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: MAX_WEEKS[selected.course_type] || 8 }, (_, i) => i + 1).map(w => {
                    const on = (selected.unlocked_weeks || []).includes(w);
                    return (
                      <button key={w} disabled={updatingWeeks} onClick={() => toggleWeek(selected, w)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium transition-all",
                          on ? "bg-terracotta-50 border-terracotta-200 text-terracotta-700 hover:bg-terracotta-100"
                             : "bg-warm-50 border-warm-200 text-muted-foreground hover:bg-warm-100"
                        )}
                      >
                        <span>{w}</span>
                        {on ? <Unlock className="h-3 w-3 text-terracotta-500" /> : <Lock className="h-3 w-3 text-muted-foreground/50" />}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs gap-1" onClick={() => bulkUnlock(selected, true)}>
                    <Unlock className="h-3 w-3" /> Alles vrijgeven
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs gap-1" onClick={() => bulkUnlock(selected, false)}>
                    <Lock className="h-3 w-3" /> Alles vergrendelen
                  </Button>
                </div>
              </div>
              {selected.user_id && (
                <div className="pt-2 border-t">
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" asChild>
                    <a href={`/training/${selected.id}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" /> Training bekijken als deelnemer
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* New enrollment dialog */}
      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nieuwe inschrijving</DialogTitle>
            <DialogDescription>Schrijf een bestaande klant in voor een training.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Klant *</Label>
              <Select value={form.client_id} onValueChange={v => setForm(p => ({ ...p, client_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Selecteer klant..." /></SelectTrigger>
                <SelectContent>
                  {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.first_name} {c.last_name} — {c.email}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Training *</Label>
              <Select value={form.course_type} onValueChange={v => setForm(p => ({ ...p, course_type: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(COURSE_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Startdatum *</Label>
              <Input type="date" value={form.start_date} onChange={e => setForm(p => ({ ...p, start_date: e.target.value }))} />
            </div>
            <div>
              <Label>Trainer (optioneel)</Label>
              <Input value={form.trainer_name} onChange={e => setForm(p => ({ ...p, trainer_name: e.target.value }))} placeholder="Naam trainer" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="si" checked={form.send_invite} onChange={e => setForm(p => ({ ...p, send_invite: e.target.checked }))} className="rounded" />
              <Label htmlFor="si" className="text-sm font-normal cursor-pointer">Uitnodigingsmail versturen</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNew(false)}>Annuleren</Button>
            <Button onClick={handleCreate} disabled={submitting} className="gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Inschrijven
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [isMobile, setIsMobile]           = useState(false);
  const { stats, loading: statsLoading }  = useQuickStats();

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNav = useCallback((id: string) => {
    setActiveSection(id);
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <SEO title="Admin | Mindful Mind" description="Beheer dashboard" />

      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={cn(
        "bg-card border-r border-border flex flex-col shrink-0 transition-all duration-300 z-50",
        "md:sticky md:top-0 md:h-screen md:w-52",
        isMobile && "fixed top-0 left-0 h-full w-64 shadow-xl",
        isMobile && !sidebarOpen && "-translate-x-full",
        isMobile && sidebarOpen && "translate-x-0",
      )}>
        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-full bg-terracotta-100 flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-terracotta-500" />
            </div>
            <span className="text-sm font-semibold text-foreground">Mindful Mind</span>
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md hover:bg-muted">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-5">
          {NAV.map(group => (
            <div key={group.group}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 px-3 mb-1.5">
                {group.group}
              </p>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const active = activeSection === item.id;
                  const badge = item.id === "pipeline" && stats.leads > 0 ? stats.leads : undefined;
                  return (
                    <button key={item.id} onClick={() => handleNav(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-150",
                        active ? "bg-terracotta-50 text-terracotta-700 font-medium" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4 shrink-0", active && "text-terracotta-600")} />
                      <span className="flex-1 truncate text-left">{item.label}</span>
                      {badge ? (
                        <span className="h-5 min-w-5 px-1.5 rounded-full bg-terracotta-500 text-white text-[10px] font-bold flex items-center justify-center">
                          {badge}
                        </span>
                      ) : active ? (
                        <div className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* External links */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 px-3 mb-1.5">
              Portalen
            </p>
            <div className="space-y-0.5">
              {[
                { label: "Financiën →",     path: "/admin/financien" },
                { label: "Content →",       path: "/admin-cms" },
              ].map(link => (
                <button key={link.path} onClick={() => navigate(link.path)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  <span className="text-left">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3 shrink-0">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Uitloggen</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Mobile topbar */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border md:hidden">
          <div className="flex items-center gap-3 px-4 h-12">
            <button onClick={() => setSidebarOpen(true)} className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted">
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium">{SECTION_TITLES[activeSection] || "Admin"}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

          {/* Breadcrumb */}
          {activeSection !== "overview" && (
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveSection("overview")}
                className="inline-flex items-center gap-1.5 text-sm text-terracotta-600 hover:text-terracotta-800 font-medium transition-colors group"
              >
                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Dashboard
              </button>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-sm text-muted-foreground">{SECTION_TITLES[activeSection]}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <h1 className="text-2xl font-light text-foreground">
              {SECTION_TITLES[activeSection] || "Admin"}
            </h1>
            {activeSection === "overview" && (
              <p className="text-sm text-muted-foreground mt-0.5">Welkom terug.</p>
            )}
          </div>

          {/* ── OVERVIEW ── */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard icon={Users}     label="Klanten"            value={statsLoading ? "…" : stats.clients}     accent="border-l-sage-500"       onClick={() => handleNav("clients")} />
                <StatCard icon={BookOpen}  label="Actieve trainingen" value={statsLoading ? "…" : stats.enrollments} accent="border-l-terracotta-500" onClick={() => handleNav("trainingen")} />
                <StatCard icon={GitBranch} label="Nieuwe leads"       value={statsLoading ? "…" : stats.leads}       accent="border-l-amber-500"      badge={stats.leads > 0 ? stats.leads : undefined} onClick={() => handleNav("pipeline")} />
                <StatCard icon={ChevronRight} label="Omzet"           value={statsLoading ? "…" : `€${stats.revenue.toLocaleString("nl-NL")}`} accent="border-l-emerald-500" onClick={() => navigate("/admin/financien")} />
              </div>

              <UpcomingSessionsWidget />

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60 mb-3">
                  Snelle acties
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Pipeline",           desc: `${stats.leads} nieuwe leads`,          icon: GitBranch, section: "pipeline",   color: "bg-amber-50 text-amber-700"           },
                    { label: "Lopende trainingen", desc: "Bekijk wie in welke week zit",          icon: BookOpen,  section: "trainingen", color: "bg-terracotta-50 text-terracotta-700" },
                    { label: "Klanten",            desc: "Profielen, sessies, documenten",        icon: Users,     section: "clients",    color: "bg-sage-50 text-sage-700"             },
                  ].map(a => (
                    <Card key={a.section} className="cursor-pointer hover:shadow-md transition-all group border-warm-200" onClick={() => handleNav(a.section)}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", a.color)}>
                          <a.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{a.label}</p>
                          <p className="text-xs text-muted-foreground">{a.desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Sections ── */}
          {activeSection === "pipeline"   && <CrmPipelineSection />}
          {activeSection === "clients"    && <AdminCustomersSection initialTab="customers" />}
          {activeSection === "trainingen" && <LopendeTrainingenSection onViewDeelnemer={() => handleNav("deelnemers")} />}
          {activeSection === "deelnemers" && <DeelnemersSection />}
          {activeSection === "agenda"     && <AgendaSection />}

        </div>
      </main>
    </div>
  );
}
