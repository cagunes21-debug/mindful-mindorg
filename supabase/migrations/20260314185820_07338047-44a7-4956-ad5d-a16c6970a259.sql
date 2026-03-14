-- Delete exact duplicates, keeping the first inserted (by id) of each pair
-- Pair 1: English MSC 2026-03-04
DELETE FROM training_dates WHERE id = 'e7aa2cc9-1cbc-4164-aa9f-48b1a45ea241';

-- Pair 2: NL MSC 2026-04-07
DELETE FROM training_dates WHERE id = 'b247d2a8-ba29-4368-a460-b0b801dae6cd';

-- Pair 3: Workshop 2026-06-01
DELETE FROM training_dates WHERE id = '8795fb85-8a1e-43dc-8b1b-97bbc53baba3';

-- Pair 4: Workshop 2026-09-05
DELETE FROM training_dates WHERE id = '990ff192-34b3-43f8-9a0f-79cc56418663';

-- Pair 5: NL MSC Sept 2026-09-28
DELETE FROM training_dates WHERE id = 'a00187b3-9c35-4695-b4e6-a3a254eb5c01';