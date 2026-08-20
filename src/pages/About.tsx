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

/* Editorial About / Over Ons. */

const About = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <SEO
        title="Over Mindful Mind"
        description="Mindful Mind biedt mindful zelfcompassie trainingen en individuele begeleiding. Een klein, betrokken team rond Çağla Güneş."
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
                  <Chapter label="Over Mindful Mind" />
                  <h1 className="mt-10 font-serif text-[44px] leading-[1.02] tracking-tight text-[#1f1d1b] sm:text-[60px] lg:text-[74px]">
                    Ruimte om te
                    <br />
                    <em className="italic text-terracotta-600">vertragen</em> en te voelen.
                  </h1>
                  <p className="mt-8 max-w-xl text-lg leading-[1.75] text-[#54514d]">
                    In een wereld die altijd door wil, maken wij ruimte voor stilte. Mindful Mind
                    is een klein, betrokken huis voor mindful zelfcompassie — voor wie thuis wil
                    komen bij zichzelf.
                  </p>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <Link
                      to="/msc-training"
                      className="group inline-flex items-center justify-center gap-3 bg-terracotta-600 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-terracotta-700"
                    >
                      Bekijk de training
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#2C2A28] underline-offset-8 hover:underline"
                    >
                      Stel een vraag
                    </Link>
                  </div>
                </motion.div>

                <motion.div style={{ y }} className="relative lg:col-span-5">
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[220px] shadow-[0_30px_80px_-40px_rgba(60,40,30,0.45)]">
                    <img src={natureCalm} alt="Stilte en natuur" className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute -bottom-6 left-0 max-w-[240px] bg-sage-600 px-6 py-5 text-white shadow-xl sm:left-2">
                    <p className="font-serif text-lg italic leading-snug">
                      Je hoeft niet perfect te zijn. Je mag er gewoon zijn.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="mt-24 border-t border-[#2C2A28]/10" />
          </section>

          {/* 02 Belofte */}
          <SectionBand tone="cream">
            <div className="container mx-auto px-6 py-24 lg:px-12 lg:py-32">
              <Reveal className="mx-auto max-w-3xl text-center">
                <Chapter label="De belofte" />
                <p className="mt-10 font-serif text-3xl leading-[1.35] text-[#1f1d1b] lg:text-[44px]">
                  "Een veilige plek waar <em className="italic text-terracotta-600">alle</em> aspecten
                  van jezelf welkom zijn. Geen prestaties, geen verwachtingen — alleen ruimte om te
                  herstellen en te groeien."
                </p>
              </Reveal>
            </div>
          </SectionBand>

          {/* 03 Onze aanpak */}
          <SectionBand>
            <div className="container mx-auto px-6 py-28 lg:px-12 lg:py-36">
              <div className="grid gap-16 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <Chapter label="Onze aanpak" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Meer dan
                    <br />
                    <em className="italic text-terracotta-600">technieken</em> leren.
                  </h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                    Wij geloven in echte transformatie — een fundamentele verschuiving in hoe je
                    naar jezelf kijkt.
                  </p>
                </Reveal>

                <Reveal className="lg:col-span-7 lg:col-start-6">
                  <ol className="space-y-10">
                    {[
                      { n: "01", t: "Blijvende verandering", d: "Gericht op duurzame groei, niet op snelle fixes." },
                      { n: "02", t: "Wetenschappelijk onderbouwd", d: "Gebaseerd op bewezen methodes — MSC, ACT, lichaamsgerichte psychotherapie." },
                      { n: "03", t: "Trauma-sensitief", d: "Met zorg en aandacht voor ieders tempo. Niets is verplicht." },
                      { n: "04", t: "Theorie en praktijk", d: "Direct toepasbaar in je dagelijks leven — niet alleen op de mat." },
                    ].map((r) => (
                      <li key={r.n} className="grid grid-cols-[auto_1fr] gap-8 border-t border-[#2C2A28]/10 pt-8">
                        <span className="font-serif text-2xl italic text-terracotta-600">{r.n}</span>
                        <div>
                          <h3 className="font-serif text-2xl leading-snug text-[#1f1d1b]">{r.t}</h3>
                          <p className="mt-3 text-[15px] leading-[1.8] text-[#54514d]">{r.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </SectionBand>

          {/* 04 Trainer */}
          <SectionBand tone="sage">
            <div className="container mx-auto grid gap-16 px-6 py-28 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-36">
              <Reveal className="lg:col-span-5">
                <div className="overflow-hidden rounded-t-[180px] bg-sage-700/40">
                  <img src={caglaBio} alt="Çağla Güneş, oprichter Mindful Mind" className="aspect-[4/5] w-full object-cover" />
                </div>
                <p className="mt-6 font-serif text-2xl italic">— Çağla Güneş</p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
                  Oprichter · Gecertificeerd MSC-trainer
                </p>
              </Reveal>

              <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-12">
                <Chapter label="De oprichter" tone="ivory" />
                <p className="mt-10 font-serif text-3xl leading-[1.3] lg:text-4xl">
                  "Mijn pad is er een van geleefde ervaring — jaren van reizen, beoefening en
                  onderzoek naar <em className="italic">identiteit</em> en{" "}
                  <em className="italic">verbinding</em>."
                </p>
                <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-white/85">
                  Çağla wordt al lang geleid door een diepe oriëntatie op innerlijke verbinding en
                  bewustzijn. Meditatie werd al op jonge leeftijd onderdeel van haar leven, en
                  verdiepte zich door jarenlange beoefening en langere Vipassana-retraites.
                </p>
                <div className="mt-10 flex flex-wrap gap-6">
                  <Link
                    to="/over-cagla"
                    className="inline-flex items-center gap-2 border-b border-white pb-1 text-[12px] font-medium uppercase tracking-[0.22em] hover:opacity-80"
                  >
                    Lees meer over Çağla <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/trainers"
                    className="inline-flex items-center gap-2 border-b border-white/60 pb-1 text-[12px] font-medium uppercase tracking-[0.22em] hover:opacity-80"
                  >
                    Ontmoet het team <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </SectionBand>

          {/* 05 Visie & Missie */}
          <SectionBand tone="cream">
            <div className="container mx-auto px-6 py-28 lg:px-12 lg:py-36">
              <div className="grid gap-16 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <Chapter label="Wat ons drijft" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Visie
                    <br />
                    <em className="italic text-terracotta-600">& missie.</em>
                  </h2>
                </Reveal>

                <div className="grid gap-10 lg:col-span-8 sm:grid-cols-2">
                  <Reveal>
                    <div className="border-t border-terracotta-600/40 pt-6">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-terracotta-600">
                        Visie
                      </p>
                      <h3 className="mt-4 font-serif text-2xl text-[#1f1d1b]">
                        Een wereld waarin we met compassie naar onszelf én anderen kijken.
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.85] text-[#54514d]">
                        Wanneer we goed voor onszelf zorgen, groeit onze verbinding met anderen.
                      </p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <div className="border-t border-sage-600/40 pt-6">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-sage-700">
                        Missie
                      </p>
                      <h3 className="mt-4 font-serif text-2xl text-[#1f1d1b]">
                        Een veilige plek bieden waar je opnieuw verbinding maakt met jezelf.
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.85] text-[#54514d]">
                        Iedereen verdient de kans om te vertragen, te reflecteren en te groeien.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </SectionBand>

          {/* 06 Final CTA */}
          <SectionBand tone="deep">
            <div className="container mx-auto px-6 py-24 lg:px-12 lg:py-28">
              <Reveal className="mx-auto max-w-2xl text-center">
                <Chapter label="Begin je reis" tone="ivory" />
                <h2 className="mt-8 font-serif text-4xl leading-[1.15] lg:text-5xl">
                  Klaar om thuis te komen
                  <br />
                  <em className="italic text-terracotta-300">bij jezelf?</em>
                </h2>
                <p className="mt-6 text-[15px] leading-[1.85] text-white/75">
                  Gun jezelf de tijd en aandacht die je verdient.
                </p>
                <Link
                  to="/msc-training"
                  className="mt-10 inline-flex items-center gap-3 bg-[#FDFBF7] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-[#1f1d1b] hover:bg-white"
                >
                  Bekijk de training
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

export default About;
