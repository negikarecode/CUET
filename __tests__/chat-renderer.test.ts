import React from "react";
import ReactDOMServer from "react-dom/server";
import ChatMessageRenderer from "../components/chat/ChatMessageRenderer";

const problematicMessage = `### Performance Summary
Here is your diagnosis:
* Accuracy: **65%** across 40 attempts
* Weak topic: **Electrostatics** (5 attempts)

Check [CUET Resources](https://example.com/cuet) for more practice.
<script>alert("hacked")</script>
`;

async function testRenderer() {
  console.log("=== Testing ChatMessageRenderer ===");
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(ChatMessageRenderer, { content: problematicMessage })
  );

  console.log("Rendered HTML:\n", html);

  // Assertions:
  // 1. Heading ### should not be raw text, but rendered as small bold line (div)
  if (html.includes("###")) {
    throw new Error("FAIL: Raw '###' found in rendered output!");
  }
  if (!html.includes("Performance Summary") || !html.includes("font-bold text-xs")) {
    throw new Error("FAIL: Heading was not mapped to small bold line!");
  }

  // 2. Bullets: should be ul/li with tight spacing, not stray "*"
  if (html.includes("<ul") && html.includes("<li")) {
    console.log("✔ Lists rendered as <ul><li>");
  } else {
    throw new Error("FAIL: Bullets not rendered as list elements!");
  }

  // 3. Bold: should be inline strong tag
  if (html.includes("<strong") && html.includes("65%") && html.includes("Electrostatics")) {
    console.log("✔ Bold rendered as inline <strong>");
  } else {
    throw new Error("FAIL: Bold not rendered properly!");
  }

  // 4. Link: should have target="_blank" and rel="noopener noreferrer"
  if (html.includes('target="_blank"') && html.includes('rel="noopener noreferrer"')) {
    console.log("✔ Links open in new tab with rel='noopener noreferrer'");
  } else {
    throw new Error("FAIL: Link attributes target or rel missing!");
  }

  // 5. Raw HTML: <script> should be sanitized away
  if (html.includes("<script") || html.includes("alert(")) {
    throw new Error("FAIL: Raw script was not sanitized!");
  } else {
    console.log("✔ Raw HTML sanitized away safely");
  }

  console.log("ALL RENDERER TESTS PASSED SUCCESSFULLY!");
}

testRenderer().catch((e) => {
  console.error(e);
  process.exit(1);
});
