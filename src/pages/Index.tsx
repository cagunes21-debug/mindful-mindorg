import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Sparkles, ArrowRight, Check, Mail, Phone, MessageCircle, Clock, Users, Globe, Calendar, Quote, TrendingDown, TrendingUp, Shield, Zap, Mountain, Building2, MapPin, GraduationCap, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import heroMindfulness from "@/assets/hero-mindfulness.jpg";

const programs = [
  {
    title: "8-weekse MSC Training",
    subtitle: "online",
    icon: Globe,
    features: [
      "100% live, kleine groepen",
      "8 weken + optionele stilte-retreat",
      "2 uur per sessie, Nederlands of Engels",
      "Start: 16 feb 2026 (NL), 22 april 2026 (EN)",
    ],
    price: "€550",
    description: "Leer technieken om stress, zelfkritiek en moeilijke emoties te verzachten. Begeleid door een gecertificeerde MSC-trainer.",
    cta: "Reserveer je plek",
    link: "/mindful-zelfcompassie",
    highlight: true,
  },
  {
    title: "5-daagse MSC & Beweging Retreat",
    subtitle: "Barcelona",
    icon: Mountain,
    features: [
      "Inclusief overnachtingen & maaltijden",
      "Volledige MSC, mindfulness & bewegingsprogramma",
      "Kleine groep voor persoonlijke aandacht",
      "Vertragen, uit je hoofd zakken en mildheid ervaren",
    ],
    price: "2026",
    description: "Een diepe reis van je hoofd naar je hart.",
    cta: "Meld je aan voor de retreat",
    link: "/barcelona-retreat",
  },
  {
    title: "Workshops",
    subtitle: "laagdrempelig kennismaken",
    icon: Clock,
    features: [
      "1 uur, online of fysiek",
      "Praktische oefeningen om direct rust en mildheid te ervaren",
      "Laagdrempelig kennismaken met zelfcompassie en mindfulness",
    ],
    price: "€35",
    description: "",
    cta: "Bekijk workshops",
    link: "/agenda",
  },
  {
    title: "1-op-1 begeleiding",
    subtitle: "persoonlijke ondersteuning",
    icon: Heart,
    features: [
      "Individuele sessies online of op locatie",
      "Werken in jouw tempo aan persoonlijke thema's",
      "Perfect voor verdieping of specifieke uitdagingen",
    ],
    price: "Op aanvraag",
    description: "",
    cta: "Plan een 1-op-1 sessie",
    link: "/coaching",
  },
];

const stats = [
  { label: "stress", value: "36%", direction: "down" },
  { label: "veerkracht", value: "42%", direction: "up" },
  { label: "minder zelfkritiek", value: "67%", direction: "up" },
  { label: "betere grenzen", value: "38%", direction: "up" },
  { label: "meer verbinding", value: "29%", direction: "up" },
];

const testimonials = [
  {
    quote: "Deze training heeft mijn relatie met mezelf volledig veranderd. Ik ben nu veel milder voor mezelf en dat straalt uit naar alles om me heen.",
    author: "Marieke",
  },
  {
    quote: "Ik kwam met spanning en vertrok met een lichaam dat weer wist hoe te ademen.",
    author: "Retreat deelnemer",
  },
  {
    quote: "En toch voelde ik me veilig. Mijn lijf wist ineens zelf wat het nodig had.",
    author: "Retreat deelnemer",
  },
];

const targetAudience = [
  "Perfectionistisch of streng voor jezelf",
  "Moeilijke emoties of stress in je lichaam",
  "Zoekt balans, mildheid en levenslust",
  "Nieuwsgierig naar een andere manier van leren",
];

