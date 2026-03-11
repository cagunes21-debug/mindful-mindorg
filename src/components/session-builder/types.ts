export interface MscSession {
  id: string;
  week_number: number;
  title: string;
  description: string | null;
  default_duration_minutes: number;
}

export interface MscItem {
  id: string;
  session_id: string;
  title: string;
  type: string;
  duration_minutes: number;
  instructions_markdown: string | null;
  notes_for_therapist: string | null;
  tags: string[] | null;
  is_optional: boolean;
  sort_order: number;
  is_system: boolean;
}

export interface SessionPlanBlock {
  itemId: string;
  durationOverride?: number;
}

export const ITEM_TYPES: Record<string, string> = {
  meditation: "Meditatie",
  exercise: "Oefening",
  topic: "Onderwerp",
  informal_practice: "Informele praktijk",
  reflection: "Reflectie",
  homework: "Huiswerk",
  break: "Pauze",
  closing: "Afsluiting",
  check_in: "Check-in",
  teaching: "Teaching",
};

export const TYPE_COLORS: Record<string, string> = {
  meditation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  exercise: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  topic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  informal_practice: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  reflection: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  homework: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  break: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  closing: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  check_in: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  teaching: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
};
