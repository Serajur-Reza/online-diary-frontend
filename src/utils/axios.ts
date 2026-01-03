import { baseUrl, publicRoutes } from "@/constants/api";
import axios from "axios";
import { isTokenValid } from "./auth";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example Request Interceptor (Add Auth Header)
axios.interceptors.request.use(
  async function (config) {
    const isPublicRoute = publicRoutes.some((path) =>
      config.url?.includes(path)
    );
    if (isPublicRoute) {
      return config;
    }

    const token = localStorage.getItem("accessToken");
    if (token) {
      const isValid = isTokenValid(token as string);

      if (!isValid) {
        const newToken = await axios.post(
          `${baseUrl}/auth/change-password`,
          {}
        );

        console.log("new tokebn from axios", newToken);

        localStorage?.removeItem("accessToken");
        localStorage?.setItem("accessToken", newToken as unknown as string);
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
axios.interceptors.response.use(
  function (response) {
    return response; // Handle successful responses
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Handle token expiration, redirect to login, etc.
      console.log("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error); // Must reject promise
  }
);
