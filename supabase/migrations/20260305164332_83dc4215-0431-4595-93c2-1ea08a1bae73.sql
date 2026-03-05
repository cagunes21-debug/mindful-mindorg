DROP POLICY "Anyone can update recent intake" ON public.intake_submissions;

CREATE POLICY "Users can update own intake"
ON public.intake_submissions FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE enrollments.id = intake_submissions.enrollment_id
    AND enrollments.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update intake submissions"
ON public.intake_submissions FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
);