import { NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question_id, rejection_reason, reviewed_by = 'SME Reviewer' } = body;

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
      localQ.review_status = 'rejected';
      localQ.reviewed_by = reviewed_by;
      localQ.review_notes = rejection_reason || 'Rejected by reviewer';
      localQ.reviewed_at = now;
    }

    // 2. Update in Supabase
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('ai_generated_questions')
          .update({
            review_status: 'rejected',
            reviewed_by,
            review_notes: rejection_reason || 'Rejected by reviewer',
            reviewed_at: now,
          })
          .eq('id', qId);
      } catch (err) {
        console.warn('Supabase reject error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Question #${qId} rejected.`,
      question_id: qId,
      reason: rejection_reason,
    });
  } catch (error: unknown) {
    console.error('Reject error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reject question' },
      { status: 500 }
    );
  }
}
