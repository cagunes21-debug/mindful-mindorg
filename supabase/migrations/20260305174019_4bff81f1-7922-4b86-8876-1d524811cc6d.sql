CREATE POLICY "Users can read own roles permissive"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);