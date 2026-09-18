import { NextResponse } from 'next/server';
import {
  AppDataStore,
  SEED_TOPICS,
  SEED_CHAPTERS,
  SEED_SUBJECTS,
  SEED_QUESTIONS,
} from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { checkAndIncrementUsage, logAIUsage } from '@/lib/rate-limiter';
import { generateQuestionBatch } from '@/lib/question-generator';
import { AI_MODELS } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topicId = Number(body.topic_id);
    const count = Math.min(Math.max(Number(body.count) || 5, 1), 10);

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Missing required topic_id parameter' },
        { status: 400 }
      );
    }

    // 1. Authenticate student
    let studentId = AppDataStore.student.id;
    let studentPlan: 'free' | 'basic' | 'pro' | 'ultimate' =
      AppDataStore.student.plan_type || 'pro';

    if (isSupabaseConfigured()) {
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          const { data: profile } = await supabase
            .from('students')
            .select('id, plan_type')
            .eq('auth_user_id', authData.user.id)
            .maybeSingle();

          if (profile) {
            studentId = profile.id;
            studentPlan = profile.plan_type || 'free';
          }
        }
      } catch (err) {
        console.warn('Auth check fallback to default student:', err);
      }
    }

    // 2. Get topic, chapter, subject
    let topic = SEED_TOPICS.find((t) => t.id === topicId);
    let chapter = topic
      ? SEED_CHAPTERS.find((c) => c.id === topic!.chapter_id)
      : undefined;
    let subject = topic
      ? SEED_SUBJECTS.find((s) => s.id === topic!.subject_id)
      : undefined;


    if (isSupabaseConfigured()) {
      try {
        const { data: dbTopic } = await supabase
          .from('topics')
          .select('id, topic_name, chapter_id, subject_id, chapters(id, chapter_name, chapter_number), subjects(id, name, code)')
          .eq('id', topicId)
          .maybeSingle();

        if (dbTopic) {
          topic = {
            id: dbTopic.id,
            chapter_id: dbTopic.chapter_id,
            subject_id: dbTopic.subject_id,
            topic_name: dbTopic.topic_name,
            importance: 'high',
            estimated_time: 30,
          };
          if (dbTopic.chapters) {
            chapter = {
              id: (dbTopic.chapters as any).id,
              chapter_name: (dbTopic.chapters as any).chapter_name,
              chapter_number: (dbTopic.chapters as any).chapter_number || 1,
              subject_id: dbTopic.subject_id,
              weightage: 5,
            };
          }
          if (dbTopic.subjects) {
            subject = {
              id: (dbTopic.subjects as any).id,
              name: (dbTopic.subjects as any).name,
              code: (dbTopic.subjects as any).code,
              color: '#dc2626',
              icon: '🏛️',
              total_chapters: 10,
            };
          }
        }
      } catch (err) {
        console.warn('DB topic fetch fallback:', err);
      }
    }

    const topicName = topic?.topic_name || 'CUET Topic';
    const chapterName = chapter?.chapter_name || 'CUET Chapter';
    const subjectName = subject?.name || 'Political Science';

    // 3. Get student weakness score for topic
    const currentScore = AppDataStore.weaknessScores.get(topicId);
    const accuracy = currentScore?.accuracy_score || 50;

    // 4. Rate limiter check
    const usageCheck = await checkAndIncrementUsage(studentId, studentPlan);
    if (!usageCheck.allowed || usageCheck.remaining <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'RATE_LIMIT_EXCEEDED',
          reason: usageCheck.reason,
          usage: {
            used_today: usageCheck.usedToday,
            daily_limit: usageCheck.dailyLimit,
            remaining: 0,
          },
        },
        { status: 429 }
      );
    }

    // Helper: fallback questions from bank
    const returnFallbackBatch = (reason: string) => {
      const bankQuestions = SEED_QUESTIONS.filter(
        (q) => q.topic_id === topicId
      );
      const available = bankQuestions.length > 0 ? bankQuestions : SEED_QUESTIONS;
      const selected = available.slice(0, count);

      return NextResponse.json({
        success: true,
        from_fallback: true,
        fallback_reason: reason,
        questions: selected.map((q) => ({
          id: q.id,
          question_text: q.question_text,
          option_a: q.option_a,
          option_b: q.option_b,
          option_c: q.option_c,
          option_d: q.option_d,
          difficulty: q.difficulty,
          is_ai_generated: false,
          from_cache: false,
        })),

        usage: {
          used_today: usageCheck.usedToday,
          daily_limit: usageCheck.dailyLimit,
          remaining: usageCheck.remaining,
        },
      });
    };

    // 5. Generate batch
    const batchResults = await generateQuestionBatch({
      topicId,
      topicName,
      subjectName,
      chapterName,
      studentAccuracy: Math.round(accuracy),
      count,
    });

    const successfulResults = batchResults.filter(
      (r) => r.success && r.question
    );

    if (successfulResults.length === 0) {
      const err = batchResults[0]?.error || 'Batch generation failed';
      if (err === 'NOT_ENOUGH_CONTENT') {
        return NextResponse.json(
          {
            success: false,
            error: 'NOT_ENOUGH_CONTENT',
            message: "We're adding more content for this topic! Try standard practice for now.",
          },
          { status: 404 }
        );
      }
      return returnFallbackBatch(err);
    }

    // 6. Save questions to database & AppDataStore
    const finalQuestions: any[] = [];
    let totalTokens = 0;
    let totalCost = 0;

    for (let i = 0; i < successfulResults.length; i++) {
      const res = successfulResults[i];
      const aiQ = res.question!;
      totalTokens += res.tokensUsed;
      totalCost += res.estimatedCost;

      const isAutoApproved =
        aiQ.confidence_score >= 0.85 &&
        (!aiQ.flags || aiQ.flags.length === 0 || (aiQ.flags.length === 1 && aiQ.flags[0] === ''));
      const reviewStatus = isAutoApproved ? 'auto_approved' : 'pending';
      let savedId = Date.now() + i;

      const newAiRecord = {
        id: savedId,
        subject_id: subject?.id || 1,
        chapter_id: chapter?.id || 10,
        topic_id: topicId,
        question_text: aiQ.question,
        option_a: aiQ.option_a,
        option_b: aiQ.option_b,
        option_c: aiQ.option_c,
        option_d: aiQ.option_d,
        correct_option: aiQ.correct_option,
        explanation: aiQ.explanation,
        difficulty: aiQ.difficulty,
        generated_for_student: studentId,
        model_used: AI_MODELS.QUESTION_GENERATION,
        review_status: reviewStatus as any,
        content_chunks_used: [aiQ.topic_tested],
        pinecone_ids_used: res.pineconeIds,
        generation_tokens: res.tokensUsed,
        generation_cost: res.estimatedCost,
        created_at: new Date().toISOString(),
        topic,
        subject,
        chapter,
      };

      AppDataStore.aiQuestions.unshift(newAiRecord);

      if (isAutoApproved) {
        SEED_QUESTIONS.push({
          id: savedId,
          subject_id: subject?.id || 1,
          chapter_id: chapter?.id || 10,
          topic_id: topicId,
          question_text: aiQ.question,
          option_a: aiQ.option_a,
          option_b: aiQ.option_b,
          option_c: aiQ.option_c,
          option_d: aiQ.option_d,
          correct_option: aiQ.correct_option,
          explanation: aiQ.explanation,
          difficulty: aiQ.difficulty,
          question_type: 'ai_generated',
          is_verified: true,
        });
      }

      if (isSupabaseConfigured()) {
        try {
          const { data: dbQ } = await supabase
            .from('ai_generated_questions')
            .insert({
              subject_id: subject?.id || 1,
              chapter_id: chapter?.id || 10,
              topic_id: topicId,
              question_text: aiQ.question,
              option_a: aiQ.option_a,
              option_b: aiQ.option_b,
              option_c: aiQ.option_c,
              option_d: aiQ.option_d,
              correct_option: aiQ.correct_option,
              explanation: aiQ.explanation,
              difficulty: aiQ.difficulty,
              generated_for_student: studentId,
              model_used: AI_MODELS.QUESTION_GENERATION,
              review_status: reviewStatus,
              content_chunks_used: [aiQ.topic_tested],
              pinecone_ids_used: res.pineconeIds,
              generation_tokens: res.tokensUsed,
              generation_cost: res.estimatedCost,
            })
            .select('id')
            .maybeSingle();

          if (dbQ?.id) {
            savedId = dbQ.id;
            newAiRecord.id = dbQ.id;
          }
        } catch (e) {
          console.warn('Supabase batch insert error:', e);
        }
      }

      finalQuestions.push({
        id: savedId,
        question_text: aiQ.question,
        option_a: aiQ.option_a,
        option_b: aiQ.option_b,
        option_c: aiQ.option_c,
        option_d: aiQ.option_d,
        difficulty: aiQ.difficulty,
        is_ai_generated: true,
        from_cache: false,
      });
    }

    // 7. Log AI Usage
    await logAIUsage(
      studentId,
      topicId,
      AI_MODELS.QUESTION_GENERATION,
      totalTokens,
      totalCost,
      false,
      `batch_topic_${topicId}`
    );

    const questionsUsed = finalQuestions.length;
    return NextResponse.json({
      success: true,
      questions: finalQuestions,
      usage: {
        used_today: usageCheck.usedToday + questionsUsed,
        daily_limit: usageCheck.dailyLimit,
        remaining: Math.max(0, usageCheck.remaining - questionsUsed),
      },
    });
  } catch (error: unknown) {
    console.error('Batch generation route error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
