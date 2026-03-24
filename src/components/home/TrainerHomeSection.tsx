import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import caglaBio from "@/assets/cagla-bio.png";

const TrainerHomeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-warm-50">
      <div className="max-w-[1100px] mx-auto px-6">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Portrait */}
            <div className="aspect-[3/4] bg-sage-50 relative overflow-hidden">
              <img
                src={caglaBio}
                alt="Çağla Güneş — begeleider bij Mindful Mind"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-sage-600 mb-4">
                Begeleiding
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-1">
                Çağla Güneş
              </h2>
              <p className="text-xs tracking-[0.12em] uppercase text-sage-600 mb-6">
                Lichaamsgerichte Psychotherapeut · MSC Trainer
              </p>

              <blockquote className="border-l-2 border-sage-400 pl-5 mb-6">
                <p className="font-serif italic text-muted-foreground text-xl leading-relaxed">
                  "Echte verandering begint bij hoe je met jezelf omgaat."
                </p>
              </blockquote>

              <p className="text-muted-foreground leading-[1.85] mb-6">
                Ik help je om met meer mildheid, veerkracht en zelfcompassie in het leven te staan. In mijn begeleiding combineer ik MSC met lichaamsgerichte therapie en trauma-sensitieve mindfulness — zodat verandering niet alleen in je hoofd, maar ook in je lijf voelbaar wordt.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["MSC gecertificeerd", "Lichaamsgerichte therapie", "Trauma-sensitief", "ACT"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-[0.1em] uppercase px-3 py-1.5 border border-warm-300 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to="/over-ons"
                className="border border-warm-300 text-foreground px-8 py-3 text-xs tracking-[0.15em] uppercase font-medium hover:border-sage-500 hover:text-sage-600 transition-colors inline-block"
              >
                Meer over Mindful Mind
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrainerHomeSection;
