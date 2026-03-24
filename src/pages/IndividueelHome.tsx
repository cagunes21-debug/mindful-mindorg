import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Brain, Shield, Users, Sparkles, Check, Calendar, Leaf, FlaskConical } from "lucide-react";
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
  { text: "Je ervaart stress, onrust of uitputting", icon: Brain, color: "bg-sage-100 text-sage-700" },
  { text: "Je wilt leren om beter voor jezelf te zorgen", icon: Sparkles, color: "bg-terracotta-100 text-terracotta-600" },
];

const benefits = [
  { title: "Innerlijke rust", desc: "Minder piekeren, meer ontspanning", icon: Shield, accent: "terracotta" },
  { title: "Emotionele veerkracht", desc: "Beter omgaan met tegenslagen", icon: Heart, accent: "sage" },
  { title: "Zelfvertrouwen", desc: "Minder twijfel, meer vertrouwen", icon: Sparkles, accent: "terracotta" },
  { title: "Helderheid", desc: "Keuzes vanuit rust, niet vanuit angst", icon: Brain, accent: "sage" },
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

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Vrouw mediteert in de natuur" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <p className="text-secondary/70 text-xs tracking-[0.3em] uppercase mb-5 font-medium">
              Mindful Mind · Individuele begeleiding
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-primary-foreground leading-[1.08] mb-6">
              Minder streng voor jezelf.
              <br />
              <em className="italic font-light">Meer rust van binnen.</em>
            </h1>
            <p className="text-secondary/80 text-base md:text-lg leading-relaxed mb-10 max-w-sm">
              Persoonlijke begeleiding in Mindful Self-Compassion — afgestemd op jou, op jouw tempo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Gratis kennismaking
              </Link>
              <Link
                to="/msc-training"
                className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground h-12 px-8 rounded-full font-semibold text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
              >
                Groepstraining
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          HERKEN JE DIT? — editorial split
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-warm-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-terracotta-100/30 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Left column */}
            <div className="md:col-span-7">
              <ScrollReveal>
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-5">
                  Herken je dit?
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-[1.15] mb-6">
                  Altijd maar doorgaan.
                  <br />
                  <span className="text-primary italic font-light">Nooit genoeg.</span>
                </h2>
                <p className="text-muted-foreground leading-[1.85] text-base max-w-md">
                  Je doet je best — voor je werk, je gezin, de mensen om je heen.
                  Maar dat stemmetje van binnen zegt steeds dat het niet goed genoeg is.
                </p>
                <p className="text-foreground leading-[1.85] text-base mt-4 font-medium max-w-md">
                  Niet omdat er iets mis is met jou. Maar omdat je nooit hebt geleerd om anders met jezelf om te gaan.
                </p>
              </ScrollReveal>
            </div>

            {/* Right column — quote card */}
            <div className="md:col-span-5">
              <ScrollReveal delay={0.15}>
                <div className="bg-white rounded-3xl p-7 shadow-lg shadow-terracotta-200/20 border border-terracotta-100/60 relative">
                  <span className="absolute -top-3 left-7 text-5xl text-terracotta-200 font-serif leading-none select-none">"</span>
                  <p className="font-serif italic text-lg text-foreground leading-relaxed pt-4 mb-4">
                    Behandel jezelf zoals je een goede vriendin zou behandelen.
                  </p>
                  <div className="w-8 h-0.5 bg-terracotta-300/50 mb-3" />
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Het basisprincipe van MSC</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          MSC KERN — floating statement
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-sage-50 via-sage-50/50 to-warm-50 rounded-3xl border border-sage-200/50 p-8 md:p-12 text-center shadow-sm">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-sage-100 mb-6">
                <Leaf className="h-5 w-5 text-sage-600" />
              </div>
              <p className="text-xl md:text-2xl text-foreground leading-[1.6] font-serif mb-3">
                Mindful Self-Compassion helpt je om
                <br className="hidden md:block" />
                <em className="italic text-primary">milder met jezelf om te gaan.</em>
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                Niet door jezelf te veranderen, maar door jezelf te ondersteunen — juist wanneer het moeilijk is.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          VOOR WIE — 2-column grid cards
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sage-100/30 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-sage-600 font-medium mb-4">Voor wie</span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                  Dit traject is voor jou als…
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {forWhom.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="group flex items-start gap-4 bg-gradient-to-br from-warm-50 to-background rounded-2xl px-6 py-5 border border-warm-200/50 h-full hover:shadow-md hover:border-warm-300/60 transition-all duration-300">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color} group-hover:scale-105 transition-transform`}>
                      <item.icon className="h-4.5 w-4.5" />
                    </div>
                    <p className="text-foreground text-[0.95rem] leading-snug pt-1.5">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          WAT HET OPLEVERT — benefit cards
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-warm-50 relative overflow-hidden">
        <div className="absolute top-10 right-0 w-96 h-96 bg-sage-100/30 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">Resultaten</span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                  Wat het je <em className="italic text-primary">oplevert</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((b, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl p-6 border border-warm-200/50 shadow-sm hover:shadow-md transition-shadow duration-300 h-full text-center">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      b.accent === "sage" ? "bg-sage-100" : "bg-terracotta-100"
                    }`}>
                      <b.icon className={`h-5 w-5 ${
                        b.accent === "sage" ? "text-sage-700" : "text-terracotta-600"
                      }`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1.5">{b.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.4}>
              <div className="mt-10 flex items-center justify-center gap-2.5 bg-sage-50 border border-sage-200/60 rounded-full px-5 py-2.5 mx-auto w-fit">
                <FlaskConical className="h-4 w-4 text-sage-500 flex-shrink-0" />
                <span className="text-xs md:text-sm text-muted-foreground">
                  Wetenschappelijk onderbouwd — gebaseerd op 3.500+ peer-reviewed studies
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          HET TRAJECT — pricing cards
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">Het traject</span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                  Hoe werkt <em className="italic text-primary">het?</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Package — 6 sessies */}
              <ScrollReveal delay={0.05}>
                <div className="relative bg-white rounded-3xl border border-terracotta-200/40 p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="absolute -top-3 left-7">
                    <span className="inline-block bg-terracotta-500 text-white text-[0.65rem] tracking-widest uppercase font-semibold px-3 py-1 rounded-full">
                      Aanbevolen
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-terracotta-500 font-medium mb-2 mt-2">6 sessies · online via Zoom</p>
                  <h3 className="text-xl font-serif text-foreground mb-4">Individueel traject</h3>
                  <ul className="space-y-3 flex-1">
                    {[
                      "Gratis kennismakingsgesprek",
                      "6 sessies afgestemd op jou",
                      "Oefeningen & meditaties voor thuis",
                      "Persoonlijke begeleiding en reflectie",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <div className="h-5 w-5 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-terracotta-600" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-terracotta-100 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-light text-terracotta-600">€550</p>
                      <p className="text-xs text-muted-foreground mt-0.5">termijnbetaling mogelijk</p>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 bg-terracotta-600 text-white h-10 px-5 rounded-full text-sm font-semibold hover:bg-terracotta-700 transition-colors shadow-sm"
                    >
                      Start nu
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* Losse sessie */}
              <ScrollReveal delay={0.15}>
                <div className="bg-white rounded-3xl border border-warm-200 p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">Flexibel</p>
                  <h3 className="text-xl font-serif text-foreground mb-3">Losse sessie</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    Wil je eerst ervaren wat MSC je brengt? Boek een enkele sessie — zonder verplichtingen.
                  </p>
                  <ul className="space-y-3 flex-1">
                    {[
                      "60 minuten online sessie",
                      "Direct toepasbare oefeningen",
                      "Vrijblijvend en op jouw tempo",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <div className="h-5 w-5 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-sage-700" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-warm-200 flex items-center justify-between">
                    <p className="text-3xl font-light text-foreground">€110</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 border border-foreground/20 text-foreground h-10 px-5 rounded-full text-sm font-semibold hover:bg-warm-50 transition-colors"
                    >
                      Boek een sessie
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
              <p className="text-center text-sm text-muted-foreground mt-8">
                De kennismaking is altijd gratis en vrijblijvend.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          GROEPSTRAINING TEASER
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-sage-50 via-warm-50 to-terracotta-50/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,hsl(var(--sage-100)/0.4)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-sage-200/50 p-8 md:p-10 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                  <div className="flex-1">
                    <span className="inline-flex items-center gap-2 mb-5 rounded-full bg-sage-100 border border-sage-200 px-4 py-1.5 text-xs font-medium text-sage-700 tracking-wider uppercase">
                      <Users className="h-3.5 w-3.5" />
                      Groepstraining
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3 leading-tight">
                      Liever samen groeien?
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-5 max-w-md">
                      De 8-weekse MSC groepstraining biedt dezelfde wetenschappelijk onderbouwde basis — in de kracht van een groep.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-sage-500" />
                        8 weken · september 2026
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-terracotta-500" />
                        Early bird t/m 1 aug
                      </span>
                    </div>
                    <Link
                      to="/msc-training"
                      className="inline-flex items-center gap-2 bg-sage-600 text-white h-10 px-6 rounded-full text-sm font-semibold hover:bg-sage-700 transition-colors shadow-sm group"
                    >
                      Bekijk de groepstraining
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                  <div className="hidden md:flex flex-col items-center justify-center w-40 h-40 rounded-2xl bg-gradient-to-br from-sage-50 to-warm-50 border border-sage-200/60">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Vanaf</p>
                    <p className="text-3xl font-serif font-light text-terracotta-600">€495</p>
                    <p className="text-xs text-muted-foreground mt-1">early bird</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 md:px-10 relative">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <Leaf className="h-6 w-6 text-primary-foreground/40 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                Klaar voor meer rust?
              </h2>
              <p className="text-primary-foreground/75 text-lg mb-10 leading-relaxed max-w-md mx-auto">
                Plan een gratis en vrijblijvend kennismakingsgesprek. We verkennen samen wat bij jou past.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-primary-foreground text-primary h-12 px-10 rounded-full font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity shadow-lg"
              >
                Plan een kennismaking
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndividueelHome;
