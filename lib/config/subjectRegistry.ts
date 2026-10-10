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
    lastContentAudit: "2026-09-28",
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
    lastContentAudit: "2026-09-28",
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
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 319. Not endorsed by NTA.",
  },
  bio: {
    id: "bio",
    name: "Biology",
    officialCode: "304",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 12,
    questionCount: 600,
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
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 304. Not endorsed by NTA.",
  },
  accs: {
    id: "accs",
    name: "Accountancy",
    officialCode: "301",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 18,
    questionCount: 900,
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
    lastContentAudit: "2026-09-28",
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
    lastContentAudit: "2026-09-28",
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
    lastContentAudit: "2026-09-28",
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
    lastContentAudit: "2026-09-28",
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
    lastContentAudit: "2026-09-28",
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
    lastContentAudit: "2026-09-28",
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
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 324. Not endorsed by NTA.",
  },
  sociology: {
    id: "sociology",
    name: "Sociology",
    officialCode: "325",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "assertion-reasoning", "multi-statement"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 325. Not endorsed by NTA.",
  },
  physical_education: {
    id: "physical_education",
    name: "Physical Education",
    officialCode: "321",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "assertion-reasoning"],
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
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 321. Not endorsed by NTA.",
  },
  computer_science: {
    id: "computer_science",
    name: "Computer Science / Informatics Practices",
    officialCode: "308",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "direct-numerical", "case-based", "code-tracing"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 20,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 308. Not endorsed by NTA.",
  },
  home_science: {
    id: "home_science",
    name: "Home Science",
    officialCode: "315",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "assertion-reasoning"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 8,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 315. Not endorsed by NTA.",
  },
  mass_media: {
    id: "mass_media",
    name: "Mass Media / Mass Communication",
    officialCode: "318",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "assertion-reasoning"],
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
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 318. Not endorsed by NTA.",
  },
  environmental_studies: {
    id: "environmental_studies",
    name: "Environmental Studies",
    officialCode: "307",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "assertion-reasoning"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 5,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 307. Not endorsed by NTA.",
  },
  fine_arts: {
    id: "fine_arts",
    name: "Fine Arts / Visual Arts",
    officialCode: "311",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "assertion-reasoning"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 4,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 311. Not endorsed by NTA.",
  },
  agriculture: {
    id: "agriculture",
    name: "Agriculture",
    officialCode: "302",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "assertion-reasoning"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 4,
      numericalTargetPercentage: 5,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 302. Not endorsed by NTA.",
  },
  anthropology: {
    id: "anthropology",
    name: "Anthropology",
    officialCode: "303",
    syllabusVersion: "CUET UG 2026 (NCERT Class 12 Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["conceptual", "case-based", "assertion-reasoning"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 4,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 20,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Domain Code 303. Not endorsed by NTA.",
  },
  english: {
    id: "english",
    name: "English",
    officialCode: "101",
    syllabusVersion: "CUET UG 2026 (Language Section 1A Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["reading-comprehension", "vocabulary", "synonyms-antonyms", "grammar", "verbal-ability"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 6,
      numericalTargetPercentage: 0,
      caseBasedTargetPercentage: 40,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Section 1A Code 101. Not endorsed by NTA.",
  },
  "general-test": {
    id: "general-test",
    name: "General Aptitude Test",
    officialCode: "501",
    syllabusVersion: "CUET UG 2026 (Section III General Test Aligned)",
    supportedStatus: "active",
    mockCount: 20,
    questionCount: 1000,
    questionTypes: ["general-knowledge", "current-affairs", "general-mental-ability", "numerical-ability", "logical-reasoning"],
    blueprint: {
      totalQuestions: 50,
      distinctChaptersMinimum: 6,
      numericalTargetPercentage: 35,
      caseBasedTargetPercentage: 15,
    },
    languageAvailability: {
      questionBank: ["en"],
      uiShell: ["en", "hi"],
    },
    lastContentAudit: "2026-09-28",
    contentStatus: "approved",
    disclaimer: "CUET UG 2026-pattern practice for Section III Code 501. Not endorsed by NTA.",
  },
};

