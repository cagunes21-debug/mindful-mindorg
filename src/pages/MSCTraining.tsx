import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Users, Calendar, Clock, CheckCircle2, Sparkles, ArrowRight, Check, MessageSquareQuote, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { FAQSchema, CourseSchema } from "@/components/StructuredData";
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

const trainingDates = [
  {
    language: "Nederlands",
    day: "Maandag (avond)",
    startDate: "16 februari 2026",
    time: "19.00–21.00 uur",
    dates: ["23 februari", "2, 9, 16, 23 maart", "13, 20 april", "4 mei 2026"],
    price: "€550",
  },
  {
    language: "Nederlands",
    day: "Zaterdag (middag)",
    startDate: "21 maart 2026",
    time: "15.00–17.00 uur",
    dates: ["28 maart", "4, 11, 18, 25 april", "9, 16 mei 2026"],
    price: "€550",
  },
  {
    language: "Engels",
    day: "Zondag (middag)",
    startDate: "18 januari 2026",
    time: "16.00–18.00 uur",
    dates: ["25 januari", "1, 8, 15, 22 februari", "1, 8 maart 2026"],
    price: "€550",
  },
  {
    language: "Engels",
    day: "Woensdag (avond)",
    startDate: "4 maart 2026",
    time: "19.00–21.00 uur",
    dates: ["11, 18, 25 maart", "1, 8, 15, 22 april 2026"],
    price: "€550",
  },
];

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
  {
    quote: "De combinatie van theorie en praktijk werkt heel goed. Je leert niet alleen wát zelfcompassie is, maar ook hóé je het kunt toepassen.",
    author: "David",
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
  {
    question: "Wat is inbegrepen in de prijs?",
    answer: "De prijs van €550 is inclusief alle 8 sessies, de retreatsessie, een werkboek, audiobegeleiding voor thuisoefeningen en tussentijdse ondersteuning via e-mail.",
  },
  {
    question: "Wordt de training vergoed?",
    answer: "De training valt niet onder de reguliere zorgverzekering. Sommige aanvullende verzekeringen en werkgevers vergoeden wel trainingen gericht op persoonlijke ontwikkeling of stressreductie. Check dit bij je verzekeraar of werkgever.",
  },
];

