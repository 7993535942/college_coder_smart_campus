import React, { useState } from 'react';
import { api } from '../services/api';
import { GraduationCap, ArrowRight, ShieldCheck, User, Lock, Mail, ChevronRight } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [role, setRole]       = useState('admin');   // 'admin' | 'student'
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.login(email, password);
      if (data.token) {
        // Role guard: make sure they selected the right role tab
        if (data.user.role !== role) {
          setError(`This account is registered as "${data.user.role}". Please select the correct role.`);
          setLoading(false);
          return;
        }
        api.setToken(data.token);
        onLoginSuccess(data.user);
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillAdmin = () => {
    setEmail('admin@smartcampus.demo');
    setPassword('Demo@123');
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      background: 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.1) 0%, transparent 60%)'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            padding: '1rem',
            borderRadius: '18px',
            marginBottom: '1.25rem',
            boxShadow: '0 8px 32px rgba(99,102,241,0.35)'
          }}>
            <GraduationCap size={34} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.35rem', letterSpacing: '-0.5px' }}>
            SmartCampus AI
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Institutional Student Success & ML Predictive Analytics
          </p>
        </div>

        {/* Role Toggle */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '1.75rem',
          gap: '4px'
        }}>
          {[
            { value: 'admin',   label: '🛡️ Admin Portal',   hint: 'Institutional staff' },
            { value: 'student', label: '🎓 Student Portal',  hint: 'Enrolled students' }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => { setRole(tab.value); setError(''); setEmail(''); setPassword(''); }}
              style={{
                flex: 1,
                padding: '0.65rem 0.5rem',
                border: 'none',
                borderRadius: '9px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: role === tab.value
                  ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                  : 'transparent',
                color: role === tab.value ? '#fff' : 'var(--text-muted)',
                boxShadow: role === tab.value ? '0 4px 14px rgba(99,102,241,0.4)' : 'none'
              }}
            >
              <div>{tab.label}</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 400, opacity: 0.8, marginTop: '1px' }}>{tab.hint}</div>
            </button>
          ))}
        </div>

        {/* Glass Card */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            {role === 'admin' ? 'Admin Sign In' : 'Student Sign In'}
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {role === 'admin'
              ? 'Access the full campus analytics dashboard'
              : 'View your academic profile and performance'}
          </p>

          {/* Error */}
          {error && (
            <div style={{
              background: 'var(--risk-high-bg)',
              border: '1px solid rgba(244,63,94,0.3)',
              color: 'var(--risk-high)',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none' }} />
                <input
                  id="login-email"
                  type="email"
                  className="input-field"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={role === 'admin' ? 'admin@smartcampus.demo' : 'your.email@college.edu'}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none' }} />
                <input
                  id="login-password"
                  type="password"
                  className="input-field"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit"
              className="btn-primary"
              style={{ justifyContent: 'center', marginTop: '0.5rem', padding: '0.8rem', fontSize: '0.9rem' }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Authenticating...
                </span>
              ) : (
                <>
                  {role === 'admin' ? 'Sign In to Campus Console' : 'Access My Student Portal'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Admin quick-fill hint */}
          {role === 'admin' && (
            <div
              onClick={fillAdmin}
              style={{
                marginTop: '1.5rem',
                padding: '0.85rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '8px',
                border: '1px dashed var(--border-subtle)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            >
              <ShieldCheck size={17} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Demo Admin Credentials</span>
                <span style={{ color: 'var(--primary-light)', fontSize: '0.68rem', marginLeft: '0.5rem' }}>(click to fill)</span><br />
                Email: <code style={{ color: 'var(--primary-light)' }}>admin@smartcampus.demo</code><br />
                Password: <code style={{ color: 'var(--primary-light)' }}>Demo@123</code>
              </div>
            </div>
          )}

          {/* Student hint */}
          {role === 'student' && (
            <div style={{
              marginTop: '1.5rem',
              padding: '0.85rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              border: '1px dashed var(--border-subtle)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.65rem'
            }}>
              <User size={17} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Student Accounts</span><br />
                Use the credentials provided by your campus administrator. Contact your admin if you haven't received login details.
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '1.25rem' }}>
          SmartCampus AI · Secure Role-Based Access
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
