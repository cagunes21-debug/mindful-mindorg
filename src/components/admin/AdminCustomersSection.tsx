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
import { Loader2, Users, Search, Euro, Mail, Phone, ShoppingBag, Calendar, Plus, MessageCircle, Clock, StickyNote, ChevronDown, ChevronUp } from "lucide-react";
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
  const [showNewReg, setShowNewReg] = useState(false);
  const [newReg, setNewReg] = useState({ name: "", email: "", phone: "", training_name: "8-weekse Mindful Zelfcompassie Training", remarks: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("customers");
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  useEffect(() => {
    fetchCustomers();
    fetchLeads();
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

  const submitNewRegistration = async () => {
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
            <Button size="sm" className="gap-2 ml-auto" onClick={() => setShowNewReg(true)}>
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
                        <TableRow key={lead.id}>
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
                          <TableCell>
                            <Select value={lead.status} onValueChange={(v) => updateLeadStatus(lead.id, v)}>
                              <SelectTrigger className="w-[130px] h-8">
                                <Badge className={`${leadStatusColors[lead.status] || "bg-muted text-muted-foreground"} text-[10px] px-1.5 py-0`}>
                                  {lead.status}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new lead">New lead</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="lost">Lost</SelectItem>
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
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Profile Modal */}
      {selectedCustomerEmail && (
        <CustomerProfile email={selectedCustomerEmail} onClose={() => setSelectedCustomerEmail(null)} />
      )}

      {/* New Registration Dialog */}
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
