import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus, Phone, MessageCircle, CalendarCheck, ClipboardCheck,
  PartyPopper, ArrowDown, CheckCircle2, XCircle,
} from "lucide-react";

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Nieuw binnengekomen",
    status: "new",
    icon: UserPlus,
    color: "bg-[#f1efe8] text-[#5f5e5a] border-[#e0ded6]",
    dotColor: "bg-[#5f5e5a]",
    description: "Lead komt binnen via contactformulier, WhatsApp of telefoon.",
    actions: [
      "Bekijk de gegevens en het bericht van de lead",
      "Beoordeel of het een serieuze aanvraag is",
      "Ga binnen 24 uur over naar de volgende stap",
    ],
    tip: "Snel reageren vergroot de kans op conversie aanzienlijk.",
  },
  {
    step: 2,
    title: "Contact opnemen",
    status: "contact_attempt",
    icon: Phone,
    color: "bg-[#e6f1fb] text-[#0c447c] border-[#c8dff4]",
    dotColor: "bg-[#0c447c]",
    description: "Eerste contactpoging met de lead via telefoon, e-mail of WhatsApp.",
    actions: [
      "Bel of app de lead om jezelf voor te stellen",
      "Stel open vragen over hun situatie en behoeften",
      "Noteer belangrijke informatie in het notitieveld",
    ],
    tip: "Probeer telefonisch contact — dat converteert 3x beter dan e-mail.",
  },
  {
    step: 3,
    title: "In gesprek",
    status: "in_conversation",
    icon: MessageCircle,
    color: "bg-violet-50 text-violet-700 border-violet-200",
    dotColor: "bg-violet-400",
    description: "Er is contact en er wordt actief gecommuniceerd over de mogelijkheden.",
    actions: [
      "Bespreek welke training of traject het beste past",
      "Beantwoord vragen over inhoud, kosten en planning",
      "Peil de motivatie en verwachtingen",
      "Stel een kennismakingsgesprek voor als dat passend is",
    ],
    tip: "Luister meer dan je praat. Begrip tonen bouwt vertrouwen op.",
  },
  {
    step: 4,
    title: "Kennismakingsgesprek",
    status: "intake_scheduled",
    icon: CalendarCheck,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dotColor: "bg-blue-400",
    description: "Een kennismakings- of intakegesprek is ingepland (online of fysiek).",
    actions: [
      "Bevestig datum, tijd en locatie per e-mail/WhatsApp",
      "Bereid het gesprek voor op basis van eerdere notities",
      "Voer het gesprek: bespreek doelen, verwachtingen en praktische zaken",
      "Maak samen een plan en bespreek de volgende stap",
    ],
    tip: "Stuur een dag van tevoren een herinnering om no-shows te voorkomen.",
  },
  {
    step: 5,
    title: "Aangemeld",
    status: "registered",
    icon: ClipboardCheck,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-400",
    description: "De lead heeft zich aangemeld voor een training of traject.",
    actions: [
      "Stuur een bevestigingsmail met praktische informatie",
      "Maak een betaallink aan en verstuur deze",
      "Voeg de deelnemer toe aan de juiste trainingsgroep",
      "Plan eventueel een intake-formulier",
    ],
    tip: "Hoe sneller de betaling rond is, hoe hoger de commitment.",
  },
  {
    step: 6,
    title: "Deelnemer / Klant",
    status: "converted_to_client",
    icon: PartyPopper,
    color: "bg-green-50 text-green-700 border-green-200",
    dotColor: "bg-green-500",
    description: "De lead is omgezet naar een actieve klant met een lopend traject.",
    actions: [
      "Gebruik 'Omzetten naar klant' in het lead-detail",
      "Controleer of het klantprofiel correct is aangemaakt",
      "De lead verdwijnt uit de pipeline en verschijnt bij Klanten",
    ],
    tip: "Na conversie: stuur een welkomstbericht om de relatie warm te houden.",
  },
];

const SIDE_TRACK = {
  title: "Niet geïnteresseerd",
  status: "not_interested",
  icon: XCircle,
  color: "bg-red-50 text-red-600 border-red-200",
  description: "Als een lead op enig moment afhaakt of niet meer reageert, markeer als 'Niet geïnteresseerd'. Deze leads worden gearchiveerd maar blijven beschikbaar.",
};

export default function LeadProcesTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Lead Proces — Jouw Playbook</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Visueel overzicht van de stappen die een lead doorloopt van eerste contact tot deelnemer. 
          Gebruik dit als naslagwerk bij het opvolgen van leads.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {PROCESS_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === PROCESS_STEPS.length - 1;

          return (
            <div key={step.status} className="relative flex gap-4">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${step.dotColor} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="h-4.5 w-4.5 text-white" />
                </div>
                {!isLast && (
                  <div className="w-0.5 bg-border flex-1 min-h-[24px]" />
                )}
              </div>

              {/* Content card */}
              <Card className={`flex-1 mb-4 border ${step.color.split(' ').find(c => c.startsWith('border-'))}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-mono">
                      Stap {step.step}
                    </Badge>
                    <h4 className="font-semibold text-sm text-foreground">{step.title}</h4>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                  {/* Actions checklist */}
                  <div className="space-y-1.5 mb-3">
                    <p className="text-xs font-medium text-foreground">Acties:</p>
                    {step.actions.map((action, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground/50 mt-0.5 shrink-0" />
                        <span className="text-xs text-muted-foreground">{action}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tip */}
                  <div className="rounded-md bg-muted/50 px-3 py-2">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">💡 Tip:</span> {step.tip}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Side track: Not interested */}
      <Card className={`border ${SIDE_TRACK.color.split(' ').find(c => c.startsWith('border-'))}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <SIDE_TRACK.icon className="h-4 w-4 text-red-500" />
            <h4 className="font-semibold text-sm text-foreground">{SIDE_TRACK.title}</h4>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 text-red-500 border-red-200">
              Archief
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{SIDE_TRACK.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
