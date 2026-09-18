import { analyzeLanguage, detectLanguage } from '../lib/language-detector';
import { detectIntent, matchSubjectAndTopic } from '../lib/intent-detector';
import { checkChatUsage, recordChatUsage, getDailyLimitForPlan } from '../lib/chat-rate-limiter';
import { buildDynamicSystemPrompt } from '../lib/chatbot-prompts';
import { AppDataStore } from '../lib/data-store';

async function runModule3Tests() {
  console.log('====================================================');
  console.log('🚀 TESTING MODULE 3: AI DOUBT SOLVER CHATBOT FLOW');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (condition) {
      console.log(`✅ TEST ${total}: ${testName}`);
      passed++;
    } else {
      console.error(`❌ TEST ${total} FAILED: ${testName}`);
    }
  }

  // ----------------------------------------------------
  // 1. Language Detection Tests
  // ----------------------------------------------------
  console.log('--- Subsystem 1: Multilingual Language Detection ---');
  
  const hinglishQuery = 'Bhai Article 21 aur 21A me kya difference hai mujhe samjha do?';
  const hinglishLang = detectLanguage(hinglishQuery);
  assert(hinglishLang === 'hinglish', `Hinglish query detected as 'hinglish' (got: ${hinglishLang})`);

  const hindiQuery = 'संविधान के अनुच्छेद 32 को डॉ. अम्बेडकर ने संविधान की आत्मा क्यों कहा था?';
  const hindiLang = detectLanguage(hindiQuery);
  assert(hindiLang === 'hindi', `Devanagari query detected as 'hindi' (got: ${hindiLang})`);

  const englishQuery = 'Explain the six fundamental freedoms guaranteed under Article 19 of the Indian Constitution.';
  const englishLang = detectLanguage(englishQuery);
  assert(englishLang === 'english', `English query detected as 'english' (got: ${englishLang})`);

  // ----------------------------------------------------
  // 2. Intent Detection & Entity Linking Tests
  // ----------------------------------------------------
  console.log('\n--- Subsystem 2: Intent Detection & Entity Linking ---');

  const conceptIntent = detectIntent('What is Article 21 and how does it protect life and liberty?');
  assert(
    conceptIntent.intent === 'concept_doubt' && conceptIntent.detectedTopicId === 4,
    `Concept doubt detected on topic 4 (Fundamental Rights)`
  );

  const frustrationIntent = detectIntent('Bhaiya bahut darr lag raha hai CUET me marks nahi aa rahe I am giving up');
  assert(
    frustrationIntent.intent === 'frustration' && frustrationIntent.isFrustrated === true,
    `Student anxiety/frustration detected for mentor empathy`
  );

  const nonCuetIntent = detectIntent('Can you recommend a good recipe for chicken biryani or a movie to watch?');
  assert(
    nonCuetIntent.intent === 'non_cuet' && nonCuetIntent.isCUETRelated === false,
    `Non-CUET query successfully flagged for polite redirection`
  );

  const cutoffIntent = detectIntent('DU North Campus SRCC aur Hindu College ke liye safe score kitna chahiye?');
  assert(
    cutoffIntent.intent === 'cutoff_query',
    `Cutoff / college admission inquiry correctly classified`
  );

  const mcqIntent = detectIntent('Fundamental Rights pe ek practice question pucho test karne ke liye');
  assert(
    mcqIntent.intent === 'inline_mcq_request' && mcqIntent.requiresPracticeMCQ === true,
    `Inline practice MCQ request properly triggered`
  );

  // ----------------------------------------------------
  // 3. Rate Limiter & Tier Enforcement
  // ----------------------------------------------------
  console.log('\n--- Subsystem 3: Chat Rate Limiter & Tier Caps ---');

  const testStudentId = 'test_student_limit_chk';
  const freeLimit = getDailyLimitForPlan('free');
  const proLimit = getDailyLimitForPlan('pro');
  assert(freeLimit === 20, `Free tier default limit is 20 doubts/day (got: ${freeLimit})`);
  assert(proLimit === 200, `Pro tier default limit is 200 doubts/day (got: ${proLimit})`);

  const usageBefore = await checkChatUsage(testStudentId, 'free');
  assert(usageBefore.allowed === true && usageBefore.remaining === 20, `New student starts with 20/20 remaining`);

  const recordRes = await recordChatUsage(testStudentId, 150, 'free');
  assert(recordRes.currentCount === 1 && recordRes.remaining === 19, `Usage increments and remaining decrements to 19`);

  // ----------------------------------------------------
  // 4. Dynamic System Prompt & RAG Integration
  // ----------------------------------------------------
  console.log('\n--- Subsystem 4: Dynamic Prompt Construction ---');

  const hinglishPrompt = buildDynamicSystemPrompt({
    language: 'hinglish',
    intent: 'concept_doubt',
    studentName: 'Aryan',
    topicName: 'Fundamental Rights',
    subjectName: 'Political Science',
    ragContext: 'NCERT Chunk: Article 21 guarantees Right to Life.',
  });

  assert(
    hinglishPrompt.includes('HINGLISH') && hinglishPrompt.includes('Aryan') && hinglishPrompt.includes('NCERT Chunk'),
    `Hinglish prompt properly personalizes mentor tone and injects verified NCERT context`
  );

  const nonCuetPrompt = buildDynamicSystemPrompt({
    language: 'english',
    intent: 'non_cuet',
    studentName: 'Aryan',
  });

  assert(
    nonCuetPrompt.includes('NON-CUET REDIRECTION'),
    `Non-CUET prompt includes polite redirection guardrails`
  );

  // ----------------------------------------------------
  // 5. Module 1 Weakness Detector Synchronization
  // ----------------------------------------------------
  console.log('\n--- Subsystem 5: Module 1 Weakness Synchronization ---');

  const initialScore = AppDataStore.weaknessScores.get(4);
  const initialAttempts = initialScore?.total_attempts || 0;

  // Simulate student asking a doubt and attempting inline MCQ
  const attempt = AppDataStore.recordChatAttempt({
    student_id: AppDataStore.student.id,
    question_id: 101,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 4,
    selected_option: 'D',
    is_correct: true,
    time_taken_seconds: 22,
  });

  assert(attempt.attempt_source === 'chat_doubt', `Attempt recorded with source 'chat_doubt'`);

  const updatedScore = AppDataStore.weaknessScores.get(4);
  assert(
    (updatedScore?.total_attempts || 0) === initialAttempts + 1,
    `Module 1 Topic 4 attempts incremented from ${initialAttempts} to ${updatedScore?.total_attempts}`
  );

  // Record doubt log
  const doubtLog = AppDataStore.recordDoubt(
    AppDataStore.student.id,
    'Bhai Article 21 aur 21A me kya farq hai?',
    4,
    1,
    10,
    'hinglish',
    'concept_doubt'
  );

  assert(
    doubtLog.topic_id === 4 && doubtLog.language === 'hinglish',
    `Doubt successfully logged into doubt_topics_log store`
  );

  console.log('\n====================================================');
  console.log(`📊 TEST SUMMARY: ${passed} / ${total} TESTS PASSED`);
  console.log('====================================================\n');

  if (passed === total) {
    console.log('🎉 ALL MODULE 3 FUNCTIONAL TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error('❌ SOME TESTS FAILED');
    process.exit(1);
  }
}

runModule3Tests().catch(err => {
  console.error('Fatal error running tests:', err);
  process.exit(1);
});
