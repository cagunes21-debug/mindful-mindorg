ALTER TABLE public.training_content_items
ADD COLUMN IF NOT EXISTS is_system boolean NOT NULL DEFAULT false;