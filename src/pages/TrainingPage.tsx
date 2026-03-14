// src/pages/TrainingPage.tsx
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft, Lock, CheckCircle2, Headphones, ClipboardList,
  BookOpen, FileText, Video, AlertCircle, Loader2, Calendar,
  ChevronRight, Info,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import MeditationPlayer from "@/components/participant/MeditationPlayer";
import AssignmentCard from "@/components/participant/AssignmentCard";
import PresentationViewer from "@/components/participant/PresentationViewer";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Enrollment {
  id: string;
  start_date: string;
  status: string;
  trainer_name: string | null;
  location: string | null;
  group_info: string | null;
  course_type: string;
  unlocked_weeks: number[] | null;
  visible_sections: string[];
  current_week: number;
}

interface CourseWeek {
  id: string;
  week_number: number;
  title: string;
  description: string | null;
  theme: string | null;
  content: Record<string, unknown>;
  presentation_url: string | null;
}

interface Meditation {
  id: string;
  week_id: string;
  title: string;
  description: string | null;
  audio_url: string;
  duration_minutes: number | null;
  sort_order: number;
}

interface Assignment {
  id: string;
  week_id: string;
  title: string;
  description: string | null;
  instructions: string | null;
  sort_order: number;
}

interface ParticipantProgress {
  id: string;
  meditation_id: string | null;
  assignment_id: string | null;
  completed_at: string;
  notes: string | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const COURSE_DISPLAY_NAMES: Record<string, string> = {
  msc_8week: "8-weekse Mindful Zelfcompassie Training",
  individueel_6: "Individueel Traject – 6 sessies",
  losse_sessie: "Losse Individuele Sessie",
};

const getMaxWeeks = (courseType: string): number => {
  if (courseType === "losse_sessie") return 1;
  if (courseType === "individueel_6") return 6;
  return 8;
};

/**
 * Determine which week numbers are unlocked.
 *
 * Rules:
 *  - msc_8week  → automatic: unlock 1 new week every 7 days from start_date
 *  - individueel_6 / losse_sessie → manual: use enrollment.unlocked_weeks
 */
const computeUnlockedWeeks = (enrollment: Enrollment): number[] => {
  const maxWeeks = getMaxWeeks(enrollment.course_type);

  if (enrollment.course_type !== "msc_8week") {
    // Manual unlock for individual sessions
    return enrollment.unlocked_weeks ?? [1];
  }

  // Automatic weekly unlock for group training
  const start = new Date(enrollment.start_date);
  start.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const daysPassed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const weeksCompleted = Math.floor(daysPassed / 7);
  const currentUnlock = Math.min(weeksCompleted + 1, maxWeeks); // always unlock at least week 1
  return Array.from({ length: currentUnlock }, (_, i) => i + 1);
};

const getDaysUntilNextUnlock = (startDate: string): number => {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const daysPassed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return 7 - (daysPassed % 7);
};

// ─── Week selector sidebar ───────────────────────────────────────────────────

const WeekSidebar = ({
  weeks,
  unlockedWeeks,
  selectedWeek,
  weekProgress,
  weekLabel,
  onSelect,
}: {
  weeks: CourseWeek[];
  unlockedWeeks: number[];
  selectedWeek: number;
  weekProgress: (id: string) => number;
  weekLabel: string;
  onSelect: (n: number) => void;
}) => (
  <nav className="space-y-1">
    {weeks.map((week) => {
      const unlocked = unlockedWeeks.includes(week.week_number);
      const selected = selectedWeek === week.week_number;
      const pct = weekProgress(week.id);

      return (
        <button
          key={week.id}
          onClick={() => unlocked && onSelect(week.week_number)}
          disabled={!unlocked}
          className={cn(
            "w-full text-left rounded-xl px-4 py-3 transition-all duration-150 group",
            unlocked ? "cursor-pointer" : "cursor-not-allowed opacity-50",
            selected
              ? "bg-terracotta-600 text-white shadow-sm"
              : unlocked
              ? "hover:bg-warm-100 text-foreground"
              : "text-muted-foreground"
          )}
        >
          <div className="flex items-center gap-3">
            {/* Number circle */}
            <div
              className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-colors",
                selected
                  ? "bg-white/20 text-white"
                  : unlocked
                  ? "bg-terracotta-100 text-terracotta-700 group-hover:bg-terracotta-200"
                  : "bg-warm-100 text-muted-foreground"
              )}
            >
              {!unlocked ? (
                <Lock className="h-3 w-3" />
              ) : pct === 100 ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              ) : (
                week.week_number
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className={cn("text-xs font-medium truncate", selected ? "text-white" : "text-foreground")}>
                {weekLabel} {week.week_number}
              </p>
              <p className={cn("text-xs truncate leading-tight", selected ? "text-white/70" : "text-muted-foreground")}>
                {week.title}
              </p>
            </div>

            {unlocked && pct > 0 && pct < 100 && (
              <span className={cn("text-xs shrink-0", selected ? "text-white/70" : "text-muted-foreground")}>
                {pct}%
              </span>
            )}
          </div>

          {unlocked && pct > 0 && (
            <div className="mt-2 ml-10">
              <Progress
                value={pct}
                className={cn(
                  "h-1 [&>div]:transition-all",
                  selected
                    ? "bg-white/20 [&>div]:bg-white"
                    : "bg-warm-200 [&>div]:bg-terracotta-500"
                )}
              />
            </div>
          )}
        </button>
      );
    })}
  </nav>
);

