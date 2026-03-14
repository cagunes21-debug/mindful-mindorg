// src/components/admin/AdminCustomersSection.tsx
// The leads tab now uses the CrmPipelineSection Kanban board.
// All other functionality (customers tab, new client dialog, convert lead, etc.) is unchanged.

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2, Users, Search, Euro, Mail, Phone, ShoppingBag,
  Calendar, Plus, MessageCircle,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import CustomerProfile from "@/components/admin/CustomerProfile";
import CrmPipelineSection from "@/components/admin/CrmPipelineSection";

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

export default function AdminCustomersSection({ initialTab = "customers" }: { initialTab?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);
  const [showNewClient, setShowNewClient] = useState(false);
  const [newClient, setNewClient] = useState({ first_name: "", last_name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    fetchCustomers();
    fetchLeadCount();
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

  const fetchLeadCount = async () => {
    const { data } = await supabase
      .from("leads")
      .select("id, status")
      .eq("status", "new");
    setLeads(data || []);
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

  const newLeadCount = leads.length;

  const stats = {
    totalCustomers: customers.length,
    totalRevenue: customers.reduce((sum, c) => sum + (c.total_spent || 0), 0),
    totalRegistrations: customers.reduce((sum, c) => sum + (c.total_registrations || 0), 0),
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
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
              <div className="p-2 bg-orange-100 rounded-lg"><MessageCircle className="h-5 w-5 text-orange-700" /></div>
              <div>
                <p className="text-2xl font-semibold">
                  {newLeadCount}
                  {newLeadCount > 0 && (
                    <span className="text-sm font-normal text-terracotta-600 ml-1">nieuw</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">Leads in pipeline</p>
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
            <MessageCircle className="h-4 w-4" /> Pipeline
            {newLeadCount > 0 && (
              <Badge className="bg-terracotta-500 text-white text-[10px] ml-1 px-1.5 py-0">
                {newLeadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── CUSTOMERS TAB ── */}
        <TabsContent value="customers">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op naam, e-mail of training..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">{filteredCustomers.length} resultaten</p>
            <Button size="sm" className="gap-2 ml-auto bg-terracotta-600 hover:bg-terracotta-700 text-white" onClick={() => setShowNewClient(true)}>
              <Plus className="h-4 w-4" /> Nieuwe klant
            </Button>
          </div>

          <Card>
            <CardContent className="pt-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-terracotta-400" />
                </div>
              ) : filteredCustomers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {searchQuery ? "Geen klanten gevonden" : "Nog geen klanten"}
                </div>
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
                        <TableRow
                          key={customer.email}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedCustomerEmail(customer.email)}
                        >
                          <TableCell>
                            <span className="font-medium">{customer.name}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Mail className="h-3 w-3" />{customer.email}
                              </div>
                              {customer.phone && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Phone className="h-3 w-3" />{customer.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center">
                              <span className="font-semibold">{customer.total_registrations}</span>
                              <span className="text-xs text-muted-foreground">({customer.paid_registrations} betaald)</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-semibold text-terracotta-600">
                              €{customer.total_spent?.toLocaleString('nl-NL') || 0}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {customer.trainings?.slice(0, 2).map((training, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-sage-100 text-sage-800 text-xs">
                                  {training.length > 20 ? training.substring(0, 20) + '...' : training}
                                </Badge>
                              ))}
                              {customer.trainings && customer.trainings.length > 2 && (
                                <Badge variant="outline" className="text-xs">+{customer.trainings.length - 2}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {customer.last_registration && format(
                                new Date(customer.last_registration),
                                "d MMM yyyy", { locale: nl }
                              )}
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

        {/* ── PIPELINE TAB ── */}
        <TabsContent value="leads">
          <CrmPipelineSection />
        </TabsContent>
      </Tabs>

      {/* Customer Profile Modal */}
      {selectedCustomerEmail && (
        <CustomerProfile
          email={selectedCustomerEmail}
          onClose={() => setSelectedCustomerEmail(null)}
        />
      )}

      {/* New Client Dialog */}
      <Dialog open={showNewClient} onOpenChange={setShowNewClient}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nieuwe klant aanmaken</DialogTitle>
            <DialogDescription>Maak een klantprofiel aan zonder account.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Voornaam *</Label>
                <Input
                  value={newClient.first_name}
                  onChange={e => setNewClient(p => ({ ...p, first_name: e.target.value }))}
                  placeholder="Voornaam"
                />
              </div>
              <div>
                <Label>Achternaam</Label>
                <Input
                  value={newClient.last_name}
                  onChange={e => setNewClient(p => ({ ...p, last_name: e.target.value }))}
                  placeholder="Achternaam"
                />
              </div>
            </div>
            <div>
              <Label>E-mail *</Label>
              <Input
                type="email"
                value={newClient.email}
                onChange={e => setNewClient(p => ({ ...p, email: e.target.value }))}
                placeholder="email@voorbeeld.nl"
              />
            </div>
            <div>
              <Label>Telefoon</Label>
              <Input
                value={newClient.phone}
                onChange={e => setNewClient(p => ({ ...p, phone: e.target.value }))}
                placeholder="06-12345678"
              />
            </div>
            <div>
              <Label>Notities</Label>
              <Textarea
                value={newClient.notes}
                onChange={e => setNewClient(p => ({ ...p, notes: e.target.value }))}
                placeholder="Interne notities over deze klant..."
                className="min-h-[60px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewClient(false)}>Annuleren</Button>
            <Button
              onClick={submitNewClient}
              disabled={submitting}
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Aanmaken
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
