"""Reprocess GAT papers with the document-level OCR fallback."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.pyq_pipeline.pipeline_runner import PYQPipelineRunner


def main():
    runner = PYQPipelineRunner()
    papers = sorted((ROOT / "cuet_ug_pyqs" / "general_aptitude_test").glob("*.pdf"))
    failures = []
    for paper in papers:
        result = runner.process_pdf(str(paper), parent_subject="general_aptitude_test", force_reprocess=True)
        if result.get("status") not in ("success", "partial"):
            failures.append({"file": paper.name, "error": result.get("error")})
    exports = runner.exporter.export_all()
    print({"papers": len(papers), "failures": failures, "exports": exports})
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
