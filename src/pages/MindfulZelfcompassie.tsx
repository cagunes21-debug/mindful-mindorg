import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Check, Leaf, Sparkles, MessageSquareQuote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/StructuredData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const benefits = [
  "Meer innerlijke rust en balans",
  "Minder zelfkritiek en piekeren",
  "Beter omgaan met moeilijke emoties",
  "Meer zelfvertrouwen en veerkracht",
  "Gezondere grenzen stellen",
  "Betere relaties met anderen",
];

const whatYouLearn = [
  {
    title: "Mindfulness cultiveren",
    description: "Leren om met bewustzijn aanwezig te zijn bij wat er is, zonder oordeel.",
  },
  {
    title: "Zelfvriendelijkheid ontwikkelen",
    description: "Jezelf benaderen met dezelfde warmte en zorg die je een goede vriend zou geven.",
  },
  {
    title: "Gemeenschappelijke menselijkheid erkennen",
    description: "Beseffen dat lijden en imperfectie deel uitmaken van het menselijk bestaan.",
  },
  {
    title: "Omgaan met moeilijke emoties",
    description: "Leren hoe je met zorg en compassie kunt reageren op pijnlijke gevoelens.",
  },
  {
    title: "De innerlijke criticus transformeren",
    description: "Van zelfkritiek naar zelfondersteuning in uitdagende momenten.",
  },
  {
    title: "Duurzame zelfzorg praktijken",
    description: "Praktische oefeningen die je in je dagelijks leven kunt integreren.",
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
];

const isThisForYou = [
  "Je bent vaak streng of kritisch naar jezelf",
  "Je vindt het moeilijk om grenzen aan te geven",
  "Je voelt je snel verantwoordelijk voor anderen",
  "Je hebt moeite met rusten of ontspannen",
  "Je ervaart stress, angst of neerslachtigheid",
  "Je wilt leren om beter voor jezelf te zorgen",
];

const faqItems = [
  { 
    question: "Wat is Mindful Zelfcompassie?", 
    answer: "Mindful Zelfcompassie (MSC) is een wetenschappelijk onderbouwd programma dat je leert om jezelf met vriendelijkheid en begrip te benaderen, vooral in moeilijke momenten. Het combineert mindfulness met zelfcompassie-oefeningen." 
  },
  { 
    question: "Wat is het verschil met mindfulness?", 
    answer: "Mindfulness leert je om bewust aanwezig te zijn bij wat er is. Zelfcompassie voegt daar een warme, vriendelijke houding aan toe — specifiek naar jezelf. MSC combineert beide op een krachtige manier." 
  },
  { 
    question: "Is zelfcompassie niet egoïstisch?", 
    answer: "Nee, integendeel. Onderzoek toont aan dat mensen met meer zelfcompassie juist meer compassie hebben voor anderen. Je kunt niet geven vanuit een lege bron." 
  },
  { 
    question: "Heb ik ervaring nodig?", 
    answer: "Nee, je hebt geen ervaring met meditatie of mindfulness nodig om te beginnen met zelfcompassie." 
  },
];

const MindfulZelfcompassie = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Mindful Zelfcompassie | Wat is het en waarom werkt het?"
        description="Ontdek wat Mindful Zelfcompassie is en hoe het je kan helpen om vriendelijker voor jezelf te zijn. Wetenschappelijk onderbouwd, begeleid met zorg."
      />
      <FAQSchema items={faqItems} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-100/80 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-sage-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-terracotta-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6"
            >
              Mindful Zelfcompassie
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Je welzijn begint bij hoe je
              <span className="block font-serif italic text-sage-700 mt-2">jezelf behandelt</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Ontdek de kracht van zelfcompassie — een wetenschappelijk onderbouwde benadering 
              om een vriendelijkere relatie met jezelf te ontwikkelen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-sage-600 hover:bg-sage-700 text-white rounded-full px-8">
                <Link to="/msc-training">
                  Bekijk de 8-weekse training
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link to="/contact">
                  Stel een vraag
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wat is Mindful Zelfcompassie */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="text-center mb-8 text-3xl font-light text-foreground md:text-4xl leading-tight">
                Wat is <span className="font-serif italic text-sage-700">Mindful Zelfcompassie?</span>
              </h2>
              <div className="text-muted-foreground text-lg leading-relaxed space-y-6">
                <p>
                  Mindful Zelfcompassie (MSC) is een wetenschappelijk onderbouwd programma, 
                  ontwikkeld door Dr. Kristin Neff en Dr. Christopher Germer. Het leert je 
                  om jezelf te ondersteunen in plaats van jezelf te bekritiseren — vooral 
                  wanneer het leven moeilijk is.
                </p>
                <p className="text-xl font-light text-foreground">
                  Het gaat niet om jezelf beter voelen. Het gaat om beter voelen naar jezelf.
                </p>
                <p>
                  Zelfcompassie bestaat uit drie kerncomponenten: <strong>mindfulness</strong> (bewust 
                  zijn van je ervaring), <strong>zelfvriendelijkheid</strong> (jezelf met warmte 
                  benaderen) en <strong>gemeenschappelijke menselijkheid</strong> (erkennen dat 
                  iedereen worstelt).
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Waarom Zelfcompassie */}
      <section className="py-20 lg:py-24 bg-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Waarom <span className="font-serif italic text-sage-700">zelfcompassie?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Onderzoek toont aan dat zelfcompassie een van de krachtigste voorspellers 
                  is van mentaal welzijn en emotionele veerkracht.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-5 rounded-xl bg-white border border-sage-200 shadow-sm">
                    <Check className="h-5 w-5 text-sage-600 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Is dit voor jou */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div>
                  <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                    Herken je dit?
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    Is zelfcompassie iets voor <span className="font-serif italic text-terracotta-600">jou?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Zelfcompassie kan bijzonder waardevol zijn als je merkt dat je vaak streng 
                    bent voor jezelf, of als je de neiging hebt om voor anderen te zorgen 
                    maar jezelf te vergeten.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.1}>
                <div className="space-y-3">
                  {isThisForYou.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-warm-50 border border-warm-200">
                      <Check className="h-5 w-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Wat je leert */}
      <section className="py-20 lg:py-24 bg-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                  De kern van MSC
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat je <span className="font-serif italic text-sage-700">leert</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatYouLearn.map((item, index) => (
                <StaggerItem key={index}>
                  <Card className="h-full border-0 rounded-2xl shadow-md overflow-hidden bg-white">
                    <CardContent className="p-6">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-4">
                        <Leaf className="h-5 w-5 text-sage-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
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
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Ervaringen
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat deelnemers <span className="font-serif italic text-terracotta-600">zeggen</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1 pl-4">
                      <Card className="border-0 rounded-3xl shadow-lg overflow-hidden bg-gradient-to-br from-sage-50 to-warm-50">
                        <CardContent className="p-8 md:p-10 text-center">
                          <MessageSquareQuote className="h-10 w-10 text-terracotta-400 mx-auto mb-6" />
                          <blockquote className="text-xl md:text-2xl font-light text-foreground leading-relaxed mb-6">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-foreground">{testimonial.author}</span>
                            <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-6">
                  <CarouselPrevious className="relative inset-0 translate-y-0 bg-white border-sage-200 hover:bg-sage-50" />
                  <CarouselNext className="relative inset-0 translate-y-0 bg-white border-sage-200 hover:bg-sage-50" />
                </div>
              </Carousel>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Veelgestelde <span className="font-serif italic text-sage-700">vragen</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <Card key={index} className="border-0 rounded-2xl shadow-sm overflow-hidden bg-white">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.question}</h3>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-sage-600 to-sage-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGMzLjE5IDAgNi4yOS0uODQ4IDkuMDI3LTIuNDI0QzQyLjE1NSA0OS4wNjcgMzguNDI0IDQ4IDM2IDQ4Yy02LjYyNyAwLTEyLTUuMzczLTEyLTEycy41MzctMTIgMTItMTJjNi42MjcgMCAxMiA1LjM3MyAxMiAxMiAwIDIuNDI0LTEuMDY3IDYuMTU1LTMuNTc2IDkuMDI3QzQ3LjE1MiA0Mi4yOSA0OCAzOS4xOSA0OCAzNmMwLTkuOTQxLTguMDU5LTE4LTE4LTE4eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
                Klaar om een vriendelijkere relatie met jezelf te ontwikkelen?
              </h2>
              <p className="text-sage-100 text-lg mb-10 max-w-2xl mx-auto">
                De 8-weekse Mindful Self-Compassion training is de meest uitgebreide manier 
                om zelfcompassie te leren en in je leven te integreren.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-sage-700 hover:bg-sage-50 rounded-full px-8">
                  <Link to="/msc-training">
                    Bekijk de MSC training
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                  <Link to="/workshops">
                    Of start met een workshop
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

export default MindfulZelfcompassie;
