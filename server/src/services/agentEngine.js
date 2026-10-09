/**
 * agentEngine.js – Agentic Q&A engine for FR-17
 * Handles: student lookup, risk explanation, task assignment, analytics queries
 * Supports: conversation memory, pronoun resolution, fuzzy name matching
 */

import { getAllStudents } from '../studentStore.js';
import { generateInterventionPlan } from './aiCopilot.js';

// ─── Pronoun / Context Detection ──────────────────────────────────────────────
function isPronounQuery(q) {
  return /\b(his|her|their|the student|that student|this student|he|she|they|him|them)\b/.test(q.toLowerCase());
}

// ─── Fuzzy Name Matching (Levenshtein distance) ───────────────────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function findSimilarStudents(namePart, allStudents, limit = 3) {
  const q = namePart.toLowerCase().trim();
  return allStudents
    .map(s => {
      const name = (s.name || '').toLowerCase();
      // Check each word in the student name
      const parts = name.split(' ');
      const minDist = Math.min(...parts.map(p => levenshtein(q, p)));
      const containsScore = name.includes(q) ? 0 : 999;
      return { student: s, score: Math.min(minDist, containsScore) };
    })
    .filter(x => x.score <= 3)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map(x => x.student);
}

// ─── Extract last referenced student from conversation history ─────────────────
function extractLastStudentFromHistory(history, allStudents) {
  if (!history || !history.length) return null;
  // Walk backwards through history to find the last AI message that mentioned a student ID
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    const text = (msg.text || msg.answer || '');
    // Check for an explicit student ID in the message
    const idMatch = text.match(/SC-\d{4}-\d{4}/i);
    if (idMatch) {
      const found = allStudents.find(s => s.studentId?.toLowerCase() === idMatch[0].toLowerCase());
      if (found) return found;
    }
    // Check for a name mention in the message text
    const sorted = [...allStudents].sort((a, b) => (b.name?.length || 0) - (a.name?.length || 0));
    for (const s of sorted) {
      if (!s.name) continue;
      if (text.includes(s.name)) return s;
    }
  }
  return null;
}

// ─── Intent Detection ─────────────────────────────────────────────────────────
function detectIntent(q) {
  const t = q.toLowerCase();

  // 1. Batch task assignment across risk cohorts
  const isBatchAssignment = (
    (/assign|create task|give task|add task|set task/.test(t) && /all|every|those|them|auto|cohort|batch|everyone/.test(t)) ||
    (/those whose|for all.*assign|assign all|assign them|auto.*assign|assign.*automatically/.test(t)) ||
    (/assign.*task.*automatically/.test(t)) ||
    (/assign.*(attendance|academic|placement|mentoring).*task/.test(t) && /all|them|those|auto|who/.test(t)) ||
    (/same for (academic|placement|mentoring|attendance)/.test(t))
  );
  if (isBatchAssignment) return 'batch_assign_task';

  // 2. Individual task assignment
  if (/assign|create task|add task|set task|give task|add intervention/.test(t)) return 'assign_task';

  // 3. Multi-level risk queries
  if (/medium risk|moderate risk/.test(t)) return 'medium_risk';
  if (/low risk|safe|healthy|good standing/.test(t)) return 'low_risk';
  if (/(all|both|different) risk|risk breakdown|risk levels|overview of risk/.test(t)) return 'all_risk_summary';
  if (/high risk|at risk|at-risk|danger|critical risk/.test(t)) return 'high_risk';

  // 4. Other student-level and analytics intents
  if (/risk factor|why.*risk|what.*risk|reason.*risk|cause.*risk|factor.*at risk|explain.*risk|risk.*reason|major factor/.test(t)) return 'risk_factors';
  if (/intervention|action|recommend|what.*do|plan|help.*student|suggest/.test(t)) return 'interventions';
  if (/detail|profile|info|tell me about|show.*student|who is|about student|student detail/.test(t)) return 'student_detail';
  if (/score|success score|how.*performing|performance/.test(t)) return 'student_score';
  if (/how many|count|number of|total/.test(t)) return 'analytics_count';
  if (/department|dept|branch/.test(t)) return 'dept_breakdown';
  if (/early warning|ml warning|model warning|disagree/.test(t)) return 'early_warning';
  if (/placement|career|job/.test(t)) return 'placement';
  if (/top|best|highest|topper/.test(t)) return 'top_students';
  if (/segment|cluster|group/.test(t)) return 'segments';
  if (/average|avg|mean score/.test(t)) return 'avg_score';
  if (/list|show all|all students/.test(t)) return 'list_students';
  return 'general';
}

