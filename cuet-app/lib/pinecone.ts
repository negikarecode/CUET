import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone client
let pineconeClient: Pinecone | null = null;

export function isPineconeConfigured(): boolean {
  const key = process.env.PINECONE_API_KEY;
  return Boolean(key && key.trim() !== '' && key !== 'your_pinecone_api_key');
}

export function getPineconeClient(): Pinecone {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || 'placeholder-key',
    });
  }
  return pineconeClient;
}

export const PINECONE_CONFIG = {
  indexName: process.env.PINECONE_INDEX_NAME || 'cuet-content',
  dimensions: 1536,
  metric: 'cosine' as const,
  namespace: 'cuet-v1',
};

export function getPineconeIndex() {
  const client = getPineconeClient();
  return client.index(process.env.PINECONE_INDEX_NAME || PINECONE_CONFIG.indexName);
}

// Metadata structure stored with each vector:
export interface PineconeMetadata {
  subject_id: number;
  subject_name: string;
  chapter_id: number;
  chapter_name: string;
  topic_id: number;
  topic_name: string;
  content_type: string;
  source_document: string;
  chunk_index: number;
  content_text: string;
  db_chunk_id: number;
}
