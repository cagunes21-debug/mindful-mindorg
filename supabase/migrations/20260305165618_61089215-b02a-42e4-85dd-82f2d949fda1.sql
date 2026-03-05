
-- 1. newsletter_subscribers: Replace broad SELECT with admin-only
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.newsletter_subscribers;
CREATE POLICY "Admins can view newsletter subscribers"
  ON public.newsletter_subscribers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. registrations: Replace broad SELECT with admin-only
DROP POLICY IF EXISTS "Authenticated users can view registrations" ON public.registrations;
CREATE POLICY "Admins can view registrations"
  ON public.registrations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. password_reset_otps: Block all direct reads
ALTER TABLE public.password_reset_otps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No direct OTP reads"
  ON public.password_reset_otps FOR SELECT
  TO authenticated
  USING (false);

-- Also block anon from reading OTPs
CREATE POLICY "No anon OTP reads"
  ON public.password_reset_otps FOR SELECT
  TO anon
  USING (false);
