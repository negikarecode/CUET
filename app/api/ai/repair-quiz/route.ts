import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Question } from "@/types";
import {
  checkRateLimit,
  incrementUsage,
  getRateLimitHeaders,
} from "@/lib/rate-limiter";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";

interface RepairQuizRequestBody {
  userId: string;
  weakMicroTopics: string[];
  subject?: string;
}

export interface RepairQuizResponse {
  testId: string;
  title: string;
  subject: string;
  code: string;
  totalQuestions: 5;
  durationMinutes: 8;
  targetTopics: string[];
  questions: Question[];
}

// In-memory response cache for rapid remedial quiz re-clicks
const memoryQuizCache = new Map<
  string,
  { data: RepairQuizResponse; cachedAt: number }
>();
const QUIZ_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RepairQuizRequestBody;
    const { userId = "user_cuet_aspirant_01", weakMicroTopics, subject } = body;

    if (!Array.isArray(weakMicroTopics) || weakMicroTopics.length === 0) {
      return NextResponse.json(
        { error: "weakMicroTopics array is required." },
        { status: 400 }
      );
    }

    const primaryTopics = weakMicroTopics.slice(0, 3);
    const cacheKey = `${userId}:${subject || "general"}:${primaryTopics.sort().join("_")}`;

    // 1. Check Response Cache FIRST
    const cachedQuiz = memoryQuizCache.get(cacheKey);
    if (cachedQuiz && Date.now() - cachedQuiz.cachedAt < QUIZ_CACHE_TTL_MS) {
      return NextResponse.json(cachedQuiz.data, {
        headers: { "X-Cache": "HIT" },
      });
    }

    // 2. Check Daily Rate Limit
    let isPaidUser = false;
    try {
      const supabase = createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", userId)
        .single();
      if (profile?.is_premium) isPaidUser = true;
    } catch {
      // fallback
    }

    const rateLimit = await checkRateLimit(userId, isPaidUser);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Daily AI analysis limit reached. Upgrade to unlock more.",
          limit: rateLimit.limit,
          remaining: 0,
          resetAt: rateLimit.resetAt,
          upgradeUrl: "/#pricing",
        },
        { status: 429, headers: getRateLimitHeaders(rateLimit) }
      );
    }

    const selectedQuestions: Question[] = [];

    // 1. Query Supabase for unattempted or previously failed questions
    try {
      const supabase = createClient();

      // Find question IDs already attempted by the user
      let attemptedQuestionIds: string[] = [];
      if (userId) {
        const { data: userAttempts } = await supabase
          .from("user_attempts")
          .select("question_id, is_correct")
          .eq("user_id", userId);

        if (userAttempts) {
          // Only exclude questions that were already solved correctly
          attemptedQuestionIds = userAttempts
            .filter((a) => a.is_correct === true)
            .map((a) => a.question_id);
        }
      }

      // Query database questions matching the micro topics
      let query = supabase.from("questions").select("*");

      if (primaryTopics.length > 0) {
        query = query.in("micro_topic", primaryTopics);
      }

      const { data: dbQuestions } = await query.limit(10);

      if (dbQuestions && dbQuestions.length > 0) {
        // Filter out mastered questions first
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

    // 2. Curated Question Bank Selection (0-Token Programmatic Adaptive Retrieval)
    // Ensures no LLM API calls are ever made to create question stems or options from scratch.
    if (selectedQuestions.length < 5) {
      const neededCount = 5 - selectedQuestions.length;
      const targetSubj = (subject || "physics").toLowerCase();
      const testFallback = getQuestionsForTest(targetSubj);
      const allSubjectQs = testFallback.questions || [];

      // Find questions matching any of the primary weak topics or chapter
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

      const poolToTakeFrom = topicMatches.length >= neededCount ? topicMatches : [...topicMatches, ...otherMatches];

      for (let i = 0; i < neededCount && i < poolToTakeFrom.length; i++) {
        const sourceQ = poolToTakeFrom[i]!;
        const qNum = selectedQuestions.length + 1;
        selectedQuestions.push({
          ...sourceQ,
          id: `repair_${Date.now()}_q${qNum}`,
          questionNumber: qNum,
          aiDiagnosisNotes: `Targeted Concept Remediation: Reinforcing key principles from ${sourceQ.chapter} (${sourceQ.topic}).`,
          pyqSource: "Targeted CUET Diagnostic Repair Set",
        });
      }
    }

    const testId = `repair_quiz_${(subject || "physics").toLowerCase().replace(/[^a-z0-9]/g, "_")}_${Date.now()}`;
    const responsePayload: RepairQuizResponse = {
      testId,
      title: `5-Question AI Repair Quiz: ${primaryTopics.join(", ")}`,
      subject: subject || "Targeted Concept Remediation",
      code: "AI-REPAIR-05",
      totalQuestions: 5,
      durationMinutes: 8,
      targetTopics: primaryTopics,
      questions: selectedQuestions.slice(0, 5),
    };

    // 4. Save to in-memory quiz cache
    memoryQuizCache.set(cacheKey, {
      data: responsePayload,
      cachedAt: Date.now(),
    });

    // 5. Increment usage count
    await incrementUsage(userId);

    return NextResponse.json(responsePayload, {
      headers: {
        "X-Cache": "MISS",
        ...getRateLimitHeaders({
          allowed: true,
          limit: rateLimit.limit,
          remaining: Math.max(0, rateLimit.remaining - 1),
          resetAt: rateLimit.resetAt,
        }),
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
