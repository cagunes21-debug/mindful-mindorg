import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mindful.jpg";

const HeroHome = () => {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Vrouw mediteert in de natuur" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/50 to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <p className="text-secondary/70 text-xs tracking-[0.3em] uppercase mb-5 font-medium">
            Mindful Mind · Individuele begeleiding
          </p>
          <div className="text-primary-foreground text-2xl md:text-3xl font-serif leading-[1.8] mb-6">
            <p>Meer rust.</p>
            <p>Meer zachtheid.</p>
            <p>Meer stevigheid in jezelf.</p>
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-secondary/80 leading-relaxed mb-10 max-w-lg">
            Leer jezelf ondersteunen zoals je een goede vriendin zou ondersteunen — juist wanneer het moeilijk is
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Gratis kennismaking
            </Link>
            <Link
              to="/msc-training"
              className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
            >
              Groepstraining
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroHome;
