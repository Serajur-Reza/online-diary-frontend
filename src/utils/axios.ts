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

// Example Request Interceptor (Add Auth Header)
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
          { withCredentials: true }
        );

        localStorage?.removeItem("accessToken");
        localStorage?.setItem(
          "accessToken",
          newToken?.data?.access_token as string
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
  }
);

// Example Response Interceptor (Handle 401 Unauthorized)
api.interceptors.response.use(
  function (response) {
    return response; // Handle successful responses
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Handle token expiration, redirect to login, etc.
      console.log("Unauthorized, redirecting to login...", error);
    }
    return Promise.reject(error); // Must reject promise
  }
);

export default api;
