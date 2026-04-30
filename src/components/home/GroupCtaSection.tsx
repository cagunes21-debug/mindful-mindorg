import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Calendar, Sparkles, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const GroupCtaSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-sage-50 via-warm-50 to-terracotta-50/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,hsl(var(--sage-100)/0.4)_0%,transparent_50%)]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-sage-200/50 p-8 md:p-10 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 mb-5 rounded-full bg-sage-100 border border-sage-200 px-4 py-1.5 text-xs font-medium text-sage-700 tracking-wider uppercase">
                    <Users className="h-3.5 w-3.5" />
                    {t("home.groupCta.badge")}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3 leading-tight">
                    {t("home.groupCta.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-5 max-w-md">
                    {t("home.groupCta.desc")}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-sage-500" />
                      {t("home.groupCta.meta1")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-terracotta-500" />
                      {t("home.groupCta.meta2")}
                    </span>
                  </div>
                  <Link
                    to="/msc-training"
                    className="inline-flex items-center gap-2 bg-sage-600 text-white h-10 px-6 rounded-full text-sm font-semibold hover:bg-sage-700 transition-colors shadow-sm group"
                  >
                    {t("home.groupCta.cta")}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="hidden md:flex flex-col items-center justify-center w-40 h-40 rounded-2xl bg-gradient-to-br from-sage-50 to-warm-50 border border-sage-200/60">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{t("home.groupCta.from")}</p>
                  <p className="text-3xl font-serif font-light text-terracotta-600">€495</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("home.groupCta.earlyBird")}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GroupCtaSection;
