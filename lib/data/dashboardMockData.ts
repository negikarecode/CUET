import { 
  SubjectPerformance, 
  UpcomingTest, 
  StatMetric, 
  ScoreTrendDataPoint, 
  MonthlySmoothDataPoint,
  DetailedAnalysisPoint,
  StrengthWeaknessItem,
  CalendarDayItem
} from '@/types/dashboard';
export type { MonthlySmoothDataPoint } from '@/types/dashboard';

export const USER_PROFILE = {
  name: "Sarah Chen",
  roleSubtitle: "Student, CUET 2025",
  targetExam: "CUET UG 2025",
  targetCollege: "SRCC, Delhi University",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  notificationCount: 3,
};

export const BANNER_INFO = {
  greeting: "Good Morning, Sarah! 👋",
  subtitle: "Stay consistent. Every mock test brings you closer to your dream university.",
  quote: "“Discipline today creates options tomorrow.”",
  quoteAuthor: "Daily Preparation Mantra",
  examCountdownDays: 38,
};

export const TOP_METRICS: StatMetric[] = [
  {
    id: "tests-attempted",
    title: "Total Tests Attempted",
    value: "18",
    change: "+28%",
    isPositive: true,
    sparklineData: [8, 10, 12, 11, 15, 18],
    icon: "calendar",
    secondaryText: "vs last month",
  },
  {
    id: "average-score",
    title: "Average Score",
    value: "1550 / 2000",
    change: "+12%",
    isPositive: true,
    sparklineData: [1350, 1400, 1420, 1490, 1510, 1550],
    icon: "star",
    secondaryText: "Top 12% cohort",
  },
  {
    id: "overall-percentile",
    title: "Overall Percentile",
    value: "88.5%",
    change: "+6%",
    isPositive: true,
    sparklineData: [75, 78, 80, 83, 85, 88.5],
    icon: "chart",
    secondaryText: "Consistent climb",
  },
  {
    id: "syllabus-completion",
    title: "Syllabus Completion",
    value: "62%",
    change: "+8%",
    isPositive: true,
    sparklineData: [45, 48, 52, 55, 58, 62],
    icon: "book",
    secondaryText: "Completed 14 of 22 Subjects",
  },
];

export const SCORE_TREND_DATA: ScoreTrendDataPoint[] = [
  {
    date: "Apr 28",
    fullDate: "Apr 28, 2025",
    Physics: 1420,
    Chemistry: 1180,
    Maths: 1080,
    English: 1020,
  },
  {
    date: "May 5",
    fullDate: "May 5, 2025",
    Physics: 1510,
    Chemistry: 1260,
    Maths: 1160,
    English: 1100,
  },
  {
    date: "May 12",
    fullDate: "May 12, 2025",
    Physics: 1620,
    Chemistry: 1380,
    Maths: 1250,
    English: 1180,
  },
  {
    date: "May 19",
    fullDate: "May 19, 2025",
    Physics: 1690,
    Chemistry: 1420,
    Maths: 1320,
    English: 1250,
  },
  {
    date: "May 26",
    fullDate: "May 26, 2025",
    Physics: 1750,
    Chemistry: 1480,
    Maths: 1410,
    English: 1340,
  },
];

export const SMOOTH_CHART_12_MONTHS: MonthlySmoothDataPoint[] = [
  { month: "January", monthShort: "Jan", score: 210, Physics: 1420, Chemistry: 1180, Maths: 1080, English: 1020, percentile: 79.2, testsCount: 2 },
  { month: "February", monthShort: "Feb", score: 165, Physics: 1350, Chemistry: 1120, Maths: 990, English: 980, percentile: 71.5, testsCount: 3 },
  { month: "March", monthShort: "Mar", score: 195, Physics: 1480, Chemistry: 1210, Maths: 1100, English: 1060, percentile: 76.8, testsCount: 4 },
  { month: "April", monthShort: "Apr", score: 232, Physics: 1590, Chemistry: 1320, Maths: 1220, English: 1150, percentile: 83.4, testsCount: 4 },
  { month: "May", monthShort: "May", score: 250, Physics: 1750, Chemistry: 1480, Maths: 1410, English: 1340, percentile: 88.5, testsCount: 5 },
  { month: "June", monthShort: "Jun", score: 235, Physics: 1680, Chemistry: 1420, Maths: 1350, English: 1290, percentile: 85.1, testsCount: 4 },
  { month: "July", monthShort: "Jul", score: 210, Physics: 1550, Chemistry: 1310, Maths: 1240, English: 1200, percentile: 79.6, testsCount: 3 },
  { month: "August", monthShort: "Aug", score: 185, Physics: 1440, Chemistry: 1220, Maths: 1140, English: 1100, percentile: 74.3, testsCount: 3 },
  { month: "September", monthShort: "Sep", score: 170, Physics: 1380, Chemistry: 1160, Maths: 1060, English: 1040, percentile: 72.0, testsCount: 2 },
  { month: "October", monthShort: "Oct", score: 180, Physics: 1420, Chemistry: 1200, Maths: 1120, English: 1090, percentile: 74.8, testsCount: 3 },
  { month: "November", monthShort: "Nov", score: 215, Physics: 1580, Chemistry: 1350, Maths: 1280, English: 1240, percentile: 80.9, testsCount: 4 },
  { month: "December", monthShort: "Dec", score: 275, Physics: 1880, Chemistry: 1620, Maths: 1540, English: 1460, percentile: 94.2, testsCount: 5 },
];

