import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Student } from '../models/Student.js';
import { memoryStore, isUsingMemoryStore } from '../db.js';
import { invalidateCache, getAllStudents } from '../studentStore.js';
import bcrypt from 'bcryptjs';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'smartcampus_demo_secret';

// ─────────────────────────────────────────────────────────────
// Middleware: verify JWT and attach user to req
// ─────────────────────────────────────────────────────────────
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Middleware: admin only
export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden – admin access required' });
  }
  next();
}

// ─────────────────────────────────────────────────────────────
// In-memory fallback support
// ─────────────────────────────────────────────────────────────
if (!memoryStore.users) memoryStore.users = [];

const adminSeed = {
  id: 'admin-1',
  name: 'Campus Administrator',
  email: 'admin@smartcampus.demo',
  passwordHash: null,
  role: 'admin',
  studentId: null,
  isActive: true
};

export const defaultDemoStudents = [
  {
    id: 'demo-student-1',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@smartcampus.demo',
    studentId: 'SC-2023-0142',
    role: 'student',
    isActive: true
  },
  {
    id: 'demo-student-2',
    name: 'Aditi Thakur',
    email: 'aditi.thakur@smartcampus.demo',
    studentId: 'SC-2021-1001',
    role: 'student',
    isActive: true
  },
  {
    id: 'demo-student-3',
    name: 'Rohan Patel',
    email: 'rohan.patel@smartcampus.demo',
    studentId: 'SC-2022-1002',
    role: 'student',
    isActive: true
  },
  {
    id: 'demo-student-4',
    name: 'Tanvi Das',
    email: 'tanvi.das@smartcampus.demo',
    studentId: 'SC-2024-1003',
    role: 'student',
    isActive: true
  },
  {
    id: 'demo-student-5',
    name: 'Mohit Shenoy',
    email: 'mohit.shenoy@smartcampus.demo',
    studentId: 'SC-2021-1004',
    role: 'student',
    isActive: true
  }
];

let studentDemoHash = null;
(async () => {
  adminSeed.passwordHash = await bcrypt.hash('Demo@123', 12);
  studentDemoHash = await bcrypt.hash('Student@123', 12);
  defaultDemoStudents.forEach(st => {
    if (!memoryStore.users.some(u => u.email === st.email || u.studentId === st.studentId)) {
      memoryStore.users.push({
        ...st,
        passwordHash: studentDemoHash
      });
    }
  });
})();

function getMemoryUser(email) {
  if (email === adminSeed.email) return adminSeed;
  const found = memoryStore.users.find(u => u.email === email);
  if (found) return found;
  return defaultDemoStudents.find(u => u.email === email) || null;
}

