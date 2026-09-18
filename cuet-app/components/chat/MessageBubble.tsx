'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { ChatMessage, InlineMCQ } from '@/lib/types';

interface MessageBubbleProps {
  message: ChatMessage;
  onFeedback?: (messageId: string, feedback: 'helpful' | 'unhelpful') => void;
  onMcqAnswered?: (isCorrect: boolean) => void;
}

export default function MessageBubble({ message, onFeedback, onMcqAnswered }: MessageBubbleProps) {
  const isStudent = message.role === 'student' || message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'helpful' | 'unhelpful' | null>(message.feedback || null);

  // Inline MCQ local state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [mcqResult, setMcqResult] = useState<{
    isCorrect: boolean;
    updatedLevel?: string;
    score?: number;
  } | null>(null);
  const [submittingMcq, setSubmittingMcq] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.message_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedbackClick = async (type: 'helpful' | 'unhelpful') => {
    setFeedback(type);
    if (onFeedback) {
      onFeedback(message.id, type);
    }
    try {
      await fetch('/api/chat/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: message.id, feedback: type }),
      });
    } catch (err) {
      console.warn('Failed to record feedback:', err);
    }
  };

  const handleOptionSelect = async (option: 'A' | 'B' | 'C' | 'D', mcq: InlineMCQ) => {
    if (isAnswerSubmitted || submittingMcq) return;
    setSelectedOption(option);
    setIsAnswerSubmitted(true);
    setSubmittingMcq(true);

    try {
      const res = await fetch('/api/chat/mcq-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic_id: mcq.topic_id || 4,
          subject_id: mcq.subject_id || 1,
          chapter_id: mcq.chapter_id || 10,
          selected_option: option,
          correct_option: mcq.correct_option,
          question_text: mcq.question_text,
          time_taken_seconds: 20,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMcqResult({
          isCorrect: data.data.is_correct,
          updatedLevel: data.data.updated_weakness_level,
          score: data.data.updated_weakness_score,
        });
        if (onMcqAnswered) {
          onMcqAnswered(data.data.is_correct);
        }
      }
    } catch (err) {
      console.error('Failed to submit MCQ attempt:', err);
    } finally {
      setSubmittingMcq(false);
    }
  };

  if (isStudent) {
    return (
      <div className="flex items-start justify-end gap-2.5 my-3 pl-12">
        <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md max-w-[85%] sm:max-w-[75%] break-words">
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message_text}</p>
          <span className="block text-[10px] text-indigo-200 mt-1 text-right">
            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 text-xs shadow-sm flex-shrink-0 mt-1">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 my-4 pr-6">
      {/* CUETBot Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white text-xs shadow-md flex-shrink-0 mt-1 ring-2 ring-indigo-100 dark:ring-indigo-900">
        <Bot className="w-4 h-4" />
      </div>

      <div className="flex-1 max-w-[92%] sm:max-w-[85%] space-y-3">
        {/* Main Response Bubble */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl rounded-tl-sm p-4 sm:p-5 shadow-sm">
          {/* Top meta tags */}
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-slate-700/60 text-[11px]">
            <div className="flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
              <span>CUETBot</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-medium">
                100%ile Mentor
              </span>
            </div>
            {message.language_detected && (
              <span className="capitalize text-[10px] text-slate-400 dark:text-slate-400">
                {message.language_detected}
              </span>
            )}
          </div>

          {/* Markdown Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.message_text}
            </ReactMarkdown>
          </div>

          {/* Source Citations */}
          {message.sources_used && message.sources_used.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span>
                Verified from: {message.sources_used[0]?.topic_name || 'NCERT Class 12'} ({message.sources_used[0]?.chapter_name || 'Verified Syllabus'})
              </span>
            </div>
          )}

          {/* Interactive Inline MCQ Card */}
          {message.inline_mcq_data && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Quick Concept Check
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium">
                  CUET UG Format
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                {message.inline_mcq_data.question_text}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                  const key = `option_${opt.toLowerCase()}` as keyof InlineMCQ;
                  const text = String(message.inline_mcq_data![key] || '');
                  const isSelected = selectedOption === opt;
                  const isCorrectOption = message.inline_mcq_data!.correct_option === opt;

                  let buttonStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300';

                  if (isAnswerSubmitted) {
                    if (isCorrectOption) {
                      buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected) {
                      buttonStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300 font-semibold';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleOptionSelect(opt, message.inline_mcq_data!)}
                      className={`flex items-start gap-2 p-2.5 rounded-lg border text-left transition-all ${buttonStyle} disabled:cursor-default`}
                    >
                      <span className="font-bold flex-shrink-0 text-slate-400">{opt}.</span>
                      <span className="flex-1">{text}</span>
                      {isAnswerSubmitted && isCorrectOption && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrectOption && (
                        <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswerSubmitted && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs space-y-1 animate-fadeIn">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {mcqResult?.isCorrect ? '🎉 Correct!' : '❌ Incorrect!'}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    {message.inline_mcq_data.explanation}
                  </p>
                  {mcqResult?.updatedLevel && (
                    <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                      ✓ Weakness Tracker Updated: Level is now {mcqResult.updatedLevel.toUpperCase()}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Module 2 Practice Integration Button */}
          {message.detected_topic_id && (
            <div className="mt-3 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60">
              <span className="text-[11px] text-slate-500">Want deeper practice on this topic?</span>
              <Link
                href={`/practice/ai/${message.detected_topic_id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 text-indigo-600 dark:text-indigo-300 font-semibold text-xs transition"
              >
                <span>Practice with AI</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Bubble Footer: Thumbs up/down + Copy */}
        <div className="flex items-center justify-between px-2 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleFeedbackClick('helpful')}
              className={`p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                feedback === 'helpful' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50' : ''
              }`}
              title="Helpful"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleFeedbackClick('unhelpful')}
              className={`p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                feedback === 'unhelpful' ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/50' : ''
              }`}
              title="Not helpful"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px]">
              {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition text-[11px]"
              title="Copy answer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
