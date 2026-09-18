import { supabase } from './supabase';
import { AppDataStore } from './data-store';
import { ChatMessage, ChatConversation, LanguageDetected, ChatIntent, InlineMCQ, ChatSourceChunk } from './types';

export const MAX_MEMORY_MESSAGES = Number(process.env.CHATBOT_CONVERSATION_MEMORY) || 10;

export interface SaveMessageParams {
  conversationId: string;
  studentId: string;
  role: 'student' | 'cuetbot' | 'system' | 'user' | 'assistant';
  messageText: string;
  languageDetected?: LanguageDetected;
  intentDetected?: ChatIntent;
  tokensUsed?: number;
  responseTimeMs?: number;
  sourcesUsed?: ChatSourceChunk[];
  hasInlineMCQ?: boolean;
  inlineMCQData?: InlineMCQ;
  topicId?: number;
  subjectId?: number;
}

export async function getOrCreateConversation(
  studentId: string,
  subjectId?: number | null,
  topicId?: number | null,
  title?: string
): Promise<ChatConversation> {
  try {
    if (supabase) {
      // Find active conversation
      let query = supabase
        .from('chat_conversations')
        .select('*')
        .eq('student_id', studentId)
        .eq('is_archived', false)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (subjectId) {
        query = query.eq('subject_id', subjectId);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data[0] as ChatConversation;
      }

      // Create new conversation
      const { data: newConv, error: createErr } = await supabase
        .from('chat_conversations')
        .insert({
          student_id: studentId,
          subject_id: subjectId || null,
          topic_id: topicId || null,
          title: title || 'CUET Doubt Session',
        })
        .select()
        .single();

      if (!createErr && newConv) {
        return newConv as ChatConversation;
      }
    }
  } catch (err) {
    console.warn('[ConversationMemory] Supabase query failed, falling back to AppDataStore:', err);
  }

  // AppDataStore fallback
  return AppDataStore.getOrCreateConversation(studentId, subjectId, topicId, title);
}

export async function getConversationHistory(
  conversationId: string,
  limit: number = MAX_MEMORY_MESSAGES
): Promise<ChatMessage[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (!error && data) {
        // Return in chronological order
        return (data as ChatMessage[]).reverse();
      }
    }
  } catch (err) {
    console.warn('[ConversationMemory] Failed to load messages from Supabase, using AppDataStore:', err);
  }

  // AppDataStore fallback
  const allForConv = AppDataStore.chatMessages.filter(m => m.conversation_id === conversationId);
  const sliced = allForConv.slice(-limit);
  return sliced;
}

export async function saveMessage(params: SaveMessageParams): Promise<ChatMessage> {
  const messageData = {
    conversation_id: params.conversationId,
    student_id: params.studentId,
    role: params.role,
    message_text: params.messageText,
    language_detected: params.languageDetected,
    intent_detected: params.intentDetected,
    tokens_used: params.tokensUsed || 0,
    response_time_ms: params.responseTimeMs || 0,
    sources_used: params.sourcesUsed || [],
    has_inline_mcq: params.hasInlineMCQ || false,
    inline_mcq_data: params.inlineMCQData,
  };

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert(messageData)
        .select()
        .single();

      if (!error && data) {
        // Update conversation updated_at
        await supabase
          .from('chat_conversations')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', params.conversationId);

        return data as ChatMessage;
      }
    }
  } catch (err) {
    console.warn('[ConversationMemory] Failed to save message to Supabase, using AppDataStore:', err);
  }

  // AppDataStore fallback
  return AppDataStore.addChatMessage(messageData);
}

export function buildOpenAIMessages(
  systemPrompt: string,
  history: ChatMessage[],
  currentMessage: string
): Array<{ role: 'system' | 'user' | 'assistant'; content: string }> {
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ];

  for (const msg of history) {
    const role: 'user' | 'assistant' =
      msg.role === 'cuetbot' || msg.role === 'assistant' ? 'assistant' : 'user';
    messages.push({
      role,
      content: msg.message_text,
    });
  }

  // Only add current message if it's not already the last message in history
  const lastHistory = history[history.length - 1];
  if (!lastHistory || lastHistory.message_text !== currentMessage || (lastHistory.role !== 'student' && lastHistory.role !== 'user')) {
    messages.push({
      role: 'user',
      content: currentMessage,
    });
  }

  return messages;
}
