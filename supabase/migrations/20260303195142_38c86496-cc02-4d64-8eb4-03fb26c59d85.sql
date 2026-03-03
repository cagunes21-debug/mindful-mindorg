
ALTER TABLE public.enrollments 
ADD COLUMN visible_sections text[] NOT NULL DEFAULT '{meditations,assignments,presentations,notebooks}'::text[];
