import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/chat/feedback
 * Records thumbs up / thumbs down ratings for message quality monitoring.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json(
        { ok: false, error: "Authentication required." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const messageId = body?.messageId;
    const rating = body?.rating; // 'up' | 'down'
    const feedbackText = body?.feedbackText;

    if (!messageId || !["up", "down"].includes(rating)) {
      return NextResponse.json(
        { ok: false, error: "Valid messageId and rating ('up' or 'down') required." },
        { status: 400 }
      );
    }

    const { error: upsertErr } = await supabaseAdmin
      .from("chat_feedback")
      .upsert(
        {
          message_id: messageId,
          user_id: user.id,
          rating,
          feedback_text: feedbackText || null,
        },
        { onConflict: "message_id,user_id" }
      );

    if (upsertErr) {
      return NextResponse.json({ ok: false, error: upsertErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, rating });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to submit feedback." },
      { status: 500 }
    );
  }
}
