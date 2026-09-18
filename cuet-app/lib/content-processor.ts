import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OpenAIEmbeddings } from '@langchain/openai';
import {
  getPineconeIndex,
  PINECONE_CONFIG,
  isPineconeConfigured,
} from './pinecone';
import { createClient } from '@supabase/supabase-js';
import { isOpenAIConfigured } from './openai';
import { AppDataStore } from './data-store';
// eslint-disable-next-line
const pdfParse = require('pdf-parse');


// ─────────────────────────────────────────────────────
// HELPER: Extract text from PDF buffer
// ─────────────────────────────────────────────────────
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  const data = await pdfParse(pdfBuffer);
  return data.text || '';
}


// ─────────────────────────────────────────────────────
// STEP A: Split text into chunks
// ─────────────────────────────────────────────────────
export async function splitTextIntoChunks(
  text: string,
  chunkSize: number = 800,
  chunkOverlap: number = 150
): Promise<string[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
    separators: ['\n\n', '\n', '. ', ', ', ' '],
  });

  return await splitter.splitText(text);
}

// ─────────────────────────────────────────────────────
// STEP B: Generate embeddings for chunks
// ─────────────────────────────────────────────────────
export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  if (!isOpenAIConfigured()) {
    throw new Error('OpenAI API key is required to generate embeddings.');
  }

  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
    openAIApiKey: process.env.OPENAI_API_KEY,
    batchSize: 100,
  });

  return await embeddings.embedDocuments(texts);
}

// ─────────────────────────────────────────────────────
// STEP C: Upsert vectors to Pinecone
// ─────────────────────────────────────────────────────
export async function upsertToPinecone(
  chunks: string[],
  embeddings: number[][],
  metadata: {
    subject_id: number;
    subject_name: string;
    chapter_id: number;
    chapter_name: string;
    topic_id: number;
    topic_name: string;
    content_type: string;
    source_document: string;
    db_chunk_ids: (number | string)[];
  }
): Promise<void> {
  if (!isPineconeConfigured()) {
    throw new Error('Pinecone is not configured.');
  }

  const index = getPineconeIndex();

  const vectors = chunks.map((chunk, i) => ({
    id: `chunk_${metadata.db_chunk_ids[i] || i}_${Date.now()}_${i}`,
    values: embeddings[i],
    metadata: {
      subject_id: metadata.subject_id,
      subject_name: metadata.subject_name,
      chapter_id: metadata.chapter_id,
      chapter_name: metadata.chapter_name,
      topic_id: metadata.topic_id,
      topic_name: metadata.topic_name,
      content_type: metadata.content_type,
      source_document: metadata.source_document,
      chunk_index: i,
      content_text: chunk,
      db_chunk_id: Number(metadata.db_chunk_ids[i]) || 0,
    },
  }));

  // Upsert in batches of 100 (Pinecone limit)
  const batchSize = 100;
  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);
    await index.namespace(PINECONE_CONFIG.namespace).upsert(batch);
  }
}

// ─────────────────────────────────────────────────────
// MAIN: Full pipeline - text → Pinecone + DB
// ─────────────────────────────────────────────────────
export async function processAndEmbedContent(
  contentText: string,
  topicId: number,
  chapterId: number,
  subjectId: number,
  contentType: string,
  sourceDocument: string,
  subjectName: string,
  chapterName: string,
  topicName: string,
  supabase?: any
): Promise<{
  chunksCreated: number;
  vectorsUploaded: number;
  cost: number;
}> {
  // 1. Split text into chunks
  const chunks = await splitTextIntoChunks(contentText);

  if (chunks.length === 0) {
    return { chunksCreated: 0, vectorsUploaded: 0, cost: 0 };
  }

  // 2. Save chunks to Supabase & AppDataStore
  const dbChunkIds: (number | string)[] = [];

  if (supabase) {
    try {
      const recordsToInsert: any[] = chunks.map((chunk, i) => ({
        subject_id: subjectId,
        chapter_id: chapterId,
        topic_id: topicId,
        content_text: chunk,
        content_type: contentType,
        source_document: sourceDocument,
        chunk_index: i,
        is_embedded: false,
      }));

      const { data, error } = await supabase
        .from('cuet_content_chunks')
        .insert(recordsToInsert)
        .select('id');

      if (!error && data) {
        (data as any[]).forEach((r) => dbChunkIds.push(r.id));
      }
    } catch (err) {
      console.warn('Supabase cuet_content_chunks insert fallback:', err);
    }
  }

  // Also save to AppDataStore
  if (!AppDataStore.contentChunks) {
    AppDataStore.contentChunks = [];
  }
  chunks.forEach((chunk, i) => {
    const fallbackId = AppDataStore.contentChunks.length + 1;
    if (dbChunkIds.length <= i) {
      dbChunkIds.push(fallbackId);
    }
    AppDataStore.contentChunks.push({
      id: Number(dbChunkIds[i]) || fallbackId,
      subject_id: subjectId,
      chapter_id: chapterId,
      topic_id: topicId,
      content_text: chunk,
      content_type: (contentType as any) || 'notes',
      source_document: sourceDocument,
      chunk_index: i,
      pinecone_id: `chunk_${dbChunkIds[i]}`,
      is_embedded: false,
      created_at: new Date().toISOString(),
    });
  });

  // 3. Generate embeddings via OpenAI & Upload to Pinecone (if configured)
  let vectorsUploaded = 0;
  const totalTokens = chunks.join(' ').split(/\s+/).length * 1.3;
  const cost = (totalTokens / 1000) * 0.00002;

  if (isOpenAIConfigured() && isPineconeConfigured()) {
    const embeddings = await generateEmbeddings(chunks);
    await upsertToPinecone(chunks, embeddings, {
      subject_id: subjectId,
      subject_name: subjectName,
      chapter_id: chapterId,
      chapter_name: chapterName,
      topic_id: topicId,
      topic_name: topicName,
      content_type: contentType,
      source_document: sourceDocument,
      db_chunk_ids: dbChunkIds,
    });
    vectorsUploaded = chunks.length;

    // 4. Mark chunks as embedded
    if (supabase) {
      try {
        await supabase
          .from('cuet_content_chunks')
          .update({ is_embedded: true } as any)
          .in('id', dbChunkIds);
      } catch (err) {
        console.warn('Supabase mark embedded fallback:', err);
      }
    }


    AppDataStore.contentChunks.forEach((c) => {
      if (dbChunkIds.includes(c.id)) {
        c.is_embedded = true;
      }
    });
  }

  return {
    chunksCreated: chunks.length,
    vectorsUploaded,
    cost,
  };
}
