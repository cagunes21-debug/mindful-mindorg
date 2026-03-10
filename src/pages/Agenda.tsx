import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Globe, MapPin, ArrowRight, Sparkles, Sun } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { RegistrationForm } from "@/components/RegistrationForm";

interface SelectedTraining {
  name: string;
  date: string;
  time?: string;
  price?: string;
}

const workshopDates = {
  workshop1: { lang: "Workshop 1", time: "19:30 – 20:30", dates: ["Maandag 1 juni"], price: "€55" },
  workshop2: { lang: "Workshop 2", time: "10:00 – 11:00", dates: ["Zaterdag 5 september"], price: "€55" },
};

const mscTrainingsNL = [
  {
    day: "Dinsdag (avond)",
    startDate: "7 april 2026",
    time: "19:00 – 21:00",
    followUp: ["14, 21 apr", "12, 19, 26 mei", "2, 9, 16 jun"],
    price: "€550",
    full: false,
    lastSpot: true,
  },
  {
    day: "Maandag (avond)",
    startDate: "28 september 2026",
    time: "19:00 – 21:00",
    followUp: ["5, 12, 26 okt", "2, 9, 16, 23, 30 nov"],
    price: "€550",
    earlyBirdPrice: "€495",
    earlyBirdDeadline: "1 augustus 2026",
    full: false,
    featured: true,
  },
];

const mscTrainingsEN = [
  {
    day: "Wednesday (evening)",
    startDate: "4 March 2026",
    time: "19:00 – 21:00",
    followUp: ["11, 18, 25 Mar", "28 Mar (retreat)", "1, 8, 15, 22 Apr"],
    price: "€550",
    full: true,
  },
];

const intensivePrograms = [
  {
    title: "MBSR – 4-daags intensief",
    subtitle: "Mindfulness-Based Stress Reduction",
    description: "Een verdiepend traject voor wie stress en spanning beter wil leren herkennen en hier met meer rust en mildheid mee om wil gaan.",
    startDate: "28 februari 2026",
    time: "11:00 – 16:00",
    location: "Amersfoort (De Glind)",
    followUp: ["14 maart", "28 maart", "11 april"],
    price: "€550",
    color: "sage",
  },
  {
    title: "MSC – 4-daags intensief",
    subtitle: "Mindful Self-Compassion",
    description: "Voor wie de stap wil zetten van begrijpen naar belichamen. Je verdiept zelfcompassie en creëert ruimte voor echte integratie.",
    startDate: "25 april 2026",
    time: "11:00 – 16:00",
    location: "Amersfoort (De Glind)",
    followUp: ["9 mei", "23 mei", "6 juni"],
    price: "€550",
    color: "terracotta",
  },
];

