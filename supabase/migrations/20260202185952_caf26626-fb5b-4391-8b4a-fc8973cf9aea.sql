-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create registrations table to store training registrations
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  training_name TEXT NOT NULL,
  training_date TEXT,
  training_time TEXT,
  price TEXT,
  remarks TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add comment to table
COMMENT ON TABLE public.registrations IS 'Stores training registrations from the website';

-- Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting registrations (public - anyone can register)
CREATE POLICY "Anyone can create registrations"
ON public.registrations
FOR INSERT
WITH CHECK (true);

-- Create policy for admins to view all registrations (using service role)
-- For now, we'll allow authenticated users to view registrations
CREATE POLICY "Authenticated users can view registrations"
ON public.registrations
FOR SELECT
TO authenticated
USING (true);

-- Create policy for updating registrations (authenticated users only)
CREATE POLICY "Authenticated users can update registrations"
ON public.registrations
FOR UPDATE
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_registrations_updated_at
BEFORE UPDATE ON public.registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();