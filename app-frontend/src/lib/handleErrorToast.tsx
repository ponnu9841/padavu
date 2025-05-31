"use client"
import { AxiosError } from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import { clearToken } from "./local-storage-service";

export const handleToast = (message: string) => {
	toast("", {
		unstyled: true,
		description: message,
		duration: 3000,
		position: "bottom-right",
		classNames: {
			toast: "error-toast p-5 relative flex gap-x-3 items-start",
			title: "text-red",
			description: "text-red",
			closeButton: "absolute top-2 right-2",
			actionButton: "absolute top-2 right-2",
			cancelButton: "absolute top-2 right-2",
		},
		icon: <IoCloseCircleOutline size={28} />,
	});
};

export const handleError = (error: AxiosError): Promise<never> => {
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
