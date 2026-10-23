import React from "react";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import MyReportsClient from "@/components/dashboard/reports/MyReportsClient";
import { AICoachStoredReport } from "@/types/ai-coach";

export const metadata: Metadata = {
  title: "My Reports | CUET AI-Prep",
  description:
    "Saved diagnostic intelligence reports, historical progress comparison, and score trajectory analysis.",
};

export default async function ReportsPage() {
  let initialReports: AICoachStoredReport[] = [];

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.id) {
      const admin = createAdminClient();
      const { data: reports, error } = await admin
        .from("ai_reports")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && reports) {
        initialReports = reports as AICoachStoredReport[];
      }
    }
  } catch (err) {
    console.warn("ReportsPage SSR session load fallback:", err);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <MyReportsClient initialReports={initialReports} />
    </div>
  );
}
