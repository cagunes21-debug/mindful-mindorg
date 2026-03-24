import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const struggles = ["vastloopt", "twijfelt", "fouten maakt", "of het gewoon even niet meer weet"];

const WhatIsMscSection = () => {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-6 max-w-2xl">
        <ScrollReveal>
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">De methode</p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              Wat is Mindful <em className="italic text-primary">Self-Compassion?</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-4 text-base leading-relaxed">
          <ScrollReveal delay={0.05}>
            <p className="text-foreground">
              Mindful Self-Compassion is een methode die je helpt om op een andere manier met jezelf om te gaan.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-muted-foreground">
              Veel mensen zijn gewend om streng te zijn voor zichzelf. Om door te gaan. Om gevoelens weg te duwen of te analyseren.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-foreground font-medium">
              Maar wat als je in moeilijke momenten niet harder hoeft te worden — maar juist zachter?
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground">
              Zelfcompassie betekent niet dat je jezelf zielig vindt of excuses maakt. Het betekent dat je jezelf behandelt met dezelfde vriendelijkheid en begrip die je vanzelf aan een ander zou geven.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="text-foreground font-medium mt-6 mb-3">Juist wanneer je:</p>
            <div className="flex flex-wrap gap-2">
              {struggles.map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="inline-flex items-center gap-2 rounded-full bg-card border border-border/50 px-4 py-2 text-sm text-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhatIsMscSection;
