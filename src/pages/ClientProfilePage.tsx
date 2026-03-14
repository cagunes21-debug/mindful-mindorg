import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft, Plus, Loader2,
} from "lucide-react";
import { toast } from "sonner";

import OverviewTab from "@/components/admin/customer-profile/OverviewTab";
import TrainingsTab from "@/components/admin/customer-profile/TrainingsTab";
import SessionsTab from "@/components/admin/customer-profile/SessionsTab";
import QuestionnairesTab from "@/components/admin/customer-profile/QuestionnairesTab";
import NotesTab from "@/components/admin/customer-profile/NotesTab";
import PaymentsTab from "@/components/admin/customer-profile/PaymentsTab";
import IntakeFormSection from "@/components/admin/customer-profile/IntakeFormSection";
import {
  type CustomerData, type Registration, type Enrollment, type TrainerNote,
  type CourseWeek, type SessionAppointment,
} from "@/components/admin/customer-profile/types";

// Reuse DocumentsTab and EmailHistoryTab from CustomerProfile
// We inline minimal versions here to avoid circular deps

function DocumentsTab({ clientId }: { clientId: string }) {
  return (
    <div className="text-center py-10 text-sm text-muted-foreground">
      Documenten worden geladen vanuit het klantprofiel.
    </div>
  );
}

export default function ClientProfilePage() {
  const { email: rawEmail } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const email = decodeURIComponent(rawEmail || "");

  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courseWeeks, setCourseWeeks] = useState<CourseWeek[]>([]);
  const [sessionAppointments, setSessionAppointments] = useState<SessionAppointment[]>([]);
  const [structuredNotes, setStructuredNotes] = useState<TrainerNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});
  const registrationRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [showExtraTraining, setShowExtraTraining] = useState(false);
  const [extraTrainingName, setExtraTrainingName] = useState("8-weekse Mindful Zelfcompassie Training");
  const [extraRemarks, setExtraRemarks] = useState("");
  const [submittingExtra, setSubmittingExtra] = useState(false);

  useEffect(() => { if (email) fetchCustomerData(); }, [email]);

  const fetchCustomerData = async () => {
    setIsLoading(true);
    try {
      const [customerRes, regRes, weeksRes, clientRes] = await Promise.all([
        supabase.from("customers").select("*").eq("email", email).limit(1).maybeSingle(),
        supabase.from("registrations").select("id, training_name, training_date, status, payment_status, price, created_at, admin_notes").eq("email", email).order("created_at", { ascending: false }),
        supabase.from("course_weeks").select("id, week_number, title, course_type").order("week_number"),
        supabase.from("clients").select("id").eq("email", email).limit(1),
      ]);

      if (customerRes.error || !customerRes.data) {
        setIsLoading(false);
        return;
      }
      setCustomer(customerRes.data);
      const regs = (regRes.data || []) as Registration[];
      setRegistrations(regs);
      setCourseWeeks((weeksRes.data || []) as CourseWeek[]);
      if (regs.length > 0) setOpenCards({ [regs[0].id]: true });

      const cId = clientRes.data?.[0]?.id || null;
      setClientId(cId);

      const regIds = regs.map(r => r.id);
      let allEnrollments: Enrollment[] = [];
      if (regIds.length > 0 || cId) {
        const queries = [];
        if (regIds.length > 0) queries.push(supabase.from("enrollments").select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id, intake_reason, intake_theme, intake_goal, client_id, sessions_total, sessions_used, sessions_remaining").in("registration_id", regIds));
        if (cId) queries.push(supabase.from("enrollments").select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id, intake_reason, intake_theme, intake_goal, client_id, sessions_total, sessions_used, sessions_remaining").eq("client_id", cId));
        const results = await Promise.all(queries);
        const mergedMap = new Map<string, Enrollment>();
        results.forEach(res => (res.data || []).forEach((e: any) => mergedMap.set(e.id, e as Enrollment)));
        allEnrollments = Array.from(mergedMap.values()).sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
      }
      setEnrollments(allEnrollments);

      const allEnrIds = allEnrollments.map(e => e.id);
      if (allEnrIds.length > 0) {
        const [notesRes, apptRes] = await Promise.all([
          supabase.from("trainer_notes").select("id, enrollment_id, note_type, content").in("enrollment_id", allEnrIds),
          supabase.from("session_appointments").select("*").in("enrollment_id", allEnrollments.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie").map(e => e.id)).order("week_number"),
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
      setShowExtraTraining(false);
      setExtraTrainingName("8-weekse Mindful Zelfcompassie Training");
      setExtraRemarks("");
      fetchCustomerData();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSubmittingExtra(false);
  };

  const handleTrainingClick = (training: string) => {
    const reg = registrations.find(r => r.training_name === training);
    if (reg) {
      setOpenCards(prev => ({ ...prev, [reg.id]: true }));
      setTimeout(() => registrationRefs.current[reg.id]?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Klant niet gevonden</p>
        <Button variant="outline" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Terug naar admin
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" /> Terug
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{customer.name}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-3">
              <span>{customer.email}</span>
              {customer.phone && <span>{customer.phone}</span>}
            </p>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5 shrink-0" onClick={() => setShowExtraTraining(true)}>
            <Plus className="h-3.5 w-3.5" /> Extra training
          </Button>
        </div>

        {/* Overzicht */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Overzicht</h2>
          <OverviewTab
            customer={customer} enrollments={enrollments} registrations={registrations}
            sessionAppointments={sessionAppointments} structuredNotes={structuredNotes}
            onTrainingClick={handleTrainingClick} onTabChange={() => {}}
            clientId={clientId} onRefresh={fetchCustomerData}
          />
        </section>

        {/* Trainingen */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Trainingen</h2>
          <TrainingsTab
            customer={{ name: customer.name, email: customer.email, phone: customer.phone }}
            registrations={registrations} enrollments={enrollments} courseWeeks={courseWeeks}
            sessionAppointments={sessionAppointments} structuredNotes={structuredNotes}
            onEnrollmentsChange={setEnrollments} onSessionAppointmentsChange={setSessionAppointments}
            onStructuredNotesChange={setStructuredNotes} onRefresh={fetchCustomerData}
            registrationRefs={registrationRefs} openCards={openCards}
            onToggleCard={(id) => setOpenCards(prev => ({ ...prev, [id]: !prev[id] }))}
          />
        </section>

        {/* Sessies */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Sessies</h2>
          <SessionsTab enrollments={enrollments} sessionAppointments={sessionAppointments} onEnrollmentsChange={setEnrollments} />
        </section>

        {/* Vragenlijsten */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Vragenlijsten</h2>
          <QuestionnairesTab enrollments={enrollments} />
        </section>

        {/* Notities */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Notities</h2>
          <NotesTab
            customer={{ name: customer.name }} registrations={registrations}
            enrollments={enrollments} structuredNotes={structuredNotes}
            onStructuredNotesChange={setStructuredNotes}
          />
        </section>

        {/* Betalingen */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Betalingen</h2>
          <PaymentsTab customerEmail={customer.email} />
        </section>
      </div>

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
                {submittingExtra && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Inschrijven
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
