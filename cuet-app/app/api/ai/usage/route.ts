import { NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('student_id') || AppDataStore.student.id;
    const today = new Date().toISOString().split('T')[0];

    let allUsage: any[] = [];

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('ai_usage_tracking')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(500);

        if (!error && data) {
          allUsage = data;
        }
      } catch (err) {
        console.warn('Supabase usage fetch error:', err);
      }
    }

    if (allUsage.length === 0) {
      allUsage = AppDataStore.usageTracking || [];
    }

    // Filter student usage
    const studentUsageToday = allUsage.filter(
      (u) => u.student_id === studentId && u.usage_date === today
    );
    const studentNonCached = studentUsageToday.filter((u) => !u.was_cached);

    const planLimits: Record<string, number> = {
      free: 10,
      basic: 30,
      pro: 100,
      ultimate: 500,
    };
    const dailyLimit = planLimits[AppDataStore.student.plan_type] || 10;
    const usedToday = studentNonCached.length;
    const remaining = Math.max(0, dailyLimit - usedToday);

    // Platform level aggregates for /admin/costs
    const todayUsage = allUsage.filter((u) => u.usage_date === today);

    // 7 days ago
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    const weekUsage = allUsage.filter((u) => u.usage_date >= oneWeekAgo);

    // 30 days ago
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    const monthUsage = allUsage.filter((u) => u.usage_date >= oneMonthAgo);

    const sumCost = (list: any[]) =>
      list.reduce((sum, item) => sum + (Number(item.estimated_cost_usd) || 0), 0);

    const todaySpendUsd = sumCost(todayUsage);
    const todaySpendInr = todaySpendUsd * 83.5; // Approx 83.5 INR per USD
    const weekSpendUsd = sumCost(weekUsage);
    const monthSpendUsd = sumCost(monthUsage);

    const totalQuestions = allUsage.length;
    const totalCached = allUsage.filter((u) => u.was_cached).length;
    const cacheHitRate =
      totalQuestions > 0 ? Math.round((totalCached / totalQuestions) * 100) : 0;

    const avgCostPerQuestion =
      totalQuestions > 0 ? sumCost(allUsage) / totalQuestions : 0;

    // Per model breakdown
    const perModelMap: Record<string, { calls: number; cost: number; tokens: number }> = {};
    allUsage.forEach((u) => {
      const model = u.model_used || 'gpt-4o-mini';
      if (!perModelMap[model]) {
        perModelMap[model] = { calls: 0, cost: 0, tokens: 0 };
      }
      perModelMap[model].calls += 1;
      perModelMap[model].cost += Number(u.estimated_cost_usd) || 0;
      perModelMap[model].tokens += Number(u.total_tokens) || 0;
    });

    return NextResponse.json({
      success: true,
      student: {
        student_id: studentId,
        plan_type: AppDataStore.student.plan_type,
        used_today: usedToday,
        daily_limit: dailyLimit,
        remaining,
        cached_today: studentUsageToday.length - studentNonCached.length,
      },
      monitoring: {
        todaySpendUsd: Math.round(todaySpendUsd * 10000) / 10000,
        todaySpendInr: Math.round(todaySpendInr * 100) / 100,
        weekSpendUsd: Math.round(weekSpendUsd * 10000) / 10000,
        monthSpendUsd: Math.round(monthSpendUsd * 10000) / 10000,
        averageCostPerQuestion: Math.round(avgCostPerQuestion * 100000) / 100000,
        cacheHitRate,
        isBudgetAlert: todaySpendUsd > 10,
        perModelBreakdown: perModelMap,
        totalCalls: totalQuestions,
        recentCalls: allUsage.slice(0, 20),
      },
    });
  } catch (error: unknown) {
    console.error('Error in usage route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch AI usage statistics' },
      { status: 500 }
    );
  }
}
