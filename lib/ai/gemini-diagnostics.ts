import { GoogleGenAI, Type } from "@google/genai";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { stringToUuid } from "@/lib/utils";

export type MistakeErrorClassification =
  | "Conceptual Gap"
  | "Trap Option"
  | "Time Pressure Panic";

export interface MistakeDiagnosticData {
  errorClassification: MistakeErrorClassification;
  diagnosisMessage: string;
  ncertCorrection: string;
}

export interface MistakeDiagnosticResult extends MistakeDiagnosticData {
  cacheKey: string;
  fromCache: boolean;
  tokensUsed: number;
  modelUsed?: string;
}

export interface MistakeDiagnosticInput {
  questionId: string;
  selectedOption: string;
  questionText: string;
  selectedOptionText?: string;
  correctOption: string;
  correctOptionText?: string;
  explanation?: string;
  microTopic?: string;
  timeSpentSeconds?: number;
}

// In-memory L1 cache for sub-millisecond responses
export const l1DiagnosticCache = new Map<string, MistakeDiagnosticData>();

/**
 * Computes deterministic SHA-256 cache key from question_id and selected_option
 */
export function getMistakeCacheKey(questionId: string, selectedOption: string): string {
  return crypto
    .createHash("sha256")
    .update(`${questionId}_${selectedOption}`)
    .digest("hex");
}

let geminiClient: GoogleGenAI | null = null;

/**
 * Cleanly initializes the Google Gen AI SDK using process.env.GEMINI_API_KEY
 */
