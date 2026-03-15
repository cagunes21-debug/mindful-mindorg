import { Link } from "react-router-dom";
import caglaBio from "@/assets/cagla-bio.png";

const TrainersSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Ontmoet de trainers
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>
        <div className="max-w-sm mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <span className="font-serif text-2xl text-primary">Ç</span>
          </div>
          <h3 className="font-serif text-xl text-foreground mb-1">Çağla Güneş</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Lichaamsgerichte Psychotherapeut · Mindful Zelfcompassie Trainer
          </p>
          <p className="font-serif italic text-foreground text-base mb-4">
            "Echte verandering begint bij hoe je met jezelf omgaat."
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Ik help je om met meer mildheid, veerkracht en zelfcompassie in het leven te staan.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            to="/over-ons"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-sans font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
          >
            Meer over Mindful Mind
          </Link>
          <Link
            to="/trainers"
            className="inline-block border border-border text-foreground px-8 py-3 rounded-lg font-sans font-semibold text-sm tracking-wide uppercase hover:bg-secondary transition-colors"
          >
            Over de trainers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
