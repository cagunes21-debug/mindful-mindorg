import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight, Check, MessageSquareQuote, Video } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/StructuredData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const packages = [
  {
    title: "Losse sessie",
    description: "Eenmalige sessie voor een specifieke vraag of opfrismoment",
    price: "€110",
    duration: "60 minuten",
    features: ["Direct inplanbaar", "Geen verplichtingen"],
  },
  {
    title: "6-sessies pakket",
    description: "Uitgebreid traject voor duurzame verandering en integratie",
    price: "€550",
    originalPrice: "€650",
    duration: "6 sessies · incl. intake & reflectie",
    features: ["✨ Tijdelijke aanbieding", "Intensieve begeleiding", "Persoonlijk oefenprogramma", "Ondersteuning per mail"],
    popular: true,
  },
];

const testimonials = [
  {
    quote: "De individuele sessies waren precies wat ik nodig had. In mijn eigen tempo, met volledige aandacht voor mijn persoonlijke thema's.",
    author: "Renate",
    role: "Deelnemer",
  },
  {
    quote: "Na jaren worstelen met perfectionisme heb ik eindelijk tools gevonden die echt werken. De persoonlijke aanpak maakte het verschil.",
    author: "Bas",
    role: "Deelnemer",
  },
  {
    quote: "Ik voelde me vanaf het begin veilig en gezien. De sessies online werkten verrassend goed en gaven me de flexibiliteit die ik nodig had.",
    author: "Nadia",
    role: "Deelnemer",
  },
];

const faqItems = [
  {
    question: "Voor wie is individuele begeleiding geschikt?",
    answer: "Individuele begeleiding is geschikt voor iedereen die behoefte heeft aan persoonlijke begeleiding en aandacht. Het is ideaal als je liever niet in een groep werkt, specifieke thema's wilt aanpakken, of je eigen tempo wilt bepalen.",
  },
  {
    question: "Wat is het verschil met de groepstraining?",
    answer: "In de groepstraining volg je een vast curriculum samen met anderen. Bij individuele begeleiding stemmen we de inhoud volledig af op jouw persoonlijke situatie, thema's en tempo. Je krijgt onverdeelde aandacht en maatwerk.",
  },
  {
    question: "Hoe werken de online sessies?",
    answer: "We werken via Zoom in een beveiligde omgeving. Je ontvangt een link per e-mail en logt in vanaf een rustige plek. De ervaring is persoonlijk en intiem, vergelijkbaar met een sessie op locatie.",
  },
  {
    question: "Waar vinden de sessies plaats?",
    answer: "Alle sessies vinden online plaats via Zoom. Je ontvangt een link per e-mail en logt in vanaf een rustige plek. De ervaring is persoonlijk en intiem.",
  },
  {
    question: "Hoe lang duurt een traject?",
    answer: "Dat hangt af van jouw behoeften en doelen. Sommige mensen hebben genoeg aan 3 sessies, anderen kiezen voor een langer traject. We evalueren samen wat je nodig hebt.",
  },
  {
    question: "Wordt begeleiding vergoed door de zorgverzekering?",
    answer: "Onze begeleiding valt niet onder de reguliere zorgverzekering. Sommige aanvullende verzekeringen vergoeden wel persoonlijke ontwikkeling. Check je polis of neem contact op met je verzekeraar.",
  },
];

const forWhomItems = [
  {
    emoji: "📏",
    title: "Vaak streng voor jezelf",
    description: "Je legt de lat hoog en bent kritisch als je daar niet aan voldoet — ook als anderen dat niet van je vragen.",
  },
  {
    emoji: "🌿",
    title: "Moeite met grenzen stellen",
    description: "Je vindt het lastig om 'nee' te zeggen en gaat regelmatig over je eigen grenzen heen.",
  },
  {
    emoji: "💬",
    title: "Sterke innerlijke criticus",
    description: "Die stem die je bij fouten of tegenslagen direct beoordeelt — ook al weet je dat het niet helpt.",
  },
  {
    emoji: "🤲",
    title: "Anderen vaak voorop",
    description: "Je zorgt goed voor anderen, maar je eigen behoeften raken naar de achtergrond.",
  },
  {
    emoji: "🌊",
    title: "Verlangen naar rust",
    description: "Je voelt dat je doorgaat terwijl het eigenlijk te veel is — en zoekt naar een manier om dit te doorbreken.",
  },
  {
    emoji: "🕐",
    title: "Flexibiliteit nodig",
    description: "Een groep past niet, of je wilt liever individueel en op jouw tempo werken.",
  },
];

