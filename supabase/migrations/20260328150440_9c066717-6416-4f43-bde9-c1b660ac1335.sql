UPDATE public.msc_items
SET instructions_translations = instructions_translations || jsonb_build_object(
  '_slides', jsonb_build_object(
    'folder', 'resistance',
    'count', 7,
    'title', 'Unknotting Resistance'
  )
),
updated_at = now()
WHERE id = '31a836d1-ba2c-485d-90dd-f48bcefe411e';