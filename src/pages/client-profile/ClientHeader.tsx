import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Phone, Globe, Save, X, Plus, Calendar, Hash, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import type { CustomerData, Enrollment } from "@/components/admin/customer-profile/types";
import PhaseStepperBar from "./PhaseStepperBar";

interface ClientHeaderProps {
  customer: CustomerData;
  enrollments: Enrollment[];
  clientRecord: { id: string; source: string | null; phone: string | null } | null;
  onClientRecordChange: (record: any) => void;
  onAddTraining: () => void;
}

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

function getStatusInfo(enrollments: Enrollment[]): { label: string; className: string } {
  if (enrollments.length === 0) return { label: "Nieuw", className: "bg-secondary text-secondary-foreground" };
  const active = enrollments.find(e => e.status === "active");
  if (!active) {
    if (enrollments.every(e => e.status === "completed")) return { label: "Afgerond", className: "bg-sage-100 text-sage-800 border-sage-200" };
    if (enrollments.some(e => e.status === "cancelled")) return { label: "Geannuleerd", className: "bg-destructive/10 text-destructive" };
    return { label: "Inactief", className: "bg-secondary text-secondary-foreground" };
  }
  if ((active.sessions_used || 0) === 0) return { label: "Intake", className: "bg-terracotta-100 text-terracotta-700 border-terracotta-200" };
  return { label: "In training", className: "bg-sage-100 text-sage-700 border-sage-200" };
}

export default function ClientHeader({ customer, enrollments, clientRecord, onClientRecordChange, onAddTraining }: ClientHeaderProps) {
  const navigate = useNavigate();
  const [editingSource, setEditingSource] = useState(false);
  const [sourceValue, setSourceValue] = useState(clientRecord?.source || "");
  const status = getStatusInfo(enrollments);

  const activeEnrollment = enrollments.find(e => e.status === "active");
  const totalSessions = activeEnrollment?.sessions_total || 6;
  const usedSessions = activeEnrollment?.sessions_used || 0;
  const totalRegistrations = customer.total_registrations || 0;

  const saveSource = async () => {
    if (!clientRecord) return;
    try {
      const { error } = await supabase.from("clients").update({ source: sourceValue.trim() || null } as any).eq("id", clientRecord.id);
      if (error) throw error;
      onClientRecordChange({ ...clientRecord, source: sourceValue.trim() || null });
      setEditingSource(false);
      toast.success("Bron opgeslagen");
    } catch (err: any) { toast.error("Fout: " + err.message); }
  };

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2">
          <ArrowLeft className="h-4 w-4" /> Terug
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5 rounded-xl border-primary/20 hover:bg-primary/5" onClick={onAddTraining}>
          <Plus className="h-3.5 w-3.5" /> Training toevoegen
        </Button>
      </div>

      {/* Hero card */}
      <Card className="border-0 bg-gradient-to-br from-warm-50 via-background to-terracotta-50/30 shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 shrink-0 ring-2 ring-white shadow-md">
              <AvatarFallback className="bg-gradient-to-br from-terracotta-200 to-terracotta-400 text-white font-bold text-lg">
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap mb-1">
                <h1 className="text-xl font-bold leading-tight text-foreground">{customer.name}</h1>
                <Badge className={`text-[10px] rounded-lg border ${status.className}`}>{status.label}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <a href={`mailto:${customer.email}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Mail className="h-3.5 w-3.5" />{customer.email}
                </a>
                {(customer.phone || clientRecord?.phone) && (
                  <a href={`tel:${customer.phone || clientRecord?.phone}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <Phone className="h-3.5 w-3.5" />{customer.phone || clientRecord?.phone}
                  </a>
                )}
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  {editingSource ? (
                    <span className="flex items-center gap-1">
                      <Select value={sourceValue} onValueChange={setSourceValue}>
                        <SelectTrigger className="h-6 text-xs w-28"><SelectValue placeholder="Bron..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="verwijzing">Verwijzing</SelectItem>
                          <SelectItem value="huisarts">Huisarts</SelectItem>
                          <SelectItem value="social_media">Social media</SelectItem>
                          <SelectItem value="mond_tot_mond">Mond-tot-mond</SelectItem>
                          <SelectItem value="overig">Overig</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={saveSource}><Save className="h-3 w-3" /></Button>
                      <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={() => setEditingSource(false)}><X className="h-3 w-3" /></Button>
                    </span>
                  ) : (
                    <button className="hover:text-foreground transition-colors" onClick={() => setEditingSource(true)}>
                      {clientRecord?.source || "Bron toevoegen"}
                    </button>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="rounded-xl bg-white/70 border border-white/80 p-3 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Hash className="h-3 w-3 text-terracotta-500" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Sessies</span>
              </div>
              <p className="text-lg font-bold text-foreground">{usedSessions}<span className="text-sm font-normal text-muted-foreground">/{totalSessions}</span></p>
            </div>
            <div className="rounded-xl bg-white/70 border border-white/80 p-3 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Calendar className="h-3 w-3 text-sage-500" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Gestart</span>
              </div>
              <p className="text-sm font-bold text-foreground">
                {activeEnrollment ? format(new Date(activeEnrollment.start_date), "d MMM ''yy", { locale: nl }) : "–"}
              </p>
            </div>
            <div className="rounded-xl bg-white/70 border border-white/80 p-3 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Clock className="h-3 w-3 text-warm-500" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Trainingen</span>
              </div>
              <p className="text-lg font-bold text-foreground">{totalRegistrations}</p>
            </div>
          </div>

          {/* Phase stepper */}
          {enrollments.length > 0 && (
            <div className="mt-4">
              <PhaseStepperBar enrollments={enrollments} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
