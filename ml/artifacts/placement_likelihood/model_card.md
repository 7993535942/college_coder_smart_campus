# Model Card: Model P — Campus Placement Likelihood

## Model Details
- **Developer**: SmartCampus AI Team
- **Model Date**: 2026-10-08
- **Model Version**: 2.0.0-d3
- **Model Type**: RandomForestClassifier with Isotonic Probability Calibration
- **Provenance**: College Student Placement Factors Dataset (sahilislam007)

## Intended Use
- **Primary Use**: Institutional placement readiness advising to help faculty guide students before the campus placement cycle.
- **Out-of-Scope**: Exclusion of students from recruitment drives.

## Factors & Exclusions
- **Features Used**: CGPA, latest GPA, aptitude assessment index, soft skills communication, extracurricular activity score, internship flag, completed projects count.
- **Sensitive Features Excluded**: College ID, demographics.
