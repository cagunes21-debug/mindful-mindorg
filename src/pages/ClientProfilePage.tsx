import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, FileText, Heart, BarChart3, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import type { CustomerData, Registration, Enrollment, TrainerNote, SessionAppointment } from "@/components/admin/customer-profile/types";

import ClientHeader from "./client-profile/ClientHeader";
import IntakeSection from "./client-profile/IntakeSection";
import TrainerNotesSection from "./client-profile/TrainerNotesSection";
import SessionsSection from "./client-profile/SessionsSection";
import ScsResultsSection from "./client-profile/ScsResultsSection";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClientRecord {
  id: string;
  source: string | null;
  phone: string | null;
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = [
  { key: "intake", label: "Intake", icon: Heart, gradient: "from-terracotta-500 to-terracotta-600", lightBg: "bg-terracotta-50", lightBorder: "border-terracotta-200", lightText: "text-terracotta-600" },
  { key: "sessies", label: "Sessies", icon: CalendarDays, gradient: "from-sage-500 to-sage-600", lightBg: "bg-sage-50", lightBorder: "border-sage-200", lightText: "text-sage-600" },
  { key: "notities", label: "Notities", icon: FileText, gradient: "from-warm-500 to-warm-600", lightBg: "bg-warm-50", lightBorder: "border-warm-200", lightText: "text-warm-600" },
  { key: "scs", label: "SCS", icon: BarChart3, gradient: "from-primary to-primary/80", lightBg: "bg-primary/5", lightBorder: "border-primary/20", lightText: "text-primary" },
] as const;

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
  const [activeTab, setActiveTab] = useState("intake");

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
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-50 to-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-terracotta-400" />
          <p className="text-sm text-muted-foreground">Profiel laden…</p>
        </div>
      </div>
    );
  }

  // Not found
  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-50 to-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Klant niet gevonden</p>
        <Button variant="outline" onClick={() => navigate("/admin")}><ArrowLeft className="h-4 w-4 mr-2" /> Terug</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50/80 via-background to-background">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <ClientHeader
          customer={customer}
          enrollments={enrollments}
          clientRecord={clientRecord}
          onClientRecordChange={setClientRecord}
          onAddTraining={() => setShowExtraTraining(true)}
        />

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-2">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            const count = tab.key === "notities" ? structuredNotes.length : tab.key === "sessies" ? sessionAppointments.length : undefined;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-br ${tab.gradient} text-white border-transparent shadow-lg shadow-black/5`
                    : `${tab.lightBg} ${tab.lightBorder} ${tab.lightText} border hover:shadow-sm hover:scale-[1.02]`
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-semibold">{tab.label}</span>
                {count !== undefined && count > 0 && (
                  <span className={`absolute -top-1 -right-1 h-5 min-w-5 rounded-full text-[10px] font-bold flex items-center justify-center px-1 ${
                    isActive ? "bg-white text-foreground" : "bg-foreground text-background"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "intake" && (
            enrollments.length > 0 ? (
              <IntakeSection enrollmentId={enrollments[0].id} />
            ) : (
              <div className="rounded-2xl border border-dashed border-border/60 p-10 text-center">
                <Heart className="h-8 w-8 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">Geen traject gevonden om intake voor in te vullen.</p>
              </div>
            )
          )}

          {activeTab === "sessies" && (
            <SessionsSection sessionAppointments={sessionAppointments} enrollments={enrollments} onUpdate={fetchData} />
          )}

          {activeTab === "notities" && (
            <TrainerNotesSection enrollments={enrollments} notes={structuredNotes} onNotesChange={setStructuredNotes} />
          )}

          {activeTab === "scs" && (
            <ScsResultsSection enrollmentIds={enrollments.map(e => e.id)} />
          )}
        </div>
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
              <div className="rounded-xl bg-gradient-to-r from-warm-50 to-terracotta-50 border border-warm-200 p-3 text-sm">
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
              <Button onClick={submitExtraTraining} disabled={submittingExtra} className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white">
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
