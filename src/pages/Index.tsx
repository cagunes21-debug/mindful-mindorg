import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Sparkles, ArrowRight, Check, Mail, Phone, MessageCircle, Clock, Users, Globe, Calendar, Quote, TrendingDown, TrendingUp, Shield, Zap, Mountain, Building2, MapPin, GraduationCap, Award, Send } from "lucide-react";
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

// Programs data removed - now inline in the section below

const stats = [
  { label: "stress", value: "36%", direction: "down" },
  { label: "zelfkritiek", value: "67%", direction: "down" },
  { label: "veerkracht", value: "42%", direction: "up" },
  { label: "gezonde grenzen", value: "38%", direction: "up" },
  { label: "verbinding", value: "29%", direction: "up" },
];

const testimonials = [
  {
    quote: "Ik ben veel vriendelijker voor mezelf geworden — en dat verandert alles.",
    author: "Marieke",
  },
  {
    quote: "Mijn lichaam herinnerde zich opeens weer hoe het moest ademen.",
    author: "Retreat-deelnemer",
  },
  {
    quote: "Het voelde veilig. Alsof mijn lichaam eindelijk mocht leiden.",
    author: "Retreat-deelnemer",
  },
];

const targetAudience = [
  "Je bent perfectionistisch of streng voor jezelf",
  "Je ervaart stress of emoties lichamelijk",
  "Je verlangt naar meer rust, vriendelijkheid en levensvreugde",
  "Je staat open voor een ervaringsgerichte manier van leren",
];

