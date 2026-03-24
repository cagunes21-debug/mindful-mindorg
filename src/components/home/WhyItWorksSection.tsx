import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
  "minder stress, angst en zelfkritiek",
  "meer emotionele veerkracht",
  "betere relaties (ook met jezelf)",
  "meer rust en stabiliteit",
];

const WhyItWorksSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-10 -left-20 w-72 h-72 bg-terracotta-200/15 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-72 h-72 bg-sage-200/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-3xl relative">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">Wetenschappelijk onderbouwd</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Waarom dit <em className="italic text-primary">werkt</em>
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg text-foreground mb-8 text-center leading-relaxed">
            Onderzoek laat zien dat zelfcompassie helpt bij:
          </p>
        </ScrollReveal>

        <div className="max-w-md mx-auto space-y-4">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="flex items-center gap-3 bg-card rounded-xl px-5 py-4 border border-border/50"
            >
              <div className="h-7 w-7 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                <Check className="h-3.5 w-3.5 text-terracotta-600" />
              </div>
              <span className="text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItWorksSection;
