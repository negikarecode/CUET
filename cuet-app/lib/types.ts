export type WeaknessLevel = 
  'critical' | 'weak' | 'average' | 'strong' | 'excellent' | 'untested';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  selected_subjects: string[];
  target_college?: string;
  exam_date: string;
  daily_study_hours: number;
  plan_type: 'free' | 'basic' | 'pro' | 'ultimate';
  avatar_url?: string;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  color: string;
  icon: string;
  total_chapters: number;
}

export interface Chapter {
  id: number;
  subject_id: number;
  chapter_number: number;
  chapter_name: string;
  weightage: number;
}

export interface Topic {
  id: number;
  chapter_id: number;
  subject_id: number;
  topic_name: string;
  importance: 'high' | 'medium' | 'low';
  estimated_time: number;
}

export interface Question {
  id: number;
  subject_id: number;
  chapter_id: number;
  topic_id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_type: 'pyq' | 'practice' | 'ai_generated';
  is_verified: boolean;
}

export interface StudentAttempt {
  id: number;
  student_id: string;
  question_id: number;
  subject_id: number;
  chapter_id: number;
  topic_id: number;
  selected_option: 'A' | 'B' | 'C' | 'D' | null;
  is_correct: boolean | null;
  is_skipped: boolean;
  time_taken_seconds: number;
  attempt_source: 'mock_test' | 'practice' | 'pyq' | 'diagnostic' | 'chat_doubt' | 'ai_practice';
  session_id: string;
  attempt_number: number;
  attempted_at: string;
}

export interface WeaknessScore {
  id: number;
  student_id: string;
  topic_id: number;
  subject_id: number;
  chapter_id: number;
  total_attempts: number;
  correct_count: number;
  wrong_count: number;
  skipped_count: number;
  accuracy_score: number;
  speed_score: number;
  consistency_score: number;
  final_weakness_score: number;
  weakness_level: WeaknessLevel;
  avg_time_seconds: number;
  last_attempted: string;
  last_updated: string;
  
  // Joined data
  topic?: Topic;
  subject?: Subject;
  chapter?: Chapter;
}

export interface WeaknessDashboard {
  student: Student;
  overall_score: number;
  overall_level: WeaknessLevel;
  total_topics: number;
  topics_by_level: {
    critical: WeaknessScore[];
    weak: WeaknessScore[];
    average: WeaknessScore[];
    strong: WeaknessScore[];
    excellent: WeaknessScore[];
    untested: Topic[];
  };
  top_3_recommendations: Recommendation[];
  recent_alerts: Alert[];
}

export interface Recommendation {
  topic_id: number;
  topic_name: string;
  subject_name: string;
  weakness_score: number;
  weakness_level: WeaknessLevel;
  questions_ready: number;
  estimated_minutes: number;
  priority: number;
  has_ai_content?: boolean;
}

export interface Alert {
  id: number;
  type: string;
  title: string;
  message: string;
  action_text: string;
  action_url: string;
  is_read: boolean;
  created_at: string;
}

export interface RecordAttemptPayload {
  question_id: number;
  subject_id: number;
  chapter_id: number;
  topic_id: number;
  selected_option: 'A' | 'B' | 'C' | 'D' | null;
  is_correct: boolean;
  is_skipped: boolean;
  time_taken_seconds: number;
  attempt_source: string;
  session_id: string;
}

// ─────────────────────────────────────────────────────
// MODULE 2: AI QUESTION GENERATOR TYPES
// ─────────────────────────────────────────────────────

export interface ContentChunk {
  id: number;
  subject_id: number;
  chapter_id: number;
  topic_id: number;
  content_text: string;
  content_type: 'notes' | 'ncert' | 'pyq_explanation' | 'example' | 'definition';
  source_document?: string;
  page_number?: number;
  chunk_index?: number;
  pinecone_id?: string;
  is_embedded?: boolean;
  created_at?: string;
}

export interface AIGeneratedQuestion {
  id: number;
  subject_id: number;
  chapter_id: number;
  topic_id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  generated_for_student?: string;
  prompt_used?: string;
  model_used?: string;
  content_chunks_used?: string[];
  pinecone_ids_used?: string[];
  generation_tokens?: number;
  generation_cost?: number;
  review_status: 'pending' | 'approved' | 'rejected' | 'auto_approved';
  reviewed_by?: string;
  review_notes?: string;
  reviewed_at?: string;
  questions_table_id?: number;
  auto_approve_score?: number;
  confidence_score?: number;
  flags?: string[];
  created_at?: string;


  // Joined metadata for UI display
  subject?: Subject;
  chapter?: Chapter;
  topic?: Topic;
}

