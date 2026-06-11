import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { CourseSchema, OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Chapter, Reveal, PageShell, SectionBand } from "@/components/editorial/Editorial";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-mindful.jpg";
import meditationPractice from "@/assets/meditation-practice.jpg";
import natureCalm from "@/assets/nature-calm.jpg";

/* Editorial MSC Groepstraining — magazine spread that mirrors the homepage. */

const trainingDates = [
  { lang: "Nederlands", day: "Maandagavond", start: "14 september 2026", time: "19:00 – 21:00", price: "€550" },
  { lang: "English", day: "Wednesday evening", start: "22 April 2026", time: "19:00 – 21:00", price: "€550" },
];

const weeks = [
  { n: "01", t: "Wat is zelfcompassie?", d: "De drie pijlers. Wat zelfcompassie wel en niet is." },
  { n: "02", t: "Mindfulness oefenen", d: "Aanwezig blijven, ook bij wat ongemakkelijk is." },
  { n: "03", t: "Liefdevolle vriendelijkheid", d: "Een innerlijke warmte ontwikkelen — voor jezelf eerst." },
  { n: "04", t: "Compassionate voice", d: "De toon waarop je tegen jezelf spreekt herijken." },
  { n: "05", t: "Leven met diepere waarden", d: "Wat is écht belangrijk? Een kompas voor moeilijke dagen." },
  { n: "06", t: "Moeilijke emoties ontmoeten", d: "Niet wegduwen, niet verdwalen — er ruimte voor maken." },
  { n: "07", t: "Compassie in relaties", d: "Grenzen, vergeving en vol blijven van jezelf in contact." },
  { n: "08", t: "Een leven omarmen", d: "Integratie. Hoe draag je dit verder, voorbij de training." },
];

