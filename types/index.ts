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

export type QuestionStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked_review"
  | "answered_marked_review";

export interface Question {
  id: string;
  subjectId: string;
  questionNumber: number;
  prompt: string;
  options: {
    id: "A" | "B" | "C" | "D";
    text: string;
  }[];
  correctOptionId: "A" | "B" | "C" | "D";
  explanation: string;
  aiDiagnosisNotes?: string;
  pyqSource?: string;
  topic: string;
  chapter?: string;
  difficulty: "easy" | "medium" | "hard";
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
  isCurrentUser?: boolean;
}

export interface RecordedQuestionAttempt {
  questionId: string;
  questionNumber: number;
  subject: string;
  chapter: string;
  microTopic: string;
  selectedOption: "A" | "B" | "C" | "D" | null;
  correctOption: "A" | "B" | "C" | "D";
  isCorrect: boolean | null;
  timeSpentSeconds: number;
  isTimeSink: boolean;
  ncertReference?: string;
  explanation?: string;
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
}

