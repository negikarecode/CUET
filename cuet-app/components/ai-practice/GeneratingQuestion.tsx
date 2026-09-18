"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Search, BookOpen, CheckCircle2 } from "lucide-react";

interface GeneratingQuestionProps {
  topicName?: string;
  difficulty?: string;
}

const MESSAGES = [
  { text: "Searching your study material in Pinecone...", icon: Search },
  { text: "Analyzing your weak areas & past accuracy...", icon: Brain },
  { text: "Crafting a personalized CUET-style question...", icon: Sparkles },
  { text: "Running quality & syllabus compliance checks...", icon: BookOpen },
  { text: "Almost ready for you...", icon: CheckCircle2 },
];

export function GeneratingQuestion({
  topicName = "Fundamental Rights",
  difficulty = "medium",
}: GeneratingQuestionProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = MESSAGES[currentMessageIndex].icon;

  return (
    <div className="w-full max-w-xl mx-auto my-12 p-8 sm:p-10 bg-white border border-indigo-100 rounded-3xl shadow-xl text-center relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Animated Brain & Sparkle Icon */}
      <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30"
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>

        {/* Orbiting Sparkles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-start justify-end"
        >
          <div className="p-1.5 bg-amber-400 rounded-full shadow-md text-slate-900">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </div>
        </motion.div>
      </div>

      {/* Target Topic & Difficulty */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-4">
        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
        <span>Target: {topicName}</span>
        <span>•</span>
        <span className="capitalize">{difficulty} Difficulty</span>
      </div>

      {/* Cycling Status Messages */}
      <div className="h-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base"
          >
            <CurrentIcon className="w-4 h-4 text-indigo-600 animate-spin-slow" />
            <span>{MESSAGES[currentMessageIndex].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots Bar */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {MESSAGES.map((_, idx) => (
          <motion.span
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentMessageIndex
                ? "w-6 bg-indigo-600"
                : "w-2 bg-slate-200"
            }`}
          />
        ))}
      </div>

      <p className="text-[11px] text-slate-400 mt-6 italic">
        Grounding questions only in verified NCERT & syllabus chunks (0% hallucination)
      </p>
    </div>
  );
}
