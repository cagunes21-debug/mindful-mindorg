import { ScrollReveal } from "@/components/ScrollReveal";

const steps = [
  { step: "01", title: "Gratis kennismaking", desc: "We maken kennis en bespreken wat je bezighoudt. Geen verplichtingen — gewoon een open gesprek om te kijken of het past.", accent: "terracotta" },
  { step: "02", title: "Persoonlijk plan", desc: "Op basis van jouw situatie stellen we samen een traject op — afgestemd op jouw tempo, jouw thema's en wat jij nodig hebt.", accent: "sage" },
  { step: "03", title: "Sessies & oefeningen", desc: "Tijdens de sessies werk je met meditaties, reflecties en zelfcompassie-oefeningen. Tussendoor oefen je op jouw eigen tempo.", accent: "terracotta" },
  { step: "04", title: "Integratie & groei", desc: "Stap voor stap leer je een nieuwe manier van omgaan met jezelf. Milder, steviger en meer verbonden met wat je nodig hebt.", accent: "sage" },
];

const StepsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">Het traject</span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                Hoe werkt <em className="italic text-primary">het?</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-terracotta-200 via-sage-200 to-terracotta-200 hidden md:block" />

            <div className="flex flex-col gap-6">
              {steps.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-5 md:gap-7">
                    <div className={`relative z-10 h-12 w-12 md:h-16 md:w-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      item.accent === "terracotta" ? "bg-terracotta-100 text-terracotta-600" : "bg-sage-100 text-sage-700"
                    }`}>
                      <span className="text-sm md:text-base font-semibold">{item.step}</span>
                    </div>
                    <div className="pt-1 md:pt-3">
                      <h3 className="text-lg md:text-xl font-serif text-foreground mb-1.5">{item.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
