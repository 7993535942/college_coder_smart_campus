import os
import joblib
import pytest
from ml.service.predictor import get_models, predict_student

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")


def test_artifacts_exist():
    assert os.path.exists(os.path.join(ARTIFACTS_DIR, "academic_risk", "model.joblib"))
    assert os.path.exists(os.path.join(ARTIFACTS_DIR, "academic_risk", "metrics.json"))
    assert os.path.exists(os.path.join(ARTIFACTS_DIR, "placement_likelihood", "model.joblib"))
    assert os.path.exists(os.path.join(ARTIFACTS_DIR, "placement_likelihood", "metrics.json"))


def test_models_load_and_predict():
    m_a, m_p = get_models()
    assert m_a is not None, "Model A should be loaded"
    assert m_p is not None, "Model P should be loaded"

    mock_student = {
        "studentId": "SC-TEST-1",
        "name": "Test Student",
        "academic": {
            "cgpa": 6.8,
            "averageMarks": 62.0,
            "semesterHistory": [
                {"slot": "prev", "unitsEnrolled": 6, "unitsPassed": 5, "avgMarks": 66.0},
                {"slot": "last", "unitsEnrolled": 6, "unitsPassed": 3, "avgMarks": 58.0}
            ]
        },
        "placement": {"aptitude": 55.0, "coding": 48.0},
        "skills": {"soft": 58.0, "projectsCompleted": 1}
    }
    pred = predict_student(mock_student)
    assert pred["status"] == "ok"
    assert 0.0 <= pred["academicRisk"]["probability"] <= 1.0
    assert pred["academicRisk"]["band"] in ["LOW", "MEDIUM", "HIGH"]
    assert 0.0 <= pred["placement"]["probability"] <= 1.0
    assert pred["placement"]["band"] in ["LIKELY", "UNCERTAIN", "UNLIKELY"]
    assert len(pred["academicRisk"]["topFactors"]) >= 2
