import collegesData from "@/lib/data/standing/colleges.json";
import collegeProgramsData from "@/lib/data/standing/college_programs.json";
import canonicalCoursesData from "@/lib/data/standing/canonical_courses.json";
import { CanonicalCourse } from "@/lib/standing-engine";

export interface CollegeInfo {
  id: string;
  name: string;
  shortName?: string;
  aliases: string[];
  university: string;
  campus: string;
  popular?: boolean;
  admissionBasis: "CUET" | "Class 12" | "NEET" | "other";
}

export interface CollegeProgramPair {
  collegeId: string;
  programId: string;
  years: number[];
  isCurrentlyOffered: boolean;
  admissionBasis: "CUET" | "Class 12" | "other";
}

export const COLLEGES: CollegeInfo[] = collegesData as CollegeInfo[];
export const COLLEGE_PROGRAMS: CollegeProgramPair[] = collegeProgramsData as CollegeProgramPair[];
export const CANONICAL_COURSES: CanonicalCourse[] = canonicalCoursesData as CanonicalCourse[];

// Lookup Maps
export const COLLEGES_BY_ID = new Map<string, CollegeInfo>();
export const COLLEGES_BY_CANONICAL_NAME = new Map<string, CollegeInfo>();
export const COURSES_BY_ID = new Map<string, CanonicalCourse>();
export const COURSES_BY_NAME = new Map<string, CanonicalCourse>();

COLLEGES.forEach((c) => {
  COLLEGES_BY_ID.set(c.id, c);
  COLLEGES_BY_CANONICAL_NAME.set(c.name.toLowerCase().trim(), c);
});

CANONICAL_COURSES.forEach((c) => {
  COURSES_BY_ID.set(c.id, c);
  COURSES_BY_NAME.set(c.name.toLowerCase().trim(), c);
});

// Set of offering pair keys: `${collegeId}::${programId}`
const ACTIVE_PAIR_SET = new Set<string>();
const ALL_PAIR_YEARS_MAP = new Map<string, number[]>();
const PROGRAMS_BY_COLLEGE = new Map<string, Set<string>>();
const COLLEGES_BY_PROGRAM = new Map<string, Set<string>>();

COLLEGE_PROGRAMS.forEach((p) => {
  const key = `${p.collegeId}::${p.programId}`;
  ALL_PAIR_YEARS_MAP.set(key, p.years || []);

  if (p.isCurrentlyOffered && p.admissionBasis === "CUET") {
    ACTIVE_PAIR_SET.add(key);

    if (!PROGRAMS_BY_COLLEGE.has(p.collegeId)) {
      PROGRAMS_BY_COLLEGE.set(p.collegeId, new Set());
    }
    PROGRAMS_BY_COLLEGE.get(p.collegeId)!.add(p.programId);

    if (!COLLEGES_BY_PROGRAM.has(p.programId)) {
      COLLEGES_BY_PROGRAM.set(p.programId, new Set());
    }
    COLLEGES_BY_PROGRAM.get(p.programId)!.add(p.collegeId);
  }
});

