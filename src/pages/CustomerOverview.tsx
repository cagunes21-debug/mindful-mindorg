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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Users, Search, Euro, ArrowLeft, Mail, Phone, ShoppingBag, Calendar } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
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

export default function CustomerOverview() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);

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
    } catch (error: any) {
      console.error("Error fetching customers:", error);
      toast({
        title: "Fout bij ophalen",
        description: "Kon klanten niet laden. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen bg-warm-50">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/admin")}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Terug
              </Button>
              <div>
                <h1 className="text-3xl font-light text-foreground">Klantenoverzicht</h1>
                <p className="text-muted-foreground mt-1">Alle klanten en hun statistieken</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sage-100 rounded-lg">
                    <Users className="h-5 w-5 text-sage-700" />
                  </div>
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
                  <div className="p-2 bg-terracotta-100 rounded-lg">
                    <Euro className="h-5 w-5 text-terracotta-700" />
                  </div>
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
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingBag className="h-5 w-5 text-blue-700" />
                  </div>
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
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.returningCustomers}</p>
                    <p className="text-sm text-muted-foreground">Terugkerende klanten</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
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
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Klanten</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-sage-600" />
                </div>
              ) : filteredCustomers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {searchQuery ? "Geen klanten gevonden met deze zoekopdracht" : "Nog geen klanten"}
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
                            <div className="font-medium">{customer.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                {customer.email}
                              </div>
                              {customer.phone && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {customer.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center">
                              <span className="font-semibold">{customer.total_registrations}</span>
                              <span className="text-xs text-muted-foreground">
                                ({customer.paid_registrations} betaald)
                              </span>
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
                                <Badge 
                                  key={idx} 
                                  variant="secondary" 
                                  className="bg-sage-100 text-sage-800 text-xs"
                                >
                                  {training.length > 20 ? training.substring(0, 20) + '...' : training}
                                </Badge>
                              ))}
                              {customer.trainings && customer.trainings.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{customer.trainings.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {customer.last_registration && 
                                format(new Date(customer.last_registration), "d MMM yyyy", { locale: nl })}
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
        </div>
      </main>

      <Footer />

      {/* Customer Profile Modal */}
      {selectedCustomerEmail && (
        <CustomerProfile
          email={selectedCustomerEmail}
          onClose={() => setSelectedCustomerEmail(null)}
        />
      )}
    </div>
  );
}
