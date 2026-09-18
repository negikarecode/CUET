'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Plus,
  ArrowLeft,
  Sparkles,
  History,
  Trash2,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import QuickReplies from './QuickReplies';
import ConversationStarter from './ConversationStarter';
import TypingIndicator from './TypingIndicator';
import UsageMeter from './UsageMeter';
import UpgradeModal from './UpgradeModal';
import { ChatMessage, ChatConversation, WeaknessScore } from '@/lib/types';
import { QuickReplyOption, STARTER_QUICK_REPLIES } from '@/lib/quick-replies';

interface ChatInterfaceProps {
  initialConversationId?: string;
  initialTopicId?: number;
  initialSubjectId?: number;
  studentName?: string;
  weakTopics?: WeaknessScore[];
}

export default function ChatInterface({
  initialConversationId,
  initialTopicId,
  initialSubjectId,
  studentName = 'Champion',
  weakTopics = [],
}: ChatInterfaceProps) {
  const [conversationId, setConversationId] = useState<string | undefined>(initialConversationId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReplyOption[]>(STARTER_QUICK_REPLIES);
  const [usage, setUsage] = useState({
    currentCount: 0,
    dailyLimit: 20,
    planType: 'free',
    isLimitReached: false,
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [conversationsList, setConversationsList] = useState<ChatConversation[]>([]);
  const [activeTopicId, setActiveTopicId] = useState<number | undefined>(initialTopicId);
  const [activeSubjectId, setActiveSubjectId] = useState<number | undefined>(initialSubjectId);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  // Fetch Usage status
  const fetchUsage = async () => {
    try {
      const res = await fetch('/api/chat/usage');
      const data = await res.json();
      if (data.success) {
        setUsage({
          currentCount: data.data.current_count,
          dailyLimit: data.data.daily_limit,
          planType: data.data.plan_type,
          isLimitReached: data.data.is_limit_reached,
        });
      }
    } catch (err) {
      console.warn('Failed to fetch usage:', err);
    }
  };

  // Fetch Conversation History
  const loadConversation = async (convId?: string) => {
    try {
      let url = '/api/chat/history';
      const params = new URLSearchParams();
      if (convId) params.append('conversation_id', convId);
      if (activeTopicId) params.append('topic_id', String(activeTopicId));
      if (activeSubjectId) params.append('subject_id', String(activeSubjectId));

      const res = await fetch(`${url}?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setConversationId(data.conversation?.id);
        setMessages(data.messages || []);
        if (data.quick_replies && data.quick_replies.length > 0) {
          setQuickReplies(data.quick_replies);
        }
      }
    } catch (err) {
      console.warn('Failed to load conversation history:', err);
    }
  };

  // Fetch Conversations List for sidebar
  const fetchConversationsList = async () => {
    try {
      const res = await fetch('/api/chat/history?list=true');
      const data = await res.json();
      if (data.success) {
        setConversationsList(data.conversations || []);
      }
    } catch (err) {
      console.warn('Failed to load conversations list:', err);
    }
  };

  useEffect(() => {
    fetchUsage();
    loadConversation(initialConversationId);
    fetchConversationsList();
  }, []);

  // Handle New Session
  const handleNewSession = async () => {
    try {
      const res = await fetch('/api/chat/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: conversationId }),
      });
      const data = await res.json();
      if (data.success && data.conversation) {
        setConversationId(data.conversation.id);
        setMessages([]);
        setQuickReplies(STARTER_QUICK_REPLIES);
        fetchConversationsList();
      }
    } catch (err) {
      console.error('Failed to clear session:', err);
    }
  };

  // Handle Send Message with SSE streaming
  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isGenerating) return;

    if (usage.isLimitReached) {
      setShowUpgradeModal(true);
      return;
    }

    // 1. Instantly append student message
    const tempStudentMsg: ChatMessage = {
      id: `client_student_${Date.now()}`,
      conversation_id: conversationId || 'temp',
      student_id: 'current_student',
      role: 'student',
      message_text: userText,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempStudentMsg]);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversation_id: conversationId,
          topic_id: activeTopicId,
          subject_id: activeSubjectId,
        }),
      });

      if (response.status === 429) {
        setUsage((prev) => ({ ...prev, isLimitReached: true }));
        setShowUpgradeModal(true);
        setIsGenerating(false);
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error('Failed to start chat stream');
      }

      // 2. Prepare placeholder assistant message
      const assistantMsgId = `assistant_${Date.now()}`;
      let accumulatedText = '';

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          conversation_id: conversationId || 'temp',
          student_id: 'current_student',
          role: 'cuetbot',
          message_text: '',
          created_at: new Date().toISOString(),
        },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const block of lines) {
          if (!block.trim()) continue;
          const eventMatch = block.match(/event:\s*(\w+)/);
          const eventName = eventMatch ? eventMatch[1] : 'delta';

          const dataIdx = block.indexOf('data:');
          const dataStr = dataIdx !== -1 ? block.substring(dataIdx + 5).trim() : '';

          if (eventName === 'meta') {
            try {
              const meta = JSON.parse(dataStr);
              if (meta.conversation_id) setConversationId(meta.conversation_id);
              if (meta.detected_topic_id) setActiveTopicId(meta.detected_topic_id);

              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId
                    ? {
                        ...m,
                        conversation_id: meta.conversation_id,
                        language_detected: meta.language,
                        intent_detected: meta.intent,
                        sources_used: meta.sources,
                        inline_mcq_data: meta.inline_mcq,
                        has_inline_mcq: !!meta.inline_mcq,
                        detected_topic_id: meta.detected_topic_id,
                      }
                    : m
                )
              );
            } catch (e) {
              console.warn('Error parsing meta:', e);
            }
          } else if (eventName === 'delta') {
            try {
              const parsed = JSON.parse(dataStr);
              accumulatedText += parsed.text;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId
                    ? { ...m, message_text: accumulatedText }
                    : m
                )
              );
            } catch (e) {
              console.warn('Error parsing delta:', e);
            }
          } else if (eventName === 'done') {
            try {
              const doneData = JSON.parse(dataStr);
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId
                    ? {
                        ...m,
                        id: doneData.message_id || m.id,
                        tokens_used: doneData.tokens,
                        response_time_ms: doneData.response_time_ms,
                      }
                    : m
                )
              );
              fetchUsage();
              fetchConversationsList();
            } catch (e) {
              console.warn('Error parsing done:', e);
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          conversation_id: conversationId || 'temp',
          student_id: 'current_student',
          role: 'cuetbot',
          message_text: `Sorry dost, network me thoda issue aaya. Kripya dobara try karo ya rephrase karo!`,
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-7xl mx-auto bg-slate-50 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
      {/* Sidebar for Past Conversations */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-sm">
            <History className="w-4 h-4 text-indigo-600" />
            <span>Past Doubt Sessions</span>
          </div>
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New Session Button */}
        <div className="p-3">
          <button
            onClick={() => {
              handleNewSession();
              setShowSidebar(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Start New Session</span>
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {conversationsList.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No previous conversations yet.
            </div>
          ) : (
            conversationsList.map((c) => {
              const isActive = c.id === conversationId;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    loadConversation(c.id);
                    setShowSidebar(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition flex flex-col gap-1 ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate font-medium">{c.title || 'CUET Doubt Session'}</span>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{new Date(c.updated_at).toLocaleDateString()}</span>
                    {c.messages_count !== undefined && (
                      <span>{c.messages_count} msgs</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Pane */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden relative">
        {/* Chat Header */}
        <header className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="md:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              href="/"
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white text-xs shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-slate-900 dark:text-white">
                    CUETBot
                  </h1>
                  <span className="hidden sm:inline-block text-[10px] px-2 py-0.2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold">
                    Online 24/7
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                  Senior CUET Mentor • Hindi, English & Hinglish
                </p>
              </div>
            </div>
          </div>

          {/* Right Header Actions: UsageMeter & New Chat */}
          <div className="flex items-center gap-2">
            <UsageMeter
              currentCount={usage.currentCount}
              dailyLimit={usage.dailyLimit}
              planType={usage.planType}
              onUpgradeClick={() => setShowUpgradeModal(true)}
            />

            <button
              onClick={handleNewSession}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
              title="Start fresh conversation"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
          </div>
        </header>

        {/* Message Stream Area */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-2">
          {messages.length === 0 ? (
            <ConversationStarter
              studentName={studentName}
              weakTopics={weakTopics}
              onSelectQuery={handleSendMessage}
            />
          ) : (
            <>
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  message={m}
                  onMcqAnswered={() => {
                    fetchUsage();
                  }}
                />
              ))}
              {isGenerating && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Quick Replies Tray */}
        <div className="px-3 sm:px-4 bg-slate-50/50 dark:bg-slate-900/50">
          <QuickReplies
            options={quickReplies}
            onSelect={handleSendMessage}
            disabled={isGenerating || usage.isLimitReached}
          />
        </div>

        {/* Input Dock */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isGenerating}
          isLimitReached={usage.isLimitReached}
        />
      </div>

      {/* Plan Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={usage.planType}
      />
    </div>
  );
}
