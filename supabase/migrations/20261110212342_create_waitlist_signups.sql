/*
# Create waitlist_signups table

1. New Tables
- `waitlist_signups`
  - `id` (uuid, primary key)
  - `email` (text, unique, required, basic format and length check)
  - `created_at` (timestamptz, defaults to now)

2. Security
- Row level security is enabled on `waitlist_signups`.
- The public landing page (no sign-in) can only INSERT a row. It cannot read, update or delete any emails.
- Only the INSERT verb is granted to `anon` and `authenticated`.

3. Notes
- The unique constraint prevents duplicate sign-ups for the same email.
- Clients should treat a unique-violation error as "already subscribed".
*/

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (char_length(email) BETWEEN 5 AND 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON waitlist_signups TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_waitlist_signups" ON waitlist_signups;
CREATE POLICY "anon_insert_waitlist_signups" ON waitlist_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
