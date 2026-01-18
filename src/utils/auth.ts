// utils/auth.js
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    // Check if current time is less than expiration time
    return decoded?.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getAccessToken = () => {
  // Ensure this only runs or initializes where it has access to a path
  if (typeof window !== "undefined") {
    // Server-side initialization logic here
    // Make sure your config includes the file path flag

    return localStorage?.getItem("accessToken");
  }
  return "";
};

export const userInfo = () => {
  const token = localStorage?.getItem("accessToken");
  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  }

  return;
};
