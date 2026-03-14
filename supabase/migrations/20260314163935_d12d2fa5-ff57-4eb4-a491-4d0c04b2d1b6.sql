
-- training_dates table
create table public.training_dates (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  short_name    text,
  type          text not null default 'msc_8week',
  language      text not null default 'nl',
  day_label     text,
  start_date    date not null,
  time_start    text,
  time_end      text,
  follow_up_dates text,
  location      text default 'Online',
  price         integer not null default 550,
  early_bird_price integer,
  early_bird_deadline date,
  max_spots     integer default 10,
  is_full       boolean default false,
  is_featured   boolean default false,
  is_visible    boolean default true,
  notes         text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- RLS
alter table public.training_dates enable row level security;

create policy "Public can view visible training dates"
  on public.training_dates for select
  using (is_visible = true);

create policy "Admins can manage training dates"
  on public.training_dates for all
  to authenticated
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

-- Seed data
insert into public.training_dates (name, short_name, type, language, day_label, start_date, time_start, time_end, follow_up_dates, location, price, early_bird_price, early_bird_deadline, max_spots, is_full, is_featured, notes) values
('8-weekse MSC Training (Nederlands)', 'MSC Training NL', 'msc_8week', 'nl', 'Dinsdag (avond)', '2026-04-07', '19:00', '21:00', '14, 21 apr · 12, 19, 26 mei · 2, 9, 16 jun', 'Online', 550, null, null, 10, false, false, 'Laatste plek beschikbaar'),
('8-weekse MSC Training (Nederlands)', 'MSC Training NL', 'msc_8week', 'nl', 'Maandag (avond)', '2026-09-28', '19:00', '21:00', '5, 12, 26 okt · 2, 9, 16, 23, 30 nov', 'Online', 550, 495, '2026-08-01', 10, false, true, null),
('8-week MSC Training (English)', 'MSC Training EN', 'msc_8week', 'en', 'Wednesday (evening)', '2026-03-04', '19:00', '21:00', '11, 18, 25 Mar · 28 Mar (retreat) · 1, 8, 15, 22 Apr', 'Online', 550, null, null, 10, true, false, null),
('Workshop Zelfcompassie', 'Workshop NL', 'workshop', 'nl', 'Maandag', '2026-06-01', '19:30', '20:30', null, 'Online', 55, null, null, 20, false, false, null),
('Workshop Zelfcompassie', 'Workshop NL', 'workshop', 'nl', 'Zaterdag', '2026-09-05', '10:00', '11:00', null, 'Online', 55, null, null, 20, false, false, null);

-- View with registration counts
create or replace view public.training_dates_with_counts as
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
