import { PerformanceMetrics } from './types';
import { ScorePrediction } from './types';

export function buildAnalysisPrompt(params: {
  studentName: string;
  testNumber: number;
  metrics: PerformanceMetrics;
  prediction: ScorePrediction;
  daysToExam: number;
  subjectNames: Record<number, string>;
  chapterNames: Record<number, string>;
  topicNames: Record<number, string>;
}): string {
  const {
    studentName,
    testNumber,
    metrics,
    prediction,
    daysToExam,
    subjectNames,
    chapterNames,
    topicNames,
  } = params;

  // Build human-readable subject breakdown
  const subjectSummary = metrics.subject_breakdown
    .sort((a, b) => b.percentage - a.percentage)
    .map(
      (s) =>
        `${subjectNames[s.subject_id] || s.subject_name || s.subject_id}: ` +
        `${s.correct}/${s.total_questions} correct (${s.accuracy}%), ` +
        `Score: ${s.raw_score}/${s.max_score}`
    )
    .join('\n');

  // Weakest topics (for improvement suggestions)
  const weakTopics = metrics.topic_breakdown
    .filter((t) => t.accuracy < 55 && t.total_questions >= 2)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5)
    .map(
      (t) => `${topicNames[t.topic_id] || t.topic_name || t.topic_id}: ${t.accuracy}% accuracy`
    )
    .join('\n');

  // Strongest topics (for confidence building)
  const strongTopics = metrics.topic_breakdown
    .filter((t) => t.accuracy >= 75)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 3)
    .map(
      (t) => `${topicNames[t.topic_id] || t.topic_name || t.topic_id}: ${t.accuracy}% accuracy`
    )
    .join('\n');

  // Time analysis
  const timeStatus =
    metrics.avg_time_per_question > 50
      ? 'TOO SLOW (target: 40 sec/question)'
      : metrics.avg_time_per_question < 25
      ? 'POSSIBLY RUSHING (some guessing?)'
      : 'GOOD PACE';

  const mistakesSummary = `
  Careless mistakes: ${metrics.mistake_patterns.careless_mistakes}
  Conceptual gaps: ${metrics.mistake_patterns.conceptual_gaps} topics
  Time pressure mistakes: ${metrics.mistake_patterns.time_pressure_mistakes}
  Repeated mistakes (same as prev mocks): ${metrics.mistake_patterns.repeated_mistakes}
  Lucky guesses: ${metrics.mistake_patterns.lucky_guesses}
  `.trim();

  return `
You are a senior CUET exam coach analyzing a student's mock test results.
Generate a personalized, data-backed performance report.

══════════════════════════════════════════
STUDENT & TEST INFO:
══════════════════════════════════════════
Student Name: ${studentName}
Mock Test Number: #${testNumber}
Days Until CUET Exam: ${daysToExam}
Score Trend: ${prediction.trend}

══════════════════════════════════════════
TEST PERFORMANCE:
══════════════════════════════════════════
CUET Score: ${metrics.raw_score}/${metrics.max_possible_score}
Percentage: ${metrics.percentage}%
Accuracy: ${metrics.accuracy_rate}% (of attempted questions)
Attempt Rate: ${metrics.attempt_rate}% (${metrics.attempted}/${metrics.total_questions} attempted)
Correct: ${metrics.correct} | Wrong: ${metrics.wrong} | Skipped: ${metrics.skipped}

Marks calculation:
(${metrics.correct} × +5) + (${metrics.wrong} × -1) = ${metrics.raw_score}

══════════════════════════════════════════
SUBJECT-WISE RESULTS:
══════════════════════════════════════════
${subjectSummary}

══════════════════════════════════════════
TOPIC ANALYSIS:
══════════════════════════════════════════
WEAK TOPICS (need urgent attention):
${weakTopics || 'No specific critical weak topics identified'}

STRONG TOPICS (doing well):
${strongTopics || 'Not enough data yet'}

══════════════════════════════════════════
TIME MANAGEMENT:
══════════════════════════════════════════
Average time per question: ${metrics.avg_time_per_question} sec
Status: ${timeStatus}
Avg time on correct answers: ${metrics.avg_time_correct} sec
Avg time on wrong answers: ${metrics.avg_time_wrong} sec
Time wasted on wrong answers: ${Math.round(metrics.time_wasted_seconds / 60)} minutes

══════════════════════════════════════════
MISTAKE PATTERNS:
══════════════════════════════════════════
${mistakesSummary}

══════════════════════════════════════════
SCORE PREDICTION:
══════════════════════════════════════════
Predicted CUET Score: ${prediction.predicted_min}-${prediction.predicted_max}
Confidence: ${prediction.confidence}
Score vs last mock: ${prediction.score_vs_last > 0 ? '+' : ''}${prediction.score_vs_last}
Best score ever: ${prediction.best_ever}
Average (last 5): ${prediction.avg_last_5}

══════════════════════════════════════════
YOUR TASK - Generate report in JSON format:
══════════════════════════════════════════

{
  "coaching_message": "Personalized 3-4 sentence message for ${studentName}. Caring, honest, encouraging senior mentor tone. Reference their SPECIFIC score, specific weak topics, and days to exam. Naturally blend English and Hinglish. Be honest about leaks without discouraging them. Max 80 words.",
  "strengths": [
    "Specific strength 1 with numbers",
    "Specific strength 2",
    "Specific strength 3"
  ],
  "improvements": [
    "Specific improvement 1 with topic name and concrete tip",
    "Specific improvement 2",
    "Specific improvement 3"
  ],
  "action_plan": [
    {
      "priority": 1,
      "action": "Specific action to take TODAY",
      "time_minutes": 45,
      "topic_or_subject": "Topic name",
      "why": "One sentence rationale",
      "link_label": "Start AI Practice"
    },
    {
      "priority": 2,
      "action": "Action for tomorrow morning",
      "time_minutes": 30,
      "topic_or_subject": "Topic name",
      "why": "One sentence rationale",
      "link_label": "Open CUETBot"
    },
    {
      "priority": 3,
      "action": "Action for next 48 hours",
      "time_minutes": 40,
      "topic_or_subject": "Topic name",
      "why": "One sentence rationale",
      "link_label": "Start Practice"
    }
  ],
  "exam_strategy": "2-3 sentences of concrete CUET exam strategy based on THIS student's numbers.",
  "time_strategy": "1-2 sentences about their specific time management issue.",
  "mistake_insight": "1-2 sentences about their biggest mistake pattern and marks lost.",
  "motivational_quote": "One short motivational quote in Hindi or Hinglish tailored to their trajectory. End with: — CUETBot",
  "next_mock_goal": "One specific measurable target for next mock test (e.g. Target: ${Math.min(200, metrics.raw_score + 15)} marks by fixing X + Y)."
}

IMPORTANT: Output ONLY valid JSON, nothing else.
`;
}
