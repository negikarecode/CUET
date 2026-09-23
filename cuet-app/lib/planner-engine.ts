import { supabase } from './supabase';
import { AppDataStore, SEED_TOPICS, SEED_SUBJECTS, SEED_CHAPTERS } from './data-store';
import { allocateTimeForAllTopics, checkTimeFeasibility } from './time-allocator';
import { buildCompleteSchedule } from './schedule-builder';
import { buildPlanGenerationPrompt } from './planner-prompts';
import { getOpenAIClient, isOpenAIConfigured } from './openai';
import { differenceInDays, parseISO } from 'date-fns';
import { StudyPlan, StudyPlanDay, StudyTask } from './types';

export async function generateStudyPlan(
  studentId: string
): Promise<{ success: boolean; planId?: string; coaching?: any; error?: string }> {
  const startTime = Date.now();

  // 1. Get student profile
  let student = AppDataStore.student;
  try {
    if (supabase) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', studentId)
        .maybeSingle();
      if (data) {
        student = {
          ...student,
          ...data,
          name: data.full_name || student.name,
          target_college: data.target_college || student.target_college,
        };
      }
    }
  } catch (err) {
    console.warn('[PlannerEngine] Supabase student fetch fallback:', err);
  }

  if (!student) {
    return { success: false, error: 'Student profile not found' };
  }

  const examDate = student.exam_date ? parseISO(student.exam_date) : new Date(Date.now() + 45 * 86400000);
  const today = new Date();
  const daysToExam = Math.max(1, differenceInDays(examDate, today));

  // 2. Get Weakness Scores from Module 1
  let weaknessScores = Array.from(AppDataStore.weaknessScores.values());
  try {
    if (supabase) {
      const { data } = await supabase
        .from('weakness_scores')
        .select(`
          *,
          topic:topics(
            topic_name, importance,
            chapter:chapters(chapter_name, weightage)
          ),
          subject:subjects(name, code, color),
          chapter:chapters(chapter_name, weightage)
        `)
        .eq('student_id', studentId);
      if (data && data.length > 0) {
        weaknessScores = data;
      }
    }
  } catch (err) {
    console.warn('[PlannerEngine] Weakness scores fetch fallback:', err);
  }

  // 3. Find untested topics
  const testedTopicIds = new Set(weaknessScores.map((ws) => ws.topic_id));
  const untestedTopics = SEED_TOPICS.filter((t) => !testedTopicIds.has(t.id));

  // 4. Doubt history from Module 3
  const doubtCounts: Record<number, number> = {};
  AppDataStore.doubtLogs.forEach((d) => {
    if (d.topic_id) {
      doubtCounts[d.topic_id] = (doubtCounts[d.topic_id] || 0) + 1;
    }
  });

  try {
    if (supabase) {
      const { data: dbDoubts } = await supabase
        .from('doubt_topics_log')
        .select('topic_id')
        .eq('student_id', studentId);
      if (dbDoubts) {
        dbDoubts.forEach((d: any) => {
          if (d.topic_id) {
            doubtCounts[d.topic_id] = (doubtCounts[d.topic_id] || 0) + 1;
          }
        });
      }
    }
  } catch (err) {
    console.warn('[PlannerEngine] Doubt logs fetch fallback:', err);
  }

  // 5. Mock attempts stats
  const mockAttempts = AppDataStore.attempts.filter((a) => a.attempt_source === 'mock_test');
  const mockAccuracy = mockAttempts.length > 0
    ? Math.round((mockAttempts.filter((a) => a.is_correct).length / mockAttempts.length) * 200)
    : 140;

  // 6. Combine tested + untested topics
  const allWeaknessData = [
    ...weaknessScores,
    ...untestedTopics.map((t) => {
      const subj = SEED_SUBJECTS.find((s) => s.id === t.subject_id);
      const chap = SEED_CHAPTERS.find((c) => c.id === t.chapter_id);
      return {
        id: t.id,
        student_id: studentId,
        topic_id: t.id,
        subject_id: t.subject_id,
        chapter_id: t.chapter_id,
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
        last_attempted: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        topic: t,
        subject: subj,
        chapter: chap,
      };
    }),
  ];

  // 7. Time allocation and feasibility
  const dailyMinutes = (student.daily_study_hours || 4) * 60;
  const prioritizedTopics = allocateTimeForAllTopics(
    allWeaknessData,
    daysToExam,
    dailyMinutes,
    doubtCounts
  );

  const feasibility = checkTimeFeasibility(
    prioritizedTopics,
    daysToExam,
    dailyMinutes
  );

  // 8. Build Complete Day-by-Day Schedule
  const schedule = buildCompleteSchedule({
    startDate: today,
    examDate,
    daysToExam,
    dailyMinutes,
    prioritizedTopics,
    selectedSubjectIds: [1, 2, 3],
  });

  // 9. AI Enhancement / Coaching message
  let planEnhancements: any = {
    coaching_message: `Welcome to your CUET study plan, ${student.name}! We've balanced your critical Political Science topics with regular mock tests and revision cycles. Stay consistent! — CUETBot`,
    plan_summary: [
      `Focus on critical topics like Fundamental Rights & DPSP in the first phase.`,
      `Weekly mock tests every Saturday to build exam stamina.`,
      `Final 7 days reserved exclusively for high-yield revision and formulas.`,
    ],
    warning: daysToExam < 30 ? 'Exam is less than 30 days away. Maintain daily discipline!' : null,
    plan_title: 'CUET 2026 Topper Fast-Track',
  };

  if (isOpenAIConfigured()) {
    try {
      const prompt = buildPlanGenerationPrompt({
        studentName: student.name,
        daysToExam,
        examDate: student.exam_date || '2026-05-15',
        dailyHours: student.daily_study_hours || 4,
        totalTopics: allWeaknessData.length,
        criticalTopics: allWeaknessData
          .filter((ws) => ws.weakness_level === 'critical')
          .map((ws) => ws.topic?.topic_name || '')
          .slice(0, 5),
        weakTopics: allWeaknessData
          .filter((ws) => ws.weakness_level === 'weak')
          .map((ws) => ws.topic?.topic_name || '')
          .slice(0, 5),
        strongTopics: allWeaknessData
          .filter((ws) => ws.weakness_level === 'strong' || ws.weakness_level === 'excellent')
          .map((ws) => ws.topic?.topic_name || '')
          .slice(0, 3),
        untestedTopics: untestedTopics.map((t) => t.topic_name).slice(0, 3),
        selectedSubjects: ['Political Science', 'History', 'Economics'],
        totalStudyHoursAvailable: (daysToExam * dailyMinutes) / 60,
        isFeasible: feasibility.isFeasible,
        feasibilityNote: feasibility.recommendation,
        missedSessionsLately: false,
        avgMockScore: mockAccuracy,
      });

      const openai = getOpenAIClient();
      const aiRes = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 400,
        response_format: { type: 'json_object' },
      });

      const parsed = JSON.parse(aiRes.choices[0]?.message?.content || '{}');
      if (parsed.coaching_message) {
        planEnhancements = parsed;
      }
    } catch (aiErr) {
      console.warn('[PlannerEngine] AI completion fallback:', aiErr);
    }
  }

  // 10. Save to AppDataStore & Supabase
  const planId = `plan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const totalTasksCount = schedule.reduce((sum, d) => sum + d.tasks.length, 0);

  // Deactivate old plans
  AppDataStore.studyPlans.forEach((p) => {
    if (p.student_id === studentId && p.status === 'active') {
      p.status = 'regenerated';
    }
  });

  const newPlan: StudyPlan = {
    id: planId,
    student_id: studentId,
    plan_version: AppDataStore.studyPlans.filter((p) => p.student_id === studentId).length + 1,
    exam_date: student.exam_date || '2026-05-15',
    plan_start_date: today.toISOString().split('T')[0],
    total_days: daysToExam,
    study_hours_per_day: student.daily_study_hours || 4,
    subjects_included: [1, 2, 3],
    status: 'active',
    generated_by: 'ai',
    generation_prompt: planEnhancements.coaching_message,
    total_tasks: totalTasksCount,
    completed_tasks: 0,
    completion_rate: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  AppDataStore.studyPlans.unshift(newPlan);

  // Clear previous plan's tasks/days from active view
  AppDataStore.studyPlanDays = AppDataStore.studyPlanDays.filter((d) => d.student_id !== studentId);
  AppDataStore.studyTasks = AppDataStore.studyTasks.filter((t) => t.student_id !== studentId);

  let currentTaskId = 1;
  let currentDayId = 1;

  for (const day of schedule) {
    const planDay: StudyPlanDay = {
      id: currentDayId++,
      plan_id: planId,
      student_id: studentId,
      plan_date: day.date,
      day_number: day.day_number,
      day_type: day.day_type,
      total_minutes: day.total_minutes,
      completed_minutes: 0,
      is_day_complete: false,
      completion_percentage: 0,
      daily_tip: day.daily_tip,
      daily_quote: day.daily_quote,
      created_at: new Date().toISOString(),
    };
    AppDataStore.studyPlanDays.push(planDay);

    for (const task of day.tasks) {
      const studyTask: StudyTask = {
        id: currentTaskId++,
        plan_id: planId,
        plan_day_id: planDay.id,
        student_id: studentId,
        task_order: task.task_order,
        task_type: task.task_type as any,
        subject_id: task.subject_id || null,
        chapter_id: task.chapter_id || null,
        topic_id: task.topic_id || null,
        title: task.title,
        description: task.description,
        planned_minutes: task.planned_minutes,
        actual_minutes: 0,
        status: 'pending',
        priority: task.priority as any,
        target_questions: task.target_questions,
        target_accuracy: task.target_accuracy,
        link_url: task.link_url,
        link_label: task.link_label,
        created_at: new Date().toISOString(),
      };
      AppDataStore.studyTasks.push(studyTask);
    }
  }

  // Ensure streak exists
  AppDataStore.getStreak(studentId);

  // Save log
  AppDataStore.planGenerationLogs.push({
    id: AppDataStore.planGenerationLogs.length + 1,
    student_id: studentId,
    plan_id: planId,
    trigger_reason: 'manual_generation',
    tasks_generated: totalTasksCount,
    days_generated: schedule.length,
    ai_tokens_used: 350,
    generation_time_ms: Date.now() - startTime,
    created_at: new Date().toISOString(),
  });

  // Background sync with Supabase if configured
  try {
    if (supabase) {
      await supabase.from('study_plans').update({ status: 'regenerated' }).eq('student_id', studentId).eq('status', 'active');
      await supabase.from('study_plans').insert({
        id: planId,
        student_id: studentId,
        exam_date: student.exam_date || '2026-05-15',
        plan_start_date: today.toISOString().split('T')[0],
        total_days: daysToExam,
        study_hours_per_day: student.daily_study_hours || 4,
        subjects_included: [1, 2, 3],
        status: 'active',
        total_tasks: totalTasksCount,
        generation_prompt: planEnhancements.coaching_message,
      });
    }
  } catch (dbErr) {
    console.warn('[PlannerEngine] Supabase write sync warning:', dbErr);
  }

  return {
    success: true,
    planId,
    coaching: planEnhancements,
  };
}