export const SUBJECT_PERFORMANCE_LIST: SubjectPerformance[] = [
  {
    subject: "Physics",
    score: 78,
    percentile: 82.3,
    color: "#3B82F6",
    iconName: "Atom",
  },
  {
    subject: "Chemistry",
    score: 65,
    percentile: 76.1,
    color: "#F97316",
    iconName: "FlaskConical",
  },
  {
    subject: "Mathematics",
    score: 72,
    percentile: 89.4,
    color: "#10B981",
    iconName: "Binary",
  },
  {
    subject: "English",
    score: 84,
    percentile: 91.6,
    color: "#8B5CF6",
    iconName: "Languages",
  },
];

export const DETAILED_ANALYSIS_DATA: DetailedAnalysisPoint[] = [
  {
    subject: "Physics",
    yourScore: 1620,
    averageScore: 1320,
    topperScore: 1890,
    yourAccuracy: 84,
    averageAccuracy: 68,
    topperAccuracy: 95,
    yourTime: 42,
    averageTime: 52,
    topperTime: 36,
  },
  {
    subject: "Chemistry",
    yourScore: 1380,
    averageScore: 1280,
    topperScore: 1850,
    yourAccuracy: 65,
    averageAccuracy: 64,
    topperAccuracy: 92,
    yourTime: 48,
    averageTime: 50,
    topperTime: 35,
  },
  {
    subject: "Maths",
    yourScore: 1420,
    averageScore: 1190,
    topperScore: 1940,
    yourAccuracy: 72,
    averageAccuracy: 58,
    topperAccuracy: 96,
    yourTime: 55,
    averageTime: 62,
    topperTime: 40,
  },
  {
    subject: "English",
    yourScore: 1590,
    averageScore: 1360,
    topperScore: 1880,
    yourAccuracy: 88,
    averageAccuracy: 74,
    topperAccuracy: 97,
    yourTime: 38,
    averageTime: 44,
    topperTime: 31,
  },
];

export const STRENGTHS_WEAKNESSES: StrengthWeaknessItem[] = [
  {
    id: "item-1",
    title: "Strong in Modern Physics",
    subtitle: "Scoring 32% higher than average",
    type: "strength",
    badgeColor: "#10B981",
  },
  {
    id: "item-2",
    title: "Good improvement in English",
    subtitle: "+18% in last 5 tests",
    type: "improvement",
    badgeColor: "#10B981",
  },
  {
    id: "item-3",
    title: "Need to focus on Organic Chemistry",
    subtitle: "Scoring 12% below average",
    type: "warning",
    badgeColor: "#F59E0B",
  },
  {
    id: "item-4",
    title: "Work on Calculus topics",
    subtitle: "Only 48% accuracy",
    type: "critical",
    badgeColor: "#EF4444",
  },
];

export const UPCOMING_TESTS: UpcomingTest[] = [
  {
    id: "test-01",
    title: "CUET Full Mock Test - 05",
    subtitle: "Full Syllabus • 200 Questions • 3 Hours",
    dateTime: "May 28, 2025 - 10:00 AM",
    status: "Ready",
    questions: 200,
    durationHours: 3,
  },
  {
    id: "test-02",
    title: "Physics Subject Test",
    subtitle: "Domain Subject • 50 Questions • 1 Hour",
    dateTime: "May 30, 2025 - 02:00 PM",
    status: "Scheduled",
    questions: 50,
    durationHours: 1,
  },
  {
    id: "test-03",
    title: "Mathematics Speed Drill",
    subtitle: "Calculus & Algebra • 40 Questions • 45 Mins",
    dateTime: "Jun 02, 2025 - 04:30 PM",
    status: "Scheduled",
    questions: 40,
    durationHours: 0.75,
  }
];

