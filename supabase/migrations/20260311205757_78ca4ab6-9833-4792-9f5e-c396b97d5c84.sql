
-- Add is_system flag to msc_items to distinguish pre-built content from user-added content
ALTER TABLE public.msc_items ADD COLUMN IF NOT EXISTS is_system boolean NOT NULL DEFAULT false;

-- Mark all existing items as system content
UPDATE public.msc_items SET is_system = true;
