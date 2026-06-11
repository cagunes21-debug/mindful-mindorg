import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mindful.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroHome = () => {
  const { t } = useLanguage();
  return (
    <section className="relative w-full bg-[hsl(var(--warm-50))] overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 z-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-sage-600/30 bg-sage-600/5 text-sage-700 text-xs font-medium uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-600 animate-pulse" />
              {t("home.hero.startBadge")}
            </div>

            <h1 className="font-serif text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8">
              {t("home.hero.line1")}
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-[1.7] mb-10 border-l border-sage-600/30 pl-6">
              {t("home.hero.headline")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Link
                to="/coaching"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-sm transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium tracking-wide uppercase"
              >
                {t("home.hero.ctaPrimary")}
              </Link>
              <Link
                to="/msc-training"
                className="group flex items-center gap-2 text-sage-700 text-sm font-medium tracking-wide uppercase border-b border-transparent hover:border-sage-600 transition-all py-1"
              >
                {t("home.hero.ctaSecondary")}
                <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              {/* Decorative corner */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-t border-r border-terracotta-300/50 hidden md:block" />

              {/* Framed image */}
              <div className="w-full h-full overflow-hidden rounded-t-[14rem] rounded-b-lg shadow-2xl">
                <img
                  src={heroImage}
                  alt="Vrouw mediteert in de natuur"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating sage accent */}
              <div className="absolute -bottom-8 -left-6 md:-left-10 bg-sage-600 text-white p-6 md:p-8 hidden md:block shadow-xl">
                <p className="font-serif text-2xl md:text-3xl italic leading-tight">
                  Zelfzorg is een<br />vaardigheid.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
