import Groq from "groq-sdk";
import { AICoachComputedStats, AICoachReportContent, BiggestLeak, WeeklyPlanItem } from "@/types/ai-coach";
import { AI_COACH_CONFIG } from "./config";

const SYSTEM_PROMPT = `You are the authentic CUET UG AI Learning Coach.
Your role is to diagnose candidate performance with empirical precision and strategic warmth.

PROMPT RULES & CONSTRAINTS:
1. Tone and vocabulary: Use Class 12 plain English. Strictly NO statistical jargon (never use words like empirical, telemetry, standard deviation, variance, coefficient, regression, percentile distribution, or extrapolation).
2. Brevity constraint: Maximum 18 words per bullet point across all lists and string fields (strengths, test_taking_strategy, weekly_plan tasks, leak evidence, leak fixes).
3. Mobile card fit: All text must fit 360px mobile cards without truncation. Keep statements punchy, direct, and compact.
4. No time or speed logic: Never mention time, speed, or pacing anywhere unless explicit timing data is provided. Base advice only on accuracy, topics, skips, answer changes, and marks lost.
5. Grounded data: Use ONLY the numbers and topics given in currentStats JSON. Never invent or hallucinate data.
6. Guessing & Data-Quality Awareness:
   - If currentStats.near_random is true (or data_quality is "near_random"):
     - State plainly and kindly: "Your accuracy is close to what random guessing gives (25%), so it's hard to tell concept gaps from guessing. Try a slower 10-question set on one topic and check again."
     - Strictly NEVER use words like "concept gap", "Severe concept gap", or claim causal reasons in headline, leaks, or summary.
     - Recommend: slow down, attempt fewer questions with elimination, try an untimed 10-question drill on one topic, and re-check after the next set.
   - If data_quality is "untagged" or mistake_tags_count is null: state clearly that you can't tell mistake types yet because no questions were tagged. Never present missing tags as good news.
   - Never say test-taking behavior is "healthy" or "efficient" unless data_quality is "ok" and accuracy supports it.
7. Don't Invent Causes:
   - Mistake-tag counts of 0 mean "unknown", not "none".
   - NEVER say "Concept gaps caused most of your N negative marks" unless mistake tag data specifically proves it.
   - Replace "Likely Concept Confusion" with a hypothesis ONLY when you have the student's chosen wrong options and the question has a known trap option; use "Possible confusion with Option [X]: ..." wording. Otherwise show "Needs practice: X of Y correct" with NO stated cause.
   - Replace Severe/Major/Weak labels with neutral, evidence-first titles (e.g. "Low accuracy so far: 1 of 10").
8. Official +5/-1 Marking Advice:
   - Never say "Skip questions you are unsure about to avoid negative marks".
   - ALWAYS advise: "Guess when you can eliminate at least one option; skip only when you have no idea. A blind guess is worth about +0.5 marks on average with +5/-1 marking."
9. Plan Consistency:
   - Only generate plan days for topics in the fix bucket (accuracy < 60% and attempts >= 5).
   - If fewer than 7 topics qualify, fill remaining days with mixed review or rest days instead of repeating weak labels.
   - Every plan item's task description must match its button (e.g. 10 questions drill must say 10 questions and have a matching ~20 min duration).
10. Strengths:
   - "Verified Strengths" must use the strength bucket only (accuracy >= 70% and attempts >= 10).
   - If no topic qualifies, output exactly: ["No strong topics yet. Keep practicing"]. Never list a low-accuracy topic as a strength.
11. Output strict JSON only without markdown formatting or preamble, adhering exactly to this schema:
{
  "summary": "2-3 short sentences in Class 12 plain English citing questions, accuracy, and net score (max 18 words per sentence, no time or speed mentions)",
  "biggest_leaks": [
    {
      "topic": "Topic name (e.g. Current Electricity)",
      "issue": "Evidence-first title (e.g. Low accuracy so far: 1 of 10) under 18 words",
      "evidence": "Plain-English evidence with numbers (under 18 words)",
      "likelyConfusion": "Possible confusion with Option [X] only if known trap distractor exists (under 18 words)",
      "fix": "Start 10-question fix on this topic to eliminate errors (under 18 words)"
    }
  ],
  "strengths": ["Topic with accuracy >= 70% and attempts >= 10, or 'No strong topics yet. Keep practicing'"],
  "weekly_plan": [
    {
      "day": "Day 1",
      "focus": "Focus topic or Mixed Review or Rest",
      "task": "Specific task matching button under 18 words",
      "minutes": 20
    }
  ],
  "test_taking_strategy": ["Test tip focusing on elimination and expected value under 18 words"],
  "next_test_goal": "A single measurable goal under 18 words",
  "comparison_with_previous": "First report: this is your baseline (or delta note under 18 words)",
  "random_answering_note": "Your accuracy is close to random guessing (only if near_random is true)"
}`;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryAfterMs(err: any): number | null {
  const retryHeader =
    err?.headers?.get?.("retry-after") ??
    err?.headers?.["retry-after"] ??
    err?.response?.headers?.get?.("retry-after") ??
    err?.response?.headers?.["retry-after"];

  if (retryHeader) {
    const sec = Number(retryHeader);
    if (!isNaN(sec) && sec > 0) return Math.min(sec * 1000, 10000);
    const dateMs = Date.parse(retryHeader);
    if (!isNaN(dateMs)) {
      const diff = dateMs - Date.now();
      if (diff > 0) return Math.min(diff, 10000);
    }
  }

  const msg = err?.message || "";
  const match = msg.match(/try again in ([\d\.]+)s/i);
  if (match && match[1]) {
    const sec = parseFloat(match[1]);
    if (!isNaN(sec) && sec > 0) return Math.min(Math.ceil(sec * 1000), 10000);
  }

  return null;
}

