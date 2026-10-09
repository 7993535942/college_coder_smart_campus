import express from 'express';
import { getAllStudents } from '../studentStore.js';

const router = express.Router();

router.get('/overview', async (req, res) => {
  try {
    const list = await getAllStudents();
    const total = list.length;
    if (total === 0) return res.json({ total: 0 });

    const avgScore = Math.round(list.reduce((acc, s) => acc + (s.successScore || 0), 0) / total);
    const highRisk = list.filter(s => s.riskLevel === 'HIGH').length;
    const medRisk = list.filter(s => s.riskLevel === 'MEDIUM').length;
    const lowRisk = list.filter(s => s.riskLevel === 'LOW').length;

    const avgAttendance = +(list.reduce((acc, s) => acc + (s.attendance?.percentage || 0), 0) / total).toFixed(1);
    const placementReady = Math.round((list.filter(s => (s.placement?.componentScore || 0) >= 65 || s.placement?.status === 'Ready' || s.placement?.status === 'Placed').length / total) * 100);
    const mlHigh = list.filter(s => s.ml?.academicRisk?.band === 'HIGH').length;
    const avgMlPlacement = +(list.reduce((acc, s) => acc + (s.ml?.placement?.probability || 0), 0) / total).toFixed(2);

    res.json({
      totalStudents: total,
      avgSuccessScore: avgScore,
      highRiskCount: highRisk,
      mediumRiskCount: medRisk,
      lowRiskCount: lowRisk,
      avgAttendance,
      placementReadyPct: placementReady,
      dataQualityPct: 96,
      mlHighRiskCount: mlHigh,
      avgMlPlacementLikelihood: avgMlPlacement
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/departments', async (req, res) => {
  try {
    const list = await getAllStudents();
    const depts = {};
    list.forEach(s => {
      const d = s.department || 'Other';
      if (!depts[d]) depts[d] = { department: d, count: 0, totalScore: 0, highRisk: 0, avgAttendance: 0, attSum: 0 };
      depts[d].count += 1;
      depts[d].totalScore += (s.successScore || 0);
      if (s.riskLevel === 'HIGH') depts[d].highRisk += 1;
      depts[d].attSum += (s.attendance?.percentage || 0);
    });

    const result = Object.values(depts).map(d => ({
      department: d.department,
      students: d.count,
      avgScore: Math.round(d.totalScore / d.count),
      highRiskCount: d.highRisk,
      avgAttendance: +(d.attSum / d.count).toFixed(1)
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/segments', async (req, res) => {
  try {
    const list = await getAllStudents();
    const segments = {};
    list.forEach(s => {
      const seg = s.segment || 'Other';
      if (!segments[seg]) segments[seg] = { segment: seg, count: 0, totalScore: 0, highRisk: 0 };
      segments[seg].count += 1;
      segments[seg].totalScore += (s.successScore || 0);
      if (s.riskLevel === 'HIGH') segments[seg].highRisk += 1;
    });

    const result = Object.values(segments).map(seg => ({
      segment: seg.segment,
      count: seg.count,
      avgScore: Math.round(seg.totalScore / seg.count),
      highRiskCount: seg.highRisk
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/ml-summary', async (req, res) => {
  try {
    const list = await getAllStudents();
    const agreement = { 'Confirmed High': 0, 'ML Early Warning': 0, 'Rules-Only Alert': 0, 'Aligned': 0 };
    const academicBands = { HIGH: 0, MEDIUM: 0, LOW: 0 };
    const placementBands = { LIKELY: 0, UNCERTAIN: 0, UNLIKELY: 0 };

    list.forEach(s => {
      const ag = s.ml?.agreement || 'Aligned';
      if (agreement[ag] !== undefined) agreement[ag] += 1;
      const ab = s.ml?.academicRisk?.band;
      if (academicBands[ab] !== undefined) academicBands[ab] += 1;
      const pb = s.ml?.placement?.band;
      if (placementBands[pb] !== undefined) placementBands[pb] += 1;
    });

    res.json({ agreementMatrix: agreement, academicBands, placementBands });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/insights', async (req, res) => {
  try {
    const list = await getAllStudents();
    const total = list.length;
    const lmsDecline = list.filter(s => (s.lms?.activityTrend || 0) < -25).length;
    const placementRisk = list.filter(s => (s.academic?.cgpa || 0) >= 7.0 && (s.placement?.componentScore || 0) < 55).length;
    const mlEarlyWarnings = list.filter(s => s.ml?.agreement === 'ML Early Warning').length;
    const highRiskLowPlacement = list.filter(s => s.riskLevel === 'HIGH' && (s.placement?.componentScore || 0) < 50).length;

    const insights = [
      { id: 1, type: 'warning', text: `${lmsDecline} students show severe negative LMS engagement drop (>25%).` },
      { id: 2, type: 'ml-warning', text: `${mlEarlyWarnings} students identified as ML Early Warnings (rules evaluated Low/Med, ML model flagged High risk).` },
      { id: 3, type: 'placement', text: `${placementRisk} students have strong academic CGPA (≥7.0) but weak placement readiness.` },
      { id: 4, type: 'critical', text: `${highRiskLowPlacement} high-risk students simultaneously have low placement readiness scores.` }
    ];

    res.json({ insights });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/charts', async (req, res) => {
  try {
    const list = await getAllStudents();
    const scoreBins = Array(10).fill(0);
    list.forEach(s => {
      const bin = Math.min(9, Math.floor((s.successScore || 0) / 10));
      scoreBins[bin] += 1;
    });

    const scoreDistribution = scoreBins.map((count, i) => ({
      range: `${i * 10}-${i * 10 + 9}`,
      students: count
    }));

    const attendanceScatter = list.slice(0, 150).map(s => ({
      studentId: s.studentId,
      attendance: s.attendance?.percentage || 0,
      successScore: s.successScore || 0,
      riskLevel: s.riskLevel
    }));

    res.json({ scoreDistribution, attendanceScatter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
