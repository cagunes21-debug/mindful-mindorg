import { ScrollReveal } from "@/components/ScrollReveal";
import { Leaf } from "lucide-react";

const IntroSection = () => {
  return (
    <>
      {/* Block 1 — Herkenning */}
      <section className="py-14 md:py-20 bg-warm-50">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <ScrollReveal>
            <p className="text-2xl md:text-3xl text-foreground font-serif leading-relaxed mb-6">
              Misschien herken je het.
            </p>
            <p className="text-muted-foreground leading-[1.9] text-base md:text-lg max-w-lg mx-auto">
              Dat stemmetje van binnen dat zegt dat je het niet goed genoeg doet.
              Dat je meer je best moet doen. Dat je beter zou moeten zijn.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Block 2 — De stem */}
      <section className="py-12 md:py-16 bg-terracotta-50/40">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-terracotta-200/50 p-6 md:p-8 text-center shadow-sm">
              <p className="text-foreground leading-[1.9] text-base md:text-lg italic font-serif mb-4">
                En zelfs als je wéét dat het niet helpt… blijft die stem terugkomen.
              </p>
              <p className="text-foreground leading-[1.9] text-base md:text-lg font-medium">
                Niet omdat er iets mis is met jou — maar omdat je nooit hebt geleerd
                hoe je op een andere manier met jezelf om kunt gaan.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Block 3 — MSC als antwoord */}
      <section className="py-12 md:py-16 bg-sage-50/50">
        <div className="container mx-auto px-6 max-w-2xl">
          <ScrollReveal>
            <div className="flex justify-center mb-6">
              <div className="h-10 w-10 rounded-full bg-sage-100 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-sage-600" />
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-foreground leading-[1.9] text-base md:text-lg">
                <strong className="font-semibold text-sage-800">Mindful Self-Compassion (MSC)</strong> helpt je precies daarin.
                Niet door jezelf te veranderen, maar door te leren hoe je jezelf kunt ondersteunen — juist op de momenten dat het moeilijk is.
              </p>
              <p className="text-sage-700/80 leading-[1.9] text-base md:text-lg">
                Zodat er meer rust ontstaat. Meer ruimte. En uiteindelijk ook meer vertrouwen.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Block 4 — Quote */}
      <section className="py-10 md:py-14 bg-primary">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <ScrollReveal>
            <blockquote>
              <p className="text-xl md:text-2xl font-serif italic text-primary-foreground leading-relaxed">
                "Behandel jezelf zoals je een goede vriendin zou behandelen."
              </p>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default IntroSection;
