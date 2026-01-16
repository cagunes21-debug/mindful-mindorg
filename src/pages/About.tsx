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
              Over
              <span className="block font-serif italic text-terracotta-600 mt-2">Mindful Mind</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Bij Mindful Mind staan innerlijke rust, zelfcompassie en bewuste aanwezigheid centraal. Wij bieden live én online trainingen voor iedereen die wil vertragen, verdiepen en vriendelijker met zichzelf wil omgaan.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              In ons drukke dagelijks leven is het vaak lastig om stil te staan en echt te voelen. We leven in een wereld die altijd in beweging is, waardoor we gemakkelijk aan onszelf voorbijgaan.
            </p>
            
            <div className="bg-gradient-to-r from-terracotta-50 to-sage-50 rounded-3xl p-8 md:p-10 border border-warm-200">
              <p className="text-foreground text-lg leading-relaxed font-medium">
                Bij Mindful Mind creëren we ruimte om te vertragen, te verdiepen en jezelf met meer mildheid te benaderen — zodat je kunt herstellen, groeien en met meer innerlijke rust door het leven kunt gaan.
              </p>
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
              <h2 className="text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                Waarom <span className="font-serif italic text-terracotta-600">Mindful Mind?</span>
              </h2>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <div>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Bij Mindful Mind draait het niet alleen om het leren van technieken. Wij geloven in diepgaande transformatie — het soort verandering dat je helpt om meer aanwezig, vriendelijker en meer in vrede met jezelf te zijn.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Onze aanpak gaat verder dan alleen 'stressreductie' of 'zelfhulp'; het gaat om een fundamentele verschuiving in hoe je jezelf ziet en hoe je je verhoudt tot de wereld.
                </p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-warm-200">
                <p className="text-foreground leading-relaxed mb-6">
                  Wij bieden een veilige en ondersteunende omgeving waar alle aspecten van jezelf welkom zijn. Je hoeft niets te 'presteren' of 'perfect' te zijn — kom gewoon zoals je bent.
                </p>
                <p className="text-terracotta-600 font-medium">
                  Wij ondersteunen je in jouw reis naar meer veerkracht, zelfzorg en het ontwikkelen van een stabiele bron van vriendelijkheid in jezelf.
                </p>
              </div>
            </div>
            
            {/* Key Points */}
            <div className="grid gap-4 sm:grid-cols-2 mt-12">
              {[
                "Gericht op echte, blijvende verandering",
                "Praktisch en wetenschappelijk onderbouwd",
                "Gebaseerd op een trauma-sensitieve benadering",
                "Combinatie van theorie en directe toepassing",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 border border-warm-200 shadow-sm">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-terracotta-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-terracotta-600" />
                  </div>
                  <span className="text-foreground">{item}</span>
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
            <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
              Voor <span className="font-serif italic text-terracotta-600">wie?</span>
            </h2>
            
            <div className="bg-gradient-to-br from-sage-50 to-warm-50 rounded-3xl p-8 md:p-10 border border-sage-200 mb-8">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-sage-700" />
              </div>
              <p className="text-xl text-foreground font-medium mb-6">
                Voor iedereen die wil vertragen, verdiepen en vriendelijker met zichzelf wil omgaan.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In ons drukke dagelijks leven is het vaak moeilijk om stil te staan en echt te voelen. We leven in een wereld die altijd in beweging is, en het is gemakkelijk om jezelf voorbij te lopen. Bij Mindful Mind creëren we ruimte voor vertragen, verdiepen en jezelf vriendelijker benaderen, zodat je kunt herstellen, groeien en met meer innerlijke rust door het leven kunt gaan.
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
              <h2 className="text-3xl font-light text-foreground md:text-4xl lg:text-5xl leading-tight">
                Onze Visie <span className="font-serif italic text-terracotta-600">& Missie</span>
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
                  Een wereld creëren waarin mindfulness en zelfcompassie centraal staan in hoe we met onszelf en met anderen omgaan.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Wij geloven dat wanneer we onze eigen emotionele welzijn verzorgen, we een groter gevoel van verbinding en compassie voor de mensen om ons heen kunnen ontwikkelen. Door een gemeenschap te creëren van gelijkgestemde mensen die toegewijd zijn aan persoonlijke groei en zelfcompassie, hopen we een collectieve verschuiving richting een meer mindful en compassievol leven te inspireren.
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-warm-200">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-sage-700" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Onze Missie</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Een veilige en ondersteunende plek bieden waar je opnieuw verbinding kunt maken met je ware zelf. Hier kun je de vaardigheden ontwikkelen die nodig zijn om met meer balans, veerkracht en vriendelijkheid te leven.
                </p>
                <p className="text-foreground font-medium leading-relaxed">
                  Wij geloven dat iedereen in de snelle wereld van vandaag de kans verdient om te vertragen, te reflecteren en hun emotionele welzijn te voeden.
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
              Gun jezelf de tijd en aandacht <br />die je verdient
            </h2>
            
            <p className="mb-12 text-white/90 text-lg max-w-lg mx-auto leading-relaxed">
              Kom thuis bij jezelf en begin vandaag aan jouw innerlijke reis naar meer rust en zelfliefde.
            </p>
            
            <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 px-10 py-7 text-base rounded-full shadow-lg">
              <Link to="/msc-training">
                Doe mee aan de training
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
