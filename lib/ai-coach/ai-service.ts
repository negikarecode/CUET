import Groq from "groq-sdk";
import { AICoachComputedStats, AICoachReportContent, BiggestLeak } from "@/types/ai-coach";
import { AI_COACH_CONFIG } from "./config";

const SYSTEM_PROMPT = `You are the authentic CUET UG AI Learning Coach.
Your role is to diagnose candidate performance with empirical precision and strategic warmth.
CRITICAL INSTRUCTIONS:
1. Do not mention time, speed, or pacing. Base advice only on accuracy, topics, skips, answer changes, and marks lost.
2. Use ONLY the numbers and telemetry given in the computed stats JSON. NEVER invent, extrapolate, or hallucinate data.
3. Be specific, actionable, kind, but completely honest about weaknesses and marks lost to wrong answers.
4. Every biggest leak MUST cite empirical evidence from the stats (e.g. "lost 14 marks to wrong answers in careless errors", "33% accuracy in Optics across 9 attempts as a concept gap", "6 skipped questions showing confidence gaps", or "second-guessing right-to-wrong answer changes").
5. Weekly plan must have specific actionable tasks with daily study allocations for 7 days (Day 1 through Day 7).
6. If this is the candidate's first report, set "comparison_with_previous" to exactly "First report: this is your baseline".
7. For each weak topic in "biggest_leaks", identify the likely concept confusion per weak topic, using the student's most common wrong options if available in topicBreakdown.mostCommonWrongOption. Keep every fix tied to a practice button (e.g. "Tap 'Practice this topic' to take a 10-question drill on [Topic]...").
8. Output strict JSON only without markdown formatting or preamble, adhering exactly to this schema:
{
  "summary": "2-3 sentence strategic summary citing analyzed questions, accuracy, and net score (do not mention time, speed, or pacing)",
  "biggest_leaks": [
    {
      "topic": "Topic name (e.g. Electrostatics)",
      "issue": "Specific concept gap, careless error, confidence gap, or second-guessing leak title",
      "evidence": "Empirical evidence from candidate stats (accuracy, topics, skips, answer changes, marks lost)",
      "likelyConfusion": "Analysis of the likely conceptual confusion based on common wrong options if available",
      "fix": "Actionable practice fix tied directly to the 'Practice this topic' button"
    }
  ],
  "strengths": ["Topic with accuracy and attempt numbers"],
  "weekly_plan": [
    {
      "day": "Day 1",
      "focus": "Focus topic",
      "task": "Specific task",
      "minutes": 25
    }
  ],
  "test_taking_strategy": ["Actionable test taking tips focusing on accuracy, question selection, eliminating distractors, and containing marks lost to wrong answers"],
  "next_test_goal": "A single clear measurable objective for the student's next practice test (e.g. 'Target 75%+ accuracy in Kinematics while containing marks lost to wrong answers to under 5')",
  "comparison_with_previous": "First report: this is your baseline (or delta note compared to previous report)"
}`;

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
 * Recursively strips all time, speed, and pacing telemetry before sending to AI
 */
function sanitizeStatsForAI(statsObj: any): any {
  if (!statsObj || typeof statsObj !== "object") return statsObj;
  const clone = JSON.parse(JSON.stringify(statsObj));
  delete clone.averageTimePerQuestionSeconds;
  if (Array.isArray(clone.topicBreakdown)) {
    clone.topicBreakdown.forEach((t: any) => {
      delete t.averageTimeSeconds;
    });
  }
  return clone;
}

/**
 * Builds deterministic fallback AI report from computed stats if upstream calls fail
 */