export interface AIUsageTracking {
  id: number;
  student_id: string;
  usage_date: string;
  call_type: string;
  topic_id: number;
  model_used: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  estimated_cost_usd: number;
  was_cached: boolean;
  cache_key: string;
  created_at?: string;
}

// ─────────────────────────────────────────────────────
// MODULE 3: AI DOUBT SOLVER CHATBOT TYPES
// ─────────────────────────────────────────────────────

export type LanguageDetected = 'hindi' | 'hinglish' | 'english' | 'mixed';

export type ChatIntent = 
  | 'concept_doubt'
  | 'formula_doubt'
  | 'pyq_doubt'
  | 'syllabus_query'
  | 'cutoff_query'
  | 'strategy_query'
  | 'frustration'
  | 'smalltalk'
  | 'non_cuet'
  | 'inline_mcq_request'
  | 'general';

export interface ChatSourceChunk {
  chunk_id?: number | string;
  source_document?: string;
  topic_name?: string;
  subject_name?: string;
  chapter_name?: string;
  similarity?: number;
  snippet?: string;
}

export interface InlineMCQ {
  id?: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  topic_id?: number;
  subject_id?: number;
  chapter_id?: number;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  student_id: string;
  role: 'student' | 'cuetbot' | 'system' | 'user' | 'assistant';
  message_text: string;
  language_detected?: LanguageDetected;
  intent_detected?: ChatIntent;
  tokens_used?: number;
  response_time_ms?: number;
  sources_used?: ChatSourceChunk[];
  has_inline_mcq?: boolean;
  inline_mcq_data?: InlineMCQ;
  feedback?: 'helpful' | 'unhelpful' | null;
  feedback_reason?: string;
  detected_topic_id?: number;
  detected_subject_id?: number;
  created_at: string;
}

export interface ChatConversation {
  id: string;
  student_id: string;
  subject_id?: number | null;
  topic_id?: number | null;
  title: string;
  is_archived?: boolean;
  created_at: string;
  updated_at: string;
  last_message?: string;
  messages_count?: number;
}

