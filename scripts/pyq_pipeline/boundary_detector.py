"""
Question Boundary Detector for Stage 1 CUET UG PYQ Ingestion.
Identifies question start positions, options boundaries, multi-page question continuations,
and computes bounding box vertical coordinates for targeted OCR.
"""

import re
from typing import List, Dict, Any, Optional, Tuple

class BoundaryDetector:
    def __init__(self):
        self.q_start_regex = re.compile(
            r"(?:^|\n)\s*(?:Q\.?\s*(\d+)|Question\s*(\d+)|(?<![Option\s])(\b\d{1,2})\s*[\.\)])\s*",
            re.IGNORECASE
        )
        self.nta_options_trailer = re.compile(
            r"Options\s+1\.\s*1\s+2\.\s*2\s+3\.\s*3\s+4\.\s*4",
            re.IGNORECASE
        )

    def detect_question_segments_in_doc(
        self,
        extracted_pages: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        raw_candidates = []

        q_marker_regex = re.compile(r"^\s*(?:Q\.?(?:\s*No\.?)?|Question\s*(?:No\.?)?)\s*(\d{1,3})\b", re.IGNORECASE)

        for page_data in extracted_pages:
            p_no = page_data["page_number"]
            raw_text = page_data.get("raw_text") or ""
            ocr_text = page_data.get("ocr_text") or ""

            if ocr_text and raw_text:
                ocr_markers = {int(m.group(1)) for line in ocr_text.splitlines() for m in [q_marker_regex.match(line.strip())] if m}
                raw_markers = {int(m.group(1)) for line in raw_text.splitlines() for m in [q_marker_regex.match(line.strip())] if m}
                missing_in_ocr = raw_markers - ocr_markers
                if missing_in_ocr:
                    prefix_lines = [line for line in raw_text.splitlines() for m in [q_marker_regex.match(line.strip())] if m and int(m.group(1)) in missing_in_ocr]
                    text = "\n".join(prefix_lines) + "\n" + ocr_text
                else:
                    text = ocr_text
            else:
                text = ocr_text or raw_text

            blocks = page_data.get("text_blocks", [])
            page_h = page_data.get("page_rect", [0, 0, 595, 842])[3]

            # Find line-level y positions for question markers. Fall back to
            # block starts for older callers without geometry.
            q_markers = []
            for b in (page_data.get("text_lines") or blocks):
                b_text = b["text"].strip()
                m = q_marker_regex.match(b_text)
                if m:
                    q_num = int(m.group(1))
                    y0 = b["bbox"][1]
                    q_markers.append((q_num, y0))

            # Sort markers by y position
            q_markers.sort(key=lambda x: x[1])

            # Merge exact duplicate markers emitted by PDF layout spans.
            q_markers = list(dict.fromkeys(q_markers))
            # Compute vertical bounding boxes per question on this page
            q_bboxes = {}
            for idx, (q_n, y_start) in enumerate(q_markers):
                y_end = q_markers[idx + 1][1] if idx + 1 < len(q_markers) else page_h
                q_bboxes[q_n] = (max(0, y_start - 5), min(page_h, y_end + 5))

            # Split lines into questions
            lines = text.split("\n")
            current_q = None
            current_lines = []
            leading_lines = []
            first_marker_seen = False

            for line in lines:
                m = q_marker_regex.match(line.strip())

                if m:
                    q_num = int(m.group(1))
                    if not first_marker_seen:
                        first_marker_seen = True
                        leading_text = "\n".join(leading_lines).strip()
                        if raw_candidates and sum(ch.isalnum() for ch in leading_text) >= 8:
                            # A question can continue at the top of the next
                            # PDF page before that page's first Q marker.
                            # Preserve those lines as a continuation chunk for
                            # the last question on the preceding page.
                            raw_candidates.append({
                                "question_number": raw_candidates[-1]["question_number"],
                                "raw_lines": leading_lines,
                                "page": p_no,
                                "bbox_y": (0, page_h),
                                "page_data": page_data,
                            })
                    if current_q is not None:
                        raw_candidates.append({
                            "question_number": current_q,
                            "raw_lines": current_lines,
                            "page": p_no,
                            "bbox_y": q_bboxes.get(current_q, (0, page_h)),
                            "page_data": page_data
                        })
                    current_q = q_num
                    current_lines = [line]
                else:
                    if current_q is not None:
                        current_lines.append(line)
                    elif not first_marker_seen:
                        leading_lines.append(line)

            if current_q is not None:
                raw_candidates.append({
                    "question_number": current_q,
                    "raw_lines": current_lines,
                    "page": p_no,
                    "bbox_y": q_bboxes.get(current_q, (0, page_h)),
                    "page_data": page_data
                })
            elif not first_marker_seen and raw_candidates:
                continuation = "\n".join(leading_lines).strip()
                if sum(ch.isalnum() for ch in continuation) >= 8:
                    raw_candidates.append({
                        "question_number": raw_candidates[-1]["question_number"],
                        "raw_lines": leading_lines,
                        "page": p_no,
                        "bbox_y": (0, page_h),
                        "page_data": page_data,
                    })

        # Merge multi-page questions
        merged_questions: Dict[int, Dict[str, Any]] = {}

        for item in raw_candidates:
            q_num = item["question_number"]
            page_no = item["page"]
            text_chunk = "\n".join(item["raw_lines"])

            if q_num not in merged_questions:
                merged_questions[q_num] = {
                    "question_number": q_num,
                    "raw_chunks": [text_chunk],
                    "pages": [page_no],
                    "primary_page": page_no,
                    "bboxes_y": [item["bbox_y"]],
                    "page_datas": [item["page_data"]]
                }
            else:
                merged_questions[q_num]["raw_chunks"].append(text_chunk)
                if page_no not in merged_questions[q_num]["pages"]:
                    merged_questions[q_num]["pages"].append(page_no)
                merged_questions[q_num]["bboxes_y"].append(item["bbox_y"])
                merged_questions[q_num]["page_datas"].append(item["page_data"])

        final_list = []
        for q_num in sorted(merged_questions.keys()):
            entry = merged_questions[q_num]
            full_raw_text = "\n".join(entry["raw_chunks"]).strip()
            final_list.append({
                "question_number": q_num,
                "full_raw_text": full_raw_text,
                "pages": entry["pages"],
                "source_page": entry["primary_page"],
                "bbox_y": entry["bboxes_y"][0] if entry["bboxes_y"] else (0, 842),
                "page_datas": entry["page_datas"]
            })

        return final_list
