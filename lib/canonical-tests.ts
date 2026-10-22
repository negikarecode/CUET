import fs from "fs";
import path from "path";
import { SUBJECT_MOCK_DEFINITIONS, SubjectMockDefinition } from "@/lib/data/mock50Questions";

/**
 * Resolves a subject definition strictly if one of its known aliases matches the testId.
 * Never silently defaults to Physics if no alias matches.
 */
export function findMatchingSubjectDef(testId: string): SubjectMockDefinition | null {
  const cleanId = (testId || "").toLowerCase();
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
  return null;
}

/**
 * Maps any test ID alias, casing, or separator variant to a single authoritative canonical key.
 * Examples:
 * - "physics-mock-1", "Physics_Mock_1", "physics-mock-01", "phys-mock-1" -> "physics-mock-1"
 * - "practice_physics_unit01_test01" -> "practice-physics-unit1-test1"
 * - "Physics_PYQ_01" -> "physics-pyq-1"
 * Returns null if the testId cannot be authoritatively resolved to an authentic test.
 */
export function resolveCanonicalTestId(rawTestId?: string | null): string | null {
  if (!rawTestId || typeof rawTestId !== "string") return null;
  const clean = rawTestId.trim().toLowerCase();
  if (!clean) return null;

  // 1. DB-generated custom tests (e.g. Sunday ritual, adaptive drills, or repair quizzes)
  if (
    clean.startsWith("sunday_redemption_") ||
    clean.startsWith("adaptive_drill_") ||
    clean.startsWith("repair_quiz_")
  ) {
    return clean;
  }

  // 2. Resolve subject definition strictly from known catalog aliases
  const subjectDef = findMatchingSubjectDef(clean);
  if (!subjectDef) {
    return null;
  }

  const canonicalSubj = subjectDef.folder.replace(/[\s_]+/g, "-");

  // 3. Practice Tests (Unit-wise)
  const isPractice =
    clean.includes("practice") ||
    (clean.includes("unit") && (clean.includes("test") || /unit[-_]?\d+/.test(clean)));

  if (isPractice) {
    const unitMatch = clean.match(/unit[-_]?(\d+)/i) || clean.match(/u[-_]?(\d+)/i);
    const testMatch = clean.match(/test[-_]?(\d+)/i) || clean.match(/t[-_]?(\d+)/i) || clean.match(/[-_](\d+)$/);
    const unitNum = unitMatch && unitMatch[1] ? parseInt(unitMatch[1], 10) : 1;
    const testNum = testMatch && testMatch[1] ? parseInt(testMatch[1], 10) : 1;

    const pPath = path.join(process.cwd(), "practice", subjectDef.folder, `unit${unitNum}`, `${testNum}.json`);
    if (!fs.existsSync(pPath)) {
      return null;
    }
    return `practice-${canonicalSubj}-unit${unitNum}-test${testNum}`;
  }

  // 4. PYQ Tests
  const isPYQ = clean.includes("pyq");
  if (isPYQ) {
    const pyqMatch = clean.match(/pyq[^\d]*(\d+)/i) || clean.match(/[-_](\d+)$/) || clean.match(/(\d+)$/);
    const paperNum = pyqMatch && pyqMatch[1] ? parseInt(pyqMatch[1], 10) : 1;

    const pyqPath = path.join(process.cwd(), "pyq", subjectDef.folder, `${paperNum}.json`);
    const mockPath = path.join(process.cwd(), "mock", subjectDef.folder, `${paperNum}.json`);
    if (!fs.existsSync(pyqPath) && !fs.existsSync(mockPath)) {
      return null;
    }
    return `${canonicalSubj}-pyq-${paperNum}`;
  }

  // 5. Mock Tests
  // Exclude unverified repair substrings from mapping into static file bank
  if (clean.includes("repair") || clean.includes("drill")) {
    return null;
  }

  const match = clean.match(/(?:mock|paper)[-_]?(\d+)/i) || clean.match(/[-_](\d+)$/) || clean.match(/(\d+)/);
  const mockNum = match && match[1] ? parseInt(match[1], 10) : 1;

  const mockPath = path.join(process.cwd(), "mock", subjectDef.folder, `${mockNum}.json`);
  if (!fs.existsSync(mockPath)) {
    return null;
  }

  return `${canonicalSubj}-mock-${mockNum}`;
}