// Program Aliases for search and loose matching
const PROGRAM_ALIASES_MAP: Record<string, string> = {
  "bcom hons": "bcom_hons",
  "b.com (hons)": "bcom_hons",
  "bcom (hons)": "bcom_hons",
  "b.com. (hons.)": "bcom_hons",
  "b.com(h)": "bcom_hons",
  "(h) bcom": "bcom_hons",
  "bcom": "bcom_prog",
  "b.com": "bcom_prog",
  "bcom prog": "bcom_prog",
  "b.com. (prog)": "bcom_prog",
  "b.com program": "bcom_prog",
  "eco hons": "ba_hons_economics",
  "economics hons": "ba_hons_economics",
  "b.a. (hons) economics": "ba_hons_economics",
  "b.a. (hons.) economics": "ba_hons_economics",
  "ba econ": "ba_hons_economics",
  "ba eco": "ba_hons_economics",
  "economics": "ba_hons_economics",
  "pol science": "ba_hons_pol_science",
  "political science": "ba_hons_pol_science",
  "pol sci hons": "ba_hons_pol_science",
  "ba pol sci": "ba_hons_pol_science",
  "b.a. (hons) political science": "ba_hons_pol_science",
  "b.a. (hons.) political science": "ba_hons_pol_science",
  "history hons": "ba_hons_history",
  "history": "ba_hons_history",
  "ba history": "ba_hons_history",
  "b.a. (hons) history": "ba_hons_history",
  "b.a. (hons.) history": "ba_hons_history",
  "psychology hons": "ba_hons_psychology",
  "psychology": "ba_hons_psychology",
  "ba psych": "ba_hons_psychology",
  "b.a. (hons) psychology": "ba_hons_psychology",
  "b.a. (hons.) psychology": "ba_hons_psychology",
  "applied psychology": "ba_hons_applied_psychology",
  "b.a. (hons) applied psychology": "ba_hons_applied_psychology",
  "b.a. (hons.) applied psychology": "ba_hons_applied_psychology",
  "english hons": "ba_hons_english",
  "english": "ba_hons_english",
  "ba english": "ba_hons_english",
  "b.a. (hons) english": "ba_hons_english",
  "b.a. (hons.) english": "ba_hons_english",
  "hindi hons": "ba_hons_hindi",
  "hindi": "ba_hons_hindi",
  "ba hindi": "ba_hons_hindi",
  "b.a. (hons) hindi": "ba_hons_hindi",
  "b.a. (hons.) hindi": "ba_hons_hindi",
  "geography hons": "ba_hons_geography",
  "geography": "ba_hons_geography",
  "ba geo": "ba_hons_geography",
  "b.a. (hons) geography": "ba_hons_geography",
  "b.a. (hons.) geography": "ba_hons_geography",
  "sociology hons": "ba_hons_sociology",
  "sociology": "ba_hons_sociology",
  "ba sociology": "ba_hons_sociology",
  "b.a. (hons) sociology": "ba_hons_sociology",
  "b.a. (hons.) sociology": "ba_hons_sociology",
  "philosophy hons": "ba_hons_philosophy",
  "philosophy": "ba_hons_philosophy",
  "ba philosophy": "ba_hons_philosophy",
  "b.a. (hons) philosophy": "ba_hons_philosophy",
  "b.a. (hons.) philosophy": "ba_hons_philosophy",
  "journalism hons": "ba_hons_journalism",
  "journalism": "ba_hons_journalism",
  "ba journalism": "ba_hons_journalism",
  "b.a. (hons) journalism": "ba_hons_journalism",
  "b.a. (hons.) journalism": "ba_hons_journalism",
  "physics hons": "bsc_hons_physics",
  "physics": "bsc_hons_physics",
  "bsc physics": "bsc_hons_physics",
  "b.sc. (hons) physics": "bsc_hons_physics",
  "b.sc. (hons.) physics": "bsc_hons_physics",
  "chemistry hons": "bsc_hons_chemistry",
  "chemistry": "bsc_hons_chemistry",
  "bsc chem": "bsc_hons_chemistry",
  "b.sc. (hons) chemistry": "bsc_hons_chemistry",
  "b.sc. (hons.) chemistry": "bsc_hons_chemistry",
  "maths hons": "bsc_hons_mathematics",
  "mathematics hons": "bsc_hons_mathematics",
  "bsc maths": "bsc_hons_mathematics",
  "b.sc. (hons) mathematics": "bsc_hons_mathematics",
  "b.sc. (hons.) mathematics": "bsc_hons_mathematics",
  "stats hons": "bsc_hons_statistics",
  "statistics hons": "bsc_hons_statistics",
  "bsc stats": "bsc_hons_statistics",
  "b.sc. (hons) statistics": "bsc_hons_statistics",
  "b.sc. (hons.) statistics": "bsc_hons_statistics",
  "bsc hons cs": "bsc_hons_computer_science",
  "cs hons": "bsc_hons_computer_science",
  "computer science": "bsc_hons_computer_science",
  "b.sc. (hons) computer science": "bsc_hons_computer_science",
  "b.sc. (hons.) computer science": "bsc_hons_computer_science",
  "b.sc (hons) computer science": "bsc_hons_computer_science",
  "(h) computer science": "bsc_hons_computer_science",
  "cs": "bsc_hons_computer_science",
  "b.sc. cs": "bsc_hons_computer_science",
  "b.sc cs": "bsc_hons_computer_science",
  "bsc cs": "bsc_hons_computer_science",
  "bsc_cs": "bsc_hons_computer_science",
  "b.sc. (hons) cs": "bsc_hons_computer_science",
  "b.sc (hons) cs": "bsc_hons_computer_science",
  "bsc (hons) cs": "bsc_hons_computer_science",
  "bsc_phys": "bsc_hons_physics",
  "bsc phys": "bsc_hons_physics",
  "b.sc phys": "bsc_hons_physics",
  "b.sc. phys": "bsc_hons_physics",
  "bsc_chem": "bsc_hons_chemistry",
  "b.sc chem": "bsc_hons_chemistry",
  "b.sc. chem": "bsc_hons_chemistry",
  "bsc_math": "bsc_hons_mathematics",
  "bsc_maths": "bsc_hons_mathematics",
  "b.sc math": "bsc_hons_mathematics",
  "b.sc. math": "bsc_hons_mathematics",
  "botany hons": "bsc_hons_botany",
  "botany": "bsc_hons_botany",
  "bsc botany": "bsc_hons_botany",
  "b.sc. (hons) botany": "bsc_hons_botany",
  "b.sc. (hons.) botany": "bsc_hons_botany",
  "zoology hons": "bsc_hons_zoology",
  "zoology": "bsc_hons_zoology",
  "bsc zoology": "bsc_hons_zoology",
  "b.sc. (hons) zoology": "bsc_hons_zoology",
  "b.sc. (hons.) zoology": "bsc_hons_zoology",
  "biomedical hons": "bsc_hons_biomedical",
  "biomedical science": "bsc_hons_biomedical",
  "bsc biomedical": "bsc_hons_biomedical",
  "b.sc. (hons) biomedical science": "bsc_hons_biomedical",
  "b.sc. (hons.) biomedical science": "bsc_hons_biomedical",
  "electronics hons": "bsc_hons_electronics",
  "electronics": "bsc_hons_electronics",
  "bsc electronics": "bsc_hons_electronics",
  "b.sc. (hons) electronics": "bsc_hons_electronics",
  "b.sc. (hons.) electronics": "bsc_hons_electronics",
  "life science": "bsc_prog_life_science",
  "bsc life science": "bsc_prog_life_science",
  "b.sc. (prog.) life science": "bsc_prog_life_science",
  "physical science chemistry": "bsc_prog_phys_sci_chem",
  "b.sc. physical science with chemistry": "bsc_prog_phys_sci_chem",
  "physical science computer science": "bsc_prog_phys_sci_cs",
  "physical science with cs": "bsc_prog_phys_sci_cs",
  "bsc physical science cs": "bsc_prog_phys_sci_cs",
  "physical science electronics": "bsc_prog_phys_sci_elec",
  "bsc physical science electronics": "bsc_prog_phys_sci_elec",
  "bms": "bms",
  "bachelor of management studies": "bms",
  "bba fia": "bba_fia",
  "bfia": "bba_fia",
  "bachelor of business administration financial investment analysis": "bba_fia",
  "b.el.ed": "beled",
  "beled": "beled",
  "bachelor of elementary education": "beled",
  "ba prog": "ba_prog_general",
  "ba program": "ba_prog_general",
  "b.a. program": "ba_prog_general",
  "bhu arts": "ba_arts_bhu",
  "b.a. (hons.) arts": "ba_arts_bhu",
  "bhu social sciences": "ba_socsci_bhu",
  "b.a. (hons.) social sciences": "ba_socsci_bhu",
  "bsc agriculture": "bsc_agri",
  "agriculture": "bsc_agri",
  "b.sc. (hons.) agriculture": "bsc_agri",
  "ba llb": "ba_llb_hons",
  "ballb": "ba_llb_hons",
  "b.a. ll.b. (hons.)": "ba_llb_hons",
  "bba": "bba_prog",
  "b.b.a.": "bba_prog",
  "bca": "bca_prog",
  "b.c.a.": "bca_prog",
  "biotech": "bsc_biotech",
  "b.sc. (hons.) biotechnology": "bsc_biotech",
  "french hons": "ba_hons_french",
  "french": "ba_hons_french",
  "b.a. (hons.) french": "ba_hons_french",
  "german hons": "ba_hons_german",
  "german": "ba_hons_german",
  "b.a. (hons.) german": "ba_hons_german",
  "spanish hons": "ba_hons_spanish",
  "spanish": "ba_hons_spanish",
  "b.a. (hons.) spanish": "ba_hons_spanish",
  "japanese hons": "ba_hons_japanese",
  "japanese": "ba_hons_japanese",
  "b.a. (hons.) japanese": "ba_hons_japanese",
  "korean hons": "ba_hons_korean",
  "korean": "ba_hons_korean",
  "b.a. (hons.) korean": "ba_hons_korean",
  "chinese hons": "ba_hons_chinese",
  "chinese": "ba_hons_chinese",
  "b.a. (hons.) chinese": "ba_hons_chinese",
  "russian hons": "ba_hons_russian",
  "russian": "ba_hons_russian",
  "b.a. (hons.) russian": "ba_hons_russian",
  "arabic hons": "ba_hons_arabic",
  "arabic": "ba_hons_arabic",
  "b.a. (hons.) arabic": "ba_hons_arabic",
  "persian hons": "ba_hons_persian",
  "persian": "ba_hons_persian",
  "b.a. (hons.) persian": "ba_hons_persian",
  "pashto hons": "ba_hons_pashto",
  "pashto": "ba_hons_pashto",
  "b.a. (hons.) pashto": "ba_hons_pashto",
};

