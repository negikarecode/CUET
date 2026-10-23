import practiceManifest from "@/lib/data/practice_test_manifest.json";

export interface TaxonomyTopic {
  id: string; // e.g. "physics_u1_t1"
  slug: string; // e.g. "electric-charges-and-fields"
  title: string;
  unitNumber: number;
  unitTitle: string;
  subjectFolder: string;
  subjectName: string;
  subjectCode: string;
  isFreePreview: boolean;
  practiceTestId: string;
  practiceTestUrl: string;
  weaknessReportUrl: string;
}

export interface TaxonomyUnit {
  unitNumber: number;
  unitTitle: string;
  topics: TaxonomyTopic[];
}

export interface TaxonomySubject {
  folder: string;
  name: string;
  code: string;
  units: TaxonomyUnit[];
  totalTopics: number;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Returns the entire canonical list of 22 subjects with all 155 units and 191 topics
 */
export function getAllTaxonomySubjects(): TaxonomySubject[] {
  const result: TaxonomySubject[] = [];

  for (const [folder, data] of Object.entries(practiceManifest as Record<string, any>)) {
    let subjectTopicIndex = 0;
    const units: TaxonomyUnit[] = (data.units || []).map((u: any) => {
      const topics: TaxonomyTopic[] = (u.topics || []).map((topicTitle: string, tIdx: number) => {
        subjectTopicIndex++;
        const slug = slugify(topicTitle);
        const id = `${folder}_u${u.unitNumber}_t${tIdx + 1}`;
        const isFreePreview = subjectTopicIndex <= 2; // First 2 topics per subject free
        const practiceTestId = `practice-${folder}-unit${u.unitNumber}-test1`;

        return {
          id,
          slug,
          title: topicTitle,
          unitNumber: u.unitNumber,
          unitTitle: u.unitTitle,
          subjectFolder: folder,
          subjectName: data.name,
          subjectCode: data.code,
          isFreePreview,
          practiceTestId,
          practiceTestUrl: `/test/${practiceTestId}`,
          weaknessReportUrl: `/dashboard/ai-coach?subject=${folder}`,
        };
      });

      return {
        unitNumber: u.unitNumber,
        unitTitle: u.unitTitle,
        topics,
      };
    });

    const totalTopics = units.reduce((acc, u) => acc + u.topics.length, 0);

    result.push({
      folder,
      name: data.name,
      code: data.code,
      units,
      totalTopics,
    });
  }

  return result;
}

/**
 * Finds a specific subject by folder slug or code
 */
export function getTaxonomySubject(subjectFolder: string): TaxonomySubject | null {
  const subjects = getAllTaxonomySubjects();
  const normalized = subjectFolder.toLowerCase().trim();
  return (
    subjects.find(
      (s) =>
        s.folder.toLowerCase() === normalized ||
        s.name.toLowerCase() === normalized ||
        s.code === normalized
    ) || null
  );
}

/**
 * Finds a specific topic by subject folder and topic slug
 */
export function getTaxonomyTopic(
  subjectFolder: string,
  topicSlug: string
): TaxonomyTopic | null {
  const subject = getTaxonomySubject(subjectFolder);
  if (!subject) return null;

  const normalizedSlug = topicSlug.toLowerCase().trim();
  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      if (topic.slug === normalizedSlug) {
        return topic;
      }
    }
  }

  return null;
}
