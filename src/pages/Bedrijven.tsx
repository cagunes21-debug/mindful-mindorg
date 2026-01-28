import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Heart, 
  Users, 
  TrendingUp, 
  Brain, 
  Calendar, 
  CheckCircle,
  Building2,
  Sparkles
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const benefits = [
  {
    icon: Heart,
    title: "Verminderde Stress",
    description: "Medewerkers leren effectief omgaan met werkdruk en stress door mindfulness en zelfcompassie technieken."
  },
  {
    icon: Brain,
    title: "Betere Focus",
    description: "Mindfulness training verbetert concentratie en productiviteit, wat leidt tot kwalitatief beter werk."
  },
  {
    icon: Users,
    title: "Sterkere Teams",
    description: "Compassie-gebaseerde communicatie bevordert samenwerking en vermindert conflicten op de werkvloer."
  },
  {
    icon: TrendingUp,
    title: "Lager Verzuim",
    description: "Organisaties die investeren in welzijn zien een significante daling in ziekteverzuim en burn-out."
  }
];

const offerings = [
  {
    title: "Incompany Training",
    duration: "8 weken",
    description: "Volledige Mindful Self-Compassion training op locatie voor teams en afdelingen.",
    features: [
      "Wekelijkse sessies van 2,5 uur",
      "Maximaal 20 deelnemers",
      "Inclusief werkboeken en audio-oefeningen",
      "Certificaat van deelname"
    ]
  },
  {
    title: "Workshop",
    duration: "Dagdeel of dag",
    description: "Introductie in mindfulness en zelfcompassie, perfect als kennismaking of teambuilding.",
    features: [
      "Flexibele duur (2-6 uur)",
      "Praktische oefeningen",
      "Direct toepasbare technieken",
      "Geschikt voor grote groepen"
    ]
  },
  {
    title: "Keynote & Lezing",
    duration: "45-90 min",
    description: "Inspirerende presentatie over de wetenschap en praktijk van zelfcompassie op de werkvloer.",
    features: [
      "Wetenschappelijke onderbouwing",
      "Interactieve elementen",
      "Geschikt voor events en conferenties",
      "Q&A mogelijkheid"
    ]
  }
];

const Bedrijven = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO 
        title="Voor Bedrijven | Mindfulness & Welzijn op de Werkvloer"
        description="Investeer in het welzijn van uw medewerkers. Incompany mindfulness trainingen, workshops en lezingen voor meer veerkracht en minder stress."
        keywords="mindfulness bedrijven, incompany training, medewerkerswelzijn, stress op werk, burn-out preventie, zelfcompassie training"
      />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-50 to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-terracotta-100 text-terracotta-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Building2 className="h-4 w-4" />
              Voor Organisaties
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6"
            >
              Investeer in het welzijn van uw medewerkers
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Mindfulness en zelfcompassie op de werkvloer: voor meer veerkracht, 
              betere samenwerking en duurzame prestaties.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                <Link to="/contact">Neem Contact Op</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-16 md:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Waarom investeren in welzijn?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Onderzoek toont aan dat mindfulness en zelfcompassie trainingen meetbare 
                voordelen opleveren voor zowel medewerkers als organisaties.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 0.1}>
                <Card className="h-full border-warm-200 bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-100 text-sage-600 mb-4">
                      <benefit.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-terracotta-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div>
                <p className="text-5xl md:text-6xl font-serif mb-2">32%</p>
                <p className="text-terracotta-100">minder stress na 8 weken training</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <p className="text-5xl md:text-6xl font-serif mb-2">28%</p>
                <p className="text-terracotta-100">verbetering in emotioneel welzijn</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <p className="text-5xl md:text-6xl font-serif mb-2">25%</p>
                <p className="text-terracotta-100">minder ziekteverzuim</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Ons Aanbod voor Bedrijven
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Wij bieden verschillende programma's aan die passen bij de behoeften en 
                mogelijkheden van uw organisatie.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {offerings.map((offering, index) => (
              <ScrollReveal key={offering.title} delay={index * 0.1}>
                <Card className="h-full border-warm-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-terracotta-600 text-sm font-medium mb-3">
                      <Calendar className="h-4 w-4" />
                      {offering.duration}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {offering.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {offering.description}
                    </p>
                    <ul className="space-y-2">
                      {offering.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 md:py-24 bg-sage-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                  Onze Aanpak
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <Sparkles className="h-8 w-8 text-terracotta-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Wetenschappelijk Onderbouwd
                  </h3>
                  <p className="text-muted-foreground">
                    Onze programma's zijn gebaseerd op het Mindful Self-Compassion (MSC) 
                    programma, ontwikkeld door dr. Kristin Neff en dr. Christopher Germer. 
                    Jarenlang onderzoek bewijst de effectiviteit van deze aanpak.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <Users className="h-8 w-8 text-terracotta-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Op Maat Gemaakt
                  </h3>
                  <p className="text-muted-foreground">
                    Wij stemmen elk programma af op de specifieke context en behoeften van 
                    uw organisatie. Van kleine teams tot grote afdelingen, van startups 
                    tot multinationals.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center bg-warm-100 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Vrijblijvend Kennismaken?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Wij denken graag met u mee over hoe mindfulness en zelfcompassie kunnen 
                bijdragen aan het welzijn binnen uw organisatie.
              </p>
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full">
                <Link to="/contact">Plan een Gesprek</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bedrijven;
