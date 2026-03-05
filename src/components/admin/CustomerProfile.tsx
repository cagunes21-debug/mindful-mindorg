import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft, Plus, Loader2, BookOpen, LayoutDashboard, Calendar,
  ClipboardList, MessageSquare, Euro,
} from "lucide-react";
import { toast } from "sonner";

import OverviewTab from "./customer-profile/OverviewTab";
import TrainingsTab from "./customer-profile/TrainingsTab";
import SessionsTab from "./customer-profile/SessionsTab";
import QuestionnairesTab from "./customer-profile/QuestionnairesTab";
import NotesTab from "./customer-profile/NotesTab";
import PaymentsTab from "./customer-profile/PaymentsTab";
import {
  type CustomerData, type Registration, type Enrollment, type TrainerNote,
  type CourseWeek, type SessionAppointment,
} from "./customer-profile/types";

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
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("overview");
  const registrationRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Extra training state
  const [showExtraTraining, setShowExtraTraining] = useState(false);
  const [extraTrainingName, setExtraTrainingName] = useState("8-weekse Mindful Zelfcompassie Training");
  const [extraRemarks, setExtraRemarks] = useState("");
  const [submittingExtra, setSubmittingExtra] = useState(false);

  useEffect(() => { fetchCustomerData(); }, [email]);

  const fetchCustomerData = async () => {
    setIsLoading(true);
    try {
      const [customerRes, regRes, weeksRes, clientRes] = await Promise.all([
        supabase.from("customers").select("*").eq("email", email).single(),
        supabase.from("registrations").select("id, training_name, training_date, status, payment_status, price, created_at, admin_notes").eq("email", email).order("created_at", { ascending: false }),
        supabase.from("course_weeks").select("id, week_number, title, course_type").order("week_number"),
        supabase.from("clients").select("id").eq("email", email).limit(1),
      ]);
      if (customerRes.error) throw customerRes.error;
      setCustomer(customerRes.data);
      const regs = (regRes.data || []) as Registration[];
      setRegistrations(regs);
      setCourseWeeks((weeksRes.data || []) as CourseWeek[]);
      if (regs.length > 0) setOpenCards({ [regs[0].id]: true });

      // Fetch enrollments via registration_id AND client_id
      const regIds = regs.map(r => r.id);
      const clientId = clientRes.data?.[0]?.id;
      let allEnrollments: Enrollment[] = [];

      if (regIds.length > 0 || clientId) {
        const queries = [];
        if (regIds.length > 0) {
          queries.push(
            supabase.from("enrollments")
              .select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id, intake_reason, intake_theme, intake_goal, client_id, sessions_total, sessions_used, sessions_remaining")
              .in("registration_id", regIds)
          );
        }
        if (clientId) {
          queries.push(
            supabase.from("enrollments")
              .select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id, intake_reason, intake_theme, intake_goal, client_id, sessions_total, sessions_used, sessions_remaining")
              .eq("client_id", clientId)
          );
        }
        const results = await Promise.all(queries);
        const mergedMap = new Map<string, Enrollment>();
        results.forEach(res => {
          (res.data || []).forEach((e: any) => mergedMap.set(e.id, e as Enrollment));
        });
        allEnrollments = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );
      }
      setEnrollments(allEnrollments);

      const allEnrIds = allEnrollments.map(e => e.id);
      if (allEnrIds.length > 0) {
        const [notesRes, apptRes] = await Promise.all([
          supabase.from("trainer_notes").select("id, enrollment_id, note_type, content").in("enrollment_id", allEnrIds),
          supabase.from("session_appointments").select("*")
            .in("enrollment_id", allEnrollments.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie").map(e => e.id))
            .order("week_number"),
        ]);
        setStructuredNotes((notesRes.data || []) as TrainerNote[]);
        setSessionAppointments((apptRes.data || []) as SessionAppointment[]);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
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

  const handleTrainingClick = (training: string) => {
    setActiveTab("trainings");
    setTimeout(() => {
      const reg = registrations.find(r => r.training_name === training);
      if (reg) {
        setOpenCards(prev => ({ ...prev, [reg.id]: true }));
        setTimeout(() => registrationRefs.current[reg.id]?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-3xl">
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

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="mr-1">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <DialogTitle className="text-lg">{customer.name}</DialogTitle>
              <DialogDescription className="text-xs">Volledig klantprofiel</DialogDescription>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5 shrink-0" onClick={() => setShowExtraTraining(true)}>
              <Plus className="h-3.5 w-3.5" /> Extra training
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="w-full grid grid-cols-6 h-9">
            <TabsTrigger value="overview" className="text-xs gap-1"><LayoutDashboard className="h-3 w-3" /> Overzicht</TabsTrigger>
            <TabsTrigger value="trainings" className="text-xs gap-1"><BookOpen className="h-3 w-3" /> Trainingen</TabsTrigger>
            <TabsTrigger value="sessions" className="text-xs gap-1"><Calendar className="h-3 w-3" /> Sessies</TabsTrigger>
            <TabsTrigger value="questionnaires" className="text-xs gap-1"><ClipboardList className="h-3 w-3" /> Vragenlijsten</TabsTrigger>
            <TabsTrigger value="notes" className="text-xs gap-1"><MessageSquare className="h-3 w-3" /> Notities</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs gap-1"><Euro className="h-3 w-3" /> Betalingen</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <OverviewTab
              customer={customer}
              enrollments={enrollments}
              registrations={registrations}
              sessionAppointments={sessionAppointments}
              structuredNotes={structuredNotes}
              onTrainingClick={handleTrainingClick}
              onTabChange={setActiveTab}
            />
          </TabsContent>

          <TabsContent value="trainings" className="mt-4">
            <TrainingsTab
              customer={{ name: customer.name, email: customer.email, phone: customer.phone }}
              registrations={registrations}
              enrollments={enrollments}
              courseWeeks={courseWeeks}
              sessionAppointments={sessionAppointments}
              structuredNotes={structuredNotes}
              onEnrollmentsChange={setEnrollments}
              onSessionAppointmentsChange={setSessionAppointments}
              onStructuredNotesChange={setStructuredNotes}
              onRefresh={fetchCustomerData}
              registrationRefs={registrationRefs}
              openCards={openCards}
              onToggleCard={(id) => setOpenCards(prev => ({ ...prev, [id]: !prev[id] }))}
            />
          </TabsContent>

          <TabsContent value="sessions" className="mt-4">
            <SessionsTab
              enrollments={enrollments}
              sessionAppointments={sessionAppointments}
              onEnrollmentsChange={setEnrollments}
            />
          </TabsContent>

          <TabsContent value="questionnaires" className="mt-4">
            <QuestionnairesTab enrollments={enrollments} />
          </TabsContent>

          <TabsContent value="notes" className="mt-4">
            <NotesTab
              customer={{ name: customer.name }}
              registrations={registrations}
              enrollments={enrollments}
              structuredNotes={structuredNotes}
              onStructuredNotesChange={setStructuredNotes}
            />
          </TabsContent>

          <TabsContent value="payments" className="mt-4">
            <PaymentsTab customerEmail={customer.email} />
          </TabsContent>
        </Tabs>
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
