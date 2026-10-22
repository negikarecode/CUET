import { NextRequest } from "next/server";
import { handleAuthCallback, POST as handleAuthCallbackPost } from "@/lib/api-handlers/auth-callback";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return handleAuthCallback(request);
}

export async function POST(request: NextRequest) {
  return handleAuthCallbackPost(request);
}
