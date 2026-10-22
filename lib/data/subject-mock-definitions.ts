export interface SubjectMockDefinition {
  id: string;
  folder: string;
  code: string;
  name: string;
  durationMinutes: number;
  aliases: string[];
}

export const SUBJECT_MOCK_DEFINITIONS: SubjectMockDefinition[] = [
  { id: "physics", folder: "physics", code: "312", name: "Physics", durationMinutes: 60, aliases: ["physics", "phys"] },
  { id: "chemistry", folder: "chemistry", code: "306", name: "Chemistry", durationMinutes: 60, aliases: ["chemistry", "chem"] },
  { id: "maths", folder: "maths", code: "319", name: "Mathematics", durationMinutes: 60, aliases: ["maths", "mathematics", "math"] },
  { id: "bio", folder: "bio", code: "304", name: "Biology", durationMinutes: 45, aliases: ["biology", "bio"] },
  { id: "accountancy", folder: "accountancy", code: "301", name: "Accountancy", durationMinutes: 60, aliases: ["accountancy", "accounts", "accs", "account"] },
  { id: "eco", folder: "eco", code: "309", name: "Economics", durationMinutes: 60, aliases: ["economics", "eco"] },
  { id: "bst", folder: "bst", code: "305", name: "Business Studies", durationMinutes: 45, aliases: ["business-studies", "business_studies", "business", "bst"] },
  { id: "history", folder: "history", code: "314", name: "History", durationMinutes: 45, aliases: ["history", "hist"] },
  { id: "pol science", folder: "pol science", code: "323", name: "Political Science", durationMinutes: 45, aliases: ["political-science", "political_science", "pol-science", "pol_science", "polscience", "pol"] },
  { id: "geo", folder: "geo", code: "313", name: "Geography", durationMinutes: 45, aliases: ["geography", "geo"] },
  { id: "psychology", folder: "psychology", code: "324", name: "Psychology", durationMinutes: 45, aliases: ["psychology", "psy", "psych"] },
  { id: "sociology", folder: "sociology", code: "325", name: "Sociology", durationMinutes: 45, aliases: ["sociology", "soc"] },
  { id: "physical_education", folder: "physical_education", code: "321", name: "Physical Education", durationMinutes: 45, aliases: ["physical-education", "physical_education", "physical", "ped"] },
  { id: "computer_science", folder: "computer_science", code: "308", name: "Computer Science / Informatics Practices", durationMinutes: 60, aliases: ["computer-science", "computer_science", "csip", "informatics", "cs"] },
  { id: "home_science", folder: "home_science", code: "315", name: "Home Science", durationMinutes: 45, aliases: ["home-science", "home_science", "hsc"] },
  { id: "mass_media", folder: "mass_media", code: "318", name: "Mass Media / Mass Communication", durationMinutes: 45, aliases: ["mass-media", "mass_media", "masscomm", "media", "mmc"] },
  { id: "environmental_studies", folder: "environmental_studies", code: "307", name: "Environmental Studies", durationMinutes: 45, aliases: ["environmental-studies", "environmental_studies", "environmental", "evs"] },
  { id: "fine_arts", folder: "fine_arts", code: "311", name: "Fine Arts / Visual Arts", durationMinutes: 45, aliases: ["fine-arts", "fine_arts", "visual-arts", "visual_arts", "finearts", "fa"] },
  { id: "agriculture", folder: "agriculture", code: "302", name: "Agriculture", durationMinutes: 45, aliases: ["agriculture", "agr"] },
  { id: "anthropology", folder: "anthropology", code: "303", name: "Anthropology", durationMinutes: 45, aliases: ["anthropology", "ant"] },
  { id: "english", folder: "english", code: "101", name: "English", durationMinutes: 45, aliases: ["english", "eng"] },
  { id: "general-test", folder: "general-test", code: "501", name: "General Aptitude Test", durationMinutes: 60, aliases: ["general-test", "general_test", "general_aptitude_test", "general-aptitude-test", "gat", "general"] },
];
