export type SubjectType = 'Physics' | 'Chemistry' | 'Maths' | 'English';

export interface SubjectPerformance {
  subject: string;
  score: number;
  percentile: number;
  color: string;
  averageScore?: number;
  topperScore?: number;
  accuracy?: number;
  timeSpentMinutes?: number;
  iconName?: string;
}

export interface UpcomingTest {
  id: string;
  title: string;
  subtitle: string;
  dateTime: string;
  status: 'Ready' | 'Scheduled' | 'Completed';
  category?: string;
  questions?: number;
  durationHours?: number;
}

export interface StatMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  sparklineData: number[];
  icon: 'calendar' | 'star' | 'chart' | 'book';
  secondaryText?: string;
}

export interface ScoreTrendDataPoint {
  date: string;
  fullDate: string;
  Physics: number;
  Chemistry: number;
  Maths: number;
  English: number;
  overallAverage?: number;
}

export interface MonthlySmoothDataPoint {
  month: string;
  monthShort: string;
  score: number;
  Physics: number;
  Chemistry: number;
  Maths: number;
  English: number;
  percentile?: number;
  testsCount?: number;
}

export interface DetailedAnalysisPoint {
  subject: string;
  yourScore: number;
  averageScore: number;
  topperScore: number;
  yourAccuracy?: number;
  averageAccuracy?: number;
  topperAccuracy?: number;
  yourTime?: number;
  averageTime?: number;
  topperTime?: number;
}

export interface StrengthWeaknessItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'strength' | 'improvement' | 'warning' | 'critical';
  badgeColor: string;
}

export interface CalendarDayItem {
  id: string;
  dayShort: string;
  dayNumber: number;
  dateStr: string;
  isCurrentMonth: boolean;
  isActive: boolean;
  activityTitle: string;
  activityType: 'practice' | 'pyq' | 'mock' | 'revision' | 'affairs' | 'rest';
  badgeColor: string;
  badgeTextColor: string;
  badgeBgColor: string;
}
