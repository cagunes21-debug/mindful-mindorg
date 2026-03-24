import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";

const GroupCtaSection = () => {
  return (
    <section className="py-20 md:py-28 bg-sage-600">
      <div className="max-w-[1100px] mx-auto px-6">
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
                  <span key={badge} className="bg-white/15 border border-white/20 px-4 py-1.5 text-xs tracking-[0.08em] text-white/90">
                    {badge}
                  </span>
                ))}
              </div>
              <p className="font-serif text-white/60">
                Vanaf <strong className="text-white text-2xl font-light mr-1">€495</strong> early bird
              </p>
            </div>
            <Link
              to="/msc-training"
              className="bg-background text-foreground px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-medium hover:opacity-85 transition-opacity whitespace-nowrap"
            >
              Bekijk de groepstraining
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GroupCtaSection;
