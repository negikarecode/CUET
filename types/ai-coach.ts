/**
 * AI Coach Type Definitions & Schemas
 */

export type TopicClassification = "weak" | "strong" | "insufficient data";

export type MistakeTag = "Didn't know concept" | "Misread" | "Guessed" | "Changed my answer";

export interface MistakeTagCounts {
  didntKnowConcept: number;
  misread: number;
  guessed: number;
  changedAnswer: number;
}

export interface TopicStat {
  topic: string;
  chapter?: string;
  attempted: number;
  correct: number;
  accuracyPercentage: number;
  averageTimeSeconds?: number;
  classification: TopicClassification;
  mostCommonWrongOption?: string;
}

export interface ErrorTypeBreakdown {
  carelessErrors: number;     // Wrong answers on questions tagged easy: "careless"
  conceptGaps: number;        // Topic accuracy < 40% with 5+ attempts: "concept gap"
  confidenceGaps: number;     // Skipped questions: "confidence gap"
  secondGuessing?: number;    // Right-to-wrong answer changes: "second-guessing"
}

export interface MockVsPyqStats {
  mockAccuracy: number;
  mockAttempts: number;
  pyqAccuracy: number;
  pyqAttempts: number;
  accuracyDelta: number; // mockAccuracy - pyqAccuracy
}

export interface RecentTrendStats {
  recentAccuracies: number[];
  trajectory: "improving" | "plateauing" | "declining";
}

export interface AICoachComputedStats {
  subject: string;
  totalAttempts: number;
  uniqueQuestionsAnalyzed: number;
  overallAccuracyPercentage: number;
  attemptRate: number;
  netScore: number;                 // CUET (+5/-1)
  potentialScore: number;           // If all attempted were correct (+5 * attempted)
  negativeMarksLost: number;        // Total marks deducted by -1 penalty (marks lost to wrong answers)
  averageTimePerQuestionSeconds?: number;
  errorTypes: ErrorTypeBreakdown;
  mistakeTags?: MistakeTagCounts;
  rightToWrongChanges: number;
  mockVsPyqGap: MockVsPyqStats;
  recentTrend: RecentTrendStats;
  topicBreakdown: TopicStat[];
  daysToExam: number;
}

export interface BiggestLeak {
  topic?: string;
  issue: string;
  evidence: string;
  likelyConfusion?: string;
  fix: string;
}

export interface TopicPracticeDelta {
  topic: string;
  subject: string;
  beforeAccuracy: number;
  afterAccuracy: number;
  attemptsCount: number;
  timestamp: string;
}

export interface WeeklyPlanItem {
  day: string;
  focus: string;
  task: string;
  minutes: number;
}

export interface AICoachReportContent {
  summary: string;
  biggest_leaks: BiggestLeak[];
  strengths: string[];
  weekly_plan: WeeklyPlanItem[];
  test_taking_strategy: string[];
  next_test_goal: string;
  comparison_with_previous: string;
}

export interface AICoachStoredReport {
  id: string;
  user_id: string;
  subject: string;
  stats_json: AICoachComputedStats;
  report_json: AICoachReportContent;
  questions_analyzed: number;
  score_snapshot: {
    netScore: number;
    potentialScore: number;
    accuracyPercentage: number;
    negativeMarksLost: number;
  };
  feedback?: "up" | "down" | null;
  model: string;
  prompt_version: string;
  created_at: string;
}

export interface SubjectEligibility {
  subject: string;
  freshQuestionsCount: number;
  isUnlocked: boolean;
  requiredQuestions: number;
  questionsRemaining: number;
  lastReportId?: string;
  lastReportDate?: string;
  reportsLeftToday: number;
  dailyLimitReached: boolean;
  nextResetIso: string;
}
