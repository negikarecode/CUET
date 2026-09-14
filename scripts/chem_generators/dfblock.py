from scripts.chem_generators.common import make_question, normalize_text

def get_dfblock_questions(seen):
    qs = []
    
    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in dfblock: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "The d- and f-Block Elements"

    # 1-6: Electronic Configuration & Transition Metal Definition
    add(ch, "General Electronic Configuration of d-Block Elements",
        "What is the general valence shell electronic configuration representing the d-block (transition) elements?",
        [
            "$(n-1)d^{1-10}\\;ns^{1-2}$",
            "$(n-1)d^{1-10}\\;ns^2\\;np^6$",
            "$(n-2)f^{1-14}\\;(n-1)d^{0-1}\\;ns^2$",
            "$nd^{1-10}\\;(n+1)s^{1-2}$"
        ],
        "A",
        "Transition elements are characterized by the progressive filling of inner $(n-1)d$ subshells. The general outer electronic configuration of d-block elements according to NCERT is $(n-1)d^{1-10}\\;ns^{1-2}$, where $n$ is the outermost principal quantum number."
    )

    add(ch, "Anomalous Electronic Configuration of Chromium",
        "Chromium ($Z = 24$) exhibits the anomalous ground state electronic configuration $[\\text{Ar}]\\,3d^5\\,4s^1$ instead of $[\\text{Ar}]\\,3d^4\\,4s^2$. What is the primary reason for this electron distribution?",
        [
            "Extra stability associated with half-filled $3d$ subshell due to higher exchange energy and symmetrical electron distribution",
            "Lower nuclear charge of chromium compared to vanadium",
            "Greater shielding effect of $4s$ electrons over $3d$ electrons",
            "Complete absence of inter-electronic repulsion in $4s^1$"
        ],
        "A",
        "A half-filled subshell ($3d^5$) has maximum exchange energy (number of possible exchanges $K = \\frac{n(n-1)}{2} = \\frac{5 \\times 4}{2} = 10$) and symmetrical distribution of electron charge density, which confers extra thermodynamic stability compared to the theoretical $[\\text{Ar}]\\,3d^4\\,4s^2$ state."
    )

    add(ch, "Anomalous Electronic Configuration of Copper",
        "Copper ($Z = 29$) has an anomalous ground-state electron configuration of $[\\text{Ar}]\\,3d^{10}\\,4s^1$ rather than $[\\text{Ar}]\\,3d^9\\,4s^2$. This is fundamentally attributed to:",
        [
            "Completely filled $d^{10}$ subshell having maximum exchange energy and symmetrical charge distribution",
            "Lower second ionization enthalpy of copper",
            "The $4s$ orbital having lower energy than $3d$ orbital after filling",
            "Inert pair effect operating in the fourth period"
        ],
        "A",
        "A completely filled d-subshell ($3d^{10}$) possesses maximum exchange energy and a spherical, symmetrical charge distribution, making $[\\text{Ar}]\\,3d^{10}\\,4s^1$ substantially more stable than $[\\text{Ar}]\\,3d^9\\,4s^2$."
    )

    add(ch, "Classification of Group 12 Elements (Zn, Cd, Hg)",
        "Why are Zinc ($Z=30$), Cadmium ($Z=48$), and Mercury ($Z=80$) generally not regarded as typical transition elements despite residing in the d-block?",
        [
            "They possess completely filled $(n-1)d^{10}$ subshells in both their elemental ground state and their common oxidation states",
            "They do not form any chemical compounds with electronegative non-metals",
            "Their melting points and enthalpies of atomization are the highest in their respective periods",
            "They only exhibit negative oxidation states in their coordination complexes"
        ],
        "A",
        "By IUPAC definition, a transition element is an element whose atom has a partially filled $d$ subshell, or which can give rise to cations with an incomplete $d$ subshell. Zinc ($[\\text{Ar}]\\,3d^{10}\\,4s^2$), cadmium ($[\\text{Kr}]\\,4d^{10}\\,5s^2$), and mercury ($[\\text{Xe}]\\,4f^{14}\\,5d^{10}\\,6s^2$) have fully filled $(n-1)d^{10}$ subshells in their ground states as well as in their common $+2$ oxidation states ($Zn^{2+}: 3d^{10}$, $Cd^{2+}: 4d^{10}$, $Hg^{2+}: 5d^{10}$)."
    )

    add(ch, "Transition Character of Copper",
        "Copper has a completely filled $3d^{10}$ configuration in its ground state ($[\\text{Ar}]\\,3d^{10}\\,4s^1$). Why is copper strictly classified as a transition element?",
        [
            "It has an incompletely filled $3d$ subshell ($3d^9$) in its common $+2$ oxidation state ($Cu^{2+}$)",
            "It reacts readily with dilute mineral acids to liberate hydrogen gas",
            "Its $+1$ oxidation state ($Cu^+$) forms colored complexes in aqueous solution",
            "It exhibits variable oxidation states from $-1$ to $+5$"
        ],
        "A",
        "An element is classified as a transition element if it has an incompletely filled d-subshell in its ground state or in any of its common oxidation states. In the $+2$ oxidation state, copper has the electronic configuration $[\\text{Ar}]\\,3d^9$, which possesses an incompletely filled d-subshell. Hence, copper is a transition element."
    )

    add(ch, "Transition Character of Silver",
        "Silver ($Z=47$) has the ground state valence configuration $4d^{10}\\,5s^1$. Which of the following justifies why silver is classified as a transition metal?",
        [
            "Silver forms compounds in the $+2$ oxidation state (such as $AgF_2$) where it has an incompletely filled $4d^9$ configuration",
            "Silver has a partially filled $5s$ orbital in its common $+1$ state",
            "Silver is diamagnetic in all of its physical and chemical states",
            "Silver exhibits higher enthalpy of atomization than tungsten"
        ],
        "A",
        "Although silver has a completely filled $4d^{10}$ configuration in its ground state and $+1$ state ($Ag^+$: $4d^{10}$), it forms $+2$ oxidation state compounds such as $AgF_2$ where its configuration is $[\\text{Kr}]\\,4d^9$ (incompletely filled d-subshell). Therefore, silver is classified as a transition element."
    )

    # 7-12: Physical Properties, Enthalpy of Atomization, Density & Melting Points
    add(ch, "Melting Point Trends in 3d Transition Series",
        "In the 3d transition series, the melting point increases from scandium to chromium, drops abruptly at manganese, and then rises again. What causes the abnormally low melting point of manganese ($[\\text{Ar}]\\,3d^5\\,4s^2$)?",
        [
            "Stable half-filled $3d^5$ configuration binds electrons tightly to the atomic nucleus, resulting in weaker metallic bonding between Mn atoms",
            "Manganese has the largest atomic radius among all 3d transition metals",
            "Manganese exists as a diatomic gas at room temperature",
            "Manganese undergoes spontaneous radioactive decay weakening the lattice"
        ],
        "A",
        "The melting point of transition metals depends on the strength of metallic bonding, which depends on the number of unpaired d-electrons participating in delocalized bonding. Manganese has a stable half-filled $3d^5$ configuration where the electrons are tightly bound to the nucleus and less delocalized, resulting in weaker interatomic metallic bonding and an abnormally low melting point compared to its neighbors."
    )

    add(ch, "Enthalpies of Atomization of Transition Metals",
        "Why do transition elements generally possess very high enthalpies of atomization compared to s-block elements?",
        [
            "Large number of unpaired electrons in $(n-1)d$ orbitals participate alongside $ns$ electrons in strong interatomic metallic bonding",
            "Transition metals have completely filled valence p-orbitals providing ionic character",
            "Transition metals have extremely low effective nuclear charges",
            "Their atoms form exclusively covalent network crystals like diamond"
        ],
        "A",
        "Because transition metals have unpaired $(n-1)d$ electrons in addition to $ns$ electrons, both contribute to metallic bonding. The greater the number of valence electrons (both $ns$ and $(n-1)d$), the stronger the interatomic metallic bonding, resulting in high enthalpies of atomization."
    )

    add(ch, "Density Trend in 3d Transition Series",
        "What is the general trend in density of elements across the 3d transition series from Scandium ($Sc$) to Copper ($Cu$)?",
        [
            "Density increases steadily from $Sc$ to $Cu$ because atomic mass increases while atomic volume decreases",
            "Density decreases steadily from $Sc$ to $Cu$ due to increasing metallic radius",
            "Density remains constant across the entire series",
            "Density reaches a sharp minimum at iron and cobalt"
        ],
        "A",
        "Density is defined as mass per unit volume. Across the 3d series from $Sc$ to $Cu$, atomic mass increases progressively while atomic radius (and hence atomic volume) decreases due to increasing effective nuclear charge. Consequently, density increases continuously from Scandium ($3.43\\text{ g/cm}^3$) to Copper ($8.92\\text{ g/cm}^3$)."
    )

    add(ch, "Atomic and Ionic Radii Trends in 3d Series",
        "Across the 3d transition series from left to right, atomic radii initially decrease, remain nearly constant from Fe to Ni, and then increase slightly at Cu and Zn. Why do atomic radii increase towards the end of the series?",
        [
            "Increased inter-electronic repulsion among paired $3d$ electrons exceeds the effective nuclear charge, causing expansion of electron cloud",
            "Electrons are added to the outer $4p$ subshell instead of $3d$",
            "Effective nuclear charge drops sharply due to loss of core protons",
            "The elements switch from metallic to covalent network bonding"
        ],
        "A",
        "At the end of the 3d series (Cu and Zn), electron pairing in the 3d subshell is complete or nearly complete. The strong inter-electronic repulsions among paired 3d electrons outweigh the attractive force of the nuclear charge, pushing the outer electron cloud slightly outward and resulting in an increase in atomic radius."
    )

    add(ch, "Comparison of 4d and 5d Series Radii",
        "The atomic radii of second (4d) and third (5d) transition series elements in the same vertical group, such as Zirconium ($Zr$: $160\\text{ pm}$) and Hafnium ($Hf$: $159\\text{ pm}$), are virtually identical. This phenomenon is primarily due to:",
        [
            "Lanthanoid Contraction resulting from poor shielding by $4f$ electrons",
            "Diagonal relationship between group 4 and group 5 elements",
            "Inert pair effect operating in the 5d series",
            "Equal number of occupied electron shells in $Zr$ and $Hf$"
        ],
        "A",
        "Between lanthanum and hafnium lie the 14 lanthanoid elements in which the $4f$ subshell is filled. Due to the diffused shape and poor shielding effect of $4f$ electrons, the nuclear charge increases by 14 units without a proportional screening effect. This cumulative contraction, called the Lanthanoid Contraction, offsets the expected increase in size from 4d to 5d, making the radii of $Zr$ and $Hf$ almost identical."
    )

    add(ch, "Cause of Lanthanoid Contraction",
        "Which fundamental factor is directly responsible for the Lanthanoid Contraction observed in the f-block elements?",
        [
            "Imperfect shielding of one $4f$ electron by another in the same subshell against increasing nuclear charge",
            "High penetration power of $4f$ orbitals into the atomic nucleus",
            "Complete screening of nuclear charge by outermost $6s$ electrons",
            "Inter-electronic repulsion between $5d$ and $6s$ subshells"
        ],
        "A",
        "The shape of $4f$ orbitals is highly diffused, resulting in very poor and imperfect shielding of outer electrons from the attraction of the increasing nuclear charge. As atomic number increases across the lanthanoid series, the effective nuclear charge increases progressively, pulling the entire electron cloud closer to the nucleus."
    )

    # 13-18: Ionization Enthalpy & Electrode Potentials
    add(ch, "First Ionization Enthalpy Anomalies in 3d Series",
        "Why does Zinc ($[\\text{Ar}]\\,3d^{10}\\,4s^2$) have an exceptionally high first ionization enthalpy ($906\\text{ kJ/mol}$) compared to its preceding 3d transition metals?",
        [
            "Electron removal requires taking an electron from a stable, completely filled $4s^2$ subshell backed by a fully filled $3d^{10}$ core",
            "Zinc has a lower nuclear charge than copper",
            "Zinc loses an electron directly from the inner $3d$ subshell",
            "The hydration enthalpy of $Zn^+$ is extraordinarily high"
        ],
        "A",
        "In zinc, the electronic configuration is $[\\text{Ar}]\\,3d^{10}\\,4s^2$. Ionization involves the removal of an electron from the completely filled and stable $4s^2$ orbital, which is also well shielded by the stable, symmetrical $3d^{10}$ core, leading to an exceptionally high first ionization enthalpy."
    )

    add(ch, "Second Ionization Enthalpies of Cr and Cu",
        "Why are the second ionization enthalpies ($IE_2$) of Chromium ($Cr$) and Copper ($Cu$) significantly higher than those of their respective neighboring elements?",
        [
            "Removal of the second electron requires disrupting stable half-filled $3d^5$ and completely filled $3d^{10}$ configurations",
            "Their $+2$ oxidation states are inherently unstable in all physical environments",
            "Both elements have higher atomic masses than their neighbors",
            "The second electron is removed from the inner $3p$ noble gas core"
        ],
        "A",
        "After losing one electron, $Cr^+$ acquires the stable half-filled $[\\text{Ar}]\\,3d^5$ configuration and $Cu^+$ acquires the stable completely filled $[\\text{Ar}]\\,3d^{10}$ configuration. Removing a second electron requires disrupting these extraordinarily stable configurations, making $IE_2$ for Cr and Cu exceptionally high."
    )

    add(ch, "Third Ionization Enthalpy Comparison of Mn and Fe",
        "Why is the third ionization enthalpy ($IE_3$) of Manganese ($Mn$) much higher than that of Iron ($Fe$)?",
        [
            "Ionization of $Mn^{2+}$ requires removing an electron from a stable half-filled $3d^5$ subshell, whereas $Fe^{2+}$ ($3d^6$) achieves stable $3d^5$ upon losing an electron",
            "Manganese has a higher effective nuclear charge than iron",
            "Iron has a completely filled $4s$ subshell in its $+2$ state",
            "The radius of $Fe^{2+}$ is significantly larger than $Mn^{2+}$"
        ],
        "A",
        "$Mn^{2+}$ has the stable half-filled configuration $[\\text{Ar}]\\,3d^5$. Removing a third electron disrupts this stable subshell, requiring a very high ionization enthalpy ($3260\\text{ kJ/mol}$). In contrast, $Fe^{2+}$ has $[\\text{Ar}]\\,3d^6$, and removal of one electron yields the highly stable half-filled $3d^5$ configuration ($Fe^{3+}$), requiring comparatively less energy ($2962\\text{ kJ/mol}$)."
    )

    add(ch, "Standard Electrode Potential of Copper Couple",
        "Copper is the only 3d transition metal with a positive standard electrode potential ($E^\\circ(Cu^{2+}/Cu) = +0.34\\text{ V}$). What thermodynamic reason accounts for this positive value?",
        [
            "High sum of enthalpy of atomization and ionization enthalpies ($\\Delta_a H^\\circ + \\Delta_i H^\\circ$) is not compensated by its hydration enthalpy ($\\Delta_{\\text{hyd}} H^\\circ$)",
            "The hydration enthalpy of $Cu^{2+}$ is the lowest among all divalent 3d ions",
            "Copper has a negative enthalpy of sublimation",
            "The standard reduction potential of hydrogen is greater than that of copper"
        ],
        "A",
        "The conversion $Cu(s) \\to Cu^{2+}(aq) + 2e^-$ involves enthalpy of atomization (sublimation), first and second ionization enthalpies, and hydration enthalpy. For copper, the sum of high atomization enthalpy and ionization enthalpies is large and cannot be compensated by the hydration enthalpy of $Cu^{2+}$, making $\\Delta G^\\circ$ for oxidation positive, and thus $E^\\circ(Cu^{2+}/Cu)$ positive ($+0.34\\text{ V}$)."
    )

    add(ch, "Electrode Potential Anomalies of Mn and Zn",
        "Why are the standard reduction potentials $E^\\circ(M^{2+}/M)$ for Manganese ($-1.18\\text{ V}$) and Zinc ($-0.76\\text{ V}$) more negative than the general trend in the 3d series?",
        [
            "Greater stability of half-filled $3d^5$ in $Mn^{2+}$ and completely filled $3d^{10}$ in $Zn^{2+}$ facilitates cation formation",
            "Their enthalpies of atomization are the highest in the 3d series",
            "Manganese and zinc have zero second ionization enthalpies",
            "They form covalent insoluble hydroxides in standard aqueous solutions"
        ],
        "A",
        "The values of $E^\\circ(M^{2+}/M)$ for Mn and Zn are more negative than expected from the general trend because formation of $Mn^{2+}$ achieves the extra-stable half-filled $3d^5$ configuration and $Zn^{2+}$ achieves the completely filled $3d^{10}$ configuration. This stability lowers $IE_2$ relative to neighboring elements, favoring the $+2$ state."
    )

    add(ch, "Redox Nature of Cr(II) vs Mn(III) Couples",
        "Both $Cr^{2+}$ and $Mn^{3+}$ have a $d^4$ electronic configuration. Why is $Cr^{2+}$ a strong reducing agent while $Mn^{3+}$ is a strong oxidizing agent in aqueous solution?",
        [
            "$Cr^{2+}$ is oxidized to stable $Cr^{3+}$ ($t_{2g}^3$ configuration in water), whereas $Mn^{3+}$ is reduced to stable $Mn^{2+}$ ($d^5$ half-filled configuration)",
            "$Cr^{2+}$ has a higher nuclear charge than $Mn^{3+}$",
            "Crystal field splitting energy of $Mn^{3+}$ is negative in aqueous medium",
            "Chromium forms outer orbital complexes whereas manganese forms inner orbital complexes"
        ],
        "A",
        "In aqueous solution, $Cr^{2+}$ ($d^4$) readily loses an electron to form $Cr^{3+}$ ($d^3$), which has a half-filled, extra-stable $t_{2g}^3$ configuration in octahedral coordination ($E^\\circ(Cr^{3+}/Cr^{2+}) = -0.41\\text{ V}$, strong reducing agent). On the other hand, $Mn^{3+}$ ($d^4$) readily gains an electron to form $Mn^{2+}$ ($d^5$, extra-stable half-filled d-subshell, $E^\\circ(Mn^{3+}/Mn^{2+}) = +1.57\\text{ V}$, strong oxidizing agent)."
    )

    # 19-24: Oxidation States
    add(ch, "Variable Oxidation States in 3d Series",
        "Why do transition elements exhibit a wide variety of oxidation states in their chemical compounds?",
        [
            "The energy difference between $(n-1)d$ and $ns$ orbitals is very small, allowing electrons from both subshells to participate in bonding",
            "Transition metals readily accept electrons into empty $4p$ orbitals from ligands",
            "The effective nuclear charge is identical for all transition metal ions",
            "The $4s$ electrons are completely inert due to relativistic contraction"
        ],
        "A",
        "In transition elements, the energy difference between the inner $(n-1)d$ and outer $ns$ orbitals is minimal. Consequently, not only the $ns$ electrons but also the $(n-1)d$ electrons can participate in chemical bonding, leading to variable oxidation states differing by units of one."
    )

    add(ch, "Single Oxidation State of Scandium",
        "Scandium ($Z = 21$) exhibits only one stable oxidation state in its chemical compounds. What is this oxidation state, and why?",
        [
            "$+3$, because losing all three valence electrons ($3d^1\\,4s^2$) yields the noble gas configuration of argon $[\\text{Ar}]$",
            "$+2$, because the $3d$ electron is completely non-ionizable",
            "$+1$, because the $4s$ electrons are stabilized by exchange forces",
            "$+4$, because it can ionize an electron from the inner $3p$ subshell"
        ],
        "A",
        "Scandium has the configuration $[\\text{Ar}]\\,3d^1\\,4s^2$. By losing two $4s$ electrons and one $3d$ electron, it easily attains the exceptionally stable noble gas configuration of argon ($[\\text{Ar}]$). Thus, Scandium exhibits only the $+3$ oxidation state."
    )

    add(ch, "Maximum Oxidation States of Manganese",
        "Which 3d transition metal exhibits the highest number of oxidation states, ranging from $+2$ to $+7$?",
        [
            "Manganese ($Mn$)",
            "Chromium ($Cr$)",
            "Vanadium ($V$)",
            "Iron ($Fe$)"
        ],
        "A",
        "Manganese ($[\\text{Ar}]\\,3d^5\\,4s^2$) has 5 unpaired $3d$ electrons and 2 $4s$ electrons (total 7 valence electrons). It can utilize all these valence electrons to show oxidation states from $+2$ to $+7$ (e.g., $MnSO_4$, $MnO_2$, $K_2MnO_4$, $KMnO_4$), the maximum in the 3d series."
    )

    add(ch, "Relative Stability of Higher Oxidation States in Heavier Congeners",
        "In Group 6, while Chromium(VI) in the form of dichromate ($Cr_2O_7^{2-}$) is a strong oxidizing agent, Molybdenum(VI) ($MoO_3$) and Tungsten(VI) ($WO_3$) are stable and non-oxidizing. This reflects which general trend?",
        [
            "Higher oxidation states become progressively more stable down a transition group among heavier 4d and 5d metals",
            "Heavier transition elements prefer $+2$ oxidation states due to the inert pair effect",
            "Chromium has a larger atomic radius than tungsten",
            "Tungsten(VI) has more unpaired d-electrons than chromium(VI)"
        ],
        "A",
        "In transition elements, the stability of higher oxidation states increases on descending the group from 3d to 4d to 5d metals. For example, in Group 6, Cr(VI) is a powerful oxidizing agent (readily reduced to Cr(III)), whereas Mo(VI) and W(VI) are thermodynamically stable and exhibit no oxidizing properties."
    )

    add(ch, "Stabilization of Highest Oxidation States by Fluorine vs Oxygen",
        "Transition metals exhibit their highest oxidation states in oxides rather than fluorides (e.g., $Mn_2O_7$ exists while the highest manganese fluoride is $MnF_4$). Why is oxygen superior to fluorine in stabilizing high oxidation states?",
        [
            "Oxygen has the ability to form multiple bonds ($p\\pi-d\\pi$) with transition metals, whereas fluorine can only form single bonds",
            "Oxygen is more electronegative than fluorine",
            "Fluorine has empty d-orbitals that cause steric overcrowding",
            "Oxygen atoms always act as reducing agents in high oxidation state compounds"
        ],
        "A",
        "Although fluorine is more electronegative than oxygen, oxygen can form multiple bonds ($p\\pi-d\\pi$) with transition metals. The ability to form double bonds with the metal enables oxygen to stabilize the highest oxidation states (such as $+7$ in $Mn_2O_7$ or $+8$ in $OsO_4$) without excessive steric hindrance."
    )

    add(ch, "Stabilization of Zero and Low Oxidation States",
        "Transition metals often exhibit low or zero oxidation states in metal carbonyls such as $[Ni(CO)_4]$ and $[Fe(CO)_5]$. Which property of carbon monoxide ($CO$) stabilizes these zero oxidation states?",
        [
            "$\\text{CO}$ acts as a $\\pi$-acceptor ligand, removing electron density from the electron-rich metal via synergic back-bonding",
            "$\\text{CO}$ is a strong oxidizing agent that strips electrons from the metal",
            "$\\text{CO}$ forms purely ionic bonds with transition metal atoms",
            "$\\text{CO}$ protonates the transition metal center into a hydride"
        ],
        "A",
        "In low or zero oxidation states, transition metals have abundant d-electron density. Carbon monoxide ($CO$) possesses vacant $\\pi^*$ antibonding orbitals that accept electron density back from the metal d-orbitals (synergic $\\pi$-backbonding), thereby stabilizing the low oxidation state."
    )

    # 25-30: Magnetic Properties & Spin-Only Formula
    add(ch, "Spin-Only Magnetic Moment Formula",
        "The magnetic moment of transition metal ions is calculated using the spin-only formula. What is the correct expression for spin-only magnetic moment ($\\mu$) in Bohr Magnetons (BM)?",
        [
            "$\\mu = \\sqrt{n(n+2)}\\text{ BM}$",
            "$\\mu = \\sqrt{n(n+1)}\\text{ BM}$",
            "$\\mu = \\sqrt{2n(n+1)}\\text{ BM}$",
            "$\\mu = \\sqrt{n(n-2)}\\text{ BM}$"
        ],
        "A",
        "The spin-only magnetic moment is given by $\\mu = \\sqrt{n(n+2)}\\text{ BM}$, where $n$ represents the number of unpaired electrons and BM stands for Bohr Magneton ($1\\text{ BM} = \\frac{eh}{4\\pi m_e}$)."
    )

    add(ch, "Spin-Only Magnetic Moment of Fe(II) Ion",
        "What is the spin-only magnetic moment of the ferrous ion ($Fe^{2+}$, $Z = 26$)?",
        [
            "$4.90\\text{ BM}$",
            "$3.87\\text{ BM}$",
            "$5.92\\text{ BM}$",
            "$1.73\\text{ BM}$"
        ],
        "A",
        "For $Fe$ ($Z = 26$), electronic configuration is $[\\text{Ar}]\\,3d^6\\,4s^2$. For $Fe^{2+}$, the configuration is $[\\text{Ar}]\\,3d^6$. In a d-subshell with 6 electrons, number of unpaired electrons $n = 5 - 1 = 4$. Using $\\mu = \\sqrt{n(n+2)} = \\sqrt{4(6)} = \\sqrt{24} \\approx 4.90\\text{ BM}$."
    )

    add(ch, "Spin-Only Magnetic Moment of Cr(III) Ion",
        "Calculate the spin-only magnetic moment of the $Cr^{3+}$ ion ($Z = 24$).",
        [
            "$3.87\\text{ BM}$",
            "$4.90\\text{ BM}$",
            "$2.84\\text{ BM}$",
            "$1.73\\text{ BM}$"
        ],
        "A",
        "For $Cr$ ($Z = 24$), configuration is $[\\text{Ar}]\\,3d^5\\,4s^1$. For $Cr^{3+}$, three electrons are lost ($1$ from $4s$ and $2$ from $3d$), leaving $[\\text{Ar}]\\,3d^3$. Number of unpaired electrons $n = 3$. Spin-only magnetic moment $\\mu = \\sqrt{3(3+2)} = \\sqrt{15} \\approx 3.87\\text{ BM}$."
    )

    add(ch, "Spin-Only Magnetic Moment of Mn(II) Ion",
        "What is the calculated spin-only magnetic moment of an isolated gaseous $Mn^{2+}$ ion ($Z = 25$)?",
        [
            "$5.92\\text{ BM}$",
            "$4.90\\text{ BM}$",
            "$3.87\\text{ BM}$",
            "$6.93\\text{ BM}$"
        ],
        "A",
        "For $Mn$ ($Z = 25$), configuration is $[\\text{Ar}]\\,3d^5\\,4s^2$. For $Mn^{2+}$, configuration is $[\\text{Ar}]\\,3d^5$. The number of unpaired electrons $n = 5$. Spin-only magnetic moment $\\mu = \\sqrt{5(5+2)} = \\sqrt{35} \\approx 5.92\\text{ BM}$."
    )

    add(ch, "Diamagnetic 3d Transition Metal Ions",
        "Which of the following sets contains exclusively diamagnetic ions?",
        [
            "$Sc^{3+}, Ti^{4+}, Zn^{2+}, Cu^+$",
            "$Fe^{2+}, Co^{2+}, Ni^{2+}, Cu^{2+}$",
            "$Cr^{3+}, Mn^{2+}, Fe^{3+}, V^{3+}$",
            "$Ti^{3+}, V^{4+}, Cu^{2+}, Fe^{2+}$"
        ],
        "A",
        "An ion is diamagnetic if it contains zero unpaired electrons ($n = 0$). $Sc^{3+}$ ($3d^0$), $Ti^{4+}$ ($3d^0$), $Zn^{2+}$ ($3d^{10}$), and $Cu^+$ ($3d^{10}$) have either completely empty or completely filled d-subshells with no unpaired electrons; hence all are diamagnetic."
    )

    add(ch, "Deducing Number of Unpaired Electrons from Magnetic Moment",
        "A divalent 3d transition metal cation ($M^{2+}$) has an experimental spin-only magnetic moment of $2.84\\text{ BM}$. What is the number of unpaired electrons and the identity of the ion?",
        [
            "$2$ unpaired electrons; $Ni^{2+}$ ($3d^8$)",
            "$3$ unpaired electrons; $Co^{2+}$ ($3d^7$)",
            "$1$ unpaired electron; $Cu^{2+}$ ($3d^9$)",
            "$4$ unpaired electrons; $Fe^{2+}$ ($3d^6$)"
        ],
        "A",
        "Given $\\mu = 2.84\\text{ BM} \\approx \\sqrt{8} = \\sqrt{2(2+2)}$, the number of unpaired electrons is $n = 2$. For $Ni^{2+}$ ($Z = 28$), configuration is $[\\text{Ar}]\\,3d^8$, which contains 2 unpaired electrons."
    )

    # 31-36: Color of Transition Metal Ions & d-d Transitions
    add(ch, "Origin of Color in Transition Metal Ions",
        "What is the primary cause of color exhibited by hydrated transition metal cations in aqueous solutions?",
        [
            "Absorption of specific wavelengths of visible light promoting electrons between crystal field split d-orbitals (d-d transitions)",
            "Emission of photons when electrons drop from $4s$ to $3d$ orbitals",
            "Scattering of incident light by colloidal metal particles",
            "Radioactive luminescence of unstable nuclear isotopes"
        ],
        "A",
        "In the presence of surrounding water molecules (ligands), the degenerate d-orbitals split into two sets of different energies ($t_{2g}$ and $e_g$). When visible light falls on the complex, electrons absorb specific wavelengths and get promoted from a lower energy d-orbital to a higher energy d-orbital (d-d transition). The transmitted light exhibits the complementary color."
    )

    add(ch, "Colorlessness of Sc(III) and Ti(IV) Ions",
        "Why are aqueous solutions of $Sc^{3+}$ and $Ti^{4+}$ completely colorless?",
        [
            "They possess a $3d^0$ configuration with no d-electrons available to undergo d-d transitions",
            "They possess completely filled $3d^{10}$ subshells blocking visible light absorption",
            "They absorb light across the entire visible spectrum uniformly",
            "They undergo photochemical reduction to metallic mirrors in water"
        ],
        "A",
        "$Sc^{3+}$ ($Z = 21$) and $Ti^{4+}$ ($Z = 22$) have the noble gas electronic configuration $[\\text{Ar}]\\,3d^0$. Because their 3d subshell is completely vacant, no d-d transitions are possible, rendering their aqueous ions colorless."
    )

    add(ch, "Colorlessness of Zn(II) and Cu(I) Ions",
        "Why are aqueous solutions of $Zn^{2+}$ and $Cu^+$ salts typically colorless?",
        [
            "They have completely filled $3d^{10}$ configurations leaving no vacant d-orbital for d-d electron promotion",
            "Their d-orbitals do not split in the presence of ligands",
            "They have a single unpaired electron that cannot absorb visible light",
            "Their hydration enthalpies are zero"
        ],
        "A",
        "Both $Zn^{2+}$ and $Cu^+$ possess the completely filled $[\\text{Ar}]\\,3d^{10}$ configuration. Because all 3d orbitals are fully occupied, there is no vacant d-orbital into which an electron can be promoted during a d-d transition. Hence, they are colorless."
    )

    add(ch, "Intense Color of Permanganate and Dichromate",
        "Both $KMnO_4$ (intense purple) and $K_2Cr_2O_7$ (bright orange) contain metal centers with $d^0$ electronic configurations ($Mn^{7+}$ and $Cr^{6+}$). What is the origin of their deep color?",
        [
            "Ligand-to-Metal Charge Transfer (LMCT) from oxide ligands ($O^{2-}$) to vacant metal d-orbitals",
            "Forbidden d-d transitions between split d-orbitals",
            "Polarization of potassium cations ($K^+$)",
            "Continuous emission of bremsstrahlung radiation"
        ],
        "A",
        "In $MnO_4^-$ and $Cr_2O_7^{2-}$, the metal ions have $d^0$ configurations, so d-d transitions are impossible. The intense color is caused by Ligand-to-Metal Charge Transfer (LMCT), in which absorption of visible light temporarily transfers an electron from the filled 2p orbitals of the oxide ligands ($O^{2-}$) to the vacant 3d orbitals of the central metal ion."
    )

    add(ch, "Complementary Color in Hydrated Cu(II) Complexes",
        "An aqueous solution of copper sulphate containing $[Cu(H_2O)_6]^{2+}$ appears bright blue. This perceived color indicates that the complex primarily absorbs:",
        [
            "Red-orange light from the visible spectrum",
            "Blue-violet light from the visible spectrum",
            "Green-yellow light from the visible spectrum",
            "Ultraviolet and infrared radiation exclusively"
        ],
        "A",
        "When a complex absorbs a particular color from visible light, it transmits the complementary color. $[Cu(H_2O)_6]^{2+}$ absorbs light in the red-orange region (wavelength $\\approx 600-650\\text{ nm}$); consequently, the transmitted complementary light is blue."
    )

    add(ch, "Color Comparison of Hydrated Iron Ions",
        "What are the characteristic colors of hydrated ferrous ($[Fe(H_2O)_6]^{2+}$) and ferric ($[Fe(H_2O)_6]^{3+}$) ions in dilute aqueous solutions?",
        [
            "$[Fe(H_2O)_6]^{2+}$ is pale green, while $[Fe(H_2O)_6]^{3+}$ is pale yellow",
            "$[Fe(H_2O)_6]^{2+}$ is dark blue, while $[Fe(H_2O)_6]^{3+}$ is bright pink",
            "$[Fe(H_2O)_6]^{2+}$ is deep purple, while $[Fe(H_2O)_6]^{3+}$ is emerald green",
            "$[Fe(H_2O)_6]^{2+}$ is colorless, while $[Fe(H_2O)_6]^{3+}$ is orange"
        ],
        "A",
        "In dilute aqueous solution, hydrated ferrous ion $[Fe(H_2O)_6]^{2+}$ ($3d^6$) exhibits a characteristic pale green color, whereas hydrated ferric ion $[Fe(H_2O)_6]^{3+}$ ($3d^5$) appears pale yellow to yellow-brown due to charge transfer and d-d transitions."
    )

    # 37-42: Catalytic Properties, Interstitial Compounds & Alloys
    add(ch, "Catalytic Properties of Transition Metals",
        "Transition metals and their compounds are extensively utilized as industrial catalysts. Which properties are fundamentally responsible for their catalytic activity?",
        [
            "Ability to adopt multiple oxidation states, form intermediate complexes, and provide large surface areas for reactant adsorption",
            "High electrical resistance and large ionic radii",
            "Ability to emit alpha particles during chemical collisions",
            "Complete insolubility in all polar and nonpolar solvents"
        ],
        "A",
        "Transition metals act as catalysts because: (1) their variable oxidation states allow them to form unstable reaction intermediates that lower the activation energy, and (2) finely divided transition metals provide a large surface area with free valencies for chemisorption of reactant molecules."
    )

    add(ch, "Industrial Catalysts of Transition Metals",
        "Which of the following correctly matches the industrial process with its transition metal catalyst?",
        [
            "Contact process for $H_2SO_4$ : $V_2O_5$; Haber process for $NH_3$ : Finely divided $Fe$",
            "Ostwald process for $HNO_3$ : $Ni$; Hydrogenation of oils : $V_2O_5$",
            "Wacker process : $Fe$; Haber process : $Pt/Rh$",
            "Contact process : $TiCl_4$; Polymerization of ethene : Finely divided $Fe$"
        ],
        "A",
        "In the Contact process, vanadium pentoxide ($V_2O_5$) catalyzes the oxidation of $SO_2$ to $SO_3$. In the Haber process, finely divided iron ($Fe$) with molybdenum promoter catalyzes the synthesis of ammonia ($N_2 + 3H_2 \\to 2NH_3$)."
    )

    add(ch, "Nature of Interstitial Compounds",
        "What are interstitial compounds formed by transition metals?",
        [
            "Non-stoichiometric compounds formed when small non-metal atoms like H, C, or N are trapped inside the interstitial voids of the metal lattice",
            "Stoichiometric ionic salts formed by electron transfer from transition metals to halogens",
            "Homogeneous solid-solution alloys formed between two metals of identical radii",
            "Coordination polymers formed by polydentate chelating ligands"
        ],
        "A",
        "Interstitial compounds are formed when small atoms like hydrogen, carbon, or nitrogen occupy the interstitial voids in the close-packed crystal lattice of transition metals (e.g., $TiC, Fe_3H, Mn_4N$). They are typically non-stoichiometric and neither typically ionic nor covalent."
    )

    add(ch, "Properties of Interstitial Compounds",
        "Which of the following is a characteristic physical and chemical property of transition metal interstitial compounds?",
        [
            "They are extremely hard, have melting points higher than pure metals, retain metallic conductivity, and are chemically inert",
            "They are soft, malleable, and have melting points lower than the parent metals",
            "They are electrical insulators and dissolve instantly in cold water",
            "They are highly reactive reducing agents that decompose in air"
        ],
        "A",
        "Characteristics of interstitial compounds according to NCERT: (1) They have very high melting points, higher than those of pure metals, (2) They are extremely hard (some borides approach diamond in hardness), (3) They retain metallic electrical conductivity, and (4) They are chemically inert."
    )

    add(ch, "Alloy Formation by Transition Metals",
        "Transition metals readily form alloys with one another. What atomic feature allows transition metals to form homogeneous solid solution alloys?",
        [
            "Similar atomic radii (differing by less than 15%) allowing atoms of one metal to easily substitute for atoms of another in the crystal lattice",
            "Large differences in electronegativity exceeding 2.0 units",
            "Identical standard reduction potentials of all transition metals",
            "Ability of transition metals to form gaseous diatomic molecules"
        ],
        "A",
        "Because of similar atomic sizes (radii within $\\approx 15\\%$ of each other, following Hume-Rothery rules), atoms of one transition metal can readily replace atoms of another metal in the crystal lattice to form homogeneous solid solutions called alloys."
    )

    add(ch, "Composition of Common Transition Metal Alloys",
        "What is the primary elemental composition of Brass and Bronze, respectively?",
        [
            "Brass: Copper and Zinc ($Cu + Zn$); Bronze: Copper and Tin ($Cu + Sn$)",
            "Brass: Copper and Tin ($Cu + Sn$); Bronze: Copper and Zinc ($Cu + Zn$)",
            "Brass: Iron and Chromium ($Fe + Cr$); Bronze: Nickel and Copper ($Ni + Cu$)",
            "Brass: Lead and Tin ($Pb + Sn$); Bronze: Iron and Carbon ($Fe + C$)"
        ],
        "A",
        "Brass is an alloy consisting primarily of copper and zinc ($Cu + Zn$). Bronze is an alloy consisting primarily of copper and tin ($Cu + Sn$)."
    )

    # 43-48: Potassium Dichromate (K2Cr2O7)
    add(ch, "Preparation of Sodium Chromate from Chromite Ore",
        "In the commercial manufacture of potassium dichromate, chromite ore ($FeCr_2O_4$) is fused with sodium carbonate in the presence of air. What is the balanced equation for this roasting reaction?",
        [
            "$4FeCr_2O_4 + 8Na_2CO_3 + 7O_2 \\to 8Na_2CrO_4 + 2Fe_2O_3 + 8CO_2$",
            "$2FeCr_2O_4 + 4Na_2CO_3 + 3O_2 \\to 4Na_2CrO_4 + 2FeO + 4CO_2$",
            "$FeCr_2O_4 + 2Na_2CO_3 + O_2 \\to Na_2CrO_4 + FeCO_3 + CO_2$",
            "$4FeCr_2O_4 + 4Na_2CO_3 + 5O_2 \\to 4Na_2Cr_2O_7 + 2Fe_2O_3 + 4CO_2$"
        ],
        "A",
        "Chromite ore is fused with sodium carbonate in excess air: $4FeCr_2O_4 + 8Na_2CO_3 + 7O_2 \\to 8Na_2CrO_4 + 2Fe_2O_3 + 8CO_2$. The yellow mass contains sodium chromate ($Na_2CrO_4$)."
    )

    add(ch, "Conversion of Chromate to Dichromate",
        "Why is sodium dichromate ($Na_2Cr_2O_7$) treated with potassium chloride ($KCl$) rather than being used directly as a primary analytical standard?",
        [
            "$Na_2Cr_2O_7$ is hygroscopic and deliquescent, whereas $K_2Cr_2O_7$ is non-hygroscopic and less soluble, crystallizing out cleanly",
            "$Na_2Cr_2O_7$ is completely insoluble in water",
            "Potassium dichromate is a gas at room temperature",
            "$Na_2Cr_2O_7$ cannot oxidize ferrous ions in acidic medium"
        ],
        "A",
        "Sodium dichromate ($Na_2Cr_2O_7$) is hygroscopic (absorbs atmospheric moisture) and deliquescent, making accurate weighing impossible for standard solutions. Potassium dichromate ($K_2Cr_2O_7$) is non-hygroscopic and significantly less soluble in cold water, allowing it to be easily crystallized, purified, and used as a primary standard."
    )

    add(ch, "Chromate-Dichromate Equilibrium vs pH",
        "In aqueous solution, chromate ions ($CrO_4^{2-}$) and dichromate ions ($Cr_2O_7^{2-}$) exist in pH-dependent chemical equilibrium. Which statement correctly describes this equilibrium?",
        [
            "Yellow $CrO_4^{2-}$ changes to orange $Cr_2O_7^{2-}$ upon adding acid ($pH < 7$), and the oxidation state of Cr is $+6$ in both species",
            "Orange $Cr_2O_7^{2-}$ changes to yellow $CrO_4^{2-}$ upon acidification, reducing Cr from $+6$ to $+3$",
            "Acidification reduces chromate to chromium metal",
            "Increasing pH stabilizes orange $Cr_2O_7^{2-}$ while decreasing pH produces yellow $CrO_4^{2-}$"
        ],
        "A",
        "The equilibrium is: $2CrO_4^{2-} (\\text{yellow}) + 2H^+ \\rightleftharpoons Cr_2O_7^{2-} (\\text{orange}) + H_2O$. In acidic medium ($pH < 7$), $H^+$ shifts the equilibrium to form orange dichromate ($Cr_2O_7^{2-}$). In basic medium ($pH > 7$), $OH^-$ removes $H^+$ and forms yellow chromate ($CrO_4^{2-}$). In both ions, Chromium maintains the $+6$ oxidation state."
    )

    add(ch, "Structure of Dichromate Ion",
        "Which statement accurately describes the geometric structure and bonding of the dichromate ion ($Cr_2O_7^{2-}$)?",
        [
            "Two tetrahedral $CrO_4$ units sharing one corner oxygen atom with a $Cr-O-Cr$ bond angle of $126^\\circ$",
            "A planar molecule with alternating single and double bonds",
            "An octahedral complex with six bridging oxygen ligands",
            "Two square planar units connected by a peroxide linkage"
        ],
        "A",
        "The dichromate ion consists of two tetrahedral $CrO_4$ units sharing a common oxygen apex. The bridging $Cr-O-Cr$ bond angle is $126^\\circ$. The six terminal $Cr-O$ bond lengths ($163\\text{ pm}$) are identical due to resonance, while the two bridging $Cr-O$ bonds are longer ($179\\text{ pm}$)."
    )

    add(ch, "Equivalent Weight of Acidified Potassium Dichromate",
        "What is the equivalent weight of potassium dichromate ($K_2Cr_2O_7$, molar mass $M$) when functioning as an oxidizing agent in an acidic medium?",
        [
            "$M / 6$",
            "$M / 3$",
            "$M / 5$",
            "$M / 1$"
        ],
        "A",
        "In acidic medium, the reduction half-reaction is: $Cr_2O_7^{2-} + 14H^+ + 6e^- \\to 2Cr^{3+} + 7H_2O$. Since $1\\text{ mole}$ of $Cr_2O_7^{2-}$ accepts $6\\text{ moles}$ of electrons ($n\\text{-factor} = 6$), the equivalent weight $= \\frac{\\text{Molar Mass}}{n\\text{-factor}} = \\frac{M}{6}$."
    )

    add(ch, "Acidic Dichromate Oxidation of Iodide and Ferrous",
        "What products are obtained when acidified potassium dichromate solution reacts with potassium iodide ($I^-$) and ferrous sulphate ($Fe^{2+}$), respectively?",
        [
            "Iodine ($I_2$) and ferric ion ($Fe^{3+}$)",
            "Iodate ($IO_3^-$) and metallic iron ($Fe$)",
            "Periodate ($IO_4^-$) and iron oxide ($Fe_2O_3$)",
            "Hydrogen iodide ($HI$) and ferrite ion ($FeO_2^-$)"
        ],
        "A",
        "Acidified $K_2Cr_2O_7$ is a powerful oxidant. It oxidizes iodide to iodine ($Cr_2O_7^{2-} + 14H^+ + 6I^- \\to 2Cr^{3+} + 3I_2 + 7H_2O$) and ferrous to ferric ($Cr_2O_7^{2-} + 14H^+ + 6Fe^{2+} \\to 2Cr^{3+} + 6Fe^{3+} + 7H_2O$)."
    )

    # 49-55: Potassium Permanganate (KMnO4)
    add(ch, "Preparation of Potassium Manganate from Pyrolusite",
        "In the industrial synthesis of potassium permanganate, pyrolusite ore ($MnO_2$) is fused with potassium hydroxide ($KOH$) in the presence of atmospheric oxygen. What is the formula and color of the resulting manganate compound?",
        [
            "$K_2MnO_4$, dark green",
            "$KMnO_4$, purple",
            "$Mn_2O_7$, dark green oil",
            "$K_3MnO_4$, bright blue"
        ],
        "A",
        "Fusion of $MnO_2$ with $KOH$ in air or with oxidizing agents ($KNO_3, KClO_3$) produces dark green potassium manganate: $2MnO_2 + 4KOH + O_2 \\to 2K_2MnO_4 + 2H_2O$. The oxidation state of Mn in $K_2MnO_4$ is $+6$."
    )

    add(ch, "Disproportionation of Manganate to Permanganate",
        "Potassium manganate ($K_2MnO_4$) is converted to potassium permanganate ($KMnO_4$) by disproportionation in acidic or neutral medium. What are the products of this reaction?",
        [
            "$MnO_4^-$ (purple) and $MnO_2$ (brown precipitate)",
            "$MnO_4^-$ and $Mn^{2+}$ cations exclusively",
            "$Mn_2O_7$ and hydrogen gas",
            "$MnO$ and ozone gas"
        ],
        "A",
        "In acidic or neutral aqueous solution, green manganate ion ($MnO_4^{2-}$, $+6$) disproportionates spontaneously into permanganate ($MnO_4^-$, $+7$) and manganese dioxide ($MnO_2$, $+4$): $3MnO_4^{2-} + 4H^+ \\to 2MnO_4^- + MnO_2 + 2H_2O$."
    )

    add(ch, "Comparison of Manganate and Permanganate Ions",
        "Which statement correctly compares the structure, oxidation state, and magnetic properties of manganate ($MnO_4^{2-}$) and permanganate ($MnO_4^-$) ions?",
        [
            "Both are tetrahedral; $MnO_4^{2-}$ has $Mn(VI)$ and is paramagnetic ($3d^1$), while $MnO_4^-$ has $Mn(VII)$ and is diamagnetic ($3d^0$)",
            "Both are planar; $MnO_4^{2-}$ is diamagnetic and $MnO_4^-$ is paramagnetic",
            "$MnO_4^{2-}$ is tetrahedral and diamagnetic; $MnO_4^-$ is octahedral and paramagnetic",
            "$MnO_4^{2-}$ is green and diamagnetic; $MnO_4^-$ is purple and paramagnetic"
        ],
        "A",
        "Both manganate ($MnO_4^{2-}$) and permanganate ($MnO_4^-$) possess tetrahedral geometries with $p\\pi-d\\pi$ bonding. In $MnO_4^{2-}$, manganese is in the $+6$ state ($3d^1$) with one unpaired electron, making it green and paramagnetic. In $MnO_4^-$, manganese is in the $+7$ state ($3d^0$) with no unpaired electrons, making it diamagnetic (weak temperature-independent paramagnetism) and purple."
    )

    add(ch, "Equivalent Weight of KMnO4 in Acidic Medium",
        "What is the change in oxidation number of manganese and the equivalent weight of $KMnO_4$ (molar mass $M$) in acidic medium?",
        [
            "Oxidation number changes from $+7$ to $+2$; equivalent weight is $M / 5$",
            "Oxidation number changes from $+7$ to $+4$; equivalent weight is $M / 3$",
            "Oxidation number changes from $+7$ to $+6$; equivalent weight is $M / 1$",
            "Oxidation number changes from $+7$ to $0$; equivalent weight is $M / 7$"
        ],
        "A",
        "In acidic medium, the reduction half-reaction is: $MnO_4^- + 8H^+ + 5e^- \\to Mn^{2+} + 4H_2O$. The oxidation number of Mn decreases from $+7$ to $+2$ (gain of 5 electrons, $n\\text{-factor} = 5$). Hence, the equivalent weight of $KMnO_4 = M / 5$."
    )

    add(ch, "Acidic KMnO4 Oxidation of Oxalate and Nitrite",
        "What are the oxidation products when acidified $KMnO_4$ reacts with oxalic acid ($H_2C_2O_4$) and potassium nitrite ($KNO_2$), respectively?",
        [
            "Carbon dioxide ($CO_2$) and nitrate ($NO_3^-$)",
            "Carbon monoxide ($CO$) and nitrogen gas ($N_2$)",
            "Carbonic acid ($H_2CO_3$) and nitric oxide ($NO$)",
            "Formic acid ($HCOOH$) and nitrous oxide ($N_2O$)"
        ],
        "A",
        "In acidic medium, acidified permanganate oxidizes oxalate to carbon dioxide ($2MnO_4^- + 16H^+ + 5C_2O_4^{2-} \\to 2Mn^{2+} + 10CO_2 + 8H_2O$) and nitrite to nitrate ($2MnO_4^- + 6H^+ + 5NO_2^- \\to 2Mn^{2+} + 5NO_3^- + 3H_2O$)."
    )

    add(ch, "Oxidation by KMnO4 in Faintly Alkaline Medium",
        "In neutral or faintly alkaline (aqueous $KMnO_4$) solution, what is the reduction product of permanganate and into what species is iodide ($I^-$) oxidized?",
        [
            "Permanganate is reduced to $MnO_2$; iodide is oxidized to iodate ($IO_3^-$)",
            "Permanganate is reduced to $Mn^{2+}$; iodide is oxidized to iodine ($I_2$)",
            "Permanganate is reduced to $Mn(OH)_2$; iodide is oxidized to periodate ($IO_4^-$)",
            "Permanganate is reduced to $K_2MnO_4$; iodide is oxidized to hypoiodite ($IO^-$)"
        ],
        "A",
        "In neutral or faintly alkaline solution, permanganate acts as an oxidant by accepting 3 electrons to form manganese dioxide ($MnO_2$): $2MnO_4^- + H_2O + I^- \\to 2MnO_2 + 2OH^- + IO_3^-$. Iodide ($I^-$) is quantitatively oxidized to iodate ($IO_3^-$)."
    )

    add(ch, "KMnO4 Reduction in Strongly Alkaline Medium",
        "In a strongly alkaline medium, potassium permanganate acts as an oxidant by undergoing which reduction half-reaction?",
        [
            "$MnO_4^- + e^- \\to MnO_4^{2-}$ (reduction to manganate, $n\\text{-factor} = 1$)",
            "$MnO_4^- + 3e^- + 2H_2O \\to MnO_2 + 4OH^-$",
            "$MnO_4^- + 5e^- + 8H^+ \\to Mn^{2+} + 4H_2O$",
            "$MnO_4^- + 7e^- \\to Mn + 4O^{2-}$"
        ],
        "A",
        "In strongly alkaline medium, purple permanganate ion is reduced to green manganate ion by gaining 1 electron: $MnO_4^- + e^- \\to MnO_4^{2-}$. Here the $n$-factor is 1, and the equivalent weight of $KMnO_4$ is equal to its molar mass $M$."
    )

    # 56-60: The Lanthanoids (4f-block)
    add(ch, "General Electronic Configuration and Common Oxidation State of Lanthanoids",
        "What is the general valence shell electronic configuration and the most common, stable oxidation state exhibited by the lanthanoids?",
        [
            "$[\\text{Xe}]\\,4f^{1-14}\\,5d^{0-1}\\,6s^2$ ; common oxidation state $+3$",
            "$[\\text{Xe}]\\,4f^{1-14}\\,5d^{2}\\,6s^2$ ; common oxidation state $+2$",
            "$[\\text{Rn}]\\,5f^{1-14}\\,6d^{0-1}\\,7s^2$ ; common oxidation state $+4$",
            "$[\\text{Xe}]\\,4f^{0-14}\\,5d^{1-10}\\,6s^1$ ; common oxidation state $+1$"
        ],
        "A",
        "The lanthanoids have the general electronic configuration $[\\text{Xe}]\\,4f^{1-14}\\,5d^{0-1}\\,6s^2$. Across the entire series, the $+3$ oxidation state is the predominant and most thermodynamically stable oxidation state."
    )

    add(ch, "Cerium(IV) as an Analytical Oxidizing Agent",
        "Cerium exhibits a stable $+4$ oxidation state ($Ce^{4+}$). Why is $Ce^{4+}$ widely used as a volumetric oxidizing agent in analytical chemistry?",
        [
            "$Ce^{4+}$ has the stable noble gas configuration $[\\text{Xe}]$, but has a strong thermodynamic tendency to revert to the preferred $+3$ state ($Ce^{3+}$)",
            "$Ce^{4+}$ is an insoluble gas that precipitates non-metals",
            "$Ce^{4+}$ has 7 unpaired 4f electrons that induce radical cleavage",
            "$Ce^{4+}$ decomposes water into elemental hydrogen"
        ],
        "A",
        "Cerium ($Z = 58$) in the $+4$ oxidation state has the electronic configuration of xenon ($[\\text{Xe}]\\,4f^0$). Although $Ce^{4+}$ is kinetically stable due to this noble gas core, the $+3$ oxidation state is thermodynamically much more stable for lanthanoids ($E^\\circ(Ce^{4+}/Ce^{3+}) = +1.74\\text{ V}$). Therefore, $Ce^{4+}$ acts as a powerful oxidizing agent in aqueous solution."
    )

    add(ch, "Europium(II) as a Strong Reducing Agent",
        "Why does Europium readily exhibit the divalent state ($Eu^{2+}$), and what is its chemical redox behavior?",
        [
            "$Eu^{2+}$ attains the stable half-filled $[\\text{Xe}]\\,4f^7$ configuration, and acts as a strong reducing agent reverting to $Eu^{3+}$",
            "$Eu^{2+}$ attains a completely filled $[\\text{Xe}]\\,4f^{14}$ configuration and acts as a strong oxidant",
            "$Eu^{2+}$ is an inert gas that cannot undergo redox reactions",
            "$Eu^{2+}$ precipitates as a covalent organometallic polymer"
        ],
        "A",
        "Europium ($Z = 63$) has ground state configuration $[\\text{Xe}]\\,4f^7\\,6s^2$. Loss of two $6s$ electrons gives $Eu^{2+}$ with the extra-stable half-filled $4f^7$ configuration. However, because $+3$ is the dominant oxidation state of lanthanoids, $Eu^{2+}$ readily loses an electron to form $Eu^{3+}$, making $Eu^{2+}$ a strong reducing agent ($E^\\circ(Eu^{3+}/Eu^{2+}) = -0.43\\text{ V}$)."
    )

    add(ch, "Basicity Order of Lanthanoid Hydroxides",
        "How does the basic strength of lanthanoid hydroxides vary from Lanthanum hydroxide ($La(OH)_3$) to Lutetium hydroxide ($Lu(OH)_3$)?",
        [
            "Basicity decreases continuously from $La(OH)_3$ (most basic) to $Lu(OH)_3$ (least basic)",
            "Basicity increases continuously from $La(OH)_3$ to $Lu(OH)_3$",
            "Basicity remains completely constant across the entire series",
            "Basicity reaches a sharp maximum at Gadolinium hydroxide ($Gd(OH)_3$)"
        ],
        "A",
        "Due to the Lanthanoid Contraction, the size of $M^{3+}$ ions decreases progressively from $La^{3+}$ ($103\\text{ pm}$) to $Lu^{3+}$ ($86\\text{ pm}$). According to Fajan's rules, smaller cation size leads to higher polarizability and increased covalent character in the $M-OH$ bond. Consequently, the cleavage of the $M-OH$ bond to release $OH^-$ becomes more difficult, making $La(OH)_3$ the most basic and $Lu(OH)_3$ the least basic."
    )

    add(ch, "Mischmetall Composition and Applications",
        "What is Mischmetall, and what is its primary commercial application?",
        [
            "An alloy consisting of $\\approx 95\\%$ lanthanoid metals (mainly Ce and La), $\\approx 5\\%$ iron, and traces of S, C, Ca, used in lighter flints and bullet shells",
            "A pure amorphous form of radioactive actinoids used in nuclear reactors",
            "A stoichiometric intermetallic compound of titanium and nickel used as shape memory wire",
            "A binary mixture of zinc and copper used for marine galvanic protection"
        ],
        "A",
        "Mischmetall is a well-known pyrophoric alloy containing about $95\\%$ lanthanoids (typically $\\approx 50\\%$ Cerium, $\\approx 25\\%$ Lanthanum, $\\approx 15\\%$ Neodymium, and other lanthanoids) and $\\approx 5\\%$ Iron, along with traces of S, C, Ca, and Al. Because it sparks when struck, it is widely used in lighter flints and tracer bullets."
    )

    # 61-65: The Actinoids (5f-block) & Comparison with Lanthanoids
    add(ch, "Electronic Configuration and Spatial Extent of 5f vs 4f Orbitals",
        "How do 5f orbitals in actinoids differ fundamentally from 4f orbitals in lanthanoids in terms of spatial distribution and bonding participation?",
        [
            "$5f$ orbitals have greater spatial extent, are less deeply buried, and participate more effectively in chemical bonding than $4f$ orbitals",
            "$5f$ orbitals are more deeply buried inside the core and cannot participate in bonding",
            "$5f$ orbitals have lower energy than $4f$ orbitals and hold a maximum of 10 electrons",
            "$5f$ orbitals have spherical symmetry identical to s-orbitals"
        ],
        "A",
        "The $5f$ electrons in actinoids are less shielded and extend further into space than the $4f$ electrons in lanthanoids. Because $5f$ orbitals are not as deeply buried, they can participate directly in chemical bonding with surrounding ligands to a much greater degree than $4f$ orbitals."
    )

    add(ch, "Wider Range of Oxidation States in Actinoids",
        "Why do actinoids exhibit a much broader spectrum of oxidation states (up to $+7$ in Np and Pu) than lanthanoids?",
        [
            "The energy levels of $5f, 6d,$ and $7s$ subshells are comparable, allowing electrons from all three subshells to participate in bonding",
            "Actinoids have much smaller atomic sizes than lanthanoids",
            "Actinoids have completely filled inner d-subshells preventing electron loss",
            "Electronegativities of actinoids are higher than halogens"
        ],
        "A",
        "In actinoids, the energy difference between the $5f, 6d,$ and $7s$ orbitals is extremely small. As a result, electrons from all these orbitals can participate in chemical bond formation, giving rise to a wide variety of oxidation states (e.g., U shows $+3, +4, +5, +6$; Np and Pu show up to $+7$). In contrast, in lanthanoids, the energy gap between $4f$ and $5d$ is relatively large."
    )

    add(ch, "Comparison of Actinoid Contraction and Lanthanoid Contraction",
        "Why is the actinoid contraction from element to element greater than the lanthanoid contraction?",
        [
            "$5f$ orbitals have poorer shielding effect than $4f$ orbitals against increasing nuclear charge",
            "$5f$ orbitals have greater shielding capability than $4f$ orbitals",
            "Actinoids have lower nuclear charge than lanthanoids",
            "The $7s$ electrons completely shield the $5f$ electrons from the nucleus"
        ],
        "A",
        "Because $5f$ orbitals are more diffused and extended than $4f$ orbitals, $5f$ electrons provide even poorer shielding against the increasing nuclear charge than $4f$ electrons. Consequently, the contraction in ionic radii from element to element is greater across the actinoid series."
    )

    add(ch, "Radioactive Nature and Transuranic Elements",
        "Which statement accurately describes the occurrence, radioactivity, and transuranic classification of the actinoids?",
        [
            "All actinoids are radioactive; elements beyond uranium ($Z > 92$) do not occur in significant amounts in nature and are synthetic transuranic elements",
            "Only elements beyond uranium are radioactive; thorium and uranium are stable non-radioactive isotopes",
            "All actinoids are non-radioactive except for actinium",
            "Transuranic elements are exclusively found in group 12 of the periodic table"
        ],
        "A",
        "All actinoid elements are radioactive. The earlier members (Thorium, Protactinium, Uranium) have long half-lives and occur naturally, while all elements beyond Uranium ($Z > 92$, from Neptunium onwards) have short half-lives, are prepared artificially via nuclear reactions, and are termed transuranic (or transuranium) elements."
    )

    add(ch, "Chemical Reactivity and Complexing Tendency of Actinoids",
        "How does the chemical reactivity and ability to form coordination complexes of actinoids compare with that of lanthanoids?",
        [
            "Actinoids are more chemically reactive and have a greater tendency to form coordination complexes due to higher charge density and accessible 5f orbitals",
            "Actinoids are chemically inert noble metals that never form coordination complexes",
            "Lanthanoids form complexes more readily than actinoids because $4f$ orbitals are larger than $5f$",
            "Actinoids only form complexes with alkali metal cations"
        ],
        "A",
        "Actinoids are more reactive metals than lanthanoids (e.g., they react readily with boiling water or dilute acids). Furthermore, because actinoid cations often have higher oxidation states ($+4, +5, +6$) leading to higher charge density, and because their $5f$ orbitals extend further to overlap with ligand orbitals, actinoids have a much stronger tendency to form coordination complexes than lanthanoids."
    )

    return qs
