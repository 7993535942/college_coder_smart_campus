import express from 'express';
import { calculateScoreAndRisk } from '../services/scoringEngine.js';

const router = express.Router();

router.post('/score', (req, res) => {
  const {
    cgpa = 6.8,
    averageMarks = 60,
    backlogs = 2,
    attendance = 60,
    learningHours = 6,
    codingScore = 50,
    aptitudeScore = 60,
    extracurricularScore = 60,
    internshipExperience = 0
  } = req.body;

  const mockStudent = {
    academic: {
      cgpa: Number(cgpa),
      averageMarks: Number(averageMarks),
      backlogs: Number(backlogs),
      semesterHistory: [
        { slot: 'prev', unitsEnrolled: 6, unitsPassed: 5, avgMarks: Number(averageMarks) },
        { slot: 'last', unitsEnrolled: 6, unitsPassed: backlogs > 0 ? 4 : 6, avgMarks: Number(averageMarks) }
      ]
    },
    attendance: { percentage: Number(attendance), activityTrend: 0 },
    lms: { assignmentCompletion: 70, learningHours: Number(learningHours), activityTrend: 0 },
    placement: {
      aptitude: Number(aptitudeScore),
      coding: Number(codingScore),
      mockInterview: 60,
      internshipExperience: Number(internshipExperience)
    },
    skills: { technical: Number(codingScore), soft: 65, projectsCompleted: 1 },
    engagement: { extracurricularScore: Number(extracurricularScore) }
  };

  // Re-estimate ML probabilities based on simulated canonical attributes
  const passRatio = mockStudent.academic.semesterHistory[1].unitsPassed / 6;
  const z_a = -2.8 * (passRatio - 0.82) - 0.04 * (Number(averageMarks) - 66.0) + 0.45 * Number(backlogs) - 0.02 * (Number(attendance) - 75.0);
  const simMlRiskProb = +(1 / (1 + Math.exp(-z_a))).toFixed(2);
  const simMlRiskBand = simMlRiskProb >= 0.60 ? 'HIGH' : simMlRiskProb >= 0.35 ? 'MEDIUM' : 'LOW';

  const z_p = 0.55 * (Number(cgpa) - 7.2) + 0.035 * (Number(aptitudeScore) - 65.0) + 0.04 * (Number(codingScore) - 60.0) + 0.8 * (Number(internshipExperience) - 0.2);
  const simMlPlaceProb = +(1 / (1 + Math.exp(-z_p))).toFixed(2);
  const simMlPlaceBand = simMlPlaceProb >= 0.60 ? 'LIKELY' : simMlPlaceProb >= 0.35 ? 'UNCERTAIN' : 'UNLIKELY';

  mockStudent.ml = {
    academicRisk: { probability: simMlRiskProb, band: simMlRiskBand },
    placement: { probability: simMlPlaceProb, band: simMlPlaceBand }
  };

  const calculated = calculateScoreAndRisk(mockStudent);

  res.json({
    scenarioScore: calculated.successScore,
    scenarioRisk: calculated.riskLevel,
    ruleRiskLevel: calculated.ruleRiskLevel,
    riskSource: calculated.riskSource,
    scoreContributions: calculated.scoreContributions,
    mlEstimatedRisk: {
      probability: simMlRiskProb,
      band: simMlRiskBand,
      note: 'Model-estimated, associational, not causal.'
    },
    mlEstimatedPlacement: {
      probability: simMlPlaceProb,
      band: simMlPlaceBand,
      note: 'Model-estimated placement likelihood.'
    }
  });
});

export default router;
