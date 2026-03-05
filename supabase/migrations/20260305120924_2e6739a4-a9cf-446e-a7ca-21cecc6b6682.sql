ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes text DEFAULT '';
ALTER TABLE public.leads ALTER COLUMN status SET DEFAULT 'new';
UPDATE public.leads SET status = 'new' WHERE status = 'new lead';
UPDATE public.leads SET status = 'not_interested' WHERE status = 'lost';
UPDATE public.leads SET status = 'converted_to_client' WHERE status = 'qualified';