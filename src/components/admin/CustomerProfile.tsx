import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, Calendar, Euro, ShoppingBag, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface CustomerProfileProps {
  email: string;
  onClose: () => void;
}

interface CustomerData {
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

interface Registration {
  id: string;
  training_name: string;
  training_date: string | null;
  status: string;
  payment_status: string | null;
  price: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  awaiting_payment: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
};

export default function CustomerProfile({ email, onClose }: CustomerProfileProps) {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustomerData();
  }, [email]);

  const fetchCustomerData = async () => {
    setIsLoading(true);
    try {
      // Fetch customer summary from view
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .select("*")
        .eq("email", email)
        .single();

      if (customerError) throw customerError;
      setCustomer(customerData);

      // Fetch all registrations for this customer
      const { data: regData, error: regError } = await supabase
        .from("registrations")
        .select("id, training_name, training_date, status, payment_status, price, created_at")
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (regError) throw regError;
      setRegistrations(regData || []);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta-600" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle>Klantprofiel</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${customer.email}`} className="text-terracotta-600 hover:underline">
                  {customer.email}
                </a>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${customer.phone}`} className="text-terracotta-600 hover:underline">
                    {customer.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-sage-600" />
                  <span className="text-sm text-muted-foreground">Aanmeldingen</span>
                </div>
                <p className="text-2xl font-semibold mt-1">{customer.total_registrations}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-terracotta-600" />
                  <span className="text-sm text-muted-foreground">Totaal betaald</span>
                </div>
                <p className="text-2xl font-semibold mt-1">€{customer.total_spent?.toLocaleString('nl-NL') || 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-sage-600" />
                  <span className="text-sm text-muted-foreground">Klant sinds</span>
                </div>
                <p className="text-lg font-semibold mt-1">
                  {format(new Date(customer.first_registration), "MMM yyyy", { locale: nl })}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trainings */}
          <div>
            <h3 className="font-medium mb-3">Gevolgde trainingen</h3>
            <div className="flex flex-wrap gap-2">
              {customer.trainings?.map((training, idx) => (
                <Badge key={idx} variant="secondary" className="bg-sage-100 text-sage-800">
                  {training}
                </Badge>
              ))}
            </div>
          </div>

          {/* Registration History */}
          <div>
            <h3 className="font-medium mb-3">Aanmeldingsgeschiedenis</h3>
            <div className="space-y-3">
              {registrations.map((reg) => (
                <Card key={reg.id}>
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{reg.training_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {reg.training_date || format(new Date(reg.created_at), "d MMM yyyy", { locale: nl })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={statusColors[reg.status]}>
                          {reg.status}
                        </Badge>
                        <Badge className={paymentStatusColors[reg.payment_status || 'pending']}>
                          {reg.payment_status || 'pending'}
                        </Badge>
                        {reg.price && (
                          <span className="text-sm font-medium text-terracotta-600">
                            {reg.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
