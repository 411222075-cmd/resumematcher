const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class API {
  // Helper method for making requests
  static async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      // Network error or fetch failed
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check your connection.');
      }
      throw error;
    }
  }
  
  // Register new user
  static async register(email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
  
  // Login user
  static async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
  
  // Analyze resume
  static async matchResume(token, resumeText, jobRole) {
    return this.request('/match', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        resume_text: resumeText,
        job_role: jobRole,
      }),
    });
  }
  
  // Get user's analysis history
  static async getHistory(token) {
    return this.request('/history', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default API;