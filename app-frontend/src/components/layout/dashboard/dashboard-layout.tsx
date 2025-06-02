import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { clearToken, getToken } from "@/lib/local-storage-service";
import { useRouter } from "next/router";
import { fetchUser } from "@/store/features/user-slice";
import { useAppDispatch } from "@/hooks/use-store";
import { useAppSelector } from "@/hooks/use-store";
import { handleToast } from "@/lib/handleErrorToast";
// import BuildApplication from "./build";

const extractPathTitle = (path: string) => {
	const pathParts = path.split("/");
	const lastPart = pathParts[pathParts.length - 1];
	return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
}


export default function DashBoardLayout({ children }: ReactChildren) {
	const user = useAppSelector((state) => state.user.user);
	const router = useRouter();
	const dispatch = useAppDispatch();
	useEffect(() => {
		const token = getToken();
		if(!token){
			router.push("/login");
			return;
		}
		const controller = new AbortController();
		dispatch(fetchUser({ controller }));
		return () => controller.abort();
	}, [dispatch]); //eslint-disable-line

	useEffect(() => {
		if(user.type && user.type !== "admin") {
			clearToken();
			router.push("/login");
			handleToast("You are not authorized to access this page");
			return
		}
	}, [user]); //eslint-disable-line

	if (user.type === "admin") {
		return (
			<SidebarProvider>
				<AppSidebar />
				<div className="flex-1">
					<div className="py-4 px-3 flex gap-x-2 items-center sticky top-0 bg-background z-50 border-b">
						<SidebarTrigger />

						<div className="flex-1 flex justify-between">
							<h1 className="text-xl font-semibold">{extractPathTitle(router.pathname)}</h1>
						</div>
						{/* <BuildApplication /> */}
					</div>
					<div className="p-5 px-2 mx-3 ">{children}</div>
				</div>
			</SidebarProvider>
		);
	}
}
