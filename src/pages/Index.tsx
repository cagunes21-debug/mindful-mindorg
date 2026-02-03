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
    title: "8-weekse Mindful Zelfcompassie Training",
    subtitle: "Online | Live in kleine groepen",
    icon: Globe,
    emoji: "🌱",
    features: [
      "8 weken + optionele stilte-retreat",
      "2 uur per sessie",
      "Nederlands of Engels",
      "Startdata: 16 februari 2026 (NL), 22 april 2026 (EN)",
    ],
    price: "€550",
    description: "Leer stress en zelfkritiek verzachten in 8 weken.",
    cta: "Reserveer je plek",
    secondaryCta: "Bekijk overzicht data",
    link: "/mindful-zelfcompassie",
    highlight: true,
  },
  {
    title: "Workshops",
    subtitle: "Laagdrempelig kennismaken | Online of fysiek",
    icon: Clock,
    emoji: "✨",
    features: [
      "1 uur",
      "Praktische oefeningen voor directe rust en mildheid",
      "Laagdrempelig kennismaken met mindfulness & zelfcompassie",
    ],
    price: "€35",
    description: "Probeer het eerst in een korte, praktische sessie.",
    cta: "Bekijk workshops",
    secondaryCta: "Bekijk data & tijden",
    link: "/agenda",
  },
  {
    title: "5-daagse MSC & Beweging Retreat",
    subtitle: "Barcelona | 2026",
    icon: Mountain,
    emoji: "🌿",
    features: [
      "Inclusief overnachtingen & maaltijden",
      "Volledig mindfulness-, MSC- en bewegingsprogramma",
      "Kleine groep, veel persoonlijke aandacht",
    ],
    price: "2026",
    description: "Ervaar diepe ontspanning en verbinding in een intensief retreat.",
    cta: "Meld je aan voor de retreat",
    secondaryCta: "Bekijk planning & data",
    link: "/barcelona-retreat",
  },
  {
    title: "1-op-1 begeleiding",
    subtitle: "Persoonlijke verdieping | Online of op locatie",
    icon: Heart,
    emoji: "🤍",
    features: [
      "Individuele sessies",
      "Gericht op verdieping of specifieke uitdagingen",
      "Op aanvraag",
    ],
    price: "Op aanvraag",
    description: "Werk in je eigen tempo aan persoonlijke thema's.",
    cta: "Plan een 1-op-1 sessie",
    secondaryCta: "Bekijk mogelijke data",
    link: "/coaching",
  },
];

const stats = [
  { label: "stress", value: "36%", direction: "down" },
  { label: "zelfkritiek", value: "67%", direction: "down" },
  { label: "veerkracht", value: "42%", direction: "up" },
  { label: "gezonde grenzen", value: "38%", direction: "up" },
  { label: "verbinding", value: "29%", direction: "up" },
];

const testimonials = [
  {
    quote: "Ik ben zachter geworden voor mezelf — en dat verandert alles.",
    author: "Marieke",
  },
  {
    quote: "Mijn lichaam wist ineens weer hoe het moest ademen.",
    author: "Retreatdeelnemer",
  },
  {
    quote: "Het voelde veilig. Alsof mijn lijf eindelijk mocht leiden.",
    author: "Retreatdeelnemer",
  },
];

const targetAudience = [
  "Perfectionistisch of streng voor jezelf bent",
  "Stress of emoties vooral lichamelijk ervaart",
  "Verlangt naar meer rust, mildheid en levenslust",
  "Openstaat voor een ervaringsgerichte manier van leren",
];

