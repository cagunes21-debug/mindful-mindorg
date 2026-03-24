import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GroupCtaSection = () => {
  return (
    <section className="py-20 md:py-28 bg-terracotta-600">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-white/60 mb-4">
                Liever samen groeien?
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-4">
                Groepstraining
              </h2>
              <p className="text-white/80 leading-[1.8] max-w-xl mb-4">
                De 8-weekse MSC groepstraining biedt dezelfde wetenschappelijk onderbouwde basis — in de kracht van een groep.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                {["8 weken", "Start september 2026", "Early bird t/m 1 augustus"].map((badge) => (
                  <span key={badge} className="bg-white/15 border border-white/20 px-4 py-1.5 text-xs tracking-[0.08em] text-white/90 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
              <p className="font-serif text-white/60">
                Vanaf <strong className="text-white text-2xl font-light mr-1">€495</strong> early bird
              </p>
            </div>
            <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-warm-50 rounded-full px-10 py-7 text-base font-medium shadow-lg">
              <Link to="/msc-training">
                Bekijk de groepstraining
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GroupCtaSection;
