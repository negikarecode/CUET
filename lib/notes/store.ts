import fs from "fs";
import path from "path";
import { NoteDocument, NoteMetadataSummary } from "@/types/notes";
import { getAllTaxonomySubjects } from "./taxonomy";

const NOTES_DATA_DIR = path.join(process.cwd(), "data", "notes");

// In-memory cache for speed
const notesCache = new Map<string, NoteDocument>();
let metadataCache: NoteMetadataSummary[] | null = null;

export function ensureNotesDir(subjectFolder?: string) {
  if (!fs.existsSync(NOTES_DATA_DIR)) {
    fs.mkdirSync(NOTES_DATA_DIR, { recursive: true });
  }
  if (subjectFolder) {
    const subDir = path.join(NOTES_DATA_DIR, subjectFolder);
    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }
  }
}

/**
 * Save a note document to disk
 */
export function saveNoteToDisk(note: NoteDocument): void {
  ensureNotesDir(note.subject);
  const filePath = path.join(NOTES_DATA_DIR, note.subject, `${note.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(note, null, 2), "utf-8");
  notesCache.set(`${note.subject}/${note.slug}`, note);
  metadataCache = null; // Invalidate cache
}

/**
 * Load a note by subject folder and topic slug
 */
export function getNoteBySlug(subjectFolder: string, topicSlug: string): NoteDocument | null {
  const decodedFolder = decodeURIComponent(subjectFolder);
  const cacheKey = `${decodedFolder}/${topicSlug}`;
  if (notesCache.has(cacheKey)) {
    return notesCache.get(cacheKey)!;
  }

  const filePath = path.join(NOTES_DATA_DIR, decodedFolder, `${topicSlug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const note = JSON.parse(raw) as NoteDocument;
    notesCache.set(cacheKey, note);
    return note;
  } catch (err) {
    console.error(`Error reading note ${filePath}:`, err);
    return null;
  }
}

/**
 * Checks if a note exists on disk
 */
export function hasNote(subjectFolder: string, topicSlug: string): boolean {
  const decodedFolder = decodeURIComponent(subjectFolder);
  const filePath = path.join(NOTES_DATA_DIR, decodedFolder, `${topicSlug}.json`);
  return fs.existsSync(filePath);
}

/**
 * Returns all available note summaries across all subjects for global search & indexing
 */
export function getAllNotesMetadata(): NoteMetadataSummary[] {
  if (metadataCache) return metadataCache;

  ensureNotesDir();
  const list: NoteMetadataSummary[] = [];
  const subjects = getAllTaxonomySubjects();

  for (const s of subjects) {
    const subDir = path.join(NOTES_DATA_DIR, s.folder);
    if (!fs.existsSync(subDir)) continue;

    const files = fs.readdirSync(subDir).filter((f) => f.endsWith(".json"));
    for (const f of files) {
      try {
        const raw = fs.readFileSync(path.join(subDir, f), "utf-8");
        const note = JSON.parse(raw) as NoteDocument;
        list.push({
          id: note.id,
          slug: note.slug,
          subject: note.subject,
          subjectName: note.subjectName,
          unitNumber: note.unitNumber,
          unitTitle: note.unitTitle,
          topicTitle: note.topicTitle,
          relevance: note.cuetRelevance?.level || "Medium",
          isFreePreview: note.metadata?.isFreePreview || false,
          readingTimeMinutes: Math.max(3, Math.round(((note.metadata?.wordCount ?? 900)) / 180) || 5),
          mcqCount: note.practiceQuestions?.length || 10,
        });
      } catch (e) {
        // Skip corrupted
      }
    }
  }

  metadataCache = list;
  return list;
}

/**
 * Searches across all notes (titles, concepts, formulas, and revision cards)
 */
export function searchNotes(query: string, subjectFilter?: string): NoteMetadataSummary[] {
  const cleanQ = query.toLowerCase().trim();
  if (!cleanQ) return [];

  const all = getAllNotesMetadata();
  return all.filter((n) => {
    if (subjectFilter && subjectFilter !== "all" && n.subject !== subjectFilter) {
      return false;
    }
    return (
      n.topicTitle.toLowerCase().includes(cleanQ) ||
      n.unitTitle.toLowerCase().includes(cleanQ) ||
      n.subjectName.toLowerCase().includes(cleanQ)
    );
  });
}
