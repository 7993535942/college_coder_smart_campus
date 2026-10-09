from typing import List, Dict, Any, Optional
from pydantic import BaseModel


class StudentInput(BaseModel):
    studentId: Optional[str] = "SC-DEMO"
    name: Optional[str] = "Student"
    department: Optional[str] = "CSE"
    academic: Optional[Dict[str, Any]] = None
    attendance: Optional[Dict[str, Any]] = None
    lms: Optional[Dict[str, Any]] = None
    placement: Optional[Dict[str, Any]] = None
    skills: Optional[Dict[str, Any]] = None
    engagement: Optional[Dict[str, Any]] = None


class BatchPredictRequest(BaseModel):
    students: List[StudentInput]


class TopFactor(BaseModel):
    feature: str
    value: str
    benchmark: str
    impact: str
    weight: float


class ModelPrediction(BaseModel):
    studentId: str
    academicRisk: Dict[str, Any]
    placement: Dict[str, Any]
    coverage: float
    status: str
