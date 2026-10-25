"""
CUET Global Duplicate Question Detection & Fingerprinting Engine (Python)

Implements 3-Level Duplicate Detection:
- Level A: Exact Duplicates (normalized stem + ordered options)
- Level B: Structural Duplicates (normalized stem + sorted substantive options set)
- Level C: Semantic Duplicates (token/shingle similarity & semantic equivalence)
"""

import re
import unicodedata

def normalize_text(text: str) -> str:
    if not text:
        return ""
    
    cleaned = str(text).strip()

    # 1. Strip HTML entities and tags
    cleaned = re.sub(r'&nbsp;', ' ', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'&amp;', ' and ', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'&lt;', '<', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'&gt;', '>', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'&quot;', '"', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'&#39;', "'", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'&(?:mdash|ndash);', '-', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'&', ' and ', cleaned)
    cleaned = re.sub(r'<[^>]+>', ' ', cleaned)

    # 2. Strip artificial generation prefixes
    cleaned = re.sub(r'^\s*\[Set\s+[^\]]+\]\s*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'^\s*Set\s+[\d\.]+\s*[:\-]\s*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'^\s*(?:Question|Q\.?)\s*\d+\s*[:\-]\s*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'^\s*\(\s*(?:Question|Q\.?)\s*\d+\s*\)\s*[:\-]?\s*', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'^\s*\(?([A-D]|[1-4])\)?[\.\:\-]\s*', '', cleaned, flags=re.IGNORECASE)

    # 3. Strip trailing reference tokens
    cleaned = re.sub(r'\((?:Reference token|Case index|Context reference|Set Ref)[^)]*\)', '', cleaned, flags=re.IGNORECASE)

    # 4. Unicode normalization
    cleaned = unicodedata.normalize('NFKC', cleaned)
    cleaned = re.sub(r"[\u2018\u2019\u201A\u201B]", "'", cleaned)
    cleaned = re.sub(r'[\u201C\u201D\u201E\u201F]', '"', cleaned)
    cleaned = re.sub(r'[\u2013\u2014]', '-', cleaned)

    # 5. Lowercase and collapse whitespace
    cleaned = cleaned.lower()
    cleaned = re.sub(r'[^a-z0-9]', ' ', cleaned)
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()

    return cleaned

def normalize_option_text(text: str) -> str:
    if not text:
        return ""
    cleaned = str(text).strip()
    cleaned = re.sub(r'^\(?([A-D]|[1-4])\)?[\.\:\-\s]+', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'^Option\s+([A-D]|[1-4])\s*[\:\.\-]?\s*', '', cleaned, flags=re.IGNORECASE)
    return normalize_text(cleaned)

def get_exact_fingerprint(q: dict) -> str:
    stem = normalize_text(q.get('questionText') or q.get('prompt') or '')
    opts = "|".join([normalize_option_text(o.get('text', '')) for o in q.get('options', [])])
    return f"{stem}|||{opts}"

def get_structural_fingerprint(q: dict) -> str:
    stem = normalize_text(q.get('questionText') or q.get('prompt') or '')
    opts = [normalize_option_text(o.get('text', '')) for o in q.get('options', [])]
    sorted_opts = "|".join(sorted([o for o in opts if o]))
    return f"{stem}|||{sorted_opts}"

def tokenize(text: str) -> set:
    return set([w for w in text.split() if len(w) > 1])

def extract_numbers(text: str) -> list:
    return re.findall(r'\b\d+(?:\.\d+)?\b', text)

def jaccard_similarity(set_a: set, set_b: set) -> float:
    if not set_a and not set_b:
        return 1.0
    if not set_a or not set_b:
        return 0.0
    intersection = len(set_a.intersection(set_b))
    union = len(set_a.union(set_b))
    return intersection / union if union > 0 else 0.0

def compare_options(opts_a: list, opts_b: list) -> float:
    norm_a = [normalize_option_text(o.get('text', '')) for o in opts_a if normalize_option_text(o.get('text', ''))]
    norm_b = [normalize_option_text(o.get('text', '')) for o in opts_b if normalize_option_text(o.get('text', ''))]
    if not norm_a or not norm_b:
        return 0.0
    
    matches = 0.0
    for a in norm_a:
        if a in norm_b:
            matches += 1.0
        else:
            set_a = tokenize(a)
            for b in norm_b:
                set_b = tokenize(b)
                if jaccard_similarity(set_a, set_b) >= 0.85:
                    matches += 0.9
                    break
    max_len = max(len(norm_a), len(norm_b))
    return min(1.0, matches / max_len)

def compare_questions(q1: dict, q2: dict) -> dict:
    fp_a1 = get_exact_fingerprint(q1)
    fp_a2 = get_exact_fingerprint(q2)
    if fp_a1 and fp_a1 == fp_a2:
        return {
            'is_duplicate': True,
            'level': 'EXACT_A',
            'confidence': 1.0,
            'reason': 'Normalized question stem and options in exact order are identical.'
        }
        
    fp_b1 = get_structural_fingerprint(q1)
    fp_b2 = get_structural_fingerprint(q2)
    if fp_b1 and fp_b1 == fp_b2:
        return {
            'is_duplicate': True,
            'level': 'STRUCTURAL_B',
            'confidence': 0.99,
            'reason': 'Identical question stem with identical substantive options (shuffled).'
        }
        
    stem1 = normalize_text(q1.get('questionText') or q1.get('prompt') or '')
    stem2 = normalize_text(q2.get('questionText') or q2.get('prompt') or '')
    if not stem1 or not stem2:
        return {'is_duplicate': False, 'level': 'DISTINCT', 'confidence': 0.0, 'reason': 'Empty stem'}
        
    nums1 = extract_numbers(stem1)
    nums2 = extract_numbers(stem2)
    if nums1 and nums2 and nums1 != nums2:
        return {
            'is_duplicate': False,
            'level': 'DISTINCT',
            'confidence': 0.1,
            'reason': 'Distinct numerical values (parameterized variation).'
        }
        
    contrast_keywords = ["differ", "difference", "except", "not", "incorrect", "false", "advantage", "disadvantage"]
    has_contrast1 = any(w in stem1 for w in contrast_keywords)
    has_contrast2 = any(w in stem2 for w in contrast_keywords)
    if has_contrast1 != has_contrast2:
        return {
            'is_duplicate': False,
            'level': 'DISTINCT',
            'confidence': 0.2,
            'reason': 'Contrasting cognitive focus.'
        }
        
    t1 = tokenize(stem1)
    t2 = tokenize(stem2)
    stem_sim = jaccard_similarity(t1, t2)
    opts_sim = compare_options(q1.get('options', []), q2.get('options', []))
    composite = round(stem_sim * 0.5 + opts_sim * 0.5, 3)
    
    if (opts_sim >= 0.95 and stem_sim >= 0.50) or (stem_sim >= 0.85 and opts_sim >= 0.85):
        return {
            'is_duplicate': True,
            'level': 'SEMANTIC_C',
            'confidence': max(0.9, composite),
            'reason': f'High-confidence semantic duplicate: stem {stem_sim:.2f}, opts {opts_sim:.2f}.'
        }
    elif stem_sim >= 0.70 and opts_sim >= 0.70:
        return {
            'is_duplicate': False,
            'level': 'SEMANTIC_C',
            'confidence': composite,
            'reason': f'Suspected semantic similarity requiring manual review: stem {stem_sim:.2f}, opts {opts_sim:.2f}.'
        }
        
    return {
        'is_duplicate': False,
        'level': 'DISTINCT',
        'confidence': composite,
        'reason': 'Distinct questions.'
    }
