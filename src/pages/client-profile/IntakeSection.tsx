import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Clock, AlertCircle, Target, Brain, Calendar, Shield, AlertTriangle, Save, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const INTAKE_QUESTIONS = [
  { key: "reason", label: "Wat brengt je hier?", icon: Heart },
  { key: "duration_of_issue", label: "Hoe lang speelt dit al?", icon: Clock },
  { key: "daily_impact", label: "Impact op dagelijks leven", icon: AlertCircle },
  { key: "goal", label: "Wat wil je bereiken?", icon: Target },
  { key: "previous_therapy", label: "Eerdere therapie/coaching", icon: Brain },
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

  if (loading) return <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-4">
      {/* Kennismakingsgesprek */}
      <div className="rounded-xl bg-secondary/50 p-3 space-y-2">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="h-3 w-3" /> Kennismakingsgesprek
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Datum</Label>
            <Input type="date" value={intakeDate} onChange={e => setIntakeDate(e.target.value)} className="h-8 text-xs mt-0.5" />
          </div>
          <div>
            <Label className="text-xs">Duur (min)</Label>
            <Input type="number" value={intakeDuration} onChange={e => setIntakeDuration(e.target.value)} placeholder="45" className="h-8 text-xs mt-0.5" />
          </div>
        </div>
      </div>

      {/* Intake questions */}
      <div className="space-y-3">
        {INTAKE_QUESTIONS.map(q => (
          <div key={q.key}>
            <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1.5">
              <q.icon className="h-3 w-3" /> {q.label}
            </label>
            <Textarea
              value={formData[q.key] || ""}
              onChange={e => setFormData(prev => ({ ...prev, [q.key]: e.target.value }))}
              placeholder="..."
              className="min-h-[48px] resize-none text-sm"
            />
          </div>
        ))}
      </div>

      {/* Klinisch oordeel */}
      <div className="rounded-xl bg-secondary/50 p-3 space-y-2">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="h-3 w-3" /> Klinisch oordeel
        </p>
        <div>
          <Label className="text-xs">Geschiktheidsoordeel</Label>
          <Select value={suitability} onValueChange={setSuitability}>
            <SelectTrigger className="h-8 text-xs mt-0.5"><SelectValue placeholder="Selecteer..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="geschikt">✓ Geschikt</SelectItem>
              <SelectItem value="niet_geschikt">✗ Niet geschikt</SelectItem>
              <SelectItem value="doorverwijzen">→ Doorverwijzen</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Contra-indicaties</Label>
          <Textarea
            value={contraindications}
            onChange={e => setContraindications(e.target.value)}
            placeholder="Eventuele contra-indicaties..."
            className="min-h-[48px] resize-none text-xs mt-0.5"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5 h-8 text-xs">
          {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : saved ? <CheckCircle2 className="h-3 w-3" /> : <Save className="h-3 w-3" />}
          {saved ? "Opgeslagen" : "Opslaan"}
        </Button>
      </div>
    </div>
  );
}
