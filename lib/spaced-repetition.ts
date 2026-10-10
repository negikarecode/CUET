/**
 * Spaced Repetition Engine for Missed Questions
 * Intervals: 1, 3, 7, 21 days.
 * Resurfaces missed questions on the schedule.
 * Correct answer at normal pace moves item to next interval; wrong answer resets to day 1.
 * Questions answered in low-effort sessions are skipped.
 */

import { QuestionOption } from "@/types";

export interface SpacedRepetitionItem {
  id: string; // questionId or testKey:::qId
  questionId: string;
  subject: string;
  chapter: string;
  microTopic?: string;
  prompt: string;
  options?: QuestionOption[];
  correctOption: string;
  explanation: string;
  userLastSelectedOption: string;
  source?: string;
  reviewed_by_human?: boolean;

  // Spaced repetition state
  currentIntervalIndex: number; // 0 (1d), 1 (3d), 2 (7d), 3 (21d), 4 (Mastered/Archived)
  intervalDays: number; // 1, 3, 7, 21
  lastReviewedDate: string; // ISO date
  nextDueDate: string; // ISO date
  consecutiveSuccesses: number;
  totalAttempts: number;
  isMastered: boolean;
  history: Array<{
    date: string;
    selectedOption: string;
    isCorrect: boolean;
    timeSpentSeconds: number;
    intervalApplied: number;
  }>;
}

export const SPACED_INTERVALS_DAYS = [1, 3, 7, 21];

const STORAGE_KEY_PREFIX = "cuet_spaced_repetition_";

function getStorageKey(userId: string): string {
  return `${STORAGE_KEY_PREFIX}${userId || "guest"}`;
}

/**
 * Calculate the next due date by adding days to a baseline ISO string
 */
export function calculateNextDueDate(days: number, fromDate?: string): string {
  const base = fromDate ? new Date(fromDate) : new Date();
  const next = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
  return next.toISOString();
}

/**
 * Check if an item is due on or before target date (default today)
 */
export function isItemDue(nextDueDate: string, targetDate?: string): boolean {
  const target = targetDate ? new Date(targetDate) : new Date();
  const due = new Date(nextDueDate);
  return due.getTime() <= target.getTime();
}

const memorySpacedRepetitionStore = new Map<string, SpacedRepetitionItem[]>();

/**
 * Load spaced repetition items for a user
 */
