export type StreamType = "science" | "commerce" | "humanities";

export interface SubjectConfig {
  id: string;
  name: string;
  code: string;
  stream: StreamType;
  iconName: string;
  description: string;
  totalQuestions: number;
  maxToAttempt: number;
  durationMinutes: number;
  popularMockCount: number;
}

export interface FullTestMeta {
  id: string;
  title: string;
  subject: string;
  code: string;
  totalQuestions: number;
  durationMinutes: number;
}

export type QuestionStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked_review"
  | "answered_marked_review";

export type QuestionType =
  | "conceptual"
  | "direct-numerical"
  | "application"
  | "multi-statement"
  | "assertion-reasoning"
  | "case-based"
  | "diagram-based"
  | "sequence-order";

export interface QuestionOption {
  id: "A" | "B" | "C" | "D";
  text: string;
  isCorrect?: boolean;
  misconception?: {
    type: string;
    description: string;
  } | null;
  studentSelectionTrap?: string | null;
  mistakeAnalysis?: string;
}

export interface QuestionSolution {
  quick: string;
  concept: string;
  detailed: string;
}

export type ContentConfidenceStatus =
  | "unreviewed"
  | "machine_validated"
  | "needs_review"
  | "human_reviewed"
  | "approved"
  | "deprecated";

export interface Question {
  id: string;
  questionId?: string;
  conceptId?: string;
  subjectId: string;
  questionNumber: number;
  prompt: string;
  options: QuestionOption[];
  correctOptionId: "A" | "B" | "C" | "D";
  explanation: string;
  solution?: QuestionSolution;
  questionType?: QuestionType;
  difficultyLevel?: 1 | 2 | 3 | 4 | 5;
  difficulty: "easy" | "medium" | "hard" | 1 | 2 | 3 | 4 | 5;
  estimatedTimeSeconds?: number;
  formula?: string;
  keyConcept?: string;
  misconception?: {
    type?: string;
    description?: string;
  } | null;
  tags?: string[];
  qualityScore?: number;
  confidenceStatus?: ContentConfidenceStatus;
  confidenceScore?: number;
  validationFlags?: string[];
  hasDiagram?: boolean;
  diagramDescription?: string | null;
  aiDiagnosisNotes?: string;
  pyqSource?: string;
  topic: string;
  chapter?: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: "A" | "B" | "C" | "D" | null;
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
}

export interface TestSessionState {
  sessionId: string;
  subjectId: string;
  stream: StreamType;
  startedAt: number;
  durationMinutes: number;
  remainingSeconds: number;
  isTimerRunning: boolean;
  currentQuestionIndex: number;
  questions: Question[];
  answers: Record<string, UserAnswer>;
  isCompleted: boolean;
  score?: {
    correctCount: number;
    incorrectCount: number;
    unattemptedCount: number;
    totalMarks: number;
    maxPossibleMarks: number;
    accuracyPercentage: number;
  };
}

export interface UserStats {
  id: string;
  name: string;
  email: string;
  age?: string | number;
  dailyStreak: number;
  lastActiveDate: string;
  xpPoints: number;
  campusCoins: number;
  targetCollege: string;
  targetUniversity?: string;
  targetCourse?: string;
  preferredStream: StreamType;
  selectedSubjects?: string[];
  isLoggedIn?: boolean;
  accuracyPercentage?: number;
  completedTestsCount?: number;
  isPremium?: boolean;
  subscriptionTier?: string;
  subscriptionExpiresAt?: string | null;
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  coin_reward: number;
  isUnlocked?: boolean;
  unlockedAt?: string | null;
  progressPercentage?: number;
  criteria?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  stream: StreamType;
  targetCollege: string;
  streak: number;
  accuracyPercentage: number;
  totalXp: number;
  totalTrophies: number;
  subjectTrophies?: Record<string, number>;
  completedTestsCount?: number;
  isCurrentUser?: boolean;
}

export interface RecordedQuestionAttempt {
  questionId: string;
  conceptId?: string;
  questionNumber: number;
  subject: string;
  chapter: string;
  microTopic: string;
  prompt?: string;
  options?: QuestionOption[];
  questionType?: string;
  selectedOption: "A" | "B" | "C" | "D" | null;
  correctOption: "A" | "B" | "C" | "D";
  isCorrect: boolean | null;
  timeSpentSeconds: number;
  isTimeSink: boolean;
  ncertReference?: string;
  explanation?: string;
  difficulty?: "easy" | "medium" | "hard" | string;
  errorCategory?: string;
}

export interface RecordedTestAttempt {
  id: string;
  userId: string;
  testId: string;
  testTitle: string;
  subject: string;
  totalQuestions: number;
  attemptedCount: number;
  unattemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  totalMarks: number;
  maxMarks: number;
  accuracyPercentage: number;
  timeTakenSeconds: number;
  timeSinkCount: number;
  submittedAt: string;
  questions: RecordedQuestionAttempt[];
}

