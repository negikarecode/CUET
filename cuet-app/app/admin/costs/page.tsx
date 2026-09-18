"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCostsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCostData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/usage");
      if (res.ok) {
        const json = await res.json();
        setData(json.monitoring);
      }
    } catch (err) {
      console.error("Cost data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCostData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/weakness"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student App</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/upload"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-1 rounded-lg border border-slate-200 bg-white"
          >
            Upload Content
          </Link>
          <Link
            href="/admin/review"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-1 rounded-lg border border-slate-200 bg-white"
          >
            Review Queue
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCostData}
            className="text-xs font-semibold h-8 gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
            <DollarSign className="w-4 h-4" />
            <span>AI Infrastructure Financials</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Cost & API Spend Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time OpenAI API tokens, Pinecone indexing, and response caching cost controls.
          </p>
        </div>

        {/* Budget Alert if > $10 */}
        {data?.isBudgetAlert && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-900 text-xs sm:text-sm font-semibold">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>
              Alert: Today&apos;s AI spend has exceeded the $10.00 daily safety threshold. Verify batch generation and caching status.
            </span>
          </div>
        )}

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs font-bold uppercase text-slate-400 block">Today&apos;s Spend</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-slate-900">
                ${data?.todaySpendUsd?.toFixed(4) || "0.0000"}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                (₹{data?.todaySpendInr?.toFixed(2) || "0.00"})
              </span>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium block mt-1">
              Safety Cap: $10.00/day
            </span>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs font-bold uppercase text-slate-400 block">7-Day Total</span>
            <span className="text-2xl font-black text-slate-900 mt-2 block">
              ${data?.weekSpendUsd?.toFixed(4) || "0.0000"}
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              Past 7 days running total
            </span>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs font-bold uppercase text-slate-400 block">Avg Cost / Question</span>
            <span className="text-2xl font-black text-indigo-600 mt-2 block">
              ${data?.averageCostPerQuestion?.toFixed(5) || "0.00021"}
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              ~₹0.017 per CUET MCQ
            </span>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs font-bold uppercase text-slate-400 block">Cache Hit Rate</span>
            <span className="text-2xl font-black text-emerald-600 mt-2 block">
              {data?.cacheHitRate || 0}%
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              Target: &gt;50% (Saves API budget)
            </span>
          </div>
        </div>

        {/* Breakdown by Model */}
        <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>Per-Model Spend Breakdown</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900">gpt-4o-mini</span>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Primary Model
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                $0.15/1M input • $0.60/1M output tokens (Used for MCQ generation)
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900">text-embedding-3-small</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Vector Model
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                $0.02/1M tokens (Used for Pinecone indexing 1536-d vectors)
              </p>
            </div>
          </div>
        </div>

        {/* 5 Cost Control Safeguards */}
        <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Active Cost Safeguards</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <span className="font-bold text-emerald-950 block">1. Plan Daily Limits</span>
              <p className="text-emerald-800 mt-0.5">Free: 10/day • Pro: 100/day</p>
            </div>
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <span className="font-bold text-emerald-950 block">2. Batch Generation (5 Qs)</span>
              <p className="text-emerald-800 mt-0.5">Reduces token overhead by ~40%</p>
            </div>
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <span className="font-bold text-emerald-950 block">3. Response Caching</span>
              <p className="text-emerald-800 mt-0.5">6-hour TTL shared across students</p>
            </div>
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <span className="font-bold text-emerald-950 block">4. Token Caps</span>
              <p className="text-emerald-800 mt-0.5">Max 600 output tokens per question</p>
            </div>
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl sm:col-span-2 lg:col-span-2">
              <span className="font-bold text-emerald-950 block">5. Zero-Hallucination Verified Context</span>
              <p className="text-emerald-800 mt-0.5">Restricted to Pinecone NCERT content only</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
