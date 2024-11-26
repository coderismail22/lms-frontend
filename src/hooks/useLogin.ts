// import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Swal from "sweetalert2";
import { authKey } from "../api/authKey";
import { TLoginForm } from "@/types/login.type";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { Role } from "@/components/DashboardAndSidebar/dashboard.type";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/queryClientSetup";

type DecodedToken = {
  role: Role;
};

export type AuthState = {
  accessToken: string;
  role: Role;
};

export type TLoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<TLoginResponse, AxiosError, TLoginForm>({
    // Explicitly define mutation function with mutationFn
    mutationFn: async (formData: TLoginForm): Promise<TLoginResponse> => {
      const { data } = await axiosInstance.post<TLoginResponse>(
        "/auth/login",
        formData
      );
      console.log("data", data);
      return data;
    },
    // Options
    onSuccess: (data) => {
      console.log("success data", data?.data);

      // Decode the role from the token
      const decodedToken: DecodedToken = jwtDecode(data?.data?.accessToken);
      console.log(decodedToken);
      console.log(decodedToken?.role);

      // Save the accessToken and role in TanStack Query state
      const authState: AuthState = {
        accessToken: data.data.accessToken,
        role: decodedToken.role,
      };

      queryClient.setQueryData(authKey, authState);
      console.log("Auth State Set:", authState);
      console.log("Query Cache After Set:", queryClient.getQueryData(authKey));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in!",
      }).then(() => {
        navigate("/dashboard"); // Redirect after login
      });
    },
    onError: (error: AxiosError) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.message || // Handle general JavaScript errors
          "An unexpected error occurred. Please try again later.",
      });
    },
  });
};
