import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Maximize, Minimize, X } from "lucide-react";

interface SlideData {
  title: string;
  subtitle?: string;
  content: string[];
  type: "title" | "content" | "split" | "closing" | "steps" | "table";
  badge?: string;
  tableData?: { col1: string; col2: string; col3?: string }[];
  quote?: string;
  note?: string;
}

const slides: SlideData[] = [
  {
    type: "title",
    title: "De Kracht van Zelfcompassie",
    subtitle: "Een praktische introductie tot Mindful Self-Compassion (MSC)",
    content: ["Een gids voor veerkracht en vriendelijkheid in tijden van stress."],
  },
  {
    type: "content",
    badge: "Welkom",
    title: "Jouw Innerlijke Avontuur",
    content: [
      "Het is een avontuur. We betreden onbekend terrein. Soms ontdek je nieuwe kanten van jezelf.",
      "Het is een experiment. Je hoeft niets te 'bereiken'. Wees nieuwsgierig naar wat er gebeurt, zonder oordeel.",
      "Wees je eigen leraar. Luister naar jezelf. De vraag is steeds: Wat werkt voor mij?",
    ],
    quote: "\"Loop langzaam, ga verder.\"",
  },
  {
    type: "table",
    badge: "Veiligheid",
    title: "Veiligheid Eerst: De Zones van Tolerantie",
    content: ["Check-in: Waar bevind ik mij op dit moment?"],
    tableData: [
      { col1: "🟢 GROEN: VEILIG", col2: "🟠 ORANJE: UITGEDAAGD", col3: "🔴 ROOD: OVERWELDIGD" },
      { col1: "Kalm, verbonden, ontspannen spieren.", col2: "Alert, gemotiveerd, in de groeizone. Hier leren we.", col3: "Angst, blokkade, racende gedachten. Hier stoppen we." },
    ],
  },
  {
    type: "steps",
    badge: "Grounding",
    title: "Terugkeren naar Veiligheid",
    subtitle: "Wat te doen als je je overweldigd voelt?",
    content: [
      "1. Voeten: Voel je voeten stevig op de grond.",
      "2. Adem: Neem drie diepe, langzame ademhalingen.",
      "3. Oriëntatie: Kijk om je heen en benoem drie voorwerpen die je ziet.",
    ],
    quote: "\"Wat heb ik nu nodig om me veilig te voelen?\"",
  },
  {
    type: "content",
    badge: "Definitie",
    title: "Wat is Zelfcompassie?",
    subtitle: "Behandel jezelf zoals je een goede vriend zou behandelen die het moeilijk heeft.",
    content: [
      "Zien dat je lijdt (Erkenning)",
      "Voelen dat dit ongemak oké is (Validatie)",
      "De wens om het te verzachten (Actie)",
    ],
  },
  {
    type: "table",
    badge: "De Drie Pijlers",
    title: "De Drie Pijlers van Zelfcompassie",
    content: ["Deze drie elementen moeten samenwerken voor ware veerkracht."],
    tableData: [
      { col1: "Mindfulness", col2: "Zelfvriendelijkheid", col3: "Gedeelde Menselijkheid" },
      { col1: "vs. Over-identificatie", col2: "vs. Zelfoordeel", col3: "vs. Isolatie" },
    ],
  },
  {
    type: "split",
    badge: "Yin & Yang",
    title: "Yin en Yang: Teder & Krachtig",
    content: [],
    tableData: [
      { col1: "Troosten", col2: "Beschermen" },
      { col1: "Geruststellen", col2: "Grenzen stellen" },
      { col1: "Valideren", col2: "Motiveren" },
    ],
    quote: "\"Een sterke rug en een zachte voorkant.\"",
  },
  {
    type: "table",
    badge: "Mythes",
    title: "Feit versus Fictie",
    content: [],
    tableData: [
      { col1: "Het is zelfmedelijden.", col2: "Nee, het zorgt voor perspectief. Je ziet dat iedereen lijdt." },
      { col1: "Het maakt me zwak.", col2: "Onderzoek toont aan dat het veerkracht vergroot." },
      { col1: "Het is egoïstisch.", col2: "Het helpt je beter voor anderen te zorgen." },
    ],
  },
  {
    type: "content",
    badge: "Wetenschap",
    title: "Wat zegt de wetenschap?",
    subtitle: "Gebaseerd op >3000 studies (o.a. Neff & Germer)",
    content: [
      "Minder depressie, angst en stress.",
      "Meer levenstevredenheid.",
      "Betere fysieke gezondheid.",
      "Minder angst om te falen.",
      "Verhoogde sociale verbondenheid.",
    ],
  },
  {
    type: "content",
    badge: "Praktijk",
    title: "The Self-Compassion Break",
    subtitle: "Een EHBO-kit voor stressvolle momenten.",
    content: [
      "Kies een situatie die mild tot matig stressvol is.",
    ],
    note: "Let op: Begin niet met een groot trauma. We oefenen in de veilige zone.",
  },
  {
    type: "steps",
    badge: "Stap 1",
    title: "Mindfulness",
    subtitle: "Erken het moment.",
    content: [
      "Breng je aandacht naar wat je voelt, zonder oordeel. Benoem het.",
      "\"Dit is een moment van lijden.\"",
      "\"Dit doet pijn.\"",
      "\"Dit is stressvol.\"",
    ],
  },
  {
    type: "steps",
    badge: "Stap 2",
    title: "Gedeelde Menselijkheid",
    subtitle: "Je bent niet alleen.",
    content: [
      "Herinner jezelf eraan dat ongemak bij het leven hoort.",
      "\"Lijden hoort bij het mens-zijn.\"",
      "\"Anderen zouden zich in deze situatie precies zo voelen.\"",
      "\"Ik ben hierin niet alleen.\"",
    ],
  },
  {
    type: "steps",
    badge: "Stap 3",
    title: "Zelfvriendelijkheid",
    subtitle: "Geef jezelf wat je nodig hebt.",
    content: [
      "Vraag jezelf af: wat zou ik nu tegen een goede vriend zeggen?",
      "\"Mag ik mezelf de vriendelijkheid geven die ik nodig heb.\"",
      "\"Ik ben er voor je.\"",
      "\"Het is oké, je kunt dit aan.\"",
    ],
  },
  {
    type: "content",
    badge: "Soothing Touch",
    title: "Fysieke Troost",
    subtitle: "Laat je lichaam weten dat je veilig bent.",
    content: [
      "Fysieke aanraking kalmeert direct ons zenuwstelsel en verlaagt cortisol.",
      "Leg een hand op je hart of op je buik.",
      "Masseer zachtjes de plek waar je spanning voelt.",
      "Voel de warmte van je hand.",
    ],
  },
  {
    type: "closing",
    title: "Voor Dagelijks Gebruik",
    subtitle: "Mindful Mind",
    content: [
      "Informeel oefenen: Doe het terwijl je wacht of wandelt.",
      "Geen strijd: Als het een gevecht wordt, doe een stap terug.",
      "Loop langzaam, ga verder.",
    ],
    quote: "\"De belangrijkste vraag: Wat heb ik nu nodig?\"",
  },
];

