/**
 * Progress Card Type Definitions & Schemas
 */

export interface ProgressCardHighlight {
  title: string;
  detail: string;
}

export interface ProgressCardFrozenData {
  subject: string;
  fromReportId: string;
  toReportId: string;
  fromDate: string;
  toDate: string;
  fromAccuracy: number;
  toAccuracy: number;
  accuracyDelta: number;         // toAccuracy - fromAccuracy
  showAccuracyGain: boolean;     // False if accuracy dropped, never show negative card
  fromNetScore: number;
  toNetScore: number;
  netScoreDelta: number;
  negativeMarksReduction: number;// Positive if penalties decreased
  highlights: ProgressCardHighlight[]; // Max 3 highlights
  milestoneBadge?: string | null;
  studentNote?: string | null;
  displayName?: string | null;
  totalQuestionsAnalyzed: number;
  examTarget: string;            // "CUET UG 2027"
}

export interface ProgressCardRecord {
  id: string;                    // Short random public ID e.g. "c_8f2a9b"
  user_id: string;
  subject: string;
  from_report_id: string | null;
  to_report_id: string | null;
  card_json: ProgressCardFrozenData;
  display_name: string | null;
  is_public: boolean;
  created_at: string;
}

export interface CreateProgressCardInput {
  fromReportId: string;
  toReportId: string;
  displayName?: string;
  studentNote?: string;
  milestoneBadge?: string;
  isPublic?: boolean;
}

export interface ProgressCardCalculationResult {
  eligible: boolean;
  reason?: string;
  cardData?: ProgressCardFrozenData;
}
