import { Heart, Brain, Target, CheckCircle2 } from "lucide-react";
import type { Enrollment, SessionAppointment } from "@/components/admin/customer-profile/types";

const PHASES = [
  { key: "intake", label: "Intake", icon: Heart },
  { key: "in_training", label: "Training", icon: Brain },
  { key: "afronding", label: "Afronding", icon: Target },
  { key: "nazorg", label: "Nazorg", icon: CheckCircle2 },
] as const;

function getClientPhase(enrollments: Enrollment[]): string {
  if (enrollments.length === 0) return "intake";
  const active = enrollments.find(e => e.status === "active");
  if (enrollments.every(e => e.status === "completed")) return "nazorg";
  if (!active) return "intake";
  const total = active.sessions_total || 6;
  const used = active.sessions_used || 0;
  if (used === 0) return "intake";
  if (used >= total) return "afronding";
  return "in_training";
}

export default function PhaseStepperBar({ enrollments }: { enrollments: Enrollment[] }) {
  const currentPhase = getClientPhase(enrollments);
  const phaseIdx = PHASES.findIndex(p => p.key === currentPhase);

  return (
    <div className="flex items-center gap-1">
      {PHASES.map((phase, i) => {
        const isActive = i === phaseIdx;
        const isPast = i < phaseIdx;
        const Icon = phase.icon;
        return (
          <div key={phase.key} className="flex items-center flex-1">
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all w-full justify-center ${
              isActive ? "bg-primary/10 text-primary border border-primary/20"
              : isPast ? "bg-sage-100 text-sage-700"
              : "bg-secondary/60 text-muted-foreground"
            }`}>
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{phase.label}</span>
            </div>
            {i < PHASES.length - 1 && (
              <div className={`h-0.5 w-3 mx-0.5 rounded shrink-0 ${isPast ? "bg-sage-400" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
