import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, ArrowRight, Sparkles, Mail, Phone, MessageCircle, Check, Leaf, Shield, Sun } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-100 via-background to-terracotta-50" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--terracotta-200))_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(var(--sage-200))_0%,transparent_50%)]" />
        </div>
        
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-terracotta-100 px-4 py-1.5 text-sm font-medium text-terracotta-700 uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              Jouw welzijn begint bij hoe je jezelf behandelt
            </span>
            <h1 className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Kom thuis
              <span className="block font-serif italic text-primary">bij jezelf!</span>
            </h1>
            <p className="mb-3 text-lg text-terracotta-600 font-medium md:text-xl">
              8-weekse training in Mindful Zelfcompassie
            </p>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Leer jezelf steunen in plaats van pushen.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                <Link to="/msc-training">
                  Neem deel aan het programma
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why MSC Section */}
      <section className="py-20 lg:py-28 bg-warm-50/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl">
              Waarom <span className="font-serif italic text-primary">Mindful Zelfcompassie?</span>
            </h2>
            <p className="mb-6 text-muted-foreground text-lg">
              Veel mensen denken dat zelfkritiek helpt om scherp, gemotiveerd of succesvol te blijven.
            </p>
            <p className="mb-6 text-foreground text-lg">
              Onderzoek laat echter zien dat zelfkritiek juist stress vergroot, je veerkracht ondermijnt 
              en je op de lange termijn uitput.
            </p>
            <p className="text-lg font-medium text-terracotta-700 leading-relaxed">
              Mindful Zelfcompassie biedt een bewezen alternatief: niet door minder betrokken te zijn, 
              maar door met meer steun en begrip met jezelf om te gaan — juist wanneer het moeilijk is.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                <Link to="/msc-training">
                  Reserveer hier je plek
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is MSC Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl">
                Wat is <span className="font-serif italic text-primary">Mindful Zelfcompassie (MSC)?</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Mindful Zelfcompassie (MSC) is een wetenschappelijk onderbouwd 8-weeks programma, 
                ontwikkeld door dr. Kristin Neff en dr. Christopher Germer.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-warm-50 to-terracotta-50 rounded-2xl p-8 md:p-12 border border-warm-200">
              <p className="text-lg font-medium text-foreground mb-6">In deze training leer je:</p>
              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <div className="flex items-start gap-4 bg-white/60 rounded-xl p-5">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-terracotta-100 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-terracotta-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Mindfulness</p>
                    <p className="text-sm text-muted-foreground">Bewust aanwezig te zijn bij wat je ervaart</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/60 rounded-xl p-5">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-terracotta-100 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-terracotta-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Zelfcompassie</p>
                    <p className="text-sm text-muted-foreground">Met vriendelijkheid, begrip en zorg op jezelf te reageren</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Je ontwikkelt praktische vaardigheden om met stress, moeilijke emoties en zelfkritiek om te gaan, 
                met dezelfde steun en vriendelijkheid die een goede vriend(in) je zou geven.
              </p>
              <div className="mt-8 text-center">
                <Button asChild className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                  <Link to="/msc-training">
                    Reserveer hier je plek
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Is This For You Section */}
      <section className="bg-sage-600 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl">
              Is deze training iets voor
              <span className="block font-serif italic">jou?</span>
            </h2>
            <p className="mb-10 text-sage-100 text-lg">
              In de drukte van het leven raak je makkelijk jezelf kwijt. Je bent er voor anderen, 
              je zet door, je legt de lat hoog — maar jezelf zet je vaak op de laatste plek.
            </p>
            
            <p className="mb-6 text-white font-medium text-lg">
              Deze training is er voor jou als je:
            </p>
            
            <div className="space-y-3 max-w-lg mx-auto mb-10">
              {[
                "Vaak streng bent voor jezelf",
                "De lat hoog legt en jezelf snel veroordeelt",
                "Wilt leren omgaan met moeilijke gevoelens",
                "Meer zachtheid en balans in je leven wilt ervaren",
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-terracotta-400/90 px-5 py-4 text-white text-left"
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <Button asChild size="lg" className="bg-white text-sage-700 hover:bg-sage-50">
              <Link to="/msc-training">
                Reserveer hier je plek
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <span className="mb-4 inline-block text-sm font-medium text-terracotta-600 uppercase tracking-wider">
                Wat je kunt verwachten
              </span>
              <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl">
                Een 8-weekse training die voelt als 
                <span className="font-serif italic text-primary"> thuiskomen</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Elke sessie combineert theorie, praktijk en integratie — begeleid door ervaren trainers 
                die werken vanuit een trauma-sensitieve benadering.
              </p>
            </div>
            
            <div className="bg-warm-50 rounded-2xl p-8 md:p-10 border border-warm-200 mb-12">
              <p className="text-foreground leading-relaxed text-center text-lg">
                Deze training biedt je meer dan alleen kennis; je leert een nieuwe manier om met jezelf 
                en het leven om te gaan — <span className="font-medium text-terracotta-700">zachter, bewuster en milder</span> — 
                zodat je minder verstrikt raakt in stress, zelfkritiek en dagelijkse druk, en meer ruimte 
                en rust in je leven ervaart.
              </p>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-foreground mb-8">
                Wat brengt <span className="font-serif italic text-primary">Mindful Zelfcompassie</span> je?
              </h3>
              <p className="text-muted-foreground mb-10">
                Onderzoek laat zien dat MSC leidt tot duurzame, positieve veranderingen — 
                wereldwijd bevestigd bij duizenden deelnemers.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { icon: Sun, text: "Meer rust in hoofd en lichaam & meer emotionele veerkracht" },
                { icon: Shield, text: "Betere omgang met stress en tegenslagen" },
                { icon: Heart, text: "Minder zelfkritiek en meer mildheid" },
                { icon: Users, text: "Gezondere grenzen en betere zelfzorg & een diepere verbinding met jezelf en anderen" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-terracotta-50 to-warm-50 border border-warm-200">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-terracotta-100 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-terracotta-600" />
                  </div>
                  <p className="text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-terracotta-500 to-terracotta-600">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">
              Klaar om thuis te komen 
              <span className="block font-serif italic">bij jezelf?</span>
            </h2>
            <p className="mb-6 text-terracotta-100 text-lg">
              In je hoofd. In je hart. In je lichaam.
            </p>
            <p className="mb-6 text-white text-lg font-medium">
              Op een plek waar je niets hoeft te bewijzen — alleen maar mag zijn.
            </p>
            <p className="mb-10 text-terracotta-100">
              Als je voelt dat het tijd is om zachter, milder en bewuster in het leven te staan, 
              dan is dit jouw moment.
            </p>
            <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50">
              <Link to="/msc-training">
                Neem deel aan het programma
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-20 lg:py-28 bg-warm-50/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              Onze <span className="font-serif italic text-primary">Programma's</span>
            </h2>
            <p className="text-muted-foreground">
              Kies uit verschillende mogelijkheden, afgestemd op jouw behoeften
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="border-warm-200 transition-all hover:shadow-soft bg-gradient-to-br from-terracotta-50 to-warm-50 ring-2 ring-terracotta-200">
              <CardContent className="p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-100">
                  <Heart className="h-7 w-7 text-terracotta-600" />
                </div>
                <span className="mb-2 inline-block rounded-full bg-terracotta-500 px-3 py-0.5 text-xs font-medium text-white">
                  8-weekse training
                </span>
                <h3 className="mb-2 text-xl font-medium text-foreground">Mindful Zelfcompassie (MSC)</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Een wetenschappelijk onderbouwd 8-weeks programma, ontwikkeld door dr. Kristin Neff en 
                  dr. Christopher Germer. 100% live online via Zoom.
                </p>
                <p className="mb-4 text-sm text-foreground font-medium">
                  Investering: €550
                </p>
                <Link 
                  to="/msc-training"
                  className="inline-flex items-center text-sm font-medium text-terracotta-600 hover:text-terracotta-700"
                >
                  Meer informatie
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-warm-200 transition-all hover:shadow-soft bg-gradient-to-b from-card to-transparent">
              <CardContent className="p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-100">
                  <Users className="h-7 w-7 text-warm-600" />
                </div>
                <span className="mb-2 inline-block rounded-full bg-warm-500 px-3 py-0.5 text-xs font-medium text-white">
                  1-op-1
                </span>
                <h3 className="mb-2 text-xl font-medium text-foreground">Individuele Begeleiding</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Wil je liever persoonlijke aandacht, een tempo dat helemaal bij jou past, of dieper 
                  ingaan op jouw eigen thema's? Online of in Amersfoort.
                </p>
                <p className="mb-4 text-sm text-foreground font-medium">
                  Losse sessies of traject op maat
                </p>
                <a 
                  href="mailto:mindful-mind@outlook.com"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-terracotta-700"
                >
                  Neem contact op
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-warm-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 mb-8">
              <div>
                <p className="font-serif italic text-2xl text-primary mb-4">Mindful Mind</p>
                <p className="text-muted-foreground text-sm">
                  Begeleiding in Mindful Zelfcompassie voor meer rust, zelfacceptatie en veerkracht.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Contact</h4>
                <a href="mailto:mindful-mind@outlook.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta-600">
                  <Mail className="h-4 w-4" />
                  mindful-mind@outlook.com
                </a>
                <a href="tel:+31625633379" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta-600">
                  <Phone className="h-4 w-4" />
                  +31 6 25633379
                </a>
                <a href="https://wa.me/31625633379" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta-600">
                  <MessageCircle className="h-4 w-4" />
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

export default Index;
