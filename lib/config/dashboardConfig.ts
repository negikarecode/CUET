/**
 * Authoritative Central Dashboard Configuration
 * Single source of truth for:
 * - CUET Exam dates & countdown
 * - Marking scheme & score scales
 * - Calibration & statistical confidence thresholds
 * - Mock test format options
 * - Subject evaluators & domain experts
 * - Standardized Indian date formatting
 */

// -------------------------------------------------------------
// 1. Exam Dates & Countdown
// -------------------------------------------------------------
export const CUET_EXAM_DATE = "2026-05-15"; // Official CUET UG 2026 exam start window
export const CUET_EXAM_NAME = "CUET 2026";

export function getDaysToExam(targetDateStr: string = CUET_EXAM_DATE, fromDate: Date = new Date()): number {
  const target = new Date(targetDateStr);
  const now = new Date(fromDate);
  // Set to start of day in local time for accurate day-count
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

// -------------------------------------------------------------
// 2. Authoritative Marking Scheme & Scoring Engine
// -------------------------------------------------------------
export const MARKING_SCHEME = {
  CORRECT_MARKS: 5,
  INCORRECT_MARKS: -1,
  UNANSWERED_MARKS: 0,
  QUESTIONS_PER_SUBJECT: 50,
  MAX_MARKS_PER_SUBJECT: 250, // 50 * 5 = 250
  MAX_SCORE_PER_SUBJECT: 250, // alias for backwards compatibility
  DEFAULT_SUBJECT_TARGET_SCORE: 235, // High North Campus target: 235 / 250
} as const;

export interface ScoreCalculationResult {
  score: number;
  maxMarks: number;
  accuracyPercentage: number;
  scorePercentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  totalAttempted: number;
}

export function calculateCUETScore(
  correctCount: number,
  totalAttempted: number,
  totalQuestions: number = MARKING_SCHEME.QUESTIONS_PER_SUBJECT
): ScoreCalculationResult {
  const safeCorrect = Math.max(0, correctCount);
  const safeAttempted = Math.max(safeCorrect, totalAttempted);
  const safeIncorrect = safeAttempted - safeCorrect;
  const safeUnanswered = Math.max(0, totalQuestions - safeAttempted);

  const score = safeCorrect * MARKING_SCHEME.CORRECT_MARKS + safeIncorrect * MARKING_SCHEME.INCORRECT_MARKS;
  const maxMarks = totalQuestions * MARKING_SCHEME.CORRECT_MARKS;
  const accuracyPercentage = safeAttempted > 0 ? Math.round((safeCorrect / safeAttempted) * 100) : 0;
  const scorePercentage = Math.max(0, Math.round((score / maxMarks) * 100));

  return {
    score,
    maxMarks,
    accuracyPercentage,
    scorePercentage,
    correctCount: safeCorrect,
    incorrectCount: safeIncorrect,
    unansweredCount: safeUnanswered,
    totalAttempted: safeAttempted,
  };
}

export function calculateCUETScoreFromAnswers(
  correctCount: number,
  incorrectCount: number,
  totalQuestions: number = MARKING_SCHEME.QUESTIONS_PER_SUBJECT
): ScoreCalculationResult {
  return calculateCUETScore(correctCount, correctCount + incorrectCount, totalQuestions);
}

// -------------------------------------------------------------
// 3. Calibration & Confidence Thresholds
// -------------------------------------------------------------
export const CALIBRATION_THRESHOLDS = {
  /** 150 questions per domain/cycle needed for noise-free calibration */
  SUBJECT_CALIBRATION_QUESTIONS: 150,
  SUBJECT_CALIBRATION_GATE: 150,
  /** Topics with fewer than 5 attempts have insufficient data */
  TOPIC_INSUFFICIENT_DATA_THRESHOLD: 5,
  /** Topics with 5-9 attempts are early signal, low confidence */
  TOPIC_EARLY_SIGNAL: 10,
  TOPIC_EARLY_SIGNAL_THRESHOLD: 10,
  /** Topics with 10-19 attempts are emerging patterns */
  TOPIC_EMERGING_PATTERN: 20,
  TOPIC_EMERGING_THRESHOLD: 20,
  /** Topics need at least 20 attempts before being labelled Established */
  TOPIC_ESTABLISHED_MIN_ATTEMPTS: 20,
  /** Recovery Rule: >=80% accuracy over 10+ attempts at normal pacing */
  RECOVERY_MIN_ATTEMPTS: 10,
  RECOVERY_MIN_ACCURACY: 80,
  RECOVERY_MAX_AVG_TIME: 75,
  RECOVERY_NORMAL_PACE_MIN_SECONDS: 20,
} as const;

// -------------------------------------------------------------
// 3b. Session Validity & Effort Gate Thresholds (Phase 1)
// -------------------------------------------------------------
export const SESSION_VALIDITY_THRESHOLDS = {
  /** Minimum median seconds per question required for a valid session (start with 8s) */
  MIN_VALID_MEDIAN_TIME_SECONDS: 8,
  /** Threshold below which pacing is considered rushed */
  RUSHED_PACING_SECONDS: 15,
  /** Minimum pace expected under normal exam conditions */
  NORMAL_PACING_MIN_SECONDS: 20,
  /** Chance accuracy for standard 4-option multiple-choice question */
  CHANCE_ACCURACY: 0.25,
  /** Sample size for high confidence session */
  SESSION_HIGH_CONFIDENCE_MIN_QUESTIONS: 30,
  /** Sample size for medium confidence session */
  SESSION_MEDIUM_CONFIDENCE_MIN_QUESTIONS: 10,
} as const;

export type SessionConfidenceLevel = "Low" | "Medium" | "High";

export interface SessionQualityEvaluation {
  isLowEffort: boolean;
  status: "valid" | "low_effort";
  confidence: SessionConfidenceLevel;
  sessionConfidence: SessionConfidenceLevel;
  medianTimeSeconds: number;
  accuracyPercentage: number;
  attemptCount: number;
  message: string;
  reason: string;
  remedyAction?: string;
}

/**
 * Evaluates session validity strictly deterministically based on median response time and chance accuracy.
 */
export function evaluateSessionQuality(params: {
  timesSpentSeconds?: number[];
  questionTimesSeconds?: number[];
  correctCount: number;
  totalAttempted?: number;
  totalQuestions?: number;
  optionCount?: number;
  numOptionsPerQuestion?: number;
}): SessionQualityEvaluation {
  const timesSpentSeconds = params.timesSpentSeconds ?? params.questionTimesSeconds ?? [];
  const totalAttempted = params.totalAttempted ?? params.totalQuestions ?? 0;
  const optionCount = params.optionCount ?? params.numOptionsPerQuestion ?? 4;
  const { correctCount } = params;

  if (totalAttempted === 0 || timesSpentSeconds.length === 0) {
    const emptyMsg = "No question attempts recorded in this session.";
    return {
      isLowEffort: true,
      status: "low_effort",
      confidence: "Low",
      sessionConfidence: "Low",
      medianTimeSeconds: 0,
      accuracyPercentage: 0,
      attemptCount: 0,
      message: emptyMsg,
      reason: emptyMsg,
    };
  }

  // Calculate median response time
  const sortedTimes = [...timesSpentSeconds].sort((a, b) => a - b);
  const mid = Math.floor(sortedTimes.length / 2);
  const medianTime = sortedTimes.length % 2 !== 0
    ? sortedTimes[mid]!
    : Math.round((sortedTimes[mid - 1]! + sortedTimes[mid]!) / 2);

  const accuracy = Math.round((correctCount / totalAttempted) * 100);
  const chanceAccuracy = 1 / optionCount; // e.g. 0.25
  const sampleProportion = correctCount / totalAttempted;

  // Statistically indistinguishable from chance check:
  // Using one-tailed binomial standard error: SE = sqrt(p*(1-p)/n)
  const seChance = Math.sqrt((chanceAccuracy * (1 - chanceAccuracy)) / totalAttempted);
  const isIndistinguishableFromChance =
    totalAttempted >= 15 && sampleProportion <= chanceAccuracy + 1.28 * seChance;

  const isRushedBelowMinimum = medianTime < SESSION_VALIDITY_THRESHOLDS.MIN_VALID_MEDIAN_TIME_SECONDS;
  const isLowAccuracyRushed = medianTime < SESSION_VALIDITY_THRESHOLDS.RUSHED_PACING_SECONDS && sampleProportion <= chanceAccuracy;

  const isLowEffort = isRushedBelowMinimum || isLowAccuracyRushed || isIndistinguishableFromChance;

  let confidence: SessionConfidenceLevel = "Low";
  let message = "Session validated under timed practice conditions.";

  if (isLowEffort) {
    confidence = "Low";
    if (isRushedBelowMinimum) {
      message = `Low-effort session, results not reliable. Median answering pace of ${medianTime}s/Q is below the valid minimum (${SESSION_VALIDITY_THRESHOLDS.MIN_VALID_MEDIAN_TIME_SECONDS} seconds).`;
    } else {
      message = `Low-effort session, results not reliable. Accuracy (${accuracy}%) is statistically indistinguishable from random guessing.`;
    }
  } else if (
    totalAttempted >= SESSION_VALIDITY_THRESHOLDS.SESSION_HIGH_CONFIDENCE_MIN_QUESTIONS &&
    medianTime >= SESSION_VALIDITY_THRESHOLDS.NORMAL_PACING_MIN_SECONDS
  ) {
    confidence = "High";
  } else if (
    totalAttempted >= SESSION_VALIDITY_THRESHOLDS.SESSION_MEDIUM_CONFIDENCE_MIN_QUESTIONS &&
    medianTime >= SESSION_VALIDITY_THRESHOLDS.RUSHED_PACING_SECONDS
  ) {
    confidence = "Medium";
  }

  return {
    isLowEffort,
    status: isLowEffort ? "low_effort" : "valid",
    confidence,
    sessionConfidence: confidence,
    medianTimeSeconds: medianTime,
    accuracyPercentage: accuracy,
    attemptCount: totalAttempted,
    message,
    reason: message,
    remedyAction: isLowEffort ? "Retake with normal pacing" : undefined,
  };
}

// -------------------------------------------------------------
// 3c. Canonical Topic State System (Phase 1)
// Exactly one state per topic, derived deterministically
// -------------------------------------------------------------
export type TopicDiagnosticState =
  | "insufficient_data"
  | "early_signal"
  | "emerging_weakness"
  | "established_weakness"
  | "recovering"
  | "recovered"
  | "emerging_strength"
  | "established_strength";

export interface TopicStateInfo {
  state: TopicDiagnosticState;
  color: "slate" | "amber" | "red" | "green";
  badgeLabel: string;
  badgeColorClass: string;
  isWeakness: boolean;
  isStrength: boolean;
  isRecovered: boolean;
  confidenceLevel: ConfidenceLevel;
  explanation: string;
}

export function getTopicDiagnosticState(params: {
  attemptsCount: number;
  accuracyPercentage: number;
  avgTimeSeconds?: number;
  isRecovered?: boolean;
  inRemediation?: boolean;
}): TopicStateInfo {
  const { attemptsCount, accuracyPercentage, isRecovered = false, inRemediation = false } = params;

  // 1. Recovered: meets strict threshold (>=80% over 10+ attempts at normal pace)
  if (isRecovered) {
    return {
      state: "recovered",
      color: "green",
      badgeLabel: "Recovered",
      badgeColorClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      isWeakness: false,
      isStrength: true,
      isRecovered: true,
      confidenceLevel: "high",
      explanation: `Topic mastery recovered (≥80% accuracy over 10+ attempts under exam pacing).`,
    };
  }

  // 2. Insufficient Data: < 5 attempts
  if (attemptsCount < CALIBRATION_THRESHOLDS.TOPIC_INSUFFICIENT_DATA_THRESHOLD) {
    const needed = Math.max(1, CALIBRATION_THRESHOLDS.TOPIC_INSUFFICIENT_DATA_THRESHOLD - attemptsCount);
    return {
      state: "insufficient_data",
      color: "slate",
      badgeLabel: `Limited data (need ${needed} more)`,
      badgeColorClass: "bg-slate-100 text-slate-700 border-slate-200",
      isWeakness: false,
      isStrength: false,
      isRecovered: false,
      confidenceLevel: "low",
      explanation: `Only ${attemptsCount} attempt${attemptsCount === 1 ? "" : "s"}. Need at least 5 attempts before diagnosing patterns.`,
    };
  }

  // 3. Early Signal: 5 to 9 attempts (Never use strong language like "Critical" or "Established")
  if (attemptsCount < CALIBRATION_THRESHOLDS.TOPIC_EARLY_SIGNAL_THRESHOLD) {
    return {
      state: "early_signal",
      color: "amber",
      badgeLabel: "Early signal, low confidence",
      badgeColorClass: "bg-amber-50 text-amber-800 border-amber-200/60",
      isWeakness: accuracyPercentage < 75,
      isStrength: accuracyPercentage >= 75,
      isRecovered: false,
      confidenceLevel: "low",
      explanation: `Early performance signal across ${attemptsCount} attempts. Additional practice required to confirm pattern.`,
    };
  }

  // 4. In active remediation / recovering
  if (inRemediation && accuracyPercentage < CALIBRATION_THRESHOLDS.RECOVERY_MIN_ACCURACY) {
    return {
      state: "recovering",
      color: "amber",
      badgeLabel: "In remediation",
      badgeColorClass: "bg-amber-50 text-amber-800 border-amber-200/60",
      isWeakness: true,
      isStrength: false,
      isRecovered: false,
      confidenceLevel: attemptsCount >= 20 ? "high" : "medium",
      explanation: `Repair plan in progress. Accuracy currently at ${accuracyPercentage}%. Complete retest to verify recovery.`,
    };
  }

  // 5. Emerging (10 to 19 attempts)
  if (attemptsCount < CALIBRATION_THRESHOLDS.TOPIC_ESTABLISHED_MIN_ATTEMPTS) {
    if (accuracyPercentage >= 75) {
      return {
        state: "emerging_strength",
        color: "green",
        badgeLabel: "Emerging strength",
        badgeColorClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        isWeakness: false,
        isStrength: true,
        isRecovered: false,
        confidenceLevel: "medium",
        explanation: `Strong performance (${accuracyPercentage}%) across ${attemptsCount} attempts. Continuing consistency will lock this as an established pillar.`,
      };
    }
    return {
      state: "emerging_weakness",
      color: "amber",
      badgeLabel: "Emerging pattern",
      badgeColorClass: "bg-amber-50 text-amber-800 border-amber-200/60",
      isWeakness: true,
      isStrength: false,
      isRecovered: false,
      confidenceLevel: "medium",
      explanation: `Recurring difficulty pattern observed across ${attemptsCount} attempts with moderate confidence.`,
    };
  }

  // 6. Established (20+ attempts)
  if (accuracyPercentage >= 75) {
    return {
      state: "established_strength",
      color: "green",
      badgeLabel: "Established strength",
      badgeColorClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      isWeakness: false,
      isStrength: true,
      isRecovered: false,
      confidenceLevel: "high",
      explanation: `Consistently verified core strength (${accuracyPercentage}% accuracy over ${attemptsCount} attempts).`,
    };
  }

  // Established Weakness: RED ONLY (Never Green!)
  return {
    state: "established_weakness",
    color: "red",
    badgeLabel: "Established weakness",
    badgeColorClass: "bg-rose-50 text-rose-700 border-rose-200",
    isWeakness: true,
    isStrength: false,
    isRecovered: false,
    confidenceLevel: "high",
    explanation: `Established weakness verified across ${attemptsCount} attempts under timed practice conditions. High confidence.`,
  };
}

export type ConfidenceLevel = "low" | "medium" | "high";

export interface TopicConfidence {
  level: ConfidenceLevel;
  badgeLabel: string;
  badgeColorClass: string;
  isReliable: boolean;
  isLowConfidence: boolean;
  explanation: string;
}

export function getTopicConfidence(attemptsCount: number): TopicConfidence {
  if (attemptsCount < CALIBRATION_THRESHOLDS.TOPIC_EARLY_SIGNAL_THRESHOLD) {
    return {
      level: "low",
      badgeLabel: "Early signal, low confidence",
      badgeColorClass: "bg-slate-100 text-slate-700 border-slate-200",
      isReliable: false,
      isLowConfidence: true,
      explanation: `Based on only ${attemptsCount} attempts. Complete 10+ questions to establish a reliable diagnostic signal.`,
    };
  }
  if (attemptsCount < CALIBRATION_THRESHOLDS.TOPIC_ESTABLISHED_MIN_ATTEMPTS) {
    return {
      level: "medium",
      badgeLabel: "Emerging pattern",
      badgeColorClass: "bg-amber-50 text-amber-800 border-amber-200/60",
      isReliable: true,
      isLowConfidence: false,
      explanation: `Observed across ${attemptsCount} attempts. Pattern is emerging with moderate confidence.`,
    };
  }
  return {
    level: "high",
    badgeLabel: "Established weakness",
    badgeColorClass: "bg-rose-50 text-rose-800 border-rose-200/60",
    isReliable: true,
    isLowConfidence: false,
    explanation: `Observed across ${attemptsCount} attempts. High statistical confidence.`,
  };
}

export interface PercentileConfidence {
  hasEnoughData: boolean;
  displayValue: string;
  subtext: string;
  isCalibrated: boolean;
}

export function getPercentileConfidence(
  totalAttempted: number,
  accuracyPercentage: number
): PercentileConfidence {
  if (totalAttempted < CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_QUESTIONS) {
    return {
      hasEnoughData: false,
      displayValue: "Not enough data yet",
      subtext: `${totalAttempted}/${CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_QUESTIONS} Qs to calibrate`,
      isCalibrated: false,
    };
  }
  const projected = Math.min(99.9, Math.max(50, Math.round(accuracyPercentage * 1.15 * 10) / 10));
  return {
    hasEnoughData: true,
    displayValue: `${projected.toFixed(1)}%ile`,
    subtext: "All-India cohort projection",
    isCalibrated: true,
  };
}

/**
 * Generates human plain-language diagnosis explanation from technical pattern IDs
 */
export function formatPlainLanguageDiagnosis(params: {
  primaryDiagnosis?: string;
  contributingFactor?: string;
  avgTimeSeconds?: number;
  accuracyPercentage?: number;
}): {
  humanSentence: string;
  actionGuidance: string;
} {
  const primary = (params.primaryDiagnosis || '').toLowerCase();
  const contributing = (params.contributingFactor || '').toLowerCase();
  const avgTime = params.avgTimeSeconds || 0;

  if (
    primary.includes('rapid') ||
    primary.includes('pacing') ||
    contributing.includes('high-speed') ||
    (avgTime > 0 && avgTime <= 10)
  ) {
    const timeStr = avgTime > 0 ? `${avgTime}s` : 'about 2s';
    return {
      humanSentence: `You're answering in ${timeStr} per question. Slow down and read all options before choosing.`,
      actionGuidance: 'Pause for 5 seconds before selecting an option on multi-statement questions.',
    };
  }

  if (primary.includes('formula') || contributing.includes('formula')) {
    return {
      humanSentence: 'Formulas are being mixed up under timed pressure.',
      actionGuidance: 'Review flashcards for standard formulas and units before reattempting.',
    };
  }

  if (primary.includes('sign') || contributing.includes('sign') || primary.includes('algebra')) {
    return {
      humanSentence: 'Frequent arithmetic slips and negative sign oversights during calculation steps.',
      actionGuidance: 'Write out intermediate calculation signs rather than doing them mentally.',
    };
  }

  if (primary.includes('concept') || (params.accuracyPercentage !== undefined && params.accuracyPercentage < 40)) {
    return {
      humanSentence: 'Core principles need reinforcement before speed drills.',
      actionGuidance: 'Revisit chapter summary notes and solved examples to rebuild baseline intuition.',
    };
  }

  return {
    humanSentence: 'Inconsistent accuracy under test conditions. Focused practice recommended.',
    actionGuidance: 'Attempt a targeted 6-minute micro drill to stabilize your score.',
  };
}

// -------------------------------------------------------------
// 4. Mock Scheduling Options
// -------------------------------------------------------------
export interface MockFormatOption {
  id: string;
  label: string;
  questions: number;
  durationMinutes: number;
  isDefault?: boolean;
}

export const MOCK_FORMAT_OPTIONS: MockFormatOption[] = [
  {
    id: "subject-50",
    label: "Subject mock (50 Qs, 60 min)",
    questions: 50,
    durationMinutes: 60,
    isDefault: true,
  },
  {
    id: "multi-200",
    label: "Full multi-subject mock (200 Qs, 180 min)",
    questions: 200,
    durationMinutes: 180,
  },
  {
    id: "chapter-20",
    label: "Targeted chapter drill (20 Qs, 25 min)",
    questions: 20,
    durationMinutes: 25,
  },
];

// -------------------------------------------------------------
// 5. Subject Evaluator Registry (Domain-accurate mappings)
// -------------------------------------------------------------
export interface SubjectEvaluator {
  name: string;
  role: string;
  subject: string;
  initials: string;
}

const EVALUATOR_REGISTRY: Record<string, SubjectEvaluator> = {
  physics: {
    name: "Dr. A. Verma",
    role: "Physics Lead",
    subject: "Physics",
    initials: "AV",
  },
  chemistry: {
    name: "Prof. R. Sen",
    role: "Chemistry Specialist",
    subject: "Chemistry",
    initials: "RS",
  },
  mathematics: {
    name: "Dr. P. Iyer",
    role: "Maths Evaluator",
    subject: "Mathematics",
    initials: "PI",
  },
  biology: {
    name: "Dr. M. Banerjee",
    role: "Life Sciences Lead",
    subject: "Biology",
    initials: "MB",
  },
  "environmental-studies": {
    name: "Dr. S. K. Nair",
    role: "Environmental Studies Lead",
    subject: "Environmental Studies",
    initials: "SN",
  },
  english: {
    name: "K. Joshi",
    role: "English Faculty",
    subject: "English",
    initials: "KJ",
  },
  economics: {
    name: "Dr. V. Menon",
    role: "Economics Faculty",
    subject: "Economics",
    initials: "VM",
  },
  accountancy: {
    name: "CA R. Goel",
    role: "Accountancy Specialist",
    subject: "Accountancy",
    initials: "RG",
  },
  "business-studies": {
    name: "Prof. T. Kapoor",
    role: "Business Studies Lead",
    subject: "Business Studies",
    initials: "TK",
  },
  "political-science": {
    name: "Prof. S. Swaminathan",
    role: "Pol Science Lead",
    subject: "Political Science",
    initials: "SS",
  },
  history: {
    name: "Dr. N. Roy",
    role: "History Faculty",
    subject: "History",
    initials: "NR",
  },
  geography: {
    name: "Prof. D. Chawla",
    role: "Geography Specialist",
    subject: "Geography",
    initials: "DC",
  },
  psychology: {
    name: "Dr. A. Mehra",
    role: "Psychology Lead",
    subject: "Psychology",
    initials: "AM",
  },
  sociology: {
    name: "Dr. K. Saxena",
    role: "Sociology Specialist",
    subject: "Sociology",
    initials: "KS",
  },
  "computer-science": {
    name: "Er. N. Bansal",
    role: "Computer Science Lead",
    subject: "Computer Science",
    initials: "NB",
  },
  "physical-education": {
    name: "Coach R. Rana",
    role: "Physical Education Lead",
    subject: "Physical Education",
    initials: "RR",
  },
};

export function getEvaluatorForSubject(subject?: string): SubjectEvaluator {
  if (!subject) {
    return {
      name: "Dr. A. Verma",
      role: "Academic Lead",
      subject: "General",
      initials: "AV",
    };
  }
  const clean = subject.trim().toLowerCase().replace(/[-_]/g, " ");
  for (const [key, evaluator] of Object.entries(EVALUATOR_REGISTRY)) {
    if (clean.includes(key.replace("-", " ")) || key.replace("-", " ").includes(clean)) {
      return evaluator;
    }
  }
  // Generic capitalized domain specialist
  const capitalized = subject.charAt(0).toUpperCase() + subject.slice(1);
  const initials = subject
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
  return {
    name: `Dr. ${capitalized} Panel`,
    role: `${capitalized} Lead`,
    subject: capitalized,
    initials: initials || "CU",
  };
}

// -------------------------------------------------------------
// 6. Standardized Date Formatting (en-IN locale: "10 Nov 2026")
// -------------------------------------------------------------
const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function formatDateIndian(input: string | Date | number): string {
  if (!input) return "";
  let date: Date;
  if (typeof input === "string" && input.length === 10 && input.includes("-")) {
    // Avoid UTC timezone off-by-one with YYYY-MM-DD
    const [year, month, day] = input.split("-").map(Number);
    date = new Date(year!, month! - 1, day!);
  } else {
    date = new Date(input);
  }
  if (isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = MONTH_NAMES_SHORT[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// -------------------------------------------------------------
// 7. Subject Classification, Types & Pacing Config (Phase 1)
// -------------------------------------------------------------
export type SubjectType = "numerical" | "conceptual" | "language";

export interface SubjectMetadataConfig {
  key: string;
  displayName: string;
  subjectType: SubjectType;
  expectedPaceText: string;
  targetPacingSeconds: number;
  ncertTextbookContext: string;
  studyStrategy: string[];
}

export const SUBJECT_METADATA_REGISTRY: Record<string, SubjectMetadataConfig> = {
  physics: {
    key: "physics",
    displayName: "Physics",
    subjectType: "numerical",
    expectedPaceText: "about 50-65s per question",
    targetPacingSeconds: 60,
    ncertTextbookContext: "NCERT Class 12 Physics (Parts 1 & 2)",
    studyStrategy: [
      "Review governing formulas and boundary conditions in NCERT",
      "Write out explicit SI units and negative signs",
      "Practice dimensional elimination on multi-variable numericals",
      "Attempt 5-question numerical drill under 60s pacing",
    ],
  },
  chemistry: {
    key: "chemistry",
    displayName: "Chemistry",
    subjectType: "conceptual",
    expectedPaceText: "about 45-55s per question",
    targetPacingSeconds: 50,
    ncertTextbookContext: "NCERT Class 12 Chemistry (Parts 1 & 2)",
    studyStrategy: [
      "Re-read NCERT in-text definitions and named reaction conditions",
      "Draft a 5-line summary of mechanisms and catalyst exceptions",
      "Test active recall of periodic trends and reagent discrimination",
      "Attempt a 5-question concept drill without consulting notes",
    ],
  },
  mathematics: {
    key: "mathematics",
    displayName: "Mathematics",
    subjectType: "numerical",
    expectedPaceText: "about 60-75s per question",
    targetPacingSeconds: 70,
    ncertTextbookContext: "NCERT Class 12 Mathematics (Parts 1 & 2)",
    studyStrategy: [
      "Verify theorem prerequisites and coordinate sign conventions",
      "Write out intermediate algebraic steps rather than mental math",
      "Check domain constraints and denominator zero-checks",
      "Attempt 5-question timed calculation drill",
    ],
  },
  biology: {
    key: "biology",
    displayName: "Biology",
    subjectType: "conceptual",
    expectedPaceText: "about 35-45s per question",
    targetPacingSeconds: 40,
    ncertTextbookContext: "NCERT Class 12 Biology",
    studyStrategy: [
      "Read the NCERT section line-by-line for terminology and diagrams",
      "Draft a 5-line summary of physiological pathways and cycle steps",
      "Test active recall of classification exceptions and scientific terms",
      "Attempt a 5-question direct recall drill",
    ],
  },
  "environmental-studies": {
    key: "environmental-studies",
    displayName: "Environmental Studies",
    subjectType: "conceptual",
    expectedPaceText: "about 40-50s per question",
    targetPacingSeconds: 45,
    ncertTextbookContext: "NCERT Class 12 Environmental Studies & Ecology",
    studyStrategy: [
      "Read the core NCERT chapter section on environmental legislation and ecological cycles",
      "Draft a 5-line summary of key principles, agreements, and conservation frameworks",
      "Test active recall of definitions, pollution metrics, and ecological indicators",
      "Attempt a 5-question concept drill to solidify factual distinctions",
    ],
  },
  english: {
    key: "english",
    displayName: "English",
    subjectType: "language",
    expectedPaceText: "about 45-55s per question",
    targetPacingSeconds: 50,
    ncertTextbookContext: "CUET English Reading Comprehension & Verbal Ability",
    studyStrategy: [
      "Read passage prompt for author tone, primary argument, and narrative structure",
      "Identify qualifier keywords ('NOT', 'EXCEPT', 'DEFINITELY', 'RARELY')",
      "Eliminate extreme distractor options and near-synonym traps",
      "Attempt 5-question targeted comprehension drill",
    ],
  },
  accountancy: {
    key: "accountancy",
    displayName: "Accountancy",
    subjectType: "numerical",
    expectedPaceText: "about 55-65s per question",
    targetPacingSeconds: 60,
    ncertTextbookContext: "NCERT Class 12 Accountancy (Partnership & Company Accounts)",
    studyStrategy: [
      "Verify debit/credit conventions and ledger balance rules in NCERT",
      "Draft journal entry sequences for share forfeiture and goodwill revaluation",
      "Check ratio calculations and balance sheet equation balancing",
      "Attempt 5-question ledger calculation drill",
    ],
  },
  economics: {
    key: "economics",
    displayName: "Economics",
    subjectType: "conceptual",
    expectedPaceText: "about 45-55s per question",
    targetPacingSeconds: 50,
    ncertTextbookContext: "NCERT Class 12 Macroeconomics & Indian Economic Development",
    studyStrategy: [
      "Read NCERT section on national income aggregates and fiscal policies",
      "Draft a 5-line summary of multiplier mechanisms and economic reforms",
      "Test active recall of chronological five-year plan milestones and graphs",
      "Attempt 5-question macroeconomic analysis drill",
    ],
  },
  "business-studies": {
    key: "business-studies",
    displayName: "Business Studies",
    subjectType: "conceptual",
    expectedPaceText: "about 40-50s per question",
    targetPacingSeconds: 45,
    ncertTextbookContext: "NCERT Class 12 Business Studies (Principles & Functions)",
    studyStrategy: [
      "Read NCERT chapter on management principles and financial planning",
      "Draft a 5-line summary distinguishing Fayol vs Taylor principles",
      "Test active recall of consumer protection rights and marketing mix",
      "Attempt 5-question case-study concept drill",
    ],
  },
  history: {
    key: "history",
    displayName: "History",
    subjectType: "conceptual",
    expectedPaceText: "about 40-50s per question",
    targetPacingSeconds: 45,
    ncertTextbookContext: "NCERT Class 12 Themes in Indian History (Parts 1, 2 & 3)",
    studyStrategy: [
      "Read NCERT chapter section on inscriptions, chronology, and social movements",
      "Create a timeline anchor chart of key dynasties, treaties, and rebellions",
      "Test active recall of primary source excavations and architectural sites",
      "Attempt 5-question chronology matching drill",
    ],
  },
  "political-science": {
    key: "political-science",
    displayName: "Political Science",
    subjectType: "conceptual",
    expectedPaceText: "about 40-50s per question",
    targetPacingSeconds: 45,
    ncertTextbookContext: "NCERT Class 12 Contemporary World Politics & Politics in India",
    studyStrategy: [
      "Read NCERT chapter section on international organizations and domestic milestones",
      "Draft a 5-line summary of treaty dates, non-aligned summits, and constitutional shifts",
      "Test active recall of UN organ powers and regional integration pacts",
      "Attempt 5-question policy analysis drill",
    ],
  },
  geography: {
    key: "geography",
    displayName: "Geography",
    subjectType: "conceptual",
    expectedPaceText: "about 40-50s per question",
    targetPacingSeconds: 45,
    ncertTextbookContext: "NCERT Class 12 Fundamentals of Human Geography & India",
    studyStrategy: [
      "Read NCERT chapter section on demographic transitions and trade corridors",
      "Review spatial distribution maps for mineral belts and crop zones",
      "Test active recall of transport models and urbanization trends",
      "Attempt 5-question spatial analysis drill",
    ],
  },
  psychology: {
    key: "psychology",
    displayName: "Psychology",
    subjectType: "conceptual",
    expectedPaceText: "about 40-50s per question",
    targetPacingSeconds: 45,
    ncertTextbookContext: "NCERT Class 12 Psychology (Self, Personality & Disorders)",
    studyStrategy: [
      "Read NCERT chapter section on personality assessment and psychological disorders",
      "Draft a 5-line summary distinguishing therapeutic approaches (CBT vs Humanistic)",
      "Test active recall of defense mechanisms, IQ curves, and stress models",
      "Attempt 5-question diagnostic concept drill",
    ],
  },
  sociology: {
    key: "sociology",
    displayName: "Sociology",
    subjectType: "conceptual",
    expectedPaceText: "about 40-50s per question",
    targetPacingSeconds: 45,
    ncertTextbookContext: "NCERT Class 12 Indian Society & Social Change in India",
    studyStrategy: [
      "Read NCERT chapter section on social institutions, caste, and social movements",
      "Draft a 5-line summary of structural change, secularization, and agrarian relations",
      "Test active recall of sociological thinkers, constitutional safeguards, and tribal land rights",
      "Attempt 5-question conceptual analysis drill",
    ],
  },
  "computer-science": {
    key: "computer-science",
    displayName: "Computer Science",
    subjectType: "numerical",
    expectedPaceText: "about 55-70s per question",
    targetPacingSeconds: 65,
    ncertTextbookContext: "NCERT Class 12 Computer Science (Python & SQL)",
    studyStrategy: [
      "Trace loop index bounds and mutable object references in Python",
      "Write out SQL query clause execution order (FROM -> WHERE -> GROUP BY -> HAVING)",
      "Verify network subnet calculations and stack pointer operations",
      "Attempt 5-question code tracing and query drill",
    ],
  },
  "physical-education": {
    key: "physical-education",
    displayName: "Physical Education",
    subjectType: "conceptual",
    expectedPaceText: "about 35-45s per question",
    targetPacingSeconds: 40,
    ncertTextbookContext: "NCERT Class 12 Physical Education (Biomechanics & Training)",
    studyStrategy: [
      "Read chapter section on tournament fixture formulae and biomechanical principles",
      "Draft a 5-line summary of Newton's laws in sports and nutritional requirements",
      "Test active recall of test battery protocols and postural deformities",
      "Attempt 5-question factual recall drill",
    ],
  },
};

export function getSubjectMetadata(subjectRaw?: string): SubjectMetadataConfig {
  if (!subjectRaw) {
    return SUBJECT_METADATA_REGISTRY["physics"]!;
  }
  const clean = subjectRaw.trim().toLowerCase().replace(/[-_]/g, " ");

  if (clean.includes("phys") && !clean.includes("physical")) return SUBJECT_METADATA_REGISTRY["physics"]!;
  if (clean.includes("chem")) return SUBJECT_METADATA_REGISTRY["chemistry"]!;
  if (clean.includes("math")) return SUBJECT_METADATA_REGISTRY["mathematics"]!;
  if (clean.includes("bio")) return SUBJECT_METADATA_REGISTRY["biology"]!;
  if (clean.includes("environment") || clean.includes("evs")) return SUBJECT_METADATA_REGISTRY["environmental-studies"]!;
  if (clean.includes("eng")) return SUBJECT_METADATA_REGISTRY["english"]!;
  if (clean.includes("account") || clean.includes("acc")) return SUBJECT_METADATA_REGISTRY["accountancy"]!;
  if (clean.includes("eco")) return SUBJECT_METADATA_REGISTRY["economics"]!;
  if (clean.includes("business") || clean.includes("bst")) return SUBJECT_METADATA_REGISTRY["business-studies"]!;
  if (clean.includes("hist")) return SUBJECT_METADATA_REGISTRY["history"]!;
  if (clean.includes("pol")) return SUBJECT_METADATA_REGISTRY["political-science"]!;
  if (clean.includes("geo")) return SUBJECT_METADATA_REGISTRY["geography"]!;
  if (clean.includes("psych")) return SUBJECT_METADATA_REGISTRY["psychology"]!;
  if (clean.includes("soc")) return SUBJECT_METADATA_REGISTRY["sociology"]!;
  if (clean.includes("computer") || clean.includes("cs")) return SUBJECT_METADATA_REGISTRY["computer-science"]!;
  if (clean.includes("physical") || clean.includes("ped")) return SUBJECT_METADATA_REGISTRY["physical-education"]!;

  // Default fallback
  const capitalized = subjectRaw.charAt(0).toUpperCase() + subjectRaw.slice(1);
  return {
    key: clean.replace(/\s+/g, "-"),
    displayName: capitalized,
    subjectType: "conceptual",
    expectedPaceText: "about 45-60s per question",
    targetPacingSeconds: 50,
    ncertTextbookContext: `NCERT Class 12 (${capitalized})`,
    studyStrategy: [
      `Read the core NCERT chapter section for ${capitalized}`,
      "Draft a 5-line summary of fundamental concepts and exceptions",
      "Test active recall of definitions without looking at notes",
      "Attempt a 5-question concept drill",
    ],
  };
}

// -------------------------------------------------------------
// 8. Feature Gates & Cost-Protection Rate Limits (Phase 2 & 3)
// -------------------------------------------------------------

/**
 * Central feature access gate.
 * Currently returns true for all features and all users (no paywall, no feature gating).
 * Provides a clean stub so future tiers/plans can be wired here without rewriting UI.
 */
export function canUseFeature(_user: { id?: string; tier?: string } | null, _feature: string): boolean {
  return true;
}

export const DAILY_RATE_LIMITS = {
  AI_MISTAKE_EXPLANATION: 50,
  ADAPTIVE_REPAIR_DRILL: 15,
  DAILY_STUDY_PLAN: 10,
  DOUBT_SOLVER_MESSAGES: 30,
  WEEKLY_PROGRESS_REPORT: 5,
} as const;

export type RateLimitedFeature =
  | keyof typeof DAILY_RATE_LIMITS
  | "why_wrong_explanations"
  | "repair_drills"
  | "doubt_solver_messages"
  | "daily_study_plan"
  | "weekly_report";

export interface RateLimitCheckResult {
  allowed: boolean;
  usedToday: number;
  limit: number;
  remainingToday: number;
  remaining: number;
  message?: string;
}

/**
 * Checks and records rate limit usage for a given user and feature.
 * In browser environment: uses localStorage scoped by date and user.
 * In server environment: permits action with full quota.
 */
export function checkAndRecordRateLimit(
  userId: string = "guest",
  feature: RateLimitedFeature
): RateLimitCheckResult {
  let canonicalFeature: keyof typeof DAILY_RATE_LIMITS = "AI_MISTAKE_EXPLANATION";
  if (feature === "repair_drills" || feature === "ADAPTIVE_REPAIR_DRILL") {
    canonicalFeature = "ADAPTIVE_REPAIR_DRILL";
  } else if (feature === "why_wrong_explanations" || feature === "AI_MISTAKE_EXPLANATION") {
    canonicalFeature = "AI_MISTAKE_EXPLANATION";
  } else if (feature === "doubt_solver_messages" || feature === "DOUBT_SOLVER_MESSAGES") {
    canonicalFeature = "DOUBT_SOLVER_MESSAGES";
  } else if (feature === "daily_study_plan" || feature === "DAILY_STUDY_PLAN") {
    canonicalFeature = "DAILY_STUDY_PLAN";
  } else if (feature === "weekly_report" || feature === "WEEKLY_PROGRESS_REPORT") {
    canonicalFeature = "WEEKLY_PROGRESS_REPORT";
  }

  const limit = DAILY_RATE_LIMITS[canonicalFeature] || 50;

  if (typeof window === "undefined") {
    return {
      allowed: true,
      usedToday: 0,
      limit,
      remainingToday: limit,
      remaining: limit,
    };
  }

  try {
    const today = new Date().toISOString().split("T")[0];
    const storageKey = `cuet_rate_limit:${userId}:${today}:${canonicalFeature}`;
    const raw = window.localStorage.getItem(storageKey);
    const usedToday = raw ? parseInt(raw, 10) : 0;

    if (usedToday >= limit) {
      return {
        allowed: false,
        usedToday,
        limit,
        remainingToday: 0,
        remaining: 0,
        message: "Daily practice limit reached for today. Resets tomorrow.",
      };
    }

    const newCount = usedToday + 1;
    window.localStorage.setItem(storageKey, newCount.toString());
    const remaining = Math.max(0, limit - newCount);
    return {
      allowed: true,
      usedToday: newCount,
      limit,
      remainingToday: remaining,
      remaining,
    };
  } catch {
    return {
      allowed: true,
      usedToday: 0,
      limit,
      remainingToday: limit,
      remaining: limit,
    };
  }
}
