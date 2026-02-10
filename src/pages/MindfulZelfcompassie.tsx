import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Sparkles, ArrowRight, Check, Mail, Phone, MessageCircle, Clock, Users, Globe, Calendar, Quote, Star, Leaf, HelpCircle, Award, TrendingUp, FlaskConical, Play } from "lucide-react";
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
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { FAQSchema, CourseSchema, OrganizationSchema } from "@/components/StructuredData";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { ContactForm } from "@/components/ContactForm";
import { RegistrationForm } from "@/components/RegistrationForm";
import heroMindfulness from "@/assets/hero-mindfulness.jpg";
import meditationPractice from "@/assets/meditation-practice.jpg";
import natureCalm from "@/assets/nature-calm.jpg";

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
    language: "English",
    day: "Wednesday (evening)",
    startDate: "22 April 2026",
    time: "19:00 – 21:00",
    dates: "Follow-up: 29 Apr, 6, 13, 20, 27 May, 3, 10 Jun",
    price: "€550",
  },
];

const workshopDates = [
  { lang: "Nederlands", date: "11 februari 2026", time: "19:00 – 20:00", price: "€45" },
  { lang: "English", date: "10 februari 2026", time: "19:00 – 20:00", price: "€45" },
];

const weeklySessions = [
  { lang: "Nederlands", day: "Donderdag", time: "12:15 – 12:45", description: "Korte geleide meditatie om midden op de dag even stil te staan.", price: "Gratis" },
  { lang: "English", day: "Tuesday", time: "12:15 – 12:45", description: "A short guided meditation to pause and reconnect during your day.", price: "Free" },
];

