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
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-[58ch] mx-auto text-center mb-20">
          <ScrollReveal>
            <span className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.32em] uppercase text-terracotta-500 font-medium mb-8">
              <span className="h-px w-8 bg-terracotta-400/50" />
              {t("home.hero.profiles.eyebrow")}
              <span className="h-px w-8 bg-terracotta-400/50" />
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.05] tracking-tight mb-8">
              {t("home.hero.profiles.title")}{" "}
              <span className="text-primary italic font-light">{t("home.hero.profiles.titleAccent")}</span>
            </h2>
            {t("home.hero.profiles.sub") && (
              <p className="text-muted-foreground leading-[1.8] text-lg max-w-[52ch] mx-auto">
                {t("home.hero.profiles.sub")}
              </p>
            )}
            <div className="mt-12 max-w-[52ch] mx-auto space-y-5">
              <p className="text-foreground font-medium leading-[1.75] text-lg">
                {t("home.hero.profiles.introLine1")}
              </p>
              <p className="text-muted-foreground leading-[1.85] text-base">
                {t("home.hero.profiles.introLine2")}
              </p>
              <p className="font-serif italic text-xl md:text-2xl text-foreground leading-[1.4]">
                {t("home.hero.profiles.introLine3")}
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
          {profiles.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group h-full bg-warm-100/80 backdrop-blur-sm border border-terracotta-200/70 rounded-3xl p-10 md:p-12 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-terracotta-300 hover:shadow-xl hover:shadow-terracotta-900/10 hover:bg-warm-100">
                <div className="font-serif italic text-terracotta-500 text-2xl mb-6 tracking-tight">
                  — {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-2xl text-foreground leading-[1.25] tracking-tight">{p.title}</h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
        {t("home.hero.profiles.profileNote") && (
          <div className="max-w-[52ch] mx-auto text-center mt-16">
            <ScrollReveal>
              <p className="font-serif italic text-lg md:text-xl text-muted-foreground leading-[1.7]">
                {t("home.hero.profiles.profileNote")}
              </p>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilesSection;
