import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Mail, Phone, MessageCircle, Check, Sparkles, Brain, Users, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

const trainers = [
  {
    name: "Sabine Trampe",
    role: "Psycholoog • Mindfulness & Zelfcompassie Trainer",
    tagline: "Ruimte Creëren voor Authenticiteit",
    bio: "Sabine Trampe is psycholoog binnen de geestelijke gezondheidszorg en trainer in mindfulness en zelfcompassie. Zij werkt vanuit een diepe overtuiging: iedereen verdient zachtheid, ruimte en vriendelijkheid — juist wanneer het leven moeilijk wordt.",
    journey: "Haar reis begon vijftien jaar geleden, toen haar interesse in het boeddhisme haar in aanraking bracht met meditatie en retraites. Wat haar raakte was de nuchtere en tegelijkertijd diep menselijke benadering: meditatie als een manier om stil te staan en jezelf met open aandacht te ontmoeten.",
    specializations: [
      "Mindfulness (MBSR/MBCT)",
      "ACT (Acceptance and Commitment Therapy)",
      "Mindful Self-Compassion (MSC)",
      "Trauma-sensitieve mindfulness",
    ],
    color: "terracotta",
  },
  {
    name: "Çağla Güneş",
    role: "Somatic Therapist • Lichaamsgerichte Psychotherapeut",
    tagline: "Mindfulness & Zelfcompassie Trainer",
    bio: "Çağla begeleidt als therapeut en trainer mensen in het herontdekken van hun innerlijke kracht en menselijkheid. Haar missie is het creëren van een veilige bedding waarin alle ervaringen welkom zijn.",
    journey: "Haar reis met mindfulness begon al op achtjarige leeftijd. Door jarenlange studie ontdekte zij hoe mindfulness, zelfcompassie en lichaamsgerichte benaderingen samen een diepe bron van kracht vormen.",
    specializations: [
      "Mindfulness (MBSR/MBCT)",
      "Psychosomatische therapie",
      "Mindful Self-Compassion (MSC)",
      "Trauma-sensitieve benaderingen",
    ],
    color: "sage",
  },
  {
    name: "Maria Schmidt",
    role: "Mindful Zelfcompassie Trainer",
    tagline: "Leadership Coach & Trainer",
    bio: "Maria heeft meer dan tien jaar ervaring in leiderschap en het begeleiden van mensen bij het omgaan met druk, verandering en uitdagende relaties. Haar intentie is om deelnemers te ondersteunen in het worden van hun eigen beste leraar.",
    journey: "Haar manier van lesgeven wordt omschreven als warm, gegrond en bekrachtigend. Maria brengt rust en toegankelijkheid in de ruimte, waardoor deelnemers kunnen ontspannen en hun hart kunnen openen.",
    specializations: [],
    color: "terracotta",
  },
  {
    name: "Morgan Healey",
    role: "Mindful Zelfcompassie Trainer • Onderzoeker",
    tagline: "Neurospirituality Lab, Brigham and Women's Hospital",
    bio: "Morgan is trainer en Lab Manager bij het Neurospirituality Lab, waar zij onderzoekt welke delen van de hersenen actief zijn bij transcendente ervaringen.",
    journey: "Haar benadering is zacht, trauma-sensitief en diep relationeel. Ze bewaart een zorgvuldige balans tussen wetenschappelijke precisie en de zachtheid van menselijke ervaring.",
    specializations: [],
    color: "sage",
  },
];