export const PREPARATION_CALENDAR_DAYS: CalendarDayItem[] = [
  {
    id: "cal-mon",
    dayShort: "Mon",
    dayNumber: 26,
    dateStr: "May 26",
    isCurrentMonth: true,
    isActive: false,
    activityTitle: "Physics Practice",
    activityType: "practice",
    badgeColor: "#3B82F6",
    badgeBgColor: "#EFF6FF",
    badgeTextColor: "#1D4ED8",
  },
  {
    id: "cal-tue",
    dayShort: "Tue",
    dayNumber: 27,
    dateStr: "May 27",
    isCurrentMonth: true,
    isActive: false,
    activityTitle: "Chemistry PYQs",
    activityType: "pyq",
    badgeColor: "#F97316",
    badgeBgColor: "#FFF7ED",
    badgeTextColor: "#C2410C",
  },
  {
    id: "cal-wed",
    dayShort: "Wed",
    dayNumber: 28,
    dateStr: "May 28",
    isCurrentMonth: true,
    isActive: true, // Wed 28 is active in the spec!
    activityTitle: "Full Mock Test",
    activityType: "mock",
    badgeColor: "#0F172A",
    badgeBgColor: "#0F172A",
    badgeTextColor: "#FFFFFF",
  },
  {
    id: "cal-thu",
    dayShort: "Thu",
    dayNumber: 29,
    dateStr: "May 29",
    isCurrentMonth: true,
    isActive: false,
    activityTitle: "Maths Revision",
    activityType: "revision",
    badgeColor: "#10B981",
    badgeBgColor: "#ECFDF5",
    badgeTextColor: "#047857",
  },
  {
    id: "cal-fri",
    dayShort: "Fri",
    dayNumber: 30,
    dateStr: "May 30",
    isCurrentMonth: true,
    isActive: false,
    activityTitle: "English Mock Test",
    activityType: "mock",
    badgeColor: "#8B5CF6",
    badgeBgColor: "#F5F3FF",
    badgeTextColor: "#6D28D9",
  },
  {
    id: "cal-sat",
    dayShort: "Sat",
    dayNumber: 31,
    dateStr: "May 31",
    isCurrentMonth: true,
    isActive: false,
    activityTitle: "Current Affairs",
    activityType: "affairs",
    badgeColor: "#06B6D4",
    badgeBgColor: "#ECFEFF",
    badgeTextColor: "#0E7490",
  },
  {
    id: "cal-sun",
    dayShort: "Sun",
    dayNumber: 1,
    dateStr: "Jun 1",
    isCurrentMonth: false,
    isActive: false,
    activityTitle: "Rest Day",
    activityType: "rest",
    badgeColor: "#94A3B8",
    badgeBgColor: "#F1F5F9",
    badgeTextColor: "#475569",
  },
];

export interface TopicMasteryBar {
  id: string;
  topic: string;
  shortLabel: string;
  score: number;
  highlight?: boolean;
}

export const TOPIC_MASTERY_BARS: TopicMasteryBar[] = [
  { id: "t1", topic: "Mechanics", shortLabel: "Mec", score: 38 },
  { id: "t2", topic: "Optics", shortLabel: "Opt", score: 55 },
  { id: "t3", topic: "Thermodynamics", shortLabel: "Thm", score: 68 },
  { id: "t4", topic: "Electromagnetism", shortLabel: "Elec", score: 82 },
  { id: "t5", topic: "Organic Chem", shortLabel: "Org", score: 50 },
  { id: "t6", topic: "Modern Physics", shortLabel: "Mod", score: 96, highlight: true },
  { id: "t7", topic: "Physical Chem", shortLabel: "Phy", score: 64 },
  { id: "t8", topic: "Calculus", shortLabel: "Calc", score: 72 },
  { id: "t9", topic: "Algebra", shortLabel: "Alg", score: 84 },
  { id: "t10", topic: "Reading Comp", shortLabel: "Eng", score: 90 },
];