// ─── Name / ID Extraction ────────────────────────────────────────────────────
function extractStudentRef(query, allStudents) {
  const q = query.toLowerCase();

  // Match explicit student ID (SC-YYYY-NNNN)
  const idMatch = query.match(/SC-\d{4}-\d{4}/i);
  if (idMatch) {
    const found = allStudents.find(s => s.studentId?.toLowerCase() === idMatch[0].toLowerCase());
    if (found) return found;
  }

  // Match by name — try longest-name match first to avoid partial hits
  const sorted = [...allStudents].sort((a, b) => (b.name?.length || 0) - (a.name?.length || 0));
  for (const s of sorted) {
    if (!s.name) continue;
    if (q.includes(s.name.toLowerCase())) return s;
    const parts = s.name.toLowerCase().split(' ');
    if (parts.length >= 2 && parts.every(p => q.includes(p))) return s;
  }

  // Fallback: single word match (e.g. "rahul")
  for (const s of sorted) {
    if (!s.name) continue;
    const parts = s.name.toLowerCase().split(' ');
    if (parts.some(p => p.length > 3 && q.includes(p))) return s;
  }

  return null;
}

// ─── Task Parser ─────────────────────────────────────────────────────────────
function extractTaskDetails(query) {
  const q = query.toLowerCase();
  let category = 'Academic';
  if (/placement|coding|interview|career/.test(q)) category = 'Placement';
  if (/attendance|counseling/.test(q)) category = 'Immediate';
  if (/mentor|check.in/.test(q)) category = 'Mentoring';
  if (/monitor|track|watch/.test(q)) category = 'Monitoring';

  // Try to extract a meaningful custom task description (must be >15 chars after keyword)
  const match = query.match(/(?:assign|create task|add task|give task|task[:\-–]?)\s+(.{15,})/i);
  let taskText = match ? match[1].trim() : null;

  // Remove "for <student name>" trailing text
  if (taskText) {
    taskText = taskText.replace(/\s+for\s+.+$/i, '').trim();
    // If after stripping it's just a single word or too short, discard it and use plan default
    if (taskText.split(/\s+/).length < 3) taskText = null;
  }

  return { category, taskText };
}

// ─── Response Formatters ──────────────────────────────────────────────────────
function formatStudentDetail(s) {
  const mlRisk = s.ml?.academicRisk;
  const mlPlacement = s.ml?.placementLikelihood;
  return {
    type: 'student_profile',
    studentId: s.studentId,
    data: {
      name: s.name,
      studentId: s.studentId,
      department: s.department,
      year: s.year,
      successScore: s.successScore,
      riskLevel: s.riskLevel,
      segment: s.segment,
      attendance: s.attendance?.percentage,
      backlogs: s.academic?.backlogs,
      cgpa: s.academic?.cgpa,
      lmsHours: s.lms?.studyHours,
      lmsTrend: s.lms?.activityTrend,
      codingScore: s.placement?.coding,
      mlAcademicRisk: mlRisk ? `${(mlRisk.probability * 100).toFixed(0)}% (${mlRisk.band})` : 'N/A',
      mlPlacement: mlPlacement ? `${(mlPlacement.probability * 100).toFixed(0)}%` : 'N/A',
      mlAgreement: s.ml?.agreement || 'N/A'
    },
    summary: `📋 **${s.name}** (${s.studentId}) — ${s.department}, Year ${s.year}\n` +
      `🎯 Success Score: **${s.successScore}/100** | Risk: **${s.riskLevel}** | Segment: ${s.segment}\n` +
      `📊 Attendance: ${s.attendance?.percentage?.toFixed(1) ?? 'N/A'}% | CGPA: ${s.academic?.cgpa ?? 'N/A'} | Backlogs: ${s.academic?.backlogs ?? 0}\n` +
      `💻 LMS Hours: ${s.lms?.studyHours ?? 'N/A'} | Coding Score: ${s.placement?.coding ?? 'N/A'}/100\n` +
      `🤖 ML Academic Risk: ${mlRisk ? `${(mlRisk.probability * 100).toFixed(0)}% (${mlRisk.band})` : 'N/A'} | Agreement: ${s.ml?.agreement || 'N/A'}`
  };
}

