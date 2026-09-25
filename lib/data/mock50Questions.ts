import fs from "fs";
import path from "path";
import { Question, FullTestMeta } from "@/types";

export type { FullTestMeta };

export interface RawQuestionOption {
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

export interface RawQuestion {
  questionNumber: number;
  questionId?: string;
  conceptId?: string;
  chapter: string;
  topic: string;
  questionText: string;
  hasDiagram?: boolean;
  diagramDescription?: string | null;
  options: RawQuestionOption[];
  correctOption: "A" | "B" | "C" | "D";
  detailedSolution: string;
  solution?: {
    quick: string;
    concept: string;
    detailed: string;
  };
  questionType?: any;
  difficulty?: number;
  estimatedTimeSeconds?: number;
  formula?: string;
  keyConcept?: string;
  tags?: string[];
  qualityScore?: number;
}

export interface SubjectMockDefinition {
  id: string;
  folder: string;
  code: string;
  name: string;
  durationMinutes: number;
  aliases: string[];
}

export const SUBJECT_MOCK_DEFINITIONS: SubjectMockDefinition[] = [
  { id: "physics", folder: "physics", code: "312", name: "Physics", durationMinutes: 60, aliases: ["physics", "phys"] },
  { id: "chemistry", folder: "chemistry", code: "306", name: "Chemistry", durationMinutes: 60, aliases: ["chemistry", "chem"] },
  { id: "maths", folder: "maths", code: "319", name: "Mathematics", durationMinutes: 60, aliases: ["maths", "mathematics", "math"] },
  { id: "bio", folder: "bio", code: "304", name: "Biology", durationMinutes: 45, aliases: ["biology", "bio"] },
  { id: "accountancy", folder: "accountancy", code: "301", name: "Accountancy", durationMinutes: 60, aliases: ["accountancy", "accounts", "accs", "account"] },
  { id: "eco", folder: "eco", code: "309", name: "Economics", durationMinutes: 60, aliases: ["economics", "eco"] },
  { id: "bst", folder: "bst", code: "305", name: "Business Studies", durationMinutes: 45, aliases: ["business-studies", "business_studies", "business", "bst"] },
  { id: "history", folder: "history", code: "314", name: "History", durationMinutes: 45, aliases: ["history", "hist"] },
  { id: "pol science", folder: "pol science", code: "323", name: "Political Science", durationMinutes: 45, aliases: ["political-science", "political_science", "pol-science", "pol_science", "polscience", "pol"] },
  { id: "geo", folder: "geo", code: "313", name: "Geography", durationMinutes: 45, aliases: ["geography", "geo"] },
  { id: "psychology", folder: "psychology", code: "324", name: "Psychology", durationMinutes: 45, aliases: ["psychology", "psy", "psych"] },
  { id: "sociology", folder: "sociology", code: "325", name: "Sociology", durationMinutes: 45, aliases: ["sociology", "soc"] },
  { id: "physical_education", folder: "physical_education", code: "321", name: "Physical Education", durationMinutes: 45, aliases: ["physical-education", "physical_education", "physical", "ped"] },
  { id: "computer_science", folder: "computer_science", code: "308", name: "Computer Science / Informatics Practices", durationMinutes: 60, aliases: ["computer-science", "computer_science", "csip", "informatics", "cs"] },
  { id: "home_science", folder: "home_science", code: "315", name: "Home Science", durationMinutes: 45, aliases: ["home-science", "home_science", "hsc"] },
  { id: "mass_media", folder: "mass_media", code: "318", name: "Mass Media / Mass Communication", durationMinutes: 45, aliases: ["mass-media", "mass_media", "masscomm", "media", "mmc"] },
  { id: "environmental_studies", folder: "environmental_studies", code: "307", name: "Environmental Studies", durationMinutes: 45, aliases: ["environmental-studies", "environmental_studies", "environmental", "evs"] },
  { id: "fine_arts", folder: "fine_arts", code: "311", name: "Fine Arts / Visual Arts", durationMinutes: 45, aliases: ["fine-arts", "fine_arts", "visual-arts", "visual_arts", "finearts", "fa"] },
  { id: "agriculture", folder: "agriculture", code: "302", name: "Agriculture", durationMinutes: 45, aliases: ["agriculture", "agr"] },
  { id: "anthropology", folder: "anthropology", code: "303", name: "Anthropology", durationMinutes: 45, aliases: ["anthropology", "ant"] },
];

// In-memory cache for parsed JSON datasets to ensure zero file-I/O overhead on repeat visits
const mockRawDataCache = new Map<string, RawQuestion[]>();

/**
 * Loads raw question data from mock/<subjectFolder>/<mockNumber>.json
 */
export function loadRawMockData(folder: string, mockNumber: number): RawQuestion[] {
  const cacheKey = `${folder}_${mockNumber}`;
  const cached = mockRawDataCache.get(cacheKey);
  if (cached) return cached;

  const basePath = path.join(process.cwd(), "mock", folder, `${mockNumber}.json`);
  if (!fs.existsSync(basePath)) {
    console.warn(`[MockLoader] Mock file not found at ${basePath}. Returning empty bank pending rebuild.`);
    return [];
  }

  const content = fs.readFileSync(basePath, "utf-8");
  const parsed = JSON.parse(content) as RawQuestion[];
  mockRawDataCache.set(cacheKey, parsed);
  return parsed;
}

/**
 * Transforms raw mock dataset questions to runtime Question objects
 */
export function mapQuestionsFromDataset(
  testId: string,
  subjectId: string,
  sourceLabel: string,
  notesPrefix: string,
  data: RawQuestion[]
): Question[] {
  return data.map((q) => {
    const rawDiff = q.difficulty ?? (q.questionNumber <= 15 ? 1 : q.questionNumber <= 35 ? 3 : 4);
    const difficultyStr: "easy" | "medium" | "hard" =
      rawDiff <= 2 ? "easy" : rawDiff === 3 ? "medium" : "hard";

    return {
      id: `${testId}_q_${q.questionNumber.toString().padStart(2, "0")}`,
      questionId: q.questionId || `${testId}_q_${q.questionNumber.toString().padStart(2, "0")}`,
      conceptId: q.conceptId,
      subjectId,
      questionNumber: q.questionNumber,
      prompt: q.questionText,
      chapter: q.chapter,
      options: (q.options || []).map((opt) => ({
        id: opt.id,
        text: opt.text,
        isCorrect: opt.isCorrect,
        misconception: opt.misconception,
        studentSelectionTrap: opt.studentSelectionTrap,
        mistakeAnalysis: opt.mistakeAnalysis,
      })),
      correctOptionId: q.correctOption,
      explanation: q.detailedSolution,
      solution: q.solution,
      questionType: q.questionType || "conceptual",
      difficulty: difficultyStr,
      difficultyLevel: (q.difficulty ?? 3) as any,
      estimatedTimeSeconds: q.estimatedTimeSeconds || 60,
      formula: q.formula,
      keyConcept: q.keyConcept,
      tags: q.tags || ["CUET UG 2026", subjectId],
      qualityScore: q.qualityScore || 95,
      hasDiagram: q.hasDiagram || false,
      diagramDescription: q.diagramDescription || null,
      aiDiagnosisNotes: `${notesPrefix} - ${q.topic} (Question ${q.questionNumber})`,
      pyqSource: sourceLabel,
      topic: q.topic,
    };
  });
}

/**
 * Resolves a subject definition from a test ID string using longest-match regex
 */
export function resolveSubjectDefinition(testId: string): SubjectMockDefinition {
  const cleanId = testId.toLowerCase();

  // Create sorted alias array by length descending to prevent false short-prefix matches
  const sortedAliases: Array<{ alias: string; def: SubjectMockDefinition }> = [];
  for (const def of SUBJECT_MOCK_DEFINITIONS) {
    for (const alias of def.aliases) {
      sortedAliases.push({ alias, def });
    }
  }
  sortedAliases.sort((a, b) => b.alias.length - a.alias.length);

  for (const item of sortedAliases) {
    const regex = new RegExp("(^|[\\-_\\s])" + item.alias.replace(/[-\s]/g, "[-_\\s]?") + "([\\-_\\s]|$)", "i");
    if (regex.test(cleanId) || cleanId.startsWith(item.alias)) {
      return item.def;
    }
  }

  return SUBJECT_MOCK_DEFINITIONS[0] as SubjectMockDefinition;
}

/**
 * Universal dynamic test loader supporting all 20 domain subjects & 400 mock papers
 */
export function getQuestionsForTest(testId: string): {
  testMeta: FullTestMeta;
  questions: Question[];
} {
  const lowerId = testId.toLowerCase();
  const subjectDef = resolveSubjectDefinition(testId);

  // 1. AI Repair Drills and Adaptive Quizzes (repair_quiz_... or drill_...)
  if (lowerId.includes("repair") || lowerId.includes("drill")) {
    const rawQuestions = loadRawMockData(subjectDef.folder, 1);
    const mapped = mapQuestionsFromDataset(
      testId,
      subjectDef.name,
      `CUET UG ${subjectDef.name} Adaptive Repair Drill`,
      `CUET AI Adaptive Diagnostics (${subjectDef.name})`,
      rawQuestions
    );

    const drillQuestions = mapped.slice(0, 5).map((q, idx) => ({
      ...q,
      questionNumber: idx + 1,
      id: `${testId}_q_${(idx + 1).toString().padStart(2, "0")}`,
    }));

    return {
      testMeta: {
        id: testId,
        title: `CUET AI Adaptive Repair Drill (${subjectDef.name})`,
        subject: subjectDef.name,
        code: subjectDef.code,
        totalQuestions: 5,
        durationMinutes: 8,
      },
      questions: drillQuestions,
    };
  }

  // 2. Official PYQ or Full-length Mock Test
  let validMockNumber = 1;
  let title = "";
  let sourceLabel = "";
  let notesPrefix = "";

  if (lowerId.includes("pyq")) {
    let year = "2024";
    let shift = "Shift 1";

    if (lowerId.includes("2024-s2") || lowerId.includes("2024_s2") || lowerId.endsWith("-2")) {
      validMockNumber = 2;
      year = "2024";
      shift = "Shift 2";
    } else if (lowerId.includes("2023-s1") || lowerId.includes("2023_s1") || lowerId.endsWith("-3")) {
      validMockNumber = 3;
      year = "2023";
      shift = "Shift 1";
    } else if (lowerId.includes("2023-s2") || lowerId.includes("2023_s2") || lowerId.endsWith("-4")) {
      validMockNumber = 4;
      year = "2023";
      shift = "Shift 2";
    } else if (lowerId.includes("2022") || lowerId.endsWith("-5")) {
      validMockNumber = 5;
      year = "2022";
      shift = "Official CBT";
    } else {
      validMockNumber = 1;
      year = "2024";
      shift = "Shift 1";
    }

    title = shift === "Official CBT"
      ? `CUET UG ${year} ${subjectDef.name} (Official CBT Paper)`
      : `CUET UG ${year} ${subjectDef.name} (${shift} Official CBT)`;
    sourceLabel = shift === "Official CBT"
      ? `CUET UG ${year} Official NTA CBT Paper`
      : `CUET UG ${year} (${shift} Official NTA CBT Paper)`;
    notesPrefix = `CUET UG ${year} Official Paper (${subjectDef.name})`;
  } else {
    const match = lowerId.match(/(\d+)/);
    const rawMockNumber = match && match[1] ? parseInt(match[1], 10) : 1;
    validMockNumber = rawMockNumber >= 1 && rawMockNumber <= 20 ? rawMockNumber : 1;

    const isMockTest = lowerId.includes("mock");
    title = isMockTest
      ? `CUET UG ${subjectDef.name} Full Mock Paper ${validMockNumber} (50 Compulsory Qs)`
      : `CUET UG ${subjectDef.name} Official Practice Paper ${validMockNumber} (50 Compulsory Qs)`;
    sourceLabel = title;
    notesPrefix = `CUET UG 2026 NTA Practice (${subjectDef.name} Mock ${validMockNumber})`;
  }

  const rawQuestions = loadRawMockData(subjectDef.folder, validMockNumber);

  const questions = mapQuestionsFromDataset(
    testId,
    subjectDef.name,
    sourceLabel,
    notesPrefix,
    rawQuestions
  );

  return {
    testMeta: {
      id: testId,
      title,
      subject: subjectDef.name,
      code: subjectDef.code,
      totalQuestions: questions.length,
      durationMinutes: subjectDef.durationMinutes,
    },
    questions,
  };
}

// Convenience backward-compatible helper functions
export const get50PhysicsMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`physics-mock-${mockNum}`).questions;
export const get50ChemistryMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`chemistry-mock-${mockNum}`).questions;
export const get50MathsMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`maths-mock-${mockNum}`).questions;
export const get50BiologyMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`bio-mock-${mockNum}`).questions;
export const get50AccountancyMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`accountancy-mock-${mockNum}`).questions;
export const get50EconomicsMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`eco-mock-${mockNum}`).questions;
export const get50BstMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`bst-mock-${mockNum}`).questions;
export const get50HistoryMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`history-mock-${mockNum}`).questions;
export const get50PoliticalScienceMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`pol-science-mock-${mockNum}`).questions;
export const get50GeographyMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`geo-mock-${mockNum}`).questions;
export const get50PsychologyMockQuestions = (mockNum: number, _testId?: string) =>
  getQuestionsForTest(`psychology-mock-${mockNum}`).questions;
