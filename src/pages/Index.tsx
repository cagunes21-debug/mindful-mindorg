import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Sparkles, ArrowRight, Check, Mail, Phone, MessageCircle, Clock, Users, Globe, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { FAQSchema, CourseSchema, OrganizationSchema } from "@/components/StructuredData";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Mindful Mind | 8-weekse Training in Mindful Zelfcompassie"
        description="Leer jezelf steunen in plaats van pushen. 8-weekse training in Mindful Zelfcompassie ontwikkeld door dr. Kristin Neff en dr. Christopher Germer."
      />
      <OrganizationSchema />
      <CourseSchema 
        name="8-weekse Mindful Self-Compassion (MSC) Training"
        description="Een wetenschappelijk onderbouwd programma waarin je leert omgaan met stress, emoties en zelfkritiek met meer vriendelijkheid en veerkracht."
        duration="8 weeks"
        price="550"
      />
      <Navigation />
      
      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-44 bg-warm-50">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-warm-100/50 to-transparent rounded-full" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Top badge with tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-10 rounded-full bg-warm-100 border border-warm-200 px-6 py-3.5 text-sm font-medium text-terracotta-700 shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              Jouw welzijn begint bij hoe je jezelf behandelt
            </motion.div>
            
            {/* Main heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl leading-[1.15]"
            >
              Kom thuis
              <span className="block font-serif italic text-terracotta-600 mt-3 text-[1.1em]">bij jezelf!</span>
            </motion.h1>
            
            {/* Subtitle - training name */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-terracotta-600 text-xl md:text-2xl font-medium mb-8"
            >
              8-weekse training in Mindful Zelfcompassie
            </motion.p>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12"
            >
              Leer jezelf steunen in plaats van pushen.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg hover:shadow-xl transition-all">
                <a href="#programma">
                  Neem deel aan het programma
                  <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </Button>
            </motion.div>

            {/* Quick info badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mt-14"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <Clock className="h-4 w-4 text-terracotta-500" />
                8 weken
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <Globe className="h-4 w-4 text-terracotta-500" />
                100% online
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <Users className="h-4 w-4 text-terracotta-500" />
                Kleine groepen
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waarom Mindful Zelfcompassie */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Decorative line */}
        <div className="absolute left-1/2 top-0 w-px h-20 bg-gradient-to-b from-transparent to-terracotta-200" />
        
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-8 uppercase">
                  Ontdek
                </span>
                <h2 className="mb-10 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Waarom <span className="font-serif italic text-terracotta-600">Mindful Zelfcompassie?</span>
                </h2>
              </div>
              
              {/* Better readability with card-like text blocks */}
              <div className="space-y-8">
                <div className="bg-warm-50 rounded-2xl p-6 lg:p-8 border-l-4 border-terracotta-300">
                  <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
                    Veel mensen denken dat zelfkritiek helpt om scherp, gemotiveerd of succesvol te blijven.
                  </p>
                </div>
                
                <div className="bg-sage-50 rounded-2xl p-6 lg:p-8 border-l-4 border-sage-300">
                  <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
                    Onderzoek laat echter zien dat zelfkritiek juist stress vergroot, je veerkracht ondermijnt en je op de lange termijn uitput.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-terracotta-50 to-warm-50 rounded-2xl p-6 lg:p-8 border border-terracotta-200">
                  <p className="text-xl lg:text-2xl font-light text-foreground leading-relaxed">
                    Mindful Zelfcompassie biedt een bewezen alternatief: niet door minder betrokken te zijn, maar door met meer steun en begrip met jezelf om te gaan — <span className="font-medium text-terracotta-600">juist wanneer het moeilijk is.</span>
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-6 text-base shadow-md">
                  <a href="#programma">
                    Reserveer hier je plek
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wat is MSC */}
      <section className="py-24 lg:py-32 bg-warm-50 relative">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-8 uppercase">
                  Het Programma
                </span>
                <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Wat is Mindful Zelfcompassie
                  <span className="block font-serif italic text-terracotta-600 mt-2">(MSC)?</span>
                </h2>
                <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                  Mindful Zelfcompassie (MSC) is een wetenschappelijk onderbouwd 8-weeks programma, ontwikkeld door dr. Kristin Neff en dr. Christopher Germer.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="flex items-center justify-center gap-2 mb-10">
                <div className="h-px w-12 bg-terracotta-300" />
                <p className="text-foreground text-lg font-medium">In deze training leer je</p>
                <div className="h-px w-12 bg-terracotta-300" />
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-2 mb-12">
              <StaggerItem>
                <Card className="border-0 bg-white rounded-3xl h-full hover:shadow-xl transition-all duration-300 shadow-md">
                  <CardContent className="p-10 text-center">
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-terracotta-100 to-terracotta-200 shadow-inner">
                      <Brain className="h-10 w-10 text-terracotta-600" />
                    </div>
                    <h3 className="mb-4 text-2xl font-semibold text-foreground">Mindfulness</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Bewust aanwezig te zijn bij wat je ervaart
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
              
              <StaggerItem>
                <Card className="border-0 bg-white rounded-3xl h-full hover:shadow-xl transition-all duration-300 shadow-md">
                  <CardContent className="p-10 text-center">
                    <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sage-100 to-sage-200 shadow-inner">
                      <Heart className="h-10 w-10 text-sage-700" />
                    </div>
                    <h3 className="mb-4 text-2xl font-semibold text-foreground">Zelfcompassie</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Met vriendelijkheid, begrip en zorg op jezelf te reageren
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            </StaggerContainer>
            
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-100 max-w-2xl mx-auto mb-10">
                <p className="text-center text-muted-foreground text-lg lg:text-xl leading-relaxed">
                  Je ontwikkelt praktische vaardigheden om met stress, moeilijke emoties en zelfkritiek om te gaan, met dezelfde steun en vriendelijkheid die een goede vriend(in) je zou geven.
                </p>
              </div>
              <div className="text-center">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-6 text-base shadow-md">
                  <a href="#programma">
                    Reserveer hier je plek
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Is deze training iets voor jou */}
      <section className="py-24 lg:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-8 uppercase">
                  Voor Jou
                </span>
                <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Is deze training iets
                  <span className="block font-serif italic text-terracotta-600 mt-2">voor jou?</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed mb-4">
                  In de drukte van het leven raak je makkelijk jezelf kwijt.
                </p>
                <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
                  Je bent er voor anderen, je zet door, je legt de lat hoog — maar jezelf zet je vaak op de laatste plek.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.15}>
              <div className="flex items-center justify-center gap-2 mb-10">
                <div className="h-px w-12 bg-terracotta-300" />
                <p className="text-foreground text-lg font-medium">Deze training is er voor jou als je</p>
                <div className="h-px w-12 bg-terracotta-300" />
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-12">
                {[
                  { text: "Vaak streng bent voor jezelf", icon: "🪞" },
                  { text: "De lat hoog legt en jezelf snel veroordeelt", icon: "📏" },
                  { text: "Wilt leren omgaan met moeilijke gevoelens", icon: "💭" },
                  { text: "Meer zachtheid en balans in je leven wilt ervaren", icon: "🌿" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-warm-50 to-white border border-warm-200 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-foreground text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-6 text-base shadow-md">
                  <a href="#programma">
                    Reserveer hier je plek
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wat je kunt verwachten */}
      <section className="py-24 lg:py-32 bg-sage-50 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sage-100/50 to-transparent" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-8 uppercase">
                De Ervaring
              </span>
              <h2 className="mb-10 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                Wat je kunt <span className="font-serif italic text-terracotta-600">verwachten</span>
              </h2>
              
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-md mb-8">
                <p className="text-2xl lg:text-3xl font-light text-foreground mb-6 leading-relaxed">
                  Een 8-weekse training die voelt als <span className="font-serif italic text-terracotta-600">thuiskomen</span>
                </p>
                <div className="h-px w-20 bg-terracotta-300 mx-auto mb-6" />
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Elke sessie combineert theorie, praktijk en integratie — begeleid door ervaren trainers die werken vanuit een trauma-sensitieve benadering.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Deze training biedt je meer dan alleen kennis; je leert een nieuwe manier om met jezelf en het leven om te gaan — zachter, bewuster en milder — zodat je minder verstrikt raakt in stress, zelfkritiek en dagelijkse druk, en meer ruimte en rust in je leven ervaart.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wat brengt MSC je */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-8 uppercase">
                  De Voordelen
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Wat brengt MSC <span className="font-serif italic text-terracotta-600">je?</span>
                </h2>
                <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                  Onderzoek laat zien dat MSC leidt tot duurzame, positieve veranderingen — wereldwijd bevestigd bij duizenden deelnemers.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { text: "Meer rust in hoofd en lichaam", icon: "🧘" },
                  { text: "Meer emotionele veerkracht", icon: "💪" },
                  { text: "Betere omgang met stress en tegenslagen", icon: "🌊" },
                  { text: "Minder zelfkritiek en meer mildheid", icon: "💝" },
                  { text: "Gezondere grenzen en betere zelfzorg", icon: "🛡️" },
                  { text: "Een diepere verbinding met jezelf en anderen", icon: "🤝" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-warm-50 to-sage-50 border border-warm-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <span className="text-foreground text-base lg:text-lg">{item.text}</span>
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

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-warm-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-10 md:grid-cols-2 mb-12">
              <div>
                <p className="font-serif italic text-3xl text-terracotta-600 mb-4">Mindful Mind</p>
                <p className="text-muted-foreground text-lg">
                  Begeleiding in Mindful Zelfcompassie
                </p>
              </div>
              <div className="space-y-4">
                <a href="mailto:mindful-mind@outlook.com" className="flex items-center gap-4 text-muted-foreground hover:text-terracotta-600 transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  mindful-mind@outlook.com
                </a>
                <a href="tel:+31625633379" className="flex items-center gap-4 text-muted-foreground hover:text-terracotta-600 transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  +31 6 25633379
                </a>
                <a href="https://wa.me/31625633379" className="flex items-center gap-4 text-muted-foreground hover:text-terracotta-600 transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="border-t border-warm-200 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Mindful Mind. Alle rechten voorbehouden.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;