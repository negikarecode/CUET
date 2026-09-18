import { NextRequest, NextResponse } from 'next/server';
import { getConversationHistory, getOrCreateConversation } from '@/lib/conversation-memory';
import { AppDataStore, SEED_SUBJECTS, SEED_TOPICS } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';
import { getContextualQuickReplies, STARTER_QUICK_REPLIES } from '@/lib/quick-replies';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('student_id') || AppDataStore.student.id;
    const isList = searchParams.get('list') === 'true';
    const conversationId = searchParams.get('conversation_id');
    const topicIdParam = searchParams.get('topic_id');
    const subjectIdParam = searchParams.get('subject_id');

    const topicId = topicIdParam ? parseInt(topicIdParam, 10) : undefined;
    const subjectId = subjectIdParam ? parseInt(subjectIdParam, 10) : undefined;

    // 1. If list of conversations requested
    if (isList) {
      let conversations = [];
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('chat_conversations')
            .select('*')
            .eq('student_id', studentId)
            .eq('is_archived', false)
            .order('updated_at', { ascending: false });

          if (!error && data) {
            conversations = data;
          }
        }
      } catch (err) {
        console.warn('[API /api/chat/history] Supabase fetch failed, falling back:', err);
      }

      if (conversations.length === 0) {
        conversations = AppDataStore.chatConversations.filter(
          c => c.student_id === studentId && !c.is_archived
        );
      }

      // Join subject/topic info
      const enriched = conversations.map(c => {
        const topic = SEED_TOPICS.find(t => t.id === c.topic_id);
        const subject = SEED_SUBJECTS.find(s => s.id === c.subject_id);
        return {
          ...c,
          topic_name: topic?.topic_name,
          subject_name: subject?.name,
        };
      });

      return NextResponse.json({
        success: true,
        conversations: enriched,
      });
    }

    // 2. Specific conversation or active conversation
    let conv;
    if (conversationId) {
      conv = AppDataStore.chatConversations.find(c => c.id === conversationId);
      if (!conv && supabase) {
        const { data } = await supabase
          .from('chat_conversations')
          .select('*')
          .eq('id', conversationId)
          .single();
        if (data) conv = data;
      }
    }

    if (!conv) {
      conv = await getOrCreateConversation(studentId, subjectId, topicId);
    }

    const messages = await getConversationHistory(conv.id, 50);

    // Contextual quick replies
    const quickReplies = conv.topic_id
      ? getContextualQuickReplies(conv.topic_id)
      : STARTER_QUICK_REPLIES;

    const topic = SEED_TOPICS.find(t => t.id === conv.topic_id);
    const subject = SEED_SUBJECTS.find(s => s.id === conv.subject_id);

    return NextResponse.json({
      success: true,
      conversation: {
        ...conv,
        topic_name: topic?.topic_name,
        subject_name: subject?.name,
      },
      messages,
      quick_replies: quickReplies,
    });
  } catch (error) {
    console.error('[API /api/chat/history] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
