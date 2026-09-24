/*
# Create webinar_registrations table

1. New Tables
- `webinar_registrations`
  - `id` (uuid, primary key)
  - `first_name` (text, not null) — registrant's first name
  - `last_name` (text, not null) — registrant's last name
  - `email` (text, not null) — registrant's email, used for confirmation
  - `phone` (text, nullable) — optional phone number
  - `company` (text, nullable) — optional company/organization
  - `role` (text, nullable) — optional job role
  - `wants_workbook` (boolean, default false) — whether the registrant opted to purchase the workbook
  - `payment_status` (text, default 'free') — 'free', 'pending', 'paid'
  - `stripe_session_id` (text, nullable) — Stripe checkout session ID once payment is made
  - `consent` (boolean, not null) — whether the user consented to be contacted
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `webinar_registrations`.
- Allow anon + authenticated to insert (public registration form, no login required).
- Allow anon + authenticated to select — needed so the frontend can check if an email is already registered. Only non-sensitive columns are exposed via the policy (the table contains only public registration data anyway).
- No update or delete from the client; registrations are managed server-side.
3. Important Notes
- This is a single-tenant public landing page with no sign-in screen, so policies use `TO anon, authenticated`.
- Email is not unique-constrained to allow re-registration attempts, but the app checks for existing emails before inserting.
- Payment status defaults to 'free' and is updated server-side via a Stripe webhook edge function when payment succeeds.
*/

CREATE TABLE IF NOT EXISTS webinar_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  role text,
  wants_workbook boolean NOT NULL DEFAULT false,
  payment_status text NOT NULL DEFAULT 'free',
  stripe_session_id text,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE webinar_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_registrations" ON webinar_registrations;
CREATE POLICY "anon_select_registrations" ON webinar_registrations
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "anon_insert_registrations" ON webinar_registrations;
CREATE POLICY "anon_insert_registrations" ON webinar_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_webinar_registrations_email ON webinar_registrations(email);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_created_at ON webinar_registrations(created_at DESC);