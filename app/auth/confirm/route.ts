import { NextRequest } from "next/server";
import { handleAuthConfirm, POST as handleAuthConfirmPost } from "@/lib/api-handlers/auth-confirm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return handleAuthConfirm(request);
}

export async function POST(request: NextRequest) {
  return handleAuthConfirmPost(request);
}
