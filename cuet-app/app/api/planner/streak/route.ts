import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { calculateStreakDetails } from '@/lib/streak-tracker';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const student = AppDataStore.student;
    const rawStreak = AppDataStore.getStreak(student.id);
    const streakData = calculateStreakDetails(rawStreak, student.name);

    return NextResponse.json({
      success: true,
      streak: streakData,
    });
  } catch (error) {
    console.error('[API /api/planner/streak] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
