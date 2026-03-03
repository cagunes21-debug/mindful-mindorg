import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Mail, Phone, Calendar, Euro, ShoppingBag, ArrowLeft, BookOpen,
  Headphones, ClipboardList, Presentation, FileText, Save, StickyNote,
  Eye, Lock, Unlock, Plus, Loader2, Clock, AlertCircle, ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";

import IntakeSection from "./customer-profile/IntakeSection";
import TrainerNotesSection from "./customer-profile/TrainerNotesSection";
import SessionPlanningSection from "./customer-profile/SessionPlanningSection";
import {
  type CustomerData, type Registration, type Enrollment, type TrainerNote,
  type CourseWeek, type SessionAppointment,
  COURSE_TYPES, statusColors, paymentStatusColors,
} from "./customer-profile/types";

const SECTION_ICONS: Record<string, typeof Headphones> = {
  meditations: Headphones,
  assignments: ClipboardList,
  presentations: Presentation,
  notebooks: FileText,
};

const SECTION_LABELS_MAP: Record<string, string> = {
  meditations: "Meditaties",
  assignments: "Opdrachten",
  presentations: "Presentaties",
  notebooks: "Werkboek",
};

interface CustomerProfileProps {
  email: string;
  onClose: () => void;
}

export default function CustomerProfile({ email, onClose }: CustomerProfileProps) {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courseWeeks, setCourseWeeks] = useState<CourseWeek[]>([]);
  const [sessionAppointments, setSessionAppointments] = useState<SessionAppointment[]>([]);
  const [structuredNotes, setStructuredNotes] = useState<TrainerNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [trainerNotes, setTrainerNotes] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});
  const registrationRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Create enrollment state
  const [creatingForRegId, setCreatingForRegId] = useState<string | null>(null);
  const [newCourseType, setNewCourseType] = useState("msc_8week");
  const [newStartDate, setNewStartDate] = useState("");
  const [newTrainerName, setNewTrainerName] = useState("");
  const [creating, setCreating] = useState(false);

  // Extra training state
  const [showExtraTraining, setShowExtraTraining] = useState(false);
  const [extraTrainingName, setExtraTrainingName] = useState("8-weekse Mindful Zelfcompassie Training");
  const [extraRemarks, setExtraRemarks] = useState("");
  const [submittingExtra, setSubmittingExtra] = useState(false);

  useEffect(() => { fetchCustomerData(); }, [email]);

  const fetchCustomerData = async () => {
    setIsLoading(true);
    try {
      const [customerRes, regRes, weeksRes] = await Promise.all([
        supabase.from("customers").select("*").eq("email", email).single(),
        supabase.from("registrations").select("id, training_name, training_date, status, payment_status, price, created_at, admin_notes").eq("email", email).order("created_at", { ascending: false }),
        supabase.from("course_weeks").select("id, week_number, title, course_type").order("week_number"),
      ]);

      if (customerRes.error) throw customerRes.error;
      setCustomer(customerRes.data);
      const regs = (regRes.data || []) as Registration[];
      setRegistrations(regs);
      setCourseWeeks((weeksRes.data || []) as CourseWeek[]);

      const notesMap: Record<string, string> = {};
      regs.forEach(r => { notesMap[r.id] = r.admin_notes || ""; });
      setTrainerNotes(notesMap);

      // Auto-open first card
      if (regs.length > 0) setOpenCards({ [regs[0].id]: true });

      const regIds = regs.map(r => r.id);
      if (regIds.length > 0) {
        const { data: enrollData } = await supabase
          .from("enrollments")
          .select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id, intake_reason, intake_theme, intake_goal")
          .in("registration_id", regIds)
          .order("created_at", { ascending: false });
        const enrs = (enrollData || []) as Enrollment[];
        setEnrollments(enrs);

        const allEnrIds = enrs.map(e => e.id);
        if (allEnrIds.length > 0) {
          const [notesRes, apptRes] = await Promise.all([
            supabase.from("trainer_notes").select("id, enrollment_id, note_type, content").in("enrollment_id", allEnrIds),
            supabase.from("session_appointments").select("*")
              .in("enrollment_id", enrs.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie").map(e => e.id))
              .order("week_number"),
          ]);
          setStructuredNotes((notesRes.data || []) as TrainerNote[]);
          setSessionAppointments((apptRes.data || []) as SessionAppointment[]);
        }
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWeek = async (enrollment: Enrollment, weekNumber: number) => {
    const current = enrollment.unlocked_weeks || [1];
    const updated = current.includes(weekNumber)
      ? current.filter(w => w !== weekNumber)
      : [...current, weekNumber].sort((a, b) => a - b);
    setSaving(true);
    const { error } = await supabase.from("enrollments").update({ unlocked_weeks: updated }).eq("id", enrollment.id);
    if (!error) {
      setEnrollments(prev => prev.map(e => e.id === enrollment.id ? { ...e, unlocked_weeks: updated } : e));
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
      setEnrollments(prev => prev.map(e => e.id === enrollment.id ? { ...e, visible_sections: updated } : e));
      toast.success(`${SECTION_LABELS_MAP[section]} ${updated.includes(section) ? 'zichtbaar' : 'verborgen'}`);
    } else toast.error("Kon niet opslaan");
    setSaving(false);
  };

  const saveTrainerNotesLegacy = async (regId: string) => {
    setSavingNotes(regId);
    const { error } = await supabase.from("registrations").update({ admin_notes: trainerNotes[regId] || null }).eq("id", regId);
    if (!error) toast.success("Notitie opgeslagen");
    else toast.error("Kon notitie niet opslaan");
    setSavingNotes(null);
  };

  const createEnrollmentForReg = async (regId: string) => {
    if (!newStartDate) { toast.error("Vul een startdatum in"); return; }
    setCreating(true);
    try {
      let userId: string | undefined;
      const regIds = registrations.map(r => r.id);
      if (regIds.length > 0) {
        const { data: existingEnr } = await supabase.from("enrollments").select("user_id").in("registration_id", regIds).limit(1);
        userId = existingEnr?.[0]?.user_id;
      }
      if (!userId) {
        const { data: allRegs } = await supabase.from("registrations").select("id").eq("email", email);
        if (allRegs && allRegs.length > 0) {
          const { data: existingEnr } = await supabase.from("enrollments").select("user_id").in("registration_id", allRegs.map(r => r.id)).limit(1);
          userId = existingEnr?.[0]?.user_id;
        }
      }
      if (!userId) { toast.error("Geen account gevonden. De deelnemer moet eerst een account aanmaken."); setCreating(false); return; }

      const { error } = await supabase.from("enrollments").insert({
        user_id: userId, course_type: newCourseType, start_date: newStartDate,
        trainer_name: newTrainerName || null, registration_id: regId, unlocked_weeks: [1], status: "active",
      });
      if (error) throw error;
      toast.success("Inschrijving aangemaakt!");
      setCreatingForRegId(null);
      setNewCourseType("msc_8week"); setNewStartDate(""); setNewTrainerName("");
      fetchCustomerData();
    } catch (err: any) { toast.error("Fout bij aanmaken: " + err.message); }
    setCreating(false);
  };

  const submitExtraTraining = async () => {
    if (!customer || !extraTrainingName.trim()) { toast.error("Selecteer een training"); return; }
    setSubmittingExtra(true);
    try {
      const { error } = await supabase.from("registrations").insert({
        name: customer.name, email: customer.email, phone: customer.phone || null,
        training_name: extraTrainingName.trim(), remarks: extraRemarks.trim() || null,
        status: "pending", payment_status: "pending",
      });
      if (error) throw error;
      toast.success("Extra training aangemeld!");
      setShowExtraTraining(false); setExtraTrainingName("8-weekse Mindful Zelfcompassie Training"); setExtraRemarks("");
      fetchCustomerData();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSubmittingExtra(false);
  };

  const toggleCard = (id: string) => setOpenCards(prev => ({ ...prev, [id]: !prev[id] }));

  // Global next session across all enrollments
  const getGlobalNextSession = () => {
    const today = new Date().toISOString().split("T")[0];
    return sessionAppointments
      .filter(a => a.status === "gepland" && a.session_date && a.session_date >= today)
      .sort((a, b) => (a.session_date || "").localeCompare(b.session_date || ""))[0] || null;
  };

  const getGlobalProgress = () => {
    const individualEnrollments = enrollments.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie");
    const totalSessions = individualEnrollments.reduce((sum, e) => sum + (e.course_type === "individueel_6" ? 6 : 1), 0);
    const completed = sessionAppointments.filter(a => a.status === "afgerond" && individualEnrollments.some(e => e.id === a.enrollment_id)).length;
    return { completed, total: totalSessions, percentage: totalSessions > 0 ? (completed / totalSessions) * 100 : 0 };
  };

  if (isLoading) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Klantprofiel</DialogTitle>
            <DialogDescription>Laden...</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!customer) return null;

  const globalNext = getGlobalNextSession();
  const globalProgress = getGlobalProgress();
  const hasIndividual = enrollments.some(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie");

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <DialogTitle className="text-lg">{customer.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /><a href={`mailto:${customer.email}`} className="hover:underline">{customer.email}</a></span>
                {customer.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /><a href={`tel:${customer.phone}`} className="hover:underline">{customer.phone}</a></span>}
              </DialogDescription>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5 shrink-0" onClick={() => setShowExtraTraining(true)}>
              <Plus className="h-3.5 w-3.5" /> Extra training
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Compact Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Aanmeldingen</p>
                <p className="text-lg font-semibold leading-tight">{customer.total_registrations}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Euro className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Totaal betaald</p>
                <p className="text-lg font-semibold leading-tight">€{customer.total_spent?.toLocaleString('nl-NL') || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Klant sinds</p>
                <p className="text-lg font-semibold leading-tight">{format(new Date(customer.first_registration), "MMM yyyy", { locale: nl })}</p>
              </div>
            </div>
          </div>

          {/* Global Quick Summary - only if has individual enrollments */}
          {hasIndividual && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-3 flex items-center gap-4">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">Voortgang</span>
                    <span>{globalProgress.completed} van {globalProgress.total} sessies</span>
                  </div>
                  <Progress value={globalProgress.percentage} className="h-1.5" />
                </div>
                <div className="border-l pl-4 text-sm shrink-0">
                  {globalNext?.session_date ? (
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <span>
                        <strong>{new Date(globalNext.session_date).toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" })}</strong>
                        {globalNext.session_time && ` ${globalNext.session_time.slice(0, 5)}`}
                      </span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <AlertCircle className="h-3.5 w-3.5" /> Geen sessie gepland
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Training badges */}
          <div className="flex flex-wrap gap-1.5">
            {customer.trainings?.map((training, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => {
                  const reg = registrations.find(r => r.training_name === training);
                  if (reg) {
                    setOpenCards(prev => ({ ...prev, [reg.id]: true }));
                    setTimeout(() => registrationRefs.current[reg.id]?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
                  }
                }}
              >
                {training}
              </Badge>
            ))}
          </div>

          {/* Registration Cards - Collapsible */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Trainingen & Inhoud
            </h3>

            {registrations.map((reg) => {
              const enrollment = enrollments.find(e => e.registration_id === reg.id);
              const weeks = enrollment ? courseWeeks.filter(w => w.course_type === enrollment.course_type) : [];
              const label = enrollment?.course_type === "msc_8week" ? "Week" : "Sessie";
              const isOpen = openCards[reg.id] ?? false;
              const isIndividual = enrollment && (enrollment.course_type === "individueel_6" || enrollment.course_type === "losse_sessie");

              return (
                <div key={reg.id} ref={(el) => { registrationRefs.current[reg.id] = el; }}>
                  <Collapsible open={isOpen} onOpenChange={() => toggleCard(reg.id)}>
                    <Card className="transition-all">
                      <CollapsibleTrigger className="w-full text-left">
                        <CardContent className="p-3 flex items-center gap-2">
                          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`} />
                          <span className="font-medium text-sm flex-1">{reg.training_name}</span>
                          <Badge className={`${statusColors[reg.status]} text-[10px] px-1.5 py-0`}>{reg.status}</Badge>
                          <Badge className={`${paymentStatusColors[reg.payment_status || 'pending']} text-[10px] px-1.5 py-0`}>{reg.payment_status || 'pending'}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {reg.training_date || format(new Date(reg.created_at), "d MMM yyyy", { locale: nl })}
                          </span>
                        </CardContent>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="px-4 pb-4 pt-0 space-y-4">
                          {enrollment ? (
                            <>
                              {/* Enrollment info */}
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-[10px]">{COURSE_TYPES[enrollment.course_type]}</Badge>
                                <Badge className={enrollment.status === "active" ? "bg-green-100 text-green-800 text-[10px]" : "bg-muted text-muted-foreground text-[10px]"}>{enrollment.status}</Badge>
                                <span>Start: {new Date(enrollment.start_date).toLocaleDateString("nl-NL")}</span>
                              </div>

                              {/* Session toggles */}
                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium"><Unlock className="h-3 w-3" /> {label}s vrijgeven</p>
                                <div className="flex flex-wrap gap-1">
                                  {weeks.map(week => {
                                    const isUnlocked = (enrollment.unlocked_weeks || [1]).includes(week.week_number);
                                    return (
                                      <button key={week.id} onClick={() => toggleWeek(enrollment, week.week_number)} disabled={saving}
                                        className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                                          isUnlocked ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted text-muted-foreground border border-border"
                                        }`} title={week.title}
                                      >
                                        {label} {week.week_number}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Content visibility */}
                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium"><Eye className="h-3 w-3" /> Zichtbare inhoud</p>
                                <div className="flex flex-wrap gap-3">
                                  {Object.entries(SECTION_ICONS).map(([key, Icon]) => {
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
                                <div className="border-t pt-3">
                                  <SessionPlanningSection
                                    enrollmentId={enrollment.id}
                                    courseType={enrollment.course_type}
                                    weeks={weeks}
                                    appointments={sessionAppointments.filter(a => a.enrollment_id === enrollment.id)}
                                    onAppointmentsChange={(updated) => {
                                      setSessionAppointments(prev => [
                                        ...prev.filter(a => a.enrollment_id !== enrollment.id),
                                        ...updated,
                                      ]);
                                    }}
                                  />
                                </div>
                              )}

                              {/* Intake */}
                              {isIndividual && (
                                <div className="border-t pt-3">
                                  <IntakeSection
                                    enrollment={enrollment}
                                    onUpdate={(updated) => setEnrollments(prev => prev.map(e => e.id === updated.id ? updated : e))}
                                  />
                                </div>
                              )}

                              {/* Trainer Notes */}
                              <div className="border-t pt-3">
                                <TrainerNotesSection
                                  enrollmentId={enrollment.id}
                                  existingNotes={structuredNotes.filter(n => n.enrollment_id === enrollment.id)}
                                  onNotesUpdated={(updated) => {
                                    setStructuredNotes(prev => [
                                      ...prev.filter(n => n.enrollment_id !== enrollment.id),
                                      ...updated,
                                    ]);
                                  }}
                                />
                              </div>
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

                              {/* Legacy notes */}
                              <div>
                                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><StickyNote className="h-3 w-3" /> Notitie</p>
                                <Textarea placeholder="Notities..." value={trainerNotes[reg.id] || ""} onChange={(e) => setTrainerNotes(prev => ({ ...prev, [reg.id]: e.target.value }))} className="min-h-[50px] text-sm" />
                                <Button size="sm" variant="outline" onClick={() => saveTrainerNotesLegacy(reg.id)} disabled={savingNotes === reg.id} className="gap-1.5 mt-1.5 h-7 text-xs">
                                  <Save className="h-3 w-3" /> {savingNotes === reg.id ? "Opslaan..." : "Opslaan"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>

      {/* Extra Training Dialog */}
      {showExtraTraining && customer && (
        <Dialog open onOpenChange={() => setShowExtraTraining(false)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Extra training inschrijven</DialogTitle>
              <DialogDescription>Schrijf {customer.name} in voor een nieuwe training.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-3 text-sm">
                <p><strong>{customer.name}</strong></p>
                <p className="text-muted-foreground">{customer.email}</p>
              </div>
              <div>
                <Label>Training *</Label>
                <Select value={extraTrainingName} onValueChange={setExtraTrainingName}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8-weekse Mindful Zelfcompassie Training">8-weekse Mindful Zelfcompassie Training</SelectItem>
                    <SelectItem value="Individueel Traject (6 sessies)">Individueel Traject (6 sessies)</SelectItem>
                    <SelectItem value="Losse Sessie / Coaching">Losse Sessie / Coaching</SelectItem>
                    <SelectItem value="Beweging & Mildheid Retreat">Beweging & Mildheid Retreat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Opmerkingen</Label>
                <Input value={extraRemarks} onChange={e => setExtraRemarks(e.target.value)} placeholder="Eventuele opmerkingen" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowExtraTraining(false)}>Annuleren</Button>
              <Button onClick={submitExtraTraining} disabled={submittingExtra}>
                {submittingExtra && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Inschrijven
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
