import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";

const PricingHomeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-sage-50">
      <div className="max-w-[1100px] mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] uppercase text-sage-600 mb-4">
            Individueel traject
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2">
            Mindful Me
          </h2>
          <p className="text-muted-foreground leading-[1.8] max-w-xl mb-10">
            Een persoonlijk 1-op-1 traject van 6 sessies. Op jouw tempo, volledig afgestemd op jouw thema's.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured card */}
            <div className="relative border border-sage-400 bg-white p-8 md:p-10">
              <span className="absolute -top-px left-8 bg-sage-600 text-white text-[0.7rem] tracking-[0.15em] uppercase px-4 py-1">
                ✨ Tijdelijke aanbieding
              </span>
              <p className="font-serif text-2xl text-foreground mt-2">Mindful Me</p>
              <p className="font-serif italic text-sm text-muted-foreground mb-6">
                6 sessies · online via Zoom
              </p>
              <div className="mb-6">
                <span className="text-muted-foreground line-through mr-2">€650</span>
                <span className="font-serif text-4xl md:text-5xl font-light text-foreground">€550</span>
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
                    <span className="text-sage-500">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="block w-full text-center bg-foreground text-background py-3.5 text-xs tracking-[0.15em] uppercase font-medium hover:bg-sage-600 transition-colors"
              >
                Plan een gratis kennismaking
              </Link>
              <p className="text-xs text-muted-foreground text-center mt-4">
                De kennismaking is altijd gratis en vrijblijvend.
              </p>
            </div>

            {/* Single session */}
            <div className="border border-warm-300 bg-white p-8 md:p-10">
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
                    <span className="text-sage-500">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/coaching"
                className="block w-full text-center border border-warm-300 text-foreground py-3.5 text-xs tracking-[0.15em] uppercase font-medium hover:border-sage-500 hover:text-sage-600 transition-colors"
              >
                Meer over individuele begeleiding
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PricingHomeSection;
