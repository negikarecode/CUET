import { NoteDocument } from "@/types/notes";

export const bstUnits1to4Topics: NoteDocument[] = [
  // Unit 1: Management Concept, Objectives, Importance, Management as Science/Art/Profession, Coordination
  {
    id: "bst_u1_t1",
    slug: "management-concept-objectives-importance-management-as-science-art-profession-coordination",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 1,
    unitTitle: "Nature and Significance of Management",
    topicTitle: "Management Concept, Objectives, Importance, Management as Science/Art/Profession, Coordination",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Principles and Functions of Management",
      chapterNumber: 1,
      chapterName: "Nature and Significance of Management",
      sections: [
        "1.1 Concept of Management: Process, Effectiveness vs Efficiency",
        "1.2 Characteristics of Management (Goal-oriented, Pervasive, Multidimensional, Continuous, Group activity, Dynamic, Intangible)",
        "1.3 Objectives of Management: Organisational, Social, and Personal",
        "1.4 Nature of Management: Management as an Art, Science, and Inexact Profession",
        "1.5 Levels of Management: Top, Middle, and Supervisory/Operational",
        "1.6 Coordination: Essence of Management, Characteristics, and Importance",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-5 questions per shift)",
      totalPyqsInRepo: 195,
      weightagePercentage: 8,
    },
    summary30Seconds: [
      "Effectiveness means completing tasks on time (achieving end result); Efficiency means completing tasks with minimum cost and resource wastage.",
      "Management is multidimensional: Management of Work, Management of People, and Management of Operations. It is a full Art, an inexact/social Science, but not yet a full-fledged Profession (no statutory code of conduct or restricted entry).",
      "Coordination is the 'Essence of Management'—not a separate function, but the unifying thread synchronizing Planning, Organising, Staffing, Directing, and Controlling.",
    ],
    coreConcepts: [
      {
        title: "Effectiveness vs Efficiency & Multidimensional Nature",
        content: `**Core Distinction**:
- **Effectiveness**: Doing the right task, completing activities, and achieving goals **on time**. Focused purely on the end result regardless of cost.
- **Efficiency**: Doing the task correctly with **minimum cost**, minimum resource wastage, and optimum utilization of inputs. Focused on means/cost-benefit.
- *Ideal Management Goal*: High effectiveness paired with high efficiency.

**Management is Multidimensional**:
1. **Management of Work**: Translating organizational goals into actionable tasks, budgets, and problems to be solved.
2. **Management of People**: Managing employees as individuals with diverse needs and as collective workgroups; dealing with human behavior.
3. **Management of Operations**: Combining physical flow of inputs and technology with human labor to produce finished goods (links work with people).`,
        ncertPointers: [
          "Management is a dynamic function because it adapts goals and activities to changing political, economic, social, and technological environments.",
          "Management is an intangible force whose presence is felt through orderliness, satisfied employees, and target achievement.",
        ],
      },
      {
        title: "Management as Art, Science, and Profession",
        content: `**1. Management as an Art (Fully Satisfied)**:
- Existence of theoretical knowledge (principles, case studies).
- **Personalised application**: Every manager applies principles using their own unique personal style, intuition, and creativity.
- Based on practice and creativity.

**2. Management as a Science (Inexact / Social Science)**:
- Systematised body of knowledge: Uses scientific terminology, concepts, and principles.
- Principles based on experimentation and observation: Tested in real companies.
- **Lacks Universal Validity**: Unlike physical sciences (gravity), human behavior cannot be predicted with mathematical precision; management principles must be modified to suit specific cultural and organizational situations.

**3. Management as a Profession (Emerging / Inexact Profession)**:
- Well-defined body of knowledge: Yes (taught in IIMs, business schools).
- **Restricted Entry**: **NO**. Anyone can be appointed as a manager regardless of educational degree (unlike medicine with MBBS or law with LLB).
- **Professional Association**: Bodies like AIMA exist, but membership is **NOT legally mandatory**.
- **Statutory Code of Conduct**: No legally enforceable code of conduct.
- Motivated by profit rather than pure service motive.`,
        ncertPointers: [
          "Levels of Management: Top Level (lays down objectives, broad policies, coordinates departments); Middle Level (interprets policies, assigns duties, motivates supervisors); Operational/Supervisory Level (direct contact with workforce, quality control, worker safety).",
        ],
      },
      {
        title: "Coordination: The Essence of Management",
        content: `Coordination is the force that binds all other functions of management:
- It is **not a separate function**; it is the **essence of management** required at all steps:
  - In Planning: Harmonizing departmental master plans.
  - In Organising: Allocating resources and defining authority relationships.
  - In Staffing: Matching job specifications with appropriate personnel.
  - In Directing: Aligning individual instructions and leadership towards corporate goals.
  - In Controlling: Evaluating performance against synchronized benchmarks.

**Characteristics of Coordination**:
1. Integrates group effort (unifies diverse interests).
2. Ensures unity of action (acts as the binding force).
3. Continuous process (not a one-time activity).
4. All-pervasive function (needed at all levels and departments).
5. Responsibility of all managers (Top, Middle, First-line).
6. Deliberate function (cooperation without coordination leads to wasted effort; coordination without cooperation leads to dissatisfaction).`,
        ncertPointers: [
          "Three reasons why coordination is needed: 1. Growth in organizational size (integrating specialized departments), 2. Functional differentiation, 3. Specialization.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Effectiveness vs Efficiency Comparison",
        formula: "\\text{Effectiveness: On-Time Target Achievement} \\quad \\text{vs} \\quad \\text{Efficiency: Minimum Cost Resource Utilization}",
        symbols: "End Result vs Means/Cost",
        siUnits: "Managerial performance criteria",
        applicationCondition: "Managerial evaluation",
      },
      {
        name: "Three Levels of Management Roles",
        formula: "\\text{Top: Strategy \\& Policy} \\to \\text{Middle: Interpretation \\& Departmental Execution} \\to \\text{Operational: Supervision \\& Shop Floor}",
        symbols: "Hierarchy levels",
        siUnits: "Organizational tier",
        applicationCondition: "Authority-responsibility hierarchy",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Coordination: The Essence of Management Unifying All Five Functions</text>
  
  <!-- Central Coordination Circle -->
  <circle cx="380" cy="165" r="55" fill="#1e293b" stroke="#ec4899" strokeWidth="3"/>
  <text x="380" y="160" textAnchor="middle" fill="#f472b6" fontSize="13" fontWeight="bold">COORDINATION</text>
  <text x="380" y="180" textAnchor="middle" fill="#fca5a5" fontSize="10">The Essence</text>
  
  <!-- Surrounding Functions -->
  <g fill="#1e293b" strokeWidth="2">
    <!-- Planning -->
    <rect x="70" y="80" width="130" height="45" rx="8" stroke="#38bdf8"/>
    <text x="135" y="107" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">1. Planning</text>
    
    <!-- Organising -->
    <rect x="560" y="80" width="130" height="45" rx="8" stroke="#10b981"/>
    <text x="625" y="107" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">2. Organising</text>
    
    <!-- Staffing -->
    <rect x="70" y="200" width="130" height="45" rx="8" stroke="#f59e0b"/>
    <text x="135" y="227" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">3. Staffing</text>
    
    <!-- Directing -->
    <rect x="560" y="200" width="130" height="45" rx="8" stroke="#8b5cf6"/>
    <text x="625" y="227" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">4. Directing</text>
    
    <!-- Controlling -->
    <rect x="315" y="240" width="130" height="45" rx="8" stroke="#ef4444"/>
    <text x="380" y="267" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">5. Controlling</text>
  </g>
  
  <!-- Connecting Lines -->
  <line x1="200" y1="105" x2="330" y2="145" stroke="#475569" strokeWidth="2" strokeDasharray="3 3"/>
  <line x1="560" y1="105" x2="430" y2="145" stroke="#475569" strokeWidth="2" strokeDasharray="3 3"/>
  <line x1="200" y1="220" x2="330" y2="185" stroke="#475569" strokeWidth="2" strokeDasharray="3 3"/>
  <line x1="560" y1="220" x2="430" y2="185" stroke="#475569" strokeWidth="2" strokeDasharray="3 3"/>
  <line x1="380" y1="240" x2="380" y2="220" stroke="#475569" strokeWidth="2" strokeDasharray="3 3"/>
</svg>`,
    workedExamples: [
      {
        id: "bst_u1_t1_we1",
        questionNumber: 1,
        question: "A production manager was assigned a target to manufacture 1,000 units of mobile chargers within 10 days at a standard cost of ₹200 per unit. He completed the order within 10 days, but at a cost of ₹260 per unit due to hiring workers at double overtime rates. In this scenario, the manager was:",
        options: [
          { id: "A", text: "Effective but not efficient" },
          { id: "B", text: "Efficient but not effective" },
          { id: "C", text: "Both effective and efficient" },
          { id: "D", text: "Neither effective nor efficient" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: The manager produced the required 1,000 units within the 10-day deadline, fulfilling the end-target on time $\\implies$ He was **Effective**.",
          "Step 2: However, the cost per unit soared to ₹260 against the target of ₹200, wasting financial resources through expensive overtime $\\implies$ He was **Not Efficient**.",
          "Step 3: Hence, the manager was effective but not efficient. Option A is exact.",
        ],
      },
      {
        id: "bst_u1_t1_we2",
        questionNumber: 2,
        question: "Why is management considered an 'Inexact Science' rather than a pure natural science like Physics or Chemistry?",
        options: [
          { id: "A", text: "Because it lacks any systematised theoretical literature" },
          { id: "B", text: "Because its principles deal with human behaviour, which is dynamic and cannot be tested under laboratory conditions with absolute precision" },
          { id: "C", text: "Because management principles are universally invalid" },
          { id: "D", text: "Because anyone can practice management without formal certification" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Scientific principles in physics or chemistry have universal validity and replicate identically under controlled lab tests.",
          "Step 2: Management principles deal with human beings whose behavior is complex, unpredictable, and subject to environmental factors.",
          "Step 3: Therefore, management principles cannot produce fixed mathematical results, making management an inexact/social science. Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Management as Profession Feature Matching",
        frequency: "Very High",
        typicalStem: "Which of the following characteristics of a profession is currently NOT fully satisfied by management?",
        strategy: "Restricted Entry and Statutory Code of Conduct (anyone can become a manager without a specific license).",
      },
      {
        patternType: "Coordination Identity",
        frequency: "High",
        typicalStem: "Identify the force that synchronizes all departmental activities and is regarded as the essence of management.",
        strategy: "Coordination.",
      },
    ],
    commonTraps: [
      {
        concept: "Coordination as a Separate Function",
        misconception: "Treating coordination as the sixth function of management after controlling.",
        correctUnderstanding: "Coordination is NOT a distinct function; it is the **essence of management** embedded inside all five functions (POSDC).",
      },
      {
        concept: "Effectiveness vs Efficiency Inversion",
        misconception: "Saying completing work at lowest cost is effectiveness.",
        correctUnderstanding: "Lowest cost = Efficiency; Finishing on time = Effectiveness.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "5 Functions of Management",
        mnemonic: "POSDC: Planning, Organising, Staffing, Directing, Controlling.",
        explanation: "The standard Fayolian management functions.",
      },
    ],
    quickRevisionCard: {
      title: "Nature of Management — Quick Card",
      bulletPoints: [
        "Effectiveness: Completing task on time (goal attainment).",
        "Efficiency: Completing task with minimum cost and resource waste.",
        "Management is multidimensional: Work, People, and Operations.",
        "Management is a complete Art, an Inexact Science, and an Emerging Profession.",
        "Management lacks restricted entry: No statutory degree needed to be a manager.",
        "Top Level: Policy & strategy; Middle Level: Departmental execution; Operational Level: Direct shop floor supervision.",
        "Coordination is the Essence of Management (not a separate function).",
        "Coordination integrates group effort, ensures unity of action, and is continuous.",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u1_t1_q1",
        question: "Which term refers to completing activities so that organizational goals are attained on time, regardless of cost?",
        options: [
          { id: "A", text: "Efficiency" },
          { id: "B", text: "Effectiveness" },
          { id: "C", text: "Coordination" },
          { id: "D", text: "Delegation" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Effectiveness in management is concerned with doing the right task, completing activities and achieving goals within the stipulated time frame.",
      },
      {
        id: "bst_u1_t1_q2",
        question: "Coordination is termed as the 'Essence of Management' because:",
        options: [
          { id: "A", text: "It is the primary objective of every business enterprise" },
          { id: "B", text: "It is an independent sixth function of management" },
          { id: "C", text: "It is required at every stage and in all managerial functions to achieve harmony" },
          { id: "D", text: "It is legally mandatory under the Companies Act" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Coordination is not a separate function of management, but its very essence, required during planning, organising, staffing, directing, and controlling.",
      },
      {
        id: "bst_u1_t1_q3",
        question: "Management is not considered a full-fledged profession like medicine or law because:",
        options: [
          { id: "A", text: "It lacks a systematised body of knowledge" },
          { id: "B", text: "There is no statutory restriction on entry, and anyone can be appointed as a manager without a specific license" },
          { id: "C", text: "It does not involve any ethical considerations" },
          { id: "D", text: "Management cannot be taught in universities" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Unlike law or medicine where one must have a prescribed degree (LLB, MBBS) and register with a statutory council, there is no restriction on entry into management.",
      },
      {
        id: "bst_u1_t1_q4",
        question: "At which level of management are decisions regarding the overall survival and long-term strategic welfare of the enterprise taken?",
        options: [
          { id: "A", text: "Supervisory / Operational Level" },
          { id: "B", text: "Middle Level" },
          { id: "C", text: "Top Level" },
          { id: "D", text: "Shop-floor Foreman Level" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Top-level management (Board of Directors, CEO, Managing Director) is responsible for formulating overall organizational goals and corporate strategies.",
      },
      {
        id: "bst_u1_t1_q5",
        question: "Management is a multidimensional activity consisting of:",
        options: [
          { id: "A", text: "Management of Work, People, and Operations" },
          { id: "B", text: "Management of Profits, Sales, and Costs" },
          { id: "C", text: "Management of Shares, Debentures, and Loans" },
          { id: "D", text: "Management of Machinery, Materials, and Money only" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "According to NCERT, management is multidimensional comprising management of work, management of people, and management of operations.",
      },
      {
        id: "bst_u1_t1_q6",
        question: "Which of the following is an example of an operational/supervisory level manager?",
        options: [
          { id: "A", text: "Chief Executive Officer (CEO)" },
          { id: "B", text: "Production Department Head" },
          { id: "C", text: "Foreman / Supervisor" },
          { id: "D", text: "Finance Director" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Foremen and supervisors comprise the lower or operational level of management, directly overseeing the work of the non-managerial workforce.",
      },
      {
        id: "bst_u1_t1_q7",
        question: "Providing eco-friendly products and generating employment opportunities for disadvantaged sections of society fulfills which objective of management?",
        options: [
          { id: "A", text: "Organisational objective" },
          { id: "B", text: "Social objective" },
          { id: "C", text: "Personal objective" },
          { id: "D", text: "Financial objective" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Social objectives involve creating benefit for society, such as using environmental-friendly methods of production and providing employment.",
      },
      {
        id: "bst_u1_t1_q8",
        question: "Cooperation in an organisation without proper coordination leads to:",
        options: [
          { id: "A", text: "Maximum productivity" },
          { id: "B", text: "Wasted and misdirected efforts" },
          { id: "C", text: "Discontentment among workers" },
          { id: "D", text: "Automatic profit maximization" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Cooperation without coordination may lead to wasted effort (willingness to work without clear directional harmony), while coordination without cooperation leads to dissatisfaction.",
      },
      {
        id: "bst_u1_t1_q9",
        question: "The principle that management can be learned and personalized by each manager based on practice and individual creativity classifies management as:",
        options: [
          { id: "A", text: "A pure science" },
          { id: "B", text: "An art" },
          { id: "C", text: "A routine clerical skill" },
          { id: "D", text: "A mechanical system" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Art involves the personalized application of existing knowledge to achieve desired results through practice and creativity.",
      },
      {
        id: "bst_u1_t1_q10",
        question: "Assertion (A): Management is an all-pervasive activity.\nReason (R): The principles of management are applicable in all types of organisations (economic, social, or political) across the globe.",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is not the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        questionType: "Assertion-Reason",
        difficulty: "medium",
        explanation: "Management is universal and pervasive because its techniques and functions are practiced in hospitals, schools, clubs, and governments, not just commercial enterprises.",
      },
    ],
  },

  // Unit 2: Fayol's Principles, Taylor's Scientific Management
  {
    id: "bst_u2_t1",
    slug: "fayol-s-principles-taylor-s-scientific-management",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 2,
    unitTitle: "Principles of Management",
    topicTitle: "Fayol's Principles, Taylor's Scientific Management",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Principles and Functions of Management",
      chapterNumber: 2,
      chapterName: "Principles of Management",
      sections: [
        "2.1 Principles of Management: Concept and Nature (Universal, Flexible, General guidelines, Contingent)",
        "2.2 Taylor's Scientific Management: Principles (Science not rule of thumb, Harmony not discord, Cooperation not individualism, Development of workers)",
        "2.3 Taylor's Techniques: Functional Foremanship (8 specialists), Motion, Time, Fatigue, Method study, Differential Piece Wage System, Mental Revolution",
        "2.4 Fayol's 14 Principles of Administrative Management (Division of work, Authority & Responsibility, Discipline, Unity of Command vs Unity of Direction, Subordination, Remuneration, Centralisation, Scalar Chain & Gang Plank, Order, Equity, Stability of tenure, Initiative, Esprit de Corps)",
        "2.5 Fayol vs Taylor: Comparative Analysis",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (5-7 questions per shift)",
      totalPyqsInRepo: 240,
      weightagePercentage: 10,
    },
    summary30Seconds: [
      "Taylor's Scientific Management (Shop Floor / Bottom-up): Functional Foremanship (4 planning: Instruction card, Route, Time & Cost, Disciplinarian; 4 execution: Speed, Gang, Repair, Inspector); Differential Piece Wage System rewards efficient workers.",
      "Fayol's 14 Principles (Top-down Administrative): Unity of Command (one boss per worker); Unity of Direction (one head, one plan for a group of activities); Scalar Chain with 'Gang Plank' for direct emergency communication.",
      "Unity of Command prevents dual subordination and confusion; Functional Foremanship violates Unity of Command deliberately to achieve functional specialization.",
    ],
    coreConcepts: [
      {
        title: "Taylor's Scientific Management: Principles & Techniques",
        content: `**Core Philosophy**: Replacing 'Rule of Thumb' with scientific observation, analysis, and standardized tools.

**Taylor's Four Principles**:
1. **Science, Not Rule of Thumb**: One best method to maximize efficiency, discovered through scientific study.
2. **Harmony, Not Discord**: Complete harmony between management and workers via **Mental Revolution** (both realize mutual interdependence).
3. **Cooperation, Not Individualism**: Extension of harmony principle; management involves workers in setting standards; paternalistic sharing of gains.
4. **Development of Each Person to Greatest Efficiency and Prosperity**: Scientific selection and training.

**Taylor's Techniques**:
1. **Functional Foremanship**: Divides supervision into 8 specialists (violates Fayol's Unity of Command):
   - *Planning Incharge*: 1. Instruction Card Clerk, 2. Route Clerk, 3. Time and Cost Clerk, 4. Disciplinarian.
   - *Production Incharge*: 5. Speed Boss, 6. Gang Boss (keeps machines/tools ready), 7. Repair Boss, 8. Inspector (checks quality).
2. **Work Study**:
   - *Method Study*: Finding the 'one best way' (e.g. assembly line).
   - *Motion Study*: Eliminating unnecessary and unproductive movements.
   - *Time Study*: Determining standard time for a well-defined job using stopwatch to decide worker count and incentives.
   - *Fatigue Study*: Determining amount and frequency of rest intervals to restore stamina.
3. **Differential Piece Wage System**: Efficient workers producing above standard receive a higher piece wage rate; inefficient workers producing below standard receive a lower rate, incentivizing efficiency.`,
        ncertPointers: [
          "Mental Revolution involves a complete change in the mental outlook of workers and management towards each other from suspicion to mutual cooperation.",
          "Standardization of work: Process of setting physical standards for raw materials, machinery, and finished output.",
        ],
      },
      {
        title: "Fayol's 14 Principles of Administrative Management",
        content: `Henri Fayol (Father of General Management) developed 14 top-down principles:
1. **Division of Work**: Specialization increases output by making workers more efficient.
2. **Authority and Responsibility**: Parity between authority (right to give orders) and responsibility (obligation to carry out tasks).
3. **Discipline**: Obedience to organisational rules and employment agreements.
4. **Unity of Command**: A subordinate should receive orders from **ONE and only one superior** at a time (avoids confusion, ego clashes, dual subordination).
5. **Unity of Direction**: **One head and one plan** for a group of activities having the same objective (prevents overlapping).
6. **Subordination of Individual Interest to General Interest**: Organisation's interest supersedes individual employee interest.
7. **Remuneration of Employees**: Fair and equitable wages providing a reasonable standard of living.
8. **Centralisation and Decentralisation**: Balance between central decision-making and dispersed operational authority.
9. **Scalar Chain & Gang Plank**: Formal line of authority from highest to lowest rank. In emergencies, **Gang Plank** permits direct communication between two employees of the same rank to avoid delay.
10. **Order**: 'A place for everything (everyone) and everything (everyone) in its (his/her) place' (Material and Social order).
11. **Equity**: Kindliness and justice in dealing with employees without discrimination.
12. **Stability of Tenure of Personnel**: Minimize employee turnover to maintain operational efficiency.
13. **Initiative**: Encouraging workers to formulate and execute plans.
14. **Esprit de Corps**: Promoting team spirit, unity, and harmony; replacing 'I' with 'We'.`,
        ncertPointers: [
          "Unity of Command affects an individual employee (avoids dual subordination); Unity of Direction affects the entire organisation (ensures coordination of activities).",
          "Gang Plank can be used ONLY between employees of the SAME level with prior knowledge of their immediate superiors.",
        ],
      },
      {
        title: "Fayol vs Taylor: Key Differences",
        content: `| Basis | Henri Fayol | F.W. Taylor |
| :--- | :--- | :--- |
| **Perspective** | Top level of management (General Manager) | Shop floor / Factory level (Foreman) |
| **Unity of Command** | Strict adherence (One boss) | Violated (8 Functional Foremen per worker) |
| **Applicability** | Universally applicable to all organizations | Applicable specialized to manufacturing/factories |
| **Basis of Formation** | Personal administrative experience | Scientific observation and experimentation |
| **Focus** | Improving overall managerial administration | Increasing shop-floor worker productivity |
| **Personality** | Practitioner / Philosopher | Scientist / Engineer |
| **Major Title** | Father of General Management | Father of Scientific Management |`,
        ncertPointers: [
          "Both Taylor and Fayol emphasized that management principles are flexible guidelines, not rigid mathematical laws.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Unity of Command vs Unity of Direction",
        formula: "\\text{Unity of Command: One Boss per Worker} \\quad | \\quad \\text{Unity of Direction: One Head, One Plan for Common Objective}",
        symbols: "Fayolian coordination principles",
        siUnits: "Structural principles",
        applicationCondition: "Organizational design",
      },
      {
        name: "Taylor's 8 Functional Foremen",
        formula: "\\text{Planning (4): Route, Instruction, Time/Cost, Disciplinarian} \\; | \\; \\text{Execution (4): Speed, Gang, Repair, Inspector}",
        symbols: "Specialized foremanship",
        siUnits: "Role assignments",
        applicationCondition: "Shop floor management",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">Scalar Chain and Fayol's 'Gang Plank' Emergency Route</text>
  
  <!-- Inverted V-shaped Scalar Chain -->
  <!-- Top Node A -->
  <circle cx="380" cy="70" r="16" fill="#3b82f6"/>
  <text x="380" y="75" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">A</text>
  
  <!-- Left Ladder (B -> C -> D) -->
  <line x1="380" y1="86" x2="240" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <circle cx="330" cy="130" r="14" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="330" y="135" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">B</text>
  
  <circle cx="285" cy="190" r="14" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="285" y="195" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">C</text>
  
  <circle cx="240" cy="250" r="14" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="240" y="255" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">D</text>
  
  <!-- Right Ladder (E -> F -> G) -->
  <line x1="380" y1="86" x2="520" y2="250" stroke="#475569" strokeWidth="2.5"/>
  <circle cx="430" cy="130" r="14" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="430" y="135" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">E</text>
  
  <circle cx="475" cy="190" r="14" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="475" y="195" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">F</text>
  
  <circle cx="520" cy="250" r="14" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="520" y="255" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">G</text>
  
  <!-- Gang Plank between C and F -->
  <line x1="299" y1="190" x2="461" y2="190" stroke="#f43f5e" strokeWidth="3" strokeDasharray="5 5"/>
  <text x="380" y="180" textAnchor="middle" fill="#fda4af" fontSize="12" fontWeight="bold">GANG PLANK (Direct Emergency Communication)</text>
  
  <!-- Descriptions -->
  <text x="140" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="11">Formal chain: D $\to$ C $\to$ B $\to$ A</text>
  <text x="620" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="11">Formal chain: A $\to$ E $\to$ F $\to$ G</text>
  <text x="380" y="280" textAnchor="middle" fill="#fde68a" fontSize="11">Gang Plank connects C and F directly without bypassing formal line in crisis</text>
</svg>`,
    workedExamples: [
      {
        id: "bst_u2_t1_we1",
        questionNumber: 1,
        question: "A sales executive in a retail showroom receives instructions from the Sales Manager to offer a 10% discount to clear festive inventory. At the same time, the Finance Manager instructs him not to offer any discount exceeding 5% to protect operating margins. Which principle of management is violated in this situation?",
        options: [
          { id: "A", text: "Unity of Direction" },
          { id: "B", text: "Unity of Command" },
          { id: "C", text: "Scalar Chain" },
          { id: "D", text: "Subordination of individual interest" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The sales executive is receiving contradictory instructions from two distinct superiors (Sales Manager and Finance Manager) at the same time.",
          "Step 2: Fayol's principle of **Unity of Command** states that an employee should receive orders from one and only one boss to avoid dual subordination, confusion, and conflict.",
          "Step 3: Hence, the principle of Unity of Command is violated. Option B is exact.",
        ],
      },
      {
        id: "bst_u2_t1_we2",
        questionNumber: 2,
        question: "Under Taylor's Functional Foremanship, which specialist is responsible for keeping machines, tools, and materials ready for operational work by factory workers?",
        options: [
          { id: "A", text: "Speed Boss" },
          { id: "B", text: "Gang Boss" },
          { id: "C", text: "Repair Boss" },
          { id: "D", text: "Route Clerk" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Under Taylor's execution foremen, the **Gang Boss** is responsible for assembling and setting up all machines, tools, and raw materials near the workstations.",
          "Step 2: Speed Boss ensures timely and accurate completion; Repair Boss ensures proper maintenance of machines; Inspector checks output quality.",
          "Step 3: Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Functional Foremen Categorization",
        frequency: "Very High",
        typicalStem: "Which of the following foremen operates under the Planning Incharge under Taylor's functional foremanship? (A) Gang Boss (B) Speed Boss (C) Route Clerk (D) Repair Boss.",
        strategy: "Planning Incharge = Route Clerk, Instruction Card Clerk, Time and Cost Clerk, Disciplinarian. Execution = Speed, Gang, Repair, Inspector.",
      },
      {
        patternType: "Scalar Chain Gang Plank Shortcut",
        frequency: "High",
        typicalStem: "In Fayol's Scalar Chain, a direct communication route between two employees at the same operational level in an emergency is called:",
        strategy: "Gang Plank.",
      },
    ],
    commonTraps: [
      {
        concept: "Unity of Command vs Direction",
        misconception: "Confusing Unity of Command with Unity of Direction.",
        correctUnderstanding: "**Unity of Command** = One subordinate receives orders from ONE superior (dual subordination). **Unity of Direction** = One Head, One Plan for activities having same objective (prevents duplication of departmental work).",
      },
      {
        concept: "Order Principle Meaning",
        misconception: "Thinking 'Order' means giving commands or instructions to workers.",
        correctUnderstanding: "Fayol's principle of 'Order' means **systematic arrangement of things and people** ('A place for everything/everyone and everything/everyone in its/his place').",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Fayol's 14 Principles",
        mnemonic: "DAD U SEE USSR? OIC! (Division of work, Authority, Discipline, Unity of command, Subordination, Equity, Esprit de corps, Unity of direction, Scalar chain, Stability of tenure, Remuneration, Order, Initiative, Centralisation).",
        explanation: "Comprehensive memory peg for all 14 principles.",
      },
    ],
    quickRevisionCard: {
      title: "Principles of Management — Quick Card",
      bulletPoints: [
        "Taylor: Father of Scientific Management; Shop floor perspective; Functional foremanship (8 bosses).",
        "Functional Foremen: Planning (Route, Instruction, Time/Cost, Disciplinarian); Execution (Speed, Gang, Repair, Inspector).",
        "Work Study: Method (one best way), Motion (unnecessary moves), Time (standard duration), Fatigue (rest intervals).",
        "Differential piece wage system rewards efficient workers above standard.",
        "Fayol: Father of General Management; Top-down administrative perspective (14 principles).",
        "Unity of Command: One boss per worker (violates Functional Foremanship).",
        "Unity of Direction: One head, one plan for common objective.",
        "Scalar Chain: Formal line of authority; Gang Plank for direct emergency communication.",
        "Order: A place for everything and everyone in its/their place.",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u2_t1_q1",
        question: "Fayol's principle of 'Unity of Command' is violated by which technique of Taylor's Scientific Management?",
        options: [
          { id: "A", text: "Motion Study" },
          { id: "B", text: "Functional Foremanship" },
          { id: "C", text: "Differential Piece Wage System" },
          { id: "D", text: "Standardisation and Simplification" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Functional Foremanship advocates that each worker should be supervised by eight specialist foremen simultaneously, which directly contradicts Fayol's principle of Unity of Command (one boss per worker).",
      },
      {
        id: "bst_u2_t1_q2",
        question: "In Taylor's Functional Foremanship, which of the following foremen works under the Planning Incharge?",
        options: [
          { id: "A", text: "Speed Boss" },
          { id: "B", text: "Gang Boss" },
          { id: "C", text: "Instruction Card Clerk" },
          { id: "D", text: "Repair Boss" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under the Planning Incharge, there are four foremen: Route Clerk, Instruction Card Clerk, Time and Cost Clerk, and Disciplinarian.",
      },
      {
        id: "bst_u2_t1_q3",
        question: "Fayol's principle of 'Order' states that:",
        options: [
          { id: "A", text: "Managers should give strict orders without consulting subordinates" },
          { id: "B", text: "There should be a place for everything and everyone, and everything and everyone should be in its appointed place" },
          { id: "C", text: "Subordinates must obey all instructions unquestioningly" },
          { id: "D", text: "Disciplinary fines must be imposed for absenteeism" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "The principle of Order refers to systematic arrangement and orderly placement of physical materials (material order) and human personnel (social order).",
      },
      {
        id: "bst_u2_t1_q4",
        question: "The emergency mechanism designed by Henri Fayol to enable direct communication between two employees of the same rank to avoid delay in the Scalar Chain is called:",
        options: [
          { id: "A", text: "Grapevine" },
          { id: "B", text: "Gang Plank" },
          { id: "C", text: "Espirit de Corps" },
          { id: "D", text: "Functional Link" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Gang Plank is a shorter, direct route in the scalar chain permitted in emergency situations so that communication is not delayed by bureaucratic protocols.",
      },
      {
        id: "bst_u2_t1_q5",
        question: "Which work study technique involves eliminating unnecessary, wasteful body movements during the execution of a task?",
        options: [
          { id: "A", text: "Time Study" },
          { id: "B", text: "Motion Study" },
          { id: "C", text: "Method Study" },
          { id: "D", text: "Fatigue Study" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Motion study is the study of bodily movements like lifting, putting objects, sitting and changing positions, aimed at eliminating unnecessary unproductive movements.",
      },
      {
        id: "bst_u2_t1_q6",
        question: "The principle of 'Esprit de Corps' emphasizes that managers should:",
        options: [
          { id: "A", text: "Promote team spirit, mutual trust, and replace 'I' with 'We'" },
          { id: "B", text: "Encourage individual competition among workers" },
          { id: "C", text: "Reward personal achievements over team milestones" },
          { id: "D", text: "Centralize all decision making" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Management should promote team spirit of unity and harmony among employees; a manager should replace 'I' with 'We' in all conversations.",
      },
      {
        id: "bst_u2_t1_q7",
        question: "Taylor's 'Mental Revolution' calls for a complete change in the mental outlook of:",
        options: [
          { id: "A", text: "Government officials toward private businesses" },
          { id: "B", text: "Workers and management toward each other, shifting from confrontation to mutual cooperation" },
          { id: "C", text: "Consumers toward mass-produced commodities" },
          { id: "D", text: "Shareholders toward board of directors" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Mental Revolution involves a complete transformation in the attitude of workers and management towards each other, realizing that neither can prosper without the other.",
      },
      {
        id: "bst_u2_t1_q8",
        question: "Differentiating efficient workers from inefficient workers by paying different wage rates based on output produced is called:",
        options: [
          { id: "A", text: "Time wage system" },
          { id: "B", text: "Differential Piece Wage System" },
          { id: "C", text: "Minimum wage guarantee" },
          { id: "D", text: "Standardized bonus scheme" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Under Taylor's differential piece wage system, workers achieving or exceeding the standard target receive a higher rate per unit, while those falling short receive a lower rate.",
      },
      {
        id: "bst_u2_t1_q9",
        question: "Henri Fayol is celebrated in management history as the:",
        options: [
          { id: "A", text: "Father of Scientific Management" },
          { id: "B", text: "Father of General Management" },
          { id: "C", text: "Father of Human Relations Movement" },
          { id: "D", text: "Father of Modern Economics" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Henri Fayol is recognized as the Father of General / Administrative Management, while F.W. Taylor is the Father of Scientific Management.",
      },
      {
        id: "bst_u2_t1_q10",
        question: "Which of the following is a key difference between Unity of Command and Unity of Direction?",
        options: [
          { id: "A", text: "Unity of Command aims at preventing dual subordination, while Unity of Direction aims at preventing overlapping of activities" },
          { id: "B", text: "Unity of Command was proposed by Taylor, while Unity of Direction was proposed by Fayol" },
          { id: "C", text: "Unity of Command applies to departments, while Unity of Direction applies to individual workers" },
          { id: "D", text: "Unity of Command is optional, while Unity of Direction is compulsory" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Unity of Command ensures an employee receives orders from only one superior (prevents dual subordination); Unity of Direction ensures one head and one plan for a group of activities sharing a common objective (prevents duplication).",
      },
    ],
  },

  // Unit 3: Dimensions of Business Environment, Economic Reforms 1991, Demonetization
  {
    id: "bst_u3_t1",
    slug: "dimensions-of-business-environment-economic-reforms-1991-demonetization",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 3,
    unitTitle: "Business Environment",
    topicTitle: "Dimensions of Business Environment, Economic Reforms 1991, Demonetization",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Principles and Functions of Management",
      chapterNumber: 3,
      chapterName: "Business Environment",
      sections: [
        "3.1 Business Environment: Meaning, Features (Totality of external forces, Specific and general, Dynamic, Uncertain, Complex, Relative)",
        "3.2 Importance of Business Environment (First mover advantage, Early warning signal, Tapping resources, Coping with rapid changes)",
        "3.3 Dimensions / Elements of Business Environment (Economic, Social, Technological, Political, Legal)",
        "3.4 Economic Environment in India & Impact of 1991 Reforms (LPG, Market orientation, Changing customer expectations)",
        "3.5 Demonetization (November 8, 2016: Concept, Objectives, Impact)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-6 questions per shift)",
      totalPyqsInRepo: 200,
      weightagePercentage: 8,
    },
    summary30Seconds: [
      "Dimensions of Business Environment: Economic (interest rates, inflation), Social (customs, traditions, values, literacy), Technological (scientific innovations), Political (government stability, ideology), Legal (laws, court rulings).",
      "Impact of 1991 Reforms: Increased competition, demanding customers, rapidly changing technological environment, necessity for change, need for developing human resource, and market orientation (from 'selling' to 'marketing' concept).",
      "Demonetization (8th November 2016): Withdrawal of legal tender status of ₹500 and ₹1,000 banknotes aimed at curbing corruption, counterfeit notes, black money accumulation, and promoting digital cashless transactions.",
    ],
    coreConcepts: [
      {
        title: "Five Dimensions of Business Environment",
        content: `The business environment consists of five general environmental dimensions:
1. **Economic Environment**:
   - Includes interest rates, inflation rates, change in disposable income of people, stock market indices, and exchange rates.
   - *Example*: Rise in home loan interest rates contracts demand for residential real estate.
2. **Social Environment**:
   - Includes customs, traditions, societal values, social trends, literacy rates, and consumer lifestyle habits.
   - *Example*: Increased demand for fitness equipment, organic foods, and sugar-free beverages due to health consciousness; surge in festive sales during Diwali/Eid.
3. **Technological Environment**:
   - Forces relating to scientific improvements and innovations which provide new ways of producing goods and operating services.
   - *Example*: Shift from offline booking to mobile app bookings (Ola, Uber); digital payment UPI replacing cash.
4. **Political Environment**:
   - Political conditions such as general stability, peace in the country, and specific attitudes of elected government officials toward business.
   - *Example*: Government campaign 'Make in India' and Ease of Doing Business initiatives.
5. **Legal Environment**:
   - Acts passed by Parliament, court judgements, and decisions of administrative tribunals (Companies Act, Consumer Protection Act, Competition Act, GST Act).
   - *Example*: Statutory warning on cigarette packets ('Smoking causes cancer'); mandatory nutritional disclosures on packaged food items.`,
        ncertPointers: [
          "Specific Forces: Directly affect individual enterprises (Investors, Customers, Competitors, Suppliers).",
          "General Forces: Have impact on all business enterprises broadly (Economic, Social, Political, Legal, Technological).",
        ],
      },
      {
        title: "Impact of 1991 Policy Changes on Business & Demonetization",
        content: `**Managerial Response to 1991 Economic Reforms**:
1. **Increasing Competition**: Inflow of foreign MNCs after delicensing and FDI liberalization increased competition in Indian markets.
2. **More Demanding Customers**: Transition from sellers' market to buyers' market; customers have wider choices and demand better quality.
3. **Rapidly Changing Technological Environment**: Shorter product lifecycles; automation in manufacturing.
4. **Necessity for Change**: Turbulent market forces forced enterprises to continuously modify operations.
5. **Need for Developing Human Resource**: Unskilled workforce inadequate; high demand for specialized skills.
6. **Market Orientation**: Shift from production-oriented mindset (produce and sell) to **market-oriented mindset** (study consumer needs first, then manufacture accordingly).

**Demonetization (November 8, 2016)**:
- Prime Minister announced the withdrawal of legal tender status of existing ₹500 and ₹1,000 currency notes (constituting ~86% of total cash in circulation).
- **Core Objectives**:
  1. Curbing tax evasion and unearthing unaccounted black money.
  2. Eliminating counterfeit (fake) Indian currency used for terror funding.
  3. Channeling cash hoards into formal banking deposits to improve bank liquidity.
  4. Creating a **less-cash / digital economy** through digital payments (BHIM, UPI, RuPay).`,
        ncertPointers: [
          "Demonetization acted as a tax administration measure: Unaccounted money deposited in banks became subject to penalty and tax scrutiny under Pradhan Mantri Garib Kalyan Yojana.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "5 Dimensions Case Identification Framework",
        formula: "\\text{Interest/Inflation } \\to \\text{Economic}; \\; \\text{Lifestyle/Festivals } \\to \\text{Social}; \\; \\text{Digital/IT } \\to \\text{Tech}; \\; \\text{Statutes/Warnings } \\to \\text{Legal}",
        symbols: "Environmental dimension cues",
        siUnits: "Categorical matching",
        applicationCondition: "Case study question classification",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">The Five Dimensions of Business Environment</text>
  
  <!-- Central Business Node -->
  <circle cx="380" cy="165" r="50" fill="#1e293b" stroke="#38bdf8" strokeWidth="3"/>
  <text x="380" y="160" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">BUSINESS</text>
  <text x="380" y="178" textAnchor="middle" fill="#94a3b8" fontSize="10">ENTERPRISE</text>
  
  <!-- Surrounding Dimensions -->
  <rect x="40" y="70" width="160" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
  <text x="120" y="95" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">1. Economic</text>
  <text x="120" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">Interest, Inflation, Forex</text>
  
  <rect x="560" y="70" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
  <text x="640" y="95" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">2. Social</text>
  <text x="640" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">Customs, Lifestyle, Values</text>
  
  <rect x="40" y="195" width="160" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
  <text x="120" y="220" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">3. Technological</text>
  <text x="120" y="240" textAnchor="middle" fill="#94a3b8" fontSize="10">Innovation, Digital, AI</text>
  
  <rect x="560" y="195" width="160" height="60" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"/>
  <text x="640" y="220" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">4. Political</text>
  <text x="640" y="240" textAnchor="middle" fill="#94a3b8" fontSize="10">Stability, Govt Policies</text>
  
  <rect x="300" y="235" width="160" height="50" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2"/>
  <text x="380" y="258" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">5. Legal Environment</text>
  <text x="380" y="274" textAnchor="middle" fill="#94a3b8" fontSize="10">Statutes, Acts, Court Orders</text>
</svg>`,
    workedExamples: [
      {
        id: "bst_u3_t1_we1",
        questionNumber: 1,
        question: "With the surge in health consciousness across metropolitan cities, sales of cold drinks with high sugar content plummeted by 25%, while packaged mineral water, green tea, and sugar-free juices recorded an unprecedented growth of 40%. Which dimension of the business environment is highlighted in this case?",
        options: [
          { id: "A", text: "Social Environment" },
          { id: "B", text: "Economic Environment" },
          { id: "C", text: "Legal Environment" },
          { id: "D", text: "Political Environment" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: The change in demand is driven by shifting health consciousness, consumer lifestyle preferences, and societal eating habits.",
          "Step 2: Societal trends, customs, literacy, values, and lifestyle preferences are part of the **Social Environment**.",
          "Step 3: Option A is correct.",
        ],
      },
      {
        id: "bst_u3_t1_we2",
        questionNumber: 2,
        question: "On 8th November 2016, the Government of India declared that ₹500 and ₹1,000 currency notes would cease to be legal tender. Which of the following was an immediate key objective of this Demonetization drive?",
        options: [
          { id: "A", text: "To eliminate unaccounted wealth/black money and curb counterfeit currency used for terrorism" },
          { id: "B", text: "To encourage cash transactions in rural retail stores" },
          { id: "C", text: "To reduce foreign direct investment" },
          { id: "D", text: "To devalue the Indian Rupee against the US Dollar" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: The Demonetization of high-denomination currency had the central goal of unearthing black money, checking terror financing through counterfeit currency, and transitioning towards digital banking.",
          "Step 2: Option A is exact.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Environmental Dimension Identification",
        frequency: "Very High",
        typicalStem: "Statutory warning 'Smoking is injurious to health' printed on tobacco packets represents which dimension of business environment?",
        strategy: "Legal Environment (mandatory legal statute compliance).",
      },
      {
        patternType: "Market Orientation Concept",
        frequency: "High",
        typicalStem: "In the post-1991 era, Indian firms shifted from a selling orientation to which orientation?",
        strategy: "Market Orientation (identifying consumer needs first, then producing).",
      },
    ],
    commonTraps: [
      {
        concept: "Legal vs Political Dimension",
        misconception: "Confusing government policies with legal environment.",
        correctUnderstanding: "Government policy/ideology ('Make in India', stable governance) is **Political**. Acts of Parliament, court verdicts, and mandatory statutory notices are **Legal**.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "5 Dimensions",
        mnemonic: "PESTL: Political, Economic, Social, Technological, Legal.",
        explanation: "Standard global framework for business environmental analysis.",
      },
    ],
    quickRevisionCard: {
      title: "Business Environment — Quick Card",
      bulletPoints: [
        "Specific forces (Investors, competitors, customers); General forces (Economic, Social, Tech, Pol, Legal).",
        "Economic: Interest rates, inflation, disposable income.",
        "Social: Customs, traditions, values, lifestyle, health trends.",
        "Technological: Innovations, digital automation, internet platforms.",
        "Political: Government stability, ruling party ideology.",
        "Legal: Acts of parliament, court judgements, mandatory warnings.",
        "Post-1991 impact: Increased competition, demanding customers, market orientation.",
        "Demonetization (8 Nov 2016): Scrapped ₹500 & ₹1000 notes to tackle black money and boost digital payments.",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u3_t1_q1",
        question: "A mandatory statutory warning stating 'Chewing Tobacco causes Cancer' printed on all tobacco pouches represents which dimension of the business environment?",
        options: [
          { id: "A", text: "Social Environment" },
          { id: "B", text: "Legal Environment" },
          { id: "C", text: "Political Environment" },
          { id: "D", text: "Economic Environment" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Statutory warnings are mandatory legal requirements stipulated by Acts of Parliament and government regulations, belonging to the Legal Environment.",
      },
      {
        id: "bst_u3_t1_q2",
        question: "A reduction in repo rate by the Reserve Bank of India, leading to cheaper automobile loans and a consequent surge in car sales, highlights the impact of:",
        options: [
          { id: "A", text: "Economic Environment" },
          { id: "B", text: "Technological Environment" },
          { id: "C", text: "Social Environment" },
          { id: "D", text: "Political Environment" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Interest rates, monetary policy tools, and credit availability are core elements of the Economic Environment.",
      },
      {
        id: "bst_u3_t1_q3",
        question: "Which of the following is considered a 'Specific Force' affecting a business enterprise directly?",
        options: [
          { id: "A", text: "Technological changes" },
          { id: "B", text: "Competitors" },
          { id: "C", text: "Inflation rate" },
          { id: "D", text: "Tax legislation" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Specific forces (investors, customers, competitors, suppliers) affect an individual enterprise directly and immediately in its day-to-day operations.",
      },
      {
        id: "bst_u3_t1_q4",
        question: "The shift in consumer preference towards e-wallets, online UPI payments, and mobile shopping apps represents which dimension?",
        options: [
          { id: "A", text: "Technological Environment" },
          { id: "B", text: "Political Environment" },
          { id: "C", text: "Legal Environment" },
          { id: "D", text: "Ethical Environment" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Technological environment includes scientific innovations and IT developments that provide novel methods of delivering goods and services.",
      },
      {
        id: "bst_u3_t1_q5",
        question: "In the post-1991 era of economic reforms, the shift from a 'product/selling concept' to a 'marketing concept' is termed as:",
        options: [
          { id: "A", text: "Market Orientation" },
          { id: "B", text: "Disinvestment" },
          { id: "C", text: "Import Substitution" },
          { id: "D", text: "Centralisation" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Market orientation means that companies first study market and consumer requirements and subsequently produce goods that satisfy those needs, rather than producing first and selling forcefully.",
      },
      {
        id: "bst_u3_t1_q6",
        question: "On which date was Demonetization of ₹500 and ₹1,000 currency notes announced by the Government of India?",
        options: [
          { id: "A", text: "8th November 2016" },
          { id: "B", text: "1st July 2017" },
          { id: "C", text: "15th August 2016" },
          { id: "D", text: "31st March 2016" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Demonetization was officially announced on the evening of 8th November 2016.",
      },
      {
        id: "bst_u3_t1_q7",
        question: "Early identification of opportunities in the business environment that helps an enterprise be the first to exploit them instead of losing them to competitors is called:",
        options: [
          { id: "A", text: "First Mover Advantage" },
          { id: "B", text: "Early Warning Signal" },
          { id: "C", text: "Market Rationing" },
          { id: "D", text: "Disinvestment Advantage" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Awareness of the business environment enables an enterprise to capitalize on emerging opportunities ahead of competitors, securing the first mover advantage.",
      },
      {
        id: "bst_u3_t1_q8",
        question: "Increased participation of women in the workforce leading to higher demand for ready-to-eat packaged foods and household appliances is an example of:",
        options: [
          { id: "A", text: "Social Environment" },
          { id: "B", text: "Legal Environment" },
          { id: "C", text: "Political Environment" },
          { id: "D", text: "Physical Environment" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Changing family structures, women's empowerment, and evolving lifestyles fall squarely under the Social Environment.",
      },
      {
        id: "bst_u3_t1_q9",
        question: "Which of the following was NOT an intended objective of the 2016 Demonetization in India?",
        options: [
          { id: "A", text: "Curbing corruption and tax evasion" },
          { id: "B", text: "Channeling informal cash savings into the formal banking system" },
          { id: "C", text: "Permanently stopping all digital transactions" },
          { id: "D", text: "Disrupting counterfeit currency used for terror activities" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Promoting digital and cashless payments was a primary goal; stopping digital transactions was never an objective.",
      },
      {
        id: "bst_u3_t1_q10",
        question: "Business environment is said to be 'Uncertain' because:",
        options: [
          { id: "A", text: "It is very difficult to predict future environmental happenings, especially in dynamic sectors like IT and fashion" },
          { id: "B", text: "It differs from country to country" },
          { id: "C", text: "It remains completely static over decades" },
          { id: "D", text: "It cannot be analyzed by managers" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Uncertainty arises because future environmental events and technological disruptions occur rapidly and cannot be anticipated with absolute certainty.",
      },
    ],
  },

  // Unit 4: Planning Process, Types of Plans
  {
    id: "bst_u4_t1",
    slug: "planning-process-types-of-plans",
    subject: "bst",
    subjectName: "Business Studies",
    subjectCode: "305",
    unitNumber: 4,
    unitTitle: "Planning",
    topicTitle: "Planning Process, Types of Plans",
    ncertReference: {
      class: "Class 12",
      book: "Business Studies — Principles and Functions of Management",
      chapterNumber: 4,
      chapterName: "Planning",
      sections: [
        "4.1 Concept and Importance of Planning (Primary function, Provides direction, Reduces risk of uncertainty, Overcomes overlapping)",
        "4.2 Features of Planning (Focuses on objectives, Primary, Pervasive, Continuous, Futuristic, Involves decision-making, Mental exercise)",
        "4.3 Limitations of Planning (Internal: Rigidity, May not work in dynamic environment, Reduces creativity, Enormous costs, Time-consuming, False sense of security; External limitations)",
        "4.4 Planning Process: 7 Sequential Steps",
        "4.5 Types of Plans: Single-Use Plans (Programmes, Budgets) vs Standing Plans (Objectives, Strategy, Policy, Procedure, Method, Rule)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (4-5 questions per shift)",
      totalPyqsInRepo: 185,
      weightagePercentage: 8,
    },
    summary30Seconds: [
      "Planning is deciding in advance what to do, how to do, when to do, and who is to do it. It bridges the gap between where we are and where we want to go.",
      "The 7 Steps in Planning Process: 1. Setting Objectives, 2. Developing Premises (assumptions about future), 3. Identifying alternative courses of action, 4. Evaluating alternatives, 5. Selecting an alternative, 6. Implementing the plan, 7. Follow-up action.",
      "Types of Plans: Single-use (Budget, Programme) vs Standing (Policy, Procedure, Rule, Method). Objectives are end-results; Strategy is a comprehensive blueprint; Policies are general guidelines; Rules are rigid norms with no discretion.",
    ],
    coreConcepts: [
      {
        title: "The 7 Steps in the Planning Process",
        content: `Planning follows an orderly logical progression:
1. **Setting Objectives**: Specifying what the organization wants to achieve (overall and for each department). Must be clear, measurable, and time-bound.
2. **Developing Premises**: Formulating assumptions about the future environment (inflation, government policies, raw material availability). Premises are the foundation upon which plans are drafted.
3. **Identifying Alternative Courses of Action**: Brainstorming various innovative pathways to achieve the targets.
4. **Evaluating Alternative Courses**: Weighing positive and negative aspects of each alternative in light of feasibility, cost, risk, and expected returns.
5. **Selecting an Alternative**: The real point of decision making. The most ideal, feasible, and profitable plan with least negative consequences is chosen.
6. **Implementing the Plan**: Putting the plan into action (activating other management functions: organising resources, procuring machinery, recruiting labor).
7. **Follow-Up Action**: Monitoring plans continuously to ensure activities conform to schedule and premises remain valid.`,
        ncertPointers: [
          "Planning is a mental exercise: It requires foresight, logical thinking, and intelligent imagination rather than mere guesswork.",
          "Planning provides direction and reduces overlapping and wasteful activities.",
        ],
      },
      {
        title: "Types of Plans: Single-Use vs Standing Plans",
        content: `**Categorization**:
- **Single-Use Plans**: Developed for a one-time project or unique event; discarded once the objective is met (e.g. Budget, Programme).
- **Standing Plans**: Designed for activities that recur regularly over a long period; provide operational consistency (e.g. Policy, Procedure, Method, Rule).

**The 8 Specific Types of Plans**:
1. **Objectives**: End results towards which all activities are directed (e.g. increase sales by 20% in Q3). Neither single-use nor standing.
2. **Strategy**: Comprehensive plan for achieving organizational objectives; includes: (i) determining long-term objectives, (ii) adopting a course of action, and (iii) allocating resources.
3. **Policy**: General statements or guidelines that guide managerial thinking and channelize decision-making (e.g. credit policy, recruitment policy). Allows discretion.
4. **Procedure**: Routine steps on how to carry out activities chronologically (e.g. procedure for purchasing raw materials).
5. **Method**: Prescribes the exact standardized manner in which one particular step of a procedure is performed (e.g. method of training).
6. **Rule**: Specific statements informing what must or must not be done. **Simplest type of plan; allows NO discretion or flexibility; penalty for violation** (e.g. 'No Smoking in factory premises').
7. **Programme**: Detailed statement about a project containing an entire combination of objectives, policies, procedures, and rules (e.g. construction of a shopping mall).
8. **Budget**: Statement of expected results expressed in **numerical/quantitative terms** for a definite future period (e.g. cash budget).`,
        ncertPointers: [
          "Objectives and Strategy are neither purely single-use nor standing plans; they are broad directional plans.",
          "Rule is the only plan that permits zero managerial discretion and carries disciplinary penalties.",
        ],
      },
      {
        title: "Limitations of Planning",
        content: `**Internal Limitations**:
1. **Planning Leads to Rigidity**: Pre-decided plans make managers inflexible to unexpected market shifts.
2. **May Not Work in a Dynamic Environment**: Rapid environmental shifts (tech disruptions, wars) can invalidate premises.
3. **Reduces Creativity**: Middle and operational managers only execute orders from top management without exercising personal initiative.
4. **Involves Huge Costs**: Gathering data, conducting market surveys, and hiring boardroom consultants incur heavy financial costs.
5. **Time-Consuming Process**: Delays prompt operational action in emergencies.
6. **Does Not Guarantee Success**: A previously successful plan may fail if blindly relied upon (gives a **false sense of security**).

**External Limitations**: Natural calamities, changes in government policy, competitors' unexpected moves, technological obsolescence.`,
        ncertPointers: [
          "Planning cannot prevent problems, but it can anticipate them and prepare contingency buffers.",
        ],
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Planning Process Chronology",
        formula: "\\text{Objectives} \\to \\text{Premises} \\to \\text{Alternatives} \\to \\text{Evaluation} \\to \\text{Selection} \\to \\text{Implementation} \\to \\text{Follow-up}",
        symbols: "7 standard steps",
        siUnits: "Chronological sequence",
        applicationCondition: "Managerial planning execution",
      },
      {
        name: "Plan Types Comparison",
        formula: "\\text{Rule: Zero Discretion (No Smoking)} \\quad | \\quad \\text{Policy: Discretionary Guideline} \\quad | \\quad \\text{Budget: Numerical/Quantified}",
        symbols: "Plan typology",
        siUnits: "Categorical distinction",
        applicationCondition: "Question archetype identification",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <rect width="760" height="300" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
  <text x="380" y="32" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">The 7-Step Sequential Planning Process Flowchart</text>
  
  <!-- Step Boxes -->
  <g fill="#1e293b" strokeWidth="2">
    <!-- Step 1 -->
    <rect x="40" y="70" width="180" height="42" rx="6" stroke="#38bdf8"/>
    <text x="130" y="96" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">1. Setting Objectives</text>
    
    <!-- Step 2 -->
    <rect x="290" y="70" width="180" height="42" rx="6" stroke="#10b981"/>
    <text x="380" y="96" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">2. Developing Premises</text>
    
    <!-- Step 3 -->
    <rect x="540" y="70" width="180" height="42" rx="6" stroke="#f59e0b"/>
    <text x="630" y="96" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">3. Identify Alternatives</text>
    
    <!-- Step 4 -->
    <rect x="540" y="160" width="180" height="42" rx="6" stroke="#ec4899"/>
    <text x="630" y="186" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">4. Evaluate Alternatives</text>
    
    <!-- Step 5 -->
    <rect x="290" y="160" width="180" height="42" rx="6" stroke="#8b5cf6"/>
    <text x="380" y="186" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">5. Selecting Alternative</text>
    
    <!-- Step 6 -->
    <rect x="40" y="160" width="180" height="42" rx="6" stroke="#3b82f6"/>
    <text x="130" y="186" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">6. Implement Plan</text>
    
    <!-- Step 7 -->
    <rect x="290" y="240" width="180" height="42" rx="6" stroke="#ef4444"/>
    <text x="380" y="266" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">7. Follow-Up Action</text>
  </g>
  
  <!-- Flow Arrows -->
  <line x1="220" y1="91" x2="290" y2="91" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="470" y1="91" x2="540" y2="91" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="630" y1="112" x2="630" y2="160" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="540" y1="181" x2="470" y2="181" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="290" y1="181" x2="220" y2="181" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="130" y1="202" x2="130" y2="261" stroke="#94a3b8" strokeWidth="2"/>
  <line x1="130" y1="261" x2="290" y2="261" stroke="#94a3b8" strokeWidth="2"/>
</svg>`,
    workedExamples: [
      {
        id: "bst_u4_t1_we1",
        questionNumber: 1,
        question: "Arrange the following stages of the planning process in their correct logical sequence:\n(A) Developing premises\n(B) Implementing the plan\n(C) Setting objectives\n(D) Selecting an alternative course of action",
        options: [
          { id: "A", text: "(C) $\\to$ (A) $\\to$ (D) $\\to$ (B)" },
          { id: "B", text: "(A) $\\to$ (C) $\\to$ (D) $\\to$ (B)" },
          { id: "C", text: "(C) $\\to$ (D) $\\to$ (A) $\\to$ (B)" },
          { id: "D", text: "(D) $\\to$ (C) $\\to$ (A) $\\to$ (B)" },
        ],
        correctOption: "A",
        solutionSteps: [
          "Step 1: The very first step is Setting Objectives (C).",
          "Step 2: The second step is Developing Premises (A) (assumptions about the future).",
          "Step 3: After identifying and evaluating options, the manager Selects an Alternative (D).",
          "Step 4: Then follows Implementing the Plan (B) and follow-up.",
          "Step 5: Sequence: (C) $\\to$ (A) $\\to$ (D) $\\to$ (B). Option A is exact.",
        ],
      },
      {
        id: "bst_u4_t1_we2",
        questionNumber: 2,
        question: "A company puts up a notice stating: 'Smoking inside the chemical storage warehouse is strictly prohibited. Violators will face immediate termination of employment without notice.' This notice is an example of which type of plan?",
        options: [
          { id: "A", text: "Policy" },
          { id: "B", text: "Rule" },
          { id: "C", text: "Procedure" },
          { id: "D", text: "Method" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: The statement mandates what must not be done, allows zero discretion, and prescribes a strict disciplinary penalty for violation.",
          "Step 2: A Rule is a specific statement that informs what should or should not be done without allowing any flexibility or compromise.",
          "Step 3: Hence, it is a Rule. Option B is correct.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Plan Type Differentiation",
        frequency: "Very High",
        typicalStem: "A plan quantified in numerical terms (financial or physical units) for a specific future period is called a:",
        strategy: "Budget.",
      },
      {
        patternType: "Planning Process Second Step Identification",
        frequency: "High",
        typicalStem: "In the planning process, making assumptions about future consumer tastes, taxes, and inflation is known as:",
        strategy: "Developing Premises.",
      },
    ],
    commonTraps: [
      {
        concept: "Policy vs Rule Discretion",
        misconception: "Treating Policy and Rule as identical.",
        correctUnderstanding: "A **Policy** allows managerial discretion within broad boundaries (e.g., credit given only to trusted buyers). A **Rule** permits **ZERO discretion** (e.g., no smoking, wear helmets).",
      },
      {
        concept: "Planning Guarantees Success Fallacy",
        misconception: "Assuming planning eliminates all future business risks.",
        correctUnderstanding: "Planning does NOT guarantee success nor eliminate risks; it merely anticipates risks and equips the firm to respond effectively.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Planning 7 Steps Acronym",
        mnemonic: "O-P-A-E-S-I-F: Objectives, Premises, Alternatives, Evaluate, Select, Implement, Follow-up.",
        explanation: "Flawless chronological recall for sequence questions in CUET.",
      },
    ],
    quickRevisionCard: {
      title: "Planning — High-Yield Cheat Sheet",
      bulletPoints: [
        "Planning: Deciding in advance what to do, how to do, when to do, and who will do it.",
        "Primary function: Forms foundation for Organising, Staffing, Directing, Controlling.",
        "7 Steps: Objectives $\\to$ Premises $\\to$ Alternatives $\\to$ Evaluate $\\to$ Select $\\to$ Implement $\\to$ Follow-up.",
        "Single-Use: Budget (quantified), Programme; Standing: Policy, Procedure, Method, Rule.",
        "Objectives: End results (20% sales growth); Strategy: Broad blueprint for competitive positioning.",
        "Policy: Broad guideline with discretion; Rule: Rigid norm with NO discretion and penalty.",
        "Limitations: Leads to rigidity, may fail in dynamic environment, reduces creativity, costly.",
      ],
    },
    practiceQuestions: [
      {
        id: "bst_u4_t1_q1",
        question: "In the planning process, developing assumptions about the future economic, political, and competitive conditions is known as:",
        options: [
          { id: "A", text: "Setting Objectives" },
          { id: "B", text: "Developing Premises" },
          { id: "C", text: "Evaluating Alternatives" },
          { id: "D", text: "Follow-up Action" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Premises are the base on which plans are drawn; they are forecasts and assumptions about the future environment.",
      },
      {
        id: "bst_u4_t1_q2",
        question: "Which type of plan is formulated as a statement of expected results expressed in numerical terms for a definite future period?",
        options: [
          { id: "A", text: "Policy" },
          { id: "B", text: "Budget" },
          { id: "C", text: "Strategy" },
          { id: "D", text: "Programme" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A budget is a plan quantified in numerical terms (figures, money, time, or physical units) against which actual performance can be measured.",
      },
      {
        id: "bst_u4_t1_q3",
        question: "A company's guideline stating 'Recruitment of fresh engineering graduates will be done strictly through on-campus interviews' is an example of a:",
        options: [
          { id: "A", text: "Policy" },
          { id: "B", text: "Rule" },
          { id: "C", text: "Budget" },
          { id: "D", text: "Objective" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Policies are general statements or understandings that guide or channel thinking in decision making within an organisation.",
      },
      {
        id: "bst_u4_t1_q4",
        question: "Which of the following types of plans allows NO managerial discretion or flexibility?",
        options: [
          { id: "A", text: "Strategy" },
          { id: "B", text: "Policy" },
          { id: "C", text: "Rule" },
          { id: "D", text: "Method" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Rules are specific statements that inform what should or should not be done; they allow no discretion and must be strictly followed.",
      },
      {
        id: "bst_u4_t1_q5",
        question: "The step in the planning process where actual execution begins and other managerial functions are activated is:",
        options: [
          { id: "A", text: "Developing premises" },
          { id: "B", text: "Selecting an alternative" },
          { id: "C", text: "Implementing the plan" },
          { id: "D", text: "Follow-up action" },
        ],
        correctOption: "C",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Implementing the plan is the step where the plan is translated into action, requiring organising resources, deploying workforce, and starting operations.",
      },
      {
        id: "bst_u4_t1_q6",
        question: "Which of the following is an internal limitation of planning?",
        options: [
          { id: "A", text: "Natural calamities like floods and earthquakes" },
          { id: "B", text: "Planning creates rigidity and reduces individual employee creativity" },
          { id: "C", text: "Change in government import policy" },
          { id: "D", text: "Technological obsolescence" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "medium",
        explanation: "Creating rigidity and dampening creativity among lower-level managers are internal limitations arising within the organisational planning structure itself.",
      },
      {
        id: "bst_u4_t1_q7",
        question: "A comprehensive plan that includes determining long-term objectives, adopting a specific course of action, and allocating necessary resources to combat competitors is called a:",
        options: [
          { id: "A", text: "Strategy" },
          { id: "B", text: "Rule" },
          { id: "C", text: "Procedure" },
          { id: "D", text: "Method" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "A strategy is a broad, comprehensive blueprint designed to achieve organizational objectives in a competitive environment.",
      },
      {
        id: "bst_u4_t1_q8",
        question: "The prescribed, standardized way in which a particular task or step of a procedure is to be carried out is called a:",
        options: [
          { id: "A", text: "Method" },
          { id: "B", text: "Policy" },
          { id: "C", text: "Programme" },
          { id: "D", text: "Objective" },
        ],
        correctOption: "A",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Method provides the prescribed way or manner in which a specific task has to be performed, avoiding confusion and improving standardization.",
      },
      {
        id: "bst_u4_t1_q9",
        question: "Planning is considered a 'Mental Exercise' because:",
        options: [
          { id: "A", text: "It requires physical labor on the factory floor" },
          { id: "B", text: "It requires intellectual foresight, sound judgment, and logical analysis rather than wishful thinking" },
          { id: "C", text: "It is performed only by computer algorithms" },
          { id: "D", text: "It guarantees 100% financial profits" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Planning is an intellectual activity of thinking before doing, relying on imagination, foresight, and sound managerial judgment.",
      },
      {
        id: "bst_u4_t1_q10",
        question: "Which of the following types of plans is a single-use plan?",
        options: [
          { id: "A", text: "Procedure" },
          { id: "B", text: "Programme" },
          { id: "C", text: "Policy" },
          { id: "D", text: "Rule" },
        ],
        correctOption: "B",
        questionType: "Conceptual Direct",
        difficulty: "easy",
        explanation: "Programmes are single-use plans designed for a specific comprehensive project and become obsolete once the project is completed.",
      },
    ],
  },
];
