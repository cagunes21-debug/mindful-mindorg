
-- Add course_type to course_weeks to distinguish between programs
ALTER TABLE public.course_weeks 
ADD COLUMN course_type text NOT NULL DEFAULT 'msc_8week';

-- Add course_type to enrollments so we know which program someone is enrolled in
ALTER TABLE public.enrollments 
ADD COLUMN course_type text NOT NULL DEFAULT 'msc_8week';

-- Drop the unique constraint on week_number since we now have multiple course types
ALTER TABLE public.course_weeks DROP CONSTRAINT IF EXISTS course_weeks_week_number_key;

-- Create a unique constraint on (week_number, course_type) instead
ALTER TABLE public.course_weeks ADD CONSTRAINT course_weeks_week_number_course_type_key UNIQUE (week_number, course_type);
