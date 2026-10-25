import fs from "fs";
import path from "path";
import { Question, FullTestMeta } from "@/types";
import { resolveCanonicalTestId } from "@/lib/canonical-tests";
import { isQuestionEligibleForActiveCBT } from "@/lib/scoring";

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
  difficulty?: number | string;
  difficultyLevel?: number;
  estimatedTimeSeconds?: number;
  formula?: string;
  keyConcept?: string;
  tags?: string[];
  qualityScore?: number;
  pyqSource?: string;
}

import { SUBJECT_MOCK_DEFINITIONS, SubjectMockDefinition } from "./subject-mock-definitions";
export type { SubjectMockDefinition };
export { SUBJECT_MOCK_DEFINITIONS };

// In-memory cache for parsed JSON datasets to ensure zero file-I/O overhead on repeat visits
const mockRawDataCache = new Map<string, RawQuestion[]>();

/**
 * Loads raw question data from mock/<subjectFolder>/<mockNumber>.json
 */
export function loadRawMockData(folder: string, mockNumber: number): RawQuestion[] {
  const cacheKey = `${folder}_${mockNumber}`;
  const cached = mockRawDataCache.get(cacheKey);
  if (cached) return cached;

  let basePath = path.join(process.cwd(), "mock", folder, `${mockNumber}.json`);
  if (!fs.existsSync(basePath)) {
    const pyqFallback = path.join(process.cwd(), "pyq", folder, `${mockNumber}.json`);
    if (fs.existsSync(pyqFallback)) {
      basePath = pyqFallback;
    } else {
      const mock1Fallback = path.join(process.cwd(), "mock", folder, "1.json");
      if (fs.existsSync(mock1Fallback)) {
        basePath = mock1Fallback;
      } else {
        console.warn(`[MockLoader] Mock file not found at ${basePath}. Returning empty bank pending rebuild.`);
        return [];
      }
    }
  }

  const content = fs.readFileSync(basePath, "utf-8");
  const parsed = JSON.parse(content) as RawQuestion[];
  mockRawDataCache.set(cacheKey, parsed);
  return parsed;
}

/**
 * Loads raw PYQ question data from pyq/<subjectFolder>/<paperNumber>.json
 */
export function loadRawPYQData(folder: string, paperNumber: number): RawQuestion[] {
  const cacheKey = `pyq_${folder}_${paperNumber}`;
  const cached = mockRawDataCache.get(cacheKey);
  if (cached) return cached;

  const basePath = path.join(process.cwd(), "pyq", folder, `${paperNumber}.json`);
  if (!fs.existsSync(basePath)) {
    console.warn(`[PYQLoader] Paper not found at ${basePath}. Returning empty bank.`);
    return [];
  }

  const content = fs.readFileSync(basePath, "utf-8");
  const parsed = JSON.parse(content) as RawQuestion[];
  mockRawDataCache.set(cacheKey, parsed);
  return parsed;
}

/**
 * Loads raw practice test question data from practice/<subjectFolder>/unit<unitNumber>/<testNumber>.json
 */
