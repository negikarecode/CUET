import { ChatIntent } from './types';
import { SEED_SUBJECTS, SEED_TOPICS } from './data-store';

export interface IntentAnalysisResult {
  intent: ChatIntent;
  confidence: number;
  detectedSubjectId?: number;
  detectedTopicId?: number;
  detectedChapterId?: number;
  matchedKeywords: string[];
  isCUETRelated: boolean;
  requiresPracticeMCQ: boolean;
  isFrustrated: boolean;
}

// Regex and keyword patterns
const NON_CUET_PATTERNS = [
  /\b(recipe|cook|movie|cinema|actor|actress|netflix|bollywood|hollywood|dating|girlfriend|boyfriend|cricket score|ipl|pubg|freefire|valorant|gaming|crypto|bitcoin|stock market trading|weather today|horoscope|zodiac)\b/i,
  /\b(write code for|python script|javascript function|react component|html css|java spring)\b/i,
  /\b(song lyrics|joke|shayari|rap|story writing)\b/i,
];

const FRUSTRATION_PATTERNS = [
  /\b(darr|dar|tension|stress|panic|give up|depression|depressed|hopeless|demotivated|anxiety|marks nahi|kuch nahi ho raha|nahi ho payega|fail ho jaunga|dimag kharab|ro raha|rona aa raha)\b/i,
  /\b(scared|terrified|cannot do this|giving up|feeling low|overwhelmed|hopeless|worthless)\b/i,
];

const GREETING_PATTERNS = [
  /^(hi|hello|hey|hola|namaste|pranam|good\s*(morning|afternoon|evening)|wassup|yo|kaise ho|how are you|kya haal)(\s*[!?.])*$/i,
  /^(thanks|thank you|shukriya|dhanyawad|ok|okay|theek hai|thik hai|bye|alvida|good night)(\s*[!?.])*$/i,
];

const MCQ_REQUEST_PATTERNS = [
  /\b(quiz me|ask me a question|give me a question|ek question pucho|ek sawal pucho|practice question|mcq do|test lo|test me|give me an mcq|sawal do)\b/i,
];

const PYQ_PATTERNS = [
  /\b(pyq|previous year|past year|last year question|2023 paper|2024 paper|2022 paper|pehle aaya tha|repeated question)\b/i,
];

const SYLLABUS_PATTERNS = [
  /\b(syllabus|deleted syllabus|chapters coming|weightage|exam pattern|negative marking|marks distribution|out of syllabus|ncert rationalized)\b/i,
];

const CUTOFF_PATTERNS = [
  /\b(cutoff|cut-off|safe score|marks needed|percentile|du north campus|srcc|hindu college|miranda house|hansraj|bhu cutoff|jnu cutoff|admission chance)\b/i,
];

const STRATEGY_PATTERNS = [
  /\b(strategy|timetable|time table|how to study|revision|plan|routine|books to refer|best book|kaise padhe|kaise taiyari karein|tips)\b/i,
];

const FORMULA_PATTERNS = [
  /\b(formula|equation|unit|derivation|numerical|sutra|chemical reaction|reaction)\b/i,
];

