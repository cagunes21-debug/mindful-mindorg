import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus, Loader2, Save, Pencil, Trash2, X, ChevronDown,
  Users, User, FileText, Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import type { Enrollment, SessionAppointment } from "@/components/admin/customer-profile/types";

const INTAKE_TEMPLATE_FIELDS = [
  { key: "aanmeldreden", label: "Aanmeldreden", placeholder: "Waarom meldt de cliënt zich aan?" },
  { key: "achtergrond", label: "Achtergrond & context", placeholder: "Relevante voorgeschiedenis..." },
  { key: "klachten", label: "Klachten & impact", placeholder: "Wat ervaart de cliënt?" },
  { key: "doelen", label: "Doelen & verwachtingen", placeholder: "Wat hoopt de cliënt te bereiken?" },
  { key: "observaties", label: "Observaties therapeut", placeholder: "Eerste indruk, signalen..." },
  { key: "plan", label: "Voorlopig plan", placeholder: "Werkwijze, focus eerste sessies..." },
] as const;

const SESSION_TEMPLATE_FIELDS = [
  { key: "thema", label: "Thema van de sessie", placeholder: "Waar ging de sessie over?" },
  { key: "besproken", label: "Wat is besproken", placeholder: "Samenvatting van de inhoud..." },
  { key: "oefeningen", label: "Oefeningen & interventies", placeholder: "Welke technieken zijn gebruikt?" },
  { key: "observaties", label: "Observaties", placeholder: "Wat viel op?" },
  { key: "huiswerk", label: "Huiswerk & afspraken", placeholder: "Wat neemt de cliënt mee?" },
] as const;

interface Props {
  sessionAppointments: SessionAppointment[];
  enrollments: Enrollment[];
  onUpdate: () => void;
}

