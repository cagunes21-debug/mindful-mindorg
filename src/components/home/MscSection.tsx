import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    num: "1",
    title: "Mindfulness",
    desc: "Erkennen wat er is — zonder het weg te duwen of te overdrijven. Aanwezig zijn bij pijn, ook als dat oncomfortabel voelt.",
  },
  {
    num: "2",
    title: "Gemeenschappelijke menselijkheid",
    desc: "Beseffen dat lijden en onvolmaaktheid bij het menselijk bestaan horen. Jij bent niet de enige die dit voelt.",
  },
  {
    num: "3",
    title: "Vriendelijkheid naar jezelf",
    desc: "Jezelf met warmte benaderen in moeilijke momenten — dezelfde zorg die je voor anderen voelt, ook op jezelf richten.",
  },
];

const MscSection = () => {
  return (
    <section id="wat-is-msc" className="py-20 md:py-28 bg-foreground">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-terracotta-300 mb-4">
                Het basisprincipe
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-white mb-6">
                Mindful
                <br />
                Self-Compassion
              </h2>
              <p className="font-serif italic text-terracotta-300 text-xl md:text-2xl leading-relaxed mb-6">
                Niet door jezelf te veranderen, maar door jezelf te ondersteunen — juist wanneer het moeilijk is.
              </p>
              <p className="text-white/60 leading-[1.85] mb-3">
                MSC helpt je om milder met jezelf om te gaan. Niet als verwennerij, maar als een vaardigheid die je traint — net zoals je een spier traint.
              </p>
              <p className="text-white/60 leading-[1.85] mb-8">
                Wetenschappelijk onderbouwd, ontwikkeld door dr. Kristin Neff en dr. Christopher Germer. Wereldwijd toegepast bij duizenden mensen.
              </p>

              {/* Founder cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="font-serif text-terracotta-300 text-lg">Kristin Neff</p>
                  <p className="text-xs text-white/40 mt-1">Ph.D. · Pionier zelfcompassie-onderzoek</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="font-serif text-terracotta-300 text-lg">Christopher Germer</p>
                  <p className="text-xs text-white/40 mt-1">Ph.D. · Klinisch psycholoog Harvard</p>
                </div>
              </div>
            </div>

            {/* Right: pillars */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-terracotta-400/60 mb-6">
                De drie pijlers
              </p>
              <div className="space-y-4">
                {pillars.map((p) => (
                  <div key={p.num} className="grid grid-cols-[48px_1fr] gap-4 items-start bg-white/[0.04] border-l-2 border-terracotta-400 rounded-r-2xl p-5">
                    <span className="font-serif text-3xl text-terracotta-400/40 leading-none">{p.num}</span>
                    <div>
                      <p className="font-serif italic text-white text-lg mb-1">{p.title}</p>
                      <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-4 p-5 bg-terracotta-500/10 border border-terracotta-500/25 rounded-2xl">
                <p className="text-sm text-terracotta-300 leading-relaxed">
                  <strong className="text-white">Meer lezen?</strong>{" "}
                  Op de groepstraining pagina vind je uitgebreide uitleg over de methode.{" "}
                  <Link to="/msc-training#wat-is-msc" className="text-terracotta-300 inline-flex items-center gap-1 hover:underline">
                    Lees meer <ArrowRight className="h-3 w-3" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MscSection;
