import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Loader2, CheckCircle2, Clock, FileText, Euro, Heart,
  Brain, BarChart3, Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import type { CustomerData, Registration, Enrollment, TrainerNote, SessionAppointment } from "@/components/admin/customer-profile/types";
import TherapySessionSection from "@/components/admin/customer-profile/TherapySessionSection";

import ClientHeader from "./client-profile/ClientHeader";
import PhaseStepperBar from "./client-profile/PhaseStepperBar";
import AiSummaryCard from "./client-profile/AiSummaryCard";
import IntakeSection from "./client-profile/IntakeSection";
import SessionsSection from "./client-profile/SessionsSection";
import TrainerNotesSection from "./client-profile/TrainerNotesSection";
import ScsResultsSection from "./client-profile/ScsResultsSection";
import RegistrationsList from "./client-profile/RegistrationsList";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClientRecord {
  id: string;
  source: string | null;
  phone: string | null;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ClientProfilePage() {
  const { email: rawEmail } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const email = decodeURIComponent(rawEmail || "");

  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [clientRecord, setClientRecord] = useState<ClientRecord | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [sessionAppointments, setSessionAppointments] = useState<SessionAppointment[]>([]);
  const [structuredNotes, setStructuredNotes] = useState<TrainerNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showExtraTraining, setShowExtraTraining] = useState(false);
  const [extraTrainingName, setExtraTrainingName] = useState("8-weekse Mindful Zelfcompassie Training");
  const [extraRemarks, setExtraRemarks] = useState("");
  const [submittingExtra, setSubmittingExtra] = useState(false);

  useEffect(() => { if (email) fetchData(); }, [email]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [customerRes, regRes, clientRes] = await Promise.all([
        supabase.from("customers").select("*").eq("email", email).limit(1).maybeSingle(),
        supabase.from("registrations").select("id, training_name, training_date, status, payment_status, price, created_at, admin_notes").eq("email", email).order("created_at", { ascending: false }),
        supabase.from("clients").select("id, source, phone").eq("email", email).limit(1),
      ]);

      if (customerRes.error || !customerRes.data) { setIsLoading(false); return; }
      setCustomer(customerRes.data);
      setRegistrations((regRes.data || []) as Registration[]);

      const cRecord = clientRes.data?.[0] ? (clientRes.data[0] as any as ClientRecord) : null;
      setClientRecord(cRecord);
      const cId = cRecord?.id || null;

      const regIds = (regRes.data || []).map((r: any) => r.id);
      let allEnrollments: Enrollment[] = [];
      if (regIds.length > 0 || cId) {
        const queries = [];
        if (regIds.length > 0) queries.push(supabase.from("enrollments").select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id, intake_reason, intake_theme, intake_goal, client_id, sessions_total, sessions_used, sessions_remaining").in("registration_id", regIds));
        if (cId) queries.push(supabase.from("enrollments").select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id, intake_reason, intake_theme, intake_goal, client_id, sessions_total, sessions_used, sessions_remaining").eq("client_id", cId));
        const results = await Promise.all(queries);
        const merged = new Map<string, Enrollment>();
        results.forEach(r => (r.data || []).forEach((e: any) => merged.set(e.id, e as Enrollment)));
        allEnrollments = Array.from(merged.values()).sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
      }
      setEnrollments(allEnrollments);

      const enrIds = allEnrollments.map(e => e.id);
      if (enrIds.length > 0) {
        const [notesRes, apptsRes] = await Promise.all([
          supabase.from("trainer_notes").select("id, enrollment_id, note_type, content, created_at").in("enrollment_id", enrIds).order("created_at", { ascending: false }),
          supabase.from("session_appointments").select("*").in("enrollment_id", enrIds).order("week_number"),
        ]);
        setStructuredNotes((notesRes.data || []) as TrainerNote[]);
        setSessionAppointments((apptsRes.data || []) as SessionAppointment[]);
      }
    } catch (e) {
      console.error("Error:", e);
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
      fetchData();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setSubmittingExtra(false);
  };

  // Loading state
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  // Not found
  if (!customer) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Klant niet gevonden</p>
        <Button variant="outline" onClick={() => navigate("/admin")}><ArrowLeft className="h-4 w-4 mr-2" /> Terug</Button>
      </div>
    );
  }

  const activeEnrollment = enrollments.find(e => e.status === "active");
  const completedSessions = sessionAppointments.filter(a => a.status === "afgerond").length;
  const nextSession = sessionAppointments.find(a => a.status === "gepland" && a.session_date);
  const hasIndividual = enrollments.some(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Header */}
        <ClientHeader
          customer={customer}
          enrollments={enrollments}
          clientRecord={clientRecord}
          onClientRecordChange={setClientRecord}
          onAddTraining={() => setShowExtraTraining(true)}
        />

        {/* Phase stepper */}
        <PhaseStepperBar enrollments={enrollments} />

        {/* Quick stats — compact row */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="border-border/40">
            <CardContent className="p-3 text-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
              <p className="text-lg font-bold">
                {activeEnrollment ? `${activeEnrollment.sessions_used}/${activeEnrollment.sessions_total || 6}` : completedSessions}
              </p>
              <p className="text-[10px] text-muted-foreground">Sessies</p>
              {activeEnrollment?.sessions_total && (
                <Progress value={(activeEnrollment.sessions_used / activeEnrollment.sessions_total) * 100} className="h-1 mt-1.5" />
              )}
            </CardContent>
          </Card>
          <Card className="border-border/40">
            <CardContent className="p-3 text-center">
              <Clock className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
              {nextSession?.session_date ? (
                <>
                  <p className="text-sm font-semibold">{format(new Date(nextSession.session_date), "d MMM", { locale: nl })}</p>
                  {nextSession.session_time && <p className="text-[10px] text-muted-foreground">{nextSession.session_time.slice(0, 5)}</p>}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">—</p>
              )}
              <p className="text-[10px] text-muted-foreground mt-0.5">Volgende sessie</p>
            </CardContent>
          </Card>
          <Card className="border-border/40">
            <CardContent className="p-3 text-center">
              <FileText className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
              <p className="text-lg font-bold">{structuredNotes.length}</p>
              <p className="text-[10px] text-muted-foreground">Notities</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Summary */}
        <AiSummaryCard email={customer.email} />

        {/* Tabs */}
        <Tabs defaultValue="dossier" className="w-full">
          <TabsList className="h-9 w-full justify-start rounded-xl bg-secondary/60 p-1">
            <TabsTrigger value="dossier" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <FileText className="h-3.5 w-3.5" /> Dossier
            </TabsTrigger>
            <TabsTrigger value="sessies" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Calendar className="h-3.5 w-3.5" /> Sessies
              {sessionAppointments.length > 0 && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 ml-0.5">{sessionAppointments.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="notities" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <FileText className="h-3.5 w-3.5" /> Notities
              {structuredNotes.length > 0 && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 ml-0.5">{structuredNotes.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="financieel" className="gap-1.5 text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Euro className="h-3.5 w-3.5" /> Financieel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dossier" className="mt-4 space-y-5">
            {enrollments.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold flex items-center gap-1.5 mb-2 text-muted-foreground uppercase tracking-wider">
                  <Heart className="h-3.5 w-3.5 text-primary" /> Intake
                </h3>
                <IntakeSection enrollmentId={enrollments[0].id} />
              </div>
            )}

            {hasIndividual && enrollments.filter(e => e.course_type === "individueel_6" || e.course_type === "losse_sessie").map(enr => (
              <div key={enr.id}>
                <h3 className="text-xs font-semibold flex items-center gap-1.5 mb-2 text-muted-foreground uppercase tracking-wider">
                  <Brain className="h-3.5 w-3.5 text-primary" /> Sessieverslagen (AI)
                </h3>
                <TherapySessionSection enrollmentId={enr.id} clientName={customer.name || undefined} />
              </div>
            ))}

            {enrollments.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold flex items-center gap-1.5 mb-2 text-muted-foreground uppercase tracking-wider">
                  <BarChart3 className="h-3.5 w-3.5 text-primary" /> SCS Vragenlijst
                </h3>
                <ScsResultsSection enrollmentIds={enrollments.map(e => e.id)} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="sessies" className="mt-4">
            <SessionsSection sessionAppointments={sessionAppointments} enrollments={enrollments} onUpdate={fetchData} />
          </TabsContent>

          <TabsContent value="notities" className="mt-4">
            <TrainerNotesSection enrollments={enrollments} notes={structuredNotes} onNotesChange={setStructuredNotes} />
          </TabsContent>

          <TabsContent value="financieel" className="mt-4">
            <RegistrationsList registrations={registrations} />
          </TabsContent>
        </Tabs>
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
              <div className="rounded-xl bg-secondary p-3 text-sm">
                <p className="font-medium">{customer.name}</p>
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowExtraTraining(false)}>Annuleren</Button>
              <Button onClick={submitExtraTraining} disabled={submittingExtra}>
                {submittingExtra && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Inschrijven
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
