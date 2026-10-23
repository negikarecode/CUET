import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import { AICoachComputedStats, AICoachReportContent } from "@/types/ai-coach";
import { AI_COACH_CONFIG } from "./config";

const SYSTEM_PROMPT = `You are the authentic CUET UG AI Learning Coach.
Your role is to diagnose candidate performance with empirical precision and strategic warmth.
CRITICAL INSTRUCTIONS:
1. Use ONLY the numbers and telemetry given in the computed stats JSON. NEVER invent, extrapolate, or hallucinate data.
2. Be specific, actionable, kind, but completely honest about weaknesses and negative marks lost.
3. Every biggest leak MUST cite empirical evidence from the stats (e.g. "lost 14 negative marks in Careless Errors", "52% accuracy in Optics across 9 attempts").
4. Weekly plan must have specific actionable tasks with minute allocations for 7 days.
5. Provide strict JSON-only output matching the requested schema. No markdown ticks, no preamble.`;

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
 * Builds deterministic fallback AI report from computed stats if upstream calls fail
 */
export function buildDeterministicAICoachReport(
  stats: AICoachComputedStats,
  prevStats: AICoachComputedStats | null
): AICoachReportContent {
  const weakTopics = stats.topicBreakdown.filter((t) => t.classification === "weak");
  const strongTopics = stats.topicBreakdown.filter((t) => t.classification === "strong");

  const biggest_leaks = weakTopics.slice(0, 3).map((w) => ({
    issue: `Concept leakage in ${w.topic}`,
    evidence: `${w.accuracyPercentage}% accuracy across ${w.attempted} attempts (avg pacing: ${w.averageTimeSeconds}s).`,
    fix: `Review core NCERT definitions and distinction boundaries for ${w.topic}, then take a timed 5-question drill.`,
  }));

  if (biggest_leaks.length === 0 && stats.errorTypes.carelessErrors > 0) {
    biggest_leaks.push({
      issue: "Careless speed execution errors",
      evidence: `Recorded ${stats.errorTypes.carelessErrors} incorrect answers on responses under 15 seconds.`,
      fix: "Enforce a mandatory 10-second stem re-read rule on questions featuring NOT, EXCEPT, or numerical units.",
    });
  }

  if (biggest_leaks.length === 0) {
    biggest_leaks.push({
      issue: "Negative marking friction",
      evidence: `Lost ${stats.negativeMarksLost} potential marks due to wrong answers on uncertain options.`,
      fix: "Utilize strategic option elimination and skip options below 50% subjective certainty.",
    });
  }

  const strengths = strongTopics.slice(0, 3).map(
    (s) => `${s.topic} (${s.accuracyPercentage}% accuracy over ${s.attempted} questions)`
  );
  if (strengths.length === 0) {
    strengths.push(`Steady exam pacing averaging ${stats.averageTimePerQuestionSeconds}s per question`);
  }

  const primaryLeakTopic = weakTopics[0]?.topic || stats.subject;
  const weekly_plan = [
    { day: "Day 1", focus: "Foundation Audit", task: `Review core NCERT formulas & summary notes for ${primaryLeakTopic}`, minutes: 25 },
    { day: "Day 2", focus: "Targeted Drill", task: `Solve 10 curated questions focusing on ${primaryLeakTopic}`, minutes: 20 },
    { day: "Day 3", focus: "Pacing & Error Log", task: "Review error logs and analyze wrong answers from Day 2", minutes: 15 },
    { day: "Day 4", focus: "PYQ Provenance", task: `Solve 15 past year questions from ${stats.subject}`, minutes: 30 },
    { day: "Day 5", focus: "Timed Simulation", task: "Attempt a 25-question timed sectional mock under 30 minutes", minutes: 30 },
    { day: "Day 6", focus: "Option Elimination", task: "Practice 10 Assertion-Reasoning and Match-the-Following questions", minutes: 20 },
    { day: "Day 7", focus: "Milestone Assessment", task: "Take a full 50-question mock exam and analyze net score", minutes: 60 },
  ];

  const test_taking_strategy = [
    `Preserve positive momentum: net score is currently ${stats.netScore} marks out of ${stats.potentialScore} potential.`,
    `Contain negative marking: you have lost ${stats.negativeMarksLost} marks to -1 penalties. Skip low-confidence guesses.`,
    `Maintain target pacing around ${Math.max(45, stats.averageTimePerQuestionSeconds)}s per question to avoid last-minute panic.`,
  ];

  let comparison_with_previous = "This is your initial baseline diagnostic evaluation for this subject.";
  if (prevStats) {
    const accuracyDelta = stats.overallAccuracyPercentage - prevStats.overallAccuracyPercentage;
    const netDelta = stats.netScore - prevStats.netScore;
    comparison_with_previous = `Compared to your previous evaluation, overall accuracy changed by ${
      accuracyDelta >= 0 ? "+" : ""
    }${accuracyDelta}% and net score shifted by ${netDelta >= 0 ? "+" : ""}${netDelta} marks.`;
  }

  return {
    summary: `In ${stats.subject}, you have analyzed ${stats.uniqueQuestionsAnalyzed} questions with an overall accuracy of ${stats.overallAccuracyPercentage}%. Your net score is ${stats.netScore}/${stats.potentialScore} marks with ${stats.negativeMarksLost} marks lost to negative penalties. With ${stats.daysToExam} days remaining until CUET, focused correction of your top error patterns will accelerate your rank.`,
    biggest_leaks,
    strengths,
    weekly_plan,
    test_taking_strategy,
    next_test_goal: `Aim for ${Math.min(95, stats.overallAccuracyPercentage + 8)}% accuracy and reduce negative marks below ${Math.max(2, Math.floor(stats.negativeMarksLost * 0.5))} on your next 50-question mock.`,
    comparison_with_previous,
  };
}

