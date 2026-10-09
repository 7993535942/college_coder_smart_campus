import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentDetail from './pages/StudentDetail';
import Segments from './pages/Segments';
import AICopilot from './pages/AICopilot';
import ScenarioSimulator from './pages/ScenarioSimulator';
import DataCenter from './pages/DataCenter';
import ModelInsights from './pages/ModelInsights';
import ManageStudents from './pages/ManageStudents';
import StudentPortal from './pages/StudentPortal';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentFilters, setStudentFilters] = useState({});

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api.getMe().then(data => {
        if (data.user) setUser(data.user);
        else api.clearToken();
      }).catch(() => api.clearToken());
    }
  }, []);

  const handleLogout = () => {
    api.clearToken();
    setUser(null);
    setCurrentPage('dashboard');
  };

  const handleSelectStudent = (id, studentObj = null) => {
    setSelectedStudentId(id);
    setSelectedStudent(studentObj);
    setCurrentPage('studentDetail');
  };

  const handleNavigateToStudents = (filters = {}) => {
    setStudentFilters(filters);
    setCurrentPage('students');
  };

  const handleFilterBySegment = (segmentName) => {
    handleNavigateToStudents({ segment: segmentName });
  };

  const handleFilterByAgreement = (category) => {
    handleNavigateToStudents({ agreement: category });
  };

  // ─── Not logged in ─────────────────────────────────────────
  if (!user) {
    return <Login onLoginSuccess={setUser} />;
  }

  // ─── Student role: show personal portal only ────────────────
  if (user.role === 'student') {
    return <StudentPortal user={user} onLogout={handleLogout} />;
  }

  // ─── Admin role: full dashboard ─────────────────────────────
  return (
    <div className="app-container">
      <Sidebar 
        currentPage={currentPage === 'studentDetail' ? 'students' : currentPage} 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          if (page === 'students') setStudentFilters({});
        }}
        onLogout={handleLogout}
        user={user}
      />

      <div className="main-content">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'capitalize' }}>
              {currentPage === 'studentDetail'    ? 'Student Profile'
               : currentPage === 'manage-students' ? 'Manage Student Accounts'
               : currentPage}
            </span>
            <span className="badge badge-low" style={{ fontSize: '0.65rem' }}>Atlas Connected</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              className="btn-secondary" 
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              onClick={() => handleSelectStudent('SC-2023-0142')}
            >
              Demo Spotlight: Rahul Kumar
            </button>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {user.name}
            </div>
          </div>
        </header>

        <main className="content-body">
          {currentPage === 'dashboard' && (
            <Dashboard 
              onSelectStudent={handleSelectStudent} 
              setCurrentPage={setCurrentPage}
              onNavigateToStudents={handleNavigateToStudents}
              onFilterByAgreement={handleFilterByAgreement}
            />
          )}

          {currentPage === 'students' && (
            <Students 
              onSelectStudent={handleSelectStudent} 
              initialFilters={studentFilters}
            />
          )}

          {currentPage === 'studentDetail' && (
            <StudentDetail 
              studentId={selectedStudentId} 
              initialStudent={selectedStudent}
              onBack={() => setCurrentPage('students')}
            />
          )}

          {currentPage === 'segments' && (
            <Segments onFilterBySegment={handleFilterBySegment} />
          )}

          {currentPage === 'copilot' && <AICopilot />}

          {currentPage === 'simulator' && <ScenarioSimulator />}

          {currentPage === 'datacenter' && (
            <DataCenter onCohortReloaded={() => setCurrentPage('dashboard')} />
          )}

          {currentPage === 'models' && <ModelInsights />}

          {currentPage === 'manage-students' && <ManageStudents />}
        </main>
      </div>
    </div>
  );
}
