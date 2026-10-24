import {
  RecordedTestAttempt,
  Question,
} from "@/types";
import {
  NormalizedDifficulty,
  NormalizedMockQuestionTelemetry,
  DifficultyMetric,
  ChapterMetric,
  ChapterDifficultyCell,
  OverallMockStats,
  PostMockDeterministicReport,
} from "@/types/postMockAnalysis";
import { resolveQuestionCorrectOptionId, isQuestionDropped, isQuestionUnresolved } from "@/lib/scoring";

/**
 * Strictly normalizes difficulty without guessing or inventing metadata.
 * If raw is missing/undefined/null, classifies as "unknown" ("Unknown / Not Available").
 */
export function normalizeDifficulty(
  rawDifficulty?: string | number | null
): NormalizedDifficulty {
  if (rawDifficulty === undefined || rawDifficulty === null || rawDifficulty === "") {
    return "unknown";
  }

  if (typeof rawDifficulty === "number") {
    if (rawDifficulty <= 2) return "easy";
    if (rawDifficulty === 3) return "medium";
    if (rawDifficulty >= 4) return "hard";
  }

  const str = String(rawDifficulty).trim().toLowerCase();
  if (str === "easy" || str === "1" || str === "2") return "easy";
  if (str === "medium" || str === "3") return "medium";
  if (str === "hard" || str === "4" || str === "5") return "hard";

  return "unknown";
}

/**
 * Strictly normalizes chapter name without guessing or inventing.
 * If missing, classifies as "Unknown / Not Available".
 */
export function normalizeChapter(chapter?: string | null): string {
  if (!chapter || !chapter.trim() || chapter.trim().toLowerCase() === "domain core") {
    return "Unknown / Not Available";
  }
  return chapter.trim();
}

/**
 * Normalizes question attempts from either a RecordedTestAttempt or Question array + answers map.
 */
export function normalizeQuestionTelemetry(
  attempt: RecordedTestAttempt,
  fallbackQuestions?: Question[]
): NormalizedMockQuestionTelemetry[] {
  const fallbackMap = new Map<string, Question>();
  if (fallbackQuestions) {
    fallbackQuestions.forEach((q) => {
      fallbackMap.set(q.id, q);
      if (q.questionId) fallbackMap.set(q.questionId, q);
    });
  }

  const attemptMap = new Map<string, any>();
  if (Array.isArray((attempt as any)?.questionAttempts)) {
    (attempt as any).questionAttempts.forEach((qa: any) => {
      if (qa.questionId) attemptMap.set(qa.questionId, qa);
      if (qa.id) attemptMap.set(qa.id, qa);
    });
  }

  return (attempt.questions || []).map((q, idx) => {
    const qKey = q.questionId || (q as any).id || String(q.questionNumber);
    const fallbackQ =
      fallbackMap.get(qKey) ||
      (q.questionId ? fallbackMap.get(q.questionId) : undefined) ||
      ((q as any).id ? fallbackMap.get((q as any).id) : undefined) ||
      fallbackMap.get(String(q.questionNumber));

    const matchedQA = attemptMap.get(qKey) || attemptMap.get(q.questionId) || attemptMap.get((q as any).id);
    const selectedOption = q.selectedOption ?? matchedQA?.selectedOption ?? null;
    const isAttempted = selectedOption !== null && selectedOption !== undefined;
    const isSkipped = !isAttempted;

    // Use actual question's raw difficulty if stored, or fallback question's difficulty
    const rawDiff =
      q.difficulty ??
      fallbackQ?.difficulty ??
      (fallbackQ as any)?.difficultyLevel ??
      undefined;

    const normalizedDiff = normalizeDifficulty(rawDiff);

    // Chapter metadata
    const rawChapter = q.chapter || fallbackQ?.chapter;
    const normalizedChap = normalizeChapter(rawChapter);

    const prompt = q.prompt || fallbackQ?.prompt || `Question ${q.questionNumber || idx + 1}`;
    const options = q.options || fallbackQ?.options || [];
    const explanation = q.explanation || fallbackQ?.explanation || "";
    const ncertReference = q.ncertReference || fallbackQ?.pyqSource || "";
    const microTopic = q.microTopic || fallbackQ?.topic || "Core Concept";

    const isDrop = isQuestionDropped(q) || isQuestionDropped(fallbackQ);
    const isUnres = isQuestionUnresolved(q) || isQuestionUnresolved(fallbackQ);

    const rawCorrectOption =
      isUnres
        ? null
        : resolveQuestionCorrectOptionId(q) ||
          resolveQuestionCorrectOptionId(fallbackQ) ||
          (q.correctOption && q.correctOption.trim() && q.correctOption.trim().toUpperCase() !== "UNRESOLVED"
            ? q.correctOption.trim().toUpperCase()
            : null);

    const trueCorrectOption = isDrop ? "DROPPED" : isUnres ? "" : (rawCorrectOption || q.correctOption || fallbackQ?.correctOptionId || "");

    let computedIsCorrect: boolean | null = null;
    if (isAttempted) {
      if (isDrop) {
        computedIsCorrect = true;
      } else if (isUnres) {
        computedIsCorrect = null;
      } else if (q.isCorrect === true || q.isCorrect === false) {
        computedIsCorrect = q.isCorrect;
      } else if (matchedQA?.isCorrect === true || matchedQA?.isCorrect === false) {
        computedIsCorrect = matchedQA.isCorrect;
      } else if (rawCorrectOption && selectedOption) {
        computedIsCorrect = selectedOption.trim().toUpperCase() === rawCorrectOption;
      } else {
        // Missing correctness data is preserved as null (unknown/loading), NOT coerced to false
        computedIsCorrect = null;
      }
    }

    const timeSpent = q.timeSpentSeconds || matchedQA?.timeSpentSeconds || matchedQA?.timeSpent || 0;

    return {
      questionId: q.questionId || (q as any).id || `q_${idx + 1}`,
      conceptId: q.conceptId || fallbackQ?.conceptId,
      questionNumber: q.questionNumber || idx + 1,
      subject: q.subject || attempt.subject || "Domain Examination",
      chapter: normalizedChap,
      microTopic,
      prompt,
      options,
      selectedOption,
      correctOption: (trueCorrectOption || "") as "A" | "B" | "C" | "D",
      isCorrect: computedIsCorrect,
      isAttempted,
      isSkipped,
      timeSpentSeconds: timeSpent,
      isTimeSink: q.isTimeSink ?? (timeSpent > 72),
      difficulty: normalizedDiff,
      rawDifficulty: rawDiff,
      explanation,
      solution: fallbackQ?.solution || q.solution,
      formula: fallbackQ?.formula || q.formula,
      keyConcept: fallbackQ?.keyConcept || q.keyConcept,
      misconception: fallbackQ?.misconception || q.misconception,
      ncertReference,
    };
  });
}

