-- Fix the customers view to use security_invoker so it respects RLS
DROP VIEW IF EXISTS public.customers;

CREATE VIEW public.customers 
WITH (security_invoker = true) AS
SELECT 
  email,
  MAX(name) as name,
  MAX(phone) as phone,
  COUNT(*) as total_registrations,
  COUNT(*) FILTER (WHERE payment_status = 'paid') as paid_registrations,
  SUM(CASE 
    WHEN payment_status = 'paid' THEN 
      COALESCE(
        NULLIF(regexp_replace(price, '[^0-9,.]', '', 'g'), '')::numeric,
        0
      )
    ELSE 0 
  END) as total_spent,
  MIN(created_at) as first_registration,
  MAX(created_at) as last_registration,
  array_agg(DISTINCT training_name) as trainings
FROM public.registrations
GROUP BY email;