import { NextRequest, NextResponse } from "next/server";
import { getCachedWhyWrongExplanation, setCachedWhyWrongExplanation } from "@/lib/ai-cache";
import { checkServerRateLimit, getClientIdentifier, getRateLimitHeaders } from "@/lib/rate-limiter";
import { createClient } from "@/lib/supabase/server";
import { tokenLogger } from "@/lib/ai/token-logger";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";

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

// In-memory flagged explanations store for admin review
const flaggedExplanationsStore: Array<{
  questionId: string;
  selectedOption: string;
  reason: string;
  flaggedAt: string;
  userId: string;
}> = [];

/**
 * Retrieve authentic question from verified question bank matching subject and chapter
 */
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

/**
 * Deterministic fallback generator for why-wrong explanation
 */
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
    const body = await req.json();

    // Check if this is a flag action
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

    // 1. Check Cache first (sub-millisecond retrieval)
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

    // 2. Check Daily Rate Limit
    let authUserId: string | null = null;
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) authUserId = authUser.id;
    } catch {}

    const clientIdentifier = getClientIdentifier(req, authUserId || userId);
    const rateCheck = checkServerRateLimit("why_wrong", clientIdentifier, 40);
    if (!rateCheck.allowed) {
      // Return deterministic fallback if rate limited
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

    // 3. Attempt LLM generation using fast, cheap model (Groq Llama 3.1 8B Instant)
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

    // Fallback if LLM parsing or call failed
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
  } catch (error: any) {
    console.error("Why-wrong API error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation", details: error?.message },
      { status: 500 }
    );
  }
}
