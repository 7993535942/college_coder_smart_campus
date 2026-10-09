# SmartCampus AI — System Architecture (v2)

SmartCampus AI combines a high-performance MERN analytics platform with a dedicated Python FastAPI Machine Learning inference service and MongoDB Atlas cloud storage.

---

## 1. System Topology

```
[ Web Browser ]
      │
      ▼ (HTTP / Port 3000)
[ React + Vite Client (Tailwind / Vanilla CSS Tokens) ]
      │
      ▼ (REST API / Port 5000)
[ Node.js + Express Backend ] ──────────► [ MongoDB Atlas Cloud Database ]
      │                                   (smartcampus_ai cluster)
      ▼ (Internal Secret Header / Port 8000)
[ Python FastAPI ML Service ]
      ├── Model A (HistGradientBoosting, Calibrated Sigmoid)
      ├── Model P (RandomForest, Calibrated Isotonic)
      └── SHAP Factor Impact Engine
```

---

## 2. Component Specifications

### Frontend Client (`/client`)
- **Framework**: React 18 with Vite build tooling.
- **Styling**: Modern dark slate theme (`#0a0e17`) with glassmorphism, accessible high-contrast indicators, and Plus Jakarta Sans typography.
- **Charts**: Recharts responsive container visualizations.
- **State Management**: Reactive state, JWT auth token storage, direct API proxying to backend on `/api`.

### Backend Server (`/server`)
- **Runtime**: Node.js v24, Express ES Modules.
- **Database**: Mongoose connected to MongoDB Atlas with in-memory JSON fallback for offline resilience.
- **Core Engines**:
  - Scoring Engine (`scoringEngine.js`): Deterministic formula + escalation rules.
  - Risk Fusion (`riskFusion.js`): Merges rule alerts with calibrated ML probability bands.
  - AI Copilot (`aiCopilot.js`): Synthesizes structured student profiles into multi-tiered intervention actions.

### ML Service (`/ml`)
- **Runtime**: Python 3.10+, FastAPI, Uvicorn, scikit-learn, joblib, pandas.
- **Feature Contract (`ml/feature_contract.yaml`)**: Single contract standardizing external public datasets (UCI 697, D3 Placement) with student entity fields.
- **Artifacts (`ml/artifacts/`)**: Committed serialized models, metadata, and held-out test evaluation metrics.
