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
        <div className="min-h-screen bg-[#FAF7EE] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_#000] p-6 text-center">
            <div className="w-14 h-14 rounded-lg bg-[#FEE2E2] text-black border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_#000]">
              <AlertOctagon className="w-7 h-7 text-[#DC2626] stroke-[2.5]" />
            </div>

            <h2 className="text-xl font-black text-black tracking-tight">
              Exam Session Protected
            </h2>

            <p className="mt-2 text-xs text-black/70 font-semibold leading-relaxed">
              An unexpected render anomaly occurred in the CBT workspace. Your recorded answers, timers, and question flags are safely persisted in local storage.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 bg-[#FAF7EE] rounded-lg border-2 border-black text-[11px] font-mono text-black text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Recover & Resume Test</span>
              </button>
              <Link
                href="/dashboard"
                className="py-2.5 px-4 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black font-black text-xs flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#000] transition-colors"
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
