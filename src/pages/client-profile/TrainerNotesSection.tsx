import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2, Pencil, Trash2, X, Save } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import type { Enrollment, TrainerNote } from "@/components/admin/customer-profile/types";

const NOTE_TYPES: Record<string, { label: string; color: string }> = {
  general: { label: "Algemeen", color: "bg-secondary/50" },
  intake: { label: "Intake-notitie", color: "bg-terracotta-50" },
  attention: { label: "Aandachtspunt", color: "bg-amber-50 dark:bg-amber-950/30" },
  reflection: { label: "Reflectie na sessie", color: "bg-sage-50" },
  evaluation: { label: "Eindevaluatie", color: "bg-sage-100" },
};

interface Props {
  enrollments: Enrollment[];
  notes: TrainerNote[];
  onNotesChange: (notes: TrainerNote[]) => void;
}

export default function TrainerNotesSection({ enrollments, notes, onNotesChange }: Props) {
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState("general");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editType, setEditType] = useState("general");

  const handleAdd = async () => {
    if (!newNote.trim() || enrollments.length === 0) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.from("trainer_notes").insert({
        enrollment_id: enrollments[0].id, note_type: noteType, content: newNote.trim(),
      }).select("id, enrollment_id, note_type, content, created_at").single();
      if (error) throw error;
      onNotesChange([data as any, ...notes]);
      setNewNote(""); toast.success("Notitie opgeslagen");
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Notitie verwijderen?")) return;
    const { error } = await supabase.from("trainer_notes").delete().eq("id", id);
    if (!error) { onNotesChange(notes.filter(n => n.id !== id)); toast.success("Verwijderd"); }
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      const { error } = await supabase.from("trainer_notes").update({ content: editContent.trim(), note_type: editType }).eq("id", editingId);
      if (error) throw error;
      onNotesChange(notes.map(n => n.id === editingId ? { ...n, content: editContent.trim(), note_type: editType } : n));
      setEditingId(null); toast.success("Bijgewerkt");
    } catch (err: any) { toast.error("Fout: " + err.message); }
  };

  return (
    <div className="space-y-3">
      {enrollments.length > 0 && (
        <Card className="border-border/40">
          <CardContent className="p-3 space-y-2">
            <div className="flex gap-2">
              <Select value={noteType} onValueChange={setNoteType}>
                <SelectTrigger className="w-40 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(NOTE_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleAdd} disabled={saving || !newNote.trim()} className="shrink-0 gap-1 h-8 text-xs">
                {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />} Toevoegen
              </Button>
            </div>
            <Textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Schrijf een notitie..." className="min-h-[60px] text-sm" />
          </CardContent>
        </Card>
      )}

      {notes.length === 0 && <p className="text-xs text-muted-foreground py-3">Nog geen notities.</p>}

      <div className="space-y-1.5">
        {notes.map(note => {
          const info = NOTE_TYPES[note.note_type] || { label: note.note_type, color: "bg-secondary/50" };
          const isEditing = editingId === note.id;
          return (
            <Card key={note.id} className={`border-border/40 ${info.color}`}>
              <CardContent className="p-3">
                {isEditing ? (
                  <div className="space-y-2">
                    <Select value={editType} onValueChange={setEditType}>
                      <SelectTrigger className="w-40 h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(NOTE_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="min-h-[60px] text-sm" />
                    <div className="flex gap-1 justify-end">
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="h-7 text-xs"><X className="h-3 w-3 mr-1" />Annuleren</Button>
                      <Button size="sm" onClick={saveEdit} className="h-7 text-xs gap-1"><Save className="h-3 w-3" />Opslaan</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{info.label}</span>
                        {(note as any).created_at && (
                          <span className="text-[10px] text-muted-foreground">
                            {format(new Date((note as any).created_at), "d MMM yyyy", { locale: nl })}
                          </span>
                        )}
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => { setEditingId(note.id); setEditContent(note.content); setEditType(note.note_type); }}>
                        <Pencil className="h-2.5 w-2.5" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive" onClick={() => handleDelete(note.id)}>
                        <Trash2 className="h-2.5 w-2.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
