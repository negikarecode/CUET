"""
Idempotent data ingestion and normalization pipeline for CUET cutoffs and course-subject mapping.
Inputs:
  - data/cutoff/CUET_cutoff/*.csv (or .xlsx)
  - main.pdf (CUET UG 2026 Information Bulletin)
  - data/cutoff/overrides.json
Outputs:
  - data/cutoff/normalized_cutoffs.json
  - data/cutoff/course_subject_mapping.json
  - data/cutoff/canonical_courses.json
  - data/cutoff/canonical_subjects.json
  - data/cutoff/mapping_review_report.json
  - data/cutoff/data_quality_summary.json
"""

import os
import re
import json
import difflib
import pandas as pd

CUTOFF_DIR = "data/cutoff/CUET_cutoff"
OUTPUT_DIR = "data/cutoff"
OVERRIDES_FILE = os.path.join(OUTPUT_DIR, "overrides.json")

# 1. Canonical subjects registered in CUET AI-Prep
CANONICAL_SUBJECTS = {
    "english": {
        "id": "english",
        "name": "English",
        "code": "101",
        "type": "language"
    },
    "hindi": {
        "id": "hindi",
        "name": "Hindi",
        "code": "102",
        "type": "language"
    },
    "sanskrit": {
        "id": "sanskrit",
        "name": "Sanskrit",
        "code": "325",
        "type": "language_or_domain"
    },
    "physics": {
        "id": "physics",
        "name": "Physics",
        "code": "322",
        "type": "domain"
    },
    "chemistry": {
        "id": "chemistry",
        "name": "Chemistry",
        "code": "306",
        "type": "domain"
    },
    "maths": {
        "id": "maths",
        "name": "Mathematics / Applied Mathematics",
        "code": "319",
        "type": "domain"
    },
    "bio": {
        "id": "bio",
        "name": "Biology / Biotechnology",
        "code": "304",
        "type": "domain"
    },
    "accs": {
        "id": "accs",
        "name": "Accountancy / Book Keeping",
        "code": "301",
        "type": "domain"
    },
    "eco": {
        "id": "eco",
        "name": "Economics / Business Economics",
        "code": "309",
        "type": "domain"
    },
    "bst": {
        "id": "bst",
        "name": "Business Studies",
        "code": "305",
        "type": "domain"
    },
    "history": {
        "id": "history",
        "name": "History",
        "code": "314",
        "type": "domain"
    },
    "pol science": {
        "id": "pol science",
        "name": "Political Science",
        "code": "323",
        "type": "domain"
    },
    "geo": {
        "id": "geo",
        "name": "Geography / Geology",
        "code": "313",
        "type": "domain"
    },
    "psychology": {
        "id": "psychology",
        "name": "Psychology",
        "code": "324",
        "type": "domain"
    },
    "sociology": {
        "id": "sociology",
        "name": "Sociology",
        "code": "326",
        "type": "domain"
    },
    "computer_science": {
        "id": "computer_science",
        "name": "Computer Science / Information Practices",
        "code": "308",
        "type": "domain"
    },
    "physical_education": {
        "id": "physical_education",
        "name": "Physical Education",
        "code": "321",
        "type": "domain"
    },
    "home_science": {
        "id": "home_science",
        "name": "Home Science",
        "code": "315",
        "type": "domain"
    },
    "mass_media": {
        "id": "mass_media",
        "name": "Mass Media / Mass Communication",
        "code": "318",
        "type": "domain"
    },
    "environmental_studies": {
        "id": "environmental_studies",
        "name": "Environmental Studies",
        "code": "307",
        "type": "domain"
    },
    "fine_arts": {
        "id": "fine_arts",
        "name": "Fine Arts / Visual Arts",
        "code": "312",
        "type": "domain"
    },
    "agriculture": {
        "id": "agriculture",
        "name": "Agriculture",
        "code": "302",
        "type": "domain"
    },
    "anthropology": {
        "id": "anthropology",
        "name": "Anthropology",
        "code": "303",
        "type": "domain"
    },
    "general_test": {
        "id": "general_test",
        "name": "General Aptitude Test",
        "code": "501",
        "type": "general_test"
    }
}

