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
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left column */}
          <div className="md:col-span-7">
            <ScrollReveal>
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-5">
                Herken je dit?
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-6">
                Altijd maar doorgaan.
                <br />
                <span className="text-primary italic font-light">Nooit genoeg.</span>
              </h2>
              <p className="text-muted-foreground leading-[1.85] text-base max-w-md">
                Je doet je best — voor je werk, je gezin, de mensen om je heen.
                Maar dat stemmetje van binnen zegt steeds dat het niet goed genoeg is.
              </p>
              <p className="text-foreground leading-[1.85] text-base mt-4 font-medium max-w-md">
                Niet omdat er iets mis is met jou. Maar omdat je nooit hebt geleerd om anders met jezelf om te gaan.
              </p>
            </ScrollReveal>
          </div>

          {/* Right column — quote card */}
          <div className="md:col-span-5">
            <ScrollReveal delay={0.15}>
              <div className="bg-white rounded-3xl p-7 shadow-lg shadow-terracotta-200/20 border border-terracotta-100/60 relative">
                <span className="absolute -top-3 left-7 text-5xl text-terracotta-200 font-serif leading-none select-none">"</span>
                <p className="font-serif italic text-lg text-foreground leading-relaxed pt-4 mb-4">
                  Wat als je jezelf dezelfde vriendelijkheid zou geven die je anderen zo gemakkelijk geeft?
                </p>
                <div className="w-8 h-0.5 bg-terracotta-300/50 mb-3" />
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Het basisprincipe van MSC</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Recognition list */}
        <div className="max-w-5xl mx-auto mt-16">
          <ScrollReveal delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col gap-3.5">
                {recognitionItems.map((item, i) => {
                  const bgColors = ["bg-white", "bg-sage-50/70", "bg-warm-50", "bg-white", "bg-sage-50/70", "bg-warm-50"];
                  return (
                    <div key={i} className={`${bgColors[i]} rounded-2xl px-7 py-5 border border-sage-200/40 text-center`}>
                      <p className="text-foreground text-base md:text-[1.05rem] leading-relaxed font-light">
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HerkenningSection;
