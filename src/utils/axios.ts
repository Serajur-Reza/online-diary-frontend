import { baseUrl, publicApis } from "@/constants/constants";
import axios from "axios";
import { isTokenValid } from "./auth";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async function (config) {
    const isPublicRoute = publicApis.some((path) => config.url?.includes(path));
    if (isPublicRoute) {
      return config;
    }

    const token = localStorage.getItem("accessToken");

    if (token) {
      const isValid = isTokenValid(token as string);

      if (!isValid) {
        const newToken = await api.post(
          `${baseUrl}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        localStorage?.removeItem("accessToken");
        localStorage?.setItem(
          "accessToken",
          newToken?.data?.access_token as string,
        );
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config; // Must return config
  },
  function (error) {
    return Promise.reject(error); // Must reject promise
  },
);

// Example Response Interceptor (Handle 401 Unauthorized)
// api.interceptors.response.use(
//   function (response) {
//     return response; // Handle successful responses
//   },
//   function (error) {
//     console.log("promise error", error);
//     if (error.response && error.response.status === 401) {
//       // Handle token expiration, redirect to login, etc.
//       console.log("Unauthorized, redirecting to login...", error);
//     }
//     return Promise.reject(error); // Must reject promise
//   }
// );

api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Check if the error has a response from NestJS
    if (error.response && error.response.data) {
      const { status, message, error: errType } = error.response.data;

      // console.log(error);

      if (error.response && error.response.status === 401) {
        // Handle token expiration, redirect to login, etc.
        console.warn("Unauthorized, redirecting to login...", error);
      }

      // Logic for specific AI errors
      if (errType === "AI_ANALYSIS_FAILED") {
        console.warn(`[AI Service Error]: ${message}`);
      }

      // Return a rejected promise with the message we wrote in NestJS
      return Promise.reject({
        message: message || "An unexpected error occurred",
        status: status || 500,
        type: errType || "SERVER_ERROR",
      });
    }

    // Handle Network errors (Gemini API timeout, server down, etc.)
    return Promise.reject({
      message: "Network error: Please check your connection.",
      status: 503,
      type: "NETWORK_ERROR",
    });
  },
);

export default api;
