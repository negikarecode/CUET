export interface DUCourseItem {
  id: string;
  name: string;
  category: "Commerce & Mgmt" | "Science & Tech" | "Arts & Humanities" | "Education & Professional";
  popular?: boolean;
}

/**
 * Complete list of Undergraduate Courses offered by Delhi University (DU)
 */
export const DU_COURSES: DUCourseItem[] = [
  // Commerce & Management
  { id: "bcom-hons", name: "BCom (Hons)", category: "Commerce & Mgmt", popular: true },
  { id: "bcom", name: "BCom", category: "Commerce & Mgmt", popular: true },
  { id: "bfia", name: "Bachelor of Financial & Investment Analysis", category: "Commerce & Mgmt", popular: true },
  { id: "bbs", name: "Bachelor of Business Studies", category: "Commerce & Mgmt", popular: true },
  { id: "ba-bbe", name: "B.A. (Hons) Business Economics (BBE)", category: "Commerce & Mgmt", popular: true },
  { id: "ba-vocational", name: "B.A. Vocational Studies", category: "Commerce & Mgmt" },

  // Arts & Humanities
  { id: "ba-econ", name: "B.A. (Hons) Economics", category: "Arts & Humanities", popular: true },
  { id: "ba-polsci", name: "B.A. (Hons) Political Science", category: "Arts & Humanities", popular: true },
  { id: "ba-eng", name: "B.A. (Hons) English", category: "Arts & Humanities", popular: true },
  { id: "ba-hist", name: "B.A. (Hons) History", category: "Arts & Humanities", popular: true },
  { id: "ba-psych", name: "B.A. (Hons) Psychology", category: "Arts & Humanities", popular: true },
  { id: "ba-applied-psych", name: "B.A. (Hons) Applied Psychology", category: "Arts & Humanities" },
  { id: "ba-journalism", name: "B.A. (Hons) Journalism", category: "Arts & Humanities", popular: true },
  { id: "ba-geography", name: "B.A. (Hons) Geography", category: "Arts & Humanities" },
  { id: "ba-sociology", name: "B.A. (Hons) Sociology", category: "Arts & Humanities" },
  { id: "ba-philosophy", name: "B.A. (Hons) Philosophy", category: "Arts & Humanities" },
  { id: "ba-hindi", name: "B.A. (Hons) Hindi", category: "Arts & Humanities" },
  { id: "ba-hindi-journalism", name: "B.A. (Hons.) Hindi Journalism and Mass Communication", category: "Arts & Humanities" },
  { id: "ba-patrakarita", name: "B.A. (Hons) Patrakarita Evam Jansanchar", category: "Arts & Humanities" },
  { id: "ba-functional-hindi", name: "B.A. Functional Hindi", category: "Arts & Humanities" },
  { id: "ba-sanskrit", name: "B.A. (Hons) Sanskrit", category: "Arts & Humanities" },
  { id: "ba-music", name: "B.A. (Hons) Music", category: "Arts & Humanities" },
  { id: "ba-social-work", name: "B.A. (Hons) Social Work", category: "Arts & Humanities" },
  { id: "ba-french", name: "B.A. (Hons) French", category: "Arts & Humanities" },
  { id: "ba-german", name: "B.A. (Hons) German", category: "Arts & Humanities" },
  { id: "ba-spanish", name: "B.A. (Hons) Spanish", category: "Arts & Humanities" },
  { id: "ba-italian", name: "B.A. (Hons) Italian", category: "Arts & Humanities" },
  { id: "ba-arabic", name: "B.A. (Hons) Arabic", category: "Arts & Humanities" },
  { id: "ba-bengali", name: "B.A. (Hons) Bengali", category: "Arts & Humanities" },
  { id: "ba-persian", name: "B.A. (Hons) Persian", category: "Arts & Humanities" },
  { id: "ba-punjabi", name: "B.A. (Hons) Punjabi", category: "Arts & Humanities" },
  { id: "ba-urdu", name: "B.A. (Hons) Urdu", category: "Arts & Humanities" },

  // Science & Technology
  { id: "bsc-physics", name: "B.Sc. (Hons) Physics", category: "Science & Tech", popular: true },
  { id: "bsc-chemistry", name: "B.Sc. (Hons) Chemistry", category: "Science & Tech", popular: true },
  { id: "bsc-maths", name: "B.Sc. (Hons) Mathematics", category: "Science & Tech", popular: true },
  { id: "bsc-cs", name: "B.Sc. (Hons) Computer Science", category: "Science & Tech", popular: true },
  { id: "bsc-stats", name: "B.Sc. (Hons) Statistics", category: "Science & Tech", popular: true },
  { id: "bsc-botany", name: "B.Sc. (Hons) Botany", category: "Science & Tech" },
  { id: "bsc-zoology", name: "B.Sc. (Hons) Zoology", category: "Science & Tech" },
  { id: "bsc-biochem", name: "B.Sc. (Hons) Bio-Chemistry", category: "Science & Tech" },
  { id: "bsc-biomedical", name: "B.Sc. (Hons) Biomedical Science", category: "Science & Tech" },
  { id: "bsc-microbiology", name: "B.Sc. (Hons) Microbiology", category: "Science & Tech" },
  { id: "bsc-electronics", name: "B.Sc. (Hons) Electronics", category: "Science & Tech" },
  { id: "bsc-instrumentation", name: "B.Sc. (Hons.) Instrumentation", category: "Science & Tech" },
  { id: "bsc-anthropology", name: "B.Sc. (Hons) Anthropology", category: "Science & Tech" },
  { id: "bsc-food-tech", name: "B.Sc. (Hons) Food Technology", category: "Science & Tech" },
  { id: "bsc-geology", name: "B.Sc. (Hons) Geology", category: "Science & Tech" },
  { id: "bsc-home-science-hons", name: "B.Sc. (Hons) Home Science", category: "Science & Tech" },
  { id: "bsc-home-science-pass", name: "B.Sc. Home Science (Pass)", category: "Science & Tech" },
  { id: "bsc-polymer", name: "B.Sc. (Hons) Polymer Science", category: "Science & Tech" },
  { id: "bsc-biological", name: "B.Sc. (Hons.) Biological Sciences", category: "Science & Tech" },
  { id: "bsc-math-sci", name: "B.Sc. (Genl) Mathematical Science", category: "Science & Tech" },
  { id: "bsc-applied-life-sci", name: "B.Sc. Applied Life Sciences", category: "Science & Tech" },
  { id: "bsc-applied-life-agro", name: "B.Sc. Applied Life Sciences with Agro-Chemical & Pest Management", category: "Science & Tech" },
  { id: "bsc-applied-sci", name: "B.Sc. Applied Science", category: "Science & Tech" },
  { id: "bsc-applied-physical-sci", name: "B.Sc. Applied Physical Science", category: "Science & Tech" },
  { id: "bsc-applied-physical-analytical", name: "B.Sc. Applied Physical Science (Analytical Chemistry)", category: "Science & Tech" },
  { id: "bsc-applied-physical-industrial", name: "B.Sc. Applied Physical Sciences (Industrial Chemistry)", category: "Science & Tech" },
  { id: "bsc-industrial-chemistry", name: "B.Sc. Industrial Chemistry", category: "Science & Tech" },
  { id: "bsc-life-sciences", name: "B.Sc. Life Sciences", category: "Science & Tech" },
  { id: "bsc-physical-sciences", name: "B.Sc. Physical Sciences", category: "Science & Tech" },
  { id: "bsc-physical-sci-cs", name: "B.Sc. Physical Science Computer Science", category: "Science & Tech" },
  { id: "bsc-physical-sci-chem", name: "B.Sc. Physical Science with Chemistry", category: "Science & Tech" },
  { id: "bsc-physical-sci-comp", name: "B.Sc. Physical Science with Computer", category: "Science & Tech" },
  { id: "bsc-radiography", name: "B.Sc. (MT) Radiography", category: "Science & Tech" },
  { id: "bsc-pehes", name: "B.Sc (PEHES)", category: "Science & Tech" },
  { id: "bsc-physical-edu", name: "B.Sc. Physical Education & Sports Sciences", category: "Science & Tech" },

  // Education & Professional
  { id: "bed", name: "B.Ed.", category: "Education & Professional" },
  { id: "bed-home-sci", name: "B.Ed. Home Science", category: "Education & Professional" },
  { id: "bed-special-mr", name: "B.Ed. Special Education MR", category: "Education & Professional" },
  { id: "beled", name: "B.El.Ed.", category: "Education & Professional" },
  { id: "bachelor-elem-edu", name: "Bachelor of Elementary Education", category: "Education & Professional" },
  { id: "blis", name: "B.L.I.S.", category: "Education & Professional" },
  { id: "bped", name: "B.P.Ed.", category: "Education & Professional" },
  { id: "bfa", name: "BFA", category: "Education & Professional" },
];