ALL_DOMAINS = [
    "physics", "chemistry", "maths", "bio", "accs", "eco", "bst", "history",
    "pol science", "geo", "psychology", "sociology", "computer_science",
    "physical_education", "home_science", "mass_media", "environmental_studies",
    "fine_arts", "agriculture", "anthropology"
]
ALL_LANGUAGES = ["english", "hindi", "sanskrit"]

# 2. Canonical Course Definitions and Subject Combinations (DU CSAS rules)
# Schema: { id, name, stream, degreeType, cutoffScale, subjectCount, combinations: [...] }
CANONICAL_COURSES = {
    "bcom_hons": {
        "id": "bcom_hons",
        "name": "B.Com. (Hons.)",
        "stream": "commerce",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1_maths",
                "label": "Language + Maths + 2 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"},
                    {"type": "best_of", "subjects": [s for s in ALL_DOMAINS if s != "maths"], "count": 2, "label": "Any 2 Domains"}
                ]
            },
            {
                "id": "comb_2_accounts",
                "label": "Language + Accountancy + 2 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "required", "subjects": ["accs"], "count": 1, "label": "Accountancy"},
                    {"type": "best_of", "subjects": [s for s in ALL_DOMAINS if s != "accs"], "count": 2, "label": "Any 2 Domains"}
                ]
            }
        ]
    },
    "bcom_prog": {
        "id": "bcom_prog",
        "name": "B.Com.",
        "stream": "commerce",
        "degreeType": "Program",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1_domains",
                "label": "Language + 3 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            },
            {
                "id": "comb_2_general_test",
                "label": "Language + 1 Domain + General Test",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 1, "label": "Any 1 Domain"},
                    {"type": "required", "subjects": ["general_test"], "count": 1, "label": "General Test"}
                ]
            }
        ]
    },
    "ba_hons_economics": {
        "id": "ba_hons_economics",
        "name": "B.A. (Hons.) Economics",
        "stream": "commerce",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1_maths",
                "label": "Language + Maths + 2 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"},
                    {"type": "best_of", "subjects": [s for s in ALL_DOMAINS if s != "maths"], "count": 2, "label": "Any 2 Domains"}
                ]
            }
        ]
    },
    "ba_hons_pol_science": {
        "id": "ba_hons_pol_science",
        "name": "B.A. (Hons.) Political Science",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + Political Science + 2 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ["pol science"] + [s for s in ALL_DOMAINS if s != "pol science"], "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_hons_history": {
        "id": "ba_hons_history",
        "name": "B.A. (Hons.) History",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + 3 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_hons_psychology": {
        "id": "ba_hons_psychology",
        "name": "B.A. (Hons.) Psychology",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + 3 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_hons_applied_psychology": {
        "id": "ba_hons_applied_psychology",
        "name": "B.A. (Hons.) Applied Psychology",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + 3 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_hons_english": {
        "id": "ba_hons_english",
        "name": "B.A. (Hons.) English",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "English + 3 Domains",
                "rules": [
                    {"type": "required", "subjects": ["english"], "count": 1, "label": "English Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_hons_hindi": {
        "id": "ba_hons_hindi",
        "name": "B.A. (Hons.) Hindi",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Hindi + 3 Domains",
                "rules": [
                    {"type": "required", "subjects": ["hindi"], "count": 1, "label": "Hindi Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_hons_geography": {
        "id": "ba_hons_geography",
        "name": "B.A. (Hons.) Geography",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + 3 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_hons_sociology": {
        "id": "ba_hons_sociology",
        "name": "B.A. (Hons.) Sociology",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + 3 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_hons_philosophy": {
        "id": "ba_hons_philosophy",
        "name": "B.A. (Hons.) Philosophy",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + 3 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_hons_journalism": {
        "id": "ba_hons_journalism",
        "name": "B.A. (Hons.) Journalism",
        "stream": "humanities",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1_english",
                "label": "English + 3 Domains",
                "rules": [
                    {"type": "required", "subjects": ["english"], "count": 1, "label": "English Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            },
            {
                "id": "comb_2_general_test",
                "label": "English + General Test",
                "rules": [
                    {"type": "required", "subjects": ["english"], "count": 1, "label": "English Language"},
                    {"type": "required", "subjects": ["general_test"], "count": 1, "label": "General Test"}
                ]
            }
        ]
    },
    "bsc_hons_physics": {
        "id": "bsc_hons_physics",
        "name": "B.Sc. (Hons.) Physics",
        "stream": "science",
        "degreeType": "Honours",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pcm",
                "label": "Physics + Chemistry + Mathematics",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["chemistry"], "count": 1, "label": "Chemistry"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"}
                ]
            }
        ]
    },
    "bsc_hons_chemistry": {
        "id": "bsc_hons_chemistry",
        "name": "B.Sc. (Hons.) Chemistry",
        "stream": "science",
        "degreeType": "Honours",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pcm",
                "label": "Physics + Chemistry + Mathematics",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["chemistry"], "count": 1, "label": "Chemistry"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"}
                ]
            }
        ]
    },
    "bsc_hons_mathematics": {
        "id": "bsc_hons_mathematics",
        "name": "B.Sc. (Hons.) Mathematics",
        "stream": "science",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + Maths + 2 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"},
                    {"type": "best_of", "subjects": [s for s in ALL_DOMAINS if s != "maths"], "count": 2, "label": "Any 2 Domains"}
                ]
            }
        ]
    },
    "bsc_hons_statistics": {
        "id": "bsc_hons_statistics",
        "name": "B.Sc. (Hons.) Statistics",
        "stream": "science",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + Maths + 2 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"},
                    {"type": "best_of", "subjects": [s for s in ALL_DOMAINS if s != "maths"], "count": 2, "label": "Any 2 Domains"}
                ]
            }
        ]
    },
    "bsc_hons_computer_science": {
        "id": "bsc_hons_computer_science",
        "name": "B.Sc. (Hons.) Computer Science",
        "stream": "science",
        "degreeType": "Honours",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + Maths + 2 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"},
                    {"type": "best_of", "subjects": [s for s in ALL_DOMAINS if s != "maths"], "count": 2, "label": "Any 2 Domains"}
                ]
            }
        ]
    },
    "bsc_hons_botany": {
        "id": "bsc_hons_botany",
        "name": "B.Sc. (Hons.) Botany",
        "stream": "science",
        "degreeType": "Honours",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pcb",
                "label": "Physics + Chemistry + Biology",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["chemistry"], "count": 1, "label": "Chemistry"},
                    {"type": "required", "subjects": ["bio"], "count": 1, "label": "Biology"}
                ]
            }
        ]
    },
    "bsc_hons_zoology": {
        "id": "bsc_hons_zoology",
        "name": "B.Sc. (Hons.) Zoology",
        "stream": "science",
        "degreeType": "Honours",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pcb",
                "label": "Physics + Chemistry + Biology",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["chemistry"], "count": 1, "label": "Chemistry"},
                    {"type": "required", "subjects": ["bio"], "count": 1, "label": "Biology"}
                ]
            }
        ]
    },
    "bsc_hons_biomedical": {
        "id": "bsc_hons_biomedical",
        "name": "B.Sc. (Hons.) Biomedical Science",
        "stream": "science",
        "degreeType": "Honours",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pcb",
                "label": "Physics + Chemistry + Biology",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["chemistry"], "count": 1, "label": "Chemistry"},
                    {"type": "required", "subjects": ["bio"], "count": 1, "label": "Biology"}
                ]
            }
        ]
    },
    "bsc_hons_electronics": {
        "id": "bsc_hons_electronics",
        "name": "B.Sc. (Hons.) Electronics",
        "stream": "science",
        "degreeType": "Honours",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pcm",
                "label": "Physics + Chemistry + Mathematics",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["chemistry"], "count": 1, "label": "Chemistry"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"}
                ]
            }
        ]
    },
    "bsc_prog_life_science": {
        "id": "bsc_prog_life_science",
        "name": "B.Sc. (Prog.) Life Science",
        "stream": "science",
        "degreeType": "Program",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pcb",
                "label": "Physics + Chemistry + Biology",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["chemistry"], "count": 1, "label": "Chemistry"},
                    {"type": "required", "subjects": ["bio"], "count": 1, "label": "Biology"}
                ]
            }
        ]
    },
    "bsc_prog_phys_sci_chem": {
        "id": "bsc_prog_phys_sci_chem",
        "name": "B.Sc. (Prog.) Physical Science with Chemistry",
        "stream": "science",
        "degreeType": "Program",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pcm",
                "label": "Physics + Chemistry + Mathematics",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["chemistry"], "count": 1, "label": "Chemistry"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"}
                ]
            }
        ]
    },
    "bsc_prog_phys_sci_cs": {
        "id": "bsc_prog_phys_sci_cs",
        "name": "B.Sc. (Prog.) Physical Science with Computer Science/ Informatics Practices",
        "stream": "science",
        "degreeType": "Program",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pm_cs",
                "label": "Physics + Mathematics + Computer Science/Chemistry",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"},
                    {"type": "one_of", "subjects": ["computer_science", "chemistry"], "count": 1, "label": "CS / Chemistry"}
                ]
            }
        ]
    },
    "bsc_prog_phys_sci_elec": {
        "id": "bsc_prog_phys_sci_elec",
        "name": "B.Sc. (Prog.) Physical Science with Electronics",
        "stream": "science",
        "degreeType": "Program",
        "cutoffScale": 750,
        "subjectCount": 3,
        "combinations": [
            {
                "id": "comb_pm_elec",
                "label": "Physics + Mathematics + Chemistry",
                "rules": [
                    {"type": "required", "subjects": ["physics"], "count": 1, "label": "Physics"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"},
                    {"type": "required", "subjects": ["chemistry"], "count": 1, "label": "Chemistry"}
                ]
            }
        ]
    },
    "bms": {
        "id": "bms",
        "name": "Bachelor of Management Studies (BMS)",
        "stream": "commerce",
        "degreeType": "Professional",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + Maths + General Test + 1 Domain",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"},
                    {"type": "required", "subjects": ["general_test"], "count": 1, "label": "General Test"},
                    {"type": "best_of", "subjects": [s for s in ALL_DOMAINS if s != "maths"], "count": 1, "label": "Best 1 Domain"}
                ]
            }
        ]
    },
    "bba_fia": {
        "id": "bba_fia",
        "name": "Bachelor of Business Administration (Financial Investment Analysis) (BBA(FIA))",
        "stream": "commerce",
        "degreeType": "Professional",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + Maths + General Test + 1 Domain",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "required", "subjects": ["maths"], "count": 1, "label": "Mathematics"},
                    {"type": "required", "subjects": ["general_test"], "count": 1, "label": "General Test"},
                    {"type": "best_of", "subjects": [s for s in ALL_DOMAINS if s != "maths"], "count": 1, "label": "Best 1 Domain"}
                ]
            }
        ]
    },
    "beled": {
        "id": "beled",
        "name": "Bachelor of Elementary Education (B.El.Ed.)",
        "stream": "humanities",
        "degreeType": "Professional",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1",
                "label": "Language + 3 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            }
        ]
    },
    "ba_prog_general": {
        "id": "ba_prog_general",
        "name": "B.A. Program (General Discipline Combinations)",
        "stream": "humanities",
        "degreeType": "Program",
        "cutoffScale": 1000,
        "subjectCount": 4,
        "combinations": [
            {
                "id": "comb_1_domains",
                "label": "Language + 3 Domains",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 3, "label": "Any 3 Domains"}
                ]
            },
            {
                "id": "comb_2_general_test",
                "label": "Language + 1 Domain + General Test",
                "rules": [
                    {"type": "one_of", "subjects": ALL_LANGUAGES, "count": 1, "label": "Language"},
                    {"type": "best_of", "subjects": ALL_DOMAINS, "count": 1, "label": "Any 1 Domain"},
                    {"type": "required", "subjects": ["general_test"], "count": 1, "label": "General Test"}
                ]
            }
        ]
    }
}

