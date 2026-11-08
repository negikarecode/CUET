"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Sparkles,
  Send,
  Zap,
  Lock,
  ThumbsUp,
  ThumbsDown,
  PlusCircle,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

// Dynamically import ChatMessageRenderer exclusively on Coach Chat page
const ChatMessageRenderer = dynamic(
  () => import("@/components/chat/ChatMessageRenderer"),
  {
    ssr: false,
    loading: () => <div className="text-slate-400 text-xs animate-pulse">Loading response...</div>,
  }
);

export interface ActionChip {
  title: string;
  actionRoute?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  tool_calls?: any;
  actions?: ActionChip[];
  created_at?: string;
  feedback?: "up" | "down" | null;
}

export interface ChatThread {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface CoachChatClientProps {
  isPremium: boolean;
  initialThreads?: ChatThread[];
}

const SUGGESTION_PROMPTS = [
  "What are my weakest CUET topics and accuracy leaks?",
  "How many points do I need to reach the SRCC cutoff?",
  "Suggest a 7-day practice plan for my domain subjects.",
  "Which questions did I lose the most marks on in my recent test?",
];

export default function CoachChatClient({
  isPremium,
  initialThreads = [],
}: CoachChatClientProps) {
  const router = useRouter();
  const [threads, setThreads] = useState<ChatThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(
    initialThreads[0]?.id || null
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Synchronous lock to strictly block double-clicks/duplicate submissions
  const isSendingRef = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, statusMessage]);

