import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Mail, Phone, Calendar, Euro, ShoppingBag, Clock, AlertCircle, CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import type { CustomerData, SessionAppointment, Enrollment, Registration } from "./types";

interface OverviewTabProps {
  customer: CustomerData;
  enrollments: Enrollment[];
  registrations: Registration[];
  sessionAppointments: SessionAppointment[];
  onTrainingClick: (training: string) => void;
}

export default function OverviewTab({
  customer, enrollments, registrations, sessionAppointments, onTrainingClick,
}: OverviewTabProps) {
  const individualEnrollments = enrollments.filter(
    e => e.course_type === "individueel_6" || e.course_type === "losse_sessie"
  );
  const hasIndividual = individualEnrollments.length > 0;

  const totalSessions = individualEnrollments.reduce(
    (sum, e) => sum + (e.course_type === "individueel_6" ? 6 : 1), 0
  );
  const completed = sessionAppointments.filter(
    a => a.status === "afgerond" && individualEnrollments.some(e => e.id === a.enrollment_id)
  ).length;
  const percentage = totalSessions > 0 ? (completed / totalSessions) * 100 : 0;

  const today = new Date().toISOString().split("T")[0];
  const nextSession = sessionAppointments
    .filter(a => a.status === "gepland" && a.session_date && a.session_date >= today)
    .sort((a, b) => (a.session_date || "").localeCompare(b.session_date || ""))[0] || null;

  return (
    <div className="space-y-4">
      {/* Header info */}
      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          <a href={`mailto:${customer.email}`} className="hover:underline">{customer.email}</a>
        </span>
        {customer.phone && (
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <a href={`tel:${customer.phone}`} className="hover:underline">{customer.phone}</a>
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Aanmeldingen</p>
            <p className="text-lg font-semibold leading-tight">{customer.total_registrations}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Euro className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Totaal betaald</p>
            <p className="text-lg font-semibold leading-tight">€{customer.total_spent?.toLocaleString('nl-NL') || 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Klant sinds</p>
            <p className="text-lg font-semibold leading-tight">
              {format(new Date(customer.first_registration), "MMM yyyy", { locale: nl })}
            </p>
          </div>
        </div>
      </div>

      {/* Training badges */}
      {customer.trainings && customer.trainings.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-1.5">Actieve trainingen</p>
          <div className="flex flex-wrap gap-1.5">
            {customer.trainings.map((training, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => onTrainingClick(training)}
              >
                {training}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Session progress for individual */}
      {hasIndividual && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Sessie voortgang
              </span>
              <span>{completed} van {totalSessions} sessies afgerond</span>
            </div>
            <Progress value={percentage} className="h-2" />
            <div className="text-sm">
              {nextSession?.session_date ? (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>
                    Volgende sessie:{" "}
                    <strong>
                      {new Date(nextSession.session_date).toLocaleDateString("nl-NL", {
                        weekday: "short", day: "numeric", month: "short",
                      })}
                    </strong>
                    {nextSession.session_time && ` om ${nextSession.session_time.slice(0, 5)}`}
                  </span>
                </div>
              ) : (
                <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <AlertCircle className="h-3.5 w-3.5" /> Geen sessie gepland
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