/**
 * Validates AI Coach JSON structure strictly
 */
export function validateAICoachReport(
  parsed: any
): { valid: boolean; data?: AICoachReportContent; error?: string } {
  if (!parsed || typeof parsed !== "object") {
    return { valid: false, error: "Response is not an object" };
  }

  if (typeof parsed.summary !== "string" || !parsed.summary.trim()) {
    return { valid: false, error: "Missing or invalid 'summary'" };
  }

  if (!Array.isArray(parsed.biggest_leaks) || parsed.biggest_leaks.length === 0) {
    return { valid: false, error: "Missing or empty 'biggest_leaks'" };
  }

  for (const leak of parsed.biggest_leaks) {
    if (
      !leak ||
      typeof leak.issue !== "string" ||
      typeof leak.evidence !== "string" ||
      typeof leak.fix !== "string"
    ) {
      return { valid: false, error: "Leak item missing issue, evidence, or fix" };
    }
  }

  if (!Array.isArray(parsed.strengths)) {
    return { valid: false, error: "Missing or invalid 'strengths'" };
  }

  if (!Array.isArray(parsed.weekly_plan) || parsed.weekly_plan.length === 0) {
    return { valid: false, error: "Missing or empty 'weekly_plan'" };
  }

  for (const item of parsed.weekly_plan) {
    if (
      !item ||
      typeof item.day !== "string" ||
      typeof item.focus !== "string" ||
      typeof item.task !== "string" ||
      typeof item.minutes !== "number"
    ) {
      return { valid: false, error: "Weekly plan item invalid" };
    }
  }

  if (!Array.isArray(parsed.test_taking_strategy)) {
    return { valid: false, error: "Missing or invalid 'test_taking_strategy'" };
  }

  if (typeof parsed.next_test_goal !== "string") {
    return { valid: false, error: "Missing or invalid 'next_test_goal'" };
  }

  if (typeof parsed.comparison_with_previous !== "string") {
    return { valid: false, error: "Missing or invalid 'comparison_with_previous'" };
  }

  return { valid: true, data: parsed as AICoachReportContent };
}

