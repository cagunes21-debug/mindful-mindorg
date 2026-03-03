import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";

// Self-Compassion Scale (SCS) — Neff, K.D. (2003)
// Dutch translations of the 26 items
const SCS_ITEMS = [
  { id: 1, text: "Ik keur mezelf af en ben streng over mijn eigen tekortkomingen en onvolkomenheden.", subscale: "self_judgment" },
  { id: 2, text: "Als ik me down voel, heb ik de neiging om te piekeren en me vast te bijten in alles wat fout gaat.", subscale: "over_identification" },
  { id: 3, text: "Als het slecht met me gaat, zie ik de moeilijkheden als iets dat bij het leven hoort en dat iedereen meemaakt.", subscale: "common_humanity" },
  { id: 4, text: "Als ik nadenk over mijn tekortkomingen, heb ik de neiging me meer afgezonderd en afgesneden te voelen van de rest van de wereld.", subscale: "isolation" },
  { id: 5, text: "Ik probeer liefdevol naar mezelf te zijn wanneer ik emotionele pijn voel.", subscale: "self_kindness" },
  { id: 6, text: "Als ik faal in iets dat belangrijk voor me is, word ik verteerd door gevoelens van ontoereikendheid.", subscale: "over_identification" },
  { id: 7, text: "Als ik me down en uit voel, herinner ik mezelf eraan dat er veel andere mensen in de wereld zijn die zich net zo voelen.", subscale: "common_humanity" },
  { id: 8, text: "In heel moeilijke tijden heb ik de neiging streng voor mezelf te zijn.", subscale: "self_judgment" },
  { id: 9, text: "Wanneer iets me van streek maakt, probeer ik mijn emoties in balans te houden.", subscale: "mindfulness" },
  { id: 10, text: "Als ik me op een of andere manier ontoereikend voel, probeer ik mezelf eraan te herinneren dat gevoelens van ontoereikendheid door de meeste mensen worden gedeeld.", subscale: "common_humanity" },
  { id: 11, text: "Ik ben intolerant en ongeduldig ten opzichte van de aspecten van mijn persoonlijkheid die ik niet leuk vind.", subscale: "self_judgment" },
  { id: 12, text: "Als ik een heel moeilijke tijd doormaak, geef ik mezelf de zorg en tederheid die ik nodig heb.", subscale: "self_kindness" },
  { id: 13, text: "Als ik me down voel, heb ik de neiging te denken dat de meeste andere mensen waarschijnlijk gelukkiger zijn dan ik.", subscale: "isolation" },
  { id: 14, text: "Als er iets pijnlijks gebeurt, probeer ik een gebalanceerd beeld van de situatie te krijgen.", subscale: "mindfulness" },
  { id: 15, text: "Ik probeer mijn tekortkomingen te zien als onderdeel van de menselijke conditie.", subscale: "common_humanity" },
  { id: 16, text: "Als ik aspecten van mezelf zie die ik niet leuk vind, word ik negatief over mezelf.", subscale: "self_judgment" },
  { id: 17, text: "Als ik faal in iets dat belangrijk voor me is, probeer ik het in perspectief te plaatsen.", subscale: "mindfulness" },
  { id: 18, text: "Als ik het echt moeilijk heb, heb ik de neiging te denken dat andere mensen het makkelijker hebben.", subscale: "isolation" },
  { id: 19, text: "Ik ben vriendelijk voor mezelf wanneer ik lijden ervaar.", subscale: "self_kindness" },
  { id: 20, text: "Als iets me van streek maakt, word ik meegesleurd door mijn gevoelens.", subscale: "over_identification" },
  { id: 21, text: "Ik kan nogal kil zijn tegenover mezelf wanneer ik lijden ervaar.", subscale: "self_judgment" },
  { id: 22, text: "Als ik me down voel, probeer ik mijn gevoelens te benaderen met nieuwsgierigheid en openheid.", subscale: "mindfulness" },
  { id: 23, text: "Ik ben tolerant ten opzichte van mijn eigen tekortkomingen en onvolkomenheden.", subscale: "self_kindness" },
  { id: 24, text: "Als er iets pijnlijks gebeurt, heb ik de neiging om het voorval op te blazen.", subscale: "over_identification" },
  { id: 25, text: "Als ik faal in iets dat belangrijk voor me is, heb ik de neiging me alleen te voelen in mijn falen.", subscale: "isolation" },
  { id: 26, text: "Ik probeer begripvol en geduldig te zijn ten opzichte van de aspecten van mijn persoonlijkheid die ik niet leuk vind.", subscale: "self_kindness" },
];

