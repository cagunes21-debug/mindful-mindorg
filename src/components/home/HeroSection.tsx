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
          <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
            Mindful Mind · Individuele Begeleiding
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s", lineHeight: "1.05" }}>
            Van zelfkritiek
            <br />
            naar <em className="italic">zelfvertrouwen</em>
          </h1>
          <p className="text-lg md:text-xl text-secondary font-light leading-relaxed mb-4 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Je bent niet te veel. Je bent niet te weinig. Maar dat stemmetje in je hoofd zegt iets anders — en je bent het moe.
          </p>
          <p className="text-base text-secondary/80 font-light leading-relaxed mb-10 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            Mindful Self-Compassion (MSC) is een bewezen methode uit de psychologie die je helpt om milder met jezelf om te gaan — zodat je meer rust, veerkracht en vertrouwen ervaart in je dagelijks leven.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Link
              to="/contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
            >
              Plan een gratis kennismaking
            </Link>
            <Link
              to="/msc-training"
              className="inline-block border border-primary-foreground/50 text-primary-foreground px-8 py-4 rounded-lg font-sans font-semibold text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition-colors"
            >
              Bekijk de groepstraining
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
