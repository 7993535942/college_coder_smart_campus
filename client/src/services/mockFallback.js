import sampleStudents from './sampleStudents.js';

// In-memory / localStorage state management for fallback mode
const STORAGE_INTERVENTIONS_KEY = 'smartcampus_interventions_fallback';
const STORAGE_USERS_KEY = 'smartcampus_users_fallback';

// Safe storage wrapper for browsers and headless/SSR environments
const memoryFallbackMap = {};

const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {}
    return memoryFallbackMap[key] || null;
  },
  setItem: (key, val) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, val);
      }
    } catch {}
    memoryFallbackMap[key] = val;
  },
  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {}
    delete memoryFallbackMap[key];
  }
};

function getStoredInterventions() {
  try {
    const raw = safeStorage.getItem(STORAGE_INTERVENTIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      _id: 'int-1',
      studentId: 'SC-2023-0142',
      studentName: 'Rahul Kumar',
      category: 'Academic Tutoring',
      priority: 'HIGH',
      status: 'In Progress',
      assignedTo: 'Prof. Sharma (CSE)',
      notes: 'Scheduled 3 weekly remedial classes for Data Structures and discrete math.',
      actionItems: ['Weekly mentoring on Fridays', 'Review midterm 1 answer scripts'],
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      _id: 'int-2',
      studentId: 'SC-2021-1001',
      studentName: 'Aditi Thakur',
      category: 'Attendance Counseling',
      priority: 'MEDIUM',
      status: 'Pending',
      assignedTo: 'Counselor Verma',
      notes: 'Attendance fell below 65% in morning slots.',
      actionItems: ['Contact parents', 'Schedule counseling'],
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
    }
  ];
}

function saveStoredInterventions(list) {
  try {
    safeStorage.setItem(STORAGE_INTERVENTIONS_KEY, JSON.stringify(list));
  } catch {}
}