/**
 * Deterministically compiles the complete Post-Mock Report from a single completed attempt.
 * NO AI INVOLVEMENT. 100% verified arithmetic.
 */
export function buildPostMockDeterministicReport(
  attempt: RecordedTestAttempt,
  fallbackQuestions?: Question[]
): PostMockDeterministicReport {
  const telemetry = normalizeQuestionTelemetry(attempt, fallbackQuestions);

  const totalQuestions = telemetry.length;
  let attemptedCount = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;
  let totalTimeSeconds = 0;
  let timeSinkCount = 0;

  telemetry.forEach((q) => {
    totalTimeSeconds += q.timeSpentSeconds;
    if (q.isTimeSink) timeSinkCount += 1;

    if (q.isAttempted) {
      attemptedCount += 1;
      if (q.isCorrect === true) {
        correctCount += 1;
      } else if (q.isCorrect === false) {
        incorrectCount += 1;
      }
    } else {
      skippedCount += 1;
    }
  });

  const scorableAttempted = correctCount + incorrectCount;
  const accuracyPercentage =
    scorableAttempted > 0 ? Math.round((correctCount / scorableAttempted) * 100) : 0;
  const avgTimePerQuestionSeconds =
    totalQuestions > 0 ? Math.round(totalTimeSeconds / totalQuestions) : 0;

  // NTA standard marking scheme: +5 correct, -1 incorrect, 0 skipped
  const totalMarks = correctCount * 5 - incorrectCount;
  const isMathPaper =
    telemetry.length === 85 ||
    (attempt.subject && attempt.subject.toLowerCase().includes("math")) ||
    telemetry.some((q: any) => q.section === "B1" || q.section === "B2");
  const maxAllowedQuestions = isMathPaper ? 40 : totalQuestions;
  const maxMarks = maxAllowedQuestions * 5;

  const overall: OverallMockStats = {
    totalQuestions,
    attemptedCount,
    correctCount,
    incorrectCount,
    skippedCount,
    accuracyPercentage,
    totalMarks,
    maxMarks,
    totalTimeSeconds,
    avgTimePerQuestionSeconds,
    timeSinkCount,
  };

  // 1. Difficulty Breakdown (Only include levels actually present in the mock)
  const diffMap: Record<
    NormalizedDifficulty,
    {
      total: number;
      attempted: number;
      correct: number;
      incorrect: number;
      skipped: number;
    }
  > = {
    easy: { total: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0 },
    medium: { total: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0 },
    hard: { total: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0 },
    unknown: { total: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0 },
  };

  telemetry.forEach((q) => {
    const bucket = diffMap[q.difficulty];
    bucket.total += 1;
    if (q.isAttempted) {
      bucket.attempted += 1;
      if (q.isCorrect === true) bucket.correct += 1;
      else if (q.isCorrect === false) bucket.incorrect += 1;
    } else {
      bucket.skipped += 1;
    }
  });

  const difficultyOrder: NormalizedDifficulty[] = ["easy", "medium", "hard", "unknown"];
  const difficultyLabels: Record<NormalizedDifficulty, string> = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    unknown: "Unknown / Not Available",
  };

  const difficultyBreakdown: DifficultyMetric[] = [];
  difficultyOrder.forEach((diff) => {
    const data = diffMap[diff];
    if (data.total > 0) {
      difficultyBreakdown.push({
        difficulty: diff,
        label: difficultyLabels[diff],
        totalQuestions: data.total,
        attempted: data.attempted,
        correct: data.correct,
        incorrect: data.incorrect,
        skipped: data.skipped,
        accuracy: data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0,
      });
    }
  });

  // 2. Chapter-wise Analysis
  const chapMap = new Map<
    string,
    {
      total: number;
      attempted: number;
      correct: number;
      incorrect: number;
      skipped: number;
      totalTime: number;
      diffs: Set<NormalizedDifficulty>;
    }
  >();

  telemetry.forEach((q) => {
    let chapData = chapMap.get(q.chapter);
    if (!chapData) {
      chapData = {
        total: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        skipped: 0,
        totalTime: 0,
        diffs: new Set<NormalizedDifficulty>(),
      };
      chapMap.set(q.chapter, chapData);
    }

    chapData.total += 1;
    chapData.totalTime += q.timeSpentSeconds;
    chapData.diffs.add(q.difficulty);

    if (q.isAttempted) {
      chapData.attempted += 1;
      if (q.isCorrect === true) chapData.correct += 1;
      else if (q.isCorrect === false) chapData.incorrect += 1;
    } else {
      chapData.skipped += 1;
    }
  });

  const chapterBreakdown: ChapterMetric[] = Array.from(chapMap.entries()).map(
    ([chapter, data]) => ({
      chapter,
      totalQuestions: data.total,
      attempted: data.attempted,
      correct: data.correct,
      incorrect: data.incorrect,
      skipped: data.skipped,
      accuracy: data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0,
      avgTimeSeconds: data.total > 0 ? Math.round(data.totalTime / data.total) : 0,
      difficultiesPresent: Array.from(data.diffs),
    })
  );

  // Sort chapters by question count descending (meaningfulness), then accuracy ascending
  chapterBreakdown.sort((a, b) => {
    if (b.totalQuestions !== a.totalQuestions) {
      return b.totalQuestions - a.totalQuestions;
    }
    return a.accuracy - b.accuracy;
  });

  // 3. Chapter × Difficulty Matrix
  const chapterDifficultyMatrix: Record<
    string,
    Record<NormalizedDifficulty, ChapterDifficultyCell>
  > = {};

  chapterBreakdown.forEach((chap) => {
    chapterDifficultyMatrix[chap.chapter] = {
      easy: {
        chapter: chap.chapter,
        difficulty: "easy",
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        skipped: 0,
        accuracy: null,
      },
      medium: {
        chapter: chap.chapter,
        difficulty: "medium",
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        skipped: 0,
        accuracy: null,
      },
      hard: {
        chapter: chap.chapter,
        difficulty: "hard",
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        skipped: 0,
        accuracy: null,
      },
      unknown: {
        chapter: chap.chapter,
        difficulty: "unknown",
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        skipped: 0,
        accuracy: null,
      },
    };
  });

  telemetry.forEach((q) => {
    const row = chapterDifficultyMatrix[q.chapter];
    if (row && row[q.difficulty]) {
      const cell = row[q.difficulty];
      cell.totalQuestions += 1;
      if (q.isAttempted) {
        cell.attempted += 1;
        if (q.isCorrect === true) cell.correct += 1;
        else if (q.isCorrect === false) cell.incorrect += 1;
      } else {
        cell.skipped += 1;
      }
    }
  });

  // Calculate final accuracy percentages for matrix cells
  Object.values(chapterDifficultyMatrix).forEach((row) => {
    (Object.keys(row) as NormalizedDifficulty[]).forEach((diff) => {
      const cell = row[diff];
      if (cell.attempted > 0) {
        cell.accuracy = Math.round((cell.correct / cell.attempted) * 100);
      } else {
        cell.accuracy = null; // "-" rendered in UI, NOT misleading 0%
      }
    });
  });

  return {
    attemptId: attempt.id,
    testId: attempt.testId,
    testTitle: attempt.testTitle,
    subject: attempt.subject,
    submittedAt: attempt.submittedAt,
    userId: attempt.userId,
    overall,
    difficultyBreakdown,
    chapterBreakdown,
    chapterDifficultyMatrix,
    allQuestions: telemetry,
  };
}
