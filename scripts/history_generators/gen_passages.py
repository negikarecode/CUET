import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from common import (
    normalize_text,
    get_pyq_normalized_set,
    make_question,
    rotate_options
)
from passages_part1 import passages_part1
from passages_part2 import passages_part2

pyq_set = get_pyq_normalized_set()
seen_texts = set()

# Load all 12 units to ensure zero collision with existing 800 questions
for i in range(1, 13):
    u_path = f"mock/history_units/unit{i}.json"
    if os.path.exists(u_path):
        with open(u_path, "r", encoding="utf-8") as f:
            u_data = json.load(f)
            for q in u_data:
                seen_texts.add(normalize_text(q["questionText"]))

print(f"Loaded {len(seen_texts)} existing unit question texts for cross-deduplication.")

questions = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen_texts:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    if norm in pyq_set:
        raise ValueError(f"Question matches PYQ: {q['questionText'][:80]}")
    seen_texts.add(norm)
    q["questionNumber"] = len(questions) + 1
    questions.append(q)

all_passages = passages_part1 + passages_part2
print(f"Loaded {len(all_passages)} total source passages (expected 40).")
assert len(all_passages) == 40, f"Expected 40 passages, got {len(all_passages)}"

for p_idx, (chapter, topic, passage_text, q_data) in enumerate(all_passages, 1):
    assert len(q_data) == 5, f"Passage {p_idx} ({topic}) has {len(q_data)} questions, expected 5"
    for stem, corr_ans, wrongs, target_opt, expl, mistake in q_data:
        full_text = (
            f"Read the following excerpt carefully and answer the question that follows:\n\n"
            f"\"{passage_text}\"\n\n"
            f"{stem}"
        )
        opts, corr, sol = rotate_options(corr_ans, wrongs, target_opt, expl, mistake)
        q = make_question(chapter, topic, full_text, opts, corr, sol)
        add_q(q)

print(f"Total passage questions generated: {len(questions)}")
assert len(questions) == 200, f"Expected 200 questions, got {len(questions)}"

out_path = "mock/history_units/passages.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved 200 passage questions to {out_path}!")
