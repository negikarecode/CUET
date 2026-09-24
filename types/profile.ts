import { StreamOption } from "@/types/database";
import { CollegeBenchmarkResult } from "@/lib/college-benchmarks";

export interface StudentProfileData {
  id: string;
  fullName: string;
  email: string;
  targetStream: StreamOption;
  targetUniversity: string;
  targetCollege: string;
  xp: number;
  campusCoins: number;
  currentStreak: number;
  isPremium: boolean;
  subscriptionTier: string;
  subscriptionExpiresAt: string | null;
  selectedSubjects: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DiagnosticReadiness {
  totalAttempts: number;
  correctAttempts: number;
  accuracyPercentage: number;
  calibrationThreshold: number; // 150
  calibrationProgress: number; // min(100, (totalAttempts / 150) * 100)
  isAiMentorUnlocked: boolean; // totalAttempts >= 150
  predictedPercentile: number;
  collegeCutoff: CollegeBenchmarkResult;
}

export interface WeakMicroTopicItem {
  microTopic: string;
  chapter: string;
  subject: string;
  accuracyPercentage: number;
  fatalTimeSinks: number;
  totalAttempts: number;
  avgTimeSeconds: number;
}

export interface ProfileTrophyItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  coinReward: number;
  isUnlocked: boolean;
  unlockedAt: string | null;
  criteria: string;
  progressPercentage: number;
}

export interface ProfileInitialData {
  profile: StudentProfileData;
  diagnostic: DiagnosticReadiness;
  weakTopics: WeakMicroTopicItem[];
  trophies: ProfileTrophyItem[];
}
