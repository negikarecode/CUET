import { NextResponse } from 'next/server';
import {
  generateEmbeddings,
  upsertToPinecone,
} from '@/lib/content-processor';
import {
  AppDataStore,
  SEED_SUBJECTS,
  SEED_CHAPTERS,
  SEED_TOPICS,
} from '@/lib/data-store';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { isPineconeConfigured } from '@/lib/pinecone';
import { isOpenAIConfigured } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { chunk_ids, topic_id } = body;

    if (!isOpenAIConfigured() || !isPineconeConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'CONFIG_ERROR',
          message: 'Both OpenAI and Pinecone API keys are required for embedding vectors.',
        },
        { status: 400 }
      );
    }

    let chunksToEmbed: any[] = [];

    if (isSupabaseConfigured()) {
      let query = supabase.from('cuet_content_chunks').select('*');
      if (chunk_ids && Array.isArray(chunk_ids) && chunk_ids.length > 0) {
        query = query.in('id', chunk_ids);
      } else if (topic_id) {
        query = query.eq('topic_id', topic_id).eq('is_embedded', false);
      } else {
        query = query.eq('is_embedded', false).limit(50);
      }

      const { data, error } = await query;
      if (!error && data) {
        chunksToEmbed = data;
      }
    }

    if (chunksToEmbed.length === 0) {
      chunksToEmbed = (AppDataStore.contentChunks || []).filter(
        (c) =>
          (!chunk_ids || chunk_ids.includes(c.id)) &&
          (!topic_id || c.topic_id === topic_id) &&
          !c.is_embedded
      );
    }

    if (chunksToEmbed.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No pending chunks found for embedding.',
        embeddedCount: 0,
      });
    }

    const texts = chunksToEmbed.map((c) => c.content_text);
    const embeddings = await generateEmbeddings(texts);

    const firstChunk = chunksToEmbed[0];
    const topic = SEED_TOPICS.find((t) => t.id === firstChunk.topic_id);
    const chapter = SEED_CHAPTERS.find((c) => c.id === firstChunk.chapter_id);
    const subject = SEED_SUBJECTS.find((s) => s.id === firstChunk.subject_id);

    await upsertToPinecone(texts, embeddings, {
      subject_id: firstChunk.subject_id,
      subject_name: subject?.name || 'Political Science',
      chapter_id: firstChunk.chapter_id,
      chapter_name: chapter?.chapter_name || 'Constitution',
      topic_id: firstChunk.topic_id,
      topic_name: topic?.topic_name || 'Fundamental Rights',
      content_type: firstChunk.content_type || 'notes',
      source_document: firstChunk.source_document || 'NCERT',
      db_chunk_ids: chunksToEmbed.map((c) => c.id),
    });

    const embeddedIds = chunksToEmbed.map((c) => c.id);

    if (isSupabaseConfigured()) {
      await supabase
        .from('cuet_content_chunks')
        .update({ is_embedded: true })
        .in('id', embeddedIds);
    }

    AppDataStore.contentChunks.forEach((c) => {
      if (embeddedIds.includes(c.id)) {
        c.is_embedded = true;
      }
    });

    const totalTokens = texts.join(' ').split(/\s+/).length * 1.3;
    const cost = (totalTokens / 1000) * 0.00002;

    return NextResponse.json({
      success: true,
      message: `Successfully embedded and upserted ${chunksToEmbed.length} chunks to Pinecone.`,
      embeddedCount: chunksToEmbed.length,
      estimatedCost: cost,
    });
  } catch (error: unknown) {
    console.error('Embed error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Embedding failed: ${msg}` },
      { status: 500 }
    );
  }
}
