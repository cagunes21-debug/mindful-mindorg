import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";

const FinalCtaSection = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary-foreground/50 font-medium mb-4">Meld je nu aan</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-3 leading-tight">
              Je bent welkom zoals je bent
            </h2>
            <p className="text-primary-foreground/75 text-lg mb-10 leading-relaxed max-w-md mx-auto">
              Begin vandaag met jouw persoonlijke traject. Het kennismakingsgesprek is altijd gratis en vrijblijvend.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-primary-foreground text-primary h-12 px-10 rounded-full font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity shadow-lg"
              >
                Plan een kennismaking
              </Link>
              <Link
                to="/msc-training"
                className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition-colors"
              >
                Ontdek de groepstraining
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