export function buildDeterministicAICoachReport(
  stats: AICoachComputedStats,
  prevStats: AICoachComputedStats | null
): AICoachReportContent {
  const conceptGapTopics = stats.topicBreakdown.filter(
    (t) => t.attempted >= AI_COACH_CONFIG.MIN_TOPIC_ATTEMPTS && t.accuracyPercentage < 40
  );
  const weakTopics = stats.topicBreakdown.filter((t) => t.classification === "weak");
  const strongTopics = stats.topicBreakdown.filter((t) => t.classification === "strong");

  const biggest_leaks: BiggestLeak[] = [];

  // 1. Concept gap: Topic accuracy < 40% with 5+ attempts
  conceptGapTopics.slice(0, 2).forEach((cg) => {
    const wrongDistractorNote = cg.mostCommonWrongOption
      ? ` (frequently picking distractor Option ${cg.mostCommonWrongOption})`
      : "";
    biggest_leaks.push({
      topic: cg.topic,
      issue: `Concept gap in ${cg.topic}`,
      evidence: `${cg.accuracyPercentage}% accuracy across ${cg.attempted} attempts (${cg.attempted - cg.correct} marks lost to wrong answers)${wrongDistractorNote}.`,
      likelyConfusion: cg.mostCommonWrongOption
        ? `Likely confusing core NCERT principles with trap Option ${cg.mostCommonWrongOption} due to blurred definition boundaries.`
        : `Difficulty isolating core formulas and boundary conditions under NCERT criteria.`,
      fix: `Tap "Practice this topic" to launch a 10-question quiz on ${cg.topic}, prioritizing questions you got wrong before to eliminate distractor traps.`,
    });
  });

  // 2. Careless: Wrong answers on questions tagged easy
  if (stats.errorTypes.carelessErrors > 0 && biggest_leaks.length < 3) {
    const focusTopic = weakTopics[0]?.topic || stats.topicBreakdown[0]?.topic || stats.subject;
    biggest_leaks.push({
      topic: focusTopic,
      issue: "Careless errors on easy questions",
      evidence: `Recorded ${stats.errorTypes.carelessErrors} wrong answers on questions tagged easy.`,
      likelyConfusion: "Misreading negative or qualifying stems (such as NOT, EXCEPT, or FALSE) rather than fundamental conceptual gaps.",
      fix: `Tap "Practice this topic" to take a 10-question practice quiz on ${focusTopic} while enforcing stem verification before locking your choice.`,
    });
  }

  // 3. Confidence gap: Skipped questions
  if (stats.errorTypes.confidenceGaps > 0 && biggest_leaks.length < 3) {
    const focusTopic = weakTopics[0]?.topic || stats.topicBreakdown[0]?.topic || stats.subject;
    biggest_leaks.push({
      topic: focusTopic,
      issue: "Confidence gap from skipped questions",
      evidence: `Left ${stats.errorTypes.confidenceGaps} questions unattempted across tests.`,
      likelyConfusion: "Hesitation when evaluating options with two plausible candidates, leading to unnecessary skips on solvable questions.",
      fix: `Tap "Practice this topic" to drill 10 questions on ${focusTopic} using deliberate two-option elimination to build confidence.`,
    });
  }

  // 4. Second-guessing: Right-to-wrong answer changes
  const changes = stats.errorTypes.secondGuessing || stats.rightToWrongChanges || 0;
  if (changes > 0 && biggest_leaks.length < 3) {
    const focusTopic = weakTopics[0]?.topic || stats.topicBreakdown[0]?.topic || stats.subject;
    biggest_leaks.push({
      topic: focusTopic,
      issue: "Second-guessing answer changes",
      evidence: `Recorded ${changes} instances of changing an answer from correct to wrong.`,
      likelyConfusion: "Over-analyzing straightforward questions and switching away from correct intuitive solutions to tempting distractors.",
      fix: `Tap "Practice this topic" to solve 10 targeted questions on ${focusTopic}, locking your primary answer unless you detect a factual contradiction.`,
    });
  }

  // Fallback to remaining weak topics if leaks still needed
  if (biggest_leaks.length === 0) {
    weakTopics.slice(0, 2).forEach((w) => {
      biggest_leaks.push({
        topic: w.topic,
        issue: `Knowledge gap in ${w.topic}`,
        evidence: `${w.accuracyPercentage}% accuracy across ${w.attempted} attempts.`,
        likelyConfusion: `Uncertainty with advanced NCERT applications and calculation steps in ${w.topic}.`,
        fix: `Tap "Practice this topic" to run a 10-question practice quiz on ${w.topic} prioritizing past mistakes.`,
      });
    });
  }

  if (biggest_leaks.length === 0) {
    const defaultTopic = stats.topicBreakdown[0]?.topic || stats.subject;
    biggest_leaks.push({
      topic: defaultTopic,
      issue: "Marks lost to wrong answers",
      evidence: `Lost ${stats.negativeMarksLost} marks due to wrong answers on uncertain options.`,
      likelyConfusion: "Selecting options without definitive elimination of distractors.",
      fix: `Tap "Practice this topic" to complete a 10-question accuracy quiz on ${defaultTopic}.`,
    });
  }

  const strengths = strongTopics.slice(0, 3).map(
    (s) => `${s.topic} (${s.accuracyPercentage}% accuracy over ${s.attempted} questions)`
  );
  if (strengths.length === 0) {
    strengths.push(`Solid accuracy foundation with ${stats.overallAccuracyPercentage}% overall accuracy across ${stats.uniqueQuestionsAnalyzed} questions`);
  }

  const primaryLeakTopic = conceptGapTopics[0]?.topic || weakTopics[0]?.topic || stats.subject;
  const weekly_plan = [
    { day: "Day 1", focus: "Foundation Audit", task: `Review core NCERT formulas & summary notes for ${primaryLeakTopic}`, minutes: 25 },
    { day: "Day 2", focus: "Targeted Drill", task: `Solve 10 curated questions focusing on ${primaryLeakTopic}`, minutes: 20 },
    { day: "Day 3", focus: "Error Log Analysis", task: "Review error logs and analyze wrong answers from Day 2", minutes: 15 },
    { day: "Day 4", focus: "PYQ Provenance", task: `Solve 15 past year questions from ${stats.subject}`, minutes: 30 },
    { day: "Day 5", focus: "Sectional Practice", task: "Attempt a 25-question sectional mock to solidify accuracy", minutes: 30 },
    { day: "Day 6", focus: "Option Elimination", task: "Practice 10 Assertion-Reasoning and Match-the-Following questions", minutes: 20 },
    { day: "Day 7", focus: "Milestone Assessment", task: "Take a full 50-question mock exam and analyze net score", minutes: 60 },
  ];

  const test_taking_strategy = [
    `Preserve positive momentum: net score is currently ${stats.netScore} marks out of ${stats.potentialScore} potential.`,
    `Contain marks lost to wrong answers: you have lost ${stats.negativeMarksLost} marks to -1 penalties. Skip low-confidence guesses.`,
    `Focus on high-accuracy topics first and eliminate distractors systematically.`,
  ];

  let comparison_with_previous = "First report: this is your baseline";
  if (prevStats) {
    const accuracyDelta = stats.overallAccuracyPercentage - prevStats.overallAccuracyPercentage;
    const netDelta = stats.netScore - prevStats.netScore;
    comparison_with_previous = `Compared to your previous evaluation, overall accuracy changed by ${
      accuracyDelta >= 0 ? "+" : ""
    }${accuracyDelta}% and net score shifted by ${netDelta >= 0 ? "+" : ""}${netDelta} marks.`;
  }

  return {
    summary: `In ${stats.subject}, you have analyzed ${stats.uniqueQuestionsAnalyzed} questions with an overall accuracy of ${stats.overallAccuracyPercentage}%. Your net score is ${stats.netScore}/${stats.potentialScore} marks with ${stats.negativeMarksLost} marks lost to wrong answers. With ${stats.daysToExam} days remaining until CUET, focused correction of your top error patterns will accelerate your rank.`,
    biggest_leaks,
    strengths,
    weekly_plan,
    test_taking_strategy,
    next_test_goal: `Aim for ${Math.min(95, stats.overallAccuracyPercentage + 8)}% accuracy and reduce marks lost to wrong answers below ${Math.max(2, Math.floor(stats.negativeMarksLost * 0.5))} on your next 50-question mock.`,
    comparison_with_previous,
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
 * - Enforces retry-once policy on validation failure
 * - Falls back to deterministic report or surfaces error cleanly
 */
export async function generateAICoachReport(
  stats: AICoachComputedStats,
  prevStats: AICoachComputedStats | null
): Promise<{ report: AICoachReportContent; model: string }> {
  let lastError: Error | null = null;

  // Try up to 2 attempts with Groq (initial + 1 retry on failure)
  for (let attempt = 1; attempt <= 2; attempt++) {
    if (process.env.GROQ_API_KEY && !process.env.GROQ_API_KEY.includes("placeholder")) {
      try {
        const groqResult = await callGroq(stats, prevStats);
        if (groqResult) {
          return { report: groqResult, model: process.env.GROQ_MODEL || "qwen/qwen3.8-27b" };
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[AI Coach] Groq attempt ${attempt} failed:`, err?.message || err);
      }
    }
  }

  // If Groq failed or was not configured, use deterministic generation
  console.warn(
    "[AI Coach] Using verified deterministic stats engine fallback:",
    lastError?.message || "No external AI keys responding"
  );
  const fallback = buildDeterministicAICoachReport(stats, prevStats);
  return { report: fallback, model: "deterministic-coach-v1" };
}
