import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const KANBAN_STAGES = [
  { key: "new", label: "Nieuw", gradient: "from-stone-100 to-stone-200", headerGradient: "from-stone-400 to-stone-500", text: "text-stone-700" },
  { key: "contact_attempt", label: "Gecontacteerd", gradient: "from-sky-50 to-sky-100", headerGradient: "from-sky-400 to-sky-500", text: "text-sky-700" },
  { key: "in_conversation", label: "In gesprek", gradient: "from-amber-50 to-amber-100", headerGradient: "from-amber-400 to-amber-500", text: "text-amber-700" },
  { key: "intake_scheduled", label: "Kennismaking", gradient: "from-violet-50 to-violet-100", headerGradient: "from-violet-400 to-violet-500", text: "text-violet-700" },
  { key: "registered", label: "Aangemeld", gradient: "from-emerald-50 to-emerald-100", headerGradient: "from-emerald-400 to-emerald-500", text: "text-emerald-700" },
];

interface KanbanPipelineProps {
  onStageClick?: (stageKey: string) => void;
}

export default function KanbanPipeline({ onStageClick }: KanbanPipelineProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("id, status")
      .not("status", "eq", "converted_to_client")
      .not("status", "eq", "not_interested");
    if (!error && data) {
      const c: Record<string, number> = {};
      data.forEach(l => { c[l.status] = (c[l.status] || 0) + 1; });
      setCounts(c);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const total = Object.values(counts).reduce((s, n) => s + n, 0);

  return (
    <div className="grid grid-cols-5 gap-3">
      {KANBAN_STAGES.map(stage => {
        const count = counts[stage.key] || 0;
        return (
          <div
            key={stage.key}
            onClick={() => onStageClick?.(stage.key)}
            className={cn(
              "rounded-2xl border-0 overflow-hidden cursor-pointer",
              "hover:shadow-lg transition-all duration-300 group"
            )}
          >
            <div className={cn("p-4 bg-gradient-to-br", stage.gradient)}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2.5 rounded-xl bg-gradient-to-br shadow-sm",
                  "group-hover:scale-110 transition-transform",
                  stage.headerGradient
                )}>
                  <span className="text-sm font-bold text-white">{count}</span>
                </div>
                <div>
                  <p className={cn("text-lg font-bold text-foreground")}>{count}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{stage.label}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
