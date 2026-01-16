import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, ArrowRight, Mail, Phone, MessageCircle, Check, Leaf, Calendar, Clock, Globe, Video } from "lucide-react";
import Navigation from "@/components/Navigation";

const trainingDates = [
  {
    language: "Nederlands",
    day: "Maandag (avond)",
    startDate: "16 februari 2026",
    time: "19:00 – 21:00",
    dates: ["23 feb", "2, 9, 16, 23 mrt", "13, 20 apr", "4 mei"],
    price: "€550",
  },
  {
    language: "Nederlands",
    day: "Zaterdag (middag)",
    startDate: "21 maart 2026",
    time: "15:00 – 17:00",
    dates: ["28 mrt", "4, 11, 18, 25 apr", "9, 16 mei"],
    price: "€550",
  },
  {
    language: "English",
    day: "Sunday (afternoon)",
    startDate: "18 January 2026",
    time: "16:00 – 18:00",
    dates: ["25 Jan", "1, 8, 15, 22 Feb", "1, 8 Mar"],
    price: "€550",
  },
  {
    language: "English",
    day: "Wednesday (evening)",
    startDate: "22 April 2026",
    time: "19:00 – 21:00",
    dates: ["29 Apr", "6, 13, 20, 27 May", "3, 10 Jun"],
    price: "€550",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Full width with centered content */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-100 via-background to-terracotta-50" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <span className="inline-block mb-6 rounded-full bg-terracotta-500 px-5 py-2 text-sm font-medium text-white">
              Jouw welzijn begint bij hoe je jezelf behandelt
            </span>
            
            <h1 className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Kom thuis
              <span className="block font-serif italic text-primary">bij jezelf!</span>
            </h1>
            
            <p className="mb-4 text-xl text-terracotta-600 font-medium md:text-2xl">
              8-weekse training in Mindful Zelfcompassie
            </p>
            
            <p className="mb-10 text-muted-foreground text-lg max-w-xl mx-auto">
              Leer jezelf steunen in plaats van pushen.
            </p>
            
            <Button asChild size="lg" className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-6 text-base">
              <Link to="/msc-training">
                Neem deel aan het programma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why MSC - Light section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl">
              Waarom Mindful <span className="font-serif italic text-primary">Zelfcompassie?</span>
            </h2>
            
            <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
              Veel mensen denken dat zelfkritiek helpt om scherp, gemotiveerd of succesvol te blijven.
            </p>
            
            <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
              Onderzoek laat echter zien dat zelfkritiek juist stress vergroot, je veerkracht ondermijnt en je op de lange termijn uitput.
            </p>
            
            <p className="text-foreground font-medium text-lg leading-relaxed">
              Mindful Zelfcompassie biedt een bewezen alternatief: niet door minder betrokken te zijn, maar door met meer steun en begrip met jezelf om te gaan — juist wanneer het moeilijk is.
            </p>
            
            <Button asChild className="mt-10 bg-terracotta-500 hover:bg-terracotta-600 text-white px-8">
              <Link to="/msc-training">
                Reserveer hier je plek
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is MSC - Beige section */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl text-center">
              Wat is Mindful Zelfcompassie <span className="font-serif italic text-primary">(MSC)?</span>
            </h2>
            
            <p className="text-center text-muted-foreground text-lg mb-10 leading-relaxed">
              Mindful Zelfcompassie (MSC) is een wetenschappelijk onderbouwd 8-weeks programma, ontwikkeld door dr. Kristin Neff en dr. Christopher Germer.
            </p>
            
            <p className="text-center text-foreground font-medium mb-8">In deze training leer je:</p>
            
            <div className="grid gap-6 md:grid-cols-2 mb-10">
              <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-warm-200">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-terracotta-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-terracotta-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-lg mb-1">Mindfulness</p>
                  <p className="text-muted-foreground">Bewust aanwezig te zijn bij wat je ervaart</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-warm-200">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-terracotta-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-terracotta-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-lg mb-1">Zelfcompassie</p>
                  <p className="text-muted-foreground">Met vriendelijkheid, begrip en zorg op jezelf te reageren</p>
                </div>
              </div>
            </div>
            
            <p className="text-center text-muted-foreground text-lg leading-relaxed">
              Je ontwikkelt praktische vaardigheden om met stress, moeilijke emoties en zelfkritiek om te gaan, met dezelfde steun en vriendelijkheid die een goede vriend(in) je zou geven.
            </p>
            
            <div className="text-center mt-10">
              <Button asChild className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8">
                <Link to="/msc-training">
                  Reserveer hier je plek
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Is This For You - White section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl">
              Is deze training iets <span className="font-serif italic text-primary">voor jou?</span>
            </h2>
            
            <p className="mb-4 text-muted-foreground text-lg leading-relaxed">
              In de drukte van het leven raak je makkelijk jezelf kwijt.
            </p>
            
            <p className="mb-10 text-muted-foreground text-lg leading-relaxed">
              Je bent er voor anderen, je zet door, je legt de lat hoog — maar jezelf zet je vaak op de laatste plek.
            </p>
            
            <p className="text-foreground font-medium text-lg mb-6">Deze training is er voor jou als je:</p>
            
            <div className="space-y-4 max-w-md mx-auto text-left mb-10">
              {[
                "Vaak streng bent voor jezelf",
                "De lat hoog legt en jezelf snel veroordeelt",
                "Wilt leren omgaan met moeilijke gevoelens",
                "Meer zachtheid en balans in je leven wilt ervaren",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-warm-50 rounded-xl px-5 py-4 border border-warm-200">
                  <Check className="h-5 w-5 text-terracotta-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
            
            <Button asChild className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8">
              <Link to="/msc-training">
                Reserveer hier je plek
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What to Expect - Beige section */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl text-center">
              Wat je kunt <span className="font-serif italic text-primary">verwachten</span>
            </h2>
            
            <p className="text-center text-terracotta-600 font-medium text-xl mb-8">
              Een 8-weekse training die voelt als thuiskomen
            </p>
            
            <p className="text-center text-muted-foreground text-lg mb-6 leading-relaxed">
              Elke sessie combineert theorie, praktijk en integratie — begeleid door ervaren trainers die werken vanuit een trauma-sensitieve benadering.
            </p>
            
            <p className="text-center text-muted-foreground text-lg leading-relaxed">
              Deze training biedt je meer dan alleen kennis; je leert een nieuwe manier om met jezelf en het leven om te gaan — zachter, bewuster en milder — zodat je <strong className="text-foreground">minder verstrikt raakt in stress, zelfkritiek en dagelijkse druk</strong>, en meer ruimte en rust in je leven ervaart.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits - White section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl text-center">
              Wat brengt Mindful Zelfcompassie <span className="font-serif italic text-primary">je?</span>
            </h2>
            
            <p className="text-center text-muted-foreground text-lg mb-10">
              Onderzoek laat zien dat MSC leidt tot duurzame, positieve veranderingen — wereldwijd bevestigd bij duizenden deelnemers.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Meer rust in hoofd en lichaam",
                "Meer emotionele veerkracht",
                "Betere omgang met stress en tegenslagen",
                "Minder zelfkritiek en meer mildheid",
                "Gezondere grenzen en betere zelfzorg",
                "Een diepere verbinding met jezelf en anderen",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-5 rounded-xl bg-terracotta-50 border border-terracotta-100">
                  <Check className="h-5 w-5 text-terracotta-600 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Terracotta gradient */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-400 to-terracotta-500">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">
              Klaar om thuis te komen bij jezelf?
            </h2>
            <p className="mb-4 text-xl text-terracotta-100 font-medium">
              In je hoofd. In je hart. In je lichaam.
            </p>
            <p className="mb-8 text-terracotta-100">
              Op een plek waar je niets hoeft te bewijzen — alleen maar mag <em>zijn</em>.
            </p>
            <p className="mb-10 text-terracotta-100">
              Als je voelt dat het tijd is om zachter, milder en bewuster in het leven te staan,<br />
              dan is dit jouw moment.
            </p>
            <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 px-8 py-6 text-base">
              <Link to="/msc-training">
                Start de training
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Program Structure & Dates - Beige section */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-light text-foreground md:text-4xl text-center">
              Programma-structuur <span className="font-serif italic text-primary">& Data</span>
            </h2>
            
            {/* Format info */}
            <div className="grid gap-4 md:grid-cols-4 mb-12 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-warm-200">
                <Video className="h-5 w-5 text-terracotta-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Format</p>
                  <p className="text-sm font-medium text-foreground">100% live online</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-warm-200">
                <Calendar className="h-5 w-5 text-terracotta-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Duur</p>
                  <p className="text-sm font-medium text-foreground">8 weken + retreat</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-warm-200">
                <Clock className="h-5 w-5 text-terracotta-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Per sessie</p>
                  <p className="text-sm font-medium text-foreground">2 uur</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-warm-200">
                <Globe className="h-5 w-5 text-terracotta-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Taal</p>
                  <p className="text-sm font-medium text-foreground">NL / EN</p>
                </div>
              </div>
            </div>
            
            {/* Training dates grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {trainingDates.map((training, index) => (
                <Card key={index} className="border-warm-200 bg-white overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        training.language === "Nederlands" 
                          ? "bg-terracotta-100 text-terracotta-700" 
                          : "bg-sage-200 text-sage-900"
                      }`}>
                        {training.language}
                      </span>
                      <span className="text-sm text-muted-foreground">{training.day}</span>
                    </div>
                    
                    <p className="font-medium text-foreground mb-2">
                      Start: {training.startDate}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tijd: {training.time}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Vervolgdata: {training.dates.join(", ")}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-terracotta-600">{training.price}</p>
                      <Button asChild size="sm" className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                        <Link to="/msc-training">
                          Reserveer
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50">
                <Link to="/msc-training">
                  Bekijk meer details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 1-on-1 Coaching - White section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl">
              Liever <span className="font-serif italic text-primary">1-op-1 begeleiding?</span>
            </h2>
            
            <p className="mb-8 text-muted-foreground text-lg leading-relaxed">
              Naast de groepstraining bied ik ook individuele begeleiding aan. Dit is ideaal als je liever in je eigen tempo werkt, of als je persoonlijke thema's wilt verkennen in een veilige, één-op-één setting.
            </p>
            
            <Card className="border-warm-200 bg-warm-50 max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-100 mx-auto">
                  <Users className="h-7 w-7 text-terracotta-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Individuele begeleiding</h3>
                <p className="mb-4 text-muted-foreground">
                  Persoonlijke aandacht, jouw tempo.<br />Online of in Amersfoort.
                </p>
                <Button asChild className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                  <a href="mailto:mindful-mind@outlook.com">
                    Neem contact op
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-warm-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 mb-10">
              <div>
                <p className="font-serif italic text-2xl text-primary mb-3">Mindful Mind</p>
                <p className="text-muted-foreground">
                  Begeleiding in Mindful Zelfcompassie
                </p>
              </div>
              <div className="space-y-3">
                <a href="mailto:mindful-mind@outlook.com" className="flex items-center gap-3 text-muted-foreground hover:text-terracotta-600 transition-colors">
                  <Mail className="h-5 w-5" /> mindful-mind@outlook.com
                </a>
                <a href="tel:+31625633379" className="flex items-center gap-3 text-muted-foreground hover:text-terracotta-600 transition-colors">
                  <Phone className="h-5 w-5" /> +31 6 25633379
                </a>
                <a href="https://wa.me/31625633379" className="flex items-center gap-3 text-muted-foreground hover:text-terracotta-600 transition-colors">
                  <MessageCircle className="h-5 w-5" /> WhatsApp
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
