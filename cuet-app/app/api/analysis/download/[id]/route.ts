import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';
import { generatePerformancePDF } from '@/lib/pdf-generator';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

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
      } catch {}
    }

    if (!analysis) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    const doc = generatePerformancePDF({
      analysis,
      session,
      studentName: AppDataStore.student.name,
    });

    const pdfBuffer = doc.output('arraybuffer');
    const safeName = AppDataStore.student.name.replace(/\s+/g, '_');
    const safeDate = new Date().toISOString().split('T')[0];
    const filename = `CUET_MockTest_Report_${safeName}_${safeDate}.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfBuffer.byteLength),
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[API /api/analysis/download/[id]] Error:', errMsg);
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
