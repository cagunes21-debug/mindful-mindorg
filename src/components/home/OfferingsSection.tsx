import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const OfferingsSection = () => {
  const { t } = useLanguage();

  const individualFeatures = [
    t("home.offerings.individual.f1"),
    t("home.offerings.individual.f2"),
    t("home.offerings.individual.f3"),
    t("home.offerings.individual.f4"),
  ];

  const groupFeatures = [
    t("home.offerings.group.f1"),
    t("home.offerings.group.f2"),
    t("home.offerings.group.f3"),
    t("home.offerings.group.f4"),
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Asymmetric header with hairline rule */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
            <div className="max-w-2xl">
              <span className="block uppercase tracking-[0.2em] text-[10px] font-medium text-terracotta-500 mb-5">
                {t("home.offerings.eyebrow")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground">
                {t("home.offerings.titleA")}{" "}
                <span className="italic font-light text-primary">{t("home.offerings.titleB")}</span>
              </h2>
            </div>
            <div className="h-px flex-grow bg-foreground/10 mx-0 md:mx-8 hidden md:block" />
            <p className="text-muted-foreground text-[15px] leading-[1.8] max-w-xs">
              {t("home.offerings.sub")}
            </p>
          </div>
        </ScrollReveal>

        {/* Flush gallery — two print-style modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          {/* Individual */}
          <ScrollReveal delay={0.1}>
            <div className="bg-white p-10 md:p-14 border border-foreground/5 hover:border-terracotta-500/30 transition-colors duration-500 h-full flex flex-col">
              <p className="text-terracotta-500 uppercase tracking-[0.22em] text-[10px] mb-6 font-medium">
                {t("home.offerings.individual.badge")}
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground leading-tight tracking-tight mb-4">
                {t("home.offerings.individual.title")}
              </h3>
              <p className="text-[14px] leading-[1.8] text-muted-foreground font-light max-w-md mb-10">
                {t("home.offerings.individual.desc")}
              </p>
              <ul className="space-y-3 mb-12 flex-1">
                {individualFeatures.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[14px] text-foreground/85 leading-[1.7]">
                    <span className="mt-2 h-px w-4 bg-terracotta-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <Link
                  to="/contact"
                  className="group/btn flex items-center text-[11px] uppercase tracking-[0.22em] font-medium text-foreground"
                >
                  {t("home.offerings.individual.cta")}
                  <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
                <Link
                  to="/coaching"
                  className="group/btn2 flex items-center text-[11px] uppercase tracking-[0.22em] font-medium text-terracotta-500/80 hover:text-terracotta-500 transition-colors"
                >
                  {t("home.offerings.individual.ctaLearnMore")}
                  <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover/btn2:translate-x-1" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Group */}
          <ScrollReveal delay={0.2}>
            <div className="bg-sage-50 p-10 md:p-14 border border-foreground/5 hover:border-sage-600/30 transition-colors duration-500 h-full flex flex-col">
              <p className="text-sage-700 uppercase tracking-[0.22em] text-[10px] mb-6 font-medium">
                {t("home.offerings.group.badge")}
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground leading-tight tracking-tight mb-4">
                {t("home.offerings.group.title")}
              </h3>
              <p className="text-[14px] leading-[1.8] text-muted-foreground font-light max-w-md mb-10">
                {t("home.offerings.group.desc")}
              </p>
              <ul className="space-y-3 mb-12 flex-1">
                {groupFeatures.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[14px] text-foreground/85 leading-[1.7]">
                    <span className="mt-2 h-px w-4 bg-sage-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/msc-training"
                className="group/btn3 flex items-center text-[11px] uppercase tracking-[0.22em] font-medium text-foreground"
              >
                {t("home.offerings.group.cta")}
                <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover/btn3:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
