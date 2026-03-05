
-- 1. Fix scs_submissions: Replace broad UPDATE with enrollment-owner check
DROP POLICY IF EXISTS "Anyone can update recent SCS" ON public.scs_submissions;
CREATE POLICY "Users can update own SCS submissions"
  ON public.scs_submissions FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM enrollments
    WHERE enrollments.id = scs_submissions.enrollment_id
    AND enrollments.user_id = auth.uid()
  ));