export type ErrorClassificationType =
  | "Conceptual Gap"
  | "Formula/Rule Recall Gap"
  | "Application Error"
  | "Calculation Error"
  | "Misreading Error"
  | "Careless Error"
  | "Concept Confusion"
  | "Option Confusion"
  | "Guessing Error"
  | "Time Pressure Error"
  | "Overthinking Error"
  | "Insufficient Information";

export type WeaknessSeverityTier =
  | "critical"
  | "major"
  | "moderate"
  | "minor"
  | "potential";

export type RemediationStage =
  | "DETECTED"
  | "DIAGNOSED"
  | "LEARNING"
  | "PRACTICING"
  | "VALIDATING"
  | "RECOVERED";

export type StrengthMasteryTier =
  | "core"
  | "emerging"
  | "unstable"
  | "mastered";

export type EngineConfidenceRating =
  | "High"
  | "Medium"
  | "Low"
  | "Insufficient Evidence";

export type DetailedErrorCategory =
  | "Conceptual Gap"
  | "Factual / Recall Gap"
  | "Formula / Method Error"
  | "Calculation Error"
  | "Question Interpretation Error"
  | "Distractor Trap"
  | "Careless Error"
  | "Multi-Step Reasoning Failure"
  | "Application Gap"
  | "Time / Pacing Issue"
  | "Guessing / Uncertainty"
  | "Memory Confusion";

export interface ErrorTaxonomyBreakdown {
  conceptualGapCount: number;
  factualRecallCount: number;
  formulaMethodCount: number;
  calculationCount: number;
  questionInterpretationCount: number;
  distractorTrapCount: number;
  carelessCount: number;
  multiStepReasoningCount: number;
  applicationGapCount: number;
  timePacingCount: number;
  guessingCount: number;
  memoryConfusionCount: number;
  totalErrors: number;
  percentages?: Record<DetailedErrorCategory, number>;
}

export interface DiagnosticSubtopic {
  name: string;
  accuracyPercentage: number;
  attemptsCount: number;
  confidence: "High" | "Medium" | "Low" | "Insufficient Evidence" | "HIGH" | "MEDIUM" | "LOW" | "INSUFFICIENT_EVIDENCE";
  status: "Critical" | "Moderate" | "Developing" | "Strong";
  errorPattern: string;
}

export interface PracticePhase {
  phase: number;
  title: string;
  questionType: string;
  questionCount: number;
  targetAccuracyPercentage: number;
  targetPacingSeconds?: number;
  description: string;
}

export interface RemediationPlan {
  step1Rebuild: {
    title: string;
    topicsToReview: string[];
  };
  step2DecisionFramework: {
    title: string;
    checklist: string[];
  };
  step3Practice: {
    title: string;
    phases: PracticePhase[];
  };
  step4Retest: {
    title: string;
    questionCount: number;
    description: string;
  };
}

export interface ExamTactic {
  topic: string;
  quickMethod: string;
  fullMethod: string;
  caution: string;
  whenToUse: string;
}

export interface MultiDimensionalMastery {
  conceptMastery: number | null;
  applicationMastery: number | null;
  accuracy: number | null;
  speed: number | null;
  consistency: number | null;
  overallStatus: string;
  isSufficientData: boolean;
}

export interface FullTopicDiagnosis {
  subject: string;
  chapter: string;
  microTopic: string;
  ncertReference: string;
  observedPerformance: {
    attemptsCount: number;
    correctCount: number;
    incorrectCount: number;
    accuracyPercentage: number;
    avgTimeSeconds: number;
    targetTimeSeconds: number;
    speedVsAccuracyState: "Concept/Knowledge Gap" | "Pacing/Fluency Deficit" | "Validated Core Strength" | "Major Systemic Weakness" | "Rapid Response Pattern";
  };
  diagnosticConfidence: "HIGH" | "MEDIUM" | "LOW" | "INSUFFICIENT_EVIDENCE";
  confidenceRationale: string;
  evidenceThresholdLabel: "Insufficient evidence" | "Early signal" | "Emerging weakness" | "Established weakness";
  primaryFailurePattern: string;
  secondaryFailurePattern?: string;
  primaryDiagnosis: string;
  contributingFactor?: string;
  specificWeakness: string;
  evidenceList: string[];
  interpretation: string;
  errorTaxonomy: ErrorTaxonomyBreakdown;
  weakSubtopics: DiagnosticSubtopic[];
  masteryModel: MultiDimensionalMastery;
  remediationPlan: RemediationPlan;
  examTactic?: ExamTactic;
  commonTrap: string;
  problemClassification?: "KNOWLEDGE_PROBLEM" | "PERFORMANCE_PROBLEM" | "QUESTION_INTERPRETATION" | "LIMITED_DATA";
  recommendedPracticeType: "5-Question Concept Repair" | "10-Question Application Drill" | "15-Question Mixed Remediation" | "10-Question Timed Drill" | "Calculation Drill" | "Misconception Repair Drill";
  recordedMistakes?: TopicMistakeRecord[];
  retestCriteria: {
    targetAccuracy: number;
    targetPacingSeconds: number;
    minimumNewAttemptsRequired: number;
  };
  remediationStage?: RemediationStage;
  isRecovered?: boolean;
  recoveryEvidence?: {
    beforeAccuracy: number;
    afterAccuracy: number;
    beforeAvgTime: number;
    afterAvgTime: number;
    beforeConceptErrors: number;
    afterConceptErrors: number;
    recoveredAt?: string;
    explanation: string;
  };
  progressHistory?: Array<{
    date: string;
    accuracy: number;
    avgTimeSeconds: number;
    attemptedCount: number;
  }>;
  progressTracking?: {
    beforeAccuracy: number;
    beforeAvgTime: number;
    afterAccuracy?: number;
    afterAvgTime?: number;
    hasRetested: boolean;
    verdict?: string;
  };
}

