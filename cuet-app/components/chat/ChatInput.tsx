'use client';
import React, { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Send, Sparkles, HelpCircle, GraduationCap } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  isLimitReached?: boolean;
}

export default function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = 'Ask any CUET doubt in Hinglish, Hindi, or English...',
  isLimitReached = false,
}: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || disabled || isLimitReached) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChipClick = (suffix: string) => {
    setText((prev) => (prev ? `${prev} ${suffix}` : suffix));
    textareaRef.current?.focus();
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4">
      {/* Quick modifier chips */}
      <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1 text-[11px] text-slate-500 scrollbar-none">
        <span className="font-semibold text-slate-400">Quick prompts:</span>
        <button
          type="button"
          onClick={() => handleChipClick('ek practice MCQ pucho!')}
          className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-medium transition"
        >
          Ask MCQ
        </button>
        <button
          type="button"
          onClick={() => handleChipClick('Hinglish me simple example ke saath samjhao')}
          className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-slate-800 hover:bg-purple-100 text-purple-700 dark:text-purple-300 font-medium transition"
        >
          Hinglish
        </button>
        <button
          type="button"
          onClick={() => handleChipClick('DU North campus ke liye cutoff aur safe score kya hai?')}
          className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-slate-800 hover:bg-amber-100 text-amber-700 dark:text-amber-300 font-medium transition"
        >
          DU Cutoff
        </button>
      </div>

      {/* Main input container */}
      <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
        <TextareaAutosize
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLimitReached}
          placeholder={isLimitReached ? 'Daily limit reached. Upgrade to continue!' : placeholder}
          minRows={1}
          maxRows={6}
          className="w-full bg-transparent resize-none outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 px-2 py-1 leading-relaxed"
        />

        <div className="flex items-center gap-2 flex-shrink-0 mb-0.5">
          {text.length > 0 && (
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              {text.length} chars
            </span>
          )}

          <button
            type="submit"
            disabled={!text.trim() || disabled || isLimitReached}
            className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
