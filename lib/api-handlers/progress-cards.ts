import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  calculateProgressCardData,
  generateShortCardId,
} from "@/lib/progress-cards/logic";
import { filterStudentNote } from "@/lib/progress-cards/profanity";
import { AICoachStoredReport } from "@/types/ai-coach";
import { ProgressCardRecord } from "@/lib/progress-cards/types";

/**
 * GET /api/progress-cards/* handler
 */
export async function handleProgressCardsGet(
  req: NextRequest,
  action?: string
): Promise<NextResponse> {
  const parts = action?.split("/").filter(Boolean) || [];
  const primary = parts[0] || "list";

  // Public card lookup: GET /api/progress-cards/public/:id
  if (primary === "public") {
    const cardId = parts[1] || req.nextUrl.searchParams.get("id");
    if (!cardId) {
      return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();
    const { data: card, error } = await supabaseAdmin
      .from("progress_cards")
      .select("*")
      .eq("id", cardId)
      .eq("is_public", true)
      .maybeSingle();

    if (error || !card) {
      return NextResponse.json(
        { error: "Progress card not found or has been made private." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, card });
  }

  // Authenticated candidate cards listing: GET /api/progress-cards/list
  const supabase = createClient();
  let authUser = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    authUser = user;
  } catch {}

  if (!authUser?.id) {
    return NextResponse.json(
      { error: "Authentication required to view your progress cards.", code: "AUTH_REQUIRED" },
      { status: 401 }
    );
  }

  const supabaseAdmin = createAdminClient();
  const { data: cards, error } = await supabaseAdmin
    .from("progress_cards")
    .select("*")
    .eq("user_id", authUser.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to load progress cards" }, { status: 500 });
  }

  return NextResponse.json({ success: true, cards: cards || [] });
}

/**
 * POST /api/progress-cards/* handler
 */
export async function handleProgressCardsPost(
  req: NextRequest,
  _action?: string
): Promise<NextResponse> {
  const supabase = createClient();
  let authUser = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    authUser = user;
  } catch {}

  if (!authUser?.id) {
    return NextResponse.json(
      { error: "Authentication required to create a progress card.", code: "AUTH_REQUIRED" },
      { status: 401 }
    );
  }

  const userId = authUser.id;
  const body = await req.json().catch(() => ({}));
  const { fromReportId, toReportId, displayName, studentNote, milestoneBadge, isPublic } = body;

  if (!fromReportId || !toReportId) {
    return NextResponse.json(
      { error: "Missing required parameters: fromReportId and toReportId are required." },
      { status: 400 }
    );
  }

  if (fromReportId === toReportId) {
    return NextResponse.json(
      { error: "Two distinct reports are required to calculate a progress card." },
      { status: 400 }
    );
  }

  const supabaseAdmin = createAdminClient();

  // Fetch both reports and verify candidate ownership
  const { data: reports, error: reportsErr } = await supabaseAdmin
    .from("ai_reports")
    .select("*")
    .in("id", [fromReportId, toReportId])
    .eq("user_id", userId);

  if (reportsErr || !reports || reports.length < 2) {
    return NextResponse.json(
      { error: "One or both selected reports were not found in your account." },
      { status: 404 }
    );
  }

  const reportA = reports.find((r) => r.id === fromReportId) as unknown as AICoachStoredReport;
  const reportB = reports.find((r) => r.id === toReportId) as unknown as AICoachStoredReport;

  // Chronologically order older vs newer
  const [olderReport, newerReport] =
    new Date(reportA.created_at).getTime() <= new Date(reportB.created_at).getTime()
      ? [reportA, reportB]
      : [reportB, reportA];

  // Compute card data deterministically
  const calculation = calculateProgressCardData({
    olderReport,
    newerReport,
    displayName,
    studentNote,
    milestoneBadge,
  });

  if (!calculation.eligible || !calculation.cardData) {
    return NextResponse.json(
      { error: calculation.reason || "Progress card could not be created from these reports." },
      { status: 400 }
    );
  }

  const cardId = generateShortCardId();
  const cardData = calculation.cardData;

  const { data: inserted, error: insertErr } = await supabaseAdmin
    .from("progress_cards")
    .insert({
      id: cardId,
      user_id: userId,
      subject: cardData.subject,
      from_report_id: olderReport.id,
      to_report_id: newerReport.id,
      card_json: cardData as any,
      display_name: cardData.displayName,
      is_public: Boolean(isPublic), // Default false unless user explicitly shares
    })
    .select("*")
    .single();

  if (insertErr || !inserted) {
    return NextResponse.json(
      { error: "Failed to persist progress card to database.", details: insertErr?.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    card: inserted as ProgressCardRecord,
  });
}

/**
 * PATCH /api/progress-cards/* handler (Update sharing status, display name, or note)
 */
export async function handleProgressCardsPatch(
  req: NextRequest,
  action?: string
): Promise<NextResponse> {
  const supabase = createClient();
  let authUser = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    authUser = user;
  } catch {}

  if (!authUser?.id) {
    return NextResponse.json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, { status: 401 });
  }

  const parts = action?.split("/").filter(Boolean) || [];
  const cardId = parts[0] || req.nextUrl.searchParams.get("id");
  if (!cardId) {
    return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const supabaseAdmin = createAdminClient();

  const updates: any = {};
  if (typeof body.is_public === "boolean") {
    updates.is_public = body.is_public;
  }
  if (typeof body.display_name === "string" || body.display_name === null) {
    updates.display_name = body.display_name ? body.display_name.trim().slice(0, 30) : null;
  }
  if (typeof body.student_note === "string" || body.student_note === null) {
    updates.student_note = filterStudentNote(body.student_note);
  }

  const { data: updated, error } = await supabaseAdmin
    .from("progress_cards")
    .update(updates)
    .eq("id", cardId)
    .eq("user_id", authUser.id)
    .select("*")
    .maybeSingle();

  if (error || !updated) {
    return NextResponse.json({ error: "Card not found or update unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ success: true, card: updated });
}

/**
 * DELETE /api/progress-cards/* handler (Delete card; link returns 404 thereafter)
 */
export async function handleProgressCardsDelete(
  req: NextRequest,
  action?: string
): Promise<NextResponse> {
  const supabase = createClient();
  let authUser = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    authUser = user;
  } catch {}

  if (!authUser?.id) {
    return NextResponse.json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, { status: 401 });
  }

  const parts = action?.split("/").filter(Boolean) || [];
  const cardId = parts[0] || req.nextUrl.searchParams.get("id");
  if (!cardId) {
    return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
  }

  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin
    .from("progress_cards")
    .delete()
    .eq("id", cardId)
    .eq("user_id", authUser.id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete progress card" }, { status: 500 });
  }

  return NextResponse.json({ success: true, deleted: true, id: cardId });
}
