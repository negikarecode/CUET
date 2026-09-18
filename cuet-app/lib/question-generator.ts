import { getOpenAIClient, AI_MODELS, estimateCost, isOpenAIConfigured } from './openai';
import { searchCUETContent } from './rag-engine';
import {
  QUESTION_GENERATOR_SYSTEM_PROMPT,
  buildQuestionGenerationPrompt,
  buildBatchGenerationPrompt,
} from './prompt-templates';
import {
  validateGeneratedQuestion,
  GeneratedQuestion,
} from './question-validator';
import { checkCache, saveToCache, buildCacheKey } from './ai-cache';

export type { GeneratedQuestion };

export interface GenerationResult {
  success: boolean;
  question?: GeneratedQuestion;
  error?: string;
  fromCache: boolean;
  tokensUsed: number;
  estimatedCost: number;
  contextChunksUsed: number;
  pineconeIds: string[];
}

// ─────────────────────────────────────────────────────
// MAIN: Generate 1 personalized question
// ─────────────────────────────────────────────────────
export async function generatePersonalizedQuestion(params: {
  topicId: number;
  topicName: string;
  subjectName: string;
  chapterName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  studentAccuracy: number;
  studentId: string;
  questionsSeenBefore?: string[];
}): Promise<GenerationResult> {
  const {
    topicId,
    topicName,
    subjectName,
    chapterName,
    difficulty,
    studentAccuracy,
    studentId,
    questionsSeenBefore = [],
  } = params;

  // ─── STEP 1: Check cache first ───────────────────
  const cacheKey = buildCacheKey(topicId, difficulty, studentId);
  const cached = await checkCache(cacheKey);

  if (cached) {
    return {
      success: true,
      question: cached,
      fromCache: true,
      tokensUsed: 0,
      estimatedCost: 0,
      contextChunksUsed: 0,
      pineconeIds: [],
    };
  }

  // ─── STEP 2: Search Pinecone / DB for verified content ─
  const { contextText, chunksFound, chunkIds } = await searchCUETContent({
    topicName,
    subjectName,
    chapterName,
    topicId,
    topResults: 5,
  });

  // ─── STEP 3: Check if we have enough context ──────
  if (chunksFound === 0 || contextText.length < 100) {
    return {
      success: false,
      error: 'NOT_ENOUGH_CONTENT',
      fromCache: false,
      tokensUsed: 0,
      estimatedCost: 0,
      contextChunksUsed: 0,
      pineconeIds: [],
    };
  }

  if (!isOpenAIConfigured()) {
    return {
      success: false,
      error: 'AI_API_ERROR: OpenAI API key is not configured',
      fromCache: false,
      tokensUsed: 0,
      estimatedCost: 0,
      contextChunksUsed: chunksFound,
      pineconeIds: chunkIds,
    };
  }

  // ─── STEP 4: Build the generation prompt ──────────
  const userPrompt = buildQuestionGenerationPrompt({
    subject: subjectName,
    chapter: chapterName,
    topic: topicName,
    difficulty,
    studentAccuracy,
    questionsSeenBefore,
    retrievedContext: contextText,
  });

  // ─── STEP 5: Call GPT-4o-mini ─────────────────────
  const openai = getOpenAIClient();

  let rawResponse = '';
  let tokensUsed = 0;

  try {
    const completion = await openai.chat.completions.create({
      model: AI_MODELS.QUESTION_GENERATION,
      messages: [
        {
          role: 'system',
          content: QUESTION_GENERATOR_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 600,
      response_format: { type: 'json_object' },
    });

    rawResponse = completion.choices[0]?.message?.content || '';
    tokensUsed = completion.usage?.total_tokens || 0;
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown';
    return {
      success: false,
      error: `AI_API_ERROR: ${errMsg}`,
      fromCache: false,
      tokensUsed: 0,
      estimatedCost: 0,
      contextChunksUsed: chunksFound,
      pineconeIds: chunkIds,
    };
  }

  // ─── STEP 6: Parse JSON response (with retry on failure) ───
  let question: GeneratedQuestion | null = null;

  try {
    question = JSON.parse(rawResponse) as GeneratedQuestion;
  } catch {
    // Retry once with lower temperature (0.3)
    try {
      const retryCompletion = await openai.chat.completions.create({
        model: AI_MODELS.QUESTION_GENERATION,
        messages: [
          { role: 'system', content: QUESTION_GENERATOR_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 600,
        response_format: { type: 'json_object' },
      });
      const retryContent = retryCompletion.choices[0]?.message?.content || '';
      tokensUsed += retryCompletion.usage?.total_tokens || 0;
      question = JSON.parse(retryContent) as GeneratedQuestion;
    } catch {
      return {
        success: false,
        error: 'INVALID_JSON_RESPONSE',
        fromCache: false,
        tokensUsed,
        estimatedCost: estimateCost(
          AI_MODELS.QUESTION_GENERATION,
          tokensUsed,
          0
        ),
        contextChunksUsed: chunksFound,
        pineconeIds: chunkIds,
      };
    }
  }

  if (!question) {
    return {
      success: false,
      error: 'INVALID_JSON_RESPONSE',
      fromCache: false,
      tokensUsed,
      estimatedCost: estimateCost(
        AI_MODELS.QUESTION_GENERATION,
        tokensUsed,
        0
      ),
      contextChunksUsed: chunksFound,
      pineconeIds: chunkIds,
    };
  }

  // Ensure difficulty matches requested if missing
  if (!question.difficulty) {
    question.difficulty = difficulty;
  }

  // ─── STEP 7: Validate the question ────────────────
  const validation = validateGeneratedQuestion(question);

  if (!validation.isValid) {
    question.flags = [
      ...(question.flags || []),
      'needs_review',
      ...validation.issues,
    ];
  }

  // ─── STEP 8: Save to cache (if high confidence) ───
  if (question.confidence_score > 0.85 && validation.isValid) {
    await saveToCache(cacheKey, question, 3600 * 6);
  }

  // ─── STEP 9: Calculate cost ───────────────────────
  const cost = estimateCost(
    AI_MODELS.QUESTION_GENERATION,
    tokensUsed * 0.7, // Approx input tokens
    tokensUsed * 0.3 // Approx output tokens
  );

  return {
    success: true,
    question,
    fromCache: false,
    tokensUsed,
    estimatedCost: cost,
    contextChunksUsed: chunksFound,
    pineconeIds: chunkIds,
  };
}

// ─────────────────────────────────────────────────────
// BATCH: Generate multiple questions at once (cheaper per Q)
// ─────────────────────────────────────────────────────
export async function generateQuestionBatch(params: {
  topicId: number;
  topicName: string;
  subjectName: string;
  chapterName: string;
  studentAccuracy: number;
  count: number;
}): Promise<GenerationResult[]> {
  const {
    topicId,
    topicName,
    subjectName,
    chapterName,
    studentAccuracy,
    count,
  } = params;

  // Determine difficulty mix based on student accuracy
  let difficulties: Array<'easy' | 'medium' | 'hard'>;

  if (studentAccuracy < 40) {
    // Critical weakness → mostly easy questions
    difficulties = Array(count).fill('easy');
    if (count > 1) {
      difficulties[count - 1] = 'medium';
    }
  } else if (studentAccuracy < 65) {
    // Average → mix of easy and medium
    const base: Array<'easy' | 'medium' | 'hard'> = [
      'easy',
      'medium',
      'medium',
      'hard',
      'medium',
    ];
    difficulties = base.slice(0, count);
    while (difficulties.length < count) difficulties.push('medium');
  } else {
    // Strong → challenge with harder questions
    const base: Array<'easy' | 'medium' | 'hard'> = [
      'medium',
      'hard',
      'hard',
      'medium',
      'hard',
    ];
    difficulties = base.slice(0, count);
    while (difficulties.length < count) difficulties.push('hard');
  }

  // Get context once (reuse for all questions)
  const { contextText, chunksFound, chunkIds } = await searchCUETContent({
    topicName,
    subjectName,
    chapterName,
    topicId,
    topResults: 8,
  });

  if (chunksFound === 0 || contextText.length < 100) {
    return [
      {
        success: false,
        error: 'NOT_ENOUGH_CONTENT',
        fromCache: false,
        tokensUsed: 0,
        estimatedCost: 0,
        contextChunksUsed: 0,
        pineconeIds: [],
      },
    ];
  }

  if (!isOpenAIConfigured()) {
    return [
      {
        success: false,
        error: 'AI_API_ERROR: OpenAI API key is not configured',
        fromCache: false,
        tokensUsed: 0,
        estimatedCost: 0,
        contextChunksUsed: chunksFound,
        pineconeIds: chunkIds,
      },
    ];
  }

  const userPrompt = buildBatchGenerationPrompt({
    subject: subjectName,
    chapter: chapterName,
    topic: topicName,
    difficulties,
    retrievedContext: contextText,
    studentAccuracy,
  });

  const openai = getOpenAIClient();

  try {
    const completion = await openai.chat.completions.create({
      model: AI_MODELS.QUESTION_GENERATION,
      messages: [
        { role: 'system', content: QUESTION_GENERATOR_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 3000,
      response_format: { type: 'json_object' },
    });

    const rawResponse = completion.choices[0]?.message?.content || '{}';
    const tokensUsed = completion.usage?.total_tokens || 0;
    const cost = estimateCost(
      AI_MODELS.QUESTION_GENERATION,
      tokensUsed * 0.7,
      tokensUsed * 0.3
    );

    let parsed: any;
    try {
      parsed = JSON.parse(rawResponse);
    } catch {
      return [
        {
          success: false,
          error: 'BATCH_PARSE_ERROR',
          fromCache: false,
          tokensUsed,
          estimatedCost: cost,
          contextChunksUsed: chunksFound,
          pineconeIds: chunkIds,
        },
      ];
    }

    const rawQuestions: GeneratedQuestion[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.questions)
      ? parsed.questions
      : [];

    if (rawQuestions.length === 0) {
      return [
        {
          success: false,
          error: 'NO_QUESTIONS_RETURNED',
          fromCache: false,
          tokensUsed,
          estimatedCost: cost,
          contextChunksUsed: chunksFound,
          pineconeIds: chunkIds,
        },
      ];
    }

    const perQTokens = Math.round(tokensUsed / rawQuestions.length);
    const perQCost = cost / rawQuestions.length;

    return rawQuestions.map((q, idx) => {
      if (!q.difficulty) {
        q.difficulty = difficulties[idx] || 'medium';
      }
      const validation = validateGeneratedQuestion(q);
      if (!validation.isValid) {
        q.flags = [...(q.flags || []), 'needs_review', ...validation.issues];
      }

      return {
        success: true,
        question: q,
        fromCache: false,
        tokensUsed: perQTokens,
        estimatedCost: perQCost,
        contextChunksUsed: chunksFound,
        pineconeIds: chunkIds,
      };
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown';
    return [
      {
        success: false,
        error: `AI_API_ERROR: ${errMsg}`,
        fromCache: false,
        tokensUsed: 0,
        estimatedCost: 0,
        contextChunksUsed: chunksFound,
        pineconeIds: chunkIds,
      },
    ];
  }
}
