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

/**
 * Feeds the latest AI Coach report's leaks into Today's Plan's weak-topic bucket.
 * Strictly filters out topics with insufficient data (< 5 attempts).
 */
export function feedReportLeaksIntoWeakTopics(
  report: {
    report_json?: { biggest_leaks?: Array<{ topic?: string; issue?: string; evidence?: string }> };
    stats_json?: { insufficient_data_topics?: Array<{ topic?: string }> };
    subject?: string;
  } | null | undefined,
  existingWeakTopics: Array<{ chapter: string; subject: string; accuracy: number }> = []
): Array<{ chapter: string; subject: string; accuracy: number }> {
  if (!report?.report_json?.biggest_leaks || !Array.isArray(report.report_json.biggest_leaks)) {
    return existingWeakTopics;
  }
  const reportSubject = report.subject || "Domain";
  const leakTopics: Array<{ chapter: string; subject: string; accuracy: number }> = [];

  const insufficientNames = new Set<string>();
  if (Array.isArray(report.stats_json?.insufficient_data_topics)) {
    report.stats_json.insufficient_data_topics.forEach((it) => {
      if (it?.topic) insufficientNames.add(it.topic.trim().toLowerCase());
    });
  }

  report.report_json.biggest_leaks.forEach((leak) => {
    let topicName = leak.topic?.trim();
    if (!topicName && leak.issue) {
      const match = leak.issue.match(/(?:gap in|topic|in)\s+([A-Za-z0-9\s]+)/i);
      topicName = match ? match[1]?.trim() : leak.issue;
    }
    if (
      topicName &&
      !insufficientNames.has(topicName.toLowerCase()) &&
      !leakTopics.some((t) => t.chapter.toLowerCase() === topicName!.toLowerCase())
    ) {
      leakTopics.push({
        chapter: topicName,
        subject: reportSubject,
        accuracy: 30, // Diagnosed critical leak accuracy
      });
    }
  });

  const combined = [...leakTopics];
  for (const existing of existingWeakTopics) {
    if (
      !insufficientNames.has(existing.chapter.toLowerCase()) &&
      !combined.some((c) => c.chapter.toLowerCase() === existing.chapter.toLowerCase())
    ) {
      combined.push(existing);
    }
  }
  return combined;
}

export function generateDailyStudyPlan(params: {
  availableMinutes?: number;
  topWeakTopics: Array<{ chapter: string; subject: string; accuracy: number }>;
  spacedDueCount: number;
  calibrationProgressPct: number;
  latestReport?: any;
  daysToExam?: number; // Optional placeholder for future extension
}): DailyStudyPlan {
  const totalMinutes = params.availableMinutes || 40;
  const { spacedDueCount, calibrationProgressPct, latestReport } = params;
  const topWeakTopics = feedReportLeaksIntoWeakTopics(latestReport, params.topWeakTopics);

  const tasks: DailyStudyTask[] = [];
  let remainingMinutes = totalMinutes;

  // Target task distribution:
  // - 65% weak-topic practice
  // - 25% revision (spaced repetition)
  // - 10% new topics / mixed CBT calibration
  const targetWeakPracticeMinutes = Math.round(totalMinutes * 0.65);
  const targetRevisionMinutes = Math.round(totalMinutes * 0.25);
  const targetMixedMinutes = Math.max(5, totalMinutes - targetWeakPracticeMinutes - targetRevisionMinutes);

  // 1. Revision Bucket (25% target): Spaced Repetition of Missed Questions
  let actualRevisionMinutes = 0;
  if (spacedDueCount > 0 && remainingMinutes >= 8) {
    actualRevisionMinutes = Math.min(targetRevisionMinutes, Math.max(8, spacedDueCount * 2));
    tasks.push({
      id: "task_spaced",
      durationMinutes: actualRevisionMinutes,
      taskType: "spaced_review",
      title: "Spaced Repetition Review",
      topic: `${spacedDueCount} Missed Questions Due`,
      subject: "All Domains",
      description: `Revisit ${spacedDueCount} previously missed questions scheduled for review today. Correct answers advance retention interval.`,
      actionUrl: "#spaced-repetition",
      actionLabel: "Review Due Questions",
    });
    remainingMinutes -= actualRevisionMinutes;
  }

  // 2. Weak-Topic Practice Bucket (65% target + unused revision time):
  // Core Concept Review + Targeted 10-Question Repair Drill
  const primaryWeak = topWeakTopics[0] || {
    chapter: "General Domain Foundations",
    subject: "Domain",
    accuracy: 20,
  };

  const weakBudget = remainingMinutes > targetMixedMinutes ? remainingMinutes - targetMixedMinutes : remainingMinutes;
  const conceptMinutes = Math.max(5, Math.round(weakBudget * 0.4));
  const drillMinutes = Math.max(8, weakBudget - conceptMinutes);

  if (remainingMinutes >= conceptMinutes) {
    tasks.push({
      id: "task_concept",
      durationMinutes: conceptMinutes,
      taskType: "concept_review",
      title: "Concept & Formula Review",
      topic: primaryWeak.chapter,
      subject: primaryWeak.subject,
      description: `Review NCERT definitions, core distinctions, and common qualifying traps for ${primaryWeak.chapter}.`,
      actionUrl: `/dashboard/ai-coach?subject=${primaryWeak.subject.toLowerCase()}`,
      actionLabel: "View Concept Guide",
    });
    remainingMinutes -= conceptMinutes;
  }

  if (remainingMinutes >= drillMinutes) {
    tasks.push({
      id: "task_drill",
      durationMinutes: drillMinutes,
      taskType: "repair_drill",
      title: "Targeted 10-Question Repair Drill",
      topic: primaryWeak.chapter,
      subject: primaryWeak.subject,
      description: `Solve 10 adaptive questions targeting your recorded error pattern in ${primaryWeak.chapter}. Aim for ≥80% accuracy.`,
      actionUrl: `/dashboard/mocks?subject=${primaryWeak.subject.toLowerCase()}&drill=true`,
      actionLabel: "Start 10-Question Fix",
    });
    remainingMinutes -= drillMinutes;
  }

  // 3. New Topics / Mixed Domain Practice Bucket (10% target):
  if (remainingMinutes >= 5) {
    tasks.push({
      id: "task_practice",
      durationMinutes: remainingMinutes,
      taskType: "mixed_practice",
      title: "Domain CBT Practice",
      topic: "Timed Mock Practice",
      subject: primaryWeak.subject,
      description: `Complete authentic practice questions to advance your 150-question cycle calibration (${calibrationProgressPct}% complete).`,
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
