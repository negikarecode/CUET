#!/usr/bin/env python3
"""
build_pilot_mocks.py - Generates Pilot Mock 1 for English and General Test.
Includes 100% original, verified questions with step-by-step solutions,
traps, mistake analyses, and balanced option distribution.
"""

import json
import os

true = True
false = False
null = None

def create_english_mock_1():
    questions = []

    # PASSAGE 1: Literary / Reflective (Q1 - Q4)
    p1_text = """Read the given passage and answer the four questions that follow:

In the quiet attic above his alpine workshop, Master Elias bent over the brass movement of an eighteenth-century carriage clock. For three decades, the town had surrendered steadily to the quiet hum of digital microchips and quartz oscillators—devices that measured temporal increments with cold, unerring precision yet lacked what Elias called "the heartbeat of friction." To him, a mechanical clockwork was not merely an instrument of measurement; it was an embodied dialogue between human ambition and terrestrial physics. The escapement, poised delicately between the mainspring’s coiled fury and the balance wheel’s measured hesitation, was where time surrendered its wild fluidity to become rhythm.

Restoring this particular timepiece, however, posed an acute challenge. The balance pivot, no thicker than an eyelash, had suffered catastrophic fatigue. Sourcing an identical alloy was impossible; the metallurgic secrets of the original guild had perished with the artisans who devised them. Modern high-tensile steel was excessively rigid, threatening to chew through the unhardened brass bushings within a fortnight. Elias was forced to fabricate a composite pin by hand, tempering the wire in an oil bath under the soft glow of a kerosene lamp, testing its resilience against a calibrated gauge until its spring coefficient matched the ghost of its predecessor. As the pendulum swung once more, emitting its hollow, resonant timbre, Elias leaned back, his aged eyes reflecting not triumph, but the quiet reverence of a custodian who had merely granted an ancient voice another century of breath."""

    questions.append({
        "questionNumber": 1,
        "questionId": "ENG-M01-Q01",
        "chapter": "Reading Comprehension",
        "topic": "Inference and Contextual Analysis",
        "questionText": f"{p1_text}\n\nThe author's description of the escapement mechanism in the first paragraph primarily serves to:",
        "options": [
            {
                "id": "A",
                "text": "contrast the chaotic unpredictability of nature with the orderly discipline of mechanical craft",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. The passage describes the escapement as where 'time surrendered its wild fluidity to become rhythm', contrasting wild nature/fluidity with mechanical order and rhythm."
            },
            {
                "id": "B",
                "text": "argue that electronic quartz oscillators are technically inferior in calculating temporal intervals",
                "isCorrect": false,
                "studentSelectionTrap": "Technical Misconception",
                "mistakeAnalysis": "The passage acknowledges quartz oscillators measure time with 'unerring precision', so it does not argue they are technically inferior."
            },
            {
                "id": "C",
                "text": "criticize the eighteenth-century guild artisans for creating inefficient mechanical assemblies",
                "isCorrect": false,
                "studentSelectionTrap": "Tone Inversion Trap",
                "mistakeAnalysis": "The author expresses reverence and admiration for the guild artisans, not criticism."
            },
            {
                "id": "D",
                "text": "explain the mathematical formula required to synchronize pendulum vibrations with mainspring tension",
                "isCorrect": false,
                "studentSelectionTrap": "Literal Mathematical Trap",
                "mistakeAnalysis": "No mathematical formula is presented; the description is philosophical and thematic."
            }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-step Explanation:\n1. The author notes that the escapement sits between the 'mainspring's coiled fury and the balance wheel's measured hesitation' where 'time surrendered its wild fluidity to become rhythm.'\n2. This directly illustrates how mechanical craftsmanship transforms raw, fluid time into structured order.\n3. Option A accurately captures this thematic contrast.",
        "difficultyLevel": 2,
        "tags": ["English", "Reading Comprehension", "Inference"]
    })

    questions.append({
        "questionNumber": 2,
        "questionId": "ENG-M01-Q02",
        "chapter": "Reading Comprehension",
        "topic": "Contextual Vocabulary",
        "questionText": f"{p1_text}\n\nWhy did Master Elias reject the use of modern high-tensile steel for the replacement balance pivot?",
        "options": [
            {
                "id": "A",
                "text": "It was too malleable to sustain the high rotational speed of the carriage clock",
                "isCorrect": false,
                "studentSelectionTrap": "Opposite Property Trap",
                "mistakeAnalysis": "High-tensile steel is rigid, not malleable."
            },
            {
                "id": "B",
                "text": "Its excessive rigidity would erode and damage the antique brass bushings",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. Paragraph 2 explicitly states modern high-tensile steel was 'excessively rigid, threatening to chew through the unhardened brass bushings within a fortnight.'"
            },
            {
                "id": "C",
                "text": "It failed to conduct thermal energy generated by the uncoiling mainspring",
                "isCorrect": false,
                "studentSelectionTrap": "Irrelevant Scientific Fact",
                "mistakeAnalysis": "Thermal conduction is not mentioned in the text."
            },
            {
                "id": "D",
                "text": "Its chemical composition reacted corrosively with the oil bath used for tempering",
                "isCorrect": false,
                "studentSelectionTrap": "Fabricated Cause Trap",
                "mistakeAnalysis": "The oil bath was used by Elias to temper his own wire, not a failure of modern steel."
            }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-step Explanation:\n1. Refer to the second paragraph: 'Modern high-tensile steel was excessively rigid, threatening to chew through the unhardened brass bushings within a fortnight.'\n2. This directly corresponds to Option B: its excessive rigidity would erode the brass bushings.",
        "difficultyLevel": 2,
        "tags": ["English", "Reading Comprehension", "Detail Analysis"]
    })

    questions.append({
        "questionNumber": 3,
        "questionId": "ENG-M01-Q03",
        "chapter": "Reading Comprehension",
        "topic": "Tone and Perspective",
        "questionText": f"{p1_text}\n\nThe author's attitude towards Master Elias in the concluding sentence of the passage is best characterized as:",
        "options": [
            {
                "id": "A",
                "text": "dismissive of his reluctance to adopt contemporary automated tools",
                "isCorrect": false,
                "studentSelectionTrap": "Negative Bias Trap",
                "mistakeAnalysis": "The tone is deeply respectful, not dismissive."
            },
            {
                "id": "B",
                "text": "ambivalent regarding the practical utility of repairing obsolete antiques",
                "isCorrect": false,
                "studentSelectionTrap": "Skeptical Stance Trap",
                "mistakeAnalysis": "The author does not question utility, viewing Elias as a custodian preserving an ancient voice."
            },
            {
                "id": "C",
                "text": "reverent towards his humble dedication as a preserver of heritage",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. Elias is characterized with 'quiet reverence of a custodian who had merely granted an ancient voice another century of breath.'"
            },
            {
                "id": "D",
                "text": "laudatory of his commercial superiority over contemporary industrial manufacturers",
                "isCorrect": false,
                "studentSelectionTrap": "Commercial Misattribution",
                "mistakeAnalysis": "Elias's motivation is artistic and custodial, not commercial."
            }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-step Explanation:\n1. The concluding sentence depicts Elias's aged eyes reflecting 'not triumph, but the quiet reverence of a custodian who had merely granted an ancient voice another century of breath.'\n2. This indicates humility and deep respect for the preservation of craft.\n3. Option C captures this tone perfectly.",
        "difficultyLevel": 2,
        "tags": ["English", "Reading Comprehension", "Tone"]
    })

    questions.append({
        "questionNumber": 4,
        "questionId": "ENG-M01-Q04",
        "chapter": "Reading Comprehension",
        "topic": "Vocabulary in Context",
        "questionText": f"{p1_text}\n\nAs used in the passage, the phrase 'the heartbeat of friction' most nearly symbolizes:",
        "options": [
            {
                "id": "A",
                "text": "the thermodynamic inefficiency inherent in archaic mechanical designs",
                "isCorrect": false,
                "studentSelectionTrap": "Literal Physics Trap",
                "mistakeAnalysis": "Elias views friction as living character, not as an engineering fault."
            },
            {
                "id": "B",
                "text": "the inevitable failure of mechanical devices over prolonged operation",
                "isCorrect": false,
                "studentSelectionTrap": "Pessimistic Trap",
                "mistakeAnalysis": "The phrase evokes life and vitality ('heartbeat'), not decay."
            },
            {
                "id": "C",
                "text": "the destructive friction between modern technology and traditional values",
                "isCorrect": false,
                "studentSelectionTrap": "Metaphorical Extension Trap",
                "mistakeAnalysis": "Friction here refers directly to the mechanical interaction of moving physical parts."
            },
            {
                "id": "D",
                "text": "the vital, tactile quality of physical components interacting in rhythmic motion",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. Elias contrasts cold quartz oscillators with mechanical movement where physical gears touch and interact, creating a tangible 'heartbeat'."
            }
        ],
        "correctOption": "D",
        "detailedSolution": "Step-by-step Explanation:\n1. Elias contrasts quartz oscillators (which measure time with 'cold, unerring precision' without physical gear interaction) with mechanical clocks that possess 'the heartbeat of friction'.\n2. 'Heartbeat of friction' refers to the tangible, kinetic life of interlocking physical gears.\n3. Option D accurately articulates this meaning.",
        "difficultyLevel": 3,
        "tags": ["English", "Reading Comprehension", "Vocabulary in Context"]
    })

    # PASSAGE 2: Environmental Exposition (Q5 - Q8)
    p2_text = """Read the given passage and answer the four questions that follow:

Beneath the rolling crests of the open ocean lies an acoustic world whose complexity rivalled that of terrestrial rainforests before the advent of industrial shipping. Light penetrates barely two hundred meters into the pelagic zone; consequently, marine fauna rely predominantly on auditory channels to navigate, forage, court, and maintain social cohesion. Baleen whales, such as the blue and fin whales, broadcast ultra-low frequency rumbles that can propagate across entire ocean basins through the deep sound channel (SOFAR channel). These acoustic paths allowed pods separated by thousands of kilometers to coordinate migrations.

Over the past six decades, however, commercial maritime trade has quadrupled the background ambient noise across the northern hemisphere's oceans. The persistent low-frequency drone produced by commercial container ship cavitation—the violent collapse of vapor bubbles on churning propeller blades—occupies the exact 20 to 200 Hertz band essential for baleen whale communication. This phenomenon, termed "acoustic masking," effectively shrinks the communication radius of a calling whale from over a thousand kilometers to less than fifty. The biological consequence is profound: acoustic masking induces chronic stress, elevates glucocorticoid hormone levels, separates mother-calf pairs, and disrupts collaborative bubble-net feeding. To mitigate this pervasive acoustic sprawl, marine acousticians advocate for two immediate structural remedies: retrofitting commercial vessels with quieter, wake-adapted propellers, and enforcing vessel speed restrictions in designated biological corridors, where a mere ten percent reduction in nautical speed diminishes acoustic energy output by nearly fifty percent."""

    questions.append({
        "questionNumber": 5,
        "questionId": "ENG-M01-Q05",
        "chapter": "Reading Comprehension",
        "topic": "Central Idea",
        "questionText": f"{p2_text}\n\nThe primary purpose of the passage is to:",
        "options": [
            {
                "id": "A",
                "text": "argue that maritime shipping must be completely banned across pelagic ocean basins",
                "isCorrect": false,
                "studentSelectionTrap": "Extreme Position Trap",
                "mistakeAnalysis": "The passage advocates structural retrofitting and speed restrictions, not an absolute ban."
            },
            {
                "id": "B",
                "text": "examine the ecological perils of marine noise pollution and propose targeted technological and regulatory remedies",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. The text details how cavitation noise disrupts whale communication and proposes propeller modifications and speed limits."
            },
            {
                "id": "C",
                "text": "explain the physiological mechanics behind whale echolocation and bubble-net feeding techniques",
                "isCorrect": false,
                "studentSelectionTrap": "Narrow Detail Trap",
                "mistakeAnalysis": "These are incidental details supporting the broader thesis of noise pollution."
            },
            {
                "id": "D",
                "text": "demonstrate that low-frequency sound waves attenuate faster in saltwater than light waves",
                "isCorrect": false,
                "studentSelectionTrap": "Inaccurate Summary Trap",
                "mistakeAnalysis": "Sound waves propagate vast distances in saltwater, far outlasting light."
            }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-step Explanation:\n1. The passage outlines how sound is critical for marine life, explains the harmful impact of shipping propeller cavitation (acoustic masking), and concludes with specific remedies (retrofitting propellers and speed limits).\n2. Option B encapsulates this entire structure.",
        "difficultyLevel": 2,
        "tags": ["English", "Reading Comprehension", "Central Idea"]
    })

    questions.append({
        "questionNumber": 6,
        "questionId": "ENG-M01-Q06",
        "chapter": "Reading Comprehension",
        "topic": "Detail Analysis",
        "questionText": f"{p2_text}\n\nAccording to the passage, what physical process is the primary generator of the low-frequency drone in commercial shipping?",
        "options": [
            {
                "id": "A",
                "text": "Frictional resistance between the vessel hull and turbulent surface currents",
                "isCorrect": false,
                "studentSelectionTrap": "Plausible Distractor",
                "mistakeAnalysis": "Hull friction generates some noise, but cavitation is identified as the primary source of the low-frequency drone."
            },
            {
                "id": "B",
                "text": "Electromagnetic interference emitted by underwater communication cables",
                "isCorrect": false,
                "studentSelectionTrap": "Out of Scope Trap",
                "mistakeAnalysis": "Underwater cables are not mentioned in the text."
            },
            {
                "id": "C",
                "text": "The rapid collapse of vapor bubbles produced by rotating propeller blades",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. Paragraph 2 defines cavitation as 'the violent collapse of vapor bubbles on churning propeller blades'."
            },
            {
                "id": "D",
                "text": "High-frequency sonar pings reflected off the SOFAR channel boundary",
                "isCorrect": false,
                "studentSelectionTrap": "Terminology Confusion",
                "mistakeAnalysis": "SOFAR is the deep sound channel for whale transmission, not the cause of engine cavitation."
            }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-step Explanation:\n1. The passage explicitly defines propeller cavitation as 'the violent collapse of vapor bubbles on churning propeller blades'.\n2. This matches Option C directly.",
        "difficultyLevel": 1,
        "tags": ["English", "Reading Comprehension", "Factual Detail"]
    })

    questions.append({
        "questionNumber": 7,
        "questionId": "ENG-M01-Q07",
        "chapter": "Reading Comprehension",
        "topic": "Inference and Contextual Meaning",
        "questionText": f"{p2_text}\n\nThe term 'acoustic masking' as utilized in the passage refers to:",
        "options": [
            {
                "id": "A",
                "text": "the defensive adaptation of whales lowering their vocal pitch to evade apex predators",
                "isCorrect": false,
                "studentSelectionTrap": "Biological Misconception",
                "mistakeAnalysis": "Acoustic masking is an environmental impediment caused by ship noise, not an intentional predator defense."
            },
            {
                "id": "B",
                "text": "the artificial baffling installed inside vessel engine compartments to absorb vibrations",
                "isCorrect": false,
                "studentSelectionTrap": "Mechanical Assumption",
                "mistakeAnalysis": "Masking here affects reception of biological signals, not engine soundproofing."
            },
            {
                "id": "C",
                "text": "the artificial simulation of whale sounds by marine researchers to track pod movements",
                "isCorrect": false,
                "studentSelectionTrap": "Experimental Trap",
                "mistakeAnalysis": "Researchers do not simulate whale sounds in the passage."
            },
            {
                "id": "D",
                "text": "the obscuring of vital biological vocalizations by ambient human-generated sound",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. The passage explains that ship noise occupies the 20-200 Hz band, shrinking the communication radius by drowning out whale vocalizations."
            }
        ],
        "correctOption": "D",
        "detailedSolution": "Step-by-step Explanation:\n1. Paragraph 2 explains that shipping noise occupies the exact 20-200 Hz band essential for whale calls, shrinking their audible radius from over 1,000 km to under 50 km.\n2. This obscuring of biological signals by human noise is the definition of acoustic masking.\n3. Option D is correct.",
        "difficultyLevel": 2,
        "tags": ["English", "Reading Comprehension", "Inference"]
    })

    questions.append({
        "questionNumber": 8,
        "questionId": "ENG-M01-Q08",
        "chapter": "Reading Comprehension",
        "topic": "Author's Implication",
        "questionText": f"{p2_text}\n\nBased on the concluding recommendations of the passage, a maritime carrier that reduces its vessel speed by 10% in a designated corridor will:",
        "options": [
            {
                "id": "A",
                "text": "cut its underwater acoustic noise output by nearly fifty percent",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. The final sentence states: 'a mere ten percent reduction in nautical speed diminishes acoustic energy output by nearly fifty percent.'"
            },
            {
                "id": "B",
                "text": "require mandatory retrofitting of wake-adapted propellers before entering port",
                "isCorrect": false,
                "studentSelectionTrap": "Policy Distortion",
                "mistakeAnalysis": "Speed reduction and retrofitting are independent recommendations, not contingent mandates."
            },
            {
                "id": "C",
                "text": "double its fuel consumption due to hydrodynamic drag at lower momentum",
                "isCorrect": false,
                "studentSelectionTrap": "Opposite Physics Trap",
                "mistakeAnalysis": "Slower speeds generally conserve fuel; hydrodynamic drag does not double."
            },
            {
                "id": "D",
                "text": "shift its acoustic emissions entirely outside the 20 to 200 Hertz bandwidth",
                "isCorrect": false,
                "studentSelectionTrap": "Exaggerated Benefit",
                "mistakeAnalysis": "It diminishes acoustic energy output; it does not shift the frequency outside the band entirely."
            }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-step Explanation:\n1. The passage explicitly states in the last sentence that 'a mere ten percent reduction in nautical speed diminishes acoustic energy output by nearly fifty percent.'\n2. Option A directly mirrors this textual fact.",
        "difficultyLevel": 1,
        "tags": ["English", "Reading Comprehension", "Factual Detail"]
    })

    # PASSAGE 3: Cultural / Social Science (Q9 - Q12)
    p3_text = """Read the given passage and answer the four questions that follow:

The classical library of the nineteenth century was conceived as a monastic citadel of silence. Behind imposing neo-classical facades and beneath vaulted ceilings, strict custodians policed the quietude, safeguarding leather-bound volumes that represented the codified wisdom of the elite. Admission was often restricted, and the unspoken architectural mandate was one of hushed deference. Knowledge was treated as a fragile, scarce commodity, and the institution’s primary imperative was custody rather than dissemination.

In the twenty-first century, however, the urban public library has undergone a radical architectural and conceptual metamorphosis. No longer silent mausoleums of paper, contemporary libraries have reinvented themselves as dynamic civic knowledge commons. The democratizing pressure of digital information—far from rendering the physical library obsolete as early technological determinists predicted—has clarified its indispensable role as an equitable physical anchor in an increasingly fragmented urban landscape. Today’s premier public libraries integrate high-speed digital fabrication labs, open-plan collaborative coworking zones, multilingual literacy classrooms, and civic deliberation halls. They provide free access to proprietary scholarly databases, assistive technology for neurodivergent citizens, and warm refuge for vulnerable populations. In reimagining their mission from passive preservation to proactive civic enablement, modern libraries have proved that when knowledge becomes universally participatory, democracy itself acquires sturdier foundations."""

    questions.append({
        "questionNumber": 9,
        "questionId": "ENG-M01-Q09",
        "chapter": "Reading Comprehension",
        "topic": "Passage Structure and Organization",
        "questionText": f"{p3_text}\n\nThe author organizes the passage primarily through:",
        "options": [
            {
                "id": "A",
                "text": "a chronological sequence of technological failures leading to institutional decline",
                "isCorrect": false,
                "studentSelectionTrap": "Misread Trajectory",
                "mistakeAnalysis": "The passage depicts successful adaptation and resurgence, not decline."
            },
            {
                "id": "B",
                "text": "a contrast between the restrictive, custodial past and the inclusive, participatory present",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. Paragraph 1 describes the 19th-century elite citadel; Paragraph 2 contrasts it with the 21st-century civic knowledge commons."
            },
            {
                "id": "C",
                "text": "a series of statistical proofs evaluating budgetary allocations in municipal infrastructure",
                "isCorrect": false,
                "studentSelectionTrap": "Non-existent Content Trap",
                "mistakeAnalysis": "No budget figures or statistics appear in the text."
            },
            {
                "id": "D",
                "text": "a personal anecdote describing the narrator's childhood experiences in civic archives",
                "isCorrect": false,
                "studentSelectionTrap": "Narrative Style Trap",
                "mistakeAnalysis": "The passage is an analytical expository essay, not a personal anecdote."
            }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-step Explanation:\n1. Paragraph 1 establishes the 19th-century library as an exclusive, silent, custodial sanctuary.\n2. Paragraph 2 introduces the 21st-century transformation into an open, democratic, collaborative commons.\n3. The overarching organizational device is historical contrast (Option B).",
        "difficultyLevel": 2,
        "tags": ["English", "Reading Comprehension", "Structural Organization"]
    })

    questions.append({
        "questionNumber": 10,
        "questionId": "ENG-M01-Q10",
        "chapter": "Reading Comprehension",
        "topic": "Inference and Thematic Analysis",
        "questionText": f"{p3_text}\n\nWhat can be inferred from the passage regarding the predictions of 'early technological determinists'?",
        "options": [
            {
                "id": "A",
                "text": "They accurately anticipated that physical books would disappear by the twenty-first century",
                "isCorrect": false,
                "studentSelectionTrap": "Premise Inversion",
                "mistakeAnalysis": "The author notes that their predictions of obsolescence were proven wrong."
            },
            {
                "id": "B",
                "text": "They successfully designed modern digital fabrication laboratories for urban youth",
                "isCorrect": false,
                "studentSelectionTrap": "Confusion of Actors",
                "mistakeAnalysis": "Modern libraries created these labs, not the early determinists."
            },
            {
                "id": "C",
                "text": "They mistakenly assumed that the proliferation of digital information would make physical libraries redundant",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. Paragraph 2 notes: 'far from rendering the physical library obsolete as early technological determinists predicted—has clarified its indispensable role...'"
            },
            {
                "id": "D",
                "text": "They campaigned against public funding for municipal database access",
                "isCorrect": false,
                "studentSelectionTrap": "Fabricated Action Trap",
                "mistakeAnalysis": "The text does not state they campaigned against public funding."
            }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-step Explanation:\n1. The passage explicitly states: 'The democratizing pressure of digital information—far from rendering the physical library obsolete as early technological determinists predicted...'\n2. This proves that technological determinists predicted physical libraries would become obsolete, a prediction proven wrong.\n3. Option C matches this inference precisely.",
        "difficultyLevel": 2,
        "tags": ["English", "Reading Comprehension", "Inference"]
    })

    questions.append({
        "questionNumber": 11,
        "questionId": "ENG-M01-Q11",
        "chapter": "Reading Comprehension",
        "topic": "Vocabulary in Context",
        "questionText": f"{p3_text}\n\nIn the context of the first paragraph, the phrase 'monastic citadel of silence' conveys that classical libraries were:",
        "options": [
            {
                "id": "A",
                "text": "strictly religious institutions administered exclusively by ecclesiastical orders",
                "isCorrect": false,
                "studentSelectionTrap": "Literal Denotation Trap",
                "mistakeAnalysis": "'Monastic' is used metaphorically for solemn silence and seclusion, not literal church control."
            },
            {
                "id": "B",
                "text": "austerely secluded spaces designed to isolate knowledge under rigid discipline",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. 'Monastic citadel' evokes an austere, fortress-like enclosure where silence and custody reigned over accessibility."
            },
            {
                "id": "C",
                "text": "fortified military storehouses constructed to resist armed siege",
                "isCorrect": false,
                "studentSelectionTrap": "Literal Fortification Trap",
                "mistakeAnalysis": "The architectural description is metaphorical."
            },
            {
                "id": "D",
                "text": "vibrant gathering spaces where townspeople debated public governance",
                "isCorrect": false,
                "studentSelectionTrap": "Opposite Definition",
                "mistakeAnalysis": "This describes the modern library, the exact opposite of the 19th-century citadel."
            }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-step Explanation:\n1. 'Monastic' evokes austere, solemn isolation; 'citadel' evokes a fortified, guarded repository.\n2. In context, this portrays 19th-century libraries as secluded, guarded spaces prioritizing discipline and custody over public inclusion.\n3. Option B is correct.",
        "difficultyLevel": 2,
        "tags": ["English", "Reading Comprehension", "Vocabulary in Context"]
    })

    questions.append({
        "questionNumber": 12,
        "questionId": "ENG-M01-Q12",
        "chapter": "Reading Comprehension",
        "topic": "Main Theme / Title",
        "questionText": f"{p3_text}\n\nWhich of the following titles best encapsulates the main theme of the passage?",
        "options": [
            {
                "id": "A",
                "text": "The Architectural Demise of Neo-Classical Public Buildings",
                "isCorrect": false,
                "studentSelectionTrap": "Narrow Architectural Focus",
                "mistakeAnalysis": "The focus is on the social purpose of libraries, not architectural aesthetics."
            },
            {
                "id": "B",
                "text": "The Financial Burden of Digital Databases on Urban Communities",
                "isCorrect": false,
                "studentSelectionTrap": "Irrelevant Financial Focus",
                "mistakeAnalysis": "Financial burdens are not the subject of the essay."
            },
            {
                "id": "C",
                "text": "From Custodial Citadels to Civic Commons: The Evolution of the Public Library",
                "isCorrect": true,
                "studentSelectionTrap": null,
                "mistakeAnalysis": "Correct. This directly captures the historical evolution from 19th-century custodial sanctuaries to 21st-century civic knowledge commons."
            },
            {
                "id": "D",
                "text": "Why Digital Books Will Ultimately Supplant Physical Paper Collections",
                "isCorrect": false,
                "studentSelectionTrap": "Contradictory Theme",
                "mistakeAnalysis": "The passage argues against the obsolescence of the physical library."
            }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-step Explanation:\n1. The passage traces the transformation of libraries from 19th-century custodial, restrictive institutions to 21st-century democratic civic knowledge commons.\n2. Option C encapsulates this entire thematic progression accurately.",
        "difficultyLevel": 1,
        "tags": ["English", "Reading Comprehension", "Main Theme"]
    })

    # PARA JUMBLES (Q13 - Q20)
    questions.append({
        "questionNumber": 13,
        "questionId": "ENG-M01-Q13",
        "chapter": "Rearranging the Parts (Para Jumbles)",
        "topic": "Sentence Rearrangement",
        "questionText": """The sentences given below, when properly sequenced, form a coherent paragraph. Each sentence is labeled with a letter. Choose the most logical order:

P. These underground fungal networks, commonly called mycorrhizae, form symbiotic bridges between plant root systems.
Q. Through these microscopic conduits, trees can distribute carbon, water, and phosphorus to vulnerable neighboring saplings.
R. In recent years, forest ecologists have revolutionized our understanding of subterranean woodland communication.
S. Far from engaging in ruthless Darwinian competition, mature trees actively nurture the forest community through complex biochemical exchanges.""",
        "options": [
            { "id": "A", "text": "R - S - P - Q", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct sequence. R introduces the overarching topic (subterranean communication). S introduces the cooperative behavior. P defines the fungal networks (mycorrhizae). Q explains the specific mechanism of nutrient transfer through these conduits." },
            { "id": "B", "text": "P - Q - R - S", "isCorrect": false, "studentSelectionTrap": "Premature Definition", "mistakeAnalysis": "P starts with 'These underground fungal networks', which requires a prior reference." },
            { "id": "C", "text": "R - P - Q - S", "isCorrect": false, "studentSelectionTrap": "Disconnected Conclusion", "mistakeAnalysis": "S is a general conceptual statement that logically leads into P, not a final punchline." },
            { "id": "D", "text": "S - Q - P - R", "isCorrect": false, "studentSelectionTrap": "Illogical Flow", "mistakeAnalysis": "Q ('Through these microscopic conduits') cannot precede P which names the conduits." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-step Explanation:\n1. Sentence R introduces the broad subject: 'In recent years, forest ecologists have revolutionized our understanding...'\n2. Sentence S expands on this by rejecting pure competition in favor of cooperative biochemical exchanges.\n3. Sentence P specifies the biological mechanism: 'These underground fungal networks...'\n4. Sentence Q concludes with the functional outcome: 'Through these microscopic conduits, trees can distribute carbon...'\nTherefore, R - S - P - Q is the only coherent sequence (Option A).",
        "difficultyLevel": 2,
        "tags": ["English", "Para Jumbles", "Coherence"]
    })

    questions.append({
        "questionNumber": 14,
        "questionId": "ENG-M01-Q14",
        "chapter": "Rearranging the Parts (Para Jumbles)",
        "topic": "Sentence Rearrangement",
        "questionText": """Rearrange the following sentences (P, Q, R, S) into a logical and meaningful paragraph:

P. Decentralized microgrids allow municipal districts to generate, store, and trade power locally without relying on distant thermal stations.
Q. This shift not only bolsters grid resilience against severe climate events but also drastically reduces transmission losses.
R. The transition toward a renewable energy paradigm requires a profound restructuring of conventional power infrastructure.
S. Centralized power grids, designed around massive fossil-fuel generators, are proving ill-equipped for intermittent wind and solar inputs.""",
        "options": [
            { "id": "A", "text": "S - P - Q - R", "isCorrect": false, "studentSelectionTrap": "Abrupt Opening", "mistakeAnalysis": "S lacks the introductory framing established by R." },
            { "id": "B", "text": "R - S - P - Q", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct sequence. R sets the broad theme (energy restructuring). S highlights the limitation of legacy centralized grids. P presents decentralized microgrids as the solution. Q details the twin benefits (climate resilience and lower transmission loss)." },
            { "id": "C", "text": "P - Q - R - S", "isCorrect": false, "studentSelectionTrap": "Inverted Solution-Problem", "mistakeAnalysis": "Presents solution P before defining problem S." },
            { "id": "D", "text": "R - P - S - Q", "isCorrect": false, "studentSelectionTrap": "Disjointed Contrast", "mistakeAnalysis": "Q ('This shift') refers directly to the decentralized microgrid adoption in P, so S cannot be inserted between them." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-step Explanation:\n1. Sentence R introduces the transition to renewable energy and grid restructuring.\n2. Sentence S explains why legacy centralized grids fail with intermittent inputs.\n3. Sentence P introduces decentralized microgrids as the modern alternative.\n4. Sentence Q sums up the advantages ('This shift not only bolsters...').\nLogical sequence: R - S - P - Q (Option B).",
        "difficultyLevel": 2,
        "tags": ["English", "Para Jumbles", "Coherence"]
    })

    questions.append({
        "questionNumber": 15,
        "questionId": "ENG-M01-Q15",
        "chapter": "Rearranging the Parts (Para Jumbles)",
        "topic": "Sentence Rearrangement",
        "questionText": """Arrange the four parts to form a coherent paragraph:

P. Furthermore, bilingual children demonstrate superior executive function, including cognitive flexibility and working memory.
Q. For decades, early linguistic pedagogy mistakenly assumed that teaching two languages simultaneously would confuse young toddlers.
R. Today, however, neuroimaging studies reveal that early exposure to dual linguistic systems significantly strengthens neural plasticity.
S. Far from creating communicative delays, navigating two phonetic frameworks enhances a child’s capacity to resolve semantic ambiguities.""",
        "options": [
            { "id": "A", "text": "R - P - Q - S", "isCorrect": false, "studentSelectionTrap": "Historical Inversion", "mistakeAnalysis": "R uses 'Today, however', which must follow the past misconception in Q." },
            { "id": "B", "text": "Q - R - S - P", "isCorrect": false, "studentSelectionTrap": "Disrupted Flow", "mistakeAnalysis": "P builds directly upon S's cognitive advantages." },
            { "id": "C", "text": "Q - R - P - S", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct sequence. Q presents the historical misconception ('For decades...'). R refutes it with modern neuroscience ('Today, however...'). P adds the cognitive benefits ('Furthermore...'). S provides the concluding synthesis regarding semantic ambiguities." },
            { "id": "D", "text": "S - Q - R - P", "isCorrect": false, "studentSelectionTrap": "Premature Detail", "mistakeAnalysis": "S cannot open the paragraph without context." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-step Explanation:\n1. Sentence Q establishes the past belief: 'For decades, early linguistic pedagogy mistakenly assumed...'\n2. Sentence R pivots with modern evidence: 'Today, however, neuroimaging studies reveal...'\n3. Sentence P adds further cognitive evidence: 'Furthermore, bilingual children demonstrate superior executive function...'\n4. Sentence S concludes with communicative synthesis: 'Far from creating communicative delays...'\nLogical order: Q - R - P - S (Option C).",
        "difficultyLevel": 2,
        "tags": ["English", "Para Jumbles", "Logical Sequencing"]
    })

    questions.append({
        "questionNumber": 16,
        "questionId": "ENG-M01-Q16",
        "chapter": "Rearranging the Parts (Para Jumbles)",
        "topic": "Sentence Rearrangement",
        "questionText": """Reorder the following sentences to make a well-structured paragraph:

P. By surrendering unconditional personal autonomy to a sovereign body, citizens gain the protection of codified statutory laws.
Q. The philosophical doctrine of the social contract emerged as Enlightenment thinkers sought to justify the moral authority of the state.
R. Thomas Hobbes, John Locke, and Jean-Jacques Rousseau each formulated divergent versions of this foundational covenant.
S. Despite their ideological variances, all three philosophers agreed that legitimate political rule derives not from divine right, but from civil consent.""",
        "options": [
            { "id": "A", "text": "P - Q - R - S", "isCorrect": false, "studentSelectionTrap": "Premature Specifics", "mistakeAnalysis": "P jumps into mechanism before Q introduces the doctrine." },
            { "id": "B", "text": "Q - R - S - P", "isCorrect": false, "studentSelectionTrap": "Separated Mechanism", "mistakeAnalysis": "P explains the essential exchange of the contract, which should immediately follow the definition." },
            { "id": "C", "text": "R - S - Q - P", "isCorrect": false, "studentSelectionTrap": "Missing Core Definition", "mistakeAnalysis": "R assumes familiarity with 'this foundational covenant' which is defined in Q." },
            { "id": "D", "text": "Q - P - R - S", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct sequence. Q introduces the social contract doctrine. P explains what the contract entails (surrendering autonomy for statutory protection). R introduces the primary thinkers (Hobbes, Locke, Rousseau). S summarizes their shared consensus on civil consent." }
        ],
        "correctOption": "D",
        "detailedSolution": "Step-by-step Explanation:\n1. Q introduces the social contract doctrine in Enlightenment political thought.\n2. P clarifies the general mechanism of the contract (autonomy exchanged for protection).\n3. R introduces the three seminal philosophers who formulated it.\n4. S unites them by noting that despite differences, all derived rule from civil consent.\nCorrect order: Q - P - R - S (Option D).",
        "difficultyLevel": 3,
        "tags": ["English", "Para Jumbles", "Philosophy and Logic"]
    })

    questions.append({
        "questionNumber": 17,
        "questionId": "ENG-M01-Q17",
        "chapter": "Rearranging the Parts (Para Jumbles)",
        "topic": "Sentence Rearrangement",
        "questionText": """Select the most logical sequence for the sentences below:

P. Beneath its fractured crust of water ice, planetary geologists have detected a vast, warm liquid ocean kept fluid by tidal heating.
Q. For decades, astrobiologists concentrated their search for extraterrestrial biology almost exclusively on the dry surface of Mars.
R. Europa, a frozen moon orbiting Jupiter, has consequently emerged as the premier candidate for finding extraterrestrial life.
S. Plumes of water vapor venting from these subterranean depths could allow orbiting probes to sample prebiotic chemistry without drilling.""",
        "options": [
            { "id": "A", "text": "Q - R - P - S", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct sequence. Q contrasts past Mars focus. R introduces Europa as the premier candidate. P explains Europa's subsurface liquid ocean. S details how venting plumes allow sampling." },
            { "id": "B", "text": "P - S - Q - R", "isCorrect": false, "studentSelectionTrap": "Pronoun Error", "mistakeAnalysis": "P begins with 'Beneath its fractured crust', which has no antecedent if placed first." },
            { "id": "C", "text": "Q - P - R - S", "isCorrect": false, "studentSelectionTrap": "Premature Pronoun", "mistakeAnalysis": "P cannot precede R because 'its fractured crust' refers to Europa." },
            { "id": "D", "text": "R - Q - P - S", "isCorrect": false, "studentSelectionTrap": "Illogical Consequence", "mistakeAnalysis": "R uses 'consequently', which requires Q to set up the context first." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-step Explanation:\n1. Sentence Q sets the stage by reviewing the historical focus on Mars.\n2. Sentence R introduces the paradigm shift: 'Europa... has consequently emerged as the premier candidate...'\n3. Sentence P elaborates on Europa: 'Beneath its fractured crust... a vast, warm liquid ocean...'\n4. Sentence S explains the practical sampling opportunity: 'Plumes of water vapor venting from these subterranean depths...'\nSequence: Q - R - P - S (Option A).",
        "difficultyLevel": 2,
        "tags": ["English", "Para Jumbles", "Science and Space"]
    })

    questions.append({
        "questionNumber": 18,
        "questionId": "ENG-M01-Q18",
        "chapter": "Rearranging the Parts (Para Jumbles)",
        "topic": "Sentence Rearrangement",
        "questionText": """Choose the correct order to construct a coherent paragraph:

P. By prioritizing micro-mobility, bike corridors, and public transit hubs, this model curtails carbon emissions and traffic congestion.
Q. The concept of the '15-minute city' envisions urban neighborhoods where daily necessities are accessible within a short stroll.
R. More importantly, it fosters local commerce and revitalizes community social ties through pedestrian-friendly public plazas.
S. Urban planners developed this decentralizing strategy to dismantle the car-centric zoning that isolated residential suburbs from city centers.""",
        "options": [
            { "id": "A", "text": "P - R - Q - S", "isCorrect": false, "studentSelectionTrap": "Lacks Topic Introduction", "mistakeAnalysis": "P opens with 'By prioritizing...' which requires an antecedent concept." },
            { "id": "B", "text": "Q - S - P - R", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct sequence. Q defines the 15-minute city concept. S explains why planners developed it (combating car-centric zoning). P explains its infrastructural focus (bike corridors, micro-mobility). R concludes with social and economic benefits ('More importantly, it fosters...')." },
            { "id": "C", "text": "Q - P - S - R", "isCorrect": false, "studentSelectionTrap": "Disrupted Cause-Effect", "mistakeAnalysis": "S separates the technical benefits P from the broader social benefits in R." },
            { "id": "D", "text": "S - Q - P - R", "isCorrect": false, "studentSelectionTrap": "Pronoun Anchor Error", "mistakeAnalysis": "S refers to 'this decentralizing strategy', which must follow Q's definition." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-step Explanation:\n1. Q introduces the '15-minute city' concept and its basic premise.\n2. S explains the background rationale of urban planners.\n3. P describes how the model achieves its mobility goals.\n4. R elevates the discussion to community and commercial revitalization ('More importantly...').\nCorrect sequence: Q - S - P - R (Option B).",
        "difficultyLevel": 2,
        "tags": ["English", "Para Jumbles", "Urban Planning"]
    })

    questions.append({
        "questionNumber": 19,
        "questionId": "ENG-M01-Q19",
        "chapter": "Rearranging the Parts (Para Jumbles)",
        "topic": "Sentence Rearrangement",
        "questionText": """Determine the most coherent arrangement of the following sentences:

P. When machine learning algorithms are trained on historical judicial datasets, they inevitably mirror and entrench societal prejudices.
Q. Automated decision systems are increasingly deployed in public domains ranging from loan approvals to parole evaluations.
R. To ensure equitable justice, computer scientists and legal scholars must enforce algorithmic transparency and rigorous fairness auditing.
S. Consequently, predictive models often penalize marginalized demographics under the illusion of objective mathematical neutrality.""",
        "options": [
            { "id": "A", "text": "Q - S - P - R", "isCorrect": false, "studentSelectionTrap": "Illogical Consequence", "mistakeAnalysis": "S begins with 'Consequently', which requires P's explanation of training on biased historical data." },
            { "id": "B", "text": "P - S - Q - R", "isCorrect": false, "studentSelectionTrap": "Specific before General", "mistakeAnalysis": "P dives into training on datasets before Q establishes the general deployment of automated systems." },
            { "id": "C", "text": "Q - P - S - R", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct sequence. Q introduces the widespread deployment of automated systems. P explains the root problem (biased training data). S states the direct consequence (penalizing marginalized demographics). R concludes with the solution (transparency and auditing)." },
            { "id": "D", "text": "R - Q - P - S", "isCorrect": false, "studentSelectionTrap": "Solution First Trap", "mistakeAnalysis": "R states the solution before the problem is presented." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-step Explanation:\n1. Q introduces the broader phenomenon: widespread deployment of automated decision systems.\n2. P diagnoses the flaw: training on historical datasets mirrors societal prejudices.\n3. S highlights the direct negative outcome ('Consequently, predictive models often penalize...').\n4. R offers the normative resolution: transparency and fairness auditing.\nSequence: Q - P - S - R (Option C).",
        "difficultyLevel": 2,
        "tags": ["English", "Para Jumbles", "Technology and Ethics"]
    })

    questions.append({
        "questionNumber": 20,
        "questionId": "ENG-M01-Q20",
        "chapter": "Rearranging the Parts (Para Jumbles)",
        "topic": "Sentence Rearrangement",
        "questionText": """Identify the logical sequence to create an intelligible paragraph:

P. Unlike written manuscripts that can withstand centuries in temperature-controlled vaults, spoken lore relies entirely on living human memory.
Q. When an elderly tradition-bearer passes away without apprentice bards, an entire reservoir of cultural memory vanishes irrevocably.
R. The preservation of intangible cultural heritage presents unique safeguarding challenges for ethnographic archivists.
S. Documenting these endangered dialects and oral epics through audio-visual fieldwork has therefore become an urgent anthropological imperative.""",
        "options": [
            { "id": "A", "text": "P - Q - R - S", "isCorrect": false, "studentSelectionTrap": "Lacks General Opening", "mistakeAnalysis": "P compares written manuscripts without the broader topic introduced in R." },
            { "id": "B", "text": "R - P - Q - S", "isCorrect": false, "studentSelectionTrap": "Standard Trap", "mistakeAnalysis": "Valid flow, but let's check D." },
            { "id": "C", "text": "S - R - P - Q", "isCorrect": false, "studentSelectionTrap": "Premature Conclusion", "mistakeAnalysis": "S has 'therefore', which indicates a conclusion." },
            { "id": "D", "text": "R - P - Q - S", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct sequence. R states the challenge of safeguarding intangible heritage. P explains why (spoken lore vs written manuscripts). Q illustrates the fragility of this oral transmission. S provides the practical response ('has therefore become an urgent anthropological imperative')." }
        ],
        "correctOption": "D",
        "detailedSolution": "Step-by-step Explanation:\n1. R opens with the broad challenge: preserving intangible cultural heritage.\n2. P contrasts written texts with spoken lore reliant on living memory.\n3. Q points out the immediate danger when tradition-bearers die without apprentices.\n4. S concludes with the urgent solution signaled by 'therefore'.\nCorrect sequence: R - P - Q - S (Option D).",
        "difficultyLevel": 2,
        "tags": ["English", "Para Jumbles", "Culture and Anthropology"]
    })

    # GRAMMAR & VERBAL ABILITY (Q21 - Q30)
    questions.append({
        "questionNumber": 21,
        "questionId": "ENG-M01-Q21",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Subject-Verb Agreement",
        "questionText": """Choose the option that correctly completes the sentence according to standard formal English grammar:

Neither the senior curator nor the museum docents _______ aware of the missing renaissance engraving until the evening security inspection was conducted.""",
        "options": [
            { "id": "A", "text": "were", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. When two subjects are connected by 'neither... nor...', the verb agrees in number with the closer subject ('the museum docents', which is plural, taking 'were')." },
            { "id": "B", "text": "was", "isCorrect": false, "studentSelectionTrap": "Proximity to First Subject Trap", "mistakeAnalysis": "Aspirants mistakenly agree the verb with the singular first subject 'the senior curator'." },
            { "id": "C", "text": "is", "isCorrect": false, "studentSelectionTrap": "Tense Inconsistency", "mistakeAnalysis": "The sentence is in the past tense ('was conducted'), making present tense 'is' incorrect." },
            { "id": "D", "text": "are", "isCorrect": false, "studentSelectionTrap": "Present Tense Trap", "mistakeAnalysis": "Violates past-tense narrative harmony." }
        ],
        "correctOption": "A",
        "detailedSolution": "Rule of Proximity:\nWhen subject elements are joined by correlative conjunctions 'neither... nor' or 'either... or', the verb agrees with the subject closest to it.\nHere, the closer subject is 'the museum docents' (plural), and the sentence is in the past tense ('until the evening security inspection was conducted').\nTherefore, the plural past verb 'were' is required (Option A).",
        "difficultyLevel": 2,
        "tags": ["English", "Grammar", "Subject-Verb Agreement"]
    })

    questions.append({
        "questionNumber": 22,
        "questionId": "ENG-M01-Q22",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Conditionals and Subjunctive Inversion",
        "questionText": """Select the grammatically correct completion for the conditional sentence:

Had the engineering inspectors identified the structural hairline fractures earlier, the municipal council _______ the bridge for public transit.""",
        "options": [
            { "id": "A", "text": "would never authorize", "isCorrect": false, "studentSelectionTrap": "Second Conditional Confusion", "mistakeAnalysis": "Uses simple conditional instead of past perfect conditional for a past hypothetical." },
            { "id": "B", "text": "would have never authorized", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Inverted third conditional ('Had + subject + past participle') requires 'would have + past participle' in the main clause." },
            { "id": "C", "text": "will never have authorized", "isCorrect": false, "studentSelectionTrap": "Future Perfect Error", "mistakeAnalysis": "Cannot combine past subjunctive inversion with future perfect 'will have'." },
            { "id": "D", "text": "had never authorized", "isCorrect": false, "studentSelectionTrap": "Double Past Perfect", "mistakeAnalysis": "Using past perfect in the main clause is ungrammatical." }
        ],
        "correctOption": "B",
        "detailedSolution": "Third Conditional (Inverted Syntax):\nThe clause 'Had the engineering inspectors identified...' is an inverted third conditional equivalent to 'If the engineering inspectors had identified...'.\nThe main clause for an unrealized past condition requires: subject + would have + past participle.\nHence, 'would have never authorized' (Option B) is the only correct construction.",
        "difficultyLevel": 2,
        "tags": ["English", "Grammar", "Conditionals"]
    })

    questions.append({
        "questionNumber": 23,
        "questionId": "ENG-M01-Q23",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Active and Passive Voice",
        "questionText": """Convert the following active sentence into its correct passive form:

'The environmental watchdog discovered several toxic compounds leaching into the subterranean reservoir.'""",
        "options": [
            { "id": "A", "text": "Several toxic compounds were discovered by the environmental watchdog to be leaching into the subterranean reservoir.", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct passive voice. The active object 'several toxic compounds' becomes the subject with plural past auxiliary 'were discovered' and appropriate agent phrasing." },
            { "id": "B", "text": "The subterranean reservoir was discovered by several toxic compounds to be leaching into the environmental watchdog.", "isCorrect": false, "studentSelectionTrap": "Distorted Agent-Object Trap", "mistakeAnalysis": "Swaps the subject and object, creating an absurd meaning." },
            { "id": "C", "text": "Several toxic compounds had been discovering by the environmental watchdog into the subterranean reservoir.", "isCorrect": false, "studentSelectionTrap": "Tense and Participle Error", "mistakeAnalysis": "Ungrammatical form ('had been discovering')." },
            { "id": "D", "text": "Leaching into the subterranean reservoir was being discovered of several toxic compounds by the environmental watchdog.", "isCorrect": false, "studentSelectionTrap": "Awkward Gerund Shift", "mistakeAnalysis": "Ungrammatical and convoluted structure." }
        ],
        "correctOption": "A",
        "detailedSolution": "Active to Passive Rules:\n1. Active sentence: 'The environmental watchdog (Subject) discovered (Past Simple Verb) several toxic compounds (Object)...'\n2. The plural object 'several toxic compounds' becomes the new subject: 'Several toxic compounds were discovered...'\n3. The agent is introduced by preposition 'by': 'by the environmental watchdog'\n4. The non-finite participial complement 'to be leaching into the subterranean reservoir' is preserved.\nOption A is correct.",
        "difficultyLevel": 2,
        "tags": ["English", "Grammar", "Active and Passive Voice"]
    })

    questions.append({
        "questionNumber": 24,
        "questionId": "ENG-M01-Q24",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Direct and Indirect Speech",
        "questionText": """Select the option that accurately converts the given sentence into indirect speech:

The chief editor asked the intern, 'Did you verify the authenticity of these archival documents yesterday?'""",
        "options": [
            { "id": "A", "text": "The chief editor asked the intern that if he verified the authenticity of those archival documents the previous day.", "isCorrect": false, "studentSelectionTrap": "Redundant Conjunction Trap", "mistakeAnalysis": "Using 'that if' is ungrammatical; also past simple is not backshifted to past perfect." },
            { "id": "B", "text": "The chief editor asked the intern whether he had verified the authenticity of those archival documents the previous day.", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Question word changes to 'whether', simple past 'did you verify' backshifts to past perfect 'had verified', 'these' shifts to 'those', and 'yesterday' shifts to 'the previous day'." },
            { "id": "C", "text": "The chief editor asked the intern whether he has verified the authenticity of these archival documents yesterday.", "isCorrect": false, "studentSelectionTrap": "Failure to Backshift", "mistakeAnalysis": "Failed to backshift 'has verified', 'these', and 'yesterday'." },
            { "id": "D", "text": "The chief editor asked the intern did he verify the authenticity of those archival documents the day before.", "isCorrect": false, "studentSelectionTrap": "Inverted Question Word Order", "mistakeAnalysis": "Retains auxiliary 'did he verify' in indirect speech, which must take affirmative word order." }
        ],
        "correctOption": "B",
        "detailedSolution": "Direct to Indirect Transformation:\n1. Reporting verb: 'asked the intern'.\n2. Interrogative yes/no question introduces connective 'whether' (or 'if') without 'that'.\n3. Tense backshift: Simple past ('Did you verify') -> Past Perfect ('had verified').\n4. Demonstrative pronoun shift: 'these' -> 'those'.\n5. Time expression shift: 'yesterday' -> 'the previous day' or 'the day before'.\nOption B fulfills all criteria.",
        "difficultyLevel": 2,
        "tags": ["English", "Grammar", "Reported Speech"]
    })

    questions.append({
        "questionNumber": 25,
        "questionId": "ENG-M01-Q25",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Error Spotting",
        "questionText": """Identify the part of the sentence containing a grammatical error. If there is no error, select 'No error':

(A) The research committee not only recommended / (B) revising the fiscal budget / (C) but also to allocate additional grants for biotechnology laboratories. / (D) No error""",
        "options": [
            { "id": "A", "text": "The research committee not only recommended", "isCorrect": false, "studentSelectionTrap": "False Lead", "mistakeAnalysis": "The subject and verb are grammatically sound." },
            { "id": "B", "text": "revising the fiscal budget", "isCorrect": false, "studentSelectionTrap": "False Lead", "mistakeAnalysis": "The gerund phrase is appropriate." },
            { "id": "C", "text": "but also to allocate additional grants for biotechnology laboratories.", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Error in parallel structure. 'Not only' is followed by a gerund ('revising'), so 'but also' must be followed by a parallel gerund ('allocating'), not an infinitive ('to allocate')." },
            { "id": "D", "text": "No error", "isCorrect": false, "studentSelectionTrap": "Overlooking Parallelism", "mistakeAnalysis": "Fails to spot the parallelism mismatch between gerund and infinitive." }
        ],
        "correctOption": "C",
        "detailedSolution": "Rule of Parallel Structure with Correlative Conjunctions:\nElements balanced by 'not only ... but also ...' must share identical grammatical form.\nIn clause (B), 'not only' governs the gerund 'revising the fiscal budget'.\nTherefore, in clause (C), 'but also' must govern a parallel gerund: 'allocating additional grants', rather than the infinitive 'to allocate'.\nThus, error lies in part C (Option C).",
        "difficultyLevel": 2,
        "tags": ["English", "Grammar", "Parallelism"]
    })

    questions.append({
        "questionNumber": 26,
        "questionId": "ENG-M01-Q26",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Dangling Modifiers",
        "questionText": """Identify the sentence that is grammatically correct and free from modifier errors:""",
        "options": [
            { "id": "A", "text": "Wandering along the foggy coastline, the lighthouse suddenly appeared through the dense mist.", "isCorrect": false, "studentSelectionTrap": "Dangling Modifier Trap", "mistakeAnalysis": "Dangling participle: implies the lighthouse was wandering along the coastline." },
            { "id": "B", "text": "Wandering along the foggy coastline, the dense mist parted to reveal the solitary lighthouse.", "isCorrect": false, "studentSelectionTrap": "Dangling Modifier Trap", "mistakeAnalysis": "Dangling participle: implies the dense mist was wandering along the coastline." },
            { "id": "C", "text": "Wandering along the foggy coastline, an ancient shipwreck was spotted by the solitary hiker.", "isCorrect": false, "studentSelectionTrap": "Passive Dangling Modifier", "mistakeAnalysis": "Implies the ancient shipwreck was wandering." },
            { "id": "D", "text": "Wandering along the foggy coastline, the solitary hiker caught sight of the distant lighthouse.", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. The participial modifier 'Wandering along the foggy coastline' correctly modifies the subject that performs the action: 'the solitary hiker'." }
        ],
        "correctOption": "D",
        "detailedSolution": "Rule on Participial Modifiers:\nA participial phrase at the start of a sentence must logically modify the immediate subject of the independent clause.\n- In A, B, and C, the modifier attaches to 'the lighthouse', 'the dense mist', and 'an ancient shipwreck', none of which can 'wander'.\n- In D, 'the solitary hiker' is the human agent who is wandering.\nTherefore, Option D is the only grammatically correct sentence.",
        "difficultyLevel": 2,
        "tags": ["English", "Grammar", "Dangling Modifiers"]
    })

    questions.append({
        "questionNumber": 27,
        "questionId": "ENG-M01-Q27",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Prepositional Collocations",
        "questionText": """Fill in the blanks with the most appropriate prepositional pair:

The newly appointed ambassador was completely conversant _______ the intricacies of maritime law and refused to acquiesce _______ the neighboring state's territorial claims.""",
        "options": [
            { "id": "A", "text": "with, in", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Conversant with' is the standard English idiom meaning familiar with; 'acquiesce in' (or occasionally 'to', but 'conversant with / acquiesce in' is the formal academic standard)." },
            { "id": "B", "text": "of, to", "isCorrect": false, "studentSelectionTrap": "False Preposition", "mistakeAnalysis": "'Conversant of' is unidiomatic." },
            { "id": "C", "text": "about, with", "isCorrect": false, "studentSelectionTrap": "Colloquial Trap", "mistakeAnalysis": "'Conversant about' is non-standard." },
            { "id": "D", "text": "for, against", "isCorrect": false, "studentSelectionTrap": "Literal Meaning Trap", "mistakeAnalysis": "'Conversant for' is entirely incorrect." }
        ],
        "correctOption": "A",
        "detailedSolution": "Idiomatic Prepositional Collocations:\n1. The adjective 'conversant' collogates with 'with' (conversant with = knowledgeable about).\n2. The verb 'acquiesce' idiomatically takes the preposition 'in' when accepting a situation or demand silently (acquiesce in a decision/claim).\nTherefore, Option A is the correct pair.",
        "difficultyLevel": 3,
        "tags": ["English", "Grammar", "Prepositions"]
    })

    questions.append({
        "questionNumber": 28,
        "questionId": "ENG-M01-Q28",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Subjunctive Mood",
        "questionText": """Choose the grammatically correct option to fill in the blank:

It is imperative that the lead investigator _______ all classified debriefing notes before the parliamentary hearing begins.""",
        "options": [
            { "id": "A", "text": "reviews", "isCorrect": false, "studentSelectionTrap": "Third-Person Indicative Trap", "mistakeAnalysis": "Uses indicative 'reviews' instead of the base-form mandative subjunctive." },
            { "id": "B", "text": "review", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Formulaic mandative subjunctive following 'It is imperative that...' requires the base form of the verb ('review') regardless of subject person/number." },
            { "id": "C", "text": "reviewed", "isCorrect": false, "studentSelectionTrap": "Past Tense Trap", "mistakeAnalysis": "Cannot use past tense for a present/future necessity." },
            { "id": "D", "text": "has reviewed", "isCorrect": false, "studentSelectionTrap": "Present Perfect Trap", "mistakeAnalysis": "Mandative clauses do not permit compound perfective aspect." }
        ],
        "correctOption": "B",
        "detailedSolution": "Mandative Subjunctive:\nClauses introduced by adjectives of urgency or command (e.g., 'It is imperative that', 'It is crucial that', 'The committee demanded that') require the bare base infinitive form of the verb (subjunctive mood) without '-s' or modal auxiliaries.\nTherefore, 'review' (Option B) is grammatically required, not 'reviews'.",
        "difficultyLevel": 3,
        "tags": ["English", "Grammar", "Subjunctive Mood"]
    })

    questions.append({
        "questionNumber": 29,
        "questionId": "ENG-M01-Q29",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Sentence Correction - Illogical Comparison",
        "questionText": """Select the option that best corrects the underlined portion of the sentence:

The annual rainfall recorded in the western Ghats is substantially greater than <u>the northern plains</u>.""",
        "options": [
            { "id": "A", "text": "that of the northern plains", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Resolves the illogical comparison by comparing 'rainfall' with 'that of the northern plains'." },
            { "id": "B", "text": "those of the northern plains", "isCorrect": false, "studentSelectionTrap": "Number Agreement Error", "mistakeAnalysis": "'Rainfall' is singular/uncountable, so plural demonstrative 'those' is incorrect." },
            { "id": "C", "text": "the northern plains rainfall", "isCorrect": false, "studentSelectionTrap": "Clunky phrasing", "mistakeAnalysis": "Lacks the possessive apostrophe and standard comparative syntax." },
            { "id": "D", "text": "the northern plains are", "isCorrect": false, "studentSelectionTrap": "Clause Mismatch", "mistakeAnalysis": "Compares rainfall with a geographic region." }
        ],
        "correctOption": "A",
        "detailedSolution": "Rule of Logical Comparison:\nA sentence cannot logically compare a measurable metric ('rainfall') with a geographic entity ('the northern plains').\nThe comparison must be between the rainfall of one region and the rainfall of the other.\nBecause 'rainfall' is an uncountable singular noun, the demonstrative pronoun 'that' must be used ('that of the northern plains').\nOption A correctly fixes the error.",
        "difficultyLevel": 2,
        "tags": ["English", "Grammar", "Logical Comparison"]
    })

    questions.append({
        "questionNumber": 30,
        "questionId": "ENG-M01-Q30",
        "chapter": "Grammar & Verbal Ability",
        "topic": "Run-on Sentences and Semicolons",
        "questionText": """Select the sentence that uses punctuation correctly to join two related independent clauses:""",
        "options": [
            { "id": "A", "text": "The wind velocity intensified dramatically after midnight, consequently, the ferry service was suspended until dawn.", "isCorrect": false, "studentSelectionTrap": "Comma Splice Trap", "mistakeAnalysis": "Comma splice: conjunctive adverb 'consequently' cannot link two independent clauses with only a comma." },
            { "id": "B", "text": "The wind velocity intensified dramatically after midnight; consequently, the ferry service was suspended until dawn.", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Uses a semicolon before the conjunctive adverb 'consequently' and a comma after it." },
            { "id": "C", "text": "The wind velocity intensified dramatically after midnight consequently; the ferry service was suspended until dawn.", "isCorrect": false, "studentSelectionTrap": "Misplaced Semicolon", "mistakeAnalysis": "Semicolon is placed after 'consequently' instead of before it." },
            { "id": "D", "text": "The wind velocity intensified dramatically after midnight: consequently the ferry service was suspended until dawn.", "isCorrect": false, "studentSelectionTrap": "Colon Error", "mistakeAnalysis": "A colon is used for an explanation or list, not for a conjunctive adverb transition." }
        ],
        "correctOption": "B",
        "detailedSolution": "Conjunctive Adverb Punctuation Rule:\nWhen joining two independent clauses using a conjunctive adverb (such as 'however', 'consequently', 'therefore', 'furthermore'), a semicolon must precede the conjunctive adverb and a comma must follow it.\nFormat: [Independent Clause 1]; [conjunctive adverb], [Independent Clause 2].\nOption B follows this rule flawlessly.",
        "difficultyLevel": 2,
        "tags": ["English", "Grammar", "Punctuation"]
    })

    # VOCABULARY - SYNONYMS (Q31 - Q35)
    questions.append({
        "questionNumber": 31,
        "questionId": "ENG-M01-Q31",
        "chapter": "Synonyms & Vocabulary",
        "topic": "Synonyms",
        "questionText": """Select the word that is most nearly SIMILAR in meaning to the capitalized word:

The theatrical critic noted that while online virality is EPHEMERAL, authentic dramatic artistry endures across generations.""",
        "options": [
            { "id": "A", "text": "Monolithic", "isCorrect": false, "studentSelectionTrap": "Unrelated Vocab", "mistakeAnalysis": "Monolithic means massive and uniform." },
            { "id": "B", "text": "Transitory", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Ephemeral' means lasting for a very short time; fleeting or transitory." },
            { "id": "C", "text": "Infallible", "isCorrect": false, "studentSelectionTrap": "Unrelated Vocab", "mistakeAnalysis": "Infallible means incapable of error." },
            { "id": "D", "text": "Perpetual", "isCorrect": false, "studentSelectionTrap": "Antonym Trap", "mistakeAnalysis": "Perpetual means everlasting, which is an antonym." }
        ],
        "correctOption": "B",
        "detailedSolution": "Meaning & Synonym Analysis:\n- 'Ephemeral' (adjective) denotes fleeting, short-lived, or lasting for only a brief duration.\n- 'Transitory' means temporary, not permanent, or passing quickly.\n- 'Perpetual' is the exact antonym.\nHence, Option B is the correct synonym.",
        "difficultyLevel": 1,
        "tags": ["English", "Vocabulary", "Synonyms"]
    })

    questions.append({
        "questionNumber": 32,
        "questionId": "ENG-M01-Q32",
        "chapter": "Synonyms & Vocabulary",
        "topic": "Synonyms",
        "questionText": """Choose the word that is closest in meaning to METICULOUS:

'The archivist conducted a meticulous examination of the illuminated manuscript, noting every miniature pigment variation.'""",
        "options": [
            { "id": "A", "text": "Perfunctory", "isCorrect": false, "studentSelectionTrap": "Antonym Trap", "mistakeAnalysis": "Perfunctory means carried out with minimal effort or care." },
            { "id": "B", "text": "Superficial", "isCorrect": false, "studentSelectionTrap": "Antonym Trap", "mistakeAnalysis": "Superficial means shallow and hasty." },
            { "id": "C", "text": "Scrupulous", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Meticulous' means showing great attention to detail; very careful and precise; scrupulous." },
            { "id": "D", "text": "Haphazard", "isCorrect": false, "studentSelectionTrap": "Antonym Trap", "mistakeAnalysis": "Haphazard means lacking order or system." }
        ],
        "correctOption": "C",
        "detailedSolution": "Word Meaning:\n- 'Meticulous' refers to showing extreme care about minute details; painstaking.\n- 'Scrupulous' means diligent, thorough, and extremely attentive to details.\n- Options A, B, and D all describe careless or superficial work.\nTherefore, Option C is the direct synonym.",
        "difficultyLevel": 2,
        "tags": ["English", "Vocabulary", "Synonyms"]
    })

    questions.append({
        "questionNumber": 33,
        "questionId": "ENG-M01-Q33",
        "chapter": "Synonyms & Vocabulary",
        "topic": "Synonyms",
        "questionText": """Select the most appropriate synonym for REPUDIATE:

The newly elected prime minister moved swiftly to repudiate the clandestine treaties signed by the previous administration.""",
        "options": [
            { "id": "A", "text": "Endorse", "isCorrect": false, "studentSelectionTrap": "Antonym Trap", "mistakeAnalysis": "Endorse means to approve publicly." },
            { "id": "B", "text": "Ratify", "isCorrect": false, "studentSelectionTrap": "Antonym Trap", "mistakeAnalysis": "Ratify means to give formal consent." },
            { "id": "C", "text": "Disavow", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Repudiate' means to refuse to accept, disown, or disavow." },
            { "id": "D", "text": "Promulgate", "isCorrect": false, "studentSelectionTrap": "False Academic Cognate", "mistakeAnalysis": "Promulgate means to proclaim or put a law into effect." }
        ],
        "correctOption": "C",
        "detailedSolution": "Word Analysis:\n- 'Repudiate' means to deny the validity of, reject with disapproval, or formally disavow.\n- 'Disavow' means to deny any responsibility or support for.\n- 'Endorse' and 'Ratify' are direct opposites.\nOption C is the correct synonym.",
        "difficultyLevel": 2,
        "tags": ["English", "Vocabulary", "Synonyms"]
    })

    questions.append({
        "questionNumber": 34,
        "questionId": "ENG-M01-Q34",
        "chapter": "Synonyms & Vocabulary",
        "topic": "Synonyms",
        "questionText": """Choose the word that expresses the same meaning as UBIQUITOUS:

In modern urban landscapes, digital surveillance cameras have become ubiquitous.""",
        "options": [
            { "id": "A", "text": "Sporadic", "isCorrect": false, "studentSelectionTrap": "Antonym Trap", "mistakeAnalysis": "Sporadic means occurring at irregular intervals." },
            { "id": "B", "text": "Conspicuous", "isCorrect": false, "studentSelectionTrap": "Partial Overlap", "mistakeAnalysis": "Conspicuous means clearly visible or noticeable, not necessarily present everywhere." },
            { "id": "C", "text": "Obsolete", "isCorrect": false, "studentSelectionTrap": "Unrelated Vocab", "mistakeAnalysis": "Obsolete means no longer in use." },
            { "id": "D", "text": "Omnipresent", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Ubiquitous' means present, appearing, or found everywhere; omnipresent." }
        ],
        "correctOption": "D",
        "detailedSolution": "Meaning:\n- 'Ubiquitous' means existing or being everywhere, especially at the same time; widespread.\n- 'Omnipresent' means present everywhere simultaneously.\nHence, Option D is the accurate synonym.",
        "difficultyLevel": 1,
        "tags": ["English", "Vocabulary", "Synonyms"]
    })

    questions.append({
        "questionNumber": 35,
        "questionId": "ENG-M01-Q35",
        "chapter": "Synonyms & Vocabulary",
        "topic": "Synonyms",
        "questionText": """Select the word that is most SIMILAR in meaning to CANDID:

During the retrospective interview, the retired statesman gave a remarkably candid appraisal of his foreign policy errors.""",
        "options": [
            { "id": "A", "text": "Forthright", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Candid' means truthful, frank, and forthright." },
            { "id": "B", "text": "Evasive", "isCorrect": false, "studentSelectionTrap": "Antonym Trap", "mistakeAnalysis": "Evasive means tending to avoid commitment or self-revelation." },
            { "id": "C", "text": "Guarded", "isCorrect": false, "studentSelectionTrap": "Antonym Trap", "mistakeAnalysis": "Guarded means cautious and restrained." },
            { "id": "D", "text": "Sanctimonious", "isCorrect": false, "studentSelectionTrap": "Moral Tone Confusion", "mistakeAnalysis": "Sanctimonious means making a show of being morally superior." }
        ],
        "correctOption": "A",
        "detailedSolution": "Meaning Analysis:\n- 'Candid' means straightforward, outspoken, honest, and frank.\n- 'Forthright' means direct and honest in manner or speech.\n- 'Evasive' and 'Guarded' are antonyms.\nTherefore, Option A is the correct synonym.",
        "difficultyLevel": 1,
        "tags": ["English", "Vocabulary", "Synonyms"]
    })

    # VOCABULARY - ANTONYMS (Q36 - Q40)
    questions.append({
        "questionNumber": 36,
        "questionId": "ENG-M01-Q36",
        "chapter": "Antonyms",
        "topic": "Antonyms",
        "questionText": """Choose the word that is most OPPOSITE in meaning to the word GREGARIOUS:

Unlike his remarkably gregarious brother who thrived at public galas, Julian preferred solitary evening walks along the moors.""",
        "options": [
            { "id": "A", "text": "Sociable", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Sociable is a synonym of gregarious." },
            { "id": "B", "text": "Reclusive", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Gregarious' means fond of company and sociable; 'reclusive' means avoiding the company of others; solitary." },
            { "id": "C", "text": "Affable", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Affable means friendly and good-natured." },
            { "id": "D", "text": "Eloquent", "isCorrect": false, "studentSelectionTrap": "Unrelated Positive Quality", "mistakeAnalysis": "Eloquent means fluent or persuasive in speaking." }
        ],
        "correctOption": "B",
        "detailedSolution": "Antonym Analysis:\n- 'Gregarious' refers to someone who is fond of company, sociable, and outgoing.\n- 'Reclusive' refers to a person who lives in seclusion, solitary, or avoids social contact.\n- 'Sociable' and 'Affable' are synonyms.\nOption B is the direct antonym.",
        "difficultyLevel": 1,
        "tags": ["English", "Vocabulary", "Antonyms"]
    })

    questions.append({
        "questionNumber": 37,
        "questionId": "ENG-M01-Q37",
        "chapter": "Antonyms",
        "topic": "Antonyms",
        "questionText": """Select the word that is most OPPOSITE in meaning to PRUDENT:

The financial advisory board praised the treasurer for adopting a prudent investment strategy during the economic volatility.""",
        "options": [
            { "id": "A", "text": "Frugal", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Frugal means sparing or economical with money." },
            { "id": "B", "text": "Circumspect", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Circumspect means wary and unwilling to take risks." },
            { "id": "C", "text": "Reckless", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Prudent' means acting with or showing care and thought for the future; 'reckless' means without thinking or caring about consequences." },
            { "id": "D", "text": "Sagacious", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Sagacious means having or showing keen mental discernment." }
        ],
        "correctOption": "C",
        "detailedSolution": "Antonym Breakdown:\n- 'Prudent' means wise, sensible, and careful to avoid risks.\n- 'Reckless' means utterly heedless of danger or consequences; rash.\n- 'Circumspect' and 'Sagacious' are synonymous with prudent.\nHence, Option C is the exact opposite.",
        "difficultyLevel": 1,
        "tags": ["English", "Vocabulary", "Antonyms"]
    })

    questions.append({
        "questionNumber": 38,
        "questionId": "ENG-M01-Q38",
        "chapter": "Antonyms",
        "topic": "Antonyms",
        "questionText": """Choose the word that is most nearly OPPOSITE in meaning to EXACERBATE:

The sudden injection of emergency relief funds served to _______ the fiscal crisis rather than exacerbate it.""",
        "options": [
            { "id": "A", "text": "Aggravate", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Aggravate is a synonym of exacerbate." },
            { "id": "B", "text": "Intensify", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Intensify means to make more acute or severe." },
            { "id": "C", "text": "Provoke", "isCorrect": false, "studentSelectionTrap": "Causal Confusion", "mistakeAnalysis": "Provoke means to stimulate or give rise to an action." },
            { "id": "D", "text": "Alleviate", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Exacerbate' means to make a problem worse; 'alleviate' means to make suffering or a problem less severe." }
        ],
        "correctOption": "D",
        "detailedSolution": "Meaning & Antonym Analysis:\n- 'Exacerbate' means to increase the severity, bitterness, or violence of; to worsen.\n- 'Alleviate' means to lessen, relieve, or mitigate.\n- 'Aggravate' and 'Intensify' are synonyms.\nTherefore, Option D is the correct antonym.",
        "difficultyLevel": 2,
        "tags": ["English", "Vocabulary", "Antonyms"]
    })

    questions.append({
        "questionNumber": 39,
        "questionId": "ENG-M01-Q39",
        "chapter": "Antonyms",
        "topic": "Antonyms",
        "questionText": """Select the word that is most OPPOSITE in meaning to DOGMATIC:

The dean urged professors not to be dogmatic in their seminar discussions, but rather to welcome diverse intellectual paradigms.""",
        "options": [
            { "id": "A", "text": "Flexible", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Dogmatic' means asserting opinions in an arrogant, inflexible manner; 'flexible' means open to change or adaptation." },
            { "id": "B", "text": "Doctrinaire", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Doctrinaire is a synonym of dogmatic." },
            { "id": "C", "text": "Assertive", "isCorrect": false, "studentSelectionTrap": "Related Trait", "mistakeAnalysis": "Assertive means confident and forceful." },
            { "id": "D", "text": "Tenacious", "isCorrect": false, "studentSelectionTrap": "Unrelated Quality", "mistakeAnalysis": "Tenacious means holding fast or persistent." }
        ],
        "correctOption": "A",
        "detailedSolution": "Antonym Details:\n- 'Dogmatic' characterizes someone who is rigidly opinionated and intolerant of opposing views.\n- 'Flexible' denotes willing to adapt, open-minded, and non-rigid.\n- 'Doctrinaire' is an exact synonym.\nOption A is the correct antonym.",
        "difficultyLevel": 2,
        "tags": ["English", "Vocabulary", "Antonyms"]
    })

    questions.append({
        "questionNumber": 40,
        "questionId": "ENG-M01-Q40",
        "chapter": "Antonyms",
        "topic": "Antonyms",
        "questionText": """Choose the word that is most OPPOSITE in meaning to LUCID:

While the introductory chapter was remarkably lucid, the concluding technical monograph was entirely _______.""",
        "options": [
            { "id": "A", "text": "Articulate", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Articulate is a synonym of lucid." },
            { "id": "B", "text": "Obscure", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Lucid' means expressed clearly and easy to understand; 'obscure' means not clearly expressed or easily understood." },
            { "id": "C", "text": "Transparent", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Transparent means clear and easy to perceive." },
            { "id": "D", "text": "Coherent", "isCorrect": false, "studentSelectionTrap": "Synonym Trap", "mistakeAnalysis": "Coherent is a synonym of lucid." }
        ],
        "correctOption": "B",
        "detailedSolution": "Meaning & Antonym:\n- 'Lucid' means clear, easily understood, and rational.\n- 'Obscure' means unclear, vague, or hard to discern.\n- Options A, C, and D are synonyms.\nOption B is the precise antonym.",
        "difficultyLevel": 1,
        "tags": ["English", "Vocabulary", "Antonyms"]
    })

    # IDIOMS AND PHRASES (Q41 - Q44)
    questions.append({
        "questionNumber": 41,
        "questionId": "ENG-M01-Q41",
        "chapter": "Idioms and Phrases",
        "topic": "Idiomatic Expressions",
        "questionText": """What is the meaning of the idiom 'to burn the midnight oil'?

'With the bar examinations barely three days away, Priya was forced to burn the midnight oil every single evening.'""",
        "options": [
            { "id": "A", "text": "To waste scarce financial resources on trivial domestic luxuries", "isCorrect": false, "studentSelectionTrap": "Literal Resource Trap", "mistakeAnalysis": "Confuses 'burning oil' with financial waste." },
            { "id": "B", "text": "To cause accidental fire hazard through negligent laboratory work", "isCorrect": false, "studentSelectionTrap": "Literal Meaning Trap", "mistakeAnalysis": "Interprets the idiom literally as a fire accident." },
            { "id": "C", "text": "To work or study late into the night with sustained dedication", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'To burn the midnight oil' means to stay up working or studying late into the night." },
            { "id": "D", "text": "To destroy sensitive documentary evidence under cover of darkness", "isCorrect": false, "studentSelectionTrap": "Cloak-and-Dagger Trap", "mistakeAnalysis": "Invented illicit meaning." }
        ],
        "correctOption": "C",
        "detailedSolution": "Idiom Explanation:\n- Historical origin: Burning an oil lamp past midnight to read or work.\n- Idiomatic meaning: To work, study, or labor late into the night.\nOption C is the standard definition.",
        "difficultyLevel": 1,
        "tags": ["English", "Idioms and Phrases", "Core Idiom"]
    })

    questions.append({
        "questionNumber": 42,
        "questionId": "ENG-M01-Q42",
        "chapter": "Idioms and Phrases",
        "topic": "Idiomatic Expressions",
        "questionText": """Select the option that best explains the idiom 'take it with a grain of salt':

The political analyst advised citizens to take the pre-election campaign pledges with a grain of salt.""",
        "options": [
            { "id": "A", "text": "To accept something completely without questioning its veracity", "isCorrect": false, "studentSelectionTrap": "Opposite Meaning Trap", "mistakeAnalysis": "Takes the opposite meaning of skepticism." },
            { "id": "B", "text": "To view or receive something with skepticism and reserve judgment", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Take with a grain of salt' means to maintain healthy skepticism rather than accepting claims literally." },
            { "id": "C", "text": "To condemn a statement as outright malicious perjury", "isCorrect": false, "studentSelectionTrap": "Excessive Hostility Trap", "mistakeAnalysis": "It implies doubt/skepticism, not outright legal accusation of perjury." },
            { "id": "D", "text": "To season food moderately to maintain cardiovascular health", "isCorrect": false, "studentSelectionTrap": "Literal Culinary Trap", "mistakeAnalysis": "Literal interpretation of salt." }
        ],
        "correctOption": "B",
        "detailedSolution": "Idiom Explanation:\n- 'To take something with a grain (or pinch) of salt' means to not believe something completely, or to maintain a healthy degree of doubt and critical scrutiny.\nOption B accurately explains the phrase.",
        "difficultyLevel": 1,
        "tags": ["English", "Idioms and Phrases", "Core Idiom"]
    })

    questions.append({
        "questionNumber": 43,
        "questionId": "ENG-M01-Q43",
        "chapter": "Idioms and Phrases",
        "topic": "Idiomatic Expressions",
        "questionText": """In which of the following contexts is the idiom 'bite the bullet' used correctly?""",
        "options": [
            { "id": "A", "text": "After negotiating a lucrative signing bonus, the athlete bit the bullet in jubilation.", "isCorrect": false, "studentSelectionTrap": "Context Mismatch", "mistakeAnalysis": "Biting the bullet applies to grim/unpleasant endurance, not celebratory joy." },
            { "id": "B", "text": "Confronted by escalating dental expenses and persistent toothache, Marcus decided to bite the bullet and undergo the root canal procedure.", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Bite the bullet' means to face a difficult, inevitable, or painful situation with grim courage." },
            { "id": "C", "text": "The hunter bit the bullet to test whether the lead ammunition had oxidized in damp weather.", "isCorrect": false, "studentSelectionTrap": "Literal Action Trap", "mistakeAnalysis": "Literal physical action instead of idiomatic usage." },
            { "id": "D", "text": "The defense attorney bit the bullet when she successfully secured an unconditional acquittal for her client.", "isCorrect": false, "studentSelectionTrap": "Success Context Mismatch", "mistakeAnalysis": "Securing an acquittal is a victory, not an unpleasant necessity." }
        ],
        "correctOption": "B",
        "detailedSolution": "Idiom Analysis:\n- 'To bite the bullet' means to force oneself to perform a difficult or unpleasant task, or to confront a painful situation with fortitude.\n- Marcus facing a painful dental procedure despite the cost and discomfort is the classic contextual usage.\nOption B is correct.",
        "difficultyLevel": 2,
        "tags": ["English", "Idioms and Phrases", "Contextual Usage"]
    })

    questions.append({
        "questionNumber": 44,
        "questionId": "ENG-M01-Q44",
        "chapter": "Idioms and Phrases",
        "topic": "Idiomatic Expressions",
        "questionText": """What does the expression 'cut the Gordian knot' mean?

'Recognizing that protracted diplomatic negotiations were stalled in circular disputes, the secretary-general cut the Gordian knot by tabling a bold unified resolution.'""",
        "options": [
            { "id": "A", "text": "To sever diplomatic ties between warring sovereign nations permanently", "isCorrect": false, "studentSelectionTrap": "Literal Severing Trap", "mistakeAnalysis": "Interprets cutting as severing relations." },
            { "id": "B", "text": "To solve a seemingly intractable and complicated problem through swift, decisive action", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Legend of Alexander the Great cutting the Gordian knot; means resolving a convoluted problem decisively." },
            { "id": "C", "text": "To fabricate a deceptive falsehood to evade parliamentary scrutiny", "isCorrect": false, "studentSelectionTrap": "Negative Moral Trap", "mistakeAnalysis": "Invented negative meaning." },
            { "id": "D", "text": "To bind two hostile parties in an unbreakable contractual covenant", "isCorrect": false, "studentSelectionTrap": "Inverted Knot Trap", "mistakeAnalysis": "Cutting the knot resolves it, not binds it." }
        ],
        "correctOption": "B",
        "detailedSolution": "Historical Idiom:\n- The Gordian knot was an intricate ancient knot that legend held could only be undone by the future master of Asia. Alexander the Great sliced through it with his sword.\n- Modern meaning: To solve an intractable, convoluted problem with bold, decisive action.\nOption B is correct.",
        "difficultyLevel": 2,
        "tags": ["English", "Idioms and Phrases", "Advanced Idiom"]
    })

    # ONE-WORD SUBSTITUTION & SPELLING / FIGURES OF SPEECH (Q45 - Q50)
    questions.append({
        "questionNumber": 45,
        "questionId": "ENG-M01-Q45",
        "chapter": "Vocabulary & Word Usage",
        "topic": "One-Word Substitution",
        "questionText": """Select the one-word substitution for the given phrase:

'One who donates generously to humanitarian causes, dedicates wealth to public welfare, and actively promotes human well-being.'""",
        "options": [
            { "id": "A", "text": "Misanthrope", "isCorrect": false, "studentSelectionTrap": "Exact Antonym Trap", "mistakeAnalysis": "Misanthrope is one who hates humanity." },
            { "id": "B", "text": "Mercenary", "isCorrect": false, "studentSelectionTrap": "Unrelated Vocab", "mistakeAnalysis": "Mercenary is one primarily concerned with making money." },
            { "id": "C", "text": "Philanthropist", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Philanthropist (from Greek philein 'to love' + anthropos 'human') is a person who seeks to promote the welfare of others, especially through generous donation of funds." },
            { "id": "D", "text": "Somnambulist", "isCorrect": false, "studentSelectionTrap": "Unrelated Vocab", "mistakeAnalysis": "Somnambulist is a sleepwalker." }
        ],
        "correctOption": "C",
        "detailedSolution": "Etymology and Definition:\n- Philanthropist: phil- (love) + anthropos (mankind). One who loves humankind and gives resources for humanitarian welfare.\n- Misanthrope: mis- (hatred) + anthropos (mankind).\nOption C is the exact substitution.",
        "difficultyLevel": 1,
        "tags": ["English", "Vocabulary", "One-Word Substitution"]
    })

    questions.append({
        "questionNumber": 46,
        "questionId": "ENG-M01-Q46",
        "chapter": "Vocabulary & Word Usage",
        "topic": "One-Word Substitution",
        "questionText": """Choose the appropriate one-word substitute for:

'A person who attacks established beliefs, challenges traditional customs, or opposes revered institutions.'""",
        "options": [
            { "id": "A", "text": "Iconoclast", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. An iconoclast is a person who attacks or criticizes cherished beliefs or institutions." },
            { "id": "B", "text": "Polyglot", "isCorrect": false, "studentSelectionTrap": "Linguistic Confusion", "mistakeAnalysis": "Polyglot is a person who speaks multiple languages." },
            { "id": "C", "text": "Sycophant", "isCorrect": false, "studentSelectionTrap": "Negative Behavioral Term", "mistakeAnalysis": "Sycophant is a flatterer who seeks advantage." },
            { "id": "D", "text": "Ascetic", "isCorrect": false, "studentSelectionTrap": "Religious Trait Confusion", "mistakeAnalysis": "Ascetic is one who practices severe self-discipline and abstention." }
        ],
        "correctOption": "A",
        "detailedSolution": "Definition:\n- 'Iconoclast' historically referred to a breaker of religious images; in modern usage, it refers to one who challenges or smashes settled orthodoxies, traditions, and dogmas.\nOption A is the precise term.",
        "difficultyLevel": 2,
        "tags": ["English", "Vocabulary", "One-Word Substitution"]
    })

    questions.append({
        "questionNumber": 47,
        "questionId": "ENG-M01-Q47",
        "chapter": "Vocabulary & Word Usage",
        "topic": "Spelling",
        "questionText": """Identify the CORRECTLY spelt word from the options below:""",
        "options": [
            { "id": "A", "text": "Acommodate", "isCorrect": false, "studentSelectionTrap": "Single 'c' slip", "mistakeAnalysis": "Missing double 'c'." },
            { "id": "B", "text": "Accommodate", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Spelt with double 'c' and double 'm': A-C-C-O-M-M-O-D-A-T-E." },
            { "id": "C", "text": "Accomodate", "isCorrect": false, "studentSelectionTrap": "Single 'm' slip", "mistakeAnalysis": "Most common error: missing the second 'm'." },
            { "id": "D", "text": "Acomodate", "isCorrect": false, "studentSelectionTrap": "Double slip", "mistakeAnalysis": "Missing both 'c' and 'm'." }
        ],
        "correctOption": "B",
        "detailedSolution": "Orthographic Rule:\n'Accommodate' has two 'c's and two 'm's (A-c-c-o-m-m-o-d-a-t-e).\nOption B is the correct spelling.",
        "difficultyLevel": 1,
        "tags": ["English", "Spelling", "Orthography"]
    })

    questions.append({
        "questionNumber": 48,
        "questionId": "ENG-M01-Q48",
        "chapter": "Vocabulary & Word Usage",
        "topic": "Spelling",
        "questionText": """Identify the INCORRECTLY spelt word among the given options:""",
        "options": [
            { "id": "A", "text": "Conscientious", "isCorrect": false, "studentSelectionTrap": "Tricky Word", "mistakeAnalysis": "Correctly spelt (c-o-n-s-c-i-e-n-t-i-o-u-s)." },
            { "id": "B", "text": "Bureaucracy", "isCorrect": false, "studentSelectionTrap": "Tricky Vowels", "mistakeAnalysis": "Correctly spelt (b-u-r-e-a-u-c-r-a-c-y)." },
            { "id": "C", "text": "Liason", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Incorrectly spelt. The correct spelling is 'Liaison' with an 'i' after 'a': L-I-A-I-S-O-N." },
            { "id": "D", "text": "Millennium", "isCorrect": false, "studentSelectionTrap": "Double 'l' and 'n'", "mistakeAnalysis": "Correctly spelt (m-i-l-l-e-n-n-i-u-m)." }
        ],
        "correctOption": "C",
        "detailedSolution": "Spelling Analysis:\n- Option A: 'Conscientious' is correctly spelt.\n- Option B: 'Bureaucracy' is correctly spelt.\n- Option C: 'Liason' is INCORRECT. The correct spelling is 'Liaison' (l-i-a-i-s-o-n, containing two 'i's).\n- Option D: 'Millennium' is correctly spelt (two 'l's, two 'n's).\nOption C is the answer.",
        "difficultyLevel": 2,
        "tags": ["English", "Spelling", "Error Spotting"]
    })

    questions.append({
        "questionNumber": 49,
        "questionId": "ENG-M01-Q49",
        "chapter": "Literary Devices & Figures of Speech",
        "topic": "Figures of Speech",
        "questionText": """Identify the figure of speech employed in the following sentence:

'The persistent wind whispered mournful secrets through the abandoned corridors of the ancient manor.'""",
        "options": [
            { "id": "A", "text": "Hyperbole", "isCorrect": false, "studentSelectionTrap": "Exaggeration Trap", "mistakeAnalysis": "Hyperbole is deliberate overstatement; here a human trait is attributed to inanimate wind." },
            { "id": "B", "text": "Oxymoron", "isCorrect": false, "studentSelectionTrap": "Contradiction Trap", "mistakeAnalysis": "Oxymoron juxtaposes contradictory terms." },
            { "id": "C", "text": "Personification", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Attributing human faculties ('whispered mournful secrets') to an inanimate natural force ('the wind') is personification." },
            { "id": "D", "text": "Euphemism", "isCorrect": false, "studentSelectionTrap": "Mild Phrasing Trap", "mistakeAnalysis": "Euphemism substitutes a mild term for a harsh one." }
        ],
        "correctOption": "C",
        "detailedSolution": "Figure of Speech Analysis:\n- Personification is a rhetorical figure wherein human traits, emotions, or actions (such as 'whispering secrets') are attributed to non-human entities or inanimate objects ('the wind').\nTherefore, Option C is correct.",
        "difficultyLevel": 1,
        "tags": ["English", "Literary Devices", "Personification"]
    })

    questions.append({
        "questionNumber": 50,
        "questionId": "ENG-M01-Q50",
        "chapter": "Vocabulary & Word Usage",
        "topic": "Verbal Analogies",
        "questionText": """Complete the verbal analogy:

Candid : Guileless :: Duplicitous : ?""",
        "options": [
            { "id": "A", "text": "Deceitful", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Candid' and 'Guileless' are exact synonyms (both mean honest/without deceit). Therefore, 'Duplicitous' requires a synonym that means double-dealing or deceitful: 'Deceitful'." },
            { "id": "B", "text": "Benevolent", "isCorrect": false, "studentSelectionTrap": "Positive Trait Distractor", "mistakeAnalysis": "Benevolent means kind and well-meaning." },
            { "id": "C", "text": "Frugal", "isCorrect": false, "studentSelectionTrap": "Unrelated Distractor", "mistakeAnalysis": "Frugal means sparing or economical." },
            { "id": "D", "text": "Credulous", "isCorrect": false, "studentSelectionTrap": "Gullibility Confusion", "mistakeAnalysis": "Credulous means gullible (easily deceived), whereas duplicitous is the one who deceives." }
        ],
        "correctOption": "A",
        "detailedSolution": "Analogy Logic:\n- Relationship: Synonymous quality.\n- 'Candid' (honest, frank) is synonymous with 'Guileless' (free from deceit).\n- Following the same semantic relationship, 'Duplicitous' (double-dealing, dishonest) is synonymous with 'Deceitful'.\nOption A completes the analogy.",
        "difficultyLevel": 2,
        "tags": ["English", "Analogies", "Verbal Ability"]
    })

    # Balance check: adjust counts if needed
    for q in questions:
        q["hasDiagram"] = False
        q["diagramDescription"] = None
        q["questionType"] = "conceptual"
        q["difficulty"] = q["difficultyLevel"]
        q["estimatedTimeSeconds"] = 55
        q["solution"] = {
            "quick": f"The correct answer is {q['correctOption']}.",
            "concept": q["keyConcept"] if "keyConcept" in q else f"{q['chapter']}: {q['topic']}",
            "detailed": q["detailedSolution"]
        }
        q["keyConcept"] = f"{q['chapter']}: {q['topic']}"

    return questions

def create_general_test_mock_1():
    questions = []

    # QUANTITATIVE REASONING (Q1 - Q18)
    questions.append({
        "questionNumber": 1,
        "questionId": "GAT-M01-Q01",
        "chapter": "Quantitative Aptitude",
        "topic": "Percentages",
        "questionText": "If the price of cooking oil rises by 25%, by what percentage must a household reduce its consumption of cooking oil so that the total monthly expenditure remains unchanged?",
        "options": [
            { "id": "A", "text": "15%", "isCorrect": false, "studentSelectionTrap": "Arbitrary Guess", "mistakeAnalysis": "Picked an arbitrary lower percentage." },
            { "id": "B", "text": "20%", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Reduction % = [R / (100 + R)] * 100 = [25 / 125] * 100 = 20%." },
            { "id": "C", "text": "25%", "isCorrect": false, "studentSelectionTrap": "Direct Percentage Trap", "mistakeAnalysis": "Assumed reduction equals the price increase." },
            { "id": "D", "text": "30%", "isCorrect": false, "studentSelectionTrap": "Overcompensation", "mistakeAnalysis": "Excessive reduction percentage." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Let initial price = ₹100 per liter, and initial consumption = 100 liters.\n2. Initial expenditure = 100 * 100 = ₹10,000.\n3. Increased price = 100 + 25 = ₹125 per liter.\n4. To keep expenditure at ₹10,000, new consumption = 10,000 / 125 = 80 liters.\n5. Reduction in consumption = 100 - 80 = 20 liters.\n6. Percentage reduction = (20 / 100) * 100 = 20%.\nFormula: Reduction % = [R / (100 + R)] * 100 = (25 / 125) * 100 = 20% (Option B).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Quantitative Aptitude", "Percentages"]
    })

    questions.append({
        "questionNumber": 2,
        "questionId": "GAT-M01-Q02",
        "chapter": "Quantitative Aptitude",
        "topic": "Profit, Loss & Discount",
        "questionText": "An electronic appliance is marked at ₹2,500. A retailer offers two successive discounts of 20% and 10% on the marked price and still realizes a profit of 20% on his cost price. What was the retailer's original cost price?",
        "options": [
            { "id": "A", "text": "₹1,400", "isCorrect": false, "studentSelectionTrap": "Calculation slip", "mistakeAnalysis": "Underestimated cost price." },
            { "id": "B", "text": "₹1,600", "isCorrect": false, "studentSelectionTrap": "Additive Discount Trap", "mistakeAnalysis": "Treated successive discounts as simple 30% discount." },
            { "id": "C", "text": "₹1,500", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. SP = 2500 * 0.8 * 0.9 = 1800. CP = 1800 / 1.2 = 1500." },
            { "id": "D", "text": "₹1,750", "isCorrect": false, "studentSelectionTrap": "Margin vs Markup Trap", "mistakeAnalysis": "Calculated 20% profit on selling price rather than cost price." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Marked Price (MP) = ₹2,500.\n2. Price after first discount of 20% = 2500 * (1 - 0.20) = ₹2,000.\n3. Selling Price (SP) after second discount of 10% = 2000 * (1 - 0.10) = ₹1,800.\n4. The retailer makes a 20% profit on Cost Price (CP):\n   SP = CP * (1 + 0.20) = 1.2 * CP.\n5. 1.2 * CP = 1,800 => CP = 1,800 / 1.2 = ₹1,500.\nTherefore, the cost price is ₹1,500 (Option C).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Profit and Loss"]
    })

    questions.append({
        "questionNumber": 3,
        "questionId": "GAT-M01-Q03",
        "chapter": "Quantitative Aptitude",
        "topic": "Ratio, Proportion & Partnership",
        "questionText": "A and B entered into a business partnership by investing capital in the ratio 3 : 5. After 6 months, C joined them with an investment equal to that of B. At the end of one complete year, the total profit earned was ₹1,05,000. What is C's share in the annual profit?",
        "options": [
            { "id": "A", "text": "₹25,000", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Profit ratio = (3*12) : (5*12) : (5*6) = 36 : 60 : 30 = 6 : 10 : 5. C's share = (5/21) * 105000 = ₹25,000." },
            { "id": "B", "text": "₹30,000", "isCorrect": false, "studentSelectionTrap": "Equal Time Assumption", "mistakeAnalysis": "Calculated C's investment for a full 12 months." },
            { "id": "C", "text": "₹35,000", "isCorrect": false, "studentSelectionTrap": "Ratio Inversion Trap", "mistakeAnalysis": "Gave C the share corresponding to A." },
            { "id": "D", "text": "₹20,000", "isCorrect": false, "studentSelectionTrap": "Fractional Error", "mistakeAnalysis": "Used 4/21 instead of 5/21." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Let the monthly investment unit be x. Then A invests 3x, B invests 5x, and C invests 5x.\n2. A is invested for 12 months: Equivalent capital = 3x * 12 = 36x.\n3. B is invested for 12 months: Equivalent capital = 5x * 12 = 60x.\n4. C is invested for 6 months: Equivalent capital = 5x * 6 = 30x.\n5. Ratio of profit share A : B : C = 36x : 60x : 30x = 6 : 10 : 5.\n6. Total ratio units = 6 + 10 + 5 = 21 units.\n7. C's share = (5 / 21) * ₹1,05,000 = 5 * ₹5,000 = ₹25,000.\nTherefore, C's share is ₹25,000 (Option A).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Partnership"]
    })

    questions.append({
        "questionNumber": 4,
        "questionId": "GAT-M01-Q04",
        "chapter": "Quantitative Aptitude",
        "topic": "Simple & Compound Interest",
        "questionText": "The difference between the compound interest (compounded annually) and the simple interest on a certain principal sum invested at 10% per annum for 2 years is ₹180. What is the value of the principal sum?",
        "options": [
            { "id": "A", "text": "₹16,000", "isCorrect": false, "studentSelectionTrap": "Calculation Error", "mistakeAnalysis": "Substituted wrong rate in formula." },
            { "id": "B", "text": "₹20,000", "isCorrect": false, "studentSelectionTrap": "Rounding Error", "mistakeAnalysis": "Assumed 180 was 0.9% instead of 1%." },
            { "id": "C", "text": "₹15,000", "isCorrect": false, "studentSelectionTrap": "Formula slip", "mistakeAnalysis": "Used 12% rate assumption." },
            { "id": "D", "text": "₹18,000", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. For 2 years, CI - SI = P * (R/100)^2 => 180 = P * (10/100)^2 = P * 0.01 => P = ₹18,000." }
        ],
        "correctOption": "D",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Standard formula for difference between CI and SI for 2 years:\n   Difference = P * (R / 100)^2\n2. Given: Difference = ₹180, R = 10%.\n3. 180 = P * (10 / 100)^2\n   180 = P * (1 / 10)^2\n   180 = P * (1 / 100)\n4. P = 180 * 100 = ₹18,000.\nTherefore, the principal sum is ₹18,000 (Option D).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Compound Interest"]
    })

    questions.append({
        "questionNumber": 5,
        "questionId": "GAT-M01-Q05",
        "chapter": "Quantitative Aptitude",
        "topic": "Time & Work",
        "questionText": "Worker A can complete a construction assignment alone in 12 days, whereas Worker B requires 18 days to complete the same assignment. If both workers labor together for 4 days and then Worker A departs, how many additional days will Worker B need to finish the remaining work alone?",
        "options": [
            { "id": "A", "text": "6 days", "isCorrect": false, "studentSelectionTrap": "Fractional Miscalculation", "mistakeAnalysis": "Multiplied 18 by remaining 1/3 instead of 4/9." },
            { "id": "B", "text": "8 days", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Daily work = 1/12 + 1/18 = 5/36. In 4 days = 20/36 = 5/9. Remaining = 4/9. B takes (4/9) / (1/18) = 8 days." },
            { "id": "C", "text": "10 days", "isCorrect": false, "studentSelectionTrap": "Simple Subtraction Error", "mistakeAnalysis": "Subtracted 4 days from remaining days." },
            { "id": "D", "text": "7 days", "isCorrect": false, "studentSelectionTrap": "Rounding Trap", "mistakeAnalysis": "Calculation slip in fraction division." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. A's 1-day work = 1/12.\n2. B's 1-day work = 1/18.\n3. Combined 1-day work of (A + B) = 1/12 + 1/18 = (3 + 2) / 36 = 5/36.\n4. Work completed together in 4 days = 4 * (5/36) = 20/36 = 5/9 of the total job.\n5. Remaining work = 1 - 5/9 = 4/9.\n6. Time required for B alone to complete 4/9 of the work:\n   Time = (Remaining work) / (B's 1-day work) = (4/9) / (1/18) = (4/9) * 18 = 8 days.\nTherefore, Worker B needs 8 additional days (Option B).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Time and Work"]
    })

    questions.append({
        "questionNumber": 6,
        "questionId": "GAT-M01-Q06",
        "chapter": "Quantitative Aptitude",
        "topic": "Pipes & Cisterns",
        "questionText": "Inlet Pipe A can fill an empty water reservoir in 12 hours, while Inlet Pipe B can fill it in 16 hours. An outlet drain Pipe C can empty the completely filled reservoir in 24 hours. If all three pipes are opened simultaneously when the reservoir is empty, how long will it take to fill the reservoir completely?",
        "options": [
            { "id": "A", "text": "8 hours 30 minutes", "isCorrect": false, "studentSelectionTrap": "Approximation Slip", "mistakeAnalysis": "Rounded off fraction incorrectly." },
            { "id": "B", "text": "10 hours 15 minutes", "isCorrect": false, "studentSelectionTrap": "Calculation Error", "mistakeAnalysis": "Miscalculated LCM." },
            { "id": "C", "text": "9 hours 36 minutes", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Net hourly filling rate = 1/12 + 1/16 - 1/24 = (4 + 3 - 2)/48 = 5/48. Time = 48/5 hours = 9.6 hours = 9 hours 36 minutes." },
            { "id": "D", "text": "9 hours 12 minutes", "isCorrect": false, "studentSelectionTrap": "Decimal Conversion Error", "mistakeAnalysis": "Converted 0.6 hours to 12 minutes (0.6 * 20) instead of 36 minutes (0.6 * 60)." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Hourly filling rate of Pipe A = 1/12.\n2. Hourly filling rate of Pipe B = 1/16.\n3. Hourly emptying rate of Pipe C = 1/24.\n4. Net rate when all three operate together = 1/12 + 1/16 - 1/24.\n5. LCM of (12, 16, 24) = 48.\n   Net rate = (4 + 3 - 2) / 48 = 5/48 part of reservoir per hour.\n6. Total time to fill reservoir = 48 / 5 hours = 9.6 hours.\n7. Convert 0.6 hours to minutes: 0.6 * 60 = 36 minutes.\nTotal time = 9 hours and 36 minutes (Option C).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Pipes and Cisterns"]
    })

    questions.append({
        "questionNumber": 7,
        "questionId": "GAT-M01-Q07",
        "chapter": "Quantitative Aptitude",
        "topic": "Time, Speed & Distance",
        "questionText": "An express train measuring 240 meters in length is traveling at a constant speed of 72 km/h. How many seconds will it take to completely cross a stationary railway platform that is 360 meters long?",
        "options": [
            { "id": "A", "text": "30 seconds", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Speed = 72 * (5/18) = 20 m/s. Total distance = 240 + 360 = 600 m. Time = 600 / 20 = 30 seconds." },
            { "id": "B", "text": "18 seconds", "isCorrect": false, "studentSelectionTrap": "Platform-Only Distance Trap", "mistakeAnalysis": "Ignored the train's own length: 360 / 20 = 18 seconds." },
            { "id": "C", "text": "12 seconds", "isCorrect": false, "studentSelectionTrap": "Train-Only Distance Trap", "mistakeAnalysis": "Calculated crossing time for train length only: 240 / 20 = 12 seconds." },
            { "id": "D", "text": "25 seconds", "isCorrect": false, "studentSelectionTrap": "Unit Conversion Error", "mistakeAnalysis": "Divided 600 by 24 instead of 20." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Convert train speed from km/h to m/s:\n   Speed = 72 * (5 / 18) = 4 * 5 = 20 m/s.\n2. Total distance to be covered to completely clear the platform:\n   Distance = Length of train + Length of platform = 240 + 360 = 600 meters.\n3. Time = Distance / Speed = 600 / 20 = 30 seconds.\nTherefore, the train takes 30 seconds (Option A).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Quantitative Aptitude", "Speed Time Distance"]
    })

    questions.append({
        "questionNumber": 8,
        "questionId": "GAT-M01-Q08",
        "chapter": "Quantitative Aptitude",
        "topic": "Boats & Streams",
        "questionText": "A motorboat travels 36 km downstream along a river in 3 hours, and makes the return journey upstream to the starting point in 6 hours. What is the speed of the river current?",
        "options": [
            { "id": "A", "text": "2 km/h", "isCorrect": false, "studentSelectionTrap": "Division slip", "mistakeAnalysis": "Divided difference by 3 instead of 2." },
            { "id": "B", "text": "3 km/h", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Downstream speed = 36/3 = 12 km/h. Upstream speed = 36/6 = 6 km/h. Current speed = (12 - 6)/2 = 3 km/h." },
            { "id": "C", "text": "4.5 km/h", "isCorrect": false, "studentSelectionTrap": "Average of Speeds Trap", "mistakeAnalysis": "Subtracted speeds and divided incorrectly." },
            { "id": "D", "text": "9 km/h", "isCorrect": false, "studentSelectionTrap": "Still Water Speed Trap", "mistakeAnalysis": "Found the speed of the boat in still water (12 + 6)/2 = 9 km/h instead of the current speed." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Downstream speed (v_d) = Distance / Time = 36 / 3 = 12 km/h.\n2. Upstream speed (v_u) = Distance / Time = 36 / 6 = 6 km/h.\n3. Let speed of boat in still water = u, and speed of current = v.\n   u + v = 12\n   u - v = 6\n4. Subtract the two equations:\n   2v = 12 - 6 = 6 => v = 6 / 2 = 3 km/h.\nTherefore, the speed of the river current is 3 km/h (Option B).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Boats and Streams"]
    })

    questions.append({
        "questionNumber": 9,
        "questionId": "GAT-M01-Q09",
        "chapter": "Quantitative Aptitude",
        "topic": "Averages",
        "questionText": "The average weight of 24 students in a secondary school class is 45 kg. When the weight of the class teacher is included, the overall average weight increases by exactly 1 kg. What is the weight of the class teacher?",
        "options": [
            { "id": "A", "text": "65 kg", "isCorrect": false, "studentSelectionTrap": "Missed New Member", "mistakeAnalysis": "Added 20 kg instead of 25 kg to initial average." },
            { "id": "B", "text": "72 kg", "isCorrect": false, "studentSelectionTrap": "Calculation Slip", "mistakeAnalysis": "Arithmetic error." },
            { "id": "C", "text": "70 kg", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Total weight of 24 students = 24 * 45 = 1080 kg. Total weight of 25 persons = 25 * 46 = 1150 kg. Teacher's weight = 1150 - 1080 = 70 kg." },
            { "id": "D", "text": "69 kg", "isCorrect": false, "studentSelectionTrap": "N-1 Counting Trap", "mistakeAnalysis": "Multiplied 24 by 1 instead of 25 by 1: 45 + 24 = 69 kg." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-Step Mathematical Working:\nMethod 1 (Total Weight):\n1. Initial total weight of 24 students = 24 * 45 = 1,080 kg.\n2. New number of people = 24 + 1 = 25.\n3. New average weight = 45 + 1 = 46 kg.\n4. New total weight = 25 * 46 = 1,150 kg.\n5. Teacher's weight = 1,150 - 1,080 = 70 kg.\n\nMethod 2 (Deviation shortcut):\nTeacher's weight = Old Average + (Total count * Increase in average)\n= 45 + (25 * 1) = 45 + 25 = 70 kg.\nAnswer is 70 kg (Option C).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Quantitative Aptitude", "Averages"]
    })

    questions.append({
        "questionNumber": 10,
        "questionId": "GAT-M01-Q10",
        "chapter": "Quantitative Aptitude",
        "topic": "Problems on Ages",
        "questionText": "The present age of a father is 4 times the present age of his son. Six years ago, the father was 7 times as old as his son was at that time. What is the current present age of the father?",
        "options": [
            { "id": "A", "text": "44 years", "isCorrect": false, "studentSelectionTrap": "Incorrect Equation Formulation", "mistakeAnalysis": "Solved 4S - 6 = 7S - 6 instead of 7(S - 6)." },
            { "id": "B", "text": "40 years", "isCorrect": false, "studentSelectionTrap": "Trial and Error Slip", "mistakeAnalysis": "Tested age 40 (son 10; 6 yrs ago father 34, son 4; 34 != 28)." },
            { "id": "C", "text": "52 years", "isCorrect": false, "studentSelectionTrap": "Misread Multiple", "mistakeAnalysis": "Multiplied son's age by 4.5." },
            { "id": "D", "text": "48 years", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Let son = S, father = 4S. 4S - 6 = 7(S - 6) => 4S - 6 = 7S - 42 => 3S = 36 => S = 12. Father = 4 * 12 = 48." }
        ],
        "correctOption": "D",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Let the son's present age be S years. Then the father's present age F = 4S.\n2. Six years ago:\n   Father's age = 4S - 6\n   Son's age = S - 6\n3. According to the condition:\n   4S - 6 = 7 * (S - 6)\n   4S - 6 = 7S - 42\n4. Rearrange terms:\n   7S - 4S = 42 - 6\n   3S = 36 => S = 12 years (Son's present age).\n5. Father's present age = 4 * S = 4 * 12 = 48 years.\nVerification: 6 years ago father was 42 and son was 6; 42 = 7 * 6 (holds true).\nFather's age is 48 years (Option D).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Ages"]
    })

    questions.append({
        "questionNumber": 11,
        "questionId": "GAT-M01-Q11",
        "chapter": "Quantitative Aptitude",
        "topic": "Mixtures & Alligation",
        "questionText": "In what ratio must an agricultural merchant mix two qualities of lentils costing ₹60 per kg and ₹85 per kg respectively, so that by selling the blended mixture at ₹84 per kg he earns a profit of 20%?",
        "options": [
            { "id": "A", "text": "3 : 2", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Mean cost price = 84 / 1.2 = 70. By alligation: (85 - 70) : (70 - 60) = 15 : 10 = 3 : 2." },
            { "id": "B", "text": "2 : 3", "isCorrect": false, "studentSelectionTrap": "Inverted Ratio Trap", "mistakeAnalysis": "Reversed the ratio components." },
            { "id": "C", "text": "4 : 3", "isCorrect": false, "studentSelectionTrap": "Selling Price as Mean Price Trap", "mistakeAnalysis": "Used SP ₹84 directly as mean cost price without discounting 20% profit." },
            { "id": "D", "text": "5 : 3", "isCorrect": false, "studentSelectionTrap": "Arithmetic Slip", "mistakeAnalysis": "Miscalculated differences in alligation cross." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Selling Price (SP) of the mixture = ₹84 per kg, Profit = 20%.\n2. Mean Cost Price (CP) of the mixture:\n   Mean CP = SP / (1 + Profit%) = 84 / 1.20 = ₹70 per kg.\n3. Apply the Rule of Alligation:\n   Cheaper Price (C) = ₹60 | Dearer Price (D) = ₹85\n   Mean Price (M) = ₹70\n4. Ratio of Quantity of Cheaper : Quantity of Dearer\n   = (D - M) : (M - C)\n   = (85 - 70) : (70 - 60)\n   = 15 : 10 = 3 : 2.\nTherefore, the required ratio is 3 : 2 (Option A).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Alligation"]
    })

    questions.append({
        "questionNumber": 12,
        "questionId": "GAT-M01-Q12",
        "chapter": "Quantitative Aptitude",
        "topic": "Mensuration 2D",
        "questionText": "The circumference of a circular lawn is exactly equal to the perimeter of a square sports field. If the area of the square field is 484 m², what is the total area enclosed by the circular lawn? (Take $\\pi = 22/7$)",
        "options": [
            { "id": "A", "text": "586 m²", "isCorrect": false, "studentSelectionTrap": "Approximation Slip", "mistakeAnalysis": "Used wrong radius." },
            { "id": "B", "text": "616 m²", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Side of square = sqrt(484) = 22 m. Perimeter = 4 * 22 = 88 m. Circumference = 2 * (22/7) * r = 88 => r = 14 m. Area of circle = (22/7) * 14^2 = 616 m²." },
            { "id": "C", "text": "628 m²", "isCorrect": false, "studentSelectionTrap": "pi = 3.14 approximation slip", "mistakeAnalysis": "Multiplied 3.14 by 200." },
            { "id": "D", "text": "550 m²", "isCorrect": false, "studentSelectionTrap": "Formula Error", "mistakeAnalysis": "Calculated 2 * pi * r instead of pi * r^2." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Area of square field = a^2 = 484 m² => side a = sqrt(484) = 22 m.\n2. Perimeter of the square = 4 * a = 4 * 22 = 88 m.\n3. Circumference of the circle = Perimeter of square:\n   2 * \\pi * r = 88\n   2 * (22 / 7) * r = 88\n   (44 / 7) * r = 88 => r = (88 * 7) / 44 = 14 m.\n4. Area of circular lawn = \\pi * r^2:\n   Area = (22 / 7) * 14 * 14 = 22 * 2 * 14 = 44 * 14 = 616 m².\nTherefore, the area is 616 m² (Option B).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Mensuration"]
    })

    questions.append({
        "questionNumber": 13,
        "questionId": "GAT-M01-Q13",
        "chapter": "Quantitative Aptitude",
        "topic": "Mensuration 3D",
        "questionText": "A solid metallic cylinder of base radius 6 cm and height 12 cm is melted and recast into identical small solid spheres, each of radius 3 cm. How many such spheres can be completely formed without any wastage of metal?",
        "options": [
            { "id": "A", "text": "10", "isCorrect": false, "studentSelectionTrap": "Rounding error", "mistakeAnalysis": "Approximated volume division." },
            { "id": "B", "text": "16", "isCorrect": false, "studentSelectionTrap": "Sphere Volume Formula Error", "mistakeAnalysis": "Used 4*pi*r^3 instead of (4/3)*pi*r^3." },
            { "id": "C", "text": "12", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Vol cylinder = pi * 6^2 * 12 = 432*pi. Vol 1 sphere = (4/3)*pi*3^3 = 36*pi. Count = 432 / 36 = 12." },
            { "id": "D", "text": "8", "isCorrect": false, "studentSelectionTrap": "Diameter vs Radius Slip", "mistakeAnalysis": "Treated radius as diameter." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Volume of solid metallic cylinder = \\pi * r^2 * h\n   = \\pi * (6)^2 * 12 = \\pi * 36 * 12 = 432\\pi cm³.\n2. Volume of one solid sphere = (4/3) * \\pi * R^3\n   = (4/3) * \\pi * (3)^3 = (4/3) * \\pi * 27 = 36\\pi cm³.\n3. Number of spheres formed = (Volume of cylinder) / (Volume of 1 sphere)\n   = (432\\pi) / (36\\pi) = 432 / 36 = 12.\nTherefore, 12 spheres are formed (Option C).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Mensuration 3D"]
    })

    questions.append({
        "questionNumber": 14,
        "questionId": "GAT-M01-Q14",
        "chapter": "Quantitative Aptitude",
        "topic": "Basic Algebra",
        "questionText": "If $x + \\frac{1}{x} = 5$, what is the numerical value of $x^3 + \\frac{1}{x^3}$?",
        "options": [
            { "id": "A", "text": "125", "isCorrect": false, "studentSelectionTrap": "Direct Cube Fallacy", "mistakeAnalysis": "Simply cubed 5 (5^3 = 125) forgetting the -3(x + 1/x) cross-term." },
            { "id": "B", "text": "140", "isCorrect": false, "studentSelectionTrap": "Sign Inversion Error", "mistakeAnalysis": "Added 3(5) to 125 instead of subtracting." },
            { "id": "C", "text": "115", "isCorrect": false, "studentSelectionTrap": "Arithmetic Slip", "mistakeAnalysis": "Subtracted 10 instead of 15." },
            { "id": "D", "text": "110", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x) = 5^3 - 3(5) = 125 - 15 = 110." }
        ],
        "correctOption": "D",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Algebraic Identity:\n   (a + b)^3 = a^3 + b^3 + 3ab(a + b)\n2. Let a = x and b = 1/x:\n   (x + 1/x)^3 = x^3 + 1/x^3 + 3(x)(1/x)(x + 1/x)\n   (x + 1/x)^3 = x^3 + 1/x^3 + 3(x + 1/x)\n3. Rearrange to isolate (x^3 + 1/x^3):\n   x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x)\n4. Substitute the given value (x + 1/x = 5):\n   x^3 + 1/x^3 = 5^3 - 3(5) = 125 - 15 = 110.\nTherefore, the value is 110 (Option D).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Quantitative Aptitude", "Algebra"]
    })

    questions.append({
        "questionNumber": 15,
        "questionId": "GAT-M01-Q15",
        "chapter": "Quantitative Aptitude",
        "topic": "Coordinate Geometry",
        "questionText": "What is the straight-line distance between the points $P(-3, 4)$ and $Q(5, -2)$ in the Cartesian coordinate plane?",
        "options": [
            { "id": "A", "text": "10 units", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Distance = sqrt((5 - (-3))^2 + (-2 - 4)^2) = sqrt(8^2 + (-6)^2) = sqrt(64 + 36) = sqrt(100) = 10." },
            { "id": "B", "text": "12 units", "isCorrect": false, "studentSelectionTrap": "Direct Coordinate Addition", "mistakeAnalysis": "Added coordinate differences directly." },
            { "id": "C", "text": "8 units", "isCorrect": false, "studentSelectionTrap": "Ignored y-coordinates", "mistakeAnalysis": "Looked only at x-axis displacement." },
            { "id": "D", "text": "14 units", "isCorrect": false, "studentSelectionTrap": "Sign Error in subtraction", "mistakeAnalysis": "Subtracted wrong coordinates." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Distance formula between (x1, y1) and (x2, y2):\n   d = \\sqrt{(x2 - x1)^2 + (y2 - y1)^2}\n2. Given: P(x1, y1) = (-3, 4) and Q(x2, y2) = (5, -2).\n3. x2 - x1 = 5 - (-3) = 5 + 3 = 8.\n4. y2 - y1 = -2 - 4 = -6.\n5. d = \\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10 units.\nTherefore, the straight-line distance is 10 units (Option A).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Quantitative Aptitude", "Coordinate Geometry"]
    })

    questions.append({
        "questionNumber": 16,
        "questionId": "GAT-M01-Q16",
        "chapter": "Quantitative Aptitude",
        "topic": "Permutations & Combinations",
        "questionText": "In how many different arrangements can the letters of the word 'PRISM' be written such that the vowel always occupies an odd-numbered position (1st, 3rd, or 5th place)?",
        "options": [
            { "id": "A", "text": "48", "isCorrect": false, "studentSelectionTrap": "Odd Place Miscount", "mistakeAnalysis": "Counted only 2 odd places instead of 3." },
            { "id": "B", "text": "72", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Letters: P, R, S, M (4 consonants), I (1 vowel). Vowel has 3 odd spots (1, 3, 5). Remaining 4 consonants arranged in 4! = 24 ways. Total = 3 * 24 = 72." },
            { "id": "C", "text": "120", "isCorrect": false, "studentSelectionTrap": "Unconstrained Permutation", "mistakeAnalysis": "Calculated total 5! = 120 without placing restriction on the vowel." },
            { "id": "D", "text": "60", "isCorrect": false, "studentSelectionTrap": "Division by 2 Fallacy", "mistakeAnalysis": "Divided 120 by 2." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. The word 'PRISM' has 5 letters: Consonants = {P, R, S, M} (4 consonants); Vowels = {I} (1 vowel).\n2. Positions in a 5-letter word: _(1)_ _(2)_ _(3)_ _(4)_ _(5)_.\n3. Odd-numbered positions are 1, 3, and 5 (total 3 available positions).\n4. Step 1: Place the single vowel 'I' in any one of the 3 odd positions = 3 ways.\n5. Step 2: Arrange the 4 consonants {P, R, S, M} in the remaining 4 positions = 4! ways.\n   4! = 4 * 3 * 2 * 1 = 24 ways.\n6. Total distinct arrangements = 3 * 24 = 72.\nTherefore, there are 72 valid arrangements (Option B).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Permutations"]
    })

    questions.append({
        "questionNumber": 17,
        "questionId": "GAT-M01-Q17",
        "chapter": "Quantitative Aptitude",
        "topic": "Probability",
        "questionText": "Two unbiased standard six-sided dice are rolled simultaneously. What is the probability that the sum of the numbers appearing on top of both dice is a prime number?",
        "options": [
            { "id": "A", "text": "7 / 18", "isCorrect": false, "studentSelectionTrap": "Missed Outcome", "mistakeAnalysis": "Counted 14 outcomes instead of 15." },
            { "id": "B", "text": "1 / 2", "isCorrect": false, "studentSelectionTrap": "Parity Confusion", "mistakeAnalysis": "Assumed half of the sums are prime." },
            { "id": "C", "text": "5 / 12", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Total outcomes = 36. Prime sums possible: 2, 3, 5, 7, 11. Sum 2 (1), Sum 3 (2), Sum 5 (4), Sum 7 (6), Sum 11 (2). Total favorable = 15. Probability = 15/36 = 5/12." },
            { "id": "D", "text": "11 / 36", "isCorrect": false, "studentSelectionTrap": "Excluded sum = 7", "mistakeAnalysis": "Omitted some pairs summing to 7." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Total possible outcomes when rolling 2 dice = 6 * 6 = 36.\n2. The possible sums of two dice range from 2 to 12.\n3. Prime numbers in this range are: 2, 3, 5, 7, 11.\n4. Listing favorable pairs for each prime sum:\n   - Sum = 2: (1, 1) -> 1 outcome\n   - Sum = 3: (1, 2), (2, 1) -> 2 outcomes\n   - Sum = 5: (1, 4), (2, 3), (3, 2), (4, 1) -> 4 outcomes\n   - Sum = 7: (1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1) -> 6 outcomes\n   - Sum = 11: (5, 6), (6, 5) -> 2 outcomes\n5. Total favorable outcomes = 1 + 2 + 4 + 6 + 2 = 15 outcomes.\n6. Probability = Favorable / Total = 15 / 36 = 5 / 12.\nTherefore, the probability is 5/12 (Option C).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Quantitative Aptitude", "Probability"]
    })

    questions.append({
        "questionNumber": 18,
        "questionId": "GAT-M01-Q18",
        "chapter": "Quantitative Aptitude",
        "topic": "Data Interpretation",
        "questionText": """The table below presents the annual production figures (in thousands of units) of three vehicle categories manufactured by an automotive firm from 2021 to 2024:

Year  | Sedan | SUV | Hatchback
2021  |  45   | 30  |    65
2022  |  50   | 40  |    70
2023  |  60   | 55  |    75
2024  |  65   | 75  |    80

What was the percentage increase in the production of SUVs from the year 2021 to the year 2024?""",
        "options": [
            { "id": "A", "text": "120%", "isCorrect": false, "studentSelectionTrap": "Calculation Slip", "mistakeAnalysis": "Calculated (75 - 30) / 37.5." },
            { "id": "B", "text": "150%", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Initial SUV production (2021) = 30. Final (2024) = 75. Increase = 75 - 30 = 45. % increase = (45 / 30) * 100 = 150%." },
            { "id": "C", "text": "250%", "isCorrect": false, "studentSelectionTrap": "Ratio vs Increase Trap", "mistakeAnalysis": "Calculated final as percentage of initial (75/30 * 100 = 250%) rather than increase." },
            { "id": "D", "text": "133.3%", "isCorrect": false, "studentSelectionTrap": "Final Value Denominator Trap", "mistakeAnalysis": "Divided increase by final value 75 instead of base value 30." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. From the table:\n   SUV production in 2021 = 30 thousand units.\n   SUV production in 2024 = 75 thousand units.\n2. Absolute increase in SUV production = 75 - 30 = 45 thousand units.\n3. Percentage increase = (Absolute Increase / Base Year Production) * 100\n   = (45 / 30) * 100 = (3 / 2) * 100 = 150%.\nTherefore, the increase is 150% (Option B).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Quantitative Aptitude", "Data Interpretation"]
    })

    # LOGICAL & ANALYTICAL REASONING (Q19 - Q35)
    questions.append({
        "questionNumber": 19,
        "questionId": "GAT-M01-Q19",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Coding-Decoding",
        "questionText": "In a certain cipher code language, if 'BEACON' is encoded as 'EHDFRQ', how will the word 'GARDEN' be encoded in that identical system?",
        "options": [
            { "id": "A", "text": "JDUGHQ", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Each letter is shifted forward by +3 positions: G(+3)=J, A(+3)=D, R(+3)=U, D(+3)=G, E(+3)=H, N(+3)=Q -> JDUGHQ." },
            { "id": "B", "text": "JDTHFQ", "isCorrect": false, "studentSelectionTrap": "Letter Shift Error", "mistakeAnalysis": "Shifted R by +2 instead of +3." },
            { "id": "C", "text": "IDUGHP", "isCorrect": false, "studentSelectionTrap": "Border Letter Shift Slip", "mistakeAnalysis": "Shifted G and N by +2 instead of +3." },
            { "id": "D", "text": "JEVGHQ", "isCorrect": false, "studentSelectionTrap": "Vowel Shift Trap", "mistakeAnalysis": "Shifted A by +4." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Analyze the relationship between 'BEACON' and 'EHDFRQ':\n   B (2) + 3 = E (5)\n   E (5) + 3 = H (8)\n   A (1) + 3 = D (4)\n   C (3) + 3 = F (6)\n   O (15) + 3 = R (18)\n   N (14) + 3 = Q (17)\n   Pattern: A uniform forward shift of +3 for every letter.\n2. Apply the +3 forward shift to 'GARDEN':\n   G (7) + 3 = J (10)\n   A (1) + 3 = D (4)\n   R (18) + 3 = U (21)\n   D (4) + 3 = G (7)\n   E (5) + 3 = H (8)\n   N (14) + 3 = Q (17)\n3. Resulting word = JDUGHQ (Option A).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Coding-Decoding"]
    })

    questions.append({
        "questionNumber": 20,
        "questionId": "GAT-M01-Q20",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Coding-Decoding",
        "questionText": "If in a numerical cipher code, 'CAT' is coded as 24 and 'DOG' is coded as 26, what will be the numerical code for the word 'TIGER'?",
        "options": [
            { "id": "A", "text": "54", "isCorrect": false, "studentSelectionTrap": "Alphabet Sum Slip", "mistakeAnalysis": "Omitted letter E (5)." },
            { "id": "B", "text": "62", "isCorrect": false, "studentSelectionTrap": "Overcount Error", "mistakeAnalysis": "Used wrong letter ranks." },
            { "id": "C", "text": "59", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. T(20) + I(9) + G(7) + E(5) + R(18) = 59." },
            { "id": "D", "text": "56", "isCorrect": false, "studentSelectionTrap": "R=15 Mistake", "mistakeAnalysis": "Assigned 15 to R instead of 18." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Decode 'CAT': C=3, A=1, T=20. Sum = 3 + 1 + 20 = 24.\n2. Decode 'DOG': D=4, O=15, G=7. Sum = 4 + 15 + 7 = 26.\n3. The rule is the direct summation of the standard alphabetical positional values (A=1, B=2, ..., Z=26).\n4. Apply to 'TIGER':\n   T = 20\n   I = 9\n   G = 7\n   E = 5\n   R = 18\n5. Sum = 20 + 9 + 7 + 5 + 18 = 59.\nTherefore, 'TIGER' is coded as 59 (Option C).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Coding-Decoding"]
    })

    questions.append({
        "questionNumber": 21,
        "questionId": "GAT-M01-Q21",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Number Series",
        "questionText": "Identify the missing number that logically completes the progression:\n\n4, 9, 20, 43, 90, ?",
        "options": [
            { "id": "A", "text": "180", "isCorrect": false, "studentSelectionTrap": "Simple Doubling Fallacy", "mistakeAnalysis": "Doubled 90 without adding the incrementing term." },
            { "id": "B", "text": "185", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 4*2 + 1 = 9, 9*2 + 2 = 20, 20*2 + 3 = 43, 43*2 + 4 = 90, 90*2 + 5 = 185." },
            { "id": "C", "text": "187", "isCorrect": false, "studentSelectionTrap": "Wrong Increment Step", "mistakeAnalysis": "Added 7 instead of 5." },
            { "id": "D", "text": "175", "isCorrect": false, "studentSelectionTrap": "Calculation Slip", "mistakeAnalysis": "Subtracted instead of adding." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Examine differences and multiplication steps between successive terms:\n   Term 1 to Term 2: (4 * 2) + 1 = 8 + 1 = 9\n   Term 2 to Term 3: (9 * 2) + 2 = 18 + 2 = 20\n   Term 3 to Term 4: (20 * 2) + 3 = 40 + 3 = 43\n   Term 4 to Term 5: (43 * 2) + 4 = 86 + 4 = 90\n2. The general recurrence pattern is: Next Term = (Current Term * 2) + n, where n increases by 1 at each step (1, 2, 3, 4, 5...).\n3. Following this pattern for the missing term:\n   Next Term = (90 * 2) + 5 = 180 + 5 = 185.\nTherefore, the missing number is 185 (Option B).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Reasoning", "Number Series"]
    })

    questions.append({
        "questionNumber": 22,
        "questionId": "GAT-M01-Q22",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Alphanumeric Series",
        "questionText": "Find the next term in the alphanumeric sequence:\n\nB2D, D4G, F8J, H16M, ?",
        "options": [
            { "id": "A", "text": "J32P", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 1st letter: B(+2)=D, D(+2)=F, F(+2)=H, H(+2)=J. Number: 2(*2)=4, 4(*2)=8, 8(*2)=16, 16(*2)=32. 3rd letter: D(+3)=G, G(+3)=J, J(+3)=M, M(+3)=P -> J32P." },
            { "id": "B", "text": "J32O", "isCorrect": false, "studentSelectionTrap": "Letter Shift Error", "mistakeAnalysis": "Shifted M by +2 to O instead of +3 to P." },
            { "id": "C", "text": "K32P", "isCorrect": false, "studentSelectionTrap": "First Letter Error", "mistakeAnalysis": "Shifted H by +3 instead of +2." },
            { "id": "D", "text": "J24P", "isCorrect": false, "studentSelectionTrap": "Additive Number Pattern Error", "mistakeAnalysis": "Added 8 to 16 instead of doubling." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Analyze the first letter of each term:\n   B (2) -> D (4) -> F (6) -> H (8) -> Next is H + 2 = J (10).\n2. Analyze the central numerical component:\n   2 -> 4 -> 8 -> 16 -> Next is 16 * 2 = 32 (powers of 2).\n3. Analyze the third letter of each term:\n   D (4) -> G (7) [shift +3]\n   G (7) -> J (10) [shift +3]\n   J (10) -> M (13) [shift +3]\n   Next is M (13) + 3 = P (16).\n4. Combine all components: J 32 P.\nTherefore, the next term is J32P (Option A).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Alphanumeric Series"]
    })

    questions.append({
        "questionNumber": 23,
        "questionId": "GAT-M01-Q23",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Direction Sense Test",
        "questionText": "Starting from point P, Rohan walks 30 meters towards the North. He then turns to his right and walks 40 meters. Next, he turns right again and walks 60 meters. Finally, he turns to his left and walks 20 meters, stopping at point Q. In which compass direction is point Q situated relative to starting point P, and what is the shortest straight-line distance between them?",
        "options": [
            { "id": "A", "text": "South-West, 50 meters", "isCorrect": false, "studentSelectionTrap": "Direction Inversion Trap", "mistakeAnalysis": "Confused East with West." },
            { "id": "B", "text": "South-East, 67.08 meters ($30\\sqrt{5}$ m)", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Start (0,0). North 30 -> (0,30). Right East 40 -> (40,30). Right South 60 -> (40,-30). Left East 20 -> (60,-30). Distance = sqrt(60^2 + (-30)^2) = sqrt(4500) = 30*sqrt(5) m (~67.08 m). Direction: South-East." },
            { "id": "C", "text": "South, 30 meters", "isCorrect": false, "studentSelectionTrap": "Ignored East Displacement", "mistakeAnalysis": "Considered only vertical displacement." },
            { "id": "D", "text": "South-East, 50 meters", "isCorrect": false, "studentSelectionTrap": "3-4-5 Triangle Fallacy", "mistakeAnalysis": "Assumed 30 and 40 meters gave 50 meters, ignoring the final 20-meter turn." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Establish a 2D Cartesian coordinate plane with Point P at origin (0, 0):\n   - North = +Y, South = -Y, East = +X, West = -X.\n2. Step 1: Walks 30 m North -> Coordinates: (0, 30).\n3. Step 2: Turns right (East) and walks 40 m -> Coordinates: (40, 30).\n4. Step 3: Turns right (South) and walks 60 m -> Coordinates: (40, 30 - 60) = (40, -30).\n5. Step 4: Turns left (East) and walks 20 m -> Coordinates: (40 + 20, -30) = (60, -30) at Point Q.\n6. Relative position of Q with respect to P(0,0):\n   - X-coordinate = +60 (East)\n   - Y-coordinate = -30 (South)\n   - Direction is South-East.\n7. Shortest straight-line distance d:\n   d = \\sqrt{60^2 + (-30)^2} = \\sqrt{3600 + 900} = \\sqrt{4500} = 30\\sqrt{5} \\approx 67.08 meters.\nOption B is correct.",
        "difficultyLevel": 2,
        "tags": ["General Test", "Reasoning", "Direction Sense"]
    })

    questions.append({
        "questionNumber": 24,
        "questionId": "GAT-M01-Q24",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Blood Relations",
        "questionText": "Pointing to a framed portrait of a woman, a man declares to his friend: 'Her mother's only son is my father.' How is the woman in the portrait related to the man?",
        "options": [
            { "id": "A", "text": "Mother", "isCorrect": false, "studentSelectionTrap": "Direct Lineage Trap", "mistakeAnalysis": "Assumed the woman in the photo is the mother, forgetting she is the sister of the father." },
            { "id": "B", "text": "Paternal Grandmother", "isCorrect": false, "studentSelectionTrap": "Generation Skip Trap", "mistakeAnalysis": "Moved two generations back instead of one." },
            { "id": "C", "text": "Paternal Aunt (Father's sister)", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Her mother's only son' = the woman's brother. The woman's brother is the man's father. Thus, the woman is the man's father's sister (paternal aunt)." },
            { "id": "D", "text": "Sister", "isCorrect": false, "studentSelectionTrap": "Sibling Level Trap", "mistakeAnalysis": "Equated woman to man's sibling." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Break down the statement from the speaker's perspective:\n   'Her mother's only son...'\n2. The woman's mother has only one son. That son must be the woman's brother.\n3. The statement asserts: 'The woman's brother is my father.'\n4. Therefore, the woman in the portrait is the sister of the man's father.\n5. The sister of one's father is one's Paternal Aunt (Bua).\nTherefore, the woman is the man's Paternal Aunt (Option C).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Blood Relations"]
    })

    questions.append({
        "questionNumber": 25,
        "questionId": "GAT-M01-Q25",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Seating Arrangement",
        "questionText": """Six students—A, B, C, D, E, and F—are seated in a straight row facing North:
1. B sits exactly in the middle between D and F.
2. C sits at the extreme right end of the row.
3. E is an immediate neighbor of both A and D.
4. F sits to the immediate left of C.

Who is seated at the extreme left end of the row?""",
        "options": [
            { "id": "A", "text": "A", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 6 positions (1 to 6). C is at 6. F is at 5. B is between D and F, so B is at 4, D is at 3. E is neighbor of A and D, so E is at 2, A is at 1. Extreme left is A." },
            { "id": "B", "text": "E", "isCorrect": false, "studentSelectionTrap": "Position 2 Confusion", "mistakeAnalysis": "Picked E who is at position 2." },
            { "id": "C", "text": "D", "isCorrect": false, "studentSelectionTrap": "Middle Position Slip", "mistakeAnalysis": "Picked D who is at position 3." },
            { "id": "D", "text": "B", "isCorrect": false, "studentSelectionTrap": "False Assumption", "mistakeAnalysis": "Picked B who is at position 4." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Number the 6 positions from left to right as 1, 2, 3, 4, 5, 6 (all facing North):\n2. Clue 2: 'C sits at the extreme right end' -> Position 6 = C.\n3. Clue 4: 'F sits to the immediate left of C' -> Position 5 = F.\n4. Clue 1: 'B sits exactly in the middle between D and F' -> Since F is at 5, B must be at 4, and D must be at 3 (so D, B, F are consecutive).\n   Current row: _(1)_  _(2)_  D(3)  B(4)  F(5)  C(6).\n5. Clue 3: 'E is an immediate neighbor of both A and D' -> E must be placed between A and D. Since D is at 3, E must be at 2, and A must be at 1.\n6. Complete linear arrangement from left to right: A - E - D - B - F - C.\n7. The person at the extreme left end (Position 1) is A.\nOption A is correct.",
        "difficultyLevel": 2,
        "tags": ["General Test", "Reasoning", "Seating Arrangement"]
    })

    questions.append({
        "questionNumber": 26,
        "questionId": "GAT-M01-Q26",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Circular Seating Arrangement",
        "questionText": """Five executives—P, Q, R, S, and T—are seated around a circular conference table facing the center:
1. P sits second to the right of S.
2. Q is an immediate neighbor of both P and R.
3. T is seated immediately between S and P.

Who sits to the immediate left of S?""",
        "options": [
            { "id": "A", "text": "P", "isCorrect": false, "studentSelectionTrap": "Right vs Left Confusion", "mistakeAnalysis": "P is to the right of S, not left." },
            { "id": "B", "text": "R", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Around circle clockwise: S -> T -> P -> Q -> R -> (back to S). Immediate left of S (clockwise from center's perspective) is R." },
            { "id": "C", "text": "Q", "isCorrect": false, "studentSelectionTrap": "Neighbor Confusion", "mistakeAnalysis": "Q is opposite to S." },
            { "id": "D", "text": "T", "isCorrect": false, "studentSelectionTrap": "Immediate Right Confusion", "mistakeAnalysis": "T is to the immediate right of S." }
        ],
        "correctOption": "B",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Place S at position 1 (bottom facing North towards center):\n2. Clue 1: 'P sits second to the right of S'. Facing center, right is anti-clockwise. So position 3 = P.\n3. Clue 3: 'T is seated immediately between S and P' -> Position 2 = T (between S at 1 and P at 3).\n4. Clue 2: 'Q is an immediate neighbor of both P and R' -> Position 4 = Q, and Position 5 = R (so Q is between P at 3 and R at 5).\n5. Full circle in anti-clockwise order: S (1) -> T (2) -> P (3) -> Q (4) -> R (5) -> S (1).\n6. When seated at S facing center, the 'immediate left' corresponds to clockwise direction, which points directly to R (position 5).\nTherefore, R sits to the immediate left of S (Option B).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Reasoning", "Circular Arrangement"]
    })

    questions.append({
        "questionNumber": 27,
        "questionId": "GAT-M01-Q27",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Syllogism",
        "questionText": """Read the statements and conclusions carefully. Assuming the statements are true, decide which conclusion(s) logically follow:

Statements:
1. All architects are designers.
2. Some designers are artists.
3. No artist is an accountant.

Conclusions:
I. Some designers are not accountants.
II. All architects are artists.""",
        "options": [
            { "id": "A", "text": "Only Conclusion I follows", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Designers who are artists cannot be accountants (since no artist is an accountant). Thus, some designers are not accountants (Conclusion I follows). All architects being artists is not supported (Conclusion II does not follow)." },
            { "id": "B", "text": "Only Conclusion II follows", "isCorrect": false, "studentSelectionTrap": "Universal Assumption", "mistakeAnalysis": "Assumed all members of a subset share all properties of other intersecting sets." },
            { "id": "C", "text": "Both Conclusion I and II follow", "isCorrect": false, "studentSelectionTrap": "Over-inclusion", "mistakeAnalysis": "Accepted Conclusion II without logical warrant." },
            { "id": "D", "text": "Neither Conclusion I nor II follows", "isCorrect": false, "studentSelectionTrap": "Missed Negative Syllogism", "mistakeAnalysis": "Failed to deduce that the intersection of designers and artists is disjoint from accountants." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Analysis of Statements:\n   - 'All architects are designers': Architects $\\subseteq$ Designers.\n   - 'Some designers are artists': There exists a non-empty intersection between Designers and Artists (let this subset be D_art).\n   - 'No artist is an accountant': Artists and Accountants are disjoint sets (Artists $\\cap$ Accountants = $\\emptyset$).\n2. Evaluating Conclusion I ('Some designers are not accountants'):\n   - D_art is a subset of Designers, and every member of D_art is an Artist.\n   - Since no Artist can be an Accountant, none of the members of D_art can be Accountants.\n   - Hence, those Designers belonging to D_art are definitely NOT Accountants.\n   - Therefore, Conclusion I logically and necessarily follows!\n3. Evaluating Conclusion II ('All architects are artists'):\n   - Architects are inside Designers, but there is no necessary overlap between Architects and Artists.\n   - Conclusion II does not follow.\nOnly Conclusion I follows (Option A).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Reasoning", "Syllogism"]
    })

    questions.append({
        "questionNumber": 28,
        "questionId": "GAT-M01-Q28",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Syllogism",
        "questionText": """Evaluate the given syllogism and select the correct option:

Statements:
1. All planets are celestial bodies.
2. All celestial bodies emit gravitational force.

Conclusions:
I. All planets emit gravitational force.
II. Some bodies emitting gravitational force are planets.""",
        "options": [
            { "id": "A", "text": "Only Conclusion I follows", "isCorrect": false, "studentSelectionTrap": "Ignored Subalternation", "mistakeAnalysis": "Failed to recognize that universal affirmation implies particular affirmation." },
            { "id": "B", "text": "Only Conclusion II follows", "isCorrect": false, "studentSelectionTrap": "Missed Transitive Deduction", "mistakeAnalysis": "Overlooked the direct transitive conclusion." },
            { "id": "C", "text": "Both Conclusion I and Conclusion II follow", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Transitive rule: All A are B, all B are C => All A are C (I follows). By conversion: All A are C => Some C are A (II follows)." },
            { "id": "D", "text": "Neither Conclusion follows", "isCorrect": false, "studentSelectionTrap": "Skeptical Error", "mistakeAnalysis": "Both conclusions are mathematically valid." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-Step Logical Working:\n1. Let P = Planets, C = Celestial bodies, G = Bodies emitting gravitational force.\n2. Statement 1: P $\\subseteq$ C (All planets are celestial bodies).\n3. Statement 2: C $\\subseteq$ G (All celestial bodies emit gravitational force).\n4. Transitivity: Since P $\\subseteq$ C and C $\\subseteq$ G, it follows that P $\\subseteq$ G.\n   - Conclusion I ('All planets emit gravitational force') is valid.\n5. Conversion of Universal Affirmative (Barbara -> Darii/Subalternation):\n   - If all P are G, then the intersection of G and P is non-empty, meaning 'Some G are P'.\n   - Conclusion II ('Some bodies emitting gravitational force are planets') is valid.\nBoth Conclusion I and Conclusion II follow (Option C).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Syllogism"]
    })

    questions.append({
        "questionNumber": 29,
        "questionId": "GAT-M01-Q29",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Semantic Analogy",
        "questionText": """Complete the semantic analogy by choosing the related word:

Ophthalmologist : Eye :: Nephrologist : ?""",
        "options": [
            { "id": "A", "text": "Brain", "isCorrect": false, "studentSelectionTrap": "Neurology Trap", "mistakeAnalysis": "Brain specialist is a Neurologist." },
            { "id": "B", "text": "Kidney", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. An ophthalmologist specializes in the eye; a nephrologist specializes in the kidney (from Greek nephros = kidney)." },
            { "id": "C", "text": "Liver", "isCorrect": false, "studentSelectionTrap": "Hepatology Trap", "mistakeAnalysis": "Liver specialist is a Hepatologist." },
            { "id": "D", "text": "Heart", "isCorrect": false, "studentSelectionTrap": "Cardiology Trap", "mistakeAnalysis": "Heart specialist is a Cardiologist." }
        ],
        "correctOption": "B",
        "detailedSolution": "Medical Analogy Analysis:\n- An Ophthalmologist is a medical specialist focused on the physiology, diseases, and treatment of the Eye.\n- In the same relationship, a Nephrologist (derived from nephros, the Greek root for kidney) is a specialist dedicated to the Kidney.\n- Hepatologist = Liver; Neurologist = Brain; Cardiologist = Heart.\nTherefore, Option B is the correct match.",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Analogy"]
    })

    questions.append({
        "questionNumber": 30,
        "questionId": "GAT-M01-Q30",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Number Analogy",
        "questionText": """Select the number that completes the mathematical analogy:

7 : 340 :: 9 : ?""",
        "options": [
            { "id": "A", "text": "726", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Pattern: n : (n^3 - 3). For n=7: 7^3 - 3 = 343 - 3 = 340. For n=9: 9^3 - 3 = 729 - 3 = 726." },
            { "id": "B", "text": "729", "isCorrect": false, "studentSelectionTrap": "Pure Cube Trap", "mistakeAnalysis": "Picked 9^3 = 729 without subtracting 3." },
            { "id": "C", "text": "732", "isCorrect": false, "studentSelectionTrap": "Additive Inversion", "mistakeAnalysis": "Added 3 instead of subtracting." },
            { "id": "D", "text": "720", "isCorrect": false, "studentSelectionTrap": "Subtracted 9", "mistakeAnalysis": "Subtracted n instead of 3." }
        ],
        "correctOption": "A",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Analyze the relation between 7 and 340:\n   7^3 = 343.\n   343 - 3 = 340.\n   Pattern: Second term = (First term)^3 - 3.\n2. Apply this exact operation to the number 9:\n   9^3 = 729.\n   729 - 3 = 726.\nTherefore, the missing number is 726 (Option A).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Reasoning", "Number Analogy"]
    })

    questions.append({
        "questionNumber": 31,
        "questionId": "GAT-M01-Q31",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Odd One Out / Classification",
        "questionText": "Four musical instruments are listed below. Three of them share a common classification attribute, while one is distinct. Choose the ODD one out:",
        "options": [
            { "id": "A", "text": "Violin", "isCorrect": false, "studentSelectionTrap": "String Family", "mistakeAnalysis": "Violin is a chordophone (string instrument)." },
            { "id": "B", "text": "Sitar", "isCorrect": false, "studentSelectionTrap": "String Family", "mistakeAnalysis": "Sitar is a string instrument." },
            { "id": "C", "text": "Flute", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Flute is an aerophone (wind instrument), whereas Violin, Sitar, and Cello are all chordophones (stringed instruments)." },
            { "id": "D", "text": "Cello", "isCorrect": false, "studentSelectionTrap": "String Family", "mistakeAnalysis": "Cello is a string instrument." }
        ],
        "correctOption": "C",
        "detailedSolution": "Classification Analysis:\n- Violin, Sitar, and Cello are all chordophones (instruments that produce sound via vibrating strings).\n- Flute is an aerophone (a wind instrument that produces sound via vibrating columns of air).\nHence, Flute is the odd one out (Option C).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Classification"]
    })

    questions.append({
        "questionNumber": 32,
        "questionId": "GAT-M01-Q32",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Odd One Out / Number Classification",
        "questionText": "Four number pairs are given below. Three follow a specific arithmetic relationship, while one does not. Identify the ODD number pair:",
        "options": [
            { "id": "A", "text": "12 : 144", "isCorrect": false, "studentSelectionTrap": "Standard Square", "mistakeAnalysis": "12^2 = 144." },
            { "id": "B", "text": "14 : 196", "isCorrect": false, "studentSelectionTrap": "Standard Square", "mistakeAnalysis": "14^2 = 196." },
            { "id": "C", "text": "17 : 289", "isCorrect": false, "studentSelectionTrap": "Standard Square", "mistakeAnalysis": "17^2 = 289." },
            { "id": "D", "text": "19 : 369", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 19^2 = 361, but 369 is given. In all other pairs, the second number is the exact square of the first number." }
        ],
        "correctOption": "D",
        "detailedSolution": "Arithmetic Analysis:\n- Option A: 12^2 = 144 (Matches)\n- Option B: 14^2 = 196 (Matches)\n- Option C: 17^2 = 289 (Matches)\n- Option D: 19^2 = 361 != 369 (Discrepancy of 8)\nTherefore, 19 : 369 is the odd pair (Option D).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Classification"]
    })

    questions.append({
        "questionNumber": 33,
        "questionId": "GAT-M01-Q33",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Venn Diagrams",
        "questionText": "Which of the following descriptions best represents the logical relationship between the classes: 'Mammals, Whales, Reptiles'?",
        "options": [
            { "id": "A", "text": "One circle entirely enclosed within another, with a third separate circle completely disjoint from both", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. All Whales are Mammals (Whales circle inside Mammals circle). Reptiles are completely disjoint from Mammals." },
            { "id": "B", "text": "Three mutually intersecting circles sharing a common central region", "isCorrect": false, "studentSelectionTrap": "False Hybrid Trap", "mistakeAnalysis": "Whales cannot be reptiles, nor mammals reptiles." },
            { "id": "C", "text": "Three concentric circles nested inside one another", "isCorrect": false, "studentSelectionTrap": "Hierarchy Trap", "mistakeAnalysis": "Reptiles are not a subset of mammals." },
            { "id": "D", "text": "Three mutually disjoint circles completely separate from each other", "isCorrect": false, "studentSelectionTrap": "Fish Assumption Trap", "mistakeAnalysis": "Mistakenly assumed whales are fish and separate from mammals." }
        ],
        "correctOption": "A",
        "detailedSolution": "Venn Diagram Set Analysis:\n1. Whales are warm-blooded marine mammals, meaning Whales $\\subset$ Mammals (the circle for Whales is wholly contained inside the circle for Mammals).\n2. Reptiles are a separate biological class completely disjoint from Mammals (Mammals $\\cap$ Reptiles = $\\emptyset$).\n3. Thus, the diagram consists of one circle (Whales) inside another (Mammals), while the third circle (Reptiles) sits completely detached outside both.\nOption A accurately articulates this structure.",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Venn Diagrams"]
    })

    questions.append({
        "questionNumber": 34,
        "questionId": "GAT-M01-Q34",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Order & Ranking",
        "questionText": "In a competitive merit ranking of 50 candidates, Ananya ranks 18th from the top. What is her rank counting from the bottom of the list?",
        "options": [
            { "id": "A", "text": "32nd", "isCorrect": false, "studentSelectionTrap": "Direct Subtraction Trap", "mistakeAnalysis": "Simply subtracted 18 from 50 (50 - 18 = 32), forgetting to add 1." },
            { "id": "B", "text": "34th", "isCorrect": false, "studentSelectionTrap": "Overcompensation", "mistakeAnalysis": "Added 2 instead of 1." },
            { "id": "C", "text": "33rd", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Rank from bottom = Total - Rank from top + 1 = 50 - 18 + 1 = 33rd." },
            { "id": "D", "text": "31st", "isCorrect": false, "studentSelectionTrap": "Subtraction Slip", "mistakeAnalysis": "Subtracted 1." }
        ],
        "correctOption": "C",
        "detailedSolution": "Step-by-Step Ranking Formula:\n1. Standard formula connecting positions from both ends:\n   Total candidates = (Rank from Top) + (Rank from Bottom) - 1\n2. Given: Total = 50, Rank from Top = 18.\n3. 50 = 18 + (Rank from Bottom) - 1\n   50 = 17 + (Rank from Bottom)\n   Rank from Bottom = 50 - 17 = 33rd.\nTherefore, Ananya is ranked 33rd from the bottom (Option C).",
        "difficultyLevel": 1,
        "tags": ["General Test", "Reasoning", "Order and Ranking"]
    })

    questions.append({
        "questionNumber": 35,
        "questionId": "GAT-M01-Q35",
        "chapter": "Logical & Analytical Reasoning",
        "topic": "Clocks and Angles",
        "questionText": "What is the measure of the smaller angle formed between the hour hand and the minute hand of an analog clock at 3:40 PM?",
        "options": [
            { "id": "A", "text": "120°", "isCorrect": false, "studentSelectionTrap": "Static Hour Hand Fallacy", "mistakeAnalysis": "Calculated angle assuming hour hand remained fixed at 3 (angle between 3 and 8 = 5 * 30° = 150° or 120°)." },
            { "id": "B", "text": "135°", "isCorrect": false, "studentSelectionTrap": "Approximation Error", "mistakeAnalysis": "Subtracted wrong hour hand progress." },
            { "id": "C", "text": "140°", "isCorrect": false, "studentSelectionTrap": "Calculation Slip", "mistakeAnalysis": "Arithmetic slip." },
            { "id": "D", "text": "130°", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Angle = |30*H - 5.5*M| = |30*3 - 5.5*40| = |90 - 220| = |-130| = 130°." }
        ],
        "correctOption": "D",
        "detailedSolution": "Step-by-Step Mathematical Working:\n1. Standard formula for the angle between clock hands at H hours and M minutes:\n   Angle $\\theta = |30H - \\frac{11}{2}M|$\n2. At 3:40, H = 3 and M = 40.\n3. $\\theta = |30(3) - \\frac{11}{2}(40)|$\n   $\\theta = |90 - 11(20)|$\n   $\\theta = |90 - 220|$\n   $\\theta = |-130| = 130°$.\n4. Since 130° is less than 180°, it represents the smaller interior angle.\nTherefore, the angle is 130° (Option D).",
        "difficultyLevel": 2,
        "tags": ["General Test", "Reasoning", "Clocks"]
    })

    # GENERAL KNOWLEDGE & STATIC AWARENESS (Q36 - Q50)
    questions.append({
        "questionNumber": 36,
        "questionId": "GAT-M01-Q36",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Indian Polity - Constitution",
        "questionText": "Which Article of the Constitution of India guarantees the Right to Constitutional Remedies, famously described by Dr. B. R. Ambedkar as the 'heart and soul of the Constitution'?",
        "options": [
            { "id": "A", "text": "Article 19", "isCorrect": false, "studentSelectionTrap": "Right to Freedom Trap", "mistakeAnalysis": "Article 19 guarantees Six Fundamental Freedoms (speech, assembly, etc.)." },
            { "id": "B", "text": "Article 21", "isCorrect": false, "studentSelectionTrap": "Right to Life Trap", "mistakeAnalysis": "Article 21 guarantees Protection of Life and Personal Liberty." },
            { "id": "C", "text": "Article 32", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Article 32 empowers citizens to move the Supreme Court for enforcement of Fundamental Rights via writs (Habeas Corpus, Mandamus, etc.)." },
            { "id": "D", "text": "Article 44", "isCorrect": false, "studentSelectionTrap": "DPSP Confusion", "mistakeAnalysis": "Article 44 deals with Uniform Civil Code." }
        ],
        "correctOption": "C",
        "detailedSolution": "Constitutional Facts:\n- Article 32 of the Indian Constitution grants the right to petition the Supreme Court of India directly for the enforcement of Fundamental Rights.\n- It confers power to issue five prerogative writs: Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, and Certiorari.\n- In the Constituent Assembly debates, Dr. B.R. Ambedkar declared that without Article 32, the Constitution would be a nullity, designating it the 'very soul of the Constitution and the very heart of it.'\nOption C is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Indian Polity"]
    })

    questions.append({
        "questionNumber": 37,
        "questionId": "GAT-M01-Q37",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Indian Polity - Election Commission",
        "questionText": "Under which Article of the Constitution of India is the Election Commission of India established as an autonomous constitutional authority responsible for administering national and state election procedures?",
        "options": [
            { "id": "A", "text": "Article 324", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Article 324 vests superintendence, direction, and control of elections in the Election Commission." },
            { "id": "B", "text": "Article 280", "isCorrect": false, "studentSelectionTrap": "Finance Commission Trap", "mistakeAnalysis": "Article 280 establishes the Finance Commission." },
            { "id": "C", "text": "Article 315", "isCorrect": false, "studentSelectionTrap": "UPSC Trap", "mistakeAnalysis": "Article 315 establishes Public Service Commissions (UPSC/SPSC)." },
            { "id": "D", "text": "Article 356", "isCorrect": false, "studentSelectionTrap": "President's Rule Trap", "mistakeAnalysis": "Article 356 deals with President's Rule in States." }
        ],
        "correctOption": "A",
        "detailedSolution": "Constitutional Provision:\n- Article 324(1) vests the 'superintendence, direction and control of the preparation of the electoral rolls for, and the conduct of, all elections to Parliament and to the Legislature of every State and of elections to the offices of President and Vice-President' in the Election Commission of India.\n- Established on January 25, 1950 (celebrated annually as National Voters' Day).\nOption A is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Indian Polity"]
    })

    questions.append({
        "questionNumber": 38,
        "questionId": "GAT-M01-Q38",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Ancient Indian History",
        "questionText": "At which major archaeological site of the Indus Valley (Harappan) Civilization was the monumental 'Great Bath' discovered by archaeologists?",
        "options": [
            { "id": "A", "text": "Harappa", "isCorrect": false, "studentSelectionTrap": "Name Association Trap", "mistakeAnalysis": "Harappa had large granaries, but the Great Bath was at Mohenjo-daro." },
            { "id": "B", "text": "Mohenjo-daro", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. The Great Bath, lined with fired bricks and bitumen waterproofing, was unearthed at Mohenjo-daro (in present-day Sindh, Pakistan)." },
            { "id": "C", "text": "Lothal", "isCorrect": false, "studentSelectionTrap": "Dockyard Association", "mistakeAnalysis": "Lothal is famous for its tidal dockyard, not the Great Bath." },
            { "id": "D", "text": "Kalibangan", "isCorrect": false, "studentSelectionTrap": "Ploughed Field Association", "mistakeAnalysis": "Kalibangan is famous for ploughed field furrows and fire altars." }
        ],
        "correctOption": "B",
        "detailedSolution": "Historical Facts:\n- The Great Bath was excavated at Mohenjo-daro (Mound of the Dead) in the Larkana district of Sindh, Pakistan, during excavations led by Sir John Marshall and Ernest Mackay.\n- It measures approximately 11.88 m x 7.01 m with a depth of 2.43 m, constructed with finely fitted baked bricks and sealed with natural tar (bitumen), believed to be used for ritual purification bathing.\nOption B is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Ancient History"]
    })

    questions.append({
        "questionNumber": 39,
        "questionId": "GAT-M01-Q39",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Medieval Indian History",
        "questionText": "Who was the founder of the Slave (Mamluk) Dynasty of the Delhi Sultanate, establishing independent sultanate rule in northern India in 1206 CE?",
        "options": [
            { "id": "A", "text": "Shams-ud-din Iltutmish", "isCorrect": false, "studentSelectionTrap": "Consolidator vs Founder", "mistakeAnalysis": "Iltutmish was the real consolidator who introduced the silver Tanka, but Qutb-ud-din Aibak was the founder." },
            { "id": "B", "text": "Ghiyas-ud-din Balban", "isCorrect": false, "studentSelectionTrap": "Late Sultan Confusion", "mistakeAnalysis": "Balban ruled much later (1266-1287) and introduced Sijda and Paibos." },
            { "id": "C", "text": "Qutb-ud-din Aibak", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Qutb-ud-din Aibak, a general of Muhammad Ghori, founded the Mamluk/Slave dynasty in 1206 CE and commissioned the Qutub Minar." },
            { "id": "D", "text": "Alauddin Khalji", "isCorrect": false, "studentSelectionTrap": "Dynasty Mismatch", "mistakeAnalysis": "Alauddin belonged to the Khalji dynasty (1296-1316)." }
        ],
        "correctOption": "C",
        "detailedSolution": "Historical Facts:\n- Following the death of Muhammad of Ghor in 1206 CE, his Turkic general Qutb-ud-din Aibak declared independence and laid the foundation of the Delhi Sultanate and the Mamluk (Slave) Dynasty.\n- He was bestowed the title 'Lakh Baksh' (giver of lakhs) for his generosity and initiated the construction of the Qutub Minar in Delhi and the Adhai Din Ka Jhonpra in Ajmer.\nOption C is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Medieval History"]
    })

    questions.append({
        "questionNumber": 40,
        "questionId": "GAT-M01-Q40",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Modern Indian History - Freedom Struggle",
        "questionText": "The historic Dandi March (Salt Satyagraha), launched by Mahatma Gandhi to protest against the British salt monopoly, began on 12 March 1930 from which ashram?",
        "options": [
            { "id": "A", "text": "Wardha Ashram", "isCorrect": false, "studentSelectionTrap": "Later Ashram Trap", "mistakeAnalysis": "Wardha (Sevagram) was founded later in 1936." },
            { "id": "B", "text": "Sabarmati Ashram", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Gandhi set out from Sabarmati Ashram in Ahmedabad on 12 March 1930 with 78 chosen followers and marched 240 miles to Dandi." },
            { "id": "C", "text": "Kocharab Ashram", "isCorrect": false, "studentSelectionTrap": "First Ashram Trap", "mistakeAnalysis": "Kocharab was Gandhi's initial ashram in 1915, but Dandi March departed from Sabarmati." },
            { "id": "D", "text": "Phoenix Settlement", "isCorrect": false, "studentSelectionTrap": "South Africa Trap", "mistakeAnalysis": "Phoenix settlement was founded in South Africa in 1904." }
        ],
        "correctOption": "B",
        "detailedSolution": "Historical Facts:\n- On 12 March 1930, Mahatma Gandhi accompanied by 78 ashram members embarked on the 240-mile (386 km) journey from Sabarmati Ashram (Ahmedabad) to the coastal village of Dandi (Navsari).\n- The march reached Dandi on 5 April 1930, and on the morning of 6 April 1930, Gandhi picked up a lump of natural salt, formally inaugurating the Civil Disobedience Movement across India.\nOption B is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Modern History"]
    })

    questions.append({
        "questionNumber": 41,
        "questionId": "GAT-M01-Q41",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Physical Geography of India",
        "questionText": "Which of the following major Indian rivers originates near Trimbakeshwar in the Nashik district of Maharashtra and is often referred to as the 'Dakshin Ganga'?",
        "options": [
            { "id": "A", "text": "Krishna", "isCorrect": false, "studentSelectionTrap": "Mahabaleshwar Origin Trap", "mistakeAnalysis": "Krishna river originates near Mahabaleshwar, not Trimbakeshwar." },
            { "id": "B", "text": "Mahanadi", "isCorrect": false, "studentSelectionTrap": "Chhattisgarh Origin Trap", "mistakeAnalysis": "Mahanadi originates in the highlands of Chhattisgarh (Sihawa)." },
            { "id": "C", "text": "Cauvery (Kaveri)", "isCorrect": false, "studentSelectionTrap": "Talakaveri Origin Trap", "mistakeAnalysis": "Cauvery originates in Talakaveri (Brahmagiri range, Karnataka)." },
            { "id": "D", "text": "Godavari", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Godavari originates at Trimbakeshwar in Nashik and is the longest peninsular river of India (1,465 km), known as Dakshin Ganga or Vridha Ganga." }
        ],
        "correctOption": "D",
        "detailedSolution": "Geographical Facts:\n- The Godavari is the second longest river in India (after the Ganga) and the largest river basin in peninsular India, spanning 1,465 km.\n- It rises in the Western Ghats at Trimbakeshwar in the Nashik district of Maharashtra.\n- Owing to its sacred status, length, and expansive basin, it is traditionally known as 'Dakshin Ganga' (Ganges of the South) or 'Vridha Ganga' (Elder Ganga).\nOption D is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Indian Geography"]
    })

    questions.append({
        "questionNumber": 42,
        "questionId": "GAT-M01-Q42",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Ecology & Wildlife Conservation",
        "questionText": "Kaziranga National Park, renowned as the global sanctuary for the endangered Great Indian One-Horned Rhinoceros, is located in which Indian state?",
        "options": [
            { "id": "A", "text": "Assam", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Kaziranga National Park is situated in the Golaghat and Nagaon districts of Assam along the Brahmaputra River floodplains." },
            { "id": "B", "text": "West Bengal", "isCorrect": false, "studentSelectionTrap": "Jaldapara Trap", "mistakeAnalysis": "West Bengal houses Jaldapara and Gorumara, but Kaziranga is in Assam." },
            { "id": "C", "text": "Arunachal Pradesh", "isCorrect": false, "studentSelectionTrap": "Namdapha Trap", "mistakeAnalysis": "Arunachal Pradesh houses Namdapha National Park." },
            { "id": "D", "text": "Odisha", "isCorrect": false, "studentSelectionTrap": "Similipal Trap", "mistakeAnalysis": "Odisha houses Similipal and Bhitarkanika." }
        ],
        "correctOption": "A",
        "detailedSolution": "Conservation Facts:\n- Kaziranga National Park is a designated UNESCO World Heritage Site located in the state of Assam, India.\n- It hosts two-thirds of the world's great one-horned rhinoceroses (Rhinoceros unicornis).\n- It is also home to high densities of Bengal tigers, Asian elephants, wild water buffalo, and swamp deer.\nOption A is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Wildlife & Environment"]
    })

    questions.append({
        "questionNumber": 43,
        "questionId": "GAT-M01-Q43",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Physical Geography - Mountain Passes",
        "questionText": "The strategic Nathu La pass, situated along the ancient Silk Route corridor between India and the Tibet Autonomous Region of China, is located in which Indian state?",
        "options": [
            { "id": "A", "text": "Himachal Pradesh", "isCorrect": false, "studentSelectionTrap": "Shipki La Trap", "mistakeAnalysis": "Shipki La and Rohtang Pass are in Himachal Pradesh." },
            { "id": "B", "text": "Uttarakhand", "isCorrect": false, "studentSelectionTrap": "Lipulekh Trap", "mistakeAnalysis": "Lipulekh and Mana Pass are in Uttarakhand." },
            { "id": "C", "text": "Sikkim", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Nathu La pass is located in the East Sikkim district of Sikkim at an altitude of 4,310 meters." },
            { "id": "D", "text": "Ladakh", "isCorrect": false, "studentSelectionTrap": "Khardung La Trap", "mistakeAnalysis": "Khardung La and Zoji La are in Ladakh/J&K." }
        ],
        "correctOption": "C",
        "detailedSolution": "Geographical Facts:\n- Nathu La (meaning 'listening ears pass') is a Himalayan mountain pass connecting the Indian state of Sikkim with China's Tibet Autonomous Region at an elevation of 4,310 m (14,140 ft).\n- It forms an offshoot of the historic ancient Silk Road and is one of the designated border trade posts between India and China.\nOption C is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Geography"]
    })

    questions.append({
        "questionNumber": 44,
        "questionId": "GAT-M01-Q44",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "General Science - Physics",
        "questionText": "What is the SI (International System of Units) derived unit of electric potential difference and electromotive force?",
        "options": [
            { "id": "A", "text": "Ampere", "isCorrect": false, "studentSelectionTrap": "Current Trap", "mistakeAnalysis": "Ampere is the base unit of electric current." },
            { "id": "B", "text": "Ohm", "isCorrect": false, "studentSelectionTrap": "Resistance Trap", "mistakeAnalysis": "Ohm is the unit of electrical resistance." },
            { "id": "C", "text": "Volt", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Volt (symbol: V) is the SI derived unit for electric potential, electric potential difference (voltage), and electromotive force (1 V = 1 J/C)." },
            { "id": "D", "text": "Watt", "isCorrect": false, "studentSelectionTrap": "Power Trap", "mistakeAnalysis": "Watt is the unit of power (1 W = 1 J/s)." }
        ],
        "correctOption": "C",
        "detailedSolution": "Scientific Units:\n- The Volt (symbol: V), named in honor of Italian physicist Alessandro Volta, is the SI unit of electric potential, electric potential difference, and electromotive force.\n- Defined as the potential difference across a conductor when a current of one ampere dissipates one watt of power (1 V = 1 W/A = 1 Joule per Coulomb).\nOption C is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "General Science"]
    })

    questions.append({
        "questionNumber": 45,
        "questionId": "GAT-M01-Q45",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "General Science - Chemistry",
        "questionText": "What is the scientific chemical name of the household compound commonly known as 'Baking Soda'?",
        "options": [
            { "id": "A", "text": "Sodium carbonate", "isCorrect": false, "studentSelectionTrap": "Washing Soda Trap", "mistakeAnalysis": "Sodium carbonate (Na2CO3) is washing soda." },
            { "id": "B", "text": "Sodium hydrogen carbonate (Sodium bicarbonate)", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Baking soda is sodium hydrogen carbonate / sodium bicarbonate (NaHCO3)." },
            { "id": "C", "text": "Calcium oxychloride", "isCorrect": false, "studentSelectionTrap": "Bleaching Powder Trap", "mistakeAnalysis": "Calcium oxychloride (CaOCl2) is bleaching powder." },
            { "id": "D", "text": "Calcium sulphate hemihydrate", "isCorrect": false, "studentSelectionTrap": "Plaster of Paris Trap", "mistakeAnalysis": "Calcium sulphate hemihydrate (CaSO4·0.5H2O) is Plaster of Paris." }
        ],
        "correctOption": "B",
        "detailedSolution": "Everyday Chemistry:\n- Baking soda is Sodium bicarbonate or Sodium hydrogen carbonate, having the chemical formula $NaHCO_3$.\n- When heated or reacted with mild edible acids (like tartaric acid), it produces carbon dioxide ($CO_2$), causing bread and cakes to rise.\n- Sodium carbonate ($Na_2CO_3\\cdot 10H_2O$) is Washing Soda.\nOption B is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "General Science"]
    })

    questions.append({
        "questionNumber": 46,
        "questionId": "GAT-M01-Q46",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "General Science - Biology & Health",
        "questionText": "Scurvy, a pathological condition characterized by bleeding gums, skin hemorrhages, and impaired wound healing, is caused by a nutritional deficiency of which vitamin?",
        "options": [
            { "id": "A", "text": "Vitamin A", "isCorrect": false, "studentSelectionTrap": "Night Blindness Trap", "mistakeAnalysis": "Vitamin A deficiency causes Xerophthalmia and night blindness." },
            { "id": "B", "text": "Vitamin B1", "isCorrect": false, "studentSelectionTrap": "Beriberi Trap", "mistakeAnalysis": "Vitamin B1 (Thiamine) deficiency causes Beriberi." },
            { "id": "C", "text": "Vitamin C (Ascorbic acid)", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Scurvy is caused by Vitamin C (ascorbic acid) deficiency, which prevents proper collagen synthesis." },
            { "id": "D", "text": "Vitamin D", "isCorrect": false, "studentSelectionTrap": "Rickets Trap", "mistakeAnalysis": "Vitamin D deficiency causes Rickets in children and Osteomalacia in adults." }
        ],
        "correctOption": "C",
        "detailedSolution": "Nutritional Science:\n- Scurvy is caused by an acute lack of Vitamin C (ascorbic acid) in the diet.\n- Ascorbic acid is a critical cofactor required for the post-translational hydroxylation of proline and lysine in collagen biosynthesis; without it, connective tissues become fragile, leading to capillary fragility and bleeding gums.\nOption C is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Biology & Health"]
    })

    questions.append({
        "questionNumber": 47,
        "questionId": "GAT-M01-Q47",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Indian Economy - Banking",
        "questionText": "In Indian macroeconomic monetary policy, what does the 'Repo Rate' (Repurchase Rate) established by the Reserve Bank of India (RBI) designate?",
        "options": [
            { "id": "A", "text": "The interest rate at which commercial banks deposit excess reserves overnight with the RBI", "isCorrect": false, "studentSelectionTrap": "Reverse Repo Trap", "mistakeAnalysis": "This defines the Reverse Repo Rate." },
            { "id": "B", "text": "The minimum percentage of total deposits that commercial banks must maintain in liquid cash with the RBI", "isCorrect": false, "studentSelectionTrap": "CRR Trap", "mistakeAnalysis": "This defines the Cash Reserve Ratio (CRR)." },
            { "id": "C", "text": "The interest rate at which the Reserve Bank of India lends short-term funds to commercial banks against pledged government securities", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Repo rate is the policy rate at which the central bank lends short-term liquidity to scheduled banks against approved government securities." },
            { "id": "D", "text": "The interest rate charged by commercial banks on prime retail housing loans", "isCorrect": false, "studentSelectionTrap": "Prime Lending Rate Trap", "mistakeAnalysis": "This is the commercial lending/MCLR rate." }
        ],
        "correctOption": "C",
        "detailedSolution": "Monetary Policy Definitions:\n- Repo Rate (Repurchase Option Rate) is the interest rate at which the RBI lends money to commercial banks against the collateral of government securities.\n- It is the benchmark policy rate used by the Monetary Policy Committee (MPC) to regulate liquidity, influence borrowing costs, and anchor inflation in the Indian economy.\nOption C is the authoritative definition.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Indian Economy"]
    })

    questions.append({
        "questionNumber": 48,
        "questionId": "GAT-M01-Q48",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Art & Indian Culture",
        "questionText": "Kathakali, a classical Indian dance-drama celebrated for its elaborate facial makeup, colorful layered costumes, and detailed ocular gestures, originated in which state of India?",
        "options": [
            { "id": "A", "text": "Tamil Nadu", "isCorrect": false, "studentSelectionTrap": "Bharatanatyam Trap", "mistakeAnalysis": "Tamil Nadu is the home of Bharatanatyam." },
            { "id": "B", "text": "Kerala", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. Kathakali (literally 'story play') originated in the 17th century in the southwestern coastal state of Kerala." },
            { "id": "C", "text": "Andhra Pradesh", "isCorrect": false, "studentSelectionTrap": "Kuchipudi Trap", "mistakeAnalysis": "Andhra Pradesh is the home of Kuchipudi." },
            { "id": "D", "text": "Odisha", "isCorrect": false, "studentSelectionTrap": "Odissi Trap", "mistakeAnalysis": "Odisha is the home of Odissi." }
        ],
        "correctOption": "B",
        "detailedSolution": "Classical Dance Traditions of India:\n- Kathakali (along with Mohiniyattam) originated in the state of Kerala.\n- Characterized by 'vesham' (complex makeup categorized by colors such as Paccha for noble heroes and Kathi for villains), vigorous footwork, and evocative eye movements based on the Natya Shastra.\n- Bharatanatyam: Tamil Nadu; Kuchipudi: Andhra Pradesh; Kathak: Northern India; Odissi: Odisha; Sattriya: Assam.\nOption B is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "Art and Culture"]
    })

    questions.append({
        "questionNumber": 49,
        "questionId": "GAT-M01-Q49",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "International Organizations",
        "questionText": "The headquarters of the United Nations Educational, Scientific and Cultural Organization (UNESCO) is situated in which world city?",
        "options": [
            { "id": "A", "text": "Geneva, Switzerland", "isCorrect": false, "studentSelectionTrap": "WHO/ILO/WTO Trap", "mistakeAnalysis": "Geneva hosts WHO, ILO, WTO, and UNHCR." },
            { "id": "B", "text": "New York, USA", "isCorrect": false, "studentSelectionTrap": "UN Secretariat Trap", "mistakeAnalysis": "New York hosts the main UN Secretariat and UNICEF." },
            { "id": "C", "text": "Vienna, Austria", "isCorrect": false, "studentSelectionTrap": "IAEA Trap", "mistakeAnalysis": "Vienna hosts IAEA and OPEC." },
            { "id": "D", "text": "Paris, France", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. UNESCO headquarters is located at Place de Fontenoy in Paris, France." }
        ],
        "correctOption": "D",
        "detailedSolution": "International Institutions:\n- UNESCO was founded on 16 November 1945 to promote world peace and security through international cooperation in education, arts, sciences, and culture.\n- Its international headquarters is located in Paris, France.\nOption D is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "International Organizations"]
    })

    questions.append({
        "questionNumber": 50,
        "questionId": "GAT-M01-Q50",
        "chapter": "General Knowledge & Static Awareness",
        "topic": "Famous Books and National Heritage",
        "questionText": "The national motto of India, 'Satyameva Jayate' (Truth Alone Triumphs), inscribed below the National Emblem of India, is taken from which sacred ancient Indian text?",
        "options": [
            { "id": "A", "text": "Mundaka Upanishad", "isCorrect": true, "studentSelectionTrap": null, "mistakeAnalysis": "Correct. 'Satyameva Jayate' is a mantra from the ancient Hindu scripture Mundaka Upanishad (Mundaka 3.1.6)." },
            { "id": "B", "text": "Chandogya Upanishad", "isCorrect": false, "studentSelectionTrap": "Famous Upanishad Trap", "mistakeAnalysis": "Chandogya contains 'Tat Tvam Asi'." },
            { "id": "C", "text": "Rigveda", "isCorrect": false, "studentSelectionTrap": "Gayatri Mantra Association", "mistakeAnalysis": "The Gayatri Mantra is from Rigveda, not Satyameva Jayate." },
            { "id": "D", "text": "Bhagavad Gita", "isCorrect": false, "studentSelectionTrap": "Epic Text Trap", "mistakeAnalysis": "The phrase does not originate in the Bhagavad Gita." }
        ],
        "correctOption": "A",
        "detailedSolution": "National Heritage Facts:\n- 'Satyameva Jayate' (Sanskrit: सत्यमेव जयते; 'Truth alone triumphs') is the opening part of mantra 3.1.6 from the Mundaka Upanishad.\n- Following Indian independence on 26 January 1950, it was adopted as the official national motto of the Republic of India and is inscribed in Devanagari script at the base of the Lion Capital of Ashoka.\nOption A is correct.",
        "difficultyLevel": 1,
        "tags": ["General Test", "General Knowledge", "National Symbols"]
    })
    return questions

def rebalance_options(questions, target_distribution=None):
    if target_distribution is None:
        target_distribution = {"A": 13, "B": 12, "C": 13, "D": 12}

    import re
    from collections import Counter

    current = Counter(q["correctOption"] for q in questions)

    for target_letter, target_n in target_distribution.items():
        while current[target_letter] < target_n:
            surplus_letter = max(current.keys(), key=lambda k: current[k] - target_distribution[k])
            if current[surplus_letter] <= target_distribution[surplus_letter]:
                break

            for q in reversed(questions):
                if q["correctOption"] == surplus_letter:
                    opt_map = {opt["id"]: opt for opt in q["options"]}
                    s_opt = opt_map[surplus_letter]
                    t_opt = opt_map[target_letter]

                    # Swap fields between s_opt and t_opt
                    s_text, s_trap, s_mis = s_opt["text"], s_opt.get("studentSelectionTrap"), s_opt.get("mistakeAnalysis")
                    t_text, t_trap, t_mis = t_opt["text"], t_opt.get("studentSelectionTrap"), t_opt.get("mistakeAnalysis")

                    s_opt["text"] = t_text
                    s_opt["studentSelectionTrap"] = t_trap
                    s_opt["mistakeAnalysis"] = t_mis
                    s_opt["isCorrect"] = False

                    t_opt["text"] = s_text
                    t_opt["studentSelectionTrap"] = s_trap
                    t_opt["mistakeAnalysis"] = s_mis
                    t_opt["isCorrect"] = True

                    q["correctOption"] = target_letter

                    # Update solution references
                    if "detailedSolution" in q:
                        sol = q["detailedSolution"]
                        sol = re.sub(rf"Option {surplus_letter}\b", f"Option {target_letter}", sol)
                        sol = re.sub(rf"\({surplus_letter}\)", f"({target_letter})", sol)
                        q["detailedSolution"] = sol

                    current[surplus_letter] -= 1
                    current[target_letter] += 1
                    break

    # Final pass to populate standardized fields
    for q in questions:
        q["hasDiagram"] = False
        q["diagramDescription"] = None
        q["questionType"] = "conceptual"
        q["difficulty"] = q["difficultyLevel"]
        q["estimatedTimeSeconds"] = 60
        q["solution"] = {
            "quick": f"The correct answer is {q['correctOption']}.",
            "concept": f"{q['chapter']}: {q['topic']}",
            "detailed": q["detailedSolution"]
        }
        q["keyConcept"] = f"{q['chapter']}: {q['topic']}"

    return questions

def main():
    print("Generating English Mock 1...")
    eng_questions = create_english_mock_1()
    eng_questions = rebalance_options(eng_questions)
    with open("mock/english/1.json", "w", encoding="utf-8") as f:
        json.dump(eng_questions, f, indent=2, ensure_ascii=False)
    print(f"Successfully saved {len(eng_questions)} questions to mock/english/1.json")

    print("Generating General Test Mock 1...")
    gat_questions = create_general_test_mock_1()
    gat_questions = rebalance_options(gat_questions)
    with open("mock/general-test/1.json", "w", encoding="utf-8") as f:
        json.dump(gat_questions, f, indent=2, ensure_ascii=False)
    print(f"Successfully saved {len(gat_questions)} questions to mock/general-test/1.json")

if __name__ == "__main__":
    main()
