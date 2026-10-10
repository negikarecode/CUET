import { formatDateIndian } from './config/dashboardConfig';

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  formattedDate: string; // "6 Oct 2026"
  dayOfWeek: number; // 0 = Mon, 1 = Tue, ..., 6 = Sun
  count: number;
  questionCount: number;
  subjectTag?: string;
  tooltipText: string;
  isInRange: boolean;
}

export interface HeatmapMonthLabel {
  name: string;
  columnIndex: number;
}

export interface HeatmapGridResult {
  weeks: (HeatmapDay | null)[][];
  monthLabels: HeatmapMonthLabel[];
  totalMocks: number;
  totalQuestions: number;
}

/**
 * Generates a 90-day activity heatmap grid ending on endDate (inclusive).
 * Columns represent calendar weeks starting Monday.
 * Rows 0..6 represent Monday..Sunday.
 */
export function generate90DayHeatmap(
  endDateInput: Date | string = new Date(),
  attemptData: Array<{
    submittedAt?: string;
    subject?: string;
    attemptedCount?: number;
    score?: number;
  }> = []
): HeatmapGridResult {
  const endDate = typeof endDateInput === 'string' ? new Date(endDateInput) : new Date(endDateInput.getTime());
  // Normalize to midnight UTC/local to avoid time drift
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
  // Start date is 89 days prior (total 90 days)
  const start = new Date(end);
  start.setDate(start.getDate() - 89);

  // Build attempt map keyed by YYYY-MM-DD
  const attemptsByDate: Record<string, { count: number; questionCount: number; subjects: Set<string> }> = {};
  
  attemptData.forEach((att) => {
    if (!att.submittedAt) return;
    const dateKey = att.submittedAt.slice(0, 10);
    if (!attemptsByDate[dateKey]) {
      attemptsByDate[dateKey] = { count: 0, questionCount: 0, subjects: new Set() };
    }
    attemptsByDate[dateKey].count += 1;
    attemptsByDate[dateKey].questionCount += att.attemptedCount || 50;
    if (att.subject) attemptsByDate[dateKey].subjects.add(att.subject);
  });

  // Monday = 0, Sunday = 6
  const getMondayIndex = (d: Date) => (d.getDay() + 6) % 7;

  // Find the Monday of start date's week
  const gridStart = new Date(start);
  gridStart.setDate(gridStart.getDate() - getMondayIndex(gridStart));

  // Find the Sunday of end date's week
  const gridEnd = new Date(end);
  const endMondayIdx = getMondayIndex(gridEnd);
  gridEnd.setDate(gridEnd.getDate() + (6 - endMondayIdx));

  const weeks: (HeatmapDay | null)[][] = [];
  const monthLabels: HeatmapMonthLabel[] = [];
  let currentWeek: (HeatmapDay | null)[] = [];
  let currentMonthName = '';

  const iter = new Date(gridStart);
  let colIndex = 0;
  let totalMocks = 0;
  let totalQuestions = 0;

  while (iter <= gridEnd) {
    const year = iter.getFullYear();
    const month = String(iter.getMonth() + 1).padStart(2, '0');
    const day = String(iter.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    const isInRange = iter >= start && iter <= end;
    const dayOfWeek = getMondayIndex(iter);

    // Track month label on first week it appears
    const monthName = iter.toLocaleDateString('en-IN', { month: 'short' });
    if (iter.getDate() <= 7 && monthName !== currentMonthName && isInRange) {
      currentMonthName = monthName;
      monthLabels.push({ name: monthName, columnIndex: colIndex });
    }

    const match = attemptsByDate[dateKey];
    const count = isInRange && match ? match.count : 0;
    const qCount = isInRange && match ? match.questionCount : 0;
    const subjects = match && match.subjects.size > 0 ? Array.from(match.subjects).join(', ') : undefined;

    if (count > 0) {
      totalMocks += count;
      totalQuestions += qCount;
    }

    const formattedDate = formatDateIndian(dateKey);
    let tooltipText: string;
    if (!isInRange) {
      tooltipText = `${formattedDate}: Outside 90-day window`;
    } else if (count > 0) {
      const mockStr = count === 1 ? '1 mock' : `${count} mocks`;
      const qStr = qCount === 1 ? '1 question' : `${qCount} questions`;
      tooltipText = `${formattedDate}: ${mockStr}, ${qStr}`;
    } else {
      tooltipText = `${formattedDate}: No practice activity`;
    }

    const dayObj: HeatmapDay = {
      date: dateKey,
      formattedDate,
      dayOfWeek,
      count,
      questionCount: qCount,
      subjectTag: subjects,
      tooltipText,
      isInRange,
    };

    currentWeek.push(dayObj);

    if (dayOfWeek === 6) {
      // Completed Sunday
      weeks.push(currentWeek);
      currentWeek = [];
      colIndex++;
    }

    iter.setDate(iter.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return {
    weeks,
    monthLabels,
    totalMocks,
    totalQuestions,
  };
}
