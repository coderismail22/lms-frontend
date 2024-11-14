// import { useContext } from "react";

import { Role } from "@/components/DashboardAndSidebar/dashboard.type";

export const useRole = () => {
  // TODO: Make the role dynamic based on authentication and authorization
  const role: Role = "admin";
  return role;
};
