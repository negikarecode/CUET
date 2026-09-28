import { SubjectConfig } from "@/types";

// Mapping of subject IDs to their primary PYQ test IDs
export const SUBJECT_TO_PYQ: Record<string, string> = {
  // Science Stream
  "physics": "physics-pyq",
  "Physics": "physics-pyq",
  "chemistry": "chemistry-pyq",
  "Chemistry": "chemistry-pyq",
  "mathematics-sci": "math-sci-pyq",
  "mathematics": "math-sci-pyq",
  "Mathematics": "math-sci-pyq",
  "maths": "math-sci-pyq",
  "Maths": "math-sci-pyq",
  "math": "math-sci-pyq",
  "biology": "biology-pyq",
  "Biology": "biology-pyq",
  "bio": "biology-pyq",
  "Bio": "biology-pyq",
  // Commerce Stream
  "accountancy": "accountancy-pyq",
  "Accountancy": "accountancy-pyq",
  "accounts": "accountancy-pyq",
  "accs": "accountancy-pyq",
  "business-studies": "business-pyq",
  "Business Studies": "business-pyq",
  "business": "business-pyq",
  "bst": "business-pyq",
  "economics": "eco-pyq",
  "Economics": "eco-pyq",
  "eco": "eco-pyq",
  "mathematics-com": "math-sci-pyq",
  // Humanities Stream
  "history": "history-pyq",
  "History": "history-pyq",
  "hist": "history-pyq",
  "political-science": "pol-science-pyq",
  "Political Science": "pol-science-pyq",
  "polscience": "pol-science-pyq",
  "pol": "pol-science-pyq",
  "geography": "geo-pyq",
  "Geography": "geo-pyq",
  "geo": "geo-pyq",
  "psychology": "psychology-pyq",
  "Psychology": "psychology-pyq",
  "psy": "psychology-pyq",
  "psych": "psychology-pyq",
  "sociology": "sociology-pyq",
  "Sociology": "sociology-pyq",
  "soc": "sociology-pyq",
  // Applied & Interdisciplinary Domains
  "physical-education": "physical-education-pyq",
  "Physical Education": "physical-education-pyq",
  "ped": "physical-education-pyq",
  "computer-science": "computer-science-pyq",
  "Computer Science": "computer-science-pyq",
  "cs": "computer-science-pyq",
  "csip": "computer-science-pyq",
  "home-science": "home-science-pyq",
  "Home Science": "home-science-pyq",
  "hsc": "home-science-pyq",
  "mass-media": "mass-media-pyq",
  "Mass Media": "mass-media-pyq",
  "mmc": "mass-media-pyq",
  "environmental-studies": "environmental-studies-pyq",
  "Environmental Studies": "environmental-studies-pyq",
  "evs": "environmental-studies-pyq",
  "fine-arts": "fine-arts-pyq",
  "Fine Arts": "fine-arts-pyq",
  "fa": "fine-arts-pyq",
  "agriculture": "agriculture-pyq",
  "Agriculture": "agriculture-pyq",
  "agr": "agriculture-pyq",
  "anthropology": "anthropology-pyq",
  "Anthropology": "anthropology-pyq",
  "ant": "anthropology-pyq",
  // Common / Language
  "english": "english-pyq",
};

