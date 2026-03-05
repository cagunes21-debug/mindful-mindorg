
-- Fix customers view: drop and recreate with security_invoker
DROP VIEW IF EXISTS public.customers;
CREATE VIEW public.customers WITH (security_invoker = true) AS
  SELECT
    r.email,
    r.name,
    r.phone,
    array_agg(DISTINCT r.training_name) AS trainings,
    count(*) AS total_registrations,
    count(*) FILTER (WHERE r.payment_status = 'paid') AS paid_registrations,
    sum(CASE WHEN r.payment_status = 'paid' THEN COALESCE(r.price::numeric, 0) ELSE 0 END) AS total_spent,
    min(r.created_at) AS first_registration,
    max(r.created_at) AS last_registration
  FROM public.registrations r
  GROUP BY r.email, r.name, r.phone;
