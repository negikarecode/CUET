import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const studentId = AppDataStore.student.id;

    let sessions = AppDataStore.mockTestSessions.filter((s) => s.student_id === studentId);
    let history = AppDataStore.getScoreHistory(studentId);

    if (supabase) {
      try {
        const { data: sData } = await supabase
          .from('mock_test_sessions')
          .select('*')
          .eq('student_id', studentId)
          .order('created_at', { ascending: false });
        if (sData && sData.length > 0) sessions = sData;

        const { data: hData } = await supabase
          .from('score_history')
          .select('*')
          .eq('student_id', studentId)
          .order('test_date', { ascending: false });
        if (hData && hData.length > 0) history = hData;
      } catch (err) {
        console.warn('[API /api/analysis/history] Supabase fetch fallback:', err);
      }
    }

    const analyses = AppDataStore.mockTestAnalyses.filter((a) => a.student_id === studentId);

    return NextResponse.json({
      success: true,
      sessions,
      history,
      analyses_count: analyses.length,
      student: {
        id: studentId,
        name: AppDataStore.student.name,
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[API /api/analysis/history] Error:', errMsg);
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