/**
 * Resolves any college name, id, acronym or alias to canonical CollegeInfo.
 */
export function resolveCollege(input?: string | null): CollegeInfo | undefined {
  if (!input) return undefined;
  const raw = input.trim();
  const lower = raw.toLowerCase();

  // 1. Direct ID match
  if (COLLEGES_BY_ID.has(raw)) return COLLEGES_BY_ID.get(raw);
  if (COLLEGES_BY_ID.has(lower)) return COLLEGES_BY_ID.get(lower);

  // 2. Canonical Name match
  if (COLLEGES_BY_CANONICAL_NAME.has(lower)) return COLLEGES_BY_CANONICAL_NAME.get(lower);

  // 3. Match by shortName / aliases
  for (const c of COLLEGES) {
    if (c.shortName && c.shortName.toLowerCase() === lower) return c;
    for (const a of c.aliases) {
      if (a.toLowerCase() === lower) return c;
    }
  }

  // 4. Clean search without parentheticals (preserving Evening/Day)
  const cleanInput = lower.replace(/\((?!evening|day)[^)]*\)/g, "").replace(/[^a-z0-9]/g, "");
  for (const c of COLLEGES) {
    const cleanC = c.name.toLowerCase().replace(/\((?!evening|day)[^)]*\)/g, "").replace(/[^a-z0-9]/g, "");
    if (cleanC === cleanInput) return c;
    for (const a of c.aliases) {
      const cleanA = a.toLowerCase().replace(/\((?!evening|day)[^)]*\)/g, "").replace(/[^a-z0-9]/g, "");
      if (cleanA === cleanInput) return c;
    }
  }

  // 5. Fallback substring/token search
  const isEvening = lower.includes("evening");
  const candidates = COLLEGES.filter((c) => {
    const cIsEvening = c.name.toLowerCase().includes("evening") || c.id.includes("eve");
    return isEvening === cIsEvening;
  });

  for (const c of candidates) {
    if (cleanInput.length >= 3) {
      const cleanC = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (cleanC.includes(cleanInput) || cleanInput.includes(cleanC)) {
        return c;
      }
      for (const a of c.aliases) {
        const cleanA = a.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (cleanA.includes(cleanInput) || cleanInput.includes(cleanA)) {
          return c;
        }
      }
    }
  }

  return undefined;
}