def clean_program_name(name: str) -> str:
    """Normalize program name punctuation and formatting."""
    if not isinstance(name, str):
        return ""
    n = name.strip()
    n = re.sub(r'\s+', ' ', n)
    # Standardize abbreviations
    n = n.replace("B.Com.", "B.Com").replace("B.Sc.", "B.Sc").replace("B.A.", "B.A")
    n = n.replace("B.Com (Hons.)", "B.Com. (Hons.)").replace("B.Com (Hons)", "B.Com. (Hons.)")
    n = n.replace("B.Sc (Hons.)", "B.Sc. (Hons.)").replace("B.Sc (Hons)", "B.Sc. (Hons.)")
    n = n.replace("B.A (Hons.)", "B.A. (Hons.)").replace("B.A (Hons)", "B.A. (Hons.)")
    n = n.replace("B.Sc (Prog.)", "B.Sc. (Prog.)")
    # Fix dot differences
    n = re.sub(r'B\.Com\b(?!\.)', 'B.Com.', n)
    n = re.sub(r'B\.Sc\b(?!\.)', 'B.Sc.', n)
    n = re.sub(r'B\.A\b(?!\.)', 'B.A.', n)
    return n.strip()

def normalize_college_name(name: str) -> str:
    """Clean duplicate college names in raw 2025 data."""
    if not isinstance(name, str):
        return ""
    n = re.sub(r'\s+', ' ', name).strip()
    # Fix repeated strings e.g. "Janki Devi Memorial College (W) Janki Devi Memorial College (W)"
    half = len(n) // 2
    for split_idx in range(half - 5, half + 5):
        if 0 < split_idx < len(n):
            s1 = n[:split_idx].strip()
            s2 = n[split_idx:].strip()
            if s1 == s2:
                return s1
    return n

