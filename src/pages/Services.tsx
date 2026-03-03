import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Calendar, Globe, BookOpen, Compass, Users, Sparkles, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Ons Aanbod"
        description="Ontdek ons aanbod: 8-weekse groepstraject, individueel traject en losse sessies. Vind de vorm die bij jou past."
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
              <Compass className="h-4 w-4" />
              Ons Aanbod
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Diensten
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Iedereen bewandelt zijn of haar eigen pad. Soms wil je groeien in een groep, soms juist met persoonlijke begeleiding. Hieronder vind je de mogelijkheden.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 1. Groepstraject */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div>
                  <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                    Groepstraject
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    🌿 Mindful zelfcompassie <span className="font-serif italic text-terracotta-600">(8 weken)</span>
                  </h2>
                  <p className="text-terracotta-600 font-medium mb-6">
                    Wil je leren vriendelijker met jezelf om te gaan, beter omgaan met stress en meer innerlijke rust ervaren?
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    In dit 8-weekse groepstraject werk je samen met anderen aan zelfcompassie en emotionele veerkracht.
                  </p>
                  
                  <h4 className="font-medium text-foreground mb-4">Wat je krijgt:</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      "8 begeleide groepssessies",
                      "Meditaties en praktische oefeningen",
                      "Reflectie en uitwisseling in een veilige setting",
                      "Tools om thuis verder te oefenen",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <Check className="h-4 w-4 text-terracotta-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <Link to="/msc-training">
                      Bekijk actuele startmomenten
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.2}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-terracotta-100 to-sage-100 rounded-3xl transform rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-6">
                        <Users className="h-10 w-10 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">Groepstraject</h3>
                      <p className="text-muted-foreground mb-4">8 weken · samen groeien</p>
                      <p className="text-3xl font-light text-terracotta-600">€550</p>
                      <p className="text-sm text-muted-foreground mt-2">voor het volledige traject</p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Individueel Traject */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right" className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-warm-100 rounded-3xl transform -rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center mb-6">
                        <Heart className="h-10 w-10 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">Individueel Traject</h3>
                      <p className="text-muted-foreground mb-4">6 sessies · incl. intake & reflectie</p>
                      <div className="inline-block rounded-full bg-terracotta-100 px-3 py-1 text-xs font-semibold text-terracotta-700 mb-3">
                        ✨ Tijdelijke aanbieding
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <p className="text-xl font-light text-muted-foreground line-through">€650</p>
                        <p className="text-3xl font-light text-terracotta-600">€550</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.2} className="order-1 lg:order-2">
                <div>
                  <span className="inline-block rounded-full bg-sage-200 px-4 py-1.5 text-xs font-semibold text-sage-800 mb-6">
                    Persoonlijk
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    🌿 Individueel Traject <span className="font-serif italic text-terracotta-600">– 6-sessiepakket</span>
                  </h2>
                  <p className="text-terracotta-600 font-medium mb-6">
                    Wil je persoonlijk, op maat begeleid worden en écht de diepte ingaan op jouw thema's?
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Dit pakket is ideaal voor wie een duurzame stap wil zetten.
                  </p>
                  
                  <h4 className="font-medium text-foreground mb-4">Het pakket omvat:</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Intakegesprek",
                      "6 individuele sessies",
                      "Extra reflectiesessie (afronding en integratie)",
                      "Persoonlijke oefeningen en handvatten",
                      "Mogelijkheid tot korte reflectie per mail tussen sessies",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <Check className="h-4 w-4 text-sage-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <Link to="/contact">
                      Neem contact op
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Individuele Sessie (los) */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                  Losse sessies
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  🌿 Individuele Sessie <span className="font-serif italic text-terracotta-600">(los)</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                  Wil je eerst kennismaken of een losse sessie boeken rond een specifiek thema?
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <ScrollReveal animation="fade-right">
                <Card className="border-warm-200 bg-warm-50 rounded-2xl overflow-hidden h-full">
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-5">
                      <Sparkles className="h-6 w-6 text-terracotta-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Kennismakingssessie</h3>
                    <p className="text-xs text-muted-foreground mb-4 font-medium">Eenmalig</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Een eerste verdiepende sessie waarin we helder krijgen waar je staat en wat je nodig hebt. Je ervaart direct hoe het is om samen te werken en krijgt concrete inzichten.
                    </p>
                    <div className="pt-4 border-t border-warm-200">
                      <p className="text-sm text-muted-foreground">60 minuten</p>
                      <p className="text-2xl font-light text-terracotta-600 mt-1">€95</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.2}>
                <Card className="border-warm-200 bg-warm-50 rounded-2xl overflow-hidden h-full">
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-5">
                      <Heart className="h-6 w-6 text-sage-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Reguliere individuele sessie</h3>
                    <p className="text-xs text-muted-foreground mb-4 font-medium">Per sessie</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Persoonlijke begeleiding, volledig afgestemd op jouw vraag of proces. We werken verdiepend en concreet aan wat op dat moment aandacht vraagt.
                    </p>
                    <div className="pt-4 border-t border-warm-200">
                      <p className="text-sm text-muted-foreground">60 minuten</p>
                      <p className="text-2xl font-light text-terracotta-600 mt-1">€125</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
            
            <ScrollReveal delay={0.3}>
              <div className="text-center mt-10">
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                  <Link to="/contact">
                    Boek een sessie
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Welke vorm past bij jou? */}
      <section className="py-24 lg:py-28 bg-gradient-to-b from-warm-50 to-sage-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <h2 className="mb-10 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                Welke vorm past <span className="font-serif italic text-terracotta-600">bij jou?</span>
              </h2>
              
              <div className="space-y-4 text-left max-w-lg mx-auto mb-12">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 border border-warm-200">
                  <span className="text-lg mt-0.5">→</span>
                  <p className="text-foreground">
                    <strong>Zoek je verbinding en herkenning in een groep?</strong><br />
                    <span className="text-muted-foreground">Kies het 8-weekse groepstraject</span>
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 border border-warm-200">
                  <span className="text-lg mt-0.5">→</span>
                  <p className="text-foreground">
                    <strong>Wil je persoonlijke verdieping en maatwerk?</strong><br />
                    <span className="text-muted-foreground">Kies het 6-sessie individuele traject</span>
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/80 border border-warm-200">
                  <span className="text-lg mt-0.5">→</span>
                  <p className="text-foreground">
                    <strong>Twijfel je nog of wil je eerst ervaren hoe het is?</strong><br />
                    <span className="text-muted-foreground">Boek een kennismakingssessie</span>
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-lg mb-8">
                Je bent van harte welkom om te starten waar het voor jou goed voelt 🌿
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-10 py-7 text-base rounded-full shadow-lg">
                <Link to="/contact">
                  Neem contact op
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

export default Services;
