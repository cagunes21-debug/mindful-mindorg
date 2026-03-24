import { ScrollReveal } from "@/components/ScrollReveal";
import { Leaf } from "lucide-react";

const IntroSection = () => {
  return (
    <>
      {/* Transitie — erkenning + MSC */}
      <section className="py-14 md:py-20 bg-warm-50">
        <div className="container mx-auto px-6 max-w-xl text-center">
          <ScrollReveal>
            <p className="text-foreground text-lg md:text-xl leading-[1.9] font-medium mb-2">
              Niet omdat er iets mis is met jou —
            </p>
            <p className="text-muted-foreground leading-[1.9] text-base md:text-lg">
              maar omdat je nooit hebt geleerd
              <br />
              hoe je op een andere manier met jezelf om kunt gaan.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex justify-center my-8">
              <Leaf className="h-5 w-5 text-sage-400" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-foreground text-lg md:text-xl leading-[1.9] font-medium mb-4">
              Mindful Self-Compassion helpt je om die relatie met jezelf te veranderen.
            </p>
            <div className="text-muted-foreground leading-[2] text-base md:text-lg space-y-1">
              <p>Niet door harder je best te doen,</p>
              <p>maar door te leren</p>
              <p>hoe je jezelf kunt ondersteunen —</p>
              <p className="italic">juist op de momenten dat het moeilijk is.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-8 space-y-1 text-foreground text-base md:text-lg leading-[2]">
              <p>Zodat er meer rust ontstaat.</p>
              <p>Meer ruimte.</p>
              <p className="font-medium">En uiteindelijk ook meer vertrouwen.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote */}
      <section className="py-10 md:py-14 bg-primary">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <ScrollReveal>
            <p className="text-xl md:text-2xl font-serif italic text-primary-foreground leading-relaxed">
              "Behandel jezelf zoals je een goede vriendin zou behandelen."
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default IntroSection;
