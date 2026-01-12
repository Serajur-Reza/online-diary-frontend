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
  return localStorage?.getItem("accessToken") || "";
};

export const userInfo = () => {
  const token = localStorage?.getItem("accessToken");
  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  }

  return;
};
