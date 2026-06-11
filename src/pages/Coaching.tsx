import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Chapter, Reveal, PageShell, SectionBand } from "@/components/editorial/Editorial";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import caglaBio from "@/assets/cagla-bio.png";
import natureCalm from "@/assets/nature-calm.jpg";

/* Editorial Individuele Begeleiding page. */

const packages = [
  {
    tag: "Eenmalig",
    title: "Losse sessie",
    body: "Voor een specifieke vraag, opfrismoment of kennismaking met de werkwijze.",
    meta: "60 minuten · €110",
  },
  {
    tag: "Traject",
    title: "6 sessies persoonlijke begeleiding",
    body: "Een afgerond traject voor duurzame verandering. Inclusief intake, oefenprogramma en reflectiemoment.",
    meta: "6 sessies · €550 (i.p.v. €650)",
    highlight: true,
  },
];

const steps = [
  { n: "01", t: "Gratis kennismaking", d: "Een open gesprek van 20 minuten via Zoom. Voelt het goed, dan plannen we." },
  { n: "02", t: "Intake & richting bepalen", d: "We onderzoeken wat er speelt en wat je nodig hebt. Geen vragenlijst — een gesprek." },
  { n: "03", t: "Sessies in jouw tempo", d: "Eens per 2–3 weken, telkens 60 minuten. Tussendoor korte oefeningen — geen huiswerk-druk." },
  { n: "04", t: "Reflectie & verankering", d: "Aan het einde kijken we terug en spreken we af hoe je het verder draagt." },
];

