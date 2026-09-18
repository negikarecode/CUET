import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export function isOpenAIConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY;
  return Boolean(key && key.trim() !== '' && key !== 'your_openai_api_key');
}

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'placeholder-key',
    });
  }
  return openaiClient;
}

// Models used in this app:
export const AI_MODELS = {
  QUESTION_GENERATION: 'gpt-4o-mini',
  // Cheapest good model: $0.15/1M input, $0.60/1M output
  
  EMBEDDINGS: 'text-embedding-3-small',
  // For vectorizing content: $0.02/1M tokens
  // Produces 1536-dimensional vectors
  
  FALLBACK: 'gpt-3.5-turbo',
  // Even cheaper if needed
};

// Cost tracking constants (USD per 1K tokens):
export const TOKEN_COSTS = {
  'gpt-4o-mini': {
    input: 0.00015, // per 1K tokens
    output: 0.0006, // per 1K tokens
  },
  'text-embedding-3-small': {
    input: 0.00002, // per 1K tokens
    output: 0,
  },
};

export function estimateCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const costs = TOKEN_COSTS[model as keyof typeof TOKEN_COSTS];
  if (!costs) return 0;
  
  return (
    (inputTokens / 1000 * costs.input) +
    (outputTokens / 1000 * costs.output)
  );
}
