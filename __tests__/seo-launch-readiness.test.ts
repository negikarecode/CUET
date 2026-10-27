import assert from "assert";
import fs from "fs";
import path from "path";
import nextConfig from "../next.config.mjs";
import { SITE_CONFIG, getCanonicalUrl } from "../lib/config/site";
import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { POST as contactPostHandler } from "../app/api/contact/route";
import { NextRequest } from "next/server";

async function runSeoLaunchReadinessTests() {
  console.log("\n============================================================");
  console.log("UNIT TESTS: 20-Point Website Launch Readiness Verification");
  console.log("============================================================\n");

  let passed = 0;

  // 1. Site Config & Domain Normalization
  assert.ok(SITE_CONFIG.url, "SITE_CONFIG.url must be defined");
  assert.strictEqual(SITE_CONFIG.url.endsWith("/"), false, "SITE_CONFIG.url must not end with trailing slash");
  assert.strictEqual(getCanonicalUrl("/pricing"), `${SITE_CONFIG.url}/pricing`);
  assert.strictEqual(getCanonicalUrl("terms"), `${SITE_CONFIG.url}/terms`);
  assert.strictEqual(getCanonicalUrl("/"), `${SITE_CONFIG.url}`);
  console.log("  PASS: Site config and canonical URL normalizer verified");
  passed++;

  // 2. robots.txt Verification
  const robotsConfig = robots();
  assert.ok(robotsConfig.rules, "Robots config must specify rules");
  assert.strictEqual(robotsConfig.sitemap, `${SITE_CONFIG.url}/sitemap.xml`);
  const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules;
  assert.ok(rules.disallow?.includes("/dashboard/"), "Robots must disallow /dashboard/");
  assert.ok(rules.disallow?.includes("/api/"), "Robots must disallow /api/");
  assert.ok(rules.disallow?.includes("/test/"), "Robots must disallow /test/");
  assert.ok(rules.allow?.includes("/pricing"), "Robots must allow /pricing");
  assert.ok(rules.allow?.includes("/contact"), "Robots must allow /contact");
  console.log("  PASS: robots.txt properly secures private routes and exposes canonical pages");
  passed++;

  // 3. XML Sitemap Verification
  const sitemapEntries = sitemap();
  assert.ok(Array.isArray(sitemapEntries), "Sitemap must return an array");
  const sitemapUrls = sitemapEntries.map((e) => e.url);

  // Must include real public canonical pages
  assert.ok(sitemapUrls.includes(`${SITE_CONFIG.url}`), "Sitemap must include root homepage");
  assert.ok(sitemapUrls.includes(`${SITE_CONFIG.url}/pricing`), "Sitemap must include /pricing");
  assert.ok(sitemapUrls.includes(`${SITE_CONFIG.url}/contact`), "Sitemap must include /contact");
  assert.ok(sitemapUrls.includes(`${SITE_CONFIG.url}/privacy`), "Sitemap must include /privacy");
  assert.ok(sitemapUrls.includes(`${SITE_CONFIG.url}/terms`), "Sitemap must include /terms");
  assert.ok(sitemapUrls.includes(`${SITE_CONFIG.url}/refunds`), "Sitemap must include /refunds");

  // Must NOT include private or redirecting dashboard routes
  for (const url of sitemapUrls) {
    assert.strictEqual(url.includes("/dashboard"), false, `Sitemap must not contain private dashboard URL: ${url}`);
    assert.strictEqual(url.includes("/test/"), false, `Sitemap must not contain test simulator URL: ${url}`);
  }
  console.log("  PASS: XML sitemap contains only genuine, canonical public URLs");
  passed++;

  // 4. 301 Redirects Verification in next.config.mjs
  assert.ok(typeof nextConfig.redirects === "function", "nextConfig must define redirects");
  const redirects = await nextConfig.redirects!();
  assert.ok(Array.isArray(redirects), "redirects() must return an array");

  const expectedRedirects: Record<string, string> = {
    "/mocks": "/dashboard/mocks",
    "/tests": "/dashboard/mocks",
    "/pyqs": "/dashboard/pyqs",
    "/practice": "/dashboard/practice",
    "/standing": "/dashboard/standing",
    "/plans": "/pricing",
  };

  for (const [source, destination] of Object.entries(expectedRedirects)) {
    const found = redirects.find((r) => r.source === source);
    assert.ok(found, `Redirect for ${source} must exist`);
    assert.strictEqual(found.destination, destination, `Redirect for ${source} must point to ${destination}`);
    assert.strictEqual(found.permanent, true, `Redirect for ${source} must be permanent (301)`);
  }
  console.log("  PASS: Permanent 301 redirects are properly registered in next.config.mjs");
  passed++;

  // 5. Contact API Handler Verification (Input Validation & Ticket Generation)
  // 5a. Valid submission
  const validReq = new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
    body: JSON.stringify({
      name: "Aspirant Test",
      email: "test.aspirant@cuetprep.com",
      category: "mocks",
      message: "I have a question about the Chemistry full-length mock timer.",
    }),
  });

  const validRes = await contactPostHandler(validReq);
  assert.strictEqual(validRes.status, 200, "Valid contact request must return 200 OK");
  const validBody = await validRes.json();
  assert.strictEqual(validBody.success, true);
  assert.ok(validBody.ticketId?.startsWith("CUET-"), "Ticket ID must have CUET- prefix");
  console.log("  PASS: Contact API registers valid submissions and generates ticket ID");
  passed++;

  // 5b. Invalid email submission
  const invalidEmailReq = new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
    body: JSON.stringify({
      name: "Aspirant Test",
      email: "not-a-valid-email",
      category: "general",
      message: "Please help me with syllabus details.",
    }),
  });
  const invalidEmailRes = await contactPostHandler(invalidEmailReq);
  assert.strictEqual(invalidEmailRes.status, 422, "Invalid email must return 422 Unprocessable Entity");
  console.log("  PASS: Contact API rejects malformed email addresses");
  passed++;

  // 5c. Short message rejection
  const shortMsgReq = new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "127.0.0.1" },
    body: JSON.stringify({
      name: "Aspirant Test",
      email: "valid@cuetprep.com",
      category: "general",
      message: "Hi",
    }),
  });
  const shortMsgRes = await contactPostHandler(shortMsgReq);
  assert.strictEqual(shortMsgRes.status, 422, "Short message (< 10 chars) must return 422");
  console.log("  PASS: Contact API validates message length thresholds");
  passed++;

  // 6. Favicon & Icon Assets Verification
  const appIconSvg = path.join(process.cwd(), "app", "icon.svg");
  const publicFaviconIco = path.join(process.cwd(), "public", "favicon.ico");
  const publicFaviconPng = path.join(process.cwd(), "public", "favicon.png");

  assert.ok(fs.existsSync(appIconSvg), "app/icon.svg must exist");
  assert.ok(fs.existsSync(publicFaviconIco), "public/favicon.ico must exist");
  assert.ok(fs.existsSync(publicFaviconPng), "public/favicon.png must exist");
  console.log("  PASS: Multi-resolution vector and bitmap favicon assets exist");
  passed++;

  // 7. Horizontal Scroll Prevention in globals.css
  const globalsCss = fs.readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf-8");
  assert.ok(!globalsCss.includes("max-width: 100vw"), "globals.css must not use 100vw which causes scrollbar overflow");
  assert.ok(globalsCss.includes("overflow-x: hidden"), "globals.css must include overflow-x: hidden");
  console.log("  PASS: globals.css eliminates horizontal scroll caused by scrollbars");
  passed++;

  // 8. Custom 404 Not Found Page Exists
  const notFoundPath = path.join(process.cwd(), "app", "not-found.tsx");
  assert.ok(fs.existsSync(notFoundPath), "app/not-found.tsx custom 404 page must exist");
  console.log("  PASS: Branded custom 404 page exists");
  passed++;

  console.log(`\n============================================================`);
  console.log(`ALL ${passed} LAUNCH READINESS VERIFICATION TESTS PASSED!`);
  console.log(`============================================================\n`);
}

runSeoLaunchReadinessTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
