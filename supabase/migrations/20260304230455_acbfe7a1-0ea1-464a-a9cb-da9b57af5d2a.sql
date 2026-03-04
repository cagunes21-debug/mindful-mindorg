
-- Training content items table
CREATE TABLE public.training_content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_type TEXT NOT NULL CHECK (training_type IN ('msc_8_week', 'individual_6_sessions')),
  unit_number INTEGER NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL DEFAULT 'text' CHECK (content_type IN ('text', 'video', 'audio', 'pdf', 'link', 'assignment')),
  text_content TEXT,
  file_url TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  release_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.training_content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage training content"
  ON public.training_content_items FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can view visible content"
  ON public.training_content_items FOR SELECT
  TO authenticated
  USING (is_visible = true AND (release_date IS NULL OR release_date <= now()));

-- Training welcome content table
CREATE TABLE public.training_welcome_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_type TEXT NOT NULL UNIQUE CHECK (training_type IN ('msc_8_week', 'individual_6_sessions')),
  welcome_title TEXT NOT NULL DEFAULT '',
  welcome_message TEXT NOT NULL DEFAULT '',
  intro_video_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.training_welcome_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage welcome content"
  ON public.training_welcome_content FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can view welcome content"
  ON public.training_welcome_content FOR SELECT
  TO authenticated
  USING (true);