const MSCTraining = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="8-weekse MSC Training"
        description="Leer jezelf met meer steun en begrip benaderen in onze 8-weekse Mindful Self-Compassion training. Wetenschappelijk onderbouwd programma, online in Nederlands of Engels."
      />
      <FAQSchema items={faqItems} />
      <CourseSchema 
        name="8-weekse Mindful Self-Compassion (MSC) Training"
        description="Een wetenschappelijk onderbouwd programma waarin je leert omgaan met stress, emoties en zelfkritiek met meer vriendelijkheid en veerkracht."
        duration="8 weeks"
        price="550"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/80 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-terracotta-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Sparkles className="h-4 w-4" />
              8-weekse training
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Mindful Zelfcompassie
              <span className="block font-serif italic text-terracotta-600 mt-2">(MSC) Training</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Een wetenschappelijk onderbouwd programma, ontwikkeld door dr. Kristin Neff en 
              dr. Christopher Germer. Leer jezelf met meer steun en begrip benaderen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <a href="#data">
                  Bekijk startdata
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <Link to="/workshops">
                  Eerst kennismaken
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is MSC Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat is <span className="font-serif italic text-terracotta-600">Mindful Zelfcompassie?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Mindful Zelfcompassie (MSC) is een wetenschappelijk onderbouwd 8-weeks programma 
                  waarin je leert jezelf te benaderen met dezelfde vriendelijkheid die je een goede vriend zou geven.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              <StaggerItem>
                <Card className="border-terracotta-100 bg-gradient-to-br from-terracotta-50/50 to-white rounded-3xl h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200">
                      <Brain className="h-8 w-8 text-terracotta-600" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">Mindfulness</h3>
                    <p className="text-muted-foreground">
                      Bewust aanwezig zijn bij wat je ervaart, zonder te oordelen. 
                      Je leert je gedachten en emoties te observeren met openheid.
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
                      Met vriendelijkheid, begrip en zorg op jezelf reageren. 
                      Juist in moeilijke momenten jezelf steunen in plaats van bekritiseren.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    Wat levert het je <span className="font-serif italic text-terracotta-600">op?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Onderzoek toont aan dat zelfcompassie leidt tot:
                  </p>
                  
                  <ul className="space-y-4">
                    {[
                      "Minder stress, angst en depressieve gevoelens",
                      "Meer veerkracht bij tegenslagen",
                      "Betere emotieregulatie",
                      "Meer tevredenheid en geluk",
                      "Gezondere relaties met jezelf en anderen",
                      "Minder perfectionisme en zelfkritiek",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 flex-shrink-0 text-sage-600 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.2}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-terracotta-100 to-sage-100 rounded-3xl transform rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-6">Praktische info</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Calendar className="h-6 w-6 text-terracotta-500" />
                          <div>
                            <p className="font-medium text-foreground">8 weken + retreat</p>
                            <p className="text-sm text-muted-foreground">Wekelijks 2 uur</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Globe className="h-6 w-6 text-terracotta-500" />
                          <div>
                            <p className="font-medium text-foreground">100% online via Zoom</p>
                            <p className="text-sm text-muted-foreground">Vanuit je eigen vertrouwde omgeving</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Users className="h-6 w-6 text-terracotta-500" />
                          <div>
                            <p className="font-medium text-foreground">Nederlands of Engels</p>
                            <p className="text-sm text-muted-foreground">Kleine, veilige groepen</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-warm-200">
                          <p className="text-3xl font-light text-terracotta-600">€550</p>
                          <p className="text-sm text-muted-foreground">Inclusief materialen en begeleiding</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat leer je in <span className="font-serif italic text-terracotta-600">8 weken?</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-4 md:grid-cols-2">
              {[
                { week: "Week 1-2", title: "Ontdekken van zelfcompassie", description: "Wat is zelfcompassie en hoe verschilt het van zelfkritiek?" },
                { week: "Week 3-4", title: "Mindfulness praktijk", description: "Leren aanwezig zijn bij emoties zonder erin te verdrinken." },
                { week: "Week 5-6", title: "Kernwaarden & liefde", description: "Ontdekken wat je écht belangrijk vindt en liebevolle vriendelijkheid." },
                { week: "Week 7-8", title: "Integratie & verdieping", description: "Zelfcompassie integreren in je dagelijks leven." },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="p-6 rounded-2xl bg-warm-50 border border-warm-200">
                    <span className="text-sm font-medium text-terracotta-600">{item.week}</span>
                    <h3 className="font-semibold text-foreground mt-1 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <ScrollReveal delay={0.2}>
              <div className="mt-8 p-6 rounded-2xl bg-sage-50 border border-sage-200 text-center">
                <Sparkles className="h-6 w-6 text-sage-600 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Halfdaagse retreat</h3>
                <p className="text-sm text-muted-foreground">
                  Halverwege de training is er een verdiepende halve dag waarin je rustig kunt oefenen en integreren.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Training Dates */}
      <section id="data" className="py-20 lg:py-24 bg-terracotta-50/50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Beschikbare <span className="font-serif italic text-terracotta-600">startdata</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Kies een groep die past bij jouw agenda en taalvoorkeur
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {trainingDates.map((training, index) => (
                <StaggerItem key={index}>
                  <Card className="border-warm-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`px-6 py-3 ${training.language === "Nederlands" ? "bg-terracotta-500" : "bg-sage-600"}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{training.language}</span>
                        <span className="text-white/80 text-sm">{training.day}</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Startdatum</p>
                          <p className="font-medium text-foreground">{training.startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tijd</p>
                          <p className="font-medium text-foreground">{training.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Vervolgdata</p>
                          <p className="text-sm text-foreground">{training.dates.join(", ")}</p>
                        </div>
                        <div className="pt-3 border-t border-warm-200">
                          <p className="text-2xl font-light text-terracotta-600">{training.price}</p>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full" asChild>
                        <a href="http://mindful-mind.org/aanmeldformulier-2/" target="_blank" rel="noopener noreferrer">
                          Reserveer je plek
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Ervaringen van <span className="font-serif italic text-terracotta-600">deelnemers</span>
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

      {/* Individual Coaching */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="grid gap-10 lg:grid-cols-2 items-center">
                <div>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    Liever individuele <span className="font-serif italic text-terracotta-600">begeleiding?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Wil je liever persoonlijke aandacht, een tempo dat helemaal bij jou past, 
                    of dieper ingaan op jouw eigen thema's?
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "1-op-1 sessies (online of in Amersfoort)",
                      "Volledig afgestemd op jouw behoeften",
                      "Flexibele planning",
                      "Mogelijkheid voor losse sessies of traject",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-terracotta-500" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <Link to="/coaching">
                      Meer over coaching
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-warm-100 rounded-3xl transform -rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-6 mx-auto">
                        <Heart className="h-8 w-8 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">1-op-1 Coaching</h3>
                      <p className="text-muted-foreground mb-4">Persoonlijke begeleiding op maat</p>
                      <p className="text-2xl font-light text-terracotta-600">Vanaf €95</p>
                      <p className="text-sm text-muted-foreground">per sessie</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Veelgestelde <span className="font-serif italic text-terracotta-600">vragen</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-warm-200 rounded-xl px-6 bg-warm-50/50"
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
      <section className="py-20 lg:py-24 bg-gradient-to-br from-sage-600 to-sage-700">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
              Klaar om te beginnen?
              <span className="block font-serif italic mt-2">Reserveer je plek</span>
            </h2>
            <p className="text-sage-100 text-lg mb-8">
              Neem de eerste stap naar meer zelfcompassie en veerkracht. 
              De groepen zijn klein, dus wees er snel bij.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-sage-700 hover:bg-sage-50 rounded-full px-8">
                <a href="#data">
                  Bekijk startdata
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                <Link to="/contact">
                  Stel een vraag
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

export default MSCTraining;
