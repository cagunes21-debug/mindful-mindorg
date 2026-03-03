import { motion } from "framer-motion";

const items = [
  "Over je grenzen heen gaat",
  "Veel piekert of in je hoofd zit",
  "Gevoelig bent voor prikkels",
  "Meer verbinding wilt voelen",
  "Een nieuwe fase ingaat",
];

const ForWhomSection = () => {
  return (
    <section className="py-12 md:py-16 bg-background relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <div className="md:w-1/3 text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">🌿 Herkenning</p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              Voor wie is dit <em className="italic text-primary">traject?</em>
            </h2>
          </div>

          <div className="md:w-2/3 flex flex-wrap gap-2 justify-center md:justify-start">
            {items.map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="inline-flex items-center gap-2 rounded-full bg-card border border-border/50 px-4 py-2 text-sm text-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForWhomSection;
