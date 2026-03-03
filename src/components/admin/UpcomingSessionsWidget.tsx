import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { format, startOfWeek, endOfWeek, isToday, isTomorrow } from "date-fns";
import { nl } from "date-fns/locale";

interface UpcomingSession {
  id: string;
  enrollment_id: string;
  week_number: number;
  session_date: string;
  session_time: string | null;
  status: string;
  client_name: string | null;
  client_email: string | null;
  course_type: string;
}

const COURSE_LABELS: Record<string, string> = {
  individueel_6: "Individueel (6)",
  losse_sessie: "Losse Sessie",
};

export default function UpcomingSessionsWidget() {
  const [sessions, setSessions] = useState<UpcomingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingSessions();
  }, []);

  const fetchUpcomingSessions = async () => {
    const now = new Date();
    const weekStart = format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd");
    const weekEnd = format(endOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd");

    const { data: appts } = await supabase
      .from("session_appointments")
      .select("id, enrollment_id, week_number, session_date, session_time, status")
      .eq("status", "gepland")
      .gte("session_date", weekStart)
      .lte("session_date", weekEnd)
      .order("session_date")
      .order("session_time");

    if (!appts || appts.length === 0) {
      setSessions([]);
      setLoading(false);
      return;
    }

    // Get enrollment details
    const enrollmentIds = [...new Set(appts.map(a => a.enrollment_id))];
    const { data: enrollments } = await supabase
      .from("enrollments")
      .select("id, course_type, registration_id")
      .in("id", enrollmentIds);

    // Get registration details for names
    const regIds = (enrollments || []).map(e => e.registration_id).filter(Boolean) as string[];
    let regMap: Record<string, { name: string; email: string }> = {};
    if (regIds.length > 0) {
      const { data: regs } = await supabase
        .from("registrations")
        .select("id, name, email")
        .in("id", regIds);
      (regs || []).forEach(r => { regMap[r.id] = { name: r.name, email: r.email }; });
    }

    const enrMap: Record<string, { course_type: string; registration_id: string | null }> = {};
    (enrollments || []).forEach(e => { enrMap[e.id] = { course_type: e.course_type, registration_id: e.registration_id }; });

    const enriched: UpcomingSession[] = appts.map(a => {
      const enr = enrMap[a.enrollment_id];
      const reg = enr?.registration_id ? regMap[enr.registration_id] : null;
      return {
        ...a,
        session_date: a.session_date!,
        client_name: reg?.name || null,
        client_email: reg?.email || null,
        course_type: enr?.course_type || "individueel_6",
      };
    });

    setSessions(enriched);
    setLoading(false);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse flex items-center gap-3">
            <div className="h-5 w-5 rounded bg-muted" />
            <div className="h-4 w-48 rounded bg-muted" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (sessions.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-4 flex items-center gap-3 text-muted-foreground">
          <Calendar className="h-5 w-5" />
          <span className="text-sm">Geen geplande sessies deze week</span>
        </CardContent>
      </Card>
    );
  }

  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    if (isToday(date)) return "Vandaag";
    if (isTomorrow(date)) return "Morgen";
    return format(date, "EEEE", { locale: nl });
  };

  // Group by date
  const grouped: Record<string, UpcomingSession[]> = {};
  sessions.forEach(s => {
    if (!grouped[s.session_date]) grouped[s.session_date] = [];
    grouped[s.session_date].push(s);
  });

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Sessies deze week
          </h3>
          <Badge variant="secondary" className="text-xs">
            {sessions.length} sessie{sessions.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        <div className="space-y-2">
          {Object.entries(grouped).map(([date, dayAppts]) => (
            <div key={date}>
              <p className="text-xs font-medium text-muted-foreground mb-1 capitalize">
                {getDayLabel(date)} — {format(new Date(date + "T00:00:00"), "d MMMM", { locale: nl })}
              </p>
              <div className="space-y-1">
                {dayAppts.map(s => (
                  <div key={s.id} className="flex items-center gap-3 p-2 rounded-md bg-muted/40 border border-border/50">
                    <div className="flex items-center gap-1.5 text-xs w-16 shrink-0">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{s.session_time ? s.session_time.slice(0, 5) : "—"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <User className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">{s.client_name || s.client_email || "Onbekend"}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      {COURSE_LABELS[s.course_type] || s.course_type} · Sessie {s.week_number}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
