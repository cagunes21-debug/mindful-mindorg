import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Sparkles, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const trainers = [
  {
    name: "Sabine Trampe",
    role: "Psycholoog • Mindfulness & Zelfcompassie Trainer",
    tagline: "Ruimte Creëren voor Authenticiteit",
    bio: "Sabine is psycholoog binnen de geestelijke gezondheidszorg en trainer in mindfulness en zelfcompassie. Zij werkt vanuit een diepe overtuiging: iedereen verdient zachtheid, ruimte en vriendelijkheid — juist wanneer het leven moeilijk wordt.",
    journey: "Haar reis begon vijftien jaar geleden via het boeddhisme. Wat haar raakte was de nuchtere en tegelijkertijd diep menselijke benadering: meditatie als een manier om jezelf met open aandacht te ontmoeten.",
    specializations: [
      "Mindfulness (MBSR/MBCT)",
      "ACT (Acceptance and Commitment Therapy)",
      "Mindful Self-Compassion (MSC)",
      "Trauma-sensitieve mindfulness",
    ],
    color: "terracotta",
  },
  {
    name: "Çağla Güneş",
    role: "Somatic Therapist • Lichaamsgerichte Psychotherapeut",
    tagline: "Mindfulness & Zelfcompassie Trainer",
    bio: "Çağla wordt al lang geleid door een diepe oriëntatie op innerlijke verbinding en bewustzijn. Meditatie werd al op jonge leeftijd een natuurlijk onderdeel van haar leven — vanaf haar achtste — en verdiepte zich door haar studies, jarenlange beoefening en langere Vipassana-retraites.\n\nHaar pad heeft zich ontvouwd door geleefde ervaring. Jaren van reizen en wonen in het buitenland — in Nederland, Duitsland, Spanje en Mexico — boden niet alleen culturele verkenning, maar ook een voortdurend onderzoek naar identiteit, verbondenheid en wat het betekent om je thuis te voelen. In plaats van weg te bewegen van zichzelf, brachten deze reizen haar steeds dichter bij haar essentie.",
    journey: "Een sterke verbinding met haar wortels, Cappadocië, en haar voorouders vormt een belangrijk fundament in haar leven en werk. Dit voorouderlijk bewustzijn brengt een gevoel van continuïteit, diepte en respect voor de lagen die de menselijke ervaring vormen — persoonlijk, collectief en transgenerationeel.\n\nNaast haar werk als therapeut heeft Çağla zich verder professioneel verdiept in mindfulness, zelfcompassie en meditatie, evenals in lichaamsgerichte en trauma-sensitieve benaderingen van persoonlijke ontwikkeling en heling. Als onderdeel van deze verdieping volgde zij de Mindful Self-Compassion (MSC) training bij Chris Germer, mede-ontwikkelaar van het programma, en Mila de Koning aan de Mindfulness Academie in Amsterdam. Deze training verrijkte haar werk met een compassiegerichte en trauma-sensitieve benadering van zelfcompassie en innerlijk bewustzijn.",
    specializations: [
      "Mindfulness (MBSR/MBCT)",
      "Psychosomatische therapie",
      "Mindful Self-Compassion (MSC)",
      "Trauma-sensitieve benaderingen",
    ],
    color: "sage",
  },
  {
    name: "Maria Schmidt",
    role: "Mindful Zelfcompassie Trainer",
    tagline: "Leadership Coach & Trainer",
    bio: "Maria heeft meer dan tien jaar ervaring in leiderschap en het begeleiden van mensen bij het omgaan met druk en verandering. Haar intentie is om deelnemers te ondersteunen in het worden van hun eigen beste leraar.",
    journey: "Haar manier van lesgeven wordt omschreven als warm, gegrond en bekrachtigend. Maria brengt rust en toegankelijkheid, waardoor deelnemers hun hart kunnen openen.",
    specializations: [],
    color: "terracotta",
  },
  {
    name: "Morgan Healey",
    role: "Mindful Zelfcompassie Trainer • Onderzoeker",
    tagline: "Neurospirituality Lab, Brigham and Women's Hospital",
    bio: "Morgan is trainer en Lab Manager bij het Neurospirituality Lab, waar zij onderzoekt welke delen van de hersenen actief zijn bij transcendente ervaringen.",
    journey: "Haar benadering is zacht, trauma-sensitief en diep relationeel. Ze bewaart een zorgvuldige balans tussen wetenschappelijke precisie en menselijke warmte.",
    specializations: [],
    color: "sage",
  },
];

