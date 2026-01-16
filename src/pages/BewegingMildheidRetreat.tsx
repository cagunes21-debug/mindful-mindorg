import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Check, Calendar, MapPin, Euro, Users, Sun, MessageSquareQuote, Sparkles, Music, Move } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/StructuredData";
import retreatHero from "@/assets/retreat-hero.jpg";
import retreatLocation from "@/assets/retreat-location.jpg";
import retreatMeditation from "@/assets/retreat-meditation.jpg";
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
    title: "Zachtheid naar jezelf",
    description: "Ontdek hoe mildheid voelt, niet alleen hoe het klinkt",
  },
  {
    icon: Move,
    title: "Beweging vanuit het lichaam",
    description: "Je volgt geen passen — je volgt jezelf",
  },
  {
    icon: Sparkles,
    title: "Plezier en levendigheid",
    description: "Geef ruimte aan wat lang is weggestopt",
  },
  {
    icon: Music,
    title: "Vrije dans als expressie",
    description: "Zacht, speels en uitnodigend — soms klein, soms vrij",
  },
];

const whatHappens = [
  "Je adem verdiept",
  "Je schouders zakken",
  "Emoties mogen bewegen",
  "Energie begint weer te stromen",
];

const fiveDaysFor = [
  "Vertragen en uit je hoofd zakken",
  "Leren luisteren naar je lichaam",
  "Ontdekken hoe mildheid voelt",
  "Plezier en levendigheid weer ruimte geven",
  "Iets meenemen dat blijvend is",
];

const forWho = [
  "Vaak streng bent voor jezelf",
  "Spanning of stress in je lichaam ervaart",
  "Verlangt naar meer zachtheid én levenslust",
  "Voelt dat praten alleen niet genoeg is",
  "Nieuwsgierig bent naar een andere manier",
];

const practicalInfo = [
  {
    icon: Calendar,
    title: "Data",
    details: "2026 (5 dagen)",
  },
  {
    icon: MapPin,
    title: "Locatie",
    details: "Sfeervolle retreat locatie",
  },
  {
    icon: Euro,
    title: "Investering",
    details: "Inclusief verblijf, maaltijden en programma",
  },
  {
    icon: Users,
    title: "Groepsgrootte",
    details: "Kleine groep voor veiligheid en aandacht",
  },
];

const included = [
  "5 overnachtingen",
  "Alle vegetarische maaltijden en snacks",
  "Volledig begeleid MSC & bewegingsprogramma",
  "Materialen en werkboek",
  "Toegang tot de ruimtes en natuur",
  "Persoonlijke begeleiding waar nodig",
];

const notIncluded = [
  "Reis naar en van de locatie",
  "Reisverzekering",
  "Persoonlijke uitgaven",
];

const testimonials = [
  {
    quote: "Ik wist niet dat het zo simpel mocht zijn.",
    author: "Deelnemer",
    role: "Retreat deelnemer",
  },
  {
    quote: "En toch voelde ik me veilig. Ik hoefde niks goed te doen. Mijn lijf wist ineens zelf wat het nodig had.",
    author: "Deelnemer",
    role: "Retreat deelnemer",
  },
  {
    quote: "Ik kwam met spanning en vertrok met een lichaam dat weer wist hoe te ademen.",
    author: "Deelnemer",
    role: "Retreat deelnemer",
  },
];

const faqItems = [
  {
    question: "Moet ik kunnen dansen?",
    answer: "Nee, absoluut niet. De beweging in deze retraite is zacht, speels en uitnodigend. Soms klein, soms vrij, soms bijna stil. Je volgt geen passen — je volgt jezelf. Bijna iedereen zegt achteraf: 'Ik voelde me veilig' en 'Ik hoefde niks goed te doen'.",
  },
  {
    question: "Voor wie is deze retraite geschikt?",
    answer: "Deze retraite is voor jou als je vaak streng bent voor jezelf, spanning of stress in je lichaam ervaart, verlangt naar meer zachtheid én levenslust, voelt dat praten alleen niet genoeg is, of nieuwsgierig bent naar een andere manier. Je hoeft niets te kunnen of te bewijzen.",
  },
  {
    question: "Moet ik ervaring hebben met meditatie of zelfcompassie?",
    answer: "Nee, ervaring is niet noodzakelijk. Alle oefeningen worden stap voor stap begeleid. Het belangrijkste is je openheid om te verkennen en te ervaren.",
  },
  {
    question: "Wat is Mindful Zelfcompassie (MSC)?",
    answer: "MSC helpt je om anders om te gaan met innerlijke kritiek, schaamte en moeilijke emoties. In deze retraite blijft het niet bij praten of begrijpen — je ervaart het in je lijf, in beweging, in stilte en in contact.",
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
    question: "Wat als ik moet annuleren?",
    answer: "Tot 8 weken voor aanvang kun je kosteloos annuleren. Tussen 8 en 4 weken is 50% verschuldigd. Binnen 4 weken is het volledige bedrag verschuldigd, tenzij je een vervanger vindt.",
  },
];

