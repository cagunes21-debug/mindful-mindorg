import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mindful.jpg";

const HeroSectionV2 = () => {
  return (
    <section className="relative min-h-[65vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Vrouw mediteert in de natuur" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/30" />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
        <div className="max-w-xl">
          <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
            Mindful Mind · Zelfcompassie
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-foreground leading-[1.05] mb-5 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            Leer milder zijn
            <br />
            <em className="italic">voor jezelf</em>
          </h1>
          <p
            className="text-base md:text-lg text-secondary/90 font-light leading-relaxed mb-3 max-w-md animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Heb je last van dat stemmetje dat zegt dat je niet goed genoeg bent?
          </p>
          <p
            className="text-base text-secondary/70 font-light leading-relaxed mb-8 max-w-md animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Met Mindful Self-Compassion leer je jezelf ondersteunen in plaats van bekritiseren — voor meer rust, ruimte en vertrouwen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Link
              to="/contact"
              className="inline-block bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
            >
              Plan een gratis kennismaking
            </Link>
            <Link
              to="/msc-training"
              className="inline-block border border-primary-foreground/50 text-primary-foreground px-7 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition-colors"
            >
              Bekijk de groepstraining
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionV2;
