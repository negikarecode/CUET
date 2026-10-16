import assert from "assert";
import {
  COLLEGES,
  CANONICAL_COURSES,
  COLLEGE_PROGRAMS,
  resolveCollege,
  resolveProgram,
  isValidPair,
  getProgramsForCollege,
  getCollegesForProgram,
  getUniversityForCollege,
  validateTargetPair,
  hasCutoffData,
} from "../lib/college-offerings";
import { getProjectedCutoff } from "../lib/standing-engine";

function runTests() {
  console.log("=================================================================");
  console.log("       AUTOMATED TEST SUITE: CASCADING TARGET SELECTOR           ");
  console.log("=================================================================\n");

  let passed = 0;
  let total = 0;

  function test(name: string, fn: () => void) {
    total++;
    try {
      fn();
      passed++;
      console.log(`  ✓ [PASS] ${name}`);
    } catch (err: any) {
      console.error(`  ✗ [FAIL] ${name}: ${err.message}`);
    }
  }

  // 1. Resolver & Canonical Integrity Tests
  test("Resolves popular college names and aliases accurately", () => {
    const srcc = resolveCollege("SRCC");
    assert.strictEqual(srcc?.id, "srcc");
    assert.strictEqual(srcc?.name, "Shri Ram College of Commerce (SRCC)");

    const stephens = resolveCollege("Stephen's");
    assert.strictEqual(stephens?.id, "st-stephens");

    const hindu = resolveCollege("Hindu");
    assert.strictEqual(hindu?.id, "hindu");

    const miranda = resolveCollege("Miranda House");
    assert.strictEqual(miranda?.id, "miranda");
  });

  test("Resolves course names, IDs, and common aliases accurately", () => {
    const bcomHons = resolveProgram("B.Com (Hons)");
    assert.strictEqual(bcomHons?.id, "bcom_hons");

    const polSci = resolveProgram("Political Science");
    assert.strictEqual(polSci?.id, "ba_hons_pol_science");

    const bscPhys = resolveProgram("B.Sc. (Hons.) Physics");
    assert.strictEqual(bscPhys?.id, "bsc_hons_physics");

    const eco = resolveProgram("Economics");
    assert.strictEqual(eco?.id, "ba_hons_economics");
  });

  // 2. Mutual Dependency & Offering Map Verification
  test("SRCC only offers Commerce and Economics programs", () => {
    const srcc = resolveCollege("SRCC")!;
    const programs = getProgramsForCollege(srcc.id);
    const progIds = programs.map((p) => p.id);

    assert(progIds.includes("bcom_hons"), "SRCC must offer B.Com (Hons)");
    assert(progIds.includes("ba_hons_economics"), "SRCC must offer B.A. (Hons) Economics");
    assert(!progIds.includes("ba_hons_pol_science"), "SRCC must NOT offer Political Science");
    assert(!progIds.includes("bsc_hons_physics"), "SRCC must NOT offer Physics");
  });

  test("St. Stephen's does NOT offer B.Com (Hons)", () => {
    const stephens = resolveCollege("St. Stephen's College")!;
    const programs = getProgramsForCollege(stephens.id);
    const progIds = programs.map((p) => p.id);

    assert(!progIds.includes("bcom_hons"), "St. Stephen's must NOT offer B.Com (Hons)");
    assert(progIds.includes("ba_hons_economics"), "St. Stephen's must offer Economics");
    assert(progIds.includes("bsc_hons_physics"), "St. Stephen's must offer Physics");
    assert(progIds.includes("ba_hons_history"), "St. Stephen's must offer History");
  });

  test("Political Science course is only offered by colleges with Arts faculties", () => {
    const polSci = resolveProgram("ba_hons_pol_science")!;
    const offeringColleges = getCollegesForProgram(polSci.id);
    const colIds = offeringColleges.map((c) => c.id);

    assert(!colIds.includes("srcc"), "SRCC must not be in Pol Sci offering colleges");
    assert(colIds.includes("hindu"), "Hindu must be in Pol Sci offering colleges");
    assert(colIds.includes("miranda"), "Miranda House must be in Pol Sci offering colleges");
  });

  // 3. Bidirectional Cascading Validation Logic
  test("isValidPair returns true only for valid (college, program) combinations", () => {
    assert.strictEqual(isValidPair("SRCC", "B.Com. (Hons.)"), true);
    assert.strictEqual(isValidPair("SRCC", "B.A. (Hons.) Economics"), true);
    assert.strictEqual(isValidPair("SRCC", "B.A. (Hons.) Political Science"), false);
    assert.strictEqual(isValidPair("St. Stephen's College", "B.Com. (Hons.)"), false);
    assert.strictEqual(isValidPair("St. Stephen's College", "B.Sc. (Hons.) Physics"), true);
    assert.strictEqual(isValidPair("Hindu College", "B.Sc. (Hons.) Physics"), true);
    assert.strictEqual(isValidPair("Hindu College", "B.A. (Hons.) Political Science"), true);
    assert.strictEqual(isValidPair("Invalid College", "B.Com. (Hons.)"), false);
    assert.strictEqual(isValidPair("SRCC", "Invalid Course"), false);
  });

  // 4. Server-Side Validation Rules
  test("validateTargetPair succeeds for valid pairs and rejects invalid with explanatory error", () => {
    const validRes = validateTargetPair("SRCC", "B.Com. (Hons.)");
    assert.strictEqual(validRes.isValid, true);
    assert.strictEqual(validRes.college?.id, "srcc");
    assert.strictEqual(validRes.program?.id, "bcom_hons");

    const invalidRes = validateTargetPair("SRCC", "B.A. (Hons.) Political Science");
    assert.strictEqual(invalidRes.isValid, false);
    assert(
      invalidRes.error?.includes("does not offer"),
      `Expected error message to explain missing offering, got: ${invalidRes.error}`
    );

    const stephensBcom = validateTargetPair("St. Stephen's College", "B.Com. (Hons.)");
    assert.strictEqual(stephensBcom.isValid, false);
    assert(stephensBcom.error?.includes("St. Stephen's College does not offer"));

    const unknownCol = validateTargetPair("Hogwarts School", "B.Com. (Hons.)");
    assert.strictEqual(unknownCol.isValid, false);
    assert(unknownCol.error?.includes("Unrecognized or invalid college"));

    const unknownCourse = validateTargetPair("Hindu College", "B.Tech Quantum Sorcery");
    assert.strictEqual(unknownCourse.isValid, false);
    assert(unknownCourse.error?.includes("Unrecognized or invalid course"));
  });

  // 5. University Derivation
  test("Target university is derived deterministically from college", () => {
    assert.strictEqual(getUniversityForCollege("SRCC"), "University of Delhi");
    assert.strictEqual(getUniversityForCollege("Hindu College"), "University of Delhi");
    assert.strictEqual(getUniversityForCollege("Faculty of Main Campus (FMC), BHU"), "Banaras Hindu University");
    assert.strictEqual(getUniversityForCollege("School of Language, Literature and Culture Studies (SLL&CS), JNU"), "Jawaharlal Nehru University");
    assert.strictEqual(getUniversityForCollege("Unknown College"), "University of Delhi");
  });

  // 6. Graceful Handling for Missing Cutoff History
  test("Missing cutoff benchmarks return 'No past cutoff data yet' and do not crash", () => {
    // When queried with a non-existent or fresh pair
    const projection = getProjectedCutoff("NonExistentCollege", "bsc_phys", "UR");
    assert.strictEqual(projection.basis, "No past cutoff data yet");
    assert.strictEqual(projection.yearsCount, 0);
    assert.strictEqual(typeof projection.likelyRange, "object");
    assert.strictEqual((projection.likelyRange as any).label, "No past cutoff data yet");
  });

  // 7. Cascading Rule Inline Notice Templates
  test("Inline notice messages match specification exactly", () => {
    const colName = "Shri Ram College of Commerce (SRCC)";
    const courseName = "B.A. (Hons.) Political Science";

    const collegeNotice = `${colName} doesn't offer ${courseName}. Choose a course.`;
    const courseNotice = `${courseName} isn't offered at ${colName}. Choose a college.`;

    assert.strictEqual(
      collegeNotice,
      "Shri Ram College of Commerce (SRCC) doesn't offer B.A. (Hons.) Political Science. Choose a course."
    );
    assert.strictEqual(
      courseNotice,
      "B.A. (Hons.) Political Science isn't offered at Shri Ram College of Commerce (SRCC). Choose a college."
    );
  });

  console.log("\n=================================================================");
  console.log(`       SUMMARY: ${passed} / ${total} TESTS PASSED               `);
  console.log("=================================================================\n");

  if (passed !== total) {
    process.exit(1);
  }
}

runTests();
