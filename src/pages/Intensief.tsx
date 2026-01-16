import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Calendar, Clock, MapPin, Users, Sparkles, Check, MessageSquareQuote, BookOpen, Mountain } from "lucide-react";
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

const programs = [
  {
    title: "MBSR Intensief",
    subtitle: "Mindfulness-Based Stress Reduction",
    description: "Een verdiepend traject voor wie stress en spanning beter wil leren herkennen en hier met meer rust en mildheid mee om wil gaan.",
    dates: [
      { startDate: "28 februari 2026", followUp: ["14 maart", "28 maart", "11 april"], time: "11:00 – 16:00" },
    ],
    location: "Amersfoort (De Glind)",
    price: "€550",
    color: "sage",
    icon: BookOpen,
  },
  {
    title: "MSC Intensief",
    subtitle: "Mindful Self-Compassion",
    description: "Voor wie de stap wil zetten van begrijpen naar belichamen. Je verdiept zelfcompassie en creëert ruimte voor echte integratie.",
    dates: [
      { startDate: "25 april 2026", followUp: ["9 mei", "23 mei", "6 juni"], time: "11:00 – 16:00" },
    ],
    location: "Amersfoort (De Glind)",
    price: "€550",
    color: "terracotta",
    icon: Heart,
  },
];

const testimonials = [
  {
    quote: "Het intensieve programma gaf me de ruimte om echt te vertragen. In vier dagen heb ik meer geleerd dan in maanden zelf oefenen.",
    author: "Thomas",
    role: "Deelnemer MBSR Intensief",
  },
  {
    quote: "De locatie in De Glind is prachtig. De combinatie van natuur en diepgaande begeleiding maakte dit tot een transformerende ervaring.",
    author: "Marloes",
    role: "Deelnemer MSC Intensief",
  },
  {
    quote: "Eindelijk had ik de tijd om echt bij mezelf te komen. De trainers creëerden een veilige ruimte waar alles er mocht zijn.",
    author: "Jan-Willem",
    role: "Deelnemer MBSR Intensief",
  },
];

const faqItems = [
  {
    question: "Wat is het verschil tussen de 8-weekse training en het intensieve programma?",
    answer: "De 8-weekse training biedt wekelijkse sessies van 2 uur, waardoor je geleidelijk aan leert en integreert. Het intensieve programma comprimeert dit in 4 volle dagen, wat zorgt voor een diepere onderdompeling en snellere integratie. Beide programma's behandelen dezelfde kernconcepten.",
  },
  {
    question: "Moet ik ervaring hebben met mindfulness?",
    answer: "Voor de MBSR intensief is geen ervaring nodig. Voor de MSC intensief raden we aan dat je enige basiskennis hebt van mindfulness, maar dit is geen harde eis. We stemmen af op de groep.",
  },
  {
    question: "Wat is inbegrepen in de prijs?",
    answer: "De prijs is inclusief alle begeleiding, cursusmateriaal, audiobegeleiding voor thuisoefeningen, en thee/koffie en kleine versnaperingen. Lunch is niet inbegrepen maar kan ter plekke worden besteld.",
  },
  {
    question: "Kan ik overnachten in De Glind?",
    answer: "De locatie biedt geen overnachtingsmogelijkheden, maar we kunnen je adviseren over nabijgelegen B&B's en hotels als je van ver komt.",
  },
  {
    question: "Hoe groot zijn de groepen?",
    answer: "We werken met kleine groepen van maximaal 12 deelnemers. Dit zorgt voor persoonlijke aandacht en een veilige, intieme sfeer.",
  },
  {
    question: "Wat als ik een dag moet missen?",
    answer: "Omdat het programma intensief en opbouwend is, is het belangrijk dat je alle dagen kunt bijwonen. Bij onvoorziene omstandigheden zoeken we samen naar een oplossing.",
  },
];

