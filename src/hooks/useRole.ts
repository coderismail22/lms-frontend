import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";
import { Role } from "@/components/DashboardAndSidebar/dashboard.type";
import { authKey } from "@/api/authKey";

type DecodedToken = {
  role: Role;
};

type AuthState = {
  accessToken: string;
  role: Role;
};

export const useRole = (): Role => {
  const queryClient = useQueryClient();
  // const authData = queryClient.getQueryData<{ accessToken: string }>(authKey);
  const authData = queryClient.getQueryData<AuthState>(authKey);
  console.log("auth data from useRole", authData);

  // If no auth data exists, assume no role (or redirect)
  if (!authData?.accessToken || !authData?.role) {
    throw new Error(
      "No valid authentication state found. Ensure user is logged in."
    );
  }

  return authData.role; // Return the role directly
};
