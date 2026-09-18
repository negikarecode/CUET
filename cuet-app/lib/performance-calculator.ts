import { supabase as defaultSupabase } from './supabase';
import { AppDataStore, SEED_QUESTIONS, SEED_SUBJECTS, SEED_CHAPTERS, SEED_TOPICS } from './data-store';
import {
  PerformanceMetrics,
  SubjectMetrics,
  ChapterMetrics,
  TopicMetrics,
  DifficultyMetrics,
  MistakePatterns,
  QuestionLevelAnalysisRecord as QuestionLevelAnalysis,
} from './types';

export type { PerformanceMetrics };

// ─────────────────────────────────────────────────────
// CUET Marking Scheme (Official NTA Rules 2025-26)
// ─────────────────────────────────────────────────────
export const CUET_MARKING = {
  CORRECT: +5,
  WRONG:   -1,
  SKIPPED:  0,
};

export interface AttemptData {
  question_id: number;
  subject_id: number;
  chapter_id: number;
  topic_id: number;
  selected_option: string | null;
  is_correct: boolean | null;
  is_skipped: boolean;
  time_taken_seconds: number;
  difficulty: string;
  correct_option: string;
}

// ─────────────────────────────────────────────────────
// MAIN: Calculate ALL metrics for a test session
// ─────────────────────────────────────────────────────
export async function calculateAllMetrics(
  sessionId: string,
  studentId: string,
  supabaseClient?: any
): Promise<PerformanceMetrics> {
  const sb = supabaseClient || defaultSupabase;

  let rawAttempts: any[] = [];

  // Try Supabase first if available
  if (sb) {
    try {
      const { data } = await sb
        .from('student_attempts')
        .select(`
          *,
          question:questions(
            id, difficulty, correct_option,
            subject_id, chapter_id, topic_id
          )
        `)
        .eq('session_id', sessionId)
        .eq('student_id', studentId)
        .eq('attempt_source', 'mock_test')
        .order('attempted_at', { ascending: true });

      if (data && data.length > 0) {
        rawAttempts = data;
      }
    } catch (err) {
      console.warn('[PerformanceCalculator] Supabase fetch fallback to AppDataStore:', err);
    }
  }

  // In-memory fallback if no DB attempts found
  if (rawAttempts.length === 0) {
    rawAttempts = AppDataStore.attempts
      .filter((a) => a.session_id === sessionId && a.student_id === studentId)
      .map((a) => {
        const q = SEED_QUESTIONS.find((sq) => sq.id === a.question_id) || {
          id: a.question_id,
          difficulty: 'medium',
          correct_option: 'B',
          subject_id: a.subject_id,
          chapter_id: a.chapter_id,
          topic_id: a.topic_id,
        };
        return {
          ...a,
          question: q,
        };
      });
  }

  if (rawAttempts.length === 0) {
    throw new Error(`No attempts found for session ${sessionId}`);
  }

  const totalQ = rawAttempts.length;

  // ── BASIC COUNTS ─────────────────────────────────
  const correct = rawAttempts.filter((a) => a.is_correct === true).length;
  const wrong = rawAttempts.filter(
    (a) => a.is_correct === false && !a.is_skipped
  ).length;
  const skipped = rawAttempts.filter((a) => a.is_skipped).length;
  const attempted = correct + wrong;

  // ── CUET SCORE ────────────────────────────────────
  const rawScore = correct * CUET_MARKING.CORRECT + wrong * CUET_MARKING.WRONG;
  const maxScore = totalQ * CUET_MARKING.CORRECT;
  const percentage = maxScore > 0
    ? Math.round((rawScore / maxScore) * 100 * 100) / 100
    : 0;
  const accuracyRate = attempted > 0
    ? Math.round((correct / attempted) * 100 * 100) / 100
    : 0;
  const attemptRate = Math.round((attempted / totalQ) * 100 * 100) / 100;

  // ── TIME METRICS ──────────────────────────────────
  const timeValues = rawAttempts
    .map((a) => a.time_taken_seconds || 0)
    .filter((t) => t > 0);

  const totalTime = timeValues.reduce((sum, t) => sum + t, 0);
  const avgTime = timeValues.length > 0 ? totalTime / timeValues.length : 0;

  const correctTimes = rawAttempts
    .filter((a) => a.is_correct)
    .map((a) => a.time_taken_seconds || 0);
  const wrongTimes = rawAttempts
    .filter((a) => a.is_correct === false && !a.is_skipped)
    .map((a) => a.time_taken_seconds || 0);

  const avgTimeCorrect = correctTimes.length > 0
    ? correctTimes.reduce((s, t) => s + t, 0) / correctTimes.length
    : 0;
  const avgTimeWrong = wrongTimes.length > 0
    ? wrongTimes.reduce((s, t) => s + t, 0) / wrongTimes.length
    : 0;

  const fastestQ = timeValues.length > 0 ? Math.min(...timeValues) : 0;
  const slowestQ = timeValues.length > 0 ? Math.max(...timeValues) : 0;

  // Time wasted = time spent on wrong answers (which could have been skipped)
  const timeWasted = wrongTimes.reduce((s, t) => s + t, 0);

  // ── SUBJECT BREAKDOWN ─────────────────────────────
  const subjectIds = Array.from(new Set(rawAttempts.map((a) => a.subject_id)));
  const subject_breakdown: SubjectMetrics[] = subjectIds.map((sid) => {
    const subAttempts = rawAttempts.filter((a) => a.subject_id === sid);
    const subCorrect = subAttempts.filter((a) => a.is_correct).length;
    const subWrong = subAttempts.filter(
      (a) => a.is_correct === false && !a.is_skipped
    ).length;
    const subSkipped = subAttempts.filter((a) => a.is_skipped).length;
    const subAttempted = subCorrect + subWrong;
    const subScore = subCorrect * CUET_MARKING.CORRECT + subWrong * CUET_MARKING.WRONG;
    const subMax = subAttempts.length * CUET_MARKING.CORRECT;

    // Find strongest and weakest chapter
    const chapterIds = Array.from(new Set(subAttempts.map((a) => a.chapter_id)));
    let strongestChapter = '';
    let weakestChapter = '';
    let highestAcc = -1;
    let lowestAcc = 101;

    chapterIds.forEach((cid) => {
      const cAttempts = subAttempts.filter((a) => a.chapter_id === cid);
      const cCorrect = cAttempts.filter((a) => a.is_correct).length;
      const cAttempted = cAttempts.filter((a) => !a.is_skipped).length;
      const cAcc = cAttempted > 0 ? (cCorrect / cAttempted) * 100 : 0;
      const cObj = SEED_CHAPTERS.find((ch) => ch.id === cid);
      const cName = cObj ? cObj.chapter_name : `Chapter ${cid}`;
      if (cAcc > highestAcc) {
        highestAcc = cAcc;
        strongestChapter = cName;
      }
      if (cAcc < lowestAcc) {
        lowestAcc = cAcc;
        weakestChapter = cName;
      }
    });

    const subTimes = subAttempts.map((a) => a.time_taken_seconds || 0);
    const subAvgTime = subTimes.length > 0
      ? subTimes.reduce((s, t) => s + t, 0) / subTimes.length
      : 0;

    const subjMeta = SEED_SUBJECTS.find((s) => s.id === sid);

    return {
      subject_id: sid,
      subject_name: subjMeta?.name || `Subject ${sid}`,
      total_questions: subAttempts.length,
      correct: subCorrect,
      wrong: subWrong,
      skipped: subSkipped,
      raw_score: subScore,
      max_score: subMax,
      percentage: subMax > 0 ? Math.round((subScore / subMax) * 100) : 0,
      accuracy: subAttempted > 0 ? Math.round((subCorrect / subAttempted) * 100) : 0,
      avg_time_seconds: Math.round(subAvgTime),
      strongest_chapter: strongestChapter || 'General',
      weakest_chapter: weakestChapter || 'General',
    };
  });

  // ── CHAPTER BREAKDOWN ─────────────────────────────
  const chapterIds = Array.from(new Set(rawAttempts.map((a) => a.chapter_id)));
  const chapter_breakdown: ChapterMetrics[] = chapterIds.map((cid) => {
    const cAttempts = rawAttempts.filter((a) => a.chapter_id === cid);
    const cCorrect = cAttempts.filter((a) => a.is_correct).length;
    const cWrong = cAttempts.filter(
      (a) => a.is_correct === false && !a.is_skipped
    ).length;
    const cSkipped = cAttempts.filter((a) => a.is_skipped).length;
    const cAttempted = cCorrect + cWrong;
    const cTimes = cAttempts.map((a) => a.time_taken_seconds || 0);
    const chMeta = SEED_CHAPTERS.find((ch) => ch.id === cid);

    return {
      chapter_id: cid,
      chapter_name: chMeta?.chapter_name || `Chapter ${cid}`,
      subject_id: cAttempts[0]?.subject_id || 1,
      total_questions: cAttempts.length,
      correct: cCorrect,
      wrong: cWrong,
      skipped: cSkipped,
      raw_score: cCorrect * 5 - cWrong * 1,
      accuracy: cAttempted > 0 ? Math.round((cCorrect / cAttempted) * 100) : 0,
      avg_time_seconds: cTimes.length > 0
        ? Math.round(cTimes.reduce((s, t) => s + t, 0) / cTimes.length)
        : 0,
    };
  });

  // ── TOPIC BREAKDOWN ───────────────────────────────
  const topicIds = Array.from(
    new Set(rawAttempts.map((a) => a.topic_id).filter(Boolean))
  );
  const topic_breakdown: TopicMetrics[] = topicIds.map((tid) => {
    const tAttempts = rawAttempts.filter((a) => a.topic_id === tid);
    const tCorrect = tAttempts.filter((a) => a.is_correct).length;
    const tWrong = tAttempts.filter(
      (a) => a.is_correct === false && !a.is_skipped
    ).length;
    const tAttempted = tCorrect + tWrong;
    const accuracy = tAttempted > 0 ? Math.round((tCorrect / tAttempted) * 100) : 0;
    const tTimes = tAttempts.map((a) => a.time_taken_seconds || 0);

    let weaknessSignal: TopicMetrics['weakness_signal'];
    if (accuracy < 40) weaknessSignal = 'critical';
    else if (accuracy < 55) weaknessSignal = 'weak';
    else if (accuracy < 70) weaknessSignal = 'average';
    else weaknessSignal = 'strong';

    const tMeta = SEED_TOPICS.find((t) => t.id === tid);

    return {
      topic_id: tid,
      topic_name: tMeta?.topic_name || `Topic ${tid}`,
      chapter_id: tAttempts[0]?.chapter_id || 1,
      subject_id: tAttempts[0]?.subject_id || 1,
      total_questions: tAttempts.length,
      correct: tCorrect,
      wrong: tWrong,
      accuracy,
      avg_time_seconds: tTimes.length > 0
        ? Math.round(tTimes.reduce((s, t) => s + t, 0) / tTimes.length)
        : 0,
      weakness_signal: weaknessSignal,
    };
  });

  // ── DIFFICULTY BREAKDOWN ──────────────────────────
  const buildDiffMetrics = (diff: string): DifficultyMetrics => {
    const dAttempts = rawAttempts.filter(
      (a) => (a.question?.difficulty || 'medium') === diff
    );
    const dCorrect = dAttempts.filter((a) => a.is_correct).length;
    const dWrong = dAttempts.filter(
      (a) => a.is_correct === false && !a.is_skipped
    ).length;
    const dSkipped = dAttempts.filter((a) => a.is_skipped).length;
    const dAttempted = dCorrect + dWrong;
    const dTimes = dAttempts.map((a) => a.time_taken_seconds || 0);

    return {
      total: dAttempts.length,
      correct: dCorrect,
      wrong: dWrong,
      skipped: dSkipped,
      accuracy: dAttempted > 0 ? Math.round((dCorrect / dAttempted) * 100) : 0,
      avg_time: dTimes.length > 0
        ? Math.round(dTimes.reduce((s, t) => s + t, 0) / dTimes.length)
        : 0,
    };
  };

  const difficulty_breakdown = {
    easy:   buildDiffMetrics('easy'),
    medium: buildDiffMetrics('medium'),
    hard:   buildDiffMetrics('hard'),
  };

  // ── QUESTION LEVEL ANALYSIS ───────────────────────
  const sortedByTime = [...rawAttempts].sort(
    (a, b) => (a.time_taken_seconds || 0) - (b.time_taken_seconds || 0)
  );
  const timeRankMap = new Map(
    sortedByTime.map((a, i) => [a.question_id, i + 1])
  );

  // Get previous mock attempts for repeated mistake detection
  let prevWrongTopics = new Set<number>();
  if (sb) {
    try {
      const { data: prevAttempts } = await sb
        .from('student_attempts')
        .select('topic_id, is_correct')
        .eq('student_id', studentId)
        .eq('attempt_source', 'mock_test')
        .neq('session_id', sessionId)
        .eq('is_correct', false);

      if (prevAttempts) {
        prevWrongTopics = new Set(prevAttempts.map((a: any) => a.topic_id));
      }
    } catch {}
  }

  if (prevWrongTopics.size === 0) {
    AppDataStore.attempts
      .filter(
        (a) =>
          a.student_id === studentId &&
          a.session_id !== sessionId &&
          a.is_correct === false
      )
      .forEach((a) => prevWrongTopics.add(a.topic_id));
  }

  const question_level: QuestionLevelAnalysis[] = rawAttempts.map((a, index) => {
    const time = a.time_taken_seconds || 0;
    const diff = a.question?.difficulty || 'medium';
    const avgTimeMap: Record<string, number> = { easy: 30, medium: 45, hard: 65 };
    const avgTimeForDiff = avgTimeMap[diff] || 45;

    // Careless mistake: took normal/moderate time but wrong
    const isCareless =
      !a.is_correct &&
      !a.is_skipped &&
      time >= avgTimeForDiff * 0.7 &&
      time <= avgTimeForDiff * 1.3;

    // Time pressure mistake: took very long (> 1.8x average) then got wrong
    const isTimePressure =
      !a.is_correct && !a.is_skipped && time > avgTimeForDiff * 1.8;

    // Repeated mistake: wrong in this test AND previous tests
    const isRepeated = !a.is_correct && prevWrongTopics.has(a.topic_id);

    // Lucky guess: correct but very fast (< 10 seconds)
    const isGuessed = a.is_correct === true && time < 10;

    return {
      session_id: sessionId,
      student_id: studentId,
      analysis_id: '',
      question_id: a.question_id,
      question_number: index + 1,
      subject_id: a.subject_id,
      chapter_id: a.chapter_id,
      topic_id: a.topic_id,
      is_correct: a.is_correct || false,
      is_skipped: a.is_skipped || false,
      time_taken_seconds: time,
      difficulty: diff,
      marks_earned: a.is_correct ? 5 : a.is_skipped ? 0 : -1,
      time_rank: timeRankMap.get(a.question_id) || index + 1,
      is_careless_mistake: isCareless,
      is_time_pressure_mistake: isTimePressure,
      is_repeated_mistake: isRepeated,
      is_guessed_correctly: isGuessed,
    };
  });

  // ── MISTAKE PATTERNS ──────────────────────────────
  const carelessOnes = question_level.filter((q) => q.is_careless_mistake);
  const timePressureOnes = question_level.filter((q) => q.is_time_pressure_mistake);
  const repeatedOnes = question_level.filter((q) => q.is_repeated_mistake);
  const guessedOnes = question_level.filter((q) => q.is_guessed_correctly);

  const conceptualGapTopics = topic_breakdown
    .filter((t) => t.accuracy < 40 && t.total_questions >= 2)
    .map((t) => t.topic_id);

  const mistake_patterns: MistakePatterns = {
    careless_mistakes: carelessOnes.length,
    careless_question_ids: carelessOnes.map((q) => q.question_id),
    conceptual_gaps: conceptualGapTopics.length,
    conceptual_gap_topics: conceptualGapTopics,
    time_pressure_mistakes: timePressureOnes.length,
    time_pressure_question_ids: timePressureOnes.map((q) => q.question_id),
    repeated_mistakes: repeatedOnes.length,
    repeated_mistake_topics: Array.from(new Set(repeatedOnes.map((q) => q.topic_id))),
    lucky_guesses: guessedOnes.length,
    lucky_guess_question_ids: guessedOnes.map((q) => q.question_id),
  };

  return {
    raw_score: rawScore,
    max_possible_score: maxScore,
    percentage,
    accuracy_rate: accuracyRate,
    attempt_rate: attemptRate,
    total_questions: totalQ,
    attempted,
    correct,
    wrong,
    skipped,
    total_time_seconds: totalTime,
    avg_time_per_question: Math.round(avgTime),
    avg_time_correct: Math.round(avgTimeCorrect),
    avg_time_wrong: Math.round(avgTimeWrong),
    avg_time_skipped: 0,
    fastest_question_seconds: fastestQ || 0,
    slowest_question_seconds: slowestQ || 0,
    time_wasted_seconds: timeWasted,
    time_per_subject: Object.fromEntries(
      subjectIds.map((sid) => [
        sid,
        rawAttempts
          .filter((a) => a.subject_id === sid)
          .reduce((s, a) => s + (a.time_taken_seconds || 0), 0),
      ])
    ),
    subject_breakdown,
    chapter_breakdown,
    topic_breakdown,
    difficulty_breakdown,
    mistake_patterns,
    question_level,
  };
}
