-- Add notes column to registrations (for admin notes, separate from user remarks)
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS admin_notes text,
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Create index for tag searches
CREATE INDEX IF NOT EXISTS idx_registrations_tags ON public.registrations USING GIN(tags);

-- Create a customers view that aggregates registrations by email
CREATE OR REPLACE VIEW public.customers AS
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