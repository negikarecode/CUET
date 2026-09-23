import {
  Student,
  Subject,
  Chapter,
  Topic,
  Question,
  StudentAttempt,
  WeaknessScore,
  ContentChunk,
  AIGeneratedQuestion,
  AIUsageTracking,
  ChatMessage,
  ChatConversation,
  ChatUsageTracking,
  DoubtTopicLog,
  SuggestedQuestionLog,
  StudyPlan,
  StudyPlanDay,
  StudyTask,
  StudyStreak,
  PushSubscriptionData,
  PlanGenerationLog,
  MockTestSession,
  MockTestAnalysis,
  QuestionLevelAnalysisRecord,
  ScoreHistoryRecord,
} from './types';
import {
  calculateAccuracyScore,
  calculateSpeedScore,
  calculateConsistencyScore,
  calculateFinalWeaknessScore,
  getWeaknessLevel,
} from './weakness-engine';
import { GeneratedQuestion } from './question-validator';

export const SEED_CONTENT_CHUNKS: ContentChunk[] = [
  {
    id: 1,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 4,
    content_text: `Fundamental Rights are contained in Part III of the Indian Constitution (Articles 12-35). They are justiciable rights, meaning they are enforceable by courts. The six Fundamental Rights are:
1. Right to Equality (Articles 14-18)
2. Right to Freedom (Articles 19-22)
3. Right Against Exploitation (Articles 23-24)
4. Right to Freedom of Religion (Articles 25-28)
5. Cultural and Educational Rights (Articles 29-30)
6. Right to Constitutional Remedies (Article 32)
Dr. B.R. Ambedkar called Article 32 the Heart and Soul of the Constitution.`,
    content_type: 'ncert',
    source_document: 'NCERT Political Science Part 2',
    chunk_index: 1,
    pinecone_id: 'seed_chunk_1',
    is_embedded: true,
  },
  {
    id: 2,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 4,
    content_text: `Article 14 guarantees Equality before Law and Equal Protection of Laws. Article 15 prohibits discrimination on grounds of religion, race, caste, sex or place of birth. Article 16 provides equality of opportunity in public employment. Article 17 abolishes untouchability and its practice in any form is forbidden. Article 18 abolishes titles except military and academic titles.`,
    content_type: 'ncert',
    source_document: 'NCERT Political Science Part 2',
    chunk_index: 2,
    pinecone_id: 'seed_chunk_2',
    is_embedded: true,
  },
  {
    id: 3,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 4,
    content_text: `Article 19 guarantees six freedoms: 
(a) Freedom of speech and expression
(b) Freedom to assemble peacefully
(c) Freedom to form associations
(d) Freedom to move freely throughout India
(e) Freedom to reside in any part of India
(f) Freedom to practice any profession
Article 20 protects against arbitrary conviction.
Article 21 protects life and personal liberty.
Article 21A provides Right to Education for children aged 6-14 years (added by 86th Amendment, 2002).
Article 22 protects against arbitrary arrest.`,
    content_type: 'ncert',
    source_document: 'NCERT Political Science Part 2',
    chunk_index: 3,
    pinecone_id: 'seed_chunk_3',
    is_embedded: true,
  },
  {
    id: 4,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 5,
    content_text: `Directive Principles of State Policy (DPSP) are contained in Part IV of the Indian Constitution (Articles 36-51). They are non-justiciable — courts cannot enforce them. They are guidelines for the government to create a welfare state.
Key DPSPs include:
- Article 39A: Free legal aid
- Article 40: Organisation of village panchayats
- Article 44: Uniform Civil Code
- Article 45: Free education for children
- Article 48: Agriculture and animal husbandry
- Article 51: International peace
DPSPs are classified as Socialistic, Gandhian, and Liberal-Intellectual principles.`,
    content_type: 'ncert',
    source_document: 'NCERT Political Science Part 2',
    chunk_index: 1,
    pinecone_id: 'seed_chunk_4',
    is_embedded: true,
  },
  {
    id: 5,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 6,
    content_text: `Emergency Provisions in the Indian Constitution:
1. National Emergency (Article 352):
   - Declared by President on advice of Cabinet
   - Grounds: War, External Aggression, Armed Rebellion
   - Approved by 2/3rd majority of both Houses
   - Can suspend Fundamental Rights (except Art 20,21)
   
2. State Emergency/President Rule (Article 356):
   - When constitutional machinery fails in a state
   - Approved by simple majority in Parliament
   - Maximum duration: 3 years
   
3. Financial Emergency (Article 360):
   - When financial stability of India is threatened
   - Never been declared so far in Indian history`,
    content_type: 'ncert',
    source_document: 'NCERT Political Science Part 2',
    chunk_index: 1,
    pinecone_id: 'seed_chunk_5',
    is_embedded: true,
  },
];


