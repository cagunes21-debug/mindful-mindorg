import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Check, Users, User } from "lucide-react";
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
    <section className="py-24 md:py-36 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20 max-w-[56ch] mx-auto">
              <span className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.32em] uppercase font-medium text-terracotta-500 mb-8">
                <span className="h-px w-8 bg-terracotta-400/50" />
                {t("home.offerings.eyebrow")}
                <span className="h-px w-8 bg-terracotta-400/50" />
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.05] tracking-tight mb-8">
                {t("home.offerings.titleA")}{" "}
                <span className="text-primary italic font-light">{t("home.offerings.titleB")}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-[1.8] max-w-[48ch] mx-auto">
                {t("home.offerings.sub")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Individual Coaching */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-3xl border border-terracotta-200/40 p-8 md:p-10 shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-full bg-terracotta-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-terracotta-600" />
                  </div>
                  <span className="inline-block bg-terracotta-100 text-terracotta-600 text-[0.65rem] tracking-widest uppercase font-semibold px-3 py-1 rounded-full">
                    {t("home.offerings.individual.badge")}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2">
                  {t("home.offerings.individual.title")}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {t("home.offerings.individual.desc")}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {individualFeatures.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <div className="h-5 w-5 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-terracotta-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  {t("home.offerings.individual.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/coaching"
                  className="inline-flex items-center justify-center gap-2 text-sm text-terracotta-600 font-medium hover:text-terracotta-700 transition-colors mt-4"
                >
                  {t("home.offerings.individual.ctaLearnMore")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Group Training */}
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-3xl border border-sage-200/50 p-8 md:p-10 shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-full bg-sage-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-sage-600" />
                  </div>
                  <span className="inline-block bg-sage-100 text-sage-700 text-[0.65rem] tracking-widest uppercase font-semibold px-3 py-1 rounded-full">
                    {t("home.offerings.group.badge")}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2">
                  {t("home.offerings.group.title")}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {t("home.offerings.group.desc")}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {groupFeatures.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <div className="h-5 w-5 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-sage-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/msc-training"
                  className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:bg-sage-700 transition-colors shadow-lg shadow-sage-600/20"
                >
                  {t("home.offerings.group.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
