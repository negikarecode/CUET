import { NextResponse } from 'next/server';
import { AppDataStore, SEED_TOPICS, SEED_CHAPTERS, SEED_SUBJECTS, SEED_QUESTIONS } from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { checkAndIncrementUsage, logAIUsage } from '@/lib/rate-limiter';
import { generatePersonalizedQuestion } from '@/lib/question-generator';
import { AI_MODELS } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topicId = Number(body.topic_id);
    let requestedDifficulty: 'easy' | 'medium' | 'hard' = body.difficulty;

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Missing required topic_id parameter' },
        { status: 400 }
      );
    }

    // 1. Authenticate student (Supabase or default AppDataStore student)
    let studentId = AppDataStore.student.id;
    let studentPlan: 'free' | 'basic' | 'pro' | 'ultimate' = AppDataStore.student.plan_type || 'pro';

    if (isSupabaseConfigured()) {
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('id, subscription_tier')
            .eq('id', authData.user.id)
            .maybeSingle();

          if (profile) {
            studentId = profile.id;
            studentPlan = profile.subscription_tier || 'free';
          }
        }
      } catch (err) {
        console.warn('Auth check fallback to default student:', err);
      }
    }

    // 2. Get topic, chapter, subject details
    let topic = SEED_TOPICS.find((t) => t.id === topicId);
    let chapter = topic ? SEED_CHAPTERS.find((c) => c.id === topic!.chapter_id) : undefined;
    let subject = topic ? SEED_SUBJECTS.find((s) => s.id === topic!.subject_id) : undefined;


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

    // 3. Get student's current weakness score for this topic
    const currentScore = AppDataStore.weaknessScores.get(topicId);
    const accuracy = currentScore?.accuracy_score || 50;

    if (!requestedDifficulty) {
      if (accuracy < 40) requestedDifficulty = 'easy';
      else if (accuracy < 65) requestedDifficulty = 'medium';
      else requestedDifficulty = 'hard';
    }

    // 4. Questions seen before
    const seenAttempts = (AppDataStore.attempts || []).filter(
      (a) => a.student_id === studentId && a.topic_id === topicId
    );
    const questionsSeenBefore: string[] = [];
    seenAttempts.forEach((a) => {
      const q = SEED_QUESTIONS.find((sq) => sq.id === a.question_id);
      if (q) questionsSeenBefore.push(q.question_text);
    });

    // 5. Check rate limit
    const usageCheck = await checkAndIncrementUsage(studentId, studentPlan);
    if (!usageCheck.allowed) {
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

    // 6. Generate question via RAG + OpenAI
    const genResult = await generatePersonalizedQuestion({
      topicId,
      topicName,
      subjectName,
      chapterName,
      difficulty: requestedDifficulty,
      studentAccuracy: Math.round(accuracy),
      studentId,
      questionsSeenBefore,
    });

    // Helper to return fallback question from bank
    const returnFallback = (reason: string) => {
      const bankQuestions = SEED_QUESTIONS.filter(
        (q) => q.topic_id === topicId
      );
      const fallback =
        bankQuestions.length > 0
          ? bankQuestions[Math.floor(Math.random() * bankQuestions.length)]
          : SEED_QUESTIONS[0];


      return NextResponse.json({
        success: true,
        from_fallback: true,
        fallback_reason: reason,
        question: {
          id: fallback.id,
          question_text: fallback.question_text,
          option_a: fallback.option_a,
          option_b: fallback.option_b,
          option_c: fallback.option_c,
          option_d: fallback.option_d,
          difficulty: fallback.difficulty,
          is_ai_generated: false,
          from_cache: false,
        },
        usage: {
          used_today: usageCheck.usedToday,
          daily_limit: usageCheck.dailyLimit,
          remaining: usageCheck.remaining,
        },
      });
    };

    if (!genResult.success || !genResult.question) {
      if (genResult.error === 'NOT_ENOUGH_CONTENT') {
        return NextResponse.json(
          {
            success: false,
            error: 'NOT_ENOUGH_CONTENT',
            message: "We're adding more content for this topic! Try standard practice for now.",
          },
          { status: 404 }
        );
      }
      return returnFallback(genResult.error || 'AI generation failed');
    }

    const aiQ = genResult.question;

    // 7. Determine review status
    const isAutoApproved =
      aiQ.confidence_score >= 0.85 &&
      (!aiQ.flags || aiQ.flags.length === 0 || (aiQ.flags.length === 1 && aiQ.flags[0] === ''));
    const reviewStatus = isAutoApproved ? 'auto_approved' : 'pending';

    let savedQuestionId = Date.now();

    // Persist in AppDataStore
    const newAiRecord = {
      id: savedQuestionId,
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
      pinecone_ids_used: genResult.pineconeIds,
      generation_tokens: genResult.tokensUsed,
      generation_cost: genResult.estimatedCost,
      created_at: new Date().toISOString(),
      topic,
      subject,
      chapter,
    };

    AppDataStore.aiQuestions.unshift(newAiRecord);

    // If auto-approved, also store in verified questions bank
    if (isAutoApproved) {
      SEED_QUESTIONS.push({
        id: savedQuestionId,
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

    // Persist to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const { data: insertedAIQ } = await supabase
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
            pinecone_ids_used: genResult.pineconeIds,
            generation_tokens: genResult.tokensUsed,
            generation_cost: genResult.estimatedCost,
          })
          .select('id')
          .maybeSingle();

        if (insertedAIQ?.id) {
          savedQuestionId = insertedAIQ.id;
          newAiRecord.id = insertedAIQ.id;

          if (isAutoApproved) {
            await supabase.from('questions').insert({
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
        }
      } catch (err) {
        console.warn('Supabase ai_generated_questions insert fallback:', err);
      }
    }

    // Log usage if not from cache
    if (!genResult.fromCache) {
      await logAIUsage(
        studentId,
        topicId,
        AI_MODELS.QUESTION_GENERATION,
        genResult.tokensUsed,
        genResult.estimatedCost,
        genResult.fromCache,
        `topic_${topicId}`
      );
    }

    // Return question to student (CRITICAL: omit correct_option and explanation)
    return NextResponse.json({
      success: true,
      question: {
        id: savedQuestionId,
        question_text: aiQ.question,
        option_a: aiQ.option_a,
        option_b: aiQ.option_b,
        option_c: aiQ.option_c,
        option_d: aiQ.option_d,
        difficulty: aiQ.difficulty,
        is_ai_generated: false,
        from_cache: genResult.fromCache,
      },
      usage: {
        used_today: genResult.fromCache ? usageCheck.usedToday : usageCheck.usedToday + 1,
        daily_limit: usageCheck.dailyLimit,
        remaining: genResult.fromCache ? usageCheck.remaining : Math.max(0, usageCheck.remaining - 1),
      },
    });
  } catch (error: unknown) {
    console.error('Error generating AI question:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
