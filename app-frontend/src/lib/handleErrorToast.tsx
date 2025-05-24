import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "sonner";

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
