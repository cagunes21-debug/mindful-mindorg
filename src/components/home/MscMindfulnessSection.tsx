import { ScrollReveal } from "@/components/ScrollReveal";

const MscMindfulnessSection = () => {
  return (
    <section className="py-14 md:py-20 bg-card">
      <div className="container mx-auto px-6 max-w-2xl">
        <ScrollReveal>
          <div className="bg-background rounded-2xl p-6 md:p-10 border border-border/50 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">De verbinding</p>
            <h2 className="text-xl md:text-2xl font-serif text-foreground mb-4">
              MSC en <em className="italic text-primary">mindfulness</em>
            </h2>
            <p className="text-foreground leading-relaxed mb-3">
              Mindfulness helpt je om te voelen wat er is. Zelfcompassie helpt je om daar op een ondersteunende manier mee om te gaan.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Niet door het te fixen. Maar door jezelf er niet alleen doorheen te laten gaan.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MscMindfulnessSection;
