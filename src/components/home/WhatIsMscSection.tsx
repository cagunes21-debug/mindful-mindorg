import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const struggles = ["vastloopt", "twijfelt", "fouten maakt", "of het gewoon even niet meer weet"];

const WhatIsMscSection = () => {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 max-w-xl">
        {/* Titel */}
        <ScrollReveal>
          <div className="flex items-center gap-2 justify-center mb-8">
            <Leaf className="h-4 w-4 text-sage-500" />
            <p className="text-xs uppercase tracking-[0.25em] text-sage-600 font-medium">De methode</p>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-foreground text-center mb-10">
            Wat is Mindful <em className="italic text-primary">Self-Compassion?</em>
          </h2>
        </ScrollReveal>

        {/* Streng voor jezelf */}
        <ScrollReveal delay={0.05}>
          <div className="text-center space-y-1 text-muted-foreground leading-[2] text-base md:text-lg mb-8">
            <p className="text-foreground font-medium">Veel mensen zijn gewend om streng te zijn voor zichzelf.</p>
            <p>Om door te gaan,</p>
            <p>zelfs als het eigenlijk te veel is.</p>
            <p>Om gevoelens weg te duwen,</p>
            <p>te analyseren</p>
            <p>of te negeren.</p>
          </div>
        </ScrollReveal>

        {/* Kernvraag */}
        <ScrollReveal delay={0.1}>
          <div className="bg-gradient-to-r from-terracotta-50 to-warm-50 border-l-3 border-terracotta-400 rounded-r-xl px-5 py-4 mb-8">
            <p className="text-foreground leading-[1.9] text-base md:text-lg">
              Maar wat als je in moeilijke momenten
              <br />
              niet harder hoeft te worden —
              <br />
              <strong className="font-semibold">maar juist zachter?</strong>
            </p>
          </div>
        </ScrollReveal>

        {/* Uitleg */}
        <ScrollReveal delay={0.15}>
          <div className="text-center space-y-4 text-base md:text-lg leading-[1.9] mb-8">
            <p className="text-foreground">
              Mindful Self-Compassion (MSC) helpt je om op een andere manier met jezelf om te gaan.
            </p>
            <div className="text-muted-foreground">
              <p>Niet door jezelf te veranderen,</p>
              <p>maar door te leren</p>
              <p>hoe je jezelf kunt dragen.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Leaf divider */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center my-8">
            <Leaf className="h-5 w-5 text-sage-400" />
          </div>
        </ScrollReveal>

        {/* Wat het niet is */}
        <ScrollReveal delay={0.25}>
          <div className="bg-sage-50 rounded-2xl border border-sage-200/60 p-6 text-center space-y-4 text-base md:text-lg leading-[1.9] mb-8">
            <p className="text-foreground">
              Zelfcompassie betekent niet dat je jezelf zielig vindt
              <br />
              of excuses maakt.
            </p>
            <p className="text-foreground">
              Het betekent dat je jezelf behandelt
              <br />
              met dezelfde vriendelijkheid en begrip
              <br />
              die je vanzelf aan een ander zou geven.
            </p>
          </div>
        </ScrollReveal>

        {/* Juist wanneer */}
        <ScrollReveal delay={0.3}>
          <p className="text-foreground font-medium text-center mb-4">Juist wanneer je:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {struggles.map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="inline-flex items-center gap-2 rounded-full bg-warm-50 border border-terracotta-200/50 px-4 py-2.5 text-sm text-foreground shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-terracotta-400 flex-shrink-0" />
                {item}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhatIsMscSection;
