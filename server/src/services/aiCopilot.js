export function generateInterventionPlan(student) {
  const name = student.name || 'Student';
  const score = student.successScore ?? 50;
  const risk = student.riskLevel ?? 'MEDIUM';
  const att = student.attendance?.percentage ?? 75;
  const backlogs = student.academic?.backlogs ?? 0;
  const mlProb = student.ml?.academicRisk?.probability;
  const mlBand = student.ml?.academicRisk?.band || 'LOW';

  const drivers = [];
  if (att < 65) drivers.push(`Biometric attendance is sub-optimal at ${att.toFixed(1)}%`);
  if (backlogs > 0) drivers.push(`Accumulated ${backlogs} active course backlog(s)`);
  if ((student.lms?.activityTrend ?? 0) < -20) drivers.push(`LMS portal participation dropped by ${Math.abs(student.lms?.activityTrend).toFixed(1)}%`);
  if ((student.placement?.coding ?? 60) < 50) drivers.push(`Technical coding diagnostic scored ${student.placement?.coding}/100`);
  if (mlProb && mlBand === 'HIGH') drivers.push(`Model-estimated academic risk probability is elevated at ${(mlProb * 100).toFixed(0)}%`);

  const immediate = [];
  if (att < 60) immediate.push('Schedule mandatory attendance recovery counseling with department mentor.');
  if (backlogs >= 2) immediate.push('Assign dedicated peer tutor for backlog clearing coursework.');
  if (immediate.length === 0) immediate.push('Conduct 1-on-1 academic progress check-in within 3 days.');

  const academic = [
    'Enroll in weekly faculty doubt-clearing sessions.',
    'Formulate milestone-based study schedule focusing on core subject concepts.'
  ];

  const placement = (student.placement?.coding ?? 60) < 55 ? [
    'Assign foundational DSA and coding practice modules on campus portal.',
    'Recommend mock interview practice session with placement cell.'
  ] : [
    'Encourage capstone project completion and resume portfolio review.'
  ];

  const mentoring = [
    'Bi-weekly check-in with assigned mentor to track study progress.',
    'Review LMS study hour targets.'
  ];

  return {
    summary: `${name} has a Success Score of ${score}/100 with ${risk} risk classification. Model estimates ${mlBand} academic risk (${(mlProb ? (mlProb * 100).toFixed(0) : 'N/A')}% probability).`,
    topRiskDrivers: drivers.slice(0, 4),
    recommendedActions: {
      Immediate: immediate,
      Academic: academic,
      Placement: placement,
      Mentoring: mentoring,
      Monitoring: ['Reassess biometric attendance and LMS completion metrics after 14 days.']
    },
    followUp: 'Reassess attendance, LMS activity, and academic performance after 14 days.'
  };
}

export function answerDatasetQuery(query, stats) {
  const q = (query || '').toLowerCase();
  if (q.includes('department') || q.includes('highest risk')) {
    const highest = stats.deptBreakdown ? Object.entries(stats.deptBreakdown).sort((a,b) => b[1].high - a[1].high)[0] : null;
    return highest ? `The department with the highest concentration of high-risk students is ${highest[0]} with ${highest[1].high} high-risk students.` : 'Departments have balanced risk distributions.';
  }
  if (q.includes('early warning') || q.includes('disagree') || q.includes('model')) {
    return `There are ${stats.mlEarlyWarnings || 0} students classified as ML Early Warnings (rules rated Low/Medium but ML model flagged High risk).`;
  }
  if (q.includes('placement') || q.includes('career')) {
    return `${stats.placementRiskCount || 0} students exhibit strong academic standing but require immediate placement readiness interventions.`;
  }
  return `Dataset Overview: ${stats.totalStudents || 0} students analyzed. Average Success Score is ${stats.avgScore || 0}/100. ${stats.highRiskCount || 0} students require targeted interventions.`;
}
