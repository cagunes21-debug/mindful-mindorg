import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, ArrowRight, Mail, Phone, MessageCircle, Check, Leaf } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-100 via-background to-terracotta-50" />
        
        <div className="container relative mx-auto px-4 py-20 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Kom thuis
              <span className="block font-serif italic text-primary">bij jezelf</span>
            </h1>
            <p className="mb-6 text-xl text-terracotta-600 font-medium">
              8-weekse training Mindful Zelfcompassie
            </p>
            <p className="mb-8 text-muted-foreground text-lg">
              Leer jezelf steunen in plaats van pushen.
            </p>
            <Button asChild size="lg" className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
              <Link to="/msc-training">
                Reserveer je plek
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-16 lg:py-20 bg-warm-50/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-2xl font-light text-foreground md:text-3xl">
              Waarom <span className="font-serif italic text-primary">zelfcompassie?</span>
            </h2>
            <p className="mb-4 text-muted-foreground">
              Zelfkritiek lijkt te helpen, maar vergroot juist stress en put je uit.
            </p>
            <p className="text-foreground font-medium text-terracotta-700">
              Zelfcompassie biedt een bewezen alternatief: met meer steun en begrip omgaan met jezelf — juist wanneer het moeilijk is.
            </p>
          </div>
        </div>
      </section>

      {/* What is MSC */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-light text-foreground md:text-3xl text-center">
              Wat is <span className="font-serif italic text-primary">MSC?</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Mindful Zelfcompassie is een wetenschappelijk onderbouwd programma van dr. Kristin Neff en dr. Christopher Germer.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-4 bg-warm-50 rounded-xl p-5 border border-warm-200">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-terracotta-100 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-terracotta-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Mindfulness</p>
                  <p className="text-sm text-muted-foreground">Bewust aanwezig zijn bij wat je ervaart</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-warm-50 rounded-xl p-5 border border-warm-200">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-terracotta-100 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-terracotta-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Zelfcompassie</p>
                  <p className="text-sm text-muted-foreground">Reageren met vriendelijkheid en begrip</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Is This For You */}
      <section className="bg-sage-100 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-2xl font-light text-foreground md:text-3xl">
              Voor wie?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Je bent er voor anderen, zet door, legt de lat hoog — maar jezelf staat vaak op de laatste plek.
            </p>
            
            <div className="space-y-3 max-w-md mx-auto text-left mb-8">
              {[
                "Je bent vaak streng voor jezelf",
                "Je veroordeelt jezelf snel",
                "Je wilt beter omgaan met moeilijke gevoelens",
                "Je zoekt meer zachtheid en balans",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3">
                  <Check className="h-4 w-4 text-terracotta-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
            
            <Button asChild className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
              <Link to="/msc-training">
                Bekijk de training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-light text-foreground md:text-3xl text-center">
              Wat levert het <span className="font-serif italic text-primary">op?</span>
            </h2>
            
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Meer rust in hoofd en lichaam",
                "Betere omgang met stress",
                "Minder zelfkritiek",
                "Gezondere grenzen",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-terracotta-50 border border-terracotta-100">
                  <Check className="h-4 w-4 text-terracotta-600 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-terracotta-400 to-terracotta-500">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-light text-white md:text-3xl">
              Klaar om thuis te komen bij jezelf?
            </h2>
            <p className="mb-8 text-terracotta-100">
              In je hoofd. In je hart. In je lichaam.
            </p>
            <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50">
              <Link to="/msc-training">
                Start de training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 lg:py-20 bg-warm-50/50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-light text-foreground md:text-3xl text-center">
            Programma's
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <Card className="border-terracotta-200 bg-gradient-to-br from-terracotta-50 to-warm-50">
              <CardContent className="p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta-100">
                  <Heart className="h-6 w-6 text-terracotta-600" />
                </div>
                <span className="mb-2 inline-block rounded-full bg-terracotta-500 px-3 py-0.5 text-xs font-medium text-white">
                  8 weken
                </span>
                <h3 className="mb-2 text-lg font-medium text-foreground">MSC Training</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Wetenschappelijk onderbouwd programma. 100% live online via Zoom.
                </p>
                <p className="mb-3 text-sm font-medium text-foreground">€550</p>
                <Link to="/msc-training" className="inline-flex items-center text-sm font-medium text-terracotta-600 hover:text-terracotta-700">
                  Meer info <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-warm-200">
              <CardContent className="p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-warm-100">
                  <Users className="h-6 w-6 text-warm-600" />
                </div>
                <span className="mb-2 inline-block rounded-full bg-warm-500 px-3 py-0.5 text-xs font-medium text-white">
                  1-op-1
                </span>
                <h3 className="mb-2 text-lg font-medium text-foreground">Individuele begeleiding</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Persoonlijke aandacht, jouw tempo. Online of in Amersfoort.
                </p>
                <p className="mb-3 text-sm font-medium text-foreground">Op maat</p>
                <a href="mailto:mindful-mind@outlook.com" className="inline-flex items-center text-sm font-medium text-primary hover:text-terracotta-700">
                  Contact <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-warm-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 mb-8">
              <div>
                <p className="font-serif italic text-xl text-primary mb-2">Mindful Mind</p>
                <p className="text-muted-foreground text-sm">
                  Begeleiding in Mindful Zelfcompassie
                </p>
              </div>
              <div className="space-y-2">
                <a href="mailto:mindful-mind@outlook.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta-600">
                  <Mail className="h-4 w-4" /> mindful-mind@outlook.com
                </a>
                <a href="tel:+31625633379" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta-600">
                  <Phone className="h-4 w-4" /> +31 6 25633379
                </a>
                <a href="https://wa.me/31625633379" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta-600">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
            <div className="border-t border-warm-200 pt-6 text-center">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Mindful Mind
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