export const SEED_SUBJECTS: Subject[] = [
  { id: 1, name: "Political Science", code: "POL", color: "#dc2626", icon: "Landmark", total_chapters: 10 },
  { id: 2, name: "History", code: "HIS", color: "#b45309", icon: "ScrollText", total_chapters: 12 },
  { id: 3, name: "Economics", code: "ECO", color: "#16a34a", icon: "TrendingUp", total_chapters: 9 },
  { id: 4, name: "English", code: "ENG", color: "#7c3aed", icon: "BookOpen", total_chapters: 8 },
];

export const SEED_CHAPTERS: Chapter[] = [
  { id: 1, subject_id: 1, chapter_number: 1, chapter_name: "The Cold War Era", weightage: 6 },
  { id: 2, subject_id: 1, chapter_number: 2, chapter_name: "The End of Bipolarity", weightage: 5 },
  { id: 10, subject_id: 1, chapter_number: 10, chapter_name: "Constitution: Why and How?", weightage: 8 },
  { id: 11, subject_id: 2, chapter_number: 1, chapter_name: "Bricks, Beads and Bones (Harappan Civilisation)", weightage: 7 },
  { id: 21, subject_id: 3, chapter_number: 1, chapter_name: "National Income Accounting", weightage: 8 },
];

export const SEED_TOPICS: Topic[] = [
  { id: 1, chapter_id: 10, subject_id: 1, topic_name: "Constituent Assembly", importance: "high", estimated_time: 30 },
  { id: 2, chapter_id: 10, subject_id: 1, topic_name: "Philosophical Foundations", importance: "medium", estimated_time: 25 },
  { id: 3, chapter_id: 10, subject_id: 1, topic_name: "Key Features of Constitution", importance: "high", estimated_time: 35 },
  { id: 4, chapter_id: 10, subject_id: 1, topic_name: "Fundamental Rights", importance: "high", estimated_time: 40 },
  { id: 5, chapter_id: 10, subject_id: 1, topic_name: "Directive Principles (DPSP)", importance: "high", estimated_time: 30 },
  { id: 6, chapter_id: 10, subject_id: 1, topic_name: "Emergency Provisions", importance: "high", estimated_time: 35 },
  { id: 7, chapter_id: 1, subject_id: 1, topic_name: "Origins of Cold War", importance: "high", estimated_time: 30 },
  { id: 8, chapter_id: 1, subject_id: 1, topic_name: "Arenas of Cold War", importance: "medium", estimated_time: 25 },
  { id: 9, chapter_id: 1, subject_id: 1, topic_name: "India and Cold War", importance: "high", estimated_time: 35 },
  { id: 10, chapter_id: 11, subject_id: 2, topic_name: "Town Planning of Mohenjodaro", importance: "high", estimated_time: 30 },
  { id: 11, chapter_id: 21, subject_id: 3, topic_name: "GDP Deflator & Real Income", importance: "high", estimated_time: 35 },
];

