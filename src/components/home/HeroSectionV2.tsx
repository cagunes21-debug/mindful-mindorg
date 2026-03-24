import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mindful.jpg";

const HeroSectionV2 = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Vrouw mediteert in de natuur" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 to-foreground/30" />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
        <div className="max-w-xl">
          <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
            Mindful Mind · Zelfcompassie
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-foreground leading-[1.05] mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            Van zelfkritiek
            <br />
            naar meer <em className="italic">rust en vertrouwen</em>
          </h1>
          <p
            className="text-lg text-secondary/90 font-light leading-relaxed mb-8 max-w-md animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Mindful Self-Compassion helpt je om jezelf te ondersteunen — juist op de momenten dat het moeilijk is.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
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
