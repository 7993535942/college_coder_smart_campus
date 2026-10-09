export const sampleStudents = [
  {
    "studentId": "SC-2023-0142",
    "name": "Rahul Kumar",
    "department": "CSE",
    "year": "3rd Year",
    "semester": 6,
    "section": "A",
    "academic": {
      "cgpa": 6.8,
      "averageMarks": 64,
      "backlogs": 3,
      "entryScore": 62,
      "previousScore": 65,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 66
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 3,
          "avgMarks": 58
        }
      ],
      "componentScore": 24
    },
    "attendance": {
      "percentage": 58,
      "trend": -5.4,
      "componentScore": 58
    },
    "lms": {
      "loginFrequency": 4,
      "assignmentCompletion": 52,
      "courseActivityLevel": "Low",
      "learningHours": 4.5,
      "activityTrend": -42,
      "componentScore": 25.4
    },
    "engagement": {
      "eventsAttended": 3,
      "clubsCount": 2,
      "hackathonsParticipated": 1,
      "certificationsCount": 1,
      "extracurricularScore": 70,
      "componentScore": 70
    },
    "placement": {
      "aptitude": 62,
      "coding": 48,
      "mockInterview": 50,
      "trainingPct": 45,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 53.4
    },
    "skills": {
      "technical": 50,
      "soft": 58,
      "assessment": 52,
      "projectsCompleted": 1,
      "componentScore": 47.8
    },
    "feedback": {
      "studentSatisfaction": 3.2,
      "facultyFeedbackScore": 58,
      "sentiment": "Needs Attention"
    },
    "successScore": 42,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (58.0%)",
      "High backlog burden (3 active backlogs)",
      "Technical coding assessment below benchmark (48.0/100)",
      "Steep decline in LMS portal engagement (-42.0%)",
      "Model confirms elevated academic risk (probability 0.74)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 6,
      "attendance": 8.7,
      "lms": 3.8,
      "placement": 10.7,
      "skills": 7.2,
      "engagement": 7
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.74,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "3",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.29
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-8.0%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.12
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "50%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.1
          }
        ]
      },
      "placement": {
        "probability": 0.32,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "62.0/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "48.0/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2021-1001",
    "name": "Aditi Thakur",
    "department": "ECE",
    "year": "4th Year",
    "semester": 7,
    "section": "C",
    "academic": {
      "cgpa": 6.63,
      "averageMarks": 73.5,
      "backlogs": 2,
      "entryScore": 68.8,
      "previousScore": 59.7,
      "tutoringSessions": 0,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 76.9
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 70
        }
      ],
      "componentScore": 43.7
    },
    "attendance": {
      "percentage": 60.5,
      "trend": -19.6,
      "componentScore": 60.5
    },
    "lms": {
      "loginFrequency": 3,
      "assignmentCompletion": 49.7,
      "courseActivityLevel": "Low",
      "learningHours": 5.4,
      "activityTrend": -42.6,
      "componentScore": 26.8
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 40.5,
      "componentScore": 40.5
    },
    "placement": {
      "aptitude": 63.8,
      "coding": 61.8,
      "mockInterview": 45.1,
      "trainingPct": 56.1,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 58.3
    },
    "skills": {
      "technical": 61.2,
      "soft": 53.4,
      "assessment": 48.8,
      "projectsCompleted": 2,
      "componentScore": 56.2
    },
    "feedback": {
      "studentSatisfaction": 2.3,
      "facultyFeedbackScore": 54.5,
      "sentiment": "Needs Attention"
    },
    "successScore": 48,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Steep decline in LMS portal engagement (-42.6%)",
      "Model confirms elevated academic risk (probability 0.84)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 10.9,
      "attendance": 9.1,
      "lms": 4,
      "placement": 11.7,
      "skills": 8.4,
      "engagement": 4
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.84,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "2",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.17
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-6.9%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.1
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "66%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.32,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "63.8/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "61.8/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2022-1002",
    "name": "Rohan Patel",
    "department": "MECH",
    "year": "3rd Year",
    "semester": 5,
    "section": "A",
    "academic": {
      "cgpa": 7.73,
      "averageMarks": 81.2,
      "backlogs": 0,
      "entryScore": 65.7,
      "previousScore": 93.8,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 79.8
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 82.6
        }
      ],
      "componentScore": 84.8
    },
    "attendance": {
      "percentage": 84.1,
      "trend": -1,
      "componentScore": 84.1
    },
    "lms": {
      "loginFrequency": 14,
      "assignmentCompletion": 81.4,
      "courseActivityLevel": "Medium",
      "learningHours": 10.2,
      "activityTrend": -0.7,
      "componentScore": 72.3
    },
    "engagement": {
      "eventsAttended": 3,
      "clubsCount": 2,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 65.7,
      "componentScore": 65.7
    },
    "placement": {
      "aptitude": 63.9,
      "coding": 65.9,
      "mockInterview": 64,
      "trainingPct": 78.5,
      "status": "In Progress",
      "internshipExperience": 1,
      "componentScore": 74.7
    },
    "skills": {
      "technical": 64,
      "soft": 67.2,
      "assessment": 73.8,
      "projectsCompleted": 1,
      "componentScore": 57.3
    },
    "feedback": {
      "studentSatisfaction": 3.6,
      "facultyFeedbackScore": 65.5,
      "sentiment": "Neutral"
    },
    "successScore": 75,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 21.2,
      "attendance": 12.6,
      "lms": 10.8,
      "placement": 14.9,
      "skills": 8.6,
      "engagement": 6.6
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.19,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.8%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.72,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "63.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "65.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "Yes",
            "impact": "raises_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1003",
    "name": "Tanvi Das",
    "department": "CSE",
    "year": "1st Year",
    "semester": 2,
    "section": "A",
    "academic": {
      "cgpa": 5.99,
      "averageMarks": 54.5,
      "backlogs": 6,
      "entryScore": 85,
      "previousScore": 70.9,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 61
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 48
        }
      ],
      "componentScore": 0
    },
    "attendance": {
      "percentage": 50,
      "trend": -12.1,
      "componentScore": 50
    },
    "lms": {
      "loginFrequency": 2,
      "assignmentCompletion": 46.7,
      "courseActivityLevel": "Low",
      "learningHours": 2.4,
      "activityTrend": -53.1,
      "componentScore": 12.3
    },
    "engagement": {
      "eventsAttended": 0,
      "clubsCount": 0,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 43.8,
      "componentScore": 43.8
    },
    "placement": {
      "aptitude": 51.6,
      "coding": 37.3,
      "mockInterview": 33.3,
      "trainingPct": 31.4,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 41.3
    },
    "skills": {
      "technical": 53.9,
      "soft": 45.6,
      "assessment": 51.4,
      "projectsCompleted": 0,
      "componentScore": 40.2
    },
    "feedback": {
      "studentSatisfaction": 2.8,
      "facultyFeedbackScore": 37.6,
      "sentiment": "Needs Attention"
    },
    "successScore": 28,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (50.0%)",
      "High backlog burden (6 active backlogs)",
      "Technical coding assessment below benchmark (37.3/100)",
      "Steep decline in LMS portal engagement (-53.1%)",
      "Sub-threshold placement readiness (41.3/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 0,
      "attendance": 7.5,
      "lms": 1.8,
      "placement": 8.3,
      "skills": 6,
      "engagement": 4.4
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "6",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.65
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-13.0%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.2
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "66%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "51.6/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "37.3/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2021-1004",
    "name": "Mohit Shenoy",
    "department": "CSE",
    "year": "4th Year",
    "semester": 8,
    "section": "C",
    "academic": {
      "cgpa": 6.81,
      "averageMarks": 68,
      "backlogs": 0,
      "entryScore": 79.3,
      "previousScore": 93.3,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 63.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 72.4
        }
      ],
      "componentScore": 77.6
    },
    "attendance": {
      "percentage": 76.5,
      "trend": 2.2,
      "componentScore": 76.5
    },
    "lms": {
      "loginFrequency": 18,
      "assignmentCompletion": 83.6,
      "courseActivityLevel": "Medium",
      "learningHours": 14.8,
      "activityTrend": 16.2,
      "componentScore": 88
    },
    "engagement": {
      "eventsAttended": 6,
      "clubsCount": 3,
      "hackathonsParticipated": 4,
      "certificationsCount": 3,
      "extracurricularScore": 80.9,
      "componentScore": 80.9
    },
    "placement": {
      "aptitude": 82,
      "coding": 93.2,
      "mockInterview": 73.4,
      "trainingPct": 80.7,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 84.3
    },
    "skills": {
      "technical": 90.6,
      "soft": 86.3,
      "assessment": 78.1,
      "projectsCompleted": 6,
      "componentScore": 91
    },
    "feedback": {
      "studentSatisfaction": 4.7,
      "facultyFeedbackScore": 74.6,
      "sentiment": "Positive"
    },
    "successScore": 83,
    "riskLevel": "LOW",
    "ruleRiskLevel": "LOW",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 19.4,
      "attendance": 11.5,
      "lms": 13.2,
      "placement": 16.9,
      "skills": 13.6,
      "engagement": 8.1
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.26,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+8.9%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.13
          },
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          }
        ]
      },
      "placement": {
        "probability": 0.94,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "82.0/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "93.2/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1005",
    "name": "Riya Agarwal",
    "department": "IT",
    "year": "3rd Year",
    "semester": 6,
    "section": "A",
    "academic": {
      "cgpa": 7.11,
      "averageMarks": 68.5,
      "backlogs": 0,
      "entryScore": 57.2,
      "previousScore": 82.6,
      "tutoringSessions": null,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 68.3
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 68.7
        }
      ],
      "componentScore": 77.5
    },
    "attendance": {
      "percentage": 80.2,
      "trend": -3.9,
      "componentScore": 80.2
    },
    "lms": {
      "loginFrequency": 7,
      "assignmentCompletion": 74.1,
      "courseActivityLevel": "Medium",
      "learningHours": 13.4,
      "activityTrend": 11.5,
      "componentScore": 78.9
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 1,
      "certificationsCount": 2,
      "extracurricularScore": 59.3,
      "componentScore": 59.3
    },
    "placement": {
      "aptitude": 62.1,
      "coding": 73.9,
      "mockInterview": 68.6,
      "trainingPct": 69.5,
      "status": "In Progress",
      "internshipExperience": 1,
      "componentScore": 78.4
    },
    "skills": {
      "technical": 74.5,
      "soft": 65,
      "assessment": 61.7,
      "projectsCompleted": 2,
      "componentScore": 66.3
    },
    "feedback": {
      "studentSatisfaction": 3.8,
      "facultyFeedbackScore": 72,
      "sentiment": "Positive"
    },
    "successScore": 75,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 19.4,
      "attendance": 12,
      "lms": 11.8,
      "placement": 15.7,
      "skills": 9.9,
      "engagement": 5.9
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.33,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+0.4%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.01
          }
        ]
      },
      "placement": {
        "probability": 0.74,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "62.1/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "73.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "Yes",
            "impact": "raises_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2021-1006",
    "name": "Chirag Joshi",
    "department": "CSE",
    "year": "4th Year",
    "semester": 7,
    "section": "B",
    "academic": {
      "cgpa": 7.06,
      "averageMarks": 72.7,
      "backlogs": 0,
      "entryScore": 83.7,
      "previousScore": 69.3,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 71
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 74.4
        }
      ],
      "componentScore": 79.3
    },
    "attendance": {
      "percentage": 78.2,
      "trend": 2.9,
      "componentScore": 78.2
    },
    "lms": {
      "loginFrequency": 15,
      "assignmentCompletion": 71.8,
      "courseActivityLevel": "Medium",
      "learningHours": 11.9,
      "activityTrend": 3.5,
      "componentScore": 73.1
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 63.1,
      "componentScore": 63.1
    },
    "placement": {
      "aptitude": 67.7,
      "coding": 72.7,
      "mockInterview": 73.5,
      "trainingPct": 63.3,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 71.2
    },
    "skills": {
      "technical": 76.7,
      "soft": 74.6,
      "assessment": 65.1,
      "projectsCompleted": 3,
      "componentScore": 75.6
    },
    "feedback": {
      "studentSatisfaction": 4.4,
      "facultyFeedbackScore": 81.9,
      "sentiment": "Positive"
    },
    "successScore": 74,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 19.8,
      "attendance": 11.7,
      "lms": 11,
      "placement": 14.2,
      "skills": 11.3,
      "engagement": 6.3
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.27,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+3.4%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.7,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "67.7/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "72.7/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1007",
    "name": "Ananya Thakur",
    "department": "CIVIL",
    "year": "1st Year",
    "semester": 2,
    "section": "C",
    "academic": {
      "cgpa": 8.09,
      "averageMarks": 71.8,
      "backlogs": 1,
      "entryScore": 92.4,
      "previousScore": null,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 69.9
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 73.6
        }
      ],
      "componentScore": 67
    },
    "attendance": {
      "percentage": 73.1,
      "trend": -2.5,
      "componentScore": 73.1
    },
    "lms": {
      "loginFrequency": 8,
      "assignmentCompletion": 82.2,
      "courseActivityLevel": "Medium",
      "learningHours": 9.4,
      "activityTrend": -7,
      "componentScore": 68
    },
    "engagement": {
      "eventsAttended": 6,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 63.4,
      "componentScore": 63.4
    },
    "placement": {
      "aptitude": 69.3,
      "coding": 66.9,
      "mockInterview": 74,
      "trainingPct": 64.1,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 69.5
    },
    "skills": {
      "technical": 72.9,
      "soft": 65.8,
      "assessment": 67.1,
      "projectsCompleted": 3,
      "componentScore": 70.8
    },
    "feedback": {
      "studentSatisfaction": 4,
      "facultyFeedbackScore": 72.8,
      "sentiment": "Positive"
    },
    "successScore": 69,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 16.7,
      "attendance": 11,
      "lms": 10.2,
      "placement": 13.9,
      "skills": 10.6,
      "engagement": 6.3
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.51,
        "band": "MEDIUM",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+3.7%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Active Backlog Count",
            "value": "1",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.05
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "83%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.74,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "69.3/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "66.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1008",
    "name": "Arjun Mishra",
    "department": "CSE",
    "year": "1st Year",
    "semester": 1,
    "section": "A",
    "academic": {
      "cgpa": 8.03,
      "averageMarks": 71.2,
      "backlogs": 0,
      "entryScore": 58.7,
      "previousScore": 68.5,
      "tutoringSessions": null,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 71.4
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 70.9
        }
      ],
      "componentScore": 81.9
    },
    "attendance": {
      "percentage": 79.6,
      "trend": -1.6,
      "componentScore": 79.6
    },
    "lms": {
      "loginFrequency": 15,
      "assignmentCompletion": 70.1,
      "courseActivityLevel": "Medium",
      "learningHours": 12.9,
      "activityTrend": -2.5,
      "componentScore": 74.5
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 1,
      "certificationsCount": 1,
      "extracurricularScore": 72.8,
      "componentScore": 72.8
    },
    "placement": {
      "aptitude": 71.9,
      "coding": 60.6,
      "mockInterview": 64.2,
      "trainingPct": 64.2,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 65.5
    },
    "skills": {
      "technical": 66.2,
      "soft": 73,
      "assessment": 75.4,
      "projectsCompleted": 3,
      "componentScore": 70.3
    },
    "feedback": {
      "studentSatisfaction": 3.9,
      "facultyFeedbackScore": 80.4,
      "sentiment": "Positive"
    },
    "successScore": 75,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.5,
      "attendance": 11.9,
      "lms": 11.2,
      "placement": 13.1,
      "skills": 10.6,
      "engagement": 7.3
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.31,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-0.5%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.01
          }
        ]
      },
      "placement": {
        "probability": 0.73,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "71.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "60.6/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2023-1009",
    "name": "Nisha Rao",
    "department": "ECE",
    "year": "2nd Year",
    "semester": 4,
    "section": "A",
    "academic": {
      "cgpa": 6.91,
      "averageMarks": 75.8,
      "backlogs": 0,
      "entryScore": 56,
      "previousScore": 70.6,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 74.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 77.2
        }
      ],
      "componentScore": 79.7
    },
    "attendance": {
      "percentage": 80.2,
      "trend": -2.8,
      "componentScore": 80.2
    },
    "lms": {
      "loginFrequency": 9,
      "assignmentCompletion": 70.8,
      "courseActivityLevel": "Medium",
      "learningHours": 10.2,
      "activityTrend": 13.3,
      "componentScore": 67.3
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 2,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 68.3,
      "componentScore": 68.3
    },
    "placement": {
      "aptitude": 65.7,
      "coding": 67.5,
      "mockInterview": 73.1,
      "trainingPct": 79.5,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 68.3
    },
    "skills": {
      "technical": 73.5,
      "soft": 76.8,
      "assessment": 64.3,
      "projectsCompleted": 1,
      "componentScore": 65
    },
    "feedback": {
      "studentSatisfaction": 4.4,
      "facultyFeedbackScore": 78.8,
      "sentiment": "Positive"
    },
    "successScore": 72,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 19.9,
      "attendance": 12,
      "lms": 10.1,
      "placement": 13.7,
      "skills": 9.7,
      "engagement": 6.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.24,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.7%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.51,
        "band": "UNCERTAIN",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "65.7/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "67.5/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2023-1010",
    "name": "Suresh Reddy",
    "department": "ECE",
    "year": "2nd Year",
    "semester": 3,
    "section": "A",
    "academic": {
      "cgpa": 6.11,
      "averageMarks": 52.6,
      "backlogs": 5,
      "entryScore": 67.5,
      "previousScore": 77.4,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 55.7
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 2,
          "avgMarks": 49.5
        }
      ],
      "componentScore": 0
    },
    "attendance": {
      "percentage": 55.2,
      "trend": -9.8,
      "componentScore": 55.2
    },
    "lms": {
      "loginFrequency": 3,
      "assignmentCompletion": 54.9,
      "courseActivityLevel": "Low",
      "learningHours": 6.4,
      "activityTrend": -43.8,
      "componentScore": 32.1
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 45.4,
      "componentScore": 45.4
    },
    "placement": {
      "aptitude": 52.7,
      "coding": 35.3,
      "mockInterview": 32.6,
      "trainingPct": 46.3,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 40.7
    },
    "skills": {
      "technical": 37.7,
      "soft": 46.6,
      "assessment": 51.7,
      "projectsCompleted": 0,
      "componentScore": 33.3
    },
    "feedback": {
      "studentSatisfaction": 2,
      "facultyFeedbackScore": 45,
      "sentiment": "Needs Attention"
    },
    "successScore": 31,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (55.2%)",
      "High backlog burden (5 active backlogs)",
      "Technical coding assessment below benchmark (35.3/100)",
      "Steep decline in LMS portal engagement (-43.8%)",
      "Sub-threshold placement readiness (40.7/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 0,
      "attendance": 8.3,
      "lms": 4.8,
      "placement": 8.1,
      "skills": 5,
      "engagement": 4.5
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "5",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.53
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "33%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.16
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-6.2%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.09
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "52.7/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "35.3/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2024-1011",
    "name": "Akhil Saxena",
    "department": "IT",
    "year": "1st Year",
    "semester": 2,
    "section": "B",
    "academic": {
      "cgpa": 4.91,
      "averageMarks": 50.2,
      "backlogs": 4,
      "entryScore": 73.6,
      "previousScore": 66.1,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 55.8
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 1,
          "avgMarks": 44.6
        }
      ],
      "componentScore": 0
    },
    "attendance": {
      "percentage": 48,
      "trend": -11,
      "componentScore": 48
    },
    "lms": {
      "loginFrequency": 4,
      "assignmentCompletion": 42.5,
      "courseActivityLevel": "Low",
      "learningHours": 5.1,
      "activityTrend": -32.8,
      "componentScore": 25.7
    },
    "engagement": {
      "eventsAttended": 0,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 44.9,
      "componentScore": 44.9
    },
    "placement": {
      "aptitude": 43,
      "coding": 44.5,
      "mockInterview": 35.5,
      "trainingPct": 37.1,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 41.7
    },
    "skills": {
      "technical": 40.9,
      "soft": 51.7,
      "assessment": 38.1,
      "projectsCompleted": 0,
      "componentScore": 36.5
    },
    "feedback": {
      "studentSatisfaction": 2.4,
      "facultyFeedbackScore": 48.3,
      "sentiment": "Needs Attention"
    },
    "successScore": 29,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (48.0%)",
      "High backlog burden (4 active backlogs)",
      "Technical coding assessment below benchmark (44.5/100)",
      "Steep decline in LMS portal engagement (-32.8%)",
      "Sub-threshold placement readiness (41.7/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 0,
      "attendance": 7.2,
      "lms": 3.9,
      "placement": 8.3,
      "skills": 5.5,
      "engagement": 4.5
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "4",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.41
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "16%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.21
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-11.2%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.17
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "43.0/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "44.5/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2023-1012",
    "name": "Neha Pillai",
    "department": "CSE",
    "year": "2nd Year",
    "semester": 3,
    "section": "A",
    "academic": {
      "cgpa": 7.55,
      "averageMarks": 64,
      "backlogs": 0,
      "entryScore": 77.3,
      "previousScore": 62.6,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 68.2
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 59.8
        }
      ],
      "componentScore": 72
    },
    "attendance": {
      "percentage": 61.2,
      "trend": -9.8,
      "componentScore": 61.2
    },
    "lms": {
      "loginFrequency": 2,
      "assignmentCompletion": 54.1,
      "courseActivityLevel": "Low",
      "learningHours": 6.5,
      "activityTrend": -42,
      "componentScore": 32.7
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 47.4,
      "componentScore": 47.4
    },
    "placement": {
      "aptitude": 58.7,
      "coding": 59.2,
      "mockInterview": 45.1,
      "trainingPct": 55,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 55.5
    },
    "skills": {
      "technical": 62.3,
      "soft": 49.7,
      "assessment": 53.7,
      "projectsCompleted": 1,
      "componentScore": 50.4
    },
    "feedback": {
      "studentSatisfaction": 3.2,
      "facultyFeedbackScore": 59.8,
      "sentiment": "Needs Attention"
    },
    "successScore": 55,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Steep decline in LMS portal engagement (-42.0%)",
      "Model confirms elevated academic risk (probability 0.68)"
    ],
    "segment": "Engagement Risk",
    "scoreContributions": {
      "academic": 18,
      "attendance": 9.2,
      "lms": 4.9,
      "placement": 11.1,
      "skills": 7.6,
      "engagement": 4.7
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.68,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-8.4%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.13
          },
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "83%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.3,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "58.7/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "59.2/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2022-1013",
    "name": "Yash Bhat",
    "department": "ECE",
    "year": "3rd Year",
    "semester": 6,
    "section": "A",
    "academic": {
      "cgpa": 7.47,
      "averageMarks": 65.8,
      "backlogs": 1,
      "entryScore": 63.3,
      "previousScore": 92.4,
      "tutoringSessions": 0,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 72.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 59
        }
      ],
      "componentScore": 55.2
    },
    "attendance": {
      "percentage": 65.9,
      "trend": -16.7,
      "componentScore": 65.9
    },
    "lms": {
      "loginFrequency": 6,
      "assignmentCompletion": 54.7,
      "courseActivityLevel": "Low",
      "learningHours": 4,
      "activityTrend": -47.4,
      "componentScore": 23.3
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 40.9,
      "componentScore": 40.9
    },
    "placement": {
      "aptitude": 60,
      "coding": 63.2,
      "mockInterview": 46.4,
      "trainingPct": 43,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 57.9
    },
    "skills": {
      "technical": 56.1,
      "soft": 50.4,
      "assessment": 49.9,
      "projectsCompleted": 2,
      "componentScore": 52.9
    },
    "feedback": {
      "studentSatisfaction": 2.7,
      "facultyFeedbackScore": 57.2,
      "sentiment": "Needs Attention"
    },
    "successScore": 51,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Steep decline in LMS portal engagement (-47.4%)",
      "Model confirms elevated academic risk (probability 0.85)"
    ],
    "segment": "Engagement Risk",
    "scoreContributions": {
      "academic": 13.8,
      "attendance": 9.9,
      "lms": 3.5,
      "placement": 11.6,
      "skills": 7.9,
      "engagement": 4.1
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.85,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-13.5%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.2
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "66%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.05
          },
          {
            "feature": "Active Backlog Count",
            "value": "1",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.4,
        "band": "UNCERTAIN",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "60.0/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "63.2/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2023-1014",
    "name": "Zoya Das",
    "department": "CSE",
    "year": "2nd Year",
    "semester": 3,
    "section": "B",
    "academic": {
      "cgpa": 7.99,
      "averageMarks": 75.5,
      "backlogs": 0,
      "entryScore": 73.2,
      "previousScore": 91.4,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 74.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 76.4
        }
      ],
      "componentScore": 83.7
    },
    "attendance": {
      "percentage": 83.2,
      "trend": 3.2,
      "componentScore": 83.2
    },
    "lms": {
      "loginFrequency": 14,
      "assignmentCompletion": 73.9,
      "courseActivityLevel": "Medium",
      "learningHours": 10.6,
      "activityTrend": -9.3,
      "componentScore": 66.8
    },
    "engagement": {
      "eventsAttended": 4,
      "clubsCount": 2,
      "hackathonsParticipated": 0,
      "certificationsCount": 2,
      "extracurricularScore": 73.4,
      "componentScore": 73.4
    },
    "placement": {
      "aptitude": 75.7,
      "coding": 67.1,
      "mockInterview": 73.6,
      "trainingPct": 71.8,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 71.7
    },
    "skills": {
      "technical": 71.9,
      "soft": 63.3,
      "assessment": 67.7,
      "projectsCompleted": 2,
      "componentScore": 64.5
    },
    "feedback": {
      "studentSatisfaction": 3.6,
      "facultyFeedbackScore": 69.4,
      "sentiment": "Neutral"
    },
    "successScore": 75,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.9,
      "attendance": 12.5,
      "lms": 10,
      "placement": 14.3,
      "skills": 9.7,
      "engagement": 7.3
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.24,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+1.9%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.03
          }
        ]
      },
      "placement": {
        "probability": 0.71,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "75.7/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "67.1/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1015",
    "name": "Bhavna Deshmukh",
    "department": "IT",
    "year": "1st Year",
    "semester": 1,
    "section": "C",
    "academic": {
      "cgpa": 4.91,
      "averageMarks": 57.2,
      "backlogs": 2,
      "entryScore": 70,
      "previousScore": 65.5,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 3,
          "avgMarks": 63.4
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 2,
          "avgMarks": 51
        }
      ],
      "componentScore": 21.8
    },
    "attendance": {
      "percentage": 54.4,
      "trend": -11.9,
      "componentScore": 54.4
    },
    "lms": {
      "loginFrequency": 4,
      "assignmentCompletion": 50.4,
      "courseActivityLevel": "Low",
      "learningHours": 4.5,
      "activityTrend": -46.3,
      "componentScore": 23.1
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 48,
      "componentScore": 48
    },
    "placement": {
      "aptitude": 38.5,
      "coding": 41.4,
      "mockInterview": 47,
      "trainingPct": 23.4,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 41.8
    },
    "skills": {
      "technical": 50,
      "soft": 54.3,
      "assessment": 34.2,
      "projectsCompleted": 0,
      "componentScore": 41.5
    },
    "feedback": {
      "studentSatisfaction": 3.1,
      "facultyFeedbackScore": 48.2,
      "sentiment": "Needs Attention"
    },
    "successScore": 36,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (54.4%)",
      "Technical coding assessment below benchmark (41.4/100)",
      "Steep decline in LMS portal engagement (-46.3%)",
      "Sub-threshold placement readiness (41.8/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 5.5,
      "attendance": 8.2,
      "lms": 3.5,
      "placement": 8.4,
      "skills": 6.2,
      "engagement": 4.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-12.4%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.19
          },
          {
            "feature": "Active Backlog Count",
            "value": "2",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.17
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "33%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.16
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "38.5/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "41.4/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2024-1016",
    "name": "Nikhil Chatterjee",
    "department": "IT",
    "year": "1st Year",
    "semester": 1,
    "section": "C",
    "academic": {
      "cgpa": 8.92,
      "averageMarks": 89.1,
      "backlogs": 0,
      "entryScore": 90.3,
      "previousScore": 75.7,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 89.1
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 89.1
        }
      ],
      "componentScore": 91.9
    },
    "attendance": {
      "percentage": 96.2,
      "trend": 3,
      "componentScore": 96.2
    },
    "lms": {
      "loginFrequency": 15,
      "assignmentCompletion": 93.2,
      "courseActivityLevel": "High",
      "learningHours": 17.6,
      "activityTrend": 22.3,
      "componentScore": 96.6
    },
    "engagement": {
      "eventsAttended": 11,
      "clubsCount": 4,
      "hackathonsParticipated": 2,
      "certificationsCount": 5,
      "extracurricularScore": 82.6,
      "componentScore": 82.6
    },
    "placement": {
      "aptitude": 88.3,
      "coding": 89.7,
      "mockInterview": 89.2,
      "trainingPct": 98.8,
      "status": "Ready",
      "internshipExperience": 1,
      "componentScore": 99.1
    },
    "skills": {
      "technical": 88.5,
      "soft": 91.6,
      "assessment": 90.3,
      "projectsCompleted": 5,
      "componentScore": 91.9
    },
    "feedback": {
      "studentSatisfaction": 4.9,
      "facultyFeedbackScore": 95.8,
      "sentiment": "Positive"
    },
    "successScore": 94,
    "riskLevel": "LOW",
    "ruleRiskLevel": "LOW",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 23,
      "attendance": 14.4,
      "lms": 14.5,
      "placement": 19.8,
      "skills": 13.8,
      "engagement": 8.3
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.14,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+0.0%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.95,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "88.3/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "89.7/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "Yes",
            "impact": "raises_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2021-1017",
    "name": "Tanvi Chatterjee",
    "department": "CSE",
    "year": "4th Year",
    "semester": 7,
    "section": "B",
    "academic": {
      "cgpa": 8.52,
      "averageMarks": 78.6,
      "backlogs": 0,
      "entryScore": 77,
      "previousScore": 75.2,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 77.4
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 79.8
        }
      ],
      "componentScore": 87
    },
    "attendance": {
      "percentage": 90.3,
      "trend": -0.2,
      "componentScore": 90.3
    },
    "lms": {
      "loginFrequency": 16,
      "assignmentCompletion": 91.1,
      "courseActivityLevel": "Medium",
      "learningHours": 8.5,
      "activityTrend": 3.5,
      "componentScore": 72.1
    },
    "engagement": {
      "eventsAttended": 4,
      "clubsCount": 0,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 52.9,
      "componentScore": 52.9
    },
    "placement": {
      "aptitude": 49.9,
      "coding": 50.1,
      "mockInterview": 39.7,
      "trainingPct": 35.5,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 47.4
    },
    "skills": {
      "technical": 53.1,
      "soft": 48.9,
      "assessment": 51.3,
      "projectsCompleted": 1,
      "componentScore": 46
    },
    "feedback": {
      "studentSatisfaction": 3.6,
      "facultyFeedbackScore": 67.5,
      "sentiment": "Neutral"
    },
    "successScore": 68,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [
      "Sub-threshold placement readiness (47.4/100)"
    ],
    "segment": "Placement Risk",
    "scoreContributions": {
      "academic": 21.8,
      "attendance": 13.5,
      "lms": 10.8,
      "placement": 9.5,
      "skills": 6.9,
      "engagement": 5.3
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.19,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.4%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.27,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "49.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "50.1/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2021-1018",
    "name": "Ishaan Mehta",
    "department": "AI_DS",
    "year": "4th Year",
    "semester": 7,
    "section": "C",
    "academic": {
      "cgpa": 9.08,
      "averageMarks": 94,
      "backlogs": 0,
      "entryScore": 89.5,
      "previousScore": 60.5,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 92.1
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 96
        }
      ],
      "componentScore": 94.9
    },
    "attendance": {
      "percentage": 92.3,
      "trend": 0.1,
      "componentScore": 92.3
    },
    "lms": {
      "loginFrequency": 15,
      "assignmentCompletion": 98,
      "courseActivityLevel": "High",
      "learningHours": 17,
      "activityTrend": 9,
      "componentScore": 99
    },
    "engagement": {
      "eventsAttended": 8,
      "clubsCount": 2,
      "hackathonsParticipated": 5,
      "certificationsCount": 3,
      "extracurricularScore": 84.1,
      "componentScore": 84.1
    },
    "placement": {
      "aptitude": 95.6,
      "coding": 88,
      "mockInterview": 90.5,
      "trainingPct": 86.9,
      "status": "Placed",
      "internshipExperience": 1,
      "componentScore": 100
    },
    "skills": {
      "technical": 94.2,
      "soft": 88,
      "assessment": 88.6,
      "projectsCompleted": 6,
      "componentScore": 93.2
    },
    "feedback": {
      "studentSatisfaction": 4.3,
      "facultyFeedbackScore": 97.6,
      "sentiment": "Positive"
    },
    "successScore": 95,
    "riskLevel": "LOW",
    "ruleRiskLevel": "LOW",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 23.7,
      "attendance": 13.8,
      "lms": 14.8,
      "placement": 20,
      "skills": 14,
      "engagement": 8.4
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.1,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+3.9%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          }
        ]
      },
      "placement": {
        "probability": 0.95,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "95.6/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "88.0/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "Yes",
            "impact": "raises_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1019",
    "name": "Ananya Kumar",
    "department": "ECE",
    "year": "1st Year",
    "semester": 1,
    "section": "A",
    "academic": {
      "cgpa": 7.23,
      "averageMarks": 67.2,
      "backlogs": 1,
      "entryScore": null,
      "previousScore": 80.6,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 74.1
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 60.2
        }
      ],
      "componentScore": 54.7
    },
    "attendance": {
      "percentage": 57.9,
      "trend": -13.7,
      "componentScore": 57.9
    },
    "lms": {
      "loginFrequency": 5,
      "assignmentCompletion": 63.2,
      "courseActivityLevel": "Low",
      "learningHours": 4.2,
      "activityTrend": -41.5,
      "componentScore": 30.2
    },
    "engagement": {
      "eventsAttended": 1,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 49.2,
      "componentScore": 49.2
    },
    "placement": {
      "aptitude": 55.9,
      "coding": 64.3,
      "mockInterview": 46.7,
      "trainingPct": 55.3,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 57
    },
    "skills": {
      "technical": 60,
      "soft": 52.2,
      "assessment": 47.5,
      "projectsCompleted": 1,
      "componentScore": 50.3
    },
    "feedback": {
      "studentSatisfaction": 2.4,
      "facultyFeedbackScore": 49.3,
      "sentiment": "Needs Attention"
    },
    "successScore": 51,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (57.9%)",
      "Steep decline in LMS portal engagement (-41.5%)",
      "Model confirms elevated academic risk (probability 0.87)"
    ],
    "segment": "Engagement Risk",
    "scoreContributions": {
      "academic": 13.7,
      "attendance": 8.7,
      "lms": 4.5,
      "placement": 11.4,
      "skills": 7.5,
      "engagement": 4.9
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.87,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-13.9%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.21
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "66%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.05
          },
          {
            "feature": "Active Backlog Count",
            "value": "1",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.3,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "55.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "64.3/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2023-1020",
    "name": "Neha Saxena",
    "department": "IT",
    "year": "2nd Year",
    "semester": 3,
    "section": "C",
    "academic": {
      "cgpa": 8.23,
      "averageMarks": 79.1,
      "backlogs": 0,
      "entryScore": 82,
      "previousScore": 80.3,
      "tutoringSessions": null,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 79.1
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 79.1
        }
      ],
      "componentScore": 85.6
    },
    "attendance": {
      "percentage": 87.1,
      "trend": 1.5,
      "componentScore": 87.1
    },
    "lms": {
      "loginFrequency": 10,
      "assignmentCompletion": 76.2,
      "courseActivityLevel": "Medium",
      "learningHours": 9,
      "activityTrend": -3.1,
      "componentScore": 65.1
    },
    "engagement": {
      "eventsAttended": 3,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 49.4,
      "componentScore": 49.4
    },
    "placement": {
      "aptitude": 46.9,
      "coding": 42.6,
      "mockInterview": 42.9,
      "trainingPct": 43.5,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 44.2
    },
    "skills": {
      "technical": 49,
      "soft": 53.6,
      "assessment": 56.2,
      "projectsCompleted": 1,
      "componentScore": 45.8
    },
    "feedback": {
      "studentSatisfaction": 3.6,
      "facultyFeedbackScore": 62.4,
      "sentiment": "Neutral"
    },
    "successScore": 65,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules",
    "riskFactors": [
      "Technical coding assessment below benchmark (42.6/100)",
      "Sub-threshold placement readiness (44.2/100)"
    ],
    "segment": "Placement Risk",
    "scoreContributions": {
      "academic": 21.4,
      "attendance": 13.1,
      "lms": 9.8,
      "placement": 8.8,
      "skills": 6.9,
      "engagement": 4.9
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.22,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+0.0%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.19,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "46.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "42.6/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Rules-Only Alert"
    }
  },
  {
    "studentId": "SC-2023-1021",
    "name": "Meera Pandey",
    "department": "CSE",
    "year": "2nd Year",
    "semester": 3,
    "section": "B",
    "academic": {
      "cgpa": 7.05,
      "averageMarks": 74.5,
      "backlogs": 1,
      "entryScore": 73.5,
      "previousScore": null,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 73.2
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 75.7
        }
      ],
      "componentScore": 63.5
    },
    "attendance": {
      "percentage": 85.6,
      "trend": -0.2,
      "componentScore": 85.6
    },
    "lms": {
      "loginFrequency": 13,
      "assignmentCompletion": 76,
      "courseActivityLevel": "Medium",
      "learningHours": 12,
      "activityTrend": 11.4,
      "componentScore": 75.5
    },
    "engagement": {
      "eventsAttended": 4,
      "clubsCount": 2,
      "hackathonsParticipated": 1,
      "certificationsCount": 2,
      "extracurricularScore": 68.3,
      "componentScore": 68.3
    },
    "placement": {
      "aptitude": 66.4,
      "coding": 70.9,
      "mockInterview": 60.6,
      "trainingPct": 61.8,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 66.8
    },
    "skills": {
      "technical": 64.5,
      "soft": 63.9,
      "assessment": 73.9,
      "projectsCompleted": 3,
      "componentScore": 66.4
    },
    "feedback": {
      "studentSatisfaction": 4.2,
      "facultyFeedbackScore": 65,
      "sentiment": "Neutral"
    },
    "successScore": 70,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 15.9,
      "attendance": 12.8,
      "lms": 11.3,
      "placement": 13.4,
      "skills": 10,
      "engagement": 6.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.43,
        "band": "MEDIUM",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "1",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.05
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.5%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "83%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.61,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "66.4/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "70.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2021-1022",
    "name": "Nisha Iyer",
    "department": "CSE",
    "year": "4th Year",
    "semester": 7,
    "section": "B",
    "academic": {
      "cgpa": 7.41,
      "averageMarks": 71.4,
      "backlogs": 0,
      "entryScore": 89.6,
      "previousScore": 88,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 69.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 73.3
        }
      ],
      "componentScore": 80.3
    },
    "attendance": {
      "percentage": 80.5,
      "trend": -2.1,
      "componentScore": 80.5
    },
    "lms": {
      "loginFrequency": 9,
      "assignmentCompletion": 75.6,
      "courseActivityLevel": "Medium",
      "learningHours": 8.1,
      "activityTrend": 0.2,
      "componentScore": 63.1
    },
    "engagement": {
      "eventsAttended": 3,
      "clubsCount": 1,
      "hackathonsParticipated": 1,
      "certificationsCount": 1,
      "extracurricularScore": 68,
      "componentScore": 68
    },
    "placement": {
      "aptitude": 62.5,
      "coding": 73.9,
      "mockInterview": 64.4,
      "trainingPct": 74.1,
      "status": "Placed",
      "internshipExperience": 0,
      "componentScore": 67.5
    },
    "skills": {
      "technical": 68.5,
      "soft": 69.3,
      "assessment": 62.6,
      "projectsCompleted": 1,
      "componentScore": 60.1
    },
    "feedback": {
      "studentSatisfaction": 4.3,
      "facultyFeedbackScore": 73.6,
      "sentiment": "Positive"
    },
    "successScore": 71,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.1,
      "attendance": 12.1,
      "lms": 9.5,
      "placement": 13.5,
      "skills": 9,
      "engagement": 6.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.27,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+3.8%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          }
        ]
      },
      "placement": {
        "probability": 0.57,
        "band": "UNCERTAIN",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "62.5/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "73.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1023",
    "name": "Aarav Nair",
    "department": "CSE",
    "year": "3rd Year",
    "semester": 5,
    "section": "C",
    "academic": {
      "cgpa": 5.57,
      "averageMarks": 56.9,
      "backlogs": 4,
      "entryScore": 59,
      "previousScore": 61.8,
      "tutoringSessions": 0,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 61.2
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 52.6
        }
      ],
      "componentScore": 9.4
    },
    "attendance": {
      "percentage": 48.4,
      "trend": -12.5,
      "componentScore": 48.4
    },
    "lms": {
      "loginFrequency": 6,
      "assignmentCompletion": 40.5,
      "courseActivityLevel": "Low",
      "learningHours": 3.7,
      "activityTrend": -20.8,
      "componentScore": 24.5
    },
    "engagement": {
      "eventsAttended": 1,
      "clubsCount": 0,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 34.5,
      "componentScore": 34.5
    },
    "placement": {
      "aptitude": 44.9,
      "coding": 48.1,
      "mockInterview": 39.6,
      "trainingPct": 49.7,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 44.9
    },
    "skills": {
      "technical": 49.4,
      "soft": 48,
      "assessment": 35,
      "projectsCompleted": 0,
      "componentScore": 39
    },
    "feedback": {
      "studentSatisfaction": 2,
      "facultyFeedbackScore": 57.2,
      "sentiment": "Needs Attention"
    },
    "successScore": 32,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (48.4%)",
      "High backlog burden (4 active backlogs)",
      "Technical coding assessment below benchmark (48.1/100)",
      "Sub-threshold placement readiness (44.9/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 2.3,
      "attendance": 7.3,
      "lms": 3.7,
      "placement": 9,
      "skills": 5.9,
      "engagement": 3.5
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "4",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.41
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-8.6%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.13
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "66%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "44.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "48.1/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2023-1024",
    "name": "Sahil Chatterjee",
    "department": "ECE",
    "year": "2nd Year",
    "semester": 3,
    "section": "B",
    "academic": {
      "cgpa": 7.67,
      "averageMarks": 77.2,
      "backlogs": 0,
      "entryScore": null,
      "previousScore": 60.1,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 75.8
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 78.6
        }
      ],
      "componentScore": 83.2
    },
    "attendance": {
      "percentage": 83.9,
      "trend": 2.9,
      "componentScore": 83.9
    },
    "lms": {
      "loginFrequency": 13,
      "assignmentCompletion": 87.2,
      "courseActivityLevel": "Medium",
      "learningHours": 11.8,
      "activityTrend": 12.2,
      "componentScore": 80.5
    },
    "engagement": {
      "eventsAttended": 5,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 67.6,
      "componentScore": 67.6
    },
    "placement": {
      "aptitude": 74.7,
      "coding": 75,
      "mockInterview": 71.2,
      "trainingPct": 68.7,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 73.9
    },
    "skills": {
      "technical": 61.8,
      "soft": 72.1,
      "assessment": 75.7,
      "projectsCompleted": 2,
      "componentScore": 63
    },
    "feedback": {
      "studentSatisfaction": 3.6,
      "facultyFeedbackScore": 70.1,
      "sentiment": "Neutral"
    },
    "successScore": 76,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.8,
      "attendance": 12.6,
      "lms": 12.1,
      "placement": 14.8,
      "skills": 9.5,
      "engagement": 6.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.22,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.8%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.77,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "74.7/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "75.0/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1025",
    "name": "Varun Bose",
    "department": "IT",
    "year": "1st Year",
    "semester": 1,
    "section": "C",
    "academic": {
      "cgpa": 9.62,
      "averageMarks": 90.4,
      "backlogs": 0,
      "entryScore": 66.8,
      "previousScore": 58.8,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 90.7
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 90.1
        }
      ],
      "componentScore": 95
    },
    "attendance": {
      "percentage": 97,
      "trend": -0.7,
      "componentScore": 97
    },
    "lms": {
      "loginFrequency": 26,
      "assignmentCompletion": 95.7,
      "courseActivityLevel": "High",
      "learningHours": 18.6,
      "activityTrend": 16.7,
      "componentScore": 97.8
    },
    "engagement": {
      "eventsAttended": 11,
      "clubsCount": 3,
      "hackathonsParticipated": 5,
      "certificationsCount": 3,
      "extracurricularScore": 81.1,
      "componentScore": 81.1
    },
    "placement": {
      "aptitude": 95.1,
      "coding": 95.8,
      "mockInterview": 84.5,
      "trainingPct": 99.4,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 92.7
    },
    "skills": {
      "technical": 88.4,
      "soft": 84.2,
      "assessment": 96,
      "projectsCompleted": 6,
      "componentScore": 89.2
    },
    "feedback": {
      "studentSatisfaction": 4.1,
      "facultyFeedbackScore": 90,
      "sentiment": "Positive"
    },
    "successScore": 93,
    "riskLevel": "LOW",
    "ruleRiskLevel": "LOW",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 23.8,
      "attendance": 14.5,
      "lms": 14.7,
      "placement": 18.5,
      "skills": 13.4,
      "engagement": 8.1
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.13,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-0.6%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.01
          }
        ]
      },
      "placement": {
        "probability": 0.95,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "95.1/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "95.8/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1026",
    "name": "Zoya Chatterjee",
    "department": "AI_DS",
    "year": "3rd Year",
    "semester": 6,
    "section": "C",
    "academic": {
      "cgpa": 6.08,
      "averageMarks": 48.9,
      "backlogs": 3,
      "entryScore": 65.3,
      "previousScore": 76.3,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 54.3
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 3,
          "avgMarks": 43.5
        }
      ],
      "componentScore": 16
    },
    "attendance": {
      "percentage": 56.4,
      "trend": -6.4,
      "componentScore": 56.4
    },
    "lms": {
      "loginFrequency": 2,
      "assignmentCompletion": 49.4,
      "courseActivityLevel": "Low",
      "learningHours": 6.1,
      "activityTrend": -29.1,
      "componentScore": 33.6
    },
    "engagement": {
      "eventsAttended": 1,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 26,
      "componentScore": 26
    },
    "placement": {
      "aptitude": 42.7,
      "coding": 30.9,
      "mockInterview": 50.2,
      "trainingPct": 29.8,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 39.9
    },
    "skills": {
      "technical": 41.1,
      "soft": 39,
      "assessment": 47.7,
      "projectsCompleted": 1,
      "componentScore": 37.1
    },
    "feedback": {
      "studentSatisfaction": 2.5,
      "facultyFeedbackScore": 56,
      "sentiment": "Needs Attention"
    },
    "successScore": 34,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (56.4%)",
      "High backlog burden (3 active backlogs)",
      "Technical coding assessment below benchmark (30.9/100)",
      "Steep decline in LMS portal engagement (-29.1%)",
      "Sub-threshold placement readiness (39.9/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 4,
      "attendance": 8.5,
      "lms": 5,
      "placement": 8,
      "skills": 5.6,
      "engagement": 2.6
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "3",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.29
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-10.8%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.16
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "50%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.1
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "42.7/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "30.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2021-1027",
    "name": "Siddharth Patel",
    "department": "AI_DS",
    "year": "4th Year",
    "semester": 8,
    "section": "A",
    "academic": {
      "cgpa": 7.91,
      "averageMarks": 69.7,
      "backlogs": 0,
      "entryScore": 58.9,
      "previousScore": 63.2,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 71.2
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 68.2
        }
      ],
      "componentScore": 80.5
    },
    "attendance": {
      "percentage": 77.2,
      "trend": 2,
      "componentScore": 77.2
    },
    "lms": {
      "loginFrequency": 11,
      "assignmentCompletion": 80.5,
      "courseActivityLevel": "Medium",
      "learningHours": 12.9,
      "activityTrend": 13.5,
      "componentScore": 80.6
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 1,
      "certificationsCount": 1,
      "extracurricularScore": 67.4,
      "componentScore": 67.4
    },
    "placement": {
      "aptitude": 75.1,
      "coding": 63.6,
      "mockInterview": 69.2,
      "trainingPct": 73,
      "status": "Placed",
      "internshipExperience": 0,
      "componentScore": 69
    },
    "skills": {
      "technical": 72.6,
      "soft": 72.4,
      "assessment": 62.1,
      "projectsCompleted": 1,
      "componentScore": 63
    },
    "feedback": {
      "studentSatisfaction": 4.3,
      "facultyFeedbackScore": 70.2,
      "sentiment": "Neutral"
    },
    "successScore": 74,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.1,
      "attendance": 11.6,
      "lms": 12.1,
      "placement": 13.8,
      "skills": 9.5,
      "engagement": 6.7
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.37,
        "band": "MEDIUM",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-3.0%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.66,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "75.1/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "63.6/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2021-1028",
    "name": "Aayush Thakur",
    "department": "IT",
    "year": "4th Year",
    "semester": 8,
    "section": "C",
    "academic": {
      "cgpa": 7.97,
      "averageMarks": 75.6,
      "backlogs": 0,
      "entryScore": 77.6,
      "previousScore": null,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 74.4
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 76.8
        }
      ],
      "componentScore": 83.8
    },
    "attendance": {
      "percentage": 84.2,
      "trend": 1.8,
      "componentScore": 84.2
    },
    "lms": {
      "loginFrequency": 13,
      "assignmentCompletion": 76.7,
      "courseActivityLevel": "Medium",
      "learningHours": 12.1,
      "activityTrend": 0.7,
      "componentScore": 76.2
    },
    "engagement": {
      "eventsAttended": 3,
      "clubsCount": 0,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 45.5,
      "componentScore": 45.5
    },
    "placement": {
      "aptitude": 57.5,
      "coding": 53,
      "mockInterview": 52.8,
      "trainingPct": 32.3,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 54.5
    },
    "skills": {
      "technical": 45.4,
      "soft": 54.2,
      "assessment": 57.5,
      "projectsCompleted": 0,
      "componentScore": 39.4
    },
    "feedback": {
      "studentSatisfaction": 3.8,
      "facultyFeedbackScore": 65.9,
      "sentiment": "Neutral"
    },
    "successScore": 66,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Placement Risk",
    "scoreContributions": {
      "academic": 20.9,
      "attendance": 12.6,
      "lms": 11.4,
      "placement": 10.9,
      "skills": 5.9,
      "engagement": 4.5
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.23,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.4%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.26,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "57.5/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "53.0/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1029",
    "name": "Karan Mehta",
    "department": "CSE",
    "year": "1st Year",
    "semester": 1,
    "section": "A",
    "academic": {
      "cgpa": 7.2,
      "averageMarks": 61.8,
      "backlogs": 0,
      "entryScore": 67.1,
      "previousScore": 59.2,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 69.1
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 54.4
        }
      ],
      "componentScore": 68.7
    },
    "attendance": {
      "percentage": 56.7,
      "trend": -15.7,
      "componentScore": 56.7
    },
    "lms": {
      "loginFrequency": 3,
      "assignmentCompletion": 56.8,
      "courseActivityLevel": "Low",
      "learningHours": 3.1,
      "activityTrend": -54.4,
      "componentScore": 19
    },
    "engagement": {
      "eventsAttended": 0,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 48.2,
      "componentScore": 48.2
    },
    "placement": {
      "aptitude": 66.2,
      "coding": 56.1,
      "mockInterview": 58.2,
      "trainingPct": 50.3,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 60.2
    },
    "skills": {
      "technical": 51.7,
      "soft": 56.1,
      "assessment": 63,
      "projectsCompleted": 1,
      "componentScore": 47.9
    },
    "feedback": {
      "studentSatisfaction": 3.1,
      "facultyFeedbackScore": 63.4,
      "sentiment": "Needs Attention"
    },
    "successScore": 53,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (56.7%)",
      "Steep decline in LMS portal engagement (-54.4%)",
      "Model confirms elevated academic risk (probability 0.77)"
    ],
    "segment": "Engagement Risk",
    "scoreContributions": {
      "academic": 17.2,
      "attendance": 8.5,
      "lms": 2.9,
      "placement": 12,
      "skills": 7.2,
      "engagement": 4.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.77,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-14.7%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.22
          },
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "83%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.32,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "66.2/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "56.1/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2023-1030",
    "name": "Chirag Deshmukh",
    "department": "CSE",
    "year": "2nd Year",
    "semester": 3,
    "section": "C",
    "academic": {
      "cgpa": 7.61,
      "averageMarks": 78.8,
      "backlogs": 0,
      "entryScore": 58.6,
      "previousScore": 74.4,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 77.3
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 80.2
        }
      ],
      "componentScore": 83.5
    },
    "attendance": {
      "percentage": 85.7,
      "trend": -1.4,
      "componentScore": 85.7
    },
    "lms": {
      "loginFrequency": 16,
      "assignmentCompletion": 80,
      "courseActivityLevel": "Medium",
      "learningHours": 11,
      "activityTrend": -1.1,
      "componentScore": 74
    },
    "engagement": {
      "eventsAttended": 1,
      "clubsCount": 0,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 49,
      "componentScore": 49
    },
    "placement": {
      "aptitude": 45.7,
      "coding": 41.4,
      "mockInterview": 46.2,
      "trainingPct": 40.4,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 44.1
    },
    "skills": {
      "technical": 43.5,
      "soft": 50.8,
      "assessment": 52.6,
      "projectsCompleted": 1,
      "componentScore": 42.4
    },
    "feedback": {
      "studentSatisfaction": 4,
      "facultyFeedbackScore": 73,
      "sentiment": "Neutral"
    },
    "successScore": 65,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules",
    "riskFactors": [
      "Technical coding assessment below benchmark (41.4/100)",
      "Sub-threshold placement readiness (44.1/100)"
    ],
    "segment": "Placement Risk",
    "scoreContributions": {
      "academic": 20.9,
      "attendance": 12.9,
      "lms": 11.1,
      "placement": 8.8,
      "skills": 6.4,
      "engagement": 4.9
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.2,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.9%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.12,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "45.7/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "41.4/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Rules-Only Alert"
    }
  },
  {
    "studentId": "SC-2023-1031",
    "name": "Yash Verma",
    "department": "ECE",
    "year": "2nd Year",
    "semester": 3,
    "section": "C",
    "academic": {
      "cgpa": 8.12,
      "averageMarks": 79.3,
      "backlogs": 0,
      "entryScore": 81.3,
      "previousScore": 59.1,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 78.4
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 80.2
        }
      ],
      "componentScore": 85.5
    },
    "attendance": {
      "percentage": 85.6,
      "trend": 0.8,
      "componentScore": 85.6
    },
    "lms": {
      "loginFrequency": 12,
      "assignmentCompletion": 71.9,
      "courseActivityLevel": "Medium",
      "learningHours": 11,
      "activityTrend": -6.1,
      "componentScore": 68.2
    },
    "engagement": {
      "eventsAttended": 5,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 2,
      "extracurricularScore": 71.9,
      "componentScore": 71.9
    },
    "placement": {
      "aptitude": 65.9,
      "coding": 71,
      "mockInterview": 68.6,
      "trainingPct": 76.1,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 68.6
    },
    "skills": {
      "technical": 75.2,
      "soft": 77.6,
      "assessment": 74.7,
      "projectsCompleted": 3,
      "componentScore": 76
    },
    "feedback": {
      "studentSatisfaction": 4.1,
      "facultyFeedbackScore": 74.5,
      "sentiment": "Positive"
    },
    "successScore": 77,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 21.4,
      "attendance": 12.8,
      "lms": 10.2,
      "placement": 13.7,
      "skills": 11.4,
      "engagement": 7.2
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.21,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+1.8%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.03
          }
        ]
      },
      "placement": {
        "probability": 0.8,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "65.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "71.0/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2023-1032",
    "name": "Priya Sharma",
    "department": "CIVIL",
    "year": "2nd Year",
    "semester": 3,
    "section": "A",
    "academic": {
      "cgpa": 7.84,
      "averageMarks": 69.2,
      "backlogs": 0,
      "entryScore": 82.1,
      "previousScore": 83.4,
      "tutoringSessions": null,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 69.1
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 69.3
        }
      ],
      "componentScore": 80.6
    },
    "attendance": {
      "percentage": 77.3,
      "trend": -0.4,
      "componentScore": 77.3
    },
    "lms": {
      "loginFrequency": 9,
      "assignmentCompletion": 76.7,
      "courseActivityLevel": "Medium",
      "learningHours": 12.3,
      "activityTrend": 9.4,
      "componentScore": 76.8
    },
    "engagement": {
      "eventsAttended": 6,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 58.1,
      "componentScore": 58.1
    },
    "placement": {
      "aptitude": 69.9,
      "coding": 69.5,
      "mockInterview": 64.1,
      "trainingPct": 73.2,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 68.3
    },
    "skills": {
      "technical": 68.7,
      "soft": 69.1,
      "assessment": 64.9,
      "projectsCompleted": 3,
      "componentScore": 70.1
    },
    "feedback": {
      "studentSatisfaction": 3.5,
      "facultyFeedbackScore": 72.3,
      "sentiment": "Positive"
    },
    "successScore": 73,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.2,
      "attendance": 11.6,
      "lms": 11.5,
      "placement": 13.7,
      "skills": 10.5,
      "engagement": 5.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.33,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+0.2%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.75,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "69.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "69.5/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1033",
    "name": "Swati Verma",
    "department": "CSE",
    "year": "3rd Year",
    "semester": 6,
    "section": "A",
    "academic": {
      "cgpa": 8.47,
      "averageMarks": 75,
      "backlogs": 0,
      "entryScore": 61.9,
      "previousScore": 75.5,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 77.9
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 72.1
        }
      ],
      "componentScore": 84.1
    },
    "attendance": {
      "percentage": 88.5,
      "trend": -2.1,
      "componentScore": 88.5
    },
    "lms": {
      "loginFrequency": 14,
      "assignmentCompletion": 84.1,
      "courseActivityLevel": "Medium",
      "learningHours": 9.4,
      "activityTrend": 0.9,
      "componentScore": 71.4
    },
    "engagement": {
      "eventsAttended": 3,
      "clubsCount": 0,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 57.2,
      "componentScore": 57.2
    },
    "placement": {
      "aptitude": 42.7,
      "coding": 35.4,
      "mockInterview": 54.6,
      "trainingPct": 51.6,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 42.8
    },
    "skills": {
      "technical": 51.2,
      "soft": 53.2,
      "assessment": 53.4,
      "projectsCompleted": 1,
      "componentScore": 46.7
    },
    "feedback": {
      "studentSatisfaction": 3.3,
      "facultyFeedbackScore": 68.5,
      "sentiment": "Neutral"
    },
    "successScore": 66,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules",
    "riskFactors": [
      "Technical coding assessment below benchmark (35.4/100)",
      "Sub-threshold placement readiness (42.8/100)"
    ],
    "segment": "Placement Risk",
    "scoreContributions": {
      "academic": 21,
      "attendance": 13.3,
      "lms": 10.7,
      "placement": 8.6,
      "skills": 7,
      "engagement": 5.7
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.3,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-5.8%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.09
          },
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          }
        ]
      },
      "placement": {
        "probability": 0.15,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "42.7/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "35.4/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Rules-Only Alert"
    }
  },
  {
    "studentId": "SC-2021-1034",
    "name": "Sanya Pandey",
    "department": "CSE",
    "year": "4th Year",
    "semester": 8,
    "section": "C",
    "academic": {
      "cgpa": 8.88,
      "averageMarks": 86.2,
      "backlogs": 0,
      "entryScore": 93.8,
      "previousScore": 74.7,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 86.7
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 85.7
        }
      ],
      "componentScore": 90.5
    },
    "attendance": {
      "percentage": 92.1,
      "trend": -0.9,
      "componentScore": 92.1
    },
    "lms": {
      "loginFrequency": 28,
      "assignmentCompletion": 90.3,
      "courseActivityLevel": "High",
      "learningHours": 21.8,
      "activityTrend": 8.8,
      "componentScore": 95.2
    },
    "engagement": {
      "eventsAttended": 6,
      "clubsCount": 2,
      "hackathonsParticipated": 1,
      "certificationsCount": 3,
      "extracurricularScore": 83.8,
      "componentScore": 83.8
    },
    "placement": {
      "aptitude": 82.8,
      "coding": 80.8,
      "mockInterview": 91.4,
      "trainingPct": 86.1,
      "status": "Placed",
      "internshipExperience": 1,
      "componentScore": 94.2
    },
    "skills": {
      "technical": 88.5,
      "soft": 87.9,
      "assessment": 90.1,
      "projectsCompleted": 7,
      "componentScore": 90.6
    },
    "feedback": {
      "studentSatisfaction": 4.6,
      "facultyFeedbackScore": 97.8,
      "sentiment": "Positive"
    },
    "successScore": 92,
    "riskLevel": "LOW",
    "ruleRiskLevel": "LOW",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 22.6,
      "attendance": 13.8,
      "lms": 14.3,
      "placement": 18.8,
      "skills": 13.6,
      "engagement": 8.4
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.17,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-1.0%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.01
          }
        ]
      },
      "placement": {
        "probability": 0.95,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "82.8/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "80.8/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "Yes",
            "impact": "raises_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2021-1035",
    "name": "Aniket Verma",
    "department": "CSE",
    "year": "4th Year",
    "semester": 8,
    "section": "B",
    "academic": {
      "cgpa": 6.85,
      "averageMarks": 76.3,
      "backlogs": 0,
      "entryScore": 61.3,
      "previousScore": 68.7,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 78
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 74.6
        }
      ],
      "componentScore": 78.5
    },
    "attendance": {
      "percentage": 84.1,
      "trend": 2.8,
      "componentScore": 84.1
    },
    "lms": {
      "loginFrequency": 15,
      "assignmentCompletion": 76.9,
      "courseActivityLevel": "Medium",
      "learningHours": 11.5,
      "activityTrend": 13.9,
      "componentScore": 74.4
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 2,
      "hackathonsParticipated": 0,
      "certificationsCount": 2,
      "extracurricularScore": 67.1,
      "componentScore": 67.1
    },
    "placement": {
      "aptitude": 68,
      "coding": 74.3,
      "mockInterview": 66.8,
      "trainingPct": 76.2,
      "status": "Placed",
      "internshipExperience": 1,
      "componentScore": 80.2
    },
    "skills": {
      "technical": 61.5,
      "soft": 72.3,
      "assessment": 60.7,
      "projectsCompleted": 3,
      "componentScore": 68
    },
    "feedback": {
      "studentSatisfaction": 3.8,
      "facultyFeedbackScore": 72.5,
      "sentiment": "Positive"
    },
    "successScore": 76,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 19.6,
      "attendance": 12.6,
      "lms": 11.2,
      "placement": 16,
      "skills": 10.2,
      "engagement": 6.7
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.28,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-3.4%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.83,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "68.0/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "74.3/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "Yes",
            "impact": "raises_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1036",
    "name": "Ananya Malhotra",
    "department": "MECH",
    "year": "1st Year",
    "semester": 2,
    "section": "C",
    "academic": {
      "cgpa": 7.38,
      "averageMarks": 63.2,
      "backlogs": 1,
      "entryScore": 82.4,
      "previousScore": 82.5,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 70.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 56
        }
      ],
      "componentScore": 53.8
    },
    "attendance": {
      "percentage": 67.5,
      "trend": -12.8,
      "componentScore": 67.5
    },
    "lms": {
      "loginFrequency": 3,
      "assignmentCompletion": 51.7,
      "courseActivityLevel": "Low",
      "learningHours": 5.3,
      "activityTrend": -59.3,
      "componentScore": 21.7
    },
    "engagement": {
      "eventsAttended": 1,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 59.2,
      "componentScore": 59.2
    },
    "placement": {
      "aptitude": 65.5,
      "coding": 54.7,
      "mockInterview": 55.1,
      "trainingPct": 58.8,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 58.6
    },
    "skills": {
      "technical": 55,
      "soft": 54,
      "assessment": 60.2,
      "projectsCompleted": 1,
      "componentScore": 48.6
    },
    "feedback": {
      "studentSatisfaction": 3,
      "facultyFeedbackScore": 62.1,
      "sentiment": "Needs Attention"
    },
    "successScore": 52,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Steep decline in LMS portal engagement (-59.3%)",
      "Model confirms elevated academic risk (probability 0.87)"
    ],
    "segment": "Engagement Risk",
    "scoreContributions": {
      "academic": 13.4,
      "attendance": 10.1,
      "lms": 3.2,
      "placement": 11.7,
      "skills": 7.3,
      "engagement": 5.9
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.87,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-14.5%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.22
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "66%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.05
          },
          {
            "feature": "Active Backlog Count",
            "value": "1",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.31,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "65.5/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "54.7/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2021-1037",
    "name": "Nikhil Singh",
    "department": "CSE",
    "year": "4th Year",
    "semester": 7,
    "section": "A",
    "academic": {
      "cgpa": 9.8,
      "averageMarks": 84.1,
      "backlogs": 0,
      "entryScore": 64.6,
      "previousScore": 87.8,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 84.2
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 84
        }
      ],
      "componentScore": 93.6
    },
    "attendance": {
      "percentage": 95.5,
      "trend": 1.3,
      "componentScore": 95.5
    },
    "lms": {
      "loginFrequency": 28,
      "assignmentCompletion": 88.5,
      "courseActivityLevel": "High",
      "learningHours": 17.4,
      "activityTrend": 19.2,
      "componentScore": 94.2
    },
    "engagement": {
      "eventsAttended": 6,
      "clubsCount": 4,
      "hackathonsParticipated": 4,
      "certificationsCount": 3,
      "extracurricularScore": 82.4,
      "componentScore": 82.4
    },
    "placement": {
      "aptitude": 93.3,
      "coding": 91.9,
      "mockInterview": 92.1,
      "trainingPct": 87.5,
      "status": "Placed",
      "internshipExperience": 1,
      "componentScore": 100
    },
    "skills": {
      "technical": 91.5,
      "soft": 83.3,
      "assessment": 88.2,
      "projectsCompleted": 5,
      "componentScore": 90.3
    },
    "feedback": {
      "studentSatisfaction": 4.8,
      "facultyFeedbackScore": 95.2,
      "sentiment": "Positive"
    },
    "successScore": 94,
    "riskLevel": "LOW",
    "ruleRiskLevel": "LOW",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 23.4,
      "attendance": 14.3,
      "lms": 14.1,
      "placement": 20,
      "skills": 13.5,
      "engagement": 8.2
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.16,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-0.2%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.95,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "93.3/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "91.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "Yes",
            "impact": "raises_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1038",
    "name": "Zoya Iyer",
    "department": "MECH",
    "year": "3rd Year",
    "semester": 6,
    "section": "A",
    "academic": {
      "cgpa": 8.54,
      "averageMarks": 78.6,
      "backlogs": 0,
      "entryScore": 94.8,
      "previousScore": 59.1,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 84.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 72.7
        }
      ],
      "componentScore": 84.6
    },
    "attendance": {
      "percentage": 84.7,
      "trend": -1.1,
      "componentScore": 84.7
    },
    "lms": {
      "loginFrequency": 9,
      "assignmentCompletion": 87.1,
      "courseActivityLevel": "Medium",
      "learningHours": 11.1,
      "activityTrend": -6,
      "componentScore": 76.1
    },
    "engagement": {
      "eventsAttended": 1,
      "clubsCount": 0,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 49,
      "componentScore": 49
    },
    "placement": {
      "aptitude": 50.2,
      "coding": 50.8,
      "mockInterview": 39.7,
      "trainingPct": 52.8,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 47.8
    },
    "skills": {
      "technical": 55.1,
      "soft": 58.2,
      "assessment": 56.9,
      "projectsCompleted": 1,
      "componentScore": 50.2
    },
    "feedback": {
      "studentSatisfaction": 3.1,
      "facultyFeedbackScore": 70,
      "sentiment": "Neutral"
    },
    "successScore": 67,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [
      "Sub-threshold placement readiness (47.8/100)"
    ],
    "segment": "Placement Risk",
    "scoreContributions": {
      "academic": 21.2,
      "attendance": 12.7,
      "lms": 11.4,
      "placement": 9.6,
      "skills": 7.5,
      "engagement": 4.9
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.35,
        "band": "MEDIUM",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-11.8%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.18
          },
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          }
        ]
      },
      "placement": {
        "probability": 0.33,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "50.2/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "50.8/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1039",
    "name": "Divya Verma",
    "department": "MECH",
    "year": "1st Year",
    "semester": 2,
    "section": "B",
    "academic": {
      "cgpa": 7.66,
      "averageMarks": 67.1,
      "backlogs": 0,
      "entryScore": 64.6,
      "previousScore": 83.2,
      "tutoringSessions": null,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 68.2
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 65.9
        }
      ],
      "componentScore": 78.7
    },
    "attendance": {
      "percentage": 74.1,
      "trend": 3.5,
      "componentScore": 74.1
    },
    "lms": {
      "loginFrequency": 15,
      "assignmentCompletion": 77.6,
      "courseActivityLevel": "Medium",
      "learningHours": 12.7,
      "activityTrend": -4.1,
      "componentScore": 77.1
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 2,
      "extracurricularScore": 67.8,
      "componentScore": 67.8
    },
    "placement": {
      "aptitude": 70,
      "coding": 59.1,
      "mockInterview": 72.6,
      "trainingPct": 70,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 66.3
    },
    "skills": {
      "technical": 69.6,
      "soft": 72.1,
      "assessment": 70.4,
      "projectsCompleted": 3,
      "componentScore": 71.6
    },
    "feedback": {
      "studentSatisfaction": 3.5,
      "facultyFeedbackScore": 72.3,
      "sentiment": "Positive"
    },
    "successScore": 73,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 19.7,
      "attendance": 11.1,
      "lms": 11.6,
      "placement": 13.3,
      "skills": 10.7,
      "engagement": 6.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.4,
        "band": "MEDIUM",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-2.3%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.03
          }
        ]
      },
      "placement": {
        "probability": 0.66,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "70.0/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "59.1/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1040",
    "name": "Arjun Pillai",
    "department": "ECE",
    "year": "1st Year",
    "semester": 1,
    "section": "C",
    "academic": {
      "cgpa": 7.34,
      "averageMarks": 69,
      "backlogs": 0,
      "entryScore": 56.7,
      "previousScore": 77.6,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 71
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 67.1
        }
      ],
      "componentScore": 77.8
    },
    "attendance": {
      "percentage": 83,
      "trend": -1.2,
      "componentScore": 83
    },
    "lms": {
      "loginFrequency": 8,
      "assignmentCompletion": 83.9,
      "courseActivityLevel": "Medium",
      "learningHours": 12.4,
      "activityTrend": -1.7,
      "componentScore": 80.1
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 2,
      "hackathonsParticipated": 1,
      "certificationsCount": 1,
      "extracurricularScore": 71.6,
      "componentScore": 71.6
    },
    "placement": {
      "aptitude": 71,
      "coding": 74.7,
      "mockInterview": 67.2,
      "trainingPct": 63.6,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 71.5
    },
    "skills": {
      "technical": 62.4,
      "soft": 73.5,
      "assessment": 77,
      "projectsCompleted": 1,
      "componentScore": 58.8
    },
    "feedback": {
      "studentSatisfaction": 3.7,
      "facultyFeedbackScore": 65.7,
      "sentiment": "Neutral"
    },
    "successScore": 74,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 19.5,
      "attendance": 12.4,
      "lms": 12,
      "placement": 14.3,
      "skills": 8.8,
      "engagement": 7.2
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.36,
        "band": "MEDIUM",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-3.9%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.06
          }
        ]
      },
      "placement": {
        "probability": 0.66,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "71.0/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "74.7/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1041",
    "name": "Akhil Yadav",
    "department": "CIVIL",
    "year": "3rd Year",
    "semester": 6,
    "section": "C",
    "academic": {
      "cgpa": 6.63,
      "averageMarks": 69.4,
      "backlogs": 0,
      "entryScore": 72.9,
      "previousScore": 92.6,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 70
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 68.8
        }
      ],
      "componentScore": 75.6
    },
    "attendance": {
      "percentage": 74.8,
      "trend": -0.5,
      "componentScore": 74.8
    },
    "lms": {
      "loginFrequency": 16,
      "assignmentCompletion": 73.8,
      "courseActivityLevel": "Medium",
      "learningHours": 11.5,
      "activityTrend": 20.9,
      "componentScore": 72.8
    },
    "engagement": {
      "eventsAttended": 10,
      "clubsCount": 4,
      "hackathonsParticipated": 4,
      "certificationsCount": 2,
      "extracurricularScore": 90.9,
      "componentScore": 90.9
    },
    "placement": {
      "aptitude": 69.3,
      "coding": 87.6,
      "mockInterview": 85.2,
      "trainingPct": 82,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 80.6
    },
    "skills": {
      "technical": 81.1,
      "soft": 84.6,
      "assessment": 80.9,
      "projectsCompleted": 7,
      "componentScore": 86.1
    },
    "feedback": {
      "studentSatisfaction": 4.5,
      "facultyFeedbackScore": 74.7,
      "sentiment": "Positive"
    },
    "successScore": 79,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 18.9,
      "attendance": 11.2,
      "lms": 10.9,
      "placement": 16.1,
      "skills": 12.9,
      "engagement": 9.1
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.36,
        "band": "MEDIUM",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-1.2%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.02
          }
        ]
      },
      "placement": {
        "probability": 0.88,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "69.3/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "87.6/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1042",
    "name": "Ananya Patel",
    "department": "ECE",
    "year": "1st Year",
    "semester": 2,
    "section": "A",
    "academic": {
      "cgpa": 6.16,
      "averageMarks": 47.6,
      "backlogs": 5,
      "entryScore": 65.5,
      "previousScore": 75,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 3,
          "avgMarks": 53.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 2,
          "avgMarks": 41.7
        }
      ],
      "componentScore": 0
    },
    "attendance": {
      "percentage": 49.3,
      "trend": -10,
      "componentScore": 49.3
    },
    "lms": {
      "loginFrequency": 5,
      "assignmentCompletion": 35.7,
      "courseActivityLevel": "Low",
      "learningHours": 2.7,
      "activityTrend": -37,
      "componentScore": 13.3
    },
    "engagement": {
      "eventsAttended": 1,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 38.3,
      "componentScore": 38.3
    },
    "placement": {
      "aptitude": 36.6,
      "coding": 31,
      "mockInterview": 39.3,
      "trainingPct": 29.4,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 35
    },
    "skills": {
      "technical": 38.1,
      "soft": 54.2,
      "assessment": 32.5,
      "projectsCompleted": 0,
      "componentScore": 36.1
    },
    "feedback": {
      "studentSatisfaction": 2.5,
      "facultyFeedbackScore": 43.9,
      "sentiment": "Needs Attention"
    },
    "successScore": 26,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (49.3%)",
      "High backlog burden (5 active backlogs)",
      "Technical coding assessment below benchmark (31.0/100)",
      "Steep decline in LMS portal engagement (-37.0%)",
      "Sub-threshold placement readiness (35.0/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 0,
      "attendance": 7.4,
      "lms": 2,
      "placement": 7,
      "skills": 5.4,
      "engagement": 3.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "5",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.53
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-11.8%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.18
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "33%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.16
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "36.6/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "31.0/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2023-1043",
    "name": "Tanvi Gupta",
    "department": "ECE",
    "year": "2nd Year",
    "semester": 3,
    "section": "A",
    "academic": {
      "cgpa": 8.06,
      "averageMarks": 81.2,
      "backlogs": 0,
      "entryScore": null,
      "previousScore": 85.2,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 80
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 82.5
        }
      ],
      "componentScore": 86.1
    },
    "attendance": {
      "percentage": 85.5,
      "trend": 3.9,
      "componentScore": 85.5
    },
    "lms": {
      "loginFrequency": 12,
      "assignmentCompletion": 82.8,
      "courseActivityLevel": "Medium",
      "learningHours": 11.3,
      "activityTrend": -2.7,
      "componentScore": 75.8
    },
    "engagement": {
      "eventsAttended": 4,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 2,
      "extracurricularScore": 65.2,
      "componentScore": 65.2
    },
    "placement": {
      "aptitude": 61.9,
      "coding": 61.4,
      "mockInterview": 62.1,
      "trainingPct": 75.8,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 61.8
    },
    "skills": {
      "technical": 60.5,
      "soft": 70.9,
      "assessment": 66.6,
      "projectsCompleted": 3,
      "componentScore": 67
    },
    "feedback": {
      "studentSatisfaction": 3.5,
      "facultyFeedbackScore": 80,
      "sentiment": "Positive"
    },
    "successScore": 75,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 21.5,
      "attendance": 12.8,
      "lms": 11.4,
      "placement": 12.4,
      "skills": 10.1,
      "engagement": 6.5
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.19,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.5%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.66,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "61.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "61.4/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1044",
    "name": "Zoya Patel",
    "department": "MECH",
    "year": "3rd Year",
    "semester": 5,
    "section": "B",
    "academic": {
      "cgpa": 7.75,
      "averageMarks": 70.8,
      "backlogs": 0,
      "entryScore": 75.1,
      "previousScore": 93.8,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 69.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 72.1
        }
      ],
      "componentScore": 81.2
    },
    "attendance": {
      "percentage": 79.7,
      "trend": 0.7,
      "componentScore": 79.7
    },
    "lms": {
      "loginFrequency": 9,
      "assignmentCompletion": 77.8,
      "courseActivityLevel": "Medium",
      "learningHours": 13.5,
      "activityTrend": -8.6,
      "componentScore": 78.1
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 1,
      "certificationsCount": 1,
      "extracurricularScore": 58.2,
      "componentScore": 58.2
    },
    "placement": {
      "aptitude": 75,
      "coding": 61.8,
      "mockInterview": 74.2,
      "trainingPct": 70.4,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 69.5
    },
    "skills": {
      "technical": 61.4,
      "soft": 65.1,
      "assessment": 77.2,
      "projectsCompleted": 2,
      "componentScore": 60.4
    },
    "feedback": {
      "studentSatisfaction": 3.5,
      "facultyFeedbackScore": 70.1,
      "sentiment": "Neutral"
    },
    "successScore": 73,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.3,
      "attendance": 12,
      "lms": 11.7,
      "placement": 13.9,
      "skills": 9.1,
      "engagement": 5.8
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.28,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.6%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.64,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "75.0/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "61.8/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2023-1045",
    "name": "Swati Mehta",
    "department": "CIVIL",
    "year": "2nd Year",
    "semester": 3,
    "section": "C",
    "academic": {
      "cgpa": 7.88,
      "averageMarks": 76.8,
      "backlogs": 0,
      "entryScore": 70.9,
      "previousScore": 77.6,
      "tutoringSessions": null,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 75.8
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 77.9
        }
      ],
      "componentScore": 83.8
    },
    "attendance": {
      "percentage": 100,
      "trend": 1.1,
      "componentScore": 100
    },
    "lms": {
      "loginFrequency": 14,
      "assignmentCompletion": 86,
      "courseActivityLevel": "Medium",
      "learningHours": 11.3,
      "activityTrend": 6,
      "componentScore": 78.3
    },
    "engagement": {
      "eventsAttended": 4,
      "clubsCount": 2,
      "hackathonsParticipated": 0,
      "certificationsCount": 2,
      "extracurricularScore": 60.9,
      "componentScore": 60.9
    },
    "placement": {
      "aptitude": 61.2,
      "coding": 59,
      "mockInterview": 66.6,
      "trainingPct": 69.7,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 61.7
    },
    "skills": {
      "technical": 63.7,
      "soft": 71.7,
      "assessment": 65.6,
      "projectsCompleted": 3,
      "componentScore": 68.8
    },
    "feedback": {
      "studentSatisfaction": 3.7,
      "facultyFeedbackScore": 81.8,
      "sentiment": "Positive"
    },
    "successScore": 76,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.9,
      "attendance": 15,
      "lms": 11.7,
      "placement": 12.3,
      "skills": 10.3,
      "engagement": 6.1
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.18,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+2.1%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.03
          }
        ]
      },
      "placement": {
        "probability": 0.61,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "61.2/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "59.0/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1046",
    "name": "Deepika Rao",
    "department": "CSE",
    "year": "3rd Year",
    "semester": 5,
    "section": "A",
    "academic": {
      "cgpa": 5.26,
      "averageMarks": 51,
      "backlogs": 5,
      "entryScore": 60.4,
      "previousScore": 71.9,
      "tutoringSessions": 0,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 57
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 2,
          "avgMarks": 44.9
        }
      ],
      "componentScore": 0
    },
    "attendance": {
      "percentage": 60.7,
      "trend": -5.6,
      "componentScore": 60.7
    },
    "lms": {
      "loginFrequency": 2,
      "assignmentCompletion": 52.6,
      "courseActivityLevel": "Low",
      "learningHours": 4.2,
      "activityTrend": -34.4,
      "componentScore": 27.4
    },
    "engagement": {
      "eventsAttended": 1,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 39.9,
      "componentScore": 39.9
    },
    "placement": {
      "aptitude": 36.9,
      "coding": 36.7,
      "mockInterview": 41.1,
      "trainingPct": 27.2,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 37.9
    },
    "skills": {
      "technical": 44.8,
      "soft": 36,
      "assessment": 37.6,
      "projectsCompleted": 1,
      "componentScore": 37.8
    },
    "feedback": {
      "studentSatisfaction": 2.2,
      "facultyFeedbackScore": 35.2,
      "sentiment": "Needs Attention"
    },
    "successScore": 30,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "High backlog burden (5 active backlogs)",
      "Technical coding assessment below benchmark (36.7/100)",
      "Steep decline in LMS portal engagement (-34.4%)",
      "Sub-threshold placement readiness (37.9/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 0,
      "attendance": 9.1,
      "lms": 4.1,
      "placement": 7.6,
      "skills": 5.7,
      "engagement": 4
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "5",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.53
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-12.1%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.18
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "33%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.16
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "36.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "36.7/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2022-1047",
    "name": "Zoya Mishra",
    "department": "MECH",
    "year": "3rd Year",
    "semester": 6,
    "section": "B",
    "academic": {
      "cgpa": 8.11,
      "averageMarks": 82,
      "backlogs": 0,
      "entryScore": 94.6,
      "previousScore": 69.4,
      "tutoringSessions": 4,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 83.9
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 80.1
        }
      ],
      "componentScore": 85.5
    },
    "attendance": {
      "percentage": 86.6,
      "trend": -2.4,
      "componentScore": 86.6
    },
    "lms": {
      "loginFrequency": 9,
      "assignmentCompletion": 81.7,
      "courseActivityLevel": "Medium",
      "learningHours": 12.8,
      "activityTrend": -2.6,
      "componentScore": 79.9
    },
    "engagement": {
      "eventsAttended": 3,
      "clubsCount": 0,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 52,
      "componentScore": 52
    },
    "placement": {
      "aptitude": 48.4,
      "coding": 35.8,
      "mockInterview": 38.7,
      "trainingPct": 47.8,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 40.9
    },
    "skills": {
      "technical": 54.9,
      "soft": 52.3,
      "assessment": 44.4,
      "projectsCompleted": 0,
      "componentScore": 43
    },
    "feedback": {
      "studentSatisfaction": 3.3,
      "facultyFeedbackScore": 71.8,
      "sentiment": "Neutral"
    },
    "successScore": 66,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules",
    "riskFactors": [
      "Technical coding assessment below benchmark (35.8/100)",
      "Sub-threshold placement readiness (40.9/100)"
    ],
    "segment": "Placement Risk",
    "scoreContributions": {
      "academic": 21.4,
      "attendance": 13,
      "lms": 12,
      "placement": 8.2,
      "skills": 6.5,
      "engagement": 5.2
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.23,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-3.8%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.06
          }
        ]
      },
      "placement": {
        "probability": 0.12,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "48.4/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "35.8/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Rules-Only Alert"
    }
  },
  {
    "studentId": "SC-2023-1048",
    "name": "Pallavi Pandey",
    "department": "MECH",
    "year": "2nd Year",
    "semester": 4,
    "section": "B",
    "academic": {
      "cgpa": 6.97,
      "averageMarks": 70.3,
      "backlogs": 0,
      "entryScore": 71.5,
      "previousScore": 77.1,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 67.8
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 72.8
        }
      ],
      "componentScore": 78.4
    },
    "attendance": {
      "percentage": 78.7,
      "trend": 1.5,
      "componentScore": 78.7
    },
    "lms": {
      "loginFrequency": 10,
      "assignmentCompletion": 78.1,
      "courseActivityLevel": "Medium",
      "learningHours": 12.1,
      "activityTrend": 20.1,
      "componentScore": 76.9
    },
    "engagement": {
      "eventsAttended": 8,
      "clubsCount": 4,
      "hackathonsParticipated": 2,
      "certificationsCount": 5,
      "extracurricularScore": 82.6,
      "componentScore": 82.6
    },
    "placement": {
      "aptitude": 78.1,
      "coding": 87.9,
      "mockInterview": 85.5,
      "trainingPct": 73.3,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 83.9
    },
    "skills": {
      "technical": 89.5,
      "soft": 74.5,
      "assessment": 91.2,
      "projectsCompleted": 3,
      "componentScore": 81.3
    },
    "feedback": {
      "studentSatisfaction": 4,
      "facultyFeedbackScore": 79.1,
      "sentiment": "Positive"
    },
    "successScore": 80,
    "riskLevel": "LOW",
    "ruleRiskLevel": "LOW",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 19.6,
      "attendance": 11.8,
      "lms": 11.5,
      "placement": 16.8,
      "skills": 12.2,
      "engagement": 8.3
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.27,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+5.0%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          }
        ]
      },
      "placement": {
        "probability": 0.86,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "78.1/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "87.9/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2023-1049",
    "name": "Ananya Saxena",
    "department": "IT",
    "year": "2nd Year",
    "semester": 3,
    "section": "C",
    "academic": {
      "cgpa": 7.33,
      "averageMarks": 73.7,
      "backlogs": 0,
      "entryScore": 94.2,
      "previousScore": 94.3,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 73.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 73.8
        }
      ],
      "componentScore": 80.2
    },
    "attendance": {
      "percentage": 79.6,
      "trend": 1.4,
      "componentScore": 79.6
    },
    "lms": {
      "loginFrequency": 11,
      "assignmentCompletion": 81,
      "courseActivityLevel": "Medium",
      "learningHours": 9.2,
      "activityTrend": -3.8,
      "componentScore": 67.9
    },
    "engagement": {
      "eventsAttended": 6,
      "clubsCount": 2,
      "hackathonsParticipated": 0,
      "certificationsCount": 2,
      "extracurricularScore": 70.4,
      "componentScore": 70.4
    },
    "placement": {
      "aptitude": 71.3,
      "coding": 69.7,
      "mockInterview": 67.3,
      "trainingPct": 69.6,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 69.7
    },
    "skills": {
      "technical": 70.1,
      "soft": 77,
      "assessment": 73,
      "projectsCompleted": 2,
      "componentScore": 68.5
    },
    "feedback": {
      "studentSatisfaction": 3.5,
      "facultyFeedbackScore": 76.5,
      "sentiment": "Positive"
    },
    "successScore": 73,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20,
      "attendance": 11.9,
      "lms": 10.2,
      "placement": 13.9,
      "skills": 10.3,
      "engagement": 7
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.29,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+0.3%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.69,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "71.3/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "69.7/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1050",
    "name": "Pallavi Patel",
    "department": "CSE",
    "year": "1st Year",
    "semester": 2,
    "section": "A",
    "academic": {
      "cgpa": 8.68,
      "averageMarks": 91.3,
      "backlogs": 0,
      "entryScore": 67.8,
      "previousScore": 92.5,
      "tutoringSessions": null,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 89.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 93.1
        }
      ],
      "componentScore": 92.3
    },
    "attendance": {
      "percentage": 94.4,
      "trend": -0.7,
      "componentScore": 94.4
    },
    "lms": {
      "loginFrequency": 19,
      "assignmentCompletion": 90.9,
      "courseActivityLevel": "High",
      "learningHours": 20.7,
      "activityTrend": 13.3,
      "componentScore": 95.5
    },
    "engagement": {
      "eventsAttended": 7,
      "clubsCount": 2,
      "hackathonsParticipated": 1,
      "certificationsCount": 5,
      "extracurricularScore": 85,
      "componentScore": 85
    },
    "placement": {
      "aptitude": 87.6,
      "coding": 90.3,
      "mockInterview": 82.1,
      "trainingPct": 99.5,
      "status": "Ready",
      "internshipExperience": 1,
      "componentScore": 97.3
    },
    "skills": {
      "technical": 84.2,
      "soft": 89.1,
      "assessment": 94.3,
      "projectsCompleted": 6,
      "componentScore": 89.1
    },
    "feedback": {
      "studentSatisfaction": 4.5,
      "facultyFeedbackScore": 87.6,
      "sentiment": "Positive"
    },
    "successScore": 93,
    "riskLevel": "LOW",
    "ruleRiskLevel": "LOW",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 23.1,
      "attendance": 14.2,
      "lms": 14.3,
      "placement": 19.5,
      "skills": 13.4,
      "engagement": 8.5
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.11,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+3.6%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.95,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "87.6/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "90.3/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "Yes",
            "impact": "raises_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1051",
    "name": "Vikas Thakur",
    "department": "CSE",
    "year": "3rd Year",
    "semester": 6,
    "section": "A",
    "academic": {
      "cgpa": 7.8,
      "averageMarks": 72,
      "backlogs": 1,
      "entryScore": 83.7,
      "previousScore": null,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 75.9
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 68
        }
      ],
      "componentScore": 59.7
    },
    "attendance": {
      "percentage": 64.7,
      "trend": -9.5,
      "componentScore": 64.7
    },
    "lms": {
      "loginFrequency": 4,
      "assignmentCompletion": 62.5,
      "courseActivityLevel": "Low",
      "learningHours": 3,
      "activityTrend": -42.3,
      "componentScore": 25.8
    },
    "engagement": {
      "eventsAttended": 0,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 42.1,
      "componentScore": 42.1
    },
    "placement": {
      "aptitude": 69.8,
      "coding": 57.2,
      "mockInterview": 53.4,
      "trainingPct": 58.8,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 60.7
    },
    "skills": {
      "technical": 63.6,
      "soft": 55.5,
      "assessment": 49.5,
      "projectsCompleted": 1,
      "componentScore": 53
    },
    "feedback": {
      "studentSatisfaction": 2.6,
      "facultyFeedbackScore": 60.4,
      "sentiment": "Needs Attention"
    },
    "successScore": 53,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Steep decline in LMS portal engagement (-42.3%)",
      "Model confirms elevated academic risk (probability 0.78)"
    ],
    "segment": "Engagement Risk",
    "scoreContributions": {
      "academic": 14.9,
      "attendance": 9.7,
      "lms": 3.9,
      "placement": 12.1,
      "skills": 8,
      "engagement": 4.2
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.78,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-7.9%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.12
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "66%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.05
          },
          {
            "feature": "Active Backlog Count",
            "value": "1",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.43,
        "band": "UNCERTAIN",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "69.8/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "57.2/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2023-1052",
    "name": "Ishaan Singh",
    "department": "ECE",
    "year": "2nd Year",
    "semester": 4,
    "section": "B",
    "academic": {
      "cgpa": 6.97,
      "averageMarks": 70.5,
      "backlogs": 0,
      "entryScore": 69.7,
      "previousScore": 94.4,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 71.8
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 69.3
        }
      ],
      "componentScore": 77.1
    },
    "attendance": {
      "percentage": 81.2,
      "trend": -3.9,
      "componentScore": 81.2
    },
    "lms": {
      "loginFrequency": 16,
      "assignmentCompletion": 72,
      "courseActivityLevel": "Medium",
      "learningHours": 16,
      "activityTrend": 26.9,
      "componentScore": 86
    },
    "engagement": {
      "eventsAttended": 9,
      "clubsCount": 4,
      "hackathonsParticipated": 6,
      "certificationsCount": 2,
      "extracurricularScore": 83.9,
      "componentScore": 83.9
    },
    "placement": {
      "aptitude": 73.8,
      "coding": 81.8,
      "mockInterview": 82.7,
      "trainingPct": 80.2,
      "status": "In Progress",
      "internshipExperience": 0,
      "componentScore": 79.2
    },
    "skills": {
      "technical": 82.2,
      "soft": 85,
      "assessment": 90.8,
      "projectsCompleted": 5,
      "componentScore": 86.7
    },
    "feedback": {
      "studentSatisfaction": 4.5,
      "facultyFeedbackScore": 82.2,
      "sentiment": "Positive"
    },
    "successScore": 82,
    "riskLevel": "LOW",
    "ruleRiskLevel": "LOW",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 19.3,
      "attendance": 12.2,
      "lms": 12.9,
      "placement": 15.8,
      "skills": 13,
      "engagement": 8.4
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.34,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-2.5%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.9,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "73.8/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "81.8/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1053",
    "name": "Swati Chopra",
    "department": "AI_DS",
    "year": "1st Year",
    "semester": 2,
    "section": "C",
    "academic": {
      "cgpa": 7.86,
      "averageMarks": 74.4,
      "backlogs": 0,
      "entryScore": null,
      "previousScore": 88.7,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 74.3
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 74.5
        }
      ],
      "componentScore": 82.5
    },
    "attendance": {
      "percentage": 77.1,
      "trend": 3.3,
      "componentScore": 77.1
    },
    "lms": {
      "loginFrequency": 8,
      "assignmentCompletion": 71.1,
      "courseActivityLevel": "Medium",
      "learningHours": 11.3,
      "activityTrend": 2.6,
      "componentScore": 70.9
    },
    "engagement": {
      "eventsAttended": 6,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 2,
      "extracurricularScore": 72.1,
      "componentScore": 72.1
    },
    "placement": {
      "aptitude": 67.1,
      "coding": 69.6,
      "mockInterview": 70.8,
      "trainingPct": 69.8,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 69
    },
    "skills": {
      "technical": 76.2,
      "soft": 69.1,
      "assessment": 61,
      "projectsCompleted": 1,
      "componentScore": 63.5
    },
    "feedback": {
      "studentSatisfaction": 3.9,
      "facultyFeedbackScore": 72.8,
      "sentiment": "Positive"
    },
    "successScore": 73,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.6,
      "attendance": 11.6,
      "lms": 10.6,
      "placement": 13.8,
      "skills": 9.5,
      "engagement": 7.2
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.29,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+0.2%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0
          }
        ]
      },
      "placement": {
        "probability": 0.63,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "67.1/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "69.6/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2022-1054",
    "name": "Aarav Thakur",
    "department": "ECE",
    "year": "3rd Year",
    "semester": 5,
    "section": "B",
    "academic": {
      "cgpa": 5.92,
      "averageMarks": 56.2,
      "backlogs": 6,
      "entryScore": 76.5,
      "previousScore": 85.7,
      "tutoringSessions": 0,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 3,
          "avgMarks": 63.2
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 1,
          "avgMarks": 49.3
        }
      ],
      "componentScore": 0
    },
    "attendance": {
      "percentage": 51.4,
      "trend": -11.3,
      "componentScore": 51.4
    },
    "lms": {
      "loginFrequency": 2,
      "assignmentCompletion": 52.7,
      "courseActivityLevel": "Low",
      "learningHours": 5.4,
      "activityTrend": -15.9,
      "componentScore": 37.7
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 36.2,
      "componentScore": 36.2
    },
    "placement": {
      "aptitude": 53.7,
      "coding": 37.9,
      "mockInterview": 50.3,
      "trainingPct": 31.3,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 46.5
    },
    "skills": {
      "technical": 33.8,
      "soft": 54.3,
      "assessment": 49.5,
      "projectsCompleted": 0,
      "componentScore": 34.2
    },
    "feedback": {
      "studentSatisfaction": 2.7,
      "facultyFeedbackScore": 43,
      "sentiment": "Needs Attention"
    },
    "successScore": 31,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (51.4%)",
      "High backlog burden (6 active backlogs)",
      "Technical coding assessment below benchmark (37.9/100)",
      "Sub-threshold placement readiness (46.5/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 0,
      "attendance": 7.7,
      "lms": 5.6,
      "placement": 9.3,
      "skills": 5.1,
      "engagement": 3.6
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "6",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.65
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "16%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.21
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-13.9%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.21
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "53.7/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "37.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2024-1055",
    "name": "Nikhil Iyer",
    "department": "CSE",
    "year": "1st Year",
    "semester": 2,
    "section": "B",
    "academic": {
      "cgpa": 7.28,
      "averageMarks": 71.8,
      "backlogs": 0,
      "entryScore": 91.7,
      "previousScore": 79.9,
      "tutoringSessions": 2,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 70.3
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 73.3
        }
      ],
      "componentScore": 79.8
    },
    "attendance": {
      "percentage": 82.7,
      "trend": -3.7,
      "componentScore": 82.7
    },
    "lms": {
      "loginFrequency": 13,
      "assignmentCompletion": 81.1,
      "courseActivityLevel": "Medium",
      "learningHours": 13.6,
      "activityTrend": 12.2,
      "componentScore": 83
    },
    "engagement": {
      "eventsAttended": 3,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 66.9,
      "componentScore": 66.9
    },
    "placement": {
      "aptitude": 67.1,
      "coding": 69.4,
      "mockInterview": 73.1,
      "trainingPct": 64.9,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 69.5
    },
    "skills": {
      "technical": 60.8,
      "soft": 69,
      "assessment": 69.7,
      "projectsCompleted": 1,
      "componentScore": 56.5
    },
    "feedback": {
      "studentSatisfaction": 3.5,
      "facultyFeedbackScore": 81.9,
      "sentiment": "Positive"
    },
    "successScore": 74,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 19.9,
      "attendance": 12.4,
      "lms": 12.5,
      "placement": 13.9,
      "skills": 8.5,
      "engagement": 6.7
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.26,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+3.0%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.55,
        "band": "UNCERTAIN",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "67.1/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "69.4/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1056",
    "name": "Gaurav Agarwal",
    "department": "CSE",
    "year": "1st Year",
    "semester": 1,
    "section": "A",
    "academic": {
      "cgpa": 5.69,
      "averageMarks": 58.1,
      "backlogs": 6,
      "entryScore": 60.4,
      "previousScore": 65.7,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 5,
          "avgMarks": 62.9
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 4,
          "avgMarks": 53.3
        }
      ],
      "componentScore": 0
    },
    "attendance": {
      "percentage": 42.9,
      "trend": -10.5,
      "componentScore": 42.9
    },
    "lms": {
      "loginFrequency": 6,
      "assignmentCompletion": 50.4,
      "courseActivityLevel": "Low",
      "learningHours": 5.5,
      "activityTrend": -42.3,
      "componentScore": 27.6
    },
    "engagement": {
      "eventsAttended": 1,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 0,
      "extracurricularScore": 29.5,
      "componentScore": 29.5
    },
    "placement": {
      "aptitude": 42.9,
      "coding": 44.6,
      "mockInterview": 41.5,
      "trainingPct": 45.5,
      "status": "Not Ready",
      "internshipExperience": 0,
      "componentScore": 43.2
    },
    "skills": {
      "technical": 38.6,
      "soft": 49.2,
      "assessment": 48.1,
      "projectsCompleted": 0,
      "componentScore": 34.6
    },
    "feedback": {
      "studentSatisfaction": 2.6,
      "facultyFeedbackScore": 57.3,
      "sentiment": "Needs Attention"
    },
    "successScore": 27,
    "riskLevel": "HIGH",
    "ruleRiskLevel": "HIGH",
    "riskSource": "rules+ml",
    "riskFactors": [
      "Attendance critically low (42.9%)",
      "High backlog burden (6 active backlogs)",
      "Technical coding assessment below benchmark (44.6/100)",
      "Steep decline in LMS portal engagement (-42.3%)",
      "Sub-threshold placement readiness (43.2/100)",
      "Model confirms elevated academic risk (probability 0.96)"
    ],
    "segment": "Academic Risk",
    "scoreContributions": {
      "academic": 0,
      "attendance": 6.4,
      "lms": 4.1,
      "placement": 8.6,
      "skills": 5.2,
      "engagement": 3
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.96,
        "band": "HIGH",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "6",
            "benchmark": "0.6 typical",
            "impact": "raises_risk",
            "weight": 0.65
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-9.6%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.14
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "66%",
            "benchmark": "82% typical",
            "impact": "raises_risk",
            "weight": 0.05
          }
        ]
      },
      "placement": {
        "probability": 0.05,
        "band": "UNLIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "42.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "44.6/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Confirmed High"
    }
  },
  {
    "studentId": "SC-2021-1057",
    "name": "Bhavna Mishra",
    "department": "AI_DS",
    "year": "4th Year",
    "semester": 8,
    "section": "C",
    "academic": {
      "cgpa": 7.65,
      "averageMarks": 77.2,
      "backlogs": 0,
      "entryScore": 69.4,
      "previousScore": 75.7,
      "tutoringSessions": 3,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 78.5
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 76
        }
      ],
      "componentScore": 82.2
    },
    "attendance": {
      "percentage": 82.7,
      "trend": 1.8,
      "componentScore": 82.7
    },
    "lms": {
      "loginFrequency": 15,
      "assignmentCompletion": 73.9,
      "courseActivityLevel": "Medium",
      "learningHours": 9.3,
      "activityTrend": 12.7,
      "componentScore": 66
    },
    "engagement": {
      "eventsAttended": 4,
      "clubsCount": 1,
      "hackathonsParticipated": 0,
      "certificationsCount": 1,
      "extracurricularScore": 74.2,
      "componentScore": 74.2
    },
    "placement": {
      "aptitude": 61.9,
      "coding": 75,
      "mockInterview": 67.2,
      "trainingPct": 64.9,
      "status": "Placed",
      "internshipExperience": 0,
      "componentScore": 68.5
    },
    "skills": {
      "technical": 76.5,
      "soft": 70.8,
      "assessment": 74,
      "projectsCompleted": 2,
      "componentScore": 69.2
    },
    "feedback": {
      "studentSatisfaction": 3.9,
      "facultyFeedbackScore": 76,
      "sentiment": "Positive"
    },
    "successScore": 74,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.6,
      "attendance": 12.4,
      "lms": 9.9,
      "placement": 13.7,
      "skills": 10.4,
      "engagement": 7.4
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.27,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-2.5%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.04
          }
        ]
      },
      "placement": {
        "probability": 0.67,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "61.9/100",
            "impact": "lowers_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "75.0/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2021-1058",
    "name": "Pooja Menon",
    "department": "IT",
    "year": "4th Year",
    "semester": 8,
    "section": "A",
    "academic": {
      "cgpa": 7.59,
      "averageMarks": 75,
      "backlogs": 0,
      "entryScore": 88.6,
      "previousScore": null,
      "tutoringSessions": 0,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 76.9
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 73
        }
      ],
      "componentScore": 80.9
    },
    "attendance": {
      "percentage": 79.7,
      "trend": 0.7,
      "componentScore": 79.7
    },
    "lms": {
      "loginFrequency": 13,
      "assignmentCompletion": 75.3,
      "courseActivityLevel": "Medium",
      "learningHours": 9.2,
      "activityTrend": -4.2,
      "componentScore": 64.9
    },
    "engagement": {
      "eventsAttended": 6,
      "clubsCount": 1,
      "hackathonsParticipated": 1,
      "certificationsCount": 2,
      "extracurricularScore": 60.1,
      "componentScore": 60.1
    },
    "placement": {
      "aptitude": 73.1,
      "coding": 74.4,
      "mockInterview": 69.6,
      "trainingPct": 69.8,
      "status": "Ready",
      "internshipExperience": 1,
      "componentScore": 82.7
    },
    "skills": {
      "technical": 63,
      "soft": 73.5,
      "assessment": 68.8,
      "projectsCompleted": 3,
      "componentScore": 69.1
    },
    "feedback": {
      "studentSatisfaction": 4.4,
      "facultyFeedbackScore": 81.3,
      "sentiment": "Positive"
    },
    "successScore": 75,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "High Performers",
    "scoreContributions": {
      "academic": 20.2,
      "attendance": 12,
      "lms": 9.7,
      "placement": 16.5,
      "skills": 10.4,
      "engagement": 6
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.32,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "-3.9%",
            "benchmark": "+0.8% typical",
            "impact": "raises_risk",
            "weight": 0.06
          }
        ]
      },
      "placement": {
        "probability": 0.9,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "73.1/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "74.4/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "Yes",
            "impact": "raises_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  },
  {
    "studentId": "SC-2024-1059",
    "name": "Sahil Kumar",
    "department": "MECH",
    "year": "1st Year",
    "semester": 1,
    "section": "A",
    "academic": {
      "cgpa": 7.51,
      "averageMarks": 69.2,
      "backlogs": 0,
      "entryScore": 70.9,
      "previousScore": 73.4,
      "tutoringSessions": 1,
      "semesterHistory": [
        {
          "slot": "prev",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 68.7
        },
        {
          "slot": "last",
          "unitsEnrolled": 6,
          "unitsPassed": 6,
          "avgMarks": 69.8
        }
      ],
      "componentScore": 79.5
    },
    "attendance": {
      "percentage": 85.1,
      "trend": 3.3,
      "componentScore": 85.1
    },
    "lms": {
      "loginFrequency": 14,
      "assignmentCompletion": 70.3,
      "courseActivityLevel": "Medium",
      "learningHours": 11.2,
      "activityTrend": 0.3,
      "componentScore": 70.2
    },
    "engagement": {
      "eventsAttended": 2,
      "clubsCount": 2,
      "hackathonsParticipated": 1,
      "certificationsCount": 1,
      "extracurricularScore": 65,
      "componentScore": 65
    },
    "placement": {
      "aptitude": 71.2,
      "coding": 65.3,
      "mockInterview": 74.1,
      "trainingPct": 63.6,
      "status": "Ready",
      "internshipExperience": 0,
      "componentScore": 69.6
    },
    "skills": {
      "technical": 76.5,
      "soft": 70.4,
      "assessment": 64.3,
      "projectsCompleted": 3,
      "componentScore": 74.1
    },
    "feedback": {
      "studentSatisfaction": 3.9,
      "facultyFeedbackScore": 78.9,
      "sentiment": "Positive"
    },
    "successScore": 75,
    "riskLevel": "MEDIUM",
    "ruleRiskLevel": "MEDIUM",
    "riskSource": "rules",
    "riskFactors": [],
    "segment": "Hidden Potential",
    "scoreContributions": {
      "academic": 19.9,
      "attendance": 12.8,
      "lms": 10.5,
      "placement": 13.9,
      "skills": 11.1,
      "engagement": 6.5
    },
    "ml": {
      "status": "ok",
      "source": "snapshot",
      "modelVersions": {
        "academic": "v2.0-d1-histgradient",
        "placement": "v2.0-d3-randomforest",
        "exam": "v2.0-d2-ridge"
      },
      "scoredAt": "2026-10-08T12:00:00Z",
      "coverage": 1,
      "academicRisk": {
        "probability": 0.29,
        "band": "LOW",
        "topFactors": [
          {
            "feature": "Active Backlog Count",
            "value": "0",
            "benchmark": "0.6 typical",
            "impact": "lowers_risk",
            "weight": 0.07
          },
          {
            "feature": "Latest Semester Pass Ratio",
            "value": "100%",
            "benchmark": "82% typical",
            "impact": "lowers_risk",
            "weight": 0.06
          },
          {
            "feature": "Semester-over-Semester Marks Delta",
            "value": "+1.1%",
            "benchmark": "+0.8% typical",
            "impact": "lowers_risk",
            "weight": 0.02
          }
        ]
      },
      "placement": {
        "probability": 0.7,
        "band": "LIKELY",
        "topFactors": [
          {
            "feature": "Aptitude Assessment",
            "value": "71.2/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Technical Coding Score",
            "value": "65.3/100",
            "impact": "raises_likelihood"
          },
          {
            "feature": "Prior Internship",
            "value": "No",
            "impact": "lowers_likelihood"
          }
        ]
      },
      "agreement": "Aligned"
    }
  }
];
export default sampleStudents;
