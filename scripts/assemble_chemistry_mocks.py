import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.chem_generators.common import normalize_text, get_base_seen

def assemble():
    seen = get_base_seen()
    print(f"Base unique questions in Mocks 1..5, 19, 20: {len(seen)}")

    from scripts.chem_generators.solutions import get_solutions_questions
    from scripts.chem_generators.electrochem import get_electrochem_questions
    from scripts.chem_generators.kinetics import get_kinetics_questions
    from scripts.chem_generators.dfblock import get_dfblock_questions
    from scripts.chem_generators.coordination import get_coordination_questions
    from scripts.chem_generators.haloalkanes import get_haloalkanes_questions
    from scripts.chem_generators.alcohols import get_alcohols_questions
    from scripts.chem_generators.carbonyls import get_carbonyls_questions
    from scripts.chem_generators.amines import get_amines_questions
    from scripts.chem_generators.biomolecules import get_biomolecules_questions

    chapters_data = [
        ("Solutions", get_solutions_questions(seen)),
        ("Electrochemistry", get_electrochem_questions(seen)),
        ("Chemical Kinetics", get_kinetics_questions(seen)),
        ("The d- and f-Block Elements", get_dfblock_questions(seen)),
        ("Coordination Compounds", get_coordination_questions(seen)),
        ("Haloalkanes and Haloarenes", get_haloalkanes_questions(seen)),
        ("Alcohols, Phenols and Ethers", get_alcohols_questions(seen)),
        ("Aldehydes, Ketones and Carboxylic Acids", get_carbonyls_questions(seen)),
        ("Amines", get_amines_questions(seen)),
        ("Biomolecules", get_biomolecules_questions(seen))
    ]

    for name, qs in chapters_data:
        assert len(qs) == 65, f"Chapter {name} has {len(qs)} questions instead of 65!"
        print(f"Chapter {name}: 65 unique questions verified.")

    # Distribute into Mocks 6..18
    # 13 mocks, m_idx from 0 to 12
    for m_idx in range(13):
        mock_num = m_idx + 6
        mock_qs = []
        q_num = 1
        for ch_name, qs in chapters_data:
            chunk = qs[m_idx * 5 : (m_idx + 1) * 5]
            for item in chunk:
                q_copy = dict(item)
                q_copy["questionNumber"] = q_num
                mock_qs.append(q_copy)
                q_num += 1
        
        assert len(mock_qs) == 50, f"Mock {mock_num} has {len(mock_qs)} questions!"
        file_path = f"mock/chemistry/{mock_num}.json"
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(mock_qs, f, indent=2, ensure_ascii=False)
        print(f"Saved {file_path} with 50 questions.")

    print("\nAll 13 Chemistry mocks assembled successfully!")

if __name__ == "__main__":
    assemble()
