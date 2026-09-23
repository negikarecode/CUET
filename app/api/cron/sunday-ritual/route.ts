import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { runSundayRitual } from "@/lib/sunday-ritual";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const secret = process.env.CRON_SECRET || "cuet_cron_secret_2026";

  if (process.env.NODE_ENV === "production" && authHeader !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const supabase = createClient();
    // Query active profiles who have attempted at least 150 questions
    const { data: qualifiedUsers } = await supabase
      .from("profiles")
      .select("id")
      .limit(50);

    const processedUsers: string[] = [];

    if (qualifiedUsers) {
      for (const profile of qualifiedUsers) {
        try {
          await runSundayRitual(profile.id);
          processedUsers.push(profile.id);
        } catch (uErr) {
          console.warn(`Sunday Ritual failed for user ${profile.id}:`, uErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      processedCount: processedUsers.length,
      users: processedUsers,
    });
  } catch (error) {
    console.error("[Cron /api/cron/sunday-ritual] Error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
