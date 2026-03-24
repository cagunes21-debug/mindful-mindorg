import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import caglaBio from "@/assets/cagla-bio.png";

const TrainerHomeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-sage-600 font-medium mb-4">Begeleiding</span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                Ontmoet de trainers
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-3xl border border-warm-200/50 p-8 md:p-10 shadow-sm max-w-lg mx-auto text-center">
              <img
                src={caglaBio}
                alt="Çağla Güneş"
                className="w-28 h-28 rounded-full object-cover mx-auto mb-5 border-2 border-sage-200/60"
              />
              <h3 className="text-xl font-serif text-foreground mb-1">Çağla Güneş</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Lichaamsgerichte Psychotherapeut · MSC Trainer
              </p>
              <p className="text-foreground font-serif italic text-base mb-4">
                "Echte verandering begint bij hoe je met jezelf omgaat."
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-sm mx-auto">
                Ik help je om met meer mildheid, veerkracht en zelfcompassie in het leven te staan. In mijn begeleiding combineer ik MSC met lichaamsgerichte therapie en trauma-sensitieve mindfulness.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {["MSC gecertificeerd", "Lichaamsgerichte therapie", "Trauma-sensitief", "ACT"].map((tag) => (
                  <span key={tag} className="text-[0.65rem] tracking-wider uppercase px-3 py-1 border border-warm-200 text-muted-foreground rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/over-ons"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Meer over Mindful Mind
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/trainers"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sage-700 hover:text-sage-600 transition-colors"
                >
                  Over de trainers
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TrainerHomeSection;
