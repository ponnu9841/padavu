import axios, { AxiosError, AxiosInstance } from "axios";
import { handleToast } from "@/lib/handleErrorToast";
import { clearToken } from "@/lib/local-storage-service";

const axiosInstance: AxiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
   timeout: 30000,
   withCredentials: true,
});

// Common error handler
const handleError = (error: AxiosError): Promise<never> => {
   if (error.code === "ERR_CANCELED") return new Promise(() => {});
   if (error.response) {
      const { status, data } = error.response as { status: number; data: { error: string } };;
      if(status === 401) clearToken();
      handleToast(data.error);
   } else if (error.request) {
      handleToast("Network Error: Please check your internet connection.");
   } else {
      handleToast(`Error: ${error.message}`);
   }

   return Promise.reject(error); // Ensure error is caught downstream
};

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