export async function handleMockRequest(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};

  // 1. Auth: Login
  if (endpoint === '/auth/login' && method === 'POST') {
    const email = (body.email || '').toLowerCase().trim();
    const password = body.password || '';

    if (email === 'admin@smartcampus.demo' || email.includes('admin')) {
      const user = {
        id: 'admin-1',
        name: 'Campus Administrator',
        email: 'admin@smartcampus.demo',
        role: 'admin',
        studentId: null
      };
      const token = 'mock-admin-token-' + Date.now();
      safeStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    }

    // Student login
    const foundStudent = sampleStudents.find(s => 
      s.email?.toLowerCase() === email || 
      s.studentId?.toLowerCase() === email ||
      email.includes('student')
    ) || sampleStudents[0];

    const studentUser = {
      id: foundStudent._id || 'mock-student-1',
      name: foundStudent.name || 'Rahul Kumar',
      email: foundStudent.email || 'rahul.kumar@smartcampus.demo',
      role: 'student',
      studentId: foundStudent.studentId || 'SC-2023-0142'
    };
    const token = 'mock-student-token-' + Date.now();
    safeStorage.setItem('user', JSON.stringify(studentUser));
    return { token, user: studentUser };
  }

  // Auth: Me
  if (endpoint === '/auth/me') {
    try {
      const stored = safeStorage.getItem('user');
      if (stored) return { user: JSON.parse(stored) };
    } catch {}
    return {
      user: {
        id: 'admin-1',
        name: 'Campus Administrator',
        email: 'admin@smartcampus.demo',
        role: 'admin',
        studentId: null
      }
    };
  }

  // Auth: Logout
  if (endpoint === '/auth/logout') {
    safeStorage.removeItem('user');
    return { success: true };
  }

  // Analytics: Overview
  if (endpoint === '/analytics/overview') {
    const total = 1253;
    return {
      totalStudents: total,
      avgSuccessScore: 76,
      highRiskCount: 184,
      mediumRiskCount: 386,
      lowRiskCount: 683,
      avgAttendance: 81.4,
      placementReadyPct: 68,
      dataQualityPct: 96,
      mlHighRiskCount: 172,
      avgMlPlacementLikelihood: 0.74
    };
  }

  // Analytics: Departments
  if (endpoint === '/analytics/departments') {
    return [
      { department: 'Computer Science', students: 380, avgScore: 82, highRiskCount: 38, avgAttendance: 84.5 },
      { department: 'Information Technology', students: 240, avgScore: 79, highRiskCount: 29, avgAttendance: 82.0 },
      { department: 'Electronics & Comm', students: 265, avgScore: 75, highRiskCount: 42, avgAttendance: 80.2 },
      { department: 'Data Science & AI', students: 160, avgScore: 84, highRiskCount: 14, avgAttendance: 86.1 },
      { department: 'Mechanical Eng', students: 110, avgScore: 70, highRiskCount: 32, avgAttendance: 76.8 },
      { department: 'Civil Eng', students: 98, avgScore: 68, highRiskCount: 29, avgAttendance: 75.4 }
    ];
  }

  // Analytics: Segments
  if (endpoint === '/analytics/segments') {
    return [
      { segment: 'High Achievers', count: 324, avgScore: 91, highRisk: 4 },
      { segment: 'Consistent Performers', count: 486, avgScore: 78, highRisk: 22 },
      { segment: 'Placement Priority', count: 212, avgScore: 74, highRisk: 31 },
      { segment: 'Borderline Attention', count: 148, avgScore: 62, highRisk: 55 },
      { segment: 'Critical Intervention', count: 83, avgScore: 48, highRisk: 72 }
    ];
  }

  // Analytics: ML Summary
  if (endpoint === '/analytics/ml-summary') {
    return {
      models: [
        {
          id: 'academic_risk',
          name: 'Academic Dropout & Risk Predictor',
          algorithm: 'HistGradientBoostingClassifier',
          rocAuc: 0.862,
          f1: 0.768,
          accuracy: 0.835,
          topFeatures: ['Semester Pass Ratio', 'CGPA Delta', 'Active Backlogs', 'Attendance Trend']
        },
        {
          id: 'placement_readiness',
          name: 'Campus Placement Likelihood',
          algorithm: 'Calibrated Random Forest',
          rocAuc: 0.841,
          f1: 0.752,
          accuracy: 0.819,
          topFeatures: ['Technical Coding Score', 'Aptitude Assessment', 'Internship Count', 'CGPA']
        }
      ]
    };
  }

  // Analytics: Insights
  if (endpoint === '/analytics/insights') {
    return {
      insights: [
        {
          id: 'ins-1',
          severity: 'HIGH',
          title: '38 Students in 3rd Sem CSE show sudden drop in Attendance',
          detail: 'Correlated with early signs of semester backlog risk.',
          suggestedAction: 'Send automated academic counselor notice.'
        },
        {
          id: 'ins-2',
          severity: 'MEDIUM',
          title: 'Placement Readiness up 12% following Hackathon workshops',
          detail: 'Coding assessment scores improved from 54 to 68 on average.',
          suggestedAction: 'Enroll additional students in next weekend cohort.'
        }
      ]
    };
  }

  // Analytics: Charts
  if (endpoint === '/analytics/charts') {
    return {
      riskDistribution: [
        { name: 'Low Risk', value: 683, color: '#10b981' },
        { name: 'Medium Risk', value: 386, color: '#f59e0b' },
        { name: 'High Risk', value: 184, color: '#ef4444' }
      ],
      attendanceVsScore: [
        { attendance: '50-60%', avgScore: 54, count: 92 },
        { attendance: '60-70%', avgScore: 64, count: 210 },
        { attendance: '70-80%', avgScore: 76, count: 420 },
        { attendance: '80-90%', avgScore: 84, count: 370 },
        { attendance: '90-100%', avgScore: 92, count: 161 }
      ]
    };
  }

  // Students: List
  if (endpoint.startsWith('/students') && !endpoint.includes('/students-list')) {
    // If specific ID: /students/SC-2023-0142
    const pathParts = endpoint.split('?')[0].split('/');
    if (pathParts.length > 2 && pathParts[2]) {
      const targetId = pathParts[2];
      const match = sampleStudents.find(s => s._id === targetId || s.studentId === targetId) || sampleStudents[0];
      return match;
    }

    // Query params parsing
    const queryString = endpoint.includes('?') ? endpoint.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    const search = (params.get('search') || '').toLowerCase();
    const risk = params.get('riskLevel') || params.get('risk') || '';
    const dept = params.get('department') || '';

    let filtered = [...sampleStudents];
    if (search) {
      filtered = filtered.filter(s => 
        (s.name && s.name.toLowerCase().includes(search)) ||
        (s.studentId && s.studentId.toLowerCase().includes(search)) ||
        (s.department && s.department.toLowerCase().includes(search))
      );
    }
    if (risk) {
      filtered = filtered.filter(s => s.riskLevel === risk.toUpperCase());
    }
    if (dept) {
      filtered = filtered.filter(s => s.department === dept);
    }

    return {
      students: filtered,
      total: filtered.length,
      page: 1,
      totalPages: 1
    };
  }

  // Interventions: List & CRUD
  if (endpoint.startsWith('/interventions')) {
    const list = getStoredInterventions();
    if (method === 'POST') {
      const newInt = {
        _id: 'int-' + Date.now(),
        ...body,
        createdAt: new Date().toISOString()
      };
      list.unshift(newInt);
      saveStoredInterventions(list);
      return newInt;
    }
    if (method === 'PATCH') {
      const id = endpoint.split('/')[2];
      const idx = list.findIndex(i => i._id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...body };
        saveStoredInterventions(list);
        return list[idx];
      }
    }
    return list;
  }

  // AI Copilot & Assistant
  if (endpoint === '/ai/ask' || endpoint === '/ai/student-advisor') {
    const q = (body.query || '').toLowerCase();
    let reply = `Based on institutional campus analytics, students with current academic risk profiles benefit most from structured remedial tutoring and consistent attendance monitoring.`;
    
    if (q.includes('high risk') || q.includes('dropout')) {
      reply = `Currently, there are 184 students identified in the High Risk category across departments. The highest concentration is in 3rd Semester CSE and ECE, primarily driven by active backlogs and attendance below 65%. Automated intervention plans have been drafted for counselor review.`;
    } else if (q.includes('placement') || q.includes('job') || q.includes('interview')) {
      reply = `Placement readiness is currently at 68%. Students with mock interview scores above 65 and verified coding certifications have an estimated placement conversion probability of 88%.`;
    } else if (q.includes('attendance')) {
      reply = `Campus average attendance is currently 81.4%. Our predictive model flags any downward trend steeper than -5% over a 14-day rolling window as an early indicator of course completion risk.`;
    }

    return {
      answer: reply,
      text: reply,
      type: 'insight'
    };
  }

  // Simulation: Score
  if (endpoint === '/simulation/score') {
    const cgpa = Number(body.cgpa || 7.0);
    const attendance = Number(body.attendance || 75);
    const backlogs = Number(body.backlogs || 0);
    const marks = Number(body.averageMarks || 65);

    const score = Math.min(100, Math.max(10, Math.round(
      (cgpa * 6.5) + (attendance * 0.25) + (marks * 0.25) - (backlogs * 9)
    )));
    const risk = score < 60 ? 'HIGH' : score < 75 ? 'MEDIUM' : 'LOW';

    return {
      scenarioScore: score,
      scenarioRisk: risk,
      factors: [
        { label: 'Academic Standing', impact: cgpa >= 7.5 ? 'Positive' : 'Needs Focus' },
        { label: 'Attendance Stability', impact: attendance >= 75 ? 'Healthy' : 'Critical' },
        { label: 'Backlog Load', impact: backlogs === 0 ? 'Clear' : `${backlogs} Active Backlogs` }
      ]
    };
  }

  // Fallback default
  return { success: true, message: 'Fallback mock processed successfully.' };
}
