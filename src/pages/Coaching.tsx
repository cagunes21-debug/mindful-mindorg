import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Clock, MapPin, Users, Sparkles, Check, MessageSquareQuote, Video, Shield, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/StructuredData";
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

const packages = [
  {
    title: "Losse sessie",
    description: "Eenmalige sessie voor een specifieke vraag of opfrismoment",
    price: "€110",
    duration: "60 minuten",
    features: ["Online via Zoom", "Direct inplanbaar", "Geen verplichtingen"],
  },
  {
    title: "6-sessies pakket",
    description: "Uitgebreid traject voor duurzame verandering en integratie",
    price: "€550",
    originalPrice: "€650",
    duration: "6 sessies · incl. intake & reflectie",
    features: ["✨ Tijdelijke aanbieding", "Intensieve begeleiding", "Persoonlijk oefenprogramma", "Ondersteuning per mail"],
    popular: true,
  },
];

const testimonials = [
  {
    quote: "De individuele sessies waren precies wat ik nodig had. In mijn eigen tempo, met volledige aandacht voor mijn persoonlijke thema's.",
    author: "Renate",
    role: "Coaching cliënt",
  },
  {
    quote: "Na jaren worstelen met perfectionisme heb ik eindelijk tools gevonden die echt werken. De persoonlijke aanpak maakte het verschil.",
    author: "Bas",
    role: "Coaching cliënt",
  },
  {
    quote: "Ik voelde me vanaf het begin veilig en gezien. De sessies online werkten verrassend goed en gaven me de flexibiliteit die ik nodig had.",
    author: "Nadia",
    role: "Coaching cliënt",
  },
];

const faqItems = [
  {
    question: "Voor wie is individuele begeleiding geschikt?",
    answer: "Individuele begeleiding is geschikt voor iedereen die behoefte heeft aan persoonlijke begeleiding en aandacht. Het is ideaal als je liever niet in een groep werkt, specifieke thema's wilt aanpakken, of je eigen tempo wilt bepalen.",
  },
  {
    question: "Wat is het verschil met de groepstraining?",
    answer: "In de groepstraining volg je een vast curriculum samen met anderen. Bij individuele begeleiding stemmen we de inhoud volledig af op jouw persoonlijke situatie, thema's en tempo. Je krijgt onverdeelde aandacht en maatwerk.",
  },
  {
    question: "Hoe werkt online coaching?",
    answer: "We werken via Zoom in een beveiligde omgeving. Je ontvangt een link per e-mail en logt in vanaf een rustige plek. De ervaring is persoonlijk en intiem, vergelijkbaar met een sessie op locatie.",
  },
  {
    question: "Waar vinden de sessies plaats?",
    answer: "Alle sessies vinden online plaats via Zoom. Je ontvangt een link per e-mail en logt in vanaf een rustige plek. De ervaring is persoonlijk en intiem.",
  },
  {
    question: "Hoe lang duurt een traject?",
    answer: "Dat hangt af van jouw behoeften en doelen. Sommige mensen hebben genoeg aan 3 sessies, anderen kiezen voor een langer traject. We evalueren samen wat je nodig hebt.",
  },
  {
    question: "Wordt coaching vergoed door de zorgverzekering?",
    answer: "Onze coaching valt niet onder de reguliere zorgverzekering. Sommige aanvullende verzekeringen vergoeden wel coaching of persoonlijke ontwikkeling. Check je polis of neem contact op met je verzekeraar.",
  },
];

