import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown, Unlock, Eye, Plus, Lock, Loader2, Headphones,
  ClipboardList, Presentation, FileText, Settings2,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import type { Registration, Enrollment, CourseWeek, SessionAppointment, TrainerNote } from "./types";
import { COURSE_TYPES, statusColors, paymentStatusColors } from "./types";
import SessionPlanningSection from "./SessionPlanningSection";
import IntakeSection from "./IntakeSection";
import TrainerNotesSection from "./TrainerNotesSection";
import TherapySessionSection from "./TherapySessionSection";

const SECTION_LABELS_MAP: Record<string, string> = {
  meditations: "Meditaties",
  assignments: "Opdrachten",
  presentations: "Presentaties",
  notebooks: "Werkboek",
};

const SECTION_ICONS_MAP: Record<string, typeof Headphones> = {
  meditations: Headphones,
  assignments: ClipboardList,
  presentations: Presentation,
  notebooks: FileText,
};

interface TrainingsTabProps {
  customer: { name: string; email: string; phone: string | null };
  registrations: Registration[];
  enrollments: Enrollment[];
  courseWeeks: CourseWeek[];
  sessionAppointments: SessionAppointment[];
  structuredNotes: TrainerNote[];
  onEnrollmentsChange: (enrollments: Enrollment[]) => void;
  onSessionAppointmentsChange: (appointments: SessionAppointment[]) => void;
  onStructuredNotesChange: (notes: TrainerNote[]) => void;
  onRefresh: () => void;
  registrationRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  openCards: Record<string, boolean>;
  onToggleCard: (id: string) => void;
}

