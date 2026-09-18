import { OpenAIEmbeddings } from '@langchain/openai';
import {
  getPineconeIndex,
  PINECONE_CONFIG,
  PineconeMetadata,
  isPineconeConfigured,
} from './pinecone';
import { isSupabaseConfigured, supabase as defaultSupabase } from './supabase';
import { AppDataStore } from './data-store';
import { isOpenAIConfigured } from './openai';

// ─────────────────────────────────────────────────────
// Search Pinecone for relevant content (with timeout & DB fallback)
// ─────────────────────────────────────────────────────
export async function searchCUETContent(params: {
  topicName: string;
  subjectName: string;
  chapterName: string;
  topicId: number;
  topResults: number;
}): Promise<{
  contextText: string;
  chunksFound: number;
  chunkIds: string[];
}> {
  const { topicName, subjectName, chapterName, topicId, topResults } = params;

  // 1. Try Pinecone Vector Search if both Pinecone and OpenAI are configured
  if (isPineconeConfigured() && isOpenAIConfigured()) {
    try {
      // 5-second timeout promise
      const timeoutPromise = new Promise<{
        contextText: string;
        chunksFound: number;
        chunkIds: string[];
      }>((_, reject) =>
        setTimeout(() => reject(new Error('PINECONE_TIMEOUT')), 5000)
      );

      const searchPromise = (async () => {
        // 1. Build search query
        const searchQuery = `
          ${topicName} ${chapterName} ${subjectName} 
          CUET exam questions facts definitions
        `.trim();

        // 2. Convert query to embedding
        const embeddings = new OpenAIEmbeddings({
          model: 'text-embedding-3-small',
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        const queryVector = await embeddings.embedQuery(searchQuery);

        // 3. Search Pinecone
        const index = getPineconeIndex();

        const searchResults = await index
          .namespace(PINECONE_CONFIG.namespace)
          .query({
            vector: queryVector,
            topK: topResults,
            includeMetadata: true,
            filter: {
              topic_id: { $eq: topicId },
            },
          });

        let matches = searchResults.matches || [];

        // 4. If fewer than 2 matches, broaden search
        if (matches.length < 2) {
          const broaderSearch = await index
            .namespace(PINECONE_CONFIG.namespace)
            .query({
              vector: queryVector,
              topK: topResults,
              includeMetadata: true,
            });
          matches = broaderSearch.matches || [];
        }

        // 5. Extract and format content text
        const contentChunks = matches
          .filter((match) => match.score && match.score > 0.7)
          .map((match) => {
            const meta = match.metadata as unknown as PineconeMetadata;
            return meta?.content_text || '';
          })
          .filter((text) => text.length > 50);

        if (contentChunks.length > 0) {
          const contextText = contentChunks
            .map((chunk, i) => `[Content Block ${i + 1}]\n${chunk}`)
            .join('\n\n---\n\n');

          const chunkIds = matches.map((m) => m.id);

          return {
            contextText,
            chunksFound: contentChunks.length,
            chunkIds,
          };
        }

        return { contextText: '', chunksFound: 0, chunkIds: [] };
      })();

      const result = await Promise.race([searchPromise, timeoutPromise]);
      if (result.chunksFound > 0) {
        return result;
      }
    } catch (error) {
      console.warn('Pinecone search failed or timed out, falling back to DB chunks:', error);
    }
  }

  // ─────────────────────────────────────────────────────
  // Fallback: Query cuet_content_chunks from Supabase / AppDataStore
  // ─────────────────────────────────────────────────────
  try {
    let dbChunks: Array<{ id: number | string; content_text: string }> = [];

    if (isSupabaseConfigured()) {
      const { data, error } = await defaultSupabase
        .from('cuet_content_chunks')
        .select('id, content_text')
        .eq('topic_id', topicId)
        .order('chunk_index', { ascending: true })
        .limit(topResults);

      if (!error && data && data.length > 0) {
        dbChunks = data;
      }
    }

    // If still empty, check AppDataStore
    if (dbChunks.length === 0 && AppDataStore.contentChunks) {
      dbChunks = AppDataStore.contentChunks
        .filter((c) => c.topic_id === topicId)
        .slice(0, topResults)
        .map((c) => ({ id: c.id, content_text: c.content_text }));
    }

    if (dbChunks.length > 0) {
      const contextText = dbChunks
        .map((c, i) => `[Content Block ${i + 1}]\n${c.content_text}`)
        .join('\n\n---\n\n');

      return {
        contextText,
        chunksFound: dbChunks.length,
        chunkIds: dbChunks.map((c) => `db_${c.id}`),
      };
    }
  } catch (err) {
    console.error('Error fetching fallback content chunks:', err);
  }

  return {
    contextText: '',
    chunksFound: 0,
    chunkIds: [],
  };
}
