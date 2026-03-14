
-- Add source field to clients table
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS source text DEFAULT NULL;

-- Add clinical intake fields to intake_submissions
ALTER TABLE public.intake_submissions ADD COLUMN IF NOT EXISTS suitability_assessment text DEFAULT NULL;
ALTER TABLE public.intake_submissions ADD COLUMN IF NOT EXISTS contraindications text DEFAULT NULL;
ALTER TABLE public.intake_submissions ADD COLUMN IF NOT EXISTS intake_date date DEFAULT NULL;
ALTER TABLE public.intake_submissions ADD COLUMN IF NOT EXISTS intake_duration_minutes integer DEFAULT NULL;
