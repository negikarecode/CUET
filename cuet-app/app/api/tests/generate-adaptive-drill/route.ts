import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { checkAIQualificationGate } from '@/lib/ai-gate';
import { SEED_QUESTIONS, AppDataStore } from '@/lib/data-store';

export const dynamic = 'force-dynamic';

const CADENCE_LIMIT_HOURS = 12;
const CADENCE_LIMIT_MS = CADENCE_LIMIT_HOURS * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    let userId = AppDataStore.student.id;

    if (isSupabaseConfigured()) {
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          userId = authData.user.id;
        }
      } catch {
        // Fallback
      }
    }

    try {
      const body = await req.json().catch(() => ({}));
      if (body?.userId && userId === AppDataStore.student.id) {
        userId = body.userId;
      }
    } catch {
      // Ignore
    }

    // ─── 1. COLD-START QUALIFICATION GATE CHECK (Phase 2) ───────────────────
    const gateStatus = await checkAIQualificationGate(userId);
    if (!gateStatus.isUnlocked) {
      return NextResponse.json(
        {
          success: false,
          error: 'QUALIFICATION_GATE_LOCKED',
          message: `AI Adaptive Drills require at least 150 question attempts to calibrate. Current: ${gateStatus.totalAttempts}/150 questions attempted.`,
          totalAttempts: gateStatus.totalAttempts,
          requiredAttempts: gateStatus.requiredAttempts,
          remainingAttempts: gateStatus.remainingAttempts,
        },
        { status: 403 }
      );
    }

    // ─── 2. DAILY CADENCE LIMITER (Max 1 per 12 hours) ──────────────────────
    if (isSupabaseConfigured()) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('last_adaptive_drill_at')
        .eq('id', userId)
        .maybeSingle();

      if (profile?.last_adaptive_drill_at) {
        const lastDrillTime = new Date(profile.last_adaptive_drill_at).getTime();
        const elapsedMs = Date.now() - lastDrillTime;

        if (elapsedMs < CADENCE_LIMIT_MS) {
          const remainingMs = CADENCE_LIMIT_MS - elapsedMs;
          const remainingHours = Math.ceil(remainingMs / (60 * 60 * 1000));
          const nextAvailableAt = new Date(lastDrillTime + CADENCE_LIMIT_MS).toISOString();

          return NextResponse.json(
            {
              success: false,
              error: 'CADENCE_LIMIT_EXCEEDED',
              message: `Adaptive practice drills are limited to 1 every 12 hours (max 2/day). Next drill available in ~${remainingHours} hour(s).`,
              nextAvailableAt,
            },
            { status: 429 }
          );
        }
      }
    }

    // ─── 3. TOP 3 WEAKEST MICRO-TOPICS ──────────────────────────────────────
    let weakMicroTopics: string[] = [];

    if (isSupabaseConfigured()) {
      try {
        const { data: pacingRows } = await supabase
          .from('pacing_analytics_summary')
          .select('micro_topic, accuracy_percentage')
          .eq('user_id', userId)
          .order('accuracy_percentage', { ascending: true })
          .limit(3);

        if (pacingRows && pacingRows.length > 0) {
          weakMicroTopics = pacingRows.map((r: any) => r.micro_topic).filter(Boolean);
        }
      } catch (err) {
        console.warn('Pacing fetch fallback in cuet-app:', err);
      }
    }

    if (weakMicroTopics.length < 3) {
      weakMicroTopics = [
        'Fundamental Rights & Judicial Review',
        'Directive Principles & Welfare State',
        'Emergency Provisions & Federalism',
      ];
    }
    const targetTopics = weakMicroTopics.slice(0, 3);

    // ─── 4. FETCH 5 UNATTEMPTED QUESTIONS PER TOPIC FROM BANK (0 TOKENS) ────
    const drillQuestions: any[] = [];
    const usedIds = new Set<number | string>();

    for (const topic of targetTopics) {
      const matchingQuestions = SEED_QUESTIONS.filter(
        (q) => !usedIds.has(q.id)
      );

      matchingQuestions.slice(0, 5).forEach((q) => {
        usedIds.add(q.id);
        drillQuestions.push({
          id: q.id,
          question_text: q.question_text,
          option_a: q.option_a,
          option_b: q.option_b,
          option_c: q.option_c,
          option_d: q.option_d,
          difficulty: q.difficulty,
          topic,
          is_ai_generated: false,
        });
      });
    }

    const testId = `adaptive_drill_${Date.now()}`;

    // Update cadence timestamp
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('profiles')
          .update({ last_adaptive_drill_at: new Date().toISOString() })
          .eq('id', userId);
      } catch (e) {
        console.warn('Could not update last_adaptive_drill_at:', e);
      }
    }

    return NextResponse.json({
      success: true,
      testId,
      title: `15-Question Adaptive Micro-Drill: ${targetTopics.join(', ')}`,
      totalQuestions: drillQuestions.length,
      durationMinutes: 18,
      targetTopics,
      questions: drillQuestions,
    });
  } catch (error) {
    console.error('Adaptive drill error in cuet-app:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error in adaptive drill compiler.' },
      { status: 500 }
    );
  }
}
