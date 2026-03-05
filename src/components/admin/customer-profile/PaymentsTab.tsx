import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Euro, FileText, Loader2 } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  discount: number;
  total: number;
  created_at: string;
  notes: string | null;
}

interface OrderItem {
  id: string;
  order_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface Payment {
  id: string;
  order_id: string;
  amount: number;
  method: string;
  status: string;
  paid_at: string | null;
  created_at: string;
}

interface PaymentsTabProps {
  customerEmail: string;
}

const orderStatusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-muted text-muted-foreground",
};

export default function PaymentsTab({ customerEmail }: PaymentsTabProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancials();
  }, [customerEmail]);

  const fetchFinancials = async () => {
    setLoading(true);
    try {
      // Get client by email
      const { data: clientData } = await supabase
        .from("clients")
        .select("id")
        .eq("email", customerEmail)
        .limit(1);

      if (!clientData || clientData.length === 0) {
        setLoading(false);
        return;
      }

      const clientId = clientData[0].id;

      const [ordersRes, paymentsRes] = await Promise.all([
        supabase.from("orders").select("*").eq("client_id", clientId).order("created_at", { ascending: false }),
        supabase.from("payments").select("*").order("created_at", { ascending: false }),
      ]);

      const ordersData = (ordersRes.data || []) as Order[];
      setOrders(ordersData);

      if (ordersData.length > 0) {
        const orderIds = ordersData.map(o => o.id);
        const [itemsRes, filteredPayments] = await Promise.all([
          supabase.from("order_items").select("*").in("order_id", orderIds),
          Promise.resolve(
            (paymentsRes.data || []).filter((p: any) => orderIds.includes(p.order_id))
          ),
        ]);
        setOrderItems((itemsRes.data || []) as OrderItem[]);
        setPayments(filteredPayments as Payment[]);
      }
    } catch (err) {
      console.error("Error fetching financials:", err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        Geen bestellingen gevonden voor deze klant.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Orders */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-medium flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-muted-foreground" /> Bestellingen
          </p>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs h-8">Order ID</TableHead>
                  <TableHead className="text-xs h-8">Training</TableHead>
                  <TableHead className="text-xs h-8 text-right">Bedrag</TableHead>
                  <TableHead className="text-xs h-8">Status</TableHead>
                  <TableHead className="text-xs h-8">Datum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => {
                  const items = orderItems.filter(i => i.order_id === order.id);
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="text-xs py-2 font-mono">{order.order_number}</TableCell>
                      <TableCell className="text-xs py-2">
                        {items.map(i => i.description).join(", ") || "—"}
                      </TableCell>
                      <TableCell className="text-xs py-2 text-right font-medium">
                        €{order.total?.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="py-2">
                        <Badge className={`${orderStatusColors[order.status] || "bg-muted text-muted-foreground"} text-[10px] px-1.5 py-0`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs py-2 text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("nl-NL")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payments */}
      {payments.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <p className="text-sm font-medium flex items-center gap-1.5">
              <Euro className="h-4 w-4 text-muted-foreground" /> Betalingen
            </p>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs h-8">Bedrag</TableHead>
                    <TableHead className="text-xs h-8">Methode</TableHead>
                    <TableHead className="text-xs h-8">Status</TableHead>
                    <TableHead className="text-xs h-8">Betaald op</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map(payment => (
                    <TableRow key={payment.id}>
                      <TableCell className="text-xs py-2 font-medium">
                        €{payment.amount?.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-xs py-2">{payment.method}</TableCell>
                      <TableCell className="py-2">
                        <Badge className={`${paymentStatusColors[payment.status] || "bg-muted text-muted-foreground"} text-[10px] px-1.5 py-0`}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs py-2 text-muted-foreground">
                        {payment.paid_at
                          ? new Date(payment.paid_at).toLocaleDateString("nl-NL")
                          : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
