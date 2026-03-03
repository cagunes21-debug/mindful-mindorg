import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { SessionAppointment, CourseWeek } from "./types";

interface SessionPlanningSectionProps {
  enrollmentId: string;
  courseType: string;
  weeks: CourseWeek[];
  appointments: SessionAppointment[];
  onAppointmentsChange: (updated: SessionAppointment[]) => void;
}

export default function SessionPlanningSection({
  enrollmentId, courseType, weeks, appointments, onAppointmentsChange,
}: SessionPlanningSectionProps) {
  const totalSessions = courseType === "individueel_6" ? 6 : 1;
  const completed = appointments.filter(a => a.status === "afgerond").length;
  const percentage = totalSessions > 0 ? (completed / totalSessions) * 100 : 0;

  const today = new Date().toISOString().split("T")[0];
  const nextSession = appointments
    .filter(a => a.status === "gepland" && a.session_date && a.session_date >= today)
    .sort((a, b) => (a.session_date || "").localeCompare(b.session_date || ""))[0] || null;

  const saveAppointment = async (weekNumber: number, date: string | null, time: string | null, status: string) => {
    const existing = appointments.find(a => a.enrollment_id === enrollmentId && a.week_number === weekNumber);
    try {
      if (existing) {
        const { error } = await supabase
          .from("session_appointments")
          .update({ session_date: date, session_time: time, status })
          .eq("id", existing.id);
        if (error) throw error;
        onAppointmentsChange(appointments.map(a => a.id === existing.id ? { ...a, session_date: date, session_time: time, status } : a));
      } else {
        const { data, error } = await supabase
          .from("session_appointments")
          .insert({ enrollment_id: enrollmentId, week_number: weekNumber, session_date: date, session_time: time, status })
          .select().single();
        if (error) throw error;
        onAppointmentsChange([...appointments, data as SessionAppointment]);
      }
      toast.success(`Sessie ${weekNumber} bijgewerkt`);
    } catch (err: any) {
      toast.error("Fout: " + err.message);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <Calendar className="h-3 w-3" /> Sessieplanning
        </p>
        <span className="text-xs font-medium">{completed} van {totalSessions} afgerond</span>
      </div>

      <Progress value={percentage} className="h-2" />

      {nextSession?.session_date ? (
        <div className="rounded-md bg-primary/5 border border-primary/20 p-2.5 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            Volgende sessie: {new Date(nextSession.session_date).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}
            {nextSession.session_time && ` om ${nextSession.session_time.slice(0, 5)}`}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <span>Nog geen sessie ingepland</span>
        </div>
      )}

      <div className="space-y-1.5">
        {weeks.map(week => {
          const appt = appointments.find(a => a.week_number === week.week_number);
          const apptStatus = appt?.status || "gepland";
          const statusIcon = apptStatus === "afgerond" ? <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> :
            apptStatus === "geannuleerd" ? <XCircle className="h-3.5 w-3.5 text-destructive" /> :
            <Clock className="h-3.5 w-3.5 text-accent-foreground" />;

          return (
            <div key={week.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 border border-border/50">
              {statusIcon}
              <span className="text-xs font-medium w-16 shrink-0">Sessie {week.week_number}</span>
              <Input
                type="date"
                className="h-7 text-xs flex-1 min-w-[120px]"
                value={appt?.session_date || ""}
                onChange={(e) => saveAppointment(week.week_number, e.target.value || null, appt?.session_time || null, apptStatus)}
              />
              <Input
                type="time"
                className="h-7 text-xs w-24"
                value={appt?.session_time?.slice(0, 5) || ""}
                onChange={(e) => saveAppointment(week.week_number, appt?.session_date || null, e.target.value ? e.target.value + ":00" : null, apptStatus)}
              />
              <Select
                value={apptStatus}
                onValueChange={(val) => saveAppointment(week.week_number, appt?.session_date || null, appt?.session_time || null, val)}
              >
                <SelectTrigger className="h-7 text-xs w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gepland">Gepland</SelectItem>
                  <SelectItem value="afgerond">Afgerond</SelectItem>
                  <SelectItem value="geannuleerd">Geannuleerd</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
