import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const FinalCtaSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-28 md:py-40 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-[56ch] mx-auto text-center">
          <ScrollReveal>
            <p className="text-[0.7rem] uppercase tracking-[0.32em] mb-8 opacity-70">
              {t("home.finalCta.title")}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic font-light mb-10 leading-[1.1] tracking-tight">
              {t("home.finalCta.subtitle")}
            </h2>
            <div className="mx-auto h-px w-12 bg-primary-foreground/30 mb-10" />
            <p className="text-base md:text-lg leading-[1.8] mb-12 opacity-85 max-w-[48ch] mx-auto">
              {t("home.finalCta.sub")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
