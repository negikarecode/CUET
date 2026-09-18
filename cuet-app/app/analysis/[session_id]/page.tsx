"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MockTestAnalysis, MockTestSession } from "@/lib/types";
import { AnalyzingScreen } from "@/components/analysis/AnalyzingScreen";
import { ReportCard } from "@/components/analysis/ReportCard";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MockAnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = (params?.session_id as string) || "";

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MockTestAnalysis | null>(null);
  const [session, setSession] = useState<MockTestSession | null>(null);
  const [allSessions, setAllSessions] = useState<MockTestSession[]>([]);
  const [studentName, setStudentName] = useState<string>("Student");
  const [error, setError] = useState<string | null>(null);

  const fetchReportAndHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch the report
      const res = await fetch(`/api/analysis/report/${sessionId}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        // If analysis is not found, try generating it automatically
        if (data.status === "processing" || data.status === "pending" || res.status === 404) {
          setAnalyzing(true);
          await triggerGeneration();
          return;
        }
        throw new Error(data.error || "Failed to load mock report");
      }

      if (!data.analysis) {
        // Session exists but analysis needs generation
        setAnalyzing(true);
        await triggerGeneration();
        return;
      }

      setAnalysis(data.analysis);
      setSession(data.session);
      if (data.student_name) setStudentName(data.student_name);

      // 2. Fetch history for trends
      try {
        const hRes = await fetch("/api/analysis/history");
        const hData = await hRes.json();
        if (hData.success && hData.sessions) {
          setAllSessions(hData.sessions);
        }
      } catch (err) {
        console.warn("Could not load past sessions for trend:", err);
      }
    } catch (err: any) {
      console.error("Error loading analysis:", err);
      setError(err.message || "An unexpected error occurred while loading your report.");
    } finally {
      setLoading(false);
    }
  };

  const triggerGeneration = async () => {
    try {
      const genRes = await fetch("/api/analysis/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const genData = await genRes.json();

      if (!genRes.ok || !genData.success) {
        throw new Error(genData.error || "Analysis generation failed");
      }

      // Re-fetch report now that it has completed
      const reportRes = await fetch(`/api/analysis/report/${sessionId}`);
      const reportData = await reportRes.json();
      if (reportData.success && reportData.analysis) {
        setAnalysis(reportData.analysis);
        setSession(reportData.session);
        if (reportData.student_name) setStudentName(reportData.student_name);

        // Fetch history
        try {
          const hRes = await fetch("/api/analysis/history");
          const hData = await hRes.json();
          if (hData.success && hData.sessions) {
            setAllSessions(hData.sessions);
          }
        } catch {}
      }
    } catch (err: any) {
      setError(err.message || "Could not generate analysis report.");
    } finally {
      setAnalyzing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchReportAndHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // If analyzing, render the animated AnalyzingScreen
  if (analyzing) {
    return (
      <AnalyzingScreen
        sessionId={sessionId}
        testNumber={session?.test_number || 1}
        onComplete={() => fetchReportAndHistory()}
      />
    );
  }

  // Initial loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-sm font-bold text-slate-700">Loading your CUET analysis report...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !analysis || !session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-white p-8 text-center border border-slate-200 shadow-lg space-y-5">
          <div className="h-14 w-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Analysis Not Ready</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium leading-relaxed">
              {error || "We couldn't retrieve the analysis report for this mock session."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              onClick={() => fetchReportAndHistory()}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 text-xs h-10"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full font-bold text-xs h-10 gap-1.5">
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render the full comprehensive report card
  return (
    <ReportCard
      session={session}
      analysis={analysis}
      allSessions={allSessions}
      studentName={studentName}
    />
  );
}
