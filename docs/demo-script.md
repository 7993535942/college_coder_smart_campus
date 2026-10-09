# SmartCampus AI — Final Demo Script (Hackathon Walkthrough)

Use this narrative script to present SmartCampus AI end-to-end using the scripted benchmark student **Rahul Kumar**.

---

### Step 1: Login & Executive Overview
- Navigate to `http://localhost:3000`.
- Click **"Sign In to Campus Console"** with demo credentials (`admin@smartcampus.demo` / `Demo@123`).
- **Narrative**: *"Welcome to SmartCampus AI. The console unifies 1,250 students across 6 departments directly in MongoDB Atlas. Rather than fragmented spreadsheets, leadership sees real-time Success Scores, Attendance, and Placement readiness at a glance."*

---

### Step 2: Risk Overview & ML Risk Fusion
- Point to the **Rules vs ML Risk Fusion Matrix** card.
- **Narrative**: *"Notice how the system handles risk: 274 students are confirmed High Risk by both transparent rule thresholds and our machine learning model. Critically, the model surfaced 24 'ML Early Warning' students whose attendance and marks might look borderline, but whose underlying pass ratio trajectories predict imminent academic trouble."*

---

### Step 3: Spotlight on Rahul Kumar (`SC-2023-0142`)
- Click **"Demo Spotlight: Rahul Kumar"** in the top navigation bar or banner.
- **Narrative**: *"Let's examine Rahul Kumar, a 3rd-year Computer Science student. His Success Score is 42/100, placing him in HIGH risk."*

---

### Step 4: Transparent Rule Breakdown vs ML Evidence
- Scroll to the **Rule Breakdown** and **ML Prediction & SHAP Drivers** panels.
- **Narrative**: *"Why is Rahul flagged? First, rule evidence: Biometric attendance is 58%, he has 3 active backlogs, and his LMS activity declined by 42%. Second, our machine-learning model, trained on thousands of public student trajectories, independently predicts an elevated 74% academic risk probability. Its main SHAP drivers are a drop in course pass ratio from 83% to 50% and semester marks declining by 8%."*

---

### Step 5: AI Intervention Copilot
- Click **"AI Copilot Intervention"**.
- Review the generated plan: Immediate, Academic, Placement, Mentoring, and Monitoring.
- Click **"Assign & Track"** on an action item to log it directly to the Intervention Tracker.
- **Narrative**: *"SmartCampus AI doesn't stop at sounding an alarm. The AI Intervention Copilot converts evidence into structured faculty action: scheduling mandatory attendance counseling, assigning peer backlog tutoring, and tracking progress over a 14-day cycle."*

---

### Step 6: What-If Scenario Simulator
- Click **"Scenario Simulator"** in the sidebar.
- Adjust Attendance from 58% to 75% and Backlogs from 3 to 1.
- **Narrative**: *"The simulator shows faculty how proactive interventions impact student trajectories: improving attendance and clearing backlogs elevates Rahul from HIGH risk to MEDIUM risk (61/100), reducing model-estimated risk."*

---

### Step 7: Model Insights & Responsible AI
- Click **"Model Insights"** in the sidebar.
- Show held-out evaluation metrics: ROC-AUC 0.862, PR-AUC 0.794, Brier score, and feature importance rankings.
- **Closing Statement**: *"SmartCampus AI doesn't replace faculty judgment. It gives mentors the evidence, the transparent explanations, and the proactive recommendations to intervene before it's too late."*