export const SUBJECT_TO_MOCK: Record<string, string> = {
  "physics": "physics-mock",
  "Physics": "physics-mock",
  "chemistry": "chemistry-mock",
  "Chemistry": "chemistry-mock",
  "mathematics-sci": "maths-mock",
  "mathematics": "maths-mock",
  "Mathematics": "maths-mock",
  "maths": "maths-mock",
  "Maths": "maths-mock",
  "biology": "biology-mock",
  "Biology": "biology-mock",
  "bio": "biology-mock",
  "Bio": "biology-mock",
  "accountancy": "accountancy-mock",
  "Accountancy": "accountancy-mock",
  "accounts": "accountancy-mock",
  "Accounts": "accountancy-mock",
  "accs": "accountancy-mock",
  "economics": "eco-mock",
  "Economics": "eco-mock",
  "eco": "eco-mock",
  "Eco": "eco-mock",
  "business-studies": "bst-mock",
  "Business Studies": "bst-mock",
  "business": "bst-mock",
  "Business": "bst-mock",
  "bst": "bst-mock",
  "BST": "bst-mock",
  "bst-mock": "bst-mock",
  "history": "history-mock",
  "History": "history-mock",
  "hist": "history-mock",
  "Hist": "history-mock",
  "history-mock": "history-mock",
  "political-science": "pol-science-mock",
  "Political Science": "pol-science-mock",
  "polscience": "pol-science-mock",
  "pol-science": "pol-science-mock",
  "pol": "pol-science-mock",
  "Pol": "pol-science-mock",
  "pol-science-mock": "pol-science-mock",
  "geography": "geo-mock",
  "Geography": "geo-mock",
  "geo": "geo-mock",
  "Geo": "geo-mock",
  "geo-mock": "geo-mock",
  "psychology": "psychology-mock",
  "Psychology": "psychology-mock",
  "psy": "psychology-mock",
  "Psy": "psychology-mock",
  "psych": "psychology-mock",
  "Psych": "psychology-mock",
  "psychology-mock": "psychology-mock",
  "sociology": "sociology-mock",
  "Sociology": "sociology-mock",
  "soc": "sociology-mock",
  "Soc": "sociology-mock",
  "physical-education": "physical-education-mock",
  "Physical Education": "physical-education-mock",
  "ped": "physical-education-mock",
  "Ped": "physical-education-mock",
  "computer-science": "computer-science-mock",
  "Computer Science": "computer-science-mock",
  "cs": "computer-science-mock",
  "csip": "computer-science-mock",
  "home-science": "home-science-mock",
  "Home Science": "home-science-mock",
  "hsc": "home-science-mock",
  "mass-media": "mass-media-mock",
  "Mass Media": "mass-media-mock",
  "mmc": "mass-media-mock",
  "environmental-studies": "environmental-studies-mock",
  "Environmental Studies": "environmental-studies-mock",
  "evs": "environmental-studies-mock",
  "fine-arts": "fine-arts-mock",
  "Fine Arts": "fine-arts-mock",
  "fa": "fine-arts-mock",
  "agriculture": "agriculture-mock",
  "Agriculture": "agriculture-mock",
  "agr": "agriculture-mock",
  "anthropology": "anthropology-mock",
  "Anthropology": "anthropology-mock",
  "ant": "anthropology-mock",
};

export interface MockTestItem {
  id: string;
  mockNumber: number;
  label: string;
  mockLabel: string;
  duration: string;
  questions: number;
  tags: string[];
}

export const SUBJECT_MOCK_COUNTS: Record<string, number> = {
  physics: 20,
  chemistry: 20,
  mathematics: 20,
  "mathematics-sci": 20,
  "mathematics-com": 20,
  maths: 20,
  biology: 12,
  bio: 12,
  accountancy: 18,
  accounts: 18,
  accs: 18,
  economics: 20,
  eco: 20,
  "business-studies": 20,
  business: 20,
  bst: 20,
  history: 20,
  "political-science": 20,
  polscience: 20,
  pol: 20,
  "pol science": 20,
  geography: 20,
  geo: 20,
  psychology: 20,
  psy: 20,
  sociology: 20,
  "physical-education": 20,
  ped: 20,
  "computer-science": 20,
  cs: 20,
  "home-science": 20,
  hsc: 20,
  "mass-media": 20,
  mmc: 20,
  "environmental-studies": 20,
  evs: 20,
  "fine-arts": 20,
  fa: 20,
  agriculture: 20,
  agr: 20,
  anthropology: 20,
  ant: 20,
};

export const SUBJECT_DURATION_MINUTES: Record<string, number> = {
  physics: 60,
  chemistry: 60,
  mathematics: 60,
  "mathematics-sci": 60,
  "mathematics-com": 60,
  maths: 60,
  biology: 45,
  bio: 45,
  accountancy: 60,
  accounts: 60,
  accs: 60,
  economics: 60,
  eco: 60,
  "business-studies": 45,
  business: 45,
  bst: 45,
  history: 45,
  "political-science": 45,
  polscience: 45,
  pol: 45,
  "pol science": 45,
  geography: 45,
  geo: 45,
  psychology: 45,
  psy: 45,
  sociology: 45,
  "physical-education": 45,
  ped: 45,
  "computer-science": 60,
  cs: 60,
  "home-science": 45,
  hsc: 45,
  "mass-media": 45,
  mmc: 45,
  "environmental-studies": 45,
  evs: 45,
  "fine-arts": 45,
  fa: 45,
  agriculture: 45,
  agr: 45,
  anthropology: 45,
  ant: 45,
};

