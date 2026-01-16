import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Calendar, Clock, Globe, Users, Sparkles, Check, MessageSquareQuote, Euro } from "lucide-react";
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

const workshopDates = [
  { lang: "Nederlands", date: "14 januari 2026", time: "19:00 – 20:00" },
  { lang: "Nederlands", date: "11 februari 2026", time: "19:00 – 20:00" },
  { lang: "English", date: "13 januari 2026", time: "19:00 – 20:00" },
  { lang: "English", date: "10 februari 2026", time: "19:00 – 20:00" },
];

const testimonials = [
  {
    quote: "De workshop was precies wat ik nodig had om te ontdekken of zelfcompassie iets voor mij is. Heel toegankelijk en waardevol.",
    author: "Linda",
    role: "Workshop deelnemer",
  },
  {
    quote: "In één uur kreeg ik al zoveel inzicht in hoe streng ik voor mezelf ben. Een echte eye-opener!",
    author: "Peter",
    role: "Workshop deelnemer",
  },
  {
    quote: "Warmte en professionaliteit van de trainers maakte het heel veilig om te delen. Ik heb me direct aangemeld voor de volledige training.",
    author: "Fatima",
    role: "Workshop deelnemer",
  },
];

const faqItems = [
  {
    question: "Wat kost een workshop?",
    answer: "Een workshop kost €35 per persoon. Dit is inclusief een korte introductie tot zelfcompassie, een begeleide oefening en ruimte voor vragen.",
  },
  {
    question: "Moet ik me voorbereiden?",
    answer: "Nee, je hoeft niets voor te bereiden. Kom zoals je bent. We zorgen voor een veilige en ontspannen sfeer waarin je kunt ontdekken wat zelfcompassie inhoudt.",
  },
  {
    question: "Hoe lang duurt een workshop?",
    answer: "Onze workshops duren ongeveer 1 uur. In deze tijd krijg je een introductie tot zelfcompassie, doe je een korte oefening mee en is er ruimte voor vragen.",
  },
  {
    question: "Is de workshop geschikt voor beginners?",
    answer: "Absoluut! De workshop is speciaal ontworpen voor mensen die nog niet bekend zijn met zelfcompassie. We beginnen bij de basis en maken het toegankelijk voor iedereen.",
  },
  {
    question: "Kan ik anoniem deelnemen?",
    answer: "Je kunt deelnemen met je camera uit als je dat prettig vindt. Er is geen verplichting om te delen of actief deel te nemen aan de interactie.",
  },
  {
    question: "Wordt de workshop vergoed?",
    answer: "De workshop valt niet onder reguliere zorgvergoeding. Sommige werkgevers vergoeden wel ontwikkelingsactiviteiten. Check dit eventueel bij je werkgever.",
  },
];

const Workshops = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Zelfcompassie Workshops"
        description="Maak kennis met zelfcompassie in onze online workshops voor €35. Ontdek in 1 uur wat Mindful Self-Compassion voor jou kan betekenen. Nederlands en Engels."
      />
      <FAQSchema items={faqItems} />
      <CourseSchema 
        name="Zelfcompassie Kennismakingsworkshop"
        description="Een laagdrempelige kennismakingsworkshop waarin je ontdekt wat zelfcompassie voor jou kan betekenen."
        duration="1 hour"
        price="35"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-100/60 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-sage-100 border border-sage-200 px-5 py-2.5 text-sm font-medium text-sage-800"
            >
              <Sparkles className="h-4 w-4" />
              Laagdrempelig kennismaken
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Maak kennis met
              <span className="block font-serif italic text-terracotta-600 mt-2">Zelfcompassie</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Ontdek in een workshop van 1 uur wat zelfcompassie voor jou kan betekenen. 
              Ervaar hoe het voelt om jezelf met meer vriendelijkheid te benaderen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center items-center"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <a href="#data">
                  Bekijk beschikbare data
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <span className="text-2xl font-light text-terracotta-600">€35 per workshop</span>
            </motion.div>
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
                  Wat kun je <span className="font-serif italic text-terracotta-600">verwachten?</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Heart,
                  title: "Introductie",
                  description: "Een heldere uitleg over wat zelfcompassie is en hoe het je kan helpen in het dagelijks leven.",
                },
                {
                  icon: Sparkles,
                  title: "Ervaring",
                  description: "Een korte begeleide oefening om zelfcompassie zelf te ervaren en te voelen hoe het werkt.",
                },
                {
                  icon: Users,
                  title: "Verbinding",
                  description: "Ruimte voor vragen en ontmoeting met anderen die ook interesse hebben in zelfcompassie.",
                },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <Card className="border-warm-200 bg-gradient-to-br from-warm-50 to-white rounded-3xl h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 text-center">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-6 mx-auto">
                        <item.icon className="h-7 w-7 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
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
                    Voor wie is deze <span className="font-serif italic text-terracotta-600">workshop?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Deze workshop is perfect voor jou als je:
                  </p>
                  
                  <ul className="space-y-4">
                    {[
                      "Benieuwd bent naar wat zelfcompassie precies inhoudt",
                      "Wilt ervaren of de MSC training bij je past",
                      "Merkt dat je vaak streng of kritisch bent naar jezelf",
                      "Behoefte hebt aan meer rust en vriendelijkheid in je leven",
                      "Gewoon nieuwsgierig bent en laagdrempelig wilt kennismaken",
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
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-terracotta-100 rounded-3xl transform rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <p className="text-5xl font-light text-terracotta-600 mb-2">€35</p>
                        <p className="text-muted-foreground mb-6">per workshop</p>
                        <div className="space-y-3 text-left">
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-sage-600" />
                            <span className="text-foreground">1 uur</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-sage-600" />
                            <span className="text-foreground">100% online (Zoom)</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-sage-600" />
                            <span className="text-foreground">Nederlands of Engels</span>
                          </div>
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

      {/* Dates */}
      <section id="data" className="py-20 lg:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Aankomende <span className="font-serif italic text-terracotta-600">workshops</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Kies een datum en taal die bij je past
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-4 md:grid-cols-2">
              {workshopDates.map((workshop, index) => (
                <StaggerItem key={index}>
                  <Card className="border-warm-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          workshop.lang === "Nederlands" 
                            ? "bg-terracotta-100 text-terracotta-700" 
                            : "bg-sage-100 text-sage-700"
                        }`}>
                          {workshop.lang}
                        </span>
                        <span className="text-sm text-muted-foreground">{workshop.time}</span>
                      </div>
                      <p className="text-xl font-medium text-foreground mb-2">{workshop.date}</p>
                      <p className="text-lg font-light text-terracotta-600 mb-4">€35</p>
                      <Button asChild className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white">
                        <a href="mailto:mindful-mind@outlook.com?subject=Aanmelding workshop">
                          Meld je aan
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
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat anderen <span className="font-serif italic text-terracotta-600">zeggen</span>
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
      <section className="py-20 lg:py-24 bg-gradient-to-br from-sage-600 to-sage-700">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
              Klaar om kennis te maken?
              <span className="block font-serif italic mt-2">Meld je aan voor €35</span>
            </h2>
            <p className="text-sage-100 text-lg mb-8">
              Ontdek in één uur wat zelfcompassie voor jou kan betekenen.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-sage-700 hover:bg-sage-50 rounded-full px-8">
                <a href="#data">
                  Bekijk data
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

export default Workshops;
