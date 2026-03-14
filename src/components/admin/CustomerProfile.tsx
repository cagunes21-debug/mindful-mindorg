// src/components/admin/CustomerProfile.tsx
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft, Plus, Loader2, BookOpen, LayoutDashboard, Calendar,
  ClipboardList, MessageSquare, Euro, FileText, Mail, Upload,
  Download, Trash2, ExternalLink, Send, Clock, CheckCircle2, AlertCircle,
  Paperclip, Eye,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

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

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomerProfileProps {
  email: string;
  onClose: () => void;
}

interface ClientDocument {
  id: string;
  client_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  uploaded_at: string;
  notes: string | null;
}

interface EmailLog {
  id: string;
  client_id: string;
  subject: string;
  body_preview: string | null;
  sent_at: string;
  status: string;
  email_type: string;
}

// ─── Documents Tab ────────────────────────────────────────────────────────────

function DocumentsTab({ clientId, clientName }: { clientId: string; clientName: string }) {
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [docNotes, setDocNotes] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchDocs(); }, [clientId]);

  const fetchDocs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("client_documents" as any)
      .select("*")
      .eq("client_id", clientId)
      .order("uploaded_at", { ascending: false });
    setDocuments((data || []) as unknown as ClientDocument[]);
    setLoading(false);
  };

  const handleUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${clientId}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("client-documents")
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("client_documents" as any).insert({
        client_id: clientId,
        name: file.name,
        file_path: path,
        file_type: file.type || ext || "unknown",
        file_size: file.size,
        notes: docNotes.trim() || null,
      });
      if (dbError) throw dbError;
      toast.success("Document geüpload!");
      setDocNotes("");
      fetchDocs();
    } catch (err: any) {
      toast.error("Upload mislukt: " + err.message);
    }
    setUploading(false);
  };

  const handleDelete = async (doc: ClientDocument) => {
    if (!confirm(`Verwijder "${doc.name}"?`)) return;
    await supabase.storage.from("client-documents").remove([doc.file_path]);
    await supabase.from("client_documents").delete().eq("id", doc.id);
    setDocuments(prev => prev.filter(d => d.id !== doc.id));
    toast.success("Document verwijderd");
  };

  const handleDownload = async (doc: ClientDocument) => {
    const { data } = await supabase.storage
      .from("client-documents")
      .createSignedUrl(doc.file_path, 3600);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
    else toast.error("Kon download link niet genereren");
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("image")) return "🖼️";
    if (type.includes("word") || type.includes("doc")) return "📝";
    if (type.includes("sheet") || type.includes("excel")) return "📊";
    return "📎";
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <Card className="border-dashed border-2 border-warm-200 bg-warm-50/30">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-medium flex items-center gap-2">
            <Upload className="h-4 w-4 text-muted-foreground" /> Document uploaden
          </p>
          <Input
            placeholder="Optionele notitie bij dit document..."
            value={docNotes}
            onChange={e => setDocNotes(e.target.value)}
            className="text-sm"
          />
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
            />
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
              {uploading ? "Uploaden..." : "Bestand kiezen"}
            </Button>
            <span className="text-xs text-muted-foreground">PDF, Word, Excel, afbeeldingen</span>
          </div>
        </CardContent>
      </Card>

      {/* Documents list */}
      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : documents.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground text-sm">
          Nog geen documenten voor {clientName}.
        </div>
      ) : (
        <Card className="border-warm-200">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Document</TableHead>
                  <TableHead className="text-xs">Grootte</TableHead>
                  <TableHead className="text-xs">Geüpload</TableHead>
                  <TableHead className="text-xs">Notitie</TableHead>
                  <TableHead className="text-xs text-right">Acties</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map(doc => (
                  <TableRow key={doc.id}>
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{getFileIcon(doc.file_type)}</span>
                        <span className="text-sm font-medium truncate max-w-[200px]">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 text-xs text-muted-foreground">{formatSize(doc.file_size)}</TableCell>
                    <TableCell className="py-2 text-xs text-muted-foreground">
                      {format(new Date(doc.uploaded_at), "d MMM yyyy", { locale: nl })}
                    </TableCell>
                    <TableCell className="py-2 text-xs text-muted-foreground truncate max-w-[150px]">
                      {doc.notes || "—"}
                    </TableCell>
                    <TableCell className="py-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => handleDownload(doc)}>
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:text-destructive" onClick={() => handleDelete(doc)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Email History Tab ────────────────────────────────────────────────────────

function EmailHistoryTab({ clientId, clientEmail }: { clientId: string; clientEmail: string }) {
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => { fetchEmails(); }, [clientId]);

  const fetchEmails = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("email_logs")
      .select("*")
      .eq("client_id", clientId)
      .order("sent_at", { ascending: false });
    setEmails((data || []) as EmailLog[]);
    setLoading(false);
  };

  const handleSendEmail = async () => {
    if (!subject.trim() || !body.trim()) { toast.error("Vul onderwerp en bericht in"); return; }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-client-email", {
        body: { client_id: clientId, to_email: clientEmail, subject: subject.trim(), body: body.trim() },
      });
      if (error) throw error;
      toast.success("E-mail verstuurd!");
      setShowCompose(false);
      setSubject(""); setBody("");
      fetchEmails();
    } catch (err: any) {
      toast.error("Fout bij versturen: " + err.message);
    }
    setSending(false);
  };

  const getStatusIcon = (status: string) => {
    if (status === "sent" || status === "delivered") return <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />;
    if (status === "failed") return <AlertCircle className="h-3.5 w-3.5 text-red-500" />;
    return <Clock className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  const getEmailTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      invitation:    "Uitnodiging",
      payment_link:  "Betaallink",
      manual:        "Handmatig",
      reminder:      "Herinnering",
      confirmation:  "Bevestiging",
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-4">
      {/* Compose */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          E-mailgeschiedenis voor <strong>{clientEmail}</strong>
        </p>
        <Button size="sm" className="gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white" onClick={() => setShowCompose(true)}>
          <Send className="h-3.5 w-3.5" /> E-mail sturen
        </Button>
      </div>

      {/* Compose form */}
      {showCompose && (
        <Card className="border-terracotta-200 bg-terracotta-50/20">
          <CardContent className="p-4 space-y-3">
            <p className="text-sm font-medium">Nieuw bericht naar {clientEmail}</p>
            <div>
              <Label className="text-xs">Onderwerp *</Label>
              <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Onderwerp van de e-mail" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Bericht *</Label>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Schrijf je bericht hier..."
                rows={5}
                className="w-full mt-1 text-sm border border-input rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => { setShowCompose(false); setSubject(""); setBody(""); }}>
                Annuleren
              </Button>
              <Button size="sm" onClick={handleSendEmail} disabled={sending} className="gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white">
                {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                {sending ? "Versturen..." : "Versturen"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email list */}
      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : emails.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground text-sm space-y-2">
          <Mail className="h-8 w-8 mx-auto opacity-30" />
          <p>Nog geen e-mails verstuurd naar deze klant.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {emails.map(email => (
            <Card key={email.id} className="border-warm-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="mt-0.5 shrink-0">{getStatusIcon(email.status)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{email.subject}</p>
                      {email.body_preview && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{email.body_preview}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {getEmailTypeLabel(email.email_type)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(email.sent_at), "d MMM yyyy HH:mm", { locale: nl })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main CustomerProfile ─────────────────────────────────────────────────────

export default function CustomerProfile({ email, onClose }: CustomerProfileProps) {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
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

      // Fetch enrollments
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
          <DialogHeader><DialogTitle>Klantprofiel</DialogTitle><DialogDescription>Laden...</DialogDescription></DialogHeader>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-terracotta-400" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!customer) return null;

  const tabs = [
    { value: "overview",       icon: LayoutDashboard, label: "Overzicht"    },
    { value: "trainings",      icon: BookOpen,        label: "Trainingen"   },
    { value: "sessions",       icon: Calendar,        label: "Sessies"      },
    { value: "questionnaires", icon: ClipboardList,   label: "Vragenlijsten" },
    { value: "notes",          icon: MessageSquare,   label: "Notities"     },
    { value: "documents",      icon: FileText,        label: "Documenten"   },
    { value: "emails",         icon: Mail,            label: "E-mails"      },
    { value: "payments",       icon: Euro,            label: "Betalingen"   },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="mr-1">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg">{customer.name}</DialogTitle>
              <DialogDescription className="text-xs flex items-center gap-3">
                <span>{customer.email}</span>
                {customer.phone && <span>{customer.phone}</span>}
              </DialogDescription>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5 shrink-0" onClick={() => setShowExtraTraining(true)}>
              <Plus className="h-3.5 w-3.5" /> Extra training
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          {/* Scrollable tab list */}
          <div className="overflow-x-auto -mx-1 px-1">
            <TabsList className="inline-flex h-9 w-auto min-w-full">
              {tabs.map(t => (
                <TabsTrigger key={t.value} value={t.value} className="text-xs gap-1 whitespace-nowrap px-3">
                  <t.icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{t.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-4">
            <OverviewTab
              customer={customer} enrollments={enrollments} registrations={registrations}
              sessionAppointments={sessionAppointments} structuredNotes={structuredNotes}
              onTrainingClick={handleTrainingClick} onTabChange={setActiveTab}
            />
          </TabsContent>

          <TabsContent value="trainings" className="mt-4">
            <TrainingsTab
              customer={{ name: customer.name, email: customer.email, phone: customer.phone }}
              registrations={registrations} enrollments={enrollments} courseWeeks={courseWeeks}
              sessionAppointments={sessionAppointments} structuredNotes={structuredNotes}
              onEnrollmentsChange={setEnrollments} onSessionAppointmentsChange={setSessionAppointments}
              onStructuredNotesChange={setStructuredNotes} onRefresh={fetchCustomerData}
              registrationRefs={registrationRefs} openCards={openCards}
              onToggleCard={(id) => setOpenCards(prev => ({ ...prev, [id]: !prev[id] }))}
            />
          </TabsContent>

          <TabsContent value="sessions" className="mt-4">
            <SessionsTab enrollments={enrollments} sessionAppointments={sessionAppointments} onEnrollmentsChange={setEnrollments} />
          </TabsContent>

          <TabsContent value="questionnaires" className="mt-4">
            <QuestionnairesTab enrollments={enrollments} />
          </TabsContent>

          <TabsContent value="notes" className="mt-4">
            <NotesTab
              customer={{ name: customer.name }} registrations={registrations}
              enrollments={enrollments} structuredNotes={structuredNotes}
              onStructuredNotesChange={setStructuredNotes}
            />
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            {clientId ? (
              <DocumentsTab clientId={clientId} clientName={customer.name} />
            ) : (
              <div className="text-center py-10 text-sm text-muted-foreground">
                Klant heeft nog geen client-record. Maak eerst een klant aan via de klantenpagina.
              </div>
            )}
          </TabsContent>

          <TabsContent value="emails" className="mt-4">
            {clientId ? (
              <EmailHistoryTab clientId={clientId} clientEmail={customer.email} />
            ) : (
              <div className="text-center py-10 text-sm text-muted-foreground">
                Klant heeft nog geen client-record. Maak eerst een klant aan via de klantenpagina.
              </div>
            )}
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
                {submittingExtra && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Inschrijven
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
