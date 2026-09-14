from scripts.chem_generators.common import make_question, normalize_text

def get_alcohols_questions(seen):
    qs = []
    
    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in alcohols: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "Alcohols, Phenols and Ethers"

    # 1-4: Structure and Hybridization of Functional Groups
    add(ch, "Bond Angle in Alcohols",
        "In methanol ($CH_3OH$), the $C-O-H$ bond angle is $108.9^\\circ$, which is slightly less than the tetrahedral angle of $109.5^\\circ$. What is the reason for this slight compression?",
        [
            "Repulsion between the two unshared electron pairs (lone pairs) on the oxygen atom compresses the bonding pairs",
            "Strong intermolecular hydrogen bonding in the liquid state pulls the hydrogen closer to carbon",
            "The methyl group exerts a powerful electron-withdrawing inductive effect that contracts the bond angle",
            "The oxygen atom is $sp^2$ hybridized, enforcing a smaller bond angle"
        ],
        "A",
        "In alcohols, the oxygen atom is $sp^3$ hybridized and surrounded by two bonding pairs and two non-bonding lone pairs. In accordance with VSEPR theory, lone pair-lone pair repulsion is greater than lone pair-bond pair and bond pair-bond pair repulsions. This repulsion slightly compresses the $C-O-H$ angle to $108.9^\\circ$, just below the ideal tetrahedral angle of $109.5^\\circ$."
    )

    add(ch, "Carbon-Oxygen Bond Length in Phenol vs Methanol",
        "In phenol, the carbon-oxygen ($C-O$) bond length ($136\\text{ pm}$) is noticeably shorter than the $C-O$ bond length in methanol ($142\\text{ pm}$). What accounts for this shortening?",
        [
            "Conjugation of the unshared electron pair of oxygen with the aromatic ring imparts partial double-bond character, and oxygen is bonded to an $sp^2$ carbon",
            "Phenol molecules undergo rapid ring opening that contracts the covalent radius of oxygen",
            "The hydroxyl hydrogen in phenol forms an intramolecular covalent bond with the ortho carbon",
            "The aromatic ring donates electrons via hyperconjugation directly to the hydrogen atom"
        ],
        "A",
        "The $C-O$ bond in phenol is shorter ($136\\text{ pm}$) than in methanol ($142\\text{ pm}$) due to two factors: (1) Delocalization of the lone pair of electrons on oxygen into the $\\pi$-cloud of the benzene ring gives the $C-O$ bond partial double-bond character. (2) The oxygen atom is attached to an $sp^2$-hybridized aromatic carbon, which has more s-character (33%) and is more electronegative than an $sp^3$ carbon (25% s-character), holding the bonding pair closer."
    )

    add(ch, "Bond Angle in Dialkyl Ethers",
        "The $C-O-C$ bond angle in methoxymethane (dimethyl ether) is $111.7^\\circ$, which is significantly greater than the tetrahedral angle ($109.5^\\circ$). What structural factor causes this enlargement?",
        [
            "Steric repulsive interactions between the two bulky alkyl (methyl) groups overcome lone-pair compression",
            "The oxygen atom is $sp$ hybridized, favoring a linear $180^\\circ$ geometry",
            "Strong dipole-dipole attraction between the two alkyl groups pulls them apart",
            "Hyperconjugation between the two methyl groups completely eliminates oxygen lone pairs"
        ],
        "A",
        "In ethers, the central oxygen atom is $sp^3$ hybridized. Although the two lone pairs on oxygen tend to compress the angle, the steric repulsion between the two relatively bulky alkyl (e.g. methyl) groups is substantial and forces the $C-O-C$ bond angle to widen to $111.7^\\circ$, which is greater than the tetrahedral angle of $109.5^\\circ$."
    )

    add(ch, "Hybridization of Oxygen in Functional Groups",
        "What is the hybridization state of the oxygen atom bearing lone pairs in alcohols, phenols, and ethers?",
        [
            "$sp^3$ hybridized in all three functional groups",
            "$sp^2$ in phenols and ethers, but $sp^3$ in alcohols",
            "$sp^3$ in alcohols and ethers, but $sp^2$ in phenols",
            "$sp$ in ethers, $sp^2$ in phenols, and $sp^3$ in alcohols"
        ],
        "A",
        "In alcohols, phenols, and ethers, the oxygen atom forms two $\\sigma$ bonds and carries two non-bonding electron lone pairs, corresponding to a steric number of 4. Thus, the oxygen atom in all three classes is approximately $sp^3$ hybridized, with small variations in geometry dictated by substituent repulsion and resonance."
    )

    # 5-14: Preparation of Alcohols
    add(ch, "Acid-Catalyzed Hydration of Alkenes",
        "In the acid-catalyzed hydration of propene with dilute sulfuric acid, what alcohol is obtained as the principal product following Markovnikov's rule?",
        [
            "Propan-2-ol (isopropyl alcohol)",
            "Propan-1-ol (n-propyl alcohol)",
            "Propane-1,2-diol",
            "Ethoxyethane"
        ],
        "A",
        "Acid-catalyzed hydration of an unsymmetrical alkene proceeds via electrophilic addition according to Markovnikov's rule: $H^+$ adds to the terminal $sp^2$ carbon ($C1$) to generate the more stable secondary carbocation ($CH_3-\\overset{+}{C}H-CH_3$). Nucleophilic attack by water followed by deprotonation yields propan-2-ol as the major product."
    )

    add(ch, "Carbocation Rearrangement in Alkene Hydration",
        "During the acid-catalyzed hydration of 3,3-dimethylbut-1-ene, the major alcohol obtained is 2,3-dimethylbutan-2-ol rather than 3,3-dimethylbutan-2-ol. Why does this occur?",
        [
            "The initially formed secondary carbocation undergoes a 1,2-methyl shift to generate a more stable tertiary carbocation",
            "The reaction proceeds via an anti-Markovnikov free radical intermediate",
            "The double bond undergoes homolytic cleavage to yield a diradical",
            "Sulfuric acid acts as a bulky base that sterically forces hydration at C3"
        ],
        "A",
        "Protonation of 3,3-dimethylbut-1-ene gives a secondary carbocation: $(CH_3)_3C-\\overset{+}{C}H-CH_3$. This carbocation undergoes a rapid 1,2-hydride/methyl shift (specifically a 1,2-methyl shift) to yield the thermodynamically more stable tertiary carbocation: $(CH_3)_2\\overset{+}{C}-CH(CH_3)_2$. Attack by water then yields 2,3-dimethylbutan-2-ol as the major product."
    )

    add(ch, "Hydroboration-Oxidation Regiochemistry",
        "When propene reacts with diborane ($B_2H_6$) followed by alkaline hydrogen peroxide ($H_2O_2/OH^-$) oxidation, what alcohol is formed as the sole major product?",
        [
            "Propan-1-ol (1-propanol)",
            "Propan-2-ol (2-propanol)",
            "Propane-1,2,3-triol",
            "2-Methylpropan-2-ol"
        ],
        "A",
        "Hydroboration-oxidation results in the net addition of water across an alkene double bond in an anti-Markovnikov sense. Boron adds preferentially to the less hindered terminal carbon atom of propene to give tripropylborane, which is subsequently oxidized and hydrolyzed by alkaline $H_2O_2$ to yield propan-1-ol in excellent yield."
    )

    add(ch, "Mechanistic Differences in Alkene Hydration",
        "Which of the following statements correctly highlights a key mechanistic difference between hydroboration-oxidation and acid-catalyzed hydration of alkenes?",
        [
            "Hydroboration-oxidation proceeds via a concerted four-membered cyclic transition state without carbocation intermediates, avoiding rearrangements",
            "Acid-catalyzed hydration proceeds with complete syn-stereospecificity without forming carbocations",
            "Hydroboration-oxidation involves homolytic cleavage of carbon-carbon $\\sigma$ bonds by peroxide radicals",
            "Acid-catalyzed hydration gives primary alcohols exclusively from all terminal alkenes"
        ],
        "A",
        "Hydroboration involves a concerted four-membered cyclic transition state in which boron and hydrogen add simultaneously (syn-addition) across the double bond. Because no free carbocation intermediate is generated, hydroboration-oxidation is free from skeletal rearrangements, unlike acid-catalyzed hydration which proceeds through carbocations and frequently rearranges."
    )

    add(ch, "Reduction of Carbonyls with Sodium Borohydride",
        "Sodium borohydride ($NaBH_4$) is a mild reducing agent commonly used in organic synthesis. Which of the following functional group conversions is selectively accomplished by $NaBH_4$?",
        [
            "Aldehydes to primary alcohols and ketones to secondary alcohols, without reducing esters or carboxylic acids",
            "Carboxylic acids to primary alcohols and esters to aldehydes",
            "Alkenes to alkanes and nitro compounds to amines",
            "Ethers to alcohols and alkyl halides to alkanes"
        ],
        "A",
        "$NaBH_4$ is a mild, selective reducing agent that delivers hydride ions ($H^-$) specifically to reactive carbonyl groups of aldehydes and ketones, converting them to primary and secondary alcohols, respectively. It is unreactive toward less electrophilic carbonyl groups such as esters, carboxylic acids, and amides."
    )

    add(ch, "Reduction of Carboxylic Acids with Lithium Aluminum Hydride",
        "Which powerful reducing agent is capable of cleanly reducing carboxylic acids directly to primary alcohols in excellent yield?",
        [
            "Lithium aluminum hydride ($LiAlH_4$) in dry ether followed by acid workup",
            "Sodium borohydride ($NaBH_4$) in aqueous ethanol",
            "Hydrogen gas over palladium on barium sulfate ($Pd/BaSO_4$)",
            "Zinc amalgam and concentrated hydrochloric acid ($Zn-Hg / HCl$)"
        ],
        "A",
        "Carboxylic acids are resistant to mild reducing agents like $NaBH_4$, but are cleanly reduced to primary alcohols by the powerful hydride donor lithium aluminum hydride ($LiAlH_4$): $R-COOH \\xrightarrow{(i) LiAlH_4 / \\text{ether}, (ii) H_2O} R-CH_2OH$. Industrially, acids are often first converted to esters and then reduced catalytically with $H_2/\\text{copper chromite}$ due to the high cost of $LiAlH_4$."
    )

    add(ch, "Grignard Reaction with Formaldehyde",
        "The reaction of a Grignard reagent ($R-MgX$) with formaldehyde ($HCHO$) followed by acid hydrolysis yields which class of alcohol?",
        [
            "Primary alcohol ($1^\\circ$ alcohol)",
            "Secondary alcohol ($2^\\circ$ alcohol)",
            "Tertiary alcohol ($3^\\circ$ alcohol)",
            "Phenolic alcohol"
        ],
        "A",
        "Nucleophilic addition of the carbanionic alkyl group ($R^{\\delta-}$ of $RMgX$) to the carbonyl carbon of formaldehyde ($HCHO$, which has two hydrogen atoms on the carbonyl) produces a primary alkoxide adduct: $R-CH_2-OMgX$. Hydrolysis gives a primary alcohol: $R-CH_2-OH + Mg(OH)X$."
    )

    add(ch, "Grignard Reaction with Ethanal",
        "When ethylmagnesium bromide ($CH_3CH_2MgBr$) reacts with ethanal ($CH_3CHO$) followed by aqueous acid workup, the resulting product is:",
        [
            "Butan-2-ol (secondary alcohol)",
            "Butan-1-ol (primary alcohol)",
            "2-Methylpropan-2-ol (tertiary alcohol)",
            "Pentan-3-ol"
        ],
        "A",
        "Grignard reagents react with aldehydes other than methanal to produce secondary alcohols. Here, the nucleophilic ethyl group (2 carbons) attacks the carbonyl carbon of ethanal (2 carbons) to form a 4-carbon alkoxide: $CH_3-CH(OMgBr)-CH_2CH_3$. Hydrolysis gives butan-2-ol ($CH_3-CH(OH)-CH_2CH_3$)."
    )

    add(ch, "Grignard Reaction with Ketones",
        "What type of alcohol is obtained when methylmagnesium iodide reacts with acetone (propan-2-one) followed by dilute acid hydrolysis?",
        [
            "2-Methylpropan-2-ol (tert-butyl alcohol, $3^\\circ$ alcohol)",
            "Butan-2-ol ($2^\\circ$ alcohol)",
            "2-Methylpropan-1-ol ($1^\\circ$ alcohol)",
            "Propan-2-ol ($2^\\circ$ alcohol)"
        ],
        "A",
        "Grignard reagents react with ketones to yield tertiary ($3^\\circ$) alcohols. The nucleophilic methyl group from $CH_3MgI$ attacks the carbonyl carbon of acetone ($(CH_3)_2C=O$), forming the adduct $(CH_3)_3C-OMgI$. Acid hydrolysis yields the tertiary alcohol 2-methylpropan-2-ol ($(CH_3)_3C-OH$)."
    )

    add(ch, "Industrial Synthesis of Methanol",
        "Methanol, historically called 'wood spirit', is produced commercially on a large scale by catalytic hydrogenation of which gaseous mixture?",
        [
            "Carbon monoxide and hydrogen gas over a $ZnO-Cr_2O_3$ catalyst at $573-673\\text{ K}$ and $200-300\\text{ atm}$",
            "Methane and steam over iron catalyst at $1000^\\circ\\text{C}$ and atmospheric pressure",
            "Carbon dioxide and water vapor under ultraviolet irradiation",
            "Ethene and oxygen over silver oxide at $300\\text{ K}$"
        ],
        "A",
        "Methanol ($CH_3OH$) was originally produced by the destructive distillation of wood. Today, it is manufactured industrially by the catalytic hydrogenation of carbon monoxide: $CO(g) + 2H_2(g) \\xrightarrow{ZnO-Cr_2O_3, 573-673\\text{ K}, 200-300\\text{ atm}} CH_3OH(l)$."
    )

    # 15-20: Preparation of Phenols & Fermentation
    add(ch, "Industrial Phenol Synthesis from Cumene",
        "In the industrial manufacture of phenol from cumene (isopropylbenzene), what valuable co-product is produced in equimolar quantity alongside phenol?",
        [
            "Acetone (propan-2-one)",
            "Acetaldehyde",
            "Benzoic acid",
            "Propene"
        ],
        "A",
        "Most of the worldwide production of phenol utilizes cumene (isopropylbenzene, prepared from benzene and propene). Cumene is oxidized by air to cumene hydroperoxide, which on treatment with dilute sulfuric acid decomposes into phenol and acetone ($CH_3COCH_3$). Acetone is an important industrial solvent obtained as a valuable co-product."
    )

    add(ch, "Phenol Synthesis from Diazonium Salts",
        "When aniline is treated with sodium nitrite and hydrochloric acid at $273-278\\text{ K}$, benzene diazonium chloride is formed. Warming this diazonium salt solution with water produces:",
        [
            "Phenol with liberation of nitrogen gas ($N_2$)",
            "Chlorobenzene with liberation of ammonia",
            "Nitrobenzene with precipitation of silver chloride",
            "Aniline hydrochloride without gas evolution"
        ],
        "A",
        "Aniline is diazotized by treatment with $NaNO_2 + HCl$ at $0-5^\\circ\\text{C}$ ($273-278\\text{ K}$) to form benzenediazonium chloride ($C_6H_5N_2^+ Cl^-$). When this diazonium salt solution is gently warmed with water or treated with dilute acids, it hydrolyzes quantitatively to phenol with the evolution of nitrogen gas: $C_6H_5N_2^+Cl^- + H_2O \\xrightarrow{\\text{warm}} C_6H_5OH + N_2\\uparrow + HCl$."
    )

    add(ch, "Dow Process Acidification Step",
        "In the industrial Dow process, chlorobenzene is converted to sodium phenoxide under drastic conditions ($623\\text{ K}, 300\\text{ atm}$). Which reagent is subsequently added to liberate free phenol?",
        [
            "Dilute hydrochloric acid ($HCl$) for acidification",
            "Sodium hydroxide solution for saponification",
            "Concentrated sulfuric acid at $450\\text{ K}$ for sulfonation",
            "Metallic zinc for reduction"
        ],
        "A",
        "In the Dow process, chlorobenzene is fused with aqueous sodium hydroxide at $623\\text{ K}$ and $300\\text{ atm}$ to form sodium phenoxide ($C_6H_5O^- Na^+$). Subsequent acidification with dilute hydrochloric acid protonates the phenoxide ion to yield free phenol: $C_6H_5ONa + HCl \\rightarrow C_6H_5OH + NaCl$."
    )

    add(ch, "Phenol Synthesis from Benzenesulfonic Acid",
        "When benzenesulfonic acid is converted to phenol, what chemical sequence is employed?",
        [
            "Neutralization with $NaOH$, fusion of sodium benzenesulfonate with molten $NaOH$ at $573\\text{ K}$, followed by acidification",
            "Direct reduction with sodium borohydride in aqueous ethanol",
            "Treatment with bromine water followed by steam distillation",
            "Heating with concentrated nitric acid at room temperature"
        ],
        "A",
        "Benzene is sulfonated with oleum to give benzenesulfonic acid ($C_6H_5SO_3H$). Neutralization gives sodium benzenesulfonate ($C_6H_5SO_3Na$), which upon fusion with molten $NaOH$ at $573\\text{ K}$ yields sodium phenoxide ($C_6H_5ONa$) and sodium sulfite ($Na_2SO_3$). Acidification with dilute acid liberates phenol."
    )

    add(ch, "Fermentation of Sugars to Ethanol",
        "During the industrial fermentation of sugarcane molasses into ethanol, which two enzymes present in yeast sequentially catalyze the conversion of sucrose to ethanol?",
        [
            "Invertase (converts sucrose to glucose + fructose) and Zymase (converts glucose/fructose to ethanol + $CO_2$)",
            "Diastase and Maltase",
            "Pepsin and Trypsin",
            "Amylase and Cellulase"
        ],
        "A",
        "In the fermentation of molasses, yeast provides two enzymes: (1) Invertase hydrolyzes sucrose into glucose and fructose: $C_{12}H_{22}O_{11} + H_2O \\xrightarrow{\\text{invertase}} C_6H_{12}O_6 + C_6H_{12}O_6$; (2) Zymase ferments glucose and fructose into ethanol and carbon dioxide: $C_6H_{12}O_6 \\xrightarrow{\\text{zymase}} 2C_2H_5OH + 2CO_2\\uparrow$."
    )

    add(ch, "Denatured Alcohol Composition",
        "Commercial ethanol is converted into 'denatured alcohol' (methylated spirit) to make it unfit for human consumption by adding small amounts of which toxic substances?",
        [
            "Methanol and pyridine (along with copper sulfate as a coloring agent)",
            "Pure glycerol and sodium bicarbonate",
            "Dilute acetic acid and sodium chloride",
            "Aqueous glucose and ethyl acetate"
        ],
        "A",
        "To prevent the misuse of duty-free industrial alcohol for beverage consumption, it is 'denatured' by making it poisonous and foul-smelling. This is achieved by mixing commercial alcohol with about 5% methanol (which causes blindness and death), a trace of pyridine (which imparts an obnoxious odor), and copper sulfate (to give it a distinct blue warning color)."
    )

    # 21-25: Physical Properties of Alcohols, Phenols and Ethers
    add(ch, "Boiling Points: Alcohols vs Ethers and Alkanes",
        "Among ethanol, methoxymethane (dimethyl ether), and propane (all having comparable molar masses of $44-46\\text{ g/mol}$), ethanol has a vastly higher boiling point ($351\\text{ K}$). What explains this difference?",
        [
            "Extensive intermolecular hydrogen bonding between polar $O-H$ groups in ethanol",
            "Ethanol has a much higher molecular weight than methoxymethane",
            "Methoxymethane exists as a covalently cross-linked solid polymer at room temperature",
            "Propane exhibits powerful dipole-dipole attractions that suppress its vapor pressure"
        ],
        "A",
        "Ethanol contains an electronegative oxygen atom bonded to a hydrogen atom, allowing molecules to associate strongly via intermolecular hydrogen bonding. Breaking these hydrogen bonds requires substantial thermal energy, giving ethanol a high boiling point ($351\\text{ K}$). In contrast, dimethyl ether and propane cannot form intermolecular hydrogen bonds and have boiling points of $249\\text{ K}$ and $231\\text{ K}$, respectively."
    )

    add(ch, "Boiling Point Trend in Isomeric Alcohols",
        "Among isomeric primary, secondary, and tertiary butyl alcohols ($C_4H_9OH$), what is the correct trend of boiling points?",
        [
            "Butan-1-ol ($1^\\circ$) > Butan-2-ol ($2^\\circ$) > 2-Methylpropan-2-ol ($3^\\circ$)",
            "2-Methylpropan-2-ol ($3^\\circ$) > Butan-2-ol ($2^\\circ$) > Butan-1-ol ($1^\\circ$)",
            "Butan-2-ol ($2^\\circ$) > Butan-1-ol ($1^\\circ$) > 2-Methylpropan-2-ol ($3^\\circ$)",
            "All three isomers boil at the exact same temperature because their hydrogen bonds are identical"
        ],
        "A",
        "For isomeric alcohols, boiling points decrease with increased branching of the carbon skeleton. Increased branching reduces the molecular surface area, giving the molecule a more compact spherical shape and decreasing van der Waals dispersion forces. Consequently: butan-1-ol ($391\\text{ K}$) > butan-2-ol ($373\\text{ K}$) > 2-methylpropan-2-ol ($356\\text{ K}$)."
    )

    add(ch, "Water Solubility of Lower Alcohols",
        "Why are the lower molecular mass alcohols (methanol, ethanol, propanol) completely miscible with water in all proportions?",
        [
            "They form robust hydrogen bonds with water molecules through their polar hydroxyl ($-OH$) groups",
            "They undergo spontaneous ionization into gaseous hydrocarbons and hydroxide ions",
            "They have non-polar alkyl chains that dissolve readily in water's non-polar pockets",
            "They form high-density covalent coordination complexes with hydronium ions"
        ],
        "A",
        "The high solubility of lower alcohols in water is due to the ability of their polar hydroxyl ($-OH$) groups to form strong hydrogen bonds with water molecules. As the size of the non-polar, hydrophobic alkyl group ($R$) increases in higher alcohols, the hydrophobic effect opposes dissolution, and water solubility decreases progressively."
    )

    add(ch, "Boiling Points of Ethers vs Isomeric Alcohols",
        "How do the boiling points of dialkyl ethers compare with those of isomeric alcohols of identical molecular formula?",
        [
            "Ethers have much lower boiling points than isomeric alcohols because ethers lack intermolecular hydrogen bonding",
            "Ethers have much higher boiling points because ether oxygen forms quadruple bonds with carbon",
            "Ethers and alcohols have identical boiling points because they share the same molecular weight",
            "Ethers boil at higher temperatures due to planar aromatic ring currents"
        ],
        "A",
        "Ethers do not contain hydrogen atoms bonded directly to oxygen, meaning they cannot form intermolecular hydrogen bonds with each other. Their intermolecular attractions are limited to weak dipole-dipole interactions. As a result, the boiling point of an ether (e.g., diethyl ether, b.p. $307.6\\text{ K}$) is drastically lower than that of its isomeric alcohol (butan-1-ol, b.p. $390\\text{ K}$)."
    )

    add(ch, "Water Solubility of Diethyl Ether",
        "Why are lower ethers such as diethyl ether moderately soluble in water ($7.5\\text{ g per } 100\\text{ g } H_2O$), despite lacking acidic $O-H$ protons?",
        [
            "The oxygen atom of ether has non-bonding electron lone pairs that accept hydrogen bonds from water molecules",
            "Ether molecules undergo spontaneous hydrolysis into ethanol at room temperature",
            "Water molecules insert into the carbon-carbon single bonds of ether",
            "The alkyl groups of ether form ionic bonds with dissolved hydronium ions"
        ],
        "A",
        "Although ether molecules cannot donate hydrogen bonds to each other, the oxygen atom in ethers possesses two lone pairs that act as hydrogen-bond acceptors, forming hydrogen bonds with the polar $O-H$ protons of water molecules ($R_2O \\cdots H-OH$). This explains the moderate water solubility of lower ethers like dimethyl ether and diethyl ether."
    )

    # 26-33: Acidity of Alcohols and Phenols
    add(ch, "Reaction of Alcohols with Active Metals",
        "When ethanol reacts with metallic sodium, effervescence of hydrogen gas is observed. What does this reaction demonstrate regarding the chemical nature of alcohols?",
        [
            "Alcohols act as Bronsted acids by donating a proton to form an alkoxide and hydrogen gas ($2ROH + 2Na \\rightarrow 2RONa + H_2\\uparrow$)",
            "Alcohols behave as Lewis acids by accepting an electron pair from sodium cations",
            "Alcohols are powerful reducing agents that oxidize sodium metal to sodium oxide",
            "The reaction demonstrates that the carbon-oxygen bond of alcohols is acidic"
        ],
        "A",
        "Alcohols react with active metals such as sodium, potassium, and aluminum to liberate hydrogen gas and form metal alkoxides: $2ROH + 2Na \\rightarrow 2RONa + H_2\\uparrow$ and $6ROH + 2Al \\rightarrow 2Al(OR)_3 + 3H_2\\uparrow$. These reactions demonstrate the acidic character of alcohols, where the alcohol functions as a Bronsted acid by donating a proton from the $O-H$ group."
    )

    add(ch, "Relative Acidity Order of Aliphatic Alcohols",
        "What is the correct decreasing order of acidic strength among the following alcohols: water, methanol, ethanol, propan-2-ol, and 2-methylpropan-2-ol?",
        [
            "Water > Methanol > Ethanol ($1^\\circ$) > Propan-2-ol ($2^\\circ$) > 2-Methylpropan-2-ol ($3^\\circ$)",
            "2-Methylpropan-2-ol ($3^\\circ$) > Propan-2-ol ($2^\\circ$) > Ethanol ($1^\\circ$) > Methanol > Water",
            "Ethanol > Propan-2-ol > 2-Methylpropan-2-ol > Water > Methanol",
            "Methanol > Water > 2-Methylpropan-2-ol > Propan-2-ol > Ethanol"
        ],
        "A",
        "The acidic character of alcohols is governed by the polarity of the $O-H$ bond and the stability of the conjugate alkoxide base ($RO^-$). Alkyl groups are electron-donating ($+I$ effect), which increases the electron density on oxygen and destabilizes the alkoxide anion. As alkyl substitution increases, acidity decreases: Water > $CH_3OH > 1^\\circ > 2^\\circ > 3^\\circ$ alcohol."
    )

    add(ch, "Alcohols are Weaker Acids than Water",
        "Why are aliphatic alcohols generally weaker acids than water?",
        [
            "The $+I$ inductive effect of the alkyl group increases electron density on oxygen, making the alkoxide ion a stronger base than hydroxide",
            "Water has a lower dielectric constant that forces complete ionization of all hydroxide bonds",
            "Alcohols cannot donate protons because their oxygen atom carries a positive formal charge",
            "Alcohols lack unshared electron pairs on the oxygen atom"
        ],
        "A",
        "In an alcohol ($R-O-H$), the electron-releasing alkyl group ($+I$ effect) concentrates negative charge on the oxygen atom and destabilizes the alkoxide ion ($RO^-$), making $RO^-$ a stronger base than the hydroxide ion ($OH^-$). In the equilibrium $RO^- + H_2O \\rightleftharpoons ROH + OH^-$, water donates a proton to the alkoxide, proving that water is a stronger acid than alcohols."
    )

    add(ch, "Enhanced Acidity of Phenol vs Alcohols",
        "Phenol ($pK_a \\approx 10$) is approximately one million times more acidic than ethanol ($pK_a \\approx 16$). What is the fundamental electronic origin of this difference?",
        [
            "The phenoxide ion is stabilized by resonance delocalization of its negative charge over the benzene ring, whereas the ethoxide ion has a localized charge",
            "Phenol has a higher molecular mass which increases its ionic dissociation constant",
            "Ethanol undergoes intramolecular hydrogen bonding that traps its proton permanently",
            "The benzene ring donates electron density to the hydroxyl group via hyperconjugation"
        ],
        "A",
        "When phenol loses a proton, it forms the phenoxide ion ($C_6H_5O^-$). In the phenoxide ion, the negative charge on oxygen is delocalized over the ortho and para positions of the aromatic ring through resonance. In contrast, in the ethoxide ion ($CH_3CH_2O^-$), the negative charge is localized entirely on oxygen and further destabilized by the $+I$ effect of the ethyl group."
    )

    add(ch, "Resonance Structures of the Phenoxide Ion",
        "In the resonance stabilization of the phenoxide anion ($C_6H_5O^-$), on which positions of the benzene ring is the negative charge delocalized?",
        [
            "Exclusively on the ortho and para positions",
            "Exclusively on the meta positions",
            "Equally on all six ring carbon atoms",
            "Exclusively on the ipso carbon bonded to oxygen"
        ],
        "A",
        "Resonance structures of the phenoxide ion show that the electron pair from the oxygen atom is delocalized into the aromatic ring, placing formal negative charges on the two ortho positions (C2, C6) and the para position (C4). The meta positions (C3, C5) do not bear any resonance-induced negative charge."
    )

    add(ch, "Substituent Effects on Phenol Acidity",
        "How does the introduction of an electron-withdrawing nitro group ($-NO_2$) onto the phenol ring influence its acidity, and why?",
        [
            "It increases acidity because the electron-withdrawing ($-I$ and $-M$) effects disperse the negative charge, stabilizing the phenoxide ion",
            "It decreases acidity because the nitro group donates electrons into the ring via resonance",
            "It has zero effect on acidity because the nitro group does not participate in hydrogen bonding",
            "It converts phenol into a neutral ester that does not ionize"
        ],
        "A",
        "Electron-withdrawing groups such as $-NO_2$ withdraw electron density from the phenoxide ring through both inductive ($-I$) and resonance ($-M$) effects. This disperses the negative charge of the conjugate base, stabilizing the phenoxide anion and facilitating proton loss, which increases the acidity of the substituted phenol."
    )

    add(ch, "Extreme Acidity of Picric Acid",
        "Picric acid (2,4,6-trinitrophenol) has a $pK_a$ of $0.38$, making it more acidic than acetic acid ($pK_a = 4.76$). What allows picric acid to react with aqueous sodium bicarbonate ($NaHCO_3$) to release $CO_2$?",
        [
            "Three strong electron-withdrawing nitro groups at the ortho and para positions tremendously stabilize the phenoxide anion by $-I$ and $-R$ effects",
            "Picric acid decomposes into nitric acid and carbon dioxide spontaneously in water",
            "Picric acid contains a carboxylic acid group that undergoes standard decarboxylation",
            "The phenolic $-OH$ group in picric acid is replaced by an inorganic nitrate group"
        ],
        "A",
        "In picric acid (2,4,6-trinitrophenol), three powerful electron-withdrawing nitro groups are located at the 2, 4, and 6 positions (both ortho and the para position). Through powerful $-I$ and $-R$ resonance effects, the negative charge of the conjugate base is strongly delocalized onto the electronegative oxygens of all three nitro groups. This makes picric acid strongly acidic ($pK_a = 0.38$), allowing it to decompose $NaHCO_3$ to release $CO_2$ gas."
    )

    add(ch, "Positional Isomerism in Nitrophenol Acidity",
        "Among the mononitrophenols, why are 4-nitrophenol ($pK_a = 7.15$) and 2-nitrophenol ($pK_a = 7.23$) more acidic than 3-nitrophenol ($pK_a = 8.35$)?",
        [
            "Resonance stabilization ($-R$ effect) of the phenoxide negative charge operates only when the $-NO_2$ group is at ortho or para positions, but not at the meta position",
            "The meta-nitro group donates electrons through hyperconjugation",
            "4-Nitrophenol forms a stable covalent dimer with water that prevents re-protonation",
            "3-Nitrophenol does not possess an aromatic ring"
        ],
        "A",
        "In the conjugate bases of 2-nitrophenol and 4-nitrophenol, the negative charge delocalized around the ring resides directly on the carbons bearing the nitro group, allowing the nitro group to extend resonance delocalization onto its oxygen atoms ($-R$ effect). In 3-nitrophenol (meta), the negative charge never falls on the carbon bearing the nitro group; hence, only the weaker inductive ($-I$) effect operates."
    )

    # 34-44: Chemical Reactions of Alcohols
    add(ch, "Fischer Esterification Mechanism and Catalyst",
        "In the acid-catalyzed Fischer esterification between ethanol and acetic acid, why is concentrated sulfuric acid ($H_2SO_4$) added to the reaction mixture?",
        [
            "It protonates the carbonyl oxygen of acetic acid to enhance electrophilicity and acts as a dehydrating agent to shift equilibrium forward",
            "It acts as a reducing agent that converts the alcohol into an ester radical",
            "It precipitates the resulting ester as an insoluble sulfate salt",
            "It oxidizes ethanol into ethanal which reacts with acetic acid"
        ],
        "A",
        "In Fischer esterification: $CH_3COOH + C_2H_5OH \\xrightleftharpoons{H^+} CH_3COOC_2H_5 + H_2O$. Concentrated $H_2SO_4$ serves two vital purposes: (1) It acts as a catalyst by protonating the carbonyl oxygen, making the carbonyl carbon much more electrophilic toward attack by alcohol. (2) It acts as a dehydrating agent, absorbing water and shifting the reversible equilibrium toward ester formation according to Le Chatelier's principle."
    )

    add(ch, "Synthesis of Aspirin from Salicylic Acid",
        "Aspirin (acetylsalicylic acid), a common analgesic and antipyretic, is synthesized in the laboratory by the acetylation of salicylic acid using which reagent?",
        [
            "Acetic anhydride in the presence of a trace of concentrated sulfuric acid or phosphoric acid",
            "Ethyl alcohol in the presence of sodium metal",
            "Chloroform and aqueous sodium hydroxide",
            "Carbon dioxide under high pressure"
        ],
        "A",
        "Aspirin (acetylsalicylic acid) is manufactured by the acetylation of the phenolic $-OH$ group of salicylic acid (2-hydroxybenzoic acid) using acetic anhydride in the presence of an acid catalyst: $C_6H_4(OH)(COOH) + (CH_3CO)_2O \\xrightarrow{H^+} C_6H_4(OCOCH_3)(COOH) + CH_3COOH$."
    )

    add(ch, "Lucas Test Distinction of Alcohols",
        "The Lucas reagent consists of a mixture of concentrated $HCl$ and anhydrous $ZnCl_2$. How is it used to distinguish between primary, secondary, and tertiary alcohols?",
        [
            "Tertiary alcohols produce immediate cloudiness/turbidity, secondary alcohols produce turbidity within 5 minutes, and primary alcohols do not produce turbidity at room temperature",
            "Primary alcohols react instantaneously with bubbling, while tertiary alcohols do not react",
            "Secondary alcohols produce a bright blue color, whereas tertiary alcohols produce a yellow precipitate",
            "All three alcohols produce turbidity at identical rates at room temperature"
        ],
        "A",
        "The Lucas test differentiates alcohols based on their reactivity with concentrated $HCl$ in the presence of anhydrous $ZnCl_2$. The reaction forms an insoluble alkyl chloride that appears as cloudiness (turbidity). Tertiary alcohols react instantaneously at room temperature. Secondary alcohols react within 5 minutes. Primary alcohols do not produce turbidity at room temperature, requiring heating."
    )

    add(ch, "Mechanistic Basis of the Lucas Test",
        "In the Lucas test, tertiary alcohols produce immediate cloudiness because the reaction proceeds via an $S_N1$ mechanism forming which stable intermediate?",
        [
            "A stable tertiary carbocation",
            "A planar carbanion",
            "A cyclic oxonium free radical",
            "A pentacoordinate transition state without intermediates"
        ],
        "A",
        "The reaction of alcohols with Lucas reagent proceeds via protonation and loss of water to form a carbocation intermediate ($S_N1$ mechanism). Because tertiary carbocations are highly stabilized by hyperconjugation and inductive effects, tertiary alcohols ionize immediately, leading to instantaneous formation of the insoluble tertiary alkyl chloride."
    )

    add(ch, "Temperature-Dependent Dehydration of Ethanol",
        "When ethanol is heated with excess concentrated sulfuric acid at $443\\text{ K}$, ethene is formed, whereas heating excess ethanol with conc. $H_2SO_4$ at $413\\text{ K}$ yields:",
        [
            "Diethyl ether (ethoxyethane) via bimolecular nucleophilic substitution ($S_N2$)",
            "Ethyl hydrogen sulfate crystals as the only stable end product",
            "Ethanoic acid via oxidation",
            "Acetylene gas with liberation of sulfur dioxide"
        ],
        "A",
        "The dehydration of ethanol with conc. $H_2SO_4$ is highly temperature-dependent: At $443\\text{ K}$ ($170^\\circ\\text{C}$), elimination ($E1$) dominates, yielding ethene: $C_2H_5OH \\xrightarrow{H_2SO_4, 443\\text{ K}} CH_2=CH_2 + H_2O$. At $413\\text{ K}$ ($140^\\circ\\text{C}$) with excess ethanol, bimolecular nucleophilic substitution ($S_N2$) occurs between protonated ethanol and a second ethanol molecule, yielding diethyl ether: $2C_2H_5OH \\xrightarrow{H_2SO_4, 413\\text{ K}} C_2H_5OC_2H_5 + H_2O$."
    )

    add(ch, "Ease of Alcohol Acid-Catalyzed Dehydration",
        "What is the correct order of ease of dehydration among primary ($1^\\circ$), secondary ($2^\\circ$), and tertiary ($3^\\circ$) alcohols in the presence of acid?",
        [
            "Tertiary ($3^\\circ$) > Secondary ($2^\\circ$) > Primary ($1^\\circ$)",
            "Primary ($1^\\circ$) > Secondary ($2^\\circ$) > Tertiary ($3^\\circ$)",
            "Secondary ($2^\\circ$) > Tertiary ($3^\\circ$) > Primary ($1^\\circ$)",
            "Primary ($1^\\circ$) > Tertiary ($3^\\circ$) > Secondary ($2^\\circ$)"
        ],
        "A",
        "Acid-catalyzed dehydration of alcohols involves protonation of the hydroxyl group followed by the loss of a water molecule to form a carbocation in the rate-determining step. The stability of carbocations follows the order $3^\\circ > 2^\\circ > 1^\\circ$. Consequently, tertiary alcohols dehydrate under very mild conditions ($20\\%\\ H_3PO_4$ at $358\\text{ K}$), secondary alcohols require $85\\%\\ H_3PO_4$ at $440\\text{ K}$, and primary alcohols require conc. $H_2SO_4$ at $443\\text{ K}$."
    )

    add(ch, "Selective Oxidation of Primary Alcohols with PCC",
        "Which reagent selectively oxidizes primary alcohols to aldehydes without causing over-oxidation to carboxylic acids?",
        [
            "Pyridinium chlorochromate (PCC) in anhydrous dichloromethane ($CH_2Cl_2$)",
            "Acidified potassium permanganate ($KMnO_4 / H_2SO_4$)",
            "Chromic acid ($H_2CrO_4$) in aqueous acetone",
            "Nitric acid ($HNO_3$) under reflux"
        ],
        "A",
        "Pyridinium chlorochromate (PCC, a complex of chromium trioxide with pyridine and $HCl$) in anhydrous dichloromethane is a mild and selective oxidizing agent. It oxidizes primary alcohols cleanly to aldehydes without oxidizing them further to carboxylic acids: $R-CH_2OH \\xrightarrow{PCC, CH_2Cl_2} R-CHO$."
    )

    add(ch, "Vigorous Oxidation of Primary Alcohols",
        "What product is obtained when ethanol is treated with acidified potassium dichromate ($K_2Cr_2O_7 / H_2SO_4$) under reflux conditions?",
        [
            "Ethanoic acid (acetic acid)",
            "Ethanal (acetaldehyde)",
            "Ethyl ethanoate",
            "Methane"
        ],
        "A",
        "Strong oxidizing agents such as acidified potassium dichromate ($K_2Cr_2O_7 / H_2SO_4$) or potassium permanganate oxidize primary alcohols completely to carboxylic acids with the same number of carbon atoms: $CH_3CH_2OH \\xrightarrow{K_2Cr_2O_7, H_2SO_4} CH_3COOH$."
    )

    add(ch, "Oxidation of Secondary Alcohols",
        "Oxidation of secondary alcohols such as propan-2-ol with chromic anhydride ($CrO_3$) yields:",
        [
            "Propan-2-one (acetone, a ketone with the same number of carbon atoms)",
            "Propanoic acid (a carboxylic acid)",
            "Ethanoic acid and carbon dioxide",
            "Propanal (an aldehyde)"
        ],
        "A",
        "Secondary alcohols are oxidized to ketones containing the same number of carbon atoms when treated with chromic anhydride ($CrO_3$) or acidified sodium/potassium dichromate: $CH_3-CH(OH)-CH_3 \\xrightarrow{CrO_3} CH_3-CO-CH_3$."
    )

    add(ch, "Resistance of Tertiary Alcohols to Oxidation",
        "Why are tertiary alcohols like 2-methylpropan-2-ol resistant to oxidation in neutral or alkaline permanganate solutions?",
        [
            "They lack an $\\alpha$-hydrogen atom on the carbon bearing the hydroxyl group",
            "Their carbon-oxygen bond is completely non-polar",
            "They form insoluble tetrahedral polymers that block the oxidant",
            "They have three hydroxyl groups that cancel oxidation potential"
        ],
        "A",
        "Oxidation of alcohols involves the cleavage of an $O-H$ bond and a $C-H$ bond on the carbon atom bearing the hydroxyl group (the $\\alpha$-carbon). Because tertiary alcohols have three alkyl groups attached to the $\\alpha$-carbon and no $\\alpha$-hydrogen ($C_\\alpha-H$), they do not undergo oxidation under normal alkaline or neutral conditions."
    )

    add(ch, "Dehydrogenation of Alcohols over Heated Copper",
        "When vapors of a tertiary alcohol such as 2-methylpropan-2-ol are passed over heated copper catalyst at $573\\text{ K}$, what reaction takes place?",
        [
            "Dehydration occurs to form an alkene (2-methylpropene) rather than dehydrogenation",
            "Dehydrogenation occurs to form a tertiary aldehyde",
            "Oxidative cleavage occurs to yield two molecules of methanol",
            "Reduction occurs to produce 2-methylpropane"
        ],
        "A",
        "When alcohol vapors are passed over heated copper at $573\\text{ K}$: Primary alcohols undergo dehydrogenation to give aldehydes ($RCH_2OH \\rightarrow RCHO + H_2$). Secondary alcohols undergo dehydrogenation to give ketones ($R_2CHOH \\rightarrow R_2CO + H_2$). Tertiary alcohols lack an $\\alpha$-hydrogen and instead undergo dehydration to yield an alkene: $(CH_3)_3C-OH \\xrightarrow{Cu, 573\\text{ K}} (CH_3)_2C=CH_2 + H_2O$."
    )

    # 45-54: Electrophilic Substitution & Special Reactions of Phenol
    add(ch, "Phenol Nitration with Dilute Nitric Acid",
        "When phenol is treated with cold dilute nitric acid ($HNO_3$) at $298\\text{ K}$, the major organic products formed are:",
        [
            "A mixture of 2-nitrophenol (ortho) and 4-nitrophenol (para)",
            "Exclusively 3-nitrophenol (meta)",
            "2,4,6-Trinitrophenol (picric acid)",
            "Benzoquinone"
        ],
        "A",
        "Because the hydroxyl group strongly activates the aromatic ring and directs incoming electrophiles to ortho and para positions, reaction of phenol with dilute $HNO_3$ at low temperature ($298\\text{ K}$) yields a mixture of ortho- and para-nitrophenol: $C_6H_5OH + \\text{dil. } HNO_3 \\rightarrow \\text{2-nitrophenol} + \\text{4-nitrophenol}$."
    )

    add(ch, "Separation of Nitrophenol Isomers by Steam Distillation",
        "A mixture of 2-nitrophenol (ortho) and 4-nitrophenol (para) can be effectively separated by steam distillation because:",
        [
            "2-Nitrophenol is steam-volatile due to intramolecular hydrogen bonding, whereas 4-nitrophenol has intermolecular hydrogen bonding",
            "4-Nitrophenol is non-polar and evaporates instantaneously before steam forms",
            "2-Nitrophenol forms an insoluble polymer that precipitates out of boiling water",
            "4-Nitrophenol has a lower molecular mass than 2-nitrophenol"
        ],
        "A",
        "In 2-nitrophenol, the $-NO_2$ and $-OH$ groups are adjacent and form an intramolecular hydrogen bond (chelation), preventing association between adjacent molecules and making it steam-volatile. In contrast, 4-nitrophenol molecules associate strongly with each other through intermolecular hydrogen bonding, raising its boiling point and making it non-steam-volatile."
    )

    add(ch, "Synthesis of Picric Acid from Phenol",
        "What explosive compound is formed when phenol is treated vigorously with concentrated nitric acid in the presence of concentrated sulfuric acid?",
        [
            "2,4,6-Trinitrophenol (picric acid)",
            "1,3,5-Trinitrobenzene",
            "4-Nitrophenol",
            "2,4-Dinitrobenzene"
        ],
        "A",
        "Treatment of phenol with concentrated nitric acid in the presence of concentrated sulfuric acid introduces nitro groups into all available activated positions (both ortho positions and the para position), yielding 2,4,6-trinitrophenol, commonly known as picric acid."
    )

    add(ch, "Bromination of Phenol in Non-Polar Solvents",
        "When phenol is treated with bromine ($Br_2$) dissolved in a non-polar solvent like carbon disulfide ($CS_2$) or chloroform at $273\\text{ K}$, what is the major product?",
        [
            "4-Bromophenol (p-bromophenol)",
            "2,4,6-Tribromophenol",
            "2-Bromophenol",
            "3-Bromophenol"
        ],
        "A",
        "In non-polar solvents of low dielectric constant such as $CS_2$ or $CHCl_3$, the ionization of phenol into the highly reactive phenoxide ion is suppressed. The aromatic ring is less strongly activated than in water, resulting in monobromination. 4-Bromophenol (para-bromophenol) is the major product (~80%) due to minimal steric hindrance."
    )

    add(ch, "Bromine Water Test for Phenol",
        "Why does treating phenol with bromine water ($Br_2/H_2O$) produce a white precipitate of 2,4,6-tribromophenol instead of monobromophenol?",
        [
            "In polar water, phenol ionizes into phenoxide ion whose powerful $+R$ resonance activates all ortho and para positions toward rapid polyhalogenation",
            "Water oxidizes bromine into bromate which catalyzes carbon-carbon bond cleavage",
            "The precipitate formed is an insoluble coordination polymer of elemental bromine",
            "The aromatic ring decomposes into aliphatic tribromo compounds"
        ],
        "A",
        "Water is a highly polar solvent that facilitates the ionization of phenol into the phenoxide ion ($C_6H_5O^-$). The phenoxide ion donates electron density into the aromatic ring much more powerfully than un-ionized phenol, activating the ring to such a high degree that electrophilic bromination occurs instantaneously at both ortho positions and the para position, yielding a white precipitate of 2,4,6-tribromophenol."
    )

    add(ch, "Kolbe Reaction: Salicylic Acid Synthesis",
        "In Kolbe's reaction, sodium phenoxide is heated with carbon dioxide ($CO_2$) under pressure ($4-7\\text{ atm}$) followed by acidification to produce:",
        [
            "2-Hydroxybenzoic acid (salicylic acid)",
            "Salicylaldehyde",
            "Benzoic acid",
            "Phthalic acid"
        ],
        "A",
        "In Kolbe's reaction, treatment of sodium phenoxide with carbon dioxide (a weak electrophile) at $400\\text{ K}$ and $4-7\\text{ atm}$ pressure leads to electrophilic aromatic substitution predominantly at the ortho position. Subsequent acidification of sodium salicylate yields 2-hydroxybenzoic acid (salicylic acid) as the major product."
    )

    add(ch, "Reimer-Tiemann Electrophilic Intermediate",
        "In the Reimer-Tiemann reaction, phenol is converted into salicylaldehyde by heating with chloroform and aqueous sodium hydroxide. What reactive intermediate electrophile is involved in this transformation?",
        [
            "Dichlorocarbene ($:CCl_2$)",
            "Trichloromethyl anion ($^-CCl_3$)",
            "Formyl cation ($H-\\overset{+}{C}=O$)",
            "Chloronium ion ($Cl^+$)"
        ],
        "A",
        "In the Reimer-Tiemann reaction, aqueous sodium hydroxide reacts with chloroform to generate dichlorocarbene ($:CCl_2$) via $\\alpha$-elimination: $CHCl_3 + OH^- \\rightleftharpoons ^-CCl_3 + H_2O \\rightarrow :CCl_2 + Cl^-$. Dichlorocarbene has an electron-deficient sextet of electrons and acts as an electrophile that attacks the activated phenoxide ring at the ortho position to yield salicylaldehyde after hydrolysis."
    )

    add(ch, "Reimer-Tiemann Reaction with Carbon Tetrachloride",
        "When phenol is treated with carbon tetrachloride ($CCl_4$) in the presence of aqueous $NaOH$ at $340\\text{ K}$ followed by acidification, what product is formed?",
        [
            "Salicylic acid (2-hydroxybenzoic acid)",
            "Salicylaldehyde",
            "Chlorobenzene",
            "Hexachlorobenzene"
        ],
        "A",
        "When carbon tetrachloride ($CCl_4$) is used in place of chloroform ($CHCl_3$) in the Reimer-Tiemann reaction with phenol and aqueous $NaOH$, electrophilic attack introduces a $-CCl_3$ group onto the ortho position of phenoxide. Upon alkaline hydrolysis of the three chlorine atoms and subsequent acidification, salicylic acid (2-hydroxybenzoic acid) is obtained."
    )

    add(ch, "Reduction of Phenol with Zinc Dust",
        "When phenol is heated and distilled with zinc dust, which hydrocarbon is obtained?",
        [
            "Benzene ($C_6H_6$)",
            "Toluene",
            "Cyclohexane",
            "Biphenyl"
        ],
        "A",
        "Distillation of phenol with zinc dust reduces the phenolic compound by removing the oxygen atom, yielding benzene and zinc oxide: $C_6H_5OH + Zn \\xrightarrow{\\Delta} C_6H_6 + ZnO$."
    )

    add(ch, "Oxidation of Phenol to Benzoquinone",
        "Oxidation of phenol with acidified sodium dichromate ($Na_2Cr_2O_7 / H_2SO_4$) produces which conjugated diketone?",
        [
            "1,4-Benzoquinone (p-benzoquinone)",
            "Catechol (benzene-1,2-diol)",
            "Resorcinol (benzene-1,3-diol)",
            "Benzophenone"
        ],
        "A",
        "Oxidation of phenol with chromic acid or acidified sodium dichromate ($Na_2Cr_2O_7 / H_2SO_4$) results in oxidation of the aromatic system to yield a conjugated cyclic diketone, 1,4-benzoquinone (p-benzoquinone)."
    )

    # 55-65: Preparation & Properties of Ethers
    add(ch, "Williamson Ether Synthesis Mechanism",
        "In the Williamson ether synthesis, what is the fundamental reaction mechanism by which an alkoxide ion displaces a halide ion from an alkyl halide?",
        [
            "Bimolecular nucleophilic substitution ($S_N2$)",
            "Unimolecular nucleophilic substitution ($S_N1$)",
            "Bimolecular elimination ($E2$)",
            "Electrophilic aromatic substitution"
        ],
        "A",
        "The Williamson ether synthesis involves the reaction of an alkoxide or phenoxide ion with an alkyl halide: $R-O^- + R'-X \\rightarrow R-O-R' + X^-$. The alkoxide ion acts as a nucleophile and attacks the backside of the carbon bearing the leaving halide in a single concerted bimolecular step, adhering strictly to the $S_N2$ mechanism."
    )

    add(ch, "Williamson Synthesis Limitation with Tertiary Halides",
        "What happens when 2-bromo-2-methylpropane (tert-butyl bromide) is treated with sodium ethoxide ($C_2H_5ONa$) in ethanol?",
        [
            "2-Methylpropene is formed as the exclusive major product via $E2$ elimination",
            "tert-Butyl ethyl ether is formed via $S_N2$ substitution",
            "Diethyl ether is formed with liberation of methane",
            "The reactants do not interact and remain unreacted"
        ],
        "A",
        "Alkoxides are not only nucleophiles but also strong Bronsted bases. When a tertiary alkyl halide ($(CH_3)_3C-Br$) is used, backside attack is completely blocked by steric hindrance. Instead, the basic ethoxide ion abstracts a $\\beta$-proton, causing $E2$ elimination to yield 2-methylpropene as the major product: $(CH_3)_3C-Br + C_2H_5ONa \\rightarrow (CH_3)_2C=CH_2 + C_2H_5OH + NaBr$."
    )

    add(ch, "Optimal Route for tert-Butyl Alkyl Ethers",
        "To synthesize tert-butyl ethyl ether in high yield via the Williamson synthesis, which combination of reactants must be chosen?",
        [
            "Sodium tert-butoxide ($(CH_3)_3C-O^- Na^+$) and ethyl bromide ($CH_3CH_2Br$)",
            "tert-Butyl bromide ($(CH_3)_3C-Br$) and sodium ethoxide ($CH_3CH_2O^- Na^+$)",
            "tert-Butyl alcohol and ethanol in concentrated sulfuric acid at $443\\text{ K}$",
            "tert-Butyl chloride and ethylene gas over platinum catalyst"
        ],
        "A",
        "To successfully prepare an unsymmetrical ether with a tertiary group, the alkyl halide must be primary to permit $S_N2$ displacement without competing elimination. Therefore, one must react a tertiary alkoxide (sodium tert-butoxide) with a primary alkyl halide (ethyl bromide): $(CH_3)_3C-ONa + CH_3CH_2Br \\rightarrow (CH_3)_3C-O-CH_2CH_3 + NaBr$."
    )

    add(ch, "Synthesis of Alkyl Aryl Ethers",
        "Why can anisole (methoxybenzene) be prepared by reacting sodium phenoxide with methyl iodide, but CANNOT be prepared by reacting bromobenzene with sodium methoxide?",
        [
            "Bromobenzene does not undergo nucleophilic substitution under mild conditions due to resonance partial double-bond character and $sp^2$ hybridization of carbon",
            "Sodium phenoxide decomposes spontaneously in the presence of methyl iodide",
            "Sodium methoxide is an electrophilic reagent that nitrates bromobenzene",
            "Methyl iodide is a gas that does not dissolve in organic solvents"
        ],
        "A",
        "In bromobenzene, the carbon-bromine bond has partial double-bond character due to resonance and the carbon is $sp^2$ hybridized, making nucleophilic displacement by methoxide ($CH_3O^-$) virtually impossible under standard Williamson conditions. In contrast, methyl iodide ($CH_3I$) is an unhindered primary halide that readily undergoes $S_N2$ attack by sodium phenoxide ($C_6H_5ONa$) to yield anisole."
    )

    add(ch, "Exhaustive Cleavage of Ethers with Excess HI",
        "When diethyl ether is heated with excess concentrated hydroiodic acid ($HI$), what are the final organic products?",
        [
            "Two moles of ethyl iodide ($CH_3CH_2I$) and water",
            "One mole of ethanol and one mole of ethane",
            "Ethylene gas and elemental iodine",
            "Iodoform and acetic acid"
        ],
        "A",
        "Heating an ether with excess concentrated $HI$ leads to cleavage of both $C-O$ bonds: In the first step, one mole of ethyl iodide and one mole of ethanol are formed: $C_2H_5OC_2H_5 + HI \\rightarrow C_2H_5I + C_2H_5OH$. With excess $HI$, the formed ethanol reacts further to convert into a second mole of ethyl iodide: $C_2H_5OH + HI \\rightarrow C_2H_5I + H_2O$. Overall: $C_2H_5OC_2H_5 + 2HI \\rightarrow 2C_2H_5I + H_2O$."
    )

    add(ch, "Cleavage of Unsymmetrical Primary Ethers with HI",
        "When an unsymmetrical ether containing two different primary alkyl groups, such as ethyl methyl ether ($CH_3-O-CH_2CH_3$), is cleaved with one equivalent of cold concentrated $HI$, what products are formed?",
        [
            "Methyl iodide ($CH_3I$) and ethyl alcohol ($CH_3CH_2OH$)",
            "Ethyl iodide ($CH_3CH_2I$) and methanol ($CH_3OH$)",
            "Methane and iodoethane",
            "Methanol and ethanol"
        ],
        "A",
        "When an unsymmetrical ether with primary alkyl groups is cleaved by $HI$, the reaction proceeds via an $S_N2$ mechanism on the protonated ether oxonium ion. The nucleophilic iodide ion ($I^-$) preferentially attacks the less sterically hindered alkyl group (the smaller methyl group). Thus, methyl iodide ($CH_3I$) and ethanol ($CH_3CH_2OH$) are formed."
    )

    add(ch, "Cleavage of Ethers with a Tertiary Alkyl Group",
        "When tert-butyl methyl ether ($(CH_3)_3C-O-CH_3$) is treated with hydroiodic acid ($HI$), why is tert-butyl iodide formed along with methanol, rather than methyl iodide and tert-butanol?",
        [
            "The reaction proceeds via an $S_N1$ mechanism because the tert-butyl carbocation formed by $C-O$ cleavage is exceptionally stable",
            "The methyl group is sterically crowded, forcing the nucleophile onto the tert-butyl group",
            "Methanol has a higher vapor pressure that repels iodide ions",
            "The reaction proceeds via free radical cleavage where methyl radicals dimerize"
        ],
        "A",
        "When one of the alkyl groups attached to the ether oxygen is tertiary, the cleavage proceeds via an $S_N1$ mechanism rather than $S_N2$. Protonation of the ether yields an oxonium ion, which cleaves heterolytically in the rate-determining step to generate the highly stable tertiary carbocation ($(CH_3)_3C^+$) and neutral methanol. The tert-butyl cation is then rapidly trapped by iodide to yield tert-butyl iodide."
    )

    add(ch, "Cleavage of Alkyl Aryl Ethers (Anisole) with HI",
        "When anisole (methoxybenzene, $C_6H_5-O-CH_3$) is cleaved by heating with concentrated hydroiodic acid ($HI$), what products are obtained?",
        [
            "Phenol ($C_6H_5OH$) and methyl iodide ($CH_3I$)",
            "Iodobenzene ($C_6H_5I$) and methanol ($CH_3OH$)",
            "Benzene and iodomethane",
            "Toluene and hypoiodous acid"
        ],
        "A",
        "In protonated anisole ($C_6H_5-\\overset{+}{O}(H)-CH_3$), the bond between oxygen and the phenyl ring has partial double-bond character due to resonance, and the aromatic carbon is $sp^2$ hybridized. This makes the $C_{phenyl}-O$ bond much stronger and shorter than the $C_{alkyl}-O$ bond. Therefore, the nucleophile $I^-$ attacks the $sp^3$ methyl carbon via $S_N2$, yielding phenol and methyl iodide ($CH_3I$)."
    )

    add(ch, "Electrophilic Bromination of Anisole",
        "Bromination of anisole with bromine in ethanoic acid proceeds smoothly without requiring an $FeBr_3$ Lewis acid catalyst and yields predominantly:",
        [
            "4-Bromoanisole (para isomer, ~90%)",
            "2-Bromoanisole (ortho isomer, ~90%)",
            "3-Bromoanisole (meta isomer)",
            "2,4,6-Tribromoanisole"
        ],
        "A",
        "The methoxy group ($-OCH_3$) in anisole is a powerful activating group due to resonance ($+R$ effect), which significantly increases electron density in the benzene ring. As a result, halogenation occurs rapidly even in the absence of a Lewis acid catalyst ($FeBr_3$). 4-Bromoanisole is obtained as the major product (~90%) due to steric hindrance at the ortho position."
    )

    add(ch, "Friedel-Crafts Acylation of Anisole",
        "When anisole undergoes Friedel-Crafts acylation with acetyl chloride ($CH_3COCl$) in the presence of anhydrous $AlCl_3$, the major product is:",
        [
            "4-Methoxyacetophenone",
            "2-Methoxyacetophenone",
            "3-Methoxyacetophenone",
            "Acetophenone"
        ],
        "A",
        "The methoxy group of anisole directs the incoming acyl electrophile ($CH_3\\overset{+}{C}=O$) to the ortho and para positions. 4-Methoxyacetophenone (para isomer) is formed as the major product because the bulky methoxy and acetyl groups experience substantial steric repulsion in the 2-methoxyacetophenone (ortho) isomer."
    )

    add(ch, "Nitration of Anisole Regiochemistry",
        "What is the major organic product formed when anisole is nitrated using a mixture of concentrated nitric acid and concentrated sulfuric acid?",
        [
            "4-Nitroanisole (para-nitroanisole)",
            "2-Nitroanisole (ortho-nitroanisole)",
            "3-Nitroanisole (meta-nitroanisole)",
            "2,4,6-Trinitroanisole"
        ],
        "A",
        "Anisole reacts with a nitrating mixture of concentrated $HNO_3$ and concentrated $H_2SO_4$ to give a mixture of ortho- and para-nitroanisole. The para isomer, 4-nitroanisole, is obtained as the major product (approximately 80%) due to reduced steric hindrance between the methoxy and nitro groups compared to the ortho isomer."
    )

    return qs
