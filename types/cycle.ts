import {
  RecordedQuestionAttempt,
  TopicMastery,
  ErrorTaxonomyBreakdown,
} from "./index";

export interface CycleSubjectPerformance {
  subject: string;
  subjectKey: string;
  attempted: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  avgTimeSeconds: number;
}

export interface CycleTopicPerformance {
  chapter: string;
  microTopic: string;
  subject: string;
  attempts: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  avgTimeSeconds: number;
  primaryDiagnosis?: string;
  contributingFactor?: string;
  problemClassification?: "KNOWLEDGE_PROBLEM" | "PERFORMANCE_PROBLEM" | "QUESTION_INTERPRETATION" | "LIMITED_DATA";
  errorPattern?: string;
}

export interface CycleImprovedItem {
  type: "topic" | "subject" | "error_category";
  name: string;
  topic?: string; // alias for name
  subject?: string;
  previousAccuracy: number;
  currentAccuracy: number;
  improvementPercentagePoints: number;
  deltaPercentage?: number; // alias
  previousErrors?: number;
  currentErrors?: number;
  errorsReduced?: number;
  explanation: string;
  evidence?: string; // alias
}

export interface CycleRecurringWeakItem {
  name: string;
  topic?: string; // alias for name
  subject: string;
  status?: string;
  previousAccuracy: number;
  currentAccuracy: number;
  previousPrimaryDiagnosis: string;
  currentPrimaryDiagnosis: string;
  previousErrorPattern: string;
  currentErrorPattern: string;
  errorPatternChanged: boolean;
  errorPatternShift?: boolean; // alias
  explanation: string;
}

export interface CycleResolvedItem {
  name: string;
  topic?: string; // alias for name
  subject: string;
  previousAccuracy: number;
  currentAccuracy: number;
  previousErrors: number;
  currentErrors: number;
  currentAttempts: number;
  explanation: string;
  resolutionEvidence?: string; // alias
}

export interface CycleNewMistakeItem {
  name: string;
  topic?: string; // alias for name
  subject: string;
  currentAccuracy: number;
  currentAttempts: number;
  currentErrors: number;
  primaryDiagnosis: string;
  primaryPattern?: string; // alias
  contributingFactor: string;
  explanation: string;
  evidence?: string; // alias
}

export interface CycleDeclinedItem {
  name: string;
  topic?: string; // alias for name
  subject: string;
  previousAccuracy: number;
  currentAccuracy: number;
  dropPercentagePoints: number;
  declinePercentage?: number; // alias
  previousErrors: number;
  currentErrors: number;
  telemetryEvidence: string;
  explanation: string;
}

export interface CycleRecommendedFocus {
  priority: number;
  title: string;
  topic: string;
  subject: string;
  reason: string;
  recommendedDrill: string;
}

export interface CycleComparisonResult {
  previousCycleNumber: number;
  currentCycleNumber: number;
  overallAccuracyChange: number; // e.g. +12 or -5
  accuracyDelta: number; // alias for overallAccuracyChange
  previousOverallAccuracy: number;
  currentOverallAccuracy: number;
  whatImproved: CycleImprovedItem[];
  improved: CycleImprovedItem[]; // alias
  whatRemainedWeak: CycleRecurringWeakItem[];
  recurringWeak: CycleRecurringWeakItem[]; // alias
  whatWasFixed: CycleResolvedItem[];
  resolved: CycleResolvedItem[]; // alias
  newMistakes: CycleNewMistakeItem[];
  whatGotWorse: CycleDeclinedItem[];
  declined: CycleDeclinedItem[]; // alias
  recommendedFocus: CycleRecommendedFocus[];
}

export interface CycleAIAnalysis {
  status: "completed" | "pending" | "failed";
  generatedAt?: string;
  overallNarrative: string;
  recurringMisconceptions: string[];
  crossTopicPatterns: string[];
  behavioralShift?: string;
  personalizedRoadmap: string[];
  errorMessage?: string;
}

export interface DiagnosticCycle {
  cycleNumber: number;
  status: "in_progress" | "completed";
  startedAt: string;
  completedAt?: string;
  questionCount: number; // 0..150 (150 when completed)
  totalQuestionsAttempted: number; // alias for questionCount
  correctCount: number;
  correctAnswersCount: number; // alias
  incorrectCount: number;
  accuracyPercentage: number;
  overallAccuracyPercentage: number; // alias
  avgTimeSeconds: number;
  questions: RecordedQuestionAttempt[]; // Exact 150 attempts for this cycle
  subjectPerformance: Record<string, CycleSubjectPerformance>;
  topicPerformance: CycleTopicPerformance[];
  errorTaxonomy: ErrorTaxonomyBreakdown;
  diagnosedWeaknesses: TopicMastery[];
  strengths: TopicMastery[];
  responseTelemetry: {
    avgTimeSeconds: number;
    fastResponsesCount: number;
    slowResponsesCount: number;
    pacingIssue: string;
  };
  aiAnalysis?: CycleAIAnalysis;
  comparison?: CycleComparisonResult; // null/undefined for Cycle 1
}

export interface CycleCompletionNotification {
  cycleNumber: number;
  isFirstCycle?: boolean;
  isBaseline: boolean;
  totalQuestionsAnalyzed?: number;
  totalAnalyzed: number;
  accuracyPercentage?: number;
  completedAt?: string;
  summaryCounts?: {
    improved: number;
    recurring: number;
    resolved: number;
    newMistakes: number;
    declined: number;
  };
  comparisonSummary?: {
    improvedCount: number;
    recurringCount: number;
    resolvedCount: number;
    newMistakesCount: number;
    declinedCount: number;
  };
  comparison?: CycleComparisonResult;
}
