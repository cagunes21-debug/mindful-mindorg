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
import { Loader2, Users, Search, Euro, Mail, Phone, ShoppingBag, Calendar, Plus } from "lucide-react";
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

export default function AdminCustomersSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);
  const [showNewReg, setShowNewReg] = useState(false);
  const [newReg, setNewReg] = useState({ name: "", email: "", phone: "", training_name: "8-weekse Mindful Zelfcompassie Training", remarks: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCustomers();
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

  const stats = {
    totalCustomers: customers.length,
    totalRevenue: customers.reduce((sum, c) => sum + (c.total_spent || 0), 0),
    totalRegistrations: customers.reduce((sum, c) => sum + (c.total_registrations || 0), 0),
    returningCustomers: customers.filter(c => (c.total_registrations || 0) > 1).length,
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
              <div className="p-2 bg-green-100 rounded-lg"><Calendar className="h-5 w-5 text-green-700" /></div>
              <div>
                <p className="text-2xl font-semibold">{stats.returningCustomers}</p>
                <p className="text-sm text-muted-foreground">Terugkerend</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op naam, e-mail of training..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {filteredCustomers.length} van {customers.length} klanten
        </p>
        <Button size="sm" className="gap-2 ml-auto" onClick={() => setShowNewReg(true)}>
          <Plus className="h-4 w-4" /> Nieuwe klant
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-sage-600" />
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
                      <TableCell><div className="font-medium">{customer.name}</div></TableCell>
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
                        <span className="font-semibold text-terracotta-600">€{customer.total_spent?.toLocaleString('nl-NL') || 0}</span>
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

      {/* Customer Profile Modal */}
      {selectedCustomerEmail && (
        <CustomerProfile
          email={selectedCustomerEmail}
          onClose={() => setSelectedCustomerEmail(null)}
        />
      )}

      {/* New Registration Dialog */}
      <Dialog open={showNewReg} onOpenChange={setShowNewReg}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nieuwe aanmelding</DialogTitle>
            <DialogDescription>Maak handmatig een aanmelding aan voor een klant.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Naam *</Label>
              <Input value={newReg.name} onChange={e => setNewReg(p => ({ ...p, name: e.target.value }))} placeholder="Volledige naam" />
            </div>
            <div>
              <Label>E-mail *</Label>
              <Input type="email" value={newReg.email} onChange={e => setNewReg(p => ({ ...p, email: e.target.value }))} placeholder="email@voorbeeld.nl" />
            </div>
            <div>
              <Label>Telefoon</Label>
              <Input value={newReg.phone} onChange={e => setNewReg(p => ({ ...p, phone: e.target.value }))} placeholder="06-12345678" />
            </div>
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
            <div>
              <Label>Opmerkingen</Label>
              <Input value={newReg.remarks} onChange={e => setNewReg(p => ({ ...p, remarks: e.target.value }))} placeholder="Eventuele opmerkingen" />
            </div>
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
