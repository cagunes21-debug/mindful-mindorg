-- Drop old constraint if exists and update to new status values
-- First update any existing 'contacted' leads to 'contact_attempt'
UPDATE leads SET status = 'contact_attempt' WHERE status = 'contacted';

-- Drop old check constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;

-- Add new constraint with 6+1 stages
ALTER TABLE leads ADD CONSTRAINT leads_status_check 
CHECK (status IN ('new', 'contact_attempt', 'in_conversation', 'intake_scheduled', 'registered', 'converted_to_client', 'not_interested'));