export default function SessionsSection({ sessionAppointments, enrollments, onUpdate }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [addDate, setAddDate] = useState("");
  const [addTime, setAddTime] = useState("");
  const [addEnrollmentId, setAddEnrollmentId] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [sessionNotes, setSessionNotes] = useState<Record<string, Record<string, string>>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);

  const allRelevant = enrollments.filter(e =>
    e.course_type === "individueel_6" || e.course_type === "losse_sessie" || e.course_type === "msc_8week"
  );

  useEffect(() => {
    if (!addEnrollmentId && allRelevant.length > 0) setAddEnrollmentId(allRelevant[0].id);
  }, [allRelevant.length]);

  const handleAdd = async () => {
    const target = allRelevant.find(e => e.id === addEnrollmentId) || allRelevant[0];
    if (!target || !addDate) { toast.error("Selecteer een datum"); return; }
    setSaving(true);
    try {
      const nextWeek = sessionAppointments.filter(a => a.enrollment_id === target.id).length + 1;
      const { error } = await supabase.from("session_appointments").insert({
        enrollment_id: target.id, week_number: nextWeek,
        session_date: addDate, session_time: addTime || null, status: "gepland",
      });
      if (error) throw error;
      toast.success("Sessie ingepland");
      setShowAdd(false); setAddDate(""); setAddTime("");
      onUpdate();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSaving(false);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setUpdatingId(editingId);
    try {
      const { error } = await supabase.from("session_appointments").update({
        status: editStatus, session_date: editDate || null, session_time: editTime || null,
      }).eq("id", editingId);
      if (error) throw error;
      if (editStatus === "afgerond") {
        const appt = sessionAppointments.find(a => a.id === editingId);
        if (appt) {
          const enrollment = enrollments.find(e => e.id === appt.enrollment_id);
          if (enrollment) {
            const count = sessionAppointments.filter(a => a.enrollment_id === enrollment.id && a.status === "afgerond").length + 1;
            await supabase.from("enrollments").update({ sessions_used: count }).eq("id", enrollment.id);
          }
        }
      }
      toast.success("Sessie bijgewerkt"); setEditingId(null); onUpdate();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setUpdatingId(null);
  };

  const deleteAppt = async (id: string) => {
    if (!confirm("Sessie verwijderen?")) return;
    const { error } = await supabase.from("session_appointments").delete().eq("id", id);
    if (!error) { toast.success("Sessie verwijderd"); onUpdate(); }
  };

  const loadSessionNotes = (appt: SessionAppointment): Record<string, string> => {
    if (sessionNotes[appt.id]) return sessionNotes[appt.id];
    if (appt.notes) {
      try { const p = JSON.parse(appt.notes); if (typeof p === "object" && !Array.isArray(p)) return p; } catch {}
    }
    return {};
  };

  const saveSessionNotesHandler = async (apptId: string, notes: Record<string, string>) => {
    setSavingNotes(apptId);
    try {
      const { error } = await supabase.from("session_appointments").update({ notes: JSON.stringify(notes) }).eq("id", apptId);
      if (error) throw error;
      toast.success("Notities opgeslagen"); onUpdate();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSavingNotes(null);
  };

  const getLabel = (e: Enrollment) => {
    if (e.course_type === "msc_8week") return "Groep";
    if (e.course_type === "individueel_6") return "Individueel";
    return "Losse sessie";
  };

  return (
    <div className="space-y-5">
      {allRelevant.length > 0 && (
        <div className="flex justify-end">
          <Button size="sm" variant="outline" onClick={() => setShowAdd(!showAdd)} className="gap-1.5 text-xs h-8 rounded-lg">
            <Plus className="h-3 w-3" /> Sessie inplannen
          </Button>
        </div>
      )}

      {showAdd && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-3 space-y-2">
            <p className="text-sm font-semibold">Nieuwe sessie</p>
            {allRelevant.length > 1 && (
              <Select value={addEnrollmentId} onValueChange={setAddEnrollmentId}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {allRelevant.map(e => <SelectItem key={e.id} value={e.id}>{getLabel(e)}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div><Label className="text-xs">Datum *</Label><Input type="date" value={addDate} onChange={e => setAddDate(e.target.value)} className="h-8 text-xs mt-0.5" /></div>
              <div><Label className="text-xs">Tijd</Label><Input type="time" value={addTime} onChange={e => setAddTime(e.target.value)} className="h-8 text-xs mt-0.5" /></div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)} className="text-xs h-7">Annuleren</Button>
              <Button size="sm" onClick={handleAdd} disabled={saving} className="gap-1.5 text-xs h-7">
                {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />} Inplannen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {allRelevant.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">Geen trajecten gevonden.</p>
      ) : (
        allRelevant.map(enrollment => {
          const appts = sessionAppointments.filter(a => a.enrollment_id === enrollment.id).sort((a, b) => a.week_number - b.week_number);
          const isGroup = enrollment.course_type === "msc_8week";
          const total = enrollment.sessions_total || (isGroup ? 8 : 6);
          const used = enrollment.sessions_used || 0;

          return (
            <div key={enrollment.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${isGroup ? "bg-sage-100 text-sage-700" : "bg-terracotta-100 text-terracotta-700"}`}>
                  {isGroup ? <Users className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold">{getLabel(enrollment)}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{used}/{total}</span>
                    <Progress value={(used / total) * 100} className="h-1 flex-1 max-w-24" />
                  </div>
                </div>
              </div>

              {appts.length === 0 ? (
                <p className="text-xs text-muted-foreground pl-9">Nog geen sessies ingepland.</p>
              ) : (
                <div className="space-y-1.5 pl-9">
                  {appts.map(appt => {
                    const isEditing = editingId === appt.id;
                    const isExpanded = expandedSession === appt.id;
                    const isIntake = appt.week_number === 1 && !isGroup;
                    const templateFields = isIntake ? INTAKE_TEMPLATE_FIELDS : SESSION_TEMPLATE_FIELDS;
                    const currentNotes = sessionNotes[appt.id] || loadSessionNotes(appt);
                    const hasNotes = Object.values(currentNotes).some(v => v?.trim());

                    return (
                      <Card key={appt.id} className={`border-border/40 ${isExpanded ? "ring-1 ring-primary/20" : ""}`}>
                        <CardContent className="p-2.5">
                          {isEditing ? (
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2">
                                <div><Label className="text-[10px]">Datum</Label><Input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} className="h-7 text-xs" /></div>
                                <div><Label className="text-[10px]">Tijd</Label><Input type="time" value={editTime} onChange={e => setEditTime(e.target.value)} className="h-7 text-xs" /></div>
                                <div><Label className="text-[10px]">Status</Label>
                                  <Select value={editStatus} onValueChange={setEditStatus}>
                                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="gepland">Gepland</SelectItem>
                                      <SelectItem value="afgerond">Afgerond</SelectItem>
                                      <SelectItem value="geannuleerd">Geannuleerd</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="flex gap-1 justify-end">
                                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="text-xs h-6"><X className="h-3 w-3" /></Button>
                                <Button size="sm" onClick={saveEdit} disabled={updatingId === appt.id} className="text-xs h-6">
                                  {updatingId === appt.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3 mr-1" />} Opslaan
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setExpandedSession(isExpanded ? null : appt.id)}>
                                <div className={`h-2 w-2 rounded-full shrink-0 ${
                                  appt.status === "afgerond" ? "bg-sage-500" : appt.status === "geannuleerd" ? "bg-destructive/60" : "bg-terracotta-400"
                                }`} />
                                <span className="text-xs font-medium flex-1">
                                  {isIntake ? "Sessie 1 — Intake" : `Sessie ${appt.week_number}`}
                                  <span className="text-muted-foreground font-normal ml-1.5">
                                    {appt.session_date ? format(new Date(appt.session_date), "d MMM", { locale: nl }) : "Niet gepland"}
                                    {appt.session_time && ` · ${appt.session_time.slice(0, 5)}`}
                                  </span>
                                  {hasNotes && <FileText className="h-2.5 w-2.5 text-muted-foreground inline ml-1" />}
                                </span>
                                <div className="flex gap-0.5 shrink-0" onClick={e => e.stopPropagation()}>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => { setEditingId(appt.id); setEditStatus(appt.status); setEditDate(appt.session_date || ""); setEditTime(appt.session_time || ""); }}>
                                    <Pencil className="h-2.5 w-2.5" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive" onClick={() => deleteAppt(appt.id)}>
                                    <Trash2 className="h-2.5 w-2.5" />
                                  </Button>
                                </div>
                                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                              </div>
                              {isExpanded && (
                                <div className="mt-3 pt-2 border-t border-border/40 space-y-2">
                                  {templateFields.map(field => (
                                    <div key={field.key}>
                                      <Label className="text-[10px] font-medium">{field.label}</Label>
                                      <Textarea
                                        placeholder={field.placeholder}
                                        value={currentNotes[field.key] || ""}
                                        onChange={e => setSessionNotes(prev => ({ ...prev, [appt.id]: { ...(prev[appt.id] || currentNotes), [field.key]: e.target.value } }))}
                                        className="min-h-[40px] resize-none text-xs mt-0.5"
                                      />
                                    </div>
                                  ))}
                                  <div className="flex justify-end">
                                    <Button size="sm" variant="outline" onClick={() => saveSessionNotesHandler(appt.id, sessionNotes[appt.id] || currentNotes)} disabled={savingNotes === appt.id} className="gap-1 text-xs h-7">
                                      {savingNotes === appt.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />} Opslaan
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
