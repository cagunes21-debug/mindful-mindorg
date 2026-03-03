import { motion } from "framer-motion";

const feelings = [
  { label: "Rust in je lichaam", color: "from-rose-200/60 to-rose-100/40", icon: "🌸" },
  { label: "Zachtheid naar jezelf", color: "from-lavender-200/60 to-lavender-100/40", icon: "💜" },
  { label: "Ruimte in je hoofd", color: "from-sage-200/60 to-sage-100/40", icon: "🍃" },
  { label: "Vertrouwen in je gevoel", color: "from-coral-200/60 to-coral-100/40", icon: "✨" },
];

const concreteResults = [
  "Je stelt duidelijker grenzen",
  "Je zegt vaker 'nee' zonder schuldgevoel",
  "Je herkent stresssignalen eerder",
  "Je maakt keuzes zonder eindeloos te twijfelen",
];

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-10 -left-20 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-72 h-72 bg-lavender-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-5xl relative">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3"
          >
            Jouw transformatie
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-foreground mb-4"
          >
            Wat je zult <em className="italic text-primary">ervaren</em>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-0.5 bg-primary mx-auto origin-center"
          />
        </div>

        {/* Feeling pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {feelings.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`bg-gradient-to-r ${f.color} rounded-full px-6 py-3 flex items-center gap-2 border border-border/30`}
            >
              <span className="text-lg">{f.icon}</span>
              <span className="text-sm font-medium text-foreground">{f.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Concrete results */}
        <div className="max-w-md mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-foreground text-center mb-8"
          >
            Concreet levert het je <em className="italic text-primary">op</em>
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-2">
            {concreteResults.map((item, i) => (
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
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
