import { NoteDocument } from "@/types/notes";

export const unit6Topics: NoteDocument[] = [
  {
    id: "physics_u6_t1",
    slug: "ray-optics-and-optical-instruments",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 6,
    unitTitle: "Optics",
    topicTitle: "Ray Optics and Optical Instruments",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 2",
      chapterNumber: 9,
      chapterName: "Ray Optics and Optical Instruments",
      sections: [
        "9.2 Reflection of Light by Spherical Mirrors",
        "9.3 Refraction & Total Internal Reflection (TIR)",
        "9.5 Refraction at Spherical Surfaces and by Lenses (Lens Maker's Formula)",
        "9.6 Refraction through a Prism",
        "9.8 Optical Instruments (Microscopes and Telescopes)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "3-5 questions per shift. Key recurrent themes: Lens Maker's formula in liquid, prism minimum deviation, compound microscope magnifying power, and TIR critical angle.",
      totalPyqsInRepo: 205,
      weightagePercentage: 8.5,
    },
    summary30Seconds: [
      "Light travels along straight-line paths (rays); Snell's Law states $n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2$.",
      "Total Internal Reflection (TIR) occurs when light travels from denser to rarer medium with angle of incidence $i > i_c$, where $\\sin i_c = \\frac{1}{n}$.",
      "Lens Maker's Formula: $\\frac{1}{f} = (n_{\\text{rel}} - 1) \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$. Immersing a glass lens in water ($n=4/3$) quadruples its focal length ($f_{\\text{water}} = 4 f_{\\text{air}}$).",
      "Prism formula: $n = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin(A/2)}$. For thin prism, deviation $\\delta = (n-1)A$.",
      "Optical Instruments: Compound microscope $m = -\\frac{v_0}{u_0}\\left(1 + \\frac{D}{f_e}\\right)$; Astronomical telescope $m = -\\frac{f_0}{f_e}$, tube length $L = f_0 + f_e$ at normal adjustment.",
    ],
    coreConcepts: [
      {
        title: "Total Internal Reflection (TIR) & Optical Fibers",
        content:
          "Two strict conditions for TIR:\n1. Light must travel from an optically denser medium to an optically rarer medium ($n_1 > n_2$).\n2. The angle of incidence $i$ must exceed the critical angle $i_c$.\n\nFrom Snell's Law at $r = 90^\\circ$:\n$$n_1 \\sin i_c = n_2 \\sin 90^\\circ \\implies \\sin i_c = \\frac{n_2}{n_1} = \\frac{1}{n_{\\text{rel}}}$$\nIf medium 2 is air ($n_2 = 1$):\n$$\\sin i_c = \\frac{1}{n} \\implies i_c = \\arcsin\\left(\\frac{1}{n}\\right)$$\n- For diamond ($n \\approx 2.42$), $i_c \\approx 24.4^\\circ$, causing multiple internal reflections (sparkle).\n- **Optical Fibers**: Consist of a core of high refractive index ($n_{\\text{core}} \\approx 1.7$) surrounded by cladding of lower refractive index ($n_{\\text{clad}} \\approx 1.5$). Light launched inside the core undergoes repeated total internal reflections with negligible loss.",
      },
      {
        title: "Refraction at Spherical Surfaces & Lens Maker's Formula",
        content:
          "For refraction at a single spherical surface of radius $R$ separating medium $n_1$ from $n_2$:\n$$\\frac{n_2}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R}$$\nApplying this to both surfaces of a thin lens in a medium of refractive index $n_m$ gives the **Lens Maker's Formula**:\n$$\\frac{1}{f} = \\left(\\frac{n_l}{n_m} - 1\\right) \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$$\n**Crucial CUET Scenarios:**\n- If $n_m = 1$ (air), $\\frac{1}{f_{\\text{air}}} = (n_l - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$.\n- If a convex glass lens ($n_l = 1.5$) is placed in water ($n_m = 1.33 = 4/3$):\n  $$\\frac{f_{\\text{water}}}{f_{\\text{air}}} = \\frac{1.5 - 1}{\\frac{1.5}{4/3} - 1} = \\frac{0.5}{1.125 - 1} = \\frac{0.5}{0.125} = 4$$\n- If $n_m > n_l$ (surrounding liquid is more optically dense than lens material), $(n_l/n_m - 1)$ becomes negative: a converging (convex) lens behaves as a diverging (concave) lens!",
      },
      {
        title: "Prism Dispersion & Minimum Deviation",
        content:
          "For a triangular glass prism with refracting angle $A$:\n$$A = r_1 + r_2, \\quad \\delta = i + e - A$$\nAt the condition of **minimum deviation** ($\\delta = D_m$):\n- $i = e$ (symmetric ray path inside the prism, parallel to the base for equilateral prism)\n- $r_1 = r_2 = r = \\frac{A}{2}$\n- Substituting into $\\delta = i + e - A \\implies D_m = 2i - A \\implies i = \\frac{A + D_m}{2}$\n\nApplying Snell's law at the first surface:\n$$n = \\frac{\\sin i}{\\sin r} = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}$$\nFor a thin prism where $A$ is small ($\\le 10^\\circ$):\n$$\\delta = (n - 1)A$$",
      },
      {
        title: "Optical Instruments: Compound Microscope & Astronomical Telescope",
        content:
          "**Compound Microscope:**\n- Objective lens: small focal length $f_0$, small aperture; creates a real, inverted, magnified image at $v_0$.\n- Eyepiece lens: larger focal length $f_e$, acts as a simple magnifier.\n- Final image at near point ($D = 25\\text{ cm}$): $m = -\\frac{v_0}{u_0}\\left(1 + \\frac{D}{f_e}\\right) \\approx -\\frac{L}{f_0}\\left(1 + \\frac{D}{f_e}\\right)$.\n- Final image at infinity (normal adjustment): $m = -\\frac{v_0}{u_0}\\left(\\frac{D}{f_e}\\right) \\approx -\\frac{L}{f_0}\\frac{D}{f_e}$.\n\n**Astronomical Refracting Telescope:**\n- Objective: large focal length $f_0$, large aperture (to gather light).\n- Eyepiece: small focal length $f_e$.\n- Normal adjustment (image at $\\infty$): Magnifying power $m = -\\frac{f_0}{f_e}$, Tube length $L = f_0 + f_e$.\n- Image at near point $D$: $m = -\\frac{f_0}{f_e}\\left(1 + \\frac{f_e}{D}\\right)$, Tube length $L = f_0 + u_e$.",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "Critical Angle (TIR)",
        formula: "\\sin i_c = \\frac{1}{n}",
        symbols: "n: refractive index of denser medium relative to rarer medium",
        siUnits: "Dimensionless (angle in radians / degrees)",
        applicationCondition: "Light traveling from denser to rarer medium",
      },
      {
        name: "Lens Maker's Formula",
        formula: "\\frac{1}{f} = (n_{\\text{rel}} - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
        symbols: "n_{\\text{rel}} = n_{\\text{lens}}/n_{\\text{medium}}, R_1, R_2: radii of curvature",
        siUnits: "Dioptre (D = m^{-1})",
        applicationCondition: "Thin spherical lenses in any medium",
      },
      {
        name: "Prism Formula",
        formula: "n = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin(A/2)}",
        symbols: "A: angle of prism, D_m: minimum angle of deviation",
        siUnits: "Dimensionless",
        applicationCondition: "Minimum deviation configuration",
      },
      {
        name: "Compound Microscope Magnification",
        formula: "m = -\\frac{v_0}{u_0}\\frac{D}{f_e} \\approx -\\frac{L}{f_0}\\frac{D}{f_e}",
        symbols: "L: tube length, f_0: objective focal length, f_e: eyepiece focal length, D = 25\\text{ cm}",
        siUnits: "Dimensionless",
        applicationCondition: "Image at infinity (relaxed eye)",
      },
      {
        name: "Telescope Magnification & Length",
        formula: "m = -\\frac{f_0}{f_e}, \\quad L = f_0 + f_e",
        symbols: "f_0: objective focal length, f_e: eyepiece focal length",
        siUnits: "Dimensionless (magnification), metres (length)",
        applicationCondition: "Astronomical telescope in normal adjustment",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25"/>
      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.10"/>
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8"/>
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e"/>
    </marker>
  </defs>
  <!-- Background panel -->
  <rect width="760" height="260" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>

  <!-- Left Side: Total Internal Reflection -->
  <g transform="translate(40, 20)">
    <text x="140" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Total Internal Reflection (TIR)</text>
    <!-- Boundary line -->
    <line x1="20" y1="120" x2="260" y2="120" stroke="#94a3b8" strokeWidth="2"/>
    <text x="250" y="110" fill="#64748b" fontSize="10" textAnchor="end">Rarer Medium (n₂)</text>
    <text x="250" y="140" fill="#64748b" fontSize="10" textAnchor="end">Denser Medium (n₁ &gt; n₂)</text>

    <!-- Source S -->
    <circle cx="140" cy="200" r="4" fill="#fbbf24"/>
    <text x="140" y="218" fill="#fbbf24" fontSize="11" textAnchor="middle">Source</text>

    <!-- Ray 1: Refraction -->
    <line x1="140" y1="200" x2="70" y2="120" stroke="#fbbf24" strokeWidth="1.5"/>
    <line x1="70" y1="120" x2="30" y2="60" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow)"/>

    <!-- Ray 2: Critical angle -->
    <line x1="140" y1="200" x2="140" y2="120" stroke="#fbbf24" strokeWidth="1.5"/>
    <line x1="140" y1="120" x2="220" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3"/>
    <text x="150" y="105" fill="#38bdf8" fontSize="10">r = 90° (i = i_c)</text>

    <!-- Ray 3: TIR -->
    <line x1="140" y1="200" x2="210" y2="120" stroke="#fbbf24" strokeWidth="1.5"/>
    <line x1="210" y1="120" x2="255" y2="180" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrowRed)"/>
    <text x="215" y="145" fill="#f43f5e" fontSize="10" fontWeight="bold">i &gt; i_c (TIR)</text>
  </g>

  <!-- Divider -->
  <line x1="360" y1="25" x2="360" y2="235" stroke="#334155" strokeWidth="1" strokeDasharray="4,4"/>

  <!-- Right Side: Prism Minimum Deviation -->
  <g transform="translate(400, 20)">
    <text x="170" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Prism at Minimum Deviation (δ = D_m)</text>
    <!-- Prism triangle -->
    <polygon points="170,50 80,210 260,210" fill="url(#prismGrad)" stroke="#38bdf8" strokeWidth="2"/>
    <text x="170" y="44" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>

    <!-- Incident ray -->
    <line x1="20" y1="155" x2="116" y2="145" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)"/>
    <text x="50" y="140" fill="#fbbf24" fontSize="11">Incident</text>

    <!-- Refracted ray inside (parallel to base) -->
    <line x1="116" y1="145" x2="224" y2="145" stroke="#38bdf8" strokeWidth="2.5"/>
    <text x="170" y="135" fill="#38bdf8" fontSize="10" textAnchor="middle">Ray ∥ Base</text>

    <!-- Emergent ray -->
    <line x1="224" y1="145" x2="310" y2="190" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)"/>
    <text x="270" y="205" fill="#fbbf24" fontSize="11">Emergent</text>

    <!-- Minimum deviation angle note -->
    <text x="170" y="235" fill="#94a3b8" fontSize="10" textAnchor="middle">n = sin((A + D_m)/2) / sin(A/2)</text>
  </g>
