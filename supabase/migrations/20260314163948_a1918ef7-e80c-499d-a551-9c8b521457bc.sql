
-- Fix: make view use invoker security instead of definer
drop view if exists public.training_dates_with_counts;

create or replace view public.training_dates_with_counts
with (security_invoker = on)
as
select
  td.*,
  count(r.id) filter (where r.status != 'cancelled') as registrations_count,
  count(r.id) filter (where r.payment_status = 'paid') as paid_count,
  count(r.id) filter (where r.payment_status = 'awaiting_payment') as awaiting_payment_count,
  td.max_spots - count(r.id) filter (where r.status != 'cancelled') as spots_remaining
from public.training_dates td
left join public.registrations r
  on r.training_name ilike '%' || split_part(td.name, '(', 1) || '%'
  and r.training_date::text like td.start_date::text || '%'
group by td.id;