  // Load messages whenever active thread changes
  useEffect(() => {
    if (!activeThreadId || !isPremium) return;

    let isMounted = true;
    async function loadThreadMessages() {
      try {
        const res = await fetch(`/api/chat?threadId=${activeThreadId}`);
        const data = await res.json();
        if (isMounted && data.ok && Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Failed to load thread messages:", err);
      }
    }

    loadThreadMessages();
    return () => {
      isMounted = false;
    };
  }, [activeThreadId, isPremium]);

  const handleStartNewThread = () => {
    setActiveThreadId(null);
    setMessages([]);
    setErrorBanner(null);
    setStatusMessage(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading || isSendingRef.current) return;

    if (!isPremium) {
      setErrorBanner("CUET Coach Chat is available exclusively to Gold Pass members.");
      return;
    }

    // Acquire synchronous lock before any asynchronous operations
    isSendingRef.current = true;
    setIsLoading(true);

    const idempotencyKey = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    setInputMessage("");
    setErrorBanner(null);
    setStatusMessage("Connecting with AI Coach...");

    // Optimistically add user message
    const tempUserMsgId = `temp_user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: tempUserMsgId,
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
    };

    // Placeholder assistant message for streaming
    const tempAssistantMsgId = `temp_ast_${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: tempAssistantMsgId,
      role: "assistant",
      content: "",
      actions: [],
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          threadId: activeThreadId || undefined,
          idempotencyKey,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${response.status}`);
      }

      if (!response.body) {
        throw new Error("ReadableStream not supported by browser.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let streamBuffer = "";
      let accumulatedAssistantText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        streamBuffer += decoder.decode(value, { stream: true });
        const lines = streamBuffer.split("\n\n");
        streamBuffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.replace(/^data: /, "").trim();
          if (!jsonStr) continue;

          try {
            const parsed = JSON.parse(jsonStr);

            if (parsed.type === "status") {
              setStatusMessage(parsed.status);
            } else if (parsed.type === "token") {
              setStatusMessage(null);
              accumulatedAssistantText += parsed.token;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === tempAssistantMsgId
                    ? { ...m, content: accumulatedAssistantText }
                    : m
                )
              );
            } else if (parsed.type === "actions") {
              if (Array.isArray(parsed.actions)) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === tempAssistantMsgId
                      ? { ...m, actions: parsed.actions }
                      : m
                  )
                );
              }
            } else if (parsed.type === "done") {
              setStatusMessage(null);
              if (parsed.threadId && parsed.threadId !== activeThreadId) {
                setActiveThreadId(parsed.threadId);
                // Refresh threads
                fetch("/api/chat")
                  .then((r) => r.json())
                  .then((d) => {
                    if (d.ok && Array.isArray(d.threads)) setThreads(d.threads);
                  })
                  .catch(() => {});
              }
              if (parsed.messageId || parsed.actions) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === tempAssistantMsgId
                      ? {
                          ...m,
                          id: parsed.messageId || m.id,
                          actions: parsed.actions || m.actions || [],
                        }
                      : m
                  )
                );
              }
            } else if (parsed.type === "error") {
              setErrorBanner(parsed.error);
              setStatusMessage(null);
              setMessages((prev) => prev.filter((m) => m.id !== tempAssistantMsgId));
            }
          } catch {
            // Incomplete buffer chunk
          }
        }
      }
    } catch (err: any) {
      console.error("[Chat Stream Error]:", err);
      setErrorBanner(err.message || "Failed to communicate with Coach Chat.");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempAssistantMsgId
            ? {
                ...m,
                content:
                  "I encountered a temporary communication interruption. Please try asking again in a moment.",
              }
            : m
        )
      );
    } finally {
      isSendingRef.current = false;
      setIsLoading(false);
      setStatusMessage(null);
    }
  };

  const handleActionChipClick = (chip: ActionChip) => {
    if (chip.actionRoute && chip.actionRoute.startsWith("/")) {
      router.push(chip.actionRoute);
    } else {
      handleSendMessage(chip.title);
    }
  };

  const handleRating = async (messageId: string, rating: "up" | "down") => {
    try {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, feedback: rating } : m))
      );
      await fetch("/api/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, rating }),
      });
    } catch (err) {
      console.error("Failed to submit message feedback:", err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-70px)] bg-slate-50 overflow-hidden font-sans">
      {/* 1. Sidebar: Previous Threads */}
      <div className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800 text-sm tracking-tight">Coach Chat</h2>
          </div>
          <button
            onClick={handleStartNewThread}
            disabled={isLoading}
            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-40"
            title="Start New Chat"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {threads.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              No previous conversations. Start one below!
            </div>
          ) : (
            threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveThreadId(t.id)}
                disabled={isLoading}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2.5 truncate disabled:opacity-50 ${
                  activeThreadId === t.id
                    ? "bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{t.title}</span>
              </button>
            ))
          )}
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-700">CUET Prep Coach</span>
          <p className="mt-0.5 text-slate-400 leading-snug">
            Based on your practice data. AI can make mistakes. Not a guarantee of marks or admission.
          </p>
        </div>
      </div>

      {/* 2. Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
        {/* Header */}
        <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 font-bold text-xs">
              AI
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-none">
                CUET Academic Coach
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                CUET prep coach . +5/-1 scoring . Cutoff estimates
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Zap className="w-3 h-3 text-emerald-600" /> Gold Member
            </span>
          </div>
        </div>

        {/* Non-Premium Locked Overlay */}
        {!isPremium && (
          <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-xs flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-4 p-8 bg-white rounded-2xl border border-emerald-200 shadow-xl">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Unlock CUET Coach Chat
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get an empathetic personal AI mentor who reviews your mock scores, flags distractor traps, and calculates your exact cutoff gap for SRCC and Hindu College.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard/upgrade"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-md hover:shadow-lg"
                >
                  <Zap className="w-4 h-4 fill-white" /> Upgrade to Gold Pass (₹499)
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {errorBanner && (
          <div className="mx-4 mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorBanner}</span>
            </div>
            <button
              onClick={() => setErrorBanner(null)}
              className="font-bold underline text-red-800 hover:text-red-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Message Stream Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="max-w-xl mx-auto text-center pt-8 pb-4 space-y-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Welcome to CUET Coach Chat
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Ask questions about your recent test attempts, weak NCERT chapters, or target college cutoffs.
                </p>
              </div>

              {/* Suggestion Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {SUGGESTION_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-emerald-500 hover:bg-emerald-50/50 hover:text-emerald-900 transition-all text-left shadow-xs disabled:opacity-50"
                  >
                    &ldquo;{prompt}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-emerald-600 text-white rounded-br-xs shadow-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div>
                      <ChatMessageRenderer content={msg.content} />

                      {/* Action Chips */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
                          {msg.actions.map((chip, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleActionChipClick(chip)}
                              disabled={isLoading}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-xs disabled:opacity-50"
                            >
                              {chip.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>

                {/* Assistant Rating Feedback */}
                {msg.role === "assistant" && msg.id && !msg.id.startsWith("temp_") && (
                  <div className="flex items-center gap-2 mt-1.5 px-1 text-[11px] text-slate-400">
                    <span>Helpful?</span>
                    <button
                      onClick={() => handleRating(msg.id, "up")}
                      className={`p-1 rounded hover:bg-slate-200 ${
                        msg.feedback === "up" ? "text-emerald-600 font-bold" : ""
                      }`}
                      title="Helpful"
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleRating(msg.id, "down")}
                      className={`p-1 rounded hover:bg-slate-200 ${
                        msg.feedback === "down" ? "text-red-500 font-bold" : ""
                      }`}
                      title="Not helpful"
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Active Status Pill */}
          {statusMessage && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full w-fit animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2 max-w-4xl mx-auto"
          >
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading || !isPremium}
                placeholder={
                  isPremium
                    ? "Ask your CUET coach about your mistakes, cutoffs, or revision topics..."
                    : "Upgrade to Gold Pass to consult Coach Chat."
                }
                rows={1}
                className="w-full resize-none rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed max-h-32 min-h-[44px]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim() || !isPremium}
              className="h-11 px-4 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            Based on your practice data. AI can make mistakes. Not a guarantee of marks or admission.
            <Link href="/privacy" className="underline hover:text-slate-600 transition-colors ml-1">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
