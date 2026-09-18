// ─────────────────────────────────────────────────────
// AI enhances the algorithm-built plan
// Adds personalization, daily tips, task descriptions
// ─────────────────────────────────────────────────────

export function buildPlanGenerationPrompt(params: {
  studentName: string;
  daysToExam: number;
  examDate: string;
  dailyHours: number;
  totalTopics: number;
  criticalTopics: string[];
  weakTopics: string[];
  strongTopics: string[];
  untestedTopics: string[];
  selectedSubjects: string[];
  totalStudyHoursAvailable: number;
  isFeasible: boolean;
  feasibilityNote: string;
  missedSessionsLately: boolean;
  avgMockScore: number;
}): string {
  
  const {
    studentName, daysToExam, examDate, dailyHours,
    criticalTopics, weakTopics, strongTopics,
    untestedTopics, selectedSubjects,
    isFeasible, feasibilityNote,
    missedSessionsLately, avgMockScore
  } = params;
  
  return `
You are an expert CUET exam coach creating a personalized study plan for ${studentName}.

STUDENT SITUATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Exam Date: ${examDate}
Days Remaining: ${daysToExam} days
Daily Study Time: ${dailyHours} hours/day
Subjects: ${selectedSubjects.join(', ')}
Average Mock Test Score: ${avgMockScore}/200
Recently Missing Sessions: ${missedSessionsLately ? 'Yes ⚠️' : 'No ✅'}

WEAKNESS ANALYSIS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 CRITICAL (must fix): ${criticalTopics.join(', ') || 'None'}
🟠 WEAK (needs work): ${weakTopics.slice(0, 5).join(', ') || 'None'}
🟢 STRONG (maintain): ${strongTopics.slice(0, 3).join(', ') || 'None'}
⬜ UNTESTED (not covered): ${untestedTopics.slice(0, 3).join(', ') || 'None'}

FEASIBILITY: ${isFeasible ? '✅ Plan is achievable' : '⚠️ Tight schedule'}
NOTE: ${feasibilityNote}

YOUR TASK:
Generate a personalized coaching message for this student.
This will appear at the top of their study plan.

The message must include:
1. Honest assessment of their situation (2 sentences)
2. Their biggest strength to build confidence (1 sentence)  
3. Their #1 priority this week (1 sentence)
4. One specific CUET strategy tip for their weak areas
5. Motivational closing line in Hindi or Hinglish

Keep total under 120 words.
Tone: Like a caring, experienced CUET coach.
Not generic — reference their SPECIFIC weak topics.
End with: "— CUETBot 🤖"

Also generate:
- A "Plan Summary" in exactly 3 bullet points
- One "Warning" if exam is very close (< 30 days) OR if they've been missing sessions recently
  
Output as JSON:
{
  "coaching_message": "...",
  "plan_summary": ["bullet 1", "bullet 2", "bullet 3"],
  "warning": "..." or null,
  "plan_title": "Short title for this plan phase"
}
`;
}

// ─────────────────────────────────────────────────────
// Daily motivational message (generated each day)
// ─────────────────────────────────────────────────────
export function buildDailyMotivationPrompt(params: {
  studentName: string;
  dayNumber: number;
  daysToExam: number;
  yesterdayCompletion: number;
  currentStreak: number;
  todayTopics: string[];
  todayDayType: string;
}): string {
  
  const {
    studentName, dayNumber, daysToExam,
    yesterdayCompletion, currentStreak, todayTopics
  } = params;
  
  return `
Generate a SHORT daily motivational message for ${studentName}, a CUET student.

Context:
- Study Day: ${dayNumber}
- Days Until Exam: ${daysToExam}
- Yesterday's completion: ${yesterdayCompletion}%
- Current Study Streak: ${currentStreak} days
- Today's Topics: ${todayTopics.join(', ')}

Rules:
- Max 2 sentences
- Reference their streak or yesterday's performance
- Include today's main topic naturally
- Half in English, half in Hindi/Hinglish
- End with a small emoji

Examples of good messages:
"Kal aapne ${yesterdayCompletion}% complete kiya — great effort! Aaj ${todayTopics[0] || 'study'} ke saath uss momentum ko continue karo! 💪"
"${currentStreak} din ki streak — amazing! Aaj bas target finish karo aur aap track pe rahoge. 🔥"

Output ONLY the message text. No JSON. No quotes.
`;
}