function formatRiskFactors(s) {
  const drivers = [];
  const att = s.attendance?.percentage ?? 100;
  const backlogs = s.academic?.backlogs ?? 0;
  const lmsTrend = s.lms?.activityTrend ?? 0;
  const coding = s.placement?.coding ?? 60;
  const cgpa = s.academic?.cgpa ?? 8;
  const mlProb = s.ml?.academicRisk?.probability ?? 0;

  if (att < 75) drivers.push({ factor: 'Low Attendance', detail: `${att.toFixed(1)}% — below 75% threshold`, severity: att < 60 ? 'CRITICAL' : 'HIGH' });
  if (backlogs > 0) drivers.push({ factor: 'Course Backlogs', detail: `${backlogs} pending backlog(s)`, severity: backlogs >= 3 ? 'CRITICAL' : 'HIGH' });
  if (lmsTrend < -20) drivers.push({ factor: 'Declining LMS Engagement', detail: `${Math.abs(lmsTrend).toFixed(0)}% drop in portal activity`, severity: 'HIGH' });
  if (coding < 50) drivers.push({ factor: 'Low Coding Score', detail: `${coding}/100 — placement risk`, severity: 'HIGH' });
  if (cgpa < 6) drivers.push({ factor: 'Low CGPA', detail: `${cgpa} — academic risk threshold`, severity: 'HIGH' });
  if (mlProb > 0.6) drivers.push({ factor: 'ML Model Flag', detail: `Model A estimates ${(mlProb * 100).toFixed(0)}% academic risk probability`, severity: 'HIGH' });
  if (s.ml?.agreement === 'ML Early Warning') drivers.push({ factor: 'ML Early Warning', detail: 'ML model flagged HIGH risk even though rules classify lower', severity: 'HIGH' });

  const scoreContribs = s.scoreContributions || {};
  const lowContribs = Object.entries(scoreContribs)
    .filter(([, v]) => v !== undefined && v < 10)
    .map(([k, v]) => ({ factor: `Low ${k} score`, detail: `Contributing only ${v?.toFixed ? v.toFixed(1) : v}/25 to success score`, severity: 'MEDIUM' }));
  drivers.push(...lowContribs.slice(0, 2));

  if (drivers.length === 0) drivers.push({ factor: 'No Critical Risk Factors', detail: 'Student is performing within acceptable ranges', severity: 'LOW' });

  return {
    type: 'risk_factors',
    studentId: s.studentId,
    factors: drivers,
    summary: `⚠️ **Risk Analysis for ${s.name}** (${s.riskLevel} Risk — ${s.successScore}/100)\n\n` +
      drivers.map(d => `${d.severity === 'CRITICAL' ? '🔴' : d.severity === 'HIGH' ? '🟠' : '🟡'} **${d.factor}**: ${d.detail}`).join('\n')
  };
}

function formatInterventionPlan(s, plan) {
  return {
    type: 'intervention_plan',
    studentId: s.studentId,
    plan,
    summary: `📋 **Intervention Plan for ${s.name}**\n\n` +
      `📌 ${plan.summary}\n\n` +
      Object.entries(plan.recommendedActions || {})
        .map(([cat, actions]) => `**${cat}:**\n${actions.map(a => `  • ${a}`).join('\n')}`)
        .join('\n\n')
  };
}

