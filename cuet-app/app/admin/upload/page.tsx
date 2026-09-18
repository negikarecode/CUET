import React from "react";
import Link from "next/link";
import { ArrowLeft, Database, ShieldCheck, DollarSign } from "lucide-react";
import { ContentUploader } from "@/components/admin/ContentUploader";

export const metadata = {
  title: "Upload CUET Content | Admin Dashboard",
  description: "Upload and vectorize CUET syllabus notes into Pinecone",
};

export default function AdminUploadPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      {/* Top Admin Nav */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/weakness"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student App</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/review"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-1 rounded-lg border border-slate-200 bg-white"
          >
            Review Queue
          </Link>
          <Link
            href="/admin/costs"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-1 rounded-lg border border-slate-200 bg-white"
          >
            Cost Monitoring
          </Link>
        </div>
      </div>

      <ContentUploader />
    </main>
  );
}
