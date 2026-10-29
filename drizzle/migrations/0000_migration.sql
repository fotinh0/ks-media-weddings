CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  names text NOT NULL CHECK (char_length(names) BETWEEN 1 AND 150),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  wedding_date date,
  venue text CHECK (char_length(venue) <= 200),
  guest_count text CHECK (char_length(guest_count) <= 50),
  budget text CHECK (char_length(budget) <= 50),
  heard_from text CHECK (char_length(heard_from) <= 200),
  message text CHECK (char_length(message) <= 2000)
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an inquiry" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);