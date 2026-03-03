
-- Create intake submissions table
CREATE TABLE public.intake_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE NOT NULL,
  
  -- Basis intake
  reason TEXT,
  main_theme TEXT,
  goal TEXT,
  expectations TEXT,
  
  -- Uitgebreid
  mindfulness_experience TEXT,
  health_situation TEXT,
  availability TEXT,
  emergency_contact TEXT,
  additional_notes TEXT,
  
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public link, no login required)
CREATE POLICY "Anyone can submit intake via public link"
ON public.intake_submissions
FOR INSERT
WITH CHECK (true);

-- Admins can view and manage
CREATE POLICY "Admins can manage intake submissions"
ON public.intake_submissions
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Users can view their own
CREATE POLICY "Users can view own intake"
ON public.intake_submissions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE enrollments.id = intake_submissions.enrollment_id
    AND enrollments.user_id = auth.uid()
  )
);

-- Anyone can update their own submission (for edits before submitting)
CREATE POLICY "Anyone can update recent intake"
ON public.intake_submissions
FOR UPDATE
USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_intake_submissions_updated_at
BEFORE UPDATE ON public.intake_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
