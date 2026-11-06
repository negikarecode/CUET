import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * GET /api/user/data-export
 * DPDP Act 2023 - Candidate Right to Access (Section 11)
 * Exports all personal diagnostic data, profile metadata, test attempts,
 * and usage telemetry associated with the authenticated candidate.
 */
export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json(
        { ok: false, error: "Authentication required to export account data." },
        { status: 401 }
      );
    }

    const userId = user.id;

    // 1. Fetch Candidate Profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    // 2. Fetch User Attempts & Telemetry
    const { data: attempts } = await supabaseAdmin
      .from("user_attempts")
      .select("id, test_id, question_id, selected_option, is_correct, time_spent_seconds, is_time_sink, diagnostic_report, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    // 3. Fetch Usage Ledger
    const { data: usageLedger } = await supabaseAdmin
      .from("user_usage_ledger")
      .select("id, test_id, session_id, subject, completed_at")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false });

    // 4. Fetch Progress Cards (if any)
    const { data: progressCards } = await supabaseAdmin
      .from("progress_cards")
      .select("*")
      .eq("user_id", userId);

    // 5. Fetch Question Reports (if any)
    const { data: questionReports } = await supabaseAdmin
      .from("question_reports")
      .select("*")
      .eq("user_id", userId);

    const exportPayload = {
      export_meta: {
        platform: "CUETMate (CUET AI-Prep)",
        compliance_framework: "Digital Personal Data Protection Act, 2023 (DPDP Act 2023 / Rules 2025)",
        statutory_right: "Section 11: Right to Access Information About Personal Data",
        exported_at: new Date().toISOString(),
        candidate_auth_id: userId,
        candidate_email: user.email,
      },
      profile: profile || null,
      attempts: attempts || [],
      usage_ledger: usageLedger || [],
      progress_cards: progressCards || [],
      question_reports: questionReports || [],
    };

    const fileName = `cuetmate-user-data-${new Date().toISOString().slice(0, 10)}.json`;

    return new NextResponse(JSON.stringify(exportPayload, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error: any) {
    console.error("[DPDP Data Export Error]:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to generate personal data export file." },
      { status: 500 }
    );
  }
}
