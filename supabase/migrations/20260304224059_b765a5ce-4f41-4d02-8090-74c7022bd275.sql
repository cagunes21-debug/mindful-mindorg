
CREATE TABLE public.therapy_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE NOT NULL,
  transcript TEXT NOT NULL DEFAULT '',
  helpvraag TEXT DEFAULT '',
  achtergrond TEXT DEFAULT '',
  belangrijkste_themas TEXT DEFAULT '',
  doelstelling TEXT DEFAULT '',
  observaties TEXT DEFAULT '',
  interventies TEXT DEFAULT '',
  session_number INTEGER,
  session_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.therapy_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage therapy sessions"
  ON public.therapy_sessions
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
