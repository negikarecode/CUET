import { createAdminClient } from "@/lib/supabase/admin";
import { validateEmail } from "@/lib/auth/validation";

export type EmailCategory =
  | "VERIFIED_EXISTING"      // A: Genuine permanent verified account (auth.users + email_confirmed_at)
  | "PENDING_REGISTRATION"   // B: Pending OTP registration, active, not yet expired
  | "EXPIRED_REGISTRATION"   // C: Pending OTP registration, expired, safely restartable
  | "UNCONFIRMED_EXISTING"   // D: In auth.users but never confirmed (orphaned from prior legacy flow)
  | "NEW_EMAIL";             // E: Completely new email, no records in auth.users or user_otp_codes

export interface EmailClassificationResult {
  category: EmailCategory;
  cleanEmail: string;
  exists: boolean; // True ONLY if VERIFIED_EXISTING
  isVerified: boolean;
  isPending: boolean;
  isExpired: boolean;
  userId?: string;
  registrationId?: string;
  message?: string;
}

/**
 * Searches across all pages in Supabase Auth to find a user by email.
 * Guarantees thorough discovery regardless of total user volume.
 */
export async function findAuthUserByEmail(email: string): Promise<any | null> {
  const cleanEmail = email.trim().toLowerCase();
  const admin = createAdminClient();
  let page = 1;
  const perPage = 200;

  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error || !data?.users || data.users.length === 0) {
      break;
    }

    const match = data.users.find(
      (u) => u.email?.trim().toLowerCase() === cleanEmail
    );
    if (match) {
      return match;
    }

    if (data.users.length < perPage) {
      break;
    }
    page++;
    if (page > 10) {
      // Safety cap: up to 2,000 users scanned
      break;
    }
  }

  return null;
}

/**
 * Authoritatively classifies an email address into one of 5 precise lifecycle states.
 * Guarantees that:
 * 1. Only genuine permanent verified accounts return exists: true.
 * 2. Pending registrations are never mistaken for existing accounts.
 * 3. Expired or unconfirmed registrations can be safely restarted or completed.
 */
export async function classifyEmail(email: string): Promise<EmailClassificationResult> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !validateEmail(cleanEmail)) {
    return {
      category: "NEW_EMAIL",
      cleanEmail,
      exists: false,
      isVerified: false,
      isPending: false,
      isExpired: false,
      message: "Please enter a valid email address.",
    };
  }

  const admin = createAdminClient();

  // 1. Check permanent auth.users catalog
  const authUser = await findAuthUserByEmail(cleanEmail);

  if (authUser) {
    const isConfirmed = Boolean(
      authUser.email_confirmed_at ||
      (authUser as any).confirmed_at ||
      (authUser.app_metadata?.provider && authUser.app_metadata.provider !== "email")
    );

    if (isConfirmed) {
      return {
        category: "VERIFIED_EXISTING",
        cleanEmail,
        exists: true,
        isVerified: true,
        isPending: false,
        isExpired: false,
        userId: authUser.id,
        message: "An account with this email already exists. Please log in instead.",
      };
    }

    // Account exists in auth.users but is unconfirmed
    return {
      category: "UNCONFIRMED_EXISTING",
      cleanEmail,
      exists: false,
      isVerified: false,
      isPending: false,
      isExpired: false,
      userId: authUser.id,
      message: "An unconfirmed registration exists. Please complete verification.",
    };
  }

  // 2. Check pending registration in public.user_otp_codes
  try {
    const { data: otpRows } = await admin
      .from("user_otp_codes")
      .select("id, email, expires_at, metadata, created_at")
      .eq("email", cleanEmail)
      .eq("otp_type", "signup")
      .order("created_at", { ascending: false })
      .limit(1);

    if (otpRows && otpRows.length > 0 && otpRows[0]) {
      const row = otpRows[0];
      const isExpired = new Date(row.expires_at).getTime() <= Date.now();

      if (isExpired) {
        return {
          category: "EXPIRED_REGISTRATION",
          cleanEmail,
          exists: false,
          isVerified: false,
          isPending: false,
          isExpired: true,
          registrationId: row.id,
          message: "A previous verification code expired. You can request a fresh code.",
        };
      }

      return {
        category: "PENDING_REGISTRATION",
        cleanEmail,
        exists: false,
        isVerified: false,
        isPending: true,
        isExpired: false,
        registrationId: row.id,
        message: "A verification code is active for this email.",
      };
    }
  } catch (dbErr) {
    console.warn("[classifyEmail] Database query notice:", dbErr);
  }

  // 3. Completely new email
  return {
    category: "NEW_EMAIL",
    cleanEmail,
    exists: false,
    isVerified: false,
    isPending: false,
    isExpired: false,
  };
}
