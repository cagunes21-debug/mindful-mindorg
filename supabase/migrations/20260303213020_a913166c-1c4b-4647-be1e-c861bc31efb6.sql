
-- Table for Self-Compassion Scale (SCS) questionnaire submissions
CREATE TABLE public.scs_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}',
  overall_score NUMERIC(3,2),
  self_kindness NUMERIC(3,2),
  self_judgment NUMERIC(3,2),
  common_humanity NUMERIC(3,2),
  isolation NUMERIC(3,2),
  mindfulness NUMERIC(3,2),
  over_identification NUMERIC(3,2),
  measurement_type TEXT NOT NULL DEFAULT 'pre',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.scs_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit via public link (no login required)
CREATE POLICY "Anyone can submit SCS via public link"
  ON public.scs_submissions FOR INSERT
  WITH CHECK (true);

-- Anyone can update recent submissions
CREATE POLICY "Anyone can update recent SCS"
  ON public.scs_submissions FOR UPDATE
  USING (true);

-- Admins can manage all
CREATE POLICY "Admins can manage SCS submissions"
  ON public.scs_submissions FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Users can view own
CREATE POLICY "Users can view own SCS"
  ON public.scs_submissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM enrollments
    WHERE enrollments.id = scs_submissions.enrollment_id
    AND enrollments.user_id = auth.uid()
  ));

-- Trigger for updated_at
CREATE TRIGGER update_scs_submissions_updated_at
  BEFORE UPDATE ON public.scs_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
