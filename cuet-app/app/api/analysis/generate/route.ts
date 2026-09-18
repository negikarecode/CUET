import { NextRequest, NextResponse } from 'next/server';
import { generateFullAnalysis } from '@/lib/report-generator';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, student_id: explicitStudentId } = body;

    if (!session_id) {
      return NextResponse.json(
        { success: false, error: 'session_id is required' },
        { status: 400 }
      );
    }

    const studentId = explicitStudentId || AppDataStore.student.id;

    // Check if session exists or create if needed
    let session = AppDataStore.getMockSession(session_id);
    if (!session && supabase) {
      try {
        const { data } = await supabase
          .from('mock_test_sessions')
          .select('*')
          .eq('id', session_id)
          .single();
        if (data) session = data;
      } catch {}
    }

    // Check if already completed
    const existingAnalysis = AppDataStore.getAnalysisBySession(session_id);
    if (existingAnalysis && session?.analysis_status === 'completed') {
      return NextResponse.json({
        success: true,
        status: 'completed',
        analysisId: existingAnalysis.id,
        message: 'Analysis already generated',
      });
    }

    // Run full analysis
    const result = await generateFullAnalysis(session_id, studentId, supabase);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to generate analysis' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      status: 'completed',
      analysisId: result.analysisId,
      session_id,
      redirect_url: `/analysis/${session_id}`,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[API /api/analysis/generate] Error:', errMsg);
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
