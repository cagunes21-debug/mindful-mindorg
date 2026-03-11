
-- Fix ALL restrictive policies that affect participant access
-- The problem: ALL policies are RESTRICTIVE, meaning no PERMISSIVE policy exists
-- PostgreSQL requires at least one PERMISSIVE policy to grant access

-- ========== ENROLLMENTS ==========
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can manage all enrollments" ON public.enrollments;

CREATE POLICY "Users can view their own enrollments"
ON public.enrollments FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all enrollments"
ON public.enrollments FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ========== COURSE_WEEKS ==========
DROP POLICY IF EXISTS "Authenticated users can view course weeks" ON public.course_weeks;
DROP POLICY IF EXISTS "Admins can manage course weeks" ON public.course_weeks;

CREATE POLICY "Authenticated users can view course weeks"
ON public.course_weeks FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage course weeks"
ON public.course_weeks FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ========== MEDITATIONS ==========
DROP POLICY IF EXISTS "Authenticated users can view meditations" ON public.meditations;
DROP POLICY IF EXISTS "Admins can manage meditations" ON public.meditations;

CREATE POLICY "Authenticated users can view meditations"
ON public.meditations FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage meditations"
ON public.meditations FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ========== ASSIGNMENTS ==========
DROP POLICY IF EXISTS "Authenticated users can view assignments" ON public.assignments;
DROP POLICY IF EXISTS "Admins can manage assignments" ON public.assignments;

CREATE POLICY "Authenticated users can view assignments"
ON public.assignments FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage assignments"
ON public.assignments FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ========== PARTICIPANT_PROGRESS ==========
DROP POLICY IF EXISTS "Users can view their own progress" ON public.participant_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.participant_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.participant_progress;
DROP POLICY IF EXISTS "Users can delete their own progress" ON public.participant_progress;

CREATE POLICY "Users can view their own progress"
ON public.participant_progress FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON public.participant_progress FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.participant_progress FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress"
ON public.participant_progress FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- ========== TRAINING_WELCOME_CONTENT ==========
DROP POLICY IF EXISTS "Authenticated users can view welcome content" ON public.training_welcome_content;
DROP POLICY IF EXISTS "Admins can manage welcome content" ON public.training_welcome_content;

CREATE POLICY "Authenticated users can view welcome content"
ON public.training_welcome_content FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage welcome content"
ON public.training_welcome_content FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ========== TRAINING_CONTENT_ITEMS ==========
DROP POLICY IF EXISTS "Authenticated users can view visible content" ON public.training_content_items;
DROP POLICY IF EXISTS "Admins can manage training content" ON public.training_content_items;

CREATE POLICY "Authenticated users can view visible content"
ON public.training_content_items FOR SELECT TO authenticated
USING ((is_visible = true) AND (release_date IS NULL OR release_date <= now()));

CREATE POLICY "Admins can manage training content"
ON public.training_content_items FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ========== SESSION_APPOINTMENTS ==========
DROP POLICY IF EXISTS "Users can view own session appointments" ON public.session_appointments;
DROP POLICY IF EXISTS "Admins can manage session appointments" ON public.session_appointments;

CREATE POLICY "Users can view own session appointments"
ON public.session_appointments FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM enrollments WHERE enrollments.id = session_appointments.enrollment_id AND enrollments.user_id = auth.uid()));

CREATE POLICY "Admins can manage session appointments"
ON public.session_appointments FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ========== USER_ROLES (re-fix to ensure PERMISSIVE) ==========
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;

CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage user roles"
ON public.user_roles FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
