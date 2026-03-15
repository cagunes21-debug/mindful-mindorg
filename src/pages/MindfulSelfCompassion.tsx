import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Sparkles, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import caglaPhoto from "@/assets/cagla-bio.png";

const MindfulSelfCompassion = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Mindful Self-Compassion"
        description="Leer met dezelfde vriendelijkheid op moeilijkheden te reageren als die je aan een goede vriend zou bieden. Mindful Self-Compassion sessies en workshops met Çağla Güneş."
        canonical="https://mindfulmind.nl/mindful-self-compassion"
      />
      <Navigation />

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[45vw] h-[45vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--sage-100) / 0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--terracotta-100) / 0.15) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.05, 1], y: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] right-[10%] w-[20vw] h-[20vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--sage-100) / 0.12) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-[680px]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs font-medium tracking-[0.25em] uppercase text-sage-600 mb-10"
          >
            Mindful Self-Compassion
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight text-foreground mb-7"
          >
            Een zachtere manier
            <br />
            om jezelf te{" "}
            <span className="font-serif italic text-sage-600">ontmoeten</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-lg font-light text-muted-foreground leading-relaxed max-w-[480px] mx-auto"
          >
            Leren om op moeilijke momenten te reageren met dezelfde vriendelijkheid die je aan een goede vriend zou bieden. Mindful Self-Compassion sessies en workshops met Çağla Güneş.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <a href="#de-praktijk" className="text-xs tracking-[0.2em] uppercase text-warm-400 hover:text-sage-600 transition-colors">
              Ontdek
            </a>
            <div className="w-px h-8 bg-gradient-to-b from-warm-400 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* ═══════ INTRO / DE PRAKTIJK ═══════ */}
      <section id="de-praktijk" className="py-28 px-6">
        <div className="max-w-[700px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-px bg-sage-500" />
              <span className="text-[0.6rem] font-medium tracking-[0.22em] uppercase text-sage-600">
                De praktijk
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light leading-[1.3] text-foreground mb-9">
              Wat als de stem van binnen
              <br />
              <span className="font-serif italic text-sage-600">vriendelijker</span> kon zijn?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg font-light text-muted-foreground leading-[2] mb-6">
              De meesten van ons hebben geleerd om door te duwen bij tegenslag — streng te zijn voor onszelf als we worstelen, ons eigen pijn te behandelen als iets dat overwonnen moet worden in plaats van iets om bij stil te staan. We bieden geduld aan anderen, maar keren diezelfde warmte zelden naar binnen.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-lg font-light text-muted-foreground leading-[2] mb-6">
              <strong className="text-foreground font-normal">Mindful Self-Compassion</strong> is een praktijk die deze relatie verandert. Niet door te repareren wat gebroken is, maar door te erkennen dat de worsteling zelf tederheid verdient. Het brengt mindfulness samen — het vermogen om aanwezig te zijn bij wat is — en compassie — de bereidheid om met zorg te reageren op lijden.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg font-light text-muted-foreground leading-[2]">
              Het is geen filosofie. Het is iets wat je kunt leren, oefenen en in je lichaam voelen. En na verloop van tijd verandert het stilletjes hoe je je verhoudt tot jezelf, tot moeilijkheden en tot het leven.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Separator */}
      <div className="flex items-center justify-center gap-6 py-2 max-w-[700px] mx-auto px-6">
        <div className="flex-1 max-w-[60px] h-px bg-warm-300/30" />
        <span className="text-sage-400/40 text-sm">✦</span>
        <div className="flex-1 max-w-[60px] h-px bg-warm-300/30" />
      </div>

      {/* ═══════ QUOTE ═══════ */}
      <section className="py-20 px-6 text-center">
        <ScrollReveal>
          <blockquote className="relative text-xl md:text-2xl lg:text-[1.9rem] font-light italic leading-[1.7] text-foreground max-w-[580px] mx-auto">
            <span className="absolute -top-7 -left-1 text-[4.5rem] font-light text-sage-400/20 leading-none select-none">"</span>
            Wanneer we onszelf compassie geven, proberen we de pijn niet weg te nemen. We veranderen onze relatie ertoe.
          </blockquote>
        </ScrollReveal>
      </section>

      {/* Separator */}
      <div className="flex items-center justify-center gap-6 py-2 max-w-[700px] mx-auto px-6">
        <div className="flex-1 max-w-[60px] h-px bg-warm-300/30" />
        <span className="text-sage-400/40 text-sm">✦</span>
        <div className="flex-1 max-w-[60px] h-px bg-warm-300/30" />
      </div>

      {/* ═══════ THREE QUALITIES ═══════ */}
      <section className="py-28 px-6">
        <div className="max-w-[700px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-px bg-sage-500" />
              <span className="text-[0.6rem] font-medium tracking-[0.22em] uppercase text-sage-600">
                Mindful Self-Compassion
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light leading-[1.3] text-foreground mb-9">
              Drie kwaliteiten,
              <br />
              één <span className="font-serif italic text-sage-600">praktijk</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg font-light text-muted-foreground leading-[2] mb-10">
              Mindful Self-Compassion, ontwikkeld door Kristin Neff en Christopher Germer, rust op drie met elkaar verbonden kwaliteiten. Samen vormen ze een manier van zijn met jezelf die zowel gegrond als zacht is — vooral in de momenten dat het leven het moeilijkst is.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <ScrollReveal delay={0}>
              <div className="text-center p-7 rounded-2xl bg-secondary border border-border/50 hover:-translate-y-0.5 hover:shadow-md transition-all">
                <p className="text-lg font-normal italic text-foreground mb-1.5">Mindfulness</p>
                <p className="text-xs leading-relaxed text-muted-foreground font-light">
                  Aanwezig zijn bij wat er is, zonder je te vereenzelvigen met de pijn of het weg te duwen
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="text-center p-7 rounded-2xl bg-secondary border border-border/50 hover:-translate-y-0.5 hover:shadow-md transition-all">
                <p className="text-lg font-normal italic text-foreground mb-1.5">Gedeelde menselijkheid</p>
                <p className="text-xs leading-relaxed text-muted-foreground font-light">
                  Erkennen dat lijden deel uitmaakt van de gedeelde menselijke ervaring — je bent hier niet alleen in
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="text-center p-7 rounded-2xl bg-secondary border border-border/50 hover:-translate-y-0.5 hover:shadow-md transition-all">
                <p className="text-lg font-normal italic text-foreground mb-1.5">Zelfvriendelijkheid</p>
                <p className="text-xs leading-relaxed text-muted-foreground font-light">
                  Reageren op jezelf met warmte en begrip, in plaats van met oordeel
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════ OFFERINGS ═══════ */}
      <section className="py-28 px-6 bg-secondary relative overflow-hidden">
        <div
          className="absolute -top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--sage-100) / 0.2) 0%, transparent 65%)" }}
        />

        <div className="max-w-[900px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-px bg-sage-500" />
              <span className="text-[0.6rem] font-medium tracking-[0.22em] uppercase text-sage-600">
                Wat wij bieden
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light leading-[1.3] text-foreground mb-5">
              Sessies &{" "}
              <span className="font-serif italic text-sage-600">workshops</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-[600px] mb-14">
              Twee manieren om Mindful Self-Compassion te verkennen — elk ontworpen om je te ontmoeten waar je bent.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal delay={0}>
              <div className="bg-card/70 border border-border/15 rounded-2xl p-10 hover:bg-card hover:border-sage-300/25 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-sage-100/40 flex items-center justify-center mb-6 text-xl">
                  🌱
                </div>
                <h3 className="text-xl font-normal text-foreground mb-3">MSC Sessies</h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-light mb-5">
                  Individuele Mindful Self-Compassion sessies, afgestemd op jouw persoonlijke ervaring en waar je doorheen gaat. Een veilige, ongehaaste ruimte om een meer compassievolle relatie met jezelf te ontwikkelen — op jouw eigen tempo.
                </p>
                <span className="inline-block text-[0.68rem] tracking-[0.1em] uppercase text-sage-600 px-3.5 py-1.5 bg-sage-100/40 rounded-full">
                  Individueel
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="bg-card/70 border border-border/15 rounded-2xl p-10 hover:bg-card hover:border-sage-300/25 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-sage-100/40 flex items-center justify-center mb-6 text-xl">
                  🌿
                </div>
                <h3 className="text-xl font-normal text-foreground mb-3">Workshops</h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-light mb-5">
                  Groepssessies die de kernpraktijken van Mindful Self-Compassion introduceren door middel van begeleide oefeningen, reflectie en gedeelde ervaring. Een ruimte om samen te oefenen — met zorg en vertrouwelijkheid.
                </p>
                <span className="inline-block text-[0.68rem] tracking-[0.1em] uppercase text-sage-600 px-3.5 py-1.5 bg-sage-100/40 rounded-full">
                  Groep
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT ÇAĞLA ═══════ */}
      <section className="py-28 px-6 bg-foreground text-secondary relative overflow-hidden">
        <div
          className="absolute -top-[30%] -left-[10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--sage-600) / 0.06) 0%, transparent 55%)" }}
        />

        <div className="max-w-[700px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-px bg-terracotta-400" />
              <span className="text-[0.6rem] font-medium tracking-[0.22em] uppercase text-terracotta-400">
                Over
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light leading-[1.3] text-warm-100 mb-9">
              Çağla{" "}
              <span className="font-serif italic text-terracotta-400">Güneş</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg font-light text-warm-300/60 leading-[2] mb-6">
              Mindfulness maakt al sinds haar kindertijd deel uit van Çağla's leven — een stille praktijk die begon op <strong className="text-warm-100 font-normal">achtjarige leeftijd</strong> en zich verdiepte gedurende decennia van dagelijkse meditatie, studie en langdurige Vipassana-retraites. Het is niet iets dat ze van een afstand onderwijst. Het is iets dat ze leeft.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-lg font-light text-warm-300/60 leading-[2] mb-6">
              Haar pad heeft geleid door <strong className="text-warm-100 font-normal">vijf landen</strong>, meerdere talen, en jaren van professioneel werk in organisatietransformatie, voordat ze zich richtte op wat altijd centraal had gestaan: het innerlijk leven. De verschuiving van systemen naar individuen, van strategie naar aanwezigheid, was geen vertrek — het was een thuiskomst.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg font-light text-warm-300/60 leading-[2] mb-10">
              Geboren tussen de <strong className="text-warm-100 font-normal">Nederlandse en Turkse cultuur</strong>, geworteld in het voorouderlijke landschap van Cappadocië, brengt Çağla een diepe gevoeligheid mee voor vragen over identiteit, verbondenheid en wat het betekent om je thuis te voelen in jezelf. Dit geleefde begrip vormt alles wat ze biedt.
            </p>
          </ScrollReveal>

          {/* Bridge to In Harmonia */}
          <ScrollReveal delay={0.25}>
            <div className="mt-10 p-7 bg-white/[0.04] border border-warm-300/10 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6 hover:bg-white/[0.07] hover:border-warm-300/20 transition-all">
              <div className="flex-1">
                <p className="text-[0.95rem] text-warm-300/50 leading-relaxed mb-1">
                  Çağla werkt ook als <strong className="text-warm-100 font-normal">lichaamsgerichte psychotherapeut</strong>, en begeleidt mensen bij stress, burn-out en trauma via Somatic Experiencing®.
                </p>
                <a
                  href="https://www.in-harmonia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs tracking-[0.08em] text-terracotta-400 hover:text-warm-100 transition-colors mt-2"
                >
                  Bezoek In Harmonia
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-[520px] mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light leading-[1.3] text-foreground mb-4">
              Begin met{" "}
              <span className="font-serif italic text-sage-600">vriendelijkheid</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="text-lg font-light text-muted-foreground leading-relaxed mb-10">
              Of je nu nieuwsgierig bent naar Mindful Self-Compassion, geïnteresseerd in een workshop, of klaar om met individuele sessies te beginnen — we horen graag van je.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:mindful-mind@outlook.com"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-sage-600 text-white text-sm font-normal tracking-wide border border-sage-600 hover:bg-foreground hover:border-foreground hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                <Mail className="h-4 w-4" />
                Neem contact op
              </a>
              <a
                href="tel:+31625633379"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-transparent text-foreground text-sm font-normal tracking-wide border border-warm-300 hover:bg-foreground hover:text-white hover:border-foreground hover:-translate-y-0.5 transition-all"
              >
                <Phone className="h-4 w-4" />
                Plan een gesprek
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MindfulSelfCompassion;
