import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const HerkenningSection = () => {
  const { t } = useLanguage();
  const recognitionItems = [
    t("home.herkenning.item1"),
    t("home.herkenning.item2"),
    t("home.herkenning.item3"),
    t("home.herkenning.item4"),
    t("home.herkenning.item5"),
    t("home.herkenning.item6"),
  ];
  return (
    <section className="py-20 md:py-28 bg-warm-50 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-terracotta-100/30 rounded-full blur-[100px]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <ScrollReveal>
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-5">
                {t("home.herkenning.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-6">
                {t("home.herkenning.titleA")}
                <br />
                <span className="text-primary italic font-light">{t("home.herkenning.titleB")}</span>
              </h2>
              <p className="text-muted-foreground leading-[1.85] text-base">
                {t("home.herkenning.p1")}
              </p>
              <p className="text-foreground leading-[1.85] text-base mt-4 font-medium">
                {t("home.herkenning.p2")}
              </p>
              <div className="mt-8 border-l-2 border-terracotta-300/50 pl-5">
                <p className="font-serif italic text-foreground leading-relaxed">
                  {t("home.herkenning.quote")}
                </p>
              </div>
            </ScrollReveal>
          </div>
          <div>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-col gap-5 md:pt-10">
                {recognitionItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-terracotta-400 flex-shrink-0" />
                    <p className="text-foreground text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HerkenningSection;
