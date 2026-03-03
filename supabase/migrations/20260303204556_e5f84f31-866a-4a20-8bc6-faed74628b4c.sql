
-- Sessie-afspraken tabel: per sessie datum/tijd/status bijhouden
CREATE TABLE public.session_appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  session_date DATE,
  session_time TIME,
  status TEXT NOT NULL DEFAULT 'gepland',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(enrollment_id, week_number)
);

-- Enable RLS
ALTER TABLE public.session_appointments ENABLE ROW LEVEL SECURITY;

-- Admins can manage all session appointments
CREATE POLICY "Admins can manage session appointments"
ON public.session_appointments
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own session appointments via enrollment
CREATE POLICY "Users can view own session appointments"
ON public.session_appointments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE enrollments.id = session_appointments.enrollment_id
    AND enrollments.user_id = auth.uid()
  )
);

-- Trigger for updated_at
CREATE TRIGGER update_session_appointments_updated_at
BEFORE UPDATE ON public.session_appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
