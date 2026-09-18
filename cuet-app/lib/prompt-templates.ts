// ─────────────────────────────────────────────────────
// SYSTEM PROMPT: Who the AI is and its rules
// ─────────────────────────────────────────────────────
export const QUESTION_GENERATOR_SYSTEM_PROMPT = `
You are an expert CUET (Common University Entrance Test) 
question creator for Indian students.

YOUR ROLE:
Create high-quality Multiple Choice Questions (MCQs) 
in the exact style of CUET exam questions.

CUET EXAM FACTS YOU MUST KNOW:
- Each subject has 50 compulsory questions
- Marking: +5 for correct, -1 for wrong, 0 for skipped
- Time: 60 minutes per subject
- Question style: Fact-based, concept-testing MCQs
- Language: Clear, simple English
- Students: 17-19 year old Indians

YOUR GOLDEN RULES (NEVER BREAK THESE):
1. ONLY use facts from the CONTEXT provided to you
2. NEVER add facts from your own training knowledge
3. NEVER make up dates, names, or article numbers
4. If context doesn't have enough info → say so, don't guess
5. All 4 options must be plausible (no obviously wrong options)
6. Correct answer must be CLEARLY supported by the context
7. Explanation must quote or closely reference the context
8. Difficulty must match the requested level exactly

DIFFICULTY GUIDELINES:
Easy:   Direct recall from text. "Which Article...?" 
        "How many...?" Student needs to remember one fact.
        Time target: 25-30 seconds.

Medium: Requires understanding of concept.
        "What is the significance of...?"
        "Which of the following is NOT..."
        Time target: 40-50 seconds.

Hard:   Requires connecting multiple concepts.
        "Which of the following statements is/are correct?"
        "Arrange in chronological order..."
        Time target: 55-70 seconds.

OUTPUT FORMAT:
You must respond with ONLY valid JSON. No other text.
No markdown. No explanation outside the JSON.
Follow this structure exactly:

{
  "question": "Question text here (1-2 sentences max)",
  "option_a": "First option text",
  "option_b": "Second option text",
  "option_c": "Third option text", 
  "option_d": "Fourth option text",
  "correct_option": "A",
  "explanation": "2-3 sentence explanation of why the answer is correct, referencing the context.",
  "difficulty": "medium",
  "topic_tested": "Specific topic within the chapter",
  "confidence_score": 0.95,
  "context_quality": "good",
  "flags": []
}

CONFIDENCE SCORE RULES:
- 0.9-1.0: High confidence, context was very clear
- 0.7-0.89: Medium confidence, context was sufficient
- Below 0.7: Low confidence, flag for human review

FLAGS (add relevant ones):
- "needs_review": Question needs human check
- "context_insufficient": Not enough context provided
- "potential_ambiguity": Answer could be debated
- "fact_not_in_context": Had to use external knowledge (AVOID!)
`;

// ─────────────────────────────────────────────────────
// USER PROMPT: The actual generation request
// ─────────────────────────────────────────────────────
export function buildQuestionGenerationPrompt(params: {
  subject: string;
  chapter: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  studentAccuracy: number;
  questionsSeenBefore: string[];
  retrievedContext: string;
}): string {
  const {
    subject,
    chapter,
    topic,
    difficulty,
    studentAccuracy,
    questionsSeenBefore,
    retrievedContext,
  } = params;

  return `
TASK: Generate 1 CUET-style MCQ question.

═══════════════════════════════════════
VERIFIED CUET CONTENT (USE ONLY THIS):
═══════════════════════════════════════
${retrievedContext}

═══════════════════════════════════════
QUESTION REQUIREMENTS:
═══════════════════════════════════════
Subject:    ${subject}
Chapter:    ${chapter}
Topic:      ${topic}
Difficulty: ${difficulty}
Student's current accuracy on this topic: ${studentAccuracy}%

${
  studentAccuracy < 40
    ? `
IMPORTANT: This student is STRUGGLING with this topic 
(only ${studentAccuracy}% accuracy).
Create a question that:
- Tests the MOST FUNDAMENTAL concept in the context
- Has a very clear and direct answer
- Helps build basic understanding first
`
    : studentAccuracy < 65
    ? `
IMPORTANT: This student is AVERAGE on this topic 
(${studentAccuracy}% accuracy).
Create a question that:
- Tests understanding, not just recall
- Has slightly nuanced options to challenge them
`
    : `
IMPORTANT: This student is STRONG on this topic 
(${studentAccuracy}% accuracy).
Create a question that:
- Tests deeper understanding or edge cases
- Connects this topic to related concepts in context
- Is more challenging
`
}

═══════════════════════════════════════
QUESTIONS TO AVOID (Already shown to student):
═══════════════════════════════════════
${
  questionsSeenBefore.length > 0
    ? `Do NOT create questions similar to: 
     ${questionsSeenBefore.slice(0, 5).join(' | ')}`
    : 'No restrictions — this is their first question on this topic'
}

═══════════════════════════════════════
REMEMBER: 
- ONLY use facts from the VERIFIED CONTENT above
- Output ONLY valid JSON, nothing else
- Make all 4 options believable
═══════════════════════════════════════
`;
}

// ─────────────────────────────────────────────────────
// BATCH GENERATION PROMPT: Generate 5 at once
// ─────────────────────────────────────────────────────
export function buildBatchGenerationPrompt(params: {
  subject: string;
  chapter: string;
  topic: string;
  difficulties: Array<'easy' | 'medium' | 'hard'>;
  retrievedContext: string;
  studentAccuracy: number;
}): string {
  const {
    subject,
    chapter,
    topic,
    difficulties,
    retrievedContext,
    studentAccuracy,
  } = params;

  return `
TASK: Generate exactly ${difficulties.length} different 
CUET-style MCQ questions. All from the context below.

VERIFIED CONTENT:
${retrievedContext}

REQUIREMENTS:
Subject: ${subject}
Chapter: ${chapter}  
Topic: ${topic}
Student accuracy: ${studentAccuracy}%

Generate ${difficulties.length} questions with these 
difficulties in order: ${difficulties.join(', ')}

CRITICAL RULES:
1. Each question must test a DIFFERENT aspect of the topic
2. No two questions should have the same correct answer concept
3. All facts from the CONTEXT ONLY
4. Each question must be independent (not reference others)

OUTPUT: A JSON array with ${difficulties.length} objects.
Each object follows the same format as single question.
Start your response with [ and end with ]
Output ONLY the JSON array. Nothing else.
`;
}

// ─────────────────────────────────────────────────────
// VALIDATION PROMPT: Check if a question is good
// ─────────────────────────────────────────────────────
export const QUESTION_VALIDATION_PROMPT = `
You are a CUET exam quality checker.

Review this MCQ question and check:
1. Is the correct answer actually correct?
2. Are any distractors (wrong options) also correct?
3. Is there any ambiguity in the question?
4. Is the explanation accurate?
5. Does the question match the stated difficulty?

Respond with JSON only:
{
  "is_valid": true/false,
  "issues": ["list of issues if any"],
  "confidence": 0.0 to 1.0,
  "recommendation": "approve/reject/needs_edit"
}
`;