const SectionDivider = () => (
  <div className="flex items-center justify-center gap-6 py-1">
    <div className="w-12 h-px bg-warm-300/30" />
    <span className="text-sage-400/30 text-xs">✦</span>
    <div className="w-12 h-px bg-warm-300/30" />
  </div>
);

const Coaching = () => {
  const { tx } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Individuele Begeleiding"
        description="Persoonlijke begeleiding in zelfcompassie en mindfulness. Online sessies die aansluiten bij jouw leven en tempo."
      />
      <FAQSchema items={faqItems} />
      <Navigation />
      
      {/* ═══════ 1. HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-24 lg:pt-36 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta-100/40 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-warm-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-10 rounded-full bg-terracotta-100/60 border border-terracotta-200/50 px-5 py-2 text-xs font-medium text-terracotta-600 tracking-wide"
            >
              <Heart className="h-3.5 w-3.5" />
              {tx("Mindful Mind · Individuele begeleiding")}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-[3.5rem] leading-[1.12]"
            >
              {tx("Persoonlijke begeleiding,")}
              <span className="block font-serif italic text-terracotta-600 mt-1">{tx("afgestemd op jou")}</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2 mb-10"
            >
              <p className="text-muted-foreground text-lg leading-relaxed">
                {tx("Werk in je eigen tempo aan zelfcompassie, met aandacht voor wat er bij jou speelt.")}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                {tx("Geen groep, geen vast ritme — maar ruimte om echt stil te staan bij jouw proces.")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 shadow-md shadow-terracotta-600/20">
                <a href="#pakketten">
                  {tx("Bekijk pakketten")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8">
                <a href="mailto:mindful-mind@outlook.com?subject=Vraag over individuele begeleiding">
                  {tx("Plan een kennismaking")}
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ 2. VOOR WIE ═══════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-terracotta-500 mb-4">{tx("Herkenning")}</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  {tx("Individuele begeleiding is voor jou")} <span className="font-serif italic text-terracotta-600">{tx("als je:")}</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {forWhomItems.map((item, index) => (
                <StaggerItem key={index}>
                  <div className="group flex gap-4 p-5 rounded-2xl bg-warm-50/60 border border-warm-200/40 hover:border-terracotta-200/60 hover:shadow-sm transition-all">
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.emoji}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{tx(item.title)}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{tx(item.description)}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════ 3. RESULTATEN ═══════ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-sage-600 mb-4">{tx("Resultaat")}</p>
              <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-5">
                {tx("Wat het je")} <span className="font-serif italic text-terracotta-600">{tx("oplevert")}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-md mx-auto">
                {tx("Meer rust van binnen. Een zachtere stem. Meer vertrouwen in jezelf.")}
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {[
                  "Minder streng voor jezelf",
                  "Beter omgaan met emoties",
                  "Meer rust en stabiliteit",
                  "Meer zelfvertrouwen",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-sage-50/60 border border-sage-200/30 rounded-xl px-4 py-3">
                    <Check className="h-4 w-4 text-sage-600 flex-shrink-0" />
                    <span className="text-foreground text-sm font-light">{tx(item)}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════ 4. BENADERING ═══════ */}
      <section className="py-20 lg:py-28 bg-warm-50/50">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              <ScrollReveal animation="fade-right">
                <div>
                  <p className="text-xs font-medium tracking-[0.25em] uppercase text-sage-600 mb-4">{tx("Onze benadering")}</p>
                  <h2 className="mb-6 text-3xl font-light text-foreground md:text-4xl leading-tight">
                    {tx("Geworteld in wetenschap,")}{" "}
                    <span className="font-serif italic text-terracotta-600">{tx("afgestemd op jou")}</span>
                  </h2>
                  <div className="space-y-5 text-muted-foreground leading-relaxed">
                    <p>
                      {tx("De begeleiding is gebaseerd op")} <span className="text-foreground font-medium">{tx("Mindful Self-Compassion (MSC)")}</span> {tx("en aangevuld met inzichten uit ACT, somatische therapie en trauma-sensitieve mindfulness.")}
                    </p>
                    <p>
                      {tx("We werken vanuit het uitgangspunt dat je niet hoeft te veranderen om goed genoeg te zijn — maar dat je kunt leren om anders met jezelf om te gaan.")}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-left" delay={0.15}>
                <Card className="border-0 bg-white rounded-2xl shadow-lg overflow-hidden">
                  <CardContent className="p-7">
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-sage-600 mb-5">{tx("Wat je kunt verwachten")}</p>
                    <ul className="space-y-3.5">
                      {[
                        "Een veilige, warme en trauma-sensitieve aanpak",
                        "Praktische oefeningen voor het dagelijks leven",
                        "Begeleiding afgestemd op jouw tempo",
                        "Meditaties en handvatten voor thuis",
                        "Ondersteuning tussen sessies",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-4 w-4 flex-shrink-0 text-sage-500 mt-0.5" />
                          <span className="text-foreground text-sm">{tx(item)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-warm-200/50">
                      <Video className="h-4 w-4 text-terracotta-500" />
                      <span className="text-sm text-foreground">{tx("Online via Zoom")}</span>
                      <span className="text-xs text-muted-foreground">{tx("— vanuit je eigen omgeving")}</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════ 5. METHODIEK ═══════ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-sage-600 mb-4">{tx("De methodiek")}</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-5">
                  {tx("Wat is Mindful")}{" "}
                  <span className="font-serif italic text-sage-600">{tx("Self-Compassion?")}</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                  {tx("We bieden geduld aan anderen, maar keren diezelfde warmte zelden naar binnen. MSC verandert die relatie — niet door te repareren, maar door tederheid toe te laten.")}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
                {[
                  { title: "Mindfulness", description: "Aanwezig zijn bij wat er is, zonder weg te duwen of te vereenzelvigen" },
                  { title: "Gedeelde menselijkheid", description: "Erkennen dat lijden deel is van de menselijke ervaring" },
                  { title: "Zelfvriendelijkheid", description: "Reageren met warmte en begrip, in plaats van oordeel" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 rounded-2xl bg-sage-50/60 border border-sage-200/30">
                    <p className="text-base font-normal italic text-foreground mb-2">{tx(item.title)}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground font-light">{tx(item.description)}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="text-center mt-8">
                <Link to="/mindful-self-compassion" className="inline-flex items-center gap-1.5 text-sm text-sage-600 hover:text-primary transition-colors group">
                  {tx("Meer over de methodiek")}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════ 6. PAKKETTEN ═══════ */}
      <section id="pakketten" className="py-20 lg:py-28 bg-warm-50/50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-terracotta-500 mb-4">{tx("Aanbod")}</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight mb-3">
                  {tx("Kies je")} <span className="font-serif italic text-terracotta-600">{tx("pakket")}</span>
                </h2>
                <p className="text-muted-foreground">
                  {tx("Flexibele opties die passen bij jouw behoeften")}
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              {packages.map((pkg, index) => (
                <StaggerItem key={index}>
                  <Card className={`border-0 rounded-2xl shadow-lg overflow-hidden h-full relative ${
                    pkg.popular 
                      ? "bg-white ring-2 ring-terracotta-300" 
                      : "bg-white"
                  }`}>
                    {pkg.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-terracotta-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {tx("Populair")}
                        </span>
                      </div>
                    )}
                    <CardContent className="p-7">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{tx(pkg.title)}</h3>
                      <p className="text-muted-foreground text-sm mb-5">{tx(pkg.description)}</p>
                      
                      <div className="mb-5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-light text-terracotta-600">{pkg.price}</span>
                          {pkg.originalPrice && (
                            <span className="text-base text-muted-foreground line-through">{pkg.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{tx(pkg.duration)}</p>
                      </div>
                      
                      <ul className="space-y-2.5 mb-7">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <Check className="h-3.5 w-3.5 text-sage-600" />
                            <span className="text-sm text-foreground">{tx(feature)}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button asChild className={`w-full rounded-full ${
                        pkg.popular 
                          ? "bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-md shadow-terracotta-600/20" 
                          : "bg-foreground hover:bg-foreground/90 text-background"
                      }`}>
                        <a href="mailto:mindful-mind@outlook.com?subject=Aanvraag individuele begeleiding">
                          {tx(pkg.popular ? 'Start je traject' : 'Plan een kennismaking')}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════ 7. HOE HET WERKT ═══════ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-sage-600 mb-4">{tx("Proces")}</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  {tx("Hoe het")} <span className="font-serif italic text-terracotta-600">{tx("werkt")}</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-warm-200/60 hidden md:block" />
              
              <StaggerContainer className="space-y-6 md:space-y-0 md:grid md:grid-cols-1 md:gap-0">
                {[
                  { step: "1", title: "Contact", description: "Neem contact op via e-mail of het contactformulier" },
                  { step: "2", title: "Kennismaking", description: "Gratis telefonisch gesprek om je vraag te bespreken" },
                  { step: "3", title: "Planning", description: "We plannen je eerste sessie op een moment dat past" },
                  { step: "4", title: "Start", description: "Je begint aan je persoonlijke reis naar meer zelfcompassie" },
                ].map((item, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start gap-5 py-5 md:py-6">
                      <div className="relative z-10 h-12 w-12 rounded-full bg-terracotta-500 text-white flex items-center justify-center text-lg font-semibold flex-shrink-0 shadow-md shadow-terracotta-500/20">
                        {item.step}
                      </div>
                      <div className="pt-1">
                        <h3 className="font-semibold text-foreground mb-1">{tx(item.title)}</h3>
                        <p className="text-sm text-muted-foreground">{tx(item.description)}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════ 8. ERVARINGEN ═══════ */}
      <section className="py-20 lg:py-28 bg-warm-50/50">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-terracotta-500 mb-4">{tx("Ervaringen")}</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  {tx("Wat cliënten")} <span className="font-serif italic text-terracotta-600">{tx("zeggen")}</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <Carousel opts={{ loop: true }} className="max-w-2xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="bg-white rounded-2xl border border-warm-200/40 p-8 md:p-10 text-center">
                      <MessageSquareQuote className="h-8 w-8 text-terracotta-300/60 mx-auto mb-6" />
                      <blockquote className="text-lg text-foreground leading-relaxed mb-6 font-light italic">
                        "{tx(testimonial.quote)}"
                      </blockquote>
                      <div>
                        <p className="font-medium text-foreground text-sm">{tx(testimonial.author)}</p>
                        <p className="text-xs text-muted-foreground">{tx(testimonial.role)}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════ 9. FAQ ═══════ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-xs font-medium tracking-[0.25em] uppercase text-sage-600 mb-4">{tx("Vragen")}</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  {tx("Veelgestelde")} <span className="font-serif italic text-terracotta-600">{tx("vragen")}</span>
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-warm-200/50 rounded-xl px-5 bg-white"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4 text-sm">
                      {tx(faq.question)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm pb-4">
                      {tx(faq.answer)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════ 10. CTA ═══════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-5 text-3xl font-light text-white md:text-4xl leading-tight">
              {tx("Klaar voor persoonlijke begeleiding?")}
              <span className="block font-serif italic mt-1">{tx("Neem de eerste stap")}</span>
            </h2>
            <p className="text-terracotta-100/90 mb-10 max-w-md mx-auto">
              {tx("Plan een gratis telefonische kennismaking en ontdek wat individuele begeleiding voor jou kan betekenen.")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 rounded-full px-8 shadow-lg shadow-black/10">
                <a href="mailto:mindful-mind@outlook.com?subject=Aanvraag kennismakingsgesprek">
                  {tx("Plan kennismaking")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white/60 text-white hover:bg-white/10 rounded-full px-8">
                <Link to="/contact">
                  {tx("Stel een vraag")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Coaching;