/**
 * Recursively strips all time, speed, pacing and personal information.
 * Uses strict server-side allowlisting so no PII (name, email, phone, tokens, IDs)
 * can ever be forwarded to the AI provider.
 * Moves topics with fewer than 5 attempts into insufficient_data_topics and excludes them
 * from leaks and strengths.
 */
function sanitizeStatsForAI(statsObj: any): any {
  if (!statsObj || typeof statsObj !== "object") return null;

  const sufficientTopics: any[] = [];
  const insufficientTopics: any[] = [];

  if (Array.isArray(statsObj.topicBreakdown)) {
    statsObj.topicBreakdown.forEach((t: any) => {
      const sanitizedTopic = {
        id: t.id ? String(t.id) : undefined,
        topic: String(t.topic || ""),
        chapter: t.chapter ? String(t.chapter) : undefined,
        attempted: Number(t.attempted) || 0,
        correct: Number(t.correct) || 0,
        accuracyPercentage: Number(t.accuracyPercentage) || 0,
        classification: String(t.classification || "sufficient"),
        bucket: t.bucket ? String(t.bucket) : undefined,
        mostCommonWrongOption: t.mostCommonWrongOption ? String(t.mostCommonWrongOption) : undefined,
      };
      if ((sanitizedTopic.attempted || 0) < AI_COACH_CONFIG.MIN_TOPIC_ATTEMPTS || sanitizedTopic.bucket === "needs_data") {
        insufficientTopics.push({
          ...sanitizedTopic,
          classification: "insufficient data",
          bucket: "needs_data",
          note: "needs more data",
        });
      } else {
        sufficientTopics.push(sanitizedTopic);
      }
    });
  }

  // Strictly allowlisted non-PII telemetry payload
  return {
    subject: String(statsObj.subject || "Subject"),
    totalAttempts: Number(statsObj.totalAttempts) || 0,
    uniqueQuestionsAnalyzed: Number(statsObj.uniqueQuestionsAnalyzed) || 0,
    overallAccuracyPercentage: Number(statsObj.overallAccuracyPercentage) || 0,
    attemptRate: Number(statsObj.attemptRate) || 0,
    netScore: Number(statsObj.netScore) || 0,
    potentialScore: Number(statsObj.potentialScore) || 250,
    negativeMarksLost: Number(statsObj.negativeMarksLost) || 0,
    errorTypes: {
      carelessErrors: Number(statsObj.errorTypes?.carelessErrors) || 0,
      conceptGaps: Number(statsObj.errorTypes?.conceptGaps) || 0,
      confidenceGaps: Number(statsObj.errorTypes?.confidenceGaps) || 0,
      secondGuessing: Number(statsObj.errorTypes?.secondGuessing) || 0,
    },
    mistakeTags: statsObj.mistakeTags ? {
      didntKnowConcept: Number(statsObj.mistakeTags.didntKnowConcept) || 0,
      misread: Number(statsObj.mistakeTags.misread) || 0,
      guessed: Number(statsObj.mistakeTags.guessed) || 0,
      changedAnswer: Number(statsObj.mistakeTags.changedAnswer) || 0,
    } : undefined,
    rightToWrongChanges: Number(statsObj.rightToWrongChanges) || 0,
    mockVsPyqGap: statsObj.mockVsPyqGap ? {
      mockAccuracy: Number(statsObj.mockVsPyqGap.mockAccuracy) || 0,
      mockAttempts: Number(statsObj.mockVsPyqGap.mockAttempts) || 0,
      pyqAccuracy: Number(statsObj.mockVsPyqGap.pyqAccuracy) || 0,
      pyqAttempts: Number(statsObj.mockVsPyqGap.pyqAttempts) || 0,
      accuracyDelta: Number(statsObj.mockVsPyqGap.accuracyDelta) || 0,
    } : undefined,
    recentTrend: statsObj.recentTrend ? {
      recentAccuracies: Array.isArray(statsObj.recentTrend.recentAccuracies)
        ? statsObj.recentTrend.recentAccuracies.map((n: any) => Number(n) || 0)
        : [],
      trajectory: String(statsObj.recentTrend.trajectory || "steady"),
    } : undefined,
    topicBreakdown: sufficientTopics,
    insufficient_data_topics: insufficientTopics,
    hasRandomAnswering: Boolean(statsObj.hasRandomAnswering),
    hasLowSignalAttempt: Boolean(statsObj.hasLowSignalAttempt),
    data_quality: statsObj.data_quality || "ok",
    near_random: Boolean(statsObj.near_random),
    fast_wrong_rate: statsObj.fast_wrong_rate !== undefined ? statsObj.fast_wrong_rate : null,
    skipped_rate: statsObj.skipped_rate !== undefined ? Number(statsObj.skipped_rate) : 0,
    median_seconds_per_question: statsObj.median_seconds_per_question !== undefined ? statsObj.median_seconds_per_question : null,
    mistake_tags_count: statsObj.mistake_tags_count !== undefined ? statsObj.mistake_tags_count : null,
    daysToExam: Number(statsObj.daysToExam) || 200,
  };
}

