import json, re

def normalize_text(text):
    if not text: return ""
    t = text.lower()
    t = re.sub(r"\[cite:[^\]]+\]", "", t)
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    t = re.sub(r"[\$\\\{\}\(\)\[\]_^\s\.,;:\-\+=\*\/<>]+", "", t)
    return t

def make_q(qn, chapter, topic, text, opts, correct, sol):
    return {
        "questionNumber": qn,
        "chapter": chapter,
        "topic": topic,
        "questionText": text,
        "hasDiagram": False,
        "diagramDescription": "",
        "options": [
            {
                "id": opt_id,
                "text": opt_text,
                "isCorrect": (opt_id == correct),
                "studentSelectionTrap": f"Option {opt_id} distractor/common pitfall." if opt_id != correct else "Correct NCERT physics principle applied.",
                "mistakeAnalysis": f"Student evaluated incorrectly for {opt_id}." if opt_id != correct else "Accurate conceptual application."
            }
            for opt_id, opt_text in zip(["A", "B", "C", "D"], opts)
        ],
        "correctOption": correct,
        "detailedSolution": sol
    }

# Replacements for Mock 18 (Q1, Q2)
m18_replacements = {
    1: make_q(
        1, "Electric Charges and Fields", "Electric Field on Axis of Uniformly Charged Ring",
        "A thin circular ring of radius $R$ carries a uniform positive charge $Q$. At what distance $x$ along the symmetry axis from the center of the ring is the electric field intensity maximum?",
        ["$x = \\frac{R}{\\sqrt{2}}$", "$x = \\frac{R}{2}$", "$x = R\\sqrt{2}$", "$x = R$"],
        "A",
        "The electric field along the axis of a uniformly charged ring of radius $R$ is:\n$$E(x) = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q x}{(x^2 + R^2)^{3/2}}$$\nTo find the maximum, we set $\\frac{dE}{dx} = 0$:\n$$\\frac{d}{dx} \\left[ x(x^2 + R^2)^{-3/2} \\right] = (x^2 + R^2)^{-3/2} - \\frac{3}{2}x(x^2 + R^2)^{-5/2}(2x) = 0$$\n$$(x^2 + R^2) - 3x^2 = 0 \\implies 2x^2 = R^2 \\implies x = \\frac{R}{\\sqrt{2}}$$"
    ),
    2: make_q(
        2, "Electric Charges and Fields", "Electric Flux Through Hemisphere",
        "A point charge $q$ is placed at the center of the open flat circular base of a hollow hemispherical surface of radius $R$. What is the total electric flux passing through the curved surface of the hemisphere?",
        ["$\\frac{q}{2\\varepsilon_0}$", "$\\frac{q}{\\varepsilon_0}$", "$\\frac{q}{4\\varepsilon_0}$", "0"],
        "A",
        "Consider a complete closed spherical surface formed by joining two identical hemispherical surfaces with the point charge $q$ located at the center.\nBy Gauss's Law, the total electric flux through the entire closed sphere is:\n$$\\Phi_{\\text{total}} = \\frac{q}{\\varepsilon_0}$$\nBy spherical symmetry, exactly half of the flux passes through each hemisphere:\n$$\\Phi_{\\text{curved}} = \\frac{\\Phi_{\\text{total}}}{2} = \\frac{q}{2\\varepsilon_0}$$"
    )
}

