// Base URL for your backend API
export const API_BASE_URL = "http://localhost:5000";

// API Endpoints
export const API_ENDPOINTS = {
  // Admin Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/admin/login`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/admin/forgot-password`,
    VERIFY_RESET_CODE: `${API_BASE_URL}/api/auth/admin/verify-reset-code`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/admin/reset-password`,
    LOGOUT: `${API_BASE_URL}/api/auth/admin/logout`,
  },
  
  // Admin Profile endpoints
  PROFILE: {
    GET: `${API_BASE_URL}/api/auth/admin/profile`,
    UPDATE: `${API_BASE_URL}/api/auth/admin/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/admin/change-password`,
  },

  // Dashboard endpoints
  DASHBOARD: {
    STATS: `${API_BASE_URL}/api/admin/dashboard/stats`,
    RECENT_ACTIVITY: `${API_BASE_URL}/api/admin/dashboard/recent-activity`,
  },
};

// Helper function for API calls
export const apiCall = async (url, options = {}) => {
  try {
    const token = localStorage.getItem("adminToken");
    
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};