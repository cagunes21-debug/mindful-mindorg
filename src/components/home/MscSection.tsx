import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Leaf } from "lucide-react";

const pillars = [
  { num: "1", title: "Mindfulness", desc: "Erkennen wat er is — zonder het weg te duwen of te overdrijven. Aanwezig zijn bij pijn, ook als dat oncomfortabel voelt." },
  { num: "2", title: "Gemeenschappelijke menselijkheid", desc: "Beseffen dat lijden en onvolmaaktheid bij het menselijk bestaan horen. Jij bent niet de enige die dit voelt." },
  { num: "3", title: "Vriendelijkheid naar jezelf", desc: "Jezelf met warmte benaderen in moeilijke momenten — dezelfde zorg die je voor anderen voelt, ook op jezelf richten." },
];

const MscSection = () => {
  return (
    <>
      {/* MSC Kern — floating statement */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-sage-50 via-sage-50/50 to-warm-50 rounded-3xl border border-sage-200/50 p-8 md:p-12 text-center shadow-sm">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-sage-100 mb-6">
                <Leaf className="h-5 w-5 text-sage-600" />
              </div>
              <p className="text-xl md:text-2xl text-foreground leading-[1.6] font-serif mb-4">
                Mindful Self-Compassion (MSC) is een wetenschappelijk onderbouwde methode, ontwikkeld door dr. Kristin Neff en dr. Christopher Germer.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
                Niet door jezelf te veranderen, maar door jezelf te ondersteunen — juist wanneer het moeilijk is. Zelfcompassie leer je. Stap voor stap.
              </p>
              <Link
                to="/msc-training#wat-is-msc"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Meer over MSC
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-16 md:py-20 bg-[#F8F5EE]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-sage-600 font-medium mb-4">De drie pijlers</span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                  De basis van <em className="italic text-primary">zelfcompassie</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-4">
              {pillars.map((p, i) => (
                <ScrollReveal key={p.num} delay={i * 0.08}>
                  <div className="bg-white rounded-3xl border border-sage-200/40 p-7 shadow-sm text-center h-full">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-sage-100 text-sage-700 font-semibold text-sm mb-4">
                      {p.num}
                    </span>
                    <h3 className="font-serif italic text-foreground text-lg mb-3">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Founders */}
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-2xl border border-warm-200/50 p-5 text-center shadow-sm">
                  <p className="font-serif text-foreground text-base">Kristin Neff</p>
                  <p className="text-xs text-muted-foreground mt-1">Ph.D. · Pionier zelfcompassie-onderzoek</p>
                </div>
                <div className="bg-white rounded-2xl border border-warm-200/50 p-5 text-center shadow-sm">
                  <p className="font-serif text-foreground text-base">Christopher Germer</p>
                  <p className="text-xs text-muted-foreground mt-1">Ph.D. · Klinisch psycholoog Harvard</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default MscSection;
