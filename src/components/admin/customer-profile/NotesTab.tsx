import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, StickyNote, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Registration, Enrollment, TrainerNote } from "./types";
import { COURSE_TYPES } from "./types";
import TrainerNotesSection from "./TrainerNotesSection";
import TherapySessionSection from "./TherapySessionSection";

interface NotesTabProps {
  customer: { name: string };
  registrations: Registration[];
  enrollments: Enrollment[];
  structuredNotes: TrainerNote[];
  onStructuredNotesChange: (notes: TrainerNote[]) => void;
}

export default function NotesTab({
  customer, registrations, enrollments, structuredNotes, onStructuredNotesChange,
}: NotesTabProps) {
  const [trainerNotes, setTrainerNotes] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    registrations.forEach(r => { map[r.id] = r.admin_notes || ""; });
    return map;
  });
  const [savingNotes, setSavingNotes] = useState<string | null>(null);

  const saveLegacyNote = async (regId: string) => {
    setSavingNotes(regId);
    const { error } = await supabase.from("registrations").update({ admin_notes: trainerNotes[regId] || null }).eq("id", regId);
    if (!error) toast.success("Notitie opgeslagen");
    else toast.error("Kon notitie niet opslaan");
    setSavingNotes(null);
  };

  return (
    <div className="space-y-4">
      {/* Structured trainer notes per enrollment */}
      {enrollments.map(enrollment => {
        const isIndividual = enrollment.course_type === "individueel_6" || enrollment.course_type === "losse_sessie";
        return (
          <Card key={enrollment.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {COURSE_TYPES[enrollment.course_type] || enrollment.course_type}
                </span>
                <Badge variant="outline" className="text-[10px]">
                  Start: {new Date(enrollment.start_date).toLocaleDateString("nl-NL")}
                </Badge>
              </div>

              <TrainerNotesSection
                enrollmentId={enrollment.id}
                existingNotes={structuredNotes.filter(n => n.enrollment_id === enrollment.id)}
                onNotesUpdated={(updated) => {
                  onStructuredNotesChange([
                    ...structuredNotes.filter(n => n.enrollment_id !== enrollment.id),
                    ...updated,
                  ]);
                }}
              />

              {isIndividual && (
                <div className="border-t pt-3">
                  <TherapySessionSection enrollmentId={enrollment.id} clientName={customer.name || undefined} />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Legacy registration notes */}
      {registrations.some(r => r.admin_notes) && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <StickyNote className="h-3.5 w-3.5" /> Registratie notities (legacy)
            </p>
            {registrations.map(reg => (
              <div key={reg.id} className="space-y-1.5">
                <p className="text-xs text-muted-foreground">{reg.training_name}</p>
                <Textarea
                  value={trainerNotes[reg.id] || ""}
                  onChange={(e) => setTrainerNotes(prev => ({ ...prev, [reg.id]: e.target.value }))}
                  className="min-h-[50px] text-sm"
                  placeholder="Notities..."
                />
                <Button size="sm" variant="outline" onClick={() => saveLegacyNote(reg.id)} disabled={savingNotes === reg.id} className="gap-1.5 h-7 text-xs">
                  <Save className="h-3 w-3" /> {savingNotes === reg.id ? "Opslaan..." : "Opslaan"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {enrollments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Geen inschrijvingen gevonden. Maak eerst een inschrijving aan.
        </div>
      )}
    </div>
  );
}
