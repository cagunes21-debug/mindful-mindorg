import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mindful.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * JourneyHome — the homepage as a guided emotional journey.
 * Six milestones connected by a soft central path, with blurred sage
 * spheres breathing behind the line. Editorial, warm, intentional.
 */
const JourneyHome = () => {
  const { t } = useLanguage();

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="relative w-full bg-[hsl(var(--warm-50))] overflow-hidden">
      {/* Ambient sage spheres breathing behind the journey */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[12%] left-[8%] w-[420px] h-[420px] rounded-full bg-sage-600/20 blur-[120px]" />
        <div className="absolute top-[45%] right-[6%] w-[520px] h-[520px] rounded-full bg-sage-600/15 blur-[140px]" />
        <div className="absolute bottom-[8%] left-[15%] w-[480px] h-[480px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute top-[70%] right-[20%] w-[360px] h-[360px] rounded-full bg-sage-600/20 blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Central journey line */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[280px] bottom-[280px] w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2 hidden md:block"
        />

        {/* ─── 01 · Recognition (Hero) ─── */}
        <motion.section {...fadeUp} className="relative mb-32 md:mb-40 md:flex md:items-center md:justify-end">
          <div className="md:w-1/2 md:pr-16 text-left md:text-right">
            <span className="text-primary font-semibold tracking-[0.25em] text-xs uppercase block mb-6">
              {t("home.hero.startBadge")}
            </span>
            <h1 className="font-serif text-foreground text-5xl md:text-7xl leading-[1.05] tracking-tight mb-8">
              {t("home.hero.line1")}
            </h1>
            <p className="text-lg text-muted-foreground leading-[1.8] max-w-md md:ml-auto">
              {t("home.hero.headline")}
            </p>
          </div>
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 -top-4 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_0_10px_hsl(var(--primary)/0.12)] hidden md:block"
          />
          {/* Hero image floating on opposite side */}
          <div className="hidden md:block md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:w-[42%]">
            <div className="relative aspect-[4/5] max-w-sm">
              <img
                src={heroImage}
                alt={t("home.hero.imageAlt") || "Mindful Mind"}
                className="w-full h-full object-cover rounded-t-[200px] shadow-2xl"
                loading="eager"
              />
              <div className="absolute -bottom-6 -right-6 bg-sage-600 text-white p-6 max-w-[220px] shadow-xl rounded-sm">
                <p className="font-serif text-xl italic leading-snug">
                  Zelfzorg is een vaardigheid.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── 02 · The Struggle ─── */}
        <motion.section {...fadeUp} className="relative mb-32 md:mb-40 md:flex md:items-center md:justify-start">
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sage-600 shadow-[0_0_0_10px_hsl(var(--sage-600)/0.12)] hidden md:block"
          />
          <div className="md:w-1/2 md:pl-16">
            <span className="text-sage-700 font-semibold tracking-[0.25em] text-xs uppercase block mb-6">
              Herkenning
            </span>
            <h2 className="font-serif text-foreground text-4xl md:text-5xl leading-[1.15] mb-8">
              Zelfkritiek is geen motivatie.<br />
              <span className="italic text-primary">Het is een blokkade.</span>
            </h2>
            <div className="bg-sage-600/5 border-l-2 border-sage-600 p-6 italic text-muted-foreground font-serif text-lg leading-[1.7]">
              "Ik dacht dat hard zijn voor mezelf me beter maakte. Het maakte me alleen moe."
            </div>
          </div>
        </motion.section>

        {/* ─── 03 · The Method ─── */}
        <motion.section {...fadeUp} className="relative mb-32 md:mb-40">
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full bg-primary shadow-[0_0_0_10px_hsl(var(--primary)/0.12)] hidden md:block"
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-sm border border-primary/10 max-w-3xl mx-auto mt-12 text-center">
            <span className="text-primary font-semibold tracking-[0.25em] text-xs uppercase block mb-6">
              De methode
            </span>
            <h2 className="font-serif text-foreground text-4xl md:text-6xl mb-8 leading-tight">
              Een nieuwe manier van naar <span className="italic">jezelf</span> kijken.
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-[1.8] max-w-xl mx-auto">
              Zelfcompassie is een vaardigheid die je kunt leren. Door mindfulness en hartgerichte oefeningen
              verander je hoe je omgaat met moeilijke momenten.
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: "Mindfulness", body: "Aandacht zonder oordeel." },
                { title: "Menselijkheid", body: "Je staat hier niet alleen in." },
                { title: "Vriendelijkheid", body: "Warmte voor je eigen falen." },
              ].map((pillar) => (
                <div key={pillar.title} className="space-y-2">
                  <div className="text-primary font-serif text-3xl italic">{pillar.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── 04 · The Choice ─── */}
        <motion.section {...fadeUp} className="relative mb-32 md:mb-40 md:flex md:items-center md:justify-end">
          <div className="md:w-1/2 md:pr-16 text-left md:text-right">
            <span className="text-sage-700 font-semibold tracking-[0.25em] text-xs uppercase block mb-6">
              Jouw pad
            </span>
            <h2 className="font-serif text-foreground text-4xl md:text-5xl leading-[1.15] mb-10">
              Twee paden, <span className="italic">één bestemming.</span>
            </h2>
            <div className="space-y-5">
              <Link
                to="/coaching"
                className="group flex items-center justify-between bg-white border border-primary text-primary px-8 py-5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-semibold tracking-wide uppercase"
              >
                <span>Individuele begeleiding</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/training"
                className="group flex items-center justify-between bg-primary text-primary-foreground px-8 py-5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm font-semibold tracking-wide uppercase"
              >
                <span>Groepstraining MSC</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sage-600 shadow-[0_0_0_10px_hsl(var(--sage-600)/0.12)] hidden md:block"
          />
        </motion.section>

        {/* ─── 05 · Proof & Invitation ─── */}
        <motion.section {...fadeUp} className="relative text-center">
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/40 to-transparent -top-24 hidden md:block"
          />
          <div className="inline-block px-12 py-10 bg-white/80 backdrop-blur-sm rounded-full border border-primary/10 mb-14 shadow-sm">
            <div className="max-w-sm mx-auto">
              <p className="font-serif italic text-2xl mb-4 text-foreground leading-snug">
                "Ik voel me beter toegerust om met de stormen van het leven om te gaan."
              </p>
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
                — Deelnemer MSC training
              </span>
            </div>
          </div>
          <h2 className="font-serif text-foreground text-5xl md:text-7xl mb-12 leading-tight">
            Zullen we <span className="italic text-primary">beginnen?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <span className="text-primary text-sm font-medium tracking-wide">
              {t("home.hero.startBadge")}
            </span>
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-10 py-5 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20"
            >
              Plan een kennismaking
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default JourneyHome;
