import { NextRequest, NextResponse } from 'next/server';
import { checkChatUsage } from '@/lib/chat-rate-limiter';
import { AppDataStore } from '@/lib/data-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('student_id') || AppDataStore.student.id;
    const planType = (searchParams.get('plan') || AppDataStore.student.plan_type) as 'free' | 'basic' | 'pro' | 'ultimate';

    const usage = await checkChatUsage(studentId, planType);

    return NextResponse.json({
      success: true,
      data: {
        student_id: studentId,
        plan_type: planType,
        daily_limit: usage.dailyLimit,
        current_count: usage.currentCount,
        remaining: usage.remaining,
        is_limit_reached: !usage.allowed,
        reset_time: usage.resetTime,
      },
    });
  } catch (error) {
    console.error('[API /api/chat/usage] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
