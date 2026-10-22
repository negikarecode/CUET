import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";

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

    const profilePayload: Record<string, any> = {
      id,
      full_name: fullName,
      target_stream: formattedStream,
      target_university: targetUniversity || "Delhi University",
      target_college: targetCollege || "SRCC",
      selected_subjects: subjectsToPersist,
      updated_at: new Date().toISOString(),
    };

    if (!existingProfile) {
      // First-time initialization
      profilePayload.xp = 0;
      profilePayload.campus_coins = 50;
      profilePayload.current_streak = 0;
      profilePayload.last_practice_date = null;
      profilePayload.is_premium = false;
      profilePayload.subscription_tier = "free";
    }

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert(profilePayload, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("[Auth Profile Upsert Error]:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, profile: data });
  } catch (err: any) {
    console.error("[Auth Profile Unexpected Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
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

    // If viewing another student, only expose public safe display fields
    const query = isSelf
      ? supabaseAdmin.from("profiles").select("*").eq("id", id).single()
      : supabaseAdmin
          .from("profiles")
          .select("id, full_name, avatar_url, target_stream, target_college, target_university, xp, current_streak")
          .eq("id", id)
          .single();

    const { data: profile, error } = await query;

    if (error || !profile) {
      return NextResponse.json(
        { error: error?.message || "Profile not found" },
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
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export { GET as getProfile, POST as postProfile };
