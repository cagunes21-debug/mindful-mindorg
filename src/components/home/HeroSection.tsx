import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mindful.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Vrouw mediteert in de natuur" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/30" />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-secondary font-sans text-sm tracking-[0.25em] uppercase mb-4 animate-fade-in-up">
            Mindful Mind · Individuele Begeleiding
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Ontdek je
            <br />
            <em className="italic">innerlijke kracht</em>
          </h1>
          <p className="text-lg md:text-xl text-secondary font-light leading-relaxed mb-10 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Individuele sessies Mindful Zelfcompassie — op jouw tempo, afgestemd op jouw behoeften.
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
            <Link
              to="/contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
            >
              Plan een kennismaking
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
