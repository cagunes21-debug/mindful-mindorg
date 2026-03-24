import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import caglaBio from "@/assets/cagla-bio.png";

const TrainerHomeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-warm-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Portrait */}
            <div className="aspect-[3/4] bg-sage-50 rounded-3xl overflow-hidden shadow-lg">
              <img
                src={caglaBio}
                alt="Çağla Güneş — begeleider bij Mindful Mind"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-terracotta-500 mb-4">
                Begeleiding
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-1">
                Çağla Güneş
              </h2>
              <p className="text-xs tracking-[0.12em] uppercase text-terracotta-500 mb-6">
                Lichaamsgerichte Psychotherapeut · MSC Trainer
              </p>

              <blockquote className="border-l-2 border-terracotta-400 pl-5 mb-6">
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
                    className="text-xs tracking-[0.1em] uppercase px-3 py-1.5 border border-terracotta-200 text-terracotta-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to="/over-ons"
                className="inline-block border border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 px-8 py-3 text-xs tracking-[0.15em] uppercase font-medium rounded-full transition-colors"
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
