export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type StreamOption = "Science" | "Commerce" | "Humanities";

export type QuestionArchetype =
  | "Direct Fact"
  | "Assertion-Reasoning"
  | "Match the Following"
  | "Case-Study MCQ"
  | "Numerical";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          target_stream: StreamOption;
          target_university: string;
          target_college: string;
          xp: number;
          campus_coins: number;
          current_streak: number;
          last_practice_date: string | null;
          is_premium: boolean;
          subscription_tier: string;
          subscription_expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          target_stream: StreamOption;
          target_university?: string;
          target_college?: string;
          xp?: number;
          campus_coins?: number;
          current_streak?: number;
          last_practice_date?: string | null;
          is_premium?: boolean;
          subscription_tier?: string;
          subscription_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          target_stream?: StreamOption;
          target_university?: string;
          target_college?: string;
          xp?: number;
          campus_coins?: number;
          current_streak?: number;
          last_practice_date?: string | null;
          is_premium?: boolean;
          subscription_tier?: string;
          subscription_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      questions: {
        Row: {
          id: string;
          subject: string;
          chapter: string;
          micro_topic: string;
          ncert_reference: string;
          archetype: QuestionArchetype;
          question_text: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_option: "A" | "B" | "C" | "D";
          explanation: string;
          is_pyq: boolean;
          pyq_year: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subject: string;
          chapter: string;
          micro_topic: string;
          ncert_reference: string;
          archetype: QuestionArchetype;
          question_text: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_option: "A" | "B" | "C" | "D";
          explanation: string;
          is_pyq?: boolean;
          pyq_year?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          subject?: string;
          chapter?: string;
          micro_topic?: string;
          ncert_reference?: string;
          archetype?: QuestionArchetype;
          question_text?: string;
          option_a?: string;
          option_b?: string;
          option_c?: string;
          option_d?: string;
          correct_option?: "A" | "B" | "C" | "D";
          explanation?: string;
          is_pyq?: boolean;
          pyq_year?: number | null;
          created_at?: string;
        };
      };
      tests: {
        Row: {
          id: string;
          title: string;
          subject: string;
          total_questions: number;
          duration_minutes: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subject: string;
          total_questions?: number;
          duration_minutes?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subject?: string;
          total_questions?: number;
          duration_minutes?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      test_questions: {
        Row: {
          test_id: string;
          question_id: string;
          order_index: number;
        };
        Insert: {
          test_id: string;
          question_id: string;
          order_index: number;
        };
        Update: {
          test_id?: string;
          question_id?: string;
          order_index?: number;
        };
      };
      user_attempts: {
        Row: {
          id: string;
          user_id: string;
          test_id: string;
          question_id: string;
          selected_option: "A" | "B" | "C" | "D" | null;
          is_correct: boolean | null;
          time_spent_seconds: number;
          is_time_sink: boolean;
          diagnostic_report: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          test_id: string;
          question_id: string;
          selected_option?: "A" | "B" | "C" | "D" | null;
          is_correct?: boolean | null;
          time_spent_seconds?: number;
          diagnostic_report?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          test_id?: string;
          question_id?: string;
          selected_option?: "A" | "B" | "C" | "D" | null;
          is_correct?: boolean | null;
          time_spent_seconds?: number;
          diagnostic_report?: Json | null;
          created_at?: string;
        };
      };
      trophies: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          xp_reward: number;
          created_at: string;
        };
        Insert: {
          id: string;
          title: string;
          description: string;
          icon: string;
          xp_reward?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon?: string;
          xp_reward?: number;
          created_at?: string;
        };
      };
      user_trophies: {
        Row: {
          user_id: string;
          trophy_id: string;
          unlocked_at: string;
        };
        Insert: {
          user_id: string;
          trophy_id: string;
          unlocked_at?: string;
        };
        Update: {
          user_id?: string;
          trophy_id?: string;
          unlocked_at?: string;
        };
      };
    };
    Views: {
      pacing_analytics_summary: {
        Row: {
          user_id: string;
          subject: string;
          chapter: string;
          micro_topic: string;
          archetype: QuestionArchetype;
          total_attempts: number;
          correct_attempts: number;
          avg_time_seconds: number;
          time_sink_count: number;
          fatal_time_sinks: number;
          accuracy_percentage: number;
        };
      };
    };
  };
}
