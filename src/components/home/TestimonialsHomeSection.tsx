import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const TestimonialsHomeSection = () => {
  const { t } = useLanguage();
  const testimonials = [
    { name: "Anna M.", training: t("home.testimonials.t1Training"), text: t("home.testimonials.t1Text") },
    { name: "Sophie L.", training: t("home.testimonials.t2Training"), text: t("home.testimonials.t2Text") },
    { name: "Mark V.", training: t("home.testimonials.t3Training"), text: t("home.testimonials.t3Text") },
  ];
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta-100/20 rounded-full blur-[100px]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">
                {t("home.testimonials.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                {t("home.testimonials.titleA")} <em className="italic text-primary">{t("home.testimonials.titleB")}</em>
              </h2>
              <p className="text-muted-foreground font-light max-w-md mx-auto">
                {t("home.testimonials.sub")}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {testimonials.map((tt, i) => (
              <StaggerItem key={i}>
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200/60 h-full flex flex-col">
                  <Quote className="h-6 w-6 text-terracotta-200 mb-3 flex-shrink-0" />
                  <p className="text-foreground text-sm leading-[1.8] mb-5 flex-grow">
                    "{tt.text}"
                  </p>
                  <div className="pt-4 border-t border-warm-200/40">
                    <div className="flex gap-0.5 mb-1.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-terracotta-400 text-terracotta-400" />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-foreground">{tt.name}</p>
                    <p className="text-xs text-muted-foreground">{tt.training}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.15}>
            <div className="text-center mt-10">
              <Link
                to="/ervaringen"
                className="inline-flex items-center gap-1.5 text-sm text-terracotta-600 hover:text-primary transition-colors group font-medium"
              >
                {t("home.testimonials.viewAll")}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHomeSection;