const methodPillars = [
  {
    title: "Mind",
    subtitle: "Je gedachten en emoties",
    icon: Brain,
    color: "terracotta",
    items: [
      "Leer vriendelijker en begripvoller naar jezelf te zijn",
      "Ontwikkel praktische vaardigheden om moeilijke emoties en zelfkritiek te verzachten",
    ],
  },
  {
    title: "Body",
    subtitle: "Je lichaam en energie",
    icon: Sparkles,
    color: "sage",
    items: [
      "Voel spanning en energie in je lichaam",
      "Leer luisteren naar je lichaam en jezelf ruimte te geven",
      "Vrije, zachte en speelse beweging tijdens retreats",
    ],
  },
  {
    title: "Heart",
    subtitle: "Je gevoelens en innerlijke rust",
    icon: Heart,
    color: "warm",
    items: [
      "Kom weer in contact met je emoties",
      "Ervaar mildheid, compassie en levenslust",
      "Leer met warmte naar jezelf en anderen te kijken",
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO 
        title="Mindful Mind | Kom thuis bij jezelf"
        description="Breng je mind, body & heart weer in balans. Onze programma's helpen je spanning los te laten, innerlijke rust te vinden en weer in contact te komen met jezelf."
      />
      <OrganizationSchema />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-44 bg-warm-50">
        <div className="absolute inset-0">
          <img 
            src={heroMindfulness} 
            alt="Mindfulness meditatie in de natuur" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-50/90 via-warm-50/80 to-warm-50/95" />
        </div>
        
        <div className="absolute top-20 left-10 w-64 h-64 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block rounded-full bg-terracotta-100/80 px-5 py-2 text-sm font-medium tracking-wide text-terracotta-700">
                Mind · Body · Heart
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-sage-100/80 px-4 py-1.5 text-xs font-medium tracking-wide text-sage-700">
                <GraduationCap className="h-3.5 w-3.5" />
                Wetenschappelijk onderbouwd door Dr. Kristin Neff & Dr. Christopher Germer
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl leading-[1.15]"
            >
              Kom thuis
              <span className="block font-serif italic text-terracotta-600 mt-3 text-[1.1em]">bij jezelf</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6"
            >
              Breng je mind, body & heart weer in balans
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Onze programma's helpen je spanning los te laten, innerlijke rust te vinden en weer in contact te komen met jezelf – je gedachten, je lichaam en je gevoelens.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg hover:shadow-xl transition-all">
                <a href="#programmas">
                  Reserveer je plek vandaag
                  <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-7 text-lg">
                <Link to="/bedrijven">
                  <Building2 className="mr-2 h-5 w-5" />
                  Voor Bedrijven
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Voel je je vaak <span className="font-serif italic text-terracotta-600">gespannen of streng</span> voor jezelf?
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Je hoofd staat nooit stil. Je probeert alles perfect te doen, bent kritisch op jezelf en blijft doorgaan, zelfs als het zwaar wordt. Je <em>wéét</em> dat je zachter voor jezelf zou willen zijn… maar in je lichaam blijft spanning achter.
                </p>
                <p>
                  Misschien heb je al veel geprobeerd: boeken gelezen, methodes gevolgd, advies opgevolgd… en toch blijft dat gevoel van stress, innerlijke kritiek of uitputting bestaan.
                </p>
                <div className="bg-terracotta-50 border-l-4 border-terracotta-400 rounded-r-xl p-6 my-8">
                  <p className="text-foreground font-medium">
                    Het probleem is niet dat je te weinig doet. Het probleem is dat je al te lang te hard bent voor jezelf. Daardoor lopen lichaam en geest vast.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-warm-50 border border-warm-200 rounded-2xl p-8 mt-10">
                <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                  Onze mind, body & heart-aanpak helpt je:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-terracotta-600" />
                    </div>
                    <span className="text-foreground">Stress te verminderen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-terracotta-600" />
                    </div>
                    <span className="text-foreground">Zelfkritiek los te laten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-terracotta-600" />
                    </div>
                    <span className="text-foreground">Je lichaam, je gevoelens en je innerlijke rust weer te voelen</span>
                  </li>
                </ul>
                <div className="text-center mt-8">
                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-6 text-base shadow-md">
                    <a href="#programmas">
                      Reserveer je plek vandaag
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Method Section - Mind, Body, Heart */}
      <section className="py-24 lg:py-32 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  Onze Methode
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Mind, body <span className="font-serif italic text-terracotta-600">& heart</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Onze programma's combineren Mindful Zelfcompassie (MSC), mindfulness en meditatie, met lichaamsbewustzijn en beweging. Samen werken ze op alle drie de lagen.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-3">
              {methodPillars.map((pillar, index) => (
                <StaggerItem key={index}>
                  <Card className="h-full bg-white border-warm-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-8">
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${
                        pillar.color === 'terracotta' ? 'bg-terracotta-100' : 
                        pillar.color === 'sage' ? 'bg-sage-100' : 'bg-warm-200'
                      }`}>
                        <pillar.icon className={`h-8 w-8 ${
                          pillar.color === 'terracotta' ? 'text-terracotta-600' : 
                          pillar.color === 'sage' ? 'text-sage-600' : 'text-warm-700'
                        }`} />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-2">{pillar.title}</h3>
                      <p className="text-terracotta-600 text-sm font-medium mb-6">{pillar.subtitle}</p>
                      <ul className="space-y-3 text-muted-foreground text-sm">
                        {pillar.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className={`h-4 w-4 mt-0.5 shrink-0 ${
                              pillar.color === 'terracotta' ? 'text-terracotta-500' : 
                              pillar.color === 'sage' ? 'text-sage-500' : 'text-warm-600'
                            }`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <ScrollReveal delay={0.2}>
              <p className="text-center text-muted-foreground text-lg mt-12 max-w-2xl mx-auto">
                Samen zorgen deze methodes voor meer rust, mildheid en veerkracht.
              </p>
              <div className="text-center mt-8">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-6">
                  <a href="#programmas">
                    Reserveer je plek
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programmas" className="py-24 lg:py-32 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  Ons Aanbod
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Onze <span className="font-serif italic text-terracotta-600">programma's</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-2">
              {programs.map((program, index) => (
                <StaggerItem key={index}>
                  <Card className={`h-full border-warm-200 shadow-sm hover:shadow-lg transition-all ${program.highlight ? 'ring-2 ring-terracotta-300 bg-gradient-to-br from-white to-terracotta-50' : 'bg-white'}`}>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${program.highlight ? 'bg-terracotta-500' : 'bg-terracotta-100'}`}>
                          <program.icon className={`h-7 w-7 ${program.highlight ? 'text-white' : 'text-terracotta-600'}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{program.title}</h3>
                          <p className="text-terracotta-600 text-sm font-medium">{program.subtitle}</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {program.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-terracotta-500 mt-0.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {program.description && (
                        <p className="text-muted-foreground text-sm mb-6">{program.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-light text-terracotta-600">{program.price}</span>
                        <Button asChild className={program.highlight ? 'bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full' : 'bg-terracotta-100 hover:bg-terracotta-200 text-terracotta-700 rounded-full'}>
                          <Link to={program.link}>
                            {program.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-terracotta-600 to-terracotta-700">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 mb-6">
                  <Award className="h-4 w-4" />
                  Wetenschappelijk bewezen resultaten
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Wat brengt dit je?
                </h2>
                <p className="text-white/70 text-base max-w-2xl mx-auto">
                  Mindful Zelfcompassie is ontwikkeld door Dr. Kristin Neff (pionier in zelfcompassie-onderzoek) en Dr. Christopher Germer (klinisch psycholoog), en onderbouwd door meer dan 3.500 wetenschappelijke studies.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-sm text-white/70">{stat.direction === 'down' ? '↓' : '↑'}</span>
                      <span className="text-3xl md:text-4xl font-light text-white">{stat.value}</span>
                    </div>
                    <p className="text-sm text-white/80">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            <ScrollReveal delay={0.3}>
              <p className="text-center text-white/60 text-sm mt-8">
                Gemiddelde resultaten uit peer-reviewed MSC-onderzoek (Neff & Germer, 2013–2023)
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 lg:py-32 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Voor wie is dit <span className="font-serif italic text-terracotta-600">geschikt?</span>
                </h2>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {targetAudience.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-5 shadow-sm border border-warm-200">
                    <Check className="h-5 w-5 text-terracotta-500 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  Ervaringen
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Ervaringen van <span className="font-serif italic text-terracotta-600">deelnemers</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <Card className="h-full bg-warm-50 border-warm-200">
                    <CardContent className="p-8">
                      <Quote className="h-8 w-8 text-terracotta-300 mb-4" />
                      <blockquote className="text-foreground text-lg leading-relaxed mb-6 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <footer className="text-sm font-medium text-terracotta-600">
                        — {testimonial.author}
                      </footer>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <ScrollReveal delay={0.2}>
              <div className="text-center mt-12">
                <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                  <Link to="/trainers">
                    Lees meer ervaringen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                Contact
              </span>
              <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                Praktisch & <span className="font-serif italic text-terracotta-600">Contact</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Workshops, 1-op-1 begeleiding, online training en retreat
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a 
                  href="mailto:mindful-mind@outlook.com" 
                  className="flex items-center gap-2 bg-white rounded-full px-6 py-3 text-muted-foreground hover:text-terracotta-600 transition-colors shadow-sm border border-warm-200"
                >
                  <Mail className="h-4 w-4" />
                  mindful-mind@outlook.com
                </a>
                <a 
                  href="https://wa.me/31625633379" 
                  className="flex items-center gap-2 bg-white rounded-full px-6 py-3 text-muted-foreground hover:text-terracotta-600 transition-colors shadow-sm border border-warm-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  +31 6 25633379 (WhatsApp)
                </a>
              </div>
              
              <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                <Link to="/agenda">
                  Bekijk volledige agenda
                  <Calendar className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-terracotta-600 to-terracotta-700">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Kom thuis bij jezelf
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Reserveer je plek vandaag.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-warm-100 rounded-full px-8">
                <Link to="/mindful-zelfcompassie">
                  Reserveer MSC Training
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                <Link to="/barcelona-retreat">
                  Meld je aan voor Retreat
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                <Link to="/agenda">
                  Bekijk Workshops
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                <Link to="/coaching">
                  1-op-1 begeleiding
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
