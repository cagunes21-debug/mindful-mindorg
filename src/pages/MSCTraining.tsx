import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Users, Calendar, Clock, CheckCircle2, Sparkles, ArrowRight, Check, MessageSquareQuote, Globe, MapPin, Mail, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { FAQSchema, CourseSchema } from "@/components/StructuredData";

const trainingDates = [
  {
    language: "Nederlands",
    day: "Maandag (avond)",
    startDate: "16 februari 2026",
    time: "19:00 – 21:00",
    dates: "Vervolgdata: 23 feb, 2, 9, 16, 23 mrt, 13, 20 apr, 4 mei",
    price: "€550",
  },
  {
    language: "Nederlands",
    day: "Zaterdag (middag)",
    startDate: "21 maart 2026",
    time: "15:00 – 17:00",
    dates: "Vervolgdata: 28 mrt, 4, 11, 18, 25 apr, 9, 16 mei",
    price: "€550",
  },
  {
    language: "English",
    day: "Sunday (afternoon)",
    startDate: "18 January 2026",
    time: "16:00 – 18:00",
    dates: "Vervolgdata: 25 Jan, 1, 8, 15, 22 Feb, 1, 8 Mar",
    price: "€550",
  },
  {
    language: "English",
    day: "Wednesday (evening)",
    startDate: "22 April 2026",
    time: "19:00 – 21:00",
    dates: "Vervolgdata: 29 Apr, 6, 13, 20, 27 May, 3, 10 Jun",
    price: "€550",
  },
];