const Intensief = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Intensieve Programma's"
        description="4-daagse MBSR en MSC intensieve trainingen in Amersfoort. Verdiep je in mindfulness en zelfcompassie in een rustige, natuurlijke omgeving."
      />
      <FAQSchema items={faqItems} />
      <CourseSchema 
        name="4-daags Intensief Mindfulness & Zelfcompassie Programma"
        description="Een verdiepend 4-daags traject waarin je je onderdompelt in mindfulness of zelfcompassie, begeleid door ervaren trainers."
        duration="4 days"
        price="550"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/60 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-terracotta-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-warm-100 border border-warm-200 px-5 py-2.5 text-sm font-medium text-warm-700"
            >
              <Mountain className="h-4 w-4" />
              4-daagse trajecten
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Intensieve
              <span className="block font-serif italic text-terracotta-600 mt-2">Verdieping</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Vier dagen om helemaal tot rust te komen en je te verdiepen in mindfulness of zelfcompassie. 
              In een prachtige omgeving in Amersfoort werk je intensief aan je welzijn.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <a href="#programmas">
                  Bekijk programma's
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Intensive */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Waarom een <span className="font-serif italic text-terracotta-600">intensief programma?</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Een intensief programma biedt wat het dagelijks leven vaak niet toelaat: 
                    <strong className="text-foreground"> tijd en ruimte om echt te vertragen</strong>.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    In vier aaneengesloten dagen kun je je volledig onderdompelen in de praktijk, 
                    zonder de afleiding van werk, verplichtingen of schermen. Dit maakt diepe 
                    integratie mogelijk.
                  </p>
                  
                  <ul className="space-y-4">
                    {[
                      "Volledige focus op jouw ontwikkeling",
                      "Diepere integratie door onderdompeling",
                      "Rustige, natuurlijke omgeving",
                      "Kleine, intieme groepen",
                      "Persoonlijke begeleiding",
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
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-warm-100 rounded-3xl transform rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                          <MapPin className="h-7 w-7 text-sage-700" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">De Glind, Amersfoort</h3>
                          <p className="text-sm text-muted-foreground">Rustige, groene omgeving</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-terracotta-500" />
                          <span className="text-foreground">4 dagen</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-terracotta-500" />
                          <span className="text-foreground">11:00 – 16:00 uur</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-terracotta-500" />
                          <span className="text-foreground">Max. 12 deelnemers</span>
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

      {/* Programs */}
      <section id="programmas" className="py-20 lg:py-24 bg-warm-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Kies je <span className="font-serif italic text-terracotta-600">programma</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Twee trajecten, beide gericht op meer rust en veerkracht
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-2">
              {programs.map((program, index) => (
                <StaggerItem key={index}>
                  <Card className={`border-0 rounded-3xl shadow-lg overflow-hidden h-full ${
                    program.color === "sage" 
                      ? "bg-gradient-to-br from-sage-50 to-white" 
                      : "bg-gradient-to-br from-terracotta-50 to-white"
                  }`}>
                    <CardContent className="p-8">
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${
                        program.color === "sage"
                          ? "bg-gradient-to-br from-sage-100 to-sage-200"
                          : "bg-gradient-to-br from-terracotta-100 to-terracotta-200"
                      }`}>
                        <program.icon className={`h-8 w-8 ${
                          program.color === "sage" ? "text-sage-700" : "text-terracotta-600"
                        }`} />
                      </div>
                      
                      <h3 className="text-2xl font-semibold text-foreground mb-2">{program.title}</h3>
                      <p className={`text-sm font-medium mb-4 ${
                        program.color === "sage" ? "text-sage-700" : "text-terracotta-600"
                      }`}>{program.subtitle}</p>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">{program.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <span className="text-foreground text-sm">Start: {program.dates[0].startDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span className="text-foreground text-sm">{program.dates[0].time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <span className="text-foreground text-sm">{program.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        Vervolgdagen: {program.dates[0].followUp.join(", ")}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                        <p className={`text-2xl font-light ${
                          program.color === "sage" ? "text-sage-700" : "text-terracotta-600"
                        }`}>{program.price}</p>
                        <Button asChild className={`rounded-full ${
                          program.color === "sage"
                            ? "bg-sage-600 hover:bg-sage-700"
                            : "bg-terracotta-600 hover:bg-terracotta-700"
                        } text-white`}>
                          <a href="mailto:mindful-mind@outlook.com?subject=Aanmelding intensief programma">
                            Aanmelden
                          </a>
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

      {/* What to Expect */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Een dag in het <span className="font-serif italic text-terracotta-600">programma</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-4 md:grid-cols-4">
              {[
                { time: "11:00", title: "Opening", description: "Meditatie en check-in" },
                { time: "12:00", title: "Theorie", description: "Achtergrond en oefeningen" },
                { time: "13:00", title: "Pauze", description: "Lunch en reflectie" },
                { time: "14:00", title: "Verdieping", description: "Praktijk en afsluiting" },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="text-center p-6 rounded-2xl bg-warm-50 border border-warm-200">
                    <p className="text-2xl font-light text-terracotta-600 mb-2">{item.time}</p>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24 bg-warm-50">
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
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
              Klaar voor verdieping?
              <span className="block font-serif italic mt-2">Reserveer je plek</span>
            </h2>
            <p className="text-terracotta-100 text-lg mb-8">
              De groepen zijn klein, dus wees er snel bij. Heb je vragen? Neem gerust contact met ons op.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <a href="#programmas">
                  Bekijk programma's
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

export default Intensief;
