import { NextResponse } from 'next/server';
import { AppDataStore, SEED_QUESTIONS } from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question_id, review_notes, reviewed_by = 'SME Reviewer' } = body;

    if (!question_id) {
      return NextResponse.json(
        { success: false, error: 'Missing question_id' },
        { status: 400 }
      );
    }

    const qId = Number(question_id);
    const now = new Date().toISOString();

    // 1. Update in AppDataStore
    const localQ = AppDataStore.aiQuestions?.find((q) => q.id === qId);
    if (localQ) {
      localQ.review_status = 'approved';
      localQ.reviewed_by = reviewed_by;
      localQ.review_notes = review_notes || '';
      localQ.reviewed_at = now;

      // Add to verified question bank if not present
      if (!SEED_QUESTIONS.some((q) => q.id === qId)) {
        SEED_QUESTIONS.push({
          id: localQ.id,
          subject_id: localQ.subject_id,
          chapter_id: localQ.chapter_id,
          topic_id: localQ.topic_id,
          question_text: localQ.question_text,
          option_a: localQ.option_a,
          option_b: localQ.option_b,
          option_c: localQ.option_c,
          option_d: localQ.option_d,
          correct_option: localQ.correct_option,
          explanation: localQ.explanation,
          difficulty: localQ.difficulty,
          question_type: 'ai_generated',
          is_verified: true,
        });
      }
    }

    // 2. Update in Supabase
    let newQuestionsTableId = null;
    if (isSupabaseConfigured()) {
      try {
        const { data: aiQ } = await supabase
          .from('ai_generated_questions')
          .select('*')
          .eq('id', qId)
          .maybeSingle();

        if (aiQ) {
          // Insert into questions table
          const { data: insertedQ } = await supabase
            .from('questions')
            .insert({
              subject_id: aiQ.subject_id,
              chapter_id: aiQ.chapter_id,
              topic_id: aiQ.topic_id,
              question_text: aiQ.question_text,
              option_a: aiQ.option_a,
              option_b: aiQ.option_b,
              option_c: aiQ.option_c,
              option_d: aiQ.option_d,
              correct_option: aiQ.correct_option,
              explanation: aiQ.explanation,
              difficulty: aiQ.difficulty,
              question_type: 'ai_generated',
              is_verified: true,
            })
            .select('id')
            .maybeSingle();

          newQuestionsTableId = insertedQ?.id || null;

          await supabase
            .from('ai_generated_questions')
            .update({
              review_status: 'approved',
              reviewed_by,
              review_notes: review_notes || null,
              reviewed_at: now,
              questions_table_id: newQuestionsTableId,
            })
            .eq('id', qId);
        }
      } catch (err) {
        console.warn('Supabase approve error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Question #${qId} approved and added to live question bank.`,
      question_id: qId,
      questions_table_id: newQuestionsTableId,
    });
  } catch (error: unknown) {
    console.error('Approve error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to approve question' },
      { status: 500 }
    );
  }
}
