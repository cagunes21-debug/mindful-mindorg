import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Users, Calendar, Mail, Phone, MessageSquare, RefreshCw, CreditCard, Send, ExternalLink, Search, Download, Euro } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  training_name: string;
  training_date: string | null;
  training_time: string | null;
  price: string | null;
  remarks: string | null;
  status: string;
  payment_status: string | null;
  payment_link: string | null;
  stripe_session_id: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600 border-gray-200",
  awaiting_payment: "bg-amber-100 text-amber-700 border-amber-200",
  paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const paymentStatusLabels: Record<string, string> = {
  pending: "Nog niet verstuurd",
  awaiting_payment: "Betaallink verstuurd",
  paid: "Betaald",
};

const statusLabels: Record<string, string> = {
  pending: "In afwachting",
  confirmed: "Bevestigd",
  cancelled: "Geannuleerd",
  completed: "Afgerond",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSendingPayment, setIsSendingPayment] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setIsAuthenticated(true);
      fetchRegistrations();
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    checkAuth();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error: any) {
      console.error("Error fetching registrations:", error);
      toast({
        title: "Fout bij ophalen",
        description: "Kon aanmeldingen niet laden. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("registrations")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setRegistrations(prev =>
        prev.map(reg => (reg.id === id ? { ...reg, status: newStatus } : reg))
      );

      if (selectedRegistration?.id === id) {
        setSelectedRegistration(prev => prev ? { ...prev, status: newStatus } : null);
      }

      toast({
        title: "Status bijgewerkt",
        description: `Aanmelding is nu "${statusLabels[newStatus]}"`,
      });
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast({
        title: "Fout bij bijwerken",
        description: "Kon status niet bijwerken. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const sendPaymentLink = async (registration: Registration) => {
    setIsSendingPayment(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-link', {
        body: { 
          registrationId: registration.id,
          origin: window.location.origin,
        },
      });

      if (error) throw error;

      // Update local state
      setRegistrations(prev =>
        prev.map(reg => 
          reg.id === registration.id 
            ? { 
                ...reg, 
                status: "confirmed", 
                payment_status: "awaiting_payment",
                payment_link: data.paymentUrl,
              } 
            : reg
        )
      );

      if (selectedRegistration?.id === registration.id) {
        setSelectedRegistration(prev => 
          prev ? { 
            ...prev, 
            status: "confirmed", 
            payment_status: "awaiting_payment",
            payment_link: data.paymentUrl,
          } : null
        );
      }

      toast({
        title: "Betaallink verstuurd!",
        description: `Een e-mail met de betaallink is verstuurd naar ${registration.email}`,
      });
    } catch (error: any) {
      console.error("Error sending payment link:", error);
      toast({
        title: "Fout bij versturen",
        description: error.message || "Kon betaallink niet versturen. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSendingPayment(false);
    }
  };

  const filteredRegistrations = registrations
    .filter(reg => filterStatus === "all" || reg.status === filterStatus)
    .filter(reg => filterPaymentStatus === "all" || (reg.payment_status || "pending") === filterPaymentStatus)
    .filter(reg => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        reg.name.toLowerCase().includes(query) ||
        reg.email.toLowerCase().includes(query) ||
        reg.training_name.toLowerCase().includes(query)
      );
    });

  // Parse price from string like "€495" to number
  const parsePrice = (priceStr: string | null): number => {
    if (!priceStr) return 0;
    const match = priceStr.replace(/[^\d,.-]/g, '').replace(',', '.');
    return parseFloat(match) || 0;
  };

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === "pending").length,
    confirmed: registrations.filter(r => r.status === "confirmed").length,
    cancelled: registrations.filter(r => r.status === "cancelled").length,
    paid: registrations.filter(r => r.payment_status === "paid").length,
    totalRevenue: registrations
      .filter(r => r.payment_status === "paid")
      .reduce((sum, r) => sum + parsePrice(r.price), 0),
  };

  const exportToCSV = () => {
    const headers = ["Naam", "Email", "Telefoon", "Training", "Datum", "Tijd", "Prijs", "Status", "Betalingsstatus", "Betaald op", "Aangemeld op", "Opmerkingen"];
    const rows = filteredRegistrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone || "",
      reg.training_name,
      reg.training_date || "",
      reg.training_time || "",
      reg.price || "",
      statusLabels[reg.status] || reg.status,
      paymentStatusLabels[reg.payment_status || "pending"] || reg.payment_status,
      reg.paid_at ? format(new Date(reg.paid_at), "d-M-yyyy HH:mm") : "",
      format(new Date(reg.created_at), "d-M-yyyy HH:mm"),
      reg.remarks || "",
    ]);
    
    const csvContent = [
      headers.join(";"),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(";"))
    ].join("\n");
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `aanmeldingen_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sage-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-light text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Beheer alle aanmeldingen</p>
            </div>
            <Button
              onClick={fetchRegistrations}
              variant="outline"
              className="gap-2"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Vernieuwen
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sage-100 rounded-lg">
                    <Users className="h-5 w-5 text-sage-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Totaal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">In afwachting</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.confirmed}</p>
                    <p className="text-sm text-muted-foreground">Bevestigd</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Users className="h-5 w-5 text-red-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.cancelled}</p>
                    <p className="text-sm text-muted-foreground">Geannuleerd</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.paid}</p>
                    <p className="text-sm text-muted-foreground">Betaald</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-terracotta-100 rounded-lg">
                    <Euro className="h-5 w-5 text-terracotta-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">€{stats.totalRevenue.toLocaleString('nl-NL')}</p>
                    <p className="text-sm text-muted-foreground">Omzet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op naam, e-mail of training..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Alle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  <SelectItem value="pending">In afwachting</SelectItem>
                  <SelectItem value="confirmed">Bevestigd</SelectItem>
                  <SelectItem value="cancelled">Geannuleerd</SelectItem>
                  <SelectItem value="completed">Afgerond</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">Betaling:</span>
              <Select value={filterPaymentStatus} onValueChange={setFilterPaymentStatus}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Alle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  <SelectItem value="pending">Nog niet verstuurd</SelectItem>
                  <SelectItem value="awaiting_payment">Wacht op betaling</SelectItem>
                  <SelectItem value="paid">Betaald</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={exportToCSV}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Exporteer CSV
              </Button>
            </div>
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Aanmeldingen ({filteredRegistrations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-sage-600" />
                </div>
              ) : filteredRegistrations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Geen aanmeldingen gevonden</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Naam</TableHead>
                        <TableHead>Training</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Betaling</TableHead>
                        <TableHead>Aangemeld op</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{registration.name}</p>
                              <p className="text-sm text-muted-foreground">{registration.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="max-w-[200px] truncate">{registration.training_name}</p>
                          </TableCell>
                          <TableCell>{registration.training_date || "-"}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[registration.status] || statusColors.pending}>
                              {statusLabels[registration.status] || registration.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={paymentStatusColors[registration.payment_status || 'pending'] || paymentStatusColors.pending}>
                              {paymentStatusLabels[registration.payment_status || 'pending'] || registration.payment_status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(registration.created_at), "d MMM yyyy", { locale: nl })}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedRegistration(registration);
                                setIsDetailOpen(true);
                              }}
                            >
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Aanmelding details</DialogTitle>
            <DialogDescription>
              Bekijk en beheer deze aanmelding
            </DialogDescription>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Contactgegevens
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedRegistration.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${selectedRegistration.email}`} className="text-terracotta-600 hover:underline">
                      {selectedRegistration.email}
                    </a>
                  </div>
                  {selectedRegistration.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${selectedRegistration.phone}`} className="text-terracotta-600 hover:underline">
                        {selectedRegistration.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Training Info */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Training
                </h4>
                <div className="bg-warm-50 rounded-lg p-4 space-y-2">
                  <p className="font-medium">{selectedRegistration.training_name}</p>
                  {selectedRegistration.training_date && (
                    <p className="text-sm text-muted-foreground">
                      Startdatum: {selectedRegistration.training_date}
                    </p>
                  )}
                  {selectedRegistration.training_time && (
                    <p className="text-sm text-muted-foreground">
                      Tijd: {selectedRegistration.training_time}
                    </p>
                  )}
                  {selectedRegistration.price && (
                    <p className="text-sm font-medium text-terracotta-600">
                      {selectedRegistration.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Remarks */}
              {selectedRegistration.remarks && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Opmerkingen
                  </h4>
                  <p className="text-sm bg-muted/50 rounded-lg p-3">
                    {selectedRegistration.remarks}
                  </p>
                </div>
              )}

              {/* Payment Section */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Betaling
                </h4>
                <div className="bg-white rounded-lg p-4 border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={paymentStatusColors[selectedRegistration.payment_status || 'pending']}>
                      {paymentStatusLabels[selectedRegistration.payment_status || 'pending']}
                    </Badge>
                  </div>
                  
                  {selectedRegistration.paid_at && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Betaald op:</span>
                      <span className="text-sm font-medium">
                        {format(new Date(selectedRegistration.paid_at), "d MMM yyyy 'om' HH:mm", { locale: nl })}
                      </span>
                    </div>
                  )}

                  {selectedRegistration.payment_link && selectedRegistration.payment_status !== 'paid' && (
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => window.open(selectedRegistration.payment_link!, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Bekijk betaallink
                      </Button>
                    </div>
                  )}

                  {selectedRegistration.payment_status !== 'paid' && (
                    <Button
                      onClick={() => sendPaymentLink(selectedRegistration)}
                      disabled={isSendingPayment}
                      className="w-full gap-2 bg-terracotta-600 hover:bg-terracotta-700"
                    >
                      {isSendingPayment ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      {selectedRegistration.payment_link ? 'Betaallink opnieuw versturen' : 'Bevestigen & Betaallink versturen'}
                    </Button>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Status wijzigen
                </h4>
                <Select
                  value={selectedRegistration.status}
                  onValueChange={(value) => updateStatus(selectedRegistration.id, value)}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">In afwachting</SelectItem>
                    <SelectItem value="confirmed">Bevestigd</SelectItem>
                    <SelectItem value="cancelled">Geannuleerd</SelectItem>
                    <SelectItem value="completed">Afgerond</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Metadata */}
              <div className="text-xs text-muted-foreground pt-4 border-t">
                <p>Aangemeld: {format(new Date(selectedRegistration.created_at), "d MMMM yyyy 'om' HH:mm", { locale: nl })}</p>
                <p>Laatst bijgewerkt: {format(new Date(selectedRegistration.updated_at), "d MMMM yyyy 'om' HH:mm", { locale: nl })}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
