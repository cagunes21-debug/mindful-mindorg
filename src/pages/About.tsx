import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Check, Sparkles, Target, Eye, Leaf, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Over Ons"
        description="Leer meer over Mindful Mind en onze gecertificeerde trainers. Wij begeleiden je met warmte en expertise op je reis naar meer zelfcompassie."
      />
      <Navigation />
      
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28 bg-warm-50">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-terracotta-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Heart className="h-4 w-4" />
              Over Mindful Mind
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Ruimte om te
              <span className="block font-serif italic text-terracotta-600 mt-2">vertragen en te voelen</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
            >
              In een wereld die altijd in beweging is, creëren wij ruimte voor innerlijke rust, zelfcompassie en bewuste aanwezigheid.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Onze belofte */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-sage-50 via-sage-50/50 to-warm-50 rounded-3xl border border-sage-200/50 p-8 md:p-12 text-center shadow-sm">
                <h2 className="text-2xl font-light text-foreground md:text-3xl leading-tight mb-4">
                  Je hoeft niet perfect te zijn.
                  <span className="block font-serif italic text-terracotta-600 mt-1">Je mag er gewoon zijn.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
                  Wij bieden een veilige plek waar alle aspecten van jezelf welkom zijn. Geen prestaties, geen verwachtingen — alleen ruimte om te herstellen en te groeien.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Onze aanpak */}
      <section className="py-20 lg:py-28 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">
                  Onze Aanpak
                </span>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-4">
                  Meer dan <span className="font-serif italic text-terracotta-600">technieken leren</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Wij geloven in echte transformatie — een fundamentele verschuiving in hoe je naar jezelf kijkt.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Blijvende verandering", desc: "Gericht op duurzame groei, niet op snelle fixes" },
                { title: "Wetenschappelijk onderbouwd", desc: "Gebaseerd op bewezen methodes en onderzoek" },
                { title: "Trauma-sensitief", desc: "Met zorg en aandacht voor ieders tempo" },
                { title: "Theorie + praktijk", desc: "Direct toepasbaar in je dagelijks leven" },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="bg-white rounded-2xl px-6 py-5 border border-warm-200/50 shadow-sm h-full">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-terracotta-100 flex items-center justify-center mt-0.5">
                        <Check className="h-3.5 w-3.5 text-terracotta-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-0.5">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Hoe wij werken */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-sage-600 font-medium mb-4">
                  In Onze Trainingen
                </span>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-4">
                  Hoe wij <span className="font-serif italic text-terracotta-600">werken</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                  Authenticiteit staat centraal. Echte verandering ontstaat wanneer je je veilig voelt.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-4 sm:grid-cols-3 mb-10">
              {[
                { label: "Niets is verplicht", bg: "from-warm-50 to-white", border: "border-warm-200/50" },
                { label: "Alles is welkom", bg: "from-sage-50 to-sage-50/50", border: "border-sage-200/50" },
                { label: "Ruimte voor jou", bg: "from-terracotta-50 to-warm-50", border: "border-terracotta-200/50" },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className={`text-center p-6 rounded-2xl border shadow-sm bg-gradient-to-br ${item.bg} ${item.border}`}>
                    <p className="text-foreground font-medium">{item.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal delay={0.15}>
              <div className="bg-gradient-to-br from-sage-50 via-warm-50 to-terracotta-50/30 rounded-3xl border border-sage-200/50 p-8 text-center shadow-sm">
                <span className="text-4xl text-terracotta-200 font-serif leading-none select-none">"</span>
                <p className="text-foreground italic text-lg leading-relaxed font-serif mt-2">
                  Voor ons is zelfcompassie niet alleen een techniek — het is een manier van leven.
                </p>
                <div className="w-8 h-0.5 bg-terracotta-300/50 mx-auto mt-4" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Visie & Missie */}
      <section className="py-20 lg:py-28 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">
                  Wat Ons Drijft
                </span>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Visie <span className="font-serif italic text-terracotta-600">& Missie</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              <StaggerItem>
                <div className="bg-gradient-to-br from-terracotta-50 to-warm-50 rounded-3xl p-8 border border-terracotta-200/50 h-full shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
                    <Eye className="h-6 w-6 text-terracotta-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Onze Visie</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Een wereld waarin we met compassie naar onszelf én naar anderen kijken.
                  </p>
                  <p className="text-foreground leading-relaxed font-medium">
                    Wanneer we goed voor onszelf zorgen, groeit onze verbinding met anderen.
                  </p>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="bg-gradient-to-br from-sage-50 to-warm-50 rounded-3xl p-8 border border-sage-200/50 h-full shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
                    <Target className="h-6 w-6 text-sage-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Onze Missie</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Een veilige plek bieden waar je opnieuw verbinding maakt met jezelf.
                  </p>
                  <p className="text-foreground leading-relaxed font-medium">
                    Iedereen verdient de kans om te vertragen, te reflecteren en te groeien.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Over Çağla */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-500 font-medium mb-4">
                  De Persoon Achter Mindful Mind
                </span>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Over <span className="font-serif italic text-terracotta-600">Çağla Güneş</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-4 text-muted-foreground text-base leading-[1.8]">
                <p>
                  Çağla wordt al lang geleid door een diepe oriëntatie op innerlijke verbinding en bewustzijn. Meditatie werd al op jonge leeftijd een natuurlijk onderdeel van haar leven en verdiepte zich door jarenlange beoefening en langere Vipassana-retraites.
                </p>
                <p>
                  Haar pad heeft zich ontvouwd door geleefde ervaring — jaren van reizen en wonen in het buitenland boden niet alleen culturele verkenning, maar ook een voortdurend onderzoek naar identiteit en verbondenheid.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="text-center mt-8">
                <Link
                  to="/over-cagla"
                  className="inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 font-medium transition-colors"
                >
                  Lees meer over Çağla
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trainers bridge */}
      <section className="py-16 lg:py-20 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="h-5 w-5 text-sage-600" />
                <span className="text-xs tracking-[0.3em] uppercase text-sage-600 font-medium">Ons Team</span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Achter Mindful Mind staat een team van ervaren trainers die werken vanuit warmte, expertise en een diepe persoonlijke beoefening.
              </p>
              <Button asChild variant="outline" className="border-sage-300 text-sage-700 hover:bg-sage-50 rounded-full px-8">
                <Link to="/trainers">
                  Ontmoet de trainers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary-foreground/50 font-medium mb-4">
                Dit is jouw moment
              </span>
              
              <h2 className="mb-4 text-3xl font-serif text-primary-foreground md:text-4xl leading-tight">
                Klaar om thuis te komen bij jezelf?
              </h2>
              
              <p className="mb-10 text-primary-foreground/75 text-lg max-w-lg mx-auto leading-relaxed">
                Gun jezelf de tijd en aandacht die je verdient. Begin vandaag je reis naar meer rust en zelfliefde.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <Link
                to="/msc-training"
                className="inline-flex items-center justify-center bg-primary-foreground text-primary h-12 px-10 rounded-full font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity shadow-lg"
              >
                Bekijk de trainingen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
