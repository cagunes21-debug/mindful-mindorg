import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Brain, Save, Loader2, Plus, ChevronDown, FileText, Calendar, Trash2, Download, Pencil, X,
} from "lucide-react";
import { exportSessionPdf } from "./exportSessionPdf";
import { toast } from "sonner";

interface TherapySession {
  id: string;
  enrollment_id: string;
  transcript: string;
  helpvraag: string;
  achtergrond: string;
  belangrijkste_themas: string;
  doelstelling: string;
  observaties: string;
  interventies: string;
  session_number: number | null;
  session_date: string | null;
  created_at: string;
}

const FIELDS = [
  { key: "helpvraag", label: "Helpvraag", placeholder: "De primaire hulpvraag van de cliënt..." },
  { key: "achtergrond", label: "Achtergrond", placeholder: "Relevante achtergrondinfo en context..." },
  { key: "belangrijkste_themas", label: "Belangrijkste thema's", placeholder: "Thema's die in de sessie naar voren kwamen..." },
  { key: "doelstelling", label: "Doelstelling van de therapie", placeholder: "Doelstelling van deze sessie of het traject..." },
  { key: "observaties", label: "Observaties van de therapeut", placeholder: "Houding, emotie, non-verbaal gedrag, patronen..." },
  { key: "interventies", label: "Mogelijke interventies of technieken", placeholder: "Gebruikte of voorgestelde interventies..." },
] as const;

interface Props {
  enrollmentId: string;
  clientName?: string;
}

