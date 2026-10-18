import { NextRequest, NextResponse } from "next/server";
import { getCachedWhyWrongExplanation, setCachedWhyWrongExplanation, getCachedSubjectRadarAI, setCachedSubjectRadarAI, getCachedPostMockAI, setCachedPostMockAI } from "@/lib/ai-cache";
import { checkServerRateLimit, getClientIdentifier, getRateLimitHeaders } from "@/lib/rate-limiter";
import { createClient } from "@/lib/supabase/server";
import { tokenLogger } from "@/lib/ai/token-logger";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { getStandingExplanation, StandingExplanationRequest } from "@/lib/ai/standing-explainer";
import { generateSubjectRadarAIAnalysis } from "@/lib/subject-ai-engine";
import { SubjectRadarAIPayload } from "@/types/subject-ai";
import { PostMockDeterministicReport } from "@/types/postMockAnalysis";
import { generatePostMockAIInsight } from "@/lib/post-mock-ai-engine";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export interface WhyWrongResponse {
  questionId: string;
  selectedOption: string;
  correctOption: string;
  correctReasoning: string;
  underlyingConcept: string;
  whyTempting: string;
  similarPracticeQuestion: {
    prompt: string;
    options: Array<{ id: string; text: string }>;
    correctOption: string;
    explanation: string;
  };
  isAiGenerated: boolean;
  model: string;
  isCached: boolean;
  reviewed_by_human?: boolean;
  source?: string;
}

const flaggedExplanationsStore: Array<{
  questionId: string;
  selectedOption: string;
  reason: string;
  flaggedAt: string;
  userId: string;
}> = [];

function getAuthenticSimilarQuestion(subject: string, chapter: string, excludeQuestionId: string) {
  try {
    const testData = getQuestionsForTest(subject.toLowerCase());
    if (testData && testData.questions && testData.questions.length > 0) {
      const chapLower = (chapter || "").toLowerCase().trim();
      const match =
        testData.questions.find(
          (q) => q.id !== excludeQuestionId && q.chapter && q.chapter.toLowerCase().includes(chapLower)
        ) ||
        testData.questions.find((q) => q.id !== excludeQuestionId) ||
        testData.questions[0];

      if (match) {
        return {
          prompt: match.prompt,
          options: match.options.map((o) => ({ id: o.id, text: o.text })),
          correctOption: (match.correctOptionId || "A") as string,
          explanation:
            match.explanation ||
            `Verified NCERT solution: Option (${match.correctOptionId || "A"}) represents the canonical correct principle for ${match.chapter || chapter}.`,
        };
      }
    }
  } catch {}
  return undefined;
}

