import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * POST /api/verify-payment (DECOMMISSIONED)
 *
 * SECURITY NOTICE:
 * This legacy endpoint has been safely decommissioned to eliminate IDOR privilege
 * escalation and unverified entitlement grants (SEC-01).
 *
 * All legitimate payment verification must use the authoritative, owner-validated
 * endpoint at POST /api/payments with a verified candidate session.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: "This legacy endpoint has been decommissioned. Payment verification must use POST /api/payments with an authenticated session.",
      code: "ENDPOINT_DECOMMISSIONED",
    },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      error: "This legacy endpoint has been decommissioned. Payment verification must use POST /api/payments with an authenticated session.",
      code: "ENDPOINT_DECOMMISSIONED",
    },
    { status: 410 }
  );
}
