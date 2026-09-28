"""
Page Extractor Module for Stage 1 CUET UG PYQ Ingestion.
Renders high-res page images for visual auditing, extracts text blocks with coordinates,
identifies embedded figures, and calculates extraction quality scores.
"""

import os
import fitz
from typing import Dict, Any, List

class PageExtractor:
    def __init__(self, public_pages_dir: str = "public/pyq_pages"):
        self.public_pages_dir = public_pages_dir
        os.makedirs(self.public_pages_dir, exist_ok=True)

    def extract_page(
        self,
        doc: fitz.Document,
        page_index: int,
        doc_id: str,
        render_images: bool = True
    ) -> Dict[str, Any]:
        page_number = page_index + 1
        page = doc[page_index]
        page_id = f"PAGE_{doc_id}_{page_number:03d}"

        # 1. Render page image for inspection UI (150 DPI provides sharp fidelity while staying lightweight)
        doc_image_dir = os.path.join(self.public_pages_dir, doc_id)
        os.makedirs(doc_image_dir, exist_ok=True)
        img_rel_path = f"/pyq_pages/{doc_id}/page_{page_number}.png"
        img_full_path = os.path.join(self.public_pages_dir, doc_id, f"page_{page_number}.png")

        if render_images and not os.path.exists(img_full_path):
            pix = page.get_pixmap(dpi=150)
            pix.save(img_full_path)

        # 2. Extract Raw Text & Text Blocks
        raw_text = page.get_text("text")
        blocks = page.get_text("blocks") # (x0, y0, x1, y1, text, block_no, block_type)

        # Keep line-level geometry. Some exam PDFs pack a whole question into a
        # single large text block, so block starts alone cannot locate Q markers.
        text_lines = []
        for block in page.get_text("dict").get("blocks", []):
            for line in block.get("lines", []):
                line_text = "".join(span.get("text", "") for span in line.get("spans", []))
                if line_text.strip():
                    rect = line.get("bbox", [0, 0, 0, 0])
                    text_lines.append({
                        "bbox": [round(v, 2) for v in rect],
                        "text": line_text,
                    })

        text_blocks = []
        for b in blocks:
            if b[6] == 0: # 0 is text block, 1 is image block
                text_blocks.append({
                    "bbox": [round(b[0], 2), round(b[1], 2), round(b[2], 2), round(b[3], 2)],
                    "text": b[4],
                    "block_no": b[5]
                })

        # 3. Detect Embedded Images & Figures
        embedded_imgs = page.get_images()
        image_boxes = []
        for img_info in embedded_imgs:
            xref = img_info[0]
            rects = page.get_image_rects(xref)
            for r in rects:
                image_boxes.append({
                    "xref": xref,
                    "bbox": [round(r.x0, 2), round(r.y0, 2), round(r.x1, 2), round(r.y1, 2)],
                    "width": round(r.width, 2),
                    "height": round(r.height, 2)
                })

        # 4. Text Quality Assessment
        clean_chars = sum(1 for c in raw_text if c.isalnum())
        total_chars = len(raw_text)
        char_ratio = clean_chars / max(1, total_chars)

        # Extraction quality metrics:
        # If very few characters (< 80) but page has images, it's image-heavy/scanned
        if total_chars < 80 and len(image_boxes) > 0:
            quality_score = 0.35
            extraction_method = "needs_ocr_or_vision"
        elif char_ratio < 0.4 and total_chars > 50:
            quality_score = 0.50
            extraction_method = "low_quality_text"
        else:
            quality_score = round(min(1.0, 0.7 + (char_ratio * 0.3)), 2)
            extraction_method = "pdf_text"

        return {
            "id": page_id,
            "document_id": doc_id,
            "page_number": page_number,
            "raw_text": raw_text,
            "ocr_text": None,
            "has_images": 1 if len(image_boxes) > 0 else 0,
            "image_count": len(image_boxes),
            "image_boxes": image_boxes,
            "text_blocks": text_blocks,
            "text_lines": text_lines,
            "page_image_path": img_rel_path,
            "page_image_full_path": img_full_path,
            "extraction_method": extraction_method,
            "quality_score": quality_score,
            "status": "extracted",
            "page_rect": [round(page.rect.x0, 2), round(page.rect.y0, 2), round(page.rect.x1, 2), round(page.rect.y1, 2)]
        }