export default function TherapySessionSection({ enrollmentId, clientName }: Props) {
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSessions, setOpenSessions] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Record<string, string>>({});
  const [savingEdit, setSavingEdit] = useState(false);

  // New session state
  const [showNew, setShowNew] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split("T")[0]);
  const [fields, setFields] = useState<Record<string, string>>({
    helpvraag: "", achtergrond: "", belangrijkste_themas: "",
    doelstelling: "", observaties: "", interventies: "",
  });
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, [enrollmentId]);

  const fetchSessions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("therapy_sessions")
      .select("*")
      .eq("enrollment_id", enrollmentId)
      .order("session_date", { ascending: false });
    if (!error) setSessions((data || []) as TherapySession[]);
    setLoading(false);
  };

  const analyzeTranscript = async () => {
    if (transcript.trim().length < 50) {
      toast.error("Plak een langer transcript (minimaal een paar alinea's)");
      return;
    }
    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-transcript", {
        body: { transcript },
      });
      if (error) throw new Error(error.message || "Analyse mislukt");
      if (data?.error) throw new Error(data.error);

      setFields({
        helpvraag: data.helpvraag || "",
        achtergrond: data.achtergrond || "",
        belangrijkste_themas: data.belangrijkste_themas || "",
        doelstelling: data.doelstelling || "",
        observaties: data.observaties || "",
        interventies: data.interventies || "",
      });
      setHasGenerated(true);
      toast.success("Sessienotities gegenereerd! Je kunt ze nog aanpassen voor het opslaan.");
    } catch (err: any) {
      toast.error(err.message || "Fout bij het analyseren");
    }
    setAnalyzing(false);
  };

  const saveSession = async () => {
    setSaving(true);
    try {
      const nextNumber = sessions.length + 1;
      const { error } = await supabase.from("therapy_sessions").insert({
        enrollment_id: enrollmentId,
        transcript,
        session_date: sessionDate || null,
        session_number: nextNumber,
        ...fields,
      });
      if (error) throw error;
      toast.success("Sessienotities opgeslagen");
      resetForm();
      fetchSessions();
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSaving(false);
  };

  const deleteSession = async (id: string) => {
    if (!confirm("Weet je zeker dat je deze sessienotities wilt verwijderen?")) return;
    const { error } = await supabase.from("therapy_sessions").delete().eq("id", id);
    if (!error) {
      setSessions(prev => prev.filter(s => s.id !== id));
      toast.success("Sessienotities verwijderd");
    } else toast.error("Kon niet verwijderen");
  };

  const resetForm = () => {
    setShowNew(false);
    setTranscript("");
    setFields({ helpvraag: "", achtergrond: "", belangrijkste_themas: "", doelstelling: "", observaties: "", interventies: "" });
    setHasGenerated(false);
    setSessionDate(new Date().toISOString().split("T")[0]);
  };

  const startEditing = (session: TherapySession) => {
    setEditingId(session.id);
    setEditFields({
      helpvraag: session.helpvraag || "",
      achtergrond: session.achtergrond || "",
      belangrijkste_themas: session.belangrijkste_themas || "",
      doelstelling: session.doelstelling || "",
      observaties: session.observaties || "",
      interventies: session.interventies || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFields({});
  };

  const saveEdit = async (id: string) => {
    setSavingEdit(true);
    try {
      const { error } = await supabase.from("therapy_sessions").update(editFields).eq("id", id);
      if (error) throw error;
      setSessions(prev => prev.map(s => s.id === id ? { ...s, ...editFields } : s));
      setEditingId(null);
      toast.success("Sessienotities bijgewerkt");
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSavingEdit(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <Brain className="h-3 w-3" /> AI Sessienotities
        </p>
        {!showNew && (
          <Button size="sm" variant="outline" onClick={() => setShowNew(true)} className="gap-1.5 h-7 text-xs">
            <Plus className="h-3 w-3" /> Nieuwe sessie
          </Button>
        )}
      </div>

      {/* New session form */}
      {showNew && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Nieuwe sessienotities</p>
              <Button size="sm" variant="ghost" onClick={resetForm} className="text-xs h-7">Annuleren</Button>
            </div>

            <div>
              <Label className="text-xs">Sessiedatum</Label>
              <Input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)} className="h-8 text-xs mt-1 w-48" />
            </div>

            <div>
              <Label className="text-xs">Transcript plakken</Label>
              <Textarea
                placeholder="Plak hier het therapie-transcript..."
                value={transcript}
                onChange={e => setTranscript(e.target.value)}
                className="min-h-[120px] text-sm mt-1"
              />
            </div>

            <Button
              onClick={analyzeTranscript}
              disabled={analyzing || transcript.trim().length < 50}
              className="gap-2"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
              {analyzing ? "Analyseren..." : "Genereer sessienotities"}
            </Button>

            {/* Generated/editable fields */}
            {hasGenerated && (
              <div className="space-y-3 border-t pt-4">
                <p className="text-xs text-muted-foreground font-medium">
                  Gegenereerde notities — pas aan indien nodig
                </p>
                {FIELDS.map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <Label className="text-xs font-medium">{label}</Label>
                    <Textarea
                      placeholder={placeholder}
                      value={fields[key] || ""}
                      onChange={e => setFields(prev => ({ ...prev, [key]: e.target.value }))}
                      className="min-h-[60px] text-sm mt-1"
                    />
                  </div>
                ))}
                <Button onClick={saveSession} disabled={saving} className="gap-2">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saving ? "Opslaan..." : "Sessienotities opslaan"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Existing sessions */}
      {loading ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
          <Loader2 className="h-3 w-3 animate-spin" /> Laden...
        </div>
      ) : sessions.length === 0 && !showNew ? (
        <p className="text-xs text-muted-foreground py-2">Nog geen sessienotities.</p>
      ) : (
        <div className="space-y-1.5">
          {sessions.map(session => {
            const isOpen = openSessions[session.id] ?? false;
            return (
              <Collapsible key={session.id} open={isOpen} onOpenChange={() => setOpenSessions(prev => ({ ...prev, [session.id]: !prev[session.id] }))}>
                <Card>
                  <CollapsibleTrigger className="w-full text-left">
                    <CardContent className="p-2.5 flex items-center gap-2">
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`} />
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium flex-1">
                        Sessie {session.session_number || "?"}
                      </span>
                      {session.session_date && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(session.session_date).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="px-3 pb-3 pt-0 space-y-2">
                      {editingId === session.id ? (
                        <>
                          {FIELDS.map(({ key, label, placeholder }) => (
                            <div key={key}>
                              <Label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</Label>
                              <Textarea
                                placeholder={placeholder}
                                value={editFields[key] || ""}
                                onChange={e => setEditFields(prev => ({ ...prev, [key]: e.target.value }))}
                                className="min-h-[50px] text-xs mt-0.5"
                              />
                            </div>
                          ))}
                          <div className="flex justify-end gap-1 pt-1">
                            <Button size="sm" variant="ghost" onClick={cancelEditing} className="text-xs h-6 gap-1">
                              <X className="h-3 w-3" /> Annuleren
                            </Button>
                            <Button size="sm" onClick={() => saveEdit(session.id)} disabled={savingEdit} className="text-xs h-6 gap-1">
                              {savingEdit ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                              Opslaan
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          {FIELDS.map(({ key, label }) => {
                            const val = (session as any)[key];
                            if (!val) return null;
                            return (
                              <div key={key}>
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
                                <p className="text-xs leading-relaxed">{val}</p>
                              </div>
                            );
                          })}
                          <div className="flex justify-end gap-1 pt-1">
                            <Button size="sm" variant="ghost" onClick={() => startEditing(session)} className="text-xs h-6 gap-1">
                              <Pencil className="h-3 w-3" /> Bewerken
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => exportSessionPdf(session, clientName)} className="text-xs h-6 gap-1">
                              <Download className="h-3 w-3" /> PDF
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => deleteSession(session.id)} className="text-destructive text-[10px] h-6 gap-1">
                              <Trash2 className="h-3 w-3" /> Verwijderen
                            </Button>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>
      )}
    </div>
  );
}
