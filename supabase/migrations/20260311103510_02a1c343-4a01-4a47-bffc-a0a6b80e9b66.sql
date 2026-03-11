
-- Fix training_welcome_content RLS policies (same restrictive issue)
DROP POLICY IF EXISTS "Admins can manage welcome content" ON public.training_welcome_content;
DROP POLICY IF EXISTS "Authenticated users can view welcome content" ON public.training_welcome_content;

CREATE POLICY "Admins can manage welcome content"
ON public.training_welcome_content
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can view welcome content"
ON public.training_welcome_content
FOR SELECT
TO authenticated
USING (true);
