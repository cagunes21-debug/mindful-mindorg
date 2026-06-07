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
    <>
      {/* Deel 1 — Verlangen */}
      <section className="py-20 md:py-28 bg-warm-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-terracotta-100/30 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-5">
                {t("home.herkenning.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-6">
                {t("home.herkenning.titleA")}{" "}
                <span className="text-primary italic font-light">{t("home.herkenning.titleB")}</span>
              </h2>
              <p className="text-muted-foreground leading-[1.85] text-base md:text-lg whitespace-pre-line">
                {t("home.herkenning.p1")}
              </p>
              {t("home.herkenning.p2") && (
                <p className="text-foreground leading-[1.85] text-base md:text-lg mt-4 font-medium">
                  {t("home.herkenning.p2")}
                </p>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Deel 2 — Wat deelnemers merken */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 md:mb-14">
                <p className="font-serif italic text-xl md:text-2xl text-foreground leading-relaxed">
                  {t("home.herkenning.quote")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                {recognitionItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-warm-50/70 border border-terracotta-100/60 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:bg-warm-100 hover:shadow-md hover:shadow-terracotta-900/5"
                  >
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-terracotta-400 flex-shrink-0" />
                    <p className="text-foreground text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default HerkenningSection;
