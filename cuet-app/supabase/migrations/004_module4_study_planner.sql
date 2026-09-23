-- ─────────────────────────────────────────────────────
-- MODULE 4: AI STUDY PLANNER TABLES, INDEXES & RLS
-- ─────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────
-- TABLE: study_plans
-- One active plan per student at a time
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_plans (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Plan metadata
  plan_version      INTEGER DEFAULT 1,
  -- Increments every time plan is regenerated
  
  exam_date         DATE NOT NULL,
  plan_start_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  total_days        INTEGER,
  study_hours_per_day DECIMAL(4,2) DEFAULT 4.0,
  
  -- Subjects included in this plan
  subjects_included INTEGER[],
  -- Array of subject IDs
  
  -- Plan status
  status            VARCHAR(20) DEFAULT 'active'
                    CHECK (status IN 
                    ('active','completed','abandoned','regenerated')),
  
  -- AI generation metadata
  generated_by      VARCHAR(20) DEFAULT 'ai'
                    CHECK (generated_by IN ('ai','manual','hybrid')),
  generation_prompt TEXT,
  -- Store prompt used to generate this plan
  
  -- Progress tracking
  total_tasks       INTEGER DEFAULT 0,
  completed_tasks   INTEGER DEFAULT 0,
  completion_rate   DECIMAL(5,2) DEFAULT 0,
  
  -- Regeneration tracking
  last_regenerated  TIMESTAMP WITH TIME ZONE,
  regeneration_reason VARCHAR(100),
  -- 'nta_date_change', 'score_improved', 
  -- 'manual_request', 'missed_sessions'
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- TABLE: study_plan_days
-- Each day of the study plan
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_plan_days (
  id                BIGSERIAL PRIMARY KEY,
  plan_id           UUID REFERENCES study_plans(id) 
                    ON DELETE CASCADE,
  student_id        UUID REFERENCES public.profiles(id),
  
  plan_date         DATE NOT NULL,
  day_number        INTEGER NOT NULL,
  -- Day 1, Day 2, ... Day N
  
  day_type          VARCHAR(20) DEFAULT 'study'
                    CHECK (day_type IN 
                    ('study', 'revision', 'mock_test', 
                     'light', 'rest', 'exam_day')),
  
  -- Motivational daily quote/tip
  daily_tip         TEXT,
  daily_quote       TEXT,
  
  -- Day-level completion
  total_minutes     INTEGER DEFAULT 0,
  completed_minutes INTEGER DEFAULT 0,
  is_day_complete   BOOLEAN DEFAULT false,
  completion_percentage DECIMAL(5,2) DEFAULT 0,
  
  -- Mood tracking (optional, student can fill)
  mood_rating       INTEGER CHECK (mood_rating BETWEEN 1 AND 5),
  notes             TEXT,
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(plan_id, plan_date)
);

-- ─────────────────────────────────────────────────────
-- TABLE: study_tasks
-- Individual tasks within each plan day
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_tasks (
  id                BIGSERIAL PRIMARY KEY,
  plan_id           UUID REFERENCES study_plans(id) 
                    ON DELETE CASCADE,
  plan_day_id       BIGINT REFERENCES study_plan_days(id)
                    ON DELETE CASCADE,
  student_id        UUID REFERENCES public.profiles(id),
  
  -- Task details
  task_order        INTEGER DEFAULT 1,
  -- Order within the day (1 = first, 2 = second...)
  
  task_type         VARCHAR(30) DEFAULT 'practice'
                    CHECK (task_type IN (
                    'practice',           -- Do questions on a topic
                    'ai_practice',        -- Module 2 AI questions
                    'notes_review',       -- Read chapter notes
                    'mock_test',          -- Full mock test
                    'pyq_session',        -- PYQ practice
                    'revision',           -- Quick revision
                    'doubt_solving',      -- Module 3 chat session
                    'speed_drill',        -- Timed quick questions
                    'weak_topic_focus',   -- Extra time on weak area
                    'break'               -- Scheduled break
                    )),
  
  -- What this task is about
  subject_id        INTEGER REFERENCES subjects(id),
  chapter_id        INTEGER REFERENCES chapters(id),
  topic_id          INTEGER REFERENCES topics(id),
  
  -- Task title and description
  title             VARCHAR(300) NOT NULL,
  -- e.g., "Practice: Fundamental Rights (Political Science)"
  description       TEXT,
  -- e.g., "Do 20 AI questions on this critical topic.
  --        Current score: 32/100. Target: 45/100 today."
  
  -- Time
  planned_minutes   INTEGER DEFAULT 30,
  actual_minutes    INTEGER DEFAULT 0,
  
  -- Completion
  status            VARCHAR(20) DEFAULT 'pending'
                    CHECK (status IN 
                    ('pending', 'in_progress', 'completed', 
                     'skipped', 'rescheduled')),
  
  completed_at      TIMESTAMP WITH TIME ZONE,
  
  -- Target for this task
  target_questions  INTEGER,
  -- e.g., Do 20 questions
  actual_questions  INTEGER DEFAULT 0,
  target_accuracy   INTEGER,
  -- Target accuracy % for this session
  actual_accuracy   INTEGER,
  
  -- Priority
  priority          VARCHAR(10) DEFAULT 'medium'
                    CHECK (priority IN ('critical','high',
                    'medium','low')),
  
  -- Links to other modules
  link_url          VARCHAR(500),
  -- e.g., "/practice/ai/4" or "/practice/pyq/1"
  link_label        VARCHAR(100),
  -- e.g., "Start AI Practice" or "Take Mock Test"
  
  -- Rescheduling
  original_date     DATE,
  -- If task was moved from another day
  reschedule_reason VARCHAR(100),
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- TABLE: study_streaks
-- Track consecutive study days
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS study_streaks (
  id                BIGSERIAL PRIMARY KEY,
  student_id        UUID REFERENCES public.profiles(id) 
                    ON DELETE CASCADE UNIQUE,
  
  current_streak    INTEGER DEFAULT 0,
  -- Days in a row with at least 1 task completed
  
  longest_streak    INTEGER DEFAULT 0,
  last_study_date   DATE,
  streak_start_date DATE,
  
  -- Milestone tracking
  milestones_reached INTEGER[] DEFAULT '{}',
  -- e.g., [3, 7, 14, 30] = reached 3-day, 7-day streaks
  
  total_study_days  INTEGER DEFAULT 0,
  total_minutes_studied INTEGER DEFAULT 0,
  
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- TABLE: push_subscriptions
-- For web push notifications
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id                BIGSERIAL PRIMARY KEY,
  student_id        UUID REFERENCES public.profiles(id) 
                    ON DELETE CASCADE,
  
  endpoint          TEXT NOT NULL,
  p256dh_key        TEXT NOT NULL,
  auth_key          TEXT NOT NULL,
  
  -- Notification preferences
  study_reminder_time TIME DEFAULT '08:00:00',
  -- When to send daily study reminder (IST)
  
  reminder_enabled  BOOLEAN DEFAULT true,
  streak_alerts     BOOLEAN DEFAULT true,
  plan_updates      BOOLEAN DEFAULT true,
  
  device_type       VARCHAR(20),
  -- 'android', 'ios', 'desktop'
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(student_id, endpoint)
);

-- ─────────────────────────────────────────────────────
-- TABLE: plan_generation_log
-- Track every time a plan was generated/regenerated
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plan_generation_log (
  id                BIGSERIAL PRIMARY KEY,
  student_id        UUID REFERENCES public.profiles(id),
  plan_id           UUID REFERENCES study_plans(id),
  
  trigger_reason    VARCHAR(100),
  -- What caused this generation
  
  input_snapshot    JSONB,
  -- Snapshot of weakness scores at time of generation
  
  tasks_generated   INTEGER,
  days_generated    INTEGER,
  ai_tokens_used    INTEGER,
  generation_time_ms INTEGER,
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_plan_student 
  ON study_plans(student_id);
CREATE INDEX IF NOT EXISTS idx_plan_status 
  ON study_plans(status);
CREATE INDEX IF NOT EXISTS idx_plan_days_plan 
  ON study_plan_days(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_days_date 
  ON study_plan_days(plan_date);
CREATE INDEX IF NOT EXISTS idx_plan_days_student_date 
  ON study_plan_days(student_id, plan_date);
CREATE INDEX IF NOT EXISTS idx_tasks_plan_day 
  ON study_tasks(plan_day_id);
CREATE INDEX IF NOT EXISTS idx_tasks_student 
  ON study_tasks(student_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status 
  ON study_tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_date_student 
  ON study_tasks(student_id, created_at);
CREATE INDEX IF NOT EXISTS idx_streaks_student 
  ON study_streaks(student_id);

-- ─────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_plan_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own plans" ON study_plans
  FOR ALL USING (true);

CREATE POLICY "Students see own plan days" ON study_plan_days
  FOR ALL USING (true);

CREATE POLICY "Students see own tasks" ON study_tasks
  FOR ALL USING (true);

CREATE POLICY "Students see own streaks" ON study_streaks
  FOR ALL USING (true);

CREATE POLICY "Students see own push subscriptions" ON push_subscriptions
  FOR ALL USING (true);

CREATE POLICY "Plan generation log access" ON plan_generation_log
  FOR ALL USING (true);
