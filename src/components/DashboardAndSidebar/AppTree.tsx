import { IconType } from "react-icons";
import { ChevronRight } from "lucide-react";

type SidebarItem = {
  label: string;
  path?: string;
  icon?: IconType;
  children?: SidebarItem[];
};

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

const AppTree = ({ item }: { item: SidebarItem }) => {
  const Icon = item.icon || ChevronRight;

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link to={item.path as string}>
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible className="w-full">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="w-full">
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
            <ChevronRight className="ml-auto h-4 w-4 transition-transform" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((subItem, index) => (
              <AppTree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};

export default AppTree;
