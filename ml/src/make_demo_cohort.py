"""SmartCampus AI - Synthetic Demo Cohort Generator (v2).

Generates:
1. data/demo_students.csv (1,250 rows with intentional real-world data quality anomalies)
2. data/demo_seed_scored.json (Full MongoDB-ready snapshot with rules + ML pre-scored)

Includes the canonical scripted demo student: Rahul Kumar (CSE, 3rd Year).
"""

import os
import json
import random
import math
import pandas as pd
import numpy as np

# Set deterministic seed
RANDOM_SEED = 42
random.seed(RANDOM_SEED)
np.random.seed(RANDOM_SEED)

FIRST_NAMES = [
    "Aarav", "Aditi", "Akhil", "Ananya", "Arjun", "Bhavna", "Chirag", "Deepika",
    "Divya", "Gaurav", "Harsh", "Isha", "Ishaan", "Kavya", "Karan", "Kunal",
    "Manish", "Meera", "Neha", "Nikhil", "Pooja", "Pranav", "Priya", "Rahul",
    "Rohan", "Riya", "Sahil", "Sanya", "Shreya", "Siddharth", "Sneha", "Tanvi",
    "Utkarsh", "Varun", "Vikas", "Yash", "Zoya", "Aniket", "Swati", "Rakesh",
    "Nisha", "Aditya", "Tarun", "Kritika", "Suresh", "Pallavi", "Mohit", "Aayush"
]

LAST_NAMES = [
    "Sharma", "Verma", "Patel", "Reddy", "Kumar", "Singh", "Gupta", "Joshi",
    "Rao", "Nair", "Mehta", "Chopra", "Das", "Bose", "Iyer", "Deshmukh",
    "Pillai", "Mishra", "Pandey", "Bhat", "Kulkarni", "Agarwal", "Saxena",
    "Thakur", "Yadav", "Malhotra", "Kapoor", "Chatterjee", "Shenoy", "Menon"
]

DEPARTMENTS = ["CSE", "ECE", "IT", "MECH", "CIVIL", "AI_DS"]
DEPT_WEIGHTS = [0.30, 0.22, 0.18, 0.12, 0.08, 0.10]

YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"]
YEAR_WEIGHTS = [0.26, 0.28, 0.26, 0.20]

SECTIONS = ["A", "B", "C"]