const MindfulZelfcompassie = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<typeof trainingDates[0] | null>(null);
  const [isWorkshopRegistrationOpen, setIsWorkshopRegistrationOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<typeof workshopDates[0] | null>(null);
  const [isWeeklyRegistrationOpen, setIsWeeklyRegistrationOpen] = useState(false);
  const [selectedWeekly, setSelectedWeekly] = useState<typeof weeklySessions[0] | null>(null);

  const openRegistration = (training: typeof trainingDates[0]) => {
    setSelectedTraining(training);
    setIsRegistrationOpen(true);
  };

  const openWorkshopRegistration = (workshop: typeof workshopDates[0]) => {
    setSelectedWorkshop(workshop);
    setIsWorkshopRegistrationOpen(true);
  };

  const openWeeklyRegistration = (session: typeof weeklySessions[0]) => {
    setSelectedWeekly(session);
    setIsWeeklyRegistrationOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO 
        title="Mindful Mind | 8-weekse Training in Mindful Zelfcompassie"
        description="Leer jezelf te steunen, vooral in moeilijke tijden. 8-weekse training in Mindful Zelfcompassie ontwikkeld door dr. Kristin Neff en dr. Christopher Germer."
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
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroMindfulness} 
            alt="Mindfulness meditatie in de natuur" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-50/90 via-warm-50/80 to-warm-50/95" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
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
              className="text-terracotta-600 text-xl md:text-2xl font-medium mb-4"
            >
              8-weekse training in Mindful Zelfcompassie
            </motion.p>
            
            {/* Tagline badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-warm-100 border border-warm-200 px-6 py-3.5 text-sm font-medium text-terracotta-700 shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              Jouw welzijn begint bij hoe je met jezelf omgaat
            </motion.div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12"
            >
              Leer jezelf te steunen, vooral in moeilijke tijden.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg hover:shadow-xl transition-all">
                <a href="#programma">
                  Neem deel aan het programma
                  <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-7 text-lg">
                <Link to="/bedrijven">
                  Voor Bedrijven
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
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

      {/* Social Proof Section */}
      <section className="py-12 bg-white border-b border-warm-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-terracotta-500" />
                  <span className="text-3xl lg:text-4xl font-light text-foreground">200+</span>
                </div>
                <p className="text-sm text-muted-foreground">deelnemers begeleid</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-terracotta-500 fill-terracotta-500" />
                  <span className="text-3xl lg:text-4xl font-light text-foreground">4.9/5</span>
                </div>
                <p className="text-sm text-muted-foreground">gemiddelde beoordeling</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-terracotta-500" />
                  <span className="text-3xl lg:text-4xl font-light text-foreground">MSC</span>
                </div>
                <p className="text-sm text-muted-foreground">gecertificeerde trainer</p>
              </div>
            </div>
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
              
              {/* Three pillars without numbers */}
              <div className="space-y-6">
                <div className="bg-warm-50 rounded-2xl p-6 lg:p-8 border-l-4 border-terracotta-300">
                  <span className="inline-block rounded-full bg-terracotta-100 px-3 py-1 text-xs font-semibold text-terracotta-700 mb-3">
                    Mythe
                  </span>
                  <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
                    Veel mensen denken dat streng zijn voor jezelf helpt om gemotiveerd of succesvol te blijven.
                  </p>
                </div>
                
                <div className="bg-sage-50 rounded-2xl p-6 lg:p-8 border-l-4 border-sage-300">
                  <span className="inline-block rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-700 mb-3">
                    Wetenschap
                  </span>
                  <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
                    Onderzoek laat zien dat zelfkritiek juist <mark className="bg-sage-200 text-sage-800 px-1 rounded">stress vergroot</mark>, <mark className="bg-sage-200 text-sage-800 px-1 rounded">veerkracht ondermijnt</mark> en op termijn <mark className="bg-sage-200 text-sage-800 px-1 rounded">uitput</mark>.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-terracotta-50 to-warm-50 rounded-2xl p-6 lg:p-8 border border-terracotta-200 shadow-sm">
                  <span className="inline-block rounded-full bg-terracotta-500 px-3 py-1 text-xs font-semibold text-white mb-3">
                    Het Alternatief
                  </span>
                  <p className="text-xl lg:text-2xl font-light text-foreground leading-relaxed">
                    Mindful Zelfcompassie leert je met <span className="underline decoration-terracotta-300 decoration-2 underline-offset-4">vriendelijkheid en begrip</span> op jezelf te reageren — <span className="font-medium text-terracotta-600">juist wanneer het moeilijk is.</span>
                  </p>
                </div>
              </div>
              
              
              {/* Inspirational quote */}
              <div className="mt-8 relative">
                <Quote className="absolute -top-3 -left-2 h-8 w-8 text-terracotta-200" />
                <blockquote className="bg-white border border-warm-200 rounded-2xl p-6 lg:p-8 pl-10 italic text-lg lg:text-xl text-muted-foreground leading-relaxed shadow-sm">
                  "Met dezelfde vriendelijkheid naar jezelf kijken als naar een goede vriend — dat is de kern van zelfcompassie."
                  <footer className="mt-4 not-italic text-base font-medium text-terracotta-600">
                    — Dr. Kristin Neff, grondlegger van zelfcompassie-onderzoek
                  </footer>
                </blockquote>
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


      <section className="py-20 lg:py-28 bg-gradient-to-b from-warm-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-terracotta-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sage-100/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  <Play className="h-3.5 w-3.5" />
                  Kennismaken
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Ontdek wat zelfcompassie <span className="font-serif italic text-terracotta-600">voor jou kan betekenen</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                  In deze korte video leg ik uit wat Mindful Zelfcompassie is en hoe de training je kan helpen om milder met jezelf om te gaan.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="relative max-w-4xl mx-auto">
                {/* Video Container with image background */}
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-warm-200">
                  {/* Background image */}
                  <img 
                    src={meditationPractice} 
                    alt="Meditatie praktijk" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative group cursor-pointer">
                      {/* Play button */}
                      <div className="h-24 w-24 rounded-full bg-white/90 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center">
                          <Play className="h-10 w-10 text-white fill-white ml-1" />
                        </div>
                      </div>
                      {/* Pulse animation */}
                      <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                    </div>
                    <p className="mt-8 text-white font-medium drop-shadow-lg">Klik om de video af te spelen</p>
                    <p className="mt-2 text-sm text-white/80 drop-shadow-lg">Duur: 3 minuten</p>
                  </div>
                  
                  {/* Uncomment en vervang VIDEO_ID met je YouTube video ID:
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title="Introductie Mindful Zelfcompassie"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  */}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-sage-100 rounded-2xl -z-10" />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-terracotta-100 rounded-xl -z-10" />
              </div>
            </ScrollReveal>
            
            {/* Video highlights */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4 mt-10 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-warm-200 px-4 py-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 text-terracotta-500" />
                  Over de trainer
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-warm-200 px-4 py-2 text-sm text-muted-foreground">
                  <Brain className="h-4 w-4 text-sage-600" />
                  Wat is zelfcompassie?
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-warm-200 px-4 py-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-terracotta-500" />
                  Wat kun je verwachten?
                </span>
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
                <p className="text-foreground text-lg font-medium">Wat leer je in 8 weken?</p>
                <div className="h-px w-12 bg-terracotta-300" />
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-4 md:grid-cols-2 mb-10 max-w-2xl mx-auto">
              <StaggerItem>
                <Card className="border-0 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 shadow-sm">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-terracotta-600" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-terracotta-600 uppercase tracking-wide">Pijler 1</span>
                      <h3 className="text-lg font-semibold text-foreground">Mindfulness</h3>
                      <p className="text-muted-foreground text-sm">Bewust aanwezig zijn bij wat je ervaart.</p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
              
              <StaggerItem>
                <Card className="border-0 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 shadow-sm">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-sage-700" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-sage-600 uppercase tracking-wide">Pijler 2</span>
                      <h3 className="text-lg font-semibold text-foreground">Zelfcompassie</h3>
                      <p className="text-muted-foreground text-sm">Met vriendelijkheid en begrip op jezelf reageren.</p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            </StaggerContainer>
            
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-100 max-w-2xl mx-auto mb-10">
                <p className="text-center text-muted-foreground text-lg lg:text-xl leading-relaxed">
                  Je ontwikkelt praktische vaardigheden om beter om te gaan met stress, zelfkritiek en moeilijke gevoelens — met dezelfde steun die je een goede vriend(in) zou geven.
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
                  Voor wie is deze training?
                  <span className="block font-serif italic text-terracotta-600 mt-2">Herken je jezelf hierin?</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
                {[
                  { text: "Streng voor jezelf", icon: "🌿" },
                  { text: "Perfectionistisch", icon: "📏" },
                  { text: "Moeilijke emoties", icon: "💭" },
                  { text: "Zoekt meer balans", icon: "🪞" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-warm-50 border border-warm-200 text-center">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-foreground text-sm font-medium">{item.text}</span>
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
        {/* Background image with overlay */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src={natureCalm} 
            alt="Rustige natuur" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-sage-50/95 via-sage-50/90 to-sage-50/95" />
        
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
                {/* Visual timeline/process */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-terracotta-100 flex items-center justify-center">
                      <span className="text-terracotta-700 font-semibold">1</span>
                    </div>
                    <span className="text-sm font-medium text-terracotta-700">Theorie</span>
                  </div>
                  <div className="w-8 h-px bg-warm-300" />
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                      <span className="text-sage-700 font-semibold">2</span>
                    </div>
                    <span className="text-sm font-medium text-sage-700">Praktijk</span>
                  </div>
                  <div className="w-8 h-px bg-warm-300" />
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-warm-200 flex items-center justify-center">
                      <span className="text-warm-700 font-semibold">3</span>
                    </div>
                    <span className="text-sm font-medium text-warm-700">Integratie</span>
                  </div>
                </div>
                
                {/* Decorative divider with icon */}
                <div className="flex items-center justify-center gap-4 my-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-terracotta-300" />
                  <Leaf className="h-5 w-5 text-terracotta-400" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-terracotta-300" />
                </div>
                
                <p className="text-muted-foreground text-lg leading-relaxed text-center">
                  Elke sessie voelt als thuiskomen: een veilige en vertrouwde ruimte waarin je kunt ontdekken, oefenen en verbinden. Onze ervaren trainers werken met een <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-sage-700 font-medium text-sm"><Star className="h-3 w-3" />trauma-sensitieve aanpak</span>, zodat jij je op je gemak voelt terwijl je nieuwe inzichten en vaardigheden ontwikkelt.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Kernpunten - Wat brengt MSC je */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-warm-50/30 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-terracotta-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-sage-100/40 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-8 uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  Kernpunten
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Wat brengt MSC <span className="font-serif italic text-terracotta-600">je?</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 border border-sage-200 px-4 py-1.5 text-xs font-medium text-sage-700">
                    <FlaskConical className="h-3 w-3" />
                    Wetenschappelijk bewezen
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-100 border border-terracotta-200 px-4 py-1.5 text-xs font-medium text-terracotta-700">
                    <TrendingUp className="h-3 w-3" />
                    Duurzame resultaten
                  </span>
                </div>
                <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                  Onderzoek laat zien dat MSC leidt tot duurzame, positieve veranderingen — wereldwijd bevestigd bij duizenden deelnemers.
                </p>
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
                    <div className={`group text-center p-4 rounded-2xl bg-white border border-warm-200 shadow-sm hover:shadow-md transition-all duration-300`}>
                      <div className={`h-10 w-10 mx-auto rounded-xl ${item.color === 'terracotta' ? 'bg-terracotta-100' : 'bg-sage-100'} flex items-center justify-center mb-3`}>
                        <IconComponent className={`h-5 w-5 ${item.color === 'terracotta' ? 'text-terracotta-600' : 'text-sage-600'}`} />
                      </div>
                      <h3 className="text-sm font-medium text-foreground mb-1">
                        {item.text}
                      </h3>
                      <div className={`text-lg font-bold ${item.color === 'terracotta' ? 'text-terracotta-600' : 'text-sage-600'}`}>
                        {item.stat}
                      </div>
                      <p className="text-[10px] text-muted-foreground">{item.statLabel}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
            
            <ScrollReveal delay={0.3}>
              <p className="text-xs text-muted-foreground text-center mt-8">
                * Gemiddelde resultaten uit meta-analyses van MSC-onderzoek (Neff & Germer, 2013-2023)
              </p>
            </ScrollReveal>
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
                  Programma & <span className="font-serif italic text-terracotta-600">Data</span>
                </h2>
              </div>
              
              {/* Service Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                <Card className="border-warm-200 bg-white hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group text-center">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      <Calendar className="h-7 w-7 text-terracotta-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">8-weekse MSC Training</h3>
                    <p className="text-xs text-muted-foreground mb-3">8 sessies van 2 uur · online · incl. stilte-retreat</p>
                    <p className="text-sm text-muted-foreground mb-4">Diepgaand programma om zelfcompassie stap voor stap te ontwikkelen en te integreren in je dagelijks leven.</p>
                    <p className="text-xl font-light text-terracotta-600">€550</p>
                  </CardContent>
                </Card>
                
                <Card className="border-warm-200 bg-white hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group text-center">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      <Sparkles className="h-7 w-7 text-sage-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Workshop Zelfcompassie</h3>
                    <p className="text-xs text-muted-foreground mb-3">1 sessie van 1 uur · online · geen voorkennis nodig</p>
                    <p className="text-sm text-muted-foreground mb-4">Maak kennis met de basis van zelfcompassie in een laagdrempelige, interactieve sessie.</p>
                    <p className="text-xl font-light text-terracotta-600">€45</p>
                  </CardContent>
                </Card>
                
                <Card className="border-warm-200 bg-white hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group text-center">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      <Heart className="h-7 w-7 text-terracotta-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Individuele Begeleiding</h3>
                    <p className="text-xs text-muted-foreground mb-3">Individueel · op maat · online of op locatie</p>
                    <p className="text-sm text-muted-foreground mb-4">Persoonlijke begeleiding afgestemd op jouw situatie, in je eigen tempo en ritme.</p>
                    <p className="text-xl font-light text-terracotta-600">€75 per sessie</p>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>

            {/* 8-Weekse Training */}
            <ScrollReveal delay={0.1}>
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-terracotta-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-terracotta-600" />
                  </div>
                  <h3 className="text-2xl font-medium text-foreground">8-weekse MSC Training</h3>
                </div>
                
                {/* Format Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
                            <Button 
                              className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full"
                              onClick={() => openRegistration(training)}
                            >
                              Reserveer
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>

            {/* Divider */}
            <div className="flex items-center gap-4 my-12">
              <div className="h-px flex-1 bg-warm-300" />
              <Leaf className="h-5 w-5 text-sage-400" />
              <div className="h-px flex-1 bg-warm-300" />
            </div>

            {/* Workshops */}
            <ScrollReveal delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-sage-100 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-sage-600" />
                  </div>
                  <h3 className="text-2xl font-medium text-foreground">Workshops</h3>
                  <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">1 uur • €45</span>
                </div>
                
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  Laagdrempelige kennismaking met zelfcompassie. Geen voorbereiding nodig.
                </p>
                
                <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {workshopDates.map((workshop, index) => (
                    <StaggerItem key={index}>
                      <Card className="border-warm-200 bg-white hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group h-full">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              workshop.lang === "Nederlands" 
                                ? "bg-terracotta-100 text-terracotta-700" 
                                : "bg-sage-100 text-sage-700"
                            }`}>
                              {workshop.lang}
                            </span>
                          </div>
                          <p className="text-base font-medium text-foreground mb-1">{workshop.date}</p>
                          <p className="text-sm text-muted-foreground mb-4">{workshop.time}</p>
                          <Button 
                            size="sm" 
                            className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full"
                            onClick={() => openWorkshopRegistration(workshop)}
                          >
                            Meld je aan
                          </Button>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
            
            {/* Divider */}
            <div className="flex items-center gap-4 my-12">
              <div className="h-px flex-1 bg-warm-300" />
              <Leaf className="h-5 w-5 text-sage-400" />
              <div className="h-px flex-1 bg-warm-300" />
            </div>

            {/* Wekelijkse Sessies */}
            <ScrollReveal delay={0.25}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-terracotta-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-terracotta-600" />
                  </div>
                  <h3 className="text-2xl font-medium text-foreground">Wekelijkse Sessies</h3>
                  <span className="rounded-full bg-terracotta-100 px-3 py-1 text-xs font-medium text-terracotta-700">30 min • Gratis</span>
                </div>
                
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  Sluit wekelijks aan voor een korte, geleide meditatiesessie. Geen ervaring nodig — gewoon even pauzeren en opladen.
                </p>
                
                <StaggerContainer className="grid gap-4 md:grid-cols-2">
                  {weeklySessions.map((session, index) => (
                    <StaggerItem key={index}>
                      <Card className="border-warm-200 bg-white hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group h-full">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              session.lang === "Nederlands" 
                                ? "bg-terracotta-100 text-terracotta-700" 
                                : "bg-sage-100 text-sage-700"
                            }`}>
                              {session.lang}
                            </span>
                            <span className="text-xs text-muted-foreground font-medium">{session.price}</span>
                          </div>
                          <p className="text-base font-medium text-foreground mb-1">Elke {session.day}</p>
                          <p className="text-sm text-muted-foreground mb-2">{session.time}</p>
                          <p className="text-sm text-muted-foreground mb-4">{session.description}</p>
                          <Button 
                            size="sm" 
                            className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full"
                            onClick={() => openWeeklyRegistration(session)}
                          >
                            Meld je aan
                          </Button>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>

            {/* Divider */}
            <div className="flex items-center gap-4 my-12">
              <div className="h-px flex-1 bg-warm-300" />
              <Leaf className="h-5 w-5 text-sage-400" />
              <div className="h-px flex-1 bg-warm-300" />
            </div>

            {/* Individuele Begeleiding */}
            <ScrollReveal delay={0.3}>
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-terracotta-100 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-terracotta-600" />
                  </div>
                  <h3 className="text-2xl font-medium text-foreground">Individuele Begeleiding</h3>
                  <span className="rounded-full bg-terracotta-100 px-3 py-1 text-xs font-medium text-terracotta-700">PERSOONLIJK</span>
                </div>
                
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Naast de groepstraining bied ik ook individuele begeleiding aan. Ideaal als je liever in je eigen tempo werkt, of persoonlijke thema's wilt verkennen in een veilige, één-op-één setting.
                </p>
                
                <Card className="border-warm-200 rounded-3xl overflow-hidden max-w-md mx-auto">
                  <CardContent className="p-8 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-6 mx-auto">
                      <Heart className="h-8 w-8 text-terracotta-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">Individuele begeleiding</h4>
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
              </div>
            </ScrollReveal>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <Link to="/agenda">
                  Bekijk volledige agenda
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 border border-sage-200 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Veelgestelde vragen
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Veelgestelde <span className="font-serif italic text-terracotta-600">vragen</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Heb je vragen over de training? Hier vind je antwoorden op de meest gestelde vragen.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem 
                  value="item-0"
                  className="border border-warm-200 rounded-xl px-6 bg-white shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    Heb ik ervaring nodig met meditatie?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Nee, geen ervaring nodig. De training is geschikt voor iedereen, of je nu nog nooit hebt gemediteerd of al jaren oefent. We beginnen bij de basis en bouwen stap voor stap op.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="item-1"
                  className="border border-warm-200 rounded-xl px-6 bg-white shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    Wat als ik een sessie mis?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Alle sessies worden opgenomen en zijn beschikbaar in de online leeromgeving. Je kunt de inhoud op je eigen tempo terugkijken. Daarnaast krijg je toegang tot extra materialen en oefeningen.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="item-2"
                  className="border border-warm-200 rounded-xl px-6 bg-white shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    Is de training ook geschikt bij trauma?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    De training heeft een trauma-sensitieve benadering. Bij ernstige trauma's adviseren we eerst individuele begeleiding te volgen voordat je aan de groepstraining begint. Neem gerust contact op om te bespreken wat het beste bij jou past.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="item-3"
                  className="border border-warm-200 rounded-xl px-6 bg-white shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    Hoeveel tijd kost het per week?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Naast de wekelijkse sessies van 2 uur, is het aan te raden om dagelijks 20-30 minuten te oefenen. Dit is flexibel en kan worden aangepast aan jouw ritme. De oefeningen zijn ook in kortere versies beschikbaar.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem 
                  value="item-4"
                  className="border border-warm-200 rounded-xl px-6 bg-white shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    Kan ik in termijnen betalen?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Ja, betalen in termijnen is mogelijk. Neem contact op om de mogelijkheden te bespreken. We kijken graag samen naar een oplossing die bij jouw situatie past.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-terracotta-50/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage-50/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  <Heart className="h-3.5 w-3.5" />
                  Ervaringen
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Wat deelnemers <span className="font-serif italic text-terracotta-600">zeggen</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Ontdek hoe de MSC-training het leven van anderen heeft veranderd.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {[
                    {
                      quote: "Deze training heeft mijn relatie met mezelf volledig veranderd. Ik ben nu veel milder voor mezelf en dat straalt uit naar alles om me heen.",
                      name: "Marieke",
                      role: "Deelnemer voorjaar 2025",
                    },
                    {
                      quote: "Eindelijk begrijp ik dat zelfcompassie geen zwakte is, maar juist kracht geeft. De oefeningen gebruik ik nog dagelijks.",
                      name: "Thomas",
                      role: "Deelnemer najaar 2024",
                    },
                    {
                      quote: "De veilige sfeer in de groep maakte het mogelijk om echt open te zijn. Een transformerende ervaring die ik iedereen gun.",
                      name: "Sandra",
                      role: "Deelnemer zomer 2025",
                    },
                    {
                      quote: "Als perfectionist was zelfkritiek mijn tweede natuur. Nu heb ik tools om mezelf met meer vriendelijkheid te benaderen.",
                      name: "Erik",
                      role: "Deelnemer voorjaar 2024",
                    },
                    {
                      quote: "De combinatie van theorie en praktijk werkt heel goed. Je begrijpt niet alleen wat zelfcompassie is, maar voelt het ook echt.",
                      name: "Lotte",
                      role: "Deelnemer winter 2024",
                    },
                    {
                      quote: "Ik had niet verwacht dat 8 weken zo'n impact konden hebben. Dit is een cadeau aan mezelf dat blijft geven.",
                      name: "Jasper",
                      role: "Deelnemer najaar 2025",
                    },
                  ].map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full border-warm-200 bg-gradient-to-br from-warm-50 to-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-terracotta-400 text-terracotta-400" />
                            ))}
                          </div>
                          <Quote className="h-8 w-8 text-terracotta-200 mb-3 group-hover:text-terracotta-300 transition-colors" />
                          <p className="text-muted-foreground leading-relaxed flex-grow mb-6 italic">
                            "{testimonial.quote}"
                          </p>
                          <div className="flex items-center gap-3 pt-4 border-t border-warm-200">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-terracotta-200 to-terracotta-300 flex items-center justify-center text-white font-semibold text-sm">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-8">
                  <CarouselPrevious className="relative static translate-y-0 bg-white border-warm-200 hover:bg-terracotta-50 hover:border-terracotta-200" />
                  <CarouselNext className="relative static translate-y-0 bg-white border-warm-200 hover:bg-terracotta-50 hover:border-terracotta-200" />
                </div>
              </Carousel>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Contact Info */}
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
                    Neem gerust contact met ons op. We reageren meestal binnen 24 uur.
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
              
              {/* Form */}
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

      {/* Registration Modal */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">
              Aanmelden voor de training
            </DialogTitle>
          </DialogHeader>
          {selectedTraining && (
            <RegistrationForm
              trainingName={`8-weekse MSC Training (${selectedTraining.language})`}
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

      {/* Workshop Registration Modal */}
      <Dialog open={isWorkshopRegistrationOpen} onOpenChange={setIsWorkshopRegistrationOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">
              Aanmelden voor de workshop
            </DialogTitle>
          </DialogHeader>
          {selectedWorkshop && (
            <RegistrationForm
              trainingName={`Workshop Zelfcompassie (${selectedWorkshop.lang})`}
              trainingDate={selectedWorkshop.date}
              trainingTime={selectedWorkshop.time}
              price={selectedWorkshop.price}
              onSuccess={() => {
                setTimeout(() => setIsWorkshopRegistrationOpen(false), 2000);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Weekly Session Registration Modal */}
      <Dialog open={isWeeklyRegistrationOpen} onOpenChange={setIsWeeklyRegistrationOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">
              Aanmelden voor wekelijkse sessie
            </DialogTitle>
          </DialogHeader>
          {selectedWeekly && (
            <RegistrationForm
              trainingName={`Wekelijkse Sessie (${selectedWeekly.lang})`}
              trainingDate={`Elke ${selectedWeekly.day}`}
              trainingTime={selectedWeekly.time}
              price={selectedWeekly.price}
              onSuccess={() => {
                setTimeout(() => setIsWeeklyRegistrationOpen(false), 2000);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MindfulZelfcompassie;