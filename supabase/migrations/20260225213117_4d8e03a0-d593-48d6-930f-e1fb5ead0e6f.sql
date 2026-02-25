ALTER TABLE public.course_weeks
ADD COLUMN notebook_url text DEFAULT NULL,
ADD COLUMN notebook_audio_url text DEFAULT NULL;