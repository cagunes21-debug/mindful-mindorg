
-- Fix training_content_items: drop all policies and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Admins can manage training content" ON public.training_content_items;
DROP POLICY IF EXISTS "Authenticated users can view visible content" ON public.training_content_items;

CREATE POLICY "Admins can manage training content"
ON public.training_content_items
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can view visible content"
ON public.training_content_items
FOR SELECT
TO authenticated
USING ((is_visible = true) AND ((release_date IS NULL) OR (release_date <= now())));

-- Fix training_welcome_content: drop all policies and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Admins can manage welcome content" ON public.training_welcome_content;
DROP POLICY IF EXISTS "Authenticated users can view welcome content" ON public.training_welcome_content;

CREATE POLICY "Admins can manage welcome content"
ON public.training_welcome_content
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can view welcome content"
ON public.training_welcome_content
FOR SELECT
TO authenticated
USING (true);
