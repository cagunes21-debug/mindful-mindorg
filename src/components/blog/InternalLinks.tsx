import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface InternalLink {
  to: string;
  label: string;
  description: string;
  keywords: string[];
}

interface InternalLinksProps {
  category: string;
  content?: string;
}

const allServiceLinks: InternalLink[] = [
  {
    to: "/",
    label: "8-weekse MSC Training",
    description: "Start met de Mindful Self-Compassion groepstraining",
    keywords: ["msc", "mindful self-compassion", "groepstraining", "8 weken", "8-weekse", "zelfcompassie training", "cursus"],
  },
  {
    to: "/coaching",
    label: "Individuele Begeleiding",
    description: "Persoonlijke coaching sessies op jouw tempo",
    keywords: ["coaching", "individueel", "persoonlijk", "begeleiding", "sessie", "therapeut", "een-op-een"],
  },
  {
    to: "/barcelona-retreat",
    label: "Barcelona Retreat",
    description: "Verdieping tijdens een retreat in Barcelona",
    keywords: ["retreat", "barcelona", "verdieping", "stilte", "retraite", "weekend"],
  },
  {
    to: "/bedrijven",
    label: "Voor Bedrijven",
    description: "Mindfulness programma's voor teams en organisaties",
    keywords: ["bedrijf", "organisatie", "team", "werkgever", "hr", "werkstress", "burn-out", "werk"],
  },
  {
    to: "/agenda",
    label: "Agenda & Data",
    description: "Bekijk beschikbare startdata en locaties",
    keywords: ["agenda", "startdatum", "inschrijven", "aanmelden", "planning", "data", "locatie"],
  },
  {
    to: "/ervaringen",
    label: "Ervaringen van Deelnemers",
    description: "Lees wat eerdere deelnemers zeggen",
    keywords: ["ervaring", "review", "deelnemer", "resultaat", "testimonial", "succesverhaal"],
  },
  {
    to: "/faq",
    label: "Veelgestelde Vragen",
    description: "Antwoorden op veelgestelde vragen",
    keywords: ["vraag", "faq", "informatie", "kosten", "prijs", "geschikt"],
  },
  {
    to: "/over-ons",
    label: "Over Mindful Mind",
    description: "Leer onze missie en achtergrond kennen",
    keywords: ["over ons", "missie", "achtergrond", "wie", "team"],
  },
  {
    to: "/trainers",
    label: "Onze Trainers",
    description: "Maak kennis met onze gecertificeerde trainers",
    keywords: ["trainer", "docent", "gecertificeerd", "opleiding", "begeleider"],
  },
];

const linksByCategory: Record<string, string[]> = {
  mindfulness: ["/", "/faq", "/ervaringen"],
  zelfcompassie: ["/", "/coaching", "/ervaringen"],
  stressvermindering: ["/", "/coaching", "/bedrijven"],
  meditatie: ["/", "/barcelona-retreat", "/ervaringen"],
  welzijn: ["/coaching", "/bedrijven", "/faq"],
};

function scoreLink(link: InternalLink, content: string, category: string): number {
  const lower = content.toLowerCase();
  let score = 0;

  // Keyword matches in content
  for (const kw of link.keywords) {
    const regex = new RegExp(kw, "gi");
    const matches = lower.match(regex);
    if (matches) score += matches.length * 2;
  }

  // Category boost
  const categoryLinks = linksByCategory[category];
  if (categoryLinks?.includes(link.to)) score += 5;

  return score;
}

function getRelevantLinks(category: string, content?: string): InternalLink[] {
  if (!content) {
    // Fallback to category-based links
    const preferred = linksByCategory[category] || ["/", "/coaching", "/ervaringen"];
    return allServiceLinks
      .filter((l) => preferred.includes(l.to))
      .slice(0, 3);
  }

  // Score and rank all links
  const scored = allServiceLinks
    .map((link) => ({ link, score: scoreLink(link, content, category) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return scored.map((s) => s.link);
}

const InternalLinks = ({ category, content }: InternalLinksProps) => {
  const links = getRelevantLinks(category, content);

  return (
    <div className="mt-10 pt-8 border-t border-warm-200">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Dit past bij jou
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="group flex items-start gap-3 rounded-xl border border-warm-200 bg-warm-50 p-4 hover:border-terracotta-300 hover:bg-white transition-all"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-terracotta-600 transition-colors">
                {link.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{link.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-terracotta-600 mt-0.5 shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InternalLinks;