// ─── Section heading ─────────────────────────────────────────────────────────

const SectionHeading = ({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
    <Icon className="h-4 w-4 text-terracotta-500" />
    {children}
  </h3>
);

// ─── Main component ───────────────────────────────────────────────────────────

const TrainingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [weeks, setWeeks] = useState<CourseWeek[]>([]);
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [progress, setProgress] = useState<ParticipantProgress[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Data loading ───────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (cancelled) return;
        if (sessionError || !session?.user) {
          navigate("/login");
          return;
        }
        setUser(session.user);

        // Load enrollment
        const { data: enrollData, error: enrollError } = await supabase
          .from("enrollments")
          .select("*")
          .eq("id", id)
          .eq("user_id", session.user.id)
          .single();

        if (cancelled) return;
        if (enrollError || !enrollData) {
          setError("Training niet gevonden of je hebt geen toegang.");
          setLoading(false);
          return;
        }
        const enroll = enrollData as Enrollment;
        setEnrollment(enroll);

        // Load course weeks
        const { data: weeksData } = await supabase
          .from("course_weeks")
          .select("*")
          .eq("course_type", enroll.course_type)
          .order("week_number");

        if (cancelled) return;
        const courseWeeks = (weeksData ?? []) as CourseWeek[];
        setWeeks(courseWeeks);

        const weekIds = courseWeeks.map((w) => w.id);

        const [medsResult, assnResult, progResult] = await Promise.all([
          weekIds.length > 0
            ? supabase.from("meditations").select("*").in("week_id", weekIds).order("sort_order")
            : Promise.resolve({ data: [] }),
          weekIds.length > 0
            ? supabase.from("assignments").select("*").in("week_id", weekIds).order("sort_order")
            : Promise.resolve({ data: [] }),
          supabase.from("participant_progress").select("*").eq("enrollment_id", enroll.id),
        ]);

        if (cancelled) return;
        if (medsResult.data) setMeditations(medsResult.data as Meditation[]);
        if (assnResult.data) setAssignments(assnResult.data as Assignment[]);
        if (progResult.data) setProgress(progResult.data as ParticipantProgress[]);

        // Set initially selected week to the latest unlocked one
        const unlocked = computeUnlockedWeeks(enroll);
        setSelectedWeek(unlocked[unlocked.length - 1] ?? 1);
      } catch {
        if (!cancelled) setError("Er ging iets mis. Ververs de pagina.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      if (!cancelled) { setLoading(false); setError("Laden duurde te lang."); }
    }, 15000);

    init();
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [id]);

  // ── Derived values ─────────────────────────────────────────────────────

  const unlockedWeeks = useMemo(
    () => (enrollment ? computeUnlockedWeeks(enrollment) : []),
    [enrollment]
  );

  const weekLabel = enrollment?.course_type === "msc_8week" ? "Week" : "Sessie";

  const isSectionVisible = (section: string) => {
    const sections = enrollment?.visible_sections;
    if (!sections || sections.length === 0) return true;
    return sections.includes(section);
  };

  const getWeekProgress = (weekId: string): number => {
    const wm = meditations.filter((m) => m.week_id === weekId);
    const wa = assignments.filter((a) => a.week_id === weekId);
    const total = wm.length + wa.length;
    if (total === 0) return 0;
    const done =
      wm.filter((m) => progress.some((p) => p.meditation_id === m.id)).length +
      wa.filter((a) => progress.some((p) => p.assignment_id === a.id)).length;
    return Math.round((done / total) * 100);
  };

  const getTotalProgress = (): number => {
    const total = meditations.length + assignments.length;
    if (total === 0) return 0;
    const done =
      progress.filter((p) => p.meditation_id).length +
      progress.filter((p) => p.assignment_id).length;
    return Math.round((done / total) * 100);
  };

  // ── Actions ────────────────────────────────────────────────────────────

  const toggleMeditationComplete = async (meditationId: string) => {
    if (!enrollment || !user) return;
    const existing = progress.find((p) => p.meditation_id === meditationId);
    if (existing) {
      await supabase.from("participant_progress").delete().eq("id", existing.id);
      setProgress((prev) => prev.filter((p) => p.id !== existing.id));
    } else {
      const week = weeks.find((w) => meditations.find((m) => m.id === meditationId)?.week_id === w.id);
      if (!week) return;
      const { data, error } = await supabase
        .from("participant_progress")
        .insert({ user_id: user.id, enrollment_id: enrollment.id, week_id: week.id, meditation_id: meditationId })
        .select().single();
      if (!error && data) {
        setProgress((prev) => [...prev, data as ParticipantProgress]);
        toast.success("Meditatie gemarkeerd als voltooid");
      }
    }
  };

  const saveAssignmentNotes = async (assignmentId: string, notes: string) => {
    if (!enrollment || !user) return;
    const existing = progress.find((p) => p.assignment_id === assignmentId);
    const week = weeks.find((w) => assignments.find((a) => a.id === assignmentId)?.week_id === w.id);
    if (!week) return;
    if (existing) {
      const { error } = await supabase.from("participant_progress").update({ notes }).eq("id", existing.id);
      if (!error) {
        setProgress((prev) => prev.map((p) => p.id === existing.id ? { ...p, notes } : p));
        toast.success("Notities opgeslagen");
      }
    } else {
      const { data, error } = await supabase
        .from("participant_progress")
        .insert({ user_id: user.id, enrollment_id: enrollment.id, week_id: week.id, assignment_id: assignmentId, notes })
        .select().single();
      if (!error && data) {
        setProgress((prev) => [...prev, data as ParticipantProgress]);
        toast.success("Opdracht opgeslagen");
      }
    }
  };

  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-50 to-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-terracotta-400" />
          <p className="text-sm text-muted-foreground">Training laden…</p>
        </main>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────

  if (error || !enrollment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-50 to-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-md mx-auto border-warm-200">
            <CardContent className="p-10 text-center">
              <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-terracotta-100 flex items-center justify-center">
                <AlertCircle className="h-7 w-7 text-terracotta-600" />
              </div>
              <h2 className="text-xl font-light mb-2">Training niet gevonden</h2>
              <p className="text-sm text-muted-foreground mb-6">{error ?? "Er ging iets mis."}</p>
              <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-white" onClick={() => navigate("/mijn-trainingen")}>
                Terug naar dashboard
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────

  const currentWeekData = weeks.find((w) => w.week_number === selectedWeek);
  const totalProgress = getTotalProgress();
  const maxWeeks = getMaxWeeks(enrollment.course_type);
  const daysUntilNext = getDaysUntilNextUnlock(enrollment.start_date);
  const nextWeekNumber = unlockedWeeks.length + 1;
  const showNextUnlock = enrollment.course_type === "msc_8week" && nextWeekNumber <= maxWeeks;

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 via-background to-background">
      <SEO
        title={`${COURSE_DISPLAY_NAMES[enrollment.course_type] ?? "Training"} | Mindful Mind`}
        description="Jouw trainingsmateriaal"
      />
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* ── Back + title bar ── */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground w-fit -ml-2"
              onClick={() => navigate("/mijn-trainingen")}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Mijn trainingen
            </Button>
            <div className="flex-1 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-light text-foreground leading-tight">
                  {COURSE_DISPLAY_NAMES[enrollment.course_type] ?? enrollment.course_type}
                </h1>
                {enrollment.trainer_name && (
                  <p className="text-xs text-muted-foreground">Trainer: {enrollment.trainer_name}</p>
                )}
              </div>
              <Badge
                variant="outline"
                className="text-xs border-terracotta-200 text-terracotta-700 bg-terracotta-50 shrink-0"
              >
                {totalProgress}% voltooid
              </Badge>
            </div>
          </div>

          {/* ── Overall progress ── */}
          <Card className="border-warm-200 bg-white/80 shadow-sm mb-6">
            <CardContent className="px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{unlockedWeeks.length} van {maxWeeks} {weekLabel.toLowerCase()}s vrijgegeven</span>
                    <span>{totalProgress}%</span>
                  </div>
                  <Progress value={totalProgress} className="h-1.5 bg-warm-100 [&>div]:bg-terracotta-500" />
                </div>
                {showNextUnlock && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-warm-50 border border-warm-200 rounded-lg px-3 py-2 shrink-0">
                    <Calendar className="h-3.5 w-3.5 text-terracotta-500" />
                    <span>
                      {weekLabel} {nextWeekNumber} vrijgegeven over{" "}
                      <strong>{daysUntilNext} dag{daysUntilNext !== 1 ? "en" : ""}</strong>
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ── Main layout: sidebar + content ── */}
          <div className="flex gap-6 items-start">

            {/* ── Sidebar (desktop) ── */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
              <Card className="border-warm-200 bg-white/90 shadow-sm">
                <CardContent className="p-3">
                  <WeekSidebar
                    weeks={weeks}
                    unlockedWeeks={unlockedWeeks}
                    selectedWeek={selectedWeek}
                    weekProgress={getWeekProgress}
                    weekLabel={weekLabel}
                    onSelect={setSelectedWeek}
                  />
                </CardContent>
              </Card>
            </aside>

            {/* ── Mobile week picker ── */}
            <div className="lg:hidden mb-2 w-full">
              <button
                onClick={() => setSidebarOpen((o) => !o)}
                className="flex items-center justify-between w-full border border-warm-200 rounded-xl px-4 py-3 bg-white/90 text-sm"
              >
                <span className="font-medium">
                  {weekLabel} {selectedWeek}: {currentWeekData?.title ?? "–"}
                </span>
                <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", sidebarOpen && "rotate-90")} />
              </button>
              {sidebarOpen && (
                <Card className="border-warm-200 mt-1 shadow-sm">
                  <CardContent className="p-3">
                    <WeekSidebar
                      weeks={weeks}
                      unlockedWeeks={unlockedWeeks}
                      selectedWeek={selectedWeek}
                      weekProgress={getWeekProgress}
                      weekLabel={weekLabel}
                      onSelect={(n) => { setSelectedWeek(n); setSidebarOpen(false); }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* ── Week content ── */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* Locked state */}
              {currentWeekData && !unlockedWeeks.includes(currentWeekData.week_number) && (
                <Card className="border-warm-200 bg-white/80">
                  <CardContent className="p-10 text-center">
                    <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-warm-100 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-light mb-2">
                      {weekLabel} {currentWeekData.week_number} is nog vergrendeld
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {enrollment.course_type === "msc_8week"
                        ? `Dit onderdeel wordt automatisch vrijgegeven. Nog ${daysUntilNext} dag${daysUntilNext !== 1 ? "en" : ""} te gaan.`
                        : "Je trainer geeft dit onderdeel vrij wanneer je er klaar voor bent."}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Unlocked week content */}
              {currentWeekData && unlockedWeeks.includes(currentWeekData.week_number) && (
                <>
                  {/* Week header */}
                  <Card className="border-warm-200 bg-white/90 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-11 w-11 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0">
                          <span className="text-lg font-light text-terracotta-700">
                            {currentWeekData.week_number}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-light text-foreground">
                            {weekLabel} {currentWeekData.week_number}: {currentWeekData.title}
                          </h2>
                          {currentWeekData.theme && (
                            <p className="text-sm text-muted-foreground italic mt-0.5">
                              {currentWeekData.theme}
                            </p>
                          )}
                          {currentWeekData.description && (
                            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                              {currentWeekData.description}
                            </p>
                          )}
                        </div>
                        {getWeekProgress(currentWeekData.id) === 100 && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Presentation */}
                  {isSectionVisible("presentations") && currentWeekData.presentation_url && (
                    <div>
                      <SectionHeading icon={FileText}>Presentatie</SectionHeading>
                      <PresentationViewer url={currentWeekData.presentation_url} />
                    </div>
                  )}

                  {/* Meditations */}
                  {isSectionVisible("meditations") && (
                    <div>
                      <SectionHeading icon={Headphones}>
                        Meditaties
                      </SectionHeading>
                      <div className="space-y-3">
                        {meditations.filter((m) => m.week_id === currentWeekData.id).length > 0 ? (
                          meditations
                            .filter((m) => m.week_id === currentWeekData.id)
                            .map((m) => (
                              <MeditationPlayer
                                key={m.id}
                                meditation={m}
                                isCompleted={progress.some((p) => p.meditation_id === m.id)}
                                onToggleComplete={() => toggleMeditationComplete(m.id)}
                              />
                            ))
                        ) : (
                          <p className="text-sm text-muted-foreground py-1">
                            Nog geen meditaties voor deze week.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Assignments */}
                  {isSectionVisible("assignments") && (
                    <div>
                      <SectionHeading icon={ClipboardList}>
                        Opdrachten
                      </SectionHeading>
                      <div className="space-y-3">
                        {assignments.filter((a) => a.week_id === currentWeekData.id).length > 0 ? (
                          assignments
                            .filter((a) => a.week_id === currentWeekData.id)
                            .map((a) => {
                              const ap = progress.find((p) => p.assignment_id === a.id);
                              return (
                                <AssignmentCard
                                  key={a.id}
                                  assignment={a}
                                  isCompleted={!!ap}
                                  notes={ap?.notes ?? ""}
                                  onSaveNotes={(notes) => saveAssignmentNotes(a.id, notes)}
                                />
                              );
                            })
                        ) : (
                          <p className="text-sm text-muted-foreground py-1">
                            Nog geen opdrachten voor deze week.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Week nav */}
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-warm-200 text-muted-foreground"
                      disabled={selectedWeek <= 1}
                      onClick={() => setSelectedWeek((w) => w - 1)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Vorige {weekLabel.toLowerCase()}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-warm-200"
                      disabled={
                        selectedWeek >= maxWeeks ||
                        !unlockedWeeks.includes(selectedWeek + 1)
                      }
                      onClick={() => setSelectedWeek((w) => w + 1)}
                    >
                      Volgende {weekLabel.toLowerCase()}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrainingPage;
