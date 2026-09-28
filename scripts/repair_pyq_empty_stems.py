"""Reprocess source PDFs for empty stems exposed by the page repair pass."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.pyq_pipeline.pipeline_runner import PYQPipelineRunner


def main():
    runner = PYQPipelineRunner()
    with runner.db.get_connection() as conn:
        paths = [row[0] for row in conn.execute("""SELECT DISTINCT d.filepath FROM documents d
            JOIN questions q ON q.document_id=d.id
            WHERE q.extraction_method='page_continuation' AND trim(q.raw_question_text)=''
            ORDER BY d.filepath""")]
    failures = []
    for path in paths:
        result = runner.process_pdf(path, force_reprocess=True)
        if result.get("status") not in ("success", "partial"):
            failures.append({"file": Path(path).name, "error": result.get("error")})
    exports = runner.exporter.export_all()
    print({"documents_reprocessed": len(paths), "failures": failures, "exports": exports})
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