/**
 * Resolves any course name, id, acronym or alias to canonical CanonicalCourse.
 */
export function resolveProgram(input?: string | null): CanonicalCourse | undefined {
  if (!input) return undefined;
  const raw = input.trim();
  const lower = raw.toLowerCase();

  // 1. Direct ID match
  if (COURSES_BY_ID.has(raw)) return COURSES_BY_ID.get(raw);
  if (COURSES_BY_ID.has(lower)) return COURSES_BY_ID.get(lower);

  // 2. Canonical Name match
  if (COURSES_BY_NAME.has(lower)) return COURSES_BY_NAME.get(lower);

  // 3. Known Aliases Map
  if (PROGRAM_ALIASES_MAP[lower]) {
    const cid = PROGRAM_ALIASES_MAP[lower];
    return COURSES_BY_ID.get(cid);
  }

  // 4. Normalized alphanumeric match
  const clean = lower.replace(/[^a-z0-9]/g, "");
  for (const c of CANONICAL_COURSES) {
    const cClean = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cClean === clean) return c;
  }

  // 5. Check alias keys cleaned
  for (const [aliasKey, cid] of Object.entries(PROGRAM_ALIASES_MAP)) {
    const aClean = aliasKey.replace(/[^a-z0-9]/g, "");
    if (aClean === clean) {
      return COURSES_BY_ID.get(cid);
    }
  }

  // 6. Substring match
  for (const c of CANONICAL_COURSES) {
    const cClean = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (clean.length >= 3 && (cClean.includes(clean) || clean.includes(cClean))) {
      return c;
    }
  }

  return undefined;
}

