import os
import joblib
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")

model_a_cache = None
model_p_cache = None


def get_models():
    global model_a_cache, model_p_cache
    if model_a_cache is None:
        p_a = os.path.join(ARTIFACTS_DIR, "academic_risk", "model.joblib")
        if os.path.exists(p_a):
            model_a_cache = joblib.load(p_a)
    if model_p_cache is None:
        p_p = os.path.join(ARTIFACTS_DIR, "placement_likelihood", "model.joblib")
        if os.path.exists(p_p):
            model_p_cache = joblib.load(p_p)
    return model_a_cache, model_p_cache


def predict_student(student_dict):
    m_a, m_p = get_models()
    acad = (student_dict.get("academic") or {})
    hist = (acad.get("semesterHistory") or [])
    last_h = next((h for h in hist if h.get("slot") == "last"), (hist[1] if len(hist) > 1 else {}))
    prev_h = next((h for h in hist if h.get("slot") == "prev"), (hist[0] if len(hist) > 0 else {}))

    last_passed = last_h.get("unitsPassed") or 5
    last_enrolled = max(1, last_h.get("unitsEnrolled") or 6)
    last_pass_ratio = min(1.0, max(0.0, float(last_passed) / float(last_enrolled)))
    prev_passed = prev_h.get("unitsPassed") or 5
    prev_enrolled = max(1, prev_h.get("unitsEnrolled") or 6)
    prev_pass_ratio = min(1.0, max(0.0, float(prev_passed) / float(prev_enrolled)))

    last_marks = float(last_h.get("avgMarks") or acad.get("averageMarks") or 66.0)
    prev_marks = float(prev_h.get("avgMarks") or acad.get("averageMarks") or 66.0)

    # 1. Model A Features
    feat_a = pd.DataFrame([{
        "entry_score_pct": float(acad.get("entryScore") or 65.0),
        "prev_score_pct": float(acad.get("previousScore") or 65.0),
        "sem_prev_units": float(prev_enrolled),
        "sem_prev_pass_ratio": float(prev_pass_ratio),
        "sem_prev_marks_pct": float(prev_marks),
        "sem_last_units": float(last_enrolled),
        "sem_last_pass_ratio": float(last_pass_ratio),
        "sem_last_marks_pct": float(last_marks),
        "marks_delta": float(last_marks - prev_marks),
        "pass_ratio_delta": float(last_pass_ratio - prev_pass_ratio)
    }])

    prob_a = 0.5
    if m_a:
        prob_a = round(float(m_a.predict_proba(feat_a)[0, 1]), 2)
    else:
        z = -2.8 * (last_pass_ratio - 0.82) - 0.04 * (last_marks - 66.0)
        prob_a = round(float(1 / (1 + np.exp(-z))), 2)

    band_a = "HIGH" if prob_a >= 0.60 else ("MEDIUM" if prob_a >= 0.35 else "LOW")

    # 2. Model P Features
    place = (student_dict.get("placement") or {})
    skills = (student_dict.get("skills") or {})
    engage = (student_dict.get("engagement") or {})
    cgpa = float(acad.get("cgpa") or 7.0)
    aptitude = float(place.get("aptitude") or 65.0)
    coding = float(place.get("coding") or 60.0)
    soft = float(skills.get("soft") or 65.0)
    intern = int(place.get("internshipExperience") or 0)
    projects = int(skills.get("projectsCompleted") or 2)
    extracurricular = float(engage.get("extracurricularScore") or 60.0)

    feat_p = pd.DataFrame([{
        "cgpa": cgpa,
        "latest_gpa": float(last_marks / 10.0),
        "aptitude_index": aptitude,
        "communication_score": soft,
        "extracurricular_score": extracurricular,
        "internship_flag": intern,
        "projects_completed": projects
    }])

    prob_p = 0.5
    if m_p:
        prob_p = round(float(m_p.predict_proba(feat_p)[0, 1]), 2)
    else:
        z = 0.55 * (cgpa - 7.2) + 0.035 * (aptitude - 65.0) + 0.8 * (intern - 0.2)
        prob_p = round(float(1 / (1 + np.exp(-z))), 2)

    band_p = "LIKELY" if prob_p >= 0.60 else ("UNCERTAIN" if prob_p >= 0.35 else "UNLIKELY")

    top_factors = [
        {
            "feature": "Latest Semester Pass Ratio",
            "value": f"{int(last_pass_ratio * 100)}%",
            "benchmark": "82% typical",
            "impact": "raises_risk" if last_pass_ratio < 0.75 else "lowers_risk",
            "weight": round(abs(last_pass_ratio - 0.82) * 0.4, 2)
        },
        {
            "feature": "Semester Marks Delta",
            "value": f"{last_marks - prev_marks:+.1f}%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk" if (last_marks - prev_marks) < 0 else "lowers_risk",
            "weight": round(abs(last_marks - prev_marks) * 0.02, 2)
        }
    ]

    return {
        "studentId": student_dict.get("studentId") or "N/A",
        "academicRisk": {"probability": prob_a, "band": band_a, "topFactors": top_factors},
        "placement": {"probability": prob_p, "band": band_p},
        "coverage": 1.0,
        "status": "ok"
    }
