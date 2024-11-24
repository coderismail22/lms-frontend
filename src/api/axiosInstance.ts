import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { authKey } from "./authKey";

const queryClient = new QueryClient();

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Set the base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach accessToken to every request
axiosInstance.interceptors.request.use((config) => {
  const authData = queryClient.getQueryData<{ accessToken: string }>(authKey);
  const token = authData?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Refresh token logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const { data } = await axiosInstance.post("/auth/refresh-token");
        queryClient.setQueryData(authKey, { accessToken: data.accessToken }); // Save new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        queryClient.setQueryData(authKey, null); // Clear token
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
