import { TopicTimeAllocation, DayPlan, TaskPlan, TaskPriority, TaskType } from './types';
import { addDays, format, isSunday } from 'date-fns';

// ─────────────────────────────────────────────────────
// Daily tips pool
// ─────────────────────────────────────────────────────
export const DAILY_TIPS = [
  "Start with your most critical topic when your mind is fresh!",
  "Take a 5-minute break every 45 minutes. Your brain needs rest.",
  "After each topic, try to explain it in your own words.",
  "CUET tip: For uncertain answers, use elimination method.",
  "Drink water, eat well. Physical health = mental sharpness.",
  "Review yesterday's wrong answers before starting today.",
  "Consistency beats intensity. 4 hours daily > 12 hours once a week.",
  "Mock tests are not for testing knowledge — they're for building exam stamina.",
  "Sleep 7-8 hours. Memory consolidation happens during sleep.",
  "One topic at a time. Multitasking kills retention.",
];

export const MOTIVATIONAL_QUOTES = [
  "\"CUET jita wahi hai jo consistent rehta hai.\"",
  "\"Small progress every day adds up to big results.\"",
  "\"Your future self will thank you for studying today.\"",
  "\"DU/JNU ka sapna — bas ek exam door hai.\"",
  "\"Don't count the days, make the days count.\"",
  "\"Excellence is not an event, it's a habit.\"",
  "\"Padho, practice karo, pakke ho jao.\"",
  "\"Every expert was once a beginner. Keep going.\"",
];

