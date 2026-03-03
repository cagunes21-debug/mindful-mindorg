import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, Calendar, Euro, ShoppingBag, ArrowLeft, BookOpen, Headphones, ClipboardList, Presentation, FileText } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";

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

interface Enrollment {
  id: string;
  course_type: string;
  start_date: string;
  status: string;
  unlocked_weeks: number[];
  visible_sections: string[];
  trainer_name: string | null;
}

interface CourseWeek {
  id: string;
  week_number: number;
  title: string;
  course_type: string;
}

const COURSE_TYPES: Record<string, string> = {
  msc_8week: "8-weekse Groepstraining",
  individueel_6: "Individueel (6 sessies)",
  losse_sessie: "Losse Sessie",
};

const SECTION_LABELS: Record<string, { label: string; icon: typeof Headphones }> = {
  meditations: { label: "Meditaties", icon: Headphones },
  assignments: { label: "Opdrachten", icon: ClipboardList },
  presentations: { label: "Presentaties", icon: Presentation },
  notebooks: { label: "Werkboek", icon: FileText },
};

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
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courseWeeks, setCourseWeeks] = useState<CourseWeek[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCustomerData();
  }, [email]);

  const fetchCustomerData = async () => {
    setIsLoading(true);
    try {
      const [customerRes, regRes, weeksRes] = await Promise.all([
        supabase.from("customers").select("*").eq("email", email).single(),
        supabase.from("registrations").select("id, training_name, training_date, status, payment_status, price, created_at").eq("email", email).order("created_at", { ascending: false }),
        supabase.from("course_weeks").select("id, week_number, title, course_type").order("week_number"),
      ]);

      if (customerRes.error) throw customerRes.error;
      setCustomer(customerRes.data);
      setRegistrations(regRes.data || []);
      setCourseWeeks((weeksRes.data || []) as CourseWeek[]);

      // Load enrollments linked to this customer's registrations
      const regIds = (regRes.data || []).map(r => r.id);
      if (regIds.length > 0) {
        const { data: enrollData } = await supabase
          .from("enrollments")
          .select("id, course_type, start_date, status, unlocked_weeks, visible_sections, trainer_name, registration_id")
          .in("registration_id", regIds)
          .order("created_at", { ascending: false });
        setEnrollments((enrollData || []) as Enrollment[]);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWeek = async (enrollment: Enrollment, weekNumber: number) => {
    const current = enrollment.unlocked_weeks || [1];
    const updated = current.includes(weekNumber)
      ? current.filter(w => w !== weekNumber)
      : [...current, weekNumber].sort((a, b) => a - b);

    setSaving(true);
    const { error } = await supabase
      .from("enrollments")
      .update({ unlocked_weeks: updated })
      .eq("id", enrollment.id);

    if (!error) {
      setEnrollments(prev => prev.map(e => e.id === enrollment.id ? { ...e, unlocked_weeks: updated } : e));
      toast.success(`Sessie ${weekNumber} ${updated.includes(weekNumber) ? 'vrijgegeven' : 'vergrendeld'}`);
    } else {
      toast.error("Kon niet opslaan");
    }
    setSaving(false);
  };

  const toggleSection = async (enrollment: Enrollment, section: string) => {
    const current = enrollment.visible_sections || ['meditations', 'assignments', 'presentations', 'notebooks'];
    const updated = current.includes(section)
      ? current.filter(s => s !== section)
      : [...current, section];

    setSaving(true);
    const { error } = await supabase
      .from("enrollments")
      .update({ visible_sections: updated })
      .eq("id", enrollment.id);

    if (!error) {
      setEnrollments(prev => prev.map(e => e.id === enrollment.id ? { ...e, visible_sections: updated } : e));
      toast.success(`${SECTION_LABELS[section]?.label} ${updated.includes(section) ? 'zichtbaar' : 'verborgen'}`);
    } else {
      toast.error("Kon niet opslaan");
    }
    setSaving(false);
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

  if (!customer) return null;

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

          {/* Enrollments with toggles */}
          {enrollments.length > 0 && (
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Inschrijvingen & Toegang
              </h3>
              <div className="space-y-4">
                {enrollments.map(enrollment => {
                  const weeks = courseWeeks.filter(w => w.course_type === enrollment.course_type);
                  const label = enrollment.course_type === "msc_8week" ? "Week" : "Sessie";
                  const enrollmentStatusColor = enrollment.status === "active" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground";

                  return (
                    <Card key={enrollment.id}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{COURSE_TYPES[enrollment.course_type] || enrollment.course_type}</Badge>
                            <Badge className={enrollmentStatusColor}>{enrollment.status}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Start: {new Date(enrollment.start_date).toLocaleDateString("nl-NL")}
                          </span>
                        </div>

                        {/* Session toggles */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Sessies vrijgeven:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {weeks.map(week => {
                              const isUnlocked = (enrollment.unlocked_weeks || [1]).includes(week.week_number);
                              return (
                                <button
                                  key={week.id}
                                  onClick={() => toggleWeek(enrollment, week.week_number)}
                                  disabled={saving}
                                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                                    isUnlocked
                                      ? "bg-primary/10 text-primary border border-primary/30"
                                      : "bg-muted text-muted-foreground border border-border"
                                  }`}
                                >
                                  {label} {week.week_number}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Content visibility */}
                        <div className="border-t pt-3">
                          <p className="text-xs text-muted-foreground mb-2">Zichtbare inhoud:</p>
                          <div className="flex flex-wrap gap-3">
                            {Object.entries(SECTION_LABELS).map(([key, { label: sectionLabel }]) => {
                              const isVisible = (enrollment.visible_sections || ['meditations', 'assignments', 'presentations', 'notebooks']).includes(key);
                              return (
                                <label key={key} className="flex items-center gap-1.5 cursor-pointer">
                                  <Checkbox
                                    checked={isVisible}
                                    disabled={saving}
                                    onCheckedChange={() => toggleSection(enrollment, key)}
                                  />
                                  <span className="text-xs">{sectionLabel}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

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
