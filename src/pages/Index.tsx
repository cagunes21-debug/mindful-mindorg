import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, ArrowRight, Check, Calendar, Clock, Globe, Sparkles, MessageSquareQuote, BookOpen, Mountain, Video } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { OrganizationSchema, FAQSchema, WebsiteSchema } from "@/components/StructuredData";
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

const services = [
  {
    title: "8-weekse MSC Training",
    subtitle: "Kernprogramma",
    description: "Een wetenschappelijk onderbouwd programma waarin je leert omgaan met stress, emoties en zelfkritiek met meer vriendelijkheid.",
    price: "€550",
    duration: "8 weken",
    format: "Online",
    link: "/msc-training",
    icon: Heart,
    color: "terracotta",
    highlight: true,
  },
  {
    title: "Workshops",
    subtitle: "Kennismaken",
    description: "Maak in 1 uur kennis met zelfcompassie. Ontdek of de training bij je past.",
    price: "€35",
    duration: "1 uur",
    format: "Online",
    link: "/workshops",
    icon: Sparkles,
    color: "sage",
  },
  {
    title: "Intensieve Programma's",
    subtitle: "4-daagse verdieping",
    description: "MBSR of MSC in een compact, verdiepend traject. Volledig onderdompelen in mindfulness of zelfcompassie.",
    price: "€550",
    duration: "4 dagen",
    format: "Op locatie",
    link: "/intensief",
    icon: Mountain,
    color: "warm",
  },
  {
    title: "1-op-1 Coaching",
    subtitle: "Persoonlijke begeleiding",
    description: "Individuele sessies volledig afgestemd op jouw tempo, thema's en behoeften.",
    price: "Vanaf €95",
    duration: "Flexibel",
    format: "Online of op locatie",
    link: "/coaching",
    icon: Users,
    color: "terracotta",
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
    quote: "De 1-op-1 sessies waren precies wat ik nodig had. In mijn eigen tempo, met volledige aandacht voor mijn persoonlijke thema's.",
    author: "Renate",
    role: "Coaching cliënt",
  },
];

const faqItems = [
  {
    question: "Wat is zelfcompassie?",
    answer: "Zelfcompassie betekent jezelf behandelen met dezelfde vriendelijkheid, zorg en begrip die je een goede vriend zou geven. Het gaat om het erkennen van je eigen lijden en jezelf steunen in moeilijke momenten, in plaats van jezelf te bekritiseren.",
  },
  {
    question: "Voor wie is dit geschikt?",
    answer: "Onze trainingen zijn geschikt voor iedereen die merkt dat ze vaak streng zijn voor zichzelf, moeilijk grenzen aangeven, of behoefte hebben aan meer rust en zelfzorg. Je hebt geen ervaring met meditatie nodig.",
  },
  {
    question: "Wat is het verschil tussen de verschillende programma's?",
    answer: "De 8-weekse training is ons kernprogramma met wekelijkse sessies. Workshops zijn korte kennismakingen. Intensieve programma's comprimeren de training in 4 dagen. Coaching biedt persoonlijke 1-op-1 begeleiding.",
  },
  {
    question: "Zijn de trainingen online of op locatie?",
    answer: "De meeste trainingen zijn 100% online via Zoom, vanuit je eigen vertrouwde omgeving. De intensieve programma's vinden plaats op locatie in Amersfoort. Coaching kan zowel online als op locatie.",
  },
  {
    question: "Hoe weet ik welk programma bij mij past?",
    answer: "Begin met een workshop om kennis te maken, of neem contact op voor een vrijblijvend gesprek. We helpen je graag bij het vinden van het programma dat het beste aansluit bij jouw situatie en behoeften.",
  },
];

