# CUET AI-Prep: Payment Infrastructure Architecture & Operations Guide

## 1. Authoritative Gateway Provider: Razorpay

All payment checkouts and candidate upgrade workflows in CUET AI-Prep operate exclusively through **Razorpay**. Legacy references to alternate payment gateways (such as Cashfree) have been retired.

---

## 2. Payment Lifecycle & Flow

The payment infrastructure is divided into three coordinated server-side and client-side stages:

### Step 1: Order Creation (`POST /api/payments/razorpay/create-order`)
1. Candidate must be authenticated via their Supabase session (`supabase.auth.getUser()`).
2. Server checks `public.profiles` to ensure candidate does not already have an active Gold Pass (returns `HTTP 409 Conflict` if already active).
3. Payable amount is computed **strictly server-side** from `lib/pricing.ts` via `getPriceInPaise()` (`49900` paise = ₹499). The client cannot inject or alter the payable amount.
4. Server generates an order with Razorpay (`razorpay.orders.create`) with notes containing `{ user_id, plan: 'Gold Pass' }`.
5. An audit row is inserted into `public.payments` with `status: 'created'`, `amount_paise: 49900`, `currency: 'INR'`.
6. Returns `{ orderId, amount, currency, keyId }` to the client.

### Step 2: Client Checkout (`components/payments/PricingSection.tsx`)
1. Loads Razorpay Checkout SDK on demand via `https://checkout.razorpay.com/v1/checkout.js`.
2. Candidate must check mandatory checkbox: *"I agree to the Terms of Service and Refund Policy"*.
3. Opens the Razorpay modal styled with emerald branding (`#059669`).
4. On payment completion, client handler receives `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }` and posts it to the verification endpoint.

### Step 3: Server Verification (`POST /api/payments/razorpay/verify`)
1. Authenticates candidate session.
2. Looks up order in `public.payments` verifying both `razorpay_order_id` AND `user_id = authUser.id` (strictly blocks cross-user claim attempts).
3. If already marked `paid`, returns idempotent success without duplicate processing.
4. Computes HMAC-SHA256 signature using `RAZORPAY_KEY_SECRET` and performs timing-safe comparison (`crypto.timingSafeEqual`).
5. Marks `public.payments` row as `status: 'paid'`, `razorpay_payment_id`, `paid_at: NOW()`.
6. Authoritatively grants Gold Pass in `public.profiles`:
   - `is_premium = true`
   - `subscription_tier = 'all_access_pass'`
   - `subscription_expires_at = NOW() + INTERVAL '1 year'`

### Step 4: Webhook Fallback (`POST /api/payments/razorpay/webhook`)
1. Reads raw text body and verifies `X-Razorpay-Signature` with `RAZORPAY_WEBHOOK_SECRET` before parsing JSON.
2. Handles `order.paid` and `payment.captured` idempotently.
3. Grants Gold Pass even if candidate closed browser tab before verification endpoint completed.
4. Handles `payment.failed` by marking payment row as `failed`.

---

## 3. Environment Variables

| Variable Name | Exposure | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Client & Server | Public Key ID for Razorpay Checkout SDK initialization |
| `RAZORPAY_KEY_ID` | Server only | Server key ID for orders API |
| `RAZORPAY_KEY_SECRET` | Server only (Secret) | Secret key for order creation and HMAC verification |
| `RAZORPAY_WEBHOOK_SECRET` | Server only (Secret) | Cryptographic secret for webhook validation |

---

## 4. Manual Procedure: Revoking Premium for a Refund

When an approved student refund is processed through the Razorpay Dashboard, execute the following SQL in the Supabase SQL Editor to safely and authoritatively revoke Gold Pass entitlement:

```sql
-- Step 1: Locate candidate profile by user ID or email
SELECT id, email, is_premium, subscription_tier, subscription_expires_at
FROM public.profiles
WHERE id = '[[USER_UUID_TO_REFUND]]';

-- Step 2: Revoke Premium Entitlement
UPDATE public.profiles
SET
    is_premium = false,
    subscription_tier = 'free',
    subscription_expires_at = NULL,
    updated_at = NOW()
WHERE id = '[[USER_UUID_TO_REFUND]]';

-- Step 3: Update payments audit ledger
UPDATE public.payments
SET
    status = 'refunded',
    paid_at = NULL
WHERE user_id = '[[USER_UUID_TO_REFUND]]'
  AND status = 'paid';
```
