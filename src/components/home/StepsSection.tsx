import { ScrollReveal } from "@/components/ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Gratis kennismaking",
    desc: "We maken kennis en bespreken wat je bezighoudt. Geen verplichtingen — gewoon een open gesprek om te kijken of het past.",
  },
  {
    num: "02",
    title: "Persoonlijk plan",
    desc: "Op basis van jouw situatie stellen we samen een traject op — afgestemd op jouw tempo, jouw thema's en wat jij nodig hebt.",
  },
  {
    num: "03",
    title: "Sessies & oefeningen",
    desc: "Tijdens de sessies werk je met meditaties, reflecties en zelfcompassie-oefeningen. Tussendoor oefen je op jouw eigen tempo.",
  },
  {
    num: "04",
    title: "Integratie & groei",
    desc: "Stap voor stap leer je een nieuwe manier van omgaan met jezelf. Milder, steviger en meer verbonden met wat je nodig hebt.",
  },
];

const StepsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-foreground">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] uppercase text-terracotta-300 mb-4">
            Het traject
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-10">
            Hoe werkt het?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="bg-white/[0.04] rounded-3xl p-8 border border-white/10">
                <span className="font-serif text-5xl font-light text-terracotta-400/20 leading-none block mb-4">
                  {step.num}
                </span>
                <h3 className="font-serif text-xl text-white font-light mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StepsSection;
