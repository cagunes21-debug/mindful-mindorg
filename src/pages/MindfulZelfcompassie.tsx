import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Sparkles, ArrowRight, Check, Mail, Phone, MessageCircle, Clock, Users, Globe, Calendar, Quote, Star, Leaf, HelpCircle, Award, TrendingUp, FlaskConical } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { CourseSchema, OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { ContactForm } from "@/components/ContactForm";
import UrgencyBadge from "@/components/UrgencyBadge";
import { RegistrationForm } from "@/components/RegistrationForm";

const trainingDates = [
  {
    language: "English",
    day: "Wednesday (evening)",
    startDate: "22 April 2026",
    time: "19:00 – 21:00",
    dates: "Follow-up: 29 Apr, 6, 13, 20, 27 May, 3, 10 Jun",
    price: "€550",
  },
  {
    language: "Nederlands",
    day: "Maandag (avond)",
    startDate: "28 september 2026",
    time: "19:00 – 21:00",
    dates: "Vervolgdata: 5, 12, 26 okt, 2, 9, 16, 23, 30 nov",
    price: "€550",
    earlyBirdPrice: "€495",
    earlyBirdDeadline: "1 augustus 2026",
  },
];

const MindfulZelfcompassie = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<typeof trainingDates[0] | null>(null);

  const openRegistration = (training: typeof trainingDates[0]) => {
    setSelectedTraining(training);
    setIsRegistrationOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="8-weekse MSC Groepstraining | Mindful Mind"
        description="Leer jezelf ondersteunen in een kleine groep. 8-weekse Mindful Self-Compassion training, wetenschappelijk onderbouwd. Start september 2026."
      />
      <OrganizationSchema />
      <CourseSchema
        name="8-weekse Mindful Self-Compassion (MSC) Groepstraining"
        description="Leer in 8 weken omgaan met stress, emoties en zelfkritiek in een veilige groepssetting."
        duration="8 weeks"
        price="550"
      />
      <Navigation />

      {/* Hero — compact, product-focused */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-warm-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full bg-sage-100 border border-sage-200 px-5 py-2 text-xs font-semibold text-sage-700 tracking-wider uppercase"
            >
              <Users className="h-3.5 w-3.5" />
              8-weekse Groepstraining
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.15]"
            >
              Jouw welzijn begint
              <span className="block font-serif italic text-terracotta-600 mt-2 text-[1.05em]">
                bij hoe je met jezelf omgaat
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10"
            >
              Leer jezelf ondersteunen — juist wanneer het moeilijk is — samen met anderen in een veilige, kleine groep.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg">
                <Link to="/agenda">
                  Bekijk de startdata
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Quick specs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mt-10"
            >
              {[
                { icon: Clock, label: "8 weken · 2 uur/sessie" },
                { icon: Globe, label: "100% live online" },
                { icon: Users, label: "Max 12 deelnemers" },
                { icon: Sparkles, label: "Vanaf €495 early bird" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground text-sm bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                  <item.icon className="h-4 w-4 text-terracotta-500" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="py-8 bg-white border-b border-warm-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="h-4 w-4 text-terracotta-500" />
                <span className="text-2xl lg:text-3xl font-light text-foreground">200+</span>
              </div>
              <p className="text-xs text-muted-foreground">deelnemers begeleid</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="h-4 w-4 text-terracotta-500 fill-terracotta-500" />
                <span className="text-2xl lg:text-3xl font-light text-foreground">4.9/5</span>
              </div>
              <p className="text-xs text-muted-foreground">gemiddelde beoordeling</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Award className="h-4 w-4 text-terracotta-500" />
                <span className="text-2xl lg:text-3xl font-light text-foreground">MSC</span>
              </div>
              <p className="text-xs text-muted-foreground">gecertificeerde trainer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Waarom Mindful Zelfcompassie */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className="text-2xl font-light text-foreground md:text-3xl leading-tight mb-6">
                Waarom <span className="font-serif italic text-terracotta-600">Mindful Zelfcompassie?</span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
                <p>
                  De meeste mensen zijn strenger voor zichzelf dan voor wie dan ook. Zelfkritiek voelt misschien als motivatie, maar onderzoek laat het tegenovergestelde zien: het vergroot stress, ondermijnt veerkracht en put je uit.
                </p>
                <p>
                  Mindful Self-Compassion (MSC) biedt een bewezen alternatief. Ontwikkeld door dr. Kristin Neff en dr. Christopher Germer, leer je om met vriendelijkheid en begrip op jezelf te reageren — juist wanneer het moeilijk is. Niet als luxe, maar als fundament voor je welzijn.
                </p>
                <p>
                  In deze 8-weekse groepstraining oefen je dat samen: in een kleine, veilige groep waar je leert van elkaars ervaringen en ontdekt hoe je jezelf kunt ondersteunen zoals je een goede vriend(in) zou ondersteunen.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/mindful-self-compassion"
                  className="inline-flex items-center gap-2 text-sage-600 text-sm hover:text-sage-700 transition-colors"
                >
                  Meer over de MSC-methodiek
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wat je leert in 8 weken */}
      <section className="py-20 lg:py-28 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  Het Programma
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat je leert in <span className="font-serif italic text-terracotta-600">8 weken</span>
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
              {[
                { emoji: "🌿", title: "Basis van zelfcompassie", desc: "Ontdek de drie kerncomponenten" },
                { emoji: "💛", title: "Vriendelijkheid voor jezelf", desc: "Leer je innerlijke criticus kalmeren" },
                { emoji: "🎭", title: "Omgaan met moeilijke emoties", desc: "Veerkracht opbouwen van binnenuit" },
                { emoji: "🌊", title: "Leven vanuit je waarden", desc: "Keuzes maken die bij je passen" },
                { emoji: "✨", title: "Dankbaarheid & zelfwaardering", desc: "Het goede in jezelf erkennen" },
                { emoji: "🤝", title: "De kracht van de groep", desc: "Leren van elkaars ervaringen" },
              ].map((theme, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 border border-warm-100 shadow-sm">
                    <span className="text-xl flex-shrink-0 mt-0.5">{theme.emoji}</span>
                    <div>
                      <span className="text-foreground text-sm font-medium block">{theme.title}</span>
                      <span className="text-muted-foreground text-xs">{theme.desc}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal delay={0.2}>
              <div className="text-center">
              <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-6 text-base shadow-md">
                  <Link to="/agenda">
                    Bekijk de startdata
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Voor wie */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  Voor Jou
                </span>
                <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Herken je jezelf <span className="font-serif italic text-terracotta-600">hierin?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Deze groepstraining is voor jou als je merkt dat je:
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-10">
                {[
                  { text: "Streng bent voor jezelf", icon: "🌿" },
                  { text: "Perfectionistisch bent", icon: "📏" },
                  { text: "Moeite hebt met emoties", icon: "💭" },
                  { text: "Meer balans zoekt", icon: "🪞" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-warm-50 border border-warm-200 text-center">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-foreground text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Praktische info */}
      <section className="py-20 lg:py-28 bg-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  Praktisch
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat je kunt <span className="font-serif italic text-terracotta-600">verwachten</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { label: "Format", value: "100% live online" },
                  { label: "Duur", value: "8 weken + retreat" },
                  { label: "Per sessie", value: "2 uur" },
                  { label: "Taal", value: "NL / EN" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-5 rounded-xl bg-white border border-sage-200 shadow-sm">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-sage-200">
                <h3 className="text-lg font-medium text-foreground mb-4">Elke sessie bevat:</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Korte theorie over het thema",
                    "Geleide meditaties en oefeningen",
                    "Uitwisseling in de groep",
                    "Thuisopdrachten en audiomeditaties",
                    "Halve-dagretraite (dag 5)",
                    "Trauma-sensitieve begeleiding",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="h-4 w-4 text-sage-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Resultaten */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  <FlaskConical className="h-3.5 w-3.5" />
                  Wetenschappelijk bewezen
                </span>
                <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat MSC deelnemers <span className="font-serif italic text-terracotta-600">ervaren</span>
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { text: "Meer rust", icon: Brain, stat: "↓ 36%", statLabel: "stress", color: "terracotta" },
                { text: "Meer veerkracht", icon: Heart, stat: "↑ 42%", statLabel: "coping", color: "sage" },
                { text: "Minder stress", icon: Leaf, stat: "↓ 43%", statLabel: "angst", color: "terracotta" },
                { text: "Minder zelfkritiek", icon: Sparkles, stat: "↑ 67%", statLabel: "zelfcompassie", color: "sage" },
                { text: "Betere grenzen", icon: Award, stat: "↑ 38%", statLabel: "zelfzorg", color: "terracotta" },
                { text: "Meer verbinding", icon: Users, stat: "↑ 29%", statLabel: "verbondenheid", color: "sage" },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <StaggerItem key={index}>
                    <div className="text-center p-4 rounded-2xl bg-warm-50 border border-warm-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`h-10 w-10 mx-auto rounded-xl ${item.color === 'terracotta' ? 'bg-terracotta-100' : 'bg-sage-100'} flex items-center justify-center mb-3`}>
                        <IconComponent className={`h-5 w-5 ${item.color === 'terracotta' ? 'text-terracotta-600' : 'text-sage-600'}`} />
                      </div>
                      <h3 className="text-sm font-medium text-foreground mb-1">{item.text}</h3>
                      <div className={`text-lg font-bold ${item.color === 'terracotta' ? 'text-terracotta-600' : 'text-sage-600'}`}>
                        {item.stat}
                      </div>
                      <p className="text-[10px] text-muted-foreground">{item.statLabel}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  <Heart className="h-3.5 w-3.5" />
                  Ervaringen
                </span>
                <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat deelnemers <span className="font-serif italic text-terracotta-600">zeggen</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })]}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {[
                    { quote: "Deze training heeft mijn relatie met mezelf volledig veranderd. Ik ben nu veel milder voor mezelf.", name: "Marieke", role: "Deelnemer voorjaar 2025" },
                    { quote: "Eindelijk begrijp ik dat zelfcompassie geen zwakte is, maar juist kracht geeft.", name: "Thomas", role: "Deelnemer najaar 2024" },
                    { quote: "De veilige sfeer in de groep maakte het mogelijk om echt open te zijn. Transformerend.", name: "Sandra", role: "Deelnemer zomer 2025" },
                    { quote: "De combinatie van theorie en oefening maakt het zo krachtig. Ik gebruik de meditaties nog dagelijks.", name: "Floor", role: "Deelnemer voorjaar 2025" },
                  ].map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2">
                      <Card className="border-warm-200 bg-white rounded-2xl h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-terracotta-400 fill-terracotta-400" />
                            ))}
                          </div>
                          <p className="text-muted-foreground leading-relaxed flex-grow mb-5 italic">
                            "{testimonial.quote}"
                          </p>
                          <div className="flex items-center gap-3 pt-4 border-t border-warm-200">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-terracotta-200 to-terracotta-300 flex items-center justify-center text-white font-semibold text-sm">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-6">
                  <CarouselPrevious className="relative static translate-y-0 bg-white border-warm-200 hover:bg-terracotta-50" />
                  <CarouselNext className="relative static translate-y-0 bg-white border-warm-200 hover:bg-terracotta-50" />
                </div>
              </Carousel>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA naar agenda */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <h2 className="text-2xl font-light text-foreground md:text-3xl leading-tight mb-4">
                Klaar om te <span className="font-serif italic text-terracotta-600">beginnen?</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Bekijk de beschikbare startdata en meld je aan voor de groepstraining.
              </p>
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg">
                <Link to="/agenda">
                  Bekijk startdata & aanmelden
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-muted-foreground text-sm mt-6">
                Liever individuele begeleiding?{" "}
                <Link to="/" className="text-terracotta-600 hover:text-terracotta-700 font-medium">
                  Bekijk het individueel traject →
                </Link>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 border border-sage-200 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  <HelpCircle className="h-3.5 w-3.5" />
                  FAQ
                </span>
                <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Veelgestelde <span className="font-serif italic text-terracotta-600">vragen</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  { q: "Heb ik ervaring nodig met meditatie?", a: "Nee, geen ervaring nodig. We beginnen bij de basis en bouwen stap voor stap op." },
                  { q: "Wat als ik een sessie mis?", a: "Alle sessies worden opgenomen en zijn beschikbaar in de online leeromgeving. Je kunt de inhoud op je eigen tempo terugkijken." },
                  { q: "Is de training geschikt bij trauma?", a: "De training heeft een trauma-sensitieve benadering. Bij ernstige trauma's adviseren we eerst individuele begeleiding. Neem gerust contact op om te bespreken wat het beste past." },
                  { q: "Hoeveel tijd kost het per week?", a: "Naast de wekelijkse sessie van 2 uur, is het aan te raden om dagelijks 20-30 minuten te oefenen. De oefeningen zijn ook in kortere versies beschikbaar." },
                  { q: "Kan ik in termijnen betalen?", a: "Ja, betalen in termijnen is mogelijk. Neem contact op om de mogelijkheden te bespreken." },
                ].map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border border-warm-200 rounded-xl px-6 bg-white shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <span className="inline-flex items-center gap-2 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                    <Mail className="h-3.5 w-3.5" />
                    Contact
                  </span>
                  <h2 className="text-3xl font-light text-foreground mb-4 md:text-4xl leading-tight">
                    Heb je een <span className="font-serif italic text-terracotta-600">vraag?</span>
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Neem gerust contact op. We reageren meestal binnen 24 uur.
                  </p>
                  <div className="space-y-4">
                    <a href="mailto:mindful-mind@outlook.com" className="flex items-center gap-3 text-muted-foreground hover:text-terracotta-600 transition-colors">
                      <Mail className="h-5 w-5 text-terracotta-500" />
                      mindful-mind@outlook.com
                    </a>
                    <a href="tel:+31625633379" className="flex items-center gap-3 text-muted-foreground hover:text-terracotta-600 transition-colors">
                      <Phone className="h-5 w-5 text-terracotta-500" />
                      +31 6 25633379
                    </a>
                    <a href="https://wa.me/31625633379" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-terracotta-600 transition-colors">
                      <MessageCircle className="h-5 w-5 text-terracotta-500" />
                      WhatsApp
                    </a>
                  </div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-3">
                <ScrollReveal delay={0.1}>
                  <div className="bg-warm-50 rounded-3xl p-8 border border-warm-200">
                    <ContactForm />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Registration Modal */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">
              Aanmelden voor de groepstraining
            </DialogTitle>
          </DialogHeader>
          {selectedTraining && (
            <RegistrationForm
              trainingName={`8-weekse MSC Groepstraining (${selectedTraining.language})`}
              trainingDate={selectedTraining.startDate}
              trainingTime={selectedTraining.time}
              price={selectedTraining.price}
              onSuccess={() => {
                setTimeout(() => setIsRegistrationOpen(false), 2000);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MindfulZelfcompassie;
