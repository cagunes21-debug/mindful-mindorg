import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingHomeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-terracotta-50 via-warm-50 to-sage-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] uppercase text-terracotta-500 mb-4">
            Individueel traject
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2">
            <span className="font-serif italic text-terracotta-600">Mindful Me</span>
          </h2>
          <p className="text-muted-foreground leading-[1.8] max-w-xl mb-10">
            Een persoonlijk 1-op-1 traject van 6 sessies. Op jouw tempo, volledig afgestemd op jouw thema's.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured card */}
            <div className="relative bg-white rounded-3xl border-2 border-terracotta-300 p-8 md:p-10 shadow-md">
              <span className="absolute -top-3 left-8 bg-terracotta-600 text-white text-xs tracking-[0.15em] uppercase px-4 py-1.5 rounded-full">
                ✨ Tijdelijke aanbieding
              </span>
              <p className="font-serif text-2xl text-foreground mt-2">Mindful Me</p>
              <p className="font-serif italic text-sm text-muted-foreground mb-6">
                6 sessies · online via Zoom
              </p>
              <div className="mb-6">
                <span className="text-muted-foreground line-through mr-2">€650</span>
                <span className="font-serif text-4xl md:text-5xl font-light text-terracotta-600">€550</span>
                <p className="text-sm text-muted-foreground mt-1">Betaling in termijnen mogelijk</p>
              </div>
              <ul className="space-y-0 divide-y divide-warm-200 mb-8">
                {[
                  "Gratis kennismakingsgesprek",
                  "6 sessies afgestemd op jou (60 min.)",
                  "Oefeningen & meditaties voor thuis",
                  "Persoonlijke begeleiding en reflectie",
                  "Ondersteuning per mail tussen sessies",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 py-3 text-sm text-muted-foreground">
                    <span className="text-terracotta-400">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full py-6 text-base">
                <Link to="/contact">
                  Plan een gratis kennismaking
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                De kennismaking is altijd gratis en vrijblijvend.
              </p>
            </div>

            {/* Single session */}
            <div className="bg-white rounded-3xl border border-warm-200 p-8 md:p-10 shadow-sm">
              <p className="font-serif text-2xl text-foreground">Losse sessie</p>
              <p className="font-serif italic text-sm text-muted-foreground mb-6">
                Kennismaking of verdieping
              </p>
              <div className="mb-6">
                <span className="font-serif text-4xl font-light text-foreground">€110</span>
                <p className="text-sm text-muted-foreground mt-1">60 minuten · direct inplanbaar</p>
              </div>
              <ul className="space-y-0 divide-y divide-warm-200 mb-8">
                {[
                  "Eenmalige sessie rond een specifiek thema",
                  "Geen verplichtingen",
                  "Ook geschikt als eerste kennismaking",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 py-3 text-sm text-muted-foreground">
                    <span className="text-terracotta-400">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full py-6 text-base">
                <Link to="/coaching">
                  Meer over individuele begeleiding
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PricingHomeSection;
