let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  FAIL: ${testName}`);
    if (detail) console.error(`    Detail: ${detail}`);
  }
}

// Ignore CSS imports in Node test runner
if (typeof require !== "undefined") {
  require.extensions[".css"] = () => ({});
}

// Fallback mock env variables for server component imports
process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-anon-key";
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "mock-service-role-key";

console.log("\n============================================================");
console.log("SMOKE TESTS: Route Modules & Static Generators (Task 5)");
console.log("============================================================\n");

async function runRouteSmokeTests() {
  try {
    // 1. Landing Page Metadata
    const rootLayout = await import("../app/layout");
    assert(typeof rootLayout.metadata === "object", "RootLayout metadata exported correctly");
    assert(typeof rootLayout.default === "function", "RootLayout component exported correctly");

    // 2. Mocks Page & Stream Configs
    const mocksPage = await import("../app/dashboard/mocks/page");
    assert(typeof mocksPage.default === "function", "app/dashboard/mocks/page exports default component");

    // 3. Practice Page
    const practicePage = await import("../app/dashboard/practice/page");
    assert(typeof practicePage.default === "function", "app/dashboard/practice/page exports default component");

    // 4. PYQ Page
    const pyqPage = await import("../app/dashboard/pyqs/page");
    assert(typeof pyqPage.default === "function", "app/dashboard/pyqs/page exports default component");

    // 5. Standing Page
    const standingPage = await import("../app/dashboard/standing/page");
    assert(typeof standingPage.default === "function", "app/dashboard/standing/page exports default component");

    // 6. Notes Page & Metadata
    const notesPage = await import("../app/dashboard/notes/page");
    assert(typeof notesPage.metadata === "object", "app/dashboard/notes/page exports valid metadata");
    assert(typeof notesPage.default === "function", "app/dashboard/notes/page exports default component");

    // 7. Radar Page
    const radarPage = await import("../app/dashboard/radar/page");
    assert(typeof radarPage.default === "function", "app/dashboard/radar/page exports default component");

    // 8. Dashboard Page
    const dashboardPage = await import("../app/dashboard/page");
    assert(typeof dashboardPage.default === "function", "app/dashboard/page exports default component");

    // 9. Profile Page
    const profilePage = await import("../app/dashboard/profile/page");
    assert(typeof profilePage.default === "function", "app/dashboard/profile/page exports default component");

  } catch (err: any) {
    failed++;
    console.error(`  FAIL: Unexpected exception loading route modules: ${err.message}`, err);
  }

  console.log("\n============================================================");
  console.log(`SMOKE SUMMARY: ${passed} passed, ${failed} failed`);
  console.log("============================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runRouteSmokeTests();