def build_matcher():
    """Build fuzzy matching dictionary between raw program names and canonical courses."""
    # Load manual overrides if present
    overrides = {}
    if os.path.exists(OVERRIDES_FILE):
        try:
            with open(OVERRIDES_FILE, "r", encoding="utf-8") as f:
                overrides = json.load(f)
        except Exception as e:
            print(f"Warning: could not read overrides.json: {e}")

    return overrides

def match_program(raw_name: str, overrides: dict):
    """
    Match a raw program name to a canonical course.
    Returns: (status: 'matched'|'needs_review'|'unmatched', canonical_id, score, candidates)
    """
    cleaned = clean_program_name(raw_name)

    # 1. Check manual override
    if raw_name in overrides:
        target = overrides[raw_name]
        if target in CANONICAL_COURSES:
            return ("matched", target, 1.0, [{"id": target, "score": 1.0, "reason": "override"}])
    if cleaned in overrides:
        target = overrides[cleaned]
        if target in CANONICAL_COURSES:
            return ("matched", target, 1.0, [{"id": target, "score": 1.0, "reason": "override"}])

    # 2. Direct exact name check
    for cid, cdef in CANONICAL_COURSES.items():
        if cleaned.lower() == cdef["name"].lower():
            return ("matched", cid, 1.0, [{"id": cid, "score": 1.0}])

    # 3. Direct prefix / pattern rules for broad groups
    # B.A. Program variations (e.g. B.A Program (History + Political Science))
    if re.search(r'B\.A\.?\s*(Program|Prog)', cleaned, re.IGNORECASE):
        # Specific discipline variations
        return ("matched", "ba_prog_general", 0.95, [
            {"id": "ba_prog_general", "score": 0.95, "reason": "BA Program combination"}
        ])

    # Fuzzy match across canonical names
    candidates = []
    for cid, cdef in CANONICAL_COURSES.items():
        ratio = difflib.SequenceMatcher(None, cleaned.lower(), cdef["name"].lower()).ratio()
        # Keyword booster
        if cid == "bcom_hons" and "b.com" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bcom_prog" and "b.com" in cleaned.lower() and "hons" not in cleaned.lower():
            ratio = max(ratio, 0.95)
        elif cid == "bsc_hons_physics" and "physics" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bsc_hons_chemistry" and "chemistry" in cleaned.lower() and "hons" in cleaned.lower() and "industrial" not in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bsc_hons_mathematics" and "mathematics" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bsc_hons_statistics" and "statistics" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bsc_hons_computer_science" and "computer" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bsc_hons_botany" and "botany" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bsc_hons_zoology" and "zoology" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bsc_prog_life_science" and "life science" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bsc_prog_phys_sci_chem" and "physical science with chemistry" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_economics" and "economics" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_pol_science" and ("political" in cleaned.lower() or "pol" in cleaned.lower()) and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_history" and "history" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_english" and "english" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_hindi" and "hindi" in cleaned.lower() and "hons" in cleaned.lower() and "patrakarita" not in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_psychology" and "psychology" in cleaned.lower() and "applied" not in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_applied_psychology" and "applied psychology" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_geography" and "geography" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_sociology" and "sociology" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_philosophy" and "philosophy" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "ba_hons_journalism" and "journalism" in cleaned.lower() and "hons" in cleaned.lower():
            ratio = max(ratio, 0.96)
        elif cid == "bms" and ("management studies" in cleaned.lower() or "bms" in cleaned.lower()):
            ratio = max(ratio, 0.96)
        elif cid == "bba_fia" and ("bba" in cleaned.lower() or "financial investment" in cleaned.lower()):
            ratio = max(ratio, 0.96)
        elif cid == "beled" and "b.el.ed" in cleaned.lower():
            ratio = max(ratio, 0.96)

        candidates.append({"id": cid, "score": round(ratio, 4), "name": cdef["name"]})

    candidates.sort(key=lambda x: x["score"], reverse=True)
    top_candidates = candidates[:3]
    top_score = top_candidates[0]["score"] if top_candidates else 0

    if top_score >= 0.88:
        return ("matched", top_candidates[0]["id"], top_score, top_candidates)
    elif top_score >= 0.50:
        return ("needs_review", top_candidates[0]["id"], top_score, top_candidates)
    else:
        return ("unmatched", None, top_score, top_candidates)

