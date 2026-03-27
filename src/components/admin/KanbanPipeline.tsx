import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, User, Mail, Phone, GripVertical } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  interest: string | null;
  status: string;
  submission_date: string;
  notes: string | null;
}

const KANBAN_STAGES = [
  { key: "new", label: "Nieuw", bg: "bg-[#f1efe8]", headerBg: "bg-[#e8e5db]", text: "text-[#5f5e5a]", dot: "bg-[#5f5e5a]", border: "border-[#e0ded6]" },
  { key: "contact_attempt", label: "Gecontacteerd", bg: "bg-[#e6f1fb]/50", headerBg: "bg-[#d4e6f7]", text: "text-[#0c447c]", dot: "bg-[#0c447c]", border: "border-[#c8dff4]" },
  { key: "in_conversation", label: "In gesprek", bg: "bg-[#faeeda]/50", headerBg: "bg-[#f3dfbe]", text: "text-[#633806]", dot: "bg-[#633806]", border: "border-[#f0dfc0]" },
  { key: "intake_scheduled", label: "Kennismaking", bg: "bg-[#f5eefa]/50", headerBg: "bg-[#e8d9f5]", text: "text-[#4a1d8a]", dot: "bg-[#4a1d8a]", border: "border-[#dcc8f0]" },
  { key: "registered", label: "Aangemeld", bg: "bg-[#e1f5ee]/50", headerBg: "bg-[#c3e8db]", text: "text-[#085041]", dot: "bg-[#085041]", border: "border-[#c3e8db]" },
];

interface KanbanPipelineProps {
  onLeadClick?: (leadId: string) => void;
}

export default function KanbanPipeline({ onLeadClick }: KanbanPipelineProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedLead, setDraggedLead] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("id, first_name, last_name, email, phone_number, interest, status, submission_date, notes")
      .not("status", "eq", "converted_to_client")
      .not("status", "eq", "not_interested")
      .order("submission_date", { ascending: false });
    if (error) {
      console.error(error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("leadId", leadId);
    setDraggedLead(leadId);
  };

  const handleDragOver = (e: React.DragEvent, stageKey: string) => {
    e.preventDefault();
    setDragOverStage(stageKey);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    setDragOverStage(null);
    setDraggedLead(null);
    const leadId = e.dataTransfer.getData("leadId");
    if (!leadId) return;

    const lead = leads.find(l => l.id === leadId);
    if (!lead || lead.status === newStatus) return;

    // Optimistic update
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));

    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", leadId);

    if (error) {
      toast.error("Status bijwerken mislukt");
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: lead.status } : l));
    } else {
      const stage = KANBAN_STAGES.find(s => s.key === newStatus);
      toast.success(`${lead.first_name} → ${stage?.label}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {KANBAN_STAGES.map(stage => {
        const stageLeads = leads.filter(l => l.status === stage.key);
        const isOver = dragOverStage === stage.key;

        return (
          <div
            key={stage.key}
            className={cn(
              "flex-shrink-0 w-[210px] rounded-xl border transition-all duration-200",
              stage.border,
              stage.bg,
              isOver && "ring-2 ring-primary/30 scale-[1.01]"
            )}
            onDragOver={(e) => handleDragOver(e, stage.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.key)}
          >
            {/* Column header */}
            <div className={cn("px-3 py-2 rounded-t-xl flex items-center justify-between", stage.headerBg)}>
              <div className="flex items-center gap-1.5">
                <span className={cn("w-2 h-2 rounded-full", stage.dot)} />
                <span className={cn("text-xs font-semibold", stage.text)}>{stage.label}</span>
              </div>
              <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 h-4 border-0", stage.text, stage.bg)}>
                {stageLeads.length}
              </Badge>
            </div>

            {/* Cards */}
            <div className="p-1.5 space-y-1.5 min-h-[80px] max-h-[280px] overflow-y-auto">
              {stageLeads.length === 0 && (
                <div className={cn("text-center py-4 text-[10px]", stage.text, "opacity-50")}>
                  Geen leads
                </div>
              )}
              {stageLeads.map(lead => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                  onClick={() => onLeadClick?.(lead.id)}
                  className={cn(
                    "bg-white/80 backdrop-blur-sm rounded-lg p-2.5 cursor-grab active:cursor-grabbing",
                    "border border-border/30 hover:border-border/60 hover:shadow-sm transition-all",
                    "group",
                    draggedLead === lead.id && "opacity-40 scale-95"
                  )}
                >
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-xs font-medium text-foreground leading-tight">
                      {lead.first_name} {lead.last_name}
                    </p>
                    <GripVertical className="h-3 w-3 text-muted-foreground/30 group-hover:text-muted-foreground/60 flex-shrink-0 mt-0.5" />
                  </div>
                  {lead.interest && (
                    <p className="text-[10px] text-muted-foreground mt-1 truncate">{lead.interest}</p>
                  )}
                  <p className="text-[9px] text-muted-foreground/60 mt-1">
                    {format(new Date(lead.submission_date), "d MMM", { locale: nl })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
