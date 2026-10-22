import fs from "fs";
import path from "path";
import {
  calculateNextStreakOnPractice,
  calculateActiveStreak,
  calculateStreakFromAttempts,
  updateStreak,
  getLocalDateString,
  getDaysBetweenCalendarDates,
} from "../lib/gamification";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  FAIL: ${testName}`);
    if (detail) console.error(`    Detail: ${detail}`);
  }
}

console.log("\n============================================================");
console.log("STATIC & INVARIANT SUITE: Gamification & Leaderboard Removal");
console.log("============================================================\n");

// -------------------------------------------------------------
// 1. Static Scan: No Deprecated Symbols in app/, components/, lib/
// -------------------------------------------------------------
console.log("1. Static Code Analysis (app/, components/, lib/):");

const FORBIDDEN_STRINGS = [
  "/api/leaderboard",
  "award_trophies",
  "award_xp_once",
  "MASTER_TROPHIES",
  "newlyUnlockedTrophies",
];

function getFilesRecursively(dir: string, extensions: string[]): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, extensions));
    } else if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

const targetDirs = ["app", "components", "lib"];
const extensions = [".ts", ".tsx", ".js", ".jsx"];
const filesToScan: string[] = [];

for (const dirName of targetDirs) {
  const fullDir = path.join(process.cwd(), dirName);
  filesToScan.push(...getFilesRecursively(fullDir, extensions));
}

assert(filesToScan.length > 50, `Found files to scan across app, components, lib (${filesToScan.length} files)`);

const violations: Array<{ file: string; forbidden: string; line: number }> = [];

for (const file of filesToScan) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    for (const forbidden of FORBIDDEN_STRINGS) {
      if (line.includes(forbidden)) {
        violations.push({
          file: path.relative(process.cwd(), file),
          forbidden,
          line: i + 1,
        });
      }
    }
  }
}

assert(
  violations.length === 0,
  "Zero references to forbidden symbols (/api/leaderboard, award_trophies, award_xp_once, MASTER_TROPHIES, newlyUnlockedTrophies) in app/, components/, lib/",
  violations.length > 0 ? JSON.stringify(violations, null, 2) : undefined
);

// -------------------------------------------------------------
// 2. Filesystem Deletion Verification
// -------------------------------------------------------------
console.log("\n2. Filesystem Deletion Verification:");

const deletedFiles = [
  "app/api/leaderboard/route.ts",
  "app/dashboard/leaderboard/page.tsx",
  "components/dashboard/Leaderboard.tsx",
  "components/dashboard/TrophyCabinet.tsx",
  "components/profile/TrophyDetailModal.tsx",
  "supabase/migrations/20261022_award_xp_once_rpc.sql",
];

for (const deletedFile of deletedFiles) {
  const fullPath = path.join(process.cwd(), deletedFile);
  assert(!fs.existsSync(fullPath), `Deleted file is confirmed absent: ${deletedFile}`);
}

// -------------------------------------------------------------
// 3. Test Route Authoritative Invariants
// -------------------------------------------------------------
console.log("\n3. Authoritative Test Route Invariants (app/api/test/[testId]/route.ts):");

const testRoutePath = path.join(process.cwd(), "app/api/test/[testId]/route.ts");
const testRouteSource = fs.readFileSync(testRoutePath, "utf8");

assert(testRouteSource.includes("calculateNextStreakOnPractice"), "Imports and executes calculateNextStreakOnPractice for streak tracking");
assert(testRouteSource.includes("current_streak"), "Updates candidate current_streak in public.profiles");
assert(testRouteSource.includes("last_practice_date"), "Updates candidate last_practice_date in public.profiles");
assert(testRouteSource.includes("total_questions_attempted"), "Updates candidate total_questions_attempted");
assert(testRouteSource.includes("checkTestSessionEligibility") || testRouteSource.includes("canAttempt"), "Enforces paywall / entitlement verification");
assert(testRouteSource.includes("existingAttempt") || testRouteSource.includes("duplicate"), "Enforces deduplication / idempotency check");
assert(!testRouteSource.includes("award_xp_once"), "Does NOT contain award_xp_once RPC call");
assert(!testRouteSource.includes("award_trophies"), "Does NOT contain award_trophies RPC call");
assert(!testRouteSource.includes("newlyUnlockedTrophies"), "Response payload does NOT return newlyUnlockedTrophies");
assert(!testRouteSource.includes("earnedXP"), "Response payload does NOT return earnedXP");

// -------------------------------------------------------------
// 4. Streak Helpers Preserved in lib/gamification.ts
// -------------------------------------------------------------
console.log("\n4. Streak Helpers Preservation (lib/gamification.ts):");

assert(typeof calculateNextStreakOnPractice === "function", "calculateNextStreakOnPractice is exported and callable");
assert(typeof calculateActiveStreak === "function", "calculateActiveStreak is exported and callable");
assert(typeof calculateStreakFromAttempts === "function", "calculateStreakFromAttempts is exported and callable");
assert(typeof updateStreak === "function", "updateStreak is exported and callable");
assert(typeof getLocalDateString === "function", "getLocalDateString is exported and callable");
assert(typeof getDaysBetweenCalendarDates === "function", "getDaysBetweenCalendarDates is exported and callable");

// Streak calculation verification
const today = getLocalDateString(new Date());
const yesterday = getLocalDateString(new Date(Date.now() - 86400000));
const twoDaysAgo = getLocalDateString(new Date(Date.now() - 86400000 * 2));

// Test 1: First practice ever
assert(
  calculateNextStreakOnPractice(0, null, today) === 1,
  "First practice ever sets streak from 0 to 1"
);

// Test 2: Consecutive practice on consecutive day
assert(
  calculateNextStreakOnPractice(3, yesterday, today) === 4,
  "Practicing next day increments streak from 3 to 4"
);

// Test 3: Same day repeat practice preserves streak
assert(
  calculateNextStreakOnPractice(4, today, today) === 4,
  "Practicing same day preserves current streak at 4"
);

// Test 4: Missed day resets streak to 1
assert(
  calculateNextStreakOnPractice(5, twoDaysAgo, today) === 1,
  "Practicing after missing a day resets streak to 1"
);

// Verify removed gamification helpers are NOT exported
const gamificationModule = require("../lib/gamification");
assert(gamificationModule.MASTER_TROPHIES === undefined, "MASTER_TROPHIES is strictly undefined in lib/gamification");
assert(gamificationModule.evaluateTrophies === undefined, "evaluateTrophies is strictly undefined in lib/gamification");
assert(gamificationModule.getUserTrophiesWithProgress === undefined, "getUserTrophiesWithProgress is strictly undefined in lib/gamification");
assert(gamificationModule.calculateXP === undefined, "calculateXP is strictly undefined in lib/gamification");

// -------------------------------------------------------------
// 5. Database Migration File Verification
// -------------------------------------------------------------
console.log("\n5. Database Migration File Verification (20261023_remove_gamification.sql):");

const migrationPath = path.join(process.cwd(), "supabase/migrations/20261023_remove_gamification.sql");
assert(fs.existsSync(migrationPath), "Migration 20261023_remove_gamification.sql exists");

const migrationContent = fs.readFileSync(migrationPath, "utf8");
assert(migrationContent.includes("DROP TABLE IF EXISTS public.user_trophies CASCADE;"), "Migration drops user_trophies CASCADE");
assert(migrationContent.includes("DROP TABLE IF EXISTS public.trophies CASCADE;"), "Migration drops trophies CASCADE");
assert(migrationContent.includes("DROP TABLE IF EXISTS public.user_test_xp_awards CASCADE;"), "Migration drops user_test_xp_awards CASCADE");
assert(migrationContent.includes("DROP FUNCTION IF EXISTS public.award_trophies"), "Migration drops award_trophies RPC");
assert(migrationContent.includes("DROP FUNCTION IF EXISTS public.award_xp_once"), "Migration drops award_xp_once RPC");
assert(!migrationContent.includes("DROP COLUMN IF EXISTS xp"), "Migration preserves profiles.xp column");
assert(!migrationContent.includes("DROP COLUMN IF EXISTS campus_coins"), "Migration preserves profiles.campus_coins column");

console.log("\n============================================================");
console.log(`SUMMARY: ${passedTests} passed, ${failedTests} failed (Total: ${totalTests})`);
console.log("============================================================\n");

if (failedTests > 0) {
  process.exit(1);
}