export function loadRawPracticeData(folder: string, unitNumber: number, testNumber: number): RawQuestion[] {
  const cacheKey = `practice_${folder}_u${unitNumber}_t${testNumber}`;
  const cached = mockRawDataCache.get(cacheKey);
  if (cached) return cached;

  const basePath = path.join(process.cwd(), "practice", folder, `unit${unitNumber}`, `${testNumber}.json`);
  if (!fs.existsSync(basePath)) {
    console.warn(`[PracticeLoader] Practice test not found at ${basePath}. Returning empty bank.`);
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
    let difficultyStr: "easy" | "medium" | "hard" = "medium";
    let difficultyLvl: 1 | 2 | 3 = 2;

    const rawDiff = (q as any).difficulty;
    const rawDiffLvl = (q as any).difficultyLevel;

    if (rawDiffLvl === 1 || rawDiffLvl === 2 || rawDiffLvl === 3) {
      difficultyLvl = rawDiffLvl;
      difficultyStr = rawDiffLvl === 1 ? "easy" : rawDiffLvl === 2 ? "medium" : "hard";
    } else if (typeof rawDiff === "string") {
      const s = rawDiff.trim().toLowerCase();
      if (s === "easy" || s === "1") {
        difficultyStr = "easy";
        difficultyLvl = 1;
      } else if (s === "hard" || s === "4" || s === "5") {
        difficultyStr = "hard";
        difficultyLvl = 3;
      } else {
        difficultyStr = "medium";
        difficultyLvl = 2;
      }
    } else if (typeof rawDiff === "number") {
      if (rawDiff <= 1) {
        difficultyStr = "easy";
        difficultyLvl = 1;
      } else if (rawDiff >= 4) {
        difficultyStr = "hard";
        difficultyLvl = 3;
      } else {
        difficultyStr = "medium";
        difficultyLvl = 2;
      }
    } else {
      difficultyLvl = q.questionNumber <= 15 ? 1 : q.questionNumber <= 40 ? 2 : 3;
      difficultyStr = difficultyLvl === 1 ? "easy" : difficultyLvl === 2 ? "medium" : "hard";
    }

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
        mistakeAnalysis: opt.mistakeAnalysis || (opt as any).explanation || opt.studentSelectionTrap || "",
      })),
      correctOptionId:
        q.correctOption ||
        (q as any).correctOptionId ||
        (q as any).correct_option ||
        q.options?.find((o) => o.isCorrect)?.id,
      explanation:
        q.detailedSolution ||
        (q as any).explanation ||
        q.solution?.detailed ||
        (q.solution as any)?.step_by_step ||
        q.solution?.quick ||
        (q.options?.find((o) => o.isCorrect) as any)?.explanation ||
        "",
      solution: q.solution,
      questionType: q.questionType || "conceptual",
      difficulty: difficultyStr,
      difficultyLevel: difficultyLvl,
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
      section: (q as any).section,
      sectionTitle: (q as any).sectionTitle,
      isPublishable: (q as any).isPublishable,
      needs_human_review: (q as any).needs_human_review,
      official_answer_status: (q as any).official_answer_status,
    };
  });
}

/**
 * Resolves a subject definition from a test ID string using longest-match regex.
 * Returns null if no alias matches; never defaults to Physics.
 */
export function resolveSubjectDefinition(testId: string): SubjectMockDefinition | null {
  if (!testId || typeof testId !== "string") return null;
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

  // Check if testId is a UUID or alias resolvable via canonical lookup
  try {
    const canonicalSlug = resolveCanonicalTestId(testId);
    if (canonicalSlug && canonicalSlug !== testId) {
      return resolveSubjectDefinition(canonicalSlug);
    }
  } catch {}

  return null;
}

/**
 * Universal dynamic test loader supporting all 20 domain subjects & 400 mock papers
 */
