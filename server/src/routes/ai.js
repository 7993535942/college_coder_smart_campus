import express from 'express';
import { generateInterventionPlan, answerDatasetQuery } from '../services/aiCopilot.js';
import { runAgent } from '../services/agentEngine.js';
import { Student } from '../models/Student.js';
import { Intervention } from '../models/Intervention.js';
import { isUsingMemoryStore, memoryStore } from '../db.js';
import { memoryInterventions } from './interventions.js';

const router = express.Router();

router.post('/intervention', async (req, res) => {
  try {
    const studentData = req.body;
    if (!studentData || (!studentData.studentId && !studentData.name)) {
      return res.status(400).json({ error: 'Student data is required' });
    }
    const plan = generateInterventionPlan(studentData);
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/ask', async (req, res) => {
  try {
    const { query, history } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // ─── Crisis & Self-Harm Intervention Protocol (Critical Priority) ───
    const qLower = query.toLowerCase().trim();
    if (/\b(want to die|wanna die|suicide|suicidal|kill myself|end my life|end it all|harm myself|self harm|self-harm|dont want to live|don't want to live|no point in living|no reason to live|better off dead|hang myself|take my own life|cut my wrist)\b/i.test(qLower)) {
      return res.json({
        answer: `I am so sorry you are feeling this way, but please know that you are not alone and your life is incredibly valuable. Academic setbacks like backlogs can be stressful, but they can always be resolved. Please do not make any permanent or violent decisions. 

There is support available right now. Please reach out to someone who can help:
- National Tele-MANAS Helpline (India): **14416** or **1800-891-4416** (24/7 Toll-Free)
- KIRAN Mental Health Helpline: **1800-599-0019**
- Suicide & Crisis Lifeline (US/Canada): **988**
- National Emergency Services: **112** (India) / **911** (US)
- Campus Counseling Center: Please visit or contact your university's student health/counseling center immediately.
- Talk to a trusted friend, family member, or professor.

Please reach out to one of these resources right now. They are there to help you through this.`,
        type: 'crisis',
        isCrisis: true
      });
    }

    if (/^(hi|hello|hey|good morning|good afternoon|good evening|greetings)[\s!.]*$/i.test(qLower)) {
      return res.json({
        answer: 'Hello! How can I help you with your studies or campus questions today?',
        type: 'greeting'
      });
    }

    // Get existing interventions to pass for duplicate-check context
    const existingInterventions = memoryInterventions || [];

    const result = await runAgent(query, existingInterventions, history || []);

    // If agent wants to auto-assign a single task, persist it
    let autoCreatedTask = null;
    if (result.type === 'task_assigned' && result.task) {
      const newIntervention = {
        _id: `int-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        studentId: result.studentId,
        studentName: result.studentName,
        action: result.task.action,
        category: result.task.category,
        assignedTo: result.task.assignedTo,
        status: result.task.status,
        followUpDate: result.task.followUpDate,
        notes: `Auto-assigned via Campus AI Agent from query: "${query}"`,
        createdAt: new Date().toISOString()
      };
      memoryInterventions.unshift(newIntervention);
      if (!isUsingMemoryStore) {
        try {
          await Intervention.create(newIntervention);
        } catch (mongoErr) {
          console.warn('MongoDB task save warning:', mongoErr.message);
        }
      }
      autoCreatedTask = newIntervention;
    }

    // If agent auto-assigned a batch of tasks across risk cohorts, persist all of them
    let autoCreatedBatch = null;
    if (result.type === 'batch_tasks_assigned' && Array.isArray(result.tasks) && result.tasks.length > 0) {
      const preparedTasks = result.tasks.map((t, idx) => ({
        ...t,
        _id: `int-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
        createdAt: new Date().toISOString()
      }));

      for (const pt of preparedTasks) {
        memoryInterventions.unshift(pt);
      }

      if (!isUsingMemoryStore) {
        try {
          await Intervention.insertMany(preparedTasks, { ordered: false });
        } catch (mongoErr) {
          console.warn('MongoDB batch tasks save warning:', mongoErr.message);
        }
      }

      autoCreatedBatch = {
        count: preparedTasks.length,
        summaryDetails: result.summaryDetails,
        sampleTasks: preparedTasks.slice(0, 10)
      };
    }

    res.json({
      answer: result.summary,
      type: result.type,
      data: result.type === 'not_found'
        ? (result.fuzzyMatches || [])
        : (result.data || result.students || result.factors || result.plan || null),
      autoCreatedTask,
      autoCreatedBatch
    });
  } catch (err) {
    console.error('Agent error:', err);
    res.status(500).json({ error: err.message, answer: 'An internal error occurred while processing your query.' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/ai/student-advisor  (Personalized Student AI Agent)
// ─────────────────────────────────────────────────────────────
function generateStudentAdvisorResponse(query, student) {
  const q = (query || '').toLowerCase().trim();
  const name = student?.name || 'Student';
  const dept = student?.department || 'Engineering';
  const yr = student?.year || 'Current Year';
  const sem = student?.semester || 1;
  const sec = student?.section || 'A';
  const id = student?.studentId || 'N/A';
  const cgpa = Number(student?.academic?.cgpa ?? 7.0).toFixed(2);
  const backlogs = Number(student?.academic?.backlogs ?? 0);
  const att = Number(student?.attendance?.percentage ?? 75.0).toFixed(1);
  const risk = (student?.riskLevel || 'MEDIUM').toUpperCase();
  const score = Number(student?.successScore ?? 50.0).toFixed(1);
  const placementStatus = student?.placement?.status || 'In Progress';
  const codingScore = student?.placement?.coding ?? 65;

  // ─── 0. CRISIS & SELF-HARM INTERVENTION PROTOCOL (CRITICAL TOP PRIORITY) ───
  const isCrisisQuery = /\b(want to die|wanna die|suicide|suicidal|kill myself|end my life|end it all|harm myself|self harm|self-harm|dont want to live|don't want to live|no point in living|no reason to live|better off dead|hang myself|take my own life|cut my wrist)\b/i.test(q);
  if (isCrisisQuery) {
    return {
      answer: `I am so sorry you are feeling this way, but please know that you are not alone and your life is incredibly valuable. Academic setbacks like backlogs can be stressful, but they can always be resolved. Please do not make any permanent or violent decisions. 

There is support available right now. Please reach out to someone who can help:
- National Tele-MANAS Helpline (India): **14416** or **1800-891-4416** (24/7 Toll-Free)
- KIRAN Mental Health Helpline: **1800-599-0019**
- Suicide & Crisis Lifeline (US/Canada): **988**
- National Emergency Services: **112** (India) / **911** (US)
- Campus Counseling Center: Please visit or contact your university's student health/counseling center immediately.
- Talk to a trusted friend, family member, or professor.

Please reach out to one of these resources right now. They are there to help you through this.`,
      type: 'crisis',
      isCrisis: true,
      suggestions: [
        'Contact Campus Counseling Center',
        'National Helpline: 14416 / 988'
      ]
    };
  }

  // ─── 1. GENERAL INTERACTIONS (GREETING STATE) ────────────────────────────────
  const isGreeting = /^(hi|hello|hey|hiya|howdy|good morning|good afternoon|good evening|greetings)[\s!.]*$/i.test(q);
  if (isGreeting) {
    return {
      answer: `Hello! How can I help you with your studies or campus questions today?`,
      type: 'greeting',
      suggestions: [
        'How many backlogs do I have?',
        'What is my attendance status?',
        'Show my profile details & current standing',
        `Placement readiness roadmap for ${dept}`
      ]
    };
  }

  // ─── 2. IDENTITY / PROFILE DETAILS QUERY (ON STUDENT REQUEST) ───────────────
  if (
    q.includes('who are you') || 
    q.includes('who am i') || 
    q.includes('identify me') || 
    q.includes('my profile') || 
    q.includes('my details') || 
    q.includes('profile details') || 
    q.includes('current standing') || 
    q.includes('my standing') || 
    q.includes('my status') || 
    q.includes('academic status')
  ) {
    return {
      answer: `🎓 **Here are your profile details & academic standing, ${name}:**\n\n- **Student ID**: \`${id}\`\n- **Program**: ${dept} (${yr}, Sem ${sem}, Section ${sec})\n- **Academic CGPA**: **${cgpa} / 10.0**\n- **Active Backlogs**: **${backlogs}**\n- **Biometric Attendance**: **${att}%** ${parseFloat(att) < 75 ? '(⚠️ Below 75% university requirement)' : '✅'}\n- **Current Standing**: **${risk} RISK** (Success Score: **${score}/100**)\n- **Placement Readiness**: **${placementStatus}** (Coding Diagnostic: ${codingScore}/100)\n\nWhat would you like me to help you analyze or plan next?`,
      type: 'identity',
      suggestions: [
        `How can I clear my ${backlogs} active backlog(s)?`,
        'How many classes to reach 75% attendance?',
        `Why is my profile classified as ${risk} RISK?`,
        'Placement preparation tips'
      ]
    };
  }

  // 2. Attendance queries
  if (q.includes('attendance') || q.includes('absent') || q.includes('bunk') || q.includes('shortage') || q.includes('classes')) {
    const attNum = parseFloat(att);
    const wantsPlan = q.includes('plan') || q.includes('how to') || q.includes('how many classes') || q.includes('calculate') || q.includes('fix') || q.includes('improve') || q.includes('schedule') || q.includes('recover') || q.includes('yes');

    if (wantsPlan) {
      if (attNum < 75) {
        const deficit = (75 - attNum).toFixed(1);
        const estimatedClassesNeeded = Math.ceil((0.75 * 60 - (attNum / 100) * 50) / (1 - 0.75));
        const safeNeeded = Math.max(6, Math.min(20, estimatedClassesNeeded));
        return {
          answer: `⚠️ **Attendance Recovery Action Plan for ${name} (${dept})**:\n\nYour current biometric attendance is **${att}%** (**${deficit}% below** the mandatory campus threshold of **75.0%**).\n\n### 📋 Recommended Recovery Steps:\n1. **Attend the next ${safeNeeded} consecutive lectures** across your subjects without any unexcused absences.\n2. In Semester ${sem}, lab sessions and tutorial periods carry double credit weightage—ensure 100% presence in lab hours.\n3. Submit medical or authorized leave slips to your department coordinator within 48 hours for condonation review.\n4. Reaching **75.5%** will remove the detention hold and boost your Success Score by **+14 points**!`,
          type: 'attendance_plan',
          suggestions: ['How many backlogs do I have?', `Why is my profile classified as ${risk} RISK?`, 'Show my profile details']
        };
      } else {
        return {
          answer: `✅ **Your attendance is in good standing at ${att}%** (above the 75% university requirement).\n\nKeep maintaining regular presence through Semester ${sem} to qualify for internal assessment grace marks!`,
          type: 'attendance_status',
          suggestions: ['How many backlogs do I have?', 'Show my CGPA', 'Placement readiness tips']
        };
      }
    } else {
      // Direct factual answer without unprompted plan dump
      const statusText = attNum < 75
        ? `📊 **Attendance Status:** Your current biometric attendance is **${att}%**, which is **${(75 - attNum).toFixed(1)}% below** the university required 75.0% threshold.`
        : `✅ **Attendance Status:** Your current biometric attendance is **${att}%**, which safely meets the university 75.0% requirement.`;
      
      const followUp = attNum < 75
        ? `\n\nWould you like me to recommend an attendance recovery action plan and calculate how many classes you need to attend?`
        : `\n\nWould you like any assistance with your course schedule or exam preparation?`;

      return {
        answer: `${statusText}${followUp}`,
        type: 'attendance_inquiry',
        suggestions: attNum < 75 
          ? ['Yes, show attendance recovery plan', 'How many backlogs do I have?', 'Show my profile details']
          : ['How many backlogs do I have?', 'Show my CGPA', 'Show my profile details']
      };
    }
  }

  // 3. Backlog queries & Backlog Recovery Plan
  if (
    q.includes('backlog') || 
    q.includes('fail') || 
    q.includes('arrear') || 
    q.includes('supply') || 
    q.includes('reappear') ||
    q.includes('recovery action plan') ||
    q.includes('recovery plan')
  ) {
    const wantsActionPlan = q.includes('plan') || q.includes('how to') || q.includes('clear') || q.includes('strategy') || q.includes('recover') || q.includes('recommend') || q.includes('yes') || q.includes('prepare');

    if (wantsActionPlan && backlogs > 0) {
      // Detailed action plan only when explicitly requested
      return {
        answer: `📚 **Personalized Backlog Recovery Action Plan for ${name}**:\n\n### 🎯 Recommended 4-Step Recovery Plan:\n1. **Prioritize Supplementary Exam Registration**: Verify fee payment and exam dates with the academic cell for Semester ${sem}.\n2. **Faculty Mentoring Sessions**: Your profile qualifies for 1-on-1 department tutoring sessions. Contact your Section ${sec} mentor to schedule weekly doubt-clearing.\n3. **Previous 5-Year Question Papers**: Focus on high-frequency modules and derivation topics that carry 60%+ marks.\n4. **Placement Unlock**: Clearing these ${backlogs} backlog(s) will immediately change your placement eligibility status from **${placementStatus}** to **Eligible**!`,
        type: 'backlog_plan',
        suggestions: ['What is my attendance status?', `Why is my profile classified as ${risk} RISK?`, 'Placement readiness tips']
      };
    } else if (backlogs > 0) {
      // Direct factual answer + ask student if they want the plan
      return {
        answer: `📚 You currently have **${backlogs} active course backlog${backlogs > 1 ? 's' : ''}**.\n\nWould you like me to recommend a recovery action plan to help you clear them?`,
        type: 'backlog_status',
        suggestions: [
          'Yes, recommend recovery action plan',
          'What is my attendance status?',
          `Why is my profile classified as ${risk} RISK?`
        ]
      };
    } else {
      return {
        answer: `🌟 **Clean Record, ${name}!**\n\nYou currently have **0 active backlogs** with a CGPA of **${cgpa}**. You are in good academic standing!`,
        type: 'backlog_clean',
        suggestions: ['What is my attendance status?', 'Placement readiness roadmap', 'Show my profile details']
      };
    }
  }

  // 4. Risk Level & Success Score explanation
  if (q.includes('risk') || q.includes('success score') || q.includes('high risk') || q.includes('low risk') || q.includes('score')) {
    const reasons = [];
    if (parseFloat(att) < 75) reasons.push(`• **Biometric Attendance (${att}%)** is currently beneath the 75% requirement.`);
    if (backlogs > 0) reasons.push(`• **Active Course Backlogs (${backlogs})** require immediate supplementary clearance.`);
    if (parseFloat(cgpa) < 7.0) reasons.push(`• **CGPA (${cgpa})** is below the optimal distinction tier.`);
    if (reasons.length === 0) reasons.push('• Maintain regular participation to retain your Low Risk status.');

    return {
      answer: `🛡️ **Institutional Risk Assessment for ${name}**:\n\nYour profile is currently categorized as **${risk} RISK** with an overall **Success Score of ${score}/100**.\n\n### 🔍 Key Contributing Factors:\n${reasons.join('\n')}\n\n### 🚀 How to Elevate to LOW RISK:\n- **Clear ${backlogs > 0 ? backlogs + ' backlog(s)' : 'upcoming midterms'}**: +15 to +20 points.\n- **Raise Attendance above 75%**: +14 points.\n- **Complete LMS Weekly Modules**: +5 points.\n\nThese adjustments will push your Success Score to **~75+**, shifting your status to **LOW RISK** automatically!`,
      type: 'risk',
      suggestions: ['Give me a study plan for Semester ' + sem, 'How to clear my backlogs?', 'Explain placement readiness']
    };
  }

  // 5. Assigned Tasks / Interventions query
  if (
    q.includes('task') || 
    q.includes('assigned') || 
    q.includes('intervention') || 
    q.includes('homework') || 
    q.includes('todo') ||
    q.includes('mentor note') ||
    q.includes('what do i need to do')
  ) {
    const studentTasks = (memoryInterventions || []).filter(i => 
      (i.studentId && i.studentId.toLowerCase() === (id || '').toLowerCase()) ||
      (i.studentName && i.studentName.toLowerCase() === (name || '').toLowerCase())
    );

    if (studentTasks.length === 0) {
      return {
        answer: `✅ **No Pending Tasks!**\n\nYou currently have no active intervention tasks assigned by faculty mentors or campus administrators. Keep maintaining your coursework!`,
        type: 'tasks_status',
        suggestions: [
          'What is my attendance status?',
          'How many backlogs do I have?',
          'Show my profile details'
        ]
      };
    }

    const pending = studentTasks.filter(t => t.status !== 'Completed');
    return {
      answer: `📋 **Here are your assigned intervention tasks, ${name}:**\n\n` +
        `You have **${pending.length} pending task(s)** (${studentTasks.length} total) assigned by faculty mentors:\n\n` +
        studentTasks.map((t, idx) => 
          `${idx + 1}. **${t.action}**\n` +
          `   • **Category:** ${t.category} | **Status:** \`${t.status}\`\n` +
          `   • **Assigned By:** ${t.assignedTo} | **Due Date:** ${t.followUpDate || 'TBD'}\n` +
          (t.notes ? `   • *Note:* ${t.notes}\n` : '')
        ).join('\n') +
        `\n\n💡 You can view, track, and update the status of these tasks in the **Assigned Tasks** tab on your sidebar!`,
      type: 'tasks_status',
      suggestions: [
        'How many backlogs do I have?',
        'What is my attendance status?',
        'Show my profile details'
      ]
    };
  }

  // 6. Placement & Skills queries
  if (q.includes('placement') || q.includes('job') || q.includes('interview') || q.includes('coding') || q.includes('skills') || q.includes('salary')) {
    return {
      answer: `💼 **Placement Readiness Roadmap for ${name} (${dept})**:\n\n- **Current Status**: **${placementStatus}**\n- **Technical Coding Benchmark**: **${codingScore}/100**\n- **Academic CGPA**: **${cgpa}**\n\n### 📌 Placement Requirements:\n1. **Zero Active Backlogs**: Top-tier tech recruiters (TCS, Infosys, Wipro, Amazon, Capgemini) require zero active backlogs at the time of recruitment.\n2. **Coding Benchmark**: Practice Data Structures & Algorithms (Arrays, Linked Lists, Trees, Graph algorithms) on LeetCode/HackerRank to elevate your diagnostic score from ${codingScore} to **75+**.\n3. **Technical Project**: In Semester ${sem}, build a full-stack or domain-specific capstone project and showcase it on GitHub.\n4. **Mock Interviews**: Schedule a mock HR and technical screening with the campus career development cell.`,
      type: 'placement',
      suggestions: ['How to improve coding score?', 'Clear my active backlogs', 'Attendance guidelines']
    };
  }

  // 6. CGPA & Marks improvement
  if (q.includes('cgpa') || q.includes('marks') || q.includes('grade') || q.includes('study') || q.includes('exam')) {
    return {
      answer: `📈 **CGPA Enhancement Strategy (${cgpa} ➔ 8.5+)**:\n\nHello ${name}, with your current CGPA of **${cgpa}** in Semester ${sem}:\n\n1. **Internal Assessments (CIE)**: Aim for 27/30 or higher in internal quizzes and midterms. Internal marks are the fastest lever to lift end-semester grades.\n2. **Target High-Credit Subjects**: Core courses in ${dept} carry 3 to 4 credits each. Scoring an 'A' grade in these boosts your cumulative GPA disproportionately.\n3. **Peer Study Sessions**: Team up with Section ${sec} classmates for complex problem-solving.\n4. **Faculty Consultation**: Attend weekly office hours for feedback on assignment drafts.`,
      type: 'academic',
      suggestions: ['Create a weekly study routine', 'How to handle backlogs?', 'Check my attendance']
    };
  }

  // 7. General fallback
  return {
    answer: `🤖 **Hello ${name}!**\n\nI have evaluated your academic dashboard for **${dept}** (Year ${yr}, Sem ${sem}):\n- **CGPA**: ${cgpa} | **Attendance**: ${att}% | **Backlogs**: ${backlogs} | **Status**: ${risk} RISK\n\nRegarding your question: *"**${query}**"*\n\nBased on your institutional analytics, the highest priority for you right now is to ${backlogs > 0 ? 'focus on clearing your ' + backlogs + ' active backlog(s)' : 'maintain your strong academic trajectory'} and ensure your biometric attendance stays safely above 75.0%.\n\nWould you like me to generate a personalized study plan or explain any specific performance metric?`,
    type: 'general',
    suggestions: [
      'How to clear my active backlogs?',
      'Attendance recovery action plan',
      'Why is my risk status ' + risk + '?',
      'Placement readiness checklist'
    ]
  };
}

router.post('/student-advisor', async (req, res) => {
  try {
    const { query, student } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }
    if (!student || (!student.name && !student.studentId)) {
      return res.status(400).json({ error: 'Student context is required' });
    }

    const response = generateStudentAdvisorResponse(query, student);
    return res.json(response);
  } catch (err) {
    console.error('Student advisor error:', err);
    return res.status(500).json({ 
      error: err.message, 
      answer: 'I encountered an issue analyzing your student profile. Please try again in a moment.' 
    });
  }
});

export default router;
