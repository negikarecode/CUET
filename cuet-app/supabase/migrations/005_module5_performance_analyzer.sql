-- ════════════════════════════════════════════════════════════
-- MODULE 5: AI PERFORMANCE ANALYZER DATABASE TABLES
-- Migration: 005_module5_performance_analyzer.sql
-- ════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────
-- TABLE: mock_test_sessions
-- One row per completed mock test
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mock_test_sessions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Test identification
  session_name      VARCHAR(200),
  -- e.g., "Mock Test #8 — Full CUET"
  
  test_number       INTEGER,
  -- Auto-increment per student (Test 1, 2, 3...)
  
  test_type         VARCHAR(30) DEFAULT 'full_mock'
                    CHECK (test_type IN (
                    'full_mock',      -- All subjects, 50Q each
                    'subject_mock',   -- Single subject, 50Q
                    'mini_mock',      -- 25 questions
                    'speed_test',     -- Timed speed drill
                    'pyq_test'        -- Previous year questions
                    )),
  
  subjects_tested   INTEGER[],
  -- Array of subject_ids tested
  
  -- Timing
  started_at        TIMESTAMP WITH TIME ZONE,
  completed_at      TIMESTAMP WITH TIME ZONE,
  total_duration_seconds INTEGER,
  
  -- Raw counts
  total_questions   INTEGER DEFAULT 0,
  attempted_count   INTEGER DEFAULT 0,
  correct_count     INTEGER DEFAULT 0,
  wrong_count       INTEGER DEFAULT 0,
  skipped_count     INTEGER DEFAULT 0,
  
  -- CUET Scoring (+5 correct, -1 wrong, 0 skipped)
  raw_score         INTEGER DEFAULT 0,
  max_possible_score INTEGER DEFAULT 0,
  percentage_score  DECIMAL(5,2) DEFAULT 0,
  
  -- Analysis status
  analysis_status   VARCHAR(20) DEFAULT 'pending'
                    CHECK (analysis_status IN (
                    'pending',      -- Test done, analysis not run
                    'processing',   -- Analysis running
                    'completed',    -- Analysis done
                    'failed'        -- Analysis errored
                    )),
  
  analysis_id       UUID,
  
  -- Comparison data
  rank_estimate     INTEGER,
  percentile        DECIMAL(5,2),
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- TABLE: mock_test_analyses
-- The complete analysis for one mock test
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mock_test_analyses (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id        UUID REFERENCES mock_test_sessions(id) ON DELETE CASCADE,
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- ─── SCORE METRICS ───────────────────────────────
  raw_score         INTEGER,
  max_score         INTEGER,
  percentage        DECIMAL(5,2),
  accuracy_rate     DECIMAL(5,2),
  attempt_rate      DECIMAL(5,2),
  
  -- ─── TIME METRICS ────────────────────────────────
  total_time_seconds      INTEGER,
  avg_time_per_question   DECIMAL(6,2),
  avg_time_correct        DECIMAL(6,2),
  avg_time_wrong          DECIMAL(6,2),
  avg_time_skipped        DECIMAL(6,2),
  fastest_question_seconds INTEGER,
  slowest_question_seconds INTEGER,
  time_wasted_seconds     INTEGER,
  
  -- ─── BREAKDOWNS (JSONB) ──────────────────────────
  subject_breakdown    JSONB,
  chapter_breakdown    JSONB,
  topic_breakdown      JSONB,
  difficulty_breakdown JSONB,
  mistake_patterns     JSONB,
  
  -- ─── PREDICTION ──────────────────────────────────
  predicted_cuet_score_min  INTEGER,
  predicted_cuet_score_max  INTEGER,
  predicted_rank_min        INTEGER,
  predicted_rank_max        INTEGER,
  confidence_level          VARCHAR(10),
  
  -- ─── COMPARISON ──────────────────────────────────
  score_vs_last_test        INTEGER,
  rank_vs_last_test         INTEGER,
  best_score_ever           INTEGER,
  average_score_last_5      INTEGER,
  score_trend               VARCHAR(20),
  
  -- ─── TOP PERFORMERS ──────────────────────────────
  best_subjects             JSONB,
  worst_subjects            JSONB,
  
  -- ─── AI GENERATED CONTENT ────────────────────────
  ai_coaching_message       TEXT,
  ai_strengths              JSONB,
  ai_improvements           JSONB,
  ai_action_plan            JSONB,
  ai_exam_strategy          TEXT,
  ai_motivational_quote     TEXT,
  
  -- ─── GENERATION METADATA ─────────────────────────
  ai_tokens_used            INTEGER,
  generation_time_ms        INTEGER,
  
  created_at                TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- TABLE: question_level_analysis
-- Detailed analysis of each individual question
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS question_level_analysis (
  id                BIGSERIAL PRIMARY KEY,
  analysis_id       UUID REFERENCES mock_test_analyses(id) ON DELETE CASCADE,
  session_id        UUID REFERENCES mock_test_sessions(id) ON DELETE CASCADE,
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  question_id       INTEGER REFERENCES questions(id),
  subject_id        INTEGER REFERENCES subjects(id),
  chapter_id        INTEGER REFERENCES chapters(id),
  topic_id          INTEGER REFERENCES topics(id),
  
  question_number   INTEGER,
  selected_option   CHAR(1),
  correct_option    CHAR(1),
  is_correct        BOOLEAN,
  is_skipped        BOOLEAN,
  time_taken_seconds INTEGER,
  
  difficulty        VARCHAR(10),
  
  is_careless_mistake       BOOLEAN DEFAULT false,
  is_time_pressure_mistake  BOOLEAN DEFAULT false,
  is_repeated_mistake       BOOLEAN DEFAULT false,
  is_guessed_correctly      BOOLEAN DEFAULT false,
  
  time_rank         INTEGER,
  marks_earned      INTEGER
);

-- ─────────────────────────────────────────────────────
-- TABLE: score_history
-- Historical performance lookup
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS score_history (
  id                BIGSERIAL PRIMARY KEY,
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id        UUID REFERENCES mock_test_sessions(id) ON DELETE CASCADE,
  
  test_number       INTEGER,
  test_date         DATE DEFAULT CURRENT_DATE,
  test_type         VARCHAR(30),
  
  raw_score         INTEGER,
  max_score         INTEGER,
  percentage        DECIMAL(5,2),
  accuracy          DECIMAL(5,2),
  subject_scores    JSONB,
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_sessions_student ON mock_test_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON mock_test_sessions(analysis_status);
CREATE INDEX IF NOT EXISTS idx_analyses_session ON mock_test_analyses(session_id);
CREATE INDEX IF NOT EXISTS idx_analyses_student ON mock_test_analyses(student_id);
CREATE INDEX IF NOT EXISTS idx_q_analysis_session ON question_level_analysis(session_id);
CREATE INDEX IF NOT EXISTS idx_score_history_student ON score_history(student_id);
CREATE INDEX IF NOT EXISTS idx_score_history_date ON score_history(student_id, test_date DESC);

-- ─────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────
ALTER TABLE mock_test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_test_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_level_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own sessions"
  ON mock_test_sessions FOR ALL
  USING (student_id = auth.uid());

CREATE POLICY "Students see own analyses"
  ON mock_test_analyses FOR ALL
  USING (student_id = auth.uid());

CREATE POLICY "Students see own question analysis"
  ON question_level_analysis FOR ALL
  USING (student_id = auth.uid());

CREATE POLICY "Students see own score history"
  ON score_history FOR ALL
  USING (student_id = auth.uid());
