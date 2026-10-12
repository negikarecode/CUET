import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { fetchServerTestAttempts } from "@/lib/server-attempts";
import { RecordedTestAttempt } from "@/types";
import SessionsHistoryClient from "@/components/dashboard/SessionsHistoryClient";

export const metadata: Metadata = {
  title: "Session History | CUET AI-Prep",
  description:
    "Complete history of all completed CUET CBT mock examinations, practice tests, and past papers.",
};

export const dynamic = "force-dynamic";

export default async function SessionsPage() {
  let initialAttempts: RecordedTestAttempt[] = [];

  try {
    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      initialAttempts = await fetchServerTestAttempts(supabase, authUser.id);
    }
  } catch (err) {
    console.warn("Failed to prefetch server test attempts for sessions page:", err);
  }

  return <SessionsHistoryClient initialAttempts={initialAttempts} />;
}
