import React, { Suspense } from "react";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getUserEntitlement } from "@/lib/payments/entitlements";
import CoachChatClient from "@/components/chat/CoachChatClient";

export const metadata: Metadata = {
  title: "Coach Chat | CUET AI-Prep",
  description:
    "Grounded conversational AI mentor for CUET UG aspirants. Review mistakes, calculate college cutoff gaps, and build targeted revision schedules.",
};

export default async function CoachChatPage() {
  let isPremium = false;
  let initialThreads: any[] = [];

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.id) {
      const entitlement = await getUserEntitlement(user.id);
      isPremium = entitlement.isPremium;

      if (isPremium) {
        const { data: threads } = await supabaseAdmin
          .from("chat_threads")
          .select("id, title, created_at, updated_at")
          .eq("user_id", user.id)
          .eq("is_archived", false)
          .order("updated_at", { ascending: false });

        initialThreads = threads || [];
      }
    }
  } catch (err) {
    console.warn("CoachChatPage SSR initialization fallback:", err);
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-slate-50">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
        </div>
      }
    >
      <CoachChatClient
        isPremium={isPremium}
        initialThreads={initialThreads}
      />
    </Suspense>
  );
}