// ─── Batch Task Assignment Generator ──────────────────────────────────────────
export function generateBatchTasks(query, allStudents, existingInterventions = []) {
  const q = query.toLowerCase();

  const wantAttendance = /attendance|absent|low att|presence/i.test(q);
  const wantAcademic   = /academic|backlog|cgpa|course|grade|marks/i.test(q);
  const wantPlacement  = /placement|coding|interview|career|job/i.test(q);
  const wantMentoring  = /mentor|counsel|check.in/i.test(q);

  const categories = [];
  if (wantAttendance) categories.push('Attendance');
  if (wantAcademic)   categories.push('Academic');
  if (wantPlacement)  categories.push('Placement');
  if (wantMentoring)  categories.push('Mentoring');

  // If user said "assign all tasks" or did not specify a single category, include all four
  if (categories.length === 0) {
    categories.push('Attendance', 'Academic', 'Placement', 'Mentoring');
  }

  const tasksToCreate = [];
  const summaryDetails = [];

  // 1. Attendance Tasks (< 75% attendance)
  if (categories.includes('Attendance')) {
    const attStudents = allStudents.filter(s => (s.attendance?.percentage ?? 100) < 75);
    let count = 0;
    const sampleNames = [];
    for (const s of attStudents) {
      const alreadyHas = existingInterventions.some(i =>
        (i.studentId === s.studentId || i.studentName === s.name) &&
        (i.category === 'Immediate' || i.category === 'Attendance') &&
        i.status !== 'Completed'
      );
      if (!alreadyHas) {
        tasksToCreate.push({
          studentId: s.studentId,
          studentName: s.name,
          action: `Mandatory biometric check-in & Attendance recovery counseling (Current: ${(s.attendance?.percentage ?? 0).toFixed(1)}%)`,
          category: 'Immediate',
          assignedTo: 'Attendance Cell & Faculty Mentor',
          status: 'Assigned',
          followUpDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
          notes: `Automated cohort intervention: Low attendance (${(s.attendance?.percentage ?? 0).toFixed(1)}% < 75%).`
        });
        count++;
        if (sampleNames.length < 5) sampleNames.push(`${s.name} (${(s.attendance?.percentage ?? 0).toFixed(1)}%)`);
      }
    }
    summaryDetails.push({
      category: 'Attendance Recovery',
      criteria: 'Attendance < 75%',
      assignedCount: count,
      totalMatched: attStudents.length,
      samples: sampleNames
    });
  }

  // 2. Academic Tasks (Backlogs > 0 or CGPA < 6.5)
  if (categories.includes('Academic')) {
    const acadStudents = allStudents.filter(s => (s.academic?.backlogs ?? 0) > 0 || (s.academic?.cgpa ?? 10) < 6.5);
    let count = 0;
    const sampleNames = [];
    for (const s of acadStudents) {
      const alreadyHas = existingInterventions.some(i =>
        (i.studentId === s.studentId || i.studentName === s.name) &&
        i.category === 'Academic' &&
        i.status !== 'Completed'
      );
      if (!alreadyHas) {
        tasksToCreate.push({
          studentId: s.studentId,
          studentName: s.name,
          action: `Remedial tutoring sessions & backlog clearance roadmap (${s.academic?.backlogs ?? 0} backlog(s), CGPA: ${s.academic?.cgpa ?? 'N/A'})`,
          category: 'Academic',
          assignedTo: 'Department Academic Head',
          status: 'Assigned',
          followUpDate: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
          notes: `Automated cohort intervention: Academic risk with ${s.academic?.backlogs ?? 0} backlog(s).`
        });
        count++;
        if (sampleNames.length < 5) sampleNames.push(`${s.name} (${s.academic?.backlogs ?? 0} backlogs)`);
      }
    }
    summaryDetails.push({
      category: 'Academic Remediation',
      criteria: 'Backlogs > 0 or CGPA < 6.5',
      assignedCount: count,
      totalMatched: acadStudents.length,
      samples: sampleNames
    });
  }

  // 3. Placement Tasks (Coding < 55 or Placement Risk)
  if (categories.includes('Placement')) {
    const placeStudents = allStudents.filter(s => (s.placement?.coding ?? 100) < 55 || s.segment === 'Placement Risk');
    let count = 0;
    const sampleNames = [];
    for (const s of placeStudents) {
      const alreadyHas = existingInterventions.some(i =>
        (i.studentId === s.studentId || i.studentName === s.name) &&
        i.category === 'Placement' &&
        i.status !== 'Completed'
      );
      if (!alreadyHas) {
        tasksToCreate.push({
          studentId: s.studentId,
          studentName: s.name,
          action: `Enroll in Intensive DSA Bootcamp & Mock Technical Interview (Coding Score: ${s.placement?.coding ?? 0}/100)`,
          category: 'Placement',
          assignedTo: 'Placement Cell Lead',
          status: 'Assigned',
          followUpDate: new Date(Date.now() + 28 * 86400000).toISOString().split('T')[0],
          notes: `Automated cohort intervention: Placement / coding diagnostic below 55/100.`
        });
        count++;
        if (sampleNames.length < 5) sampleNames.push(`${s.name} (Coding: ${s.placement?.coding ?? 0})`);
      }
    }
    summaryDetails.push({
      category: 'Placement Training',
      criteria: 'Coding score < 55 or Placement Risk segment',
      assignedCount: count,
      totalMatched: placeStudents.length,
      samples: sampleNames
    });
  }

  // 4. Mentoring Tasks (High Risk)
  if (categories.includes('Mentoring')) {
    const mentorStudents = allStudents.filter(s => s.riskLevel === 'HIGH');
    let count = 0;
    const sampleNames = [];
    for (const s of mentorStudents) {
      const alreadyHas = existingInterventions.some(i =>
        (i.studentId === s.studentId || i.studentName === s.name) &&
        i.category === 'Mentoring' &&
        i.status !== 'Completed'
      );
      if (!alreadyHas) {
        tasksToCreate.push({
          studentId: s.studentId,
          studentName: s.name,
          action: `1-on-1 Faculty Mentoring & Academic Counseling Check-in (Success Score: ${s.successScore ?? 0}/100)`,
          category: 'Mentoring',
          assignedTo: 'Chief Faculty Counselor',
          status: 'Assigned',
          followUpDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
          notes: `Automated cohort intervention: High-risk cohort priority mentoring.`
        });
        count++;
        if (sampleNames.length < 5) sampleNames.push(`${s.name} (Score: ${s.successScore ?? 0})`);
      }
    }
    summaryDetails.push({
      category: 'Faculty Mentoring',
      criteria: 'High-risk overall status',
      assignedCount: count,
      totalMatched: mentorStudents.length,
      samples: sampleNames
    });
  }

  return {
    tasksToCreate,
    summaryDetails
  };
}

