"""
Question Reconstructor Module for Stage 1 CUET UG PYQ Ingestion.
Parses question stems, extracts options A, B, C, D, normalizes LaTeX expressions,
crops and preserves figures/diagrams, and structures tables.
"""

import os
import re
from typing import Dict, Any, List, Optional, Tuple
from PIL import Image
import fitz

class QuestionReconstructor:
    def __init__(self, public_images_dir: str = "public/pyq_images"):
        self.public_images_dir = public_images_dir
        os.makedirs(self.public_images_dir, exist_ok=True)

    def normalize_math_text(self, text: str) -> str:
        """
        Carefully normalizes mathematical expressions into valid LaTeX $ ... $
        without corrupting normal prose or English text.
        """
        if not text:
            return ""

        s = text

        # Unicode superscripts to LaTeX exponents: ², ³, ⁴, ⁵, ⁶, ⁷, ⁸, ⁹, ⁰, ⁻¹, ⁻², ⁻³
        superscript_map = {
            "⁰": "^0", "¹": "^1", "²": "^2", "³": "^3", "⁴": "^4",
            "⁵": "^5", "⁶": "^6", "⁷": "^7", "⁸": "^8", "⁹": "^9",
            "⁻¹": "^{-1}", "⁻²": "^{-2}", "⁻³": "^{-3}", "⁻": "^-"
        }
        for sup_char, lat in superscript_map.items():
            s = s.replace(sup_char, lat)

        # Common Greek symbols in CUET Physics/Chemistry
        greek_map = {
            "μC": r"$\mu\text{C}$",
            "μF": r"$\mu\text{F}$",
            "μH": r"$\mu\text{H}$",
            "μm": r"$\mu\text{m}$",
            "µ": r"$\mu$",
            "Ω": r"$\Omega$",
            "λ": r"$\lambda$",
            "θ": r"$\theta$",
            "α": r"$\alpha$",
            "β": r"$\beta$",
            "γ": r"$\gamma$",
            "π": r"$\pi$",
            "ε₀": r"$\varepsilon_0$",
            "σ": r"$\sigma$",
            "ρ": r"$\rho$",
            "Δ": r"$\Delta$"
        }
        for sym, lat in greek_map.items():
            s = s.replace(sym, lat)

        # Clean multiple spaces while preserving newlines
        s = re.sub(r"[ \t]+", " ", s)
        return s.strip()

    def detect_table_structure(self, text: str) -> Optional[Dict[str, Any]]:
        """
        Detects Match List-I with List-II tables or structured key-value tables.
        """
        if "Match List-I with List-II" in text or ("List-I" in text and "List-II" in text):
            # Extract items under List-I and List-II
            # List-I: (A), (B), (C), (D)
            # List-II: (I), (II), (III), (IV)
            list1_items = re.findall(r"\(([A-D])\)\s*([^\n\r\(]+)", text)
            list2_items = re.findall(r"\(([I|V|X]+)\)\s*([^\n\r\(]+)", text)

            rows = []
            max_len = max(len(list1_items), len(list2_items))
            for i in range(max_len):
                col1 = f"({list1_items[i][0]}) {list1_items[i][1].strip()}" if i < len(list1_items) else ""
                col2 = f"({list2_items[i][0]}) {list2_items[i][1].strip()}" if i < len(list2_items) else ""
                rows.append([col1, col2])

            return {
                "type": "match_list",
                "headers": ["List-I", "List-II"],
                "rows": rows
            }
        return None

    def extract_and_save_question_image(
        self,
        doc_id: str,
        q_num: int,
        page_datas: List[Dict[str, Any]],
        q_text: str,
        source_page: Optional[int] = None,
        bbox_y: Optional[Tuple[float, float]] = None,
    ) -> Tuple[bool, Optional[str], Optional[str]]:
        """
        Extracts and crops figures/diagrams associated with the question.
        Returns: (has_image, image_rel_path, image_description)
        """
        # Check if the page has embedded figures or diagrams
        for page_data in page_datas:
            image_boxes = page_data.get("image_boxes", [])
            page_img_path = page_data.get("page_image_full_path")

            if source_page is not None and page_data.get("page_number") == source_page and not bbox_y:
                continue
            if source_page is not None and page_data.get("page_number") == source_page and bbox_y:
                y0, y1 = bbox_y
                page_rect = page_data.get("page_rect", [0, 0, 595, 842])
                page_area = max(1, page_rect[2] * page_rect[3])
                image_boxes = [box for box in image_boxes if box["bbox"][1] < y1 and box["bbox"][3] > y0
                               and box["width"] * box["height"] / page_area < 0.7]
                if not image_boxes:
                    continue
            elif source_page is not None and page_data.get("page_number") != source_page and not any(
                cue in q_text.lower() for cue in ["diagram", "circuit", "figure", "graph", "shown below", "given below", "plotted"]
            ):
                continue

            if image_boxes and page_img_path and os.path.exists(page_img_path):
                # Save visual crop for this question
                img_dir = os.path.join(self.public_images_dir, doc_id)
                os.makedirs(img_dir, exist_ok=True)
                crop_filename = f"q_{q_num:02d}_figure.png"
                crop_full_path = os.path.join(img_dir, crop_filename)
                crop_rel_path = f"/pyq_images/{doc_id}/{crop_filename}"

                # The candidate boxes have already been restricted to the
                # question's source region, so this crop is source-grounded.
                if image_boxes:
                    try:
                        # Prefer the embedded image intersecting this question's
                        # source region, rather than an unrelated image elsewhere
                        # on the same page.
                        target_box = max(image_boxes, key=lambda box: box["width"] * box["height"])["bbox"]
                        with Image.open(page_img_path) as full_img:
                            w, h = full_img.size
                            page_rect = page_data.get("page_rect", [0, 0, 595, 842])
                            page_w = max(1.0, float(page_rect[2] - page_rect[0]))
                            page_h = max(1.0, float(page_rect[3] - page_rect[1]))
                            scale_x = w / page_w
                            scale_y = h / page_h

                            x0 = max(0, int(target_box[0] * scale_x) - 10)
                            y0 = max(0, int(target_box[1] * scale_y) - 10)
                            x1 = min(w, int(target_box[2] * scale_x) + 10)
                            y1 = min(h, int(target_box[3] * scale_y) + 10)

                            if (x1 - x0) > 40 and (y1 - y0) > 30:
                                cropped = full_img.crop((x0, y0, x1, y1))
                                cropped.save(crop_full_path)

                                desc = "Diagram/Figure for question prompt"
                                if "circuit" in q_text.lower():
                                    desc = "Circuit diagram with components"
                                elif "graph" in q_text.lower() or "curve" in q_text.lower():
                                    desc = "Plot / Graph illustration"

                                return True, crop_rel_path, desc
                    except Exception:
                        pass

        return False, None, None

    def reconstruct(
        self,
        doc_id: str,
        subject_id: str,
        q_item: Dict[str, Any],
        ocr_fallback_text: Optional[str] = None
    ) -> Dict[str, Any]:
        q_num = q_item["question_number"]
        raw_full = q_item["full_raw_text"]
        source_page = q_item["source_page"]
        source_pages = q_item["pages"]
        page_datas = q_item.get("page_datas", [])

        # Clean leading Q.N
        cleaned = re.sub(r"^\s*Q\.?\s*\d+\s*", "", raw_full, flags=re.IGNORECASE).strip()
        cleaned = re.sub(r"^Section\s*:\s*[^\n\r]+\s*", "", cleaned, flags=re.IGNORECASE).strip()

        # Remove trailing NTA radio buttons list: Options 1. 1 \n 2. 2 \n 3. 3 \n 4. 4
        stem_options_part = re.split(r"Options\s+1\.\s*1", cleaned, flags=re.IGNORECASE)[0].strip()

        # Check if stem is empty or truncated, and we have OCR text
        if len(stem_options_part) < 15 and ocr_fallback_text:
            cleaned = ocr_fallback_text
            stem_options_part = re.split(r"Options\s+1\.\s*1", cleaned, flags=re.IGNORECASE)[0].strip()

        # Options Extraction. Some CBT PDFs put an outer answer label on its
        # own line ("1.") and then include numbered material inside that
        # option. Prefer a complete set of bare outer labels before generic
        # numbered-line matching, which would otherwise split the inner list.
        options_dict = {}
        lines = stem_options_part.splitlines()
        bare_matches = [(i, re.match(r"^\s*([1-4])[\.,\)]\s*$", line)) for i, line in enumerate(lines)]
        bare_starts = [(i, m.group(1)) for i, m in bare_matches if m]
        outer_bare = None
        for i in range(len(bare_starts) - 3):
            group = bare_starts[i:i + 4]
            if [n for _, n in group] == ["1", "2", "3", "4"]:
                outer_bare = group
                break

        if outer_bare:
            first_line = outer_bare[0][0]
            stem = "\n".join(lines[:first_line]).strip()
            for idx, (line_no, key_no) in enumerate(outer_bare):
                next_line = outer_bare[idx + 1][0] if idx < 3 else len(lines)
                val = "\n".join(lines[line_no + 1:next_line]).strip()
                k = {"1": "A", "2": "B", "3": "C", "4": "D"}[key_no]
                options_dict[k] = {"raw_text": val, "normalized_text": self.normalize_math_text(val), "is_correct": 0, "distractor_reason": None}
        else:
            # Strategy 1: Numbered options with text on the label line (e.g. 1. text, 1) text, (1) text).
            opt_matches = list(re.finditer(r"(?:^|\n)\s*\(?([1-4])\)[\.,\:\s]\s*(\S[\s\S]*?)(?=(?:\n\s*\(?[1-4]\)[\.,\:\s]|\Z))", stem_options_part))
            if not opt_matches or len(opt_matches) < 4:
                opt_matches = list(re.finditer(r"(?:^|\n)\s*([1-4])[\.,\)]\s*(\S[\s\S]*?)(?=(?:\n\s*[1-4][\.,\)]\s*\S)|\Z)", stem_options_part))

            if len(opt_matches) >= 4 and [m.group(1) for m in opt_matches[:4]] == ["1", "2", "3", "4"]:
                stem = stem_options_part[:opt_matches[0].start()].strip()
                for m, k in zip(opt_matches[:4], "ABCD"):
                    val = m.group(2).strip()
                    options_dict[k] = {"raw_text": val, "normalized_text": self.normalize_math_text(val), "is_correct": 0, "distractor_reason": None}
            else:
                # Strategy 2: Alphabetical options (A., (A), A)).
                alpha_matches = list(re.finditer(r"(?:^|\n)\s*\(?([A-D])\)[\.\s:]\s*(.+?)(?=(?:\n\s*\(?[A-D]\)[\.\s:]|\Z))", stem_options_part, re.DOTALL))
                if len(alpha_matches) >= 4:
                    stem = stem_options_part[:alpha_matches[0].start()].strip()
                    for m in alpha_matches[:4]:
                        k = m.group(1).upper()
                        val = m.group(2).strip()
                        options_dict[k] = {"raw_text": val, "normalized_text": self.normalize_math_text(val), "is_correct": 0, "distractor_reason": None}
                else:
                    # Strategy 3: Trailing bare option numbers 1 2 3 4 or 1. 2. 3. 4. after 4 option text lines
                    clean_lines = [l.strip() for l in stem_options_part.splitlines() if l.strip()]
                    trailing_nums = [re.sub(r"[^\d]", "", l) for l in clean_lines[-4:]] if len(clean_lines) >= 5 else []
                    if trailing_nums == ["1", "2", "3", "4"]:
                        opt_candidate = clean_lines[-8:-4] if len(clean_lines) >= 8 else clean_lines[-5:-1]
                        if len(opt_candidate) == 4:
                            stem = "\n".join(clean_lines[:-8] if len(clean_lines) >= 8 else clean_lines[:-5]).strip()
                            for k, val in zip("ABCD", opt_candidate):
                                val_clean = re.sub(r"^\s*[\.\,\:\-]\s*", "", val).strip()
                                options_dict[k] = {"raw_text": val_clean, "normalized_text": self.normalize_math_text(val_clean), "is_correct": 0, "distractor_reason": None}
                        else:
                            stem = stem_options_part
                            for k in ["A", "B", "C", "D"]:
                                options_dict[k] = {"raw_text": "", "normalized_text": "", "is_correct": 0, "distractor_reason": None}
                    else:
                        # Strategy 4: Horizontal options on single or multi-line strings
                        horiz_matches = list(re.finditer(r"(?:\(|\b)([1-4])[\)\.\:]\s*([^\(1-4\)\n]+?)(?=(?:\(|\b)[1-4][\)\.\:]|\Z)", stem_options_part))
                        if len(horiz_matches) >= 4 and [m.group(1) for m in horiz_matches[:4]] == ["1", "2", "3", "4"]:
                            stem = stem_options_part[:horiz_matches[0].start()].strip()
                            for m, k in zip(horiz_matches[:4], "ABCD"):
                                val = m.group(2).strip()
                                options_dict[k] = {"raw_text": val, "normalized_text": self.normalize_math_text(val), "is_correct": 0, "distractor_reason": None}
                        else:
                            # Keep partial content for review instead of pretending it forms four valid options.
                            stem = stem_options_part
                            for k in ["A", "B", "C", "D"]:
                                options_dict[k] = {"raw_text": "", "normalized_text": "", "is_correct": 0, "distractor_reason": None}

        # Clean stem from stray headers and leading OCR numbering
        stem = re.sub(r"Section\s*:\s*[^\n\r]+", "", stem, flags=re.IGNORECASE).strip()
        stem = re.sub(r"^(?:Q\.?\s*\d+|[a-zA-Z]?\d+)\s*[\.\:\-\)]?\s*", "", stem, flags=re.IGNORECASE).strip()
        normalized_stem = self.normalize_math_text(stem)

        # Detect tables
        table_data = self.detect_table_structure(raw_full)

        # Extract & crop images if present
        has_img, img_rel_path, img_desc = self.extract_and_save_question_image(
            doc_id, q_num, page_datas, stem,
            source_page=source_page, bbox_y=q_item.get("bbox_y")
        )

        # Generate stable unique question ID
        q_id = f"Q_{doc_id}_{q_num:02d}"

        return {
            "id": q_id,
            "document_id": doc_id,
            "subject_id": subject_id,
            "question_number": q_num,
            "raw_question_text": stem,
            "normalized_question_text": normalized_stem,
            "options": options_dict,
            "has_image": 1 if has_img else 0,
            "image_path": img_rel_path,
            "image_description": img_desc,
            "has_table": 1 if table_data else 0,
            "table_data": table_data,
            "source_page": source_page,
            "source_pages": source_pages,
            "extraction_method": "direct_text" if not ocr_fallback_text else "ocr_fallback"
        }
