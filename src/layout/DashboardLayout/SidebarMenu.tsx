// components/SidebarMenu.tsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { IconType } from "react-icons";

interface SidebarItem {
  label: string;
  path?: string;
  icon?: IconType;
  children?: SidebarItem[];
}

interface SidebarMenuProps {
  menuItems: SidebarItem[];
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ menuItems }) => {
  return (
    <nav>
      {menuItems.map((item) => (
        <SidebarItem key={item.label} item={item} />
      ))}
    </nav>
  );
};

// Recursive SidebarItem component
const SidebarItem: React.FC<{ item: SidebarItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <div>
      {hasChildren ? (
        <Accordion type="single" collapsible>
          <AccordionItem value={item.label}>
            <AccordionTrigger
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              {item.icon && <item.icon className="text-lg" />}
              <span>{item.label}</span>
            </AccordionTrigger>
            <AccordionContent>
              {item.children?.map((child) => (
                <SidebarItem key={child.label} item={child} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <NavLink
          to={item.path || "#"}
          className={({ isActive }) =>
            `block p-2 text-sm rounded transition ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          {item.icon && <item.icon className="text-lg" />}{" "}
          <span>{item.label}</span>
        </NavLink>
      )}
    </div>
  );
};

export default SidebarMenu;
