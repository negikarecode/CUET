import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReviewQueue } from "@/components/admin/ReviewQueue";

export const metadata = {
  title: "SME Review Dashboard | CUET AI Questions",
  description: "Approve, edit, or reject AI-generated CUET exam questions",
};

export default function AdminReviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      {/* Top Admin Nav */}
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
            href="/admin/costs"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-1 rounded-lg border border-slate-200 bg-white"
          >
            Cost Monitoring
          </Link>
        </div>
      </div>

      <ReviewQueue />
    </main>
  );
}
