"""Batch or single-file CUET PYQ PDF ingestion entrypoint."""
import argparse
import json
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.pyq_pipeline.pipeline_runner import PYQPipelineRunner


def main():
    parser = argparse.ArgumentParser(description="Ingest CUET PYQ PDFs into the reviewable SQLite dataset")
    parser.add_argument("path", nargs="?", default="cuet_ug_pyqs", help="A PDF file or subject-folder catalog")
    parser.add_argument("--subject", help="Subject folder/id hint when ingesting one PDF")
    parser.add_argument("--force", action="store_true", help="Reprocess a previously completed PDF")
    parser.add_argument("--limit-per-subject", type=int)
    args = parser.parse_args()
    runner = PYQPipelineRunner()
    if os.path.isfile(args.path):
        result = runner.process_pdf(args.path, args.subject, args.force)
        print(json.dumps(result, indent=2, ensure_ascii=False))
        raise SystemExit(0 if result.get("status") in ("success", "skipped") else 1)
    print(json.dumps(runner.process_catalog(args.path, args.limit_per_subject, args.force), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
