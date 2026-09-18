import { NextRequest, NextResponse } from 'next/server';
import { checkChatUsage, recordChatUsage } from '@/lib/chat-rate-limiter';
import { analyzeLanguage } from '@/lib/language-detector';
import { detectIntent } from '@/lib/intent-detector';
import {
  getOrCreateConversation,
  getConversationHistory,
  saveMessage,
  buildOpenAIMessages,
} from '@/lib/conversation-memory';
import { buildDynamicSystemPrompt } from '@/lib/chatbot-prompts';
import { searchCUETContent } from '@/lib/rag-engine';
import { AppDataStore, SEED_SUBJECTS, SEED_TOPICS, SEED_CHAPTERS } from '@/lib/data-store';
import { getOpenAIClient, isOpenAIConfigured } from '@/lib/openai';
import { supabase } from '@/lib/supabase';
import { ChatSourceChunk, InlineMCQ } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await request.json();
    const {
      message,
      conversation_id,
      student_id = AppDataStore.student.id,
      subject_id,
      topic_id,
    } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();

    // 1. Rate Limit Check
    const student = AppDataStore.student;
    const planType = student.plan_type || 'free';
    const usageCheck = await checkChatUsage(student_id, planType);

    if (!usageCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Daily question limit reached. Upgrade to Pro for 200 questions/day!',
          remaining: 0,
          daily_limit: usageCheck.dailyLimit,
          reset_time: usageCheck.resetTime,
          is_limit_reached: true,
        },
        { status: 429 }
      );
    }

    // 2. Language Detection
    const langResult = analyzeLanguage(trimmedMessage);
    const language = langResult.language;

    // 3. Intent Detection & Topic Matching
    const intentResult = detectIntent(trimmedMessage);
    const intent = intentResult.intent;

    const resolvedTopicId = topic_id || intentResult.detectedTopicId;
    const resolvedSubjectId = subject_id || intentResult.detectedSubjectId;

    const matchedTopic = resolvedTopicId ? SEED_TOPICS.find(t => t.id === resolvedTopicId) : undefined;
    const matchedSubject = resolvedSubjectId ? SEED_SUBJECTS.find(s => s.id === resolvedSubjectId) : undefined;
    const matchedChapter = matchedTopic ? SEED_CHAPTERS.find(c => c.id === matchedTopic.chapter_id) : undefined;

    // 4. Conversation Setup & Save Student Message
    const conversation = conversation_id
      ? { id: conversation_id }
      : await getOrCreateConversation(
          student_id,
          resolvedSubjectId,
          resolvedTopicId,
          matchedTopic ? `${matchedTopic.topic_name} Doubt` : 'CUET Doubt Session'
        );

    // Save student message
    await saveMessage({
      conversationId: conversation.id,
      studentId: student_id,
      role: 'student',
      messageText: trimmedMessage,
      languageDetected: language,
      intentDetected: intent,
      topicId: resolvedTopicId,
      subjectId: resolvedSubjectId,
    });

    // 5. Fetch Conversation History (last 10 messages)
    const history = await getConversationHistory(conversation.id, 10);

    // 6. RAG Retrieval from Pinecone / Verified chunks
    let ragContext = '';
    const sources: ChatSourceChunk[] = [];

    if (intentResult.isCUETRelated && matchedTopic) {
      try {
        const rag = await searchCUETContent({
          topicName: matchedTopic.topic_name,
          subjectName: matchedSubject?.name || 'Domain Subject',
          chapterName: matchedChapter?.chapter_name || 'Chapter',
          topicId: matchedTopic.id,
          topResults: 3,
        });

        ragContext = rag.contextText;
        if (rag.chunksFound > 0) {
          sources.push({
            topic_name: matchedTopic.topic_name,
            subject_name: matchedSubject?.name,
            chapter_name: matchedChapter?.chapter_name,
            snippet: rag.contextText.substring(0, 160) + '...',
          });
        }
      } catch (err) {
        console.warn('[Chat RAG] Content retrieval warning:', err);
      }
    }

    // 7. Check if Inline MCQ should be attached
    let inlineMCQ: InlineMCQ | undefined;
    if (intentResult.requiresPracticeMCQ || intent === 'inline_mcq_request') {
      if (resolvedTopicId === 4 || !resolvedTopicId) {
        // Fundamental Rights question
        inlineMCQ = {
          id: 101,
          question_text: "Which Article of the Indian Constitution is termed the 'Heart and Soul of the Constitution' by Dr. B.R. Ambedkar?",
          option_a: "Article 14 (Equality)",
          option_b: "Article 19 (Six Freedoms)",
          option_c: "Article 21 (Right to Life)",
          option_d: "Article 32 (Constitutional Remedies)",
          correct_option: "D",
          explanation: "Dr. B.R. Ambedkar called Article 32 the 'Heart and Soul of the Constitution' because without remedies, rights are ineffective in court.",
          topic_id: 4,
          subject_id: 1,
          chapter_id: 10,
        };
      } else if (resolvedTopicId === 5) {
        // DPSP question
        inlineMCQ = {
          id: 102,
          question_text: "Under which Article does the Constitution of India urge the State to secure a Uniform Civil Code (UCC)?",
          option_a: "Article 40",
          option_b: "Article 44",
          option_c: "Article 48",
          option_d: "Article 51",
          correct_option: "B",
          explanation: "Article 44 in Part IV directs the State to endeavor to secure for citizens a Uniform Civil Code throughout the territory of India.",
          topic_id: 5,
          subject_id: 1,
          chapter_id: 10,
        };
      }
    }

    // 8. Construct Dynamic System Prompt
    const systemPrompt = buildDynamicSystemPrompt({
      language,
      intent,
      ragContext,
      studentName: student.name,
      targetCollege: student.target_college,
      topicName: matchedTopic?.topic_name,
      subjectName: matchedSubject?.name,
    });

    const openAIMessages = buildOpenAIMessages(systemPrompt, history, trimmedMessage);

    // 9. Streaming Response setup (SSE)
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        // Send initial metadata event immediately
        const metaPayload = {
          conversation_id: conversation.id,
          language,
          intent,
          detected_topic_id: resolvedTopicId,
          detected_topic_name: matchedTopic?.topic_name,
          sources,
          inline_mcq: inlineMCQ,
        };
        controller.enqueue(encoder.encode(`event: meta\ndata: ${JSON.stringify(metaPayload)}\n\n`));

        let fullResponseText = '';
        let totalTokens = 0;

        try {
          if (isOpenAIConfigured()) {
            const openai = getOpenAIClient();
            const completion = await openai.chat.completions.create({
              model: 'gpt-4o-mini',
              messages: openAIMessages,
              stream: true,
              max_tokens: Number(process.env.CHATBOT_MAX_TOKENS_RESPONSE) || 450,
              temperature: 0.7,
            });

            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                fullResponseText += content;
                controller.enqueue(
                  encoder.encode(`event: delta\ndata: ${JSON.stringify({ text: content })}\n\n`)
                );
              }
            }
          } else {
            // High quality fallback mock streaming
            const mockText = generateRealisticFallbackResponse({
              message: trimmedMessage,
              language,
              intent,
              topicName: matchedTopic?.topic_name,
              studentName: student.name,
            });

            // Stream in word tokens with tiny delay
            const words = mockText.split(' ');
            for (let i = 0; i < words.length; i++) {
              const wordWithSpace = words[i] + (i < words.length - 1 ? ' ' : '');
              fullResponseText += wordWithSpace;
              controller.enqueue(
                encoder.encode(`event: delta\ndata: ${JSON.stringify({ text: wordWithSpace })}\n\n`)
              );
              // Small delay for natural streaming feel
              await new Promise(r => setTimeout(r, 20));
            }
          }

          totalTokens = Math.ceil((trimmedMessage.length + fullResponseText.length) / 4);
          const responseTime = Date.now() - startTime;

          // Save assistant message to memory / DB
          const savedMsg = await saveMessage({
            conversationId: conversation.id,
            studentId: student_id,
            role: 'cuetbot',
            messageText: fullResponseText,
            languageDetected: language,
            intentDetected: intent,
            tokensUsed: totalTokens,
            responseTimeMs: responseTime,
            sourcesUsed: sources,
            hasInlineMCQ: !!inlineMCQ,
            inlineMCQData: inlineMCQ,
            topicId: resolvedTopicId,
            subjectId: resolvedSubjectId,
          });

          // 10. Record usage and Module 1 Integrations
          await recordChatUsage(student_id, totalTokens, planType);

          // Log doubt in doubt_topics_log
          AppDataStore.recordDoubt(
            student_id,
            trimmedMessage,
            resolvedTopicId,
            resolvedSubjectId,
            matchedChapter?.id,
            language,
            intent,
            conversation.id,
            intentResult.matchedKeywords
          );

          try {
            if (supabase) {
              await supabase.from('doubt_topics_log').insert({
                student_id,
                conversation_id: conversation.id,
                subject_id: resolvedSubjectId || null,
                chapter_id: matchedChapter?.id || null,
                topic_id: resolvedTopicId || null,
                doubt_query: trimmedMessage,
                language,
                intent,
                detected_keywords: intentResult.matchedKeywords,
              });
            }
          } catch (err) {
            console.warn('[DoubtLog] Supabase logging warning:', err);
          }

          // If a topic was detected, record an attempt in student_attempts with attempt_source: 'chat_doubt'
          // This updates the topic weakness calculation in Module 1!
          if (resolvedTopicId && matchedTopic) {
            AppDataStore.recordChatAttempt({
              student_id,
              subject_id: matchedTopic.subject_id,
              chapter_id: matchedTopic.chapter_id,
              topic_id: matchedTopic.id,
              selected_option: 'A',
              is_correct: false, // Indicates student is seeking clarity/doubt on this topic
              time_taken_seconds: Math.round(responseTime / 1000),
              session_id: `chat_${conversation.id}`,
            });
          }

          // Send done event with saved message ID and token stats
          const donePayload = {
            message_id: savedMsg.id,
            tokens: totalTokens,
            response_time_ms: responseTime,
          };
          controller.enqueue(encoder.encode(`event: done\ndata: ${JSON.stringify(donePayload)}\n\n`));
        } catch (streamError) {
          console.error('[Stream Error]', streamError);
          controller.enqueue(
            encoder.encode(
              `event: error\ndata: ${JSON.stringify({ error: (streamError as Error).message })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[API /api/chat/message] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

function generateRealisticFallbackResponse(params: {
  message: string;
  language: string;
  intent: string;
  topicName?: string;
  studentName?: string;
}): string {
  const { language, intent, topicName } = params;

  if (intent === 'smalltalk') {
    if (language === 'hinglish') {
      return `Hey dost! 👋 Main CUETBot hoon, tumhara 24/7 AI tutor. Political Science, General Test ya kisi bhi subject me koi doubt ho toh bejhijhak pucho! Aaj kya revise kar rahe ho?`;
    } else if (language === 'hindi') {
      return `नमस्ते दोस्त! 🙏 मैं CUETBot हूँ, आपका 24/7 साथी। CUET के किसी भी विषय या अध्याय में कोई भी संदेह हो, तो तुरंत पूछिए। आज क्या तैयारी कर रहे हैं?`;
    } else {
      return `Hello future topper! 👋 I'm CUETBot, your 24/7 AI CUET tutor. Ready to conquer your doubts in Political Science, General Test, or domain subjects. What are we mastering today?`;
    }
  }

  if (intent === 'frustration') {
    if (language === 'hinglish') {
      return `Deep breath lo dost! 🧘‍♂️ Normal hai darr lagna, main bhi jab DU ke liye prep kar raha tha toh aisi anxiety hoti thi. 

CUET me smart revision aur daily 20-30 MCQs practice se score drastically improve hota hai. Ek saath pura syllabus mat dekho — bas ek chapter uthao, aur usko step-by-step khatam karte hain. Main yahan hoon tumhare har doubt ko clear karne ke liye! 

Batao, kaunsa topic sabse mushkil lag raha hai abhi?`;
    } else {
      return `Take a deep breath champion! 🧘‍♂️ Exam anxiety is completely normal, especially when juggling boards and CUET. Remember: CUET tests conceptual clarity from NCERT, not rote memorization. 

Break your syllabus into bite-sized daily targets of 20-30 MCQs. You don't have to master everything in one day. Let's tackle your weakest chapter together right now — what topic should we break down first?`;
    }
  }

  if (intent === 'non_cuet') {
    if (language === 'hinglish') {
      return `Haha dost! 😄 Yeh sab exam ke baad pakka discuss karenge jab tum DU North Campus (SRCC / Hindu) me enter kar jaoge! 

Abhi hamara mission CUET 2026 hai. Chalo focus wapas laate hain — batao Political Science ya General Test me kya doubt hai?`;
    } else {
      return `Haha, let's keep that for your college fest after you crack CUET! 🎯 Right now, every minute counts towards your dream university cutoff. Tell me, which subject or chapter are we revising right now?`;
    }
  }

  if (intent === 'cutoff_query') {
    return `🎯 **DU North Campus CUET Cutoff Strategy (Target 2026):**

1. **Top Tier Colleges (SRCC, Hindu, St. Stephen's, Miranda):**
   - General Category raw score target: **760+ out of 800** (99.2+ percentile).
   - Normalization me 10-15 marks ka swing ho sakta hai, isliye aim for **780+**.

2. **South Campus High Repute (Venkateshwara, Gargi, ARSD):**
   - Target: **710 - 745 out of 800**.

3. **Key Advice:**
   - Domain subjects (like Political Science, History) me 200/200 score karna sabse realistic aur impactful hota hai. NCERT lines direct question banti hain!`;
  }

  // Default Concept Doubt Response
  if (language === 'hinglish') {
    return `Dekho dost! **${topicName || 'Fundamental Rights'}** ka funda bahut clear aur high-yield hai CUET ke liye! 🎯

1. **Constitutional Basis:**
   - Indian Constitution ke **Part III (Articles 12-35)** me diye gaye hain.
   - Yeh **justiciable** hain — matlab agar violate huye, toh Article 32 ke under direct Supreme Court ja sakte ho.

2. **Article 21 vs Article 21A (Most Repeated CUET Trap):**
   - **Article 21:** Protection of Life and Personal Liberty.
   - **Article 21A:** Right to Free & Compulsory Education for children aged 6 to 14 years. Isko **86th Constitutional Amendment Act, 2002** se add kiya gaya tha!

3. **Dr. Ambedkar's Key Quote:**
   - Dr. B.R. Ambedkar ne **Article 32** (Right to Constitutional Remedies) ko **"Heart and Soul of the Constitution"** kaha tha.

Kya iska ek practice MCQ solve karna chahoge abhi test karne ke liye?`;
  }

  return `Here is a clear, exam-oriented breakdown of **${topicName || 'Fundamental Rights'}** for CUET:

### 1. Key Constitutional Facts (NCERT Part III)
- **Part & Articles:** Part III, Articles 12 to 35.
- **Nature:** Justiciable (enforceable through High Courts under Art 226 and Supreme Court under Art 32).

### 2. High-Yield CUET Points to Memorize:
- **Article 14:** Equality before law & Equal protection of the laws.
- **Article 19:** Guarantees 6 democratic freedoms (speech, assembly, association, movement, residence, profession).
- **Article 21:** Right to Life and Personal Liberty (cannot be suspended even during emergency under Art 359).
- **Article 21A:** Right to Education (6-14 years), inserted via **86th Amendment Act, 2002**.
- **Article 32:** Constitutional Remedies — termed the *"Heart and Soul of the Constitution"* by Dr. B.R. Ambedkar.

Would you like to try a quick CUET-style practice question on this topic?`;
}
