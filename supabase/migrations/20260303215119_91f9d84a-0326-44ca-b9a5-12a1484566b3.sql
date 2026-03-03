
-- Create a SECURITY DEFINER function to check if an enrollment exists (safe for public use)
CREATE OR REPLACE FUNCTION public.enrollment_exists(_enrollment_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.enrollments
    WHERE id = _enrollment_id
  )
$$;
