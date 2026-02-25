import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Maximize, Minimize, X, Users, User } from "lucide-react";

interface CourseWeek {
  id: string;
  week_number: number;
  title: string;
  description: string | null;
  theme: string | null;
  content: Record<string, unknown>;
  course_type: string;
}

interface SlideData {
  title: string;
  subtitle?: string;
  content: string[];
  type: "title" | "content" | "split" | "closing";
  badge?: string;
}

const SessionPresentation = () => {
  const { sessionNumber } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [groupWeek, setGroupWeek] = useState<CourseWeek | null>(null);
  const [individualWeek, setIndividualWeek] = useState<CourseWeek | null>(null);
  const [slides, setSlides] = useState<SlideData[]>([]);

  useEffect(() => {
    loadSessionData();
  }, [sessionNumber]);

  const loadSessionData = async () => {
    const num = parseInt(sessionNumber || "1");
    const { data } = await supabase
      .from("course_weeks")
      .select("*")
      .eq("week_number", num);

    const weeks = (data || []) as CourseWeek[];
    const group = weeks.find(w => w.course_type === "msc_8week") || null;
    const individual = weeks.find(w => w.course_type === "individueel_6") || null;
    setGroupWeek(group);
    setIndividualWeek(individual);
    buildSlides(group, individual, num);
  };

  const buildSlides = (group: CourseWeek | null, individual: CourseWeek | null, num: number) => {
    const newSlides: SlideData[] = [];

    // Title slide
    newSlides.push({
      type: "title",
      title: `Sessie ${num}`,
      subtitle: "Mindful Zelfcompassie",
      content: [
        group ? `Groep: ${group.title}` : "",
        individual ? `Individueel: ${individual.title}` : "",
      ].filter(Boolean),
    });

    // Group session slide
    if (group) {
      newSlides.push({
        type: "content",
        badge: "Groepstraining",
        title: `Week ${num}: ${group.title}`,
        subtitle: group.theme || undefined,
        content: group.description ? [group.description] : [],
      });

      const content = group.content as Record<string, string[]>;
      if (content?.meditations?.length) {
        newSlides.push({
          type: "content",
          badge: "Groep – Meditaties",
          title: "Meditaties deze week",
          content: content.meditations,
        });
      }
      if (content?.exercises?.length) {
        newSlides.push({
          type: "content",
          badge: "Groep – Oefeningen",
          title: "Oefeningen & opdrachten",
          content: content.exercises,
        });
      }
    }

    // Individual session slide
    if (individual) {
      newSlides.push({
        type: "content",
        badge: "Individueel traject",
        title: `Sessie ${num}: ${individual.title}`,
        subtitle: individual.theme || undefined,
        content: individual.description ? [individual.description] : [],
      });
    }

    // Comparison slide if both exist
    if (group && individual) {
      newSlides.push({
        type: "split",
        title: "Groep vs. Individueel",
        content: [],
      });
    }

    // Closing slide
    newSlides.push({
      type: "closing",
      title: "Vragen?",
      subtitle: "Mindful Mind",
      content: ["Neem de tijd om te reflecteren op wat je vandaag hebt geleerd."],
    });

    setSlides(newSlides);
  };

  const goNext = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "Escape") {
        if (document.fullscreenElement) document.exitFullscreen();
        else navigate(-1);
      }
      if (e.key === "f" || e.key === "F5") { e.preventDefault(); toggleFullscreen(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, navigate]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const slide = slides[currentSlide];
  if (!slide) return null;

  return (
    <div className={`min-h-screen bg-foreground text-primary-foreground flex flex-col ${isFullscreen ? "cursor-none" : ""}`}>
      {/* Controls */}
      <div className={`flex items-center justify-between px-6 py-3 bg-foreground/90 backdrop-blur border-b border-white/10 transition-opacity ${isFullscreen ? "opacity-0 hover:opacity-100" : ""}`}>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10">
          <X className="h-4 w-4 mr-2" /> Sluiten
        </Button>
        <span className="text-sm text-primary-foreground/50 font-mono">
          {currentSlide + 1} / {slides.length}
        </span>
        <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10">
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </Button>
      </div>

      {/* Slide */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16" onClick={goNext}>
        <div className="w-full max-w-5xl">
          {slide.type === "title" && (
            <div className="text-center space-y-6">
              <div className="w-16 h-px bg-primary mx-auto" />
              <h1 className="text-5xl md:text-7xl font-light tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-xl text-primary-foreground/50 tracking-widest uppercase">{slide.subtitle}</p>
              )}
              <div className="space-y-2 mt-8">
                {slide.content.map((line, i) => (
                  <p key={i} className="text-lg text-primary-foreground/70">{line}</p>
                ))}
              </div>
              <div className="w-16 h-px bg-primary mx-auto mt-8" />
            </div>
          )}

          {slide.type === "content" && (
            <div className="space-y-8">
              {slide.badge && (
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs tracking-wider uppercase">
                  {slide.badge}
                </Badge>
              )}
              <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-lg text-primary-foreground/50 italic">{slide.subtitle}</p>
              )}
              <div className="space-y-4 max-w-3xl">
                {slide.content.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                    <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.type === "split" && (
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-light text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {slide.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                {/* Group */}
                <div className="border border-white/10 rounded-xl p-8 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Users className="h-5 w-5" />
                    <span className="text-sm tracking-wider uppercase">Groepstraining</span>
                  </div>
                  {groupWeek && (
                    <>
                      <h3 className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {groupWeek.title}
                      </h3>
                      <p className="text-primary-foreground/60 text-sm">{groupWeek.theme}</p>
                      <p className="text-primary-foreground/70 text-sm leading-relaxed">{groupWeek.description}</p>
                    </>
                  )}
                </div>
                {/* Individual */}
                <div className="border border-white/10 rounded-xl p-8 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <User className="h-5 w-5" />
                    <span className="text-sm tracking-wider uppercase">Individueel</span>
                  </div>
                  {individualWeek && (
                    <>
                      <h3 className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {individualWeek.title}
                      </h3>
                      <p className="text-primary-foreground/60 text-sm">{individualWeek.theme}</p>
                      <p className="text-primary-foreground/70 text-sm leading-relaxed">{individualWeek.description}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {slide.type === "closing" && (
            <div className="text-center space-y-6">
              <div className="w-16 h-px bg-primary mx-auto" />
              <h2 className="text-5xl md:text-7xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {slide.title}
              </h2>
              {slide.content.map((line, i) => (
                <p key={i} className="text-lg text-primary-foreground/60">{line}</p>
              ))}
              {slide.subtitle && (
                <p className="text-sm text-primary-foreground/30 tracking-widest uppercase mt-12">{slide.subtitle}</p>
              )}
              <div className="w-16 h-px bg-primary mx-auto" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className={`flex items-center justify-center gap-4 pb-6 transition-opacity ${isFullscreen ? "opacity-0 hover:opacity-100" : ""}`}>
        <Button variant="ghost" size="sm" onClick={goPrev} disabled={currentSlide === 0} className="text-primary-foreground/50 hover:text-primary-foreground hover:bg-white/10">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
              className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? "bg-primary w-6" : "bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={goNext} disabled={currentSlide === slides.length - 1} className="text-primary-foreground/50 hover:text-primary-foreground hover:bg-white/10">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SessionPresentation;
