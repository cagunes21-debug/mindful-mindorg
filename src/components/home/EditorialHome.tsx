import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Users, User } from "lucide-react";
import caglaBio from "@/assets/cagla-bio.png";
import heroImage from "@/assets/hero-mindful.jpg";

/* -----------------------------------------------------------
   Editorial homepage — written like a printed magazine spread.
   Journey: arrival → recognition → method → trainer → proof →
   paths → soft CTA. Locked palette: terracotta/sage/ivory.
----------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
} as const;

const Chapter = ({ label, tone }: { label: string; tone?: "ivory" }) => (
  <span className={`text-[11px] uppercase tracking-[0.28em] ${tone === "ivory" ? "text-white/80" : "text-terracotta-600/80"}`}>
    {label}
  </span>
);

const EditorialHome = () => {
  return (
    <div className="bg-[#FDFBF7] text-[#2C2A28]">
      {/* ── 01 Arrival ─────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="show"
              className="md:col-span-7 lg:pt-10"
            >
              <span className="inline-block bg-sage-700 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#FDFBF7]">
                Mindful Zelfcompassie Training
              </span>
              <h1 className="mt-6 font-serif text-[36px] leading-[1.1] tracking-tight text-[#1f1d1b] sm:text-[48px] lg:text-[60px]">
                Een andere manier om{" "}
                <em className="italic text-terracotta-600">sterk</em> te zijn.
              </h1>
              <p className="mt-6 max-w-xl font-sans text-base leading-[1.75] text-[#54514d]">
                Leer vriendelijker omgaan met jezelf in tijden van stress, onzekerheid en zelfkritiek. Ontwikkel vaardigheden die je helpen meer rust, balans en vertrouwen te ervaren in het dagelijks leven.
              </p>


              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  to="/msc-training"
                  className="group inline-flex items-center justify-center gap-3 bg-sage-700 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-sage-800"
                >
                  Groepstraining — start september
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/coaching"
                  className="group inline-flex items-center justify-center gap-3 bg-terracotta-600 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-terracotta-700"
                >
                  Individuele sessies
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

            </motion.div>

            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="show"
              className="relative md:col-span-5"
            >
              <div className="relative mx-auto w-full max-w-md">
                {/* Foto in zachte boog */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[180px] border border-[#2C2A28]/10 bg-[#F6F1E8]">
                  <img
                    src={heroImage}
                    alt="Vrouw in meditatie — Mindful Zelfcompassie"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-24 border-t border-[#2C2A28]/10" />
      </section>

      {/* ── 02 Wat is MSC ────────────────────────────────── */}
      <section className="bg-[#FDFBF7]">
        <div className="container mx-auto grid gap-16 px-6 py-20 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-28">
          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-10 lg:col-start-2"
          >
            <Chapter label="Wat is MSC" />
            <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[44px]">
              Een training in{" "}
              <em className="italic text-terracotta-600">zelfcompassie</em>.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.85] text-[#54514d]">
              MSC (Mindful Self-Compassion) is een 8-weeks programma, ontwikkeld door
              Dr. Kristin Neff en Dr. Christopher Germer. Je leert via meditatie,
              oefeningen en uitwisseling in een kleine groep hoe je jezelf kunt
              steunen — vooral wanneer het moeilijk is.
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                { t: "Mindfulness", d: "Aanwezig zijn bij wat er is, zonder oordeel." },
                { t: "Zelfvriendelijkheid", d: "Reageren op jezelf zoals op een goede vriend." },
                { t: "Verbondenheid", d: "Beseffen dat je niet de enige bent." },
              ].map((p) => (
                <div key={p.t} className="border-t border-terracotta-600/30 pt-3">
                  <p className="font-serif text-lg italic text-terracotta-700">{p.t}</p>
                  <p className="mt-1 text-[13px] leading-[1.7] text-[#54514d]">{p.d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 03 Wat het je brengt ────────────────────────── */}
      <section className="bg-[#F6F1E8]">
        <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-24">
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-5"
            >
              <Chapter label="Wat het je brengt" />
              <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[44px]">
                Concreet —<br />
                <em className="italic text-terracotta-600">na acht weken.</em>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-[#54514d]">
                Onderzoek toont consistent minder stress en meer emotionele veerkracht. Geen quick fix — wel een fundament dat blijft.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
              {[
                { num: "01", t: "Minder zelfkritiek", d: "Je herkent de innerlijke criticus eerder en kunt er anders mee omgaan." },
                { num: "02", t: "Meer rust", d: "Stress en piekeren nemen af. Je herstelt sneller na een moeilijke dag." },
                { num: "03", t: "Beter voor jezelf zorgen", d: "Je leert zorgen voor jezelf zonder schuldgevoel — ook richting anderen." },
                { num: "04", t: "Een vaardigheid voor altijd", d: "Concrete oefeningen die je de rest van je leven kunt blijven gebruiken." },
              ].map((b) => (
                <div
                  key={b.t}
                  className="group bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-3xl transition-all duration-300 hover:bg-white/60 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sage-700/10 text-sage-700 mb-6 text-xs font-bold transition-colors group-hover:bg-sage-700 group-hover:text-white">
                    {b.num}
                  </div>
                  <h3 className="font-serif text-2xl text-[#1f1d1b] mb-4">{b.t}</h3>
                  <p className="text-sm leading-relaxed text-[#54514d]">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 Kies wat het beste bij je past — Groep & Individueel ──────────── */}
      <section className="bg-[#F7F3EE]">
        <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-28">
          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <Chapter label="Kies wat het beste bij je past" />
            <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[48px]">
              Groep of individueel —{" "}
              <em className="italic text-terracotta-600">jij kiest.</em>
            </h2>
            <p className="mt-6 text-[15px] leading-[1.85] text-[#54514d]">
              Beide trajecten dragen dezelfde MSC-methode. Het verschil zit in het tempo,
              de context en de mate van persoonlijke verdieping.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              {
                Icon: Users,
                tag: "Groepstraining",
                title: "8-weekse MSC traject",
                body: "Wekelijks twee uur samenkomen met max. 12 deelnemers. Je leert van de oefeningen én van de herkenning bij anderen. Online of op locatie.",
                price: "€550",
                cta: "Ontdek meer",
                to: "/msc-training",
              },
              {
                Icon: User,
                tag: "1-op-1 Begeleiding",
                title: "Individueel traject — 6 sessies",
                body: "Persoonlijk traject via Zoom, helemaal afgestemd op jouw vraag en tempo. Geschikt als groep niet past of als je iets specifieks wilt onderzoeken.",
                price: "€650",
                cta: "Ontdek meer",
                to: "/coaching",
              },
            ].map((p) => (
              <motion.article
                key={p.title}
                variants={fadeUp as any}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="group relative flex flex-col justify-between rounded-2xl border border-sage-600/15 bg-white p-8 shadow-sm transition-shadow hover:shadow-md lg:p-10"
              >
                <div>
                  <p.Icon className="h-8 w-8 text-sage-700" strokeWidth={1.4} />
                  <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-sage-700">
                    {p.tag}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-snug text-[#1f1d1b] lg:text-[28px]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-[#54514d]">{p.body}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[#2C2A28]/10 pt-5">
                  <span className="font-serif text-base text-[#1f1d1b]">{p.price}</span>
                  <Link
                    to={p.to}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta-700 group-hover:gap-2.5 transition-all"
                  >
                    {p.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-10 text-center text-[13px] text-[#7a7670]">
            Liever eerst proeven?{" "}
            <Link to="/agenda" className="underline underline-offset-4 hover:text-terracotta-700">
              Bekijk de gratis introductieworkshops
            </Link>
            .
          </p>
        </div>
      </section>


      {/* ── 03 Voor wie — Çağla's eigen woorden ──────────── */}
      <section className="bg-[#F6F1E8]">
        <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-5"
            >
              <Chapter label="Voor wie" />
              <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[44px]">
                Veel mensen die bij mij komen zijn jarenlang gewend{" "}
                <em className="italic text-terracotta-600">door te gaan.</em>
              </h2>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-serif text-2xl italic text-terracotta-600">
                <span>Sterk te zijn.</span>
                <span className="text-terracotta-300">◆</span>
                <span>Te zorgen.</span>
                <span className="text-terracotta-300">◆</span>
                <span>Te presteren.</span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-6 lg:col-start-7 lg:pt-4"
            >
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-[#2C2A28]/10 sm:grid-cols-2">
                <div className="bg-[#FDFBF7] p-7">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-sage-700">Van buiten</p>
                  <p className="mt-3 font-serif text-xl leading-snug text-[#1f1d1b]">
                    Lijkt het vaak alsof het goed gaat.
                  </p>
                </div>
                <div className="bg-[#F6F1E8] p-7">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-terracotta-700">Van binnen</p>
                  <p className="mt-3 font-serif text-xl leading-snug text-[#1f1d1b]">
                    Kost het steeds meer energie.
                  </p>
                </div>
              </div>
              <p className="mt-8 text-[15px] leading-[1.8] text-[#54514d]">
                Herken je dat? Dan is MSC een plek waar je niet harder hoeft te werken aan
                jezelf — maar leert hoe je jezelf kunt steunen, juist op de momenten dat
                het tegenzit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>




      {/* ── 04c Waarom nu ────────────────────────────────── */}
      <section className="bg-[#FDFBF7]">
        <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <Chapter label="Waarom nu" />
            <h2 className="mt-8 font-serif text-3xl leading-[1.25] text-[#1f1d1b] lg:text-[40px]">
              Omdat strenger zijn voor jezelf{" "}
              <em className="italic text-terracotta-600">niet werkt</em> —
              en je dat ergens al weet.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.85] text-[#54514d]">
              Veel mensen denken dat zelfkritiek hen scherp houdt. Onderzoek laat
              juist het tegenovergestelde zien: zelfcompassie zorgt voor meer
              motivatie, betere relaties en duurzamere veranderingen. Acht weken
              zijn genoeg om die andere manier van naar jezelf kijken écht onder
              de knie te krijgen.
            </p>
          </div>
        </div>
      </section>

      {/* ── 05 Trainer ───────────────────────────────────── */}
      <section className="bg-[#FDFBF7]">
        <div className="container mx-auto grid gap-16 px-6 py-20 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-28">
          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-sage-100">
                <img
                  src={caglaBio}
                  alt="Çağla Güneş — gecertificeerd MSC-trainer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 max-w-[260px] rounded-xl bg-terracotta-600 p-6 text-[#FDFBF7] shadow-lg sm:-right-6">
                <p className="font-serif text-lg italic leading-snug">
                  "Zelfcompassie is<br />een moedige daad."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-6 lg:col-start-7 lg:pt-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-sage-700">Je trainer</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[44px]">
              Çağla Güneş
            </h2>
            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#7a7670]">
              Oprichter Mindful Mind &amp; In Harmonia
            </p>
            <p className="mt-8 font-serif text-2xl leading-[1.4] text-[#1f1d1b] lg:text-[28px]">
              "Ik help je een andere relatie met jezelf op te bouwen —
              niet door jezelf te <em className="italic text-terracotta-600">verbeteren</em>,
              maar door jezelf te leren <em className="italic text-terracotta-600">ondersteunen</em>."
            </p>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[#54514d]">
              Opgegroeid tussen twee culturen, geworteld in meditatie sinds haar dertiende.
              Çağla combineert lichaamsgerichte psychotherapie, Somatic Experiencing® en
              jarenlange MSC-praktijk. Ze begeleidt in het Nederlands, Engels en Turks —
              altijd in een kleine, veilige setting.
            </p>

            <Link
              to="/over-cagla"
              className="mt-8 inline-flex items-center gap-2 border-b border-[#1f1d1b] pb-1 text-[12px] font-medium uppercase tracking-[0.22em] text-[#1f1d1b] hover:text-terracotta-700 hover:border-terracotta-700"
            >
              Lees haar verhaal <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 06 Ervaringen ────────────────────────────────── */}
      <section className="bg-[#FDFBF7]">
        <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <Chapter label="Ervaringen" />
            <motion.blockquote
              variants={fadeUp as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 font-serif text-3xl leading-[1.35] text-[#1f1d1b] lg:text-[40px]"
            >
              "Voor het eerst voel ik rust — niet omdat alles is opgelost, maar omdat ik{" "}
              <em className="italic text-terracotta-600">aan mijn eigen kant</em> sta."
            </motion.blockquote>
            <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#7a7670]">
              — Sanne, deelnemer voorjaar 2025
            </p>
            <Link
              to="/ervaringen"
              className="mt-10 inline-flex items-center gap-2 border-b border-[#1f1d1b] pb-1 text-[11px] font-medium uppercase tracking-[0.22em] hover:text-terracotta-700"
            >
              Lees alle ervaringen <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 07 Zachte CTA — licht en rustig ──────────────── */}
      <section className="bg-[#F6F1E8]">
        <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <Chapter label="De eerste stap" />
            <h2 className="mt-8 font-serif text-4xl leading-[1.15] text-[#1f1d1b] lg:text-[48px]">
              Twijfel je nog?
              <br />
              <em className="italic text-terracotta-600">Plan een gesprek met Çağla.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.8] text-[#54514d]">
              Twintig minuten, vrijblijvend. Geen verkoopgesprek — gewoon ruimte om te
              luisteren wat er speelt en samen kijken wat past.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-terracotta-600 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-terracotta-700"
              >
                Plan een gratis intro
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/agenda"
                className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#2C2A28] underline-offset-8 hover:underline"
              >
                Bekijk de agenda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditorialHome;
