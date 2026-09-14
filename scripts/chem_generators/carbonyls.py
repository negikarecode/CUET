from scripts.chem_generators.common import make_question, normalize_text

def get_carbonyls_questions(seen):
    qs = []
    
    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in carbonyls: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "Aldehydes, Ketones and Carboxylic Acids"

    # 1. Structure of carbonyl group
    add(ch, "Carbonyl Group Structure & Hybridization",
        "In the carbonyl group ($>C=O$), what is the hybridization of the carbonyl carbon and the approximate bond angles around it?",
        [
            "$sp^2$ hybridized with planar geometry and bond angles of approximately $120^\\circ$",
            "$sp^3$ hybridized with tetrahedral geometry and bond angles of approximately $109.5^\\circ$",
            "$sp$ hybridized with linear geometry and bond angles of $180^\\circ$",
            "$sp^2$ hybridized with pyramidal geometry and bond angles of approximately $107^\\circ$"
        ],
        "A",
        "The carbonyl carbon is $sp^2$ hybridized and forms three $\\sigma$ bonds in a single plane at approximately $120^\\circ$ angles. The unhybridized $2p$ orbital of carbon overlaps laterally with a $2p$ orbital of oxygen to form a $\\pi$ bond, resulting in a planar structure."
    )

    # 2. Polarity of carbonyl group
    add(ch, "Polarity and Dipole Moment of Carbonyls",
        "Why is the carbon-oxygen double bond in carbonyl compounds substantially more polar than the carbon-carbon double bond in alkenes?",
        [
            "Oxygen has a much higher electronegativity than carbon, drawing $\\pi$-electron density toward itself and generating resonance structures",
            "The $\\sigma$-bond between carbon and oxygen is inherently non-polar, but hyperconjugation creates an induced dipole",
            "Carbon acts as an electron-withdrawing atom relative to oxygen, causing partial negative charge on carbon",
            "Oxygen donates its lone pairs into the antibonding orbital of carbon via back-bonding, neutralizing bond polarity"
        ],
        "A",
        "Oxygen is significantly more electronegative than carbon ($3.44$ vs $2.55$). It pulls both the $\\sigma$ and particularly the mobile $\\pi$ electrons toward itself, represented by the resonance contributor $>C^+-O^-$. Thus, the carbonyl carbon is electrophilic (Lewis acid) and the oxygen is nucleophilic (Lewis base)."
    )

    # 3. Boiling point comparison of carbonyls
    add(ch, "Boiling Point Comparison of Carbonyls",
        "Which of the following correctly arranges compounds of comparable molecular mass (~58-60 g/mol) in order of increasing boiling point?",
        [
            "Butane < Methoxyethane < Propanal < Propan-1-ol < Ethanoic acid",
            "Ethanoic acid < Propan-1-ol < Propanal < Methoxyethane < Butane",
            "Butane < Propanal < Methoxyethane < Ethanoic acid < Propan-1-ol",
            "Methoxyethane < Butane < Propanal < Propan-1-ol < Ethanoic acid"
        ],
        "A",
        "Non-polar hydrocarbons (butane) have weak dispersion forces. Ethers have weak dipole-dipole interactions. Aldehydes/ketones have stronger dipole-dipole interactions. Alcohols exhibit extensive intermolecular hydrogen bonding. Carboxylic acids form stable cyclic hydrogen-bonded dimers, giving the highest boiling points."
    )

    # 4. Boiling points of aldehydes vs ketones
    add(ch, "Boiling Points of Aldehydes vs Ketones",
        "Between propanone (acetone) and propanal of the same molecular formula ($C_3H_6O$), propanone has a slightly higher boiling point ($56^\\circ\\text{C}$ vs $49^\\circ\\text{C}$) because:",
        [
            "Propanone possesses two electron-donating methyl groups that increase the dipole moment and dipole-dipole attractions",
            "Propanone forms intramolecular hydrogen bonds whereas propanal forms intermolecular hydrogen bonds",
            "Propanal exists entirely in an enol tautomeric form with weaker intermolecular forces",
            "Propanone molecules assemble into rigid cyclic hydrogen-bonded tetramers in the liquid state"
        ],
        "A",
        "In ketones, the two electron-donating alkyl groups push electron density toward the carbonyl carbon, reinforcing the dipole moment ($>C^+-O^-$). Consequently, ketones are slightly more polar than isomeric aldehydes and experience stronger dipole-dipole attractions, resulting in slightly higher boiling points."
    )

    # 5. Water solubility of lower carbonyls
    add(ch, "Water Solubility of Carbonyl Compounds",
        "Why are lower aldehydes and ketones such as methanal, ethanal, and propanone completely miscible with water in all proportions?",
        [
            "They form intermolecular hydrogen bonds between the carbonyl oxygen atom and water molecules",
            "They undergo rapid and complete ionic dissociation in aqueous medium",
            "They possess non-polar alkyl groups that disrupt the strong hydrogen bonds of liquid water",
            "They form covalent coordinate complexes with hydroxide ions present in water"
        ],
        "A",
        "The carbonyl oxygen atom of aldehydes and ketones carries a partial negative charge and possesses lone pairs, allowing it to form intermolecular hydrogen bonds with the partially positive hydrogen atoms of water molecules. Solubility decreases as the hydrophobic alkyl chain lengthens."
    )

    # 6. Carbonyl dipole moment vs ethers
    add(ch, "Carbonyl Dipole Moment vs Ethers",
        "The dipole moments of aldehydes (2.3–2.8 D) are substantially larger than those of isomeric ethers (1.1–1.3 D). What accounts for this difference?",
        [
            "The presence of loosely held, easily polarized $\\pi$-electrons in the carbonyl double bond allows greater charge separation",
            "Ethers have a linear geometry that cancels out their bond dipole vectors completely",
            "The $C-O-C$ bond angle in ethers is $180^\\circ$, whereas the carbonyl bond angle is $90^\\circ$",
            "Carbonyl compounds undergo complete self-ionization into stable carbocations in neat liquid state"
        ],
        "A",
        "In the carbonyl group, the $\\pi$-electron cloud is loosely held and strongly polarized toward the electronegative oxygen atom, leading to significant contribution from the dipolar resonance form ($>C^+-O^-$). In ethers, only $\\sigma$-bonds are present, which are less polarizable."
    )

    # 7. Rosenmund reduction
    add(ch, "Rosenmund Reduction",
        "In the Rosenmund reduction, benzoyl chloride is catalytically hydrogenated to benzaldehyde using $H_2$ over $Pd-BaSO_4$. What is the specific role of $BaSO_4$ (often with quinoline or sulfur)?",
        [
            "It acts as a catalyst poison to moderate the activity of palladium, preventing further reduction of benzaldehyde to benzyl alcohol",
            "It acts as a dehydrating agent to absorb water produced during the hydrogenation process",
            "It neutralizes the byproduct $HCl$ gas to prevent acid-catalyzed polymerization of benzaldehyde",
            "It oxidizes palladium from $Pd(0)$ to $Pd(II)$ to accelerate the initial rate of acyl chloride cleavage"
        ],
        "A",
        "In the Rosenmund reduction ($RCOCl + H_2 \\xrightarrow{Pd/BaSO_4} RCHO + HCl$), barium sulphate ($BaSO_4$), often poisoned with sulfur or quinoline, acts as a promoter/poison that dampens the catalytic activity of palladium, selectively stopping the reduction at the aldehyde stage and preventing over-reduction to primary alcohol."
    )

    # 8. Stephen reaction
    add(ch, "Stephen Reaction",
        "In the Stephen reaction, ethanenitrile ($CH_3CN$) is converted into ethanal ($CH_3CHO$). What are the reagents and intermediate involved in this transformation?",
        [
            "Reduction with $SnCl_2 / HCl$ in dry ether to form an aldimine hydrochloride intermediate, followed by hydrolysis with warm water",
            "Reaction with $LiAlH_4$ in ether to form an amine, followed by oxidation with alkaline $KMnO_4$",
            "Treatment with $Zn-Hg / \\text{conc. } HCl$ followed by reaction with nitrous acid",
            "Reaction with alkaline hydrogen peroxide followed by dry distillation with calcium oxide"
        ],
        "A",
        "In the Stephen reaction, nitriles dissolved in ether are reduced with stannous chloride ($SnCl_2$) in the presence of hydrochloric acid ($HCl$) to yield an imine hydrochloride intermediate ($R-CH=NH\\cdot HCl$), which upon subsequent hydrolysis with warm water yields the corresponding aldehyde."
    )

    # 9. DIBAL-H reduction of nitriles
    add(ch, "DIBAL-H Reduction of Nitriles",
        "Diisobutylaluminium hydride, $[(CH_3)_2CHCH_2]_2AlH$ (DIBAL-H), selectively reduces nitriles at low temperatures to give which class of organic compounds after hydrolysis?",
        [
            "Aldehydes",
            "Primary amines",
            "Carboxylic acids",
            "Secondary alcohols"
        ],
        "A",
        "DIBAL-H selectively reduces nitriles to imines at low temperatures (e.g. 195 K), which upon subsequent aqueous hydrolysis yield aldehydes without reducing isolated carbon-carbon double bonds: $R-C\\equiv N \\xrightarrow{1.\\text{ DIBAL-H}, 2.\\text{ }H_2O} R-CHO$."
    )

    # 10. DIBAL-H reduction of esters
    add(ch, "DIBAL-H Reduction of Esters",
        "When ethyl but-2-enoate ($CH_3-CH=CH-COOCH_2CH_3$) is treated with DIBAL-H at $-78^\\circ\\text{C}$ followed by aqueous workup, what is the major organic product?",
        [
            "But-2-enal ($CH_3-CH=CH-CHO$)",
            "But-2-en-1-ol ($CH_3-CH=CH-CH_2OH$)",
            "Butanal ($CH_3-CH_2-CH_2-CHO$)",
            "Butan-1-ol ($CH_3-CH_2-CH_2-CH_2OH$)"
        ],
        "A",
        "DIBAL-H at low temperature ($-78^\\circ\\text{C}$) selectively reduces ester groups ($-COOR$) to aldehydes ($-CHO$) while leaving carbon-carbon double bonds ($C=C$) completely intact. Hydrolysis yields but-2-enal along with ethanol."
    )

    # 11. Etard reaction
    add(ch, "Etard Reaction",
        "In the Etard reaction, toluene is converted to benzaldehyde by treatment with chromyl chloride ($CrO_2Cl_2$) in $CS_2$ solvent. What is the intermediate formed during this reaction?",
        [
            "A brown chromium complex $[C_6H_5CH(OCrOHCl_2)_2]$ which on aqueous hydrolysis yields benzaldehyde",
            "A green precipitate of chromium(III) oxide coordinated to the aromatic ring",
            "A benzylidene chloride intermediate that undergoes nucleophilic displacement by water",
            "A benzoic acid chromium salt that undergoes thermal decarboxylation"
        ],
        "A",
        "In the Etard reaction, chromyl chloride ($CrO_2Cl_2$) in $CS_2$ or $CCl_4$ oxidizes the methyl group of toluene to form a brown chromium complex, $C_6H_5CH(OCrOHCl_2)_2$. Subsequent aqueous hydrolysis of this complex produces benzaldehyde."
    )

    # 12. Oxidation of toluene with CrO3 in acetic anhydride
    add(ch, "Oxidation of Toluene with CrO3 in Acetic Anhydride",
        "Toluene is treated with chromium trioxide ($CrO_3$) in acetic anhydride at 273–283 K, followed by heating with aqueous acid. Why does the oxidation stop at benzaldehyde rather than continuing to benzoic acid?",
        [
            "The gem-diacetate intermediate (benzylidene diacetate) is stable against further oxidation and only hydrolyzes to benzaldehyde during aqueous workup",
            "Acetic anhydride reduces $CrO_3$ to inactive $Cr(II)$ before further oxidation can take place",
            "Acetic anhydride reacts with benzaldehyde as soon as it forms to produce a protective trimer",
            "The low temperature freezes the reaction mixture before oxygen transfer to the carbonyl carbon can occur"
        ],
        "A",
        "Toluene reacts with $CrO_3$ in acetic anhydride to form benzylidene diacetate, $C_6H_5CH(OCOCH_3)_2$. This gem-diacetate intermediate cannot be oxidized further by $CrO_3$. When heated with dilute aqueous acid, it hydrolyzes quantitatively to benzaldehyde and acetic acid."
    )

    # 13. Gatterman-Koch reaction
    add(ch, "Gatterman-Koch Reaction",
        "Which set of reagents converts benzene into benzaldehyde in the Gatterman-Koch reaction?",
        [
            "Carbon monoxide ($CO$) and hydrogen chloride ($HCl$) in the presence of anhydrous $AlCl_3$ and $CuCl$",
            "Formaldehyde ($HCHO$) and concentrated $HCl$ in the presence of anhydrous $ZnCl_2$",
            "Formyl chloride ($HCOCl$) and liquid $NH_3$ over $Pd-C$",
            "Chloroform ($CHCl_3$) and aqueous sodium hydroxide ($NaOH$) at $60^\\circ\\text{C}$"
        ],
        "A",
        "In the Gatterman-Koch formylation reaction, benzene (or alkylbenzene) is treated with carbon monoxide ($CO$) and $HCl$ gas in the presence of anhydrous aluminium chloride ($AlCl_3$) and cuprous chloride ($CuCl$) under high pressure to yield benzaldehyde."
    )

    # 14. Preparation of ketones from dialkylcadmium
    add(ch, "Ketone Synthesis from Dialkylcadmium",
        "Why is dialkylcadmium ($R_2Cd$), prepared from Grignard reagents and cadmium chloride ($2RMgX + CdCl_2 \\to R_2Cd + 2MgXCl$), preferred over Grignard reagents for synthesizing ketones from acid chlorides ($R'COCl$)?",
        [
            "Dialkylcadmium is less nucleophilic than Grignard reagents and reacts with acid chlorides to yield ketones without reacting further with the product ketone",
            "Grignard reagents are insoluble in ether and fail to react with acyl chlorides",
            "Dialkylcadmium oxidizes the acid chloride directly to a dicarbonyl compound",
            "Dialkylcadmium prevents the formation of any magnesium halide precipitates"
        ],
        "A",
        "Grignard reagents are highly reactive nucleophiles; they react with acyl chlorides to give ketones, which immediately react with a second equivalent of Grignard reagent to produce tertiary alcohols. Dialkylcadmium reagents ($R_2Cd$) are less reactive and react smoothly with acyl chlorides ($2R'COCl + R_2Cd \\to 2R'COR + CdCl_2$) stopping cleanly at the ketone stage."
    )

    # 15. Ketone synthesis from nitriles and Grignard
    add(ch, "Ketone Synthesis from Nitriles and Grignard",
        "When benzonitrile ($C_6H_5CN$) is reacted with methylmagnesium bromide ($CH_3MgBr$) in dry ether followed by acid hydrolysis, what is the major organic product?",
        [
            "Acetophenone ($C_6H_5COCH_3$)",
            "Benzophenone ($C_6H_5COC_6H_5$)",
            "Benzaldehyde ($C_6H_5CHO$)",
            "Benzoic acid ($C_6H_5COOH$)"
        ],
        "A",
        "Nucleophilic addition of methylmagnesium bromide to benzonitrile yields an imine salt intermediate: $C_6H_5-C(=NMgBr)-CH_3$. Acidic hydrolysis of this intermediate cleanly produces acetophenone ($C_6H_5COCH_3$) along with ammonia and magnesium salts."
    )

    # 16. Friedel-Crafts acylation
    add(ch, "Friedel-Crafts Acylation",
        "In the Friedel-Crafts acylation of benzene with acetyl chloride in the presence of anhydrous aluminium chloride, what is the active electrophile?",
        [
            "Acylium ion ($CH_3-\\overset{+}{C}=O$)",
            "Acetyl radical ($CH_3-\\dot{C}=O$)",
            "Carbanion ($CH_3-C=O^-$)",
            "Chloronium ion ($Cl^+$)"
        ],
        "A",
        "Anhydrous $AlCl_3$ acts as a Lewis acid and abstracts a chloride ion from acetyl chloride ($CH_3COCl$), forming the resonance-stabilized acylium ion ($CH_3-C^+=O \\leftrightarrow CH_3-C\\equiv O^+$) and $[AlCl_4]^-$. The acylium ion acts as the electrophile attacking the aromatic ring."
    )

    # 17. Friedel-Crafts benzoylation
    add(ch, "Friedel-Crafts Benzoylation",
        "Treatment of benzene with benzoyl chloride ($C_6H_5COCl$) in the presence of anhydrous aluminium chloride yields benzophenone. This reaction is classified as:",
        [
            "Friedel-Crafts acylation (benzoylation)",
            "Friedel-Crafts alkylation",
            "Gatterman reaction",
            "Kolbe-Schmitt reaction"
        ],
        "A",
        "The reaction of an aromatic hydrocarbon with an aromatic acid halide (such as benzoyl chloride) in the presence of a Lewis acid catalyst ($AlCl_3$) to form a diaryl ketone (benzophenone) is a Friedel-Crafts acylation, specifically called benzoylation."
    )

    # 18. Hydration of alkynes to ketones
    add(ch, "Hydration of Alkynes to Ketones",
        "When propyne ($CH_3-C\\equiv CH$) is treated with dilute sulfuric acid in the presence of mercuric sulfate ($HgSO_4$) at 333 K, what is the final product formed after keto-enol tautomerization?",
        [
            "Propanone ($CH_3COCH_3$)",
            "Propanal ($CH_3CH_2CHO$)",
            "Prop-2-en-1-ol ($CH_2=CHCH_2OH$)",
            "Propanoic acid ($CH_3CH_2COOH$)"
        ],
        "A",
        "Hydration of propyne in the presence of $Hg^{2+}/H^+$ proceeds via Markovnikov addition of water to yield the enol prop-1-en-2-ol ($CH_3-C(OH)=CH_2$). This enol is unstable and rapidly tautomerizes to the more stable ketone, propanone ($CH_3COCH_3$)."
    )

    # 19. Reductive ozonolysis of alkenes to ketones
    add(ch, "Reductive Ozonolysis of Alkenes to Ketones",
        "Which of the following alkenes yields only propanone (acetone) upon ozonolysis followed by reductive cleavage with $Zn / H_2O$?",
        [
            "2,3-Dimethylbut-2-ene",
            "2-Methylbut-2-ene",
            "But-2-ene",
            "2,3-Dimethylbut-1-ene"
        ],
        "A",
        "Ozonolysis cleaves the carbon-carbon double bond. 2,3-Dimethylbut-2-ene, $(CH_3)_2C=C(CH_3)_2$, has two identical tetrasubstituted carbon atoms. Cleavage of the ozonide with $Zn/H_2O$ breaks the $C=C$ bond, giving two moles of propanone: $(CH_3)_2C=O$."
    )

    # 20. Nucleophilic addition reactivity
    add(ch, "Nucleophilic Addition Reactivity: Aldehydes vs Ketones",
        "Which of the following correctly orders carbonyl compounds by decreasing reactivity toward nucleophilic addition reactions ($HCHO$, $CH_3CHO$, $CH_3COCH_3$, $(CH_3)_3CCOCH_3$)?",
        [
            "$HCHO > CH_3CHO > CH_3COCH_3 > (CH_3)_3CCOCH_3$",
            "$(CH_3)_3CCOCH_3 > CH_3COCH_3 > CH_3CHO > HCHO$",
            "$CH_3COCH_3 > (CH_3)_3CCOCH_3 > CH_3CHO > HCHO$",
            "$HCHO > CH_3COCH_3 > CH_3CHO > (CH_3)_3CCOCH_3$"
        ],
        "A",
        "Aldehydes are more reactive than ketones because: (1) Steric effect: Aldehydes have only one alkyl group (or none in $HCHO$), making the carbonyl carbon more accessible to nucleophiles. (2) Electronic effect: Alkyl groups are electron-donating (+I), which reduces the partial positive charge on the carbonyl carbon. Hence, formaldehyde is the most reactive, followed by acetaldehyde, acetone, and pinacolone."
    )

    # 21. Benzaldehyde vs aliphatic aldehydes
    add(ch, "Nucleophilic Addition Reactivity: Benzaldehyde vs Aliphatic Aldehydes",
        "Benzaldehyde is significantly less reactive toward nucleophilic addition than propanal. What is the primary reason for this?",
        [
            "Resonance delocalization of the phenyl ring $\\pi$-electrons into the carbonyl group reduces the partial positive charge on the carbonyl carbon",
            "The phenyl ring has a powerful $-I$ inductive effect that increases electron density on the carbonyl carbon",
            "Benzaldehyde readily undergoes keto-enol tautomerization in solution, converting into a non-reactive enol",
            "The carbonyl oxygen in benzaldehyde is completely protonated by the aromatic ring"
        ],
        "A",
        "In benzaldehyde, the carbonyl group is conjugated with the aromatic ring. Resonance electron donation (+R effect) from the benzene ring into the carbonyl carbon ($C_6H_5-CH=O \\leftrightarrow C_6H_5^+=CH-O^-$) disperses and reduces the partial positive charge (electrophilicity) on the carbonyl carbon, making it less susceptible to nucleophilic attack than aliphatic aldehydes."
    )

    # 22. Addition of HCN
    add(ch, "Addition of Hydrogen Cyanide (HCN)",
        "Why is the addition of hydrogen cyanide ($HCN$) to aldehydes and ketones typically conducted in the presence of a base (such as $OH^-$ or cyanide salts) rather than pure $HCN$ alone?",
        [
            "Pure $HCN$ is a very weak acid and dissociates poorly; base deprotonates $HCN$ to generate the powerful nucleophile cyanide ion ($CN^-$)",
            "Base protonates the carbonyl oxygen to make the carbonyl carbon a stronger electrophile",
            "Pure $HCN$ reacts violently with the carbonyl group causing explosive decomposition",
            "Base oxidizes the aldehyde to a carboxylic acid before addition can occur"
        ],
        "A",
        "Because pure $HCN$ is a very weak acid ($K_a \\approx 6.2 \\times 10^{-10}$), it dissociates very slowly to provide only a minute concentration of $CN^-$. A catalytic amount of base ($OH^-$) removes the proton from $HCN$, generating the nucleophilic cyanide ion ($CN^-$), which rapidly attacks the carbonyl carbon to form a cyanohydrin."
    )

    # 23. Cyanohydrins synthetic utility
    add(ch, "Synthetic Transformation of Cyanohydrins",
        "When acetaldehyde is reacted with $HCN$ in the presence of base, it forms a cyanohydrin. Acidic hydrolysis of this cyanohydrin yields which important $\\alpha$-hydroxy acid?",
        [
            "Lactic acid (2-hydroxypropanoic acid)",
            "Malic acid (hydroxybutanedioic acid)",
            "Glycolic acid (2-hydroxyethanoic acid)",
            "Tartaric acid (2,3-dihydroxybutanedioic acid)"
        ],
        "A",
        "Acetaldehyde ($CH_3CHO$) adds $HCN$ to form acetaldehyde cyanohydrin, $CH_3-CH(OH)-CN$. Complete acidic hydrolysis of the nitrile group ($-CN \\xrightarrow{H_3O^+} -COOH$) converts it into 2-hydroxypropanoic acid, commonly known as lactic acid."
    )

    # 24. Addition of NaHSO3
    add(ch, "Sodium Hydrogen Sulphite (NaHSO3) Addition & Purification",
        "Aldehydes and methyl ketones react with saturated aqueous sodium hydrogen sulphite ($NaHSO_3$) to form crystalline bisulphite addition compounds. What makes this reaction valuable in laboratory synthesis?",
        [
            "The crystalline addition compound can be filtered off and treated with dilute mineral acid or alkali to regenerate the pure carbonyl compound",
            "It permanently converts aldehydes into non-volatile sulfonic acids for waste disposal",
            "It selectively reduces ketones to tertiary alcohols in quantitative yield",
            "It allows separation of carboxylic acids from esters via precipitate formation"
        ],
        "A",
        "Bisulphite addition compounds ($>C(OH)SO_3^-Na^+$) are crystalline solids that precipitate from saturated $NaHSO_3$. Because this addition is reversible, washing the crystalline solid and treating it with dilute mineral acid or aqueous sodium carbonate regenerates the pure aldehyde or methyl ketone, providing a standard method for purification and separation."
    )

    # 25. Acetal and hemiacetal formation
    add(ch, "Hemiacetal and Acetal Formation",
        "When an aldehyde is treated with one equivalent of monohydric alcohol in the presence of dry $HCl$ gas, intermediate (X) is formed. Subsequent reaction with a second equivalent of alcohol yields compound (Y). What are (X) and (Y)?",
        [
            "(X) is a hemiacetal (alkoxyalcohol) and (Y) is an acetal (gem-dialkoxy compound)",
            "(X) is an acetal and (Y) is a hemiacetal",
            "(X) is a carboxylic ester and (Y) is an ether",
            "(X) is a ketal and (Y) is a lactone"
        ],
        "A",
        "Aldehydes react with one equivalent of monohydric alcohol in the presence of dry $HCl$ gas to yield an alkoxyalcohol intermediate known as a hemiacetal ($R-CH(OH)(OR')$). Further reaction with a second molecule of alcohol eliminates water to yield a gem-dialkoxy alkane known as an acetal ($R-CH(OR')_2$)."
    )

    # 26. Cyclic ketal protecting group
    add(ch, "Ethylene Glycol Cyclic Ketals as Protecting Groups",
        "Ketones react reversibly with ethylene glycol (ethane-1,2-diol) in the presence of dry $HCl$ gas or p-toluenesulfonic acid to form:",
        [
            "Cyclic ketals (ethylene glycol ketals), which protect the carbonyl group against nucleophiles and bases",
            "Hemiacetals, which undergo rapid oxidation to dicarboxylic acids",
            "Diesters, which undergo decarboxylation on heating",
            "Crown ethers, which permanently encapsulate sodium cations"
        ],
        "A",
        "Ketones react with 1,2-diols such as ethylene glycol in the presence of dry $HCl$ to form five-membered 1,3-dioxolane rings known as cyclic ketals (ethylene glycol ketals). These are stable to strong bases, reducing agents (like $LiAlH_4$ and Grignard reagents), and nucleophiles, serving as valuable protecting groups that can be readily removed by dilute aqueous acid."
    )

    # 27. Hydroxylamine reaction (oxime)
    add(ch, "Reaction with Hydroxylamine (Oxime Formation)",
        "What is the product formed when propanone (acetone) reacts with hydroxylamine ($NH_2OH$) under mildly acidic conditions?",
        [
            "Acetoxime (propan-2-one oxime, $(CH_3)_2C=N-OH$)",
            "Acetamide ($(CH_3)_2CHCONH_2$)",
            "Acetonitrile ($CH_3CN$)",
            "Acetohydrazide ($(CH_3)_2C=N-NH_2$)"
        ],
        "A",
        "Carbonyl compounds undergo nucleophilic addition-elimination with hydroxylamine ($NH_2OH$) to yield oximes: $(CH_3)_2C=O + H_2N-OH \\to (CH_3)_2C=N-OH + H_2O$. With acetone, the product is acetoxime."
    )

    # 28. Hydrazine reaction (hydrazone)
    add(ch, "Reaction with Hydrazine (Hydrazone Formation)",
        "The reaction between ethanal ($CH_3CHO$) and hydrazine ($NH_2NH_2$) in a weakly acidic medium yields which organic product?",
        [
            "Ethanal hydrazone ($CH_3CH=N-NH_2$)",
            "Ethanamide ($CH_3CONH_2$)",
            "Azobenzene ($C_6H_5N=NC_6H_5$)",
            "Ethylamine ($CH_3CH_2NH_2$)"
        ],
        "A",
        "Ethanal reacts with hydrazine ($NH_2NH_2$) via nucleophilic addition followed by loss of water to form ethanal hydrazone ($CH_3CH=N-NH_2$)."
    )

    # 29. 2,4-DNP Brady's reagent
    add(ch, "Brady's Reagent (2,4-DNP Test)",
        "What is Brady's reagent, and what observable change indicates a positive test for aldehydes and ketones?",
        [
            "2,4-Dinitrophenylhydrazine in methanol and concentrated sulfuric acid; forms an orange, yellow, or red crystalline precipitate",
            "Ammoniacal silver nitrate solution; forms a brilliant silver mirror",
            "Alkaline copper sulfate complexed with tartrate; forms a red cuprous oxide precipitate",
            "Potassium permanganate in dilute sulfuric acid; decolorization from purple to colorless"
        ],
        "A",
        "Brady's reagent is 2,4-dinitrophenylhydrazine (2,4-DNP). Aldehydes and ketones react with 2,4-DNP to form 2,4-dinitrophenylhydrazones, which separate as bright yellow, orange, or red crystalline precipitates. This is a characteristic qualitative diagnostic test for the presence of a carbonyl group."
    )

    # 30. Semicarbazide regioselectivity
    add(ch, "Semicarbazide Reaction Regioselectivity",
        "Semicarbazide contains two $-NH_2$ groups ($H_2N-CO-NH-NH_2$). Why does only the terminal hydrazine $-NH_2$ group react with aldehydes and ketones to form semicarbazones?",
        [
            "The lone pair of electrons on the amide $-NH_2$ group is delocalized into the carbonyl group by resonance, making it non-nucleophilic",
            "The amide $-NH_2$ group is sterically blocked by the two bulky hydrogen atoms",
            "The hydrazine $-NH_2$ group is protonated in acidic solution while the amide $-NH_2$ is not",
            "The amide $-NH_2$ group undergoes rapid tautomerization into an enol that cannot attack carbonyls"
        ],
        "A",
        "In semicarbazide ($H_2N^{a}-CO-NH-NH_2^{b}$), the lone pair on $N^a$ is involved in resonance with the adjacent carbonyl group ($H_2N^+=C(O^-)-NH-NH_2$), which drastically reduces its electron density and nucleophilicity. In contrast, the terminal hydrazine nitrogen ($N^b$) has an unshared electron pair that is not conjugated, making it nucleophilic and capable of attacking the carbonyl carbon."
    )

    # 31. Schiff's base
    add(ch, "Schiff's Base Formation",
        "When benzaldehyde is heated with aniline in the presence of an acid catalyst, water is eliminated to produce an azomethine ($C_6H_5CH=N-C_6H_5$). This type of compound is commonly referred to as a:",
        [
            "Schiff's base",
            "Enamine",
            "Lactam",
            "Hydantoin"
        ],
        "A",
        "The condensation of aldehydes or ketones with primary amines ($1^\\circ$ aliphatic or aromatic) yields azomethines or imines containing the $>C=N-$ functional group, which are commonly known as Schiff's bases."
    )

    # 32. pH dependence of addition-elimination
    add(ch, "pH Dependence of Nucleophilic Addition-Elimination",
        "Why do nucleophilic addition-elimination reactions of carbonyl compounds with ammonia derivatives ($NH_2-Z$) require a carefully controlled, mildly acidic pH (~3.5 to 4.5)?",
        [
            "At very low pH the amine derivative is completely protonated and loses nucleophilicity, while at high pH the carbonyl oxygen is insufficiently protonated to facilitate attack",
            "At high pH the ammonia derivative decomposes explosively into nitrogen and hydrogen gas",
            "At low pH the carbonyl compound undergoes irreversible self-condensation to form polymers",
            "The reaction is purely free-radical and radical initiators only generate radicals at pH 4.0"
        ],
        "A",
        "Nucleophilic addition of ammonia derivatives requires protonation of the carbonyl oxygen to increase electrophilicity of the carbonyl carbon. However, if the solution is too acidic (low pH), the ammonia derivative ($NH_2-Z$) is protonated to form an unreactive ammonium salt ($^+NH_3-Z$) lacking a nucleophilic lone pair. At high pH, protonation of the carbonyl oxygen is inadequate. A pH of 3.5–4.5 represents the optimum balance."
    )

    # 33. Phenylhydrazine reaction
    add(ch, "Reaction with Phenylhydrazine",
        "What is the reaction product when benzaldehyde ($C_6H_5CHO$) is treated with phenylhydrazine ($C_6H_5NHNH_2$)?",
        [
            "Benzaldehyde phenylhydrazone ($C_6H_5CH=NNHC_6H_5$)",
            "Benzanilide ($C_6H_5CONHC_6H_5$)",
            "Azobenzene ($C_6H_5N=NC_6H_5$)",
            "Benzyl phenyl ether ($C_6H_5CH_2OC_6H_5$)"
        ],
        "A",
        "Benzaldehyde condenses with phenylhydrazine via addition of the $-NH_2$ group followed by elimination of a water molecule to form benzaldehyde phenylhydrazone: $C_6H_5CHO + H_2NNHC_6H_5 \\to C_6H_5CH=NNHC_6H_5 + H_2O$."
    )

    # 34. Clemmensen reduction
    add(ch, "Clemmensen Reduction Conditions & Scope",
        "Which reagent combination is used in the Clemmensen reduction to reduce the carbonyl group of aldehydes and ketones directly to a methylene ($-CH_2-$) group?",
        [
            "Amalgamated zinc and concentrated hydrochloric acid ($Zn-Hg / \\text{conc. } HCl$)",
            "Hydrazine followed by potassium hydroxide in ethylene glycol ($NH_2NH_2 / KOH, \\Delta$)",
            "Lithium aluminium hydride in anhydrous diethyl ether ($LiAlH_4 / \\text{ether}$)",
            "Sodium in liquid ammonia ($Na / \\text{liq. } NH_3$)"
        ],
        "A",
        "The Clemmensen reduction employs amalgamated zinc ($Zn-Hg$) in the presence of concentrated hydrochloric acid ($HCl$) to deoxygenate aldehydes and ketones into the corresponding alkanes ($>C=O \\to >CH_2$)."
    )

    # 35. Clemmensen limitations
    add(ch, "Clemmensen Reduction Limitations (Acid-Sensitive Groups)",
        "Why is the Clemmensen reduction unsuitable for converting 4-hydroxybutan-2-one into butan-2-ol or butane?",
        [
            "The strongly acidic reagent ($HCl$) causes dehydration or substitution of the acid-sensitive secondary/primary alcohol group",
            "The zinc amalgam selectively reduces primary alcohols before reducing ketones",
            "Concentrated $HCl$ oxidizes the secondary alcohol into a diketone",
            "The substrate coordinates with mercury to form an insoluble inert coordination polymer"
        ],
        "A",
        "The Clemmensen reduction utilizes concentrated hydrochloric acid. Substrates containing acid-sensitive groups (such as alcohols $-OH$, acetals, or alkenes) will undergo unwanted side reactions such as acid-catalyzed dehydration to alkenes or substitution of $-OH$ with $-Cl$. For acid-sensitive substrates, the basic Wolff-Kishner reduction is preferred."
    )

    # 36. Wolff-Kishner reduction
    add(ch, "Wolff-Kishner Reduction Conditions & Scope",
        "In the Wolff-Kishner reduction, a carbonyl compound is converted to an alkane. What sequence of reagents and reaction conditions is employed?",
        [
            "Reaction with hydrazine ($NH_2NH_2$) to form a hydrazone, followed by heating with $KOH$ in a high-boiling solvent like ethylene glycol",
            "Reaction with hydroxylamine followed by treatment with phosphorus pentachloride",
            "Treatment with sodium borohydride followed by concentrated sulfuric acid at $180^\\circ\\text{C}$",
            "Hydrogenation over Raney nickel catalyst at room temperature and 1 atm pressure"
        ],
        "A",
        "In the Wolff-Kishner reduction, aldehydes or ketones are heated with hydrazine ($NH_2NH_2$) to form a hydrazone intermediate. Subsequent heating with a strong base ($KOH$ or potassium tert-butoxide) in a high-boiling solvent such as ethylene glycol ($453-473\\text{ K}$) causes evolution of nitrogen gas ($N_2$) and yields the alkane."
    )

    # 37. Wolff-Kishner limitations
    add(ch, "Wolff-Kishner Reduction Limitations (Base-Sensitive Groups)",
        "A chemist needs to reduce the carbonyl group of 4-chlorobutan-2-one ($CH_3COCH_2CH_2Cl$) to a methylene group. Why is Wolff-Kishner reduction NOT appropriate for this transformation?",
        [
            "The strong base ($KOH$) used at elevated temperatures will induce dehydrohalogenation or nucleophilic substitution of the alkyl chloride",
            "Alkyl chlorides react violently with hydrazine to form explosive azides",
            "Hydrazine cannot form a hydrazone when halogen atoms are present in the molecule",
            "The basic conditions cause isomerization of the ketone to an aldehyde"
        ],
        "A",
        "The Wolff-Kishner reduction utilizes strongly basic conditions ($KOH$ in hot glycol). Base-sensitive functional groups such as alkyl halides readily undergo dehydrohalogenation (elimination to alkene) or nucleophilic substitution by $OH^-$. In such cases, Clemmensen reduction or milder methods are used."
    )

    # 38. Metal hydride reductions
    add(ch, "Complex Metal Hydride Reductions (NaBH4 vs LiAlH4)",
        "When an $\\alpha,\\beta$-unsaturated ketone such as but-3-en-2-one ($CH_2=CH-COCH_3$) is treated with sodium borohydride ($NaBH_4$) in ethanol, what is the principal product obtained?",
        [
            "But-3-en-2-ol ($CH_2=CH-CH(OH)-CH_3$)",
            "Butan-2-one ($CH_3-CH_2-CO-CH_3$)",
            "Butan-2-ol ($CH_3-CH_2-CH(OH)-CH_3$)",
            "Butane ($CH_3-CH_2-CH_2-CH_3$)"
        ],
        "A",
        "Sodium borohydride ($NaBH_4$) is a selective reducing agent that reduces the carbonyl group of aldehydes and ketones to alcohols without affecting isolated or conjugated carbon-carbon double bonds under ordinary conditions. Thus, but-3-en-2-one is reduced cleanly to but-3-en-2-ol."
    )

    # 39. Tollens' test
    add(ch, "Tollens' Test Reagent & Mechanism",
        "What is the composition of Tollens' reagent and what is observed when it is warmed with an aliphatic aldehyde?",
        [
            "Ammoniacal silver nitrate solution containing $[Ag(NH_3)_2]^+$; a bright silver mirror forms on the inner wall of the test tube",
            "Aqueous copper sulfate and sodium hydroxide; a bright red precipitate of $Cu_2O$ is produced",
            "Solution of potassium iodide and iodine; a yellow precipitate of $CHI_3$ separates",
            "Neutral ferric chloride solution; a deep violet-purple complex is produced"
        ],
        "A",
        "Tollens' reagent is freshly prepared ammoniacal silver nitrate, $[Ag(NH_3)_2]^+OH^-$. On warming with an aldehyde, the aldehyde is oxidized to a carboxylate anion while the silver(I) complex ion is reduced to metallic silver: $RCHO + 2[Ag(NH_3)_2]^+ + 3OH^- \\to RCOO^- + 2Ag\\downarrow + 2H_2O + 4NH_3$. The metallic silver deposits as a shiny mirror."
    )

    # 40. Tollens' test on aromatic aldehydes
    add(ch, "Tollens' Test on Aromatic Aldehydes",
        "Does benzaldehyde give a positive Tollens' test, and what is the chemical equation representing this behavior?",
        [
            "Yes, benzaldehyde reduces Tollens' reagent to metallic silver while being oxidized to benzoate ion",
            "No, aromatic aldehydes are resistant to all mild oxidizing agents including Tollens' reagent",
            "No, benzaldehyde undergoes Cannizzaro reaction with ammonia instead of reducing silver ions",
            "Yes, benzaldehyde gives a red precipitate of cuprous oxide with Tollens' reagent"
        ],
        "A",
        "Both aliphatic and aromatic aldehydes reduce Tollens' reagent. Benzaldehyde is oxidized to the benzoate anion ($C_6H_5COO^-$) while silver ions ($Ag^+$) are reduced to elemental silver ($Ag$), producing a silver mirror. Tollens' test distinguishes aldehydes (both aliphatic and aromatic) from ketones."
    )

    # 41. Fehling's test
    add(ch, "Fehling's Test Reagents & Observation",
        "Fehling's reagent consists of two solutions: Fehling A and Fehling B. What are their respective compositions and the visible result with ethanal?",
        [
            "Fehling A is aqueous $CuSO_4$; Fehling B is alkaline sodium potassium tartrate (Rochelle salt); a red precipitate of $Cu_2O$ is formed",
            "Fehling A is silver nitrate; Fehling B is ammonium hydroxide; a silver mirror is formed",
            "Fehling A is potassium permanganate; Fehling B is dilute sulfuric acid; the purple color is discharged",
            "Fehling A is iodine in KI; Fehling B is sodium carbonate; a yellow crystalline precipitate is formed"
        ],
        "A",
        "Fehling A is an aqueous solution of copper(II) sulfate ($CuSO_4$), and Fehling B is an alkaline solution of sodium potassium tartrate (Rochelle salt). When heated with an aliphatic aldehyde like ethanal, $Cu^{2+}$ is reduced to copper(I) oxide ($Cu_2O$), forming a characteristic red-brown precipitate: $RCHO + 2Cu^{2+} + 5OH^- \\to RCOO^- + Cu_2O\\downarrow + 3H_2O$."
    )

    # 42. Fehling's distinction aliphatic vs aromatic
    add(ch, "Fehling's Test Distinction: Aliphatic vs Aromatic",
        "Which pair of aldehydes can be easily distinguished by Fehling's solution, and which one gives a positive result?",
        [
            "Ethanal and Benzaldehyde; ethanal reduces Fehling's solution giving a red precipitate of $Cu_2O$, whereas benzaldehyde does not react",
            "Propanal and Ethanal; propanal gives a red precipitate while ethanal does not react",
            "Benzaldehyde and Acetophenone; benzaldehyde gives a red precipitate while acetophenone gives a silver mirror",
            "Methanal and Ethanal; methanal does not react with Fehling's solution while ethanal gives a red precipitate"
        ],
        "A",
        "Fehling's test is specific for aliphatic aldehydes. Aromatic aldehydes like benzaldehyde do not have sufficient reducing power to reduce Fehling's solution. Therefore, aliphatic aldehydes (such as ethanal or propanal) give a red precipitate of $Cu_2O$, whereas aromatic aldehydes (such as benzaldehyde) fail to react, providing a reliable diagnostic distinction."
    )

    # 43. Haloform / Iodoform test structure
    add(ch, "Haloform / Iodoform Test Structural Criterion",
        "Which of the following structural units is an essential requirement for an organic compound to give a positive iodoform ($CHI_3$) test?",
        [
            "A methyl group directly bonded to a carbonyl carbon ($CH_3-CO-$) or a methyl group bonded to a carbinol carbon ($CH_3-CH(OH)-$)",
            "A methylene group bonded between two carbonyl groups ($-CO-CH_2-CO-$)",
            "A terminal alkyne group ($-C\\equiv CH$)",
            "A primary alcohol group without any methyl branch ($-CH_2-CH_2-OH$)"
        ],
        "A",
        "The haloform reaction requires either a methyl ketone group ($CH_3-C=O$) or a secondary methyl carbinol group ($CH_3-CH(OH)-$, including ethanol $CH_3CH_2OH$), which is oxidized in situ by hypohalite ($OI^-$) to the corresponding methyl ketone before haloform cleavage occurs."
    )

    # 44. Iodoform products and observation
    add(ch, "Iodoform Reaction Products & Observation",
        "When propanone is treated with iodine ($I_2$) and aqueous sodium hydroxide ($NaOH$), what are the products formed and what is the characteristic observation?",
        [
            "Iodoform ($CHI_3$) which forms a yellow crystalline precipitate, and sodium acetate ($CH_3COONa$)",
            "Methyl iodide ($CH_3I$) as a colorless gas and sodium propanoate",
            "Diiodomethane ($CH_2I_2$) as an oily layer and sodium formate",
            "Sodium hypoiodite precipitate and acetic acid"
        ],
        "A",
        "Propanone undergoes halogenation of its $\\alpha$-methyl group by sodium hypoiodite ($NaOI$, formed from $I_2 + NaOH$) to form triiodoacetone, which is then cleaved by hydroxide ion to produce a yellow crystalline precipitate of iodoform ($CHI_3$, melting point $119^\\circ\\text{C}$, antiseptic odor) and sodium acetate ($CH_3COONa$)."
    )

    # 45. Distinguishing ketone isomers by iodoform
    add(ch, "Distinguishing Ketone Isomers by Iodoform Test",
        "Which chemical test can readily distinguish between pentan-2-one and pentan-3-one?",
        [
            "Iodoform test; pentan-2-one gives a yellow precipitate of $CHI_3$, whereas pentan-3-one does not react",
            "Fehling's test; pentan-2-one reduces Fehling's solution while pentan-3-one does not",
            "Tollens' test; pentan-3-one forms a silver mirror while pentan-2-one does not",
            "Bromine water test; pentan-2-one decolorizes bromine water while pentan-3-one does not"
        ],
        "A",
        "Pentan-2-one ($CH_3-CO-CH_2CH_2CH_3$) is a methyl ketone and yields a yellow crystalline precipitate of iodoform ($CHI_3$) with $I_2 / NaOH$. Pentan-3-one ($CH_3CH_2-CO-CH_2CH_3$) has no methyl group attached directly to the carbonyl carbon ($CH_3-CO-$) and therefore does not give a positive iodoform test."
    )

    # 46. Acetaldehyde unique among aldehydes
    add(ch, "Acetaldehyde Unique Positive Iodoform Test Among Aldehydes",
        "Why is ethanal (acetaldehyde) the only aldehyde that gives a positive iodoform test?",
        [
            "It is the only aldehyde containing a methyl group directly linked to the carbonyl carbon ($CH_3-CHO$)",
            "It is the only aldehyde that is miscible with water",
            "It is the only aldehyde with a planar $sp^2$ carbonyl carbon",
            "It is the only aldehyde that undergoes aldol condensation"
        ],
        "A",
        "The haloform reaction requires a $CH_3-C=O$ group. In all aldehydes of the general formula $R-CHO$, the group is $R-C=O$. When $R = H$, it is formaldehyde ($HCHO$, no methyl). When $R = CH_3$, it is ethanal ($CH_3CHO$, possessing a methyl ketone-type carbonyl). For any higher aldehyde ($R = C_2H_5, C_3H_7$, etc.), the carbon attached to the carbonyl is not a methyl group. Thus, ethanal is uniquely the only aldehyde giving a positive iodoform test."
    )

    # 47. Aldol condensation requirement
    add(ch, "Aldol Condensation Structural Requirement",
        "Which of the following structural features must an aldehyde or ketone possess in order to undergo self-aldol condensation in the presence of dilute alkali?",
        [
            "At least one $\\alpha$-hydrogen atom on the carbon adjacent to the carbonyl group",
            "At least one halogen atom attached to the $\\beta$-carbon",
            "A tertiary carbon atom directly bonded to the carbonyl group",
            "An aromatic ring conjugated with the carbonyl double bond"
        ],
        "A",
        "Aldol condensation is initiated by the removal of an $\\alpha$-hydrogen by a base (such as dilute $NaOH$) to generate an enolate ion, which then acts as a nucleophile attacking the carbonyl carbon of another molecule. Without an $\\alpha$-hydrogen, enolate formation cannot occur."
    )

    # 48. Self-aldol of ethanal
    add(ch, "Self-Aldol Condensation of Ethanal",
        "When ethanal ($CH_3CHO$) is warmed with dilute aqueous sodium hydroxide and subsequently heated, what are the initial aldol product and the final dehydrated product?",
        [
            "3-Hydroxybutanal (aldol), which dehydrates on heating to but-2-enal (crotonaldehyde)",
            "4-Hydroxybutanal, which dehydrates to but-3-enal",
            "2-Hydroxybutanoic acid, which dehydrates to acrylic acid",
            "Butan-1,3-diol, which dehydrates to butadiene"
        ],
        "A",
        "In dilute $NaOH$, two molecules of ethanal condense to give 3-hydroxybutanal (aldol): $CH_3-CH(OH)-CH_2-CHO$. When heated with trace acid or base, it undergoes facile dehydration to yield the conjugated $\\alpha,\\beta$-unsaturated aldehyde, but-2-enal (crotonaldehyde): $CH_3-CH=CH-CHO$."
    )

    # 49. Cross-aldol product distribution
    add(ch, "Cross-Aldol Condensation Product Distribution",
        "When an equimolar mixture of ethanal ($CH_3CHO$) and propanal ($CH_3CH_2CHO$) is treated with dilute sodium hydroxide, how many distinct aldol condensation products are formed?",
        [
            "Four distinct products (two self-aldol and two cross-aldol products)",
            "Only one unique product because ethanal reacts exclusively as nucleophile",
            "Two products because propanal cannot form an enolate ion",
            "Six products due to geometric and structural permutations"
        ],
        "A",
        "Both aldehydes have $\\alpha$-hydrogens and can act as either the nucleophilic enolate donor or the electrophilic carbonyl acceptor. This results in 4 condensation products: (1) self-aldol of ethanal (but-2-enal), (2) self-aldol of propanal (2-methylpent-2-enal), (3) cross-aldol with ethanal as enolate + propanal as acceptor (pent-2-enal), and (4) cross-aldol with propanal as enolate + ethanal as acceptor (2-methylbut-2-enal)."
    )

    # 50. Cross-aldol benzaldehyde + acetophenone
    add(ch, "Cross-Aldol between Benzaldehyde and Acetophenone",
        "When benzaldehyde ($C_6H_5CHO$) reacts with acetophenone ($C_6H_5COCH_3$) in the presence of dilute sodium hydroxide at 293 K, what is the major condensation product (Claisen-Schmidt reaction)?",
        [
            "1,3-Diphenylprop-2-en-1-one (benzalacetophenone / chalcone)",
            "1,2-Diphenylethanone (deoxybenzoin)",
            "Diphenylmethanone (benzophenone)",
            "3-Phenylprop-2-enoic acid (cinnamic acid)"
        ],
        "A",
        "Benzaldehyde has no $\\alpha$-hydrogens, while acetophenone has three $\\alpha$-hydrogens on its methyl group. Base abstracts a proton from acetophenone to form an enolate ($C_6H_5COCH_2^-$), which attacks benzaldehyde. Spontaneous dehydration of the $\\beta$-hydroxyketone yields the stable conjugated enone 1,3-diphenylprop-2-en-1-one (benzalacetophenone or chalcone): $C_6H_5-CH=CH-CO-C_6H_5$."
    )

    # 51. Cannizzaro reaction requirement
    add(ch, "Cannizzaro Reaction Structural Requirement",
        "Which of the following aldehydes undergoes the Cannizzaro reaction when heated with concentrated (50%) potassium hydroxide solution?",
        [
            "Benzaldehyde ($C_6H_5CHO$)",
            "Ethanal ($CH_3CHO$)",
            "Propanal ($CH_3CH_2CHO$)",
            "2-Methylpropanal ($(CH_3)_2CHCHO$)"
        ],
        "A",
        "Aldehydes lacking $\\alpha$-hydrogen atoms cannot form enolate ions and therefore do not undergo aldol condensation; instead, in the presence of concentrated alkali (e.g. 50% $KOH$), they undergo the Cannizzaro reaction. Benzaldehyde lacks $\\alpha$-hydrogens and undergoes this reaction cleanly."
    )

    # 52. Cannizzaro disproportionation products
    add(ch, "Cannizzaro Reaction Disproportionation Products",
        "What products are obtained when formaldehyde ($HCHO$) is heated with concentrated (50%) sodium hydroxide?",
        [
            "Methanol ($CH_3OH$) and sodium formate ($HCOONa$)",
            "Ethanol ($CH_3CH_2OH$) and sodium acetate ($CH_3COONa$)",
            "Formic acid ($HCOOH$) and carbon dioxide ($CO_2$)",
            "Methoxymethane ($CH_3OCH_3$) and sodium carbonate"
        ],
        "A",
        "The Cannizzaro reaction is a self-redox (disproportionation) process. One molecule of formaldehyde is reduced to an alcohol (methanol, $CH_3OH$) by hydride transfer, while the other molecule is oxidized to a carboxylate salt (sodium formate, $HCOONa$): $2 HCHO + NaOH \\to CH_3OH + HCOONa$."
    )

    # 53. Crossed Cannizzaro with formaldehyde
    add(ch, "Crossed Cannizzaro Reaction with Formaldehyde",
        "When an equimolar mixture of benzaldehyde ($C_6H_5CHO$) and formaldehyde ($HCHO$) is treated with concentrated sodium hydroxide, what are the primary oxidation and reduction products?",
        [
            "Formaldehyde is oxidized to sodium formate, and benzaldehyde is reduced to benzyl alcohol",
            "Benzaldehyde is oxidized to sodium benzoate, and formaldehyde is reduced to methanol",
            "Both aldehydes are oxidized to their corresponding carboxylic acids",
            "Both aldehydes are reduced to their corresponding alcohols"
        ],
        "A",
        "Nucleophilic attack of $OH^-$ occurs much faster on formaldehyde than on benzaldehyde because formaldehyde has no alkyl or aryl group donating electron density or creating steric hindrance. The resulting dianion $[H_2C(O^-)_2]$ acts as a hydride donor, transferring a hydride ion ($H^-$) to the less reactive benzaldehyde. Hence, formaldehyde is exclusively oxidized to sodium formate ($HCOONa$), and benzaldehyde is reduced to benzyl alcohol ($C_6H_5CH_2OH$)."
    )

    # 54. Intramolecular Cannizzaro reaction
    add(ch, "Intramolecular Cannizzaro Reaction of Glyoxal",
        "When glyoxal ($OHC-CHO$) is warmed with concentrated aqueous sodium hydroxide, what product is formed via an intramolecular Cannizzaro reaction?",
        [
            "Sodium glycolate ($HO-CH_2-COONa$)",
            "Sodium oxalate ($NaOOC-COONa$)",
            "Ethylene glycol ($HO-CH_2-CH_2-OH$)",
            "Sodium acetate ($CH_3COONa$)"
        ],
        "A",
        "Glyoxal contains two aldehyde groups on adjacent carbons with no $\\alpha$-hydrogen. Hydroxide attacks one carbonyl carbon, and an intramolecular hydride shift transfers $H^-$ to the other carbonyl carbon. This simultaneous internal oxidation-reduction produces the salt of a hydroxy acid, sodium glycolate ($HO-CH_2-COONa$)."
    )

    # 55. Electrophilic substitution of benzaldehyde
    add(ch, "Electrophilic Substitution of Benzaldehyde (Nitration)",
        "When benzaldehyde is treated with a nitrating mixture (concentrated $HNO_3 + \\text{conc. } H_2SO_4$) at 273–283 K, the principal organic product is:",
        [
            "m-Nitrobenzaldehyde",
            "o-Nitrobenzaldehyde",
            "p-Nitrobenzaldehyde",
            "2,4-Dinitrobenzaldehyde"
        ],
        "A",
        "The formyl group ($-CHO$) is strongly electron-withdrawing by both resonance ($-R$) and inductive ($-I$) effects. It withdraws $\\pi$-electron density from the ortho and para positions of the benzene ring to a much greater extent than from the meta position. Hence, $-CHO$ acts as a deactivating and meta-directing group during electrophilic aromatic substitution, yielding m-nitrobenzaldehyde."
    )

    # 56. Acidity of carboxylic acids
    add(ch, "Acidity of Carboxylic Acids & Resonance Stabilization",
        "Why are carboxylic acids substantially stronger acids than alcohols and phenols of comparable molecular mass?",
        [
            "The carboxylate anion ($RCOO^-$) is stabilized by two equivalent resonance structures where negative charge is shared equally between two electronegative oxygen atoms",
            "The $O-H$ bond in carboxylic acids is purely ionic in character",
            "Carboxylic acids undergo spontaneous homolytic cleavage into radicals in water",
            "The conjugate base of a carboxylic acid is stabilized by hyperconjugation from the alkyl chain"
        ],
        "A",
        "In the carboxylate anion ($RCOO^-$), the negative charge is delocalized over two highly electronegative oxygen atoms in two completely equivalent resonance structures. In alkoxide ions ($RO^-$), the negative charge is localized on a single oxygen. In phenoxide ions, the negative charge is delocalized over less electronegative carbon atoms. Thus, carboxylate is by far the most stable conjugate base."
    )

    # 57. Inductive effect of EWGs on acidity
    add(ch, "Inductive Effect of Electron Withdrawing Groups on Acidity",
        "How do electron-withdrawing substituents (such as $-NO_2, -CF_3, -CN$) attached to the $\\alpha$-carbon of a carboxylic acid affect its acidity?",
        [
            "They stabilize the conjugate base (carboxylate anion) through the $-I$ inductive effect, thereby increasing the acid strength",
            "They destabilize the carboxylate anion by increasing electron density on oxygen, thereby decreasing acid strength",
            "They prevent dissociation of the $O-H$ proton via steric hindrance, thereby decreasing acid strength",
            "They cause decarboxylation of the carboxylic acid, making it neutral"
        ],
        "A",
        "Electron-withdrawing groups (EWGs) exert a $-I$ inductive effect that withdraws electron density away from the carboxylate group. This disperses the negative charge over a larger volume, stabilizing the carboxylate anion and facilitating proton release, which significantly increases acid strength (lower $pK_a$)."
    )

    # 58. Acidity order of chloroacetic acids
    add(ch, "Relative Acidity of Chloroacetic Acids",
        "Which of the following represents the correct decreasing order of acid strength among chlorinated acetic acids?",
        [
            "$CCl_3COOH > CHCl_2COOH > CH_2ClCOOH > CH_3COOH$",
            "$CH_3COOH > CH_2ClCOOH > CHCl_2COOH > CCl_3COOH$",
            "$CHCl_2COOH > CCl_3COOH > CH_2ClCOOH > CH_3COOH$",
            "$CH_2ClCOOH > CHCl_2COOH > CCl_3COOH > CH_3COOH$"
        ],
        "A",
        "Each chlorine atom exerts an electron-withdrawing inductive ($-I$) effect. As the number of chlorine substituents on the $\\alpha$-carbon increases from 0 to 3, the cumulative $-I$ effect increases, providing progressively greater dispersal of negative charge and greater stability to the carboxylate anion: $CCl_3COOH (pK_a \\approx 0.65) > CHCl_2COOH (pK_a \\approx 1.29) > CH_2ClCOOH (pK_a \\approx 2.87) > CH_3COOH (pK_a \\approx 4.76)$."
    )

    # 59. Acidity order of haloacetic acids
    add(ch, "Acidity Order of Haloacetic Acids (F, Cl, Br, I)",
        "Which of the following correctly lists the monohaloacetic acids in order of decreasing acid strength?",
        [
            "$FCH_2COOH > ClCH_2COOH > BrCH_2COOH > ICH_2COOH$",
            "$ICH_2COOH > BrCH_2COOH > ClCH_2COOH > FCH_2COOH$",
            "$ClCH_2COOH > FCH_2COOH > BrCH_2COOH > ICH_2COOH$",
            "$FCH_2COOH > BrCH_2COOH > ClCH_2COOH > ICH_2COOH$"
        ],
        "A",
        "The $-I$ inductive effect is directly proportional to the electronegativity of the halogen atom ($F > Cl > Br > I$). Fluorine is the most electronegative halogen ($4.0$), followed by chlorine ($3.0$), bromine ($2.8$), and iodine ($2.5$). Consequently, fluoroacetic acid stabilizes the carboxylate anion most effectively and is the strongest acid in the series."
    )

    # 60. Distance dependence of inductive effect on acidity
    add(ch, "Position of Halogen Substituent and Acid Strength",
        "Which of the following isomeric chlorobutanoic acids is the strongest acid?",
        [
            "2-Chlorobutanoic acid ($CH_3CH_2CH(Cl)COOH$)",
            "3-Chlorobutanoic acid ($CH_3CH(Cl)CH_2COOH$)",
            "4-Chlorobutanoic acid ($ClCH_2CH_2CH_2COOH$)",
            "Butanoic acid ($CH_3CH_2CH_2COOH$)"
        ],
        "A",
        "The inductive effect is distance-dependent and diminishes rapidly as the number of intervening $\\sigma$-bonds increases. In 2-chlorobutanoic acid, the chlorine atom is at the $\\alpha$-position (closest to the carboxyl group), exerting the maximum $-I$ effect and resulting in the greatest stabilization of the conjugate base and highest acidity ($pK_a \\approx 2.86$)."
    )

    # 61. Formic acid vs acetic acid
    add(ch, "Acidity Comparison: Formic Acid vs Acetic Acid",
        "Methanoic acid (formic acid, $HCOOH$, $pK_a = 3.75$) is a stronger acid than ethanoic acid (acetic acid, $CH_3COOH$, $pK_a = 4.76$). This is because:",
        [
            "The methyl group in ethanoic acid exerts an electron-donating $+I$ inductive effect that intensifies the negative charge on the carboxylate ion",
            "Formic acid cannot form hydrogen bonds in aqueous solution",
            "The formate anion has three equivalent resonance structures while acetate has only one",
            "Acetic acid undergoes complete intramolecular dehydration in water"
        ],
        "A",
        "Alkyl groups (such as $-CH_3$) exhibit an electron-donating inductive ($+I$) effect. In acetic acid, the methyl group pushes electron density toward the carboxylate group, increasing the negative charge density on oxygen and destabilizing the acetate anion. Formic acid lacks an alkyl group ($H$ has zero inductive reference), so its conjugate base is more stable."
    )

    # 62. Decarboxylation with soda-lime
    add(ch, "Decarboxylation with Soda-Lime",
        "When anhydrous sodium propanoate ($CH_3CH_2COONa$) is heated strongly with soda-lime ($NaOH + CaO$), what hydrocarbon is produced?",
        [
            "Ethane ($CH_3-CH_3$)",
            "Propane ($CH_3-CH_2-CH_3$)",
            "Methane ($CH_4$)",
            "Ethene ($CH_2=CH_2$)"
        ],
        "A",
        "Decarboxylation of the sodium salt of a carboxylic acid with soda-lime ($NaOH$ and $CaO$ in a 3:1 ratio) removes the carboxyl carbon as sodium carbonate, yielding an alkane with one less carbon atom than the parent carboxylic acid: $CH_3CH_2COONa + NaOH \\xrightarrow{CaO, \\Delta} CH_3-CH_3 + Na_2CO_3$."
    )

    # 63. Role of CaO in soda-lime
    add(ch, "Function of CaO in Soda-Lime Decarboxylation",
        "In the decarboxylation of carboxylic acid salts using soda-lime ($NaOH + CaO$), what is the specific role of calcium oxide ($CaO$)?",
        [
            "It keeps the $NaOH$ dry (porous and non-deliquescent) and raises the fusion temperature to protect the glass tube from fusing",
            "It acts as an oxidizing agent that converts carbon monoxide into carbon dioxide",
            "It acts as a nucleophile that attacks the carbonyl carbon directly",
            "It dissolves the alkane product to prevent over-oxidation"
        ],
        "A",
        "Sodium hydroxide ($NaOH$) is extremely hygroscopic and deliquescent, and it melts at a relatively low temperature, attacking glass apparatus. Calcium oxide ($CaO$) absorbs moisture, keeps the mixture dry and porous, and raises the fusion point, preventing the reaction mixture from fusing with and cracking the glass test tube."
    )

    # 64. HVZ reaction
    add(ch, "Hell-Volhard-Zelinsky (HVZ) Reaction",
        "What are the reagents and products of the Hell-Volhard-Zelinsky (HVZ) reaction when propanoic acid is treated with bromine in the presence of red phosphorus followed by water?",
        [
            "Bromine and red phosphorus ($Br_2 / \\text{red } P$); yields 2-bromopropanoic acid ($\\alpha$-bromopropanoic acid)",
            "Hydrogen bromide and hydrogen peroxide ($HBr / H_2O_2$); yields 3-bromopropanoic acid",
            "Phosphorus pentabromide ($PBr_5$) only; yields propanoyl bromide",
            "Bromine water ($Br_2 / H_2O$); yields 2,2-dibromopropanoic acid"
        ],
        "A",
        "In the Hell-Volhard-Zelinsky (HVZ) reaction, carboxylic acids having an $\\alpha$-hydrogen react with chlorine or bromine in the presence of a small catalytic quantity of red phosphorus to form $\\alpha$-halocarboxylic acids: $R-CH_2-COOH \\xrightarrow{1.\\text{ }X_2/\\text{red }P, 2.\\text{ }H_2O} R-CH(X)-COOH$."
    )

    # 65. Substrates inactive to HVZ
    add(ch, "Substrates Inactive to Hell-Volhard-Zelinsky Reaction",
        "Which of the following carboxylic acids fails to undergo the Hell-Volhard-Zelinsky (HVZ) reaction upon treatment with $Br_2 / \\text{red } P$?",
        [
            "2,2-Dimethylpropanoic acid (pivalic acid, $(CH_3)_3CCOOH$)",
            "Ethanoic acid ($CH_3COOH$)",
            "Propanoic acid ($CH_3CH_2COOH$)",
            "2-Methylpropanoic acid ($(CH_3)_2CHCOOH$)"
        ],
        "A",
        "The HVZ reaction specifically requires the presence of at least one $\\alpha$-hydrogen atom on the carbon adjacent to the carboxyl group, which is enolized via the acid halide intermediate. In 2,2-dimethylpropanoic acid (pivalic acid, $(CH_3)_3CCOOH$), the $\\alpha$-carbon is quaternary and bears no $\\alpha$-hydrogen atom. Therefore, it cannot undergo the HVZ reaction."
    )

    return qs
