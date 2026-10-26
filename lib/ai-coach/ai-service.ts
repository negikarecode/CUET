import Groq from "groq-sdk";
import { AICoachComputedStats, AICoachReportContent, BiggestLeak } from "@/types/ai-coach";
import { AI_COACH_CONFIG } from "./config";

const SYSTEM_PROMPT = `You are the authentic CUET UG AI Learning Coach.
Your role is to diagnose candidate performance with empirical precision and strategic warmth.

PROMPT RULES & CONSTRAINTS:
1. Tone and vocabulary: Use Class 12 plain English. Strictly NO statistical jargon (never use words like empirical, telemetry, standard deviation, variance, coefficient, regression, percentile distribution, or extrapolation).
2. Brevity constraint: Maximum 18 words per bullet point across all lists and string fields (strengths, test_taking_strategy, weekly_plan tasks, leak evidence, leak fixes).
3. Mobile card fit: All text must fit 360px mobile cards without truncation. Keep statements punchy, direct, and compact.
4. No time or speed logic: Never mention time, speed, or pacing anywhere. Base advice only on accuracy, topics, skips, answer changes, and marks lost.
5. Grounded data: Use ONLY the numbers and topics given in currentStats JSON. Never invent or hallucinate data.
6. Topic confidence threshold: Topics in "insufficient_data_topics" have fewer than 5 attempts. Exclude them entirely from "biggest_leaks" and "strengths". You may only say "needs more data" about them. Never treat them as leaks or strengths.
7. Random answering note: If "hasRandomAnswering" is true in currentStats, you must set "random_answering_note" to exactly: "This looks like random answering, so the advice may be less accurate."
8. Every leak fix must tie directly to starting a 10-question practice fix (e.g. "Tap 'Start 10-question fix' to solve 10 questions on [Topic]").
9. Weekly plan must have 7 daily steps (Day 1 to Day 7) with tasks under 18 words.
10. If this is the candidate's first report, set "comparison_with_previous" to exactly "First report: this is your baseline".
11. Output strict JSON only without markdown formatting or preamble, adhering exactly to this schema:
{
  "summary": "2-3 short sentences in Class 12 plain English citing questions, accuracy, and net score (max 18 words per sentence, no time or speed mentions)",
  "biggest_leaks": [
    {
      "topic": "Topic name (e.g. Electrostatics)",
      "issue": "Specific concept gap, careless error, confidence gap, or second-guessing leak title (under 18 words)",
      "evidence": "Plain-English evidence with numbers (under 18 words)",
      "likelyConfusion": "Likely concept confusion based on wrong options if available (under 18 words)",
      "fix": "Start 10-question fix on this topic to eliminate errors (under 18 words)"
    }
  ],
  "strengths": ["Topic with accuracy and attempt count under 18 words"],
  "weekly_plan": [
    {
      "day": "Day 1",
      "focus": "Focus topic",
      "task": "Specific task under 18 words",
      "minutes": 25
    }
  ],
  "test_taking_strategy": ["Test tip focusing on accuracy and negative marking under 18 words"],
  "next_test_goal": "A single measurable goal under 18 words",
  "comparison_with_previous": "First report: this is your baseline (or delta note under 18 words)",
  "random_answering_note": "This looks like random answering, so the advice may be less accurate. (only if hasRandomAnswering is true)"
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
        topic: String(t.topic || ""),
        chapter: t.chapter ? String(t.chapter) : undefined,
        attempted: Number(t.attempted) || 0,
        correct: Number(t.correct) || 0,
        accuracyPercentage: Number(t.accuracyPercentage) || 0,
        classification: String(t.classification || "sufficient"),
        mostCommonWrongOption: t.mostCommonWrongOption ? String(t.mostCommonWrongOption) : undefined,
      };
      if ((sanitizedTopic.attempted || 0) < AI_COACH_CONFIG.MIN_TOPIC_ATTEMPTS) {
        insufficientTopics.push({
          ...sanitizedTopic,
          classification: "insufficient data",
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
  // Only topics with 5+ attempts qualify for leaks and strengths
  const qualifyingTopics = (stats.topicBreakdown || []).filter(
    (t) => t.attempted >= AI_COACH_CONFIG.MIN_TOPIC_ATTEMPTS
  );
  const conceptGapTopics = qualifyingTopics.filter((t) => t.accuracyPercentage < 40);
  const weakTopics = qualifyingTopics.filter((t) => t.classification === "weak");
  const strongTopics = qualifyingTopics.filter((t) => t.classification === "strong");

  const biggest_leaks: BiggestLeak[] = [];

  // 1. Concept gap: Topic accuracy < 40% with 5+ attempts
  conceptGapTopics.slice(0, 2).forEach((cg) => {
    const wrongDistractorNote = cg.mostCommonWrongOption
      ? ` Trap option: Option ${cg.mostCommonWrongOption}.`
      : "";
    biggest_leaks.push({
      topic: cg.topic,
      issue: `Concept gap in ${cg.topic}`,
      evidence: `${cg.accuracyPercentage}% accuracy over ${cg.attempted} questions, losing ${cg.attempted - cg.correct} marks to wrong choices.${wrongDistractorNote}`,
      likelyConfusion: cg.mostCommonWrongOption
        ? `Confusing core definitions with trap Option ${cg.mostCommonWrongOption}.`
        : `Difficulty with core formulas and definition boundaries.`,
      fix: `Tap "Start 10-question fix" to solve 10 questions on ${cg.topic}.`,
    });
  });

  // 2. Careless: Wrong answers on questions tagged easy
  if (stats.errorTypes.carelessErrors > 0 && biggest_leaks.length < 3) {
    const focusTopic = weakTopics[0]?.topic || qualifyingTopics[0]?.topic || stats.subject;
    biggest_leaks.push({
      topic: focusTopic,
      issue: "Careless errors on easy questions",
      evidence: `Recorded ${stats.errorTypes.carelessErrors} wrong answers on easy questions.`,
      likelyConfusion: "Misreading negative words like NOT or EXCEPT in the question stem.",
      fix: `Tap "Start 10-question fix" to practice 10 questions on ${focusTopic}.`,
    });
  }

  // 3. Confidence gap: Skipped questions
  if (stats.errorTypes.confidenceGaps > 0 && biggest_leaks.length < 3) {
    const focusTopic = weakTopics[0]?.topic || qualifyingTopics[0]?.topic || stats.subject;
    biggest_leaks.push({
      topic: focusTopic,
      issue: "Confidence gap from skipped questions",
      evidence: `Skipped ${stats.errorTypes.confidenceGaps} questions without attempting an answer.`,
      likelyConfusion: "Hesitating between two close options on solvable questions.",
      fix: `Tap "Start 10-question fix" to solve 10 questions on ${focusTopic}.`,
    });
  }

  // 4. Second-guessing: Right-to-wrong answer changes
  const changes = stats.errorTypes.secondGuessing || stats.rightToWrongChanges || 0;
  if (changes > 0 && biggest_leaks.length < 3) {
    const focusTopic = weakTopics[0]?.topic || qualifyingTopics[0]?.topic || stats.subject;
    biggest_leaks.push({
      topic: focusTopic,
      issue: "Second-guessing answer changes",
      evidence: `Changed answer from right to wrong ${changes} times across tests.`,
      likelyConfusion: "Second-guessing correct first choices and switching to distractors.",
      fix: `Tap "Start 10-question fix" to practice 10 questions on ${focusTopic}.`,
    });
  }

  // Fallback to remaining weak topics if leaks still needed
  if (biggest_leaks.length === 0) {
    weakTopics.slice(0, 2).forEach((w) => {
      biggest_leaks.push({
        topic: w.topic,
        issue: `Knowledge gap in ${w.topic}`,
        evidence: `${w.accuracyPercentage}% accuracy over ${w.attempted} questions.`,
        likelyConfusion: `Needs review of NCERT chapter summary and definitions.`,
        fix: `Tap "Start 10-question fix" to practice 10 questions on ${w.topic}.`,
      });
    });
  }

  if (biggest_leaks.length === 0) {
    const defaultTopic = qualifyingTopics[0]?.topic || stats.subject;
    biggest_leaks.push({
      topic: defaultTopic,
      issue: "Marks lost to wrong answers",
      evidence: `Lost ${stats.negativeMarksLost} marks due to wrong answers.`,
      likelyConfusion: "Guessing answers without ruling out wrong choices.",
      fix: `Tap "Start 10-question fix" to practice 10 questions on ${defaultTopic}.`,
    });
  }

  const strengths = strongTopics.slice(0, 3).map(
    (s) => `${s.topic}: ${s.accuracyPercentage}% accuracy over ${s.attempted} questions.`
  );
  if (strengths.length === 0) {
    strengths.push(`Overall accuracy is ${stats.overallAccuracyPercentage}% across ${stats.uniqueQuestionsAnalyzed} questions.`);
  }

  const primaryLeakTopic = conceptGapTopics[0]?.topic || weakTopics[0]?.topic || qualifyingTopics[0]?.topic || stats.subject;
  const weekly_plan = [
    { day: "Day 1", focus: "Formula Audit", task: `Review NCERT formulas and notes for ${primaryLeakTopic}.`, minutes: 25 },
    { day: "Day 2", focus: "Targeted Drill", task: `Solve 10 questions on ${primaryLeakTopic} to fix errors.`, minutes: 20 },
    { day: "Day 3", focus: "Mistake Review", task: "Check wrong answers and note formulas in mistake book.", minutes: 15 },
    { day: "Day 4", focus: "Past Questions", task: `Solve 15 past year questions for ${stats.subject}.`, minutes: 30 },
    { day: "Day 5", focus: "Sectional Mock", task: "Take a 25-question sectional test to build accuracy.", minutes: 30 },
    { day: "Day 6", focus: "Option Elimination", task: "Solve 10 matching and statement questions carefully.", minutes: 20 },
    { day: "Day 7", focus: "Full Test Review", task: "Take a full 50-question mock test.", minutes: 60 },
  ];

  const test_taking_strategy = [
    `Current net score is ${stats.netScore} marks out of ${stats.potentialScore} potential.`,
    `Skip doubtful questions to avoid losing marks to -1 penalties.`,
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

  let summary = `In ${stats.subject}, you solved ${stats.uniqueQuestionsAnalyzed} questions with ${stats.overallAccuracyPercentage}% accuracy and net score of ${stats.netScore}/${stats.potentialScore}. Focus on your top leaks to improve.`;
  let random_answering_note: string | undefined;
  if (stats.hasRandomAnswering) {
    random_answering_note = "This looks like random answering, so the advice may be less accurate.";
    summary += " Note: This looks like random answering, so the advice may be less accurate.";
  } else if (stats.hasLowSignalAttempt) {
    random_answering_note =
      "Low-signal attempt detected. This assessment may not be suitable for measuring your current mastery. Complete another assessment to strengthen your AI Coach analysis.";
    summary +=
      " Note: Low-signal attempt detected. This assessment may not be suitable for measuring your current mastery. Complete another assessment to strengthen your AI Coach analysis.";
  }

  return {
    summary,
    biggest_leaks,
    strengths,
    weekly_plan,
    test_taking_strategy,
    next_test_goal: `Aim for ${Math.min(95, stats.overallAccuracyPercentage + 8)}% accuracy on your next test.`,
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
          if (stats.hasRandomAnswering && !groqResult.random_answering_note) {
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
