import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Sparkles, ArrowRight, Check, Clock, Users, Globe, Calendar, Crown, Leaf } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import heroMindfulness from "@/assets/hero-mindfulness.jpg";

const programs = [
  {
    id: "msc",
    emoji: "🌱",
    title: "Mindful Zelfcompassie (MSC) Training",
    subtitle: "8-weekse groepstraining",
    description:
      "Leer jezelf te steunen, vooral in moeilijke tijden. Dit wetenschappelijk onderbouwde programma, ontwikkeld door dr. Kristin Neff en dr. Christopher Germer, helpt je om zelfkritiek te transformeren in zelfcompassie.",
    colorAccent: "terracotta",
    icon: Brain,
    price: "€550",
    format: "100% live online",
    duration: "8 weken + retreat",
    session: "2 uur per sessie",
    language: "NL / EN",
    includes: [
      "8 wekelijkse groepssessies van 2 uur",
      "Stilte-retreat sessie",
      "Toegang tot online leeromgeving",
      "Geleide meditaties en oefeningen",
      "Persoonlijk werkboek",
      "Certificaat van deelname",
    ],
    forWhom: [
      "Je bent streng of perfectionistisch naar jezelf",
      "Je ervaart veel stress of emotionele uitputting",
      "Je wilt leren omgaan met moeilijke emoties",
      "Je zoekt meer innerlijke rust en veerkracht",
    ],
    dates: [],
    linkTo: "/msc-training",
    available: true,
  },
  {
    id: "bhm",
    emoji: "🧘‍♀️",
    title: "Body, Heart & Mind",
    subtitle: "Ervaringsgericht programma",
    description:
      "Herstel de balans tussen lichaam, hart en geest. Dit programma combineert zachte beweging, meditatie en zelfcompassie om je terug te brengen naar je kern. Ervaar hoe rust en kracht samenkomen.",
    colorAccent: "sage",
    icon: Heart,
    price: "Prijs op aanvraag",
    format: "Hybride (online & locatie)",
    duration: "6 weken",
    session: "1,5 uur per sessie",
    language: "NL",
    includes: [
      "6 ervaringsgerichte groepssessies",
      "Zachte bewegingsoefeningen",
      "Geleide meditaties en ademwerk",
      "Lichaamsbewustzijn-oefeningen",
      "Persoonlijke reflectieopdrachten",
      "Toegang tot online materialen",
    ],
    forWhom: [
      "Je ervaart spanning of onrust in je lichaam",
      "Je wilt meer verbinding voelen met je lichaam",
      "Je zoekt balans tussen denken, voelen en doen",
      "Je wilt op een zachte manier aan jezelf werken",
    ],
    dates: [],
    linkTo: null,
    available: false,
  },
  {
    id: "fl",
    emoji: "👑",
    title: "Female Leadership",
    subtitle: "Leiderschap vanuit authenticiteit",
    description:
      "Versterk je leiderschap vanuit zelfcompassie, authenticiteit en innerlijke kracht. Dit programma is ontworpen voor vrouwen die willen leiden met zachtheid én daadkracht, zonder zichzelf te verliezen.",
    colorAccent: "terracotta",
    icon: Crown,
    price: "Prijs op aanvraag",
    format: "Hybride (online & locatie)",
    duration: "8 weken",
    session: "2 uur per sessie",
    language: "NL / EN",
    includes: [
      "8 interactieve groepssessies",
      "Persoonlijk leiderschapsprofiel",
      "Zelfcompassie als leiderschapstool",
      "Oefeningen rond grenzen en communicatie",
      "Reflectieopdrachten en buddy-systeem",
      "Netwerk van gelijkgestemde vrouwen",
    ],
    forWhom: [
      "Je bent een vrouw in een leidinggevende of ambitieuze rol",
      "Je wilt authentiek leiden zonder jezelf weg te cijferen",
      "Je ervaart druk om te presteren en zoekt balans",
      "Je wilt groeien als leider vanuit kracht én kwetsbaarheid",
    ],
    dates: [],
    linkTo: null,
    available: false,
  },
];

