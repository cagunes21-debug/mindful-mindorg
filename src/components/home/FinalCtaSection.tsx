import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const FinalCtaSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
              {t("home.finalCta.title")}
            </h2>
            <p className="text-xl font-serif italic mb-2 opacity-90">
              {t("home.finalCta.subtitle")}
            </p>
            <p className="text-sm uppercase tracking-[0.2em] mb-10 opacity-70">
              {t("home.finalCta.sub")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-primary-foreground text-primary h-12 px-10 rounded-full font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity shadow-lg"
              >
                {t("home.finalCta.cta1")}
              </Link>
              <Link
                to="/msc-training"
                className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition-colors"
              >
                {t("home.finalCta.cta2")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
