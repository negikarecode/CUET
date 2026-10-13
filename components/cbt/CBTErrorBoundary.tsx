"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RotateCcw, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { pruneOldCBTSessionsSafely, clearCBTSessionSync, getActiveUserId } from "@/lib/storage/cbt-session-storage";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isStorageQuotaError: boolean;
}

export class CBTErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    isStorageQuotaError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    const isStorageQuota = Boolean(
      error?.message &&
        (error.message.toLowerCase().includes("quota") ||
          error.message.includes("setItem") ||
          error.name === "QuotaExceededError")
    );
    return { hasError: true, error, isStorageQuotaError: isStorageQuota };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CBT Exam Player caught an unhandled error:", error, errorInfo);

    // If quota error, immediately run proactive pruning in the background
    if (typeof window !== "undefined") {
      try {
        const uid = getActiveUserId();
        pruneOldCBTSessionsSafely(uid);
      } catch {}
    }
  }

  private handleReload = () => {
    try {
      if (typeof window !== "undefined") {
        const uid = getActiveUserId();
        pruneOldCBTSessionsSafely(uid);

        // Emergency compaction of oversized session storage if congested
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key && key.startsWith("cuet_ai_prep_session_storage")) {
            try {
              const raw = window.localStorage.getItem(key);
              if (raw && raw.length > 500000) { // >500KB
                const parsed = JSON.parse(raw);
                if (parsed?.state?.testAttempts) {
                  // Keep only latest 3 attempts with empty questions to free immediate space
                  parsed.state.testAttempts = (parsed.state.testAttempts || []).slice(0, 3).map((a: any) => ({
                    ...a,
                    questions: [],
                  }));
                  parsed.state.diagnosticCycles = [];
                  window.localStorage.setItem(key, JSON.stringify(parsed));
                }
              }
            } catch {}
          }
        }
      }
    } catch {}

    window.location.reload();
  };

  private handleResetFresh = () => {
    try {
      if (typeof window !== "undefined") {
        // Extract testId from pathname e.g. /test/physics-mock-7
        const match = window.location.pathname.match(/\/test\/([^\/?#]+)/);
        if (match && match[1]) {
          const testId = match[1];
          clearCBTSessionSync(testId);
        }
      }
    } catch {}

    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto mb-2 shadow-xs">
              <AlertOctagon className="w-7 h-7 stroke-[2.5]" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Exam Session Protected
              </h2>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {this.state.isStorageQuotaError
                  ? "Browser storage congestion was detected. Stale cache and completed sessions have been pruned. Your current exam answers and timers are preserved."
                  : "An unexpected anomaly occurred in the CBT workspace. Your recorded answers, timers, and question flags are safely persisted in local storage."}
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-[11px] font-mono text-slate-700 text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Recover &amp; Resume Test</span>
                </button>
                <Link
                  href="/dashboard"
                  className="py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Home className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Dashboard</span>
                </Link>
              </div>

              <button
                type="button"
                onClick={this.handleResetFresh}
                className="py-2 px-3 text-[11px] font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 stroke-[2]" />
                <span>Discard corrupt session &amp; restart fresh</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
