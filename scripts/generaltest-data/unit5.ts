export const generalTestUnit5 = [
  // UNIT 5 - TOPIC 1: Basic Scientific Principles
  {
    id: "general-test-unit5-basic-scientific-principles",
    slug: "basic-scientific-principles",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 5,
    unitTitle: "General Science & Environment Literacy",
    topicTitle: "Basic Scientific Principles",
    ncertReference: {
      book: "CUET General Test / General Science Foundations",
      chapter: "Section 18: Laws of Motion, Thermodynamics & Fundamental Forces",
      pages: "Pages 625-660",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 88,
      weightagePercentage: 11.5,
    },
    thirtySecondSummary: [
      "Basic Scientific Principles evaluates core foundational laws governing physics and chemistry that explain everyday phenomena.",
      "Newton's Laws of Motion: 1st Law (Inertia - bus passengers jerking forward on braking), 2nd Law (F = ma - catching a cricket ball by pulling hands back), 3rd Law (Action-Reaction - rocket propulsion, swimming).",
      "Gravitation & Planetary Motion: Universal Law of Gravitation (F = G*m1*m2 / r^2); Kepler's three laws of planetary orbits.",
      "Thermodynamics & Energy: First Law (Conservation of Energy - energy cannot be created or destroyed); Second Law (Entropy of an isolated system always increases; heat flows spontaneously from hot to cold).",
      "Archimedes' Principle & Pascal's Law: Buoyant force equals weight of displaced fluid (ships floating, lactometer); hydraulic brakes and lifts operate on Pascal's law.",
    ],
    coreConcepts: [
      {
        title: "Newton's Three Laws of Motion and Applications",
        explanation:
          "Foundational mechanics explaining dynamic equilibrium and momentum:\n1. First Law (Law of Inertia): An object continues in its state of rest or uniform motion in a straight line unless acted upon by an external unbalanced force.\n  - Inertia of Rest: Dust falling when a carpet is beaten with a stick.\n  - Inertia of Motion: A passenger lunges forward when a speeding bus suddenly applies brakes.\n2. Second Law (F = dp/dt = ma): The rate of change of momentum is directly proportional to the applied force.\n  - Application: A cricket fielder pulls his hands backwards while catching a fast ball to increase impact duration (Δt), thereby reducing the impulsive force (F = Δp / Δt).\n3. Third Law (Action and Reaction): To every action, there is an equal and opposite reaction acting on two DIFFERENT bodies.\n  - Application: Rocket propulsion (expulsion of exhaust gases downwards propels the rocket upwards); recoil of a gun.",
        keyTakeaways: [
          "Inertia = Resistance to change in state of motion.",
          "Pulling hands back reduces impulsive force by increasing contact time.",
          "Action and reaction always act on different bodies simultaneously.",
        ],
        ncertPointer:
          "NCERT Class IX-XI Science, Laws of Motion, pp. 114-138.",
      },
      {
        title: "Universal Gravitation and Fluid Mechanics",
        explanation:
          "Forces governing cosmic orbits and fluid equilibrium:\n1. Universal Gravitation: F = G * (m1 * m2) / r^2, where G = 6.674 * 10^-11 N m^2/kg^2.\n  - Acceleration due to gravity g = G * M / R^2 ≈ 9.8 m/s^2 at Earth's surface (maximum at the poles, minimum at the equator due to Earth's oblate shape).\n2. Archimedes' Principle: When a body is immersed fully or partially in a fluid, it experiences an upward buoyant force equal to the weight of the fluid displaced by it.\n  - Principle of Floatation: An object floats if the buoyant force equals or exceeds its weight (average density < fluid density).\n3. Pascal's Law: Pressure applied to an enclosed fluid is transmitted undiminished in all directions.\n  - Applications: Hydraulic lifts, hydraulic brakes in automobiles, and hydraulic jacks.",
        keyTakeaways: [
          "Gravity g is maximum at the poles and minimum at the equator.",
          "Buoyant force = Weight of displaced liquid.",
          "Hydraulic brakes work on Pascal's law.",
        ],
        ncertPointer:
          "NCERT Class IX-XI Science, Gravitation & Fluids, pp. 132-155.",
      },
      {
        title: "Thermodynamics and Conservation Laws",
        explanation:
          "Principles governing thermal energy and entropy:\n1. Zeroth Law: Establishes temperature as a fundamental state variable (if body A is in thermal equilibrium with B, and B with C, then A is in equilibrium with C).\n2. First Law of Thermodynamics: ΔQ = ΔU + ΔW (Conservation of Energy). Energy cannot be created or destroyed, only transformed from one form to another.\n3. Second Law of Thermodynamics: Heat cannot spontaneously flow from a colder body to a hotter body without external work; the entropy of an isolated system always increases.\n4. Modes of Heat Transfer: Conduction (requires direct molecular collision in solids), Convection (mass bulk fluid movement in liquids and gases), Radiation (electromagnetic waves requiring no material medium, e.g., solar energy reaching Earth).",
        keyTakeaways: [
          "First Law of Thermodynamics = Law of Conservation of Energy.",
          "Radiation is the only heat transfer mode that travels through vacuum.",
          "Entropy measures disorder and continuously increases in isolated systems.",
        ],
        ncertPointer:
          "NCERT Physics Class XI, Thermal Properties & Thermodynamics, pp. 274-315.",
      },
    ],
    keyFacts: [
      {
        concept: "G vs g",
        formulaOrFact: "G = 6.674×10^-11 N m^2/kg^2 (Universal) | g ≈ 9.8 m/s^2 (Local)",
        explanation: "G is constant everywhere in the universe; g varies with latitude, altitude, and planetary mass.",
        examTip: "CUET asks whether G or g changes on the moon (g changes to g/6, G remains unchanged).",
      },
      {
        concept: "Pascal's Law Application",
        formulaOrFact: "Hydraulic Lifts, Brakes & Presses",
        explanation: "Transmits pressure equally through enclosed hydraulic fluid.",
        examTip: "High-frequency question matching scientific law with technology.",
      },
      {
        concept: "Impulse Formula",
        formulaOrFact: "Impulse = Force × Time = Change in Momentum (Δp)",
        explanation: "Explains why shock absorbers and air bags protect passengers.",
        examTip: "Increasing contact time lowers peak impact force.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="sciPrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <filter id="shadowSP" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f0f9ff" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#0c4a6e">Core Physical Principles & Real-World Manifestations</text>

  <!-- Pillar 1: Newton's Laws -->
  <g transform="translate(40, 60)" filter="url(#shadowSP)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#bae6fd" stroke-width="1.5"/>
    <rect width="180" height="38" rx="8" fill="url(#sciPrGrad)"/>
    <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Newton's Laws</text>
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0369a1">• 1st Law (Inertia):</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Bus brakes -> jerking forward</text>
    <text x="15" y="108" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0369a1">• 2nd Law (F = ma):</text>
    <text x="25" y="126" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Catching ball: pull hands back</text>
    <text x="15" y="150" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0369a1">• 3rd Law (Action/Reaction):</text>
    <text x="25" y="168" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Rocket exhaust & recoil</text>
    <text x="15" y="194" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Act on two different bodies</text>
  </g>

  <!-- Pillar 2: Fluids & Gravity -->
  <g transform="translate(260, 60)" filter="url(#shadowSP)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#bae6fd" stroke-width="1.5"/>
    <rect width="180" height="38" rx="8" fill="#059669"/>
    <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Fluids & Gravity</text>
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Archimedes' Principle:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Buoyancy = Displaced fluid wt</text>
    <text x="15" y="108" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Pascal's Law:</text>
    <text x="25" y="126" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Hydraulic brakes & car lifts</text>
    <text x="15" y="150" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Gravitation (g):</text>
    <text x="25" y="168" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Max at poles, min at equator</text>
    <text x="25" y="184" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Moon gravity = g / 6</text>
  </g>

  <!-- Pillar 3: Thermodynamics -->
  <g transform="translate(480, 60)" filter="url(#shadowSP)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#bae6fd" stroke-width="1.5"/>
    <rect width="180" height="38" rx="8" fill="#d97706"/>
    <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Thermodynamics</text>
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#b45309">• 1st Law:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Conservation of Energy</text>
    <text x="15" y="108" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#b45309">• 2nd Law:</text>
    <text x="25" y="126" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Entropy increases; spontaneous heat</text>
    <text x="15" y="150" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#b45309">• Heat Transfer Modes:</text>
    <text x="25" y="168" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Conduction, Convection</text>
    <text x="25" y="184" font-family="system-ui, sans-serif" font-size="10" fill="#dc2626">Radiation (needs no medium)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u5-we1",
        questionNumber: 1,
        question:
          "Why does a cricket fielder pull his hands backward while catching a fast-moving cricket ball?",
        options: [
          { id: "A", text: "To decrease the time of contact and increase the force" },
          { id: "B", text: "To increase the time of contact and decrease the impulsive force on his hands" },
          { id: "C", text: "To apply Newton's Third Law of Motion" },
          { id: "D", text: "To overcome the force of gravity" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Recall Newton's Second Law of Motion: Force F = Δp / Δt, where Δp is the change in momentum.",
          "Step 2: When catching the ball, the ball's momentum must be brought to zero (Δp is fixed).",
          "Step 3: By pulling hands backward, the fielder extends the duration of impact (increases Δt).",
          "Step 4: A larger Δt results in a smaller average force F experienced by the fielder's palms, preventing injury.",
        ],
        cuetInsight:
          "Impulse applications (air bags, shock absorbers, cricket catches) appear frequently in everyday physics.",
      },
      {
        id: "general-test-u5-we2",
        questionNumber: 2,
        question:
          "Hydraulic brakes used in modern automobiles work on which fundamental scientific principle?",
        options: [
          { id: "A", text: "Archimedes' Principle" },
          { id: "B", text: "Bernoulli's Principle" },
          { id: "C", text: "Pascal's Law" },
          { id: "D", text: "Boyle's Law" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: Identify the operating mechanism: pressing the brake pedal exerts pressure on hydraulic fluid inside a master cylinder.",
          "Step 2: Pascal's Law states that pressure applied to an enclosed incompressible fluid is transmitted equally in all directions throughout the fluid.",
          "Step 3: This transmits force to slave cylinders at all wheels simultaneously, clamping the brake pads.",
        ],
        cuetInsight:
          "Direct technology-to-law matching is a standard question type in General Test science.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Law & Everyday Example Match",
        frequency: "Very High",
        typicalStem: "Match List-I (Everyday Phenomenon) with List-II (Governing Physical Law).",
        strategy: "Passenger jerking forward -> Inertia (1st Law); Rocket -> Action-Reaction (3rd Law); Hydraulic lift -> Pascal's Law; Ship floating -> Archimedes' Principle.",
      },
      {
        patternType: "Heat Transfer Medium Rule",
        frequency: "High",
        typicalStem: "Through which mode of heat transfer does solar energy travel across the vacuum of space to reach Earth?",
        strategy: "Radiation is the only mode that requires no material medium.",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing Mass and Weight on the Moon",
        whyStudentsFail: "Thinking mass changes on the moon.",
        howToAvoid: "Mass remains invariant everywhere; only Weight (W = mg) changes to W/6 on the moon.",
      },
      {
        trap: "Action and Reaction cancel each other",
        whyStudentsFail: "Thinking Newton's 3rd law forces cancel out into zero net force.",
        howToAvoid: "Action and reaction act on TWO DIFFERENT bodies; hence they cannot cancel each other.",
      },
    ],
    mnemonics: [
      {
        concept: "Modes of Heat Transfer",
        mnemonic: "C-C-R (Conduction, Convection, Radiation)",
        explanation:
          "Conduction in solids, Convection in fluids, Radiation through vacuum.",
      },
    ],
    quickRevisionCard: {
      title: "Scientific Principles High-Yield Points",
      bulletPoints: [
        "Newton's 1st Law = Inertia (bus braking).",
        "Newton's 2nd Law = F = ma (catching cricket ball).",
        "Newton's 3rd Law = Action & Reaction (rocket propulsion).",
        "Archimedes' Principle: Buoyant force = Weight of fluid displaced.",
        "Pascal's Law: Pressure transmitted equally (hydraulic brakes/lifts).",
        "1st Law of Thermodynamics = Conservation of Energy.",
        "Radiation: Only heat transfer mode propagating through a vacuum.",
        "g is maximum at poles, minimum at equator; G is universal constant.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u5-t1-q1",
        question:
          "When a moving bus suddenly applies brakes, the passengers jerk forward due to:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Inertia of rest" },
          { id: "B", text: "Inertia of motion" },
          { id: "C", text: "Inertia of direction" },
          { id: "D", text: "Gravitational pull" },
        ],
        correctOption: "B",
        explanation:
          "The lower part of the passenger's body comes to rest with the bus, but the upper part continues in its forward state of motion due to the Inertia of Motion.",
      },
      {
        id: "general-test-u5-t1-q2",
        question:
          "The value of acceleration due to gravity (g) on Earth is maximum at the:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Equator" },
          { id: "B", text: "Poles" },
          { id: "C", text: "Center of the Earth" },
          { id: "D", text: "Tropic of Cancer" },
        ],
        correctOption: "B",
        explanation:
          "Because Earth is oblate (flattened at the poles and bulging at the equator), polar radius is smaller than equatorial radius. Since g = GM/R^2, g is maximum at the poles.",
      },
      {
        id: "general-test-u5-t1-q3",
        question:
          "The propulsion of a rocket in space is based on which fundamental scientific principle?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Conservation of Linear Momentum / Newton's Third Law" },
          { id: "B", text: "Bernoulli's Theorem" },
          { id: "C", text: "Archimedes' Principle" },
          { id: "D", text: "First Law of Thermodynamics" },
        ],
        correctOption: "A",
        explanation:
          "A rocket expels high-velocity gas exhaust backward, producing an equal and opposite forward thrust in accordance with Newton's Third Law and the conservation of linear momentum.",
      },
      {
        id: "general-test-u5-t1-q4",
        question:
          "Which mode of heat transfer does NOT require any material medium and can propagate through a vacuum?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Conduction" },
          { id: "B", text: "Convection" },
          { id: "C", text: "Radiation" },
          { id: "D", text: "Transpiration" },
        ],
        correctOption: "C",
        explanation:
          "Thermal radiation transfers energy via electromagnetic waves (infrared) and requires no physical medium, allowing sunlight to travel through the vacuum of outer space.",
      },
      {
        id: "general-test-u5-t1-q5",
        question:
          "Assertion (A): An iron nail sinks in water, but a massive ship made of steel and iron floats on the ocean surface.\nReason (R): According to Archimedes' Principle, the hollow shape of a ship displaces a volume of water whose weight is equal to the total weight of the ship.",
        type: "assertion-reason",
        difficulty: "medium",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation:
          "Both statements are true and (R) explains why a hollowed ship's average density is less than water, creating a buoyant force that sustains floatation.",
      },
      {
        id: "general-test-u5-t1-q6",
        question:
          "Match List-I (Scientific Law) with List-II (Application):\n(P) Pascal's Law — 1. Hydraulic Brakes\n(Q) Archimedes' Principle — 2. Lactometer / Hydrometer\n(R) Newton's Third Law — 3. Recoil of a Gun\n(S) First Law of Thermodynamics — 4. Conservation of Energy",
        type: "match-the-following",
        difficulty: "easy",
        options: [
          { id: "A", text: "P-1, Q-2, R-3, S-4" },
          { id: "B", text: "P-2, Q-1, R-4, S-3" },
          { id: "C", text: "P-1, Q-3, R-2, S-4" },
          { id: "D", text: "P-4, Q-2, R-1, S-3" },
        ],
        correctOption: "A",
        explanation:
          "Standard technological applications matched to their governing scientific laws.",
      },
      {
        id: "general-test-u5-t1-q7",
        question:
          "What happens to the mass and weight of an object when it is taken from the Earth to the Moon?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Both mass and weight remain unchanged" },
          { id: "B", text: "Mass remains unchanged, but weight decreases to one-sixth" },
          { id: "C", text: "Weight remains unchanged, but mass decreases" },
          { id: "D", text: "Both mass and weight decrease to one-sixth" },
        ],
        correctOption: "B",
        explanation:
          "Mass is an intrinsic property representing matter content and remains invariant everywhere. Weight depends on local gravitational field (g_moon ≈ g_earth / 6), so weight decreases to 1/6th.",
      },
      {
        id: "general-test-u5-t1-q8",
        question:
          "The first law of thermodynamics is an expression of which universal conservation law?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Conservation of Momentum" },
          { id: "B", text: "Conservation of Energy" },
          { id: "C", text: "Conservation of Mass" },
          { id: "D", text: "Conservation of Charge" },
        ],
        correctOption: "B",
        explanation:
          "The First Law of Thermodynamics (ΔQ = ΔU + ΔW) states that total energy in an isolated thermodynamic system remains constant, representing the conservation of energy.",
      },
      {
        id: "general-test-u5-t1-q9",
        question:
          "Why is a handle placed at the farthest outer edge of a door rather than near the hinges?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "To maximize torque by increasing the lever arm distance" },
          { id: "B", text: "To reduce door friction" },
          { id: "C", text: "To decrease door weight" },
          { id: "D", text: "To avoid air resistance" },
        ],
        correctOption: "A",
        explanation:
          "Torque τ = Force * perpendicular distance (r). Placing the handle at maximum distance from the rotational hinge line maximizes torque for a given hand force, making the door easy to open.",
      },
      {
        id: "general-test-u5-t1-q10",
        question:
          "Which instrument is used to determine the purity of milk based on the density and principle of floatation?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Barometer" },
          { id: "B", text: "Lactometer" },
          { id: "C", text: "Sphygmomanometer" },
          { id: "D", text: "Anemometer" },
        ],
        correctOption: "B",
        explanation:
          "A lactometer is a specialized hydrometer designed to measure the relative density of milk based on Archimedes' principle.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["everyday-physics-and-chemistry", "science-discoveries"],
      practiceTestId: "practice-general-test-unit5-test1",
      practiceTestUrl: "/test/practice-general-test-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 5 - TOPIC 2: Everyday Physics & Chemistry
  {
    id: "general-test-unit5-everyday-physics-and-chemistry",
    slug: "everyday-physics-and-chemistry",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 5,
    unitTitle: "General Science & Environment Literacy",
    topicTitle: "Everyday Physics & Chemistry",
    ncertReference: {
      book: "CUET General Test / Everyday Science & Applied Chemistry",
      chapter: "Section 19: Atmospheric Optics, Household Chemicals, Acids, Bases & Polymers",
      pages: "Pages 661-698",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 96,
      weightagePercentage: 12.8,
    },
    thirtySecondSummary: [
      "Everyday Physics & Chemistry focuses on scientific explanations for daily observations, domestic chemicals, acids, bases, indicators, and optical phenomena.",
      "Atmospheric Optics: Blue sky (Rayleigh scattering of light, I ∝ 1/λ^4), red sunrise/sunset (least scattered long wavelengths), twinkling of stars (atmospheric refraction), mirages & optical fibers (Total Internal Reflection).",
      "Household Acids & Bases: Vinegar (Acetic acid), Citrus fruits (Citric acid), Tamarind (Tartaric acid), Curd (Lactic acid), Ant sting (Methanoic/Formic acid; neutralized by baking soda).",
      "Common Chemical Compounds: Baking soda (Sodium hydrogen carbonate - NaHCO3), Washing soda (Sodium carbonate decahydrate - Na2CO3·10H2O), Bleaching powder (Calcium hypochlorite - CaOCl2), Plaster of Paris (CaSO4·1/2H2O).",
      "Metals & Alloys: Brass (Copper + Zinc), Bronze (Copper + Tin), Stainless Steel (Iron + Chromium + Nickel + Carbon), Solder (Lead + Tin).",
    ],
    coreConcepts: [
      {
        title: "Atmospheric Optics and Total Internal Reflection (TIR)",
        explanation:
          "Daily optical phenomena explained by electromagnetic wave properties:\n1. Rayleigh Scattering of Light:\n  - Scattering intensity is inversely proportional to the fourth power of wavelength: I ∝ 1 / λ^4.\n  - Blue sky: Blue light has a shorter wavelength than red light and is scattered much more strongly by atmospheric gas molecules.\n  - Red Sun at Sunrise & Sunset: Light travels a longer atmospheric path; shorter blue waves are scattered away, leaving long red-orange wavelengths to reach the observer.\n2. Total Internal Reflection (TIR):\n  - Occurs when light travels from an optically denser medium to a rarer medium at an angle of incidence greater than the critical angle.\n  - Applications: Brilliant sparkling of diamonds, optical fibers transmitting high-speed internet, and desert mirages.\n3. Atmospheric Refraction:\n  - Continuous bending of light rays through air layers of differing optical densities causes the twinkling of stars and advance sunrise/delayed sunset by about 2 minutes.",
        keyTakeaways: [
          "Scattering formula: I ∝ 1 / λ^4 (Rayleigh scattering).",
          "TIR requires: Denser to rarer medium + angle of incidence > critical angle.",
          "Optical fibers and mirages rely on Total Internal Reflection.",
        ],
        ncertPointer:
          "NCERT Physics Class X-XII, Light & Atmospheric Optics, pp. 185-205.",
      },
      {
        title: "Common Household Chemicals, Salts, and Natural Acids",
        explanation:
          "Chemical formulas and applications of domestic substances:\n1. Sodium Compounds:\n  - Baking Soda: Sodium hydrogen carbonate (NaHCO3) - used in baking and as an antacid.\n  - Washing Soda: Sodium carbonate decahydrate (Na2CO3·10H2O) - used for softening hard water and laundry.\n  - Common Salt: Sodium chloride (NaCl).\n2. Calcium Compounds:\n  - Bleaching Powder: Calcium hypochlorite (CaOCl2) - disinfectant and bleaching agent.\n  - Plaster of Paris (POP): Calcium sulfate hemihydrate (CaSO4·1/2H2O) - sets into gypsum (CaSO4·2H2O) when mixed with water.\n3. Natural Organic Acids:\n  - Vinegar: Acetic acid (Ethanoic acid, ~5-8%)\n  - Lemon/Orange: Citric acid\n  - Tamarind/Grapes: Tartaric acid\n  - Curd/Sour Milk: Lactic acid\n  - Tomato: Oxalic acid\n  - Ant Sting: Methanoic (formic) acid - neutralized by applying mild base like baking soda or calamine solution.",
        keyTakeaways: [
          "Baking Soda = NaHCO3; Washing Soda = Na2CO3·10H2O.",
          "Plaster of Paris = CaSO4·1/2H2O.",
          "Ant sting venom contains methanoic (formic) acid.",
        ],
        ncertPointer:
          "NCERT Chemistry Class X, Acids, Bases and Salts, pp. 17-35.",
      },
      {
        title: "Metals, Alloys, and Corrosion Prevention",
        explanation:
          "Composition of metallic solutions and protective coatings:\n1. Crucial Commercial Alloys:\n  - Brass: Copper (Cu, ~70%) + Zinc (Zn, ~30%)\n  - Bronze: Copper (Cu, ~88-90%) + Tin (Sn, ~10-12%)\n  - Solder: Lead (Pb, ~50%) + Tin (Sn, ~50%) - low melting point for joining electrical circuits\n  - Stainless Steel: Iron (Fe) + Chromium (Cr, ~18%) + Nickel (Ni, ~8%) + Carbon (C, ~0.1-1%) - corrosion resistant.\n  - Amalgam: Any alloy containing mercury (Hg).\n2. Rusting of Iron:\n  - Requires simultaneous presence of both Oxygen (O2) and Water/Moisture (H2O): 4Fe + 3O2 + 2xH2O -> 2Fe2O3·xH2O (Hydrated ferric oxide).\n  - Galvanization: Coating iron with a thin protective layer of Zinc (Zn).",
        keyTakeaways: [
          "Brass = Copper + Zinc; Bronze = Copper + Tin.",
          "Amalgam always contains Mercury.",
          "Galvanization uses Zinc to protect iron from rusting.",
        ],
        ncertPointer:
          "NCERT Chemistry Class X, Metals and Non-Metals, pp. 37-56.",
      },
    ],
    keyFacts: [
      {
        concept: "Alloy Compositions",
        formulaOrFact: "Brass (Cu + Zn) | Bronze (Cu + Sn) | Solder (Pb + Sn)",
        explanation: "Frequent matching question across CUET General Test papers.",
        examTip: "Bronze has Tin (Sn), Brass has Zinc (Zn).",
      },
      {
        concept: "Plaster of Paris Formula",
        formulaOrFact: "CaSO4·1/2H2O",
        explanation: "Formed by heating gypsum (CaSO4·2H2O) at 373 K.",
        examTip: "High-frequency chemical formula question.",
      },
      {
        concept: "Total Internal Reflection (TIR)",
        formulaOrFact: "Light from Denser to Rarer medium at i > critical angle",
        explanation: "Underpins diamonds, mirages, and optical communication fiber cables.",
        examTip: "Tested via everyday optical applications.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="chemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadowEvery" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#fffbeb" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#78350f">Everyday Physics & Household Chemistry Reference</text>

  <!-- Box 1: Atmospheric Optics -->
  <g transform="translate(40, 60)" filter="url(#shadowEvery)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#fde68a" stroke-width="1.5"/>
    <rect width="180" height="38" rx="8" fill="#0284c7"/>
    <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Everyday Optics</text>
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0369a1">• Blue Sky:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Rayleigh scattering (I ∝ 1/λ^4)</text>
    <text x="15" y="108" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0369a1">• Red Sunset / Sunrise:</text>
    <text x="25" y="126" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Least scattered long λ</text>
    <text x="15" y="150" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0369a1">• Total Internal Reflection:</text>
    <text x="25" y="168" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Mirage & Optical Fibers</text>
    <text x="15" y="194" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Star twinkle: Atmospheric refr.</text>
  </g>

  <!-- Box 2: Domestic Chemicals -->
  <g transform="translate(260, 60)" filter="url(#shadowEvery)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#fde68a" stroke-width="1.5"/>
    <rect width="180" height="38" rx="8" fill="url(#chemGrad)"/>
    <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Domestic Chemicals</text>
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400e">• Baking Soda:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10" fill="#334155">NaHCO3</text>
    <text x="15" y="106" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400e">• Washing Soda:</text>
    <text x="25" y="124" font-family="system-ui, sans-serif" font-size="10" fill="#334155">Na2CO3 · 10H2O</text>
    <text x="15" y="146" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400e">• Plaster of Paris:</text>
    <text x="25" y="164" font-family="system-ui, sans-serif" font-size="10" fill="#334155">CaSO4 · 1/2H2O</text>
    <text x="15" y="186" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400e">• Bleaching Powder:</text>
    <text x="25" y="204" font-family="system-ui, sans-serif" font-size="10" fill="#334155">CaOCl2</text>
  </g>

  <!-- Box 3: Alloys & Acids -->
  <g transform="translate(480, 60)" filter="url(#shadowEvery)">
    <rect width="180" height="230" rx="8" fill="#ffffff" stroke="#fde68a" stroke-width="1.5"/>
    <rect width="180" height="38" rx="8" fill="#047857"/>
    <text x="90" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Alloys & Acids</text>
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Brass: Cu + Zn</text>
    <text x="15" y="88" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Bronze: Cu + Sn</text>
    <text x="15" y="110" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Solder: Pb + Sn</text>
    <text x="15" y="134" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Vinegar: Acetic Acid</text>
    <text x="15" y="156" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Ant Sting: Methanoic Acid</text>
    <text x="15" y="178" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">• Galvanizing: Zinc coat</text>
    <text x="15" y="202" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Amalgam = Alloy with Hg</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u5-we3",
        questionNumber: 1,
        question:
          "Why does the clear daytime sky appear blue to an observer on the Earth's surface?",
        options: [
          { id: "A", text: "Because blue light is absorbed by atmospheric water vapor" },
          { id: "B", text: "Because blue light has a shorter wavelength and is scattered much more by air molecules than red light" },
          { id: "C", text: "Due to total internal reflection of sunlight in clouds" },
          { id: "D", text: "Because the ocean reflects blue light into the atmosphere" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Sunlight consists of a spectrum of colors ranging from violet/blue (short wavelength) to red (long wavelength).",
          "Step 2: According to Rayleigh's law of scattering, the amount of scattering is inversely proportional to the fourth power of wavelength (I ∝ 1/λ^4).",
          "Step 3: Blue light, having a much shorter wavelength (~400-450 nm) than red light (~650-700 nm), is scattered roughly 10 times more effectively by atmospheric nitrogen and oxygen molecules.",
          "Step 4: This scattered blue light reaches our eyes from all directions in the clear daytime sky.",
        ],
        cuetInsight:
          "Rayleigh scattering (I ∝ 1/λ^4) is tested repeatedly across Physics and General Test sections.",
      },
      {
        id: "general-test-u5-we4",
        questionNumber: 2,
        question:
          "Which acid is naturally injected into human skin during the painful sting of a honeybee or ant, causing burning sensation and inflammation?",
        options: [
          { id: "A", text: "Acetic acid" },
          { id: "B", text: "Methanoic acid (Formic acid)" },
          { id: "C", text: "Oxalic acid" },
          { id: "D", text: "Tartaric acid" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Recall the chemical nature of insect venoms.",
          "Step 2: Ant stings (Formica) and bee stings inject methanoic acid (commonly known as formic acid, HCOOH).",
          "Step 3: This acidic irritation is traditionally relieved by applying a mild basic substance such as moist baking soda (sodium hydrogen carbonate) or calamine lotion (zinc carbonate).",
        ],
        cuetInsight:
          "Organic acid sources (vinegar, curd, ant sting, tomato) are perennial matching questions in CUET.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "Acid Source Matching",
        frequency: "Very High",
        typicalStem: "Match List-I (Natural Source) with List-II (Acid Present): Vinegar, Sour Milk/Curd, Tamarind, Tomato.",
        strategy: "Vinegar (Acetic), Curd (Lactic), Tamarind (Tartaric), Tomato (Oxalic).",
      },
      {
        patternType: "Common Chemical Name to Formula",
        frequency: "High",
        typicalStem: "What is the chemical formula of Plaster of Paris?",
        strategy: "CaSO4·1/2H2O (Calcium sulfate hemihydrate).",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing Baking Soda and Washing Soda",
        whyStudentsFail: "Mixing up NaHCO3 (Baking soda) with Na2CO3·10H2O (Washing soda).",
        howToAvoid: "Remember: 'BI' in Baking Soda -> Bicarbonate (NaHCO3).",
      },
      {
        trap: "Brass vs. Bronze constituents",
        whyStudentsFail: "Thinking Bronze has Zinc and Brass has Tin.",
        howToAvoid: "Brass has 'Z'inc; Bronze has 'Sn' (Tin).",
      },
    ],
    mnemonics: [
      {
        concept: "Baking Soda Formula",
        mnemonic: "B-I (Baking = Bicarbonate)",
        explanation:
          "Baking soda is Sodium Bicarbonate (NaHCO3).",
      },
      {
        concept: "Bronze vs Brass",
        mnemonic: "Bronze = Tin (Sn) | Brass = Zinc (Zn)",
        explanation:
          "Copper is common to both; Bronze pairs with Tin, Brass with Zinc.",
      },
    ],
    quickRevisionCard: {
      title: "Everyday Science High-Yield Points",
      bulletPoints: [
        "Blue sky: Rayleigh scattering (I ∝ 1/λ^4).",
        "Mirage & Optical fiber: Total Internal Reflection.",
        "Twinkling of stars: Atmospheric refraction.",
        "Baking Soda: NaHCO3 (Sodium hydrogen carbonate).",
        "Washing Soda: Na2CO3·10H2O; Plaster of Paris: CaSO4·1/2H2O.",
        "Brass: Cu + Zn; Bronze: Cu + Sn; Solder: Pb + Sn.",
        "Ant sting: Methanoic (formic) acid; neutralized with baking soda.",
        "Galvanization: Coating iron with Zinc to prevent rusting.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u5-t2-q1",
        question:
          "What is the chemical name and formula of 'Baking Soda' commonly used in kitchens?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Sodium carbonate, Na2CO3" },
          { id: "B", text: "Sodium hydrogen carbonate, NaHCO3" },
          { id: "C", text: "Calcium hypochlorite, CaOCl2" },
          { id: "D", text: "Sodium hydroxide, NaOH" },
        ],
        correctOption: "B",
        explanation:
          "Baking soda is sodium hydrogen carbonate (also called sodium bicarbonate), with the molecular formula NaHCO3.",
      },
      {
        id: "general-test-u5-t2-q2",
        question:
          "Brass is a homogeneous metallic alloy composed of:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Copper and Tin" },
          { id: "B", text: "Copper and Zinc" },
          { id: "C", text: "Lead and Tin" },
          { id: "D", text: "Copper and Nickel" },
        ],
        correctOption: "B",
        explanation:
          "Brass is an alloy of copper (Cu) and zinc (Zn). Bronze is an alloy of copper (Cu) and tin (Sn).",
      },
      {
        id: "general-test-u5-t2-q3",
        question:
          "The sparkling brilliance of a cut diamond and the signal transmission through optical fiber cables are based on:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Atmospheric scattering" },
          { id: "B", text: "Total Internal Reflection (TIR)" },
          { id: "C", text: "Diffraction" },
          { id: "D", text: "Interference of light" },
        ],
        correctOption: "B",
        explanation:
          "Both diamond brilliance and fiber optic propagation depend on Total Internal Reflection occurring when light strikes internal boundaries at angles exceeding the critical angle.",
      },
      {
        id: "general-test-u5-t2-q4",
        question:
          "Which acid is present in commercial vinegar used for cooking and pickling?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Citric acid" },
          { id: "B", text: "Acetic acid (Ethanoic acid)" },
          { id: "C", text: "Lactic acid" },
          { id: "D", text: "Formic acid" },
        ],
        correctOption: "B",
        explanation:
          "Vinegar is an aqueous solution containing approximately 5% to 8% acetic acid (CH3COOH).",
      },
      {
        id: "general-test-u5-t2-q5",
        question:
          "Assertion (A): Galvanization is widely used to protect structural iron sheets from rusting.\nReason (R): Iron is electroplated or dipped in molten zinc, which acts as a sacrificial anode and forms an impermeable barrier.",
        type: "assertion-reason",
        difficulty: "medium",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation:
          "Both statements are true and (R) correctly explains how the sacrificial zinc layer prevents atmospheric oxidation of iron.",
      },
      {
        id: "general-test-u5-t2-q6",
        question:
          "Match List-I (Natural Source) with List-II (Dominant Organic Acid):\n(P) Vinegar — 1. Acetic Acid\n(Q) Sour Milk / Curd — 2. Lactic Acid\n(R) Tamarind — 3. Tartaric Acid\n(S) Tomato — 4. Oxalic Acid",
        type: "match-the-following",
        difficulty: "easy",
        options: [
          { id: "A", text: "P-1, Q-2, R-3, S-4" },
          { id: "B", text: "P-2, Q-1, R-4, S-3" },
          { id: "C", text: "P-1, Q-3, R-2, S-4" },
          { id: "D", text: "P-4, Q-2, R-1, S-3" },
        ],
        correctOption: "A",
        explanation:
          "Standard organic acid classifications in food chemistry.",
      },
      {
        id: "general-test-u5-t2-q7",
        question:
          "What is the chemical formula of Plaster of Paris (POP)?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "CaSO4 · 2H2O" },
          { id: "B", text: "CaSO4 · 1/2H2O" },
          { id: "C", text: "CaSO4 · 5H2O" },
          { id: "D", text: "CaCO3" },
        ],
        correctOption: "B",
        explanation:
          "Plaster of Paris is calcium sulfate hemihydrate with the chemical formula CaSO4·1/2H2O. CaSO4·2H2O is gypsum.",
      },
      {
        id: "general-test-u5-t2-q8",
        question:
          "Why does an optical mirage occur in deserts or hot asphalt roads during summer?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Total Internal Reflection due to temperature gradients in air layers" },
          { id: "B", text: "Diffraction of light through sand particles" },
          { id: "C", text: "Scattering of light by ozone" },
          { id: "D", text: "Polarization of light rays" },
        ],
        correctOption: "A",
        explanation:
          "Ground air is hotter and less dense than upper air. Light rays from the sky bend progressively away from the normal until the angle exceeds the critical angle, undergoing total internal reflection and creating the illusion of a water pool.",
      },
      {
        id: "general-test-u5-t2-q9",
        question:
          "Which of the following alloys is specifically used for soldering electrical connections due to its low melting point?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Bronze" },
          { id: "B", text: "Brass" },
          { id: "C", text: "Solder (Tin and Lead)" },
          { id: "D", text: "Stainless Steel" },
        ],
        correctOption: "C",
        explanation:
          "Solder is an alloy of tin (Sn) and lead (Pb) that has a low melting point, making it ideal for joining electrical circuits.",
      },
      {
        id: "general-test-u5-t2-q10",
        question:
          "The advance sunrise (2 minutes before actual sunrise) and delayed sunset (2 minutes after actual sunset) are optical phenomena caused by:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Atmospheric Refraction" },
          { id: "B", text: "Total Internal Reflection" },
          { id: "C", text: "Rayleigh Scattering" },
          { id: "D", text: "Dispersion of Light" },
        ],
        correctOption: "A",
        explanation:
          "Atmospheric refraction bends sunlight around the curvature of the Earth, making the sun visible about 2 minutes before it physically crosses the horizon and 2 minutes after it sets.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["basic-scientific-principles", "environmental-conservation"],
      practiceTestId: "practice-general-test-unit5-test1",
      practiceTestUrl: "/test/practice-general-test-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 5 - TOPIC 3: Environmental Conservation
  {
    id: "general-test-unit5-environmental-conservation",
    slug: "environmental-conservation",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 5,
    unitTitle: "General Science & Environment Literacy",
    topicTitle: "Environmental Conservation",
    ncertReference: {
      book: "CUET General Test / Environmental Literacy & Ecology",
      chapter: "Section 20: Biodiversity Hotspots, Protected Areas & Conservation Protocols",
      pages: "Pages 699-734",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 92,
      weightagePercentage: 12.0,
    },
    thirtySecondSummary: [
      "Environmental Conservation explores ecosystem preservation, protected area networks (National Parks, Sanctuaries, Biosphere Reserves), biodiversity hotspots, and international environmental treaties.",
      "In-situ vs. Ex-situ Conservation: In-situ protects species in natural habitats (National Parks, Wildlife Sanctuaries, Biosphere Reserves, Sacred Groves); Ex-situ protects species in human-managed facilities (Zoological parks, Botanical gardens, Seed banks, Cryopreservation).",
      "Biodiversity Hotspots in India: 4 major zones: Western Ghats, Eastern Himalayas, Indo-Burma region, and Sundaland (Nicobar Islands). Must satisfy Norman Myers' criteria (high endemism + >70% habitat loss).",
      "Pivotal Environmental Acts in India: Wildlife Protection Act (1972), Water Act (1974), Forest Conservation Act (1980), Air Act (1981), Environment Protection Act (1986).",
      "Global Treaties & Ramsar Sites: Ramsar Convention on Wetlands (1971), Montreal Protocol on Ozone Layer (1987), Kyoto Protocol (1997), Paris Climate Agreement (2015).",
    ],
    coreConcepts: [
      {
        title: "In-situ vs. Ex-situ Conservation Strategies",
        explanation:
          "Biodiversity conservation is partitioned into two fundamental strategic methods:\n1. In-situ Conservation (On-Site Preservation):\n  - Protecting endangered species within their natural ecosystems and habitats.\n  - National Parks: Highest legal protection; no human exploitation or grazing permitted (e.g., Jim Corbett - 1st national park in India, Kaziranga - one-horned rhino).\n  - Wildlife Sanctuaries: Regulated human activities allowed (e.g., Bharatpur/Keoladeo).\n  - Biosphere Reserves: MAB programme of UNESCO with Core, Buffer, and Transition zones (e.g., Nilgiri - 1st biosphere reserve in India, 1986).\n  - Sacred Groves: Culturally protected pristine forest patches (Khasi & Jaintia hills, Aravalli hills).\n2. Ex-situ Conservation (Off-Site Preservation):\n  - Relocating threatened organisms to specialized artificial facilities.\n  - Examples: Botanical Gardens, Zoological Parks, Wildlife Safari Parks, Seed Banks, Cryopreservation (-196°C in liquid nitrogen).",
        keyTakeaways: [
          "In-situ = Natural habitat (National Parks, Biosphere Reserves, Sacred Groves).",
          "Ex-situ = Off-site facilities (Zoological parks, Botanical gardens, Seed banks, Cryopreservation).",
          "First National Park: Jim Corbett (1936). First Biosphere Reserve: Nilgiri (1986).",
        ],
        ncertPointer:
          "NCERT Biology Class XII, Biodiversity and Conservation, pp. 258-270.",
      },
      {
        title: "Biodiversity Hotspots and Megadiverse Criteria",
        explanation:
          "Norman Myers formulated strict biogeographic qualifications for Biodiversity Hotspots:\n1. Two Obligatory Criteria:\n  - Must contain at least 1,500 species of vascular plants as endemics (>0.5% of the world's total).\n  - Must have lost at least 70% of its original primary native vegetation (high threat level).\n2. Global & Indian Hotspots:\n  - There are 36 global biodiversity hotspots.\n  - Four extend into India: 1. The Western Ghats (and Sri Lanka); 2. The Eastern Himalayas; 3. Indo-Burma region; 4. Sundaland (incorporates Nicobar Islands).\n3. Endemism: Species restricted exclusively to a specific geographic territory and found nowhere else on Earth (e.g., Lion-tailed macaque in Western Ghats).",
        keyTakeaways: [
          "Hotspot criteria: ≥1500 endemic plant species AND ≥70% habitat lost.",
          "4 Hotspots in India: Western Ghats, Eastern Himalayas, Indo-Burma, Sundaland.",
          "Endemic = Confined to a particular geographic region.",
        ],
        ncertPointer:
          "NCERT Biology Class XII, Global Biodiversity & Endemism, pp. 261-265.",
      },
      {
        title: "Indian Environmental Legislation and Global Conventions",
        explanation:
          "Legal safeguards enacted for ecological preservation:\n1. Landmark Indian Acts:\n  - Wildlife (Protection) Act, 1972: Establishes schedules of protected wildlife and mandates National Parks and Sanctuaries; launched Project Tiger (1973).\n  - Environment (Protection) Act, 1986: Enacted under Article 253 following the Bhopal Gas Tragedy (1984); serves as the overarching umbrella environmental legislation.\n  - Forest (Conservation) Act, 1980; Air (Prevention & Control of Pollution) Act, 1981.\n2. Key Global Conventions:\n  - Ramsar Convention, 1971: Conservation and wise use of wetlands (World Wetlands Day: Feb 2).\n  - Montreal Protocol, 1987: Phasing out ozone-depleting substances (CFCs, halons).\n  - Kyoto Protocol, 1997: Legally binding greenhouse gas emission reduction targets for developed nations.\n  - Paris Agreement, 2015: Limiting global temperature rise to well below 2°C, preferably 1.5°C above pre-industrial levels.",
        keyTakeaways: [
          "Environment Protection Act: 1986 (Umbrella legislation post-Bhopal tragedy).",
          "Project Tiger: Launched 1973.",
          "Montreal Protocol (1987) = Ozone layer; Kyoto Protocol (1997) = Greenhouse gases.",
        ],
        ncertPointer:
          "NCERT Biology Class XII, Environmental Issues & Treaties, pp. 272-286.",
      },
    ],
    keyFacts: [
      {
        concept: "In-situ vs Ex-situ",
        formulaOrFact: "In-situ: On-site (National Parks) | Ex-situ: Off-site (Seed banks, Zoos)",
        explanation: "Fundamental dichotomy examined in almost every environmental paper.",
        examTip: "Seed banks and botanical gardens are ALWAYS ex-situ.",
      },
      {
        concept: "4 Indian Biodiversity Hotspots",
        formulaOrFact: "Western Ghats, Eastern Himalayas, Indo-Burma, Sundaland",
        explanation: "Critical zones containing vast endemic flora and fauna.",
        examTip: "CUET asks 'Which of the following is NOT an Indian biodiversity hotspot?'.",
      },
      {
        concept: "Montreal vs Kyoto Protocol",
        formulaOrFact: "Montreal (1987) = Ozone Depletion | Kyoto (1997) = Climate Change / Carbon",
        explanation: "The two most famous UN environmental treaties.",
        examTip: "Never confuse ozone protection with greenhouse gas reduction.",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="ecoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <filter id="shadowEco" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f0fdf4" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#064e3b">Conservation Architecture: In-Situ vs. Ex-Situ & Treaties</text>

  <!-- Left: In-Situ -->
  <g transform="translate(45, 60)" filter="url(#shadowEco)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="url(#ecoGrad)"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">In-Situ (On-Site Preservation)</text>
    
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• National Parks (No grazing/human activity):</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Jim Corbett (1st), Kaziranga (Rhinos)</text>
    
    <text x="15" y="110" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Wildlife Sanctuaries (Limited activity):</text>
    <text x="25" y="128" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Regulated collection & habitat protection</text>

    <text x="15" y="154" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Biosphere Reserves (MAB Zones):</text>
    <text x="25" y="172" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Nilgiri (1st, 1986), Nanda Devi, Sundarbans</text>

    <text x="15" y="198" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Sacred Groves:</text>
    <text x="25" y="214" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Cultural forest protection (Meghalaya, Aravalli)</text>
  </g>

  <!-- Right: Ex-Situ & Protocols -->
  <g transform="translate(370, 60)" filter="url(#shadowEco)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="#065f46"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Ex-Situ & Global Protocols</text>
    
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Ex-Situ Mechanisms:</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Zoological Parks & Botanical Gardens</text>
    <text x="25" y="100" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Seed Banks & Cryopreservation (-196°C)</text>

    <text x="15" y="128" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Landmark Environmental Acts:</text>
    <text x="25" y="146" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Wildlife Protection 1972 | Project Tiger 1973</text>
    <text x="25" y="162" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Environment Protection Act 1986 (Umbrella)</text>

    <text x="15" y="190" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065f46">• Global Treaties:</text>
    <text x="25" y="208" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Montreal 1987 (Ozone) | Kyoto 1997 (GHG)</text>
    <text x="25" y="224" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Ramsar 1971 (Wetlands) | Paris 2015 (1.5°C)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u5-we5",
        questionNumber: 1,
        question:
          "Which of the following conservation methods is an example of 'Ex-situ' biodiversity conservation?",
        options: [
          { id: "A", text: "National Park" },
          { id: "B", text: "Biosphere Reserve" },
          { id: "C", text: "Wildlife Sanctuary" },
          { id: "D", text: "Cryopreservation of gametes in seed banks" },
        ],
        correctOption: "D",
        solutionStepByStep: [
          "Step 1: Distinguish between In-situ and Ex-situ conservation:\n  - In-situ: Conservation within the natural habitat (National parks, sanctuaries, biosphere reserves).\n  - Ex-situ: Conservation outside the natural habitat in human-managed conditions.",
          "Step 2: National Parks, Biosphere Reserves, and Wildlife Sanctuaries protect animals in their natural wilderness (In-situ).",
          "Step 3: Cryopreservation stores genetic material, seeds, and gametes at ultra-low temperatures (-196°C) in artificial laboratory banks. This is Ex-situ conservation.",
        ],
        cuetInsight:
          "CUET tests the in-situ vs. ex-situ classification in every exam session.",
      },
      {
        id: "general-test-u5-we6",
        questionNumber: 2,
        question:
          "The Montreal Protocol, signed in 1987, is a landmark international environmental treaty focused specifically on:",
        options: [
          { id: "A", text: "Regulating international hazardous waste trade" },
          { id: "B", text: "Phasing out substances that deplete the stratospheric ozone layer" },
          { id: "C", text: "Setting carbon emission quotas for developing nations" },
          { id: "D", text: "Conservation of migratory wild birds" },
        ],
        correctOption: "B",
        solutionStepByStep: [
          "Step 1: Recall landmark environmental protocols:\n  - Montreal Protocol (1987): Designed to phase out ozone-depleting substances, primarily chlorofluorocarbons (CFCs) and halons.\n  - Basel Convention: Transboundary movements of hazardous wastes.\n  - Kyoto Protocol & Paris Agreement: Greenhouse gases and global climate change.",
          "Step 2: Conclude that Option B accurately describes the Montreal Protocol.",
        ],
        cuetInsight:
          "Treaty-objective matching is a classic CUET General Test pattern.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "In-situ vs. Ex-situ Classification",
        frequency: "Very High",
        typicalStem: "Which one of the following is NOT an in-situ method of conservation?",
        strategy: "Look for Botanical Garden, Zoo, or Seed Bank.",
      },
      {
        patternType: "National Environmental Act Year",
        frequency: "High",
        typicalStem: "Match the Indian Environmental Act with its enactment year.",
        strategy: "Wildlife Act (1972), Water Act (1974), Forest Act (1980), Air Act (1981), Environment Act (1986).",
      },
    ],
    commonTraps: [
      {
        trap: "Classifying Sacred Groves as Ex-situ",
        whyStudentsFail: "Thinking sacred groves are man-made gardens, whereas they are pristine natural forest tracts protected by indigenous cultural taboos (In-situ).",
        howToAvoid: "Sacred groves are natural forest habitats -> In-situ.",
      },
      {
        trap: "Confusing Project Tiger year with Wildlife Act",
        whyStudentsFail: "Wildlife Protection Act was enacted in 1972; Project Tiger was launched in 1973.",
        howToAvoid: "Remember: Act first (1972), Project launched next (1973).",
      },
    ],
    mnemonics: [
      {
        concept: "Environmental Acts Chronology",
        mnemonic: "Wild-Water-Forest-Air-Environment (72, 74, 80, 81, 86)",
        explanation:
          "Wildlife (1972), Water (1974), Forest (1980), Air (1981), Environment Protection Act (1986).",
      },
    ],
    quickRevisionCard: {
      title: "Environmental Conservation High-Yield Points",
      bulletPoints: [
        "In-situ: National Parks, Wildlife Sanctuaries, Biosphere Reserves, Sacred Groves.",
        "Ex-situ: Zoos, Botanical Gardens, Seed Banks, Cryopreservation.",
        "First National Park: Jim Corbett (1936); First Biosphere Reserve: Nilgiri (1986).",
        "Biodiversity Hotspots (India): Western Ghats, Eastern Himalayas, Indo-Burma, Sundaland.",
        "Wildlife Protection Act: 1972; Project Tiger: 1973.",
        "Environment Protection Act: 1986 (Enacted after Bhopal Gas Tragedy).",
        "Ramsar (1971) = Wetlands; Montreal (1987) = Ozone; Kyoto (1997) = Climate Change.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u5-t3-q1",
        question:
          "Which was the first national park established in India in 1936, originally named Hailey National Park?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Kaziranga National Park" },
          { id: "B", text: "Jim Corbett National Park" },
          { id: "C", text: "Kanha National Park" },
          { id: "D", text: "Gir National Park" },
        ],
        correctOption: "B",
        explanation:
          "Jim Corbett National Park in Uttarakhand was established in 1936 as Hailey National Park, making it India's oldest national park.",
      },
      {
        id: "general-test-u5-t3-q2",
        question:
          "Which of the following is NOT an in-situ method of biodiversity conservation?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "National Park" },
          { id: "B", text: "Biosphere Reserve" },
          { id: "C", text: "Botanical Garden" },
          { id: "D", text: "Sacred Grove" },
        ],
        correctOption: "C",
        explanation:
          "Botanical gardens maintain living plant collections in an artificial, human-managed facility outside their natural ecosystem, making it an Ex-situ conservation method.",
      },
      {
        id: "general-test-u5-t3-q3",
        question:
          "The Environment (Protection) Act of India was enacted in which year, following the catastrophic Bhopal Gas Tragedy?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "1972" },
          { id: "B", text: "1980" },
          { id: "C", text: "1986" },
          { id: "D", text: "1992" },
        ],
        correctOption: "C",
        explanation:
          "The Environment (Protection) Act was passed by the Parliament of India in May 1986 under Article 253, providing an umbrella legislative framework.",
      },
      {
        id: "general-test-u5-t3-q4",
        question:
          "In which year was 'Project Tiger' officially launched in India to protect the endangered Royal Bengal Tiger?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "1971" },
          { id: "B", text: "1973" },
          { id: "C", text: "1982" },
          { id: "D", text: "1990" },
        ],
        correctOption: "B",
        explanation:
          "Project Tiger was launched on April 1, 1973, by the Government of India from Jim Corbett National Park during Prime Minister Indira Gandhi's tenure.",
      },
      {
        id: "general-test-u5-t3-q5",
        question:
          "Assertion (A): The Western Ghats region of India is recognized as a global biodiversity hotspot.\nReason (R): It harbors exceptional levels of endemic plant and animal species and has suffered severe habitat degradation exceeding 70% of its original cover.",
        type: "assertion-reason",
        difficulty: "medium",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation:
          "Both statements are true and (R) provides the exact criteria defined by Norman Myers for designating biodiversity hotspots.",
      },
      {
        id: "general-test-u5-t3-q6",
        question:
          "Match List-I (International Convention) with List-II (Core Subject):\n(P) Ramsar Convention (1971) — 1. Conservation of Wetlands\n(Q) Montreal Protocol (1987) — 2. Protection of Ozone Layer\n(R) Kyoto Protocol (1997) — 3. Reduction of Greenhouse Gases\n(S) Basel Convention (1989) — 4. Transboundary Movement of Hazardous Wastes",
        type: "match-the-following",
        difficulty: "medium",
        options: [
          { id: "A", text: "P-1, Q-2, R-3, S-4" },
          { id: "B", text: "P-2, Q-1, R-4, S-3" },
          { id: "C", text: "P-1, Q-3, R-2, S-4" },
          { id: "D", text: "P-4, Q-2, R-1, S-3" },
        ],
        correctOption: "A",
        explanation:
          "Standard global multilateral environmental agreements.",
      },
      {
        id: "general-test-u5-t3-q7",
        question:
          "Which was the first Biosphere Reserve designated in India under UNESCO's Man and the Biosphere (MAB) programme in 1986?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Nanda Devi Biosphere Reserve" },
          { id: "B", text: "Sundarbans Biosphere Reserve" },
          { id: "C", text: "Nilgiri Biosphere Reserve" },
          { id: "D", text: "Gulf of Mannar Biosphere Reserve" },
        ],
        correctOption: "C",
        explanation:
          "The Nilgiri Biosphere Reserve, spanning parts of Tamil Nadu, Kerala, and Karnataka, was established in September 1986 as India's first biosphere reserve.",
      },
      {
        id: "general-test-u5-t3-q8",
        question:
          "Which of the following is an endemic primate species found exclusively in the tropical rainforests of the Western Ghats?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "Golden Langur" },
          { id: "B", text: "Lion-tailed Macaque" },
          { id: "C", text: "Rhesus Macaque" },
          { id: "D", text: "Hoolock Gibbon" },
        ],
        correctOption: "B",
        explanation:
          "The lion-tailed macaque (Macaca silenus) is an endangered Old World monkey endemic to the evergreen rain forests of the Western Ghats.",
      },
      {
        id: "general-test-u5-t3-q9",
        question:
          "World Wetlands Day is celebrated globally every year on which date to mark the adoption of the Ramsar Convention?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "February 2" },
          { id: "B", text: "March 22" },
          { id: "C", text: "April 22" },
          { id: "D", text: "June 5" },
        ],
        correctOption: "A",
        explanation:
          "World Wetlands Day is commemorated annually on February 2, the date the Ramsar Convention was signed in Ramsar, Iran in 1971.",
      },
      {
        id: "general-test-u5-t3-q10",
        question:
          "Kaziranga National Park in Assam is globally famous for protecting the largest population of which threatened megafauna?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Asiatic Lion" },
          { id: "B", text: "Great Indian One-Horned Rhinoceros" },
          { id: "C", text: "Snow Leopard" },
          { id: "D", text: "Sangai Deer" },
        ],
        correctOption: "B",
        explanation:
          "Kaziranga National Park hosts around two-thirds of the world's population of the great Indian one-horned rhinoceros (Rhinoceros unicornis).",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["sustainable-development", "everyday-physics-and-chemistry"],
      practiceTestId: "practice-general-test-unit5-test1",
      practiceTestUrl: "/test/practice-general-test-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },

  // UNIT 5 - TOPIC 4: Sustainable Development
  {
    id: "general-test-unit5-sustainable-development",
    slug: "sustainable-development",
    subject: "general-test",
    subjectName: "General Aptitude Test",
    subjectCode: "501",
    unitNumber: 5,
    unitTitle: "General Science & Environment Literacy",
    topicTitle: "Sustainable Development",
    ncertReference: {
      book: "CUET General Test / Sustainable Development & Renewable Energy",
      chapter: "Section 21: UN SDGs 2030, Carbon Footprint & Green Energy Transition",
      pages: "Pages 735-772",
    },
    pyqFrequency: {
      examYears: ["2022", "2023", "2024", "2025"],
      totalAppearances: 94,
      weightagePercentage: 12.5,
    },
    thirtySecondSummary: [
      "Sustainable Development assesses the balance between human socioeconomic progress and the long-term ecological preservation of the planetary biosphere.",
      "Brundtland Commission (1987): 'Our Common Future' defined sustainable development as development that meets the needs of the present without compromising the ability of future generations to meet their own needs.",
      "UN Sustainable Development Goals (SDGs 2030): 17 global goals and 169 targets adopted by the UN in 2015 (SDG 1: No Poverty, SDG 3: Good Health, SDG 4: Quality Education, SDG 5: Gender Equality, SDG 7: Clean Energy, SDG 13: Climate Action).",
      "Renewable Energy & Panchamrit Targets: India's commitments at COP26 Glasgow: 500 GW non-fossil energy capacity by 2030, 50% energy from renewables, and Net-Zero carbon emissions by 2070.",
      "Green Hydrogen & Solar Alliances: International Solar Alliance (ISA - headquartered in Gurugram, India); National Green Hydrogen Mission targeting 5 MMT annual production by 2030.",
    ],
    coreConcepts: [
      {
        title: "The Brundtland Definition and the 3 Pillars of Sustainability",
        explanation:
          "The theoretical architecture of sustainable development rests on three interdependent dimensions:\n1. Origin & Definition: Coined by the World Commission on Environment and Development (WCED) chaired by Gro Harlem Brundtland in the 1987 landmark report 'Our Common Future':\n  - 'Sustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs.'\n2. The Triple Bottom Line (3Ps - People, Planet, Profit):\n  - Social Equity (People): Fair access to health, education, gender equality, and poverty eradication.\n  - Environmental Protection (Planet): Conserving natural capital, preserving biodiversity, and reducing greenhouse emissions.\n  - Economic Viability (Profit): Equitable wealth creation and efficient resource utilization without predatory exploitation.",
        keyTakeaways: [
          "Brundtland Report (1987): 'Our Common Future'.",
          "Inter-generational equity: Securing resources for future generations.",
          "Three pillars: Social, Environmental, Economic (People, Planet, Profit).",
        ],
        ncertPointer:
          "NCERT Economics & Geography Class XII, Sustainable Resource Planning, pp. 1-25.",
      },
      {
        title: "United Nations 17 Sustainable Development Goals (SDGs 2030)",
        explanation:
          "Adopted at the 2015 UN General Assembly under Agenda 2030, replacing the Millennium Development Goals (MDGs):\n- SDG 1: No Poverty\n- SDG 2: Zero Hunger\n- SDG 3: Good Health and Well-being\n- SDG 4: Quality Education\n- SDG 5: Gender Equality\n- SDG 6: Clean Water and Sanitation\n- SDG 7: Affordable and Clean Energy\n- SDG 8: Decent Work and Economic Growth\n- SDG 9: Industry, Innovation, and Infrastructure\n- SDG 10: Reduced Inequalities\n- SDG 11: Sustainable Cities and Communities\n- SDG 12: Responsible Consumption and Production\n- SDG 13: Climate Action\n- SDG 14: Life Below Water (Marine ecosystems)\n- SDG 15: Life on Land (Terrestrial ecosystems)\n- SDG 16: Peace, Justice, and Strong Institutions\n- SDG 17: Partnerships for the Goals.",
        keyTakeaways: [
          "17 Goals, 169 Targets, Target deadline: 2030.",
          "SDG 4 = Quality Education; SDG 5 = Gender Equality.",
          "SDG 7 = Clean Energy; SDG 13 = Climate Action.",
        ],
        ncertPointer:
          "CUET General Test Annual Review, UN Agenda 2030 & SDGs, pp. 740-754.",
      },
      {
        title: "India's Climate Commitments (Panchamrit) and Clean Energy Transition",
        explanation:
          "National roadmaps driving decarbonization:\n1. Panchamrit Pledge (Announced at COP26 Glasgow by India):\n  - 1. Reach 500 GW of non-fossil energy capacity by 2030.\n  - 2. Fulfill 50% of energy requirements from renewable energy by 2030.\n  - 3. Reduce total projected carbon emissions by 1 billion tonnes from now until 2030.\n  - 4. Reduce carbon intensity of GDP by 45% by 2030 (over 2005 levels).\n  - 5. Achieve Net-Zero carbon emissions by 2070.\n2. International Solar Alliance (ISA):\n  - Joint initiative launched by India and France at COP21 in Paris (2015).\n  - Headquartered at the National Institute of Solar Energy (NISE) in Gurugram, Haryana.\n3. National Green Hydrogen Mission:\n  - Approved by Union Cabinet with an outlay of ₹19,744 crore; aims to produce at least 5 MMT (Million Metric Tonnes) of green hydrogen per annum by 2030.",
        keyTakeaways: [
          "Net-Zero Target for India: 2070.",
          "500 GW non-fossil fuel capacity target by 2030.",
          "ISA headquarters: Gurugram, Haryana, India.",
        ],
        ncertPointer:
          "Ministry of New & Renewable Energy, National Energy Transition Roadmaps, pp. 24-52.",
      },
    ],
    keyFacts: [
      {
        concept: "Net-Zero Year for India",
        formulaOrFact: "2070",
        explanation: "Panchamrit commitment announced at COP26 in Glasgow.",
        examTip: "High-frequency numerical year tested in current environmental affairs.",
      },
      {
        concept: "ISA Headquarters",
        formulaOrFact: "Gurugram, Haryana (India)",
        explanation: "First treaty-based international intergovernmental organization headquartered in India.",
        examTip: "Perennial GK question on international bodies in India.",
      },
      {
        concept: "Brundtland Report",
        formulaOrFact: "1987: 'Our Common Future'",
        explanation: "Formulated the foundational definition of sustainable development.",
        examTip: "Direct match-the-following on environmental history.",
      },
      {
        concept: "Number of UN SDGs",
        formulaOrFact: "17 Goals & 169 Targets (Agenda 2030)",
        explanation: "Adopted by 193 UN member states in 2015.",
        examTip: "CUET asks to match specific goal numbers (e.g., SDG 4, SDG 13).",
      },
    ],
    diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" width="100%" height="100%">
  <defs>
    <linearGradient id="sdgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <filter id="shadowSDG" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f8fafc" rx="10"/>
  <text x="350" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#0f172a">Sustainable Development: UN SDGs 2030 & India's Panchamrit</text>

  <!-- Left: The 3 Pillars -->
  <g transform="translate(45, 60)" filter="url(#shadowSDG)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="url(#sdgGrad)"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">Triple Bottom Line (3Ps)</text>
    
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0284c7">• 1. Social Equity (People):</text>
    <text x="25" y="84" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Poverty (SDG 1), Education (SDG 4)</text>
    <text x="25" y="98" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Gender Equality (SDG 5)</text>

    <text x="15" y="122" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#047857">• 2. Environmental (Planet):</text>
    <text x="25" y="140" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Clean Energy (SDG 7), Climate (SDG 13)</text>
    <text x="25" y="154" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Life Below Water (14), On Land (15)</text>

    <text x="15" y="178" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#b45309">• 3. Economic Viability (Profit):</text>
    <text x="25" y="196" font-family="system-ui, sans-serif" font-size="10.5" fill="#334155">Decent Work (SDG 8), Innovation (SDG 9)</text>
    <text x="15" y="220" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Brundtland (1987): 'Our Common Future'</text>
  </g>

  <!-- Right: India's Panchamrit Targets -->
  <g transform="translate(370, 60)" filter="url(#shadowSDG)">
    <rect width="285" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="285" height="38" rx="8" fill="#047857"/>
    <text x="142" y="24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">India's Panchamrit at COP26</text>
    
    <text x="15" y="66" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">1. 500 GW Non-Fossil Capacity by 2030</text>
    <text x="15" y="90" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">2. 50% Energy from Renewables by 2030</text>
    <text x="15" y="114" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">3. Reduce 1 Billion Tonnes CO2 by 2030</text>
    <text x="15" y="138" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#047857">4. 45% Carbon Intensity Reduction by 2030</text>
    <text x="15" y="162" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#dc2626">5. Net-Zero Carbon Emissions by 2070</text>

    <rect x="15" y="180" width="255" height="38" rx="4" fill="#ecfdf5" stroke="#10b981"/>
    <text x="142" y="196" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#065f46" text-anchor="middle">International Solar Alliance (ISA):</text>
    <text x="142" y="210" font-family="system-ui, sans-serif" font-size="9.5" fill="#047857" text-anchor="middle">HQ in Gurugram, Haryana (India)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        id: "general-test-u5-we7",
        questionNumber: 1,
        question:
          "By which year has India pledged to achieve Net-Zero carbon emissions under its 'Panchamrit' climate action commitments announced at COP26 in Glasgow?",
        options: [
          { id: "A", text: "2047" },
          { id: "B", text: "2050" },
          { id: "C", text: "2060" },
          { id: "D", text: "2070" },
        ],
        correctOption: "D",
        solutionStepByStep: [
          "Step 1: Recall the Panchamrit five-point climate pledge announced by Prime Minister Narendra Modi at the UNFCCC COP26 summit in Glasgow (2021).",
          "Step 2: The five pledges include: 500 GW non-fossil capacity by 2030, 50% energy from renewables by 2030, reduction of 1 billion tonnes carbon emissions by 2030, 45% reduction in carbon intensity of GDP by 2030.",
          "Step 3: The final long-term target is reaching net-zero carbon emissions by the year 2070.",
        ],
        cuetInsight:
          "2070 is a landmark target year frequently asked in CUET General Test current affairs and environmental literacy.",
      },
      {
        id: "general-test-u5-we8",
        questionNumber: 2,
        question:
          "Where is the global headquarters of the International Solar Alliance (ISA) located?",
        options: [
          { id: "A", text: "Geneva, Switzerland" },
          { id: "B", text: "Paris, France" },
          { id: "C", text: "Gurugram, India" },
          { id: "D", text: "Nairobi, Kenya" },
        ],
        correctOption: "C",
        solutionStepByStep: [
          "Step 1: The International Solar Alliance (ISA) was jointly founded by India and France in 2015 during the COP21 Paris summit.",
          "Step 2: It is dedicated to mobilizing investments in solar energy technologies across sunshine countries between the Tropics of Cancer and Capricorn.",
          "Step 3: Its interim and permanent secretariat is housed at the National Institute of Solar Energy (NISE) campus in Gurugram, Haryana, India.",
        ],
        cuetInsight:
          "ISA is the first major international treaty body based in India, making it a favorite CUET GK topic.",
      },
    ],
    howCuetAsks: [
      {
        patternType: "UN SDG Matching",
        frequency: "Very High",
        typicalStem: "Match List-I (SDG Number) with List-II (Objective).",
        strategy: "SDG 1 (No Poverty), SDG 4 (Quality Education), SDG 7 (Clean Energy), SDG 13 (Climate Action).",
      },
      {
        patternType: "Panchamrit Targets",
        frequency: "High",
        typicalStem: "What is India's non-fossil energy capacity target by 2030?",
        strategy: "500 GW.",
      },
    ],
    commonTraps: [
      {
        trap: "Confusing Net-Zero target year (2050 vs 2070)",
        whyStudentsFail: "Developed countries (US, EU) pledged 2050; India pledged 2070 and China pledged 2060.",
        howToAvoid: "India's target is strictly 2070.",
      },
      {
        trap: "Confusing ISA headquarters with UNEP",
        whyStudentsFail: "Thinking ISA is in Nairobi (UNEP is in Nairobi; ISA is in Gurugram, India).",
        howToAvoid: "Remember: International Solar Alliance = Gurugram, Haryana.",
      },
    ],
    mnemonics: [
      {
        concept: "Key SDGs to Remember",
        mnemonic: "1-4-5-7-13 (Poverty, Education, Gender, Energy, Climate)",
        explanation:
          "SDG 1: No Poverty | SDG 4: Education | SDG 5: Gender | SDG 7: Energy | SDG 13: Climate Action.",
      },
    ],
    quickRevisionCard: {
      title: "Sustainable Development High-Yield Points",
      bulletPoints: [
        "Brundtland Report (1987): 'Our Common Future' defined sustainable development.",
        "UN Agenda 2030: 17 Sustainable Development Goals (SDGs) & 169 targets.",
        "SDG 1: No Poverty; SDG 4: Education; SDG 7: Clean Energy; SDG 13: Climate Action.",
        "India's COP26 Panchamrit: 500 GW non-fossil capacity by 2030; Net-Zero by 2070.",
        "International Solar Alliance (ISA): Headquartered in Gurugram, Haryana, India.",
        "National Green Hydrogen Mission: 5 MMT production per annum by 2030.",
      ],
    },
    practiceQuestions: [
      {
        id: "general-test-u5-t4-q1",
        question:
          "The foundational concept of 'Sustainable Development' was officially defined in 1987 in which landmark UN report?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "The Silent Spring" },
          { id: "B", text: "Our Common Future (Brundtland Report)" },
          { id: "C", text: "The Limits to Growth" },
          { id: "D", text: "Agenda 21" },
        ],
        correctOption: "B",
        explanation:
          "The World Commission on Environment and Development (WCED), headed by Gro Harlem Brundtland, published 'Our Common Future' in 1987, articulating the modern definition of sustainable development.",
      },
      {
        id: "general-test-u5-t4-q2",
        question:
          "How many Sustainable Development Goals (SDGs) were adopted by the United Nations General Assembly under Agenda 2030?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "8 Goals" },
          { id: "B", text: "12 Goals" },
          { id: "C", text: "17 Goals" },
          { id: "D", text: "21 Goals" },
        ],
        correctOption: "C",
        explanation:
          "The UN 2030 Agenda consists of 17 Sustainable Development Goals (SDGs) and 169 associated targets adopted in September 2015.",
      },
      {
        id: "general-test-u5-t4-q3",
        question:
          "Which UN Sustainable Development Goal is specifically dedicated to 'Climate Action'?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "SDG 7" },
          { id: "B", text: "SDG 11" },
          { id: "C", text: "SDG 13" },
          { id: "D", text: "SDG 15" },
        ],
        correctOption: "C",
        explanation:
          "SDG 13 urges urgent action to combat climate change and its impacts. SDG 7 is Affordable and Clean Energy, and SDG 15 is Life on Land.",
      },
      {
        id: "general-test-u5-t4-q4",
        question:
          "What is India's non-fossil fuel energy capacity target by the year 2030 as pledged under the Panchamrit framework?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "175 GW" },
          { id: "B", text: "350 GW" },
          { id: "C", text: "500 GW" },
          { id: "D", text: "750 GW" },
        ],
        correctOption: "C",
        explanation:
          "At COP26, India enhanced its clean energy ambition to install 500 gigawatts (GW) of non-fossil energy capacity by 2030.",
      },
      {
        id: "general-test-u5-t4-q5",
        question:
          "Assertion (A): The International Solar Alliance (ISA) was jointly conceived by India and France in 2015.\nReason (R): Its headquarters is established in Gurugram, India, to mobilize over USD 1 trillion of investments in solar energy by 2030.",
        type: "assertion-reason",
        difficulty: "medium",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "B",
        explanation:
          "Both statements are true facts regarding the ISA, though (R) provides its headquarters and investment mandate rather than explaining why it was co-founded.",
      },
      {
        id: "general-test-u5-t4-q6",
        question:
          "Match List-I (UN SDG) with List-II (Core Goal):\n(P) SDG 1 — 1. No Poverty\n(Q) SDG 4 — 2. Quality Education\n(R) SDG 5 — 3. Gender Equality\n(S) SDG 7 — 4. Affordable and Clean Energy",
        type: "match-the-following",
        difficulty: "easy",
        options: [
          { id: "A", text: "P-1, Q-2, R-3, S-4" },
          { id: "B", text: "P-2, Q-1, R-4, S-3" },
          { id: "C", text: "P-1, Q-3, R-2, S-4" },
          { id: "D", text: "P-4, Q-2, R-1, S-3" },
        ],
        correctOption: "A",
        explanation:
          "Direct mapping of foundational UN Sustainable Development Goals.",
      },
      {
        id: "general-test-u5-t4-q7",
        question:
          "What is the annual green hydrogen production target by 2030 envisioned under the National Green Hydrogen Mission of India?",
        type: "standard",
        difficulty: "medium",
        options: [
          { id: "A", text: "1 Million Metric Tonnes (MMT)" },
          { id: "B", text: "2.5 Million Metric Tonnes (MMT)" },
          { id: "C", text: "5 Million Metric Tonnes (MMT)" },
          { id: "D", text: "10 Million Metric Tonnes (MMT)" },
        ],
        correctOption: "C",
        explanation:
          "The National Green Hydrogen Mission aims to build green hydrogen production capacity of at least 5 Million Metric Tonnes (MMT) per annum by 2030.",
      },
      {
        id: "general-test-u5-t4-q8",
        question:
          "The 'Triple Bottom Line' framework in sustainability refers to balancing:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Price, Product, Promotion" },
          { id: "B", text: "People, Planet, Profit" },
          { id: "C", text: "Physics, Politics, Policy" },
          { id: "D", text: "Power, Production, Pollution" },
        ],
        correctOption: "B",
        explanation:
          "John Elkington introduced the 'Triple Bottom Line' framework asserting that corporations and societies must measure success across three bottom lines: Social (People), Ecological (Planet), and Economic (Profit).",
      },
      {
        id: "general-test-u5-t4-q9",
        question:
          "Which of the following is considered a 'greenhouse gas' primarily responsible for anthropogenic global warming?",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "Oxygen (O2)" },
          { id: "B", text: "Nitrogen (N2)" },
          { id: "C", text: "Carbon Dioxide (CO2)" },
          { id: "D", text: "Argon (Ar)" },
        ],
        correctOption: "C",
        explanation:
          "Carbon dioxide (CO2), along with methane (CH4), nitrous oxide (N2O), and fluorinated gases, traps outgoing infrared radiation, driving the enhanced greenhouse effect.",
      },
      {
        id: "general-test-u5-t4-q10",
        question:
          "The target deadline set by the United Nations for achieving all 17 Sustainable Development Goals is:",
        type: "standard",
        difficulty: "easy",
        options: [
          { id: "A", text: "2025" },
          { id: "B", text: "2030" },
          { id: "C", text: "2035" },
          { id: "D", text: "2050" },
        ],
        correctOption: "B",
        explanation:
          "Agenda 2030 establishes the target deadline of 2030 for fulfilling the 17 SDGs adopted in 2015.",
      },
    ],
    links: {
      prerequisites: [],
      relatedTopics: ["environmental-conservation", "national-and-international-current-events"],
      practiceTestId: "practice-general-test-unit5-test1",
      practiceTestUrl: "/test/practice-general-test-unit5-test1",
      weaknessReportUrl: "/dashboard/radar?subject=general-test",
      weaknessRadarUrl: "/dashboard/radar?subject=general-test",
    },
  },
];
