import axios from "axios";

// Base URL for the backend API
const BASE_URL = "http://localhost:8080/api/v1"; 
const NLP_URL = "http://127.0.0.1:5000";

// Define API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: `${BASE_URL}/login`,
    SIGNUP: `${BASE_URL}/profile/create`, 
    LOGOUT: `${BASE_URL}/logout`, 
  },
  USER: {
    UPDATEPROFILE: `${BASE_URL}/profile/update`,
    UPDATECREDENTIALS: `${BASE_URL}/login/update`,
    GETPROFILE: `${BASE_URL}/profile/get`,
  },
  APP: {
    MOODCHECK: `${BASE_URL}/daily/log`,
    HISTORY: `${BASE_URL}/daily/log/get`,
  },
  NLP: {
    STARTCHAT: `${NLP_URL}/chat/start`,
    CHAT: `${NLP_URL}/chat/respond`,
  }
};

// Create and configure the Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
