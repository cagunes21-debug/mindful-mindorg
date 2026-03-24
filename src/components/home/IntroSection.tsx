import { ScrollReveal } from "@/components/ScrollReveal";
import { Leaf } from "lucide-react";

const IntroSection = () => {
  return (
    <section className="py-14 md:py-20 bg-warm-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left — het probleem */}
          <ScrollReveal>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-terracotta-500 font-medium">Herken je dit?</p>
              <p className="text-foreground text-lg leading-[1.8] font-serif">
                Altijd maar doorgaan. Streng voor jezelf. En dat stemmetje dat zegt dat het niet genoeg is.
              </p>
              <p className="text-muted-foreground leading-[1.8]">
                Niet omdat er iets mis is met jou — maar omdat je nooit hebt geleerd hoe je op een andere manier met jezelf om kunt gaan.
              </p>
            </div>
          </ScrollReveal>

          {/* Right — het antwoord */}
          <ScrollReveal delay={0.1}>
            <div className="bg-sage-50 rounded-2xl border border-sage-200/60 p-6 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="h-4 w-4 text-sage-600" />
                <p className="text-xs uppercase tracking-[0.25em] text-sage-600 font-medium">De methode</p>
              </div>
              <p className="text-foreground leading-[1.8]">
                <strong className="font-semibold">Mindful Self-Compassion (MSC)</strong> leert je om jezelf te ondersteunen in plaats van te bekritiseren.
              </p>
              <p className="text-muted-foreground leading-[1.8] text-sm">
                Meer rust. Meer ruimte. Meer vertrouwen.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Quote */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 py-6 border-t border-b border-terracotta-200/40 text-center">
            <p className="text-lg md:text-xl font-serif italic text-foreground">
              "Behandel jezelf zoals je een goede vriendin zou behandelen."
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IntroSection;
