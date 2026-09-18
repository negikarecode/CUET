import { NextResponse } from 'next/server';
import { searchCUETContent } from '@/lib/rag-engine';
import { SEED_TOPICS, SEED_CHAPTERS, SEED_SUBJECTS } from '@/lib/data-store';

export const dynamic = 'force-dynamic';


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const topicId = Number(searchParams.get('topic_id')) || 4;
    const topResults = Number(searchParams.get('top_results')) || 5;

    const topic = SEED_TOPICS.find((t) => t.id === topicId);
    const chapter = topic ? SEED_CHAPTERS.find((c) => c.id === topic.chapter_id) : undefined;
    const subject = topic ? SEED_SUBJECTS.find((s) => s.id === topic.subject_id) : undefined;

    const result = await searchCUETContent({
      topicName: topic?.topic_name || 'Fundamental Rights',
      chapterName: chapter?.chapter_name || 'Constitution: Why and How?',
      subjectName: subject?.name || 'Political Science',
      topicId,
      topResults,
    });

    return NextResponse.json({
      success: true,
      topicId,
      topicName: topic?.topic_name,
      chunksFound: result.chunksFound,
      chunkIds: result.chunkIds,
      contextText: result.contextText,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Search error';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topicId = Number(body.topic_id) || 4;
    const topResults = Number(body.top_results) || 5;

    const topic = SEED_TOPICS.find((t) => t.id === topicId);
    const chapter = topic ? SEED_CHAPTERS.find((c) => c.id === topic.chapter_id) : undefined;
    const subject = topic ? SEED_SUBJECTS.find((s) => s.id === topic.subject_id) : undefined;

    const result = await searchCUETContent({
      topicName: body.topic_name || topic?.topic_name || 'Fundamental Rights',
      chapterName: body.chapter_name || chapter?.chapter_name || 'Constitution: Why and How?',
      subjectName: body.subject_name || subject?.name || 'Political Science',
      topicId,
      topResults,
    });

    return NextResponse.json({
      success: true,
      topicId,
      chunksFound: result.chunksFound,
      chunkIds: result.chunkIds,
      contextText: result.contextText,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Search error';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
