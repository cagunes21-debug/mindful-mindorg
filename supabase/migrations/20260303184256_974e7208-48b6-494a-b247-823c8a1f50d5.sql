
-- Make presentations bucket private
UPDATE storage.buckets SET public = false WHERE id = 'presentations';
