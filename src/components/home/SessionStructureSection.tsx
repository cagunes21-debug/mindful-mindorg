import { MessageCircle, Search, Flower2, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: MessageCircle, label: "Een korte check-in" },
  { icon: Search, label: "Verdiepende coaching en reflectie" },
  { icon: Flower2, label: "Mindfulness- of lichaamsgerichte oefening" },
  { icon: Lightbulb, label: "Concrete handvatten voor thuis" },
];

const SessionStructureSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-200/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-3xl relative">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3"
          >
            🔄 De sessie
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-foreground mb-4"
          >
            Hoe ziet een sessie <em className="italic text-primary">eruit?</em>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-0.5 bg-primary mx-auto origin-center"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 rounded-xl bg-background border border-border/50 p-4"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <step.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground text-sm leading-snug">{step.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center space-y-1"
        >
          <p className="text-sm text-muted-foreground">📅 Sessies vinden online plaats</p>
          <p className="text-sm text-muted-foreground">Betaling in termijnen is mogelijk</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SessionStructureSection;
