import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Heart, CheckCircle2, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Enrollment } from "./types";

interface IntakeSectionProps {
  enrollment: Enrollment;
  onUpdate: (updated: Enrollment) => void;
}

export default function IntakeSection({ enrollment, onUpdate }: IntakeSectionProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ reason: "", theme: "", goal: "" });
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setEditing(true);
    setForm({
      reason: enrollment.intake_reason || "",
      theme: enrollment.intake_theme || "",
      goal: enrollment.intake_goal || "",
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("enrollments")
        .update({ intake_reason: form.reason || null, intake_theme: form.theme || null, intake_goal: form.goal || null })
        .eq("id", enrollment.id);
      if (error) throw error;
      onUpdate({ ...enrollment, intake_reason: form.reason || null, intake_theme: form.theme || null, intake_goal: form.goal || null });
      setEditing(false);
      toast.success("Intake opgeslagen");
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSaving(false);
  };

  const hasIntake = enrollment.intake_reason || enrollment.intake_theme || enrollment.intake_goal;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <Target className="h-3 w-3" /> Intake & Intentie
        </p>
        {!editing && (
          <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={startEdit}>
            Bewerken
          </Button>
        )}
      </div>
      {editing ? (
        <div className="space-y-2 bg-muted/30 rounded-lg p-3">
          <div>
            <Label className="text-xs">Waarom gestart?</Label>
            <Input className="h-8 text-xs" value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} placeholder="Reden van aanmelding" />
          </div>
          <div>
            <Label className="text-xs">Belangrijk thema</Label>
            <Input className="h-8 text-xs" value={form.theme} onChange={e => setForm(f => ({ ...f, theme: e.target.value }))} placeholder="Centraal thema" />
          </div>
          <div>
            <Label className="text-xs">Doel van het traject</Label>
            <Input className="h-8 text-xs" value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} placeholder="Wat wil de deelnemer bereiken?" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="gap-1.5 text-xs h-7" onClick={save} disabled={saving}>
              {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />} Opslaan
            </Button>
            <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => setEditing(false)}>Annuleren</Button>
          </div>
        </div>
      ) : hasIntake ? (
        <div className="space-y-1 text-sm bg-muted/20 rounded-lg p-3">
          {enrollment.intake_reason && <div className="flex gap-2"><Heart className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /><span>{enrollment.intake_reason}</span></div>}
          {enrollment.intake_theme && <div className="flex gap-2"><Target className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /><span>{enrollment.intake_theme}</span></div>}
          {enrollment.intake_goal && <div className="flex gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /><span>{enrollment.intake_goal}</span></div>}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">Nog geen intake ingevuld</p>
      )}
    </div>
  );
}
