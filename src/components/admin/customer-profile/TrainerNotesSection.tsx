import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { TrainerNote } from "./types";

const NOTE_TYPES = [
  { type: "intake", label: "Intake-notitie", placeholder: "Observaties en afspraken uit het intakegesprek..." },
  { type: "aandachtspunt", label: "Belangrijk aandachtspunt", placeholder: "Waar moet je op letten bij deze deelnemer..." },
  { type: "reflectie", label: "Reflectie na laatste sessie", placeholder: "Hoe ging de laatste sessie, wat viel op..." },
];

interface TrainerNotesSectionProps {
  enrollmentId: string;
  existingNotes: TrainerNote[];
  onNotesUpdated: (notes: TrainerNote[]) => void;
}

export default function TrainerNotesSection({ enrollmentId, existingNotes, onNotesUpdated }: TrainerNotesSectionProps) {
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const initial: Record<string, string> = {};
    existingNotes.forEach(n => { initial[n.note_type] = n.content; });
    setEdits(initial);
    setDirty(false);
  }, [existingNotes]);

  const handleChange = (type: string, value: string) => {
    setEdits(prev => ({ ...prev, [type]: value }));
    setDirty(true);
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const { type } of NOTE_TYPES) {
        const content = edits[type] || "";
        const existing = existingNotes.find(n => n.note_type === type);
        if (existing) {
          if (existing.content !== content) {
            const { error } = await supabase.from("trainer_notes").update({ content }).eq("id", existing.id);
            if (error) throw error;
          }
        } else if (content.trim()) {
          const { data, error } = await supabase.from("trainer_notes").insert({ enrollment_id: enrollmentId, note_type: type, content }).select().single();
          if (error) throw error;
        }
      }
      // Refetch notes
      const { data } = await supabase.from("trainer_notes").select("*").eq("enrollment_id", enrollmentId);
      onNotesUpdated((data || []) as TrainerNote[]);
      setDirty(false);
      toast.success("Notities opgeslagen");
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <MessageSquare className="h-3 w-3" /> Trainernotities
        </p>
        <Button
          size="sm"
          variant={dirty ? "default" : "outline"}
          onClick={saveAll}
          disabled={saving || !dirty}
          className="gap-1.5 h-7 text-xs"
        >
          {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
          {saving ? "Opslaan..." : "Alles opslaan"}
        </Button>
      </div>
      <div className="space-y-2">
        {NOTE_TYPES.map(({ type, label, placeholder }) => (
          <div key={type}>
            <Label className="text-xs font-medium">{label}</Label>
            <Textarea
              placeholder={placeholder}
              value={edits[type] ?? ""}
              onChange={(e) => handleChange(type, e.target.value)}
              className="min-h-[44px] text-sm mt-1 resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
