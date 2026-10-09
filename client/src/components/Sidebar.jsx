import React from 'react';
import { 
  LayoutDashboard, Users, PieChart, Sparkles, Sliders, 
  Database, BrainCircuit, LogOut, GraduationCap, UserPlus, ShieldCheck
} from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, onLogout, user }) {
  const adminNavItems = [
    { id: 'dashboard',       label: 'Dashboard',               icon: LayoutDashboard },
    { id: 'students',        label: 'At-Risk Students',         icon: Users },
    { id: 'segments',        label: 'Segmentation',             icon: PieChart },
    { id: 'copilot',         label: 'AI Intervention Copilot',  icon: Sparkles },
    { id: 'simulator',       label: 'Scenario Simulator',       icon: Sliders },
    { id: 'datacenter',      label: 'Data Quality Center',      icon: Database },
    { id: 'models',          label: 'Model Insights',           icon: BrainCircuit },
    { id: 'manage-students', label: 'Manage Student Accounts',  icon: UserPlus, divider: true }
  ];

  const navItems = adminNavItems;

  return (
    <aside className="sidebar">
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '0.5rem', borderRadius: '8px', display: 'flex' }}>
          <GraduationCap size={22} color="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>SmartCampus AI</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Predict • Explain • Act</div>
        </div>
      </div>

      {/* Admin badge */}
      <div style={{ padding: '0.6rem 1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          background: 'rgba(99,102,241,0.12)', color: 'var(--primary-light)',
          fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px',
          borderRadius: '99px', border: '1px solid rgba(99,102,241,0.25)'
        }}>
          <ShieldCheck size={10} /> ADMIN CONSOLE
        </span>
      </div>

      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <React.Fragment key={item.id}>
              {item.divider && (
                <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0.5rem 0.25rem' }} />
              )}
              <button
                onClick={() => setCurrentPage(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: active ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  color: active ? '#fff' : 'var(--text-muted)',
                  fontWeight: active ? 600 : 500,
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
              >
                <Icon size={18} color={active ? 'var(--primary-light)' : (item.id === 'manage-students' ? '#f59e0b' : 'var(--text-dim)')} />
                {item.label}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{user?.name || 'Administrator'}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{user?.email || 'admin@smartcampus.demo'}</div>
          </div>
          <button 
            onClick={onLogout}
            title="Sign out"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
