import { authKey } from "@/api/authKey";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData<{ accessToken: string }>(authKey);

  // Redirect to login if accessToken doesn't exist
  if (!authData?.accessToken) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
