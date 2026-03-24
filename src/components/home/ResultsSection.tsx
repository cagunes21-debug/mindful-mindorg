import { Check, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

const results = [
  "Meer innerlijke rust en minder piekeren",
  "Sterkere grenzen leren stellen",
  "Meer zelfvertrouwen en zelfcompassie",
  "Beter omgaan met stress en emoties",
  "Heldere keuzes maken vanuit wie jij écht bent",
];

const ResultsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sage-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-3xl relative">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3"
          >
            Resultaat
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-foreground mb-4"
          >
            Wat levert het je <em className="italic text-primary">op?</em>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-0.5 bg-primary mx-auto origin-center"
          />
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4 max-w-md mx-auto"
        >
          {results.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-start gap-3 text-foreground"
            >
              <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 text-primary" />
              </span>
              <span className="text-base leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2.5 bg-sage-50 border border-sage-200/60 rounded-full px-5 py-2.5 mx-auto w-fit"
        >
          <FlaskConical className="h-4 w-4 text-sage-500" />
          <span className="text-xs md:text-sm text-muted-foreground">
            Wetenschappelijk onderbouwd — gebaseerd op 3.500+ peer-reviewed studies
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
