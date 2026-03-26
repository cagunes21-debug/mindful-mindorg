import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Phone, Globe, Save, X, Plus } from "lucide-react";
import { toast } from "sonner";
import type { CustomerData, Enrollment } from "@/components/admin/customer-profile/types";

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
    if (enrollments.every(e => e.status === "completed")) return { label: "Afgerond", className: "bg-sage-100 text-sage-800" };
    if (enrollments.some(e => e.status === "cancelled")) return { label: "Geannuleerd", className: "bg-destructive/10 text-destructive" };
    return { label: "Inactief", className: "bg-secondary text-secondary-foreground" };
  }
  if ((active.sessions_used || 0) === 0) return { label: "Intake", className: "bg-terracotta-100 text-terracotta-700" };
  return { label: "In training", className: "bg-sage-100 text-sage-700" };
}

export default function ClientHeader({ customer, enrollments, clientRecord, onClientRecordChange, onAddTraining }: ClientHeaderProps) {
  const navigate = useNavigate();
  const [editingSource, setEditingSource] = useState(false);
  const [sourceValue, setSourceValue] = useState(clientRecord?.source || "");
  const status = getStatusInfo(enrollments);

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
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon" onClick={() => navigate("/admin")} className="shrink-0 h-9 w-9 rounded-xl">
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Avatar className="h-11 w-11 shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
          {getInitials(customer.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-bold leading-tight">{customer.name}</h1>
          <Badge className={`text-[10px] rounded-lg ${status.className}`}>{status.label}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
          <a href={`mailto:${customer.email}`} className="flex items-center gap-1 hover:underline">
            <Mail className="h-3 w-3" />{customer.email}
          </a>
          {(customer.phone || clientRecord?.phone) && (
            <a href={`tel:${customer.phone || clientRecord?.phone}`} className="flex items-center gap-1 hover:underline">
              <Phone className="h-3 w-3" />{customer.phone || clientRecord?.phone}
            </a>
          )}
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
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
              <button className="hover:underline" onClick={() => setEditingSource(true)}>
                {clientRecord?.source || "Bron toevoegen"}
              </button>
            )}
          </span>
        </div>
      </div>

      <Button size="sm" variant="outline" className="gap-1.5 shrink-0 rounded-lg" onClick={onAddTraining}>
        <Plus className="h-3.5 w-3.5" /> Training
      </Button>
    </div>
  );
}
