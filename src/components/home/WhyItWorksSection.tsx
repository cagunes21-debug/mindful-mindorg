import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Leaf, X, Check } from "lucide-react";

const before = ["jezelf onder druk zetten", "blijven doorgaan", "jezelf bekritiseren"];
const after = ["vertragen", "voelen wat er speelt", "jezelf ondersteunen in plaats van tegenwerken"];

const WhyItWorksSection = () => {
  return (
    <section className="py-14 md:py-20 bg-warm-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <ScrollReveal>
          <div className="flex items-center gap-2 justify-center mb-8">
            <Leaf className="h-4 w-4 text-sage-500" />
            <p className="text-xs uppercase tracking-[0.25em] text-sage-600 font-medium">De verschuiving</p>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-foreground text-center mb-10">
            Wat <em className="italic text-primary">verandert</em> er?
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-4">
          {/* In plaats van */}
          <ScrollReveal delay={0.05}>
            <div className="bg-white rounded-2xl border border-terracotta-200/40 p-5 h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-terracotta-500 font-medium mb-4">In plaats van:</p>
              <div className="space-y-3">
                {before.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                      <X className="h-3 w-3 text-terracotta-500" />
                    </div>
                    <span className="text-muted-foreground text-[0.95rem]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Leer je */}
          <ScrollReveal delay={0.15}>
            <div className="bg-sage-50 rounded-2xl border border-sage-200/60 p-5 h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-sage-600 font-medium mb-4">Leer je:</p>
              <div className="space-y-3">
                {after.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-sage-700" />
                    </div>
                    <span className="text-foreground text-[0.95rem]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorksSection;
