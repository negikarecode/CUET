import json, re

def normalize_text(text):
    if not text: return ""
    t = text.lower()
    t = re.sub(r"\[cite:[^\]]+\]", "", t)
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    t = re.sub(r"[\$\\\{\}\(\)\[\]_^\s\.,;:\-\+=\*\/<>]+", "", t)
    return t

seen = set()
for m in range(1, 21):
    with open(f"mock/physics/{m}.json") as f:
        for q in json.load(f):
            seen.add(normalize_text(q["questionText"]))

test_texts = [
    "A thin circular ring of radius $R$ carries a uniform positive charge $Q$. At what distance $x$ along the axis from the center of the ring is the electric field intensity maximum?",
    "A point charge $q$ is placed at the center of the open flat circular base of a hollow hemispherical surface of radius $R$. What is the total electric flux passing through the curved surface of the hemisphere?",
    "The voltage sensitivity of a moving coil galvanometer is defined as the deflection per unit voltage: $V_s = \\frac{\\theta}{V} = \\frac{N B A}{k R}$. If the number of turns $N$ in the coil is doubled while the coil area and restoring torque per unit twist $k$ remain constant, but the resistance of the wire is also doubled as a result, what happens to the voltage sensitivity?",
    "Arrange the following electromagnetic radiations in order of INCREASING frequency (lowest frequency first):\n(A) Microwaves\n(B) Ultraviolet rays\n(C) Infrared waves\n(D) X-rays",
    "A point source of light is located at the center of a homogeneous isotropic medium. What is the shape of the wavefront produced by this point source, and how are light rays oriented relative to the wavefront?",
    "In domestic electric power supply circuits, electrical appliances are connected in parallel rather than in series primarily because:",
    "In which of the following circuit configurations is the p-n junction diode forward-biased?",
    "Two long coaxial solenoids $S_1$ and $S_2$ of identical length $l$ and radius $r_1 < r_2$ have turns $N_1$ and $N_2$ respectively. The mutual inductance $M$ between them is proportional to:",
    "If the de Broglie wavelength of a moving particle of mass $m$ is $\\lambda$, its kinetic energy $K$ is given by:",
    "At room temperature ($300\\text{ K}$), the forbidden energy bandgap ($E_g$) values for Silicon ($\\text{Si}$) and Germanium ($\\text{Ge}$) are approximately:",
    "Which of the following statements correctly describes Coulomb's law of electrostatics?",
    "In a standard balanced Wheatstone bridge consisting of four arms with resistances $P, Q, R, S$, the galvanometer shows zero deflection. If the positions of the battery and the galvanometer are interchanged, what happens to the balance condition?",
    "Two isolated point charges $+q$ and $+4q$ are placed a distance $r$ apart in vacuum, exerting an electrostatic repulsive force $F$ on each other. If a third point charge $+2q$ is placed midway between them, what is the electrostatic force exerted specifically by $+q$ on $+4q$?",
    "Which of the following optical phenomena is NOT primarily based on the principle of Total Internal Reflection (TIR)?",
    "To convert a moving coil galvanometer of resistance $G$ and full-scale deflection current $I_g$ into a voltmeter capable of reading up to potential difference $V$, one must connect:",
    "In Rutherford's $\\alpha$-particle scattering experiment, an $\\alpha$-particle of mass $m_\\alpha$, charge $2e$, and initial kinetic energy $K$ approaches a heavy nucleus of atomic number $Z$ head-on. The distance of closest approach $r_0$ is:",
    "For a short electric dipole of dipole moment $\\vec{p} = 2qa \\hat{z}$, how does the magnitude of the electric field $E$ vary with distance $r$ at points far from the dipole ($r \\gg a$)?"
]

for idx, txt in enumerate(test_texts):
    norm = normalize_text(txt)
    if norm in seen:
        print(f"Collision on item {idx}: {txt[:40]}")
    else:
        print(f"Item {idx}: OK (Unique)")