const SCALE_OPTIONS = [
  { value: "1", label: "Bijna nooit" },
  { value: "2", label: "Zelden" },
  { value: "3", label: "Ongeveer de helft van de tijd" },
  { value: "4", label: "Vaak" },
  { value: "5", label: "Bijna altijd" },
];

const POSITIVE_SUBSCALES = ["self_kindness", "common_humanity", "mindfulness"];
const NEGATIVE_SUBSCALES = ["self_judgment", "isolation", "over_identification"];

const SUBSCALE_ITEMS: Record<string, number[]> = {
  self_kindness: [5, 12, 19, 23, 26],
  self_judgment: [1, 8, 11, 16, 21],
  common_humanity: [3, 7, 10, 15],
  isolation: [4, 13, 18, 25],
  mindfulness: [9, 14, 17, 22],
  over_identification: [2, 6, 20, 24],
};

const SUBSCALE_LABELS: Record<string, string> = {
  self_kindness: "Zelfvriendelijkheid",
  self_judgment: "Zelfoordeel",
  common_humanity: "Gedeelde menselijkheid",
  isolation: "Isolatie",
  mindfulness: "Mindfulness",
  over_identification: "Over-identificatie",
};

function calculateScores(answers: Record<string, number>) {
  const subscaleScores: Record<string, number> = {};

  for (const [subscale, items] of Object.entries(SUBSCALE_ITEMS)) {
    const values = items.map(id => answers[id.toString()]).filter(v => v != null);
    subscaleScores[subscale] = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  }

  // Overall = mean of positive subscales + reverse-scored negative subscales
  const positiveAvg = POSITIVE_SUBSCALES.map(s => subscaleScores[s]).reduce((a, b) => a + b, 0) / POSITIVE_SUBSCALES.length;
  const negativeReversedAvg = NEGATIVE_SUBSCALES.map(s => 6 - subscaleScores[s]).reduce((a, b) => a + b, 0) / NEGATIVE_SUBSCALES.length;
  const overall = (positiveAvg + negativeReversedAvg) / 2;

  return { subscaleScores, overall: Math.round(overall * 100) / 100 };
}

const ITEMS_PER_PAGE = 6;

