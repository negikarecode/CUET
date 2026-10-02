import { QuestionOption } from "@/types";

export type NormalizedDifficulty = "easy" | "medium" | "hard" | "unknown";

export interface NormalizedMockQuestionTelemetry {
  questionId: string;
  conceptId?: string;
  questionNumber: number;
  subject: string;
  chapter: string; // "Unknown / Not Available" if missing
  microTopic: string;
  prompt: string;
  options: QuestionOption[];
  selectedOption: "A" | "B" | "C" | "D" | null;
  correctOption: "A" | "B" | "C" | "D";
  isCorrect: boolean | null;
  isAttempted: boolean;
  isSkipped: boolean;
  timeSpentSeconds: number;
  isTimeSink: boolean;
  difficulty: NormalizedDifficulty;
  rawDifficulty?: string | number;
  explanation?: string;
  solution?: {
    quick?: string;
    concept?: string;
    detailed?: string;
  };
  formula?: string;
  keyConcept?: string;
  misconception?: {
    type?: string;
    description?: string;
  } | null;
  ncertReference?: string;
}

export interface DifficultyMetric {
  difficulty: NormalizedDifficulty;
  label: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number; // 0 if attempted === 0
}

export interface ChapterMetric {
  chapter: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number; // 0 if attempted === 0
  avgTimeSeconds: number;
  difficultiesPresent: NormalizedDifficulty[];
}

export interface ChapterDifficultyCell {
  chapter: string;
  difficulty: NormalizedDifficulty;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number | null; // null if attempted === 0, rendered as "-"
}

export interface OverallMockStats {
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  accuracyPercentage: number;
  totalMarks: number;
  maxMarks: number;
  totalTimeSeconds: number;
  avgTimePerQuestionSeconds: number;
  timeSinkCount: number;
}

export interface PostMockDeterministicReport {
  attemptId: string;
  testId: string;
  testTitle: string;
  subject: string;
  submittedAt: string;
  userId: string;
  overall: OverallMockStats;
  difficultyBreakdown: DifficultyMetric[];
  chapterBreakdown: ChapterMetric[];
  chapterDifficultyMatrix: Record<string, Record<NormalizedDifficulty, ChapterDifficultyCell>>;
  allQuestions: NormalizedMockQuestionTelemetry[];
}

export interface AIChapterInsight {
  chapter: string;
  insight: string;
  evidenceQuestionIds: string[];
}

export interface AINotablePattern {
  title: string;
  description: string;
  evidenceQuestionIds: string[];
}

export interface AIPostMockInsight {
  status: "available" | "unavailable" | "insufficient_evidence";
  summary: string;
  difficultyInsight: string;
  chapterInsights: AIChapterInsight[];
  notablePatterns: AINotablePattern[];
  recommendedNextSteps: string[];
  generatedAt: string;
  modelUsed?: string;
}

export interface PostMockAnalysisResponse {
  report: PostMockDeterministicReport;
  aiInsight?: AIPostMockInsight;
}