function buildDeterministicWhyWrong(params: {
  questionId: string;
  prompt: string;
  selectedOption: string;
  correctOption: string;
  subject: string;
  chapter: string;
  baseExplanation?: string;
  source?: string;
  reviewed_by_human?: boolean;
}): WhyWrongResponse {
  const { questionId, selectedOption, correctOption, subject, chapter, baseExplanation, source, reviewed_by_human } = params;

  const reasoning = baseExplanation && baseExplanation.length > 20
    ? baseExplanation
    : `According to standard ${subject} NCERT syllabus (${chapter}), Option (${correctOption}) represents the mathematically and conceptually verified statement.`;

  const concept = `Core foundational principles in ${subject} (${chapter}). Precision with qualifying markers, terms, and standard definitions is essential.`;
  const tempting = `Option (${selectedOption}) is a classic exam distractor designed to attract students who recall part of the terminology but miss crucial constraints or inverse relationships.`;

  const authenticQ = getAuthenticSimilarQuestion(subject, chapter, questionId);
  const similarQ = authenticQ || {
    prompt: `Review the foundational definitions and boundary conditions for ${chapter}.`,
    options: [
      { id: "A", text: `Verify standard theorem statements in NCERT` },
      { id: "B", text: `Verify standard formula application and constraints` },
      { id: "C", text: `Check sign conventions and units` },
      { id: "D", text: `Eliminate distractor options containing NOT/EXCEPT qualifiers` },
    ],
    correctOption: "A",
    explanation: `Consult the NCERT Class 12 textbook summary for ${chapter}.`,
  };

  return {
    questionId,
    selectedOption,
    correctOption,
    correctReasoning: reasoning,
    underlyingConcept: concept,
    whyTempting: tempting,
    similarPracticeQuestion: similarQ,
    isAiGenerated: false,
    model: "deterministic-rule-engine",
    isCached: false,
    reviewed_by_human: reviewed_by_human || false,
    source: source || "NCERT Practice Archive",
  };
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json().catch(() => ({}));
    const queryType = req.nextUrl.searchParams.get("type");

    // ─── ACTION 0: FLAGGING INCORRECT EXPLANATION ────────────────────────────
    if (body.action === "flag") {
      const { questionId, selectedOption, reason, userId = "student" } = body;
      flaggedExplanationsStore.push({
        questionId: questionId || "unknown",
        selectedOption: selectedOption || "unknown",
        reason: reason || "User flagged as inaccurate",
        flaggedAt: new Date().toISOString(),
        userId,
      });
      return NextResponse.json({ success: true, message: "Feedback recorded for review." });
    }

    // Determine target sub-service
    const isWhyWrong =
      queryType === "why-wrong" ||
      Boolean(body.questionId && (body.selectedOption || body.prompt));
    const isSubjectRadar =
      queryType === "subject-radar" ||
      Boolean(body.deterministicStats && body.subject);
    const isPostMock =
      queryType === "post-mock" ||
      Boolean(body.report && body.report.attemptId);
    const isStanding =
      queryType === "standing" ||
      queryType === "standing-explain" ||
      Boolean(body.targetCollege && body.courseName);
    const isDiagnoseMistake =
      queryType === "diagnose-mistake" ||
      body.action === "diagnose-mistake";

    // Enforce Premium access on AI debrief, radar, post-mock, and standing features
    if (isSubjectRadar || isPostMock || isStanding || isWhyWrong) {
      const supabase = createClient();
      let authUserId: string | null = null;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) authUserId = user.id;
      } catch {}

      const { getUserEntitlement } = await import("@/lib/payments/entitlements");
      const entitlement = await getUserEntitlement(authUserId || body.userId || "");
      if (!entitlement.isPremium) {
        return NextResponse.json(
          {
            error: "Unlock this feature with CUETMate Premium.",
            code: "PAYWALL_FEATURE_LOCKED",
            feature: isSubjectRadar ? "radar" : isStanding ? "standing" : "ai_insights",
          },
          { status: 403 }
        );
      }
    }

    // ─── 1. STANDING COLLEGE GAP EXPLANATION ────────────────────────────────
    if (isStanding) {
      const standingPayload = body as StandingExplanationRequest;
      if (!standingPayload || !standingPayload.targetCollege || !standingPayload.courseName) {
        return NextResponse.json(
          { error: "Missing required parameters for standing explanation." },
          { status: 400 }
        );
      }

      let authUserId: string | null = null;
      try {
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser?.id) authUserId = authUser.id;
      } catch {}

      const clientIdentifier = getClientIdentifier(req, authUserId || standingPayload.userId);
      const rateCheck = checkServerRateLimit("standing_explain", clientIdentifier, 30);
      if (!rateCheck.allowed) {
        return NextResponse.json(
          {
            error: "Daily explanation limit reached. Please try again tomorrow.",
            limit: rateCheck.limit,
            remaining: 0,
          },
          { status: 429, headers: getRateLimitHeaders(rateCheck) }
        );
      }

      const explanation = await getStandingExplanation(standingPayload);
      return NextResponse.json(explanation, {
        headers: getRateLimitHeaders(rateCheck),
      });
    }

    // ─── 2. SUBJECT RADAR AI DEBRIEF ─────────────────────────────────────────
    if (isSubjectRadar) {
      const radarPayload: SubjectRadarAIPayload = body;
      const { subject, deterministicStats, cycleInfo } = radarPayload;

      if (!subject || !deterministicStats) {
        return NextResponse.json(
          { error: "Invalid payload: subject and deterministicStats required" },
          { status: 400 }
        );
      }

      let authUserId: string | null = null;
      try {
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser?.id) authUserId = authUser.id;
      } catch {}

      const userId = radarPayload.userId || authUserId || "guest";
      const totalAttempted = deterministicStats.totalAttempted || 0;
      const cycleQuestionCount = cycleInfo?.currentCycleQuestionCount ?? totalAttempted;
      const isCompletedCycle = cycleQuestionCount >= 150 || totalAttempted >= 150;

      if (!isCompletedCycle) {
        return NextResponse.json(
          {
            error: "Calibration Incomplete: Minimum 150 qualifying questions required for Subject Weakness Radar analysis.",
            currentCycleQuestionCount: cycleQuestionCount,
            required: 150,
          },
          { status: 400 }
        );
      }

      const fingerprint = `${deterministicStats.totalAttempted}_${deterministicStats.accuracyPercentage}_${
        cycleInfo?.currentCycleNumber || 1
      }_${cycleQuestionCount}`;

      const cached = getCachedSubjectRadarAI(userId, subject, fingerprint);
      if (cached) {
        return NextResponse.json({
          success: true,
          source: "cache",
          aiAnalysis: cached,
        });
      }

      const clientIdentifier = getClientIdentifier(req, authUserId || userId);
      const rateCheck = checkServerRateLimit("subject_radar", clientIdentifier, 15);
      if (!rateCheck.allowed) {
        return NextResponse.json(
          { error: "Daily limit for Subject Weakness Radar AI analysis reached.", remaining: 0 },
          { status: 429, headers: getRateLimitHeaders(rateCheck) }
        );
      }

      const aiAnalysis = await generateSubjectRadarAIAnalysis(radarPayload);
      setCachedSubjectRadarAI(userId, subject, fingerprint, aiAnalysis);

      return NextResponse.json(
        { success: true, source: "generated", aiAnalysis },
        { headers: getRateLimitHeaders(rateCheck) }
      );
    }

    // ─── 3. POST-MOCK DEBRIEF INSIGHT ────────────────────────────────────────
    if (isPostMock) {
      const { report, userId: clientUserId } = body as {
        report: PostMockDeterministicReport;
        userId?: string;
      };

      if (!report || !report.attemptId || !report.overall) {
        return NextResponse.json(
          { error: "Invalid payload. Valid PostMockDeterministicReport is required." },
          { status: 400 }
        );
      }

      let activeUserId = clientUserId || report.userId || "guest";
      try {
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser?.id) activeUserId = authUser.id;
      } catch {}

      const fingerprint = `${report.overall.attemptedCount}_${report.overall.correctCount}_${report.overall.totalMarks}_${report.allQuestions?.length || 0}`;

      const cached = getCachedPostMockAI(activeUserId, report.attemptId, fingerprint);
      if (cached) {
        return NextResponse.json(
          { aiInsight: cached, cached: true },
          { headers: { "X-Cache": "HIT" } }
        );
      }

      const clientIdentifier = getClientIdentifier(req, activeUserId);
      const rateCheck = checkServerRateLimit("post_mock", clientIdentifier, 30);
      if (!rateCheck.allowed) {
        return NextResponse.json(
          { error: "Daily limit for Post-Mock AI insight reached.", remaining: 0 },
          { status: 429, headers: getRateLimitHeaders(rateCheck) }
        );
      }

      const aiInsight = await generatePostMockAIInsight(report);
      setCachedPostMockAI(activeUserId, report.attemptId, fingerprint, aiInsight);

      return NextResponse.json(
        { aiInsight, cached: false },
        { headers: getRateLimitHeaders(rateCheck) }
      );
    }

    // ─── 4. DIAGNOSE MISTAKE (BACKWARDS COMPATIBILITY) ───────────────────────
    if (isDiagnoseMistake) {
      const { diagnoseMistakeDeterministically } = await import("@/lib/mistake-detective");
      const { diagnoseMistake } = await import("@/lib/ai/gemini-diagnostics");

      const {
        questionId,
        selectedOption,
        questionText,
        selectedOptionText,
        correctOption,
        correctOptionText,
        explanation,
        microTopic,
        timeSpentSeconds,
      } = body;

      if (!questionId || !selectedOption) {
        return NextResponse.json(
          { error: "questionId and selectedOption are required." },
          { status: 400 }
        );
      }

      const result = await diagnoseMistake({
        questionId,
        selectedOption,
        questionText: questionText || "CUET Exam Question",
        selectedOptionText,
        correctOption: correctOption || "A",
        correctOptionText,
        explanation,
        microTopic,
        timeSpentSeconds,
      });

      const v2Diagnostic = diagnoseMistakeDeterministically({
        questionId,
        selectedOption,
        selectedOptionText,
        correctOption: correctOption || "A",
        correctOptionText,
        questionText: questionText || "CUET Exam Question",
        explanation,
        chapter: body.chapter || microTopic,
        microTopic,
        subject: body.subject,
        timeSpentSeconds,
        questionType: body.questionType,
        archetype: body.archetype,
        distractorTrap: body.distractorTrap,
        misconceptionDescription: body.misconceptionDescription,
        recentMistakeCountOnTopic: body.recentMistakeCountOnTopic || 0,
      });

      return NextResponse.json({ ...result, v2: v2Diagnostic }, { status: 200 });
    }

    // ─── 5. WHY-WRONG QUESTION ERROR EXPLANATION (DEFAULT) ───────────────────
    if (isWhyWrong) {
      const {
        questionId,
        prompt,
        options = [],
        selectedOption,
        correctOption,
        subject = "General",
        chapter = "Core Concepts",
        explanation: baseExplanation = "",
        userId = "student",
        source,
        reviewed_by_human,
      } = body;

      if (!questionId || !selectedOption || !correctOption) {
        return NextResponse.json(
          { error: "questionId, selectedOption, and correctOption are required." },
          { status: 400 }
        );
      }

      const cached = getCachedWhyWrongExplanation(questionId, selectedOption);
      if (cached) {
        tokenLogger.logUsage({
          userId,
          feature: "why_wrong",
          model: cached.model || "cached",
          promptTokens: 0,
          completionTokens: 0,
          latencyMs: Date.now() - startTime,
          cached: true,
        });
        return NextResponse.json({
          success: true,
          data: {
            ...cached,
            isCached: true,
          },
        });
      }

      let authUserId: string | null = null;
      try {
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) authUserId = authUser.id;
      } catch {}

      const clientIdentifier = getClientIdentifier(req, authUserId || userId);
      const rateCheck = checkServerRateLimit("why_wrong", clientIdentifier, 40);
      if (!rateCheck.allowed) {
        const fallback = buildDeterministicWhyWrong({
          questionId,
          prompt,
          selectedOption,
          correctOption,
          subject,
          chapter,
          baseExplanation,
          source,
          reviewed_by_human,
        });
        return NextResponse.json(
          {
            success: true,
            data: fallback,
            rateLimited: true,
            message: rateCheck.error,
          },
          { headers: getRateLimitHeaders(rateCheck) }
        );
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        const fallback = buildDeterministicWhyWrong({
          questionId,
          prompt,
          selectedOption,
          correctOption,
          subject,
          chapter,
          baseExplanation,
          source,
          reviewed_by_human,
        });
        setCachedWhyWrongExplanation(questionId, selectedOption, fallback);
        return NextResponse.json({ success: true, data: fallback });
      }

      const groq = new Groq({ apiKey });

      const selectedText = options.find((o: any) => o.id === selectedOption)?.text || selectedOption;
      const correctText = options.find((o: any) => o.id === correctOption)?.text || correctOption;

      const systemPrompt = `You are an expert CUET exam tutor. Explain why a student chose an incorrect option and why the correct option is right.
Output strictly valid JSON with no markdown wrapping and no additional text.
Schema:
{
  "correctReasoning": "Concise step-by-step why the correct option is right",
  "underlyingConcept": "1-2 sentence explanation of the core concept tested",
  "whyTempting": "Why option chosen by student is tempting (distractor analysis)",
  "similarPracticeQuestion": {
    "prompt": "One similar multiple choice question on the same concept",
    "options": [
      {"id": "A", "text": "Option A"},
      {"id": "B", "text": "Option B"},
      {"id": "C", "text": "Option C"},
      {"id": "D", "text": "Option D"}
    ],
    "correctOption": "A/B/C/D",
    "explanation": "Short explanation of correct answer"
  }
}`;

      const userPrompt = `Subject: ${subject}
Chapter: ${chapter}
Question: ${prompt}
Student selected: ${selectedOption} (${selectedText})
Correct answer: ${correctOption} (${correctText})
Base reference: ${baseExplanation || "Standard NCERT curriculum"}`;

      try {
        const completion = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
          max_tokens: 600,
          response_format: { type: "json_object" },
        });

        const latencyMs = Date.now() - startTime;
        const usage = completion.usage;
        tokenLogger.logUsage({
          userId,
          feature: "why_wrong",
          model: "llama-3.1-8b-instant",
          promptTokens: usage?.prompt_tokens || 150,
          completionTokens: usage?.completion_tokens || 200,
          latencyMs,
          cached: false,
        });

        const parsed = JSON.parse(completion.choices[0]?.message?.content || "{}");

        if (parsed.correctReasoning && parsed.underlyingConcept && parsed.whyTempting) {
          const result: WhyWrongResponse = {
            questionId,
            selectedOption,
            correctOption,
            correctReasoning: parsed.correctReasoning,
            underlyingConcept: parsed.underlyingConcept,
            whyTempting: parsed.whyTempting,
            similarPracticeQuestion: parsed.similarPracticeQuestion || {
              prompt: `Practice concept question on ${chapter}`,
              options: [
                { id: "A", text: "Option A" },
                { id: "B", text: "Option B" },
                { id: "C", text: "Option C" },
                { id: "D", text: "Option D" },
              ],
              correctOption: "B",
              explanation: "Core textbook definition",
            },
            isAiGenerated: true,
            model: "llama-3.1-8b-instant",
            isCached: false,
            reviewed_by_human: reviewed_by_human || false,
            source: source || "AI Tutor (Grounded in NCERT)",
          };

          setCachedWhyWrongExplanation(questionId, selectedOption, result);
          return NextResponse.json({ success: true, data: result });
        }
      } catch (llmErr) {
        console.warn("Groq LLM call failed, falling back to deterministic explanation:", llmErr);
      }

      const fallback = buildDeterministicWhyWrong({
        questionId,
        prompt,
        selectedOption,
        correctOption,
        subject,
        chapter,
        baseExplanation,
        source,
        reviewed_by_human,
      });
      setCachedWhyWrongExplanation(questionId, selectedOption, fallback);
      return NextResponse.json({ success: true, data: fallback });
    }

    return NextResponse.json(
      { error: "Unrecognized request type or missing parameters in AI insights endpoint." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("AI Insights API error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI insights", details: error?.message },
      { status: 500 }
    );
  }
}
