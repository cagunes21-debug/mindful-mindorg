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
    <section className="py-20 md:py-28 bg-warm-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: story */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-terracotta-500 mb-4">
                Herken je dit?
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light leading-[1.3] text-foreground mb-6">
                Altijd maar doorgaan.
                <br />
                <span className="font-serif italic text-terracotta-600">Nooit genoeg.</span>
              </h2>
              <p className="text-muted-foreground leading-[1.85] mb-3">
                Je doet je best — voor je werk, je gezin, de mensen om je heen. Maar dat stemmetje van binnen zegt steeds dat het niet goed genoeg is.
              </p>
              <p className="text-muted-foreground leading-[1.85] mb-6">
                Niet omdat er iets mis is met jou. Maar omdat je nooit hebt geleerd om anders met jezelf om te gaan.
              </p>
              <div className="border-l-2 border-terracotta-400 pl-5">
                <p className="font-serif italic text-muted-foreground text-lg leading-relaxed">
                  Wat als je jezelf dezelfde vriendelijkheid zou geven die je anderen zo gemakkelijk geeft?
                </p>
              </div>
            </div>

            {/* Right: list */}
            <div className="bg-white rounded-3xl p-8 border border-warm-200 shadow-sm">
              <ul className="divide-y divide-warm-200">
                {recognitionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 py-4 text-muted-foreground leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-terracotta-400 flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HerkenningSection;
