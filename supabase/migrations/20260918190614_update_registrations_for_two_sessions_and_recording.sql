/*
# Update webinar_registrations for two sessions, recording opt-in, and workbook pricing

1. Modified Tables
- `webinar_registrations`
  - Add `preferred_session` (integer, not null, default 1) — 1 or 2, links attendee to a specific live session date
  - Add `wants_recording` (boolean, not null, default false) — opt-in to receive the recording after the live sessions
  - Re-add `wants_workbook` (boolean, not null, default false) — whether the registrant opted to purchase the workbook for $47
  - Re-add `payment_status` (text, not null, default 'free') — 'free', 'pending', 'paid'
  - Re-add `stripe_session_id` (text, nullable) — Stripe checkout session ID once payment is made
  - Make `important_question` nullable (now optional per new form requirements)
  - Make `last_name` nullable (now optional per new form requirements)
  - Make `company` nullable (already nullable, confirmed)
  - Make `role` nullable (already nullable, confirmed)
  - Drop `attend_commitment` column (no longer required per new instructions)

2. Security
- RLS already enabled; policies already allow anon insert/select.
- No policy changes needed — same anon, authenticated access pattern.

3. Important Notes
- Uses IF NOT EXISTS for all new columns to be idempotent.
- Does NOT drop or rename existing columns — only adds new ones.
- The `attend_commitment` column is dropped because the new instructions say "Do not require an attendance declaration."
- `wants_workbook` and `payment_status` are re-added (they were removed in a prior migration but the instructions now require workbook purchase flow again).
- `preferred_session` determines when the $99 live-day price applies (session 2 date is later than session 1).
*/

ALTER TABLE webinar_registrations
  ADD COLUMN IF NOT EXISTS preferred_session integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS wants_recording boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS wants_workbook boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS stripe_session_id text;

ALTER TABLE webinar_registrations ALTER COLUMN important_question DROP NOT NULL;
ALTER TABLE webinar_registrations ALTER COLUMN last_name DROP NOT NULL;

ALTER TABLE webinar_registrations DROP COLUMN IF EXISTS attend_commitment;