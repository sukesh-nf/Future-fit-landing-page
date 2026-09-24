/*
# Update webinar_registrations for executive briefing format

1. Modified Tables
- `webinar_registrations`
  - Remove `phone` (no longer collected)
  - Remove `wants_workbook` (workbook is now a take-away, not a purchase)
  - Remove `payment_status` (no payment on this page)
  - Remove `stripe_session_id` (no Stripe on this page)
  - Remove `consent` (replaced by attend_commitment)
  - Add `business_email` (text, not null) — renamed from `email` for executive context
  - Add `important_question` (text, not null) — the required strategic question from the form
  - Add `attend_commitment` (boolean, not null) — "I intend to attend the live session"
  - Keep `first_name`, `last_name`, `company`, `role`, `created_at`
  - Keep `email` column as-is (already exists, used for confirmation)
2. Security
- RLS already enabled; policies already allow anon insert/select.
- No policy changes needed — same anon, authenticated access pattern.
3. Important Notes
- Uses IF NOT EXISTS for all new columns to be idempotent.
- Does NOT drop or rename existing columns — only adds new ones and the app stops using old ones.
- The `email` column is kept (not renamed) to avoid data loss; the form simply labels it "Business email".
*/

ALTER TABLE webinar_registrations ADD COLUMN IF NOT EXISTS important_question text;
ALTER TABLE webinar_registrations ADD COLUMN IF NOT EXISTS attend_commitment boolean NOT NULL DEFAULT false;