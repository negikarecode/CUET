import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * POST /api/create-order (DECOMMISSIONED)
 *
 * SECURITY NOTICE:
 * This legacy endpoint has been safely decommissioned to eliminate client-supplied
 * amount tampering and unauthenticated order generation (SEC-01).
 *
 * All legitimate checkout order creation must use the authoritative, server-priced
 * endpoint at POST /api/payments with a verified candidate session.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "This legacy endpoint has been decommissioned. Checkout order creation must use POST /api/payments with an authenticated session.",
      code: "ENDPOINT_DECOMMISSIONED",
    },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      error: "This legacy endpoint has been decommissioned. Checkout order creation must use POST /api/payments with an authenticated session.",
      code: "ENDPOINT_DECOMMISSIONED",
    },
    { status: 410 }
  );
}
