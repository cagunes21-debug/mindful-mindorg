import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const struggles = ["vastloopt", "twijfelt", "fouten maakt", "of het gewoon even niet meer weet"];

const WhatIsMscSection = () => {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 max-w-2xl">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-terracotta-500 font-medium mb-3">De methode</p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              Wat is Mindful <em className="italic text-primary">Self-Compassion?</em>
            </h2>
            <div className="w-12 h-0.5 bg-terracotta-300/60 mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <div className="space-y-6 text-base md:text-lg leading-[1.9]">
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
            <div className="bg-gradient-to-r from-terracotta-50 to-warm-50 border-l-3 border-terracotta-400 pl-5 pr-4 py-4 rounded-r-xl">
              <p className="text-foreground font-medium">
                Maar wat als je in moeilijke momenten niet harder hoeft te worden — maar juist zachter?
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground">
              Zelfcompassie betekent niet dat je jezelf zielig vindt of excuses maakt. Het betekent dat je jezelf behandelt met dezelfde vriendelijkheid en begrip die je vanzelf aan een ander zou geven.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="bg-warm-50 rounded-2xl border border-warm-200 p-5 mt-2">
              <p className="text-foreground font-medium mb-3">Juist wanneer je:</p>
              <div className="flex flex-wrap gap-2">
                {struggles.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="inline-flex items-center gap-2 rounded-full bg-white border border-terracotta-200/60 px-4 py-2.5 text-sm text-foreground shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-terracotta-400 flex-shrink-0" />
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhatIsMscSection;
