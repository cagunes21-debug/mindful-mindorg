import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const StepsSection = () => {
  const { t } = useLanguage();
  const steps = [
    { step: "01", title: t("home.steps.s1Title"), desc: t("home.steps.s1Desc"), accent: "terracotta" },
    { step: "02", title: t("home.steps.s2Title"), desc: t("home.steps.s2Desc"), accent: "sage" },
    { step: "03", title: t("home.steps.s3Title"), desc: t("home.steps.s3Desc"), accent: "terracotta" },
    { step: "04", title: t("home.steps.s4Title"), desc: t("home.steps.s4Desc"), accent: "sage" },
  ];
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">{t("home.steps.eyebrow")}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                {t("home.steps.titleA")} <em className="italic text-primary">{t("home.steps.titleB")}</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-terracotta-200 via-sage-200 to-terracotta-200 hidden md:block" />

            <div className="flex flex-col gap-6">
              {steps.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-5 md:gap-7">
                    <div className={`relative z-10 h-12 w-12 md:h-16 md:w-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      item.accent === "terracotta" ? "bg-terracotta-100 text-terracotta-600" : "bg-sage-100 text-sage-700"
                    }`}>
                      <span className="text-sm md:text-base font-semibold">{item.step}</span>
                    </div>
                    <div className="pt-1 md:pt-3">
                      <h3 className="text-lg md:text-xl font-serif text-foreground mb-1.5">{item.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
