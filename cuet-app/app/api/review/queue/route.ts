import { NextResponse } from 'next/server';
import { AppDataStore, SEED_SUBJECTS, SEED_CHAPTERS, SEED_TOPICS } from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.max(1, Math.min(50, Number(searchParams.get('limit')) || 10));
    const status = searchParams.get('status') || 'pending';
    const subjectId = searchParams.get('subject_id') ? Number(searchParams.get('subject_id')) : null;
    const difficulty = searchParams.get('difficulty');
    const minConfidence = searchParams.get('min_confidence') ? Number(searchParams.get('min_confidence')) : null;

    let items: any[] = [];
    let totalCount = 0;

    if (isSupabaseConfigured()) {
      try {
        let query = supabase
          .from('ai_generated_questions')
          .select('*, topics(id, topic_name), chapters(id, chapter_name, chapter_number), subjects(id, name, code)', { count: 'exact' });

        if (status !== 'all') {
          query = query.eq('review_status', status);
        }
        if (subjectId) {
          query = query.eq('subject_id', subjectId);
        }
        if (difficulty && difficulty !== 'all') {
          query = query.eq('difficulty', difficulty);
        }

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, count, error } = await query
          .order('created_at', { ascending: false })
          .range(from, to);

        if (!error && data) {
          items = data.map((q) => ({
            ...q,
            topic: q.topics,
            chapter: q.chapters,
            subject: q.subjects,
          }));
          totalCount = count || data.length;
        }
      } catch (err) {
        console.warn('Supabase review queue fetch fallback:', err);
      }
    }

    if (items.length === 0) {
      let filtered = (AppDataStore.aiQuestions || []).filter((q) => {
        if (status !== 'all' && q.review_status !== status) return false;
        if (subjectId && q.subject_id !== subjectId) return false;
        if (difficulty && difficulty !== 'all' && q.difficulty !== difficulty) return false;
        return true;
      });

      // Enrich with topic, chapter, subject
      filtered = filtered.map((q) => {
        const t = SEED_TOPICS.find((top) => top.id === q.topic_id);
        const c = t ? SEED_CHAPTERS.find((chap) => chap.id === t.chapter_id) : undefined;
        const s = t ? SEED_SUBJECTS.find((subj) => subj.id === t.subject_id) : undefined;
        return {
          ...q,
          topic: t,
          chapter: c,
          subject: s,
        };
      });

      totalCount = filtered.length;
      const from = (page - 1) * limit;
      items = filtered.slice(from, from + limit);
    }

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
    });
  } catch (error: unknown) {
    console.error('Review queue error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review queue' },
      { status: 500 }
    );
  }
}
