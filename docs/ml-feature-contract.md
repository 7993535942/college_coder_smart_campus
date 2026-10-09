# SmartCampus AI — Machine Learning Feature Contract Specification

This document details the feature harmonization contract defined in [`ml/feature_contract.yaml`](file:///c:/Users/Krishnapoojala/OneDrive/Desktop/smart%20campus%20ai/ml/feature_contract.yaml). It defines how public student datasets are bridged to the platform's unified student schema without train/serve drift.

---

## 1. Core Principles

1. **Zero Train/Serve Skew**: Both offline training and online serving pipelines parse feature definitions from `ml/feature_contract.yaml`.
2. **Responsible AI Exclusions**: Sensitive demographic (gender, age, marital status, nationality) and socioeconomic/financial factors (debtor flag, tuition fees paid, family income) are strictly prohibited from all feature spaces.
3. **Canonical Normalization**: All features are standardized into intuitive academic scales:
   - Percentage metrics: `[0.0, 100.0]`
   - Grade points (CGPA): `[0.0, 10.0]`
   - Unit pass ratios: `[0.0, 1.0]`
   - Participation flags: binary `0` or `1`

---

## 2. Model Feature Mappings

### Model A: Academic Risk (`academic_risk`)
*Trained on UCI Machine Learning Repository ID 697 (Dropout and Academic Success).*

| Canonical Feature | Source Dataset Column | Transformation | App Field Path | Range | Directionality |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `entry_score_pct` | `Admission grade` | `÷ 2` (0–200 to 0–100) | `academic.entryScore` | 0–100 | Higher reduces risk |
| `prev_score_pct` | `Previous qualification (grade)` | `÷ 2` (0–200 to 0–100) | `academic.previousScore` | 0–100 | Higher reduces risk |
| `sem_prev_units` | `Curricular units 1st sem (enrolled)` | Direct integer | `academic.semesterHistory[0].unitsEnrolled` | 0–30 | Neutral |
| `sem_prev_pass_ratio` | `1st sem approved / enrolled` | Ratio clipped to [0, 1] | `unitsPassed / unitsEnrolled` | 0.0–1.0 | Higher reduces risk |
| `sem_prev_marks_pct` | `Curricular units 1st sem (grade)` | `÷ 20 × 100` | `academic.semesterHistory[0].avgMarks` | 0–100 | Higher reduces risk |
| `sem_last_units` | `Curricular units 2nd sem (enrolled)` | Direct integer | `academic.semesterHistory[1].unitsEnrolled` | 0–30 | Neutral |
| `sem_last_pass_ratio` | `2nd sem approved / enrolled` | Ratio clipped to [0, 1] | `unitsPassed / unitsEnrolled` | 0.0–1.0 | Higher reduces risk |
| `sem_last_marks_pct` | `Curricular units 2nd sem (grade)` | `÷ 20 × 100` | `academic.semesterHistory[1].avgMarks` | 0–100 | Higher reduces risk |
| `marks_delta` | Derived: `2nd sem grade - 1st sem grade` | Percentage point diff | `last.avgMarks - prev.avgMarks` | -50 to +50 | Higher reduces risk |
| `pass_ratio_delta` | Derived: `2nd sem pass - 1st sem pass` | Ratio diff | `last_pass_ratio - prev_pass_ratio` | -1.0 to +1.0 | Higher reduces risk |

---

### Model P: Placement Likelihood (`placement_likelihood`)
*Trained on College Student Placement Factors Dataset.*

| Canonical Feature | Source Dataset Column | Transformation | App Field Path | Range | Directionality |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `cgpa` | `CGPA` | Direct float | `academic.cgpa` | 0.0–10.0 | Higher increases likelihood |
| `latest_gpa` | `Prev_Sem_Result` | Normalized to 0–10 | `academic.semesterHistory[1].avgMarks / 10` | 0.0–10.0 | Higher increases likelihood |
| `aptitude_index` | `IQ` | Min-max scaled to 0–100 | `placement.aptitude` | 0–100 | Higher increases likelihood |
| `communication_score` | `Communication_Skills` | Scaled to 0–100 | `skills.soft` | 0–100 | Higher increases likelihood |
| `extracurricular_score` | `Extra_Curricular_Score` | Scaled to 0–100 | `engagement.extracurricularActivity` | 0–100 | Higher increases likelihood |
| `internship_flag` | `Internship_Experience` | `"Yes" -> 1, "No" -> 0` | `placement.internshipExperience` | 0 or 1 | Higher increases likelihood |
| `projects_completed` | `Projects_Completed` | Capped at 99th percentile | `skills.projectsCompleted` | 0–20 | Higher increases likelihood |

---

### Model X: Exam Score Predictor (`exam_score_predictor`)
*Trained on Student Performance Factors Dataset.*

| Canonical Feature | Source Dataset Column | Transformation | App Field Path | Range |
| :--- | :--- | :--- | :--- | :--- |
| `attendance_pct` | `Attendance` | Direct float | `attendance.percentage` | 0–100% |
| `study_hours_week` | `Hours_Studied` | Direct float | `lms.learningHours` | 0–60 hrs |
| `prev_score_pct` | `Previous_Scores` | Direct float | `academic.previousScore` | 0–100 |
| `tutoring_per_month` | `Tutoring_Sessions` | Direct integer | `academic.tutoringSessions` | 0–15 |
| `extracurricular_flag` | `Extracurricular_Activities` | `"Yes" -> 1, "No" -> 0` | Derived: `clubs + events + hackathons > 0` | 0 or 1 |
