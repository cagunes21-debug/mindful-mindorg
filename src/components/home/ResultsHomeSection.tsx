import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, FlaskConical } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ResultsHomeSection = () => {
  const { t } = useLanguage();
  const shifts = [
    { from: t("home.results.shift1From"), to: t("home.results.shift1To") },
    { from: t("home.results.shift2From"), to: t("home.results.shift2To") },
    { from: t("home.results.shift3From"), to: t("home.results.shift3To") },
    { from: t("home.results.shift4From"), to: t("home.results.shift4To") },
    { from: t("home.results.shift5From"), to: t("home.results.shift5To") },
  ];
  const stats = [
    { dir: "down", label: t("home.results.stress"), num: "36%" },
    { dir: "up", label: t("home.results.selfcompassion"), num: "67%" },
    { dir: "down", label: t("home.results.anxiety"), num: "43%" },
    { dir: "up", label: t("home.results.resilience"), num: "42%" },
  ];

  return (
    <section className="py-20 md:py-28 bg-warm-50 relative overflow-hidden">
      <div className="absolute top-10 right-0 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-3xl mx-auto space-y-16">
          <ScrollReveal>
            <div className="text-center">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">{t("home.results.eyebrow")}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                {t("home.results.titleA")} <em className="italic text-primary">{t("home.results.titleB")}</em>
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-md mx-auto">
                {t("home.results.sub")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-[#F8F5EE] rounded-3xl border border-warm-200/40 p-8 md:p-10">
              <div className="divide-y divide-warm-200/60">
                {shifts.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_2rem_1fr] gap-3 items-center py-4">
                    <span className="text-sm text-muted-foreground text-right">{s.from}</span>
                    <span className="text-primary text-center font-light">→</span>
                    <span className="text-sm text-foreground font-medium">{s.to}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-3">
                  <FlaskConical className="h-4 w-4 text-sage-600" />
                  <span className="text-xs tracking-[0.3em] uppercase text-sage-600 font-medium">{t("home.results.scienceEyebrow")}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-3">{t("home.results.scienceTitle")}</h3>
                <Link to="/msc-training" className="inline-flex items-center gap-1.5 text-sm text-sage-600 hover:text-primary transition-colors group">
                  {t("home.results.readMore")}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-3xl border border-sage-200/40 p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((s, i) => (
                    <div key={i} className={`rounded-2xl p-5 text-center ${s.dir === "down" ? "bg-terracotta-50/60 border border-terracotta-100/40" : "bg-sage-50/60 border border-sage-200/30"}`}>
                      <p className={`text-[0.65rem] tracking-[0.15em] uppercase mb-1 font-medium ${s.dir === "down" ? "text-terracotta-500" : "text-sage-600"}`}>
                        {s.dir === "down" ? t("home.results.down") : t("home.results.up")}
                      </p>
                      <p className="font-serif text-3xl font-light text-foreground leading-none mb-1">
                        {s.num}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic mt-4 text-center">
                  {t("home.results.source")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsHomeSection;