export function createMockTestList(
  subjectSlug: string,
  _subjectName: string,
  durationMinutes: number = 60,
  count?: number
): MockTestItem[] {
  const actualCount =
    count ??
    SUBJECT_MOCK_COUNTS[subjectSlug] ??
    SUBJECT_MOCK_COUNTS[subjectSlug.toLowerCase()] ??
    20;
  const baseMockId =
    SUBJECT_TO_MOCK[subjectSlug] ||
    SUBJECT_TO_MOCK[subjectSlug.toLowerCase()] ||
    `${subjectSlug}-mock`;
  const list: MockTestItem[] = [];
  for (let i = 1; i <= actualCount; i++) {
    list.push({
      id: `${baseMockId}-${i}`,
      mockNumber: i,
      label: `Mock Test ${i}`,
      mockLabel: `Full Syllabus Mock ${i}`,
      duration: `${durationMinutes} Mins`,
      questions: 50,
      tags: ["CUET UG 2026", "Full Syllabus", "NTA CBT Pattern"],
    });
  }
  return list;
}

export const PHYSICS_MOCK_TESTS: MockTestItem[] = createMockTestList("physics", "Physics", 60, 20);
export const CHEMISTRY_MOCK_TESTS: MockTestItem[] = createMockTestList("chemistry", "Chemistry", 60, 20);
export const MATHS_MOCK_TESTS: MockTestItem[] = createMockTestList("maths", "Mathematics", 60, 20);
export const BIOLOGY_MOCK_TESTS: MockTestItem[] = createMockTestList("biology", "Biology", 45, 12);
export const ACCOUNTANCY_MOCK_TESTS: MockTestItem[] = createMockTestList("accountancy", "Accountancy", 60, 18);
export const ECONOMICS_MOCK_TESTS: MockTestItem[] = createMockTestList("economics", "Economics", 60, 20);
export const BUSINESS_STUDIES_MOCK_TESTS: MockTestItem[] = createMockTestList("business-studies", "Business Studies", 45, 20);
export const HISTORY_MOCK_TESTS: MockTestItem[] = createMockTestList("history", "History", 45, 20);
export const POLITICAL_SCIENCE_MOCK_TESTS: MockTestItem[] = createMockTestList("political-science", "Political Science", 45, 20);
export const GEOGRAPHY_MOCK_TESTS: MockTestItem[] = createMockTestList("geography", "Geography", 45, 20);
export const PSYCHOLOGY_MOCK_TESTS: MockTestItem[] = createMockTestList("psychology", "Psychology", 45, 20);
export const SOCIOLOGY_MOCK_TESTS: MockTestItem[] = createMockTestList("sociology", "Sociology", 45, 20);
export const PHYSICAL_EDUCATION_MOCK_TESTS: MockTestItem[] = createMockTestList("physical-education", "Physical Education", 45, 20);
export const COMPUTER_SCIENCE_MOCK_TESTS: MockTestItem[] = createMockTestList("computer-science", "Computer Science", 60, 20);
export const HOME_SCIENCE_MOCK_TESTS: MockTestItem[] = createMockTestList("home-science", "Home Science", 45, 20);
export const MASS_MEDIA_MOCK_TESTS: MockTestItem[] = createMockTestList("mass-media", "Mass Media", 45, 20);
export const ENVIRONMENTAL_STUDIES_MOCK_TESTS: MockTestItem[] = createMockTestList("environmental-studies", "Environmental Studies", 45, 20);
export const FINE_ARTS_MOCK_TESTS: MockTestItem[] = createMockTestList("fine-arts", "Fine Arts", 45, 20);
export const AGRICULTURE_MOCK_TESTS: MockTestItem[] = createMockTestList("agriculture", "Agriculture", 45, 20);
export const ANTHROPOLOGY_MOCK_TESTS: MockTestItem[] = createMockTestList("anthropology", "Anthropology", 45, 20);

export function getMockTestsForSubject(subjectKey: string): MockTestItem[] {
  if (!subjectKey) return [];
  const key = subjectKey.toLowerCase().trim();
  const count = SUBJECT_MOCK_COUNTS[key] ?? 20;
  const duration = SUBJECT_DURATION_MINUTES[key] ?? 45;
  return createMockTestList(key, subjectKey, duration, count);
}

export interface PYQTestItem {
  id: string;
  subjectSlug: string;
  subjectName: string;
  code: string;
  year: string;
  shift: string;
  label: string;
  yearLabel: string;
  duration: string;
  questions: number;
  tags: string[];
}

export function createPYQTestList(
  _subjectSlug: string,
  _subjectName: string,
  _code: string,
  _durationMinutes: number = 60
): PYQTestItem[] {
  // All PYQ papers are currently being remade from official NTA shifts
  return [];
}

