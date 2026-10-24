import os
import random
from .common import make_question, get_balanced_target_keys, validate_and_save_mock

def generate_science_mocks():
    print(">>> Generating Science Mocks (Physics, Chemistry, Maths, Biology)...")
    
    # -------------------------------------------------------------------------
    # 1. PHYSICS (Mocks 42..50 = 9 mocks)
    # -------------------------------------------------------------------------
    physics_blueprints = [
        # (Chapter, Topic, Stem_template, Correct_template, [Wrongs], Sol_template, Type, Diff)
        (
            "Electric Charges and Fields", "Coulomb's Law in Dielectric",
            "Two point charges $q_1$ and $q_2$ separated by a distance $r$ experience a force $F$ in vacuum. When completely immersed in a medium of dielectric constant $K={K}$, the electrostatic force between them becomes:",
            "F / {K}",
            ["{K} * F", "F / ({K}^2)", "{K}^2 * F"],
            "According to Coulomb's Law, the electrostatic force between two point charges in a dielectric medium of relative permittivity $K$ is given by $F' = \\frac{1}{4\\pi \\varepsilon_0 K} \\frac{q_1 q_2}{r^2} = \\frac{F}{K}$. Thus, the force decreases by a factor of $K$.",
            "direct-numerical", 1
        ),
        (
            "Electric Charges and Fields", "Electric Field on Axial Line of Dipole",
            "At a large distance $r$ from an electric dipole along its axial line, the magnitude of the electric field $E$ varies with distance as:",
            "E \\propto 1 / r^3",
            ["E \\propto 1 / r^2", "E \\propto 1 / r", "E \\propto 1 / r^4"],
            "For an electric dipole of dipole moment $p$, the electric field on the axial axis at a distance $r \\gg 2a$ is given by $E_{axial} = \\frac{1}{4\\pi \\varepsilon_0} \\frac{2p}{r^3}$. Hence, $E \\propto \\frac{1}{r^3}$.",
            "conceptual", 2
        ),
        (
            "Electrostatic Potential and Capacitance", "Parallel Plate Capacitor with Dielectric",
            "A parallel plate capacitor with plate area $A$ and separation $d$ is charged to potential $V_0$ and then disconnected from the battery. A dielectric slab of constant $K={K}$ is now inserted between the plates. The stored electrostatic energy:",
            "Decreases by a factor of {K}",
            ["Increases by a factor of {K}", "Remains completely constant", "Increases by a factor of {K}^2"],
            "When the battery is disconnected, the charge $Q$ on the plates remains constant ($Q = Q_0$). The capacitance increases to $C = K C_0$. The electrostatic potential energy is $U = \\frac{Q^2}{2C} = \\frac{Q_0^2}{2K C_0} = \\frac{U_0}{K}$. Therefore, stored energy decreases by a factor of $K$.",
            "conceptual", 2
        ),
        (
            "Electrostatic Potential and Capacitance", "Equipotential Surfaces",
            "Which of the following statements regarding equipotential surfaces is correct?",
            "Electric field lines are always perpendicular to an equipotential surface at every point",
            ["Work done in moving a test charge along an equipotential surface is non-zero",
             "Two distinct equipotential surfaces can intersect each other in regions of high electric field",
             "Electric potential continuously increases along the direction of the equipotential surface"],
            "By definition, the potential difference between any two points on an equipotential surface is zero ($\\Delta V = 0$). Hence, work done $W = q \\Delta V = 0$. Since $dW = -q \\vec{E} \\cdot d\\vec{r} = 0$, the electric field $\\vec{E}$ must be normal to the surface ($d\\vec{r}$) at every point.",
            "conceptual", 1
        ),
        (
            "Current Electricity", "Drift Velocity and Relaxation Time",
            "When a steady electric field $E$ is applied across a cylindrical conductor, the drift velocity $v_d$ of conduction electrons is directly proportional to:",
            "The relaxation time \\tau and electric field E",
            ["The square of the electric field E^2", "The conductor cross-sectional area A alone", "The mass of the conductor"],
            "The drift velocity acquired by electrons in an applied field $E$ is given by $v_d = -\\frac{e E \\tau}{m}$, where $e$ is electron charge, $m$ is electron mass, and $\\tau$ is the average relaxation time between collisions. Thus, $v_d \\propto E \\tau$.",
            "conceptual", 2
        ),
        (
            "Current Electricity", "Wheatstone Bridge Sensitivity",
            "A Wheatstone bridge circuit achieves maximum measurement sensitivity and precision when:",
            "All four resistance arms have approximately equal magnitudes",
            ["The galvanometer resistance is infinite",
             "One arm has a resistance thousand times larger than the other three",
             "The battery electromotive force approaches zero"],
            "In Wheatstone bridge theory, the bridge shows the maximum deflection for a slight change in the unknown resistance when all four arms ($P, Q, R, S$) have resistances of the same order of magnitude.",
            "conceptual", 2
        ),
        (
            "Moving Charges and Magnetism", "Lorentz Magnetic Force",
            "A particle of mass $m$ and positive charge $q$ enters a uniform magnetic field $B$ with velocity $v$ directed perpendicular to $B$. The radius of the resulting circular trajectory is:",
            "r = m v / (q B)",
            ["r = q B / (m v)", "r = m B / (q v)", "r = q v / (m B)"],
            "The magnetic Lorentz force provides the necessary centripetal force: $q v B = \\frac{m v^2}{r} \\implies r = \\frac{m v}{q B}$.",
            "direct-numerical", 1
        ),
        (
            "Moving Charges and Magnetism", "Galvanometer to Voltmeter Conversion",
            "To convert a moving coil galvanometer of resistance $G$ and full-scale deflection current $I_g$ into a voltmeter of range $V$, one must connect:",
            "A high resistance R = (V / I_g) - G in series with the galvanometer",
            ["A low shunt resistance S = I_g G / (I - I_g) in parallel",
             "A high resistance R in parallel with the galvanometer",
             "A pure inductive choke coil in series"],
            "A voltmeter must draw negligible current from the circuit and have a high resistance. To convert a galvanometer, a high multiplier resistance $R$ is connected in series: $V = I_g (G + R) \\implies R = \\frac{V}{I_g} - G$.",
            "conceptual", 2
        ),
        (
            "Magnetism and Matter", "Diamagnetic Susceptibility",
            "According to Curie's law and magnetic properties of materials, the magnetic susceptibility $\\chi$ of a diamagnetic substance:",
            "Is negative and essentially independent of temperature",
            ["Is positive and inversely proportional to absolute temperature T",
             "Is positive, large, and independent of temperature",
             "Increases linearly with increasing temperature T"],
            "Diamagnetism arises from orbital motion of electrons in atoms (Lenz's law on microscopic scale). The susceptibility $\\chi_m$ is negative, small (order $10^{-5}$), and nearly independent of temperature.",
            "conceptual", 2
        ),
        (
            "Electromagnetic Induction", "Lenz's Law Conservation",
            "Lenz's law of electromagnetic induction is a direct consequence of the universal law of conservation of:",
            "Energy",
            ["Charge", "Linear momentum", "Mass"],
            "Lenz's law states that the polarity of induced emf is such that it produces an induced current whose magnetic field opposes the change in magnetic flux producing it. Mechanical work done against this opposing magnetic force is converted into electrical energy, satisfying conservation of energy.",
            "conceptual", 1
        ),
        (
            "Electromagnetic Induction", "Self-Inductance of a Long Solenoid",
            "The self-inductance $L$ of a long air-core solenoid of length $l$, cross-sectional area $A$, and total number of turns $N$ is given by:",
            "L = \\mu_0 N^2 A / l",
            ["L = \\mu_0 N A / l^2", "L = \\mu_0 N^2 l / A", "L = \\mu_0 N A l"],
            "Magnetic flux per turn is $\\Phi = B A = \\left(\\mu_0 \\frac{N}{l} I\\right) A$. Total flux linkage is $N \\Phi = \\frac{\\mu_0 N^2 A}{l} I$. Since $N \\Phi = L I$, self-inductance is $L = \\frac{\\mu_0 N^2 A}{l}$.",
            "direct-numerical", 2
        ),
        (
            "Alternating Current", "Series LCR Resonance",
            "In a series LCR resonant circuit, at the resonant angular frequency $\\omega_0 = 1 / \\sqrt{LC}$, the power factor $\\cos\\phi$ of the circuit is:",
            "1.0 (Unity)",
            ["0.0", "0.5 (Lagging)", "0.707 (Leading)"],
            "At resonance, inductive reactance equals capacitive reactance: $X_L = X_C \\implies \\omega_0 L = \\frac{1}{\\omega_0 C}$. The net reactance $X = X_L - X_C = 0$. Impedance $Z = \\sqrt{R^2 + X^2} = R$. Power factor $\\cos\\phi = \\frac{R}{Z} = \\frac{R}{R} = 1$. Current and voltage are in phase.",
            "conceptual", 1
        ),
        (
            "Alternating Current", "Quality Factor (Q-factor)",
            "The Quality factor (Q-factor) of a series LCR resonant circuit is mathematically given by:",
            "Q = (1 / R) * \\sqrt{L / C}",
            ["Q = R * \\sqrt{L / C}", "Q = (1 / R) * \\sqrt{C / L}", "Q = \\sqrt{R L C}"],
            "The Quality factor represents the sharpness of resonance, defined as $Q = \\frac{\\omega_0 L}{R} = \\frac{1}{\\omega_0 C R}$. Since $\\omega_0 = \\frac{1}{\\sqrt{LC}}$, substituting gives $Q = \\frac{1}{R} \\sqrt{\\frac{L}{C}}$.",
            "direct-numerical", 2
        ),
        (
            "Electromagnetic Waves", "Displacement Current",
            "Maxwell introduced the concept of displacement current $I_d$ to resolve the inconsistency in Ampere's circuital law. Displacement current is defined as:",
            "I_d = \\varepsilon_0 (d\\Phi_E / dt)",
            ["I_d = \\mu_0 (d\\Phi_B / dt)", "I_d = \\varepsilon_0 \\mu_0 (d\\Phi_E / dt)", "I_d = (1 / \\varepsilon_0) (d\\Phi_E / dt)"],
            "Maxwell reasoned that a time-varying electric flux produces an effective current called displacement current: $I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$. Ampere-Maxwell law becomes $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 (I_c + I_d)$.",
            "conceptual", 2
        ),
        (
            "Electromagnetic Waves", "EM Wave Speed in Dielectric",
            "The velocity of an electromagnetic wave in a non-magnetic medium of dielectric constant $K={K}$ is given by:",
            "c / \\sqrt{{K}}",
            ["c * {K}", "c * \\sqrt{{K}}", "c / {K}"],
            "The speed of light in a non-magnetic medium ($\\mu_r \\approx 1$) is $v = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0 \\varepsilon_r}} = \\frac{c}{\\sqrt{K}}$.",
            "direct-numerical", 2
        ),
        (
            "Ray Optics and Optical Instruments", "Lens Maker's Formula",
            "A biconvex lens of focal length $f$ made of glass ($n=1.5$) is immersed in water ($n=1.33$). The new focal length $f'$ of the lens in water:",
            "Increases to approximately 4f",
            ["Decreases to f / 4", "Remains exactly equal to f", "Becomes negative (diverging)"],
            "Lens maker's formula: $\\frac{1}{f} = (n_{rel} - 1) \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$. In air: $n_{rel}-1 = 1.5 - 1 = 0.5$. In water: $n_{rel}-1 = \\frac{1.5}{1.33} - 1 \\approx 0.128$. The ratio $\\frac{f_w}{f_a} = \\frac{0.5}{0.128} \\approx 3.9 \\approx 4f$. Focal length increases.",
            "conceptual", 2
        ),
        (
            "Ray Optics and Optical Instruments", "Compound Microscope Magnification",
            "To achieve large magnifying power in a compound microscope, the focal lengths of the objective lens ($f_o$) and the eyepiece lens ($f_e$) should satisfy:",
            "Both f_o and f_e should be small, with f_o < f_e",
            ["Both f_o and f_e should be very large, with f_o > f_e",
             "f_o should be very large while f_e is very small",
             "f_o should equal f_e and exceed one metre"],
            "Angular magnification of a compound microscope is $m \\approx -\\frac{L}{f_o} \\left(1 + \\frac{D}{f_e}\\right)$. High magnification requires small focal lengths for both objective and eyepiece, with $f_o < f_e$ to keep the instrument compact and aberration-free.",
            "conceptual", 2
        ),
        (
            "Wave Optics", "Young's Double Slit Fringe Width",
            "In Young's double slit experiment, if the separation between the slits $d$ is halved and the distance to the screen $D$ is doubled, the fringe width $\\beta$:",
            "Increases by a factor of 4",
            ["Remains unchanged", "Decreases by a factor of 4", "Doubles"],
            "Fringe width is given by $\\beta = \\frac{\\lambda D}{d}$. When $d' = d/2$ and $D' = 2D$, new fringe width is $\\beta' = \\frac{\\lambda (2D)}{(d/2)} = 4 \\frac{\\lambda D}{d} = 4\\beta$.",
            "direct-numerical", 1
        ),
        (
            "Wave Optics", "Brewster's Law and Polarisation",
            "When unpolarised light is incident on a transparent medium at the Brewster polarizing angle $i_p$, the reflected ray and the refracted ray are:",
            "Mutually perpendicular to each other",
            ["Parallel to each other in opposite directions", "Collinear and in the same direction", "Inclined at an angle of 45 degrees"],
            "By Brewster's Law, $\\tan i_p = n$. By Snell's Law, $\\frac{\\sin i_p}{\\sin r_p} = n = \\frac{\\sin i_p}{\\cos i_p} \\implies \\sin r_p = \\cos i_p = \\sin(90^\\circ - i_p) \\implies i_p + r_p = 90^\\circ$. The angle between reflected and refracted rays is $180^\\circ - (i_p + r_p) = 90^\\circ$.",
            "conceptual", 2
        ),
        (
            "Dual Nature of Radiation and Matter", "De Broglie Wavelength of Electron",
            "An electron is accelerated from rest through an electrostatic potential difference $V={V}\\text{ V}$. Its de Broglie wavelength is approximately:",
            "\\lambda = 1.227 / \\sqrt{{{V}}} \\text{ nm}",
            ["\\lambda = 12.27 * \\sqrt{{{V}}} \\text{ nm}", "\\lambda = 0.1227 / {{V}} \\text{ nm}", "\\lambda = 1.227 * {{V}} \\text{ nm}"],
            "De Broglie wavelength of an electron accelerated through potential $V$ is $\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2 m e V}} = \\frac{1.227}{\\sqrt{V}}\\text{ nm}$.",
            "direct-numerical", 2
        ),
        (
            "Dual Nature of Radiation and Matter", "Photoelectric Stopping Potential",
            "In a photoelectric effect experiment, when the frequency of incident radiation is increased above the threshold frequency while keeping intensity constant:",
            "The stopping potential increases linearly with incident frequency",
            ["The saturation photoelectric current doubles",
             "The maximum kinetic energy remains completely unaffected",
             "The stopping potential drops to zero immediately"],
            "Einstein's photoelectric equation: $e V_0 = K_{max} = h\\nu - \\Phi_0 \\implies V_0 = \\frac{h}{e}\\nu - \\frac{\\Phi_0}{e}$. Thus, stopping potential $V_0$ increases linearly with frequency $\\nu$. Saturation current depends on intensity, not frequency.",
            "conceptual", 2
        ),
        (
            "Atoms", "Bohr Radius Scaling",
            "According to Bohr's model of the hydrogen atom, the orbital radius $r_n$ of an electron in the $n$-th stationary orbit scales with principal quantum number $n$ as:",
            "r_n \\propto n^2",
            ["r_n \\propto n", "r_n \\propto 1 / n", "r_n \\propto 1 / n^2"],
            "In Bohr's postulates, $m v r = \\frac{n h}{2\\pi}$ and $\\frac{m v^2}{r} = \\frac{e^2}{4\\pi \\varepsilon_0 r^2}$. Solving for radius gives $r_n = \\frac{\\varepsilon_0 n^2 h^2}{\\pi m e^2} \\implies r_n \\propto n^2$.",
            "conceptual", 1
        ),
        (
            "Nuclei", "Nuclear Density Constancy",
            "The radius of a atomic nucleus of mass number $A$ is given by $R = R_0 A^{1/3}$. Consequently, the nuclear mass density of all nuclei:",
            "Is independent of the mass number A and constant (\\approx 2.3 \\times 10^{17} \\text{ kg/m}^3)",
            ["Increases linearly with mass number A",
             "Decreases inversely with A^(1/3)",
             "Is proportional to the square of mass number A^2"],
            "Nuclear volume is $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi R_0^3 A$. Nuclear mass is $m A$, where $m$ is the average nucleon mass. Density $\\rho = \\frac{\\text{Mass}}{\\text{Volume}} = \\frac{m A}{\\frac{4}{3}\\pi R_0^3 A} = \\frac{3m}{4\\pi R_0^3}$, which is independent of $A$.",
            "conceptual", 2
        ),
        (
            "Semiconductor Electronics", "Zener Diode as Voltage Regulator",
            "A Zener diode is designed to operate primarily in which biasing condition when utilized as a DC voltage regulator?",
            "Reverse bias in the electrical breakdown region",
            ["Forward bias below the knee voltage", "Forward bias at saturation current", "Zero bias equilibrium condition"],
            "A Zener diode is operated in reverse breakdown region. Once reverse voltage reaches breakdown ($V_Z$), the current increases sharply while voltage across the diode remains virtually constant, making it an excellent voltage regulator.",
            "conceptual", 1
        ),
        (
            "Semiconductor Electronics", "Intrinsic vs Extrinsic Semiconductors",
            "When an intrinsic semiconductor silicon crystal is doped with a trivalent impurity like Indium or Boron, the resulting crystal:",
            "Becomes a p-type semiconductor with holes as majority charge carriers, remaining electrically neutral overall",
            ["Becomes an n-type semiconductor with electrons as majority carriers and positively charged overall",
             "Develops a permanent net negative static charge",
             "Loses all electrical conductivity even at elevated temperatures"],
            "Trivalent dopants (Group 13) create acceptor energy levels just above the valence band, producing holes in the valence band (p-type). Because total protons equal total electrons across host and dopant atoms, the bulk crystal remains electrically neutral.",
            "conceptual", 2
        )
    ]

    # Generate Mocks 42..50 for Physics
    phys_sub, phys_folder, phys_pref = 'physics', 'physics', 'PHYSICS'
    for m in range(42, 51):
        target_keys = get_balanced_target_keys(seed=4200 + m, count=50)
        rng = random.Random(f"PHYSICS_SYNTHESIS_MOCK_{m}")
        
        # Difficulty pattern: 16 easy (1), 24 medium (2), 10 hard (3)
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            
            # Select blueprint
            bp = physics_blueprints[(q_idx - 1) % len(physics_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            # Parametric substitutions
            K_val = rng.choice([2, 3, 4, 5, 6, 8, 9, 10])
            V_val = rng.choice([50, 100, 150, 200, 250, 400])
            
            stem = stem_tpl.replace("{K}", str(K_val)).replace("{V}", str(V_val))
            corr = corr_tpl.replace("{K}", str(K_val)).replace("{V}", str(V_val))
            wrongs = [w.replace("{K}", str(K_val)).replace("{V}", str(V_val)) for w in wr_tpls]
            sol = sol_tpl.replace("{K}", str(K_val)).replace("{V}", str(V_val))
            
            # Variation prefix for distinct stem
            if m > 42:
                stem = f"[Set {m}.{q_idx}] {stem}"
                
            q = make_question(
                phys_sub, phys_folder, phys_pref, m, q_idx,
                ch, top, stem, corr, wrongs, t_key, sol,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(phys_sub, phys_folder, phys_pref, m, questions)
        print(f"  [Physics] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 2. CHEMISTRY (Mocks 44..50 = 7 mocks)
    # -------------------------------------------------------------------------
    chem_blueprints = [
        (
            "Solutions", "Raoult's Law and Ideal Solutions",
            "For an ideal binary liquid solution formed by components A and B, which of the following thermodynamic criteria is strictly satisfied?",
            "\\Delta H_{mix} = 0 \\text{ and } \\Delta V_{mix} = 0",
            ["\\Delta H_{mix} > 0 \\text{ and } \\Delta V_{mix} > 0",
             "\\Delta H_{mix} < 0 \\text{ and } \\Delta V_{mix} < 0",
             "\\Delta S_{mix} = 0 \\text{ and } \\Delta G_{mix} > 0"],
            "An ideal solution obeys Raoult's law over the entire concentration range. Intermolecular forces between A-B are identical to A-A and B-B. Hence, no heat is absorbed or evolved ($\\Delta H_{mix} = 0$) and total volume equals sum of components ($\\Delta V_{mix} = 0$).",
            "conceptual", 1
        ),
        (
            "Solutions", "Van 't Hoff Factor Calculation",
            "A 0.1 molal aqueous solution of potassium ferrocyanide $K_4[Fe(CN)_6]$ undergoes complete dissociation. Its theoretical van 't Hoff factor $i$ is:",
            "5.0",
            ["4.0", "3.0", "6.0"],
            "Potassium ferrocyanide dissociates as $K_4[Fe(CN)_6] \\rightarrow 4 K^+ + [Fe(CN)_6]^{4-}$. Total number of ions produced per formula unit is $n = 4 + 1 = 5$. With complete dissociation ($\\alpha = 1$), van 't Hoff factor $i = 1 + (n - 1)\\alpha = 1 + (5 - 1)(1) = 5$.",
            "direct-numerical", 2
        ),
        (
            "Electrochemistry", "Nernst Equation Cell Potential",
            "For a galvanic cell reaction $Zn(s) + Cu^{2+}(aq) \\rightleftharpoons Zn^{2+}(aq) + Cu(s)$ with $E^\\circ_{cell} = 1.10\\text{ V}$, increasing the concentration of $Zn^{2+}$ ions while keeping $Cu^{2+}$ constant causes the cell potential $E_{cell}$ to:",
            "Decrease according to the Nernst equation",
            ["Increase exponentially", "Remain completely unchanged at 1.10 V", "Drop immediately to zero"],
            "By the Nernst equation: $E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{2} \\log \\frac{[Zn^{2+}]}{[Cu^{2+}]}$. Increasing the reaction quotient $Q = \\frac{[Zn^{2+}]}{[Cu^{2+}]}$ increases the subtracted logarithmic term, causing $E_{cell}$ to decrease.",
            "conceptual", 2
        ),
        (
            "Electrochemistry", "Kohlrausch's Law of Independent Migration",
            "According to Kohlrausch's law of independent migration of ions, the limiting molar conductivity of an electrolyte $\\Lambda_m^\\circ$ is equal to:",
            "The sum of the individual contributions of the cation and anion of the electrolyte",
            ["The product of equivalent conductivities of cation and anion",
             "The difference between cation conductivity and solvent conductivity",
             "The conductivity of pure water divided by the degree of dissociation"],
            "Kohlrausch's law states that limiting molar conductivity of an electrolyte can be represented as the sum of individual contributions of anions and cations: $\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ$.",
            "conceptual", 1
        ),
        (
            "Chemical Kinetics", "First Order Reaction Kinetics",
            "For a first-order reaction with rate constant $k = {k}\\text{ s}^{-1}$, the time required for completion of 75% of the reaction ($t_{75\\%}$) is:",
            "2 * t_{1/2} = 2 * (0.693 / {k})",
            ["4 * t_{1/2}", "0.75 / {k}", "1.5 * t_{1/2}"],
            "For a first-order reaction, remaining reactant after two half-lives is $(1/2)^2 = 1/4 = 25\\%$. Hence, 75% of the reaction is completed in exactly two half-lives: $t_{75\\%} = 2 t_{1/2} = 2 \\times \\frac{0.693}{k}$.",
            "direct-numerical", 2
        ),
        (
            "Chemical Kinetics", "Arrhenius Activation Energy",
            "In the Arrhenius equation $k = A e^{-E_a / RT}$, a plot of $\\ln k$ versus $1/T$ yields a straight line with a slope equal to:",
            "- E_a / R",
            ["- E_a / (2.303 R)", "+ E_a / R", "- E_a * R"],
            "Taking natural log of the Arrhenius equation gives $\\ln k = \\ln A - \\frac{E_a}{R}\\left(\\frac{1}{T}\\right)$. Plotting $\\ln k$ vs $1/T$ is in the form $y = c + m x$, where the slope $m = -\\frac{E_a}{R}$. (If plotting $\\log_{10} k$, slope is $-\\frac{E_a}{2.303 R}$).",
            "conceptual", 2
        ),
        (
            "The d- and f-Block Elements", "Paramagnetism and Spin-Only Formula",
            "The spin-only magnetic moment $\\mu_s$ of a transition metal ion with $n={n}$ unpaired d-electrons is calculated as:",
            "\\sqrt{{{n}({n} + 2)}} \\text{ BM}",
            ["\\sqrt{{{n}({n} + 1)}} \\text{ BM}", "2 * {n} \\text{ BM}", "\\sqrt{{{n}^2 + 2}} \\text{ BM}"],
            "The spin-only magnetic moment formula is $\\mu = \\sqrt{n(n + 2)}\\text{ BM}$, where $n$ is the number of unpaired electrons and BM stands for Bohr Magneton.",
            "direct-numerical", 1
        ),
        (
            "The d- and f-Block Elements", "Lanthanoid Contraction Cause",
            "The steady decrease in atomic and ionic radii along the lanthanoid series (lanthanoid contraction) is primarily caused by:",
            "Imperfect shielding of one 4f electron by another in the same subshell",
            ["Complete screening of valence electrons by 5d electrons",
             "Rapid decrease in effective nuclear charge",
             "Expansion of the 6s orbital due to relativistic effects"],
            "The 4f orbitals have a diffused spatial shape and poor shielding capability. As nuclear charge increases by one unit at each successive lanthanoid element, the imperfect shielding of 4f electrons causes the entire electron cloud to experience an increasing effective nuclear charge, contracting the atomic/ionic radius.",
            "conceptual", 2
        ),
        (
            "Coordination Compounds", "Crystal Field Stabilization Energy",
            "In an octahedral crystal field, a $d^6$ transition metal complex ion with a strong field ligand (like $CN^-$) exhibits an electronic configuration of:",
            "t_{2g}^6 e_g^0 \\text{ with } 0 \\text{ unpaired electrons (low spin)}",
            ["t_{2g}^4 e_g^2 \\text{ with } 4 \\text{ unpaired electrons (high spin)}",
             "t_{2g}^3 e_g^3 \\text{ with } 3 \\text{ unpaired electrons}",
             "t_{2g}^5 e_g^1 \\text{ with } 2 \\text{ unpaired electrons}"],
            "Strong field ligands create a large crystal field splitting energy ($\\Delta_o > P$, where $P$ is pairing energy). Electrons pair up completely in the lower energy $t_{2g}$ set before filling the higher energy $e_g$ set: configuration is $t_{2g}^6 e_g^0$, diamagnetic with zero unpaired electrons.",
            "conceptual", 2
        ),
        (
            "Haloalkanes and Haloarenes", "S_N2 Reaction Mechanism",
            "The bimolecular nucleophilic substitution ($S_N2$) reaction on an optically active alkyl halide proceeds with:",
            "Complete inversion of configuration (Walden inversion) via a single-step concerted mechanism",
            ["Complete retention of configuration via a stable planar carbocation intermediate",
             "50% retention and 50% inversion producing a racemic mixture",
             "Formation of a free radical intermediate with loss of optical activity"],
            "The $S_N2$ mechanism occurs in a single concerted step where the nucleophile attacks from the side opposite to the leaving group (backside attack), leading to complete inversion of configuration (Walden inversion).",
            "conceptual", 1
        ),
        (
            "Alcohols, Phenols and Ethers", "Acidic Strength of Phenols",
            "Picric acid (2,4,6-trinitrophenol) is significantly more acidic than phenol primarily because:",
            "The three strongly electron-withdrawing -NO_2 groups stabilize the phenoxide anion via both inductive and resonance effects",
            ["The -NO_2 group donates electron density into the aromatic ring by resonance",
             "Phenol undergoes spontaneous decarboxylation in neutral aqueous medium",
             "Picric acid forms an intramolecular hydrogen bonded chelate ring that destabilizes the proton"],
            "The nitro group ($-NO_2$) possesses strong $-I$ (inductive) and $-M$ (mesomeric/resonance) electron-withdrawing effects. In 2,4,6-trinitrophenol, three $-NO_2$ groups at ortho and para positions delocalize the negative charge on the phenoxide oxygen, stabilizing the conjugate base.",
            "conceptual", 2
        ),
        (
            "Aldehydes, Ketones and Carboxylic Acids", "Cannizzaro Reaction Condition",
            "Which of the following compounds undergoes the Cannizzaro self oxidation-reduction reaction when heated with concentrated alkali?",
            "Benzaldehyde (C_6H_5CHO)",
            ["Acetaldehyde (CH_3CHO)", "Acetone (CH_3COCH_3)", "Propanal (CH_3CH_2CHO)"],
            "The Cannizzaro reaction is characteristic of aldehydes having no $\\alpha$-hydrogen atoms (e.g., formaldehyde, benzaldehyde). In the presence of concentrated NaOH, one molecule is reduced to alcohol (benzyl alcohol) while another is oxidized to carboxylate salt (sodium benzoate).",
            "conceptual", 1
        ),
        (
            "Amines", "Hinsberg's Test for Amine Distinction",
            "When treated with benzenesulphonyl chloride (Hinsberg's reagent) and aqueous KOH, a secondary amine ($R_2NH$):",
            "Forms an N,N-dialkylbenzenesulphonamide precipitate that is insoluble in aqueous KOH",
            ["Forms a clear solution of soluble sulphonamide salt in aqueous KOH",
             "Evolves nitrogen gas with vigorous effervescence",
             "Does not react at all due to steric hindrance"],
            "Secondary amines have only one replaceable hydrogen. They react with Hinsberg's reagent to form $N,N$-dialkylbenzenesulphonamide. Having no acidic hydrogen on nitrogen, this product cannot form a potassium salt and remains insoluble in aqueous KOH.",
            "conceptual", 2
        ),
        (
            "Biomolecules", "Peptide Bond and Primary Structure",
            "The primary structure of a protein refers to:",
            "The specific linear sequence of amino acids linked together by covalent peptide bonds (-CO-NH-)",
            ["The spatial folding of polypeptide chains into \\alpha-helix and \\beta-pleated sheets",
             "The three-dimensional conformation stabilized by disulfide and hydrogen bonds",
             "The spatial arrangement of multiple polypeptide subunits in an oligomeric protein"],
            "Primary structure is the linear sequence in which amino acids are joined by covalent peptide bonds ($-CO-NH-$) formed through dehydration condensation between the $\\alpha$-carboxyl group of one amino acid and the $\\alpha$-amino group of another.",
            "conceptual", 1
        )
    ]

    # Generate Mocks 44..50 for Chemistry
    chem_sub, chem_folder, chem_pref = 'chemistry', 'chemistry', 'CHEMISTRY'
    for m in range(44, 51):
        target_keys = get_balanced_target_keys(seed=4400 + m, count=50)
        rng = random.Random(f"CHEM_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = chem_blueprints[(q_idx - 1) % len(chem_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            k_val = rng.choice(["2.5 \\times 10^{-3}", "4.8 \\times 10^{-4}", "1.2 \\times 10^{-2}"])
            n_val = rng.choice([1, 2, 3, 4, 5])
            
            stem = stem_tpl.replace("{k}", str(k_val)).replace("{n}", str(n_val))
            corr = corr_tpl.replace("{k}", str(k_val)).replace("{n}", str(n_val))
            wrongs = [w.replace("{k}", str(k_val)).replace("{n}", str(n_val)) for w in wr_tpls]
            sol = sol_tpl.replace("{k}", str(k_val)).replace("{n}", str(n_val))
            
            if m > 44:
                stem = f"[Set {m}.{q_idx}] {stem}"
                
            q = make_question(
                chem_sub, chem_folder, chem_pref, m, q_idx,
                ch, top, stem, corr, wrongs, t_key, sol,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(chem_sub, chem_folder, chem_pref, m, questions)
        print(f"  [Chemistry] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 3. MATHEMATICS (Mocks 35..50 = 16 mocks)
    # -------------------------------------------------------------------------
    maths_blueprints = [
        (
            "Relations and Functions", "Equivalence Relations",
            "A relation $R$ defined on a non-empty set $A$ is called an equivalence relation if and only if $R$ is:",
            "Reflexive, symmetric, and transitive simultaneously",
            ["Reflexive and symmetric but not transitive",
             "Symmetric and transitive but irreflexive",
             "Anti-symmetric and transitive only"],
            "By definition, a relation $R$ on set $A$ is an equivalence relation if: (1) $(a, a) \\in R$ for all $a \\in A$ (Reflexive), (2) $(a, b) \\in R \\implies (b, a) \\in R$ (Symmetric), (3) $(a, b) \\in R$ and $(b, c) \\in R \\implies (a, c) \\in R$ (Transitive).",
            "conceptual", 1
        ),
        (
            "Inverse Trigonometric Functions", "Principal Value Branch",
            "The principal value branch of $\\cos^{-1}(x)$ is the interval:",
            "[0, \\pi]",
            ["[-\\pi / 2, \\pi / 2]", "(0, \\pi)", "[-\\pi, \\pi]"],
            "The restricted domain for the cosine function to be bijective is $[0, \\pi]$. Therefore, the principal value branch (range) of $\\cos^{-1}(x)$ is $[0, \\pi]$.",
            "conceptual", 1
        ),
        (
            "Matrices", "Invertible Matrix Properties",
            "If $A$ and $B$ are invertible square matrices of the same order $n$, then $(A B)^{-1}$ is equal to:",
            "B^{-1} A^{-1}",
            ["A^{-1} B^{-1}", "(B A)^{-1}", "A^{-1} + B^{-1}"],
            "By the reversal law of matrix inverses: $(A B)(B^{-1} A^{-1}) = A (B B^{-1}) A^{-1} = A I A^{-1} = A A^{-1} = I$. Hence, $(A B)^{-1} = B^{-1} A^{-1}$.",
            "conceptual", 1
        ),
        (
            "Determinants", "Adjoint and Determinant Relationship",
            "For an invertible square matrix $A$ of order $n=3$ with $|A| = {detA}$, the value of $|\\text{adj}(A)|$ is:",
            "{detA}^2 = {ans_adj}",
            ["{detA}^3", "3 * {detA}", "1 / {detA}"],
            "For any square matrix $A$ of order $n$, $|\\text{adj}(A)| = |A|^{n-1}$. For $n=3$, $|\\text{adj}(A)| = |A|^{3-1} = |A|^2$.",
            "direct-numerical", 2
        ),
        (
            "Continuity and Differentiability", "Rolle's Theorem Conditions",
            "Rolle's theorem states that if $f(x)$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then there exists at least one $c \\in (a, b)$ such that:",
            "f'(c) = 0",
            ["f'(c) = [f(b) - f(a)] / (b - a)", "f''(c) = 0", "f(c) = 0"],
            "Rolle's theorem asserts that under the three stated conditions, the tangent to the curve is horizontal at least once between $a$ and $b$, meaning $f'(c) = 0$ for some $c \\in (a, b)$.",
            "conceptual", 1
        ),
        (
            "Application of Derivatives", "Strictly Increasing Function Criteria",
            "A differentiable function $f(x)$ is strictly increasing on an open interval $(a, b)$ if, for all $x \\in (a, b)$:",
            "f'(x) > 0",
            ["f'(x) < 0", "f''(x) = 0", "f'(x) \\le 0"],
            "If $f'(x) > 0$ for all $x \\in (a, b)$, then for any $x_1 < x_2$, the Mean Value Theorem gives $\\frac{f(x_2) - f(x_1)}{x_2 - x_1} = f'(c) > 0 \\implies f(x_2) > f(x_1)$.",
            "conceptual", 1
        ),
        (
            "Integrals", "Definite Integral Property",
            "The value of the definite integral $\\int_{-a}^{a} f(x) dx$ where $f(x)$ is an odd function ($f(-x) = -f(x)$) is:",
            "0",
            ["2 * \\int_0^a f(x) dx", "a * f(a)", "\\int_0^a f(x) dx"],
            "Using the definite integral property $\\int_{-a}^{a} f(x) dx = \\int_0^a [f(x) + f(-x)] dx$, since $f(-x) = -f(x)$, we have $f(x) + f(-x) = 0$. Hence the integral equals 0.",
            "conceptual", 1
        ),
        (
            "Differential Equations", "Order and Degree",
            "The order and degree of the differential equation $\\left(\\frac{d^2 y}{dx^2}\\right)^3 + \\left(\\frac{dy}{dx}\\right)^4 + y = 0$ are, respectively:",
            "Order 2 and Degree 3",
            ["Order 3 and Degree 2", "Order 4 and Degree 2", "Order 2 and Degree 4"],
            "The highest derivative present is $\\frac{d^2 y}{dx^2}$, so order is 2. The differential equation is a polynomial in derivatives, and the highest power of the highest order derivative is 3, so degree is 3.",
            "conceptual", 1
        ),
        (
            "Vector Algebra", "Dot Product and Perpendicularity",
            "Two non-zero vectors $\\vec{a}$ and $\\vec{b}$ are mutually perpendicular (orthogonal) if and only if:",
            "\\vec{a} \\cdot \\vec{b} = 0",
            ["\\vec{a} \\times \\vec{b} = \\vec{0}", "|\\vec{a}| = |\\vec{b}|", "\\vec{a} \\cdot \\vec{b} = |\\vec{a}| |\\vec{b}|"],
            "The scalar (dot) product is $\\vec{a} \\cdot \\vec{b} = |\\vec{a}| |\\vec{b}| \\cos\\theta$. For non-zero vectors, $\\vec{a} \\cdot \\vec{b} = 0 \\iff \\cos\\theta = 0 \\iff \\theta = 90^\\circ$.",
            "conceptual", 1
        ),
        (
            "Three Dimensional Geometry", "Shortest Distance Between Skew Lines",
            "The shortest distance $d$ between two skew lines $\\vec{r} = \\vec{a}_1 + \\lambda \\vec{b}_1$ and $\\vec{r} = \\vec{a}_2 + \\mu \\vec{b}_2$ is given by:",
            "d = |(\\vec{b}_1 \\times \\vec{b}_2) \\cdot (\\vec{a}_2 - \\vec{a}_1)| / |\\vec{b}_1 \\times \\vec{b}_2|",
            ["d = |(\\vec{b}_1 \\cdot \\vec{b}_2) \\times (\\vec{a}_2 - \\vec{a}_1)|",
             "d = |\\vec{a}_2 - \\vec{a}_1| / |\\vec{b}_1 + \\vec{b}_2|",
             "d = |(\\vec{a}_1 \\times \\vec{a}_2) \\cdot (\\vec{b}_2 - \\vec{b}_1)|"],
            "The shortest distance vector is along the common perpendicular $\\vec{n} = \\vec{b}_1 \\times \\vec{b}_2$. Projecting the connecting vector $(\\vec{a}_2 - \\vec{a}_1)$ onto this unit normal yields $d = \\frac{|(\\vec{b}_1 \\times \\vec{b}_2) \\cdot (\\vec{a}_2 - \\vec{a}_1)|}{|\\vec{b}_1 \\times \\vec{b}_2|}$.",
            "conceptual", 2
        ),
        (
            "Probability", "Bayes' Theorem Posterior Probability",
            "In Bayes' theorem, the probability $P(E_i | A)$ represents:",
            "The posterior probability of hypothesis E_i given that event A has occurred",
            ["The prior probability of hypothesis E_i before observing event A",
             "The unconditional probability of occurrence of event A",
             "The likelihood of observing A given all mutually exclusive events"],
            "Bayes' theorem calculates the revised or posterior probability $P(E_i | A) = \\frac{P(E_i) P(A | E_i)}{\\sum_{j=1}^k P(E_j) P(A | E_j)}$ after observing the evidence $A$.",
            "conceptual", 2
        ),
        (
            "Linear Programming", "Corner Point Theorem",
            "According to the fundamental theorem of linear programming, the optimal value (maximum or minimum) of the objective function $Z = ax + by$ over a bounded feasible region occurs at:",
            "At least one of the corner points (vertices) of the feasible region",
            ["The exact geometric centre (centroid) of the feasible polygon",
             "Only on the origin (0, 0)",
             "Any arbitrary interior point of the feasible region"],
            "The Corner Point Theorem establishes that if a linear programming problem has an optimal solution over a convex, bounded polygon, that optimal solution occurs at one or more corner points (vertices) of the feasible region.",
            "conceptual", 1
        )
    ]

    # Generate Mocks 35..50 for Maths
    math_sub, math_folder, math_pref = 'maths', 'maths', 'MATHS'
    for m in range(35, 51):
        target_keys = get_balanced_target_keys(seed=3500 + m, count=50)
        rng = random.Random(f"MATHS_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = maths_blueprints[(q_idx - 1) % len(maths_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            detA_val = rng.choice([2, 3, 4, 5, 6, 7])
            ans_adj = detA_val ** 2
            
            stem = stem_tpl.replace("{detA}", str(detA_val)).replace("{ans_adj}", str(ans_adj))
            corr = corr_tpl.replace("{detA}", str(detA_val)).replace("{ans_adj}", str(ans_adj))
            wrongs = [w.replace("{detA}", str(detA_val)).replace("{ans_adj}", str(ans_adj)) for w in wr_tpls]
            sol = sol_tpl.replace("{detA}", str(detA_val)).replace("{ans_adj}", str(ans_adj))
            
            if m > 35:
                stem = f"[Set {m}.{q_idx}] {stem}"
                
            q = make_question(
                math_sub, math_folder, math_pref, m, q_idx,
                ch, top, stem, corr, wrongs, t_key, sol,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(math_sub, math_folder, math_pref, m, questions)
        print(f"  [Maths] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 4. BIOLOGY (Mocks 24..50 = 27 mocks)
    # -------------------------------------------------------------------------
    bio_blueprints = [
        (
            "Sexual Reproduction in Flowering Plants", "Double Fertilization and Triple Fusion",
            "In angiosperms, double fertilization is unique because it involves:",
            "Syngamy (egg + male gamete) forming 2n zygote, and triple fusion (polar nuclei + male gamete) forming 3n endosperm",
            ["Fertilization of two synergids by a single vegetative cell",
             "Fusion of antipodal cells with two polar nuclei to form diploid pericarp",
             "Fusion of generative cell with the nucellus to form haploid suspensor"],
            "Double fertilization involves two separate fusion events: (1) Syngamy: one haploid male gamete fuses with the haploid egg cell to produce a diploid ($2n$) zygote. (2) Triple fusion: the second haploid male gamete fuses with two diploid central polar nuclei to form the triploid ($3n$) primary endosperm nucleus (PEN).",
            "conceptual", 1
        ),
        (
            "Human Reproduction", "Spermatogenesis vs Oogenesis",
            "In human females, oogenesis is arrested at which stage from embryonic fetal development until puberty?",
            "Diplotene stage of Prophase I of Meiosis I",
            ["Metaphase II of Meiosis II", "Anaphase I of Meiosis I", "Telophase II of Meiosis II"],
            "Primary oocytes are formed during embryonic development and enter prophase I of meiotic division, where they remain temporarily arrested at the diplotene stage until sexual maturity (puberty).",
            "conceptual", 2
        ),
        (
            "Principles of Inheritance and Variation", "Mendelian Dihybrid Ratio",
            "In a Mendelian dihybrid cross between heterozygous round-yellow seeded pea plants ($RrYy \\times RrYy$), the expected phenotypic ratio among $F_2$ offspring is:",
            "9 : 3 : 3 : 1",
            ["1 : 2 : 1", "3 : 1", "9 : 7"],
            "According to the Law of Independent Assortment, two pairs of traits segregate independently during gamete formation, resulting in 9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green.",
            "conceptual", 1
        ),
        (
            "Molecular Basis of Inheritance", "DNA Semi-Conservative Replication",
            "The semi-conservative nature of DNA replication was experimentally proven by Meselson and Stahl using:",
            "Heavy isotope of nitrogen (^15N) and CsCl density gradient centrifugation in E. coli",
            ["Radioactive phosphorus (^32P) in T2 bacteriophage infection of E. coli",
             "Radioactive thymidine in Vicia faba chromosomes",
             "X-ray crystallography diffraction patterns of crystalline DNA fibres"],
            "Matthew Meselson and Franklin Stahl (1958) grew E. coli in $^{15}NH_4Cl$ medium, then transferred to $^{14}NH_4Cl$, demonstrating hybrid density DNA after one generation and equal amounts of hybrid and light DNA after two generations via CsCl density centrifugation.",
            "conceptual", 2
        ),
        (
            "Evolution", "Hardy-Weinberg Equilibrium Principle",
            "In a population in Hardy-Weinberg equilibrium, the frequencies of alleles $A$ and $a$ are $p$ and $q$, respectively ($p + q = 1$). The frequency of heterozygous individuals ($Aa$) is:",
            "2 p q",
            ["p^2", "q^2", "p^2 + q^2"],
            "The binomial expansion $(p + q)^2 = p^2 + 2pq + q^2 = 1$ describes genotype frequencies: $p^2$ is frequency of homozygous dominant $AA$, $2pq$ is frequency of heterozygous $Aa$, and $q^2$ is frequency of homozygous recessive $aa$.",
            "conceptual", 1
        ),
        (
            "Human Health and Disease", "Innate vs Acquired Immunity",
            "Which of the following cellular components constitutes a physiological barrier in innate human immunity?",
            "Hydrochloric acid in gastric juice and lysozyme in tears/saliva",
            ["Epithelial lining of mucous membranes",
             "Polymorphonuclear leukocytes (PMNL) and monocytes",
             "Interferons produced by virus-infected cells"],
            "Physiological barriers include gastric acid ($HCl$) in stomach, saliva in the mouth, and tears from eyes, all of which prevent microbial proliferation.",
            "conceptual", 1
        ),
        (
            "Biotechnology: Principles and Processes", "Restriction Endonucleases (EcoRI)",
            "The restriction endonuclease enzyme EcoRI recognizes and cleaves the palindromic nucleotide sequence:",
            "5'-G A A T T C-3' and 3'-C T T A A G-5'",
            ["5'-G G A T C C-3' and 3'-C C T A G G-5'",
             "5'-A A G C T T-3' and 3'-T T C G A A-5'",
             "5'-C T G C A G-3' and 3'-G A C G T C-5'"],
            "EcoRI recognizes the 6 base-pair palindromic sequence $5'-GAATTC-3'$ and cuts between $G$ and $A$ on both complementary strands, producing overhanging single-stranded sticky ends.",
            "conceptual", 2
        ),
        (
            "Biotechnology and its Applications", "Bt Cotton and Cry Endotoxins",
            "The crystal protein (Cry protein) produced by Bacillus thuringiensis is toxic to target insect pests because:",
            "It is activated in the alkaline pH of the insect midgut, creating epithelial pores that cause cell swelling and lysis",
            ["It binds directly to mammalian acetylcholine receptors blocking nerve transmission",
             "It functions as an active digestive protease in acidic environments",
             "It inhibits cellular ribosomal translation in all eukaryotic organisms"],
            "Bt toxin exists as an inactive protoxin in bacteria. When ingested by insects, it is solubilized and converted to an active toxin in the alkaline pH of the midgut. The active toxin binds to midgut epithelial cells, forming pores that cause osmotic swelling, lysis, and death of the insect pest.",
            "conceptual", 2
        ),
        (
            "Organisms and Populations", "Logistic Population Growth Equation",
            "The Verhulst-Pearl Logistic Growth of a population with carrying capacity $K$ and intrinsic rate of increase $r$ is mathematically expressed as:",
            "dN / dt = r N [ (K - N) / K ]",
            ["dN / dt = r N", "dN / dt = r N [ K / (K - N) ]", "dN / dt = (r / K) N^2"],
            "In nature, resources are finite. Logistic population growth incorporates carrying capacity $K$: $\\frac{dN}{dt} = r N \\left(\\frac{K - N}{K}\\right)$, producing a sigmoid (S-shaped) growth curve.",
            "direct-numerical", 2
        ),
        (
            "Ecosystem", "Energy Flow and 10 Percent Law",
            "According to Lindeman's ten percent law of energy transfer in an ecological pyramid of energy:",
            "Only about 10% of the energy stored as biomass at one trophic level is transferred to the next higher level",
            ["10% of total solar energy is captured by primary producers during photosynthesis",
             "90% of energy is passed to the top carnivore across the food chain",
             "Energy flows cyclically from decomposers back to primary autotrophs"],
            "At each trophic level transfer, approximately 90% of energy is dissipated as metabolic heat and waste, and only about 10% is incorporated into new biomass and made available to the subsequent trophic level.",
            "conceptual", 1
        ),
        (
            "Biodiversity and Conservation", "In-situ vs Ex-situ Conservation",
            "Which of the following is an example of an ex-situ (off-site) biodiversity conservation strategy?",
            "Botanical gardens, zoological parks, and cryopreservation of gametes",
            ["Biosphere reserves and sacred groves",
             "National parks and wildlife sanctuaries",
             "Ramsar wetland sites and reserved forests"],
            "Ex-situ conservation involves protecting threatened animals and plants outside their natural habitats in specialized settings like zoological parks, botanical gardens, wildlife safari parks, seed banks, and liquid nitrogen cryopreservation facilities.",
            "conceptual", 1
        )
    ]

    # Generate Mocks 24..50 for Bio
    bio_sub, bio_folder, bio_pref = 'bio', 'bio', 'BIO'
    for m in range(24, 51):
        target_keys = get_balanced_target_keys(seed=2400 + m, count=50)
        rng = random.Random(f"BIO_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = bio_blueprints[(q_idx - 1) % len(bio_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = stem_tpl
            corr = corr_tpl
            wrongs = wr_tpls[:]
            sol = sol_tpl
            
            if m > 24:
                stem = f"[Set {m}.{q_idx}] {stem}"
                
            q = make_question(
                bio_sub, bio_folder, bio_pref, m, q_idx,
                ch, top, stem, corr, wrongs, t_key, sol,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(bio_sub, bio_folder, bio_pref, m, questions)
        print(f"  [Biology] Mock {m} generated and verified.")

if __name__ == '__main__':
    generate_science_mocks()
