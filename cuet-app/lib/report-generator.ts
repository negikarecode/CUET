import { supabase as defaultSupabase } from './supabase';
import {
  AppDataStore,
  SEED_SUBJECTS,
  SEED_CHAPTERS,
  SEED_TOPICS,
} from './data-store';
import { calculateAllMetrics } from './performance-calculator';
import { predictCUETScore } from './score-predictor';
import { buildAnalysisPrompt } from './analysis-prompts';
import { getOpenAIClient, isOpenAIConfigured } from './openai';
import { differenceInDays, parseISO } from 'date-fns';
import { MockTestAnalysis, PerformanceMetrics } from './types';

export async function generateFullAnalysis(
  sessionId: string,
  studentId: string,
  supabaseClient?: any
): Promise<{ success: boolean; analysisId?: string; error?: string }> {
  const startTime = Date.now();
  const sb = supabaseClient || defaultSupabase;

  try {
    // ─── MARK AS PROCESSING ───────────────────────
    if (sb) {
      try {
        await sb
          .from('mock_test_sessions')
          .update({ analysis_status: 'processing' })
          .eq('id', sessionId);
      } catch (e) {
        console.warn('[ReportGenerator] Update processing status warning:', e);
      }
    }

    const memSession = AppDataStore.getMockSession(sessionId);
    if (memSession) {
      memSession.analysis_status = 'processing';
    }

    // ─── GET STUDENT & SESSION DATA ───────────────
    let student = AppDataStore.student;
    if (sb) {
      try {
        const { data } = await sb.from('profiles').select('*').eq('id', studentId).single();
        if (data) {
          student = {
            ...student,
            ...data,
            name: data.full_name || student.name,
            target_college: data.target_college || student.target_college,
          };
        }
      } catch {}
    }

    let session = memSession;
    if (sb && !session) {
      try {
        const { data } = await sb.from('mock_test_sessions').select('*').eq('id', sessionId).single();
        if (data) session = data;
      } catch {}
    }

    const daysToExam = student?.exam_date
      ? Math.max(1, differenceInDays(parseISO(student.exam_date), new Date()))
      : 45;

    // ─── LOOKUP NAMES MAP ─────────────────────────
    const subjectNames: Record<number, string> = Object.fromEntries(
      SEED_SUBJECTS.map((s) => [s.id, s.name])
    );
    const chapterNames: Record<number, string> = Object.fromEntries(
      SEED_CHAPTERS.map((c) => [c.id, c.chapter_name])
    );
    const topicNames: Record<number, string> = Object.fromEntries(
      SEED_TOPICS.map((t) => [t.id, t.topic_name])
    );

    // ─── STEP 1: CALCULATE ALL METRICS ────────────
    const metrics: PerformanceMetrics = await calculateAllMetrics(
      sessionId,
      studentId,
      sb
    );

    // ─── STEP 2: PREDICT SCORE ────────────────────
    const prediction = await predictCUETScore(
      studentId,
      metrics,
      sb
    );

    // ─── STEP 3: GET TEST NUMBER ──────────────────
    const pastHistories = AppDataStore.getScoreHistory(studentId);
    const testNumber = (session?.test_number || pastHistories.length + 1) || 1;

    // ─── STEP 4: GENERATE AI REPORT ───────────────
    let aiContent: any = {
      coaching_message: `${student?.name || 'Aspirant'}, you scored ${metrics.raw_score}/${metrics.max_possible_score} marks with ${metrics.accuracy_rate}% accuracy. Emergency Provisions aur Fundamental Rights mein improvement dikh rahi hai, but Money & Banking needs active revision before exam day! Keep the momentum going! — CUETBot`,
      strengths: [
        `High accuracy in ${metrics.subject_breakdown[0]?.subject_name || 'General Domain'} (${metrics.subject_breakdown[0]?.accuracy || 85}%)`,
        `Managed good speed on easy questions (~${metrics.difficulty_breakdown.easy.avg_time || 28}s per question)`,
        `Demonstrated solid conceptual clarity on Constitution basics`,
      ],
      improvements: [
        `Cut down on ${metrics.mistake_patterns.careless_mistakes} careless mistakes which lost ${metrics.mistake_patterns.careless_mistakes * 6} potential marks`,
        `Deep revision required for Money & Banking and Directive Principles`,
        `Avoid spending >70 seconds on uncertain questions — mark for review instead`,
      ],
      action_plan: [
        {
          priority: 1,
          action: 'Practice AI Drill: Money & Banking',
          time_minutes: 45,
          topic_or_subject: 'Money & Banking',
          why: 'Scored low accuracy in this mock test.',
          link_label: 'Start AI Practice',
        },
        {
          priority: 2,
          action: 'Resolve Doubts with CUETBot',
          time_minutes: 25,
          topic_or_subject: 'Emergency Provisions',
          why: 'Repeated mistake pattern detected across past mocks.',
          link_label: 'Open CUETBot',
        },
        {
          priority: 3,
          action: 'Review Incorrect Answers',
          time_minutes: 30,
          topic_or_subject: 'Full Mock Questions',
          why: 'Careless mistakes can be easily eliminated.',
          link_label: 'Review Answers',
        },
      ],
      exam_strategy: 'In the actual CUET paper, aim to clear the first 25 easy questions in 20 minutes. Keep a strict 45-second cap on difficult calculations.',
      time_strategy: `You spent an average of ${metrics.avg_time_wrong}s on wrong answers, resulting in ${Math.round(metrics.time_wasted_seconds / 60)} minutes wasted. Skip faster to safeguard high-confidence questions.`,
      mistake_insight: `Your ${metrics.mistake_patterns.careless_mistakes} careless mistakes resulted in a total penalty of -${metrics.mistake_patterns.careless_mistakes * 6} marks. Read question stems with care.`,
      motivational_quote: '"CUET jita wahi hai jo galtiyon se seekhta hai aur har mock mein behtar banta hai." — CUETBot',
      next_mock_goal: `Target: ${Math.min(200, metrics.raw_score + 15)} marks on next mock by fixing high-frequency errors.`,
    };

    let tokensUsed = 0;

    if (isOpenAIConfigured()) {
      try {
        const prompt = buildAnalysisPrompt({
          studentName: student?.name || 'Student',
          testNumber,
          metrics,
          prediction,
          daysToExam,
          subjectNames,
          chapterNames,
          topicNames,
        });

        const openai = getOpenAIClient();
        const aiResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 800,
          response_format: { type: 'json_object' },
        });

        const parsed = JSON.parse(aiResponse.choices[0]?.message?.content || '{}');
        if (parsed.coaching_message) {
          aiContent = { ...aiContent, ...parsed };
        }
        tokensUsed = aiResponse.usage?.total_tokens || 0;
      } catch (err) {
        console.warn('[ReportGenerator] OpenAI generation fallback to heuristics:', err);
      }
    }

    // ─── STEP 5: BUILD ACTION PLAN WITH LINKS ─────
    const sortedWeak = [...metrics.topic_breakdown].sort((a, b) => a.accuracy - b.accuracy);
    const actionPlan = (aiContent.action_plan || []).map((action: any, i: number) => {
      const weakTopic = sortedWeak[i];
      let linkUrl = '/practice/ai/4';
      if (action.link_label?.toLowerCase().includes('bot') || action.link_label?.toLowerCase().includes('chat')) {
        linkUrl = `/chat?topic=${weakTopic?.topic_id || 4}`;
      } else if (weakTopic) {
        linkUrl = `/practice/ai/${weakTopic.topic_id}?from_mock=true`;
      }
      return {
        ...action,
        link_url: linkUrl,
      };
    });

    // ─── STEP 6: SAVE ANALYSIS TO DB & MEMORY ─────
    const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const analysisRecord: MockTestAnalysis = {
      id: analysisId,
      session_id: sessionId,
      student_id: studentId,
      raw_score: metrics.raw_score,
      max_score: metrics.max_possible_score,
      percentage: metrics.percentage,
      accuracy_rate: metrics.accuracy_rate,
      attempt_rate: metrics.attempt_rate,
      total_time_seconds: metrics.total_time_seconds,
      avg_time_per_question: metrics.avg_time_per_question,
      avg_time_correct: metrics.avg_time_correct,
      avg_time_wrong: metrics.avg_time_wrong,
      avg_time_skipped: 0,
      fastest_question_seconds: metrics.fastest_question_seconds,
      slowest_question_seconds: metrics.slowest_question_seconds,
      time_wasted_seconds: metrics.time_wasted_seconds,
      subject_breakdown: metrics.subject_breakdown,
      chapter_breakdown: metrics.chapter_breakdown,
      topic_breakdown: metrics.topic_breakdown,
      difficulty_breakdown: metrics.difficulty_breakdown,
      mistake_patterns: metrics.mistake_patterns,
      predicted_cuet_score_min: prediction.predicted_min,
      predicted_cuet_score_max: prediction.predicted_max,
      predicted_rank_min: prediction.predicted_rank_min,
      predicted_rank_max: prediction.predicted_rank_max,
      confidence_level: prediction.confidence,
      score_vs_last_test: prediction.score_vs_last,
      rank_vs_last_test: 0,
      best_score_ever: prediction.best_ever,
      average_score_last_5: prediction.avg_last_5,
      score_trend: prediction.trend,
      ai_coaching_message: aiContent.coaching_message,
      ai_strengths: aiContent.strengths,
      ai_improvements: aiContent.improvements,
      ai_action_plan: actionPlan,
      ai_exam_strategy: aiContent.exam_strategy,
      ai_motivational_quote: aiContent.motivational_quote,
      ai_tokens_used: tokensUsed,
      generation_time_ms: Date.now() - startTime,
      created_at: new Date().toISOString(),
    };

    AppDataStore.saveAnalysis(analysisRecord);

    if (sb) {
      try {
        await sb.from('mock_test_analyses').insert({
          id: analysisId,
          session_id: sessionId,
          student_id: studentId,
          raw_score: metrics.raw_score,
          max_score: metrics.max_possible_score,
          percentage: metrics.percentage,
          accuracy_rate: metrics.accuracy_rate,
          attempt_rate: metrics.attempt_rate,
          total_time_seconds: metrics.total_time_seconds,
          avg_time_per_question: metrics.avg_time_per_question,
          avg_time_correct: metrics.avg_time_correct,
          avg_time_wrong: metrics.avg_time_wrong,
          fastest_question_seconds: metrics.fastest_question_seconds,
          slowest_question_seconds: metrics.slowest_question_seconds,
          time_wasted_seconds: metrics.time_wasted_seconds,
          subject_breakdown: metrics.subject_breakdown,
          chapter_breakdown: metrics.chapter_breakdown,
          topic_breakdown: metrics.topic_breakdown,
          difficulty_breakdown: metrics.difficulty_breakdown,
          mistake_patterns: metrics.mistake_patterns,
          predicted_cuet_score_min: prediction.predicted_min,
          predicted_cuet_score_max: prediction.predicted_max,
          predicted_rank_min: prediction.predicted_rank_min,
          predicted_rank_max: prediction.predicted_rank_max,
          confidence_level: prediction.confidence,
          score_vs_last_test: prediction.score_vs_last,
          best_score_ever: prediction.best_ever,
          average_score_last_5: prediction.avg_last_5,
          score_trend: prediction.trend,
          ai_coaching_message: aiContent.coaching_message,
          ai_strengths: aiContent.strengths,
          ai_improvements: aiContent.improvements,
          ai_action_plan: actionPlan,
          ai_exam_strategy: aiContent.exam_strategy,
          ai_motivational_quote: aiContent.motivational_quote,
          ai_tokens_used: tokensUsed,
          generation_time_ms: Date.now() - startTime,
        });
      } catch (err) {
        console.warn('[ReportGenerator] Supabase insert mock_test_analyses warning:', err);
      }
    }

    // ─── STEP 7: SAVE QUESTION-LEVEL ANALYSIS ─────
    const qLevelRecords = metrics.question_level.map((q) => ({
      ...q,
      analysis_id: analysisId,
    }));
    AppDataStore.saveQuestionLevelAnalysis(qLevelRecords);

    if (sb) {
      try {
        for (let i = 0; i < qLevelRecords.length; i += 50) {
          await sb.from('question_level_analysis').insert(qLevelRecords.slice(i, i + 50));
        }
      } catch (err) {
        console.warn('[ReportGenerator] Supabase question_level_analysis insert warning:', err);
      }
    }

    // ─── STEP 8: SAVE SCORE HISTORY ───────────────
    const historyRecord = {
      student_id: studentId,
      session_id: sessionId,
      test_number: testNumber,
      test_date: new Date().toISOString().split('T')[0],
      test_type: session?.test_type || 'full_mock',
      raw_score: metrics.raw_score,
      max_score: metrics.max_possible_score,
      percentage: metrics.percentage,
      accuracy: metrics.accuracy_rate,
      subject_scores: Object.fromEntries(
        metrics.subject_breakdown.map((s) => [s.subject_id, s.raw_score])
      ),
      created_at: new Date().toISOString(),
    };

    AppDataStore.saveScoreHistory(historyRecord);

    if (sb) {
      try {
        await sb.from('score_history').insert(historyRecord);
      } catch (err) {
        console.warn('[ReportGenerator] Supabase score_history insert warning:', err);
      }
    }

    // ─── STEP 9: UPDATE SESSION STATUS ────────────
    if (session) {
      session.analysis_status = 'completed';
      session.analysis_id = analysisId;
      session.correct_count = metrics.correct;
      session.wrong_count = metrics.wrong;
      session.skipped_count = metrics.skipped;
      session.attempted_count = metrics.attempted;
      session.raw_score = metrics.raw_score;
      session.percentage_score = metrics.percentage;
      session.rank_estimate = prediction.predicted_rank_min;
      session.percentile = prediction.percentile_estimate;
      AppDataStore.saveMockSession(session);
    }

    if (sb) {
      try {
        await sb
          .from('mock_test_sessions')
          .update({
            analysis_status: 'completed',
            analysis_id: analysisId,
            correct_count: metrics.correct,
            wrong_count: metrics.wrong,
            skipped_count: metrics.skipped,
            attempted_count: metrics.attempted,
            raw_score: metrics.raw_score,
            percentage_score: metrics.percentage,
            rank_estimate: prediction.predicted_rank_min,
            percentile: prediction.percentile_estimate,
          })
          .eq('id', sessionId);
      } catch (err) {
        console.warn('[ReportGenerator] Supabase session update warning:', err);
      }
    }

    // ─── STEP 10: UPDATE MODULE 1 WEAKNESSES ──────
    await updateModule1FromMockTest(studentId, metrics, sb);

    // ─── STEP 11: UPDATE MODULE 4 STUDY PLAN ──────
    await triggerPlanAdjustment(studentId, metrics, sb);

    return { success: true, analysisId };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error in report generation';
    console.error('[ReportGenerator] Error:', errMsg);

    const memSession = AppDataStore.getMockSession(sessionId);
    if (memSession) {
      memSession.analysis_status = 'failed';
    }

    if (sb) {
      try {
        await sb
          .from('mock_test_sessions')
          .update({ analysis_status: 'failed' })
          .eq('id', sessionId);
      } catch {}
    }

    return { success: false, error: errMsg };
  }
}

