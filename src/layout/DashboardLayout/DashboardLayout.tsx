import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SidebarMenu from "./SidebarMenu";
import { sidebarData } from "@/utils/sidebarData";

type Role = "admin" | "instructor" | "student";

interface DashboardLayoutProps {
  role: Role;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuItems = sidebarData[role];

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-4 bg-gray-800 text-white fixed top-0 left-0 z-20"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white p-4 space-y-4 transform transition-transform duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        } ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        fixed md:static inset-y-0 z-10 flex flex-col`}
      >
        <div className="flex justify-between items-center p-2">
          <h2 className={`${isSidebarOpen ? "text-2xl font-bold" : "hidden"}`}>
            Dashboard
          </h2>
          <button
            onClick={toggleSidebar}
            className="hidden md:block p-2 text-lg text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <SidebarMenu menuItems={menuItems} isSidebarOpen={isSidebarOpen} />

        {/* Close button for mobile view */}
        {isMobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-4 bg-gray-800 text-white fixed top-4 right-4 z-20"
          >
            <FaChevronLeft />
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main
        className={`flex-grow transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-16"
        } p-6`}
      >
        <header className="bg-white shadow-md p-4 rounded-md mb-6">
          <h1 className="text-2xl font-semibold capitalize">
            {role} Dashboard
          </h1>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
