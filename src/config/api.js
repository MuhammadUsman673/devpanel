// src/config/api.js → FINAL & 100% CORRECT VERSION
export const API_BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  // Admin Auth
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/admin/login`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/admin/forgot-password`,
    VERIFY_RESET_CODE: `${API_BASE_URL}/api/auth/admin/verify-reset-code`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/admin/reset-password`,
    LOGOUT: `${API_BASE_URL}/api/auth/admin/logout`,
  },

  // Profile
  PROFILE: {
    GET: `${API_BASE_URL}/api/auth/admin/profile`,
    UPDATE: `${API_BASE_URL}/api/auth/admin/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/admin/change-password`,
  },

  // Dashboard
  DASHBOARD: {
    STATS: `${API_BASE_URL}/api/admin/dashboard/stats`,
    RECENT_ACTIVITY: `${API_BASE_URL}/api/admin/dashboard/recent-activity`,
  },

  // Users
  USERS: {
    GET_ALL: `${API_BASE_URL}/api/admin/users`,
    GET_STATS: `${API_BASE_URL}/api/admin/users/stats`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/admin/users/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/api/admin/users/${id}`,
    TOGGLE_STATUS: (id) => `${API_BASE_URL}/api/admin/users/${id}/status`,
    DELETE: (id) => `${API_BASE_URL}/api/admin/users/${id}`,
  },

  // COACHES — FULLY COMPLETE & WORKING
  COACHES: {
    GET_ALL: `${API_BASE_URL}/api/admin/coaches`,
    GET_ALL_WITH_PARAMS: (page = 1, limit = 10, search = '') =>
      `${API_BASE_URL}/api/admin/coaches?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`,
    
    REGISTER: `${API_BASE_URL}/api/admin/coaches/register`,
    UPDATE: (id) => `${API_BASE_URL}/api/admin/coaches/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/admin/coaches/${id}`,

    GET_CLIENTS: (id, page = 1, search = '') =>
      `${API_BASE_URL}/api/admin/coaches/${id}/clients?page=${page}&limit=10${search ? `&search=${search}` : ''}`,
    
    ASSIGN_CLIENT: (id) => `${API_BASE_URL}/api/admin/coaches/${id}/assign-client`,
    REMOVE_CLIENT: (coachId, userId) => `${API_BASE_URL}/api/admin/coaches/${coachId}/clients/${userId}`
  }
};

// API CALL HELPER — PERFECT
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
      throw new Error(data.error || data.message || "Something went wrong");
    }

    return { success: true, data };
  } catch (error) {
    console.error("API Call Error:", error);
    return { success: false, error: error.message };
  }
};