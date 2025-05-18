import axios, { AxiosError, AxiosInstance } from "axios";
import { handleToast } from "@/lib/handleErrorToast";
import { clearToken } from "@/lib/local-storage-service";

// Define a common Axios instance
const axiosInstance: AxiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`, // Replace with your API base URL
   timeout: 10000, // Set a timeout for requests
});

// Common error handler
const handleError = (error: AxiosError): Promise<never> => {
   if (error.code === "ERR_CANCELED") return new Promise(() => {});
   if (error.response) {
      // Response received but status is outside 2xx
      const { status, data } = error.response;

      switch (status) {
         case 400:
            handleToast(
               `Bad Request: ${(data as AxiosError).message || "Invalid input"}`
            );
            break;
         case 401:
            handleToast("Unauthorized: Please log in again.");
            clearToken();
            break;
         case 403:
            handleToast("Forbidden: You do not have access to this resource.");
            break;
         case 404:
            handleToast("Not Found: The requested resource does not exist.");
            break;
         case 500:
            handleToast("Internal Server Error: Please try again later.");
            break;
         default:
            handleToast(
               `Unexpected Error: ${
                  (data as any).message || "Something went wrong." //eslint-disable-line
               }`
            );
      }
   } else if (error.request) {
      // Request was made but no response received
      handleToast("Network Error: Please check your internet connection.");
   } else {
      // Error in setting up the request
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
