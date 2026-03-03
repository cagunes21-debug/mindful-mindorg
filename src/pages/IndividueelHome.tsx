import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Sparkles, ArrowRight, Check, Shield, Star, Compass, PenTool, Users, MessageCircle } from "lucide-react";
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
import meditationPractice from "@/assets/meditation-practice.jpg";

const benefits = [
  {
    icon: Heart,
    title: "Zelfcompassie",
    description: "Omgaan met moeilijkheden met mildheid in plaats van zelfkritiek",
  },
  {
    icon: Shield,
    title: "Emotionele balans",
    description: "Meer veerkracht en innerlijke rust in uitdagende momenten",
  },
  {
    icon: Compass,
    title: "Mindful bewustzijn",
    description: "Leven met meer aanwezigheid en verbinding met jezelf",
  },
  {
    icon: Star,
    title: "Innerlijke kracht",
    description: "Een warme, ondersteunende relatie met jezelf opbouwen",
  },
  {
    icon: PenTool,
    title: "Praktische tools",
    description: "Concrete handvatten die je direct kunt toepassen in je dagelijks leven",
  },
];

const packageItems = [
  "Intakegesprek",
  "6 individuele sessies",
  "Extra reflectiesessie (afronding en integratie)",
  "Persoonlijke oefeningen en handvatten",
  "Korte reflectie per mail tussen sessies",
];

const testimonials = [
  {
    quote: "De individuele sessies waren precies wat ik nodig had. In mijn eigen tempo, met volledige aandacht voor mijn persoonlijke thema's.",
    author: "Renate",
  },
  {
    quote: "Na jaren worstelen met perfectionisme heb ik eindelijk tools gevonden die echt werken. De persoonlijke aanpak maakte het verschil.",
    author: "Bas",
  },
  {
    quote: "Ik voelde me vanaf het begin veilig en gezien. De sessies gaven me de rust die ik zocht.",
    author: "Nadia",
  },
];

const IndividueelHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Individuele Begeleiding | Mindful Zelfcompassie"
        description="Ontdek je innerlijke kracht met persoonlijke 1-op-1 begeleiding in mindful zelfcompassie. Op jouw tempo, volledig afgestemd op jouw behoeften."
        canonical="https://mindfulmind.nl"
      />
      <OrganizationSchema />
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0">
          <img
            src={heroMindfulness}
            alt="Individuele begeleiding mindful zelfcompassie"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-warm-50/95 via-warm-50/85 to-warm-50/60" />
        </div>

        <div className="absolute top-20 left-10 w-64 h-64 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block rounded-full bg-terracotta-100/80 px-5 py-2 text-sm font-medium tracking-wide text-terracotta-700">
                1-op-1 Begeleiding
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.15]"
            >
              Ontdek je
              <span className="block font-serif italic text-terracotta-600 mt-2 text-[1.1em]">
                innerlijke kracht
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
            >
              Beantwoord moeilijke momenten met mildheid in plaats van zelfkritiek. 
              Persoonlijke begeleiding, volledig afgestemd op jouw tempo en behoeften.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg">
                <Link to="/contact">
                  Plan een kennismaking
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-7 text-lg">
                <a href="#wat-je-ervaart">
                  Meer ontdekken
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Herken je dit? */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div>
                  <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-6">
                    Herken je <span className="font-serif italic text-terracotta-600">dit?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Altijd maar doorgaan, hoge verwachtingen van jezelf, en toch dat stemmetje dat zegt dat je niet genoeg bent?
                  </p>
                  <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200">
                    <h3 className="text-xl font-medium text-foreground mb-3">
                      Wat als je jezelf net zo liefdevol zou behandelen als een goede vriend(in)?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Tijdens dit traject leer je om vriendelijker om te gaan met jezelf, ook wanneer het leven tegenzit. Je ontwikkelt meer begrip, rust en veerkracht — precies wat je nodig hebt om vanuit balans te leven.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <img
                  src={meditationPractice}
                  alt="Mindful zelfcompassie meditatie"
                  className="rounded-2xl shadow-lg w-full aspect-[4/5] object-cover"
                  loading="lazy"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Wat je zult ervaren */}
      <section id="wat-je-ervaart" className="py-16 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-4">
                  Wat je zult <span className="font-serif italic text-terracotta-600">ervaren</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Persoonlijke begeleiding die je helpt om een warmere relatie met jezelf op te bouwen.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <StaggerItem key={i}>
                  <Card className="border-warm-200 bg-white rounded-2xl h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <benefit.icon className="h-6 w-6 text-terracotta-500 mb-4" />
                      <h3 className="font-medium text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Het pakket */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <ScrollReveal>
                <div>
                  <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-4">
                    Individueel <span className="font-serif italic text-terracotta-600">Traject</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Een persoonlijk begeleidingstraject, volledig afgestemd op jouw situatie en behoeften.
                  </p>
                  <p className="text-4xl font-light text-terracotta-600 mb-2">€550</p>
                  <p className="text-sm text-muted-foreground mb-8">Inclusief alle sessies en materiaal</p>
                  <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 shadow-lg">
                    <Link to="/contact">
                      Start jouw traject
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Card className="border-warm-200 bg-warm-50 rounded-2xl">
                  <CardContent className="p-6">
                    <h4 className="font-medium text-foreground mb-4">Het pakket omvat:</h4>
                    <ul className="space-y-3">
                      {packageItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-foreground text-sm">
                          <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-terracotta-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight text-center mb-12">
                Wat anderen <span className="font-serif italic text-terracotta-600">zeggen</span>
              </h2>
            </ScrollReveal>
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <StaggerItem key={i}>
                  <Card className="border-warm-200 bg-white rounded-2xl h-full">
                    <CardContent className="p-6">
                      <MessageCircle className="h-5 w-5 text-terracotta-300 mb-3" />
                      <p className="text-muted-foreground text-sm leading-relaxed italic mb-4">"{t.quote}"</p>
                      <p className="font-medium text-foreground text-sm">— {t.author}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Trainers kort */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-6">
                Ontmoet <span className="font-serif italic text-terracotta-600">de trainers</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="text-center">
                  <Users className="h-8 w-8 text-terracotta-400 mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-1">Çağla Güneş</h3>
                  <p className="text-sm text-muted-foreground">Traumatherapeut en Mindful Zelfcompassie-trainer</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-terracotta-400 mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-1">Sabine Trampe</h3>
                  <p className="text-sm text-muted-foreground">GGZ psycholoog en Mindful Zelfcompassie-trainer</p>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-8 border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                <Link to="/trainers">
                  Lees meer over onze trainers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-terracotta-50 via-warm-50 to-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-4">
                Schrijf je nu in!
              </h2>
              <p className="text-xl font-serif italic text-terracotta-600 mb-2">
                Je bent welkom zoals je bent
              </p>
              <p className="text-muted-foreground mb-8">
                Beperkte plekken beschikbaar
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg">
                  <Link to="/contact">
                    Plan een kennismaking
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 py-7 text-lg">
                  <Link to="/msc-training">
                    Bekijk de groepstraining
                    <ArrowRight className="ml-3 h-5 w-5" />
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

export default IndividueelHome;
