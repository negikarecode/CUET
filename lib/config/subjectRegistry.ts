/**
 * Authoritative Subject Registry & Metadata Layer
 * Explicitly records syllabus version, supported status, question count, and audit status.
 */

export interface SubjectMetadata {
  id: string;
  name: string;
  officialCode: string;
  syllabusVersion: string;
  supportedStatus: "active" | "beta" | "planned";
  mockCount: number;
  questionCount: number;
  questionTypes: string[];
  blueprint: {
    totalQuestions: number;
    distinctChaptersMinimum: number;
    numericalTargetPercentage: number;
    caseBasedTargetPercentage: number;
  };
  languageAvailability: {
    questionBank: string[]; // Content language
    uiShell: string[];      // Interface language
  };
  lastContentAudit: string;
  contentStatus: "approved" | "under_review" | "flagged";
  disclaimer: string;
}

export const SUPPORTED_SUBJECTS_REGISTRY: Record<string, SubjectMetadata> = {
  physics: {
    id: "physics",
    name: "Physics",
    officialCode: "312",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "direct-numerical", "case-based", "assertion-reasoning", "diagram-based"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 25,
      caseBasedTargetPercentage: 15,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 312. Not endorsed by NTA.",
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    officialCode: "306",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "direct-numerical", "case-based", "assertion-reasoning"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 15,
      caseBasedTargetPercentage: 15,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 306. Not endorsed by NTA.",
  },
  maths: {
    id: "maths",
    name: "Mathematics",
    officialCode: "319",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "direct-numerical", "case-based"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 50,
      caseBasedTargetPercentage: 10,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 319. Not endorsed by NTA.",
  },
  bio: {
    id: "bio",
    name: "Biology",
    officialCode: "304",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "assertion-reasoning"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 10,
      numericalTargetPercentage: 5,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 304. Not endorsed by NTA.",
  },
  accs: {
    id: "accs",
    name: "Accountancy",
    officialCode: "301",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "direct-numerical", "case-based"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 35,
      caseBasedTargetPercentage: 15,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 301. Not endorsed by NTA.",
  },
  eco: {
    id: "eco",
    name: "Economics",
    officialCode: "309",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "direct-numerical", "case-based", "assertion-reasoning"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 15,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 309. Not endorsed by NTA.",
  },
  bst: {
    id: "bst",
    name: "Business Studies",
    officialCode: "305",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 25,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 305. Not endorsed by NTA.",
  },
  history: {
    id: "history",
    name: "History",
    officialCode: "314",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "multi-statement"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 10,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 314. Not endorsed by NTA.",
  },
  "pol science": {
    id: "pol science",
    name: "Political Science",
    officialCode: "323",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "multi-statement"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 10,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 323. Not endorsed by NTA.",
  },
  geo: {
    id: "geo",
    name: "Geography",
    officialCode: "313",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 5,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 313. Not endorsed by NTA.",
  },
  psychology: {
    id: "psychology",
    name: "Psychology",
    officialCode: "324",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 7,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-17",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 324. Not endorsed by NTA.",
  },
};

export const SUPPORTED_SUBJECT_KEYS = Object.keys(SUPPORTED_SUBJECTS_REGISTRY);

export function getSubjectMetadata(subjectKey: string): SubjectMetadata | undefined {
  const normalized = subjectKey.toLowerCase().trim();
  if (normalized === "accountancy") return SUPPORTED_SUBJECTS_REGISTRY["accs"];
  if (normalized === "polscience") return SUPPORTED_SUBJECTS_REGISTRY["pol science"];
  return SUPPORTED_SUBJECTS_REGISTRY[normalized];
}
