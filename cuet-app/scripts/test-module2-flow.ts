import { splitTextIntoChunks } from '../lib/content-processor';
import { searchCUETContent } from '../lib/rag-engine';
import { validateGeneratedQuestion, GeneratedQuestion } from '../lib/question-validator';
import { buildQuestionGenerationPrompt, buildBatchGenerationPrompt } from '../lib/prompt-templates';
import { checkAndIncrementUsage, logAIUsage } from '../lib/rate-limiter';
import { buildCacheKey, checkCache, saveToCache } from '../lib/ai-cache';
import { AppDataStore } from '../lib/data-store';
import { POST as verifyAnswer } from '../app/api/ai/verify-answer/route';
import { GET as getQueue } from '../app/api/review/queue/route';
import { POST as approveQ } from '../app/api/review/approve/route';
import { POST as rejectQ } from '../app/api/review/reject/route';
import { GET as getUsage } from '../app/api/ai/usage/route';
import { POST as generateQuestionRoute } from '../app/api/ai/generate-question/route';
import { POST as generateBatchRoute } from '../app/api/ai/generate-batch/route';

async function runModule2Tests() {
  console.log('=================================================');
  console.log('🤖 TESTING MODULE 2: AI QUESTION GENERATOR SYSTEM');
  console.log('=================================================');

  AppDataStore.initialize();

  // ─────────────────────────────────────────────────────
  // TEST 1: Content Chunking
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 1] Testing recursive text splitter...');
  const sampleNCERTText = `Fundamental Rights are contained in Part III of the Indian Constitution (Articles 12-35).
They are justiciable rights, meaning they are enforceable by courts.
The six Fundamental Rights are:
1. Right to Equality (Articles 14-18)
2. Right to Freedom (Articles 19-22)
3. Right Against Exploitation (Articles 23-24)
4. Right to Freedom of Religion (Articles 25-28)
5. Cultural and Educational Rights (Articles 29-30)
6. Right to Constitutional Remedies (Article 32)
Dr. B.R. Ambedkar called Article 32 the Heart and Soul of the Constitution.`;

  const chunks = await splitTextIntoChunks(sampleNCERTText, 300, 50);
  console.log(`Generated ${chunks.length} chunks from sample text.`);
  if (chunks.length === 0) throw new Error('Chunking failed: 0 chunks created');
  console.log('✅ Chunking verified.');

  // ─────────────────────────────────────────────────────
  // TEST 2: RAG Engine Search (Verified Seed Chunks)
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 2] Testing RAG search for Topic 4 (Fundamental Rights)...');
  const ragResult = await searchCUETContent({
    topicName: 'Fundamental Rights',
    subjectName: 'Political Science',
    chapterName: 'Constitution: Why and How?',
    topicId: 4,
    topResults: 3,
  });

  console.log(`Chunks found: ${ragResult.chunksFound}`);
  console.log(`Context preview: ${ragResult.contextText.substring(0, 150)}...`);
  if (ragResult.chunksFound === 0 || !ragResult.contextText.includes('Part III')) {
    throw new Error('RAG search did not retrieve verified Fundamental Rights content');
  }
  console.log('✅ RAG retrieval from verified content verified.');

  // ─────────────────────────────────────────────────────
  // TEST 3: Question Validator & Quality Gate
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 3] Testing Question Validator...');

  const validQuestion: GeneratedQuestion = {
    question: 'Which Article of the Indian Constitution was called the Heart and Soul by Dr. Ambedkar?',
    option_a: 'Article 14',
    option_b: 'Article 19',
    option_c: 'Article 32',
    option_d: 'Article 21',
    correct_option: 'C',
    explanation: 'Dr. B.R. Ambedkar referred to Article 32 (Right to Constitutional Remedies) as the Heart and Soul of the Constitution.',
    difficulty: 'easy',
    topic_tested: 'Fundamental Rights',
    confidence_score: 0.95,
    context_quality: 'good',
    flags: [],
  };

  const validResult = validateGeneratedQuestion(validQuestion);
  console.log(`Valid Q validation: isValid=${validResult.isValid}, autoApprove=${validResult.autoApprove}, score=${validResult.score}`);
  if (!validResult.isValid || !validResult.autoApprove) {
    throw new Error(`Valid question failed validation: ${JSON.stringify(validResult)}`);
  }

  // Flawed question with duplicate options
  const duplicateOptionsQ: GeneratedQuestion = {
    ...validQuestion,
    option_a: 'Article 14',
    option_b: 'Article 14', // duplicate
  };
  const dupResult = validateGeneratedQuestion(duplicateOptionsQ);
  console.log(`Duplicate options test: isValid=${dupResult.isValid}, issues=${dupResult.issues.join(', ')}`);
  if (dupResult.autoApprove || !dupResult.issues.some((i) => i.includes('Duplicate options'))) {
    throw new Error('Duplicate options not caught by validator');
  }

  // Hallucination flag test
  const hallucinatedQ: GeneratedQuestion = {
    ...validQuestion,
    flags: ['fact_not_in_context'],
  };
  const halResult = validateGeneratedQuestion(hallucinatedQ);
  console.log(`Hallucination flag test: score=${halResult.score}, autoApprove=${halResult.autoApprove}`);
  if (halResult.autoApprove) {
    throw new Error('Hallucinated question was incorrectly auto-approved');
  }
  console.log('✅ Question Validator passed all safety checks.');

  // ─────────────────────────────────────────────────────
  // TEST 4: Prompt Engineering
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 4] Testing Prompt Builders...');
  const promptStruggling = buildQuestionGenerationPrompt({
    subject: 'Political Science',
    chapter: 'Constitution',
    topic: 'Fundamental Rights',
    difficulty: 'easy',
    studentAccuracy: 25,
    questionsSeenBefore: ['Which Article deals with Equality?'],
    retrievedContext: ragResult.contextText,
  });
  if (!promptStruggling.includes('STRUGGLING') || !promptStruggling.includes('MOST FUNDAMENTAL')) {
    throw new Error('Adaptive struggling student prompt instruction missing');
  }

  const batchPrompt = buildBatchGenerationPrompt({
    subject: 'Political Science',
    chapter: 'Constitution',
    topic: 'Fundamental Rights',
    difficulties: ['easy', 'medium', 'hard'],
    retrievedContext: ragResult.contextText,
    studentAccuracy: 60,
  });
  if (!batchPrompt.includes('Generate exactly 3 different')) {
    throw new Error('Batch generation prompt count mismatch');
  }
  console.log('✅ Prompt engineering verified.');

  // ─────────────────────────────────────────────────────
  // TEST 5: Rate Limiter & Cost Tracker
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 5] Testing Rate Limiter & Usage Logging...');
  const testStudentId = 'test-student-id-1';

  const check1 = await checkAndIncrementUsage(testStudentId, 'free');
  console.log(`Free plan limit check: dailyLimit=${check1.dailyLimit}, remaining=${check1.remaining}, allowed=${check1.allowed}`);
  if (check1.dailyLimit !== 10 || !check1.allowed) {
    throw new Error('Free plan limit check failed');
  }

  // Log 10 calls
  for (let i = 0; i < 10; i++) {
    await logAIUsage(testStudentId, 4, 'gpt-4o-mini', 400, 0.0001, false, 'cache-key');
  }

  const checkBlocked = await checkAndIncrementUsage(testStudentId, 'free');
  console.log(`After 10 calls: allowed=${checkBlocked.allowed}, remaining=${checkBlocked.remaining}`);
  if (checkBlocked.allowed) {
    throw new Error('Rate limiter failed to block after reaching daily free limit');
  }
  console.log('✅ Rate limiter enforcement verified.');

  // ─────────────────────────────────────────────────────
  // TEST 6: Response Caching
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 6] Testing AI Cache...');
  const cacheKey = buildCacheKey(4, 'medium', testStudentId);
  await saveToCache(cacheKey, validQuestion, 3600);

  const retrievedFromCache = await checkCache(cacheKey);
  console.log(`Cache retrieved question: "${retrievedFromCache?.question}"`);
  if (!retrievedFromCache || retrievedFromCache.correct_option !== 'C') {
    throw new Error('Failed to retrieve question from cache');
  }
  console.log('✅ Response caching verified.');

  // ─────────────────────────────────────────────────────
  // TEST 7: Answer Verification & Module 1 Weakness Update
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 7] Testing Answer Verification & Weakness Score recalculation...');
  const verifyReq = new Request('http://localhost:3000/api/ai/verify-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question_id: 1, // Question 1 in SEED_QUESTIONS has correct_option 'C'
      selected_option: 'C',
      time_taken_seconds: 35,
      topic_id: 4,
    }),
  });

  const verifyRes = await verifyAnswer(verifyReq);
  const verifyJson = await verifyRes.json();
  console.log(`Verified answer: is_correct=${verifyJson.is_correct}, correct_option=${verifyJson.correct_option}`);
  console.log(`Updated topic weakness score: ${verifyJson.weaknessScore?.final_weakness_score}`);
  if (!verifyJson.is_correct || verifyJson.correct_option !== 'C') {
    throw new Error('Answer verification logic failed');
  }
  console.log('✅ Answer verification and Module 1 connection verified.');

  // ─────────────────────────────────────────────────────
  // TEST 8: SME Review Queue & Approval Flow
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 8] Testing SME Review Queue...');
  // Insert a pending question in AppDataStore
  const pendingId = 999123;
  AppDataStore.aiQuestions.push({
    id: pendingId,
    subject_id: 1,
    chapter_id: 10,
    topic_id: 4,
    question_text: 'Pending review question on Fundamental Rights',
    option_a: 'Option 1',
    option_b: 'Option 2',
    option_c: 'Option 3',
    option_d: 'Option 4',
    correct_option: 'A',
    explanation: 'Sample explanation for review',
    difficulty: 'medium',
    review_status: 'pending',
    confidence_score: 0.92,
  });

  const queueReq = new Request('http://localhost:3000/api/review/queue?status=pending');
  const queueRes = await getQueue(queueReq);
  const queueJson = await queueRes.json();
  console.log(`Queue items count: ${queueJson.data?.length}`);
  const hasPending = queueJson.data.some((item: any) => item.id === pendingId);
  if (!hasPending) {
    throw new Error('Pending question not found in review queue');
  }

  // Approve question
  const approveReq = new Request('http://localhost:3000/api/review/approve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question_id: pendingId,
      review_notes: 'Approved by SME quality check',
    }),
  });
  const approveRes = await approveQ(approveReq);
  const approveJson = await approveRes.json();
  console.log(`Approve response: ${approveJson.message}`);
  if (!approveJson.success) throw new Error('Failed to approve question');

  const approvedInStore = AppDataStore.aiQuestions.find((q) => q.id === pendingId);
  if (approvedInStore?.review_status !== 'approved') {
    throw new Error('Question status not updated to approved');
  }
  console.log('✅ SME Review Queue & Approval flow verified.');

  // ─────────────────────────────────────────────────────
  // TEST 9: AI Generation Endpoint Fallback & Payload Safety
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 9] Testing /api/ai/generate-question endpoint & payload safety...');
  const genReq = new Request('http://localhost:3000/api/ai/generate-question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic_id: 4, difficulty: 'medium' }),
  });

  const genRes = await generateQuestionRoute(genReq);
  const genJson = await genRes.json();
  console.log(`Generate response success=${genJson.success}, has question=${Boolean(genJson.question)}`);

  if (!genJson.success || !genJson.question) {
    throw new Error(`Generate question returned failure: ${JSON.stringify(genJson)}`);
  }

  // CRITICAL CHECK: Ensure correct_option and explanation are NEVER exposed to student
  if (genJson.question.correct_option !== undefined || genJson.question.explanation !== undefined) {
    throw new Error('SECURITY VIOLATION: correct_option or explanation exposed to student payload before answering!');
  }
  console.log('✅ Security check passed: correct_option & explanation are safely hidden.');

  // ─────────────────────────────────────────────────────
  // TEST 10: Usage and Cost Monitoring API
  // ─────────────────────────────────────────────────────
  console.log('\n[TEST 10] Testing /api/ai/usage monitoring endpoint...');
  const usageReq = new Request('http://localhost:3000/api/ai/usage');
  const usageRes = await getUsage(usageReq);
  const usageJson = await usageRes.json();
  console.log(`Today spend: $${usageJson.monitoring?.todaySpendUsd} (₹${usageJson.monitoring?.todaySpendInr})`);
  console.log(`Cache hit rate: ${usageJson.monitoring?.cacheHitRate}%`);
  console.log(`Total calls tracked: ${usageJson.monitoring?.totalCalls}`);
  if (!usageJson.success || usageJson.monitoring?.todaySpendUsd === undefined) {
    throw new Error('Usage monitoring endpoint failed');
  }
  console.log('✅ Cost monitoring endpoint verified.');

  console.log('\n=================================================');
  console.log('🎉 ALL 10 MODULE 2 TEST SUITES PASSED PERFECTLY!');
  console.log('=================================================');
}

runModule2Tests().catch((err) => {
  console.error('\n❌ Module 2 Test Suite Failed:', err);
  process.exit(1);
});
