export interface DUCollegeItem {
  id: string;
  name: string;
  shortName?: string;
  campus: "North Campus" | "South Campus" | "Off Campus" | "Specialized Institution";
  popular?: boolean;
}

/**
 * Complete list of Delhi University Colleges extracted directly from official
 * University of Delhi portal (https://www.du.ac.in/index.php?page=colleges-at-du)
 */
export const DU_COLLEGES: DUCollegeItem[] = [
  // Top North Campus Flagships
  {
    id: "srcc",
    name: "Shri Ram College of Commerce (SRCC)",
    shortName: "SRCC",
    campus: "North Campus",
    popular: true,
  },
  {
    id: "st-stephens",
    name: "St. Stephen's College",
    shortName: "Stephen's",
    campus: "North Campus",
    popular: true,
  },
  {
    id: "hindu",
    name: "Hindu College",
    shortName: "Hindu",
    campus: "North Campus",
    popular: true,
  },
  {
    id: "hansraj",
    name: "Hans Raj College",
    shortName: "Hansraj",
    campus: "North Campus",
    popular: true,
  },
  {
    id: "miranda",
    name: "Miranda House",
    shortName: "Miranda",
    campus: "North Campus",
    popular: true,
  },
  {
    id: "kmc",
    name: "Kirori Mal College (KMC)",
    shortName: "KMC",
    campus: "North Campus",
    popular: true,
  },
  {
    id: "ramjas",
    name: "Ramjas College",
    shortName: "Ramjas",
    campus: "North Campus",
    popular: true,
  },
  {
    id: "daulat-ram",
    name: "Daulat Ram College",
    shortName: "DRC",
    campus: "North Campus",
    popular: true,
  },
  {
    id: "sgtb-khalsa",
    name: "Sri Guru Tegh Bahadur Khalsa College",
    shortName: "SGTB Khalsa",
    campus: "North Campus",
    popular: true,
  },
  {
    id: "ip-college",
    name: "Indraprastha College for Women",
    shortName: "IPCW",
    campus: "North Campus",
    popular: true,
  },

  // South Campus Flagships
  {
    id: "lsr",
    name: "Lady Shri Ram College for Women (LSR)",
    shortName: "LSR",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "venky",
    name: "Sri Venkateswara College (Venky)",
    shortName: "Venky",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "arsd",
    name: "Atma Ram Sanatan Dharma College (ARSD)",
    shortName: "ARSD",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "gargi",
    name: "Gargi College",
    shortName: "Gargi",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "sbsc",
    name: "Shaheed Bhagat Singh College",
    shortName: "SBSC",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "sbsc-eve",
    name: "Shaheed Bhagat Singh College (Evening)",
    campus: "South Campus",
  },
  {
    id: "jmc",
    name: "Jesus & Mary College",
    shortName: "JMC",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "knc",
    name: "Kamla Nehru College for Women",
    shortName: "KNC",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "dcac",
    name: "Delhi College of Arts & Commerce (DCAC)",
    shortName: "DCAC",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "cvs",
    name: "College of Vocational Studies (CVS)",
    shortName: "CVS",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "dyal-singh",
    name: "Dyal Singh College",
    shortName: "DSC",
    campus: "South Campus",
    popular: true,
  },
  {
    id: "dyal-singh-eve",
    name: "Dyal Singh College (Evening)",
    campus: "South Campus",
  },
  {
    id: "maitreyi",
    name: "Maitreyi College for Women",
    campus: "South Campus",
  },
  {
    id: "aryabhatta",
    name: "Aryabhatta College",
    campus: "South Campus",
  },
  {
    id: "rla",
    name: "Ram Lal Anand College",
    campus: "South Campus",
  },
  {
    id: "motilal-nehru",
    name: "Moti Lal Nehru College",
    campus: "South Campus",
  },
  {
    id: "motilal-nehru-eve",
    name: "Moti Lal Nehru College (Evening)",
    campus: "South Campus",
  },
  {
    id: "pgdav",
    name: "P.G.D.A.V. College",
    campus: "South Campus",
  },
  {
    id: "pgdav-eve",
    name: "P.G.D.A.V. College (Evening)",
    campus: "South Campus",
  },
  {
    id: "ramanujan",
    name: "Ramanujan College",
    campus: "South Campus",
  },
  {
    id: "deshbandhu",
    name: "Deshbandhu College",
    campus: "South Campus",
  },
  {
    id: "andc",
    name: "Acharya Narendra Dev College",
    campus: "South Campus",
  },
  {
    id: "aurobindo",
    name: "Sri Aurobindo College",
    campus: "South Campus",
  },
  {
    id: "aurobindo-eve",
    name: "Sri Aurobindo College (Evening)",
    campus: "South Campus",
  },
  {
    id: "ihe",
    name: "Institute of Home Economics",
    campus: "South Campus",
  },

  // Elite Specialized & Off Campus Flagships
  {
    id: "sscbs",
    name: "Shaheed Sukhdev College of Business Studies (SSCBS)",
    shortName: "SSCBS",
    campus: "Off Campus",
    popular: true,
  },
  {
    id: "sggscc",
    name: "Sri Guru Gobind Singh College of Commerce",
    shortName: "SGGSCC",
    campus: "Off Campus",
    popular: true,
  },
  {
    id: "ddu",
    name: "Deen Dayal Upadhyaya College",
    shortName: "DDUC",
    campus: "Off Campus",
    popular: true,
  },
  {
    id: "keshav",
    name: "Keshav Mahavidyalaya",
    campus: "Off Campus",
  },
  {
    id: "bcas",
    name: "Bhaskaracharya College of Applied Sciences",
    campus: "Off Campus",
  },
  {
    id: "rajguru",
    name: "Shaheed Rajguru College of Applied Sciences for Women",
    campus: "Off Campus",
  },
  {
    id: "rajdhani",
    name: "Rajdhani College",
    campus: "Off Campus",
  },
  {
    id: "shivaji",
    name: "Shivaji College",
    campus: "Off Campus",
  },
  {
    id: "maharaja-agrasen",
    name: "Maharaja Agrasen College",
    campus: "Off Campus",
  },
  {
    id: "jdmc",
    name: "Janki Devi Memorial College",
    campus: "Off Campus",
  },
  {
    id: "kalindi",
    name: "Kalindi College for Women",
    campus: "Off Campus",
  },
  {
    id: "lakshmibai",
    name: "Lakshmi Bai College for Women",
    campus: "Off Campus",
  },
  {
    id: "satyawati",
    name: "Satyawati College",
    campus: "Off Campus",
  },
  {
    id: "satyawati-eve",
    name: "Satyawati College (Evening)",
    campus: "Off Campus",
  },
  {
    id: "shyam-lal",
    name: "Shyam Lal College",
    campus: "Off Campus",
  },
  {
    id: "shyam-lal-eve",
    name: "Shyam Lal College (Evening)",
    campus: "Off Campus",
  },
  {
    id: "spm",
    name: "Shyama Prasad Mukherji College for Women",
    campus: "Off Campus",
  },
  {
    id: "sgnd-khalsa",
    name: "Sri Guru Nanak Dev Khalsa College",
    campus: "Off Campus",
  },
  {
    id: "swami-shraddhanand",
    name: "Swami Shraddhanand College",
    campus: "Off Campus",
  },
  {
    id: "vivekananda",
    name: "Vivekananda College",
    campus: "Off Campus",
  },
  {
    id: "zakir-husain",
    name: "Zakir Husain Delhi College",
    campus: "Off Campus",
  },
  {
    id: "zakir-husain-eve",
    name: "Zakir Husain Post Graduate Evening College",
    campus: "Off Campus",
  },
  {
    id: "bhim-rao-ambedkar",
    name: "Bhim Rao Ambedkar College",
    campus: "Off Campus",
  },
  {
    id: "bharati",
    name: "Bharati College",
    campus: "Off Campus",
  },
  {
    id: "bhagini-nivedita",
    name: "Bhagini Nivedita College",
    campus: "Off Campus",
  },
  {
    id: "aditi",
    name: "Aditi Mahavidyalaya",
    campus: "Off Campus",
  },
  {
    id: "sol",
    name: "School of Open Learning (SOL)",
    shortName: "SOL",
    campus: "Off Campus",
  },
  {
    id: "college-of-art",
    name: "College of Art",
    campus: "Off Campus",
  },

  // Professional, Medical & Specialized DU Institutes
  {
    id: "ucms",
    name: "University College of Medical Sciences (UCMS)",
    shortName: "UCMS",
    campus: "Specialized Institution",
  },
  {
    id: "lady-hardinge",
    name: "Lady Hardinge Medical College (LHMC)",
    shortName: "LHMC",
    campus: "Specialized Institution",
  },
  {
    id: "lady-irwin",
    name: "Lady Irwin College",
    campus: "Specialized Institution",
  },
  {
    id: "mamc",
    name: "Maulana Azad Medical College (MAMC)",
    shortName: "MAMC",
    campus: "Specialized Institution",
  },
  {
    id: "maids",
    name: "Maulana Azad Institute of Dental Sciences",
    campus: "Specialized Institution",
  },
  {
    id: "dipsar",
    name: "Delhi Institute of Pharmaceutical Sciences and Research (DIPSAR)",
    shortName: "DIPSAR",
    campus: "Specialized Institution",
  },
  {
    id: "igipess",
    name: "Indira Gandhi Institute of Physical Education & Sports Sciences",
    campus: "Specialized Institution",
  },
  {
    id: "mata-sundri",
    name: "Mata Sundri College for Women",
    campus: "Specialized Institution",
  },
  {
    id: "mvce",
    name: "Maharshi Valmiki College of Education",
    campus: "Specialized Institution",
  },
  {
    id: "rakcon",
    name: "Rajkumari Amrit Kaur College of Nursing",
    campus: "Specialized Institution",
  },
  {
    id: "ahilya-bai",
    name: "Ahilya Bai College of Nursing",
    campus: "Specialized Institution",
  },
  {
    id: "florence-nightingale",
    name: "Florence Nightingale College of Nursing",
    campus: "Specialized Institution",
  },
  {
    id: "holy-family",
    name: "Holy Family College of Nursing",
    campus: "Specialized Institution",
  },
  {
    id: "army-nursing",
    name: "College of Nursing at Army Hospital (R&R)",
    campus: "Specialized Institution",
  },
  {
    id: "tibia",
    name: "Ayurvedic & Unani Tibia College",
    campus: "Specialized Institution",
  },
  {
    id: "nehru-homeopathic",
    name: "Nehru Homeopathic Medical College & Hospital",
    campus: "Specialized Institution",
  },
  {
    id: "amar-jyoti",
    name: "Amar Jyoti Institute of Physiotherapy",
    campus: "Specialized Institution",
  },
  {
    id: "vpci",
    name: "Vallabhbhai Patel Chest Institute",
    campus: "Specialized Institution",
  },
  {
    id: "durga-bai",
    name: "Durga Bai Deshmukh College of Special Education",
    campus: "Specialized Institution",
  },
  {
    id: "pt-deendayal",
    name: "Pt. Deendayal Upadhyaya Institute of Physically Handicapped",
    campus: "Specialized Institution",
  },
  {
    id: "aiia",
    name: "All India Institute of Ayurveda",
    campus: "Specialized Institution",
  },
  {
    id: "chacha-nehru",
    name: "Chacha Nehru Bal Chikitsalaya",
    campus: "Specialized Institution",
  },
];

/**
 * Top Central Universities outside DU for aspirant reference
 */
export const OTHER_CENTRAL_UNIVERSITIES = [
  "Banaras Hindu University (BHU)",
  "Jawaharlal Nehru University (JNU)",
  "Jamia Millia Islamia (JMI)",
  "University of Allahabad",
  "Babasaheb Bhimrao Ambedkar University (BBAU)",
  "Aligarh Muslim University (AMU)",
];
