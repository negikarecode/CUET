import cuetAuthorityData from "@/data/cuet.json";

export interface CuetAuthorityMeta {
  lastUpdated: string;
  officialSourceUrl: string;
  ntaMainPortalUrl: string;
  authority: string;
}

export interface CuetExamDates {
  academicSession: string;
  examWindow: string;
  examStartDate: string;
  status: string;
  isAnnounced: boolean;
  officialSourceUrl: string;
  lastUpdated: string;
}

export interface CuetExamPatternSection {
  id: string;
  name: string;
  questions: number;
  duration: string;
  maxMarks: number;
  format: string;
  description: string;
}

export interface CuetExamPattern {
  mode: string;
  totalQuestionsPerDomain: number;
  allCompulsory: boolean;
  internalChoice: string;
  durationMinutes: number;
  markingScheme: {
    correct: string;
    incorrect: string;
    unattempted: string;
    penaltyRatio: string;
    maxMarksPerSubject: number;
  };
  sections: CuetExamPatternSection[];
  officialSourceUrl: string;
  lastUpdated: string;
}

export interface CuetOfficialNotice {
  badge: string;
  headline: string;
  summary: string;
  officialSourceUrl: string;
  lastUpdated: string;
}

export interface CuetEligibility {
  ageLimit: string;
  qualifyingExam: string;
  universityMapping: string;
  officialSourceUrl: string;
  lastUpdated: string;
}

export interface CuetRegistrationStep {
  step: number;
  title: string;
  description: string;
  badge: string;
}

export interface CuetAuthorityDataset {
  meta: CuetAuthorityMeta;
  examDates: CuetExamDates;
  examPattern: CuetExamPattern;
  officialNotice: CuetOfficialNotice;
  eligibility: CuetEligibility;
  registrationSteps: CuetRegistrationStep[];
  contactSupport: {
    platformSupportEmail: string;
    officialNTAHelpdeskEmail: string;
    officialNTAPhone: string;
    officialSourceUrl: string;
    lastUpdated: string;
  };
}

export const CUET_AUTHORITY: CuetAuthorityDataset = cuetAuthorityData as CuetAuthorityDataset;
