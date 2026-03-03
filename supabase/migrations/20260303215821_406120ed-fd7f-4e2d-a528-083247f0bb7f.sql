
-- Table to store OTP codes for password reset
CREATE TABLE public.password_reset_otps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.password_reset_otps ENABLE ROW LEVEL SECURITY;

-- No direct access policies - only via edge function with service role
-- Clean up expired OTPs automatically
CREATE INDEX idx_password_reset_otps_email ON public.password_reset_otps (email, expires_at);
