
-- Add unlocked_weeks array to enrollments (trainer toggles which sessions are visible)
ALTER TABLE public.enrollments
ADD COLUMN unlocked_weeks integer[] NOT NULL DEFAULT '{1}';

-- Add presentation_url to course_weeks (per-session presentation)
ALTER TABLE public.course_weeks
ADD COLUMN presentation_url text DEFAULT NULL;

-- Create presentations storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('presentations', 'presentations', true);

-- Authenticated users can view presentations
CREATE POLICY "Authenticated users can view presentations"
ON storage.objects FOR SELECT
USING (bucket_id = 'presentations');

-- Only admins can upload/manage presentations
CREATE POLICY "Admins can manage presentations"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'presentations' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update presentations"
ON storage.objects FOR UPDATE
USING (bucket_id = 'presentations' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete presentations"
ON storage.objects FOR DELETE
USING (bucket_id = 'presentations' AND public.has_role(auth.uid(), 'admin'));
