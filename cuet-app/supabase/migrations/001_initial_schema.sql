-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────
-- TABLE 1: students (Bridged to public.profiles)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id                UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  auth_user_id      UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name              VARCHAR(100) NOT NULL,
  email             VARCHAR(150),
  phone             VARCHAR(15),
  selected_subjects TEXT[] DEFAULT '{}',
  target_college    VARCHAR(200),
  exam_date         DATE DEFAULT '2026-05-15',
  daily_study_hours INTEGER DEFAULT 4,
  plan_type         VARCHAR(20) DEFAULT 'free',
  avatar_url        TEXT,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compatibility view mapping public.profiles into students
CREATE OR REPLACE VIEW public.vw_students AS
SELECT 
  p.id,
  p.id AS auth_user_id,
  p.full_name AS name,
  p.target_stream,
  p.target_college,
  p.target_university,
  p.xp,
  p.campus_coins,
  p.current_streak,
  p.is_premium,
  p.subscription_tier AS plan_type,
  p.created_at,
  p.updated_at
FROM public.profiles p;

-- ─────────────────────────────────────────
-- TABLE 2: subjects
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
  id              SERIAL PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  code            VARCHAR(10) NOT NULL UNIQUE,
  description     TEXT,
  total_chapters  INTEGER DEFAULT 0,
  color           VARCHAR(7) DEFAULT '#6366f1',
  icon            VARCHAR(50) DEFAULT '📚',
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- TABLE 3: chapters
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chapters (
  id              SERIAL PRIMARY KEY,
  subject_id      INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
  chapter_number  INTEGER NOT NULL,
  chapter_name    VARCHAR(200) NOT NULL,
  description     TEXT,
  total_topics    INTEGER DEFAULT 0,
  weightage       INTEGER DEFAULT 5,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- TABLE 4: topics
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS topics (
  id              SERIAL PRIMARY KEY,
  chapter_id      INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  subject_id      INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
  topic_name      VARCHAR(200) NOT NULL,
  description     TEXT,
  importance      VARCHAR(10) DEFAULT 'medium' 
                  CHECK (importance IN ('high', 'medium', 'low')),
  estimated_time  INTEGER DEFAULT 30,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- TABLE 5: questions
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS questions (
  id              SERIAL PRIMARY KEY,
  subject_id      INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
  chapter_id      INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  topic_id        INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  
  question_text   TEXT NOT NULL,
  option_a        TEXT NOT NULL,
  option_b        TEXT NOT NULL,
  option_c        TEXT NOT NULL,
  option_d        TEXT NOT NULL,
  correct_option  CHAR(1) NOT NULL CHECK (correct_option IN ('A','B','C','D')),
  explanation     TEXT,
  
  difficulty      VARCHAR(10) DEFAULT 'medium' 
                  CHECK (difficulty IN ('easy', 'medium', 'hard')),
  question_type   VARCHAR(20) DEFAULT 'practice'
                  CHECK (question_type IN ('pyq','practice','ai_generated')),
  exam_year       INTEGER,
  source          VARCHAR(100) DEFAULT 'Manual',
  
  is_verified     BOOLEAN DEFAULT false,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- TABLE 6: student_attempts (MOST IMPORTANT)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_attempts (
  id                  BIGSERIAL PRIMARY KEY,
  student_id          UUID REFERENCES students(id) ON DELETE CASCADE,
  question_id         INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  subject_id          INTEGER REFERENCES subjects(id),
  chapter_id          INTEGER REFERENCES chapters(id),
  topic_id            INTEGER REFERENCES topics(id),
  
  selected_option     CHAR(1) CHECK (selected_option IN ('A','B','C','D')),
  is_correct          BOOLEAN,
  is_skipped          BOOLEAN DEFAULT false,
  time_taken_seconds  INTEGER DEFAULT 0,
  
  attempt_source      VARCHAR(20) DEFAULT 'practice'
                      CHECK (attempt_source IN 
                      ('mock_test','practice','pyq','diagnostic')),
  session_id          UUID,
  attempt_number      INTEGER DEFAULT 1,
  
  attempted_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- TABLE 7: weakness_scores (Pre-calculated cache)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS weakness_scores (
  id                    BIGSERIAL PRIMARY KEY,
  student_id            UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic_id              INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  subject_id            INTEGER REFERENCES subjects(id),
  chapter_id            INTEGER REFERENCES chapters(id),
  
  total_attempts        INTEGER DEFAULT 0,
  correct_count         INTEGER DEFAULT 0,
  wrong_count           INTEGER DEFAULT 0,
  skipped_count         INTEGER DEFAULT 0,
  
  accuracy_score        DECIMAL(5,2) DEFAULT 0,
  speed_score           DECIMAL(5,2) DEFAULT 0,
  consistency_score     DECIMAL(5,2) DEFAULT 0,
  final_weakness_score  DECIMAL(5,2) DEFAULT 0,
  
  weakness_level        VARCHAR(15) DEFAULT 'untested'
                        CHECK (weakness_level IN 
                        ('critical','weak','average','strong',
                         'excellent','untested')),
  
  avg_time_seconds      DECIMAL(6,2) DEFAULT 0,
  last_attempted        TIMESTAMP WITH TIME ZONE,
  last_updated          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(student_id, topic_id)
);

-- ─────────────────────────────────────────
-- TABLE 8: student_alerts
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_alerts (
  id          BIGSERIAL PRIMARY KEY,
  student_id  UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  alert_type  VARCHAR(50) NOT NULL,
  title       VARCHAR(200) NOT NULL,
  message     TEXT NOT NULL,
  action_text VARCHAR(100),
  action_url  VARCHAR(200),
  is_read     BOOLEAN DEFAULT false,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- INDEXES for performance
-- ─────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_attempts_student ON student_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_attempts_topic ON student_attempts(topic_id);
CREATE INDEX IF NOT EXISTS idx_attempts_student_topic 
  ON student_attempts(student_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_weakness_student ON weakness_scores(student_id);
CREATE INDEX IF NOT EXISTS idx_weakness_student_topic 
  ON weakness_scores(student_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_alerts_student_unread 
  ON student_alerts(student_id) WHERE is_read = false;

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE weakness_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_alerts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Students can only see their own data' AND tablename = 'students'
  ) THEN
    CREATE POLICY "Students can only see their own data" ON students
      FOR ALL USING (auth.uid() = id OR auth.uid() = auth_user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Students can only see their own attempts' AND tablename = 'student_attempts'
  ) THEN
    CREATE POLICY "Students can only see their own attempts" 
      ON student_attempts
      FOR ALL USING (student_id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Students can only see their own weakness scores' AND tablename = 'weakness_scores'
  ) THEN
    CREATE POLICY "Students can only see their own weakness scores" 
      ON weakness_scores
      FOR ALL USING (student_id = auth.uid());
  END IF;
END $$;

-- ─────────────────────────────────────────
-- SEED DATA: 4 Subjects to start
-- ─────────────────────────────────────────
INSERT INTO subjects (name, code, color, icon, total_chapters) VALUES
('Political Science', 'POL', '#dc2626', '🏛️', 10),
('History',           'HIS', '#b45309', '📜', 12),
('Economics',         'ECO', '#16a34a', '📊', 9),
('English',           'ENG', '#7c3aed', '📖', 8)
ON CONFLICT (code) DO NOTHING;

INSERT INTO chapters 
  (subject_id, chapter_number, chapter_name, weightage) VALUES
(1, 1, 'The Cold War Era',              6),
(1, 2, 'The End of Bipolarity',         5),
(1, 3, 'US Hegemony in World Politics', 5),
(1, 4, 'Alternative Centres of Power', 6),
(1, 5, 'Contemporary South Asia',       5),
(1, 6, 'International Organisations',   5),
(1, 7, 'Security in the Contemporary World', 4),
(1, 8, 'Environment and Natural Resources',  4),
(1, 9, 'Globalisation',                 5),
(1, 10,'Constitution: Why and How?',    8)
ON CONFLICT DO NOTHING;

INSERT INTO topics 
  (chapter_id, subject_id, topic_name, importance) VALUES
(10, 1, 'Constituent Assembly',         'high'),
(10, 1, 'Philosophical Foundations',    'medium'),
(10, 1, 'Key Features of Constitution', 'high'),
(10, 1, 'Fundamental Rights',           'high'),
(10, 1, 'Directive Principles (DPSP)',  'high'),
(10, 1, 'Emergency Provisions',         'high'),
(1,  1, 'Origins of Cold War',          'high'),
(1,  1, 'Arenas of Cold War',           'medium'),
(1,  1, 'India and Cold War',           'high')
ON CONFLICT DO NOTHING;

INSERT INTO questions 
  (subject_id, chapter_id, topic_id, question_text,
   option_a, option_b, option_c, option_d,
   correct_option, explanation, difficulty, 
   question_type, is_verified) VALUES
(
  1, 10, 4,
  'Which Article of the Indian Constitution guarantees the Right to Constitutional Remedies?',
  'Article 14',
  'Article 19',
  'Article 32',
  'Article 21',
  'C',
  'Article 32 gives citizens the right to move the Supreme Court directly for enforcement of Fundamental Rights. Dr. B.R. Ambedkar called it the Heart and Soul of the Indian Constitution.',
  'medium',
  'pyq',
  true
),
(
  1, 10, 4,
  'How many Fundamental Rights are currently guaranteed by the Indian Constitution?',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'B',
  'Currently, the Indian Constitution guarantees Six Fundamental Rights: Right to Equality (Art.14-18), Right to Freedom (Art.19-22), Right Against Exploitation (Art.23-24), Right to Freedom of Religion (Art.25-28), Cultural & Educational Rights (Art.29-30), and Right to Constitutional Remedies (Art.32).',
  'easy',
  'practice',
  true
),
(
  1, 10, 5,
  'Directive Principles of State Policy (DPSP) are contained in which Part of the Indian Constitution?',
  'Part II',
  'Part III',
  'Part IV',
  'Part V',
  'C',
  'DPSPs are contained in Part IV of the Indian Constitution (Articles 36-51). Unlike Fundamental Rights in Part III, DPSPs are not enforceable by courts but are guidelines for the state in making laws.',
  'medium',
  'pyq',
  true
)
ON CONFLICT DO NOTHING;
