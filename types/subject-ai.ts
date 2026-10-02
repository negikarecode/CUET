import {
  ErrorTaxonomyBreakdown,
} from "./index";

export * from "./cycle";

/**
 * AI Subject Learning Profile & Analysis Schema
 */
export interface SubjectLearningProfile {
  strengths: string[];
  weaknesses: string[];
  recurringIssues: string[];
  transferableIssues?: string[];
  difficultyPattern?: string;
  recommendedFocus: string[];
}

export interface SubjectAIKeyPattern {
  title: string;
  description: string;
  evidenceQuestionIds: string[];
  confidence: "low" | "medium" | "high";
  classification?: "KNOWLEDGE_PROBLEM" | "PERFORMANCE_PROBLEM" | "QUESTION_INTERPRETATION" | "LIMITED_DATA";
}

export interface SubjectAICrossChapterPattern {
  pattern: string;
  chapters: string[];
  evidenceQuestionIds: string[];
  description: string;
}

export interface SubjectAIDifficultyAnalysis {
  easy: string;
  medium: string;
  hard: string;
}

export interface SubjectAIPriorityArea {
  title: string;
  reason: string;
  evidenceQuestionIds: string[];
  actions: string[];
  recommendedDrillTopic?: string;
  recommendedDrillType?: string;
}

export interface SubjectRadarAIAnalysis {
  subject: string;
  generatedAt: string;
  status: "completed" | "insufficient_data" | "fallback" | "error";
  subjectSummary: string;
  keyPatterns: SubjectAIKeyPattern[];
  knowledgePatterns: string[];
  performancePatterns: string[];
  interpretationPatterns: string[];
  crossChapterPatterns: SubjectAICrossChapterPattern[];
  difficultyAnalysis: SubjectAIDifficultyAnalysis;
  priorityAreas: SubjectAIPriorityArea[];
  learningProfile: SubjectLearningProfile;
  cycleIntegration?: {
    currentCycleNumber: number;
    cycleQuestionCount: number;
    observations: string[];
  };
  diagnosticConfidence: "HIGH" | "MEDIUM" | "LOW" | "INSUFFICIENT_EVIDENCE";
  evidenceThresholdLabel: "Insufficient evidence" | "Early signal" | "Emerging weakness" | "Established weakness";
}

/**
 * Payload sent to AI Analyst API
 */
export interface SubjectRadarAIPayload {
  subject: string;
  userId?: string;
  questions: Array<{
    questionId: string;
    prompt: string;
    options: any[];
    selectedOption: string | null;
    correctOption: string;
    isCorrect: boolean | null;
    chapter: string;
    microTopic?: string;
    difficulty?: string;
    timeSpentSeconds: number;
    ncertReference?: string;
    explanation?: string;
    errorCategory?: string;
  }>;
  deterministicStats: {
    totalAttempted: number;
    correctCount: number;
    incorrectCount: number;
    accuracyPercentage: number;
    avgTimeSeconds: number;
    difficultyStats: {
      easy: { attempted: number; correct: number; accuracy: number };
      medium: { attempted: number; correct: number; accuracy: number };
      hard: { attempted: number; correct: number; accuracy: number };
    };
    chapterPerformance: Array<{
      chapter: string;
      attempted: number;
      correct: number;
      accuracy: number;
      avgTimeSeconds: number;
      primaryDiagnosis?: string;
    }>;
    errorTaxonomy: ErrorTaxonomyBreakdown;
    diagnosticConfidence: "HIGH" | "MEDIUM" | "LOW" | "INSUFFICIENT_EVIDENCE";
    evidenceThresholdLabel: "Insufficient evidence" | "Early signal" | "Emerging weakness" | "Established weakness";
  };
  cycleInfo?: {
    currentCycleNumber: number;
    currentCycleQuestionCount: number;
    previousCycleWeaknesses?: string[];
    resolvedWeaknesses?: string[];
    recurringWeaknesses?: string[];
    improvements?: string[];
    declines?: string[];
  };
}
