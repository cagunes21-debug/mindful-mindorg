ALTER TABLE public.msc_items 
ADD COLUMN available_for text NOT NULL DEFAULT 'both' 
CHECK (available_for IN ('group', 'individual', 'both'));