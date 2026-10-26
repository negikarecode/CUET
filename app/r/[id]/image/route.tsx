import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProgressCardFrozenData } from "@/lib/progress-cards/types";

export const runtime = "edge";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const cardId = params.id;
  const isOg =
    req.nextUrl.searchParams.get("og") === "1" ||
    req.nextUrl.searchParams.get("size") === "og";

  const width = isOg ? 1200 : 1080;
  const height = isOg ? 630 : 1080;

  // Fetch card from Supabase
  const supabaseAdmin = createAdminClient();
  const { data: cardRow, error } = await supabaseAdmin
    .from("progress_cards")
    .select("*")
    .eq("id", cardId)
    .eq("is_public", true)
    .maybeSingle();

  if (error || !cardRow) {
    return new Response("Progress card not found or made private.", {
      status: 404,
    });
  }

  const cardData = cardRow.card_json as ProgressCardFrozenData;

  // Safeguard: Do not generate images for cards failing accuracy safeguards
  if (cardData.fromAccuracy < 15 || cardData.toAccuracy < 15) {
    return new Response("Progress card does not meet calibration safeguards.", {
      status: 404,
    });
  }
  const displayName = cardRow.display_name || cardData.displayName || "CUET Aspirant";
  const accuracyDelta = cardData.accuracyDelta;
  const showGain = cardData.showAccuracyGain;
  const highlights = (cardData.highlights || []).slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: isOg ? "48px 64px" : "64px",
          background: "linear-gradient(135deg, #050814 0%, #0f172a 50%, #1e1b4b 100%)",
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: "#ffffff",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Glow ambient background circles */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Logo Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "24px",
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(79, 70, 229, 0.4)",
              }}
            >
              C
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.5px" }}>
                CUETMate
              </span>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>
                AI Learning Coach
              </span>
            </div>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {cardData.milestoneBadge && (
              <div
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  background: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  color: "#fbbf24",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                ★ {cardData.milestoneBadge}
              </div>
            )}
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                background: "rgba(99, 102, 241, 0.2)",
                border: "1px solid rgba(99, 102, 241, 0.4)",
                color: "#c7d2fe",
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.5px",
              }}
            >
              CUET UG 2027
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            margin: isOg ? "20px 0" : "40px 0",
          }}
        >
          <div
            style={{
              fontSize: isOg ? "16px" : "18px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#818cf8",
              marginBottom: "8px",
            }}
          >
            {cardData.subject} PROGRESS REPORT
          </div>

          <div
            style={{
              fontSize: isOg ? "20px" : "24px",
              color: "#cbd5e1",
              fontWeight: 600,
              marginBottom: isOg ? "12px" : "20px",
            }}
          >
            {displayName}
          </div>

          {/* Accuracy Transition Big Display */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isOg ? "20px" : "28px",
            }}
          >
            <div
              style={{
                fontSize: isOg ? "64px" : "88px",
                fontWeight: 900,
                color: "#94a3b8",
                letterSpacing: "-2px",
              }}
            >
              {cardData.fromAccuracy}%
            </div>

            <div
              style={{
                fontSize: isOg ? "44px" : "60px",
                fontWeight: 900,
                color: "#6366f1",
              }}
            >
              →
            </div>

            <div
              style={{
                fontSize: isOg ? "64px" : "88px",
                fontWeight: 900,
                color: "#34d399",
                letterSpacing: "-2px",
                textShadow: "0 0 40px rgba(52, 211, 153, 0.35)",
              }}
            >
              {cardData.toAccuracy}%
            </div>
          </div>

          {/* Gain badge */}
          {showGain && (
            <div
              style={{
                marginTop: isOg ? "10px" : "16px",
                padding: "8px 24px",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #059669 0%, #10b981 100%)",
                color: "#ffffff",
                fontSize: isOg ? "18px" : "22px",
                fontWeight: 900,
                boxShadow: "0 4px 20px rgba(16, 185, 129, 0.35)",
              }}
            >
              +{accuracyDelta} Points Gain
            </div>
          )}
        </div>

        {/* HIGHLIGHTS SECTION */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isOg ? "10px" : "14px",
            width: "100%",
          }}
        >
          {highlights.map((h, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: isOg ? "14px 24px" : "20px 28px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#10b981",
                  }}
                />
                <span
                  style={{
                    fontSize: isOg ? "16px" : "20px",
                    fontWeight: 700,
                    color: "#f1f5f9",
                  }}
                >
                  {h.title}
                </span>
              </div>
              <span
                style={{
                  fontSize: isOg ? "16px" : "20px",
                  fontWeight: 800,
                  color: "#a5b4fc",
                }}
              >
                {h.detail}
              </span>
            </div>
          ))}

          {/* Student Note if present */}
          {cardData.studentNote && (
            <div
              style={{
                padding: isOg ? "10px 20px" : "14px 24px",
                borderRadius: "16px",
                background: "rgba(99, 102, 241, 0.12)",
                border: "1px dashed rgba(99, 102, 241, 0.35)",
                color: "#e0e7ff",
                fontSize: isOg ? "14px" : "16px",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              &ldquo;{cardData.studentNote}&rdquo;
            </div>
          )}
        </div>

        {/* BOTTOM BRAND FOOTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingTop: isOg ? "16px" : "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span style={{ fontSize: isOg ? "13px" : "16px", color: "#94a3b8", fontWeight: 500 }}>
            Based on {cardData.totalQuestionsAnalyzed} unique questions
          </span>
          <span
            style={{
              fontSize: isOg ? "14px" : "18px",
              color: "#a5b4fc",
              fontWeight: 800,
              letterSpacing: "0.5px",
            }}
          >
            cuetmate.com/r/{cardId}
          </span>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}