export default function TrainingsTab({
  customer, registrations, enrollments, courseWeeks, sessionAppointments,
  structuredNotes, onEnrollmentsChange, onSessionAppointmentsChange,
  onStructuredNotesChange, onRefresh, registrationRefs, openCards, onToggleCard,
}: TrainingsTabProps) {
  const [saving, setSaving] = useState(false);
  const [creatingForRegId, setCreatingForRegId] = useState<string | null>(null);
  const [newCourseType, setNewCourseType] = useState("msc_8week");
  const [newStartDate, setNewStartDate] = useState("");
  const [newTrainerName, setNewTrainerName] = useState("");
  const [creating, setCreating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState<Record<string, boolean>>({});

  const toggleWeek = async (enrollment: Enrollment, weekNumber: number) => {
    const current = enrollment.unlocked_weeks || [1];
    const updated = current.includes(weekNumber)
      ? current.filter(w => w !== weekNumber)
      : [...current, weekNumber].sort((a, b) => a - b);
    setSaving(true);
    const { error } = await supabase.from("enrollments").update({ unlocked_weeks: updated }).eq("id", enrollment.id);
    if (!error) {
      onEnrollmentsChange(enrollments.map(e => e.id === enrollment.id ? { ...e, unlocked_weeks: updated } : e));
      toast.success(`Sessie ${weekNumber} ${updated.includes(weekNumber) ? 'vrijgegeven' : 'vergrendeld'}`);
    } else toast.error("Kon niet opslaan");
    setSaving(false);
  };

  const toggleSection = async (enrollment: Enrollment, section: string) => {
    const current = enrollment.visible_sections || ['meditations', 'assignments', 'presentations', 'notebooks'];
    const updated = current.includes(section) ? current.filter(s => s !== section) : [...current, section];
    setSaving(true);
    const { error } = await supabase.from("enrollments").update({ visible_sections: updated }).eq("id", enrollment.id);
    if (!error) {
      onEnrollmentsChange(enrollments.map(e => e.id === enrollment.id ? { ...e, visible_sections: updated } : e));
      toast.success(`${SECTION_LABELS_MAP[section]} ${updated.includes(section) ? 'zichtbaar' : 'verborgen'}`);
    } else toast.error("Kon niet opslaan");
    setSaving(false);
  };

  const createEnrollmentForReg = async (regId: string) => {
    if (!newStartDate) { toast.error("Vul een startdatum in"); return; }
    setCreating(true);
    try {
      let userId: string | undefined;
      const regIds = registrations.map(r => r.id);
      if (regIds.length > 0) {
        const { data: existingEnr } = await supabase.from("enrollments").select("user_id").in("registration_id", regIds).not("user_id", "is", null).limit(1);
        userId = existingEnr?.[0]?.user_id;
      }
      if (!userId) {
        const { data: allRegs } = await supabase.from("registrations").select("id").eq("email", customer.email);
        if (allRegs && allRegs.length > 0) {
          const { data: existingEnr } = await supabase.from("enrollments").select("user_id").in("registration_id", allRegs.map(r => r.id)).not("user_id", "is", null).limit(1);
          userId = existingEnr?.[0]?.user_id;
        }
      }
      const { error } = await supabase.from("enrollments").insert({
        user_id: userId || null, course_type: newCourseType, start_date: newStartDate,
        trainer_name: newTrainerName || null, registration_id: regId, unlocked_weeks: [1],
        status: userId ? "active" : "invited",
      });
      if (error) throw error;
      toast.success(userId ? "Inschrijving aangemaakt!" : "Inschrijving aangemaakt! Account koppeling volgt na registratie.");
      setCreatingForRegId(null);
      setNewCourseType("msc_8week"); setNewStartDate(""); setNewTrainerName("");
      onRefresh();
    } catch (err: any) { toast.error("Fout bij aanmaken: " + err.message); }
    setCreating(false);
  };

  return (
    <div className="space-y-2">
      {registrations.map((reg) => {
        const enrollment = enrollments.find(e => e.registration_id === reg.id);
        const weeks = enrollment ? courseWeeks.filter(w => w.course_type === enrollment.course_type) : [];
        const label = enrollment?.course_type === "msc_8week" ? "Week" : "Sessie";
        const isOpen = openCards[reg.id] ?? false;
        const isIndividual = enrollment && (enrollment.course_type === "individueel_6" || enrollment.course_type === "losse_sessie");
        const unlockedCount = enrollment ? (enrollment.unlocked_weeks || [1]).length : 0;
        const advancedOpen = showAdvanced[reg.id] ?? false;

        return (
          <div key={reg.id} ref={(el) => { registrationRefs.current[reg.id] = el; }}>
            <Collapsible open={isOpen} onOpenChange={() => onToggleCard(reg.id)}>
              <Card className="transition-all">
                <CollapsibleTrigger className="w-full text-left">
                  <CardContent className="p-3 flex items-center gap-2">
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`} />
                    <span className="font-medium text-sm flex-1 truncate">{reg.training_name}</span>
                    <Badge className={`${statusColors[reg.status]} text-[10px] px-1.5 py-0`}>{reg.status}</Badge>
                    <Badge className={`${paymentStatusColors[reg.payment_status || 'pending']} text-[10px] px-1.5 py-0`}>{reg.payment_status || 'pending'}</Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {reg.training_date || format(new Date(reg.created_at), "d MMM yyyy", { locale: nl })}
                    </span>
                  </CardContent>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="px-4 pb-4 pt-0 space-y-3">
                    {enrollment ? (
                      <>
                        {/* Compact summary row */}
                        <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-[10px]">{COURSE_TYPES[enrollment.course_type]}</Badge>
                          <span>•</span>
                          <span>{unlockedCount}/{weeks.length} {label.toLowerCase()}s vrijgegeven</span>
                          <span>•</span>
                          <span>Start {new Date(enrollment.start_date).toLocaleDateString("nl-NL")}</span>
                        </div>

                        {/* Compact week toggles — single row of small pills */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Unlock className="h-3 w-3 text-muted-foreground shrink-0" />
                          {weeks.map(week => {
                            const isUnlocked = (enrollment.unlocked_weeks || [1]).includes(week.week_number);
                            return (
                              <button key={week.id} onClick={() => toggleWeek(enrollment, week.week_number)} disabled={saving}
                                className={`w-7 h-7 rounded-md text-[10px] font-medium transition-colors ${
                                  isUnlocked ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted text-muted-foreground border border-border"
                                }`} title={`${label} ${week.week_number}: ${week.title}`}
                              >
                                {week.week_number}
                              </button>
                            );
                          })}
                        </div>

                        {/* Advanced settings toggle */}
                        <button
                          onClick={() => setShowAdvanced(prev => ({ ...prev, [reg.id]: !prev[reg.id] }))}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Settings2 className="h-3 w-3" />
                          <span>{advancedOpen ? "Minder tonen" : "Meer opties"}</span>
                          <ChevronDown className={`h-3 w-3 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
                        </button>

                        {advancedOpen && (
                          <div className="space-y-3 pl-1 border-l-2 border-muted ml-1">
                            {/* Content visibility */}
                            <div className="pl-3 space-y-1.5">
                              <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium"><Eye className="h-3 w-3" /> Zichtbare inhoud</p>
                              <div className="flex flex-wrap gap-3">
                                {Object.entries(SECTION_ICONS_MAP).map(([key, Icon]) => {
                                  const isVisible = (enrollment.visible_sections || ['meditations', 'assignments', 'presentations', 'notebooks']).includes(key);
                                  return (
                                    <label key={key} className="flex items-center gap-1.5 cursor-pointer">
                                      <Checkbox checked={isVisible} disabled={saving} onCheckedChange={() => toggleSection(enrollment, key)} />
                                      <Icon className="h-3 w-3 text-muted-foreground" />
                                      <span className="text-xs">{SECTION_LABELS_MAP[key]}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Session Planning */}
                            {isIndividual && (
                              <div className="pl-3">
                                <SessionPlanningSection
                                  enrollmentId={enrollment.id}
                                  courseType={enrollment.course_type}
                                  weeks={weeks}
                                  appointments={sessionAppointments.filter(a => a.enrollment_id === enrollment.id)}
                                  onAppointmentsChange={(updated) => {
                                    onSessionAppointmentsChange([
                                      ...sessionAppointments.filter(a => a.enrollment_id !== enrollment.id),
                                      ...updated,
                                    ]);
                                  }}
                                />
                              </div>
                            )}

                            {/* Intake */}
                            {isIndividual && (
                              <div className="pl-3">
                                <IntakeSection
                                  enrollment={enrollment}
                                  onUpdate={(updated) => onEnrollmentsChange(enrollments.map(e => e.id === updated.id ? updated : e))}
                                />
                              </div>
                            )}

                            {/* Trainer Notes */}
                            <div className="pl-3">
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
                            </div>

                            {/* AI Therapy Session Notes */}
                            {isIndividual && (
                              <div className="pl-3">
                                <TherapySessionSection enrollmentId={enrollment.id} clientName={customer.name || undefined} />
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-3">
                        {creatingForRegId === reg.id ? (
                          <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs font-medium">Nieuwe inschrijving aanmaken</p>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-xs">Programma</Label>
                                <Select value={newCourseType} onValueChange={setNewCourseType}>
                                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {Object.entries(COURSE_TYPES).map(([key, lbl]) => (
                                      <SelectItem key={key} value={key}>{lbl}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-xs">Startdatum *</Label>
                                <Input type="date" className="h-8 text-xs" value={newStartDate} onChange={e => setNewStartDate(e.target.value)} />
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">Trainer (optioneel)</Label>
                              <Input className="h-8 text-xs" value={newTrainerName} onChange={e => setNewTrainerName(e.target.value)} placeholder="Naam trainer" />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => createEnrollmentForReg(reg.id)} disabled={creating} className="gap-1.5 text-xs">
                                {creating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />} Aanmaken
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setCreatingForRegId(null)} className="text-xs">Annuleren</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Lock className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground flex-1">Geen inschrijving gekoppeld</p>
                            <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7" onClick={() => setCreatingForRegId(reg.id)}>
                              <Plus className="h-3 w-3" /> Inschrijving aanmaken
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        );
      })}

      {registrations.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Nog geen trainingen. Klik op "Extra training" om te beginnen.
        </div>
      )}
    </div>
  );
}