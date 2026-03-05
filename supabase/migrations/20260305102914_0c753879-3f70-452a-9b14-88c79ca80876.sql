
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone_number text,
  message text,
  interest text,
  status text NOT NULL DEFAULT 'new lead',
  submission_date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage leads"
ON public.leads FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert leads"
ON public.leads FOR INSERT
WITH CHECK (true);
