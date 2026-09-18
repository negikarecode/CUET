import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AppDataStore } from '@/lib/data-store';
import { getOrCreateConversation } from '@/lib/conversation-memory';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { student_id = AppDataStore.student.id, conversation_id, subject_id, topic_id } = body;

    // Archive existing if provided
    if (conversation_id) {
      try {
        if (supabase) {
          await supabase
            .from('chat_conversations')
            .update({ is_archived: true })
            .eq('id', conversation_id);
        }
      } catch (err) {
        console.warn('[API /api/chat/clear] Supabase archive failed:', err);
      }

      const existing = AppDataStore.chatConversations.find(c => c.id === conversation_id);
      if (existing) {
        existing.is_archived = true;
      }
    }

    // Generate new conversation
    const newConv = await getOrCreateConversation(
      student_id,
      subject_id || null,
      topic_id || null,
      'New Doubt Session'
    );

    return NextResponse.json({
      success: true,
      message: 'Conversation cleared and new session started',
      conversation: newConv,
    });
  } catch (error) {
    console.error('[API /api/chat/clear] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
