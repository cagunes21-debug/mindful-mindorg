import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface IntakeFormSectionProps {
  enrollmentId: string;
}

const QUESTIONS = [
  { key: "reason", label: "Wat brengt je hier?" },
  { key: "duration_of_issue", label: "Hoe lang speelt dit al?" },
  { key: "daily_impact", label: "Hoe beïnvloedt dit je dagelijks leven?" },
  { key: "goal", label: "Wat hoop je te veranderen?" },
  { key: "previous_therapy", label: "Heb je eerder therapie of coaching gehad?" },
] as const;

type FormData = Record<string, string>;

export default function IntakeFormSection({ enrollmentId }: IntakeFormSectionProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [existingId, setExistingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchExisting();
  }, [enrollmentId]);

  const fetchExisting = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("intake_submissions")
      .select("id, reason, goal, duration_of_issue, daily_impact, previous_therapy")
      .eq("enrollment_id", enrollmentId)
      .limit(1)
      .maybeSingle();

    if (data) {
      setExistingId(data.id);
      setFormData({
        reason: data.reason || "",
        duration_of_issue: (data as any).duration_of_issue || "",
        daily_impact: (data as any).daily_impact || "",
        goal: data.goal || "",
        previous_therapy: (data as any).previous_therapy || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload = {
        enrollment_id: enrollmentId,
        reason: formData.reason?.trim() || null,
        goal: formData.goal?.trim() || null,
        duration_of_issue: formData.duration_of_issue?.trim() || null,
        daily_impact: formData.daily_impact?.trim() || null,
        previous_therapy: formData.previous_therapy?.trim() || null,
      };

      if (existingId) {
        const { error } = await supabase
          .from("intake_submissions")
          .update(payload)
          .eq("id", existingId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("intake_submissions")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        setExistingId(data.id);
      }
      setSaved(true);
      toast.success("Intake opgeslagen");
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      toast.error("Fout bij opslaan: " + err.message);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Card className="border-border/60">
      <CardContent className="p-4 space-y-4">
        {QUESTIONS.map(q => (
          <div key={q.key}>
            <label className="text-sm font-medium mb-1 block">{q.label}</label>
            <Textarea
              value={formData[q.key] || ""}
              onChange={e => setFormData(prev => ({ ...prev, [q.key]: e.target.value }))}
              placeholder="Typ hier..."
              className="min-h-[60px] resize-none text-sm"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            {saved ? "Opgeslagen" : "Opslaan"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
