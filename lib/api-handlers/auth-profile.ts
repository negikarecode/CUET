import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";
import { requireAuth } from "@/lib/security/auth-guard";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/profile
 * Safely updates user onboarding details in public.profiles table.
 * Strictly verifies authenticated session and preserves existing XP, coins, and subscription tier.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;
    const fullName = body.fullName || body.full_name;
    const targetStream = body.targetStream || body.target_stream;
    const targetUniversity = body.targetUniversity || body.target_university;
    const targetCollege = body.targetCollege || body.target_college;
    const selectedSubjects = body.selectedSubjects || body.selected_subjects;

    if (!id || !fullName) {
      return NextResponse.json(
        { error: "User ID and Full Name are required" },
        { status: 400 }
      );
    }

    // Verify authenticated user session to prevent IDOR attacks
    let authUser = null;
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      authUser = user;
    } catch {
      // Continue for offline sandbox development
    }

    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized: Active session required to update profile." },
        { status: 401 }
      );
    }

    const isEmailVerified = Boolean(
      authUser.email_confirmed_at ||
      (authUser as any).confirmed_at ||
      (authUser.app_metadata?.provider && authUser.app_metadata.provider !== "email")
    );

    if (!isEmailVerified) {
      return NextResponse.json(
        {
          error: "Email verification required before updating candidate profile.",
          code: "EMAIL_VERIFICATION_REQUIRED",
        },
        { status: 403 }
      );
    }

    if (authUser.id !== id) {
      return NextResponse.json(
        { error: "Forbidden: Cannot update profile of another user." },
        { status: 403 }
      );
    }

    // Rate limit: 10 per minute per user
    const rateIdentifier = getClientRateLimitIdentifier(req, authUser.id, "user:profile_update");
    const rateCheck = await rateLimit("user:profile_update", rateIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    // Capitalize target stream for database constraint: 'Science' | 'Commerce' | 'Humanities'
    const formattedStream =
      targetStream?.toLowerCase() === "commerce"
        ? "Commerce"
        : targetStream?.toLowerCase() === "humanities"
        ? "Humanities"
        : "Science";

    const supabaseAdmin = createAdminClient();

    // Check if profile already exists
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id, xp, campus_coins, current_streak, is_premium, subscription_tier")
      .eq("id", id)
      .maybeSingle();

    const subjectsToPersist =
      selectedSubjects && Array.isArray(selectedSubjects) && selectedSubjects.length > 0
        ? selectedSubjects
        : getSubjectsForStream(formattedStream);

    const targetCourse = body.targetCourse || body.target_course;

    const profilePayload: Record<string, any> = {
      id,
      full_name: fullName,
      target_stream: formattedStream,
      target_university: targetUniversity || "Delhi University",
      target_college: targetCollege || "SRCC",
      selected_subjects: subjectsToPersist,
      updated_at: new Date().toISOString(),
    };

    if (targetCourse) {
      profilePayload.target_course = targetCourse;
    }

    if (!existingProfile) {
      // First-time initialization
      profilePayload.xp = 0;
      profilePayload.campus_coins = 50;
      profilePayload.current_streak = 0;
      profilePayload.last_practice_date = null;
      profilePayload.is_premium = false;
      profilePayload.subscription_tier = "free";
    }

    let { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert(profilePayload, { onConflict: "id" })
      .select()
      .single();

    if (
      error &&
      (error.message?.includes("target_course") ||
        (error as any).code === "42703" ||
        (error as any).code === "PGRST204")
    ) {
      delete profilePayload.target_course;
      const retryResult = await supabaseAdmin
        .from("profiles")
        .upsert(profilePayload, { onConflict: "id" })
        .select()
        .single();
      data = retryResult.data;
      error = retryResult.error;
    }

    if (error) {
      console.error("[Auth Profile Upsert Error]:", error);
      return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
    }

    return NextResponse.json({ success: true, profile: data });
  } catch (err: any) {
    console.error("[Auth Profile Unexpected Error]:", err);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/profile?id=<userId>
 * Retrieves authentic user profile data from public.profiles
 * Requires authenticated session; filters private fields for non-owners.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID parameter required" },
        { status: 400 }
      );
    }

    let authUser = null;
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      authUser = user;
    } catch {}

    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized: Active session required." },
        { status: 401 }
      );
    }

    // Rate limit profile reads (60 per minute per user) to mitigate automated enumeration
    const rateIdentifier = getClientRateLimitIdentifier(req, authUser.id, "user:profile_read");
    const rateCheck = await rateLimit("user:profile_read", rateIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    const isSelf = authUser.id === id;
    const supabaseAdmin = createAdminClient();

    // Minor Privacy Hardening: If viewing another candidate, strictly redact PII
    // (full legal name, target college, target university) to prevent enumeration and spear-phishing.
    const query = isSelf
      ? supabaseAdmin.from("profiles").select("*").eq("id", id).single()
      : supabaseAdmin
          .from("profiles")
          .select("id, avatar_url, target_stream, xp, current_streak")
          .eq("id", id)
          .single();

    const { data: profile, error } = await query;

    if (error || !profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    if (isSelf && profile) {
      const { getUserEntitlement } = await import("@/lib/payments/entitlements");
      const entitlement = await getUserEntitlement(id);
      profile.is_premium = entitlement.isPremium;
      profile.subscription_tier = entitlement.subscriptionTier;
      profile.subscription_expires_at = entitlement.subscriptionExpiresAt;
    }

    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    console.error("[Profile Route Error]:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/profile
 * DPDP Act Compliance (Digital Personal Data Protection Act - Right to Erasure).
 * Allows an authenticated candidate to permanently delete or anonymize their personal profile,
 * question attempts, AI reports, progress cards, and authentication record.
 */
export async function DELETE(req: Request) {
  try {
    const auth = await requireAuth(req);
    if (!auth.success) {
      return auth.response;
    }

    const userId = auth.userId;

    // Rate limit: 3 profile deletion attempts per hour per user
    const rateIdentifier = getClientRateLimitIdentifier(req, userId, "user:profile_delete");
    const rateCheck = await rateLimit("user:profile_delete", rateIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    const supabaseAdmin = createAdminClient();

    // 1. Delete user attempts and study records
    await supabaseAdmin.from("user_attempts").delete().eq("user_id", userId);
    await supabaseAdmin.from("ai_reports").delete().eq("user_id", userId);
    await supabaseAdmin.from("progress_cards").delete().eq("user_id", userId);
    await supabaseAdmin.from("ai_usage").delete().eq("user_id", userId);

    // 2. Check if user has payment transactions/orders (statutory 8-year audit retention)
    const { data: orders } = await supabaseAdmin
      .from("payment_orders")
      .select("id")
      .eq("user_id", userId)
      .limit(1);

    const hasFinancialRecords = Boolean(orders && orders.length > 0);

    if (hasFinancialRecords) {
      // Under statutory financial regulations (Companies Act §128 / GST Act §36),
      // order IDs are retained, but candidate personal identifiers are scrubbed and anonymized.
      await supabaseAdmin
        .from("profiles")
        .update({
          full_name: "Erased Candidate",
          target_stream: "Science",
          target_university: null,
          target_college: null,
          selected_subjects: [],
          avatar_url: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
    } else {
      // No financial records: complete hard delete of candidate profile
      const { error: deleteProfileErr } = await supabaseAdmin
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (deleteProfileErr) {
        console.error("[DPDP Erasure Profile Delete Error]:", deleteProfileErr);
      }
    }

    // 3. Remove Supabase Auth user record so credentials cannot be re-authenticated
    try {
      await supabaseAdmin.auth.admin.deleteUser(userId);
    } catch (authErr) {
      console.warn("[DPDP Erasure Auth Delete Notice]:", authErr);
    }

    return NextResponse.json({
      success: true,
      message: "Candidate personal data and study records erased in compliance with DPDP Right to Erasure.",
      retainedFinancialAuditTrail: hasFinancialRecords,
    });
  } catch (err: any) {
    console.error("[Profile DELETE Error]:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { GET as getProfile, POST as postProfile, DELETE as deleteProfile };
