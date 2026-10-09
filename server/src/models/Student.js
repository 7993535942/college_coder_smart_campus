import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  email: { type: String, index: true, lowercase: true, trim: true },
  department: { type: String, required: true, index: true },
  year: { type: String, required: true, index: true },
  semester: { type: Number, required: true },
  section: { type: String, default: 'A' },
  academic: {
    cgpa: Number,
    averageMarks: Number,
    backlogs: { type: Number, default: 0 },
    entryScore: Number,
    previousScore: Number,
    tutoringSessions: Number,
    semesterHistory: [{ slot: String, unitsEnrolled: Number, unitsPassed: Number, avgMarks: Number }],
    componentScore: Number
  },
  attendance: {
    percentage: Number,
    trend: Number,
    componentScore: Number
  },
  lms: {
    loginFrequency: Number,
    assignmentCompletion: Number,
    courseActivityLevel: String,
    learningHours: Number,
    activityTrend: Number,
    componentScore: Number
  },
  engagement: {
    eventsAttended: Number,
    clubsCount: Number,
    hackathonsParticipated: Number,
    certificationsCount: Number,
    extracurricularScore: Number,
    componentScore: Number
  },
  placement: {
    aptitude: Number,
    coding: Number,
    mockInterview: Number,
    trainingPct: Number,
    status: String,
    internshipExperience: Number,
    componentScore: Number
  },
  skills: {
    technical: Number,
    soft: Number,
    assessment: Number,
    projectsCompleted: Number,
    componentScore: Number
  },
  feedback: {
    studentSatisfaction: Number,
    facultyFeedbackScore: Number,
    sentiment: String
  },
  successScore: { type: Number, index: true },
  riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], index: true },
  ruleRiskLevel: String,
  riskSource: { type: String, default: 'rules' },
  riskFactors: [String],
  segment: { type: String, index: true },
  scoreContributions: {
    academic: Number,
    attendance: Number,
    lms: Number,
    placement: Number,
    skills: Number,
    engagement: Number
  },
  ml: {
    status: { type: String, default: 'ok' },
    source: { type: String, default: 'snapshot' },
    modelVersions: { academic: String, placement: String, exam: String },
    scoredAt: String,
    coverage: { type: Number, default: 1.0 },
    academicRisk: {
      probability: Number,
      band: String,
      topFactors: [{ feature: String, value: String, benchmark: String, impact: String, weight: Number }]
    },
    placement: {
      probability: Number,
      band: String,
      topFactors: [{ feature: String, value: String, impact: String }]
    },
    agreement: { type: String, index: true }
  }
}, { timestamps: true });

export const Student = mongoose.model('Student', StudentSchema);
