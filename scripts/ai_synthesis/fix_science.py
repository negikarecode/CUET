import os
import json
import re
import random
from scripts.ai_synthesis.common import make_question, get_balanced_target_keys, validate_and_save_mock

def normalize_text(text):
    if not text:
        return ''
    text = re.sub(r'^\[Set\s+[^\]]+\]\s*', '', text)
    text = re.sub(r'[^a-z0-9 ]', '', re.sub(r'\s+', ' ', text.lower().strip()))
    return text

def fix_science_subjects():
    print("=== FIXING SCIENCE SUBJECTS FOR ZERO REPEATS ===")
    
    # =========================================================================
    # 1. PHYSICS (Mocks 42..50 = 9 mocks)
    # =========================================================================
    phys_seen = set()
    for m in range(1, 42):
        with open(f"mock/physics/{m}.json", "r", encoding="utf-8") as f:
            for q in json.load(f):
                phys_seen.add(normalize_text(q.get("questionText") or q.get("prompt") or ""))
    print(f"Physics baseline unique stems: {len(phys_seen)}")

    phys_chapters = [
        "Electric Charges and Fields",
        "Electrostatic Potential and Capacitance",
        "Current Electricity",
        "Moving Charges and Magnetism",
        "Magnetism and Matter",
        "Electromagnetic Induction",
        "Alternating Current",
        "Electromagnetic Waves",
        "Ray Optics and Optical Instruments",
        "Wave Optics",
        "Dual Nature of Radiation and Matter",
        "Atoms",
        "Nuclei",
        "Semiconductor Electronics: Materials, Devices and Simple Circuits"
    ]

    for m in range(42, 51):
        target_keys = get_balanced_target_keys(seed=4200 + m, count=50)
        rng = random.Random(f"PHYSICS_UNIQUE_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)

        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            ch = phys_chapters[(q_idx - 1) % len(phys_chapters)]

            attempt = 0
            while True:
                seed_val = m * 1000 + q_idx * 20 + attempt
                mod_idx = (q_idx - 1) % 14 + 1
                
                if mod_idx == 1:
                    q1 = 2 + (seed_val % 13)
                    q2 = 3 + ((seed_val * 3) % 17)
                    r_cm = 10 + (seed_val % 40) * 2
                    K = 2 + (seed_val % 12)
                    stem = f"Two point charges of +{q1} microCoulombs and +{q2} microCoulombs are placed {r_cm} cm apart in a medium of dielectric constant K = {K}. If the force in vacuum is F0, the electrostatic force in this medium is:"
                    corr = f"F0 / {K}"
                    wrongs = [f"{K} * F0", f"F0 / {K**2}", f"{K**2} * F0"]
                    sol = f"By Coulomb's law in a dielectric medium, F = F0 / K = F0 / {K}."
                    top = "Coulomb's Law in Dielectric"
                    qtype = "direct-numerical"
                elif mod_idx == 2:
                    A = 100 + (seed_val % 25) * 10
                    d_mm = 1 + (seed_val % 9)
                    K_slab = 2 + (seed_val % 10)
                    stem = f"A parallel plate capacitor with area {A} cm^2 and plate separation {d_mm} mm has capacitance C0 in air. A dielectric slab of constant K = {K_slab} completely filling the space is introduced while connected to a battery of voltage V = {50 + (seed_val%5)*20} V. The final stored energy is:"
                    corr = f"{K_slab} * U0"
                    wrongs = [f"U0 / {K_slab}", "Remains exactly U0", f"{K_slab**2} * U0"]
                    sol = f"With battery connected, V remains constant and C = K * C0 = {K_slab} * C0. The energy U = 0.5 * C * V^2 = {K_slab} * U0."
                    top = "Energy in Dielectric Capacitor"
                    qtype = "conceptual"
                elif mod_idx == 3:
                    L_ratio = 2 + (seed_val % 7)
                    stem = f"Two cylindrical copper wires X and Y of identical mass have lengths in the ratio 1 : {L_ratio}. Their electrical resistances are in the ratio:"
                    ratio = L_ratio**2
                    corr = f"1 : {ratio}"
                    wrongs = [f"1 : {L_ratio}", f"{ratio} : 1", f"1 : {ratio * 2}"]
                    sol = f"Resistance R = rho * L / A = rho * L^2 * d / mass. Since mass is identical, R proportional to L^2. Hence ratio is 1 : {ratio}."
                    top = "Resistance Dependence on Dimensions"
                    qtype = "direct-numerical"
                elif mod_idx == 4:
                    B_val = 0.1 + (seed_val % 20) * 0.05
                    v_exp = 2 + (seed_val % 8)
                    stem = f"A proton of mass 1.67e-27 kg enters a uniform magnetic field B = {B_val:.2f} T perpendicular to its velocity v = {v_exp}e5 m/s. The centripetal magnetic force acting on the proton is:"
                    F_mag = 1.6e-19 * (v_exp * 1e5) * B_val
                    corr = f"{F_mag:.2e} N"
                    wrongs = [f"{F_mag*10:.2e} N", f"{F_mag/10:.2e} N", f"{F_mag*2:.2e} N"]
                    sol = f"The magnetic Lorentz force is F = q * v * B * sin(90) = (1.6e-19) * ({v_exp}e5) * ({B_val:.2f}) = {F_mag:.2e} N."
                    top = "Magnetic Lorentz Force"
                    qtype = "direct-numerical"
                elif mod_idx == 5:
                    chi_val = -(seed_val % 10 + 1) * 1.2
                    T_init = 250 + (seed_val % 8) * 15
                    T_fin = T_init + 100 + (seed_val % 5) * 50
                    stem = f"A certain magnetic material has a volume magnetic susceptibility chi = {chi_val:.1f}e-5 at temperature T = {T_init} K. When the temperature is increased to {T_fin} K, its susceptibility will:"
                    corr = "Remain practically unchanged (diamagnetic behavior)"
                    wrongs = ["Increase by a factor of 2", "Decrease inversely with absolute temperature (Curie law)", "Drop abruptly to zero"]
                    sol = "Negative, small susceptibility characterizes diamagnetic substances, whose susceptibility is temperature-independent."
                    top = "Diamagnetic Susceptibility Invariance"
                    qtype = "conceptual"
                elif mod_idx == 6:
                    L_mH = 10 + (seed_val % 20) * 5
                    I_rate = 2 + (seed_val % 9)
                    stem = f"The electric current in an inductor of self-inductance L = {L_mH} mH decreases uniformly at a rate of {I_rate} A/s. The magnitude of the self-induced EMF across the coil is:"
                    emf = (L_mH * 1e-3) * I_rate
                    corr = f"{emf*1000:.1f} mV"
                    wrongs = [f"{emf*100:.1f} mV", f"{emf*10000:.1f} mV", f"{emf*500:.1f} mV"]
                    sol = f"Induced EMF e = L * (dI/dt) = ({L_mH}e-3 H) * ({I_rate} A/s) = {emf} V = {emf*1000:.1f} mV."
                    top = "Self-Induced EMF"
                    qtype = "direct-numerical"
                elif mod_idx == 7:
                    R_val = 20 + (seed_val % 10) * 10
                    XL_val = 60 + (seed_val % 12) * 10
                    XC_val = 20 + (seed_val % 8) * 10
                    Z_val = int((R_val**2 + (XL_val - XC_val)**2)**0.5)
                    stem = f"In a series LCR alternating circuit, the components have R = {R_val} ohms, XL = {XL_val} ohms, and XC = {XC_val} ohms. The net impedance Z of the circuit is:"
                    corr = f"{Z_val} ohms"
                    wrongs = [f"{R_val + XL_val + XC_val} ohms", f"{abs(XL_val - XC_val)} ohms", f"{Z_val + 25} ohms"]
                    sol = f"Impedance Z = sqrt(R^2 + (XL - XC)^2) = sqrt({R_val}^2 + ({XL_val} - {XC_val})^2) = {Z_val} ohms."
                    top = "Series LCR Impedance"
                    qtype = "direct-numerical"
                elif mod_idx == 8:
                    freq_val = 80 + (seed_val % 25) * 10
                    stem = f"An electromagnetic wave has an electric field oscillating at frequency {freq_val} MHz in free space. The wavelength of this electromagnetic radiation is:"
                    lam = 300 / freq_val
                    corr = f"{lam:.2f} m"
                    wrongs = [f"{lam*10:.2f} m", f"{lam/10:.2f} m", f"{lam*2:.2f} m"]
                    sol = f"Wavelength lambda = c / f = (3e8 m/s) / ({freq_val}e6 Hz) = {lam:.2f} m."
                    top = "EM Wave Wavelength"
                    qtype = "direct-numerical"
                elif mod_idx == 9:
                    f_cm = 10 + (seed_val % 8) * 5
                    u_mult = 2 + (seed_val % 4)
                    u_cm = f_cm * u_mult
                    v_calc = (f_cm * u_cm) / (u_cm - f_cm)
                    stem = f"An optical object is placed at distance u = -{u_cm} cm along the principal axis of a thin convex lens of focal length f = +{f_cm} cm. The position of the formed real image v is:"
                    corr = f"+{v_calc:.1f} cm"
                    wrongs = [f"-{v_calc:.1f} cm", f"+{v_calc/2:.1f} cm", f"+{v_calc*2:.1f} cm"]
                    sol = f"Using thin lens formula 1/v - 1/u = 1/f: 1/v = 1/{f_cm} - 1/{u_cm} => v = +{v_calc:.1f} cm."
                    top = "Thin Lens Equation"
                    qtype = "direct-numerical"
                elif mod_idx == 10:
                    d_val = 0.2 + (seed_val % 8) * 0.1
                    D_val = 1.0 + (seed_val % 6) * 0.2
                    lam_nm = 450 + (seed_val % 10) * 30
                    beta = (lam_nm * 1e-9 * D_val) / (d_val * 1e-3) * 1e3
                    stem = f"In Young's double-slit experiment, monochromatic light of wavelength {lam_nm} nm illuminates slits separated by {d_val:.2f} mm with a screen distance of {D_val:.1f} m. The fringe width beta is:"
                    corr = f"{beta:.2f} mm"
                    wrongs = [f"{beta*2:.2f} mm", f"{beta/2:.2f} mm", f"{beta*10:.2f} mm"]
                    sol = f"Fringe width beta = (lambda * D) / d = ({lam_nm}e-9 * {D_val}) / ({d_val}e-3) = {beta:.2f} mm."
                    top = "YDSE Fringe Width"
                    qtype = "direct-numerical"
                elif mod_idx == 11:
                    V_acc = 40 + (seed_val % 30) * 15
                    lam_e = 1.227 / (V_acc**0.5)
                    stem = f"An electron beam is accelerated from rest through a potential difference of {V_acc} V. The associated de Broglie wavelength is approximately:"
                    corr = f"{lam_e:.3f} nm"
                    wrongs = [f"{lam_e*10:.3f} nm", f"{lam_e/10:.3f} nm", f"{lam_e*2:.3f} nm"]
                    sol = f"For an electron, de Broglie wavelength lambda = 1.227 / sqrt(V) nm = 1.227 / sqrt({V_acc}) = {lam_e:.3f} nm."
                    top = "Electron de Broglie Wavelength"
                    qtype = "direct-numerical"
                elif mod_idx == 12:
                    n_level = 2 + (seed_val % 5)
                    atom_type = "hydrogen atom" if (seed_val % 2 == 0) else "singly ionized helium He+ ion"
                    Z = 1 if atom_type == "hydrogen atom" else 2
                    E_n = -13.6 * (Z**2) / (n_level**2)
                    stem = f"According to the Bohr model, the total electronic energy of a {atom_type} in the stationary orbital state with principal quantum number n = {n_level} is:"
                    corr = f"{E_n:.2f} eV"
                    wrongs = [f"{-13.6 * n_level:.2f} eV", f"{E_n * 2:.2f} eV", f"+{abs(E_n):.2f} eV"]
                    sol = f"In Bohr model, En = -13.6 * Z^2 / n^2 eV = -13.6 * {Z}^2 / {n_level}^2 = {E_n:.2f} eV."
                    top = "Bohr Energy Levels"
                    qtype = "direct-numerical"
                elif mod_idx == 13:
                    A_nuc = [8, 27, 64, 125, 216, 343, 512][seed_val % 7]
                    R_nuc = 1.2 * (A_nuc**(1/3))
                    stem = f"Given that the empirical constant R0 = 1.2 fm, the estimated nuclear radius of a nuclide with mass number A = {A_nuc} is:"
                    corr = f"{R_nuc:.2f} fm"
                    wrongs = [f"{R_nuc * 2:.2f} fm", f"{1.2 * A_nuc:.2f} fm", f"{R_nuc / 2:.2f} fm"]
                    sol = f"Nuclear radius R = R0 * A^(1/3) = 1.2 * ({A_nuc}^(1/3)) = {R_nuc:.2f} fm."
                    top = "Nuclear Radius Estimation"
                    qtype = "direct-numerical"
                else:
                    Eg_val = 0.65 + (seed_val % 20) * 0.08
                    stem = f"A crystalline semiconductor material has an energy bandgap Eg = {Eg_val:.2f} eV. For optical absorption and electron-hole pair generation, the maximum threshold wavelength of incident photons is:"
                    corr = f"{1240 / Eg_val:.1f} nm"
                    wrongs = [f"{(1240 / Eg_val) * 2:.1f} nm", f"{(1240 / Eg_val) / 2:.1f} nm", f"{1240 * Eg_val:.1f} nm"]
                    sol = f"Threshold wavelength lambda_th = hc / Eg = 1240 eV.nm / {Eg_val:.2f} eV = {1240 / Eg_val:.1f} nm."
                    top = "Semiconductor Threshold Wavelength"
                    qtype = "direct-numerical"

                norm_stem = normalize_text(stem)
                if norm_stem not in phys_seen:
                    phys_seen.add(norm_stem)
                    break
                attempt += 1

            q = make_question(
                "physics", "physics", "PHYSICS", m, q_idx,
                ch, top, stem, corr, wrongs, t_key, sol,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)

        validate_and_save_mock("physics", "physics", "PHYSICS", m, questions)

    print(f"Physics Mocks 42..50 generated with 100% unique questions! Total seen: {len(phys_seen)}")

if __name__ == "__main__":
    fix_science_subjects()
