import { queryClient } from "@/queryClientSetup";
import { authKey } from "../api/authKey";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// Define the custom hook
export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // Simulate server-side logout logic if needed
      // Example: Clear refreshToken cookie using backend API
      // await axiosInstance.post("/auth/logout");

      return true; // No actual backend call, just clearing the state
    },
    onSuccess: () => {
      // Clear authentication state
      console.log("Logging out user");
      queryClient.setQueryData(authKey, null); // Clear accessToken or any auth state

      // Redirect the user
      navigate("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
