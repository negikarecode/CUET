-- =============================================================================
-- CUET Coach Chat Observability & Cost Monitoring Queries
-- File: docs/chat-queries.sql
-- =============================================================================

-- 1. Daily Message Volume & Estimated Token Consumption
SELECT 
    usage_date,
    COUNT(DISTINCT user_id) AS active_candidates,
    SUM(message_count) AS total_messages,
    SUM(tokens_total) AS total_tokens,
    ROUND(SUM(tokens_total) * 0.0000005, 4) AS estimated_cost_usd -- based on $0.50/M tokens
FROM public.chat_usage_daily
GROUP BY usage_date
ORDER BY usage_date DESC
LIMIT 30;

-- 2. Top 20 Candidates by Message Volume Today
SELECT 
    p.full_name,
    p.target_stream,
    p.target_college,
    u.message_count,
    u.tokens_total,
    u.updated_at AS last_activity
FROM public.chat_usage_daily u
JOIN public.profiles p ON p.id = u.user_id
WHERE u.usage_date = CURRENT_DATE
ORDER BY u.message_count DESC
LIMIT 20;

-- 3. Overall Candidate Satisfaction (Thumbs Up vs Thumbs Down)
SELECT 
    rating,
    COUNT(*) AS rating_count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage
FROM public.chat_feedback
GROUP BY rating;

-- 4. Negative Feedback Review Queue (Diagnostic Quality Tuning)
SELECT 
    f.created_at,
    p.full_name,
    f.feedback_text,
    m.content AS coach_response,
    m.tool_calls
FROM public.chat_feedback f
JOIN public.chat_messages m ON m.id = f.message_id
JOIN public.profiles p ON p.id = f.user_id
WHERE f.rating = 'down'
ORDER BY f.created_at DESC
LIMIT 25;

-- 5. Tool Call Frequency & Popularity
SELECT 
    jsonb_array_elements(tool_calls)->>'name' AS tool_name,
    COUNT(*) AS execution_count
FROM public.chat_messages
WHERE role = 'assistant' AND tool_calls IS NOT NULL
GROUP BY tool_name
ORDER BY execution_count DESC;

-- 6. Average Conversation Thread Length
SELECT 
    ROUND(AVG(msg_count), 1) AS avg_messages_per_thread,
    MAX(msg_count) AS max_messages_in_thread
FROM (
    SELECT thread_id, COUNT(*) AS msg_count
    FROM public.chat_messages
    GROUP BY thread_id
) sub;
