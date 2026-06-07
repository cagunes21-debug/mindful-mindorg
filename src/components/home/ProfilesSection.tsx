import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const ProfilesSection = () => {
  const { t } = useLanguage();
  const profiles = [
    { title: t("home.hero.profiles.p1Title"), desc: t("home.hero.profiles.p1Desc") },
    { title: t("home.hero.profiles.p2Title"), desc: t("home.hero.profiles.p2Desc") },
    { title: t("home.hero.profiles.p3Title"), desc: t("home.hero.profiles.p3Desc") },
  ];
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <ScrollReveal>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-5">
              {t("home.hero.profiles.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-5">
              {t("home.hero.profiles.title")}{" "}
              <span className="text-primary italic font-light">{t("home.hero.profiles.titleAccent")}</span>
            </h2>
            {t("home.hero.profiles.sub") && (
              <p className="text-muted-foreground leading-[1.85] text-base">
                {t("home.hero.profiles.sub")}
              </p>
            )}
            <div className="mt-8 max-w-xl mx-auto space-y-4">
              <p className="text-foreground font-medium leading-relaxed">
                {t("home.hero.profiles.introLine1")}
              </p>
              <p className="text-muted-foreground leading-[1.85] text-base">
                {t("home.hero.profiles.introLine2")}
              </p>
              <p className="text-foreground font-medium leading-relaxed">
                {t("home.hero.profiles.introLine3")}
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
          {profiles.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="h-full bg-warm-100/80 backdrop-blur-sm border border-terracotta-200/70 rounded-3xl p-8 md:p-10 hover:border-terracotta-300 hover:shadow-lg hover:shadow-terracotta-900/5 transition-all duration-300">
                <div className="h-11 w-11 rounded-full bg-terracotta-200 text-terracotta-700 flex items-center justify-center font-serif text-lg mb-6 shadow-sm">
                  {i + 1}
                </div>
                <h3 className="font-serif text-xl text-foreground mb-4 leading-snug">{p.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-[0.97rem]">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilesSection;
