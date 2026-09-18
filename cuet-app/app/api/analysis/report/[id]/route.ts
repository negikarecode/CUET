import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Search by analysis ID or session ID
    let analysis = AppDataStore.getAnalysis(id) || AppDataStore.getAnalysisBySession(id);
    let session = AppDataStore.getMockSession(id) || (analysis ? AppDataStore.getMockSession(analysis.session_id) : undefined);

    if ((!analysis || !session) && supabase) {
      try {
        if (!analysis) {
          const { data: aData } = await supabase
            .from('mock_test_analyses')
            .select('*')
            .or(`id.eq.${id},session_id.eq.${id}`)
            .maybeSingle();
          if (aData) analysis = aData;
        }

        if (!session && analysis) {
          const { data: sData } = await supabase
            .from('mock_test_sessions')
            .select('*')
            .eq('id', analysis.session_id)
            .maybeSingle();
          if (sData) session = sData;
        }
      } catch (err) {
        console.warn('[API /api/analysis/report/[id]] Supabase fetch error:', err);
      }
    }

    if (!analysis) {
      // If session exists but is still processing or pending, return session status
      if (session) {
        return NextResponse.json({
          success: true,
          status: session.analysis_status || 'processing',
          session,
          analysis: null,
        });
      }

      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    const questionLevel = AppDataStore.questionLevelAnalyses.filter(
      (q) => q.analysis_id === analysis?.id || q.session_id === analysis?.session_id
    );

    return NextResponse.json({
      success: true,
      status: 'completed',
      analysis,
      session,
      question_level: questionLevel,
      student_name: AppDataStore.student.name,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[API /api/analysis/report/[id]] Error:', errMsg);
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
