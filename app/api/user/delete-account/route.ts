import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/user/delete-account
 * DPDP Act 2023 - Candidate Right to Erasure (Section 12)
 * Permanently deletes candidate diagnostic records, attempts, reports,
 * and auth credentials. Retains anonymized financial transaction entries
 * strictly where required by Indian statutory tax and audit law.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json(
        { ok: false, error: "Authentication required to delete account." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    if (body?.confirmation !== "DELETE") {
      return NextResponse.json(
        {
          ok: false,
          error: "Explicit confirmation required. Please type 'DELETE' to confirm permanent account deletion.",
        },
        { status: 400 }
      );
    }

    const userId = user.id;
    const userEmail = user.email || "";

    // 1. Delete Candidate Diagnostic Attempts
    await supabaseAdmin
      .from("user_attempts")
      .delete()
      .eq("user_id", userId);

    // 2. Delete Usage Ledger entries
    await supabaseAdmin
      .from("user_usage_ledger")
      .delete()
      .eq("user_id", userId);

    // 3. Delete AI Reports & Usage
    await supabaseAdmin
      .from("ai_reports")
      .delete()
      .eq("user_id", userId);

    await supabaseAdmin
      .from("ai_usage")
      .delete()
      .eq("user_id", userId);

    // 4. Delete Sunday Mentor Reports
    await supabaseAdmin
      .from("sunday_mentor_reports")
      .delete()
      .eq("user_id", userId);

    // 5. Delete Progress Cards
    await supabaseAdmin
      .from("progress_cards")
      .delete()
      .eq("user_id", userId);

    // 6. Delete Gamification Trophies & Awards
    await supabaseAdmin
      .from("user_trophies")
      .delete()
      .eq("user_id", userId);

    await supabaseAdmin
      .from("user_test_xp_awards")
      .delete()
      .eq("user_id", userId);

    // 7. Delete Question Reports
    await supabaseAdmin
      .from("question_reports")
      .delete()
      .eq("user_id", userId);

    // 8. Delete pending verification codes
    if (userEmail) {
      await supabaseAdmin
        .from("user_otp_codes")
        .delete()
        .eq("email", userEmail.toLowerCase());

      await supabaseAdmin
        .from("pending_registrations")
        .delete()
        .eq("email", userEmail.toLowerCase());
    }

    // 9. Check for existing payment records (statutory tax records subject to ON DELETE RESTRICT)
    const { data: existingOrders } = await supabaseAdmin
      .from("payment_orders")
      .select("id")
      .eq("user_id", userId)
      .limit(1);

    const hasPaymentHistory = Boolean(existingOrders && existingOrders.length > 0);

    if (hasPaymentHistory) {
      // Anonymize the profile row to preserve statutory tax audit trail without PII
      await supabaseAdmin
        .from("profiles")
        .update({
          full_name: "[DELETED_CANDIDATE]",
          avatar_url: null,
          target_stream: "Commerce",
          target_university: null,
          target_college: null,
          target_course: null,
          selected_subjects: [],
          guardian_consent: false,
          guardian_email: null,
          dob: null,
          daily_study_hours: 0,
          current_streak: 0,
          xp: 0,
          campus_coins: 0,
          is_premium: false,
          subscription_tier: "deleted",
          subscription_expires_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
    } else {
      // No payment records exist; delete the profile row completely
      await supabaseAdmin
        .from("profiles")
        .delete()
        .eq("id", userId);
    }

    // 10. Delete candidate identity from Supabase Auth
    try {
      await supabaseAdmin.auth.admin.deleteUser(userId);
    } catch (authDeleteErr) {
      console.warn("[Admin Delete User Warning]:", authDeleteErr);
    }

    // 11. Sign out the session
    await supabase.auth.signOut().catch(() => {});

    return NextResponse.json({
      ok: true,
      message: "Your account and all associated personal data have been permanently deleted in accordance with the DPDP Act 2023.",
    });
  } catch (error: any) {
    console.error("[DPDP Account Deletion Error]:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process account deletion request. Please contact the grievance desk." },
      { status: 500 }
    );
  }
}
