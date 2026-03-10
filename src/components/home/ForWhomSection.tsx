import { motion } from "framer-motion";

const items = [
  "Regelmatig over je grenzen heen gaat",
  "Veel piekert of vastzit in je hoofd",
  "Gevoelig bent voor prikkels en emoties",
  "Last hebt van perfectionisme",
  "Meer verbinding met jezelf wilt voelen",
  "In een nieuwe levensfase zit",
];

const steps = [
  { number: "01", title: "Kennismaking", description: "Een vrijblijvend gesprek om je wensen en behoeften te verkennen." },
  { number: "02", title: "Op maat", description: "Sessies afgestemd op jouw persoonlijke situatie en tempo." },
  { number: "03", title: "Integratie", description: "Oefeningen en tools om zelfcompassie in je dagelijks leven te weven." },
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

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[0, 1].map((col) => (
              <div key={col} className="flex flex-col gap-2">
                {items.slice(col * 3, col * 3 + 3).map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + (col * 3 + i) * 0.06 }}
                    className="inline-flex items-center gap-2 rounded-full bg-card border border-border/50 px-4 py-2 text-sm text-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Individuele begeleiding stappen */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 pt-8 border-t border-border/30"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 text-center md:text-left">
            Individuele begeleiding
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { number: "01", title: "Kennismaking", description: "Een vrijblijvend gesprek om je wensen en behoeften te verkennen." },
              { number: "02", title: "Op maat", description: "Sessies afgestemd op jouw persoonlijke situatie en tempo." },
              { number: "03", title: "Integratie", description: "Oefeningen en tools om zelfcompassie in je dagelijks leven te weven." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex gap-3"
              >
                <span className="text-lg font-light text-primary/40">{step.number}</span>
                <div>
                  <p className="text-sm font-medium text-foreground mb-0.5">{step.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ForWhomSection;