export const SEED_QUESTIONS: Question[] = [
  {
    id: 1,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 4,
    question_text: "Which Article of the Indian Constitution guarantees the Right to Constitutional Remedies?",
    option_a: "Article 14",
    option_b: "Article 19",
    option_c: "Article 32",
    option_d: "Article 21",
    correct_option: "C",
    explanation: "Article 32 gives citizens the right to move the Supreme Court directly for enforcement of Fundamental Rights. Dr. B.R. Ambedkar called it the Heart and Soul of the Indian Constitution.",
    difficulty: "medium",
    question_type: "pyq",
    is_verified: true,
  },
  {
    id: 2,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 4,
    question_text: "How many Fundamental Rights are currently guaranteed by the Indian Constitution?",
    option_a: "Five",
    option_b: "Six",
    option_c: "Seven",
    option_d: "Eight",
    correct_option: "B",
    explanation: "Currently, the Indian Constitution guarantees Six Fundamental Rights: Right to Equality (Art.14-18), Right to Freedom (Art.19-22), Right Against Exploitation (Art.23-24), Right to Freedom of Religion (Art.25-28), Cultural & Educational Rights (Art.29-30), and Right to Constitutional Remedies (Art.32).",
    difficulty: "easy",
    question_type: "practice",
    is_verified: true,
  },
  {
    id: 3,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 5,
    question_text: "Directive Principles of State Policy (DPSP) are contained in which Part of the Indian Constitution?",
    option_a: "Part II",
    option_b: "Part III",
    option_c: "Part IV",
    option_d: "Part V",
    correct_option: "C",
    explanation: "DPSPs are contained in Part IV of the Indian Constitution (Articles 36-51). Unlike Fundamental Rights in Part III, DPSPs are not enforceable by courts but are guidelines for the state in making laws.",
    difficulty: "medium",
    question_type: "pyq",
    is_verified: true,
  },
  {
    id: 4,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 6,
    question_text: "Under which Article can the President of India declare a National Emergency on grounds of war, external aggression, or armed rebellion?",
    option_a: "Article 352",
    option_b: "Article 356",
    option_c: "Article 360",
    option_d: "Article 365",
    correct_option: "A",
    explanation: "Article 352 deals with National Emergency. Article 356 is for President's Rule in States, and Article 360 is for Financial Emergency.",
    difficulty: "medium",
    question_type: "pyq",
    is_verified: true,
  },
  {
    id: 5,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 1,
    question_text: "Who was elected as the permanent President of the Constituent Assembly on December 11, 1946?",
    option_a: "Dr. B.R. Ambedkar",
    option_b: "Dr. Rajendra Prasad",
    option_c: "Dr. Sachchidananda Sinha",
    option_d: "Jawaharlal Nehru",
    correct_option: "B",
    explanation: "Dr. Rajendra Prasad was elected permanent President of the Constituent Assembly. Dr. Sachchidananda Sinha served as temporary President on December 9, 1946.",
    difficulty: "easy",
    question_type: "pyq",
    is_verified: true,
  },
  {
    id: 6,
    subject_id: 1,
    chapter_id: 1,
    topic_id: 7,
    question_text: "Which military alliance was established by the Western bloc under the leadership of the USA in April 1949?",
    option_a: "Warsaw Pact",
    option_b: "SEATO",
    option_c: "NATO",
    option_d: "CENTO",
    correct_option: "C",
    explanation: "NATO (North Atlantic Treaty Organisation) was formed in April 1949 with twelve founder states. The Warsaw Pact was formed in 1955 by the Soviet Union.",
    difficulty: "easy",
    question_type: "practice",
    is_verified: true,
  },
  {
    id: 7,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 4,
    question_text: "The Right to Property was removed from the list of Fundamental Rights by which Constitutional Amendment?",
    option_a: "42nd Amendment (1976)",
    option_b: "44th Amendment (1978)",
    option_c: "86th Amendment (2002)",
    option_d: "73rd Amendment (1992)",
    correct_option: "B",
    explanation: "The 44th Amendment Act of 1978 repealed Article 31 and made the Right to Property a legal right under Article 300A in Part XII of the Constitution.",
    difficulty: "hard",
    question_type: "pyq",
    is_verified: true,
  },
  {
    id: 8,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 6,
    question_text: "A proclamation of National Emergency under Article 352 must be approved by both Houses of Parliament within what time period?",
    option_a: "14 days",
    option_b: "One month",
    option_c: "Two months",
    option_d: "Six months",
    correct_option: "B",
    explanation: "Under Article 352(4), following the 44th Amendment, approval must be given by both Houses within one month by a special majority.",
    difficulty: "hard",
    question_type: "practice",
    is_verified: true,
  },
  {
    id: 9,
    subject_id: 2,
    chapter_id: 11,
    topic_id: 10,
    question_text: "The Great Bath, a monumental structure with gypsum mortar lining, was discovered in which Harappan settlement?",
    option_a: "Kalibangan",
    option_b: "Lothal",
    option_c: "Mohenjodaro",
    option_d: "Harappa",
    correct_option: "C",
    explanation: "The Great Bath was excavated in the Citadel mound of Mohenjodaro, used for ritual bathing.",
    difficulty: "easy",
    question_type: "pyq",
    is_verified: true,
  },
  {
    id: 10,
    subject_id: 3,
    chapter_id: 21,
    topic_id: 11,
    question_text: "The ratio of Nominal GDP to Real GDP multiplied by 100 is known as:",
    option_a: "Consumer Price Index (CPI)",
    option_b: "Wholesale Price Index (WPI)",
    option_c: "GDP Deflator",
    option_d: "Gross National Product",
    correct_option: "C",
    explanation: "GDP Deflator = (Nominal GDP / Real GDP) × 100. It measures the level of prices of all new, domestically produced, final goods and services in an economy.",
    difficulty: "medium",
    question_type: "practice",
    is_verified: true,
  },
];

