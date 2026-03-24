import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mindful.jpg";
import { Leaf } from "lucide-react";

const HeroSectionV2 = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Vrouw mediteert in de natuur" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/20" />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
        <div className="max-w-lg">
          <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
            Mindful Mind · Zelfcompassie
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-foreground leading-[1.1] mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            Leer milder zijn
            <br />
            <em className="italic">voor jezelf</em>
          </h1>

          {/* Poetic intro */}
          <div className="space-y-5 mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-secondary/90 text-lg font-light leading-relaxed">
              Misschien herken je het.
            </p>
            <div className="text-secondary/75 font-light leading-[2]">
              <p>Je gaat maar door.</p>
              <p>Probeert het goed te doen.</p>
              <p>Voor anderen, voor jezelf.</p>
            </div>
            <div className="text-secondary/75 font-light leading-[2] italic">
              <p>En toch is daar die stem van binnen…</p>
              <p>die zegt dat het niet genoeg is.</p>
              <p>Dat jij niet genoeg bent.</p>
            </div>
          </div>

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
