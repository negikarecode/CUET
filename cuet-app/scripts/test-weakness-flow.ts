import {
  calculateAccuracyScore,
  calculateSpeedScore,
  calculateConsistencyScore,
  calculateFinalWeaknessScore,
  getWeaknessLevel,
} from "../lib/weakness-engine";
import { StudentAttempt } from "../lib/types";

console.log("=================================================");
console.log("TESTING MODULE 1: AI WEAKNESS DETECTOR ENGINE");
console.log("=================================================");

// TEST 1: Accuracy verification (3 / 10 correct = 30%)
const acc = calculateAccuracyScore(3, 7, 0);
console.log(`[TEST 1] Accuracy: 3 correct, 7 wrong -> ${acc}% (Expected: 30%)`);
if (acc !== 30) throw new Error(`Accuracy mismatch: got ${acc}`);

// TEST 2: Speed calculation
// Medium difficulty target is 45s.
// Case A: 35s (<= 45s) -> 100
const speedA = calculateSpeedScore(35, "medium");
console.log(`[TEST 2A] Speed: 35s on medium -> ${speedA} (Expected: 100)`);
if (speedA !== 100) throw new Error(`Speed mismatch: got ${speedA}`);

// Case B: 55s (between 45 and 67.5s)
const speedB = calculateSpeedScore(55, "medium");
console.log(`[TEST 2B] Speed: 55s on medium -> ${speedB} (Expected: ~77.78)`);
if (speedB < 70 || speedB > 85) throw new Error(`Speed interpolation failed: ${speedB}`);

// Case C: 90s (> 67.5s) -> 10 minimum
const speedC = calculateSpeedScore(90, "medium");
console.log(`[TEST 2C] Speed: 90s on medium -> ${speedC} (Expected: 10)`);
if (speedC !== 10) throw new Error(`Speed minimum failed: ${speedC}`);

// TEST 3: Consistency calculation
const mockAttempts: StudentAttempt[] = [
  { id: 1, student_id: "s1", question_id: 1, subject_id: 1, chapter_id: 1, topic_id: 1, selected_option: "A", is_correct: false, is_skipped: false, time_taken_seconds: 40, attempt_source: "practice", session_id: "ses1", attempt_number: 1, attempted_at: new Date().toISOString() },
  { id: 2, student_id: "s1", question_id: 2, subject_id: 1, chapter_id: 1, topic_id: 1, selected_option: "B", is_correct: true, is_skipped: false, time_taken_seconds: 35, attempt_source: "practice", session_id: "ses1", attempt_number: 1, attempted_at: new Date().toISOString() },
  { id: 3, student_id: "s1", question_id: 3, subject_id: 1, chapter_id: 1, topic_id: 1, selected_option: "C", is_correct: true, is_skipped: false, time_taken_seconds: 30, attempt_source: "practice", session_id: "ses1", attempt_number: 1, attempted_at: new Date().toISOString() },
  { id: 4, student_id: "s1", question_id: 4, subject_id: 1, chapter_id: 1, topic_id: 1, selected_option: "A", is_correct: true, is_skipped: false, time_taken_seconds: 28, attempt_source: "practice", session_id: "ses1", attempt_number: 1, attempted_at: new Date().toISOString() },
];
const cons = calculateConsistencyScore(mockAttempts);
console.log(`[TEST 3] Consistency: Improving trajectory -> ${cons} (Expected: > 70)`);
if (cons < 70) throw new Error(`Consistency calculation failed: got ${cons}`);

// TEST 4: Final Weakness Score Weighted Combination (60% Acc, 25% Speed, 15% Consistency)
// Acc=30, Speed=70, Cons=50
// Final = (30 * 0.6) + (70 * 0.25) + (50 * 0.15) = 18 + 17.5 + 7.5 = 43.0
const finalScore = calculateFinalWeaknessScore(30, 70, 50);
console.log(`[TEST 4] Final Weakness Score: (30*0.6) + (70*0.25) + (50*0.15) -> ${finalScore} (Expected: 43.0)`);
if (finalScore !== 43) throw new Error(`Final score mismatch: got ${finalScore}`);

// TEST 5: Level Classification
const level = getWeaknessLevel(finalScore);
console.log(`[TEST 5] Weakness Level for score 43 -> '${level}' (Expected: 'weak')`);
if (level !== "weak") throw new Error(`Level mismatch: got ${level}`);

// Level critical check (<40)
const criticalLevel = getWeaknessLevel(38);
console.log(`[TEST 5B] Weakness Level for score 38 -> '${criticalLevel}' (Expected: 'critical')`);
if (criticalLevel !== "critical") throw new Error(`Critical level mismatch`);

console.log("=================================================");
console.log("ALL WEAKNESS ENGINE TESTS PASSED PERFECTLY!");
console.log("=================================================");
