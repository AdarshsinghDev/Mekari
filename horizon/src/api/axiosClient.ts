import axios from "axios";
import { logger }    from "../utils/logger";
import { showToast } from "../utils/toast";

// ─── Axios Instance ───────────────────────────────────────────
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────
// Har request jaane se pehle token attach karo

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
      || import.meta.env.VITE_MOCK_TOKEN;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    logger.group(`API Request → ${config.method?.toUpperCase()} ${config.url}`);
    logger.log("Base URL", config.baseURL);
    logger.log("Headers",  config.headers);
    logger.groupEnd();

    return config;
  },
  (error) => {
    logger.warn("Request Setup Error", error.message);
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ─────────────────────────────────────
// Success → clean data return karo
// Error   → status code check karo, appropriate action lo

axiosClient.interceptors.response.use(

  // ── Success (2xx) ─────────────────────────────────────────
  (response) => {
    logger.group(`API Response ← ${response.status} ${response.config.url}`);
    logger.log("Data", response.data);
    logger.groupEnd();

    // Sirf data return karo — baaki sab (headers, status) component ko nahi chahiye
    return response.data;
  },

  // ── Error ─────────────────────────────────────────────────
  (error) => {

    // error.response = server ne response diya (4xx, 5xx)
    // error.response === undefined = server ne response hi nahi diya (network/timeout)

    const status  = error.response?.status;
    const message = error.response?.data?.message || error.message;

    logger.warn(`API Error`, { status, message });

    // ── Case 1: 401 Unauthorized ───────────────────────────
    // Token expired ya invalid — user ko login pe bhejo
    if (status === 401) {
      showToast("Session expired. Please log in again.", "warning");

      // LocalStorage saaf karo — purana token hata do
      localStorage.removeItem("auth_token");

      // Login page pe redirect karo
      // window.location.href = hard redirect — React Router bypass
      // Isliye use karte hain: token clear hone ke baad clean slate chahiye
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // ── Case 2: 403 Forbidden ──────────────────────────────
    // User logged in hai lekin is resource ka access nahi
    if (status === 403) {
      showToast("Access denied. You don't have permission.", "error");
      return Promise.reject(error);
    }

    // ── Case 3: 500 Internal Server Error ─────────────────
    // Server side mein kuch crash ho gaya
    if (status === 500) {
      showToast("Something went wrong on the server. Please try again.", "error");
      return Promise.reject(error);
    }

    // ── Case 4: Network / Timeout Error ───────────────────
    // error.response nahi hai → server tak request hi nahi pahunchi
    // Ya server ne timeout ke andar reply nahi kiya
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        // ECONNABORTED = axios ka timeout error code
        showToast("Request timed out. Please check your connection.", "warning");
      } else {
        // Internet band, server down, DNS fail — sab yahan
        showToast("Network error. Please check your internet connection.", "warning");
      }
      return Promise.reject(error);
    }

    // ── Case 5: Baaki errors (404, 422, etc.) ─────────────
    // Server se jo message aaya woh dikhao
    showToast(message || "An unexpected error occurred.", "error");
    return Promise.reject(error);
  }
);

export default axiosClient;
