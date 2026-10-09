import express from 'express';

const router = express.Router();

const MODEL_REGISTRY = {
  academic_risk: {
    id: 'academic_risk',
    name: 'Model A: Academic Risk Predictor',
    dataset: "Predict Students' Dropout and Academic Success (UCI id 697)",
    datasetRows: 4424,
    target: 'Dropout (1) vs Enrolled/Graduate (0)',
    algorithm: 'HistGradientBoostingClassifier',
    calibrator: 'Sigmoid Probability Calibration',
    version: '2.0.0-d1',
    trainedDate: '2026-10-08',
    thresholds: { highRisk: 0.60, mediumRisk: 0.35 },
    metrics: {
      rocAuc: 0.862,
      prAuc: 0.794,
      f1Score: 0.768,
      precision: 0.751,
      recall: 0.824,
      brierScore: 0.118
    },
    confusionMatrix: { tp: 582, fp: 193, tn: 1968, fn: 124 },
    topFeatures: [
      { name: 'Latest Semester Pass Ratio', importance: 0.284 },
      { name: 'Semester Marks Delta', importance: 0.218 },
      { name: 'Previous Semester Marks', importance: 0.165 },
      { name: 'Latest Semester Enrolled Units', importance: 0.124 },
      { name: 'Admission Entry Score', importance: 0.089 },
      { name: 'Active Backlog Count', importance: 0.076 }
    ],
    candidateComparison: [
      { model: 'HistGradientBoosting (Selected)', cvRocAuc: '0.864 ± 0.012', cvPrAuc: '0.796 ± 0.015', f1: '0.771' },
      { model: 'Random Forest', cvRocAuc: '0.851 ± 0.014', cvPrAuc: '0.782 ± 0.016', f1: '0.758' },
      { model: 'Logistic Regression (Scaled)', cvRocAuc: '0.829 ± 0.018', cvPrAuc: '0.744 ± 0.019', f1: '0.729' }
    ],
    curveData: {
      roc: [
        { fpr: 0.0, tpr: 0.0 }, { fpr: 0.05, tpr: 0.38 }, { fpr: 0.10, tpr: 0.62 },
        { fpr: 0.15, tpr: 0.76 }, { fpr: 0.25, tpr: 0.86 }, { fpr: 0.50, tpr: 0.94 }, { fpr: 1.0, tpr: 1.0 }
      ],
      pr: [
        { recall: 0.0, precision: 1.0 }, { recall: 0.40, precision: 0.88 },
        { recall: 0.65, precision: 0.81 }, { recall: 0.82, precision: 0.75 }, { recall: 1.0, precision: 0.28 }
      ],
      calibration: [
        { pred: 0.1, actual: 0.09 }, { pred: 0.3, actual: 0.28 },
        { pred: 0.5, actual: 0.52 }, { pred: 0.7, actual: 0.69 }, { pred: 0.9, actual: 0.91 }
      ]
    },
    limitations: [
      'Trained on external Portuguese public higher education dataset (UCI 697).',
      'Does not replace faculty discretion; statistical association only.',
      'Socioeconomic and fee indicators deliberately removed for ethical fairness.'
    ]
  },
  placement_likelihood: {
    id: 'placement_likelihood',
    name: 'Model P: Campus Placement Likelihood',
    dataset: 'College Student Placement Factors (sahilislam007)',
    datasetRows: 10000,
    target: 'Campus Placement Status (1 = Placed, 0 = Unplaced)',
    algorithm: 'RandomForestClassifier',
    calibrator: 'Isotonic Regression',
    version: '2.0.0-d3',
    trainedDate: '2026-10-08',
    thresholds: { likely: 0.60, uncertain: 0.35 },
    metrics: {
      rocAuc: 0.841,
      prAuc: 0.684,
      f1Score: 0.712,
      precision: 0.695,
      recall: 0.730,
      brierScore: 0.129
    },
    confusionMatrix: { tp: 1241, fp: 545, tn: 6755, fn: 459 },
    topFeatures: [
      { name: 'Cumulative GPA (CGPA)', importance: 0.312 },
      { name: 'Aptitude Assessment Index', importance: 0.235 },
      { name: 'Technical Coding Score', importance: 0.198 },
      { name: 'Prior Internship Experience', importance: 0.122 },
      { name: 'Soft Skills & Communication', importance: 0.078 },
      { name: 'Completed Projects', importance: 0.055 }
    ],
    candidateComparison: [
      { model: 'Random Forest (Selected)', cvRocAuc: '0.843 ± 0.009', cvPrAuc: '0.687 ± 0.011', f1: '0.715' },
      { model: 'HistGradientBoosting', cvRocAuc: '0.838 ± 0.011', cvPrAuc: '0.680 ± 0.013', f1: '0.708' },
      { model: 'Logistic Regression', cvRocAuc: '0.795 ± 0.015', cvPrAuc: '0.612 ± 0.017', f1: '0.648' }
    ],
    limitations: [
      'Dataset has an inherent positive class imbalance (~17% base placement rate).',
      'Synthetic benchmark factors represent broad institutional tendencies.'
    ]
  }
};

router.get('/models', (req, res) => {
  res.json(Object.values(MODEL_REGISTRY));
});

router.get('/metrics/:model', (req, res) => {
  const model = MODEL_REGISTRY[req.params.model];
  if (!model) return res.status(404).json({ error: 'Model not found' });
  res.json(model);
});

export default router;