/**
 * Call Gemini 2.0 Flash via @google/genai
 */
async function callGemini(
  stats: AICoachComputedStats,
  prevStats: AICoachComputedStats | null
): Promise<AICoachReportContent | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.includes("placeholder")) {
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });
  const userPayload = {
    currentStats: stats,
    previousReportStats: prevStats,
  };

  const response = await ai.models.generateContent({
    model: AI_COACH_CONFIG.MODEL,
    contents: `SYSTEM INSTRUCTIONS:\n${SYSTEM_PROMPT}\n\nSTUDENT PERFORMANCE TELEMETRY (JSON):\n${JSON.stringify(
      userPayload,
      null,
      2
    )}\n\nGenerate the complete JSON response with keys: summary, biggest_leaks, strengths, weekly_plan, test_taking_strategy, next_test_goal, comparison_with_previous.`,
    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
      maxOutputTokens: 1800,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });

  const text = response.text?.trim();
  if (!text) return null;

  let cleaned = text;
  const match = text.match(/\{[\s\S]*\}/);
  if (match) cleaned = match[0];

  const parsed = JSON.parse(cleaned);
  const validation = validateAICoachReport(parsed);
  if (validation.valid && validation.data) {
    return validation.data;
  }
  throw new Error(`Gemini output failed schema validation: ${validation.error}`);
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
    currentStats: stats,
    previousReportStats: prevStats,
  };

  const completion = await groq.chat.completions.create({
    model: AI_COACH_CONFIG.GROQ_MODEL,
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
  if (!content) return null;

  let cleaned = content;
  const match = content.match(/\{[\s\S]*\}/);
  if (match) cleaned = match[0];

  const parsed = JSON.parse(cleaned);
  const validation = validateAICoachReport(parsed);
  if (validation.valid && validation.data) {
    return validation.data;
  }
  throw new Error(`Groq output failed schema validation: ${validation.error}`);
}

/**
 * Main AI generation orchestrator:
 * - Tries Gemini first (active key), falls back to Groq
 * - Enforces retry-once policy on validation failure
 * - Falls back to deterministic report or surfaces error cleanly
 */
export async function generateAICoachReport(
  stats: AICoachComputedStats,
  prevStats: AICoachComputedStats | null
): Promise<{ report: AICoachReportContent; model: string }> {
  let lastError: Error | null = null;

  // Try up to 2 attempts (initial + 1 retry on failure)
  for (let attempt = 1; attempt <= 2; attempt++) {
    // 1. Try Gemini
    if (process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes("placeholder")) {
      try {
        const geminiResult = await callGemini(stats, prevStats);
        if (geminiResult) {
          return { report: geminiResult, model: AI_COACH_CONFIG.MODEL };
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[AI Coach] Gemini attempt ${attempt} failed:`, err?.message || err);
      }
    }

    // 2. Try Groq fallback
    if (process.env.GROQ_API_KEY && !process.env.GROQ_API_KEY.includes("placeholder")) {
      try {
        const groqResult = await callGroq(stats, prevStats);
        if (groqResult) {
          return { report: groqResult, model: AI_COACH_CONFIG.GROQ_MODEL };
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[AI Coach] Groq attempt ${attempt} failed:`, err?.message || err);
      }
    }
  }

  // If both external providers failed or were not configured, use deterministic generation
  console.warn(
    "[AI Coach] Using verified deterministic stats engine fallback:",
    lastError?.message || "No external AI keys responding"
  );
  const fallback = buildDeterministicAICoachReport(stats, prevStats);
  return { report: fallback, model: "deterministic-coach-v1" };
}
