import { AppDataStore } from "../lib/data-store";
import { POST as recordAttempt } from "../app/api/attempts/record/route";
import { GET as getDashboard } from "../app/api/weakness/dashboard/route";

async function runApiTest() {
  console.log("=================================================");
  console.log("TESTING END-TO-END API ATTEMPTS & DASHBOARD");
  console.log("=================================================");

  AppDataStore.initialize();
  const studentId = AppDataStore.student.id;
  const testTopicId = 3; // Key Features of Constitution (currently untested)

  console.log(`Simulating 10 student attempts on Topic ID ${testTopicId} (3 correct, 7 wrong)...`);

  // Record 10 attempts: 3 correct, 7 wrong
  for (let i = 1; i <= 10; i++) {
    const isCorrect = i <= 3; // 1, 2, 3 correct, 4-10 wrong
    const req = new Request("http://localhost:3000/api/attempts/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question_id: i,
        subject_id: 1,
        chapter_id: 10,
        topic_id: testTopicId,
        selected_option: isCorrect ? "A" : "B",
        is_correct: isCorrect,
        is_skipped: false,
        time_taken_seconds: 40 + i,
        attempt_source: "practice",
        session_id: "test-session-123",
      }),
    });

    const res = await recordAttempt(req);
    if (!res.ok) {
      throw new Error(`Attempt ${i} failed: ${res.statusText}`);
    }
  }

  console.log("Recorded 10 attempts successfully.");

  // Fetch updated dashboard
  const dashRes = await getDashboard();
  const dashData = await dashRes.json();

  console.log(`Overall Health Score: ${dashData.overall_score}/100`);
  console.log(`Overall Level: ${dashData.overall_level}`);
  console.log(`Critical count: ${dashData.topics_by_level.critical.length}`);
  console.log(`Weak count: ${dashData.topics_by_level.weak.length}`);

  // Find the tested topic
  const allTested = [
    ...dashData.topics_by_level.critical,
    ...dashData.topics_by_level.weak,
    ...dashData.topics_by_level.average,
    ...dashData.topics_by_level.strong,
    ...dashData.topics_by_level.excellent,
  ];

  const testedTopicScore = allTested.find((s) => s.topic_id === testTopicId);
  if (!testedTopicScore) {
    throw new Error(`Topic ${testTopicId} was not found in tested topics!`);
  }

  console.log(`\nResults for Topic ${testTopicId} (${testedTopicScore.topic?.topic_name}):`);
  console.log(`- Total Attempts: ${testedTopicScore.total_attempts}`);
  console.log(`- Correct: ${testedTopicScore.correct_count} | Wrong: ${testedTopicScore.wrong_count}`);
  console.log(`- Accuracy Score: ${testedTopicScore.accuracy_score}% (Expected: 30%)`);
  console.log(`- Speed Score: ${testedTopicScore.speed_score}%`);
  console.log(`- Consistency Score: ${testedTopicScore.consistency_score}%`);
  console.log(`- Final Weakness Score: ${testedTopicScore.final_weakness_score}/100`);
  console.log(`- Weakness Level: ${testedTopicScore.weakness_level}`);

  if (testedTopicScore.accuracy_score !== 30) {
    throw new Error(`Expected accuracy 30%, got ${testedTopicScore.accuracy_score}%`);
  }

  console.log("\n=================================================");
  console.log("FULL END-TO-END FLOW VERIFIED SUCCESSFULLY!");
  console.log("=================================================");
}

runApiTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
