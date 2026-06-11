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
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Asymmetric editorial header */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-20">
          <div className="md:col-span-7">
            <ScrollReveal>
              <span className="block uppercase tracking-[0.2em] text-[10px] font-medium text-terracotta-500 mb-5">
                {t("home.hero.profiles.eyebrow")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground max-w-[18ch]">
                {t("home.hero.profiles.title")}{" "}
                <span className="italic font-light text-primary">{t("home.hero.profiles.titleAccent")}</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="md:col-span-5 md:pt-4 space-y-5">
            <ScrollReveal delay={0.1}>
              {t("home.hero.profiles.sub") && (
                <p className="text-muted-foreground leading-[1.85] text-[15px]">
                  {t("home.hero.profiles.sub")}
                </p>
              )}
              <p className="text-foreground font-medium leading-[1.75] text-[15px]">
                {t("home.hero.profiles.introLine1")}
              </p>
              <p className="text-muted-foreground leading-[1.85] text-[15px]">
                {t("home.hero.profiles.introLine2")}
              </p>
              <p className="font-serif italic text-xl md:text-2xl text-foreground leading-[1.35] pt-2">
                {t("home.hero.profiles.introLine3")}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Hairline gallery cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {profiles.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group">
                <div className="h-px w-full bg-foreground/10 mb-6 group-hover:bg-terracotta-500 transition-colors duration-500" />
                <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground/60 font-medium mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif italic text-2xl md:text-3xl text-terracotta-500 leading-[1.2] tracking-tight mb-4">
                  {p.title}
                </h3>
                {p.desc && (
                  <p className="text-[14px] leading-[1.75] text-muted-foreground font-light max-w-[34ch]">
                    {p.desc}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {t("home.hero.profiles.profileNote") && (
          <div className="max-w-[52ch] mx-auto text-center mt-20">
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