const Trainers = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Onze Trainers"
        description="Maak kennis met onze ervaren en gecertificeerde MSC trainers. Psychologen en therapeuten die je met warmte begeleiden naar meer zelfcompassie."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-100/50 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-sage-100 border border-sage-200 px-5 py-2.5 text-sm font-medium text-sage-800"
            >
              <Users className="h-4 w-4" />
              Ons Team
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Over de
              <span className="block font-serif italic text-terracotta-600 mt-2">Trainers</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Toegewijde en ervaren trainers die werken vanuit warmte, expertise en een diepe persoonlijke beoefening.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trainers Carousel */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {trainers.map((trainer) => (
                  <CarouselItem key={trainer.name} className="pl-4 md:basis-1/2">
                    <Card className="border-warm-200 bg-gradient-to-br from-warm-50 to-white rounded-3xl overflow-hidden shadow-sm h-full">
                      <CardContent className="p-8">
                        {/* Header */}
                        <div className="flex items-start gap-5 mb-6">
                          <div className={`flex-shrink-0 h-20 w-20 rounded-2xl bg-gradient-to-br ${
                            trainer.color === 'terracotta' 
                              ? 'from-terracotta-200 to-terracotta-300' 
                              : 'from-sage-200 to-sage-300'
                          } flex items-center justify-center`}>
                            <span className="text-3xl font-serif italic text-white">
                              {trainer.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-semibold text-foreground mb-1">
                              {trainer.name}
                            </h2>
                            <p className={`text-sm font-medium mb-1 ${
                              trainer.color === 'terracotta' ? 'text-terracotta-600' : 'text-sage-700'
                            }`}>
                              {trainer.role}
                            </p>
                            <p className="text-xs text-muted-foreground italic">
                              {trainer.tagline}
                            </p>
                          </div>
                        </div>
                        
                        {/* Bio */}
                        <p className="text-foreground leading-relaxed mb-3 text-sm">
                          {trainer.bio}
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm mb-5">
                          {trainer.journey}
                        </p>
                        
                        {/* Specializations */}
                        {trainer.specializations.length > 0 && (
                          <div className="pt-5 border-t border-warm-200">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Specialisaties</p>
                            <div className="flex flex-wrap gap-2">
                              {trainer.specializations.map((spec) => (
                                <span key={spec} className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${
                                  trainer.color === 'terracotta' 
                                    ? 'bg-terracotta-50 text-terracotta-700' 
                                    : 'bg-sage-50 text-sage-700'
                                }`}>
                                  <Check className="h-3 w-3" />
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="relative inset-auto translate-y-0 border-warm-300 text-foreground hover:bg-warm-100" />
                <CarouselNext className="relative inset-auto translate-y-0 border-warm-300 text-foreground hover:bg-warm-100" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-terracotta-400/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium text-white">
                <Sparkles className="h-4 w-4" />
                Word begeleid door ons team
              </span>
              
              <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
                Klaar om te beginnen?
              </h2>
              
              <p className="mb-10 text-white/90 text-lg max-w-lg mx-auto leading-relaxed">
                Ontdek onze trainingen en vind de begeleiding die bij jou past.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 px-10 py-7 text-base rounded-full shadow-lg">
                <Link to="/msc-training">
                  Bekijk de trainingen
                  <ArrowRight className="ml-2 h-5 w-5" />
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

export default Trainers;