# Replacements for Mock 10 (15 questions)
m10_replacements = {
    26: make_q(
        26, "Moving Charges and Magnetism", "Increasing Sensitivity of Moving Coil Galvanometer",
        "The voltage sensitivity of a moving-coil galvanometer is defined as $V_s = \\frac{\\theta}{V} = \\frac{N B A}{k R}$. If the number of turns $N$ in the coil is doubled while the coil area and restoring torque per unit twist $k$ remain constant, but the resistance of the wire is also doubled as a result, what happens to the voltage sensitivity?",
        ["Remains unchanged", "Doubles", "Halves", "Increases by four times"],
        "A",
        "Voltage sensitivity is $V_s = \\frac{N B A}{k R}$. When the number of turns $N$ is doubled ($N' = 2N$), the total length of the wire doubles, which also doubles the resistance ($R' = 2R$).\nHence, $V_s' = \\frac{(2N) B A}{k (2R)} = \\frac{N B A}{k R} = V_s$. The voltage sensitivity remains unchanged."
    ),
    27: make_q(
        27, "Electromagnetic Waves", "Ordering Electromagnetic Waves by Frequency",
        "Arrange the following electromagnetic radiations in order of INCREASING frequency (lowest frequency first):\n(A) Microwaves\n(B) Ultraviolet rays\n(C) Infrared waves\n(D) X-rays",
        ["(A) < (C) < (B) < (D)", "(C) < (A) < (B) < (D)", "(A) < (B) < (C) < (D)", "(D) < (B) < (C) < (A)"],
        "A",
        "The electromagnetic spectrum arranged in order of increasing frequency (or decreasing wavelength) is:\nRadio waves < Microwaves < Infrared < Visible < Ultraviolet < X-rays < Gamma rays.\nTherefore: Microwaves (A) < Infrared (C) < Ultraviolet (B) < X-rays (D)."
    ),
    31: make_q(
        31, "Wave Optics", "Wavefronts and Light Rays Geometry",
        "A point source of light is located at the center of a homogeneous isotropic medium. What is the geometric shape of the wavefront produced by this point source, and how are light rays oriented relative to the wavefront?",
        [
            "Spherical wavefronts, with light rays perpendicular to the wavefront at every point",
            "Plane wavefronts, with light rays parallel to the wavefront",
            "Cylindrical wavefronts, with light rays oblique to the wavefront",
            "Spherical wavefronts, with light rays tangential to the wavefront"
        ],
        "A",
        "A point source in a homogeneous isotropic medium emits light waves propagating equally in all radial directions, producing concentric spherical wavefronts. By definition, light rays indicate the direction of propagation and are always normal (perpendicular) to the wavefront at every point."
    ),
    32: make_q(
        32, "Current Electricity", "Domestic Parallel Electrical Wiring",
        "In domestic electric power supply systems, household electrical appliances are connected in parallel rather than in series primarily because:",
        [
            "Each appliance operates independently at the full rated supply voltage",
            "The total circuit resistance increases, minimizing wire heating",
            "The current passing through each appliance is forced to be identical",
            "It prevents high voltage spikes by eliminating fuses"
        ],
        "A",
        "Connecting appliances in parallel ensures that each appliance receives the full rated potential difference (e.g., 220 V) and operates independently. If one appliance is switched off or fails, others continue working normally."
    ),
    33: make_q(
        33, "Semiconductor Electronics", "Identification of Forward-Biased Diode Configuration",
        "In which of the following circuit configurations is the p-n junction diode forward-biased?",
        [
            "p-side connected to $+3\\text{ V}$ and n-side connected to $+1\\text{ V}$",
            "p-side connected to $-4\\text{ V}$ and n-side connected to $-2\\text{ V}$",
            "p-side connected to $0\\text{ V}$ and n-side connected to $+2\\text{ V}$",
            "p-side connected to $-3\\text{ V}$ and n-side connected to $0\\text{ V}$"
        ],
        "A",
        "A p-n junction diode is forward-biased when the potential of the p-side ($V_p$) is higher than the potential of the n-side ($V_n$), i.e., $V_p - V_n > 0$.\nIn option A: $V_p - V_n = (+3\\text{ V}) - (+1\\text{ V}) = +2\\text{ V} > 0$, so it is forward-biased."
    ),
    34: make_q(
        34, "Electromagnetic Induction", "Factors Influencing Mutual Inductance",
        "Two long coaxial solenoids $S_1$ and $S_2$ of identical length $l$ and radius $r_1 < r_2$ have turns $N_1$ and $N_2$ respectively. The mutual inductance $M$ between them is proportional to:",
        [
            "$N_1 N_2$ and depends on the cross-sectional area of the inner solenoid",
            "$(N_1 + N_2)$ and independent of the solenoid radii",
            "$N_1 / N_2$ and depends only on the outer solenoid radius",
            "$(N_1 N_2)^2$ and inversely proportional to $r_1$"
        ],
        "A",
        "The mutual inductance of two coaxial solenoids is given by $M = \\frac{\\mu_0 N_1 N_2 \\pi r_1^2}{l}$. It is directly proportional to the product of the number of turns $N_1 N_2$ and the cross-sectional area of the inner solenoid $\\pi r_1^2$."
    ),
    35: make_q(
        35, "Dual Nature of Radiation and Matter", "Energy and Momentum of Photons",
        "If the de Broglie wavelength of a moving particle of mass $m$ is $\\lambda$, its kinetic energy $K$ is given by:",
        ["$\\frac{h^2}{2m\\lambda^2}$", "$\\frac{h}{2m\\lambda}$", "$\\frac{h^2 \\lambda^2}{2m}$", "$\\frac{2mh}{\\lambda^2}$"],
        "A",
        "By de Broglie's relation, momentum $p = \\frac{h}{\\lambda}$. Kinetic energy $K = \\frac{p^2}{2m} = \\frac{(h/\\lambda)^2}{2m} = \\frac{h^2}{2m\\lambda^2}$."
    ),
    37: make_q(
        37, "Semiconductor Electronics", "Bandgap Values of Silicon and Germanium",
        "At room temperature ($300\\text{ K}$), the forbidden energy bandgap ($E_g$) values for Silicon ($\\text{Si}$) and Germanium ($\\text{Ge}$) are approximately:",
        [
            "$1.1\\text{ eV}$ for $\\text{Si}$ and $0.7\\text{ eV}$ for $\\text{Ge}$",
            "$0.7\\text{ eV}$ for $\\text{Si}$ and $1.1\\text{ eV}$ for $\\text{Ge}$",
            "$3.0\\text{ eV}$ for $\\text{Si}$ and $5.4\\text{ eV}$ for $\\text{Ge}$",
            "$0.1\\text{ eV}$ for both $\\text{Si}$ and $\\text{Ge}$"
        ],
        "A",
        "At room temperature ($300\\text{ K}$), the band gap energy $E_g$ is approximately $1.1\\text{ eV}$ for Silicon and $0.7\\text{ eV}$ for Germanium."
    ),
    39: make_q(
        39, "Electric Charges and Fields", "Domain of Validity of Coulomb's Law",
        "Which of the following statements correctly describes Coulomb's law of electrostatics?",
        [
            "It is an inverse-square central force that strictly holds for point charges at rest",
            "It depends on the relative velocities of the charges as well as their distance",
            "It operates only at nuclear distances less than $10^{-15}\\text{ m}$",
            "It violates Newton's third law of motion because action-reaction pairs do not apply"
        ],
        "A",
        "Coulomb's law applies strictly to stationary point charges. The force is a central force directed along the line joining the two charges and obeys the inverse-square law $F \\propto 1/r^2$."
    ),
    45: make_q(
        45, "Current Electricity", "Wheatstone Bridge Balancing Conditions",
        "In a standard balanced Wheatstone bridge consisting of four arms with resistances $P, Q, R, S$, the galvanometer shows zero deflection. If the positions of the battery and the galvanometer are interchanged, what happens to the balance condition?",
        [
            "The bridge remains balanced and the galvanometer still shows zero deflection",
            "The bridge becomes severely unbalanced and large current flows through the galvanometer",
            "The effective resistance between all terminals doubles",
            "The null point shifts proportionally to the internal resistance of the battery"
        ],
        "A",
        "By the conjugate arms property of a Wheatstone bridge, the battery arm and galvanometer arm are conjugate. Interchanging the galvanometer and battery does not alter the balance condition; the bridge remains balanced."
    ),
    46: make_q(
        46, "Electric Charges and Fields", "Principle of Superposition and Independence of Pairwise Coulomb Force",
        "Two isolated point charges $+q$ and $+4q$ are placed a distance $r$ apart in vacuum, exerting an electrostatic repulsive force $F$ on each other. If a third point charge $+2q$ is placed midway between them, what is the electrostatic force exerted specifically by $+q$ on $+4q$?",
        [
            "$F$, because the pairwise electrostatic force between two charges is unaffected by the presence of other charges",
            "$F/2$, because the intermediate charge shields half the field lines",
            "$2F$, because the total charge between them has increased",
            "Zero, because the system reaches electrostatic equilibrium"
        ],
        "A",
        "According to the principle of superposition, the electrostatic force between any two point charges is completely independent of the presence or absence of any other charges in their vicinity. Hence, the force between $+q$ and $+4q$ remains $F$."
    ),
    47: make_q(
        47, "Ray Optics and Optical Instruments", "Optical Phenomena Not Based on Total Internal Reflection",
        "Which of the following optical phenomena is NOT primarily based on the principle of Total Internal Reflection (TIR)?",
        [
            "Dispersion of white light into a spectrum by a glass triangular prism",
            "Sparkling brilliance observed in a cut diamond",
            "Transmission of optical signals through optical fiber cables",
            "Mirage formation on hot desert roads"
        ],
        "A",
        "Dispersion of white light by a prism occurs due to refraction and differences in refractive index for different wavelengths. In contrast, diamond brilliance, optical fiber signal transmission, and mirages are direct applications of total internal reflection."
    ),
    48: make_q(
        48, "Current Electricity", "Galvanometer Conversion into Voltmeter",
        "To convert a moving coil galvanometer of resistance $G$ and full-scale deflection current $I_g$ into a voltmeter capable of reading up to potential difference $V$, one must connect:",
        [
            "A high resistance $R = \\frac{V}{I_g} - G$ in series with the galvanometer",
            "A low resistance (shunt) $S = \\frac{I_g G}{I - I_g}$ in parallel with the galvanometer",
            "A high resistance $R = \\frac{V}{I_g} + G$ in parallel with the galvanometer",
            "A low resistance $S = \\frac{I_g}{V}$ in series with the galvanometer"
        ],
        "A",
        "To convert a galvanometer into a voltmeter, a large resistance $R$ is connected in series so that $V = I_g(G + R) \\implies R = \\frac{V}{I_g} - G$."
    ),
    49: make_q(
        49, "Atoms", "Distance of Closest Approach Dependence on Mass",
        "In Rutherford's $\\alpha$-particle scattering experiment, an $\\alpha$-particle of mass $m_\\alpha$, charge $2e$, and initial kinetic energy $K$ approaches a heavy nucleus of atomic number $Z$ head-on. The distance of closest approach $r_0$ is:",
        [
            "Inversely proportional to the kinetic energy $K$ ($r_0 \\propto \\frac{1}{K}$)",
            "Directly proportional to $K^2$ ($r_0 \\propto K^2$)",
            "Directly proportional to $\\sqrt{K}$ ($r_0 \\propto \\sqrt{K}$)",
            "Independent of the kinetic energy $K$"
        ],
        "A",
        "At the distance of closest approach $r_0$, all initial kinetic energy is converted into electrostatic potential energy:\n$$K = \\frac{1}{4\\pi\\varepsilon_0} \\frac{(2e)(Ze)}{r_0} \\implies r_0 = \\frac{2 Z e^2}{4\\pi\\varepsilon_0 K}$$\nThus, $r_0 \\propto \\frac{1}{K}$."
    ),
    50: make_q(
        50, "Electric Charges and Fields", "Symmetry and Properties of Electric Dipole Fields",
        "For a short electric dipole of dipole moment $\\vec{p} = 2qa \\hat{z}$, how does the magnitude of the electric field $E$ vary with distance $r$ at points far from the dipole ($r \\gg a$)?",
        [
            "$E \\propto \\frac{1}{r^3}$ for both axial and equatorial points",
            "$E \\propto \\frac{1}{r^2}$ along the axis and $E \\propto \\frac{1}{r^3}$ on the equator",
            "$E \\propto \\frac{1}{r}$ along the dipole axis",
            "$E$ is independent of $r$ because the net charge is zero"
        ],
        "A",
        "For a short dipole at distances $r \\gg a$:\nAxial field: $E_{\\text{axial}} = \\frac{2p}{4\\pi\\varepsilon_0 r^3}$\nEquatorial field: $E_{\\text{eq}} = \\frac{p}{4\\pi\\varepsilon_0 r^3}$\nIn both cases, the electric field decreases inversely as the cube of the distance: $E \\propto \\frac{1}{r^3}$."
    )
}

