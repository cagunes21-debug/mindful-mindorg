export interface CustomerData {
  email: string;
  name: string;
  phone: string | null;
  total_registrations: number;
  paid_registrations: number;
  total_spent: number;
  first_registration: string;
  last_registration: string;
  trainings: string[];
}

export interface Registration {
  id: string;
  training_name: string;
  training_date: string | null;
  status: string;
  payment_status: string | null;
  price: string | null;
  created_at: string;
  admin_notes: string | null;
}

export interface Enrollment {
  id: string;
  course_type: string;
  start_date: string;
  status: string;
  unlocked_weeks: number[];
  visible_sections: string[];
  trainer_name: string | null;
  registration_id: string | null;
  intake_reason: string | null;
  intake_theme: string | null;
  intake_goal: string | null;
}

export interface TrainerNote {
  id: string;
  enrollment_id: string;
  note_type: string;
  content: string;
}

export interface CourseWeek {
  id: string;
  week_number: number;
  title: string;
  course_type: string;
}

export interface SessionAppointment {
  id: string;
  enrollment_id: string;
  week_number: number;
  session_date: string | null;
  session_time: string | null;
  status: string;
  notes: string | null;
}

export const COURSE_TYPES: Record<string, string> = {
  msc_8week: "8-weekse Groepstraining",
  individueel_6: "Individueel (6 sessies)",
  losse_sessie: "Losse Sessie",
};

export const SECTION_LABELS: Record<string, { label: string; icon: string }> = {
  meditations: { label: "Meditaties", icon: "Headphones" },
  assignments: { label: "Opdrachten", icon: "ClipboardList" },
  presentations: { label: "Presentaties", icon: "Presentation" },
  notebooks: { label: "Werkboek", icon: "FileText" },
};

export const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

export const paymentStatusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  awaiting_payment: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
};
