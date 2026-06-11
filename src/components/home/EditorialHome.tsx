import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/hero-mindful.jpg";
import caglaBio from "@/assets/cagla-bio.png";
import meditationPractice from "@/assets/meditation-practice.jpg";
import natureCalm from "@/assets/nature-calm.jpg";

/* -----------------------------------------------------------
   Editorial homepage — written like a printed magazine spread.
   Journey: arrival → recognition → method → trainer → proof →
   paths → soft CTA. Locked palette: terracotta/sage/ivory.
----------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
} as const;

const Chapter = ({ n, label }: { n: string; label: string }) => (
  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-terracotta-600/80">
    <span className="font-serif italic text-base normal-case tracking-normal text-terracotta-600">{n}</span>
    <span className="h-px w-8 bg-terracotta-600/30" />
    <span>{label}</span>
  </div>
);

const EditorialHome = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="bg-[#FDFBF7] text-[#2C2A28]">
      {/* ── 01 Arrival ─────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-16 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="show"
              className="lg:col-span-7 lg:pt-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-terracotta-600/25 bg-terracotta-50 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-terracotta-700">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta-600" />
                Volgende start · September 2026 · Nog enkele plekken
              </div>
              <h1 className="mt-8 font-serif text-[40px] leading-[1.05] tracking-tight text-[#1f1d1b] sm:text-[56px] lg:text-[72px]">
                Mindful Zelfcompassie Training —
                <br />
                behandel jezelf zoals je een{" "}
                <em className="italic text-terracotta-600">goede vriend</em> behandelt.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-[1.75] text-[#54514d]">
                In de Mindful Zelfcompassie Training ontwikkel je meer veerkracht, innerlijke rust
                en zelfcompassie — juist op momenten dat je het moeilijk hebt.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  to="/coaching"
                  className="group inline-flex items-center justify-center gap-3 bg-terracotta-600 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-terracotta-700"
                >
                  Meer over individuele sessies
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/msc-training"
                  className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#2C2A28] underline-offset-8 hover:underline"
                >
                  Bekijk de groepstraining <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <dl className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-[#2C2A28]/10 pt-8 text-left">
                {[
                  { k: "−36%", v: "ervaren stress" },
                  { k: "8 wkn", v: "begeleid programma" },
                  { k: "max 12", v: "deelnemers per groep" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="font-serif text-2xl text-terracotta-700">{s.k}</dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#7a7670]">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div
              style={{ y }}
              className="relative lg:col-span-5"
            >
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[220px] shadow-[0_30px_80px_-40px_rgba(60,40,30,0.45)]">
                <img
                  src={heroImage}
                  alt="Stille meditatie bij zonsondergang"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-0 max-w-[220px] bg-sage-600 px-6 py-5 text-white shadow-xl sm:left-2">
                <p className="font-serif text-lg italic leading-snug">
                  Zelfzorg is geen luxe — het is een vaardigheid.
                </p>
              </div>
              <div className="absolute -right-2 -top-4 hidden h-24 w-px bg-terracotta-600/40 lg:block" />
            </motion.div>
          </div>
        </div>

        <div className="mt-24 border-t border-[#2C2A28]/10" />
      </section>

      {/* ── 02 Recognition ─────────────────────────────────── */}
      <section className="bg-[#F6F1E8]">
        <div className="container mx-auto px-6 py-24 lg:px-12 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-12">
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-4"
            >
              <Chapter n="ii." label="Herkenning" />
              <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                Misschien
                <br />
                <em className="italic text-terracotta-600">herken</em> je dit.
              </h2>
              <p className="mt-6 text-[15px] leading-[1.8] text-[#54514d]">
                De meeste mensen die bij ons komen, herkennen zichzelf in minstens één van deze
                bewegingen. Je bent niet de enige.
              </p>
            </motion.div>

            <motion.ol
              variants={fadeUp as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-12 lg:col-span-7 lg:col-start-6"
            >
              {[
                {
                  n: "01",
                  t: "Je bent je eigen strengste criticus",
                  d: "De lat ligt onhaalbaar hoog. Wat je doet is bijna nooit goed genoeg — voor jezelf.",
                },
                {
                  n: "02",
                  t: "Je zorgt voor iedereen, behalve voor jezelf",
                  d: "Je voelt feilloos aan wat een ander nodig heeft. Eigen behoeften komen ergens onderaan de lijst.",
                },
                {
                  n: "03",
                  t: "Fouten blijven dagenlang nagalmen",
                  d: "Eén misstap kan een hele week kleuren. Je piekert door, ook als je weet dat het niet helpt.",
                },
                {
                  n: "04",
                  t: "Rust nemen voelt als falen",
                  d: "Stilstaan voelt onveilig. Doorgaan is veiliger — tot je lichaam ingrijpt.",
                },
              ].map((r) => (
                <li key={r.n} className="grid grid-cols-[auto_1fr] gap-8 border-t border-[#2C2A28]/10 pt-8">
                  <span className="font-serif text-2xl italic text-terracotta-600">{r.n}</span>
                  <div>
                    <h3 className="font-serif text-2xl leading-snug text-[#1f1d1b]">{r.t}</h3>
                    <p className="mt-3 text-[15px] leading-[1.8] text-[#54514d]">{r.d}</p>
                  </div>
                </li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* ── 03 Method ─────────────────────────────────────── */}
      <section className="bg-[#FDFBF7]">
        <div className="container mx-auto grid gap-16 px-6 py-28 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-36">
          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[2px]">
              <img
                src={meditationPractice}
                alt="Een groep oefent samen zelfcompassie"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f1d1b]/70 to-transparent p-6 text-white">
                <p className="font-serif text-base italic leading-snug">
                  "Niets oplossen. Alleen aanwezig blijven — bij jezelf."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-6 lg:col-start-7 lg:pt-10"
          >
            <Chapter n="iii." label="De methode" />
            <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[52px]">
              Mindful Zelfcompassie is een{" "}
              <em className="italic text-terracotta-600">vaardigheid</em> — die je kunt leren.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.85] text-[#54514d]">
              Het 8-weekse programma is ontwikkeld door Dr. Kristin Neff en Dr. Christopher Germer en
              wetenschappelijk onderbouwd. Je leert in een veilige, kleine groep hoe je jezelf met dezelfde
              warmte kunt benaderen als een goede vriend.
            </p>

            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {[
                { t: "Mind", d: "Mindfulness: zien wat er is, zonder oordeel." },
                { t: "Heart", d: "Zelfcompassie: vriendelijk reageren op wat moeilijk is." },
                { t: "Body", d: "Belichaamde oefeningen voor blijvende verandering." },
              ].map((p) => (
                <div key={p.t} className="border-t border-terracotta-600/30 pt-4">
                  <p className="font-serif text-xl italic text-terracotta-700">{p.t}</p>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[#54514d]">{p.d}</p>
                </div>
              ))}
            </div>

            <Link
              to="/mindful-zelfcompassie"
              className="mt-12 inline-flex items-center gap-2 border-b border-[#1f1d1b] pb-1 text-[12px] font-medium uppercase tracking-[0.22em] text-[#1f1d1b] hover:text-terracotta-700"
            >
              Meer over de methode <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 04 Trainer ─────────────────────────────────────── */}
      <section className="bg-sage-600 text-[#FDFBF7]">
        <div className="container mx-auto grid gap-16 px-6 py-28 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-36">
          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-t-[180px] bg-sage-700/40">
                <img
                  src={caglaBio}
                  alt="Çağla — gecertificeerd MSC-trainer"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <p className="mt-6 font-serif text-2xl italic">— Çağla</p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
                Oprichter · Gecertificeerd MSC-trainer
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-6 lg:col-start-7 lg:pt-12"
          >
            <Chapter n="iv." label="De begeleiding" />
            <p className="mt-10 font-serif text-3xl leading-[1.3] lg:text-4xl">
              "Ik help je de weg te vinden van je <em className="italic">hoofd</em> naar je{" "}
              <em className="italic">hart</em> — zodat je jezelf eindelijk kunt ontvangen zoals je bent."
            </p>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-white/85">
              Çağla begeleidt al meer dan tien jaar mensen in mindfulness en zelfcompassie. Samen met
              Sabine en Maria vormt zij een klein, betrokken team. Geen masterclasses voor honderden — wel
              echte aandacht, in een veilige setting.
            </p>
            <Link
              to="/trainers"
              className="mt-10 inline-flex items-center gap-2 border-b border-white pb-1 text-[12px] font-medium uppercase tracking-[0.22em] hover:opacity-80"
            >
              Maak kennis met het team <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 05 Proof ──────────────────────────────────────── */}
      <section className="bg-[#FDFBF7]">
        <div className="container mx-auto px-6 py-28 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Chapter n="v." label="Wat deelnemers schreven" />
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <motion.figure
              variants={fadeUp as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-7 lg:col-start-2"
            >
              <blockquote className="font-serif text-3xl leading-[1.35] text-[#1f1d1b] lg:text-[40px]">
                "Ik had nooit verwacht dat acht weken zoveel zouden veranderen. Voor het eerst voel ik
                rust — niet omdat alles is opgelost, maar omdat ik <em className="italic text-terracotta-600">aan
                mijn eigen kant</em> sta."
              </blockquote>
              <figcaption className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#7a7670]">
                — Sanne, deelnemer voorjaar 2025
              </figcaption>
            </motion.figure>

            <div className="space-y-10 lg:col-span-3 lg:col-start-10 lg:pt-4">
              {[
                {
                  q: "De groep was klein en veilig. Dat maakte alles mogelijk.",
                  a: "Mark V.",
                },
                {
                  q: "Praktisch en direct toepasbaar. Geen vaag verhaal.",
                  a: "Peter K.",
                },
              ].map((t) => (
                <figure key={t.a} className="border-l-2 border-terracotta-600/40 pl-4">
                  <p className="text-[14px] italic leading-[1.7] text-[#54514d]">"{t.q}"</p>
                  <figcaption className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[#7a7670]">
                    {t.a}
                  </figcaption>
                </figure>
              ))}
              <Link
                to="/ervaringen"
                className="inline-flex items-center gap-2 border-b border-[#1f1d1b] pb-1 text-[11px] font-medium uppercase tracking-[0.22em]"
              >
                Lees alle ervaringen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 Paths ──────────────────────────────────────── */}
      <section className="bg-[#F6F1E8]">
        <div className="container mx-auto px-6 py-28 lg:px-12 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Chapter n="vi." label="Drie wegen" />
              <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-5xl">
                Welke weg past
                <br />
                <em className="italic text-terracotta-600">bij jou?</em>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                Iedere weg vraagt iets anders. Niet zeker? In een kort kennismakingsgesprek kijken we
                samen wat passend voelt.
              </p>
            </div>

            <div className="grid gap-6 lg:col-span-8 lg:grid-cols-3">
              {[
                {
                  tag: "Groep",
                  title: "8-weekse Mindful Zelfcompassie Training",
                  body: "Samen leren in een kleine, veilige groep (max. 12). Wekelijkse bijeenkomsten en thuisopdrachten.",
                  meta: "8 weken · vanaf €495",
                  to: "/msc-groepstraining",
                  highlight: true,
                },
                {
                  tag: "Individueel",
                  title: "6 sessies persoonlijke begeleiding",
                  body: "Volledig op jouw tempo, via Zoom. Verdiepend, vertrouwelijk, op maat.",
                  meta: "6 sessies · €550",
                  to: "/individuele-begeleiding",
                  highlight: false,
                },
                {
                  tag: "Workshop",
                  title: "Introductie & verdiepende workshops",
                  body: "Een kennismaking met zelfcompassie in één dagdeel. Ook als opstap naar de training.",
                  meta: "1 dagdeel",
                  to: "/agenda",
                  highlight: false,
                },
              ].map((p) => (
                <motion.article
                  key={p.title}
                  variants={fadeUp as any}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  className={`group relative flex flex-col justify-between border bg-white p-7 transition-colors ${
                    p.highlight
                      ? "border-terracotta-600 lg:-translate-y-3"
                      : "border-[#2C2A28]/10 hover:border-terracotta-600/50"
                  }`}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-terracotta-700">{p.tag}</p>
                    <h3 className="mt-5 font-serif text-2xl leading-snug text-[#1f1d1b]">{p.title}</h3>
                    <p className="mt-4 text-[14px] leading-[1.75] text-[#54514d]">{p.body}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-[#2C2A28]/10 pt-5">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#7a7670]">{p.meta}</span>
                    <Link
                      to={p.to}
                      className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1f1d1b] group-hover:text-terracotta-700"
                    >
                      Bekijk <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 Soft CTA ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1f1d1b] text-[#FDFBF7]">
        <img
          src={natureCalm}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative container mx-auto px-6 py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-2xl text-center">
            <Chapter n="vii." label="De eerste stap" />
            <h2 className="mt-10 font-serif text-4xl leading-[1.1] lg:text-[56px]">
              Twijfel je nog?
              <br />
              <em className="italic text-terracotta-300">Laten we even praten.</em>
            </h2>
            <p className="mx-auto mt-8 max-w-lg text-[16px] leading-[1.85] text-white/80">
              Een vrijblijvend kennismakingsgesprek van twintig minuten. Geen verkoopgesprek — gewoon
              luisteren wat er speelt en samen kijken wat passend is.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-terracotta-600 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-terracotta-700"
              >
                Plan een gratis intro call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/agenda"
                className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/80 underline-offset-8 hover:underline"
              >
                Of bekijk de agenda
              </Link>
            </div>
            <p className="mt-16 text-[10px] uppercase tracking-[0.3em] text-white/40">
              Mindful Mind · Amsterdam & online · Çağla, Sabine, Maria
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditorialHome;