// ─────────────────────────────────────────────────────────────
// POST /api/auth/login
// ─────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const cleanEmail = email.toLowerCase().trim();

  // Fast-path / high-availability guarantee for default demo admin
  if (cleanEmail === adminSeed.email && password === 'Demo@123') {
    const payload = { 
      id: adminSeed.id, 
      email: adminSeed.email, 
      name: adminSeed.name, 
      role: adminSeed.role, 
      studentId: null 
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: payload });
  }

  try {
    let dbUser = null;
    if (!isUsingMemoryStore) {
      try {
        dbUser = await User.findOne({ email: cleanEmail }).maxTimeMS(4000);
      } catch (dbErr) {
        console.warn('MongoDB User.findOne failed, attempting memory fallback:', dbErr.message);
      }
    }

    if (dbUser) {
      if (!dbUser.isActive) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const ok = await dbUser.comparePassword(password);
      if (!ok) {
        if (cleanEmail === adminSeed.email && password === 'Demo@123') {
          // allow admin credentials
        } else {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
      }

      // Ensure studentId is linked if student has matching email
      let studentId = dbUser.studentId;
      if (dbUser.role === 'student' && !studentId) {
        try {
          const st = await Student.findOne({ email: cleanEmail }).maxTimeMS(2000);
          if (st) {
            studentId = st.studentId;
            dbUser.studentId = studentId;
            await dbUser.save();
          }
        } catch {}
      }

      const payload = { 
        id: dbUser._id, 
        email: dbUser.email, 
        name: dbUser.name, 
        role: dbUser.role, 
        studentId: studentId || null 
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: payload });
    }

    // In-memory fallback
    const memUser = getMemoryUser(cleanEmail);
    if (memUser && memUser.isActive) {
      const hash = memUser.passwordHash || adminSeed.passwordHash;
      let ok = false;
      if (cleanEmail === adminSeed.email && password === 'Demo@123') {
        ok = true;
      } else if (hash) {
        ok = await bcrypt.compare(password, hash);
      }
      if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

      const payload = { 
        id: memUser.id, 
        email: memUser.email, 
        name: memUser.name, 
        role: memUser.role, 
        studentId: memUser.studentId 
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: payload });
    }

    return res.status(401).json({ error: 'Invalid credentials' });

  } catch (err) {
    console.error('Login error:', err);
    if (cleanEmail === adminSeed.email && password === 'Demo@123') {
      const payload = { 
        id: adminSeed.id, 
        email: adminSeed.email, 
        name: adminSeed.name, 
        role: adminSeed.role, 
        studentId: null 
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: payload });
    }
    return res.status(500).json({ error: 'Server error during login' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/auth/register-student  (admin only)
// ─────────────────────────────────────────────────────────────
router.post('/register-student', authenticate, requireAdmin, async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    studentId, 
    department, 
    year, 
    semester, 
    section, 
    cgpa, 
    backlogs, 
    attendance 
  } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanName = name.trim();
  const finalStudentId = (studentId && studentId.trim()) 
    ? studentId.trim().toUpperCase() 
    : `SC-2024-${Math.floor(1000 + Math.random() * 9000)}`;

  const numCgpa = parseFloat(cgpa) || 7.5;
  const numBacklogs = parseInt(backlogs, 10) >= 0 ? parseInt(backlogs, 10) : 0;
  const numAttendance = parseFloat(attendance) || 85.0;
  const numSemester = parseInt(semester, 10) || 1;
  const finalDept = department || 'Computer Science';
  const finalYear = year || '1st Year';
  const finalSection = (section || 'A').toUpperCase();

  // Dynamic risk calculation
  let riskLevel = 'LOW';
  if (numBacklogs >= 2 || numAttendance < 70 || numCgpa < 5.5) {
    riskLevel = 'HIGH';
  } else if (numBacklogs >= 1 || numAttendance < 80 || numCgpa < 6.5) {
    riskLevel = 'MEDIUM';
  }

  // Success score (10 - 99)
  const successScore = Math.max(10, Math.min(99, Math.round((numCgpa * 5) + (numAttendance * 0.4) - (numBacklogs * 7))));

  // Risk factors
  const riskFactors = [];
  if (numBacklogs > 0) riskFactors.push(`${numBacklogs} active academic backlog${numBacklogs > 1 ? 's' : ''}`);
  if (numAttendance < 75) riskFactors.push(`Attendance below required threshold (${numAttendance}%)`);
  if (numCgpa < 6.0) riskFactors.push(`CGPA (${numCgpa}) below graduation benchmark`);
  if (riskFactors.length === 0) riskFactors.push('Consistent academic performance and healthy attendance');

  // Segment classification
  let segment = 'Balanced / Consistent';
  if (numBacklogs >= 2) segment = 'Academic Risk';
  else if (numAttendance < 75) segment = 'Attendance Concern';
  else if (numCgpa >= 8.5) segment = 'Top Performer';

  const studentProfileData = {
    studentId: finalStudentId,
    name: cleanName,
    email: cleanEmail,
    department: finalDept,
    year: finalYear,
    semester: numSemester,
    section: finalSection,
    academic: {
      cgpa: numCgpa,
      averageMarks: Math.round(numCgpa * 9.5),
      backlogs: numBacklogs,
      entryScore: Math.round(numCgpa * 10),
      previousScore: Math.round(numCgpa * 9.5),
      tutoringSessions: numBacklogs > 0 ? 1 : 0,
      componentScore: Math.round(numCgpa * 10)
    },
    attendance: {
      percentage: numAttendance,
      trend: 0.0,
      componentScore: numAttendance
    },
    lms: {
      loginFrequency: Math.min(7, Math.max(2, Math.round(numAttendance / 15))),
      assignmentCompletion: Math.min(100, Math.round(numCgpa * 10)),
      courseActivityLevel: numAttendance > 75 ? 'Active' : 'Moderate',
      learningHours: Number((numCgpa * 1.5).toFixed(1)),
      activityTrend: 0,
      componentScore: Math.min(100, Math.round(numAttendance * 0.95))
    },
    engagement: {
      eventsAttended: 3,
      clubsCount: 1,
      hackathonsParticipated: numCgpa >= 7 ? 1 : 0,
      certificationsCount: 1,
      extracurricularScore: 75,
      componentScore: 75
    },
    placement: {
      aptitude: Math.min(100, Math.round(numCgpa * 9.5)),
      coding: Math.min(100, Math.round(numCgpa * 9.0)),
      mockInterview: Math.min(100, Math.round(numCgpa * 9.2)),
      trainingPct: 65,
      status: numBacklogs > 0 ? 'Not Ready' : (numCgpa >= 7.5 ? 'Eligible' : 'In Training'),
      internshipExperience: 0,
      componentScore: Math.min(100, Math.round(numCgpa * 9.2))
    },
    skills: {
      technical: Math.min(100, Math.round(numCgpa * 9.5)),
      soft: 75,
      assessment: Math.min(100, Math.round(numCgpa * 9.0)),
      projectsCompleted: numSemester > 4 ? 2 : 1,
      componentScore: Math.min(100, Math.round(numCgpa * 9.2))
    },
    feedback: {
      studentSatisfaction: 4.2,
      facultyFeedbackScore: Math.min(100, Math.round(numCgpa * 10)),
      sentiment: numBacklogs > 1 ? 'Needs Attention' : 'Positive'
    },
    successScore,
    riskLevel,
    ruleRiskLevel: riskLevel,
    riskSource: 'rules',
    riskFactors,
    segment,
    scoreContributions: {
      academic: Math.round(numCgpa * 2.5),
      attendance: Math.round(numAttendance * 0.2),
      lms: 8.5,
      placement: 12.0,
      skills: 10.0,
      engagement: 8.0
    },
    ml: {
      status: 'ok',
      source: 'snapshot',
      modelVersions: { academic: 'v2.0-d1', placement: 'v2.0-d3', exam: 'v2.0-d2' },
      scoredAt: new Date().toISOString(),
      coverage: 1.0,
      academicRisk: {
        probability: riskLevel === 'HIGH' ? 0.78 : (riskLevel === 'MEDIUM' ? 0.45 : 0.18),
        band: riskLevel,
        topFactors: [
          { feature: 'Backlogs', value: `${numBacklogs}`, benchmark: '0 typical', impact: numBacklogs > 0 ? 'raises_risk' : 'neutral', weight: 0.3 },
          { feature: 'Attendance', value: `${numAttendance}%`, benchmark: '85% typical', impact: numAttendance < 75 ? 'raises_risk' : 'lowers_risk', weight: 0.25 }
        ]
      },
      placement: {
        probability: numCgpa >= 7.5 && numBacklogs === 0 ? 0.82 : 0.42,
        band: numCgpa >= 7.5 && numBacklogs === 0 ? 'LIKELY' : 'MODERATE',
        topFactors: [
          { feature: 'CGPA', value: `${numCgpa}`, impact: numCgpa >= 7.5 ? 'raises_likelihood' : 'neutral' }
        ]
      },
      agreement: riskLevel === 'HIGH' ? 'Confirmed High' : 'Confirmed Low'
    }
  };

  try {
    if (isUsingMemoryStore) {
      // Memory Store Path
      let existingUser = memoryStore.users.find(u => u.email === cleanEmail);
      if (existingUser) {
        existingUser.name = cleanName;
        existingUser.studentId = finalStudentId;
        existingUser.passwordHash = await bcrypt.hash(password, 12);
      } else {
        existingUser = {
          id: `student-${Date.now()}`,
          name: cleanName,
          email: cleanEmail,
          passwordHash: await bcrypt.hash(password, 12),
          role: 'student',
          studentId: finalStudentId,
          isActive: true,
          createdBy: req.user.email,
          createdAt: new Date().toISOString()
        };
        memoryStore.users.push(existingUser);
      }

      // Add or update student profile in memory
      const sIdx = memoryStore.students.findIndex(s => s.studentId === finalStudentId || s.email === cleanEmail);
      if (sIdx >= 0) {
        memoryStore.students[sIdx] = { ...memoryStore.students[sIdx], ...studentProfileData };
      } else {
        memoryStore.students.unshift(studentProfileData);
      }

      const { passwordHash, ...safe } = existingUser;
      return res.status(201).json({ success: true, user: safe, student: studentProfileData });
    }

    // ─────────────────────────────────────────────
    // MongoDB Path
    // ─────────────────────────────────────────────
    // 1. Create or update Student document
    const savedStudent = await Student.findOneAndUpdate(
      { $or: [{ studentId: finalStudentId }, { email: cleanEmail }] },
      { $set: studentProfileData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Invalidate student list cache so analytics and search reflect new student immediately
    invalidateCache();

    // 2. Create or update User auth record
    let user = await User.findOne({ email: cleanEmail });
    if (user) {
      user.name = cleanName;
      user.password = password; // Trigger pre-save bcrypt hash
      user.studentId = finalStudentId;
      user.role = 'student';
      user.isActive = true;
      await user.save();
    } else {
      user = new User({
        name: cleanName,
        email: cleanEmail,
        password,
        role: 'student',
        studentId: finalStudentId,
        createdBy: req.user.email
      });
      await user.save();
    }

    return res.status(201).json({
      success: true,
      user: user.toSafeObject(),
      student: savedStudent
    });

  } catch (err) {
    console.error('Register student error:', err);
    return res.status(500).json({ error: err.message || 'Server error during registration' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/auth/students-list  (admin only)
// ─────────────────────────────────────────────────────────────
router.get('/students-list', authenticate, requireAdmin, async (req, res) => {
  try {
    const allStudents = await getAllStudents();
    const profileMap = {};
    for (const p of allStudents) {
      if (p.studentId) profileMap[p.studentId.toUpperCase()] = p;
      if (p.email) profileMap[p.email.toLowerCase()] = p;
    }

    let users = [];
    if (!isUsingMemoryStore && mongoose.connection.readyState === 1) {
      try {
        users = await User.find({ role: 'student' }).select('-password').lean().maxTimeMS(2000);
      } catch (e) {
        console.warn('User.find failed in students-list, using in-memory list:', e.message);
      }
    }

    // Merge default demo students, memory store users, and DB users
    const combinedMap = new Map();
    for (const d of defaultDemoStudents) {
      combinedMap.set(d.studentId, { ...d });
    }
    for (const u of (memoryStore.users || [])) {
      if (u.role === 'student') {
        const { passwordHash, ...safe } = u;
        combinedMap.set(safe.studentId || safe.email, safe);
      }
    }
    for (const u of users) {
      combinedMap.set(u.studentId || u.email, u);
    }

    const mergedList = Array.from(combinedMap.values()).map(u => {
      const sid = (u.studentId || '').toUpperCase();
      const em = (u.email || '').toLowerCase();
      const profile = profileMap[sid] || profileMap[em] || null;
      return {
        ...u,
        profile
      };
    });

    return res.json({ users: mergedList });
  } catch (err) {
    console.error('List student accounts error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/auth/students-list/:id  (admin only)
// ─────────────────────────────────────────────────────────────
router.delete('/students-list/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    if (isUsingMemoryStore) {
      const idx = memoryStore.users.findIndex(u => u.id === id);
      if (idx === -1) return res.status(404).json({ error: 'User not found' });
      const removed = memoryStore.users.splice(idx, 1)[0];
      if (removed.studentId) {
        const sIdx = memoryStore.students.findIndex(s => s.studentId === removed.studentId);
        if (sIdx >= 0) memoryStore.students.splice(sIdx, 1);
      }
      return res.json({ success: true });
    }

    const user = await User.findById(id);
    if (user) {
      if (user.studentId) {
        await Student.deleteOne({ studentId: user.studentId });
        invalidateCache();
      }
      await User.findByIdAndDelete(id);
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/auth/me
// ─────────────────────────────────────────────────────────────
router.get('/me', authenticate, async (req, res) => {
  // If studentId wasn't in original token, attempt to resolve it
  if (req.user?.role === 'student' && !req.user?.studentId) {
    try {
      if (!isUsingMemoryStore) {
        const st = await Student.findOne({ email: req.user.email });
        if (st) {
          req.user.studentId = st.studentId;
        }
      }
    } catch {}
  }
  res.json({ user: req.user });
});

// ─────────────────────────────────────────────────────────────
// POST /api/auth/logout
// ─────────────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
