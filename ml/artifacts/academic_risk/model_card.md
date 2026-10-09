# Model Card: Model A — Academic Risk Predictor

## Model Details
- **Developer**: SmartCampus AI Team
- **Model Date**: 2026-10-08
- **Model Version**: 2.0.0-d1
- **Model Type**: HistGradientBoostingClassifier with Sigmoid Probability Calibration
- **Paper / Source Provenance**: Realinho et al., 2021; Predict Students' Dropout and Academic Success (UCI ID 697)

## Intended Use
- **Primary Use**: Decision-support tool for academic mentors to identify students showing early patterns of academic distress.
- **Out-of-Scope**: Automated decisions regarding student grades, dismissal, or sanctions.

## Factors & Exclusions
- **Features Used**: Admission grade, previous qualification grade, 1st & 2nd semester unit counts, course pass ratios, marks percentages, semester-over-semester delta.
- **Sensitive Features Excluded**: Gender, age, marital status, nationality, debtor flag, tuition fee status, and all socioeconomic identifiers.
