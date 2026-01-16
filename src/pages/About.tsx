import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Mail, Phone, MessageCircle, Check, Sparkles, Target, Eye, Users } from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta-100/40 via-background to-background" />
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-terracotta-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700">
              <Heart className="h-4 w-4" />
              Over Ons
            </span>
            
            <h1 className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]">
              Ruimte om te
              <span className="block font-serif italic text-terracotta-600 mt-2">vertragen en te voelen</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              In een wereld die altijd in beweging is, creëren wij ruimte voor innerlijke rust, zelfcompassie en bewuste aanwezigheid.
            </p>
          </div>
        </div>
      </section>

      {/* Core Message */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-light text-foreground md:text-3xl mb-6 leading-tight">
                  Je hoeft niet perfect te zijn. <span className="font-serif italic text-terracotta-600">Je mag er gewoon zijn.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Bij Mindful Mind bieden we een veilige plek waar alle aspecten van jezelf welkom zijn. Geen prestaties, geen verwachtingen — alleen ruimte om te herstellen en te groeien.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-terracotta-50 to-sage-50 rounded-3xl p-8 border border-warm-200">
                <p className="text-foreground leading-relaxed font-medium">
                  "Wij ondersteunen je in jouw reis naar meer veerkracht, zelfzorg en een stabiele bron van vriendelijkheid in jezelf."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Mindful Mind */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-14">
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Onze Aanpak</p>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                Meer dan <span className="font-serif italic text-terracotta-600">technieken</span>
              </h2>
            </div>
            
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Wij geloven in echte transformatie — niet alleen stressreductie, maar een fundamentele verschuiving in hoe je naar jezelf kijkt.
              </p>
              <p className="text-foreground font-medium text-lg">
                Meer aanwezig. Meer in vrede. Meer verbonden met wie je werkelijk bent.
              </p>
            </div>
            
            {/* Key Points */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Blijvende verandering", desc: "Gericht op duurzame groei, niet op snelle fixes" },
                { title: "Wetenschappelijk onderbouwd", desc: "Gebaseerd op bewezen methodes en onderzoek" },
                { title: "Trauma-sensitief", desc: "Met zorg en aandacht voor ieders tempo" },
                { title: "Theorie + praktijk", desc: "Direct toepasbaar in je dagelijks leven" },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl px-6 py-5 border border-warm-200 shadow-sm">
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Who */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Voor Jou</p>
            <h2 className="mb-10 text-3xl font-light text-foreground md:text-4xl leading-tight">
              Voor wie wil <span className="font-serif italic text-terracotta-600">vertragen</span>
            </h2>
            
            <div className="bg-gradient-to-br from-sage-50 to-warm-50 rounded-3xl p-8 md:p-10 border border-sage-200">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-sage-700" />
              </div>
              <p className="text-xl text-foreground font-medium mb-6">
                Je merkt dat je jezelf voorbijloopt. Je wilt stil kunnen staan — en echt voelen.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Onze trainingen zijn er voor iedereen die ruimte zoekt om te verdiepen, zachter met zichzelf om te gaan, en met meer rust door het leven te bewegen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Onze Benadering</p>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                Hoe wij <span className="font-serif italic text-terracotta-600">werken</span>
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-warm-50 to-sage-50 rounded-3xl p-8 md:p-10 border border-warm-200 mb-8">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                In onze trainingen staat authenticiteit centraal. Echte verandering ontstaat wanneer je je veilig voelt — veilig om te lachen, te voelen, te delen of stil te zijn.
              </p>
              
              <div className="grid gap-3 sm:grid-cols-3 my-6">
                <div className="text-center p-4 rounded-2xl bg-white/80">
                  <p className="text-foreground font-medium">Niets is verplicht</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/80">
                  <p className="text-foreground font-medium">Alles is welkom</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/80">
                  <p className="text-foreground font-medium">Ruimte voor jou</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Voor ons is zelfcompassie niet alleen een techniek — het is een manier van leven. Het helpt ons om onszelf te ondersteunen zoals we een dierbare vriend zouden steunen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-warm-50 to-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-14">
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Wat Ons Drijft</p>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                Visie <span className="font-serif italic text-terracotta-600">& Missie</span>
              </h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* Vision */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-warm-200">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-terracotta-100 to-terracotta-200 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-terracotta-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Onze Visie</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Een wereld waarin we met compassie naar onszelf én naar anderen kijken.
                </p>
                <p className="text-foreground leading-relaxed font-medium">
                  Wanneer we goed voor onszelf zorgen, groeit onze verbinding met de mensen om ons heen.
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-warm-200">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-28 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-terracotta-400/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4" />
              Dit is jouw moment
            </span>
            
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl lg:text-5xl leading-tight">
              Klaar om thuis te komen <br />bij jezelf?
            </h2>
            
            <p className="mb-12 text-white/90 text-lg max-w-lg mx-auto leading-relaxed">
              Gun jezelf de tijd en aandacht die je verdient. Begin vandaag je reis naar meer rust en zelfliefde.
            </p>
            
            <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 px-10 py-7 text-base rounded-full shadow-lg">
              <Link to="/msc-training">
                Bekijk de trainingen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-warm-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-10 md:grid-cols-2 mb-12">
              <div>
                <p className="font-serif italic text-3xl text-terracotta-600 mb-4">Mindful Mind</p>
                <p className="text-muted-foreground text-lg">
                  Begeleiding in Mindful Zelfcompassie
                </p>
              </div>
              <div className="space-y-4">
                <a href="mailto:mindful-mind@outlook.com" className="flex items-center gap-4 text-muted-foreground hover:text-terracotta-600 transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  mindful-mind@outlook.com
                </a>
                <a href="tel:+31625633379" className="flex items-center gap-4 text-muted-foreground hover:text-terracotta-600 transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  +31 6 25633379
                </a>
                <a href="https://wa.me/31625633379" className="flex items-center gap-4 text-muted-foreground hover:text-terracotta-600 transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="border-t border-warm-200 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Mindful Mind. Alle rechten voorbehouden.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