const Agenda = () => {
  const [selectedTraining, setSelectedTraining] = useState<SelectedTraining | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openRegistration = (training: SelectedTraining) => {
    setSelectedTraining(training);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">Aanmelden</DialogTitle>
          </DialogHeader>
          {selectedTraining && (
            <RegistrationForm
              trainingName={selectedTraining.name}
              trainingDate={selectedTraining.date}
              trainingTime={selectedTraining.time}
              price={selectedTraining.price}
              onSuccess={() => {
                setTimeout(() => setIsDialogOpen(false), 2000);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      <SEO 
        title="Agenda"
        description="Bekijk onze trainingsdata en meld je aan voor een MSC training. Nederlandse en Engelse trainingen beschikbaar, online en op locatie."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-100/60 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <Calendar className="h-4 w-4" />
              Trainingsagenda
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Training
              <span className="block font-serif italic text-terracotta-600 mt-2">Agenda</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Kies de vorm die past bij jouw behoefte, beschikbare tijd en mate van verdieping. Je kunt instappen met een workshop, een 8-weekse training volgen of kiezen voor een intensiever traject.
            </motion.p>
          </div>
        </div>
      </section>
      {/* Featured September Training */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-terracotta-50 via-warm-50 to-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl bg-white border-2 border-terracotta-200 shadow-xl"
            >
              {/* Early bird ribbon */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  <Sparkles className="h-4 w-4" />
                  Early bird – €495
                </span>
              </div>

              <div className="p-8 md:p-12">
                <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-800 mb-4">
                  Nieuw — Inschrijving geopend
                </span>
                
                <h2 className="text-2xl md:text-3xl font-light text-foreground mb-2 leading-tight">
                  8-weekse MSC Training
                  <span className="font-serif italic text-terracotta-600"> — september 2026</span>
                </h2>
                
                <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                  Start het najaar met meer zelfcompassie. Leer in 8 weken omgaan met stress en zelfkritiek 
                  — met meer vriendelijkheid en veerkracht. Kleine groep, persoonlijke begeleiding.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Calendar className="h-4 w-4 text-terracotta-500" />
                    <span>Start 28 sept</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Clock className="h-4 w-4 text-terracotta-500" />
                    <span>19:00 – 21:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Globe className="h-4 w-4 text-terracotta-500" />
                    <span>Online (NL)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="h-4 w-4 text-terracotta-500" />
                    <span>9 sessies</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button 
                    onClick={() => openRegistration({
                      name: "8-weekse MSC Training (Nederlands) — September",
                      date: "28 september 2026",
                      time: "19:00 – 21:00",
                      price: "€495 (early bird)",
                    })}
                    size="lg"
                    className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-6 text-base shadow-lg"
                  >
                    Schrijf je in met early bird korting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    <p><span className="line-through">€550</span> → <span className="font-semibold text-terracotta-600">€495</span></p>
                    <p>Early bird t/m 1 augustus 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-800 mb-3">
                Laagdrempelig
              </span>
              <h2 className="text-2xl font-light text-foreground md:text-3xl leading-tight mb-2">
                Workshop <span className="font-serif italic text-terracotta-600">Zelfcompassie</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Maak kennis met de essentie van zelfcompassie — zonder langdurige verplichting.
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(workshopDates).map(([key, workshop]) => (
                <Card key={key} className="border-warm-200 bg-warm-50/50 rounded-2xl overflow-hidden">
                  <CardContent className="p-5 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-terracotta-100 text-terracotta-700">
                          {workshop.lang}
                        </span>
                        <span className="text-sm font-medium text-foreground">{workshop.dates[0]} 2026</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{workshop.time}</span>
                        <span className="font-semibold text-terracotta-600 text-sm">{workshop.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Bij vervolginschrijving wordt dit bedrag in mindering gebracht.
                      </p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => openRegistration({
                        name: `Workshop Zelfcompassie (${workshop.lang})`,
                        date: `${workshop.dates[0]} 2026`,
                        time: workshop.time,
                        price: workshop.price,
                      })}
                      className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full shrink-0"
                    >
                      Aanmelden
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8-Week MSC Training */}
      <section className="py-20 lg:py-24 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <span className="inline-block rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold text-terracotta-700 mb-4">
                Kernprogramma
              </span>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-4">
                8-weekse Mindful Zelfcompassie <span className="font-serif italic text-terracotta-600">(MSC)</span>
              </h2>
              <p className="text-terracotta-600 font-medium mb-6">
                Voor wie zelfcompassie structureel wil integreren in het dagelijks leven
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Een diepgaande, wetenschappelijk onderbouwde training waarin je leert omgaan met stress, 
                moeilijke emoties en zelfkritiek — met meer vriendelijkheid en veerkracht.
              </p>
            </div>
            
            {/* Dutch Trainings */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-5 w-5 text-terracotta-600" />
                <h3 className="text-xl font-semibold text-foreground">Online – Nederlandstalige training</h3>
              </div>
              
               <div className="grid gap-6 md:grid-cols-2">
                {mscTrainingsNL.map((training, index) => (
                  <Card key={index} className={`border-terracotta-200 rounded-3xl overflow-hidden transition-shadow ${training.full ? 'bg-warm-50 opacity-75' : 'bg-white hover:shadow-md'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold text-foreground">{training.day}</p>
                        {training.full && (
                          <span className="inline-block rounded-full bg-terracotta-100 px-3 py-1 text-xs font-semibold text-terracotta-700">Vol</span>
                        )}
                        {training.lastSpot && (
                          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 animate-pulse">Laatste plek!</span>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-terracotta-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Start: {training.startDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-terracotta-500" />
                          <p className="text-muted-foreground">{training.time}</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-4">
                        Vervolgdata: {training.followUp.join(", ")}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                        <div>
                          {training.earlyBirdPrice ? (
                            <>
                              <p className="text-xs text-muted-foreground line-through">{training.price}</p>
                              <p className="text-lg font-semibold text-terracotta-600">{training.earlyBirdPrice}</p>
                            </>
                          ) : (
                            <p className="text-lg font-semibold text-terracotta-600">{training.price}</p>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          disabled={training.full}
                          onClick={() => openRegistration({
                            name: `8-weekse MSC Training (Nederlands)`,
                            date: training.startDate,
                            time: training.time,
                            price: training.earlyBirdPrice || training.price,
                          })}
                          className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full disabled:opacity-50"
                        >
                          {training.full ? 'Vol' : 'Reserveer'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* English Trainings */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-5 w-5 text-sage-700" />
                <h3 className="text-xl font-semibold text-foreground">Online – English training</h3>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {mscTrainingsEN.map((training, index) => (
                  <Card key={index} className={`border-sage-200 rounded-3xl overflow-hidden transition-shadow ${training.full ? 'bg-warm-50 opacity-75' : 'bg-white hover:shadow-md'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold text-foreground">{training.day}</p>
                        {training.full && (
                          <span className="inline-block rounded-full bg-sage-200 px-3 py-1 text-xs font-semibold text-sage-800">Full</span>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-sage-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Start: {training.startDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-sage-600" />
                          <p className="text-muted-foreground">{training.time}</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-4">
                        Follow-up: {training.followUp.join(", ")}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                        <p className="text-lg font-semibold text-sage-700">{training.price}</p>
                        <Button 
                          size="sm" 
                          disabled={training.full}
                          onClick={() => openRegistration({
                            name: `8-week MSC Training (English)`,
                            date: training.startDate,
                            time: training.time,
                            price: training.price,
                          })}
                          className="bg-sage-600 hover:bg-sage-700 text-white rounded-full disabled:opacity-50"
                        >
                          {training.full ? 'Full' : 'Reserve'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barcelona Retreat */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta-400/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium text-white">
              <Sun className="h-4 w-4" />
              Verdieping
            </span>
            
            <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
              5-daagse MSC Retreat
              <span className="block font-serif italic mt-2">in Barcelona</span>
            </h2>
            
            <p className="mb-4 text-xl text-white/90 font-medium">
              Een paar dagen helemaal voor jezelf
            </p>
            
            <p className="mb-8 text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
              Vertragen, loslaten en opladen in een warme, gedragen setting, weg van de dagelijkse drukte. 
              Een uitnodiging om te zakken uit het hoofd en weer contact te maken met wat er in jou leeft.
            </p>
            
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 mb-8">
              <p className="text-white/90">Binnenkort meer informatie</p>
            </div>
            
            <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 px-10 py-7 text-base rounded-full shadow-lg">
              <a href="mailto:mindful-mind@outlook.com">
                Meld je aan voor updates
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Intensive Programs */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <span className="inline-block rounded-full bg-warm-200 px-4 py-1.5 text-xs font-semibold text-warm-700 mb-4">
                Compact & Live
              </span>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-4">
                Intensieve <span className="font-serif italic text-terracotta-600">Trajecten</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                4-daagse trajecten op locatie in Amersfoort — voor wie verdieping zoekt in een compacte vorm
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {intensivePrograms.map((program, index) => (
                <Card key={index} className={`border-warm-200 rounded-3xl overflow-hidden ${
                  program.color === 'sage' 
                    ? 'bg-gradient-to-br from-sage-50 to-white' 
                    : 'bg-gradient-to-br from-terracotta-50 to-white'
                }`}>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-1">{program.title}</h3>
                    <p className={`text-sm font-medium mb-4 ${
                      program.color === 'sage' ? 'text-sage-700' : 'text-terracotta-600'
                    }`}>
                      {program.subtitle}
                    </p>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="space-y-3 text-sm mb-6">
                      <div className="flex items-start gap-3">
                        <Calendar className={`h-4 w-4 mt-0.5 ${
                          program.color === 'sage' ? 'text-sage-600' : 'text-terracotta-500'
                        }`} />
                        <div>
                          <p className="font-medium text-foreground">Start: zaterdag {program.startDate}</p>
                          <p className="text-muted-foreground">{program.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className={`h-4 w-4 mt-0.5 ${
                          program.color === 'sage' ? 'text-sage-600' : 'text-terracotta-500'
                        }`} />
                        <p className="text-muted-foreground">{program.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-6">
                      Vervolgdata: {program.followUp.join(" • ")}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                      <p className={`text-xl font-semibold ${
                        program.color === 'sage' ? 'text-sage-700' : 'text-terracotta-600'
                      }`}>
                        {program.price}
                      </p>
                      <Button 
                        onClick={() => openRegistration({
                          name: program.title,
                          date: program.startDate,
                          time: program.time,
                          price: program.price,
                        })}
                        className={`rounded-full ${
                          program.color === 'sage' 
                            ? 'bg-sage-600 hover:bg-sage-700' 
                            : 'bg-terracotta-600 hover:bg-terracotta-700'
                        } text-white`}
                      >
                        Reserveer je plek
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-light text-foreground md:text-3xl leading-tight">
              Vragen over welke training bij jou past?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Neem gerust contact op — we denken graag met je mee.
            </p>
            <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50 rounded-full px-8">
              <a href="mailto:mindful-mind@outlook.com">
                Neem contact op
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agenda;
