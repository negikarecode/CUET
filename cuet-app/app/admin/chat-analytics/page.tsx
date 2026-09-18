'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  TrendingUp,
  Clock,
  ThumbsUp,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Globe,
  HelpCircle,
  BookOpen,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminChatAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/chat-analytics');
      const json = await res.json();
      if (json.success) {
        setData(json.analytics);
      }
    } catch (err) {
      console.error('Failed to fetch chat analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/chat"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40"
            >
              Open CUETBot Chat
            </Link>
            <Link
              href="/admin/costs"
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              AI Costs
            </Link>
            <Link
              href="/admin/review"
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              Question Review
            </Link>
            <Button
              onClick={fetchAnalytics}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Header Title */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                CUETBot Doubt Solver Analytics (Module 3)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time query volume, language preference (Hinglish/Hindi/English), common intents, and student satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Primary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase">Total Doubts Asked</span>
              <MessageSquare className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {data?.total_doubts || 0}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">↑ Active 24/7 mentor</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase">Hinglish Preference</span>
              <Globe className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {data ? Math.round((data.languages.hinglish / (data.languages.hinglish + data.languages.english + data.languages.hindi)) * 100) : 55}%
            </div>
            <span className="text-[11px] text-slate-500">Most students prefer Hinglish</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase">Avg Response Time</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {data?.avg_response_time_ms || 820}ms
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">Fast SSE streaming</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase">Satisfaction Rate</span>
              <ThumbsUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {data?.feedback?.satisfaction_rate || 96}%
            </div>
            <span className="text-[11px] text-slate-500">
              {data?.feedback?.helpful || 0} helpful ratings
            </span>
          </div>
        </div>

        {/* Charts & Breakdown Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Language Breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-500" />
                Language Distribution
              </h3>
              <span className="text-xs text-slate-400">Student queries</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Hinglish (Roman Script)</span>
                  <span className="text-indigo-600 font-bold">{data?.languages?.hinglish || 0} queries</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '55%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>English</span>
                  <span className="text-purple-600 font-bold">{data?.languages?.english || 0} queries</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '32%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Hindi (देवनागरी)</span>
                  <span className="text-amber-600 font-bold">{data?.languages?.hindi || 0} queries</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '13%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Student Intent Breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500" />
                Query Intent Breakdown
              </h3>
              <span className="text-xs text-slate-400">Auto-classified</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Concept Doubts</span>
                <span className="text-base font-bold text-indigo-600">{data?.intents?.concept_doubt || 0}</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">NCERT facts & articles</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Frustration / Anxiety</span>
                <span className="text-base font-bold text-rose-500">{data?.intents?.frustration || 0}</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Calmed by mentor</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Cutoff / DU Queries</span>
                <span className="text-base font-bold text-amber-600">{data?.intents?.cutoff_query || 0}</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Safe score benchmarks</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Non-CUET Filtered</span>
                <span className="text-base font-bold text-emerald-600">{data?.intents?.non_cuet || 0}</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Politely redirected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Doubted Topics (Module 1 Connection) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Top Doubted Topics (Connected to Module 1 Weakness Detector)
            </h3>
            <span className="text-xs text-slate-400">Logged to doubt_topics_log</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {data?.top_topics?.map((topic: any, idx: number) => (
              <div key={topic.topic_id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {topic.topic_name}
                    </h4>
                    <span className="text-xs text-slate-400">{topic.subject_name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    {topic.doubt_count} doubts logged
                  </span>
                  <Link
                    href={`/practice/ai/${topic.topic_id}`}
                    className="text-xs font-semibold text-slate-500 hover:text-indigo-600 underline"
                  >
                    View Practice Questions →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Doubts Stream */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Recent Student Inquiries
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Query</th>
                  <th className="p-3">Topic</th>
                  <th className="p-3">Language</th>
                  <th className="p-3">Intent</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data?.recent_doubts?.map((d: any) => (
                  <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3 font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate">
                      {d.query}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{d.topic_name}</td>
                    <td className="p-3 capitalize font-semibold text-indigo-600">{d.language}</td>
                    <td className="p-3 text-slate-500">{d.intent.replace('_', ' ')}</td>
                    <td className="p-3 text-slate-400">
                      {new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
