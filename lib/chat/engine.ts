import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { COACH_CHAT_SYSTEM_PROMPT } from "./systemPrompt";
import { CHAT_TOOLS_DEFINITIONS, executeChatTool } from "./tools";
import { classifyMessageFast } from "./router";

export interface ActionChip {
  title: string;
  actionRoute?: string;
}

export interface ChatStreamCallbacks {
  onStatus?: (status: string) => void;
  onToken: (token: string) => void;
  onActions?: (actions: ActionChip[]) => void;
  onDone: (data: { threadId: string; messageId: string; tokensUsed: number; actions?: ActionChip[] }) => void;
  onError: (error: Error) => void;
}

export interface SendChatMessageParams {
  userId: string;
  threadId?: string;
  message: string;
  idempotencyKey?: string;
  callbacks: ChatStreamCallbacks;
}

const GROQ_MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

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
 * Clean and format readable thread title from first message (max 40 chars)
 */
export function generateThreadTitle(message: string): string {
  if (!message) return "CUET Prep Discussion";

  const clean = message
    .replace(/[#*_`~[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) return "CUET Prep Discussion";

  if (clean.length <= 40) {
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  const truncated = clean.slice(0, 40);
  const lastSpace = truncated.lastIndexOf(" ");
  const candidate = (lastSpace > 15 ? truncated.slice(0, lastSpace) : truncated).trim();
  return candidate.charAt(0).toUpperCase() + candidate.slice(1);
}

/**
 * Post-check helper: verify every percentage stated has an attempt count nearby
 */
export function verifyPercentagesHaveAttemptCounts(text: string): boolean {
  const percentRegex = /\b\d+(?:\.\d+)?%/g;
  let match;
  while ((match = percentRegex.exec(text)) !== null) {
    const idx = match.index;
    const start = Math.max(0, idx - 80);
    const end = Math.min(text.length, idx + match[0].length + 80);
    const windowText = text.slice(start, end).toLowerCase();

    const hasCount = /(?:attempt|question|\bq\b|\bqs\b|mock|over\s+\d+|across\s+\d+|\d+\s*attempts?|\d+\s*questions?|out\s+of\s+\d+)/i.test(
      windowText
    );

    if (!hasCount) {
      return false;
    }
  }
  return true;
}

// In-memory idempotency caches for concurrent double-clicks and retries
const recentThreadCreations = new Map<string, { threadId: string; userMessageId: string; timestamp: number }>();
const inFlightThreadCreations = new Map<string, Promise<{ threadId: string; userMessageId: string }>>();

/**
 * Clean up old idempotency entries (> 2 minutes)
 */
function pruneIdempotencyCache() {
  const now = Date.now();
  for (const [key, value] of recentThreadCreations.entries()) {
    if (now - value.timestamp > 120_000) {
      recentThreadCreations.delete(key);
    }
  }
}

/**
 * Check and enforce candidate daily fair-use limits (50 messages/day)
 */
async function enforceDailyRateLimit(userId: string): Promise<boolean> {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const { data: usage, error: usageErr } = await supabaseAdmin
      .from("chat_usage_daily")
      .select("message_count")
      .eq("user_id", userId)
      .eq("usage_date", today)
      .maybeSingle();

    if (usageErr) {
      if (usageErr.code !== "PGRST205") {
        console.warn("[Coach Chat] enforceDailyRateLimit fetch error:", usageErr);
      }
      return true;
    }

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
  } catch (err) {
    console.warn("[Coach Chat] enforceDailyRateLimit warning:", err);
    return true;
  }
}

/**
 * Executes Coach Chat lifecycle:
 * 1. Checks daily quota
 * 2. Manages thread & message persistence with strict idempotency (no duplicate threads)
 * 3. Fast router classification (distress, injection, off-scope)
 * 4. Safe tool calling with student data isolation
 * 5. Streams response tokens (max_tokens ~350, brevity & attempt-count enforcement)
 * 6. Dispatches validated action chips
 */
export async function streamCoachChat({
  userId,
  threadId: requestedThreadId,
  message,
  idempotencyKey,
  callbacks,
}: SendChatMessageParams): Promise<void> {
  const { onStatus, onToken, onActions, onDone, onError } = callbacks;

  try {
    pruneIdempotencyCache();

    // 1. Fair Use Rate Limit Check
    const allowed = await enforceDailyRateLimit(userId);
    if (!allowed) {
      throw new Error(
        "You have reached your daily quota of 50 Coach Chat messages. Quota resets at midnight IST."
      );
    }

    // 2. Resolve or Create Chat Thread with Idempotency Key Lock
    let threadId = requestedThreadId;

    const cacheKey = idempotencyKey ? `${userId}:${idempotencyKey}` : null;

    if (!threadId) {
      if (cacheKey && recentThreadCreations.has(cacheKey)) {
        const cached = recentThreadCreations.get(cacheKey)!;
        threadId = cached.threadId;
      } else if (cacheKey && inFlightThreadCreations.has(cacheKey)) {
        const inFlight = await inFlightThreadCreations.get(cacheKey)!;
        threadId = inFlight.threadId;
      } else {
        const creationPromise = (async () => {
          const cleanTitle = generateThreadTitle(message);
          const { data: newThread, error: threadErr } = await supabaseAdmin
            .from("chat_threads")
            .insert({
              user_id: userId,
              title: cleanTitle,
            })
            .select("id")
            .single();

          if (threadErr || !newThread) {
            console.error("[Coach Chat] Failed to initialize chat thread in Supabase:", threadErr);
            if (threadErr?.code === "PGRST205" || threadErr?.message?.includes("chat_threads")) {
              throw new Error(
                "Coach Chat database tables are not installed. Please run migration 'supabase/migrations/20261106_coach_chat_tables.sql' in your Supabase SQL Editor."
              );
            }
            throw new Error(threadErr?.message || "Failed to initialize conversation thread.");
          }

          // Persist user message atomically with thread creation
          const { data: userMsg, error: userMsgErr } = await supabaseAdmin
            .from("chat_messages")
            .insert({
              thread_id: newThread.id,
              user_id: userId,
              role: "user",
              content: message,
            })
            .select("id")
            .single();

          if (userMsgErr) {
            console.warn("[Coach Chat] Warning: Failed to persist user message:", userMsgErr);
          }

          return { threadId: newThread.id, userMessageId: userMsg?.id || "" };
        })();

        if (cacheKey) {
          inFlightThreadCreations.set(cacheKey, creationPromise);
        }

        try {
          const created = await creationPromise;
          threadId = created.threadId;
          if (cacheKey) {
            recentThreadCreations.set(cacheKey, {
              threadId: created.threadId,
              userMessageId: created.userMessageId,
              timestamp: Date.now(),
            });
          }
        } finally {
          if (cacheKey) {
            inFlightThreadCreations.delete(cacheKey);
          }
        }
      }
    } else {
      // Existing thread: persist user message if not already persisted for this action
      const { error: userMsgErr } = await supabaseAdmin
        .from("chat_messages")
        .insert({
          thread_id: threadId,
          user_id: userId,
          role: "user",
          content: message,
        })
        .select("id")
        .single();

      if (userMsgErr) {
        console.warn("[Coach Chat] Warning: Failed to persist user message:", userMsgErr);
      }
    }

    // 3. Fast Router Decision
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
        actions: [],
      });
      return;
    }

    // 4. In-Scope: Fetch Context History (last 8 messages)
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

    // 5. Execute with Groq LLM & Tool Calling
    const groq = getGroqClient();

    // First call: Check if tools are needed
    const initialCompletion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: formattedMessages,
      tools: CHAT_TOOLS_DEFINITIONS,
      tool_choice: "auto",
      temperature: 0.3,
      max_tokens: 350,
    });

    const choice = initialCompletion.choices?.[0];
    if (!choice || !choice.message) {
      throw new Error("No response returned from model.");
    }

    let fullResponseText = "";
    let executedToolCalls: any[] = [];
    let actionChips: ActionChip[] = [];

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

        // If suggest_actions was executed, extract action chips
        if (toolName === "suggest_actions") {
          try {
            const rawJson = toolResult.replace(/<\/?tool_data>/g, "").trim();
            const parsed = JSON.parse(rawJson);
            if (Array.isArray(parsed?.actions)) {
              actionChips = parsed.actions.slice(0, 3).map((a: any) => ({
                title: a.title,
                actionRoute: a.actionRoute,
              }));
            }
          } catch {}
        }

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

      // Check if data tools were executed without suggest_actions
      const isDataResponse = executedToolCalls.some((t) =>
        [
          "get_performance_summary",
          "get_weak_topics",
          "get_strong_topics",
          "get_attempt_review",
          "get_behavior_patterns",
          "get_college_gap",
          "get_study_plan",
        ].includes(t.name)
      );

      if (isDataResponse && actionChips.length === 0) {
        try {
          const autoActionResult = await executeChatTool("suggest_actions", {}, userId);
          const rawJson = autoActionResult.replace(/<\/?tool_data>/g, "").trim();
          const parsed = JSON.parse(rawJson);
          if (Array.isArray(parsed?.actions)) {
            actionChips = parsed.actions.slice(0, 3).map((a: any) => ({
              title: a.title,
              actionRoute: a.actionRoute,
            }));
          }
          executedToolCalls.push({
            name: "suggest_actions",
            args: {},
          });
        } catch {}
      }

      onStatus?.("Synthesizing your personalized guidance...");

      // Final streaming call with tool results in context, capped at ~350 tokens
      const stream = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: toolMessages,
        stream: true,
        temperature: 0.3,
        max_tokens: 350,
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

    // 6. Quality Post-Checks
    const qualityFlags: Array<{ flagged: boolean; reason: string }> = [];
    // Check 1: Brevity word count check (> 180 words flagged as "too_long")
    const words = fullResponseText.trim().split(/\s+/).filter(Boolean);
    if (words.length > 180) {
      console.warn(
        `[Coach Chat Quality Alert] flagged=true reason="too_long" words=${words.length} threadId=${threadId}`
      );
      qualityFlags.push({ flagged: true, reason: "too_long" });
    }

    // Check 2: Attempt counts presence check (every percentage must have a count nearby)
    const hasValidAttemptCounts = verifyPercentagesHaveAttemptCounts(fullResponseText);
    if (!hasValidAttemptCounts) {
      console.warn(
        `[Coach Chat Quality Alert] flagged=true reason="missing_attempt_count" threadId=${threadId}`
      );
      qualityFlags.push({ flagged: true, reason: "missing_attempt_count" });
    }

    // 7. Persist Assistant Message with Action Chips
    const toolCallsPayload = executedToolCalls.length > 0 ? executedToolCalls : null;

    const { data: savedMsg } = await supabaseAdmin
      .from("chat_messages")
      .insert({
        thread_id: threadId,
        user_id: userId,
        role: "assistant",
        content: fullResponseText,
        tool_calls: {
          executed: toolCallsPayload,
          actions: actionChips.length > 0 ? actionChips : undefined,
          quality_flags: qualityFlags.length > 0 ? qualityFlags : undefined,
        },
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

    if (actionChips.length > 0) {
      onActions?.(actionChips);
    }

    onDone({
      threadId: threadId!,
      messageId: savedMsg?.id || "msg_done",
      tokensUsed: initialCompletion.usage?.total_tokens || 150,
      actions: actionChips,
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
          actions: [],
        });
        return;
      }
    } catch (fallbackErr) {
      console.error("[Coach Chat Gemini Fallback Error]:", fallbackErr);
    }

    onError(error instanceof Error ? error : new Error(String(error)));
  }
}
