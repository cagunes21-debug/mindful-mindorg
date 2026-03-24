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

interface Enrollment {
  id: string;
  start_date: string;
  status: string;
  trainer_name: string | null;
  location: string | null;
  group_info: string | null;
  course_type: string;
  unlocked_weeks: number[];
  visible_sections: string[];
  current_week: number;
}

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

const getMaxWeeks = (courseType: string) => {
  if (courseType === "losse_sessie") return 1;
  if (courseType === "individueel_6") return 6;
  return 8;
};

const getWeeksUnlocked = (enrollment: Enrollment): number => {
  if (enrollment.status === "upcoming") return 0;
  if (enrollment.unlocked_weeks?.length) return enrollment.unlocked_weeks.length;
  const start = new Date(enrollment.start_date);
  const diffDays = Math.floor((new Date().getTime() - start.getTime()) / 86400000);
  return Math.min(Math.max(Math.floor(diffDays / 7) + 1, 1), getMaxWeeks(enrollment.course_type));
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

const getStatusConfig = (status: string) => {
  switch (status) {
    case "active":    return { label: "Actief",   badgeClass: "bg-terracotta-100 text-terracotta-700 border-terracotta-200", icon: BookOpen,      cardClass: "border-terracotta-200 hover:border-terracotta-300 hover:shadow-md", ctaLabel: "Ga naar training",  ctaClass: "bg-terracotta-600 hover:bg-terracotta-700 text-white", clickable: true  };
    case "completed": return { label: "Afgerond", badgeClass: "bg-green-100 text-green-700 border-green-200",                icon: CheckCircle2,  cardClass: "border-warm-200 hover:shadow-sm opacity-80",                         ctaLabel: "Bekijk materiaal",  ctaClass: "border-warm-300 text-foreground hover:bg-warm-50",     clickable: true  };
    case "upcoming":  return { label: "Gepland",  badgeClass: "bg-blue-100 text-blue-700 border-blue-200",                  icon: Clock,         cardClass: "border-warm-200 opacity-70",                                          ctaLabel: "Nog niet gestart", ctaClass: "border-warm-200 text-muted-foreground",                 clickable: false };
    default:          return { label: status,     badgeClass: "bg-warm-100 text-warm-700 border-warm-200",                  icon: BookOpen,      cardClass: "border-warm-200 hover:shadow-sm",                                     ctaLabel: "Open",             ctaClass: "bg-terracotta-600 hover:bg-terracotta-700 text-white", clickable: true  };
  }
};

const EnrollmentCard = ({ enrollment, onClick }: { enrollment: Enrollment; onClick: () => void }) => {
  const cfg = getStatusConfig(enrollment.status);
  const Icon = cfg.icon;
  const max = getMaxWeeks(enrollment.course_type);
  const unlocked = getWeeksUnlocked(enrollment);
  const pct = Math.round((unlocked / max) * 100);
  const isUpcoming = enrollment.status === "upcoming";
  const daysUntil = Math.ceil((new Date(enrollment.start_date).getTime() - Date.now()) / 86400000);

  return (
    <Card
      className={cn("transition-all duration-200 group", cfg.clickable ? "cursor-pointer" : "cursor-default", cfg.cardClass)}
      onClick={cfg.clickable ? onClick : undefined}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className={cn("text-xs font-medium border", cfg.badgeClass)}>
                <Icon className="h-3 w-3 mr-1" />{cfg.label}
              </Badge>
              <Badge variant="outline" className="text-xs text-muted-foreground border-warm-200">
                {COURSE_DURATIONS[enrollment.course_type] ?? "–"}
              </Badge>
            </div>
            <h3 className="font-light text-lg text-foreground leading-tight">
              {COURSE_DISPLAY_NAMES[enrollment.course_type] ?? enrollment.course_type}
            </h3>
            {enrollment.trainer_name && (
              <p className="text-sm text-muted-foreground mt-1">Trainer: {enrollment.trainer_name}</p>
            )}
          </div>
          <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors", cfg.clickable ? "bg-terracotta-50 border border-terracotta-100 group-hover:bg-terracotta-100" : "bg-warm-50 border border-warm-200")}>
            {isUpcoming ? <Lock className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-terracotta-600" />}
          </div>
        </div>

        {!isUpcoming && (
          <div className="mb-4 space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{unlocked} van {max} modules vrijgegeven</span>
              <span className="font-medium text-terracotta-700">{pct}%</span>
            </div>
            <Progress value={pct} className="h-1.5 bg-warm-100 [&>div]:bg-terracotta-500" />
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {isUpcoming && daysUntil > 0
              ? <span>Start over {daysUntil} dagen — {formatDate(enrollment.start_date)}</span>
              : <span>Gestart op {formatDate(enrollment.start_date)}</span>
            }
          </div>
          <Button size="sm" variant={enrollment.status === "active" ? "default" : "outline"} className={cn("text-xs shrink-0", cfg.ctaClass)} disabled={isUpcoming}
            onClick={(e) => { e.stopPropagation(); if (cfg.clickable) onClick(); }}>
            {cfg.ctaLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3">{children}</h2>
);

// ─── Main ────────────────────────────────────────────────────────────────────

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    let cancelled = false;

    const checkAdminAndRedirect = async (sessionUser: User) => {
      try {
        const { data } = await supabase.rpc("has_role", { _user_id: sessionUser.id, _role: "admin" });
        if (data === true && !cancelled) {
          navigate("/admin", { replace: true });
          return true;
        }
      } catch {}
      return false;
    };

    const fetchEnrollments = async (sessionUser: User) => {
      try {
        const { data, error: fetchError } = await supabase
          .from("enrollments")
          .select("*")
          .eq("user_id", sessionUser.id)
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

    // 1. Listen for auth changes (handles post-login redirect)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (cancelled) return;
        console.log("[Dashboard] onAuthStateChange:", event);
        if (session?.user) {
          setUser(session.user);
          // Check admin first, then fetch enrollments
          setTimeout(async () => {
            const isAdmin = await checkAdminAndRedirect(session.user);
            if (!isAdmin) fetchEnrollments(session.user);
          }, 0);
        }
      }
    );

    // 2. Then check persisted session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      if (session?.user) {
        setUser(session.user);
        console.log("[Dashboard] Session OK, user:", session.user.email);
        fetchEnrollments(session.user);
      } else if (!cancelled) {
        console.warn("[Dashboard] No active session, redirecting to login");
        setLoading(false);
        navigate("/login");
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const firstName = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ")[0]
    : user?.email?.split("@")[0] ?? "";

  const active   = enrollments.filter((e) => e.status === "active");
  const completed = enrollments.filter((e) => e.status === "completed");
  const upcoming  = enrollments.filter((e) => e.status === "upcoming");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-50 to-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-terracotta-400" />
          <p className="text-muted-foreground text-sm">Laden…</p>
        </main>
      </div>
    );
  }

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
                <Button variant="outline" className="border-warm-200" onClick={() => window.location.reload()}>Verversen</Button>
                <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-white" onClick={() => navigate("/login")}>Opnieuw inloggen</Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 via-background to-background">
      <SEO title="Mijn trainingen | Mindful Mind" description="Jouw persoonlijke dashboard" />
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="space-y-1">
            <p className="text-xs tracking-widest uppercase text-muted-foreground font-medium">Welkom terug</p>
            <h1 className="text-3xl font-light text-foreground">
              Hoi{firstName ? `, ${firstName}` : ""}
              <span className="font-serif italic text-terracotta-600 ml-2">🌿</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              Hieronder vind je een overzicht van al jouw trainingen. Klik op een actieve training om verder te gaan.
            </p>
          </div>

          {enrollments.length === 0 && (
            <Card className="border-warm-200 bg-white/80">
              <CardContent className="p-10 text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-warm-100 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-light mb-2">Nog geen trainingen</h2>
                <p className="text-sm text-muted-foreground mb-6">Je bent nog niet ingeschreven voor een training.</p>
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white">
                  <a href="/">Bekijk het aanbod</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {active.length > 0 && (
            <section>
              <SectionLabel>Actieve trainingen</SectionLabel>
              <div className="space-y-3">
                {active.map((e) => <EnrollmentCard key={e.id} enrollment={e} onClick={() => navigate(`/training/${e.id}`)} />)}
              </div>
            </section>
          )}

          {upcoming.length > 0 && (
            <section>
              <SectionLabel>Geplande trainingen</SectionLabel>
              <div className="space-y-3">
                {upcoming.map((e) => <EnrollmentCard key={e.id} enrollment={e} onClick={() => navigate(`/training/${e.id}`)} />)}
              </div>
            </section>
          )}

          {completed.length > 0 && (
            <section>
              <SectionLabel>Afgeronde trainingen</SectionLabel>
              <div className="space-y-3">
                {completed.map((e) => <EnrollmentCard key={e.id} enrollment={e} onClick={() => navigate(`/training/${e.id}`)} />)}
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
