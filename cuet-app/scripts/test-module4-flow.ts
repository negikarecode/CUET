import {
  calculateTopicPriority,
  allocateTimeForAllTopics,
  checkTimeFeasibility,
} from '../lib/time-allocator';
import { buildCompleteSchedule } from '../lib/schedule-builder';
import { calculateStreakDetails } from '../lib/streak-tracker';
import { generateStudyPlan } from '../lib/planner-engine';
import { adjustPlanForTomorrow } from '../lib/plan-adjuster';
import { AppDataStore } from '../lib/data-store';
import { WeaknessScore } from '../lib/types';
import { format } from 'date-fns';

async function runModule4Tests() {
  console.log('====================================================');
  console.log('🚀 TESTING MODULE 4: AI STUDY PLANNER ENGINE & FLOW');
  console.log('====================================================\n');

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

  // ----------------------------------------------------
  // 1. Topic Priority Calculation Tests
  // ----------------------------------------------------
  console.log('--- Subsystem 1: Topic Priority & Weight Calculation ---');

  const criticalScore: WeaknessScore = {
    student_id: 'std_test_1',
    topic_id: 4,
    subject_id: 1,
    chapter_id: 10,
    accuracy_score: 25,
    speed_score: 30,
    consistency_score: 20,
    final_weakness_score: 26,
    weakness_level: 'critical',
    total_attempts: 12,
    correct_count: 3,
    wrong_count: 9,
    skipped_count: 0,
    avg_time_seconds: 55,
    topic: { id: 4, chapter_id: 10, subject_id: 1, topic_name: 'Fundamental Rights' },
  };

  const weakScore: WeaknessScore = {
    student_id: 'std_test_1',
    topic_id: 5,
    subject_id: 1,
    chapter_id: 10,
    accuracy_score: 45,
    speed_score: 40,
    consistency_score: 50,
    final_weakness_score: 44,
    weakness_level: 'weak',
    total_attempts: 10,
    correct_count: 4,
    wrong_count: 6,
    skipped_count: 0,
    avg_time_seconds: 48,
    topic: { id: 5, chapter_id: 10, subject_id: 1, topic_name: 'Directive Principles' },
  };

  const excellentScore: WeaknessScore = {
    student_id: 'std_test_1',
    topic_id: 6,
    subject_id: 1,
    chapter_id: 10,
    accuracy_score: 90,
    speed_score: 85,
    consistency_score: 95,
    final_weakness_score: 89,
    weakness_level: 'excellent',
    total_attempts: 20,
    correct_count: 18,
    wrong_count: 2,
    skipped_count: 0,
    avg_time_seconds: 28,
    topic: { id: 6, chapter_id: 10, subject_id: 1, topic_name: 'Preamble' },
  };

  const untestScore: any = {
    student_id: 'std_test_1',
    topic_id: 7,
    subject_id: 1,
    chapter_id: 10,
    weakness_level: 'untested',
    final_weakness_score: 0,
    accuracy_score: 0,
    speed_score: 0,
    consistency_score: 0,
    total_attempts: 0,
    correct_count: 0,
    wrong_count: 0,
    skipped_count: 0,
    avg_time_seconds: 0,
    topic: { id: 7, chapter_id: 10, subject_id: 1, topic_name: 'Judicial Review' },
  };

  const critPriority = calculateTopicPriority(criticalScore, 45, 8, 3);
  assert(critPriority >= 95, `Critical topic gets top priority score >= 95 (got: ${critPriority})`);

  const weakPriority = calculateTopicPriority(weakScore, 45, 5, 0);
  assert(weakPriority >= 75 && weakPriority < critPriority, `Weak topic gets high priority score (got: ${weakPriority})`);

  const untestPriority = calculateTopicPriority(untestScore, 45, 5, 0);
  assert(untestPriority >= 80, `Untested topic gets priority 80+ to ensure early coverage (got: ${untestPriority})`);

  const excelPriority = calculateTopicPriority(excellentScore, 45, 5, 0);
  assert(excelPriority < weakPriority, `Mastered/Excellent topic gets lower priority score (got: ${excelPriority})`);

  const weakWithDoubts = calculateTopicPriority(weakScore, 45, 5, 4);
  assert(weakWithDoubts > weakPriority, `Module 3 doubt signals boost priority score (got: ${weakWithDoubts} vs ${weakPriority})`);

  // ----------------------------------------------------
  // 2. Time Allocation & Feasibility Tests
  // ----------------------------------------------------
  console.log('\n--- Subsystem 2: Time Allocation & Feasibility Engine ---');

  const topicsList = [criticalScore, weakScore, untestScore, excellentScore];

  const allocations = allocateTimeForAllTopics(
    topicsList,
    45,
    4 * 60,
    { 4: 5, 5: 1 }
  );

  assert(allocations.length === 4, `Allocations generated for all 4 topics`);
  const critAlloc = allocations.find((a) => a.topic_id === 4);
  const excelAlloc = allocations.find((a) => a.topic_id === 6);
  assert(
    Boolean(critAlloc && excelAlloc && critAlloc.total_minutes_needed > excelAlloc.total_minutes_needed),
    `Critical topic allocated more total study minutes than excellent topic (${critAlloc?.total_minutes_needed} vs ${excelAlloc?.total_minutes_needed} min)`
  );

  const feasibility = checkTimeFeasibility(allocations, 45, 4 * 60);
  assert(feasibility.isFeasible === true, `Schedule feasibility check passes with surplus buffer`);
  assert(feasibility.totalMinutesAvailable > feasibility.totalMinutesNeeded, `Available study minutes exceeds needed minutes`);

  // ----------------------------------------------------
  // 3. Complete Schedule Builder Tests
  // ----------------------------------------------------
  console.log('\n--- Subsystem 3: Complete Schedule Builder (Phases, Mocks, Deep Links) ---');

  const fullSchedule = buildCompleteSchedule({
    startDate: new Date('2026-04-01'),
    examDate: new Date('2026-05-15'),
    daysToExam: 45,
    dailyMinutes: 4 * 60,
    prioritizedTopics: allocations,
    selectedSubjectIds: [1, 2, 3],
  });

  assert(fullSchedule.length === 45, `Schedule constructed with exactly 45 planned days`);

  const mockDays = fullSchedule.filter((d) => d.day_type === 'mock_test');
  assert(mockDays.length >= 5, `Mock tests scheduled on Saturdays/7th days (count: ${mockDays.length})`);

  const examDay = fullSchedule[fullSchedule.length - 1];
  assert(examDay.day_type === 'exam_day', `Final day correctly assigned as exam_day`);

  const allTasks = fullSchedule.flatMap((d) => d.tasks);
  const practiceTasksWithLinks = allTasks.filter(
    (t) => t.task_type === 'ai_practice' && t.link_url.includes('/practice/ai/')
  );
  assert(practiceTasksWithLinks.length > 0, `AI practice tasks include deep links to Module 2`);

  // ----------------------------------------------------
  // 4. Streak Tracker & Milestones Tests
  // ----------------------------------------------------
  console.log('\n--- Subsystem 4: Streak Tracker & Motivational Engine ---');

  const mockStreak = {
    student_id: 'std_test_1',
    current_streak: 6,
    longest_streak: 12,
    last_study_date: new Date().toISOString().split('T')[0],
    streak_start_date: new Date().toISOString().split('T')[0],
    milestones_reached: [3],
    total_study_days: 15,
    total_minutes_studied: 1800,
    updated_at: new Date().toISOString(),
  };

  const streakDetails = calculateStreakDetails(mockStreak, 'Aryan');
  assert(streakDetails.streak_status === 'active', `Current streak is active`);
  assert(streakDetails.next_milestone === 7, `Next milestone correctly identified as 7 (got: ${streakDetails.next_milestone})`);
  assert(streakDetails.days_to_next_milestone === 1, `Days to next milestone is 1`);
  assert(streakDetails.streak_emoji.includes('🔥'), `Flame emoji returned for active streak`);

  // ----------------------------------------------------
  // 5. Full Plan Generation Flow
  // ----------------------------------------------------
  console.log('\n--- Subsystem 5: Full Plan Generation Integration ---');

  const studentId = AppDataStore.student.id;
  const planResult = await generateStudyPlan(studentId);
  assert(planResult.success === true, `Full study plan generated successfully`);
  assert(planResult.planId !== undefined, `Generated plan has a valid ID (${planResult.planId})`);

  const activePlan = AppDataStore.getActivePlan(studentId);
  assert(activePlan !== null && activePlan.id === planResult.planId, `Active plan retrieved from AppDataStore`);

  // ----------------------------------------------------
  // 6. Task Completion & Live Progress Sync
  // ----------------------------------------------------
  console.log('\n--- Subsystem 6: Task Completion & Live Progress Sync ---');

  const todayTasks = AppDataStore.studyTasks.filter((t) => t.plan_id === activePlan?.id);
  assert(todayTasks.length > 0, `Study tasks found for active plan (count: ${todayTasks.length})`);

  const firstTask = todayTasks[0];
  const completionResult = AppDataStore.completeTask(firstTask.id, 45);

  assert(completionResult.task?.status === 'completed', `Task marked as completed`);
  assert(completionResult.task?.actual_minutes === 45, `Actual minutes recorded as 45`);
  assert(
    (completionResult.day?.completed_minutes || 0) >= 45,
    `Day's completed minutes updated (${completionResult.day?.completed_minutes})`
  );

  // ----------------------------------------------------
  // 7. Daily Adjustment Engine (11 PM Auto-rebalance)
  // ----------------------------------------------------
  console.log('\n--- Subsystem 7: 11 PM Daily Auto-Adjustment Scenarios ---');

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  // Ensure today has a plan day entry for adjuster testing
  let testDay = AppDataStore.studyPlanDays.find(
    (d) => d.student_id === studentId && d.plan_date === todayStr
  );
  if (!testDay && AppDataStore.studyPlanDays.length > 0) {
    AppDataStore.studyPlanDays[0].plan_date = todayStr;
  }

  const adjustResult = await adjustPlanForTomorrow(studentId);
  assert(typeof adjustResult.completionRate === 'number', `Daily adjustment ran successfully (completion rate: ${adjustResult.completionRate})`);
  assert(typeof adjustResult.statusMessage === 'string', `Status message returned: "${adjustResult.statusMessage}"`);

  console.log('\n====================================================');
  console.log(`🎉 MODULE 4 TEST RUN COMPLETE: ${passed}/${total} TESTS PASSED`);
  console.log('====================================================');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runModule4Tests().catch((err) => {
  console.error('Fatal error in test suite:', err);
  process.exit(1);
});
