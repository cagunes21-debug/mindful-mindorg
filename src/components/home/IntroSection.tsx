import { ScrollReveal } from "@/components/ScrollReveal";

const IntroSection = () => {
  return (
    <section className="py-14 md:py-20 bg-card">
      <div className="container mx-auto px-6 max-w-2xl">
        <ScrollReveal>
          <div className="space-y-5 text-center">
            <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
              Misschien herken je het.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dat stemmetje van binnen dat zegt dat je het niet goed genoeg doet. Dat je meer je best moet doen. Dat je beter zou moeten zijn.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En zelfs als je wéét dat het niet helpt… blijft die stem terugkomen.
            </p>
            <p className="text-foreground leading-relaxed font-medium">
              Niet omdat er iets mis is met jou — maar omdat je nooit hebt geleerd hoe je op een andere manier met jezelf om kunt gaan.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-10 pt-10 border-t border-border/50 space-y-4 text-center">
            <p className="text-foreground leading-relaxed">
              Mindful Self-Compassion (MSC) helpt je precies daarin. Niet door jezelf te veranderen, maar door te leren hoe je jezelf kunt ondersteunen — juist op de momenten dat het moeilijk is.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Zodat er meer rust ontstaat. Meer ruimte. En uiteindelijk ook meer vertrouwen.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <blockquote className="mt-12 text-center">
            <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed">
              "Behandel jezelf zoals je een goede vriendin zou behandelen."
            </p>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IntroSection;
