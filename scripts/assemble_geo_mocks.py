import json
import os
import random
import re

def assemble_mocks():
    # Load all 14 units
    units = {}
    for u in range(1, 15):
        p = f"mock/geo_units/unit{u}.json"
        with open(p, "r", encoding="utf-8") as f:
            units[u] = json.load(f)

    # Load passages
    with open("mock/geo_units/passages.json", "r", encoding="utf-8") as f:
        passages = json.load(f)

    # Unit quotas per mock (m from 1 to 20):
    unit_quotas = [
        (1, 2),   # Q1-Q2: Human Geography: Nature & Scope
        (2, 3),   # Q3-Q5: World Population: Distribution, Density, Growth & Composition
        (3, 2),   # Q6-Q7: Human Development
        (4, 3),   # Q8-Q10: Primary Activities
        (5, 3),   # Q11-Q13: Secondary Activities
        (6, 3),   # Q14-Q16: Tertiary and Quaternary Activities
        (7, 4),   # Q17-Q20: Transport, Communication & International Trade (World)
        (8, 3),   # Q21-Q23: Human Settlements (World & Settlement Principles)
        (9, 3),   # Q24-Q26: India: Population, Density, Growth, Composition & Migration
        (10, 3),  # Q27-Q29: India: Land Resources & Agriculture
        (11, 3),  # Q30-Q32: India: Water Resources & Watershed Management
        (12, 3),  # Q33-Q35: India: Mineral and Energy Resources
        (13, 3),  # Q36-Q38: India: Planning and Sustainable Development
        (14, 2),  # Q39-Q40: India: Transport, Communication, International Trade & Selected Issues
    ]

    total_qs_assembled = 0
    option_distribution_overall = {"A": 0, "B": 0, "C": 0, "D": 0}

    for m in range(1, 21):
        mock_qs = []
        # Collect from units 1 to 14
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

        # Assign balanced option positioning (target balancing)
        rem_pairs = [
            ['A', 'B'], ['C', 'D'], ['A', 'C'], ['B', 'D'],
            ['A', 'D'], ['B', 'C'], ['A', 'B'], ['C', 'D'],
            ['A', 'C'], ['B', 'D'], ['A', 'D'], ['B', 'C'],
            ['A', 'B'], ['C', 'D'], ['A', 'C'], ['B', 'D'],
            ['A', 'D'], ['B', 'C'], ['A', 'B'], ['C', 'D']
        ]
        targets = ['A', 'B', 'C', 'D'] * 12 + rem_pairs[m - 1]  # 50 targets
        random.seed(1000 + m)
        random.shuffle(targets)

        final_mock = []
        for q_idx, q in enumerate(mock_qs, 1):
            q_copy = dict(q)
            q_copy["id"] = f"geo-mock{m}-q{q_idx}"
            q_copy["questionNumber"] = q_idx

            # Find correct option
            target_letter = targets[q_idx - 1]
            target_idx = ['A', 'B', 'C', 'D'].index(target_letter)
            correct_opt = next(opt for opt in q_copy['options'] if opt.get('isCorrect') is True)
            other_opts = [opt for opt in q_copy['options'] if opt.get('isCorrect') is not True]

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

            option_distribution_overall[target_letter] += 1
            final_mock.append(q_copy)

        # Save to mock/geo/{m}.json
        out_file = f"mock/geo/{m}.json"
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(final_mock, f, indent=2, ensure_ascii=False)

        total_qs_assembled += len(final_mock)
        print(f"Mock {m} assembled successfully: 50 questions saved to {out_file}")

    print(f"\nSuccessfully assembled all 20 Geography mocks: {total_qs_assembled} questions total.")
    print("Overall Answer Option Distribution across 1,000 questions:", option_distribution_overall)

if __name__ == "__main__":
    assemble_mocks()
