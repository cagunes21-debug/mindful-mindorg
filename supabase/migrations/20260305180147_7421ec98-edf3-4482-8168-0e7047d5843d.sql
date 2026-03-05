-- Drop the two restrictive SELECT policies that block access
DROP POLICY IF EXISTS "Users can read own roles permissive" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a single PERMISSIVE SELECT policy so users can read their own roles
CREATE POLICY "Users can read own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);