const Coaching = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Individuele Begeleiding"
        description="Persoonlijke begeleiding in zelfcompassie en mindfulness. Online sessies die aansluiten bij jouw leven en tempo."
      />
      <FAQSchema items={faqItems} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta-100/40 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-warm-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Heart className="h-4 w-4" />
              Persoonlijke begeleiding
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Individuele
              <span className="block font-serif italic text-terracotta-600 mt-2">Begeleiding</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Persoonlijke begeleiding die helemaal op jou is afgestemd. 
              Werk in je eigen tempo aan zelfcompassie, met volledige aandacht voor jouw thema's.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                <a href="#pakketten">
                  Bekijk pakketten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <a href="mailto:mindful-mind@outlook.com?subject=Vraag over coaching">
                  Plan een kennismaking
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For You If */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Coaching is voor jou als je <span className="font-serif italic text-terracotta-600">herkenning vindt in:</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Perfectionisme",
                  description: "Je legt de lat hoog en bent streng voor jezelf als je niet aan je eigen verwachtingen voldoet.",
                },
                {
                  icon: Shield,
                  title: "Grenzen stellen",
                  description: "Je vindt het moeilijk om 'nee' te zeggen en gaat vaak over je eigen grenzen heen.",
                },
                {
                  icon: Heart,
                  title: "Zelfkritiek",
                  description: "Je innerlijke criticus is luid aanwezig en je bent hard voor jezelf bij fouten of tegenslagen.",
                },
                {
                  icon: Users,
                  title: "Prioriteit bij anderen",
                  description: "De behoeften van anderen gaan vaak voor, waardoor je eigen zelfzorg in het gedrang komt.",
                },
                {
                  icon: Sparkles,
                  title: "Rust zoeken",
                  description: "Je verlangt naar meer rust en balans, maar weet niet goed hoe je dit kunt bereiken.",
                },
                {
                  icon: Video,
                  title: "Flexibiliteit nodig",
                  description: "Een groepstraining past niet in je agenda of je geeft de voorkeur aan individuele begeleiding.",
                },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <Card className="border-warm-200 bg-gradient-to-br from-warm-50 to-white rounded-2xl h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-4">
                        <item.icon className="h-6 w-6 text-terracotta-600" />
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

      {/* Approach */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    Onze <span className="font-serif italic text-terracotta-600">benadering</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Onze coaching is geworteld in Mindful Self-Compassion (MSC) en aangevuld met 
                    inzichten uit ACT, somatische therapie en trauma-sensitieve mindfulness.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    We werken vanuit de overtuiging dat iedereen de capaciteit heeft om 
                    vriendelijker naar zichzelf te leren kijken — en dat dit geen luxe is, 
                    maar een fundamentele vaardigheid voor welzijn.
                  </p>
                  
                  <ul className="space-y-4">
                    {[
                      "Veilige, warme en trauma-sensitieve aanpak",
                      "Praktische oefeningen voor het dagelijks leven",
                      "Wetenschappelijk onderbouwde methoden",
                      "Volledig afgestemd op jouw tempo en behoeften",
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
                      <h3 className="text-xl font-semibold text-foreground mb-6">Sessies zijn beschikbaar:</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-warm-50">
                          <Video className="h-6 w-6 text-terracotta-500" />
                          <div>
                            <p className="font-medium text-foreground">Online via Zoom</p>
                            <p className="text-sm text-muted-foreground">Flexibel en vanuit je eigen vertrouwde omgeving</p>
                          </div>
                        </div>
                         <div className="flex items-center gap-4 p-4 rounded-xl bg-warm-50">
                          <Video className="h-6 w-6 text-terracotta-500" />
                          <div>
                            <p className="font-medium text-foreground">Online via Zoom</p>
                            <p className="text-sm text-muted-foreground">Flexibel en vanuit je eigen vertrouwde omgeving</p>
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

      {/* Packages */}
      <section id="pakketten" className="py-20 lg:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Kies je <span className="font-serif italic text-terracotta-600">pakket</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Flexibele opties die passen bij jouw behoeften
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              {packages.map((pkg, index) => (
                <StaggerItem key={index}>
                  <Card className={`border-0 rounded-3xl shadow-lg overflow-hidden h-full relative ${
                    pkg.popular 
                      ? "bg-gradient-to-br from-terracotta-50 to-white ring-2 ring-terracotta-300" 
                      : "bg-gradient-to-br from-warm-50 to-white"
                  }`}>
                    {pkg.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-terracotta-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Populair
                        </span>
                      </div>
                    )}
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{pkg.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>
                      
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-light text-terracotta-600">{pkg.price}</span>
                          {pkg.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through">{pkg.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{pkg.duration}</p>
                      </div>
                      
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-sage-600" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button asChild className={`w-full rounded-full ${
                        pkg.popular 
                          ? "bg-terracotta-600 hover:bg-terracotta-700 text-white" 
                          : "bg-warm-200 hover:bg-warm-300 text-foreground"
                      }`}>
                        <a href="mailto:mindful-mind@outlook.com?subject=Aanvraag coaching">
                          Neem contact op
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

      {/* Process */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Hoe het <span className="font-serif italic text-terracotta-600">werkt</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-4">
              {[
                { step: "1", title: "Contact", description: "Neem contact op via e-mail of het contactformulier" },
                { step: "2", title: "Kennismaking", description: "Gratis telefonisch gesprek om je vraag te bespreken" },
                { step: "3", title: "Planning", description: "We plannen je eerste sessie op een moment dat past" },
                { step: "4", title: "Start", description: "Je begint aan je persoonlijke reis naar meer zelfcompassie" },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="text-center">
                    <div className="h-14 w-14 rounded-full bg-terracotta-500 text-white flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
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
                  Ervaringen van <span className="font-serif italic text-terracotta-600">cliënten</span>
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

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-warm-50">
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
                    className="border border-warm-200 rounded-xl px-6 bg-white"
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
              Klaar voor persoonlijke begeleiding?
              <span className="block font-serif italic mt-2">Neem de eerste stap</span>
            </h2>
            <p className="text-terracotta-100 text-lg mb-8">
              Plan een gratis telefonische kennismaking en ontdek wat coaching voor jou kan betekenen.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <a href="mailto:mindful-mind@outlook.com?subject=Aanvraag kennismakingsgesprek">
                  Plan kennismaking
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

export default Coaching;
