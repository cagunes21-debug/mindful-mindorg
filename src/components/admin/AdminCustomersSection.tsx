import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Users, Search, Euro, Mail, Phone, ShoppingBag, Calendar, Plus, MessageCircle, Clock, StickyNote, ChevronDown, ChevronUp, BookOpen, ClipboardList, BarChart3, UserCheck, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import CustomerProfile from "@/components/admin/CustomerProfile";

interface Customer {
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

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  user_id: string | null;
  created_at: string;
}

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  message: string | null;
  interest: string | null;
  status: string;
  submission_date: string;
  notes: string | null;
}

const leadStatusColors: Record<string, string> = {
  "new": "bg-blue-100 text-blue-800",
  "contacted": "bg-yellow-100 text-yellow-800",
  "intake_scheduled": "bg-purple-100 text-purple-800",
  "converted_to_client": "bg-green-100 text-green-800",
  "not_interested": "bg-red-100 text-red-800",
};

const leadStatusLabels: Record<string, string> = {
  "new": "Nieuw",
  "contacted": "Gecontacteerd",
  "intake_scheduled": "Intake ingepland",
  "converted_to_client": "Klant geworden",
  "not_interested": "Niet geïnteresseerd",
};

export default function AdminCustomersSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [leadsSearchQuery, setLeadsSearchQuery] = useState("");
  
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showNewClient, setShowNewClient] = useState(false);
  const [newClient, setNewClient] = useState({ first_name: "", last_name: "", email: "", phone: "", notes: "" });
  const [showNewReg, setShowNewReg] = useState(false);
  const [newReg, setNewReg] = useState({ name: "", email: "", phone: "", training_name: "8-weekse Mindful Zelfcompassie Training", remarks: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("customers");
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  const [clients, setClients] = useState<Client[]>([]);
  
  // Convert lead state
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [convertForm, setConvertForm] = useState({
    first_name: "", last_name: "", email: "",
    training: "Individueel Traject (6 sessies)",
    course_type: "individueel_6",
    start_date: "", notes: "", send_invite: true,
  });
  const [convertSubmitting, setConvertSubmitting] = useState(false);
  const [duplicateClient, setDuplicateClient] = useState<Client | null>(null);
  
  useEffect(() => {
    fetchCustomers();
    fetchLeads();
    fetchClients();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("last_registration", { ascending: false });
      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setClients((data as Client[]) || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("submission_date", { ascending: false });
      if (error) throw error;
      setLeads((data as Lead[]) || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLeadsLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("leads").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      toast.error("Fout bij bijwerken status");
    } else {
      toast.success("Status bijgewerkt");
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    }
  };

  const saveLeadNotes = async (id: string) => {
    const notesText = editingNotes[id] ?? "";
    const { error } = await supabase.from("leads").update({ notes: notesText, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      toast.error("Fout bij opslaan notities");
    } else {
      toast.success("Notities opgeslagen");
      setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: notesText } : l));
    }
  };

  const openConvertLead = (lead: Lead) => {
    setConvertForm({
      first_name: lead.first_name, last_name: lead.last_name,
      email: lead.email,
      training: "Individueel Traject (6 sessies)",
      course_type: "individueel_6",
      start_date: "", notes: "", send_invite: true,
    });
    setDuplicateClient(null);
    setConvertingLead(lead);
  };

  const handleConvertLead = async () => {
    if (!convertingLead || !convertForm.start_date) {
      toast.error("Vul een startdatum in"); return;
    }
    setConvertSubmitting(true);
    try {
      const email = convertForm.email.trim().toLowerCase();

      // Check for existing client
      const { data: existingClients } = await supabase
        .from("clients").select("*").eq("email", email).limit(1);

      let clientId: string;
      let clientUserId: string | null = null;

      if (existingClients && existingClients.length > 0) {
        if (!duplicateClient) {
          // Show duplicate warning first
          setDuplicateClient(existingClients[0] as Client);
          setConvertSubmitting(false);
          return;
        }
        // User confirmed — add training to existing client
        clientId = existingClients[0].id;
        clientUserId = existingClients[0].user_id || null;
      } else {
        // Create new client
        const { data: newClientData, error: clientError } = await supabase
          .from("clients").insert({
            first_name: convertForm.first_name.trim(),
            last_name: convertForm.last_name.trim(),
            email,
            phone: convertingLead.phone_number || null,
            notes: convertForm.notes.trim() || null,
          }).select("id, user_id").single();
        if (clientError) throw clientError;
        clientId = newClientData.id;
        clientUserId = newClientData.user_id;
      }

      // Create registration
      const fullName = `${convertForm.first_name.trim()} ${convertForm.last_name.trim()}`.trim();
      const { data: regData, error: regError } = await supabase
        .from("registrations").insert({
          name: fullName, email,
          phone: convertingLead.phone_number || null,
          training_name: convertForm.training,
          remarks: convertForm.notes.trim() || null,
          status: "confirmed", payment_status: "pending",
        }).select("id").single();
      if (regError) throw regError;

      // Create enrollment
      const { error: enrError } = await supabase
        .from("enrollments").insert({
          client_id: clientId,
          user_id: clientUserId || null,
          course_type: convertForm.course_type,
          start_date: convertForm.start_date,
          registration_id: regData.id,
          status: clientUserId ? "active" : "invited",
          unlocked_weeks: [1],
        });
      if (enrError) throw enrError;

      // Update lead status
      await supabase.from("leads").update({
        status: "converted_to_client",
        updated_at: new Date().toISOString(),
      }).eq("id", convertingLead.id);

      // Send invitation email if checked
      if (convertForm.send_invite && !clientUserId) {
        const courseLabels: Record<string, string> = {
          msc_8week: "8-weekse Mindful Zelfcompassie Training",
          individueel_6: "Individueel Traject (6 sessies)",
          losse_sessie: "Losse Sessie / Coaching",
        };
        try {
          await supabase.functions.invoke("send-invitation-email", {
            body: {
              client_id: clientId,
              enrollment_id: regData.id,
              program_name: courseLabels[convertForm.course_type] || convertForm.training,
              email,
              first_name: convertForm.first_name.trim(),
            },
          });
        } catch (inviteErr) {
          console.error("Invite email failed:", inviteErr);
        }
      }

      toast.success("Lead succesvol omgezet naar klant!");
      setConvertingLead(null);
      setDuplicateClient(null);
      setLeads(prev => prev.map(l => l.id === convertingLead.id ? { ...l, status: "converted_to_client" } : l));
      fetchClients();
      fetchCustomers();

      // Open the new client profile
      setSelectedClientId(clientId);
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setConvertSubmitting(false);
  };


    if (!newReg.name.trim() || !newReg.email.trim() || !newReg.training_name.trim()) {
      toast.error("Vul naam, e-mail en training in"); return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("registrations").insert({
        name: newReg.name.trim(),
        email: newReg.email.trim().toLowerCase(),
        phone: newReg.phone.trim() || null,
        training_name: newReg.training_name.trim(),
        remarks: newReg.remarks.trim() || null,
        status: "pending",
        payment_status: "pending",
      });
      if (error) throw error;
      toast.success("Aanmelding aangemaakt!");
      setShowNewReg(false);
      setNewReg({ name: "", email: "", phone: "", training_name: "8-weekse Mindful Zelfcompassie Training", remarks: "" });
      fetchCustomers();
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSubmitting(false);
  };

  const submitNewClient = async () => {
    if (!newClient.first_name.trim() || !newClient.email.trim()) {
      toast.error("Vul voornaam en e-mail in"); return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.from("clients").insert({
        first_name: newClient.first_name.trim(),
        last_name: newClient.last_name.trim(),
        email: newClient.email.trim().toLowerCase(),
        phone: newClient.phone.trim() || null,
        notes: newClient.notes.trim() || null,
      }).select("id").single();
      if (error) throw error;
      toast.success("Klant aangemaakt!");
      setShowNewClient(false);
      setNewClient({ first_name: "", last_name: "", email: "", phone: "", notes: "" });
      fetchClients();
      // Open the new client profile
      setSelectedClientId(data.id);
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setSubmitting(false);
  };

  const filteredCustomers = customers.filter(customer => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      customer.name?.toLowerCase().includes(query) ||
      customer.email?.toLowerCase().includes(query) ||
      customer.trainings?.some(t => t.toLowerCase().includes(query))
    );
  });

  const filteredLeads = leads.filter(lead => {
    if (!leadsSearchQuery.trim()) return true;
    const q = leadsSearchQuery.toLowerCase();
    return (
      lead.first_name?.toLowerCase().includes(q) ||
      lead.last_name?.toLowerCase().includes(q) ||
      lead.email?.toLowerCase().includes(q) ||
      lead.interest?.toLowerCase().includes(q) ||
      lead.message?.toLowerCase().includes(q)
    );
  });

  const newLeadCount = leads.filter(l => l.status === "new").length;

  const stats = {
    totalCustomers: customers.length,
    totalRevenue: customers.reduce((sum, c) => sum + (c.total_spent || 0), 0),
    totalRegistrations: customers.reduce((sum, c) => sum + (c.total_registrations || 0), 0),
    formLeads: leads.length,
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sage-100 rounded-lg"><Users className="h-5 w-5 text-sage-700" /></div>
              <div>
                <p className="text-2xl font-semibold">{stats.totalCustomers}</p>
                <p className="text-sm text-muted-foreground">Klanten</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-terracotta-100 rounded-lg"><Euro className="h-5 w-5 text-terracotta-700" /></div>
              <div>
                <p className="text-2xl font-semibold">€{stats.totalRevenue.toLocaleString('nl-NL')}</p>
                <p className="text-sm text-muted-foreground">Totale omzet</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><ShoppingBag className="h-5 w-5 text-blue-700" /></div>
              <div>
                <p className="text-2xl font-semibold">{stats.totalRegistrations}</p>
                <p className="text-sm text-muted-foreground">Aanmeldingen</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg"><MessageCircle className="h-5 w-5 text-orange-700" /></div>
              <div>
                <p className="text-2xl font-semibold">{stats.formLeads}{newLeadCount > 0 && <span className="text-sm font-normal text-blue-600 ml-1">({newLeadCount} nieuw)</span>}</p>
                <p className="text-sm text-muted-foreground">Website leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="customers" className="gap-2">
            <Users className="h-4 w-4" /> Klanten ({customers.length})
          </TabsTrigger>
          <TabsTrigger value="leads" className="gap-2">
            <MessageCircle className="h-4 w-4" /> Website Leads ({leads.length})
            {newLeadCount > 0 && <Badge className="bg-blue-500 text-white text-[10px] ml-1 px-1.5 py-0">{newLeadCount}</Badge>}
          </TabsTrigger>
        </TabsList>

        {/* CUSTOMERS TAB */}
        <TabsContent value="customers">
          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Zoek op naam, e-mail of training..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <p className="text-sm text-muted-foreground">{filteredCustomers.length} resultaten</p>
            <Button size="sm" className="gap-2 ml-auto" onClick={() => setShowNewClient(true)}>
              <Plus className="h-4 w-4" /> Nieuwe klant
            </Button>
          </div>

          <Card>
            <CardContent className="pt-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-sage-600" /></div>
              ) : filteredCustomers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">{searchQuery ? "Geen klanten gevonden" : "Nog geen klanten"}</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Klant</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead className="text-center">Aanmeldingen</TableHead>
                        <TableHead className="text-right">Totaal betaald</TableHead>
                        <TableHead>Trainingen</TableHead>
                        <TableHead>Laatste activiteit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.email} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedCustomerEmail(customer.email)}>
                          <TableCell>
                            <span className="font-medium">{customer.name}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground"><Mail className="h-3 w-3" />{customer.email}</div>
                              {customer.phone && <div className="flex items-center gap-1 text-sm text-muted-foreground"><Phone className="h-3 w-3" />{customer.phone}</div>}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center">
                              <span className="font-semibold">{customer.total_registrations}</span>
                              <span className="text-xs text-muted-foreground">({customer.paid_registrations} betaald)</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-semibold text-terracotta-600">€{customer.total_spent?.toLocaleString('nl-NL') || 0}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {customer.trainings?.slice(0, 2).map((training, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-sage-100 text-sage-800 text-xs">
                                  {training.length > 20 ? training.substring(0, 20) + '...' : training}
                                </Badge>
                              ))}
                              {customer.trainings && customer.trainings.length > 2 && <Badge variant="outline" className="text-xs">+{customer.trainings.length - 2}</Badge>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {customer.last_registration && format(new Date(customer.last_registration), "d MMM yyyy", { locale: nl })}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* LEADS TAB */}
        <TabsContent value="leads">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Zoek op naam, e-mail of interesse..." value={leadsSearchQuery} onChange={(e) => setLeadsSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <p className="text-sm text-muted-foreground">{filteredLeads.length} resultaten</p>
          </div>

          <Card>
            <CardContent className="pt-4">
              {leadsLoading ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-sage-600" /></div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">{leadsSearchQuery ? "Geen leads gevonden" : "Nog geen website leads"}</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-8"></TableHead>
                        <TableHead>Naam</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Interesse</TableHead>
                        <TableHead>Bericht</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Datum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <>
                          <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50" onClick={() => {
                            const newId = expandedLeadId === lead.id ? null : lead.id;
                            setExpandedLeadId(newId);
                            if (newId && !(lead.id in editingNotes)) {
                              setEditingNotes(prev => ({ ...prev, [lead.id]: lead.notes || "" }));
                            }
                          }}>
                            <TableCell className="w-8">
                              {expandedLeadId === lead.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">{lead.first_name} {lead.last_name}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground"><Mail className="h-3 w-3" />{lead.email}</div>
                                {lead.phone_number && <div className="flex items-center gap-1 text-sm text-muted-foreground"><Phone className="h-3 w-3" />{lead.phone_number}</div>}
                              </div>
                            </TableCell>
                            <TableCell>
                              {lead.interest && <Badge variant="secondary" className="bg-sage-100 text-sage-800 text-xs">{lead.interest}</Badge>}
                            </TableCell>
                            <TableCell>
                              <p className="text-sm text-muted-foreground max-w-[250px] truncate">{lead.message || "—"}</p>
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <Select value={lead.status} onValueChange={(v) => updateLeadStatus(lead.id, v)}>
                                <SelectTrigger className="w-[160px] h-8">
                                  <Badge className={`${leadStatusColors[lead.status] || "bg-muted text-muted-foreground"} text-[10px] px-1.5 py-0`}>
                                    {leadStatusLabels[lead.status] || lead.status}
                                  </Badge>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">Nieuw</SelectItem>
                                  <SelectItem value="contacted">Gecontacteerd</SelectItem>
                                  <SelectItem value="intake_scheduled">Intake ingepland</SelectItem>
                                  <SelectItem value="converted_to_client">Klant geworden</SelectItem>
                                  <SelectItem value="not_interested">Niet geïnteresseerd</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {format(new Date(lead.submission_date), "d MMM yyyy HH:mm", { locale: nl })}
                              </div>
                            </TableCell>
                          </TableRow>
                          {expandedLeadId === lead.id && (
                            <TableRow key={`${lead.id}-notes`}>
                              <TableCell colSpan={7} className="bg-muted/30 border-b">
                                <div className="p-3 space-y-3">
                                  {lead.message && (
                                    <div>
                                      <p className="text-sm font-medium mb-1">Volledig bericht:</p>
                                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{lead.message}</p>
                                    </div>
                                  )}
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <StickyNote className="h-4 w-4 text-muted-foreground" />
                                      <p className="text-sm font-medium">Interne notities:</p>
                                    </div>
                                    <Textarea
                                      value={editingNotes[lead.id] ?? lead.notes ?? ""}
                                      onChange={(e) => setEditingNotes(prev => ({ ...prev, [lead.id]: e.target.value }))}
                                      placeholder="Voeg interne notities toe over deze lead..."
                                      className="min-h-[80px] text-sm"
                                    />
                                    <div className="flex items-center gap-2 mt-2">
                                      <Button size="sm" onClick={() => saveLeadNotes(lead.id)}>
                                        Notities opslaan
                                      </Button>
                                      {lead.status !== "converted_to_client" && (
                                        <Button size="sm" variant="default" className="gap-1.5 ml-auto" onClick={(e) => { e.stopPropagation(); openConvertLead(lead); }}>
                                          <UserCheck className="h-3.5 w-3.5" /> Omzetten naar klant
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Profile Modal (legacy - from customers view) */}
      {selectedCustomerEmail && (
        <CustomerProfile email={selectedCustomerEmail} onClose={() => setSelectedCustomerEmail(null)} />
      )}

      {/* Client Profile Modal (new - from clients table) */}
      {selectedClientId && (
        <ClientProfileModal clientId={selectedClientId} onClose={() => { setSelectedClientId(null); fetchClients(); }} />
      )}

      {/* New Client Dialog */}
      <Dialog open={showNewClient} onOpenChange={setShowNewClient}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nieuwe klant aanmaken</DialogTitle>
            <DialogDescription>Maak een klantprofiel aan. Er is geen account nodig.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Voornaam *</Label><Input value={newClient.first_name} onChange={e => setNewClient(p => ({ ...p, first_name: e.target.value }))} placeholder="Voornaam" /></div>
              <div><Label>Achternaam</Label><Input value={newClient.last_name} onChange={e => setNewClient(p => ({ ...p, last_name: e.target.value }))} placeholder="Achternaam" /></div>
            </div>
            <div><Label>E-mail *</Label><Input type="email" value={newClient.email} onChange={e => setNewClient(p => ({ ...p, email: e.target.value }))} placeholder="email@voorbeeld.nl" /></div>
            <div><Label>Telefoon</Label><Input value={newClient.phone} onChange={e => setNewClient(p => ({ ...p, phone: e.target.value }))} placeholder="06-12345678" /></div>
            <div><Label>Notities</Label><Textarea value={newClient.notes} onChange={e => setNewClient(p => ({ ...p, notes: e.target.value }))} placeholder="Interne notities over deze klant..." className="min-h-[60px]" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewClient(false)}>Annuleren</Button>
            <Button onClick={submitNewClient} disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Aanmaken
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Registration Dialog (legacy) */}
      <Dialog open={showNewReg} onOpenChange={setShowNewReg}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nieuwe aanmelding</DialogTitle>
            <DialogDescription>Maak handmatig een aanmelding aan voor een klant.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Naam *</Label><Input value={newReg.name} onChange={e => setNewReg(p => ({ ...p, name: e.target.value }))} placeholder="Volledige naam" /></div>
            <div><Label>E-mail *</Label><Input type="email" value={newReg.email} onChange={e => setNewReg(p => ({ ...p, email: e.target.value }))} placeholder="email@voorbeeld.nl" /></div>
            <div><Label>Telefoon</Label><Input value={newReg.phone} onChange={e => setNewReg(p => ({ ...p, phone: e.target.value }))} placeholder="06-12345678" /></div>
            <div>
              <Label>Training *</Label>
              <Select value={newReg.training_name} onValueChange={v => setNewReg(p => ({ ...p, training_name: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="8-weekse Mindful Zelfcompassie Training">8-weekse Mindful Zelfcompassie Training</SelectItem>
                  <SelectItem value="Individueel Traject (6 sessies)">Individueel Traject (6 sessies)</SelectItem>
                  <SelectItem value="Losse Sessie / Coaching">Losse Sessie / Coaching</SelectItem>
                  <SelectItem value="Beweging & Mildheid Retreat">Beweging & Mildheid Retreat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Opmerkingen</Label><Input value={newReg.remarks} onChange={e => setNewReg(p => ({ ...p, remarks: e.target.value }))} placeholder="Eventuele opmerkingen" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewReg(false)}>Annuleren</Button>
            <Button onClick={submitNewRegistration} disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Aanmelden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Client Profile Modal - for clients created via new CRM flow
function ClientProfileModal({ clientId, onClose }: { clientId: string; onClose: () => void }) {
  const [client, setClient] = useState<Client | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateEnrollment, setShowCreateEnrollment] = useState(false);
  const [courseType, setCourseType] = useState("individueel_6");
  const [startDate, setStartDate] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [creating, setCreating] = useState(false);
  const [sendingInvite, setSendingInvite] = useState(false);

  useEffect(() => { fetchData(); }, [clientId]);

  const fetchData = async () => {
    setLoading(true);
    const [clientRes, enrollRes] = await Promise.all([
      supabase.from("clients").select("*").eq("id", clientId).single(),
      supabase.from("enrollments").select("*").eq("client_id", clientId).order("created_at", { ascending: false }),
    ]);
    setClient(clientRes.data as Client | null);
    setEnrollments((enrollRes.data || []) as any[]);
    setLoading(false);
  };

  const createEnrollment = async () => {
    if (!startDate) { toast.error("Vul een startdatum in"); return; }
    setCreating(true);
    try {
      const { error } = await supabase.from("enrollments").insert({
        client_id: clientId,
        user_id: client?.user_id || null,
        course_type: courseType,
        start_date: startDate,
        trainer_name: trainerName || null,
        status: "invited",
        unlocked_weeks: [1],
      });
      if (error) throw error;
      toast.success("Inschrijving aangemaakt!");
      setShowCreateEnrollment(false);
      setCourseType("individueel_6"); setStartDate(""); setTrainerName("");
      fetchData();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setCreating(false);
  };

  const sendInvitation = async (enrollment: any) => {
    if (!client) return;
    setSendingInvite(true);
    try {
      const courseLabels: Record<string, string> = {
        msc_8week: "8-weekse Mindful Zelfcompassie Training",
        individueel_6: "Individueel Traject (6 sessies)",
        losse_sessie: "Losse Sessie / Coaching",
      };
      const { error } = await supabase.functions.invoke("send-invitation-email", {
        body: {
          client_id: clientId,
          enrollment_id: enrollment.id,
          program_name: courseLabels[enrollment.course_type] || enrollment.course_type,
          email: client.email,
          first_name: client.first_name,
        },
      });
      if (error) throw error;
      toast.success("Uitnodiging verstuurd naar " + client.email);
    } catch (err: any) { toast.error("Fout bij versturen: " + err.message); }
    setSendingInvite(false);
  };

  const copyQuestionnaireLink = (enrollmentId: string, type: "pre" | "post") => {
    const url = `${window.location.origin}/vragenlijst/${enrollmentId}${type === "post" ? "?type=post" : ""}`;
    navigator.clipboard.writeText(url);
    toast.success(`${type === "pre" ? "0-meting" : "Nameting"}-link gekopieerd!`);
  };

  const copyIntakeLink = (enrollmentId: string) => {
    const url = `${window.location.origin}/intake/${enrollmentId}`;
    navigator.clipboard.writeText(url);
    toast.success("Intake-link gekopieerd!");
  };

  if (loading || !client) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader><DialogTitle>Klantprofiel</DialogTitle><DialogDescription>Laden...</DialogDescription></DialogHeader>
          <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
        </DialogContent>
      </Dialog>
    );
  }

  const fullName = `${client.first_name} ${client.last_name}`.trim();
  const hasAccount = !!client.user_id;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2">
            {fullName}
            {hasAccount
              ? <Badge className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0">Account actief</Badge>
              : <Badge className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0">Geen account</Badge>
            }
          </DialogTitle>
          <DialogDescription className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{client.email}</span>
            {client.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{client.phone}</span>}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {client.notes && (
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-medium mb-1">Notities</p>
              <p className="text-sm">{client.notes}</p>
            </div>
          )}

          {/* Enrollments */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Inschrijvingen ({enrollments.length})
              </h3>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7" onClick={() => setShowCreateEnrollment(true)}>
                <Plus className="h-3 w-3" /> Inschrijving
              </Button>
            </div>

            {enrollments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Nog geen inschrijvingen. Maak een inschrijving aan om te beginnen.
              </div>
            ) : (
              enrollments.map((enr) => {
                const courseLabels: Record<string, string> = {
                  msc_8week: "8-weekse Groepstraining",
                  individueel_6: "Individueel (6 sessies)",
                  losse_sessie: "Losse Sessie",
                };
                const statusLabel: Record<string, string> = {
                  invited: "Uitgenodigd",
                  active: "Actief",
                  completed: "Afgerond",
                  cancelled: "Geannuleerd",
                  paused: "Gepauzeerd",
                };
                const statusColor: Record<string, string> = {
                  invited: "bg-blue-100 text-blue-800",
                  active: "bg-green-100 text-green-800",
                  completed: "bg-primary/10 text-primary",
                  cancelled: "bg-destructive/10 text-destructive",
                  paused: "bg-yellow-100 text-yellow-800",
                };
                return (
                  <Card key={enr.id}>
                    <CardContent className="p-3 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm flex-1">{courseLabels[enr.course_type] || enr.course_type}</span>
                        <Badge className={`${statusColor[enr.status] || "bg-muted text-muted-foreground"} text-[10px] px-1.5 py-0`}>
                          {statusLabel[enr.status] || enr.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Start: {new Date(enr.start_date).toLocaleDateString("nl-NL")}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-1.5">
                        {!hasAccount && (
                          <Button size="sm" variant="outline" className="h-6 text-xs gap-1" onClick={() => sendInvitation(enr)} disabled={sendingInvite}>
                            {sendingInvite ? <Loader2 className="h-3 w-3 animate-spin" /> : <Mail className="h-3 w-3" />}
                            Account uitnodiging versturen
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-6 text-xs gap-1" onClick={() => copyIntakeLink(enr.id)}>
                          <ClipboardList className="h-3 w-3" /> Intake-link
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 text-xs gap-1" onClick={() => copyQuestionnaireLink(enr.id, "pre")}>
                          <BarChart3 className="h-3 w-3" /> 0-meting
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 text-xs gap-1" onClick={() => copyQuestionnaireLink(enr.id, "post")}>
                          <BarChart3 className="h-3 w-3" /> Nameting
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Create Enrollment Form */}
          {showCreateEnrollment && (
            <Card className="border-primary/20">
              <CardContent className="p-4 space-y-3">
                <p className="text-sm font-medium">Nieuwe inschrijving voor {fullName}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Programma</Label>
                    <Select value={courseType} onValueChange={setCourseType}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="msc_8week">8-weekse Groepstraining</SelectItem>
                        <SelectItem value="individueel_6">Individueel (6 sessies)</SelectItem>
                        <SelectItem value="losse_sessie">Losse Sessie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Startdatum *</Label>
                    <Input type="date" className="h-8 text-xs" value={startDate} onChange={e => setStartDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Trainer (optioneel)</Label>
                  <Input className="h-8 text-xs" value={trainerName} onChange={e => setTrainerName(e.target.value)} placeholder="Naam trainer" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={createEnrollment} disabled={creating} className="gap-1.5 text-xs">
                    {creating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />} Aanmaken
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs" onClick={() => setShowCreateEnrollment(false)}>Annuleren</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