const SelfCompassionPresentation = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goNext = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
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
  }, [goNext, goPrev, navigate, toggleFullscreen]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const slide = slides[currentSlide];

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

          {(slide.type === "content" || slide.type === "steps") && (
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
              {slide.note && (
                <div className="mt-6 p-4 rounded-lg border border-amber-500/30 bg-amber-500/10 max-w-3xl">
                  <p className="text-sm text-amber-200/80">{slide.note}</p>
                </div>
              )}
              {slide.quote && (
                <p className="text-xl text-primary/80 italic mt-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {slide.quote}
                </p>
              )}
            </div>
          )}

          {slide.type === "table" && (
            <div className="space-y-8">
              {slide.badge && (
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs tracking-wider uppercase">
                  {slide.badge}
                </Badge>
              )}
              <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {slide.title}
              </h2>
              {slide.tableData && (
                <div className={`grid ${slide.tableData[0]?.col3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4 mt-8`}>
                  {slide.tableData.map((row, ri) => (
                    <>
                      <div key={`${ri}-1`} className={`p-6 rounded-xl border border-white/10 ${ri === 0 ? "bg-white/5 font-medium" : ""}`}>
                        <p className="text-primary-foreground/80">{row.col1}</p>
                      </div>
                      <div key={`${ri}-2`} className={`p-6 rounded-xl border border-white/10 ${ri === 0 ? "bg-white/5 font-medium" : ""}`}>
                        <p className="text-primary-foreground/80">{row.col2}</p>
                      </div>
                      {row.col3 && (
                        <div key={`${ri}-3`} className={`p-6 rounded-xl border border-white/10 ${ri === 0 ? "bg-white/5 font-medium" : ""}`}>
                          <p className="text-primary-foreground/80">{row.col3}</p>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              )}
              {slide.content.length > 0 && (
                <div className="space-y-3 mt-6">
                  {slide.content.map((item, i) => (
                    <p key={i} className="text-lg text-primary-foreground/60 italic">{item}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {slide.type === "split" && (
            <div className="space-y-8">
              {slide.badge && (
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs tracking-wider uppercase">
                  {slide.badge}
                </Badge>
              )}
              <h2 className="text-4xl md:text-5xl font-light text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {slide.title}
              </h2>
              {slide.tableData && (
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="border border-white/10 rounded-xl p-8 space-y-4">
                    <h3 className="text-xl text-primary tracking-wider uppercase">De Zachte Kant (Yin)</h3>
                    <p className="text-primary-foreground/50 italic">"Ik ben er voor je."</p>
                    {slide.tableData.map((row, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/60" />
                        <p className="text-primary-foreground/80">{row.col1}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border border-white/10 rounded-xl p-8 space-y-4">
                    <h3 className="text-xl text-primary tracking-wider uppercase">De Krachtige Kant (Yang)</h3>
                    <p className="text-primary-foreground/50 italic">"Nee, dit accepteer ik niet."</p>
                    {slide.tableData.map((row, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/60" />
                        <p className="text-primary-foreground/80">{row.col2}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {slide.quote && (
                <p className="text-xl text-primary/80 italic text-center mt-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {slide.quote}
                </p>
              )}
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
              {slide.quote && (
                <p className="text-2xl text-primary/80 italic mt-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {slide.quote}
                </p>
              )}
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

export default SelfCompassionPresentation;