# 50 unique questions for Mock 14
m14_questions = [
    make_q(1, "Electric Charges and Fields", "Electric Flux and Gauss's Law",
        "What is the total electric flux passing through a closed cylindrical Gaussian surface of radius $R$ and length $L$ placed coaxially around an infinitely long straight wire carrying uniform linear charge density $\\lambda$?",
        ["$\\frac{\\lambda L}{\\varepsilon_0}$", "$\\frac{2\\lambda L}{\\varepsilon_0}$", "$\\frac{\\lambda}{2\\pi\\varepsilon_0 R}$", "$\\frac{\\lambda L}{2\\varepsilon_0}$"],
        "A",
        "The charge enclosed by a cylinder of length $L$ around a line charge with density $\\lambda$ is $q_{\\text{enc}} = \\lambda L$. By Gauss's Law, the total electric flux is $\\Phi = \\frac{q_{\\text{enc}}}{\\varepsilon_0} = \\frac{\\lambda L}{\\varepsilon_0}$."
    ),
    make_q(2, "Electric Charges and Fields", "Electric Dipole in Uniform Field",
        "An electric dipole with dipole moment $\\vec{p}$ is placed in a uniform external electric field $\\vec{E}$. In which orientation is the dipole in a state of STABLE equilibrium?",
        [
            "When $\\vec{p}$ is aligned parallel to $\\vec{E}$ (angle $\\theta = 0^\\circ$)",
            "When $\\vec{p}$ is aligned antiparallel to $\\vec{E}$ (angle $\\theta = 180^\\circ$)",
            "When $\\vec{p}$ is perpendicular to $\\vec{E}$ (angle $\\theta = 90^\\circ$)",
            "When $\\vec{p}$ makes an angle of $45^\\circ$ with $\\vec{E}$"
        ],
        "A",
        "Potential energy of a dipole is $U = -\\vec{p} \\cdot \\vec{E} = -p E \\cos\\theta$. At $\\theta = 0^\\circ$, torque is $\\tau = p E \\sin 0^\\circ = 0$ and potential energy $U = -pE$ is minimum, representing stable equilibrium."
    ),
    make_q(3, "Electric Charges and Fields", "Gauss's Law and Scaling",
        "A point charge $+q$ is enclosed at the center of a spherical Gaussian surface of radius $R$. If the radius of the sphere is doubled to $2R$, what is the new total electric flux through the surface?",
        ["$\\Phi$ (remains unchanged)", "$2\\Phi$", "$4\\Phi$", "$\\Phi/4$"],
        "A",
        "According to Gauss's Law, the total electric flux through any closed surface depends solely on the enclosed charge: $\\Phi = \\frac{q_{\\text{enc}}}{\\varepsilon_0}$. It is completely independent of the radius or shape of the surface."
    ),
    make_q(4, "Electric Charges and Fields", "Charge Conservation and Sharing",
        "Two identical insulated conducting spheres carry charges $+6\\,\\mu\\text{C}$ and $-2\\,\\mu\\text{C}$. They are brought into contact and then separated back to their original positions. What is the final charge on each sphere?",
        ["$+2\\,\\mu\\text{C}$", "$+4\\,\\mu\\text{C}$", "$+3\\,\\mu\\text{C}$", "$-2\\,\\mu\\text{C}$"],
        "A",
        "Total initial charge = $(+6\\,\\mu\\text{C}) + (-2\\,\\mu\\text{C}) = +4\\,\\mu\\text{C}$. Since the conducting spheres are identical, the charge divides equally upon contact: $q' = \\frac{+4\\,\\mu\\text{C}}{2} = +2\\,\\mu\\text{C}$ on each sphere."
    ),
    make_q(5, "Electrostatic Potential and Capacitance", "Electric Potential and Field Gradient",
        "The electrostatic potential at any point $(x, y, z)$ in space is given by $V(x, y, z) = 4x^2 - 3y\\text{ volts}$. What is the $x$-component of the electric field $E_x$ at the point $(1, 2, 3)$?",
        ["$-8\\text{ V/m}$", "$+8\\text{ V/m}$", "$-4\\text{ V/m}$", "$+3\\text{ V/m}$"],
        "A",
        "The relation between electric field and potential is $E_x = -\\frac{\\partial V}{\\partial x}$.\nGiven $V(x, y, z) = 4x^2 - 3y$, we have $\\frac{\\partial V}{\\partial x} = 8x$.\nAt $x = 1$, $E_x = -8(1) = -8\\text{ V/m}$."
    ),
    make_q(6, "Electrostatic Potential and Capacitance", "Capacitor with Dielectric Slab",
        "A parallel plate capacitor with air between its plates has capacitance $C_0$. If a dielectric slab of dielectric constant $K = 4$ and thickness $t = d/2$ is inserted between the plates (where $d$ is the plate separation), what is the new capacitance?",
        ["$\\frac{8}{5}C_0$", "$\\frac{5}{8}C_0$", "$2C_0$", "$\\frac{4}{3}C_0$"],
        "A",
        "The capacitance with a dielectric slab of thickness $t$ is $C = \\frac{\\varepsilon_0 A}{d - t + \\frac{t}{K}}$.\nWith $t = d/2$ and $K = 4$:\n$$C = \\frac{\\varepsilon_0 A}{d - \\frac{d}{2} + \\frac{d/2}{4}} = \\frac{\\varepsilon_0 A}{\\frac{d}{2} + \\frac{d}{8}} = \\frac{\\varepsilon_0 A}{\\frac{5d}{8}} = \\frac{8}{5} \\frac{\\varepsilon_0 A}{d} = \\frac{8}{5}C_0$$"
    ),
    make_q(7, "Electrostatic Potential and Capacitance", "Common Potential of Connected Spheres",
        "An isolated spherical conductor of radius $R_1$ charged to a potential $V_1$ is connected by a thin wire to an uncharged spherical conductor of radius $R_2$. What is the resulting common potential $V$ of the system?",
        ["$\\frac{R_1 V_1}{R_1 + R_2}$", "$\\frac{R_2 V_1}{R_1 + R_2}$", "$\\frac{V_1}{2}$", "$\\frac{(R_1 + R_2)V_1}{R_1}$"],
        "A",
        "The capacitance of an isolated spherical conductor is $C = 4\\pi\\varepsilon_0 R$. Initial charge is $Q = C_1 V_1 = 4\\pi\\varepsilon_0 R_1 V_1$.\nWhen connected, total capacitance is $C_1 + C_2 = 4\\pi\\varepsilon_0(R_1 + R_2)$.\nCommon potential $V = \\frac{Q}{C_1 + C_2} = \\frac{4\\pi\\varepsilon_0 R_1 V_1}{4\\pi\\varepsilon_0(R_1 + R_2)} = \\frac{R_1 V_1}{R_1 + R_2}$."
    ),
    make_q(8, "Electrostatic Potential and Capacitance", "Energy Stored in Capacitor",
        "What is the electrostatic energy stored in a capacitor of capacitance $C$ when it is charged to a potential difference $V$ carrying a charge $Q$?",
        ["$\\frac{1}{2}QV$", "$QV$", "$\\frac{1}{2}Q^2 V$", "$\\frac{QV^2}{2}$"],
        "A",
        "The energy stored in a charged capacitor is given by $U = \\frac{1}{2} C V^2 = \\frac{1}{2} Q V = \\frac{Q^2}{2C}$."
    ),
    make_q(9, "Current Electricity", "Resistance of Stretched Wire",
        "A uniform copper wire of resistance $R$ is stretched uniformly such that its length increases by 2%. What is the approximate percentage increase in its electrical resistance?",
        ["4%", "2%", "1%", "8%"],
        "A",
        "Since mass and volume remain constant during stretching: $\\text{Volume} = A \\cdot L = \\text{constant} \\implies A \\propto 1/L$.\nResistance $R = \\rho \\frac{L}{A} \\propto L^2$.\nFor small fractional changes: $\\frac{\\Delta R}{R} \\approx 2 \\frac{\\Delta L}{L} = 2(2\\%) = 4\\%$."
    ),
    make_q(10, "Current Electricity", "Drift Velocity Expression",
        "The drift velocity $v_d$ of conduction electrons in a metal conductor placed in an electric field $E$ with relaxation time $\\tau$ and electron mass $m$ is given by:",
        ["$v_d = \\frac{e E \\tau}{m}$", "$v_d = \\frac{m E \\tau}{e}$", "$v_d = \\frac{e E}{m \\tau}$", "$v_d = \\frac{e m \\tau}{E}$"],
        "A",
        "Electrons experience an electric force $F = -eE$, producing acceleration $a = \\frac{eE}{m}$. The average drift velocity acquired between successive collisions is $v_d = a\\tau = \\frac{e E \\tau}{m}$."
    ),
    make_q(11, "Current Electricity", "Potentiometer Potential Gradient",
        "A potentiometer wire of length $10\\text{ m}$ has a resistance of $20\\ \\Omega$. It is connected in series with an accumulator of emf $2\\text{ V}$ (internal resistance negligible) and a series resistor of $80\\ \\Omega$. What is the potential gradient along the potentiometer wire?",
        ["$0.04\\text{ V/m}$", "$0.4\\text{ V/m}$", "$0.02\\text{ V/m}$", "$0.2\\text{ V/m}$"],
        "A",
        "Total circuit resistance is $R_{\\text{total}} = 20 + 80 = 100\\ \\Omega$.\nCircuit current is $I = \\frac{2\\text{ V}}{100\\ \\Omega} = 0.02\\text{ A}$.\nPotential difference across the $10\\text{ m}$ wire is $V_w = I R_w = 0.02 \\times 20 = 0.4\\text{ V}$.\nPotential gradient $k = \\frac{V_w}{L} = \\frac{0.4\\text{ V}}{10\\text{ m}} = 0.04\\text{ V/m}$."
    ),
    make_q(12, "Current Electricity", "Parallel Resistor Combination",
        "Three resistors of resistance $2\\ \\Omega$, $3\\ \\Omega$, and $6\\ \\Omega$ are connected in parallel. What is the equivalent resistance of this parallel combination?",
        ["$1\\ \\Omega$", "$11\\ \\Omega$", "$0.5\\ \\Omega$", "$2.5\\ \\Omega$"],
        "A",
        "For resistors in parallel:\n$$\\frac{1}{R_{\\text{eq}}} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} = \\frac{3 + 2 + 1}{6} = \\frac{6}{6} = 1\\ \\Omega^{-1} \\implies R_{\\text{eq}} = 1\\ \\Omega$$"
    ),
    make_q(13, "Current Electricity", "Kirchhoff's Junction Law",
        "Kirchhoff's first rule (the junction rule) $\\sum I = 0$ is based directly on which fundamental physical conservation law?",
        ["Conservation of electric charge", "Conservation of energy", "Conservation of linear momentum", "Conservation of angular momentum"],
        "A",
        "Kirchhoff's junction rule states that the total current entering a junction equals the total current leaving it. This is a direct statement of the conservation of electric charge (charge cannot accumulate or disappear at a point)."
    ),
    make_q(14, "Moving Charges and Magnetism", "Time Period of Cyclotron Motion",
        "A charged particle of charge $q$ and mass $m$ moves in a plane perpendicular to a uniform magnetic field $B$. What is the time period $T$ of its circular motion?",
        ["$T = \\frac{2\\pi m}{qB}$", "$T = \\frac{2\\pi q}{mB}$", "$T = \\frac{\\pi m B}{q}$", "$T = \\frac{qB}{2\\pi m}$"],
        "A",
        "The centripetal force is provided by the magnetic Lorentz force: $\\frac{m v^2}{r} = q v B \\implies r = \\frac{m v}{qB}$.\nThe period of revolution is $T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{qB}$, which is independent of the particle's speed and radius."
    ),
    make_q(15, "Moving Charges and Magnetism", "Magnetic Field at Center of Coil",
        "What is the magnitude of the magnetic field at the center of a circular coil of radius $R$ having $N$ turns carrying a steady current $I$?",
        ["$B = \\frac{\\mu_0 N I}{2R}$", "$B = \\frac{\\mu_0 N I}{4\\pi R}$", "$B = \\frac{\\mu_0 N I}{2\\pi R}$", "$B = \\frac{\\mu_0 N I}{R^2}$"],
        "A",
        "By the Biot-Savart law, each element of the circular loop contributes to the magnetic field at the center. For $N$ turns, $B = \\frac{\\mu_0 N I}{2R}$."
    ),
    make_q(16, "Moving Charges and Magnetism", "Force Between Antiparallel Currents",
        "Two long, straight parallel conductors separated by distance $d$ in vacuum carry electric currents $I_1$ and $I_2$ in opposite directions. The magnetic force per unit length between them is:",
        [
            "Repulsive, of magnitude $\\frac{\\mu_0 I_1 I_2}{2\\pi d}$",
            "Attractive, of magnitude $\\frac{\\mu_0 I_1 I_2}{2\\pi d}$",
            "Repulsive, of magnitude $\\frac{\\mu_0 I_1 I_2}{4\\pi d}$",
            "Zero, because antiparallel currents cancel"
        ],
        "A",
        "Parallel currents flowing in opposite directions repel each other with a force per unit length given by $\\frac{dF}{dL} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$."
    ),
    make_q(17, "Moving Charges and Magnetism", "Magnetic Force on Straight Conductor",
        "A straight wire of length $L$ carries a current $I$ in a uniform magnetic field $B$. If the wire makes an angle of $30^\\circ$ with the magnetic field direction, what is the magnitude of the magnetic force acting on the wire?",
        ["$\\frac{1}{2} I L B$", "$I L B$", "$\\frac{\\sqrt{3}}{2} I L B$", "0"],
        "A",
        "The magnetic force on a current-carrying conductor is given by $\\vec{F} = I(\\vec{L} \\times \\vec{B})$, so $F = I L B \\sin\\theta$.\nFor $\\theta = 30^\\circ$: $F = I L B \\sin 30^\\circ = \\frac{1}{2} I L B$."
    ),
    make_q(18, "Moving Charges and Magnetism", "Magnetic Dipole Moment of Loop",
        "What is the magnetic dipole moment $\\vec{M}$ of a flat circular loop of radius $r$ carrying a steady electric current $I$?",
        ["$M = I \\pi r^2$", "$M = 2\\pi r I$", "$M = \\frac{I}{\\pi r^2}$", "$M = \\frac{2I}{r}$"],
        "A",
        "The magnetic dipole moment of any plane current loop is the product of current and planar area: $M = I A = I(\\pi r^2)$."
    ),
    make_q(19, "Magnetism and Matter", "Superconductor Magnetic Susceptibility",
        "For a superconductor displaying perfect diamagnetism (the Meissner effect), what is the value of its magnetic susceptibility $\\chi_m$?",
        ["$-1$", "$0$", "$+1$", "$+\\infty$"],
        "A",
        "Inside a perfect diamagnet / superconductor, the internal magnetic induction is zero ($B = 0$). Since $B = \\mu_0(H + M) = \\mu_0 H(1 + \\chi_m) = 0$, we have $1 + \\chi_m = 0 \\implies \\chi_m = -1$."
    ),
    make_q(20, "Magnetism and Matter", "Curie's Law for Paramagnets",
        "According to Curie's law, how does the magnetic susceptibility $\\chi$ of a paramagnetic substance depend on absolute temperature $T$?",
        ["$\\chi \\propto \\frac{1}{T}$", "$\\chi \\propto T$", "$\\chi \\propto T^2$", "$\\chi \\propto \\frac{1}{T^2}$"],
        "A",
        "Curie's law states that the magnetic susceptibility of a paramagnetic material is inversely proportional to its absolute temperature: $\\chi = \\frac{C}{T}$, where $C$ is the Curie constant."
    ),
    make_q(21, "Magnetism and Matter", "Angle of Dip at Magnetic Poles",
        "What is the value of the magnetic inclination (angle of dip) at the Earth's magnetic poles?",
        ["$90^\\circ$", "$0^\\circ$", "$45^\\circ$", "$180^\\circ$"],
        "A",
        "At the magnetic poles of the Earth, the magnetic field lines enter or leave vertically into the surface, so the horizontal component $B_H = 0$, giving an angle of dip $\\delta = 90^\\circ$."
    ),
    make_q(22, "Electromagnetic Induction", "Lenz's Law and Conservation Principle",
        "Lenz's law for determining the direction of an induced electromotive force (emf) is a direct consequence of which fundamental conservation law?",
        ["Conservation of energy", "Conservation of charge", "Conservation of linear momentum", "Conservation of magnetic flux"],
        "A",
        "Lenz's law states that an induced current always flows in such a direction that its magnetic field opposes the change in flux that caused it. This mechanical work done against the opposing force is converted into electrical energy, adhering to the law of conservation of energy."
    ),
    make_q(23, "Electromagnetic Induction", "Induced Current in Metal Ring",
        "A circular metal ring of area $A = 0.05\\text{ m}^2$ and electrical resistance $R = 2.0\\ \\Omega$ is held perpendicular to a uniform magnetic field that changes with time at a constant rate $\\frac{dB}{dt} = 4.0\\text{ T/s}$. What is the magnitude of the induced current in the ring?",
        ["$0.1\\text{ A}$", "$0.4\\text{ A}$", "$0.2\\text{ A}$", "$0.05\\text{ A}$"],
        "A",
        "By Faraday's Law, the induced emf is $\\varepsilon = \\frac{d\\Phi}{dt} = A \\frac{dB}{dt} = (0.05)(4.0) = 0.2\\text{ V}$.\nThe induced current is $I = \\frac{\\varepsilon}{R} = \\frac{0.2\\text{ V}}{2.0\\ \\Omega} = 0.1\\text{ A}$."
    ),
    make_q(24, "Electromagnetic Induction", "Motional Electromotive Force",
        "A straight conducting rod of length $l$ moves with uniform velocity $v$ perpendicular to a uniform magnetic field $B$ and perpendicular to its own length. What is the motional emf induced between the ends of the rod?",
        ["$\\varepsilon = B l v$", "$\\varepsilon = \\frac{1}{2} B l v$", "$\\varepsilon = B l^2 v$", "$\\varepsilon = \\frac{B v}{l}$"],
        "A",
        "The motional emf across a conductor of length $l$ moving at velocity $v$ perpendicular to a uniform magnetic field $B$ is given by $\\varepsilon = B l v$."
    ),
    make_q(25, "Electromagnetic Induction", "Self-Inductance of a Solenoid",
        "What is the self-inductance $L$ of a long air-core solenoid of length $l$, cross-sectional area $A$, and total number of turns $N$?",
        ["$L = \\frac{\\mu_0 N^2 A}{l}$", "$L = \\frac{\\mu_0 N A}{l}$", "$L = \\frac{\\mu_0 N^2 l}{A}$", "$L = \\mu_0 N^2 A l$"],
        "A",
        "The self-inductance of a solenoid is $L = \\mu_0 n^2 A l$, where $n = N/l$ is turns per unit length. Substituting $n$ gives $L = \\mu_0 \\left(\\frac{N}{l}\\right)^2 A l = \\frac{\\mu_0 N^2 A}{l}$."
    ),
    make_q(26, "Alternating Current", "Resonance in Series LCR Circuit",
        "In a series LCR circuit operating at electrical resonance, what is the phase difference between the applied alternating voltage and the resulting current?",
        ["$0^\\circ$ (voltage and current are in phase)", "$90^\\circ$ (current leads voltage)", "$90^\\circ$ (voltage leads current)", "$180^\\circ$ (voltage and current are in antiphase)"],
        "A",
        "At resonance, the inductive reactance equals the capacitive reactance ($X_L = X_C$), so the net reactance is zero and the circuit impedance is purely resistive ($Z = R$). Hence, the phase angle is $\\phi = 0^\\circ$."
    ),
    make_q(27, "Alternating Current", "Root Mean Square Voltage",
        "An alternating voltage source is described by the equation $V(t) = 220\\sqrt{2} \\sin(100\\pi t)\\text{ volts}$. What is the root mean square (rms) value of the voltage?",
        ["$220\\text{ V}$", "$311\\text{ V}$", "$110\\text{ V}$", "$155\\text{ V}$"],
        "A",
        "The peak voltage is $V_0 = 220\\sqrt{2}\\text{ V}$. The rms voltage is given by $V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} = \\frac{220\\sqrt{2}}{\\sqrt{2}} = 220\\text{ V}$."
    ),
    make_q(28, "Alternating Current", "Ideal Step-Up Transformer",
        "In an ideal step-up transformer, the secondary coil has more turns than the primary coil ($N_s > N_p$). Which of the following statements is TRUE regarding the secondary output compared to the primary input?",
        [
            "Output voltage is higher, but output current is lower",
            "Output voltage is lower, but output current is higher",
            "Both output voltage and output current are higher",
            "Output power is strictly greater than input power"
        ],
        "A",
        "In a step-up transformer, $V_s/V_p = N_s/N_p > 1$, so voltage is stepped up. By conservation of energy for an ideal transformer, $P_s = P_p \\implies V_s I_s = V_p I_p$, so current is stepped down ($I_s < I_p$)."
    ),
    make_q(29, "Alternating Current", "Quality Factor of Resonant Circuit",
        "What is the mathematical expression for the quality factor ($Q$-factor) of a series LCR resonant circuit in terms of resistance $R$, inductance $L$, and capacitance $C$?",
        ["$Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$", "$Q = R\\sqrt{\\frac{C}{L}}$", "$Q = \\frac{1}{R}\\sqrt{\\frac{C}{L}}$", "$Q = \\frac{R}{\\sqrt{LC}}$"],
        "A",
        "The quality factor is $Q = \\frac{\\omega_0 L}{R} = \\frac{1}{\\omega_0 C R}$. With $\\omega_0 = \\frac{1}{\\sqrt{LC}}$, we have $Q = \\frac{1}{R}\\frac{L}{\\sqrt{LC}} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$."
    ),
    make_q(30, "Electromagnetic Waves", "Electromagnetic Spectrum Applications",
        "Which band of the electromagnetic spectrum is predominantly utilized for cellular telephone networks and satellite communications?",
        ["Microwaves", "Ultraviolet rays", "X-rays", "Infrared radiation"],
        "A",
        "Microwaves (wavelengths ranging from millimeters to centimeters) are widely utilized in telecommunications, radar systems, and satellite transmissions because their short wavelengths allow them to penetrate the Earth's atmosphere without significant absorption or refraction."
    ),
    make_q(31, "Electromagnetic Waves", "Speed of EM Waves in Dielectric",
        "What is the propagation speed of an electromagnetic wave in a non-magnetic dielectric medium having relative permittivity $\\varepsilon_r = 4.0$ and relative permeability $\\mu_r = 1.0$? (Speed of light in vacuum $c = 3.0 \\times 10^8\\text{ m/s}$)",
        ["$1.5 \\times 10^8\\text{ m/s}$", "$0.75 \\times 10^8\\text{ m/s}$", "$3.0 \\times 10^8\\text{ m/s}$", "$6.0 \\times 10^8\\text{ m/s}$"],
        "A",
        "The speed of an electromagnetic wave in a medium is $v = \\frac{c}{\\sqrt{\\mu_r \\varepsilon_r}} = \\frac{3.0 \\times 10^8}{\\sqrt{1.0 \\times 4.0}} = \\frac{3.0 \\times 10^8}{2} = 1.5 \\times 10^8\\text{ m/s}$."
    ),
    make_q(32, "Electromagnetic Waves", "Displacement Current Definition",
        "In Maxwell's equations, the displacement current $I_D$ through a dielectric region between the plates of a charging capacitor is defined mathematically as:",
        ["$I_D = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$", "$I_D = \\mu_0 \\frac{d\\Phi_B}{dt}$", "$I_D = \\frac{1}{\\varepsilon_0}\\frac{d\\Phi_E}{dt}$", "$I_D = \\varepsilon_0 \\mu_0 \\frac{dE}{dt}$"],
        "A",
        "Maxwell introduced the concept of displacement current to generalize Ampere's Law. It is defined as $I_D = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$, where $\\Phi_E$ is the electric flux."
    ),
    make_q(33, "Ray Optics and Optical Instruments", "Lens Maker's Formula in Medium",
        "A biconvex glass lens ($n_g = 1.5$) has a focal length of $20\\text{ cm}$ in air. When the lens is completely immersed in water ($n_w = 4/3$), what is its new focal length?",
        ["$80\\text{ cm}$", "$40\\text{ cm}$", "$10\\text{ cm}$", "$60\\text{ cm}$"],
        "A",
        "By the Lens Maker's formula:\n$$\\frac{1}{f_a} = (n_g - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) = (1.5 - 1)K = 0.5 K$$\n$$\\frac{1}{f_w} = \\left(\\frac{n_g}{n_w} - 1\\right)K = \\left(\\frac{1.5}{4/3} - 1\\right)K = \\left(\\frac{9}{8} - 1\\right)K = \\frac{1}{8}K$$\nDividing gives $\\frac{f_w}{f_a} = \\frac{0.5}{1/8} = 4 \\implies f_w = 4 \\times 20\\text{ cm} = 80\\text{ cm}$."
    ),
    make_q(34, "Ray Optics and Optical Instruments", "Minimum Deviation of Prism",
        "For an equilateral glass prism with refracting angle $A = 60^\\circ$ and refractive index $n = \\sqrt{3}$, what is the angle of minimum deviation $\\delta_m$?",
        ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$90^\\circ$"],
        "A",
        "Using the prism formula $n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}$:\n$$\\sqrt{3} = \\frac{\\sin\\left(\\frac{60^\\circ + \\delta_m}{2}\\right)}{\\sin 30^\\circ} = \\frac{\\sin\\left(30^\\circ + \\frac{\\delta_m}{2}\\right)}{0.5}$$\n$$\\sin\\left(30^\\circ + \\frac{\\delta_m}{2}\\right) = \\frac{\\sqrt{3}}{2} \\implies 30^\\circ + \\frac{\\delta_m}{2} = 60^\\circ \\implies \\frac{\\delta_m}{2} = 30^\\circ \\implies \\delta_m = 60^\\circ$$"
    ),
    make_q(35, "Ray Optics and Optical Instruments", "Astronomical Telescope Magnification",
        "An astronomical telescope in normal adjustment consists of an objective of focal length $f_o = 100\\text{ cm}$ and an eyepiece of focal length $f_e = 5\\text{ cm}$. What is the magnifying power of the telescope?",
        ["$20$", "$500$", "$5$", "$25$"],
        "A",
        "In normal adjustment (final image at infinity), the magnifying power of an astronomical telescope is $m = \\frac{f_o}{f_e} = \\frac{100\\text{ cm}}{5\\text{ cm}} = 20$."
    ),
    make_q(36, "Ray Optics and Optical Instruments", "Critical Angle Calculation",
        "What is the critical angle $\\theta_c$ for total internal reflection at a diamond-to-air interface if the refractive index of diamond is $2.0$?",
        ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
        "A",
        "The critical angle condition is $\\sin\\theta_c = \\frac{1}{n}$. For $n = 2.0$, $\\sin\\theta_c = \\frac{1}{2.0} = 0.5 \\implies \\theta_c = 30^\\circ$."
    ),
    make_q(37, "Wave Optics", "Young's Double Slit Fringe Width",
        "In a Young's double-slit experiment, the slit separation is $d = 0.5\\text{ mm}$, the distance from slits to the screen is $D = 1.0\\text{ m}$, and light of wavelength $\\lambda = 500\\text{ nm}$ is used. What is the fringe width $\\beta$ on the screen?",
        ["$1.0\\text{ mm}$", "$0.5\\text{ mm}$", "$2.0\\text{ mm}$", "$0.25\\text{ mm}$"],
        "A",
        "The fringe width is $\\beta = \\frac{\\lambda D}{d} = \\frac{(500 \\times 10^{-9}\\text{ m})(1.0\\text{ m})}{0.5 \\times 10^{-3}\\text{ m}} = 1.0 \\times 10^{-3}\\text{ m} = 1.0\\text{ mm}$."
    ),
    make_q(38, "Wave Optics", "Interference Intensity Ratio",
        "Two coherent monochromatic light beams with an intensity ratio of $9 : 1$ interfere. What is the ratio of the maximum intensity to minimum intensity ($I_{\\text{max}} : I_{\\text{min}}$) in the resulting interference pattern?",
        ["$4 : 1$", "$9 : 1$", "$16 : 1$", "$10 : 8$"],
        "A",
        "The maximum and minimum intensities are related to amplitudes by:\n$$\\frac{I_{\\text{max}}}{I_{\\text{min}}} = \\left(\\frac{\\sqrt{I_1} + \\sqrt{I_2}}{\\sqrt{I_1} - \\sqrt{I_2}}\\right)^2 = \\left(\\frac{3 + 1}{3 - 1}\\right)^2 = \\left(\\frac{4}{2}\\right)^2 = 2^2 = 4 : 1$$"
    ),
    make_q(39, "Wave Optics", "Single Slit Diffraction Minimum",
        "In single-slit Fraunhofer diffraction using a slit of width $a$ illuminated by light of wavelength $\\lambda$, the angular position $\\theta$ of the first diffraction minimum is given by:",
        ["$\\sin\\theta = \\frac{\\lambda}{a}$", "$\\sin\\theta = \\frac{\\lambda}{2a}$", "$\\sin\\theta = \\frac{2\\lambda}{a}$", "$\\sin\\theta = \\frac{3\\lambda}{2a}$"],
        "A",
        "For diffraction at a single slit of width $a$, the condition for minima is $a \\sin\\theta = n\\lambda$. For the first minimum ($n = 1$), $\\sin\\theta = \\frac{\\lambda}{a}$."
    ),
    make_q(40, "Dual Nature of Radiation and Matter", "Photoelectric Threshold Frequency",
        "The work function of a photosensitive metallic surface is $\\Phi = 2.0\\text{ eV}$. What is the threshold frequency $\\nu_0$ for photoelectric emission? (Take $h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$ and $1\\text{ eV} = 1.6 \\times 10^{-19}\\text{ J}$)",
        ["$4.83 \\times 10^{14}\\text{ Hz}$", "$2.41 \\times 10^{14}\\text{ Hz}$", "$9.65 \\times 10^{14}\\text{ Hz}$", "$3.00 \\times 10^{14}\\text{ Hz}$"],
        "A",
        "The threshold frequency is related to work function by $\\Phi = h \\nu_0$.\n$$\\nu_0 = \\frac{\\Phi}{h} = \\frac{2.0 \\times 1.6 \\times 10^{-19}\\text{ J}}{6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}} = \\frac{3.2 \\times 10^{-19}}{6.63 \\times 10^{-34}} \\approx 4.83 \\times 10^{14}\\text{ Hz}$$"
    ),
    make_q(41, "Dual Nature of Radiation and Matter", "Photoelectric Current and Intensity",
        "In a photoelectric effect experiment, if the intensity of the incident monochromatic radiation is doubled while keeping its frequency constant above the threshold, which of the following quantities is doubled?",
        ["Saturation photoelectric current", "Maximum kinetic energy of photoelectrons", "Stopping potential", "Threshold wavelength"],
        "A",
        "The number of photons incident per second is directly proportional to the light intensity. Therefore, doubling the intensity doubles the rate of photoelectrons emitted per second, thereby doubling the saturation photoelectric current, while kinetic energy and stopping potential remain unchanged."
    ),
    make_q(42, "Dual Nature of Radiation and Matter", "de Broglie Wavelength of Electron",
        "What is the de Broglie wavelength of an electron accelerated from rest through an electric potential difference of $V = 100\\text{ volts}$?",
        ["$0.123\\text{ nm}$", "$1.23\\text{ nm}$", "$0.0123\\text{ nm}$", "$12.3\\text{ nm}$"],
        "A",
        "The de Broglie wavelength of an electron accelerated through potential $V$ is given by:\n$$\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{1.227}{\\sqrt{100}}\\text{ nm} = \\frac{1.227}{10}\\text{ nm} = 0.1227\\text{ nm} \\approx 0.123\\text{ nm}$$"
    ),
    make_q(43, "Atoms", "Bohr Radius Scaling",
        "In Bohr's model of the hydrogen atom, what is the ratio of the orbital radius of the second orbit ($n = 2$) to the radius of the ground state orbit ($n = 1$)?",
        ["$4 : 1$", "$2 : 1$", "$8 : 1$", "$1 : 4$"],
        "A",
        "According to Bohr's postulate, the radius of the $n$-th allowed stationary orbit is proportional to the square of the principal quantum number: $r_n = n^2 r_1$. For $n = 2$: $r_2 = 2^2 r_1 = 4 r_1$, so the ratio is $4 : 1$."
    ),
    make_q(44, "Atoms", "Excitation Energy of Hydrogen",
        "The ground state energy of hydrogen is $E_1 = -13.6\\text{ eV}$ and the first excited state energy is $E_2 = -3.4\\text{ eV}$. What is the minimum excitation energy required to raise the electron from the ground state to the first excited state?",
        ["$10.2\\text{ eV}$", "$13.6\\text{ eV}$", "$3.4\\text{ eV}$", "$17.0\\text{ eV}$"],
        "A",
        "Excitation energy is $\\Delta E = E_2 - E_1 = (-3.4\\text{ eV}) - (-13.6\\text{ eV}) = +10.2\\text{ eV}$."
    ),
    make_q(45, "Atoms", "Spectral Series of Hydrogen",
        "In the emission spectrum of atomic hydrogen, the spectral lines of the Lyman series lie exclusively in which region of the electromagnetic spectrum?",
        ["Ultraviolet region", "Visible region", "Infrared region", "Far infrared region"],
        "A",
        "The Lyman series results from electron transitions terminating at the ground level $n = 1$, corresponding to high energy photons in the ultraviolet region. (Balmer series is in the visible region, Paschen/Brackett/Pfund in infrared)."
    ),
    make_q(46, "Nuclei", "Nuclear Radius Ratio",
        "Two atomic nuclei have mass numbers in the ratio $1 : 8$. What is the ratio of their nuclear radii?",
        ["$1 : 2$", "$1 : 4$", "$1 : 8$", "$1 : \\sqrt{2}$"],
        "A",
        "The radius of a nucleus of mass number $A$ is given by $R = R_0 A^{1/3}$.\nTherefore, $\\frac{R_1}{R_2} = \\left(\\frac{A_1}{A_2}\\right)^{1/3} = \\left(\\frac{1}{8}\\right)^{1/3} = \\frac{1}{2} = 1 : 2$."
    ),
    make_q(47, "Nuclei", "Mass Defect Expression",
        "For a stable nucleus consisting of $Z$ protons (mass $m_p$) and $N = (A - Z)$ neutrons (mass $m_n$) having total nuclear rest mass $M$, the mass defect $\\Delta m$ is defined as:",
        ["$\\Delta m = [Z m_p + (A - Z) m_n] - M$", "$\\Delta m = M - [Z m_p + (A - Z) m_n]$", "$\\Delta m = [A m_p + Z m_n] - M$", "$\\Delta m = Z m_p + A m_n$"],
        "A",
        "The mass defect is the difference between the sum of the rest masses of the constituent individual nucleons and the actual mass of the bound nucleus: $\\Delta m = [Z m_p + (A - Z)m_n] - M$."
    ),
    make_q(48, "Semiconductor Electronics", "Intrinsic Semiconductor at 0 K",
        "At absolute zero temperature ($T = 0\\text{ K}$), how does an ideal intrinsic semiconductor behave?",
        [
            "As an ideal electrical insulator, with a full valence band and empty conduction band",
            "As a superconductor, with zero electrical resistance",
            "As a metallic conductor, with high electron mobility",
            "As an extrinsic n-type semiconductor with large donor levels"
        ],
        "A",
        "At $0\\text{ K}$, no thermal energy is available to break covalent bonds. Consequently, the valence band is completely filled, the conduction band is completely empty, and the intrinsic semiconductor behaves as a perfect electrical insulator."
    ),
    make_q(49, "Semiconductor Electronics", "p-type Semiconductor Doping",
        "To synthesize a p-type extrinsic semiconductor, pure intrinsic silicon is doped with trace amounts of which type of impurity atoms?",
        ["Trivalent impurity atoms (such as Boron or Indium)", "Pentavalent impurity atoms (such as Phosphorus or Arsenic)", "Hexavalent impurity atoms", "Inert noble gases"],
        "A",
        "Doping tetravalent silicon with trivalent impurity atoms (Group 13 elements: B, Al, Ga, In) creates acceptor levels and positive holes in the valence band, producing a p-type semiconductor."
    ),
    make_q(50, "Semiconductor Electronics", "Full-Wave Rectifier Ripple Frequency",
        "If a full-wave bridge rectifier circuit is driven by an alternating current supply of frequency $50\\text{ Hz}$, what is the fundamental ripple frequency of the output rectified voltage?",
        ["$100\\text{ Hz}$", "$50\\text{ Hz}$", "$25\\text{ Hz}$", "$200\\text{ Hz}$"],
        "A",
        "In a full-wave rectifier, both the positive and negative half-cycles of the AC input are converted into unidirectional output pulses. Therefore, the output ripple frequency is twice the AC line input frequency: $f_{\\text{out}} = 2 \\times 50\\text{ Hz} = 100\\text{ Hz}$."
    )
]

# Apply Mock 18 replacements
with open("mock/physics/18.json") as f:
    m18 = json.load(f)
for qn, q in m18_replacements.items():
    m18[qn - 1] = q
with open("mock/physics/18.json", "w", encoding="utf-8") as f:
    json.dump(m18, f, indent=2, ensure_ascii=False)
print("Updated mock/physics/18.json successfully!")

# Apply Mock 10 replacements
with open("mock/physics/10.json") as f:
    m10 = json.load(f)
for qn, q in m10_replacements.items():
    m10[qn - 1] = q
with open("mock/physics/10.json", "w", encoding="utf-8") as f:
    json.dump(m10, f, indent=2, ensure_ascii=False)
print("Updated mock/physics/10.json successfully!")

# Apply Mock 14 full replacement
with open("mock/physics/14.json", "w", encoding="utf-8") as f:
    json.dump(m14_questions, f, indent=2, ensure_ascii=False)
print("Updated mock/physics/14.json successfully!")
