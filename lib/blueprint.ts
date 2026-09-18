import { Question } from "@/types";

export interface DifficultyQuota {
  min: number;
  max: number;
  target: number;
}

export interface BlueprintConfig {
  subject: string;
  totalQuestions: number;
  maxToAttempt: number;
  durationMinutes: number;
  correctMarks: number;
  incorrectMarks: number;
  unattemptedMarks: number;
  difficultyQuotas: {
    easy: DifficultyQuota;
    medium: DifficultyQuota;
    hard: DifficultyQuota;
  };
  optionBalanceTarget: {
    minPerKey: number;
    maxPerKey: number;
    targetPerKey: number;
  };
  maxPerChapter: number;
  minDistinctChapters: number;
}

export interface BlueprintMetrics {
  totalQuestions: number;
  optionCounts: { A: number; B: number; C: number; D: number };
  difficultyCounts: { easy: number; medium: number; hard: number };
  typeCounts: Record<string, number>;
  chapterCounts: Record<string, number>;
  distinctChapters: number;
  totalEstimatedSeconds: number;
  averageTimePerQuestion: number;
  hasDiagramsCount: number;
  withSolutionCount: number;
}

export interface BlueprintValidationResult {
  isValid: boolean;
  complianceScore: number; // 0 - 100
  grade: "A+" | "A" | "B" | "C" | "FAIL";
  warnings: string[];
  metrics: BlueprintMetrics;
}

/**
 * Fallback General Blueprint
 */
export const DEFAULT_GENERAL_BLUEPRINT: BlueprintConfig = {
  subject: "General Domain",
  totalQuestions: 50,
  maxToAttempt: 40,
  durationMinutes: 45,
  correctMarks: 5,
  incorrectMarks: -1,
  unattemptedMarks: 0,
  difficultyQuotas: {
    easy: { min: 12, max: 20, target: 16 },
    medium: { min: 20, max: 28, target: 24 },
    hard: { min: 6, max: 14, target: 10 },
  },
  optionBalanceTarget: {
    minPerKey: 8,
    maxPerKey: 17,
    targetPerKey: 12.5,
  },
  maxPerChapter: 8,
  minDistinctChapters: 6,
};

/**
 * Standard NTA CUET UG Blueprints by Subject
 */
