import { NextRequest, NextResponse } from 'next/server';
import { generateStudyPlan } from '@/lib/planner-engine';
import { AppDataStore } from '@/lib/data-store';
import { sendPushNotification } from '@/lib/notification-service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { reason = 'manual_request' } = body;
    const student = AppDataStore.student;

    const result = await generateStudyPlan(student.id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    sendPushNotification(student.id, {
      title: 'Study Plan Rebuilt!',
      body: 'Your plan has been updated with fresh priorities and schedule.',
      url: '/planner',
      tag: 'plan-regenerated',
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: 'Plan regenerated successfully',
      plan_id: result.planId,
      reason,
      coaching: result.coaching,
    });
  } catch (error) {
    console.error('[API /api/planner/regenerate] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
