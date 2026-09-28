"""Remove the retired over-broad merged-option heuristic from stored records."""
import json
import hashlib
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from scripts.pyq_pipeline.db import PYQDatabase


def main():
    db = PYQDatabase()
    conn = db.get_connection()
    rows = conn.execute("SELECT id, extraction_confidence, review_reasons_json FROM questions").fetchall()
    changed = 0
    with conn:
        for row in rows:
            reasons = json.loads(row["review_reasons_json"] or "[]")
            if "possible_merged_options" not in reasons:
                continue
            reasons = [reason for reason in reasons if reason != "possible_merged_options"]
            confidence = min(1.0, round(float(row["extraction_confidence"]) + 0.15, 2))
            requires_review = confidence < 0.85 or bool(reasons)
            conn.execute("UPDATE questions SET extraction_confidence=?, review_reasons_json=?, requires_review=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
                         (confidence, json.dumps(reasons), 1 if requires_review else 0, row["id"]))
            conn.execute("DELETE FROM review_queue WHERE question_id=? AND reason='possible_merged_options' AND status='pending'", (row["id"],))
            changed += 1
        for row in conn.execute("SELECT id,review_reasons_json FROM questions"):
            expected = set(json.loads(row["review_reasons_json"] or "[]"))
            for pending in conn.execute("SELECT id,reason FROM review_queue WHERE question_id=? AND status='pending'", (row["id"],)).fetchall():
                if pending["reason"] not in expected:
                    conn.execute("DELETE FROM review_queue WHERE id=?", (pending["id"],))
            existing = {r["reason"] for r in conn.execute("SELECT reason FROM review_queue WHERE question_id=?", (row["id"],))}
            for reason in expected - existing:
                suffix = hashlib.sha1(reason.encode("utf-8")).hexdigest()[:8]
                conn.execute("INSERT OR IGNORE INTO review_queue (id,question_id,reason,status) VALUES (?,?,?,'pending')", (f"REV_{row['id']}_{suffix}", row["id"], reason))
    conn.close()
    print(f"Removed obsolete merged-option flags from {changed} questions.")


if __name__ == "__main__":
    main()
