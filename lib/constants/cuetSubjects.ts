export interface CUETSubjectItem {
  id: string;
  name: string;
  category: "Commerce" | "Science" | "Humanities" | "Arts & Performing" | "Common";
  isCore?: boolean;
}

/**
 * Complete official list of CUET UG Domain Subjects specified by NTA
 */
export const CUET_DOMAIN_SUBJECTS: CUETSubjectItem[] = [
  // Commerce Domains
  { id: "accountancy", name: "Accountancy", category: "Commerce", isCore: true },
  { id: "business-studies", name: "Business Studies", category: "Commerce", isCore: true },
  { id: "economics", name: "Economics/ Business Economics", category: "Commerce", isCore: true },
  { id: "mathematics", name: "Mathematics", category: "Commerce", isCore: true },
  { id: "computer-science", name: "Computer Science/ Informatics Practices", category: "Commerce" },

  // Science Domains
  { id: "physics", name: "Physics", category: "Science", isCore: true },
  { id: "chemistry", name: "Chemistry", category: "Science", isCore: true },
  { id: "biology", name: "Biology/ Biotechnology/ Biochemistry", category: "Science", isCore: true },
  { id: "agriculture", name: "Agriculture", category: "Science" },
  { id: "environmental-studies", name: "Environmental Studies", category: "Science" },

  // Humanities & Social Science Domains
  { id: "political-science", name: "Political Science", category: "Humanities", isCore: true },
  { id: "history", name: "History", category: "Humanities", isCore: true },
  { id: "geography", name: "Geography/ Geology", category: "Humanities", isCore: true },
  { id: "psychology", name: "Psychology", category: "Humanities", isCore: true },
  { id: "sociology", name: "Sociology", category: "Humanities", isCore: true },
  { id: "anthropology", name: "Anthropology", category: "Humanities" },
  { id: "home-science", name: "Home Science", category: "Humanities" },
  { id: "mass-media", name: "Mass Media/ Mass Communication", category: "Humanities" },
  { id: "ktpi", name: "Knowledge Tradition and Practices of India", category: "Humanities" },
  { id: "sanskrit", name: "Sanskrit", category: "Humanities" },

  // Performing Arts, Creative & Physical Education Domains
  { id: "physical-education", name: "Physical education/ NCC/ Yoga", category: "Arts & Performing", isCore: true },
  { id: "fine-arts", name: "Fine Arts/ Visual Arts", category: "Arts & Performing" },
  { id: "performing-arts", name: "Performing Arts (Dance: Kathak, Bharatnatyam, Oddisi, Kathakali, Kuchipudi, Manipuri)", category: "Arts & Performing" },
  { id: "drama-theatre", name: "Drama - Theatre", category: "Arts & Performing" },
  { id: "music-general", name: "Music General (Hindustani, Carnatic, Rabindra Sangeet, Percussion)", category: "Arts & Performing" },

  // Common Section IA & III (Languages & General Test)
  { id: "english", name: "English", category: "Common", isCore: true },
  { id: "general-test", name: "General Test", category: "Common", isCore: true },
];

/**
 * Default domain selections mapped by academic stream
 */
export const DEFAULT_STREAM_SUBJECTS: Record<
  "commerce" | "science" | "humanities",
  string[]
> = {
  commerce: [
    "Accountancy",
    "Business Studies",
    "Economics/ Business Economics",
    "English",
  ],
  science: [
    "Physics",
    "Chemistry",
    "Mathematics",
    "English",
  ],
  humanities: [
    "Political Science",
    "History",
    "Economics/ Business Economics",
    "English",
  ],
};
