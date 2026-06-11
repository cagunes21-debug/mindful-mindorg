import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Award, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";
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
                Mindful Zelfcompassie —
                <br />
                een andere manier om{" "}
                <em className="italic text-terracotta-600">sterk</em> te zijn.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-[1.75] text-[#54514d]">
                Ik ben Çağla Güneş — lichaamsgericht psychotherapeut en gecertificeerd MSC-trainer.
                In acht weken leer je hoe je jezelf kunt steunen in plaats van afkeuren. Geen quick
                fix, wel een vaardigheid die blijft. In een kleine groep, in het Nederlands,
                Engels of Turks.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  to="/msc-training"
                  className="group inline-flex items-center justify-center gap-3 bg-terracotta-600 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-terracotta-700"
                >
                  Bekijk de MSC training
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/coaching"
                  className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#2C2A28] underline-offset-8 hover:underline"
                >
                  Individuele begeleiding <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <dl className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-[#2C2A28]/10 pt-8 text-left">
                {[
                  { k: "8 weken", v: "begeleid programma" },
                  { k: "max 12", v: "deelnemers per groep" },
                  { k: "2,5 uur", v: "per sessie" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="font-serif text-2xl text-terracotta-700">{s.k}</dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#7a7670]">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              animate="show"
              className="relative lg:col-span-5"
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
                {/* Sage citaatkaart */}
                <div className="absolute -bottom-6 -left-4 max-w-[240px] bg-sage-600 p-5 text-[#FDFBF7] shadow-lg sm:-left-8">
                  <p className="font-serif text-lg italic leading-snug">
                    "Niet zichzelf verbeteren — zichzelf leren ondersteunen."
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/80">— Çağla</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-24 border-t border-[#2C2A28]/10" />
      </section>

      {/* ── Credibility band — professionele credentials ───── */}
      <section className="bg-[#FDFBF7]">
        <div className="container mx-auto px-6 py-10 lg:px-12 lg:py-14">
          <p className="text-center text-[10px] uppercase tracking-[0.32em] text-[#7a7670]">
            Lichaamsgericht psychotherapeut · Gecertificeerd MSC-trainer · Sessies in NL · EN · TR
          </p>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 border-y border-[#2C2A28]/10 py-8 sm:grid-cols-4">
            {[
              { Icon: GraduationCap, t: "Psychologie & Psychotherapie", s: "Integratief opgeleid" },
              { Icon: ShieldCheck, t: "Somatic Experiencing®", s: "Trauma & zenuwstelsel" },
              { Icon: BookOpen, t: "Mindful Self-Compassion", s: "Center for MSC — Neff & Germer" },
              { Icon: Award, t: "20+ jaar meditatie", s: "Vipassana-retraites sinds haar 13e" },
            ].map(({ Icon, t, s }) => (
              <div key={t} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 flex-none text-sage-700" strokeWidth={1.4} />
                <div>
                  <p className="font-serif text-[15px] text-[#1f1d1b]">{t}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-[#7a7670]">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 Wat we bieden — meteen helder ─────────────── */}
      <section className="bg-[#FDFBF7]">
        <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-4"
            >
              <Chapter label="Wat we bieden" />
              <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[44px]">
                Drie manieren
                <br />
                <em className="italic text-terracotta-600">om te beginnen.</em>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                Niet zeker? Een kort kennismakingsgesprek geeft duidelijkheid — vrijblijvend.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:col-span-8 lg:grid-cols-3">
              {[
                {
                  tag: "Groep",
                  title: "8-weekse training",
                  body: "Kleine groep (max. 12). Wekelijks samenkomen, online of op locatie.",
                  meta: "€550",
                  to: "/msc-training",
                  highlight: true,
                },
                {
                  tag: "Individueel",
                  title: "6 sessies 1-op-1",
                  body: "Persoonlijke begeleiding via Zoom. In jouw tempo, op maat.",
                  meta: "€550",
                  to: "/coaching",
                },
                {
                  tag: "Workshop",
                  title: "Introductie­workshop",
                  body: "Kennismaken met zelfcompassie in één dagdeel. Geen verplichtingen.",
                  meta: "1 dagdeel",
                  to: "/agenda",
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
                      ? "border-terracotta-600"
                      : "border-[#2C2A28]/10 hover:border-terracotta-600/50"
                  }`}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-terracotta-700">
                      {p.tag}
                    </p>
                    <h3 className="mt-5 font-serif text-2xl leading-snug text-[#1f1d1b]">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.75] text-[#54514d]">{p.body}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-[#2C2A28]/10 pt-5">
                    <span className="font-serif text-lg text-terracotta-700">{p.meta}</span>
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

      {/* ── 04 Wat is MSC ────────────────────────────────── */}
      <section className="bg-[#FDFBF7]">
        <div className="container mx-auto grid gap-16 px-6 py-20 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-28">
          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#2C2A28]/10 bg-white">
              <div className="absolute inset-x-0 bottom-0 h-2 bg-terracotta-600" />
              <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
                <div>
                  <div className="h-px w-12 bg-sage-600" />
                  <p className="mt-8 font-serif text-[26px] leading-[1.3] text-[#1f1d1b]">
                    Acht weken.<br />
                    Een nieuwe manier van<br />
                    <em className="italic text-terracotta-700">naar jezelf kijken.</em>
                  </p>
                </div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a7670]">
                  Mindful Self-Compassion · Neff &amp; Germer
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-6 lg:col-start-7 lg:pt-6"
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

      {/* ── 04b Wat het je brengt ────────────────────────── */}
      <section className="bg-[#F6F1E8]">
        <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <motion.div
              variants={fadeUp as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-4"
            >
              <Chapter label="Wat het je brengt" />
              <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-[#1f1d1b] lg:text-[44px]">
                Concreet —<br />
                <em className="italic text-terracotta-600">na acht weken.</em>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-[#54514d]">
                Geen quick fix, wel een fundament dat blijft. Onderzoek toont
                gemiddeld 36% minder stress en meer emotionele veerkracht.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:col-span-8 lg:grid-cols-2">
              {[
                { t: "Minder zelfkritiek", d: "Je herkent de innerlijke criticus eerder en kunt er anders mee omgaan." },
                { t: "Meer rust", d: "Stress en piekeren nemen af. Je herstelt sneller na een moeilijke dag." },
                { t: "Stevigere grenzen", d: "Je leert zorgen voor jezelf zonder schuldgevoel — ook richting anderen." },
                { t: "Een vaardigheid voor altijd", d: "Concrete oefeningen die je de rest van je leven kunt blijven gebruiken." },
              ].map((b) => (
                <div key={b.t} className="border-t border-[#2C2A28]/15 pt-5">
                  <p className="font-serif text-xl text-[#1f1d1b]">{b.t}</p>
                  <p className="mt-2 text-[14px] leading-[1.75] text-[#54514d]">{b.d}</p>
                </div>
              ))}
            </div>
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
      <section className="bg-sage-600 text-[#FDFBF7]">
        <div className="container mx-auto grid gap-16 px-6 py-20 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-28">
          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-t-[180px] bg-sage-700/40">
              <img
                src={caglaBio}
                alt="Çağla — gecertificeerd MSC-trainer"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <p className="mt-5 font-serif text-2xl italic">— Çağla</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
              Oprichter · Gecertificeerd MSC-trainer
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-6 lg:col-start-7 lg:pt-8"
          >
            <Chapter label="De begeleiding" tone="ivory" />
            <p className="mt-8 font-serif text-3xl leading-[1.3] lg:text-[38px]">
              "Ik help je de weg te vinden van je <em className="italic">hoofd</em> naar je{" "}
              <em className="italic">hart</em>."
            </p>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.85] text-white/85">
              Tien jaar ervaring in mindfulness en zelfcompassie. Geen masterclasses voor honderden
              — wel echte aandacht, in een kleine, veilige setting.
            </p>
            <Link
              to="/trainers"
              className="mt-8 inline-flex items-center gap-2 border-b border-white pb-1 text-[12px] font-medium uppercase tracking-[0.22em] hover:opacity-80"
            >
              Maak kennis met het team <ArrowUpRight className="h-3.5 w-3.5" />
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
              <em className="italic text-terracotta-600">Laten we even praten.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.8] text-[#54514d]">
              Twintig minuten, vrijblijvend. Geen verkoopgesprek — gewoon luisteren wat er speelt.
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
