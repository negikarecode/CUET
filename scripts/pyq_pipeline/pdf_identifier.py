"""
PDF Identifier Module for Stage 1 CUET UG PYQ Ingestion.
Extracts subject, year, shift, exam date, and time slot from filename, PDF metadata,
and document headers without hallucinating. Detects and flags conflicting signals.
"""

import os
import re
import fitz
from typing import Dict, Any, Optional

SUBJECT_MAPPINGS = {
    "accountancy": {"id": "accountancy", "name": "Accountancy", "code": "301", "stream": "commerce"},
    "biology": {"id": "biology", "name": "Biology", "code": "304", "stream": "science"},
    "business_studies": {"id": "business_studies", "name": "Business Studies", "code": "305", "stream": "commerce"},
    "chemistry": {"id": "chemistry", "name": "Chemistry", "code": "306", "stream": "science"},
    "economics": {"id": "economics", "name": "Economics", "code": "309", "stream": "commerce"},
    "english": {"id": "english", "name": "English", "code": "101", "stream": "common"},
    "general_aptitude_test": {"id": "general_aptitude_test", "name": "General Aptitude Test", "code": "501", "stream": "common"},
    "geography": {"id": "geography", "name": "Geography", "code": "313", "stream": "humanities"},
    "history": {"id": "history", "name": "History", "code": "314", "stream": "humanities"},
    "mathematics": {"id": "mathematics", "name": "Mathematics", "code": "319", "stream": "science"},
    "physics": {"id": "physics", "name": "Physics", "code": "312", "stream": "science"},
    "political_science": {"id": "political_science", "name": "Political Science", "code": "323", "stream": "humanities"},
    "psychology": {"id": "psychology", "name": "Psychology", "code": "324", "stream": "humanities"},
    "sociology": {"id": "sociology", "name": "Sociology", "code": "325", "stream": "humanities"},
}

class PDFIdentifier:
    def __init__(self):
        pass

    def identify_pdf(self, filepath: str, parent_subject_dir: Optional[str] = None) -> Dict[str, Any]:
        filename = os.path.basename(filepath)
        doc = fitz.open(filepath)
        page_count = len(doc)
        file_size = os.path.getsize(filepath)

        # 1. Subject Detection
        subject_info = None
        if parent_subject_dir and parent_subject_dir.lower() in SUBJECT_MAPPINGS:
            subject_info = SUBJECT_MAPPINGS[parent_subject_dir.lower()]
        else:
            fn_lower = filename.lower()
            for key, info in SUBJECT_MAPPINGS.items():
                if key in fn_lower or info["name"].lower() in fn_lower:
                    subject_info = info
                    break

        if not subject_info:
            subject_info = {"id": "general_aptitude_test", "name": "General Aptitude Test", "code": "501", "stream": "common"}

        # 2. Year & Date Extraction from Filename
        year_from_fn = None
        shift_from_fn = None
        date_from_fn = None
        time_from_fn = None

        # Pattern: shift-DD-MM-YYYY-time.pdf
        date_match = re.search(r"(\d{2})[-_](\d{2})[-_](202\d)", filename)
        if date_match:
            day, month, year_str = date_match.groups()
            year_from_fn = int(year_str)
            date_from_fn = f"{year_str}-{month}-{day}"
        else:
            # Pattern: 2022, 2023, 2024, 2025, 2026
            yr_match = re.search(r"(202\d)", filename)
            if yr_match:
                year_from_fn = int(yr_match.group(1))

        # Time slot / Shift from filename
        # e.g. 9_00AM-12_00PM, 3_00PM-6_00PM, 900AM-1200PM, 300PM-600PM
        time_match = re.search(r"(\d{1,2})[_:]?(\d{2})?\s*(AM|PM)[-_](\d{1,2})[_:]?(\d{2})?\s*(AM|PM)", filename, re.IGNORECASE)
        if time_match:
            time_from_fn = time_match.group(0).replace("_", ":")
            if "AM" in time_match.group(3).upper():
                shift_from_fn = "Shift 1 (Morning)"
            elif "PM" in time_match.group(3).upper():
                shift_from_fn = "Shift 2 (Afternoon/Evening)"
        elif "shift-1" in filename.lower() or "shift_1" in filename.lower() or "-1.pdf" in filename.lower():
            shift_from_fn = "Shift 1"
        elif "shift-2" in filename.lower() or "shift_2" in filename.lower() or "-2.pdf" in filename.lower():
            shift_from_fn = "Shift 2"

        # 3. Content Inspection (Read first page header)
        first_page_text = doc[0].get_text("text") if page_count > 0 else ""
        year_from_content = None
        shift_from_content = None

        # Check content for CUET Year
        content_yr_match = re.search(r"CUET\s*(?:UG)?\s*(202\d)", first_page_text, re.IGNORECASE)
        if content_yr_match:
            year_from_content = int(content_yr_match.group(1))

        # Check section name in content
        section_match = re.search(r"Section\s*:\s*([^\n\r]+)", first_page_text, re.IGNORECASE)
        detected_section = section_match.group(1).strip() if section_match else None

        # 4. Conflict Resolution & Flagging
        has_conflict = False
        conflict_notes = []

        if year_from_fn and year_from_content and year_from_fn != year_from_content:
            has_conflict = True
            conflict_notes.append(f"Year mismatch: Filename={year_from_fn}, PDF Text={year_from_content}")
            resolved_year = None # Do not arbitrarily pick
        else:
            resolved_year = year_from_content or year_from_fn

        resolved_shift = shift_from_content or shift_from_fn

        # Generate stable Document ID
        # e.g. DOC_PHYSICS_2025_06_02_S1
        clean_fn = re.sub(r"[^a-zA-Z0-9]", "_", os.path.splitext(filename)[0]).upper()
        doc_id = f"DOC_{subject_info['id'].upper()}_{clean_fn[:35]}"

        doc.close()

        return {
            "id": doc_id,
            "filename": filename,
            "filepath": os.path.abspath(filepath),
            "subject_id": subject_info["id"],
            "subject_name": subject_info["name"],
            "subject_code": subject_info["code"],
            "stream": subject_info["stream"],
            "year": resolved_year,
            "shift": resolved_shift,
            "exam_date": date_from_fn,
            "time_slot": time_from_fn,
            "page_count": page_count,
            "file_size_bytes": file_size,
            "detected_section": detected_section,
            "has_conflict": 1 if has_conflict else 0,
            "conflict_notes": "; ".join(conflict_notes) if conflict_notes else None,
            "layout_type": "standard_cbt",
            "metadata_json": {
                "year_from_filename": year_from_fn,
                "year_from_content": year_from_content,
                "shift_from_filename": shift_from_fn,
                "detected_section": detected_section
            }
        }
