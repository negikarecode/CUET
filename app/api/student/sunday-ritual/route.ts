import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { runSundayRitual } from "@/lib/sunday-ritual";
import { checkAIQualificationGate } from "@/lib/ai-gate";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const supabase = createClient();
    let authUser = null;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      authUser = user;
    } catch {
      // Fallback
    }

    if (!authUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Active user session required." },
        { status: 401 }
      );
    }

    const userId = authUser.id;

    // Qualification gate check
    const gate = await checkAIQualificationGate(userId);
    if (!gate.isUnlocked) {
      return NextResponse.json(
        {
          success: false,
          error: "QUALIFICATION_GATE_LOCKED",
          message: `The Sunday Ritual requires at least 150 question attempts to calibrate weekly trends. Current: ${gate.totalAttempts}/150.`,
          totalAttempts: gate.totalAttempts,
          requiredAttempts: 150,
        },
        { status: 403 }
      );
    }

    const ritualResult = await runSundayRitual(userId);

    return NextResponse.json({
      success: true,
      data: ritualResult,
    });
  } catch (error) {
    console.error("Sunday Ritual API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error in Sunday Ritual." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