// ─────────────────────────────────────────────────────
// Build complete day-by-day schedule
// ─────────────────────────────────────────────────────
export function buildCompleteSchedule(params: {
  startDate: Date;
  examDate: Date;
  daysToExam: number;
  dailyMinutes: number;
  prioritizedTopics: TopicTimeAllocation[];
  selectedSubjectIds: number[];
}): DayPlan[] {
  
  const {
    startDate, daysToExam,
    dailyMinutes, prioritizedTopics
  } = params;
  
  const schedule: DayPlan[] = [];
  const effectiveDays = Math.max(1, daysToExam);
  
  // ── PHASE PLANNING ────────────────────────────────
  const revisionDays = Math.max(Math.min(7, effectiveDays), Math.floor(effectiveDays * 0.2));
  
  // ── TOPIC QUEUE ───────────────────────────────────
  const sessionQueue: TopicTimeAllocation[] = [];
  for (const topic of prioritizedTopics) {
    for (let s = 0; s < topic.sessions_needed; s++) {
      sessionQueue.push({ ...topic });
    }
  }
  
  // ── BUILD EACH DAY ────────────────────────────────
  let sessionIndex = 0;
  
  for (let day = 0; day < effectiveDays; day++) {
    const currentDate = addDays(startDate, day);
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const dayNumber = day + 1;
    const daysRemaining = effectiveDays - day;
    
    // Determine day type
    let dayType: DayPlan['day_type'];
    
    if (day === effectiveDays - 1) {
      dayType = 'exam_day';
    } else if (daysRemaining <= revisionDays) {
      dayType = day % 3 === 0 ? 'mock_test' : 'revision';
    } else if (isSunday(currentDate)) {
      dayType = 'light';
    } else if (day % 7 === 6 && day > 0) {
      dayType = 'mock_test';
    } else if (day % 7 === 5) {
      dayType = 'revision';
    } else {
      dayType = 'study';
    }
    
    const tipIndex = day % DAILY_TIPS.length;
    const quoteIndex = day % MOTIVATIONAL_QUOTES.length;
    
    const tasks: TaskPlan[] = [];
    let minutesUsed = 0;
    const availableMinutes = getDayMinutes(dayType, dailyMinutes);
    
    // ── BUILD TASKS FOR THIS DAY ──────────────────
    
    if (dayType === 'exam_day') {
      tasks.push({
        task_order:       1,
        task_type:        'revision',
        subject_id:       0,
        chapter_id:       0,
        topic_id:         null,
        title:            '🎓 Exam Day — You\'ve got this!',
        description:      'Light revision only. Review your notes. Eat well, sleep early. You\'ve prepared hard for this moment. Trust yourself!',
        planned_minutes:  30,
        priority:         'high',
        target_questions: 0,
        target_accuracy:  0,
        link_url:         '/dashboard',
        link_label:       'View your progress',
      });
      
    } else if (dayType === 'mock_test') {
      tasks.push({
        task_order:       1,
        task_type:        'mock_test',
        subject_id:       0,
        chapter_id:       0,
        topic_id:         null,
        title:            '📝 Full Mock Test — All Subjects',
        description:      'Simulate real CUET conditions. No pausing, no checking notes. 50 questions per subject, 60 min each. After test: review ALL wrong answers.',
        planned_minutes:  120,
        priority:         'critical',
        target_questions: 50,
        target_accuracy:  70,
        link_url:         '/practice/ai/4',
        link_label:       'Start Mock Test',
      });
      
      tasks.push({
        task_order:       2,
        task_type:        'revision',
        subject_id:       0,
        chapter_id:       0,
        topic_id:         null,
        title:            '🔍 Mock Test Analysis',
        description:      'Review every wrong answer. Note the topic. Add to your weak list. This is the most important part of mock tests!',
        planned_minutes:  45,
        priority:         'high',
        target_questions: 0,
        target_accuracy:  0,
        link_url:         '/weakness',
        link_label:       'Analyse Results',
      });
      
    } else if (dayType === 'revision') {
      tasks.push({
        task_order:       1,
        task_type:        'revision',
        subject_id:       0,
        chapter_id:       0,
        topic_id:         null,
        title:            '🔄 Revision Day',
        description:      'Go through your notes for topics covered in the last 7 days. Focus on things you got wrong in practice.',
        planned_minutes:  Math.round(dailyMinutes * 0.6),
        priority:         'high',
        target_questions: 20,
        target_accuracy:  80,
        link_url:         '/practice/ai/4',
        link_label:       'Start Revision',
      });
      
      tasks.push({
        task_order:       2,
        task_type:        'speed_drill',
        subject_id:       0,
        chapter_id:       0,
        topic_id:         null,
        title:            '⚡ Speed Drill — 30 Questions in 20 Min',
        description:      'Mixed questions from all topics. Practice answering fast (40 sec/question). This builds CUET exam stamina.',
        planned_minutes:  20,
        priority:         'medium',
        target_questions: 30,
        target_accuracy:  65,
        link_url:         '/practice/ai/4',
        link_label:       'Start Speed Drill',
      });
      
    } else if (dayType === 'light') {
      if (sessionQueue.length > 0) {
        const topic = sessionQueue[sessionIndex % sessionQueue.length];
        tasks.push(buildStudyTask(topic, 1, 45));
        minutesUsed = 45;
        sessionIndex++;
      }
      
      tasks.push({
        task_order:       2,
        task_type:        'doubt_solving',
        subject_id:       0,
        chapter_id:       0,
        topic_id:         null,
        title:            '💬 Quick CUETBot Session',
        description:      'Ask CUETBot about anything confusing from this week. Use this relaxed Sunday to clear pending doubts.',
        planned_minutes:  20,
        priority:         'low',
        target_questions: 0,
        target_accuracy:  0,
        link_url:         '/chat',
        link_label:       'Open CUETBot',
      });
      
    } else {
      // Regular study day
      let taskOrder = 1;
      
      if (day > 0) {
        tasks.push({
          task_order:       taskOrder++,
          task_type:        'revision',
          subject_id:       0,
          chapter_id:       0,
          topic_id:         null,
          title:            '🔄 Quick Warm-up: Yesterday\'s Review',
          description:      'Spend 15 minutes reviewing yesterday\'s wrong answers before starting today\'s plan.',
          planned_minutes:  15,
          priority:         'high',
          target_questions: 10,
          target_accuracy:  80,
          link_url:         '/weakness',
          link_label:       'Review Wrong Answers',
        });
        minutesUsed += 15;
      }
      
      let lastSubjectId = -1;
      let attempts = 0;
      const maxAttempts = sessionQueue.length;
      const hasAlternativeSubject = sessionQueue.some((t) => t.subject_id !== lastSubjectId);

      while (
        minutesUsed < availableMinutes - 20 && 
        sessionQueue.length > 0 &&
        attempts < maxAttempts * 2
      ) {
        attempts++;
        const topic = sessionQueue[sessionIndex % sessionQueue.length];
        
        // Avoid scheduling same subject back to back ONLY if an alternative subject is available in queue
        if (topic.subject_id === lastSubjectId && hasAlternativeSubject && attempts <= maxAttempts) {
          sessionIndex++;
          continue;
        }
        
        if (minutesUsed + topic.minutes_per_session > availableMinutes) {
          break;
        }
        
        tasks.push(buildStudyTask(topic, taskOrder++, topic.minutes_per_session));
        minutesUsed += topic.minutes_per_session;
        lastSubjectId = topic.subject_id;
        sessionIndex++;
        
        // Add 5-min break between tasks
        if (minutesUsed < availableMinutes - 35) {
          tasks.push(buildBreakTask(taskOrder++));
          minutesUsed += 5;
        }

        if (sessionIndex >= sessionQueue.length && dayNumber < effectiveDays - revisionDays) {
          // Loop around to maintain full days coverage
          sessionIndex = 0;
        }
      }
      
      // End-of-day doubt solving with CUETBot
      if (minutesUsed < availableMinutes - 10) {
        tasks.push({
          task_order:       taskOrder++,
          task_type:        'doubt_solving',
          subject_id:       0,
          chapter_id:       0,
          topic_id:         null,
          title:            '💬 End-of-Day: Ask CUETBot Anything',
          description:      'Anything confusing from today\'s study? Ask CUETBot now. Don\'t let doubts pile up!',
          planned_minutes:  15,
          priority:         'medium',
          target_questions: 0,
          target_accuracy:  0,
          link_url:         '/chat',
          link_label:       'Open CUETBot',
        });
      }
    }
    
    schedule.push({
      date:         dateStr,
      day_number:   dayNumber,
      day_type:     dayType,
      tasks,
      total_minutes: tasks.reduce(
        (sum, t) => sum + (t.planned_minutes || 0), 0
      ),
      daily_tip:    DAILY_TIPS[tipIndex],
      daily_quote:  MOTIVATIONAL_QUOTES[quoteIndex],
    });
  }
  
  return schedule;
}

