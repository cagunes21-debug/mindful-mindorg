import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Check } from "lucide-react";

const PricingHomeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto">

          {/* Mindful Me card */}
          <ScrollReveal>
            <div className="bg-white rounded-3xl border border-terracotta-200/40 p-8 md:p-10 shadow-sm max-w-xl mx-auto mb-10">
              <div className="text-center">
                <span className="inline-block bg-terracotta-100 text-terracotta-600 text-[0.65rem] tracking-widest uppercase font-semibold px-3 py-1 rounded-full mb-4">
                  ✨ Tijdelijke aanbieding
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2">Mindful Me</h3>
                <p className="text-muted-foreground text-sm mb-6">6 sessies · online via Zoom</p>
                <p className="text-muted-foreground leading-relaxed text-sm mb-6 max-w-sm mx-auto">
                  Een persoonlijk 1-op-1 traject van 6 sessies. Op jouw tempo, volledig afgestemd op jouw thema's.
                </p>

                <ul className="space-y-3 text-left max-w-xs mx-auto mb-8">
                  {[
                    "Gratis kennismakingsgesprek",
                    "6 sessies afgestemd op jou (60 min.)",
                    "Oefeningen & meditaties voor thuis",
                    "Persoonlijke begeleiding en reflectie",
                    "Ondersteuning per mail tussen sessies",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <div className="h-5 w-5 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-terracotta-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-center gap-1 mb-6">
                  <div className="flex items-center gap-3">
                    <p className="text-lg text-muted-foreground line-through">€650</p>
                    <p className="text-3xl font-light text-terracotta-600">€550</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Betaling in termijnen mogelijk</p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  Plan een gratis kennismaking
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-xs text-muted-foreground mt-4">
                  De kennismaking is altijd gratis en vrijblijvend.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default PricingHomeSection;
