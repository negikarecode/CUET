export interface ParsedPromptResult {
  hasPassage: boolean;
  passageText: string;
  questionStem: string;
  passageTitle?: string;
}

export function parsePassageFromPrompt(rawPrompt: string): ParsedPromptResult {
  if (!rawPrompt) {
    return { hasPassage: false, passageText: "", questionStem: "" };
  }

  const trimmed = rawPrompt.trim();

  // Common patterns for passage-based questions in CUET banks
  const passageIntroRegex =
    /^(Read the following (?:passage|case study|case|excerpt)(?: carefully)?(?: and answer the (?:given )?questions?(?: that follow)?)?[\.\:\n\r]+)/i;

  const match = trimmed.match(passageIntroRegex);

  if (match) {
    const afterIntro = trimmed.slice(match[0].length).trim();

    // Look for paragraph separation where the question begins
    const paragraphs = afterIntro.split(/\n\s*\n/);

    if (paragraphs.length >= 2) {
      // The last paragraph is usually the specific question stem
      const questionStem = (paragraphs[paragraphs.length - 1] ?? "").trim();
      const passageText = paragraphs.slice(0, paragraphs.length - 1).join("\n\n").trim();

      return {
        hasPassage: true,
        passageText,
        questionStem,
        passageTitle: match[0].replace(/[\.\:\n\r]+$/, "").trim(),
      };
    }
  }

  return {
    hasPassage: false,
    passageText: "",
    questionStem: trimmed,
  };
}
