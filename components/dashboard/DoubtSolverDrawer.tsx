"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  X,
  ThumbsUp,
  ThumbsDown,
  Brain,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  helpful?: boolean;
}

interface DoubtSolverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  studentContext: {
    subject: string;
    weakTopics: string[];
    strongTopics: string[];
    recentMistakes: any[];
  };
}

export function DoubtSolverDrawer({
  isOpen,
  onClose,
  studentContext,
}: DoubtSolverDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      sender: "bot",
      text: `Hello! I'm your CUET tutor grounded strictly in your practice data and NCERT curriculum for ${studentContext.subject || "your domain subjects"}. Ask me about your mistakes or core concepts.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingQuota, setRemainingQuota] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/doubt-solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          studentContext,
        }),
      });

      const data = await res.json();
      if (data.remainingQuota !== undefined) {
        setRemainingQuota(data.remainingQuota);
      }

      const botMsg: Message = {
        id: `b_${Date.now()}`,
        sender: "bot",
        text: data.reply || data.error || "Unable to answer right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `b_${Date.now()}`,
          sender: "bot",
          text: "Connection error. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (id: string, helpful: boolean) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, helpful } : m))
    );
  };

  const promptChips = [
    `Clarify core rules for ${studentContext.weakTopics[0] || "my weak area"}`,
    "Why do qualifier words like NOT/EXCEPT cause errors?",
    "How to distinguish close distractor options?",
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-[9999] w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
              <span>Grounded Doubt Solver</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </h3>
            <p className="text-[11px] text-slate-300">
              Grounded in your mistakes · Refuses to guess
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Daily Quota Notice */}
      <div className="px-4 py-2 bg-purple-50/70 border-b border-purple-100 flex items-center justify-between text-[11px] font-medium text-purple-800 shrink-0">
        <span>Daily Quota</span>
        <span className="font-mono font-bold">
          {remainingQuota !== null ? `${remainingQuota} queries remaining` : "Active"}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                m.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-xs"
                  : "bg-slate-100 text-slate-800 border border-slate-200/80 rounded-bl-xs"
              }`}
            >
              <p>{m.text}</p>
            </div>

            <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400">
              <span>{m.timestamp}</span>
              {m.sender === "bot" && m.id !== "intro" && (
                <div className="flex items-center gap-1 ml-1">
                  <button
                    onClick={() => handleFeedback(m.id, true)}
                    className={`p-0.5 hover:text-emerald-600 cursor-pointer ${
                      m.helpful === true ? "text-emerald-600 font-bold" : ""
                    }`}
                    title="Helpful"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleFeedback(m.id, false)}
                    className={`p-0.5 hover:text-rose-600 cursor-pointer ${
                      m.helpful === false ? "text-rose-600 font-bold" : ""
                    }`}
                    title="Not helpful"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-500 text-xs w-36">
            <span className="w-3 h-3 rounded-full border-2 border-slate-500 border-t-transparent animate-spin" />
            <span>Consulting notes...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips */}
      {messages.length <= 3 && (
        <div className="px-3 pb-2 pt-1 flex flex-wrap gap-1.5 shrink-0">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-medium transition-all text-left truncate max-w-full cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question on your weak topics..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white cursor-pointer transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
