#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
import functools
from collections import defaultdict

print = functools.partial(print, flush=True)

def normalize_text(text):
    if not text:
        return ""
    t = text.lower()
    t = re.sub(r"\[cite:[^\]]+\]", "", t)
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    t = re.sub(r"[\$\\\{\}\(\)\[\]_^\s\.,;:\-\+=\*\/<>]+", "", t)
    return t

def get_api_key():
    if os.path.exists(".env.local"):
        with open(".env.local", "r") as f:
            for line in f:
                if line.startswith("GROQ_API_KEY="):
                    return line.split("=", 1)[1].strip()
    return os.environ.get("GROQ_API_KEY", "")

API_KEY = get_api_key()

def generate_single_question(subj, chapter, topic, q_num, seen_norm, max_retries=6):
    prompt = f"""Generate 1 authentic CUET UG multiple choice question for:
Subject: {subj.capitalize()}
Chapter: {chapter}
Topic: {topic}
Question Number: {q_num}

Strict Requirements:
1. Standard NCERT textbook curriculum for Class 12 / CUET-UG.
2. Must have exactly 4 options (A, B, C, D) with exactly one correct option.
3. Every option must have `id`, `text`, `isCorrect` (boolean), `studentSelectionTrap`, and `mistakeAnalysis`.
4. Must include a step-by-step `detailedSolution`.
5. For all mathematical formulas, symbols, and chemical equations, use LaTeX inside $...$.
6. Format as valid JSON with double-escaped backslashes (\\\\frac, \\\\sqrt, etc.).

Return strict JSON:
{{
  "questionNumber": {q_num},
  "chapter": "{chapter}",
  "topic": "{topic}",
  "questionText": "...",
  "hasDiagram": false,
  "diagramDescription": null,
  "options": [
    {{"id": "A", "text": "...", "isCorrect": false, "studentSelectionTrap": "...", "mistakeAnalysis": "..."}},
    {{"id": "B", "text": "...", "isCorrect": false, "studentSelectionTrap": "...", "mistakeAnalysis": "..."}},
    {{"id": "C", "text": "...", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "..."}},
    {{"id": "D", "text": "...", "isCorrect": false, "studentSelectionTrap": "...", "mistakeAnalysis": "..."}}
  ],
  "correctOption": "C",
  "detailedSolution": "..."
}}"""

    req_data = {
        "model": "groq/compound-mini",
        "messages": [
            {
                "role": "system",
                "content": "You are a premier CUET-UG examination paper setter. Always output strict valid JSON object with double-escaped LaTeX."
            },
            {"role": "user", "content": prompt}
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.4
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
    }

    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(
                "https://api.groq.com/openai/v1/chat/completions",
                data=json.dumps(req_data).encode("utf-8"),
                headers=headers
            )
            with urllib.request.urlopen(req, timeout=45) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                content = res["choices"][0]["message"]["content"].strip()
                content = re.sub(r"^```(?:json)?\s*", "", content, flags=re.IGNORECASE)
                content = re.sub(r"\s*```$", "", content)
                q_obj = json.loads(content)

                # Handle if wrapped in questions array or single object
                if "questions" in q_obj and isinstance(q_obj["questions"], list) and len(q_obj["questions"]) > 0:
                    q_obj = q_obj["questions"][0]

                # Validate
                raw_text = q_obj.get("questionText", "").strip()
                norm = normalize_text(raw_text)
                if not raw_text or norm in seen_norm:
                    print(f"      [Retry {attempt+1}] Generated question was duplicate or empty.")
                    time.sleep(1)
                    continue

                opts = q_obj.get("options", [])
                if len(opts) != 4:
                    print(f"      [Retry {attempt+1}] Option count was {len(opts)} instead of 4.")
                    time.sleep(1)
                    continue

                correct_opts = [o for o in opts if o.get("isCorrect") is True]
                if len(correct_opts) != 1:
                    # Fix isCorrect if needed
                    c_id = q_obj.get("correctOption", "A")
                    for o in opts:
                        o["isCorrect"] = (o["id"] == c_id)

                q_obj["questionNumber"] = q_num
                q_obj["chapter"] = chapter
                q_obj["topic"] = topic
                return q_obj

        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait_sec = 10 + (attempt * 5)
                print(f"      [Rate Limit 429] Waiting {wait_sec}s...")
                time.sleep(wait_sec)
            else:
                print(f"      [HTTP Error {e.code}] Retrying in 4s...")
                time.sleep(4)
        except Exception as e:
            print(f"      [Error {e}] Retrying in 3s...")
            time.sleep(3)

    raise RuntimeError(f"Failed to generate valid question after {max_retries} attempts for Q{q_num} [{chapter} - {topic}]")

def fix_subject(subj):
    subj_dir = f"./mock/{subj}"
    print(f"\n=======================================================")
    print(f"   STARTING DUPLICATE REMOVAL FOR {subj.upper()}")
    print(f"=======================================================")

    # 1. Load all 20 mocks
    mocks = {}
    for m in range(1, 21):
        p = f"{subj_dir}/{m}.json"
        with open(p, "r", encoding="utf-8") as f:
            mocks[m] = json.load(f)

    # 2. Identify all seen questions and find duplicates
    seen_norm = set()
    to_replace_by_mock = defaultdict(list)

    for m in range(1, 21):
        for idx, q in enumerate(mocks[m]):
            norm = normalize_text(q.get("questionText", ""))
            if norm in seen_norm:
                to_replace_by_mock[m].append((idx, q))
            else:
                seen_norm.add(norm)

    total_dupes = sum(len(v) for v in to_replace_by_mock.values())
    print(f"Found {total_dupes} duplicate questions to replace across {len(to_replace_by_mock)} mocks.")

    if total_dupes == 0:
        print(f"SUCCESS: No duplicates found in {subj}! Already 100% unique.")
        return

    # 3. Process each mock
    for m in sorted(to_replace_by_mock.keys()):
        items = to_replace_by_mock[m]
        print(f"\nProcessing Mock {m}: {len(items)} questions to replace...")
        
        for count, (target_idx, old_q) in enumerate(items, 1):
            qn = old_q["questionNumber"]
            ch = old_q["chapter"]
            top = old_q["topic"]
            print(f"  [{count}/{len(items)}] Generating replacement for Mock {m} Q{qn:02d} [{ch} - {top}]...")

            new_q = generate_single_question(subj, ch, top, qn, seen_norm)
            mocks[m][target_idx] = new_q
            seen_norm.add(normalize_text(new_q["questionText"]))
            time.sleep(1.0)

            # Incremental save every 5 questions
            if count % 5 == 0 or count == len(items):
                p = f"{subj_dir}/{m}.json"
                with open(p, "w", encoding="utf-8") as f:
                    json.dump(mocks[m], f, indent=2, ensure_ascii=False)

        p = f"{subj_dir}/{m}.json"
        with open(p, "w", encoding="utf-8") as f:
            json.dump(mocks[m], f, indent=2, ensure_ascii=False)
        print(f"✓ Saved updated {p} ({len(mocks[m])} questions).")

    print(f"\nCompleted replacement for {subj.upper()}!")

if __name__ == "__main__":
    subj = sys.argv[1] if len(sys.argv) > 1 else "maths"
    fix_subject(subj)
