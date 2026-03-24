import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCtaSection = () => {
  return (
    <section className="py-24 md:py-32 bg-warm-50 text-center">
      <div className="max-w-xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-[1.15] mb-4">
            Je bent welkom
            <br />
            <span className="font-serif italic text-terracotta-600">zoals je bent</span>
          </h2>
          <p className="text-muted-foreground leading-[1.8] mb-8">
            Begin vandaag met jouw persoonlijke traject. Het kennismakingsgesprek is altijd gratis en vrijblijvend.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg">
              <Link to="/contact">
                Plan een kennismaking
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-10 py-7 text-lg">
              <Link to="/msc-training">
                Ontdek de groepstraining
              </Link>
            </Button>
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
