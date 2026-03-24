import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mindful.jpg";

const HeroSectionV2 = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Vrouw mediteert in de natuur" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/30" />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
            Mindful Mind · Zelfcompassie
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s", lineHeight: "1.05" }}>
            Van zelfkritiek
            <br />
            naar meer <em className="italic">rust en vertrouwen</em>
          </h1>
          <p className="text-lg md:text-xl text-secondary font-light leading-relaxed mb-4 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Misschien herken je het.
          </p>
          <p className="text-base text-secondary/90 font-light leading-relaxed mb-4 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            Dat stemmetje van binnen dat zegt dat je het niet goed genoeg doet. Dat je meer je best moet doen. Dat je beter zou moeten zijn.
          </p>
          <p className="text-base text-secondary/80 font-light leading-relaxed mb-4 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            En zelfs als je wéét dat het niet helpt… blijft die stem terugkomen.
          </p>
          <p className="text-base text-secondary/80 font-light leading-relaxed mb-4 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
            Niet omdat er iets mis is met jou — maar omdat je nooit hebt geleerd hoe je op een andere manier met jezelf om kunt gaan.
          </p>
          <p className="text-base text-secondary/90 font-medium leading-relaxed mb-4 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            Mindful Self-Compassion (MSC) helpt je precies daarin.
          </p>
          <p className="text-base text-secondary/80 font-light leading-relaxed mb-4 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
            Niet door jezelf te veranderen, maar door te leren hoe je jezelf kunt ondersteunen — juist op de momenten dat het moeilijk is.
          </p>
          <p className="text-base text-secondary/80 font-light leading-relaxed mb-10 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            Zodat er meer rust ontstaat. Meer ruimte. En uiteindelijk ook meer vertrouwen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.65s" }}>
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

export default HeroSectionV2;
