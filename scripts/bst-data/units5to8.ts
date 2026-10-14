import { NoteDocument } from "@/types/notes";

export const bstUnits5to8Topics: NoteDocument[] = [
  // Unit 5: Organisational Structure, Delegation and Decentralisation
  {
    id: "bst_u5_t1",
    slug: "organisational-structure-delegation-and-decentralisation",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 5,
    unitTitle: "Organising",
    topicTitle: "Organisational Structure, Delegation and Decentralisation",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Principles and Functions of Management",
      chapterNumber: 5,
      chapterName: "Organising",
      sections: [
        "5.1 Organising Process: Identification & division of work, Departmentalisation, Assignment of duties, Establishing reporting relationships",
        "5.2 Organisational Structure: Functional Structure vs Divisional Structure",
        "5.3 Formal vs Informal Organisation",
        "5.4 Delegation: Concept, Importance, Elements (Authority, Responsibility, Accountability)",
        "5.5 Decentralisation: Concept, Importance, Delegation vs Decentralisation",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-6 questions per shift)",
      totalPyqsInRepo: 210,
      weightagePercentage: 9,
    },
    summary30Seconds: [
      "Functional structure groups jobs on the basis of functions (HR, Marketing, R&D); Divisional structure groups jobs on the basis of product lines (Cosmetics, Garments, Footwear).",
      "Delegation has 3 elements: Authority (downward delegation), Responsibility (obligation to perform), Accountability (answerability for final outcome). Authority can be delegated, Responsibility is partly shared, but Accountability is ABSOLUTE and cannot be delegated.",
      "Decentralisation is delegation expanded enterprise-wide to the lowest operational levels. 'Delegation is a necessity; Decentralisation is an optional policy choice.'",
    ],
    coreConcepts: [
      {
        title: "Functional vs Divisional Organisational Structure",
        content: `**1. Functional Structure**:
Grouping of jobs of similar nature under major functions (e.g., Production, Marketing, Finance, HR):
- *Suitability*: Enterprises with a single or limited line of products where functional specialization is paramount.
- *Advantages*: Occupational specialization, minimizes duplication of effort, easier training.
- *Disadvantages*: Departmental silos / functional empire building (departments prioritize own goals over corporate goals), narrow perspective for general managers, difficulty in fixing inter-departmental accountability.

**2. Divisional Structure**:
Organization divided into autonomous multi-functional business units based on different **product lines**, territories, or customer groups (e.g., a conglomerate with separate divisions for Pharmaceuticals, Textiles, Electronics, Cosmetics):
- *Suitability*: Large multi-product diversified enterprises.
- *Advantages*: Product specialization, fixes accountability easily (each division is a standalone profit centre), promotes managerial development (divisional heads gain all-round experience).
- *Disadvantages*: Duplication of resources (each division has its own HR, marketing, accounting department), conflict over corporate capital allocation.`,
        ncertPointers: [
          "Span of Management refers to the number of subordinates that can be effectively managed by a superior; determines the levels of management in the structure.",
        ],
      },
      {
        title: "Delegation: Elements & Principles",
        content: `**Delegation**: The downward transfer of authority from a superior to a subordinate to enable operational execution.

**The Three Inseparable Elements**:
1. **Authority**:
   - Right of an individual to command subordinates and take decisions within the scope of their position.
   - Flows **downward** from superior to subordinate.
2. **Responsibility**:
   - Obligation of a subordinate to properly perform the assigned task.
   - Flows **upward** (subordinate is responsible to superior).
   - Principle of Parity: Authority must equal Responsibility ($Authority = Responsibility$).
3. **Accountability**:
   - Answerability for the final outcome of the assigned task.
   - Flows **upward**.
   - **Principle of Absoluteness of Accountability**: A superior can delegate authority and assign responsibility, but **CANNOT delegate accountability**. The superior remains fully answerable to their own boss for any fault of the subordinate.`,
        ncertPointers: [
          "Delegation is a prerequisite for organizational survival; without it, no manager can function alone.",
        ],
      },
      {
        title: "Decentralisation: Policy & Comparison with Delegation",
        content: `**Decentralisation**: Systematic dispersal of decision-making authority throughout all hierarchical levels down to the lowest operational rungs.

**Delegation vs Decentralisation**:
| Basis | Delegation | Decentralisation |
| :--- | :--- | :--- |
| **Nature** | Compulsory act (no manager can do all work alone) | Optional policy decision by top management |
| **Scope** | Narrow (confined to superior and immediate subordinate) | Wide (systematic dispersal across entire enterprise) |
| **Freedom of Action** | Less freedom (superior maintains tight control) | Significant freedom and autonomy to subordinates |
| **Purpose** | To lessen the immediate burden of the manager | To empower lower levels and develop future leadership |
| **Status** | A routine administrative technique | A long-term corporate philosophy/policy |`,
        ncertPointers: [
          "An enterprise can be completely centralized or decentralized in theory, but in practice, successful companies maintain a balance: core policy decisions centralized at top, operational decisions decentralized.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Three Elements of Delegation",
        formula: "\\text{Authority (Downward)} \\quad | \\quad \\text{Responsibility (Upward)} \\quad | \\quad \\text{Accountability (Upward, Absolute)}",
        symbols: "Elements of delegation",
        siUnits: "Structural dynamics",
        applicationCondition: "Managerial delegation analysis",
      },
      {
        name: "Structure Selection Rule",
        formula: "\\text{Single Product } \\implies \\text{Functional Structure}; \\quad \\text{Multi-Product Diversified } \\implies \\text{Divisional Structure}",
        symbols: "Organizational design rules",
        siUnits: "Structural classification",
        applicationCondition: "Case study problem solving",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Functional Structure vs Divisional Product Structure</text>
  
  <!-- Left Box: Functional Structure -->
  <rect x="50" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5"/>
  <text x="205" y="90" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">Functional Structure (Single Product)</text>
  
  <rect x="135" y="105" width="140" height="30" rx="5" fill="#0f172a" stroke="#3b82f6"/>
  <text x="205" y="125" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Managing Director</text>
  
  <line x1="205" y1="135" x2="205" y2="155" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="85" y1="155" x2="325" y2="155" stroke="#94a3b8" strokeWidth="2"/>
  
  <g fill="#0f172a" stroke="#475569" fontSize="10">
    <rect x="65" y="170" width="60" height="40" rx="4"/>
    <text x="95" y="195" textAnchor="middle" fill="#93c5fd">Prod.</text>
    
    <rect x="135" y="170" width="60" height="40" rx="4"/>
    <text x="165" y="195" textAnchor="middle" fill="#93c5fd">Mktg.</text>
    
    <rect x="205" y="170" width="60" height="40" rx="4"/>
    <text x="235" y="195" textAnchor="middle" fill="#93c5fd">Fin.</text>
    
    <rect x="275" y="170" width="60" height="40" rx="4"/>
    <text x="305" y="195" textAnchor="middle" fill="#93c5fd">HR</text>
  </g>
  <text x="205" y="245" textAnchor="middle" fill="#cbd5e1" fontSize="10">Occupational Specialization (Economies of scale)</text>
  
  <!-- Right Box: Divisional Structure -->
  <rect x="400" y="65" width="310" height="210" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5"/>
  <text x="555" y="90" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Divisional Structure (Multi-Product)</text>
  
  <rect x="485" y="105" width="140" height="30" rx="5" fill="#0f172a" stroke="#10b981"/>
  <text x="555" y="125" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Managing Director</text>
  
  <line x1="555" y1="135" x2="555" y2="155" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="440" y1="155" x2="670" y2="155" stroke="#94a3b8" strokeWidth="2"/>
  
  <g fill="#0f172a" stroke="#475569" fontSize="10">
    <rect x="420" y="170" width="75" height="40" rx="4"/>
    <text x="457" y="188" textAnchor="middle" fill="#86efac">Cosmetics</text>
    <text x="457" y="202" textAnchor="middle" fill="#94a3b8" fontSize="8">(P, M, F, HR)</text>
    
    <rect x="515" y="170" width="75" height="40" rx="4"/>
    <text x="552" y="188" textAnchor="middle" fill="#86efac">Garments</text>
    <text x="552" y="202" textAnchor="middle" fill="#94a3b8" fontSize="8">(P, M, F, HR)</text>
    
    <rect x="610" y="170" width="75" height="40" rx="4"/>
    <text x="647" y="188" textAnchor="middle" fill="#86efac">Footwear</text>
    <text x="647" y="202" textAnchor="middle" fill="#94a3b8" fontSize="8">(P, M, F, HR)</text>
  </g>
  <text x="555" y="245" textAnchor="middle" fill="#cbd5e1" fontSize="10">Product Specialization (Independent profit centres)</text>
</svg>`,
    workedExamples: [
      {
        id: "bst_u5_t1_we1",
        questionNumber: 1,
        question: "A large company manufactures cosmetics, garments, footwear, and consumer electronics. Each product line operates as an independent autonomous unit with its own production, marketing, finance, and human resource departments. Which organizational structure is adopted by the company?",
        options: [
          { id: "A", text: "Functional Structure" },
          { id: "B", text: "Divisional Structure" },
          { id: "C", text: "Matrix Structure" },
          { id: "D", text: "Informal Structure" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The enterprise is diversified across multiple distinct product lines (cosmetics, garments, footwear, electronics).",
          "Step 2: When an enterprise creates separate self-contained business units for each product line with dedicated functional departments, it is a **Divisional Structure**.",
          "Step 3: Option B is correct.",
        ],
      },
      {
        id: "bst_u5_t1_we2",
        questionNumber: 2,
        question: "A Production Manager delegates the task of assembling 500 units to his subordinate Foreman and grants him the authority to draw raw materials from the stores. Due to negligence, the Foreman fails to complete the order. Can the Production Manager absolve himself of accountability before the General Manager?",
        options: [
          { id: "A", text: "Yes, because the task and authority were fully transferred to the Foreman" },
          { id: "B", text: "No, because while authority can be delegated, accountability is absolute and cannot be delegated" },
          { id: "C", text: "Yes, if the Foreman gives a written confession" },
          { id: "D", text: "Yes, because delegation terminates all superior responsibilities" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Under the Principle of Absoluteness of Accountability, a superior cannot surrender answerability for the final outcome.",
          "Step 2: The Production Manager remains completely accountable to his own superior (the General Manager) for the performance of his department.",
          "Step 3: Hence, the manager cannot absolve himself. Option B is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Absoluteness of Accountability",
        frequency: "Very High",
        typicalStem: "Which element of delegation cannot be delegated at all and remains absolute with the delegator?",
        strategy: "Accountability.",
      },
      {
        patternType: "Structure Suitability Scenario",
        frequency: "High",
        typicalStem: "An enterprise manufacturing only one standard line of chemical products should adopt which structure?",
        strategy: "Functional Structure.",
      },
    ],
    commonTraps: [
      {
        concept: "Delegation vs Decentralisation Nature",
        misconception: "Thinking decentralisation is mandatory for all firms.",
        correctUnderstanding: "**Delegation is a mandatory administrative necessity** for every manager. **Decentralisation is an optional corporate philosophy/policy** determined by top management.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Delegation 3 Elements",
        mnemonic: "A-R-A: Authority (down), Responsibility (up), Accountability (absolute up).",
        explanation: "Quick recall of the 3 elements and directional flows.",
      },
    ],
    quickRevisionCard: {
      title: "Organising — High-Yield Cheat Sheet",
      bulletPoints: [
        "Functional Structure: Grouped by functions (Marketing, HR, Finance) for single-product firms.",
        "Divisional Structure: Grouped by product lines (profit centres) for diversified enterprises.",
        "Span of Management: Number of subordinates directly managed; determines hierarchy depth.",
        "Delegation elements: Authority (downward), Responsibility (upward), Accountability (absolute upward).",
        "Authority can be delegated, but Accountability CANNOT be delegated.",
        "Decentralisation: Delegation expanded throughout the organization down to lowest level.",
        "Delegation is a necessity; Decentralisation is an optional policy choice.",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u5_t1_q1",
        question: "Which element of delegation flows downward from superior to subordinate?",
        options: [
          { id: "A", text: "Responsibility" },
          { id: "B", text: "Authority" },
          { id: "C", text: "Accountability" },
          { id: "D", text: "Coordination" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Authority flows downward from superior to subordinate as a superior shares his decision-making rights with subordinates.",
      },
      {
        id: "bst_u5_t1_q2",
        question: "The principle which states that 'Accountability cannot be delegated and remains absolute with the superior' is known as:",
        options: [
          { id: "A", text: "Principle of Parity of Authority and Responsibility" },
          { id: "B", text: "Principle of Absoluteness of Accountability" },
          { id: "C", text: "Principle of Unity of Command" },
          { id: "D", text: "Principle of Scalar Chain" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The Principle of Absoluteness of Accountability asserts that delegation does not relieve the manager of his ultimate accountability for the performance of duties assigned to subordinates.",
      },
      {
        id: "bst_u5_t1_q3",
        question: "An organisational structure that groups activities on the basis of different product lines is called a:",
        options: [
          { id: "A", text: "Functional Structure" },
          { id: "B", text: "Divisional Structure" },
          { id: "C", text: "Matrix Structure" },
          { id: "D", text: "Informal Structure" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "In a divisional structure, an organization is divided into separate autonomous units or divisions on the basis of different product lines.",
      },
      {
        id: "bst_u5_t1_q4",
        question: "Span of management refers to:",
        options: [
          { id: "A", text: "Length of service of a senior manager" },
          { id: "B", text: "Number of subordinates that can be effectively managed by a superior" },
          { id: "C", text: "Total geographical area under a sales territory" },
          { id: "D", text: "Total number of product lines manufactured" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Span of management refers to the number of subordinates who can be effectively supervised and directed by an executive.",
      },
      {
        id: "bst_u5_t1_q5",
        question: "Which of the following is a key difference between Delegation and Decentralisation?",
        options: [
          { id: "A", text: "Delegation is an optional policy choice, whereas decentralisation is a mandatory administrative necessity" },
          { id: "B", text: "Delegation has a narrow scope between two individuals, whereas decentralisation is a systematic enterprise-wide policy" },
          { id: "C", text: "Decentralisation removes all accountability from top management" },
          { id: "D", text: "Delegation applies only to manufacturing operations" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Delegation is confined to the immediate relationship between a superior and subordinate (narrow scope); decentralisation is a wide enterprise-wide philosophy.",
      },
      {
        id: "bst_u5_t1_q6",
        question: "A major disadvantage of a Functional Organisational Structure is:",
        options: [
          { id: "A", text: "Heavy duplication of operational resources across divisions" },
          { id: "B", text: "Formation of functional silos where departments prioritize own departmental goals over overall organisational objectives" },
          { id: "C", text: "Excessive employee turnover" },
          { id: "D", text: "Inability to achieve economies of scale" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Functional structures tend to create functional silos or empires where department heads pursue narrow functional goals, leading to inter-departmental conflicts and coordination breakdown.",
      },
      {
        id: "bst_u5_t1_q7",
        question: "An informal organisation emerges primarily out of:",
        options: [
          { id: "A", text: "Rules and procedures formulated by top management" },
          { id: "B", text: "Personal social interactions and psychological bonds among employees within the formal setup" },
          { id: "C", text: "Statutory labor laws" },
          { id: "D", text: "Board resolutions" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "An informal organisation is a network of social and friendly relations that emerges spontaneously among employees as they interact in the workplace.",
      },
      {
        id: "bst_u5_t1_q8",
        question: "If authority granted to a manager exceeds the responsibility assigned to him, it is most likely to result in:",
        options: [
          { id: "A", text: "Misuse of authority and arbitrary decision making" },
          { id: "B", text: "Frustration due to inability to perform tasks" },
          { id: "C", text: "Zero accountability" },
          { id: "D", text: "Automatic decentralisation" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "According to the principle of parity between authority and responsibility, an excess of authority over responsibility can easily lead to misuse of power.",
      },
      {
        id: "bst_u5_t1_q9",
        question: "In which organizational structure can divisional heads be easily held accountable for revenues and costs, because each division operates as an independent profit centre?",
        options: [
          { id: "A", text: "Functional Structure" },
          { id: "B", text: "Divisional Structure" },
          { id: "C", text: "Informal Structure" },
          { id: "D", text: "Bureaucratic Structure" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "In a divisional structure, each product division is an independent profit centre responsible for its own revenue and expenditure, making performance appraisal transparent.",
      },
      {
        id: "bst_u5_t1_q10",
        question: "Decentralisation helps in developing future managerial talent because:",
        options: [
          { id: "A", text: "It allows subordinates to take independent decisions, cultivating problem-solving skills and self-confidence" },
          { id: "B", text: "It eliminates the need for training programmes" },
          { id: "C", text: "It reduces salary expenses" },
          { id: "D", text: "It centralizes all operational authority at the top" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Decentralisation gives lower-level managers the freedom to handle operational challenges independently, grooming them for executive leadership roles in the future.",
      },
    ],
  },

  // Unit 6: Recruitment, Selection, Training and Development
  {
    id: "bst_u6_t1",
    slug: "recruitment-selection-training-and-development",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 6,
    unitTitle: "Staffing",
    topicTitle: "Recruitment, Selection, Training and Development",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Principles and Functions of Management",
      chapterNumber: 6,
      chapterName: "Staffing",
      sections: [
        "6.1 Staffing: Concept, Importance, Staffing as Part of Human Resource Management (HRM)",
        "6.2 Staffing Process: Estimating manpower requirements (Workload vs Workforce analysis), Recruitment, Selection, Placement, Training, Performance appraisal",
        "6.3 Recruitment: Internal Sources (Transfers, Promotions) vs External Sources (Direct recruitment, Casual callers, Advertisements, Employment exchanges, Placement agencies, Campus recruitment, Web publishing)",
        "6.4 Selection: Meaning and 8-Step Selection Process (Tests: Intelligence, Aptitude, Personality, Trade, Interest)",
        "6.5 Training vs Development, On-the-job Methods (Apprenticeship, Coaching, Internship, Job rotation) vs Off-the-job Methods (Vestibule training, Case study)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-6 questions per shift)",
      totalPyqsInRepo: 215,
      weightagePercentage: 9,
    },
    summary30Seconds: [
      "Staffing Process begins with estimating manpower requirements: Workload Analysis (number and type of staff needed) minus Workforce Analysis (staff already available) = Net Manpower Surplus or Deficit.",
      "Recruitment is a positive process (attracting candidates); Selection is a negative process (screening and rejecting applicants to pick the best).",
      "Training methods: On-the-job (Apprenticeship for technical trades, Internship training bridging institute and firm); Off-the-job (Vestibule Training: training on duplicate equipment in a dummy environment away from actual floor).",
    ],
    coreConcepts: [
      {
        title: "Staffing Process & Manpower Estimation",
        content: `**Staffing**: Putting the right person on the right job with right qualifications.

**Sequential Steps in Staffing Process**:
1. **Estimating Manpower Requirements**:
   - *Workload Analysis*: Determines the number and types of human resources required to perform various jobs and meet targets.
   - *Workforce Analysis*: Measures the number and types of human resources already available within the enterprise.
   - *Comparison*: If Workload > Workforce $\\implies$ Understaffed (need recruitment). If Workforce > Workload $\\implies$ Overstaffed (need transfers/retrenchment).
2. **Recruitment**: Searching for prospective employees and stimulating them to apply.
3. **Selection**: Evaluating applicants and choosing the most suitable candidates.
4. **Placement and Orientation**: Placing the candidate on the designated job and introducing him to colleagues and company rules.
5. **Training and Development**: Enhancing current skills and preparing for future growth.
6. **Performance Appraisal**: Evaluating current performance against standards.
7. **Promotion and Career Planning**.
8. **Compensation**: Direct wages/salaries and indirect benefits.`,
        ncertPointers: [
          "Staffing is the human dimension of management, bridging administrative design with real workplace talent.",
        ],
      },
      {
        title: "Sources of Recruitment: Internal vs External",
        content: `**1. Internal Sources**:
- **Transfers**: Shifting an employee from one job to another, one department to another, without a substantive change in rank, responsibility, or pay (horizontal movement). Helps resolve overstaffing in one department and understaffing in another.
- **Promotions**: Shifting an employee to a higher position carrying higher status, pay, and responsibilities (vertical movement). Boosts employee morale.
- *Merits*: Economical, motivates existing staff, simplifies induction.
- *Demerits*: Restricts fresh talent ('inbreeding'), limits competition, not suitable for new enterprises.

**2. External Sources**:
- *Direct Recruitment*: Notice placed on factory notice-board; casual laborers recruited on the spot (unskilled/semi-skilled).
- *Casual Callers*: Database of unsolicited applicants kept on file.
- *Advertisement*: Wide reach for skilled managerial/technical personnel.
- *Employment Exchanges*: Government-run agencies for unskilled/skilled operational jobs.
- *Placement Agencies & Management Consultants*: Professional headhunters for top/middle executive roles.
- *Campus Recruitment*: Sourcing fresh graduates directly from colleges/universities.
- *Recommendations of Present Employees*: Reliable referrals.
- *Web Publishing*: Online job portals (Naukri, Monster, LinkedIn).`,
        ncertPointers: [
          "Campus recruitment is widely used by technical, engineering, and management institutes to place fresh graduates.",
        ],
      },
      {
        title: "Selection Process, Tests & Training Methods",
        content: `**Selection Tests**:
1. **Intelligence Test**: Measures level of intelligence quotient (IQ) and learning ability.
2. **Aptitude Test**: Measures an individual's potential or capacity for **learning new skills**.
3. **Personality Test**: Assesses an individual's value system, emotional balance, and maturity.
4. **Trade Test**: Measures **existing professional skills** and current proficiency (differs from Aptitude test, which measures future potential).
5. **Interest Test**: Identifies areas of specific personal interest or hobby.

**Training vs Development**:
- *Training*: Short-term process aimed at improving specific job-related skills.
- *Development*: Broader long-term learning process aimed at overall growth and personality development of the employee.

**Training Methods**:
- **On-the-Job Methods (Learn while you earn)**:
  - *Apprenticeship Training*: Trainee works under a master worker for a prescribed period to learn specialized technical crafts (e.g. electricians, plumbers, machinists).
  - *Internship Training*: Joint program between educational institutes and business firms to combine theoretical knowledge with practical work.
  - *Job Rotation*: Shifting trainee across departments to gain an overview of all operations.
- **Off-the-Job Methods**:
  - **Vestibule Training**: Trainees learn their jobs on **duplicate dummy equipment** in a separate classroom away from the actual factory floor. Used when sophisticated, expensive, or hazardous machinery is involved (prevents damage to expensive equipment).`,
        ncertPointers: [
          "Selection is considered a 'negative process' because the number of rejected candidates is almost always greater than the number of selected candidates.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Manpower Estimation Formula",
        formula: "\\text{Net Requirement} = \\text{Workload Analysis (Needed)} - \\text{Workforce Analysis (Available)}",
        symbols: "Workload vs Workforce",
        siUnits: "Staff headcounts",
        applicationCondition: "Human resource planning",
      },
      {
        name: "Aptitude vs Trade Test",
        formula: "\\text{Aptitude: Future Potential to Learn New Skills} \\quad | \\quad \\text{Trade: Existing Current Proficiency}",
        symbols: "Testing typology",
        siUnits: "Assessment criteria",
        applicationCondition: "Employee testing selection",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">The Comprehensive Selection Process Pipeline</text>
  
  <!-- Step Circles Pipeline -->
  <g fill="#1e293b" strokeWidth="2">
    <!-- Step 1 -->
    <rect x="30" y="70" width="150" height="65" rx="8" stroke="#38bdf8"/>
    <text x="105" y="95" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">1. Preliminary</text>
    <text x="105" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="10">Screening (Filter)</text>
    
    <!-- Step 2 -->
    <rect x="210" y="70" width="150" height="65" rx="8" stroke="#10b981"/>
    <text x="285" y="95" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">2. Selection</text>
    <text x="285" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="10">Tests (IQ, Apt, Trade)</text>
    
    <!-- Step 3 -->
    <rect x="390" y="70" width="150" height="65" rx="8" stroke="#f59e0b"/>
    <text x="465" y="95" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">3. Employment</text>
    <text x="465" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="10">Interview (In-depth)</text>
    
    <!-- Step 4 -->
    <rect x="570" y="70" width="150" height="65" rx="8" stroke="#ec4899"/>
    <text x="645" y="95" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">4. Reference</text>
    <text x="645" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="10">&amp; Background Check</text>
    
    <!-- Step 5 -->
    <rect x="570" y="175" width="150" height="65" rx="8" stroke="#8b5cf6"/>
    <text x="645" y="200" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">5. Selection</text>
    <text x="645" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">Decision</text>
    
    <!-- Step 6 -->
    <rect x="390" y="175" width="150" height="65" rx="8" stroke="#3b82f6"/>
    <text x="465" y="200" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">6. Medical / Physical</text>
    <text x="465" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">Examination</text>
    
    <!-- Step 7 -->
    <rect x="210" y="175" width="150" height="65" rx="8" stroke="#10b981"/>
    <text x="285" y="200" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">7. Job Offer</text>
    <text x="285" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">(Letter of Appointment)</text>
    
    <!-- Step 8 -->
    <rect x="30" y="175" width="150" height="65" rx="8" stroke="#ef4444"/>
    <text x="105" y="200" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">8. Contract of</text>
    <text x="105" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">Employment Signed</text>
  </g>
  
  <!-- Flow Lines -->
  <line x1="180" y1="102" x2="210" y2="102" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="360" y1="102" x2="390" y2="102" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="540" y1="102" x2="570" y2="102" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="645" y1="135" x2="645" y2="175" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="570" y1="207" x2="540" y2="207" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="390" y1="207" x2="360" y2="207" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="210" y1="207" x2="180" y2="207" stroke="#94a3b8" strokeWidth="2"/>
</svg>`,
    workedExamples: [
      {
        id: "bst_u6_t1_we1",
        questionNumber: 1,
        question: "A manufacturing enterprise installs expensive computerized CNC machinery worth ₹10 crores. The company sets up a specialized classroom replica away from the factory floor equipped with duplicate controls where trainees practice operating the machinery without damaging production line equipment. Which training method is being used?",
        options: [
          { id: "A", text: "Apprenticeship Training" },
          { id: "B", text: "Vestibule Training" },
          { id: "C", text: "Internship Training" },
          { id: "D", text: "Job Rotation" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The training is conducted away from the actual factory floor in a mock environment using duplicate dummy equipment.",
          "Step 2: **Vestibule Training** is specifically designed for situations where employees need to learn handling sophisticated and expensive machinery on duplicates before touching real equipment.",
          "Step 3: Option B is correct.",
        ],
      },
      {
        id: "bst_u6_t1_we2",
        questionNumber: 2,
        question: "Which selection test is administered to evaluate a candidate's capacity or future potential for learning new technical skills, as opposed to testing his existing proficiency?",
        options: [
          { id: "A", text: "Trade Test" },
          { id: "B", text: "Aptitude Test" },
          { id: "C", text: "Personality Test" },
          { id: "D", text: "Interest Test" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Trade tests measure current existing proficiency and technical knowledge already possessed.",
          "Step 2: An **Aptitude Test** measures an individual's potential or latent capacity to learn new skills and adapt to new technologies.",
          "Step 3: Option B is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Selection Tests Differentiation",
        frequency: "Very High",
        typicalStem: "A test designed to measure the existing technical skills of an applicant is called a ______ test, while a test measuring potential to learn new skills is called an ______ test.",
        strategy: "Trade test (existing); Aptitude test (future potential).",
      },
      {
        patternType: "Workload vs Workforce Analysis",
        frequency: "High",
        typicalStem: "In staffing, finding out the number and types of employees available within the enterprise is called:",
        strategy: "Workforce Analysis (Workload = needed; Workforce = available).",
      },
    ],
    commonTraps: [
      {
        concept: "Recruitment vs Selection Process Nature",
        misconception: "Calling selection a positive process.",
        correctUnderstanding: "Recruitment is a **positive process** (attracts as many applicants as possible). Selection is a **negative process** (screens out and rejects unsuitable candidates).",
      },
      {
        concept: "Vestibule Training Location",
        misconception: "Classifying vestibule training as an on-the-job training method.",
        correctUnderstanding: "Vestibule training is an **OFF-THE-JOB method** because it is conducted away from the actual factory floor on dummy equipment.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Test Dual Cues",
        mnemonic: "Trade = Today (existing skill). Aptitude = Ahead (future potential).",
        explanation: "Never confuse trade test with aptitude test.",
      },
    ],
    quickRevisionCard: {
      title: "Staffing — High-Yield Cheat Sheet",
      bulletPoints: [
        "Workload Analysis: Number and types needed. Workforce Analysis: Number available.",
        "Internal Recruitment: Transfers (horizontal), Promotions (vertical); Economical but causes inbreeding.",
        "External: Campus recruitment, Job portals, Placement agencies, Factory gate.",
        "Selection is a NEGATIVE process (rejections > selections).",
        "Aptitude Test: Future potential to learn. Trade Test: Existing current proficiency.",
        "Apprenticeship: Training under master craftsman (electricians, plumbers).",
        "Internship: Joint partnership between educational institute and business enterprise.",
        "Vestibule Training: OFF-THE-JOB training on duplicate dummy equipment.",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u6_t1_q1",
        question: "The analysis undertaken in the staffing process to determine the number and type of human resources required to achieve organizational goals is called:",
        options: [
          { id: "A", text: "Workforce Analysis" },
          { id: "B", text: "Workload Analysis" },
          { id: "C", text: "Job Description" },
          { id: "D", text: "Performance Appraisal" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Workload analysis determines the number and types of human resources necessary for the performance of various jobs, whereas workforce analysis reveals the staff already on hand.",
      },
      {
        id: "bst_u6_t1_q2",
        question: "Recruitment is considered a 'Positive Process' whereas Selection is considered a 'Negative Process' because:",
        options: [
          { id: "A", text: "Recruitment stimulates people to apply, while selection screens out and rejects candidates" },
          { id: "B", text: "Recruitment costs more than selection" },
          { id: "C", text: "Recruitment is done by external consultants only" },
          { id: "D", text: "Selection leads to poor employee morale" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Recruitment creates a large pool of applicants (positive); selection narrows this pool by screening out and eliminating applicants (negative).",
      },
      {
        id: "bst_u6_t1_q3",
        question: "Which selection test measures an individual's potential or capacity for learning new technical skills?",
        options: [
          { id: "A", text: "Trade Test" },
          { id: "B", text: "Aptitude Test" },
          { id: "C", text: "Personality Test" },
          { id: "D", text: "Intelligence Test" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Aptitude tests measure the latent potential and ability of an individual to acquire new skills.",
      },
      {
        id: "bst_u6_t1_q4",
        question: "Vestibule Training is classified as:",
        options: [
          { id: "A", text: "An On-the-job training method" },
          { id: "B", text: "An Off-the-job training method using duplicate equipment" },
          { id: "C", text: "An informal coaching technique" },
          { id: "D", text: "An executive mentorship programme" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Vestibule training is an off-the-job method where actual work conditions are simulated using duplicate equipment in a classroom away from the shop floor.",
      },
      {
        id: "bst_u6_t1_q5",
        question: "Which internal source of recruitment involves horizontal shifting of an employee across departments without a major change in status or pay?",
        options: [
          { id: "A", text: "Promotion" },
          { id: "B", text: "Transfer" },
          { id: "C", text: "Demotion" },
          { id: "D", text: "Deputation" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A transfer is a lateral/horizontal movement of an employee involving shifting from one job to another or one department to another with no substantial change in rank or pay.",
      },
      {
        id: "bst_u6_t1_q6",
        question: "Under which training method does a trainee work under the direct guidance of a master craftsman for a prescribed period to learn a skilled craft?",
        options: [
          { id: "A", text: "Internship Training" },
          { id: "B", text: "Apprenticeship Training" },
          { id: "C", text: "Job Rotation" },
          { id: "D", text: "Vestibule Training" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Apprenticeship programmes put the trainee under the guidance of a master worker, commonly used in technical vocations like electricians, mechanics, and plumbers.",
      },
      {
        id: "bst_u6_t1_q7",
        question: "A joint training arrangement between educational institutions and business enterprises to impart both theoretical and practical business exposure is known as:",
        options: [
          { id: "A", text: "Apprenticeship Training" },
          { id: "B", text: "Internship Training" },
          { id: "C", text: "Vestibule Training" },
          { id: "D", text: "Case Study Method" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Internship training is a collaborative scheme wherein professional institutes and business firms jointly train students to bridge academia and industry.",
      },
      {
        id: "bst_u6_t1_q8",
        question: "A major drawback of relying exclusively on internal sources of recruitment is:",
        options: [
          { id: "A", text: "High cost of hiring" },
          { id: "B", text: "Inbreeding and denial of entry to fresh, innovative talent" },
          { id: "C", text: "Prolonged induction training required" },
          { id: "D", text: "Violates trade union agreements" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Over-reliance on internal sources shuts the door to fresh external talent ('inbreeding') and reduces competitive zeal among employees.",
      },
      {
        id: "bst_u6_t1_q9",
        question: "In the selection process, which step immediately follows the Employment Interview?",
        options: [
          { id: "A", text: "Preliminary Screening" },
          { id: "B", text: "Reference and Background Checks" },
          { id: "C", text: "Medical Examination" },
          { id: "D", text: "Contract of Employment" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "After a successful employment interview, the company conducts reference and background checks by contacting referees provided by the candidate.",
      },
      {
        id: "bst_u6_t1_q10",
        question: "Which external source of recruitment is most suitable for recruiting top-level and middle-level senior executives?",
        options: [
          { id: "A", text: "Direct Recruitment at Factory Gate" },
          { id: "B", text: "Employment Exchanges" },
          { id: "C", text: "Placement Agencies and Management Consultants (Headhunters)" },
          { id: "D", text: "Labour Contractors" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Management consultants and professional placement agencies specialize in executive headhunting for senior and middle managerial positions.",
      },
    ],
  },

  // Unit 7: Supervision, Motivation (Maslow), Leadership Styles, Communication
  {
    id: "bst_u7_t1",
    slug: "supervision-motivation-maslow-leadership-styles-communication",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 7,
    unitTitle: "Directing",
    topicTitle: "Supervision, Motivation (Maslow), Leadership Styles, Communication",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Principles and Functions of Management",
      chapterNumber: 7,
      chapterName: "Directing",
      sections: [
        "7.1 Directing: Concept, Importance, Principles (Maximum individual contribution, Harmony of objectives, Unity of command, Direct supervision)",
        "7.2 Elements of Directing: Supervision, Motivation, Leadership, Communication",
        "7.3 Motivation: Maslow's Need Hierarchy Theory (5 Levels: Physiological, Safety, Affiliation/Social, Esteem, Self-Actualisation)",
        "7.4 Financial Incentives (Pay, Bonus, Profit sharing, Co-partnership) vs Non-Financial Incentives (Status, Career advancement, Job security, Employee recognition)",
        "7.5 Leadership Styles: Autocratic/Authoritarian, Democratic/Participative, Laissez-faire / Free-rein",
        "7.6 Communication: Formal vs Informal (Grapevine: Single strand, Gossip, Probability, Cluster), Barriers to Communication (Semantic, Psychological, Organisational, Personal)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (6-8 questions per shift)",
      totalPyqsInRepo: 255,
      weightagePercentage: 11,
    },
    summary30Seconds: [
      "Directing initiates action in an organisation. Its 4 core elements are Supervision, Motivation, Leadership, and Communication.",
      "Maslow's 5-tier Hierarchy of Needs: Physiological $\\to$ Safety/Security $\\to$ Social/Affiliation $\\to$ Esteem $\\to$ Self-Actualisation (highest). A satisfied need no longer motivates.",
      "Leadership Styles: Autocratic (leader gives orders, centralized), Democratic (consultative, group consensus), Laissez-faire (complete freedom to subordinates). Communication Barriers: Semantic (faulty translations, jargon), Psychological (premature evaluation, lack of attention), Organisational, Personal.",
    ],
    coreConcepts: [
      {
        title: "Maslow's Need Hierarchy Theory & Incentives",
        content: `**Abraham Maslow's Need Hierarchy Theory (1943)**:
Human needs are structured in a hierarchical pyramid. A person moves up only after lower needs are reasonably satisfied:
1. **Basic Physiological Needs**: Fundamental survival requirements (hunger, thirst, shelter, clothing). *Workplace equivalent: Basic pay/salary*.
2. **Safety and Security Needs**: Protection from physical danger, economic security, illness. *Workplace equivalent: Job security, pension plan, provident fund*.
3. **Affiliation / Social / Belongingness Needs**: Affection, friendship, acceptance, social interaction. *Workplace equivalent: Cordial peer relations, team cohesion*.
4. **Esteem Needs**: Self-respect, autonomy, status, recognition, prestige. *Workplace equivalent: Job title, promotion, recognition awards*.
5. **Self-Actualisation Needs**: Highest-level need; the drive to realize one's full creative potential ('what a man can be, he must be'). *Workplace equivalent: Growth opportunities, challenging assignments*.

**Incentives: Financial vs Non-Financial**:
- **Financial (Monetary)**: Pay and allowances, Productivity-linked wage incentives, **Bonus**, Profit Sharing, **Co-partnership / Stock Options (ESOPs)**, Retirement benefits.
- **Non-Financial (Psychological/Social)**:
  - *Status*: Official rank, perquisites.
  - *Organisational Climate*: Healthy working atmosphere.
  - *Career Advancement Opportunity*: Skill upgrade training and promotions.
  - *Job Enrichment*: Designing jobs with variety, responsibility, and autonomy.
  - *Job Security*: Stability of tenure.
  - *Employee Recognition Programmes*: Public praise, mementos.
  - *Employee Participation & Empowerment*.`,
        ncertPointers: [
          "A satisfied need can no longer motivate a person; only the next higher level need can act as a motivator.",
          "ESOP (Employee Stock Option Plan) offers shares at a price lower than market price, creating a sense of ownership.",
        ],
      },
      {
        title: "Leadership Styles: Autocratic, Democratic & Laissez-Faire",
        content: `**1. Autocratic / Authoritarian Leadership ($A \\to B, C, D$)**:
- Leader issues orders and expects unquestioning obedience; centralized decision-making.
- One-way downward communication; dogmatic and task-oriented.
- *Suitability*: Urgent crisis situations, uneducated/unskilled workforce where fast decision-making is vital.
- *Drawback*: Suppresses employee initiative, causes frustration and high turnover.

**2. Democratic / Participative Leadership ($A \\leftrightarrow B, C, D$)**:
- Leader consults subordinates, encourages participation, and decides by group consensus.
- Two-way interactive communication; fosters high team morale and ownership.
- *Suitability*: Skilled, professional workforce where creative problem-solving is needed.
- *Drawback*: Can be time-consuming and delay urgent actions.

**3. Laissez-Faire / Free-Rein Leadership**:
- Leader gives complete autonomy to subordinates; does not intervene in operational decisions.
- Group members establish own goals and resolve problems independently; leader acts merely as an outside resource liaison.
- *Suitability*: Highly specialized, motivated, self-driven research scientists or experts.`,
        ncertPointers: [
          "Leadership is the process of influencing the behavior of people by making them strive voluntarily towards organizational goals.",
        ],
      },
      {
        title: "Communication Barriers & Informal Grapevine",
        content: `**Four Major Barriers to Communication**:
1. **Semantic Barriers (Language & Coding issues)**:
   - Badly expressed message, symbols with different meanings, faulty translations, unclarified assumptions, **technical jargon** (specialized terminology incomprehensible to laypersons), body language mismatch.
2. **Psychological / Emotional Barriers**:
   - **Premature evaluation** (forming judgment before sender finishes), lack of attention, loss by transmission and poor retention, **distrust** between parties.
3. **Organisational Barriers**:
   - Organisational policy, rigid rules and regulations, status consciousness (hierarchy distance), complex organizational facilities.
4. **Personal Barriers**:
   - Fear of challenge to authority, lack of confidence in subordinates, unwillingness to communicate, lack of proper incentives.

**Informal Communication (The Grapevine)**:
Communication arising out of social interaction, bypassing formal hierarchical channels:
- *Grapevine Networks*: Single Strand, Gossip (one tells all), Probability (random), **Cluster Network** (one communicates to trusted individuals who each share with other trusted friends—most common).`,
        ncertPointers: [
          "Grapevine spreads information with lightning speed but carries distorted rumors; managers should use it constructively to gauge employee sentiments.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Maslow's 5-Tier Hierarchy Progression",
        formula: "\\text{Physiological} \\to \\text{Safety} \\to \\text{Social} \\to \\text{Esteem} \\to \\text{Self-Actualisation}",
        symbols: "Hierarchical need pyramid",
        siUnits: "Ascending order of satisfaction",
        applicationCondition: "Employee motivation analysis",
      },
      {
        name: "Three Leadership Archetypes",
        formula: "\\text{Autocratic: Order-driven} \\quad | \\quad \\text{Democratic: Participative} \\quad | \\quad \\text{Free-rein: Complete Autonomy}",
        symbols: "Leadership behavioral styles",
        siUnits: "Managerial orientation",
        applicationCondition: "Leadership style identification",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Maslow's Hierarchy of Needs Pyramid (Individual vs Workplace Equivalents)</text>
  
  <!-- Pyramid Levels (Top to Bottom) -->
  <!-- Level 5: Self-Actualisation -->
  <polygon points="380,60 310,105 450,105" fill="#f43f5e" fillOpacity="0.8"/>
  <text x="380" y="90" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">5. Self-Actualisation</text>
  
  <!-- Level 4: Esteem Needs -->
  <polygon points="310,105 450,105 490,150 270,150" fill="#f59e0b" fillOpacity="0.8"/>
  <text x="380" y="132" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">4. Esteem Needs (Prestige, Titles)</text>
  
  <!-- Level 3: Social / Affiliation -->
  <polygon points="270,150 490,150 530,195 230,195" fill="#10b981" fillOpacity="0.8"/>
  <text x="380" y="177" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">3. Social / Affiliation (Friendship, Belonging)</text>
  
  <!-- Level 2: Safety & Security -->
  <polygon points="230,195 530,195 570,240 190,240" fill="#3b82f6" fillOpacity="0.8"/>
  <text x="380" y="222" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">2. Safety &amp; Security (Job Security, Pension)</text>
  
  <!-- Level 1: Basic Physiological -->
  <polygon points="190,240 570,240 610,280 150,280" fill="#6366f1" fillOpacity="0.8"/>
  <text x="380" y="265" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">1. Basic Physiological Needs (Salary, Food, Shelter)</text>
  
  <!-- Arrow Indicator -->
  <path d="M 660,270 L 660,80" stroke="#38bdf8" strokeWidth="3" marker-end="url(#arrow)"/>
  <text x="670" y="180" fill="#38bdf8" fontSize="11" fontWeight="bold" transform="rotate(90 670 180)">Progression Direction</text>
</svg>`,
    workedExamples: [
      {
        id: "bst_u7_t1_we1",
        questionNumber: 1,
        question: "A company offers its senior software engineers Employee Stock Option Plans (ESOPs) allowing them to purchase company equity shares at a discounted price below the prevailing market price. Which type of financial incentive is illustrated here?",
        options: [
          { id: "A", text: "Productivity-linked wage incentive" },
          { id: "B", text: "Co-partnership / Stock Option" },
          { id: "C", text: "Perquisite" },
          { id: "D", text: "Profit Sharing" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Under Co-partnership / Stock Option schemes, employees are offered company shares at a pre-determined price lower than market value.",
          "Step 2: This creates a feeling of ownership among employees and motivates them to contribute towards company growth.",
          "Step 3: Option B is exact.",
        ],
      },
      {
        id: "bst_u7_t1_we2",
        questionNumber: 2,
        question: "A production manager frequently uses technical engineering terms and complex jargon while addressing factory shop-floor workers, who fail to understand the core instructions. Which communication barrier is responsible for this breakdown?",
        options: [
          { id: "A", text: "Psychological Barrier" },
          { id: "B", text: "Semantic Barrier" },
          { id: "C", text: "Organisational Barrier" },
          { id: "D", text: "Personal Barrier" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Semantic barriers relate to the encoding and decoding of messages into words or symbols.",
          "Step 2: The use of technical jargon that is unfamiliar or incomprehensible to workers is a classic **Semantic Barrier**.",
          "Step 3: Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Maslow Level Matching",
        frequency: "Very High",
        typicalStem: "A stable job with a pension scheme satisfies which level of need in Maslow's hierarchy?",
        strategy: "Safety and Security Needs.",
      },
      {
        patternType: "Communication Barrier Category Matching",
        frequency: "High",
        typicalStem: "'Premature evaluation' and 'Lack of attention' belong to which category of communication barriers?",
        strategy: "Psychological Barriers.",
      },
    ],
    commonTraps: [
      {
        concept: "Technical Jargon Classification",
        misconception: "Classifying technical jargon as an organizational or personal barrier.",
        correctUnderstanding: "Technical jargon relates to language and word encoding $\\implies$ **Semantic Barrier**.",
      },
      {
        concept: "Maslow Progression Order",
        misconception: "Thinking higher-order needs can motivate before lower-order needs are satisfied.",
        correctUnderstanding: "According to Maslow, needs are satisfied in strict bottom-up order; a higher-level need cannot act as an active motivator until lower-order needs are substantially fulfilled.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Maslow's Pyramid",
        mnemonic: "P-S-S-E-S: Physiological $\\to$ Safety $\\to$ Social $\\to$ Esteem $\\to$ Self-Actualisation.",
        explanation: "Never mismatch the 5 levels of the motivation pyramid.",
      },
    ],
    quickRevisionCard: {
      title: "Directing — High-Yield Cheat Sheet",
      bulletPoints: [
        "Directing initiates action; elements: Supervision, Motivation, Leadership, Communication.",
        "Maslow's Hierarchy: Physiological $\\to$ Safety $\\to$ Social $\\to$ Esteem $\\to$ Self-Actualisation.",
        "A satisfied need ceases to motivate; next higher level activates.",
        "Financial: Pay, Bonus, Profit-sharing, Co-partnership/ESOP.",
        "Non-Financial: Status, Job security, Career advancement, Recognition.",
        "Autocratic (centralized orders), Democratic (consultative), Laissez-faire (complete autonomy).",
        "Semantic barriers: Technical jargon, faulty translations, symbols with multiple meanings.",
        "Psychological barriers: Premature evaluation, distrust, inattention.",
        "Grapevine: Informal communication network (Cluster pattern is most common).",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u7_t1_q1",
        question: "According to Abraham Maslow's Need Hierarchy Theory, which need is placed at the topmost pinnacle of the hierarchy?",
        options: [
          { id: "A", text: "Esteem Needs" },
          { id: "B", text: "Safety Needs" },
          { id: "C", text: "Self-Actualisation Needs" },
          { id: "D", text: "Social Needs" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Self-actualisation is the highest level of need in Maslow's pyramid, referring to the drive to become what one is capable of becoming.",
      },
      {
        id: "bst_u7_t1_q2",
        question: "Offering company shares to employees at a set price below the market price is called:",
        options: [
          { id: "A", text: "Profit Sharing" },
          { id: "B", text: "Co-partnership / Stock Option (ESOP)" },
          { id: "C", text: "Bonus" },
          { id: "D", text: "Productivity Incentive" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under co-partnership / stock option schemes, employees are offered company shares at a set price below market price to build ownership loyalty.",
      },
      {
        id: "bst_u7_t1_q3",
        question: "A leadership style where the leader makes all decisions unilaterally and gives instructions without consulting subordinates is called:",
        options: [
          { id: "A", text: "Democratic Style" },
          { id: "B", text: "Autocratic / Authoritarian Style" },
          { id: "C", text: "Laissez-faire Style" },
          { id: "D", text: "Paternalistic Style" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "An autocratic leader centralizes all authority, gives orders, and expects unquestioned compliance without seeking subordinate consultation.",
      },
      {
        id: "bst_u7_t1_q4",
        question: "Use of specialized technical terminology and abbreviations by a specialist that cannot be understood by non-specialist workers creates a:",
        options: [
          { id: "A", text: "Semantic Barrier" },
          { id: "B", text: "Psychological Barrier" },
          { id: "C", text: "Personal Barrier" },
          { id: "D", text: "Organisational Barrier" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Technical jargon falls under semantic barriers, which arise from problems in the language and symbols used to transmit information.",
      },
      {
        id: "bst_u7_t1_q5",
        question: "Evaluating the meaning of a message and jumping to a conclusion before the sender completes his communication is called:",
        options: [
          { id: "A", text: "Faulty Translation" },
          { id: "B", text: "Premature Evaluation" },
          { id: "C", text: "Lack of Attention" },
          { id: "D", text: "Distrust" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Premature evaluation is a psychological barrier where the receiver prematurely forms a judgment before receiving the entire message.",
      },
      {
        id: "bst_u7_t1_q6",
        question: "Job security, stable employment contracts, and pension funds fulfill which level of needs in Maslow's theory?",
        options: [
          { id: "A", text: "Basic Physiological Needs" },
          { id: "B", text: "Safety and Security Needs" },
          { id: "C", text: "Affiliation Needs" },
          { id: "D", text: "Self-Actualisation Needs" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Safety and security needs provide protection from physical dangers and economic risks like loss of employment, illness, and old age.",
      },
      {
        id: "bst_u7_t1_q7",
        question: "In an informal grapevine communication network, when an individual communicates information only to those people he trusts, who in turn share it with other trusted colleagues, the pattern is known as:",
        options: [
          { id: "A", text: "Single Strand Network" },
          { id: "B", text: "Gossip Network" },
          { id: "C", text: "Cluster Network" },
          { id: "D", text: "Probability Network" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "In a cluster network, an individual tells information selected to his trusted circle, who in turn selectively relay it to others; this is the most common informal pattern.",
      },
      {
        id: "bst_u7_t1_q8",
        question: "A leadership style where the leader gives complete freedom to subordinates to set goals and solve problems on their own is known as:",
        options: [
          { id: "A", text: "Laissez-faire / Free-rein Leadership" },
          { id: "B", text: "Democratic Leadership" },
          { id: "C", text: "Autocratic Leadership" },
          { id: "D", text: "Bureaucratic Leadership" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A free-rein or laissez-faire leader does not exert authority, leaves decisions entirely to group members, and supports them only when requested.",
      },
      {
        id: "bst_u7_t1_q9",
        question: "Which of the following is a non-financial incentive?",
        options: [
          { id: "A", text: "Bonus" },
          { id: "B", text: "Retirement benefits" },
          { id: "C", text: "Job Enrichment" },
          { id: "D", text: "Commission" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Job enrichment is a psychological non-financial incentive that designs jobs with greater variety, autonomy, and responsibility.",
      },
      {
        id: "bst_u7_t1_q10",
        question: "Directing is considered the heart of the management process because:",
        options: [
          { id: "A", text: "It initiates actual work performance and converts plans into real output" },
          { id: "B", text: "It prepares financial budgets" },
          { id: "C", text: "It replaces controlling completely" },
          { id: "D", text: "It is required only at the top management level" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "While other functions prepare the setting (planning, organising, staffing), directing initiates actual operational action in an enterprise.",
      },
    ],
  },

  // Unit 8: Controlling Process, Relationship between Planning and Controlling
  {
    id: "bst_u8_t1",
    slug: "controlling-process-relationship-between-planning-and-controlling",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 8,
    unitTitle: "Controlling",
    topicTitle: "Controlling Process, Relationship between Planning and Controlling",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Principles and Functions of Management",
      chapterNumber: 8,
      chapterName: "Controlling",
      sections: [
        "8.1 Controlling: Meaning, Importance (Accomplishing goals, Judging accuracy of standards, Efficient resource use, Improving employee motivation, Ensuring order)",
        "8.2 Relationship between Planning and Controlling ('Planning is backward-looking as well as forward-looking; Controlling is backward-looking as well as forward-looking')",
        "8.3 Controlling Process: 5 Sequential Steps (Setting performance standards, Measurement of actual performance, Comparison, Analysing deviations: Critical Point Control & Management by Exception, Taking corrective action)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-5 questions per shift)",
      totalPyqsInRepo: 180,
      weightagePercentage: 8,
    },
    summary30Seconds: [
      "Controlling is the process of comparing actual performance with planned standards, finding deviations, and taking corrective actions. It ensures activities conform to plans.",
      "Planning and Controlling are Siamese twins of management: Planning without controlling is meaningless; Controlling without planning is blind. Both are forward-looking AND backward-looking.",
      "Analysing Deviations: Critical Point Control (CPC - focus on Key Result Areas / KRAs); Management by Exception (MBE - 'an attempt to control everything results in controlling nothing'; only significant deviations beyond permissible limits are reported to top management).",
    ],
    coreConcepts: [
      {
        title: "The 5 Steps in the Controlling Process",
        content: `Controlling is a systematic 5-step feedback cycle:
1. **Setting Performance Standards**:
   - Standards are benchmarks against which actual performance is measured.
   - Can be quantitative (output units, revenue, cost per unit) or qualitative (customer satisfaction, goodwill).
2. **Measurement of Actual Performance**:
   - Performance should be measured in the same units as standards.
   - Methods: Personal observation, sample checking, statistical performance reports.
3. **Comparison of Actual Performance with Standards**:
   - Reveals the gap or deviation between target and reality ($Deviation = \\text{Actual} - \\text{Standard}$).
4. **Analysing Deviations**:
   - Minor deviations are acceptable; focusing on every trivial difference wastes management time.
   - Two vital managerial techniques:
     - **Critical Point Control (CPC)**: Focuses managerial attention on **Key Result Areas (KRAs)** that are critical to the success of an organization. (e.g. an increase in labor cost by 5% is more critical than a 15% increase in postal charges).
     - **Management by Exception (MBE)**: Based on the principle that **'an attempt to control everything results in controlling nothing'**. Only significant deviations that cross the pre-set acceptable tolerance band are escalated to top management.
5. **Taking Corrective Action**:
   - Required when deviations exceed permissible limits. Examples: Repairing defective machines, training workers, hiring additional personnel, modifying unreasonable standards.`,
        ncertPointers: [
          "Management by Exception saves managerial time, concentrates effort on key problems, and delegates routine issues.",
        ],
      },
      {
        title: "Interdependence: Planning vs Controlling",
        content: `**Planning and Controlling are Inseparable**:
- **Planning without Controlling is Meaningless**: If there is no controlling, nobody checks whether plans are implemented or targets achieved; plans remain paper exercises.
- **Controlling without Planning is Blind**: Controlling compares actual performance against standards. If there are no standards established by planning, a manager has nothing to measure against.

**Are Planning and Controlling Forward-Looking or Backward-Looking?**:
- **Planning is Forward-Looking**: Formulates future forecasts and plans.
- **Planning is Backward-Looking**: Based on past performance feedback, past failures, and historical data.
- **Controlling is Backward-Looking**: Looks back like a rearview mirror to evaluate past performance against past standards.
- **Controlling is Forward-Looking**: Corrective actions taken today prevent future deviations; feeds updated data into the next planning cycle.
*Conclusion*: Both planning and controlling are **both forward-looking and backward-looking**!`,
        ncertPointers: [
          "Controlling is not the end of the management process; taking corrective action initiates the next round of planning.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Deviation Analysis Principles",
        formula: "\\text{Critical Point Control: Focus on KRAs} \\quad | \\quad \\text{Management by Exception: Escalate Only Significant Outliers}",
        symbols: "CPC vs MBE",
        siUnits: "Control techniques",
        applicationCondition: "Managerial deviation screening",
      },
      {
        name: "Planning-Controlling Duality",
        formula: "\\text{Planning without Controlling is Meaningless} \\quad \\& \\quad \\text{Controlling without Planning is Blind}",
        symbols: "Functional interdependence",
        siUnits: "Theoretical relationship",
        applicationCondition: "Managerial coordination",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">The 5-Step Continuous Controlling Cycle</text>
  
  <!-- Step Circles in Flow -->
  <g fill="#1e293b" strokeWidth="2">
    <!-- Step 1 -->
    <rect x="40" y="80" width="180" height="55" rx="8" stroke="#38bdf8"/>
    <text x="130" y="105" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">1. Setting Standards</text>
    <text x="130" y="123" textAnchor="middle" fill="#94a3b8" fontSize="10">Target Benchmarks</text>
    
    <!-- Step 2 -->
    <rect x="290" y="80" width="180" height="55" rx="8" stroke="#10b981"/>
    <text x="380" y="105" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">2. Measuring Actual</text>
    <text x="380" y="123" textAnchor="middle" fill="#94a3b8" fontSize="10">Performance Data</text>
    
    <!-- Step 3 -->
    <rect x="540" y="80" width="180" height="55" rx="8" stroke="#f59e0b"/>
    <text x="630" y="105" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">3. Comparing Actual</text>
    <text x="630" y="123" textAnchor="middle" fill="#94a3b8" fontSize="10">with Standards</text>
    
    <!-- Step 4 -->
    <rect x="540" y="195" width="180" height="65" rx="8" stroke="#ec4899"/>
    <text x="630" y="218" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">4. Analysing Deviations</text>
    <text x="630" y="235" textAnchor="middle" fill="#cbd5e1" fontSize="10">CPC (KRAs) &amp; MBE</text>
    
    <!-- Step 5 -->
    <rect x="290" y="195" width="180" height="65" rx="8" stroke="#ef4444"/>
    <text x="380" y="218" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">5. Corrective Action</text>
    <text x="380" y="235" textAnchor="middle" fill="#cbd5e1" fontSize="10">Fix Cause of Deviation</text>
  </g>
  
  <!-- Flow Lines -->
  <line x1="220" y1="107" x2="290" y2="107" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="470" y1="107" x2="540" y2="107" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="630" y1="135" x2="630" y2="195" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="540" y1="227" x2="470" y2="227" stroke="#94a3b8" strokeWidth="2"/>
  
  <!-- Feedback loop to step 1 -->
  <path d="M 290,227 L 130,227 L 130,135" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4"/>
  <text x="110" y="180" textAnchor="middle" fill="#38bdf8" fontSize="10" transform="rotate(-90 110 180)">Feedback Loop</text>
</svg>`,
    workedExamples: [
      {
        id: "bst_u8_t1_we1",
        questionNumber: 1,
        question: "In a car assembly plant, production cost per vehicle increases by ₹50 due to a rise in postage and courier charges, whereas cost per vehicle increases by ₹500 due to defective robotic welding machines. The General Manager directs his engineering team to focus entirely on the robotic welding problem while ignoring the postal charge increase. Which control technique is applied here?",
        options: [
          { id: "A", text: "Management by Exception (MBE)" },
          { id: "B", text: "Critical Point Control (CPC)" },
          { id: "C", text: "Zero-based Budgeting" },
          { id: "D", text: "Direct Supervision" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The manager focuses on Key Result Areas (KRAs) that have a critical impact on operational performance and cost structures.",
          "Step 2: **Critical Point Control (CPC)** asserts that management should focus on key points that are critical to the success of an enterprise, rather than spreading attention across minor cost variations.",
          "Step 3: Option B is correct.",
        ],
      },
      {
        id: "bst_u8_t1_we2",
        questionNumber: 2,
        question: "A company sets an allowable tolerance range of ±2% in defect rates. If defective output in a batch is 1.5%, the supervisor handles it locally without alerting senior executives. But when defective output reaches 6%, an urgent alert is escalated to the Chief Operations Officer. This control philosophy is known as:",
        options: [
          { id: "A", text: "Critical Point Control" },
          { id: "B", text: "Management by Exception" },
          { id: "C", text: "Unity of Direction" },
          { id: "D", text: "Span of Control" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The principle states that minor routine deviations within permissible tolerance limits need not be reported to top management.",
          "Step 2: Only exceptional, major deviations that exceed acceptable limits are escalated to senior executives ('An attempt to control everything results in controlling nothing').",
          "Step 3: This is **Management by Exception (MBE)**. Option B is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Management by Exception Maxim",
        frequency: "Very High",
        typicalStem: "'An attempt to control everything results in controlling nothing' is the underlying philosophy of:",
        strategy: "Management by Exception (MBE).",
      },
      {
        patternType: "Planning-Controlling Directionality",
        frequency: "High",
        typicalStem: "Controlling is backward-looking because it evaluates past performance, but it is also forward-looking because:",
        strategy: "Corrective actions taken today prevent future deviations and improve future plans.",
      },
    ],
    commonTraps: [
      {
        concept: "CPC vs MBE Differentiation",
        misconception: "Using Critical Point Control and Management by Exception as identical synonyms.",
        correctUnderstanding: "**Critical Point Control (CPC)** = Focus on **Key Result Areas (KRAs)** (vital operational areas). **Management by Exception (MBE)** = Focus on **significant deviations beyond tolerance limits**.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Controlling 5 Steps",
        mnemonic: "S-M-C-A-C: Standards $\\to$ Measure $\\to$ Compare $\\to$ Analyse $\\to$ Correct.",
        explanation: "Flawless chronological recall for controlling process MCQs.",
      },
    ],
    quickRevisionCard: {
      title: "Controlling — High-Yield Cheat Sheet",
      bulletPoints: [
        "Controlling ensures activities conform to plans and benchmarks.",
        "5 Steps: Set Standards $\\to$ Measure Actual $\\to$ Compare $\\to$ Analyse Deviations $\\to$ Corrective Action.",
        "Planning without controlling is meaningless; Controlling without planning is blind.",
        "Planning & Controlling are BOTH forward-looking AND backward-looking.",
        "Critical Point Control (CPC): Focus on Key Result Areas (KRAs).",
        "Management by Exception (MBE): 'Controlling everything controls nothing'; Escalate only major outliers.",
        "Corrective action completes the loop and initiates the next planning phase.",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u8_t1_q1",
        question: "The principle of control which states that 'An attempt to control everything results in controlling nothing' is:",
        options: [
          { id: "A", text: "Critical Point Control" },
          { id: "B", text: "Management by Exception" },
          { id: "C", text: "Span of Management" },
          { id: "D", text: "Unity of Command" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Management by Exception is based on the belief that trying to control everything leads to controlling nothing; only significant deviations beyond tolerance limits should be brought to management's attention.",
      },
      {
        id: "bst_u8_t1_q2",
        question: "Focusing managerial control specifically on Key Result Areas (KRAs) that are critical to the overall success of an enterprise is known as:",
        options: [
          { id: "A", text: "Management by Exception" },
          { id: "B", text: "Critical Point Control" },
          { id: "C", text: "Management by Objectives" },
          { id: "D", text: "Delegation of Authority" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Critical Point Control focuses on key points or key result areas (KRAs) which are critical to the performance of an organization.",
      },
      {
        id: "bst_u8_t1_q3",
        question: "Why is controlling described as a 'Forward-Looking' function?",
        options: [
          { id: "A", text: "Because it audits transactions that occurred in the past" },
          { id: "B", text: "Because corrective actions taken under controlling prevent future deviations and improve future planning" },
          { id: "C", text: "Because it establishes original budgets" },
          { id: "D", text: "Because it deals only with capital expenditure" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Controlling is forward-looking because the corrective measures taken on the basis of past feedback guide future operations and prevent recurring errors.",
      },
      {
        id: "bst_u8_t1_q4",
        question: "The first step in the controlling process is:",
        options: [
          { id: "A", text: "Measurement of actual performance" },
          { id: "B", text: "Setting performance standards" },
          { id: "C", text: "Comparing performance with standards" },
          { id: "D", text: "Analysing deviations" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Setting performance standards is the foundational first step in the controlling process against which future performance is evaluated.",
      },
      {
        id: "bst_u8_t1_q5",
        question: "Controlling without planning is:",
        options: [
          { id: "A", text: "Blind" },
          { id: "B", text: "Meaningless" },
          { id: "C", text: "Efficient" },
          { id: "D", text: "Forward-looking" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Without planning, there are no predetermined standards or targets against which performance can be measured; hence controlling without planning is blind.",
      },
      {
        id: "bst_u8_t1_q6",
        question: "When actual performance exactly equals the pre-established standard:",
        options: [
          { id: "A", text: "Corrective action must be immediately initiated" },
          { id: "B", text: "Deviation is zero and no corrective action is required" },
          { id: "C", text: "Standards must be revised downwards" },
          { id: "D", text: "Management by exception is violated" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "When actual performance matches the standard, deviation is zero and the operation is functioning as planned.",
      },
      {
        id: "bst_u8_t1_q7",
        question: "Which of the following is NOT an advantage of Critical Point Control and Management by Exception?",
        options: [
          { id: "A", text: "Saves time and energy of senior managers" },
          { id: "B", text: "Focuses managerial attention on important problems" },
          { id: "C", text: "Guarantees complete elimination of all future business risks" },
          { id: "D", text: "Facilitates delegation of authority" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Control techniques optimize managerial efficiency and attention, but cannot eliminate dynamic external business risks.",
      },
      {
        id: "bst_u8_t1_q8",
        question: "Sample checking and personal observation are techniques used in which step of the controlling process?",
        options: [
          { id: "A", text: "Setting performance standards" },
          { id: "B", text: "Measurement of actual performance" },
          { id: "C", text: "Taking corrective action" },
          { id: "D", text: "Setting budget premises" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Sample checking, personal observation, and performance reports are used to gather data during the measurement of actual performance.",
      },
      {
        id: "bst_u8_t1_q9",
        question: "Planning and Controlling are described in management theory as:",
        options: [
          { id: "A", text: "Conflicting functions" },
          { id: "B", text: "Siamese twins of management" },
          { id: "C", text: "Independent, isolated functions" },
          { id: "D", text: "Strictly financial functions" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Planning and controlling are called the Siamese twins of management because they are inextricably linked and reinforce each other.",
      },
      {
        id: "bst_u8_t1_q10",
        question: "Taking corrective action in the controlling process involves:",
        options: [
          { id: "A", text: "Punishing all employees who committed mistakes" },
          { id: "B", text: "Identifying root causes of deviations and modifying operations or standards to eliminate future recurrence" },
          { id: "C", text: "Stopping all production activities permanently" },
          { id: "D", text: "Increasing consumer prices immediately" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Corrective action targets the root causes of unacceptable deviations (machinery breakdown, deficient training, material flaws) to restore performance.",
      },
    ],
  },
];
