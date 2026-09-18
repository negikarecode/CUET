import { NextRequest, NextResponse } from 'next/server';
import { generateStudyPlan } from '@/lib/planner-engine';
import { AppDataStore } from '@/lib/data-store';
import { sendPushNotification } from '@/lib/notification-service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const student = AppDataStore.student;
    const studentId = student.id;

    if (!student.exam_date) {
      return NextResponse.json(
        { success: false, error: 'Please set your exam date first in settings.' },
        { status: 400 }
      );
    }

    const result = await generateStudyPlan(studentId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // Send push notification
    sendPushNotification(studentId, {
      title: '🎯 Your Study Plan is Ready!',
      body: 'Your personalized day-by-day CUET schedule has been generated.',
      url: '/planner',
      tag: 'plan-ready',
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      plan_id: result.planId,
      message: result.coaching?.coaching_message || 'Study plan generated successfully!',
      coaching: result.coaching,
    });
  } catch (error) {
    console.error('[API /api/planner/generate] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