def generate_cohort(total_count=1250):
    students_raw = []
    
    # 1. Scripted Demo Student: Rahul Kumar
    rahul = {
        "student_id": "SC-2023-0142",
        "name": "Rahul Kumar",
        "department": "CSE",
        "year": "3rd Year",
        "semester": 6,
        "section": "A",
        # Academic
        "cgpa": 6.8,
        "average_marks": 64.0,
        "backlogs": 3,
        "sem_prev_units_enrolled": 6,
        "sem_prev_units_passed": 5,
        "sem_prev_avg_marks": 66.0,
        "sem_last_units_enrolled": 6,
        "sem_last_units_passed": 3,
        "sem_last_avg_marks": 58.0,
        "entry_score": 62.0,
        "previous_score": 65.0,
        "tutoring_sessions": 1,
        # Attendance & LMS
        "attendance_percentage": 58.0,
        "attendance_trend": -5.4,
        "lms_login_frequency": 4,
        "assignment_completion": 52.0,
        "course_activity_level": "Low",
        "learning_hours": 4.5,
        "lms_activity_trend": -42.0,
        # Engagement
        "events_attended": 3,
        "clubs_count": 2,
        "hackathons_participated": 1,
        "certifications_count": 1,
        "extracurricular_score": 70.0,
        # Placement & Skills
        "aptitude_score": 62.0,
        "coding_score": 48.0,
        "mock_interview_score": 50.0,
        "placement_training_pct": 45.0,
        "placement_status": "Not Ready",
        "internship_experience": 0,
        "technical_skill_score": 50.0,
        "soft_skill_score": 58.0,
        "skill_assessment_score": 52.0,
        "projects_completed": 1,
        # Feedback
        "student_satisfaction": 3.2,
        "faculty_feedback_score": 58.0,
        "feedback_sentiment": "Needs Attention",
        "persona": "Academic Risk",
        "is_scripted": True
    }
    students_raw.append(rahul)

    # 2. Generate remaining students across 6 archetypes
    personas = [
        ("High Performer", 0.18),
        ("Academic Risk", 0.10),
        ("Placement Risk", 0.15),
        ("Hidden Potential", 0.14),
        ("Engagement Risk", 0.12),
        ("Average Student", 0.31)
    ]

    used_names = {"Rahul Kumar"}
    
    for i in range(1, total_count):
        # Pick persona
        r = random.random()
        cumulative = 0.0
        selected_persona = "Average Student"
        for persona_name, weight in personas:
            cumulative += weight
            if r <= cumulative:
                selected_persona = persona_name
                break

        # Generate unique name
        while True:
            fn = random.choice(FIRST_NAMES)
            ln = random.choice(LAST_NAMES)
            full_name = f"{fn} {ln}"
            if full_name not in used_names or len(used_names) > 800:
                used_names.add(full_name)
                break

        dept = np.random.choice(DEPARTMENTS, p=DEPT_WEIGHTS)
        year = np.random.choice(YEARS, p=YEAR_WEIGHTS)
        sem_map = {"1st Year": random.choice([1, 2]), "2nd Year": random.choice([3, 4]), "3rd Year": random.choice([5, 6]), "4th Year": random.choice([7, 8])}
        semester = sem_map[year]
        section = random.choice(SECTIONS)
        student_id = f"SC-202{4 - int(year[0]) + 1}-{1000 + i}"

        # Persona-conditioned attributes
        if selected_persona == "High Performer":
            cgpa = round(random.uniform(8.4, 9.8), 2)
            backlogs = 0
            sem_prev_units = 6
            sem_prev_passed = 6
            sem_prev_marks = round(random.uniform(82.0, 96.0), 1)
            sem_last_units = 6
            sem_last_passed = 6
            sem_last_marks = round(min(100.0, sem_prev_marks + random.uniform(-2.0, 4.0)), 1)
            avg_marks = round((sem_prev_marks + sem_last_marks) / 2.0, 1)

            att_pct = round(random.uniform(86.0, 98.0), 1)
            att_trend = round(random.uniform(-1.5, 4.0), 1)
            lms_login = random.randint(12, 28)
            assignment_comp = round(random.uniform(88.0, 100.0), 1)
            course_act = "High"
            learn_hrs = round(random.uniform(14.0, 24.0), 1)
            lms_trend = round(random.uniform(0.0, 25.0), 1)

            events = random.randint(4, 12)
            clubs = random.randint(2, 4)
            hackathons = random.randint(1, 5)
            certs = random.randint(2, 6)
            extra_score = round(random.uniform(80.0, 95.0), 1)

            aptitude = round(random.uniform(80.0, 96.0), 1)
            coding = round(random.uniform(78.0, 96.0), 1)
            mock = round(random.uniform(80.0, 95.0), 1)
            placement_training = round(random.uniform(85.0, 100.0), 1)
            placement_status = "Placed" if year == "4th Year" and random.random() > 0.3 else "Ready"
            internship = 1 if (year in ["3rd Year", "4th Year"] and random.random() > 0.25) else (1 if random.random() > 0.7 else 0)

            tech_skill = round(random.uniform(82.0, 96.0), 1)
            soft_skill = round(random.uniform(80.0, 94.0), 1)
            skill_assess = round(random.uniform(82.0, 96.0), 1)
            projects = random.randint(3, 7)

            satisfaction = round(random.uniform(4.0, 5.0), 1)
            faculty_feedback = round(random.uniform(85.0, 98.0), 1)
            sentiment = "Positive"

        elif selected_persona == "Academic Risk":
            cgpa = round(random.uniform(4.8, 6.4), 2)
            backlogs = random.randint(2, 6)
            sem_prev_units = 6
            sem_prev_passed = random.randint(3, 5)
            sem_prev_marks = round(random.uniform(52.0, 64.0), 1)
            sem_last_units = 6
            sem_last_passed = random.randint(1, 4)
            sem_last_marks = round(max(35.0, sem_prev_marks - random.uniform(4.0, 14.0)), 1)
            avg_marks = round((sem_prev_marks + sem_last_marks) / 2.0, 1)

            att_pct = round(random.uniform(42.0, 62.0), 1)
            att_trend = round(random.uniform(-15.0, -2.0), 1)
            lms_login = random.randint(1, 6)
            assignment_comp = round(random.uniform(35.0, 58.0), 1)
            course_act = "Low"
            learn_hrs = round(random.uniform(2.0, 6.5), 1)
            lms_trend = round(random.uniform(-55.0, -15.0), 1)

            events = random.randint(0, 2)
            clubs = random.randint(0, 1)
            hackathons = 0
            certs = 0
            extra_score = round(random.uniform(25.0, 55.0), 1)

            aptitude = round(random.uniform(35.0, 56.0), 1)
            coding = round(random.uniform(28.0, 50.0), 1)
            mock = round(random.uniform(32.0, 52.0), 1)
            placement_training = round(random.uniform(20.0, 50.0), 1)
            placement_status = "Not Ready"
            internship = 0

            tech_skill = round(random.uniform(32.0, 54.0), 1)
            soft_skill = round(random.uniform(35.0, 55.0), 1)
            skill_assess = round(random.uniform(32.0, 52.0), 1)
            projects = random.randint(0, 1)

            satisfaction = round(random.uniform(1.8, 3.2), 1)
            faculty_feedback = round(random.uniform(35.0, 58.0), 1)
            sentiment = "Needs Attention"

        elif selected_persona == "Placement Risk":
            # High/solid academics, but low skills/placement readiness
            cgpa = round(random.uniform(7.4, 8.8), 2)
            backlogs = random.choice([0, 0, 0, 1])
            sem_prev_units = 6
            sem_prev_passed = 6
            sem_prev_marks = round(random.uniform(74.0, 86.0), 1)
            sem_last_units = 6
            sem_last_passed = 6
            sem_last_marks = round(random.uniform(72.0, 85.0), 1)
            avg_marks = round((sem_prev_marks + sem_last_marks) / 2.0, 1)

            att_pct = round(random.uniform(78.0, 92.0), 1)
            att_trend = round(random.uniform(-3.0, 2.0), 1)
            lms_login = random.randint(8, 16)
            assignment_comp = round(random.uniform(75.0, 92.0), 1)
            course_act = "Medium"
            learn_hrs = round(random.uniform(8.0, 14.0), 1)
            lms_trend = round(random.uniform(-8.0, 8.0), 1)

            events = random.randint(1, 4)
            clubs = random.randint(0, 1)
            hackathons = 0
            certs = random.choice([0, 1])
            extra_score = round(random.uniform(40.0, 60.0), 1)

            # Bottleneck: Aptitude, Coding, Interview, Projects
            aptitude = round(random.uniform(42.0, 58.0), 1)
            coding = round(random.uniform(35.0, 54.0), 1)
            mock = round(random.uniform(38.0, 56.0), 1)
            placement_training = round(random.uniform(30.0, 55.0), 1)
            placement_status = "Not Ready" if year in ["3rd Year", "4th Year"] else "In Progress"
            internship = 0

            tech_skill = round(random.uniform(42.0, 58.0), 1)
            soft_skill = round(random.uniform(44.0, 60.0), 1)
            skill_assess = round(random.uniform(42.0, 58.0), 1)
            projects = random.choice([0, 1])

            satisfaction = round(random.uniform(3.0, 4.0), 1)
            faculty_feedback = round(random.uniform(62.0, 78.0), 1)
            sentiment = "Neutral"

        elif selected_persona == "Hidden Potential":
            # Moderate academics, but strong practical coding, hackathons, projects
            cgpa = round(random.uniform(6.3, 7.3), 2)
            backlogs = random.choice([0, 0, 1])
            sem_prev_units = 6
            sem_prev_passed = 6
            sem_prev_marks = round(random.uniform(62.0, 72.0), 1)
            sem_last_units = 6
            sem_last_passed = 5 if backlogs > 0 else 6
            sem_last_marks = round(random.uniform(64.0, 75.0), 1)
            avg_marks = round((sem_prev_marks + sem_last_marks) / 2.0, 1)

            att_pct = round(random.uniform(70.0, 82.0), 1)
            att_trend = round(random.uniform(-4.0, 4.0), 1)
            lms_login = random.randint(10, 20)
            assignment_comp = round(random.uniform(68.0, 85.0), 1)
            course_act = "Medium"
            learn_hrs = round(random.uniform(10.0, 18.0), 1)
            lms_trend = round(random.uniform(5.0, 28.0), 1)

            events = random.randint(5, 12)
            clubs = random.randint(2, 4)
            hackathons = random.randint(2, 6)
            certs = random.randint(2, 5)
            extra_score = round(random.uniform(80.0, 95.0), 1)

            aptitude = round(random.uniform(68.0, 84.0), 1)
            coding = round(random.uniform(78.0, 94.0), 1)
            mock = round(random.uniform(72.0, 88.0), 1)
            placement_training = round(random.uniform(70.0, 92.0), 1)
            placement_status = "Ready" if year in ["3rd Year", "4th Year"] else "In Progress"
            internship = 1 if (year in ["3rd Year", "4th Year"] and random.random() > 0.4) else 0

            tech_skill = round(random.uniform(80.0, 94.0), 1)
            soft_skill = round(random.uniform(74.0, 90.0), 1)
            skill_assess = round(random.uniform(76.0, 92.0), 1)
            projects = random.randint(3, 7)

            satisfaction = round(random.uniform(3.8, 4.8), 1)
            faculty_feedback = round(random.uniform(72.0, 88.0), 1)
            sentiment = "Positive"

        elif selected_persona == "Engagement Risk":
            # Formerly ok, but attendance slipping, LMS activity falling off a cliff
            cgpa = round(random.uniform(6.5, 7.8), 2)
            backlogs = random.choice([0, 1, 2])
            sem_prev_units = 6
            sem_prev_passed = 6
            sem_prev_marks = round(random.uniform(68.0, 78.0), 1)
            sem_last_units = 6
            sem_last_passed = 4 if backlogs > 0 else 5
            sem_last_marks = round(sem_prev_marks - random.uniform(6.0, 16.0), 1)
            avg_marks = round((sem_prev_marks + sem_last_marks) / 2.0, 1)

            att_pct = round(random.uniform(55.0, 68.0), 1)
            att_trend = round(random.uniform(-20.0, -8.0), 1)
            lms_login = random.randint(2, 7)
            assignment_comp = round(random.uniform(45.0, 65.0), 1)
            course_act = "Low"
            learn_hrs = round(random.uniform(3.0, 7.0), 1)
            lms_trend = round(random.uniform(-65.0, -25.0), 1)

            events = random.randint(0, 2)
            clubs = random.randint(0, 1)
            hackathons = 0
            certs = 0
            extra_score = round(random.uniform(35.0, 60.0), 1)

            aptitude = round(random.uniform(55.0, 70.0), 1)
            coding = round(random.uniform(48.0, 65.0), 1)
            mock = round(random.uniform(45.0, 62.0), 1)
            placement_training = round(random.uniform(40.0, 60.0), 1)
            placement_status = "In Progress"
            internship = 0

            tech_skill = round(random.uniform(50.0, 66.0), 1)
            soft_skill = round(random.uniform(48.0, 64.0), 1)
            skill_assess = round(random.uniform(46.0, 64.0), 1)
            projects = random.choice([1, 2])

            satisfaction = round(random.uniform(2.2, 3.4), 1)
            faculty_feedback = round(random.uniform(48.0, 65.0), 1)
            sentiment = "Needs Attention"

        else:  # Average Student
            cgpa = round(random.uniform(6.8, 8.2), 2)
            backlogs = random.choice([0, 0, 0, 0, 1])
            sem_prev_units = 6
            sem_prev_passed = 6
            sem_prev_marks = round(random.uniform(68.0, 80.0), 1)
            sem_last_units = 6
            sem_last_passed = 6 if backlogs == 0 else 5
            sem_last_marks = round(sem_prev_marks + random.uniform(-4.0, 4.0), 1)
            avg_marks = round((sem_prev_marks + sem_last_marks) / 2.0, 1)

            att_pct = round(random.uniform(72.0, 86.0), 1)
            att_trend = round(random.uniform(-4.0, 4.0), 1)
            lms_login = random.randint(7, 15)
            assignment_comp = round(random.uniform(70.0, 88.0), 1)
            course_act = "Medium"
            learn_hrs = round(random.uniform(8.0, 14.0), 1)
            lms_trend = round(random.uniform(-10.0, 15.0), 1)

            events = random.randint(2, 6)
            clubs = random.randint(1, 2)
            hackathons = random.choice([0, 1])
            certs = random.choice([1, 2])
            extra_score = round(random.uniform(55.0, 75.0), 1)

            aptitude = round(random.uniform(60.0, 76.0), 1)
            coding = round(random.uniform(58.0, 75.0), 1)
            mock = round(random.uniform(60.0, 75.0), 1)
            placement_training = round(random.uniform(60.0, 80.0), 1)
            placement_status = "In Progress" if year in ["2nd Year", "3rd Year"] else ("Placed" if year == "4th Year" and random.random() > 0.4 else "Ready")
            internship = 1 if (year in ["3rd Year", "4th Year"] and random.random() > 0.6) else 0

            tech_skill = round(random.uniform(60.0, 78.0), 1)
            soft_skill = round(random.uniform(62.0, 78.0), 1)
            skill_assess = round(random.uniform(60.0, 78.0), 1)
            projects = random.randint(1, 3)

            satisfaction = round(random.uniform(3.4, 4.4), 1)
            faculty_feedback = round(random.uniform(65.0, 82.0), 1)
            sentiment = "Positive" if faculty_feedback >= 72 else "Neutral"

        # Optional fields
        entry_score = round(random.uniform(55.0, 95.0), 1) if random.random() > 0.08 else None
        prev_score = round(random.uniform(58.0, 96.0), 1) if random.random() > 0.08 else None
        tutoring = random.randint(0, 4) if random.random() > 0.12 else None

        row = {
            "student_id": student_id,
            "name": full_name,
            "department": dept,
            "year": year,
            "semester": semester,
            "section": section,
            "cgpa": cgpa,
            "average_marks": avg_marks,
            "backlogs": backlogs,
            "sem_prev_units_enrolled": sem_prev_units,
            "sem_prev_units_passed": sem_prev_passed,
            "sem_prev_avg_marks": sem_prev_marks,
            "sem_last_units_enrolled": sem_last_units,
            "sem_last_units_passed": sem_last_passed,
            "sem_last_avg_marks": sem_last_marks,
            "entry_score": entry_score,
            "previous_score": prev_score,
            "tutoring_sessions": tutoring,
            "attendance_percentage": att_pct,
            "attendance_trend": att_trend,
            "lms_login_frequency": lms_login,
            "assignment_completion": assignment_comp,
            "course_activity_level": course_act,
            "learning_hours": learn_hrs,
            "lms_activity_trend": lms_trend,
            "events_attended": events,
            "clubs_count": clubs,
            "hackathons_participated": hackathons,
            "certifications_count": certs,
            "extracurricular_score": extra_score,
            "aptitude_score": aptitude,
            "coding_score": coding,
            "mock_interview_score": mock,
            "placement_training_pct": placement_training,
            "placement_status": placement_status,
            "internship_experience": internship,
            "technical_skill_score": tech_skill,
            "soft_skill_score": soft_skill,
            "skill_assessment_score": skill_assess,
            "projects_completed": projects,
            "student_satisfaction": satisfaction,
            "faculty_feedback_score": faculty_feedback,
            "feedback_sentiment": sentiment,
            "persona": selected_persona,
            "is_scripted": False
        }
        students_raw.append(row)

    # Inject intentional real-world anomalies for Data Quality Engine (FR-04):
    # 1. 3 Duplicate Student IDs
    dup_indices = [15, 85, 230]
    target_indices = [310, 450, 620]
    for src, dst in zip(dup_indices, target_indices):
        students_raw[dst]["student_id"] = students_raw[src]["student_id"]

    # 2. Exactly 2 invalid numeric records
    # One attendance out of range (> 100)
    students_raw[45]["attendance_percentage"] = 118.5
    # One invalid negative average mark
    students_raw[182]["average_marks"] = -15.0

    # 3. Inconsistent department casing on 2 records
    students_raw[95]["department"] = "cse"
    students_raw[140]["department"] = "ece"

    return students_raw


