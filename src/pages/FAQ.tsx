import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { FAQSchema } from "@/components/StructuredData";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Over de Training",
    items: [
      {
        question: "Wat is Mindful Self-Compassion (MSC)?",
        answer: "MSC is een wetenschappelijk onderbouwd 8-weeks programma, ontwikkeld door Dr. Kristin Neff en Dr. Christopher Germer. Het leert je om op een vriendelijke en milde manier met jezelf om te gaan, vooral in moeilijke momenten. Je leert praktische oefeningen en meditaties die je dagelijks kunt toepassen."
      },
      {
        question: "Heb ik ervaring nodig met meditatie?",
        answer: "Nee, geen enkele ervaring is nodig. De training is geschikt voor zowel beginners als ervaren beoefenaars. We beginnen met de basis en bouwen stap voor stap op."
      },
      {
        question: "Hoe ziet een trainingsweek eruit?",
        answer: "Elke week bevat een groepsbijeenkomst van circa 2,5 uur, geleide meditaties om thuis te oefenen, en reflectieopdrachten. Je krijgt toegang tot een online leeromgeving met alle materialen."
      },
      {
        question: "Is de training online of fysiek?",
        answer: "De 8-weekse MSC training wordt momenteel 100% online aangeboden via een interactief videoplatform. Dit maakt het toegankelijk vanuit heel Nederland en daarbuiten."
      },
    ]
  },
  {
    title: "Praktisch & Kosten",
    items: [
      {
        question: "Wat kost de training?",
        answer: "Neem contact met ons op voor de actuele prijzen of bekijk de agenda voor komende trainingsdata en tarieven. We bieden ook mogelijkheden voor gespreide betaling."
      },
      {
        question: "Hoe groot zijn de groepen?",
        answer: "We werken bewust met kleine groepen (maximaal 12 deelnemers) om een veilige en persoonlijke leeromgeving te bieden."
      },
      {
        question: "Kan ik annuleren na inschrijving?",
        answer: "Ja, tot 14 dagen voor aanvang ontvang je volledige restitutie. Tussen 7 en 14 dagen 50%. Minder dan 7 dagen is geen restitutie mogelijk, maar je kunt wel een vervanger aanwijzen. Zie onze algemene voorwaarden voor details."
      },
      {
        question: "Krijg ik een certificaat?",
        answer: "Na voltooiing van het volledige 8-weekse programma ontvang je een certificaat van deelname."
      },
    ]
  },
  {
    title: "Coaching & Individueel",
    items: [
      {
        question: "Wat is het verschil tussen de groepstraining en individuele coaching?",
        answer: "De groepstraining volgt een vast 8-weeks curriculum met andere deelnemers. Individuele coaching is volledig op maat en richt zich op jouw specifieke situatie en vragen. Beide benaderingen vullen elkaar goed aan."
      },
      {
        question: "Hoe lang duurt een individueel traject?",
        answer: "Dit varieert per persoon en vraag. Gemiddeld bestaat een traject uit 6-10 sessies, maar dit stemmen we samen af op jouw behoeften."
      },
      {
        question: "Kan ik eerst een kennismakingsgesprek plannen?",
        answer: "Zeker! We bieden een vrijblijvend kennismakingsgesprek aan waarin we samen bekijken welk traject het beste bij je past. Neem contact op om een afspraak te maken."
      },
    ]
  },
  {
    title: "Voor Bedrijven",
    items: [
      {
        question: "Bieden jullie ook trainingen voor organisaties?",
        answer: "Ja, we bieden maatwerk-trainingen voor organisaties gericht op medewerkerswelzijn, stressvermindering en verzuimpreventie. Bekijk onze bedrijvenpagina voor meer informatie."
      },
      {
        question: "Kan de training op locatie plaatsvinden?",
        answer: "Ja, voor bedrijfstrainingen is het mogelijk om de training op locatie te verzorgen. Neem contact op om de mogelijkheden te bespreken."
      },
    ]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Veelgestelde Vragen"
        description="Veelgestelde vragen over onze mindfulness en zelfcompassie trainingen, coaching en praktische zaken."
      />
      <FAQSchema items={faqCategories.flatMap(cat => cat.items)} />
      <Navigation />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-terracotta-100 border border-terracotta-200 px-5 py-2.5 text-sm font-medium text-terracotta-700">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </span>
            <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground md:text-5xl leading-[1.1]">
              Veelgestelde <span className="font-serif italic text-terracotta-600">Vragen</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Hier vind je antwoorden op de meest gestelde vragen. Staat jouw vraag er niet bij? Neem gerust contact op.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-8">
            {faqCategories.map((category, catIndex) => (
              <ScrollReveal key={catIndex} delay={catIndex * 0.05}>
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-warm-200 shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4">{category.title}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`${catIndex}-${itemIndex}`} className="border-warm-200">
                        <AccordionTrigger className="text-left text-foreground hover:text-terracotta-600 hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-r from-terracotta-50 to-warm-50 rounded-3xl p-8 border border-terracotta-200 text-center">
                <p className="text-foreground text-lg font-medium mb-4">
                  Staat jouw vraag er niet bij?
                </p>
                <Button asChild className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8">
                  <Link to="/contact">
                    Neem contact op
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