const methodPillars = [
  {
    title: "Mind",
    subtitle: "Je gedachten & emoties",
    icon: Brain,
    color: "terracotta",
    items: [
      "Leer vriendelijker en zachter met jezelf om te gaan",
      "Ontwikkel vaardigheden om zelfkritiek en moeilijke emoties te verzachten",
    ],
  },
  {
    title: "Body",
    subtitle: "Je lichaam & energie",
    icon: Sparkles,
    color: "sage",
    items: [
      "Word je bewust van spanning en ontspanning",
      "Leer luisteren naar de signalen van je lichaam",
      "Ervaar zachte, vrije en speelse beweging",
    ],
  },
  {
    title: "Heart",
    subtitle: "Je gevoelswereld",
    icon: Heart,
    color: "warm",
    items: [
      "Herverbind met je emoties",
      "Ervaar compassie, warmte en levensvreugde",
      "Ontwikkel een diepere verbinding met jezelf en anderen",
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
        title="Mindful Mind | Kom Thuis Bij Jezelf"
        description="Wetenschappelijk onderbouwde mindfulness, meditatie en zelfcompassie-trainingen. Verminder stress, verzacht zelfkritiek en vind innerlijke rust in 8 weken."
      />
      <OrganizationSchema />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-44 bg-warm-50">
        <div className="absolute inset-0">
          <img 
            src={heroMindfulness} 
            alt="Mindfulness meditation in nature" 
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
                Mind · Lichaam · Hart
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
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            >
              Wetenschappelijk onderbouwde mindfulness, meditatie en zelfcompassie — via trainingen, workshops en coaching.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
            >
              Verzacht stress en zelfkritiek, en ontmoet jezelf met meer rust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg hover:shadow-xl transition-all">
                <a href="#programmas">
                  Reserveer je plek
                  <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-7 text-lg">
                <Link to="/bedrijven">
                  <Building2 className="mr-2 h-5 w-5" />
                  Voor Organisaties
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-2xl font-light text-foreground md:text-3xl lg:text-4xl leading-tight">
                Vertragen. Voelen. <span className="font-serif italic text-terracotta-600">Ontspannen.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Onze zachte, wetenschappelijk onderbouwde programma's verbinden je opnieuw met je gedachten, lichaam en hart.
              </p>
              <p className="text-terracotta-600 font-medium mb-8">
                Menselijk. Gegrond. Wetenschappelijk onderbouwd.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all">
                  <a href="#programmas">
                    Voor Particulieren
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-6 text-base">
                  <Link to="/bedrijven">
                    <Building2 className="mr-2 h-5 w-5" />
                    Voor Organisaties
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Offerings Section */}
      <section className="py-16 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  Ons Aanbod
                </span>
              </div>
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <Link to="/" className="group block bg-white hover:bg-terracotta-50 border border-warm-200 hover:border-terracotta-300 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🌱</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-terracotta-700 transition-colors">
                        Mindful Zelfcompassie (MSC) Training
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Transformeer zelfkritiek in zelfcompassie en cultiveer innerlijke steun.
                      </p>
                      <p className="text-sm text-terracotta-600 font-medium">
                        Ons vlaggenschipprogramma begeleidt je zacht op de reis.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-terracotta-400 group-hover:text-terracotta-600 transition-colors mt-1" />
                  </div>
                </Link>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <Link to="/agenda" className="group block bg-white hover:bg-terracotta-50 border border-warm-200 hover:border-terracotta-300 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">✨</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-terracotta-700 transition-colors">
                        Workshops
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Een zachte manier om mindfulness en zelfcompassie te verkennen en verdiepen.
                      </p>
                      <p className="text-sm text-terracotta-600 font-medium">
                        Ideaal om te beginnen of je beoefening uit te breiden.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-terracotta-400 group-hover:text-terracotta-600 transition-colors mt-1" />
                  </div>
                </Link>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <Link to="/coaching" className="group block bg-white hover:bg-terracotta-50 border border-warm-200 hover:border-terracotta-300 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🤍</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-terracotta-700 transition-colors">
                        Coaching
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Begeleiding op jouw tempo en afgestemd op je persoonlijke reis.
                      </p>
                      <p className="text-sm text-terracotta-600 font-medium">
                        Ontvang één-op-één ondersteuning bij het verkennen van je pad.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-terracotta-400 group-hover:text-terracotta-600 transition-colors mt-1" />
                  </div>
                </Link>
              </ScrollReveal>
            </div>
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
                   Herken je dit <span className="font-serif italic text-terracotta-600">gevoel?</span>
                 </h2>
               </div>
               
               <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                 <h3 className="text-xl font-semibold text-foreground">
                   Voel je je vaak gespannen of streng voor jezelf?
                 </h3>
                 <p>
                   Je hoofd staat nooit stil. Je wilt het goed doen, je bent kritisch op jezelf en je gaat maar door — ook als je lichaam signalen geeft om te vertragen.
                 </p>
                 <p>
                   Je verlangt naar zachtheid, maar de spanning blijft.
                 </p>
               </div>
             </ScrollReveal>
             
             <ScrollReveal delay={0.1}>
               <div className="mt-16">
                 <h3 className="text-2xl font-light text-foreground mb-6">
                   Je staat er niet <span className="font-serif italic text-terracotta-600">alleen</span> voor
                 </h3>
                 <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                   <p>
                     Misschien heb je al veel geprobeerd: boeken, cursussen, adviezen, technieken.
                   </p>
                   <p>
                     En toch komen stress, innerlijke onrust of uitputting steeds terug.
                   </p>
                   <div className="bg-terracotta-50 border-l-4 border-terracotta-400 rounded-r-xl p-6 my-8">
                     <p className="text-foreground font-medium mb-2">
                       Het probleem is niet dat je te weinig doet.
                     </p>
                     <p className="text-foreground font-medium">
                       Het probleem is dat je te lang te streng voor jezelf bent geweest — en dat uiteindelijk je gedachten, lichaam en hart uit balans raken.
                     </p>
                   </div>
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
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  Onze Aanpak
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Mind · Lichaam · <span className="font-serif italic text-terracotta-600">Hart</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="text-center mb-16">
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
                  Echte verandering ontstaat wanneer je alles van jezelf meeneemt: je gedachten, je lichaam en je gevoelswereld.
                </p>
                <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                  Onze programma's combineren:
                </p>
                <ul className="text-muted-foreground text-base max-w-lg mx-auto mt-4 space-y-1">
                  <li>• Mindful Zelfcompassie (MSC)</li>
                  <li>• Mindfulness en meditatie</li>
                  <li>• Lichaamsbewustzijn en zachte beweging</li>
                </ul>
                <p className="text-foreground text-lg mt-6 font-medium">
                  Samen nodigen ze je uit om te vertragen, te verzachten en met meer rust thuis te komen bij jezelf.
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

            <ScrollReveal delay={0.3}>
              <div className="text-center mt-12">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                    <a href="#programmas">
                      Reserveer je plek
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-6 text-lg">
                    <Link to="/bedrijven">
                      <Building2 className="mr-2 h-5 w-5" />
                      Voor Organisaties
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-terracotta-600 to-terracotta-700">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold tracking-wider text-white/90 mb-6 uppercase">
                  Wetenschappelijk Onderbouwd
                </span>
                <p className="text-white/80 text-base max-w-3xl mx-auto mb-6">
                  Mindful Zelfcompassie is ontwikkeld door Dr. Kristin Neff en Dr. Christopher Germer en wordt ondersteund door meer dan 3.500 wetenschappelijke studies.
                </p>
                <p className="text-white font-medium mb-8">
                  Gemiddelde resultaten uit MSC-onderzoek:
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
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programmas" className="py-24 lg:py-32 bg-warm-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                  Ons Aanbod
                </span>
                <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Programma's & <span className="font-serif italic text-terracotta-600">Begeleiding</span>
                </h2>
                <p className="text-terracotta-600 font-medium mb-4">
                  Voor particulieren en organisaties
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-muted-foreground text-base mb-4">
                  Onze programma's helpen je spanning los te laten, innerlijke rust te vinden en opnieuw verbinding te maken met je gedachten, lichaam en hart.
                </p>
                <p className="text-muted-foreground text-base mb-4">
                  Wij bieden:
                </p>
                <ul className="text-muted-foreground text-base space-y-1 mb-6">
                  <li><strong>Particulieren:</strong> 8-weekse Mindful Zelfcompassie-training, workshops, retreat en 1-op-1 begeleiding</li>
                  <li><strong>Organisaties:</strong> trainingen en workshops voor teams, afdelingen en leidinggevenden</li>
                </ul>
                <Button asChild variant="link" className="text-terracotta-600 hover:text-terracotta-700">
                  <Link to="/bedrijven">
                    👉 Lees meer over samenwerking met organisaties
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* Main product: 8-weekse MSC Training */}
              <ScrollReveal delay={0.1}>
                <Card className="h-full ring-2 ring-terracotta-300 bg-gradient-to-br from-white to-terracotta-50 border-warm-200 shadow-sm hover:shadow-lg transition-all">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-14 w-14 rounded-2xl bg-terracotta-500 flex items-center justify-center shrink-0">
                        <span className="text-2xl">🌱</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">8-weekse Mindful Zelfcompassie-training</h3>
                        <p className="text-terracotta-600 text-sm font-medium">8 sessies van 2 uur · online · inclusief stilte-retreat</p>
                      </div>
                    </div>
                    <p className="text-foreground font-medium text-sm mb-4">
                      Een verdiepend programma waarin je stap voor stap zelfcompassie ontwikkelt en leert integreren in je dagelijks leven.
                    </p>
                    <div className="flex items-center mb-6">
                      <span className="text-2xl font-light text-terracotta-600">€ 550</span>
                    </div>
                    <div className="mt-auto flex flex-col gap-2">
                      <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                        <Link to="/">
                          <Send className="mr-2 h-4 w-4" />
                          Schrijf je in
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" className="text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50">
                        <Link to="/">
                          Meer informatie
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Right column: Workshops + Weekly Sessions stacked */}
              <div className="flex flex-col gap-6">
                <ScrollReveal delay={0.15}>
                  <Card className="bg-white border-warm-200 shadow-sm hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">🧘</span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Wekelijkse sessies mindfulness & zelfcompassie</h3>
                          <p className="text-terracotta-600 text-xs font-medium">1 uur per sessie · online</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        Korte, regelmatige sessies om mindfulness en zelfcompassie dagelijks te oefenen en te verankeren.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-light text-terracotta-600">€ 15 <span className="text-sm text-muted-foreground">per sessie</span></span>
                        <Button asChild size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                          <Link to="/agenda">
                            <Send className="mr-1.5 h-3.5 w-3.5" />
                            Aanmelden
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <Card className="bg-white border-warm-200 shadow-sm hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">✨</span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Workshop Zelfcompassie</h3>
                          <p className="text-terracotta-600 text-xs font-medium">1 online sessie van 1 uur · geen voorkennis nodig</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        Maak op een laagdrempelige en interactieve manier kennis met de basis van zelfcompassie.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-light text-terracotta-600">€ 35</span>
                        <Button asChild size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                          <Link to="/agenda">
                            <Send className="mr-1.5 h-3.5 w-3.5" />
                            Aanmelden
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>

              {/* Individuele begeleiding - full width */}
              <ScrollReveal delay={0.25} className="md:col-span-2">
                <Card className="bg-white border-warm-200 shadow-sm hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl">🤍</span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Individuele begeleiding</h3>
                          <p className="text-terracotta-600 text-xs font-medium">Individueel · op maat · online of op locatie</p>
                          <p className="text-muted-foreground text-sm mt-2">
                            Persoonlijke begeleiding, afgestemd op jouw situatie, tempo en behoeften.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 md:shrink-0">
                        <span className="text-lg font-light text-terracotta-600">€ 75 <span className="text-sm text-muted-foreground">per sessie</span></span>
                        <Button asChild size="sm" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                          <Link to="/coaching">
                            <Send className="mr-1.5 h-3.5 w-3.5" />
                            Aanmelden
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* For Organizations Card */}
            <ScrollReveal delay={0.3}>
              <Card className="mt-8 bg-gradient-to-br from-sage-50 to-warm-50 border-sage-200">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-sage-100 flex items-center justify-center shrink-0">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">Voor Organisaties</h3>
                      <p className="text-sage-700 text-sm font-medium mb-4">Teams, afdelingen & leidinggevenden</p>
                      <p className="text-muted-foreground mb-4">
                        Investeer in welzijn, veerkracht en verbinding binnen je team.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                          Wetenschappelijk onderbouwde trainingen
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                          Mindful Zelfcompassie & mindfulness voor professionele contexten
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                          Online of op locatie
                        </li>
                      </ul>
                      <Button asChild className="bg-sage-600 hover:bg-sage-700 text-white rounded-full">
                        <Link to="/bedrijven">
                          👉 Lees meer over samenwerking met organisaties
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                 <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                   Voor wie is dit <span className="font-serif italic text-terracotta-600">geschikt?</span>
                 </h2>
                 <p className="text-muted-foreground text-lg mb-8">
                   Deze programma's zijn voor jou als:
                 </p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {targetAudience.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-warm-50 rounded-xl p-5 shadow-sm border border-warm-200">
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
      <section className="py-24 lg:py-32 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  Ervaringen
                </span>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <Card className="h-full bg-white border-warm-200">
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
              <div className="text-center mt-8">
                 <p className="text-muted-foreground mb-6">
                   Meer dan 250 deelnemers hebben onze MSC-training gevolgd en ervaren minder stress en meer innerlijke rust.
                 </p>
                 <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                   <Link to="/trainers">
                     👉 Lees meer ervaringen
                     <ArrowRight className="ml-2 h-4 w-4" />
                   </Link>
                 </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-block rounded-full bg-terracotta-100 px-5 py-2 text-xs font-semibold tracking-wider text-terracotta-700 mb-6 uppercase">
                Praktisch & Contact
              </span>
              <p className="text-muted-foreground text-lg mb-8">
                Workshops · Trainingen · Retreats · 1-op-1 Coaching
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a 
                  href="mailto:mindful-mind@outlook.com" 
                  className="flex items-center gap-2 bg-warm-50 rounded-full px-6 py-3 text-muted-foreground hover:text-terracotta-600 transition-colors shadow-sm border border-warm-200"
                >
                  <Mail className="h-4 w-4" />
                  mindful-mind@outlook.com
                </a>
                <a 
                  href="https://wa.me/31625633379" 
                  className="flex items-center gap-2 bg-warm-50 rounded-full px-6 py-3 text-muted-foreground hover:text-terracotta-600 transition-colors shadow-sm border border-warm-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  +31 6 25633379 (WhatsApp)
                </a>
              </div>

              <p className="text-muted-foreground text-sm mb-8">
                Bereikbaar: ma–vr, 9:00–17:00
              </p>
              
              <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                <Link to="/agenda">
                  👉 Bekijk de volledige agenda
                  <Calendar className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
