import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.geo_generators.common import normalize_text, get_pyq_normalized_set

def verify_all():
    print("=" * 60)
    print("STARTING COMPREHENSIVE VERIFICATION OF GEOGRAPHY MOCKS")
    print("=" * 60)

    # 1. Verify PDFs preserved
    for p in range(1, 6):
        pdf_path = f"mock/geo/{p}.pdf"
        assert os.path.exists(pdf_path), f"Original PDF missing: {pdf_path}"
        assert os.path.getsize(pdf_path) > 100000, f"PDF corrupted or truncated: {pdf_path}"
    print("✓ All 5 original official PYQ PDFs verified intact.")

    # 2. Verify PYQ negative set
    pyq_seen = get_pyq_normalized_set()
    print(f"✓ Loaded {len(pyq_seen)} normalized official PYQ questions for anti-duplication verification.")

    all_questions = []
    seen_normalized_texts = set()
    option_counts = {"A": 0, "B": 0, "C": 0, "D": 0}

    for m in range(1, 21):
        json_path = f"mock/geo/{m}.json"
        assert os.path.exists(json_path), f"Mock JSON missing: {json_path}"

        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        assert len(data) == 50, f"Mock {m} has {len(data)} questions instead of 50"

        for idx, q in enumerate(data, 1):
            assert q.get("questionNumber") == idx, f"Mock {m} Q{idx} has wrong questionNumber"
            assert q.get("id") == f"geo-mock{m}-q{idx}", f"Mock {m} Q{idx} has wrong ID"
            assert q.get("chapter"), f"Mock {m} Q{idx} missing chapter"
            assert q.get("topic"), f"Mock {m} Q{idx} missing topic"
            assert q.get("questionText"), f"Mock {m} Q{idx} missing questionText"
            assert q.get("detailedSolution"), f"Mock {m} Q{idx} missing detailedSolution"

            corr = q.get("correctOption")
            assert corr in ["A", "B", "C", "D"], f"Mock {m} Q{idx} invalid correctOption: {corr}"
            option_counts[corr] += 1

            opts = q.get("options", [])
            assert len(opts) == 4, f"Mock {m} Q{idx} does not have 4 options"
            opt_ids = [opt.get("id") for opt in opts]
            assert opt_ids == ["A", "B", "C", "D"], f"Mock {m} Q{idx} wrong option IDs: {opt_ids}"

            correct_opts = [opt for opt in opts if opt.get("isCorrect") is True]
            assert len(correct_opts) == 1, f"Mock {m} Q{idx} must have exactly 1 correct option"
            assert correct_opts[0]["id"] == corr, f"Mock {m} Q{idx} correct option mismatch"

            for opt in opts:
                assert opt.get("text"), f"Mock {m} Q{idx} Option {opt.get('id')} has empty text"
                if not opt.get("isCorrect"):
                    assert opt.get("studentSelectionTrap"), f"Mock {m} Q{idx} Option {opt.get('id')} missing studentSelectionTrap"
                    assert opt.get("mistakeAnalysis"), f"Mock {m} Q{idx} Option {opt.get('id')} missing mistakeAnalysis"

            norm_text = normalize_text(q["questionText"])
            assert norm_text not in seen_normalized_texts, f"Duplicate question detected in Mock {m} Q{idx}: {q['questionText'][:70]}"
            assert norm_text not in pyq_seen, f"PYQ duplicate detected in Mock {m} Q{idx}: {q['questionText'][:70]}"

            seen_normalized_texts.add(norm_text)
            all_questions.append(q)

        print(f"✓ Mock {m}: 50/50 questions verified valid.")

    print("\n" + "=" * 60)
    print("ALL VERIFICATIONS PASSED PERFECTLY!")
    print(f"Total Mocks Verified: 20")
    print(f"Total Questions Verified: {len(all_questions)}")
    print(f"Total Unique Question Texts: {len(seen_normalized_texts)}")
    print(f"Answer Key Distribution: {option_counts}")
    print("=" * 60)

if __name__ == "__main__":
    verify_all()
