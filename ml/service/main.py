import os
from fastapi import FastAPI, Header, HTTPException, Depends
from typing import Optional, List
from .schemas import BatchPredictRequest, StudentInput
from .predictor import predict_student, get_models

app = FastAPI(title="SmartCampus AI - ML Serving Service", version="2.0.0")

ML_SERVICE_KEY = os.environ.get("ML_SERVICE_KEY", "smartcampus_secret_internal_ml_key_2026")


def verify_key(x_ml_key: Optional[str] = Header(None)):
    if x_ml_key and x_ml_key != ML_SERVICE_KEY:
        raise HTTPException(status_code=403, detail="Invalid ML service key")
    return True



@app.get("/")
def root():
    return {
        "service": "SmartCampus AI - ML Serving Engine",
        "status": "online",
        "interactive_docs": "http://localhost:8000/docs",
        "frontend_url": "http://localhost:3000",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "models": "/models",
            "predict_batch": "/predict/batch",
            "explain": "/explain"
        }
    }


@app.get("/health")
def health():
    m_a, m_p = get_models()
    return {
        "status": "healthy",
        "service": "SmartCampus AI ML Engine",
        "modelsLoaded": {"model_a": m_a is not None, "model_p": m_p is not None}
    }


@app.get("/models")
def list_models(_: bool = Depends(verify_key)):
    return [
        {"id": "academic_risk", "name": "Model A: Academic Risk (UCI 697)", "version": "2.0.0-d1"},
        {"id": "placement_likelihood", "name": "Model P: Placement Likelihood (D3)", "version": "2.0.0-d3"}
    ]


@app.post("/predict/batch")
def predict_batch(req: BatchPredictRequest, _: bool = Depends(verify_key)):
    results = []
    for s in req.students:
        pred = predict_student(s.model_dump())
        results.append(pred)
    return {"predictions": results, "count": len(results)}


@app.post("/explain")
def explain_student(s: StudentInput, _: bool = Depends(verify_key)):
    pred = predict_student(s.model_dump())
    return {
        "studentId": pred["studentId"],
        "topFactors": pred["academicRisk"]["topFactors"],
        "disclaimer": "These are statistical associations, not causes."
    }


@app.post("/whatif")
def whatif_scenario(s: StudentInput, _: bool = Depends(verify_key)):
    pred = predict_student(s.model_dump())
    return {
        "simulatedRisk": pred["academicRisk"],
        "simulatedPlacement": pred["placement"],
        "note": "Model-estimated, associational, not causal."
    }
