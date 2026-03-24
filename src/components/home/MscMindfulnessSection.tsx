import { ScrollReveal } from "@/components/ScrollReveal";

const MscMindfulnessSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6 max-w-3xl">
        <ScrollReveal>
          <div className="bg-background rounded-3xl p-8 md:p-12 border border-border/50 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">De verbinding</p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6">
              MSC en <em className="italic text-primary">mindfulness</em>
            </h2>
            <p className="text-lg text-foreground leading-relaxed mb-4">
              Mindfulness helpt je om te voelen wat er is. Zelfcompassie helpt je om daar op een ondersteunende manier mee om te gaan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Niet door het te fixen. Maar door jezelf er niet alleen doorheen te laten gaan.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MscMindfulnessSection;
