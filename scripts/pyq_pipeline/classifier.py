"""
Question Classification & Taxonomy Engine for Stage 1 CUET UG PYQ Ingestion.
Extracts observable question properties: question type, cognitive level, difficulty estimation,
Question DNA, and AI-inferred academic taxonomy (clearly marked as AI_INFERRED).
"""

import re
from typing import Dict, Any, Optional, Tuple

class QuestionClassifier:
    def __init__(self):
        pass

    def classify_question_type(self, text: str, has_image: bool, has_table: bool) -> Tuple[str, float]:
        """
        Classifies based ONLY on observable structural and linguistic cues.
        """
        lower = text.lower()

        if "match list-i with list-ii" in lower or has_table:
            return "match_the_following", 0.95

        if "assertion (a)" in lower or ("assertion:" in lower and "reason:" in lower):
            return "assertion_reason", 0.98

        if "statement i:" in lower or "statement (i):" in lower or "given below are two statements" in lower:
            return "statement_based", 0.95

        if "read the given passage" in lower or "read the passage" in lower or "based on the passage" in lower:
            return "passage_based", 0.95

        if "chronological order" in lower or "correct sequence" in lower or "arrange the following" in lower:
            return "sequence_based", 0.90

        if has_image:
            if "circuit" in lower or "diagram" in lower or "figure" in lower:
                return "diagram_based", 0.92
            elif "graph" in lower or "curve" in lower or "plotted" in lower:
                return "graph_based", 0.92

        # Check for numerical calculation cues
        numerical_cues = ["calculate", "ratio of", "find the value", "magnitude of", "equals to", "percentage", "speed of", "mass of", "resistance of"]
        has_math_symbols = bool(re.search(r"[\=\+\-\*\/\^]\s*\d|\$\s*\\", text))
        if any(c in lower for c in numerical_cues) and (has_math_symbols or bool(re.search(r"\b\d+\.?\d*\s*(?:m|cm|kg|g|v|a|w|j|s|hz|c|μc|uf)\b", lower))):
            return "numerical", 0.88

        if any(cue in lower for cue in ["which of the following is correct", "why", "explains", "principle", "law of", "concept of"]):
            return "conceptual", 0.80

        if any(cue in lower for cue in ["who was", "in which year", "where is", "named after", "established in", "wrote the book"]):
            return "factual", 0.85

        return "other", 0.50

    def estimate_cognitive_level(self, text: str, q_type: str) -> Tuple[str, float]:
        """
        Estimates cognitive level: recall, understand, apply, analyze.
        """
        lower = text.lower()

        if q_type == "numerical" or "calculate" in lower or "compute" in lower:
            return "apply", 0.85
        elif q_type in ["assertion_reason", "statement_based", "match_the_following"] or "evaluate" in lower:
            return "analyze", 0.82
        elif q_type == "conceptual" or "explain" in lower or "why" in lower or "interprets" in lower:
            return "understand", 0.78
        elif q_type == "factual" or "identify" in lower or "which" in lower or "state" in lower:
            return "recall", 0.85

        return "understand", 0.60

    def estimate_difficulty(self, text: str, q_type: str, cognitive_level: str, has_image: bool) -> Tuple[str, float]:
        """
        Observable difficulty estimation based on structural complexity.
        Explicitly analytical; not official NTA ground truth.
        """
        word_count = len(text.split())

        # Complexity score factors
        score = 0
        if word_count > 60:
            score += 1
        if word_count > 100:
            score += 1
        if q_type in ["numerical", "assertion_reason", "match_the_following"]:
            score += 1
        if cognitive_level in ["apply", "analyze"]:
            score += 1
        if has_image:
            score += 1

        if score <= 1:
            return "easy", 0.75
        elif score in [2, 3]:
            return "medium", 0.80
        else:
            return "hard", 0.78

    def infer_taxonomy(self, subject_id: str, text: str) -> Tuple[Optional[str], Optional[str], Optional[str], float]:
        """
        Infers internal historical taxonomy (Chapter, Topic, Concept).
        Always explicitly tagged with taxonomy_source: 'AI_INFERRED'.
        Never pretends to be official syllabus labels.
        """
        lower = text.lower()
        chapter = None
        topic = None
        concept = None
        confidence = 0.70

        if subject_id == "physics":
            if any(k in lower for k in ["charge", "coulomb", "electric field", "dipole", "flux", "gauss"]):
                chapter = "Electrostatics"
                topic = "Electric Charges & Fields"
                concept = "Coulomb's Law / Electric Field"
                confidence = 0.85
            elif any(k in lower for k in ["current", "resistance", "resistor", "ohm", "potentiometer", "drift velocity", "kirchhoff"]):
                chapter = "Current Electricity"
                topic = "Electric Circuits"
                concept = "Ohm's Law / Resistance"
                confidence = 0.85
            elif any(k in lower for k in ["magnetic field", "biot", "lorentz", "solenoid", "cyclotron", "coil"]):
                chapter = "Magnetic Effects of Current"
                topic = "Magnetic Fields"
                concept = "Magnetic Force & Torque"
                confidence = 0.85
            elif any(k in lower for k in ["inductor", "inductance", "emf", "faraday", "lenz", "alternating"]):
                chapter = "Electromagnetic Induction & AC"
                topic = "Faraday's Law"
                concept = "Self & Mutual Inductance"
                confidence = 0.85
            elif any(k in lower for k in ["polaroid", "interference", "diffraction", "lens", "refraction", "optics"]):
                chapter = "Optics"
                topic = "Wave Optics"
                concept = "Polarization & Wave Phenomena"
                confidence = 0.85
            elif any(k in lower for k in ["diode", "semiconductor", "transistor", "junction"]):
                chapter = "Semiconductors"
                topic = "Electronic Devices"
                concept = "p-n Junction Diodes"
                confidence = 0.88

        elif subject_id == "accountancy":
            if any(k in lower for k in ["partnership", "deed", "drawings", "profit sharing", "goodwill", "retires", "admission"]):
                chapter = "Partnership Accounting"
                topic = "Partnership Fundamentals"
                concept = "Profit Sharing & Retirement"
                confidence = 0.88
            elif any(k in lower for k in ["share", "premium", "debenture", "allotment", "forfeiture"]):
                chapter = "Company Accounts"
                topic = "Share Capital"
                concept = "Forfeiture & Premium on Shares"
                confidence = 0.88
            elif any(k in lower for k in ["dissolution", "realization", "firm"]):
                chapter = "Dissolution of Partnership Firm"
                topic = "Realisation Account"
                concept = "Settlement of Accounts on Dissolution"
                confidence = 0.88

        elif subject_id == "chemistry":
            if any(k in lower for k in ["solution", "molarity", "osmotic", "raoult", "henry"]):
                chapter = "Solutions"
                topic = "Colligative Properties"
                concept = "Raoult's Law & Osmotic Pressure"
                confidence = 0.85
            elif any(k in lower for k in ["electrochemistry", "galvanic", "nernst", "cell", "faraday"]):
                chapter = "Electrochemistry"
                topic = "Galvanic Cells"
                concept = "Nernst Equation & Cell Potential"
                confidence = 0.85
            elif any(k in lower for k in ["rate", "order", "kinetics", "activation energy"]):
                chapter = "Chemical Kinetics"
                topic = "Reaction Rates"
                concept = "Rate Law & Arrhenius Equation"
                confidence = 0.85

        elif subject_id == "mathematics":
            if any(k in lower for k in ["integral", "dx", "∫", "area under"]):
                chapter = "Calculus"
                topic = "Integrals"
                concept = "Definite & Indefinite Integration"
                confidence = 0.85
            elif any(k in lower for k in ["matrix", "matrices", "determinant"]):
                chapter = "Algebra"
                topic = "Matrices & Determinants"
                concept = "Matrix Operations"
                confidence = 0.88
            elif any(k in lower for k in ["vector", "dot product", "cross product"]):
                chapter = "Vector Algebra"
                topic = "Vectors"
                concept = "Vector Operations"
                confidence = 0.85

        elif subject_id == "history":
            if any(k in lower for k in ["harappa", "mohenjodaro", "indus", "ivc"]):
                chapter = "Ancient India"
                topic = "Harappan Civilization"
                concept = "Town Planning & Material Culture"
                confidence = 0.88
            elif any(k in lower for k in ["kushana", "mauryas", "inscriptions", "ashoka", "prakrit"]):
                chapter = "Early States & Economies"
                topic = "Mauryan & Post-Mauryan Era"
                concept = "Inscriptions & Royal Titles"
                confidence = 0.88

        elif subject_id == "business_studies":
            if any(k in lower for k in ["planning", "organising", "staffing", "directing", "controlling"]):
                chapter = "Principles & Functions of Management"
                topic = "Management Functions"
                concept = "Planning & Organizing Principles"
                confidence = 0.85
            elif any(k in lower for k in ["financial market", "capital market", "sebi", "stock exchange"]):
                chapter = "Financial Markets"
                topic = "Capital & Money Markets"
                concept = "SEBI Regulations & Functions"
                confidence = 0.88

        return chapter, topic, concept, confidence if chapter else 0.0

    def generate_question_dna(self, q_type: str, cognitive_level: str, has_image: bool, has_table: bool) -> Dict[str, Any]:
        """
        Creates an analytical Question DNA signature.
        """
        requires_calc = q_type == "numerical"
        requires_formula = q_type in ["numerical", "conceptual"]
        calc_steps = 2 if requires_calc else 0

        return {
            "format": f"{q_type}_mcq",
            "cognitive_level": cognitive_level,
            "calculation_steps": calc_steps,
            "concept_count": 2 if cognitive_level in ["apply", "analyze"] else 1,
            "requires_formula": requires_formula,
            "reasoning_depth": "high" if cognitive_level == "analyze" else "medium" if cognitive_level == "apply" else "low",
            "distractor_style": "calculation_or_conceptual_trap" if requires_calc else "conceptual_misconception",
            "has_visual_dependency": has_image,
            "has_tabular_dependency": has_table
        }

    def analyze(
        self,
        subject_id: str,
        question_text: str,
        options: Dict[str, Any],
        has_image: bool,
        has_table: bool
    ) -> Dict[str, Any]:
        q_type, type_conf = self.classify_question_type(question_text, has_image, has_table)
        cog_level, cog_conf = self.estimate_cognitive_level(question_text, q_type)
        diff, diff_conf = self.estimate_difficulty(question_text, q_type, cog_level, has_image)
        chapter, topic, concept, tax_conf = self.infer_taxonomy(subject_id, question_text)
        dna = self.generate_question_dna(q_type, cog_level, has_image, has_table)

        return {
            "question_type": q_type,
            "type_confidence": type_conf,
            "cognitive_level": cog_level,
            "cognitive_level_confidence": cog_conf,
            "difficulty": diff,
            "difficulty_confidence": diff_conf,
            "chapter": chapter,
            "topic": topic,
            "subtopic": None,
            "concept": concept,
            "taxonomy_source": "HEURISTIC_INFERRED" if chapter else None,
            "taxonomy_confidence": tax_conf,
            "requires_calculation": 1 if q_type == "numerical" else 0,
            "requires_reading": 1 if len(question_text.split()) > 50 else 0,
            "requires_diagram": 1 if has_image else 0,
            "requires_table": 1 if has_table else 0,
            "question_dna": dna
        }
