import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { COACH_CHAT_SYSTEM_PROMPT } from "./systemPrompt";
import { CHAT_TOOLS_DEFINITIONS, executeChatTool } from "./tools";
import { classifyMessageFast } from "./router";

export interface ChatStreamCallbacks {
  onStatus?: (status: string) => void;
  onToken: (token: string) => void;
  onDone: (data: { threadId: string; messageId: string; tokensUsed: number }) => void;
  onError: (error: Error) => void;
}

export interface SendChatMessageParams {
  userId: string;
  threadId?: string;
  message: string;
  callbacks: ChatStreamCallbacks;
}

const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

function getGroqClient(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }
  return new Groq({ apiKey });
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

/**
 * Check and enforce candidate daily fair-use limits (50 messages/day)
 */
async function enforceDailyRateLimit(userId: string): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);

  const { data: usage } = await supabaseAdmin
    .from("chat_usage_daily")
    .select("message_count")
    .eq("user_id", userId)
    .eq("usage_date", today)
    .maybeSingle();

  if (usage && usage.message_count >= 50) {
    return false;
  }

  // Increment usage
  if (!usage) {
    await supabaseAdmin.from("chat_usage_daily").insert({
      user_id: userId,
      usage_date: today,
      message_count: 1,
    });
  } else {
    await supabaseAdmin
      .from("chat_usage_daily")
      .update({
        message_count: usage.message_count + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("usage_date", today);
  }

  return true;
}

/**
 * Executes Coach Chat lifecycle:
 * 1. Checks daily quota
 * 2. Manages thread & message persistence
 * 3. Fast router classification (distress, injection, off-scope)
 * 4. Safe tool calling with student data isolation
 * 5. Streams response tokens
 */
export async function streamCoachChat({
  userId,
  threadId: requestedThreadId,
  message,
  callbacks,
}: SendChatMessageParams): Promise<void> {
  const { onStatus, onToken, onDone, onError } = callbacks;

  try {
    // 1. Fair Use Rate Limit Check
    const allowed = await enforceDailyRateLimit(userId);
    if (!allowed) {
      throw new Error(
        "You have reached your daily quota of 50 Coach Chat messages. Quota resets at midnight IST."
      );
    }

    // 2. Resolve or Create Chat Thread
    let threadId = requestedThreadId;
    if (!threadId) {
      const summaryTitle = message.slice(0, 45).trim() || "CUET Mentor Discussion";
      const { data: newThread, error: threadErr } = await supabaseAdmin
        .from("chat_threads")
        .insert({
          user_id: userId,
          title: summaryTitle,
        })
        .select("id")
        .single();

      if (threadErr || !newThread) {
        throw new Error("Failed to initialize conversation thread.");
      }
      threadId = newThread.id;
    }

    // 3. Persist User Message
    await supabaseAdmin.from("chat_messages").insert({
      thread_id: threadId,
      user_id: userId,
      role: "user",
      content: message,
    });

    // 4. Fast Router Decision
    const decision = classifyMessageFast(message);

    if (decision.immediateResponse) {
      // Stream immediate response (for distress, injection, or obvious off-scope)
      const immediateText = decision.immediateResponse;
      const chunks = immediateText.split(" ");
      for (const word of chunks) {
        onToken(word + " ");
        await new Promise((r) => setTimeout(r, 20));
      }

      const { data: savedMsg } = await supabaseAdmin
        .from("chat_messages")
        .insert({
          thread_id: threadId,
          user_id: userId,
          role: "assistant",
          content: immediateText,
          model: "router-guardrail",
          tokens_used: 50,
        })
        .select("id")
        .single();

      onDone({
        threadId: threadId!,
        messageId: savedMsg?.id || "msg_done",
        tokensUsed: 50,
      });
      return;
    }

    // 5. In-Scope: Fetch Context History (last 8 messages)
    const { data: history } = await supabaseAdmin
      .from("chat_messages")
      .select("role, content, tool_calls")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: false })
      .limit(8);

    const reversedHistory = (history || []).reverse();

    const formattedMessages: any[] = [
      { role: "system", content: COACH_CHAT_SYSTEM_PROMPT },
      ...reversedHistory.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    onStatus?.("Consulting CUET Academic Coach...");

    // 6. Execute with Groq LLM & Tool Calling
    const groq = getGroqClient();

    // First call: Check if tools are needed
    const initialCompletion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: formattedMessages,
      tools: CHAT_TOOLS_DEFINITIONS,
      tool_choice: "auto",
      temperature: 0.3,
    });

    const choice = initialCompletion.choices?.[0];
    if (!choice || !choice.message) {
      throw new Error("No response returned from model.");
    }

    let fullResponseText = "";
    let executedToolCalls: any[] = [];

    if (choice.message.tool_calls && choice.message.tool_calls.length > 0) {
      onStatus?.("Retrieving your performance and mock test records...");

      const toolMessages: any[] = [
        ...formattedMessages,
        choice.message,
      ];

      for (const tc of choice.message.tool_calls) {
        const toolName = tc.function.name;
        let toolArgs = {};
        try {
          toolArgs = JSON.parse(tc.function.arguments || "{}");
        } catch {}

        onStatus?.(`Analyzing ${toolName.replace(/_/g, " ")}...`);

        const toolResult = await executeChatTool(toolName, toolArgs, userId);
        executedToolCalls.push({
          name: toolName,
          args: toolArgs,
        });

        toolMessages.push({
          role: "tool",
          tool_call_id: tc.id,
          content: toolResult,
        });
      }

      onStatus?.("Synthesizing your personalized guidance...");

      // Final streaming call with tool results in context
      const stream = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: toolMessages,
        stream: true,
        temperature: 0.3,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
          fullResponseText += delta;
          onToken(delta);
        }
      }
    } else {
      // Model responded directly without needing tool execution
      const directText = choice.message.content || "";
      fullResponseText = directText;
      const words = directText.split(" ");
      for (const w of words) {
        onToken(w + " ");
        await new Promise((r) => setTimeout(r, 15));
      }
    }

    // 7. Persist Assistant Message
    const { data: savedMsg } = await supabaseAdmin
      .from("chat_messages")
      .insert({
        thread_id: threadId,
        user_id: userId,
        role: "assistant",
        content: fullResponseText,
        tool_calls: executedToolCalls.length > 0 ? executedToolCalls : null,
        model: GROQ_MODEL,
        tokens_used: initialCompletion.usage?.total_tokens || 150,
      })
      .select("id")
      .single();

    // Touch thread updated_at
    await supabaseAdmin
      .from("chat_threads")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", threadId);

    onDone({
      threadId: threadId!,
      messageId: savedMsg?.id || "msg_done",
      tokensUsed: initialCompletion.usage?.total_tokens || 150,
    });
  } catch (error: any) {
    console.error("[Coach Chat Engine Error]:", error);

    // Resilient Fallback to Gemini if Groq fails
    try {
      const gemini = getGeminiClient();
      if (gemini && requestedThreadId) {
        onStatus?.("Switching to backup mentor engine...");
        const response = await gemini.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: `${COACH_CHAT_SYSTEM_PROMPT}\n\nStudent asks: ${message}` }],
            },
          ],
        });

        const fallbackText =
          response.text ||
          "I'm here to help with your CUET UG preparation. Let's practice some domain questions or review your recent test!";
        onToken(fallbackText);

        const { data: fallbackMsg } = await supabaseAdmin
          .from("chat_messages")
          .insert({
            thread_id: requestedThreadId,
            user_id: userId,
            role: "assistant",
            content: fallbackText,
            model: "gemini-2.0-flash-fallback",
            tokens_used: 120,
          })
          .select("id")
          .single();

        onDone({
          threadId: requestedThreadId,
          messageId: fallbackMsg?.id || "msg_fallback",
          tokensUsed: 120,
        });
        return;
      }
    } catch (fallbackErr) {
      console.error("[Coach Chat Gemini Fallback Error]:", fallbackErr);
    }

    onError(error instanceof Error ? error : new Error(String(error)));
  }
}
