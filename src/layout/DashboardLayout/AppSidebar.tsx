import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/utils/sidebarData";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for routing
import { useRole } from "@/hooks/useRole";

export function AppSidebar() {
  const role = "student"; // Change this to dynamically use the role if needed
  const menuItems = sidebarData[role];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.label} item={item} />
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

interface SidebarMenuItemProps {
  item: any;
  depth?: number;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col">
      <div
        onClick={hasChildren ? toggleOpen : undefined}
        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
      >
        <div className="flex items-center">
          {item.icon && <item.icon className="text-lg mr-2" />}
          {/* Only wrap in Link if there's a path */}
          {item.path ? (
            <Link to={item.path} className="text-sm">
              {item.label}
            </Link>
          ) : (
            <span className="text-sm">{item.label}</span>
          )}
        </div>
        {hasChildren && (
          <span>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className={`pl-${depth + 2} ml-2 border-l-2 border-gray-200`}>
          {item.children.map((child: any) => (
            <SidebarMenuItem key={child.label} item={child} depth={depth + 2} />
          ))}
        </div>
      )}
    </div>
  );
};
