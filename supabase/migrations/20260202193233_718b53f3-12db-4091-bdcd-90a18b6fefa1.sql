-- First create user_roles table and has_role function
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Function to check if user has a role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Admins can manage user roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Now create course content tables
-- Create enum for participant enrollment status
CREATE TYPE public.enrollment_status AS ENUM ('active', 'completed', 'paused', 'cancelled');

-- Create table for course weeks (content per week)
CREATE TABLE public.course_weeks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_number INTEGER NOT NULL UNIQUE CHECK (week_number >= 1 AND week_number <= 8),
  title TEXT NOT NULL,
  description TEXT,
  theme TEXT,
  content JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create table for audio meditations
CREATE TABLE public.meditations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id UUID REFERENCES public.course_weeks(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  duration_minutes INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create table for homework assignments
CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id UUID REFERENCES public.course_weeks(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create table for participant enrollments
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  registration_id UUID REFERENCES public.registrations(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  current_week INTEGER DEFAULT 1 CHECK (current_week >= 1 AND current_week <= 8),
  status enrollment_status DEFAULT 'active',
  trainer_name TEXT,
  location TEXT,
  group_info TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create table for participant progress
CREATE TABLE public.participant_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE NOT NULL,
  week_id UUID REFERENCES public.course_weeks(id) ON DELETE CASCADE NOT NULL,
  meditation_id UUID REFERENCES public.meditations(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT,
  UNIQUE(enrollment_id, meditation_id),
  UNIQUE(enrollment_id, assignment_id)
);

-- Enable RLS on all tables
ALTER TABLE public.course_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participant_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for course_weeks
CREATE POLICY "Authenticated users can view course weeks"
ON public.course_weeks FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage course weeks"
ON public.course_weeks FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for meditations
CREATE POLICY "Authenticated users can view meditations"
ON public.meditations FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage meditations"
ON public.meditations FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for assignments
CREATE POLICY "Authenticated users can view assignments"
ON public.assignments FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage assignments"
ON public.assignments FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for enrollments
CREATE POLICY "Users can view their own enrollments"
ON public.enrollments FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all enrollments"
ON public.enrollments FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for participant_progress
CREATE POLICY "Users can view their own progress"
ON public.participant_progress FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON public.participant_progress FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.participant_progress FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress"
ON public.participant_progress FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('meditations', 'meditations', true);

-- Storage policies for meditation audio
CREATE POLICY "Anyone can view meditation files"
ON storage.objects FOR SELECT
USING (bucket_id = 'meditations');

CREATE POLICY "Admins can upload meditation files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'meditations' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update meditation files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'meditations' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete meditation files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'meditations' AND public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_course_weeks_updated_at
BEFORE UPDATE ON public.course_weeks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at
BEFORE UPDATE ON public.enrollments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();