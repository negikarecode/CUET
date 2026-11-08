import { generateThreadTitle, verifyPercentagesHaveAttemptCounts } from "../lib/chat/engine";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  FAIL: ${testName}`);
    if (detail) console.error(`    Detail: ${detail}`);
  }
}

console.log("\n============================================================");
console.log("UNIT TESTS: Coach Chat Title Generation & Invariant Checks");
console.log("============================================================\n");

// 1. Title generation
const longPrompt = "### Can you explain why electrostatics question 14 had option B as an incorrect distractor trap?";
const title1 = generateThreadTitle(longPrompt);
assert(title1.length <= 40, "Title length is capped at <= 40 characters", `got length ${title1.length}`);
assert(!title1.includes("###"), "Markdown hashes are stripped from title");
assert(!title1.includes("*"), "Markdown asterisks are stripped from title");
assert(title1[0] === title1[0]?.toUpperCase(), "Title begins capitalized");

const shortPrompt = "What are my weak topics?";
const title2 = generateThreadTitle(shortPrompt);
assert(title2 === "What are my weak topics?", "Short prompt preserved without truncation");
assert(title2.length <= 40, "Short prompt is <= 40 chars");

// 2. Percentage attempt count verification
const badText = "Your accuracy in Magnetism is 40%. You need to work harder.";
assert(verifyPercentagesHaveAttemptCounts(badText) === false, "Flags percentage without attempt count nearby");

const goodText = "Your accuracy in Magnetism is 40% across 20 attempts. Focus on Biot-Savart law.";
assert(verifyPercentagesHaveAttemptCounts(goodText) === true, "Approves percentage with attempt count nearby");

const goodText2 = "Over 15 questions, your accuracy is 60%.";
assert(verifyPercentagesHaveAttemptCounts(goodText2) === true, "Approves percentage with questions count beforehand");

console.log("\n============================================================");
console.log(`SUMMARY: ${passed} passed, ${failed} failed`);
console.log("============================================================\n");

if (failed > 0) {
  process.exit(1);
}
