import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Brain, Shield, Users, Sparkles, Check, Calendar, Leaf } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroImage from "@/assets/hero-mindful.jpg";

const forWhom = [
  { text: "Je bent vaak streng of kritisch naar jezelf", icon: Heart, color: "bg-terracotta-100 text-terracotta-600" },
  { text: "Je voelt je snel verantwoordelijk voor alles", icon: Shield, color: "bg-sage-100 text-sage-700" },
  { text: "Je hebt moeite met grenzen stellen", icon: Leaf, color: "bg-terracotta-100 text-terracotta-600" },
  { text: "Je ervaart stress, onrust of emotionele uitputting", icon: Brain, color: "bg-sage-100 text-sage-700" },
  { text: "Je wilt leren om beter voor jezelf te zorgen", icon: Sparkles, color: "bg-terracotta-100 text-terracotta-600" },
];

const benefits = [
  { title: "Innerlijke rust", desc: "Minder piekeren, meer ontspanning", icon: Shield },
  { title: "Emotionele veerkracht", desc: "Beter omgaan met tegenslagen", icon: Heart },
  { title: "Zelfvertrouwen", desc: "Minder twijfel, meer vertrouwen in jezelf", icon: Sparkles },
  { title: "Helderheid", desc: "Betere keuzes vanuit rust, niet vanuit angst", icon: Brain },
];

const IndividueelHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Mindful Zelfcompassie | Mindful Mind"
        description="Individuele begeleiding in Mindful Self-Compassion. Leer milder zijn voor jezelf, vind meer rust en vertrouwen. Plan een gratis kennismaking."
      />
      <OrganizationSchema />
      <Navigation />

      {/* ═══════════════════════════════════════════
          HERO — direct, warm, beeldend
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Vrouw mediteert in de natuur" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/55 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-secondary/80 text-sm tracking-[0.2em] uppercase mb-4"
            >
              Mindful Mind · Individuele begeleiding
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-foreground leading-[1.08] mb-6"
            >
              Leer milder zijn
              <br />
              <em className="italic">voor jezelf</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-secondary/85 text-lg leading-relaxed mb-8 max-w-md"
            >
              Persoonlijke begeleiding in Mindful Self-Compassion — afgestemd op jou, op jouw tempo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/contact"
                className="inline-block bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
              >
                Gratis kennismaking
              </Link>
              <Link
                to="/msc-training"
                className="inline-block border border-primary-foreground/40 text-primary-foreground px-7 py-3.5 rounded-lg font-semibold text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition-colors"
              >
                Groepstraining
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HERKEN JE DIT? — emotionele aansluiting
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-10 md:gap-14 items-center">
            <div className="md:col-span-3">
              <ScrollReveal>
                <p className="text-xs uppercase tracking-[0.25em] text-terracotta-500 font-medium mb-4">Herken je dit?</p>
                <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-snug mb-5">
                  Altijd maar doorgaan.
                  <br />
                  <span className="text-primary italic">Nooit genoeg.</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-[1.8]">
                  <p>
                    Je doet je best — voor je werk, je gezin, de mensen om je heen.
                    Maar dat stemmetje van binnen zegt steeds dat het niet goed genoeg is.
                  </p>
                  <p className="text-foreground font-medium">
                    Niet omdat er iets mis is met jou. Maar omdat je nooit hebt geleerd om anders met jezelf om te gaan.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <div className="md:col-span-2">
              <ScrollReveal delay={0.15}>
                <div className="bg-white rounded-2xl border border-terracotta-200/40 p-6 shadow-sm text-center">
                  <p className="font-serif italic text-lg text-foreground leading-relaxed mb-3">
                    "Behandel jezelf zoals je een goede vriendin zou behandelen."
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">— Het basisprincipe van MSC</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MSC KERN — wat het is
      ═══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-sage-50/50">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <ScrollReveal>
            <Leaf className="h-5 w-5 text-sage-400 mx-auto mb-5" />
            <p className="text-lg md:text-xl text-foreground leading-[1.8] font-medium mb-3">
              Mindful Self-Compassion helpt je om milder met jezelf om te gaan.
            </p>
            <p className="text-muted-foreground leading-[1.8] text-base md:text-lg">
              Niet door jezelf te veranderen,
              <br />
              maar door jezelf te ondersteunen — juist wanneer het moeilijk is.
            </p>
          </ScrollReveal>
        </div>
      </section>

      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-sage-600 font-medium mb-3">Voor wie</p>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Dit traject is voor jou als…
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-3">
            {forWhom.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3.5 bg-warm-50 rounded-xl px-5 py-4 border border-warm-200/60 h-full">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <p className="text-foreground text-[0.95rem] leading-snug">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WAT LEVERT HET OP — 4 kaarten
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-sage-50/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-terracotta-500 font-medium mb-3">Resultaten</p>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Wat het je <em className="italic text-primary">oplevert</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-sage-200/50 p-5 shadow-sm h-full">
                  <div className="h-10 w-10 rounded-xl bg-sage-100 flex items-center justify-center mb-3">
                    <b.icon className="h-5 w-5 text-sage-700" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOE HET WERKT — traject uitleg
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-terracotta-500 font-medium mb-3">Het traject</p>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Hoe werkt <em className="italic text-primary">het?</em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal delay={0.05}>
              <div className="bg-terracotta-50/50 rounded-2xl border border-terracotta-200/40 p-6 h-full">
                <p className="text-xs uppercase tracking-[0.2em] text-terracotta-500 font-medium mb-3">6 sessies · online via Zoom</p>
                <h3 className="text-lg font-semibold text-foreground mb-3">Individueel traject</h3>
                <ul className="space-y-2.5">
                  {[
                    "Gratis kennismakingsgesprek",
                    "6 sessies afgestemd op jou",
                    "Oefeningen & meditaties voor thuis",
                    "Persoonlijke begeleiding en reflectie",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="h-4 w-4 text-terracotta-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-terracotta-200/40 flex items-center justify-between">
                  <p className="text-2xl font-light text-terracotta-600">€550</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-terracotta-600 font-semibold text-sm hover:text-terracotta-700 transition-colors"
                  >
                    Start nu
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-warm-50 rounded-2xl border border-warm-200 p-6 h-full">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">Flexibel</p>
                <h3 className="text-lg font-semibold text-foreground mb-3">Losse sessie</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Wil je eerst ervaren wat MSC je brengt? Boek een enkele sessie — zonder verplichtingen.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "60 minuten online sessie",
                    "Direct toepasbare oefeningen",
                    "Vrijblijvend en op jouw tempo",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="h-4 w-4 text-sage-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-warm-200 flex items-center justify-between">
                  <p className="text-2xl font-light text-foreground">€110</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-foreground font-semibold text-sm hover:text-primary transition-colors"
                  >
                    Boek een sessie
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Betaling in termijnen is mogelijk bij het 6-sessie traject.
              De kennismaking is altijd gratis en vrijblijvend.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GROEPSTRAINING TEASER
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-sage-50 via-warm-50 to-terracotta-50/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 mb-4 rounded-full bg-sage-100 border border-sage-200 px-4 py-1.5 text-xs font-medium text-sage-700 tracking-wide uppercase">
                  <Users className="h-3.5 w-3.5" />
                  Groepstraining
                </span>
                <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3 leading-tight">
                  Liever samen groeien?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  De 8-weekse MSC groepstraining biedt dezelfde wetenschappelijk onderbouwde basis — maar dan in de kracht van een groep. Leer van elkaars ervaringen en ontdek zelfcompassie samen.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-sage-500" />
                    8 weken · start september 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-terracotta-500" />
                    Early bird t/m 1 augustus
                  </span>
                </div>
                <Link
                  to="/msc-training"
                  className="inline-flex items-center gap-2 text-terracotta-600 font-semibold text-sm hover:text-terracotta-700 transition-colors group"
                >
                  Bekijk de groepstraining
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="hidden md:flex flex-col items-center justify-center w-44 h-44 rounded-2xl bg-white/80 border border-sage-200 shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Vanaf</p>
                <p className="text-3xl font-light text-terracotta-600">€495</p>
                <p className="text-xs text-muted-foreground mt-1">early bird</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif mb-3">
              Klaar voor meer rust?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Plan een gratis en vrijblijvend kennismakingsgesprek.
              We verkennen samen wat bij jou past.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary-foreground text-primary px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
            >
              Plan een kennismaking
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndividueelHome;