/**
 * Builds deterministic fallback AI report from computed stats if upstream calls fail.
 * Obey prompt rules: Class 12 plain English, max 18 words per bullet, no statistical jargon,
 * text fits 360px mobile cards without truncation.
 */
export function buildDeterministicAICoachReport(
  stats: AICoachComputedStats,
  prevStats: AICoachComputedStats | null
): AICoachReportContent {
  const isNearRandom = Boolean(stats.near_random || stats.data_quality === "near_random");

  // Filter topics into the 4 mutually exclusive status buckets
  const fixTopics = (stats.topicBreakdown || []).filter(
    (t) => t.bucket === "fix" || ((t.attempted ?? 0) >= 5 && (t.accuracyPercentage ?? 0) < 60)
  );
  const strengthTopics = (stats.topicBreakdown || []).filter(
    (t) => t.bucket === "strength" || ((t.attempted ?? 0) >= 10 && (t.accuracyPercentage ?? 0) >= 70)
  );

  const biggest_leaks: BiggestLeak[] = [];

  if (isNearRandom) {
    const leakTopic = fixTopics[0]?.topic || stats.topicBreakdown[0]?.topic || stats.subject;
    const attemptedCount = fixTopics[0]?.attempted ?? stats.totalAttempts;
    const correctCount = fixTopics[0]?.correct ?? Math.round((stats.overallAccuracyPercentage / 100) * stats.totalAttempts);
    biggest_leaks.push({
      topic: leakTopic,
      topicId: fixTopics[0]?.id,
      issue: `Low accuracy so far: ${correctCount} of ${attemptedCount}`,
      evidence: `Recorded ${fixTopics[0]?.accuracyPercentage ?? stats.overallAccuracyPercentage}% accuracy over ${attemptedCount} questions.`,
      fix: `Tap "Start 10-question fix" to solve 10 questions on ${leakTopic}.`,
    });
  } else {
    // 1. Fix bucket topics with neutral evidence-first titles
    fixTopics.slice(0, 2).forEach((cg) => {
      const wrongOption = cg.mostCommonWrongOption;
      const likelyConfusion = wrongOption
        ? `Possible confusion with trap Option ${wrongOption}.`
        : `Needs practice: ${cg.correct} of ${cg.attempted} correct`;
      biggest_leaks.push({
        topic: cg.topic,
        topicId: cg.id,
        issue: `Low accuracy so far: ${cg.correct} of ${cg.attempted}`,
        evidence: `${cg.accuracyPercentage}% accuracy over ${cg.attempted} questions, losing ${cg.attempted - cg.correct} marks to wrong choices.`,
        likelyConfusion,
        fix: `Tap "Start 10-question fix" to solve 10 questions on ${cg.topic}.`,
      });
    });

    // 2. Careless: Wrong answers on questions tagged easy
    if (stats.errorTypes.carelessErrors > 0 && biggest_leaks.length < 3) {
      const focusTopic = fixTopics[0]?.topic || stats.topicBreakdown[0]?.topic || stats.subject;
      biggest_leaks.push({
        topic: focusTopic,
        topicId: fixTopics[0]?.id,
        issue: `Careless errors on easy questions`,
        evidence: `Recorded ${stats.errorTypes.carelessErrors} wrong answers on easy questions.`,
        fix: `Tap "Start 10-question fix" to practice 10 questions on ${focusTopic}.`,
      });
    }

    // 3. Confidence gap: Skipped questions
    if (stats.errorTypes.confidenceGaps > 0 && biggest_leaks.length < 3) {
      const focusTopic = fixTopics[0]?.topic || stats.topicBreakdown[0]?.topic || stats.subject;
      biggest_leaks.push({
        topic: focusTopic,
        topicId: fixTopics[0]?.id,
        issue: `Confidence gap from skipped questions`,
        evidence: `Skipped ${stats.errorTypes.confidenceGaps} questions without attempting an answer.`,
        fix: `Tap "Start 10-question fix" to solve 10 questions on ${focusTopic}.`,
      });
    }

    // 4. Second-guessing: Right-to-wrong answer changes
    const changes = stats.errorTypes.secondGuessing || stats.rightToWrongChanges || 0;
    if (changes > 0 && biggest_leaks.length < 3) {
      const focusTopic = fixTopics[0]?.topic || stats.topicBreakdown[0]?.topic || stats.subject;
      biggest_leaks.push({
        topic: focusTopic,
        topicId: fixTopics[0]?.id,
        issue: `Second-guessing answer changes`,
        evidence: `Changed answer from right to wrong ${changes} times across tests.`,
        fix: `Tap "Start 10-question fix" to practice 10 questions on ${focusTopic}.`,
      });
    }
  }

  // Fallback to neutral practice if no leaks found
  if (biggest_leaks.length === 0) {
    const defaultTopic = stats.topicBreakdown[0]?.topic || stats.subject;
    const defaultAtt = stats.topicBreakdown[0]?.attempted ?? stats.totalAttempts;
    const defaultCorr = stats.topicBreakdown[0]?.correct ?? Math.round((stats.overallAccuracyPercentage / 100) * stats.totalAttempts);
    biggest_leaks.push({
      topic: defaultTopic,
      issue: `Needs practice: ${defaultCorr} of ${defaultAtt} correct`,
      evidence: `Lost ${stats.negativeMarksLost} marks due to wrong answers.`,
      fix: `Tap "Start 10-question fix" to practice 10 questions on ${defaultTopic}.`,
    });
  }

  // Strengths: ONLY from the strength bucket (accuracy >= 70% and attempts >= 10)
  let strengths: string[] = [];
  if (strengthTopics.length > 0) {
    strengths = strengthTopics.slice(0, 3).map(
      (s) => `${s.topic}: ${s.accuracyPercentage}% accuracy over ${s.attempted} questions.`
    );
  } else {
    strengths = ["No strong topics yet. Keep practicing"];
  }

  // Weekly Plan: Only generate plan days for topics in the FIX bucket!
  // If fewer than 7 topics qualify, fill with mixed review or rest days instead of repeating weak labels.
  // Day durations should match work described.
  const weekly_plan: WeeklyPlanItem[] = [];
  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

  let dayIdx = 0;
  for (const fixTop of fixTopics) {
    if (dayIdx >= 7) break;
    weekly_plan.push({
      day: days[dayIdx]!,
      focus: fixTop.topic,
      task: `Solve 10 questions on ${fixTop.topic} to fix errors.`,
      minutes: 20,
      topicId: fixTop.id,
      practiceTopic: fixTop.topic,
      buttonText: "Start 10-question fix",
    });
    dayIdx++;
  }

  const fillerTemplates = [
    {
      focus: "Mixed Review",
      task: "Solve 10 questions across chapters to build consistency.",
      minutes: 20,
      buttonText: "Start 10-question fix",
    },
    {
      focus: "Mistake Notebook",
      task: "Review formulas and wrong answers in your mistake notebook.",
      minutes: 15,
      buttonText: "Open Mistake Notebook",
    },
    {
      focus: "Option Elimination Drill",
      task: "Solve 10 questions focusing on eliminating wrong options.",
      minutes: 20,
      buttonText: "Start 10-question fix",
    },
    {
      focus: "Rest & Consolidation",
      task: "Take a planned rest day to recharge before your next mock test.",
      minutes: 15,
      buttonText: "Rest Day Scheduled",
    },
    {
      focus: "Past Questions",
      task: "Solve 10 questions from past papers to build exam readiness.",
      minutes: 20,
      buttonText: "Start 10-question fix",
    },
    {
      focus: "Sectional Review",
      task: "Solve 10 questions for a quick sectional review.",
      minutes: 20,
      buttonText: "Start 10-question fix",
    },
    {
      focus: "Weekly Rest Day",
      task: "Rest and consolidate your revision notes.",
      minutes: 15,
      buttonText: "Rest Day Scheduled",
    },
  ];

  let fillerIdx = 0;
  while (dayIdx < 7) {
    const filler = fillerTemplates[fillerIdx % fillerTemplates.length]!;
    weekly_plan.push({
      day: days[dayIdx]!,
      focus: filler.focus,
      task: filler.task,
      minutes: filler.minutes,
      buttonText: filler.buttonText,
    });
    dayIdx++;
    fillerIdx++;
  }

  // Official +5/-1 Advice
  const test_taking_strategy = [
    `Current net score is ${stats.netScore} marks out of ${stats.potentialScore} potential.`,
    `Guess when you can eliminate at least one option; skip only when you have no idea. A blind guess is worth about +0.5 marks on average with +5/-1 marking.`,
    `Solve your strongest topics first and eliminate wrong options.`,
  ];

  let comparison_with_previous = "First report: this is your baseline";
  if (prevStats) {
    const accuracyDelta = stats.overallAccuracyPercentage - prevStats.overallAccuracyPercentage;
    const netDelta = stats.netScore - prevStats.netScore;
    comparison_with_previous = `Accuracy changed by ${
      accuracyDelta >= 0 ? "+" : ""
    }${accuracyDelta}% and net score shifted by ${netDelta >= 0 ? "+" : ""}${netDelta} marks.`;
  }

  let summary = "";
  if (isNearRandom) {
    summary = `Your accuracy is close to what random guessing gives (25%), so it's hard to tell genuine gaps from guessing. Try a slower 10-question set on one topic and check again.`;
  } else {
    summary = `In ${stats.subject}, you solved ${stats.uniqueQuestionsAnalyzed} questions with ${stats.overallAccuracyPercentage}% accuracy and net score of ${stats.netScore}/${stats.potentialScore}. Focus on your top leaks to improve.`;
  }

  let random_answering_note: string | undefined;
  if (isNearRandom) {
    random_answering_note =
      "Your accuracy is close to what random guessing gives (25%), so it's hard to tell genuine gaps from guessing. Try a slower 10-question set on one topic and check again.";
  } else if (stats.hasRandomAnswering) {
    random_answering_note = "This looks like random answering, so the advice may be less accurate.";
  } else if (stats.hasLowSignalAttempt) {
    random_answering_note =
      "Low-signal attempt detected. This assessment may not be suitable for measuring your current mastery. Complete another assessment to strengthen your AI Coach analysis.";
  }

  return {
    summary,
    biggest_leaks,
    strengths,
    weekly_plan,
    test_taking_strategy,
    next_test_goal: isNearRandom
      ? "Attempt an untimed 10-question set using elimination."
      : `Aim for ${Math.min(95, stats.overallAccuracyPercentage + 8)}% accuracy on your next test.`,
    comparison_with_previous,
    random_answering_note,
    is_fallback: true,
  };
}

