"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, History, ArrowLeft, LogIn } from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { Question, FullTestMeta } from "@/types";
import CBTPlayer from "@/components/cbt/CBTPlayer";
import { cbtAutosave } from "@/lib/storage/cbt-session-storage";

interface CBTPageClientProps {
  testId: string;
  isReattempt?: boolean;
  initialTestMeta?: FullTestMeta;
  initialQuestions?: Question[];
}

interface InitErrorState {
  type: "auth_expired" | "not_found" | "empty_data" | "network_error" | "forbidden" | "generic";
  title: string;
  message: string;
  isRecoverable: boolean;
}

export default function CBTPageClient({
  testId,
  isReattempt = false,
  initialTestMeta,
  initialQuestions,
}: CBTPageClientProps) {
  const isInitialized = useCBTStore((state) => state.isInitialized);
  const currentTestId = useCBTStore((state) => state.testId);
  const isSubmitted = useCBTStore((state) => state.isSubmitted);
  const initTest = useCBTStore((state) => state.initTest);

  const [initError, setInitError] = useState<InitErrorState | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Tracks the execution key of the last initialization to prevent duplicate requests on re-renders
  const initializedKeyRef = useRef<string | null>(null);

  // Perform initialization
  useEffect(() => {
    // Generate an execution key based on testId, isReattempt, and retryCount
    const currentKey = `${testId}_${Boolean(isReattempt)}_${retryCount}`;

    // Prevent duplicate initialization on repeated renders
    if (initializedKeyRef.current === currentKey) {
      return;
    }
    initializedKeyRef.current = currentKey;

    let isMounted = true;

    const runInit = async () => {
      try {
        // Fast-path: authoritative question payload provided via SSR props
        if (initialTestMeta && initialQuestions) {
          if (initialQuestions.length === 0) {
            if (isMounted) {
              setInitError({
                type: "empty_data",
                title: "Exam Paper Unavailable",
                message: "No question telemetry or problems were found for this examination paper. It may be under scheduled reconstruction.",
                isRecoverable: false,
              });
            }
            return;
          }

          initTest(testId, initialTestMeta, initialQuestions, isReattempt);

          // Clean URL reattempt parameter after successful initialization to protect in-exam reloads
          if (isReattempt && typeof window !== "undefined" && window.history?.replaceState) {
            try {
              const cleanUrl = window.location.pathname;
              window.history.replaceState(null, "", cleanUrl);
            } catch {}
          }

          if (isMounted) setInitError(null);
          return;
        }

        // Secure Fallback: Fetch sanitized questions from server API
        const res = await fetch(`/api/test/${testId}`);

        if (!isMounted) return;

        if (res.status === 401) {
          setInitError({
            type: "auth_expired",
            title: "Candidate Session Expired",
            message: "Your authenticated candidate session has expired. Please sign in again to load your examination.",
            isRecoverable: false,
          });
          return;
        }

        if (res.status === 403) {
          const errData = await res.json().catch(() => ({}));
          setInitError({
            type: "forbidden",
            title: "Access Restricted",
            message: errData?.error || "You have reached your Free plan allowance or do not have access to this test.",
            isRecoverable: false,
          });
          return;
        }

        if (!res.ok) {
          setInitError({
            type: "network_error",
            title: "Test Loading Failed",
            message: `Unable to load test paper from server (HTTP ${res.status}). Please check your connection and retry.`,
            isRecoverable: true,
          });
          return;
        }

        const data = await res.json();
        if (!isMounted) return;

        if (data?.testMeta && data?.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          initTest(testId, data.testMeta, data.questions, isReattempt);

          if (isReattempt && typeof window !== "undefined" && window.history?.replaceState) {
            try {
              window.history.replaceState(null, "", window.location.pathname);
            } catch {}
          }

          setInitError(null);
        } else if (data?.questions && Array.isArray(data.questions) && data.questions.length === 0) {
          setInitError({
            type: "empty_data",
            title: "No Questions Available",
            message: "This test paper has no active questions in the question bank.",
            isRecoverable: false,
          });
        } else {
          setInitError({
            type: "generic",
            title: "Initialization Error",
            message: data?.error || "Invalid response format received from test server.",
            isRecoverable: true,
          });
        }
      } catch (err: any) {
        console.error("CBTPageClient initialization error:", err);
        if (isMounted) {
          setInitError({
            type: "network_error",
            title: "Connection Error",
            message: "A network error occurred while establishing your CBT exam session. Please check your internet connection.",
            isRecoverable: true,
          });
        }
      }
    };

    runInit();

    return () => {
      isMounted = false;
    };
  }, [testId, initTest, isReattempt, initialTestMeta, initialQuestions, retryCount]);

  const handleRetry = useCallback(() => {
    setInitError(null);
    initializedKeyRef.current = null;
    setRetryCount((prev) => prev + 1);
  }, []);

  // Intercept tab/window close or refresh at page root during active exam
  useEffect(() => {
    if (isSubmitted) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      try {
        cbtAutosave.flush();
      } catch {}
      const msg = "Warning: No test data will be recorded if you close or leave this test.";
      e.returnValue = msg;
      return msg;
    };

    const handlePageHide = () => {
      try {
        cbtAutosave.flush();
      } catch {}
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handlePageHide);
    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
      window.onbeforeunload = null;
    };
  }, [isSubmitted]);

  // State 1: Error state (Recoverable with Retry, or Failure with Mock History link)
  if (initError) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600 shadow-xs">
            <AlertCircle className="w-7 h-7 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200/60 inline-block">
              {initError.type === "auth_expired" ? "Authentication Notice" : "Exam Initialization Notice"}
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {initError.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              {initError.message}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {initError.isRecoverable && (
              <button
                type="button"
                onClick={handleRetry}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Retry Initialization</span>
              </button>
            )}

            {initError.type === "auth_expired" && (
              <Link
                href={`/signup?redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname + window.location.search : `/test/${testId}`)}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all"
              >
                <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Sign In / Register</span>
              </Link>
            )}

            <Link
              href="/dashboard/sessions"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 font-semibold text-xs border border-slate-200 transition-all"
            >
              <History className="w-3.5 h-3.5 stroke-[2]" />
              <span>Back to Mock History</span>
            </Link>

            <Link
              href="/dashboard/mocks"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-slate-500 hover:text-slate-800 font-medium text-xs transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse All Mocks</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Transient Loading state while store synchronizes
  if (!isInitialized || currentTestId !== testId || (isReattempt && isSubmitted)) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-slate-600">
          <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {isReattempt
              ? "Preparing Fresh Re-attempt Environment..."
              : "Initializing NTA CBT Secure Examination Engine..."}
          </p>
        </div>
      </div>
    );
  }

  // State 3: Success state
  return <CBTPlayer />;
}
