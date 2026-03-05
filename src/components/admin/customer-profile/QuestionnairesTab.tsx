import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2, Copy, ClipboardList, BarChart3, FileText } from "lucide-react";
import { toast } from "sonner";
import type { Enrollment } from "./types";
import { COURSE_TYPES } from "./types";

interface QuestionnairesTabProps {
  enrollments: Enrollment[];
}

export default function QuestionnairesTab({ enrollments }: QuestionnairesTabProps) {
  const copyLink = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    toast.success(`${label} gekopieerd!`);
  };

  if (enrollments.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        Geen inschrijvingen gevonden. Maak eerst een inschrijving aan.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {enrollments.map(enrollment => {
        const intakeUrl = `${window.location.origin}/intake/${enrollment.id}`;
        const preUrl = `${window.location.origin}/vragenlijst/${enrollment.id}`;
        const postUrl = `${window.location.origin}/vragenlijst/${enrollment.id}?type=post`;

        const links = [
          { label: "Intake formulier", url: intakeUrl, icon: FileText, description: "Intakeformulier voor de deelnemer" },
          { label: "0-meting (baseline)", url: preUrl, icon: BarChart3, description: "Zelfcompassie vragenlijst — voormeting" },
          { label: "Nameting (follow-up)", url: postUrl, icon: BarChart3, description: "Zelfcompassie vragenlijst — nameting" },
        ];

        return (
          <Card key={enrollment.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm flex-1">
                  {COURSE_TYPES[enrollment.course_type] || enrollment.course_type}
                </span>
                <Badge variant="outline" className="text-[10px]">
                  Start: {new Date(enrollment.start_date).toLocaleDateString("nl-NL")}
                </Badge>
              </div>

              <div className="space-y-2">
                {links.map(({ label, url, icon: Icon, description }) => (
                  <div key={label} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/50">
                    <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 h-7 text-xs shrink-0"
                      onClick={() => copyLink(url, label)}
                    >
                      <Copy className="h-3 w-3" /> Kopieer link
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
