import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Anna M.",
    training: "8-weekse MSC Training",
    text: "Deze training heeft mijn leven veranderd. Ik heb geleerd om op een zachte manier met mezelf om te gaan in plaats van altijd maar door te gaan. De veilige sfeer in de groep maakte het mogelijk om echt open te zijn.",
    rating: 5,
  },
  {
    name: "Mark V.",
    training: "8-weekse MSC Training",
    text: "Als iemand die altijd bezig was met presteren, was dit een openbaring. De meditaties en oefeningen zijn praktisch en direct toepasbaar. Ik merk dat ik rustiger ben in stressvolle situaties.",
    rating: 5,
  },
  {
    name: "Sophie L.",
    training: "Individuele Coaching",
    text: "De individuele sessies gaven me precies de ruimte die ik nodig had. Çağla luistert met warmte en wijsheid, en stelt de juiste vragen op het juiste moment. Ik voel me zoveel meer verbonden met mezelf.",
    rating: 5,
  },
  {
    name: "Peter K.",
    training: "8-weekse MSC Training",
    text: "Ik was sceptisch, maar de wetenschappelijke basis overtuigde me om het te proberen. Na 8 weken merk ik een fundamenteel verschil in hoe ik met tegenslagen omga. Een aanrader voor iedereen.",
    rating: 5,
  },
  {
    name: "Lisa D.",
    training: "Barcelona Retreat",
    text: "Het retreat was een prachtige ervaring. De combinatie van beweging, natuur en meditatie in Barcelona was transformerend. Ik kwam thuis met een gevoel van diepe rust en vernieuwing.",
    rating: 5,
  },
  {
    name: "Jennifer B.",
    training: "8-weekse MSC Training",
    text: "De online training was verrassend intiem en persoonlijk. De kleine groep en de manier waarop Çağla de ruimte houdt, maakten het tot een veilige plek om te leren en te groeien.",
    rating: 5,
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Ervaringen"
        description="Lees de ervaringen van deelnemers aan onze mindfulness en zelfcompassie trainingen. Ontdek hoe zij hun reis naar meer zelfcompassie hebben ervaren."
      />
      <Navigation />

      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta-100/40 via-background to-background" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Star className="h-4 w-4" />
              Ervaringen
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-4 text-4xl font-light tracking-tight text-foreground md:text-5xl leading-[1.1]"
            >
              Wat deelnemers <span className="font-serif italic text-terracotta-600">zeggen</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-xl mx-auto"
            >
              Ontdek hoe anderen hun reis naar meer zelfcompassie en innerlijke rust hebben ervaren.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-warm-200 shadow-sm h-full flex flex-col">
                    <Quote className="h-8 w-8 text-terracotta-200 mb-4 flex-shrink-0" />
                    <p className="text-foreground leading-relaxed mb-6 flex-grow">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-warm-100">
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.training}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-terracotta-400 text-terracotta-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mx-auto max-w-2xl mt-16 text-center">
              <div className="bg-gradient-to-r from-terracotta-50 to-warm-50 rounded-3xl p-8 border border-terracotta-200">
                <p className="text-foreground text-lg font-medium mb-4">
                  Klaar om je eigen reis te beginnen?
                </p>
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                  <Link to="/">
                    Bekijk de training
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
