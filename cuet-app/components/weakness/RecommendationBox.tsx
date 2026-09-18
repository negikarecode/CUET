"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Target, MessageSquare } from "lucide-react";
import { Recommendation } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RecommendationBoxProps {
  recommendations: Recommendation[];
  totalAttempts?: number;
}

export function RecommendationBox({ recommendations, totalAttempts = 0 }: RecommendationBoxProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
      {/* Background ambient decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-indigo-700/50">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-600/40 border border-indigo-400/30 text-indigo-200">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              🎯 AI Recommends — Focus on These Today
            </h3>
            <p className="text-xs text-indigo-200">
              Personalized algorithm analyzing high-yield CUET topics with low student mastery
            </p>
          </div>
        </div>
      </div>

      {/* 3 Recommendations List */}
      <div className="relative z-10 space-y-3 mt-4">
        {recommendations.map((rec) => (
          <div
            key={rec.topic_id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Priority number badge */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center font-bold text-sm text-indigo-200">
                {rec.priority}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-semibold text-white">
                    {rec.topic_name}
                  </h4>
                  <Badge variant={rec.weakness_level as any} className="text-[10px] py-0 px-2 uppercase font-bold">
                    {rec.weakness_level}
                  </Badge>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    rec.has_ai_content !== false
                      ? "bg-indigo-500/40 text-amber-300 border border-indigo-400/40"
                      : "bg-slate-700/60 text-slate-300"
                  }`}>
                    {rec.has_ai_content !== false ? "🤖 AI Personalized" : "📝 Standard Practice"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-indigo-200 mt-1">
                  <span>{rec.subject_name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-indigo-100">
                    <Target className="w-3 h-3 text-amber-300" />
                    {rec.has_ai_content !== false
                      ? `🤖 ${rec.questions_ready} AI questions ready`
                      : `${rec.questions_ready} questions ready`}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ~{rec.estimated_minutes} mins
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link href={`/chat?topic=${rec.topic_id}`} className="w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-indigo-400/40 text-indigo-200 hover:bg-indigo-800/50 hover:text-white font-medium text-xs gap-1 min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-300" />
                  Ask Doubt
                </Button>
              </Link>

              <Link
                href={
                  rec.has_ai_content !== false
                    ? `/practice/ai/${rec.topic_id}?weakness_level=${rec.weakness_level}`
                    : `/practice/${rec.topic_id}`
                }
                className="w-full sm:w-auto"
              >
                <Button
                  size="sm"
                  className="w-full sm:w-auto bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs gap-1 min-h-[44px]"
                >
                  {rec.has_ai_content !== false ? "AI Practice" : "Practice"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>


      {/* Footer footer note */}
      <div className="relative z-10 mt-4 pt-3 border-t border-indigo-700/50 flex items-center justify-between text-xs text-indigo-300">
        <span>
          Based on your last {totalAttempts > 0 ? totalAttempts : "recent"} attempts
        </span>
        <span className="text-[11px] text-indigo-400 font-mono">
          Engine: Adaptive-CUET-v1.4
        </span>
      </div>
    </div>
  );
}
