import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Check, Calendar, Clock, MapPin, Euro, Users, Sun, Sunrise, Moon, Coffee, MessageSquareQuote, Sparkles, Shield, Compass } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/StructuredData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const retreatBenefits = [
  {
    icon: Heart,
    title: "Meer emotionele veerkracht",
    description: "Leer om te gaan met moeilijke emoties op een gezonde manier",
  },
  {
    icon: Sparkles,
    title: "Minder zelfkritiek, meer mildheid",
    description: "Vervang je innerlijke criticus door een milde, ondersteunende stem",
  },
  {
    icon: Shield,
    title: "Sterkere grenzen en betere zelfzorg",
    description: "Leer voor jezelf zorgen zonder schuldgevoel",
  },
  {
    icon: Compass,
    title: "Een diepere verbinding met jezelf",
    description: "Herontdek wie je werkelijk bent, voorbij alle rollen en verwachtingen",
  },
];

const whatYouLearn = [
  "Bewust omgaan met stress, pijn en zelfkritiek",
  "Jezelf ondersteunen met compassie in plaats van oordeel",
  "Innerlijke rust, stabiliteit en veerkracht ontwikkelen",
  "Verbinding ervaren — met jezelf én met anderen",
];

const takeHomeResults = [
  "Meer innerlijke rust en helderheid",
  "Een zachtere, mildere houding naar jezelf",
  "Praktische tools om compassie te integreren in je dagelijks leven",
  "Een diepe ervaring van verbondenheid en aanwezigheid",
];

const dailyProgram = [
  {
    icon: Sunrise,
    time: "07:30 - 08:30",
    title: "Ochtendbeoefening",
    description: "Zachte beweging, ademwerk en meditatie om de dag te beginnen",
  },
  {
    icon: Coffee,
    time: "08:30 - 09:30",
    title: "Ontbijt",
    description: "Gezond, vegetarisch ontbijt in stilte of zachte conversatie",
  },
  {
    icon: Sun,
    time: "10:00 - 12:30",
    title: "Ochtendsessie",
    description: "Mindfulness- en zelfcompassieoefeningen, reflectie en delen",
  },
  {
    icon: Coffee,
    time: "12:30 - 14:30",
    title: "Lunch & Vrije tijd",
    description: "Voedzame maaltijd gevolgd door rusttijd in de natuur",
  },
  {
    icon: Heart,
    time: "14:30 - 17:00",
    title: "Middagsessie",
    description: "Verdiepende oefeningen, wandelmeditatie of creatieve expressie",
  },
  {
    icon: Moon,
    time: "19:00 - 21:00",
    title: "Avondprogramma",
    description: "Diner gevolgd door zachte avondbeoefening of vrije tijd",
  },
];

const practicalInfo = [
  {
    icon: Calendar,
    title: "Data",
    details: "Juni 2026 (5 dagen)",
  },
  {
    icon: MapPin,
    title: "Locatie",
    details: "Casa del Mar, Spanje",
  },
  {
    icon: Euro,
    title: "Investering",
    details: "Inclusief verblijf, maaltijden en programma",
  },
  {
    icon: Users,
    title: "Groepsgrootte",
    details: "Kleine groep voor persoonlijke aandacht",
  },
];

const included = [
  "5 overnachtingen in een sfeervolle kamer",
  "Alle vegetarische maaltijden en snacks",
  "Volledig begeleid MSC programma",
  "Materialen en werkboek",
  "Toegang tot de tuinen en natuurgebied",
  "Persoonlijke begeleiding waar nodig",
];

const notIncluded = [
  "Reis naar en van Spanje",
  "Reisverzekering",
  "Persoonlijke uitgaven",
];

const testimonials = [
  {
    quote: "Deze retreat was precies wat ik nodig had. De combinatie van stilte, natuur en liefdevolle begeleiding heeft me diep geraakt.",
    author: "Marloes",
    role: "Retreat deelnemer",
  },
  {
    quote: "Ik kwam uitgeput aan en vertrok met een gevoel van rust en helderheid dat ik in jaren niet had ervaren.",
    author: "Peter",
    role: "Retreat deelnemer",
  },
  {
    quote: "De locatie was adembenemend en de trainers creëerden een sfeer van veiligheid en warmte. Een transformerende ervaring.",
    author: "Linda",
    role: "Retreat deelnemer",
  },
];