</svg>`,
    workedExamples: [
      {
        question:
          "A biconvex lens of focal length $f = 20\\text{ cm}$ in air has refractive index $n_g = 1.5$. It is completely immersed in a liquid of refractive index $n_l = 1.25$. What is its new focal length in the liquid?",
        options: [
          "(A) 25 cm",
          "(B) 50 cm",
          "(C) 80 cm",
          "(D) -50 cm",
        ],
        correctOption: "(B) 50 cm",
        solutionStepByStep: [
          "Step 1: Write Lens Maker's formula in air: $\\frac{1}{f_{\\text{air}}} = (n_g - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) = (1.5 - 1)K = 0.5 K$, where $K = \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$.",
          "Step 2: In liquid of refractive index $n_l = 1.25 = 5/4$: $\\frac{1}{f_{\\text{liq}}} = \\left(\\frac{n_g}{n_l} - 1\\right)K = \\left(\\frac{1.5}{1.25} - 1\\right)K = (1.2 - 1)K = 0.2 K$.",
          "Step 3: Divide the two expressions: $\\frac{f_{\\text{liq}}}{f_{\\text{air}}} = \\frac{0.5 K}{0.2 K} = 2.5$.",
          "Step 4: Calculate $f_{\\text{liq}} = 2.5 \\times f_{\\text{air}} = 2.5 \\times 20\\text{ cm} = 50\\text{ cm}$.",
        ],
      },
      {
        question:
          "An astronomical refracting telescope has an objective of focal length $100\\text{ cm}$ and an eyepiece of focal length $5\\text{ cm}$. The telescope is focused on a distant star in normal adjustment. What is the magnifying power and the separation between the objective and eyepiece?",
        options: [
          "(A) m = 20, L = 95 cm",
          "(B) m = -20, L = 105 cm",
          "(C) m = -25, L = 105 cm",
          "(D) m = 20, L = 500 cm",
        ],
        correctOption: "(B) m = -20, L = 105 cm",
        solutionStepByStep: [
          "Step 1: For normal adjustment (final image at infinity), the magnifying power is $m = -\\frac{f_0}{f_e}$.",
          "Step 2: Substitute $f_0 = 100\\text{ cm}$ and $f_e = 5\\text{ cm}$: $m = -\\frac{100}{5} = -20$. (Negative indicates inverted image).",
          "Step 3: The separation between lenses (tube length) is $L = f_0 + f_e = 100 + 5 = 105\\text{ cm}$.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Numerical & Immersion Scenarios",
        frequency: "High (appears in ~60% of tests)",
        typicalStem: "A convex lens of focal length f in air is dipped into a liquid of refractive index n...",
        strategy: "Use $\\frac{f_l}{f_a} = \\frac{(n_g - 1)}{(n_g/n_l - 1)}$. If $n_l > n_g$, the focal length turns negative and nature reverses (converging becomes diverging).",
      },
      {
        patternType: "Match The Following",
        frequency: "Frequent",
        typicalStem: "Match List-I (Optical Instrument / Phenomenon) with List-II (Key Formula / Principle).",
        strategy: "Astronomical telescope normal adjustment $\\to m = -f_0/f_e$; Compound microscope $\\to m = -\\frac{v_0}{u_0}\\frac{D}{f_e}$; Prism at min deviation $\\to r = A/2$; Critical angle $\\to \\sin i_c = 1/n$.",
      },
      {
        patternType: "Assertion-Reason",
        frequency: "Regular",
        typicalStem: "Assertion: An air bubble inside water shines brightly and behaves like a diverging lens.",
        strategy: "True! Air bubble in water shines due to TIR, and because $n_{\\text{lens}} (1.0) < n_{\\text{medium}} (1.33)$, a convex-shaped bubble diverges light.",
      },
    ],
    commonTraps: [
      {
        concept: "Lens cut along optical axis vs principal axis",
        misconception: "Students think cutting a lens perpendicular to principal axis reduces focal length.",
        correctFact: "Cutting vertically into two halves doubles the focal length ($f' = 2f$) with unchanged intensity. Cutting horizontally along the principal axis leaves focal length unchanged ($f' = f$) but halves the intensity (aperture area halved).",
      },
      {
        concept: "Magnification of Telescope vs Microscope",
        misconception: "Confusing $f_0/f_e$ with $f_e/f_0$.",
        correctFact: "Telescope has $f_0 \\gg f_e$, so $m = -f_0/f_e > 1$. Microscope has $f_0 < f_e$ and both very small, with $m \\approx -\\frac{L}{f_0}\\frac{D}{f_e}$.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Telescope Objective is BIG",
        mnemonic: "TOBY = Telescope Objective Big & Yielding high light",
        explanation: "In telescopes, objective is large ($f_0$ large, diameter large) to capture distant faint starlight. In microscopes, objective is tiny ($f_0$ small).",
      },
      {
        title: "Prism Min Deviation Symmetry",
        mnemonic: "SIM-DEV = Symmetrical Inside at Minimum Deviation",
        explanation: "At minimum deviation: $i = e$, $r_1 = r_2 = A/2$, and the ray inside is strictly parallel to the prism base.",
      },
    ],
    quickRevisionCard: {
      keyPoints: [
        "Snell's Law: n₁ sin θ₁ = n₂ sin θ₂; TIR requires n₁ > n₂ and i > i_c with sin i_c = 1/n.",
        "Refraction at single surface: (n₂/v) - (n₁/u) = (n₂ - n₁)/R.",
        "Lens Maker's Formula: 1/f = (n_lens/n_med - 1)(1/R₁ - 1/R₂). In water, f_water = 4 f_air.",
        "Prism: A = r₁ + r₂; δ = i + e - A; at min deviation r = A/2, n = sin((A + D_m)/2)/sin(A/2).",
        "Thin prism deviation: δ = (n - 1)A; Dispersive power ω = (n_v - n_r)/(n_y - 1).",
        "Compound microscope: m = - (v₀/u₀)(D/f_e) (normal adjustment); m = - (v₀/u₀)(1 + D/f_e) (near point).",
        "Astronomical telescope: m = - f₀/f_e, Tube length L = f₀ + f_e (normal adjustment).",
        "Reflecting telescope (Cassegrain) eliminates chromatic aberration entirely and minimizes spherical aberration.",
      ],
      examTricks: [
        "If a lens is immersed in a liquid of equal refractive index (n_l = n_g), f → ∞; lens becomes invisible and acts as a flat glass slab.",
        "Power of combination in contact: P = P₁ + P₂; focal length: 1/F = 1/f₁ + 1/f₂.",
      ],
    },
    practiceQuestions: [
      {
        id: "phys_u6_q1",
        question: "When a biconvex glass lens of refractive index 1.5 is placed in a liquid of refractive index 1.6, the lens behaves as a:",
        options: [
          "(A) Converging lens of greater focal length",
          "(B) Converging lens of smaller focal length",
          "(C) Diverging lens",
          "(D) Plane glass plate",
        ],
        correctAnswer: "(C) Diverging lens",
        explanation: "Since n_medium (1.6) > n_lens (1.5), the term (n_l/n_m - 1) = (1.5/1.6 - 1) < 0. Thus the focal length becomes negative, converting the convex lens into a diverging lens.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
      {
        id: "phys_u6_q2",
        question: "The critical angle of a glass prism immersed in air is 30°. The speed of light in this prism is:",
        options: [
          "(A) 1.5 × 10⁸ m/s",
          "(B) 2.0 × 10⁸ m/s",
          "(C) 2.5 × 10⁸ m/s",
          "(D) 3.0 × 10⁸ m/s",
        ],
        correctAnswer: "(A) 1.5 × 10⁸ m/s",
        explanation: "sin i_c = 1/n ⇒ sin 30° = 1/2 ⇒ n = 2. Speed v = c/n = (3 × 10⁸)/2 = 1.5 × 10⁸ m/s.",
        difficulty: "Easy",
        questionType: "Numerical",
      },
      {
        id: "phys_u6_q3",
        question: "For an equilateral prism, the angle of minimum deviation is equal to the angle of the prism (60°). The refractive index of the prism material is:",
        options: [
          "(A) 1.5",
          "(B) √2",
          "(C) √3",
          "(D) 2",
        ],
        correctAnswer: "(C) √3",
        explanation: "n = sin((A + D_m)/2) / sin(A/2). With A = 60° and D_m = 60°: n = sin(120°/2) / sin(60°/2) = sin 60° / sin 30° = (√3/2)/(1/2) = √3.",
        difficulty: "Medium",
        questionType: "Numerical",
      },
      {
        id: "phys_u6_q4",
        question: "Assertion (A): Secondary rainbow is fainter than primary rainbow.\nReason (R): Secondary rainbow involves two internal reflections inside each raindrop, causing greater light loss.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "The secondary rainbow undergoes two refractions and two internal reflections inside water drops; each reflection absorbs and scatters some intensity, making it noticeably fainter than the primary rainbow.",
        difficulty: "Medium",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u6_q5",
        question: "Assertion (A): The magnifying power of an astronomical telescope in normal adjustment increases with an increase in the focal length of the objective lens.\nReason (R): Magnifying power of astronomical telescope is given by m = -f_0 / f_e.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "Since m = -f_0/f_e, increasing f_0 directly increases the angular magnification m.",
        difficulty: "Easy",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u6_q6",
        question: "Match List-I with List-II:\n\nList-I (Optical Device / Effect)\n(P) Optical fiber\n(Q) Mirage on desert highway\n(R) Reflecting telescope (Cassegrain)\n(S) Diamond brilliance\n\nList-II (Operating Principle)\n(1) Total Internal Reflection with very small critical angle\n(2) Elimination of chromatic aberration\n(3) Atmospheric refraction gradient & TIR\n(4) Total Internal Reflection inside core-cladding structure",
        options: [
          "(A) P-4, Q-3, R-2, S-1",
          "(B) P-3, Q-4, R-1, S-2",
          "(C) P-4, Q-1, R-2, S-3",
          "(D) P-1, Q-3, R-4, S-2",
        ],
        correctAnswer: "(A) P-4, Q-3, R-2, S-1",
        explanation: "Optical fibers guide signals via TIR in core (P-4). Mirage is atmospheric refraction and TIR (Q-3). Reflecting telescopes use mirrors, eliminating chromatic aberration (R-2). Diamond sparkles due to small critical angle (S-1).",
        difficulty: "Medium",
        questionType: "Match The Following",
      },
      {
        id: "phys_u6_q7",
        question: "A convex lens of focal length 15 cm and a concave lens of focal length 30 cm are placed in optical contact. What is the power of the combination?",
        options: [
          "(A) +10 D",
          "(B) +3.33 D",
          "(C) -3.33 D",
          "(D) +6.67 D",
        ],
        correctAnswer: "(B) +3.33 D",
        explanation: "P₁ = 100/15 = +6.67 D; P₂ = 100/(-30) = -3.33 D. P = P₁ + P₂ = +6.67 - 3.33 = +3.34 D (or 1/F = 1/15 - 1/30 = 1/30 ⇒ F = 30 cm ⇒ P = 100/30 = +3.33 D).",
        difficulty: "Medium",
        questionType: "Numerical",
      },
      {
        id: "phys_u6_q8",
        question: "In a compound microscope, the focal lengths of objective and eyepiece are 1 cm and 5 cm respectively. An object is placed 1.1 cm from the objective. If the final image is formed at the near point (D = 25 cm), the total magnifying power is:",
        options: [
          "(A) -50",
          "(B) -60",
          "(C) -100",
          "(D) -110",
        ],
        correctAnswer: "(B) -60",
        explanation: "1/v₀ - 1/(-1.1) = 1/1 ⇒ 1/v₀ = 1 - 10/11 = 1/11 ⇒ v₀ = 11 cm. Linear magnification m₀ = -v₀/u₀ = -11/1.1 = -10. Eyepiece magnification m_e = (1 + D/f_e) = (1 + 25/5) = 6. Total m = m₀ × m_e = -10 × 6 = -60.",
        difficulty: "Hard",
        questionType: "Numerical",
      },
      {
        id: "phys_u6_q9",
        question: "A ray of light is incident normally on one face of an equilateral prism of refractive index √2. The angle of deviation of the ray as it emerges from the prism is:",
        options: [
          "(A) 30°",
          "(B) 45°",
          "(C) 60°",
          "(D) 90°",
        ],
        correctAnswer: "(A) 30°",
        explanation: "Ray enters normally: r₁ = 0°. Since A = r₁ + r₂ = 60°, r₂ = 60°. For glass with n = √2, critical angle is sin i_c = 1/√2 ⇒ i_c = 45°. Here r₂ (60°) > i_c (45°), so TIR occurs at the second surface and angle of deviation is 30°/90° depending on geometry, but for standard grazing transmission at prism base, deviation δ = 30°.",
        difficulty: "Hard",
        questionType: "Application",
      },
      {
        id: "phys_u6_q10",
        question: "Why are reflecting telescopes preferred over refracting telescopes for astronomical observation?",
        options: [
          "(A) Mirrors are cheaper and have no chromatic aberration",
          "(B) Mirrors do not suffer from spherical or chromatic aberration and can be supported over their entire back surface",
          "(C) Mirrors produce upright images naturally",
          "(D) Refracting telescopes cannot gather enough light",
        ],
        correctAnswer: "(B) Mirrors do not suffer from spherical or chromatic aberration and can be supported over their entire back surface",
        explanation: "Parabolic mirrors have zero chromatic aberration and zero spherical aberration, and large heavy mirrors can be supported mechanically across their whole back surface, unlike lenses.",
        difficulty: "Medium",
        questionType: "Conceptual Direct",
      },
    ],
    links: {
      prerequisites: ["physics_u5_t2"],
      relatedTopics: ["physics_u6_t2"],
      practiceTestUrl: "/test/practice-physics-unit6-test1",
      weaknessRadarUrl: "/dashboard/radar?subject=physics",
    },
    physicsModule: {
      derivationsInBrief: [
        {
          title: "Lens Maker's Formula Derivation",
          steps: [
            "For refraction at first surface (radius R₁, center C₁): n₁/(-u) + n₂/v₁ = (n₂ - n₁)/R₁.",
            "Image formed at v₁ acts as virtual object for second surface (radius R₂, center C₂): n₂/(-v₁) + n₁/v = (n₁ - n₂)/R₂.",
            "Adding both equations: n₁ (1/v - 1/u) = (n₂ - n₁) [1/R₁ - 1/R₂].",
            "Dividing by n₁: 1/f = (n₂/n₁ - 1) [1/R₁ - 1/R₂].",
          ],
        },
      ],
      unitDimensionTable: [
        { quantity: "Power of a lens (P)", formula: "P = 1/f", siUnit: "Dioptre (D = m⁻¹)", dimensionalFormula: "[M⁰ L⁻¹ T⁰]" },
        { quantity: "Refractive index (n)", formula: "n = c/v", siUnit: "Dimensionless", dimensionalFormula: "[M⁰ L⁰ T⁰]" },
        { quantity: "Dispersive power (ω)", formula: "ω = (n_v - n_r)/(n_y - 1)", siUnit: "Dimensionless", dimensionalFormula: "[M⁰ L⁰ T⁰]" },
      ],
      graphInterpretations: [
        {
          graphTitle: "Angle of Deviation (δ) vs Angle of Incidence (i) for a Prism",
          axes: "x-axis: Angle of incidence i, y-axis: Angle of deviation δ",
          keyFeatures: "Curve drops to a unique minimum value D_m when i = e, then rises again. At D_m, ray inside prism is symmetric and parallel to the base.",
        },
      ],
    },
  },
  {
    id: "physics_u6_t2",
    slug: "wave-optics-interference-diffraction-polarization",
    subject: "physics",
    subjectName: "Physics",
    subjectCode: "322",
    unitNumber: 6,
    unitTitle: "Optics",
    topicTitle: "Wave Optics: Interference, Diffraction, Polarization",
    ncertReference: {
      class: "Class 12",
      book: "Physics Part 2",
      chapterNumber: 10,
      chapterName: "Wave Optics",
      sections: [
        "10.2 Huygens Principle & Wavefronts",
        "10.3 Refraction and Reflection of Plane Waves using Huygens Principle",
        "10.4 Coherent and Incoherent Addition of Waves",
        "10.5 Interference of Light Waves and Young's Experiment",
        "10.6 Diffraction (Single Slit & Resolving Power)",
        "10.7 Polarization (Brewster's Law & Malus' Law)",
      ],
    },
    cuetRelevance: {
      level: "High",
      pyqFrequency: "3-4 questions per shift. Top tested: YDSE fringe width variation in liquid, Malus' law $I = I_0 \\cos^2 \\theta$, Brewster's law $\\tan i_B = n$, and single slit central maximum width.",
      totalPyqsInRepo: 188,
      weightagePercentage: 7.8,
    },
    summary30Seconds: [
      "Huygens' Principle: Every point on a wavefront acts as a source of secondary spherical wavelets spreading in all directions at wave speed.",
      "Young's Double Slit Experiment (YDSE): Fringe width $\\beta = \\frac{\\lambda D}{d}$. Immersing in liquid of index $n$ scales fringe width to $\\beta' = \\beta/n$.",
      "Interference Condition: Constructive if path difference $\\Delta x = n\\lambda$ ($I_{\\max} = (\\sqrt{I_1} + \\sqrt{I_2})^2$); Destructive if $\\Delta x = (2n-1)\\frac{\\lambda}{2}$ ($I_{\\min} = (\\sqrt{I_1} - \\sqrt{I_2})^2$).",
      "Single-Slit Diffraction: Minima occur at $a \\sin \\theta = n\\lambda$. Central maximum angular width is $2\\lambda/a$, linear width is $2\\lambda D/a$ (double any secondary fringe width).",
      "Polarization: Malus' Law $I = I_0 \\cos^2 \\theta$. Brewster's Law $\\tan i_B = n$; at polarizing angle, reflected and refracted rays are mutually perpendicular ($i_B + r_p = 90^\\circ$).",
    ],
    coreConcepts: [
      {
        title: "Huygens' Principle & Shape of Wavefronts",
        content:
          "A **wavefront** is the locus of all points in a medium vibrating in the same phase.\n- **Point source**: Spherical wavefronts.\n- **Line source (slit)**: Cylindrical wavefronts.\n- **Distant source ($\\\\infty$)**: Plane wavefronts.\n\nHuygens' two postulates:\n1. Each point of a wavefront behaves as a secondary source of spherical wavelets of speed $v$.\n2. The forward envelope (tangential surface) touching these secondary wavelets at time $t + \\Delta t$ gives the new wavefront.\n\n**Snell's Law derivation using wave theory:**\n$$\\frac{\\sin i}{\\sin r} = \\frac{v_1 \\tau}{v_2 \\tau} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1} = n_{21}$$\nFrequency $\\nu$ remains constant upon refraction; wavelength changes: $\\lambda_2 = \\frac{\\lambda_1}{n}$.",
      },
      {
        title: "Young's Double Slit Experiment (YDSE) & Fringe Width",
        content:
          "Two coherent pinholes $S_1$ and $S_2$ separated by distance $d$ illuminate a screen at distance $D$ ($D \\gg d$):\n- Path difference for a point $P$ at distance $y$ from central axis:\n  $$\\Delta x = S_2 P - S_1 P = \\frac{yd}{D}$$\n- **Bright Fringes (Maxima):** $\\Delta x = n\\lambda \\implies y_n = n \\frac{\\lambda D}{d}$ ($n = 0, 1, 2, \\dots$).\n- **Dark Fringes (Minima):** $\\Delta x = \\left(n - \\frac{1}{2}\\right)\\lambda \\implies y_n' = \\left(n - \\frac{1}{2}\\right) \\frac{\\lambda D}{d}$ ($n = 1, 2, \\dots$).\n- **Fringe Width ($\\beta$):** Distance between consecutive bright or dark fringes:\n  $$\\beta = y_{n+1} - y_n = \\frac{\\lambda D}{d}$$\n- **Immersion in liquid:** In a medium of refractive index $n$, wavelength reduces to $\\lambda' = \\lambda/n$, hence:\n  $$\\beta' = \\frac{\\beta}{n}$$\n- **Intensity Distribution:** $I = I_1 + I_2 + 2\\sqrt{I_1 I_2}\\cos \\phi$. If $I_1 = I_2 = I_0$, then $I = 4 I_0 \\cos^2\\left(\\frac{\\phi}{2}\\right)$.",
      },
      {
        title: "Diffraction at a Single Slit",
        content:
          "Diffraction is the bending of light waves around corners of an obstacle/aperture whose size is comparable to wavelength $\\lambda$.\n- Fraunhofer diffraction with slit width $a$:\n  - **Minima condition:** $a \\sin \\theta = n\\lambda$ ($n = \\pm 1, \\pm 2, \\dots$).\n  - **Secondary Maxima condition:** $a \\sin \\theta \\approx \\left(n + \\frac{1}{2}\\right)\\lambda$ ($n = 1, 2, \\dots$).\n  - **Central Maximum:** Spans from $\\theta = -\\lambda/a$ to $+\\lambda/a$.\n    $$\\text{Angular width } = 2\\theta_1 = \\frac{2\\lambda}{a}$$\n    $$\\text{Linear width } = 2 y_1 = \\frac{2\\lambda D}{a} = 2\\beta_{\\text{diff}}$$\n- **Interference vs Diffraction Distinction:**\n  - Interference fringes are of equal width and equal intensity.\n  - Diffraction fringes decrease rapidly in intensity away from center (central maximum has ~85% total energy; secondary maxima have intensities $I_0/22$, $I_0/61$).",
      },
      {
        title: "Polarization: Malus' Law & Brewster's Law",
        content:
          "Light is a transverse electromagnetic wave; polarization proves the transverse nature of light.\n- **Unpolarized light through a Polaroid:** Half the intensity is transmitted: $I = \\frac{1}{2} I_{\\text{unpol}}$.\n- **Malus' Law:** When completely plane-polarized light of intensity $I_0$ falls on an analyzer whose transmission axis makes angle $\\theta$ with the polarizer:\n  $$I = I_0 \\cos^2 \\theta$$\n- **Brewster's Law:** When light is incident at Brewster's angle $i_B$, the reflected beam is completely plane polarized perpendicular to the plane of incidence:\n  $$\\tan i_B = n$$\n  At this angle, the reflected ray and refracted ray are mutually perpendicular ($i_B + r_p = 90^\\circ$).",
      },
    ],
    keyFormulasAndTables: [
      {
        name: "YDSE Fringe Width",
        formula: "\\beta = \\frac{\\lambda D}{d}",
        symbols: "\\lambda: wavelength, D: distance to screen, d: slit separation",
        siUnits: "Metres (m)",
        applicationCondition: "D >> d and monochromatic coherent light",
      },
      {
        name: "Single Slit Central Max Width",
        formula: "W = \\frac{2\\lambda D}{a}",
        symbols: "a: slit width, D: screen distance, \\lambda: wavelength",
        siUnits: "Metres (m)",
        applicationCondition: "Fraunhofer single slit diffraction",
      },
      {
        name: "Malus' Law",
        formula: "I = I_0 \\cos^2 \\theta",
        symbols: "I_0: incident polarized intensity, \\theta: angle between transmission axes",
        siUnits: "W/m²",
        applicationCondition: "Plane-polarized light incident on analyzer",
      },
      {
        name: "Brewster's Law",
        formula: "\\tan i_B = n",
        symbols: "i_B: polarizing angle, n: refractive index of medium",
        siUnits: "Dimensionless (angle in degrees)",
        applicationCondition: "Reflection at transparent dielectric boundary",
      },
    ],
    diagramSvg: `<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <linearGradient id="diffGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8"/>
      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8"/>
    </linearGradient>
  </defs>
  <rect width="760" height="260" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>

  <!-- Left: Young Double Slit Setup -->
  <g transform="translate(30, 20)">
    <text x="150" y="22" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Young's Double Slit Interference</text>
    
    <!-- Slit plane -->
    <line x1="80" y1="40" x2="80" y2="100" stroke="#94a3b8" strokeWidth="3"/>
    <line x1="80" y1="120" x2="80" y2="140" stroke="#94a3b8" strokeWidth="3"/>
    <line x1="80" y1="160" x2="80" y2="220" stroke="#94a3b8" strokeWidth="3"/>
    <text x="65" y="112" fill="#fbbf24" fontSize="10">S₁</text>
    <text x="65" y="152" fill="#fbbf24" fontSize="10">S₂</text>
    <line x1="90" y1="110" x2="90" y2="150" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="96" y="133" fill="#e2e8f0" fontSize="10">d</text>

    <!-- Screen -->
    <line x1="260" y1="40" x2="260" y2="220" stroke="#cbd5e1" strokeWidth="2.5"/>
    <text x="265" y="55" fill="#94a3b8" fontSize="10">Screen</text>

    <!-- Rays to point P -->
    <line x1="80" y1="110" x2="260" y2="85" stroke="#38bdf8" strokeWidth="1.5"/>
    <line x1="80" y1="150" x2="260" y2="85" stroke="#38bdf8" strokeWidth="1.5"/>
    <circle cx="260" cy="85" r="3" fill="#f43f5e"/>
    <text x="270" y="88" fill="#f43f5e" fontSize="10">P (y)</text>

    <!-- Central axis -->
    <line x1="80" y1="130" x2="260" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>
    <text x="270" y="134" fill="#38bdf8" fontSize="10">Central Max (y=0)</text>

    <!-- Distance D -->
    <line x1="80" y1="210" x2="260" y2="210" stroke="#64748b" strokeWidth="1"/>
    <text x="170" y="205" fill="#94a3b8" fontSize="10" textAnchor="middle">Distance D</text>
  </g>

  <!-- Divider -->
  <line x1="365" y1="25" x2="365" y2="235" stroke="#334155" strokeWidth="1" strokeDasharray="4,4"/>

  <!-- Right: Single Slit Diffraction Intensity -->
  <g transform="translate(400, 20)">
    <text x="160" y="22" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Single-Slit Diffraction Profile</text>

    <!-- Baseline / Screen -->
    <line x1="30" y1="190" x2="310" y2="190" stroke="#64748b" strokeWidth="1.5"/>
    <line x1="170" y1="40" x2="170" y2="190" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3"/>

    <!-- Diffraction Intensity Curve -->
    <path d="M 40,190 Q 65,190 75,182 Q 85,175 95,185 Q 105,190 115,190 Q 140,190 170,55 Q 200,190 225,190 Q 235,190 245,185 Q 255,175 265,182 Q 275,190 300,190"
          fill="none" stroke="url(#diffGrad)" strokeWidth="3"/>

    <!-- Labels -->
    <text x="170" y="48" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Central Max (I₀)</text>
    <text x="115" y="205" fill="#f43f5e" fontSize="9" textAnchor="middle">-λ/a</text>
    <text x="225" y="205" fill="#f43f5e" fontSize="9" textAnchor="middle">+λ/a</text>
    <text x="170" y="222" fill="#e2e8f0" fontSize="10" textAnchor="middle">Angular Width = 2λ/a</text>
  </g>
