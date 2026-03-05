
-- Create clients table
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone text,
  notes text,
  user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add 'invited' to enrollment_status enum
ALTER TYPE public.enrollment_status ADD VALUE IF NOT EXISTS 'invited';

-- Make user_id nullable in enrollments
ALTER TABLE public.enrollments ALTER COLUMN user_id DROP NOT NULL;

-- Add client_id to enrollments
ALTER TABLE public.enrollments ADD COLUMN client_id uuid REFERENCES public.clients(id);

-- RLS for clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage clients"
ON public.clients FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Allow anyone to read client by email (for auto-linking on signup)
CREATE OR REPLACE FUNCTION public.link_user_to_client(_user_id uuid, _email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Link user to client record
  UPDATE public.clients SET user_id = _user_id, updated_at = now() WHERE email = _email AND user_id IS NULL;
  
  -- Link user to enrollments via client_id
  UPDATE public.enrollments SET user_id = _user_id, updated_at = now()
  WHERE client_id IN (SELECT id FROM public.clients WHERE email = _email)
  AND user_id IS NULL;
END;
$$;
