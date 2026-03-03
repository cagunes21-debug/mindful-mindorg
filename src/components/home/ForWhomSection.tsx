import { motion } from "framer-motion";

const items = [
  "Vaak over je eigen grenzen heen gaat",
  "Veel in je hoofd zit en moeilijk ontspant",
  "Gevoelig bent voor prikkels of emoties",
  "Meer verbinding met jezelf wilt ervaren",
  "Een nieuwe fase in je leven ingaat",
];

const ForWhomSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-10 right-0 w-64 h-64 bg-lavender-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-3xl relative">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3"
          >
            🌿 Herkenning
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-foreground mb-4"
          >
            Voor wie is dit <em className="italic text-primary">traject?</em>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-0.5 bg-primary mx-auto origin-center mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Dit traject is geschikt voor jou als je:
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto space-y-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="flex items-center gap-3 rounded-lg bg-card border border-border/50 px-5 py-3"
            >
              <span className="text-primary text-lg">·</span>
              <span className="text-foreground text-sm leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ForWhomSection;
