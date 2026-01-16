import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, ArrowRight, Check, Leaf, Sun, Sparkles, MessageSquareQuote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { OrganizationSchema, FAQSchema, WebsiteSchema } from "@/components/StructuredData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const offerings = [
  {
    title: "Mindful Self-Compassion (MSC)",
    subtitle: "8-weekse training",
    description: "Leer jezelf te ondersteunen in plaats van jezelf te pushen. Mindful Self-Compassion (MSC) is een wetenschappelijk onderbouwd programma, ontwikkeld door Dr. Kristin Neff en Dr. Christopher Germer.",
    benefits: [
      "Vaardiger omgaan met zelfkritiek",
      "Emotionele veerkracht opbouwen",
      "Met vriendelijkheid reageren op moeilijkheden",
      "Een ondersteunende innerlijke relatie creëren",
    ],
    ideal: "Ideaal als je zorgzaam, verantwoordelijk bent en vaak streng voor jezelf.",
    link: "/msc-training",
    linkText: "Meer over MSC",
    icon: Leaf,
    color: "sage",
  },
  {
    title: "Mindfulness-Based Stress Reduction (MBSR)",
    subtitle: "8-weekse training",
    description: "Mindfulness-Based Stress Reduction (MBSR), ontwikkeld door Jon Kabat-Zinn, is een van de meest onderzochte mindfulnessprogramma's wereldwijd.",
    benefits: [
      "Stress en overweldiging verminderen",
      "Focus en mentale helderheid vergroten",
      "Reageren in plaats van reageren",
      "Een duurzame mindfulnesspraktijk ontwikkelen",
    ],
    ideal: "Bijzonder geschikt als stress, spanning of mentale overbelasting centraal staan in je leven.",
    link: "/intensief",
    linkText: "Meer over MBSR",
    icon: Leaf,
    color: "sage",
  },
  {
    title: "Workshops",
    subtitle: "Korte, toegankelijke sessies",
    description: "Onze workshops bieden een zachte introductie of verdieping van mindfulness- en zelfcompassiethema's in een korter format — variërend van enkele uren tot een hele dag.",
    benefits: [
      "Werken met stress en overweldiging",
      "Zelfcompassie in het dagelijks leven",
      "Omgaan met zelfkritiek",
      "Mindfulness op het werk",
      "Emotionele veerkracht en balans",
    ],
    ideal: "Wil je mindfulness of zelfcompassie verkennen zonder langdurige commitment.",
    link: "/workshops",
    linkText: "Bekijk workshops",
    icon: Sparkles,
    color: "terracotta",
  },
  {
    title: "Retreat in Barcelona",
    subtitle: "Mindfulness & Zelfcompassie Retreat",
    description: "Stap uit je dagelijkse routines en in een ruimte van rust, reflectie en vernieuwing. Deze retreat combineert mindfulness, zelfcompassie, lichaamsgerichte oefeningen en stilte.",
    benefits: [
      "Diepe rust voor lichaam en zenuwstelsel",
      "Begeleide mindfulness- en zelfcompassieoefeningen",
      "Tijd voor stilte, reflectie en integratie",
      "Betekenisvolle verbinding met anderen",
      "Ruimte om te herontdekken wat echt belangrijk is",
    ],
    ideal: "Perfect als je behoefte hebt om te vertragen, te resetten en je praktijk te verdiepen.",
    link: "/barcelona-retreat",
    linkText: "Ontdek de Barcelona retreat",
    icon: Sun,
    color: "warm",
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

const participantExperiences = [
  "Meer rust en balans",
  "Toegenomen emotionele veerkracht",
  "Minder stress en zelfkritiek",
  "Gezondere grenzen en zelfzorg",
  "Diepere verbinding met jezelf en anderen",
];

const faqItems = [
  { question: "Wat is MSC?", answer: "Mindful Self-Compassion is een wetenschappelijk onderbouwde 8-weekse training die je leert om jezelf met vriendelijkheid te ondersteunen." },
  { question: "Wat is MBSR?", answer: "Mindfulness-Based Stress Reduction is een van de meest onderzochte mindfulnessprogramma's voor het verminderen van stress en overweldiging." },
  { question: "Voor wie zijn de trainingen?", answer: "Onze trainingen zijn geschikt voor iedereen die merkt dat ze vaak streng zijn voor zichzelf, moeilijk grenzen aangeven, of behoefte hebben aan meer rust en zelfzorg." },
  { question: "Heb ik ervaring nodig?", answer: "Nee, je hebt geen ervaring met meditatie nodig om deel te nemen aan onze trainingen." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Mindful Mind | Mindfulness, Zelfcompassie & Bewust Leven"
        description="Je welzijn begint bij hoe je jezelf behandelt. Mindfulness, zelfcompassie en bewust leven — gebaseerd op wetenschap, begeleid met zorg."
      />
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
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-muted-foreground text-lg md:text-xl mb-4"
            >
              Je welzijn begint bij hoe je jezelf behandelt
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Kom thuis bij
              <span className="block font-serif italic text-terracotta-600 mt-2">jezelf</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Mindfulness, zelfcompassie en bewust leven — gebaseerd op wetenschap, begeleid met zorg.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <Link to="#aanbod">
                  Ontdek ons aanbod
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Een plek om te vertragen */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl leading-tight">
                Een plek om te vertragen en te <span className="font-serif italic text-terracotta-600">herontdekken</span>
              </h2>
              <div className="text-muted-foreground text-lg leading-relaxed space-y-6">
                <p>
                  In een wereld die vraagt om sneller te bewegen, meer te doen en sterker te zijn, 
                  bieden wij een andere benadering.
                </p>
                <p className="text-xl font-light text-foreground">
                  Een uitnodiging om te pauzeren. Om te luisteren. Om jezelf te benaderen met bewustzijn, vriendelijkheid en vertrouwen.
                </p>
                <p>
                  Onze programma's ondersteunen je om het leven te ontmoeten zoals het is — met meer rust, helderheid en compassie.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Ons Aanbod */}
      <section id="aanbod" className="py-20 lg:py-24 bg-warm-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Ons Aanbod
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Vind wat bij <span className="font-serif italic text-terracotta-600">jou past</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8">
              {offerings.map((offering, index) => (
                <StaggerItem key={index}>
                  <Card className="border-0 rounded-3xl shadow-lg overflow-hidden bg-white">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          offering.color === "terracotta" 
                            ? "bg-gradient-to-br from-terracotta-100 to-terracotta-200" 
                            : offering.color === "sage"
                            ? "bg-gradient-to-br from-sage-100 to-sage-200"
                            : "bg-gradient-to-br from-warm-100 to-warm-200"
                        }`}>
                          <offering.icon className={`h-6 w-6 ${
                            offering.color === "terracotta" 
                              ? "text-terracotta-600" 
                              : offering.color === "sage"
                              ? "text-sage-700"
                              : "text-warm-600"
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-foreground">{offering.title}</h3>
                          <p className="text-sm text-muted-foreground">{offering.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{offering.description}</p>
                      
                      <div className="mb-6">
                        <p className="text-sm font-medium text-foreground mb-3">Je leert:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {offering.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-sage-600 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-terracotta-600 mb-6 italic">{offering.ideal}</p>
                      
                      <Button asChild className="rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white">
                        <Link to={offering.link}>
                          {offering.linkText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Welk aanbod past bij jou */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Welk aanbod past bij <span className="font-serif italic text-terracotta-600">jou?</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-5 rounded-xl bg-sage-50 border border-sage-200">
                  <Leaf className="h-5 w-5 text-sage-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">MSC</p>
                    <p className="text-sm text-muted-foreground">als je een vriendelijkere relatie met jezelf wilt ontwikkelen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl bg-sage-50 border border-sage-200">
                  <Leaf className="h-5 w-5 text-sage-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">MBSR</p>
                    <p className="text-sm text-muted-foreground">als je praktische tools wilt om met stress om te gaan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl bg-terracotta-50 border border-terracotta-200">
                  <Sparkles className="h-5 w-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Workshops</p>
                    <p className="text-sm text-muted-foreground">als je gerichte verdieping wilt in een korter format</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl bg-warm-50 border border-warm-200">
                  <Sun className="h-5 w-5 text-warm-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Retreat</p>
                    <p className="text-sm text-muted-foreground">als je verlangt naar diepte, rust en ruimte</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                Al ons aanbod wordt begeleid met zorg, professionaliteit en een trauma-sensitieve benadering.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wat deelnemers ervaren */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700 mb-6">
                  Wat deelnemers vaak ervaren
                </span>
                <p className="text-muted-foreground text-lg">
                  Onderzoek en ervaringen laten zien dat deze praktijken kunnen ondersteunen bij:
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {participantExperiences.map((experience, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-warm-200 shadow-sm">
                    <Check className="h-5 w-5 text-sage-600 flex-shrink-0" />
                    <span className="text-foreground">{experience}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
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

      {/* Onze Aanpak */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-warm-100 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-6">
                  Onze Aanpak
                </span>
                <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  We werken vanuit <span className="font-serif italic text-terracotta-600">zachtheid, helderheid en veiligheid</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  "Evidence-based programma's",
                  "Ervaren begeleiding",
                  "Trauma-sensitieve aanpak",
                  "Respect voor jouw tempo",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-4 rounded-xl bg-white border border-warm-200 shadow-sm">
                    <Check className="h-4 w-4 text-sage-600 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-lg text-muted-foreground italic">
                  Je hoeft niet te veranderen wie je bent. Je leert anders om te gaan met wat je ervaart.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Over de trainers */}
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
                        Gecertificeerde MSC en MBSR trainers met achtergrond in psychologie, 
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
                    wat zelfcompassie en mindfulness voor jou betekent.
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

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
              Klaar om te beginnen?
            </h2>
            <p className="text-terracotta-100 text-lg mb-8">
              Of je nu een workshop, training of retreat volgt — je bent welkom precies zoals je bent.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <Link to="/agenda">
                  Bekijk actueel aanbod & data
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 border-2 border-white text-white hover:bg-white/30 rounded-full px-8">
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
