import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import AppTree from "./AppTree";
import { sidebarData } from "@/constants/sidebarData";
import { Role } from "./dashboard.type";

export const AppSidebar = ({
  role,
  ...props
}: { role: Role } & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData[role].map((item, index) => (
                <AppTree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
