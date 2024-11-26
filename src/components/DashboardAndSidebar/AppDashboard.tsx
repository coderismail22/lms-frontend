import { Separator } from "@radix-ui/react-separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import { Outlet, useNavigate } from "react-router-dom";
import AppSidebar from "@/components/DashboardAndSidebar/AppSidebar";
import { capitalizeFirstLetter } from "./dashboard.util";
import { useRole } from "@/hooks/useRole";
import CustomBreadcrumbLink from "../CustomBreadcrumbLink/CustomBreadcrumbLink";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useQueryClient } from "@tanstack/react-query";
import { authKey } from "@/api/authKey";

const AppDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData(authKey);
  // TODO: Add static role type instead of current void
  const role = useRole();
  // While redirecting, role will be undefined, so render nothing
  if (!role) {
    navigate("/auth/login");
    return null; // Prevent further rendering while redirecting
  }
  if (!authData) {
    return <p>Loading...</p>; // Wait until authKey is set
  }

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className=" w-full">
            <BreadcrumbList className=" flex justify-between items-center">
              <BreadcrumbItem className="hidden md:block">
                <CustomBreadcrumbLink to={`/dashboard/${role}/home`}>
                  {capitalizeFirstLetter(role)} Home
                </CustomBreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator className="hidden md:block" /> */}
              <BreadcrumbItem>
                <LogoutButton />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppDashboard;
