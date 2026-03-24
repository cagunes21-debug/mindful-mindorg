import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const struggles = ["vastloopt", "twijfelt", "fouten maakt", "of het gewoon even niet meer weet"];

const WhatIsMscSection = () => {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-6 max-w-2xl">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-terracotta-500 font-medium mb-3">De methode</p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              Wat is Mindful <em className="italic text-primary">Self-Compassion?</em>
            </h2>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <div className="space-y-6 text-base md:text-lg leading-[1.8]">
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
            <p className="text-foreground font-medium bg-terracotta-50/50 border-l-2 border-terracotta-300 pl-5 py-3 rounded-r-lg">
              Maar wat als je in moeilijke momenten niet harder hoeft te worden — maar juist zachter?
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground">
              Zelfcompassie betekent niet dat je jezelf zielig vindt of excuses maakt. Het betekent dat je jezelf behandelt met dezelfde vriendelijkheid en begrip die je vanzelf aan een ander zou geven.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="text-foreground font-medium mt-2 mb-3">Juist wanneer je:</p>
            <div className="flex flex-wrap gap-2">
              {struggles.map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="inline-flex items-center gap-2 rounded-full bg-card border border-border/50 px-4 py-2.5 text-sm text-foreground shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 flex-shrink-0" />
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
