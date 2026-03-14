ALTER TABLE public.intake_submissions 
  ADD COLUMN IF NOT EXISTS duration_of_issue text,
  ADD COLUMN IF NOT EXISTS daily_impact text,
  ADD COLUMN IF NOT EXISTS previous_therapy text;