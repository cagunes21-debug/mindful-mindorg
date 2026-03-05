
-- Add missing admin-only SELECT policies for all error-level tables

-- clients
CREATE POLICY "Admins can view clients"
  ON public.clients FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- therapy_sessions
CREATE POLICY "Admins can view therapy sessions"
  ON public.therapy_sessions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- trainer_notes
CREATE POLICY "Admins can view trainer notes"
  ON public.trainer_notes FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- orders
CREATE POLICY "Admins can view orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- order_items
CREATE POLICY "Admins can view order items"
  ON public.order_items FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- payments
CREATE POLICY "Admins can view payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- leads
CREATE POLICY "Admins can view leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
