import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, ArrowRight, Sparkles, Mail, Phone, MessageCircle } from "lucide-react";
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
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-terracotta-100 px-4 py-1.5 text-sm font-medium text-terracotta-700">
              <Sparkles className="h-4 w-4" />
              8-weekse training in Mindful Zelfcompassie
            </span>
            <h1 className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Kom thuis
              <span className="block font-serif italic text-primary">bij jezelf!</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Leer jezelf steunen in plaats van pushen. Ontdek hoe je met meer vriendelijkheid 
              en begrip met jezelf om kunt gaan — juist wanneer het moeilijk is.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                <Link to="/msc-training">
                  Neem deel aan het programma
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50">
                Meer informatie
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why MSC Section */}
      <section className="py-20 lg:py-28 bg-warm-50/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              Waarom <span className="font-serif italic text-primary">Mindful Zelfcompassie?</span>
            </h2>
            <p className="mb-8 text-muted-foreground">
              Veel mensen denken dat zelfkritiek helpt om scherp, gemotiveerd of succesvol te blijven.
            </p>
            <p className="mb-8 text-foreground">
              Onderzoek laat echter zien dat zelfkritiek juist stress vergroot, je veerkracht ondermijnt 
              en je op de lange termijn uitput.
            </p>
            <p className="text-lg font-medium text-terracotta-700">
              Mindful Zelfcompassie biedt een bewezen alternatief: niet door minder betrokken te zijn, 
              maar door met meer steun en begrip met jezelf om te gaan — juist wanneer het moeilijk is.
            </p>
            <div className="mt-8">
              <Button asChild className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                <Link to="/msc-training">
                  Reserveer hier je plek
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-20 lg:py-28">
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

      {/* For You Section */}
      <section className="bg-sage-600 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">
              Is dit iets voor
              <span className="block font-serif italic">jou?</span>
            </h2>
            <p className="mb-8 text-sage-100">
              Deze training is voor iedereen die merkt dat ze vaak streng zijn voor zichzelf, 
              moeilijk hun grenzen aangeven of moeite hebben met zelfzorg en ontspanning.
            </p>
            <p className="mb-8 text-white font-medium">
              Herken je jezelf in gedachten als:
            </p>
            <div className="space-y-3 max-w-md mx-auto">
              {[
                '"Ik moet nog even doorgaan"',
                '"Anderen gaan voor"',
                '"Ik ben niet goed genoeg"',
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-terracotta-400/90 px-5 py-3 text-white text-left"
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-terracotta-300/50 flex items-center justify-center">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-serif italic">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sage-100">
              Dan is deze training waardevol voor jou.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-white text-sage-700 hover:bg-sage-50">
                <Link to="/msc-training">
                  Reserveer hier je plek
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              Wat kun je <span className="font-serif italic text-primary">verwachten?</span>
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              { label: "Format", value: "100% live online (Zoom)" },
              { label: "Duur", value: "8 weken + retreatsessie" },
              { label: "Frequentie", value: "1x per week" },
              { label: "Per sessie", value: "2 uur" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-warm-50 border border-warm-200">
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Taal: Nederlands / Engels
            </p>
            <Button asChild className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
              <Link to="/msc-training">
                Bekijk alle data
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
