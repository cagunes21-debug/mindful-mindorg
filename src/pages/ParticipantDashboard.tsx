// src/pages/ParticipantDashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar, ChevronRight, Clock, CheckCircle2, Lock,
  AlertCircle, Loader2, Sparkles, BookOpen,
} from "lucide-react";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────

interface Enrollment {
  id: string;
  start_date: string;
  status: string; // "active" | "completed" | "upcoming"
  trainer_name: string | null;
  location: string | null;
  group_info: string | null;
  course_type: string;
  unlocked_weeks: number[];
  visible_sections: string[];
  current_week: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const COURSE_DISPLAY_NAMES: Record<string, string> = {
  msc_8week: "8-weekse Mindful Zelfcompassie Training",
  individueel_6: "Individueel Traject – 6 sessies",
  losse_sessie: "Losse Individuele Sessie",
};

const COURSE_DURATIONS: Record<string, string> = {
  msc_8week: "8 weken",
  individueel_6: "6 sessies",
  losse_sessie: "1 sessie",
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case "active":
      return {
        label: "Actief",
        badgeClass: "bg-terracotta-100 text-terracotta-700 border-terracotta-200",
        icon: BookOpen,
        cardClass: "border-terracotta-200 hover:border-terracotta-300 hover:shadow-md",
        ctaLabel: "Ga naar training",
        ctaClass: "bg-terracotta-600 hover:bg-terracotta-700 text-white",
      };
    case "completed":
      return {
        label: "Afgerond",
        badgeClass: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle2,
        cardClass: "border-warm-200 hover:border-warm-300 hover:shadow-sm opacity-80",
        ctaLabel: "Bekijk materiaal",
        ctaClass: "border-warm-300 text-foreground hover:bg-warm-50",
      };
    case "upcoming":
      return {
        label: "Gepland",
        badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
        icon: Clock,
        cardClass: "border-warm-200 opacity-70 cursor-default",
        ctaLabel: "Nog niet gestart",
        ctaClass: "border-warm-200 text-muted-foreground cursor-not-allowed",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-warm-100 text-warm-700 border-warm-200",
        icon: BookOpen,
        cardClass: "border-warm-200 hover:shadow-sm",
        ctaLabel: "Open",
        ctaClass: "bg-terracotta-600 hover:bg-terracotta-700 text-white",
      };
  }
};

const getWeeksUnlocked = (enrollment: Enrollment): number => {
  if (enrollment.status === "upcoming") return 0;
  if (enrollment.unlocked_weeks?.length) return enrollment.unlocked_weeks.length;
  // Fallback: auto-calculate from start_date
  const start = new Date(enrollment.start_date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(Math.floor(diffDays / 7) + 1, 1), getMaxWeeks(enrollment.course_type));
};

