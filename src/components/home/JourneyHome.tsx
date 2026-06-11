import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mindful.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * JourneyHome — editorial homepage as a guided journey.
 * Refined typography scale, calmer spheres, professional restraint.
 */
const JourneyHome = () => {
  const { t } = useLanguage();

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: "easeOut" as const },
  };

  return (
    <div className="relative w-full bg-[hsl(var(--warm-50))] overflow-hidden">
      {/* Ambient sage spheres — subtle, professional */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[12%] left-[8%] w-[420px] h-[420px] rounded-full bg-sage-600/10 blur-[140px]" />
        <div className="absolute top-[45%] right-[6%] w-[520px] h-[520px] rounded-full bg-sage-600/8 blur-[160px]" />
        <div className="absolute bottom-[8%] left-[15%] w-[480px] h-[480px] rounded-full bg-primary/6 blur-[160px]" />
        <div className="absolute top-[70%] right-[20%] w-[360px] h-[360px] rounded-full bg-sage-600/10 blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
        {/* Central journey line */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[240px] bottom-[240px] w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 hidden md:block"
        />

        {/* ─── 01 · Recognition (Hero) ─── */}
        <motion.section {...fadeUp} className="relative mb-28 md:mb-36 md:flex md:items-center md:justify-end">
          <div className="md:w-1/2 md:pr-14 text-left md:text-right">
            <span className="text-primary font-medium tracking-[0.22em] text-[0.7rem] uppercase block mb-5">
              {t("home.hero.startBadge")}
            </span>
            <h1 className="font-serif text-foreground text-[2.5rem] md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight mb-6">
              {t("home.hero.line1")}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-[1.75] max-w-md md:ml-auto">
              {t("home.hero.headline")}
            </p>
          </div>
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 -top-4 md:top-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_0_8px_hsl(var(--primary)/0.08)] hidden md:block"
          />
          <div className="hidden md:block md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:w-[42%]">
            <div className="relative aspect-[4/5] max-w-sm">
              <img
                src={heroImage}
                alt={t("home.hero.imageAlt") || "Mindful Mind"}
                className="w-full h-full object-cover rounded-t-[200px] shadow-xl"
                loading="eager"
              />
              <div className="absolute -bottom-5 -right-5 bg-sage-600 text-white px-5 py-4 max-w-[200px] shadow-lg rounded-sm">
                <p className="font-serif text-base italic leading-snug">
                  Zelfzorg is een vaardigheid.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── 02 · The Struggle ─── */}
        <motion.section {...fadeUp} className="relative mb-28 md:mb-36 md:flex md:items-center md:justify-start">
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sage-600 shadow-[0_0_0_8px_hsl(var(--sage-600)/0.08)] hidden md:block"
          />
          <div className="md:w-1/2 md:pl-14">
            <span className="text-sage-700 font-medium tracking-[0.22em] text-[0.7rem] uppercase block mb-5">
              Herkenning
            </span>
            <h2 className="font-serif text-foreground text-[2rem] md:text-[2.5rem] leading-[1.2] mb-6">
              Zelfkritiek is geen motivatie.<br />
              <span className="italic text-primary">Het is een blokkade.</span>
            </h2>
            <div className="bg-sage-600/5 border-l border-sage-600/60 pl-5 py-3 italic text-muted-foreground font-serif text-base md:text-lg leading-[1.7]">
              "Ik dacht dat hard zijn voor mezelf me beter maakte. Het maakte me alleen moe."
            </div>
          </div>
        </motion.section>

        {/* ─── 03 · The Method ─── */}
        <motion.section {...fadeUp} className="relative mb-28 md:mb-36">
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_0_8px_hsl(var(--primary)/0.08)] hidden md:block"
          />
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-14 shadow-sm border border-warm-200/60 max-w-3xl mx-auto mt-10 text-center">
            <span className="text-primary font-medium tracking-[0.22em] text-[0.7rem] uppercase block mb-5">
              De methode
            </span>
            <h2 className="font-serif text-foreground text-[2rem] md:text-[2.75rem] mb-6 leading-[1.15]">
              Een nieuwe manier van naar <span className="italic">jezelf</span> kijken.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-12 leading-[1.75] max-w-xl mx-auto">
              Zelfcompassie is een vaardigheid die je kunt leren. Door mindfulness en hartgerichte oefeningen
              verander je hoe je omgaat met moeilijke momenten.
            </p>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {[
                { title: "Mindfulness", body: "Aandacht zonder oordeel." },
                { title: "Menselijkheid", body: "Je staat hier niet alleen in." },
                { title: "Vriendelijkheid", body: "Warmte voor je eigen falen." },
              ].map((pillar) => (
                <div key={pillar.title} className="space-y-2">
                  <div className="text-primary font-serif text-2xl italic">{pillar.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── 04 · The Choice ─── */}
        <motion.section {...fadeUp} className="relative mb-28 md:mb-36 md:flex md:items-center md:justify-end">
          <div className="md:w-1/2 md:pr-14 text-left md:text-right">
            <span className="text-sage-700 font-medium tracking-[0.22em] text-[0.7rem] uppercase block mb-5">
              Jouw pad
            </span>
            <h2 className="font-serif text-foreground text-[2rem] md:text-[2.5rem] leading-[1.2] mb-8">
              Twee paden, <span className="italic">één bestemming.</span>
            </h2>
            <div className="space-y-3">
              <Link
                to="/coaching"
                className="group flex items-center justify-between bg-white border border-primary/80 text-primary px-7 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-[0.8rem] font-semibold tracking-[0.1em] uppercase"
              >
                <span>Individuele begeleiding</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/training"
                className="group flex items-center justify-between bg-primary text-primary-foreground px-7 py-4 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-[0.8rem] font-semibold tracking-[0.1em] uppercase"
              >
                <span>Groepstraining MSC</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sage-600 shadow-[0_0_0_8px_hsl(var(--sage-600)/0.08)] hidden md:block"
          />
        </motion.section>

        {/* ─── 05 · Proof & Invitation ─── */}
        <motion.section {...fadeUp} className="relative text-center">
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary/30 to-transparent -top-20 hidden md:block"
          />
          <div className="inline-block px-10 py-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-warm-200/60 mb-12 shadow-sm">
            <div className="max-w-md mx-auto">
              <p className="font-serif italic text-lg md:text-xl mb-3 text-foreground leading-snug">
                "Ik voel me beter toegerust om met de stormen van het leven om te gaan."
              </p>
              <span className="text-[0.7rem] tracking-[0.22em] uppercase text-muted-foreground">
                — Deelnemer MSC training
              </span>
            </div>
          </div>
          <h2 className="font-serif text-foreground text-[2.25rem] md:text-[3.25rem] mb-10 leading-[1.15]">
            Zullen we <span className="italic text-primary">beginnen?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <span className="text-primary text-sm font-medium tracking-wide">
              {t("home.hero.startBadge")}
            </span>
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-9 py-4 rounded-full text-[0.8rem] font-semibold tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors shadow-lg shadow-primary/15"
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
