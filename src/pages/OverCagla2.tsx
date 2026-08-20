import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { useLanguage } from "@/i18n/LanguageContext";

const HtmlText = ({ html, className }: { html: string; className?: string }) => (
  <p className={className} dangerouslySetInnerHTML={{ __html: html.replace(/<strong>/g, '<strong class="text-foreground font-medium">') }} />
);

const OverCagla2 = () => {
  const { t } = useLanguage();

  const places = [
    { name: t("overCagla.places.netherlands"), label: t("overCagla.places.netherlandsLabel") },
    { name: t("overCagla.places.germany"), label: t("overCagla.places.germanyLabel") },
    { name: t("overCagla.places.turkey"), label: t("overCagla.places.turkeyLabel") },
    { name: t("overCagla.places.mexico"), label: t("overCagla.places.mexicoLabel") },
    { name: t("overCagla.places.spain"), label: t("overCagla.places.spainLabel") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title={t("overCagla.seoTitle") + " — deel 2"}
        description={t("overCagla.seoDescription")}
        canonical="https://mindfulmind.nl/over-cagla-2"
      />
      <Navigation />
      <main id="main-content">
        {/* ═══════ CHAPTER III — Waar het begon ═══════ */}
        <section className="py-20 md:py-28 px-6 bg-warm-50 relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
          <div className="max-w-[720px] mx-auto relative z-10">
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
            <ScrollReveal delay={0.15}><p className="text-xl font-light text-muted-foreground leading-[2] mb-7">{t("overCagla.chapter3P2")}</p></ScrollReveal>
            <ScrollReveal delay={0.2}><HtmlText html={t("overCagla.chapter3P3")} className={`text-xl font-light text-muted-foreground leading-[2] ${t("overCagla.chapter3P4") ? "mb-7" : ""}`} /></ScrollReveal>
            {t("overCagla.chapter3P4") && (
              <ScrollReveal delay={0.25}><p className="text-xl font-light text-muted-foreground leading-[2]">{t("overCagla.chapter3P4")}</p></ScrollReveal>
            )}
          </div>
        </section>

        {/* ═══════ CHAPTER IV — De wereld als spiegel ═══════ */}
        <section className="py-20 md:py-28 px-6 bg-background relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
          <div className="max-w-[720px] mx-auto relative z-10">
            <ScrollReveal>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-5 h-px bg-sage-500" />
                <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-sage-600">{t("overCagla.chapter4Label")}</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-foreground mb-10">
                {t("overCagla.chapter4Title")} <span className="font-serif italic text-terracotta-600">{t("overCagla.chapter4TitleAccent")}</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}><HtmlText html={t("overCagla.chapter4P1")} className="text-xl font-light text-muted-foreground leading-[2] mb-7" /></ScrollReveal>
            <ScrollReveal delay={0.15}><p className="text-xl font-light text-muted-foreground leading-[2] mb-7">{t("overCagla.chapter4P2")}</p></ScrollReveal>
            <ScrollReveal delay={0.2}><p className={`text-xl font-light text-muted-foreground leading-[2] ${t("overCagla.chapter4P4") ? "mb-7" : ""}`}>{t("overCagla.chapter4P4")}</p></ScrollReveal>
            {t("overCagla.chapter4P4") && (
              <ScrollReveal delay={0.25}><p className="text-xl font-light text-muted-foreground leading-[2]">{t("overCagla.chapter4P4")}</p></ScrollReveal>
            )}

            {/* Places ribbon — inside same section */}
            <div className="mt-16 pt-12 border-t border-warm-200/40">
              <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
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
          </div>
        </section>

        {/* ═══════ CHAPTER V — Wortels in Cappadocië ═══════ */}
        <section className="py-20 md:py-28 px-6 bg-warm-50 relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
          <div className="max-w-[720px] mx-auto relative z-10">
            <ScrollReveal>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-5 h-px bg-sage-500" />
                <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-sage-600">{t("overCagla.chapter5Label")}</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-foreground mb-10">
                {t("overCagla.chapter5Title")} <span className="font-serif italic text-terracotta-600">{t("overCagla.chapter5TitleAccent")}</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}><HtmlText html={t("overCagla.chapter5P1")} className="text-xl font-light text-muted-foreground leading-[2] mb-7" /></ScrollReveal>
            <ScrollReveal delay={0.15}><HtmlText html={t("overCagla.chapter5P2")} className="text-xl font-light text-muted-foreground leading-[2] mb-7" /></ScrollReveal>
            <ScrollReveal delay={0.2}><p className={`text-xl font-light text-muted-foreground leading-[2] ${t("overCagla.chapter5P4") ? "mb-7" : ""}`}>{t("overCagla.chapter5P3")}</p></ScrollReveal>
            {t("overCagla.chapter5P4") && (
              <ScrollReveal delay={0.25}><p className="text-xl font-light text-muted-foreground leading-[2]">{t("overCagla.chapter5P4")}</p></ScrollReveal>
            )}
          </div>
        </section>

        {/* ═══════ CLOSING ═══════ */}
        <section className="py-20 md:py-28 px-6 text-center bg-background">
          <div className="max-w-[600px] mx-auto">
            <ScrollReveal>
              <p className="text-lg font-light text-muted-foreground leading-relaxed mb-10">{t("overCagla.closingP")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <Link to="/contact" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full border border-warm-300 text-sm tracking-wide text-foreground hover:bg-foreground hover:text-warm-50 hover:border-foreground hover:-translate-y-0.5 transition-all">
                {t("overCagla.contactCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-8 text-sm tracking-[0.1em] text-warm-400">{t("overCagla.closingLocation")}</p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OverCagla2;
