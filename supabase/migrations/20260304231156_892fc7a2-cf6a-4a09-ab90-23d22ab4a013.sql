
-- Create storage bucket for training content files
INSERT INTO storage.buckets (id, name, public)
VALUES ('training-content', 'training-content', false)
ON CONFLICT (id) DO NOTHING;

-- Admin can upload/manage files
CREATE POLICY "Admins can manage training content files"
ON storage.objects FOR ALL
USING (bucket_id = 'training-content' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'training-content' AND public.has_role(auth.uid(), 'admin'));

-- Authenticated users can read files
CREATE POLICY "Authenticated users can read training content files"
ON storage.objects FOR SELECT
USING (bucket_id = 'training-content' AND auth.role() = 'authenticated');
