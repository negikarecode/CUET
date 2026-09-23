import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { checkAIQualificationGate } from "@/lib/ai-gate";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { Question } from "@/types";

export const dynamic = "force-dynamic";

const CADENCE_LIMIT_HOURS = 12;
const CADENCE_LIMIT_MS = CADENCE_LIMIT_HOURS * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    let userId = "user_cuet_aspirant_01";

    const supabase = createClient();
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
      }
    } catch {
      // Fallback to body or default
    }

    try {
      const body = await req.json().catch(() => ({}));
      if (body?.userId && userId === "user_cuet_aspirant_01") {
        userId = body.userId;
      }
    } catch {
      // Ignore body parse errors if empty
    }

    // ─── 1. COLD-START QUALIFICATION GATE CHECK (Phase 2) ───────────────────
    const gateStatus = await checkAIQualificationGate(userId);
    if (!gateStatus.isUnlocked) {
      return NextResponse.json(
        {
          success: false,
          error: "QUALIFICATION_GATE_LOCKED",
          message: `AI Adaptive Drills require at least 150 question attempts to calibrate. Current: ${gateStatus.totalAttempts}/150 questions attempted.`,
          totalAttempts: gateStatus.totalAttempts,
          requiredAttempts: gateStatus.requiredAttempts,
          remainingAttempts: gateStatus.remainingAttempts,
        },
        { status: 403 }
      );
    }

    // ─── 2. DAILY CADENCE LIMITER (Max 1 per 12 hours) ──────────────────────
    const { data: profile } = await supabase
      .from("profiles")
      .select("last_adaptive_drill_at")
      .eq("id", userId)
      .maybeSingle();

    if (profile?.last_adaptive_drill_at) {
      const lastDrillTime = new Date(profile.last_adaptive_drill_at).getTime();
      const elapsedMs = Date.now() - lastDrillTime;

      if (elapsedMs < CADENCE_LIMIT_MS) {
        const remainingMs = CADENCE_LIMIT_MS - elapsedMs;
        const remainingHours = Math.ceil(remainingMs / (60 * 60 * 1000));
        const nextAvailableAt = new Date(lastDrillTime + CADENCE_LIMIT_MS).toISOString();

        return NextResponse.json(
          {
            success: false,
            error: "CADENCE_LIMIT_EXCEEDED",
            message: `Adaptive practice drills are limited to 1 every 12 hours (max 2/day) to allow concept consolidation. Next drill available in ~${remainingHours} hour(s).`,
            nextAvailableAt,
            elapsedHours: Math.round(elapsedMs / (60 * 60 * 1000)),
          },
          { status: 429 }
        );
      }
    }

    // ─── 3. QUERY PACING ANALYTICS FOR TOP 3 WEAKEST MICRO-TOPICS ───────────
    let weakMicroTopics: string[] = [];

    try {
      const { data: pacingRows } = await supabase
        .from("pacing_analytics_summary")
        .select("micro_topic, accuracy_percentage")
        .eq("user_id", userId)
        .order("accuracy_percentage", { ascending: true })
        .limit(3);

      if (pacingRows && pacingRows.length > 0) {
        weakMicroTopics = pacingRows.map((r: any) => r.micro_topic).filter(Boolean);
      }
    } catch (pacingErr) {
      console.warn("Failed to fetch from pacing_analytics_summary:", pacingErr);
    }

    // Fallback weak topics from user attempts if pacing view returned fewer than 3
    if (weakMicroTopics.length < 3) {
      try {
        const { data: wrongAttempts } = await supabase
          .from("user_attempts")
          .select("question_id, questions(micro_topic)")
          .eq("user_id", userId)
          .eq("is_correct", false)
          .limit(20);

        if (wrongAttempts) {
          wrongAttempts.forEach((wa: any) => {
            const mt = wa.questions?.micro_topic;
            if (mt && !weakMicroTopics.includes(mt)) {
              weakMicroTopics.push(mt);
            }
          });
        }
      } catch {
        // Fallback
      }
    }

    // Default NCERT weak topics if still empty
    if (weakMicroTopics.length === 0) {
      weakMicroTopics = [
        "Electromagnetic Induction & Lenz Law",
        "Wave Optics & Youngs Double Slit",
        "Thermodynamics & Carnot Cycle",
      ];
    }
    const targetTopics = weakMicroTopics.slice(0, 3);

    // ─── 4. FETCH 5 UNATTEMPTED QUESTIONS PER WEAK TOPIC (0 TOKENS) ─────────
    // Query already attempted question IDs
    const { data: userAttempts } = await supabase
      .from("user_attempts")
      .select("question_id")
      .eq("user_id", userId);

    const attemptedIds = new Set<string>(
      (userAttempts || []).map((ua: any) => ua.question_id)
    );

    const assembledQuestions: Question[] = [];
    const usedQuestionIds = new Set<string>();

    for (const topic of targetTopics) {
      let topicQuestions: any[] = [];

      try {
        const { data: dbQuestions } = await supabase
          .from("questions")
          .select("*")
          .eq("micro_topic", topic)
          .limit(15);

        if (dbQuestions && dbQuestions.length > 0) {
          topicQuestions = dbQuestions.filter(
            (q: any) => !attemptedIds.has(q.id) && !usedQuestionIds.has(q.id)
          );
        }
      } catch {
        // Ignore DB query errors
      }

      // If unattempted questions from DB are fewer than 5, try partial matches or catalog
      if (topicQuestions.length < 5) {
        try {
          const { data: similarQuestions } = await supabase
            .from("questions")
            .select("*")
            .ilike("micro_topic", `%${topic.split(" ")[0]}%`)
            .limit(10);

          if (similarQuestions) {
            similarQuestions.forEach((q: any) => {
              if (
                topicQuestions.length < 5 &&
                !attemptedIds.has(q.id) &&
                !usedQuestionIds.has(q.id)
              ) {
                topicQuestions.push(q);
              }
            });
          }
        } catch {
          // Ignore
        }
      }

      // Map to Question interface
      topicQuestions.slice(0, 5).forEach((q: any) => {
        usedQuestionIds.add(q.id);
        const qNum = assembledQuestions.length + 1;
        assembledQuestions.push({
          id: q.id,
          subjectId: (q.subject || "physics").toLowerCase(),
          questionNumber: qNum,
          prompt: q.question_text,
          options: [
            { id: "A", text: q.option_a },
            { id: "B", text: q.option_b },
            { id: "C", text: q.option_c },
            { id: "D", text: q.option_d },
          ],
          correctOptionId: q.correct_option as "A" | "B" | "C" | "D",
          explanation: q.explanation,
          aiDiagnosisNotes: `Zero-Token Adaptive Drill: Remediating weakness in ${topic}`,
          pyqSource: q.ncert_reference || "NCERT Diagnostic Remediation",
          topic: q.micro_topic || topic,
          chapter: q.chapter,
          difficulty: q.archetype === "Numerical" ? "hard" : "medium",
        });
      });
    }

    // ─── 5. BACKFILL FROM VERIFIED QUESTION BANK IF FEWER THAN 15 ───────────
    if (assembledQuestions.length < 15) {
      const fallbackSet = getQuestionsForTest("physics");
      const fallbackQuestions = fallbackSet.questions || [];

      for (const fq of fallbackQuestions) {
        if (assembledQuestions.length >= 15) break;
        if (!usedQuestionIds.has(fq.id) && !attemptedIds.has(fq.id)) {
          usedQuestionIds.add(fq.id);
          const qNum = assembledQuestions.length + 1;
          assembledQuestions.push({
            ...fq,
            questionNumber: qNum,
            aiDiagnosisNotes: `Adaptive Practice Drill: Reinforcing core ${fq.topic}`,
          });
        }
      }
    }

    const finalQuestions = assembledQuestions.slice(0, 15);
    const drillTestId = `adaptive_drill_${userId.slice(0, 8)}_${Date.now()}`;
    const subject = finalQuestions[0]?.subjectId || "Science";

    // ─── 6. PERSIST DRILL GENERATION TIMESTAMP IN USER PROFILE ──────────────
    try {
      await supabaseAdmin
        .from("profiles")
        .update({ last_adaptive_drill_at: new Date().toISOString() })
        .eq("id", userId);
    } catch (updErr) {
      console.warn("Failed to update last_adaptive_drill_at:", updErr);
    }

    // ─── 7. REGISTER TEST IN DATABASE FOR CBT RUNTIME COMPATIBILITY ─────────
    try {
      await supabaseAdmin.from("tests").upsert(
        {
          id: drillTestId,
          title: `15-Question Adaptive Micro-Drill (${targetTopics.join(", ")})`,
          subject,
          total_questions: finalQuestions.length,
          duration_minutes: 18,
          is_active: true,
        },
        { onConflict: "id" }
      );
    } catch {
      // Test registered or in-memory
    }

    return NextResponse.json({
      success: true,
      testId: drillTestId,
      title: `15-Question Adaptive Micro-Drill: ${targetTopics.join(", ")}`,
      subject,
      code: "ADAPTIVE-15",
      totalQuestions: finalQuestions.length,
      durationMinutes: 18,
      targetTopics,
      questions: finalQuestions,
      cadence: {
        lastDrillAt: new Date().toISOString(),
        nextAvailableAt: new Date(Date.now() + CADENCE_LIMIT_MS).toISOString(),
        cooldownHours: CADENCE_LIMIT_HOURS,
      },
    });
  } catch (error) {
    console.error("Adaptive Test Compiler Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error in adaptive drill compiler." },
      { status: 500 }
    );
  }
}
