// src/components/admin/AdminCustomersSection.tsx
// Unified CRM hub: metrics, pipeline overview, clients & leads in one polished view

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Loader2, Users, Search, Euro, Mail, Phone,
  Calendar, Plus, MessageCircle, TrendingUp, UserPlus, ClipboardList,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import CrmPipelineSection from "@/components/admin/CrmPipelineSection";
import LeadProcesTab from "@/components/admin/LeadProcesTab";

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

// ─── Pipeline stages ──────────────────────────────────────────────────────────

const PIPELINE_STAGES = [
  { key: "new", label: "Nieuw", color: "bg-stone-400" },
  { key: "contact_attempt", label: "Contact", color: "bg-sky-400" },
  { key: "in_conversation", label: "In gesprek", color: "bg-amber-400" },
  { key: "intake_scheduled", label: "Kennis.", color: "bg-violet-400" },
  { key: "registered", label: "Aangemeld", color: "bg-emerald-500" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminCustomersSection({ initialTab = "customers" }: { initialTab?: string }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewClient, setShowNewClient] = useState(false);
  const [newClient, setNewClient] = useState({ first_name: "", last_name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    fetchCustomers();
    fetchAllLeads();
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

  const fetchAllLeads = async () => {
    const { data } = await supabase.from("leads").select("id, status");
    setAllLeads(data || []);
  };

  const submitNewClient = async () => {
    if (!newClient.first_name.trim() || !newClient.email.trim()) {
      toast.error("Vul voornaam en e-mail in"); return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("clients").insert({
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

  const newLeadCount = allLeads.filter(l => l.status === "new").length;
  const totalLeads = allLeads.length;

  const stageCounts = allLeads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = {
    totalCustomers: customers.length,
    totalRevenue: customers.reduce((sum, c) => sum + (c.total_spent || 0), 0),
    totalRegistrations: customers.reduce((sum, c) => sum + (c.total_registrations || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* ── Lead Pipeline Bar ── */}
      <Card
        className="border-0 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
        onClick={() => setActiveTab("leads")}
      >
        <CardContent className="p-0">
          <div className="px-5 pt-3.5 pb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Lead Pipeline</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">{totalLeads}</span>
              <span className="text-xs text-muted-foreground">leads</span>
              {newLeadCount > 0 && (
                <Badge className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white text-[10px] px-1.5 py-0 h-4 border-0">
                  {newLeadCount} nieuw
                </Badge>
              )}
            </div>
          </div>
          <div className="px-5 pb-4">
            <div className="flex gap-2">
              {PIPELINE_STAGES.map((stage) => {
                const count = stageCounts[stage.key] || 0;
                const hasLeads = count > 0;
                return (
                  <div key={stage.key} className="flex-1">
                    <div className={cn(
                      "rounded-xl p-3 text-center transition-all",
                      hasLeads ? "bg-card shadow-sm border border-border/40" : "bg-muted/30"
                    )}>
                      <div className={cn(
                        "w-9 h-9 rounded-lg mx-auto mb-1.5 flex items-center justify-center shadow-sm",
                        stage.color
                      )}>
                        <span className="text-sm font-bold text-white">{count}</span>
                      </div>
                      <p className="text-[10px] font-medium text-muted-foreground">{stage.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 overflow-hidden group" onClick={() => setActiveTab("customers")}>
          <CardContent className="p-0">
            <div className="p-4 bg-gradient-to-br from-sage-50 to-sage-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-sage-400 to-sage-500 shadow-sm group-hover:scale-110 transition-transform">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalCustomers}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">Klanten</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-gradient-to-br from-terracotta-50 to-warm-50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-terracotta-400 to-terracotta-500 shadow-sm">
                  <Euro className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">€{stats.totalRevenue.toLocaleString('nl-NL')}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">Totale omzet</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-gradient-to-br from-warm-50 to-warm-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-warm-400 to-warm-500 shadow-sm">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalRegistrations}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">Aanmeldingen</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Tabs ── */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-10 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="leads" className="gap-1.5 text-xs rounded-lg data-[state=active]:shadow-sm">
            <TrendingUp className="h-3.5 w-3.5" /> Leads & Pipeline
            {newLeadCount > 0 && (
              <Badge className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white text-[10px] px-1.5 py-0 h-4 ml-0.5 border-0">
                {newLeadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="customers" className="gap-1.5 text-xs rounded-lg data-[state=active]:shadow-sm">
            <Users className="h-3.5 w-3.5" /> Klanten
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 ml-0.5">
              {customers.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="proces" className="gap-1.5 text-xs rounded-lg data-[state=active]:shadow-sm">
            <ClipboardList className="h-3.5 w-3.5" /> Lead Proces
          </TabsTrigger>
        </TabsList>

        {/* ── CUSTOMERS TAB ── */}
        <TabsContent value="customers" className="mt-5">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op naam, e-mail of training..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-xl bg-muted/30 border-border/40"
              />
            </div>
            <span className="text-xs text-muted-foreground">{filteredCustomers.length} resultaten</span>
            <Button
              size="sm"
              className="ml-auto gap-1.5 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white shadow-sm"
              onClick={() => setShowNewClient(true)}
            >
              <Plus className="h-3.5 w-3.5" /> Nieuwe klant
            </Button>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">{searchQuery ? "Geen klanten gevonden" : "Nog geen klanten"}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Klant</TableHead>
                      <TableHead className="text-xs">Contact</TableHead>
                      <TableHead className="text-xs text-center">Boekingen</TableHead>
                      <TableHead className="text-xs text-right">Omzet</TableHead>
                      <TableHead className="text-xs">Trainingen</TableHead>
                      <TableHead className="text-xs">Laatst actief</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow
                        key={customer.email}
                        className="cursor-pointer hover:bg-accent/30"
                        onClick={() => navigate(`/admin/klant/${encodeURIComponent(customer.email)}`)}
                      >
                        <TableCell className="py-2.5">
                          <span className="font-medium text-sm">{customer.name}</span>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />{customer.email}
                            </span>
                            {customer.phone && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Phone className="h-3 w-3" />{customer.phone}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5 text-center">
                          <span className="font-semibold text-sm">{customer.total_registrations}</span>
                          <span className="text-[10px] text-muted-foreground ml-1">
                            ({customer.paid_registrations} betaald)
                          </span>
                        </TableCell>
                        <TableCell className="py-2.5 text-right">
                          <span className="font-semibold text-sm text-[hsl(var(--terracotta-600))]">
                            €{customer.total_spent?.toLocaleString('nl-NL') || 0}
                          </span>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {customer.trainings?.slice(0, 2).map((training, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-[hsl(var(--sage-100))] text-[hsl(var(--sage-800))] text-[10px] px-1.5 py-0">
                                {training.length > 18 ? training.substring(0, 18) + '…' : training}
                              </Badge>
                            ))}
                            {customer.trainings && customer.trainings.length > 2 && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">+{customer.trainings.length - 2}</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <span className="text-xs text-muted-foreground">
                            {customer.last_registration && format(
                              new Date(customer.last_registration),
                              "d MMM yyyy", { locale: nl }
                            )}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ── LEADS & PIPELINE TAB ── */}
        <TabsContent value="leads" className="mt-5">
          <CrmPipelineSection onLeadsChange={fetchAllLeads} />
        </TabsContent>

        {/* ── LEAD PROCES TAB ── */}
        <TabsContent value="proces" className="mt-4">
          <LeadProcesTab />
        </TabsContent>
      </Tabs>


      {/* New Client Dialog */}
      <Dialog open={showNewClient} onOpenChange={setShowNewClient}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nieuwe klant aanmaken</DialogTitle>
            <DialogDescription>Maak een klantprofiel aan zonder account.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Voornaam *</Label>
                <Input
                  value={newClient.first_name}
                  onChange={e => setNewClient(p => ({ ...p, first_name: e.target.value }))}
                  placeholder="Voornaam"
                  className="h-9"
                />
              </div>
              <div>
                <Label className="text-xs">Achternaam</Label>
                <Input
                  value={newClient.last_name}
                  onChange={e => setNewClient(p => ({ ...p, last_name: e.target.value }))}
                  placeholder="Achternaam"
                  className="h-9"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">E-mail *</Label>
              <Input
                type="email"
                value={newClient.email}
                onChange={e => setNewClient(p => ({ ...p, email: e.target.value }))}
                placeholder="email@voorbeeld.nl"
                className="h-9"
              />
            </div>
            <div>
              <Label className="text-xs">Telefoon</Label>
              <Input
                value={newClient.phone}
                onChange={e => setNewClient(p => ({ ...p, phone: e.target.value }))}
                placeholder="06-12345678"
                className="h-9"
              />
            </div>
            <div>
              <Label className="text-xs">Notities</Label>
              <Textarea
                value={newClient.notes}
                onChange={e => setNewClient(p => ({ ...p, notes: e.target.value }))}
                placeholder="Interne notities..."
                className="min-h-[60px] resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowNewClient(false)}>Annuleren</Button>
            <Button
              size="sm"
              onClick={submitNewClient}
              disabled={submitting}
              className="bg-[hsl(var(--terracotta-600))] hover:bg-[hsl(var(--terracotta-700))] text-white"
            >
              {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />}
              Aanmaken
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