def run_pipeline():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    overrides = build_matcher()

    cutoff_files = [f for f in sorted(os.listdir(CUTOFF_DIR)) if f.endswith(".csv")]
    print(f"Found {len(cutoff_files)} cutoff CSV files in {CUTOFF_DIR}: {cutoff_files}")

    all_raw_programs = set()
    normalized_records = []
    quality_issues = []

    for fname in cutoff_files:
        fpath = os.path.join(CUTOFF_DIR, fname)
        # Extract year from filename, e.g. 2025_cutoff_data.csv -> 2025
        year_match = re.search(r'(\d{4})', fname)
        year = int(year_match.group(1)) if year_match else 2026

        df = pd.read_csv(fpath)
        print(f"Processing {fname}: {len(df)} rows")

        for idx, row in df.iterrows():
            college_raw = str(row.get("College Name", "")).strip()
            college_clean = normalize_college_name(college_raw)
            prog_raw = str(row.get("Program Name", "")).strip()
            all_raw_programs.add(prog_raw)

            # Match program
            status, matched_cid, score, cands = match_program(prog_raw, overrides)
            cdef = CANONICAL_COURSES.get(matched_cid) if matched_cid else None

            # Plausible cutoff scale
            cutoff_max = cdef["cutoffScale"] if cdef else 1000

            categories = ["UR", "OBC", "SC", "ST", "EWS", "PwBD"]
            for cat in categories:
                val = row.get(cat)
                if pd.notna(val) and val != "" and val is not None:
                    try:
                        val_float = float(val)
                    except ValueError:
                        quality_issues.append({
                            "type": "invalid_number",
                            "file": fname,
                            "college": college_clean,
                            "program": prog_raw,
                            "category": cat,
                            "value": str(val)
                        })
                        continue

                    # Validate range
                    if val_float < 0 or val_float > cutoff_max + 10:
                        quality_issues.append({
                            "type": "out_of_range",
                            "file": fname,
                            "college": college_clean,
                            "program": prog_raw,
                            "category": cat,
                            "value": val_float,
                            "scale": cutoff_max
                        })

                    normalized_records.append({
                        "university": "University of Delhi",
                        "college": college_clean,
                        "raw_college": college_raw,
                        "course": prog_raw,
                        "canonical_course_id": matched_cid,
                        "canonical_course_name": cdef["name"] if cdef else None,
                        "stream": cdef["stream"] if cdef else "general",
                        "year": year,
                        "category": cat,
                        "round": "Final",
                        "cutoff_value": round(val_float, 4),
                        "cutoff_max": cutoff_max,
                        "source_file": fname
                    })

    # Classify all programs into matched, needs_review, unmatched
    matched_programs = {}
    needs_review_programs = {}
    unmatched_programs = {}

    for p in sorted(all_raw_programs):
        status, cid, score, cands = match_program(p, overrides)
        entry = {
            "raw_program": p,
            "status": status,
            "canonical_id": cid,
            "canonical_name": CANONICAL_COURSES[cid]["name"] if cid in CANONICAL_COURSES else None,
            "score": score,
            "top_candidates": cands
        }
        if status == "matched":
            matched_programs[p] = entry
        elif status == "needs_review":
            needs_review_programs[p] = entry
        else:
            unmatched_programs[p] = entry

    # Data Quality Summary
    total_records = len(normalized_records)
    records_by_year = {}
    for r in normalized_records:
        y = r["year"]
        records_by_year[y] = records_by_year.get(y, 0) + 1

    summary = {
        "total_normalized_cutoffs": total_records,
        "records_by_year": records_by_year,
        "total_unique_raw_programs": len(all_raw_programs),
        "matched_programs_count": len(matched_programs),
        "needs_review_programs_count": len(needs_review_programs),
        "unmatched_programs_count": len(unmatched_programs),
        "canonical_courses_count": len(CANONICAL_COURSES),
        "canonical_subjects_count": len(CANONICAL_SUBJECTS),
        "quality_issues_count": len(quality_issues),
        "quality_issues": quality_issues[:50]
    }

    # Save mapping review report
    mapping_report = {
        "summary": {
            "total_raw": len(all_raw_programs),
            "matched": len(matched_programs),
            "needs_review": len(needs_review_programs),
            "unmatched": len(unmatched_programs)
        },
        "needs_review": needs_review_programs,
        "unmatched": unmatched_programs,
        "matched_sample": list(matched_programs.values())[:20]
    }

    # Write committed JSON outputs
    with open(os.path.join(OUTPUT_DIR, "normalized_cutoffs.json"), "w", encoding="utf-8") as f:
        json.dump(normalized_records, f, indent=2)

    with open(os.path.join(OUTPUT_DIR, "course_subject_mapping.json"), "w", encoding="utf-8") as f:
        json.dump(CANONICAL_COURSES, f, indent=2)

    with open(os.path.join(OUTPUT_DIR, "canonical_courses.json"), "w", encoding="utf-8") as f:
        json.dump(list(CANONICAL_COURSES.values()), f, indent=2)

    with open(os.path.join(OUTPUT_DIR, "canonical_subjects.json"), "w", encoding="utf-8") as f:
        json.dump(CANONICAL_SUBJECTS, f, indent=2)

    with open(os.path.join(OUTPUT_DIR, "mapping_review_report.json"), "w", encoding="utf-8") as f:
        json.dump(mapping_report, f, indent=2)

    with open(os.path.join(OUTPUT_DIR, "data_quality_summary.json"), "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)

    # Also sync a copy to lib/data/standing/ so TypeScript Next.js components can import it directly!
    ts_data_dir = "lib/data/standing"
    os.makedirs(ts_data_dir, exist_ok=True)
    with open(os.path.join(ts_data_dir, "course_subject_mapping.json"), "w", encoding="utf-8") as f:
        json.dump(CANONICAL_COURSES, f, indent=2)
    with open(os.path.join(ts_data_dir, "canonical_subjects.json"), "w", encoding="utf-8") as f:
        json.dump(CANONICAL_SUBJECTS, f, indent=2)
    with open(os.path.join(ts_data_dir, "canonical_courses.json"), "w", encoding="utf-8") as f:
        json.dump(list(CANONICAL_COURSES.values()), f, indent=2)
    with open(os.path.join(ts_data_dir, "normalized_cutoffs.json"), "w", encoding="utf-8") as f:
        json.dump(normalized_records, f, indent=2)

    print("\n=== PIPELINE EXECUTION SUMMARY ===")
    print(f"Total normalized cutoff records: {total_records}")
    print(f"Records by year: {records_by_year}")
    print(f"Unique raw programs: {len(all_raw_programs)}")
    print(f"Matched programs: {len(matched_programs)}")
    print(f"Needs review: {len(needs_review_programs)}")
    print(f"Unmatched: {len(unmatched_programs)}")
    print(f"Quality issues: {len(quality_issues)}")
    print(f"Successfully generated outputs in {OUTPUT_DIR} and {ts_data_dir}!")

if __name__ == "__main__":
    run_pipeline()
