import dotenv from "dotenv";
import path from "path";
import http from "http";
import { NextRequest } from "next/server";

// ─── LOAD PRODUCTION ENVIRONMENT ─────────────────────────────────────────────
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

import { MistakeDiagnosticResult } from "../lib/ai/gemini-diagnostics";

const PORT = 3098;
const BASE_URL = `http://127.0.0.1:${PORT}`;

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, title: string, detail?: string) {
  totalAssertions += 1;
  if (condition) {
    passedAssertions += 1;
    console.log(`  [PASS] ${title}`);
  } else {
    failedAssertions += 1;
    console.error(`  [FAIL] ${title}`);
    if (detail) {
      console.error(`     Detail: ${detail}`);
    }
  }
}

// ─── SAMPLE CUET MOCK TELEMETRY ──────────────────────────────────────────────
const cuetSampleTelemetry = {
  questionId: `cuet_acc_live_test_${Date.now()}`,
  selectedOption: "B",
  questionText: "In the absence of a partnership deed, what is the rate of interest allowed on a partner's loan to the firm?",
  selectedOptionText: "10% per annum",
  correctOption: "A",
  correctOptionText: "6% per annum (simple interest)",
  explanation: "According to Section 13(d) of the Indian Partnership Act, 1932, partners are entitled to 6% p.a. simple interest on loans in the absence of an agreement.",
  microTopic: "Partnership Fundamentals - Loan Interest",
  timeSpentSeconds: 16,
};

