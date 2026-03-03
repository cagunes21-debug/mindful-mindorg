import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Calendar, Euro, ShoppingBag, ArrowLeft, BookOpen, Headphones, ClipboardList, Presentation, FileText, Save, StickyNote, Eye, EyeOff, Lock, Unlock, Plus, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";

interface CustomerProfileProps {
  email: string;
  onClose: () => void;
}

interface CustomerData {
  email: string;
  name: string;
  phone: string | null;
  total_registrations: number;
  paid_registrations: number;
  total_spent: number;
  first_registration: string;
  last_registration: string;
  trainings: string[];
}

interface Registration {
  id: string;
  training_name: string;
  training_date: string | null;
  status: string;
  payment_status: string | null;
  price: string | null;
  created_at: string;
  admin_notes: string | null;
}

interface Enrollment {
  id: string;
  course_type: string;
  start_date: string;
  status: string;
  unlocked_weeks: number[];
  visible_sections: string[];
  trainer_name: string | null;
  registration_id: string | null;
}

interface CourseWeek {
  id: string;
  week_number: number;
  title: string;
  course_type: string;
}

const COURSE_TYPES: Record<string, string> = {
  msc_8week: "8-weekse Groepstraining",
  individueel_6: "Individueel (6 sessies)",
  losse_sessie: "Losse Sessie",
};

const SECTION_LABELS: Record<string, { label: string; icon: typeof Headphones }> = {
  meditations: { label: "Meditaties", icon: Headphones },
  assignments: { label: "Opdrachten", icon: ClipboardList },
  presentations: { label: "Presentaties", icon: Presentation },
  notebooks: { label: "Werkboek", icon: FileText },
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  awaiting_payment: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
};

