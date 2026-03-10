import { useParams, Link, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { LocalBusinessSchema, CourseSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Heart, MapPin, Monitor, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface CityData {
  name: string;
  slug: string;
  region: string;
  intro: string;
}

const cities: CityData[] = [
  { name: "Amsterdam", slug: "amsterdam", region: "Noord-Holland", intro: "In het bruisende Amsterdam is het makkelijk om jezelf voorbij te lopen. Tussen de drukte en de constante prikkels verdient iedereen een moment van stilte." },
  { name: "Rotterdam", slug: "rotterdam", region: "Zuid-Holland", intro: "Rotterdam staat bekend om zijn veerkracht en doorzettingsvermogen. Maar soms is het juist belangrijk om te vertragen en met compassie naar jezelf te kijken." },
  { name: "Den Haag", slug: "den-haag", region: "Zuid-Holland", intro: "Woon of werk je in Den Haag? In een stad vol dynamiek en verantwoordelijkheid is zelfcompassie een krachtig tegenwicht voor dagelijkse druk." },
  { name: "Utrecht", slug: "utrecht", region: "Utrecht", intro: "Utrecht, het hart van Nederland, is een stad waar ambitie en gezelligheid samenkomen. Geef jezelf de ruimte om te vertragen en te voelen." },
  { name: "Eindhoven", slug: "eindhoven", region: "Noord-Brabant", intro: "In de innovatieve stad Eindhoven wordt veel gevraagd van je denkvermogen. Zelfcompassie biedt balans tussen presteren en welzijn." },
  { name: "Groningen", slug: "groningen", region: "Groningen", intro: "Groningen, de noordelijke hoofdstad, biedt een unieke mix van energie en rust. Ontdek hoe zelfcompassie je leven kan verrijken." },
  { name: "Arnhem", slug: "arnhem", region: "Gelderland", intro: "Omringd door natuur en groen biedt Arnhem de perfecte achtergrond om te werken aan innerlijke rust en zelfcompassie." },
  { name: "Tilburg", slug: "tilburg", region: "Noord-Brabant", intro: "Tilburg is een warme, sociale stad. Voeg daar zelfcompassie aan toe en ontdek een diepere verbinding met jezelf en anderen." },
  { name: "Breda", slug: "breda", region: "Noord-Brabant", intro: "In het gezellige Breda is er altijd ruimte voor persoonlijke groei. Onze training helpt je om die groei met mildheid te benaderen." },
  { name: "Nijmegen", slug: "nijmegen", region: "Gelderland", intro: "Als oudste stad van Nederland heeft Nijmegen een rijke traditie. Voeg daar een nieuwe laag aan toe met de kracht van zelfcompassie." },
  { name: "Haarlem", slug: "haarlem", region: "Noord-Holland", intro: "Haarlem combineert stadse charme met een ontspannen sfeer. De perfecte plek om te investeren in je innerlijke welzijn." },
  { name: "Leiden", slug: "leiden", region: "Zuid-Holland", intro: "Leiden, stad van kennis en ontdekking, is de ideale plek om jezelf beter te leren kennen door mindful zelfcompassie." },
  { name: "Almere", slug: "almere", region: "Flevoland", intro: "Almere groeit en verandert continu. Te midden van alle verandering is het waardevol om een stabiele basis van zelfcompassie te ontwikkelen." },
  { name: "Maastricht", slug: "maastricht", region: "Limburg", intro: "In het pittoreske Maastricht, waar Bourgondisch genieten centraal staat, past zelfcompassie als een natuurlijk verlengstuk van die levenskunst." },
  { name: "Enschede", slug: "enschede", region: "Overijssel", intro: "Enschede, de poort naar het oosten, biedt nuchterheid en warmte. Ontdek hoe zelfcompassie je dagelijks leven kan verrijken." },
];

const StadLanding = () => {
  const { stad } = useParams<{ stad: string }>();
  const city = cities.find(c => c.slug === stad);

  if (!city) {
    return <Navigate to="/404" replace />;
  }

  const pageTitle = `Zelfcompassie Training ${city.name}`;
  const pageDescription = `Mindful Self-Compassion (MSC) training voor inwoners van ${city.name} en omgeving. 8-weekse online groepstraining in kleine groepen. Gecertificeerde trainers.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={`https://mindfulmind.nl/zelfcompassie-training/${city.slug}`}
        keywords={`zelfcompassie training ${city.name}, MSC training ${city.name}, mindfulness ${city.name}, zelfcompassie ${city.name}, meditatie ${city.name}, coaching ${city.name}, ${city.region}`}
      />
      <LocalBusinessSchema city={city.name} description={pageDescription} />
      <CourseSchema
        name={`Mindful Self-Compassion Training – ${city.name}`}
        description={pageDescription}
        locationName={city.name}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Aanbod", url: "/ons-aanbod" },
        { name: `Training ${city.name}`, url: `/zelfcompassie-training/${city.slug}` },
      ]} />
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta-100/40 via-background to-background" />
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700"
            >
              <MapPin className="h-4 w-4" />
              {city.name}, {city.region}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]"
            >
              Zelfcompassie Training
              <span className="block font-serif italic text-terracotta-600 mt-2">in {city.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10"
            >
              {city.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-10 py-7 text-base rounded-full shadow-lg">
                <Link to="/">
                  Bekijk de training
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wat is MSC */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Over de Training</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Wat is <span className="font-serif italic text-terracotta-600">Mindful Self-Compassion?</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-warm-50 rounded-3xl p-8 md:p-10 border border-warm-200">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Mindful Self-Compassion (MSC) is een wetenschappelijk onderbouwd 8-weeks programma, ontwikkeld door Dr. Kristin Neff en Dr. Christopher Germer. Het leert je om met warmte en mildheid naar jezelf te kijken — vooral in moeilijke momenten.
                </p>
                <p className="text-foreground text-lg leading-relaxed font-medium">
                  Voor inwoners van {city.name} en omgeving bieden wij deze training volledig online aan, zodat je vanuit huis kunt deelnemen in een veilige en vertrouwde omgeving.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Kenmerken */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-warm-50 to-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="text-center text-3xl font-light text-foreground md:text-4xl leading-tight mb-12">
                Wat kun je <span className="font-serif italic text-terracotta-600">verwachten?</span>
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Clock, title: "8 weken", desc: "Wekelijkse sessies van 2,5 uur" },
                { icon: Monitor, title: "100% online", desc: "Deelname vanuit heel Nederland" },
                { icon: Users, title: "Kleine groepen", desc: "Maximaal 12 deelnemers" },
                { icon: Heart, title: "Gecertificeerd", desc: "Erkende MSC trainers" },
                { icon: Check, title: "Wetenschappelijk", desc: "Bewezen effectieve methode" },
                { icon: MapPin, title: `Vanuit ${city.name}`, desc: "Geen reistijd nodig" },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="bg-white rounded-2xl p-6 border border-warm-200 shadow-sm h-full text-center">
                    <div className="h-12 w-12 rounded-2xl bg-terracotta-100 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-terracotta-600" />
                    </div>
                    <p className="font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Wat leer je */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="text-center text-3xl font-light text-foreground md:text-4xl leading-tight mb-10">
                Wat <span className="font-serif italic text-terracotta-600">leer je?</span>
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid gap-3">
              {[
                "Omgaan met stress, zelfkritiek en moeilijke emoties",
                "Praktische meditaties en oefeningen voor dagelijks gebruik",
                "Een vriendelijkere innerlijke stem ontwikkelen",
                "Veerkracht opbouwen vanuit zelfcompassie",
                "Verbinding met anderen die hetzelfde pad bewandelen",
                "Wetenschappelijk onderbouwde technieken voor welzijn",
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="bg-warm-50 rounded-2xl px-6 py-4 border border-warm-200">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-terracotta-100 flex items-center justify-center">
                        <Check className="h-4 w-4 text-terracotta-600" />
                      </div>
                      <p className="text-foreground">{item}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-20 bg-warm-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal animation="scale">
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-warm-200 shadow-sm text-center">
                <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Investering</p>
                <h2 className="text-3xl font-light text-foreground mb-2">
                  <span className="text-4xl font-semibold text-terracotta-600">€550</span>
                </h2>
                <p className="text-muted-foreground mb-8">voor het volledige 8-weekse programma</p>
                
                <ul className="text-left space-y-3 mb-8 max-w-sm mx-auto">
                  {[
                    "8 groepsbijeenkomsten van 2,5 uur",
                    "Geleide meditaties voor thuispraktijk",
                    "Werkboek en reflectiemateriaal",
                    "Toegang tot online leeromgeving",
                    "Certificaat van deelname",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <Check className="h-4 w-4 text-terracotta-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button asChild size="lg" className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-10">
                  <Link to="/agenda">
                    Bekijk beschikbare data
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Individuele Begeleiding */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-terracotta-500 tracking-widest uppercase mb-4">Liever persoonlijke aandacht?</p>
                <h2 className="text-3xl font-light text-foreground md:text-4xl leading-tight">
                  Individuele <span className="font-serif italic text-terracotta-600">begeleiding</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
                  Naast de groepstraining bieden wij ook individuele trajecten aan voor inwoners van {city.name} en omgeving — volledig online.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid gap-6 md:grid-cols-3">
              <StaggerItem>
                <div className="bg-warm-50 rounded-3xl p-6 border border-warm-200 h-full flex flex-col">
                  <div className="h-12 w-12 rounded-2xl bg-terracotta-100 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-terracotta-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Individueel Traject</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    Een volledig begeleidingstraject: intake (60 min), 6 individuele sessies (60 min) en een reflectiesessie (30 min).
                  </p>
                  <span className="inline-block rounded-full bg-terracotta-100 px-3 py-1 text-xs font-semibold text-terracotta-700 mb-2">✨ Aanbieding</span>
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-lg font-light text-muted-foreground line-through">€650</p>
                    <p className="text-2xl font-semibold text-terracotta-600">€550</p>
                  </div>
                  <Button asChild variant="outline" className="rounded-full border-terracotta-200 text-terracotta-600 hover:bg-terracotta-50 w-full">
                    <Link to="/coaching">Meer informatie</Link>
                  </Button>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-warm-50 rounded-3xl p-6 border border-warm-200 h-full flex flex-col">
                  <div className="h-12 w-12 rounded-2xl bg-sage-100 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-sage-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Kennismakingssessie</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    Een vrijblijvend gesprek om kennis te maken en te kijken welke vorm van begeleiding het beste bij je past.
                  </p>
                  <p className="text-2xl font-semibold text-terracotta-600 mb-4">€95</p>
                  <Button asChild variant="outline" className="rounded-full border-terracotta-200 text-terracotta-600 hover:bg-terracotta-50 w-full">
                    <Link to="/contact">Afspraak maken</Link>
                  </Button>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-warm-50 rounded-3xl p-6 border border-warm-200 h-full flex flex-col">
                  <div className="h-12 w-12 rounded-2xl bg-terracotta-100 flex items-center justify-center mb-4">
                    <Monitor className="h-6 w-6 text-terracotta-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Individuele Sessie</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    Losse sessies voor gerichte ondersteuning bij specifieke thema's rondom zelfcompassie en mindfulness.
                  </p>
                  <p className="text-2xl font-semibold text-terracotta-600 mb-4">€110</p>
                  <Button asChild variant="outline" className="rounded-full border-terracotta-200 text-terracotta-600 hover:bg-terracotta-50 w-full">
                    <Link to="/contact">Sessie boeken</Link>
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-terracotta-500 to-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-3xl font-light text-white md:text-4xl leading-tight">
                Klaar om te beginnen in {city.name}?
              </h2>
              <p className="mb-10 text-white/90 text-lg max-w-lg mx-auto leading-relaxed">
                Neem de eerste stap naar meer zelfcompassie. Onze volgende training start binnenkort.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-terracotta-700 hover:bg-terracotta-50 px-10 py-7 text-base rounded-full shadow-lg">
                  <Link to="/">
                    Meer informatie
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 px-10 py-7 text-base rounded-full">
                  <Link to="/contact">
                    Contact opnemen
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Other cities */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="text-center text-2xl font-light text-foreground md:text-3xl leading-tight mb-8">
                Ook beschikbaar in <span className="font-serif italic text-terracotta-600">andere steden</span>
              </h2>
            </ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2">
              {cities
                .filter(c => c.slug !== city.slug)
                .map(c => (
                  <Link
                    key={c.slug}
                    to={`/zelfcompassie-training/${c.slug}`}
                    className="rounded-full bg-warm-50 border border-warm-200 px-4 py-2 text-sm text-muted-foreground hover:text-terracotta-600 hover:border-terracotta-200 hover:bg-terracotta-50 transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StadLanding;