export function detectIntent(text: string): IntentAnalysisResult {
  const clean = text.trim();
  const lower = clean.toLowerCase();

  // 1. Check Greetings / Smalltalk
  if (GREETING_PATTERNS.some(p => p.test(clean))) {
    return {
      intent: 'smalltalk',
      confidence: 0.95,
      matchedKeywords: ['greeting'],
      isCUETRelated: true,
      requiresPracticeMCQ: false,
      isFrustrated: false,
    };
  }

  // 2. Check Frustration / Emotional Support
  if (FRUSTRATION_PATTERNS.some(p => p.test(clean))) {
    return {
      intent: 'frustration',
      confidence: 0.9,
      matchedKeywords: ['frustration', 'stress'],
      isCUETRelated: true,
      requiresPracticeMCQ: false,
      isFrustrated: true,
    };
  }

  // 3. Check Non-CUET
  if (NON_CUET_PATTERNS.some(p => p.test(clean))) {
    // Make sure it doesn't mention CUET or Indian Constitution / domain topics
    const hasAcademicOverlap = /\b(cuet|exam|ncert|constitution|article|history|economy|polity)\b/i.test(clean);
    if (!hasAcademicOverlap) {
      return {
        intent: 'non_cuet',
        confidence: 0.95,
        matchedKeywords: ['non_cuet'],
        isCUETRelated: false,
        requiresPracticeMCQ: false,
        isFrustrated: false,
      };
    }
  }

  // 4. Check MCQ / Quiz request
  if (MCQ_REQUEST_PATTERNS.some(p => p.test(clean))) {
    const topicMatch = matchSubjectAndTopic(clean);
    return {
      intent: 'inline_mcq_request',
      confidence: 0.9,
      detectedSubjectId: topicMatch.subjectId,
      detectedTopicId: topicMatch.topicId,
      detectedChapterId: topicMatch.chapterId,
      matchedKeywords: topicMatch.keywords,
      isCUETRelated: true,
      requiresPracticeMCQ: true,
      isFrustrated: false,
    };
  }

  // 5. Check PYQ
  if (PYQ_PATTERNS.some(p => p.test(clean))) {
    const topicMatch = matchSubjectAndTopic(clean);
    return {
      intent: 'pyq_doubt',
      confidence: 0.85,
      detectedSubjectId: topicMatch.subjectId,
      detectedTopicId: topicMatch.topicId,
      detectedChapterId: topicMatch.chapterId,
      matchedKeywords: ['pyq', ...topicMatch.keywords],
      isCUETRelated: true,
      requiresPracticeMCQ: false,
      isFrustrated: false,
    };
  }

  // 6. Check Syllabus
  if (SYLLABUS_PATTERNS.some(p => p.test(clean))) {
    const topicMatch = matchSubjectAndTopic(clean);
    return {
      intent: 'syllabus_query',
      confidence: 0.85,
      detectedSubjectId: topicMatch.subjectId,
      detectedTopicId: topicMatch.topicId,
      matchedKeywords: ['syllabus', ...topicMatch.keywords],
      isCUETRelated: true,
      requiresPracticeMCQ: false,
      isFrustrated: false,
    };
  }

  // 7. Check Cutoff
  if (CUTOFF_PATTERNS.some(p => p.test(clean))) {
    return {
      intent: 'cutoff_query',
      confidence: 0.85,
      matchedKeywords: ['cutoff'],
      isCUETRelated: true,
      requiresPracticeMCQ: false,
      isFrustrated: false,
    };
  }

  // 8. Check Strategy
  if (STRATEGY_PATTERNS.some(p => p.test(clean))) {
    const topicMatch = matchSubjectAndTopic(clean);
    return {
      intent: 'strategy_query',
      confidence: 0.8,
      detectedSubjectId: topicMatch.subjectId,
      detectedTopicId: topicMatch.topicId,
      matchedKeywords: ['strategy', ...topicMatch.keywords],
      isCUETRelated: true,
      requiresPracticeMCQ: false,
      isFrustrated: false,
    };
  }

  // 9. Check Formula
  if (FORMULA_PATTERNS.some(p => p.test(clean))) {
    const topicMatch = matchSubjectAndTopic(clean);
    return {
      intent: 'formula_doubt',
      confidence: 0.8,
      detectedSubjectId: topicMatch.subjectId,
      detectedTopicId: topicMatch.topicId,
      matchedKeywords: ['formula', ...topicMatch.keywords],
      isCUETRelated: true,
      requiresPracticeMCQ: false,
      isFrustrated: false,
    };
  }

  // 10. Default Concept Doubt or General
  const topicMatch = matchSubjectAndTopic(clean);
  const isConcept = topicMatch.topicId !== undefined || /\b(what|explain|how|why|article|rights|duty|panchayat|court|writs|fundamental|amendment|samjha|kya hai)\b/i.test(clean);

  return {
    intent: isConcept ? 'concept_doubt' : 'general',
    confidence: isConcept ? 0.85 : 0.7,
    detectedSubjectId: topicMatch.subjectId,
    detectedTopicId: topicMatch.topicId,
    detectedChapterId: topicMatch.chapterId,
    matchedKeywords: topicMatch.keywords,
    isCUETRelated: true,
    requiresPracticeMCQ: false,
    isFrustrated: false,
  };
}

// Topic and subject entity linker
export function matchSubjectAndTopic(query: string): {
  subjectId?: number;
  topicId?: number;
  chapterId?: number;
  keywords: string[];
} {
  const lower = query.toLowerCase();
  const matchedKeywords: string[] = [];
  let matchedSubjectId: number | undefined;
  let matchedTopicId: number | undefined;
  let matchedChapterId: number | undefined;

  // Direct subject name check
  for (const subj of SEED_SUBJECTS) {
    if (lower.includes(subj.name.toLowerCase()) || lower.includes(subj.code.toLowerCase())) {
      matchedSubjectId = subj.id;
      matchedKeywords.push(subj.name);
      break;
    }
  }

  // Direct topic check
  for (const topic of SEED_TOPICS) {
    const topicTerms = topic.topic_name.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const matchesAll = topicTerms.length > 0 && topicTerms.some(term => lower.includes(term));
    
    if (lower.includes(topic.topic_name.toLowerCase()) || matchesAll) {
      matchedTopicId = topic.id;
      matchedChapterId = topic.chapter_id;
      matchedSubjectId = matchedSubjectId || topic.subject_id;
      matchedKeywords.push(topic.topic_name);
      break;
    }
  }

  // Specific high-frequency CUET topics
  if (!matchedTopicId) {
    if (lower.includes('fundamental right') || lower.includes('article 14') || lower.includes('article 19') || lower.includes('article 21') || lower.includes('article 32') || lower.includes('writ')) {
      matchedTopicId = 4; // Fundamental Rights
      matchedChapterId = 10;
      matchedSubjectId = 1; // Political Science
      matchedKeywords.push('Fundamental Rights');
    } else if (lower.includes('dpsp') || lower.includes('directive principle') || lower.includes('article 44') || lower.includes('article 40')) {
      matchedTopicId = 5; // Directive Principles of State Policy
      matchedChapterId = 10;
      matchedSubjectId = 1;
      matchedKeywords.push('DPSP');
    } else if (lower.includes('constituent assembly') || lower.includes('dr ambedkar') || lower.includes('making of the constitution') || lower.includes('drafting committee')) {
      matchedTopicId = 1; // Making of the Constitution
      matchedChapterId = 10;
      matchedSubjectId = 1;
      matchedKeywords.push('Making of the Constitution');
    }
  }

  return {
    subjectId: matchedSubjectId,
    topicId: matchedTopicId,
    chapterId: matchedChapterId,
    keywords: matchedKeywords,
  };
}