export default function CustomerProfile({ email, onClose }: CustomerProfileProps) {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courseWeeks, setCourseWeeks] = useState<CourseWeek[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [trainerNotes, setTrainerNotes] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);
  const [activeTraining, setActiveTraining] = useState<string | null>(null);
  const registrationRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Create enrollment state
  const [creatingForRegId, setCreatingForRegId] = useState<string | null>(null);
  const [newCourseType, setNewCourseType] = useState("msc_8week");
  const [newStartDate, setNewStartDate] = useState("");
  const [newTrainerName, setNewTrainerName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchCustomerData();
  }, [email]);

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

      const regIds = regs.map(r => r.id);
      if (regIds.length > 0) {
        const { data: enrollData } = await supabase
          .from("enrollments")
          .select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id")
          .in("registration_id", regIds)
          .order("created_at", { ascending: false });
        setEnrollments((enrollData || []) as Enrollment[]);
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
    const { error } = await supabase
      .from("enrollments")
      .update({ unlocked_weeks: updated })
      .eq("id", enrollment.id);

    if (!error) {
      setEnrollments(prev => prev.map(e => e.id === enrollment.id ? { ...e, unlocked_weeks: updated } : e));
      toast.success(`Sessie ${weekNumber} ${updated.includes(weekNumber) ? 'vrijgegeven' : 'vergrendeld'}`);
    } else {
      toast.error("Kon niet opslaan");
    }
    setSaving(false);
  };

  const toggleSection = async (enrollment: Enrollment, section: string) => {
    const current = enrollment.visible_sections || ['meditations', 'assignments', 'presentations', 'notebooks'];
    const updated = current.includes(section)
      ? current.filter(s => s !== section)
      : [...current, section];

    setSaving(true);
    const { error } = await supabase
      .from("enrollments")
      .update({ visible_sections: updated })
      .eq("id", enrollment.id);

    if (!error) {
      setEnrollments(prev => prev.map(e => e.id === enrollment.id ? { ...e, visible_sections: updated } : e));
      toast.success(`${SECTION_LABELS[section]?.label} ${updated.includes(section) ? 'zichtbaar' : 'verborgen'}`);
    } else {
      toast.error("Kon niet opslaan");
    }
    setSaving(false);
  };

  const saveTrainerNotes = async (regId: string) => {
    setSavingNotes(regId);
    const { error } = await supabase
      .from("registrations")
      .update({ admin_notes: trainerNotes[regId] || null })
      .eq("id", regId);

    if (!error) {
      toast.success("Notitie opgeslagen");
    } else {
      toast.error("Kon notitie niet opslaan");
    }
    setSavingNotes(null);
  };

  const scrollToRegistration = (trainingName: string) => {
    setActiveTraining(trainingName);
    // Find first registration matching this training
    const reg = registrations.find(r => r.training_name === trainingName);
    if (reg && registrationRefs.current[reg.id]) {
      registrationRefs.current[reg.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const getEnrollmentForRegistration = (regId: string) => {
    return enrollments.find(e => e.registration_id === regId);
  };

  const createEnrollmentForReg = async (regId: string) => {
    if (!newStartDate) { toast.error("Vul een startdatum in"); return; }
    setCreating(true);
    try {
      // Find user_id from existing enrollments for this customer
      let userId: string | undefined;
      
      // Check existing enrollments linked to any registration of this customer
      const regIds = registrations.map(r => r.id);
      if (regIds.length > 0) {
        const { data: existingEnr } = await supabase
          .from("enrollments")
          .select("user_id")
          .in("registration_id", regIds)
          .limit(1);
        userId = existingEnr?.[0]?.user_id;
      }

      if (!userId) {
        // Try finding by email in all registrations
        const { data: allRegs } = await supabase.from("registrations").select("id").eq("email", email);
        if (allRegs && allRegs.length > 0) {
          const { data: existingEnr } = await supabase
            .from("enrollments")
            .select("user_id")
            .in("registration_id", allRegs.map(r => r.id))
            .limit(1);
          userId = existingEnr?.[0]?.user_id;
        }
      }

      if (!userId) {
        toast.error("Geen account gevonden. De deelnemer moet eerst een account aanmaken.");
        setCreating(false);
        return;
      }

      const { error } = await supabase.from("enrollments").insert({
        user_id: userId,
        course_type: newCourseType,
        start_date: newStartDate,
        trainer_name: newTrainerName || null,
        registration_id: regId,
        unlocked_weeks: [1],
        status: "active",
      });
      if (error) throw error;

      toast.success("Inschrijving aangemaakt!");
      setCreatingForRegId(null);
      setNewCourseType("msc_8week");
      setNewStartDate("");
      setNewTrainerName("");
      fetchCustomerData();
    } catch (err: any) {
      toast.error("Fout bij aanmaken: " + err.message);
    }
    setCreating(false);
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta-600" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!customer) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <DialogTitle>Klantprofiel</DialogTitle>
              <DialogDescription>{customer.name} — {customer.email}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${customer.email}`} className="text-terracotta-600 hover:underline">{customer.email}</a>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${customer.phone}`} className="text-terracotta-600 hover:underline">{customer.phone}</a>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-sage-600" />
                  <span className="text-sm text-muted-foreground">Aanmeldingen</span>
                </div>
                <p className="text-2xl font-semibold mt-1">{customer.total_registrations}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-terracotta-600" />
                  <span className="text-sm text-muted-foreground">Totaal betaald</span>
                </div>
                <p className="text-2xl font-semibold mt-1">€{customer.total_spent?.toLocaleString('nl-NL') || 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-sage-600" />
                  <span className="text-sm text-muted-foreground">Klant sinds</span>
                </div>
                <p className="text-lg font-semibold mt-1">
                  {format(new Date(customer.first_registration), "MMM yyyy", { locale: nl })}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Clickable Trainings */}
          <div>
            <h3 className="font-medium mb-3">Gevolgde trainingen</h3>
            <div className="flex flex-wrap gap-2">
              {customer.trainings?.map((training, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className={`cursor-pointer transition-colors ${
                    activeTraining === training
                      ? "bg-primary/20 text-primary border-primary/30 ring-2 ring-primary/20"
                      : "bg-sage-100 text-sage-800 hover:bg-sage-200"
                  }`}
                  onClick={() => scrollToRegistration(training)}
                >
                  {training}
                </Badge>
              ))}
            </div>
          </div>

          {/* Inhoud beheren per training */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Inhoud & Toegang beheren
            </h3>

            {registrations.length === 0 ? (
              <p className="text-sm text-muted-foreground">Geen aanmeldingen gevonden.</p>
            ) : (
              <div className="space-y-4">
                {registrations.map((reg) => {
                  const enrollment = getEnrollmentForRegistration(reg.id);
                  const weeks = enrollment ? courseWeeks.filter(w => w.course_type === enrollment.course_type) : [];
                  const label = enrollment?.course_type === "msc_8week" ? "Week" : "Sessie";

                  return (
                    <div
                      key={reg.id}
                      ref={(el) => { registrationRefs.current[reg.id] = el; }}
                    >
                      <Card className={`transition-all ${activeTraining === reg.training_name ? "ring-2 ring-primary/30 shadow-md" : ""}`}>
                        <CardContent className="p-4 space-y-3">
                          {/* Training header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm">{reg.training_name}</span>
                              <Badge className={statusColors[reg.status]}>{reg.status}</Badge>
                              <Badge className={paymentStatusColors[reg.payment_status || 'pending']}>
                                {reg.payment_status || 'pending'}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {reg.training_date || format(new Date(reg.created_at), "d MMM yyyy", { locale: nl })}
                            </span>
                          </div>

                          {enrollment ? (
                            <>
                              {/* Enrollment status */}
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {COURSE_TYPES[enrollment.course_type] || enrollment.course_type}
                                </Badge>
                                <Badge className={enrollment.status === "active" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}>
                                  {enrollment.status}
                                </Badge>
                                <span>Start: {new Date(enrollment.start_date).toLocaleDateString("nl-NL")}</span>
                              </div>

                              {/* Session toggles */}
                              <div className="border-t pt-3">
                                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                  <Unlock className="h-3 w-3" /> Sessies vrijgeven:
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {weeks.map(week => {
                                    const isUnlocked = (enrollment.unlocked_weeks || [1]).includes(week.week_number);
                                    return (
                                      <button
                                        key={week.id}
                                        onClick={() => toggleWeek(enrollment, week.week_number)}
                                        disabled={saving}
                                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                                          isUnlocked
                                            ? "bg-primary/10 text-primary border border-primary/30"
                                            : "bg-muted text-muted-foreground border border-border"
                                        }`}
                                        title={week.title}
                                      >
                                        {label} {week.week_number}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Content visibility */}
                              <div className="border-t pt-3">
                                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                  <Eye className="h-3 w-3" /> Zichtbare inhoud:
                                </p>
                                <div className="flex flex-wrap gap-3">
                                  {Object.entries(SECTION_LABELS).map(([key, { label: sectionLabel, icon: Icon }]) => {
                                    const isVisible = (enrollment.visible_sections || ['meditations', 'assignments', 'presentations', 'notebooks']).includes(key);
                                    return (
                                      <label key={key} className="flex items-center gap-1.5 cursor-pointer">
                                        <Checkbox
                                          checked={isVisible}
                                          disabled={saving}
                                          onCheckedChange={() => toggleSection(enrollment, key)}
                                        />
                                        <Icon className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-xs">{sectionLabel}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="border-t pt-3 space-y-3">
                              {creatingForRegId === reg.id ? (
                                <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                                  <p className="text-xs font-medium">Nieuwe inschrijving aanmaken</p>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <Label className="text-xs">Programma</Label>
                                      <Select value={newCourseType} onValueChange={setNewCourseType}>
                                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                          {Object.entries(COURSE_TYPES).map(([key, label]) => (
                                            <SelectItem key={key} value={key}>{label}</SelectItem>
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
                                      {creating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
                                      Aanmaken
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => setCreatingForRegId(null)} className="text-xs">
                                      Annuleren
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Lock className="h-3 w-3 text-muted-foreground" />
                                  <p className="text-xs text-muted-foreground flex-1">Geen inschrijving gekoppeld</p>
                                  <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7" onClick={() => setCreatingForRegId(reg.id)}>
                                    <Plus className="h-3 w-3" />Inschrijving aanmaken
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Trainer notes */}
                          <div className="border-t pt-3">
                            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                              <StickyNote className="h-3 w-3" /> Trainernotitie:
                            </p>
                            <Textarea
                              placeholder="Notities over deze deelnemer..."
                              value={trainerNotes[reg.id] || ""}
                              onChange={(e) => setTrainerNotes(prev => ({ ...prev, [reg.id]: e.target.value }))}
                              className="min-h-[60px] text-sm"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => saveTrainerNotes(reg.id)}
                              disabled={savingNotes === reg.id}
                              className="gap-1.5 mt-2"
                            >
                              <Save className="h-3.5 w-3.5" />
                              {savingNotes === reg.id ? "Opslaan..." : "Opslaan"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
