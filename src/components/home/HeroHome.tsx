import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroHome = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
      {/* Left */}
      <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 lg:py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.2em] uppercase text-sage-600 mb-8 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-sage-400" />
          Mindful Mind · Individuele begeleiding
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light leading-[1.05] text-foreground mb-8"
        >
          Meer rust.
          <br />
          Meer zachtheid.
          <br />
          <em className="italic text-sage-600 block">
            Meer stevigheid
            <br />
            in jezelf.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-muted-foreground text-base md:text-lg leading-[1.85] max-w-md mb-10"
        >
          Leer jezelf ondersteunen zoals je een goede vriendin zou ondersteunen — juist wanneer het moeilijk is.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <Link
            to="/contact"
            className="bg-foreground text-background px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-medium hover:bg-sage-600 transition-colors"
          >
            Gratis kennismaking
          </Link>
          <Link
            to="/msc-training"
            className="border border-warm-300 text-foreground px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-medium hover:border-sage-500 hover:text-sage-600 transition-colors"
          >
            Groepstraining
          </Link>
        </motion.div>
      </div>

      {/* Right — animated circle */}
      <div className="relative bg-sage-50 overflow-hidden hidden lg:flex items-center justify-center">
        <div className="relative w-80 h-80">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-sage-200 animate-pulse" />
          <div className="absolute -inset-8 rounded-full border border-sage-200/50 animate-pulse" style={{ animationDelay: "1.5s" }} />
          {/* Inner circle */}
          <div className="absolute inset-10 rounded-full bg-gradient-to-br from-sage-100 to-sage-50 flex items-center justify-center">
            <p className="font-serif italic text-muted-foreground text-center text-lg leading-relaxed px-8">
              "Behandel jezelf
              <br />
              zoals je een goede
              <br />
              vriendin zou behandelen"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
