import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const FinalCtaSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-28 md:py-40 bg-primary text-primary-foreground relative overflow-hidden border-t border-foreground/10">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative">
        <div className="text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] font-medium opacity-70 mb-10">
              <span className="h-px w-10 bg-primary-foreground/40" />
              {t("home.finalCta.title")}
              <span className="h-px w-10 bg-primary-foreground/40" />
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic font-light leading-[1.1] tracking-tight mb-12 max-w-[20ch] mx-auto">
              {t("home.finalCta.subtitle")}
            </h2>
            <p className="text-[15px] md:text-base leading-[1.85] mb-14 opacity-85 max-w-[48ch] mx-auto font-light">
              {t("home.finalCta.sub")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-primary-foreground text-primary h-12 px-10 font-semibold text-[11px] tracking-[0.22em] uppercase hover:opacity-90 transition-opacity"
              >
                {t("home.finalCta.cta1")}
              </Link>
              <Link
                to="/msc-training"
                className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground h-12 px-8 font-semibold text-[11px] tracking-[0.22em] uppercase hover:bg-primary-foreground/10 transition-colors"
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