export function getQuestionsForTest(testId: string): {
  testMeta: FullTestMeta;
  questions: Question[];
} {
  let resolvedId = testId;
  try {
    resolvedId = resolveCanonicalTestId(testId) || testId;
  } catch {}

  const lowerId = resolvedId.toLowerCase();
  const subjectDef = resolveSubjectDefinition(resolvedId);

  if (!subjectDef) {
    return {
      testMeta: {
        id: testId,
        title: "Unknown Examination Paper",
        subject: "Unknown",
        code: "000",
        totalQuestions: 0,
        durationMinutes: 60,
      },
      questions: [],
    };
  }

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

  // 2. Unit-wise Practice Tests
  const isPractice =
    lowerId.includes("practice") ||
    (lowerId.includes("unit") && (lowerId.includes("test") || /unit[-_]?\d+/.test(lowerId)));

  if (isPractice) {
    const unitMatch = lowerId.match(/unit[-_]?(\d+)/) || lowerId.match(/u[-_]?(\d+)/);
    const testMatch = lowerId.match(/test[-_]?(\d+)/) || lowerId.match(/t[-_]?(\d+)/) || lowerId.match(/-(\d+)$/);
    const unitNumber = unitMatch && unitMatch[1] ? parseInt(unitMatch[1], 10) : 1;
    const testNumber = testMatch && testMatch[1] ? parseInt(testMatch[1], 10) : 1;

    const rawQuestions = loadRawPracticeData(subjectDef.folder, unitNumber, testNumber);
    const firstQ = rawQuestions[0];
    const unitTitle = firstQ?.chapter || `Unit ${unitNumber}`;

    const title = `CUET UG ${subjectDef.name} - Unit ${unitNumber}: ${unitTitle} (Practice Test ${testNumber})`;
    const sourceLabel = `CUET UG Unit Practice Paper (${subjectDef.name} Unit ${unitNumber} Test ${testNumber})`;
    const notesPrefix = `CUET UG 2026 Unit Practice (${subjectDef.name} Unit ${unitNumber})`;

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
        durationMinutes: 25, // 20 questions standard timed test
      },
      questions,
    };
  }

  // 3. Official PYQ or Full-length Mock Test
  let validMockNumber = 1;
  let title = "";
  let sourceLabel = "";
  let notesPrefix = "";

  const isPYQ = lowerId.includes("pyq");

  if (isPYQ) {
    const pyqMatch = lowerId.match(/pyq[^\d]*(\d+)/) || lowerId.match(/-(\d+)$/) || lowerId.match(/(\d+)$/);
    validMockNumber = pyqMatch && pyqMatch[1] ? parseInt(pyqMatch[1], 10) : 1;
    if (validMockNumber < 1) validMockNumber = 1;

    const rawQuestions = loadRawPYQData(subjectDef.folder, validMockNumber);
    if (!rawQuestions || rawQuestions.length === 0) {
      return {
        testMeta: {
          id: testId,
          title: `CUET UG ${subjectDef.name} Official Past Paper ${validMockNumber} (Under Reconstruction)`,
          subject: subjectDef.name,
          code: subjectDef.code,
          totalQuestions: 0,
          durationMinutes: subjectDef.durationMinutes,
        },
        questions: [],
      };
    }

    // Phase 1 Containment: Filter out any question failing publication eligibility
    const eligibleRaw = rawQuestions.filter((q) => isQuestionEligibleForActiveCBT(q));

    // Verify paper completeness per official CUET UG rules:
    // If filtering leaves an incomplete paper, do not silently serve a smaller or broken exam.
    const isMaths = subjectDef.folder === "maths";
    let isPaperComplete = false;

    if (isMaths) {
      const secAValid = eligibleRaw.filter((q: any) => q.section === "A").length;
      const secB1Valid = eligibleRaw.filter((q: any) => q.section === "B1").length;
      // Authoritative NTA Maths: Section A has 15 compulsory, Section B1 has at least 25 attemptable
      isPaperComplete = secAValid === 15 && secB1Valid >= 25 && eligibleRaw.length >= 75;
    } else if (subjectDef.folder === "general-test") {
      isPaperComplete = eligibleRaw.length >= 50;
    } else {
      isPaperComplete = eligibleRaw.length >= 50;
    }

    if (!isPaperComplete) {
      return {
        testMeta: {
          id: testId,
          title: `CUET UG ${subjectDef.name} Official Past Paper ${validMockNumber} (Under Reconstruction)`,
          subject: subjectDef.name,
          code: subjectDef.code,
          totalQuestions: 0,
          durationMinutes: subjectDef.durationMinutes,
        },
        questions: [],
      };
    }

    const firstQ = eligibleRaw[0];
    const pyqSource = firstQ?.pyqSource || `CUET UG Official CBT Paper ${validMockNumber}`;

    title = `CUET UG ${subjectDef.name} Official Past Paper ${validMockNumber}`;
    sourceLabel = pyqSource;
    notesPrefix = `CUET UG Official Paper (${subjectDef.name} Shift ${validMockNumber})`;

    const questions = mapQuestionsFromDataset(
      testId,
      subjectDef.name,
      sourceLabel,
      notesPrefix,
      eligibleRaw
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
  } else {
    const match = lowerId.match(/(?:mock|paper)[-_]?(\d+)/i) || lowerId.match(/[-_](\d+)$/) || lowerId.match(/(\d+)/);
    const rawMockNumber = match && match[1] ? parseInt(match[1], 10) : 1;
    validMockNumber = rawMockNumber >= 1 && rawMockNumber <= 50 ? rawMockNumber : 1;

    const isMockTest = lowerId.includes("mock");
    title = isMockTest
      ? `CUET UG ${subjectDef.name} Full Mock Paper ${validMockNumber} (50 Compulsory Qs)`
      : `CUET UG ${subjectDef.name} Official Practice Paper ${validMockNumber} (50 Compulsory Qs)`;
    sourceLabel = title;
    notesPrefix = `CUET UG 2026 NTA Practice (${subjectDef.name} Mock ${validMockNumber})`;

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