const MindfulZelfcompassie = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="8-weekse Mindful Zelfcompassie Training · Mindful Mind"
        description="Leer in 8 weken hoe je jezelf kunt ondersteunen. Kleine groep, wetenschappelijk onderbouwd, online en op locatie."
      />
      <OrganizationSchema />
      <CourseSchema
        name="8-weekse Mindful Self-Compassion (MSC) Groepstraining"
        description="Leer in 8 weken omgaan met stress, emoties en zelfkritiek in een veilige groepssetting."
        duration="8 weeks"
        price="550"
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
                  <Chapter n="i." label="Mindful Zelfcompassie · 8 weken" />
                  <h1 className="mt-10 font-serif text-[44px] leading-[1.02] tracking-tight text-[#1f1d1b] sm:text-[60px] lg:text-[74px]">
                    Acht weken.
                    <br />
                    Een nieuwe <em className="italic text-terracotta-600">manier</em>
                    <br />
                    van naar jezelf kijken.
                  </h1>
                  <p className="mt-8 max-w-xl text-lg leading-[1.75] text-[#54514d]">
                    De Mindful Zelfcompassie Training (MSC) leert je hoe je jezelf met dezelfde
                    warmte kunt benaderen als een goede vriend — juist op de momenten dat het
                    moeilijk is.
                  </p>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <a
                      href="#aanmelden"
                      className="group inline-flex items-center justify-center gap-3 bg-terracotta-600 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-terracotta-700"
                    >
                      Schrijf je in
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href="#data"
                      className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#2C2A28] underline-offset-8 hover:underline"
                    >
                      Bekijk de data
                    </a>
                  </div>

                  <dl className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-[#2C2A28]/10 pt-8">
                    {[
                      { k: "8 wkn", v: "begeleid programma" },
                      { k: "max 12", v: "deelnemers" },
                      { k: "€550", v: "incl. materiaal" },
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
                    <img src={heroImage} alt="Een groep oefent samen zelfcompassie" className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute -bottom-6 left-0 max-w-[240px] bg-sage-600 px-6 py-5 text-white shadow-xl sm:left-2">
                    <p className="font-serif text-lg italic leading-snug">
                      "Voor het eerst sta ik aan mijn eigen kant."
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/75">
                      — Sanne, 2025
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
                  <Chapter n="ii." label="Voor wie" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Misschien klinkt
                    <br />
                    <em className="italic text-terracotta-600">een van deze</em> bekend.
                  </h2>
                  <p className="mt-6 text-[15px] leading-[1.8] text-[#54514d]">
                    De training is voor mensen die voelen dat de huidige manier van met zichzelf
                    omgaan niet langer houdbaar is.
                  </p>
                </Reveal>

                <Reveal className="lg:col-span-7 lg:col-start-6">
                  <ol className="space-y-12">
                    {[
                      { n: "01", t: "Je bent streng voor jezelf", d: "De innerlijke criticus heeft een vaste plek. Goed is bijna nooit goed genoeg." },
                      { n: "02", t: "Je raakt uitgeput van zorgen", d: "Voor anderen, voor het werk, voor wat er nog moet. Voor jezelf blijft weinig over." },
                      { n: "03", t: "Je voelt je vaak alleen", d: "Ook tussen mensen. Je deelt zelden wat je écht voelt." },
                      { n: "04", t: "Je wilt verandering die blijft", d: "Niet weer een snelle techniek, maar iets dat wortel schiet." },
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

          {/* 03 Method */}
          <SectionBand>
            <div className="container mx-auto grid gap-16 px-6 py-28 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-36">
              <Reveal className="lg:col-span-5">
                <div className="relative overflow-hidden">
                  <img src={meditationPractice} alt="Stille oefening in stilte" className="aspect-[4/5] w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f1d1b]/70 to-transparent p-6 text-white">
                    <p className="font-serif text-base italic leading-snug">
                      "Niets oplossen. Alleen aanwezig blijven — bij jezelf."
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-10">
                <Chapter n="iii." label="De methode" />
                <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[52px]">
                  Wetenschappelijk onderbouwd.{" "}
                  <em className="italic text-terracotta-600">Mensgericht</em> in toon.
                </h2>
                <p className="mt-6 max-w-xl text-[16px] leading-[1.85] text-[#54514d]">
                  MSC is ontwikkeld door Dr. Kristin Neff en Dr. Christopher Germer. Onderzoek toont
                  significante afname van stress (−36%), angst en depressie, en toename van
                  veerkracht en welzijn.
                </p>

                <div className="mt-12 grid gap-10 sm:grid-cols-3">
                  {[
                    { t: "Mind", d: "Mindfulness: zien wat er is, zonder oordeel." },
                    { t: "Heart", d: "Zelfcompassie: vriendelijk reageren op pijn." },
                    { t: "Body", d: "Belichaamde oefeningen die beklijven." },
                  ].map((p) => (
                    <div key={p.t} className="border-t border-terracotta-600/30 pt-4">
                      <p className="font-serif text-xl italic text-terracotta-700">{p.t}</p>
                      <p className="mt-2 text-[13px] leading-[1.7] text-[#54514d]">{p.d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </SectionBand>

          {/* 04 Weekly rhythm */}
          <SectionBand tone="cream">
            <div className="container mx-auto px-6 py-28 lg:px-12 lg:py-36">
              <div className="grid gap-16 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <Chapter n="iv." label="Het ritme" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Acht weken,
                    <br />
                    <em className="italic text-terracotta-600">acht thema's.</em>
                  </h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                    Elke week 2 uur samen, en zo'n 20 minuten zelfoefening per dag. Geen verplicht
                    huiswerk — wel uitnodigingen om mee te beginnen.
                  </p>
                </Reveal>

                <Reveal className="lg:col-span-8">
                  <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
                    {weeks.map((w) => (
                      <li key={w.n} className="border-t border-[#2C2A28]/10 pt-5">
                        <div className="flex items-baseline gap-4">
                          <span className="font-serif text-lg italic text-terracotta-600">{w.n}</span>
                          <h3 className="font-serif text-xl leading-snug text-[#1f1d1b]">{w.t}</h3>
                        </div>
                        <p className="mt-2 pl-9 text-[14px] leading-[1.75] text-[#54514d]">{w.d}</p>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </SectionBand>

          {/* 05 Trainer */}
          <SectionBand tone="sage">
            <div className="container mx-auto grid gap-16 px-6 py-28 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-36">
              <Reveal className="lg:col-span-5">
                <div className="overflow-hidden rounded-t-[180px] bg-sage-700/40">
                  <img src={natureCalm} alt="Çağla — gecertificeerd MSC-trainer" className="aspect-[4/5] w-full object-cover" />
                </div>
                <p className="mt-6 font-serif text-2xl italic">— Çağla</p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
                  Gecertificeerd MSC-trainer
                </p>
              </Reveal>

              <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-12">
                <Chapter n="v." label="Wie begeleidt" tone="ivory" />
                <p className="mt-10 font-serif text-3xl leading-[1.3] lg:text-4xl">
                  "Ik werk in kleine groepen — maximaal twaalf. Zo blijft er ruimte voor{" "}
                  <em className="italic">iedereen</em>."
                </p>
                <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-white/85">
                  Çağla begeleidt al meer dan tien jaar mensen in mindfulness en zelfcompassie.
                  Gecertificeerd via het Center for Mindful Self-Compassion (UC San Diego), met een
                  achtergrond in lichaamsgerichte psychotherapie.
                </p>
                <Link
                  to="/trainers"
                  className="mt-10 inline-flex items-center gap-2 border-b border-white pb-1 text-[12px] font-medium uppercase tracking-[0.22em] hover:opacity-80"
                >
                  Maak kennis met het team <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            </div>
          </SectionBand>

          {/* 06 Practical / Dates */}
          <SectionBand>
            <div id="data" className="container mx-auto px-6 py-28 lg:px-12 lg:py-32">
              <div className="grid gap-16 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <Chapter n="vi." label="Praktisch" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                    Wanneer
                    <br />
                    <em className="italic text-terracotta-600">starten we?</em>
                  </h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                    Twee groepen per jaar. Online via Zoom, met optioneel een live dag in Amersfoort.
                  </p>
                </Reveal>

                <Reveal className="lg:col-span-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {trainingDates.map((d) => (
                      <article key={d.lang + d.start} className="border border-[#2C2A28]/10 bg-white/60 p-8">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-terracotta-600">
                          {d.lang}
                        </p>
                        <h3 className="mt-3 font-serif text-2xl text-[#1f1d1b]">{d.day}</h3>
                        <dl className="mt-6 space-y-3 text-[14px] text-[#54514d]">
                          <div className="flex justify-between border-b border-[#2C2A28]/10 pb-2">
                            <dt className="uppercase tracking-[0.18em] text-[11px] text-[#7a7670]">Start</dt>
                            <dd>{d.start}</dd>
                          </div>
                          <div className="flex justify-between border-b border-[#2C2A28]/10 pb-2">
                            <dt className="uppercase tracking-[0.18em] text-[11px] text-[#7a7670]">Tijd</dt>
                            <dd>{d.time}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="uppercase tracking-[0.18em] text-[11px] text-[#7a7670]">Prijs</dt>
                            <dd className="font-serif text-lg text-terracotta-700">{d.price}</dd>
                          </div>
                        </dl>
                      </article>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </SectionBand>

          {/* 07 Registration */}
          <SectionBand tone="cream">
            <div id="aanmelden" className="container mx-auto px-6 py-28 lg:px-12 lg:py-36">
              <div className="grid gap-16 lg:grid-cols-12">
                <Reveal className="lg:col-span-5">
                  <Chapter n="vii." label="Aanmelden" />
                  <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[52px]">
                    Reserveer
                    <br />
                    <em className="italic text-terracotta-600">je plek.</em>
                  </h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                    Vul het formulier in en je hoort binnen 1–2 werkdagen van ons. Geen automatische
                    bevestigingsmails — alles persoonlijk.
                  </p>
                  <p className="mt-8 font-serif italic text-lg text-[#1f1d1b]">
                    "Het is geen sprint. Het is een uitnodiging."
                  </p>
                </Reveal>

                <Reveal className="lg:col-span-7">
                  <div className="border border-[#2C2A28]/10 bg-white p-8 md:p-10">
                    <RegistrationForm
                      trainingName="8-weekse Mindful Zelfcompassie Training"
                      trainingDate="14 september 2026"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </SectionBand>
        </PageShell>
      </main>
      <Footer />
    </div>
  );
};

export default MindfulZelfcompassie;