const Coaching = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <SEO
        title="Individuele Begeleiding · Mindful Mind"
        description="Persoonlijke 1-op-1 begeleiding in mindfulness en zelfcompassie. Online via Zoom. Gratis kennismaking van 20 minuten."
      />
      <Navigation />

      <main id="main-content">
        <PageShell>
          {/* 01 Arrival */}
          <section ref={heroRef} className="relative overflow-hidden pt-20 lg:pt-28">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-7 lg:pt-10"
                >
                  <Chapter n="i." label="Individuele begeleiding" />
                  <h1 className="mt-10 font-serif text-[44px] leading-[1.02] tracking-tight text-[#1f1d1b] sm:text-[60px] lg:text-[74px]">
                    Eén op één.
                    <br />
                    <em className="italic text-terracotta-600">In jouw tempo</em>.
                  </h1>
                  <p className="mt-8 max-w-xl text-lg leading-[1.75] text-[#54514d]">
                    Sommige dingen vragen om de volle aandacht van één gesprek. Persoonlijke
                    begeleiding voor wie liever niet in een groep werkt, of voor wie een eigen thema
                    grondig wil onderzoeken.
                  </p>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <Link
                      to="/contact"
                      className="group inline-flex items-center justify-center gap-3 bg-terracotta-600 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-terracotta-700"
                    >
                      Plan een kennismaking
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <a
                      href="#pakketten"
                      className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#2C2A28] underline-offset-8 hover:underline"
                    >
                      Bekijk de trajecten
                    </a>
                  </div>

                  <dl className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-[#2C2A28]/10 pt-8">
                    {[
                      { k: "20 min", v: "gratis intro" },
                      { k: "Zoom", v: "online sessies" },
                      { k: "1-op-1", v: "volledige aandacht" },
                    ].map((s) => (
                      <div key={s.k}>
                        <dt className="font-serif text-2xl text-terracotta-700">{s.k}</dt>
                        <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#7a7670]">
                          {s.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>

                <motion.div style={{ y }} className="relative lg:col-span-5">
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[220px] shadow-[0_30px_80px_-40px_rgba(60,40,30,0.45)]">
                    <img src={natureCalm} alt="Een rustige plek voor verbinding" className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute -bottom-6 left-0 max-w-[240px] bg-sage-600 px-6 py-5 text-white shadow-xl sm:left-2">
                    <p className="font-serif text-lg italic leading-snug">
                      "In mijn eigen tempo, met volledige aandacht."
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/75">
                      — Renate
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="mt-24 border-t border-[#2C2A28]/10" />
          </section>

          {/* 02 For whom */}
          <SectionBand tone="cream">
            <div className="container mx-auto px-6 py-24 lg:px-12 lg:py-32">
              <div className="grid gap-16 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <Chapter n="ii." label="Wanneer 1-op-1" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Een gesprek
                    <br />
                    <em className="italic text-terracotta-600">alleen</em> voor jou.
                  </h2>
                </Reveal>

                <Reveal className="lg:col-span-7 lg:col-start-6">
                  <ul className="space-y-12">
                    {[
                      { t: "Een specifiek thema dat zich blijft herhalen", d: "Verlies, transitie, perfectionisme — iets dat in een groep niet de tijd krijgt die het verdient." },
                      { t: "Een groep voelt nu te veel", d: "Je werkt liever in stilte met één persoon, dan dat je je in een groep moet positioneren." },
                      { t: "Voortbouwen na een MSC-training", d: "Je deed al een groepstraining en wilt de oefening verankeren in je dagelijks leven." },
                      { t: "Begeleiding bij stress of burn-out herstel", d: "Met aandacht voor lichaam, ademhaling en wat er onder de uitputting ligt." },
                    ].map((r, i) => (
                      <li key={i} className="grid grid-cols-[auto_1fr] gap-8 border-t border-[#2C2A28]/10 pt-8">
                        <span className="font-serif text-2xl italic text-terracotta-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-serif text-2xl leading-snug text-[#1f1d1b]">{r.t}</h3>
                          <p className="mt-3 text-[15px] leading-[1.8] text-[#54514d]">{r.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </SectionBand>

          {/* 03 The trajectory */}
          <SectionBand>
            <div className="container mx-auto px-6 py-28 lg:px-12 lg:py-36">
              <div className="grid gap-16 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <Chapter n="iii." label="Het verloop" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Vier stappen
                    <br />
                    <em className="italic text-terracotta-600">van begin tot eind.</em>
                  </h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                    Geen vast script. Wel een ritme dat ruimte geeft aan reflectie, oefening en
                    integratie.
                  </p>
                </Reveal>

                <Reveal className="lg:col-span-8">
                  <ol className="space-y-10">
                    {steps.map((s) => (
                      <li key={s.n} className="grid grid-cols-[auto_1fr] gap-8 border-t border-terracotta-600/30 pt-6">
                        <span className="font-serif text-3xl italic text-terracotta-600">{s.n}</span>
                        <div>
                          <h3 className="font-serif text-2xl leading-snug text-[#1f1d1b]">{s.t}</h3>
                          <p className="mt-3 text-[15px] leading-[1.8] text-[#54514d]">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </SectionBand>

          {/* 04 Packages */}
          <SectionBand tone="cream">
            <div id="pakketten" className="container mx-auto px-6 py-28 lg:px-12 lg:py-36">
              <div className="grid gap-12 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <Chapter n="iv." label="De trajecten" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Kies wat
                    <br />
                    <em className="italic text-terracotta-600">past.</em>
                  </h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                    De gratis kennismaking is altijd vrijblijvend. Pas daarna kies je samen met
                    Çağla voor losse sessies of een traject.
                  </p>
                </Reveal>

                <div className="grid gap-6 lg:col-span-8 sm:grid-cols-2">
                  {packages.map((p) => (
                    <Reveal key={p.title}>
                      <article
                        className={`flex h-full flex-col justify-between p-8 lg:p-10 ${
                          p.highlight
                            ? "bg-[#1f1d1b] text-[#FDFBF7]"
                            : "border border-[#2C2A28]/10 bg-white/60 text-[#2C2A28]"
                        }`}
                      >
                        <div>
                          <p
                            className={`text-[11px] uppercase tracking-[0.28em] ${
                              p.highlight ? "text-terracotta-300" : "text-terracotta-600"
                            }`}
                          >
                            {p.tag}
                          </p>
                          <h3 className="mt-4 font-serif text-3xl leading-tight">{p.title}</h3>
                          <p
                            className={`mt-4 text-[14px] leading-[1.8] ${
                              p.highlight ? "text-white/80" : "text-[#54514d]"
                            }`}
                          >
                            {p.body}
                          </p>
                        </div>
                        <div className="mt-10 border-t border-current/20 pt-6">
                          <p className="font-serif text-lg italic">{p.meta}</p>
                          <Link
                            to="/contact"
                            className={`mt-5 inline-flex items-center gap-2 border-b pb-1 text-[11px] font-medium uppercase tracking-[0.22em] ${
                              p.highlight
                                ? "border-white hover:opacity-80"
                                : "border-[#1f1d1b] hover:text-terracotta-700"
                            }`}
                          >
                            Plan een gesprek <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </SectionBand>

          {/* 05 Trainer */}
          <SectionBand tone="sage">
            <div className="container mx-auto grid gap-16 px-6 py-28 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-36">
              <Reveal className="lg:col-span-5">
                <div className="overflow-hidden rounded-t-[180px] bg-sage-700/40">
                  <img src={caglaBio} alt="Çağla — gecertificeerd MSC-trainer" className="aspect-[4/5] w-full object-cover" />
                </div>
                <p className="mt-6 font-serif text-2xl italic">— Çağla</p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
                  Lichaamsgerichte psychotherapeut · MSC-trainer
                </p>
              </Reveal>

              <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-12">
                <Chapter n="v." label="Je begeleider" tone="ivory" />
                <p className="mt-10 font-serif text-3xl leading-[1.3] lg:text-4xl">
                  "Echte verandering begint bij hoe je met jezelf{" "}
                  <em className="italic">omgaat</em>."
                </p>
                <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-white/85">
                  Çağla werkt al meer dan tien jaar individueel met mensen rond zelfcompassie,
                  veerkracht en lichaamsbewustzijn. Geen advies-modus, wel een rustige aanwezigheid
                  die ruimte maakt voor wat er is.
                </p>
                <Link
                  to="/over-cagla"
                  className="mt-10 inline-flex items-center gap-2 border-b border-white pb-1 text-[12px] font-medium uppercase tracking-[0.22em] hover:opacity-80"
                >
                  Lees meer over Çağla <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            </div>
          </SectionBand>

          {/* 06 Final CTA */}
          <SectionBand tone="deep">
            <div className="container mx-auto px-6 py-24 lg:px-12 lg:py-28">
              <Reveal className="mx-auto max-w-2xl text-center">
                <Chapter n="vi." label="Begin met een gesprek" tone="ivory" />
                <h2 className="mt-8 font-serif text-4xl leading-[1.15] lg:text-5xl">
                  Vrijblijvend. Twintig minuten.
                  <br />
                  <em className="italic text-terracotta-300">Voor altijd jouw beslissing.</em>
                </h2>
                <Link
                  to="/contact"
                  className="mt-10 inline-flex items-center gap-3 bg-[#FDFBF7] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-[#1f1d1b] hover:bg-white"
                >
                  Plan een kennismaking
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </SectionBand>
        </PageShell>
      </main>
      <Footer />
    </div>
  );
};

export default Coaching;