const benefits = [
  "Minder stress en zelfkritiek",
  "Meer veerkracht bij tegenslagen",
  "Betere emotieregulatie",
  "Meer rust en tevredenheid",
  "Gezondere relaties",
  "Minder perfectionisme",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <OrganizationSchema />
      <WebsiteSchema />
      <FAQSchema items={faqItems} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-28 lg:pt-32 lg:pb-36">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/80 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-terracotta-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Heart className="h-4 w-4" />
              Mindful Self-Compassion
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Leer jezelf benaderen met
              <span className="block font-serif italic text-terracotta-600 mt-2">vriendelijkheid en begrip</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Ontdek de kracht van zelfcompassie. Onze trainingen helpen je om 
              minder streng voor jezelf te zijn en meer rust te vinden in het dagelijks leven.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <Link to="/msc-training">
                  Bekijk de MSC Training
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <Link to="/workshops">
                  Start met een workshop
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Self-Compassion */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div>
                  <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                    Waarom zelfcompassie?
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    Stop met jezelf <span className="font-serif italic text-terracotta-600">hard aanpakken</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Veel mensen denken dat ze zichzelf moeten pushen en bekritiseren om vooruit te komen. 
                    Maar onderzoek laat zien dat zelfcompassie juist leidt tot meer motivatie, veerkracht en welzijn.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Bij Mindful Mind leer je om jezelf te benaderen met dezelfde vriendelijkheid 
                    die je een goede vriend zou geven.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-warm-50 border border-warm-200">
                      <Check className="h-5 w-5 text-sage-600 flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Ons aanbod
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Kies wat bij <span className="font-serif italic text-terracotta-600">jou past</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Van laagdrempelige workshops tot intensieve verdieping. 
                  Alle trainingen worden begeleid vanuit een trauma-sensitieve en zorgvuldige benadering.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {services.map((service, index) => (
                <StaggerItem key={index}>
                  <Card className={`border-0 rounded-3xl shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow ${
                    service.highlight 
                      ? "bg-gradient-to-br from-terracotta-50 to-white ring-2 ring-terracotta-200" 
                      : "bg-gradient-to-br from-warm-50 to-white"
                  }`}>
                    {service.highlight && (
                      <div className="bg-terracotta-500 text-white text-center py-2 text-sm font-medium">
                        Meest gekozen
                      </div>
                    )}
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
                          service.color === "terracotta" 
                            ? "bg-gradient-to-br from-terracotta-100 to-terracotta-200" 
                            : service.color === "sage"
                            ? "bg-gradient-to-br from-sage-100 to-sage-200"
                            : "bg-gradient-to-br from-warm-100 to-warm-200"
                        }`}>
                          <service.icon className={`h-7 w-7 ${
                            service.color === "terracotta" 
                              ? "text-terracotta-600" 
                              : service.color === "sage"
                              ? "text-sage-700"
                              : "text-warm-600"
                          }`} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          service.color === "terracotta" 
                            ? "bg-terracotta-100 text-terracotta-700" 
                            : service.color === "sage"
                            ? "bg-sage-100 text-sage-700"
                            : "bg-warm-100 text-warm-700"
                        }`}>
                          {service.subtitle}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" /> {service.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Globe className="h-4 w-4" /> {service.format}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                        <p className={`text-2xl font-light ${
                          service.color === "terracotta" ? "text-terracotta-600" : "text-sage-700"
                        }`}>{service.price}</p>
                        <Button asChild className={`rounded-full ${
                          service.highlight
                            ? "bg-terracotta-600 hover:bg-terracotta-700 text-white"
                            : "bg-warm-200 hover:bg-warm-300 text-foreground"
                        }`}>
                          <Link to={service.link}>
                            Meer info
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* About Us Teaser */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-terracotta-100 rounded-3xl transform -rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-6 mx-auto">
                        <Users className="h-10 w-10 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">Ervaren trainers</h3>
                      <p className="text-muted-foreground">
                        Gecertificeerde MSC trainers met achtergrond in psychologie, 
                        somatische therapie en mindfulness.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.2}>
                <div>
                  <span className="inline-block rounded-full bg-warm-100 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-6">
                    Over Mindful Mind
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    Warmte, expertise en <span className="font-serif italic text-terracotta-600">veiligheid</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Bij Mindful Mind werken we vanuit de overtuiging dat iedereen de capaciteit heeft 
                    om vriendelijker naar zichzelf te leren kijken.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Onze trainers combineren wetenschappelijke expertise met een warme, 
                    trauma-sensitieve benadering. We creëren een veilige ruimte waarin je kunt ontdekken 
                    wat zelfcompassie voor jou betekent.
                  </p>
                  <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-6">
                    <Link to="/trainers">
                      Ontmoet onze trainers
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
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
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                  Ervaringen
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat deelnemers <span className="font-serif italic text-terracotta-600">zeggen</span>
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
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
              Klaar om de eerste stap te zetten?
              <span className="block font-serif italic mt-2">Begin vandaag nog</span>
            </h2>
            <p className="text-terracotta-100 text-lg mb-8">
              Start met een workshop om kennis te maken, of meld je direct aan voor de 8-weekse training.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <Link to="/msc-training">
                  Bekijk de MSC Training
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                <Link to="/contact">
                  Neem contact op
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

export default Index;
