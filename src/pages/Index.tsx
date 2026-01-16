import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, ArrowRight, Check, Leaf, Calendar, Clock, Globe, Video, Sparkles, Quote, MessageSquareQuote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
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

const testimonials = [
  {
    quote: "Deze training heeft me geleerd om zachter voor mezelf te zijn. Ik merk dat ik nu veel sneller herken wanneer ik te streng voor mezelf ben.",
    author: "Anna",
    role: "Deelnemer MSC Training",
  },
  {
    quote: "Eindelijk begrijp ik wat zelfcompassie echt betekent. Het is geen zwakte, maar juist kracht. De trainers creëren een hele veilige sfeer.",
    author: "Mark",
    role: "Deelnemer MSC Training",
  },
  {
    quote: "Na jaren van perfectionisme heb ik geleerd om mezelf te accepteren zoals ik ben. Deze training was een keerpunt in mijn leven.",
    author: "Sophie",
    role: "Deelnemer MSC Training",
  },
];

const faqItems = [
  {
    question: "Voor wie is deze training bedoeld?",
    answer: "Deze training is voor iedereen die merkt dat ze vaak streng zijn voor zichzelf, moeilijk hun grenzen aangeven of moeite hebben met zelfzorg en ontspanning. Herken je jezelf in gedachten als \"Ik moet nog even doorgaan\", \"Anderen gaan voor\" of \"Ik ben niet goed genoeg\"? Dan is deze training waardevol voor jou.",
  },
  {
    question: "Heb ik ervaring met meditatie nodig?",
    answer: "Nee, je hebt geen ervaring met meditatie nodig om deel te nemen. De training is geschikt voor zowel beginners als mensen met ervaring. We bouwen stap voor stap op.",
  },
  {
    question: "Wat als ik een keer een sessie mis?",
    answer: "Het is fijn als je alle sessies kunt volgen, omdat de training stapsgewijs is opgebouwd. Maar het is geen probleem als je een keer een sessie mist. We zorgen ervoor dat je de materialen ontvangt.",
  },
  {
    question: "Wat is het verschil tussen Mindfulness en MSC?",
    answer: "Mindfulness gaat over bewust aanwezig zijn in het moment. MSC bouwt hierop voort door daar zelfcompassie aan toe te voegen: jezelf met vriendelijkheid en begrip benaderen, juist in moeilijke momenten.",
  },
  {
    question: "Is de training ook geschikt bij stress of burn-out?",
    answer: "Ja, de training is zeer geschikt als je last hebt van stress of je herstelt van een burn-out. We werken trauma-sensitief en respecteren ieders tempo. Bij ernstige klachten raden we aan om eerst met een behandelaar te overleggen.",
  },
];

