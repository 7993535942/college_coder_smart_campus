const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';
const ML_SERVICE_KEY = process.env.ML_SERVICE_KEY || 'smartcampus_secret_internal_ml_key_2026';

export async function callMlServiceBatch(students) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${ML_SERVICE_URL}/predict/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ML-KEY': ML_SERVICE_KEY
      },
      body: JSON.stringify({ students }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    return data.predictions || null;
  } catch (err) {
    console.warn('ML Service call failed or timed out:', err.message);
    return null;
  }
}
