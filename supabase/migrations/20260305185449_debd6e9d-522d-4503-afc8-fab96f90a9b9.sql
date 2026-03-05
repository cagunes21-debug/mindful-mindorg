
-- MSC Sessions (e.g. Session 1, Session 2, etc.)
CREATE TABLE public.msc_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_number integer NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  default_duration_minutes integer NOT NULL DEFAULT 60,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.msc_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage msc_sessions"
  ON public.msc_sessions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can read msc_sessions"
  ON public.msc_sessions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- MSC Items (exercises, meditations, topics, etc.)
CREATE TABLE public.msc_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.msc_sessions(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL DEFAULT 'exercise',
  duration_minutes integer NOT NULL DEFAULT 5,
  instructions_markdown text DEFAULT '',
  notes_for_therapist text DEFAULT '',
  tags text[] DEFAULT '{}',
  is_optional boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.msc_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage msc_items"
  ON public.msc_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can read msc_items"
  ON public.msc_items FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Client Sessions (assembled session plans)
CREATE TABLE public.client_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  msc_session_id uuid NOT NULL REFERENCES public.msc_sessions(id),
  target_duration_minutes integer NOT NULL DEFAULT 60,
  selected_item_ids uuid[] DEFAULT '{}',
  duration_overrides jsonb DEFAULT '{}',
  generated_plan_markdown text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.client_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage client_sessions"
  ON public.client_sessions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can read client_sessions"
  ON public.client_sessions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Seed Session 1
INSERT INTO public.msc_sessions (week_number, title, description)
VALUES (1, 'Discovering Mindfulness and Self-Compassion', 'MSC Session 1 – Introduction to the core concepts of mindfulness and self-compassion.');