const Index = () => {


  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <SEO
        title="Programma's | Mindful Mind"
        description="Ontdek onze programma's: Mindful Zelfcompassie (MSC), Body Heart & Mind en Female Leadership. Wetenschappelijk onderbouwd, ervaringsgericht en met hart."
      />
      <OrganizationSchema />
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28 bg-warm-50">
        <div className="absolute inset-0">
          <img
            src={heroMindfulness}
            alt="Mindfulness programma's"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-50/92 via-warm-50/85 to-warm-50/98" />
        </div>

        <div className="absolute top-20 left-10 w-64 h-64 bg-terracotta-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block rounded-full bg-terracotta-100/80 px-5 py-2 text-sm font-medium tracking-wide text-terracotta-700">
                Onze Programma's
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.15]"
            >
              Groei vanuit
              <span className="block font-serif italic text-terracotta-600 mt-2 text-[1.1em]">
                rust & verbinding
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Kies het programma dat bij je past. Elk traject combineert wetenschap, ervaring en persoonlijke begeleiding.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-20">
            {programs.map((program, index) => {
              const isSage = program.colorAccent === "sage";

              return (
                <ScrollReveal key={program.id} delay={index * 0.1}>
                  <div className="relative">
                    {/* Program Header */}
                    <div className="flex items-start gap-4 mb-8">
                      <span className="text-4xl">{program.emoji}</span>
                      <div>
                        <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                          {program.title}
                        </h2>
                        <p className={`text-base font-medium mt-1 ${isSage ? "text-sage-600" : "text-terracotta-600"}`}>
                          {program.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl">
                      {program.description}
                    </p>

                    {/* Format Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="text-center p-4 rounded-xl bg-warm-50 border border-warm-200">
                        <Globe className={`h-4 w-4 mx-auto mb-2 ${isSage ? "text-sage-500" : "text-terracotta-500"}`} />
                        <p className="text-xs text-muted-foreground mb-1">Format</p>
                        <p className="font-medium text-foreground text-sm">{program.format}</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-warm-50 border border-warm-200">
                        <Clock className={`h-4 w-4 mx-auto mb-2 ${isSage ? "text-sage-500" : "text-terracotta-500"}`} />
                        <p className="text-xs text-muted-foreground mb-1">Duur</p>
                        <p className="font-medium text-foreground text-sm">{program.duration}</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-warm-50 border border-warm-200">
                        <Calendar className={`h-4 w-4 mx-auto mb-2 ${isSage ? "text-sage-500" : "text-terracotta-500"}`} />
                        <p className="text-xs text-muted-foreground mb-1">Per sessie</p>
                        <p className="font-medium text-foreground text-sm">{program.session}</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-warm-50 border border-warm-200">
                        <Users className={`h-4 w-4 mx-auto mb-2 ${isSage ? "text-sage-500" : "text-terracotta-500"}`} />
                        <p className="text-xs text-muted-foreground mb-1">Taal</p>
                        <p className="font-medium text-foreground text-sm">{program.language}</p>
                      </div>
                    </div>

                    {/* Two columns: Includes + For Whom */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <Card className="border-warm-200 bg-white rounded-2xl">
                        <CardContent className="p-6">
                          <h4 className="font-medium text-foreground mb-4">Wat is inbegrepen:</h4>
                          <ul className="space-y-3">
                            {program.includes.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-foreground text-sm">
                                <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isSage ? "text-sage-500" : "text-terracotta-500"}`} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-warm-200 bg-warm-50 rounded-2xl">
                        <CardContent className="p-6">
                          <h4 className="font-medium text-foreground mb-4">Voor wie:</h4>
                          <ul className="space-y-3">
                            {program.forWhom.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                                <Sparkles className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isSage ? "text-sage-400" : "text-terracotta-400"}`} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Price + CTA */}
                    {program.available ? (
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <p className="text-3xl font-light text-terracotta-600">{program.price}</p>
                        <div className="flex flex-wrap gap-3">
                          <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                            <Link to="/agenda">
                              Bekijk data & schrijf je in
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          {program.linkTo && (
                            <Button asChild variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full">
                              <Link to={program.linkTo}>
                                Meer info
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className={`rounded-2xl p-6 border ${isSage ? "bg-sage-50 border-sage-200" : "bg-terracotta-50 border-terracotta-200"}`}>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div>
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium mb-2 ${isSage ? "bg-sage-100 text-sage-700" : "bg-terracotta-100 text-terracotta-700"}`}>
                              Binnenkort beschikbaar
                            </span>
                            <p className="text-muted-foreground text-sm">
                              Dit programma wordt momenteel ontwikkeld. Laat je gegevens achter om als eerste op de hoogte te zijn.
                            </p>
                          </div>
                          <Button asChild variant="outline" className={`rounded-full ${isSage ? "border-sage-300 text-sage-700 hover:bg-sage-100" : "border-terracotta-300 text-terracotta-700 hover:bg-terracotta-100"}`}>
                            <Link to="/contact">
                              Houd me op de hoogte
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Divider between programs */}
                    {index < programs.length - 1 && (
                      <div className="flex items-center gap-4 mt-20">
                        <div className="h-px flex-1 bg-warm-200" />
                        <Leaf className="h-5 w-5 text-sage-300" />
                        <div className="h-px flex-1 bg-warm-200" />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* September Training Highlight */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-terracotta-50 via-warm-50 to-sage-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 mb-6 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700">
                <Sparkles className="h-4 w-4" />
                Nieuw — Early bird t/m 1 augustus
              </span>
              
              <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl leading-tight">
                8-weekse MSC Groepstraining
                <span className="block font-serif italic text-terracotta-600 mt-2">Start september 2026</span>
              </h2>
              
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
                Leer in een kleine groep omgaan met stress en zelfkritiek — met meer vriendelijkheid en veerkracht. 
                Schrijf je nu in met early bird korting.
              </p>

              <p className="text-lg mb-8">
                <span className="line-through text-muted-foreground">€550</span>
                <span className="ml-2 text-2xl font-semibold text-terracotta-600">€495</span>
              </p>
              
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg">
                <Link to="/agenda">
                  Bekijk de training & schrijf je in
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                Niet zeker welk programma <span className="font-serif italic text-terracotta-600">bij je past?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Neem vrijblijvend contact op. We denken graag met je mee over welk traject het beste aansluit bij jouw situatie.
              </p>
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10 py-7 text-lg shadow-lg">
                <Link to="/contact">
                  Neem contact op
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Index;
