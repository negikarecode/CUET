import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.bio_generators.common import normalize_text, get_pyq_normalized_set

def assemble():
    print("Loading generated unit questions...")
    u1 = json.load(open("mock/bio_units/unit1.json"))
    u2_gen = json.load(open("mock/bio_units/unit2_genetics.json"))
    u2_evo = json.load(open("mock/bio_units/unit2_evolution.json"))
    u3 = json.load(open("mock/bio_units/unit3.json"))
    u4 = json.load(open("mock/bio_units/unit4.json"))
    u5 = json.load(open("mock/bio_units/unit5.json"))
    passages = json.load(open("mock/bio_units/passages.json"))

    assert len(u1) == 160, f"Unit 1 has {len(u1)} questions"
    assert len(u2_gen) == 200, f"Unit 2 Gen has {len(u2_gen)} questions"
    assert len(u2_evo) == 80, f"Unit 2 Evo has {len(u2_evo)} questions"
    assert len(u3) == 120, f"Unit 3 has {len(u3)} questions"
    assert len(u4) == 120, f"Unit 4 has {len(u4)} questions"
    assert len(u5) == 120, f"Unit 5 has {len(u5)} questions"
    assert len(passages) == 200, f"Passages has {len(passages)} questions"

    total_pool = len(u1) + len(u2_gen) + len(u2_evo) + len(u3) + len(u4) + len(u5) + len(passages)
    print(f"Total verified question pool: {total_pool} questions")
    assert total_pool == 1000, f"Total questions is {total_pool} instead of 1000!"

    pyq_seen = get_pyq_normalized_set()
    global_seen = set()

    # Ensure output directory exists
    os.makedirs("mock/bio", exist_ok=True)

    # Distribute into Mocks 1 to 20
    for m in range(20):
        mock_num = m + 1
        mock_qs = []

        # Q1-Q8: Reproduction (8 questions)
        q_u1 = u1[m * 8 : (m + 1) * 8]
        # Q9-Q18: Genetics & Molecular (10 questions)
        q_u2_gen = u2_gen[m * 10 : (m + 1) * 10]
        # Q19-Q22: Evolution (4 questions)
        q_u2_evo = u2_evo[m * 4 : (m + 1) * 4]
        # Q23-Q28: Human Welfare & Microbes (6 questions)
        q_u3 = u3[m * 6 : (m + 1) * 6]
        # Q29-Q34: Biotechnology (6 questions)
        q_u4 = u4[m * 6 : (m + 1) * 6]
        # Q35-Q40: Ecology & Environment (6 questions)
        q_u5 = u5[m * 6 : (m + 1) * 6]
        # Q41-Q45: Passage 1 (5 questions)
        q_p1 = passages[(m * 2) * 5 : (m * 2 + 1) * 5]
        # Q46-Q50: Passage 2 (5 questions)
        q_p2 = passages[(m * 2 + 1) * 5 : (m * 2 + 2) * 5]

        combined = q_u1 + q_u2_gen + q_u2_evo + q_u3 + q_u4 + q_u5 + q_p1 + q_p2
        assert len(combined) == 50, f"Mock {mock_num} has {len(combined)} questions instead of 50!"

        for q_idx, q in enumerate(combined):
            q_copy = dict(q)
            q_copy["questionNumber"] = q_idx + 1
            norm = normalize_text(q_copy["questionText"])
            if norm in global_seen:
                raise ValueError(f"Global duplicate detected in Mock {mock_num} Q{q_idx+1}")
            if norm in pyq_seen:
                raise ValueError(f"PYQ duplicate detected in Mock {mock_num} Q{q_idx+1}")
            global_seen.add(norm)
            mock_qs.append(q_copy)

        out_file = f"mock/bio/{mock_num}.json"
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(mock_qs, f, indent=2, ensure_ascii=False)
        print(f"Saved Mock {mock_num} with 50 questions to {out_file}")

    print(f"\nAll 20 Biology mocks successfully assembled! Total unique questions: {len(global_seen)}")

if __name__ == "__main__":
    assemble()