/**
 * Returns programs offered by a college (optionally filtered by stream or showUnavailable).
 */
export function getProgramsForCollege(
  collegeIdOrName: string,
  options?: {
    stream?: string;
    showUnavailable?: boolean;
  }
): CanonicalCourse[] {
  const college = resolveCollege(collegeIdOrName);
  if (!college) return [];

  const streamFilter = options?.stream && options.stream.toLowerCase() !== "all"
    ? options.stream.toLowerCase()
    : null;

  if (options?.showUnavailable) {
    // Return all courses, but with an indication if needed
    return CANONICAL_COURSES.filter((c) => {
      if (streamFilter && c.stream.toLowerCase() !== streamFilter) return false;
      return true;
    });
  }

  const offeredSet = PROGRAMS_BY_COLLEGE.get(college.id) || new Set<string>();
  return CANONICAL_COURSES.filter((c) => {
    if (!offeredSet.has(c.id)) return false;
    if (streamFilter && c.stream.toLowerCase() !== streamFilter) return false;
    return true;
  });
}

/**
 * Returns colleges offering a program (optionally showing unavailable).
 */
export function getCollegesForProgram(
  programIdOrName: string,
  options?: {
    showUnavailable?: boolean;
    university?: string;
  }
): CollegeInfo[] {
  const program = resolveProgram(programIdOrName);
  if (!program) return [];

  const univFilter = options?.university && options.university.toLowerCase() !== "all"
    ? options.university.toLowerCase()
    : null;

  if (options?.showUnavailable) {
    return COLLEGES.filter((c) => {
      if (c.admissionBasis !== "CUET") return false;
      if (univFilter && c.university.toLowerCase() !== univFilter) return false;
      return true;
    });
  }

  const offeringSet = COLLEGES_BY_PROGRAM.get(program.id) || new Set<string>();
  return COLLEGES.filter((c) => {
    if (!offeringSet.has(c.id)) return false;
    if (univFilter && c.university.toLowerCase() !== univFilter) return false;
    return true;
  });
}

/**
 * Checks if a (college, program) pair is valid in the offering map.
 */
export function isValidPair(
  collegeIdOrName?: string | null,
  programIdOrName?: string | null
): boolean {
  if (!collegeIdOrName || !programIdOrName) return false;
  const col = resolveCollege(collegeIdOrName);
  const prog = resolveProgram(programIdOrName);
  if (!col || !prog) return false;

  const key = `${col.id}::${prog.id}`;
  return ACTIVE_PAIR_SET.has(key);
}

/**
 * Returns years with cutoff data for a pair.
 */
export function getPairCutoffYears(
  collegeIdOrName: string,
  programIdOrName: string
): number[] {
  const col = resolveCollege(collegeIdOrName);
  const prog = resolveProgram(programIdOrName);
  if (!col || !prog) return [];
  const key = `${col.id}::${prog.id}`;
  return ALL_PAIR_YEARS_MAP.get(key) || [];
}

/**
 * Checks if a valid pair has cutoff records.
 */
export function hasCutoffData(
  collegeIdOrName: string,
  programIdOrName: string
): boolean {
  const years = getPairCutoffYears(collegeIdOrName, programIdOrName);
  return years.length > 0;
}

/**
 * Derives University name directly from a college.
 */
export function getUniversityForCollege(collegeIdOrName?: string | null): string {
  if (!collegeIdOrName) return "University of Delhi";
  const col = resolveCollege(collegeIdOrName);
  return col?.university || "University of Delhi";
}

/**
 * Validates a target pair strictly for server actions and API routes.
 */
export function validateTargetPair(
  collegeInput: string,
  courseInput: string
): {
  isValid: boolean;
  college?: CollegeInfo;
  program?: CanonicalCourse;
  error?: string;
} {
  const col = resolveCollege(collegeInput);
  if (!col) {
    return {
      isValid: false,
      error: `Unrecognized or invalid college: "${collegeInput}". Please choose a verified institution.`,
    };
  }

  const prog = resolveProgram(courseInput);
  if (!prog) {
    return {
      isValid: false,
      error: `Unrecognized or invalid course: "${courseInput}". Please choose a valid degree program.`,
    };
  }

  const key = `${col.id}::${prog.id}`;
  if (!ACTIVE_PAIR_SET.has(key)) {
    return {
      isValid: false,
      college: col,
      program: prog,
      error: `${col.name} does not offer ${prog.name}. Please select a course offered by this college.`,
    };
  }

  return {
    isValid: true,
    college: col,
    program: prog,
  };
}
