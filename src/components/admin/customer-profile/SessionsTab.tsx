import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, CheckCircle2, AlertCircle, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Enrollment, SessionAppointment } from "./types";
import { COURSE_TYPES } from "./types";

interface SessionsTabProps {
  enrollments: Enrollment[];
  sessionAppointments: SessionAppointment[];
  onEnrollmentsChange: (enrollments: Enrollment[]) => void;
}

export default function SessionsTab({ enrollments, sessionAppointments, onEnrollmentsChange }: SessionsTabProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const individualEnrollments = enrollments.filter(
    e => e.course_type === "individueel_6" || e.course_type === "losse_sessie"
  );

  const incrementSession = async (enrollment: Enrollment) => {
    const newUsed = (enrollment as any).sessions_used ?? 0;
    setUpdatingId(enrollment.id);
    try {
      const { error } = await supabase
        .from("enrollments")
        .update({ sessions_used: newUsed + 1 })
        .eq("id", enrollment.id);
      if (error) throw error;
      onEnrollmentsChange(
        enrollments.map(e =>
          e.id === enrollment.id ? { ...e, sessions_used: newUsed + 1 } as any : e
        )
      );
      toast.success("Sessie bijgewerkt");
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
    setUpdatingId(null);
  };

  if (individualEnrollments.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        Geen individuele trajecten gevonden voor deze klant.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {individualEnrollments.map(enrollment => {
        const sessionsTotal = (enrollment as any).sessions_total || (enrollment.course_type === "individueel_6" ? 6 : 1);
        const sessionsUsed = (enrollment as any).sessions_used || 0;
        const sessionsRemaining = sessionsTotal - sessionsUsed;
        const percentage = sessionsTotal > 0 ? (sessionsUsed / sessionsTotal) * 100 : 0;

        const appts = sessionAppointments.filter(a => a.enrollment_id === enrollment.id);

        return (
          <Card key={enrollment.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{COURSE_TYPES[enrollment.course_type] || enrollment.course_type}</p>
                  <p className="text-xs text-muted-foreground">Start: {new Date(enrollment.start_date).toLocaleDateString("nl-NL")}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 h-7 text-xs"
                  onClick={() => incrementSession(enrollment)}
                  disabled={updatingId === enrollment.id || sessionsUsed >= sessionsTotal}
                >
                  {updatingId === enrollment.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Plus className="h-3 w-3" />
                  )}
                  Sessie +1
                </Button>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Voortgang</span>
                  <span className="font-medium">{sessionsUsed} / {sessionsTotal} sessies</span>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {sessionsRemaining > 0
                    ? `Nog ${sessionsRemaining} sessie${sessionsRemaining !== 1 ? 's' : ''} te gaan`
                    : "Alle sessies afgerond ✓"
                  }
                </p>
              </div>

              {/* Appointments table */}
              {appts.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs h-8">Datum</TableHead>
                        <TableHead className="text-xs h-8">Sessie</TableHead>
                        <TableHead className="text-xs h-8">Status</TableHead>
                        <TableHead className="text-xs h-8">Notities</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appts.map(appt => (
                        <TableRow key={appt.id}>
                          <TableCell className="text-xs py-2">
                            {appt.session_date
                              ? new Date(appt.session_date).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })
                              : "—"}
                            {appt.session_time && ` ${appt.session_time.slice(0, 5)}`}
                          </TableCell>
                          <TableCell className="text-xs py-2">Sessie {appt.week_number}</TableCell>
                          <TableCell className="py-2">
                            <Badge
                              className={`text-[10px] px-1.5 py-0 ${
                                appt.status === "afgerond"
                                  ? "bg-green-100 text-green-800"
                                  : appt.status === "geannuleerd"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {appt.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs py-2 text-muted-foreground">{appt.notes || "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
