import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const packageItems = [
  "Intakegesprek",
  "6 individuele sessies (60 min)",
  "Reflectiesessie ter afronding",
  "Persoonlijke oefeningen & handvatten",
  "Geleide meditaties voor thuis",
  "Ondersteuning per mail tussen sessies",
];

const PackageSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-terracotta-100/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-4xl relative">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3"
          >
            Individueel traject
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-foreground mb-4"
          >
            Mindful <em className="italic text-primary">Me</em>
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
            className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed"
          >
            Een persoonlijk 1-op-1 traject van 6 sessies waarin je stap voor stap leert om met meer mildheid en kracht in het leven te staan.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="inline-flex items-baseline gap-2 mb-1">
                <span className="text-lg text-muted-foreground line-through">€650</span>
                <span className="text-4xl font-serif text-primary">€550</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs bg-terracotta-100 text-terracotta-700 px-2 py-0.5 rounded-full font-medium">✨ Tijdelijke aanbieding</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">6 sessies · inclusief materiaal</p>
            </div>

            <div className="w-full h-px bg-border mb-6" />

            <ul className="space-y-3 mb-8">
              {packageItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground text-sm">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 rounded-xl font-sans font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
            >
              Plan een kennismaking
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="text-center mt-4 space-y-1">
            <p className="text-xs text-muted-foreground">📅 Sessies vinden online plaats · Betaling in termijnen mogelijk</p>
            <p className="text-xs text-muted-foreground">Het kennismakingsgesprek is vrijblijvend en kosteloos.</p>
          </div>

          {/* Stappen */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 pt-8 border-t border-border/30"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 text-center">
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
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex gap-3 text-center sm:text-left flex-col sm:flex-row items-center sm:items-start"
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
        </motion.div>
      </div>
    </section>
  );
};

export default PackageSection;
