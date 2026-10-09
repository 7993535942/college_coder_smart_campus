import { handleMockRequest } from './mockFallback.js';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  getToken: () => localStorage.getItem('token'),
  setToken: (t) => localStorage.setItem('token', t),
  clearToken: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    };

    // Attempt real live server first
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
      if (res.status === 401 && !endpoint.includes('/auth/login')) {
        this.clearToken();
        window.location.reload();
      }
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        return await res.json();
      }
      // If server returned 404 or HTML error (e.g. static hosting on Vercel), fall back seamlessly
      console.warn(`[SmartCampus] Live server returned HTTP ${res.status}. Seamlessly falling back to snapshot data for ${endpoint}`);
      return await handleMockRequest(endpoint, options);
    } catch (err) {
      // If server is unreachable/offline, engage resilient client fallback
      console.warn(`[SmartCampus] Live server unavailable (${err.message}). Engaging resilient fallback for ${endpoint}`);
      return await handleMockRequest(endpoint, options);
    }
  },

  // Auth
  login:               (email, password) => api.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getMe:               () => api.request('/auth/me'),
  logout:              () => api.request('/auth/logout', { method: 'POST' }),

  // Admin: student account management
  registerStudent:     (data) => api.request('/auth/register-student', { method: 'POST', body: JSON.stringify(data) }),
  getStudentAccounts:  () => api.request('/auth/students-list'),
  deleteStudentAccount:(id) => api.request(`/auth/students-list/${id}`, { method: 'DELETE' }),

  // Analytics
  getOverview:         () => api.request('/analytics/overview'),
  getDepartments:      () => api.request('/analytics/departments'),
  getSegments:         () => api.request('/analytics/segments'),
  getMlSummary:        () => api.request('/analytics/ml-summary'),
  getInsights:         () => api.request('/analytics/insights'),
  getCharts:           () => api.request('/analytics/charts'),

  // Students
  getStudents:         (params = '') => api.request(`/students${params}`),
  getStudent:          (id) => api.request(`/students/${id}`),

  // Interventions
  getInterventions:    (params = '') => api.request(`/interventions${params ? (params.startsWith('?') ? params : `?${params}`) : ''}`),
  createIntervention:  (data) => api.request('/interventions', { method: 'POST', body: JSON.stringify(data) }),
  updateIntervention:  (id, data) => api.request(`/interventions/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // AI
  getInterventionPlan: (student) => api.request('/ai/intervention', { method: 'POST', body: JSON.stringify(student) }),
  askAssistant:        (query, history = []) => api.request('/ai/ask', { method: 'POST', body: JSON.stringify({ query, history }) }),
  askStudentAdvisor:   (query, student, history = []) => api.request('/ai/student-advisor', { method: 'POST', body: JSON.stringify({ query, student, history }) }),

  // Simulation
  simulateScore:       (data) => api.request('/simulation/score', { method: 'POST', body: JSON.stringify(data) }),

  // Data
  getDataQuality:      () => api.request('/data/quality'),
  loadDemoData:        () => api.request('/data/load-demo', { method: 'POST' }),

  // ML
  getModels:           () => api.request('/ml/models'),
  getModelMetrics:     (m) => api.request(`/ml/metrics/${m}`)
};