const Trainers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-sage-100/50 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-sage-100 border border-sage-200 px-5 py-2.5 text-sm font-medium text-sage-800">
              <Users className="h-4 w-4" />
              Ons Team
            </span>
            
            <h1 className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]">
              Over de
              <span className="block font-serif italic text-terracotta-600 mt-2">Trainers</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Het team bestaat uit toegewijde en ervaren trainers die werken vanuit warmte, expertise en een diepe persoonlijke beoefening.
            </p>
            
            <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
              <Link to="/msc-training">
                Doe mee aan de training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-16">
            {trainers.map((trainer, index) => (
              <div key={trainer.name} className={`${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <Card className="border-warm-200 bg-gradient-to-br from-warm-50 to-white rounded-3xl overflow-hidden shadow-sm">
                  <CardContent className="p-8 md:p-10">
                    <div className="grid gap-8 lg:grid-cols-3">
                      {/* Photo placeholder & info */}
                      <div className="lg:col-span-1">
                        <div className={`h-48 w-48 mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br ${
                          trainer.color === 'terracotta' 
                            ? 'from-terracotta-100 to-terracotta-200' 
                            : 'from-sage-100 to-sage-200'
                        } flex items-center justify-center mb-6`}>
                          <span className="text-5xl font-serif italic text-white/80">
                            {trainer.name.charAt(0)}
                          </span>
                        </div>
                        
                        {trainer.specializations.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground mb-3">Specialisaties:</p>
                            {trainer.specializations.map((spec) => (
                              <div key={spec} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-3 w-3 text-terracotta-500 flex-shrink-0" />
                                {spec}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="lg:col-span-2">
                        <h2 className="text-2xl font-light text-foreground md:text-3xl mb-2">
                          {trainer.name}
                        </h2>
                        <p className={`text-sm font-medium mb-1 ${
                          trainer.color === 'terracotta' ? 'text-terracotta-600' : 'text-sage-700'
                        }`}>
                          {trainer.role}
                        </p>
                        <p className="text-sm text-muted-foreground mb-6 italic">
                          {trainer.tagline}
                        </p>
                        
                        <p className="text-foreground leading-relaxed mb-4">
                          {trainer.bio}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {trainer.journey}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-warm-50 to-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-14">
              <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Onze Benadering</p>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                Hoe wij <span className="font-serif italic text-terracotta-600">werken</span>
              </h2>
            </div>
            
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-warm-200 mb-10">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                In onze trainingen staat authenticiteit centraal. Wij geloven dat echte, blijvende verandering alleen kan plaatsvinden wanneer je je veilig voelt — veilig om te lachen, te voelen, te delen of gewoon even stil te zijn.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-3 my-8">
                <div className="text-center p-4 rounded-2xl bg-warm-50">
                  <p className="text-foreground font-medium">Niets is verplicht</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-sage-50">
                  <p className="text-foreground font-medium">Alles is welkom</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-terracotta-50">
                  <p className="text-foreground font-medium">Ruimte voor jou</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Er is ruimte voor kwetsbaarheid en vreugde, zachtheid en eerlijkheid. Onze diepste wens is dat je iets herontdekt dat je misschien onderweg bent kwijtgeraakt: de zachte, compassievolle manier waarop je met jezelf mag omgaan.
              </p>
            </div>
            
            {/* Philosophy */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-gradient-to-br from-terracotta-50 to-warm-50 rounded-3xl p-8 border border-terracotta-100">
                <div className="h-12 w-12 rounded-2xl bg-terracotta-100 flex items-center justify-center mb-5">
                  <Heart className="h-6 w-6 text-terracotta-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Zelfcompassie als levenswijze</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Voor ons is zelfcompassie niet alleen een techniek — het is een manier van leven. Het helpt ons om onszelf te ondersteunen in moeilijke momenten, op dezelfde warme manier zoals we een dierbare vriend zouden steunen.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-sage-50 to-warm-50 rounded-3xl p-8 border border-sage-200">
                <div className="h-12 w-12 rounded-2xl bg-sage-100 flex items-center justify-center mb-5">
                  <Shield className="h-6 w-6 text-sage-700" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Een veilige ruimte</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In onze sessies creëren wij een veilige, ondersteunende en warme omgeving waarin je kunt vertragen, voelen, onderzoeken en groeien op jouw eigen manier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-28 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-terracotta-400/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4" />
              Begin je reis
            </span>
            
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl lg:text-5xl leading-tight">
              Er is ruimte voor stilte, verbinding, inzichten, humor —
            </h2>
            
            <p className="mb-12 text-xl text-white/90 font-medium">
              en bovenal: ruimte voor jou.
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

export default Trainers;