export interface TopicMistakeRecord {
  questionId: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  errorCategory: string;
  explanation: string;
  timeSpentSeconds: number;
  chapter: string;
  microTopic?: string;
}

export interface TopicMastery {
  chapter: string;
  microTopic: string;
  subject: string;
  ncertReference?: string;
  accuracyPercentage: number;
  attemptsCount: number;
  correctCount: number;
  incorrectCount: number;
  timeSinksCount: number;
  avgTimeSeconds: number;
  status: "critical" | "polish" | "mastered";
  remediationStage?: RemediationStage;
  isRecovered?: boolean;
  recoveryEvidence?: {
    beforeAccuracy: number;
    afterAccuracy: number;
    beforeAvgTime: number;
    afterAvgTime: number;
    beforeConceptErrors: number;
    afterConceptErrors: number;
    recoveredAt?: string;
    explanation: string;
  };
  masteryScore?: number;
  diagnosisLabel?: string;
  diagnosticInsight?: string;
  remedialPrescription?: string;
  confidenceLevel?: "high" | "medium" | "emerging";
  troubleTopics?: string[];
  strongTopics?: string[];
  // CUET AI Performance Intelligence Engine enhancements
  priorityScore?: number;
  weaknessTier?: WeaknessSeverityTier;
  strengthTier?: StrengthMasteryTier;
  primaryErrorType?: ErrorClassificationType;
  scoreImpactPotentialMarks?: number;
  // Comprehensive Diagnostic Engine Fields
  fullDiagnosis?: FullTopicDiagnosis;
  // Recorded representative mistakes from real attempts
  recordedMistakes?: TopicMistakeRecord[];
}

export interface TimeSinkAlertData {
  topic: string;
  chapter?: string;
  avgTimeSpent: number;
  errorRate: number;
  timeSinksCount: number;
  recoveryTactic: string;
}

export interface UserAnalyticsSummary {
  totalQuestionsAttempted: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  totalTimeSpentSeconds: number;
  overallAccuracyPercentage: number;
  completedTestsCount: number;
  weaknessRadar: TopicMastery[];
  strengthList: TopicMastery[];
  allTopics?: TopicMastery[];
  timeSinkAlerts: TimeSinkAlertData[];
  recommendedPractice?: {
    topic: string;
    chapter: string;
    subject: string;
    durationMinutes: number;
    questionCount: number;
    reason: string;
  };
  // CUET AI Performance Intelligence Engine insights
  marksLostBreakdown?: Array<{
    category: string;
    percentage: number;
    count: number;
    description: string;
  }>;
  nextActionsPlan?: {
    biggestStrength: string;
    biggestWeakness: string;
    biggestRecurringMistake: string;
    highestImpactTopic: string;
    recommendedRevision: string;
    recommendedPractice: string;
    recommendedNextTest: string;
  };
  readinessAssessment?: {
    level: "Developing" | "Moderate" | "Strong" | "Very Strong";
    confidence: EngineConfidenceRating;
    reasoning: string;
  };
  subjectCalibration?: Record<string, SubjectCalibrationData>;
}

export interface SubjectCalibrationData {
  subject: string;
  subjectKey: string;
  icon: string;
  category: string;
  totalAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  accuracyPercentage: number;
  testsCount: number;
  isUnlocked: boolean;
  attemptsToUnlock: number;
  unlockProgress: number;
  mockUrl: string;
}

export * from "./cycle";
export * from "./subject-ai";