export interface ChatUsageTracking {
  id: number;
  student_id: string;
  usage_date: string;
  message_count: number;
  tokens_used: number;
  plan_type: 'free' | 'basic' | 'pro' | 'ultimate';
  daily_limit: number;
  remaining?: number;
  is_limit_reached?: boolean;
  reset_time_utc?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DoubtTopicLog {
  id: number;
  student_id: string;
  conversation_id?: string;
  subject_id?: number;
  chapter_id?: number;
  topic_id?: number;
  doubt_query: string;
  language?: string;
  intent?: string;
  detected_keywords?: string[];
  created_at: string;
}

export interface SuggestedQuestionLog {
  id: number;
  student_id: string;
  conversation_id: string;
  question_text: string;
  topic_id?: number;
  was_clicked: boolean;
  created_at: string;
}

// ─────────────────────────────────────────────────────
// MODULE 4: AI STUDY PLANNER TYPES
// ─────────────────────────────────────────────────────

export type PlanStatus = 'active' | 'completed' | 'abandoned' | 'regenerated';
export type DayType = 'study' | 'revision' | 'mock_test' | 'light' | 'rest' | 'exam_day';
export type TaskType = 
  | 'practice'
  | 'ai_practice'
  | 'notes_review'
  | 'mock_test'
  | 'pyq_session'
  | 'revision'
  | 'doubt_solving'
  | 'speed_drill'
  | 'weak_topic_focus'
  | 'break';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'skipped' | 'rescheduled';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export interface StudyPlan {
  id: string;
  student_id: string;
  plan_version: number;
  exam_date: string;
  plan_start_date: string;
  total_days: number;
  study_hours_per_day: number;
  subjects_included: number[];
  status: PlanStatus;
  generated_by: 'ai' | 'manual' | 'hybrid';
  generation_prompt?: string;
  total_tasks: number;
  completed_tasks: number;
  completion_rate: number;
  last_regenerated?: string;
  regeneration_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface StudyPlanDay {
  id: number;
  plan_id: string;
  student_id: string;
  plan_date: string;
  day_number: number;
  day_type: DayType;
  daily_tip?: string;
  daily_quote?: string;
  total_minutes: number;
  completed_minutes: number;
  is_day_complete: boolean;
  completion_percentage: number;
  mood_rating?: number;
  notes?: string;
  created_at: string;
  tasks?: StudyTask[];
}

export interface StudyTask {
  id: number;
  plan_id: string;
  plan_day_id: number;
  student_id: string;
  task_order: number;
  task_type: TaskType;
  subject_id?: number | null;
  chapter_id?: number | null;
  topic_id?: number | null;
  title: string;
  description: string;
  planned_minutes: number;
  actual_minutes: number;
  status: TaskStatus;
  completed_at?: string | null;
  target_questions?: number | null;
  actual_questions?: number;
  target_accuracy?: number | null;
  actual_accuracy?: number | null;
  priority: TaskPriority;
  link_url: string;
  link_label: string;
  original_date?: string | null;
  reschedule_reason?: string | null;
  created_at: string;

  // Joined display properties
  subject?: Subject;
  chapter?: Chapter;
  topic?: Topic;
}

export interface StudyStreak {
  id: number;
  student_id: string;
  current_streak: number;
  longest_streak: number;
  last_study_date: string;
  streak_start_date: string;
  milestones_reached: number[];
  total_study_days: number;
  total_minutes_studied: number;
  updated_at: string;
}

export interface PushSubscriptionData {
  id?: number;
  student_id: string;
  endpoint: string;
  p256dh_key: string;
  auth_key: string;
  study_reminder_time?: string;
  reminder_enabled?: boolean;
  streak_alerts?: boolean;
  plan_updates?: boolean;
  device_type?: string;
  created_at?: string;
}

export interface PlanGenerationLog {
  id: number;
  student_id: string;
  plan_id: string;
  trigger_reason?: string;
  input_snapshot?: any;
  tasks_generated?: number;
  days_generated?: number;
  ai_tokens_used?: number;
  generation_time_ms?: number;
  created_at: string;
}

export interface StreakData {
  current_streak: number;
  longest_streak: number;
  last_study_date: string;
  total_study_days: number;
  milestones_reached: number[];
  next_milestone: number | null;
  days_to_next_milestone: number;
  streak_status: 'on_fire' | 'active' | 'at_risk' | 'broken';
  streak_emoji: string;
  streak_message: string;
}

export interface DayPlan {
  date: string;
  day_number: number;
  day_type: DayType;
  tasks: TaskPlan[];
  total_minutes: number;
  daily_tip: string;
  daily_quote: string;
}

export interface TaskPlan {
  task_order: number;
  task_type: TaskType;
  subject_id: number;
  chapter_id: number;
  topic_id: number | null;
  title: string;
  description: string;
  planned_minutes: number;
  priority: TaskPriority;
  target_questions: number;
  target_accuracy: number;
  link_url: string;
  link_label: string;
}

export interface TopicTimeAllocation {
  topic_id: number;
  topic_name: string;
  subject_id: number;
  subject_name: string;
  chapter_id: number;
  weakness_level: string;
  weakness_score: number;
  priority_score: number;
  total_minutes_needed: number;
  sessions_needed: number;
  minutes_per_session: number;
  importance: 'high' | 'medium' | 'low';
  cuet_weightage: number;
}

// ─────────────────────────────────────────────────────
// MODULE 5: PERFORMANCE ANALYZER TYPES
// ─────────────────────────────────────────────────────

export type TestType = 'full_mock' | 'subject_mock' | 'mini_mock' | 'speed_test' | 'pyq_test';
export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface MockTestSession {
  id: string;
  student_id: string;
  session_name: string;
  test_number: number;
  test_type: TestType;
  subjects_tested: number[];
  started_at: string;
  completed_at: string;
  total_duration_seconds: number;
  total_questions: number;
  attempted_count: number;
  correct_count: number;
  wrong_count: number;
  skipped_count: number;
  raw_score: number;
  max_possible_score: number;
  percentage_score: number;
  analysis_status: AnalysisStatus;
  analysis_id?: string | null;
  rank_estimate?: number | null;
  percentile?: number | null;
  created_at: string;
}

export interface MockTestAnalysis {
  id: string;
  session_id: string;
  student_id: string;
  raw_score: number;
  max_score: number;
  percentage: number;
  accuracy_rate: number;
  attempt_rate: number;
  total_time_seconds: number;
  avg_time_per_question: number;
  avg_time_correct: number;
  avg_time_wrong: number;
  avg_time_skipped?: number;
  fastest_question_seconds: number;
  slowest_question_seconds: number;
  time_wasted_seconds: number;
  subject_breakdown: SubjectMetrics[];
  chapter_breakdown: ChapterMetrics[];
  topic_breakdown: TopicMetrics[];
  difficulty_breakdown: {
    easy: DifficultyMetrics;
    medium: DifficultyMetrics;
    hard: DifficultyMetrics;
  };
  mistake_patterns: MistakePatterns;
  predicted_cuet_score_min: number;
  predicted_cuet_score_max: number;
  predicted_rank_min: number;
  predicted_rank_max: number;
  confidence_level: 'low' | 'medium' | 'high';
  score_vs_last_test: number;
  rank_vs_last_test?: number;
  best_score_ever: number;
  average_score_last_5: number;
  score_trend: 'improving' | 'declining' | 'stable' | 'first_test';
  best_subjects?: any;
  worst_subjects?: any;
  ai_coaching_message: string;
  ai_strengths: string[];
  ai_improvements: string[];
  ai_action_plan: Array<{
    priority: number;
    action: string;
    time_minutes: number;
    topic_or_subject?: string;
    why: string;
    link_label: string;
    link_url: string;
  }>;
  ai_exam_strategy: string;
  ai_motivational_quote: string;
  ai_tokens_used?: number;
  generation_time_ms?: number;
  created_at: string;
}

export interface PerformanceMetrics {
  raw_score: number;
  max_possible_score: number;
  percentage: number;
  accuracy_rate: number;
  attempt_rate: number;
  total_questions: number;
  attempted: number;
  correct: number;
  wrong: number;
  skipped: number;
  total_time_seconds: number;
  avg_time_per_question: number;
  avg_time_correct: number;
  avg_time_wrong: number;
  avg_time_skipped?: number;
  fastest_question_seconds: number;
  slowest_question_seconds: number;
  time_wasted_seconds: number;
  time_per_subject?: Record<number, number>;
  subject_breakdown: SubjectMetrics[];
  chapter_breakdown: ChapterMetrics[];
  topic_breakdown: TopicMetrics[];
  difficulty_breakdown: {
    easy: DifficultyMetrics;
    medium: DifficultyMetrics;
    hard: DifficultyMetrics;
  };
  mistake_patterns: MistakePatterns;
  question_level: QuestionLevelAnalysisRecord[];
}

export interface SubjectMetrics {
  subject_id: number;
  subject_name?: string;
  total_questions: number;
  correct: number;
  wrong: number;
  skipped: number;
  raw_score: number;
  max_score: number;
  percentage: number;
  accuracy: number;
  avg_time_seconds: number;
  strongest_chapter?: string;
  weakest_chapter?: string;
}

export interface ChapterMetrics {
  chapter_id: number;
  chapter_name?: string;
  subject_id: number;
  total_questions: number;
  correct: number;
  wrong: number;
  skipped: number;
  raw_score: number;
  accuracy: number;
  avg_time_seconds: number;
}

export interface TopicMetrics {
  topic_id: number;
  topic_name?: string;
  chapter_id: number;
  subject_id: number;
  total_questions: number;
  correct: number;
  wrong: number;
  accuracy: number;
  avg_time_seconds: number;
  weakness_signal: 'strong' | 'average' | 'weak' | 'critical';
}

export interface DifficultyMetrics {
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracy: number;
  avg_time: number;
}

export interface MistakePatterns {
  careless_mistakes: number;
  careless_question_ids: number[];
  conceptual_gaps: number;
  conceptual_gap_topics: number[];
  time_pressure_mistakes: number;
  time_pressure_question_ids: number[];
  repeated_mistakes: number;
  repeated_mistake_topics: number[];
  lucky_guesses: number;
  lucky_guess_question_ids: number[];
}

export interface QuestionLevelAnalysisRecord {
  id?: number;
  analysis_id: string;
  session_id: string;
  student_id: string;
  question_id: number;
  subject_id: number;
  chapter_id: number;
  topic_id: number;
  question_number: number;
  selected_option?: string | null;
  correct_option?: string | null;
  is_correct: boolean;
  is_skipped: boolean;
  time_taken_seconds: number;
  difficulty: string;
  is_careless_mistake: boolean;
  is_time_pressure_mistake: boolean;
  is_repeated_mistake: boolean;
  is_guessed_correctly: boolean;
  time_rank: number;
  marks_earned: number;
}

export interface ScoreHistoryRecord {
  id?: number;
  student_id: string;
  session_id: string;
  test_number: number;
  test_date: string;
  test_type: string;
  raw_score: number;
  max_score: number;
  percentage: number;
  accuracy: number;
  subject_scores?: Record<number, number>;
  created_at?: string;
}

export interface ScorePrediction {
  predicted_min: number;
  predicted_max: number;
  predicted_rank_min: number;
  predicted_rank_max: number;
  confidence: 'low' | 'medium' | 'high';
  confidence_reason: string;
  trend: 'improving' | 'declining' | 'stable' | 'first_test';
  score_vs_last: number;
  avg_last_5: number;
  best_ever: number;
  all_scores: number[];
  percentile_estimate: number;
}




