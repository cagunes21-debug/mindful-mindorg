
-- Intake & intentie velden op enrollments (per traject, niet per registratie)
ALTER TABLE public.enrollments
  ADD COLUMN intake_reason TEXT,
  ADD COLUMN intake_theme TEXT,
  ADD COLUMN intake_goal TEXT;

-- Gestructureerde trainer-notities per enrollment
CREATE TABLE public.trainer_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  note_type TEXT NOT NULL DEFAULT 'general',
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.trainer_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage trainer notes"
ON public.trainer_notes
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_trainer_notes_updated_at
BEFORE UPDATE ON public.trainer_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
