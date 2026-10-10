/**
 * Daily Study Plan Engine
 * Builds a concrete daily study schedule based on user's available time,
 * top weak topics, spaced repetition items due, and calibration progress.
 * Note: No exam countdown built here, but structured to support future daysToExam.
 */

export interface DailyStudyTask {
  id: string;
  durationMinutes: number;
  taskType: "concept_review" | "repair_drill" | "spaced_review" | "mixed_practice";
  title: string;
  topic: string;
  subject: string;
  description: string;
  actionUrl: string;
  actionLabel: string;
  completed?: boolean;
}

export interface DailyStudyPlan {
  totalMinutes: number;
  date: string;
  tasks: DailyStudyTask[];
  calibrationProgressPct: number;
  spacedRepetitionDueCount: number;
}

export function generateDailyStudyPlan(params: {
  availableMinutes?: number;
  topWeakTopics: Array<{ chapter: string; subject: string; accuracy: number }>;
  spacedDueCount: number;
  calibrationProgressPct: number;
  daysToExam?: number; // Optional placeholder for future extension
}): DailyStudyPlan {
  const totalMinutes = params.availableMinutes || 40;
  const { topWeakTopics, spacedDueCount, calibrationProgressPct } = params;

  const tasks: DailyStudyTask[] = [];
  let remainingMinutes = totalMinutes;

  // Task 1: Spaced Repetition of Missed Questions (if due)
  if (spacedDueCount > 0 && remainingMinutes >= 10) {
    const time = Math.min(15, Math.max(8, spacedDueCount * 2));
    tasks.push({
      id: "task_spaced",
      durationMinutes: time,
      taskType: "spaced_review",
      title: "Spaced Repetition Review",
      topic: `${spacedDueCount} Missed Questions Due`,
      subject: "All Domains",
      description: `Revisit ${spacedDueCount} previously missed questions scheduled for review today. Correct answers advance retention interval.`,
      actionUrl: "#spaced-repetition",
      actionLabel: "Review Due Questions",
    });
    remainingMinutes -= time;
  }

  // Task 2: Core Concept Review on Highest Priority Weak Topic
  const primaryWeak = topWeakTopics[0] || { chapter: "General Domain Foundations", subject: "Domain", accuracy: 20 };
  if (remainingMinutes >= 10) {
    const conceptTime = Math.min(12, Math.round(remainingMinutes * 0.35));
    tasks.push({
      id: "task_concept",
      durationMinutes: conceptTime,
      taskType: "concept_review",
      title: "Concept & Formula Review",
      topic: primaryWeak.chapter,
      subject: primaryWeak.subject,
      description: `Review NCERT definitions, core distinctions, and common qualifying traps for ${primaryWeak.chapter}.`,
      actionUrl: `/dashboard/radar?subject=${primaryWeak.subject.toLowerCase()}`,
      actionLabel: "View Concept Guide",
    });
    remainingMinutes -= conceptTime;
  }

  // Task 3: Targeted 5-Question Repair Drill
  if (remainingMinutes >= 10) {
    const drillTime = Math.min(15, Math.round(remainingMinutes * 0.5));
    tasks.push({
      id: "task_drill",
      durationMinutes: drillTime,
      taskType: "repair_drill",
      title: "Targeted Repair Drill",
      topic: primaryWeak.chapter,
      subject: primaryWeak.subject,
      description: `Solve 5 adaptive questions targeting your recorded error pattern in ${primaryWeak.chapter}. Aim for ≥80% accuracy.`,
      actionUrl: `/dashboard/mocks?subject=${primaryWeak.subject.toLowerCase()}&drill=true`,
      actionLabel: "Start 5-Q Drill",
    });
    remainingMinutes -= drillTime;
  }

  // Task 4: Mixed Domain Practice / Calibration Window
  if (remainingMinutes >= 8) {
    tasks.push({
      id: "task_practice",
      durationMinutes: remainingMinutes,
      taskType: "mixed_practice",
      title: "Domain CBT Practice",
      topic: "Timed Mock Practice",
      subject: primaryWeak.subject,
      description: `Complete timed practice questions to advance your 150-question cycle calibration (${calibrationProgressPct}% complete).`,
      actionUrl: "/dashboard/mocks",
      actionLabel: "Take CBT Mock",
    });
  }

  return {
    totalMinutes,
    date: new Date().toISOString(),
    tasks,
    calibrationProgressPct,
    spacedRepetitionDueCount: spacedDueCount,
  };
}
