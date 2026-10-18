import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Question } from "@/types";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { checkServerRateLimit, getClientIdentifier, getRateLimitHeaders } from "@/lib/rate-limiter";
import { tokenLogger } from "@/lib/ai/token-logger";
import { checkAIQualificationGate } from "@/lib/ai-gate";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CADENCE_LIMIT_HOURS = 12;
const CADENCE_LIMIT_MS = CADENCE_LIMIT_HOURS * 60 * 60 * 1000;

interface RepairQuizRequestBody {
  userId?: string;
  weakMicroTopics?: string[];
  subject?: string;
  practiceType?: string;
  drillType?: "remedial" | "adaptive";
  questionCount?: number;
}

export interface RepairQuizResponse {
  testId: string;
  title: string;
  subject: string;
  code: string;
  totalQuestions: number;
  durationMinutes: number;
  targetTopics: string[];
  questions: Question[];
}

const memoryQuizCache = new Map<
  string,
  { data: RepairQuizResponse; cachedAt: number }
>();
const QUIZ_CACHE_TTL_MS = 5 * 60 * 1000;

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = (await req.json().catch(() => ({}))) as RepairQuizRequestBody;
    const urlParams = req.nextUrl.searchParams;
    const isAdaptiveDrill =
      body.drillType === "adaptive" ||
      body.questionCount === 15 ||
      urlParams.get("type") === "adaptive";

    const supabase = createClient();
    let authUser = null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      authUser = user;
    } catch {
      // Fallback
    }

    const { getUserEntitlement } = await import("@/lib/payments/entitlements");
    const entitlement = await getUserEntitlement(authUser?.id || body.userId || "");
    if (!entitlement.isPremium) {
      return NextResponse.json(
        {
          error: "Unlock this feature with CUETMate Premium.",
          code: "PAYWALL_FEATURE_LOCKED",
          feature: "repair_quiz",
        },
        { status: 403 }
      );
    }

    // ─── CASE A: 15-QUESTION ADAPTIVE PRACTICE DRILL ─────────────────────────
    if (isAdaptiveDrill) {

      if (!authUser) {
        return NextResponse.json(
          { success: false, error: "Unauthorized: Active user session required." },
          { status: 401 }
        );
      }

      const userId = authUser.id;

      // 1. Cold-start qualification gate (150 questions)
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

      // 2. Daily cadence limiter (1 per 12 hours)
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

      // 3. Query weak micro-topics
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

      if (weakMicroTopics.length === 0) {
        weakMicroTopics = [
          "Electromagnetic Induction & Lenz Law",
          "Wave Optics & Youngs Double Slit",
          "Thermodynamics & Carnot Cycle",
        ];
      }
      const targetTopics = weakMicroTopics.slice(0, 3);

      // 4. Fetch 5 unattempted questions per weak topic (0 tokens)
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

      try {
        await supabaseAdmin
          .from("profiles")
          .update({ last_adaptive_drill_at: new Date().toISOString() })
          .eq("id", userId);
      } catch (updErr) {
        console.warn("Failed to update last_adaptive_drill_at:", updErr);
      }

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
    }

    // ─── CASE B: 5-QUESTION TARGETED REMEDIAL REPAIR QUIZ ────────────────────
    const { userId: bodyUserId, weakMicroTopics, subject, practiceType } = body;

    if (!Array.isArray(weakMicroTopics) || weakMicroTopics.length === 0) {
      return NextResponse.json(
        { error: "weakMicroTopics array is required." },
        { status: 400 }
      );
    }

    let authUserId: string | null = null;
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser?.id) authUserId = authUser.id;
    } catch {}

    const clientIdentifier = getClientIdentifier(req, authUserId || bodyUserId);
    const userId = authUserId || bodyUserId || clientIdentifier;

    const primaryTopics = weakMicroTopics.slice(0, 3);
    const cacheKey = `${clientIdentifier}:${subject || "general"}:${primaryTopics.sort().join("_")}`;

    const isRetest = practiceType === "retest";
    const cachedQuiz = !isRetest ? memoryQuizCache.get(cacheKey) : null;
    if (cachedQuiz && Date.now() - cachedQuiz.cachedAt < QUIZ_CACHE_TTL_MS) {
      tokenLogger.logUsage({
        userId,
        feature: "repair_quiz",
        model: "cache",
        promptTokens: 0,
        completionTokens: 0,
        latencyMs: Date.now() - startTime,
        cached: true,
      });
      return NextResponse.json(cachedQuiz.data, {
        headers: { "X-Cache": "HIT" },
      });
    }

    const rateLimit = checkServerRateLimit("repair_drills", clientIdentifier, 30);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: rateLimit.error || "Daily practice drill limit reached for today. Resets tomorrow.",
          remaining: 0,
        },
        { status: 429, headers: getRateLimitHeaders(rateLimit) }
      );
    }

    const selectedQuestions: Question[] = [];
    let attemptedQuestionIds: string[] = [];

    try {
      const supabase = createClient();
      if (userId) {
        const { data: userAttempts } = await supabase
          .from("user_attempts")
          .select("question_id, is_correct")
          .eq("user_id", userId);

        if (userAttempts) {
          attemptedQuestionIds = userAttempts
            .filter((a) => a.is_correct === true)
            .map((a) => a.question_id);
        }
      }

      let query = supabase.from("questions").select("*");
      if (primaryTopics.length > 0) {
        query = query.in("micro_topic", primaryTopics);
      }

      const { data: dbQuestions } = await query.limit(10);
      if (dbQuestions && dbQuestions.length > 0) {
        const candidates = dbQuestions.filter(
          (q) => !attemptedQuestionIds.includes(q.id)
        );
        const poolToUse = candidates.length >= 5 ? candidates : dbQuestions;

        poolToUse.slice(0, 5).forEach((q, idx) => {
          selectedQuestions.push({
            id: q.id,
            subjectId: q.subject.toLowerCase(),
            questionNumber: idx + 1,
            prompt: q.question_text,
            options: [
              { id: "A", text: q.option_a },
              { id: "B", text: q.option_b },
              { id: "C", text: q.option_c },
              { id: "D", text: q.option_d },
            ],
            correctOptionId: q.correct_option as "A" | "B" | "C" | "D",
            explanation: q.explanation,
            aiDiagnosisNotes: `Targeted Repair Focus: Addressing misconception in ${q.micro_topic}.`,
            pyqSource: q.is_pyq ? `CUET UG ${q.pyq_year} PYQ` : "Targeted NCERT Remediation",
            topic: q.micro_topic,
            difficulty: "medium",
          });
        });
      }
    } catch {
      // Offline fallback
    }

    if (selectedQuestions.length < 5) {
      const neededCount = 5 - selectedQuestions.length;
      const targetSubj = (subject || "physics").toLowerCase();
      const testFallback = getQuestionsForTest(targetSubj);
      const allSubjectQs = testFallback.questions || [];

      const topicMatches: Question[] = [];
      const otherMatches: Question[] = [];

      for (const q of allSubjectQs) {
        if (selectedQuestions.some((sq) => sq.id === q.id)) continue;
        const qTopicLower = (q.topic || "").toLowerCase();
        const qChapLower = (q.chapter || "").toLowerCase();
        const matchesTopic = primaryTopics.some((t) => {
          const tLow = t.toLowerCase();
          return qTopicLower.includes(tLow) || tLow.includes(qTopicLower) || qChapLower.includes(tLow);
        });

        if (matchesTopic) {
          topicMatches.push(q);
        } else {
          otherMatches.push(q);
        }
      }

      const unattemptedTopicMatches = topicMatches.filter((q) => !attemptedQuestionIds.includes(q.id));
      const unattemptedOtherMatches = otherMatches.filter((q) => !attemptedQuestionIds.includes(q.id));

      const poolToTakeFrom =
        unattemptedTopicMatches.length >= neededCount
          ? unattemptedTopicMatches
          : unattemptedTopicMatches.length + unattemptedOtherMatches.length >= neededCount
          ? [...unattemptedTopicMatches, ...unattemptedOtherMatches]
          : topicMatches.length >= neededCount
          ? topicMatches
          : [...topicMatches, ...otherMatches];

      for (let i = 0; i < neededCount && i < poolToTakeFrom.length; i++) {
        const sourceQ = poolToTakeFrom[i]!;
        const qNum = selectedQuestions.length + 1;
        selectedQuestions.push({
          ...sourceQ,
          id: sourceQ.id || (sourceQ as unknown as { questionId?: string }).questionId || `repair_q${qNum}`,
          questionNumber: qNum,
          aiDiagnosisNotes: `Targeted Concept Remediation: Reinforcing key principles from ${sourceQ.chapter} (${sourceQ.topic}).`,
          pyqSource: "Targeted CUET Diagnostic Repair Set",
        });
      }
    }

    const structuredDrillQuestions = selectedQuestions.slice(0, 5).map((q, idx) => {
      let stageTag = "Foundation & Core Concept";
      let targetDifficulty: "easy" | "medium" | "hard" = "easy";
      if (idx === 0) {
        stageTag = "Stage 1: Core Concept Definition & Formula Check";
        targetDifficulty = "easy";
      } else if (idx === 1) {
        stageTag = "Stage 2: Conceptual Direct Recall & NCERT Fact";
        targetDifficulty = "easy";
      } else if (idx === 2) {
        stageTag = "Stage 3: Concept Application & Multi-Step Logic";
        targetDifficulty = "medium";
      } else if (idx === 3) {
        stageTag = "Stage 4: CUET-Level Application & Distractor Trap Variant";
        targetDifficulty = "hard";
      } else {
        stageTag = "Stage 5: Speed Validation Drill (Target: ≤60s)";
        targetDifficulty = "medium";
      }

      return {
        ...q,
        questionNumber: idx + 1,
        difficulty: targetDifficulty,
        aiDiagnosisNotes: `${stageTag}: Addressing detected pattern in ${primaryTopics.join(", ")}.`,
      };
    });

    const testId = `repair_quiz_${(subject || "physics").toLowerCase().replace(/[^a-z0-9]/g, "_")}_${Date.now()}`;
    const responsePayload: RepairQuizResponse = {
      testId,
      title: `Adaptive Repair Drill • ${primaryTopics.join(", ")}`,
      subject: subject || "Targeted Concept Remediation",
      code: "AI-REPAIR-05",
      totalQuestions: 5,
      durationMinutes: 6,
      targetTopics: primaryTopics,
      questions: structuredDrillQuestions,
    };

    memoryQuizCache.set(cacheKey, {
      data: responsePayload,
      cachedAt: Date.now(),
    });

    tokenLogger.logUsage({
      userId,
      feature: "repair_quiz",
      model: "curated_bank",
      promptTokens: 0,
      completionTokens: 0,
      latencyMs: Date.now() - startTime,
      cached: false,
    });

    return NextResponse.json(responsePayload, {
      headers: {
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("AI Repair Quiz Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error in repair quiz generator." },
      { status: 500 }
    );
  }
}
