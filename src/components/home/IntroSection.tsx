import { ScrollReveal } from "@/components/ScrollReveal";
import { Leaf } from "lucide-react";

const IntroSection = () => {
  return (
    <section className="py-14 md:py-20 bg-card">
      <div className="container mx-auto px-6 max-w-2xl">
        <ScrollReveal>
          <div className="space-y-6 text-center">
            <p className="text-xl md:text-2xl text-foreground font-serif leading-relaxed">
              Misschien herken je het.
            </p>
            <p className="text-muted-foreground leading-[1.8] text-base md:text-lg">
              Dat stemmetje van binnen dat zegt dat je het niet goed genoeg doet.
              <br className="hidden md:block" />
              Dat je meer je best moet doen. Dat je beter zou moeten zijn.
            </p>
            <p className="text-muted-foreground/80 leading-[1.8] text-base md:text-lg italic">
              En zelfs als je wéét dat het niet helpt… blijft die stem terugkomen.
            </p>
            <p className="text-foreground leading-[1.8] text-base md:text-lg font-medium pt-2">
              Niet omdat er iets mis is met jou — maar omdat je nooit hebt geleerd
              <br className="hidden md:block" />
              hoe je op een andere manier met jezelf om kunt gaan.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 flex justify-center">
            <Leaf className="h-5 w-5 text-sage-300" />
          </div>
          <div className="mt-6 bg-background rounded-2xl border border-border/40 p-6 md:p-8 space-y-4 text-center">
            <p className="text-foreground leading-[1.8] text-base md:text-lg">
              <strong className="font-semibold">Mindful Self-Compassion (MSC)</strong> helpt je precies daarin.
              Niet door jezelf te veranderen, maar door te leren hoe je jezelf kunt ondersteunen — juist op de momenten dat het moeilijk is.
            </p>
            <p className="text-muted-foreground leading-[1.8]">
              Zodat er meer rust ontstaat. Meer ruimte. En uiteindelijk ook meer vertrouwen.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <blockquote className="mt-12 text-center relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-4xl text-terracotta-200 font-serif leading-none select-none">"</span>
            <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed pt-4">
              Behandel jezelf zoals je een goede vriendin zou behandelen.
            </p>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IntroSection;