/**
 * Call Groq LPU via groq-sdk
 */
async function callGroq(
  stats: AICoachComputedStats,
  prevStats: AICoachComputedStats | null
): Promise<AICoachReportContent | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.includes("placeholder")) {
    return null;
  }

  const groq = new Groq({ apiKey });
  const userPayload = {
    currentStats: sanitizeStatsForAI(stats),
    previousReportStats: sanitizeStatsForAI(prevStats),
  };

  const primaryModel = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
  const candidateModels = Array.from(new Set([primaryModel, "qwen/qwen3.8-27b", AI_COACH_CONFIG.GROQ_MODEL]));

  for (const model of candidateModels) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Candidate performance telemetry (JSON):\n${JSON.stringify(userPayload, null, 2)}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 1800,
      });

      const content = completion.choices[0]?.message?.content?.trim();
      if (!content) continue;

      let cleaned = content;
      const match = content.match(/\{[\s\S]*\}/);
      if (match) cleaned = match[0];

      const parsed = JSON.parse(cleaned);
      const validation = validateAICoachReport(parsed);
      if (validation.valid && validation.data) {
        return validation.data;
      }
      console.warn(`[AI Coach] Model ${model} output failed schema validation: ${validation.error}`);
    } catch (modelErr: any) {
      if (modelErr?.status === 404 || modelErr?.message?.includes("does not exist")) {
        console.warn(`[AI Coach] Groq model ${model} unavailable, trying next candidate...`);
        continue;
      }
      throw modelErr;
    }
  }

  return null;
}

