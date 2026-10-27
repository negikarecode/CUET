import { NextRequest, NextResponse } from "next/server";

// Simple in-memory sliding window rate limiter
// Limits each IP to 5 contact submissions per 15 minutes
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale entries every 30 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      const activeTimestamps = record.timestamps.filter(
        (t) => now - t < RATE_LIMIT_WINDOW_MS
      );
      if (activeTimestamps.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, { timestamps: activeTimestamps });
      }
    }
  }, 30 * 60 * 1000);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { timestamps: [] };

  // Retain only requests within current window
  const activeTimestamps = record.timestamps.filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, { timestamps: activeTimestamps });
  return true;
}

// Sanitize string to prevent basic script injection & strip control characters
function sanitizeInput(str: string): string {
  return str
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .trim();
}

const VALID_CATEGORIES = new Set([
  "general",
  "mocks",
  "pyqs",
  "payments",
  "academic",
  "technical",
]);

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many requests. Please wait a few minutes before submitting another message.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const rawName = typeof body.name === "string" ? body.name : "";
    const rawEmail = typeof body.email === "string" ? body.email : "";
    const rawCategory = typeof body.category === "string" ? body.category : "general";
    const rawMessage = typeof body.message === "string" ? body.message : "";

    const name = sanitizeInput(rawName);
    const email = sanitizeInput(rawEmail).toLowerCase();
    const category = sanitizeInput(rawCategory).toLowerCase();
    const message = sanitizeInput(rawMessage);

    // Name Validation (2 to 100 characters)
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid name between 2 and 100 characters.",
        },
        { status: 422 }
      );
    }

    // Email Validation
    if (!EMAIL_REGEX.test(email) || email.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 422 }
      );
    }

    // Category Validation
    const safeCategory = VALID_CATEGORIES.has(category) ? category : "general";

    // Message Validation (10 to 2000 characters)
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          error: "Message must be between 10 and 2000 characters.",
        },
        { status: 422 }
      );
    }

    // 3. Generate Reference Ticket ID
    const ticketId = `CUET-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    // 4. Honest Server Logging
    console.info(
      `[Support Desk] New Ticket Registered: ${ticketId} | From: ${email} | Category: ${safeCategory} | Excerpt: ${message.slice(0, 80)}...`
    );

    return NextResponse.json(
      {
        success: true,
        ticketId,
        message:
          "Thank you for contacting CUET AI-Prep. Your support ticket has been created and our academic team will respond within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Support Desk] Internal Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please reach out to support@cuetprep.com directly.",
      },
      { status: 500 }
    );
  }
}
