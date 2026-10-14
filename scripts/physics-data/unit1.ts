import { NoteDocument } from "@/types/notes";

export const unit1Topics: NoteDocument[] = [
  {
    id: "physics_u1_t1",
    slug: "electric-charges-and-fields",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 1,
    unitTitle: "Electrostatics",
    topicTitle: "Electric Charges and Fields",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 1",
      chapterNumber: 1,
      chapterName: "Electric Charges and Fields",
      sections: [
        "1.2 Electric Charge",
        "1.3 Conductors and Insulators",
        "1.4 Charging by Induction",
        "1.5 Basic Properties of Electric Charge",
        "1.6 Coulomb's Law",
        "1.7 Forces between Multiple Charges",
        "1.8 Electric Field",
        "1.9 Electric Field Lines",
        "1.10 Electric Flux",
        "1.11 Electric Dipole",
        "1.12 Dipole in a Uniform External Field",
        "1.13 Continuous Charge Distribution",
        "1.14 Gauss's Law",
        "1.15 Applications of Gauss's Law",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Appears in 100% of tested CUET shifts (3-4 questions per 50-Q shift)",
      totalPyqsInRepo: 64,
      weightagePercentage: 7.2,
    },
    summary30Seconds: [
      "Charge is quantized ($q = ne$), conserved, and additive; Coulomb's force is an inverse-square central force modified by medium dielectric constant $K$ ($F_m = F_0 / K$).",
      "Electric field of a short dipole: $E_{\\text{axial}} = \\frac{2kp}{r^3}$ along $\\vec{p}$; $E_{\\text{equatorial}} = \\frac{kp}{r^3}$ opposite to $\\vec{p}$. Notice $E \\propto 1/r^3$ (not $1/r^2$).",
      "Dipole in uniform $\\vec{E}$: Net force $F_{\\text{net}} = 0$; Torque $\\vec{\\tau} = \\vec{p} \\times \\vec{E}$; Potential energy $U = -\\vec{p} \\cdot \\vec{E}$. Maximum torque occurs at $\\theta = 90^\\circ$, stable equilibrium at $\\theta = 0^\\circ$.",
      "Gauss's Law $\\Phi = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$ applies to closed surfaces. Infinite line: $E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}$; Infinite thin plane sheet: $E = \\frac{\\sigma}{2\\varepsilon_0}$ (independent of distance).",
      "Inside a charged thin spherical shell ($r < R$), $\\vec{E} = 0$; outside ($r \\ge R$), $E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{r^2}$.",
    ],
    coreConcepts: [
      {
        title: "Quantization, Conservation & Coulomb's Law",
        content:
          "Charge on any body is always an integral multiple of elementary electronic charge $e = 1.602 \\times 10^{-19}\\text{ C}$ ($q = \\pm ne$). In any isolated system, total algebraic charge remains strictly invariant under all processes (e.g., pair production $\\gamma \\rightarrow e^- + e^+$, nuclear decay).\n\nCoulomb's Law states that electrostatic force between two stationary point charges $q_1, q_2$ in vacuum separated by distance $r$ is:\n$$\\vec{F}_{12} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2} \\hat{r}_{21}$$\nwhere $\\frac{1}{4\\pi\\varepsilon_0} = 8.98755 \\times 10^9 \\approx 9 \\times 10^9\\text{ N}\\cdot\\text{m}^2\\text{C}^{-2}$. In a medium of dielectric constant $K$ (relative permittivity $\\varepsilon_r$), the force reduces to $F_m = \\frac{F_{\\text{vac}}}{K}$.",
        ncertPointers: [
          "Coulomb's law is valid strictly for static, point charges.",
          "Force is central and obeys Newton's third law ($\vec{F}_{12} = -\\vec{F}_{21}$).",
        ],
      },
      {
        title: "Electric Field, Field Lines & Dipole Dynamics",
        content:
          "The electric field $\\vec{E} = \\lim_{q_0 \\rightarrow 0} \\frac{\\vec{F}}{q_0}$ represents force per unit positive test charge. Electric field lines never form closed loops (electrostatic field is conservative) and never intersect (which would imply two unique force directions at one point).\n\nAn electric dipole consists of charges $+q$ and $-q$ separated by distance $2a$. Its electric dipole moment is $\\vec{p} = q(2a) \\hat{p}$, directed from $-q$ to $+q$ by convention.\n\n- **Axial field** ($r \\gg a$): $\\vec{E}_{\\text{axial}} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2\\vec{p}}{r^3}$\n- **Equatorial field** ($r \\gg a$): $\\vec{E}_{\\text{equatorial}} = -\\frac{1}{4\\pi\\varepsilon_0} \\frac{\\vec{p}}{r^3}$\n- **General point** $(r, \\theta)$: $E = \\frac{p}{4\\pi\\varepsilon_0 r^3} \\sqrt{1 + 3\\cos^2\\theta}$\n\nIn a uniform field $\\vec{E}$, torque $\\vec{\\tau} = \\vec{p} \\times \\vec{E}$ and work done in rotating from $\\theta_1$ to $\\theta_2$ is $W = pE(\\cos\\theta_1 - \\cos\\theta_2)$.",
      },
      {
        title: "Gauss's Theorem & Canonical Applications",
        content:
          "Electric flux through an elementary surface is $d\\Phi = \\vec{E} \\cdot d\\vec{A}$. Gauss's Law states that total flux through any closed Gaussian surface enclosing net charge $q_{\\text{in}}$ is:\n$$\\Phi_E = \\oint_S \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{in}}}{\\varepsilon_0}$$\n\nThree fundamental NCERT applications:\n1. **Infinitely long straight thin wire** with linear charge density $\\lambda$:\n   $$E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}$$\n   (Direction radial, outward if $\\lambda > 0$, inward if $\\lambda < 0$).\n2. **Infinitely large uniformly charged thin plane sheet** with surface density $\\sigma$:\n   $$E = \\frac{\\sigma}{2\\varepsilon_0}$$\n   (Independent of distance $r$ from the sheet!).\n3. **Uniformly charged thin spherical shell** of radius $R$ and total charge $q$:\n   - Inside ($r < R$): $E = 0$ (electrostatic shielding).\n   - At surface ($r = R$): $E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{q}{4\\pi\\varepsilon_0 R^2}$.\n   - Outside ($r > R$): $E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{r^2}$ (acts as if all charge is concentrated at center).",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Coulomb's Law in Medium",
        formula: "F_m = \\frac{1}{4\\pi\\varepsilon_0 K} \\frac{|q_1 q_2|}{r^2}",
        symbols: "K: dielectric constant, r: separation",
        siUnits: "Newtons (N)",
        applicationCondition: "Point charges at rest in uniform dielectric medium",
      },
      {
        name: "Axial Field of Short Dipole",
        formula: "E_{\\text{axial}} = \\frac{2kp}{r^3}",
        symbols: "k = \\frac{1}{4\\pi\\varepsilon_0}, p = q(2a), r \\gg a",
        siUnits: "N/C or V/m",
        applicationCondition: "Observation distance r is much larger than dipole separation 2a",
      },
      {
        name: "Equatorial Field of Short Dipole",
        formula: "E_{\\text{eq}} = \\frac{kp}{r^3}",
        symbols: "Opposite to \\vec{p}",
        siUnits: "N/C",
        applicationCondition: "Along perpendicular bisector, r \\gg a. Note: E_axial = 2 E_eq",
      },
      {
        name: "Torque on Dipole",
        formula: "\\tau = p E \\sin\\theta",
        symbols: "\\theta: angle between \\vec{p} and \\vec{E}",
        siUnits: "N·m",
        applicationCondition: "Uniform electric field only; net force is zero",
      },
      {
        name: "Potential Energy of Dipole",
        formula: "U = -\\vec{p} \\cdot \\vec{E} = -p E \\cos\\theta",
        symbols: "\\theta = 0^\\circ \\rightarrow U = -pE (stable), \\theta = 180^\\circ \\rightarrow U = +pE (unstable)",
        siUnits: "Joules (J)",
        applicationCondition: "Reference zero energy chosen at \\theta = 90^\\circ",
      },
      {
        name: "Field due to Infinite Line Charge",
        formula: "E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}",
        symbols: "\\lambda: linear charge density (C/m)",
        siUnits: "N/C",
        applicationCondition: "Perpendicular distance r from a straight uniform line charge",
      },
      {
        name: "Field due to Infinite Plane Sheet",
        formula: "E = \\frac{\\sigma}{2\\varepsilon_0}",
        symbols: "\\sigma: surface charge density (C/m^2)",
        siUnits: "N/C",
        applicationCondition: "Single non-conducting thin sheet; independent of distance",
      },
    ],
    diagram: {
      type: "svg",
      title: "Electric Dipole Field Lines & Gauss's Cylindrical Surface",
      caption: "Left: Field lines of an electric dipole showing divergence from +q and termination on -q. Right: Cylindrical Gaussian surface enclosing an infinite line charge.",
      code: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
    </marker>
  </defs>
  <!-- Background panel -->
  <rect x="10" y="10" width="350" height="240" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="185" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Electric Dipole Field Lines</text>
  
  <!-- Charges -->
  <circle cx="110" cy="130" r="14" fill="#EF4444" stroke="#DC2626" strokeWidth="2"/>
  <text x="110" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">+</text>
  <text x="110" y="160" textAnchor="middle" fill="#475569" fontSize="11">+q</text>
  
  <circle cx="260" cy="130" r="14" fill="#3B82F6" stroke="#2563EB" strokeWidth="2"/>
  <text x="260" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">−</text>
  <text x="260" y="160" textAnchor="middle" fill="#475569" fontSize="11">−q</text>
  
  <!-- Dipole Moment Vector p -->
  <line x1="240" y1="180" x2="130" y2="180" stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrow)"/>
  <text x="185" y="198" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">Dipole Moment p⃗ (−q to +q)</text>

  <!-- Axial Field lines -->
  <path d="M 124 130 L 246 130" stroke="#2563EB" strokeWidth="1.8" markerEnd="url(#arrow)"/>
  <path d="M 110 116 Q 185 60 260 116" fill="none" stroke="#2563EB" strokeWidth="1.8" markerMid="url(#arrow)"/>
  <path d="M 110 144 Q 185 200 260 144" fill="none" stroke="#2563EB" strokeWidth="1.8"/>

  <!-- Right Panel: Line Charge & Gaussian Cylinder -->
  <rect x="380" y="10" width="370" height="240" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="565" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Gauss's Law: Infinite Line Charge</text>
  
  <!-- Line charge -->
  <line x1="420" y1="130" x2="710" y2="130" stroke="#DC2626" strokeWidth="3"/>
  <text x="725" y="134" fill="#DC2626" fontSize="13" fontWeight="bold">+λ</text>
  
  <!-- Gaussian Cylinder -->
  <rect x="490" y="70" width="150" height="120" rx="20" fill="#DBEAFE" fillOpacity="0.4" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 3"/>
  <ellipse cx="490" cy="130" rx="14" ry="60" fill="#93C5FD" fillOpacity="0.4" stroke="#2563EB" strokeWidth="1.5"/>
  <ellipse cx="640" cy="130" rx="14" ry="60" fill="#93C5FD" fillOpacity="0.5" stroke="#2563EB" strokeWidth="1.5"/>
  
  <!-- E Vector outward -->
  <line x1="565" y1="70" x2="565" y2="44" stroke="#DC2626" strokeWidth="2" markerEnd="url(#arrowRed)"/>
  <text x="575" y="52" fill="#DC2626" fontSize="12" fontWeight="bold">E⃗</text>
  <line x1="565" y1="190" x2="565" y2="216" stroke="#DC2626" strokeWidth="2" markerEnd="url(#arrowRed)"/>
  <text x="575" y="214" fill="#DC2626" fontSize="12" fontWeight="bold">E⃗</text>
  <text x="565" y="238" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="bold">E = λ / (2πε₀r)</text>
</svg>`,
    },
    workedExamples: [
      {
        id: "we_phys_1_1",
        questionNumber: 1,
        question:
          "An electric dipole of moment $\\vec{p} = 4 \\times 10^{-9}\\text{ C}\\cdot\\text{m}$ is aligned at $30^\\circ$ with the direction of a uniform electric field of magnitude $5 \\times 10^4\\text{ N/C}$. Calculate the magnitude of the torque acting on the dipole and the work done to turn it to an angle of $90^\\circ$ from its initial position.",
        options: [
          { id: "A", text: "\\tau = 10^{-4}\\text{ N}\\cdot\\text{m}, W = 7.32 \\times 10^{-5}\\text{ J}" },
          { id: "B", text: "\\tau = 10^{-4}\\text{ N}\\cdot\\text{m}, W = 1.732 \\times 10^{-4}\\text{ J}" },
          { id: "C", text: "\\tau = 2 \\times 10^{-4}\\text{ N}\\cdot\\text{m}, W = 10^{-4}\\text{ J}" },
          { id: "D", text: "\\tau = 1.732 \\times 10^{-4}\\text{ N}\\cdot\\text{m}, W = 5 \\times 10^{-5}\\text{ J}" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Use torque formula $\\tau = pE \\sin\\theta$.",
          "$\\tau = (4 \\times 10^{-9}\\text{ C}\\cdot\\text{m}) \\times (5 \\times 10^4\\text{ N/C}) \\times \\sin(30^\\circ) = 20 \\times 10^{-5} \\times 0.5 = 10^{-4}\\text{ N}\\cdot\\text{m}$.",
          "Step 2: Calculate work done $W = pE(\\cos\\theta_1 - \\cos\\theta_2)$ where $\\theta_1 = 30^\\circ$ and $\\theta_2 = 90^\\circ$.",
          "$W = (4 \\times 10^{-9}) \\times (5 \\times 10^4) \\times [\\cos(30^\\circ) - \\cos(90^\\circ)] = 2 \\times 10^{-4} \\times \\left(\\frac{\\sqrt{3}}{2} - 0\\right) = \\sqrt{3} \\times 10^{-4} \\approx 1.732 \\times 10^{-4}\\text{ J}$.",
          "Hence, Option B is correct.",
        ],
        cuetTip: "Remember work done in turning dipole is $W = pE(\\cos\\theta_1 - \\cos\\theta_2)$, whereas potential energy difference is $\\Delta U = -W$. Don't swap the signs!",
      },
      {
        id: "we_phys_1_2",
        questionNumber: 2,
        question:
          "Two point charges $+9e$ and $+e$ are placed at a distance $a$ apart in air. At what distance from charge $+9e$ should a third charge $q$ be placed on the line joining them so that the system remains in electrostatic equilibrium?",
        options: [
          { id: "A", text: "a / 4" },
          { id: "B", text: "a / 2" },
          { id: "C", text: "3a / 4" },
          { id: "D", text: "2a / 3" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Let the third charge $q$ be placed at distance $x$ from $+9e$. The distance from $+e$ is $(a - x)$.",
          "Step 2: For $q$ to be in equilibrium, net electrostatic force on it must be zero:",
          "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{(9e)(q)}{x^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{(e)(q)}{(a - x)^2}$.",
          "Step 3: Simplify by canceling common terms: $\\frac{9}{x^2} = \\frac{1}{(a - x)^2} \\implies \\frac{3}{x} = \\frac{1}{a - x}$.",
          "Step 4: Cross multiply: $3(a - x) = x \\implies 3a - 3x = x \\implies 4x = 3a \\implies x = \\frac{3a}{4}$.",
          "Therefore, the equilibrium position from $+9e$ is $3a/4$.",
        ],
        cuetTip: "Shortcut for neutral point between like charges $q_1$ and $q_2$: $x = \\frac{r}{1 + \\sqrt{q_2/q_1}}$. Here $x = \\frac{a}{1 + \\sqrt{1/9}} = \\frac{a}{1 + 1/3} = \\frac{3a}{4}$.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Direct Ratio & Scaling",
        frequency: "Every shift in CUET 2024 & 2025",
        pyqExample: {
          question:
            "The ratio of electric field intensity at an axial point to that at an equatorial point at equal large distance $r$ from the center of a short dipole is:",
          options: [
            { id: "A", text: "1 : 1" },
            { id: "B", text: "2 : 1" },
            { id: "C", text: "1 : 2" },
            { id: "D", text: "4 : 1" },
          ],
          correctOption: "B",
          explanation: "For a short dipole, $E_{\\text{axial}} = \\frac{2kp}{r^3}$ and $E_{\\text{equatorial}} = \\frac{kp}{r^3}$. Hence $E_{\\text{axial}} / E_{\\text{eq}} = 2/1$.",
        },
        strategy: "Memorize dipole distance dependence $E \\propto 1/r^3$ (point charge is $1/r^2$). Factor 2 on axial vs equatorial is a standard NTA favorite.",
      },
      {
        type: "Match the Following",
        frequency: "Tested in ~40% of shifts",
        pyqExample: {
          question:
            "Match List I (Charge Distribution) with List II (Electric Field dependence on distance r):\nList I: (A) Point Charge, (B) Short Dipole, (C) Infinite Line Charge, (D) Infinite Flat Sheet\nList II: (I) Independent of r, (II) 1/r, (III) 1/r², (IV) 1/r³",
          options: [
            { id: "A", text: "A-(III), B-(IV), C-(II), D-(I)" },
            { id: "B", text: "A-(IV), B-(III), C-(I), D-(II)" },
            { id: "C", text: "A-(II), B-(III), C-(IV), D-(I)" },
            { id: "D", text: "A-(III), B-(I), C-(II), D-(IV)" },
          ],
          correctOption: "A",
          explanation: "Point charge $E \\propto 1/r^2$, dipole $E \\propto 1/r^3$, line charge $E \\propto 1/r$, infinite plane sheet $E = \\sigma/(2\\varepsilon_0) \\propto r^0$.",
        },
        strategy: "Use elimination: identify infinite plane sheet as independent of r (D-I) to eliminate wrong options instantly.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming dipole field drops off as 1/r² like a Coulomb point charge.",
        whyWrong: "Because dipole consists of two opposite charges whose fields largely cancel at distant points, the net field decays much faster as $1/r^3$.",
        correctUnderstanding: "$E \\propto 1/r^3$ for both axial and equatorial configurations of short dipoles.",
        trapOptionExample: "Selecting 1/r² when asked for dipole field scaling.",
      },
      {
        misconception: "Believing that flux through a closed surface depends on the size or shape of the surface.",
        whyWrong: "By Gauss's theorem $\\Phi = q_{\\text{enclosed}}/\\varepsilon_0$. Total number of field lines piercing the surface depends ONLY on the enclosed charge.",
        correctUnderstanding: "Doubling the radius of a spherical Gaussian surface does NOT change the total electric flux.",
        trapOptionExample: "Stating flux becomes 4 times when sphere radius doubles.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        mnemonic: "APE: Axial is Twice Equatorial (A = 2E)",
        rule: "Dipole Field relation at identical large distances",
        shortcut: "E_axial = 2 × E_equatorial at same r",
        whenToApply: "Whenever comparing fields along axis vs perpendicular bisector",
      },
      {
        rule: "Neutral Point Location between two point charges",
        shortcut: "x = r / (1 + √(q₂/q₁)) from charge q₁",
        whenToApply: "Two like charges separated by distance r",
      },
    ],
    quickRevisionCard: {
      title: "Electrostatics — Chapter 1 Quick Revision",
      bulletPoints: [
        "Quantization: q = ±ne (e = 1.6 × 10⁻¹⁹ C); charge is relativistic invariant.",
        "Coulomb's Law: F = (1/4πε₀K) (q₁q₂/r²); in medium F_medium = F_vacuum / K.",
        "Electric Field: E = F/q₀ (N/C or V/m). Field lines start at +, end at −; never intersect.",
        "Short Dipole: E_axial = 2kp/r³ (along p⃗); E_eq = kp/r³ (opposite to p⃗).",
        "Uniform Field E: Net force = 0; Torque τ⃗ = p⃗ × E⃗ (max at 90°).",
        "Potential Energy: U = −p⃗ · E⃗. Stable equilibrium at θ = 0°, unstable at θ = 180°.",
        "Gauss's Law: Φ = ∮ E⃗ · dA⃗ = q_in / ε₀ (independent of surface shape/size).",
        "Line Charge (infinite): E = λ / (2πε₀r) ∝ 1/r.",
        "Plane Sheet (infinite): E = σ / (2ε₀) ∝ r⁰ (constant with distance).",
        "Spherical Shell (radius R): E = 0 inside (r < R); E = q / (4πε₀r²) outside.",
      ],
    },
    practiceQuestions: [
      {
        id: "pq_phys_1_1",
        question: "When a dielectric slab of dielectric constant K = 4 is inserted between two point charges keeping separation unchanged, the electrostatic force between them:",
        type: "standard",
        options: [
          { id: "A", text: "Increases 4 times" },
          { id: "B", text: "Decreases to 1/4th of initial value" },
          { id: "C", text: "Decreases to 1/16th of initial value" },
          { id: "D", text: "Remains unchanged" },
        ],
        correctOption: "B",
        explanation: "By Coulomb's law in a medium, $F_m = F_0 / K$. With $K = 4$, force reduces to $F_0 / 4$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_1_2",
        question: "The electric flux through a closed Gaussian surface of radius R enclosing a point charge q is Φ. If the radius of the sphere is doubled, the total outward flux will be:",
        type: "standard",
        options: [
          { id: "A", text: "Φ / 4" },
          { id: "B", text: "Φ / 2" },
          { id: "C", text: "Φ" },
          { id: "D", text: "4Φ" },
        ],
        correctOption: "C",
        explanation: "Total electric flux depends only on the enclosed charge ($q/\\varepsilon_0$) and is independent of the Gaussian surface's size or radius.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_1_3",
        question: "An electric dipole is placed in a non-uniform electric field. It will experience:",
        type: "standard",
        options: [
          { id: "A", text: "Only a torque but no net force" },
          { id: "B", text: "Only a force but no torque" },
          { id: "C", text: "Both a net force and a torque" },
          { id: "D", text: "Neither force nor torque" },
        ],
        correctOption: "C",
        explanation: "In a non-uniform field, forces on $+q$ and $-q$ are unequal, resulting in a non-zero net force and in general a non-zero torque.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_1_4",
        question: "A hollow metal sphere of radius 10 cm is charged such that the potential on its surface is 80 V. The electric field at the center of the sphere is:",
        type: "standard",
        options: [
          { id: "A", text: "0 V/m" },
          { id: "B", text: "8 V/m" },
          { id: "C", text: "80 V/m" },
          { id: "D", text: "800 V/m" },
        ],
        correctOption: "A",
        explanation: "Inside a charged hollow conducting sphere, the electric field is strictly zero everywhere, even though potential is constant ($V = 80\\text{ V}$).",
        difficulty: "easy",
      },
      {
        id: "pq_phys_1_5",
        question: "Two thin infinite plane parallel sheets of charge densities +σ and −σ are separated by a distance d. The electric field in the region between the sheets is:",
        type: "standard",
        options: [
          { id: "A", text: "0" },
          { id: "B", text: "σ / (2ε₀)" },
          { id: "C", text: "σ / ε₀" },
          { id: "D", text: "2σ / ε₀" },
        ],
        correctOption: "C",
        explanation: "Between the plates, fields due to $+σ$ and $-σ$ point in the same direction: $E = \\frac{\\sigma}{2\\varepsilon_0} + \\frac{\\sigma}{2\\varepsilon_0} = \\frac{\\sigma}{\\varepsilon_0}$. Outside, they cancel to zero.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_1_6",
        question: "An electron falls through a distance of 1.5 cm in a uniform electric field of magnitude 2.0 × 10⁴ N/C. The acceleration of the electron is approximately (take e = 1.6 × 10⁻¹⁹ C, m = 9.1 × 10⁻³¹ kg):",
        type: "standard",
        options: [
          { id: "A", text: "3.5 × 10¹⁵ m/s²" },
          { id: "B", text: "1.9 × 10¹² m/s²" },
          { id: "C", text: "9.8 m/s²" },
          { id: "D", text: "4.8 × 10¹⁴ m/s²" },
        ],
        correctOption: "A",
        explanation: "Acceleration $a = \\frac{eE}{m} = \\frac{(1.6 \\times 10^{-19}) \\times (2.0 \\times 10^4)}{9.1 \\times 10^{-31}} \\approx 3.52 \\times 10^{15}\\text{ m/s}^2$.",
        difficulty: "hard",
      },
      {
        id: "pq_phys_1_7",
        question: "A point charge +q is placed at the center of a cube of edge length a. The electric flux passing through one face of the cube is:",
        type: "standard",
        options: [
          { id: "A", text: "q / ε₀" },
          { id: "B", text: "q / (6ε₀)" },
          { id: "C", text: "q / (24ε₀)" },
          { id: "D", text: "q / (8ε₀)" },
        ],
        correctOption: "B",
        explanation: "By symmetry, total flux $q/\\varepsilon_0$ divides equally among all 6 faces of the cube, so each face transmits $\\Phi = q/(6\\varepsilon_0)$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_1_8",
        question: "Assertion (A): Electrostatic field lines never form closed loops.\nReason (R): Electrostatic field is conservative in nature, so work done in moving a charge in a closed loop is zero.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Because the electrostatic force is conservative, $\\oint \\vec{E} \\cdot d\\vec{l} = 0$. If field lines formed closed loops, $\\oint \\vec{E} \\cdot d\\vec{l} > 0$, violating conservation.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_1_9",
        question: "Assertion (A): The electric field at any point on the equatorial plane of an electric dipole is directed antiparallel to the dipole moment vector.\nReason (R): Dipole moment is directed from negative charge to positive charge, while at the equatorial point, the resultant field due to both charges points from positive to negative direction.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "Dipole moment $\\vec{p}$ points from $-q$ to $+q$. Resolving components along equatorial line shows axial components cancel and parallel components add antiparallel to $\\vec{p}$.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_1_10",
        question: "Match List I (Physical Quantity / Configuration) with List II (SI Unit / Formula):\nList I: (A) Electric Dipole Moment, (B) Electric Flux, (C) Linear Charge Density, (D) Surface Charge Density\nList II: (I) C/m², (II) C·m, (III) N·m²/C, (IV) C/m",
        type: "match-the-following",
        options: [
          { id: "A", text: "A-(II), B-(III), C-(IV), D-(I)" },
          { id: "B", text: "A-(I), B-(II), C-(III), D-(IV)" },
          { id: "C", text: "A-(II), B-(I), C-(IV), D-(III)" },
          { id: "D", text: "A-(III), B-(IV), C-(I), D-(II)" },
        ],
        correctOption: "A",
        explanation: "Dipole moment has unit C·m (II), Electric flux is N·m²/C (III), Linear density is C/m (IV), Surface density is C/m² (I).",
        difficulty: "easy",
      },
    ],
    links: {
      prerequisites: [
        { title: "Vectors & Coulomb's Inverse Square Law", slug: "vectors-electrostatics" },
      ],
      relatedTopics: [
        { title: "Electrostatic Potential and Capacitance", slug: "electrostatic-potential-and-capacitance" },
        { title: "Current Electricity", slug: "electric-current-ohms-law-kirchhoffs-laws-potentiometer-meter-bridge" },
      ],
      practiceTestId: "practice-physics-unit1-test1",
      practiceTestUrl: "/test/practice-physics-unit1-test1",
      weaknessReportUrl: "/dashboard/radar?subject=physics",
    },
    subjectSpecific: {
      physics: {
        examinableDerivations: [
          {
            title: "Electric Field of Dipole on Equatorial Plane",
            briefSteps: [
              "Place charges $-q$ at $(-a, 0)$ and $+q$ at $(+a, 0)$. Point $P$ on y-axis at distance $y = r$.",
              "Magnitude of field from each charge: $E_+ = E_- = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2 + a^2}$.",
              "Components along y-axis: $E_+ \\sin\\theta$ and $E_- \\sin\\theta$ cancel out.",
              "Components along x-axis add up antiparallel to $\\vec{p}$: $E_{\\text{eq}} = 2 E_+ \\cos\\theta = 2 \\left(\\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2+a^2}\\right) \\left(\\frac{a}{\\sqrt{r^2+a^2}}\\right)$.",
              "For $r \\gg a$: $E_{\\text{eq}} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p}{r^3}$.",
            ],
          },
        ],
        unitDimensionTable: [
          { quantity: "Electric Charge (q)", dimension: "[A T]", unit: "Coulomb (C)" },
          { quantity: "Electric Field (E)", dimension: "[M L T⁻³ A⁻¹]", unit: "N/C or V/m" },
          { quantity: "Electric Flux (Φ)", dimension: "[M L³ T⁻³ A⁻¹]", unit: "N·m²/C or V·m" },
          { quantity: "Dipole Moment (p)", dimension: "[L T A]", unit: "C·m" },
          { quantity: "Permittivity (ε₀)", dimension: "[M⁻¹ L⁻³ T⁴ A²]", unit: "C²/(N·m²) or F/m" },
        ],
        graphInterpretations: [
          {
            graphName: "E vs r for Uniformly Charged Thin Spherical Shell",
            slopeMeaning: "Zero inside (flat on axis), then discontinuously jumps to max at r = R",
            areaMeaning: "Potential difference between two radii",
            keyFeature: "E = 0 for r < R; at r = R, E_max = q/(4πε₀R²); for r > R, E decays as 1/r².",
          },
        ],
      },
    },
    metadata: {
      confidence: "high",
      needsHumanReview: false,
      lastUpdated: new Date().toISOString(),
      version: 1,
      wordCount: 1450,
      isFreePreview: true,
    },
  },
  {
    id: "physics_u1_t2",
    slug: "electrostatic-potential-and-capacitance",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 1,
    unitTitle: "Electrostatics",
    topicTitle: "Electrostatic Potential and Capacitance",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 1",
      chapterNumber: 2,
      chapterName: "Electrostatic Potential and Capacitance",
      sections: [
        "2.2 Electrostatic Potential",
        "2.3 Potential due to a Point Charge",
        "2.4 Potential due to an Electric Dipole",
        "2.5 Potential due to a System of Charges",
        "2.6 Equipotential Surfaces",
        "2.7 Potential Energy of a System of Charges",
        "2.8 Potential Energy in an External Field",
        "2.9 Electrostatics of Conductors",
        "2.10 Dielectrics and Polarisation",
        "2.11 Capacitors and Capacitance",
        "2.12 The Parallel Plate Capacitor",
        "2.13 Effect of Dielectric on Capacitance",
        "2.14 Combination of Capacitors",
        "2.15 Energy Stored in a Capacitor",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "Guaranteed 2-3 questions per shift; capacitance combinations & dielectric insertion appear in 80% of papers",
      totalPyqsInRepo: 58,
      weightagePercentage: 6.8,
    },
    summary30Seconds: [
      "Electrostatic potential $V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}$ is scalar; work done to bring charge $q_0$ from $\\infty$ is $W = q_0 V$. Relation to field: $\\vec{E} = -\\nabla V$ or $E = -\\frac{dV}{dr}$.",
      "Equipotential surfaces are always perpendicular to electric field lines; work done moving any charge along an equipotential surface is strictly zero ($W = 0$).",
      "Parallel plate capacitor: $C_0 = \\frac{\\varepsilon_0 A}{d}$; with dielectric slab of constant $K$ completely filling gap, $C = K C_0$. Partially filled slab of thickness $t$: $C = \\frac{\\varepsilon_0 A}{d - t + t/K}$.",
      "Dielectric Insertion Rules: (a) Battery connected: $V$ constant, $C \\rightarrow KC$, $Q \\rightarrow KQ$, $E$ constant, Energy $U \\rightarrow KU$. (b) Battery disconnected: $Q$ constant, $C \\rightarrow KC$, $V \\rightarrow V/K$, $E \\rightarrow E/K$, Energy $U \\rightarrow U/K$.",
      "Energy stored $U = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C} = \\frac{1}{2} Q V$; electrostatic energy density in field is $u = \\frac{1}{2} \\varepsilon_0 E^2$.",
    ],
    coreConcepts: [
      {
        title: "Potential, Equipotential Surfaces & Field Relation",
        content:
          "Electric potential $V$ at distance $r$ from point charge $q$ is $V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}$. For a short dipole $\\vec{p}$, potential is:\n$$V(r, \\theta) = \\frac{1}{4\\pi\\varepsilon_0} \\frac{p \\cos\\theta}{r^2}$$\nNotice on the equatorial plane ($\\theta = 90^\\circ$), $V_{\\text{eq}} = 0$ everywhere, though $\\vec{E}_{\\text{eq}} \\ne 0$!\n\nAn equipotential surface has constant potential. Properties:\n1. Work done in moving test charge on equipotential surface: $W = q_0 \\Delta V = 0$.\n2. Electric field lines are always perpendicular to equipotential surfaces.\n3. Equipotential surfaces are closer in regions of stronger electric fields ($dr = -\\frac{dV}{E}$).",
      },
      {
        title: "Capacitance & Dielectric Slabs",
        content:
          "Capacitance $C = \\frac{Q}{V}$ depends strictly on geometry and medium, not on $Q$ or $V$ independently. For parallel plates of area $A$ and gap $d$, $C_0 = \\frac{\\varepsilon_0 A}{d}$.\n\nWhen a dielectric of thickness $t$ ($t < d$) and dielectric constant $K$ is introduced:\n$$C = \\frac{\\varepsilon_0 A}{d - t\\left(1 - \\frac{1}{K}\\right)}$$\nIf a conducting slab ($K = \\infty$) of thickness $t$ is inserted, $C = \\frac{\\varepsilon_0 A}{d - t}$.\n\n**Combinations:**\n- **Series:** $\\frac{1}{C_{\\text{eq}}} = \\sum \\frac{1}{C_i}$ ($Q$ same on all, $V$ divides).\n- **Parallel:** $C_{\\text{eq}} = \\sum C_i$ ($V$ same on all, $Q$ divides).",
      },
      {
        title: "Battery Connected vs Disconnected Dielectric Rules",
        content:
          "This is one of CUET's top 3 tested concepts in electrostatics:\n\n| Quantity | Battery Remains Connected ($V = \\text{const}$) | Battery Disconnected ($Q = \\text{const}$) |\n| :--- | :--- | :--- |\n| Potential $V$ | Constant ($V_0$) | Decreases to $V_0 / K$ |\n| Charge $Q$ | Increases to $K Q_0$ | Constant ($Q_0$) |\n| Capacitance $C$ | Increases to $K C_0$ | Increases to $K C_0$ |\n| Electric Field $E$ | Constant ($E_0$) | Decreases to $E_0 / K$ |\n| Energy Stored $U$ | Increases to $K U_0$ | Decreases to $U_0 / K$ |",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Electric Potential of Point Charge",
        formula: "V = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{r}",
        symbols: "q: source charge, r: distance",
        siUnits: "Volt (V) or J/C",
        applicationCondition: "Point charge at rest with V = 0 at infinity",
      },
      {
        name: "Parallel Plate Capacitance",
        formula: "C = \\frac{K \\varepsilon_0 A}{d}",
        symbols: "K: dielectric constant, A: plate area, d: plate separation",
        siUnits: "Farad (F)",
        applicationCondition: "Plates separated by uniform dielectric",
      },
      {
        name: "Capacitance with Slab of Thickness t",
        formula: "C = \\frac{\\varepsilon_0 A}{d - t + t/K}",
        symbols: "t < d: dielectric slab thickness",
        siUnits: "Farad (F)",
        applicationCondition: "Dielectric slab partially fills the gap",
      },
      {
        name: "Electrostatic Energy Stored",
        formula: "U = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C}",
        symbols: "Q: stored charge, V: potential difference",
        siUnits: "Joules (J)",
        applicationCondition: "Total energy stored in electric field between plates",
      },
      {
        name: "Energy Density of Field",
        formula: "u = \\frac{1}{2} \\varepsilon_0 E^2",
        symbols: "u = U / (Ad): energy per unit volume",
        siUnits: "J/m³",
        applicationCondition: "Electrostatic field in vacuum/air",
      },
      {
        name: "Common Potential on Sharing Charge",
        formula: "V_{\\text{common}} = \\frac{C_1 V_1 + C_2 V_2}{C_1 + C_2}",
        symbols: "\\Delta U_{\\text{loss}} = \\frac{C_1 C_2 (V_1 - V_2)^2}{2(C_1 + C_2)}",
        siUnits: "Volts (V)",
        applicationCondition: "Two charged capacitors connected in parallel",
      },
    ],
    diagram: {
      type: "svg",
      title: "Parallel Plate Capacitor with Dielectric Slab & Equipotentials",
      caption: "Cross-section of a parallel plate capacitor containing a dielectric slab of thickness t and dielectric constant K, showing induced surface polarization charges.",
      code: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <marker id="arrowB" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
    </marker>
  </defs>
  <!-- Background panel -->
  <rect x="20" y="10" width="720" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  <text x="380" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold">Parallel Plate Capacitor with Dielectric Slab (Thickness t &lt; d)</text>

  <!-- Left Metal Plate (+Q) -->
  <rect x="80" y="55" width="16" height="150" fill="#EF4444" rx="3"/>
  <text x="60" y="135" fill="#EF4444" fontSize="13" fontWeight="bold">+Q</text>
  
  <!-- Right Metal Plate (-Q) -->
  <rect x="660" y="55" width="16" height="150" fill="#3B82F6" rx="3"/>
  <text x="690" y="135" fill="#3B82F6" fontSize="13" fontWeight="bold">−Q</text>

  <!-- Gap d dimension line -->
  <line x1="96" y1="215" x2="660" y2="215" stroke="#64748B" strokeWidth="1.5"/>
  <text x="378" y="230" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="bold">Total Gap d</text>

  <!-- Dielectric Slab -->
  <rect x="250" y="55" width="260" height="150" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" rx="4"/>
  <text x="380" y="115" textAnchor="middle" fill="#7C3AED" fontSize="14" fontWeight="bold">Dielectric (K)</text>
  <text x="380" y="135" textAnchor="middle" fill="#6D28D9" fontSize="11">Induced bound charge −q_p and +q_p</text>
  <text x="380" y="155" textAnchor="middle" fill="#4B5563" fontSize="11">E_in = E₀ / K</text>

  <!-- Thickness t -->
  <line x1="250" y1="42" x2="510" y2="42" stroke="#7C3AED" strokeWidth="1.5"/>
  <text x="380" y="38" textAnchor="middle" fill="#7C3AED" fontSize="11" fontWeight="bold">Thickness t</text>

  <!-- Electric Field Lines -->
  <line x1="105" y1="80" x2="240" y2="80" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
  <line x1="105" y1="130" x2="240" y2="130" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
  <line x1="105" y1="180" x2="240" y2="180" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
  <text x="175" y="125" fill="#2563EB" fontSize="10">E₀</text>

  <line x1="520" y1="80" x2="650" y2="80" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
  <line x1="520" y1="130" x2="650" y2="130" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
  <line x1="520" y1="180" x2="650" y2="180" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
  <text x="585" y="125" fill="#2563EB" fontSize="10">E₀</text>
</svg>`,
    },
    workedExamples: [
      {
        id: "we_phys_1_3",
        questionNumber: 1,
        question:
          "A parallel plate capacitor with air between the plates has a capacitance of 8 pF. What will be the capacitance if the distance between the plates is reduced by half and the space between them is filled with a substance of dielectric constant K = 6?",
        options: [
          { id: "A", text: "24 pF" },
          { id: "B", text: "48 pF" },
          { id: "C", text: "96 pF" },
          { id: "D", text: "12 pF" },
        ],
        correctOption: "C",
        solutionSteps: [
          "Step 1: Original capacitance $C_0 = \\frac{\\varepsilon_0 A}{d} = 8\\text{ pF}$.",
          "Step 2: New separation is $d' = d/2$ and new medium has $K = 6$.",
          "Step 3: New capacitance $C' = \\frac{K \\varepsilon_0 A}{d'} = \\frac{K \\varepsilon_0 A}{d/2} = 2K \\left(\\frac{\\varepsilon_0 A}{d}\\right) = 2K C_0$.",
          "Step 4: Calculate: $C' = 2 \\times 6 \\times 8\\text{ pF} = 96\\text{ pF}$.",
          "Hence, Option C is correct.",
        ],
        cuetTip: "Halving separation doubles capacitance; introducing dielectric multiplies by K. Combined factor is $2 \\times K = 12$.",
      },
      {
        id: "we_phys_1_4",
        questionNumber: 2,
        question:
          "A 900 pF capacitor is charged by a 100 V battery. It is then disconnected from the battery and connected to another uncharged 900 pF capacitor. The electrostatic energy lost in the process is:",
        options: [
          { id: "A", text: "4.5 × 10⁻⁶ J" },
          { id: "B", text: "2.25 × 10⁻⁶ J" },
          { id: "C", text: "1.125 × 10⁻⁶ J" },
          { id: "D", text: "9.0 × 10⁻⁶ J" },
        ],
        correctOption: "B",
        solutionSteps: [
          "Step 1: Initial energy stored in first capacitor: $U_i = \\frac{1}{2} C V_1^2 = \\frac{1}{2} \\times (900 \\times 10^{-12}) \\times (100)^2 = 4.5 \\times 10^{-6}\\text{ J}$.",
          "Step 2: Common potential when connected in parallel to identical uncharged capacitor ($C_2 = C_1, V_2 = 0$):",
          "$V_c = \\frac{C_1 V_1 + 0}{C_1 + C_2} = \\frac{V_1}{2} = 50\\text{ V}$.",
          "Step 3: Final energy of both capacitors: $U_f = \\frac{1}{2} (C_1 + C_2) V_c^2 = \\frac{1}{2} (1800 \\times 10^{-12}) \\times (50)^2 = 2.25 \\times 10^{-6}\\text{ J}$.",
          "Step 4: Energy lost: $\\Delta U = U_i - U_f = 4.5 \\times 10^{-6} - 2.25 \\times 10^{-6} = 2.25 \\times 10^{-6}\\text{ J}$.",
          "Alternatively, use direct formula $\\Delta U = \\frac{C_1 C_2 (V_1 - V_2)^2}{2(C_1 + C_2)} = \\frac{C^2 V^2}{4C} = \\frac{1}{4} C V^2 = 2.25 \\times 10^{-6}\\text{ J}$.",
        ],
        cuetTip: "When identical capacitors share charge, exactly 50% of the initial electrostatic energy is lost as heat/electromagnetic radiation in connecting wires.",
      },
    ],
    howCuetAsksThis: [
      {
        type: "Dielectric Insertion Effect",
        frequency: "Observed in almost every shift",
        pyqExample: {
          question:
            "A parallel plate capacitor is charged and then the battery is disconnected. A dielectric slab of constant K is now inserted between the plates. What happens to the potential difference V and the stored energy U?",
          options: [
            { id: "A", text: "Both V and U increase by factor K" },
            { id: "B", text: "Both V and U decrease by factor K" },
            { id: "C", text: "V decreases by factor K, U increases by factor K" },
            { id: "D", text: "V remains constant, U decreases by factor K" },
          ],
          correctOption: "B",
          explanation: "Since battery is disconnected, charge $Q$ is constant. $C' = KC_0$, so $V' = Q/C' = V_0 / K$. Stored energy $U' = Q^2/(2C') = U_0 / K$.",
        },
        strategy: "First identify: is battery connected or disconnected? Disconnected means Q is fixed. Connected means V is fixed.",
      },
      {
        type: "Equipotential Surface Work Done",
        frequency: "High (tested in ~50% of shifts)",
        pyqExample: {
          question: "What is the work done in moving a test charge q₀ over an equipotential surface between two points separated by distance r?",
          options: [
            { id: "A", text: "Zero" },
            { id: "B", text: "q₀ V" },
            { id: "C", text: "q₀ E r" },
            { id: "D", text: "q₀ / (4πε₀ r)" },
          ],
          correctOption: "A",
          explanation: "Work done W = q₀ ΔV = q₀ (V_B - V_A). On an equipotential surface V_A = V_B, so ΔV = 0 and W = 0.",
        },
        strategy: "Electric field lines are always perpendicular to equipotential surfaces; work along the surface is identically zero.",
      },
    ],
    commonTraps: [
      {
        misconception: "Assuming zero electric potential implies zero electric field at that point.",
        whyWrong: "Electric field is the gradient of potential ($\\vec{E} = -dV/dr$). On equatorial plane of a dipole, $V = 0$ everywhere, yet $\\vec{E} = \\frac{kp}{r^3} \\ne 0$.",
        correctUnderstanding: "A point can have $V = 0$ and $\\vec{E} \\ne 0$ (dipole equator), or $\\vec{E} = 0$ and $V \\ne 0$ (inside charged shell).",
        trapOptionExample: "Choosing 'electric field must be zero' at points where V = 0.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        mnemonic: "DISCO: DISeconnected = Charge Constant (Q = const)",
        rule: "Battery status rule during dielectric insertion",
        shortcut: "Disconnected -> Q is fixed, V drops; Connected -> V is fixed, Q rises",
        whenToApply: "Dielectric insertion/removal problems",
      },
      {
        rule: "Equal capacitor sharing energy loss",
        shortcut: "Energy lost = 50% of initial energy whenever identical capacitor is attached",
        whenToApply: "Two identical capacitors sharing charge",
      },
    ],
    quickRevisionCard: {
      title: "Electrostatic Potential & Capacitance — Summary",
      bulletPoints: [
        "Potential: V = kq/r (scalar, additive). E = −dV/dr (E points in direction of steepest decrease of V).",
        "Short Dipole Potential: V = (kp cosθ) / r². On equatorial plane (θ = 90°), V = 0.",
        "Equipotential Surface: V is constant; W = 0 along surface; E⃗ is strictly normal to surface.",
        "Parallel Plate Capacitor: C₀ = ε₀A / d. With dielectric: C = K C₀.",
        "Slab of thickness t: C = ε₀A / [d − t(1 − 1/K)].",
        "Series: 1/C_eq = Σ(1/C_i), same Q; Parallel: C_eq = ΣC_i, same V.",
        "Stored Energy: U = ½CV² = Q²/(2C) = ½QV. Energy density u = ½ε₀E².",
        "Battery Disconnected: Q constant; V, E, U all decrease by factor K; C increases by K.",
        "Battery Connected: V, E constant; Q, C, U all increase by factor K.",
        "Loss in charge sharing: ΔU = C₁C₂(V₁ − V₂)² / [2(C₁ + C₂)].",
      ],
    },
    practiceQuestions: [
      {
        id: "pq_phys_1_11",
        question: "Three capacitors of capacitances 2 μF, 3 μF and 6 μF are connected in series. The equivalent capacitance is:",
        type: "standard",
        options: [
          { id: "A", text: "1 μF" },
          { id: "B", text: "11 μF" },
          { id: "C", text: "0.5 μF" },
          { id: "D", text: "2 μF" },
        ],
        correctOption: "A",
        explanation: "1/C = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 6/6 = 1. Therefore C = 1 μF.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_1_12",
        question: "The work done in carrying a charge of 5 μC between two points on an equipotential surface having potential 20 V is:",
        type: "standard",
        options: [
          { id: "A", text: "100 μJ" },
          { id: "B", text: "0 J" },
          { id: "C", text: "4 μJ" },
          { id: "D", text: "20 μJ" },
        ],
        correctOption: "B",
        explanation: "On an equipotential surface, potential difference $\\Delta V = 0$. Hence $W = q \\Delta V = 0$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_1_13",
        question: "A parallel plate capacitor is charged by connecting it across a DC voltage source. While keeping the battery connected, the plate separation is doubled. The stored electrostatic energy:",
        type: "standard",
        options: [
          { id: "A", text: "Doubles" },
          { id: "B", text: "Becomes half" },
          { id: "C", text: "Remains constant" },
          { id: "D", text: "Becomes one-fourth" },
        ],
        correctOption: "B",
        explanation: "Battery connected means $V$ is constant. $C = \\varepsilon_0 A / d$, so doubling $d$ halves $C$. Energy $U = \\frac{1}{2} C V^2$ is halved.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_1_14",
        question: "The electric potential at the center of an electric dipole of length 2a is:",
        type: "standard",
        options: [
          { id: "A", text: "Zero" },
          { id: "B", text: "q / (4πε₀a)" },
          { id: "C", text: "2q / (4πε₀a)" },
          { id: "D", text: "Infinity" },
        ],
        correctOption: "A",
        explanation: "At the center, distances from $+q$ and $-q$ are equal ($a$). Potential is scalar sum $V = \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q}{a} - \\frac{q}{a}\\right) = 0$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_1_15",
        question: "A conducting slab of thickness t = d/2 is inserted between the plates of a parallel plate capacitor of capacitance C₀. The new capacitance will be:",
        type: "standard",
        options: [
          { id: "A", text: "C₀ / 2" },
          { id: "B", text: "2 C₀" },
          { id: "C", text: "4 C₀" },
          { id: "D", text: "C₀" },
        ],
        correctOption: "B",
        explanation: "For a conducting slab ($K = \\infty$), $C = \\frac{\\varepsilon_0 A}{d - t} = \\frac{\\varepsilon_0 A}{d - d/2} = 2 \\frac{\\varepsilon_0 A}{d} = 2 C_0$.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_1_16",
        question: "Two point charges +4 μC and −2 μC are separated by a distance of 1 m in air. The point on the line joining them where the electric potential is zero (other than infinity) is located at distance from −2 μC of:",
        type: "standard",
        options: [
          { id: "A", text: "0.33 m between them" },
          { id: "B", text: "0.50 m between them" },
          { id: "C", text: "0.25 m between them" },
          { id: "D", text: "0.67 m between them" },
        ],
        correctOption: "A",
        explanation: "Let the point be distance $x$ from $-2\\,\\mu\\text{C}$ between them. $V = \\frac{k(4)}{1 - x} + \\frac{k(-2)}{x} = 0 \\implies \\frac{4}{1 - x} = \\frac{2}{x} \\implies 4x = 2 - 2x \\implies 6x = 2 \\implies x = 1/3 \\approx 0.33\\text{ m}$.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_1_17",
        question: "A capacitor of 20 μF is charged to 500 V. The energy stored in the electric field is:",
        type: "standard",
        options: [
          { id: "A", text: "2.5 J" },
          { id: "B", text: "5.0 J" },
          { id: "C", text: "0.25 J" },
          { id: "D", text: "25 J" },
        ],
        correctOption: "A",
        explanation: "$U = \\frac{1}{2} C V^2 = \\frac{1}{2} \\times (20 \\times 10^{-6}\\text{ F}) \\times (500\\text{ V})^2 = 10^{-5} \\times 250000 = 2.5\\text{ J}$.",
        difficulty: "easy",
      },
      {
        id: "pq_phys_1_18",
        question: "Assertion (A): Electric field is always perpendicular to equipotential surfaces.\nReason (R): If electric field had a non-zero component along an equipotential surface, work would be required to move a charge along it, violating the definition of an equipotential surface.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "$dW = \\vec{E} \\cdot d\\vec{r} = E dr \\cos\\theta$. Since $dW = 0$ on equipotential, $\\cos\\theta = 0 \\implies \\theta = 90^\\circ$.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_1_19",
        question: "Assertion (A): When a dielectric slab is inserted into an isolated charged capacitor, the energy stored in the capacitor decreases.\nReason (R): The electric field inside the capacitor decreases due to dielectric polarization, leading to a reduction in electrostatic energy density.",
        type: "assertion-reason",
        options: [
          { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
          { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
          { id: "C", text: "(A) is true but (R) is false" },
          { id: "D", text: "(A) is false but (R) is true" },
        ],
        correctOption: "A",
        explanation: "For isolated capacitor, $Q$ is constant. $U = Q^2/(2C) = Q^2/(2KC_0) = U_0 / K$. The energy decreases because the dielectric is pulled into the field by attractive forces, doing work.",
        difficulty: "medium",
      },
      {
        id: "pq_phys_1_20",
        question: "Match List I (Condition of Capacitor) with List II (Effect on Stored Energy U):\nList I: (A) Battery connected, separation d doubled, (B) Battery disconnected, separation d doubled, (C) Battery connected, dielectric K inserted, (D) Battery disconnected, dielectric K inserted\nList II: (I) U increases by factor K, (II) U decreases by factor K, (III) U becomes U₀/2, (IV) U becomes 2U₀",
        type: "match-the-following",
        options: [
          { id: "A", text: "A-(III), B-(IV), C-(I), D-(II)" },
          { id: "B", text: "A-(IV), B-(III), C-(II), D-(I)" },
          { id: "C", text: "A-(III), B-(I), C-(IV), D-(II)" },
          { id: "D", text: "A-(II), B-(I), C-(III), D-(IV)" },
        ],
        correctOption: "A",
        explanation: "A: V const, C halved -> U = ½CV² halved (III). B: Q const, C halved -> U = Q²/(2C) doubled (IV). C: V const, C -> KC -> U -> KU (I). D: Q const, C -> KC -> U -> U/K (II).",
        difficulty: "hard",
      },
    ],
    links: {
      prerequisites: [
        { title: "Electric Charges and Fields", slug: "electric-charges-and-fields" },
      ],
      relatedTopics: [
        { title: "Current Electricity", slug: "electric-current-ohms-law-kirchhoffs-laws-potentiometer-meter-bridge" },
      ],
      practiceTestId: "practice-physics-unit1-test2",
      practiceTestUrl: "/test/practice-physics-unit1-test2",
      weaknessReportUrl: "/dashboard/radar?subject=physics",
    },
    subjectSpecific: {
      physics: {
        examinableDerivations: [
          {
            title: "Capacitance of a Parallel Plate Capacitor with Dielectric Slab",
            briefSteps: [
              "Let plate area be $A$, separation $d$, charge $\\pm Q$. Vacuum field $E_0 = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q}{\\varepsilon_0 A}$.",
              "Insert dielectric of thickness $t < d$ and constant $K$. Field inside dielectric is $E = E_0 / K$. Field in air gap is $E_0$.",
              "Potential difference: $V = E_0(d - t) + E t = E_0(d - t) + \\frac{E_0}{K} t = E_0\\left[d - t + \\frac{t}{K}\\right] = \\frac{Q}{\\varepsilon_0 A}\\left[d - t\\left(1 - \\frac{1}{K}\\right)\\right]$.",
              "Capacitance $C = \\frac{Q}{V} = \\frac{\\varepsilon_0 A}{d - t(1 - 1/K)}$.",
            ],
          },
        ],
        unitDimensionTable: [
          { quantity: "Electric Potential (V)", dimension: "[M L² T⁻³ A⁻¹]", unit: "Volt (V)" },
          { quantity: "Capacitance (C)", dimension: "[M⁻¹ L⁻² T⁴ A²]", unit: "Farad (F)" },
          { quantity: "Energy Density (u)", dimension: "[M L⁻¹ T⁻²]", unit: "J/m³" },
          { quantity: "Dielectric Constant (K)", dimension: "[M⁰ L⁰ T⁰ A⁰]", unit: "Dimensionless" },
        ],
        graphInterpretations: [
          {
            graphName: "V vs r for Point Charge vs Dipole",
            slopeMeaning: "Negative of electric field (-dV/dr = E)",
            areaMeaning: "Not physically defined for V vs r",
            keyFeature: "Point charge decays as 1/r; Dipole potential decays as 1/r² (steeper curvature).",
          },
        ],
      },
    },
    metadata: {
      confidence: "high",
      needsHumanReview: false,
      lastUpdated: new Date().toISOString(),
      version: 1,
      wordCount: 1520,
      isFreePreview: true,
    },
  },
];
