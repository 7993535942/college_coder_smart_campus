# SmartCampus AI — Data Dictionary

This document describes all attributes present in the unified student dataset (`data/demo_students.csv` and MongoDB `Student` collection).

---

## 1. Identifiers & Institutional Metadata

| Column / Attribute | Type | Description | Allowed Values / Range | Example |
| :--- | :--- | :--- | :--- | :--- |
| `student_id` | String | Unique institutional student identifier | `SC-YYYY-XXXX` | `SC-2023-0142` |
| `name` | String | Full name of student | Real-sounding synthetic names | `Rahul Kumar` |
| `department` | String | Academic department / major | `CSE`, `ECE`, `IT`, `MECH`, `CIVIL`, `AI_DS` | `CSE` |
| `year` | String | Current academic year | `1st Year`, `2nd Year`, `3rd Year`, `4th Year` | `3rd Year` |
| `semester` | Integer | Current semester number | 1 to 8 | `6` |
| `section` | String | Class section division | `A`, `B`, `C` | `A` |

---

## 2. Academic Performance

| Column / Attribute | Type | Description | Range | Example |
| :--- | :--- | :--- | :--- | :--- |
| `cgpa` | Float | Cumulative Grade Point Average | 0.0 – 10.0 | `6.8` |
| `average_marks` | Float | Overall average percentage marks | 0.0 – 100.0 | `64.5` |
| `backlogs` | Integer | Count of currently active backlogs / failed courses | 0 – 15 | `3` |
| `sem_prev_units_enrolled` | Integer | Total units/credits enrolled in previous semester | 0 – 30 | `6` |
| `sem_prev_units_passed` | Integer | Total units/credits passed in previous semester | 0 – `units_enrolled` | `5` |
| `sem_prev_avg_marks` | Float | Average marks obtained in previous semester | 0.0 – 100.0 | `66.0` |
| `sem_last_units_enrolled` | Integer | Total units/credits enrolled in latest completed semester | 0 – 30 | `6` |
| `sem_last_units_passed` | Integer | Total units/credits passed in latest completed semester | 0 – `units_enrolled` | `3` |
| `sem_last_avg_marks` | Float | Average marks obtained in latest completed semester | 0.0 – 100.0 | `58.0` |
| `entry_score` | Float | Institutional entrance test score (Optional) | 0.0 – 100.0 | `62.0` |
| `previous_score` | Float | Prior qualification (12th/diploma) score (Optional) | 0.0 – 100.0 | `65.0` |
| `tutoring_sessions` | Integer | Monthly remedial tutoring sessions attended | 0 – 15 | `1` |

---

## 3. Attendance & LMS Engagement

| Column / Attribute | Type | Description | Range | Example |
| :--- | :--- | :--- | :--- | :--- |
| `attendance_percentage` | Float | Overall biometric attendance percentage | 0.0 – 100.0% | `58.0` |
| `attendance_trend` | Float | Monthly percentage point change in attendance | -30.0% to +30.0% | `-5.2` |
| `lms_login_frequency` | Integer | Average weekly LMS portal logins | 0 – 50 | `4` |
| `assignment_completion` | Float | Homework and lab submission rate | 0.0 – 100.0% | `52.0` |
| `course_activity_level` | String | Overall categorical portal activity | `Low`, `Medium`, `High` | `Low` |
| `learning_hours` | Float | Weekly self-directed LMS study hours | 0.0 – 50.0 hrs | `4.5` |
| `lms_activity_trend` | Float | 6-month LMS activity trend percentage change | -100% to +100% | `-42.0` |

---

## 4. Extracurricular & Campus Engagement

| Column / Attribute | Type | Description | Range | Example |
| :--- | :--- | :--- | :--- | :--- |
| `events_attended` | Integer | College events/workshops attended in current year | 0 – 25 | `2` |
| `clubs_count` | Integer | Active student club memberships | 0 – 5 | `1` |
| `hackathons_participated`| Integer | Hackathons or project expos participated | 0 – 10 | `0` |
| `certifications_count` | Integer | Industry/professional certifications completed | 0 – 10 | `1` |
| `extracurricular_score` | Float | Aggregated engagement and leadership score | 0.0 – 100.0 | `70.0` |

---

## 5. Placement Readiness & Skills

| Column / Attribute | Type | Description | Range | Example |
| :--- | :--- | :--- | :--- | :--- |
| `aptitude_score` | Float | Quantitative & logical reasoning test score | 0.0 – 100.0 | `62.0` |
| `coding_score` | Float | Technical DSA and programming assessment score | 0.0 – 100.0 | `48.0` |
| `mock_interview_score` | Float | Behavioral & technical mock interview score | 0.0 – 100.0 | `54.0` |
| `placement_training_pct`| Float | Percentage of institutional placement modules completed | 0.0 – 100.0% | `45.0` |
| `placement_status` | String | Current recruitment readiness status | `Not Ready`, `In Progress`, `Ready`, `Placed` | `Not Ready` |
| `internship_experience` | Integer | Flag indicating prior completed internship | `0` (No), `1` (Yes) | `0` |
| `technical_skill_score` | Float | Technical skills matrix score | 0.0 – 100.0 | `50.0` |
| `soft_skill_score` | Float | Communication & presentation skill score | 0.0 – 100.0 | `58.0` |
| `skill_assessment_score`| Float | General skill diagnostic score | 0.0 – 100.0 | `52.0` |
| `projects_completed` | Integer | Verified capstone/technical projects completed | 0 – 20 | `1` |

---

## 6. Feedback & Sentiment

| Column / Attribute | Type | Description | Range | Example |
| :--- | :--- | :--- | :--- | :--- |
| `student_satisfaction` | Float | Student self-reported course survey rating | 1.0 – 5.0 | `3.2` |
| `faculty_feedback_score`| Float | Mentor/faculty behavioral appraisal score | 0.0 – 100.0 | `60.0` |
| `feedback_sentiment` | String | Overall sentiment indicator | `Positive`, `Neutral`, `Needs Attention` | `Needs Attention` |