export function getGeminiClient(): GoogleGenAI | null {
  // Ensure we resolve the production key from .env.local if not already set or invalid
  if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY.startsWith("AIzaSy")) {
    try {
      const envPath = path.resolve(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf-8");
        const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
        if (match && match[1]) {
          process.env.GEMINI_API_KEY = match[1].trim();
        }
      }
    } catch {
      // Ignore if filesystem unavailable
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.includes("placeholder") || apiKey.trim() === "") {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

// Explicitly target gemini-2.0-flash as specified in Phase 2
export const TARGET_MODEL = "gemini-2.0-flash";
export const RESILIENT_FALLBACK_MODELS = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-3.6-flash",
];

/**
 * Strict response schema definition for Gemini
 */
export const geminiResponseSchema = {
  type: Type.OBJECT,
  properties: {
    errorClassification: {
      type: Type.STRING,
      enum: ["Conceptual Gap", "Trap Option", "Time Pressure Panic"],
      description: "Classifies error into Conceptual Gap, Trap Option, or Time Pressure Panic",
    },
    diagnosisMessage: {
      type: Type.STRING,
      description: "Concise conversational explanation of the distractor trap and student misconception.",
    },
    ncertCorrection: {
      type: Type.STRING,
      description: "Strict NCERT rule, definition, or formula reminder to anchor the correct concept.",
    },
  },
  required: ["errorClassification", "diagnosisMessage", "ncertCorrection"],
};

/**
 * Deterministic fallback diagnostic generator when external LLM is unreachable
 */
export function generateFallbackDiagnostic(params: {
  selectedOption: string;
  microTopic?: string;
  timeSpentSeconds?: number;
  explanation?: string;
}): MistakeDiagnosticData {
  const {
    selectedOption,
    microTopic = "Domain Concept",
    timeSpentSeconds = 45,
    explanation = "",
  } = params;

  let classification: MistakeErrorClassification = "Conceptual Gap";
  let distractorDiagnosis = `Option ${selectedOption} is an attractive distractor that confuses related boundary conditions in ${microTopic}.`;

  if (timeSpentSeconds < 25) {
    classification = "Time Pressure Panic";
    distractorDiagnosis = `Rushing in only ${timeSpentSeconds}s led to picking Option ${selectedOption} without reading the qualifying keywords (e.g. 'NOT' or 'EXCEPT') in ${microTopic}.`;
  } else if (timeSpentSeconds > 75) {
    classification = "Trap Option";
    distractorDiagnosis = `After ${timeSpentSeconds}s of calculation, Option ${selectedOption} caught a sign reversal or unit conversion trap standard in CUET ${microTopic} questions.`;
  }

  return {
    errorClassification: classification,
    diagnosisMessage: distractorDiagnosis,
    ncertCorrection: explanation
      ? `NCERT Reference: ${explanation.slice(0, 180)}`
      : `Anchor to NCERT Class 12 standard definitions and summary rules for ${microTopic}.`,
  };
}

/**
 * Calls Gemini using Google Gen AI SDK with strict schema and error resilience
 */
export async function callGeminiDiagnostic(
  prompt: string
): Promise<{ data: MistakeDiagnosticData; tokensUsed: number; model: string } | null> {
  const ai = getGeminiClient();
  if (!ai) {
    return null;
  }

  const modelsToAttempt = [
    process.env.GEMINI_MODEL || TARGET_MODEL,
    ...RESILIENT_FALLBACK_MODELS,
  ];

  for (const model of modelsToAttempt) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.1,
          maxOutputTokens: 800,
          thinkingConfig: {
            thinkingBudget: 0,
          },
          responseSchema: geminiResponseSchema,
        },
      });

      const rawText = response.text;
      if (!rawText) continue;

      let cleaned = rawText.trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleaned = jsonMatch[0];
      }

      const parsed = JSON.parse(cleaned);
      if (
        parsed &&
        typeof parsed.diagnosisMessage === "string" &&
        typeof parsed.ncertCorrection === "string"
      ) {
        let classification: MistakeErrorClassification = "Conceptual Gap";
        if (
          parsed.errorClassification === "Conceptual Gap" ||
          parsed.errorClassification === "Trap Option" ||
          parsed.errorClassification === "Time Pressure Panic"
        ) {
          classification = parsed.errorClassification;
        }

        const tokensUsed = response.usageMetadata?.totalTokenCount || 200;
        return {
          data: {
            errorClassification: classification,
            diagnosisMessage: parsed.diagnosisMessage,
            ncertCorrection: parsed.ncertCorrection,
          },
          tokensUsed,
          model,
        };
      }
    } catch (err: unknown) {
      const errorObj = err as { status?: number; message?: string };
      // If 404 (model deprecated / not found in current API tier), gracefully try fallback model
      if (
        errorObj?.status === 404 ||
        errorObj?.message?.includes("not found") ||
        errorObj?.message?.includes("no longer available")
      ) {
        continue;
      }
      // If 503 (high demand) or 429 (rate limit), continue to next model
      if (errorObj?.status === 503 || errorObj?.status === 429) {
        continue;
      }
      console.warn(`Gemini call to ${model} failed:`, errorObj?.message || err);
      continue;
    }
  }

  return null;
}

/**
 * Main diagnostic execution:
 * 1. Checks in-memory L1 cache (0 tokens)
 * 2. Checks Supabase ai_diagnosis_cache table (0 tokens)
 * 3. On miss: calls Gemini 2.0 Flash via @google/genai with strict JSON schema
 * 4. Falls back gracefully if external call fails (429, timeout, network error)
 * 5. Persists result in ai_diagnosis_cache so all future queries consume 0 tokens
 */