// ─────────────────────────────────────────────────────
// Update Module 1 weakness scores based on mock results
// ─────────────────────────────────────────────────────
async function updateModule1FromMockTest(
  studentId: string,
  metrics: PerformanceMetrics,
  supabaseClient?: any
): Promise<void> {
  const sb = supabaseClient || defaultSupabase;

  for (const topic of metrics.topic_breakdown) {
    if (topic.total_questions < 2) continue; // Skip topics with too few questions

    const existingMem = AppDataStore.weaknessScores.get(topic.topic_id);

    if (existingMem) {
      // Mock accuracy weighted at 40%, existing at 60%
      const newAccuracy = existingMem.accuracy_score * 0.6 + topic.accuracy * 0.4;
      const newFinalScore =
        newAccuracy * 0.6 +
        existingMem.speed_score * 0.25 +
        existingMem.consistency_score * 0.15;

      const level =
        newFinalScore < 40
          ? 'critical'
          : newFinalScore < 55
          ? 'weak'
          : newFinalScore < 70
          ? 'average'
          : newFinalScore < 85
          ? 'strong'
          : 'excellent';

      existingMem.accuracy_score = Math.round(newAccuracy * 10) / 10;
      existingMem.final_weakness_score = Math.round(newFinalScore * 10) / 10;
      existingMem.weakness_level = level;
      existingMem.total_attempts += topic.total_questions;
      existingMem.correct_count += topic.correct;
      existingMem.wrong_count += topic.wrong;
      existingMem.last_updated = new Date().toISOString();

      if (sb) {
        try {
          await sb
            .from('weakness_scores')
            .update({
              accuracy_score: existingMem.accuracy_score,
              final_weakness_score: existingMem.final_weakness_score,
              weakness_level: level,
              total_attempts: existingMem.total_attempts,
              correct_count: existingMem.correct_count,
              wrong_count: existingMem.wrong_count,
              last_updated: existingMem.last_updated,
            })
            .eq('student_id', studentId)
            .eq('topic_id', topic.topic_id);
        } catch {}
      }
    } else {
      // Insert new topic score record
      const topicObj = SEED_TOPICS.find((t) => t.id === topic.topic_id);
      const subjObj = SEED_SUBJECTS.find((s) => s.id === topic.subject_id);
      const chapObj = SEED_CHAPTERS.find((c) => c.id === topic.chapter_id);

      const initialScore = topic.accuracy * 0.6 + 50 * 0.4;
      AppDataStore.weaknessScores.set(topic.topic_id, {
        id: topic.topic_id,
        student_id: studentId,
        topic_id: topic.topic_id,
        subject_id: topic.subject_id,
        chapter_id: topic.chapter_id,
        total_attempts: topic.total_questions,
        correct_count: topic.correct,
        wrong_count: topic.wrong,
        skipped_count: 0,
        accuracy_score: topic.accuracy,
        speed_score: 50,
        consistency_score: 50,
        final_weakness_score: initialScore,
        weakness_level: topic.weakness_signal,
        avg_time_seconds: topic.avg_time_seconds,
        last_attempted: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        topic: topicObj,
        subject: subjObj,
        chapter: chapObj,
      });

      if (sb) {
        try {
          await sb.from('weakness_scores').insert({
            student_id: studentId,
            topic_id: topic.topic_id,
            subject_id: topic.subject_id,
            chapter_id: topic.chapter_id,
            total_attempts: topic.total_questions,
            correct_count: topic.correct,
            wrong_count: topic.wrong,
            skipped_count: 0,
            accuracy_score: topic.accuracy,
            speed_score: 50,
            consistency_score: 50,
            final_weakness_score: initialScore,
            weakness_level: topic.weakness_signal,
            avg_time_seconds: topic.avg_time_seconds,
            last_attempted: new Date().toISOString(),
          });
        } catch {}
      }
    }
  }
}

// ─────────────────────────────────────────────────────
// Trigger Module 4 plan adjustment after mock test
// ─────────────────────────────────────────────────────
async function triggerPlanAdjustment(
  studentId: string,
  metrics: PerformanceMetrics,
  supabaseClient?: any
): Promise<void> {
  const sb = supabaseClient || defaultSupabase;

  // Find critical topics from mock (<40% accuracy)
  const criticalTopicsFromMock = metrics.topic_breakdown
    .filter((t) => t.accuracy < 40 && t.total_questions >= 2)
    .map((t) => t.topic_id);

  if (criticalTopicsFromMock.length === 0) return;

  // Elevate upcoming tasks in Module 4 to 'critical'
  AppDataStore.studyTasks.forEach((task) => {
    if (
      task.student_id === studentId &&
      task.status === 'pending' &&
      task.topic_id &&
      criticalTopicsFromMock.includes(task.topic_id)
    ) {
      task.priority = 'critical';
    }
  });

  if (sb) {
    try {
      await sb
        .from('study_tasks')
        .update({ priority: 'critical' })
        .eq('student_id', studentId)
        .eq('status', 'pending')
        .in('topic_id', criticalTopicsFromMock);
    } catch {}
  }
}