export const PHYSICS_PYQ_TESTS: PYQTestItem[] = [];
export const CHEMISTRY_PYQ_TESTS: PYQTestItem[] = [];
export const MATHS_PYQ_TESTS: PYQTestItem[] = [];
export const BIOLOGY_PYQ_TESTS: PYQTestItem[] = [];
export const ACCOUNTANCY_PYQ_TESTS: PYQTestItem[] = [];
export const BUSINESS_STUDIES_PYQ_TESTS: PYQTestItem[] = [];
export const ECONOMICS_PYQ_TESTS: PYQTestItem[] = [];
export const HISTORY_PYQ_TESTS: PYQTestItem[] = [];
export const POLITICAL_SCIENCE_PYQ_TESTS: PYQTestItem[] = [];
export const GEOGRAPHY_PYQ_TESTS: PYQTestItem[] = [];
export const PSYCHOLOGY_PYQ_TESTS: PYQTestItem[] = [];
export const SOCIOLOGY_PYQ_TESTS: PYQTestItem[] = [];
export const PHYSICAL_EDUCATION_PYQ_TESTS: PYQTestItem[] = [];
export const COMPUTER_SCIENCE_PYQ_TESTS: PYQTestItem[] = [];
export const HOME_SCIENCE_PYQ_TESTS: PYQTestItem[] = [];
export const MASS_MEDIA_PYQ_TESTS: PYQTestItem[] = [];
export const ENVIRONMENTAL_STUDIES_PYQ_TESTS: PYQTestItem[] = [];
export const FINE_ARTS_PYQ_TESTS: PYQTestItem[] = [];
export const AGRICULTURE_PYQ_TESTS: PYQTestItem[] = [];
export const ANTHROPOLOGY_PYQ_TESTS: PYQTestItem[] = [];

export function getPYQTestsForSubject(_subjectKey: string): PYQTestItem[] {
  // All PYQs under reconstruction pending remake
  return [];
}

export function getAllPYQTests(): PYQTestItem[] {
  // All PYQs under reconstruction pending remake
  return [];
}

