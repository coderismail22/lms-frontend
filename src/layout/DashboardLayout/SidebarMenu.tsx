import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IconType } from "react-icons";

interface SidebarItem {
  label: string;
  path?: string;
  icon?: IconType;
  children?: SidebarItem[];
}

interface SidebarMenuProps {
  menuItems: SidebarItem[];
  isSidebarOpen: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  menuItems,
  isSidebarOpen,
}) => {
  return (
    <nav>
      {menuItems.map((item) => (
        <SidebarItem
          key={item.label}
          item={item}
          isSidebarOpen={isSidebarOpen}
        />
      ))}
    </nav>
  );
};

const SidebarItem: React.FC<{ item: SidebarItem; isSidebarOpen: boolean }> = ({
  item,
  isSidebarOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      {hasChildren ? (
        <div>
          {/* Main item with dropdown */}
          <div
            onClick={toggleOpen}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            {item.icon && <item.icon className="text-lg" />}
            {isSidebarOpen && <span>{item.label}</span>}
            {/* Only show the up/down toggle icon on the right side */}
            {isSidebarOpen && (
              <span className="ml-auto">
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            )}
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="ml-4 space-y-2">
              {item.children?.map((child) => (
                <SidebarItem
                  key={child.label}
                  item={child}
                  isSidebarOpen={isSidebarOpen}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <NavLink
          to={item.path || "#"}
          className={({ isActive }) =>
            `block p-2 text-sm rounded transition ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          {item.icon && <item.icon className="text-lg" />}
          {isSidebarOpen && <span>{item.label}</span>}
        </NavLink>
      )}
    </div>
  );
};

export default SidebarMenu;
