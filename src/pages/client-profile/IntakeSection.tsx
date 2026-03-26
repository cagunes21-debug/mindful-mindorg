import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Heart, Clock, AlertCircle, Target, Brain, Calendar, Shield,
  AlertTriangle, Save, Loader2, CheckCircle2, ChevronRight, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

const INTAKE_STEPS = [
  {
    key: "reason",
    label: "Aanmeldreden",
    description: "Waarom meldt de cliënt zich aan?",
    icon: Heart,
    color: "bg-terracotta-100 text-terracotta-700 border-terracotta-200",
    activeColor: "bg-terracotta-50 border-terracotta-300 ring-2 ring-terracotta-200/50",
    iconBg: "bg-terracotta-100",
    iconColor: "text-terracotta-600",
  },
  {
    key: "duration_of_issue",
    label: "Achtergrond & context",
    description: "Hoe lang speelt dit en wat is de context?",
    icon: Clock,
    color: "bg-warm-100 text-warm-600 border-warm-200",
    activeColor: "bg-warm-50 border-warm-300 ring-2 ring-warm-200/50",
    iconBg: "bg-warm-100",
    iconColor: "text-warm-600",
  },
  {
    key: "daily_impact",
    label: "Klachten & ernst",
    description: "Wat ervaart de cliënt en hoe ernstig is het?",
    icon: AlertCircle,
    color: "bg-coral-100 text-coral-600 border-coral-200",
    activeColor: "bg-coral-50 border-coral-300 ring-2 ring-coral-200/50",
    iconBg: "bg-coral-100",
    iconColor: "text-coral-600",
  },
  {
    key: "goal",
    label: "Doelen voor het traject",
    description: "Wat hoopt de cliënt te bereiken?",
    icon: Target,
    color: "bg-sage-100 text-sage-700 border-sage-200",
    activeColor: "bg-sage-50 border-sage-300 ring-2 ring-sage-200/50",
    iconBg: "bg-sage-100",
    iconColor: "text-sage-600",
  },
  {
    key: "previous_therapy",
    label: "Relevante voorgeschiedenis",
    description: "Eerdere therapie, coaching of relevante ervaring",
    icon: Brain,
    color: "bg-lavender-100 text-lavender-600 border-lavender-200",
    activeColor: "bg-lavender-50 border-lavender-300 ring-2 ring-lavender-200/50",
    iconBg: "bg-lavender-100",
    iconColor: "text-lavender-600",
  },
] as const;

