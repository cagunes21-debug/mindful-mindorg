
-- Fix: Change restrictive policies to permissive on training_content_items
DROP POLICY IF EXISTS "Admins can manage training content" ON public.training_content_items;
DROP POLICY IF EXISTS "Authenticated users can view visible content" ON public.training_content_items;

CREATE POLICY "Admins can manage training content"
ON public.training_content_items
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can view visible content"
ON public.training_content_items
FOR SELECT
TO authenticated
USING ((is_visible = true) AND ((release_date IS NULL) OR (release_date <= now())));
