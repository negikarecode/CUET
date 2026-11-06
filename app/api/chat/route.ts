import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getUserEntitlement } from "@/lib/payments/entitlements";
import { streamCoachChat } from "@/lib/chat/engine";

export const dynamic = "force-dynamic";

/**
 * GET /api/chat
 * Retrieves candidate's chat threads or messages for a specific thread.
 */
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const threadId = searchParams.get("threadId");

    if (threadId) {
      // Fetch messages for a specific thread
      const { data: messages, error } = await supabaseAdmin
        .from("chat_messages")
        .select("id, role, content, tool_calls, created_at")
        .eq("thread_id", threadId)
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({ ok: true, messages: messages || [] });
    }

    // Fetch all active threads for the user
    const { data: threads, error } = await supabaseAdmin
      .from("chat_threads")
      .select("id, title, is_archived, created_at, updated_at")
      .eq("user_id", user.id)
      .eq("is_archived", false)
      .order("updated_at", { ascending: false });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, threads: threads || [] });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Failed to load chat records." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/chat
 * Streams coach chat messages via Server-Sent Events (SSE).
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Feature Flag & Kill Switch
    if (process.env.NEXT_PUBLIC_FEATURE_COACH_CHAT === "false") {
      return NextResponse.json(
        { ok: false, error: "Coach Chat feature is currently disabled." },
        { status: 403 }
      );
    }

    if (process.env.COACH_CHAT_KILL_SWITCH === "true") {
      return NextResponse.json(
        { ok: false, error: "Coach Chat is temporarily undergoing maintenance. Please check back shortly." },
        { status: 503 }
      );
    }

    // 2. Authentication
    const supabase = createClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json(
        { ok: false, error: "Authentication required to consult the AI Coach." },
        { status: 401 }
      );
    }

    // 3. Premium Entitlement Gate
    const entitlement = await getUserEntitlement(user.id);
    if (!entitlement.isPremium) {
      return NextResponse.json(
        {
          ok: false,
          code: "PREMIUM_REQUIRED",
          error: "CUET Coach Chat is available exclusively to Gold Pass members.",
          upgradeUrl: "/dashboard/upgrade",
        },
        { status: 403 }
      );
    }

    // 4. Parse Request Payload
    const body = await req.json().catch(() => ({}));
    const message = (body?.message || "").trim();
    const threadId = body?.threadId;

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    // 5. Initialize SSE Stream
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    const sendSSE = async (data: Record<string, any>) => {
      try {
        await writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      } catch {}
    };

    // Execute background streaming
    (async () => {
      try {
        await streamCoachChat({
          userId: user.id,
          threadId,
          message,
          callbacks: {
            onStatus: (status) => {
              sendSSE({ type: "status", status });
            },
            onToken: (token) => {
              sendSSE({ type: "token", token });
            },
            onDone: (data) => {
              sendSSE({ type: "done", ...data });
              writer.close();
            },
            onError: (err) => {
              sendSSE({ type: "error", error: err.message || "An unexpected error occurred." });
              writer.close();
            },
          },
        });
      } catch (err: any) {
        sendSSE({ type: "error", error: err.message || "Failed to process chat response." });
        writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
