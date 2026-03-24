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
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-14">
          <div className="flex-1">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.25em] text-terracotta-500 font-medium mb-3">Wetenschappelijk onderbouwd</p>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3">
                Waarom dit <em className="italic text-primary">werkt</em>
              </h2>
              <div className="w-12 h-0.5 bg-primary/40 mb-5" />
              <p className="text-muted-foreground leading-[1.8]">
                Onderzoek laat zien dat zelfcompassie helpt bij:
              </p>
            </ScrollReveal>
          </div>

          <div className="flex-1 space-y-2.5">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-3 bg-card rounded-xl px-4 py-3.5 border border-border/40 shadow-sm"
              >
                <div className="h-6 w-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-sage-700" />
                </div>
                <span className="text-foreground text-[0.95rem]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorksSection;
