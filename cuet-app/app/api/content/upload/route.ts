import { NextResponse } from 'next/server';
import {
  processAndEmbedContent,
  extractTextFromPDF,
} from '@/lib/content-processor';
import {
  SEED_SUBJECTS,
  SEED_CHAPTERS,
  SEED_TOPICS,
  AppDataStore,
} from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';


export async function POST(req: Request) {
  try {
    const contentTypeHeader = req.headers.get('content-type') || '';

    let contentText = '';
    let topicId = 0;
    let chapterId = 0;
    let subjectId = 0;
    let contentType = 'notes';
    let sourceDocument = 'Admin Upload';

    if (contentTypeHeader.includes('multipart/form-data')) {
      const formData = await req.formData();

      const textInput = (formData.get('text') || formData.get('content_text')) as string | null;
      const fileInput = formData.get('file') as File | null;

      topicId = Number(formData.get('topic_id'));
      chapterId = Number(formData.get('chapter_id'));
      subjectId = Number(formData.get('subject_id'));
      contentType = (formData.get('content_type') as string) || 'notes';
      sourceDocument =
        (formData.get('source_document') as string) ||
        (fileInput ? fileInput.name : 'Uploaded Notes');

      if (fileInput && fileInput.size > 0) {
        const arrayBuffer = await fileInput.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        if (fileInput.type === 'application/pdf' || fileInput.name.endsWith('.pdf')) {
          contentText = await extractTextFromPDF(buffer);
        } else {
          contentText = buffer.toString('utf-8');
        }
      } else if (textInput) {
        contentText = textInput;
      }
    } else {
      // JSON payload
      const body = await req.json();
      contentText = body.content_text || body.text || '';
      topicId = Number(body.topic_id);
      chapterId = Number(body.chapter_id);
      subjectId = Number(body.subject_id);
      contentType = body.content_type || 'notes';
      sourceDocument = body.source_document || 'Admin Upload';
    }

    if (!contentText || contentText.trim().length < 20) {
      return NextResponse.json(
        { success: false, error: 'Content text must be at least 20 characters long' },
        { status: 400 }
      );
    }

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Valid topic_id is required' },
        { status: 400 }
      );
    }

    // Resolve subject & chapter if not provided
    const topic = SEED_TOPICS.find((t) => t.id === topicId);
    if (topic) {
      if (!chapterId) chapterId = topic.chapter_id;
      if (!subjectId) subjectId = topic.subject_id;
    }

    const subject = SEED_SUBJECTS.find((s) => s.id === subjectId);
    const chapter = SEED_CHAPTERS.find((c) => c.id === chapterId);

    const subjectName = subject?.name || 'Political Science';
    const chapterName = chapter?.chapter_name || 'Constitution';
    const topicName = topic?.topic_name || 'Topic';

    // Process & embed content
    const sb = isSupabaseConfigured() ? supabase : undefined;
    const result = await processAndEmbedContent(
      contentText,
      topicId,
      chapterId,
      subjectId,
      contentType,
      sourceDocument,
      subjectName,
      chapterName,
      topicName,
      sb
    );

    return NextResponse.json({
      success: true,
      message: `Content processed successfully. ${result.chunksCreated} chunks created, ${result.vectorsUploaded} vectors uploaded.`,
      result,
      totalExistingChunksForTopic:
        (AppDataStore.contentChunks || []).filter((c) => c.topic_id === topicId).length,
    });
  } catch (error: unknown) {
    console.error('Content upload error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Upload failed: ${msg}` },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const topicId = searchParams.get('topic_id');

    let chunks = AppDataStore.contentChunks || [];

    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('cuet_content_chunks').select('*').order('created_at', { ascending: false });
        if (topicId) {
          query = query.eq('topic_id', Number(topicId));
        }
        const { data, error } = await query;
        if (!error && data) {
          chunks = data;
        }
      } catch (e) {
        console.warn('Supabase fetch chunks fallback:', e);
      }
    }

    if (topicId) {
      chunks = chunks.filter((c) => c.topic_id === Number(topicId));
    }

    return NextResponse.json({
      success: true,
      count: chunks.length,
      chunks,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content chunks' },
      { status: 500 }
    );
  }
}
