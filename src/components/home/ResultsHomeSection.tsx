import { ScrollReveal } from "@/components/ScrollReveal";

const shifts = [
  { from: "Streng voor jezelf", to: "Mild en steunend" },
  { from: "Doorgaan ondanks signalen", to: "Vertragen en voelen" },
  { from: "Anderen altijd voorrang", to: "Jezelf ook zien staan" },
  { from: "Pijn wegstoppen", to: "Erkennen en doorlaten" },
  { from: "Nooit genoeg", to: "Vertrouwen in jezelf" },
];

const stats = [
  { dir: "down", label: "stress", num: "36%" },
  { dir: "up", label: "zelfcompassie", num: "67%" },
  { dir: "down", label: "angst", num: "43%" },
  { dir: "up", label: "veerkracht", num: "42%" },
];

const ResultsHomeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] uppercase text-sage-600 mb-4">
            Wat het je oplevert
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light leading-[1.2] text-foreground mb-10">
            Van overleven
            <br />
            naar ondersteunen
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            {/* Left: shifts */}
            <div>
              <p className="text-muted-foreground leading-[1.85] mb-8">
                Je leert anders omgaan met wat je voelt — zonder jezelf onder druk te zetten. In plaats van doorgaan en jezelf bekritiseren, leer je te vertragen, te voelen en jezelf te ondersteunen.
              </p>
              <div className="divide-y divide-warm-300">
                {shifts.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_2rem_1fr] gap-3 items-center py-3">
                    <span className="text-sm text-muted-foreground">{s.from}</span>
                    <span className="text-sage-500 text-center">→</span>
                    <span className="text-sm text-foreground font-medium">{s.to}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stats */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Wetenschappelijk bewezen
              </p>
              <div className="grid grid-cols-2 gap-px bg-warm-300">
                {stats.map((s, i) => (
                  <div key={i} className="bg-background p-6">
                    <p className={`text-xs tracking-[0.15em] uppercase mb-1 ${s.dir === "down" ? "text-terracotta-500" : "text-sage-600"}`}>
                      {s.dir === "down" ? "↓ Minder" : "↑ Meer"}
                    </p>
                    <p className="font-serif text-4xl md:text-5xl font-light text-foreground leading-none mb-1">
                      {s.num}
                    </p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic mt-3">
                * Meta-analyses MSC-onderzoek (Neff & Germer, 2013–2023)
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ResultsHomeSection;
