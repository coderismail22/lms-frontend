import { Separator } from "@radix-ui/react-separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/DashboardAndSidebar/AppSidebar";
import { capitalizeFirstLetter } from "./dashboard.util";
import { useRole } from "@/hooks/useRole";
import { Role } from "./dashboard.type";
import CustomBreadcrumbLink from "../CustomBreadcrumbLink/CustomBreadcrumbLink";

const AppDashboard = () => {
  const role: Role = useRole();
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <CustomBreadcrumbLink to={`/dashboard/${role}/home`}>
                  Dashboard
                </CustomBreadcrumbLink>
                {/* <BreadcrumbLink href={`/dashboard/${role}/home`}>
                  Dashboard
                </BreadcrumbLink> */}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{capitalizeFirstLetter(role)}</BreadcrumbPage>
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
