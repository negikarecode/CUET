"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopicMetrics } from "@/lib/types";
import { Target, Sparkles, MessageSquare, Search, AlertOctagon, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopicBreakdownProps {
  topics: TopicMetrics[];
}

export function TopicBreakdown({ topics = [] }: TopicBreakdownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSignal, setSelectedSignal] = useState<string>("all");

  const filteredTopics = topics.filter((t) => {
    const matchesSearch =
      (t.topic_name || `Topic ${t.topic_id}`).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSignal = selectedSignal === "all" || t.weakness_signal === selectedSignal;
    return matchesSearch && matchesSignal;
  });

  const getSignalBadge = (signal: string) => {
    switch (signal) {
      case "critical":
        return {
          icon: <AlertOctagon className="h-3.5 w-3.5 text-red-600" />,
          label: "Critical Weakness",
          className: "bg-red-50 text-red-700 border-red-200",
        };
      case "weak":
        return {
          icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />,
          label: "Needs Work",
          className: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "average":
        return {
          icon: <HelpCircle className="h-3.5 w-3.5 text-blue-600" />,
          label: "Average",
          className: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "strong":
      default:
        return {
          icon: <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />,
          label: "Mastered",
          className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Topic-by-Topic Performance & Actions
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Pinpoint exact concepts and launch immediate targeted AI practice
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <select
            aria-label="Filter topics by status"
            value={selectedSignal}
            onChange={(e) => setSelectedSignal(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 py-1.5 px-3 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Signals</option>
            <option value="critical">🚨 Critical Only</option>
            <option value="weak">⚠️ Needs Work</option>
            <option value="strong">✅ Mastered</option>
          </select>
        </div>
      </div>

      {filteredTopics.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm font-medium">
          No topics found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.map((topic) => {
            const badge = getSignalBadge(topic.weakness_signal);
            const isUrgent = topic.weakness_signal === "critical" || topic.weakness_signal === "weak";

            return (
              <div
                key={topic.topic_id}
                className={`rounded-2xl border p-4 transition-all flex flex-col justify-between gap-4 ${
                  isUrgent
                    ? "bg-amber-50/20 border-amber-200/80 hover:border-amber-300"
                    : "bg-slate-50/40 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {topic.topic_name || `Topic ${topic.topic_id}`}
                    </h4>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md border shrink-0 ${badge.className}`}
                    >
                      {badge.icon}
                      {badge.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 font-semibold">
                    <span>
                      Accuracy:{" "}
                      <b
                        className={
                          topic.accuracy >= 70
                            ? "text-emerald-600"
                            : topic.accuracy >= 50
                            ? "text-blue-600"
                            : "text-rose-600"
                        }
                      >
                        {topic.accuracy}%
                      </b>{" "}
                      ({topic.correct}/{topic.total_questions})
                    </span>
                    <span>•</span>
                    <span>
                      Pace: <b className="text-slate-700">{topic.avg_time_seconds}s</b> / q
                    </span>
                  </div>
                </div>

                {/* Direct action links */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  <Link
                    href={`/practice/ai/${topic.topic_id}?from_mock=true`}
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      variant={isUrgent ? "default" : "outline"}
                      className={`w-full text-xs font-bold gap-1.5 h-8 ${
                        isUrgent
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      <span>AI Practice</span>
                    </Button>
                  </Link>

                  <Link href={`/chat?topic=${topic.topic_id}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 h-8 gap-1"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Ask Doubt</span>
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
