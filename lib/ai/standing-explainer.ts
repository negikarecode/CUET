import crypto from "crypto";
import { getGeminiClient } from "@/lib/ai/gemini-diagnostics";
import { ChanceBand } from "@/lib/config/standingConfig";

export interface StandingExplanationRequest {
  targetCollege: string;
  courseName: string;
  band: ChanceBand;
  userPct: number | null;
  cutoffRange: {
    lowPct: number;
    highPct: number;
    midpointPct: number;
  };
  gapPercentagePoints: number;
  coverage: number;
  participatingSubjects: string[];
  missingSubjects: string[];
  userId?: string;
}

export interface StandingExplanationResult {
  summary: string;
  nextActions: string[];
  isAiGenerated: boolean;
  modelUsed?: string;
}

// In-memory cache for standing explanations
const explanationCache = new Map<string, StandingExplanationResult>();

// Daily rate-limiting per user (max 5 AI calls per day)
const userDailyCallCounts = new Map<string, { count: number; dateStr: string }>();
const MAX_CALLS_PER_DAY = 5;

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function computeFactHash(req: StandingExplanationRequest): string {
  const payload = [
    req.targetCollege,
    req.courseName,
    req.band,
    req.userPct,
    req.cutoffRange.midpointPct,
    req.gapPercentagePoints,
    req.coverage,
    req.participatingSubjects.sort().join(","),
    req.missingSubjects.sort().join(","),
  ].join("::");

  return crypto.createHash("sha256").update(payload).digest("hex");
}

/**
 * Deterministic fallback template when LLM is unavailable, rate-limited, or fails verification.
 */
export function generateDeterministicExplanation(
  req: StandingExplanationRequest
): StandingExplanationResult {
  const { targetCollege, courseName, band, userPct, cutoffRange, gapPercentagePoints, coverage, missingSubjects } = req;
  const coveragePct = Math.round(coverage * 100);

  let summary = "";
  const nextActions: string[] = [];

  if (userPct === null || coverage === 0) {
    summary = `You haven't recorded any valid mocks for ${courseName} yet. The expected historical cutoff for ${targetCollege} is around ${cutoffRange.midpointPct}%. Complete mocks in your core domain subjects to establish your baseline standing.`;
    nextActions.push(`Attempt an initial 50-question mock for ${courseName}.`);
    nextActions.push("Review high-yield NCERT Class 12 formulas and key definitions.");
  } else if (band === "Safe" || band === "Likely") {
    summary = `Your current mock average (${userPct}%) places you in the ${band} band for ${targetCollege} in ${courseName}. Your standing exceeds the historical cutoff threshold (${cutoffRange.midpointPct}%).`;
    nextActions.push("Maintain timing discipline: avoid guessing on ambiguous questions to protect your score from negative marks (-1).");
    nextActions.push("Take full multi-subject timed mocks to build stamina for exam day.");
  } else if (band === "Possible") {
    summary = `Your performance (${userPct}%) is within the historical admission window (${cutoffRange.lowPct}% - ${cutoffRange.highPct}%) for ${targetCollege}. A minor increase in your domain average can push your standing into the likely zone.`;
    nextActions.push(`Close the small ${gapPercentagePoints}% gap with 2 targeted subject drills.`);
    nextActions.push("Analyze questions that took longer than 60 seconds to eliminate time-sink calculation traps.");
  } else if (band === "Reach") {
    summary = `You are within striking distance of ${targetCollege} (${courseName}) with a gap of ${gapPercentagePoints} percentage points. The historical threshold is ~${cutoffRange.midpointPct}%.`;
    nextActions.push(`Target 3 to 4 more correct answers per subject to bridge the ${gapPercentagePoints}% difference.`);
    if (missingSubjects.length > 0) {
      nextActions.push(`Take a mock in ${missingSubjects.join(", ")} to raise your coverage from ${coveragePct}%.`);
    } else {
      nextActions.push("Focus on your lowest scoring domain subject for the fastest point gains.");
    }
  } else {
    summary = `There is currently a substantial gap (${gapPercentagePoints}%) between your mock score (${userPct}%) and the historical cutoff for ${targetCollege} (~${cutoffRange.midpointPct}%). Significant score elevation is needed.`;
    nextActions.push("Rebuild foundational NCERT concepts before taking timed full-length mocks.");
    nextActions.push("Focus revision on high-weightage chapters where you have recurring errors.");
  }

  return {
    summary,
    nextActions,
    isAiGenerated: false,
  };
}

