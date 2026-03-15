import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";

const places = [
  { name: "Nederland", label: "Studie & groei" },
  { name: "Duitsland", label: "Strategie & partnerschap" },
  { name: "Spanje", label: "Eigen pad" },
  { name: "Mexico", label: "Verdieping" },
  { name: "Turkije", label: "Wortels" },
];

const Divider = () => (
  <div className="flex items-center justify-center gap-5 py-4 max-w-[720px] mx-auto px-6">
    <div className="flex-1 max-w-[80px] h-px bg-warm-300/30" />
    <span className="text-warm-400/50 text-lg">◆</span>
    <div className="flex-1 max-w-[80px] h-px bg-warm-300/30" />
  </div>
);

const OverCagla = () => {
  return (
    <div className="min-h-screen bg-warm-50">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Over Çağla Güneş"
        description="Het verhaal van Çağla Güneş — een reis naar binnen, door de wereld, terug naar de bron. Gecertificeerde MSC-trainer en oprichter van Mindful Mind."
        canonical="https://mindfulmind.nl/over-cagla"
      />
      <Navigation />

      {/* ═══════ OPENING ═══════ */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Breathing orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--sage-200) / 0.15) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-sage-600 mb-10"
          >
            Het verhaal van
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-foreground mb-6"
          >
            Çağla <span className="font-serif italic text-terracotta-600">Güneş</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="text-xl font-light italic text-warm-500 max-w-[500px] leading-relaxed"
          >
            Een reis naar binnen — door de wereld, terug naar de bron
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        >
          <span className="text-[0.65rem] tracking-[0.15em] uppercase text-warm-400">Lees verder</span>
          <div className="w-px h-10 bg-gradient-to-b from-warm-400 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ═══════ HOOFDSTUK I — HET STILLE BEGIN ═══════ */}
      <div className="py-28 lg:py-32 px-6 max-w-[720px] mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-5 h-px bg-sage-500" />
            <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-sage-600">
              Hoofdstuk I
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-foreground mb-10">
            Het stille <span className="font-serif italic text-terracotta-600">begin</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-xl font-light text-muted-foreground leading-[2] mb-7">
            Sommige wegen beginnen niet met een beslissing, maar met een stille herkenning. Voor Çağla was dat de meditatie — een beoefening die zich al op haar <strong className="text-foreground font-medium">achtste</strong> aandiende, niet als discipline maar als iets dat altijd al aanwezig leek te zijn.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-xl font-light text-muted-foreground leading-[2] mb-7">
            Wat begon als een natuurlijk ritme groeide in de jaren die volgden uit tot een diepere oriëntatie. Door studie, jarenlange dagelijkse beoefening en langere <strong className="text-foreground font-medium">Vipassana-retraites</strong> werd meditatie niet zozeer een praktijk naast het leven, maar de grond eronder.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-xl font-light text-muted-foreground leading-[2]">
            Het is deze innerlijke verbinding — dit stille luisteren — dat de rode draad vormt door alles wat zou volgen.
          </p>
        </ScrollReveal>
      </div>

      <Divider />

      {/* ═══════ HOOFDSTUK II — DE WERELD ALS SPIEGEL ═══════ */}
      <div className="py-28 lg:py-32 px-6 max-w-[720px] mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-5 h-px bg-sage-500" />
            <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-sage-600">
              Hoofdstuk II
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-foreground mb-10">
            De wereld als <span className="font-serif italic text-terracotta-600">spiegel</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-xl font-light text-muted-foreground leading-[2] mb-7">
            Çağla's pad leidde haar ver van huis — en tegelijkertijd steeds dichter bij zichzelf. Jaren van reizen en wonen in het buitenland werden niet alleen een culturele verkenning, maar ook een <strong className="text-foreground font-medium">voortdurend onderzoek</strong> naar identiteit, verbondenheid en wat het betekent om je ergens thuis te voelen.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-xl font-light text-muted-foreground leading-[2]">
            Elk land bood een ander licht, een andere taal, een andere manier van zijn. Niet om zichzelf te verliezen, maar om steeds weer terug te keren naar wat wezenlijk is.
          </p>
        </ScrollReveal>
      </div>

      {/* ═══════ PLACES RIBBON ═══════ */}
      <div className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-100/50 to-transparent pointer-events-none" />
        <div className="flex justify-center gap-8 md:gap-16 flex-wrap relative">
          {places.map((place, i) => (
            <ScrollReveal key={place.name} delay={i * 0.08}>
              <div className="text-center">
                <p className="text-2xl font-light italic text-foreground mb-1">{place.name}</p>
                <p className="text-[0.65rem] tracking-[0.15em] uppercase text-warm-500">{place.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Divider />

      {/* ═══════ HOOFDSTUK III — NIET WEG, MAAR DICHTERBIJ ═══════ */}
      <div className="py-28 lg:py-32 px-6 max-w-[720px] mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-5 h-px bg-sage-500" />
            <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-sage-600">
              Hoofdstuk III
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-foreground mb-10">
            Niet weg, maar <span className="font-serif italic text-terracotta-600">dichterbij</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-xl font-light text-muted-foreground leading-[2] mb-7">
            In een wereld die beweging vaak gelijkstelt aan vooruitgang, koos Çağla een ander kompas. De jaren van reizen waren geen vlucht en geen zoektocht naar iets buiten haarzelf — maar een <strong className="text-foreground font-medium">langzaam thuiskomen</strong> in haar eigen wezen.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-xl font-light text-muted-foreground leading-[2]">
            Elke verhuizing, elke nieuwe taal, elke ontmoeting met het onbekende bracht haar niet verder weg, maar dichter bij haar <strong className="text-foreground font-medium">essentie</strong>. De buitenwereld werd een spiegel voor het innerlijke landschap.
          </p>
        </ScrollReveal>
      </div>

      {/* ═══════ QUOTE ═══════ */}
      <div className="py-24 px-6 text-center">
        <ScrollReveal>
          <blockquote className="relative text-2xl md:text-3xl lg:text-4xl font-light italic leading-[1.6] text-foreground max-w-[680px] mx-auto">
            <span className="absolute -top-10 -left-2 text-[6rem] font-light text-warm-300/25 leading-none select-none">"</span>
            In plaats van weg te bewegen van zichzelf, brachten deze reizen haar dichter bij haar essentie.
          </blockquote>
        </ScrollReveal>
      </div>

      {/* ═══════ HOOFDSTUK IV — CAPPADOCIË ═══════ */}
      <section className="py-28 lg:py-32 px-6 bg-foreground relative overflow-hidden">
        <div
          className="absolute -top-1/2 -right-[20%] w-[80vw] h-[80vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--terracotta-300) / 0.08) 0%, transparent 60%)" }}
        />

        <div className="max-w-[720px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-px bg-terracotta-400" />
              <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-terracotta-400">
                Hoofdstuk IV
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-warm-100 mb-10">
              Wortels in <span className="font-serif italic text-terracotta-400">Cappadocië</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xl font-light text-warm-300/70 leading-[2] mb-7">
              Er is een plek die dieper reikt dan herinnering — een landschap van steen en stilte, van grotten uitgehouwen door tijd en wind. <strong className="text-warm-100 font-medium">Cappadocië</strong>, de aarde waar Çağla's voorouders hun leven bouwden, vormt een fundament dat niet zichtbaar hoeft te zijn om gedragen te worden.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-xl font-light text-warm-300/70 leading-[2] mb-7">
              Dit <strong className="text-warm-100 font-medium">voorouderlijk bewustzijn</strong> brengt een gevoel van continuïteit, van diepte en respect voor de lagen die de menselijke ervaring vormen — persoonlijk, collectief en transgenerationeel. Het is niet nostalgie, maar een levende verbinding.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl font-light text-warm-300/70 leading-[2]">
              Vanuit deze wortels groeit alles: het werk, de beoefening, de toewijding aan <strong className="text-warm-100 font-medium">innerlijke verbinding</strong>. Niet als iets dat geleerd moest worden, maar als iets dat herinnerd werd.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ CLOSING ═══════ */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-[600px] mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-light leading-[1.3] text-foreground mb-8">
              Een leven in <span className="font-serif italic text-terracotta-600">verbinding</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="text-lg font-light text-muted-foreground leading-relaxed mb-10">
              Çağla's werk is geworteld in alles wat zij geleefd heeft — de stilte, de reis, de terugkeer. Het is vanuit deze geleefde ervaring dat zij anderen begeleidt naar hun eigen innerlijk landschap.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full border border-warm-300 text-sm tracking-wide text-foreground hover:bg-foreground hover:text-warm-50 hover:border-foreground hover:-translate-y-0.5 transition-all"
            >
              Neem contact op
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OverCagla;
