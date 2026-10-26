/**
 * AI Coach Topic Practice Engine
 * - Generates 10-question topic practice quizzes prioritising:
 *   1. Questions the student got wrong before
 *   2. Unseen questions
 *   3. Remaining topic questions
 * - Tracks immediate before/after accuracy deltas on flagged topics (5+ attempts)
 * - Zero time or pacing calculations
 */

import { Question, FullTestMeta } from "@/types";
export type { TopicPracticeDelta } from "@/types/ai-coach";
import { resolveSubjectDefinition, loadRawMockData, RawQuestion } from "@/lib/data/mock50Questions";
import { loadSpacedRepetitionItems } from "@/lib/spaced-repetition";
export { loadTopicPracticeDeltas, recordTopicPracticeDelta } from "./practice-deltas";

/**
 * Normalizes topic/chapter text for robust fuzzy matching
 */
function normalizeText(text?: string | null): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Checks if question matches the given topic or chapter
 */
function doesQuestionMatchTopic(q: RawQuestion, topicQuery: string): boolean {
  const normQuery = normalizeText(topicQuery);
  if (!normQuery) return false;

  const normTopic = normalizeText(q.topic);
  const normChapter = normalizeText(q.chapter);

  if (normTopic.includes(normQuery) || normQuery.includes(normTopic)) return true;
  if (normChapter.includes(normQuery) || normQuery.includes(normChapter)) return true;

  // Split query into keywords (e.g. "electrostatics" -> "electric", "electro")
  const keywords = normQuery.split(" ").filter((k) => k.length >= 4);
  if (keywords.length > 0) {
    return keywords.some((kw) => normTopic.includes(kw) || normChapter.includes(kw));
  }

  return false;
}

/**
 * Generates a 10-question targeted topic practice quiz:
 * - Prioritises questions previously answered incorrectly by the student
 * - Fills next slots with unseen questions
 * - Returns exactly 10 questions with test metadata
 */
export function generateTopicPracticeQuiz(
  subject: string,
  topic: string,
  userId: string = "guest"
): {
  testMeta: FullTestMeta;
  questions: Question[];
} {
  const subjectDef = resolveSubjectDefinition(subject);
  const resolvedSubjectName = subjectDef?.name || subject || "Physics";
  const folder = subjectDef?.folder || subject.toLowerCase();

  // 1. Load mistake notebook items to identify previously wrong questions
  const missedItems = loadSpacedRepetitionItems(userId);
  const previouslyWrongQIds = new Set<string>();
  missedItems.forEach((item) => {
    if (
      item.subject.toLowerCase() === resolvedSubjectName.toLowerCase() ||
      item.subject.toLowerCase() === folder.toLowerCase()
    ) {
      previouslyWrongQIds.add(item.questionId);
    }
  });

  // 2. Gather matching questions from mock question files
  const matchingPool: RawQuestion[] = [];
  const seenPromptKeys = new Set<string>();

  // Scan across mock papers for matching topic questions
  const maxPapersToScan = 15;
  for (let mockNum = 1; mockNum <= maxPapersToScan; mockNum++) {
    try {
      const rawQs = loadRawMockData(folder, mockNum);
      if (!rawQs || rawQs.length === 0) continue;

      for (const q of rawQs) {
        if (doesQuestionMatchTopic(q, topic)) {
          const key = (q.questionText || "").trim().slice(0, 80).toLowerCase();
          if (!seenPromptKeys.has(key)) {
            seenPromptKeys.add(key);
            matchingPool.push(q);
          }
        }
      }
      if (matchingPool.length >= 40) break;
    } catch {
      break;
    }
  }

  // Fallback: If topic filter was too strict, load from first mock paper
  if (matchingPool.length < 10) {
    try {
      const fallbackQs = loadRawMockData(folder, 1);
      for (const q of fallbackQs) {
        const key = (q.questionText || "").trim().slice(0, 80).toLowerCase();
        if (!seenPromptKeys.has(key)) {
          seenPromptKeys.add(key);
          matchingPool.push(q);
        }
        if (matchingPool.length >= 20) break;
      }
    } catch {}
  }

  // 3. Partition: Previously Wrong vs Unseen vs Other
  const wrongQuestions: RawQuestion[] = [];
  const unseenQuestions: RawQuestion[] = [];
  const otherQuestions: RawQuestion[] = [];

  matchingPool.forEach((q, idx) => {
    const qId = q.questionId || `${folder}_q_${q.questionNumber || idx + 1}`;
    if (previouslyWrongQIds.has(qId)) {
      wrongQuestions.push(q);
    } else {
      unseenQuestions.push(q);
    }
  });

  // 4. Select top 10 prioritizing wrong first, then unseen
  const selectedRaw: RawQuestion[] = [];
  selectedRaw.push(...wrongQuestions.slice(0, 10));

  if (selectedRaw.length < 10) {
    const needed = 10 - selectedRaw.length;
    selectedRaw.push(...unseenQuestions.slice(0, needed));
  }

  if (selectedRaw.length < 10) {
    const needed = 10 - selectedRaw.length;
    selectedRaw.push(...otherQuestions.slice(0, needed));
  }

  // Ensure exactly up to 10 questions
  const finalRaw = selectedRaw.slice(0, 10);

  // 5. Transform into standard CBT Question objects (no time metrics)
  const slugTopic = topic.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 30);
  const testId = `topic_drill_${folder}_${slugTopic}_${Date.now().toString(36)}`;

  const questions: Question[] = finalRaw.map((raw, idx) => {
    const qNumber = idx + 1;
    const qId = raw.questionId || `${testId}_q_${qNumber.toString().padStart(2, "0")}`;
    const options = (raw.options || []).map((opt) => ({
      id: opt.id,
      text: opt.text,
      misconception: opt.misconception,
      studentSelectionTrap: opt.studentSelectionTrap,
      mistakeAnalysis: opt.mistakeAnalysis,
    }));

    return {
      id: qId,
      questionId: qId,
      questionNumber: qNumber,
      conceptId: raw.conceptId || `concept_${slugTopic}_${qNumber}`,
      subjectId: subjectDef?.code || folder || "000",
      chapter: raw.chapter || topic,
      topic: raw.topic || topic,
      prompt: raw.questionText,
      options,
      correctOptionId: raw.correctOption,
      explanation: raw.detailedSolution || raw.solution?.detailed || "Refer to NCERT textbook.",
      solution: raw.solution,
      difficulty: (typeof raw.difficulty === "number" && raw.difficulty >= 1 && raw.difficulty <= 5
        ? (raw.difficulty as 1 | 2 | 3 | 4 | 5)
        : 2) as 1 | 2 | 3 | 4 | 5,
      formula: raw.formula,
      keyConcept: raw.keyConcept,
      pyqSource: raw.pyqSource,
    };
  });

  const testMeta: FullTestMeta = {
    id: testId,
    title: `10-Question Targeted Practice: ${topic}`,
    subject: resolvedSubjectName,
    code: subjectDef?.code || "000",
    totalQuestions: questions.length,
    durationMinutes: 20, // Non-binding reference duration for CBT container
  };

  return { testMeta, questions };
}