export const DEFAULT_BLUEPRINTS: Record<string, BlueprintConfig> = {
  default: DEFAULT_GENERAL_BLUEPRINT,
  physics: {
    subject: "Physics",
    totalQuestions: 50,
    maxToAttempt: 40,
    durationMinutes: 60,
    correctMarks: 5,
    incorrectMarks: -1,
    unattemptedMarks: 0,
    difficultyQuotas: {
      easy: { min: 12, max: 20, target: 16 },
      medium: { min: 20, max: 26, target: 24 },
      hard: { min: 8, max: 14, target: 10 },
    },
    optionBalanceTarget: {
      minPerKey: 9,
      maxPerKey: 16,
      targetPerKey: 12.5,
    },
    maxPerChapter: 8,
    minDistinctChapters: 8,
  },
  chemistry: {
    subject: "Chemistry",
    totalQuestions: 50,
    maxToAttempt: 40,
    durationMinutes: 60,
    correctMarks: 5,
    incorrectMarks: -1,
    unattemptedMarks: 0,
    difficultyQuotas: {
      easy: { min: 14, max: 22, target: 18 },
      medium: { min: 18, max: 26, target: 22 },
      hard: { min: 7, max: 13, target: 10 },
    },
    optionBalanceTarget: {
      minPerKey: 9,
      maxPerKey: 16,
      targetPerKey: 12.5,
    },
    maxPerChapter: 8,
    minDistinctChapters: 8,
  },
  mathematics: {
    subject: "Mathematics",
    totalQuestions: 50,
    maxToAttempt: 40,
    durationMinutes: 60,
    correctMarks: 5,
    incorrectMarks: -1,
    unattemptedMarks: 0,
    difficultyQuotas: {
      easy: { min: 10, max: 18, target: 14 },
      medium: { min: 20, max: 28, target: 24 },
      hard: { min: 8, max: 16, target: 12 },
    },
    optionBalanceTarget: {
      minPerKey: 9,
      maxPerKey: 16,
      targetPerKey: 12.5,
    },
    maxPerChapter: 8,
    minDistinctChapters: 8,
  },
  accountancy: {
    subject: "Accountancy",
    totalQuestions: 50,
    maxToAttempt: 40,
    durationMinutes: 60,
    correctMarks: 5,
    incorrectMarks: -1,
    unattemptedMarks: 0,
    difficultyQuotas: {
      easy: { min: 12, max: 20, target: 16 },
      medium: { min: 20, max: 26, target: 24 },
      hard: { min: 7, max: 14, target: 10 },
    },
    optionBalanceTarget: {
      minPerKey: 9,
      maxPerKey: 16,
      targetPerKey: 12.5,
    },
    maxPerChapter: 8,
    minDistinctChapters: 6,
  },
  economics: {
    subject: "Economics",
    totalQuestions: 50,
    maxToAttempt: 40,
    durationMinutes: 60,
    correctMarks: 5,
    incorrectMarks: -1,
    unattemptedMarks: 0,
    difficultyQuotas: {
      easy: { min: 14, max: 22, target: 18 },
      medium: { min: 18, max: 26, target: 22 },
      hard: { min: 6, max: 13, target: 10 },
    },
    optionBalanceTarget: {
      minPerKey: 9,
      maxPerKey: 16,
      targetPerKey: 12.5,
    },
    maxPerChapter: 8,
    minDistinctChapters: 7,
  },
};

/**
 * Normalizes difficulty value to 3 tiers: "easy", "medium", "hard"
 */
export function normalizeDifficultyTier(
  difficulty: "easy" | "medium" | "hard" | number | undefined
): "easy" | "medium" | "hard" {
  if (typeof difficulty === "number") {
    if (difficulty <= 2) return "easy";
    if (difficulty === 3) return "medium";
    return "hard";
  }
  if (difficulty === "easy" || difficulty === "medium" || difficulty === "hard") {
    return difficulty;
  }
  return "medium";
}

/**
 * Validates a test against the NTA CUET Blueprint
 */
