import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Users, Calendar, Clock, CheckCircle2, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const trainingDates = [
  {
    language: "Nederlands",
    day: "Maandag (avond)",
    startDate: "16 februari 2026",
    time: "19.00–21.00 uur",
    dates: ["23 februari", "2, 9, 16, 23 maart", "13, 20 april", "4 mei 2026"],
    price: "€550",
  },
  {
    language: "Nederlands",
    day: "Zaterdag (middag)",
    startDate: "21 maart 2026",
    time: "15.00–17.00 uur",
    dates: ["28 maart", "4, 11, 18, 25 april", "9, 16 mei 2026"],
    price: "€550",
  },
  {
    language: "Engels",
    day: "Zondag (middag)",
    startDate: "18 januari 2026",
    time: "16.00–18.00 uur",
    dates: ["25 januari", "1, 8, 15, 22 februari", "1, 8 maart 2026"],
    price: "€550",
  },
  {
    language: "Engels",
    day: "Woensdag (avond)",
    startDate: "4 maart 2026",
    time: "19.00–21.00 uur",
    dates: ["11, 18, 25 maart", "1, 8, 15, 22 april 2026"],
    price: "€550",
  },
];

const MSCTraining = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warm-100 via-background to-terracotta-50 pt-16 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--terracotta-200))_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--warm-100))_0%,transparent_50%)]" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-terracotta-100 px-4 py-1.5 text-sm font-medium text-terracotta-700">
              <Sparkles className="h-4 w-4" />
              8-weekse training
            </span>
            <h1 className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Mindful Zelfcompassie
              <span className="block font-serif italic text-primary">(MSC) Training</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Een wetenschappelijk onderbouwd programma, ontwikkeld door dr. Kristin Neff en 
              dr. Christopher Germer. Leer jezelf met meer steun en begrip benaderen.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-terracotta-500 hover:bg-terracotta-600 text-white" asChild>
                <a href="http://mindful-mind.org/aanmeldformulier-2/" target="_blank" rel="noopener noreferrer">
                  Reserveer je plek
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50">
                Meer informatie
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is MSC Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              Wat is <span className="font-serif italic text-primary">Mindful Zelfcompassie?</span>
            </h2>
            <p className="mb-8 text-muted-foreground">
              Mindful Zelfcompassie (MSC) is een wetenschappelijk onderbouwd 8-weeks programma, 
              ontwikkeld door dr. Kristin Neff en dr. Christopher Germer.
            </p>
            <p className="mb-12 text-foreground">
              In deze training leer je:
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <Card className="border-terracotta-100 bg-gradient-to-b from-terracotta-50/50 to-transparent transition-all hover:shadow-soft">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-100">
                  <Brain className="h-7 w-7 text-terracotta-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-foreground">Mindfulness</h3>
                <p className="text-sm text-muted-foreground">
                  Bewust aanwezig te zijn bij wat je ervaart
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-warm-100 bg-gradient-to-b from-warm-50/50 to-transparent transition-all hover:shadow-soft">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-100">
                  <Heart className="h-7 w-7 text-warm-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-foreground">Zelfcompassie</h3>
                <p className="text-sm text-muted-foreground">
                  Met vriendelijkheid, begrip en zorg op jezelf te reageren
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 mx-auto max-w-3xl text-center">
            <p className="text-muted-foreground">
              Je ontwikkelt praktische vaardigheden om met stress, moeilijke emoties en zelfkritiek 
              om te gaan, met dezelfde steun en vriendelijkheid die een goede vriend(in) je zou geven.
            </p>
          </div>
        </div>
      </section>

      {/* Program Structure Section */}
      <section className="bg-terracotta-50/50 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              Programma-structuur <span className="font-serif italic text-primary">& Data</span>
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto mt-12">
            {[
              { icon: Calendar, label: "Format", value: "100% live online (Zoom)" },
              { icon: Clock, label: "Duur", value: "8 weken + retreatsessie" },
              { icon: Users, label: "Frequentie", value: "1x per week, 2 uur" },
              { icon: Sparkles, label: "Taal", value: "Nederlands / Engels" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-card border border-warm-200">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta-100">
                  <item.icon className="h-6 w-6 text-terracotta-600" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Dates Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              Beschikbare <span className="font-serif italic text-primary">Data</span>
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {trainingDates.map((training, index) => (
              <Card key={index} className="border-warm-200 overflow-hidden">
                <div className={`px-6 py-3 ${training.language === "Nederlands" ? "bg-terracotta-500" : "bg-sage-600"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{training.language} groep</span>
                    <span className="text-white/80 text-sm">{training.day}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Startdatum</p>
                      <p className="font-medium text-foreground">{training.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tijd</p>
                      <p className="font-medium text-foreground">{training.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vervolgdata</p>
                      <p className="text-sm text-foreground">{training.dates.join(", ")}</p>
                    </div>
                    <div className="pt-3 border-t border-warm-200">
                      <p className="text-lg font-medium text-terracotta-600">{training.price}</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-terracotta-500 hover:bg-terracotta-600 text-white" asChild>
                    <a href="http://mindful-mind.org/aanmeldformulier-2/" target="_blank" rel="noopener noreferrer">
                      Reserveer je plek
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Coaching Section */}
      <section className="bg-warm-50 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl text-center">
              Individuele begeleiding <span className="font-serif italic text-primary">(1-op-1)</span>
            </h2>
            <p className="mb-8 text-muted-foreground text-center">
              Wil je liever persoonlijke aandacht, een tempo dat helemaal bij jou past, 
              of dieper ingaan op jouw eigen thema's?
            </p>
            
            <Card className="border-terracotta-200">
              <CardContent className="p-8">
                <h3 className="text-lg font-medium text-foreground mb-4">Geschikt voor jou als je:</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Individuele begeleiding fijner vindt dan een groepssetting",
                    "Behoefte hebt aan persoonlijke verdieping",
                    "Met specifieke uitdagingen wilt werken, zoals perfectionisme, grenzen, stress of zelfkritiek",
                    "Een traject op maat wilt dat aansluit bij jouw leven en ritme",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-terracotta-500 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-medium text-foreground mb-4">Wat je kunt verwachten:</h3>
                <ul className="space-y-2 mb-6">
                  {[
                    "1-op-1 sessies (online of in Amersfoort)",
                    "Een veilige, warme en trauma-sensitieve aanpak",
                    "Praktische oefeningen die je direct in je dagelijkse leven kunt integreren",
                    "Mogelijkheid voor losse sessies of een traject",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-terracotta-400" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white" asChild>
                  <a href="mailto:mindful-mind@outlook.com">
                    Neem contact op
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-3xl font-light text-foreground md:text-4xl text-center">
              Veelgestelde <span className="font-serif italic text-primary">vragen</span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "Voor wie is deze training bedoeld?",
                  answer: "Deze training is voor iedereen die merkt dat ze vaak streng zijn voor zichzelf, moeilijk hun grenzen aangeven of moeite hebben met zelfzorg en ontspanning. Herken je jezelf in gedachten als \"Ik moet nog even doorgaan\", \"Anderen gaan voor\" of \"Ik ben niet goed genoeg\"? Dan is deze training waardevol voor jou.",
                },
                {
                  question: "Wat als ik een keer een sessie mis?",
                  answer: "Het is fijn als je alle sessies kunt volgen, omdat de training stapsgewijs is opgebouwd. Maar het is geen probleem als je een keer een sessie mist.",
                },
                {
                  question: "Heb ik ervaring met meditatie nodig?",
                  answer: "Nee, je hebt geen ervaring met meditatie nodig om deel te nemen. De training is geschikt voor zowel beginners als mensen met ervaring.",
                },
                {
                  question: "Wat is het verschil tussen Mindfulness en MSC?",
                  answer: "Mindfulness gaat over bewust aanwezig zijn in het moment. MSC bouwt hierop voort door daar zelfcompassie aan toe te voegen: jezelf met vriendelijkheid en begrip benaderen, juist in moeilijke momenten.",
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg border border-warm-200 p-6">
                  <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-sage-600 to-sage-700 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">
              Klaar om te beginnen?
              <span className="block font-serif italic">Reserveer je plek</span>
            </h2>
            <p className="mb-8 text-sage-100">
              Neem de eerste stap naar meer zelfcompassie en veerkracht. 
              Meld je aan voor de volgende training.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-white text-sage-700 hover:bg-sage-50" asChild>
                <a href="http://mindful-mind.org/aanmeldformulier-2/" target="_blank" rel="noopener noreferrer">
                  Reserveer je plek
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="mailto:mindful-mind@outlook.com">
                  Stel een vraag
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MSCTraining;
