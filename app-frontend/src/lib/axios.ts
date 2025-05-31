import axios, { AxiosInstance } from "axios";
import { handleError } from "./handleErrorToast";

const axiosInstance: AxiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
   timeout: 30000,
   withCredentials: true,
});

// Common error handler


axiosInstance.interceptors.request.use((config) => {
   const token = typeof window !== "undefined" && localStorage.getItem("token");
   config.withCredentials = true;
   config.headers["X-Requested-With"] = "XMLHttpRequest";
   if (token) config.headers.Authorization = "Bearer " + token;
   return config;
});

// Add interceptors
axiosInstance.interceptors.response.use(
   (response) => response, // Handle successful responses
   (error) => handleError(error) // Handle errors
);

export default axiosInstance;
