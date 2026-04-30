import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Leaf } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const MscSection = () => {
  const { t } = useLanguage();
  const pillars = [
    { num: "1", title: t("home.msc.pillar1Title"), desc: t("home.msc.pillar1Desc") },
    { num: "2", title: t("home.msc.pillar2Title"), desc: t("home.msc.pillar2Desc") },
    { num: "3", title: t("home.msc.pillar3Title"), desc: t("home.msc.pillar3Desc") },
  ];
  return (
    <>
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-sage-50 via-sage-50/50 to-warm-50 rounded-3xl border border-sage-200/50 p-8 md:p-12 text-center shadow-sm">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-sage-100 mb-6">
                <Leaf className="h-5 w-5 text-sage-600" />
              </div>
              <p className="text-xl md:text-2xl text-foreground leading-[1.6] font-serif mb-4">
                {t("home.msc.statement")}
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
                {t("home.msc.sub")}
              </p>
              <Link
                to="/msc-training#wat-is-msc"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                {t("home.msc.moreLink")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#F8F5EE]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-sage-600 font-medium mb-4">{t("home.msc.pillarsEyebrow")}</span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                  {t("home.msc.pillarsTitleA")} <em className="italic text-primary">{t("home.msc.pillarsTitleB")}</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-4">
              {pillars.map((p, i) => (
                <ScrollReveal key={p.num} delay={i * 0.08}>
                  <div className="bg-white rounded-3xl border border-sage-200/40 p-7 shadow-sm text-center h-full">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-sage-100 text-sage-700 font-semibold text-sm mb-4">
                      {p.num}
                    </span>
                    <h3 className="font-serif italic text-foreground text-lg mb-3">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-2xl border border-warm-200/50 p-5 text-center shadow-sm">
                  <p className="font-serif text-foreground text-base">Kristin Neff</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("home.msc.founder1Role")}</p>
                </div>
                <div className="bg-white rounded-2xl border border-warm-200/50 p-5 text-center shadow-sm">
                  <p className="font-serif text-foreground text-base">Christopher Germer</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("home.msc.founder2Role")}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default MscSection;
