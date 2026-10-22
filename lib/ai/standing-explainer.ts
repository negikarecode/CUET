import crypto from "crypto";
import { getGeminiClient } from "@/lib/ai/gemini-diagnostics";
import { ChanceBand } from "@/lib/config/standingConfig";

export interface StandingExplanationRequest {
  targetCollege: string;
  courseName: string;
  cutoffScale?: number;
  expectedCutoffMarks?: number;
  cutoffDisplay?: string;
  combinedMarks?: number | null;
  marksGap?: number | null;
  gapDisplay?: string;
  status?: "above_cutoff" | "below_cutoff" | "incomplete" | "no_data";
  statusLabel?: string;
  isComplete?: boolean;
  hasNoData?: boolean;
  participatingSubjects: string[];
  missingSubjects: string[];
  subjectBreakdown?: Array<{
    subjectName: string;
    currentMarks: number | null;
    subjectMaxMarks: number;
    targetMarks: number;
    marksNeeded: number;
  }>;
  userId?: string;

  // Legacy fields
  band?: ChanceBand;
  userPct?: number | null;
  cutoffRange?: {
    lowPct: number;
    highPct: number;
    midpointPct: number;
  };
  gapPercentagePoints?: number;
  coverage?: number;
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
    req.cutoffDisplay || "",
    req.combinedMarks ?? "none",
    req.marksGap ?? "none",
    req.status || "",
    req.participatingSubjects.slice().sort().join(","),
    req.missingSubjects.slice().sort().join(","),
  ].join("::");

  return crypto.createHash("sha256").update(payload).digest("hex");
}

/**
 * Deterministic fallback template when LLM is unavailable, rate-limited, or fails verification.
 * Communicates strictly in marks with no percentages.
 */
export function generateDeterministicExplanation(
  req: StandingExplanationRequest
): StandingExplanationResult {
  const {
    targetCollege,
    courseName,
    cutoffDisplay = "the historical cutoff",
    combinedMarks,
    marksGap,
    gapDisplay,
    status = "no_data",
    isComplete = false,
    hasNoData = false,
    missingSubjects = [],
    subjectBreakdown = [],
  } = req;

  let summary = "";
  const nextActions: string[] = [];

  if (hasNoData || status === "no_data" || (combinedMarks === null && missingSubjects.length === 0 && !isComplete)) {
    summary = `You haven't recorded any mock tests for ${courseName} yet. The expected historical cutoff for ${targetCollege} is ${cutoffDisplay}. Complete mocks in your core domain subjects to establish your baseline standing.`;
    nextActions.push(`Attempt an initial 50-question mock for ${courseName}.`);
    nextActions.push("Review high-yield NCERT Class 12 formulas and key definitions.");
  } else if (!isComplete || status === "incomplete") {
    summary = `You have completed partial subjects, but official admission standing requires all required subjects evaluated against the ${cutoffDisplay} cutoff for ${targetCollege}.`;
    nextActions.push(`Attempt a timed mock in ${missingSubjects.join(", ") || "your remaining required subjects"} to compute your combined standing.`);
    const highestGapSubject = [...subjectBreakdown].filter((s) => s.currentMarks !== null).sort((a, b) => b.marksNeeded - a.marksNeeded)[0];
    if (highestGapSubject && highestGapSubject.marksNeeded > 0) {
      nextActions.push(`Focus on ${highestGapSubject.subjectName} to close its ${highestGapSubject.marksNeeded} marks gap toward its ${highestGapSubject.targetMarks} marks target.`);
    } else {
      nextActions.push("Maintain timing discipline: avoid guessing to protect your score from negative marks (-1).");
    }
  } else if (status === "above_cutoff" || (marksGap !== null && marksGap !== undefined && marksGap <= 0)) {
    summary = `Your combined mock score of ${combinedMarks} marks meets or exceeds the historical cutoff (${cutoffDisplay}) for ${targetCollege}! You are currently ${gapDisplay || "meeting the cutoff threshold"}.`;
    nextActions.push("Maintain timing discipline: avoid guessing on ambiguous questions to protect your score from negative marks (-1).");
    nextActions.push("Take full multi-subject timed mocks to build stamina for exam day.");
  } else {
    // below_cutoff
    summary = `Your combined mock score of ${combinedMarks} marks is ${gapDisplay || `${marksGap} marks below cutoff`} against the historical cutoff (${cutoffDisplay}) for ${targetCollege}.`;
    nextActions.push(`Bridge the ${marksGap ?? "score"} marks gap by targeting 3 to 4 more correct questions per subject.`);
    nextActions.push("Analyze questions that took longer than 60 seconds to eliminate time-sink calculation traps.");
  }

  return {
    summary,
    nextActions,
    isAiGenerated: false,
  };
}

/**
 * Validates that LLM output does NOT contain percentages, forbidden claims, or malicious markup.
 */
export function validateLLMOutput(text: string): boolean {
  if (typeof text !== "string" || text.trim().length < 5 || text.length > 2000) {
    return false;
  }
  const lower = text.toLowerCase();
  // Strictly no percentages
  if (text.includes("%") || lower.includes("percent")) {
    return false;
  }
  // Forbidden phrases that create false guarantees
  if (lower.includes("guaranteed") || lower.includes("100% chance") || lower.includes("certain to get")) {
    return false;
  }
  // Reject HTML scripts, iframes, and dangerous handlers
  if (
    lower.includes("<script") ||
    lower.includes("<iframe") ||
    lower.includes("javascript:") ||
    lower.includes("onerror=") ||
    lower.includes("onload=")
  ) {
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
- Expected Historical Cutoff: ${req.cutoffDisplay || `${req.expectedCutoffMarks}/${req.cutoffScale} marks`}
- Candidate Combined Score: ${req.combinedMarks !== null && req.combinedMarks !== undefined ? `${req.combinedMarks} marks` : "Incomplete / awaiting remaining subjects"}
- Cutoff Gap: ${req.gapDisplay || `${req.marksGap} marks`}
- Admission Standing Status: ${req.statusLabel || req.status || "Incomplete"}
- Tested Subjects: ${req.participatingSubjects.join(", ") || "None"}
- Missing Required Subjects: ${req.missingSubjects.join(", ") || "None"}

RULES:
1. All scores and targets MUST be communicated strictly in MARKS (+5 / -1 marking scheme). ABSOLUTELY DO NOT use percentage symbols (%) or percentage numbers anywhere.
2. DO NOT change or invent numbers. Keep all numbers identical to the facts.
3. DO NOT promise admission or use words like "guaranteed".
4. Provide objective, supportive guidance.
5. Output strict JSON with keys: "summary" (string) and "nextActions" (array of 2-3 strings).
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
      validateLLMOutput(parsed.summary) &&
      parsed.nextActions.every((act: any) => typeof act === "string" && validateLLMOutput(act))
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
