"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CBTErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CBT Exam Player caught an unhandled error:", error, errorInfo);
  }

  private handleReload = () => {
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
                An unexpected render anomaly occurred in the CBT workspace. Your recorded answers, timers, and question flags are safely persisted in local storage.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-[11px] font-mono text-slate-700 text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
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
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