/**
 * Main AI generation orchestrator:
 * - Uses Groq LPU exclusively
 * - Enforces up to 3 backoff retries respecting retry-after
 * - Falls back to deterministic computed stats, Topics to Fix, and rule-based 7-day plan
 */
export async function generateAICoachReport(
  stats: AICoachComputedStats,
  prevStats: AICoachComputedStats | null
): Promise<{ report: AICoachReportContent; model: string; isFallback: boolean }> {
  let lastError: Error | null = null;
  const apiKey = process.env.GROQ_API_KEY;

  if (apiKey && !apiKey.includes("placeholder")) {
    const maxRetries = 3;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const groqResult = await callGroq(stats, prevStats);
        if (groqResult) {
          if (stats.near_random) {
            groqResult.random_answering_note =
              "Your accuracy is close to what random guessing gives (25%), so it's hard to tell genuine gaps from guessing. Try a slower 10-question set on one topic and check again.";
            if (groqResult.summary.toLowerCase().includes("concept gap")) {
              groqResult.summary =
                "Your accuracy is close to what random guessing gives (25%), so it's hard to tell genuine gaps from guessing. Try a slower 10-question set on one topic and check again.";
            }
          } else if (stats.hasRandomAnswering && !groqResult.random_answering_note) {
            groqResult.random_answering_note = "This looks like random answering, so the advice may be less accurate.";
          } else if (stats.hasLowSignalAttempt && !groqResult.random_answering_note) {
            groqResult.random_answering_note =
              "Low-signal attempt detected. This assessment may not be suitable for measuring your current mastery. Complete another assessment to strengthen your AI Coach analysis.";
          }
          return {
            report: groqResult,
            model: process.env.GROQ_MODEL || "qwen/qwen3.8-27b",
            isFallback: false,
          };
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[AI Coach] Groq attempt ${attempt + 1} failed:`, err?.message || err);
        if (attempt < maxRetries) {
          const baseWait = parseRetryAfterMs(err) ?? Math.min(1000 * Math.pow(2, attempt), 8000);
          const jitter = Math.floor(Math.random() * 300);
          const waitMs = baseWait + jitter;
          console.warn(`[AI Coach] Retrying in ${waitMs}ms (retry ${attempt + 1} of ${maxRetries})...`);
          await sleep(waitMs);
        }
      }
    }
  }

  // If Groq failed after 3 backoff retries or was not configured, use deterministic generation
  console.warn(
    "[AI Coach] Groq call failed after 3 backoff retries. Showing computed stats, Topics to Fix, and rule-based 7-day plan fallback:",
    lastError?.message || "No external AI keys responding"
  );
  const fallback = buildDeterministicAICoachReport(stats, prevStats);
  fallback.is_fallback = true;
  return { report: fallback, model: "rule-based-fallback", isFallback: true };
}
