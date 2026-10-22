import { NextRequest } from "next/server";
import { handleAuthSessionPost } from "@/lib/api-handlers/auth-session";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  return handleAuthSessionPost(request);
}