function buildStudyTask(
  topic: TopicTimeAllocation,
  order: number,
  minutes: number
): TaskPlan {
  
  const taskType: TaskType = topic.weakness_level === 'critical' || topic.weakness_level === 'weak'
    ? 'ai_practice'
    : topic.weakness_level === 'untested'
    ? 'notes_review'
    : 'practice';
  
  const emoji = {
    critical: '🔴',
    weak:     '🟠',
    average:  '🟡',
    strong:   '🟢',
    excellent:'✅',
    untested: '⬜',
  }[topic.weakness_level] || '📚';
  
  const targetQ = Math.max(5, Math.floor(minutes / 2));
  
  const targetAcc = {
    critical: 45,
    weak:     60,
    average:  70,
    strong:   80,
    excellent:85,
    untested: 55,
  }[topic.weakness_level] || 60;
  
  const priority: TaskPriority = topic.weakness_level === 'critical' ? 'critical'
    : topic.weakness_level === 'weak' ? 'high'
    : topic.weakness_level === 'average' ? 'medium'
    : 'low';

  return {
    task_order:       order,
    task_type:        taskType,
    subject_id:       topic.subject_id,
    chapter_id:       topic.chapter_id,
    topic_id:         topic.topic_id,
    title:            `${emoji} ${topic.topic_name} — ${topic.subject_name}`,
    description:      buildTaskDescription(topic, minutes, targetQ, targetAcc),
    planned_minutes:  minutes,
    priority,
    target_questions: targetQ,
    target_accuracy:  targetAcc,
    link_url:         taskType === 'ai_practice'
                    ? `/practice/ai/${topic.topic_id}`
                    : `/practice/ai/${topic.topic_id}`,
    link_label:       taskType === 'ai_practice'
                    ? 'Start AI Practice'
                    : taskType === 'notes_review'
                    ? 'Read Notes'
                    : 'Start Practice',
  };
}

function buildTaskDescription(
  topic: TopicTimeAllocation,
  minutes: number,
  targetQ: number,
  targetAcc: number
): string {
  const levelMessages: Record<string, string> = {
    critical: `⚠️ Critical weak area! Current score: ${Math.round(topic.weakness_score)}/100. Do ${targetQ} AI questions. Target: ${targetAcc}% accuracy. Ask CUETBot if anything is confusing.`,
    weak:     `This topic needs work. Current score: ${Math.round(topic.weakness_score)}/100. Do ${targetQ} questions. Target: ${targetAcc}% accuracy.`,
    average:  `Keep improving! Current score: ${Math.round(topic.weakness_score)}/100. Complete ${targetQ} practice questions today.`,
    strong:   `You're good here! Quick revision — ${targetQ} questions to maintain high retention.`,
    excellent:`Quick ${minutes}-min review to stay sharp for CUET.`,
    untested: `New topic! Start by reading the chapter notes, then try ${targetQ} basic questions.`,
  };
  
  return levelMessages[topic.weakness_level] || `Practice ${targetQ} questions on ${topic.topic_name}.`;
}

function buildBreakTask(order: number): TaskPlan {
  return {
    task_order:       order,
    task_type:        'break',
    subject_id:       0,
    chapter_id:       0,
    topic_id:         null,
    title:            '☕ Short Break (5 min)',
    description:      'Stretch, drink water, rest your eyes. Short breaks improve retention!',
    planned_minutes:  5,
    priority:         'low',
    target_questions: 0,
    target_accuracy:  0,
    link_url:         '',
    link_label:       '',
  };
}

function getDayMinutes(
  dayType: string,
  defaultMinutes: number
): number {
  switch (dayType) {
    case 'study':     return defaultMinutes;
    case 'revision':  return Math.round(defaultMinutes * 0.8);
    case 'mock_test': return defaultMinutes;
    case 'light':     return Math.round(defaultMinutes * 0.5);
    case 'rest':      return 0;
    case 'exam_day':  return 30;
    default:          return defaultMinutes;
  }
}
