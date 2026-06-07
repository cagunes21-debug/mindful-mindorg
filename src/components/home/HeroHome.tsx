import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-mindful.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroHome = () => {
  const { t } = useLanguage();
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
            {t("home.hero.eyebrow")}
          </p>
          <div className="text-primary-foreground text-2xl md:text-4xl font-serif leading-[1.3] mb-6">
            <p>{t("home.hero.line1")}</p>
            <p>{t("home.hero.line2")}</p>
            {t("home.hero.line3") && <p>{t("home.hero.line3")}</p>}
          </div>
          <p className="text-sm md:text-base font-normal text-secondary/70 leading-relaxed mb-6 max-w-md">
            {t("home.hero.headline")}
          </p>
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta-300 animate-pulse" />
            <span className="text-xs tracking-wide text-primary-foreground/90">
              {t("home.hero.startBadge")}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              {t("home.hero.ctaPrimary")}
            </Link>
            <Link
              to="/msc-training"
              className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
            >
              {t("home.hero.ctaSecondary")}
            </Link>
            <Link
              to="/ons-aanbod"
              className="inline-flex items-center justify-center text-primary-foreground/90 h-12 px-4 rounded-full text-sm tracking-wide hover:text-primary-foreground underline-offset-4 hover:underline transition-colors"
            >
              {t("home.hero.ctaTertiary")} →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroHome;