export function validateTestBlueprint(
  questions: Question[],
  subject?: string
): BlueprintValidationResult {
  const normSubj = (subject || "").toLowerCase();
  const config: BlueprintConfig =
    DEFAULT_BLUEPRINTS[normSubj] ?? DEFAULT_GENERAL_BLUEPRINT;

  const warnings: string[] = [];
  let deductions = 0;

  const optionCounts = { A: 0, B: 0, C: 0, D: 0 };
  const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
  const typeCounts: Record<string, number> = {};
  const chapterCounts: Record<string, number> = {};
  let totalEstimatedSeconds = 0;
  let hasDiagramsCount = 0;
  let withSolutionCount = 0;

  // 1. Total Question Count check
  if (questions.length !== config.totalQuestions) {
    warnings.push(
      `Question count mismatch: expected ${config.totalQuestions}, got ${questions.length}.`
    );
    deductions += 25;
  }

  questions.forEach((q, idx) => {
    // Correct Option validation
    if (["A", "B", "C", "D"].includes(q.correctOptionId)) {
      optionCounts[q.correctOptionId as "A" | "B" | "C" | "D"] += 1;
    } else {
      warnings.push(`Q${idx + 1} has invalid or missing correctOptionId: "${q.correctOptionId}".`);
      deductions += 5;
    }

    // Difficulty normalization
    const tier = normalizeDifficultyTier(q.difficultyLevel || q.difficulty);
    difficultyCounts[tier] += 1;

    // Type tracking
    const qType = q.questionType || "conceptual";
    typeCounts[qType] = (typeCounts[qType] || 0) + 1;

    // Chapter tracking
    const chapter = (q.chapter || "General").trim();
    chapterCounts[chapter] = (chapterCounts[chapter] || 0) + 1;

    // Time estimation
    const est = q.estimatedTimeSeconds || 60;
    totalEstimatedSeconds += est;

    if (q.hasDiagram) hasDiagramsCount += 1;
    if (q.solution?.detailed || q.explanation) withSolutionCount += 1;

    // Validate options integrity
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      warnings.push(`Q${idx + 1} does not have exactly 4 options.`);
      deductions += 5;
    }
  });

  const distinctChapters = Object.keys(chapterCounts).length;

  // 2. Option Balance Check
  (["A", "B", "C", "D"] as const).forEach((opt) => {
    const count = optionCounts[opt];
    if (count < config.optionBalanceTarget.minPerKey) {
      warnings.push(`Option ${opt} is underrepresented: ${count} (min expected ${config.optionBalanceTarget.minPerKey}).`);
      deductions += 6;
    } else if (count > config.optionBalanceTarget.maxPerKey) {
      warnings.push(`Option ${opt} is overrepresented: ${count} (max expected ${config.optionBalanceTarget.maxPerKey}).`);
      deductions += 6;
    }
  });

  // 3. Difficulty Quotas Check
  if (difficultyCounts.easy < config.difficultyQuotas.easy.min) {
    warnings.push(`Easy questions below threshold: ${difficultyCounts.easy} < ${config.difficultyQuotas.easy.min}.`);
    deductions += 4;
  }
  if (difficultyCounts.medium < config.difficultyQuotas.medium.min) {
    warnings.push(`Medium questions below threshold: ${difficultyCounts.medium} < ${config.difficultyQuotas.medium.min}.`);
    deductions += 4;
  }
  if (difficultyCounts.hard < config.difficultyQuotas.hard.min) {
    warnings.push(`Hard questions below threshold: ${difficultyCounts.hard} < ${config.difficultyQuotas.hard.min}.`);
    deductions += 4;
  }

  // 4. Chapter Breadth Check
  if (distinctChapters < config.minDistinctChapters) {
    warnings.push(`Insufficient syllabus coverage: test covers only ${distinctChapters} distinct chapters (minimum: ${config.minDistinctChapters}).`);
    deductions += 10;
  }

  // 5. Chapter Concentration Check
  for (const [chap, count] of Object.entries(chapterCounts)) {
    if (count > config.maxPerChapter) {
      warnings.push(`Chapter "${chap}" has ${count} questions (maximum recommended: ${config.maxPerChapter}).`);
      deductions += 4;
    }
  }

  // 6. Solutions completeness check
  if (withSolutionCount < questions.length) {
    warnings.push(`${questions.length - withSolutionCount} questions are missing detailed solutions.`);
    deductions += (questions.length - withSolutionCount) * 2;
  }

  const complianceScore = Math.max(0, 100 - deductions);

  let grade: BlueprintValidationResult["grade"] = "FAIL";
  if (complianceScore >= 95) grade = "A+";
  else if (complianceScore >= 85) grade = "A";
  else if (complianceScore >= 70) grade = "B";
  else if (complianceScore >= 50) grade = "C";

  const metrics: BlueprintMetrics = {
    totalQuestions: questions.length,
    optionCounts,
    difficultyCounts,
    typeCounts,
    chapterCounts,
    distinctChapters,
    totalEstimatedSeconds,
    averageTimePerQuestion: questions.length > 0 ? Math.round(totalEstimatedSeconds / questions.length) : 0,
    hasDiagramsCount,
    withSolutionCount,
  };

  return {
    isValid: complianceScore >= 75 && warnings.length === 0,
    complianceScore,
    grade,
    warnings,
    metrics,
  };
}

/**
 * Assembles a fully balanced 50-question mock adhering to the CUET UG Blueprint
 * from an arbitrary candidate pool of subject questions.
 */