export default function IntakeSection({ enrollmentId }: { enrollmentId: string }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [existingId, setExistingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [suitability, setSuitability] = useState("");
  const [contraindications, setContraindications] = useState("");
  const [intakeDate, setIntakeDate] = useState("");
  const [intakeDuration, setIntakeDuration] = useState("");
  const [activeStep, setActiveStep] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("intake_submissions")
        .select("id, reason, goal, duration_of_issue, daily_impact, previous_therapy, suitability_assessment, contraindications, intake_date, intake_duration_minutes")
        .eq("enrollment_id", enrollmentId)
        .limit(1)
        .maybeSingle();
      if (data) {
        setExistingId(data.id);
        setFormData({
          reason: (data as any).reason || "",
          duration_of_issue: (data as any).duration_of_issue || "",
          daily_impact: (data as any).daily_impact || "",
          goal: (data as any).goal || "",
          previous_therapy: (data as any).previous_therapy || "",
        });
        setSuitability((data as any).suitability_assessment || "");
        setContraindications((data as any).contraindications || "");
        setIntakeDate((data as any).intake_date || "");
        setIntakeDuration((data as any).intake_duration_minutes?.toString() || "");
      }
      setLoading(false);
    })();
  }, [enrollmentId]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload: any = {
        enrollment_id: enrollmentId,
        reason: formData.reason?.trim() || null,
        goal: formData.goal?.trim() || null,
        duration_of_issue: formData.duration_of_issue?.trim() || null,
        daily_impact: formData.daily_impact?.trim() || null,
        previous_therapy: formData.previous_therapy?.trim() || null,
        suitability_assessment: suitability || null,
        contraindications: contraindications.trim() || null,
        intake_date: intakeDate || null,
        intake_duration_minutes: intakeDuration ? parseInt(intakeDuration) : null,
      };
      if (existingId) {
        const { error } = await supabase.from("intake_submissions").update(payload).eq("id", existingId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("intake_submissions").insert(payload).select("id").single();
        if (error) throw error;
        setExistingId(data.id);
      }
      setSaved(true);
      toast.success("Intake opgeslagen");
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSaving(false);
  };

  const filledCount = INTAKE_STEPS.filter(s => formData[s.key]?.trim()).length;

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-5">
      {/* Kennismakingsgesprek — colored card */}
      <Card className="border-terracotta-200/60 bg-gradient-to-br from-terracotta-50 to-warm-50 overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-terracotta-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-terracotta-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Kennismakingsgesprek</h3>
              <p className="text-xs text-muted-foreground">Datum en duur van het intakegesprek</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Datum</Label>
              <Input type="date" value={intakeDate} onChange={e => setIntakeDate(e.target.value)} className="h-9 text-sm mt-1 bg-white/80" />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Duur (minuten)</Label>
              <Input type="number" value={intakeDuration} onChange={e => setIntakeDuration(e.target.value)} placeholder="45" className="h-9 text-sm mt-1 bg-white/80" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 px-1">
        <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-terracotta-400 to-sage-400 transition-all duration-500"
            style={{ width: `${(filledCount / INTAKE_STEPS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground font-medium">{filledCount}/{INTAKE_STEPS.length}</span>
      </div>

      {/* Intake steps — clickable cards */}
      <div className="space-y-2">
        {INTAKE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === step.key;
          const isFilled = !!formData[step.key]?.trim();

          return (
            <Card
              key={step.key}
              className={`border transition-all duration-200 cursor-pointer ${
                isActive ? step.activeColor : "border-border/50 hover:border-border"
              }`}
              onClick={() => setActiveStep(isActive ? null : step.key)}
            >
              <CardContent className="p-0">
                {/* Header row */}
                <div className="flex items-center gap-3 p-4">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${step.iconBg}`}>
                    {isFilled ? (
                      <CheckCircle2 className={`h-4.5 w-4.5 ${step.iconColor}`} />
                    ) : (
                      <Icon className={`h-4.5 w-4.5 ${step.iconColor}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{step.label}</p>
                    {!isActive && isFilled && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{formData[step.key]}</p>
                    )}
                    {!isActive && !isFilled && (
                      <p className="text-xs text-muted-foreground/60 italic mt-0.5">Nog niet ingevuld</p>
                    )}
                  </div>
                  <div className="shrink-0">
                    {isActive ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </div>
                </div>

                {/* Expanded content */}
                {isActive && (
                  <div className="px-4 pb-4 pt-0" onClick={e => e.stopPropagation()}>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    <Textarea
                      value={formData[step.key] || ""}
                      onChange={e => setFormData(prev => ({ ...prev, [step.key]: e.target.value }))}
                      placeholder={step.description}
                      className="min-h-[80px] resize-none text-sm bg-white/60"
                      autoFocus
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Klinisch oordeel — colored card */}
      <Card className="border-sage-200/60 bg-gradient-to-br from-sage-50 to-warm-50 overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-sage-100 flex items-center justify-center">
              <Shield className="h-5 w-5 text-sage-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Klinisch oordeel</h3>
              <p className="text-xs text-muted-foreground">Geschiktheidsoordeel en eventuele contra-indicaties</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Geschiktheidsoordeel</Label>
              <Select value={suitability} onValueChange={setSuitability}>
                <SelectTrigger className="h-9 text-sm mt-1 bg-white/80"><SelectValue placeholder="Selecteer..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="geschikt">✓ Geschikt voor traject</SelectItem>
                  <SelectItem value="niet_geschikt">✗ Niet geschikt</SelectItem>
                  <SelectItem value="doorverwijzen">→ Doorverwijzen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Contra-indicaties
              </Label>
              <Textarea
                value={contraindications}
                onChange={e => setContraindications(e.target.value)}
                placeholder="Eventuele contra-indicaties of aandachtspunten..."
                className="min-h-[60px] resize-none text-sm mt-1 bg-white/60"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="gap-2 h-10 px-6 rounded-xl bg-primary hover:bg-primary/90">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Opgeslagen!" : "Intake opslaan"}
        </Button>
      </div>
    </div>
  );
}
