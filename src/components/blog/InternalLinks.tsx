import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface InternalLink {
  to: string;
  label: string;
  description: string;
}

interface InternalLinksProps {
  category: string;
}

const linksByCategory: Record<string, InternalLink[]> = {
  mindfulness: [
    { to: "/", label: "8-weekse MSC Training", description: "Leer mindfulness in de praktijk brengen" },
    { to: "/faq", label: "Veelgestelde vragen", description: "Antwoorden over mindfulness training" },
    { to: "/ervaringen", label: "Ervaringen van deelnemers", description: "Lees wat anderen zeggen" },
  ],
  zelfcompassie: [
    { to: "/", label: "Mindful Zelfcompassie Training", description: "Start met de 8-weekse groepstraining" },
    { to: "/coaching", label: "Individuele begeleiding", description: "Persoonlijke zelfcompassie coaching" },
    { to: "/ervaringen", label: "Ervaringen", description: "Verhalen van eerdere deelnemers" },
  ],
  stressvermindering: [
    { to: "/", label: "MSC Training", description: "Bewezen effectief tegen stress" },
    { to: "/coaching", label: "Individueel traject", description: "Persoonlijke aanpak voor stressvermindering" },
    { to: "/faq", label: "FAQ", description: "Veelgestelde vragen over onze aanpak" },
  ],
  meditatie: [
    { to: "/", label: "Groepstraining", description: "Leer mediteren in een veilige groep" },
    { to: "/barcelona-retreat", label: "Retreat Barcelona", description: "Verdieping tijdens een retreat" },
    { to: "/ervaringen", label: "Ervaringen", description: "Wat zeggen onze deelnemers" },
  ],
  welzijn: [
    { to: "/ons-aanbod", label: "Ons aanbod", description: "Bekijk alle mogelijkheden" },
    { to: "/coaching", label: "Individuele sessies", description: "Op maat begeleiding voor jouw welzijn" },
    { to: "/faq", label: "Veelgestelde vragen", description: "Meer informatie over onze aanpak" },
  ],
};

const defaultLinks: InternalLink[] = [
  { to: "/", label: "MSC Training", description: "Start met de zelfcompassie training" },
  { to: "/coaching", label: "Individuele begeleiding", description: "Persoonlijke coaching sessies" },
  { to: "/ervaringen", label: "Ervaringen", description: "Lees wat anderen zeggen" },
];

const InternalLinks = ({ category }: InternalLinksProps) => {
  const links = linksByCategory[category] || defaultLinks;

  return (
    <div className="mt-10 pt-8 border-t border-warm-200">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Meer ontdekken
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
