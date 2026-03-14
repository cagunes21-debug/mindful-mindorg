// src/components/admin/AdminCustomersSection.tsx
// Unified CRM hub: metrics, pipeline overview, clients & leads in one polished view

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
  Loader2, Users, Search, Euro, Mail, Phone,
  Calendar, Plus, MessageCircle, TrendingUp, UserPlus, ClipboardList,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import CustomerProfile from "@/components/admin/CustomerProfile";
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

// ─── Pipeline mini-bar (visual funnel) ────────────────────────────────────────

const PIPELINE_STAGES = [
  { key: "new", label: "Nieuw", colorClass: "bg-stone-400" },
  { key: "contact_attempt", label: "Contact", colorClass: "bg-sky-400" },
  { key: "in_conversation", label: "Gesprek", colorClass: "bg-amber-400" },
  { key: "intake_scheduled", label: "Kennis.", colorClass: "bg-violet-400" },
  { key: "registered", label: "Aangemeld", colorClass: "bg-emerald-400" },
  { key: "converted_to_client", label: "Klant", colorClass: "bg-green-600" },
];

function PipelineFunnel({ stageCounts, totalLeads }: { stageCounts: Record<string, number>; totalLeads: number }) {
  if (totalLeads === 0) return null;
  return (
    <div className="flex items-end gap-0.5 h-8">
      {PIPELINE_STAGES.map(stage => {
        const count = stageCounts[stage.key] || 0;
        const pct = Math.max(count / totalLeads * 100, 8);
        return (
          <div key={stage.key} className="flex flex-col items-center gap-0.5 flex-1">
            <span className="text-[9px] font-semibold text-foreground">{count}</span>
            <div
              className={`w-full rounded-sm ${stage.colorClass} transition-all`}
              style={{ height: `${pct * 0.28}px`, minHeight: "3px" }}
            />
            <span className="text-[8px] text-muted-foreground truncate w-full text-center">{stage.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminCustomersSection({ initialTab = "customers" }: { initialTab?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);
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
    <div className="space-y-5">
      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card
          className="cursor-pointer hover:shadow-md transition-all border-border/60"
          onClick={() => setActiveTab("customers")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[hsl(var(--sage-100))]">
                <Users className="h-4 w-4 text-[hsl(var(--sage-700))]" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.totalCustomers}</p>
                <p className="text-[11px] text-muted-foreground">Klanten</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[hsl(var(--terracotta-100))]">
                <Euro className="h-4 w-4 text-[hsl(var(--terracotta-700))]" />
              </div>
              <div>
                <p className="text-xl font-bold">€{stats.totalRevenue.toLocaleString('nl-NL')}</p>
                <p className="text-[11px] text-muted-foreground">Totale omzet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[hsl(var(--sage-100))]">
                <Calendar className="h-4 w-4 text-[hsl(var(--sage-700))]" />
              </div>
              <div>
                <p className="text-xl font-bold">{stats.totalRegistrations}</p>
                <p className="text-[11px] text-muted-foreground">Aanmeldingen</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-all border-border/60"
          onClick={() => setActiveTab("leads")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[hsl(var(--terracotta-50))]">
                <UserPlus className="h-4 w-4 text-[hsl(var(--terracotta-600))]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <p className="text-xl font-bold">{totalLeads}</p>
                  {newLeadCount > 0 && (
                    <span className="text-[10px] font-medium text-[hsl(var(--terracotta-600))]">
                      ({newLeadCount} nieuw)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">Leads</p>
              </div>
            </div>
            {/* Mini pipeline funnel */}
            <div className="mt-3 pt-2 border-t border-border/40">
              <PipelineFunnel stageCounts={stageCounts} totalLeads={totalLeads} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Tabs ── */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-9">
          <TabsTrigger value="leads" className="gap-1.5 text-xs">
            <TrendingUp className="h-3.5 w-3.5" /> Leads & Pipeline
            {newLeadCount > 0 && (
              <Badge className="bg-[hsl(var(--terracotta-500))] text-white text-[10px] px-1.5 py-0 h-4 ml-0.5">
                {newLeadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="customers" className="gap-1.5 text-xs">
            <Users className="h-3.5 w-3.5" /> Klanten
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 ml-0.5">
              {customers.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* ── CUSTOMERS TAB ── */}
        <TabsContent value="customers" className="mt-4">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op naam, e-mail of training..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
            <span className="text-xs text-muted-foreground">{filteredCustomers.length} resultaten</span>
            <Button
              size="sm"
              className="ml-auto gap-1.5 bg-[hsl(var(--terracotta-600))] hover:bg-[hsl(var(--terracotta-700))] text-white"
              onClick={() => setShowNewClient(true)}
            >
              <Plus className="h-3.5 w-3.5" /> Nieuwe klant
            </Button>
          </div>

          <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
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
                        onClick={() => setSelectedCustomerEmail(customer.email)}
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
        <TabsContent value="leads" className="mt-4">
          <CrmPipelineSection onLeadsChange={fetchAllLeads} />
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