const faqItems = [
  {
    question: "Voor wie is deze retraite geschikt?",
    answer: "De retraite is geschikt voor iedereen die behoefte heeft aan vertraging, verdieping en verbinding met zichzelf. Zowel beginners als mensen met ervaring in mindfulness of zelfcompassie zijn welkom. We werken met een trauma-sensitieve benadering.",
  },
  {
    question: "Moet ik ervaring hebben met meditatie?",
    answer: "Nee, ervaring is niet noodzakelijk. Alle oefeningen worden stap voor stap begeleid en aangepast aan jouw niveau. Het belangrijkste is je openheid om te verkennen.",
  },
  {
    question: "Hoe zit het met de stilte?",
    answer: "We wisselen periodes van stilte af met momenten van delen en verbinding. Stilte is een uitnodiging, geen verplichting. Je kunt altijd contact opnemen met de trainers als dat nodig is.",
  },
  {
    question: "Wat als ik alleen reis?",
    answer: "De meeste deelnemers komen alleen. Je zult merken dat er snel een gevoel van verbondenheid ontstaat in de groep. We zorgen voor een veilige en gastvrije sfeer.",
  },
  {
    question: "Zijn er dieetopties beschikbaar?",
    answer: "Ja, alle maaltijden zijn vegetarisch. We kunnen rekening houden met allergieën en dieetbehoeften. Geef dit bij aanmelding door.",
  },
  {
    question: "Hoe reis ik naar de locatie?",
    answer: "Details over de locatie en reismogelijkheden ontvang je na aanmelding. We kunnen helpen met het organiseren van gezamenlijk vervoer.",
  },
  {
    question: "Wat als ik moet annuleren?",
    answer: "Tot 8 weken voor aanvang kun je kosteloos annuleren. Tussen 8 en 4 weken is 50% verschuldigd. Binnen 4 weken is het volledige bedrag verschuldigd, tenzij je een vervanger vindt.",
  },
];

