"""Tests for Feature Harmonization Contract and Synthetic Demo Cohort.

Validates:
1. Feature contract structure and completeness
2. CSV demo dataset schema and row count
3. Scripted demo student (Rahul Kumar) exact specifications
4. Presence of intentional anomalies for data quality testing
5. MongoDB seed JSON schema conformance
"""

import os
import json
import yaml
import pytest
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CONTRACT_PATH = os.path.join(BASE_DIR, "ml", "feature_contract.yaml")
CSV_PATH = os.path.join(BASE_DIR, "data", "demo_students.csv")
JSON_PATH = os.path.join(BASE_DIR, "data", "demo_seed_scored.json")


def test_feature_contract_validity():
    """Ensure feature_contract.yaml exists and contains all required models and fields."""
    assert os.path.exists(CONTRACT_PATH), "Feature contract yaml file must exist."
    with open(CONTRACT_PATH, "r", encoding="utf-8") as f:
        contract = yaml.safe_load(f)

    assert "models" in contract
    assert "model_a" in contract["models"]
    assert "model_p" in contract["models"]
    assert "model_x" in contract["models"]

    # Model A checks
    model_a = contract["models"]["model_a"]
    assert model_a["model_id"] == "academic_risk"
    feature_names_a = [f["name"] for f in model_a["features"]]
    assert "sem_last_pass_ratio" in feature_names_a
    assert "marks_delta" in feature_names_a
    assert "pass_ratio_delta" in feature_names_a
    assert len(model_a["excluded_attributes"]) > 10

    # Model P checks
    model_p = contract["models"]["model_p"]
    assert model_p["model_id"] == "placement_likelihood"
    feature_names_p = [f["name"] for f in model_p["features"]]
    assert "cgpa" in feature_names_p
    assert "aptitude_index" in feature_names_p
    assert "internship_flag" in feature_names_p


def test_csv_cohort_schema_and_counts():
    """Ensure data/demo_students.csv exists, has 1,250 rows, and required columns."""
    assert os.path.exists(CSV_PATH), "demo_students.csv must exist."
    df = pd.read_csv(CSV_PATH)
    assert len(df) == 1250, f"Expected 1,250 rows, got {len(df)}"

    required_cols = [
        "student_id", "name", "department", "year", "semester", "section",
        "cgpa", "average_marks", "backlogs",
        "sem_prev_units_enrolled", "sem_prev_units_passed", "sem_prev_avg_marks",
        "sem_last_units_enrolled", "sem_last_units_passed", "sem_last_avg_marks",
        "attendance_percentage", "attendance_trend", "learning_hours",
        "lms_activity_trend", "aptitude_score", "coding_score",
        "internship_experience", "projects_completed"
    ]
    for col in required_cols:
        assert col in df.columns, f"Missing required column: {col}"


def test_scripted_demo_student_rahul_kumar():
    """Verify Rahul Kumar is present with exact attributes mandated by PRD."""
    df = pd.read_csv(CSV_PATH)
    rahul_rows = df[df["name"] == "Rahul Kumar"]
    assert len(rahul_rows) == 1, "Rahul Kumar must be present exactly once in CSV."

    rahul = rahul_rows.iloc[0]
    assert rahul["student_id"] == "SC-2023-0142"
    assert rahul["department"] == "CSE"
    assert rahul["year"] == "3rd Year"
    assert rahul["cgpa"] == 6.8
    assert rahul["backlogs"] == 3
    assert rahul["attendance_percentage"] == 58.0
    assert rahul["coding_score"] == 48.0
    assert rahul["lms_activity_trend"] == -42.0

    # Check in MongoDB seed JSON
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    rahul_json = next((s for s in data if s["name"] == "Rahul Kumar"), None)
    assert rahul_json is not None
    assert rahul_json["successScore"] == 42
    assert rahul_json["riskLevel"] == "HIGH"
    assert rahul_json["ml"]["academicRisk"]["probability"] == 0.74
    assert rahul_json["ml"]["academicRisk"]["band"] == "HIGH"
    assert rahul_json["ml"]["agreement"] == "Confirmed High"


def test_data_quality_anomalies_present():
    """Verify that intentional anomalies exist for the Data Quality Engine to flag."""
    df = pd.read_csv(CSV_PATH)
    # Check duplicate student IDs (should have duplicate values)
    duplicates = df[df.duplicated(subset=["student_id"], keep=False)]
    assert len(duplicates) >= 4, "Intentional duplicate student IDs should be present."

    # Check out-of-range numeric values
    invalid_att = df[df["attendance_percentage"] > 100.0]
    assert len(invalid_att) >= 1, "Intentional attendance > 100 should be present."

    invalid_marks = df[df["average_marks"] < 0.0]
    assert len(invalid_marks) >= 1, "Intentional negative marks should be present."


def test_seed_json_schema():
    """Verify MongoDB seed JSON format and non-empty student collection."""
    assert os.path.exists(JSON_PATH), "demo_seed_scored.json must exist."
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert len(data) == 1250
    first = data[0]
    assert "studentId" in first
    assert "academic" in first
    assert "attendance" in first
    assert "lms" in first
    assert "placement" in first
    assert "skills" in first
    assert "successScore" in first
    assert "riskLevel" in first
    assert "ml" in first
    assert first["ml"]["status"] == "ok"
