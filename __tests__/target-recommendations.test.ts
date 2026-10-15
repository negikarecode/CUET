import { resolveTargetRequiredSubjects } from "@/lib/hooks/useTarget";
import { CANONICAL_COURSES_MAP } from "@/lib/standing-engine";
import { normalizePracticeFolder } from "@/lib/practice-stats";
import { normalizeSubject } from "@/lib/analytics";
import practiceManifest from "@/lib/data/practice_test_manifest.json";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`  FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`  PASS: ${message}`);
  }
}

console.log("\n===============================================================");
console.log("TARGET RECOMMENDATIONS & DEDUPLICATION TESTS");
console.log("===============================================================\n");

// Scenario 1: Target with 3 required subjects (B.Sc. (Hons.) Physics)
console.log("Scenario 1: Target with 3 required subjects (B.Sc. Physics)");
{
  const coursePhysics = CANONICAL_COURSES_MAP["bsc_hons_physics"];
  const reqSubjects = resolveTargetRequiredSubjects(coursePhysics, [], "science");
  assert(reqSubjects.length === 3, `Expected 3 subjects for B.Sc. Physics, got ${reqSubjects.length}`);
  
  const folders = reqSubjects.map((s) => normalizePracticeFolder(s));
  assert(folders.includes("physics"), "Includes physics");
  assert(folders.includes("chemistry"), "Includes chemistry");
  assert(folders.includes("maths"), "Includes maths");
  assert(!folders.includes("anthropology"), "Does not include anthropology");
  assert(!folders.includes("english"), "Does not include english");

  // Verify practice exclusion logic
  const allPracticeFolders = Object.keys(practiceManifest);
  const recommendedIds = new Set(folders);
  const otherPracticeFolders = allPracticeFolders.filter((id) => !recommendedIds.has(id));
  
  assert(allPracticeFolders.length === 22, `Total practice subjects is 22, got ${allPracticeFolders.length}`);
  assert(otherPracticeFolders.length === 19, `Other practice subjects is 19, got ${otherPracticeFolders.length}`);
  
  // Verify zero overlap
  const intersection = folders.filter((id) => otherPracticeFolders.includes(id));
  assert(intersection.length === 0, `Overlap should be 0, got ${intersection.length}`);
}

// Scenario 2: Target with 4 required subjects (B.Com. (Hons.))
console.log("\nScenario 2: Target with 4 required subjects (B.Com. Hons.)");
{
  const courseBCom = CANONICAL_COURSES_MAP["bcom_hons"];
  const reqSubjects = resolveTargetRequiredSubjects(courseBCom, [], "commerce");
  assert(reqSubjects.length === 4, `Expected 4 subjects for B.Com. Hons., got ${reqSubjects.length}`);

  const folders = reqSubjects.map((s) => normalizePracticeFolder(s));
  assert(folders.includes("maths"), "Includes maths");
  assert(folders.includes("english"), "Includes english");
  assert(folders.includes("accountancy"), "Includes accountancy");
  assert(folders.includes("bst"), "Includes business studies");
  assert(!folders.includes("anthropology"), "Does not include anthropology");

  // Verify practice exclusion logic
  const allPracticeFolders = Object.keys(practiceManifest);
  const recommendedIds = new Set(folders);
  const otherPracticeFolders = allPracticeFolders.filter((id) => !recommendedIds.has(id));

  assert(otherPracticeFolders.length === 18, `Other practice subjects is 18, got ${otherPracticeFolders.length}`);
  const intersection = folders.filter((id) => otherPracticeFolders.includes(id));
  assert(intersection.length === 0, `Overlap should be 0, got ${intersection.length}`);
}

// Scenario 3: Target with 4 required subjects (B.A. (Hons.) Political Science)
console.log("\nScenario 3: Target with 4 required subjects (B.A. Pol Science)");
{
  const coursePolSci = CANONICAL_COURSES_MAP["ba_hons_pol_science"];
  const reqSubjects = resolveTargetRequiredSubjects(coursePolSci, [], "humanities");
  assert(reqSubjects.length === 4, `Expected 4 subjects for B.A. Pol Sci, got ${reqSubjects.length}`);

  const folders = reqSubjects.map((s) => normalizePracticeFolder(s));
  assert(folders.includes("english"), "Includes english");
  assert(folders.includes("pol science"), "Includes political science");
  assert(folders.includes("history"), "Includes history");
  assert(folders.includes("geo"), "Includes geography");
  assert(!folders.includes("anthropology"), "Does not include anthropology");

  const allPracticeFolders = Object.keys(practiceManifest);
  const recommendedIds = new Set(folders);
  const otherPracticeFolders = allPracticeFolders.filter((id) => !recommendedIds.has(id));

  assert(otherPracticeFolders.length === 18, `Other practice subjects is 18, got ${otherPracticeFolders.length}`);
  const intersection = folders.filter((id) => otherPracticeFolders.includes(id));
  assert(intersection.length === 0, `Overlap should be 0, got ${intersection.length}`);
}

// Scenario 4: No target set
console.log("\nScenario 4: No target set");
{
  const reqSubjects = resolveTargetRequiredSubjects(undefined, [], "science");
  assert(reqSubjects.length === 0, `Expected 0 subjects when no target, got ${reqSubjects.length}`);

  const allPracticeFolders = Object.keys(practiceManifest);
  const recommendedIds = new Set(reqSubjects.map((s) => normalizePracticeFolder(s)));
  const otherPracticeFolders = allPracticeFolders.filter((id) => !recommendedIds.has(id));

  assert(otherPracticeFolders.length === 22, `All 22 practice subjects shown when no target, got ${otherPracticeFolders.length}`);
}

// Scenario 5: Normalization accuracy (Anthropology vs Political Science, Physical Education vs Physics)
console.log("\nScenario 5: Normalization accuracy");
{
  const antNorm = normalizeSubject("anthropology");
  assert(antNorm.key === "anthropology", `Anthropology key is anthropology, got ${antNorm.key}`);

  const pedNorm = normalizeSubject("physical_education");
  assert(pedNorm.key === "physical-education", `Physical Education key is physical-education, got ${pedNorm.key}`);

  const antFolder = normalizePracticeFolder("anthropology");
  assert(antFolder === "anthropology", `Anthropology folder is anthropology, got ${antFolder}`);

  const pedFolder = normalizePracticeFolder("physical_education");
  assert(pedFolder === "physical_education", `Physical Education folder is physical_education, got ${pedFolder}`);
}

console.log("\n===============================================================");
console.log("ALL TARGET RECOMMENDATION TESTS PASSED!");
console.log("===============================================================\n");
