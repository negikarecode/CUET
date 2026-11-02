-- =============================================================================
-- CUETMATE: HARD RESET - DELETE ALL USERS AND ALL USER DATA
-- Run this directly in the Supabase Dashboard -> SQL Editor -> Run
-- =============================================================================

BEGIN;

-- 1. Truncate all candidate transactional & progress tables
TRUNCATE TABLE public.user_otp_codes CASCADE;
TRUNCATE TABLE public.sunday_mentor_reports CASCADE;
TRUNCATE TABLE public.progress_cards CASCADE;
TRUNCATE TABLE public.ai_reports CASCADE;
TRUNCATE TABLE public.ai_usage CASCADE;
TRUNCATE TABLE public.user_attempts CASCADE;

-- 2. Truncate all payment orders and transactions
TRUNCATE TABLE public.payment_transactions CASCADE;
TRUNCATE TABLE public.payment_orders CASCADE;

-- 3. Release any claimed promotional discount slots
UPDATE public.promotional_slots
SET user_id = NULL,
    order_id = NULL,
    status = 'released',
    claimed_at = NULL;

-- 4. Truncate all candidate profiles
TRUNCATE TABLE public.profiles CASCADE;

-- 5. Permanently delete all user accounts from Supabase Auth catalog
DELETE FROM auth.users;

COMMIT;
