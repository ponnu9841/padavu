import {
  FaHome,
  FaHandshake,
  FaCogs,
  FaComments,
  FaImages,
  // FaUsers,
  FaAddressBook,
  FaInfoCircle,
  FaThList,
  FaBlog,
  FaBriefcase
} from "react-icons/fa";
import { NavUser } from "./nav-user";
import { Logo } from "./logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/router";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: FaHome,
  },
  {
    title: "About",
    url: "/dashboard/about",
    icon: FaInfoCircle,
  },
  {
    title: "Packages",
    url: "/dashboard/packages",
    icon: FaInfoCircle,
  },
  {
    title: "Clients",
    url: "/dashboard/clients",
    icon: FaHandshake,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: FaCogs,
  },
  {
    title: "Testimonials",
    url: "/dashboard/testimonials",
    icon: FaComments,
  },
  {
    title: "Works",
    url: "/dashboard/works",
    icon: FaImages,
  },
  // {
  //   title: "Teams",
  //   url: "/dashboard/teams",
  //   icon: FaUsers,
  // },
  {
    title: "Contact",
    url: "/dashboard/contact",
    icon: FaAddressBook,
  },
  {
    title: "Vlogs",
    url: "/dashboard/vlogs",
    icon: FaBlog,
  },
  {
    title: "Experts",
    url: "/dashboard/experts",
    icon: FaBriefcase,
  },
  {
    title: "Miscellaneous",
    url: "/dashboard/miscellaneous",
    icon: FaThList,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-primary p-0">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={router.pathname === item.url}>
                    <Link href={item.url} className="my-1.5">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