const MSCTraining = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="8-weekse MSC Training | Mindful Zelfcompassie"
        description="Leer jezelf steunen in plaats van pushen. 8-weekse training in Mindful Zelfcompassie ontwikkeld door dr. Kristin Neff en dr. Christopher Germer."
      />
      <CourseSchema 
        name="8-weekse Mindful Self-Compassion (MSC) Training"
        description="Een wetenschappelijk onderbouwd programma waarin je leert omgaan met stress, emoties en zelfkritiek met meer vriendelijkheid en veerkracht."
        duration="8 weeks"
        price="550"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-28 lg:pt-32 lg:pb-36">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/80 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-terracotta-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-muted-foreground text-lg md:text-xl mb-4"
            >
              Jouw welzijn begint bij hoe je jezelf behandelt
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Kom thuis
              <span className="block font-serif italic text-terracotta-600 mt-2">bij jezelf!</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Sparkles className="h-4 w-4" />
              8-weekse training in Mindful Zelfcompassie
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Leer jezelf steunen in plaats van pushen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <a href="#programma">
                  Neem deel aan het programma
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waarom Mindful Zelfcompassie */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                  ONTDEK
                </span>
                <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Waarom <span className="font-serif italic text-terracotta-600">Mindful Zelfcompassie?</span>
                </h2>
              </div>
              <div className="text-muted-foreground text-lg leading-relaxed space-y-6">
                <p>
                  Veel mensen denken dat zelfkritiek helpt om scherp, gemotiveerd of succesvol te blijven.
                </p>
                <p>
                  Onderzoek laat echter zien dat zelfkritiek juist stress vergroot, je veerkracht ondermijnt en je op de lange termijn uitput.
                </p>
                <p className="text-xl font-light text-foreground">
                  Mindful Zelfcompassie biedt een bewezen alternatief: niet door minder betrokken te zijn, maar door met meer steun en begrip met jezelf om te gaan — juist wanneer het moeilijk is.
                </p>
              </div>
              <div className="text-center mt-10">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                  <a href="#programma">
                    Reserveer hier je plek
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wat is MSC */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  HET PROGRAMMA
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat is Mindful Zelfcompassie
                  <span className="block font-serif italic text-terracotta-600">(MSC)?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                  Mindful Zelfcompassie (MSC) is een wetenschappelijk onderbouwd 8-weeks programma, ontwikkeld door dr. Kristin Neff en dr. Christopher Germer.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p className="text-center text-foreground text-lg mb-8">In deze training leer je:</p>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2 mb-10">
              <StaggerItem>
                <Card className="border-terracotta-100 bg-gradient-to-br from-terracotta-50/50 to-white rounded-3xl h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200">
                      <Brain className="h-8 w-8 text-terracotta-600" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">Mindfulness</h3>
                    <p className="text-muted-foreground">
                      Bewust aanwezig te zijn bij wat je ervaart
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
              
              <StaggerItem>
                <Card className="border-warm-100 bg-gradient-to-br from-warm-50/50 to-white rounded-3xl h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-warm-100 to-warm-200">
                      <Heart className="h-8 w-8 text-warm-600" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">Zelfcompassie</h3>
                    <p className="text-muted-foreground">
                      Met vriendelijkheid, begrip en zorg op jezelf te reageren
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            </StaggerContainer>
            
            <ScrollReveal delay={0.2}>
              <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Je ontwikkelt praktische vaardigheden om met stress, moeilijke emoties en zelfkritiek om te gaan, met dezelfde steun en vriendelijkheid die een goede vriend(in) je zou geven.
              </p>
              <div className="text-center">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                  <a href="#programma">
                    Reserveer hier je plek
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Is deze training iets voor jou */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                  VOOR JOU
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Is deze training iets
                  <span className="block font-serif italic text-terracotta-600">voor jou?</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="text-muted-foreground text-lg leading-relaxed space-y-4 mb-10 max-w-2xl mx-auto">
                <p>
                  In de drukte van het leven raak je makkelijk jezelf kwijt.
                </p>
                <p>
                  Je bent er voor anderen, je zet door, je legt de lat hoog — maar jezelf zet je vaak op de laatste plek.
                </p>
                <p className="text-foreground font-medium pt-4">
                  Deze training is er voor jou als je:
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
                {[
                  "Vaak streng bent voor jezelf",
                  "De lat hoog legt en jezelf snel veroordeelt",
                  "Wilt leren omgaan met moeilijke gevoelens",
                  "Meer zachtheid en balans in je leven wilt ervaren",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-warm-50 border border-warm-200">
                    <Check className="h-5 w-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                  <a href="#programma">
                    Reserveer hier je plek
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wat je kunt verwachten */}
      <section className="py-20 lg:py-24 bg-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                DE ERVARING
              </span>
              <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl leading-tight">
                Wat je kunt <span className="font-serif italic text-terracotta-600">verwachten</span>
              </h2>
              <p className="text-xl font-light text-foreground mb-6">
                Een 8-weekse training die voelt als thuiskomen
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Elke sessie combineert theorie, praktijk en integratie — begeleid door ervaren trainers die werken vanuit een trauma-sensitieve benadering.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Deze training biedt je meer dan alleen kennis; je leert een nieuwe manier om met jezelf en het leven om te gaan — zachter, bewuster en milder — zodat je minder verstrikt raakt in stress, zelfkritiek en dagelijkse druk, en meer ruimte en rust in je leven ervaart.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wat brengt MSC je */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  DE VOORDELEN
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat brengt MSC <span className="font-serif italic text-terracotta-600">je?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Onderzoek laat zien dat MSC leidt tot duurzame, positieve veranderingen — wereldwijd bevestigd bij duizenden deelnemers.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Meer rust in hoofd en lichaam",
                  "Meer emotionele veerkracht",
                  "Betere omgang met stress en tegenslagen",
                  "Minder zelfkritiek en meer mildheid",
                  "Gezondere grenzen en betere zelfzorg",
                  "Een diepere verbinding met jezelf en anderen",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-warm-50 border border-warm-200 shadow-sm">
                    <Check className="h-5 w-5 text-sage-600 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-600 to-terracotta-700">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-white md:text-4xl leading-tight">
              Klaar om thuis te komen
              <span className="block font-serif italic mt-2">bij jezelf?</span>
            </h2>
            <p className="text-terracotta-100 text-lg mb-4">
              In je hoofd. In je hart. In je lichaam.
            </p>
            <p className="text-terracotta-100 text-lg mb-4">
              Op een plek waar je niets hoeft te bewijzen — alleen maar mag zijn.
            </p>
            <p className="text-white text-lg mb-8">
              Als je voelt dat het tijd is om zachter, milder en bewuster in het leven te staan, dan is dit jouw moment.
            </p>
            <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
              <a href="#programma">
                Start de training
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Programma-structuur & Data */}
      <section id="programma" className="py-20 lg:py-24 bg-warm-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                  PRAKTISCH
                </span>
                <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Programma-structuur & <span className="font-serif italic text-terracotta-600">Data</span>
                </h2>
              </div>
            </ScrollReveal>
            
            {/* Format Info */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="text-center p-4 rounded-xl bg-white border border-warm-200">
                  <p className="text-sm text-muted-foreground mb-1">Format</p>
                  <p className="font-medium text-foreground">100% live online</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white border border-warm-200">
                  <p className="text-sm text-muted-foreground mb-1">Duur</p>
                  <p className="font-medium text-foreground">8 weken + retreat</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white border border-warm-200">
                  <p className="text-sm text-muted-foreground mb-1">Per sessie</p>
                  <p className="font-medium text-foreground">2 uur</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white border border-warm-200">
                  <p className="text-sm text-muted-foreground mb-1">Taal</p>
                  <p className="font-medium text-foreground">NL / EN</p>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Training Dates Grid */}
            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {trainingDates.map((training, index) => (
                <StaggerItem key={index}>
                  <Card className="border-warm-200 overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className={`px-6 py-3 ${training.language === "Nederlands" ? "bg-terracotta-500" : "bg-sage-600"}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{training.language}</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">{training.day}</p>
                      <p className="font-semibold text-foreground text-lg mb-1">Start: {training.startDate}</p>
                      <p className="text-foreground mb-3">Tijd: {training.time}</p>
                      <p className="text-sm text-muted-foreground mb-4">{training.dates}</p>
                      <div className="pt-3 border-t border-warm-200 flex items-center justify-between">
                        <p className="text-2xl font-light text-terracotta-600">{training.price}</p>
                        <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full" asChild>
                          <a href="http://mindful-mind.org/aanmeldformulier-2/" target="_blank" rel="noopener noreferrer">
                            Reserveer
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <Link to="/agenda">
                  Bekijk meer details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 1-op-1 Begeleiding */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  PERSOONLIJK
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Liever <span className="font-serif italic text-terracotta-600">1-op-1 begeleiding?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                  Naast de groepstraining bied ik ook individuele begeleiding aan. Dit is ideaal als je liever in je eigen tempo werkt, of als je persoonlijke thema's wilt verkennen in een veilige, één-op-één setting.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Card className="border-warm-200 rounded-3xl overflow-hidden max-w-md mx-auto">
                <CardContent className="p-8 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-6 mx-auto">
                    <Heart className="h-8 w-8 text-terracotta-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Individuele begeleiding</h3>
                  <p className="text-muted-foreground mb-1">Persoonlijke aandacht, jouw tempo.</p>
                  <p className="text-muted-foreground mb-6">Online of in Amersfoort.</p>
                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <Link to="/contact">
                      Neem contact op
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer Section with Mindful Mind info */}
      <section className="py-16 lg:py-20 bg-sage-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="text-2xl font-light text-white mb-2">Mindful Mind</h3>
            <p className="text-sage-200 mb-8">Begeleiding in Mindful Zelfcompassie</p>
            
            <div className="space-y-3 mb-8">
              <a href="mailto:mindful-mind@outlook.com" className="flex items-center justify-center gap-2 text-sage-200 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                mindful-mind@outlook.com
              </a>
              <a href="tel:+31625633379" className="flex items-center justify-center gap-2 text-sage-200 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                +31 6 25633379
              </a>
              <a href="https://wa.me/31625633379" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sage-200 hover:text-white transition-colors">
                <MessageSquareQuote className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MSCTraining;