async function createTestServer(): Promise<http.Server> {
  const { POST } = await import("../app/api/ai/diagnose-mistake/route");
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      if (req.method === "POST" && req.url === "/api/ai/diagnose-mistake") {
        let rawBody = "";
        req.on("data", (chunk) => {
          rawBody += chunk;
        });
        req.on("end", async () => {
          try {
            const nextReq = new NextRequest(`http://${req.headers.host}${req.url}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: rawBody,
            });
            const nextRes = await POST(nextReq);
            const resBody = await nextRes.text();

            res.writeHead(nextRes.status, {
              "Content-Type": "application/json",
              "X-Cache": nextRes.headers.get("X-Cache") || "MISS",
              "X-Tokens-Used": nextRes.headers.get("X-Tokens-Used") || "0",
            });
            res.end(resBody);
          } catch (err: unknown) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    server.listen(PORT, () => {
      resolve(server);
    });
  });
}

async function runLiveVerification() {
  console.log("================================================================================");
  console.log("CUET AI DIAGNOSTIC ENGINE: PRODUCTION GEMINI 2.0 FLASH LIVE VERIFICATION");
  console.log("================================================================================\n");

  const apiKey = process.env.GEMINI_API_KEY;
  console.log(`Gemini API Key configured: ${apiKey ? `[Configured: ${apiKey.slice(0, 8)}...${apiKey.slice(-4)}]` : "[MISSING]"}`);
  assert(Boolean(apiKey && !apiKey.includes("placeholder")), "API Key is valid and non-placeholder");

  console.log(`Starting local test HTTP harness on port ${PORT}...`);
  const server = await createTestServer();
  console.log(`Harness listening at ${BASE_URL}\n`);

  try {
    // ──────────────────────────────────────────────────────────────────────────
    // TEST 1: LIVE DIAGNOSTIC CALL (CACHE MISS / GEMINI API INVOCATION)
    // ──────────────────────────────────────────────────────────────────────────
    console.log("────────────────────────────────────────────────────────────────────────────────");
    console.log("STEP 1: Live Diagnostic Call with Sample CUET Mock Telemetry");
    console.log("   Topic: Accountancy / Partnership Fundamentals (Loan Interest Trap)");
    console.log("────────────────────────────────────────────────────────────────────────────────");

    const t1Start = Date.now();
    const res1 = await fetch(`${BASE_URL}/api/ai/diagnose-mistake`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuetSampleTelemetry),
    });
    const t1Duration = Date.now() - t1Start;

    assert(res1.status === 200, "Request 1 returns HTTP status 200", `Got status ${res1.status}`);

    const body1 = (await res1.json()) as MistakeDiagnosticResult;
    console.log(`    Request 1 latency: ${t1Duration}ms | X-Cache: ${res1.headers.get("X-Cache")} | Tokens: ${res1.headers.get("X-Tokens-Used")}`);
    console.log(`   Diagnosis: "${body1.diagnosisMessage?.slice(0, 90)}..."`);
    console.log(`   Classification: [${body1.errorClassification}] | NCERT: "${body1.ncertCorrection?.slice(0, 70)}..."`);

    assert(
      ["Conceptual Gap", "Trap Option", "Time Pressure Panic"].includes(body1.errorClassification),
      "Request 1 enforces valid errorClassification enum ('Conceptual Gap' | 'Trap Option' | 'Time Pressure Panic')",
      `Got ${body1.errorClassification}`
    );
    assert(
      typeof body1.diagnosisMessage === "string" && body1.diagnosisMessage.length > 10,
      "Request 1 produces non-empty diagnosisMessage string adhering to TypeScript interface"
    );
    assert(
      typeof body1.ncertCorrection === "string" && body1.ncertCorrection.length > 10,
      "Request 1 produces strict ncertCorrection string adhering to TypeScript interface"
    );
    assert(
      body1.fromCache === false,
      "Request 1 correctly identifies as fresh call (fromCache: false)"
    );
    assert(
      body1.tokensUsed > 0,
      `Request 1 confirms Gemini API call consumed tokens (actual: ${body1.tokensUsed} tokens)`
    );
    assert(
      typeof body1.cacheKey === "string" && body1.cacheKey.length === 64,
      "Request 1 generates valid 64-character SHA-256 cacheKey"
    );

    // ──────────────────────────────────────────────────────────────────────────
    // TEST 2: VERIFY ZERO-TOKEN CACHING FLOW (PUBLIC.AI_DIAGNOSIS_CACHE)
    // ──────────────────────────────────────────────────────────────────────────
    console.log("\n────────────────────────────────────────────────────────────────────────────────");
    console.log("STEP 2: Verify Caching Flow (Identical Request 2)");
    console.log("   Confirm Request 2 fetches from ai_diagnosis_cache with 0 token latency");
    console.log("────────────────────────────────────────────────────────────────────────────────");

    const t2Start = Date.now();
    const res2 = await fetch(`${BASE_URL}/api/ai/diagnose-mistake`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuetSampleTelemetry),
    });
    const t2Duration = Date.now() - t2Start;

    assert(res2.status === 200, "Request 2 returns HTTP status 200", `Got status ${res2.status}`);
    assert(
      t2Duration <= 2000,
      `Request 2 returns within 2 seconds benchmark (actual: ${t2Duration}ms <= 2000ms)`
    );

    const body2 = (await res2.json()) as MistakeDiagnosticResult;
    console.log(`    Request 2 latency: ${t2Duration}ms | X-Cache: ${res2.headers.get("X-Cache")} | Tokens: ${res2.headers.get("X-Tokens-Used")}`);

    assert(
      body2.fromCache === true,
      "Request 2 confirms cache hit (fromCache: true) from public.ai_diagnosis_cache / L1"
    );
    assert(
      body2.tokensUsed === 0,
      "Request 2 consumes exactly 0 tokens (tokensUsed: 0)"
    );
    assert(
      body2.cacheKey === body1.cacheKey,
      "Request 2 matches identical cacheKey as Request 1"
    );
    assert(
      body2.diagnosisMessage === body1.diagnosisMessage,
      "Request 2 returns identical deterministic diagnosisMessage"
    );
    assert(
      body2.ncertCorrection === body1.ncertCorrection,
      "Request 2 returns identical ncertCorrection"
    );

    // ──────────────────────────────────────────────────────────────────────────
    // TEST 3: MALFORMED INPUT RESILIENCE
    // ──────────────────────────────────────────────────────────────────────────
    console.log("\n────────────────────────────────────────────────────────────────────────────────");
    console.log("STEP 3: Malformed Input & Error Resilience");
    console.log("────────────────────────────────────────────────────────────────────────────────");

    const resMalformed = await fetch(`${BASE_URL}/api/ai/diagnose-mistake`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invalid: true }),
    });

    assert(
      resMalformed.status === 400,
      "API route returns 400 on malformed input without crashing"
    );

    console.log("\n================================================================================");
    console.log(`AI VERIFICATION SUMMARY: ${passedAssertions}/${totalAssertions} Passed`);
    console.log("================================================================================");

    if (failedAssertions > 0) {
      console.error(`Verification finished with ${failedAssertions} failures.`);
      process.exit(1);
    } else {
      console.log("ALL TESTS PASSED: Gemini production integration verified successfully!\n");
      process.exit(0);
    }
  } finally {
    server.close();
  }
}

runLiveVerification().catch((err) => {
  console.error("Fatal error during live verification:", err);
  process.exit(1);
});
