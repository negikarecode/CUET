import os
import json
from collections import Counter, defaultdict

SUBJECTS = [
    ("physics", "mock/physics"),
    ("chemistry", "mock/chemistry"),
    ("maths", "mock/maths"),
    ("biology", "mock/bio"),
    ("accountancy", "mock/accs"),
    ("economics", "mock/eco"),
    ("business-studies", "mock/bst"),
    ("history", "mock/history"),
    ("political-science", "mock/pol science"),
    ("geography", "mock/geo"),
    ("psychology", "mock/psychology"),
]

def audit():
    overall_stats = {
        "total_files": 0,
        "total_questions": 0,
        "subjects": {}
    }

    all_questions_text = defaultdict(list)

    for subj_name, subj_dir in SUBJECTS:
        subj_stats = {
            "mock_count": 0,
            "total_questions": 0,
            "answer_distribution": Counter(),
            "option_count_issues": 0,
            "duplicate_options_issues": 0,
            "missing_solution_issues": 0,
            "missing_topic_chapter": 0,
            "invalid_correct_option": 0,
            "option_mismatch_with_is_correct": 0,
            "exact_duplicate_questions": 0,
            "file_issues": [],
            "mock_dist_bias": [] # mocks where any option is > 20 or < 5
        }

        subject_q_texts = defaultdict(list)

        for mock_num in range(1, 21):
            filepath = os.path.join(subj_dir, f"{mock_num}.json")
            if not os.path.exists(filepath):
                subj_stats["file_issues"].append(f"Missing file: {filepath}")
                continue

            subj_stats["mock_count"] += 1
            overall_stats["total_files"] += 1

            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception as e:
                subj_stats["file_issues"].append(f"Error reading {filepath}: {e}")
                continue

            if not isinstance(data, list):
                subj_stats["file_issues"].append(f"{filepath} is not a JSON list")
                continue

            if len(data) != 50:
                subj_stats["file_issues"].append(f"{filepath} has {len(data)} questions instead of 50")

            mock_dist = Counter()

            for q_idx, q in enumerate(data):
                subj_stats["total_questions"] += 1
                overall_stats["total_questions"] += 1

                q_text = (q.get("questionText") or "").strip()
                if not q_text:
                    subj_stats["file_issues"].append(f"{filepath} Q{q_idx+1}: Empty questionText")

                subject_q_texts[q_text].append((mock_num, q_idx + 1))
                all_questions_text[q_text].append((subj_name, mock_num, q_idx + 1))

                opts = q.get("options", [])
                if len(opts) != 4:
                    subj_stats["option_count_issues"] += 1

                opt_texts = [str(o.get("text", "")).strip() for o in opts]
                if len(set(opt_texts)) < len(opt_texts):
                    subj_stats["duplicate_options_issues"] += 1

                corr = q.get("correctOption")
                if corr not in ["A", "B", "C", "D"]:
                    subj_stats["invalid_correct_option"] += 1
                else:
                    subj_stats["answer_distribution"][corr] += 1
                    mock_dist[corr] += 1

                # Check isCorrect flag if present
                for opt in opts:
                    if "isCorrect" in opt:
                        if opt.get("id") == corr and not opt.get("isCorrect"):
                            subj_stats["option_mismatch_with_is_correct"] += 1
                        elif opt.get("id") != corr and opt.get("isCorrect"):
                            subj_stats["option_mismatch_with_is_correct"] += 1

                sol = q.get("detailedSolution") or ""
                if len(sol.strip()) < 5:
                    subj_stats["missing_solution_issues"] += 1

                chap = q.get("chapter") or ""
                top = q.get("topic") or ""
                if not chap.strip() or not top.strip():
                    subj_stats["missing_topic_chapter"] += 1

            # Check mock distribution bias
            for opt, cnt in mock_dist.items():
                if cnt > 20 or cnt < 6:
                    subj_stats["mock_dist_bias"].append((mock_num, dict(mock_dist)))
                    break

        # Calculate exact duplicates in this subject
        exact_dupes = {k: v for k, v in subject_q_texts.items() if len(v) > 1 and k}
        subj_stats["exact_duplicate_questions"] = len(exact_dupes)
        subj_stats["exact_duplicate_instances"] = sum(len(v) - 1 for v in exact_dupes.values())

        overall_stats["subjects"][subj_name] = subj_stats

    # Cross-subject duplicates
    cross_dupes = {k: v for k, v in all_questions_text.items() if len(set(x[0] for x in v)) > 1 and k}
    overall_stats["cross_subject_duplicates"] = len(cross_dupes)

    print("=== OVERALL AUDIT SUMMARY ===")
    print(f"Total Files: {overall_stats['total_files']}")
    print(f"Total Questions: {overall_stats['total_questions']}")
    print(f"Cross Subject Duplicates: {overall_stats['cross_subject_duplicates']}")
    print("\n=== PER SUBJECT BREAKDOWN ===")
    for subj_name, stats in overall_stats["subjects"].items():
        print(f"\n[{subj_name.upper()}]")
        print(f"  Mocks: {stats['mock_count']}")
        print(f"  Questions: {stats['total_questions']}")
        print(f"  Answer Dist (A/B/C/D): A={stats['answer_distribution']['A']}, B={stats['answer_distribution']['B']}, C={stats['answer_distribution']['C']}, D={stats['answer_distribution']['D']}")
        print(f"  Option count issues: {stats['option_count_issues']}")
        print(f"  Duplicate options in single Q: {stats['duplicate_options_issues']}")
        print(f"  Invalid correctOption: {stats['invalid_correct_option']}")
        print(f"  Option isCorrect mismatch: {stats['option_mismatch_with_is_correct']}")
        print(f"  Missing solution: {stats['missing_solution_issues']}")
        print(f"  Missing topic/chapter: {stats['missing_topic_chapter']}")
        print(f"  Exact unique question dupes: {stats['exact_duplicate_questions']} ({stats.get('exact_duplicate_instances', 0)} repeated instances)")
        print(f"  Mocks with severe answer bias: {len(stats['mock_dist_bias'])}")
        if stats["file_issues"]:
            print(f"  File issues ({len(stats['file_issues'])}): {stats['file_issues'][:5]}")

if __name__ == "__main__":
    audit()
