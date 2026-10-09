export function calculateScoreAndRisk(student) {
  const cgpa = Number(student.academic?.cgpa ?? 7.0);
  const backlogs = Number(student.academic?.backlogs ?? 0);
  const lastHistory = student.academic?.semesterHistory?.find(h => h.slot === 'last') || student.academic?.semesterHistory?.[1] || {};
  const semLastMarks = Number(lastHistory.avgMarks ?? student.academic?.averageMarks ?? 65);
  const passRatio = Number(lastHistory.unitsPassed ?? 5) / Math.max(1, Number(lastHistory.unitsEnrolled ?? 6));

  const acadComp = Math.max(0, Math.min(100, (cgpa * 4.0) + (semLastMarks * 0.35) + (passRatio * 25.0) - (backlogs * 12.0)));
  const attComp = Math.max(0, Math.min(100, Number(student.attendance?.percentage ?? 75)));
  
  const lmsTrend = Number(student.lms?.activityTrend ?? 0);
  const rawLms = (Number(student.lms?.assignmentCompletion ?? 70) * 0.5) + (Math.min(100, (Number(student.lms?.learningHours ?? 10) / 16) * 100) * 0.5);
  const lmsComp = Math.max(0, Math.min(100, rawLms + (lmsTrend < 0 ? lmsTrend * 0.35 : 0)));

  const rawPlace = (Number(student.placement?.aptitude ?? 60) * 0.35) + (Number(student.placement?.coding ?? 55) * 0.40) + (Number(student.placement?.mockInterview ?? 55) * 0.25) + (student.placement?.internshipExperience ? 10 : 0);
  const placeComp = Math.max(0, Math.min(100, rawPlace));

  const rawSkills = (Number(student.skills?.technical ?? 60) * 0.45) + (Number(student.skills?.soft ?? 60) * 0.35) + Math.min(20, Number(student.skills?.projectsCompleted ?? 1) * 10);
  const skillsComp = Math.max(0, Math.min(100, rawSkills));

  const engageComp = Math.max(0, Math.min(100, Number(student.engagement?.extracurricularScore ?? 60)));

  const successScore = Math.max(0, Math.min(100, Math.round(
    (acadComp * 0.25) + (attComp * 0.15) + (lmsComp * 0.15) + (placeComp * 0.20) + (skillsComp * 0.15) + (engageComp * 0.10)
  )));

  let ruleRisk = successScore >= 80 ? 'LOW' : successScore >= 60 ? 'MEDIUM' : 'HIGH';
  const signals = [];
  if (attComp < 60) signals.push(`Attendance critically low (${attComp.toFixed(1)}%)`);
  if (backlogs >= 3) signals.push(`High backlog burden (${backlogs} active backlogs)`);
  if (Number(student.placement?.coding ?? 60) < 50) signals.push('Technical coding assessment below benchmark');
  if (lmsTrend < -25) signals.push(`Steep decline in LMS portal engagement (${lmsTrend.toFixed(1)}%)`);
  if (placeComp < 50) signals.push('Sub-threshold placement readiness');

  if (signals.length >= 2) {
    if (ruleRisk === 'LOW') ruleRisk = 'MEDIUM';
    else if (ruleRisk === 'MEDIUM') ruleRisk = 'HIGH';
  }

  // ML Risk Fusion
  const mlBand = student.ml?.academicRisk?.band;
  let finalRisk = ruleRisk;
  let riskSource = 'rules';
  if (mlBand === 'HIGH') {
    riskSource = 'rules+ml';
    if (ruleRisk === 'LOW') finalRisk = 'MEDIUM';
    else if (ruleRisk === 'MEDIUM') finalRisk = 'HIGH';
  }

  let agreement = 'Aligned';
  if (ruleRisk === 'HIGH' && mlBand === 'HIGH') agreement = 'Confirmed High';
  else if (ruleRisk !== 'HIGH' && mlBand === 'HIGH') agreement = 'ML Early Warning';
  else if (ruleRisk === 'HIGH' && mlBand !== 'HIGH') agreement = 'Rules-Only Alert';

  let segment = 'Academic Risk';
  if (backlogs >= 2 || acadComp < 52 || (cgpa < 6.2 && semLastMarks < 60)) segment = 'Academic Risk';
  else if (lmsTrend < -25 || (attComp < 65 && lmsComp < 55)) segment = 'Engagement Risk';
  else if (cgpa >= 7.2 && (placeComp < 55 || student.ml?.placement?.band === 'UNLIKELY')) segment = 'Placement Risk';
  else if (cgpa >= 6.2 && (skillsComp >= 72 || engageComp >= 75)) segment = 'Hidden Potential';
  else if (cgpa >= 8.0 && successScore >= 75) segment = 'High Performers';
  else segment = successScore >= 70 ? 'High Performers' : 'Academic Risk';

  return {
    successScore,
    riskLevel: finalRisk,
    ruleRiskLevel: ruleRisk,
    riskSource,
    riskFactors: signals,
    segment,
    scoreContributions: {
      academic: +(acadComp * 0.25).toFixed(1),
      attendance: +(attComp * 0.15).toFixed(1),
      lms: +(lmsComp * 0.15).toFixed(1),
      placement: +(placeComp * 0.20).toFixed(1),
      skills: +(skillsComp * 0.15).toFixed(1),
      engagement: +(engageComp * 0.10).toFixed(1)
    },
    agreement
  };
}
