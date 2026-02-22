
-- Fix 1: Replace overly permissive UPDATE policy on registrations with admin-only
DROP POLICY "Authenticated users can update registrations" ON public.registrations;

CREATE POLICY "Only admins can update registrations"
ON public.registrations FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