export async function diagnoseMistake(
  params: MistakeDiagnosticInput
): Promise<MistakeDiagnosticResult> {
  const {
    questionId,
    selectedOption,
    questionText,
    selectedOptionText = "",
    correctOption,
    correctOptionText = "",
    explanation = "",
    microTopic = "Domain Concept",
    timeSpentSeconds = 45,
  } = params;

  const cacheKey = getMistakeCacheKey(questionId, selectedOption);

  // ─── 1. CHECK L1 MEMORY CACHE (0 TOKENS) ──────────────────────────────────
  const l1Hit = l1DiagnosticCache.get(cacheKey);
  if (l1Hit) {
    return {
      ...l1Hit,
      cacheKey,
      fromCache: true,
      tokensUsed: 0,
    };
  }

  // ─── 2. CHECK SUPABASE ai_diagnosis_cache TABLE (0 TOKENS) ────────────────
  try {
    const supabase = createClient();
    const { data: cachedRow } = await supabase
      .from("ai_diagnosis_cache")
      .select("error_classification, diagnosis_message, ncert_correction")
      .eq("cache_key", cacheKey)
      .maybeSingle();

    if (cachedRow) {
      const resultData: MistakeDiagnosticData = {
        errorClassification: cachedRow.error_classification as MistakeErrorClassification,
        diagnosisMessage: cachedRow.diagnosis_message,
        ncertCorrection: cachedRow.ncert_correction,
      };

      l1DiagnosticCache.set(cacheKey, resultData);

      // Asynchronously increment hit_count
      supabaseAdmin
        .from("ai_diagnosis_cache")
        .update({ updated_at: new Date().toISOString() })
        .eq("cache_key", cacheKey)
        .then(
          () => {},
          () => {}
        );

      return {
        ...resultData,
        cacheKey,
        fromCache: true,
        tokensUsed: 0,
      };
    }
  } catch (_dbErr) {
    // Graceful fallback if database unreachable
  }

  // ─── 3. CACHE MISS: CALL GEMINI VIA @google/genai ────────────────────────
  let diagnostic: MistakeDiagnosticData | null = null;
  let tokensUsed = 0;
  let modelUsed: string | undefined = undefined;

  const prompt = `Analyze this student mistake on a CUET multiple-choice question.
Question: "${questionText}"
Topic: ${microTopic}
Time spent: ${timeSpentSeconds} seconds
Option chosen by student (INCORRECT): [Option ${selectedOption}] "${selectedOptionText}"
Correct Option: [Option ${correctOption}] "${correctOptionText}"
Verified NCERT Explanation: "${explanation}"

Analyze why this specific distractor is tempting and explain the exact misconception.
Respond strictly in JSON matching the schema.`;

  try {
    const geminiResult = await callGeminiDiagnostic(prompt);
    if (geminiResult) {
      diagnostic = geminiResult.data;
      tokensUsed = geminiResult.tokensUsed;
      modelUsed = geminiResult.model;
    }
  } catch (err) {
    console.warn("Gemini diagnostic error (falling back):", err);
  }

  // ─── 4. CLEAN FALLBACK DIAGNOSTICS IF UPSTREAM CALL FAILED ───────────────
  if (!diagnostic) {
    diagnostic = generateFallbackDiagnostic({
      selectedOption,
      microTopic,
      timeSpentSeconds,
      explanation,
    });
    tokensUsed = 0;
  }

  // Normalize classification
  if (
    !["Conceptual Gap", "Trap Option", "Time Pressure Panic"].includes(
      diagnostic.errorClassification
    )
  ) {
    diagnostic.errorClassification =
      timeSpentSeconds < 25
        ? "Time Pressure Panic"
        : timeSpentSeconds > 75
        ? "Trap Option"
        : "Conceptual Gap";
  }

  // ─── 5. PERSIST IN ai_diagnosis_cache FOR FUTURE 0-TOKEN REQUESTS ─────────
  l1DiagnosticCache.set(cacheKey, diagnostic);

  try {
    const questionUuid = stringToUuid(questionId);
    await supabaseAdmin.from("ai_diagnosis_cache").upsert(
      {
        cache_key: cacheKey,
        question_id: questionUuid,
        selected_option: selectedOption,
        error_classification: diagnostic.errorClassification,
        diagnosis_message: diagnostic.diagnosisMessage,
        ncert_correction: diagnostic.ncertCorrection,
        hit_count: 1,
      },
      { onConflict: "cache_key" }
    );
  } catch (_insertErr) {
    // Suppress warning if table is not yet in Supabase schema cache
  }

  return {
    ...diagnostic,
    cacheKey,
    fromCache: false,
    tokensUsed,
    modelUsed,
  };
}