/**
 * Validates that LLM output does NOT contradict deterministic facts.
 */
function validateLLMOutput(
  text: string,
  band: ChanceBand
): boolean {
  const lower = text.toLowerCase();
  // Forbidden phrases that create false precision or contradict bands
  if (lower.includes("guaranteed") || lower.includes("100% chance") || lower.includes("certain to get")) {
    return false;
  }
  // If Reach or Far, should not say "you are safe" or "you will definitely get in"
  if ((band === "Reach" || band === "Far") && (lower.includes("you will easily get") || lower.includes("safe admission"))) {
    return false;
  }
  return true;
}

/**
 * Generates an AI-backed explanation with strict fact grounding and deterministic fallback.
 */
export async function getStandingExplanation(
  req: StandingExplanationRequest
): Promise<StandingExplanationResult> {
  const hash = computeFactHash(req);

  // 1. Check Cache
  if (explanationCache.has(hash)) {
    return explanationCache.get(hash)!;
  }

  // 2. Check Daily Limit
  const userId = req.userId || "guest";
  const today = getTodayString();
  const usage = userDailyCallCounts.get(userId) || { count: 0, dateStr: today };
  if (usage.dateStr !== today) {
    usage.count = 0;
    usage.dateStr = today;
  }

  if (usage.count >= MAX_CALLS_PER_DAY) {
    const fallback = generateDeterministicExplanation(req);
    explanationCache.set(hash, fallback);
    return fallback;
  }

  // 3. Try LLM Generation
  try {
    const client = getGeminiClient();
    if (!client) {
      const fallback = generateDeterministicExplanation(req);
      explanationCache.set(hash, fallback);
      return fallback;
    }

    const prompt = `
You are an expert CUET UG admissions counselor. Analyze the candidate's standing and return a JSON object with a brief summary (2-3 sentences) and exactly 2-3 specific actionable next steps.

FACTS:
- Target College: ${req.targetCollege}
- Course: ${req.courseName}
- Candidate Standing Band: ${req.band} (Safe, Likely, Possible, Reach, Far)
- Candidate Average: ${req.userPct !== null ? `${req.userPct}%` : "No valid data yet"}
- Historical Expected Cutoff Range: ${req.cutoffRange.lowPct}% - ${req.cutoffRange.highPct}% (Midpoint: ${req.cutoffRange.midpointPct}%)
- Gap to Midpoint: ${req.gapPercentagePoints} percentage points
- Subject Coverage: ${Math.round(req.coverage * 100)}%
- Tested Subjects: ${req.participatingSubjects.join(", ") || "None"}
- Missing Required Subjects: ${req.missingSubjects.join(", ") || "None"}

RULES:
1. DO NOT change or invent numbers. Keep all numbers identical to the facts.
2. DO NOT promise admission or use words like "guaranteed" or "chance %".
3. Provide objective, supportive guidance tailored to their band.
4. Output strict JSON with keys: "summary" (string) and "nextActions" (array of 2-3 strings).
`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const rawText = response.text || "";
    const parsed = JSON.parse(rawText);

    if (
      parsed &&
      typeof parsed.summary === "string" &&
      Array.isArray(parsed.nextActions) &&
      validateLLMOutput(parsed.summary, req.band)
    ) {
      // Increment user usage
      usage.count += 1;
      userDailyCallCounts.set(userId, usage);

      const result: StandingExplanationResult = {
        summary: parsed.summary,
        nextActions: parsed.nextActions.slice(0, 3),
        isAiGenerated: true,
        modelUsed: "gemini-2.5-flash",
      };

      explanationCache.set(hash, result);
      return result;
    }
  } catch (err) {
    console.warn("LLM explanation generation skipped/fallback:", err);
  }

  // Fallback to deterministic
  const fallback = generateDeterministicExplanation(req);
  explanationCache.set(hash, fallback);
  return fallback;
}
