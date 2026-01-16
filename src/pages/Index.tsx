import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Brain, Users, ArrowRight, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";

const programs = [
  {
    title: "Mindful Self-Compassion (MSC)",
    description: "An 8-week evidence-based program to cultivate self-compassion through mindfulness practices, meditation, and self-kindness exercises.",
    icon: Heart,
    link: "/msc-training",
    featured: true,
  },
  {
    title: "Mindfulness-Based Stress Reduction",
    description: "Learn to reduce stress and anxiety through mindfulness meditation and body awareness techniques.",
    icon: Brain,
    link: "#",
  },
  {
    title: "Group Meditation Sessions",
    description: "Weekly community gatherings for guided meditation and shared practice in a supportive environment.",
    icon: Users,
    link: "#",
  },
  {
    title: "Nature & Mindfulness Retreats",
    description: "Immersive weekend retreats combining outdoor experiences with contemplative practices.",
    icon: Leaf,
    link: "#",
  },
];

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
              Welkom bij Mindful Mind
            </span>
            <h1 className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Ontdek de kracht van
              <span className="block font-serif italic text-primary">Mindfulness & Zelfcompassie</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Bij Mindful Mind begeleiden we je op weg naar meer rust, zelfacceptatie en veerkracht. 
              Door bewustzijn en vriendelijkheid naar jezelf te cultiveren, leer je anders omgaan 
              met stress, emoties en zelfkritiek.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
                <Link to="/msc-training">
                  Bekijk Trainingen
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

      {/* Programs Overview Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              Onze <span className="font-serif italic text-primary">Programma's</span>
            </h2>
            <p className="text-muted-foreground">
              Kies uit verschillende evidence-based programma's, afgestemd op jouw behoeften
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {programs.map((program, index) => (
              <Card 
                key={index}
                className={`border-warm-200 transition-all hover:shadow-soft ${
                  program.featured 
                    ? 'bg-gradient-to-br from-terracotta-50 to-warm-50 ring-2 ring-terracotta-200' 
                    : 'bg-gradient-to-b from-card to-transparent'
                }`}
              >
                <CardContent className="p-8">
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
                    program.featured ? 'bg-terracotta-100' : 'bg-warm-100'
                  }`}>
                    <program.icon className={`h-7 w-7 ${
                      program.featured ? 'text-terracotta-600' : 'text-warm-600'
                    }`} />
                  </div>
                  {program.featured && (
                    <span className="mb-2 inline-block rounded-full bg-terracotta-500 px-3 py-0.5 text-xs font-medium text-white">
                      Populair
                    </span>
                  )}
                  <h3 className="mb-2 text-xl font-medium text-foreground">{program.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{program.description}</p>
                  <Link 
                    to={program.link}
                    className={`inline-flex items-center text-sm font-medium ${
                      program.featured 
                        ? 'text-terracotta-600 hover:text-terracotta-700' 
                        : 'text-primary hover:text-terracotta-700'
                    }`}
                  >
                    Meer informatie
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-sage-600 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">
              Is dit iets voor
              <span className="block font-serif italic">jou?</span>
            </h2>
            <p className="mb-8 text-sage-100">
              In de drukte van het leven raak je makkelijk jezelf kwijt. Je bent er voor anderen, 
              je zet door, je legt de lat hoog — maar jezelf zet je vaak op de laatste plek.
            </p>
            <p className="mb-8 text-white font-medium">
              Deze training is er voor jou als je:
            </p>
            <div className="space-y-3 max-w-md mx-auto">
              {[
                "Vaak streng bent voor jezelf",
                "De lat hoog legt en jezelf snel veroordeelt",
                "Wilt leren omgaan met moeilijke gevoelens",
                "Meer rust en zelfacceptatie zoekt",
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
                  <span>{item}</span>
                </div>
              ))}
            </div>
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

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-warm-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-serif italic text-xl text-primary mb-2">Mindful Mind</p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mindful Mind. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;