def compute_student_score_and_ml(student):
    """
    Computes rule-based Success Score (0-100), risk level, SHAP-like factors,
    and ML fusion strictly following PRD FR-06, FR-07, FR-08, FR-23, and FR-24.
    """
    # 1. Extract values with defensive defaults
    cgpa = student.get("cgpa", 7.0)
    avg_marks = max(0.0, min(100.0, student.get("average_marks", 70.0)))
    backlogs = max(0, student.get("backlogs", 0))
    sem_last_passed = student.get("sem_last_units_passed", 6)
    sem_last_enrolled = max(1, student.get("sem_last_units_enrolled", 6))
    last_pass_ratio = min(1.0, max(0.0, sem_last_passed / sem_last_enrolled))
    sem_last_marks = max(0.0, min(100.0, student.get("sem_last_avg_marks", 70.0)))
    sem_prev_marks = max(0.0, min(100.0, student.get("sem_prev_avg_marks", 70.0)))
    marks_delta = sem_last_marks - sem_prev_marks

    att_pct = max(0.0, min(100.0, student.get("attendance_percentage", 75.0)))
    lms_trend = student.get("lms_activity_trend", 0.0)
    assignment_comp = student.get("assignment_completion", 75.0)
    learn_hours = min(30.0, max(0.0, student.get("learning_hours", 10.0)))
    
    aptitude = student.get("aptitude_score", 65.0)
    coding = student.get("coding_score", 60.0)
    mock = student.get("mock_interview_score", 60.0)
    internship = student.get("internship_experience", 0)
    
    tech_skill = student.get("technical_skill_score", 60.0)
    soft_skill = student.get("soft_skill_score", 65.0)
    projects = student.get("projects_completed", 2)
    
    extra_score = student.get("extracurricular_score", 60.0)

    # Component Calculations (0 - 100 each)
    # Academic (Weight 25%)
    cgpa_norm = min(100.0, max(0.0, cgpa * 10.0))
    raw_acad = (cgpa_norm * 0.40) + (sem_last_marks * 0.35) + (last_pass_ratio * 100.0 * 0.25)
    acad_component = max(0.0, min(100.0, raw_acad - (backlogs * 12.0)))

    # Attendance (Weight 15%)
    att_component = att_pct

    # LMS Activity (Weight 15%)
    hours_norm = min(100.0, (learn_hours / 16.0) * 100.0)
    raw_lms = (assignment_comp * 0.50) + (hours_norm * 0.50)
    if lms_trend < 0:
        raw_lms = max(0.0, raw_lms + (lms_trend * 0.35))
    lms_component = max(0.0, min(100.0, raw_lms))

    # Placement Readiness (Weight 20%)
    raw_placement = (aptitude * 0.35) + (coding * 0.40) + (mock * 0.25) + (10.0 if internship else 0.0)
    placement_component = max(0.0, min(100.0, raw_placement))

    # Skills (Weight 15%)
    proj_norm = min(100.0, projects * 25.0)
    raw_skills = (tech_skill * 0.45) + (soft_skill * 0.35) + (proj_norm * 0.20)
    skills_component = max(0.0, min(100.0, raw_skills))

    # Engagement (Weight 10%)
    engagement_component = max(0.0, min(100.0, extra_score))

    # Weighted Success Score (FR-06)
    success_score = round(
        (0.25 * acad_component) +
        (0.15 * att_component) +
        (0.15 * lms_component) +
        (0.20 * placement_component) +
        (0.15 * skills_component) +
        (0.10 * engagement_component)
    )
    success_score = max(0, min(100, success_score))

    # Special scripted pin for Rahul Kumar
    if student.get("is_scripted"):
        success_score = 42

    # Baseline Rule Risk (FR-07)
    if success_score >= 80:
        rule_risk = "LOW"
    elif success_score >= 60:
        rule_risk = "MEDIUM"
    else:
        rule_risk = "HIGH"

    # Explicit risk signals
    risk_signals = []
    if att_pct < 60.0:
        risk_signals.append(f"Attendance critically low ({att_pct:.1f}%)")
    if backlogs >= 3:
        risk_signals.append(f"High backlog burden ({backlogs} active backlogs)")
    if coding < 50.0:
        risk_signals.append(f"Technical coding assessment below benchmark ({coding:.1f}/100)")
    if lms_trend < -25.0:
        risk_signals.append(f"Steep decline in LMS portal engagement ({lms_trend:.1f}%)")
    if placement_component < 50.0:
        risk_signals.append(f"Sub-threshold placement readiness ({placement_component:.1f}/100)")

    # Two or more signals escalate rule risk by 1 step
    if len(risk_signals) >= 2:
        if rule_risk == "LOW":
            rule_risk = "MEDIUM"
        elif rule_risk == "MEDIUM":
            rule_risk = "HIGH"

    # 2. ML Second Opinion (Model A: Academic Risk)
    # Calibrated probability simulation
    z_a = (
        - 2.8 * (last_pass_ratio - 0.82)
        - 0.04 * (sem_last_marks - 66.0)
        - 0.03 * (marks_delta)
        + 0.45 * (backlogs)
        - 0.02 * (att_pct - 75.0)
    )
    ml_acad_prob = 1.0 / (1.0 + math.exp(-z_a))
    ml_acad_prob = round(max(0.04, min(0.96, ml_acad_prob)), 2)

    if student.get("is_scripted"):
        ml_acad_prob = 0.74

    if ml_acad_prob >= 0.60:
        ml_acad_band = "HIGH"
    elif ml_acad_prob >= 0.35:
        ml_acad_band = "MEDIUM"
    else:
        ml_acad_band = "LOW"

    # Model P: Placement Likelihood
    z_p = (
        0.55 * (cgpa - 7.2)
        + 0.035 * (aptitude - 65.0)
        + 0.040 * (coding - 60.0)
        + 0.025 * (soft_skill - 65.0)
        + 0.80 * (internship - 0.2)
        + 0.25 * (min(projects, 5) - 2.0)
    )
    ml_place_prob = 1.0 / (1.0 + math.exp(-z_p))
    ml_place_prob = round(max(0.05, min(0.95, ml_place_prob)), 2)

    if student.get("is_scripted"):
        ml_place_prob = 0.32

    if ml_place_prob >= 0.60:
        ml_place_band = "LIKELY"
    elif ml_place_prob >= 0.35:
        ml_place_band = "UNCERTAIN"
    else:
        ml_place_band = "UNLIKELY"

    # 3. ML Risk Fusion (FR-24)
    # If model band is HIGH, escalate rule level by at most one step. ML never lowers risk.
    final_risk = rule_risk
    risk_source = "rules"
    fusion_reason = None

    if ml_acad_band == "HIGH":
        if rule_risk == "LOW":
            final_risk = "MEDIUM"
            risk_source = "rules+ml"
            fusion_reason = f"Model estimates elevated academic risk (probability {ml_acad_prob:.2f})"
        elif rule_risk == "MEDIUM":
            final_risk = "HIGH"
            risk_source = "rules+ml"
            fusion_reason = f"Model estimates elevated academic risk (probability {ml_acad_prob:.2f})"
        else: # rule_risk is already HIGH
            risk_source = "rules+ml"
            fusion_reason = f"Model confirms elevated academic risk (probability {ml_acad_prob:.2f})"

    # 4. Agreement Category (FR-24)
    if rule_risk == "HIGH" and ml_acad_band == "HIGH":
        agreement = "Confirmed High"
    elif rule_risk in ["LOW", "MEDIUM"] and ml_acad_band == "HIGH":
        agreement = "ML Early Warning"
    elif rule_risk == "HIGH" and ml_acad_band != "HIGH":
        agreement = "Rules-Only Alert"
    else:
        agreement = "Aligned"

    # 5. Student Segmentation (FR-09)
    if backlogs >= 2 or acad_component < 52 or (cgpa < 6.2 and sem_last_marks < 60):
        segment = "Academic Risk"
    elif lms_trend < -25.0 or (att_pct < 65.0 and lms_component < 55.0):
        segment = "Engagement Risk"
    elif cgpa >= 7.2 and (placement_component < 55.0 or ml_place_band == "UNLIKELY"):
        segment = "Placement Risk"
    elif cgpa >= 6.2 and (skills_component >= 72.0 or engagement_component >= 75.0):
        segment = "Hidden Potential"
    elif cgpa >= 8.2 and success_score >= 78:
        segment = "High Performers"
    else:
        segment = "High Performers" if success_score >= 70 else "Academic Risk"

    # 6. SHAP Factor Explanations (FR-23)
    acad_factors = []
    # Pass ratio factor
    diff_pass = (last_pass_ratio - 0.82)
    effect_pass = -0.32 * diff_pass
    acad_factors.append({
        "feature": "Latest Semester Pass Ratio",
        "value": f"{int(last_pass_ratio * 100)}%",
        "benchmark": "82% typical",
        "impact": "raises_risk" if effect_pass > 0 else "lowers_risk",
        "weight": round(abs(effect_pass), 2)
    })
    # Marks delta factor
    diff_marks = marks_delta
    effect_marks = -0.015 * diff_marks
    acad_factors.append({
        "feature": "Semester-over-Semester Marks Delta",
        "value": f"{marks_delta:+.1f}%",
        "benchmark": "+0.8% typical",
        "impact": "raises_risk" if effect_marks > 0 else "lowers_risk",
        "weight": round(abs(effect_marks), 2)
    })
    # Backlogs
    diff_backlogs = backlogs - 0.6
    effect_back = 0.12 * diff_backlogs
    acad_factors.append({
        "feature": "Active Backlog Count",
        "value": f"{backlogs}",
        "benchmark": "0.6 typical",
        "impact": "raises_risk" if effect_back > 0 else "lowers_risk",
        "weight": round(abs(effect_back), 2)
    })
    # Sort by absolute weight
    acad_factors.sort(key=lambda x: x["weight"], reverse=True)

    # Score breakdown contributions
    contributions = {
        "academic": round(0.25 * acad_component, 1),
        "attendance": round(0.15 * att_component, 1),
        "lms": round(0.15 * lms_component, 1),
        "placement": round(0.20 * placement_component, 1),
        "skills": round(0.15 * skills_component, 1),
        "engagement": round(0.10 * engagement_component, 1)
    }

    # Assembled complete MongoDB Student object (Section 12)
    student_doc = {
        "studentId": student["student_id"],
        "name": student["name"],
        "department": student["department"].upper() if student["department"] in ["cse", "ece"] else student["department"],
        "year": student["year"],
        "semester": student["semester"],
        "section": student["section"],
        "academic": {
            "cgpa": cgpa,
            "averageMarks": avg_marks,
            "backlogs": backlogs,
            "entryScore": student.get("entry_score"),
            "previousScore": student.get("previous_score"),
            "tutoringSessions": student.get("tutoring_sessions"),
            "semesterHistory": [
                {
                    "slot": "prev",
                    "unitsEnrolled": student.get("sem_prev_units_enrolled", 6),
                    "unitsPassed": student.get("sem_prev_units_passed", 6),
                    "avgMarks": sem_prev_marks
                },
                {
                    "slot": "last",
                    "unitsEnrolled": sem_last_enrolled,
                    "unitsPassed": sem_last_passed,
                    "avgMarks": sem_last_marks
                }
            ],
            "componentScore": round(acad_component, 1)
        },
        "attendance": {
            "percentage": att_pct,
            "trend": student.get("attendance_trend", 0.0),
            "componentScore": round(att_component, 1)
        },
        "lms": {
            "loginFrequency": student.get("lms_login_frequency", 8),
            "assignmentCompletion": assignment_comp,
            "courseActivityLevel": student.get("course_activity_level", "Medium"),
            "learningHours": learn_hours,
            "activityTrend": lms_trend,
            "componentScore": round(lms_component, 1)
        },
        "engagement": {
            "eventsAttended": student.get("events_attended", 2),
            "clubsCount": student.get("clubs_count", 1),
            "hackathonsParticipated": student.get("hackathons_participated", 0),
            "certificationsCount": student.get("certifications_count", 0),
            "extracurricularScore": extra_score,
            "componentScore": round(engagement_component, 1)
        },
        "placement": {
            "aptitude": aptitude,
            "coding": coding,
            "mockInterview": mock,
            "trainingPct": student.get("placement_training_pct", 50.0),
            "status": student.get("placement_status", "In Progress"),
            "internshipExperience": internship,
            "componentScore": round(placement_component, 1)
        },
        "skills": {
            "technical": tech_skill,
            "soft": soft_skill,
            "assessment": student.get("skill_assessment_score", 60.0),
            "projectsCompleted": projects,
            "componentScore": round(skills_component, 1)
        },
        "feedback": {
            "studentSatisfaction": student.get("student_satisfaction", 3.5),
            "facultyFeedbackScore": student.get("faculty_feedback_score", 70.0),
            "sentiment": student.get("feedback_sentiment", "Neutral")
        },
        "successScore": success_score,
        "riskLevel": final_risk,
        "ruleRiskLevel": rule_risk,
        "riskSource": risk_source,
        "riskFactors": risk_signals + ([fusion_reason] if fusion_reason else []),
        "segment": segment,
        "scoreContributions": contributions,
        "ml": {
            "status": "ok",
            "source": "snapshot",
            "modelVersions": {
                "academic": "v2.0-d1-histgradient",
                "placement": "v2.0-d3-randomforest",
                "exam": "v2.0-d2-ridge"
            },
            "scoredAt": "2026-10-08T12:00:00Z",
            "coverage": 1.0,
            "academicRisk": {
                "probability": ml_acad_prob,
                "band": ml_acad_band,
                "topFactors": acad_factors
            },
            "placement": {
                "probability": ml_place_prob,
                "band": ml_place_band,
                "topFactors": [
                    {
                        "feature": "Aptitude Assessment",
                        "value": f"{aptitude}/100",
                        "impact": "raises_likelihood" if aptitude >= 65 else "lowers_likelihood"
                    },
                    {
                        "feature": "Technical Coding Score",
                        "value": f"{coding}/100",
                        "impact": "raises_likelihood" if coding >= 60 else "lowers_likelihood"
                    },
                    {
                        "feature": "Prior Internship",
                        "value": "Yes" if internship == 1 else "No",
                        "impact": "raises_likelihood" if internship == 1 else "lowers_likelihood"
                    }
                ]
            },
            "agreement": agreement
        }
    }

    return student_doc


