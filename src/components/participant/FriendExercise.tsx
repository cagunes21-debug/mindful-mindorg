import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Heart } from "lucide-react";

const sections = [
  {
    id: "intro",
    title: "Introductie",
    content: (
      <div className="space-y-4">
        <p className="italic text-warm-600">
          "Ik wil een korte oefening met je doen die kan helpen om te onderzoeken hoe je met jezelf omgaat wanneer je het moeilijk hebt."
        </p>
        <p className="italic text-warm-600">
          "Als je wilt kun je even je ogen sluiten, maar dat hoeft niet."
        </p>
      </div>
    ),
  },
  {
    id: "stap1",
    title: "Stap 1 — Reflectie op een vriend",
    content: (
      <div className="space-y-4">
        <p>Denk aan een moment waarop een vriend of vriendin het moeilijk had.</p>
        <p className="text-warm-500 text-sm">
          Niet een partner of familielid — dat kan te dichtbij komen. Misschien had hij of zij tegenslag, maakte een fout, of had het gevoel niet goed genoeg te zijn.
        </p>
        <div className="mt-4">
          <p className="font-medium text-sage-700 mb-3">Stel de volgende vragen (met pauze na elke vraag):</p>
          <ul className="space-y-2.5 list-none pl-0">
            {[
              "Hoe ga jij in zo'n situatie met die persoon om?",
              "Wat zeg je meestal tegen hem of haar?",
              "Op welke toon praat je?",
              "Hoe is je lichaamshouding?",
              "Welke non-verbale signalen gebruik je? (gezichtsuitdrukking, hoe je zit)",
            ].map((q, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sage-400 shrink-0" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-warm-500 text-sm italic mt-4">
          Neem een moment om op te merken wat er opkomt. Schrijf het eventueel kort op.
        </p>
      </div>
    ),
  },
  {
    id: "stap2",
    title: "Stap 2 — Reflectie op jezelf",
    content: (
      <div className="space-y-4">
        <p>Denk nu aan een moment waarop <strong>jij</strong> het moeilijk had.</p>
        <p className="text-warm-500 text-sm">
          Misschien had je tegenslag, maakte je een fout, of had je het gevoel niet goed genoeg te zijn.
        </p>
        <div className="mt-4">
          <p className="font-medium text-sage-700 mb-3">Stel dezelfde vragen, maar nu over jezelf:</p>
          <ul className="space-y-2.5 list-none pl-0">
            {[
              "Hoe ga je in zo'n situatie met jezelf om?",
              "Wat zeg je tegen jezelf?",
              "Op welke toon spreek je tegen jezelf?",
              "Wat gebeurt er in je lichaam wanneer je zo tegen jezelf praat?",
            ].map((q, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sage-400 shrink-0" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "stap3",
    title: "Stap 3 — Het verschil",
    content: (
      <div className="space-y-4">
        <p>Merk je een verschil tussen hoe je met je vriend omgaat en hoe je met jezelf omgaat?</p>
        <div className="mt-2">
          <p className="font-medium text-sage-700 mb-3">Eventueel doorvragen:</p>
          <ul className="space-y-2.5 list-none pl-0">
            {[
              "Is de toon naar jezelf anders?",
              "Strenger of kritischer?",
              "Hoe voelt dat in je lichaam?",
            ].map((q, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sage-400 shrink-0" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "stap4",
    title: "Stap 4 — Integratie & afronding",
    content: (
      <div className="space-y-5">
        <p>
          Als je terugdenkt aan hoe je tegen je vriend of vriendin sprak... hoe zou het zijn om diezelfde toon ook naar jezelf te gebruiken?
        </p>
        <p>
          Wat zou je op dat moment tegen jezelf kunnen zeggen als je jezelf zou behandelen zoals je een goede vriend behandelt?
        </p>
        <div className="mt-4 rounded-2xl bg-sage-50 border border-sage-200 p-5">
          <p className="font-medium text-sage-700 mb-3">Afronding:</p>
          <ul className="space-y-2.5 list-none pl-0">
            {[
              "Veel mensen merken dat ze veel milder en begripvoller zijn naar anderen dan naar zichzelf.",
              "Het ontwikkelen van een vriendelijke houding naar jezelf kan helpen om met moeilijke momenten om te gaan.",
              "Dit is geen zwakte — dit is een vaardigheid die je kunt oefenen.",
            ].map((q, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Heart className="mt-0.5 h-4 w-4 text-sage-500 shrink-0" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
];

const FriendExercise = () => {
  return (
    <div className="max-w-2xl mx-auto" style={{ backgroundColor: "#F8F5EE" }}>
      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight" style={{ color: "#8B9E7E" }}>
            Oefening: Hoe zou ik een vriend behandelen?
          </h2>
          <div className="flex items-center gap-4 mt-4 text-warm-500 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              10–15 minuten
            </span>
          </div>
          <p className="mt-4 text-warm-600 leading-relaxed font-light">
            Onderzoeken hoe je met jezelf omgaat wanneer je het moeilijk hebt — en ontdekken wat er verandert als je jezelf behandelt zoals een goede vriend.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          {sections.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border border-sage-200 rounded-2xl overflow-hidden bg-white/60 px-1"
            >
              <AccordionTrigger
                className="px-5 py-4 hover:no-underline text-left font-medium"
                style={{ color: "#8B9E7E" }}
              >
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-warm-700 font-light leading-relaxed">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FriendExercise;
