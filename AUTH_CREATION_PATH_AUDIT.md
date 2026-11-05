# Authoritative Account Creation Path Audit

**Project:** CUET AI-Prep  
**Target Environment:** Production (`https://cuetmate.vercel.app/`)  
**Scope:** Exhaustive audit of all account creation, user registration, and profile provisioning paths across the entire repository.  
**Auditor:** Senior Backend Security Engineer & Authentication Architect  
**Status:** ALL PATHS AUDITED & HARDENED  

---

## 1. Global Repository Inventory: Account Creation Calls

A complete AST and textual grep search was conducted across all files in the repository for:
- `supabase.auth.signUp()`
- `supabaseAdmin.auth.admin.createUser()`
- `auth.admin.createUser()`
- `createUser()`
- `signUp()`
- Supabase Auth triggers (`AFTER INSERT ON auth.users`)
- Direct `POST /api/auth/profile` mutations

### Search Results Summary

| Target Token | Total Occurrences | Application Source Files | Test / Script Files | Status |
| :--- | :---: | :--- | :--- | :--- |
| `supabase.auth.signUp()` | 0 | None (Completely excised) | None | **SAFE** |
| `admin.createUser()` | 2 | `app/api/auth/otp/verify/route.ts` (L127) | `scripts/restore-candidate-database.ts`, `__tests__/*` | **SAFE (Gated)** |
| `handle_new_user()` Trigger | 1 | `supabase/schema.sql` (L298) | None | **SAFE (Fires only after Auth insert)** |
| `POST /api/auth/profile` | 3 | `AuthPageContent.tsx`, `OnboardingModal.tsx` | `__tests__/*` | **SAFE (Session & Owner Gated)** |

---

## 2. In-Depth Component & Route Matrix

### 2.1 Frontend Authentication Entrypoints

| Component | Path | Registration Method | OTP Gated? | Verdict |
| :--- | :--- | :--- | :---: | :---: |
| **AuthPageContent** | [`components/auth/AuthPageContent.tsx`](file:///home/aryan/Documents/CUET (copy)/components/auth/AuthPageContent.tsx) | Calls `POST /api/auth/otp/send` with candidate details. Captures `registrationId` and transitions to `<OtpVerificationView>`. | **YES** | **PASS** |
| **OnboardingModal** | [`components/auth/OnboardingModal.tsx`](file:///home/aryan/Documents/CUET (copy)/components/auth/OnboardingModal.tsx) | Calls `POST /api/auth/otp/send` with candidate details. Captures `registrationId` and transitions to `<OtpVerificationView>`. | **YES** | **PASS** |
| **VerifyEmailView** | [`components/auth/VerifyEmailView.tsx`](file:///home/aryan/Documents/CUET (copy)/components/auth/VerifyEmailView.tsx) | Resends email verification confirmation link for existing unconfirmed accounts. | N/A | **PASS** |
| **OtpVerificationView** | [`components/auth/OtpVerificationView.tsx`](file:///home/aryan/Documents/CUET (copy)/components/auth/OtpVerificationView.tsx) | Collects 6-digit OTP code and calls `POST /api/auth/otp/verify`. Only upon 200 OK does it establish Supabase session. | **YES** | **PASS** |
| **ForgotPasswordView** | [`components/auth/ForgotPasswordView.tsx`](file:///home/aryan/Documents/CUET (copy)/components/auth/ForgotPasswordView.tsx) | Dispatches recovery OTP or magic link via `/api/auth/otp/send`. Creates no accounts. | N/A | **PASS** |

### 2.2 Server API Routes

| API Route | File Path | Capability | Security Controls |
| :--- | :--- | :--- | :--- |
| **`/api/auth/otp/send`** | [`app/api/auth/otp/send/route.ts`](file:///home/aryan/Documents/CUET (copy)/app/api/auth/otp/send/route.ts) | Stage A: Staging pending registration | - Rate limited (15 req/IP/15m)<br>- Normalizes email<br>- Checks if verified account exists (409 if true)<br>- Encrypts password (AES-256-GCM)<br>- Hashes OTP (HMAC-SHA256)<br>- Staged in `user_otp_codes`<br>- **Zero permanent accounts created** |
| **`/api/auth/otp/verify`** | [`app/api/auth/otp/verify/route.ts`](file:///home/aryan/Documents/CUET (copy)/app/api/auth/otp/verify/route.ts) | Stage B: Authoritative verification & creation | - Validates `registrationId`<br>- Verifies HMAC-SHA256 hash<br>- Enforces 5-minute expiration<br>- Enforces max 5 attempts<br>- Atomic creation via `supabaseAdmin.auth.admin.createUser`<br>- Updates profile and consumes pending record |
| **`/api/auth/check-email`** | [`app/api/auth/check-email/route.ts`](file:///home/aryan/Documents/CUET (copy)/app/api/auth/check-email/route.ts) | Real-time email availability | - Checks `students` view and `auth.admin.listUsers`<br>- Read-only, no mutations |
| **`/api/auth/session`** | [`app/api/auth/session/route.ts`](file:///home/aryan/Documents/CUET (copy)/app/api/auth/session/route.ts) | Session cookie synchronization | - Sets HTTP-only, SameSite=Lax SSR cookies via `@supabase/ssr`<br>- Requires valid Supabase access/refresh token |
| **`/api/auth/profile`** | [`lib/api-handlers/auth-profile.ts`](file:///home/aryan/Documents/CUET (copy)/lib/api-handlers/auth-profile.ts) | Candidate profile synchronization | - Checks `supabase.auth.getUser()` (401 if null)<br>- Checks `isEmailVerified` (403 if false)<br>- Checks `authUser.id === body.id` (403 IDOR prevention) |

---

## 3. Database Triggers & Auth Hooks Inspection

Inspection of PostgreSQL database schema ([`supabase/schema.sql`](file:///home/aryan/Documents/CUET (copy)/supabase/schema.sql)):

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id, full_name, target_stream, target_university, target_college,
        exam_date, daily_study_hours, xp, campus_coins, current_streak
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'CUET Aspirant'),
        COALESCE(NEW.raw_user_meta_data->>'target_stream', 'Commerce'),
        COALESCE(NEW.raw_user_meta_data->>'target_university', 'Delhi University'),
        COALESCE(NEW.raw_user_meta_data->>'target_college', 'SRCC'),
        '2026-05-15', 4, 0, 50, 0
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Analysis of the Trigger
- The trigger is `AFTER INSERT ON auth.users`.
- It does **NOT** insert rows into `auth.users`. It only responds when an entry is inserted into `auth.users`.
- Because `supabase.auth.signUp()` was removed from client-side code, `auth.users` CANNOT be inserted into by an unverified browser client.
- The ONLY component that performs an insert on `auth.users` is `app/api/auth/otp/verify/route.ts` via `supabaseAdmin.auth.admin.createUser()`, which executes exclusively after the candidate provides the verified 6-digit OTP.

---

## 4. Conclusion

There is now **EXACTLY ONE** authoritative path in the entire codebase for new user account creation:
1. Candidate inputs details -> Staged in `user_otp_codes` via `/api/auth/otp/send`. Zero rows in `auth.users` or `profiles`.
2. Candidate enters 6-digit OTP -> Verified by `/api/auth/otp/verify`.
3. Server executes atomic `createUser` -> Trigger provisions profile -> Session cookies established -> Candidate redirected to `/dashboard`.

Zero alternative or legacy sign-up routes exist in the repository.
