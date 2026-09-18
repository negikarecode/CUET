import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      student_id = AppDataStore.student.id,
      topic_id,
      subject_id = 1,
      chapter_id = 10,
      selected_option,
      correct_option,
      question_id = 0,
      time_taken_seconds = 25,
      session_id,
    } = body;

    if (!topic_id || !selected_option || !correct_option) {
      return NextResponse.json(
        { success: false, error: 'topic_id, selected_option, and correct_option are required' },
        { status: 400 }
      );
    }

    const isCorrect = selected_option.trim().toUpperCase() === correct_option.trim().toUpperCase();

    // 1. Record attempt in Supabase if configured
    try {
      if (supabase) {
        await supabase.from('student_attempts').insert({
          student_id,
          question_id: question_id || null,
          subject_id,
          chapter_id,
          topic_id,
          selected_option,
          is_correct: isCorrect,
          is_skipped: false,
          time_taken_seconds,
          attempt_source: 'chat_doubt',
          session_id: session_id || null,
        });
      }
    } catch (err) {
      console.warn('[API /api/chat/mcq-attempt] Supabase insert failed, using in-memory store:', err);
    }

    // 2. Record attempt in AppDataStore and recalculate Module 1 weakness score
    const attempt = AppDataStore.recordChatAttempt({
      student_id,
      question_id,
      subject_id,
      chapter_id,
      topic_id,
      selected_option,
      is_correct: isCorrect,
      time_taken_seconds,
      session_id,
    });

    const updatedScore = AppDataStore.weaknessScores.get(topic_id);

    return NextResponse.json({
      success: true,
      data: {
        is_correct: isCorrect,
        correct_option,
        selected_option,
        attempt_id: attempt.id,
        topic_id,
        updated_weakness_level: updatedScore?.weakness_level || 'weak',
        updated_weakness_score: updatedScore?.final_weakness_score || 0,
        total_attempts: updatedScore?.total_attempts || 1,
      },
    });
  } catch (error) {
    console.error('[API /api/chat/mcq-attempt] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