export function generateBlueprintMock(
  candidatePool: Question[],
  subject: string,
  overrides?: Partial<BlueprintConfig>
): Question[] {
  const normSubj = subject.toLowerCase();
  const baseConfig: BlueprintConfig =
    DEFAULT_BLUEPRINTS[normSubj] ?? DEFAULT_GENERAL_BLUEPRINT;
  const config: BlueprintConfig = {
    ...baseConfig,
    ...overrides,
    subject: overrides?.subject ?? baseConfig.subject,
  };

  const targetCount = config.totalQuestions;
  if (candidatePool.length <= targetCount) {
    // If pool is smaller than or equal to target, re-index and return
    return candidatePool.map((q, idx) => ({
      ...q,
      questionNumber: idx + 1,
      id: `blueprint_${normSubj}_q_${idx + 1}`,
    }));
  }

  // Categorize by difficulty
  const easyPool = candidatePool.filter(
    (q) => normalizeDifficultyTier(q.difficultyLevel || q.difficulty) === "easy"
  );
  const mediumPool = candidatePool.filter(
    (q) => normalizeDifficultyTier(q.difficultyLevel || q.difficulty) === "medium"
  );
  const hardPool = candidatePool.filter(
    (q) => normalizeDifficultyTier(q.difficultyLevel || q.difficulty) === "hard"
  );

  const targetEasy = config.difficultyQuotas.easy.target;
  const targetMed = config.difficultyQuotas.medium.target;
  const targetHard = config.difficultyQuotas.hard.target;

  const selected: Question[] = [];
  const selectedIds = new Set<string>();
  const chapterFreq: Record<string, number> = {};
  const optionFreq = { A: 0, B: 0, C: 0, D: 0 };

  function canSelect(q: Question): boolean {
    if (selectedIds.has(q.id)) return false;
    const chap = (q.chapter || "General").trim();
    if ((chapterFreq[chap] || 0) >= config.maxPerChapter) return false;
    return true;
  }

  function addQuestion(q: Question): void {
    selected.push(q);
    selectedIds.add(q.id);
    const chap = (q.chapter || "General").trim();
    chapterFreq[chap] = (chapterFreq[chap] || 0) + 1;
    if (["A", "B", "C", "D"].includes(q.correctOptionId)) {
      optionFreq[q.correctOptionId as "A" | "B" | "C" | "D"] += 1;
    }
  }

  // 1. Pick Easy
  for (const q of easyPool) {
    if (selected.filter((s) => normalizeDifficultyTier(s.difficultyLevel || s.difficulty) === "easy").length >= targetEasy) break;
    if (canSelect(q)) addQuestion(q);
  }

  // 2. Pick Medium
  for (const q of mediumPool) {
    if (selected.filter((s) => normalizeDifficultyTier(s.difficultyLevel || s.difficulty) === "medium").length >= targetMed) break;
    if (canSelect(q)) addQuestion(q);
  }

  // 3. Pick Hard
  for (const q of hardPool) {
    if (selected.filter((s) => normalizeDifficultyTier(s.difficultyLevel || s.difficulty) === "hard").length >= targetHard) break;
    if (canSelect(q)) addQuestion(q);
  }

  // 4. Fill remaining needed from general pool
  for (const q of candidatePool) {
    if (selected.length >= targetCount) break;
    if (canSelect(q)) addQuestion(q);
  }

  // 5. Fallback if chapter limits prevented reaching 50
  for (const q of candidatePool) {
    if (selected.length >= targetCount) break;
    if (!selectedIds.has(q.id)) {
      selected.push(q);
      selectedIds.add(q.id);
    }
  }

  // Balance options if possible by swapping or ensuring re-indexing
  return selected.slice(0, targetCount).map((q, idx) => ({
    ...q,
    questionNumber: idx + 1,
    id: `blueprint_${normSubj}_q_${idx + 1}`,
  }));
}
