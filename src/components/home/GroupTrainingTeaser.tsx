import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const GroupTrainingTeaser = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-sage-50 via-warm-50 to-terracotta-50/30">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 mb-4 rounded-full bg-sage-100 border border-sage-200 px-4 py-1.5 text-xs font-medium text-sage-700 tracking-wide uppercase">
                  <Users className="h-3.5 w-3.5" />
                  Groepstraining
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3 leading-tight">
                  Liever samen groeien?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  De 8-weekse Mindful Self-Compassion (MSC) groepstraining biedt dezelfde
                  wetenschappelijk onderbouwde basis — maar dan in de kracht van een groep.
                  Leer van elkaars ervaringen en ontdek zelfcompassie samen.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-sage-500" />
                    8 weken · start september 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-terracotta-500" />
                    Early bird t/m 1 augustus
                  </span>
                </div>
                <Link
                  to="/msc-training"
                  className="inline-flex items-center gap-2 text-terracotta-600 font-semibold text-sm hover:text-terracotta-700 transition-colors group"
                >
                  Bekijk de groepstraining
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="hidden md:flex flex-col items-center justify-center w-48 h-48 rounded-2xl bg-white/80 border border-sage-200 shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Vanaf</p>
                <p className="text-3xl font-light text-terracotta-600">€495</p>
                <p className="text-xs text-muted-foreground mt-1">early bird</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GroupTrainingTeaser;
