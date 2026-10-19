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

    if (authUser?.id) {
      const serverAttempts = await fetchServerTestAttempts(supabase, authUser.id);
      // Strictly guarantee plain JSON serializability across RSC boundary
      initialAttempts = JSON.parse(JSON.stringify(serverAttempts || []));
    }
  } catch (err) {
    console.error("[SessionsPage SSR Error]:", err);
    initialAttempts = [];
  }

  return <SessionsHistoryClient initialAttempts={initialAttempts} />;
}
