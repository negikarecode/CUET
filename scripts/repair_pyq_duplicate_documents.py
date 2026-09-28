"""Remove wrong-category duplicate imports when canonical PDFs exist."""
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "cuet_pyq_master.db"


def main():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON")
    rows = conn.execute("""SELECT d.id,d.filepath,d.subject_id,
        (SELECT count(*) FROM questions q WHERE q.document_id=d.id) question_count
        FROM documents d WHERE d.filepath IN (
          SELECT filepath FROM documents GROUP BY filepath HAVING count(*)>1
        ) ORDER BY d.filepath,d.id""").fetchall()
    by_path = {}
    for row in rows:
        by_path.setdefault(row["filepath"], []).append(row)

    stale = []
    for filepath, copies in by_path.items():
        expected_subject = Path(filepath).parent.name
        canonical = [r for r in copies if r["subject_id"] == expected_subject]
        if len(canonical) != 1:
            raise RuntimeError(f"Cannot identify one canonical document for {filepath}")
        canonical_count = conn.execute(
            "SELECT count(*) FROM questions WHERE document_id=?", (canonical[0]["id"],)
        ).fetchone()[0]
        for row in copies:
            if row["id"] == canonical[0]["id"]:
                continue
            if canonical_count < row["question_count"]:
                raise RuntimeError(f"Duplicate {row['id']} has nonredundant question rows")
            stale.append(row["id"])

    conn.execute("BEGIN IMMEDIATE")
    for doc_id in stale:
        conn.execute("DELETE FROM documents WHERE id=?", (doc_id,))
    conn.commit()
    remaining = conn.execute("SELECT count(*) FROM documents").fetchone()[0]
    conn.close()
    print({"wrong_category_duplicate_documents_removed": len(stale), "documents_remaining": remaining})


if __name__ == "__main__":
    main()