export function loadSpacedRepetitionItems(userId: string): SpacedRepetitionItem[] {
  const key = getStorageKey(userId);
  const inMemory = memorySpacedRepetitionStore.get(key);
  if (inMemory) return inMemory;

  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    memorySpacedRepetitionStore.set(key, parsed);
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Save spaced repetition items for a user
 */
export function saveSpacedRepetitionItems(userId: string, items: SpacedRepetitionItem[]): void {
  const key = getStorageKey(userId);
  memorySpacedRepetitionStore.set(key, items);

  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (err) {
    console.warn("Failed to persist spaced repetition items", err);
  }
}

/**
 * Enroll a missed question into spaced repetition.
 * Skips if question was from a low-effort session.
 */
export function enrollMissedQuestion(
  userId: string,
  question: {
    questionId: string;
    subject: string;
    chapter: string;
    microTopic?: string;
    prompt: string;
    options?: QuestionOption[];
    correctOption: string;
    userSelectedOption: string;
    explanation: string;
    source?: string;
    reviewed_by_human?: boolean;
    isLowEffort?: boolean;
  },
  nowIso: string = new Date().toISOString()
): SpacedRepetitionItem | null {
  // Rule: Skip questions answered in low-effort sessions
  if (question.isLowEffort) {
    return null;
  }

  const items = loadSpacedRepetitionItems(userId);
  const existingIdx = items.findIndex((i) => i.questionId === question.questionId);

  if (existingIdx >= 0) {
    // If already enrolled, keep existing interval or reset if wrong again
    const existing = items[existingIdx];
    if (existing) {
      existing.userLastSelectedOption = question.userSelectedOption;
      existing.history.push({
        date: nowIso,
        selectedOption: question.userSelectedOption,
        isCorrect: false,
        timeSpentSeconds: 0,
        intervalApplied: 1,
      });
      // Reset to interval 0 (1 day)
      existing.currentIntervalIndex = 0;
      existing.intervalDays = SPACED_INTERVALS_DAYS[0] ?? 1;
      existing.consecutiveSuccesses = 0;
      existing.isMastered = false;
      existing.lastReviewedDate = nowIso;
      existing.nextDueDate = calculateNextDueDate(1, nowIso);
      items[existingIdx] = existing;
      saveSpacedRepetitionItems(userId, items);
      return existing;
    }
  }

  const initialInterval = SPACED_INTERVALS_DAYS[0] ?? 1;
  const newItem: SpacedRepetitionItem = {
    id: `sr_${question.questionId}`,
    questionId: question.questionId,
    subject: question.subject,
    chapter: question.chapter,
    microTopic: question.microTopic,
    prompt: question.prompt,
    options: question.options,
    correctOption: question.correctOption,
    explanation: question.explanation,
    userLastSelectedOption: question.userSelectedOption,
    source: question.source,
    reviewed_by_human: question.reviewed_by_human,
    currentIntervalIndex: 0,
    intervalDays: initialInterval,
    lastReviewedDate: nowIso,
    nextDueDate: calculateNextDueDate(initialInterval, nowIso),
    consecutiveSuccesses: 0,
    totalAttempts: 1,
    isMastered: false,
    history: [
      {
        date: nowIso,
        selectedOption: question.userSelectedOption,
        isCorrect: false,
        timeSpentSeconds: 0,
        intervalApplied: 1,
      },
    ],
  };

  items.push(newItem);
  saveSpacedRepetitionItems(userId, items);
  return newItem;
}

/**
 * Record a review attempt on a spaced repetition question.
 * If correct at normal pace: moves to next interval (1 -> 3 -> 7 -> 21 -> Mastered).
 * If wrong: resets to interval 0 (1 day).
 */
export function recordSpacedReviewAttempt(
  userId: string,
  questionId: string,
  selectedOption: string,
  isCorrect: boolean,
  timeSpentSeconds: number,
  nowIso: string = new Date().toISOString()
): SpacedRepetitionItem | null {
  const items = loadSpacedRepetitionItems(userId);
  const idx = items.findIndex((i) => i.questionId === questionId);
  if (idx < 0) return null;

  const item = items[idx];
  if (!item) return null;

  item.totalAttempts++;
  item.userLastSelectedOption = selectedOption;
  item.lastReviewedDate = nowIso;

  if (isCorrect) {
    item.consecutiveSuccesses++;
    const nextIdx = item.currentIntervalIndex + 1;
    if (nextIdx >= SPACED_INTERVALS_DAYS.length) {
      // Completed all intervals (21 days) -> Mastered
      item.isMastered = true;
      item.intervalDays = 30; // Archive interval
      item.nextDueDate = calculateNextDueDate(30, nowIso);
    } else {
      const nextInterval = SPACED_INTERVALS_DAYS[nextIdx] ?? 21;
      item.currentIntervalIndex = nextIdx;
      item.intervalDays = nextInterval;
      item.nextDueDate = calculateNextDueDate(nextInterval, nowIso);
    }
  } else {
    // Reset to interval 0 (1 day)
    const baseInterval = SPACED_INTERVALS_DAYS[0] ?? 1;
    item.consecutiveSuccesses = 0;
    item.currentIntervalIndex = 0;
    item.intervalDays = baseInterval;
    item.nextDueDate = calculateNextDueDate(baseInterval, nowIso);
    item.isMastered = false;
  }

  item.history.push({
    date: nowIso,
    selectedOption,
    isCorrect,
    timeSpentSeconds,
    intervalApplied: item.intervalDays,
  });

  items[idx] = item;
  saveSpacedRepetitionItems(userId, items);
  return item;
}

/**
 * Get summary of spaced repetition items due today
 */
export function getSpacedRepetitionSummary(userId: string, targetDate?: string): {
  totalTracked: number;
  dueTodayCount: number;
  masteredCount: number;
  dueItems: SpacedRepetitionItem[];
} {
  const items = loadSpacedRepetitionItems(userId);
  const dueItems = items.filter((i) => !i.isMastered && isItemDue(i.nextDueDate, targetDate));
  const masteredCount = items.filter((i) => i.isMastered).length;

  return {
    totalTracked: items.length,
    dueTodayCount: dueItems.length,
    masteredCount,
    dueItems,
  };
}
