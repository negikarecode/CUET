/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ZERO-TOKEN PROGRAMMATIC QUESTION RETRIEVER
 * ─────────────────────────────────────────────────────────────────────────────
 * DEPRECATION NOTICE:
 * Runtime LLM question synthesis has been completely DEPRECATED across the system.
 * This module programmatically retrieves curated, verified questions from
 * the question bank (public.questions / SEED_QUESTIONS) with 0 token consumption.
 * No LLM API calls are ever made to generate question stems, options, or values.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SEED_QUESTIONS } from './data-store';
import { GeneratedQuestion } from './question-validator';

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

/**
 * @deprecated Runtime LLM question generation deprecated. Retrieves curated question from bank with 0 tokens.
 */
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
    chapterName,
    difficulty,
    questionsSeenBefore = [],
  } = params;

  // Filter bank questions by topic_id
  let pool = SEED_QUESTIONS.filter((q) => q.topic_id === topicId);
  if (pool.length === 0) {
    pool = SEED_QUESTIONS;
  }

  // Filter out questions the student has already seen
  let unseen = pool.filter((q) => !questionsSeenBefore.includes(q.question_text));
  if (unseen.length === 0) {
    unseen = pool;
  }

  // Filter by requested difficulty if available
  const matchingDiff = unseen.filter((q) => q.difficulty === difficulty);
  const selected = matchingDiff.length > 0
    ? matchingDiff[Math.floor(Math.random() * matchingDiff.length)]
    : unseen[Math.floor(Math.random() * unseen.length)];

  const curated: GeneratedQuestion = {
    question: selected.question_text,
    option_a: selected.option_a,
    option_b: selected.option_b,
    option_c: selected.option_c,
    option_d: selected.option_d,
    correct_option: selected.correct_option as 'A' | 'B' | 'C' | 'D',
    explanation: selected.explanation,
    difficulty: selected.difficulty,
    topic_tested: topicName,
    confidence_score: 1.0,
    context_quality: 'high',
    flags: [],
  };

  return {
    success: true,
    question: curated,
    fromCache: false,
    tokensUsed: 0,
    estimatedCost: 0,
    contextChunksUsed: 1,
    pineconeIds: [],
  };
}

/**
 * @deprecated Runtime LLM question generation deprecated. Retrieves batch of curated questions from bank with 0 tokens.
 */
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
    count,
  } = params;

  let pool = SEED_QUESTIONS.filter((q) => q.topic_id === topicId);
  if (pool.length === 0) {
    pool = SEED_QUESTIONS;
  }

  // Shuffle and slice count
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const selectedList = shuffled.slice(0, Math.min(count, shuffled.length));

  return selectedList.map((selected) => ({
    success: true,
    question: {
      question: selected.question_text,
      option_a: selected.option_a,
      option_b: selected.option_b,
      option_c: selected.option_c,
      option_d: selected.option_d,
      correct_option: selected.correct_option as 'A' | 'B' | 'C' | 'D',
      explanation: selected.explanation,
      difficulty: selected.difficulty,
      topic_tested: topicName,
      confidence_score: 1.0,
      context_quality: 'high',
      flags: [],
    },
    fromCache: false,
    tokensUsed: 0,
    estimatedCost: 0,
    contextChunksUsed: 1,
    pineconeIds: [],
  }));
}
