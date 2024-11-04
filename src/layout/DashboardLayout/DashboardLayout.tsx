// components/DashboardLayout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import SidebarMenu from "./SidebarMenu";
import { sidebarData } from "@/utils/sidebarData";

type Role = "admin" | "instructor" | "student";

interface DashboardLayoutProps {
  role: Role;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = sidebarData[role];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-4 bg-gray-800 text-white"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-full md:w-64 p-6 space-y-4 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 md:block z-10`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
        <SidebarMenu menuItems={menuItems} />
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 ml-0 md:ml-64">
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