const getMaxWeeks = (courseType: string): number => {
  if (courseType === "losse_sessie") return 1;
  if (courseType === "individueel_6") return 6;
  return 8;
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// ─── Enrollment card ────────────────────────────────────────────────────────

const EnrollmentCard = ({
  enrollment,
  onClick,
}: {
  enrollment: Enrollment;
  onClick: () => void;
}) => {
  const config = getStatusConfig(enrollment.status);
  const StatusIcon = config.icon;
  const maxWeeks = getMaxWeeks(enrollment.course_type);
  const unlockedCount = getWeeksUnlocked(enrollment);
  const progressPct = Math.round((unlockedCount / maxWeeks) * 100);
  const isUpcoming = enrollment.status === "upcoming";
  const startDate = new Date(enrollment.start_date);
  const daysUntilStart = Math.ceil(
    (startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card
      className={cn(
        "transition-all duration-200 cursor-pointer group",
        config.cardClass
      )}
      onClick={isUpcoming ? undefined : onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge
                variant="outline"
                className={cn("text-xs font-medium border", config.badgeClass)}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
              <Badge variant="outline" className="text-xs text-muted-foreground border-warm-200">
                {COURSE_DURATIONS[enrollment.course_type] ?? "–"}
              </Badge>
            </div>
            <h3 className="font-light text-lg text-foreground leading-tight">
              {COURSE_DISPLAY_NAMES[enrollment.course_type] ?? enrollment.course_type}
            </h3>
            {enrollment.trainer_name && (
              <p className="text-sm text-muted-foreground mt-1">
                Trainer: {enrollment.trainer_name}
              </p>
            )}
          </div>

          {!isUpcoming && (
            <div className="h-10 w-10 rounded-full bg-terracotta-50 border border-terracotta-100 flex items-center justify-center shrink-0 group-hover:bg-terracotta-100 transition-colors">
              <ChevronRight className="h-5 w-5 text-terracotta-600" />
            </div>
          )}
          {isUpcoming && (
            <div className="h-10 w-10 rounded-full bg-warm-50 border border-warm-200 flex items-center justify-center shrink-0">
              <Lock className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Progress bar (active / completed) */}
        {!isUpcoming && (
          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{unlockedCount} van {maxWeeks} modules vrijgegeven</span>
              <span className="font-medium text-terracotta-700">{progressPct}%</span>
            </div>
            <Progress
              value={progressPct}
              className="h-1.5 bg-warm-100 [&>div]:bg-terracotta-500"
            />
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {isUpcoming && daysUntilStart > 0 ? (
              <span>Start over {daysUntilStart} dagen — {formatDate(enrollment.start_date)}</span>
            ) : (
              <span>Gestart op {formatDate(enrollment.start_date)}</span>
            )}
          </div>

          <Button
            size="sm"
            variant={enrollment.status === "active" ? "default" : "outline"}
            className={cn("text-xs shrink-0", config.ctaClass)}
            disabled={isUpcoming}
            onClick={(e) => { e.stopPropagation(); if (!isUpcoming) onClick(); }}
          >
            {config.ctaLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// ─── Section heading ────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3">
    {children}
  </h2>
);

// ─── Main component ─────────────────────────────────────────────────────────

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        // 1. Get session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (cancelled) return;

        if (sessionError) {
          console.error("[Dashboard] Session error:", sessionError.message);
          setError("Sessie kon niet worden geladen: " + sessionError.message);
          setLoading(false);
          return;
        }

        const session = sessionData?.session;
        if (!session?.user) {
          console.warn("[Dashboard] No active session, redirecting to login");
          navigate("/login");
          return;
        }

        setUser(session.user);
        console.log("[Dashboard] Session OK, user:", session.user.email);

        // 2. Fetch enrollments
        const { data, error: fetchError } = await supabase
          .from("enrollments")
          .select("*")
          .eq("user_id", session.user.id)
          .order("start_date", { ascending: false });

        if (cancelled) return;

        if (fetchError) {
          console.error("[Dashboard] Enrollments error:", fetchError.message, fetchError.details);
          setError("Kon trainingen niet ophalen: " + fetchError.message);
          setLoading(false);
          return;
        }

        console.log("[Dashboard] Enrollments fetched:", data?.length ?? 0, data);
        setEnrollments((data ?? []) as Enrollment[]);

      } catch (err) {
        console.error("[Dashboard] Caught error:", err);
        if (!cancelled) {
          setError("Onverwachte fout: " + (err instanceof Error ? err.message : String(err)));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    init();
    return () => { cancelled = true; };
  }, [navigate]);

  const firstName = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ")[0]
    : user?.email?.split("@")[0] ?? "";

  const active = enrollments.filter((e) => e.status === "active");
  const completed = enrollments.filter((e) => e.status === "completed");
  const upcoming = enrollments.filter((e) => e.status === "upcoming");

  // ── Loading ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-50 to-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-terracotta-400" />
          <p className="text-muted-foreground text-sm tracking-wide">Laden…</p>
        </main>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-50 to-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-md mx-auto border-warm-200">
            <CardContent className="p-10 text-center">
              <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-terracotta-100 flex items-center justify-center">
                <AlertCircle className="h-7 w-7 text-terracotta-600" />
              </div>
              <h2 className="text-xl font-light mb-2">Er ging iets mis</h2>
              <p className="text-sm text-muted-foreground mb-2">{error}</p>
              <p className="text-xs text-muted-foreground mb-6">Open de browserconsole (F12) voor meer details.</p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" className="border-warm-200" onClick={() => window.location.reload()}>
                  Verversen
                </Button>
                <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-white" onClick={() => navigate("/login")}>
                  Opnieuw inloggen
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Main ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 via-background to-background">
      <SEO title="Mijn trainingen | Mindful Mind" description="Jouw persoonlijke dashboard" />
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* ── Welcome header ── */}
          <div className="space-y-1">
            <p className="text-xs tracking-widest uppercase text-muted-foreground font-medium">
              Welkom terug
            </p>
            <h1 className="text-3xl font-light text-foreground">
              Hoi{firstName ? `, ${firstName}` : ""}
              <span className="font-serif italic text-terracotta-600 ml-2">🌿</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              Hieronder vind je een overzicht van al jouw trainingen. Klik op een actieve training
              om verder te gaan waar je gebleven was.
            </p>
          </div>

          {/* ── No enrollments ── */}
          {enrollments.length === 0 && (
            <Card className="border-warm-200 bg-white/80">
              <CardContent className="p-10 text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-warm-100 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-light mb-2">Nog geen trainingen</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Je bent nog niet ingeschreven voor een training.
                </p>
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                  <a href="/">Bekijk het aanbod</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* ── Active trainings ── */}
          {active.length > 0 && (
            <section>
              <SectionLabel>Actieve trainingen</SectionLabel>
              <div className="space-y-3">
                {active.map((e) => (
                  <EnrollmentCard
                    key={e.id}
                    enrollment={e}
                    onClick={() => navigate(`/training/${e.id}`)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ── Upcoming trainings ── */}
          {upcoming.length > 0 && (
            <section>
              <SectionLabel>Geplande trainingen</SectionLabel>
              <div className="space-y-3">
                {upcoming.map((e) => (
                  <EnrollmentCard
                    key={e.id}
                    enrollment={e}
                    onClick={() => navigate(`/training/${e.id}`)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ── Completed trainings ── */}
          {completed.length > 0 && (
            <section>
              <SectionLabel>Afgeronde trainingen</SectionLabel>
              <div className="space-y-3">
                {completed.map((e) => (
                  <EnrollmentCard
                    key={e.id}
                    enrollment={e}
                    onClick={() => navigate(`/training/${e.id}`)}
                  />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ParticipantDashboard;
