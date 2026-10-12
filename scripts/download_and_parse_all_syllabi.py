import os
import json
import subprocess
import re
import fitz # PyMuPDF

OFFICIAL_JSON = "reports/cuet_ug_official_syllabus.json"
PDF_DIR = "reports/official_cuet_ug_2026_pdfs"
TEXT_DIR = "reports/official_cuet_ug_2026_text"
OUTPUT_PARSED = "reports/cuet_ug_2026_official_parsed_syllabus.json"

os.makedirs(PDF_DIR, exist_ok=True)
os.makedirs(TEXT_DIR, exist_ok=True)

with open(OFFICIAL_JSON, "r", encoding="utf-8") as f:
    subjects = json.load(f)

parsed_catalog = []

for sub in subjects:
    code = sub["code"]
    name = sub["name"]
    category = sub["category"]
    pdf_url = sub["pdfUrl"]
    
    safe_name = re.sub(r'[^a-zA-Z0-9_-]', '_', name)[:40]
    pdf_filename = f"{code}_{safe_name}.pdf"
    pdf_path = os.path.join(PDF_DIR, pdf_filename)
    txt_filename = f"{code}_{safe_name}.txt"
    txt_path = os.path.join(TEXT_DIR, txt_filename)
    
    print(f"Downloading/Extracting: [{code}] {name}...")
    if not os.path.exists(pdf_path) or os.path.getsize(pdf_path) < 1000:
        res = subprocess.run(["curl", "-s", "-L", pdf_url, "-o", pdf_path], timeout=60)
        
    full_text = ""
    units = []
    if os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 1000:
        try:
            doc = fitz.open(pdf_path)
            for page in doc:
                full_text += page.get_text() + "\n"
            with open(txt_path, "w", encoding="utf-8") as tf:
                tf.write(full_text)
                
            # Parse Units / Sections / Chapters
            lines = full_text.splitlines()
            current_unit = None
            
            for line in lines:
                line_str = line.strip()
                # Match patterns like: Unit 1: ..., UNIT I: ..., Unit - I ..., Section A: ...
                unit_match = re.match(r'^(Unit|UNIT|Section|SECTION)\s*[-:]?\s*([0-9IVXLCDM]+|[A-Z])\s*[:\-\.]?\s*(.*)$', line_str, re.IGNORECASE)
                if unit_match:
                    unit_prefix = unit_match.group(1).title()
                    unit_num = unit_match.group(2)
                    unit_title = unit_match.group(3).strip()
                    current_unit = {
                        "unit": f"{unit_prefix} {unit_num}",
                        "title": unit_title,
                        "raw": line_str,
                        "topics": []
                    }
                    units.append(current_unit)
                elif current_unit and line_str.startswith(('●', '•', '-', '*', 'o')):
                    clean_topic = re.sub(r'^[●•\-\*o\s]+', '', line_str).strip()
                    if clean_topic:
                        current_unit["topics"].append(clean_topic)
        except Exception as e:
            print(f"Error parsing PDF for {code} {name}: {e}")
            
    parsed_catalog.append({
        "code": code,
        "name": name,
        "category": category,
        "pdfUrl": pdf_url,
        "pdfFile": pdf_path,
        "unitsCount": len(units),
        "units": units,
        "rawTextLength": len(full_text)
    })

with open(OUTPUT_PARSED, "w", encoding="utf-8") as out_f:
    json.dump(parsed_catalog, out_f, indent=2, ensure_ascii=False)

print(f"\nSuccessfully downloaded and parsed all {len(parsed_catalog)} subjects into {OUTPUT_PARSED}")
