import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2, Pencil, Trash2, X, Save, MessageCircle, AlertTriangle, Lightbulb, ClipboardCheck, FileText } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import type { Enrollment, TrainerNote } from "@/components/admin/customer-profile/types";

const NOTE_TYPES: Record<string, { label: string; icon: any; gradient: string; bg: string; border: string }> = {
  general: { label: "Algemeen", icon: MessageCircle, gradient: "from-secondary to-secondary/80", bg: "bg-secondary/30", border: "border-border/40" },
  intake: { label: "Intake-notitie", icon: FileText, gradient: "from-terracotta-100 to-terracotta-50", bg: "bg-terracotta-50/50", border: "border-terracotta-200/50" },
  attention: { label: "Aandachtspunt", icon: AlertTriangle, gradient: "from-amber-100 to-amber-50", bg: "bg-amber-50/50", border: "border-amber-200/50" },
  reflection: { label: "Reflectie na sessie", icon: Lightbulb, gradient: "from-sage-100 to-sage-50", bg: "bg-sage-50/50", border: "border-sage-200/50" },
  evaluation: { label: "Eindevaluatie", icon: ClipboardCheck, gradient: "from-sage-200 to-sage-100", bg: "bg-sage-100/50", border: "border-sage-200/50" },
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
    <div className="space-y-4">
      {/* Add note */}
      {enrollments.length > 0 && (
        <Card className="border-primary/10 bg-gradient-to-br from-warm-50/50 to-background overflow-hidden">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Select value={noteType} onValueChange={setNoteType}>
                <SelectTrigger className="w-44 h-9 text-xs rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(NOTE_TYPES).map(([k, v]) => {
                    const Icon = v.icon;
                    return (
                      <SelectItem key={k} value={k}>
                        <span className="flex items-center gap-1.5"><Icon className="h-3 w-3" />{v.label}</span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <div className="flex-1" />
              <Button size="sm" onClick={handleAdd} disabled={saving || !newNote.trim()} className="shrink-0 gap-1.5 h-9 rounded-xl bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />} Toevoegen
              </Button>
            </div>
            <Textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Schrijf een notitie..." className="min-h-[80px] text-sm resize-none rounded-xl bg-white/60" />
          </CardContent>
        </Card>
      )}

      {notes.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border/60 p-10 text-center">
          <FileText className="h-8 w-8 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">Nog geen notities.</p>
        </div>
      )}

      <div className="space-y-2">
        {notes.map(note => {
          const info = NOTE_TYPES[note.note_type] || NOTE_TYPES.general;
          const Icon = info.icon;
          const isEditing = editingId === note.id;
          return (
            <Card key={note.id} className={`${info.border} border overflow-hidden transition-all`}>
              <CardContent className="p-0">
                {isEditing ? (
                  <div className="p-4 space-y-3">
                    <Select value={editType} onValueChange={setEditType}>
                      <SelectTrigger className="w-44 h-8 text-xs rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(NOTE_TYPES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="min-h-[80px] text-sm resize-none rounded-xl" />
                    <div className="flex gap-1.5 justify-end">
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="h-8 text-xs rounded-xl"><X className="h-3 w-3 mr-1" />Annuleren</Button>
                      <Button size="sm" onClick={saveEdit} className="h-8 text-xs gap-1 rounded-xl"><Save className="h-3 w-3" />Opslaan</Button>
                    </div>
                  </div>
                ) : (
                  <div className={`flex items-start gap-3 p-4 ${info.bg}`}>
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br ${info.gradient}`}>
                      <Icon className="h-3.5 w-3.5 text-foreground/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{info.label}</span>
                        {(note as any).created_at && (
                          <span className="text-[10px] text-muted-foreground/70">
                            {format(new Date((note as any).created_at), "d MMM yyyy", { locale: nl })}
                          </span>
                        )}
                      </div>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{note.content}</p>
                    </div>
                    <div className="flex gap-0.5 shrink-0 pt-0.5">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg hover:bg-white/50" onClick={() => { setEditingId(note.id); setEditContent(note.content); setEditType(note.note_type); }}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg text-destructive hover:bg-destructive/10" onClick={() => handleDelete(note.id)}>
                        <Trash2 className="h-3 w-3" />
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