const methodPillars = [
  {
    title: "Mind",
    subtitle: "Je gedachten & emoties",
    icon: Brain,
    color: "terracotta",
    items: [
      "Leer vriendelijker en milder met jezelf omgaan",
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
      "Kom opnieuw in contact met je emoties",
      "Ervaar compassie, warmte en levenslust",
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
        title="Mindful Mind | Kom thuis bij jezelf"
        description="Wetenschappelijk onderbouwde mindfulness-, meditatie- en zelfcompassietrainingen. Verlaag stress, verzacht zelfkritiek en vind innerlijke rust in 8 weken."
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
              Wetenschappelijk onderbouwde mindfulness-, meditatie- en zelfcompassietrainingen
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
            >
              Verlaag stress, verzacht zelfkritiek en vind innerlijke rust in 8 weken.
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

      {/* Intro Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-2xl font-light text-foreground md:text-3xl lg:text-4xl leading-tight">
                Vertraag. Voel. <span className="font-serif italic text-terracotta-600">Ontspan.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Onze programma's helpen je spanning los te laten en opnieuw verbinding te maken met je hoofd, je lichaam en je hart — voor meer rust, mildheid en levenslust.
              </p>
              <p className="text-foreground text-xl font-medium mb-10">
                Kom thuis bij jezelf
              </p>
              <p className="text-terracotta-600 font-medium mb-10">
                Zacht. Wetenschappelijk onderbouwd. Menselijk.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                  <Link to="/mindful-zelfcompassie">
                    👉 Reserveer MSC Training
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                  <Link to="/agenda">
                    👉 Bekijk Workshops
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                  <Link to="/barcelona-retreat">
                    👉 Meld je aan voor Retreat
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                  <Link to="/coaching">
                    👉 1-op-1 begeleiding
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 lg:py-32 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Herken je <span className="font-serif italic text-terracotta-600">dit?</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <h3 className="text-xl font-semibold text-foreground">
                  Voel je je vaak gespannen of streng voor jezelf?
                </h3>
                <p>
                  Je hoofd staat nooit stil. Je wilt het goed doen, bent kritisch op jezelf en blijft doorgaan — ook wanneer je lichaam signalen geeft om te stoppen.
                </p>
                <p>
                  Je verlangt naar meer zachtheid, maar diep vanbinnen blijft de spanning aanwezig.
                </p>
                <p>
                  Misschien heb je al veel geprobeerd: boeken gelezen, trainingen gevolgd, adviezen toegepast. En toch keren stress, innerlijke onrust of uitputting steeds terug.
                </p>
                <div className="bg-terracotta-50 border-l-4 border-terracotta-400 rounded-r-xl p-6 my-8">
                  <p className="text-foreground font-medium mb-2">
                    Het probleem is niet dat je te weinig doet.
                  </p>
                  <p className="text-foreground font-medium">
                    Het probleem is dat je al te lang te hard bent voor jezelf. Daarom raken hoofd, lichaam en hart uit balans.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Method Section - Mind, Body, Heart */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-sage-100 px-5 py-2 text-xs font-semibold tracking-wider text-sage-700 mb-6 uppercase">
                  Onze benadering
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Mind · Body · <span className="font-serif italic text-terracotta-600">Heart</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="text-center mb-16">
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
                  Echte verandering ontstaat wanneer je alles meeneemt: je gedachten, je lichaam én je gevoelswereld.
                </p>
                <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                  Onze programma's combineren:
                </p>
                <ul className="text-muted-foreground text-base max-w-lg mx-auto mt-4 space-y-1">
                  <li>• Mindful Zelfcompassie (MSC)</li>
                  <li>• Mindfulness & meditatie</li>
                  <li>• Lichaamsbewustzijn en zachte beweging</li>
                </ul>
                <p className="text-foreground text-lg mt-6 font-medium">
                  Samen nodigen ze je uit om te vertragen, te verzachten en weer thuis te komen bij jezelf.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-3">
              {methodPillars.map((pillar, index) => (
                <StaggerItem key={index}>
                  <Card className="h-full bg-warm-50 border-warm-200 shadow-sm hover:shadow-md transition-shadow">
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
                  Wetenschappelijk onderbouwd
                </span>
                <p className="text-white/80 text-base max-w-3xl mx-auto mb-6">
                  Mindful Zelfcompassie is ontwikkeld door Dr. Kristin Neff en Dr. Christopher Germer en wordt ondersteund door meer dan 3.500 wetenschappelijke studies.
                </p>
                <p className="text-white font-medium mb-8">
                  Gemiddelde resultaten uit MSC-onderzoek laten zien:
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
                  Ons aanbod
                </span>
                <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                  Programma's & <span className="font-serif italic text-terracotta-600">begeleiding</span>
                </h2>
                <p className="text-terracotta-600 font-medium mb-4">
                  Voor individuen én organisaties
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-muted-foreground text-base mb-4">
                  Onze programma's helpen je spanning los te laten, innerlijke rust te vinden en opnieuw verbinding te maken met je hoofd, lichaam en hart — zowel persoonlijk als binnen teams en afdelingen.
                </p>
                <p className="text-muted-foreground text-base mb-4">
                  We bieden:
                </p>
                <ul className="text-muted-foreground text-base space-y-1 mb-6">
                  <li><strong>Individuele trajecten:</strong> 8-weekse Mindful Zelfcompassie Training, workshops, retreats en 1-op-1 begeleiding</li>
                  <li><strong>Organisaties:</strong> trainingen en workshops voor teams, afdelingen en leidinggevenden, online of op locatie</li>
                </ul>
                <Button asChild variant="link" className="text-terracotta-600 hover:text-terracotta-700">
                  <Link to="/bedrijven">
                    👉 Lees meer over samenwerken met organisaties
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-2">
              {programs.map((program, index) => (
                <StaggerItem key={index}>
                  <Card className={`h-full border-warm-200 shadow-sm hover:shadow-lg transition-all ${program.highlight ? 'ring-2 ring-terracotta-300 bg-gradient-to-br from-white to-terracotta-50' : 'bg-white'}`}>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${program.highlight ? 'bg-terracotta-500' : 'bg-terracotta-100'}`}>
                          <span className="text-2xl">{program.emoji}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{program.title}</h3>
                          <p className="text-terracotta-600 text-sm font-medium">{program.subtitle}</p>
                        </div>
                      </div>

                      {program.description && (
                        <p className="text-foreground font-medium text-sm mb-4">{program.description}</p>
                      )}
                      
                      <ul className="space-y-2 mb-6">
                        {program.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-terracotta-500 mt-0.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-light text-terracotta-600">{program.price}</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button asChild className={program.highlight ? 'bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full' : 'bg-terracotta-100 hover:bg-terracotta-200 text-terracotta-700 rounded-full'}>
                          <Link to={program.link}>
                            👉 {program.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        {program.secondaryCta && (
                          <Button asChild variant="ghost" className="text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50">
                            <Link to={program.link}>
                              👉 {program.secondaryCta}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* For Organizations Card */}
            <ScrollReveal delay={0.3}>
              <Card className="mt-8 bg-gradient-to-br from-sage-50 to-warm-50 border-sage-200">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-sage-100 flex items-center justify-center shrink-0">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">Voor organisaties</h3>
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
                          Mindful Zelfcompassie & mindfulness voor professionele context
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                          Online of op locatie
                        </li>
                      </ul>
                      <Button asChild className="bg-sage-600 hover:bg-sage-700 text-white rounded-full">
                        <Link to="/bedrijven">
                          👉 Lees meer over samenwerken met organisaties
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
                  Voor wie is <span className="font-serif italic text-terracotta-600">dit?</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Deze programma's zijn geschikt voor jou als je:
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
                  Meer dan 250 deelnemers hebben onze MSC-training al gevolgd en ervaren minder stress en meer innerlijke rust.
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
                Workshops · Trainingen · Retreats · 1-op-1 begeleiding
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
                Openingstijden: Ma–Vr, 9:00–17:00
              </p>
              
              <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                <Link to="/agenda">
                  👉 Bekijk volledige agenda
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
