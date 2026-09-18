import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AppDataStore } from '@/lib/data-store';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message_id, feedback, feedback_reason } = body;

    if (!message_id || !feedback) {
      return NextResponse.json(
        { success: false, error: 'message_id and feedback are required' },
        { status: 400 }
      );
    }

    if (feedback !== 'helpful' && feedback !== 'unhelpful') {
      return NextResponse.json(
        { success: false, error: 'feedback must be helpful or unhelpful' },
        { status: 400 }
      );
    }

    // Update in Supabase if configured
    try {
      if (supabase) {
        await supabase
          .from('chat_messages')
          .update({
            feedback,
            feedback_reason: feedback_reason || null,
          })
          .eq('id', message_id);
      }
    } catch (err) {
      console.warn('[API /api/chat/feedback] Supabase update failed, using in-memory store:', err);
    }

    // Update in AppDataStore fallback
    const msg = AppDataStore.chatMessages.find(m => m.id === message_id);
    if (msg) {
      msg.feedback = feedback;
      msg.feedback_reason = feedback_reason;
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback recorded successfully',
    });
  } catch (error) {
    console.error('[API /api/chat/feedback] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