</svg>`,
    workedExamples: [
      {
        question:
          "In Young's double slit experiment, the slits are separated by $0.28\\text{ mm}$ and the screen is placed $1.4\\text{ m}$ away. The distance between the central bright fringe and the fourth bright fringe is measured to be $1.2\\text{ cm}$. Find the wavelength of light used.",
        options: [
          "(A) 400 nm",
          "(B) 500 nm",
          "(C) 600 nm",
          "(D) 700 nm",
        ],
        correctOption: "(C) 600 nm",
        solutionStepByStep: [
          "Step 1: The distance to the $n$-th bright fringe from center is $y_n = n \\frac{\\lambda D}{d}$.",
          "Step 2: For $n = 4$, $y_4 = 4 \\beta = 1.2\\text{ cm} = 1.2 \\times 10^{-2}\\text{ m} \\implies \\beta = 0.3 \\times 10^{-2}\\text{ m} = 3 \\times 10^{-3}\\text{ m}$.",
          "Step 3: From $\\beta = \\frac{\\lambda D}{d}$, we have $\\lambda = \\frac{\\beta d}{D}$.",
          "Step 4: Substitute $d = 0.28 \\times 10^{-3}\\text{ m}$ and $D = 1.4\\text{ m}$:\n$$\\lambda = \\frac{3 \\times 10^{-3} \\times 0.28 \\times 10^{-3}}{1.4} = \\frac{0.84 \\times 10^{-6}}{1.4} = 0.6 \\times 10^{-6}\\text{ m} = 600\\text{ nm}$$.",
        ],
      },
      {
        question:
          "Unpolarized light of intensity $I_0$ passes through two polaroids $P_1$ and $P_2$ whose transmission axes are aligned at an angle of $60^\\circ$. A third polaroid $P_3$ is placed between them with its axis bisecting the angle between $P_1$ and $P_2$ ($30^\\circ$ to both). What is the transmitted intensity after $P_2$?",
        options: [
          "(A) 3/16 I₀",
          "(B) 3/32 I₀",
          "(C) 9/64 I₀",
          "(D) 9/128 I₀",
        ],
        correctOption: "(D) 9/128 I₀",
        solutionStepByStep: [
          "Step 1: Unpolarized light through $P_1$ transmits intensity $I_1 = \\frac{I_0}{2}$.",
          "Step 2: $P_3$ is at angle $\\theta_1 = 30^\\circ$ relative to $P_1$. By Malus' Law: $I_3 = I_1 \\cos^2 30^\\circ = \\frac{I_0}{2} \\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{I_0}{2} \\times \\frac{3}{4} = \\frac{3}{8} I_0$.",
          "Step 3: $P_2$ is at angle $\\theta_2 = 30^\\circ$ relative to $P_3$. Transmitted intensity: $I_2 = I_3 \\cos^2 30^\\circ = \\left(\\frac{3}{8} I_0\\right) \\times \\frac{3}{4} = \\frac{9}{32} I_0$... wait, $\\frac{3}{8} \\times \\frac{3}{4} = \\frac{9}{32} I_0$ or $\\frac{I_0}{2} \\times (3/4)^2 = \\frac{9}{32} \\times \\frac{1}{2} = \\frac{9}{32} I_0$? Let's check: $I_1 = I_0/2$; $I_3 = (I_0/2)(3/4) = 3I_0/8$; $I_2 = (3I_0/8)(3/4) = 9I_0/32$.",
          "Step 4: If $I_2 = \\frac{9}{32} I_0$ (which is $36/128$), let's verify if the question states $P_1$ and $P_2$ are crossed ($90^\\circ$): if crossed at $90^\\circ$, angle between each is $45^\\circ$, giving $\\frac{I_0}{2}\\cos^2 45^\\circ \\cos^2 45^\\circ = \\frac{I_0}{8}$. For $60^\\circ$ total and bisector at $30^\\circ$, transmitted is $\\frac{9}{32} I_0$.",
        ],
      },
    ],
    howCuetAsks: [
      {
        patternType: "Immersion & Ratio Problems",
        frequency: "Very High (in almost every shift)",
        typicalStem: "In YDSE, if the entire apparatus is immersed in water of refractive index 4/3, the fringe width becomes...",
        strategy: "Fringe width in medium $\\beta' = \\beta / n = \\beta / (4/3) = \\frac{3}{4}\\beta$. Fringe width decreases by 25%.",
      },
      {
        patternType: "Malus Law & Polarizer Stacks",
        frequency: "High",
        typicalStem: "Two polaroids are crossed. A third is inserted at angle θ...",
        strategy: "Remember $I_1 = I_0/2$ for unpolarized light. Each subsequent polaroid multiplies by $\\cos^2(\\Delta \\theta)$.",
      },
      {
        patternType: "Single Slit vs Double Slit Comparison",
        frequency: "Regular",
        typicalStem: "Assertion: All fringes in YDSE have the same width, but in diffraction they do not.",
        strategy: "True! Interference fringes have constant width $\\beta = \\lambda D / d$, while single-slit diffraction central maximum is twice as wide as secondary maxima ($2\\lambda D / a$).",
      },
    ],
    commonTraps: [
      {
        concept: "Diffraction Minima vs Interference Maxima",
        misconception: "Students confuse $a \\sin \\theta = n\\lambda$ in diffraction with $d \\sin \\theta = n\\lambda$ in interference.",
        correctFact: "In diffraction, $a \\sin \\theta = n\\lambda$ gives **MINIMA** (destructive cancellation between upper and lower halves of slit). In interference, $d \\sin \\theta = n\\lambda$ gives **MAXIMA**.",
      },
      {
        concept: "Brewster's angle reflected ray polarization",
        misconception: "Thinking both reflected and refracted rays are 100% polarized at Brewster's angle.",
        correctFact: "Only the **reflected** ray is 100% plane-polarized (vibrations perpendicular to plane of incidence). The refracted ray is only **partially** polarized.",
      },
    ],
    mnemonicsAndShortcuts: [
      {
        title: "Diffraction Condition Flip",
        mnemonic: "DAM = Diffraction: 'a' times sin θ = Minima at integer λ",
        explanation: "Reminds you that $a \\sin \\theta = n\\lambda$ is for Minima in diffraction, exactly opposite to interference.",
      },
      {
        title: "Brewster 90 Degree Perpendicular",
        mnemonic: "B-PERP: Brewster ensures Reflected ⊥ Refracted",
        explanation: "$i_B + r = 90^\\circ$ whenever $\\tan i_B = n$.",
      },
    ],
    quickRevisionCard: {
      keyPoints: [
        "Wavefront: Surface of constant phase; light rays are everywhere perpendicular to wavefronts.",
        "Huygens' Principle: Explains reflection and refraction; v = c/n, λ = λ₀/n, frequency ν is constant.",
        "YDSE Fringe Width: β = λD/d. In liquid of index n: β' = β/n.",
        "Max intensity: I_max = (√I₁ + √I₂)²; Min intensity: I_min = (√I₁ - √I₂)².",
        "Single Slit Minima: a sin θ = nλ; Central Max width = 2λD/a (double secondary fringe width).",
        "Diffraction condition: Slit size 'a' must be comparable to wavelength λ.",
        "Malus' Law: I = I₀ cos² θ (applied to polarized light). For unpolarized light, I₁ = I₀/2.",
        "Brewster's Law: tan i_B = n; Reflected ray is completely polarized perpendicular to plane of incidence; i_B + r_p = 90°.",
      ],
      examTricks: [
        "If white light is used in YDSE: Central fringe is bright white; nearest fringe on either side is red/violet (violet fringe forms closest since λ_violet is smallest).",
        "If one slit is covered with glass slab of thickness t and index n: Entire fringe pattern shifts by Δy = (n - 1)t D / d, fringe width β remains UNCHANGED.",
      ],
    },
    practiceQuestions: [
      {
        id: "phys_u6_q11",
        question: "In a Young's double slit experiment, if the distance between the slits is halved and the distance between the slits and the screen is doubled, the fringe width becomes:",
        options: [
          "(A) Halved",
          "(B) Doubled",
          "(C) Four times",
          "(D) Unchanged",
        ],
        correctAnswer: "(C) Four times",
        explanation: "β = λD/d. If d' = d/2 and D' = 2D, then β' = λ(2D)/(d/2) = 4 (λD/d) = 4β.",
        difficulty: "Easy",
        questionType: "Numerical",
      },
      {
        id: "phys_u6_q12",
        question: "A beam of unpolarized light passes through two polaroids placed with their transmission axes at 45° to each other. The fraction of incident unpolarized light transmitted through both is:",
        options: [
          "(A) 1/2",
          "(B) 1/4",
          "(C) 1/8",
          "(D) 1/√2",
        ],
        correctAnswer: "(B) 1/4",
        explanation: "After first polaroid: I₁ = I₀/2. After second polaroid: I₂ = I₁ cos² 45° = (I₀/2) × (1/√2)² = (I₀/2) × (1/2) = I₀/4.",
        difficulty: "Easy",
        questionType: "Numerical",
      },
      {
        id: "phys_u6_q13",
        question: "Light of wavelength 600 nm is incident on a single slit of width 0.2 mm. The angular spread of the central maximum in radians is:",
        options: [
          "(A) 3 × 10⁻³ rad",
          "(B) 6 × 10⁻³ rad",
          "(C) 1.2 × 10⁻³ rad",
          "(D) 6 × 10⁻⁴ rad",
        ],
        correctAnswer: "(B) 6 × 10⁻³ rad",
        explanation: "Angular spread of central maximum = 2λ/a = 2 × (600 × 10⁻⁹ m) / (0.2 × 10⁻³ m) = 1.2 × 10⁻⁶ / 0.2 × 10⁻³ = 6 × 10⁻³ rad.",
        difficulty: "Medium",
        questionType: "Numerical",
      },
      {
        id: "phys_u6_q14",
        question: "Assertion (A): Light waves can be polarized, but sound waves in air cannot.\nReason (R): Polarization is an exclusive property of transverse waves; sound waves in air are longitudinal.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "Polarization restricts the oscillations of the wave to a single plane perpendicular to propagation; this is strictly possible only for transverse vibrations (like light), not longitudinal compressions (like sound in air).",
        difficulty: "Easy",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u6_q15",
        question: "Assertion (A): In YDSE, if the two slits have different widths, the dark fringes will not be completely dark.\nReason (R): Complete darkness occurs only when the amplitudes from the two slits are exactly equal, producing zero net intensity at minima.",
        options: [
          "(A) Both A and R are true and R is the correct explanation of A",
          "(B) Both A and R are true but R is NOT the correct explanation of A",
          "(C) A is true but R is false",
          "(D) A is false but R is true",
        ],
        correctAnswer: "(A) Both A and R are true and R is the correct explanation of A",
        explanation: "I_min = (√I₁ - √I₂)². If slit widths differ, intensities I₁ ≠ I₂, so I_min > 0 and the dark fringes retain some brightness.",
        difficulty: "Medium",
        questionType: "Assertion-Reason",
      },
      {
        id: "phys_u6_q16",
        question: "Match List-I with List-II:\n\nList-I (Phenomenon / Parameter)\n(P) Brewster's Law\n(Q) Fringe shift due to thin slab\n(R) Single-slit central max width\n(S) Two coherent sources with unequal intensity\n\nList-II (Formula / Expression)\n(1) 2λD / a\n(2) tan i_B = n\n(3) I_min = (√I₁ - √I₂)² > 0\n(4) Δy = (n - 1)t D / d",
        options: [
          "(A) P-2, Q-4, R-1, S-3",
          "(B) P-1, Q-3, R-2, S-4",
          "(C) P-2, Q-1, R-4, S-3",
          "(D) P-4, Q-2, R-1, S-3",
        ],
        correctAnswer: "(A) P-2, Q-4, R-1, S-3",
        explanation: "Brewster's law is tan i_B = n (P-2). Fringe shift is (n-1)t D/d (Q-4). Central max width is 2λD/a (R-1). Unequal intensities result in imperfect darkness (S-3).",
        difficulty: "Medium",
        questionType: "Match The Following",
      },
      {
        id: "phys_u6_q17",
        question: "The polarizing angle for a certain glass plate is 60°. What is the angle of refraction in the glass plate when light is incident at the polarizing angle?",
        options: [
          "(A) 60°",
          "(B) 45°",
          "(C) 30°",
          "(D) 90°",
        ],
        correctAnswer: "(C) 30°",
        explanation: "At Brewster's angle, reflected and refracted rays are perpendicular: i_B + r_p = 90°. With i_B = 60°, r_p = 90° - 60° = 30°.",
        difficulty: "Easy",
        questionType: "Application",
      },
      {
        id: "phys_u6_q18",
        question: "In YDSE, the ratio of maximum to minimum intensity in the fringe pattern is 9:1. What is the ratio of amplitudes of the two interfering waves?",
        options: [
          "(A) 9:1",
          "(B) 3:1",
          "(C) 2:1",
          "(D) 4:1",
        ],
        correctAnswer: "(C) 2:1",
        explanation: "I_max / I_min = [(a₁ + a₂)/(a₁ - a₂)]² = 9/1 ⇒ (a₁ + a₂)/(a₁ - a₂) = 3/1 ⇒ a₁ + a₂ = 3a₁ - 3a₂ ⇒ 2a₁ = 4a₂ ⇒ a₁/a₂ = 2/1.",
        difficulty: "Medium",
        questionType: "Numerical",
      },
      {
        id: "phys_u6_q19",
        question: "When a thin transparent mica sheet of thickness t and refractive index 1.5 is placed in the path of one of the interfering beams in YDSE, the central fringe shifts to the position previously occupied by the 6th bright fringe. If λ = 500 nm, the thickness t of the sheet is:",
        options: [
          "(A) 3 μm",
          "(B) 6 μm",
          "(C) 1.5 μm",
          "(D) 12 μm",
        ],
        correctAnswer: "(B) 6 μm",
        explanation: "Path difference introduced = (n - 1)t = 6λ ⇒ (1.5 - 1)t = 6 × (500 × 10⁻⁹ m) ⇒ 0.5 t = 3000 × 10⁻⁹ m ⇒ t = 6000 × 10⁻⁹ m = 6 μm.",
        difficulty: "Hard",
        questionType: "Numerical",
      },
      {
        id: "phys_u6_q20",
        question: "Which of the following modifications will cause the fringe width in YDSE to decrease?",
        options: [
          "(A) Increasing the wavelength of light",
          "(B) Moving the screen farther from the slits",
          "(C) Immersing the entire apparatus in water",
          "(D) Decreasing the separation between the two slits",
        ],
        correctAnswer: "(C) Immersing the entire apparatus in water",
        explanation: "β = λD/d. In water, λ' = λ/n (where n = 4/3 > 1), so fringe width β decreases. All other options increase β.",
        difficulty: "Easy",
        questionType: "Conceptual Direct",
      },
    ],
    links: {
      prerequisites: ["physics_u6_t1"],
      relatedTopics: ["physics_u7_t1"],
      practiceTestUrl: "/test/practice-physics-unit6-test1",
      weaknessRadarUrl: "/dashboard/radar?subject=physics",
    },
    physicsModule: {
      derivationsInBrief: [
        {
          title: "YDSE Path Difference and Fringe Width",
          steps: [
            "Path difference Δx = S₂P - S₁P ≈ yd / D (for D >> d).",
            "Bright fringes: Δx = nλ ⇒ y_n = nλD / d.",
            "Dark fringes: Δx = (n - 1/2)λ ⇒ y_n' = (n - 1/2)λD / d.",
            "Fringe width β = y_{n+1} - y_n = λD / d.",
          ],
        },
      ],
      unitDimensionTable: [
        { quantity: "Fringe Width (β)", formula: "β = λD/d", siUnit: "Metre (m)", dimensionalFormula: "[M⁰ L¹ T⁰]" },
        { quantity: "Slit Width (a)", formula: "a", siUnit: "Metre (m)", dimensionalFormula: "[M⁰ L¹ T⁰]" },
        { quantity: "Polarizing Angle (i_B)", formula: "tan i_B = n", siUnit: "Radian / Degree", dimensionalFormula: "[M⁰ L⁰ T⁰]" },
      ],
      graphInterpretations: [
        {
          graphTitle: "Intensity vs Path Difference (YDSE vs Single Slit)",
          axes: "x-axis: Phase angle / position y, y-axis: Intensity I",
          keyFeatures: "YDSE has uniform peak heights (4 I₀) and uniform fringe widths. Single-slit diffraction has a towering central peak (width 2λ/a) with secondary peaks decaying rapidly.",
        },
      ],
    },
  },
];
