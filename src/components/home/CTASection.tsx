import { Link } from "react-router-dom";
import NewsletterForm from "@/components/NewsletterForm";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">
          Meld je nu aan
        </h2>
        <p className="text-xl font-serif italic mb-2 opacity-90">
          Je bent welkom zoals je bent
        </p>
        <p className="text-sm uppercase tracking-widest mb-10 opacity-70">
          Begin vandaag met jouw persoonlijke traject
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/contact"
            className="inline-block bg-primary-foreground text-primary px-10 py-4 rounded-lg font-sans font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
          >
            Plan een kennismaking
          </Link>
          <Link
            to="/msc-training"
            className="inline-block border border-primary-foreground/50 text-primary-foreground px-10 py-4 rounded-lg font-sans font-semibold text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition-colors"
          >
            Ontdek de groepstraining
          </Link>
        </div>

        {/* Nieuwsbrief */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-sm opacity-80 mb-3">
            Nog niet klaar om te starten? Ontvang maandelijks tips over mindfulness en zelfcompassie.
          </p>
          <div className="max-w-sm mx-auto">
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
