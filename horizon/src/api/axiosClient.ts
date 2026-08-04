import axios from "axios";
import { logger } from "../utils/logger";

// ─── Axios Instance ───────────────────────────────────────────
// Yeh ek custom axios instance hai — default axios ki jagah
// yahi poore app mein use hoga.
//
// Fayda: base URL, timeout, headers ek jagah set karo —
// har request mein dobara likhne ki zaroorat nahi.

const axiosClient = axios.create({

  // Base URL — .env file se aata hai
  // Har request mein yeh automatically prefix ho jaata hai
  // e.g. axiosClient.get("/users") → GET https://jsonplaceholder.typicode.com/users
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // Timeout — 10 seconds mein response nahi aaya toh error
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,

  // Default headers — har request ke saath jaayenge
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────
// Interceptor = "request jaane se pehle rok ke kuch karo"
//
// Request flow:
// Component → axiosClient.get() → Request Interceptor → Server
//                                       ↑
//                               yahan token attach hota hai

axiosClient.interceptors.request.use(

  // Request jaane se pehle yeh function chalta hai
  (config) => {

    // Token localStorage se padhte hain
    // Real app mein yeh login ke baad save hota hai
    // Abhi .env ka mock token save kar rahe hain
    const token = localStorage.getItem("auth_token")
      || import.meta.env.VITE_MOCK_TOKEN;

    // Token mila toh Authorization header add karo
    if (token) {
      // "Bearer" = standard auth header format
      // Server check karta hai: "Bearer abc123" → valid token?
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Dev mode mein request log karo
    logger.group(`API Request → ${config.method?.toUpperCase()} ${config.url}`);
    logger.log("Base URL", config.baseURL);
    logger.log("Headers",  config.headers);
    logger.groupEnd();

    // config wapas karo — request aage jaayegi
    return config;
  },

  // Request banana hi fail ho gaya (rare case)
  (error) => {
    logger.warn("Request Error", error.message);
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ─────────────────────────────────────
// Response flow:
// Server → Response Interceptor → Component
//                ↑
//          yahan response.data nikalta hai

axiosClient.interceptors.response.use(

  // Success response (2xx status codes)
  (response) => {

    // Dev mode mein response log karo
    logger.group(`API Response ← ${response.status} ${response.config.url}`);
    logger.log("Data", response.data);
    logger.groupEnd();

    // response.data wapas karo — component ko sirf data chahiye
    // poora response object nahi (status, headers, config sab skip)
    return response.data;
  },

  // Error response (4xx, 5xx ya network error)
  (error) => {
    const status  = error.response?.status;
    const message = error.response?.data?.message || error.message;

    logger.warn(`API Error ${status}`, message);

    // Error ko reject karo — calling code mein catch block chalega
    return Promise.reject(error);
  }
);

export default axiosClient;
