import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Check, Sparkles, Target, Eye, Leaf } from "lucide-react";
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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta-100/40 via-background to-background" />
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-terracotta-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Heart className="h-4 w-4" />
              Over Mindful Mind
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Ruimte om te
              <span className="block font-serif italic text-terracotta-600 mt-2">vertragen en te voelen</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* The Problem We Address */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                In een wereld die altijd in beweging is, raak je makkelijk jezelf kwijt. Je loopt door, presteert, zorgt voor anderen — maar wanneer sta je echt stil?
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-foreground text-xl font-medium leading-relaxed">
                Bij Mindful Mind creëren we die ruimte. Voor innerlijke rust, zelfcompassie en bewuste aanwezigheid.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-warm-50 to-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal animation="scale">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-warm-200 text-center">
                <h2 className="text-2xl font-light text-foreground md:text-3xl mb-6 leading-tight">
                  Je hoeft niet perfect te zijn.
                  <span className="block font-serif italic text-terracotta-600 mt-1">Je mag er gewoon zijn.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Wij bieden een veilige plek waar alle aspecten van jezelf welkom zijn. Geen prestaties, geen verwachtingen — alleen ruimte om te herstellen en te groeien.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Onze Aanpak</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-6">
                  Meer dan <span className="font-serif italic text-terracotta-600">technieken leren</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Wij geloven in echte transformatie — een fundamentele verschuiving in hoe je naar jezelf kijkt en met jezelf omgaat.
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
                  <div className="bg-warm-50 rounded-2xl px-6 py-5 border border-warm-200 h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-terracotta-100 flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4 text-terracotta-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">{item.title}</p>
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

      {/* How We Work */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">In Onze Trainingen</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Hoe wij <span className="font-serif italic text-terracotta-600">werken</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1} animation="scale">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-warm-200">
                <p className="text-lg text-foreground leading-relaxed mb-8 text-center">
                  Authenticiteit staat centraal. Echte verandering ontstaat wanneer je je veilig voelt — veilig om te lachen, te voelen, te delen of gewoon stil te zijn.
                </p>
                
                <StaggerContainer className="grid gap-3 sm:grid-cols-3 mb-8">
                  <StaggerItem>
                    <div className="text-center p-5 rounded-2xl bg-warm-50 border border-warm-100">
                      <p className="text-foreground font-medium">Niets is verplicht</p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="text-center p-5 rounded-2xl bg-sage-50 border border-sage-100">
                      <p className="text-foreground font-medium">Alles is welkom</p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="text-center p-5 rounded-2xl bg-terracotta-50 border border-terracotta-100">
                      <p className="text-foreground font-medium">Ruimte voor jou</p>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
                
                <p className="text-muted-foreground leading-relaxed text-center">
                  Voor ons is zelfcompassie niet alleen een techniek — het is een manier van leven. 
                  Het helpt ons om onszelf te ondersteunen zoals we een dierbare vriend zouden steunen.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Wat Ons Drijft</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Visie <span className="font-serif italic text-terracotta-600">& Missie</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-8 md:grid-cols-2">
              <StaggerItem>
                <div className="bg-gradient-to-br from-terracotta-50 to-warm-50 rounded-3xl p-8 border border-terracotta-100 h-full">
                  <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                    <Eye className="h-7 w-7 text-terracotta-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Onze Visie</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Een wereld waarin we met compassie naar onszelf én naar anderen kijken.
                  </p>
                  <p className="text-foreground leading-relaxed font-medium">
                    Wanneer we goed voor onszelf zorgen, groeit onze verbinding met anderen.
                  </p>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="bg-gradient-to-br from-sage-50 to-warm-50 rounded-3xl p-8 border border-sage-200 h-full">
                  <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                    <Target className="h-7 w-7 text-sage-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Onze Missie</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
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
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">De Persoon Achter Mindful Mind</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Over <span className="font-serif italic text-terracotta-600">Çağla Güneş</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Çağla wordt al lang geleid door een diepe oriëntatie op innerlijke verbinding en bewustzijn. Meditatie werd al op jonge leeftijd een natuurlijk onderdeel van haar leven — vanaf haar achtste — en verdiepte zich door haar studies, jarenlange beoefening en langere Vipassana-retraites.
                </p>

                <p>
                  Haar pad heeft zich ontvouwd door geleefde ervaring. Jaren van reizen en wonen in het buitenland — in Nederland, Duitsland, Spanje en Mexico — boden niet alleen culturele verkenning, maar ook een voortdurend onderzoek naar identiteit, verbondenheid en wat het betekent om je thuis te voelen. In plaats van weg te bewegen van zichzelf, brachten deze reizen haar dichter bij haar essentie.
                </p>

                <p>
                  Een sterke verbinding met haar wortels, Cappadocië, en haar voorouders vormt een belangrijk fundament in haar leven en werk. Dit voorouderlijk bewustzijn brengt een gevoel van continuïteit, diepte en respect voor de lagen die de menselijke ervaring vormen — persoonlijk, collectief en transgenerationeel.
                </p>
              </div>
            </ScrollReveal>

            {/* Two pathways */}
            <ScrollReveal delay={0.2}>
              <div className="mt-12 mb-8">
                <p className="text-center text-foreground text-lg font-medium mb-8">
                  In de loop van de tijd zijn twee heldere paden ontstaan in haar werk:
                </p>
                <StaggerContainer className="grid gap-6 md:grid-cols-2">
                  <StaggerItem>
                    <div className="bg-white rounded-3xl p-8 border border-terracotta-100 h-full">
                      <div className="h-12 w-12 rounded-2xl bg-terracotta-100 flex items-center justify-center mb-5">
                        <Sparkles className="h-6 w-6 text-terracotta-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">Mindful Mind</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Een plek voor mindfulness-gebaseerde trainingen en educatie. Hier ligt de focus op het ontwikkelen van bewustzijn, zelfcompassie en belichaamde aanwezigheid, aangeboden in groepsprogramma's en individuele begeleiding.
                      </p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="bg-white rounded-3xl p-8 border border-sage-200 h-full">
                      <div className="h-12 w-12 rounded-2xl bg-sage-100 flex items-center justify-center mb-5">
                        <Leaf className="h-6 w-6 text-sage-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">In Harmonia</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Een ruimte voor therapeutisch werk, waar mensen worden begeleid in individuele sessies bij het verkennen van diepere emotionele lagen, patronen en levensovergangen.
                      </p>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-gradient-to-r from-terracotta-50 to-warm-50 rounded-2xl p-6 lg:p-8 border border-terracotta-200 text-center">
                <p className="text-foreground text-lg leading-relaxed font-medium">
                  Beide paden komen voort uit dezelfde bron: een toewijding aan aanwezigheid, eerlijkheid en zorgvuldige aandacht. Samen weerspiegelen zij één intentie — <span className="text-terracotta-600">het ondersteunen van mensen in het opnieuw verbinden met zichzelf</span>.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 lg:py-28 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-terracotta-400/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium text-white">
                <Sparkles className="h-4 w-4" />
                Dit is jouw moment
              </span>
              
              <h2 className="mb-6 text-3xl font-light text-white md:text-4xl lg:text-5xl leading-tight">
                Klaar om thuis te komen bij jezelf?
              </h2>
              
              <p className="mb-12 text-white/90 text-lg max-w-lg mx-auto leading-relaxed">
                Gun jezelf de tijd en aandacht die je verdient. Begin vandaag je reis naar meer rust en zelfliefde.
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

export default About;