const BarcelonaRetreat = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Barcelona Retreat | 5-daagse Intensieve MSC Retraite"
        description="Kom thuis bij jezelf in Barcelona. Een reis van het hoofd naar het hart. 5-daagse Intensieve Mindful Zelfcompassie retraite in Casa del Mar, Spanje."
      />
      <FAQSchema items={faqItems} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/80 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-terracotta-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full bg-warm-100 border border-warm-200 px-5 py-2.5 text-sm font-medium text-warm-700"
            >
              <Sun className="h-4 w-4" />
              Juni 2026 • Casa del Mar, Spanje
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Kom thuis bij jezelf
              <span className="block font-serif italic text-terracotta-600 mt-2">in Barcelona</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl md:text-2xl text-foreground font-light mb-4"
            >
              Een reis van het hoofd naar het hart.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8"
            >
              5-daagse Intensieve Mindful Zelfcompassie (MSC) retraite
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <Link to="/contact">
                  Neem deel aan het programma
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What makes this retreat special */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                  Wat deze retraite bijzonder maakt
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Maak je opnieuw verbinding met <span className="font-serif italic text-terracotta-600">wat er echt toe doet</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="prose prose-lg mx-auto text-center mb-12">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Soms voel je dat het tijd is om te vertragen — om even tot rust te komen en op adem te komen.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Je hebt al zo lang je best gedaan: voor je werk, voor anderen, voor alles wat 'moet'.
                  En ergens diep vanbinnen ontstaat dat stille besef: <strong className="text-foreground">het mag zachter</strong>.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Je verlangt naar rust, naar ruimte, naar zachtheid voor jezelf.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="border-0 bg-gradient-to-br from-warm-50 to-terracotta-50 rounded-3xl shadow-lg mb-12">
                <CardContent className="p-8 md:p-10 text-center">
                  <p className="text-xl text-foreground leading-relaxed mb-4">
                    Tijdens deze vijfdaagse intensieve retraite leer je vertragen, ademen en jezelf met mildheid tegemoet treden.
                  </p>
                  <p className="text-lg text-terracotta-700 font-medium italic">
                    Een week waarin je niets hoeft te bewijzen.<br />
                    Een week waarin je thuiskomt bij jezelf.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {retreatBenefits.map((benefit, index) => (
                <StaggerItem key={index}>
                  <Card className="border-0 bg-white rounded-2xl shadow-md h-full">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-terracotta-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Wat kun je verwachten
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Een uitnodiging om vertraging, rust en <span className="font-serif italic text-terracotta-600">mildheid te ervaren</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="prose prose-lg mx-auto text-center mb-12">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Elke dag biedt een natuurlijke afwisseling van meditatie, reflectie, beweging, stilte en samenzijn, 
                  met voldoende ruimte voor ontspanning en rust.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Onder begeleiding van ervaren trainers verdiep je je in de kernprincipes van 
                  <strong className="text-foreground"> Mindful Self-Compassion (MSC)</strong>, ontwikkeld door dr. Kristin Neff en dr. Christopher Germer.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  De retraite is intensief, liefdevol en verdiepend. Je leert niet alleen technieken en theorie, 
                  maar <strong className="text-foreground">ervaart een nieuwe manier van omgaan met jezelf</strong> — met compassie, mildheid en aanwezigheid.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What you learn */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div>
                  <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                    Wat je leert
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    Vaardigheden voor het <span className="font-serif italic text-terracotta-600">leven</span>
                  </h2>
                  <div className="space-y-4">
                    {whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-sage-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.2}>
                <Card className="border-0 bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Waarom deze retraite?</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Deze retraite is een moment om jezelf opnieuw te leren kennen. 
                      Om te voelen wat echt belangrijk is. Om rust en zachtheid toe te laten in je dagelijks leven.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Hier leer je niet alleen technieken of theorie, maar <strong className="text-foreground">ervaar je een nieuwe manier 
                      van omgaan met jezelf</strong> — met compassie, mildheid en aanwezigheid.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What you take home */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-warm-100 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-6">
                  Wat je meeneemt naar huis
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Na deze vijf dagen keer je <span className="font-serif italic text-terracotta-600">terug met</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {takeHomeResults.map((result, index) => (
                  <div key={index} className="flex items-center gap-3 p-5 rounded-xl bg-white border border-warm-200 shadow-sm">
                    <Check className="h-5 w-5 text-terracotta-600 flex-shrink-0" />
                    <span className="text-foreground">{result}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Daily Program */}
      <section id="programma" className="py-20 lg:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Dagprogramma
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Een typische <span className="font-serif italic text-terracotta-600">retraitedag</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  We volgen een zacht ritme dat ruimte laat voor rust, oefening en vrije tijd. 
                  Alle onderdelen zijn uitnodigingen, geen verplichtingen.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dailyProgram.map((item, index) => (
                <StaggerItem key={index}>
                  <Card className="border-0 bg-warm-50 rounded-2xl shadow-md h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-terracotta-600" />
                        </div>
                        <span className="text-sm font-medium text-terracotta-600">{item.time}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Practical Information */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-warm-100 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-6">
                  Praktische informatie
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Alles wat je moet <span className="font-serif italic text-terracotta-600">weten</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {practicalInfo.map((info, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="border-0 bg-white rounded-2xl shadow-md text-center h-full">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mx-auto mb-4">
                        <info.icon className="h-6 w-6 text-sage-700" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                      <p className="text-sm text-muted-foreground">{info.details}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <ScrollReveal animation="fade-right">
                <Card className="border-0 bg-sage-50 rounded-2xl shadow-md h-full">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                      <Check className="h-5 w-5 text-sage-600" />
                      Inbegrepen
                    </h3>
                    <ul className="space-y-3">
                      {included.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-sage-600 flex-shrink-0 mt-1" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.1}>
                <Card className="border-0 bg-white rounded-2xl shadow-md h-full">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      Niet inbegrepen
                    </h3>
                    <ul className="space-y-3">
                      {notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="h-4 w-4 flex-shrink-0 mt-1 text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Ervaringen
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat eerdere deelnemers <span className="font-serif italic text-terracotta-600">zeggen</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <Carousel opts={{ loop: true }} className="max-w-3xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-0 bg-warm-50 rounded-3xl shadow-lg">
                      <CardContent className="p-8 md:p-12">
                        <MessageSquareQuote className="h-10 w-10 text-terracotta-300 mb-6" />
                        <blockquote className="text-xl text-foreground leading-relaxed mb-6">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <p className="font-medium text-foreground">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-warm-100 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-6">
                  Veelgestelde vragen
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Heb je nog <span className="font-serif italic text-terracotta-600">vragen?</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-warm-200 rounded-xl px-6 bg-white"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-terracotta-200 text-sm font-medium mb-4">
              Dit is jouw moment.
            </span>
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
              Gun jezelf deze reis van het hoofd naar het hart.
            </h2>
            <p className="text-terracotta-100 text-lg mb-4">
              Een paar dagen waarin je niets hoeft te bewijzen — alleen maar mag zijn.
            </p>
            <p className="text-white text-xl font-medium italic mb-8">
              Kom thuis bij jezelf. In rust, in zachtheid, in compassie.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <Link to="/contact">
                  Doe mee aan de retraite
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 border-2 border-white text-white hover:bg-white/30 rounded-full px-8">
                <Link to="/contact">
                  Reserveer je plek
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

export default BarcelonaRetreat;
