# SmartCampus AI — Scoring & Risk Fusion Methodology

This document outlines the scoring algorithms, indicator weight distributions, risk escalation logic, and Rules vs ML fusion implemented in SmartCampus AI (v2).

---

## 1. Student Success Score Formula (FR-06)

The primary Student Success Score is a transparent, deterministic 0–100 index evaluated across six core institutional dimensions:

$$\text{Success Score} = \sum (\text{Component Score}_i \times \text{Weight}_i)$$

| Dimension | Weight | Primary Indicators | Range |
| :--- | :---: | :--- | :---: |
| **Academic Performance** | **25%** | CGPA, Latest semester marks, Course pass ratio, Backlog penalty | 0–100 |
| **Biometric Attendance** | **15%** | Biometric attendance percentage, Monthly attendance trend | 0–100 |
| **LMS Portal Activity** | **15%** | Assignment submission rate, Self-study hours, Activity trend | 0–100 |
| **Placement Readiness** | **20%** | Aptitude score, Coding diagnostic, Mock interview, Internship flag | 0–100 |
| **Skills & Capstones** | **15%** | Technical skills assessment, Soft skills, Completed projects | 0–100 |
| **Campus Engagement** | **10%** | Extracurricular activities, Clubs, Hackathons, Certifications | 0–100 |

---

## 2. Rule-Based Risk Identification (FR-07)

### Baseline Thresholds
- **LOW Risk**: Score between $80 \le \text{Score} \le 100$
- **MEDIUM Risk**: Score between $60 \le \text{Score} < 80$
- **HIGH Risk**: Score between $0 \le \text{Score} < 60$

### Explicit Critical Risk Signals
A student's baseline risk is escalated by one tier (e.g. `LOW` $\to$ `MEDIUM`, or `MEDIUM` $\to$ `HIGH`) if **two or more** explicit signals trigger:
1. Biometric attendance critically sub-threshold: $< 60\%$
2. Severe backlog burden: $\ge 3$ active failed courses
3. Technical coding diagnostic failure: $< 50/100$
4. Steep negative LMS engagement drop: $<-25\%$
5. Placement readiness component: $< 50/100$

---

## 3. ML Risk Fusion & Agreement Matrix (FR-24)

SmartCampus AI employs a **two-tiered second-opinion architecture**:
1. **Rule Score Remains Primary**: Explainable, transparent baseline.
2. **ML Escalation**: Calibrated probability from Model A (`academic_risk`).
   - If Model A probability $\ge 0.60$ (`HIGH` band), rule risk is escalated by at most one step.
   - **ML never silently lowers rule-based risk** (conservative safety guarantee).
   - Source is recorded as `rules+ml`.

### Rules vs ML Agreement Categories
- **Confirmed High**: Both rules and ML model evaluate the student as `HIGH` risk.
- **ML Early Warning**: Rules evaluated `LOW` or `MEDIUM`, but the ML model flagged `HIGH` risk based on longitudinal feature patterns (e.g., semester marks delta or pass ratio slip).
- **Rules-Only Alert**: Rules evaluated `HIGH`, while the model did not.
- **Aligned**: Rules and ML model predictions are in agreement.
