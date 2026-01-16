import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Calendar, Clock, Globe, Users, Sparkles, Mountain, BookOpen, Compass } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
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
              Ruimte voor innerlijke rust,
              <span className="block font-serif italic text-terracotta-600 mt-2">zelfcompassie en bewuste aanwezigheid</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Bij Mindful Mind staan zelfcompassie, bewuste aanwezigheid en innerlijke rust centraal. Je kiest wat past bij jouw leven en energie — van laagdrempelig tot verdiepend.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal animation="scale">
              <div className="bg-gradient-to-r from-warm-50 to-sage-50 rounded-3xl p-8 border border-warm-200">
                <p className="text-foreground text-lg leading-relaxed">
                  Ons aanbod beweegt mee met jou. Alle trainingen worden begeleid vanuit een <strong>trauma-sensitieve en zorgvuldige benadering</strong>, met aandacht voor veiligheid en eigen tempo.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8-Week Training */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right">
                <div>
                  <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-6">
                    Kernprogramma
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    8-weekse Zelfcompassie <span className="font-serif italic text-terracotta-600">Training</span>
                  </h2>
                  <p className="text-terracotta-600 font-medium mb-6">
                    Voor wie meer rust en stabiliteit wil ervaren in het dagelijks leven
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Een wetenschappelijk onderbouwde training waarin je leert omgaan met stress, emoties en zelfkritiek met meer vriendelijkheid en veerkracht. Je ontwikkelt praktische vaardigheden om jezelf te ondersteunen en zelfcompassie stap voor stap te integreren in je dagelijks leven.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-warm-100 px-4 py-2 text-sm text-foreground">
                      <Calendar className="h-4 w-4 text-terracotta-500" /> 8 weken
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-warm-100 px-4 py-2 text-sm text-foreground">
                      <Globe className="h-4 w-4 text-terracotta-500" /> Online
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-warm-100 px-4 py-2 text-sm text-foreground">
                      <BookOpen className="h-4 w-4 text-terracotta-500" /> NL of EN
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-6">
                    Inclusief begeleide oefeningen en reflectie
                  </p>
                  
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
                        <Heart className="h-10 w-10 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">MSC Training</h3>
                      <p className="text-muted-foreground mb-4">Mindful Self-Compassion</p>
                      <p className="text-3xl font-light text-terracotta-600">€550</p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal animation="fade-right" className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-warm-100 rounded-3xl transform -rotate-3" />
                  <Card className="relative border-0 bg-white rounded-3xl shadow-lg overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-6">
                        <Sparkles className="h-10 w-10 text-sage-700" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">Workshops</h3>
                      <p className="text-muted-foreground mb-4">Kennismaken of verdiepen</p>
                      <p className="text-lg text-sage-700">Kort & praktisch</p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.2} className="order-1 lg:order-2">
                <div>
                  <span className="inline-block rounded-full bg-sage-200 px-4 py-1.5 text-xs font-semibold text-sage-800 mb-6">
                    Laagdrempelig
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    Workshops in <span className="font-serif italic text-terracotta-600">Zelfcompassie</span>
                  </h2>
                  <p className="text-terracotta-600 font-medium mb-6">
                    Als je wilt kennismaken, verdiepen of opfrissen
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Een laagdrempelige workshop waarin je op een zachte manier kennismaakt met zelfcompassie. Je staat stil bij hoe je met jezelf omgaat in stressvolle of lastige momenten, en ontdekt hoe mildheid en aandacht helpend kunnen zijn.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-foreground">
                      <span className="h-2 w-2 rounded-full bg-sage-400" />
                      Kort en praktisch
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <span className="h-2 w-2 rounded-full bg-sage-400" />
                      Geen voorbereiding of verplichting
                    </li>
                    <li className="flex items-center gap-3 text-foreground">
                      <span className="h-2 w-2 rounded-full bg-sage-400" />
                      Online | Nederlands of Engels
                    </li>
                  </ul>
                  
                  <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                    <Link to="/msc-training">
                      Bekijk actuele data
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Barcelona Retreat */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta-400/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <ScrollReveal>
                <div>
                  <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white mb-6">
                    Verdieping
                  </span>
                  <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
                    Intensieve MSC Retreat
                    <span className="block font-serif italic mt-2">Barcelona</span>
                  </h2>
                  <p className="text-white/90 font-medium mb-6 text-lg">
                    Een paar dagen helemaal voor jezelf
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    Een intensieve en verdiepende retraite waarin je afstand neemt van het dagelijks leven. In een warme, gedragen setting is er ruimte om te vertragen, los te laten en opnieuw contact te maken met wat er in jou leeft.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    Deze retraite nodigt je uit om uit het hoofd te zakken en dieper te verbinden met jezelf — ondersteund door mindfulness en zelfcompassie.
                  </p>
                  
                  <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                    <a href="mailto:mindful-mind@outlook.com">
                      Ontvang meer informatie
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2} animation="scale">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-6" />
                    <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-10 text-center border border-white/30">
                      <div className="h-24 w-24 rounded-2xl bg-white/30 flex items-center justify-center mb-6 mx-auto">
                        <Mountain className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">Barcelona Retreat</h3>
                      <p className="text-white/80 mb-4">Intensieve MSC ervaring</p>
                      <p className="text-white/90 text-sm">Als je behoefte hebt aan tijd en ruimte voor jezelf</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Intensive Programs */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block rounded-full bg-warm-200 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-6">
                  Compact & Intensief
                </span>
                <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Intensieve <span className="font-serif italic text-terracotta-600">Trajecten</span>
                </h2>
                <p className="text-terracotta-600 font-medium text-lg">
                  Als je verdieping zoekt in een compacte vorm
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2 mb-12">
              <StaggerItem>
                <Card className="border-warm-200 bg-gradient-to-br from-warm-50 to-white rounded-3xl overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-8">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-6">
                      <BookOpen className="h-7 w-7 text-sage-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">MBSR</h3>
                    <p className="text-sm text-terracotta-600 font-medium mb-4">Mindfulness-Based Stress Reduction</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Voor wie stress en spanning beter wil leren herkennen en hier met meer rust en mildheid mee om wil gaan.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
              
              <StaggerItem>
                <Card className="border-warm-200 bg-gradient-to-br from-terracotta-50 to-white rounded-3xl overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-8">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-6">
                      <Heart className="h-7 w-7 text-terracotta-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">MSC</h3>
                    <p className="text-sm text-terracotta-600 font-medium mb-4">Mindful Self-Compassion</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Voor wie de stap wil maken van weten naar belichamen, en zelfcompassie dieper wil integreren.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            </StaggerContainer>
            
            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-warm-100 px-4 py-2 text-sm text-foreground">
                    <Calendar className="h-4 w-4 text-terracotta-500" /> 4-daagse trajecten
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-warm-100 px-4 py-2 text-sm text-foreground">
                    <Users className="h-4 w-4 text-terracotta-500" /> Live begeleiding
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-warm-100 px-4 py-2 text-sm text-foreground">
                    <Globe className="h-4 w-4 text-terracotta-500" /> Nederlands
                  </span>
                </div>
                
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                  <Link to="/msc-training">
                    Bekijk actuele startmomenten
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-28 bg-gradient-to-b from-warm-50 to-sage-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                Klaar om thuis te komen <br />bij jezelf?
              </h2>
              <p className="mb-4 text-xl text-terracotta-600 font-medium">
                In je hoofd. In je hart. In je lichaam.
              </p>
              <p className="mb-6 text-muted-foreground text-lg">
                Op een plek waar je niets hoeft te bewijzen — alleen maar mag <em>zijn</em>.
              </p>
              <p className="mb-12 text-muted-foreground text-lg max-w-lg mx-auto">
                Als je voelt dat het tijd is om zachter, milder en bewuster in het leven te staan, dan is dit jouw moment.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-10 py-7 text-base rounded-full shadow-lg">
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

export default Services;
