import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import {
  GraduationCap, BarChart2, BookOpen, Calendar, Award,
  TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle,
  Clock, Target, Star, LogOut, User, Activity, Bot, Send,
  Sparkles, RefreshCw, X, ChevronRight, Zap, ShieldAlert,
  HelpCircle, Info, ExternalLink, ArrowRight, CornerDownLeft,
  Home, Compass, Layers, History, Wallet, Search, Paperclip,
  Mic, MoreHorizontal, ChevronDown, Check, MessageSquare
} from 'lucide-react';

const RISK_COLORS = {
  HIGH:   { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.12)', icon: <AlertTriangle size={14} /> },
  MEDIUM: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', icon: <Clock size={14} /> },
  LOW:    { color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', icon: <CheckCircle size={14} /> }
};

function ScoreBar({ label, value, color, max = 100 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: color || '#818cf8' }}>
          {value !== undefined && value !== null ? value : 0}{max === 100 ? '%' : ''}
        </span>
      </div>
      <div style={{ height: '7px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: color || '#6366f1',
          borderRadius: '99px',
          transition: 'width 0.8s ease',
          boxShadow: `0 0 10px ${color || '#6366f1'}50`
        }} />
      </div>
    </div>
  );
}

export default function StudentPortal({ user, onLogout }) {
  const [student, setStudent]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  
  // Navigation tabs in the student portal
  const [activeTab, setActiveTab]     = useState('chatbot'); // 'chatbot' | 'tasks' | 'academic' | 'lms' | 'skills' | 'ml' | 'breakdown'
  
  // Assigned Tasks from Admin / AI Engine
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [tasksLoading, setTasksLoading]   = useState(false);

  const fetchStudentTasks = (studentId) => {
    if (!studentId) return;
    setTasksLoading(true);
    api.getInterventions(`?studentId=${studentId}`)
      .then(data => {
        if (Array.isArray(data)) setAssignedTasks(data);
      })
      .catch(err => console.error('Failed to load tasks', err))
      .finally(() => setTasksLoading(false));
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.updateIntervention(taskId, { status: newStatus });
      setAssignedTasks(prev => prev.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
    } catch (err) {
      console.error('Failed to update task status', err);
    }
  };

  const pendingTasksCount = assignedTasks.filter(t => t.status !== 'Completed').length;

  // Modals
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showScoreModal, setShowScoreModal]     = useState(false);

  // Search in sidebar
  const [searchChats, setSearchChats] = useState('');

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput]       = useState('');
  const [chatLoading, setChatLoading]   = useState(false);
  const chatBottomRef                  = useRef(null);

  // Time of day greeting
  const [greetingTime, setGreetingTime] = useState('Evening');

  useEffect(() => {
    const hr = new Date().getHours();
    if (hr >= 4 && hr < 12) setGreetingTime('Morning');
    else if (hr >= 12 && hr < 17) setGreetingTime('Afternoon');
    else setGreetingTime('Evening');
  }, []);

  // Load student profile
  useEffect(() => {
    const lookupId = user?.studentId || user?.email;
    if (!lookupId) {
      setLoading(false);
      setError('No student ID or email linked to this account. Please contact your campus administrator.');
      return;
    }

    setLoading(true);
    api.getStudent(lookupId)
      .then(data => {
        if (data && (data.studentId || data.name)) {
          setStudent(data);
          fetchStudentTasks(data.studentId || user?.studentId);
        } else if (user?.email && user.email !== lookupId) {
          return api.getStudent(user.email).then(byEmail => {
            if (byEmail && (byEmail.studentId || byEmail.name)) {
              setStudent(byEmail);
              fetchStudentTasks(byEmail.studentId || user?.studentId);
            } else {
              setError('Student record not found. Please contact your administrator.');
            }
          });
        } else {
          setError('Student record not found. Please contact your administrator.');
        }
      })
      .catch(() => setError('Failed to load your academic data.'))
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (student?.studentId || user?.studentId) {
      fetchStudentTasks(student?.studentId || user?.studentId);
    }
  }, [student?.studentId, user?.studentId]);

  useEffect(() => {
    if (activeTab === 'chatbot' && chatMessages.length > 0) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  const handleSendMessage = async (queryText) => {
    const text = (queryText || chatInput).trim();
    if (!text || chatLoading || !student) return;

    // Switch to chatbot tab if not already on it
    if (activeTab !== 'chatbot') setActiveTab('chatbot');

    const userMsg = {
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      const historyPayload = chatMessages.map(m => ({
        role: m.role === 'agent' ? 'assistant' : 'user',
        text: m.content
      }));

      const res = await api.askStudentAdvisor(text, student, historyPayload);
      
      const agentMsg = {
        role: 'agent',
        content: res.answer || 'I evaluated your profile, but could not produce a response.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: res.suggestions || [],
        isCrisis: res.isCrisis || false
      };

      setChatMessages(prev => [...prev, agentMsg]);
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'agent',
          content: '⚠️ I am currently having trouble contacting the campus AI engine. Please verify your connection.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleResetChat = () => {
    setChatMessages([]);
  };

  const risk = student?.riskLevel ? RISK_COLORS[student.riskLevel] : null;

  // Recent history topics
  const recentTopics = [
    { title: 'How many backlogs that I had', query: 'how many backlogs that i had' },
    { title: 'Check attendance status & hours', query: 'what is my attendance status?' },
    { title: 'Show my profile details & standing', query: 'Show my profile details & current standing' },
    { title: 'Placement preparation roadmap', query: 'Placement readiness roadmap for ' + (student?.department || 'IT') }
  ].filter(t => t.title.toLowerCase().includes(searchChats.toLowerCase()));

  return (
    <div style={{
      minHeight: '100vh',
      background: '#090a0f',
      color: '#f8fafc',
      display: 'flex',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>

      {/* ─────────────────────────────────────────────────────────────
          LEFT SIDEBAR (Styled like the uploaded reference UI)
      ───────────────────────────────────────────────────────────── */}
      <aside style={{
        width: '260px',
        background: '#0c0e14',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        height: '100vh'
      }}>
        {/* Brand Header */}
        <div style={{ padding: '1.25rem 1.25rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(167, 139, 250, 0.35)'
          }}>
            <Sparkles size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.98rem', letterSpacing: '-0.02em', color: '#fff' }}>
            SmartCampus AI
          </span>
        </div>

        {/* Search input in sidebar */}
        <div style={{ padding: '0.5rem 1.1rem 0.85rem' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '9px',
            padding: '0.45rem 0.75rem'
          }}>
            <Search size={13} color="#64748b" style={{ marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchChats}
              onChange={e => setSearchChats(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                width: '100%'
              }}
            />
            <span style={{ fontSize: '0.65rem', color: '#475569', background: 'rgba(255,255,255,0.05)', padding: '2px 5px', borderRadius: '4px' }}>
              ⌘K
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ padding: '0 0.85rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { id: 'chatbot',   label: 'Home / AI Chat',         icon: Home },
            { id: 'tasks',     label: 'Assigned Tasks',         icon: CheckCircle, badge: pendingTasksCount },
            { id: 'academic',  label: 'Academic Performance',   icon: BookOpen },
            { id: 'lms',       label: 'LMS & Engagement',       icon: Activity },
            { id: 'skills',    label: 'Skills & Placement',     icon: Target },
            { id: 'ml',        label: 'Model Insights',         icon: Star },
            { id: 'breakdown', label: 'Success Breakdown',      icon: BarChart2 },
          ].map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: active ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
                  color: active ? '#fff' : '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: active ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={15} color={active ? '#fff' : '#64748b'} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{
                    background: '#f43f5e',
                    color: '#fff',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    borderRadius: '99px',
                    padding: '1px 6px',
                    boxShadow: '0 0 8px rgba(244, 63, 94, 0.4)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Recent Chat History Topics */}
        <div style={{ flex: 1, padding: '1.25rem 1rem 0.5rem', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.67rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem', paddingLeft: '0.35rem' }}>
            Recent Topics
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {recentTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(topic.query)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.73rem',
                  padding: '0.45rem 0.5rem',
                  borderRadius: '6px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'color 0.15s, background 0.15s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.background = 'transparent';
                }}
                title={topic.title}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom User Profile Section (matching the screenshot bottom card) */}
        <div style={{
          padding: '0.85rem 1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Clickable student profile preview */}
          <div
            onClick={() => setShowProfileModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', flex: 1, minWidth: 0 }}
            title="Click to view full student details"
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.78rem',
              fontWeight: 800,
              color: '#fff',
              flexShrink: 0
            }}>
              {(user?.name || student?.name || 'M')[0].toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name || student?.name}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {student?.studentId || 'Student ID'} · {student?.department ? student.department.slice(0, 10) + '..' : 'Enrolled'}
              </div>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={onLogout}
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
            title="Sign Out"
            onMouseEnter={e => e.currentTarget.style.color = '#f43f5e'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CANVAS / WORKSPACE
      ───────────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 25%, rgba(129, 140, 248, 0.05) 0%, transparent 65%)'
      }}>

        {/* Top Navbar Header */}
        <header style={{
          height: '56px',
          padding: '0 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          background: 'rgba(9, 10, 15, 0.65)',
          backdropFilter: 'blur(12px)',
          zIndex: 50
        }}>
          {/* Top Pill Dropdown (matching reference UI: "AI Assistant v") */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '0.3rem 0.65rem',
                fontSize: '0.74rem',
                color: '#cbd5e1',
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('chatbot')}
            >
              <span>AI Academic Advisor</span>
              <ChevronDown size={12} color="#94a3b8" />
            </div>
          </div>

          {/* Right Header Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {student && (
              <button
                onClick={() => setShowScoreModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '7px',
                  padding: '0.3rem 0.65rem',
                  color: '#cbd5e1',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.5)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                title="Click to view Success Score breakdown"
              >
                <BarChart2 size={13} color="#818cf8" />
                <span>Score: <strong style={{ color: '#818cf8' }}>{student.successScore?.toFixed(1) ?? '—'}</strong></span>
              </button>
            )}

            {/* Options button */}
            <button
              onClick={handleResetChat}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '7px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Reset conversation"
            >
              <MoreHorizontal size={15} />
            </button>
          </div>
        </header>

        {/* ─────────────────────────────────────────────────────────────
            ACTIVE TAB: CHATBOT (Matches the exact reference UI!)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'chatbot' && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: '1.5rem',
            position: 'relative'
          }}>

            {/* If no chat messages, render the centered Hero Landing State */}
            {chatMessages.length === 0 ? (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '740px',
                margin: '0 auto',
                width: '100%',
                padding: '2rem 1rem'
              }}>

                {/* 3D Iridescent Orb with Glowing Gradient */}
                <div style={{ position: 'relative', marginBottom: '1.75rem' }}>
                  <div style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #cbd5e1 15%, #c084fc 35%, #818cf8 55%, #38bdf8 70%, #ec4899 88%, #1e1b4b 100%)',
                    boxShadow: '0 0 50px rgba(192, 132, 252, 0.45), 0 0 90px rgba(99, 102, 241, 0.25), inset -6px -6px 14px rgba(0, 0, 0, 0.6)',
                    animation: 'orbFloat 4s ease-in-out infinite alternate'
                  }} />
                  {/* Subtle ambient blur behind the sphere */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '-15px',
                    width: '98px',
                    height: '98px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, transparent 70%)',
                    zIndex: -1,
                    filter: 'blur(10px)'
                  }} />
                </div>

                {/* Greeting Heading (matching reference: "Good Evening, DeepAI. Can I help you with anything ?") */}
                <h1 style={{
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: '#fff',
                  textAlign: 'center',
                  marginBottom: '0.4rem',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3
                }}>
                  Good {greetingTime}, {student?.name || 'Student'}.
                </h1>
                <p style={{
                  fontSize: '1.45rem',
                  fontWeight: 500,
                  color: '#cbd5e1',
                  textAlign: 'center',
                  marginBottom: '2.5rem',
                  letterSpacing: '-0.02em'
                }}>
                  Can I help you with anything ?
                </p>

                {/* Assigned Tasks Alert Banner if active interventions exist */}
                {pendingTasksCount > 0 && (
                  <div style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.14), rgba(99, 102, 241, 0.12))',
                    border: '1px solid rgba(244, 63, 94, 0.35)',
                    borderRadius: '14px',
                    padding: '0.85rem 1.15rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: '#f43f5e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 0 12px rgba(244, 63, 94, 0.5)'
                      }}>
                        <AlertTriangle size={17} color="#fff" />
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#fff' }}>
                          {pendingTasksCount} Action Task{pendingTasksCount > 1 ? 's' : ''} Assigned by Campus Mentor / Admin
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: '2px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          Latest: "{assignedTasks[0]?.action}"
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('tasks')}
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.22)',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.45rem 0.9rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.15s',
                        flexShrink: 0
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                    >
                      <span>View Tasks</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}

                {/* The Signature Floating Message Box Card */}
                <div style={{
                  width: '100%',
                  background: 'rgba(18, 22, 31, 0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
                  padding: '1.1rem 1.25rem 0.85rem',
                  marginBottom: '1.5rem',
                  transition: 'border-color 0.2s ease'
                }}
                onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.4)'}
                onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                >
                  <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                    <input
                      type="text"
                      placeholder="Message AI Chat..."
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#f8fafc',
                        fontSize: '0.92rem',
                        marginBottom: '1.25rem',
                        fontFamily: 'inherit'
                      }}
                    />

                    {/* Bottom Toolbar inside the Message Card */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {/* Left: Attach icon + Quick Action Pills */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                          title="Attach document"
                        >
                          <Paperclip size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSendMessage('how many backlogs that i had')}
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.07)',
                            borderRadius: '99px',
                            color: '#94a3b8',
                            fontSize: '0.72rem',
                            padding: '3px 10px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                        >
                          📚 My Backlogs
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSendMessage('what is my attendance status?')}
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.07)',
                            borderRadius: '99px',
                            color: '#94a3b8',
                            fontSize: '0.72rem',
                            padding: '3px 10px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                        >
                          📊 Check Attendance
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSendMessage('Show my profile details & current standing')}
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.07)',
                            borderRadius: '99px',
                            color: '#94a3b8',
                            fontSize: '0.72rem',
                            padding: '3px 10px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                        >
                          🎓 Profile Standing
                        </button>
                      </div>

                      {/* Right: Mic + Sparkle Submit Icon */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button
                          type="button"
                          style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                          title="Voice input"
                        >
                          <Mic size={15} />
                        </button>

                        <button
                          type="submit"
                          disabled={!chatInput.trim() || chatLoading}
                          style={{
                            background: chatInput.trim() ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: chatInput.trim() ? '#fff' : '#475569',
                            cursor: chatInput.trim() ? 'pointer' : 'default',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Sparkles size={14} />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* 3 Bottom Feature Cards (Matching the reference UI cards) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.85rem',
                  width: '100%'
                }}>
                  {[
                    {
                      title: 'Academic Standing',
                      desc: `Review your ${student?.academic?.cgpa?.toFixed(2) ?? '7.5'} CGPA, active backlogs, and semester credits.`,
                      query: 'Show my profile details & current standing'
                    },
                    {
                      title: 'Biometric Attendance',
                      desc: `${student?.attendance?.percentage?.toFixed(1) ?? '68'}% attendance recorded. Check required classes.`,
                      query: 'what is my attendance status?'
                    },
                    {
                      title: 'Placement Diagnostic',
                      desc: `Diagnostic benchmark, technical assessments, and interview readiness.`,
                      query: 'Placement readiness roadmap for ' + (student?.department || 'IT')
                    }
                  ].map((card, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSendMessage(card.query)}
                      style={{
                        background: 'rgba(18, 22, 31, 0.55)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(18, 22, 31, 0.55)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.35rem' }}>
                        {card.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.45 }}>
                        {card.desc}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              /* Active Conversation Stream */
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '780px',
                margin: '0 auto',
                width: '100%',
                paddingBottom: '100px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        animation: 'fadeIn 0.2s ease'
                      }}
                    >
                      {/* Avatar/Role Indicator */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        {msg.role === 'agent' ? (
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle at 35% 30%, #fff 0%, #c084fc 40%, #818cf8 80%)',
                            boxShadow: '0 0 8px rgba(192, 132, 252, 0.4)'
                          }} />
                        ) : null}
                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>
                          {msg.role === 'user' ? 'You' : 'AI Advisor'} · {msg.time}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div style={{
                        maxWidth: '90%',
                        padding: '0.95rem 1.25rem',
                        borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        background: msg.role === 'user'
                          ? 'linear-gradient(135deg, #4f46e5, #6366f1)'
                          : 'rgba(18, 22, 31, 0.85)',
                        border: msg.role === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.07)',
                        color: '#f8fafc',
                        fontSize: '0.86rem',
                        lineHeight: 1.6,
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                        whiteSpace: 'pre-line'
                      }}>
                        {msg.content}
                      </div>

                      {/* Clickable Follow-up Suggestions */}
                      {msg.suggestions && msg.suggestions.length > 0 && idx === chatMessages.length - 1 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.75rem', maxWidth: '90%' }}>
                          {msg.suggestions.map((s, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSendMessage(s)}
                              style={{
                                background: 'rgba(129, 140, 248, 0.08)',
                                border: '1px solid rgba(129, 140, 248, 0.25)',
                                color: '#a5b4fc',
                                borderRadius: '99px',
                                padding: '0.35rem 0.85rem',
                                fontSize: '0.74rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(129, 140, 248, 0.2)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(129, 140, 248, 0.08)';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              {s} →
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {chatLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#94a3b8', fontSize: '0.78rem', padding: '0.5rem' }}>
                      <div style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: '2px solid rgba(129, 140, 248, 0.3)',
                        borderTopColor: '#818cf8',
                        animation: 'spin 0.7s linear infinite'
                      }} />
                      Analyzing {student?.name}'s academic record...
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Persistent Bottom Input Bar during conversation */}
                <div style={{
                  position: 'fixed',
                  bottom: '1.25rem',
                  left: 'calc(260px + (100% - 260px) / 2)',
                  transform: 'translateX(-50%)',
                  width: 'calc(100% - 320px)',
                  maxWidth: '740px',
                  background: 'rgba(18, 22, 31, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
                  padding: '0.85rem 1.15rem'
                }}>
                  <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Message AI Chat..."
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#f8fafc',
                        fontSize: '0.88rem',
                        fontFamily: 'inherit'
                      }}
                      disabled={chatLoading}
                    />

                    <button
                      type="submit"
                      disabled={!chatInput.trim() || chatLoading}
                      style={{
                        background: chatInput.trim() ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: chatInput.trim() ? '#fff' : '#475569',
                        cursor: chatInput.trim() ? 'pointer' : 'default',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Sparkles size={15} />
                    </button>
                  </form>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            ACTIVE TAB: ASSIGNED TASKS & ACTION PLANS
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'tasks' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              {/* Title & Refresh */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 14px rgba(16, 185, 129, 0.4)'
                    }}>
                      <CheckCircle size={18} color="#fff" />
                    </div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Assigned Tasks &amp; Action Plans</h2>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    Official interventions and recovery tasks assigned by campus administrators and mentors to guide your academic progression.
                  </p>
                </div>
                <button
                  onClick={() => fetchStudentTasks(student?.studentId || user?.studentId)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  <RefreshCw size={13} style={{ animation: tasksLoading ? 'spin 1s linear infinite' : 'none' }} />
                  <span>Refresh Tasks</span>
                </button>
              </div>

              {/* Summary KPI Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
                {[
                  { label: 'Total Assigned', value: assignedTasks.length, color: '#818cf8', desc: 'All intervention actions' },
                  { label: 'Pending Action', value: assignedTasks.filter(t => t.status === 'Assigned').length, color: '#f59e0b', desc: 'Awaiting your start' },
                  { label: 'In Progress', value: assignedTasks.filter(t => t.status === 'In Progress').length, color: '#38bdf8', desc: 'Currently being worked on' },
                  { label: 'Completed', value: assignedTasks.filter(t => t.status === 'Completed').length, color: '#10b981', desc: 'Successfully fulfilled' }
                ].map((kpi, i) => (
                  <div key={i} style={{ background: 'rgba(18, 22, 31, 0.7)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '0.9rem 1rem' }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{kpi.label}</div>
                    <div style={{ fontSize: '1.45rem', fontWeight: 800, color: kpi.color, marginTop: '0.2rem' }}>{kpi.value}</div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.2rem' }}>{kpi.desc}</div>
                  </div>
                ))}
              </div>

              {/* Task List or Empty State */}
              {assignedTasks.length === 0 ? (
                <div style={{ background: 'rgba(18, 22, 31, 0.5)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '3.5rem 2rem', textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <CheckCircle size={24} color="#10b981" />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>All Clear! No Pending Tasks</h3>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', maxWidth: '440px', margin: '0 auto' }}>
                    You have no active intervention tasks assigned to your account right now. Keep up your regular class attendance and coursework!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {assignedTasks.map((task, idx) => {
                    const isCompleted = task.status === 'Completed';
                    const catColor = task.category === 'Immediate' || task.category === 'Attendance' ? '#f43f5e' : task.category === 'Academic' ? '#818cf8' : task.category === 'Placement' ? '#c084fc' : '#10b981';

                    return (
                      <div
                        key={task._id || idx}
                        style={{
                          background: isCompleted ? 'rgba(18, 22, 31, 0.45)' : 'rgba(18, 22, 31, 0.75)',
                          border: isCompleted ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '12px',
                          padding: '1.15rem 1.35rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                          opacity: isCompleted ? 0.75 : 1,
                          transition: 'all 0.2s ease',
                          boxShadow: isCompleted ? 'none' : '0 4px 18px rgba(0,0,0,0.2)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              padding: '0.2rem 0.55rem',
                              borderRadius: '6px',
                              background: `${catColor}18`,
                              color: catColor,
                              border: `1px solid ${catColor}33`,
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em'
                            }}>
                              {task.category}
                            </span>
                            <span style={{
                              fontSize: '0.68rem',
                              fontWeight: 600,
                              padding: '0.2rem 0.55rem',
                              borderRadius: '6px',
                              background: isCompleted ? 'rgba(16,185,129,0.15)' : task.status === 'In Progress' ? 'rgba(56,189,248,0.15)' : 'rgba(245,158,11,0.15)',
                              color: isCompleted ? '#10b981' : task.status === 'In Progress' ? '#38bdf8' : '#f59e0b',
                              border: `1px solid ${isCompleted ? '#10b98133' : task.status === 'In Progress' ? '#38bdf833' : '#f59e0b33'}`
                            }}>
                              ● {task.status}
                            </span>
                          </div>

                          {/* Status Actions */}
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {task.status === 'Assigned' && (
                              <button
                                onClick={() => handleUpdateTaskStatus(task._id, 'In Progress')}
                                style={{
                                  background: 'rgba(56,189,248,0.12)',
                                  border: '1px solid rgba(56,189,248,0.3)',
                                  color: '#38bdf8',
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  padding: '0.35rem 0.8rem',
                                  borderRadius: '6px',
                                  cursor: 'pointer'
                                }}
                              >
                                Start Task
                              </button>
                            )}
                            {task.status !== 'Completed' ? (
                              <button
                                onClick={() => handleUpdateTaskStatus(task._id, 'Completed')}
                                style={{
                                  background: 'rgba(16,185,129,0.15)',
                                  border: '1px solid rgba(16,185,129,0.35)',
                                  color: '#10b981',
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  padding: '0.35rem 0.8rem',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.3rem'
                                }}
                              >
                                <Check size={12} /> Mark as Completed
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUpdateTaskStatus(task._id, 'In Progress')}
                                style={{
                                  background: 'rgba(255,255,255,0.05)',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  color: '#94a3b8',
                                  fontSize: '0.7rem',
                                  padding: '0.3rem 0.65rem',
                                  borderRadius: '6px',
                                  cursor: 'pointer'
                                }}
                              >
                                Reopen Task
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Task Action Description */}
                        <div style={{
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          color: isCompleted ? '#94a3b8' : '#f1f5f9',
                          textDecoration: isCompleted ? 'line-through' : 'none'
                        }}>
                          {task.action}
                        </div>

                        {/* Metadata Details */}
                        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.75rem', color: '#64748b', flexWrap: 'wrap' }}>
                          <span>👤 Assigned by: <strong style={{ color: '#cbd5e1' }}>{task.assignedTo || 'Faculty Mentor'}</strong></span>
                          {task.followUpDate && <span>📅 Follow-up Due: <strong style={{ color: '#cbd5e1' }}>{task.followUpDate}</strong></span>}
                        </div>

                        {task.notes && (
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8', background: 'rgba(255,255,255,0.02)', padding: '0.5rem 0.75rem', borderRadius: '6px', borderLeft: '2px solid rgba(129,140,248,0.4)' }}>
                            💡 <em>Notes:</em> {task.notes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            ACTIVE TAB: ACADEMIC PERFORMANCE
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'academic' && student && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <BookOpen size={20} color="#818cf8" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Academic Standing & Grades</h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.75rem' }}>
                Comprehensive marks evaluation, active backlog status, and department tutoring.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Active Backlog Burden</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: (student.academic?.backlogs || 0) > 0 ? '#f43f5e' : '#10b981', marginTop: '0.2rem' }}>
                    {student.academic?.backlogs ?? 0} active backlog(s)
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    {(student.academic?.backlogs || 0) > 0 
                      ? 'Register for upcoming supplementary examination to clear requirements.'
                      : 'Zero active backlogs. Clean academic standing!'}
                  </p>
                </div>

                <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Current Cumulative GPA</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#818cf8', marginTop: '0.2rem' }}>
                    {student.academic?.cgpa?.toFixed(2) ?? '7.50'} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ 10.0</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    Cumulative Grade Point Average across enrolled university semesters.
                  </p>
                </div>
              </div>

              <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>Subject Metric Breakdown</h3>
                <ScoreBar label="Cumulative Marks Average" value={student.academic?.averageMarks} color="#818cf8" />
                <ScoreBar label="Entry Exam Score" value={student.academic?.entryScore} color="#c084fc" />
                <ScoreBar label="Academic Component Weight" value={student.academic?.componentScore} color="#10b981" />
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            ACTIVE TAB: LMS & ENGAGEMENT
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'lms' && student && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Activity size={20} color="#c084fc" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>LMS Portal & Attendance Metrics</h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.75rem' }}>
                Biometric class attendance, online coursework progress, and extracurricular events.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: (student.attendance?.percentage || 0) >= 75 ? '#10b981' : '#f43f5e' }}>
                    {student.attendance?.percentage?.toFixed(1) ?? '68.0'}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginTop: '0.2rem' }}>Attendance</div>
                </div>

                <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#818cf8' }}>
                    {student.lms?.learningHours ?? '11.3'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginTop: '0.2rem' }}>Study Hours / Wk</div>
                </div>

                <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#c084fc' }}>
                    {student.engagement?.eventsAttended ?? '3'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginTop: '0.2rem' }}>Events Attended</div>
                </div>
              </div>

              <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>Online Course Activity</h3>
                <ScoreBar label="Assignment & Quiz Completion" value={student.lms?.assignmentCompletion} color="#c084fc" />
                <ScoreBar label="LMS Activity Score" value={student.lms?.componentScore} color="#818cf8" />
                <ScoreBar label="Campus Extracurricular Score" value={student.engagement?.componentScore} color="#10b981" />
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            ACTIVE TAB: SKILLS & PLACEMENT
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'skills' && student && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Target size={20} color="#10b981" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Placement & Career Readiness</h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.75rem' }}>
                Industry recruitment eligibility, technical coding diagnostic, and interview prep.
              </p>

              <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Campus Recruitment Status</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: student.placement?.status === 'Eligible' || student.placement?.status === 'Ready' ? '#10b981' : '#f43f5e', marginTop: '0.2rem' }}>
                  {student.placement?.status ?? 'Not Ready'}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                  {(student.academic?.backlogs || 0) > 0 
                    ? '⚠️ Campus recruiters mandate 0 active backlogs. Clearing your 2 backlogs will unlock campus hiring drives.'
                    : '✅ Placement ready for upcoming campus recruitment cycles.'}
                </p>
              </div>

              <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>Diagnostic Benchmarks</h3>
                <ScoreBar label="Technical Skill Index" value={student.skills?.technical} color="#10b981" />
                <ScoreBar label="Soft Skills & Communication" value={student.skills?.soft} color="#818cf8" />
                <ScoreBar label="General Aptitude Benchmark" value={student.placement?.aptitude} color="#c084fc" />
                <ScoreBar label="Technical Coding Diagnostic" value={student.placement?.coding} color="#10b981" />
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            ACTIVE TAB: MODEL INSIGHTS (ML)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'ml' && student && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Star size={20} color="#c084fc" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Predictive Machine Learning Insights</h2>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.75rem' }}>
                Supervised risk probability forecasts based on academic indicators and behavior.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Academic Risk Forecast</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c084fc', marginTop: '0.2rem' }}>
                    {student.ml?.academicRisk?.band ?? 'HIGH'} · {((student.ml?.academicRisk?.probability || 0.78) * 100).toFixed(0)}%
                  </div>
                  <div style={{ marginTop: '0.75rem' }}>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${((student.ml?.academicRisk?.probability || 0.78) * 100)}%`, background: '#c084fc', borderRadius: '99px' }} />
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Placement Likelihood</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>
                    {student.ml?.placement?.band ?? 'MODERATE'} · {((student.ml?.placement?.probability || 0.42) * 100).toFixed(0)}%
                  </div>
                  <div style={{ marginTop: '0.75rem' }}>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${((student.ml?.placement?.probability || 0.42) * 100)}%`, background: '#10b981', borderRadius: '99px' }} />
                    </div>
                  </div>
                </div>
              </div>

              {student.riskFactors && student.riskFactors.length > 0 && (
                <div style={{ background: 'rgba(18, 22, 31, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem' }}>Risk Contributing Factors</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {student.riskFactors.map((rf, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#f8fafc', padding: '0.5rem 0.8rem', background: 'rgba(244,63,94,0.08)', borderRadius: '8px', border: '1px solid rgba(244,63,94,0.2)' }}>
                        <AlertTriangle size={14} color="#f43f5e" /> {rf}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            ACTIVE TAB: SUCCESS SCORE BREAKDOWN
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'breakdown' && student && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <BarChart2 size={20} color="#818cf8" />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Institutional Success Index</h2>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Composite student success score computed out of 100 points.
                  </p>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#818cf8', background: 'rgba(129, 140, 248, 0.1)', padding: '0.4rem 1.1rem', borderRadius: '12px', border: '1px solid rgba(129, 140, 248, 0.25)' }}>
                  {student.successScore?.toFixed(1) ?? '51.0'} <span style={{ fontSize: '0.85rem', color: '#64748b' }}>/ 100</span>
                </div>
              </div>

              {student.scoreContributions && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  {Object.entries(student.scoreContributions).map(([k, v]) => (
                    <div key={k} style={{ padding: '1rem', background: 'rgba(18, 22, 31, 0.65)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#818cf8' }}>
                        {Number(v).toFixed(1)}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'capitalize', fontWeight: 700, marginTop: '0.25rem' }}>
                        {k} Points
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ padding: '1.25rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#10b981', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={15} /> Actionable Steps to Lift Your Success Score:
                </div>
                <ul style={{ fontSize: '0.78rem', color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                  <li><strong>Clear your 2 active backlogs</strong>: Adds approximately <strong>+14 to +18 points</strong> to your academic score.</li>
                  <li><strong>Raise attendance above 75.0%</strong>: Adds <strong>+12 points</strong> and clears university detention safeguards.</li>
                  <li><strong>Maintain weekly LMS activity</strong>: Adds <strong>+5 points</strong>.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: FULL STUDENT PROFILE MODAL
          (Triggers when clicking on student profile card or avatar)
      ───────────────────────────────────────────────────────────── */}
      {showProfileModal && student && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '560px',
            background: '#0f121a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
            padding: '2rem',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setShowProfileModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255,255,255,0.06)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: '1.75rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#fff',
                boxShadow: '0 4px 20px rgba(129, 140, 248, 0.45)',
                border: '2px solid rgba(255,255,255,0.2)'
              }}>
                {(student.name || 'M')[0].toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.2rem' }}>{student.name}</h2>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user?.email || student.email}</div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, background: 'rgba(129, 140, 248, 0.15)', color: '#818cf8', padding: '2px 8px', borderRadius: '99px', border: '1px solid rgba(129, 140, 248, 0.3)' }}>
                    Verified Student
                  </span>
                  {risk && (
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, background: risk.bg, color: risk.color, padding: '2px 8px', borderRadius: '99px', border: `1px solid ${risk.color}40` }}>
                      {student.riskLevel} RISK
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Grid Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Student Roll / ID', value: student.studentId },
                { label: 'Department', value: student.department },
                { label: 'Academic Standing', value: `Year ${student.year} · Sem ${student.semester}` },
                { label: 'Cohort / Section', value: `Section ${student.section}` },
                { label: 'Current CGPA', value: `${student.academic?.cgpa?.toFixed(2) ?? '7.50'} / 10.0` },
                { label: 'Active Backlogs', value: `${student.academic?.backlogs ?? 0} backlog(s)` },
                { label: 'Biometric Attendance', value: `${student.attendance?.percentage?.toFixed(1) ?? '68.0'}%` },
                { label: 'Placement Status', value: student.placement?.status || 'In Training' },
              ].map(item => (
                <div key={item.label} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.67rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f1f5f9', marginTop: '0.2rem' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowProfileModal(false)}
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: 'none',
                background: '#6366f1',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Close Profile Details
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: SUCCESS SCORE BREAKDOWN MODAL
      ───────────────────────────────────────────────────────────── */}
      {showScoreModal && student && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '560px',
            background: '#0f121a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
            padding: '2rem',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowScoreModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255,255,255,0.06)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
              <BarChart2 size={20} color="#818cf8" /> Success Score Breakdown
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Institutional score composition for <strong>{student.name}</strong> ({student.studentId}).
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '10px', border: '1px solid rgba(129, 140, 248, 0.25)', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Composite Score</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#818cf8' }}>
                  {student.successScore?.toFixed(1) ?? '51.0'} <span style={{ fontSize: '0.85rem', color: '#64748b' }}>/ 100</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Standing</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: risk ? risk.color : '#fff' }}>
                  {student.riskLevel} RISK
                </div>
              </div>
            </div>

            {student.scoreContributions && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {Object.entries(student.scoreContributions).map(([k, v]) => (
                  <div key={k} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#818cf8' }}>
                      {Number(v).toFixed(1)}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'capitalize', fontWeight: 700, marginTop: '0.2rem' }}>
                      {k}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowScoreModal(false)}
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: 'none',
                background: '#6366f1',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}

      {/* Global Animation Styles */}
      <style>{`
        @keyframes orbFloat {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-7px) scale(1.03); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

    </div>
  );
}
