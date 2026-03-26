import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Euro, CreditCard, Receipt, Search, FileText, ArrowDown, ArrowRight, Mail, Globe, Webhook, Database, CheckCircle2, XCircle, Info } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";

interface Order {
  id: string;
  order_number: string;
  client_id: string | null;
  status: string;
  subtotal: number;
  discount: number;
  total: number;
  notes: string | null;
  created_at: string;
  client_name?: string;
  client_email?: string;
  items_count?: number;
  paid_amount?: number;
}

interface OrderItem {
  id: string;
  order_id: string;
  training_id: string | null;
  registration_id: string | null;
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
  stripe_payment_id: string | null;
  notes: string | null;
  paid_at: string | null;
  created_at: string;
  order_number?: string;
  client_name?: string;
}

interface Training {
  id: string;
  name: string;
  type: string;
  sessions: number;
  price: number | null;
}

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const orderStatusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const orderStatusLabels: Record<string, string> = {
  draft: "Concept",
  pending: "In afwachting",
  confirmed: "Bevestigd",
  paid: "Betaald",
  cancelled: "Geannuleerd",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-purple-100 text-purple-800",
};

const paymentMethodLabels: Record<string, string> = {
  stripe: "Stripe",
  bank_transfer: "Bankoverschrijving",
  cash: "Contant",
  other: "Anders",
};

// ─── Payment Flow Diagram ─────────────────────────────────────────────────────

