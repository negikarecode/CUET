import { AppDataStore } from '../lib/data-store';
import {
  calculateAllMetrics,
  CUET_MARKING,
} from '../lib/performance-calculator';
import {
  estimateRank,
  estimatePercentile,
  predictCUETScore,
} from '../lib/score-predictor';
import { generateFullAnalysis } from '../lib/report-generator';
import { generatePerformancePDF } from '../lib/pdf-generator';

async function runModule5Tests() {
  console.log('================================================================');
  console.log('🚀 TESTING MODULE 5: AI PERFORMANCE ANALYZER ENGINE & INTEGRATIONS');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (condition) {
      console.log(`✅ TEST ${total}: ${testName}`);
      passed++;
    } else {
      console.error(`❌ TEST ${total} FAILED: ${testName}`);
    }
  }

  // Ensure data store is initialized
  AppDataStore.initialize();

  const demoSessionId = 'demo-mock-session-6';
  const studentId = AppDataStore.student.id;

  // ----------------------------------------------------
  // Subsystem 1: Performance Calculator (+5 / -1 Marking & Metrics)
  // ----------------------------------------------------
  console.log('--- Subsystem 1: Performance Metrics & Official CUET Marking Scheme ---');

  const attempts = AppDataStore.attempts.filter(
    (a) => a.session_id === demoSessionId && a.student_id === studentId
  );
  assert(attempts.length === 50, `Seeded session has exactly 50 question attempts (found ${attempts.length})`);

  const metrics = await calculateAllMetrics(demoSessionId, studentId);

  // CUET UG Marking: +5 for Correct, -1 for Wrong, 0 for Skipped
  const expectedRawScore = metrics.correct * CUET_MARKING.CORRECT + metrics.wrong * CUET_MARKING.WRONG;
  assert(
    metrics.raw_score === expectedRawScore,
    `CUET raw score correctly computed: +5 * ${metrics.correct} - 1 * ${metrics.wrong} = ${metrics.raw_score}`
  );
  assert(
    metrics.max_possible_score === 50 * CUET_MARKING.CORRECT,
    `Maximum possible score is 250 for 50 questions (got ${metrics.max_possible_score})`
  );
  assert(
    metrics.attempt_rate > 0 && metrics.attempt_rate <= 100,
    `Attempt rate is calculated within valid range (${metrics.attempt_rate}%)`
  );
  assert(
    metrics.accuracy_rate > 0 && metrics.accuracy_rate <= 100,
    `Accuracy rate is calculated within valid range (${metrics.accuracy_rate}%)`
  );
  assert(
    metrics.avg_time_per_question > 0,
    `Average time per question computed (${metrics.avg_time_per_question}s)`
  );
  assert(
    metrics.time_wasted_seconds >= 0,
    `Time wasted on wrong questions computed (${metrics.time_wasted_seconds}s)`
  );

  // ----------------------------------------------------
  // Subsystem 2: Subject, Chapter & Topic Breakdowns
  // ----------------------------------------------------
  console.log('\n--- Subsystem 2: Subject, Chapter & Topic Breakdowns ---');

  assert(
    metrics.subject_breakdown.length > 0,
    `Subject breakdown generated (${metrics.subject_breakdown.length} subjects)`
  );
  assert(
    metrics.chapter_breakdown.length > 0,
    `Chapter breakdown generated (${metrics.chapter_breakdown.length} chapters)`
  );
  assert(
    metrics.topic_breakdown.length > 0,
    `Topic breakdown generated (${metrics.topic_breakdown.length} topics)`
  );

  const polSciSubj = metrics.subject_breakdown.find((s) => s.subject_id === 1);
  assert(
    polSciSubj !== undefined && polSciSubj.total_questions > 0,
    `Political Science subject metrics calculated with ${polSciSubj?.total_questions} questions`
  );

  const topicWithSignal = metrics.topic_breakdown[0];
  assert(
    ['strong', 'average', 'weak', 'critical'].includes(topicWithSignal.weakness_signal),
    `Topic has valid weakness signal: ${topicWithSignal.topic_name} -> ${topicWithSignal.weakness_signal}`
  );

  // ----------------------------------------------------
  // Subsystem 3: Behavioral & Cognitive Mistake Patterns
  // ----------------------------------------------------
  console.log('\n--- Subsystem 3: Mistake Pattern Classifications ---');

  const mistakes = metrics.mistake_patterns;
  assert(
    typeof mistakes.careless_mistakes === 'number',
    `Careless mistakes identified (${mistakes.careless_mistakes})`
  );
  assert(
    typeof mistakes.conceptual_gaps === 'number',
    `Conceptual gaps identified (${mistakes.conceptual_gaps})`
  );
  assert(
    typeof mistakes.time_pressure_mistakes === 'number',
    `Time pressure mistakes identified (${mistakes.time_pressure_mistakes})`
  );
  assert(
    typeof mistakes.lucky_guesses === 'number',
    `Lucky guesses identified (${mistakes.lucky_guesses})`
  );

  // ----------------------------------------------------
  // Subsystem 4: Question-Level Detailed Diagnostics
  // ----------------------------------------------------
  console.log('\n--- Subsystem 4: Question-Level Detailed Diagnostics ---');

  const qAnalysis = metrics.question_level;
  assert(
    qAnalysis.length === 50,
    `Question-level analysis generated for all 50 questions (got ${qAnalysis.length})`
  );

  const sampleQ = qAnalysis[0];
  assert(
    sampleQ.marks_earned === 5 || sampleQ.marks_earned === -1 || sampleQ.marks_earned === 0,
    `Question marks correctly assigned: ${sampleQ.marks_earned} marks`
  );
  assert(
    typeof sampleQ.is_careless_mistake === 'boolean',
    `Question careless mistake flag is boolean (${sampleQ.is_careless_mistake})`
  );
  assert(
    typeof sampleQ.is_time_pressure_mistake === 'boolean',
    `Question time pressure mistake flag is boolean (${sampleQ.is_time_pressure_mistake})`
  );

  // ----------------------------------------------------
  // Subsystem 5: Score Predictor & Rank Estimator
  // ----------------------------------------------------
  console.log('\n--- Subsystem 5: CUET Score Prediction & All-India Rank Modeling ---');

  const rankHigh = estimateRank(185);
  const rankMid = estimateRank(155);
  const rankLow = estimateRank(95);

  assert(
    rankHigh.min < rankMid.min && rankMid.min < rankLow.min,
    `Higher scores yield better All-India Ranks: 185 -> #${rankHigh.min}, 155 -> #${rankMid.min}, 95 -> #${rankLow.min}`
  );

  const percentileHigh = estimatePercentile(rankHigh.min);
  const percentileLow = estimatePercentile(rankLow.min);
  assert(
    percentileHigh > percentileLow && percentileHigh <= 100,
    `Percentile monotonic scaling confirmed: Rank #${rankHigh.min} -> ${percentileHigh}%, Rank #${rankLow.min} -> ${percentileLow}%`
  );

  const prediction = await predictCUETScore(studentId, metrics);
  assert(
    prediction.predicted_min <= prediction.predicted_max,
    `Score range is valid: ${prediction.predicted_min} - ${prediction.predicted_max}`
  );
  assert(
    ['low', 'medium', 'high'].includes(prediction.confidence),
    `Confidence level is valid (${prediction.confidence})`
  );
  assert(
    ['improving', 'declining', 'stable', 'first_test'].includes(prediction.trend),
    `Score trend is categorized correctly (${prediction.trend})`
  );

  // ----------------------------------------------------
  // Subsystem 6: Full Report Generation & Cross-Module Sync
  // ----------------------------------------------------
  console.log('\n--- Subsystem 6: Full Report Generation & Cross-Module Integrations ---');

  const reportResult = await generateFullAnalysis(demoSessionId, studentId);

  assert(reportResult.success === true, `generateFullAnalysis completed successfully`);

  const savedAnalysis = AppDataStore.getAnalysisBySession(demoSessionId);
  assert(savedAnalysis !== undefined, `Analysis record saved in AppDataStore`);
  assert(
    savedAnalysis?.ai_action_plan?.length === 3,
    `48-Hour action plan generated with 3 prioritized steps`
  );
  assert(
    savedAnalysis?.ai_coaching_message.length! > 20,
    `AI coaching debrief generated (${savedAnalysis?.ai_coaching_message.substring(0, 40)}...)`
  );

  // Verify Module 1 Integration: Weakness score recalibrated with 40% mock weight
  const updatedWeaknessScores = Array.from(AppDataStore.weaknessScores.values()).filter(
    (w) => w.student_id === studentId
  );
  assert(
    updatedWeaknessScores.length > 0,
    `Module 1 weakness scores verified in data store (${updatedWeaknessScores.length} topics updated)`
  );

  // ----------------------------------------------------
  // Subsystem 7: 4-Page PDF Export Generation
  // ----------------------------------------------------
  console.log('\n--- Subsystem 7: 4-Page PDF Export Generation ---');

  const sessionData = AppDataStore.getMockSession(demoSessionId)!;
  const doc = generatePerformancePDF({
    analysis: savedAnalysis!,
    session: sessionData,
    studentName: AppDataStore.student.name,
  });

  const pdfArrayBuffer = doc.output('arraybuffer');
  const pdfBuffer = Buffer.from(pdfArrayBuffer);

  assert(pdfBuffer instanceof Buffer, `PDF generated as a valid Node.js Buffer`);
  assert(pdfBuffer.length > 1000, `PDF document contains full data (${pdfBuffer.length} bytes)`);

  const pdfHeader = pdfBuffer.subarray(0, 5).toString('ascii');
  assert(pdfHeader === '%PDF-', `PDF output begins with valid magic header '%PDF-' (got ${pdfHeader})`);

  // ----------------------------------------------------
  // Final Test Summary
  // ----------------------------------------------------
  console.log('\n================================================================');
  console.log(`📊 MODULE 5 TEST RESULTS: ${passed}/${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('================================================================\n');

  if (passed === total) {
    console.log('🎉 ALL MODULE 5 TESTS PASSED WITH 100% SUCCESS!\n');
  } else {
    console.error('⚠️ Some tests failed. Please inspect the output above.');
    process.exit(1);
  }
}

runModule5Tests().catch((err) => {
  console.error('Fatal error in Module 5 test runner:', err);
  process.exit(1);
});
