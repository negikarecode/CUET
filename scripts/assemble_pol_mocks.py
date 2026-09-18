import json
import os

def assemble_mocks():
    # Load all 15 units
    units = {}
    for u in range(1, 16):
        p = f"mock/pol_units/unit{u}.json"
        with open(p, "r", encoding="utf-8") as f:
            units[u] = json.load(f)

    # Load passages
    with open("mock/pol_units/passages.json", "r", encoding="utf-8") as f:
        passages = json.load(f)

    # Slices per unit for mock m (1-indexed, m from 1 to 20):
    unit_quotas = [
        (1, 3),   # Q1-Q3: The End of Bipolarity
        (2, 3),   # Q4-Q6: Contemporary Centres of Power
        (3, 3),   # Q7-Q9: Contemporary South Asia
        (4, 3),   # Q10-Q12: International Organisations
        (5, 2),   # Q13-Q14: Security in the Contemporary World
        (6, 3),   # Q15-Q17: Environment and Natural Resources
        (7, 2),   # Q18-Q19: Globalisation
        (8, 3),   # Q20-Q22: Challenges of Nation Building
        (9, 2),   # Q23-Q24: Era of One-Party Dominance
        (10, 3),  # Q25-Q27: Politics of Planned Development
        (11, 3),  # Q28-Q30: India's External Relations
        (12, 2),  # Q31-Q32: Challenges to and Restoration of the Congress System
        (13, 3),  # Q33-Q35: The Crisis of Democratic Order
        (14, 3),  # Q36-Q38: Regional Aspirations
        (15, 2),  # Q39-Q40: Recent Developments in Indian Politics
    ]

    total_qs_assembled = 0
    for m in range(1, 21):
        mock_qs = []
        # Collect from units 1 to 15
        for u_num, quota in unit_quotas:
            start_idx = (m - 1) * quota
            end_idx = m * quota
            slice_qs = units[u_num][start_idx:end_idx]
            assert len(slice_qs) == quota, f"Unit {u_num} underflow for mock {m}: got {len(slice_qs)} expected {quota}"
            mock_qs.extend(slice_qs)

        assert len(mock_qs) == 40, f"Expected 40 unit questions for mock {m}, got {len(mock_qs)}"

        # Collect from passages: 2 passages per mock = 10 questions (Q41-Q50)
        p_start = (m - 1) * 10
        p_end = m * 10
        p_qs = passages[p_start:p_end]
        assert len(p_qs) == 10, f"Expected 10 passage questions for mock {m}, got {len(p_qs)}"
        mock_qs.extend(p_qs)

        assert len(mock_qs) == 50, f"Expected 50 total questions for mock {m}, got {len(mock_qs)}"

        # Assign clean IDs, question numbers, and balanced option positioning (25% A, B, C, D)
        targets = ['A', 'B', 'C', 'D'] * 12 + ['A', 'B']  # 50 targets
        import random, re
        random.seed(42 + m)
        random.shuffle(targets)

        final_mock = []
        for q_idx, q in enumerate(mock_qs, 1):
            q_copy = dict(q)
            q_copy["id"] = f"pol-mock{m}-q{q_idx}"
            q_copy["questionNumber"] = q_idx

            # Find correct option
            target_letter = targets[q_idx - 1]
            target_idx = ['A', 'B', 'C', 'D'].index(target_letter)
            correct_opt = next(opt for opt in q_copy['options'] if opt.get('isCorrect') == True)
            other_opts = [opt for opt in q_copy['options'] if opt.get('isCorrect') != True]

            new_opts = []
            other_iter = iter(other_opts)
            for i in range(4):
                if i == target_idx:
                    new_opts.append(dict(correct_opt))
                else:
                    new_opts.append(dict(next(other_iter)))

            for i, opt in enumerate(new_opts):
                opt['id'] = ['A', 'B', 'C', 'D'][i]

            q_copy['options'] = new_opts
            q_copy['correctOption'] = target_letter
            q_copy['detailedSolution'] = re.sub(
                r'Hence,?\s*Option\s*[A-D]\s*is\s*correct\.?',
                f'Hence, Option {target_letter} is correct.',
                q_copy['detailedSolution'],
                flags=re.IGNORECASE
            )

            final_mock.append(q_copy)

        # Save to mock/polscience/{m}.json
        out_file = f"mock/polscience/{m}.json"
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(final_mock, f, indent=2, ensure_ascii=False)
        total_qs_assembled += len(final_mock)
        print(f"Wrote {out_file} (50 questions)")

    print(f"\nSuccessfully assembled all 20 Political Science mock tests! Total questions: {total_qs_assembled}")

if __name__ == "__main__":
    assemble_mocks()
