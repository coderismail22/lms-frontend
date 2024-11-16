import { IconType } from "react-icons";
import { IoChevronDown } from "react-icons/io5";

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
  const Icon = item.icon || IoChevronDown;

  //  If there are no children
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

  // If there are children
  return (
    <SidebarMenuItem>
      <Collapsible>
        <CollapsibleTrigger className="group/collapsible" asChild>
          <SidebarMenuButton className="w-full">
            <Icon className="mr-2 h-4 w-4" />
            <p>{item.label}</p>
            <IoChevronDown className="ml-auto h-4 w-4 transition-transform duration-500 group-data-[state=open]/collapsible:rotate-180" />
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
