-- Fix English MSC training date: March 4 is past, should be April 22 per project specs
UPDATE training_dates 
SET start_date = '2026-04-22', 
    updated_at = now()
WHERE id = 'ce4dc7e6-ee55-4669-b115-ed60715e2878';