const trainingDates = [
  {
    language: "Nederlands",
    day: "Maandag (avond)",
    startDate: "16 februari 2026",
    time: "19:00 – 21:00",
    dates: ["23 feb", "2, 9, 16, 23 mrt", "13, 20 apr", "4 mei"],
    price: "€550",
  },
  {
    language: "Nederlands",
    day: "Zaterdag (middag)",
    startDate: "21 maart 2026",
    time: "15:00 – 17:00",
    dates: ["28 mrt", "4, 11, 18, 25 apr", "9, 16 mei"],
    price: "€550",
  },
  {
    language: "English",
    day: "Sunday (afternoon)",
    startDate: "18 January 2026",
    time: "16:00 – 18:00",
    dates: ["25 Jan", "1, 8, 15, 22 Feb", "1, 8 Mar"],
    price: "€550",
  },
  {
    language: "English",
    day: "Wednesday (evening)",
    startDate: "22 April 2026",
    time: "19:00 – 21:00",
    dates: ["29 Apr", "6, 13, 20, 27 May", "3, 10 Jun"],
    price: "€550",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-28 lg:pt-32 lg:pb-36">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/80 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-terracotta-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Sparkles className="h-4 w-4" />
              Jouw welzijn begint bij hoe je jezelf behandelt
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl leading-[1.1]"
            >
              Kom thuis
              <span className="block font-serif italic text-terracotta-600 mt-2">bij jezelf!</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 text-xl text-terracotta-600 font-medium md:text-2xl tracking-wide"
            >
              8-weekse training in Mindful Zelfcompassie
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed"
            >
              Leer jezelf steunen in plaats van pushen.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-10 py-7 text-base rounded-full shadow-lg hover:shadow-xl transition-all">
                <Link to="/msc-training">
                  Neem deel aan het programma
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why MSC */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Ontdek</p>
              <h2 className="mb-10 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                Waarom Mindful <br /><span className="font-serif italic text-terracotta-600">Zelfcompassie?</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
                Veel mensen denken dat zelfkritiek helpt om scherp, gemotiveerd of succesvol te blijven.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="mb-8 text-muted-foreground text-lg leading-relaxed">
                Onderzoek laat echter zien dat zelfkritiek juist stress vergroot, je veerkracht ondermijnt en je op de lange termijn uitput.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3} animation="scale">
              <div className="bg-gradient-to-r from-terracotta-50 to-sage-50 rounded-2xl p-8 border border-terracotta-100">
                <p className="text-foreground font-medium text-lg leading-relaxed">
                  Mindful Zelfcompassie biedt een bewezen alternatief: niet door minder betrokken te zijn, maar door met meer steun en begrip met jezelf om te gaan — juist wanneer het moeilijk is.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <Button asChild className="mt-12 bg-terracotta-600 hover:bg-terracotta-700 text-white px-8 rounded-full">
                <Link to="/msc-training">
                  Reserveer hier je plek
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What is MSC */}
      <section className="py-24 lg:py-28 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4 text-center">Het programma</p>
              <h2 className="mb-10 text-3xl font-light text-foreground md:text-4xl lg:text-5xl text-center leading-tight">
                Wat is Mindful Zelfcompassie <br /><span className="font-serif italic text-terracotta-600">(MSC)?</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p className="text-center text-muted-foreground text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
                Mindful Zelfcompassie (MSC) is een wetenschappelijk onderbouwd 8-weeks programma, ontwikkeld door dr. Kristin Neff en dr. Christopher Germer.
              </p>
              
              <p className="text-center text-foreground font-medium mb-8 text-lg">In deze training leer je:</p>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2 mb-12">
              <StaggerItem>
                <div className="group flex items-start gap-5 bg-white rounded-3xl p-7 shadow-sm border border-warm-200 hover:shadow-md transition-shadow h-full">
                  <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Leaf className="h-7 w-7 text-sage-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-2">Mindfulness</p>
                    <p className="text-muted-foreground leading-relaxed">Bewust aanwezig te zijn bij wat je ervaart</p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="group flex items-start gap-5 bg-white rounded-3xl p-7 shadow-sm border border-warm-200 hover:shadow-md transition-shadow h-full">
                  <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Heart className="h-7 w-7 text-terracotta-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-2">Zelfcompassie</p>
                    <p className="text-muted-foreground leading-relaxed">Met vriendelijkheid, begrip en zorg op jezelf te reageren</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
            
            <ScrollReveal delay={0.2}>
              <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                Je ontwikkelt praktische vaardigheden om met stress, moeilijke emoties en zelfkritiek om te gaan, met dezelfde steun en vriendelijkheid die een goede vriend(in) je zou geven.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="text-center mt-12">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-8 rounded-full">
                  <Link to="/msc-training">
                    Reserveer hier je plek
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Is This For You */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Voor jou</p>
              <h2 className="mb-10 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                Is deze training iets <br /><span className="font-serif italic text-terracotta-600">voor jou?</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p className="mb-4 text-muted-foreground text-lg leading-relaxed">
                In de drukte van het leven raak je makkelijk jezelf kwijt.
              </p>
              
              <p className="mb-12 text-muted-foreground text-lg leading-relaxed">
                Je bent er voor anderen, je zet door, je legt de lat hoog — maar jezelf zet je vaak op de laatste plek.
              </p>
              
              <p className="text-foreground font-semibold text-lg mb-8">Deze training is er voor jou als je:</p>
            </ScrollReveal>
            
            <StaggerContainer className="space-y-4 max-w-lg mx-auto text-left mb-12">
              {[
                "Vaak streng bent voor jezelf",
                "De lat hoog legt en jezelf snel veroordeelt",
                "Wilt leren omgaan met moeilijke gevoelens",
                "Meer zachtheid en balans in je leven wilt ervaren",
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-4 bg-gradient-to-r from-warm-50 to-sage-50 rounded-2xl px-6 py-5 border border-warm-200">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-terracotta-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-terracotta-600" />
                    </div>
                    <span className="text-foreground text-lg">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <ScrollReveal delay={0.3}>
              <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-8 rounded-full">
                <Link to="/msc-training">
                  Reserveer hier je plek
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 lg:py-28 bg-gradient-to-b from-warm-50 to-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">De ervaring</p>
              <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                Wat je kunt <span className="font-serif italic text-terracotta-600">verwachten</span>
              </h2>
              
              <p className="text-terracotta-600 font-medium text-xl mb-10">
                Een 8-weekse training die voelt als thuiskomen
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Elke sessie combineert theorie, praktijk en integratie — begeleid door ervaren trainers die werken vanuit een trauma-sensitieve benadering.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} animation="scale">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-warm-200">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Deze training biedt je meer dan alleen kennis; je leert een nieuwe manier om met jezelf en het leven om te gaan — zachter, bewuster en milder — zodat je <strong className="text-foreground">minder verstrikt raakt in stress, zelfkritiek en dagelijkse druk</strong>, en meer ruimte en rust in je leven ervaart.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4 text-center">De voordelen</p>
              <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl lg:text-5xl text-center leading-tight">
                Wat brengt MSC <span className="font-serif italic text-terracotta-600">je?</span>
              </h2>
              
              <p className="text-center text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                Onderzoek laat zien dat MSC leidt tot duurzame, positieve veranderingen — wereldwijd bevestigd bij duizenden deelnemers.
              </p>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-4 md:grid-cols-2">
              {[
                "Meer rust in hoofd en lichaam",
                "Meer emotionele veerkracht",
                "Betere omgang met stress en tegenslagen",
                "Minder zelfkritiek en meer mildheid",
                "Gezondere grenzen en betere zelfzorg",
                "Een diepere verbinding met jezelf en anderen",
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-terracotta-50 to-warm-50 border border-terracotta-100 hover:shadow-sm transition-shadow">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-terracotta-200 flex items-center justify-center">
                      <Check className="h-4 w-4 text-terracotta-700" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-28 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-terracotta-400/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-3xl font-light text-white md:text-4xl lg:text-5xl leading-tight">
                Klaar om thuis te komen <br />bij jezelf?
              </h2>
              <p className="mb-4 text-xl text-white/90 font-medium">
                In je hoofd. In je hart. In je lichaam.
              </p>
              <p className="mb-6 text-white/80 text-lg">
                Op een plek waar je niets hoeft te bewijzen — alleen maar mag <em>zijn</em>.
              </p>
              <p className="mb-12 text-white/80 text-lg max-w-lg mx-auto">
                Als je voelt dat het tijd is om zachter, milder en bewuster in het leven te staan, dan is dit jouw moment.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 px-10 py-7 text-base rounded-full shadow-lg">
                <Link to="/msc-training">
                  Start de training
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Program Structure & Dates */}
      <section className="py-24 lg:py-28 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4 text-center">Praktisch</p>
              <h2 className="mb-12 text-3xl font-light text-foreground md:text-4xl lg:text-5xl text-center leading-tight">
                Programma-structuur <span className="font-serif italic text-terracotta-600">& Data</span>
              </h2>
            </ScrollReveal>
            
            {/* Format info */}
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-14 max-w-3xl mx-auto">
              {[
                { icon: Video, label: "Format", value: "100% live online" },
                { icon: Calendar, label: "Duur", value: "8 weken + retreat" },
                { icon: Clock, label: "Per sessie", value: "2 uur" },
                { icon: Globe, label: "Taal", value: "NL / EN" },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-warm-200 shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-terracotta-100 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-terracotta-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            {/* Training dates grid */}
            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {trainingDates.map((training, index) => (
                <StaggerItem key={index}>
                  <Card className="border-warm-200 bg-white overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-7">
                      <div className="flex items-center gap-3 mb-5">
                        <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold ${
                          training.language === "Nederlands" 
                            ? "bg-terracotta-100 text-terracotta-700" 
                            : "bg-sage-200 text-sage-800"
                        }`}>
                          {training.language}
                        </span>
                        <span className="text-sm text-muted-foreground">{training.day}</span>
                      </div>
                      
                      <p className="font-semibold text-foreground text-lg mb-2">
                        Start: {training.startDate}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Tijd: {training.time}
                      </p>
                      <p className="text-sm text-muted-foreground mb-5 line-clamp-1">
                        Vervolgdata: {training.dates.join(", ")}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                        <p className="text-xl font-semibold text-terracotta-600">{training.price}</p>
                        <Button asChild size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-6">
                          <Link to="/msc-training">
                            Reserveer
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <ScrollReveal delay={0.3}>
              <div className="text-center mt-12">
                <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50 rounded-full px-8">
                  <Link to="/msc-training">
                    Bekijk meer details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 1-on-1 Coaching */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Persoonlijk</p>
              <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                Liever <span className="font-serif italic text-terracotta-600">1-op-1 begeleiding?</span>
              </h2>
              
              <p className="mb-12 text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                Naast de groepstraining bied ik ook individuele begeleiding aan. Dit is ideaal als je liever in je eigen tempo werkt, of als je persoonlijke thema's wilt verkennen in een veilige, één-op-één setting.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} animation="scale">
              <Card className="border-warm-200 bg-gradient-to-br from-warm-50 to-sage-50 max-w-md mx-auto rounded-3xl shadow-sm">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 mx-auto">
                    <Users className="h-8 w-8 text-terracotta-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">Individuele begeleiding</h3>
                  <p className="mb-6 text-muted-foreground">
                    Persoonlijke aandacht, jouw tempo.<br />Online of in Amersfoort.
                  </p>
                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <a href="mailto:mindful-mind@outlook.com">
                      Neem contact op
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-28 bg-gradient-to-b from-sage-50 to-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4 text-center">Ervaringen</p>
              <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl lg:text-5xl text-center leading-tight">
                Wat deelnemers <span className="font-serif italic text-terracotta-600">zeggen</span>
              </h2>
              <p className="text-center text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                Ontdek hoe anderen de training hebben ervaren en wat het hen heeft gebracht.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="border-warm-200 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow h-full">
                        <CardContent className="p-8 flex flex-col h-full">
                          <div className="mb-6">
                            <Quote className="h-10 w-10 text-terracotta-200" />
                          </div>
                          <p className="text-foreground leading-relaxed mb-6 flex-grow italic">
                            "{testimonial.quote}"
                          </p>
                          <div className="pt-4 border-t border-warm-200">
                            <p className="font-semibold text-foreground">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-8">
                  <CarouselPrevious className="static translate-y-0 border-terracotta-200 hover:bg-terracotta-50 hover:border-terracotta-300" />
                  <CarouselNext className="static translate-y-0 border-terracotta-200 hover:bg-terracotta-50 hover:border-terracotta-300" />
                </div>
              </Carousel>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4 text-center">Veelgestelde vragen</p>
              <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl lg:text-5xl text-center leading-tight">
                Heb je nog <span className="font-serif italic text-terracotta-600">vragen?</span>
              </h2>
              <p className="text-center text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                Hier vind je antwoorden op de meest gestelde vragen over de training.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-warm-50 border border-warm-200 rounded-2xl px-6 data-[state=open]:bg-gradient-to-r data-[state=open]:from-terracotta-50 data-[state=open]:to-warm-50"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-terracotta-600 hover:no-underline py-5">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">Staat je vraag er niet tussen?</p>
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                  <Link to="/contact">
                    <MessageSquareQuote className="mr-2 h-4 w-4" />
                    Neem contact op
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