export default function SelfCompassionQuestionnaire() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const [searchParams] = useSearchParams();
  const measurementType = searchParams.get("type") === "post" ? "post" : "pre";
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [enrollmentValid, setEnrollmentValid] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [scores, setScores] = useState<{ overall: number; subscaleScores: Record<string, number> } | null>(null);

  const totalPages = Math.ceil(SCS_ITEMS.length / ITEMS_PER_PAGE);
  const currentItems = SCS_ITEMS.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / SCS_ITEMS.length) * 100;
  const allCurrentAnswered = currentItems.every(item => answers[item.id.toString()]);

  useEffect(() => {
    if (!enrollmentId) return;
    checkEnrollment();
  }, [enrollmentId]);

  const checkEnrollment = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("enrollments")
      .select("id")
      .eq("id", enrollmentId!)
      .single();
    setEnrollmentValid(!!data);

    if (data) {
      // Check if this measurement type was already submitted
      const { data: existing } = await supabase
        .from("scs_submissions" as any)
        .select("id")
        .eq("enrollment_id", enrollmentId!)
        .eq("measurement_type", measurementType)
        .limit(1);
      setAlreadySubmitted((existing as any[] || []).length > 0);
    }

    setLoading(false);
  };

  const handleAnswer = (itemId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [itemId.toString()]: value }));
  };

  const handleSubmit = async () => {
    if (answeredCount < SCS_ITEMS.length) {
      toast.error("Beantwoord alsjeblieft alle 26 vragen");
      return;
    }

    setSubmitting(true);
    try {
      const numericAnswers: Record<string, number> = {};
      for (const [k, v] of Object.entries(answers)) {
        numericAnswers[k] = parseInt(v);
      }

      const { subscaleScores, overall } = calculateScores(numericAnswers);
      setScores({ subscaleScores, overall });

      const { error } = await supabase
        .from("scs_submissions" as any)
        .insert({
          enrollment_id: enrollmentId,
          answers: numericAnswers,
          overall_score: overall,
          self_kindness: Math.round(subscaleScores.self_kindness * 100) / 100,
          self_judgment: Math.round(subscaleScores.self_judgment * 100) / 100,
          common_humanity: Math.round(subscaleScores.common_humanity * 100) / 100,
          isolation: Math.round(subscaleScores.isolation * 100) / 100,
          mindfulness: Math.round(subscaleScores.mindfulness * 100) / 100,
          over_identification: Math.round(subscaleScores.over_identification * 100) / 100,
          measurement_type: measurementType,
        });

      if (error) throw error;
      setSubmitted(true);
      toast.success("Vragenlijst verstuurd!");
    } catch (err: any) {
      toast.error("Er ging iets mis: " + err.message);
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!enrollmentValid) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Deze vragenlijst is niet beschikbaar of de link is ongeldig.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (alreadySubmitted) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-3">
            <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-lg font-medium">Al ingevuld</h2>
            <p className="text-muted-foreground text-sm">
              Je hebt de {measurementType === "pre" ? "0-meting" : "nameting"} al ingevuld. Bedankt!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted && scores) {
    return (
      <div className="min-h-screen bg-warm-50 py-8 px-4">
        <SEO title="Resultaten Zelfcompassie Vragenlijst | Mindful Mind" description="Je resultaten" />
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
              <h2 className="text-xl font-medium">Bedankt!</h2>
              <p className="text-muted-foreground">
                Je vragenlijst is succesvol verstuurd. Hieronder zie je je resultaten.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Je Zelfcompassie Score</CardTitle>
              <CardDescription>Op een schaal van 1 tot 5</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall */}
              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Totaalscore</p>
                <p className="text-4xl font-light text-primary">{scores.overall.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {scores.overall < 2.5 ? "Relatief laag — je kunt baat hebben bij meer zelfcompassie" :
                   scores.overall < 3.5 ? "Gemiddeld — je kunt het vaker toepassen in je leven" :
                   "Relatief hoog — je bent vaak een goede vriend voor jezelf"}
                </p>
              </div>

              {/* Positive subscales */}
              <div>
                <h3 className="text-sm font-medium text-green-700 mb-3">Positieve zelfrespons</h3>
                <div className="space-y-3">
                  {POSITIVE_SUBSCALES.map(s => (
                    <div key={s} className="flex items-center justify-between">
                      <span className="text-sm">{SUBSCALE_LABELS[s]}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(scores.subscaleScores[s] / 5) * 100} className="w-24 h-2" />
                        <span className="text-sm font-medium w-8 text-right">{scores.subscaleScores[s].toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Negative subscales */}
              <div>
                <h3 className="text-sm font-medium text-orange-700 mb-3">Negatieve zelfrespons</h3>
                <div className="space-y-3">
                  {NEGATIVE_SUBSCALES.map(s => (
                    <div key={s} className="flex items-center justify-between">
                      <span className="text-sm">{SUBSCALE_LABELS[s]}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(scores.subscaleScores[s] / 5) * 100} className="w-24 h-2" />
                        <span className="text-sm font-medium w-8 text-right">{scores.subscaleScores[s].toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Bron: Neff, K. D. (2003). Self and Identity, 2, 223-250.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50 py-8 px-4">
      <SEO title="Zelfcompassie Vragenlijst | Mindful Mind" description="Vul de zelfcompassie vragenlijst in" />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-light text-foreground">
            Zelfcompassie Vragenlijst
            <span className="text-sm text-muted-foreground ml-2">
              ({measurementType === "pre" ? "0-meting" : "Nameting"})
            </span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Lees elke uitspraak zorgvuldig en geef aan hoe vaak je je zo gedraagt. 
            Er zijn geen goede of foute antwoorden.
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{answeredCount} van {SCS_ITEMS.length} vragen beantwoord</span>
            <span>Pagina {page + 1} van {totalPages}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Questions */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            {currentItems.map((item, idx) => (
              <div key={item.id} className="space-y-3 pb-5 border-b last:border-b-0 last:pb-0">
                <p className="text-sm font-medium">
                  <span className="text-muted-foreground mr-2">{item.id}.</span>
                  {item.text}
                </p>
                <RadioGroup
                  value={answers[item.id.toString()] || ""}
                  onValueChange={(v) => handleAnswer(item.id, v)}
                  className="flex flex-wrap gap-2"
                >
                  {SCALE_OPTIONS.map(opt => (
                    <div key={opt.value} className="flex items-center">
                      <RadioGroupItem value={opt.value} id={`q${item.id}-${opt.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`q${item.id}-${opt.value}`}
                        className="cursor-pointer text-xs px-3 py-1.5 rounded-full border border-border hover:bg-accent
                          peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground 
                          peer-data-[state=checked]:border-primary transition-colors"
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setPage(p => p - 1)}
            disabled={page === 0}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Vorige
          </Button>

          {page < totalPages - 1 ? (
            <Button
              onClick={() => setPage(p => p + 1)}
              disabled={!allCurrentAnswered}
              className="gap-1"
            >
              Volgende <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting || answeredCount < SCS_ITEMS.length}
              className="gap-2"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              Versturen
            </Button>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Gebaseerd op de Self-Compassion Scale van Dr. Kristin Neff (2003). Je gegevens worden vertrouwelijk behandeld.
        </p>
      </div>
    </div>
  );
}
