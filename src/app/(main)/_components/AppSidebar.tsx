import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Gem,
  HomeIcon,
  LucideFileVideo,
  Search,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Create New Video",
    url: "/create-new-video",
    icon: LucideFileVideo,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: Search,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: WalletCards,
  },
];

const AppSidebar = () => {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className="flex items-center gap-3 w-full justify-center mt-5">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
            <h2 className="font-bold text-2xl">Video AI</h2>
          </div>
          <h2 className="text-lg text-gray-400 text-center mt-3">
            AI Short Video Generator
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-3 mt-8">
              <Button className="w-full">+ Create New Video</Button>
            </div>

            <SidebarMenu>
              {MenuItems.map((menu, index) => (
                <SidebarMenuItem key={index} className="mt-3 mx-3">
                  <SidebarMenuButton
                    isActive={path == menu.url}
                    className="p-5"
                  >
                    <Link
                      href={menu.url}
                      className="flex items-center gap-4 p-3"
                    >
                      <menu.icon />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-5 border rounded-lg mb-6 bg-gray-800">
          <div className="flex items-center justify-between">
            <Gem className="text-gray-400" />
            <span className="text-gray-400">5 Credits Left</span>
          </div>
          <Button className="w-full mt-3">Buy more Credits</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
