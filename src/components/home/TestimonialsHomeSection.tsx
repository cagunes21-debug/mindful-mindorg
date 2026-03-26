import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Anna M.",
    training: "8-weekse MSC Training",
    text: "Deze training heeft mijn leven veranderd. Ik heb geleerd om op een zachte manier met mezelf om te gaan in plaats van altijd maar door te gaan.",
  },
  {
    name: "Sophie L.",
    training: "Individuele Coaching",
    text: "De individuele sessies gaven me precies de ruimte die ik nodig had. Çağla luistert met warmte en wijsheid, en stelt de juiste vragen op het juiste moment.",
  },
  {
    name: "Mark V.",
    training: "8-weekse MSC Training",
    text: "Als iemand die altijd bezig was met presteren, was dit een openbaring. Ik merk dat ik rustiger ben in stressvolle situaties.",
  },
];

const TestimonialsHomeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta-100/20 rounded-full blur-[100px]" />
      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">
                Ervaringen
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Wat deelnemers <em className="italic text-primary">zeggen</em>
              </h2>
              <p className="text-muted-foreground font-light max-w-md mx-auto">
                Ontdek hoe anderen hun reis naar meer zelfcompassie hebben ervaren.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200/60 h-full flex flex-col">
                  <Quote className="h-6 w-6 text-terracotta-200 mb-3 flex-shrink-0" />
                  <p className="text-foreground text-sm leading-[1.8] mb-5 flex-grow">
                    "{t.text}"
                  </p>
                  <div className="pt-4 border-t border-warm-200/40">
                    <div className="flex gap-0.5 mb-1.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-terracotta-400 text-terracotta-400" />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.training}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.15}>
            <div className="text-center mt-10">
              <Link
                to="/ervaringen"
                className="inline-flex items-center gap-1.5 text-sm text-terracotta-600 hover:text-primary transition-colors group font-medium"
              >
                Alle ervaringen bekijken
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHomeSection;
