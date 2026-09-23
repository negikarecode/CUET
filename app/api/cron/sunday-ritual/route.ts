import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { runSundayRitual } from "@/lib/sunday-ritual";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const secret = process.env.CRON_SECRET;

  // Strict fail-closed check for cron endpoint
  if (!secret || secret.includes("placeholder") || authHeader !== `Bearer ${secret}`) {
    return new Response("Unauthorized: Valid Bearer CRON_SECRET required", { status: 401 });
  }

  try {
    // Query active profiles using admin client
    const { data: qualifiedUsers } = await supabaseAdmin
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
