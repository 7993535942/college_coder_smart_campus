# SmartCampus AI — Student Success & Predictive Analytics Platform (v2)

> **Detect Early. Explain Clearly. Act Smarter.**

SmartCampus AI is an institutional decision-support and student success platform that unifies Academic, Biometric Attendance, LMS, Campus Engagement, Placement Readiness, Skills Assessments, and Faculty Feedback into a unified intelligence console. It layers transparent, rule-based Success Scoring with calibrated machine-learning models trained on public student datasets to surface early warning indicators before students fall behind.

---

## 🌟 Key Features

1. **Multi-Source Data Unification**: Integrated student profiles spanning 6 distinct institutional data categories.
2. **Deterministic Success Scoring (0–100)**: Weighted indicators across Academics (25%), Attendance (15%), LMS (15%), Placement (20%), Skills (15%), and Engagement (10%).
3. **ML Risk Fusion & Early Warnings**: Calibrated probability estimates (Model A: Academic Risk, Model P: Placement Likelihood) that escalate risk without masking explainable rule baselines.
4. **SHAP Factor Explainability**: Per-student statistical drivers showing exact divergence from cohort averages.
5. **AI Intervention Copilot**: Structured intervention generator grouping recommendations into Immediate, Academic, Placement, Mentoring, and Monitoring actions.
6. **What-If Scenario Simulator**: Interactive slider-based tool for testing student recovery trajectories.
7. **Actionable Segmentation**: Cohort clustering into High Performers, Academic Risk, Placement Risk, Hidden Potential, and Engagement Risk.
8. **Data Quality Engine**: Automated diagnostics detecting duplicate IDs, out-of-range numeric fields, and ML feature coverage.
9. **Model Insights & Model Cards**: Honest held-out metrics (ROC-AUC, PR-AUC, Brier score), cross-validation benchmarks, and responsible AI disclosures.

---

## 🏗️ System Architecture & Ports

| Tier | Technology | Port | Description |
| :--- | :--- | :---: | :--- |
| **Frontend** | React + Vite, Vanilla CSS | `3000` | Executive Dashboard, Profiles, Simulator, Models |
| **Backend** | Node.js + Express, Mongoose | `5000` | Core REST APIs, Authentication, Scoring Engine |
| **Database** | MongoDB Atlas Cloud | Cloud | Hosted `smartcampus_ai` cluster with 1,250 student records |
| **ML Inference** | Python 3.10+, FastAPI, scikit-learn | `8000` | Calibrated prediction engine & SHAP explanation API |

---

## 🚀 Quickstart & Running Locally

### 1. Prerequisites
- Node.js v18+ & npm
- Python 3.10+
- MongoDB (or MongoDB Atlas connection string configured in `.env`)

### 2. Environment Setup
The repository includes `.env.example`. Environment configuration is located in `.env` and `server/.env`:
```bash
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=demo_jwt_secret_smartcampus_2026_supersecure
ML_SERVICE_URL=http://localhost:8000
ML_SERVICE_KEY=smartcampus_secret_internal_ml_key_2026
```

### 3. Running Services
Start all three tiers (or run individually):
```bash
# Terminal 1: Backend Server (Port 5000)
npm run server

# Terminal 2: Frontend Client (Port 3000)
npm run client

# Terminal 3: Python FastAPI ML Engine (Port 8000)
npm run ml:service
```

Access the web interface at **[http://localhost:3000](http://localhost:3000)**.

---

## 🔑 Demo Account Credentials

- **Email**: `admin@smartcampus.demo`
- **Password**: `Demo@123`

---

## 🧪 Testing

Run automated tests for the ML pipeline, feature harmonization contract, and cohort generator:
```bash
python -m pytest ml/tests
```

---

## 📚 Dataset Provenance & Attribution

- **Predict Students' Dropout and Academic Success (D1)**: UCI Machine Learning Repository Dataset 697 (*Realinho, Vieira Martins, Machado, & Baptista, 2021*).
- **College Student Placement Factors (D3)**: Kaggle (`sahilislam007/college-student-placement-factors-dataset`).
- **Student Performance Factors (D2)**: Kaggle (`lainguyn123/student-performance-factors`).
- Sensitive socioeconomic and financial indicators (debtor status, tuition payment, family income, demographics) were excluded from all model training per the Responsible AI directive.
