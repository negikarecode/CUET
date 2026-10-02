import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DiagnosticCycle } from "@/types/cycle";
import { generateCycleAIInterpretation } from "@/lib/cycle-engine";

/**
 * GET /api/student/diagnostic-cycle
 * Returns the student's persistent diagnostic cycles.
 */
export async function GET(_req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ cycles: [], currentCycleNumber: 1, currentCycleQuestionCount: 0 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("metadata")
      .eq("id", user.id)
      .maybeSingle();

    const metadata = profile?.metadata || {};
    const cycles: DiagnosticCycle[] = metadata.diagnosticCycles || [];
    const currentCycleNumber = metadata.currentCycleNumber || Math.floor(cycles.length) + 1;
    const currentCycleQuestionCount = metadata.currentCycleQuestionCount || 0;

    return NextResponse.json({
      cycles,
      currentCycleNumber,
      currentCycleQuestionCount,
    });
  } catch (error) {
    console.error("Diagnostic cycles GET error:", error);
    return NextResponse.json({ error: "Failed to fetch diagnostic cycles" }, { status: 500 });
  }
}

/**
 * POST /api/student/diagnostic-cycle
 * Trigger or retry AI interpretation for a completed cycle.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await req.json();
    const { cycle, previousCycle } = body;

    if (!cycle || !cycle.cycleNumber) {
      return NextResponse.json({ error: "Invalid cycle payload" }, { status: 400 });
    }

    // Generate AI interpretation using Groq LPU with deterministic fallback
    const aiAnalysis = await generateCycleAIInterpretation(cycle, previousCycle);

    // If user is authenticated, save back to profile metadata
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("metadata")
        .eq("id", user.id)
        .maybeSingle();

      const metadata = profile?.metadata || {};
      const cycles: DiagnosticCycle[] = metadata.diagnosticCycles || [];
      const cycleIdx = cycles.findIndex((c) => c.cycleNumber === cycle.cycleNumber);

      const updatedCycle: DiagnosticCycle = {
        ...cycle,
        aiAnalysis,
      };

      if (cycleIdx >= 0) {
        cycles[cycleIdx] = updatedCycle;
      } else {
        cycles.push(updatedCycle);
      }

      await supabase
        .from("profiles")
        .update({
          metadata: {
            ...metadata,
            diagnosticCycles: cycles,
          },
        })
        .eq("id", user.id);
    }

    return NextResponse.json({
      success: true,
      aiAnalysis,
    });
  } catch (error) {
    console.error("Diagnostic cycles POST error:", error);
    return NextResponse.json({ error: "Failed to generate AI interpretation" }, { status: 500 });
  }
}
