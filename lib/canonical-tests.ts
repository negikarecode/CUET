import { SUBJECT_MOCK_DEFINITIONS, SubjectMockDefinition } from "@/lib/data/subject-mock-definitions";
import { stringToUuid } from "@/lib/utils";

function checkFileExists(relPath: string): boolean {
  if (typeof window !== "undefined") return true;
  try {
    const nodeReq = (globalThis as any).require || eval("require");
    const fs = nodeReq("fs");
    const path = nodeReq("path");
    return fs.existsSync(path.join(process.cwd(), relPath));
  } catch {
    return true;
  }
}

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

// In-memory reverse lookup map: UUID -> Canonical Test Slug
let UUID_TO_CANONICAL_MAP: Map<string, string> | null = null;

function getUuidToCanonicalMap(): Map<string, string> {
  if (UUID_TO_CANONICAL_MAP) return UUID_TO_CANONICAL_MAP;

  const map = new Map<string, string>();

  for (const def of SUBJECT_MOCK_DEFINITIONS) {
    const canonicalSubj = def.folder.replace(/[\s_]+/g, "-");

    // Full Mocks 1 to 50
    for (let m = 1; m <= 50; m++) {
      const canonicalSlug = `${canonicalSubj}-mock-${m}`;
      map.set(stringToUuid(canonicalSlug), canonicalSlug);

      // Also map common alias forms
      map.set(stringToUuid(`${def.id}-mock-${m}`), canonicalSlug);
      map.set(stringToUuid(`${def.folder}-mock-${m}`), canonicalSlug);
      map.set(stringToUuid(`mock-${def.folder}-${m}`), canonicalSlug);
      if (m === 1) {
        map.set(stringToUuid(def.folder), canonicalSlug);
        map.set(stringToUuid(def.id), canonicalSlug);
      }
    }

    // PYQs 1 to 30
    for (let p = 1; p <= 30; p++) {
      const canonicalSlug = `${canonicalSubj}-pyq-${p}`;
      map.set(stringToUuid(canonicalSlug), canonicalSlug);
      map.set(stringToUuid(`${def.id}-pyq-${p}`), canonicalSlug);
      map.set(stringToUuid(`${def.folder}-pyq-${p}`), canonicalSlug);
      map.set(stringToUuid(`pyq-${def.folder}-${p}`), canonicalSlug);
    }

    // Practice tests (Units 1 to 15, Tests 1 to 50)
    for (let u = 1; u <= 15; u++) {
      for (let t = 1; t <= 50; t++) {
        const canonicalSlug = `practice-${canonicalSubj}-unit${u}-test${t}`;
        map.set(stringToUuid(canonicalSlug), canonicalSlug);
        map.set(stringToUuid(`practice-${def.id}-unit${u}-test${t}`), canonicalSlug);
        map.set(stringToUuid(`practice-${def.folder}-unit${u}-test${t}`), canonicalSlug);
      }
    }
  }

  UUID_TO_CANONICAL_MAP = map;
  return UUID_TO_CANONICAL_MAP;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Resolves a test ID, UUID, or attempt metadata to a single authoritative canonical key.
 * Examples:
 * - "chemistry-mock-1", "Chemistry_Mock_1", "chem-mock-1" -> "chemistry-mock-1"
 * - UUID of "chemistry-mock-1" -> "chemistry-mock-1"
 * - UUID + testTitle ("CUET UG History Full Mock Paper 1") -> "history-mock-1"
 * Returns null if the test cannot be authoritatively resolved to an authentic test.
 * NEVER defaults to Physics or any other subject.
 */
export function resolveCanonicalTestId(
  rawTestId?: string | null,
  testTitle?: string | null,
  subject?: string | null
): string | null {
  if (!rawTestId && !testTitle) return null;

  const clean = (rawTestId || "").trim().toLowerCase();

  // 1. DB-generated custom tests (e.g. Sunday ritual, adaptive drills, topic drills, or repair quizzes)
  if (
    clean.startsWith("sunday_redemption_") ||
    clean.startsWith("adaptive_drill_") ||
    clean.startsWith("repair_quiz_") ||
    clean.startsWith("topic_drill_")
  ) {
    return clean;
  }

  // 2. If it's a UUID, check precomputed UUID reverse map
  if (UUID_REGEX.test(clean)) {
    const map = getUuidToCanonicalMap();
    const resolvedFromMap = map.get(clean);
    if (resolvedFromMap) {
      return resolvedFromMap;
    }

    // If not found in static map, attempt resolution from testTitle and subject metadata
    if (testTitle || subject) {
      const titleLower = (testTitle || "").toLowerCase();
      const subjectDef = findMatchingSubjectDef(subject || "") || findMatchingSubjectDef(titleLower);

      if (subjectDef) {
        const canonicalSubj = subjectDef.folder.replace(/[\s_]+/g, "-");

        // Check if Unit practice test
        if (titleLower.includes("unit") && (titleLower.includes("practice") || titleLower.includes("test"))) {
          const uMatch = titleLower.match(/unit\s*(\d+)/i);
          const tMatch = titleLower.match(/test\s*(\d+)/i) || titleLower.match(/[-_](\d+)$/);
          const uNum = uMatch && uMatch[1] ? parseInt(uMatch[1], 10) : 1;
          const tNum = tMatch && tMatch[1] ? parseInt(tMatch[1], 10) : 1;
          return `practice-${canonicalSubj}-unit${uNum}-test${tNum}`;
        }

        // Check if PYQ
        if (titleLower.includes("pyq") || titleLower.includes("past paper")) {
          const pMatch = titleLower.match(/(?:paper|shift|pyq)\s*(\d+)/i) || titleLower.match(/(\d+)/);
          const pNum = pMatch && pMatch[1] ? parseInt(pMatch[1], 10) : 1;
          return `${canonicalSubj}-pyq-${pNum}`;
        }

        // Check if Mock
        const mMatch = titleLower.match(/(?:mock|paper)\s*(\d+)/i) || titleLower.match(/(\d+)/);
        const mNum = mMatch && mMatch[1] ? parseInt(mMatch[1], 10) : 1;
        return `${canonicalSubj}-mock-${mNum}`;
      }
    }

    // Unresolvable UUID: do not guess or fallback to Physics
    return null;
  }

  // 3. Resolve subject definition strictly from known catalog aliases
  const subjectDef = findMatchingSubjectDef(clean);
  if (!subjectDef) {
    // If rawTestId didn't match an alias, check title/subject
    if (testTitle || subject) {
      return resolveCanonicalTestId(stringToUuid(clean), testTitle, subject);
    }
    return null;
  }

  const canonicalSubj = subjectDef.folder.replace(/[\s_]+/g, "-");

  // 4. Practice Tests (Unit-wise)
  const isPractice =
    clean.includes("practice") ||
    (clean.includes("unit") && (clean.includes("test") || /unit[-_]?\d+/.test(clean)));

  if (isPractice) {
    const unitMatch = clean.match(/unit[-_]?(\d+)/i) || clean.match(/u[-_]?(\d+)/i);
    const testMatch = clean.match(/test[-_]?(\d+)/i) || clean.match(/t[-_]?(\d+)/i) || clean.match(/[-_](\d+)$/);
    const unitNum = unitMatch && unitMatch[1] ? parseInt(unitMatch[1], 10) : 1;
    const testNum = testMatch && testMatch[1] ? parseInt(testMatch[1], 10) : 1;

    if (!checkFileExists(`practice/${subjectDef.folder}/unit${unitNum}/${testNum}.json`)) {
      return null;
    }
    return `practice-${canonicalSubj}-unit${unitNum}-test${testNum}`;
  }

  // 5. PYQ Tests
  const isPYQ = clean.includes("pyq");
  if (isPYQ) {
    const pyqMatch = clean.match(/pyq[^\d]*(\d+)/i) || clean.match(/[-_](\d+)$/) || clean.match(/(\d+)$/);
    const paperNum = pyqMatch && pyqMatch[1] ? parseInt(pyqMatch[1], 10) : 1;

    if (
      !checkFileExists(`pyq/${subjectDef.folder}/${paperNum}.json`) &&
      !checkFileExists(`mock/${subjectDef.folder}/${paperNum}.json`)
    ) {
      return null;
    }
    return `${canonicalSubj}-pyq-${paperNum}`;
  }

  // 6. Mock Tests
  // Exclude unverified repair substrings from mapping into static file bank
  if (clean.includes("repair") || clean.includes("drill")) {
    return null;
  }

  const match = clean.match(/(?:mock|paper)[-_]?(\d+)/i) || clean.match(/[-_](\d+)$/) || clean.match(/(\d+)/);
  const mockNum = match && match[1] ? parseInt(match[1], 10) : 1;

  if (!checkFileExists(`mock/${subjectDef.folder}/${mockNum}.json`)) {
    return null;
  }

  return `${canonicalSubj}-mock-${mockNum}`;
}

/**
 * Resolves the destination canonical test slug from an attempt object.
 * Returns null if unresolved.
 */
export function getAuthoritativeTestSlug(attempt: {
  testId?: string | null;
  id?: string | null;
  testTitle?: string | null;
  subject?: string | null;
}): string | null {
  if (!attempt) return null;
  return resolveCanonicalTestId(attempt.testId || attempt.id, attempt.testTitle, attempt.subject);
}