const FLOW_STEPS = [
  {
    id: 1,
    title: "Klant meldt zich aan",
    desc: "Via registratieformulier op de website",
    icon: Globe,
    bg: "bg-sage-50",
    border: "border-sage-200",
    iconBg: "bg-sage-100",
    iconColor: "text-sage-700",
  },
  {
    id: 2,
    title: "Registratie opgeslagen",
    desc: "Status: pending — zichtbaar in admin dashboard",
    icon: Database,
    bg: "bg-warm-50",
    border: "border-warm-200",
    iconBg: "bg-warm-100",
    iconColor: "text-warm-700",
  },
  {
    id: 3,
    title: "Admin genereert betaallink",
    desc: "Edge function: create-payment-link → Stripe Checkout sessie",
    icon: CreditCard,
    bg: "bg-terracotta-50",
    border: "border-terracotta-200",
    iconBg: "bg-terracotta-100",
    iconColor: "text-terracotta-700",
  },
  {
    id: 4,
    title: "E-mail met betaallink",
    desc: "Automatische bevestigingsmail via Resend met betaalknop",
    icon: Mail,
    bg: "bg-primary/5",
    border: "border-primary/20",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: 5,
    title: "Klant betaalt via Stripe",
    desc: "Stripe Checkout pagina — veilig en vertrouwd",
    icon: Euro,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
];

const FLOW_OUTCOMES = [
  {
    success: true,
    title: "Betaling gelukt",
    steps: [
      "Stripe stuurt webhook event",
      "Edge function: stripe-webhook verwerkt betaling",
      "Registratie → status: paid + paid_at",
      "Bevestigingsmail naar klant",
      "Klant ziet /betaling-succes",
    ],
  },
  {
    success: false,
    title: "Betaling geannuleerd",
    steps: [
      "Klant annuleert op Stripe pagina",
      "Klant wordt doorgestuurd naar /betaling-geannuleerd",
      "Registratie status blijft: awaiting_payment",
      "Betaallink blijft geldig voor nieuwe poging",
    ],
  },
];

const PRICE_MAP_DISPLAY = [
  { training: "Workshop Zelfcompassie", price: "€55" },
  { training: "8-weekse MSC Training", price: "€550" },
  { training: "Individueel Traject (6 sessies)", price: "€550" },
  { training: "MBSR – 4-daags intensief", price: "Op aanvraag" },
  { training: "MSC – 4-daags intensief", price: "Op aanvraag" },
];

function PaymentFlowDiagram() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-br from-emerald-50 via-background to-sage-50/30 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-1">Betalingsproces overzicht</h2>
          <p className="text-sm text-muted-foreground">
            Van aanmelding tot betalingsbevestiging — de volledige flow in beeld.
          </p>
        </CardContent>
      </Card>

      {/* Flow Steps */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground px-1">Stappen</h3>
        {FLOW_STEPS.map((step, i) => (
          <div key={step.id}>
            <Card className={`border ${step.border} ${step.bg} shadow-none`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`h-10 w-10 rounded-xl ${step.iconBg} flex items-center justify-center shrink-0`}>
                  <step.icon className={`h-5 w-5 ${step.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Stap {step.id}</span>
                  </div>
                  <p className="font-semibold text-sm text-foreground">{step.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </CardContent>
            </Card>
            {i < FLOW_STEPS.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Outcomes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground px-1">Uitkomst</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FLOW_OUTCOMES.map((outcome) => (
            <Card key={outcome.title} className={`border shadow-none ${outcome.success ? "border-emerald-200 bg-emerald-50/50" : "border-destructive/20 bg-destructive/5"}`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {outcome.success ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                  <span className="font-semibold text-sm">{outcome.title}</span>
                </div>
                <ol className="space-y-2">
                  {outcome.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className={`mt-0.5 h-4 w-4 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${outcome.success ? "bg-emerald-100 text-emerald-700" : "bg-destructive/10 text-destructive"}`}>
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Price mapping */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground px-1">Gekoppelde Stripe-prijzen</h3>
        <Card className="border shadow-none">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Training</TableHead>
                  <TableHead className="text-right">Prijs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PRICE_MAP_DISPLAY.map((p) => (
                  <TableRow key={p.training}>
                    <TableCell className="text-sm">{p.training}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{p.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminFinanceSection() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Create order state
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    client_id: "",
    notes: "",
    items: [{ training_id: "", description: "", quantity: 1, unit_price: 0 }] as { training_id: string; description: string; quantity: number; unit_price: number }[],
  });
  const [creating, setCreating] = useState(false);

  // Add payment state
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [paymentOrderId, setPaymentOrderId] = useState("");
  const [newPayment, setNewPayment] = useState({ amount: 0, method: "stripe", notes: "" });
  const [addingPayment, setAddingPayment] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [ordersRes, paymentsRes, trainingsRes, clientsRes] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("payments").select("*").order("created_at", { ascending: false }),
      supabase.from("trainings").select("id, name, type, sessions, price").eq("is_active", true),
      supabase.from("clients").select("id, first_name, last_name, email").order("first_name"),
    ]);

    const ordersData = (ordersRes.data || []) as any[];
    const clientsData = (clientsRes.data || []) as Client[];
    
    // Enrich orders with client info
    const enrichedOrders = ordersData.map((o: any) => {
      const client = clientsData.find(c => c.id === o.client_id);
      return {
        ...o,
        client_name: client ? `${client.first_name} ${client.last_name}`.trim() : "—",
        client_email: client?.email || "",
      };
    });

    // Enrich payments with order info
    const paymentsData = (paymentsRes.data || []) as any[];
    const enrichedPayments = paymentsData.map((p: any) => {
      const order = ordersData.find((o: any) => o.id === p.order_id);
      const client = order ? clientsData.find(c => c.id === order.client_id) : null;
      return {
        ...p,
        order_number: order?.order_number || "—",
        client_name: client ? `${client.first_name} ${client.last_name}`.trim() : "—",
      };
    });

    setOrders(enrichedOrders);
    setPayments(enrichedPayments);
    setTrainings((trainingsRes.data || []) as Training[]);
    setClients(clientsData);
    setLoading(false);
  };

  const handleCreateOrder = async () => {
    if (!newOrder.client_id) { toast.error("Selecteer een klant"); return; }
    const validItems = newOrder.items.filter(i => i.description.trim());
    if (validItems.length === 0) { toast.error("Voeg minstens één item toe"); return; }

    setCreating(true);
    try {
      const subtotal = validItems.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
      const { data: orderData, error: orderErr } = await supabase.from("orders").insert({
        client_id: newOrder.client_id,
        subtotal,
        total: subtotal,
        notes: newOrder.notes.trim() || null,
        status: "pending",
      }).select("id").single();
      if (orderErr) throw orderErr;

      const itemsToInsert = validItems.map(i => ({
        order_id: orderData.id,
        training_id: i.training_id || null,
        description: i.description,
        quantity: i.quantity,
        unit_price: i.unit_price,
        total: i.quantity * i.unit_price,
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(itemsToInsert);
      if (itemsErr) throw itemsErr;

      toast.success("Bestelling aangemaakt!");
      setShowCreateOrder(false);
      setNewOrder({ client_id: "", notes: "", items: [{ training_id: "", description: "", quantity: 1, unit_price: 0 }] });
      fetchAll();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setCreating(false);
  };

  const handleAddPayment = async () => {
    if (!paymentOrderId || newPayment.amount <= 0) {
      toast.error("Selecteer een bestelling en vul een bedrag in");
      return;
    }
    setAddingPayment(true);
    try {
      const { error } = await supabase.from("payments").insert({
        order_id: paymentOrderId,
        amount: newPayment.amount,
        method: newPayment.method,
        status: "completed",
        notes: newPayment.notes.trim() || null,
        paid_at: new Date().toISOString(),
      });
      if (error) throw error;

      // Update order status to paid
      await supabase.from("orders").update({ status: "paid" }).eq("id", paymentOrderId);

      toast.success("Betaling geregistreerd!");
      setShowAddPayment(false);
      setPaymentOrderId("");
      setNewPayment({ amount: 0, method: "stripe", notes: "" });
      fetchAll();
    } catch (err: any) { toast.error("Fout: " + err.message); }
    setAddingPayment(false);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (error) { toast.error("Fout bij bijwerken"); return; }
    toast.success("Status bijgewerkt");
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addItem = () => {
    setNewOrder(prev => ({
      ...prev,
      items: [...prev.items, { training_id: "", description: "", quantity: 1, unit_price: 0 }],
    }));
  };

  const updateItem = (index: number, field: string, value: any) => {
    setNewOrder(prev => {
      const items = [...prev.items];
      (items[index] as any)[field] = value;

      // Auto-fill from training
      if (field === "training_id" && value) {
        const training = trainings.find(t => t.id === value);
        if (training) {
          items[index].description = training.name;
          items[index].unit_price = training.price || 0;
        }
      }
      return { ...prev, items };
    });
  };

  const removeItem = (index: number) => {
    if (newOrder.items.length <= 1) return;
    setNewOrder(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // Stats
  const totalRevenue = payments.filter(p => p.status === "completed").reduce((sum, p) => sum + (p.amount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const paidOrders = orders.filter(o => o.status === "paid").length;

  const filteredOrders = orders.filter(o => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return o.order_number?.toLowerCase().includes(q) || o.client_name?.toLowerCase().includes(q) || o.client_email?.toLowerCase().includes(q);
  });

  const filteredPayments = payments.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.order_number?.toLowerCase().includes(q) || p.client_name?.toLowerCase().includes(q);
  });

  return (
    <div>
      {/* Finance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><Euro className="h-5 w-5 text-green-700" /></div>
              <div>
                <p className="text-2xl font-semibold">€{totalRevenue.toLocaleString("nl-NL")}</p>
                <p className="text-sm text-muted-foreground">Totale omzet</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><Receipt className="h-5 w-5 text-blue-700" /></div>
              <div>
                <p className="text-2xl font-semibold">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Bestellingen</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg"><FileText className="h-5 w-5 text-yellow-700" /></div>
              <div>
                <p className="text-2xl font-semibold">{pendingOrders}</p>
                <p className="text-sm text-muted-foreground">Openstaand</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg"><CreditCard className="h-5 w-5 text-green-700" /></div>
              <div>
                <p className="text-2xl font-semibold">{paidOrders}</p>
                <p className="text-sm text-muted-foreground">Betaald</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="orders" className="gap-2">
            <Receipt className="h-4 w-4" /> Bestellingen ({orders.length})
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" /> Betalingen ({payments.length})
          </TabsTrigger>
          <TabsTrigger value="flow" className="gap-2">
            <Info className="h-4 w-4" /> Betalingsproces
          </TabsTrigger>
        </TabsList>

        {/* PAYMENT FLOW TAB */}
        <TabsContent value="flow">
          <PaymentFlowDiagram />
        </TabsContent>

        {/* ORDERS TAB */}
        <TabsContent value="orders">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Zoek op bestelnummer of klant..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Button size="sm" className="gap-2 ml-auto" onClick={() => setShowCreateOrder(true)}>
              <Plus className="h-4 w-4" /> Nieuwe bestelling
            </Button>
          </div>

          <Card>
            <CardContent className="pt-4">
              {loading ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">Nog geen bestellingen</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bestelnr.</TableHead>
                      <TableHead>Klant</TableHead>
                      <TableHead className="text-right">Totaal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead className="text-right">Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell><span className="font-mono text-sm">{order.order_number}</span></TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.client_name}</p>
                            <p className="text-xs text-muted-foreground">{order.client_email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">€{(order.total || 0).toLocaleString("nl-NL")}</TableCell>
                        <TableCell>
                          <Select value={order.status} onValueChange={v => updateOrderStatus(order.id, v)}>
                            <SelectTrigger className="w-[140px] h-8">
                              <Badge className={`${orderStatusColors[order.status] || "bg-muted"} text-[10px] px-1.5 py-0`}>
                                {orderStatusLabels[order.status] || order.status}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Concept</SelectItem>
                              <SelectItem value="pending">In afwachting</SelectItem>
                              <SelectItem value="confirmed">Bevestigd</SelectItem>
                              <SelectItem value="paid">Betaald</SelectItem>
                              <SelectItem value="cancelled">Geannuleerd</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(order.created_at), "d MMM yyyy", { locale: nl })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setPaymentOrderId(order.id);
                            setNewPayment({ amount: order.total || 0, method: "stripe", notes: "" });
                            setShowAddPayment(true);
                          }}>
                            <CreditCard className="h-4 w-4 mr-1" /> Betaling
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAYMENTS TAB */}
        <TabsContent value="payments">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Zoek op bestelnummer of klant..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Button size="sm" variant="outline" className="gap-2 ml-auto" onClick={() => setShowAddPayment(true)}>
              <Plus className="h-4 w-4" /> Betaling registreren
            </Button>
          </div>

          <Card>
            <CardContent className="pt-4">
              {loading ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
              ) : filteredPayments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">Nog geen betalingen</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bestelling</TableHead>
                      <TableHead>Klant</TableHead>
                      <TableHead className="text-right">Bedrag</TableHead>
                      <TableHead>Methode</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Betaald op</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map(payment => (
                      <TableRow key={payment.id}>
                        <TableCell><span className="font-mono text-sm">{payment.order_number}</span></TableCell>
                        <TableCell className="font-medium">{payment.client_name}</TableCell>
                        <TableCell className="text-right font-semibold text-green-700">€{(payment.amount || 0).toLocaleString("nl-NL")}</TableCell>
                        <TableCell>{paymentMethodLabels[payment.method] || payment.method}</TableCell>
                        <TableCell>
                          <Badge className={`${paymentStatusColors[payment.status] || "bg-muted"} text-[10px] px-1.5 py-0`}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {payment.paid_at ? format(new Date(payment.paid_at), "d MMM yyyy HH:mm", { locale: nl }) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Order Dialog */}
      <Dialog open={showCreateOrder} onOpenChange={setShowCreateOrder}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nieuwe bestelling</DialogTitle>
            <DialogDescription>Maak een bestelling aan voor een klant.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Klant *</Label>
              <Select value={newOrder.client_id} onValueChange={v => setNewOrder(p => ({ ...p, client_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Selecteer klant..." /></SelectTrigger>
                <SelectContent>
                  {clients.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.first_name} {c.last_name} — {c.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Items</Label>
                <Button type="button" size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={addItem}>
                  <Plus className="h-3 w-3" /> Item toevoegen
                </Button>
              </div>
              {newOrder.items.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-3 space-y-2">
                  <div>
                    <Label className="text-xs">Training (optioneel)</Label>
                    <Select value={item.training_id} onValueChange={v => updateItem(idx, "training_id", v)}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Selecteer training..." /></SelectTrigger>
                      <SelectContent>
                        {trainings.map(t => (
                          <SelectItem key={t.id} value={t.id}>{t.name} — €{t.price}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Omschrijving *</Label>
                    <Input className="h-8 text-xs" value={item.description} onChange={e => updateItem(idx, "description", e.target.value)} placeholder="Omschrijving" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Aantal</Label>
                      <Input type="number" className="h-8 text-xs" value={item.quantity} onChange={e => updateItem(idx, "quantity", parseInt(e.target.value) || 1)} min={1} />
                    </div>
                    <div>
                      <Label className="text-xs">Prijs (€)</Label>
                      <Input type="number" className="h-8 text-xs" value={item.unit_price} onChange={e => updateItem(idx, "unit_price", parseFloat(e.target.value) || 0)} min={0} step={0.01} />
                    </div>
                  </div>
                  {newOrder.items.length > 1 && (
                    <Button type="button" size="sm" variant="ghost" className="h-6 text-xs text-destructive" onClick={() => removeItem(idx)}>
                      Verwijderen
                    </Button>
                  )}
                </div>
              ))}
              <div className="text-right text-sm font-medium">
                Totaal: €{newOrder.items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0).toLocaleString("nl-NL")}
              </div>
            </div>

            <div>
              <Label>Notities (optioneel)</Label>
              <Textarea value={newOrder.notes} onChange={e => setNewOrder(p => ({ ...p, notes: e.target.value }))} placeholder="Eventuele notities..." className="min-h-[60px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateOrder(false)}>Annuleren</Button>
            <Button onClick={handleCreateOrder} disabled={creating} className="gap-1.5">
              {creating && <Loader2 className="h-4 w-4 animate-spin" />}
              Bestelling aanmaken
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Betaling registreren</DialogTitle>
            <DialogDescription>Registreer een betaling voor een bestelling.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!paymentOrderId && (
              <div>
                <Label>Bestelling *</Label>
                <Select value={paymentOrderId} onValueChange={v => {
                  setPaymentOrderId(v);
                  const order = orders.find(o => o.id === v);
                  if (order) setNewPayment(p => ({ ...p, amount: order.total || 0 }));
                }}>
                  <SelectTrigger><SelectValue placeholder="Selecteer bestelling..." /></SelectTrigger>
                  <SelectContent>
                    {orders.filter(o => o.status !== "paid" && o.status !== "cancelled").map(o => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.order_number} — {o.client_name} — €{o.total}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Bedrag (€) *</Label>
              <Input type="number" value={newPayment.amount} onChange={e => setNewPayment(p => ({ ...p, amount: parseFloat(e.target.value) || 0 }))} min={0} step={0.01} />
            </div>
            <div>
              <Label>Betaalmethode</Label>
              <Select value={newPayment.method} onValueChange={v => setNewPayment(p => ({ ...p, method: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="bank_transfer">Bankoverschrijving</SelectItem>
                  <SelectItem value="cash">Contant</SelectItem>
                  <SelectItem value="other">Anders</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notities (optioneel)</Label>
              <Input value={newPayment.notes} onChange={e => setNewPayment(p => ({ ...p, notes: e.target.value }))} placeholder="Eventuele notities..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAddPayment(false); setPaymentOrderId(""); }}>Annuleren</Button>
            <Button onClick={handleAddPayment} disabled={addingPayment} className="gap-1.5">
              {addingPayment && <Loader2 className="h-4 w-4 animate-spin" />}
              Betaling registreren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
