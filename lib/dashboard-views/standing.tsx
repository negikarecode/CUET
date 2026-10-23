import { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import StandingViewClient from "@/components/dashboard/standing/StandingViewClient";
import { fetchServerTestAttempts } from "@/lib/server-attempts";
import { RecordedTestAttempt } from "@/types";

export const metadata: Metadata = {
  title: "Where Do I Stand | CUET AI-Prep",
  description:
    "Compare your CUET mock scores against previous years' official college cutoffs. Deterministic chance band predictions, dream college gap analysis, and subject requirements.",
};


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
  let isPremium = false;
  let isVerified = false;
  let userId: string | undefined;

  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser?.id) {
      userId = authUser.id;
      // 1. Authoritative admin entitlement check
      const admin = createAdminClient();
      let profile: any = null;
      try {
        const { data, error } = await admin
          .from("profiles")
          .select("target_college, target_course, target_stream, is_premium")
          .eq("id", authUser.id)
          .maybeSingle();

        if (error && (error.code === "42703" || error.message?.includes("target_course"))) {
          const fallback = await admin
            .from("profiles")
            .select("target_college, target_stream, is_premium")
            .eq("id", authUser.id)
            .maybeSingle();
          profile = fallback.data;
        } else {
          profile = data;
        }
      } catch (err) {
        console.warn("Profile query notice in standing:", err);
      }

      const { getUserEntitlement } = await import("@/lib/payments/entitlements");
      const entitlement = await getUserEntitlement(authUser.id);
      isPremium = entitlement.isPremium;
      isVerified = true;

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
      <StandingViewClient
        initialUser={initialUser}
        initialAttempts={initialAttempts}
        initialIsPremium={isPremium}
        initialIsVerified={isVerified}
        initialUserId={userId}
      />
    </Suspense>
  );
}