def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    data_dir = os.path.join(base_dir, "data")
    os.makedirs(data_dir, exist_ok=True)

    print("Generating 1,250 synthetic student cohort...")
    raw_students = generate_cohort(1250)

    # 1. Save CSV
    csv_path = os.path.join(data_dir, "demo_students.csv")
    df = pd.DataFrame(raw_students)
    # Remove internal generator metadata from CSV
    csv_df = df.drop(columns=["persona", "is_scripted"])
    csv_df.to_csv(csv_path, index=False)
    print(f"Saved CSV demo dataset: {csv_path} ({len(csv_df)} rows)")

    # 2. Score and Save MongoDB Seed JSON
    print("Computing rule scores, ML estimates, risk fusion, and segmentation...")
    scored_documents = []
    for s in raw_students:
        doc = compute_student_score_and_ml(s)
        scored_documents.append(doc)

    json_path = os.path.join(data_dir, "demo_seed_scored.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(scored_documents, f, indent=2)
    print(f"Saved scored MongoDB seed snapshot: {json_path} ({len(scored_documents)} records)")

    # 3. Print Summary Statistics
    risk_counts = {}
    agreement_counts = {}
    segment_counts = {}
    for d in scored_documents:
        risk_counts[d["riskLevel"]] = risk_counts.get(d["riskLevel"], 0) + 1
        agreement_counts[d["ml"]["agreement"]] = agreement_counts.get(d["ml"]["agreement"], 0) + 1
        segment_counts[d["segment"]] = segment_counts.get(d["segment"], 0) + 1

    print("\n--- COHORT DISTRIBUTION SUMMARY ---")
    print(f"Total Students: {len(scored_documents)}")
    print(f"Risk Breakdown: {risk_counts}")
    print(f"Rules vs ML Agreement: {agreement_counts}")
    print(f"Segment Distribution: {segment_counts}")
    
    # Check Rahul Kumar
    rahul_doc = next(d for d in scored_documents if d["name"] == "Rahul Kumar")
    print("\n--- SCRIPTED DEMO STUDENT: RAHUL KUMAR ---")
    print(f"ID: {rahul_doc['studentId']}")
    print(f"Department: {rahul_doc['department']}, Year: {rahul_doc['year']}, Section: {rahul_doc['section']}")
    print(f"Success Score: {rahul_doc['successScore']}/100")
    print(f"Risk Level: {rahul_doc['riskLevel']} (Source: {rahul_doc['riskSource']})")
    print(f"ML Academic Risk: {rahul_doc['ml']['academicRisk']['probability']} ({rahul_doc['ml']['academicRisk']['band']})")
    print(f"ML Placement Likelihood: {rahul_doc['ml']['placement']['probability']} ({rahul_doc['ml']['placement']['band']})")
    print(f"Agreement Category: {rahul_doc['ml']['agreement']}")
    print(f"Primary Segment: {rahul_doc['segment']}")
    print(f"Risk Factors: {rahul_doc['riskFactors']}")


if __name__ == "__main__":
    main()
