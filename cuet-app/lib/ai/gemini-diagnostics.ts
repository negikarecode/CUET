import { GoogleGenAI, Type } from "@google/genai";
import crypto from "crypto";
import { supabase, getServiceSupabase, isSupabaseConfigured } from "@/lib/supabase";

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

export const l1DiagnosticCache = new Map<string, MistakeDiagnosticData>();

export function getMistakeCacheKey(questionId: string, selectedOption: string): string {
  return crypto
    .createHash("sha256")
    .update(`${questionId}_${selectedOption}`)
    .digest("hex");
}

let geminiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.includes("placeholder") || apiKey.trim() === "") {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

export const TARGET_MODEL = "gemini-2.0-flash";
export const RESILIENT_FALLBACK_MODELS = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-3.6-flash",
];

export const geminiResponseSchema = {
  type: Type.OBJECT,
  properties: {
    errorClassification: {
      type: Type.STRING,
      enum: ["Conceptual Gap", "Trap Option", "Time Pressure Panic"],
    },
    diagnosisMessage: {
      type: Type.STRING,
    },
    ncertCorrection: {
      type: Type.STRING,
    },
  },
  required: ["errorClassification", "diagnosisMessage", "ncertCorrection"],
};

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
    distractorDiagnosis = `Rushing in only ${timeSpentSeconds}s led to picking Option ${selectedOption} without reading qualifying keywords in ${microTopic}.`;
  } else if (timeSpentSeconds > 75) {
    classification = "Trap Option";
    distractorDiagnosis = `After ${timeSpentSeconds}s of calculation, Option ${selectedOption} caught a standard distractor trap in ${microTopic}.`;
  }

  return {
    errorClassification: classification,
    diagnosisMessage: distractorDiagnosis,
    ncertCorrection: explanation
      ? `NCERT Reference: ${explanation.slice(0, 180)}`
      : `Anchor to NCERT Class 12 standard definitions and summary rules for ${microTopic}.`,
  };
}

export async function callGeminiDiagnostic(
  prompt: string
): Promise<{ data: MistakeDiagnosticData; tokensUsed: number; model: string } | null> {
  const ai = getGeminiClient();
  if (!ai) return null;

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
      if (
        errorObj?.status === 404 ||
        errorObj?.message?.includes("not found") ||
        errorObj?.message?.includes("no longer available")
      ) {
        continue;
      }
      if (errorObj?.status === 503 || errorObj?.status === 429) {
        continue;
      }
      console.warn(`Gemini call to ${model} failed in cuet-app:`, errorObj?.message || err);
      continue;
    }
  }

  return null;
}

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

  const l1Hit = l1DiagnosticCache.get(cacheKey);
  if (l1Hit) {
    return {
      ...l1Hit,
      cacheKey,
      fromCache: true,
      tokensUsed: 0,
    };
  }

  if (isSupabaseConfigured()) {
    try {
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
        return {
          ...resultData,
          cacheKey,
          fromCache: true,
          tokensUsed: 0,
        };
      }
    } catch {
      // Offline fallback
    }
  }

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
    console.warn("Gemini diagnostic error in cuet-app (falling back):", err);
  }

  if (!diagnostic) {
    diagnostic = generateFallbackDiagnostic({
      selectedOption,
      microTopic,
      timeSpentSeconds,
      explanation,
    });
    tokensUsed = 0;
  }

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

  l1DiagnosticCache.set(cacheKey, diagnostic);

  if (isSupabaseConfigured()) {
    try {
      const adminSb = getServiceSupabase();
      await adminSb.from("ai_diagnosis_cache").upsert(
        {
          cache_key: cacheKey,
          selected_option: selectedOption,
          error_classification: diagnostic.errorClassification,
          diagnosis_message: diagnostic.diagnosisMessage,
          ncert_correction: diagnostic.ncertCorrection,
          hit_count: 1,
        },
        { onConflict: "cache_key" }
      );
    } catch {
      // Suppress if table not present
    }
  }

  return {
    ...diagnostic,
    cacheKey,
    fromCache: false,
    tokensUsed,
    modelUsed,
  };
}
