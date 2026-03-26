import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Euro } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import type { Registration } from "@/components/admin/customer-profile/types";

export default function RegistrationsList({ registrations }: { registrations: Registration[] }) {
  if (registrations.length === 0) return <p className="text-xs text-muted-foreground py-3">Geen aanmeldingen gevonden.</p>;

  const getPaymentBadge = (status: string | null) => {
    if (status === "paid") return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px]">Betaald</Badge>;
    if (status === "awaiting_payment") return <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">Openstaand</Badge>;
    return <Badge variant="outline" className="text-[10px]">Open</Badge>;
  };

  return (
    <div className="space-y-1.5">
      {registrations.map(reg => (
        <Card key={reg.id} className="border-border/40">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{reg.training_name}</p>
                <div className="flex items-center gap-2">
                  {getPaymentBadge(reg.payment_status)}
                  {reg.price && (
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <Euro className="h-3 w-3" />€{reg.price}
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground">
                    {format(new Date(reg.created_at), "d MMM yyyy", { locale: nl })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
