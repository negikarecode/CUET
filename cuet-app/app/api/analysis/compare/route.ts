import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id1 = searchParams.get('id1');
    const id2 = searchParams.get('id2');

    if (!id1 || !id2) {
      return NextResponse.json(
        { success: false, error: 'Both id1 and id2 are required' },
        { status: 400 }
      );
    }

    let report1 = AppDataStore.getAnalysis(id1) || AppDataStore.getAnalysisBySession(id1);
    let report2 = AppDataStore.getAnalysis(id2) || AppDataStore.getAnalysisBySession(id2);

    if ((!report1 || !report2) && supabase) {
      try {
        if (!report1) {
          const { data } = await supabase
            .from('mock_test_analyses')
            .select('*')
            .or(`id.eq.${id1},session_id.eq.${id1}`)
            .maybeSingle();
          if (data) report1 = data;
        }
        if (!report2) {
          const { data } = await supabase
            .from('mock_test_analyses')
            .select('*')
            .or(`id.eq.${id2},session_id.eq.${id2}`)
            .maybeSingle();
          if (data) report2 = data;
        }
      } catch {}
    }

    if (!report1 || !report2) {
      return NextResponse.json(
        { success: false, error: 'One or both reports could not be found' },
        { status: 404 }
      );
    }

    const scoreDiff = report2.raw_score - report1.raw_score;
    const accuracyDiff = Math.round((report2.accuracy_rate - report1.accuracy_rate) * 10) / 10;
    const timeDiff = report2.avg_time_per_question - report1.avg_time_per_question;

    return NextResponse.json({
      success: true,
      comparison: {
        test1: report1,
        test2: report2,
        difference: {
          score_diff: scoreDiff,
          accuracy_diff: accuracyDiff,
          time_diff: timeDiff,
          improved: scoreDiff > 0,
        },
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[API /api/analysis/compare] Error:', errMsg);
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