// ─── Main Agent Function ──────────────────────────────────────────────────────
export async function runAgent(query, existingInterventions = [], history = []) {
  const allStudents = await getAllStudents();
  const intent = detectIntent(query);
  const q = query.toLowerCase();

  // ── Context resolution ────────────────────────────────────────────────────
  // 1. Try to extract a student directly from the current query
  let student = extractStudentRef(query, allStudents);

  // 2. If the query uses pronouns (his/her/their/the student) and no direct name found,
  //    resolve to the last student mentioned in conversation history
  const usedPronoun = isPronounQuery(query) && !student;
  if (usedPronoun) {
    student = extractLastStudentFromHistory(history, allStudents);
  }

  // 3. If still not found, check for a fuzzy name match
  let fuzzyMatches = [];
  if (!student) {
    // Extract the most likely name fragment from the query
    // Strip common words to isolate the potential name
    const stripped = query
      .replace(/give me|details|about|tell me|show|who is|what are|risk factor|for|of|the|is|his|her|their|a|an/gi, ' ')
      .trim();
    if (stripped.length > 2) {
      fuzzyMatches = findSimilarStudents(stripped, allStudents);
    }
  }

  // INTENT: Batch Task Assignment across Risk Cohorts ──────────────────────────
  if (intent === 'batch_assign_task') {
    const { tasksToCreate, summaryDetails } = generateBatchTasks(query, allStudents, existingInterventions);
    
    let summaryText = `⚡ **Automated Task Assignment Report**\n\n` +
      `I have analyzed all campus student records and generated intervention tasks across the identified risk cohorts:\n\n`;

    summaryDetails.forEach(s => {
      summaryText += `🔹 **${s.category}** (${s.criteria}):\n` +
        `  • **${s.assignedCount}** new tasks assigned (${s.totalMatched} eligible students in total)\n` +
        (s.samples.length > 0 ? `  • Sample recipients: ${s.samples.join(', ')}\n` : '  • *(All matching students already have active tasks assigned)*\n') +
        `\n`;
    });

    summaryText += `✅ **Total New Tasks Created:** **${tasksToCreate.length}**\n` +
      `📌 **Status:** Assigned & Active\n` +
      `🌐 **Sync Complete:** All assigned tasks are dispatched to department faculty and are **immediately visible on each student's portal**!`;

    return {
      type: 'batch_tasks_assigned',
      tasks: tasksToCreate,
      summaryDetails,
      summary: summaryText
    };
  }

  // INTENT: Assign Task (Individual) ──────────────────────────────────────────
  if (intent === 'assign_task') {
    if (!student) {
      const lastStudent = extractLastStudentFromHistory(history, allStudents);
      const suggestions = fuzzyMatches.length
        ? `\n\n💡 **Did you mean one of these?**\n${fuzzyMatches.map(s => `• **${s.name}** (${s.studentId}) — ${s.department}`).join('\n')}`
        : '';
      const contextHint = lastStudent
        ? `\n\n💬 I last discussed **${lastStudent.name}**. Did you mean to assign a task to them? If so, say: *"assign task for ${lastStudent.name}"*`
        : '';
      return {
        type: 'not_found',
        fuzzyMatches,
        summary: `❓ I couldn't identify which student to assign the task to.${suggestions}${contextHint}\n\nTip: Use a full name or student ID, e.g. *"assign attendance recovery task for Rahul Kumar"*`,
        assignedTask: null
      };
    }
    const { category, taskText } = extractTaskDetails(query);
    const plan = generateInterventionPlan(student);
    // Pick a sensible default task from plan if no custom text
    const allPlanTasks = Object.values(plan.recommendedActions).flat();
    const defaultTask = allPlanTasks.find(t => t.toLowerCase().includes(category.toLowerCase())) || allPlanTasks[0];
    const finalTask = taskText || defaultTask;

    return {
      type: 'task_assigned',
      studentId: student.studentId,
      studentName: student.name,
      task: {
        action: finalTask,
        category,
        assignedTo: 'Faculty Mentor',
        followUpDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        status: 'In Progress'
      },
      summary: `✅ **Task Assigned to ${student.name}**\n\n` +
        `📌 **Task:** ${finalTask}\n` +
        `📂 **Category:** ${category}\n` +
        `👤 **Assigned To:** Faculty Mentor\n` +
        `📅 **Follow-up Date:** ${new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]}\n\n` +
        `🌐 This task is now saved and **visible on ${student.name}'s Student Portal**!`
    };
  }

  // INTENT: Risk Factors ─────────────────────────────────────────────────────
  if (intent === 'risk_factors') {
    if (!student) {
      const lastStudent = extractLastStudentFromHistory(history, allStudents);
      if (usedPronoun && !lastStudent) {
        return { type: 'not_found', fuzzyMatches: [], summary: '🤔 I\'m not sure which student you\'re referring to. Could you specify a name? E.g. *"What are the risk factors for Rahul Kumar?"*' };
      }
      if (fuzzyMatches.length) {
        return {
          type: 'not_found',
          fuzzyMatches,
          summary: `❌ I couldn't find that student. **Are you looking for one of these?**\n\n${fuzzyMatches.map(s => `• **${s.name}** (${s.studentId}) — ${s.department}, ${s.riskLevel} Risk`).join('\n')}`
        };
      }
      return { type: 'not_found', fuzzyMatches: [], summary: '❓ Please specify a student name or ID to explain risk factors. E.g. *"What are the risk factors for Rahul Kumar?"*' };
    }
    return formatRiskFactors(student);
  }

  // INTENT: Student Detail ───────────────────────────────────────────────────
  if (intent === 'student_detail' || intent === 'student_score') {
    if (!student) {
      if (fuzzyMatches.length) {
        return {
          type: 'not_found',
          fuzzyMatches,
          summary: `❌ I couldn't find that exact student. **Are you looking for one of these?**\n\n${fuzzyMatches.map(s => `• **${s.name}** (${s.studentId}) — ${s.department}, Year ${s.year}, Score: ${s.successScore}/100`).join('\n')}`
        };
      }
      return { type: 'not_found', fuzzyMatches: [], summary: '❓ Student not found. Please try the full name or student ID (e.g. SC-2023-0142).' };
    }
    return formatStudentDetail(student);
  }

  // INTENT: Interventions ────────────────────────────────────────────────────
  if (intent === 'interventions') {
    if (!student) {
      if (fuzzyMatches.length) {
        return {
          type: 'not_found',
          fuzzyMatches,
          summary: `❌ I couldn't find that student. **Did you mean one of these?**\n\n${fuzzyMatches.map(s => `• **${s.name}** (${s.studentId}) — ${s.riskLevel} Risk, ${s.department}`).join('\n')}`
        };
      }
      const lastStudent = extractLastStudentFromHistory(history, allStudents);
      const hint = lastStudent ? `\n\n💬 We were last discussing **${lastStudent.name}**. Did you mean them?` : '';
      return { type: 'not_found', fuzzyMatches: [], summary: `❓ Please specify a student name to generate an intervention plan.${hint}` };
    }
    const plan = generateInterventionPlan(student);
    return formatInterventionPlan(student, plan);
  }

  // INTENT: Analytics – High Risk List ──────────────────────────────────────
  if (intent === 'high_risk') {
    const high = allStudents.filter(s => s.riskLevel === 'HIGH').slice(0, 10);
    const totalHigh = allStudents.filter(s => s.riskLevel === 'HIGH').length;
    return {
      type: 'student_list',
      riskLevel: 'HIGH',
      students: high,
      summary: `🔴 **High-Risk Students** (${totalHigh} total in campus, showing top ${high.length}):\n\n` +
        high.map((s, i) => `${i + 1}. **${s.name}** (${s.studentId}) — Score: **${s.successScore}/100** | ${s.department} | Att: ${s.attendance?.percentage != null ? s.attendance.percentage.toFixed(1) + '%' : 'N/A'} | Backlogs: ${s.academic?.backlogs ?? 0}`).join('\n') +
        `\n\n💡 *Action Tip: You can say "assign attendance task to all low attendance students" or "who are the medium risk students".*`
    };
  }

  // INTENT: Analytics – Medium Risk List ────────────────────────────────────
  if (intent === 'medium_risk') {
    const med = allStudents.filter(s => s.riskLevel === 'MEDIUM').slice(0, 10);
    const totalMed = allStudents.filter(s => s.riskLevel === 'MEDIUM').length;
    return {
      type: 'student_list',
      riskLevel: 'MEDIUM',
      students: med,
      summary: `🟡 **Medium-Risk Students** (${totalMed} total in campus, showing top ${med.length}):\n\n` +
        med.map((s, i) => `${i + 1}. **${s.name}** (${s.studentId}) — Score: **${s.successScore}/100** | ${s.department} | Att: ${s.attendance?.percentage != null ? s.attendance.percentage.toFixed(1) + '%' : 'N/A'} | CGPA: ${s.academic?.cgpa ?? 'N/A'}`).join('\n') +
        `\n\n💡 *Action Tip: Ask "who are the high risk students" or "who are the low risk students".*`
    };
  }

  // INTENT: Analytics – Low Risk List ───────────────────────────────────────
  if (intent === 'low_risk') {
    const low = allStudents.filter(s => s.riskLevel === 'LOW').slice(0, 10);
    const totalLow = allStudents.filter(s => s.riskLevel === 'LOW').length;
    return {
      type: 'student_list',
      riskLevel: 'LOW',
      students: low,
      summary: `🟢 **Low-Risk / Healthy Students** (${totalLow} total in campus, showing top ${low.length}):\n\n` +
        low.map((s, i) => `${i + 1}. **${s.name}** (${s.studentId}) — Score: **${s.successScore}/100** | ${s.department} | Att: ${s.attendance?.percentage != null ? s.attendance.percentage.toFixed(1) + '%' : 'N/A'} | CGPA: ${s.academic?.cgpa ?? 'N/A'}`).join('\n') +
        `\n\n💡 *All students in this cohort meet academic thresholds and university attendance regulations.*`
    };
  }

  // INTENT: All Risk Summary ────────────────────────────────────────────────
  if (intent === 'all_risk_summary') {
    const high = allStudents.filter(s => s.riskLevel === 'HIGH').length;
    const med = allStudents.filter(s => s.riskLevel === 'MEDIUM').length;
    const low = allStudents.filter(s => s.riskLevel === 'LOW').length;
    return {
      type: 'text',
      summary: `📊 **Campus Risk Overview** (${allStudents.length} total students):\n\n` +
        `🔴 **High Risk:** **${high} students** (${((high / allStudents.length) * 100).toFixed(1)}%) — Urgent intervention required\n` +
        `🟡 **Medium Risk:** **${med} students** (${((med / allStudents.length) * 100).toFixed(1)}%) — Borderline, academic monitoring\n` +
        `🟢 **Low Risk:** **${low} students** (${((low / allStudents.length) * 100).toFixed(1)}%) — Safe & on track for graduation\n\n` +
        `👉 Ask: *"who are the high risk students"*, *"who are the medium risk students"*, or *"who are the low risk students"* to inspect each cohort.`
    };
  }

  // INTENT: Top Students ────────────────────────────────────────────────────
  if (intent === 'top_students') {
    const top = [...allStudents].sort((a, b) => (b.successScore || 0) - (a.successScore || 0)).slice(0, 5);
    return {
      type: 'student_list',
      students: top,
      summary: `🏆 **Top 5 Performing Students**\n\n` +
        top.map((s, i) => `${i + 1}. **${s.name}** (${s.studentId}) — Score: ${s.successScore}/100 | ${s.department}`).join('\n')
    };
  }

  // INTENT: Department Breakdown ────────────────────────────────────────────
  if (intent === 'dept_breakdown') {
    const depts = {};
    for (const s of allStudents) {
      if (!s.department) continue;
      if (!depts[s.department]) depts[s.department] = { total: 0, high: 0, avgScore: 0 };
      depts[s.department].total++;
      if (s.riskLevel === 'HIGH') depts[s.department].high++;
      depts[s.department].avgScore += s.successScore || 0;
    }
    const rows = Object.entries(depts)
      .map(([d, v]) => ({ dept: d, ...v, avgScore: Math.round(v.avgScore / v.total) }))
      .sort((a, b) => b.high - a.high);
    return {
      type: 'text',
      summary: `🏫 **Department Risk Breakdown**\n\n` +
        rows.map(r => `**${r.dept}**: ${r.high}/${r.total} high-risk | Avg Score: ${r.avgScore}/100`).join('\n')
    };
  }

  // INTENT: Early Warnings ──────────────────────────────────────────────────
  if (intent === 'early_warning') {
    const ew = allStudents.filter(s => s.ml?.agreement === 'ML Early Warning').slice(0, 5);
    return {
      type: 'student_list',
      students: ew,
      summary: `⚡ **ML Early Warning Students** (${allStudents.filter(s => s.ml?.agreement === 'ML Early Warning').length} total)\n` +
        `These students scored Low/Medium on rule-based scoring but ML model flagged HIGH academic risk.\n\n` +
        ew.map((s, i) => `${i + 1}. **${s.name}** (${s.studentId}) — Score: ${s.successScore}/100 | ${s.department}`).join('\n')
    };
  }

  // INTENT: Placement ───────────────────────────────────────────────────────
  if (intent === 'placement') {
    const pr = allStudents.filter(s => s.segment === 'Placement Risk').slice(0, 5);
    const count = allStudents.filter(s => s.segment === 'Placement Risk').length;
    return {
      type: 'text',
      summary: `💼 **Placement Risk Students** (${count} total)\n\n` +
        pr.map((s, i) => `${i + 1}. **${s.name}** — Coding: ${s.placement?.coding ?? 'N/A'}/100 | Score: ${s.successScore}/100`).join('\n')
    };
  }

  // INTENT: Average Score ───────────────────────────────────────────────────
  if (intent === 'avg_score') {
    const avg = Math.round(allStudents.reduce((a, s) => a + (s.successScore || 0), 0) / allStudents.length);
    return { type: 'text', summary: `📊 The average Success Score across all ${allStudents.length} students is **${avg}/100**.` };
  }

  // INTENT: Analytics Count ─────────────────────────────────────────────────
  if (intent === 'analytics_count') {
    const q = query.toLowerCase();
    if (q.includes('high risk') || q.includes('at risk')) {
      const c = allStudents.filter(s => s.riskLevel === 'HIGH').length;
      return { type: 'text', summary: `🔴 There are **${c} high-risk students** out of ${allStudents.length} total (${((c / allStudents.length) * 100).toFixed(1)}%).` };
    }
    return { type: 'text', summary: `📊 Total students in the system: **${allStudents.length}**` };
  }

  // INTENT: Segments ────────────────────────────────────────────────────────
  if (intent === 'segments') {
    const segs = {};
    for (const s of allStudents) {
      if (s.segment) segs[s.segment] = (segs[s.segment] || 0) + 1;
    }
    return {
      type: 'text',
      summary: `🗂️ **Student Segments**\n\n` + Object.entries(segs).map(([k, v]) => `• **${k}**: ${v} students`).join('\n')
    };
  }

  // INTENT: List Students ───────────────────────────────────────────────────
  if (intent === 'list_students') {
    const sample = allStudents.slice(0, 8);
    return {
      type: 'student_list',
      students: sample,
      summary: `📋 **Sample Student Records** (showing 8 of ${allStudents.length})\n\n` +
        sample.map((s, i) => `${i + 1}. **${s.name}** (${s.studentId}) — ${s.riskLevel} | ${s.department}`).join('\n')
    };
  }

  // INTENT: General / Catch-All ─────────────────────────────────────────────
  const totalStudents = allStudents.length;
  const highRisk = allStudents.filter(s => s.riskLevel === 'HIGH').length;
  const avgScore = Math.round(allStudents.reduce((a, s) => a + (s.successScore || 0), 0) / totalStudents);
  const earlyWarnings = allStudents.filter(s => s.ml?.agreement === 'ML Early Warning').length;
  return {
    type: 'text',
    summary: `👋 I'm your SmartCampus AI Agent. Here's what I can help with:\n\n` +
      `📋 **"Give me details about [student name]"** — Full student profile\n` +
      `⚠️ **"What are the risk factors for [student name]?"** — Risk explanation\n` +
      `📌 **"Recommend interventions for [student name]"** — Action plan\n` +
      `✅ **"Assign attendance task for [student name]"** — Directly create a task\n` +
      `📊 **"Which department has highest risk?"** — Department analytics\n` +
      `🔴 **"Show high risk students"** — High-risk cohort\n\n` +
      `**Current Snapshot:** ${totalStudents} students | Avg Score: ${avgScore}/100 | High Risk: ${highRisk} | ML Early Warnings: ${earlyWarnings}`
  };
}
