import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";

const FinalCtaSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-warm-200 text-center">
      <div className="max-w-xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-[1.15] mb-4">
            Je bent welkom
            <br />
            <em className="italic text-sage-600">zoals je bent</em>
          </h2>
          <p className="text-muted-foreground leading-[1.8] mb-8">
            Begin vandaag met jouw persoonlijke traject. Het kennismakingsgesprek is altijd gratis en vrijblijvend.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <Link
              to="/contact"
              className="bg-foreground text-background px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-medium hover:bg-sage-600 transition-colors"
            >
              Plan een kennismaking
            </Link>
            <Link
              to="/msc-training"
              className="border border-warm-300 text-foreground px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-medium hover:border-sage-500 hover:text-sage-600 transition-colors"
            >
              Ontdek de groepstraining
            </Link>
          </div>
          <p className="font-serif italic text-sm text-muted-foreground">
            Het kennismakingsgesprek is gratis en vrijblijvend.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCtaSection;
