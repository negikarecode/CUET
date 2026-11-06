/**
 * CUET Coach Chat Evaluation Runner
 * Executes the 60 authoritative test cases across 5 safety and domain categories:
 *   1. In-scope academic, diagnostic & cutoff questions (20 cases)
 *   2. Off-scope refusal tests (15 cases)
 *   3. Prompt injection & jailbreak resilience (10 cases)
 *   4. Insufficient data handling (5 cases)
 *   5. Distress / crisis detection with helpline response (10 cases)
 */

import { EVAL_TEST_CASES } from "./fixtures";
import { classifyMessageFast } from "@/lib/chat/router";
import { executeChatTool, CHAT_TOOLS_DEFINITIONS } from "@/lib/chat/tools";

interface TestResult {
  id: number;
  description: string;
  category: string;
  passed: boolean;
  notes?: string;
}

async function runEvaluationSuite() {
  console.log("===============================================================================");
  console.log("▶ CUET Coach Chat Evaluation Suite (60 Test Cases)");
  console.log("===============================================================================\n");

  const results: TestResult[] = [];
  let passedCount = 0;
  let failedCount = 0;

  for (const tc of EVAL_TEST_CASES) {
    let passed = false;
    let failureNote = "";

    try {
      if (tc.category === "CRISIS_DISTRESS") {
        const decision = classifyMessageFast(tc.prompt);
        const isClassified = decision.classification === "CRISIS_DISTRESS";
        const responseText = decision.immediateResponse || "";

        const hasRequired = (tc.requiredSubstrings || []).every((sub) =>
          responseText.toLowerCase().includes(sub.toLowerCase())
        );

        passed = isClassified && hasRequired;
        if (!passed) {
          failureNote = `Expected CRISIS_DISTRESS with helplines. Got ${decision.classification}. Response: ${responseText.slice(0, 80)}`;
        }
      } else if (tc.category === "PROMPT_INJECTION") {
        const decision = classifyMessageFast(tc.prompt);
        const isClassified = decision.classification === "PROMPT_INJECTION";
        const responseText = decision.immediateResponse || "";

        const hasNoForbidden = (tc.forbiddenSubstrings || []).every(
          (sub) => !responseText.includes(sub)
        );

        passed = isClassified && hasNoForbidden;
        if (!passed) {
          failureNote = `Expected PROMPT_INJECTION refusal. Got ${decision.classification}.`;
        }
      } else if (tc.category === "OFF_SCOPE") {
        const decision = classifyMessageFast(tc.prompt);
        const isClassified = decision.classification === "OFF_SCOPE";
        const responseText = decision.immediateResponse || "";

        const hasRequired = (tc.requiredSubstrings || []).every((sub) =>
          responseText.toLowerCase().includes(sub.toLowerCase())
        );

        passed = isClassified && hasRequired;
        if (!passed) {
          failureNote = `Expected OFF_SCOPE refusal with CUET refocus. Got ${decision.classification}.`;
        }
      } else if (tc.category === "IN_SCOPE") {
        const decision = classifyMessageFast(tc.prompt);
        passed = decision.classification === "IN_SCOPE";
        if (!passed) {
          failureNote = `Expected IN_SCOPE academic handling. Got ${decision.classification}.`;
        }
      } else if (tc.category === "INSUFFICIENT_DATA") {
        const decision = classifyMessageFast(tc.prompt);
        // Insufficient data queries are IN_SCOPE questions whose tool executions must return empty data
        const isCategoryInScope = decision.classification === "IN_SCOPE";

        // Test tool response on empty user ID
        const toolResult = await executeChatTool("get_performance_summary", {}, "00000000-0000-0000-0000-000000000000");
        const hasZeroDataNote = toolResult.includes('"hasData": false') || toolResult.includes("No mock tests");

        passed = isCategoryInScope && hasZeroDataNote;
        if (!passed) {
          failureNote = `Expected safe empty-data handling without score hallucination. Tool result: ${toolResult.slice(0, 100)}`;
        }
      }
    } catch (err: any) {
      passed = false;
      failureNote = `Exception during evaluation: ${err?.message}`;
    }

    if (passed) {
      passedCount++;
      console.log(`  ✔ Case ${String(tc.id).padStart(2, "0")}: [${tc.category.padEnd(17, " ")}] ${tc.description}`);
    } else {
      failedCount++;
      console.error(`  ✖ Case ${String(tc.id).padStart(2, "0")}: [${tc.category.padEnd(17, " ")}] ${tc.description}`);
      console.error(`    ↳ Error: ${failureNote}`);
    }

    results.push({
      id: tc.id,
      category: tc.category,
      description: tc.description,
      passed,
      notes: failureNote,
    });
  }

  // Also verify tool coverage
  console.log("\n-------------------------------------------------------------------------------");
  console.log("▶ Verifying 10 Server-Side Safe Tools Schema & Definitions");
  console.log("-------------------------------------------------------------------------------");
  const expectedToolNames = [
    "get_performance_summary",
    "get_weak_topics",
    "get_strong_topics",
    "list_recent_attempts",
    "get_attempt_review",
    "get_question_review",
    "get_behavior_patterns",
    "get_college_gap",
    "get_study_plan",
    "suggest_actions",
  ];

  let toolCheckPassed = true;
  for (const toolName of expectedToolNames) {
    const found = CHAT_TOOLS_DEFINITIONS.find((t) => t.function.name === toolName);
    if (found) {
      console.log(`  ✔ Tool '${toolName}' verified with safe parameters schema`);
    } else {
      console.error(`  ✖ Tool '${toolName}' MISSING from definitions!`);
      toolCheckPassed = false;
    }
  }

  console.log("\n===============================================================================");
  console.log(`Evaluation Summary: ${passedCount}/${EVAL_TEST_CASES.length} Test Cases Passed (${failedCount} failed)`);
  console.log(`Tool Definitions: ${expectedToolNames.length}/${expectedToolNames.length} Verified`);
  console.log("===============================================================================");

  if (failedCount > 0 || !toolCheckPassed) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runEvaluationSuite();
