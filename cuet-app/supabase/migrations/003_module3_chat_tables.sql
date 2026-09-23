-- ─────────────────────────────────────────────────────
-- MODULE 3: AI DOUBT SOLVER CHATBOT TABLES & PROCEDURES
-- ─────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────
-- TABLE 1: chat_conversations
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_conversations (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject_id        INTEGER REFERENCES subjects(id) ON DELETE SET NULL,
  topic_id          INTEGER REFERENCES topics(id) ON DELETE SET NULL,
  title             VARCHAR(200) NOT NULL DEFAULT 'New Doubt Session',
  is_archived       BOOLEAN DEFAULT false,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_conversations_student 
  ON chat_conversations(student_id, updated_at DESC);

-- ─────────────────────────────────────────────────────
-- TABLE 2: chat_messages
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id   UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role              VARCHAR(20) NOT NULL CHECK (role IN ('student', 'cuetbot', 'system', 'user', 'assistant')),
  message_text      TEXT NOT NULL,
  language_detected VARCHAR(20) DEFAULT 'english' CHECK (language_detected IN ('hindi', 'hinglish', 'english', 'mixed')),
  intent_detected   VARCHAR(50),
  tokens_used       INTEGER DEFAULT 0,
  response_time_ms  INTEGER DEFAULT 0,
  sources_used      JSONB DEFAULT '[]'::jsonb,
  has_inline_mcq    BOOLEAN DEFAULT false,
  inline_mcq_data   JSONB,
  feedback          VARCHAR(20) CHECK (feedback IN ('helpful', 'unhelpful')),
  feedback_reason   TEXT,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_conv_created 
  ON chat_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_student 
  ON chat_messages(student_id, created_at DESC);

-- ─────────────────────────────────────────────────────
-- TABLE 3: chat_usage_tracking
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_usage_tracking (
  id                BIGSERIAL PRIMARY KEY,
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  usage_date        DATE DEFAULT CURRENT_DATE,
  message_count     INTEGER DEFAULT 0,
  tokens_used       INTEGER DEFAULT 0,
  plan_type         VARCHAR(20) DEFAULT 'free',
  daily_limit       INTEGER DEFAULT 20,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT uq_student_chat_usage_date UNIQUE (student_id, usage_date)
);

CREATE INDEX IF NOT EXISTS idx_chat_usage_student_date 
  ON chat_usage_tracking(student_id, usage_date);

-- ─────────────────────────────────────────────────────
-- TABLE 4: doubt_topics_log (Connects chat to Module 1 Weakness)
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS doubt_topics_log (
  id                BIGSERIAL PRIMARY KEY,
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  conversation_id   UUID REFERENCES chat_conversations(id) ON DELETE SET NULL,
  subject_id        INTEGER REFERENCES subjects(id) ON DELETE SET NULL,
  chapter_id        INTEGER REFERENCES chapters(id) ON DELETE SET NULL,
  topic_id          INTEGER REFERENCES topics(id) ON DELETE SET NULL,
  doubt_query       TEXT NOT NULL,
  language          VARCHAR(20),
  intent            VARCHAR(50),
  detected_keywords TEXT[] DEFAULT '{}',
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_doubt_topics_student 
  ON doubt_topics_log(student_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_doubt_topics_created 
  ON doubt_topics_log(created_at DESC);

-- ─────────────────────────────────────────────────────
-- TABLE 5: suggested_questions_log
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suggested_questions_log (
  id                BIGSERIAL PRIMARY KEY,
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  conversation_id   UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  question_text     TEXT NOT NULL,
  topic_id          INTEGER REFERENCES topics(id) ON DELETE SET NULL,
  was_clicked       BOOLEAN DEFAULT false,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- STORED PROCEDURE: increment_chat_usage
-- ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION increment_chat_usage(
  p_student_id UUID,
  p_tokens INTEGER DEFAULT 0,
  p_plan_type VARCHAR DEFAULT 'free',
  p_daily_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  new_count INTEGER,
  remaining INTEGER,
  is_limit_reached BOOLEAN
) AS $$
DECLARE
  v_current_count INTEGER;
  v_daily_limit INTEGER := p_daily_limit;
BEGIN
  INSERT INTO chat_usage_tracking (
    student_id, 
    usage_date, 
    message_count, 
    tokens_used, 
    plan_type, 
    daily_limit,
    updated_at
  )
  VALUES (
    p_student_id, 
    CURRENT_DATE, 
    1, 
    p_tokens, 
    p_plan_type, 
    v_daily_limit,
    NOW()
  )
  ON CONFLICT (student_id, usage_date)
  DO UPDATE SET
    message_count = chat_usage_tracking.message_count + 1,
    tokens_used = chat_usage_tracking.tokens_used + p_tokens,
    updated_at = NOW()
  RETURNING chat_usage_tracking.message_count, chat_usage_tracking.daily_limit
  INTO v_current_count, v_daily_limit;

  RETURN QUERY SELECT 
    v_current_count, 
    GREATEST(0, v_daily_limit - v_current_count), 
    (v_current_count >= v_daily_limit);
END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────────────
-- RLS POLICIES
-- ─────────────────────────────────────────────────────
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubt_topics_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggested_questions_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all select chat_conversations" ON chat_conversations FOR SELECT USING (true);
CREATE POLICY "Allow all insert chat_conversations" ON chat_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update chat_conversations" ON chat_conversations FOR UPDATE USING (true);

CREATE POLICY "Allow all select chat_messages" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Allow all insert chat_messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update chat_messages" ON chat_messages FOR UPDATE USING (true);

CREATE POLICY "Allow all select chat_usage_tracking" ON chat_usage_tracking FOR SELECT USING (true);
CREATE POLICY "Allow all insert/update chat_usage_tracking" ON chat_usage_tracking FOR ALL USING (true);

CREATE POLICY "Allow all doubt_topics_log" ON doubt_topics_log FOR ALL USING (true);
CREATE POLICY "Allow all suggested_questions_log" ON suggested_questions_log FOR ALL USING (true);
