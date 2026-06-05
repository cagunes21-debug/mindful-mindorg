import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const MisconceptsSection = () => {
  const { t } = useLanguage();
  const items = [
    { q: t("home.hero.misconcepts.m1Q"), a: t("home.hero.misconcepts.m1A") },
    { q: t("home.hero.misconcepts.m2Q"), a: t("home.hero.misconcepts.m2A") },
    { q: t("home.hero.misconcepts.m3Q"), a: t("home.hero.misconcepts.m3A") },
  ];
  return (
    <section className="py-20 md:py-28 bg-warm-50 relative overflow-hidden">
      <div className="absolute -top-20 right-0 w-[28rem] h-[28rem] bg-sage-100/25 rounded-full blur-[120px]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <ScrollReveal>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-sage-600 font-medium mb-5">
              {t("home.hero.misconcepts.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-5">
              {t("home.hero.misconcepts.title")}{" "}
              <span className="text-primary italic font-light">{t("home.hero.misconcepts.titleAccent")}</span>
            </h2>
            <p className="text-muted-foreground leading-[1.85] text-base">
              {t("home.hero.misconcepts.sub")}
            </p>
          </ScrollReveal>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {items.map((it, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-background/80 backdrop-blur-sm border border-sage-100 rounded-2xl p-7 md:p-8">
                <p className="font-serif italic text-foreground text-lg md:text-xl leading-snug mb-3">
                  {it.q}
                </p>
                <p className="text-muted-foreground leading-[1.85] text-[0.95rem]">{it.a}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MisconceptsSection;
