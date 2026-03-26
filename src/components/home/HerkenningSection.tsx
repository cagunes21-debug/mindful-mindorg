import { ScrollReveal } from "@/components/ScrollReveal";

const recognitionItems = [
  "Je bent vaak streng of kritisch naar jezelf",
  "Je voelt je snel verantwoordelijk voor alles",
  "Je hebt moeite met grenzen stellen",
  "Je ervaart stress, onrust of uitputting",
  "Je wilt leren om beter voor jezelf te zorgen",
  "Je geeft anderen altijd voorrang op jezelf",
];

const HerkenningSection = () => {
  return (
    <section className="py-20 md:py-28 bg-warm-50 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-terracotta-100/30 rounded-full blur-[100px]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left column — text + quote */}
          <div>
            <ScrollReveal>
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-5">
                Herken je dit?
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-6">
                Altijd maar doorgaan.
                <br />
                <span className="text-primary italic font-light">Nooit genoeg.</span>
              </h2>
              <p className="text-muted-foreground leading-[1.85] text-base">
                Je doet je best — voor je werk, je gezin, de mensen om je heen.
                Maar dat stemmetje van binnen zegt steeds dat het niet goed genoeg is.
              </p>
              <p className="text-foreground leading-[1.85] text-base mt-4 font-medium">
                Niet omdat er iets mis is met jou. Maar omdat je nooit hebt geleerd om anders met jezelf om te gaan.
              </p>

              {/* Quote */}
              <div className="mt-8 border-l-2 border-terracotta-300/50 pl-5">
                <p className="font-serif italic text-foreground leading-relaxed">
                  Wat als je jezelf dezelfde vriendelijkheid zou geven die je anderen zo gemakkelijk geeft?
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — bullet list */}
          <div>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-col gap-5 md:pt-10">
                {recognitionItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-terracotta-400 flex-shrink-0" />
                    <p className="text-foreground text-base leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HerkenningSection;