export const SUPPORTED_SUBJECT_KEYS = Object.keys(SUPPORTED_SUBJECTS_REGISTRY);

export function getSubjectMetadata(subjectKey: string): SubjectMetadata | undefined {
  if (!subjectKey) return undefined;
  const normalized = subjectKey.toLowerCase().trim().replace(/[-_ ]/g, "");

  if (normalized === "accountancy" || normalized === "accounts" || normalized === "accs" || normalized === "acc") {
    return SUPPORTED_SUBJECTS_REGISTRY["accs"];
  }
  if (normalized === "mathematics" || normalized === "maths" || normalized === "math" || normalized === "mathematicssci" || normalized === "mathematicscom") {
    return SUPPORTED_SUBJECTS_REGISTRY["maths"];
  }
  if (normalized === "biology" || normalized === "bio") {
    return SUPPORTED_SUBJECTS_REGISTRY["bio"];
  }
  if (normalized === "economics" || normalized === "eco") {
    return SUPPORTED_SUBJECTS_REGISTRY["eco"];
  }
  if (normalized === "businessstudies" || normalized === "bst" || normalized === "business") {
    return SUPPORTED_SUBJECTS_REGISTRY["bst"];
  }
  if (normalized === "geography" || normalized === "geo") {
    return SUPPORTED_SUBJECTS_REGISTRY["geo"];
  }
  if (normalized === "polscience" || normalized === "politicalscience" || normalized === "pol") {
    return SUPPORTED_SUBJECTS_REGISTRY["pol science"];
  }
  if (normalized === "history" || normalized === "hist") {
    return SUPPORTED_SUBJECTS_REGISTRY["history"];
  }
  if (normalized === "sociology" || normalized === "soc") {
    return SUPPORTED_SUBJECTS_REGISTRY["sociology"];
  }
  if (normalized === "psychology" || normalized === "psy" || normalized === "psych") {
    return SUPPORTED_SUBJECTS_REGISTRY["psychology"];
  }
  if (normalized === "physicaleducation" || normalized === "ped" || normalized === "physical") {
    return SUPPORTED_SUBJECTS_REGISTRY["physical_education"];
  }
  if (normalized === "computerscience" || normalized === "cs" || normalized === "csip" || normalized === "informaticspractices") {
    return SUPPORTED_SUBJECTS_REGISTRY["computer_science"];
  }
  if (normalized === "homescience" || normalized === "hsc") {
    return SUPPORTED_SUBJECTS_REGISTRY["home_science"];
  }
  if (normalized === "massmedia" || normalized === "masscommunication" || normalized === "mmc") {
    return SUPPORTED_SUBJECTS_REGISTRY["mass_media"];
  }
  if (normalized === "environmentalstudies" || normalized === "environmentalscience" || normalized === "evs") {
    return SUPPORTED_SUBJECTS_REGISTRY["environmental_studies"];
  }
  if (normalized === "finearts" || normalized === "visualarts" || normalized === "fa") {
    return SUPPORTED_SUBJECTS_REGISTRY["fine_arts"];
  }
  if (normalized === "agriculture" || normalized === "agr") {
    return SUPPORTED_SUBJECTS_REGISTRY["agriculture"];
  }
  if (normalized === "anthropology" || normalized === "ant") {
    return SUPPORTED_SUBJECTS_REGISTRY["anthropology"];
  }
  if (normalized === "english" || normalized === "eng") {
    return SUPPORTED_SUBJECTS_REGISTRY["english"];
  }
  if (normalized === "generaltest" || normalized === "generalaptitudetest" || normalized === "gat" || normalized === "general") {
    return SUPPORTED_SUBJECTS_REGISTRY["general-test"];
  }

  const direct = SUPPORTED_SUBJECTS_REGISTRY[subjectKey.toLowerCase().trim()];
  if (direct) return direct;

  return undefined;
}

