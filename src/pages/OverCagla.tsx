import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { useLanguage } from "@/i18n/LanguageContext";

const Divider = () => (
  <div className="flex items-center justify-center gap-5 py-4 max-w-[720px] mx-auto px-6">
    <div className="flex-1 max-w-[80px] h-px bg-warm-300/30" />
    <span className="text-warm-400/50 text-lg">◆</span>
    <div className="flex-1 max-w-[80px] h-px bg-warm-300/30" />
  </div>
);

const HtmlText = ({ html, className }: { html: string; className?: string }) => (
  <p className={className} dangerouslySetInnerHTML={{ __html: html.replace(/<strong>/g, '<strong class="text-foreground font-medium">') }} />
);

const HtmlTextLight = ({ html, className }: { html: string; className?: string }) => (
  <p className={className} dangerouslySetInnerHTML={{ __html: html.replace(/<strong>/g, '<strong class="text-warm-100 font-medium">') }} />
);

const OverCagla = () => {
  const { t } = useLanguage();

  const places = [
    { name: t("overCagla.places.netherlands"), label: t("overCagla.places.netherlandsLabel") },
    { name: t("overCagla.places.germany"), label: t("overCagla.places.germanyLabel") },
    { name: t("overCagla.places.spain"), label: t("overCagla.places.spainLabel") },
    { name: t("overCagla.places.mexico"), label: t("overCagla.places.mexicoLabel") },
    { name: t("overCagla.places.turkey"), label: t("overCagla.places.turkeyLabel") },
  ];

  return (
    <div className="min-h-screen bg-warm-50">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title={t("overCagla.seoTitle")}
        description={t("overCagla.seoDescription")}
        canonical="https://mindfulmind.nl/over-cagla"
      />
      <Navigation />

      {/* ═══════ OPENING ═══════ */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--sage-200) / 0.15) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }} className="text-xs font-medium tracking-[0.2em] uppercase text-sage-600 mb-10">
            {t("overCagla.storyOf")}
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.8 }} className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-foreground mb-6">
            Çağla <span className="font-serif italic text-terracotta-600">Güneş</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.1 }} className="text-xl font-light italic text-warm-500 max-w-[500px] leading-relaxed">
            {t("overCagla.subtitle")}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.8 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
          <span className="text-[0.65rem] tracking-[0.15em] uppercase text-warm-400">{t("overCagla.readMore")}</span>
          <div className="w-px h-10 bg-gradient-to-b from-warm-400 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ═══════ CHAPTER I ═══════ */}
      <div className="py-28 lg:py-32 px-6 max-w-[720px] mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-5 h-px bg-sage-500" />
            <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-sage-600">{t("overCagla.chapter1Label")}</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-foreground mb-10">
            {t("overCagla.chapter1Title")} <span className="font-serif italic text-terracotta-600">{t("overCagla.chapter1TitleAccent")}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}><HtmlText html={t("overCagla.chapter1P1")} className="text-xl font-light text-muted-foreground leading-[2] mb-7" /></ScrollReveal>
        <ScrollReveal delay={0.15}><HtmlText html={t("overCagla.chapter1P2")} className="text-xl font-light text-muted-foreground leading-[2] mb-7" /></ScrollReveal>
        <ScrollReveal delay={0.2}><p className="text-xl font-light text-muted-foreground leading-[2]">{t("overCagla.chapter1P3")}</p></ScrollReveal>
      </div>

      <Divider />

      {/* ═══════ CHAPTER II ═══════ */}
      <div className="py-28 lg:py-32 px-6 max-w-[720px] mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-5 h-px bg-sage-500" />
            <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-sage-600">{t("overCagla.chapter2Label")}</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-foreground mb-10">
            {t("overCagla.chapter2Title")} <span className="font-serif italic text-terracotta-600">{t("overCagla.chapter2TitleAccent")}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}><HtmlText html={t("overCagla.chapter2P1")} className="text-xl font-light text-muted-foreground leading-[2] mb-7" /></ScrollReveal>
        <ScrollReveal delay={0.15}><p className="text-xl font-light text-muted-foreground leading-[2]">{t("overCagla.chapter2P2")}</p></ScrollReveal>
      </div>

      {/* ═══════ PLACES RIBBON ═══════ */}
      <div className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-100/50 to-transparent pointer-events-none" />
        <div className="flex justify-center gap-8 md:gap-16 flex-wrap relative">
          {places.map((place, i) => (
            <ScrollReveal key={place.name} delay={i * 0.08}>
              <div className="text-center">
                <p className="text-2xl font-light italic text-foreground mb-1">{place.name}</p>
                <p className="text-[0.65rem] tracking-[0.15em] uppercase text-warm-500">{place.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Divider />

      {/* ═══════ CHAPTER III ═══════ */}
      <div className="py-28 lg:py-32 px-6 max-w-[720px] mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-5 h-px bg-sage-500" />
            <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-sage-600">{t("overCagla.chapter3Label")}</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-foreground mb-10">
            {t("overCagla.chapter3Title")} <span className="font-serif italic text-terracotta-600">{t("overCagla.chapter3TitleAccent")}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}><HtmlText html={t("overCagla.chapter3P1")} className="text-xl font-light text-muted-foreground leading-[2] mb-7" /></ScrollReveal>
        <ScrollReveal delay={0.15}><HtmlText html={t("overCagla.chapter3P2")} className="text-xl font-light text-muted-foreground leading-[2]" /></ScrollReveal>
      </div>

      {/* ═══════ QUOTE ═══════ */}
      <div className="py-24 px-6 text-center">
        <ScrollReveal>
          <blockquote className="relative text-2xl md:text-3xl lg:text-4xl font-light italic leading-[1.6] text-foreground max-w-[680px] mx-auto">
            <span className="absolute -top-10 -left-2 text-[6rem] font-light text-warm-300/25 leading-none select-none">"</span>
            {t("overCagla.quote")}
          </blockquote>
        </ScrollReveal>
      </div>

      {/* ═══════ CHAPTER IV ═══════ */}
      <section className="py-28 lg:py-32 px-6 bg-foreground relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[20%] w-[80vw] h-[80vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(var(--terracotta-300) / 0.08) 0%, transparent 60%)" }} />
        <div className="max-w-[720px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-px bg-terracotta-400" />
              <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-terracotta-400">{t("overCagla.chapter4Label")}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-warm-100 mb-10">
              {t("overCagla.chapter4Title")} <span className="font-serif italic text-terracotta-400">{t("overCagla.chapter4TitleAccent")}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}><HtmlTextLight html={t("overCagla.chapter4P1")} className="text-xl font-light text-warm-300/70 leading-[2] mb-7" /></ScrollReveal>
          <ScrollReveal delay={0.15}><HtmlTextLight html={t("overCagla.chapter4P2")} className="text-xl font-light text-warm-300/70 leading-[2] mb-7" /></ScrollReveal>
          <ScrollReveal delay={0.2}><HtmlTextLight html={t("overCagla.chapter4P3")} className="text-xl font-light text-warm-300/70 leading-[2]" /></ScrollReveal>
        </div>
      </section>

      {/* ═══════ CLOSING ═══════ */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-light leading-[1.3] text-foreground mb-8">
              {t("overCagla.closingTitle")} <span className="font-serif italic text-terracotta-600">{t("overCagla.closingTitleAccent")}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="text-lg font-light text-muted-foreground leading-relaxed mb-10">{t("overCagla.closingP")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link to="/contact" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full border border-warm-300 text-sm tracking-wide text-foreground hover:bg-foreground hover:text-warm-50 hover:border-foreground hover:-translate-y-0.5 transition-all">
              {t("overCagla.contactCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OverCagla;
