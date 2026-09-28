"""
OCR Fallback Engine for Stage 1 CUET UG PYQ Ingestion.
Applies adaptive pre-processing and Tesseract OCR for scanned pages,
corrupted text streams, and embedded question/diagram text.
"""

import os
from typing import Dict, Any, Optional, Tuple
from PIL import Image, ImageEnhance, ImageFilter
import pytesseract

class OCREngine:
    def __init__(self):
        pass

    def preprocess_image(self, img: Image.Image) -> Image.Image:
        # Convert to greyscale
        gray = img.convert("L")
        # Increase contrast slightly
        enhancer = ImageEnhance.Contrast(gray)
        enhanced = enhancer.enhance(1.8)
        # Sharpen slightly for clearer mathematical exponents
        sharpened = enhanced.filter(ImageFilter.SHARPEN)
        return sharpened

    def ocr_page_image(self, image_path: str, bbox: Optional[Tuple[int, int, int, int]] = None) -> Dict[str, Any]:
        if not os.path.exists(image_path):
            return {"text": "", "confidence": 0.0, "error": "Image file not found"}

        try:
            with Image.open(image_path) as img:
                if bbox:
                    # Crop to specific region [x0, y0, x1, y1]
                    cropped = img.crop(bbox)
                else:
                    cropped = img

                preprocessed = self.preprocess_image(cropped)

                # Tesseract's automatic page segmentation often returns no
                # words for equation-heavy CUET regions that mix text and
                # vertically stacked answer choices. Try a single-block pass
                # when that happens and retain whichever pass recognizes more
                # text.
                data = pytesseract.image_to_data(
                    preprocessed, output_type=pytesseract.Output.DICT,
                    timeout=20,
                )
                recognized = sum(bool(word.strip()) for word in data.get("text", []))
                if recognized < 8:
                    try:
                        block_data = pytesseract.image_to_data(
                            preprocessed, output_type=pytesseract.Output.DICT,
                            config="--psm 6", timeout=20,
                        )
                        block_recognized = sum(bool(word.strip()) for word in block_data.get("text", []))
                        if block_recognized > recognized:
                            data = block_data
                    except Exception:
                        pass
                confidences = [int(c) for c in data["conf"] if str(c).lstrip("-").isdigit() and int(c) >= 0]
                avg_conf = (sum(confidences) / max(1, len(confidences))) / 100.0 if confidences else 0.5

                # image_to_data already contains the recognized words and line
                # grouping; reuse it instead of invoking Tesseract a second time.
                lines = {}
                for i, word in enumerate(data.get("text", [])):
                    word = word.strip()
                    if not word:
                        continue
                    key = (data["block_num"][i], data["par_num"][i], data["line_num"][i])
                    lines.setdefault(key, []).append(word)
                text = "\n".join(" ".join(words) for words in lines.values())

                return {
                    "text": text.strip(),
                    "confidence": round(avg_conf, 2),
                    "word_count": len(text.split()),
                    "error": None
                }
        except Exception as e:
            return {
                "text": "",
                "confidence": 0.0,
                "error": str(e)
            }