const BewegingMildheidRetreat = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="In Beweging met Mildheid | 5-daagse Retraite"
        description="Een 5-daagse retraite in Mindful Zelfcompassie, beweging & dans. Kom weer in beweging — van binnenuit. Stop met vechten en ontdek zachtheid."
      />
      <FAQSchema items={faqItems} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0">
          <img 
            src={retreatHero} 
            alt="Mediterrane kustlijn bij zonsondergang" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full bg-warm-100 border border-warm-200 px-5 py-2.5 text-sm font-medium text-warm-700"
            >
              <Sun className="h-4 w-4" />
              5 dagen • Mindful Zelfcompassie • Beweging
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
              5-daagse retraite in Mindful Zelfcompassie & beweging
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <Link to="/contact">
                  Meld je aan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Image */}
      <section className="py-0">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="rounded-3xl overflow-hidden shadow-2xl -mt-16 relative z-10">
                <img 
                  src={retreatLocation} 
                  alt="Retreat locatie" 
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                  Misschien herken je dit
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="prose prose-lg mx-auto text-center mb-12">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Je hoofd staat zelden stil.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Je bent vaak streng voor jezelf.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Je draagt veel — en gaat door.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Je wéét rationeel dat je liever voor jezelf zou willen zijn. Je hebt al veel gelezen, geprobeerd, geleerd.
                </p>
                <p className="text-foreground text-xl leading-relaxed font-medium">
                  En toch… in je lijf blijft spanning zitten.
                </p>
                <p className="text-foreground text-xl leading-relaxed font-medium">
                  Alsof er iets vast staat. Alsof jij vast staat.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="border-0 bg-gradient-to-br from-warm-50 to-terracotta-50 rounded-3xl shadow-lg mb-12">
                <CardContent className="p-8 md:p-10 text-center">
                  <p className="text-xl text-foreground leading-relaxed mb-4">
                    Wat als het probleem niet is dat je te weinig je best doet…
                  </p>
                  <p className="text-2xl text-terracotta-700 font-medium italic">
                    … maar dat je al veel te lang te hard bent voor jezelf?
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="prose prose-lg mx-auto text-center">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Veel mensen die naar deze retraite komen, zijn sterk, zorgzaam en gewend om door te gaan. 
                  Ze hebben geleerd om te functioneren. Maar niet altijd om te luisteren.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Naar hun lichaam. Naar vermoeidheid. Naar dat stille verlangen naar zachtheid en ruimte.
                </p>
                <p className="text-foreground text-lg leading-relaxed font-medium">
                  En daar begint dit verhaal.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Different Approach */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Een andere ingang
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Niet nóg een methode. <span className="font-serif italic text-terracotta-600">Niet nóg een "je moet dit anders doen".</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="prose prose-lg mx-auto text-center mb-12">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Maar een plek waar je mag landen. Waar niets hoeft te worden opgelost.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Waar beweging weer iets natuurlijks mag zijn — geen prestatie, maar een reactie van het lichaam zelf.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="border-0 bg-white rounded-3xl shadow-lg mb-12">
                <CardContent className="p-8 md:p-10 text-center">
                  <p className="text-xl text-foreground leading-relaxed mb-4">
                    <strong>In Beweging met Mildheid</strong> is een 5-daagse retraite waarin je stap voor stap terugkeert naar jezelf.
                  </p>
                  <p className="text-lg text-terracotta-700 font-medium italic">
                    Met Mindful Zelfcompassie (MSC) als veilige bedding<br />
                    en vrije beweging als taal van het lichaam.
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

      {/* Dance Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <img 
                    src={retreatMeditation} 
                    alt="Beweging en meditatie" 
                    className="w-full h-80 md:h-96 object-cover"
                  />
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.2}>
                <div>
                  <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                    "Maar dansen… dat is niets voor mij"
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    Dat horen we <span className="font-serif italic text-terracotta-600">vaak</span>
                  </h2>
                  <div className="prose prose-lg mb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      En bijna altijd volgt daarna:
                    </p>
                  </div>
                  <Card className="border-0 bg-gradient-to-br from-warm-50 to-terracotta-50 rounded-2xl shadow-md mb-6">
                    <CardContent className="p-6">
                      <p className="text-foreground italic">"En toch voelde ik me veilig."</p>
                      <p className="text-foreground italic">"Ik hoefde niks goed te doen."</p>
                      <p className="text-foreground italic">"Mijn lijf wist ineens zelf wat het nodig had."</p>
                    </CardContent>
                  </Card>
                  <div className="prose prose-lg">
                    <p className="text-muted-foreground leading-relaxed">
                      De beweging in deze retraite is zacht, speels en uitnodigend. Soms klein. Soms vrij. Soms bijna stil. 
                      <strong className="text-foreground"> Je volgt geen passen — je volgt jezelf.</strong>
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What happens when you stop fighting */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-warm-100 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-6">
                  Wat er gebeurt als je stopt met vechten
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wanneer je jezelf met mildheid ontmoet, gebeurt er iets <span className="font-serif italic text-terracotta-600">onverwachts</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {whatHappens.map((result, index) => (
                  <div key={index} className="flex items-center gap-3 p-5 rounded-xl bg-white border border-warm-200 shadow-sm">
                    <Check className="h-5 w-5 text-terracotta-600 flex-shrink-0" />
                    <span className="text-foreground">{result}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="prose prose-lg mx-auto text-center">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Niet omdat je dat forceert, maar omdat je het toestaat.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Mindful Zelfcompassie helpt je om anders om te gaan met innerlijke kritiek, schaamte en moeilijke emoties.
                </p>
                <p className="text-foreground text-lg leading-relaxed font-medium">
                  In deze retraite blijft het niet bij praten of begrijpen. Je ervaart het — in je lijf, in beweging, in stilte en in contact.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Five Days For You */}
      <section id="programma" className="py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Vijf dagen voor jou
                </span>
                <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Vijf dagen waarin <span className="font-serif italic text-terracotta-600">je</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {fiveDaysFor.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-warm-50 border border-warm-200">
                    <Check className="h-5 w-5 text-sage-600 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="border-0 bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl shadow-lg">
                <CardContent className="p-8 text-center">
                  <p className="text-lg text-foreground italic">
                    Veel deelnemers zeggen achteraf: "Ik wist niet dat het zo simpel mocht zijn."
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* For Who */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-warm-100 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-6">
                  Voor wie dit klopt
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Deze retraite is voor jou <span className="font-serif italic text-terracotta-600">als je</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {forWho.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-5 rounded-xl bg-white border border-warm-200 shadow-sm">
                    <Check className="h-5 w-5 text-terracotta-600 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="border-0 bg-white rounded-3xl shadow-lg">
                <CardContent className="p-8 text-center">
                  <p className="text-xl text-foreground leading-relaxed mb-2">
                    Je hoeft niets te kunnen.
                  </p>
                  <p className="text-xl text-foreground leading-relaxed mb-2">
                    Je hoeft niets te bewijzen.
                  </p>
                  <p className="text-xl text-terracotta-700 font-medium">
                    Je hoeft alleen te verschijnen.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Practical Information */}
      <section className="py-20 lg:py-24 bg-white">
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
                  <Card className="border-0 bg-warm-50 rounded-2xl shadow-md text-center h-full">
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
      <section className="py-20 lg:py-24 bg-warm-50">
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
                    <Card className="border-0 bg-white rounded-3xl shadow-lg">
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
      <section className="py-20 lg:py-24 bg-white">
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
                    className="border border-warm-200 rounded-xl px-6 bg-warm-50"
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

      {/* Invitation Section */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <Card className="border-0 bg-white rounded-3xl shadow-lg">
                <CardContent className="p-8 md:p-12 text-center">
                  <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                    Een uitnodiging
                  </span>
                  <h2 className="mb-6 text-2xl font-light text-foreground md:text-3xl leading-tight">
                    Misschien lees je dit en voel je een kleine <span className="font-serif italic text-terracotta-600">ja</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    Geen groot vuurwerk. Meer een zacht weten.
                  </p>
                  <p className="text-foreground text-xl font-medium mb-8">
                    Als dat zo is, dan ben je welkom.
                  </p>
                  <div className="space-y-2 text-lg text-muted-foreground mb-8">
                    <p>👉 Kom vijf dagen thuiskomen in je lichaam.</p>
                    <p>👉 Kom weer in beweging — van binnenuit.</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-terracotta-200 text-sm font-medium mb-4">
              In Beweging met Mildheid
            </span>
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
              Mindful Zelfcompassie • Beweging • Dans
            </h2>
            <p className="text-terracotta-100 text-lg mb-8">
              Vijf dagen thuiskomen in je lichaam. Vijf dagen in beweging — van binnenuit.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <Link to="/contact">
                  Meld je aan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 border-2 border-white text-white hover:bg-white/30 rounded-full px-8">
                <Link to="/contact">
                  Lees meer
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

export default BewegingMildheidRetreat;