export const CUET_SUBJECTS: SubjectConfig[] = [
  // Science Stream
  {
    id: "physics",
    name: "Physics",
    code: "312",
    stream: "science",
    iconName: "Atom",
    description: "Electrostatics, Optics, Modern Physics, Magnetic Effects of Current",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 60,
    popularMockCount: 20,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    code: "306",
    stream: "science",
    iconName: "FlaskConical",
    description: "Solutions, Electrochemistry, Coordination Compounds, Biomolecules",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 60,
    popularMockCount: 20,
  },
  {
    id: "mathematics-sci",
    name: "Mathematics / Applied Maths",
    code: "319",
    stream: "science",
    iconName: "Binary",
    description: "Calculus, Vectors, 3D Geometry, Linear Programming & Probability",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 60,
    popularMockCount: 20,
  },
  {
    id: "biology",
    name: "Biology / Biotechnology",
    code: "304",
    stream: "science",
    iconName: "Dna",
    description: "Reproduction, Genetics & Evolution, Ecology & Environment",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 12,
  },

  // Commerce Stream
  {
    id: "accountancy",
    name: "Accountancy / Book Keeping",
    code: "301",
    stream: "commerce",
    iconName: "Calculator",
    description: "Partnership, Share Capital, Financial Statement Analysis & Cash Flow",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 60,
    popularMockCount: 18,
  },
  {
    id: "business-studies",
    name: "Business Studies",
    code: "305",
    stream: "commerce",
    iconName: "Briefcase",
    description: "Principles of Management, Marketing, Financial Markets & Consumer Rights",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "economics",
    name: "Economics / Business Economics",
    code: "309",
    stream: "commerce",
    iconName: "TrendingUp",
    description: "Macroeconomics, National Income, Indian Economic Development",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 60,
    popularMockCount: 20,
  },
  {
    id: "mathematics-com",
    name: "Applied Mathematics",
    code: "319-A",
    stream: "commerce",
    iconName: "Percent",
    description: "Financial Mathematics, Time Series, Linear Programming & Index Numbers",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 60,
    popularMockCount: 20,
  },

  // Humanities Stream
  {
    id: "political-science",
    name: "Political Science",
    code: "323",
    stream: "humanities",
    iconName: "Landmark",
    description: "Contemporary World Politics, Politics in India since Independence",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "history",
    name: "History",
    code: "314",
    stream: "humanities",
    iconName: "ScrollText",
    description: "Themes in Indian History Part I, II, III & Colonial Archival Sources",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "geography",
    name: "Geography / Geology",
    code: "313",
    stream: "humanities",
    iconName: "Globe",
    description: "Fundamentals of Human Geography, India: People & Economy",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "psychology",
    name: "Psychology",
    code: "324",
    stream: "humanities",
    iconName: "BrainCircuit",
    description: "Self and Personality, Psychological Disorders, Social Influence",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "sociology",
    name: "Sociology",
    code: "325",
    stream: "humanities",
    iconName: "Users",
    description: "Structure of Indian Society, Social Institutions, Social Change and Development",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "physical-education",
    name: "Physical Education / NCC / Yoga",
    code: "321",
    stream: "commerce",
    iconName: "Activity",
    description: "Management of Sporting Events, Yoga, Sports & Nutrition, Biomechanics",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "computer-science",
    name: "Computer Science / IP",
    code: "308",
    stream: "science",
    iconName: "Laptop",
    description: "Computational Thinking, Python, SQL, Computer Networks, Data Handling",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 60,
    popularMockCount: 20,
  },
  {
    id: "home-science",
    name: "Home Science",
    code: "315",
    stream: "humanities",
    iconName: "Home",
    description: "Clinical Nutrition, Human Development, Fabric and Apparel, Resource Management",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "mass-media",
    name: "Mass Media & Communication",
    code: "318",
    stream: "humanities",
    iconName: "Tv",
    description: "Communication Theories, Journalism, Cinema, Radio & Television, New Media",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "environmental-studies",
    name: "Environmental Studies",
    code: "307",
    stream: "science",
    iconName: "Leaf",
    description: "Ecosystem Ecology, Biodiversity Conservation, Environmental Pollution, Sustainable Development",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "fine-arts",
    name: "Fine Arts / Visual Arts",
    code: "311",
    stream: "humanities",
    iconName: "Palette",
    description: "Miniature Painting, Mughal & Deccan Schools, Bengal School, Modern Indian Art",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "agriculture",
    name: "Agriculture",
    code: "302",
    stream: "science",
    iconName: "Sprout",
    description: "Agrometeorology, Genetics, Livestock Production, Agronomy, Horticulture",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },
  {
    id: "anthropology",
    name: "Anthropology",
    code: "303",
    stream: "humanities",
    iconName: "Footprints",
    description: "Physical Anthropology, Socio-Cultural Anthropology, Prehistoric Archaeology, Indian Tribal Studies",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 45,
    popularMockCount: 20,
  },

  // Common Stream (General Aptitude Test)
  {
    id: "general-test",
    name: "General Aptitude Test (GAT)",
    code: "501",
    stream: "commerce",
    iconName: "BookMarked",
    description: "General Knowledge, Current Affairs, General Mental Ability, Numerical Ability",
    totalQuestions: 50,
    maxToAttempt: 50,
    durationMinutes: 60,
    popularMockCount: 20,
  },
];

export const MOCK_SAMPLE_QUESTION = {
  id: "pyq_cuet_2023_phy_01",
  subjectId: "physics",
  questionNumber: 1,
  prompt:
    "Two point charges +4q and +q are placed at a distance 'L' apart. A third charge Q is placed on the line connecting them such that all three charges remain in electrostatic equilibrium. What is the position and value of charge Q?",
  options: [
    { id: "A" as const, text: "At distance 2L/3 from +4q, with charge Q = -4q/9" },
    { id: "B" as const, text: "At distance L/3 from +4q, with charge Q = -2q/3" },
    { id: "C" as const, text: "At distance 2L/3 from +4q, with charge Q = +4q/9" },
    { id: "D" as const, text: "At distance L/2 from +4q, with charge Q = -q/4" },
  ],
  correctOptionId: "A" as const,
  explanation:
    "For the third charge Q to be in equilibrium between +4q (at origin) and +q (at x = L): Electric force balance gives (k*4q*Q)/x^2 = (k*q*Q)/(L - x)^2 => 2/x = 1/(L - x) => 2L - 2x = x => x = 2L/3. For the +q charge at x=L to also be in equilibrium: (k*4q*q)/L^2 + (k*Q*q)/(L - 2L/3)^2 = 0 => 4q/L^2 + 9Q/L^2 = 0 => Q = -4q/9.",
  aiDiagnosisNotes:
    "Common pitfall: 42% of test-takers only calculate the equilibrium position of the middle charge without balancing the net force on boundary charges, leading to the wrong sign or magnitude.",
  pyqSource: "CUET UG 2023 (Shift 1 - Official NTA CBT)",
  topic: "Electrostatics & Coulomb's Law",
  difficulty: "medium" as const,
};
