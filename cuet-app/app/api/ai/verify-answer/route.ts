import { NextResponse } from 'next/server';
import { AppDataStore, SEED_QUESTIONS } from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import {
  calculateAccuracyScore,
  calculateSpeedScore,
  calculateConsistencyScore,
  calculateFinalWeaknessScore,
  getWeaknessLevel,
} from '@/lib/weakness-engine';
import { StudentAttempt, WeaknessScore } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      question_id,
      selected_option,
      time_taken_seconds = 0,
      topic_id,
      subject_id = 1,
      chapter_id = 10,
      session_id = `ai-session-${Date.now()}`,
    } = body;

    if (!question_id) {
      return NextResponse.json(
        { success: false, error: 'Missing question_id' },
        { status: 400 }
      );
    }

    const studentId = AppDataStore.student.id;

    // 1. Look up question in AppDataStore.aiQuestions, SEED_QUESTIONS, or Supabase
    let foundQuestion: any =
      AppDataStore.aiQuestions?.find((q) => q.id === Number(question_id)) ||
      SEED_QUESTIONS.find((q) => q.id === Number(question_id));

    if (!foundQuestion && isSupabaseConfigured()) {
      try {
        const { data: aiQ } = await supabase
          .from('ai_generated_questions')
          .select('*')
          .eq('id', question_id)
          .maybeSingle();
        if (aiQ) foundQuestion = aiQ;
        else {
          const { data: stdQ } = await supabase
            .from('questions')
            .select('*')
            .eq('id', question_id)
            .maybeSingle();
          if (stdQ) foundQuestion = stdQ;
        }
      } catch (err) {
        console.warn('Supabase find question error:', err);
      }
    }

    const correctOption = foundQuestion?.correct_option || 'A';
    const explanation =
      foundQuestion?.explanation ||
      'Based on the verified CUET NCERT syllabus material.';
    const actualTopicId = foundQuestion?.topic_id || topic_id || 4;
    const actualSubjectId = foundQuestion?.subject_id || subject_id || 1;
    const actualChapterId = foundQuestion?.chapter_id || chapter_id || 10;

    const isSkipped = !selected_option;
    const isCorrect = isSkipped ? false : selected_option === correctOption;
    const now = new Date().toISOString();

    // 2. Record Attempt
    const newAttempt: StudentAttempt = {
      id: AppDataStore.attempts.length + 1,
      student_id: studentId,
      question_id: Number(question_id),
      subject_id: actualSubjectId,
      chapter_id: actualChapterId,
      topic_id: actualTopicId,
      selected_option: selected_option || null,
      is_correct: isCorrect,
      is_skipped: isSkipped,
      time_taken_seconds: Number(time_taken_seconds) || 0,
      attempt_source: 'practice',

      session_id,
      attempt_number: 1,
      attempted_at: now,
    };

    AppDataStore.attempts.push(newAttempt);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('student_attempts').insert([newAttempt]);
      } catch (err) {
        console.warn('Supabase attempt insert fallback:', err);
      }
    }

    // 3. Recalculate Weakness Score for this topic
    const topicAttempts = AppDataStore.attempts.filter(
      (a) => a.student_id === studentId && a.topic_id === actualTopicId
    );

    const totalAttempts = topicAttempts.length;
    const correctCount = topicAttempts.filter((a) => a.is_correct).length;
    const wrongCount = topicAttempts.filter(
      (a) => !a.is_correct && !a.is_skipped
    ).length;
    const skippedCount = topicAttempts.filter((a) => a.is_skipped).length;
    const totalTime = topicAttempts.reduce(
      (sum, a) => sum + a.time_taken_seconds,
      0
    );
    const avgTimeSeconds = totalAttempts > 0 ? totalTime / totalAttempts : 0;

    const accuracyScore = calculateAccuracyScore(
      correctCount,
      wrongCount,
      skippedCount
    );
    const speedScore = calculateSpeedScore(avgTimeSeconds, 'medium');
    const consistencyScore = calculateConsistencyScore(topicAttempts);
    const finalWeaknessScore = calculateFinalWeaknessScore(
      accuracyScore,
      speedScore,
      consistencyScore
    );
    const weaknessLevel = getWeaknessLevel(finalWeaknessScore);

    const updatedScore: WeaknessScore = {
      id: actualTopicId,
      student_id: studentId,
      topic_id: actualTopicId,
      subject_id: actualSubjectId,
      chapter_id: actualChapterId,
      total_attempts: totalAttempts,
      correct_count: correctCount,
      wrong_count: wrongCount,
      skipped_count: skippedCount,
      accuracy_score: accuracyScore,
      speed_score: speedScore,
      consistency_score: consistencyScore,
      final_weakness_score: finalWeaknessScore,
      weakness_level: weaknessLevel,
      avg_time_seconds: Math.round(avgTimeSeconds * 100) / 100,
      last_attempted: now,
      last_updated: now,
    };

    AppDataStore.weaknessScores.set(actualTopicId, updatedScore);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('weakness_scores').upsert([
          {
            student_id: studentId,
            topic_id: actualTopicId,
            subject_id: actualSubjectId,
            chapter_id: actualChapterId,
            total_attempts: totalAttempts,
            correct_count: correctCount,
            wrong_count: wrongCount,
            skipped_count: skippedCount,
            accuracy_score: accuracyScore,
            speed_score: speedScore,
            consistency_score: consistencyScore,
            final_weakness_score: finalWeaknessScore,
            weakness_level: weaknessLevel,
            avg_time_seconds: avgTimeSeconds,
            last_attempted: now,
            last_updated: now,
          },
        ]);
      } catch (err) {
        console.warn('Supabase weakness_scores upsert fallback:', err);
      }
    }

    return NextResponse.json({
      success: true,
      is_correct: isCorrect,
      correct_option: correctOption,
      explanation,
      weaknessScore: updatedScore,
    });
  } catch (error: unknown) {
    console.error('Error verifying answer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify answer' },
      { status: 500 }
    );
  }
}
