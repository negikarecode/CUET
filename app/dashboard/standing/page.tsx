import { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import StandingViewClient from "@/components/dashboard/standing/StandingViewClient";
import { fetchServerTestAttempts } from "@/lib/server-attempts";
import { RecordedTestAttempt } from "@/types";

export const metadata: Metadata = {
  title: "Where Do I Stand | CUET AI-Prep",
  description:
    "Compare your CUET mock scores against previous years' official college cutoffs. Deterministic chance band predictions, dream college gap analysis, and subject requirements.",
};

export const dynamic = "force-dynamic";

function StandingLoadingFallback() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
      <div className="h-10 bg-slate-200 rounded-xl w-64" />
      <div className="h-32 bg-slate-200 rounded-2xl w-full" />
      <div className="h-64 bg-slate-200 rounded-2xl w-full" />
    </div>
  );
}

export default async function StandingPage() {
  let initialUser: { targetCollege?: string; targetCourse?: string; targetStream?: string } | undefined;
  let initialAttempts: RecordedTestAttempt[] = [];

  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("target_college, target_course, target_stream")
        .eq("id", authUser.id)
        .maybeSingle();

      const college = profile?.target_college || (authUser.user_metadata?.target_college as string | undefined);
      const course = profile?.target_course || (authUser.user_metadata?.target_course as string | undefined);
      const stream = profile?.target_stream || (authUser.user_metadata?.target_stream as string | undefined);

      if (college || course || stream) {
        initialUser = {
          targetCollege: college,
          targetCourse: course,
          targetStream: stream,
        };
      }

      initialAttempts = await fetchServerTestAttempts(supabase, authUser.id);
    }
  } catch (err) {
    console.warn("StandingPage server query notice:", err);
  }

  return (
    <Suspense fallback={<StandingLoadingFallback />}>
      <StandingViewClient initialUser={initialUser} initialAttempts={initialAttempts} />
    </Suspense>
  );
}