// Persistent in-memory state for development / local evaluation
export class AppDataStore {
  static student: Student = {
    id: "d049f50e-5492-4822-b5e1-85b28d6c825a",
    name: "Aryan Sharma",
    email: "student@cuet-prep.in",
    phone: "+91 9876543210",
    selected_subjects: ["Political Science", "History", "Economics", "English"],
    target_college: "St. Stephen's College / SRCC (Delhi University)",
    exam_date: "2026-05-15",
    daily_study_hours: 5,
    plan_type: "pro",
    avatar_url: "",
  };

  static attempts: StudentAttempt[] = [
    // Emergency Provisions: 3 attempts, mostly wrong/slow -> Critical
    {
      id: 1,
      student_id: AppDataStore.student.id,
      question_id: 4,
      subject_id: 1,
      chapter_id: 10,
      topic_id: 6,
      selected_option: "B",
      is_correct: false,
      is_skipped: false,
      time_taken_seconds: 68,
      attempt_source: "practice",
      session_id: "init-session-1",
      attempt_number: 1,
      attempted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      student_id: AppDataStore.student.id,
      question_id: 8,
      subject_id: 1,
      chapter_id: 10,
      topic_id: 6,
      selected_option: "C",
      is_correct: false,
      is_skipped: false,
      time_taken_seconds: 75,
      attempt_source: "practice",
      session_id: "init-session-1",
      attempt_number: 2,
      attempted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // Fundamental Rights: 3 attempts, 1 correct, 2 wrong -> Weak
    {
      id: 3,
      student_id: AppDataStore.student.id,
      question_id: 1,
      subject_id: 1,
      chapter_id: 10,
      topic_id: 4,
      selected_option: "C",
      is_correct: true,
      is_skipped: false,
      time_taken_seconds: 40,
      attempt_source: "practice",
      session_id: "init-session-2",
      attempt_number: 1,
      attempted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      student_id: AppDataStore.student.id,
      question_id: 2,
      subject_id: 1,
      chapter_id: 10,
      topic_id: 4,
      selected_option: "C",
      is_correct: false,
      is_skipped: false,
      time_taken_seconds: 52,
      attempt_source: "practice",
      session_id: "init-session-2",
      attempt_number: 2,
      attempted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 5,
      student_id: AppDataStore.student.id,
      question_id: 7,
      subject_id: 1,
      chapter_id: 10,
      topic_id: 4,
      selected_option: "A",
      is_correct: false,
      is_skipped: false,
      time_taken_seconds: 58,
      attempt_source: "practice",
      session_id: "init-session-2",
      attempt_number: 3,
      attempted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // Constituent Assembly: 3 attempts, 2 correct -> Average
    {
      id: 6,
      student_id: AppDataStore.student.id,
      question_id: 5,
      subject_id: 1,
      chapter_id: 10,
      topic_id: 1,
      selected_option: "B",
      is_correct: true,
      is_skipped: false,
      time_taken_seconds: 28,
      attempt_source: "practice",
      session_id: "init-session-3",
      attempt_number: 1,
      attempted_at: new Date().toISOString(),
    },
  ];

  static weaknessScores: Map<number, WeaknessScore> = new Map();

  // Module 2 additions
  static contentChunks: ContentChunk[] = [...SEED_CONTENT_CHUNKS];
  static aiQuestions: AIGeneratedQuestion[] = [];
  static usageTracking: AIUsageTracking[] = [];
  static questionCache: Map<string, GeneratedQuestion[]> = new Map();

  // Module 3 additions: Chatbot State
  static chatConversations: ChatConversation[] = [];
  static chatMessages: ChatMessage[] = [];
  static chatUsage: Map<string, ChatUsageTracking> = new Map();
  static doubtLogs: DoubtTopicLog[] = [];
  static suggestedQuestions: SuggestedQuestionLog[] = [];

  static recalculateTopicScore(topicId: number) {
    const topicAttempts = AppDataStore.attempts.filter((a) => a.topic_id === topicId);
    if (topicAttempts.length === 0) return;

    const correct = topicAttempts.filter((a) => a.is_correct).length;
    const wrong = topicAttempts.filter((a) => !a.is_correct && !a.is_skipped).length;
    const skipped = topicAttempts.filter((a) => a.is_skipped).length;
    const totalTime = topicAttempts.reduce((sum, a) => sum + a.time_taken_seconds, 0);
    const avgTime = topicAttempts.length > 0 ? totalTime / topicAttempts.length : 0;

    const accuracy = calculateAccuracyScore(correct, wrong, skipped);
    const speed = calculateSpeedScore(avgTime, "medium");
    const consistency = calculateConsistencyScore(topicAttempts);
    const finalScore = calculateFinalWeaknessScore(accuracy, speed, consistency);
    const level = getWeaknessLevel(finalScore);

    const topic = SEED_TOPICS.find((t) => t.id === topicId);
    const subj = topic ? SEED_SUBJECTS.find((s) => s.id === topic.subject_id) : undefined;
    const chap = topic ? SEED_CHAPTERS.find((c) => c.id === topic.chapter_id) : undefined;

    AppDataStore.weaknessScores.set(topicId, {
      id: topicId,
      student_id: AppDataStore.student.id,
      topic_id: topicId,
      subject_id: topic?.subject_id ?? 1,
      chapter_id: topic?.chapter_id ?? 1,
      total_attempts: topicAttempts.length,
      correct_count: correct,
      wrong_count: wrong,
      skipped_count: skipped,
      accuracy_score: accuracy,
      speed_score: speed,
      consistency_score: consistency,
      final_weakness_score: finalScore,
      weakness_level: level,
      avg_time_seconds: avgTime,
      last_attempted: topicAttempts[topicAttempts.length - 1].attempted_at,
      last_updated: new Date().toISOString(),
      topic,
      subject: subj,
      chapter: chap,
    });
  }

  static recordChatAttempt(data: {
    student_id: string;
    question_id?: number;
    subject_id: number;
    chapter_id: number;
    topic_id: number;
    selected_option: 'A' | 'B' | 'C' | 'D';
    is_correct: boolean;
    time_taken_seconds?: number;
    session_id?: string;
  }): StudentAttempt {
    const existingForTopic = AppDataStore.attempts.filter(a => a.topic_id === data.topic_id);
    const newAttempt: StudentAttempt = {
      id: AppDataStore.attempts.length + 1,
      student_id: data.student_id,
      question_id: data.question_id || 0,
      subject_id: data.subject_id,
      chapter_id: data.chapter_id,
      topic_id: data.topic_id,
      selected_option: data.selected_option,
      is_correct: data.is_correct,
      is_skipped: false,
      time_taken_seconds: data.time_taken_seconds || 30,
      attempt_source: 'chat_doubt',
      session_id: data.session_id || `chat-session-${Date.now()}`,
      attempt_number: existingForTopic.length + 1,
      attempted_at: new Date().toISOString(),
    };

    AppDataStore.attempts.push(newAttempt);
    AppDataStore.recalculateTopicScore(data.topic_id);
    return newAttempt;
  }

  static recordDoubt(
    studentId: string,
    doubtQuery: string,
    topicId?: number,
    subjectId?: number,
    chapterId?: number,
    language?: string,
    intent?: string,
    conversationId?: string,
    keywords: string[] = []
  ): DoubtTopicLog {
    const log: DoubtTopicLog = {
      id: AppDataStore.doubtLogs.length + 1,
      student_id: studentId,
      conversation_id: conversationId,
      subject_id: subjectId,
      chapter_id: chapterId,
      topic_id: topicId,
      doubt_query: doubtQuery,
      language,
      intent,
      detected_keywords: keywords,
      created_at: new Date().toISOString(),
    };
    AppDataStore.doubtLogs.push(log);
    return log;
  }

  static getOrCreateConversation(
    studentId: string,
    subjectId?: number | null,
    topicId?: number | null,
    title?: string
  ): ChatConversation {
    let conv = AppDataStore.chatConversations.find(
      (c) => c.student_id === studentId && !c.is_archived && (subjectId ? c.subject_id === subjectId : true)
    );
    if (!conv) {
      conv = {
        id: `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        student_id: studentId,
        subject_id: subjectId || null,
        topic_id: topicId || null,
        title: title || 'CUET Doubt Session',
        is_archived: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        messages_count: 0,
      };
      AppDataStore.chatConversations.unshift(conv);
    }
    return conv;
  }

  static addChatMessage(messageData: Omit<ChatMessage, 'id' | 'created_at'>): ChatMessage {
    const msg: ChatMessage = {
      ...messageData,
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
    };
    AppDataStore.chatMessages.push(msg);

    const conv = AppDataStore.chatConversations.find(c => c.id === messageData.conversation_id);
    if (conv) {
      conv.updated_at = new Date().toISOString();
      conv.last_message = msg.message_text.substring(0, 80);
      conv.messages_count = (conv.messages_count || 0) + 1;
    }

    return msg;
  }

  static getChatUsage(studentId: string, planType: 'free' | 'basic' | 'pro' | 'ultimate' = 'free', dailyLimit: number = 20): ChatUsageTracking {
    const today = new Date().toISOString().split('T')[0];
    const key = `${studentId}_${today}`;
    let usage = AppDataStore.chatUsage.get(key);
    if (!usage) {
      usage = {
        id: AppDataStore.chatUsage.size + 1,
        student_id: studentId,
        usage_date: today,
        message_count: 0,
        tokens_used: 0,
        plan_type: planType,
        daily_limit: dailyLimit,
        remaining: dailyLimit,
        is_limit_reached: false,
        reset_time_utc: new Date(new Date().setUTCHours(24, 0, 0, 0)).toISOString(),
      };
      AppDataStore.chatUsage.set(key, usage);
    }
    usage.remaining = Math.max(0, usage.daily_limit - usage.message_count);
    usage.is_limit_reached = usage.message_count >= usage.daily_limit;
    return usage;
  }

  static incrementChatUsage(
    studentId: string,
    tokens: number = 0,
    planType: 'free' | 'basic' | 'pro' | 'ultimate' = 'free',
    dailyLimit: number = 20
  ): { count: number; remaining: number; isLimitReached: boolean } {
    const usage = AppDataStore.getChatUsage(studentId, planType, dailyLimit);
    usage.message_count += 1;
    usage.tokens_used += tokens;
    usage.remaining = Math.max(0, usage.daily_limit - usage.message_count);
    usage.is_limit_reached = usage.message_count >= usage.daily_limit;
    return {
      count: usage.message_count,
      remaining: usage.remaining,
      isLimitReached: usage.is_limit_reached,
    };
  }

  // Module 4: Study Planner State
  static studyPlans: StudyPlan[] = [];
  static studyPlanDays: StudyPlanDay[] = [];
  static studyTasks: StudyTask[] = [];
  static studyStreaks: Map<string, StudyStreak> = new Map();
  static pushSubscriptions: PushSubscriptionData[] = [];
  static planGenerationLogs: PlanGenerationLog[] = [];

  static getActivePlan(studentId: string): StudyPlan | undefined {
    return AppDataStore.studyPlans.find(
      (p) => p.student_id === studentId && p.status === 'active'
    );
  }

  static getStreak(studentId: string): StudyStreak {
    let streak = AppDataStore.studyStreaks.get(studentId);
    if (!streak) {
      streak = {
        id: AppDataStore.studyStreaks.size + 1,
        student_id: studentId,
        current_streak: 7, // Seed with 7 days for realistic demo experience
        longest_streak: 14,
        last_study_date: new Date().toISOString().split('T')[0],
        streak_start_date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
        milestones_reached: [3, 7],
        total_study_days: 23,
        total_minutes_studied: 2840,
        updated_at: new Date().toISOString(),
      };
      AppDataStore.studyStreaks.set(studentId, streak);
    }
    return streak;
  }

  static completeTask(taskId: number, actualMinutes: number = 30): {
    task?: StudyTask;
    day?: StudyPlanDay;
    isDayComplete: boolean;
  } {
    const task = AppDataStore.studyTasks.find((t) => t.id === taskId);
    if (!task) return { isDayComplete: false };

    task.status = 'completed';
    task.actual_minutes = actualMinutes;
    task.completed_at = new Date().toISOString();

    const day = AppDataStore.studyPlanDays.find((d) => d.id === task.plan_day_id);
    let isDayComplete = false;

    if (day) {
      const dayTasks = AppDataStore.studyTasks.filter((t) => t.plan_day_id === day.id);
      const completed = dayTasks.filter((t) => t.status === 'completed');
      day.completed_minutes = dayTasks
        .filter((t) => t.status === 'completed')
        .reduce((sum, t) => sum + (t.actual_minutes || t.planned_minutes), 0);
      day.completion_percentage = Math.round((completed.length / Math.max(1, dayTasks.length)) * 100);
      day.is_day_complete = completed.length === dayTasks.length;
      isDayComplete = day.is_day_complete;
    }

    const plan = AppDataStore.studyPlans.find((p) => p.id === task.plan_id);
    if (plan) {
      const planTasks = AppDataStore.studyTasks.filter((t) => t.plan_id === plan.id);
      plan.completed_tasks = planTasks.filter((t) => t.status === 'completed').length;
      plan.completion_rate = Math.round((plan.completed_tasks / Math.max(1, planTasks.length)) * 100);
      plan.updated_at = new Date().toISOString();
    }

    // Update streak if student completed a task today
    AppDataStore.getStreak(task.student_id);

    return { task, day, isDayComplete };
  }

  // Module 5: Performance Analyzer State
  static mockTestSessions: MockTestSession[] = [];
  static mockTestAnalyses: MockTestAnalysis[] = [];
  static questionLevelAnalyses: QuestionLevelAnalysisRecord[] = [];
  static scoreHistories: ScoreHistoryRecord[] = [];

  static getMockSession(sessionId: string): MockTestSession | undefined {
    return AppDataStore.mockTestSessions.find((s) => s.id === sessionId);
  }

  static getAnalysis(analysisId: string): MockTestAnalysis | undefined {
    return AppDataStore.mockTestAnalyses.find((a) => a.id === analysisId);
  }

  static getAnalysisBySession(sessionId: string): MockTestAnalysis | undefined {
    return AppDataStore.mockTestAnalyses.find((a) => a.session_id === sessionId);
  }

  static saveMockSession(session: MockTestSession): MockTestSession {
    const idx = AppDataStore.mockTestSessions.findIndex((s) => s.id === session.id);
    if (idx >= 0) {
      AppDataStore.mockTestSessions[idx] = session;
    } else {
      AppDataStore.mockTestSessions.push(session);
    }
    return session;
  }

  static saveAnalysis(analysis: MockTestAnalysis): MockTestAnalysis {
    const idx = AppDataStore.mockTestAnalyses.findIndex((a) => a.id === analysis.id);
    if (idx >= 0) {
      AppDataStore.mockTestAnalyses[idx] = analysis;
    } else {
      AppDataStore.mockTestAnalyses.push(analysis);
    }
    return analysis;
  }

  static saveQuestionLevelAnalysis(records: QuestionLevelAnalysisRecord[]) {
    AppDataStore.questionLevelAnalyses.push(...records);
  }

  static saveScoreHistory(record: ScoreHistoryRecord) {
    AppDataStore.scoreHistories.push(record);
  }

  static getScoreHistory(studentId: string): ScoreHistoryRecord[] {
    return AppDataStore.scoreHistories
      .filter((h) => h.student_id === studentId)
      .sort((a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime());
  }

  static initialize() {

    if (AppDataStore.weaknessScores.size > 0) return;

    // Pre-calculate initial weakness scores
    for (const topic of SEED_TOPICS) {
      const topicAttempts = AppDataStore.attempts.filter((a) => a.topic_id === topic.id);
      if (topicAttempts.length === 0) continue;

      const correct = topicAttempts.filter((a) => a.is_correct).length;
      const wrong = topicAttempts.filter((a) => !a.is_correct && !a.is_skipped).length;
      const skipped = topicAttempts.filter((a) => a.is_skipped).length;
      const totalTime = topicAttempts.reduce((sum, a) => sum + a.time_taken_seconds, 0);
      const avgTime = topicAttempts.length > 0 ? totalTime / topicAttempts.length : 0;

      const accuracy = calculateAccuracyScore(correct, wrong, skipped);
      const speed = calculateSpeedScore(avgTime, "medium");
      const consistency = calculateConsistencyScore(topicAttempts);
      const finalScore = calculateFinalWeaknessScore(accuracy, speed, consistency);
      const level = getWeaknessLevel(finalScore);

      const subj = SEED_SUBJECTS.find((s) => s.id === topic.subject_id);
      const chap = SEED_CHAPTERS.find((c) => c.id === topic.chapter_id);

      AppDataStore.weaknessScores.set(topic.id, {
        id: topic.id,
        student_id: AppDataStore.student.id,
        topic_id: topic.id,
        subject_id: topic.subject_id,
        chapter_id: topic.chapter_id,
        total_attempts: topicAttempts.length,
        correct_count: correct,
        wrong_count: wrong,
        skipped_count: skipped,
        accuracy_score: accuracy,
        speed_score: speed,
        consistency_score: consistency,
        final_weakness_score: finalScore,
        weakness_level: level,
        avg_time_seconds: avgTime,
        last_attempted: topicAttempts[topicAttempts.length - 1].attempted_at,
        last_updated: new Date().toISOString(),
        topic,
        subject: subj,
        chapter: chap,
      });
    }

    // Seed Score History (5 previous mocks for trend)
    if (AppDataStore.scoreHistories.length === 0) {
      const pastMocks = [
        { test_number: 1, daysAgo: 28, raw_score: 118, percentage: 59, accuracy: 64 },
        { test_number: 2, daysAgo: 21, raw_score: 125, percentage: 62.5, accuracy: 67 },
        { test_number: 3, daysAgo: 14, raw_score: 131, percentage: 65.5, accuracy: 70 },
        { test_number: 4, daysAgo: 8, raw_score: 138, percentage: 69, accuracy: 73 },
        { test_number: 5, daysAgo: 3, raw_score: 142, percentage: 71, accuracy: 75 },
      ];
      pastMocks.forEach((m) => {
        AppDataStore.scoreHistories.push({
          id: m.test_number,
          student_id: AppDataStore.student.id,
          session_id: `seed-mock-session-${m.test_number}`,
          test_number: m.test_number,
          test_date: new Date(Date.now() - m.daysAgo * 86400000).toISOString().split('T')[0],
          test_type: 'full_mock',
          raw_score: m.raw_score,
          max_score: 200,
          percentage: m.percentage,
          accuracy: m.accuracy,
          subject_scores: { 1: Math.round(m.raw_score * 0.35), 2: Math.round(m.raw_score * 0.3), 3: Math.round(m.raw_score * 0.35) },
          created_at: new Date(Date.now() - m.daysAgo * 86400000).toISOString(),
        });
      });
    }

    // Seed a completed mock test session (Mock #6)
    if (AppDataStore.mockTestSessions.length === 0) {
      const demoSessionId = 'demo-mock-session-6';
      AppDataStore.mockTestSessions.push({
        id: demoSessionId,
        student_id: AppDataStore.student.id,
        session_name: 'Mock Test #6 — Full CUET CBT',
        test_number: 6,
        test_type: 'full_mock',
        subjects_tested: [1, 2, 3],
        started_at: new Date(Date.now() - 45 * 60000).toISOString(),
        completed_at: new Date().toISOString(),
        total_duration_seconds: 2400,
        total_questions: 50,
        attempted_count: 42,
        correct_count: 33,
        wrong_count: 9,
        skipped_count: 8,
        raw_score: 156,
        max_possible_score: 250,
        percentage_score: 62.4,
        analysis_status: 'completed',
        rank_estimate: 4200,
        percentile: 96.5,
        created_at: new Date().toISOString(),
      });

      // Generate 50 attempts for demoSessionId
      const topicsPool = SEED_TOPICS;
      for (let i = 1; i <= 50; i++) {
        const t = topicsPool[(i - 1) % topicsPool.length];
        const isSkipped = i > 42;
        const isCorrect = isSkipped ? null : i % 5 !== 0; // ~80% correct
        const timeTaken = isSkipped ? 5 : 20 + ((i * 7) % 55);
        AppDataStore.attempts.push({
          id: AppDataStore.attempts.length + 1,
          student_id: AppDataStore.student.id,
          question_id: (i % 8) + 1,
          subject_id: t.subject_id,
          chapter_id: t.chapter_id,
          topic_id: t.id,
          selected_option: isSkipped ? undefined : (['A', 'B', 'C', 'D'][i % 4] as any),
          is_correct: isCorrect === null ? null : isCorrect,
          is_skipped: isSkipped,
          time_taken_seconds: timeTaken,
          attempt_source: 'mock_test',
          session_id: demoSessionId,
          attempt_number: 1,
          attempted_at: new Date(Date.now() - (50 - i) * 45000).toISOString(),
        });
      }
    }
  }
}

AppDataStore.initialize();
