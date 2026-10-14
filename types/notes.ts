export type CUETRelevance = "High" | "Medium" | "Low" | "high" | "medium" | "low";
export type ConfidenceLevel = "high" | "medium" | "low";

export type OptionItem = { id: string; text: string } | string;

export interface WorkedExample {
  id?: string;
  questionNumber?: number;
  question: string;
  options: OptionItem[];
  correctOption: string;
  correctAnswer?: string;
  solutionSteps?: string[];
  solutionStepByStep?: string[];
  solution?: string;
  cuetTip?: string;
}

export interface QuestionPattern {
  type?: string;
  patternType?: string;
  frequency: string;
  typicalStem?: string;
  pyqExample?: {
    question: string;
    options?: OptionItem[];
    correctOption?: string;
    explanation?: string;
  };
  strategy: string;
}

export interface CommonTrap {
  misconception?: string;
  concept?: string;
  whyWrong?: string;
  correctUnderstanding?: string;
  correctFact?: string;
  trapOptionExample?: string;
}

export interface PracticeMCQ {
  id?: string;
  question: string;
  type?: string;
  questionType?: string;
  options: OptionItem[];
  correctOption?: string;
  correctAnswer?: string;
  explanation: string;
  difficulty?: "easy" | "medium" | "hard" | "Easy" | "Medium" | "Hard" | string;
}

export interface FormulaDefinitionItem {
  name: string;
  formula: string;
  symbols?: string;
  siUnits?: string;
  applicationCondition?: string;
  notes?: string;
}

export interface VisualDiagram {
  type?: "svg" | "mermaid" | string;
  title?: string;
  caption?: string;
  code?: string;
  needsImage?: boolean;
  imageDescription?: string;
}

export interface NoteLinkItem {
  title?: string;
  topicId?: string;
  slug?: string;
}

export interface NoteDocument {
  id: string;
  slug: string;
  subject: string;
  subjectName: string;
  subjectCode: string;
  unitNumber: number;
  unitTitle: string;
  topicTitle: string;
  ncertReference: {
    class?: string;
    book?: string;
    chapterNumber?: number;
    chapterName?: string;
    sections?: string[];
  };
  cuetRelevance: {
    level: "High" | "Medium" | "Low" | string;
    pyqFrequency?: string;
    totalPyqsInRepo?: number;
    weightagePercentage?: number;
  };
  summary30Seconds: string[];
  coreConcepts: {
    title: string;
    content: string;
    ncertPointers?: string[];
  }[];
  keyFormulasAndTables: FormulaDefinitionItem[];
  diagram?: VisualDiagram;
  diagramSvg?: string;
  workedExamples?: WorkedExample[];
  howCuetAsksThis?: QuestionPattern[];
  howCuetAsks?: QuestionPattern[];
  commonTraps: CommonTrap[];
  mnemonicsAndShortcuts: {
    title?: string;
    mnemonic?: string;
    rule?: string;
    shortcut?: string;
    whenToApply?: string;
    explanation?: string;
    notes?: string;
  }[];
  quickRevisionCard: {
    title?: string;
    bulletPoints?: string[];
    keyPoints?: string[];
    examTricks?: string[];
  };
  practiceQuestions: PracticeMCQ[];
  links: {
    prerequisites: (string | NoteLinkItem)[];
    relatedTopics: (string | NoteLinkItem)[];
    practiceTestId?: string;
    practiceTestUrl?: string;
    weaknessReportUrl?: string;
    weaknessRadarUrl?: string;
  };
  physicsModule?: {
    examinableDerivations?: { title?: string; briefSteps?: string[]; [key: string]: any }[];
    unitDimensionTable?: { quantity?: string; formula?: string; dimension?: string; dimensionalFormula?: string; unit?: string; siUnit?: string; [key: string]: any }[];
    graphInterpretations?: { graphName?: string; graphTitle?: string; slopeMeaning?: string; areaMeaning?: string; keyFeature?: string; [key: string]: any }[];
    [key: string]: any;
  };
  subjectSpecific?: {
    physics?: {
      examinableDerivations?: { title: string; briefSteps: string[] }[];
      unitDimensionTable?: { quantity: string; dimension: string; unit: string }[];
      graphInterpretations?: { graphName: string; slopeMeaning: string; areaMeaning: string; keyFeature: string }[];
    };
    chemistry?: {
      namedReactions?: { name: string; reagents: string; condition: string; equation: string }[];
      exceptionsList?: string[];
      trendsTable?: { property: string; trend: string; reason: string }[];
    };
    mathematics?: {
      standardResults?: { result: string; condition: string }[];
      graphProperties?: { curve: string; keyPoints: string }[];
    };
    biology?: {
      scientificNames?: { common: string; scientific: string; significance: string }[];
      processFlowcharts?: { processName: string; steps: string[] }[];
      ncertFactAlerts?: string[];
    };
    accountancy?: {
      formats?: { title: string; formatDescription: string; sampleNumerical: string }[];
      accountingRatios?: { ratio: string; formula: string; idealNorm: string }[];
    };
    economics?: {
      definitions?: { term: string; definition: string }[];
      curveShifts?: { curve: string; shiftRightFactor: string; shiftLeftFactor: string }[];
    };
    humanities?: {
      chronologyTimeline?: { year: string; event: string; significance: string }[];
      keyTheorists?: { theorist: string; theory: string; bookOrYear: string }[];
    };
    languages?: {
      grammarRules?: { rule: string; example: string; errorPattern: string }[];
      vocabularyPairs?: { word: string; synonym: string; antonym: string; sampleSentence: string }[];
    };
    generalTest?: {
      shortcuts?: { type: string; formulaOrTrick: string; example: string }[];
      staticGkFacts?: { topic: string; fact: string }[];
    };
  };
  metadata?: {
    confidence: ConfidenceLevel;
    needsHumanReview: boolean;
    reviewReason?: string;
    lastUpdated: string;
    version: number;
    wordCount: number;
    isFreePreview: boolean;
  };
}

export interface NoteMetadataSummary {
  id: string;
  slug: string;
  subject: string;
  subjectName: string;
  unitNumber: number;
  unitTitle: string;
  topicTitle: string;
  relevance: CUETRelevance | string;
  isFreePreview: boolean;
  readingTimeMinutes: number;
  mcqCount: number;
}
