import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import NextImage from "./Image";
import Link from "next/link";

export function Logo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Link href="/dashboard" className="flex justify-center">
					<NextImage
						src="/images/logo.webp"
						className="aspect-[3/1] w-50"
					/>
				</Link>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
