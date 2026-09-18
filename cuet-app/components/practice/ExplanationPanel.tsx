"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Lightbulb, Clock, BookCheck } from "lucide-react";

interface ExplanationPanelProps {
  isCorrect: boolean;
  correctOption: string;
  explanation: string;
  timeTakenSeconds: number;
  targetSeconds?: number;
}

export function ExplanationPanel({
  isCorrect,
  correctOption,
  explanation,
  timeTakenSeconds,
  targetSeconds = 45,
}: ExplanationPanelProps) {
  const isFast = timeTakenSeconds <= targetSeconds;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`w-full rounded-2xl border p-4 sm:p-5 mt-5 space-y-4 ${
        isCorrect
          ? "bg-green-50/70 border-green-200 text-green-950"
          : "bg-red-50/70 border-red-200 text-red-950"
      }`}
    >
      {/* Status Header & Speed Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/5">
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <div className="flex items-center gap-1.5 text-green-700 font-bold text-base">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Correct Answer! (+5 Marks)
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-red-700 font-bold text-base">
              <XCircle className="w-5 h-5 text-red-600" />
              Incorrect Answer (-1 Mark)
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Time: {timeTakenSeconds}s
          </span>
          <span className={isFast ? "text-emerald-700" : "text-amber-700"}>
            {isFast ? "⚡ On Pace" : "⚠️ Slower than 45s target"}
          </span>
        </div>
      </div>

      {/* Correct Option declaration */}
      <div className="flex items-center gap-2 text-sm font-semibold">
        <BookCheck className="w-4 h-4 text-indigo-600" />
        <span>Correct Option: <span className="underline decoration-indigo-500 font-black">Option {correctOption}</span></span>
      </div>

      {/* Deep Conceptual Explanation */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Explanation & NCERT Insight:
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed pl-5 whitespace-pre-line">
          {explanation}
        </p>
      </div>
    </motion.div>
  );
}
